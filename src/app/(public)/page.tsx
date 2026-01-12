// app/(public)/page.tsx - MAIN PAGE (Server Component)
import { Metadata } from 'next'
import HeroSection from './components/HeroSection'  // Still 'use client'
import MarqueeSection from './components/MarqueeSection'
import IntroductionSection from './components/IntroductionSection'
import ExpertiseSection from './components/ExpertiseSection'
import SelectedWorkSection from './components/SelectedWorkSection'
import CTASection from './components/CTASection'

// ✅ Add metadata HERE in the Server Component
export const metadata: Metadata = {
    title: 'Creative Agency | Full-Spectrum Branding & Design',
    description: 'High-performance creative agency specializing in branding, design, photography, and physical signage. Bridging digital and physical worlds.',
}

export default function HomePage() {
    return (
        <main>
            <HeroSection />
            <MarqueeSection />
            <IntroductionSection />
            <ExpertiseSection />
            <SelectedWorkSection />
            <CTASection />
        </main>
    )
}