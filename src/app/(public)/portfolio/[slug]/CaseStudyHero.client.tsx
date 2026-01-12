'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Magnetic from './Magnetic.client'
import { ProjectWithDetails } from './types'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react' // Make sure to install: npm install @gsap/react

// Register plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

interface CaseStudyHeroProps {
    project: ProjectWithDetails
}

export default function CaseStudyHero({ project }: CaseStudyHeroProps) {
    const heroRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLHeadingElement>(null)
    const bgImageRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        // 1. Text Entry Animation
        if (textRef.current) {
            gsap.fromTo(
                textRef.current,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: 'power3.out',
                    delay: 0.2
                }
            )
        }

        // 2. Parallax Effect (GSAP ScrollTrigger instead of manual listener)
        // We animate the Background Image container, NOT the heroRef container.
        if (bgImageRef.current) {
            gsap.to(bgImageRef.current, {
                yPercent: 30, // Move image down 30% while scrolling
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                }
            })
        }
    }, { scope: heroRef })

    return (
        <section
            ref={heroRef}
            className="relative h-screen w-full overflow-hidden flex items-center justify-center z-10" // Added z-10 to manage stacking
            aria-label={`${project.title} case study hero section`}
        >
            {/* Background Image Container - Ref added here */}
            <div ref={bgImageRef} className="absolute inset-0 z-0 h-[120%] w-full -top-[10%]">
                {/* Note: Made height 120% and top -10% to give room for parallax movement without showing whitespace */}
                {project.coverImage?.url ? (
                    <img
                        src={project.coverImage.url}
                        className="w-full h-full object-cover grayscale scale-105"
                        alt={project.coverImage.alt || project.title}
                        aria-hidden="true"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black" />
                )}
                <div
                    className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black"
                    aria-hidden="true"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6">
                <Magnetic strength={0.2}>
                    <Link
                        href="/portfolio"
                        className="inline-flex items-center gap-2 text-brand-primary font-bold uppercase tracking-widest text-[10px] mb-8 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-brand-dark rounded-lg p-2"
                        aria-label="Back to portfolio"
                    >
                        <ArrowLeft size={14} aria-hidden="true" />
                        Back to Work
                    </Link>
                </Magnetic>

                <h1
                    ref={textRef}
                    className="text-[12vw] font-display font-black leading-none uppercase italic tracking-tighter text-white"
                >
                    {project.title}
                </h1>

                <div className="flex justify-center gap-12 mt-12 border-t border-white/10 pt-12 max-w-xl mx-auto">
                    <div>
                        <p className="text-slate-400 uppercase text-[10px] font-bold tracking-widest mb-1 text-center">
                            Expertise
                        </p>
                        <p className="font-bold text-sm text-white">{project.category}</p>
                    </div>
                    <div>
                        <p className="text-slate-400 uppercase text-[10px] font-bold tracking-widest mb-1 text-center">
                            Timeline
                        </p>
                        <p className="font-bold text-sm text-white">{project.year}</p>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
                <span className="text-xs text-slate-400 uppercase tracking-widest">
                    Scroll down
                </span>
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-brand-primary rounded-full mt-2 animate-bounce" />
                </div>
            </div>
        </section>
    )
}