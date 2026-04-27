import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { ArrowLeft } from 'lucide-react';
import { Terminology } from "@/components/ui/Terminology/Terminology";
import Link from 'next/link';
import styles from '../page.module.css';

export const metadata = {
  title: "Technical Strategy & Consulting | MTDT Agency",
  description: "Strategic technology partnership, architecture planning, and high-level guidance for teams navigating complex digital decisions.",
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
          <p className={styles.label}>Strategic Consulting</p>
          <h1 className={styles.heading}>
            Strategic Technology & Architecture Consulting
          </h1>
          <p className={styles.subtitle}>
            Navigate complex technology decisions with confidence. We provide <Terminology description="Strategic technology leadership on a fractional basis, providing high-level expertise and direction without the full-time commitment.">Fractional CTO</Terminology> guidance, system architecture planning, and objective evaluation for teams architecting for long-term growth.
          </p>
        </section>

        <section className={styles.cardsSection}>
          <div className={styles.cardsGrid}>
            <div className={styles.card} style={{ height: 'auto', cursor: 'default' }}>
              <h2 className={styles.cardTitle}>Architecture Planning</h2>
              <p className={styles.cardDesc}>
                Comprehensive system design sessions covering database selection and deployment strategy for your specific business goals. We ensure your technology supports your growth, not hinders it.
              </p>
            </div>
            <div className={styles.card} style={{ height: 'auto', cursor: 'default' }}>
              <h2 className={styles.cardTitle}>Technology Stack Evaluation</h2>
              <p className={styles.cardDesc}>
                Objective analysis of your current tools against modern alternatives. We identify bottlenecks and migration paths that maximize <Terminology description="Return on Investment - Ensuring that the money you spend on technology results in measurable business growth or cost savings.">ROI</Terminology> without disrupting your active operations.
              </p>
            </div>
            <div className={styles.card} style={{ height: 'auto', cursor: 'default' }}>
              <h2 className={styles.cardTitle}>WaaS Subscription Model</h2>
              <p className={styles.cardDesc}>
                Our <Terminology description="Website-as-a-Service - A modern way to own a website where you subscribe to a fully managed platform that includes all hosting, security, and updates for a flat fee.">WaaS</Terminology> model eliminates $10K+ upfront build costs. Subscribe to a fully managed, enterprise-grade platform with continuous maintenance and performance optimization included.
              </p>
            </div>
            <div className={styles.card} style={{ height: 'auto', cursor: 'default' }}>
              <h2 className={styles.cardTitle}>Scaling Roadmaps</h2>
              <p className={styles.cardDesc}>
                Detailed 6-to-12-month technical roadmaps that align engineering milestones with business growth targets, ensuring your systems are ready for tomorrow's demand today.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

