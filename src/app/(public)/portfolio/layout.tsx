import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Portfolio - Creative Pluz | Our Work',
    description: 'Explore our collection of premium branding, social media, and print designs. See how we transform businesses with innovative digital solutions.',
    keywords: ['portfolio', 'design', 'branding', 'web development', 'creative agency', 'projects'],
    openGraph: {
        title: 'Our Portfolio | Creative Pluz',
        description: 'Premium branding, social media, and print designs that transform businesses.',
        type: 'website',
        locale: 'en_US',
        siteName: 'Creative Pluz',
        images: [
            {
                url: '/og-portfolio.jpg',
                width: 1200,
                height: 630,
                alt: 'Creative Pluz Portfolio',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Our Portfolio | Creative Pluz',
        description: 'Premium branding, social media, and print designs',
        images: ['/og-portfolio.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}

export default function PortfolioLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
