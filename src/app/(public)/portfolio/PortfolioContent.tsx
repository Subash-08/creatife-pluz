import Link from 'next/link'

export default function PortfolioContent() {
    return (
        <>
            {/* Hero Section - All semantic HTML */}
            <section className="pt-32 pb-20 px-6 lg:px-12 max-w-[1920px] mx-auto">
                <header className="mb-20">
                    <h1 className="text-7xl md:text-[12vw] font-display font-black text-white leading-[0.8] uppercase tracking-tighter mb-12 italic">
                        Our <br /> <span className="text-brand-primary">Work.</span>
                    </h1>

                    <div className="max-w-4xl">
                        <p className="text-xl text-slate-300 leading-relaxed mb-8">
                            Our work speaks for itself. Explore our collection of premium branding,
                            social media, and print designs that have transformed businesses worldwide.
                        </p>

                        <nav aria-label="Portfolio navigation" className="flex items-center gap-6">
                            <Link
                                href="/services"
                                className="text-slate-400 hover:text-white transition-colors text-sm font-medium uppercase tracking-widest"
                                aria-label="View our services"
                            >
                                View Services
                            </Link>
                            <span className="text-slate-600">•</span>
                            <Link
                                href="/contact"
                                className="text-slate-400 hover:text-white transition-colors text-sm font-medium uppercase tracking-widest"
                                aria-label="Start a project with us"
                            >
                                Start a Project
                            </Link>
                        </nav>
                    </div>
                </header>

                {/* Introduction Section */}
                <article className="mb-20">
                    <h2 className="text-3xl font-display font-bold text-white mb-6">
                        Crafting Digital Excellence
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <p className="text-lg text-slate-300 leading-relaxed mb-6">
                                Each project represents our commitment to innovation, quality, and
                                measurable results. We don't just create designs; we build experiences
                                that resonate with audiences and drive business growth.
                            </p>
                        </div>
                        <div>
                            <p className="text-lg text-slate-300 leading-relaxed">
                                From initial concept to final delivery, our process is meticulous
                                and client-focused. We ensure every pixel serves a purpose and every
                                interaction creates value.
                            </p>
                        </div>
                    </div>
                </article>
            </section>

            {/* Stats Section */}
            <section className="px-6 lg:px-12 max-w-[1920px] mx-auto mb-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <h3 className="text-4xl font-bold text-brand-primary mb-2">150+</h3>
                        <p className="text-sm text-slate-400 uppercase tracking-widest">Projects</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-4xl font-bold text-brand-primary mb-2">98%</h3>
                        <p className="text-sm text-slate-400 uppercase tracking-widest">Client Satisfaction</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-4xl font-bold text-brand-primary mb-2">50+</h3>
                        <p className="text-sm text-slate-400 uppercase tracking-widest">Industries</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-4xl font-bold text-brand-primary mb-2">12</h3>
                        <p className="text-sm text-slate-400 uppercase tracking-widest">Awards</p>
                    </div>
                </div>
            </section>
        </>
    )
}
