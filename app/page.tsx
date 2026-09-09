"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, BadgeCheck, Building2, Clock3, FileCheck2, Fuel, HardHat, Mail, MapPin, Phone, ShieldCheck, Truck, Warehouse, Wrench, X, ZoomIn } from "lucide-react";

type MachineUse = "Movimiento de suelos" | "Trabajos en altura" | "Carga y movimiento de materiales";
type Machine = { id: number; model: string; type: string; year?: number; uses?: MachineUse[] };
type MachinePhoto = { src: string; alt: string };
type CatalogMachine = { key: string; model: string; type: string; ids: number[]; years: number[]; uses: MachineUse[]; photos: MachinePhoto[] };
const machines: Machine[] = [
  { id:9, model:"JCB 175", type:"Minicargadora", year:2022 },
  { id:10, model:"JCB 175", type:"Minicargadora", year:2022 }, { id:12, model:"JCB 175", type:"Minicargadora", year:2023 },
  { id:15, model:"JCB 175", type:"Minicargadora", year:2023 },
  { id:11, model:"SANY SY50U", type:"Miniretro", year:2023 }, { id:3, model:"JCB 3CX", type:"Retropala", year:2017 },
  { id:4, model:"JCB 3CX", type:"Retropala", year:2017 }, { id:6, model:"JCB 3CX", type:"Retropala", year:2022 },
  { id:8, model:"JCB 3CX", type:"Retropala", year:2022 }, { id:13, model:"JCB 3CX", type:"Retropala", year:2023 },
  { id:14, model:"JCB 3CX", type:"Retropala", year:2023 }, { id:16, model:"JCB 205 NXT", type:"Excavadora 20 TN", year:2023 },
  { id:33, model:"OPTIMUM 8", type:"Tijera eléctrica", year:2023 },
  { id:24, model:"OPTIMUM 8", type:"Tijera eléctrica", year:2025 }, { id:27, model:"OPTIMUM 8", type:"Tijera eléctrica", year:2025 },
  { id:28, model:"COMPACT 14", type:"Tijera eléctrica", year:2021 }, { id:29, model:"COMPACT 14", type:"Tijera eléctrica", year:2021 },
  { id:30, model:"COMPACT 14", type:"Tijera eléctrica", year:2022 }, { id:31, model:"COMPACT 14 AE", type:"Tijera eléctrica", year:2025 },
  { id:32, model:"COMPACT 14", type:"Tijera eléctrica", year:2022 }, { id:38, model:"COMPACT 14", type:"Tijera eléctrica", year:2023 },
  { id:40, model:"COMPACT 14", type:"Tijera eléctrica", year:2023 }, { id:20, model:"COMPACT 12DX", type:"Tijera diésel", year:2019 },
  { id:26, model:"COMPACT 12DX", type:"Tijera diésel", year:2023 }, { id:42, model:"COMPACT 12DX", type:"Tijera diésel", year:2024 },
  { id:21, model:"HAULOTTE H18SX", type:"Tijera diésel", year:2014 }, { id:45, model:"COMPACT 12 DX", type:"Tijera diésel", year:2025 },
  { id:35, model:"SIGMA 16 PRO", type:"Brazo articulado eléctrico", year:2023 },
  { id:22, model:"HA16RTJ PRO", type:"Brazo articulado diésel", year:2019 }, { id:41, model:"HA16RTJ PRO", type:"Brazo articulado diésel", year:2024 },
  { id:44, model:"SIGMA 16 PRO", type:"Brazo articulado eléctrico", year:2025 },
  { id:50, model:"JCB 540-170", type:"Manipulador telescópico", year:2024 },
  { id:101, model:"LIUGONG CPCD 25", type:"Autoelevador", year:2023 },
  { id:103, model:"LIUGONG CPCD 35", type:"Autoelevador", year:2023 },
  { id:105, model:"LIUGONG CPCD 25", type:"Autoelevador", year:2024 },
];
const useByType: Record<string, MachineUse[]> = {
  "Minicargadora": ["Movimiento de suelos"],
  "Miniretro": ["Movimiento de suelos"],
  "Retropala": ["Movimiento de suelos"],
  "Excavadora 20 TN": ["Movimiento de suelos"],
  "Tijera eléctrica": ["Trabajos en altura"],
  "Tijera diésel": ["Trabajos en altura"],
  "Brazo articulado eléctrico": ["Trabajos en altura"],
  "Brazo articulado diésel": ["Trabajos en altura"],
  "Manipulador telescópico": ["Trabajos en altura", "Carga y movimiento de materiales"],
  "Autoelevador": ["Carga y movimiento de materiales"],
};
const normalizeModel = (model:string) => model === "COMPACT 12 DX" ? "COMPACT 12DX" : model;
const groupKeyFor = (machine:Machine) => {
  if(machine.type === "Autoelevador" && machine.model.startsWith("LIUGONG")) return "Autoelevador|LIUGONG";
  if(machine.type === "Tijera eléctrica" && machine.model.startsWith("COMPACT 14")) return "Tijera eléctrica|COMPACT 14";
  return `${machine.type}|${normalizeModel(machine.model)}`;
};
const photoSets: Record<string, MachinePhoto[]> = {
  "Minicargadora|JCB 175": [{ src:"/machines/jcb-175.webp", alt:"Minicargadora JCB 175" }],
  "Miniretro|SANY SY50U": [{ src:"/machines/sany-sy50u.webp", alt:"Miniretroexcavadora SANY SY50U" }],
  "Retropala|JCB 3CX": [
    { src:"/machines/jcb-3cx-1.webp", alt:"Retropala JCB 3CX" },
  ],
  "Excavadora 20 TN|JCB 205 NXT": [{ src:"/machines/jcb-205-nxt.webp", alt:"Excavadora JCB 205 NXT" }],
  "Tijera eléctrica|OPTIMUM 8": [{ src:"/machines/optimum-8.webp", alt:"Tijera eléctrica Optimum 8" }],
  "Tijera eléctrica|COMPACT 14": [{ src:"/machines/compact-14.webp", alt:"Tijera eléctrica Compact 14" }],
  "Tijera diésel|COMPACT 12DX": [{ src:"/machines/compact-12dx.webp", alt:"Tijera diésel Compact 12DX" }],
  "Tijera diésel|HAULOTTE H18SX": [{ src:"/machines/haulotte-h18sx.webp", alt:"Tijera diésel Haulotte H18SX" }],
  "Brazo articulado eléctrico|SIGMA 16 PRO": [{ src:"/machines/sigma-16-pro.webp", alt:"Brazo articulado eléctrico Sigma 16 Pro" }],
  "Brazo articulado diésel|HA16RTJ PRO": [
    { src:"/machines/ha16rtj-pro-2.webp", alt:"Brazo articulado diésel Haulotte HA16RTJ Pro" },
  ],
  "Manipulador telescópico|JCB 540-170": [
    { src:"/machines/jcb-540-170-1.webp", alt:"Manipulador telescópico JCB 540-170" },
    { src:"/machines/jcb-540-170-2.webp", alt:"Manipulador telescópico JCB" },
  ],
  "Autoelevador|LIUGONG": [{ src:"/machines/autoelevador-liugong.webp", alt:"Autoelevador LiuGong" }],
};
const groupedMachines: CatalogMachine[] = [];
const groupedIndex = new Map<string,CatalogMachine>();
for(const machine of machines){
  const key = groupKeyFor(machine);
  let group = groupedIndex.get(key);
  if(!group){
    const model = key === "Autoelevador|LIUGONG" ? "LIUGONG CPCD 25 / CPCD 35" : key === "Tijera eléctrica|COMPACT 14" ? "COMPACT 14 / 14 AE" : normalizeModel(machine.model);
    group = { key, model, type:machine.type, ids:[], years:[], uses:useByType[machine.type] ?? [], photos:photoSets[key] ?? [] };
    groupedIndex.set(key,group);
    groupedMachines.push(group);
  }
  group.ids.push(machine.id);
  if(machine.year && !group.years.includes(machine.year)) group.years.push(machine.year);
}
const categories = ["Todas", "Movimiento de suelos", "Trabajos en altura", "Carga y movimiento de materiales"] as const;
const whatsapp = "https://wa.me/541178561028?text=Hola%20Rental%20Vial%2C%20quiero%20consultar%20por%20el%20alquiler%20de%20una%20m%C3%A1quina.";
const trackWhatsAppClick = () => {
  const metaPixel = (window as typeof window & { fbq?: (...args: unknown[]) => void }).fbq;
  metaPixel?.("track", "Contact", { channel: "WhatsApp" });
};
const faqs = [
  ["¿En qué zonas trabajan?", "La base operativa está en Loma Hermosa, partido de Tres de Febrero, y la cobertura alcanza toda la Provincia de Buenos Aires. El traslado se coordina según la ubicación de cada obra."],
  ["¿El alquiler incluye operario?", "No. El operario no está incluido en la contratación. Si tu proyecto necesita asistencia adicional, consultanos para evaluar las opciones disponibles."],
  ["¿El combustible está incluido?", "No. El combustible se encuentra a cargo del cliente."],
  ["¿El seguro está incluido?", "La cobertura se define de acuerdo con las necesidades del cliente y las condiciones de cada alquiler."],
  ["¿Cómo se calcula el presupuesto?", "La cotización es personalizada y depende del equipo, el tipo de trabajo, el tiempo de uso y la ubicación de la obra."],
  ["¿Cómo confirmo la reserva?", "Para avanzar se solicita contrato firmado, anticipo y documentación de la empresa: CUIT y contrato social."],
  ["¿Cómo sé si una máquina está disponible?", "La disponibilidad puede cambiar. Escribinos por WhatsApp indicando el equipo y las fechas estimadas para confirmarla."],
  ["¿El traslado está incluido?", "No. El flete se cotiza aparte según la zona y puede realizarse con camión propio o tercerizado."],
];

