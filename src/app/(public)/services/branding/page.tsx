import HeroSection from './HeroSection';
import HorizontalScrollSection from './HorizontalScrollSection';
import ServicesSection from './ServicesSection';
import CTASection from './CTASection';
import './Branding.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Logo & Branding Design - Creative Pluz',
    description: 'Build a brand that speaks for you. Custom logo design, brand guidelines, and high-impact product packaging solutions.',
    openGraph: {
        title: 'Logo & Branding Design - Creative Pluz',
        description: 'Build a brand that speaks for you. Custom logo design, brand guidelines, and high-impact product packaging solutions.',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Logo & Branding Design - Creative Pluz',
        description: 'Build a brand that speaks for you. Custom logo design, brand guidelines, and high-impact product packaging solutions.',
    }
}

const Branding: React.FC = () => {
    return (
        <>
            <HeroSection />
            {/* <HorizontalScrollSection />
            <ServicesSection />
            <CTASection /> */}
        </>
    );
};

export default Branding;
