import React from 'react';
import { BookOpen, Printer, Layers, Sparkles } from 'lucide-react';

export const serviceIntro = {
    sectionLabel: "Service 01",
    heading: "Brochure & \nPrint Advertising",
    description: "Clear messaging + strong visuals + brand consistency. Designs that tell your story clearly.",
    icons: [<Printer key="printer" size={20} />, <Layers key="layers" size={20} />],
};

export const services = [
    { title: "Company Profiles", desc: "Professional brochures showcasing your corporate identity.", icon: <BookOpen /> },
    { title: "Flyers & Catalogs", desc: "Detailed product leaflets and high-volume sales catalogs.", icon: <Layers /> },
    { title: "Magazine Ads", desc: "Editorial-grade advertisements for high-end publications.", icon: <Sparkles /> },
    { title: "Print-Ready Assets", desc: "High-resolution files optimized for commercial printing.", icon: <Printer /> },
];
