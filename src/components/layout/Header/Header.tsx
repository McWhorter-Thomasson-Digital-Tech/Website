import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.navBar}>
        <Link href="/" className={styles.logo}>
          MTDT
        </Link>
        
        <nav className={styles.nav}>
          <Link href="/services" className={styles.navLink}>Services</Link>
          <Link href="/pricing" className={styles.navLink}>Pricing</Link>
          <Link href="/about" className={styles.navLink}>About</Link>
        </nav>

        <Link href="/contact" className={styles.ctaButton}>
          Get Started
        </Link>
      </div>
    </header>
  );
}
