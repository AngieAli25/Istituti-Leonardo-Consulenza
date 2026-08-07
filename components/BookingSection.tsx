import { ConsultationForm } from "./ConsultationForm";

/** SEZIONE 6 — Form lead (prenota consulenza) */
export function BookingSection() {
  return (
    <section id="prenota" className="scroll-mt-4 bg-white px-5 py-14 sm:py-20">
      <div className="mx-auto max-w-xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-brand-red sm:text-3xl">
            Prenota la tua consulenza gratuita
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-text">
            Compila il form: un nostro consulente didattico ti ricontatterà con
            tutte le informazioni sul percorso più adatto a te.
          </p>
        </div>

        <div className="mt-10 rounded-2xl bg-brand-muted p-5 shadow-sm sm:p-8">
          <ConsultationForm />
        </div>
      </div>
    </section>
  );
}
