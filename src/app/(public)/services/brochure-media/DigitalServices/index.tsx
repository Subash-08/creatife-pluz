'use client';

import React from 'react';
import Button from '@/components/Button';
import { digitalServiceIntro } from './content';

const DigitalServicesSection: React.FC = () => {
    return (
        <section className="py-10 bg-black text-white">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Images Section */}
                    <div className="relative order-2 lg:order-1">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Left Column */}
                            <div className="space-y-4 pt-12">
                                <img
                                    src={digitalServiceIntro.images[0].src}
                                    alt={digitalServiceIntro.images[0].alt}
                                    className="rounded-2xl  transition-all shadow-xl"
                                />
                                <div className={`${digitalServiceIntro.images[0].labelBg} p-6 rounded-2xl`}>
                                    <h5 className={`font-display font-black leading-none ${digitalServiceIntro.images[0].labelTextClass}`}>
                                        {digitalServiceIntro.images[0].label}
                                    </h5>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                                <div className="bg-black text-white p-6 rounded-2xl aspect-square flex flex-col justify-between">
                                    {digitalServiceIntro.images[1].icon}
                                    <span className="text-xs font-bold uppercase tracking-widest">{digitalServiceIntro.images[1].iconLabel}</span>
                                </div>
                                <img
                                    src={digitalServiceIntro.images[1].src}
                                    alt={digitalServiceIntro.images[1].alt}
                                    className="rounded-2xl  transition-all shadow-xl"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="order-1 lg:order-2">
                        <h2 className="text-brand-primary text-xs font-bold uppercase tracking-[0.3em] mb-4">{digitalServiceIntro.sectionLabel}</h2>
                        <h3 className="text-5xl md:text-7xl font-display font-bold uppercase leading-tight mb-8 whitespace-pre-line">
                            {digitalServiceIntro.heading}
                        </h3>
                        <p className="text-xl text-slate-600 mb-10 leading-relaxed">{digitalServiceIntro.description}</p>
                        <div className="space-y-4 mb-12">
                            {digitalServiceIntro.features.map((feat) => (
                                <div key={feat} className="flex items-center gap-3 border-l-2 border-brand-primary pl-4 py-1">
                                    <span className="text-sm font-bold uppercase tracking-widest">{feat}</span>
                                </div>
                            ))}
                        </div>
                        <Button
                            href="/contact"
                            className="border-black text-black hover:bg-black hover:text-white px-10 py-5 text-sm"
                        >
                            Request Ad Creative
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DigitalServicesSection;
