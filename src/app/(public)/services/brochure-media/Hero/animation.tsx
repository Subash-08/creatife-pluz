'use client';

import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

export function useHeroScale() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98]);
    return { containerRef, scale };
}
