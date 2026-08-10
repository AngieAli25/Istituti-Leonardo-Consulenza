import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LOGO_URL } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Richiesta inviata | Istituti Leonardo Milano",
  description:
    "Grazie per aver richiesto la consulenza gratuita. Ti ricontatteremo a breve.",
  robots: { index: false, follow: false },
};

export default function GraziePage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-5 py-16 text-center sm:py-24">
        <div
          className="absolute inset-0 bg-gradient-to-br from-brand-red via-[#a8181e] to-[#6b0f14]"
          aria-hidden
        />
        <div className="absolute inset-0 bg-brand-red/40" aria-hidden />

        <div className="relative mx-auto max-w-lg">
          <Image
            src={LOGO_URL}
            alt="Istituti Leonardo Milano"
            width={88}
            height={88}
            priority
            className="mx-auto mb-8"
          />

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Grazie!
          </h1>
          <p className="mt-5 text-base leading-relaxed text-white/90 sm:text-lg">
            Abbiamo ricevuto la tua richiesta. Un nostro consulente didattico ti
            ricontatterà a breve con tutte le informazioni sul percorso più
            adatto a te.
          </p>

          <div className="mt-8 space-y-3 text-sm text-white/85">
            <p>
              Nel frattempo puoi chiamarci:{" "}
              <a href="tel:+390223189073" className="font-semibold underline-offset-2 hover:underline">
                02 23 189 073
              </a>
              {" · "}
              <a href="tel:+393285987754" className="font-semibold underline-offset-2 hover:underline">
                +39 328 598 7754
              </a>
            </p>
          </div>

          <Link
            href="/"
            className="mt-10 inline-flex items-center justify-center rounded-xl bg-brand-blue px-6 py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-[#1a4a7a] hover:shadow-lg"
          >
            Torna alla home
          </Link>
        </div>
      </section>

      <footer className="bg-brand-red px-5 py-6 text-center text-sm text-white/70">
        © YES Group S.r.l. | Istituti Leonardo Milano
      </footer>
    </main>
  );
}
