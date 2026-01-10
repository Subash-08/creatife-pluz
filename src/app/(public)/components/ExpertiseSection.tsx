'use client'

import Link from 'next/link'
import { ArrowRight, Zap, Layers, Share2, Box } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ExpertiseSection() {
    return (
        <section className="py-20 md:py-32 bg-brand-dark relative border-b border-white/10">
            <div className="max-w-[1920px] mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

                    <div className="lg:w-5/12">
                        <div className="lg:sticky lg:top-32 self-start">
                            <h4 className="text-brand-primary font-bold uppercase tracking-widest text-sm mb-4">Our Expertise</h4>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
                                Premium <br />
                                Creative <br />
                                <span className="text-brand-primary">Partnership</span>
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed max-w-xl mb-8">
                                Specialized creative solutions from identity design to large-scale physical displays and trend-driven social media assets.
                            </p>
                            <Link href="/services" className="inline-flex items-center gap-2 text-white font-bold border-b border-brand-primary pb-1 hover:text-brand-primary transition-colors">
                                Explore Capabilities <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    <div className="lg:w-7/12 flex flex-col gap-8">

                        {/* Logo & Branding */}
                        <Link href="/services/branding">
                            <motion.div whileHover={{ y: -5 }} className="bg-[#0B0B0B] border border-white/10 p-10 rounded-2xl relative overflow-hidden group cursor-pointer">
                                <div className="w-16 h-16 rounded-full border border-brand-primary/30 flex items-center justify-center mb-6 bg-brand-primary/5">
                                    <Zap className="text-brand-primary w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3 uppercase">Logo & Branding</h3>
                                <p className="text-slate-400 leading-relaxed">Identity strategy and scalable design systems.</p>
                            </motion.div>
                        </Link>

                        {/* Product Package Designing */}
                        <Link href="/services/package-design">
                            <motion.div whileHover={{ y: -5 }} className="bg-[#0B0B0B] border border-white/10 p-10 rounded-2xl relative overflow-hidden group cursor-pointer">
                                <div className="w-16 h-16 rounded-full border border-brand-primary/30 flex items-center justify-center mb-6 bg-brand-primary/5">
                                    <Box className="text-brand-primary w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3 uppercase">Product Package Designing</h3>
                                <p className="text-slate-400 leading-relaxed">Structural design and tactile branding for retail excellence.</p>
                            </motion.div>
                        </Link>

                        {/* Social Media Post Design */}
                        <Link href="/services/social-media">
                            <motion.div whileHover={{ y: -5 }} className="bg-[#0B0B0B] border border-white/10 p-10 rounded-2xl relative overflow-hidden group cursor-pointer">
                                <div className="w-16 h-16 rounded-full border border-brand-primary/30 flex items-center justify-center mb-6 bg-brand-primary/5">
                                    <Share2 className="text-brand-primary w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3 uppercase">Social Media Post Design</h3>
                                <p className="text-slate-400 leading-relaxed">Scroll-stopping visuals for Instagram, WhatsApp, and Ads.</p>
                            </motion.div>
                        </Link>

                        {/* Flex Banner Designs */}
                        <Link href="/services/flex-banner">
                            <motion.div whileHover={{ y: -5 }} className="bg-[#0B0B0B] border border-white/10 p-10 rounded-2xl relative overflow-hidden group cursor-pointer">
                                <div className="w-16 h-16 rounded-full border border-brand-primary/30 flex items-center justify-center mb-6 bg-brand-primary/5">
                                    <Layers className="text-brand-primary w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3 uppercase">Flex Banner Designs</h3>
                                <p className="text-slate-400 leading-relaxed">Large-scale outdoor hoardings and event visibility.</p>
                            </motion.div>
                        </Link>

                    </div>

                </div>
            </div>
        </section>
    )
}
