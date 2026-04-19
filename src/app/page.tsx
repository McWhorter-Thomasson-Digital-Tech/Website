import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { Hero } from "@/components/sections/Hero/Hero";
import { ReactOffer } from "@/components/sections/ReactOffer/ReactOffer";
import { BackendAutomation } from "@/components/sections/BackendAutomation/BackendAutomation";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ReactOffer />
        <BackendAutomation />
      </main>
      <Footer />
    </>
  );
}