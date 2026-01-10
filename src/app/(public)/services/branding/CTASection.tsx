import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';

const CTASection = () => {
    return (
        <section className="py-32 bg-brand-dark relative overflow-hidden">
            <div className="absolute inset-0 bg-noise opacity-10"></div>
            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <Star className="w-16 h-16 text-brand-primary mx-auto mb-8" />
                <h2 className="text-5xl md:text-6xl font-display font-black text-white mb-8">
                    Ready to Build Your <span className="text-brand-primary">Brand Legacy?</span>
                </h2>
                <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
                    Let's create a brand identity that stands the test of time and leaves a lasting impact.
                </p>
                <Link
                    href="/contact"
                    className="inline-flex items-center px-12 py-6 text-lg rounded-none bg-white text-black hover:bg-brand-primary font-bold uppercase tracking-wider transition-colors"
                >
                    Start Your Project
                    <ArrowRight className="ml-4 w-6 h-6" />
                </Link>
            </div>
        </section>
    )
}

export default CTASection;
