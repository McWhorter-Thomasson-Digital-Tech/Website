import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
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
          
          <div className={styles.card}>
            <form className={styles.form}>
              <div className={styles.fieldGrid}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="name" className={styles.fieldLabel}>Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="Your name" 
                    className={styles.input} 
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label htmlFor="email" className={styles.fieldLabel}>Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="you@example.com" 
                    className={styles.input} 
                  />
                </div>
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="message" className={styles.fieldLabel}>Message</label>
                <textarea 
                  id="message" 
                  rows={6} 
                  placeholder="Tell us about your project..." 
                  className={styles.textarea}
                />
              </div>
              <button type="submit" className={styles.submitButton}>
                Send message
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
