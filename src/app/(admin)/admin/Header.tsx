// components/admin/Header.tsx
'use client'

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import {
    Menu,
    Search,
    Bell,
    HelpCircle,
    ChevronDown,
    Sun,
    Moon,
    User,
    Settings,
    LogOut
} from 'lucide-react';

interface HeaderProps {
    onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
    const { data: session } = useSession();
    const [darkMode, setDarkMode] = useState(false); // Default to light mode
    const [notifications] = useState([
        { id: 1, text: 'New project submitted', time: '5 min ago' },
        { id: 2, text: 'Case study approved', time: '1 hour ago' },
        { id: 3, text: 'Image upload completed', time: '2 hours ago' },
    ]);

    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    return (
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Left: Menu Button & Search */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onMenuClick}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-gray-900 lg:hidden"
                        >
                            <Menu size={24} />
                        </button>

                        <div className="relative hidden md:block">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="search"
                                placeholder="Search projects, media, users..."
                                className="w-80 pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    {/* Right: Actions & Profile */}
                    <div className="flex items-center gap-3">
                        {/* Theme Toggle */}
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-gray-900"
                            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        {/* Help */}
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-gray-900">
                            <HelpCircle size={20} />
                        </button>

                        {/* Notifications */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setShowNotifications(!showNotifications);
                                    setShowProfileMenu(false);
                                }}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-gray-900 relative"
                            >
                                <Bell size={20} />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>

                            {showNotifications && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setShowNotifications(false)}
                                    />
                                    <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-20">
                                        <div className="p-4 border-b border-gray-200">
                                            <h3 className="font-semibold text-gray-900">Notifications</h3>
                                            <p className="text-sm text-gray-500">You have {notifications.length} unread</p>
                                        </div>
                                        <div className="max-h-96 overflow-y-auto">
                                            {notifications.map((notification) => (
                                                <div
                                                    key={notification.id}
                                                    className="p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                                                >
                                                    <p className="text-gray-900">{notification.text}</p>
                                                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-4 border-t border-gray-200">
                                            <button className="w-full py-2 text-sm text-blue-600 hover:text-blue-800 transition-colors">
                                                View all notifications
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Profile */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setShowProfileMenu(!showProfileMenu);
                                    setShowNotifications(false);
                                }}
                                className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                                    <User size={18} className="text-white" />
                                </div>
                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-semibold text-gray-900">{session?.user?.name || 'Admin'}</p>
                                    <p className="text-xs text-gray-500">Administrator</p>
                                </div>
                                <ChevronDown size={16} className="text-gray-400 hidden md:block" />
                            </button>

                            {showProfileMenu && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setShowProfileMenu(false)}
                                    />
                                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-20">
                                        <div className="p-4 border-b border-gray-200">
                                            <p className="font-semibold text-gray-900">{session?.user?.name || 'Admin User'}</p>
                                            <p className="text-sm text-gray-500 truncate">{session?.user?.email || 'admin@creativepluz.com'}</p>
                                        </div>
                                        <div className="py-2">
                                            <a
                                                href="/admin/profile"
                                                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                                            >
                                                <User size={16} />
                                                <span>My Profile</span>
                                            </a>
                                            <a
                                                href="/admin/settings"
                                                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                                            >
                                                <Settings size={16} />
                                                <span>Account Settings</span>
                                            </a>
                                        </div>
                                        <div className="p-2 border-t border-gray-200">
                                            <button
                                                onClick={() => signOut({ callbackUrl: '/admin/login' })}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <LogOut size={16} />
                                                <span>Sign Out</span>
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Search */}
                <div className="mt-4 md:hidden">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="search"
                            placeholder="Search..."
                            className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}