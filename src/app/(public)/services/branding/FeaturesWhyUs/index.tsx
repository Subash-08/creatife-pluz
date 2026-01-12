import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { FEATURES_CONTENT } from './content';

const FeaturesWhyUs: React.FC = () => {
    return (
        <section className="py-32 bg-brand-dark border-t border-white/5">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20">

                <div>
                    <h2 className="text-5xl font-display font-bold text-white mb-12 uppercase italic">
                        Why Choose <br /> Creative Pluz?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {FEATURES_CONTENT.featuresList.map((feat, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <CheckCircle2 className="text-brand-primary w-5 h-5 flex-shrink-0" />
                                <span className="text-slate-300 font-bold uppercase text-xs tracking-widest">{feat}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-12 bg-white/5 rounded-3xl border border-white/10 flex flex-col justify-center">
                    <h4 className="text-2xl font-bold text-brand-primary mb-4 uppercase">
                        {FEATURES_CONTENT.resultsTitle}
                    </h4>
                    <p className="text-slate-400 leading-relaxed mb-8">
                        {FEATURES_CONTENT.resultsDesc}
                    </p>
                    <div className="w-20 h-1 bg-brand-primary" />
                </div>
            </div>
        </section>
    );
};

export default FeaturesWhyUs;
