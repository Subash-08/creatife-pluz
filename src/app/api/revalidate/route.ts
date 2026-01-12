'use client'

import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
    try {
        const secret = request.nextUrl.searchParams.get('secret')
        const path = request.nextUrl.searchParams.get('path')

        if (secret !== process.env.REVALIDATION_SECRET) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
        }

        if (path) {
            revalidatePath(path)
            return NextResponse.json({ revalidated: true, now: Date.now() })
        }

        return NextResponse.json({
            revalidated: false,
            now: Date.now(),
            message: 'Missing path to revalidate',
        })
    } catch (err) {
        return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
    }
}
