import React, { useState, useEffect } from 'react';
import { brandingConfig } from '../../config/branding';

const NEON = '#39FF14';
const NEON_GLOW = 'rgba(57, 255, 20, 0.4)';
const NEON_DIM = 'rgba(57, 255, 20, 0.07)';

interface SolucionCard {
  id: string;
  titulo: string;
  descripcion: string;
}

interface SeccionSoluciones {
  id: string;
  categoria: string;
  descripcionSeccion: string;
  cards: SolucionCard[];
}

const SOLUCIONES: SeccionSoluciones[] = [
  {
    id: 'shopper',
    categoria: 'Inteligencia de shopper',
    descripcionSeccion: 'Soluciones enfocadas en conocimiento del cliente, personalización y conversión.',
    cards: [
      { id: 'sh1', titulo: 'Inteligencia del Cliente', descripcion: 'Centraliza y enriquece la información del shopper para construir una visión unificada del cliente, mejorar segmentación y activar decisiones comerciales de mayor precisión.' },
      { id: 'sh2', titulo: 'Personalización Dinámica', descripcion: 'Adapta contenidos, promociones, experiencias y mensajes en tiempo real según contexto, comportamiento, historial e intención de compra para elevar relevancia y conversión.' },
      { id: 'sh3', titulo: 'Monitoreo en medios', descripcion: 'Susurro es una plataforma de monitoreo de radio con IA que escucha emisoras en tiempo real, transcribe el audio y detecta menciones de marcas o palabras clave, generando evidencia automática con hora exacta para verificar la transmisión de pauta publicitaria.' },
      { id: 'sh4', titulo: 'Recomendación de Compra', descripcion: 'Genera sugerencias de productos, combinaciones, venta cruzada y venta adicional para incrementar ticket promedio, profundidad de canasta y probabilidad de cierre.' },
      { id: 'sh5', titulo: 'Comercio Conversacional', descripcion: 'Acompaña al shopper durante la exploración, comparación y decisión de compra mediante asistentes que orientan, resuelven dudas y aceleran la conversión.' },
      { id: 'sh6', titulo: 'Kioscos y displays inteligentes', descripcion: 'Exhibiciones, islas, kioscos, cabeceras, mostrador inteligente, comunicación inteligente en tienda, etc.' },
      { id: 'sh7', titulo: 'Lealtad y Activación de Audiencias', descripcion: 'Fortalece la relación con el cliente mediante segmentación avanzada, activación precisa, beneficios personalizados y campañas que impulsan recurrencia y retención.' },
    ],
  },
  {
    id: 'tienda',
    categoria: 'Inteligencia en tienda',
    descripcionSeccion: 'Inteligencia aplicada a experiencia, productividad y visibilidad operativa.',
    cards: [
      { id: 't1', titulo: 'Catálogo Inteligente', descripcion: 'Optimiza el catálogo con clasificación automática, enriquecimiento de atributos, etiquetado inteligente y búsqueda visual para mejorar descubrimiento y precisión comercial.' },
      { id: 't2', titulo: 'Experiencia Inmersiva', descripcion: 'Integra visualización avanzada y experiencias interactivas que enriquecen la relación con el producto y fortalecen la intención de compra en categorías de alta consideración.' },
      { id: 't3', titulo: 'Inteligencia de Contenido y Marca', descripcion: 'Optimiza la generación de contenido comercial y monitorea percepción de marca, respuesta del consumidor y señales del mercado para afinar mensajes y ejecución promocional.' },
      { id: 't4', titulo: 'Servicio Omnicanal Inteligente', descripcion: 'Orquesta la atención al cliente en todos los canales con asistentes, motores de respuesta y automatización de tickets para mejorar tiempos de resolución y consistencia de servicio.' },
      { id: 't5', titulo: 'Asesor Inteligente de Tienda', descripcion: 'Potencia al personal con acceso inmediato a perfiles, historial, disponibilidad, políticas y recomendaciones para elevar productividad y calidad de atención en piso de venta.' },
      { id: 't6', titulo: 'Analítica de Tienda', descripcion: 'Convierte la tienda en una fuente continua de información sobre tráfico, permanencia, conversión, cumplimiento y desempeño para mejorar ejecución y decisiones operativas.' },
      { id: 't7', titulo: 'Cobro sin Fricción', descripcion: 'Agiliza el proceso de pago mediante experiencias de checkout inteligente y autoservicio avanzado que reducen filas, mejoran conveniencia y elevan la experiencia final de compra.' },
      { id: 't8', titulo: 'Anaquel e Inventario Inteligente', descripcion: 'Monitorea disponibilidad, detecta quiebres, corrige inventario oculto y mejora reabasto para proteger la venta, sostener anaqueles disponibles y fortalecer la salud del inventario.' },
      { id: 't9', titulo: 'Operación Inteligente de Tienda', descripcion: 'Coordina tareas, incidencias, mantenimiento, prioridades y productividad para lograr una operación más disciplinada, ágil y consistente en una o múltiples ubicaciones.' },
    ],
  },
  {
    id: 'cadena',
    categoria: 'Inteligencia en cadena y suministro',
    descripcionSeccion: 'Capacidades orientadas a fulfillment, protección de activos, calidad y competitividad del portafolio.',
    cards: [
      { id: 'c1', titulo: 'Fulfillment y Logística Inteligente', descripcion: 'Optimiza picking, packing, almacén, última milla, logística inversa y rutas dinámicas para acelerar pedidos, reducir costos y sostener una experiencia omnicanal confiable.' },
      { id: 'c2', titulo: 'Prevención de Pérdidas y Fraude', descripcion: 'Detecta anomalías, protege activos y fortalece el control operativo mediante monitoreo inteligente de riesgos, eventos sospechosos, shrink y vulnerabilidades en tienda y operación.' },
      { id: 'c3', titulo: 'Abasto, Calidad e Innovación de Producto', descripcion: 'Integra inteligencia para sourcing, evaluación de proveedores, control de calidad, desarrollo de producto, detección de tendencias y reducción de desperdicio para fortalecer margen y competitividad.' },
    ],
  },
  {
    id: 'operaciones',
    categoria: 'Inteligencia en operaciones de retail',
    descripcionSeccion: 'Capacidades diseñadas para optimizar la ejecución operativa, mejorar la disponibilidad y maximizar la eficiencia en tienda.',
    cards: [
      { id: 'o1', titulo: 'Precios y Promociones Inteligentes', descripcion: 'Optimiza precios, promociones y markdowns con una lógica orientada a proteger margen, acelerar rotación y responder con precisión a demanda, contexto competitivo y elasticidad.' },
      { id: 'o2', titulo: 'Pronóstico, Surtido y Asignación', descripcion: 'Pronostica demanda con mayor precisión y optimiza mezcla de productos, asignación y surtido por tienda, formato, región y canal para alinear inventario con demanda real.' },
    ],
  },
];

