import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { Card } from "@/components/ui/Card/Card";

export const metadata = {
  title: "[TITLE Placeholder] About Us",
  description: "[DESC Placeholder] About MTDT",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <section style={{ padding: '6rem 2rem', maxWidth: '800px', margin: '0 auto', backgroundColor: '#F9F5ED', color: '#2A2A2A' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center' }}>About Us</h1>
          <Card elevated>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{`[INSERT_ABOUT_MISSION_HEADING]`}</h2>
            <p style={{ lineHeight: 1.6, marginBottom: '2rem' }}>{`[INSERT_ABOUT_MISSION_PARAGRAPH]`}</p>
            
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{`[INSERT_ABOUT_TEAM_HEADING]`}</h2>
            <p style={{ lineHeight: 1.6 }}>{`[INSERT_ABOUT_TEAM_PARAGRAPH]`}</p>
          </Card>
        </section>
      </main>
      <Footer />
    </>
  );
}