function WhatsAppIcon({ size=25 }:{ size?:number }) {
  return <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" fill="currentColor"><path d="M16.05 3A12.93 12.93 0 0 0 4.9 22.47L3 29l6.7-1.76A12.95 12.95 0 1 0 16.05 3Zm0 23.7a10.7 10.7 0 0 1-5.46-1.49l-.39-.23-3.97 1.04 1.06-3.87-.25-.4A10.73 10.73 0 1 1 16.05 26.7Zm5.89-8.04c-.32-.16-1.9-.94-2.2-1.05-.29-.11-.5-.16-.71.16-.21.32-.82 1.05-1 1.27-.19.21-.37.24-.69.08-.32-.16-1.36-.5-2.59-1.6a9.69 9.69 0 0 1-1.79-2.23c-.19-.32-.02-.49.14-.65.15-.14.32-.37.48-.56.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65 0 1.56 1.14 3.07 1.3 3.28.16.21 2.24 3.42 5.42 4.79.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.9-.77 2.17-1.52.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37Z"/></svg>;
}
function SocialIcon({ network }:{ network:"instagram"|"facebook" }) {
  if(network==="facebook") return <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M13.7 22v-9h3l.45-3.5H13.7V7.27c0-1.01.28-1.7 1.75-1.7h1.87V2.44c-.32-.04-1.43-.14-2.72-.14-2.7 0-4.54 1.64-4.54 4.66V9.5H7v3.5h3.06v9h3.64Z"/></svg>;
  return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>;
}

