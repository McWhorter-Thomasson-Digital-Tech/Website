import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './ServicesCards.module.css';

const services = [
  { 
    title: 'React Ecosystems', 
    desc: 'High-velocity, immutable frontend architectures built for scale and performance.', 
    tag: 'Frontend',
    href: '/services/react-ecosystems'
  },
  { 
    title: 'Backend Pipelines', 
    desc: 'Robust, serverless automation and data orchestration using modern CI/CD patterns.', 
    tag: 'Backend',
    href: '/services/backend-pipelines'
  },
  { 
    title: 'Technical Strategy', 
    desc: 'Architectural consulting for high-growth technical teams navigating complex stacks.', 
    tag: 'Consulting',
    href: '/services/technical-strategy'
  },
  { 
    title: 'Performance Audits', 
    desc: 'Deep-dive analytical reporting and optimization for mission-critical applications.', 
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
