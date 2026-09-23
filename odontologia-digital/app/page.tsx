import Image from "next/image";
import { CalendarDays, Clock, Check, ScanLine, Layers, Route } from "lucide-react";
import Countdown from "./components/Countdown";
import RegistroForm from "./components/RegistroForm";
import { WEBINAR } from "./config";

const dolores = [
  "Sentís que la profesión avanza más rápido de lo que podés seguir.",
  "Ves escáneres, impresoras 3D y softwares, pero no sabés por dónde empezar ni qué necesitás de verdad.",
  "Te da miedo invertir mucho dinero y equivocarte en la compra.",
  "Quizás ya compraste un equipo o un software y sentís que lo aprovechás poco.",
  "La cantidad de marcas, términos y opciones te genera más confusión que claridad.",
];

const bloques = [
  {
    icon: Route,
    titulo: "El flujo digital completo, de punta a punta",
    items: [
      "Entendé cómo se conectan escaneo, diseño y fabricación con tu práctica clínica.",
      "Ordená la información que hoy te llega suelta o centrada en una marca.",
      "Descubrí dónde gana precisión cada etapa del tratamiento.",
    ],
  },
  {
    icon: ScanLine,
    titulo: "Qué tecnología tiene sentido para tu consultorio",
    items: [
      "Distinguí qué es esencial y qué puede esperar.",
      "Aprendé a decidir con criterio propio, sin depender del vendedor.",
      "Evitá las compras equivocadas que terminan guardadas en un cajón.",
    ],
  },
  {
    icon: Layers,
    titulo: "Cómo empezar de forma gradual y realista",
    items: [
      "Definí cuál es tu siguiente paso posible, sin cambiar todo de un día para otro.",
      "Mirá cómo lo digital puede reducir citas, repeticiones y tiempos de trabajo.",
      "Mejorá la comunicación con el laboratorio y la experiencia de tu paciente.",
    ],
  },
];

const paraVos = [
  "Sos odontólogo/a y todavía no integraste el flujo digital a tu práctica.",
  "Ya tenés alguna tecnología, pero sentís que la usás poco y sin una visión completa.",
  "Querés actualizarte, pero no sabés qué inversión tiene sentido para tu realidad.",
  "No tenés escáner y querés aprender, planificar y decidir antes de comprar.",
  "Buscás explicaciones simples, desde la mirada clínica y no desde la marca.",
  "Querés sentirte actualizado/a, seguro/a y preparado/a para el futuro de la profesión.",
];

function FechaHora() {
  return (
    <ul className="fecha-hora">
      <li>
        <CalendarDays size={18} aria-hidden /> {WEBINAR.fechaTexto}
      </li>
      <li>
        <Clock size={18} aria-hidden /> {WEBINAR.horaTexto} · {WEBINAR.zonaTexto}
      </li>
    </ul>
  );
}

