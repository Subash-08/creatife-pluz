
import React from 'react';
import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
    title: 'About Creative Pluz',
    description: 'We are a team of strategists, designers, and developers committed to building world-class digital experiences.'
};

export default function AboutPage() {
    return <AboutClient />;
}
