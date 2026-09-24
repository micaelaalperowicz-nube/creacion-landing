import type { Metadata } from "next";
import { CalendarDays, Clock } from "lucide-react";
import Countdown from "../components/Countdown";
import Diente3D from "../components/Diente3D";
import { WEBINAR, WHATSAPP_GRUPO } from "../config";

export const metadata: Metadata = {
  title: "¡Ya tenés tu lugar! | Odontología Digital",
  robots: { index: false },
};

export default function Gracias() {
  return (
    <main className="gracias">
      <div className="wrap narrow center">
        <Diente3D size={220} />
        <span className="badge">Registro confirmado</span>
        <h1>
          ¡Listo! <em>Ya tenés tu lugar.</em>
        </h1>
        <p className="lead">
          Te esperamos en <strong>{WEBINAR.nombre}</strong>, la clase en vivo y gratuita con la {WEBINAR.experta}.
          Revisá tu email: ahí vas a recibir el link de acceso.
        </p>
        <ul className="fecha-hora">
          <li>
            <CalendarDays size={18} aria-hidden /> {WEBINAR.fechaTexto}
          </li>
          <li>
            <Clock size={18} aria-hidden /> {WEBINAR.horaTexto} · {WEBINAR.zonaTexto}
          </li>
        </ul>
        <Countdown />
        {WHATSAPP_GRUPO && (
          <a className="btn" href={WHATSAPP_GRUPO} target="_blank" rel="noopener noreferrer">
            Unirme al grupo de WhatsApp
          </a>
        )}
      </div>
    </main>
  );
}
