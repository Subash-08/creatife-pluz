export const heroMotion = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
};

export const rotateMotion = {
    animate: { rotate: 360 },
    transition: {
        duration: 20,
        repeat: Infinity,
        ease: 'linear' as const,
    },
};
