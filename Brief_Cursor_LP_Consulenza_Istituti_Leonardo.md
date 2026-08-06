# Brief per Cursor — Landing Page "Richiedi la tua Consulenza"
## Istituti Leonardo Milano

---

## 1. Obiettivo

Costruire una **landing page di lead generation** collegata alle campagne Meta/Google Ads sul recupero anni scolastici. Obiettivo unico: **far prenotare una consulenza gratuita** e raccogliere il contatto qualificato con l'indirizzo di studio d'interesse.

La pagina è **standalone**, una schermata scrollabile, orientata alla conversione. Due strumenti di conversione lavorano insieme: il **form con menu a tendina dei percorsi** e il **calendario di prenotazione**.

---

## 2. Stack tecnico

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS**
- Componenti in `/components`, pagina in `/app/page.tsx`
- Mobile-first (il traffico arriva quasi tutto da smartphone via ads)
- Contenuti hardcoded, nessun CMS

---

## 3. Brand & design system

**Colori (CSS variables / config Tailwind):**
- Rosso primario: `#DE2028` — CTA, accenti, urgenza, titoli chiave
- Blu secondario: `#215A99` — sezioni informative, box valori, footer, testi di supporto
- Neutri: bianco `#FFFFFF`, grigio testo `#333333`, grigio chiaro sfondi `#F5F5F5`

**Regola cromatica:** rosso = azione, blu = affidabilità. Alternare le sezioni per ritmo visivo, senza mischiare i due colori pieni nello stesso blocco.

**Logo:** `https://www.recuperoanniscolasticiamilano.it/wp-content/uploads/2024/08/Logo-Leonardo-100x100-2.png`

**Tipografia:** sans-serif pulita (Poppins o Inter). Titoli bold, corpo regular.

**Stile:** moderno, arioso, `rounded-xl`/`rounded-2xl`, ombre morbide, molto spazio bianco. Tono accogliente e rassicurante — la leva emotiva è "ritrovare fiducia e sicurezza", non solo recuperare anni.

---

## 4. Struttura della pagina (sezioni in ordine)

### SEZIONE 1 — Hero (above the fold)
- Logo in alto
- **H1:** "Ricomincia con un percorso su misura per te"
- Sottotitolo: *"Da Istituti Leonardo Milano recuperi gli anni scolastici e ottieni il diploma con serenità, con il supporto di un team qualificato al tuo fianco."*
- **CTA primaria (bottone rosso):** "Prenota la tua consulenza gratuita" → scroll ancorato al form/calendario
- Sfondo con immagine/gradiente brand + overlay per leggibilità

### SEZIONE 2 — Empatia / "Ti riconosci in questo?" (opzionale ma consigliata)
Breve blocco che intercetta il bisogno prima di proporre la soluzione. Testo tipo:
*"Orari rigidi, poca flessibilità, la paura di perdere altro tempo. Difficoltà passate che hanno intaccato la fiducia. Da noi tutto questo può cambiare."*
Chiude con micro-CTA verso il form.

### SEZIONE 3 — "Un percorso costruito su di te" (messaggio centrale)
Testo portante (dal sito, adattato):
*"Il nostro obiettivo non è solo recuperare gli anni scolastici, ma aiutarti a ritrovare sicurezza, fiducia e voglia di rimetterti in gioco. Ti offriamo un percorso di studio flessibile e personalizzato, pensato per farti conseguire il diploma con serenità."*

### SEZIONE 4 — Punti di forza (griglia card)
Sottotitolo: *"Cosa troverai da Istituti Leonardo Milano"*

Griglia di card con icona + titolo (icone blu `#215A99`, layout 1 col mobile / 2-3 col desktop):
- **Gruppi piccoli e seguiti**
- **Docenti preparati e presenti**
- **Lezioni di qualità**
- **Attenzione concreta allo studente**
- **Ambienti moderni, sereni e accoglienti**
- **Supporto BES e DSA**
- **In presenza e Online**
- **Per studenti delle superiori e adulti lavoratori**
- **Pagamenti dilazionati**

> **Nota su quanti punti mostrare:** consiglio di tenerli **tutti** ma in formato card compatto (icona + titolo breve, senza descrizione lunga): danno il senso di completezza dell'offerta senza appesantire. La versione "estesa" dei valori la mettiamo subito sotto (Sezione 5) su 4-6 blocchi chiave.

### SEZIONE 5 — Valori estesi (blocchi con descrizione)
Selezione dei valori più forti dal sito, in formato icona-check + titolo + testo breve. Consiglio questi 4-6:

1. **Un Percorso Costruito su di Te** — Ogni studente ha esigenze diverse: creiamo un piano di studio personalizzato per accompagnarti passo dopo passo verso il diploma.
2. **Massima Flessibilità** — Orari flessibili e didattica adattabile: studi in base ai tuoi impegni, senza rinunciare ai tuoi ritmi.
3. **Docenti Qualificati** — Insegnanti esperti che garantiscono un apprendimento di qualità e ti guidano verso il recupero.
4. **Supporto Dedicato BES e DSA** — Strumenti, tutor e percorsi personalizzati che rispettano tempi e modalità di ogni studente.
5. **Pagamenti Accessibili** — Piani dilazionati e detraibili, per rendere il percorso economicamente sostenibile.
6. **Strutture all'Avanguardia** — Aule moderne e ben attrezzate, per studiare in un ambiente confortevole e tecnologicamente avanzato.

