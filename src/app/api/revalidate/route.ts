import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
    try {
        const { path, tag } = await request.json();

        if (!path && !tag) {
            return NextResponse.json(
                { success: false, error: 'Either path or tag is required' },
                { status: 400 }
            );
        }

        // Check for secret token (optional security)
        const secret = request.headers.get('x-revalidate-secret');
        if (process.env.REVALIDATION_SECRET && secret !== process.env.REVALIDATION_SECRET) {
            return NextResponse.json(
                { success: false, error: 'Invalid revalidation secret' },
                { status: 401 }
            );
        }

        if (path) {
            revalidatePath(path);
        }

        if (tag) {
            revalidateTag(tag);
        }

        return NextResponse.json({
            success: true,
            message: 'Revalidation triggered',
            revalidated: { path, tag }
        });

    } catch (error) {
        console.error('Error revalidating:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to revalidate' },
            { status: 500 }
        );
    }
}
