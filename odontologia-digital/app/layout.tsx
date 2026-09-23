import type { Metadata } from "next";
import Script from "next/script";
import { Manrope, Sora } from "next/font/google";
import { META_PIXEL_ID } from "./config";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], weight: ["300", "400", "700"], variable: "--font-sora" });
const manrope = Manrope({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "Odontología Digital | Webinar gratuito con la Dra. Laura Leal",
  description:
    "Clase en vivo y gratuita: La Evolución Digital de tu Consultorio. Incorporá la odontología digital con criterio, sin invertir a ciegas.",
  openGraph: {
    title: "Odontología Digital · Webinar gratuito",
    description: "36 años de experiencia, actualizados. Clase en vivo con la Dra. Laura Leal.",
    images: ["/img/logo-diente.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
