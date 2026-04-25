import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import styles from '../page.module.css';

export const metadata = {
  title: "Performance & SEO Audits | MTDT Agency",
  description: "Forensic-level performance analysis and actionable optimization roadmaps to measurably improve your website's Core Web Vitals and AI search visibility.",
};

export default function PerformanceAuditsPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.heroSection}>
          <Link href="/services" className={styles.label} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            <ArrowLeft size={16} /> Back to Services
          </Link>
          <p className={styles.label}>Analytics</p>
          <h1 className={styles.heading}>
            Performance Audits & Optimization
          </h1>
          <p className={styles.subtitle}>
            Every millisecond of load time directly impacts conversion rates. We perform forensic-level performance analysis and deliver actionable optimization roadmaps that measurably improve your Core Web Vitals scores.
          </p>
        </section>

        <section className={styles.cardsSection}>
          <div className={styles.cardsGrid}>
            <div className={styles.card} style={{ height: 'auto', cursor: 'default' }}>
              <h2 className={styles.cardTitle}>Core Web Vitals Analysis</h2>
              <p className={styles.cardDesc}>
                Comprehensive measurement and optimization of LCP, FID, CLS, and INP metrics. We identify the exact render-blocking resources, layout shifts, and interaction delays degrading your user experience.
              </p>
            </div>
            <div className={styles.card} style={{ height: 'auto', cursor: 'default' }}>
              <h2 className={styles.cardTitle}>Render Waterfall Elimination</h2>
              <p className={styles.cardDesc}>
                Deep-dive into your component tree to identify and eliminate sequential data fetching patterns, unnecessary re-renders, and client-side bottlenecks that compound into slow page loads.
              </p>
            </div>
            <div className={styles.card} style={{ height: 'auto', cursor: 'default' }}>
              <h2 className={styles.cardTitle}>SEO & GEO Teardowns</h2>
              <p className={styles.cardDesc}>
                Beyond traditional SEO, we audit your site structure for Generative Engine Optimization readiness, ensuring AI models like ChatGPT and Perplexity can accurately parse, summarize, and recommend your content.
              </p>
            </div>
            <div className={styles.card} style={{ height: 'auto', cursor: 'default' }}>
              <h2 className={styles.cardTitle}>Bundle & Payload Optimization</h2>
              <p className={styles.cardDesc}>
                JavaScript bundle analysis, tree-shaking verification, dynamic import strategies, and image optimization pipelines to reduce total transfer size and achieve sub-second Time to Interactive.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
