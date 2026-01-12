'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { PortfolioItem } from './types'

interface SelectedWorkCardProps {
    item: PortfolioItem
}

export default function SelectedWorkCard({ item }: SelectedWorkCardProps) {
    return (
        <Link href={item.href} className="group cursor-pointer">
            <div className="aspect-[4/5] overflow-hidden mb-6 bg-brand-gray relative">
                <Image
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    priority={item.id === 'neon-finserv'} // Prioritize LCP image
                />
            </div>
            <h3 className="text-3xl font-display font-bold mb-2 text-white">{item.title}</h3>
        </Link>
    )
}
