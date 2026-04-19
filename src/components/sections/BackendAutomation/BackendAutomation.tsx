import React from 'react';
import { Button } from '../../ui/Button/Button';
import { Card } from '../../ui/Card/Card';
import styles from './BackendAutomation.module.css';

export function BackendAutomation() {
  return (
    <section id="backend" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.heading}>
            {/* TODO: Insert Backend Automation Title */}
            {`[INSERT_BACKEND_AUTOMATION_H2]`}
          </h2>
          <p className={styles.description}>
            {/* TODO: Insert Backend Automation paragraph */}
            {`[INSERT_BACKEND_AUTOMATION_DESCRIPTION]`}
          </p>
        </div>

        <div className={styles.grid}>
          <Card className={styles.featureCard}>
            <div className={styles.iconPlaceholder}>[ICON]</div>
            <h3 className={styles.featureTitle}>{`[INSERT_BACKEND_BENEFIT_1_TITLE]`}</h3>
            <p className={styles.featureDesc}>{`[INSERT_BACKEND_BENEFIT_1_DESC]`}</p>
          </Card>
          
          <Card className={styles.featureCard}>
            <div className={styles.iconPlaceholder}>[ICON]</div>
            <h3 className={styles.featureTitle}>{`[INSERT_BACKEND_BENEFIT_2_TITLE]`}</h3>
            <p className={styles.featureDesc}>{`[INSERT_BACKEND_BENEFIT_2_DESC]`}</p>
          </Card>

          <Card className={styles.featureCard}>
            <div className={styles.iconPlaceholder}>[ICON]</div>
            <h3 className={styles.featureTitle}>{`[INSERT_BACKEND_BENEFIT_3_TITLE]`}</h3>
            <p className={styles.featureDesc}>{`[INSERT_BACKEND_BENEFIT_3_DESC]`}</p>
          </Card>
        </div>

        <div className={styles.ctaWrapper}>
          <Card glass className={styles.ctaCard}>
            <h3 className={styles.ctaTitle}>{`[INSERT_BACKEND_CTA_TITLE]`}</h3>
            <p className={styles.ctaDesc}>{`[INSERT_BACKEND_CTA_DESC]`}</p>
            <Button variant="primary" href="/contact">
              Book Custom Technical Consultation
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}
