# Odontología Digital — Landing de captación

Landing de captación del webinar gratuito **La Evolución Digital de tu Consultorio**, con la Dra. Laura Leal.
Diseñada según el manual de marca del lanzamiento (azul noche, petróleo, verde claro, amarillo · Sora + Manrope).

## Secciones

1. Barra superior con marca y fecha.
2. Hero: promesa, formulario (nombre + email) y foto de Laura.
3. Franja con cuenta regresiva.
4. Contexto y dolores del avatar.
5. Qué se aprende en la clase (3 bloques) + aviso de apertura del programa.
6. "Esta clase es para vos si".
7. Quién es Laura.
8. Cierre con cuenta regresiva y formulario.
9. Página `/gracias` después del registro.

## Configuración

Los datos del evento (fecha, hora, textos) están en `app/config.ts`.

Variables de entorno opcionales (en Vercel: *Settings > Environment Variables*):

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_FORM_ENDPOINT` | URL que recibe el registro por POST JSON `{ nombre, email, origen }` (Zapier, Make, ActiveCampaign, Google Apps Script…). Sin ella, el formulario redirige a `/gracias` sin guardar datos. |
| `NEXT_PUBLIC_META_PIXEL_ID` | ID del Meta Pixel. Envía `PageView` y `Lead` al registrarse. |
| `NEXT_PUBLIC_WHATSAPP_GRUPO` | Link del grupo de WhatsApp que se muestra en `/gracias`. |

## Probar en una computadora

Requiere Node.js 22.

```bash
npm install
npm run dev
```

Luego abrir `http://localhost:3000`.

## Publicar en Vercel

Importar el repositorio en Vercel (**Add New > Project**). Detecta Next.js automáticamente.
