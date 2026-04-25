import React from 'react';
import { Settings, Zap, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import styles from './BackendAutomation.module.css';

const benefits = [
  {
    icon: Settings,
    title: 'Automated workflows',
    desc: 'Eliminate manual intervention with self-healing pipelines.',
  },
  {
    icon: Zap,
    title: 'Infinite scaling',
    desc: 'Dynamic resource allocation based on real-time telemetry.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure by default',
    desc: 'SOC2 compliant architectures with zero-trust protocols.',
  },
];

export function BackendAutomation() {
  return (
    <section id="backend" className={styles.section}>
      <div className={styles.container}>
        
        <div className={styles.sectionHeader}>
          <p className={styles.label}>Backend engineering</p>
          <h2 className={styles.title}>Automated backends</h2>
          <p className={styles.description}>
            Secure, automated, and scalable data flows for e-commerce and SaaS.
          </p>
        </div>
        
        <div className={styles.cardsGrid}>
          {benefits.map((benefit) => (
            <div key={benefit.title} className={styles.card}>
              <div className={styles.cardIcon}>
                <benefit.icon />
              </div>
              <h3 className={styles.cardTitle}>{benefit.title}</h3>
              <p className={styles.cardDesc}>{benefit.desc}</p>
            </div>
          ))}
        </div>
        
        <div className={styles.ctaBanner}>
          <div>
            <h3 className={styles.ctaTitle}>System integration</h3>
            <p className={styles.ctaDesc}>Start your automation journey with a technical audit.</p>
          </div>
          <Link href="/contact" className={styles.ctaButton}>
            Book consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
