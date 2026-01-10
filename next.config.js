/** @type {import('next').NextConfig} */
const nextConfig = {
    // Images configuration
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '**.cloudinary.com',
                pathname: '/**',
            },
        ],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },

    // Webpack configuration
    webpack: (config, { isServer, dev }) => {
        // Fix for lucide-react
        if (!isServer) {
            config.resolve.fallback = {
                fs: false,
                net: false,
                tls: false,
            };
        }

        // Optimize chunks
        config.optimization.splitChunks = {
            chunks: 'all',
            maxInitialRequests: 25,
            minSize: 20000,
            cacheGroups: {
                default: false,
                vendors: false,
                lucide: {
                    test: /[\\/]node_modules[\\/](lucide-react)[\\/]/,
                    name: 'lucide',
                    chunks: 'all',
                    priority: 40,
                    enforce: true,
                    reuseExistingChunk: true,
                },
                react: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name: 'react',
                    chunks: 'all',
                    priority: 30,
                    enforce: true,
                    reuseExistingChunk: true,
                },
            },
        };

        return config;
    },
};

module.exports = nextConfig;
