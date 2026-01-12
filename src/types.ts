import { ReactNode } from 'react';

export interface LayoutProps {
    children: ReactNode;
}

export interface SeoProps {
    title: string;
    description: string;
    keywords?: string;
}

export interface Service {
    id: string;
    title: string;
    description: string;
    icon: ReactNode;
    features: string[];
}

export interface PortfolioItem {
    id: string;
    title: string;
    category: string;
    imageUrl: string;
}

export interface PricingPackage {
    title: string;
    price: string;
    description: string;
    features: string[];
    recommended?: boolean;
}