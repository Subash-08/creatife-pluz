import Button from '@/components/Button'

export default function CTASection() {
    return (
        <section className="py-8 bg-brand-primary text-black text-center px-6">
            <h2 className="text-[10vw] font-display font-black uppercase leading-[0.8] mb-6">
                Let&apos;s Make<br />History
            </h2>
            <Button to="/contact" className="bg-black text-white px-12 py-6 text-xl rounded-full hover:bg-white hover:text-black transition-all">
                Start Project
            </Button>
        </section>
    )
}
