import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { MetaPixel } from "@/components/MetaPixel";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Recupero Anni Scolastici a Milano | Istituti Leonardo",
  description:
    "Recupera gli anni scolastici a Milano con un percorso flessibile e personalizzato. Prenota una consulenza gratuita con Istituti Leonardo Milano.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="it" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans text-brand-text">
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
