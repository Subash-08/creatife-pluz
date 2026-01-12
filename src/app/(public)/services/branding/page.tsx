import { Metadata } from 'next';
import Hero from './Hero';
import Services from './Services';
import Interactive from './Interactive';
import Showcase from './Showcase';
import FeaturesWhyUs from './FeaturesWhyUs';
import CallToAction from './CallToAction';

export const metadata: Metadata = {
    title: "Creative Pluz - New-Age Digital Agency",
    description: "We craft digital futures. Specializing in Branding, Design, Photography, and Signage to help brands dominate their market.",
};

export default function HomePage() {
    return (
        <>
            <Hero />
            <Services />
            <Interactive />
            <Showcase />
            <FeaturesWhyUs />
            <CallToAction />
        </>
    );
}