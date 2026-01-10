export interface Project {
    _id: string
    title: string
    slug: string
    category: string
    year: number
    excerpt: string
    clientName?: string
    duration?: string
    coverImage?: {
        url: string
        alt: string
        cloudinaryId: string
        width?: number
        height?: number
    }
    size?: 'standard' | 'large' | 'vertical'
    featured?: boolean
    featuredOrder?: number
    status?: string
}

export interface PortfolioFiltersProps {
    categories: string[]
}

export interface ProjectGridProps {
    projects: Project[]
}

export interface UseProjectsFilterReturn {
    filter: string
    setFilter: (filter: string) => void
}
