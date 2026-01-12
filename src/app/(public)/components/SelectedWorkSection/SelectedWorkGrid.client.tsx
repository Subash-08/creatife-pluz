'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import SelectedWorkCard from './SelectedWorkCard.client'
import { useParallax } from './hooks/useParallax'
import type { PortfolioItem } from './types'

interface SelectedWorkGridProps {
    items: PortfolioItem[]
}

export default function SelectedWorkGrid({ items }: SelectedWorkGridProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { y1, y2 } = useParallax(containerRef)

    return (
        <div ref={containerRef} className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32">
            <motion.div style={{ y: y1 }} className="flex flex-col gap-20">
                {items.slice(0, 1).map((item) => (
                    <SelectedWorkCard key={item.id} item={item} />
                ))}
            </motion.div>
            <motion.div style={{ y: y2 }} className="flex flex-col gap-20 lg:pt-32">
                {items.slice(1).map((item) => (
                    <SelectedWorkCard key={item.id} item={item} />
                ))}
            </motion.div>
        </div>
    )
}
