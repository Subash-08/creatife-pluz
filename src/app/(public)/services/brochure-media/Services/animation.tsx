'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedServiceCard = ({ children, index }: { children: React.ReactNode, index: number }) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="p-10 bg-brand-dark border border-white/5 rounded-2xl group relative overflow-hidden cursor-pointer"
            key={index}
        >
            {children}
        </motion.div>
    );
};
