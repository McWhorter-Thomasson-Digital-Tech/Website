import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import styles from '../page.module.css';

export const metadata = {
  title: "Premium Web Apps & SaaS | MTDT Agency",
  description: "High-performance digital experiences architected with React and Next.js for ambitious teams requiring exceptional speed and visibility.",
};

export default function ReactEcosystemsPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.heroSection}>
          <Link href="/services" className={styles.label} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            <ArrowLeft size={16} /> Back to Services
          </Link>
          <p className={styles.label}>Premium Engineering</p>
          <h1 className={styles.heading}>
            World-Class Digital Experiences
          </h1>
          <p className={styles.subtitle}>
            We architect scalable, high-performance platforms using modern React standards. Sub-second load times, exceptional user experience, and premium visibility are the foundation of every partnership.
          </p>
        </section>

        <section className={styles.cardsSection}>
          <div className={styles.cardsGrid}>
            <div className={styles.card} style={{ height: 'auto', cursor: 'default' }}>
              <h2 className={styles.cardTitle}>Next.js App Router Engineering</h2>
              <p className={styles.cardDesc}>
                We build statically generated and server-side rendered applications using Next.js App Router with React Server Components for unparalleled performance, streaming, and SEO indexability.
              </p>
            </div>
            <div className={styles.card} style={{ height: 'auto', cursor: 'default' }}>
              <h2 className={styles.cardTitle}>Atomic Component Systems</h2>
              <p className={styles.cardDesc}>
                Strict, fully typed design systems built on Radix UI primitives and modern CSS. Every component is reusable, accessible, and optimized to maintain consistency across massive codebases.
              </p>
            </div>
            <div className={styles.card} style={{ height: 'auto', cursor: 'default' }}>
              <h2 className={styles.cardTitle}>Edge Rendering & CDN Delivery</h2>
              <p className={styles.cardDesc}>
                Deploy your application to the global edge with Vercel or AWS CloudFront. Pages render in under 100ms from any location on Earth, ensuring zero-latency experiences for every visitor.
              </p>
            </div>
            <div className={styles.card} style={{ height: 'auto', cursor: 'default' }}>
              <h2 className={styles.cardTitle}>Responsive & Adaptive UI</h2>
              <p className={styles.cardDesc}>
                Pixel-perfect interfaces that adapt fluidly from mobile to ultrawide displays. We implement container queries, fluid typography, and dynamic layouts that feel native on every device.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
