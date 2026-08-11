"use client";

/** SEZIONE 2 — Empatia: intercetta il bisogno */
export function Empathy() {
  return (
    <section className="bg-brand-muted px-5 py-14 sm:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-red">
          Ti riconosci in questo?
        </p>
        <p className="mt-4 text-lg leading-relaxed text-brand-text sm:text-xl">
          Poca flessibilità, classi troppo numerose, la sensazione di non
          venire davvero ascoltato quando qualcosa non torna. Manca supporto e
          attenzione didattica, e la fiducia ne risente. Da noi tutto questo può
          cambiare.
        </p>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("prenota")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="mt-6 inline-block text-sm font-semibold text-brand-blue underline-offset-4 hover:underline"
        >
          Parliamone insieme →
        </a>
      </div>
    </section>
  );
}
