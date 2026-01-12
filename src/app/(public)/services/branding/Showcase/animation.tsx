'use client';

import { useScroll, useTransform, useVelocity, useSpring } from 'framer-motion';
import { useRef } from 'react';

export const useShowcaseAnimation = () => {
    const horizontalRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: horizontalRef,
        offset: ['start start', 'end end'],
    });

    const scrollVelocity = useVelocity(scrollYProgress);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
    const skewX = useTransform(smoothVelocity, [-0.5, 0.5], ['-5deg', '5deg']);
    const x = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);

    return { horizontalRef, x, skewX };
};
