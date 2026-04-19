import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata = {
  title: "[TITLE Placeholder] Contact Us",
  description: "[DESC Placeholder] Contact MTDT",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-blueprint pt-24 pb-32">
        <section className="container max-w-4xl px-4 mx-auto">
          <div className="border-l-8 border-primary pl-6 mb-16">
            <h1 className="font-black text-6xl uppercase tracking-tighter text-foreground">CONTACT</h1>
            <p className="font-mono text-primary tracking-widest mt-4">{`>> AWAITING_INPUT_PARAMETERS`}</p>
          </div>
          
          <Card className="p-8 md:p-12 border-border bg-card shadow-none">
            <h2 className="font-black text-2xl uppercase mb-8">{`[INSERT_CONTACT_INTRO]`}</h2>
            <form className="flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-3">
                  <label htmlFor="name" className="font-mono text-sm uppercase text-muted-foreground tracking-widest">Name</label>
                  <input type="text" id="name" placeholder="John Doe" className="h-14 bg-background border border-border px-4 font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all rounded-none" />
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="email" className="font-mono text-sm uppercase text-muted-foreground tracking-widest">Email</label>
                  <input type="email" id="email" placeholder="john@example.com" className="h-14 bg-background border border-border px-4 font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all rounded-none" />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="message" className="font-mono text-sm uppercase text-muted-foreground tracking-widest">Message</label>
                <textarea id="message" rows={6} placeholder="How can we build your machine?" className="bg-background border border-border p-4 font-medium resize-y focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all rounded-none"></textarea>
              </div>
              <Button type="submit" variant="default" size="lg" className="w-full h-16 font-black uppercase tracking-widest text-lg mt-4">
                TRANSMIT MESSAGE
              </Button>
            </form>
          </Card>
        </section>
      </main>
      <Footer />
    </>
  );
}
