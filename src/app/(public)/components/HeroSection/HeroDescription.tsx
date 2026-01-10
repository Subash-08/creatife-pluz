// app/(public)/components/HeroSection/HeroDescription.tsx - SERVER
import Link from 'next/link'
import { ArrowDownRight } from 'lucide-react'

export function HeroDescription() {
    return (
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
    )
}