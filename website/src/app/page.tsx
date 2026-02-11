import { Navbar } from "./_components/navbar";
import { HeroSection } from "./_components/hero-section";
import { ScrollSequence } from "./_components/scroll-sequence";
import { StatsSection } from "./_components/stats-section";
import { MissionSection } from "./_components/mission-section";
import { WorkSection } from "./_components/work-section";
import { DonationCardsSection } from "./_components/donation-cards-section";
import { CTASection } from "./_components/cta-section";
import { Footer } from "./_components/footer";

export default function Home() {
  return (
    <>
      <main className="relative z-0 min-h-screen">
        <HeroSection />
        <ScrollSequence />
        <StatsSection />
        <MissionSection />
        <WorkSection />
        <DonationCardsSection />
        <CTASection />
        <Footer />
      </main>
      {/* Navbar last in DOM order so it paints above sticky/transformed elements */}
      <Navbar />
    </>
  );
}
