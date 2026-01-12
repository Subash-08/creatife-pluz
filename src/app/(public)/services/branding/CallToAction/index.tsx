import React from 'react';
import Button from '@/components/Button';
import { ArrowRight } from 'lucide-react';

const CallToAction: React.FC = () => {
    return (
        <section className="py-10 bg-brand-primary text-black text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-noise opacity-30"></div>
            <div className="relative z-10 max-w-4xl mx-auto px-6">
                <h2 className="text-[10vw] font-display font-black uppercase leading-[0.8] mb-8">
                    Start Your <br /> Legacy
                </h2>
                <Button
                    href="/contact"
                    className="bg-black text-white px-16 py-8 text-xl rounded-none hover:bg-white hover:text-black transition-all font-bold uppercase tracking-widest"
                >
                    Request a Quote <ArrowRight className="ml-2" />
                </Button>
            </div>
        </section>
    );
};

export default CallToAction;
