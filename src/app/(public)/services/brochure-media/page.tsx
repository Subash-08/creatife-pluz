'use client';
import React from 'react';
import { BookOpen, Share2, Printer, Sparkles, Layers, ArrowUpRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '@/components/Button';
import Hero from './Hero';
import Services from './Services';
import DigitalServices from './DigitalServices';
import Showcase from './Showcase';
import CallToAction from './CallToAction';
import { MarqueeBackground } from './components/Marquee/MarqueeBackground';
import { StudioOverlay } from './components/StudioOverlay';

const BrochureMedia: React.FC = () => {
    return (
        <main className="relative w-full bg-black">

            {/* SECTION 1: The Marquee Scroll Interaction */}
            <div className="relative h-[300vh] w-full">
                {/* Changed from 'fixed' to 'sticky'.
                   This pins the Marquee for the duration of the 300vh container, 
                   but lets it scroll UP naturally when that container ends.
                */}
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    <MarqueeBackground />
                    <StudioOverlay />
                </div>
            </div>

            {/* SECTION 2: The Content Below */}
            {/* Added a wrapper with 'relative z-10 bg-black'.
               - z-10: Ensures this sits physically ON TOP of the previous section.
               - bg-black: Ensures these components have a solid background so 
                 nothing shows through from behind.
            */}
            <div className="relative z-10 bg-black flex flex-col">
                <Services />
                <DigitalServices />
                <Showcase />
                <CallToAction />
            </div>

        </main>
    );
};

export default BrochureMedia;