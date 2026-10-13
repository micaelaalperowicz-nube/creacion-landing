"use client";

import { MessageCircle } from "lucide-react";
import { CHECKOUT_URL, CUPOS_TEXTO, CURSO, WHATSAPP_VENTAS } from "../config";
import { useEstado } from "./estado";
import { registrarContacto } from "./tracking";

export function BotonInscripcion({ origen, className = "btn" }: { origen: string; className?: string }) {
  const estado = useEstado();
  if (estado === "cerrada") return null;
  const href = estado === "abierta" && CHECKOUT_URL ? CHECKOUT_URL : WHATSAPP_VENTAS;
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        if (href === WHATSAPP_VENTAS) registrarContacto(origen);
      }}
    >
      {estado === "abierta" ? (
        "Quiero inscribirme"
      ) : (
        <>
          <MessageCircle size={20} aria-hidden /> Consultar por WhatsApp
        </>
      )}
    </a>
  );
}

// Bloque de CTA con microtexto y condición de cupos y cierre.
export default function Inscripcion({ origen, conCupos = true }: { origen: string; conCupos?: boolean }) {
  const estado = useEstado();

  if (estado === "cerrada") {
    return (
      <div className="cta-block">
        <p className="cerrado">Las inscripciones a esta edición están cerradas.</p>
      </div>
    );
  }

  return (
    <div className="cta-block">
      {estado === "preapertura" && (
        <p className="apertura">
          Las inscripciones abren el <strong>{CURSO.aperturaTexto}</strong>, hora de Argentina.
        </p>
      )}
      <BotonInscripcion origen={origen} />
      <p className="micro">Te ayudamos por WhatsApp a coordinar el pago y completar tu inscripción.</p>
      {conCupos && <p className="cupos-line">{CUPOS_TEXTO}</p>}
    </div>
  );
}
