export default function CaseStudyLoading() {
    return (
        <div className="bg-gray-900 min-h-screen">
            {/* Hero Skeleton */}
            <section className="h-screen flex items-center justify-center px-6">
                <div className="text-center space-y-8 w-full max-w-4xl">
                    <div className="h-4 w-32 bg-white/10 rounded mx-auto animate-pulse"></div>
                    <div className="h-32 w-3/4 bg-white/5 rounded-2xl mx-auto animate-pulse"></div>
                    <div className="flex justify-center gap-12 pt-12">
                        {[1, 2].map(i => (
                            <div key={i} className="text-center">
                                <div className="h-3 w-20 bg-white/10 rounded mb-2 animate-pulse"></div>
                                <div className="h-4 w-12 bg-white/10 rounded mx-auto animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Skeleton */}
            <section className="h-screen bg-white/5 flex items-center justify-center">
                <div className="text-center">
                    <div className="h-6 w-48 bg-white/10 rounded mx-auto mb-4 animate-pulse"></div>
                    <div className="h-3 w-32 bg-white/10 rounded mx-auto animate-pulse"></div>
                </div>
            </section>
        </div>
    )
}
