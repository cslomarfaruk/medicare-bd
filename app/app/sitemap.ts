import { MetadataRoute } from 'next'


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://managemed.vercel.app' // 👈 Your actual domain

  const routes = [
    '',          // Home
    '/pricing',  // Pricing Page
    '/contact',  // Contact Page
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(), // Automatically sets "today" as the update date
    changeFrequency: 'daily' as const,
    priority: 1,
  }))

 
  return [...routes]
}