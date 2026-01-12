import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { SelectedWorkSectionProps } from './types'
import SelectedWorkGrid from './SelectedWorkGrid.client'

const defaultProps: SelectedWorkSectionProps = {
    title: "Selected Works",
    ctaText: "View All Projects",
    ctaHref: "/portfolio",
    items: [
        {
            id: 'neon-finserv',
            title: 'Neon Finserv',
            imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop',
            imageAlt: 'Neon Finserv Project - Financial services branding and design',
            href: '/portfolio/neon-finserv'
        },
        {
            id: 'aura-estate',
            title: 'Aura Estate',
            imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1000&auto=format&fit=crop',
            imageAlt: 'Aura Estate Project - Real estate branding and marketing',
            href: '/portfolio/aura-estate'
        }
    ]
}

export default function SelectedWorkSection(props: Partial<SelectedWorkSectionProps> = {}) {
    const { title, ctaText, ctaHref, items } = { ...defaultProps, ...props }

    return (
        <section
            className="pt-8 pb-32 px-6 md:px-12 bg-[#0A0A0A] overflow-hidden"
            aria-labelledby="selected-works-heading"
        >
            <div className="max-w-[1920px] mx-auto mb-10 flex justify-between items-end">
                <h2
                    id="selected-works-heading"
                    className="text-[10vw] md:text-[6vw] font-display font-black uppercase leading-none text-white/10"
                >
                    Selected<br />Works
                </h2>
                <Link
                    href={ctaHref}
                    className="hidden md:flex items-center gap-2 text-brand-primary uppercase font-bold tracking-widest hover:text-white transition-colors"
                    aria-label={`${ctaText} - navigate to portfolio`}
                >
                    {ctaText} <ArrowRight aria-hidden="true" />
                </Link>
            </div>

            <SelectedWorkGrid items={items} />
        </section>
    )
}
