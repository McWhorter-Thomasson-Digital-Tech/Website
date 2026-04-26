import React from 'react';
import styles from './TechnicalDeepDive.module.css';

export const TechnicalDeepDive = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.heading}>
            Next-level tech stack
          </h2>
          <p className={styles.subtitle}>
            We build high-performance web apps optimized for Core Web Vitals, AI search engines (AEO), and headless architectures.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={`${styles.cardNumber} ${styles.numberFrontend}`}>01. Frontend</div>
            <h3 className={styles.cardTitle}>React server components</h3>
            <p className={styles.cardText}>
              Leveraging Next.js App Router and React Server Components (RSC) to ship zero-client-side JavaScript where possible, resulting in instant page loads and maximum SEO indexability.
            </p>
          </div>
          
          <div className={styles.card}>
            <div className={`${styles.cardNumber} ${styles.numberBackend}`}>02. Backend</div>
            <h3 className={styles.cardTitle}>Serverless edge</h3>
            <p className={styles.cardText}>
              Serverless automation workflows and edge-runtime functions that handle data orchestration securely, predictably, and with infinite elasticity under high load.
            </p>
          </div>

          <div className={styles.card}>
            <div className={`${styles.cardNumber} ${styles.numberPerformance}`}>03. Performance</div>
            <h3 className={styles.cardTitle}>AI search ready</h3>
            <p className={styles.cardText}>
              Built from the ground up for the AI search era. Full JSON-LD structured data, strict E-E-A-T signals, and semantic markup ensure LLMs cite your brand correctly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
