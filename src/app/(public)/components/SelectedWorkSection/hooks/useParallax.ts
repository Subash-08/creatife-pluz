'use client'

import { useScroll, useTransform } from 'framer-motion'
import { RefObject } from 'react'

export function useParallax(ref: RefObject<HTMLElement>) {
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"]
    })

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100])

    return { y1, y2 }
}
