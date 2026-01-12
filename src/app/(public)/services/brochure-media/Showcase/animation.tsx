'use client';

export const motionVariants = {
    initial: { opacity: 0, scale: 0.95 },
    whileInView: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" as const },
};
