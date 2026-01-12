'use client'

import { Zap, Box, Share2, Layers } from 'lucide-react'
import ExpertiseCard from './ExpertiseCard.client'
import type { ExpertiseItem } from './types'

interface ExpertiseGridProps {
    items: ExpertiseItem[]
}

const iconMap = {
    branding: Zap,
    'package-design': Box,
    'social-media': Share2,
    'flex-banner': Layers
}

export default function ExpertiseGrid({ items }: ExpertiseGridProps) {
    return (
        <div className="flex flex-col gap-8">
            {items.map((item) => {
                const Icon = iconMap[item.id as keyof typeof iconMap] || Zap
                return (
                    <ExpertiseCard
                        key={item.id}
                        title={item.title}
                        description={item.description}
                        href={item.href}
                        icon={<Icon className="text-brand-primary w-8 h-8" />}
                    />
                )
            })}
        </div>
    )
}
