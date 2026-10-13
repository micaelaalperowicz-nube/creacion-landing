"use client";

import { useEffect } from "react";
import { CURSO } from "../config";
import { BotonInscripcion } from "./Inscripcion";
import { useEstado } from "./estado";
import { guardarUtm } from "./tracking";

// Botón fijo inferior para celular. Se oculta cuando cierran las inscripciones.
export default function StickyCta() {
  const estado = useEstado();

  useEffect(() => {
    guardarUtm();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("con-sticky", estado !== "cerrada");
  }, [estado]);

  if (estado === "cerrada") return null;
  return (
    <div className="sticky-cta" role="region" aria-label="Inscripción">
      <div className="sticky-info">
        <strong>{CURSO.precio}</strong>
        <span>Solo {CURSO.cupos} lugares · Cierre {CURSO.cierreTexto}</span>
      </div>
      <BotonInscripcion origen="barra-fija" className="btn btn-sm" />
    </div>
  );
}
