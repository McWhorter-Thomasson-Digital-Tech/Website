import React from 'react';
import Link from 'next/link';
import { Button } from '../../ui/Button/Button';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          {/* TODO: Insert Logo Icon/Image here */}
          <span>MTDT</span>
        </Link>
        
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <Link href="/services" className={styles.navLink}>Services</Link>
            </li>
            <li>
              <Link href="/pricing" className={styles.navLink}>Pricing</Link>
            </li>
            <li>
              <Link href="/about" className={styles.navLink}>About</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <Button variant="primary" href="/contact">Start Building</Button>
        </div>
      </div>
    </header>
  );
}
