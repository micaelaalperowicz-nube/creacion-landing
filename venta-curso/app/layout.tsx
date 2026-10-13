import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Manrope, Sora } from "next/font/google";
import { META_PIXEL_ID } from "./config";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], weight: ["300", "400", "700"], variable: "--font-sora" });
const manrope = Manrope({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-manrope" });

const TITULO = "Odontología Digital, la Nueva Era | Curso online con la Dra. Laura Leal";
const DESCRIPCION =
  "Ocho clases grabadas, acceso por dos años, certificado de finalización y tres bonos. Solo 200 lugares: inscripciones hasta el 15/10 a las 23:59, hora de Argentina.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: TITULO,
  description: DESCRIPCION,
  openGraph: {
    title: "Odontología Digital, la Nueva Era",
    description: DESCRIPCION,
    type: "website",
    locale: "es_AR",
    images: [{ url: "/img/og-curso.jpg", width: 1200, height: 630, alt: "Dra. Laura Leal" }],
  },
  twitter: { card: "summary_large_image", title: "Odontología Digital, la Nueva Era", description: DESCRIPCION, images: ["/img/og-curso.jpg"] },
};

export const viewport: Viewport = { themeColor: "#0b1d33" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${sora.variable} ${manrope.variable}`}>
      <body>
        {META_PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
          </Script>
        )}
        {children}
      </body>
    </html>
  );
}
