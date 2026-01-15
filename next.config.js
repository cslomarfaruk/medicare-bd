/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['medicarebd.com', 'localhost'],
    formats: ['image/avif', 'image/webp'],
  },
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
        ],
      },
    ]
  },
  // Only add this if you're using Next.js 13+ with app router
  reactStrictMode: true,
  swcMinify: true,
}

export default nextConfig
