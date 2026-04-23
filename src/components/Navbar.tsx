import React from 'react';
import Link from 'next/link';
import styles from '@/app/CSS/Modules/Page.module.css';

const Navbar = () => (
  <nav className={styles.navbar}>
    <div className={styles.navContent}>
      <Link href="/" className={styles.logo} style={{ textDecoration: 'none' }}>MTDT</Link>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link href="/" className={styles.navButton} style={{ border: 'none' }}>Home</Link>
        <Link href="/services" className={styles.navButton} style={{ border: 'none' }}>Services</Link>
        <Link href="/contact" className={styles.navButton}>
          Request a Project Quote
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
