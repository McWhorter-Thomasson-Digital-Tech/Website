import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Keep bots out of future dashboard/client portals
    },
    sitemap: 'https://mtdigitaltech.com/sitemap.xml',
  }
}