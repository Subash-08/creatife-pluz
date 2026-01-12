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

const BrochureMedia: React.FC = () => {
    return (
        <>
            <Hero />
            <Services />
            <DigitalServices />
            <Showcase />
            <CallToAction />

        </>
    );
};

export default BrochureMedia;