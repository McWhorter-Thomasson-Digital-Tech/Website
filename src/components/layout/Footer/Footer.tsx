import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.logo}>MTDT</div>
          <p className={styles.description}>
            {/* TODO: Insert short company mission/description here */}
            {`[INSERT_COMPANY_MISSION_OR_TAGLINE]`}
          </p>
        </div>
        
        <div className={styles.linksBlock}>
          <h4 className={styles.linksHeading}>Company</h4>
          <ul className={styles.list}>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p>&copy; {new Date().getFullYear()} McWhorter-Thomasson Digital Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
