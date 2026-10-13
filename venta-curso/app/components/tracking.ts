"use client";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const STORAGE_KEY = "venta_utm";

type Fbq = (...args: unknown[]) => void;

// Guarda las UTM de la visita para registrarlas en el evento de contacto, sin modificar el enlace de WhatsApp.
export function guardarUtm() {
  try {
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) utm[k] = v;
    }
    if (Object.keys(utm).length) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
  } catch {}
}

function leerUtm(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

// Clic hacia WhatsApp = contacto. Nunca se registra como compra.
export function registrarContacto(origen: string) {
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  if (typeof fbq === "function") {
    fbq("track", "Contact", { content_name: "Odontología Digital, la Nueva Era", origen, ...leerUtm() });
  }
}
