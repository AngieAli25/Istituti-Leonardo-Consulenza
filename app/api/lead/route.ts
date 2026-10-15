import { NextResponse } from "next/server";

const WEBHOOK_URL =
  "https://automations.wolfoncloud.com/webhook/50ab3d58-3fc4-4c42-bfa1-d57a03ecec60";

/** Stesso webhook Apps Script di YES Consulenza: foglio "Consulenza" + Relatia. */
const SHEET_RELATIA_URL =
  "https://script.google.com/macros/s/AKfycbwFMck9uhTMXCWz0cIYbOiL2e1cJTnMlmYiJxhJqjV8SYBYYDYg48vfKjXl9-EZgsXk/exec";

type LeadPayload = {
  nome?: string;
  cognome?: string;
  email?: string;
  telefono?: string;
  percorso?: string;
  note?: string;
};

/**
 * Stesso collegamento di YES Consulenza: un invio scrive il foglio "Consulenza"
 * e crea contatto + deal in Relatia (pipeline ISTITUTI LEONARDO MILANO,
 * stage NUOVO CONTATTO). n8n resta solo se lo script non scrive il foglio.
 * Se Relatia fallisce, il foglio resta compilato e la landing riceve ok.
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

  let sheetOk = false;
  let relatia = false;
  try {
    const scriptRes = await fetch(SHEET_RELATIA_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        target: "istituti-leonardo",
        nome: payload.nome,
        cognome: payload.cognome,
        email: payload.email,
        telefono: payload.telefono,
        percorso: payload.percorso,
        note: payload.note,
      }),
    });
    const scriptBody = (await scriptRes.json()) as {
      ok?: boolean;
      sheet?: boolean;
      relatia?: { contact_id?: string } | null;
    };
    sheetOk = scriptRes.ok && scriptBody.ok !== false && scriptBody.sheet !== false;
    relatia = Boolean(scriptBody.relatia);
    if (!sheetOk) {
      console.error("[lead] sheet/relatia error", scriptRes.status, scriptBody);
    }
  } catch (err) {
    console.error("[lead] sheet/relatia fetch failed", err);
  }

  let webhookOk = false;
  if (!sheetOk) {
    try {
      const webhookRes = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      webhookOk = webhookRes.ok;
      if (!webhookRes.ok) {
        console.error("[lead] webhook error", webhookRes.status, await webhookRes.text());
      }
    } catch (err) {
      console.error("[lead] webhook fetch failed", err);
    }
  }

  if (!webhookOk && !sheetOk) {
    return NextResponse.json({ error: "Errore invio lead" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, relatia });
}
