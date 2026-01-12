'use client';
import React from 'react';
import SEO from '@/components/SEO';
import Button from '@/components/Button';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Camera, Focus, ImageIcon, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

const Photography: React.FC = () => {
    const containerRef = React.useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    return (
        <div ref={containerRef}>
            <SEO
                title="Product Photography - Creative Pluz"
                description="Professional product photography for e-commerce, lifestyle, and white-background catalog shots. Build trust with high-quality visuals."
            />

            {/* 1. HERO SECTION: Flash Effect */}
            <section className="relative h-screen bg-black flex items-center justify-center overflow-hidden">
                <motion.div style={{ scale }} className="absolute inset-0 opacity-40">
                    <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Camera Lens" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>
                <div className="relative z-10 text-center px-6">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-primary mb-8">
                        <Camera className="text-black w-10 h-10" />
                    </motion.div>
                    <h1 className="text-6xl md:text-9xl font-display font-black text-white uppercase leading-[0.9] tracking-tighter">
                        Capture <br /> <span className="text-brand-primary">Trust.</span>
                    </h1>
                    <p className="mt-8 text-slate-400 font-bold uppercase tracking-widest text-sm">Professional Product Visuals</p>
                </div>
            </section>

            {/* 2. SERVICES GRID: E-Commerce & Commercial */}
            <section className="py-32 bg-brand-dark">
                <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                    <h2 className="text-brand-primary text-xs font-bold uppercase tracking-widest mb-16">Section 02: Visual Specialization</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "E-Commerce", desc: "Clean, high-detail shots optimized for Amazon and web stores.", icon: <ImageIcon /> },
                            { title: "Lifestyle", desc: "Creative shots placing your product in real-world scenarios.", icon: <Focus /> },
                            { title: "White Background", desc: "Classic studio shots for catalogs and clean digital use.", icon: <Zap /> },
                            { title: "Retouching", desc: "Professional image enhancement and color correction.", icon: <Camera /> }
                        ].map((item, i) => (
                            <motion.div key={i} whileHover={{ y: -10 }} className="p-10 bg-[#0A0A0A] border border-white/5 rounded-2xl group transition-all hover:border-brand-primary/20">
                                <div className="text-brand-primary mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                                <h4 className="text-xl font-bold text-white mb-4 uppercase">{item.title}</h4>
                                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. SHOWCASE: High Definition Impact */}
            <section className="py-0 h-screen relative overflow-hidden bg-black">
                <div className="absolute inset-0 flex">
                    <div className="w-1/2 h-full relative overflow-hidden group">
                        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover  transition-all duration-1000" alt="Product 1" />
                    </div>
                    <div className="w-1/2 h-full relative overflow-hidden group">
                        <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover  transition-all duration-1000" alt="Product 2" />
                    </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <h2 className="text-white text-[15vw] font-display font-black uppercase opacity-10 italic">Sharpness.</h2>
                </div>
            </section>

            {/* 4. TRUST & TECHNICAL: Why Quality Matters */}
            <section className="py-32 bg-brand-dark">
                <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 uppercase leading-tight">Visuals That <br /> Build Credibility.</h2>
                        <p className="text-xl text-slate-400 mb-10">High-quality product images increase credibility and sales. We offer professional photography for digital and print use that puts your brand above the competition.</p>
                        <div className="space-y-4">
                            {[' White Background Cataloging', 'Creative Concept Shoots', 'Lifestyle Storytelling', 'High-End Image Retouching'].map(i => (
                                <div key={i} className="flex items-center gap-3">
                                    <CheckCircle2 className="text-brand-primary w-5 h-5" />
                                    <span className="text-white font-bold uppercase text-xs tracking-widest">{i}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="p-12 bg-white text-black rounded-3xl flex flex-col justify-between h-[400px]">
                        <h3 className="text-4xl font-display font-bold uppercase leading-none">Studio Grade <br /> Quality.</h3>
                        <div className="flex justify-between items-end">
                            <div className="text-xs font-bold uppercase tracking-[0.2em] border-l-2 border-black pl-4">8K Resolution Ready</div>
                            <Button href="/contact" className="bg-black text-white px-8 py-4 text-xs">Book a Session</Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. CALL TO ACTION */}
            <section className="py-10 bg-brand-primary text-black text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-noise opacity-30"></div>
                <div className="relative z-10 max-w-4xl mx-auto px-6">
                    <h2 className="text-[10vw] font-display font-black uppercase leading-[0.8] mb-12">
                        Capture <br /> The Shot
                    </h2>
                    <Button href="/contact" className="bg-black text-white px-16 py-8 text-xl rounded-none hover:scale-105 transition-transform font-bold uppercase tracking-widest">
                        Request a Quote <ArrowRight className="ml-2" />
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default Photography;