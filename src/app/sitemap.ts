import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mtdigitaltech.com'
  const lastModified = new Date()

  // Define core services to easily scale this list as your offerings grow
  const services = [
    'backend-pipelines',
    'performance-audits',
    'react-ecosystems',
    'technical-strategy',
  ]

  // Generate sitemap objects for each specific service page
  const serviceUrls = services.map((service) => ({
    url: `${baseUrl}/services/${service}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.9, // High priority for targeted, high-intent landing pages
  }))

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...serviceUrls,
    {
      url: `${baseUrl}/demo`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]
}
