import Image from "next/image";
import {
  Award,
  CalendarClock,
  Check,
  ChevronDown,
  Gift,
  GraduationCap,
  ListChecks,
  MessageCircle,
  PlayCircle,
  ScanLine,
  ShieldCheck,
  Users,
} from "lucide-react";
import { BLOQUES, CRONOGRAMA, CUPOS_TEXTO, CURSO } from "./config";
import Countdown from "./components/Countdown";
import Inscripcion from "./components/Inscripcion";
import SoloAbierta from "./components/SoloAbierta";
import StickyCta from "./components/StickyCta";

const INCLUYE_CORTO = [
  "Ocho clases grabadas",
  "Acceso por dos años",
  "Certificado de finalización",
  "Tres bonos incluidos",
];

const PARA_VOS = [
  "Querés actualizarte y ordenar el aprendizaje.",
  "Necesitás comprender el proceso antes de evaluar una inversión.",
  "Buscás incorporar herramientas de forma gradual.",
  "Querés relacionar la tecnología con las necesidades reales de tu práctica.",
];

const CLASES = [
  { t: "Introducción al flujo de trabajo digital", d: "Comprendé el recorrido y cómo se conectan sus etapas." },
  {
    t: "Computadoras y requisitos para odontología digital",
    d: "Conocé los requisitos que conviene evaluar antes de elegir herramientas informáticas.",
  },
  {
    t: "Adquisición de datos y diagnóstico 3D",
    d: "Ubicá el papel de los registros digitales dentro del diagnóstico y la planificación.",
  },
  {
    t: "Diseño asistido por computadora (CAD)",
    d: "Comprendé dónde interviene el diseño digital en el flujo de trabajo.",
  },
  { t: "Fabricación asistida por computadora (CAM)", d: "Conocé cómo se relacionan el diseño y la fabricación." },
  {
    t: "Integración en especialidades clínicas",
    d: "Relacioná las etapas del flujo digital con aplicaciones clínicas.",
  },
  { t: "Adhesión", d: "Profundizá en este tema dentro del recorrido propuesto por Laura." },
  { t: "Porcelanas", d: "Completá la formación con el abordaje de porcelanas." },
];

const INCLUYE = [
  "Ocho clases grabadas",
  "Un PDF por clase",
  "Acceso durante dos años",
  "Certificado de finalización",
  "Dos encuentros en vivo de preguntas y respuestas, que quedan grabados",
  "Acompañamiento en el grupo privado de WhatsApp",
  "Checklist de implementación",
];

const FAQ = [
  {
    q: "¿El curso es en vivo o grabado?",
    a: "El curso tiene ocho clases grabadas. Cada clase incluye su PDF. Además, hay dos encuentros grupales en vivo de preguntas y respuestas con Laura, que quedan grabados.",
  },
  { q: "¿Cuánto tiempo tengo acceso?", a: "Dos años, en una plataforma de formación online." },
  { q: "¿Incluye certificado?", a: "Sí, un certificado de finalización al completar el curso." },
  {
    q: "¿Cuándo son los encuentros en vivo?",
    a: "El primero se realiza después de las primeras cuatro clases; el segundo, después de las cuatro restantes. Los días y horarios se informarán a los participantes.",
  },
  {
    q: "¿Incluye acompañamiento?",
    a: "Sí, en un grupo privado de WhatsApp para participantes durante toda la formación. Los horarios se coordinan con el grupo.",
  },
  {
    q: "¿Necesito comprar el escáner?",
    a: "No. La compra del escáner es opcional y adicional al curso. Para conocer los requisitos de equipos y software de la formación, consultá al equipo.",
  },
  {
    q: "¿El escáner está incluido en los USD 497?",
    a: "No. La inscripción permite acceder a condiciones especiales para adquirirlo por separado.",
  },
  {
    q: "¿Cómo me inscribo?",
    a: "Hacé clic en “Quiero inscribirme” para comunicarte con el equipo y coordinar el pago y tu inscripción.",
  },
  {
    q: "¿Puedo pagar en pesos o en cuotas?",
    a: "Las formas de pago se coordinan por WhatsApp con el equipo al momento de tu inscripción.",
  },
  {
    q: "¿Tiene garantía?",
    a: "Sí. Tenés una garantía de 7 días desde el comienzo del curso.",
  },
  {
    q: "¿Hasta cuándo puedo inscribirme?",
    a: `Hasta el 15 de octubre a las 23:59, hora de Argentina, o antes si se completan los ${CURSO.cupos} lugares.`,
  },
];

