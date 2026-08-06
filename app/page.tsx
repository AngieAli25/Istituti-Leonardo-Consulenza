import { BookingSection } from "@/components/BookingSection";
import { Empathy } from "@/components/Empathy";
import { FooterInfo } from "@/components/FooterInfo";
import { Hero } from "@/components/Hero";
import { PathMessage } from "@/components/PathMessage";
import { Reviews } from "@/components/Reviews";
import { StickyCta } from "@/components/StickyCta";
import { StrengthsGrid } from "@/components/StrengthsGrid";
import { ValuesExtended } from "@/components/ValuesExtended";

/**
 * Landing page lead gen — Prenota consulenza
 * Istituti Leonardo Milano
 */
export default function Home() {
  return (
    <>
      <main className="flex-1 pb-20 md:pb-0">
        <Hero />
        <Empathy />
        <PathMessage />
        <StrengthsGrid />
        <ValuesExtended />
        <Reviews />
        <BookingSection />
        <FooterInfo />
      </main>
      <StickyCta />
    </>
  );
}
