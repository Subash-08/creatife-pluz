'use client'

import { useRef } from 'react'
import { GalleryItem } from './types'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

interface CaseStudyGalleryProps {
    gallery: GalleryItem[]
}

export default function CaseStudyGallery({ gallery }: CaseStudyGalleryProps) {
    const galleryRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (!gallery || gallery.length === 0) return

        const cards = gsap.utils.toArray<HTMLElement>('.gallery-card')

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: galleryRef.current,
                start: 'top top',
                end: `+=${gallery.length * 100}%`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true, // Key for handling layout changes
            }
        })

        cards.forEach((card: HTMLElement, i: number) => {
            if (i === cards.length - 1) return

            timeline.to(card, {
                yPercent: -120,
                rotateX: 10,
                scale: 0.9,
                opacity: 0,
                filter: "blur(10px)",
                skewX: 2,
                ease: "power2.inOut",
            })
        })

        // Force a recalculation of start/end points after setup
        ScrollTrigger.refresh()

    }, { scope: galleryRef, dependencies: [gallery] })

    if (!gallery || gallery.length === 0) {
        return null
    }

    return (
        <section
            ref={galleryRef}
            className="relative h-screen bg-brand-dark overflow-hidden z-20" // z-20 ensures it sits above hero background if needed
            aria-label="Project gallery"
        >
            <div
                ref={containerRef}
                className="absolute inset-0 flex items-center justify-center p-6 md:p-20"
                style={{ perspective: "2000px" }}
            >
                {gallery.map((item, i) => (
                    <div
                        key={item.url || i}
                        className="gallery-card absolute w-full max-w-5xl h-[70vh] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl origin-bottom bg-black/20"
                        style={{ zIndex: gallery.length - i }}
                        aria-label={`Gallery item ${i + 1}: ${item.label || ''}`}
                    >
                        {/* Image Code same as before */}
                        <img
                            src={item.url}
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                            alt={item.alt || item.label || `Gallery image ${i + 1}`}
                            loading="lazy"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-12 left-12">
                            <div className="flex items-center gap-4 mb-2">
                                <span className="text-brand-primary font-black text-xs uppercase tracking-widest">
                                    Exhibit {String(i + 1).padStart(2, '0')}
                                </span>
                                <div className="h-[1px] w-12 bg-white/20" aria-hidden="true" />
                            </div>
                            <h3 className="text-4xl md:text-6xl font-display font-bold text-white uppercase italic">
                                {item.label || `Design ${i + 1}`}
                            </h3>
                        </div>

                        <div className="absolute top-12 right-12">
                            <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-md bg-black/30">
                                <span className="text-xl font-display font-black text-brand-primary">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
                <span className="text-[30vw] font-display font-black text-white/[0.02] uppercase italic select-none">
                    VISION
                </span>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4 opacity-40">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white">
                    Scroll to unfold
                </span>
                <div className="w-[1px] h-10 bg-gradient-to-b from-brand-primary to-transparent" aria-hidden="true" />
            </div>
        </section>
    )
}