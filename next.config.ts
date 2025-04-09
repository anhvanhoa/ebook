import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    experimental: {
        turbo: {
            resolveAlias: {
                canvas: './empty-module.ts'
            }
        }
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'nhasachmienphi.com',
                port: '',
                pathname: '/**'
            }
        ]
    },
};

export default nextConfig;
