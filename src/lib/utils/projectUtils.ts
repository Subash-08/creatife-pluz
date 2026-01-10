// lib/utils/projectUtils.ts
import { IProject, ProjectCategory } from '@/lib/types/project';

export const categoryColors: Record<ProjectCategory, string> = {
    'Branding': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'Social Media': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'Print': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Photography': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    'Package Design': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Logo Design': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Corporate Display': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
};

export const categoryIcons: Record<ProjectCategory, string> = {
    'Branding': 'Palette',
    'Social Media': 'Share2',
    'Print': 'Printer',
    'Photography': 'Camera',
    'Package Design': 'Package',
    'Logo Design': 'Palette',
    'Corporate Display': 'Building2'
};

export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special chars
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/--+/g, '-') // Replace multiple hyphens with single
        .trim();
}

export function validateProjectData(data: Partial<IProject>): string[] {
    const errors: string[] = [];

    if (!data.title?.trim()) errors.push('Title is required');
    if (!data.slug?.trim()) errors.push('Slug is required');
    if (!data.excerpt?.trim() || data.excerpt.length > 200) errors.push('Excerpt is required and must be under 200 characters');
    if (!data.category) errors.push('Category is required');
    if (!data.year || data.year < 2000 || data.year > new Date().getFullYear() + 1) errors.push('Valid year is required');
    if (!data.coverImage?.url) errors.push('Cover image is required');
    if (!data.challenge?.trim()) errors.push('Challenge is required');
    if (!data.solution?.trim()) errors.push('Solution is required');
    if (!data.duration?.trim()) errors.push('Duration is required');
    if (!data.metaTitle?.trim()) errors.push('Meta title is required');
    if (!data.metaDescription?.trim() || data.metaDescription.length > 160) errors.push('Meta description is required and must be under 160 characters');

    return errors;
}