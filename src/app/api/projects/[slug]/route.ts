import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Project from '@/lib/models/Project';
import { revalidatePath } from 'next/cache';

// GET - Single project by slug
export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        await connectToDatabase();

        const project = await Project.findOne({
            slug: params.slug,
            status: 'published'
        })
            .select('-__v -cloudinaryId')
            .lean();

        if (!project) {
            return NextResponse.json(
                { success: false, error: 'Project not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: project
        });

    } catch (error) {
        console.error('Error fetching project:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch project' },
            { status: 500 }
        );
    }
}

// PUT - Update project (admin only)
export async function PUT(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        await connectToDatabase();

        const body = await request.json();

        const project = await Project.findOne({ slug: params.slug });

        if (!project) {
            return NextResponse.json(
                { success: false, error: 'Project not found' },
                { status: 404 }
            );
        }

        // Update fields
        Object.assign(project, body);

        // Update publishedAt if status changed to published
        if (body.status === 'published' && project.status !== 'published') {
            project.publishedAt = new Date();
        }

        await project.save();

        // Revalidate pages
        revalidatePath('/portfolio');
        revalidatePath(`/portfolio/${project.slug}`);

        return NextResponse.json({
            success: true,
            data: project,
            message: 'Project updated successfully'
        });

    } catch (error) {
        console.error('Error updating project:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update project' },
            { status: 500 }
        );
    }
}

// DELETE - Delete project (admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        await connectToDatabase();

        const project = await Project.findOneAndDelete({ slug: params.slug });

        if (!project) {
            return NextResponse.json(
                { success: false, error: 'Project not found' },
                { status: 404 }
            );
        }

        // Revalidate portfolio page
        revalidatePath('/portfolio');

        return NextResponse.json({
            success: true,
            message: 'Project deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting project:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete project' },
            { status: 500 }
        );
    }
}
