'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Type, FileStack } from 'lucide-react';
import { SERVICES_CONTENT } from './content';
import { cardHoverAnimation } from './animation';

const Services: React.FC = () => {
    return (
        <section className="py-32 bg-[#050505]">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                <h2 className="text-brand-primary text-xs font-bold uppercase tracking-widest mb-16">
                    {SERVICES_CONTENT.sectionLabel}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {SERVICES_CONTENT.items.map((item, i) => {
                        const icons = [
                            <Palette key="palette" />,
                            <Type key="type" />,
                            <FileStack key="file" />,
                        ];

                        return (
                            <motion.div
                                key={i}
                                {...cardHoverAnimation}
                                className="p-12 bg-brand-dark border border-white/5 rounded-3xl group"
                            >
                                <div className="text-brand-primary mb-8 group-hover:scale-110 transition-transform">
                                    {icons[i]}
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4 uppercase">
                                    {item.title}
                                </h3>

                                <p className="text-slate-400 leading-relaxed">
                                    {item.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;
