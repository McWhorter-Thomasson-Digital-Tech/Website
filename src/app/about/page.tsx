import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import styles from './page.module.css';

export const metadata = {
  title: "About MTDT | Digital Engineering Architects",
  description: "Learn about MTDT (McWhorter-Thomasson Digital Technologies), led by Matthew McWhorter and Graham Thomasson. We build digital machines that accelerate innovation.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.container}>
          <div className={styles.header}>
            <p className={styles.label}>About Us</p>
            <h1 className={styles.heading}>Digital Engineering Architects</h1>
            <p className={styles.subtitle}>
              Get to know the team building the next generation of digital infrastructure.
            </p>
          </div>
          
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Our Mission</h2>
            <p className={styles.cardText}>
              We operate at the intersection of raw engineering and architectural aesthetics. MTDT (McWhorter-Thomasson Digital Technologies) builds digital machines that accelerate human innovation through high-velocity React ecosystems and immutable backend pipelines.
            </p>
          </div>
          
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>The Architects</h2>
            <p className={styles.cardText}>
              Led by Matthew McWhorter and Graham Thomasson, our collective is composed of specialized architects, automation experts, and UI engineers who refuse to accept generic solutions.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
