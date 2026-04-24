import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { ReactOffer } from "@/components/sections/ReactOffer/ReactOffer";
import { BackendAutomation } from "@/components/sections/BackendAutomation/BackendAutomation";
import { ArrowRight } from 'lucide-react';
import styles from './page.module.css';

export const metadata = {
  title: "Core Services | High-Velocity Digital Engineering",
  description: "From React Ecosystems to Immutable Backend Pipelines, explore our core software engineering services designed for the digital vanguard.",
};

const services = [
  { title: 'React Ecosystems', desc: 'High-velocity, immutable frontend architectures built for scale and performance.', tag: 'Frontend' },
  { title: 'Backend Pipelines', desc: 'Robust, serverless automation and data orchestration using modern CI/CD patterns.', tag: 'Backend' },
  { title: 'Technical Strategy', desc: 'Architectural consulting for high-growth technical teams navigating complex stacks.', tag: 'Consulting' },
  { title: 'Performance Audits', desc: 'Deep-dive analytical reporting and optimization for mission-critical applications.', tag: 'Analytics' },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.heroSection}>
          <p className={styles.label}>Our Services</p>
          <h1 className={styles.heading}>
            Engineering Precision for the Digital Vanguard
          </h1>
          <p className={styles.subtitle}>
            High-velocity solutions for complex technical challenges. From frontend to backend, we architect systems that scale.
          </p>
        </section>

        <section className={styles.cardsSection}>
          <div className={styles.cardsGrid}>
            {services.map((service) => (
              <div key={service.title} className={styles.card}>
                <span className={styles.cardTag}>{service.tag}</span>
                <h2 className={styles.cardTitle}>{service.title}</h2>
                <p className={styles.cardDesc}>{service.desc}</p>
                <div className={styles.cardArrow}>
                  Learn more <ArrowRight />
                </div>
              </div>
            ))}
          </div>
        </section>

        <ReactOffer />
        <BackendAutomation />
      </main>
      <Footer />
    </>
  );
}
