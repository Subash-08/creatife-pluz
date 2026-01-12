'use client';

import React from 'react';
import SEO from '@/components/SEO';
import Button from '@/components/Button';
import { motion } from 'framer-motion';

import { heroTitle, heroSubtitle, heroParagraph, buttonText } from './content';
import { useHeroScale } from './animation';

const BrochureHero: React.FC = () => {
    const { containerRef, scale } = useHeroScale();

    return (
        <>
            <SEO
                title="Brochure & Print Advertising - Creative Pluz"
                description="Professional company profiles, catalogs, flyers, and scroll-stopping social media creatives. Tell your story clearly with high-impact print and digital ads."
            />

            {/* 1. HERO SECTION: Tactile Editorial Impact */}
            <section
                ref={containerRef}
                className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col justify-center pt-20"
            >
                <div className="absolute inset-0 bg-noise opacity-[0.03]"></div>
                <motion.div style={{ scale }} className="max-w-[1440px] mx-auto px-6 lg:px-12 w-full relative z-10">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-black/40 font-bold tracking-[0.5em] uppercase text-[10px] mb-8 block"
                    >
                        {heroSubtitle}
                    </motion.span>
                    <h1 className="text-6xl md:text-[10vw] font-display font-black leading-[0.85] uppercase tracking-tighter mb-12">
                        {heroTitle}
                    </h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
                        <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-xl font-medium">
                            {heroParagraph}
                        </p>
                        <div className="flex lg:justify-end gap-4">
                            <Button href="/contact" className="bg-black text-white px-10 py-5 rounded-none hover:bg-brand-primary hover:text-black font-bold uppercase tracking-widest text-sm">{buttonText}</Button>
                        </div>
                    </div>
                </motion.div>

                {/* Floating Paper Elements Decor */}
                <div className="absolute right-[-10%] bottom-[10%] w-[40vw] h-[60vh] opacity-10 pointer-events-none rotate-12 hidden lg:block">
                    <div className="w-full h-full bg-slate-300 border border-black/10 shadow-2xl rounded-sm"></div>
                </div>
            </section>
        </>
    );
};

export default BrochureHero;
