import Link from 'next/link'
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    to?: string
    href?: string
    children: React.ReactNode
    className?: string
}

export default function Button({ to, href, children, className = '', ...props }: ButtonProps) {
    const linkHref = href || to || '';

    if (!linkHref) {
        return (
            <button className={`inline-block transition-all ${className}`} {...props}>
                {children}
            </button>
        )
    }

    return (
        <Link href={linkHref}>
            <button className={`inline-block transition-all ${className}`} {...props}>
                {children}
            </button>
        </Link>
    )
}
