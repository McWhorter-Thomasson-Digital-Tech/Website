import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { ReactOffer } from "@/components/sections/ReactOffer/ReactOffer";
import { BackendAutomation } from "@/components/sections/BackendAutomation/BackendAutomation";

export const metadata = {
  title: "[TITLE Placeholder] Services",
  description: "[DESC Placeholder] Our Services",
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <div style={{ padding: '6rem 2rem', textAlign: 'center', backgroundColor: '#2A2A2A', color: '#FFFFFF' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Our Services</h1>
          <p style={{ marginTop: '1rem', opacity: 0.8 }}>{`[INSERT_SERVICES_INTRO_PARAGRAPH]`}</p>
        </div>
        <ReactOffer />
        <BackendAutomation />
      </main>
      <Footer />
    </>
  );
}
