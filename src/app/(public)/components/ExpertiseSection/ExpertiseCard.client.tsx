'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface ExpertiseCardProps {
    title: string;
    description: string;
    href: string;
    icon: React.ReactNode;
}

export default function ExpertiseCard({ title, description, href, icon }: ExpertiseCardProps) {
    return (
        <Link href={href}>
            <motion.div
                whileHover={{ y: -5 }}
                className="bg-[#0B0B0B] border border-white/10 p-10 rounded-2xl relative overflow-hidden group cursor-pointer"
                aria-label={`Navigate to ${title} services`}
            >
                <div className="w-16 h-16 rounded-full border border-brand-primary/30 flex items-center justify-center mb-6 bg-brand-primary/5">
                    {icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 uppercase">{title}</h3>
                <p className="text-slate-400 leading-relaxed">{description}</p>
            </motion.div>
        </Link>
    )
}