const MAYIA_CARDS = [
  { id: 1,  titulo: 'API Testing',            descripcion: 'Pruebas de integración y endpoints',   mediaSrc: '/assets/playG/apitest.png'        },
  { id: 2,  titulo: 'Code Sandbox',           descripcion: 'Entorno de desarrollo experimental',   mediaSrc: '/assets/playG/codesandbox.png'    },
  { id: 3,  titulo: 'IA Generativa',          descripcion: 'Modelos de lenguaje y prompts',        mediaSrc: '/assets/playG/ia-gen.png'         },
  { id: 4,  titulo: 'Visualización de Datos', descripcion: 'Gráficos y dashboards interactivos',   mediaSrc: '/assets/playG/visualizacion.png'  },
  { id: 5,  titulo: 'Automatización',         descripcion: 'Scripts y flujos de trabajo',          mediaSrc: '/assets/playG/automatizacion.png' },
];


export const Playground: React.FC = () => {
  const { colores } = brandingConfig;
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard]   = useState<number | null>(null);
  const [isMobile, setIsMobile]         = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const divider: React.CSSProperties = {
    height: '1px',
    backgroundColor: colores.borde,
    margin: '8px 0 32px 0',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: isMobile ? '16px' : '0' }}>

      {/* ── MAYiA PLAYGROUND (arriba) ── */}
      <div style={{ marginBottom: '48px' }}>

        {/* Header */}
        <div style={{ marginBottom: '8px' }}>
          <h2 style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: 'bold', color: colores.textoClaro, marginBottom: '6px' }}>
            MAYiA Playground
          </h2>
          <p style={{ color: colores.textoMedio, fontSize: isMobile ? '14px' : '16px', margin: 0 }}>
            Entornos de desarrollo y capacidades experimentales del ecosistema MAYiA
          </p>
        </div>

        <div style={divider} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, minmax(${isMobile ? '150px' : '200px'}, 1fr))`,
          gap: isMobile ? '12px' : '20px',
        }}>
          {MAYIA_CARDS.map((card) => {
            const isHovered = hoveredCard === card.id;
            return (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  backgroundColor: colores.fondoSecundario,
                  borderRadius: '16px',
                  border: isHovered ? `2px solid ${colores.primario}` : `1px solid ${colores.borde}`,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: isHovered ? 'translateY(-4px) scale(1.01)' : 'translateY(0) scale(1)',
                  boxShadow: isHovered ? `0 12px 28px rgba(3,140,174,0.25)` : '0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                <div style={{ width: '100%', height: isMobile ? '180px' : '260px', position: 'relative', backgroundColor: colores.fondoTerciario, overflow: 'hidden' }}>
                  <img
                    src={card.mediaSrc}
                    alt={card.titulo}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease', transform: isHovered ? 'scale(1.08)' : 'scale(1)', filter: isHovered ? 'brightness(1.1)' : 'brightness(1)' }}
                    onError={(e) => {
                      const t = e.target as HTMLImageElement;
                      t.style.display = 'none';
                      const c = t.parentElement;
                      if (c) c.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:${colores.textoMedio};background:${colores.fondoTerciario}"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div>`;
                    }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(3,140,174,0.95) 0%, rgba(3,140,174,0.7) 40%, transparent 100%)', display: 'flex', alignItems: 'flex-end', padding: '16px', opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s ease' }}>
                    <p style={{ color: '#fff', fontSize: '12px', margin: 0, lineHeight: '1.5', fontWeight: '600' }}>{card.descripcion}</p>
                  </div>
                </div>
                <div style={{ padding: '12px 14px', backgroundColor: isHovered ? colores.fondoTerciario : 'transparent', transition: 'background-color 0.3s ease' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: '600', color: isHovered ? colores.primario : colores.textoClaro, margin: 0, lineHeight: '1.3', transition: 'color 0.3s ease' }}>
                    {card.titulo}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── SECCIONES DE SOLUCIONES (abajo) ── */}

      {/* Header de sección soluciones */}
      <div style={{ marginBottom: '8px' }}>
        <h2 style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: 'bold', color: colores.textoClaro, marginBottom: '6px' }}>
          Soluciones
        </h2>
        <p style={{ color: colores.textoMedio, fontSize: isMobile ? '14px' : '16px', margin: 0 }}>
          Portafolio de inteligencia aplicada al retail
        </p>
      </div>

      <div style={divider} />

      {SOLUCIONES.map((seccion, secIdx) => (
        <div key={seccion.id} style={{ marginBottom: '48px' }}>

          {/* Header de sección */}
          <p style={{
            fontSize: '10px',
            fontWeight: '700',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            color: NEON,
            marginBottom: '6px',
            textShadow: `0 0 8px ${NEON_GLOW}`,
          }}>
            Soluciones
          </p>

          <h3 style={{
            fontSize: isMobile ? '18px' : '22px',
            fontWeight: '700',
            color: colores.textoClaro,
            margin: '0 0 6px 0',
            letterSpacing: '-0.3px',
          }}>
            {seccion.categoria}
          </h3>

          <p style={{
            fontSize: isMobile ? '13px' : '13px',
            color: colores.textoMedio,
            margin: '0 0 6px 0',
            lineHeight: '1.6',
          }}>
            {seccion.descripcionSeccion}
          </p>

          <p style={{
            fontSize: '11px',
            color: NEON,
            margin: '0 0 20px 0',
            opacity: 0.65,
            fontStyle: 'italic',
            letterSpacing: '0.3px',
          }}>
            da click para ver más
          </p>

          {/* Grid de cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fill, minmax(210px, 1fr))',
            gap: isMobile ? '10px' : '14px',
          }}>
            {seccion.cards.map((card) => {
              const isFlipped = flippedCard === card.id;
              return (
                <div
                  key={card.id}
                  onClick={() => setFlippedCard(isFlipped ? null : card.id)}
                  style={{
                    backgroundColor: isFlipped ? NEON_DIM : colores.fondoSecundario,
                    borderRadius: '20px',
                    border: `1px solid ${NEON}`,
                    padding: isFlipped ? '20px 18px' : '28px 18px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: isFlipped
                      ? `0 0 16px ${NEON_GLOW}, 0 0 40px rgba(57,255,20,0.1), 0 6px 24px rgba(0,0,0,0.35)`
                      : `0 0 8px rgba(57,255,20,0.12), 0 4px 14px rgba(0,0,0,0.25)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    minHeight: '90px',
                    userSelect: 'none',
                  }}
                >
                  {isFlipped ? (
                    <p style={{
                      fontSize: '12px',
                      color: colores.textoMedio,
                      margin: 0,
                      lineHeight: '1.75',
                      letterSpacing: '0.1px',
                    }}>
                      {card.descripcion}
                    </p>
                  ) : (
                    <h4 style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: colores.textoClaro,
                      margin: 0,
                      lineHeight: '1.4',
                      letterSpacing: '-0.1px',
                    }}>
                      {card.titulo}
                    </h4>
                  )}
                </div>
              );
            })}
          </div>

          {secIdx < SOLUCIONES.length - 1 && (
            <div style={{ height: '1px', backgroundColor: colores.borde, margin: '48px 0 0 0' }} />
          )}
        </div>
      ))}

    </div>
  );
};