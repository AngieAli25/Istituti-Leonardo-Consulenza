import { NextResponse } from "next/server";
import { createRelatiaLead } from "@/lib/relatia";

const WEBHOOK_URL =
  "https://automations.wolfoncloud.com/webhook/50ab3d58-3fc4-4c42-bfa1-d57a03ecec60";

type LeadPayload = {
  nome?: string;
  cognome?: string;
  email?: string;
  telefono?: string;
  percorso?: string;
  note?: string;
};

/**
 * Riceve il form e:
 * - inoltra il lead al webhook esistente
 * - crea contatto + deal in Relatia (pipeline ISTITUTI LEONARDO MILANO, stage NUOVO CONTATTO)
 *
 * Come per YES Consulenza, un errore Relatia non blocca l'invio: il lead resta
 * sul webhook e la landing riceve ok.
 */
export async function POST(request: Request) {
  let body: LeadPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Payload non valido" }, { status: 400 });
  }

  const { nome, cognome, email, telefono, percorso } = body;

  if (
    !nome?.trim() ||
    !cognome?.trim() ||
    !email?.trim() ||
    !telefono?.trim() ||
    !percorso?.trim()
  ) {
    return NextResponse.json(
      { error: "Campi obbligatori mancanti" },
      { status: 400 },
    );
  }

  const payload = {
    nome: nome.trim(),
    cognome: cognome.trim(),
    email: email.trim(),
    telefono: telefono.trim(),
    percorso: percorso.trim(),
    note: body.note?.trim() || "",
    receivedAt: new Date().toISOString(),
  };

  try {
    const webhookRes = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!webhookRes.ok) {
      console.error("[lead] webhook error", webhookRes.status, await webhookRes.text());
      return NextResponse.json(
        { error: "Errore invio webhook" },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[lead] webhook fetch failed", err);
    return NextResponse.json(
      { error: "Errore connessione webhook" },
      { status: 502 },
    );
  }

  let relatia = false;
  try {
    await createRelatiaLead({
      firstName: payload.nome,
      lastName: payload.cognome,
      email: payload.email,
      phone: payload.telefono,
      percorso: payload.percorso,
      note: payload.note,
    });
    relatia = true;
  } catch (err) {
    console.error("[lead] relatia error", err);
  }

  return NextResponse.json({ ok: true, relatia });
}
