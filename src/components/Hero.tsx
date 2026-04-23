import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import styles from '@/app/CSS/Modules/Page.module.css';

const Hero = () => (
  <section className={styles.hero}>
    <div className={styles.heroContent}>
      <h1 className={styles.headline}>
        Design. Software. Visibility.<br/>
        <span className={styles.accentText}>Engineered for Growth.</span>
      </h1>
      <p className={styles.subHeadline}>
        High-converting website design, custom SaaS applications, e-commerce solutions, and next-generation SEO & GEO strategies. Based in Lynchburg, VA.
      </p>
      <Link href="/contact" className={styles.primaryCta}>
       Build Your Digital Asset <ArrowRight className={styles.ctaIcon} size={20} />
      </Link>
    </div>
  </section>
);

export default Hero;
