import { Globe, Zap } from 'lucide-react'
import type { IntroductionSectionProps } from './types'

const defaultProps: IntroductionSectionProps = {
    title: "Beyond Digital.",
    subtitle: "Physical & Visual Impact.",
    description: "High-performance brands aren't just seen online; they are felt in the real world. We provide full-spectrum creative services that bridge that gap.",
    features: [
        {
            title: "Brand Identity",
            description: "Forging legacies through strategy and design."
        },
        {
            title: "Market Domination",
            description: "Results-focused visual communication."
        }
    ]
}

export default function IntroductionSection(props: Partial<IntroductionSectionProps> = {}) {
    const { title, subtitle, description, features } = { ...defaultProps, ...props }

    return (
        <section
            className="py-20 px-6 md:px-12 bg-brand-dark border-b border-white/10"
            aria-labelledby="introduction-heading"
        >
            <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div>
                    <h2
                        id="introduction-heading"
                        className="text-4xl md:text-6xl font-display font-bold leading-tight text-white"
                    >
                        {title}<br />
                        <span className="text-brand-primary">{subtitle}</span>
                    </h2>
                </div>
                <div className="space-y-12">
                    <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                        {description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {features.map((item, index) => (
                            <div key={index} className="border-l border-brand-primary pl-6">
                                <div className="text-brand-primary mb-4">
                                    {index === 0 ? <Globe aria-hidden="true" /> : <Zap aria-hidden="true" />}
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                                <p className="text-slate-500">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
