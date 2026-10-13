// Configuración comercial de la página de venta.
// Los bloques con `mostrar: false` quedan ocultos al visitante hasta que el equipo confirme sus condiciones.

export const CURSO = {
  nombre: "Odontología Digital, la Nueva Era",
  docente: "Dra. Laura Leal",
  precio: "USD 497",
  cupos: 200,
  // Fechas en hora de Argentina (UTC-3).
  aperturaISO: "2026-10-13T19:00:00-03:00",
  cierreISO: "2026-10-15T23:59:00-03:00",
  aperturaTexto: "13/10 a las 19:00",
  cierreTexto: "15/10 a las 23:59",
};

// Ruta de conversión: contacto por WhatsApp con el equipo de inscripciones.
// Si se aprueba un checkout, poner su URL en CHECKOUT_URL y WhatsApp queda como asistencia.
export const WHATSAPP_VENTAS =
  process.env.NEXT_PUBLIC_WHATSAPP_VENTAS || "https://wasepje.com/preinscripciones-ppvdy";
export const CHECKOUT_URL = process.env.NEXT_PUBLIC_CHECKOUT_URL || "";

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "39058531323790775";

export const BLOQUES = {
  // Acción rápida: beca para la primera persona y muestras para las primeras diez.
  beca: { mostrar: true },
  muestras: { mostrar: true },
  // Beneficio opcional para adquirir un escáner (sin marca ni modelo).
  escaner: { mostrar: true },
  // Ocultos hasta confirmar condiciones o recibir material aprobado.
  cronograma: { mostrar: false },
  garantia: { mostrar: false },
  testimonios: { mostrar: false },
  replay: { mostrar: false, url: "" },
};

// Cronograma recuperado de la oferta anterior. Se muestra solo con BLOQUES.cronograma.mostrar = true.
export const CRONOGRAMA = [
  { fecha: "26 de octubre", detalle: "Clases 1 y 2" },
  { fecha: "2 de noviembre", detalle: "Clases 3 y 4" },
  { fecha: "Semana del 9 al 13 de noviembre", detalle: "Primer encuentro de preguntas y respuestas" },
  { fecha: "16 de noviembre", detalle: "Clases 5 y 6" },
  { fecha: "23 de noviembre", detalle: "Clases 7 y 8" },
  { fecha: "Semana del 30 de noviembre al 4 de diciembre", detalle: "Segundo encuentro de preguntas y respuestas" },
];

export const CUPOS_TEXTO = `Solo ${CURSO.cupos} lugares · Cierre ${CURSO.cierreTexto}, hora de Argentina, o antes si se agotan los cupos`;
