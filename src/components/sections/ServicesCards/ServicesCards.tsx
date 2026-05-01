import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Terminology } from '@/components/ui/Terminology/Terminology';
import styles from './ServicesCards.module.css';

const services = [
  {
    title: 'Business websites',
    desc: 'Premium digital experiences designed for speed, visibility, and conversion.',
    tag: 'Frontend',
    href: '/services/react-ecosystems'
  },
  {
    title: 'E-commerce & SaaS',
    desc: 'Scalable storefronts and specialized backends designed to power your growth.',
    tag: 'Backend',
    href: '/services/backend-pipelines'
  },
  {
    title: "SEO and GEO strategy",
    desc: (
      <>
        Ensuring people—and modern answer engines—find your business. We elevate your foundation for Search (<Terminology description="Search Engine Optimization - Building your site so it ranks higher on Google.">SEO</Terminology>) and Generative search (<Terminology description="Generative Engine Optimization - Helping AI tools like ChatGPT find and recommend your business to users.">GEO</Terminology>).
      </>
    ),
    tag: 'Consulting',
    href: '/services/technical-strategy'
  },
  {
    title: 'Performance audits',
    desc: 'Concise, analytical reporting to optimize your mission-critical applications.',
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
