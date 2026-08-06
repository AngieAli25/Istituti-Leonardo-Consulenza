const REVIEWS = [
  {
    title: "Una scuola che cambia la vita (in meglio)",
    text: "Mio figlio ha finito il biennio con buoni voti. Non voleva studiare e ora è felice di andare a scuola. Per noi è cambiata la vita in meglio.",
    author: "Annunziata Emanuela Pino",
    role: "Genitore",
  },
  {
    title: "Da insuccessi scolastici a quattro anni superati al liceo",
    text: "Mio figlio era convinto di non valere. Ora ha superato quattro anni. Grazie allo staff per aver ridato fiducia e autostima.",
    author: "Rossella Creco",
    role: "Genitore",
  },
  {
    title: "Una seconda possibilità che diventa successo",
    text: "Dopo due scuole negative, mio figlio ha recuperato due anni in un ambiente sereno e propositivo. Ha riacquistato fiducia.",
    author: "Francesca Pomati",
    role: "Genitore",
  },
  {
    title: "Dalla sfiducia alla maturità",
    text: "Dopo un percorso turbolento, la scuola ha accolto mio figlio con un piano personalizzato che gli ha permesso di raggiungere la maturità.",
    author: "Cristina Cristiano",
    role: "Genitore",
  },
  {
    title: "Dal sogno al diploma dopo 30 anni",
    text: "Ho terminato gli studi dopo 30 anni. Mi sono diplomato con ottimi voti lavorando e avendo famiglia.",
    author: "Marco Santaniello",
    role: "Studente adulto",
  },
  {
    title: "Umanità, attenzione e disponibilità totale",
    text: "Mi sono affidata a questa realtà. Tutti si sono messi a disposizione anche in orari impossibili. Mi preparo per la maturità.",
    author: "Simona Sareni",
    role: "Studentessa adulta",
  },
];

/** Testimonianze dal sito ufficiale — prima del form */
export function Reviews() {
  return (
    <section className="bg-brand-muted px-5 py-14 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-brand-blue sm:text-3xl">
            Dicono di noi
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-text">
            Il punto di vista dei nostri studenti ed ex studenti: chi ha studiato
            e raggiunto i suoi obiettivi con Istituti Leonardo Milano.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <li
              key={r.author}
              className="flex flex-col rounded-2xl bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="mb-3 flex gap-0.5 text-brand-red" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <h3 className="text-base font-bold leading-snug text-brand-blue">
                “{r.title}”
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-text">
                {r.text}
              </p>
              <p className="mt-5 text-sm font-semibold text-brand-text">
                {r.author}
                <span className="font-normal text-brand-text/60">
                  {" "}
                  · {r.role}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
