import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web Design & SEO Services in Charlottesville, VA | MT Digital Tech',
  description: 'Expert custom software development, backend pipelines, and high-performance SEO strategies tailored for businesses in Charlottesville, VA.',
  openGraph: {
    images: ['/api/og?title=Web+Design+in+Charlottesville'],
  }
};

export default function CharlottesvillePage() {
  return (
    <main className="p-20 max-w-4xl mx-auto pt-40 min-h-screen">
      <h1 className="text-5xl font-bold mb-6 text-white">
        Elevate Your Business in <span className="text-blue-500">Charlottesville, VA</span>
      </h1>
      <p className="text-xl text-gray-400 mb-8">
        MT Digital Tech provides blazing fast Next.js development, automated backend pipelines, and instant SEO indexing to help businesses in Charlottesville dominate their local market.
      </p>
      
      <div className="p-8 border border-gray-800 rounded-xl bg-gray-900/50">
        <h2 className="text-2xl font-bold text-white mb-4">Why Charlottesville Businesses Choose Us</h2>
        <ul className="list-disc list-inside text-gray-400 space-y-2">
          <li>Local market expertise in VA</li>
          <li>Instant Indexing through our proprietary IndexNow engine</li>
          <li>Lighthouse-optimized Core Web Vitals guarantee</li>
        </ul>
      </div>
    </main>
  );
}
