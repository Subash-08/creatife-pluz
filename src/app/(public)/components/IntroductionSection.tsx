import { Globe, Zap } from 'lucide-react'

export default function IntroductionSection() {
    return (
        <section className="py-20 px-6 md:px-12 bg-brand-dark border-b border-white/10">
            <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div>
                    <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight text-white">
                        Beyond Digital.<br />
                        <span className="text-brand-primary">Physical & Visual Impact.</span>
                    </h2>
                </div>
                <div className="space-y-12">
                    <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                        High-performance brands aren&apos;t just seen online; they are felt in the real world. We provide full-spectrum creative services that bridge that gap.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { icon: <Globe />, title: "Brand Identity", desc: "Forging legacies through strategy and design." },
                            { icon: <Zap />, title: "Market Domination", desc: "Results-focused visual communication." },
                        ].map((item, i) => (
                            <div key={i} className="border-l border-brand-primary pl-6">
                                <div className="text-brand-primary mb-4">{item.icon}</div>
                                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                                <p className="text-slate-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
