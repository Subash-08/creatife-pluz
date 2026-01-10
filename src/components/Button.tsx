import Link from 'next/link'
import React from 'react'

interface ButtonProps {
    to: string
    children: React.ReactNode
    className?: string
}

export default function Button({ to, children, className = '' }: ButtonProps) {
    return (
        <Link href={to}>
            <button className={`inline-block transition-all ${className}`}>
                {children}
            </button>
        </Link>
    )
}
