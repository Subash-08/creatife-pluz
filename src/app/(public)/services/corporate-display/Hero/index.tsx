'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/Button';
import content from './content';
import { fadeInUp } from './animation';

const Hero: React.FC = () => {
    return (
        <section className="relative min-h-screen bg-brand-dark pt-32 pb-20 flex flex-col justify-center overflow-hidden">
            <div className="absolute inset-0 bg-noise opacity-10"></div>
            <div className="max-w-[1920px] mx-auto px-6 lg:px-12 relative z-10 w-full">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="inline-block px-4 py-1 border border-brand-primary text-brand-primary text-[10px] font-bold uppercase tracking-widest mb-12"
                >
                    {content.subtitle}
                </motion.div>
                <h1 className="text-6xl md:text-[12vw] font-display font-black text-white leading-[0.8] uppercase tracking-tighter mb-16">
                    {content.title.pre} <br />{' '}
                    <span className="text-brand-primary">{content.title.highlight}</span>
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end">
                    <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-xl italic">
                        {content.description}
                    </p>
                    <div className="flex lg:justify-end">
                        <Button href="/contact" className="px-16 py-8 text-xl rounded-none bg-white text-black hover:bg-brand-primary">
                            {content.buttonText}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
