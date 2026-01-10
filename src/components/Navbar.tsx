'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
    const pathname = usePathname()
    const [servicesOpen, setServicesOpen] = useState(false)

    const isActive = (path: string) => {
        if (path === '/') return pathname === '/'
        return pathname.startsWith(path)
    }

    const services = [
        { name: 'Branding', href: '/services/branding' },
        { name: 'Brochure Media', href: '/services/brochure-media' },
        { name: 'Photography', href: '/services/photography' },
        { name: 'Corporate Display', href: '/services/corporate-display' },
        { name: 'Social Media', href: '/services/social-media' },
        { name: 'Flex Banner', href: '/services/flex-banner' },
        { name: 'Package Design', href: '/services/package-design' },
    ]

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link href="/" className="navbar-logo">
                    Creative Pluz
                </Link>

                <ul className="navbar-menu">
                    <li>
                        <Link href="/" className={isActive('/') && pathname === '/' ? 'active' : ''}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className={isActive('/about') ? 'active' : ''}>
                            About
                        </Link>
                    </li>
                    <li
                        className="services-dropdown"
                        onMouseEnter={() => setServicesOpen(true)}
                        onMouseLeave={() => setServicesOpen(false)}
                    >
                        <Link href="/services" className={isActive('/services') ? 'active' : ''}>
                            Services
                        </Link>
                        {servicesOpen && (
                            <ul className="dropdown-menu">
                                {services.map((service) => (
                                    <li key={service.href}>
                                        <Link href={service.href}>
                                            {service.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                    <li>
                        <Link href="/portfolio" className={isActive('/portfolio') ? 'active' : ''}>
                            Portfolio
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" className={isActive('/contact') ? 'active' : ''}>
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
