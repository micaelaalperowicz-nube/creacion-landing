"use client";

import { useEffect, useState } from "react";
import { WEBINAR } from "../config";

const TARGET = new Date(WEBINAR.fechaISO).getTime();

function partes(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [
    { v: Math.floor(s / 86400), l: "Días" },
    { v: Math.floor((s % 86400) / 3600), l: "Horas" },
    { v: Math.floor((s % 3600) / 60), l: "Mins" },
    { v: s % 60, l: "Segs" },
  ];
}

export default function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const items = partes(now === null ? 0 : TARGET - now);

  return (
    <div className="countdown" aria-label="Cuenta regresiva para el webinar">
      {items.map((it) => (
        <div className="countdown-item" key={it.l}>
          <span className="countdown-num">{now === null ? "--" : String(it.v).padStart(2, "0")}</span>
          <span className="countdown-label">{it.l}</span>
        </div>
      ))}
    </div>
  );
}
