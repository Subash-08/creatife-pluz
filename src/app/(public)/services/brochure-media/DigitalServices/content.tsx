import React from 'react';
import { Share2 } from 'lucide-react';

export const digitalServiceIntro = {
    sectionLabel: "Service 02",
    heading: "Social Media \nPost Design",
    description:
        "We craft engaging social media designs that boost brand presence and interaction across platforms. Trend-driven, brand-aligned, and conversion-focused.",
    features: [
        "Instagram Posts & Stories",
        "Facebook Ads & Banners",
        "WhatsApp Marketing Banners",
        "Conversion Ad Creatives",
    ],
    images: [
        {
            src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop",
            alt: "Social Post 1",
            label: "Scroll Stopping",
            labelBg: "bg-brand-primary",
            labelTextClass: "text-4xl italic font-black uppercase",
        },
        {
            src: "https://images.unsplash.com/photo-1611606063065-ee7946f0787c?q=80&w=800&auto=format&fit=crop",
            alt: "Social Post 2",
            labelBg: "bg-black",
            labelTextClass: "text-xs font-bold uppercase tracking-widest text-white",
            icon: <Share2 className="text-brand-primary" />,
            iconLabel: "Boost Presence",
        },
    ],
};
