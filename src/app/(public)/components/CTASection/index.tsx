import Link from 'next/link'

export default function CTASection() {
    return (
        <section
            className="py-20 bg-brand-primary text-black text-center px-6"
            aria-labelledby="cta-heading"
        >
            <h2
                id="cta-heading"
                className="text-[10vw] md:text-[6vw] font-display font-black uppercase leading-[0.8] mb-6"
            >
                Let&apos;s Make<br />History
            </h2>
            <Link
                href="/contact"
                className="inline-block bg-black text-white px-12 py-6 text-xl rounded-full hover:bg-white hover:text-black transition-all duration-300 font-bold"
                aria-label="Start a new project - navigate to contact page"
            >
                Start Project
            </Link>
        </section>
    )
}
