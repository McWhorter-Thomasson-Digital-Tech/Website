import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { Button } from "@/components/ui/Button/Button";
import { Card } from "@/components/ui/Card/Card";

export const metadata = {
  title: "[TITLE Placeholder] Contact Us",
  description: "[DESC Placeholder] Contact MTDT",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section style={{ padding: '6rem 2rem', maxWidth: '800px', margin: '0 auto', backgroundColor: '#F9F5ED', color: '#2A2A2A' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>Contact Us</h1>
          <p style={{ textAlign: 'center', marginBottom: '3rem', opacity: 0.7 }}>{`[INSERT_CONTACT_INTRO]`}</p>
          
          <Card elevated>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="name" style={{ fontWeight: 600 }}>Name</label>
                <input id="name" type="text" placeholder="John Doe" style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid rgba(42,42,42,0.15)', backgroundColor: '#FFFFFF', color: '#2A2A2A' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="email" style={{ fontWeight: 600 }}>Email</label>
                <input id="email" type="email" placeholder="john@example.com" style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid rgba(42,42,42,0.15)', backgroundColor: '#FFFFFF', color: '#2A2A2A' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="message" style={{ fontWeight: 600 }}>Message</label>
                <textarea id="message" rows={5} placeholder="How can we help you?" style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid rgba(42,42,42,0.15)', resize: 'vertical', backgroundColor: '#FFFFFF', color: '#2A2A2A' }}></textarea>
              </div>
              <Button type="submit" variant="primary" fullWidth>Send Message</Button>
            </form>
          </Card>
        </section>
      </main>
      <Footer />
    </>
  );
}
