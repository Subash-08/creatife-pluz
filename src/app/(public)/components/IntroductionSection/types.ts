export interface ServiceFeature {
    title: string;
    description: string;
}

export interface IntroductionSectionProps {
    title: string;
    subtitle: string;
    description: string;
    features: ServiceFeature[];
}
