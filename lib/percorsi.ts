/** Percorsi di studio — ordine esatto dal brief */
export const PERCORSI = [
  "Liceo Scientifico",
  "Liceo Linguistico",
  "Liceo Scienze Umane",
  "Liceo Classico",
  "Liceo Artistico",
  "Liceo Artistico – Indirizzo Arti Figurative",
  "Liceo Artistico – Design Moda",
  "Istituto Socio Sanitario",
  "Amministrazione Finanza & Marketing (AFM)",
  "Istituto Tecnico Economico Turistico",
  "Costruzioni Ambiente & Territorio (ex Geometra)",
  "Informatica & Telecomunicazioni",
  "Alberghiero",
  "Trasporti e Logistica",
] as const;

export type Percorso = (typeof PERCORSI)[number];
