// app/(public)/components/HeroSection/AnimatedWrapper.tsx - REUSABLE
'use client'

import { motion } from 'framer-motion'

export function AnimatedWrapper({
    children,
    delay = 0
}: {
    children: React.ReactNode
    delay?: number
}) {
    return (
        <motion.div
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            transition={{
                duration: 1,
                ease: [0.6, 0.01, 0.05, 0.95],
                delay
            }}
        >
            {children}
        </motion.div>
    )
}