export default function Home() {
  return (
    <main>
      {/* Barra superior */}
      <header className="topbar">
        <div className="wrap topbar-inner">
          <div className="brand">
            <Image src="/img/logo-diente.webp" alt="" width={34} height={34} className="brand-logo" />
            <strong>{WEBINAR.nombre}</strong>
          </div>
          <div className="topbar-fecha">
            <CalendarDays size={16} aria-hidden />
            <span>
              {WEBINAR.fechaTexto} · {WEBINAR.horaTexto} ({WEBINAR.zonaTexto})
            </span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero" id="registro">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <span className="badge">Webinar gratuito · Cupos limitados</span>
            <h1>
              Incorporá la odontología digital a tu práctica{" "}
              <em>sin comprar tecnología a ciegas ni depender de una marca</em>
            </h1>
            <p className="hero-sub">
              Una clase en vivo para trabajar con mayor precisión, optimizar tiempos y costos y ofrecer resultados
              más predecibles a tus pacientes.
            </p>
            <FechaHora />
            <p className="form-intro">Completá tus datos para reservar tu lugar gratis:</p>
            <RegistroForm origen="hero" />
          </div>

          <div className="hero-visual">
            <div className="hero-glow" aria-hidden />
            <Image
              src="/img/logo-diente.webp"
              alt=""
              width={360}
              height={360}
              className="hero-tooth"
              priority
            />
            <Image
              src="/img/laura-leal.webp"
              alt="Dra. Laura Leal"
              width={530}
              height={1159}
              className="hero-photo"
              priority
            />
            <div className="hero-card">
              <strong>{WEBINAR.experta}</strong>
              <span>Especialista UBA · 36 años de carrera</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cuenta regresiva */}
      <section className="strip">
        <div className="wrap strip-inner">
          <p>El webinar comienza en</p>
          <Countdown />
        </div>
      </section>

      {/* Contexto + dolor */}
      <section className="section">
        <div className="wrap narrow center">
          <div className="quote-card">
            <p className="quote-title">
              La entrada al mundo digital no empieza comprando un equipo:
              <em> empieza entendiendo el proceso.</em>
            </p>
            <p>
              Primero hay que entender el flujo, desarrollar criterio y definir cuál es el siguiente paso posible
              para tu consultorio.
            </p>
          </div>

          <h2>
            ¿Te pasa que la odontología <em>avanza más rápido</em> de lo que podés seguir?
          </h2>
          <ul className="pain-list">
            {dolores.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <p className="lead">
            No es falta de interés. Es que la información llega desordenada, muchas veces centrada en una marca, y
            así es imposible tomar buenas decisiones. Por eso algunos colegas postergan el cambio por miedo y otros
            compran equipos que después usan muy poco.
          </p>
          <p className="highlight">
            No necesitás saber todo, cambiar todo ni invertir una fortuna.{" "}
            <span>Necesitás criterio.</span>
          </p>
        </div>
      </section>

      {/* Contenido */}
      <section className="section section-alt">
        <div className="wrap">
          <div className="center">
            <span className="eyebrow">{WEBINAR.nombre}</span>
            <h2>
              En esta clase en vivo <em>vas a descubrir:</em>
            </h2>
          </div>
          <div className="cards">
            {bloques.map((b, i) => (
              <article className="card" key={b.titulo}>
                <div className="card-head">
                  <span className="card-num">{String(i + 1).padStart(2, "0")}</span>
                  <b.icon size={26} aria-hidden className="card-icon" />
                </div>
                <h3>{b.titulo}</h3>
                <ul className="check-list">
                  {b.items.map((it) => (
                    <li key={it}>
                      <Check size={16} aria-hidden /> {it}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="transparency center narrow">
            <p>
              Al finalizar la clase vas a poder acceder a <strong>{WEBINAR.programa}</strong>, el programa completo
              de la Dra. Laura Leal. <em>Las inscripciones se abren ese mismo día y por tiempo limitado.</em>
            </p>
            <a className="btn" href="#registro">
              Quiero mi lugar gratis
            </a>
          </div>
        </div>
      </section>

      {/* Para vos si */}
      <section className="section">
        <div className="wrap split">
          <div className="split-photo">
            <Image src="/img/laura-consultorio.webp" alt="Dra. Laura Leal en su consultorio" width={800} height={1397} />
          </div>
          <div>
            <span className="eyebrow">¿Es para vos?</span>
            <h2>
              Esta clase en vivo <em>es para vos si:</em>
            </h2>
            <ul className="check-list big">
              {paraVos.map((p) => (
                <li key={p}>
                  <Check size={18} aria-hidden /> {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Quién soy */}
      <section className="section section-alt">
        <div className="wrap split reverse">
          <div>
            <span className="eyebrow">Quién te va a guiar</span>
            <h2>
              Soy Laura Leal, <em>odontóloga</em>
            </h2>
            <div className="bio">
              <p>
                Llevo <strong>36 años de ejercicio profesional</strong> y 38 vinculada a la docencia. En todo ese
                recorrido vi cómo la odontología fue cambiando y cómo lo digital empezó a modificar la forma de
                diagnosticar, planificar y trabajar.
              </p>
              <p>
                También vi algo que me preocupó: colegas que querían actualizarse pero recibían información
                desordenada o centrada en una marca. Algunos postergaban el cambio por miedo; otros compraban equipos
                que después usaban muy poco.
              </p>
              <p>
                Entendí que el primer paso no era comprar tecnología, sino <strong>comprender el flujo completo y
                desarrollar criterio para elegir</strong>. Por eso organicé mi experiencia clínica y docente en un
                recorrido simple y progresivo.
              </p>
              <p>
                En mis clases presenciales comprobé que, cuando el profesional entiende el proceso, baja el miedo y
                aparecen decisiones más claras. Mi misión es que la odontología digital se sienta posible y cercana,
                para que la incorpores de acuerdo con tu especialidad, tu consultorio y tu momento.
              </p>
            </div>
            <div className="stats">
              <div>
                <b>36</b>
                <span>años de ejercicio profesional</span>
              </div>
              <div>
                <b>38</b>
                <span>años en la docencia</span>
              </div>
            </div>
          </div>
          <div className="split-photo">
            <Image src="/img/laura-leal.webp" alt="Dra. Laura Leal" width={530} height={1159} />
          </div>
        </div>
      </section>

      {/* Cierre */}
      <section className="section final">
        <div className="wrap narrow center">
          <Image src="/img/logo-diente.webp" alt="" width={140} height={140} className="final-tooth" />
          <span className="badge">Gratuito · Cupos limitados</span>
          <h2>
            36 años de experiencia, <em>actualizados.</em>
          </h2>
          <p className="lead">
            Da el primer paso hacia la evolución digital de tu consultorio: con claridad, con criterio y a tu ritmo.
          </p>
          <FechaHora />
          <Countdown />
          <div className="final-form">
            <RegistroForm origen="cierre" />
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap">
          <p>
            © {new Date().getFullYear()} {WEBINAR.experta} · {WEBINAR.nombre}
          </p>
        </div>
      </footer>
    </main>
  );
}
