// Minimal here because main motion is inside InteractiveBox component
// But we can export basic fade or slide animations if needed

export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
};

export const fadeOut = {
    initial: { opacity: 1 },
    animate: { opacity: 0 },
};