export default function Home() {
  const [category,setCategory] = useState("Todas");
  const [lightbox,setLightbox] = useState<{ title:string; photos:MachinePhoto[]; index:number } | null>(null);
  const rail = useRef<HTMLDivElement>(null);
  const filtered = useMemo(()=>category === "Todas" ? groupedMachines : groupedMachines.filter((m)=>m.uses.includes(category as MachineUse)),[category]);
  const shiftPhoto = (direction:number) => setLightbox((current)=>current ? { ...current, index:(current.index + direction + current.photos.length) % current.photos.length } : current);
  useEffect(()=>{
    const handleWhatsAppClick = (event:MouseEvent) => {
      const target = event.target as Element | null;
      if(target?.closest('a[href*="wa.me/"]')) trackWhatsAppClick();
    };
    document.addEventListener("click",handleWhatsAppClick);
    return ()=>document.removeEventListener("click",handleWhatsAppClick);
  },[]);
  useEffect(()=>{
    if(!lightbox) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (event:KeyboardEvent) => {
      if(event.key === "Escape") setLightbox(null);
      if(event.key === "ArrowLeft" && lightbox.photos.length > 1) shiftPhoto(-1);
      if(event.key === "ArrowRight" && lightbox.photos.length > 1) shiftPhoto(1);
    };
    window.addEventListener("keydown",handleKey);
    return ()=>{
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown",handleKey);
    };
  },[lightbox]);
  const chooseCategory = (item:string) => {
    setCategory(item);
    rail.current?.scrollTo({ left: 0, behavior: "smooth" });
  };
  const move = (direction:number)=>rail.current?.scrollBy({left:direction*360,behavior:"smooth"});
  return <main>
    <header className="site-header"><a href="#inicio" className="brand-logo" aria-label="Rental Vial, inicio"><img src="/rental-vial-logo.png" alt="Rental Vial"/></a><nav aria-label="Navegación principal"><a href="#equipos">Equipos</a><a href="#servicios">Cómo alquilar</a><a href="#ubicacion">Ubicación</a><a href="#preguntas">Preguntas</a></nav><div className="header-actions"><a className="social-link" href="https://www.instagram.com/rentalvialok/" target="_blank" rel="noreferrer" aria-label="Abrir Instagram de Rental Vial"><SocialIcon network="instagram"/></a><a className="social-link" href="https://www.facebook.com/profile.php?id=61575142742922" target="_blank" rel="noreferrer" aria-label="Abrir Facebook de Rental Vial"><SocialIcon network="facebook"/></a><a className="header-cta" href={whatsapp} target="_blank" rel="noreferrer"><WhatsAppIcon size={19}/> Pedí tu presupuesto</a></div></header>
    <section id="inicio" className="hero"><div className="hero-copy"><span className="eyebrow">ALQUILER DE MAQUINARIA · BUENOS AIRES</span><h1>El equipo que tu obra necesita, <em>cuando lo necesita.</em></h1><p>Maquinaria vial, equipos para movimiento de suelos, trabajos en altura y movimiento de mercadería. Atención personalizada y cotización según cada proyecto.</p><div className="hero-actions"><a className="button button-primary" href={whatsapp} target="_blank" rel="noreferrer"><WhatsAppIcon/> Consultar disponibilidad</a><a className="button button-ghost" href="#equipos">Ver catálogo <ArrowRight size={19}/></a></div><div className="trust-row"><span><BadgeCheck size={19}/> Flota propia y joven</span><span><Clock3 size={19}/> Respuesta en el día</span><span><MapPin size={19}/> Provincia de Buenos Aires</span></div></div><div className="hero-visual"><span className="hero-panel-kicker">EQUIPOS PARA CADA PROYECTO</span><h2 className="hero-panel-title">Soluciones para cada etapa de tu obra.</h2><p className="hero-panel-copy">Disponibilidad, atención cercana y una flota preparada para responder a las necesidades de tu proyecto.</p><div className="machine-stack"><div><HardHat/><span>Movimiento de suelos</span></div><div><Building2/><span>Trabajos en altura</span></div><div><Warehouse/><span>Movimiento de mercadería</span></div></div><div className="chevrons">»»»»</div></div></section>
    <section className="audiences section-pad"><div className="section-heading"><span className="eyebrow">SOLUCIONES PARA CADA PROYECTO</span><h2>¿Para quién es nuestro servicio?</h2></div><div className="audience-grid"><article><Building2/><h3>Constructoras y contratistas</h3><p>Equipos para obras civiles, naves industriales, instalaciones y desarrollos.</p></article><article><HardHat/><h3>Obras viales</h3><p>Maquinaria para excavación, preparación de terreno y movimiento de suelos.</p></article><article><Warehouse/><h3>Industria y logística</h3><p>Autoelevadores y manipuladores para mover y acopiar mercadería.</p></article><article><Wrench/><h3>Trabajos específicos</h3><p>Plataformas para altura, redes contra incendios y montajes eléctricos.</p></article></div></section>
    <section id="equipos" className="catalog section-pad"><div className="catalog-head"><div className="section-heading"><span className="eyebrow">NUESTRA FLOTA</span><h2>Encontrá el equipo según tu trabajo</h2><p>Elegí qué necesitás realizar y recorré las máquinas disponibles para esa tarea. El catálogo está organizado por modelo para que sea más claro y no repita fotografías.</p></div><div className="rail-controls"><button onClick={()=>move(-1)} aria-label="Ver máquinas anteriores"><ArrowLeft/></button><button onClick={()=>move(1)} aria-label="Ver más máquinas"><ArrowRight/></button></div></div><div className="filters" aria-label="Filtrar por tipo de trabajo">{categories.map((item)=><button key={item} className={category===item?"active":""} onClick={()=>chooseCategory(item)}>{item}</button>)}</div><div className="machine-rail" ref={rail}>{filtered.map((m)=><article className="machine-card" key={m.key}>{m.photos.length ? <button className="machine-photo" onClick={()=>setLightbox({ title:m.model, photos:m.photos, index:0 })} aria-label={`Ampliar foto de ${m.model}`}><img src={m.photos[0].src} alt={m.photos[0].alt} loading="lazy"/><span className="photo-action"><ZoomIn size={18}/>{m.photos.length > 1 ? `${m.photos.length} fotos` : "Ver foto"}</span></button> : <div className="machine-art"><span>RV</span><div className="art-lines">»»»</div><small>Foto próximamente</small></div>}<div className="machine-info"><span className="machine-type">{m.type}</span><h3>{m.model}</h3><dl><div><dt>Utilidad</dt><dd>{m.uses.join(" · ")}</dd></div></dl><a href={`${whatsapp}%20Modelo%3A%20${encodeURIComponent(m.model)}`} target="_blank" rel="noreferrer"><WhatsAppIcon size={19}/> Consultar este modelo</a></div></article>)}</div><div className="catalog-note"><ShieldCheck/><p><strong>¿Te interesa un equipo?</strong> La disponibilidad puede variar. Escribinos por WhatsApp y te asesoramos según el tipo de trabajo, el tiempo de uso y la ubicación de la obra.</p></div></section>
    <section id="servicios" className="steps section-pad"><div className="section-heading light"><span className="eyebrow">SIMPLE Y PERSONALIZADO</span><h2>¿Cómo contratar?</h2></div><div className="steps-grid"><article><span>01</span><Phone/><h3>Contanos qué necesitás</h3><p>Escribinos por WhatsApp con el tipo de trabajo, lugar y fechas estimadas.</p></article><article><span>02</span><FileCheck2/><h3>Recibí tu cotización</h3><p>Armamos un presupuesto según máquina, duración, obra y traslado.</p></article><article><span>03</span><BadgeCheck/><h3>Confirmá el alquiler</h3><p>Para reservar se requiere contrato firmado, anticipo, CUIT y contrato social.</p></article><article><span>04</span><Truck/><h3>Coordinamos la entrega</h3><p>El traslado se cotiza aparte según la zona, con camión propio o tercerizado.</p></article></div><div className="conditions"><div><Fuel/><span><b>Combustible</b>No incluido</span></div><div><HardHat/><span><b>Operario</b>No incluido</span></div><div><ShieldCheck/><span><b>Seguro</b>Según necesidad</span></div><div><Truck/><span><b>Flete</b>Se cotiza aparte</span></div></div></section>
    <section id="ubicacion" className="location section-pad"><div><span className="eyebrow">CERCA DE TU OBRA</span><h2>Base operativa en Loma Hermosa</h2><p>Estamos en el partido de Tres de Febrero y trabajamos con cobertura en toda la Provincia de Buenos Aires. Coordinamos el traslado del equipo según la ubicación de cada obra.</p><div className="address"><MapPin/><span><b>Salón y oficina</b>Av. Márquez 1951</span></div><div className="address"><Wrench/><span><b>Depósito y taller</b>Churruca 8702</span></div><div className="address"><Clock3/><span><b>Horario</b>Lunes a viernes, de 8 a 17 h</span></div></div><div className="map-card"><span>BASE OPERATIVA</span><strong>LOMA<br/>HERMOSA</strong><p>Partido de Tres de Febrero</p><small>Cobertura en toda la Provincia de Buenos Aires</small><div>»»»»</div></div></section>
    <section id="preguntas" className="faq section-pad"><div className="section-heading"><span className="eyebrow">ANTES DE ALQUILAR</span><h2>Preguntas frecuentes</h2><p>Información clara para saber cómo trabajamos antes de pedir tu cotización.</p></div><div className="faq-list">{faqs.map(([q,a],i)=><details key={q} open={i===0}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section>
    <section id="contacto" className="contact section-pad"><div><span className="eyebrow">DATOS DE CONTACTO</span><h2>Hablemos de tu proyecto</h2><p>Escribinos con el tipo de trabajo, la ubicación y las fechas estimadas. Te ayudamos a elegir el equipo adecuado.</p></div><div className="contact-grid"><a href={whatsapp} target="_blank" rel="noreferrer"><WhatsAppIcon/><span><b>WhatsApp</b>11 7856-1028</span></a><a href="tel:+541160941269"><Phone/><span><b>Teléfono alternativo · Carlos</b>11 6094-1269</span></a><a href="mailto:rentalvialok@gmail.com"><Mail/><span><b>Email Rental Vial</b>rentalvialok@gmail.com</span></a><a href="mailto:cl.amandio@hotmail.com"><Mail/><span><b>Email Carlos</b>cl.amandio@hotmail.com</span></a><div className="social-contact"><a href="https://www.instagram.com/rentalvialok/" target="_blank" rel="noreferrer"><SocialIcon network="instagram"/><b>Instagram</b><small>@rentalvialok</small></a><a href="https://www.facebook.com/profile.php?id=61575142742922" target="_blank" rel="noreferrer"><SocialIcon network="facebook"/><b>Facebook</b><small>Rental Vial</small></a></div></div></section>
    <section className="final-cta"><div><span className="eyebrow">HABLEMOS DE TU PROYECTO</span><h2>¿Ya sabés qué equipo necesitás?</h2><p>Contanos sobre tu obra. Te ayudamos a elegir la máquina y preparamos una cotización personalizada.</p></div><a className="button button-primary" href={whatsapp} target="_blank" rel="noreferrer"><WhatsAppIcon/> Pedir presupuesto por WhatsApp</a></section>
    <footer><img className="footer-logo" src="/rental-vial-logo.png" alt="Rental Vial"/><p>Alquiler de maquinaria vial y de construcción.</p><span>Loma Hermosa · Buenos Aires · Argentina</span></footer>
    {lightbox && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Foto ampliada de ${lightbox.title}`} onClick={()=>setLightbox(null)}><button className="lightbox-close" onClick={()=>setLightbox(null)} aria-label="Cerrar foto ampliada"><X/></button>{lightbox.photos.length > 1 && <button className="lightbox-prev" onClick={(event)=>{event.stopPropagation();shiftPhoto(-1)}} aria-label="Ver foto anterior"><ArrowLeft/></button>}<figure onClick={(event)=>event.stopPropagation()}><img src={lightbox.photos[lightbox.index].src} alt={lightbox.photos[lightbox.index].alt}/><figcaption><strong>{lightbox.title}</strong><span>{lightbox.photos.length > 1 ? `${lightbox.index + 1} de ${lightbox.photos.length}` : "Foto del equipo"}</span></figcaption></figure>{lightbox.photos.length > 1 && <button className="lightbox-next" onClick={(event)=>{event.stopPropagation();shiftPhoto(1)}} aria-label="Ver foto siguiente"><ArrowRight/></button>}</div>}
    <a className="whatsapp-float" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Consultar por WhatsApp"><WhatsAppIcon size={31}/><span>Consultanos</span></a>
  </main>;
}
