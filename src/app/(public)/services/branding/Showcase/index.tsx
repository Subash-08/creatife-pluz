'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Box, Star } from 'lucide-react';
import { SHOWCASE_CONTENT } from './content';
import { useShowcaseAnimation } from './animation';

const ICONS = {
    Box: Box,
    Star: Star,
};

const Showcase: React.FC = () => {
    const { horizontalRef, x, skewX } = useShowcaseAnimation();

    return (
        <section ref={horizontalRef} className="relative h-[300vh] bg-black">
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
                <div className="absolute top-12 left-12 z-50">
                    <h2 className="text-5xl md:text-8xl font-display font-black text-white/10 uppercase leading-none">
                        {SHOWCASE_CONTENT.heading}
                    </h2>
                </div>

                <motion.div
                    style={{ x, skewX }}
                    className="flex gap-20 pl-[10vw] pr-[20vw] items-center h-full pt-20"
                >
                    {SHOWCASE_CONTENT.slides.map((slide, i) => {
                        const Icon = ICONS[slide.iconName as keyof typeof ICONS];
                        return (
                            <div
                                key={i}
                                className={`relative flex-shrink-0 w-[85vw] md:w-[60vw] h-[65vh] rounded-[3rem] overflow-hidden group ${slide.border}`}
                                style={{ backgroundColor: slide.bgColor }}
                            >
                                <div className="flex h-full w-full">
                                    <div className={`w-1/2 p-12 flex flex-col justify-between ${slide.textColor}`}>
                                        <div>
                                            <Icon className={`w-12 h-12 mb-8 ${slide.textColor}`} />
                                            <h3 className={`text-4xl md:text-6xl font-display font-bold uppercase leading-none mb-6 ${slide.textColor}`}>
                                                {slide.title.split(' ').map((word, idx) => (
                                                    <React.Fragment key={idx}>
                                                        {word} <br />
                                                    </React.Fragment>
                                                ))}
                                            </h3>
                                            <p className={slide.textColor.replace('text-', 'text-').replace('text-black', 'text-black/60')}>
                                                {slide.description}
                                            </p>
                                        </div>
                                        {slide.features && slide.features.length > 0 && (
                                            <ul className="space-y-2">
                                                {slide.features.map((feature) => (
                                                    <li
                                                        key={feature}
                                                        className="text-xs font-bold uppercase tracking-widest text-brand-primary border-b border-white/10 pb-2"
                                                    >
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {slide.ctaTag && (
                                            <div className="bg-black text-white px-8 py-4 font-bold uppercase text-xs tracking-widest w-max mt-6">
                                                {slide.ctaTag}
                                            </div>
                                        )}
                                    </div>

                                    <div className="w-1/2 relative overflow-hidden">
                                        <img
                                            src={slide.imgSrc}
                                            alt={slide.title}
                                            className="absolute inset-0 w-full h-full object-cover  group-hover:scale-110 transition-all duration-700"
                                        />
                                        <div className={`absolute inset-0 flex items-center justify-center transition-opacity group-hover:opacity-0 bg-black/40`}>
                                            <div
                                                className={`${slide.ctaBg} ${slide.ctaText} px-6 py-2 font-black text-xs uppercase cursor-pointer select-none`}
                                            >
                                                {slide.ctaLabel}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Showcase;
