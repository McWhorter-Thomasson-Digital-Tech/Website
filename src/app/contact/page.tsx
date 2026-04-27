import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { ContactForm } from "./ContactForm";
import styles from './page.module.css';

export const metadata = {
  title: "Contact Us | MTDT Agency",
  description: "Connect with MTDT Agency to start your next business website, e-commerce storefront, or SaaS platform project.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.container}>
          <div className={styles.header}>
            <p className={styles.label}>Contact</p>
            <h1 className={styles.heading}>Let&apos;s build together</h1>
            <p className={styles.subtitle}>
              Tell us about your project and we&apos;ll reply within 24 hours.
            </p>
          </div>
          
          <ContactForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
