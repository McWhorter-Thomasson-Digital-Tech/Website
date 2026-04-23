import React from 'react';
import { MonitorSmartphone, Database, ShoppingCart, TrendingUp } from 'lucide-react';
import styles from '@/app/CSS/Modules/Page.module.css';

const Capabilities = () => (
  <section className={styles.capabilities}>
    <h2 className={styles.sectionTitle}>Our Capabilities</h2>
    <div className={styles.grid2}>
      <div className={styles.featureBox}>
        <MonitorSmartphone className={styles.featureIcon} size={40} />
        <div>
          <h3 className={styles.featureTitle}>Website Design</h3>
          <p className={styles.featureText}>
            High-converting, responsive websites optimized for local businesses, contractors, and professional service providers.
          </p>
        </div>
      </div>
      <div className={styles.featureBox}>
        <Database className={styles.featureIcon} size={40} />
        <div>
          <h3 className={styles.featureTitle}>Custom SaaS Development</h3>
          <p className={styles.featureText}>
            End-to-end software application engineering. We build the intuitive UI and scalable backend infrastructure required to launch your product.
          </p>
        </div>
      </div>
      <div className={styles.featureBox}>
        <ShoppingCart className={styles.featureIcon} size={40} />
        <div>
          <h3 className={styles.featureTitle}>Custom E-Commerce</h3>
          <p className={styles.featureText}>
            Bespoke digital storefronts designed for premium brands that demand custom user experiences, seamless checkouts, and maximum conversion rates.
          </p>
        </div>
      </div>
      <div className={styles.featureBox}>
        <TrendingUp className={styles.featureIcon} size={40} />
        <div>
          <h3 className={styles.featureTitle}>SEO & GEO</h3>
          <p className={styles.featureText}>
            Dominate traditional search and AI-driven queries. We utilize Search Engine and Generative Engine Optimization to put your brand in front of high-intent buyers.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Capabilities;
