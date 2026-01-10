'use client'

import { motion } from 'framer-motion'
import { useProjectsFilter } from './hooks/useProjectsFilter'
import type { PortfolioFiltersProps } from './types'

export default function PortfolioFilters({ categories }: PortfolioFiltersProps) {
    const { filter, setFilter } = useProjectsFilter()

    return (
        <section className="px-6 lg:px-12 max-w-[1920px] mx-auto mb-12">
            <div className="border-b border-white/10 pb-8">
                <nav
                    aria-label="Portfolio categories filter"
                    className="flex flex-wrap gap-4 md:gap-8 overflow-x-auto no-scrollbar"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`relative text-sm font-bold uppercase tracking-[0.2em] transition-all whitespace-nowrap ${filter === cat ? 'text-brand-primary' : 'text-slate-500 hover:text-white'
                                }`}
                            aria-label={`Filter by ${cat} category`}
                            aria-pressed={filter === cat}
                        >
                            {cat}
                            {filter === cat && (
                                <motion.div
                                    layoutId="filterUnderline"
                                    className="absolute -bottom-8 left-0 w-full h-1 bg-brand-primary"
                                    aria-hidden="true"
                                />
                            )}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Active Filter Display */}
            <div className="mt-8 flex items-center justify-between">
                <p className="text-slate-400 text-sm">
                    <span className="font-medium text-white">
                        {filter === 'All' ? 'All projects' : `${filter} projects`}
                    </span>
                    {' '}filtered by category
                </p>

                <button
                    onClick={() => setFilter('All')}
                    className="text-slate-400 hover:text-white text-sm font-medium uppercase tracking-widest transition-colors"
                    aria-label="Clear all filters"
                >
                    Clear Filters
                </button>
            </div>
        </section>
    )
}
