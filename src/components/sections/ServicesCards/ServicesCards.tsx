import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './ServicesCards.module.css';

const services = [
  { 
    title: 'Business websites', 
    desc: 'Fast, scalable business websites optimized for search and conversion.', 
    tag: 'Frontend',
    href: '/services/react-ecosystems'
  },
  { 
    title: 'E-commerce & SaaS', 
    desc: 'Serverless data orchestration and automated backends for your applications.', 
    tag: 'Backend',
    href: '/services/backend-pipelines'
  },
  { 
    title: 'SEO & AEO strategy', 
    desc: 'Architectural consulting and AI search engine optimization.', 
    tag: 'Consulting',
    href: '/services/technical-strategy'
  },
  { 
    title: 'Performance audits', 
    desc: 'Analytical reporting and optimization for mission-critical applications.', 
    tag: 'Analytics',
    href: '/services/performance-audits'
  },
];

export function ServicesCards() {
  return (
    <section className={styles.cardsSection}>
      <div className={styles.cardsGrid}>
        {services.map((service) => (
          <Link key={service.title} href={service.href} className={styles.card}>
            <span className={styles.cardTag}>{service.tag}</span>
            <h2 className={styles.cardTitle}>{service.title}</h2>
            <p className={styles.cardDesc}>{service.desc}</p>
            <div className={styles.cardArrow}>
              Learn more <ArrowRight />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
