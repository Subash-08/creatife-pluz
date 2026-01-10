import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        // Add custom logic here if needed
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const { pathname } = req.nextUrl;

                // Public routes
                if (pathname.startsWith('/api/public')) return true;
                if (pathname.startsWith('/_next')) return true;
                if (pathname.startsWith('/admin/login')) return true;

                // Protected routes require auth
                if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
                    return !!token && token.role === 'admin';
                }

                // API routes that need auth
                if (pathname.startsWith('/api/projects')) {
                    if (req.method === 'GET') return true; // Public read
                    return !!token && token.role === 'admin'; // Protected write
                }

                return true;
            }
        },
        pages: {
            signIn: '/admin/login',
            error: '/admin/login'
        }
    }
);

// Protect these routes
export const config = {
    matcher: [
        '/admin/:path*',
        '/api/admin/:path*',
        '/api/projects/:path*',
        '/api/upload/:path*'
    ]
};
