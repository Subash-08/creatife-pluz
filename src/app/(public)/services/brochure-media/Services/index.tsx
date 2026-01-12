'use client';

import React from 'react';
import { serviceIntro, services } from './content';
import { AnimatedServiceCard } from './animation';

const ServicesSection: React.FC = () => {
    return (
        <section className="py-32 bg-black">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="max-w-2xl">
                        <h2 className="text-brand-primary text-xs font-bold uppercase tracking-[0.3em] mb-4">{serviceIntro.sectionLabel}</h2>
                        <h3 className="text-4xl md:text-6xl font-display font-bold text-white uppercase leading-none whitespace-pre-line">{serviceIntro.heading}</h3>
                        <p className="text-slate-400 mt-6 text-lg">{serviceIntro.description}</p>
                    </div>
                    <div className="flex gap-2">
                        {serviceIntro.icons.map((icon, i) => (
                            <div key={i} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-brand-primary">
                                {icon}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((item, i) => (
                        <AnimatedServiceCard key={i} index={i}>
                            <div className="text-brand-primary mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                            <h4 className="text-white font-bold text-lg mb-4 uppercase tracking-tight">{item.title}</h4>
                            <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                            <div className="absolute bottom-0 left-0 w-0 h-1 bg-brand-primary group-hover:w-full transition-all duration-500"></div>
                        </AnimatedServiceCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
