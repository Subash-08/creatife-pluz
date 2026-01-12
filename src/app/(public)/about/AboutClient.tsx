'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import Magnetic from '@/components/Magnetic';
import { Target, Users, Zap, ArrowRight, Award, Smile, Coffee, Instagram, Linkedin, Twitter, ShieldCheck, Cpu, Flame, MousePointer2 } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutClient: React.FC = () => {
    const [activeTab, setActiveTab] = useState('ABOUT');
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const manifestoRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const heroTitleRef = useRef<HTMLHeadingElement>(null);
    const bigLetterRef = useRef<HTMLDivElement>(null);

    const team = [
        {
            name: "Alex Sterling",
            role: "Founder & CEO",
            experience: "15+ Years",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
            bio: "15+ years of digital strategy and brand building for global industry leaders."
        },
        {
            name: "Sarah Chen",
            role: "Creative Director",
            experience: "10+ Years",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
            bio: "Award-winning designer focused on visceral aesthetics and emotional storytelling."
        },
        {
            name: "Marcus Vane",
            role: "Strategy Lead",
            experience: "12+ Years",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
            bio: "Expert in market disruption and behavioral psychology in consumer branding."
        },
        {
            name: "Elena Rodriguez",
            role: "Technical Director",
            experience: "8+ Years",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
            bio: "Bridging the gap between high-end design and robust, scalable engineering."
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Initial Hero Assembly
            gsap.from(".portal-frame", {
                opacity: 0,
                scale: 0.5,
                z: -1000,
                stagger: 0.05,
                duration: 1.5,
                ease: "power4.out"
            });

            gsap.from(".about-char", {
                opacity: 0,
                y: 50,
                stagger: 0.1,
                duration: 1,
                ease: "back.out(1.7)",
                delay: 0.8
            });

            // 2. Continuous Frame Pulse
            gsap.to(".portal-frame", {
                borderColor: "#D9FF00",
                boxShadow: "0 0 20px rgba(217,255,0,0.2)",
                stagger: {
                    each: 0.2,
                    repeat: -1,
                    yoyo: true
                },
                duration: 2
            });

            // 3. STATS PARALLAX (Horizontal drift)
            gsap.to(".stat-item", {
                x: (i) => (i % 2 === 0 ? -100 : 100),
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.5,
                }
            });

            // 4. MANIFESTO REVEAL (Sequential)
            const manifestoItems = gsap.utils.toArray<HTMLElement>('.manifesto-item');
            gsap.to(manifestoItems, {
                opacity: 1,
                y: 0,
                stagger: 0.5,
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top 70%",
                    end: "bottom 20%",
                    scrub: 1,
                }
            });

            // 5. GHOST TEXT DRIFT
            gsap.to(".ghost-text", {
                xPercent: -30,
                scrollTrigger: {
                    trigger: triggerRef.current,
                    scrub: 2,
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-brand-dark overflow-x-hidden">

            {/* --- HERO SECTION: GSAP CINEMATIC REVEAL --- */}
            <section ref={heroRef}
                className="relative min-h-screen md:h-[120vh] w-full bg-brand-dark flex flex-col items-center justify-center overflow-hidden py-20"
            >

                {/* Background Elements - Hidden on small screens to save performance if needed, or scaled */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] md:w-[80vw] h-[120vw] md:h-[80vw] bg-brand-primary/5 rounded-full blur-[80px] md:blur-[150px]"></div>
                    <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-10 md:opacity-20 grayscale"
                        alt="Background Team"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-transparent to-brand-dark"></div>
                </div>

                {/* Massive Clipping Letter - Adjusted scale for mobile */}
                <div ref={bigLetterRef} className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none select-none">
                    <h1 className="text-[80vw] md:text-[60vw] font-display font-black text-white/[0.03] leading-none uppercase tracking-tighter">
                        A
                    </h1>
                </div>

                {/* Hero Content */}
                <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="inline-flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-4 md:py-2 border border-brand-primary/30 rounded-full bg-brand-primary/5 mb-6 md:mb-8"
                    >
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brand-primary animate-pulse"></div>
                        <span className="text-brand-primary font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[8px] md:text-[10px]">Precision Creative Agency</span>
                    </motion.div>

                    {/* Main Title - Responsive Text Sizes */}
                    <h2 ref={heroTitleRef} className="text-[7vw] sm:text-6xl md:text-7xl lg:text-8xl font-display font-black text-white mb-8 md:mb-12 leading-[0.9] md:leading-[0.85] uppercase italic">
                        <span className="word block">Engineering</span>
                        <span className="word block text-brand-primary">The Next</span>
                        <span className="word block relative inline-block">
                            Standard
                            <svg className="absolute w-full h-2 md:h-3 -bottom-2 md:-bottom-4 left-0 text-brand-primary/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                        </span>
                    </h2>

                    {/* Dynamic Parallax Stats Bar - Flex column on mobile, Row on desktop */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-24 mt-12 md:mt-20 max-w-3xl mx-auto">
                        {[
                            { label: "Deep Expertise", val: "10Y+", color: "text-brand-primary" },
                            { label: "Brands Built", val: "250+", color: "text-white" },
                            { label: "Client Retention", val: "98%", color: "text-brand-primary" }
                        ].map((stat, i) => (
                            <div key={i} className="stat-item flex flex-col items-center">
                                <span className={`text-5xl md:text-7xl font-display font-black mb-1 md:mb-2 ${stat.color}`}>{stat.val}</span>
                                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] text-slate-500">{stat.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 md:mt-20">
                        <Magnetic strength={0.2}>
                            <Button href="/contact" className="group w-full sm:w-auto bg-white text-black px-8 py-4 md:px-12 md:py-6 text-base md:text-lg rounded-none hover:bg-brand-primary transition-all font-bold uppercase tracking-widest overflow-hidden relative">
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    Join The Elite <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                                </span>
                            </Button>
                        </Magnetic>
                    </div>
                </div>

                {/* Scroll Hint - Hidden on mobile to avoid overlap */}
                <div className="hidden md:flex absolute bottom-24 left-1/2 -translate-x-1/2 flex-col items-center gap-4 opacity-30">
                    <span className="text-[10px] font-bold uppercase tracking-[0.5em] [writing-mode:vertical-lr] mb-2">Manifesto</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-brand-primary to-transparent"></div>
                </div>


            </section>

            {/* --- MANIFESTO SECTION --- */}
            <section ref={manifestoRef} className="bg-[#050505] py-10 relative overflow-hidden">
                {/* Kinetic Background Text */}
                <div className="absolute top-1/4 left-0 whitespace-nowrap opacity-[0.03] pointer-events-none select-none z-0">
                    <span className="ghost-text text-[35vw] font-display font-black uppercase italic text-white leading-none inline-block mr-40">OBSESSION</span>
                    <span className="ghost-text text-[35vw] font-display font-black uppercase italic text-white leading-none inline-block">IMPACT</span>
                </div>

                <div ref={triggerRef} className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
                    <div className="flex flex-col gap-60">

                        {/* 01. MISSION */}
                        <div className="manifesto-item opacity-0 translate-y-32 flex flex-col md:flex-row gap-12 md:gap-12 items-start">
                            <div className="md:w-1/3 group">
                                <span className="text-brand-primary font-black text-7xl md:text-9xl font-display leading-none group-hover:italic transition-all duration-500 inline-block">01</span>
                                <h3 className="text-white text-3xl font-display font-bold uppercase mt-6 tracking-tighter flex items-center gap-3">
                                    <Target className="text-brand-primary" size={24} /> The Mission.
                                </h3>
                            </div>
                            <div className="md:w-2/3 border-l border-white/5 pl-8 md:pl-24 py-4 relative">
                                <div className="absolute top-0 left-0 w-1 h-20 bg-brand-primary"></div>
                                <h4 className="text-3xl md:text-5xl font-display font-bold text-white mb-8 leading-[1.1]">
                                    We don’t build <span className="text-brand-primary italic">Websites.</span> We build <br /> Market Dominance <span className="underline decoration-brand-primary decoration-4 underline-offset-8">Engines.</span>
                                </h4>
                                <p className="text-slate-400 text-lg md:text-2xl leading-relaxed max-w-3xl font-medium">
                                    Our singular goal is to transform brands into industry benchmarks. We blend raw creative instinct with tactical data to ensure your brand isn't just "seen"—it's impossible to ignore.
                                </p>
                                <div className="mt-12 flex flex-wrap gap-8">
                                    <div className="flex items-center gap-3 text-brand-primary font-black uppercase text-xs tracking-[0.2em]"><ShieldCheck size={20} /> Unrivaled Scalability</div>
                                    <div className="flex items-center gap-3 text-brand-primary font-black uppercase text-xs tracking-[0.2em]"><Cpu size={20} /> Tech-First Architecture</div>
                                </div>
                            </div>
                        </div>

                        {/* 02. STRATEGY */}
                        <div className="manifesto-item opacity-0 translate-y-5 flex flex-col mt-[-12rem] md:flex-row gap-12 md:gap-32 items-start ">
                            <div className="md:w-1/3 group">
                                <span className="text-brand-primary font-black text-7xl md:text-9xl font-display leading-none group-hover:italic transition-all duration-500 inline-block">02</span>
                                <h3 className="text-white text-3xl font-display font-bold uppercase mt-6 tracking-tighter flex items-center gap-3">
                                    <Zap className="text-brand-primary" size={24} /> The Strategy.
                                </h3>
                            </div>
                            <div className="md:w-2/3 border-l border-white/5 pl-8 md:pl-24 py-4 relative">
                                <div className="absolute top-0 left-0 w-1 h-20 bg-brand-primary"></div>
                                <h4 className="text-3xl md:text-5xl font-display font-bold text-white mb-8 leading-[1.1] uppercase italic">
                                    Precision Over <span className="text-brand-primary underline decoration-brand-primary decoration-2 underline-offset-4">Padding.</span>
                                </h4>
                                <p className="text-slate-400 text-lg md:text-2xl leading-relaxed max-w-3xl font-medium">
                                    Agility is our weapon. We eliminate corporate bloat to deliver results at high velocity. Every pixel, every line of code, and every campaign strategy is audited for one thing: ROI.
                                </p>
                                <div className="mt-12 flex flex-wrap gap-4">
                                    {['Data-Led Strategy', 'Rapid Prototyping', 'User-Centric Architecture', 'Behavioral Psychology'].map(item => (
                                        <span key={item} className="px-6 py-3 border border-white/10 bg-white/5 text-[10px] font-black uppercase text-slate-300 tracking-[0.3em] hover:bg-brand-primary hover:text-black transition-colors cursor-default">{item}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 03. ETHOS */}
                        <div className="manifesto-item opacity-0 translate-y-5 flex flex-col mt-[-12rem]  md:flex-row gap-12 md:gap-32 items-start">
                            <div className="md:w-1/3 group">
                                <span className="text-brand-primary font-black text-7xl md:text-9xl font-display leading-none group-hover:italic transition-all duration-500 inline-block">03</span>
                                <h3 className="text-white text-3xl font-display font-bold uppercase mt-6 tracking-tighter flex items-center gap-3">
                                    <Flame className="text-brand-primary" size={24} /> The Ethos.
                                </h3>
                            </div>
                            <div className="md:w-2/3 border-l border-white/5 pl-8 md:pl-24 py-4 relative">
                                <div className="absolute top-0 left-0 w-1 h-20 bg-brand-primary"></div>
                                <h4 className="text-3xl md:text-5xl font-display font-bold text-white mb-8 leading-[1.1]">
                                    Obsessive <span className="text-brand-primary italic">Craft.</span> <br /> No Room For <span className="bg-brand-primary text-black px-4 py-1 rotate-[-2deg] inline-block">Average.</span>
                                </h4>
                                <p className="text-slate-400 text-lg md:text-2xl leading-relaxed max-w-3xl font-medium">
                                    We are a collective of specialists, not generalists. We believe that 'good enough' is the enemy of excellence. Our team is driven by a shared obsession for perfection and aesthetic purity.
                                </p>
                                <div className="mt-12 flex items-center gap-10">
                                    <div className="w-20 h-20 rounded-full border border-brand-primary/20 flex items-center justify-center relative">
                                        <Flame size={40} className="text-brand-primary" />
                                        <div className="absolute inset-0 border border-brand-primary rounded-full animate-ping opacity-20"></div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-2">Agency Standard</p>
                                        <p className="text-xl font-display font-bold text-white italic">"Visceral Excellence Only."</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- STORY SECTION --- */}
            <div className="bg-brand-dark pb-50 relative z-10 pt-20">
                <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center mb-60">
                        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                            <span className="text-brand-primary font-bold tracking-[0.5em] uppercase text-[10px] mb-6 block">Origin Story</span>
                            <h2 className="text-5xl md:text-8xl font-display font-bold text-white mb-10 leading-[0.9] uppercase italic">
                                Beyond <br /> <span className="text-brand-primary">The Noise.</span>
                            </h2>
                            <div className="w-32 h-1 bg-brand-primary mb-12" />
                            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-8 font-medium italic">
                                Creative Pluz was founded on a simple premise: <strong className="text-white">Great design is not enough.</strong>
                            </p>
                            <p className="text-lg text-slate-400 leading-relaxed mb-8">
                                In today's hyper-competitive digital landscape, aesthetics alone won't move the needle. You need a partner who understands the intersection of behavioral psychology, high-end design, and market disruption.
                            </p>
                            <div className="flex items-center gap-6 p-8 border border-white/5 bg-white/[0.02] rounded-2xl">
                                <div className="p-4 bg-brand-primary text-black rounded-xl">
                                    <Users size={32} />
                                </div>
                                <p className="text-slate-300 font-bold uppercase tracking-widest text-xs leading-relaxed">
                                    We function as an elite extension of your leadership team, not just a vendor.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative">
                            <div className="absolute -inset-4 bg-brand-primary/10 blur-[60px] rounded-full"></div>
                            <div className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 group shadow-2xl">
                                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" className="w-full h-auto  transition-all duration-1000 group-hover:scale-105" alt="Our Workspace" />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60"></div>
                                <div className="absolute bottom-10 left-10">
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary mb-2">The War Room</p>
                                    <h4 className="text-2xl font-display font-bold text-white uppercase italic">Where Vision Becomes ROI</h4>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* --- TEAM SECTION --- */}
                    <div className="mb-40">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                            <div>
                                <span className="text-brand-primary font-bold tracking-[0.5em] uppercase text-[10px] mb-4 block">The Collective</span>
                                <h2 className="text-6xl md:text-[8vw] font-display font-black text-white uppercase italic leading-[0.8]">
                                    Global <br /> <span className="text-brand-primary">Talent.</span>
                                </h2>
                            </div>
                            <div className="max-w-md text-right">
                                <p className="text-slate-500 font-medium leading-relaxed">
                                    We've assembled a borderless team of world-class strategists and designers who live at the edge of culture and technology.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {team.map((member, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group cursor-none"
                                >
                                    <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-8 bg-brand-gray border border-white/5 shadow-xl">
                                        <img src={member.image} alt={member.name} className="w-full h-full object-cover  group-hover:scale-110 transition-all duration-1000 ease-in-out" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-10">
                                            <p className="text-white/80 text-sm leading-relaxed mb-6 font-medium italic">"{member.bio}"</p>
                                            <div className="flex gap-5">
                                                <Magnetic strength={0.4}><Instagram className="w-5 h-5 text-brand-primary cursor-pointer hover:text-white transition-colors" /></Magnetic>
                                                <Magnetic strength={0.4}><Linkedin className="w-5 h-5 text-brand-primary cursor-pointer hover:text-white transition-colors" /></Magnetic>
                                                <Magnetic strength={0.4}><Twitter className="w-5 h-5 text-brand-primary cursor-pointer hover:text-white transition-colors" /></Magnetic>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="text-2xl font-display font-bold text-white group-hover:text-brand-primary transition-colors uppercase italic">{member.name}</h3>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-brand-primary text-black rounded-full">
                                                {member.experience}
                                            </span>
                                            <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-[9px]">{member.role}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Detailed Stats Strip */}
                    <div className="border-y border-white/5 py-10 bg-white/[0.01]">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
                            {[
                                { label: "Market Leaders", val: "50+", icon: <Award className="w-8 h-8 mb-6 mx-auto text-brand-primary/40" /> },
                                { label: "Design Iterations", val: "∞", icon: <Coffee className="w-8 h-8 mb-6 mx-auto text-brand-primary/40" /> },
                                { label: "Average Growth", val: "4.5x", icon: <Zap className="w-8 h-8 mb-6 mx-auto text-brand-primary/40" /> },
                                { label: "Global Reach", val: "12", icon: <Smile className="w-8 h-8 mb-6 mx-auto text-brand-primary/40" /> }
                            ].map((stat, idx) => (
                                <motion.div key={idx} whileHover={{ y: -10 }} className="group">
                                    {stat.icon}
                                    <div className="text-5xl md:text-7xl font-display font-black text-white mb-3 group-hover:text-brand-primary transition-colors italic">{stat.val}</div>
                                    <div className="text-slate-500 font-black uppercase tracking-[0.3em] text-[9px]">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* --- CALL TO ACTION --- */}
            <section className="py-60 bg-brand-primary text-black text-center relative overflow-hidden group">
                <Link href="/contact" className="absolute inset-0 z-20 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] mb-10 group-hover:tracking-[1em] transition-all duration-700">Start Your Transition</span>
                    <h2 className="text-4xl md:text-[8vw] font-display font-black uppercase italic leading-[0.8] mb-16">
                        Elevate <br /> Your Brand.
                    </h2>
                    <Magnetic strength={0.4}>
                        <div className="w-32 h-32 rounded-full bg-black flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                            <ArrowRight size={48} />
                        </div>
                    </Magnetic>
                </Link>
                {/* Background Decal */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap opacity-[0.05] pointer-events-none select-none">
                    <span className="text-[35vw] font-display font-black uppercase italic">CREATIVE PLUZ CREATIVE PLUZ</span>
                </div>
            </section>

        </div>
    );
};

export default AboutClient;