### SEZIONE 6 — Form + Calendario (cuore della pagina)
Titolo: "Prenota la tua consulenza gratuita" + `id="prenota"` per l'ancora.
Testo sopra: *"Compila il form e scegli il momento più comodo: un nostro consulente didattico ti darà tutte le informazioni sul percorso più adatto a te."*

**Campi form:**
- Nome *(obbligatorio)*
- Cognome *(obbligatorio)*
- Email *(obbligatorio, con validazione)*
- Telefono *(obbligatorio)*
- **Percorso di studi di interesse *(obbligatorio — menu a tendina)*** con queste opzioni **esatte**, nell'ordine:
  1. Liceo Scientifico
  2. Liceo Linguistico
  3. Liceo Scienze Umane
  4. Liceo Classico
  5. Liceo Artistico
  6. Liceo Artistico – Indirizzo Arti Figurative
  7. Liceo Artistico – Design Moda
  8. Istituto Socio Sanitario
  9. Amministrazione Finanza & Marketing (AFM)
  10. Istituto Tecnico Economico Turistico
  11. Costruzioni Ambiente & Territorio (ex Geometra)
  12. Informatica & Telecomunicazioni
  13. Alberghiero
  14. Trasporti e Logistica
  - *(placeholder iniziale non selezionabile: "— Seleziona il percorso —")*
- Note *(facoltativo, textarea)*
- Checkbox privacy *(obbligatoria):* "Confermo di aver preso visione dell'[informativa sulla privacy](https://www.recuperoanniscolasticiamilano.it/privacy-policy/)"

**Calendario di prenotazione:**
- Embed **Calendly inline** sotto o a fianco del form (layout 2 colonne desktop: form a sinistra, calendario a destra; impilati su mobile).
- Lasciare l'URL Calendly come costante configurabile in cima al componente: `const CALENDLY_URL = "https://calendly.com/..."; // TODO: inserire link reale`
- **Blocco sostituibile:** se in futuro si usa un altro sistema di prenotazione, isolare il calendario in un componente `<BookingCalendar />` così da poterlo scambiare senza toccare il resto.

**Bottone submit (rosso `#DE2028`):** "Invia la richiesta"
**Thank-you state:** *"Grazie! Abbiamo ricevuto la tua richiesta. Ti ricontatteremo a breve — se non l'hai già fatto, scegli lo slot per la consulenza qui sopra."*

### SEZIONE 7 — Info pratiche + Footer
- **Sede:** Via Marco Aurelio 8, Milano (Pasteur M1) — mini mappa embed opzionale
- **Contatti:** Tel. 02 23 189 073 · +39 328 598 7754 · info@istitutileonardomilano.it
- CTA finale (bottone rosso) verso il form
- Footer: logo + "© YES Group S.r.l. | Istituti Leonardo Milano"

---

## 5. Note tecniche per lo sviluppo

- **Sticky CTA su mobile:** bottone fisso in basso "Prenota la consulenza" che scrolla al form
- **Invio form:** predisporre endpoint (API route Next.js / Formspree / webhook). Placeholder chiaro `// TODO: collegare invio form al CRM`. Importante: il valore del menu a tendina "percorso" deve essere incluso nel payload (serve per la qualifica del lead)
- **Tracking:** predisporre Meta Pixel e Google Ads tag, evento `Lead` sul submit riuscito (e, se possibile, evento distinto sul completamento della prenotazione Calendly). Placeholder commentati
- **Validazione client-side:** tutti gli obbligatori + email valida + tendina selezionata + privacy spuntata
- **SEO base:** `<title>` "Recupero Anni Scolastici a Milano | Istituti Leonardo" + meta description dedicata
- **Performance:** next/image, lazy loading, Calendly caricato in modo da non bloccare il render iniziale
- **Accessibilità:** label su tutti i campi (incluso il select), focus states, contrasto adeguato

---

## 6. Priorità di conversione

1. Hero con promessa chiara + CTA
2. Doppia conversione: form qualificante (con percorso) **+** calendario prenotazione affiancati
3. CTA ripetuta almeno 3 volte (hero, dopo i valori, footer)
4. Menu a tendina percorsi ben visibile: è il dato che qualifica il lead
5. Zero distrazioni: nessun link esterno tranne privacy policy

---

*Prompt d'apertura suggerito per Cursor:*
> "Crea una landing page in Next.js (App Router) + TypeScript + Tailwind seguendo questo brief. Mobile-first, una sola pagina scrollabile. Include un form con menu a tendina dei percorsi di studio e un embed Calendly affiancato per la prenotazione consulenza. Colori brand: rosso #DE2028 e blu #215A99. Isola il calendario in un componente BookingCalendar riutilizzabile. Genera struttura componenti pulita e commentata."
