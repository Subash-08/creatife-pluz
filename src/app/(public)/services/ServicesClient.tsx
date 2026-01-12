'use client';

import React from 'react';
import Button from '@/components/Button';
import { motion } from 'framer-motion';
import { ArrowRight, Box, Share2, Layers, PenTool, Camera, Monitor, Printer } from 'lucide-react';
import Link from 'next/link';

const ServicesClient: React.FC = () => {
    const services = [
        {
            title: "Logo & Branding",
            path: "/services/branding",
            description: "Custom logo design and identity systems that forge global legacies.",
            icon: <PenTool className="w-12 h-12" />,
            tags: ["Identity", "Strategy", "Guidelines"]
        },
        {
            title: "Product Package Designing",
            path: "/services/package-design",
            description: "Structural and graphic design for premium retail presence.",
            icon: <Box className="w-12 h-12" />,
            tags: ["Industrial", "Box Design", "Mockups"]
        },
        {
            title: "Social Media Post",
            path: "/services/social-media",
            description: "High-engagement creatives for Instagram, FB, and WhatsApp.",
            icon: <Share2 className="w-12 h-12" />,
            tags: ["Reels", "Posts", "Ads"]
        },
        {
            title: "Flex Banner Designs",
            path: "/services/flex-banner",
            description: "Grand scale outdoor visuals and event hoarding designs.",
            icon: <Layers className="w-12 h-12" />,
            tags: ["Hoarding", "Banners", "Outdoor"]
        },
        {
            title: "Brochure & Print Advertising",
            path: "/services/brochure-media",
            description: "Tactile editorial design for company profiles and catalogs.",
            icon: <Printer className="w-12 h-12" />,
            tags: ["Catalogs", "Editorial", "Print"]
        },
        {
            title: "Product Photography",
            path: "/services/photography",
            description: "Studio-grade imagery that builds instant product trust.",
            icon: <Camera className="w-12 h-12" />,
            tags: ["Ecommerce", "Lifestyle", "Retouch"]
        },
        {
            title: "Corporate Display",
            path: "/services/corporate-display",
            description: "Office branding and exhibition stall visual solutions.",
            icon: <Monitor className="w-12 h-12" />,
            tags: ["Workspace", "Signage", "Exhibition"]
        }
    ];

    return (
        <div className="bg-brand-dark min-h-screen pt-32 pb-20 px-6 md:px-12">
            <div className="max-w-[1920px] mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-32 border-b border-white/20 pb-12"
                >
                    <h1 className="text-6xl md:text-9xl font-display font-black uppercase text-white mb-6">
                        Capabilities
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 max-w-2xl">
                        Precision creativity across every touchpoint. From digital feeds to physical storefronts.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-8">
                    {services.map((item, index) => (
                        <Link href={item.path} key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group border border-white/10 p-8 md:p-16 hover:bg-white/5 transition-colors relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                                    <div className="lg:col-span-1 text-brand-primary">
                                        {item.icon}
                                    </div>
                                    <div className="lg:col-span-4">
                                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white uppercase">{item.title}</h2>
                                    </div>
                                    <div className="lg:col-span-4">
                                        <p className="text-lg text-slate-400 leading-relaxed">{item.description}</p>
                                    </div>
                                    <div className="lg:col-span-3 flex justify-between items-center">
                                        <div className="flex flex-wrap gap-2">
                                            {item.tags.map((tag, tIdx) => (
                                                <span key={tIdx} className="px-3 py-1 border border-white/20 rounded-full text-[10px] text-slate-500 uppercase tracking-widest">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <ArrowRight className="text-brand-primary opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ServicesClient;
