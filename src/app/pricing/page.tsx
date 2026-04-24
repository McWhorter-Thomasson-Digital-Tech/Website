import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { ReactOffer } from "@/components/sections/ReactOffer/ReactOffer";
import { Shield, Globe, Layers } from 'lucide-react';
import styles from './page.module.css';

export const metadata = {
  title: "Pricing & Deployment Packages",
  description: "Transparent resource allocation for high-velocity engineering. Choose the CORE ENGINE or custom immutable pipelines for your mission.",
};

const specs = [
  { icon: Layers, title: 'Immutable Architecture', desc: 'Every deployment is versioned and isolated.' },
  { icon: Globe, title: 'Global Delivery', desc: 'Sub-100ms latency across all geographic zones.' },
  { icon: Shield, title: 'Ironclad Security', desc: 'Real-time threat detection and remediation.' },
];

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.heroSection}>
          <p className={styles.label}>Pricing</p>
          <h1 className={styles.heading}>Transparent, Scalable Pricing</h1>
          <p className={styles.subtitle}>
            High-velocity engineering requires clear, transparent resource allocation. Choose the machine that fits your mission.
          </p>
        </section>

        <ReactOffer />
        
        <section className={styles.specsSection}>
          <h2 className={styles.specsTitle}>Built for Scale</h2>
          <div className={styles.specsGrid}>
            {specs.map((item) => (
              <div key={item.title} className={styles.specCard}>
                <div className={styles.specIcon}>
                  <item.icon />
                </div>
                <h3 className={styles.specTitle}>{item.title}</h3>
                <p className={styles.specDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
