import Image from "next/image";
import { LOGO_URL } from "@/lib/brand";
import { BrandMark } from "./BrandMark";
import { CtaButton } from "./CtaButton";

/** SEZIONE 7 — Info pratiche + Footer */
export function FooterInfo() {
  return (
    <footer className="bg-brand-blue text-white">
      <div className="mx-auto max-w-4xl px-5 py-14 text-center sm:py-16">
        <BrandMark />
        <h2 className="text-xl font-bold sm:text-2xl">Vieni a trovarci</h2>

        <p className="mt-4 text-base text-white/90">
          Via Marco Aurelio 8, Milano (Pasteur M1)
        </p>

        <div className="mt-4 space-y-1 text-sm text-white/85">
          <p>
            Tel.{" "}
            <a href="tel:+390223189073" className="underline-offset-2 hover:underline">
              02 23 189 073
            </a>
            {" · "}
            <a href="tel:+393285987754" className="underline-offset-2 hover:underline">
              +39 328 598 7754
            </a>
          </p>
          <p>
            <a
              href="mailto:info@istitutileonardomilano.it"
              className="underline-offset-2 hover:underline"
            >
              info@istitutileonardomilano.it
            </a>
          </p>
        </div>

        {/* Mini mappa embed */}
        <div className="mx-auto mt-8 max-w-lg overflow-hidden rounded-2xl shadow-lg">
          <iframe
            title="Mappa sede Istituti Leonardo Milano"
            src="https://maps.google.com/maps?q=Via%20Marco%20Aurelio%208%2C%20Milano&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="h-48 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <div className="mt-8">
          <CtaButton href="#prenota">Prenota la consulenza gratuita</CtaButton>
        </div>
      </div>

      <div className="border-t border-white/15 px-5 py-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <Image
            src={LOGO_URL}
            alt="Istituti Leonardo Milano"
            width={80}
            height={80}
          />
          <p className="text-center text-base text-white/80 sm:text-right">
            © YES Group S.r.l. | Istituti Leonardo Milano
          </p>
        </div>
      </div>
    </footer>
  );
}
