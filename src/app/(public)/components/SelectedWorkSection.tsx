'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export default function SelectedWorkSection() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Parallax effect for selected works
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100])

    return (
        <section ref={containerRef} className="pt-8 pb-32 px-6 md:px-12 bg-[#0A0A0A] overflow-hidden">
            <div className="max-w-[1920px] mx-auto mb-10 flex justify-between items-end">
                <h2 className="text-[10vw] md:text-[6vw] font-display font-black uppercase leading-none text-white/10">
                    Selected<br />Works
                </h2>
                <Link href="/portfolio" className="hidden md:flex items-center gap-2 text-brand-primary uppercase font-bold tracking-widest hover:text-white transition-colors">
                    View All Projects <ArrowRight />
                </Link>
            </div>

            <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32">
                <motion.div style={{ y: y1 }} className="flex flex-col gap-20">
                    <div className="group cursor-pointer">
                        <div className="aspect-[4/5] overflow-hidden mb-6 bg-brand-gray relative">
                            <Image
                                src="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop"
                                alt="Neon Finserv Project"
                                fill
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                        <h3 className="text-3xl font-display font-bold mb-2 text-white">Neon Finserv</h3>
                    </div>
                </motion.div>
                <motion.div style={{ y: y2 }} className="flex flex-col gap-20 lg:pt-32">
                    <div className="group cursor-pointer">
                        <div className="aspect-[4/5] overflow-hidden mb-6 bg-brand-gray relative">
                            <Image
                                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1000&auto=format&fit=crop"
                                alt="Aura Estate Project"
                                fill
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                        <h3 className="text-3xl font-display font-bold mb-2 text-white">Aura Estate</h3>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
