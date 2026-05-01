import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Case Study: Edge Compute SEO Migrations | MT Digital Tech',
  description: 'How we engineer high-volume SEO migrations and programmatic generation using Next.js 16, Python orchestration, and Vercel Edge Middleware.',
};

export default function CaseStudyPage() {
  return (
    <main className="p-8 md:p-20 pt-40 max-w-4xl mx-auto min-h-screen">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link href="/" className="text-blue-500 hover:text-blue-400 transition-colors text-sm font-mono tracking-wider">
          ← BACK TO HOME
        </Link>
      </div>

      <article className="prose prose-invert prose-lg max-w-none">
        {/* Header */}
        <div className="mb-12 border-b border-gray-800 pb-8">
          <span className="text-blue-500 font-mono text-sm tracking-widest uppercase mb-4 block">Engineering Case Study</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            High-Volume SEO Migrations & Programmatic Generation via Edge Compute
          </h1>
          <div className="flex gap-4 text-sm font-mono text-gray-500">
            <span>Tech Stack:</span>
            <span className="text-gray-300">Next.js 16</span>
            <span className="text-gray-300">Python</span>
            <span className="text-gray-300">Vercel Edge</span>
          </div>
        </div>

        {/* Content */}
        <section className="space-y-8 text-gray-300 leading-relaxed">
          
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">The Architecture Challenge</h2>
            <p className="mb-4">
              When enterprise and high-traffic applications migrate platforms, the two greatest risks are SEO equity bleed and Time to First Byte (TTFB) degradation. Standard digital agencies typically handle URL migrations using application-level plugins or monolithic server-side <code>.htaccess</code> rules. At scale, this introduces significant latency, forcing the server to evaluate regex patterns for every incoming request before data fetching can even begin.
            </p>
            <p>
              Furthermore, scaling geo-specific or programmatic landing pages traditionally requires heavy database queries on each page load, drastically lowering Lighthouse performance scores and crippling conversion rates.
            </p>
          </div>

          <div className="p-8 border border-blue-900/30 bg-blue-900/10 rounded-2xl my-10">
            <h2 className="text-2xl font-bold text-white mb-4">The MTDT Approach: Next.js 16, Python Orchestration, and Edge Networking</h2>
            <p>
              To solve this for high-stakes environments, we engineered a custom, decoupled deployment pipeline. By separating the data orchestration layer from the delivery layer, we achieved zero-latency redirects and instantaneous search indexing.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-3">1. Python-Driven Data Orchestration</h3>
            <p className="mb-6">
              Instead of relying on fragile CMS plugins, we built a suite of native Python extraction tools. Our <code>redirect_mapper</code> actively parses legacy XML sitemaps, resolves paths via strictly typed URL parsers, and automatically generates a 1:1 mapped TypeScript dictionary (<code>redirects.ts</code>). Simultaneously, our <code>pseo_builder</code> ingests raw CSV data to programmatically scaffold native Next.js App Router components. This completely bypasses runtime database dependencies for programmatic SEO, shifting the compute load entirely to the build step.
            </p>

            <h3 className="text-xl font-bold text-white mb-3">2. Vercel Edge Network Routing</h3>
            <p className="mb-6">
              The auto-generated TypeScript redirect maps are injected directly into Next.js 16 Edge Middleware. Because Middleware executes before a request is processed by the server, and runs globally on the Vercel Edge Network, routing logic is resolved at the CDN node closest to the user. The result is sub-10ms TTFB for complex legacy routing—an architecture that retains 100% of historical SEO authority with zero performance penalty.
            </p>

            <h3 className="text-xl font-bold text-white mb-3">3. Automated IndexNow Pipeline</h3>
            <p>
              Waiting weeks for crawler discovery is unacceptable for time-sensitive launches. We integrated a custom <code>seo_ping</code> pipeline that fires payloads directly to the IndexNow API. The moment the Next.js CI/CD pipeline completes a successful build, the IndexNow API is notified, forcing search engines to instantly process the new dynamic routes and localized endpoints.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-4">The Outcome</h2>
            <p>
              By replacing monolithic application-level routing with Python-orchestrated Edge Middleware, we deliver uncompromising Lighthouse scores. The architecture guarantees that infrastructure overhead scales linearly, ensuring our clients out-perform competitors on core web vitals while aggressively capturing programmatic market share.
            </p>
          </div>

        </section>
      </article>
    </main>
  );
}