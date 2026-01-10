'use client';

import RotatingOrb from '../ui/RotatingOrb.client';

const HeroImage = () => {
    return (
        <div className="relative aspect-square flex items-center justify-center">
            <RotatingOrb />
            <div className="absolute font-display font-black text-[12vw] text-white/5 uppercase select-none">
                Impact
            </div>
        </div>
    );
};

export default HeroImage;
