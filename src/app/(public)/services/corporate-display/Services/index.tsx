'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Maximize, Monitor, CheckCircle2 } from 'lucide-react';
import content from './content';
import { fadeUp } from './animation';

const Services: React.FC = () => {
    return (
        <section className="py-32 bg-[#080808] border-y border-white/5">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Outdoor Block */}
                    <motion.div
                        whileHover={{ y: -10 }}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="p-12 bg-brand-dark border border-white/5 rounded-3xl"
                    >
                        <Maximize className="w-12 h-12 text-brand-primary mb-8" />
                        <h3 className="text-3xl font-display font-bold text-white uppercase mb-6">
                            {content.outdoor.title}
                        </h3>
                        <p className="text-slate-500 mb-8 leading-relaxed">{content.outdoor.description}</p>
                        <ul className="space-y-3">
                            {content.outdoor.items.map((item) => (
                                <li
                                    key={item}
                                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-primary"
                                >
                                    <CheckCircle2 size={14} /> {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Corporate Block */}
                    <motion.div
                        whileHover={{ y: -10 }}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="p-12 bg-white text-black rounded-3xl"
                    >
                        <Monitor className="w-12 h-12 text-black mb-8" />
                        <h3 className="text-3xl font-display font-bold uppercase mb-6">
                            {content.corporate.title}
                        </h3>
                        <p className="text-black/60 mb-8 leading-relaxed">{content.corporate.description}</p>
                        <ul className="space-y-3">
                            {content.corporate.items.map((item) => (
                                <li
                                    key={item}
                                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black/40"
                                >
                                    <CheckCircle2 size={14} className="text-black" /> {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Services;
