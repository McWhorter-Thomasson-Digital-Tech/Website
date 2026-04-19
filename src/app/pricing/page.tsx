import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { ReactOffer } from "@/components/sections/ReactOffer/ReactOffer";

export const metadata = {
  title: "[TITLE Placeholder] Pricing",
  description: "[DESC Placeholder] Pricing Plans",
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <main>
        <div style={{ padding: '6rem 2rem', textAlign: 'center', backgroundColor: '#5E83AE', color: '#FFFFFF' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Pricing Plans</h1>
          <p style={{ marginTop: '1rem', opacity: 0.8 }}>{`[INSERT_PRICING_INTRO_PARAGRAPH]`}</p>
        </div>
        <ReactOffer />
      </main>
      <Footer />
    </>
  );
}
