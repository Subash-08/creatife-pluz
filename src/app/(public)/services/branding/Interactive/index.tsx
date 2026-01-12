'use client';

import React from 'react';
import { MousePointer2 } from 'lucide-react';
import InteractiveBox from './InteractiveBox';
import Button from '@/components/Button';
import { motion } from 'framer-motion';
import { INTERACTIVE_CONTENT } from './content';

const Interactive: React.FC = () => {
    const {
        sectionLabel,
        titleLine1,
        titleHighlight,
        infoTitle,
        infoDescription,
        features,
        cta,
    } = INTERACTIVE_CONTENT;

    return (
        <section className="py-12 bg-brand-dark overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                <div className="text-center mb-24">
                    <span className="text-brand-primary font-bold uppercase tracking-[0.4em] text-xs mb-4 block">
                        {sectionLabel}
                    </span>
                    <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase italic">
                        {titleLine1} <br />{' '}
                        <span className="text-brand-primary">{titleHighlight}</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <InteractiveBox title="Aura Essence" />

                    <div className="space-y-12">
                        <div className="p-10 bg-white/5 border border-white/10 rounded-[2rem]">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center text-black">
                                    <MousePointer2 size={24} />
                                </div>
                                <h4 className="text-2xl font-display font-bold text-white uppercase">{infoTitle}</h4>
                            </div>

                            <p className="text-slate-400 text-lg leading-relaxed mb-8">{infoDescription}</p>

                            <ul className="space-y-4">
                                {features.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-slate-300"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Button href="/contact" className="w-full py-6 bg-brand-primary text-black rounded-none">
                            {cta}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Interactive;
