'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ProjectForm from '@/components/admin/projects/ProjectForm'
import Breadcrumb from '@/app/(admin)/admin/ui/Breadcrumb'
import { ArrowLeft, Save, Upload } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import type { ProjectFormData } from '@/lib/types/project'

export default function AddNewProjectPage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState<ProjectFormData>({
        title: '',
        slug: '',
        excerpt: '',
        category: 'Branding',
        featured: false,
        featuredOrder: 0,
        size: 'standard',
        year: new Date().getFullYear(),
        coverImage: {
            url: '',
            cloudinaryId: '',
            alt: '',
            width: 0,
            height: 0
        },
        gallery: [],
        challenge: '',
        solution: '',
        results: [],
        highlights: [],
        duration: '',
        tools: [],
        metaTitle: '',
        metaDescription: '',
        keywords: [],
        status: 'draft'
    })

    const handleSubmit = async (data: ProjectFormData) => {
        console.log('📤 Page received form data:', data)
        setIsSubmitting(true)
        try {
            const response = await fetch('/api/admin/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            console.log('📡 API Response status:', response.status)
            const result = await response.json()
            console.log('📡 API Response data:', result)

            if (!response.ok) {
                throw new Error(result.error || 'Failed to create project')
            }

            toast.success('Project created successfully!')

            // Ensure status is valid before redirect
            const projectStatus = data.status as 'draft' | 'published' | 'archived'

            if (projectStatus === 'published') {
                router.push('/admin/projects')
            } else {
                router.push(`/admin/projects/${result.data._id}/edit`)
            }
        } catch (error) {
            console.error('❌ Error creating project:', error)
            toast.error(error instanceof Error ? error.message : 'Failed to create project')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleSaveDraft = () => {
        handleSubmit({ ...formData, status: 'draft' })
    }

    const handlePublish = () => {
        const publishData: ProjectFormData = {
            ...formData,
            status: 'published',
            publishedAt: new Date().toISOString()
        }
        handleSubmit(publishData)
    }

    const breadcrumbItems = [
        { label: 'Dashboard', href: '/admin' },
        { label: 'Projects', href: '/admin/projects' },
        { label: 'Add New Project', href: '#' }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="px-6 py-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <Breadcrumb items={breadcrumbItems} />
                            <h1 className="text-2xl font-bold text-gray-900 mt-2">Add New Project</h1>
                            <p className="text-gray-600 mt-1">Create a new portfolio project with case study details</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link
                                href="/admin/projects"
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                            >
                                <ArrowLeft size={16} />
                                Back to Projects
                            </Link>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={handleSaveDraft}
                                    disabled={isSubmitting}
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save size={16} />
                                    Save Draft
                                </button>

                                <button
                                    type="button"
                                    onClick={handlePublish}
                                    disabled={isSubmitting}
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Upload size={16} />
                                    Publish Project
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-6 py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <ProjectForm
                            formData={formData}
                            onChange={setFormData}
                            onSubmit={handleSubmit}
                            isSubmitting={isSubmitting}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}