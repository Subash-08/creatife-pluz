'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, Plus } from 'lucide-react'
import { useProjectsFilter } from './hooks/useProjectsFilter'
import type { ProjectGridProps } from './types'

export default function ProjectGrid({ projects }: ProjectGridProps) {
    const { filter } = useProjectsFilter()

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter)

    return (
        <section className="px-6 lg:px-12 max-w-[1920px] mx-auto pb-40">
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:auto-rows-[300px]"
            >
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.article
                            layout
                            key={project._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5 }}
                            className={`relative group overflow-hidden rounded-[2rem] bg-gray-900 border border-white/5 ${project.size === 'large' ? 'md:col-span-2 md:row-span-2' :
                                project.size === 'vertical' ? 'md:row-span-2' : ''
                                }`}
                        >
                            <Link
                                href={`/portfolio/${project.slug}`}
                                className="block h-full w-full focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-gray-900 rounded-[2rem]"
                                aria-label={`View ${project.title} project details`}
                            >
                                {/* Image */}
                                {project.coverImage?.url ? (
                                    <img
                                        src={project.coverImage.url}
                                        alt={project.coverImage.alt || project.title}
                                        className="w-full h-full object-cover transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                        <span className="text-white/40 text-lg font-medium">{project.title}</span>
                                    </div>
                                )}

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                                {/* Content */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    <div className="flex justify-between items-end">
                                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <span className="inline-block px-3 py-1 bg-brand-primary text-black text-[10px] font-black uppercase tracking-widest mb-4">
                                                {project.category}
                                            </span>
                                            <h2 className="text-3xl md:text-4xl font-display font-bold text-white uppercase leading-none">
                                                {project.title}
                                            </h2>
                                            {project.clientName && (
                                                <p className="text-slate-400 text-sm mt-2">for {project.clientName}</p>
                                            )}
                                        </div>
                                        <div
                                            className="w-12 h-12 rounded-full border b-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100"
                                            aria-hidden="true"
                                        >
                                            <ArrowUpRight className="text-brand-primary" />
                                        </div>
                                    </div>
                                </div>

                                {/* Corner Tag */}
                                <div
                                    className="absolute top-8 right-8 text-white/40 font-mono text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                                    aria-hidden="true"
                                >
                                    {project.year}
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </AnimatePresence>

            </motion.div>

            {/* Empty State */}
            <AnimatePresence>
                {filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-20"
                    >
                        <h3 className="text-2xl font-display font-bold text-white mb-4">
                            No projects found
                        </h3>
                        <p className="text-slate-400 mb-8">
                            Try selecting a different category or check back soon for new projects.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-white/5 text-white rounded-full hover:bg-white/10 transition-colors"
                        >
                            Reload Projects
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
