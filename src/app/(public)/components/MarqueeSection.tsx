export default function MarqueeSection() {
    return (
        <div className="py-12 bg-brand-primary overflow-hidden whitespace-nowrap border-y-4 border-black">
            <div className="marquee-content inline-block animate-marquee">
                {[...Array(4)].map((_, i) => (
                    <span key={i} className="text-6xl md:text-8xl font-display font-black text-black uppercase tracking-tight mx-8">
                        Branding • Design • Photography • Signage •
                    </span>
                ))}
            </div>
        </div>
    )
}
