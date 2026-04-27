import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';
import { DemoClient } from './DemoClient';

export const metadata = {
  title: 'Interactive Demo | Cursor Effects Showcase',
  description:
    'Experience our custom cursor effects in action. Toggle between designs to see what MTDT can bring to your website.',
};

export default function DemoPage() {
  return (
    <>
      <Header />
      <main>
        <DemoClient />
      </main>
      <Footer />
    </>
  );
}
