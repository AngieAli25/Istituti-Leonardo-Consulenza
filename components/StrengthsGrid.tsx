/** Icone SVG minimali per i punti di forza (blu brand) */
function Icon({ d }: { d: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-brand-red"
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}

const STRENGTHS = [
  {
    title: "Gruppi piccoli e seguiti",
    path: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  },
  {
    title: "Docenti preparati e presenti",
    path: "M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c3 3 9 3 12 0v-5",
  },
  {
    title: "Lezioni di qualità",
    path: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
  },
  {
    title: "Attenzione concreta allo studente",
    path: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  },
  {
    title: "Ambienti moderni, sereni e accoglienti",
    path: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10",
  },
  {
    title: "Supporto BES e DSA",
    path: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  },
  {
    title: "In presenza e Online",
    path: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  },
  {
    title: "Per studenti delle superiori e adulti lavoratori",
    path: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  },
  {
    title: "Pagamenti dilazionati",
    path: "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  },
];

/** SEZIONE 4 — Punti di forza (card compatte) */
export function StrengthsGrid() {
  return (
    <section className="bg-brand-muted px-5 py-14 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-bold text-brand-red sm:text-3xl">
          Cosa troverai da Istituti Leonardo Milano
        </h2>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STRENGTHS.map((item) => (
            <li
              key={item.title}
              className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm"
            >
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-red/10">
                <Icon d={item.path} />
              </span>
              <span className="pt-2 text-sm font-semibold leading-snug text-brand-text">
                {item.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
