'use client';

import React from 'react';
import Button from '@/components/Button';
import content from './content';

const CallToAction: React.FC = () => {
    return (
        <section className="py-10 bg-brand-primary text-black text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-noise opacity-30"></div>
            <div className="relative z-10 max-w-4xl mx-auto px-6">
                <h2 className="text-[10vw] font-display font-black uppercase leading-[0.8] mb-12">
                    {content.heading.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                </h2>
                <Button
                    to={content.buttonLink}
                    className="bg-black text-white px-16 py-8 text-xl rounded-none hover:scale-105 transition-transform font-bold uppercase tracking-widest"
                >
                    {content.buttonText}
                </Button>
            </div>
        </section>
    );
};

export default CallToAction;
