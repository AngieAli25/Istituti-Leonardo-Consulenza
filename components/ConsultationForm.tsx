"use client";

import { FormEvent, useState } from "react";
import { PERCORSI } from "@/lib/percorsi";
import { CtaButton } from "./CtaButton";

type FormState = {
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
  percorso: string;
  note: string;
  privacy: boolean;
};

const INITIAL: FormState = {
  nome: "",
  cognome: "",
  email: "",
  telefono: "",
  percorso: "",
  note: "",
  privacy: false,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = Partial<Record<keyof FormState, string>>;

function validate(data: FormState): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.nome.trim()) errors.nome = "Inserisci il nome";
  if (!data.cognome.trim()) errors.cognome = "Inserisci il cognome";
  if (!data.email.trim()) errors.email = "Inserisci l'email";
  else if (!EMAIL_RE.test(data.email)) errors.email = "Email non valida";
  if (!data.telefono.trim()) errors.telefono = "Inserisci il telefono";
  if (!data.percorso) errors.percorso = "Seleziona un percorso di studi";
  if (!data.privacy) errors.privacy = "Devi accettare l'informativa privacy";
  return errors;
}

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-brand-text shadow-sm transition placeholder:text-gray-400 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20";

/** Form di lead generation con menu percorsi */
export function ConsultationForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError("");

    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);

    try {
      // TODO: collegare invio form al CRM (Formspree / webhook / CRM)
      // Importante: il campo "percorso" deve essere nel payload per qualificare il lead
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome.trim(),
          cognome: form.cognome.trim(),
          email: form.email.trim(),
          telefono: form.telefono.trim(),
          percorso: form.percorso,
          note: form.note.trim(),
        }),
      });

      if (!res.ok) throw new Error("Errore invio");

      // TODO tracking: evento Lead Meta Pixel + Google Ads sul submit riuscito
      // if (typeof window !== 'undefined' && window.fbq) window.fbq('track', 'Lead');
      // if (typeof window !== 'undefined' && window.gtag) window.gtag('event', 'conversion', { ... });

      setSuccess(true);
      setForm(INITIAL);
    } catch {
      setServerError(
        "Si è verificato un problema nell'invio. Riprova o chiamaci direttamente.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div
        className="rounded-2xl border border-brand-blue/20 bg-brand-blue/5 p-6 text-center sm:p-8"
        role="status"
      >
        <p className="text-lg font-semibold text-brand-blue">Grazie!</p>
        <p className="mt-3 text-sm leading-relaxed text-brand-text">
          Abbiamo ricevuto la tua richiesta. Ti ricontatteremo a breve.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="mt-5 text-sm font-semibold text-brand-red underline-offset-4 hover:underline"
        >
          Invia un&apos;altra richiesta
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nome" id="nome" error={errors.nome} required>
          <input
            id="nome"
            name="nome"
            autoComplete="given-name"
            value={form.nome}
            onChange={(e) => update("nome", e.target.value)}
            className={inputClass}
            required
          />
        </Field>
        <Field label="Cognome" id="cognome" error={errors.cognome} required>
          <input
            id="cognome"
            name="cognome"
            autoComplete="family-name"
            value={form.cognome}
            onChange={(e) => update("cognome", e.target.value)}
            className={inputClass}
            required
          />
        </Field>
      </div>

      <Field label="Email" id="email" error={errors.email} required>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className={inputClass}
          required
        />
      </Field>

      <Field label="Telefono" id="telefono" error={errors.telefono} required>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          autoComplete="tel"
          value={form.telefono}
          onChange={(e) => update("telefono", e.target.value)}
          className={inputClass}
          required
        />
      </Field>

      <Field
        label="Percorso di studi di interesse"
        id="percorso"
        error={errors.percorso}
        required
      >
        <select
          id="percorso"
          name="percorso"
          value={form.percorso}
          onChange={(e) => update("percorso", e.target.value)}
          className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 24 24%27 stroke=%27%23215A99%27%3E%3Cpath stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27M19 9l-7 7-7-7%27/%3E%3C/svg%3E')] bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`}
          required
        >
          <option value="" disabled>
            — Seleziona il percorso —
          </option>
          {PERCORSI.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Note" id="note" error={errors.note}>
        <textarea
          id="note"
          name="note"
          rows={3}
          value={form.note}
          onChange={(e) => update("note", e.target.value)}
          className={`${inputClass} resize-y`}
          placeholder="Facoltativo"
        />
      </Field>

      <div>
        <label className="flex items-start gap-3 text-sm text-brand-text">
          <input
            type="checkbox"
            checked={form.privacy}
            onChange={(e) => update("privacy", e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-brand-red accent-brand-red"
            required
          />
          <span>
            Confermo di aver preso visione dell&apos;
            <a
              href="https://www.recuperoanniscolasticiamilano.it/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-blue underline-offset-2 hover:underline"
            >
              informativa sulla privacy
            </a>
          </span>
        </label>
        {errors.privacy && (
          <p className="mt-1 text-xs text-brand-red" role="alert">
            {errors.privacy}
          </p>
        )}
      </div>

      {serverError && (
        <p className="text-sm text-brand-red" role="alert">
          {serverError}
        </p>
      )}

      <CtaButton type="submit" fullWidth disabled={submitting}>
        {submitting ? "Invio in corso…" : "Invia la richiesta"}
      </CtaButton>
    </form>
  );
}

function Field({
  label,
  id,
  error,
  required,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-brand-text">
        {label}
        {required && <span className="text-brand-red"> *</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-brand-red" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
