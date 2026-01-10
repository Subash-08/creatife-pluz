'use client';

import { motion } from 'framer-motion';

const RotatingOrb = () => {
    return (
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-full h-full border border-white rounded-3xl flex items-center justify-center"
        >
            <div className="w-3/4 h-3/4 bg-brand-primary/5 rounded-full blur-[100px]" />
        </motion.div>
    );
};

export default RotatingOrb;
