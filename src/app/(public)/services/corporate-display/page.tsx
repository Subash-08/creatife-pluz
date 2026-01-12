'use client';

import React from 'react';
import SEO from '@/components/SEO';
import Hero from './Hero';
import Services from './Services';
import Showcase from './Showcase';
import Execution from './EXECUTION';
import CallToAction from './CallToAction';

const CorporateDisplayPage: React.FC = () => {
    return (
        <>
            <SEO
                title="Corporate Display & Outdoor Design - Creative Pluz"
                description="High-impact flex banners, outdoor creatives, and corporate visual solutions. Signage, exhibition booths, and workspace branding."
            />
            <main>
                <Hero />
                <Services />
                <Showcase />
                <Execution />
                <CallToAction />
            </main>
        </>
    );
};

export default CorporateDisplayPage;