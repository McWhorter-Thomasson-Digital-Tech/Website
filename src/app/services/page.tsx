import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { ReactOffer } from "@/components/sections/ReactOffer/ReactOffer";
import { BackendAutomation } from "@/components/sections/BackendAutomation/BackendAutomation";
import { ServicesCards } from "@/components/sections/ServicesCards/ServicesCards";
import styles from './page.module.css';

export const metadata = {
  title: "Our Services | MTDT Agency",
  description: "Explore our premium services: high-performance business websites, strategic search visibility (AEO/GEO), e-commerce, and custom SaaS platforms.",
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.heroSection}>
          <p className={styles.label}>Our Services</p>
          <h1 className={styles.heading}>
            Premium digital architecture for ambitious teams
          </h1>
          <p className={styles.subtitle}>
            Strategic solutions for complex digital challenges. We partner with you to build high-performance business websites and custom SaaS platforms.
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
