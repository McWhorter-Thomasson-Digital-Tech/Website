import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import styles from '../page.module.css';

export const metadata = {
  title: "Backend Pipelines | MTDT Agency",
  description: "Robust, serverless automation and data orchestration. Custom database architecture, API ecosystems, and CI/CD pipelines for mission-critical systems.",
};

export default function BackendPipelinesPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.heroSection}>
          <Link href="/services" className={styles.label} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            <ArrowLeft size={16} /> Back to Services
          </Link>
          <p className={styles.label}>Backend Engineering</p>
          <h1 className={styles.heading}>
            Immutable Backend Pipelines
          </h1>
          <p className={styles.subtitle}>
            We engineer secure, serverless backend infrastructures that automate complex data operations, orchestrate APIs, and scale elastically based on real-time demand telemetry.
          </p>
        </section>

        <section className={styles.cardsSection}>
          <div className={styles.cardsGrid}>
            <div className={styles.card} style={{ height: 'auto', cursor: 'default' }}>
              <h2 className={styles.cardTitle}>Custom Database Architecture</h2>
              <p className={styles.cardDesc}>
                High-performance PostgreSQL and specialized edge databases structured to eliminate latency and preserve strict ACID compliance. Includes automated backup pipelines and zero-downtime migration strategies.
              </p>
            </div>
            <div className={styles.card} style={{ height: 'auto', cursor: 'default' }}>
              <h2 className={styles.cardTitle}>API Ecosystems</h2>
              <p className={styles.cardDesc}>
                Unified GraphQL and REST endpoints serving omnichannel applications. We implement rate limiting, request validation, and comprehensive logging to ensure reliability at scale.
              </p>
            </div>
            <div className={styles.card} style={{ height: 'auto', cursor: 'default' }}>
              <h2 className={styles.cardTitle}>Authentication & RBAC</h2>
              <p className={styles.cardDesc}>
                Enterprise-grade user authentication systems with role-based access control. JWT sessions, OAuth 2.0 integrations, and granular permission policies engineered for zero-trust security models.
              </p>
            </div>
            <div className={styles.card} style={{ height: 'auto', cursor: 'default' }}>
              <h2 className={styles.cardTitle}>CI/CD & DevOps Automation</h2>
              <p className={styles.cardDesc}>
                Fully automated deployment pipelines with staging environments, rollback capabilities, and health-check monitoring. Your infrastructure deploys itself while you focus on business growth.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
