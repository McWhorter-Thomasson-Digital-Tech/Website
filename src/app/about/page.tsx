import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import styles from './page.module.css';

export const metadata = {
  title: "About Us | MTDT Agency",
  description: "Learn about MTDT Agency, led by Matthew McWhorter and Graham Thomasson. We build high-performance websites and custom SaaS platforms.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.container}>
          <div className={styles.header}>
            <p className={styles.label}>About Us</p>
            <h1 className={styles.heading}>About us</h1>
            <p className={styles.subtitle}>
              Meet the team building your digital future.
            </p>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Our mission</h2>
            <p className={styles.cardText}>
              We build digital systems that help you move faster. We focus on business websites, SEO, and custom SaaS platforms.
            </p>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>The architects</h2>
            <p className={styles.cardText}>
              Matthew McWhorter and Graham Thomasson lead a team of full-stack engineers and UI designers.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
