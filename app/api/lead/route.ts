import { NextResponse } from "next/server";

type LeadPayload = {
  nome?: string;
  cognome?: string;
  email?: string;
  telefono?: string;
  percorso?: string;
  note?: string;
};

/**
 * Endpoint placeholder per l'invio lead.
 * TODO: collegare invio form al CRM (Formspree / webhook / CRM interno).
 * Il campo "percorso" è obbligatorio nel payload per la qualifica del lead.
 */
export async function POST(request: Request) {
  let body: LeadPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Payload non valido" }, { status: 400 });
  }

  const { nome, cognome, email, telefono, percorso } = body;

  if (!nome?.trim() || !cognome?.trim() || !email?.trim() || !telefono?.trim() || !percorso?.trim()) {
    return NextResponse.json(
      { error: "Campi obbligatori mancanti" },
      { status: 400 },
    );
  }

  // Placeholder: log in console in sviluppo. Sostituire con integrazione reale.
  console.log("[lead]", {
    nome: nome.trim(),
    cognome: cognome.trim(),
    email: email.trim(),
    telefono: telefono.trim(),
    percorso: percorso.trim(),
    note: body.note?.trim() || "",
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
