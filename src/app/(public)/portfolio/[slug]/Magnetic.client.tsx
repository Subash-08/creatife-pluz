'use client'

import { ReactNode, useRef } from 'react'
import { useMagneticEffect } from './hooks/useMagneticEffect'

interface MagneticProps {
    children: ReactNode
    strength?: number
    className?: string
}

export default function Magnetic({
    children,
    strength = 0.2,
    className = ''
}: MagneticProps) {
    const magneticRef = useRef<HTMLDivElement>(null)
    useMagneticEffect(magneticRef, strength)

    return (
        <div
            ref={magneticRef}
            className={`relative inline-block ${className}`}
            style={{
                willChange: 'transform',
                transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
        >
            {children}
        </div>
    )
}
