"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import styles from './ReactOffer.module.css';

type BillingCycle = 'monthly' | 'quarterly' | 'annually';

interface PackageConfig {
  id: string;
  name: string;
  shortName: string;
  description: string;
  features: string[];
  pricing: Record<BillingCycle, { price: string; detail: string; savings?: string }>;
}

const packages: PackageConfig[] = [
  {
    id: 'website',
    name: 'Business websites & SEO',
    shortName: 'Marketing',
    description: 'High-performance sites architected for visibility and designed to grow your business.',
    features: [
      'Premium Digital Architecture',
      'Strategic Search Optimization (SEO)',
      'Next-Gen Search Visibility (GEO)',
      'Essential Form & API Solutions',
    ],
    pricing: {
      annually: { price: '300', detail: 'Billed annually', savings: 'Save 25% annually' },
      quarterly: { price: '350', detail: 'Billed quarterly', savings: 'Save 12.5% quarterly' },
      monthly: { price: '400', detail: 'Billed monthly', savings: 'none' },
    }
  },
  {
    id: 'ecommerce',
    name: 'E-commerce storefronts',
    shortName: 'E-Commerce',
    description: 'Custom online stores designed for premium speed and maximum revenue.',
    features: [
      'Custom Headless Architecture',
      'Seamless Payment & PIM Integration',
      'Global Performance & Cart Stability',
      'Programmatic Catalog Visibility (GEO)',
    ],
    pricing: {
      annually: { price: '600', detail: 'Billed annually', savings: 'Save 25% annually' },
      quarterly: { price: '700', detail: 'Billed quarterly', savings: 'Save 12.5% quarterly' },
      monthly: { price: '800', detail: 'Billed monthly', savings: 'none' },
    }
  },
  {
    id: 'fullstack',
    name: 'SaaS platforms',
    shortName: 'Full-Stack',
    description: 'Bespoke engineering for specialized business applications.',
    features: [
      'Advanced Multi-User Platforms',
      'Scalable Database Systems',
      'Secure Access & Data Protection',
      'Seamless Third-Party Ecosystems',
    ],
    pricing: {
      annually: { price: '1200', detail: 'Billed annually', savings: 'Save 20% annually' },
      quarterly: { price: '1350', detail: 'Billed quarterly', savings: 'Save 10% quarterly' },
      monthly: { price: '1500', detail: 'Billed monthly', savings: 'none' },
    }
  }
];

const billingCycleOrder: BillingCycle[] = ['annually', 'quarterly', 'monthly'];

export function ReactOffer() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('annually');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const getBillingTranslateX = () => {
    const idx = billingCycleOrder.indexOf(billingCycle);
    return `${idx * 100}%`;
  };

  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const child = container.children[index] as HTMLElement;
      if (child) {
        container.scrollTo({
          left: child.offsetLeft - container.offsetLeft,
          behavior: 'smooth'
        });
      }
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(el.children).indexOf(entry.target);
            if (index !== -1) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        root: el,
        threshold: 0.6,
      }
    );

    Array.from(el.children).forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="react-websites" className={styles.section}>
      <div className={styles.container}>
        
        <div className={styles.sectionHeader}>
          <p className={styles.label}>Frontend & backend engineering</p>
          <h2 className={styles.title}>Our core products</h2>
          <p className={styles.description}>
            We build fast, scalable websites and web apps that drive revenue.
          </p>
        </div>

        {/* Swipe Controls / Indicators */}
        <div className={styles.swipeControls}>
          <button 
            className={styles.swipeArrow} 
            onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className={styles.dots}>
            {packages.map((_, i) => (
              <button 
                key={i} 
                className={`${styles.dot} ${activeIndex === i ? styles.activeDot : ''}`}
                onClick={() => scrollTo(i)}
                aria-label={`Go to package ${i + 1}`}
              />
            ))}
          </div>

          <button 
            className={styles.swipeArrow} 
            onClick={() => scrollTo(Math.min(packages.length - 1, activeIndex + 1))}
            disabled={activeIndex === packages.length - 1}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Swipeable Container */}
        <div className={styles.scrollContainer} ref={scrollRef}>
          {packages.map((pkg) => {
            const currentPricing = pkg.pricing[billingCycle];
            
            return (
              <div key={pkg.id} className={styles.cardWrapper}>
                <div className={styles.cardInner}>
                  
                  <div className={styles.pricingSide}>
                    <p className={styles.tierLabel}>{pkg.name}</p>

                    {/* Billing Cycle Toggle — inside the card */}
                    <div className={styles.billingToggleWrapper}>
                      <div 
                        className={styles.billingToggleSlider} 
                        style={{ 
                          transform: `translateX(${getBillingTranslateX()})`,
                          width: `${100 / billingCycleOrder.length}%`
                        }} 
                      />
                      {billingCycleOrder.map((cycle) => (
                        <button
                          key={cycle}
                          className={`${styles.billingToggleOption} ${billingCycle === cycle ? styles.active : ''}`}
                          onClick={() => setBillingCycle(cycle)}
                        >
                          {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
                        </button>
                      ))}
                    </div>
                    
                    <div className={styles.priceContainer}>
                      {currentPricing.savings && currentPricing.savings !== 'none' && (
                        <span className={styles.saveBadge}>{currentPricing.savings}</span>
                      )}
                      {(currentPricing.savings === 'none' || !currentPricing.savings) && (
                        <span className={styles.saveBadge} data-savings="none">none</span>
                      )}
                      <div className={styles.price}>
                        <span className={styles.currency}>$</span>
                        <span key={`${pkg.id}-${billingCycle}`} className={styles.priceValue}>{currentPricing.price}</span>
                        <span className={styles.pricePeriod}>/mo</span>
                      </div>
                      <p className={styles.billingDetail}>{currentPricing.detail}</p>
                    </div>

                    <p className={styles.priceDesc}>{pkg.description}</p>
                    
                    <Link href="/contact" className={styles.ctaButton}>
                      Deploy now
                    </Link>
                  </div>
                  
                  <div className={styles.featuresSide}>
                    <p className={styles.featuresLabel}>What&apos;s included</p>
                    <ul className={styles.featuresList}>
                      {pkg.features.map((feature, index) => (
                        <li key={index} className={styles.featureItem}>
                          <div className={styles.featureIcon}>
                            <Check />
                          </div>
                          <span className={styles.featureText}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
