import React from 'react';
import { Button } from '../../ui/Button/Button';
import { Card } from '../../ui/Card/Card';
import styles from './ReactOffer.module.css';

export function ReactOffer() {
  return (
    <section id="react-websites" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.copy}>
          <h2 className={styles.heading}>
            {/* TODO: Insert React offer title */}
            {`[INSERT_REACT_OFFER_H2]`}
          </h2>
          <p className={styles.description}>
            {/* TODO: Insert React offer description */}
            {`[INSERT_REACT_OFFER_DESCRIPTION]`}
          </p>
        </div>
        
        <div className={styles.pricingWrapper}>
          <Card elevated className={styles.pricingCard}>
            <div className={styles.priceHeader}>
              <h3 className={styles.tierName}>{`[INSERT_REACT_TIER_NAME]`}</h3>
              <div className={styles.priceContainer}>
                <span className={styles.currency}>$</span>
                <span className={styles.price}>199</span>
                <span className={styles.period}>/mo</span>
              </div>
              <p className={styles.priceDesc}>{`[INSERT_REACT_PRICE_DESC]`}</p>
            </div>
            
            <ul className={styles.featureList}>
              <li>{`[INSERT_REACT_FEATURE_1]`}</li>
              <li>{`[INSERT_REACT_FEATURE_2]`}</li>
              <li>{`[INSERT_REACT_FEATURE_3]`}</li>
              <li>{`[INSERT_REACT_FEATURE_4]`}</li>
            </ul>
            
            <div className={styles.cardAction}>
              <Button variant="primary" fullWidth>
                Start Building
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
