export default function PortfolioLoading() {
    return (
        <div className="min-h-screen bg-gray-900 pt-32 px-6 lg:px-12">
            <div className="max-w-[1920px] mx-auto">
                {/* Skeleton Hero */}
                <div className="mb-20">
                    <div className="h-32 w-3/4 bg-white/5 rounded-lg mb-12 animate-pulse"></div>
                    <div className="h-8 w-1/2 bg-white/5 rounded mb-6 animate-pulse"></div>
                    <div className="h-4 w-1/3 bg-white/5 rounded animate-pulse"></div>
                </div>

                {/* Skeleton Filters */}
                <div className="mb-12">
                    <div className="flex gap-8 mb-8">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="h-6 w-20 bg-white/5 rounded animate-pulse"></div>
                        ))}
                    </div>
                </div>

                {/* Skeleton Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:auto-rows-[300px]">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div
                            key={i}
                            className="rounded-[2rem] bg-white/5 animate-pulse"
                            style={{
                                animationDelay: `${i * 0.1}s`,
                                animationDuration: '1.5s'
                            }}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    )
}
