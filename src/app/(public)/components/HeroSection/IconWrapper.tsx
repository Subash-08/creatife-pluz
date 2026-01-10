// app/(public)/components/HeroSection/IconWrapper.tsx - CLIENT COMPONENT
'use client'

import { motion } from 'framer-motion'

export function IconWrapper({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            transition={{
                duration: 1,
                ease: [0.6, 0.01, 0.05, 0.95],
                delay: 0.1
            }}
            className="w-16 h-16 md:w-32 md:h-32 bg-brand-primary rounded-full flex items-center justify-center animate-spin-slow"
        >
            {children}
        </motion.div>
    )
}