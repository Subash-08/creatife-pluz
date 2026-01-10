import { connectToDatabase } from '@/lib/db'
import Project from '@/lib/models/Project'
import { notFound } from 'next/navigation'
import CaseStudyContent from './CaseStudyContent'
import CaseStudyHero from './CaseStudyHero.client'
import CaseStudyGallery from './CaseStudyGallery.client'
import { ProjectWithDetails } from './types'
import type { Metadata } from 'next'

interface PageProps {
    params: Promise<{ slug: string }>
}

// ISR: Revalidate every 24 hours
export const revalidate = 86400

// Generate static params at build time
export async function generateStaticParams() {
    await connectToDatabase()

    const projects = await Project.find({ status: 'published' })
        .select('slug')
        .lean()

    return projects.map((project: any) => ({
        slug: project.slug,
    }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    await connectToDatabase()

    const project = await Project.findOne({
        slug
    }).lean() as any

    if (!project) {
        return {
            title: 'Case Study Not Found | Creative Pluz',
            description: 'The requested case study could not be found.'
        }
    }

    return {
        title: `${project.title} - Case Study | Creative Pluz`,
        description: project.excerpt || project.metaDescription,
        openGraph: {
            title: `${project.title} - Case Study`,
            description: project.excerpt || project.metaDescription,
            images: project.coverImage?.url ? [project.coverImage.url] : [],
            type: 'article',
            publishedTime: project.publishedAt?.toISOString(),
        },
        twitter: {
            card: 'summary_large_image',
            title: `${project.title} - Case Study`,
            description: project.excerpt || project.metaDescription,
            images: project.coverImage?.url ? [project.coverImage.url] : [],
        },
        alternates: {
            canonical: `/portfolio/${project.slug}`,
        }
    }
}

async function getProject(slug: string): Promise<ProjectWithDetails | null> {
    try {
        await connectToDatabase()

        const project = await Project.findOne({
            slug
        })
            .select(`
        title slug category year excerpt 
        challenge solution results highlights
        duration teamSize tools clientName
        coverImage gallery metaTitle metaDescription
        nextProject createdAt publishedAt updatedAt
        subCategory featured size
      `)
            .populate({
                path: 'nextProject.projectId',
                select: 'title slug category coverImage',
                model: Project
            })
            .lean() as any

        if (!project) return null

        // Handle nextProject data
        const nextProject = project.nextProject?.projectId
            ? {
                title: project.nextProject.projectId.title,
                slug: project.nextProject.projectId.slug,
                category: project.nextProject.projectId.category,
                coverImage: project.nextProject.projectId.coverImage
            }
            : null

        const serialized = JSON.parse(JSON.stringify({
            ...project,
            nextProject
        }))

        return serialized
    } catch (error) {
        console.error('Failed to fetch project:', error)
        return null
    }
}

async function getNextProject(currentSlug: string): Promise<any> {
    try {
        await connectToDatabase()

        const nextProject = await Project.findOne({
            slug: { $ne: currentSlug },
            status: 'published'
        })
            .sort({ publishedAt: -1 })
            .select('title slug category coverImage')
            .lean()

        return nextProject ? JSON.parse(JSON.stringify(nextProject)) : null
    } catch (error) {
        console.error('Failed to fetch next project:', error)
        return null
    }
}

export default async function CaseStudyPage({ params }: PageProps) {
    const { slug } = await params

    const [project, nextProject] = await Promise.all([
        getProject(slug),
        getNextProject(slug)
    ])

    if (!project) {
        notFound()
    }

    return (
        <>
            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'CreativeWork',
                        headline: project.title,
                        description: project.excerpt,
                        image: project.coverImage?.url,
                        datePublished: project.publishedAt,
                        dateModified: project.updatedAt || project.createdAt,
                        author: {
                            '@type': 'Organization',
                            name: 'Creative Pluz'
                        },
                        publisher: {
                            '@type': 'Organization',
                            name: 'Creative Pluz',
                            logo: {
                                '@type': 'ImageObject',
                                url: '/logo.png'
                            }
                        },
                        mainEntityOfPage: {
                            '@type': 'WebPage',
                            '@id': `/portfolio/${project.slug}`
                        }
                    })
                }}
            />

            <div className="bg-brand-dark min-h-screen text-white selection:bg-brand-primary selection:text-black">
                <CaseStudyHero project={project} />
                <CaseStudyContent project={project} />
                <CaseStudyGallery gallery={project.gallery || []} />
            </div>

            {/* Next Project CTA - Use nextProject from DB or get random one */}
            {(project.nextProject || nextProject) && (
                <section className="relative py-60 bg-brand-primary text-black overflow-hidden group">
                    <a
                        href={`/portfolio/${(project.nextProject || nextProject).slug}`}
                        className="absolute inset-0 z-20 flex flex-col items-center justify-center focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-brand-primary"
                        aria-label={`Continue to next project: ${(project.nextProject || nextProject).title}`}
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] mb-6 group-hover:tracking-[1em] transition-all duration-500">
                            Continue the Journey
                        </span>
                        <h2 className="text-6xl md:text-[10vw] font-display font-black uppercase italic leading-none text-center">
                            {(project.nextProject || nextProject).title}
                        </h2>
                        <div className="mt-16 w-24 h-24 rounded-full bg-black flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                            <span className="sr-only">View next project</span>
                            <svg
                                className="w-10 h-10"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </a>

                    {/* Decorative Background Text */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap opacity-5 pointer-events-none select-none">
                        <span className="text-[30vw] font-display font-black uppercase italic">NEXT PROJECT NEXT PROJECT</span>
                    </div>
                </section>
            )}
        </>
    )
}