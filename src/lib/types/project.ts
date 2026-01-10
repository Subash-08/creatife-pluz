export interface GalleryImage {
    url: string;
    cloudinaryId: string;
    alt: string;
    label: string;
    order: number;
}

export interface ResultItem {
    label: string;
    value: string;
    icon?: string;
}

export interface HighlightItem {
    title: string;
    description: string;
    icon: string;
}

export interface NextProject {
    projectId: string;
    title: string;
    slug: string;
}

export interface CoverImage {
    url: string;
    cloudinaryId: string;
    alt: string;
    width: number;
    height: number;
}

export interface IProject {
    _id?: string;
    title: string;
    slug: string;
    excerpt: string;
    category: 'Branding' | 'Social Media' | 'Print' | 'Photography' | 'Package Design' | 'Corporate Display';
    subCategory?: string;
    featured: boolean;
    featuredOrder: number;
    size: 'standard' | 'large' | 'vertical';
    year: number;
    clientName?: string;
    coverImage: CoverImage;
    gallery: GalleryImage[];
    challenge: string;
    solution: string;
    results: ResultItem[];
    highlights: HighlightItem[];
    duration: string;
    teamSize?: number;
    tools: string[];
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    nextProject?: NextProject;
    status: 'draft' | 'published' | 'archived';
    publishedAt?: string | Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ProjectFormData extends Omit<IProject, '_id' | 'createdAt' | 'updatedAt' | 'nextProjectDetails' | 'status' | 'publishedAt'> {
    _id?: string;
    status: 'draft' | 'published' | 'archived';
    publishedAt?: string;
    nextProject?: {
        projectId: string;
        title: string;
        slug: string;
    };
}

export interface CloudinaryUploadResult {
    secure_url: string;
    public_id: string;
    width: number;
    height: number;
}

export interface APIResponse {
    success: boolean;
    message: string;
    data?: IProject;
    error?: string;
}