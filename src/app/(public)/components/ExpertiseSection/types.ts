export interface ExpertiseItem {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    href: string;
}

export interface ExpertiseSectionProps {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    ctaHref: string;
    items: ExpertiseItem[];
}
