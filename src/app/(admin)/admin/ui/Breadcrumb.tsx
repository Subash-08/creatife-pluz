'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
    label: string
    href: string
}

interface BreadcrumbProps {
    items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav className="flex items-center text-sm text-gray-600" aria-label="Breadcrumb">
            {items.map((item, index) => (
                <div key={item.href} className="flex items-center">
                    {index > 0 && (
                        <ChevronRight size={16} className="mx-2 text-gray-400" />
                    )}
                    {index === items.length - 1 ? (
                        <span className="font-medium text-gray-900">{item.label}</span>
                    ) : (
                        <Link
                            href={item.href}
                            className="hover:text-blue-600 transition-colors"
                        >
                            {item.label}
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    )
}