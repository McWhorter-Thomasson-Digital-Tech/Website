import React from 'react';
import { Zap, Code2, MapPin } from 'lucide-react';
import styles from '@/app/CSS/Modules/Page.module.css';

const ValueProps = () => (
  <section className={styles.valueProps}>
    <div className={styles.grid3}>
      <div className={styles.card}>
        <Zap className={styles.cardIcon} size={32} />
        <h3 className={styles.cardTitle}>Speed & Architecture</h3>
        <p className={styles.cardText}>
          Sub-second load times built on Next.js. We ensure your business platform outpaces competitors and captures maximum traffic.
        </p>
      </div>
      <div className={styles.card}>
        <Code2 className={styles.cardIcon} size={32} />
        <h3 className={styles.cardTitle}>Full-Stack Engineering</h3>
        <p className={styles.cardText}>
          From pixel-perfect frontends to robust backend database architecture, we write bespoke code to bring your vision to life.
        </p>
      </div>
      <div className={styles.card}>
        <MapPin className={styles.cardIcon} size={32} />
        <h3 className={styles.cardTitle}>Local Partnership</h3>
        <p className={styles.cardText}>
          We are your dedicated digital growth partners in Central Virginia, providing direct communication without the agency runaround.
        </p>
      </div>
    </div>
  </section>
);

export default ValueProps;
