// app/(admin)/admin/page.tsx
'use client'

import { useSession } from 'next-auth/react';
import { BarChart3, Users, FolderOpen, TrendingUp, Calendar, Award, Plus, ExternalLink, Edit } from 'lucide-react';

export default function AdminDashboardPage() {
    const { data: session } = useSession();

    const stats = [
        { label: 'Total Projects', value: '24', icon: <FolderOpen className="w-6 h-6" />, change: '+12%', color: 'bg-blue-500' },
        { label: 'Published', value: '18', icon: <Award className="w-6 h-6" />, change: '+5%', color: 'bg-green-500' },
        { label: 'Drafts', value: '6', icon: <Calendar className="w-6 h-6" />, change: '+2', color: 'bg-amber-500' },
        { label: 'Monthly Views', value: '12.5K', icon: <TrendingUp className="w-6 h-6" />, change: '+24%', color: 'bg-purple-500' },
    ];

    const recentProjects = [
        { name: 'Nebula Fintech', category: 'Branding', status: 'Published', date: 'Jan 15, 2024' },
        { name: 'Aura Skin', category: 'Social Media', status: 'Published', date: 'Jan 10, 2024' },
        { name: 'Vortex Motion', category: 'Print', status: 'Draft', date: 'Jan 8, 2024' },
        { name: 'Glow Campaign', category: 'Social Media', status: 'Published', date: 'Jan 5, 2024' },
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Welcome back, <span className="text-blue-600">{session?.user?.name || 'Admin'}</span> 👋
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Here's what's happening with your projects today.
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                            <BarChart3 className="w-7 h-7 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all duration-300 group">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 ${stat.color} rounded-lg text-white group-hover:scale-105 transition-transform`}>
                                {stat.icon}
                            </div>
                            <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                        <p className="text-gray-600 mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Recent Projects */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
                        <p className="text-sm text-gray-600">Latest projects from your portfolio</p>
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition-colors">
                        View All <ExternalLink size={14} />
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left p-4 text-gray-700 font-medium text-sm">Project Name</th>
                                <th className="text-left p-4 text-gray-700 font-medium text-sm">Category</th>
                                <th className="text-left p-4 text-gray-700 font-medium text-sm">Status</th>
                                <th className="text-left p-4 text-gray-700 font-medium text-sm">Date</th>
                                <th className="text-left p-4 text-gray-700 font-medium text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentProjects.map((project, index) => (
                                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <div className="font-medium text-gray-900">{project.name}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                                            {project.category}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${project.status === 'Published'
                                            ? 'bg-green-100 text-green-800 border border-green-200'
                                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                                            }`}>
                                            {project.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-600">{project.date}</td>
                                    <td className="p-4">
                                        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition-colors">
                                            <Edit size={14} /> Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quick Actions & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-sm hover:shadow">
                            <Plus size={18} />
                            Add New Project
                        </button>
                        <button className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium">
                            <Users size={18} />
                            Manage Users
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {[
                            { action: 'Project published', details: 'Nebula Fintech', time: '2 hours ago' },
                            { action: 'Image uploaded', details: 'Aura Skin gallery', time: '1 day ago' },
                            { action: 'Project updated', details: 'Vortex Motion details', time: '2 days ago' },
                            { action: 'New draft created', details: 'Studio X Photography', time: '3 days ago' },
                        ].map((activity, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                                <div className="flex-1">
                                    <p className="text-gray-900 font-medium">{activity.action}</p>
                                    <p className="text-sm text-gray-600">{activity.details}</p>
                                </div>
                                <span className="text-sm text-gray-500 whitespace-nowrap">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}