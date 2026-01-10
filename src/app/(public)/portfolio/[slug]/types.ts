export interface GalleryItem {
    url: string
    alt?: string
    label?: string
    order?: number
    cloudinaryId?: string
}

export interface ResultItem {
    label: string
    value: string
    icon?: string
}

export interface HighlightItem {
    title: string
    description: string
    icon: string
}

export interface ProjectWithDetails {
    _id: string
    title: string
    slug: string
    category: string
    year: number
    excerpt: string
    clientName?: string
    duration?: string
    teamSize?: number
    tools?: string[]
    challenge?: string
    solution?: string
    results?: ResultItem[]
    highlights?: HighlightItem[]
    coverImage?: {
        url: string
        alt: string
        cloudinaryId: string
        width?: number
        height?: number
    }
    gallery?: GalleryItem[]
    metaTitle?: string
    metaDescription?: string
    publishedAt?: string
    createdAt: string
    updatedAt?: string
    nextProject?: {
        title?: string
        slug?: string
        category?: string
        coverImage?: any
    }
    subCategory?: string
    featured?: boolean
    size?: string
}