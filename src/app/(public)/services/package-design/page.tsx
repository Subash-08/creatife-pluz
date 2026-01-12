'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import SEO from '@/components/SEO';
import Button from '@/components/Button';
import Magnetic from '@/components/Magnetic';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Box, Layers, Star, Zap, CheckCircle2, ArrowRight, Scissors, Ruler, ShieldCheck, Target, Activity, Cpu, BoxSelect, Crosshair, Terminal } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PackageDesign: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const anatomySectionRef = useRef<HTMLDivElement>(null);
    const blueprintRef = useRef<SVGSVGElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);

    // Mouse tracking for Hero interaction
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        mouseX.set((clientX / innerWidth) - 0.5);
        mouseY.set((clientY / innerHeight) - 0.5);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Blueprint Drawing Animation
            if (blueprintRef.current) {
                gsap.fromTo(blueprintRef.current.querySelectorAll('path'),
                    { strokeDasharray: 1000, strokeDashoffset: 1000 },
                    {
                        strokeDashoffset: 0,
                        duration: 2,
                        stagger: 0.2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: "#blueprint-trigger",
                            start: "top 60%",
                        }
                    }
                );
            }

            // 2. THE 3D SCANNER ANIMATION (Tumble + Move Down)
            const steps = gsap.utils.toArray('.anatomy-step');

            const anatomyTl = gsap.timeline({
                scrollTrigger: {
                    trigger: anatomySectionRef.current,
                    start: "top top",
                    end: "+=500%",
                    scrub: 1.5,
                    pin: true,
                    anticipatePin: 1,
                }
            });

            anatomyTl.to(boxRef.current, {
                y: "50vh",
                rotateX: 360,
                rotateY: 720,
                rotateZ: 45,
                scale: 1.2,
                ease: "none",
            }, 0);

            anatomyTl.to("#laser-scanner", {
                top: "80%",
                ease: "none",
            }, 0);

            anatomyTl.fromTo(".hud-element",
                { opacity: 0, scale: 0 },
                { opacity: 1, scale: 1, stagger: 0.5, duration: 0.5 },
                0.5
            );

            steps.forEach((step: any, i) => {
                anatomyTl.fromTo(step,
                    { opacity: 0, x: 50, filter: "blur(10px)" },
                    { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.8 },
                    i * 1.5
                );

                if (i < steps.length - 1) {
                    anatomyTl.to(step, { opacity: 0, x: -50, filter: "blur(10px)", duration: 0.5 }, i * 1.5 + 1.2);
                }
            });

            anatomyTl.to("#anatomy-scroll-progress", { height: "100%", ease: "none" }, 0);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <SEO
                title="Product Package Design - Creative Pluz"
                description="Premium packaging design that sells. From concept labels to structural box designs, we create the physical experience of your brand."
            />

            <div ref={containerRef} onMouseMove={handleMouseMove} className="bg-brand-dark text-white selection:bg-brand-primary selection:text-black">

                {/* --- 1. RE-STYLED KINETIC HERO --- */}
                <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#030303]">

                    {/* Technical Drawing Grid */}
                    <div className="absolute inset-0 z-0 overflow-hidden opacity-20 pointer-events-none">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1A1A1A_1px,transparent_1px),linear-gradient(to_bottom,#1A1A1A_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                        <motion.div
                            style={{ x: useTransform(springX, [-0.5, 0.5], [-100, 100]), y: useTransform(springY, [-0.5, 0.5], [-100, 100]) }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-brand-primary/20 rounded-full"
                        />
                    </div>

                    {/* Floating HUD Elements */}
                    <div className="absolute top-32 left-12 z-10 flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary">Dieline-Engine: Active</span>
                        </div>
                        <div className="text-[8px] font-mono text-slate-600 uppercase">SYS_COORD: 45.9221 / -122.4091</div>
                    </div>

                    <div className="absolute bottom-32 right-12 z-10 text-right hidden lg:block">
                        <Terminal size={16} className="text-brand-primary mb-2 ml-auto" />
                        <p className="text-[9px] font-mono text-slate-500 uppercase max-w-[150px] leading-relaxed">
                            Material: 350GSM Kraft <br />
                            Finish: Matte Lamination <br />
                            Tolerance: 0.05mm
                        </p>
                    </div>

                    <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-3 text-brand-primary font-bold uppercase tracking-[0.6em] text-[10px] mb-6 px-4 py-1 border-x border-brand-primary/40"
                        >
                            <Crosshair size={12} /> Tactile Engineering Lab
                        </motion.div>

                        <div className="relative">
                            {/* Main Title with Stroke Effect */}
                            <h1 className="text-[14vw] font-display font-black uppercase leading-[0.75] tracking-tighter italic mb-12 flex flex-col items-center">
                                <motion.span
                                    initial={{ x: -100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, ease: "circOut" }}
                                    className="block"
                                >
                                    DIELINE
                                </motion.span>
                                <motion.span
                                    initial={{ x: 100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, ease: "circOut", delay: 0.1 }}
                                    className="text-brand-primary"
                                >
                                    CRAFT.
                                </motion.span>
                            </h1>

                            {/* Decorative Corner Brackets */}
                            <div className="absolute -top-10 -left-10 w-20 h-20 border-t-2 border-l-2 border-brand-primary/20"></div>
                            <div className="absolute -bottom-10 -right-10 w-20 h-20 border-b-2 border-r-2 border-brand-primary/20"></div>
                        </div>

                        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-24">
                            <p className="max-w-[280px] text-slate-500 text-[11px] font-bold uppercase tracking-widest text-center leading-relaxed">
                                We don't just design boxes. We engineer the physical threshold between brand and user.
                            </p>
                            <Magnetic strength={0.3}>
                                <Link href="/contact">
                                    <div className="group relative bg-white text-black p-8 text-xl font-black uppercase tracking-widest transition-all hover:bg-brand-primary overflow-hidden">
                                        <span className="relative z-10 flex items-center gap-4">
                                            Request Prototype <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                                        </span>
                                        {/* Animated Scanner Glow */}
                                        <div className="absolute top-0 left-0 w-1 h-full bg-brand-primary group-hover:left-full transition-all duration-700 ease-in-out"></div>
                                    </div>
                                </Link>
                            </Magnetic>
                        </div>
                    </div>

                    {/* Mouse-reactive Coordinate Ring */}
                    <motion.div
                        style={{
                            x: useTransform(springX, [-0.5, 0.5], [-200, 200]),
                            y: useTransform(springY, [-0.5, 0.5], [-200, 200]),
                            opacity: 0.1
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-2 border-brand-primary pointer-events-none flex items-center justify-center rounded-full"
                    >
                        <div className="w-[1px] h-full bg-brand-primary absolute left-1/2 -translate-x-1/2"></div>
                        <div className="h-[1px] w-full bg-brand-primary absolute top-1/2 -translate-y-1/2"></div>
                    </motion.div>
                </section>

                {/* --- 2. THE ANATOMY (3D SCROLL STAGE) --- */}
                <section ref={anatomySectionRef} className="relative h-screen bg-[#050505] overflow-hidden">

                    <div id="laser-scanner" className="absolute top-[20%] left-0 w-full h-[2px] bg-brand-primary/40 shadow-[0_0_20px_rgba(217,255,0,1)] z-30 pointer-events-none">
                        <div className="absolute top-0 right-10 text-[8px] font-black text-brand-primary bg-black px-2 -translate-y-full uppercase tracking-tighter">Scanning Structure: 104.2mm Accuracy</div>
                    </div>

                    <div className="absolute left-8 top-1/2 -translate-y-1/2 h-64 w-[1px] bg-white/10 z-30">
                        <div id="anatomy-scroll-progress" className="absolute top-0 left-0 w-full bg-brand-primary shadow-[0_0_10px_#D9FF00]"></div>
                    </div>

                    <div className="max-w-[1440px]  mx-auto px-6 lg:px-24 w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                        <div className="relative h-full flex items-center justify-center" style={{ perspective: "2000px" }}>
                            <div ref={boxRef} className="relative hidden lg:flex w-full max-w-sm aspect-[3/4] preserve-3d">

                                <div className="hud-element absolute -top-10 -right-10 p-4 border border-brand-primary/40 bg-black/80 backdrop-blur-md z-40 rounded-lg">
                                    <p className="text-[10px] font-black text-brand-primary uppercase mb-1">Stress Tolerance</p>
                                    <p className="text-[8px] text-white uppercase tracking-widest font-bold">120kg Tested</p>
                                </div>

                                <div className="hud-element absolute -bottom-10 -left-10 p-4 border border-brand-primary/40 bg-black/80 backdrop-blur-md z-40 rounded-lg">
                                    <p className="text-[10px] font-black text-brand-primary uppercase mb-1">Optical Gloss</p>
                                    <p className="text-[8px] text-white uppercase tracking-widest font-bold">Spot UV Verified</p>
                                </div>

                                <div className="w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop"
                                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                        alt="3D Package Model"
                                    />
                                    <div className="absolute inset-x-0 h-20 bg-brand-primary/20 blur-xl animate-pulse top-0 pointer-events-none"></div>
                                </div>
                            </div>

                            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64 h-12 bg-brand-primary/5 blur-3xl rounded-full scale-150"></div>
                        </div>

                        <div className="relative h-[60vh] flex flex-col justify-center">

                            <div className="anatomy-step absolute inset-0 flex flex-col justify-center pointer-events-none">
                                <div className="flex items-center gap-4 mb-6">
                                    <BoxSelect className="text-brand-primary" size={24} />
                                    <span className="text-brand-primary font-black text-xs uppercase tracking-[0.4em]">Structure</span>
                                </div>
                                <h2 className="text-[2rem] md:text-6xl font-display font-black text-white uppercase italic leading-[0.85] mb-8">
                                    Built to <br /> <span className="text-brand-primary">Protect.</span>
                                </h2>
                                <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-md font-medium">
                                    Every millimeter is calculated for industrial strength. We utilize custom corrugated architectures for high-end retail durability.
                                </p>
                            </div>

                            <div className="anatomy-step absolute inset-0 flex flex-col justify-center pointer-events-none">
                                <div className="flex items-center gap-4 mb-6">
                                    <Target className="text-brand-primary" size={24} />
                                    <span className="text-brand-primary font-black text-xs uppercase tracking-[0.4em]">Psychology</span>
                                </div>
                                <h2 className="text-[2rem] md:text-6xl font-display font-black text-white uppercase italic leading-[0.85] mb-8">
                                    Built to <br /> <span className="text-brand-primary">Seduce.</span>
                                </h2>
                                <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-md font-medium">
                                    Shelf impact is psychological warfare. We leverage color theory and visual hierarchy to ensure your product is the first one touched.
                                </p>
                            </div>

                            <div className="anatomy-step absolute inset-0 flex flex-col justify-center pointer-events-none">
                                <div className="flex items-center gap-4 mb-6">
                                    <Star className="text-brand-primary" size={24} />
                                    <span className="text-brand-primary font-black text-xs uppercase tracking-[0.4em]">Artifacting</span>
                                </div>
                                <h2 className="text-[2rem] md:text-6xl font-display font-black text-white uppercase italic leading-[0.85] mb-8">
                                    Built to <br /> <span className="text-brand-primary">Last.</span>
                                </h2>
                                <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-md font-medium">
                                    Tactile finishes turn packaging into a keepsake. Metallic foils and soft-touch textures communicate luxury before the product is even seen.
                                </p>
                            </div>

                        </div>
                    </div>
                </section>

                {/* --- 3. BLUEPRINT SECTION --- */}
                <section id="blueprint-trigger" className="pt-2rem pb-2rem bg-brand-dark border-y border-white/5 overflow-hidden">
                    <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
                            <div className="max-w-xl">
                                <h2 className="text-[2rem] md:text-8xl font-display font-black text-white uppercase italic leading-none mb-8">The <br /> Blueprint.</h2>
                                <p className="text-slate-400 text-xl font-medium">Precision industrial drawing meets aesthetic purity. Every millimeter is intentional.</p>
                            </div>
                            <div className="flex gap-12">
                                <div className="text-center">
                                    <p className="text-brand-primary font-display font-black text-4xl">0.1mm</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Precision Tolerance</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-white font-display font-black text-4xl">100%</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Print Accuracy</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative p-10 md:p-20 bg-white/[0.02] border border-white/10 rounded-[3rem] overflow-hidden group">
                            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none"></div>
                            <svg ref={blueprintRef} className="w-full h-auto" viewBox="0 0 1000 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M50 50H950V350H50V50Z" stroke="#D9FF00" strokeWidth="1" strokeDasharray="10 5" />
                                <path d="M250 50V350" stroke="#D9FF00" strokeWidth="1" strokeDasharray="5 5" />
                                <path d="M750 50V350" stroke="#D9FF00" strokeWidth="1" strokeDasharray="5 5" />
                                <path d="M50 150H950" stroke="#D9FF00" strokeWidth="1" strokeDasharray="5 5" />
                                <path d="M50 250H950" stroke="#D9FF00" strokeWidth="1" strokeDasharray="5 5" />
                                <circle cx="500" cy="200" r="80" stroke="#D9FF00" strokeWidth="1" strokeDasharray="10 10" />
                            </svg>

                            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
                                {[
                                    { icon: <Scissors size={20} />, label: "Die-Cut Ready" },
                                    { icon: <Ruler size={20} />, label: "Structural Cad" },
                                    { icon: <Layers size={20} />, label: "Foil Paths" },
                                    { icon: <ShieldCheck size={20} />, label: "Batch Optimized" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-slate-500 group-hover:text-brand-primary transition-colors">
                                        {item.icon}
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- 4. SURFACE OBSESSION SECTION --- */}
                <section className="py-40 bg-[#050505] relative overflow-hidden">
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap opacity-[0.02] pointer-events-none select-none">
                        <span className="text-[30vw] font-display font-black uppercase italic">TEXTURE TEXTURE TEXTURE</span>
                    </div>

                    <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
                        <div className="text-center mb-24">
                            <h2 className="text-5xl md:text-7xl font-display font-bold text-white uppercase italic mb-6">Tactile <br /> Obsession.</h2>
                            <p className="text-slate-500 max-w-xl mx-auto uppercase tracking-widest text-xs font-bold">The difference between a box and an experience.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {[
                                {
                                    title: "Metallic Foil",
                                    desc: "Precision hot-stamping for luxury contrast.",
                                    img: "https://images.unsplash.com/photo-1626785774583-b756fe9785da?q=80&w=800&auto=format&fit=crop",
                                    color: "text-brand-primary"
                                },
                                {
                                    title: "Soft Touch",
                                    desc: "Velvety lamination for an elite hand-feel.",
                                    img: "https://images.unsplash.com/photo-1586075010633-de44f508c39b?q=80&w=800&auto=format&fit=crop",
                                    color: "text-white"
                                },
                                {
                                    title: "Spot UV",
                                    desc: "Raised gloss textures for 3D visual depth.",
                                    img: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=800&auto=format&fit=crop",
                                    color: "text-brand-primary"
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -20 }}
                                    className="group relative h-[500px] rounded-[2.5rem] overflow-hidden border border-white/10"
                                >
                                    <img src={item.img} className="w-full h-full object-cover  transition-all duration-1000 group-hover:scale-110" alt={item.title} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80"></div>
                                    <div className="absolute bottom-12 left-12 right-12">
                                        <h4 className={`text-4xl font-display font-black uppercase italic mb-4 ${item.color}`}>{item.title}</h4>
                                        <p className="text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- 5. CALL TO ACTION --- */}
                <section className="py-48 bg-brand-primary text-black text-center relative overflow-hidden group">
                    <Link href="/contact" className="absolute inset-0 z-20 flex flex-col items-center justify-center">
                        <span className="text-[10px] font-black uppercase tracking-[0.6em] mb-10 group-hover:tracking-[1em] transition-all duration-700">Start Your Transition</span>
                        <h2 className="text-[2rem] md:text-[8vw] font-display font-black uppercase italic leading-[0.8] mb-16">
                            Elevate <br /> <span className="underline decoration-black decoration-8 underline-offset-[20px]">Packaging.</span>
                        </h2>
                        <Magnetic strength={0.4}>
                            <div className="w-32 h-32 rounded-full bg-black flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                <ArrowRight size={48} />
                            </div>
                        </Magnetic>
                    </Link>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap opacity-[0.05] pointer-events-none select-none">
                        <span className="text-[35vw] font-display font-black uppercase italic">CREATIVE PLUZ CREATIVE PLUZ</span>
                    </div>
                </section>

            </div>
        </>
    );
};

export default PackageDesign;