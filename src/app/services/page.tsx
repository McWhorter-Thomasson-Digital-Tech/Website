import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { ReactOffer } from "@/components/sections/ReactOffer/ReactOffer";
import { BackendAutomation } from "@/components/sections/BackendAutomation/BackendAutomation";
import { ServicesCards } from "@/components/sections/ServicesCards/ServicesCards";
import styles from './page.module.css';

export const metadata = {
  title: "Core Services | High-Velocity Digital Engineering",
  description: "From React Ecosystems to Immutable Backend Pipelines, explore our core software engineering services designed for the digital vanguard.",
};

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

        {/* Dynamic Services Cards leading to core pages */}
        <ServicesCards />

        <ReactOffer />
        <BackendAutomation />
      </main>
      <Footer />
    </>
  );
}
