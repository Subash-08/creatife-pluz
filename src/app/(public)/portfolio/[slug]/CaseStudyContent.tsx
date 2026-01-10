import {
    Target,
    Zap,
    Award,
    CheckCircle2,
    Calendar,
    Users,
    Clock
} from 'lucide-react';
import { ProjectWithDetails } from './types'

interface CaseStudyContentProps {
    project: ProjectWithDetails
}

export default function CaseStudyContent({ project }: CaseStudyContentProps) {
    // Generate highlights from database
    const highlights = project.highlights || [
        { title: 'Strategic Identity Alignment', description: '', icon: 'target' },
        { title: 'High-Fidelity Interaction Design', description: '', icon: 'layers' },
        { title: 'Proprietary Visual Systems', description: '', icon: 'palette' }
    ]

    return (
        <>
            {/* Challenge Section */}
            <section className="py-32 px-6 md:px-12 border-b border-white/10 bg-[#080808]">
                <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
                    <div className="lg:col-span-5">
                        <div className="sticky top-32">
                            <span className="text-brand-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">
                                The Mission
                            </span>
                            <h2 className="text-5xl md:text-7xl font-display font-bold uppercase leading-[0.85] italic">
                                Rethink <br /> Tradition.
                            </h2>
                        </div>
                    </div>

                    <div className="lg:col-span-7 space-y-16">
                        {project.challenge && (
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-widest text-brand-primary mb-6 flex items-center gap-3">
                                    <Target size={16} /> The Challenge
                                </h3>
                                <p className="text-2xl md:text-4xl font-display font-medium text-slate-300 leading-tight">
                                    {project.challenge}
                                </p>
                            </div>
                        )}

                        {project.solution && (
                            <div className="p-12 bg-white/5 border border-white/10 rounded-[3rem]">
                                <h3 className="text-xs font-black uppercase tracking-widest text-brand-primary mb-6 flex items-center gap-3">
                                    <Zap size={16} /> The Innovation
                                </h3>
                                <p className="text-xl text-slate-400 leading-relaxed italic">
                                    {project.solution}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Results Section */}
            {project.results && project.results.length > 0 && (
                <section className="py-32 bg-[#050505]">
                    <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                            <div className="space-y-12">
                                <Award className="text-brand-primary w-16 h-16" aria-hidden="true" />
                                <h2 className="text-5xl md:text-7xl font-display font-bold uppercase text-white italic leading-none">
                                    The <br /> Impact.
                                </h2>
                                <p className="text-xl text-slate-400 leading-relaxed">
                                    Delivering measurable results through strategic design and innovation.
                                </p>

                                <div className="flex flex-wrap gap-8">
                                    {project.results.map((res, i) => (
                                        <div key={i}>
                                            <div className="text-4xl font-display font-black text-brand-primary">
                                                {res.value}
                                            </div>
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                                {res.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                {highlights.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="p-8 border border-white/5 bg-white/[0.02] flex items-center justify-between group hover:bg-brand-primary hover:border-brand-primary transition-all duration-300 cursor-default rounded-2xl"
                                        tabIndex={0}
                                        aria-label={item.title}
                                    >
                                        <span className="text-lg font-bold uppercase italic group-hover:text-black transition-colors">
                                            {item.title}
                                        </span>
                                        <CheckCircle2
                                            className="text-brand-primary group-hover:text-black transition-colors"
                                            aria-hidden="true"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Project Details */}
            <section className="py-20 border-t border-white/10">
                <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Category */}
                        <div className="p-8 border border-white/10 rounded-2xl flex items-center gap-6 hover:border-brand-primary/30 transition-colors group">
                            <div className="w-12 h-12 rounded-lg bg-brand-primary/10 flex items-center justify-center group-hover:bg-brand-primary transition-colors">
                                <div className="text-brand-primary group-hover:text-black font-bold text-sm">
                                    {project.category.charAt(0)}
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
                                    Expertise
                                </p>
                                <p className="text-xl font-bold text-white">{project.category}</p>
                            </div>
                        </div>

                        {/* Year */}
                        <div className="p-8 border border-white/10 rounded-2xl flex items-center gap-6 hover:border-brand-primary/30 transition-colors group">
                            <div className="w-12 h-12 rounded-lg bg-brand-primary/10 flex items-center justify-center group-hover:bg-brand-primary transition-colors">
                                <Calendar className="w-5 h-5 text-brand-primary group-hover:text-black" />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
                                    Year
                                </p>
                                <p className="text-xl font-bold text-white">{project.year}</p>
                            </div>
                        </div>

                        {/* Duration */}
                        {project.duration && (
                            <div className="p-8 border border-white/10 rounded-2xl flex items-center gap-6 hover:border-brand-primary/30 transition-colors group">
                                <div className="w-12 h-12 rounded-lg bg-brand-primary/10 flex items-center justify-center group-hover:bg-brand-primary transition-colors">
                                    <Clock className="w-5 h-5 text-brand-primary group-hover:text-black" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
                                        Duration
                                    </p>
                                    <p className="text-xl font-bold text-white">{project.duration}</p>
                                </div>
                            </div>
                        )}

                        {/* Team Size */}
                        {project.teamSize && (
                            <div className="p-8 border border-white/10 rounded-2xl flex items-center gap-6 hover:border-brand-primary/30 transition-colors group">
                                <div className="w-12 h-12 rounded-lg bg-brand-primary/10 flex items-center justify-center group-hover:bg-brand-primary transition-colors">
                                    <Users className="w-5 h-5 text-brand-primary group-hover:text-black" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
                                        Team
                                    </p>
                                    <p className="text-xl font-bold text-white">{project.teamSize} people</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Tools */}
                    {project.tools && project.tools.length > 0 && (
                        <div className="mt-12 p-8 border border-white/10 rounded-2xl">
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
                                Technologies & Tools
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {project.tools.map((tool, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-white/5 text-slate-300 text-sm rounded-full border border-white/10 hover:bg-brand-primary hover:text-black hover:border-brand-primary transition-colors"
                                    >
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}