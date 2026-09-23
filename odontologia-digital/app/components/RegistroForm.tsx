"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FORM_ENDPOINT } from "../config";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function RegistroForm({ origen, cta = "Quiero mi lugar" }: { origen: string; cta?: string }) {
  const router = useRouter();
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nombre = String(data.get("nombre") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    if (!nombre || !email) {
      setError("Completá tu nombre y tu email.");
      return;
    }
    setError("");
    setEnviando(true);
    try {
      if (FORM_ENDPOINT) {
        await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, email, origen }),
        });
      }
      window.fbq?.("track", "Lead");
      router.push("/gracias");
    } catch {
      setEnviando(false);
      setError("No pudimos registrarte. Probá de nuevo en unos segundos.");
    }
  }

  return (
    <form className="registro" onSubmit={onSubmit} noValidate>
      <label className="sr-only" htmlFor={`nombre-${origen}`}>Tu nombre</label>
      <input id={`nombre-${origen}`} name="nombre" type="text" placeholder="Tu nombre" autoComplete="given-name" required />
      <label className="sr-only" htmlFor={`email-${origen}`}>Tu email</label>
      <input id={`email-${origen}`} name="email" type="email" placeholder="Tu email" autoComplete="email" required />
      <button className="btn" type="submit" disabled={enviando}>
        {enviando ? "Reservando..." : cta}
      </button>
      {error && <p className="registro-error" role="alert">{error}</p>}
      <p className="registro-nota">Sin costo · 100 % online · Cupos limitados</p>
    </form>
  );
}
