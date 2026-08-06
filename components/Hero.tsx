import Image from "next/image";
import { LOGO_URL } from "@/lib/brand";
import { CtaButton } from "./CtaButton";

/** SEZIONE 1 — Hero above the fold */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Sfondo gradient brand + overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-brand-blue via-[#1a4a7a] to-[#0f2d4a]"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 40%, rgba(222,32,40,0.45), transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15), transparent 40%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1600&q=70')] bg-cover bg-[center_30%] opacity-45"
        aria-hidden
      />
      <div className="absolute inset-0 bg-brand-blue/55" aria-hidden />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-5 pb-16 pt-8 text-center sm:pb-24 sm:pt-12">
        <Image
          src={LOGO_URL}
          alt="Istituti Leonardo Milano"
          width={88}
          height={88}
          priority
          className="mb-8"
        />

        <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
          Ricomincia con un percorso su misura per te
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
          Da Istituti Leonardo Milano recuperi gli anni scolastici e ottieni il
          diploma con serenità, con il supporto di un team qualificato al tuo
          fianco.
        </p>

        <div className="mt-8">
          <CtaButton href="#prenota" className="text-lg px-8 py-4 shadow-xl">
            Prenota la tua consulenza gratuita
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
