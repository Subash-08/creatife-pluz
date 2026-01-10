import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface ProjectCardProps {
    project: {
        title: string
        slug: string
        category: string
        coverImage: {
            url: string
            alt: string
        }
        year: number
        excerpt: string
    }
    index?: number
}

// Separate the motion component to avoid server component issues if imported directly in page.tsx
// However, since this is a component usage, we can make it a client component if we want animations.
// Or just keep it simple for now. Let's make it a functional component.

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
    return (
        <Link
            href={`/portfolio/${project.slug}`}
            className="group block"
        >
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-gray-100 mb-4">
                <Image
                    src={project.coverImage.url}
                    alt={project.coverImage.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
            </div>

            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-xl font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        {project.category} — {project.year}
                    </p>
                </div>
                <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <ArrowUpRight size={16} />
                </div>
            </div>
        </Link>
    )
}
