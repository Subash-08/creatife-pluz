'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import content from './content';

const Showcase: React.FC = () => {
    return (
        <section className="py-32 bg-brand-dark overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                <div className="relative group cursor-pointer overflow-hidden rounded-[3rem] h-[70vh]">
                    <img
                        src={content.image}
                        alt={content.alt}
                        className="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
                        <div className="max-w-md">
                            <span className="text-brand-primary font-bold uppercase text-xs tracking-widest">
                                {content.project}
                            </span>
                            <h3 className="text-4xl md:text-6xl font-display font-bold text-white uppercase mt-4">
                                {content.title}
                            </h3>
                        </div>
                        <div className="bg-brand-primary text-black px-10 py-4 font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                            Explore Cases <ArrowRight size={18} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Showcase;
