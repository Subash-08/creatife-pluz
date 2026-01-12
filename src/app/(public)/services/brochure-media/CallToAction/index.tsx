import React from 'react';
import Button from '@/components/Button';
import { Zap } from 'lucide-react';

const CallToAction: React.FC = () => {
    return (
        <section className="py-10 bg-brand-primary text-black text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-noise opacity-30"></div>
            <div className="relative z-10 max-w-4xl mx-auto px-6">
                <span className="text-xs font-bold uppercase tracking-[0.4em] mb-8 block">Ready to start?</span>
                <h2 className="text-[10vw] font-display font-black uppercase leading-[0.8] mb-12 italic">
                    Designs That <br /> Sell.
                </h2>
                <Button
                    href="/contact"
                    className="bg-black text-white px-16 py-8 text-xl rounded-none hover:scale-105 transition-transform font-bold uppercase tracking-widest"
                >
                    Request a Quote <Zap className="ml-2 w-6 h-6 fill-brand-primary text-brand-primary" />
                </Button>
            </div>
        </section>
    );
};

export default CallToAction;
