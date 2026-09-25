import type { Metadata } from "next";
import { CalendarDays, Clock, MessageCircle } from "lucide-react";
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
        </p>
        <ul className="fecha-hora">
          <li>
            <CalendarDays size={18} aria-hidden /> {WEBINAR.fechaTexto}
          </li>
          <li>
            <Clock size={18} aria-hidden /> {WEBINAR.horaTexto} · {WEBINAR.zonaTexto}
          </li>
        </ul>
        {WHATSAPP_GRUPO && (
          <div className="wa-card">
            <span className="eyebrow">Último paso</span>
            <p className="wa-title">Unite al grupo de WhatsApp del webinar</p>
            <p className="wa-text">
              Ahí vas a recibir el link de acceso, los recordatorios antes de la clase y los materiales.
            </p>
            <a className="btn" href={WHATSAPP_GRUPO} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={20} aria-hidden /> Unirme al grupo de WhatsApp
            </a>
          </div>
        )}
        <Countdown />
      </div>
    </main>
  );
}
