"use client";

import { useEffect, useState } from "react";
import { CURSO } from "../config";

export type Estado = "preapertura" | "abierta" | "cerrada";

const APERTURA = new Date(CURSO.aperturaISO).getTime();
const CIERRE = new Date(CURSO.cierreISO).getTime();

export function estadoEn(ms: number): Estado {
  if (ms < APERTURA) return "preapertura";
  if (ms > CIERRE) return "cerrada";
  return "abierta";
}

// Estado de las inscripciones según la fecha real en hora de Argentina.
// Para revisar los tres estados en la vista previa: ?estado=preapertura | abierta | cerrada
export function useEstado(): Estado {
  const [estado, setEstado] = useState<Estado>("abierta");
  useEffect(() => {
    const forzado = new URLSearchParams(window.location.search).get("estado");
    if (forzado === "preapertura" || forzado === "abierta" || forzado === "cerrada") {
      setEstado(forzado);
      return;
    }
    const actualizar = () => setEstado(estadoEn(Date.now()));
    actualizar();
    const id = setInterval(actualizar, 30_000);
    return () => clearInterval(id);
  }, []);
  return estado;
}

export function objetivo(estado: Estado) {
  return estado === "preapertura" ? APERTURA : CIERRE;
}
