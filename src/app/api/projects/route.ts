import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Project from '@/lib/models/Project';
import { revalidatePath } from 'next/cache';

// GET - All projects (public)
export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();

        const searchParams = request.nextUrl.searchParams;
        const status = searchParams.get('status') || 'published';
        const category = searchParams.get('category');
        const featured = searchParams.get('featured');
        const limit = parseInt(searchParams.get('limit') || '50');
        const page = parseInt(searchParams.get('page') || '1');

        const query: any = { status };

        if (category && category !== 'All') {
            query.category = category;
        }

        if (featured === 'true') {
            query.featured = true;
        }

        const skip = (page - 1) * limit;

        const projects = await Project.find(query)
            .select('-__v -cloudinaryId')
            .sort({ featuredOrder: 1, publishedAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Project.countDocuments(query);

        return NextResponse.json({
            success: true,
            data: projects,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error('Error fetching projects:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch projects' },
            { status: 500 }
        );
    }
}

// POST - Create new project (admin only)
export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();

        const body = await request.json();

        // Validate required fields
        const required = ['title', 'slug', 'excerpt', 'category', 'year', 'coverImage', 'challenge', 'solution'];
        for (const field of required) {
            if (!body[field]) {
                return NextResponse.json(
                    { success: false, error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        // Create project
        const project = new Project({
            ...body,
            publishedAt: body.status === 'published' ? new Date() : null
        });

        await project.save();

        // Revalidate portfolio pages
        revalidatePath('/portfolio');
        revalidatePath(`/portfolio/${project.slug}`);

        return NextResponse.json({
            success: true,
            data: project,
            message: 'Project created successfully'
        });

    } catch (error) {
        console.error('Error creating project:', error);

        // Handle duplicate slug
        if (error instanceof Error && error.message.includes('duplicate key')) {
            return NextResponse.json(
                { success: false, error: 'Project with this slug already exists' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { success: false, error: 'Failed to create project' },
            { status: 500 }
        );
    }
}