function Cupos() {
  return (
    <SoloAbierta>
      <div className="cupos">
        <CalendarClock size={22} aria-hidden />
        <p>
          <strong>Cupos limitados: solo {CURSO.cupos} personas.</strong> Las inscripciones cierran el 15 de octubre a
          las 23:59, hora de Argentina, o antes si se agotan los cupos.
        </p>
      </div>
    </SoloAbierta>
  );
}

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <div className="wrap topbar-inner">
          <div className="brand">
            <Image className="brand-logo" src="/img/logo-diente.webp" alt="" width={52} height={52} priority />
            <div>
              <strong>{CURSO.nombre}</strong>
              <span>con la {CURSO.docente}</span>
            </div>
          </div>
          <SoloAbierta>
            <p className="topbar-cupos">{CUPOS_TEXTO}</p>
          </SoloAbierta>
        </div>
      </header>

      {/* 1. Primer pantallazo */}
      <section className="hero">
        <div className="hero-media">
          <picture>
            <source media="(max-width: 900px)" srcSet="/img/laura-hero-mobile.webp" />
            <img className="hero-bg" src="/img/laura-hero-bg.webp" alt="Dra. Laura Leal" width={1672} height={941} />
          </picture>
          <div className="hero-card">
            <strong>{CURSO.docente}</strong>
            <span>Especialista UBA · 36 años de carrera</span>
          </div>
        </div>
        <div className="wrap">
          <div className="hero-copy">
            <span className="badge">Curso online</span>
            <h1>
              Incorporá la <em>odontología digital</em> a tu práctica con un recorrido claro y <em>criterio clínico</em>
              .
            </h1>
            <p className="hero-sub">
              En {CURSO.nombre}, la {CURSO.docente} te acompaña a comprender el flujo digital y ordenar tus próximos
              pasos.
            </p>
            <ul className="pills">
              {INCLUYE_CORTO.map((t) => (
                <li key={t}>
                  <Check size={16} aria-hidden /> {t}
                </li>
              ))}
            </ul>
            <div className="hero-precio">
              <div className="precio-mini">
                <span>Inversión</span>
                <strong>{CURSO.precio}</strong>
              </div>
              <Inscripcion origen="hero" />
            </div>
          </div>
        </div>
      </section>

      <SoloAbierta>
        <div className="strip">
          <div className="wrap strip-inner">
            <p>
              <strong>Solo {CURSO.cupos} lugares.</strong> Inscripciones hasta el {CURSO.cierreTexto} (hora de
              Argentina) o hasta agotar cupos.
            </p>
            <Countdown />
          </div>
        </div>
      </SoloAbierta>

      {/* 2. Identificación */}
      <section className="section">
        <div className="wrap narrow center">
          <span className="eyebrow">Para quién es</span>
          <h2>
            Esta formación es <em>para vos</em> si…
          </h2>
          <p className="lead">
            Querés incorporar la odontología digital y todavía no sabés por dónde empezar; te abruma la cantidad de
            equipos, programas y posibilidades; o ya tenés alguna herramienta, pero te falta una visión completa para
            integrarla a tu trabajo.
          </p>
          <ul className="check-list big para-vos">
            {PARA_VOS.map((t) => (
              <li key={t}>
                <Check size={20} aria-hidden /> {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Propuesta */}
      <section className="section section-alt">
        <div className="wrap narrow center">
          <span className="eyebrow">La propuesta</span>
          <h2>
            Primero entender el flujo. <em>Después decidir.</em>
          </h2>
          <p className="lead">
            La formación te ayuda a comprender cómo se conectan las etapas del flujo digital y a evaluar qué
            herramientas tienen sentido para tu consultorio. El recorrido busca darte criterio para avanzar de manera
            gradual y tomar decisiones de implementación mejor fundamentadas.
          </p>
          <div className="pasos">
            <div>
              <b>1</b>
              <span>Comprendé cómo se conectan las etapas del flujo digital.</span>
            </div>
            <div>
              <b>2</b>
              <span>Evaluá qué herramientas tienen sentido para tu consultorio.</span>
            </div>
            <div>
              <b>3</b>
              <span>Avanzá de manera gradual, con decisiones mejor fundamentadas.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Sobre Laura */}
      <section className="section">
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
                Entendí que el primer paso no era comprar tecnología, sino{" "}
                <strong>comprender el flujo completo y desarrollar criterio para elegir</strong>. Por eso organicé mi
                experiencia clínica y docente en un recorrido simple y progresivo.
              </p>
              <p>
                Mi misión es que la odontología digital se sienta posible y cercana, para que la incorpores de acuerdo
                con tu especialidad, tu consultorio y tu momento.
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
            <Image src="/img/laura-sillon.webp" alt="Dra. Laura Leal" width={800} height={1000} />
          </div>
        </div>
      </section>

      {/* 5. Temario */}
      <section className="section section-alt" id="temario">
        <div className="wrap">
          <div className="center">
            <span className="eyebrow">Temario</span>
            <h2>
              Las <em>ocho clases</em> del recorrido
            </h2>
          </div>
          <ol className="clases">
            {CLASES.map((c, i) => (
              <li key={c.t}>
                <span className="clase-num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. Modalidad */}
      <section className="section">
        <div className="wrap">
          <div className="center">
            <span className="eyebrow">Modalidad</span>
            <h2>
              Estudiá <em>a tu ritmo</em>
            </h2>
          </div>
          <div className="cards">
            <div className="card">
              <PlayCircle className="card-icon" size={30} aria-hidden />
              <h3>Ocho clases grabadas</h3>
              <p>Accedé a ocho clases grabadas, cada una con su PDF, y organizá tu estudio según tus tiempos.</p>
            </div>
            <div className="card">
              <GraduationCap className="card-icon" size={30} aria-hidden />
              <h3>Dos años de acceso</h3>
              <p>
                Tendrás dos años de acceso a la formación, en una plataforma de formación online, para volver a las
                explicaciones y revisar los temas.
              </p>
            </div>
            <div className="card">
              <Award className="card-icon" size={30} aria-hidden />
              <h3>Certificado de finalización</h3>
              <p>Al completar el curso, recibirás tu certificado de finalización.</p>
            </div>
          </div>
          {BLOQUES.cronograma.mostrar && (
            <div className="cronograma">
              <h3>Cronograma</h3>
              <ul>
                {CRONOGRAMA.map((c) => (
                  <li key={c.fecha}>
                    <strong>{c.fecha}</strong>
                    <span>{c.detalle}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* 7. Bonos */}
      <section className="section section-alt">
        <div className="wrap">
          <div className="center">
            <span className="eyebrow">Incluidos en tu inscripción</span>
            <h2>
              Tres <em>bonos</em> para acompañarte
            </h2>
          </div>
          <div className="cards">
            <div className="card bono">
              <span className="bono-tag">Bono 1</span>
              <Users className="card-icon" size={30} aria-hidden />
              <h3>Dos encuentros en vivo con Laura</h3>
              <p>
                Aclarás tus dudas en dos encuentros grupales de preguntas y respuestas con Laura. El primero se realiza
                después de las primeras cuatro clases. El segundo, después de las cuatro clases restantes, para cerrar
                el recorrido y revisar las dudas finales. Los dos encuentros quedan grabados.
              </p>
            </div>
            <div className="card bono">
              <span className="bono-tag">Bono 2</span>
              <MessageCircle className="card-icon" size={30} aria-hidden />
              <h3>Acompañamiento por WhatsApp</h3>
              <p>
                Formá parte de un grupo privado de WhatsApp exclusivo para participantes, con acompañamiento durante
                toda la formación. Los horarios se coordinan en el grupo.
              </p>
            </div>
            <div className="card bono">
              <span className="bono-tag">Bono 3</span>
              <ListChecks className="card-icon" size={30} aria-hidden />
              <h3>Checklist de implementación</h3>
              <p>
                Una checklist para ordenar tus primeras decisiones y definir los próximos pasos de implementación según
                las necesidades de tu práctica.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Oferta y precio */}
      <section className="section oferta-section" id="inscripcion">
        <div className="wrap">
          <div className="oferta">
            <span className="eyebrow">Tu inscripción</span>
            <h2>{CURSO.nombre}</h2>
            <p className="oferta-intro">Tu inscripción incluye:</p>
            <ul className="check-list">
              {INCLUYE.map((t) => (
                <li key={t}>
                  <Check size={18} aria-hidden /> {t}
                </li>
              ))}
            </ul>
            <div className="precio">
              <span>Inversión</span>
              <strong>{CURSO.precio}</strong>
            </div>
            <Cupos />
            <Inscripcion origen="oferta" conCupos={false} />
            {BLOQUES.garantia.mostrar && (
              <div className="garantia">
                <ShieldCheck size={26} aria-hidden />
                <p>
                  <strong>Garantía de 7 días</strong> desde el comienzo del curso.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <SoloAbierta>
        {/* 10. Acción rápida */}
        {(BLOQUES.beca.mostrar || BLOQUES.muestras.mostrar) && (
          <section className="section section-alt">
            <div className="wrap narrow center">
              <span className="eyebrow">Para quienes se inscriben primero</span>
              <h2>
                Beneficios de <em>acción rápida</em>
              </h2>
              <div className="rapida">
                {BLOQUES.beca.mostrar && (
                  <div className="rapida-card">
                    <Award size={30} aria-hidden />
                    <h3>Beca del 100 %</h3>
                    <p>
                      Para la primera persona que abone el curso. Anunciamos a quién le corresponde al cierre de las
                      inscripciones.
                    </p>
                  </div>
                )}
                {BLOQUES.muestras.mostrar && (
                  <div className="rapida-card">
                    <Gift size={30} aria-hidden />
                    <h3>Dupla de muestras de resina y adhesivo</h3>
                    <p>Las primeras diez personas en inscribirse la reciben de regalo.</p>
                    <p className="rapida-nota">Retiro en CABA o envío con costo a cargo de quien la recibe.</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 11. Escáner: beneficio opcional, separado del precio del curso */}
        {BLOQUES.escaner.mostrar && (
          <section className="section">
            <div className="wrap narrow">
              <div className="escaner">
                <div className="escaner-head">
                  <ScanLine size={30} aria-hidden />
                  <div>
                    <span className="eyebrow">Beneficio opcional</span>
                    <h2>Condiciones especiales para adquirir un escáner</h2>
                  </div>
                </div>
                <p>
                  Todas las personas que se inscriban al curso acceden a condiciones especiales para adquirir un
                  escáner:
                </p>
                <div className="escaner-opciones">
                  <div>
                    <span>6 cuotas sin interés de</span>
                    <strong>USD 865</strong>
                    <small>Total USD 5.190</small>
                  </div>
                  <div>
                    <span>Pago en efectivo</span>
                    <strong>USD 4.484</strong>
                  </div>
                </div>
                <p className="escaner-nota">
                  La compra del escáner es opcional y adicional. El equipo no está incluido en el precio del curso.
                  Consultá al equipo las condiciones y disponibilidad del beneficio.
                </p>
              </div>
            </div>
          </section>
        )}
      </SoloAbierta>

      {/* 12. Preguntas frecuentes */}
      <section className="section section-alt">
        <div className="wrap narrow">
          <div className="center">
            <span className="eyebrow">Preguntas frecuentes</span>
            <h2>
              Lo que <em>suelen preguntar</em>
            </h2>
          </div>
          <div className="faq">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>
                  {f.q}
                  <ChevronDown size={20} aria-hidden />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 13. Cierre */}
      <section className="section final">
        <div className="wrap narrow center">
          <Image className="final-logo" src="/img/logo-diente.webp" alt="" width={120} height={120} />
          <span className="badge">Solo {CURSO.cupos} lugares</span>
          <h2>
            Tu próximo paso en la <em>odontología digital</em>
          </h2>
          <p className="lead">
            Ocho clases grabadas con su PDF, dos años de acceso, certificado de finalización, dos encuentros en vivo con
            Laura, grupo privado de WhatsApp y checklist de implementación. Todo por {CURSO.precio}.
          </p>
          <Countdown conTitulo />
          <Cupos />
          <Inscripcion origen="cierre" conCupos={false} />
        </div>
      </section>

      <footer className="footer">
        <div className="wrap">
          <p>
            © 2026 {CURSO.docente} · {CURSO.nombre}
          </p>
        </div>
      </footer>

      <StickyCta />
    </main>
  );
}
