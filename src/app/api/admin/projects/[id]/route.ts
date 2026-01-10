import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { connectToDatabase } from '@/lib/db'
import Project from '@/lib/models/Project'
import { authOptions } from '@/lib/auth'

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || !['admin', 'editor'].includes(session.user.role)) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            )
        }

        await connectToDatabase()

        const project = await Project.findById(params.id)

        if (!project) {
            return NextResponse.json(
                { success: false, error: 'Project not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            data: project
        })

    } catch (error) {
        console.error('GET project error:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || !['admin', 'editor'].includes(session.user.role)) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const data = await request.json()
        await connectToDatabase()

        // Check slug uniqueness (excluding current project)
        if (data.slug) {
            const existing = await Project.findOne({
                slug: data.slug,
                _id: { $ne: params.id }
            })

            if (existing) {
                return NextResponse.json(
                    { success: false, error: 'Slug already exists' },
                    { status: 400 }
                )
            }
        }

        // Set publishedAt if publishing
        if (data.status === 'published' && !data.publishedAt) {
            data.publishedAt = new Date()
        }

        const project = await Project.findByIdAndUpdate(
            params.id,
            data,
            { new: true, runValidators: true }
        )

        if (!project) {
            return NextResponse.json(
                { success: false, error: 'Project not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            message: 'Project updated successfully',
            data: project
        })

    } catch (error: any) {
        console.error('PUT project error:', error)

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((err: any) => err.message)
            return NextResponse.json(
                { success: false, error: messages.join(', ') },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || session.user.role !== 'admin') {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            )
        }

        await connectToDatabase()

        const project = await Project.findByIdAndDelete(params.id)

        if (!project) {
            return NextResponse.json(
                { success: false, error: 'Project not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            message: 'Project deleted successfully'
        })

    } catch (error) {
        console.error('DELETE project error:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}