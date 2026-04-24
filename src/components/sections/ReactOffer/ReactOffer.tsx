"use client";

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';
import styles from './ReactOffer.module.css';

const features = [
  '[INSERT_REACT_FEATURE_1]',
  '[INSERT_REACT_FEATURE_2]',
  '[INSERT_REACT_FEATURE_3]',
  '[INSERT_REACT_FEATURE_4]',
];

type BillingCycle = 'monthly' | 'quarterly' | 'annually';

export function ReactOffer() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('annually');

  const pricing: Record<BillingCycle, { price: string; detail: string; savings?: string }> = {
    annually: {
      price: '139',
      detail: 'Billed annually',
      savings: 'Save 30% annually',
    },
    quarterly: {
      price: '159',
      detail: 'Billed quarterly',
      savings: 'Save 20% quarterly',
    },
    monthly: {
      price: '199',
      detail: 'Billed monthly',
      savings: 'none',
    },
  };

  const { price, detail, savings } = pricing[billingCycle];

  const getTranslateX = () => {
    switch (billingCycle) {
      case 'monthly': return '200%';
      case 'quarterly': return '100%';
      case 'annually': return '0%';
      default: return '0%';
    }
  };

  return (
    <section id="react-websites" className={styles.section}>
      <div className={styles.container}>
        
        <div className={styles.sectionHeader}>
          <p className={styles.label}>Frontend Engineering</p>
          <h2 className={styles.title}>High-Velocity React Ecosystems</h2>
          <p className={styles.description}>
            We build immutable frontend architectures that eliminate waterfalls and maximize Core Web Vitals.
          </p>
        </div>
        
        <div className={styles.card}>
          <div className={styles.cardInner}>
            
            <div className={styles.pricingSide}>
              <p className={styles.tierLabel}>High-speed Custom React Website</p>
              
              {/* Billing Toggle (3 Options) */}
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

              <div className={styles.priceContainer}>
                {savings && <span className={styles.saveBadge} data-savings={savings}>{savings}</span>}
                <div className={styles.price}>
                  <span className={styles.currency}>$</span>
                  <span key={price} className={styles.priceValue}>{price}</span>
                  <span className={styles.pricePeriod}>/mo</span>
                </div>
                <p className={styles.billingDetail}>{detail}</p>
              </div>

              <p className={styles.priceDesc}>Scalable architecture for modern innovators.</p>
              
              <Link href="/contact" className={styles.ctaButton}>
                EXECUTE DEPLOYMENT
              </Link>
            </div>
            
            <div className={styles.featuresSide}>
              <p className={styles.featuresLabel}>What&apos;s included</p>
              <ul className={styles.featuresList}>
                {features.map((feature, index) => (
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
      </div>
    </section>
  );
}
