'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { Plus, Trash2, Upload, Image as ImageIcon, MoveUp, MoveDown, HelpCircle, Save, FileText, FileImage, Settings, Globe } from 'lucide-react'
import toast from 'react-hot-toast'
import type { ProjectFormData } from '@/lib/types/project'

// Validation Schema
const projectSchema = z.object({
    title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
    slug: z.string()
        .min(1, 'Slug is required')
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens'),
    excerpt: z.string().min(1, 'Excerpt is required').max(200, 'Excerpt must be 200 characters or less'),
    category: z.enum(['Branding', 'Social Media', 'Print', 'Photography', 'Package Design', 'Corporate Display', 'Logo Design']),
    subCategory: z.string().optional(),
    featured: z.boolean().default(false),
    featuredOrder: z.number().min(0).default(0),
    size: z.enum(['standard', 'large', 'vertical']).default('standard'),
    year: z.number()
        .min(2000, 'Year must be 2000 or later')
        .max(new Date().getFullYear() + 1, 'Year cannot be in the future'),
    clientName: z.string().optional(),

    // Cover Image
    coverImage: z.object({
        url: z.string().url('Valid URL required'),
        cloudinaryId: z.string().min(1, 'Cloudinary ID required'),
        alt: z.string().min(1, 'Alt text required'),
        width: z.number().positive('Width must be positive'),
        height: z.number().positive('Height must be positive')
    }),

    // Gallery
    gallery: z.array(z.object({
        url: z.string().url('Valid URL required'),
        cloudinaryId: z.string().min(1, 'Cloudinary ID required'),
        alt: z.string().min(1, 'Alt text required'),
        label: z.string().min(1, 'Label required'),
        order: z.number().default(0)
    })).default([]),

    // Content
    challenge: z.string().min(1, 'Challenge is required'),
    solution: z.string().min(1, 'Solution is required'),

    // Results
    results: z.array(z.object({
        label: z.string().min(1, 'Label required'),
        value: z.string().min(1, 'Value required'),
        icon: z.string().optional()
    })).default([]),

    // Highlights
    highlights: z.array(z.object({
        title: z.string().min(1, 'Title required'),
        description: z.string().min(1, 'Description required'),
        icon: z.string().min(1, 'Icon required')
    })).default([]),

    // Meta
    duration: z.string().min(1, 'Duration is required'),
    teamSize: z.number().min(1, 'Team size must be at least 1').optional(),
    tools: z.array(z.string()).default([]),

    // SEO
    metaTitle: z.string().min(1, 'Meta title is required').max(60, 'Meta title too long'),
    metaDescription: z.string()
        .min(1, 'Meta description is required')
        .max(160, 'Meta description must be 160 characters or less'),
    keywords: z.array(z.string()).default([]),

    // Navigation
    nextProject: z.object({
        projectId: z.string().optional(),
        title: z.string().optional(),
        slug: z.string().optional()
    }).optional(),

    // Status
    status: z.enum(['draft', 'published', 'archived']).default('draft'),
    publishedAt: z.string().optional()
})

type ProjectFormValues = z.infer<typeof projectSchema>

interface ProjectFormProps {
    formData?: ProjectFormData
    onChange?: (data: ProjectFormData) => void
    onSubmit: (data: ProjectFormData) => void
    isSubmitting?: boolean
}

// Cloudinary widget type
interface CloudinaryWidget {
    open: () => void
    close: (options?: { quiet?: boolean }) => void
}

declare global {
    interface Window {
        cloudinary?: {
            createUploadWidget: (
                options: any,
                callback: (error: Error | null, result: any) => void
            ) => CloudinaryWidget
        }
    }
}

