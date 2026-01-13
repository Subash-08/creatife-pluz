"use client";
import React from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { MarqueeTrack } from './MarqueeTrack';
import { STUDIO_IMAGES, shuffle } from '../../data/images';

export const MarqueeBackground: React.FC = () => {
  // Pre-shuffle images for variety in each row
  const row1 = STUDIO_IMAGES;
  const row2 = shuffle(STUDIO_IMAGES);
  const row3 = shuffle(STUDIO_IMAGES);
  const row4 = shuffle(STUDIO_IMAGES);
  const row5 = shuffle(STUDIO_IMAGES);

  // Scroll Animation Logic
  const { scrollY } = useScroll();

  // Define the scroll distance over which the animation completes
  const scrollRange = [0, 800];

  // Map scroll position to the transform values
  const x = useTransform(scrollY, scrollRange, [200, 0]);
  const y = useTransform(scrollY, scrollRange, [-183, 0]);
  const rotateZ = useTransform(scrollY, scrollRange, [30, 0]);
  const rotateX = useTransform(scrollY, scrollRange, [30, 0]);
  const rotateY = useTransform(scrollY, scrollRange, [-25, 0]);

  // Opacity Transition: Starts at 0.4, becomes 1 (fully visible) as you scroll
  const opacity = useTransform(scrollY, scrollRange, [0.4, 1]);

  // Construct the transform string dynamically
  const transform = useMotionTemplate`perspective(1200px) translateX(${x}px) translateY(${y}px) rotate(${rotateZ}deg) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  return (
    <div className="absolute inset-0 z-0 bg-black overflow-hidden">
      {/* 
         Wrapper for vertical positioning. 
         top-1/2 and -translate-y-1/2 centers it, but we can adjust to push it "down" slightly as requested.
         Using top-[50%] centers the starting point of the 3D block.
      */}
      <div className="absolute top-[50%] left-0 w-full -translate-y-[50%] flex items-center justify-center">
        <motion.div
          style={{
            transform,
            opacity,
            transformOrigin: '50% 50%', // Pivoting from center feels more grounded for this layout
            willChange: 'transform, opacity'
          }}
          className="relative w-[150%] flex flex-col gap-6"
        >
          {/* Increased speed values (slower animation) */}
          <MarqueeTrack images={row1} speed={120} direction="left" />
          <MarqueeTrack images={row2} speed={100} direction="right" />
          <MarqueeTrack images={row3} speed={130} direction="left" />
          <MarqueeTrack images={row4} speed={110} direction="right" />
          <MarqueeTrack images={row5} speed={140} direction="left" />
        </motion.div>
      </div>
    </div>
  );
};