'use client'

import { RefObject, useEffect } from 'react'
import gsap from 'gsap'

export function useMagneticEffect(
    ref: RefObject<HTMLElement>,
    strength: number = 0.2
) {
    useEffect(() => {
        const element = ref.current
        if (!element) return

        let active = false
        let bounds: DOMRect
        let xSet: gsap.QuickToFunc, ySet: gsap.QuickToFunc

        const handleMouseMove = (e: MouseEvent) => {
            if (!active || !bounds) return

            const mouseX = e.clientX
            const mouseY = e.clientY

            const relX = mouseX - bounds.left
            const relY = mouseY - bounds.top

            const x = (relX - bounds.width / 2) * strength
            const y = (relY - bounds.height / 2) * strength

            if (xSet) xSet(x)
            if (ySet) ySet(y)
        }

        const handleMouseEnter = () => {
            active = true
            bounds = element.getBoundingClientRect()

            if (typeof window !== 'undefined' && gsap) {
                xSet = gsap.quickTo(element, "x", { duration: 0.6, ease: "elastic.out(1, 0.3)" })
                ySet = gsap.quickTo(element, "y", { duration: 0.6, ease: "elastic.out(1, 0.3)" })
            }
        }

        const handleMouseLeave = () => {
            active = false
            if (xSet) xSet(0)
            if (ySet) ySet(0)
        }

        element.addEventListener('mouseenter', handleMouseEnter)
        element.addEventListener('mouseleave', handleMouseLeave)
        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            element.removeEventListener('mouseenter', handleMouseEnter)
            element.removeEventListener('mouseleave', handleMouseLeave)
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [ref, strength])
}
