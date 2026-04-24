import React from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.section}>
      <div className={styles.orbContainer}>
        <div className={styles.orbPrimary} />
        <div className={styles.orbAccent} />
      </div>
      
      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Digital Engineering Agency
        </div>
        
        <h1 className={styles.heading}>
          Elite Web & System Architecture{' '}
          <span className={styles.highlight}>for the Industry Leader</span>
        </h1>
        
        <p className={styles.subtitle}>
          Lightning-fast, high-conversion, and secure digital architecture. From $139/mo custom websites for local businesses, to scalable automation software systems for the modern enterprise.
        </p>
        
        <div className={styles.buttons}>
          <Link href="#react-websites" className={styles.primaryButton}>
            Explore Services
          </Link>
          <Link href="/contact" className={styles.outlineButton}>
            Start a Project
          </Link>
        </div>
      </div>
    </section>
  );
}
