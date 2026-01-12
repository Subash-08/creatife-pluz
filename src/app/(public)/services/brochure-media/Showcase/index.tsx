'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { portfolioItems } from './content';
import { motionVariants } from './animation';

const ShowcaseSection: React.FC = () => {
    return (
        <section className="py-32 bg-black">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center mb-20">
                <h2 className="text-5xl md:text-8xl font-display font-black text-white uppercase select-none italic">Execution</h2>
            </div>
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                {portfolioItems.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={motionVariants.initial}
                        whileInView={motionVariants.whileInView}
                        transition={motionVariants.transition}
                        viewport={{ once: true, amount: 0.3 }}
                        className="group cursor-pointer relative overflow-hidden rounded-3xl aspect-[4/3]"
                    >
                        <img
                            src={item.img}
                            alt={item.title}
                            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 "
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                        <div className="absolute bottom-10 left-10">
                            <h4 className="text-3xl font-display font-bold text-white uppercase mb-2">{item.title}</h4>
                            <p className="text-brand-primary font-bold uppercase text-[10px] tracking-widest">{item.category}</p>
                        </div>
                        <div className="absolute top-10 right-10 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowUpRight className="text-white" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ShowcaseSection;
