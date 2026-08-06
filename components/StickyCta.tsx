"use client";

import { CtaButton } from "./CtaButton";

/** Sticky CTA mobile — sempre visibile in basso su smartphone */
export function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/5 bg-white/95 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
      <CtaButton href="#prenota" fullWidth className="py-3.5">
        Prenota la consulenza
      </CtaButton>
    </div>
  );
}
