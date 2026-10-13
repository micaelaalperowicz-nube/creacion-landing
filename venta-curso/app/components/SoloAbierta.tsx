"use client";

import { useEstado } from "./estado";

// Oculta los beneficios de apertura cuando cierran las inscripciones.
export default function SoloAbierta({ children }: { children: React.ReactNode }) {
  return useEstado() === "cerrada" ? null : <>{children}</>;
}
