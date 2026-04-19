import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { Card } from "@/components/ui/card";

export const metadata = {
  title: "[TITLE Placeholder] About Us",
  description: "[DESC Placeholder] About MTDT",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-blueprint pt-24 pb-32">
        <section className="container max-w-4xl px-4 mx-auto">
          <div className="border-l-8 border-primary pl-6 mb-16">
            <h1 className="font-black text-6xl uppercase tracking-tighter text-foreground">ABOUT MTDT</h1>
            <p className="font-mono text-primary tracking-widest mt-4">{`>> DIGITAL_AGENCY_SYSTEM`}</p>
          </div>
          
          <Card className="p-8 md:p-12 border-border bg-card shadow-none">
            <h2 className="font-black text-3xl uppercase mb-6">{`[INSERT_ABOUT_MISSION_HEADING]`}</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">{`[INSERT_ABOUT_MISSION_PARAGRAPH]`}</p>
            
            <h2 className="font-black text-3xl uppercase mb-6 mt-16 pt-8 border-t border-border">{`[INSERT_ABOUT_TEAM_HEADING]`}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed font-medium">{`[INSERT_ABOUT_TEAM_PARAGRAPH]`}</p>
          </Card>
        </section>
      </main>
      <Footer />
    </>
  );
}
