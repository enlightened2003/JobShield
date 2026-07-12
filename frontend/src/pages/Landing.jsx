import Hero from "../components/landing/Hero";
import TechStack from "../components/landing/TechStack";
import Features from "../components/landing/Features";
import LiveDemo from "../components/landing/LiveDemo";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

export default function Landing() {
  return (
    <main className="overflow-hidden">

      <Hero />

      <TechStack />

      <Features />

      <LiveDemo />

      <CTA />

      <Footer />

    </main>
  );
}