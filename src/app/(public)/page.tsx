import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
    title: "Creative Pluz - New-Age Digital Agency",
    description: "We craft digital futures. Specializing in Branding, Design, Photography, and Signage to help brands dominate their market.",
};

export default function HomePage() {
    return <HomeClient />;
}