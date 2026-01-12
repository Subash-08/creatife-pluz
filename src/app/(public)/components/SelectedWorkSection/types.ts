export interface PortfolioItem {
    id: string;
    title: string;
    description?: string;
    imageUrl: string;
    imageAlt: string;
    href: string;
}

export interface SelectedWorkSectionProps {
    title: string;
    ctaText: string;
    ctaHref: string;
    items: PortfolioItem[];
}
