"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import styles from './ReactOffer.module.css';

type BillingCycle = 'monthly' | 'quarterly' | 'annually';

interface PackageConfig {
  id: string;
  name: string;
  description: string;
  features: string[];
  pricing: Record<BillingCycle, { price: string; detail: string; savings?: string }>;
}

const packages: PackageConfig[] = [
  {
    id: 'website',
    name: 'High-speed Custom React Website',
    description: 'Scalable architecture for modern innovators.',
    features: [
      'Custom Next.js Development',
      'Advanced Search Engine Optimization',
      'Advanced Generative Engine Optimization',
      'Custom API Integrations',
    ],
    pricing: {
      annually: { price: '300', detail: 'Billed annually', savings: 'Save 25% annually' },
      quarterly: { price: '350', detail: 'Billed quarterly', savings: 'Save 12.5% quarterly' },
      monthly: { price: '400', detail: 'Billed monthly', savings: 'none' },
    }
  },
  {
    id: 'fullstack',
    name: 'Full Stack App & Database',
    description: 'Complete data architecture and immutable pipelines.',
    features: [
      'Custom Next.js Development',
      'Full Database Creation & Management',
      'User Authentication & Security',
      'Advanced Backend API Ecosystems',
      'Advanced Generative Engine Optimization',
    ],
    pricing: {
      annually: { price: '1200', detail: 'Billed annually', savings: 'Save 20% annually' },
      quarterly: { price: '1350', detail: 'Billed quarterly', savings: 'Save 10% quarterly' },
      monthly: { price: '1500', detail: 'Billed monthly', savings: 'none' },
    }
  }
];

export function ReactOffer() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('annually');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const getTranslateX = () => {
    switch (billingCycle) {
      case 'monthly': return '200%';
      case 'quarterly': return '100%';
      case 'annually': return '0%';
      default: return '0%';
    }
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
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft;
        const itemWidth = scrollRef.current.offsetWidth;
        // Use a small buffer to ensure snapping detection
        const index = Math.round(scrollLeft / itemWidth);
        if (index !== activeIndex) {
            setActiveIndex(index);
        }
      }
    };
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll, { passive: true });
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, [activeIndex]);

  return (
    <section id="react-websites" className={styles.section}>
      <div className={styles.container}>
        
        <div className={styles.sectionHeader}>
          <p className={styles.label}>Frontend & Backend Engineering</p>
          <h2 className={styles.title}>High-Velocity React Ecosystems</h2>
          <p className={styles.description}>
            We build immutable frontend architectures and robust databases that eliminate bottlenecks and maximize performance.
          </p>
        </div>

        {/* Global Billing Toggle */}
        <div className={styles.globalToggleContainer}>
          <div className={styles.toggleWrapper}>
            <div 
              className={styles.toggleSlider} 
              style={{ 
                transform: `translateX(${getTranslateX()})`,
                width: '33.33%'
              }} 
            />
            <button 
              className={`${styles.toggleOption} ${billingCycle === 'annually' ? styles.active : ''}`}
              onClick={() => setBillingCycle('annually')}
            >
              Annually
            </button>
            <button 
              className={`${styles.toggleOption} ${billingCycle === 'quarterly' ? styles.active : ''}`}
              onClick={() => setBillingCycle('quarterly')}
            >
              Quarterly
            </button>
            <button 
              className={`${styles.toggleOption} ${billingCycle === 'monthly' ? styles.active : ''}`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
          </div>
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
                    
                    <div className={styles.priceContainer}>
                      {currentPricing.savings && currentPricing.savings !== 'none' && (
                        <span className={styles.saveBadge}>{currentPricing.savings}</span>
                      )}
                      {(currentPricing.savings === 'none' || !currentPricing.savings) && (
                        <span className={styles.saveBadge} data-savings="none">none</span>
                      )}
                      <div className={styles.price}>
                        <span className={styles.currency}>$</span>
                        <span key={currentPricing.price} className={styles.priceValue}>{currentPricing.price}</span>
                        <span className={styles.pricePeriod}>/mo</span>
                      </div>
                      <p className={styles.billingDetail}>{currentPricing.detail}</p>
                    </div>

                    <p className={styles.priceDesc}>{pkg.description}</p>
                    
                    <Link href="/contact" className={styles.ctaButton}>
                      EXECUTE DEPLOYMENT
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
