'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import ProjectForm from '@/components/admin/projects/ProjectForm'
import Breadcrumb from '../../../ui/Breadcrumb'
import { ArrowLeft, Save, Eye, Upload, Loader2 } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import type { ProjectFormData } from '@/lib/types/project'

export default function EditProjectPage() {
    const params = useParams()
    const router = useRouter()
    const projectId = params.slug as string
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [project, setProject] = useState<ProjectFormData | null>(null)

    useEffect(() => {
        fetchProject()
    }, [projectId])

    const fetchProject = async () => {
        try {
            setIsLoading(true)
            const response = await fetch(`/api/admin/projects/${projectId}`)

            if (!response.ok) {
                throw new Error('Failed to fetch project')
            }

            const result = await response.json()
            if (result.success) {
                setProject(result.data)
            }
        } catch (error) {
            console.error('Error fetching project:', error)
            toast.error('Failed to load project')
            router.push('/admin/projects')
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = async (data: ProjectFormData) => {
        setIsSubmitting(true)
        try {
            const response = await fetch(`/api/admin/projects/${projectId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || 'Failed to update project')
            }

            toast.success('Project updated successfully!')
            router.push('/admin/projects')
        } catch (error) {
            console.error('Error updating project:', error)
            const errorMessage = error instanceof Error ? error.message : 'Failed to update project'

            // Map common errors to short 3-4 word messages
            let shortMessage = 'Error: Failed to Update'
            if (errorMessage.includes('Slug already exists')) shortMessage = 'Error: Duplicate Slug'
            else if (errorMessage.includes('Missing required fields')) shortMessage = 'Error: Missing Fields'
            else if (errorMessage.includes('Cover image is required')) shortMessage = 'Error: Image Required'
            else if (errorMessage.includes('Unauthorized')) shortMessage = 'Error: Unauthorized Access'

            toast.error(shortMessage)
        } finally {
            setIsSubmitting(false)
        }
    }

    const breadcrumbItems = [
        { label: 'Dashboard', href: '/admin' },
        { label: 'Projects', href: '/admin/projects' },
        { label: project?.title || 'Edit Project', href: '#' }
    ]

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
                    <p className="mt-4 text-gray-600">Loading project...</p>
                </div>
            </div>
        )
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Project not found</p>
                    <Link
                        href="/admin/projects"
                        className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                        Back to Projects
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="px-6 py-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <Breadcrumb items={breadcrumbItems} />
                            <h1 className="text-2xl font-bold text-gray-900 mt-2">Edit Project</h1>
                            <p className="text-gray-600 mt-1">Update project details</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link
                                href="/admin/projects"
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                <ArrowLeft size={16} />
                                Back to Projects
                            </Link>

                            <button
                                type="button"
                                onClick={() => router.push(`/projects/${project.slug}`)}
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                <Eye size={16} />
                                View Live
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-6 py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <ProjectForm
                            formData={project}
                            onSubmit={handleSubmit}
                            isSubmitting={isSubmitting}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
