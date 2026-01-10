'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
    Plus, Edit, Eye, Trash2, Filter,
    Search, Calendar, Tag, CheckCircle,
    XCircle, Archive, MoreVertical
} from 'lucide-react'
import toast from 'react-hot-toast'

interface Project {
    _id: string
    title: string
    slug: string
    category: string
    featured: boolean
    status: 'draft' | 'published' | 'archived' | string
    publishedAt?: string
    createdAt: string
}

export default function ProjectsPage() {
    const router = useRouter()
    const [projects, setProjects] = useState<Project[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState<'all' | 'draft' | 'published' | 'archived'>('all')

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        try {
            setIsLoading(true)
            const response = await fetch('/api/admin/projects')

            if (!response.ok) {
                throw new Error('Failed to fetch projects')
            }

            const result = await response.json()
            if (result.success) {
                setProjects(result.data)
            }
        } catch (error) {
            console.error('Error fetching projects:', error)
            toast.error('Failed to load projects')
        } finally {
            setIsLoading(false)
        }
    }

    const deleteProject = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return

        try {
            const response = await fetch(`/api/admin/projects/${id}`, {
                method: 'DELETE'
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || 'Failed to delete project')
            }

            toast.success('Project deleted successfully')
            fetchProjects() // Refresh list
        } catch (error) {
            console.error('Error deleting project:', error)
            toast.error(error instanceof Error ? error.message : 'Failed to delete project')
        }
    }

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) ||
            project.category.toLowerCase().includes(search.toLowerCase())
        const matchesFilter = filter === 'all' || project.status === filter
        return matchesSearch && matchesFilter
    })

    const getStatusBadge = (status: string) => {
        const styles = {
            draft: 'bg-yellow-100 text-yellow-800',
            published: 'bg-green-100 text-green-800',
            archived: 'bg-gray-100 text-gray-800'
        }

        const icons = {
            draft: <XCircle className="w-3 h-3" />,
            published: <CheckCircle className="w-3 h-3" />,
            archived: <Archive className="w-3 h-3" />
        }

        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
                {icons[status as keyof typeof icons]}
                {status}
            </span>
        )
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading projects...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
                            <p className="text-gray-600 mt-1">Manage your portfolio projects</p>
                        </div>
                        <Link
                            href="/admin/projects/new"
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <Plus size={16} />
                            New Project
                        </Link>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search projects..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {(['all', 'draft', 'published', 'archived'] as const).map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilter(status)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === status
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Projects Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {filteredProjects.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <Tag className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                            <p className="text-gray-600 mb-6">
                                {search ? 'Try a different search term' : 'Get started by creating your first project'}
                            </p>
                            <Link
                                href="/admin/projects/new"
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                            >
                                <Plus size={16} />
                                Create New Project
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Project
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Created
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredProjects.map((project) => (
                                        <tr key={project._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">
                                                            {project.title}
                                                        </p>
                                                        <p className="text-sm text-gray-500 truncate">
                                                            /{project.slug}
                                                        </p>
                                                    </div>
                                                    {project.featured && (
                                                        <span className="ml-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                                                            Featured
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                                                    {project.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {getStatusBadge(project.status)}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {new Date(project.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={`/projects/${project.slug}`}
                                                        target="_blank"
                                                        className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
                                                        title="View live"
                                                    >
                                                        <Eye size={16} />
                                                    </Link>
                                                    <Link
                                                        href={`/admin/projects/${project._id}/edit`}
                                                        className="p-1.5 text-gray-400 hover:text-green-600 transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit size={16} />
                                                    </Link>
                                                    <button
                                                        onClick={() => deleteProject(project._id)}
                                                        className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-600">Total Projects</div>
                        <div className="text-2xl font-bold text-gray-900">{projects.length}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-600">Published</div>
                        <div className="text-2xl font-bold text-green-600">
                            {projects.filter(p => p.status === 'published').length}
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-600">Drafts</div>
                        <div className="text-2xl font-bold text-yellow-600">
                            {projects.filter(p => p.status === 'draft').length}
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-600">Featured</div>
                        <div className="text-2xl font-bold text-blue-600">
                            {projects.filter(p => p.featured).length}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}