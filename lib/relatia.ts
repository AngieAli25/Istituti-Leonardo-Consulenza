/**
 * Crea contatto + deal in Relatia, come la landing YES Consulenza.
 * Pipeline: ISTITUTI LEONARDO MILANO
 * Stage iniziale: NUOVO CONTATTO
 *
 * Il token sta in RELATIA_TOKEN (variabile d'ambiente, mai nel repo).
 */

const RELATIA_BASE = "https://yesgroup.relatiacrm.com";
const RELATIA_PIPELINE_ID = "c82d2483-6667-430c-af10-45944f86f5d7";
const RELATIA_STAGE_ID = "43526eae-fea9-45be-88fa-0b24ddfd76de";

export type RelatiaLead = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  percorso: string;
  note: string;
};

type Json = Record<string, unknown>;

async function relatiaFetch(path: string, body: Json, token: string): Promise<Json> {
  const res = await fetch(`${RELATIA_BASE}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Relatia POST ${path} → HTTP ${res.status} ${text}`);
  }

  if (!text) return {};
  return JSON.parse(text) as Json;
}

export async function createRelatiaLead(lead: RelatiaLead): Promise<{ contactId: string }> {
  const token = process.env.RELATIA_TOKEN;
  if (!token) {
    throw new Error("RELATIA_TOKEN mancante");
  }

  const contact = await relatiaFetch(
    "/api/contacts/",
    {
      first_name: lead.firstName,
      last_name: lead.lastName,
      email: lead.email,
      phone: lead.phone,
    },
    token,
  );

  const contactId = contact.id;
  if (typeof contactId !== "string" || !contactId) {
    throw new Error("Relatia: contatto non creato");
  }

  await relatiaFetch(
    "/api/contacts/bulk-create-deals/",
    {
      contact_ids: [contactId],
      pipeline_id: RELATIA_PIPELINE_ID,
      stage_id: RELATIA_STAGE_ID,
    },
    token,
  );

  const noteLines = [
    `Percorso: ${lead.percorso}`,
    lead.note ? `Note: ${lead.note}` : "",
    "Source: landing-consulenza.istitutileonardomilano.it",
  ].filter(Boolean);

  await relatiaFetch(
    "/api/notes/",
    {
      contact: contactId,
      content: noteLines.join("\n"),
    },
    token,
  );

  return { contactId };
}
