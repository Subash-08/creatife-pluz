'use client';

import React from 'react';
import { Map, Layout, Construction, Maximize } from 'lucide-react';
import content from './content';

const iconMap: Record<string, JSX.Element> = {
    Map: <Map />,
    Layout: <Layout />,
    Construction: <Construction />,
    Maximize: <Maximize />,
};

const Execution: React.FC = () => {
    return (
        <section className="py-32 bg-black">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {content.steps.map((item, i) => (
                        <div key={i} className="p-8 border border-white/5 bg-white/[0.02] flex flex-col gap-4">
                            <div className="text-brand-primary">{iconMap[item.icon]}</div>
                            <h5 className="text-white font-bold uppercase text-sm">{item.title}</h5>
                            <p className="text-slate-500 text-xs">Professional handling from concept to setup.</p>
                        </div>
                    ))}
                </div>
                <div className="order-1 lg:order-2">
                    <h2 className="text-5xl font-display font-bold text-white mb-8 uppercase leading-tight">
                        {content.heading.split('\\n').map((line, idx) => (
                            <React.Fragment key={idx}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))}
                    </h2>
                    <p className="text-xl text-slate-400 mb-8 leading-relaxed">{content.description}</p>
                    <div className="w-20 h-2 bg-brand-primary" />
                </div>
            </div>
        </section>
    );
};

export default Execution;
