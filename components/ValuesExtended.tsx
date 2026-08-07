import { CtaButton } from "./CtaButton";

const VALUES = [
  {
    title: "Un Percorso Costruito su di Te",
    text: "Ogni studente ha esigenze diverse: creiamo un piano di studio personalizzato per accompagnarti passo dopo passo verso il diploma.",
  },
  {
    title: "Massima Flessibilità",
    text: "Orari flessibili e didattica adattabile: studi in base ai tuoi impegni, senza rinunciare ai tuoi ritmi.",
  },
  {
    title: "Docenti Qualificati",
    text: "Insegnanti esperti che garantiscono un apprendimento di qualità e ti guidano verso il recupero.",
  },
  {
    title: "Supporto Dedicato BES e DSA",
    text: "Strumenti, tutor e percorsi personalizzati che rispettano tempi e modalità di ogni studente.",
  },
  {
    title: "Pagamenti Accessibili",
    text: "Piani dilazionati e detraibili, per rendere il percorso economicamente sostenibile.",
  },
  {
    title: "Strutture all'Avanguardia",
    text: "Aule moderne e ben attrezzate, per studiare in un ambiente confortevole e tecnologicamente avanzato.",
  },
];

/** SEZIONE 5 — Valori estesi + CTA intermedia */
export function ValuesExtended() {
  return (
    <section className="bg-white px-5 py-14 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <ul className="space-y-8">
          {VALUES.map((v) => (
            <li key={v.title} className="flex gap-4">
              <span
                className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-red text-sm font-bold text-white"
                aria-hidden
              >
                ✓
              </span>
              <div>
                <h3 className="text-lg font-bold text-brand-red">{v.title}</h3>
                <p className="mt-1.5 text-base leading-relaxed text-brand-text">
                  {v.text}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <CtaButton href="#prenota">Prenota la tua consulenza gratuita</CtaButton>
        </div>
      </div>
    </section>
  );
}
