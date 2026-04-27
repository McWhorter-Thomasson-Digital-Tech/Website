import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { ArrowLeft } from 'lucide-react';
import { Terminology } from "@/components/ui/Terminology/Terminology";
import Link from 'next/link';
import styles from '../page.module.css';

export const metadata = {
  title: "Performance & Visibility Audits | MTDT Agency",
  description: "Deep-dive performance analysis and strategic optimization roadmaps to measurably improve your digital presence and user experience.",
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
          <p className={styles.label}>Audits & Optimization</p>
          <h1 className={styles.heading}>
            Performance & Visibility Audits
          </h1>
          <p className={styles.subtitle}>
            A fast site is a profitable site. We perform comprehensive performance analysis and deliver clear roadmaps to elevate your <Terminology description="A set of performance scores Google uses to measure how fast and stable your site feels to real users.">user experience</Terminology> and search visibility.
          </p>
        </section>

        <section className={styles.cardsSection}>
          <div className={styles.cardsGrid}>
            <div className={styles.card} style={{ height: 'auto', cursor: 'default' }}>
              <h2 className={styles.cardTitle}>Core Web Vitals Analysis</h2>
              <p className={styles.cardDesc}>
                Comprehensive measurement and optimization of <Terminology description="Largest Contentful Paint - How fast the most important content on your page becomes visible.">LCP</Terminology>, <Terminology description="First Input Delay - How fast your site responds when a user first clicks a button or link.">FID</Terminology>, and <Terminology description="Cumulative Layout Shift - How much the page content 'jumps' around while loading. Lower is better!">CLS</Terminology> metrics. We identify what's slowing you down and how it affects your user experience.
              </p>
            </div>
            <div className={styles.card} style={{ height: 'auto', cursor: 'default' }}>
              <h2 className={styles.cardTitle}>Speed Bottleneck Removal</h2>
              <p className={styles.cardDesc}>
                We look under the hood to find and fix sequential loading patterns and unnecessary re-renders that make your site feel sluggish. Our goal is a sub-second response for every customer.
              </p>
            </div>
            <div className={styles.card} style={{ height: 'auto', cursor: 'default' }}>
              <h2 className={styles.cardTitle}>SEO & GEO Teardowns</h2>
              <p className={styles.cardDesc}>
                Beyond traditional <Terminology description="Search Engine Optimization - Building your site so it ranks higher on Google.">SEO</Terminology>, we audit your site for <Terminology description="Generative Engine Optimization - Helping AI tools like ChatGPT find and recommend your business to users.">Generative Engine Optimization (GEO)</Terminology> readiness, ensuring AI models can accurately recommend your content.
              </p>
            </div>
            <div className={styles.card} style={{ height: 'auto', cursor: 'default' }}>
              <h2 className={styles.cardTitle}>Payload Optimization</h2>
              <p className={styles.cardDesc}>
                We streamline your site's weight using smart image optimization and code delivery strategies, achieving a sub-second "time to interactive" so your users never have to wait.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

