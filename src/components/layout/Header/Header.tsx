"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navBar}>
        <Link href="/" className={styles.logo}>
          <Image 
            src="/Logo_Clear_Center.png" 
            alt="MTDT Agency Logo" 
            width={140} 
            height={45} 
            className={styles.logoImage}
            priority
          />
        </Link>
        
        <nav className={styles.nav}>
          <Link href="/services" className={styles.navLink}>Services</Link>
          <Link href="/pricing" className={styles.navLink}>Pricing</Link>
          <Link href="/about" className={styles.navLink}>About</Link>
          <Link href="/faq" className={styles.navLink}>FAQ</Link>
          <Link href="/demo" className={styles.navLink}>Demo</Link>
        </nav>

        <Link href="/contact" className={styles.ctaButton}>
          Get Started
        </Link>
      </div>
    </header>
  );
}
