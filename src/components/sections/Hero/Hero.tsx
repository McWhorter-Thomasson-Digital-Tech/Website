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
        
        <h1 className={styles.heading}>
          Websites and SaaS{' '}
          <span className={styles.highlight}>for modern business</span>
        </h1>
        
        <p className={styles.subtitle}>
          We partner with ambitious teams to architect lightning-fast business websites and SaaS platforms. Every project is designed for modern search visibility and global performance.
        </p>
        
        <div className={styles.buttons}>
          <Link href="#react-websites" className={styles.primaryButton}>
            View services
          </Link>
          <Link href="/contact" className={styles.outlineButton}>
            Start project
          </Link>
        </div>
      </div>
    </section>
  );
}
