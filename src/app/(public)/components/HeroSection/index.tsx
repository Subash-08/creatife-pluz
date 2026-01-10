// app/(public)/components/HeroSection/index.tsx - OPTIMIZED VERSION
import { ArrowDownRight } from 'lucide-react'
import Link from 'next/link'
import { AnimatedWrapper } from './AnimatedWrapper'
import { IconWrapper } from './IconWrapper'

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 bg-brand-dark overflow-hidden">
            <div className="max-w-[1920px] w-full mx-auto z-10">
                {/* All HTML content is in Server Component */}
                <div className="flex flex-col gap-0">
                    {/* Row 1 - Animated */}
                    <div className="overflow-hidden">
                        <AnimatedWrapper>
                            <h1 className="text-[14vw] leading-[0.8] font-display font-black text-white uppercase tracking-tighter">
                                We Craft
                            </h1>
                        </AnimatedWrapper>
                    </div>

                    {/* Row 2 - Partially animated */}
                    <div className="overflow-hidden flex items-center gap-4 md:gap-12">
                        <IconWrapper>
                            <ArrowDownRight className="text-black w-8 h-8 md:w-16 md:h-16" />
                        </IconWrapper>

                        <AnimatedWrapper delay={0.1}>
                            <h1
                                className="text-[10vw] leading-[0.8] font-display font-black text-transparent uppercase tracking-tighter"
                                style={{ WebkitTextStroke: "2px white" }}
                            >
                                Digital
                            </h1>
                        </AnimatedWrapper>
                    </div>

                    {/* Row 3 - Animated */}
                    <div className="overflow-hidden">
                        <AnimatedWrapper delay={0.2}>
                            <h1 className="text-[10vw] leading-[0.8] font-display font-black text-brand-primary uppercase tracking-tighter">
                                Futures
                            </h1>
                        </AnimatedWrapper>
                    </div>
                </div>

                {/* Description - Static */}
                <div className="mt-12 md:mt-20 flex flex-col md:flex-row justify-between items-start md:items-end">
                    <p className="text-slate-400 max-w-md text-lg md:text-xl font-medium leading-relaxed">
                        We are a new-age digital agency. We blend raw creativity with technical precision to build brands that dominate their market.
                    </p>
                    <div className="mt-8 md:mt-0">
                        <Link href="/contact">
                            <div className="group relative overflow-hidden rounded-full bg-white px-8 py-4 md:px-12 md:py-6 transition-all hover:bg-brand-primary">
                                <span className="relative z-10 font-bold uppercase tracking-wider text-black group-hover:text-black transition-colors">
                                    Start Project
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}