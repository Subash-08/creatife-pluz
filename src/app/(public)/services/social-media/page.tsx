'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import SEO from '@/components/SEO';
import Button from '@/components/Button';
import Magnetic from '@/components/Magnetic';
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';
import { Share2, Zap, Heart, MessageCircle, BarChart3, Target, ArrowRight, Instagram, Smartphone, Sparkles, MousePointer2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SocialMedia: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const phoneSectionRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. STICKY PHONE ANIMATION
            const steps = gsap.utils.toArray('.strategy-step');
            const screens = gsap.utils.toArray('.phone-screen-content');

            const phoneTl = gsap.timeline({
                scrollTrigger: {
                    trigger: phoneSectionRef.current,
                    start: "top top",
                    end: "+=300%",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                }
            });

            // Animate screens based on steps
            steps.forEach((step: any, i) => {
                if (i !== 0) {
                    // Fade in current screen and fade out previous
                    phoneTl.to(screens[i - 1] as HTMLElement, { opacity: 0, scale: 0.9, filter: 'blur(10px)', duration: 0.5 }, i);
                    phoneTl.fromTo(screens[i] as HTMLElement,
                        { opacity: 0, scale: 1.1, filter: 'blur(10px)' },
                        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.5 },
                        i
                    );
                }

                // Animate text steps
                phoneTl.fromTo(step,
                    { opacity: 0.2, x: 50 },
                    { opacity: 1, x: 0, duration: 0.5 },
                    i
                );

                if (i < steps.length - 1) {
                    phoneTl.to(step, { opacity: 0.2, x: -50, duration: 0.5 }, i + 0.8);
                }
            });

            // 2. KINETIC GALLERY SKEW
            const galleryItems = gsap.utils.toArray('.post-item');
            galleryItems.forEach((item: any) => {
                gsap.to(item, {
                    skewY: (i) => i % 2 === 0 ? 5 : -5,
                    scrollTrigger: {
                        trigger: item,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Helper for background columns
    const ScrollingColumn = ({ reverse = false, speed = 40, startIndex = 0 }) => {
        const images = [...Array(10)].map((_, i) => `https://picsum.photos/400/400?random=${startIndex + i}`);
        return (
            <div className="flex flex-col gap-4 h-full overflow-hidden">
                <motion.div
                    className="flex flex-col gap-4"
                    animate={{ y: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
                >
                    {/* Double images for seamless loop */}
                    {[...images, ...images].map((img, i) => (
                        <div key={i} className="aspect-square w-full bg-slate-800 rounded-xl overflow-hidden grayscale border border-white/5">
                            <img src={img} className="w-full h-full object-cover opacity-60" loading="lazy" alt="Social Artifact" />
                        </div>
                    ))}
                </motion.div>
            </div>
        );
    };

    return (
        <>
            <SEO
                title="Social Media Design - Creative Pluz"
                description="Dominate the feed with scroll-stopping social media design. High-performance creative for Instagram, WhatsApp, and Facebook."
            />

            <div ref={containerRef} className="bg-brand-dark text-white selection:bg-brand-primary selection:text-black">

                {/* --- 1. THE HERO SECTION (UPDATED WITH MOVING COLUMNS) --- */}
                <section className="relative min-h-screen bg-brand-dark flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0 flex items-center justify-center">
                        {/* Ambient Background Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary/10 rounded-full blur-[150px] animate-pulse"></div>

                        {/* Kinetic Scrolling Background Grid */}
                        <div className="flex gap-4 opacity-[0.08] rotate-12 scale-[1.6] md:scale-150 pointer-events-none w-[120vw] h-[120vh]">
                            <ScrollingColumn reverse={false} speed={50} startIndex={0} />
                            <ScrollingColumn reverse={true} speed={60} startIndex={10} />
                            <ScrollingColumn reverse={false} speed={45} startIndex={20} />
                            <ScrollingColumn reverse={true} speed={55} startIndex={30} />
                            <ScrollingColumn reverse={false} speed={65} startIndex={40} />
                            <ScrollingColumn reverse={true} speed={50} startIndex={50} />
                        </div>
                    </div>

                    <div className="relative z-10 text-center px-6">
                        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex justify-center gap-6 mb-8">
                            <Share2 className="text-brand-primary w-8 h-8" />
                            <Heart className="text-brand-primary w-8 h-8" />
                            <MessageCircle className="text-brand-primary w-8 h-8" />
                        </motion.div>
                        <motion.h1
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-6xl md:text-9xl font-display font-black uppercase text-white leading-none tracking-tighter italic"
                        >
                            Stop The <br /> <span className="text-brand-primary">Scroll.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-10 text-xl text-slate-400 max-w-2xl mx-auto font-medium"
                        >
                            We design high-impact social media assets that drive engagement, build community, and convert followers into loyal customers.
                        </motion.p>
                        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="mt-12">
                            <Button href="/contact" className="px-12 py-6 bg-brand-primary text-black font-black uppercase tracking-widest text-sm rounded-none">Get Started</Button>
                        </motion.div>
                    </div>
                </section>

                {/* --- 2. THE STICKY PHONE ENGINE (GSAP) --- */}
                <section ref={phoneSectionRef} className="relative h-screen bg-[#050505] overflow-hidden flex items-center">
                    <div className="max-w-[1440px] mx-auto px-6 lg:px-24 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center h-full">

                        {/* Left Column: Sticky Phone */}
                        <div className="relative h-1/2 md:h-full flex items-center justify-center">
                            <div className="relative w-full max-w-[240px] md:max-w-[320px] aspect-[9/19] bg-slate-900 rounded-[2.5rem] md:rounded-[3rem] border-4 md:border-8 border-slate-800 shadow-[0_0_100px_rgba(0,0,0,1)] overflow-hidden">
                                {/* Phone Bezel Details */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-4 md:h-6 bg-slate-800 rounded-b-xl md:rounded-b-2xl z-50"></div>

                                {/* Phone Screen Contents */}
                                <div className="relative w-full h-full">
                                    {/* Screen 1: Reel */}
                                    <div className="phone-screen-content absolute inset-0 bg-black z-10">
                                        <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-contain" alt="Reel Post" />
                                        <div className="absolute bottom-6 md:bottom-10 left-4 md:left-6 text-white">
                                            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-brand-primary"></div>
                                                <div className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">Brand_Next</div>
                                            </div>
                                            <p className="text-[10px] md:text-[12px] font-medium leading-tight">High-velocity motion triggers dopamine release.</p>
                                        </div>
                                    </div>

                                    {/* Screen 2: Carousel */}
                                    <div className="phone-screen-content absolute inset-0 bg-[#111] opacity-0 z-20">
                                        <div className="p-3 md:p-4 grid grid-cols-1 gap-3 md:gap-4">
                                            <div className="h-48 md:h-64 bg-slate-800 rounded-lg md:rounded-xl overflow-hidden border border-brand-primary/20">
                                                <img src="https://images.unsplash.com/photo-1611162616475-46b635cbca44?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Carousel" />
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="flex-1 h-24 md:h-32 bg-slate-800 rounded-lg md:rounded-xl overflow-hidden">
                                                    <img src="https://images.unsplash.com/photo-1611162618071-b39a2dd0d789?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Carousel 2" />
                                                </div>
                                                <div className="flex-1 h-24 md:h-32 bg-slate-800 rounded-lg md:rounded-xl overflow-hidden">
                                                    <img src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Carousel 3" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Screen 3: Ad Story */}
                                    <div className="phone-screen-content absolute inset-0 bg-brand-primary opacity-0 z-30 flex items-center justify-center p-6 md:p-8">
                                        <div className="text-center">
                                            <Zap size={40} className="text-black mb-4 md:mb-6 mx-auto" />
                                            <h4 className="text-2xl md:text-3xl font-display font-black text-black uppercase italic leading-none mb-4 md:mb-6">Flash <br /> Conversion.</h4>
                                            <div className="w-full h-10 md:h-12 border-2 border-black flex items-center justify-center text-black font-black uppercase tracking-widest text-[10px]">Shop Now</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Glow */}
                            <div className="absolute inset-0 bg-brand-primary/5 blur-[80px] md:blur-[120px] rounded-full scale-150 pointer-events-none"></div>
                        </div>

                        {/* Right Column: Strategy Flow */}
                        <div className="relative h-1/2 md:h-full flex flex-col justify-center">
                            <div className="strategy-step absolute inset-0 flex flex-col justify-center pointer-events-none">
                                <span className="text-brand-primary font-black text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 md:mb-6">Phase 01</span>
                                <h2 className="text-4xl md:text-8xl font-display font-black text-white uppercase italic leading-[0.85] mb-4 md:mb-8">
                                    The <br /> <span className="text-brand-primary">Hook.</span>
                                </h2>
                                <p className="text-slate-400 text-base md:text-xl leading-relaxed max-w-md font-medium">
                                    We analyze algorithmic patterns to design "Pattern Interrupt" visuals that force a user to stop their thumb within 0.5 seconds.
                                </p>
                            </div>

                            <div className="strategy-step absolute inset-0 flex flex-col justify-center pointer-events-none opacity-0">
                                <span className="text-brand-primary font-black text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 md:mb-6">Phase 02</span>
                                <h2 className="text-4xl md:text-8xl font-display font-black text-white uppercase italic leading-[0.85] mb-4 md:mb-8">
                                    The <br /> <span className="text-brand-primary">Engagement.</span>
                                </h2>
                                <p className="text-slate-400 text-base md:text-xl leading-relaxed max-w-md font-medium">
                                    Interactive storytelling and carousel systems designed to maximize dwell-time and trigger the "Save" action.
                                </p>
                            </div>

                            <div className="strategy-step absolute inset-0 flex flex-col justify-center pointer-events-none opacity-0">
                                <span className="text-brand-primary font-black text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 md:mb-6">Phase 03</span>
                                <h2 className="text-4xl md:text-8xl font-display font-black text-white uppercase italic leading-[0.85] mb-4 md:mb-8">
                                    The <br /> <span className="text-brand-primary">ROI.</span>
                                </h2>
                                <p className="text-slate-400 text-base md:text-xl leading-relaxed max-w-md font-medium">
                                    Clear call-to-actions integrated into premium aesthetics. We transform community sentiment into measurable business growth.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- 3. KINETIC POST GALLERY (SKEW ON SCROLL) --- */}
                <section ref={galleryRef} className="py-20 md:py-40 bg-[#030303] overflow-hidden">
                    <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8 md:gap-12">
                            <div>
                                <h2 className="text-4xl md:text-8xl font-display font-black text-white uppercase italic leading-none mb-4 md:mb-6">The <br /> Artifacts.</h2>
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-[9px] md:text-[10px]">Curation of recent high-performance campaigns</p>
                            </div>
                            <div className="flex gap-8 md:gap-12 w-full md:w-auto">
                                <div className="text-center flex-1 md:flex-none">
                                    <p className="text-brand-primary font-display font-black text-3xl md:text-4xl">12M+</p>
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Impressions Managed</p>
                                </div>
                                <div className="text-center flex-1 md:flex-none">
                                    <p className="text-white font-display font-black text-3xl md:text-4xl">4.2x</p>
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Avg. ROI Boost</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
                            {[
                                { title: "Fintech Grid", cat: "Branding", img: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=800&auto=format&fit=crop" },
                                { title: "Luxe Reels", cat: "Motion", img: "https://images.unsplash.com/photo-1611162618071-b39a2dd0d789?q=80&w=800&auto=format&fit=crop" },
                                { title: "FMCG Stories", cat: "Direct Response", img: "https://images.unsplash.com/photo-1611162616475-46b635cbca44?q=80&w=800&auto=format&fit=crop" },
                                { title: "Crypto Ads", cat: "Campaign", img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop" },
                                { title: "Estate Posts", cat: "Interactive", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop" },
                                { title: "Retail Blitz", cat: "Ads", img: "https://images.unsplash.com/photo-1611162617263-4ec3060a058e?q=80&w=800&auto=format&fit=crop" }
                            ].map((post, i) => (
                                <div key={i} className="post-item group relative aspect-[4/5] bg-slate-900 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-white/5 transform-gpu transition-all duration-700">
                                    <img src={post.img} className="w-full h-full object-cover  group-hover:scale-110 transition-all duration-1000" alt={post.title} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
                                    <div className="absolute bottom-8 left-8 md:bottom-10 md:left-10">
                                        <span className="text-brand-primary text-[8px] md:text-[9px] font-black uppercase tracking-widest mb-1 md:mb-2 block">{post.cat}</span>
                                        <h4 className="text-2xl md:text-3xl font-display font-bold text-white uppercase italic leading-tight">{post.title}</h4>
                                    </div>
                                    <div className="absolute top-6 right-6 md:top-10 md:right-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-primary flex items-center justify-center text-black">
                                            <Heart size={18} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- 4. DATA STRIP --- */}
                <section className="py-12 md:py-20 bg-brand-primary overflow-hidden whitespace-nowrap border-y-2 md:border-y-4 border-black">
                    <motion.div
                        className="inline-block"
                        animate={{ x: [0, -1000] }}
                        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                    >
                        {[...Array(4)].map((_, i) => (
                            <span key={i} className="text-4xl md:text-9xl font-display font-black text-black uppercase tracking-tighter mx-6 md:mx-12">
                                DATA DRIVEN • VISUAL FIRST • TREND SETTING • CONVERSION FOCUSED •
                            </span>
                        ))}
                    </motion.div>
                </section>

                {/* --- 5. CALL TO ACTION --- */}
                <section className="py-10 md:py-60 bg-brand-dark text-center relative overflow-hidden group">
                    <Link href="/contact" className="absolute inset-0 z-20 flex flex-col items-center justify-center">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] mb-8 text-brand-primary group-hover:tracking-[1em] transition-all duration-700">Start Your Takeover</span>
                        <h2 className="text-5xl md:text-[10vw] font-display font-black uppercase italic leading-[0.8] mb-12 md:mb-16 text-white">
                            Hijack <br /> <span className="text-brand-primary">The Feed.</span>
                        </h2>
                        <Magnetic strength={0.4}>
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-brand-primary flex items-center justify-center text-black group-hover:scale-110 transition-transform">
                                <ArrowRight size={32} />
                            </div>
                        </Magnetic>
                    </Link>
                    {/* Background Decal */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap opacity-[0.03] pointer-events-none select-none">
                        <span className="text-[40vw] md:text-[35vw] font-display font-black uppercase italic">SOCIAL</span>
                    </div>
                </section>

            </div>
        </>
    );
};

export default SocialMedia;