export default function ProjectForm({ formData, onChange, onSubmit, isSubmitting }: ProjectFormProps) {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<'basic' | 'content' | 'gallery' | 'seo'>('basic')
    const [newTool, setNewTool] = useState('')
    const [newKeyword, setNewKeyword] = useState('')
    const [isCloudinaryLoaded, setIsCloudinaryLoaded] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const cloudinaryWidgetRef = useRef<CloudinaryWidget | null>(null)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors, isDirty },
        reset
    } = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema) as any,
        defaultValues: formData || {
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
            status: 'draft',
            publishedAt: undefined
        }
    })

    // Update form when formData changes
    useEffect(() => {
        if (formData) {
            reset(formData)
        }
    }, [formData, reset])

    // Check if Cloudinary is loaded - SIMPLIFIED VERSION
    useEffect(() => {
        const checkCloudinary = () => {
            if (typeof window !== 'undefined' && (window as any).cloudinary) {
                console.log('✅ Cloudinary is available')
                setIsCloudinaryLoaded(true)
                return true
            }
            return false
        }

        // Check immediately
        if (checkCloudinary()) return

        // If not loaded, set up an interval to check
        const interval = setInterval(() => {
            if (checkCloudinary()) {
                clearInterval(interval)
            }
        }, 500)

        // Also listen for custom event if using CloudinaryProvider
        const handleCloudinaryLoaded = () => {
            console.log('Received cloudinary-loaded event')
            setIsCloudinaryLoaded(true)
        }

        window.addEventListener('cloudinary-loaded', handleCloudinaryLoaded)

        return () => {
            clearInterval(interval)
            window.removeEventListener('cloudinary-loaded', handleCloudinaryLoaded)
        }
    }, [])

    const { fields: galleryFields, append: appendGallery, remove: removeGallery, swap: swapGallery } = useFieldArray({
        control,
        name: 'gallery'
    })

    const { fields: resultFields, append: appendResult, remove: removeResult } = useFieldArray({
        control,
        name: 'results'
    })

    const { fields: highlightFields, append: appendHighlight, remove: removeHighlight } = useFieldArray({
        control,
        name: 'highlights'
    })

    // Auto-generate slug from title
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title' && value.title && !value.slug) {
                const slug = value.title
                    .toLowerCase()
                    .replace(/[^a-z0-9\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-')
                    .trim()
                setValue('slug', slug)
            }
        })
        return () => subscription.unsubscribe()
    }, [watch, setValue])

    // Handle form submission
    // Update your handleFormSubmit function:
    const handleFormSubmit = (data: ProjectFormValues) => {
        console.log('🔄 Form submitted with data:', data)

        // Check for validation errors
        console.log('📝 Current form errors:', errors)

        // Validate required cover image
        if (!data.coverImage.url || !data.coverImage.cloudinaryId) {
            console.log('❌ Cover image missing:', data.coverImage)
            toast.error('Cover image is required')
            setActiveTab('gallery')
            return
        }

        console.log('✅ All validations passed')

        const submissionData: ProjectFormData = {
            ...data,
            nextProject: data.nextProject?.projectId ? {
                projectId: data.nextProject.projectId,
                title: data.nextProject.title || '',
                slug: data.nextProject.slug || ''
            } : undefined,
            publishedAt: data.status === 'published' && !data.publishedAt
                ? new Date().toISOString()
                : data.publishedAt
        }

        if (submissionData.teamSize === undefined) {
            delete submissionData.teamSize
        }

        console.log('📤 Final submission data:', submissionData)
        console.log('📤 Stringified:', JSON.stringify(submissionData, null, 2))

        onSubmit(submissionData)
    }

    // Handle image upload to Cloudinary - simplified and robust
    const handleImageUpload = (type: 'cover' | 'gallery') => {
        console.log('Upload button clicked for:', type)

        // Check if window exists (client-side)
        if (typeof window === 'undefined') {
            toast.error('Cannot upload from server-side')
            return
        }

        const cloudinary = (window as any).cloudinary
        if (!cloudinary) {
            toast.error('Cloudinary not loaded. Please refresh the page.')
            console.error('Cloudinary object not found on window')
            return
        }

        // Check environment variables
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

        if (!cloudName || !uploadPreset) {
            toast.error('Cloudinary configuration missing. Please check environment variables.')
            console.error('Missing env vars:', { cloudName, uploadPreset })
            return
        }

        console.log('Creating widget with:', { cloudName, uploadPreset })

        try {
            const widget = cloudinary.createUploadWidget(
                {
                    cloudName,
                    uploadPreset,
                    sources: ['local', 'url', 'camera', 'image_search'],
                    multiple: type === 'gallery',
                    maxFiles: type === 'gallery' ? 10 : 1,
                    resourceType: 'image',
                    cropping: type === 'cover',
                    croppingAspectRatio: type === 'cover' ? 1.777 : undefined, // 16:9 for cover
                    theme: 'minimal',
                    clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
                    maxFileSize: 10000000, // 10MB
                    styles: {
                        palette: {
                            window: "#FFFFFF",
                            sourceBg: "#F4F4F5",
                            windowBorder: "#90A0B3",
                            tabIcon: "#000000",
                            inactiveTabIcon: "#555A5F",
                            menuIcons: "#555A5F",
                            link: "#2563EB",
                            action: "#2563EB",
                            inProgress: "#2563EB",
                            complete: "#10B981",
                            error: "#EF4444",
                            textDark: "#000000",
                            textLight: "#FFFFFF"
                        }
                    }
                },
                (error: any, result: any) => {
                    console.log('Cloudinary callback - event:', result?.event, 'error:', error)

                    if (error) {
                        console.error('Cloudinary widget error:', error)
                        toast.error('Upload failed: ' + (error.message || 'Unknown error'))
                        return
                    }

                    if (result && result.event === 'success') {
                        console.log('Upload successful:', result.info)

                        const imageData = {
                            url: result.info.secure_url,
                            cloudinaryId: result.info.public_id,
                            alt: result.info.original_filename || 'Project image',
                            width: result.info.width,
                            height: result.info.height
                        }

                        if (type === 'cover') {
                            setValue('coverImage', imageData, { shouldValidate: true, shouldDirty: true })
                            toast.success('Cover image uploaded successfully!')
                        } else {
                            appendGallery({
                                ...imageData,
                                label: `Image ${galleryFields.length + 1}`,
                                order: galleryFields.length
                            })
                            toast.success('Gallery image added successfully!')
                        }
                    }
                }
            )

            // Store widget reference if needed
            cloudinaryWidgetRef.current = widget

            // Open the widget
            widget.open()

        } catch (error) {
            console.error('Error creating Cloudinary widget:', error)
            toast.error('Failed to initialize upload: ' + (error as Error).message)
        }
    }

    // Add tool
    const handleAddTool = (e?: any) => {
        if (e && e.key && e.key !== 'Enter') return

        if (newTool.trim()) {
            const currentTools = watch('tools') || []
            const trimmedTool = newTool.trim()

            if (!currentTools.includes(trimmedTool)) {
                setValue('tools', [...currentTools, trimmedTool], { shouldValidate: true })
                setNewTool('')
            } else {
                toast.error('Tool already added')
            }
        }
    }

    // Add keyword
    const handleAddKeyword = (e?: any) => {
        if (e && e.key && e.key !== 'Enter') return

        if (newKeyword.trim()) {
            const currentKeywords = watch('keywords') || []
            const trimmedKeyword = newKeyword.trim()

            if (!currentKeywords.includes(trimmedKeyword)) {
                setValue('keywords', [...currentKeywords, trimmedKeyword], { shouldValidate: true })
                setNewKeyword('')
            } else {
                toast.error('Keyword already added')
            }
        }
    }

    // Remove tool
    const handleRemoveTool = (index: number) => {
        const currentTools = watch('tools') || []
        setValue('tools', currentTools.filter((_, i) => i !== index), { shouldValidate: true })
    }

    // Remove keyword
    const handleRemoveKeyword = (index: number) => {
        const currentKeywords = watch('keywords') || []
        setValue('keywords', currentKeywords.filter((_, i) => i !== index), { shouldValidate: true })
    }

    // Tabs configuration with Lucide icons (no emojis)
    const tabs = [
        { id: 'basic', label: 'Basic Info', icon: <Settings size={18} /> },
        { id: 'content', label: 'Content', icon: <FileText size={18} /> },
        { id: 'gallery', label: 'Gallery', icon: <FileImage size={18} /> },
        { id: 'seo', label: 'SEO & Meta', icon: <Globe size={18} /> }
    ]

    // Clean up widget on unmount
    useEffect(() => {
        return () => {
            if (cloudinaryWidgetRef.current) {
                cloudinaryWidgetRef.current.close({ quiet: true })
            }
        }
    }, [])

    if (!isMounted) {
        return <div className="p-8 text-center text-gray-500">Loading form...</div>
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="divide-y divide-gray-200">
            {/* Debug Section - Add this after tabs but before content */}
            <div className="bg-yellow-50 p-4 border-b border-yellow-200">
                <div className="flex items-center justify-between">
                    <div className="text-sm">
                        <button
                            type="button"
                            onClick={() => {
                                console.log('=== FORM STATE DEBUG ===')
                                console.log('Form errors:', errors)
                                console.log('Form values:', watch())
                                console.log('Cover Image:', watch('coverImage'))
                                console.log('Is Cloudinary loaded:', isCloudinaryLoaded)
                                console.log('Active tab:', activeTab)

                                // Validate form manually
                                handleSubmit(handleFormSubmit)()
                            }}
                            className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700"
                        >
                            Debug Form
                        </button>
                    </div>
                    <div className="text-xs text-gray-600">
                        {isDirty && <span className="text-amber-600 font-medium">● Unsaved changes</span>}
                    </div>
                </div>
            </div>
            {/* Tabs Navigation */}
            <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`
                                flex items-center justify-center gap-2 flex-1 py-4 px-2 sm:px-4 text-sm font-medium border-b-2 transition-colors
                                ${activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }
                            `}
                        >
                            <span className="hidden sm:inline">{tab.icon}</span>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </nav>
            </div>

            <div className="p-4 sm:p-8">
                {/* Basic Info Tab */}
                {activeTab === 'basic' && (
                    <div className="space-y-6 sm:space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                            {/* Left Column */}
                            <div className="space-y-4 sm:space-y-6">
                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Project Title *
                                    </label>
                                    <input
                                        type="text"
                                        {...register('title')}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.title ? 'border-red-300' : 'border-gray-300'}`}
                                        placeholder="Enter project title"
                                    />
                                    {errors.title && (
                                        <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                                    )}
                                </div>

                                {/* Slug */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Slug *
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-500 text-sm truncate max-sm:hidden">creativepluz.com/projects/</span>
                                        <input
                                            type="text"
                                            {...register('slug')}
                                            className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.slug ? 'border-red-300' : 'border-gray-300'}`}
                                            placeholder="project-slug"
                                        />
                                    </div>
                                    {errors.slug && (
                                        <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
                                    )}
                                    <p className="mt-1 text-sm text-gray-500">URL-friendly version of the title</p>
                                </div>

                                {/* Category & Subcategory */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Category *
                                        </label>
                                        <select
                                            {...register('category')}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                                        >
                                            <option value="Branding">Branding</option>
                                            <option value="Social Media">Social Media</option>
                                            <option value="Print">Print</option>
                                            <option value="Photography">Photography</option>
                                            <option value="Package Design">Package Design</option>
                                            <option value="Corporate Display">Corporate Display</option>
                                            <option value="Logo Design">Logo Design</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Subcategory
                                        </label>
                                        <input
                                            type="text"
                                            {...register('subCategory')}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            placeholder="Optional"
                                        />
                                    </div>
                                </div>

                                {/* Year & Duration */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Year *
                                        </label>
                                        <input
                                            type="number"
                                            {...register('year', { valueAsNumber: true })}
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.year ? 'border-red-300' : 'border-gray-300'}`}
                                            min="2000"
                                            max={new Date().getFullYear() + 1}
                                        />
                                        {errors.year && (
                                            <p className="mt-1 text-sm text-red-600">{errors.year.message}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Duration *
                                        </label>
                                        <input
                                            type="text"
                                            {...register('duration')}
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.duration ? 'border-red-300' : 'border-gray-300'}`}
                                            placeholder="e.g., 3 months"
                                        />
                                        {errors.duration && (
                                            <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4 sm:space-y-6">
                                {/* Client Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Client Name
                                    </label>
                                    <input
                                        type="text"
                                        {...register('clientName')}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Optional"
                                    />
                                </div>

                                {/* Display Settings */}
                                <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                                    <h3 className="font-medium text-gray-900">Display Settings</h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Featured Order
                                            </label>
                                            <input
                                                type="number"
                                                {...register('featuredOrder', { valueAsNumber: true })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                                min="0"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Project Size
                                            </label>
                                            <select
                                                {...register('size')}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                                            >
                                                <option value="standard">Standard</option>
                                                <option value="large">Large</option>
                                                <option value="vertical">Vertical</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            id="featured"
                                            {...register('featured')}
                                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                                            Featured Project
                                        </label>
                                        <button type="button" onClick={() => toast('Featured projects appear in the featured section on the homepage', { icon: 'ℹ️' })}>
                                            <HelpCircle size={16} className="text-gray-400 hover:text-gray-600" />
                                        </button>
                                    </div>
                                </div>

                                {/* Team Size */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Team Size
                                    </label>
                                    <input
                                        type="number"
                                        {...register('teamSize', { valueAsNumber: true })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        min="1"
                                        placeholder="Optional"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Excerpt */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Short Excerpt *
                            </label>
                            <textarea
                                {...register('excerpt')}
                                rows={3}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.excerpt ? 'border-red-300' : 'border-gray-300'}`}
                                placeholder="Brief description of the project (max 200 characters)"
                                maxLength={200}
                            />
                            <div className="flex justify-between items-center mt-1">
                                {errors.excerpt ? (
                                    <p className="text-sm text-red-600">{errors.excerpt.message}</p>
                                ) : (
                                    <div /> // Empty div to maintain spacing
                                )}
                                <p className="text-sm text-gray-500">
                                    {watch('excerpt')?.length || 0}/200 characters
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Content Tab */}
                {activeTab === 'content' && (
                    <div className="space-y-8">
                        {/* Challenge & Solution */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Challenge *
                                </label>
                                <textarea
                                    {...register('challenge')}
                                    rows={6}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.challenge ? 'border-red-300' : 'border-gray-300'}`}
                                    placeholder="What was the problem or challenge?"
                                />
                                {errors.challenge && (
                                    <p className="mt-1 text-sm text-red-600">{errors.challenge.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Solution *
                                </label>
                                <textarea
                                    {...register('solution')}
                                    rows={6}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.solution ? 'border-red-300' : 'border-gray-300'}`}
                                    placeholder="How did you solve it?"
                                />
                                {errors.solution && (
                                    <p className="mt-1 text-sm text-red-600">{errors.solution.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Results Section */}
                        <div className="border border-gray-200 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Key Results</h3>
                                    <p className="text-sm text-gray-500">Add measurable outcomes of the project</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => appendResult({ label: '', value: '', icon: '' })}
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <Plus size={16} />
                                    Add Result
                                </button>
                            </div>

                            <div className="space-y-4">
                                {resultFields.map((field, index) => (
                                    <div key={field.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg bg-white">
                                        <div className="flex-1 grid grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                    Label
                                                </label>
                                                <input
                                                    {...register(`results.${index}.label`)}
                                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="e.g., Revenue Increase"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                    Value
                                                </label>
                                                <input
                                                    {...register(`results.${index}.value`)}
                                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="e.g., +45%"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                    Icon
                                                </label>
                                                <select
                                                    {...register(`results.${index}.icon`)}
                                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                >
                                                    <option value="">Select Icon</option>
                                                    <option value="Award">Award</option>
                                                    <option value="TrendingUp">Trending Up</option>
                                                    <option value="Users">Users</option>
                                                    <option value="Target">Target</option>
                                                    <option value="DollarSign">Revenue</option>
                                                </select>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeResult(index)}
                                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Highlights Section */}
                        <div className="border border-gray-200 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Project Highlights</h3>
                                    <p className="text-sm text-gray-500">Key features or achievements</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => appendHighlight({ title: '', description: '', icon: '' })}
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <Plus size={16} />
                                    Add Highlight
                                </button>
                            </div>

                            <div className="space-y-4">
                                {highlightFields.map((field, index) => (
                                    <div key={field.id} className="p-4 border border-gray-200 rounded-lg bg-white">
                                        <div className="flex items-start justify-between mb-4">
                                            <h4 className="font-medium text-gray-900">Highlight #{index + 1}</h4>
                                            <button
                                                type="button"
                                                onClick={() => removeHighlight(index)}
                                                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                    Title *
                                                </label>
                                                <input
                                                    {...register(`highlights.${index}.title`)}
                                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="e.g., Innovative Design"
                                                />
                                            </div>
                                            <div className="lg:col-span-2">
                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                    Description *
                                                </label>
                                                <textarea
                                                    {...register(`highlights.${index}.description`)}
                                                    rows={2}
                                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="Describe this highlight"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                    Icon *
                                                </label>
                                                <select
                                                    {...register(`highlights.${index}.icon`)}
                                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                >
                                                    <option value="">Select Icon</option>
                                                    <option value="Lightbulb">Lightbulb</option>
                                                    <option value="Rocket">Rocket</option>
                                                    <option value="Star">Star</option>
                                                    <option value="CheckCircle">Check</option>
                                                    <option value="Clock">Clock</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Gallery Tab */}
                {activeTab === 'gallery' && (
                    <div className="space-y-8">
                        {/* Debug Info (remove in production) */}
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <HelpCircle className="text-yellow-600" size={16} />
                                    <span className="text-sm font-medium text-yellow-800">Debug Info</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        console.log('Cloudinary test:')
                                        console.log('- window.cloudinary:', (window as any).cloudinary)
                                        console.log('- Cloud Name:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME)
                                        console.log('- Upload Preset:', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET)

                                        if ((window as any).cloudinary) {
                                            toast.success('✅ Cloudinary is loaded!')
                                        } else {
                                            toast.error('❌ Cloudinary not loaded')
                                        }
                                    }}
                                    className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded border border-yellow-300 hover:bg-yellow-200 transition-colors"
                                >
                                    Test Cloudinary
                                </button>
                            </div>
                            <div className="text-xs text-yellow-700 space-y-1">
                                <div>Cloudinary Loaded: {isCloudinaryLoaded ? '✅ Yes' : '❌ No'}</div>
                                <div>Cloud Name: {process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? '✅ Set' : '❌ Not set'}</div>
                                <div>Upload Preset: {process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ? '✅ Set' : '❌ Not set'}</div>
                            </div>
                        </div>

                        {/* Cover Image */}
                        <div className="border border-gray-200 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Cover Image *</h3>
                                    <p className="text-sm text-gray-500">Main project image displayed in listings</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    {!isCloudinaryLoaded && (
                                        <span className="text-xs text-amber-600">Loading Cloudinary...</span>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => handleImageUpload('cover')}
                                        disabled={!isCloudinaryLoaded}
                                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {isCloudinaryLoaded ? (
                                            <>
                                                <Upload size={16} />
                                                Upload Cover Image
                                            </>
                                        ) : (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Loading...
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {watch('coverImage.url') ? (
                                <div className="space-y-4">
                                    <div className="relative w-full max-w-md h-64 rounded-lg overflow-hidden border border-gray-200">
                                        <img
                                            src={watch('coverImage.url')}
                                            alt={watch('coverImage.alt')}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 max-w-md">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Alt Text *
                                            </label>
                                            <input
                                                {...register('coverImage.alt')}
                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Dimensions
                                            </label>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <span>{watch('coverImage.width')} × {watch('coverImage.height')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                    <p className="mt-4 text-sm text-gray-600">No cover image uploaded</p>
                                    <p className="mt-2 text-xs text-gray-500">Click the upload button above to add a cover image</p>
                                </div>
                            )}
                        </div>

                        {/* Gallery Images */}
                        <div className="border border-gray-200 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Gallery Images</h3>
                                    <p className="text-sm text-gray-500">Additional images for project detail page</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    {!isCloudinaryLoaded && (
                                        <span className="text-xs text-amber-600">Loading Cloudinary...</span>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => handleImageUpload('gallery')}
                                        disabled={!isCloudinaryLoaded}
                                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {isCloudinaryLoaded ? (
                                            <>
                                                <Upload size={16} />
                                                Upload Gallery Images
                                            </>
                                        ) : (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Loading...
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {galleryFields.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {galleryFields.map((field, index) => (
                                        <div key={field.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                                            <div className="relative aspect-video">
                                                <img
                                                    src={watch(`gallery.${index}.url`)}
                                                    alt={watch(`gallery.${index}.alt`)}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute top-2 right-2 flex gap-1">
                                                    <button
                                                        type="button"
                                                        onClick={() => index > 0 && swapGallery(index, index - 1)}
                                                        className="p-1 bg-white/80 backdrop-blur-sm rounded hover:bg-white transition-colors"
                                                        disabled={index === 0}
                                                        title="Move up"
                                                    >
                                                        <MoveUp size={14} />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => index < galleryFields.length - 1 && swapGallery(index, index + 1)}
                                                        className="p-1 bg-white/80 backdrop-blur-sm rounded hover:bg-white transition-colors"
                                                        disabled={index === galleryFields.length - 1}
                                                        title="Move down"
                                                    >
                                                        <MoveDown size={14} />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            if (confirm('Are you sure you want to remove this image?')) {
                                                                removeGallery(index)
                                                            }
                                                        }}
                                                        className="p-1 bg-white/80 backdrop-blur-sm rounded hover:bg-red-50 hover:text-red-600 transition-colors"
                                                        title="Remove image"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <div className="space-y-2">
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                                            Label
                                                        </label>
                                                        <input
                                                            {...register(`gallery.${index}.label`)}
                                                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                            placeholder="Image description"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                                            Alt Text
                                                        </label>
                                                        <input
                                                            {...register(`gallery.${index}.alt`)}
                                                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                            placeholder="Accessibility description"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                                            Order
                                                        </label>
                                                        <input
                                                            type="number"
                                                            {...register(`gallery.${index}.order`, { valueAsNumber: true })}
                                                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                            min="0"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                    <p className="mt-4 text-sm text-gray-600">No gallery images uploaded yet</p>
                                    <p className="mt-2 text-xs text-gray-500">Click the upload button above to add gallery images</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* SEO Tab */}
                {activeTab === 'seo' && (
                    <div className="space-y-8">
                        {/* Meta Info */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                {/* Meta Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Meta Title *
                                    </label>
                                    <input
                                        type="text"
                                        {...register('metaTitle')}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.metaTitle ? 'border-red-300' : 'border-gray-300'}`}
                                        placeholder="Page title for search engines"
                                    />
                                    <div className="flex justify-between mt-1">
                                        {errors.metaTitle && (
                                            <p className="text-sm text-red-600">{errors.metaTitle.message}</p>
                                        )}
                                        <p className="text-sm text-gray-500 ml-auto">
                                            {watch('metaTitle')?.length || 0}/60 characters
                                        </p>
                                    </div>
                                </div>

                                {/* Meta Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Meta Description *
                                    </label>
                                    <textarea
                                        {...register('metaDescription')}
                                        rows={4}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.metaDescription ? 'border-red-300' : 'border-gray-300'}`}
                                        placeholder="Brief description for search results"
                                    />
                                    <div className="flex justify-between mt-1">
                                        {errors.metaDescription && (
                                            <p className="text-sm text-red-600">{errors.metaDescription.message}</p>
                                        )}
                                        <p className="text-sm text-gray-500 ml-auto">
                                            {watch('metaDescription')?.length || 0}/160 characters
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {/* Keywords */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Keywords
                                    </label>
                                    <div className="flex gap-2 mb-3">
                                        <input
                                            type="text"
                                            value={newKeyword}
                                            onChange={(e) => setNewKeyword(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeyword())}
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Add a keyword"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddKeyword}
                                            className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Add
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border border-gray-300 rounded-lg bg-gray-50">
                                        {watch('keywords')?.map((keyword, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-gray-200 rounded-full text-sm"
                                            >
                                                {keyword}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const current = watch('keywords') || []
                                                        setValue('keywords', current.filter((_, i) => i !== index))
                                                    }}
                                                    className="text-gray-400 hover:text-red-600"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                        {(!watch('keywords') || watch('keywords').length === 0) && (
                                            <span className="text-gray-400 text-sm">No keywords added</span>
                                        )}
                                    </div>
                                </div>

                                {/* Tools */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tools & Technologies
                                    </label>
                                    <div className="flex gap-2 mb-3">
                                        <input
                                            type="text"
                                            value={newTool}
                                            onChange={(e) => setNewTool(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTool())}
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Add a tool"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddTool}
                                            className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Add
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border border-gray-300 rounded-lg bg-gray-50">
                                        {watch('tools')?.map((tool, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-gray-200 rounded-full text-sm"
                                            >
                                                {tool}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const current = watch('tools') || []
                                                        setValue('tools', current.filter((_, i) => i !== index))
                                                    }}
                                                    className="text-gray-400 hover:text-red-600"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                        {(!watch('tools') || watch('tools').length === 0) && (
                                            <span className="text-gray-400 text-sm">No tools added</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SEO Preview */}
                        <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Preview</h3>
                            <div className="max-w-2xl">
                                <div className="p-4 bg-white border border-gray-300 rounded-lg">
                                    <div className="mb-2">
                                        <h4 className="text-blue-800 text-lg font-medium truncate">
                                            {watch('metaTitle') || 'Example: Creative Branding Project - Creative Pluz'}
                                        </h4>
                                        <p className="text-green-700 text-sm truncate">
                                            creativepluz.com/projects/{watch('slug') || 'project-slug'}
                                        </p>
                                    </div>
                                    <p className="text-gray-700 text-sm">
                                        {watch('metaDescription') || 'Brief description of the project for search results...'}
                                    </p>
                                </div>
                                <p className="mt-2 text-sm text-gray-500">
                                    This is how your project might appear in search results.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Form Actions */}
            <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="text-sm text-gray-600">
                        {isDirty && <span className="text-amber-600 font-medium">● You have unsaved changes</span>}
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="flex-1 sm:flex-none px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || !watch('coverImage.url')}
                            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    {formData?._id ? 'Updating...' : 'Creating...'}
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    {formData?._id ? 'Update Project' : 'Create Project'}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
