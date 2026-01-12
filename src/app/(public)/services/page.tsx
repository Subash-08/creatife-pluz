
import React from 'react';
import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
    title: 'Services - Creative Pluz',
    description: 'Our suite of specialized creative services designed to accelerate growth through physical and digital impact.'
};

export default function ServicesPage() {
    return <ServicesClient />;
}