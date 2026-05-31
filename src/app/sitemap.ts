import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://mtdt.dev'; // Replace with your verified target domain

  // Base production paths
  const routes = [
    '',
    '/about',
    '/pricing',
    '/contact',
    '/services',
    '/faq'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  }));

  // Dynamic pSEO asset crawling
  const pSeoDir = path.join(process.cwd(), 'data', 'generated-content');
  let pSeoRoutes: any[] = [];

  if (fs.existsSync(pSeoDir)) {
    const files = fs.readdirSync(pSeoDir);
    pSeoRoutes = files
      .filter((file) => file.endsWith('.md'))
      .map((file) => {
        const slug = file.replace('.md', '');
        return {
          url: `${baseUrl}/solutions/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        };
      });
  }

  return [...routes, ...pSeoRoutes];
}