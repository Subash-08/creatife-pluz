import HeroContent from './HeroContent';
import HeroImage from './HeroImage.client';
import './HeroSection.css';

const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex items-center bg-brand-dark overflow-hidden pt-20 hero-section">
            <div className="absolute inset-0 bg-noise opacity-10"></div>
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <HeroContent />
                <HeroImage />
            </div>
        </section>
    );
};

export default HeroSection;
