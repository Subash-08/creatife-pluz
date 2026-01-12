'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import Magnetic from '@/components/Magnetic';
import { ArrowRight, ArrowDownRight, Globe, Zap, Layers, Monitor, Camera, BookOpen, Share2, Box, MoveRight, Target, Activity } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
// --- Image Constants ---
const image = '/assets/images/service/BANNERS/Insta Post.png';
const banner = '/assets/images/service/BANNERS/Insta Post 16.jpg';
const banners = '/assets/images/service/BANNERS/Insta Post 17.jpg';

// --- GSAP-like Animation Variants ---
const letterAnim = {
    initial: { y: 200 },
    animate: { y: 0, transition: { duration: 1, ease: [0.6, 0.01, 0.05, 0.95] as [number, number, number, number] } }
};

const containerAnim = {
    animate: { transition: { staggerChildren: 0.1 } }
};

const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] as [number, number, number, number] } }
};

const HomeClient: React.FC = () => {

    const containerRef = useRef(null);
    const bentoRef = useRef(null);
    const { scrollYProgress } = useScroll({
        // target: containerRef,
        offset: ["start start", "end end"]
    });

    // Parallax effect for selected works
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

    // ========
    const clientLogos = [
        { src: '/assets/images/service/customer-logos/1.jpg', name: "image" },
        { src: '/assets/images/service/customer-logos/2.jpg', name: "logo" },
        { src: '/assets/images/service/customer-logos/3.jpg', name: "logo" },
        { src: '/assets/images/service/customer-logos/4.jpg', name: "logo" },
        { src: '/assets/images/service/customer-logos/5.jpg', name: "logo" },
        { src: '/assets/images/service/customer-logos/6.jpg', name: "logo" },
        { src: '/assets/images/service/customer-logos/7.jpg', name: "logo" },
        { src: '/assets/images/service/customer-logos/8.jpg', name: "logo" },
        { src: '/assets/images/service/customer-logos/9.jpg', name: "logo" },
        { src: '/assets/images/service/customer-logos/11.jpg', name: "logo" },
        { src: '/assets/images/service/customer-logos/12.jpg', name: "logo" },
        { src: '/assets/images/service/customer-logos/13.jpg', name: "logo" },
        { src: '/assets/images/service/customer-logos/14.jpg', name: "logo" },
        { src: '/assets/images/service/customer-logos/15.jpg', name: "logo" },
        { src: '/assets/images/service/customer-logos/16.jpg', name: "logo" },
        { src: '/assets/images/service/customer-logos/17.jpg', name: "logo" },
        { src: '/assets/images/service/customer-logos/18.jpg', name: "logo" },
        { src: '/assets/images/service/customer-logos/19.jpg', name: "logo" },
        { src: '/assets/images/service/customer-logos/20.jpg', name: "logo" },
        { src: '/assets/images/service/customer-logos/21.jpg', name: "logo" },
    ];

    const LogoMarquee = ({ reverse = false, speed = 60, logos = [] }: { reverse?: boolean, speed?: number, logos: any[] }) => (
        <div className="flex overflow-hidden py-4 select-none">
            <motion.div
                className="flex gap-4 min-w-full"
                animate={{ x: reverse ? ["-100%", "0%"] : ["0%", "-100%"] }}
                transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
            >
                {/* Tripling the array ensures a seamless infinite loop without gaps */}
                {[...logos, ...logos, ...logos].map((logo, i) => (
                    <div key={i} className="group relative flex-shrink-0 w-64 md:w-80 h-40 md:h-52 bg-white rounded-xl md:rounded-2xl shadow-sm border border-black/5 flex flex-col items-center justify-center p-8 transition-all hover:shadow-xl hover:-translate-y-1">

                        {/* Image Container */}
                        <div className="relative w-full h-full flex items-center justify-center  transition-all duration-500">
                            {logo.src ? (
                                <Image
                                    src={logo.src}
                                    alt={logo.name}
                                    fill

                                    className="object-contain p-4" // p-4 provides safe padding inside the white card
                                />
                            ) : (
                                <span className="text-black font-display font-black uppercase text-xl md:text-2xl opacity-20">
                                    {logo.name}
                                </span>
                            )}
                        </div>

                    </div>
                ))}
            </motion.div>
        </div>
    );

    return (
        <>
            {/* 1. Hero Section: Kinetic Typography */}
            <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 bg-brand-dark overflow-hidden">
                <div className="max-w-[1920px] w-full mx-auto z-10">
                    <motion.div
                        className="flex flex-col gap-0"
                        variants={containerAnim}
                        initial="initial"
                        animate="animate"
                    >
                        {/* Row 1 */}
                        <div className="overflow-hidden">
                            <motion.h1 variants={letterAnim} className="text-[14vw] leading-[0.8] font-display font-black text-white uppercase tracking-tighter">
                                We Craft
                            </motion.h1>
                        </div>
                        {/* Row 2 */}
                        <div className="overflow-hidden flex items-center gap-4 md:gap-12">
                            <motion.div variants={letterAnim} className="w-16 h-16 md:w-32 md:h-32 bg-brand-primary rounded-full flex items-center justify-center animate-spin-slow">
                                <ArrowDownRight className="text-black w-8 h-8 md:w-16 md:h-16" />
                            </motion.div>
                            <motion.h1 variants={letterAnim} className="text-[10vw] leading-[0.8] font-display font-black text-transparent stroke-text uppercase tracking-tighter" style={{ WebkitTextStroke: "2px white" }}>
                                Digital
                            </motion.h1>
                        </div>
                        {/* Row 3 */}
                        <div className="overflow-hidden">
                            <motion.h1 variants={letterAnim} className="text-[10vw] leading-[0.8] font-display font-black text-brand-primary uppercase tracking-tighter">
                                Futures
                            </motion.h1>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                        transition={{ delay: 1 }}
                        className="mt-12 md:mt-20 flex flex-col md:flex-row justify-between items-start md:items-end"
                    >
                        <p className="text-slate-400 max-w-md text-lg md:text-xl font-medium leading-relaxed">
                            We are a new-age digital agency. We blend raw creativity with technical precision to build brands that dominate their market.
                        </p>
                        <div className="mt-8 md:mt-0">
                            <Link href="/contact">
                                <div className="group relative overflow-hidden rounded-full bg-white px-8 py-4 md:px-12 md:py-6 transition-all hover:bg-brand-primary">
                                    <span className="relative z-10 font-bold uppercase tracking-wider text-black group-hover:text-black transition-colors">Start Project</span>
                                </div>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. Marquee Section - Infinite Scroll */}
            <div className="py-12 bg-brand-primary overflow-hidden whitespace-nowrap border-y-4 border-black">
                <motion.div
                    className="inline-block"
                    animate={{ x: [0, -1000] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                >
                    {[...Array(4)].map((_, i) => (
                        <span key={i} className="text-6xl md:text-8xl font-display font-black text-black uppercase tracking-tight mx-8">
                            Branding • Design • Photography • Signage •
                        </span>
                    ))}
                </motion.div>
            </div>

            {/* 3. THE ARTIFACT WALL */}
            <section ref={bentoRef} className="py-12 md:py-32 bg-brand-dark overflow-hidden">
                <div className="max-w-[1920px] mx-auto px-6 md:px-12">

                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-7xl lg:text-8xl font-display font-black text-brand-primary uppercase leading-[0.85] italic tracking-tighter">
                                Selected <br /> <span className="text-slate-400">Artifacts.</span>
                            </h2>
                        </div>
                        <Link href="/portfolio" className="group mt-8 md:mt-0 flex items-center gap-4 text-white font-black uppercase tracking-widest text-[10px] md:text-sm">
                            View Archive
                            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-brand-primary transition-colors">
                                <ArrowRight size={20} />
                            </div>
                        </Link>
                    </div>

                    {/* Responsive Grid Logic:
        - Mobile: grid-cols-1 (stacking)
        - Desktop: grid-cols-12 with 6 rows
    */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto md:h-[300vh] lg:h-[220vh]">

                        {/* 1. Large Feature */}
                        <motion.div whileHover={{ scale: 0.99 }} className="md:col-span-8 md:row-span-2 bg-[#E31E24] relative  flex items-center justify-center p-8 min-h-[400px]">
                            <Image src={banners} alt="Work 1" fill className="object-contain p-0" priority />
                            <div className="absolute bottom-6 left-6 z-20">
                                <Link href="/portfolio/1" className="bg-black text-white px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest">Explore</Link>
                            </div>
                        </motion.div>

                        {/* 2. Tactical Slim */}
                        <motion.div whileHover={{ scale: 0.99 }} className="md:col-span-4 md:row-span-1 bg-[#222222] relative overflow-hidden min-h-[250px]">
                            <Image src={banner} alt="Work 2" fill className="object-cover opacity-80" />
                        </motion.div>

                        {/* 3. Vertical Tech */}
                        <motion.div whileHover={{ scale: 0.99 }} className="md:col-span-4 md:row-span-2 bg-[#4CAF50] relative overflow-hidden flex items-center justify-center min-h-[500px]">
                            <div className="relative w-3/4 aspect-[9/19] bg-black rounded-[2rem] border-4 border-black overflow-hidden rotate-3">
                                <Image src={image} alt="Work 3" fill className="object-cover" />
                            </div>
                        </motion.div>

                        {/* 4. Horizontal Mid */}
                        <motion.div whileHover={{ scale: 0.99 }} className="md:col-span-5 md:row-span-1 bg-slate-100 relative overflow-hidden min-h-[250px]">
                            <Image src={banners} alt="Work 4" fill className="object-cover" />
                        </motion.div>

                        {/* 5. Square Accent */}
                        <motion.div whileHover={{ scale: 0.99 }} className="md:col-span-3 md:row-span-1 bg-[#6366f1] relative overflow-hidden min-h-[250px]">
                            <Image src={image} alt="Work 5" fill className="object-cover" />
                        </motion.div>

                        {/* 6. Wide Banner */}
                        <motion.div whileHover={{ scale: 0.99 }} className="md:col-span-8 md:row-span-1 bg-[#f97316] relative overflow-hidden min-h-[250px]">
                            <Image src={banner} alt="Work 6" fill className="object-cover opacity-80" />
                        </motion.div>

                        {/* 7. Identity Block */}
                        <motion.div whileHover={{ scale: 0.99 }} className="md:col-span-4 md:row-span-2 bg-white relative overflow-hidden min-h-[400px] flex items-center justify-center">
                            <Image src={image} alt="Work 7" fill className="object-contain p-16 mix-blend-multiply" />
                        </motion.div>

                        {/* 8. Dark Accent */}
                        <motion.div whileHover={{ scale: 0.99 }} className="md:col-span-3 md:row-span-1 bg-[#333333] relative overflow-hidden min-h-[250px]">
                            <Image src={banners} alt="Work 8" fill className="object-cover opacity-50" />
                        </motion.div>

                        {/* 9. Slim Footer Item */}
                        <motion.div whileHover={{ scale: 0.99 }} className="md:col-span-5 md:row-span-1 bg-slate-800 relative overflow-hidden min-h-[250px]">
                            <Image src={banner} alt="Work 9" fill className="object-cover" />
                        </motion.div>



                    </div>
                </div>
            </section>

            {/* 4. Introduction - Grid Layout */}
            <section className="py-20 px-6 md:px-12 bg-brand-dark border-b border-white/10">
                <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight">
                            Beyond Digital.<br />
                            <span className="text-brand-primary">Physical & Visual Impact.</span>
                        </h2>
                    </div>
                    <div className="space-y-12">
                        <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                            High-performance brands aren't just seen online; they are felt in the real world. We provide full-spectrum creative services that bridge that gap.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { icon: <Globe />, title: "Brand Identity", desc: "Forging legacies through strategy and design." },
                                { icon: <Zap />, title: "Market Domination", desc: "Results-focused visual communication." },
                            ].map((item, i) => (
                                <div key={i} className="border-l border-brand-primary pl-6">
                                    <div className="text-brand-primary mb-4">{item.icon}</div>
                                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-slate-500">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Expertise Section */}
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


            {/* 6. THE IDENTITY LEDGER (Logo Showcase Inspired by User Image) */}
            <section className="py-10 md:py-10 bg-brand-dark overflow-hidden">
                <div className="max-w-[1920px] mx-auto px-2 md:px-12 mb-16 md:mb-24">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-8 h-px bg-black/20"></div>
                        <span className="text-brand-primary font-black uppercase tracking-[0.4em] text-black/40">The Ledger</span>
                    </div>
                    <h2 className="text-4xl md:text-8xl font-display font-black text-brand-primary uppercase leading-[0.8] italic tracking-tighter">
                        Verified <br /> <span className="text-slate-400">Identities.</span>
                    </h2>
                </div>

                <div className="space-y-4 md:space-y-6">
                    <LogoMarquee logos={clientLogos.slice(0, 20)} speed={35} />
                    <LogoMarquee logos={clientLogos.slice(10)} speed={35} reverse={true} />
                </div>


            </section>

            {/* Footer CTA */}
            <section className="py-8 bg-brand-primary text-black text-center px-6">
                <h2 className="text-[10vw] font-display font-black uppercase leading-[0.8] mb-6">
                    Let's Make<br />History
                </h2>
                <Button href="/contact" className="bg-black text-white px-12 py-6 text-xl rounded-full hover:text-black transition-transform">
                    Start Project
                </Button>
            </section>
        </>
    );
};

export default HomeClient;
