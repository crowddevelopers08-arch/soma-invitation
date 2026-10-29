import type { Metadata, Viewport } from "next";
import { Beau_Rivage, Cinzel, Cormorant_Garamond, Federo, Imperial_Script, Noto_Serif_Tamil, Ovo } from "next/font/google";
import { invitation } from "@/content/invitation";
import "./globals.css";

const imperial = Imperial_Script({ weight: "400", subsets: ["latin"], variable: "--nf-imperial" });
const beau = Beau_Rivage({ weight: "400", subsets: ["latin"], variable: "--nf-beau" });
const ovo = Ovo({ weight: "400", subsets: ["latin"], variable: "--nf-ovo" });
const cormorant = Cormorant_Garamond({ weight: ["300", "400"], subsets: ["latin"], variable: "--nf-cormorant" });
const cinzel = Cinzel({ weight: ["400", "500"], subsets: ["latin"], variable: "--nf-cinzel" });
const tamil = Noto_Serif_Tamil({ weight: "500", subsets: ["tamil"], variable: "--nf-tamil" });
const federo = Federo({ weight: "400", subsets: ["latin"], variable: "--nf-federo" });

export const metadata: Metadata = {
  title: "The Sacred Garden",
  description: `${invitation.groom} & ${invitation.bride} — wedding invitation`,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f9f0e0",
};

// Keep the invitation's proportions without upscaling or jumping at breakpoints.
// A 480px canvas fits the text and photo; smaller phones scale down continuously.
const zeroScale = `(function(){var d=document.documentElement;function u(){d.style.setProperty('--zs',String(Math.min(1,d.clientWidth/480)));}u();addEventListener('resize',u);if(window.ResizeObserver)new ResizeObserver(u).observe(d);})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fonts = [imperial, beau, ovo, cormorant, cinzel, tamil, federo].map((f) => f.variable).join(" ");
  return (
    <html lang="en" className={fonts} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: zeroScale }} />
      </head>
      <body className="m-0 bg-cream antialiased">{children}</body>
    </html>
  );
}
