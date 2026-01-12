'use client';
import React from 'react';
import SEO from '@/components/SEO';
import Button from '@/components/Button';
import { motion } from 'framer-motion';
import { Maximize, Construction, Map, Eye, ArrowRight, CheckCircle2 } from 'lucide-react';

const FlexBanner: React.FC = () => {
    return (
        <>
            <SEO
                title="Flex Banner Designs - Creative Pluz"
                description="High-impact flex banners, outdoor hoardings, and event backdrop designs. Dominate the physical space with grand-scale visibility."
            />

            {/* Hero */}
            <section className="relative min-h-[90vh] bg-brand-dark flex items-center justify-center overflow-hidden pt-20">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1518186239717-2e909844db30?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/40 to-brand-dark"></div>
                <div className="relative z-10 text-center px-6">
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-brand-primary font-bold tracking-[0.4em] uppercase text-xs mb-8 block">Outdoor Visibility Solutions</motion.span>
                    <motion.h1 initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-6xl md:text-[10vw] font-display font-black uppercase text-white leading-[0.85] tracking-tighter">
                        Flex <br /> <span className="text-brand-primary">Designs.</span>
                    </motion.h1>
                </div>
            </section>

            {/* Service Details */}
            <section className="py-32 bg-brand-dark">
                <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase mb-8">Go Big Or <br /> <span className="text-brand-primary">Go Home.</span></h2>
                        <p className="text-xl text-slate-400 mb-12 leading-relaxed">
                            Outdoor advertising requires a different set of rules. We design with distance, speed, and visibility in mind, ensuring your message is read in seconds.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { title: "Hoarding Banners", icon: <Map /> },
                                { title: "Event Backdrops", icon: <Construction /> },
                                { title: "Shop Signage", icon: <Maximize /> },
                                { title: "Roll-up Standees", icon: <Eye /> }
                            ].map((item, i) => (
                                <div key={i} className="p-8 border border-white/5 bg-[#0A0A0A] hover:border-brand-primary/30 transition-all group">
                                    <div className="text-brand-primary mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                                    <h4 className="text-lg font-bold text-white uppercase">{item.title}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-8">
                        <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 group">
                            <img src="https://images.unsplash.com/photo-1541535650810-10d26f5c2ab3?q=80&w=2076&auto=format&fit=crop" className="w-full h-full object-cover  transition-all duration-700" alt="Large scale flex" />
                        </div>
                        <div className="p-10 bg-brand-primary text-black flex flex-col justify-between rounded-3xl h-64">
                            <h3 className="text-3xl font-display font-bold uppercase leading-tight">Professional Fabrication Guidance.</h3>
                            <div className="flex items-center gap-2 font-bold uppercase text-xs tracking-widest border-t border-black/10 pt-4">
                                <CheckCircle2 size={16} /> Print-Ready Files Included
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-10 bg-brand-primary text-black text-center">
                <h2 className="text-5xl md:text-8xl font-display font-black uppercase italic mb-8">Make An Impact.</h2>
                <Button href="/contact" className="bg-black text-white px-12 py-6 rounded-none text-lg font-bold uppercase tracking-widest">Start Large Scale Project <ArrowRight className="ml-2" /></Button>
            </section>
        </>
    );
};

export default FlexBanner;