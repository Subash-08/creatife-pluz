'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

export function useGSAPGallery(
    galleryRef: React.RefObject<HTMLElement>,
    cardCount: number
) {
    useEffect(() => {
        if (!galleryRef.current || cardCount === 0) return

        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray<HTMLElement>('.gallery-card')
            if (!cards.length) return

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: galleryRef.current,
                    start: "top top",
                    end: `+=${cards.length * 100}%`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    markers: false, // Set to true for debugging
                }
            })

            cards.forEach((card: HTMLElement, index: number) => {
                if (index === cards.length - 1) return

                tl.to(card, {
                    yPercent: -120,
                    rotateX: 45,
                    scale: 0.8,
                    opacity: 0,
                    filter: "blur(20px)",
                    ease: "power2.inOut",
                }, index)

                if (cards[index + 1]) {
                    tl.fromTo(
                        cards[index + 1],
                        { scale: 0.9, opacity: 0.5 },
                        { scale: 1, opacity: 1, ease: "power2.inOut" },
                        index
                    )
                }
            })
        }, galleryRef)

        return () => ctx.revert()
    }, [galleryRef, cardCount])
}
