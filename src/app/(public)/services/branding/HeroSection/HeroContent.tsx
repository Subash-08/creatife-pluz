import Link from 'next/link';
import * as motion from 'framer-motion/client';

const HeroContent = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative z-10"
        >
            <span className="text-brand-primary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">
                Section 01: The Foundation
            </span>
            <h1 className="text-6xl md:text-8xl font-display font-black text-white leading-none mb-8 uppercase italic">
                Logo & <br /> <span className="text-brand-primary">Branding.</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-lg mb-10 border-l-4 border-brand-primary pl-6">
                Your brand identity is more than just a logo — it's the face of your business. We build brands that leave a legacy through unique, scalable designs.
            </p>
            <Link
                href="/contact"
                className="inline-block px-12 py-6 text-lg rounded-none bg-white text-black hover:bg-brand-primary font-bold uppercase tracking-wider transition-colors"
            >
                Start Your Legacy
            </Link>
        </motion.div>
    );
};

export default HeroContent;
