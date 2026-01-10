// components/admin/Sidebar.tsx
'use client'

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    FolderOpen,
    Image,
    Settings,
    Users,
    BarChart3,
    FileText,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Home,
    Upload,
    Briefcase,
    Palette
} from 'lucide-react';
import { signOut } from 'next-auth/react';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const menuItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/admin' },
    { label: 'Projects', icon: <FolderOpen size={20} />, href: '/admin/projects' },
    { label: 'Portfolio', icon: <Briefcase size={20} />, href: '/admin/portfolio' },
    { label: 'Media', icon: <Image size={20} />, href: '/admin/media' },
    { label: 'Branding', icon: <Palette size={20} />, href: '/admin/branding' },
    { label: 'Analytics', icon: <BarChart3 size={20} />, href: '/admin/analytics' },
    { label: 'Case Studies', icon: <FileText size={20} />, href: '/admin/case-studies' },
    { label: 'Users', icon: <Users size={20} />, href: '/admin/users' },
    { label: 'Settings', icon: <Settings size={20} />, href: '/admin/settings' },
];

const quickActions = [
    { label: 'New Project', icon: <Upload size={16} />, href: '/admin/projects/new' },
    { label: 'View Site', icon: <Home size={16} />, href: '/', external: true },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/admin/login' });
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-50
                w-64 bg-white border-r border-gray-200
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
                flex flex-col h-screen shadow-sm
            `}>
                {/* Logo & Toggle */}
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                    <Link href="/admin" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">CP</span>
                        </div>
                        {!collapsed && (
                            <div>
                                <h1 className="text-lg font-bold text-gray-900">Creative Pluz</h1>
                                <p className="text-xs text-gray-500">Admin Dashboard</p>
                            </div>
                        )}
                    </Link>

                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="hidden lg:flex p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-gray-900"
                    >
                        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
                </div>

                {/* Quick Actions */}
                {!collapsed && (
                    <div className="p-4 border-b border-gray-200">
                        <div className="space-y-2">
                            {quickActions.map((action) => (
                                <Link
                                    key={action.label}
                                    href={action.href}
                                    target={action.external ? '_blank' : undefined}
                                    className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 text-sm text-blue-700 hover:text-blue-900 transition-all group border border-blue-100"
                                >
                                    <div className="text-blue-600 group-hover:scale-110 transition-transform">
                                        {action.icon}
                                    </div>
                                    <span className="font-medium">{action.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Main Menu */}
                <nav className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-1">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`
                                        flex items-center gap-3 p-3 rounded-lg transition-all group
                                        ${isActive
                                            ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                                        }
                                        ${collapsed ? 'justify-center' : ''}
                                    `}
                                >
                                    <div className={`
                                        ${isActive
                                            ? 'text-blue-600'
                                            : 'text-gray-500 group-hover:text-blue-600'
                                        }
                                    `}>
                                        {item.icon}
                                    </div>
                                    {!collapsed && (
                                        <span className="font-medium text-sm">{item.label}</span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* User Profile & Logout */}
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                    {!collapsed ? (
                        <div className="flex items-center gap-3 p-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                                <span className="text-white font-bold text-sm">A</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">Admin User</p>
                                <p className="text-xs text-gray-500 truncate">admin@creativepluz.com</p>
                            </div>
                            <button
                                onClick={handleSignOut}
                                className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-600 hover:text-red-600"
                                title="Sign out"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                                <span className="text-white font-bold text-sm">A</span>
                            </div>
                            <button
                                onClick={handleSignOut}
                                className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-600 hover:text-red-600"
                                title="Sign out"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}