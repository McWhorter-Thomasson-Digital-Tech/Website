import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import styles from '../page.module.css';

export const metadata = {
  title: "Technical Strategy & Consulting | MTDT Agency",
  description: "Fractional CTO consulting and architectural planning for high-growth technical teams navigating complex technology stacks.",
};

export default function TechnicalStrategyPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.heroSection}>
          <Link href="/services" className={styles.label} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            <ArrowLeft size={16} /> Back to Services
          </Link>
          <p className={styles.label}>Consulting</p>
          <h1 className={styles.heading}>
            Technical Strategy & Architecture Consulting
          </h1>
          <p className={styles.subtitle}>
            Navigate complex technology decisions with confidence. We provide fractional CTO-level guidance, system architecture planning, and technology stack evaluation for teams scaling from zero to enterprise.
          </p>
        </section>

        <section className={styles.cardsSection}>
          <div className={styles.cardsGrid}>
            <div className={styles.card} style={{ height: 'auto', cursor: 'default' }}>
              <h2 className={styles.cardTitle}>Architecture Planning</h2>
              <p className={styles.cardDesc}>
                Comprehensive system design sessions covering microservices vs. monolith decisions, database selection, caching layers, and deployment topology for your specific scale requirements.
              </p>
            </div>
            <div className={styles.card} style={{ height: 'auto', cursor: 'default' }}>
              <h2 className={styles.cardTitle}>Technology Stack Evaluation</h2>
              <p className={styles.cardDesc}>
                Objective analysis of your current stack against modern alternatives. We identify bottlenecks, technical debt, and migration paths that maximize ROI without disrupting active operations.
              </p>
            </div>
            <div className={styles.card} style={{ height: 'auto', cursor: 'default' }}>
              <h2 className={styles.cardTitle}>WaaS Subscription Model</h2>
              <p className={styles.cardDesc}>
                Our Website-as-a-Service model eliminates $10K+ upfront build costs. Subscribe to a fully managed, enterprise-grade Next.js platform with continuous maintenance, security patches, and performance optimization included.
              </p>
            </div>
            <div className={styles.card} style={{ height: 'auto', cursor: 'default' }}>
              <h2 className={styles.cardTitle}>Scaling Roadmaps</h2>
              <p className={styles.cardDesc}>
                Detailed 6-to-12-month technical roadmaps that align engineering milestones with business growth targets, ensuring infrastructure scales ahead of demand rather than behind it.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
