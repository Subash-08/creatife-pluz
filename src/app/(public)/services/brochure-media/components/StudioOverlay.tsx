"use client";
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const StudioOverlay: React.FC = () => {
  const { scrollY } = useScroll();

  // Fade out the overlay as the background flattens out
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const y = useTransform(scrollY, [0, 400], [0, -50]);
  // Disable pointer events once scrolled past 300px so we can click links below
  const pointerEvents = useTransform(scrollY, (val) => val > 300 ? 'none' : 'auto');

  return (
    <motion.div
      style={{ opacity, y, pointerEvents }}
      className="relative z-20 w-full h-full flex flex-col justify-center p-6 sm:p-12 pointer-events-none"
    >
      {/* Header Container 
        Added 'pointer-events-auto' so the button is clickable.
        Changed flex direction to column on mobile, row on tablet/desktop.
      */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full flex flex-col justify-between items-start gap-12 pointer-events-auto"
      >

        {/* LEFT SIDE: Main Title */}
        <div className="flex flex-col">
          <h1 className="font-display text-6xl sm:text-8xl mt-8 md:text-[9rem] lg:text-[11rem] leading-[0.85] tracking-tighter text-white uppercase drop-shadow-2xl">
            Print &<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-yellow-400">
              Digital
            </span>
          </h1>
        </div>

        {/* RIGHT SIDE: Description & Button */}
        <div className="flex flex-col gap-8 max-w-md mt-4 lg:mt-8">
          <p className="text-lg sm:text-xl text-gray-300 font-light leading-relaxed">
            Your brand identity is more than just a logo — it’s the face of your business.
            We build brands that leave a legacy through unique, scalable designs.
          </p>

          <button className="group relative w-fit px-8 py-3 border border-white/30 overflow-hidden rounded-full transition-all hover:border-white">
            <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            <span className="relative font-medium tracking-wide uppercase text-sm text-white group-hover:text-black transition-colors duration-300">
              Start Your Legacy
            </span>
          </button>
        </div>

      </motion.header>
    </motion.div>
  );
};