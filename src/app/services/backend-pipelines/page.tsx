import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { ArrowLeft } from 'lucide-react';
import { Terminology } from "@/components/ui/Terminology/Terminology";
import Link from 'next/link';
import styles from '../page.module.css';

export const metadata = {
  title: "Intelligent Backend Systems | MTDT Agency",
  description: "Secure, scalable backend architectures that automate your data operations and provide a solid foundation for growth.",
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
          <p className={styles.label}>Systems Engineering</p>
          <h1 className={styles.heading}>
            Intelligent Backend Systems
          </h1>
          <p className={styles.subtitle}>
            We architect resilient foundations using <Terminology description="A modern hosting style where the provider handles the 'servers', allowing your site to scale instantly for any number of users.">serverless</Terminology> technologies. Our systems provide secure, automated data management that <Terminology description="Systems that can stretch or shrink their power instantly, so you only pay for what you use while handling millions of visitors.">scales seamlessly</Terminology> with your business growth.
          </p>
        </section>

        <section className={styles.cardsSection}>
          <div className={styles.cardsGrid}>
            <div className={styles.card} style={{ height: 'auto', cursor: 'default' }}>
              <h2 className={styles.cardTitle}>Custom Database Architecture</h2>
              <p className={styles.cardDesc}>
                High-performance databases structured to eliminate lag and preserve strict <Terminology description="A gold standard of reliability that ensures your data is never lost or corrupted, even during a system crash.">ACID compliance</Terminology>. We include automated backup systems and seamless updates to keep your business running 24/7.
              </p>
            </div>
            <div className={styles.card} style={{ height: 'auto', cursor: 'default' }}>
              <h2 className={styles.cardTitle}>API Ecosystems</h2>
              <p className={styles.cardDesc}>
                Unified <Terminology description="Special languages your website uses to talk to its database to fetch information efficiently.">GraphQL and REST</Terminology> endpoints that power your apps. We implement smart rate limiting and logging to ensure your system stays fast and reliable under heavy load.
              </p>
            </div>
            <div className={styles.card} style={{ height: 'auto', cursor: 'default' }}>
              <h2 className={styles.cardTitle}>Authentication & Role Management</h2>
              <p className={styles.cardDesc}>
                Enterprise-grade security with <Terminology description="A security model where permissions are assigned to 'Roles' (like Admin vs User) rather than individuals, making access management easy and secure.">RBAC</Terminology>. We use <Terminology description="A secure way to verify a user's identity using a digital 'token' that can't be easily faked.">JWT</Terminology> and OAuth 2.0 to protect your data with a zero-trust approach, ensuring only the right eyes see your sensitive info.
              </p>
            </div>
            <div className={styles.card} style={{ height: 'auto', cursor: 'default' }}>
              <h2 className={styles.cardTitle}>Automation & DevOps</h2>
              <p className={styles.cardDesc}>
                Fully automated <Terminology description="Systems that automatically test and check your code for bugs every time a change is made, ensuring a smooth, safe launch.">CI/CD pipelines</Terminology> with rollback safety. Your infrastructure maintains itself, giving you more time to focus on your customers.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

