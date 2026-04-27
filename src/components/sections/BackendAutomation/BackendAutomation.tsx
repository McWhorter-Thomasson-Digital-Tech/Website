import React from 'react';
import { Settings, Zap, ShieldCheck, Layout, Sparkles } from 'lucide-react';
import Link from 'next/link';
import styles from './BackendAutomation.module.css';
import { Terminology } from '@/components/ui/Terminology/Terminology';

interface Benefit {
  icon: React.ElementType;
  title: string;
  desc: React.ReactNode;
}

const benefits: Benefit[] = [
  {
    icon: Layout,
    title: 'Modern performance',
    desc: (
      <>
        We use <Terminology description="A modern way of building websites that sends only the essential code to your browser, making pages load almost instantly.">React Server Components</Terminology> to ensure your site is lightning-fast and easy for search engines to read and prioritize.
      </>
    ),
  },
  {
    icon: Zap,
    title: 'Seamless scaling',
    desc: (
      <>
        Our <Terminology description="A modern hosting style where the provider handles the 'servers', allowing your site to scale instantly for any number of users.">serverless</Terminology> architecture handles your data securely and adjusts instantly to meet demand without slowing down.
      </>
    ),
  },
  {
    icon: Sparkles,
    title: 'Citation ready',
    desc: (
      <>
        We ensure your brand is correctly cited and recommended by <Terminology description="Large Language Models - The AI 'brains' behind tools like ChatGPT and Claude.">modern answer engines</Terminology> using verified trust signals.
      </>
    ),
  },
  {
    icon: Settings,
    title: 'Managed workflows',
    desc: 'Eliminate manual roadblocks with automated data routing and integrated management for your storefront or SaaS portal.',
  },
  {
    icon: ShieldCheck,
    title: 'Premium security',
    desc: (
      <>
        Enterprise-grade security with <Terminology description="A security model where permissions are assigned to 'Roles' (like Admin vs User) rather than individuals, making access management easy and secure.">advanced access control</Terminology> and modern protocols protecting your sensitive data.
      </>
    ),
  },
];

export function BackendAutomation() {
  return (
    <section id="backend" className={styles.section}>
      <div className={styles.container}>
        
        <div className={styles.sectionHeader}>
          <p className={styles.label}>Strategic Architecture</p>
          <h2 className={styles.title}>Intelligent foundations</h2>
          <p className={styles.description}>
            We architect high-performance digital platforms that excel in the modern search landscape. Our foundations are optimized for <Terminology description="A set of performance scores Google uses to measure how fast and stable your site feels to real users.">user experience</Terminology>, modern visibility (GEO), and long-term stability.
          </p>
        </div>
        
        <div className={styles.cardsGrid}>
          {benefits.map((benefit) => (
            <div key={benefit.title} className={styles.card}>
              <div className={styles.cardIcon}>
                <benefit.icon />
              </div>
              <h3 className={styles.cardTitle}>{benefit.title}</h3>
              <div className={styles.cardDesc}>{benefit.desc}</div>
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

