import Navbar from '@/components/Navbar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Creative Pluz - Digital Experience Agency',
    description: 'We craft digital experiences that defy convention. Strategy, Design, and Development for the bold.',
    keywords: ['digital agency', 'branding', 'design', 'photography', 'marketing'],
    openGraph: {
        title: 'Creative Pluz - Digital Experience Agency',
        description: 'We craft digital experiences that defy convention.',
        type: 'website',
    },
}

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>
        <Navbar />{children}</>
}
