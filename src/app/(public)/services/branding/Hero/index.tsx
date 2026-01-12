'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/Button';
import { HERO_CONTENT } from './content';
import { heroMotion, rotateMotion } from './animation';

const Hero: React.FC = () => {
    return (
        <section className="relative min-h-screen flex items-center bg-brand-dark overflow-hidden pt-20">
            <div className="absolute inset-0 bg-noise opacity-10"></div>

            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* LEFT CONTENT */}
                <motion.div {...heroMotion} className="relative z-10">
                    <span className="text-brand-primary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">
                        {HERO_CONTENT.sectionLabel}
                    </span>

                    <h1 className="text-6xl md:text-8xl font-display font-black text-white leading-none mb-8 uppercase italic">
                        {HERO_CONTENT.titleLine1} <br />
                        <span className="text-brand-primary">
                            {HERO_CONTENT.titleLine2}
                        </span>
                    </h1>

                    <p className="text-xl text-slate-400 leading-relaxed max-w-lg mb-10 border-l-4 border-brand-primary pl-6">
                        {HERO_CONTENT.description}
                    </p>

                    <Button
                        href="/contact"
                        className="px-12 py-6 text-lg rounded-none bg-white text-black hover:bg-brand-primary"
                    >
                        {HERO_CONTENT.cta}
                    </Button>
                </motion.div>

                {/* RIGHT VISUAL */}
                <div className="relative aspect-square flex items-center justify-center">
                    <motion.div
                        {...rotateMotion}
                        className="w-full h-full border border-white rounded-3xl flex items-center justify-center"
                    >
                        <div className="w-3/4 h-3/4 bg-brand-primary/5 rounded-full blur-[100px]" />
                    </motion.div>

                    <div className="absolute font-display font-black text-[12vw] text-white/5 uppercase select-none">
                        {HERO_CONTENT.backgroundWord}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
