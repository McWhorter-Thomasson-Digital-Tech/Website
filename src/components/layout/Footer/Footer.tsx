import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          
          <div>
            <Link href="/" className={styles.brandLogo}>MTDT</Link>
            <p className={styles.brandDesc}>
              We build digital machines that accelerate human innovation through high-velocity React ecosystems and immutable backend pipelines.
            </p>
          </div>
          
          <div>
            <h4 className={styles.columnTitle}>Navigation</h4>
            <ul className={styles.linkList}>
              <li><Link href="/about" className={styles.link}>About Us</Link></li>
              <li><Link href="/services" className={styles.link}>Services</Link></li>
              <li><Link href="/pricing" className={styles.link}>Pricing</Link></li>
              <li><Link href="/faq" className={styles.link}>FAQ</Link></li>
              <li><Link href="/contact" className={styles.link}>Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className={styles.columnTitle}>Get in Touch</h4>
            <ul className={styles.contactInfo}>
              <li>hello@mtdigitaltech.com</li>
              <li>United States</li>
            </ul>
          </div>
          
        </div>
        
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} McWhorter-Thomasson Digital Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
