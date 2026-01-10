import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Project from '@/lib/models/Project';
import User from '@/lib/models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectToDatabase();

        const [
            totalProjects,
            publishedProjects,
            draftProjects,
            totalUsers
        ] = await Promise.all([
            Project.countDocuments(),
            Project.countDocuments({ status: 'published' }),
            Project.countDocuments({ status: 'draft' }),
            User.countDocuments()
        ]);

        return NextResponse.json({
            success: true,
            data: {
                projects: {
                    total: totalProjects,
                    published: publishedProjects,
                    draft: draftProjects
                },
                users: totalUsers
            }
        });

    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch stats' },
            { status: 500 }
        );
    }
}
