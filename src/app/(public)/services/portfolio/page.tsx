'use client';

import React, { useState } from 'react';
import SEO from '@/components/SEO';
import { ArrowUpRight, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const Portfolio: React.FC = () => {
    const [filter, setFilter] = useState('All');

    const categories = ['All', 'Branding', 'Social Media', 'Print', 'Photography'];

    const projects = [
        {
            id: 'nebula',
            title: 'Nebula Fintech',
            category: 'Branding',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
            year: '2024',
            size: 'large' // Spans 2 columns
        },
        {
            id: 'aura',
            title: 'Aura Skin',
            category: 'Social Media',
            image: 'https://images.unsplash.com/photo-1596462502278-27bfad450216?q=80&w=800&auto=format&fit=crop',
            year: '2024',
            size: 'vertical' // Taller card
        },
        {
            id: 'vortex',
            title: 'Vortex Motion',
            category: 'Print',
            image: 'https://images.unsplash.com/photo-1586075010633-de44f508c39b?q=80&w=800&auto=format&fit=crop',
            year: '2023',
            size: 'standard'
        },
        {
            id: 'essence',
            title: 'Essence Co.',
            category: 'Photography',
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
            year: '2024',
            size: 'standard'
        },
        {
            id: 'cyber',
            title: 'Cyber Motors',
            category: 'Branding',
            image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop',
            year: '2024',
            size: 'large'
        },
        {
            id: 'luxe',
            title: 'Luxe Prints',
            category: 'Print',
            image: 'https://images.unsplash.com/photo-1626785774583-b756fe9785da?q=80&w=800&auto=format&fit=crop',
            year: '2023',
            size: 'standard'
        },
        {
            id: 'glow',
            title: 'Glow Campaign',
            category: 'Social Media',
            image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop',
            year: '2024',
            size: 'vertical'
        },
        {
            id: 'studio',
            title: 'Studio X',
            category: 'Photography',
            image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop',
            year: '2023',
            size: 'standard'
        }
    ];

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <>
            <SEO
                title="Portfolio - Creative Pluz"
                description="Our work speaks for itself. Explore our collection of premium branding, social media, and print designs."
            />

            <div className="pt-32 pb-40 bg-brand-dark min-h-screen">
                <div className="max-w-[1920px] mx-auto px-6 lg:px-12">

                    {/* Header Section */}
                    <div className="flex flex-col mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-7xl md:text-[12vw] font-display font-black text-white leading-[0.8] uppercase tracking-tighter mb-12 italic">
                                Our <br /> <span className="text-brand-primary">Work.</span>
                            </h1>
                        </motion.div>

                        {/* Filter Bar */}
                        <div className="flex flex-wrap gap-4 md:gap-8 border-b border-white/10 pb-8 overflow-x-auto no-scrollbar">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`relative text-sm font-bold uppercase tracking-[0.2em] transition-all whitespace-nowrap ${filter === cat ? 'text-brand-primary' : 'text-slate-500 hover:text-white'
                                        }`}
                                >
                                    {cat}
                                    {filter === cat && (
                                        <motion.div
                                            layoutId="filterUnderline"
                                            className="absolute -bottom-8 left-0 w-full h-1 bg-brand-primary"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Bento Grid */}
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:auto-rows-[300px]"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project) => (
                                <motion.div
                                    layout
                                    key={project.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.5 }}
                                    className={`relative group overflow-hidden rounded-[2rem] bg-brand-gray border border-white/5 cursor-pointer ${project.size === 'large' ? 'md:col-span-2 md:row-span-2' :
                                        project.size === 'vertical' ? 'md:row-span-2' : ''
                                        }`}
                                >
                                    <Link href={`/portfolio/${project.id}`} className="block h-full w-full">
                                        {/* Image */}
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                                        />

                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                                        {/* Content */}
                                        <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                            <div className="flex justify-between items-end">
                                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                    <span className="inline-block px-3 py-1 bg-brand-primary text-black text-[10px] font-black uppercase tracking-widest mb-4">
                                                        {project.category}
                                                    </span>
                                                    <h3 className="text-3xl md:text-4xl font-display font-bold text-white uppercase leading-none">
                                                        {project.title}
                                                    </h3>
                                                </div>
                                                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                                                    <ArrowUpRight className="text-brand-primary" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Corner Tag */}
                                        <div className="absolute top-8 right-8 text-white/40 font-mono text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                            {project.year}
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Empty State / Add More CTA */}
                        <motion.div
                            layout
                            className="border-2 border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center p-12 hover:border-brand-primary/40 transition-colors group cursor-pointer"
                        >
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-black transition-all">
                                <Plus size={32} />
                            </div>
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm group-hover:text-white transition-colors">Start Your Project</p>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </>
    );
};

export default Portfolio;