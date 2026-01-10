// app/(admin)/admin/layout.tsx
'use client'

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import Header from './Header';
import { SessionProvider } from 'next-auth/react';

function AdminContent({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Check if current route is login page (relative to parent layout or absolute)
    const isLoginPage = pathname === '/admin/login';

    useEffect(() => {
        // Don't check auth on login page
        if (isLoginPage || status === 'loading') return;

        if (!session) {
            router.push('/admin/login');
        }
    }, [session, status, router, isLoginPage]);

    // If on login page, render children directly without admin layout
    if (isLoginPage) {
        return <>{children}</>;
    }

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
                </div>
            </div>
        );
    }

    if (!session) {
        return null; // Will redirect in useEffect
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar - Must be BEFORE main content */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main Content Area */}
            <div className={`flex-1 transition-all duration-300`}>
                <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

                <main className="p-6">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SessionProvider>
            <AdminContent>{children}</AdminContent>
        </SessionProvider>
    );
}