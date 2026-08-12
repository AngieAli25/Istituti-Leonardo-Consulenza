export const META_PIXEL_ID = "624499183570293";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Evento Lead su submit form riuscito */
export function trackMetaLead() {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Lead");
  }
}
