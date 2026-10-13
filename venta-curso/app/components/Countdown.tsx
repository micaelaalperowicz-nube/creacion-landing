"use client";

import { useEffect, useState } from "react";
import { objetivo, useEstado } from "./estado";

function partes(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [
    { v: Math.floor(s / 86400), l: "Días" },
    { v: Math.floor((s % 86400) / 3600), l: "Horas" },
    { v: Math.floor((s % 3600) / 60), l: "Mins" },
    { v: s % 60, l: "Segs" },
  ];
}

// Cuenta regresiva a la apertura o al cierre real de inscripciones (no se reinicia por visitante).
export default function Countdown({ conTitulo = false }: { conTitulo?: boolean }) {
  const estado = useEstado();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (estado === "cerrada") return null;
  const items = partes(now === null ? 0 : objetivo(estado) - now);

  return (
    <div className="countdown-wrap">
      {conTitulo && (
        <p className="countdown-title">
          {estado === "preapertura" ? "Las inscripciones abren en" : "Las inscripciones cierran en"}
        </p>
      )}
      <div className="countdown" aria-label="Cuenta regresiva de inscripciones">
        {items.map((it) => (
          <div className="countdown-item" key={it.l}>
            <span className="countdown-num">{now === null ? "--" : String(it.v).padStart(2, "0")}</span>
            <span className="countdown-label">{it.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
