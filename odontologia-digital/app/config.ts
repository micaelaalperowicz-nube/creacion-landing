// Datos editables del lanzamiento.
export const WEBINAR = {
  nombre: "La Evolución Digital de tu Consultorio",
  experta: "Dra. Laura Leal",
  // 12/10/2026 20:00 hs Argentina (UTC-3)
  fechaISO: "2026-10-12T20:00:00-03:00",
  fechaTexto: "Lunes 12 de octubre",
  horaTexto: "20:00 hs",
  zonaTexto: "hora Argentina",
  programa: "Odontología Digital con Criterio",
};

// Endpoint que recibe el formulario (Zapier, Make, ActiveCampaign, Google Apps Script, etc.).
// Recibe un POST JSON { nombre, email, origen }. Si queda vacío, el formulario
// solo redirige a /gracias sin guardar datos.
export const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

// ID del Meta Pixel. Si queda vacío, no se carga el pixel.
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

// Link del grupo de WhatsApp que se muestra en la página de gracias.
export const WHATSAPP_GRUPO =
  process.env.NEXT_PUBLIC_WHATSAPP_GRUPO || "https://chat.whatsapp.com/JeGnkdeUpBII2mgE6IfGkB";
