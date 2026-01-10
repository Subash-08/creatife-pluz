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
    title: 'Creative Pluz - Digital Experience Agency',
    description: 'We craft digital experiences that defy convention. Strategy, Design, and Development for the bold.',
}

export default function Home() {
    return (
        <>
            <HeroSection />
            <MarqueeSection />
            <IntroductionSection />
            <ExpertiseSection />
            <SelectedWorkSection />
            <CTASection />
        </>
    )
}