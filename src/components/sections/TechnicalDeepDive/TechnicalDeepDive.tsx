import React from 'react';

export const TechnicalDeepDive = () => {
  return (
    <section className="relative w-full py-24 px-6 md:px-12 lg:px-24 border-t border-slate-800/50 bg-slate-950/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Next-level tech stack
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
            We build high-performance web apps optimized for Core Web Vitals, AI search engines (AEO), and headless architectures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-8 border border-slate-800 bg-slate-900/50 hover:bg-slate-900 transition-colors group">
            <div className="text-blue-500 font-mono text-sm mb-4">01. Frontend</div>
            <h3 className="text-2xl font-semibold text-white mb-4">React server components</h3>
            <p className="text-slate-400 leading-relaxed">
              Leveraging Next.js App Router and React Server Components (RSC) to ship zero-client-side JavaScript where possible, resulting in instant page loads and maximum SEO indexability.
            </p>
          </div>
          
          <div className="p-8 border border-slate-800 bg-slate-900/50 hover:bg-slate-900 transition-colors group">
            <div className="text-purple-500 font-mono text-sm mb-4">02. Backend</div>
            <h3 className="text-2xl font-semibold text-white mb-4">Serverless edge</h3>
            <p className="text-slate-400 leading-relaxed">
              Serverless automation workflows and edge-runtime functions that handle data orchestration securely, predictably, and with infinite elasticity under high load.
            </p>
          </div>

          <div className="p-8 border border-slate-800 bg-slate-900/50 hover:bg-slate-900 transition-colors group">
            <div className="text-emerald-500 font-mono text-sm mb-4">03. Performance</div>
            <h3 className="text-2xl font-semibold text-white mb-4">AI search ready</h3>
            <p className="text-slate-400 leading-relaxed">
              Built from the ground up for the AI search era. Full JSON-LD structured data, strict E-E-A-T signals, and semantic markup ensure LLMs cite your brand correctly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
