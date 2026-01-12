import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { ExpertiseSectionProps } from './types'
import ExpertiseGrid from './ExpertiseGrid.client'

const defaultProps: ExpertiseSectionProps = {
    title: "Premium Creative Partnership",
    subtitle: "Our Expertise",
    description: "Specialized creative solutions from identity design to large-scale physical displays and trend-driven social media assets.",
    ctaText: "Explore Capabilities",
    ctaHref: "/services",
    items: [
        {
            id: 'branding',
            title: 'Logo & Branding',
            description: 'Identity strategy and scalable design systems.',
            icon: null,
            href: '/services/branding'
        },
        {
            id: 'package-design',
            title: 'Product Package Designing',
            description: 'Structural design and tactile branding for retail excellence.',
            icon: null,
            href: '/services/package-design'
        },
        {
            id: 'social-media',
            title: 'Social Media Post Design',
            description: 'Scroll-stopping visuals for Instagram, WhatsApp, and Ads.',
            icon: null,
            href: '/services/social-media'
        },
        {
            id: 'flex-banner',
            title: 'Flex Banner Designs',
            description: 'Large-scale outdoor hoardings and event visibility.',
            icon: null,
            href: '/services/flex-banner'
        }
    ]
}

export default function ExpertiseSection(props: Partial<ExpertiseSectionProps> = {}) {
    const { title, subtitle, description, ctaText, ctaHref, items } = { ...defaultProps, ...props }

    return (
        <section
            className="py-20 md:py-32 bg-brand-dark relative border-b border-white/10"
            aria-labelledby="expertise-heading"
        >
            <div className="max-w-[1920px] mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
                    {/* Static Content - Server Side */}
                    <div className="lg:w-5/12">
                        <div className="lg:sticky lg:top-32 self-start">
                            <h4 className="text-brand-primary font-bold uppercase tracking-widest text-sm mb-4">
                                {subtitle}
                            </h4>
                            <h2
                                id="expertise-heading"
                                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight"
                            >
                                Premium <br />
                                Creative <br />
                                <span className="text-brand-primary">Partnership</span>
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed max-w-xl mb-8">
                                {description}
                            </p>
                            <Link
                                href={ctaHref}
                                className="inline-flex items-center gap-2 text-white font-bold border-b border-brand-primary pb-1 hover:text-brand-primary transition-colors"
                                aria-label={`${ctaText} - navigate to services page`}
                            >
                                {ctaText} <ArrowRight className="w-5 h-5" aria-hidden="true" />
                            </Link>
                        </div>
                    </div>

                    {/* Interactive Grid - Client Side */}
                    <div className="lg:w-7/12">
                        <ExpertiseGrid items={items} />
                    </div>
                </div>
            </div>
        </section>
    )
}
