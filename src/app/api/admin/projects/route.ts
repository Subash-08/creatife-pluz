import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { connectToDatabase } from '@/lib/db'
import Project from '@/lib/models/Project'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
    console.log('🔵 POST /api/admin/projects called')

    try {
        // Check authentication
        const session = await getServerSession(authOptions)
        console.log('🔐 Session:', session?.user?.email)

        if (!session || !['admin', 'editor'].includes(session.user.role)) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            )
        }

        // Parse request data
        const data = await request.json()
        console.log('📥 Received data for:', data.title)

        // Validate required fields
        const requiredFields = ['title', 'slug', 'excerpt', 'category', 'year', 'duration', 'metaTitle', 'metaDescription']
        const missingFields = requiredFields.filter(field => !data[field])

        if (missingFields.length > 0) {
            return NextResponse.json(
                { success: false, error: `Missing required fields: ${missingFields.join(', ')}` },
                { status: 400 }
            )
        }

        // Validate cover image
        if (!data.coverImage?.url || !data.coverImage?.cloudinaryId) {
            return NextResponse.json(
                { success: false, error: 'Cover image is required' },
                { status: 400 }
            )
        }

        // Connect to database
        console.log('🔌 Connecting to database...')
        await connectToDatabase()
        console.log('✅ Database connected')

        // Check if slug exists
        const existingProject = await Project.findOne({ slug: data.slug })
        if (existingProject) {
            return NextResponse.json(
                { success: false, error: 'Slug already exists' },
                { status: 400 }
            )
        }

        // Set publishedAt if publishing
        if (data.status === 'published' && !data.publishedAt) {
            data.publishedAt = new Date()
        }

        // Create project
        console.log('📝 Creating project...')
        const project = await Project.create(data)
        console.log('✅ Project created with ID:', project._id)

        return NextResponse.json({
            success: true,
            message: 'Project created successfully',
            data: {
                _id: project._id.toString(),
                title: project.title,
                slug: project.slug,
                status: project.status,
                createdAt: project.createdAt
            }
        }, { status: 201 })

    } catch (error: any) {
        console.error('❌ Error creating project:', error)

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((err: any) => err.message)
            return NextResponse.json(
                { success: false, error: messages.join(', ') },
                { status: 400 }
            )
        }

        if (error.code === 11000) {
            return NextResponse.json(
                { success: false, error: 'Duplicate slug' },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// Add GET method to list projects
export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || !['admin', 'editor'].includes(session.user.role)) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            )
        }

        await connectToDatabase()

        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const skip = (page - 1) * limit

        const projects = await Project.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .select('title slug category featured status publishedAt createdAt')
            .lean()

        const total = await Project.countDocuments()

        console.log(`📊 GET /api/admin/projects: Found ${projects.length} projects (Total in DB: ${total})`)

        return NextResponse.json({
            success: true,
            data: projects,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        })

    } catch (error) {
        console.error('GET projects error:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}