import { Palette, Box, Type, FileStack, CheckCircle2 } from 'lucide-react';

const ServicesSection = () => {
    return (
        <section className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-brand-primary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">
                        Section 03: Our Process
                    </span>
                    <h2 className="text-5xl font-display font-black text-black mb-8">
                        How We Build <span className="text-brand-primary">Lasting Brands</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <Palette className="w-8 h-8" />,
                            title: "Discovery & Strategy",
                            description: "We dive deep into your business, audience, and competition to build a strategic foundation.",
                            features: ["Brand Audit", "Competitor Analysis", "Target Audience Research"]
                        },
                        {
                            icon: <Type className="w-8 h-8" />,
                            title: "Design & Development",
                            description: "Crafting visual identity systems that are both beautiful and functional.",
                            features: ["Logo Design", "Color Palette", "Typography System"]
                        },
                        {
                            icon: <FileStack className="w-8 h-8" />,
                            title: "Implementation",
                            description: "Delivering complete brand guidelines and assets for consistent application.",
                            features: ["Brand Guidelines", "Asset Library", "Implementation Support"]
                        }
                    ].map((step, index) => (
                        <div key={index} className="p-8 border border-slate-200 rounded-2xl hover:border-brand-primary transition-colors">
                            <div className="text-brand-primary mb-6">{step.icon}</div>
                            <h3 className="text-2xl font-bold text-black mb-4">{step.title}</h3>
                            <p className="text-slate-600 mb-6">{step.description}</p>
                            <ul className="space-y-3">
                                {step.features.map((feature, i) => (
                                    <li key={i} className="flex items-center text-slate-700">
                                        <CheckCircle2 className="w-5 h-5 text-brand-primary mr-3" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ServicesSection;
