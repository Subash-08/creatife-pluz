'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface InteractiveBoxProps {
    children: ReactNode;
    className?: string;
}

const InteractiveBox = ({ children, className = '' }: InteractiveBoxProps) => {
    return (
        <motion.div
            whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            className={`bg-white border border-slate-200 rounded-2xl overflow-hidden ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default InteractiveBox;
