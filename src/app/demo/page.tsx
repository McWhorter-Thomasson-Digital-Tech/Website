import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';
import { DemoClient } from './DemoClient';
import { BusinessCardsDemo } from './BusinessCardsDemo';
import styles from './page.module.css';

export const metadata = {
  title: 'Interactive Demos | MTDT',
  description:
    'Experience our interactive demos including Digital Business Cards and custom cursor effects. See what MTDT can bring to your website.',
};

export default function DemoPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div style={{ textAlign: 'center', maxWidth: '48rem', margin: '0 auto', padding: '0 1.5rem 4rem' }}>
          <h1 style={{ fontSize: '3.75rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: '1.5rem', background: 'linear-gradient(160deg, #f1f5f9 20%, var(--primary) 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Interactive Experiences
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--muted-foreground)', lineHeight: 1.75 }}>
            Explore our cutting-edge capabilities. Test-drive our responsive digital business cards, interactive components, and premium aesthetic effects.
          </p>
        </div>
        <BusinessCardsDemo />
        <DemoClient />
      </main>
      <Footer />
    </>
  );
}
