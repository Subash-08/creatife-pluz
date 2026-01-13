"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface MarqueeTrackProps {
  images: string[];
  direction?: 'left' | 'right';
  speed?: number; // Duration in seconds for one full loop
}

export const MarqueeTrack: React.FC<MarqueeTrackProps> = ({
  images,
  direction = 'left',
  speed = 100 // Increased default duration to slow it down
}) => {
  // We duplicate the images enough times to ensure seamless looping on large screens.
  const duplicatedImages = [...images, ...images, ...images, ...images];

  return (
    <div className="flex w-full overflow-hidden select-none pointer-events-none">
      <motion.div
        className="flex gap-4 sm:gap-6 flex-nowrap min-w-max"
        initial={{ x: direction === 'left' ? '0%' : '-50%' }}
        animate={{ x: direction === 'left' ? '-50%' : '0%' }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {duplicatedImages.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="relative w-48 h-32 sm:w-72 sm:h-48 md:w-96 md:h-64 rounded-lg overflow-hidden shrink-0"
          >
            <img
              src={src}
              alt={`Studio shot ${index}`}
              className="w-full h-full object-cover transition-all duration-500"
              loading="lazy"
            />
            {/* Subtle dark overlay on individual images for depth */}
            <div className="absolute inset-0"></div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};