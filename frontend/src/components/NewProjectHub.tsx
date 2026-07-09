import {
  Users, BookOpen, Target, Star, Award, Phone, ExternalLink, ChevronRight
} from 'lucide-react';
import { brandingConfig } from '../config/branding'; // CRÍTICO: Mantener esta importación para los colores.
const { colores } = brandingConfig;

import React from 'react';

/* ── WAI Info Hub modules data ──────────────────────────────────────── */

// CRÍTICO: Mantener esta interfaz para definir la estructura de cada módulo.
interface NewProjectHubModule {
  id: string;
  icon: React.ElementType; // Tipo para los iconos de Lucide.
  label: string;
  desc: string;
  color: string; // Color distintivo para el módulo, usado en estilos.
  badge?: string; // Opcional, para etiquetas como 'Nuevo', 'En vivo'.
  link?: string; // Opcional, para enlaces externos.
}

// Normalizado: Todos los módulos usan el color dorado corporativo de WAI (#D4AF37)
const MODULES_INFO: NewProjectHubModule[] = [
  { id: 'quienes-somos', icon: Users, label: '¿Quiénes somos?', desc: 'Global nonprofit do-tank fundado en París', color: '#D4AF37', badge: 'WAI' },
  { id: 'que-hacemos', icon: BookOpen, label: '¿Qué hacemos?', desc: 'Educación, investigación y mentoría en IA', color: '#D4AF37' },
  { id: 'objetivo', icon: Target, label: '¿Cuál es nuestro objetivo?', desc: 'Impulsar el rol femenino en la agenda nacional', color: '#D4AF37' },
];

const MODULES_TEAM: NewProjectHubModule[] = [
  { id: 'liderazgo-mx', icon: Users, label: 'Liderazgo México', desc: 'Equipo directivo y coordinadoras WAI México', color: '#D4AF37', badge: 'Activo' },
  { id: 'founders-global', icon: Star, label: 'Fundadoras Globales', desc: 'Dr. Hanan Salam, Caroline Lair y Moojan Asghari', color: '#D4AF37' },
  { id: 'partners', icon: Award, label: 'Colaboradores Principales', desc: 'NEORIS, Sun Life, Deloitte y Capgemini', color: '#D4AF37' },
];

/* ── Styles ─────────────────────────────────────────────────── */

// CRÍTICO: Mantener estos estilos para las transiciones y el scrollbar.
const newProjectHubCss = `
  .new-project-hub-card {
    transition: all 0.25s cubic-bezier(.23,1,.32,1) !important;
  }
  .new-project-hub-card:hover {
    transform: translateX(4px) !important;
  }
  .new-project-hub-scroll::-webkit-scrollbar {
    width: 3px;
  }
  .new-project-hub-scroll::-webkit-scrollbar-track {
    background: transparent;
  }
  .new-project-hub-scroll::-webkit-scrollbar-thumb {
    background: rgba(212, 175, 55, 0.2); 
    border-radius: 10px;
  }
  @keyframes repEnter {
    0% {
      opacity: 0;
      transform: scale(0.94) translateY(12px);
      filter: blur(8px) brightness(0.6);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
      filter: blur(0) brightness(1);
    }
  }
  .representative-image {
    animation: repEnter 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  @keyframes glowPulse {
    0%, 100% {
      transform: scale(0.85);
      opacity: 0.5;
      filter: blur(12px);
    }
    50% {
      transform: scale(1.25);
      opacity: 0.9;
      filter: blur(16px);
    }
  }
  .representative-glow {
    animation: glowPulse 4.5s ease-in-out infinite;
  }
`;

/* ── Sub-components ─────────────────────────────────────────── */

// CRÍTICO: Reutilizar este componente tal cual, solo ajustar colores si brandingConfig.colores.textoOscuro es diferente.
function SectionLabel({ label }: { label: string }) {
  return (
    <div style={{
      fontSize: 9, fontWeight: 800, letterSpacing: '0.18em',
      textTransform: 'uppercase', color: '#64748B', // Usar color gris WAI neutralizado
      padding: '12px 16px 6px',
      fontFamily: "'Inter', system-ui, sans-serif", // Mantener la fuente
    }}>
      {label}
    </div>
  );
}

// ADAPTAR: Esta función debe mapear los 'id' de los módulos del nuevo proyecto
// a las secciones activables.
const mapNewProjectIdToSection = (id: string): string | null => {
  switch (id) {
    case 'quienes-somos':
      return 'asamblea';
    case 'que-hacemos':
      return 'networking';
    case 'objetivo':
      return 'declaratoria';
    case 'partners':
      return 'sponsors';
    default:
      return null;
  }
};

// CRÍTICO: Mantener la estructura de props para la consistencia con SeoHub.
export interface NewProjectHubProps {
  activeSection?: string; // La sección actualmente activa, para resaltado.
  onSectionChange?: (section: string) => void; // Callback cuando una sección cambia.
  onOpenModal?: (id: string, yPos: number) => void; // Adaptar si se usa un modal diferente o eliminar si no es necesario.
}

// ADAPTAR: Reutilizar la estructura de HubCard, ajustando los tipos y la lógica interna.
function NewProjectHubCard({
  mod,
  activeSection,
  onSectionChange,
  onOpenModal
}: {
  mod: NewProjectHubModule;
  activeSection?: string;
  onSectionChange?: (section: string) => void;
  onOpenModal?: (id: string, yPos: number) => void;
}) {
  const Icon = mod.icon;
  const targetSection = mapNewProjectIdToSection(mod.id);
  const isActive = targetSection && activeSection === targetSection;

  // ADAPTAR: Definir qué módulos abren un modal.
  const OPENS_MODAL_IDS = ['liderazgo-mx', 'founders-global'];
  const opensModal = OPENS_MODAL_IDS.includes(mod.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (opensModal && onOpenModal) {
      const rect = e.currentTarget.getBoundingClientRect();
      onOpenModal(mod.id, rect.top + rect.height / 2);
    } else if (targetSection && onSectionChange) {
      onSectionChange(targetSection);
    } else if (mod.link) {
      window.open(mod.link, '_blank', 'noopener noreferrer');
    }
  };

  return (
    <a
      href={mod.link || `#${targetSection || mod.id}`} // Usar el link si existe, sino el targetSection
      target={mod.link ? '_blank' : undefined}
      rel={mod.link ? 'noopener noreferrer' : undefined}
      onClick={handleClick}
      className="new-project-hub-card" // Usar la nueva clase CSS
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 14px', margin: '0 8px 4px',
        borderRadius: 10,
        background: isActive ? 'rgba(212, 175, 55, 0.08)' : colores.fondoSecundario,
        border: `1px solid ${isActive ? '#D4AF37' : colores.borde}`,
        textDecoration: 'none',
        cursor: 'pointer',
        boxShadow: isActive ? '0 0 12px rgba(212, 175, 55, 0.15)' : 'none',
        transition: 'all 0.25s cubic-bezier(.23,1,.32,1)',
      }}
      // CRÍTICO: Mantener los efectos de hover para la consistencia visual (Dorado y Azul).
      onMouseEnter={e => {
        if (!isActive) {
          e.currentTarget.style.borderColor = '#D4AF37';
          e.currentTarget.style.background = 'radial-gradient(circle, rgba(255,255,255,0) 30%, rgba(212, 175, 55, 0.05) 100%)';
          e.currentTarget.style.boxShadow = '0 8px 20px -4px rgba(212, 175, 55, 0.15), 0 0 12px 1px rgba(212, 175, 55, 0.1), inset 0 0 16px rgba(212, 175, 55, 0.05)';
        }
      }}
      onMouseLeave={e => {
        if (!isActive) {
          e.currentTarget.style.borderColor = colores.borde;
          e.currentTarget.style.background = colores.fondoSecundario;
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
    >
      <div style={{
        width: 30, height: 30, borderRadius: 8,
        background: isActive ? 'rgba(212, 175, 55, 0.15)' : 'rgba(212, 175, 55, 0.05)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        transition: 'all 0.2s',
      }}>
        <Icon size={14} color="#D4AF37" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 11, fontWeight: 700,
          color: isActive ? '#D4AF37' : '#E2E8F0',
          display: 'flex', alignItems: 'center', gap: 6,
          fontFamily: "'Inter', system-ui, sans-serif",
          transition: 'all 0.2s',
        }}>
          {mod.label}
          {mod.badge && (
            <span style={{
              fontSize: 8, fontWeight: 800, padding: '1px 6px',
              borderRadius: 99,
              background: 'rgba(212, 175, 55, 0.12)',
              color: '#D4AF37', letterSpacing: '0.05em',
            }}>
              {mod.badge}
            </span>
          )}
        </div>
        <div style={{
          fontSize: 10,
          color: isActive ? '#FFFFFF' : '#94A3B8', lineHeight: 1.3,
          fontFamily: "'Inter', system-ui, sans-serif",
          marginTop: 2,
          transition: 'all 0.2s',
        }}>
          {mod.desc}
        </div>
      </div>
      <ChevronRight size={12} color={isActive ? '#D4AF37' : '#4b5563'} style={{ flexShrink: 0, transition: 'all 0.2s' }} />
    </a>
  );
}

/* ── Main Component ─────────────────────────────────────────── */

const BRAND_LOGOS = [
  { nombre: "Por confirmar...", nivel: "Marca Protagonista", color: "#D4AF37", text: "Por confirmar...", bg: "rgba(212, 175, 55, 0.05)", img: "" },
  { nombre: "MAYiA", nivel: "Premium Sponsor", color: "#D4AF37", text: "MAYiA", bg: "rgba(212, 175, 55, 0.07)", img: "/assets/logosNativos/mayiaLogoBlanco.png" },
  { nombre: "FLAI", nivel: "Premium Sponsor", color: "#FF4081", text: "FLAI", bg: "rgba(255, 64, 129, 0.07)", img: "/assets/logosNativos/flai.png" },
  { nombre: "Sun Life", nivel: "Gold Sponsor", color: "#FFBE00", text: "Sun Life", bg: "rgba(255, 190, 0, 0.05)", img: "/logos/sunlife.svg" },
  { nombre: "Deloitte", nivel: "Venue Partner", color: "#86BC25", text: "Deloitte.", bg: "rgba(134, 188, 37, 0.05)", img: "/logos/deloitte.svg", style: { transform: 'scale(1.25)' } },
  { nombre: "Capgemini", nivel: "Corporate Partner", color: "#0070AD", text: "Capgemini", bg: "rgba(0, 112, 173, 0.05)", img: "/logos/capgeminiWhite.svg" },
  { nombre: "Google Cloud", nivel: "Cloud Partner", color: "#4285F4", text: "Google Cloud", bg: "rgba(66, 133, 244, 0.05)", img: "/logos/google-cloud.svg", style: { transform: 'scale(1.4)' } },
  { nombre: "Qualcomm AI", nivel: "Research Partner", color: "#E2001A", text: "Qualcomm AI", bg: "rgba(226, 0, 26, 0.05)", img: "/logos/Qualcomm.png", style: { transform: 'scale(1.5)' } },
  { nombre: "Microsoft", nivel: "Technology Partner", color: "#00A4EF", text: "Microsoft", bg: "rgba(0, 164, 239, 0.05)", img: "/logos/microsoft.svg", style: { transform: 'scale(1.3)' } },
  { nombre: "AWS", nivel: "Infrastructure Partner", color: "#FF9900", text: "AWS", bg: "rgba(255, 153, 0, 0.05)", img: "/logos/aws.svg" },
];

const REPRESENTANTES = [
  { nombre: "Mtra. Ivete Sánchez Bravo", rol: "Embajadora WAI México", img: "/contribuidoras/ivete.jpeg" },
  { nombre: "Lic. Verónica Viniegra", rol: "Co-Embajadora WAI México", img: "/contribuidoras/Vero.jpeg" },
  { nombre: "Ing. Azucena Algara", rol: "Core Team WAI México", img: "/contribuidoras/Azucena.jpeg" },
  { nombre: "Lic. Bárbara Ruiz-Rodríguez", rol: "Core Team WAI México", img: "/contribuidoras/Barbara.jpeg" },
  { nombre: "Lic. Elbia Elaine Castillo", rol: "Core Team WAI México", img: "/contribuidoras/Elbia.jpeg" },
  { nombre: "Mtra. Karina Regalado", rol: "Core Team WAI México", img: "/contribuidoras/Karina.jpeg" },
  { nombre: "Ing. María de la Paz Rico-Fernández", rol: "Core Team WAI México", img: "/contribuidoras/María.jpeg" },
  { nombre: "Dra. Nayana María Guerrero", rol: "Core Team WAI México", img: "/contribuidoras/Nayana.jpeg" },
  { nombre: "Lic. Samantha Delfín-Azuara", rol: "Core Team WAI México", img: "/contribuidoras/Samantha.jpeg" },
  { nombre: "Ing. Selene Fernández-Valverde", rol: "Core Team WAI México", img: "/contribuidoras/Selene.jpeg" },
  { nombre: "Lic. Yslen González", rol: "Core Team WAI México", img: "/contribuidoras/Yslen.jpeg" },
  { nombre: "Lic. Zulema Estrada", rol: "Core Team WAI México", img: "/contribuidoras/Zulema.jpeg" },
];

export default function NewProjectHub({ activeSection, onSectionChange, onOpenModal }: NewProjectHubProps) {
  const sidebarWidth = '320px'; // Mantener el ancho del sidebar.
  const [brandIndex, setBrandIndex] = React.useState(0);
  const [repIndex, setRepIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setBrandIndex((prev) => (prev + 1) % BRAND_LOGOS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setRepIndex((prev) => (prev + 1) % REPRESENTANTES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const activeBrand = BRAND_LOGOS[brandIndex];
  const activeRep = REPRESENTANTES[repIndex];

  return (
    <aside
      aria-label="Hub WAI — Información y Networking"
      style={{
        width: sidebarWidth,
        flexShrink: 0,
        height: '100%',
        overflow: 'hidden',
        background: colores.fondoSecundario,
        borderLeft: `1px solid ${colores.borde}`,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'width 0.45s cubic-bezier(0.25, 1, 0.2, 1)',
        zIndex: 250,
      }}
    >
      <style>{newProjectHubCss}</style>

      {/* Header - Styled Dark */}
      <div style={{
        height: '72px',
        flexShrink: 0,
        backgroundColor: colores.fondoSecundario,
        borderBottom: `1px solid ${colores.borde}`,
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px 0 24px',
        justifyContent: 'flex-start',
        overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#D4AF37',
              boxShadow: `0 0 8px #D4AF37`,
            }} />
            <span style={{
              fontSize: 10, fontWeight: 800, letterSpacing: '0.15em',
              textTransform: 'uppercase', color: '#D4AF37',
              fontFamily: "'Inter', system-ui, sans-serif",
            }}>
              WAI México Hub
            </span>
          </div>
          <p style={{
            margin: 0, fontSize: 10, color: '#94A3B8',
            fontFamily: "'Inter', system-ui, sans-serif",
          }}>
            Encuentro, Vinculación e Información
          </p>
        </div>
      </div>

      {/* Content Scroll Container */}
      <div
        className="new-project-hub-scroll"
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          scrollbarWidth: 'thin',
          scrollbarColor: `${colores.borde} transparent`,
        }}
      >
        <SectionLabel label="Representantes" />
        <div style={{ padding: '0 8px 12px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px',
              borderRadius: 12,
              background: 'rgba(212, 175, 55, 0.02)',
              border: '1px solid rgba(212, 175, 55, 0.12)',
              boxShadow: '0 8px 32px 0 rgba(2, 11, 28, 0.4)',
              minHeight: '260px',
              transition: 'all 0.5s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Ambient Gold Glow Backdrop */}
            <div
              key={`glow-${repIndex}`}
              className="representative-glow"
              style={{
                position: 'absolute',
                width: '160px',
                height: '160px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.16) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0
              }}
            />

            {/* Full Image Container */}
            <div style={{
              width: '100%',
              height: '250px',
              borderRadius: '8px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 1
            }}>
              <img
                key={`img-${repIndex}`}
                className="representative-image"
                src={activeRep.img}
                alt={activeRep.nombre}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  borderRadius: '6px'
                }}
              />
            </div>
          </div>

          {/* Dot indicators for representatives */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginTop: '8px' }}>
            {REPRESENTANTES.map((_, i) => (
              <div
                key={i}
                onClick={() => setRepIndex(i)}
                style={{
                  width: i === repIndex ? '12px' : '4px',
                  height: '4px',
                  borderRadius: '2px',
                  backgroundColor: i === repIndex ? '#D4AF37' : 'rgba(255,255,255,0.15)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>

        <SectionLabel label="Marcas" />
        <div style={{ padding: '0 8px 12px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px 16px',
              borderRadius: 12,
              background: activeBrand.bg,
              border: `1px solid ${activeBrand.color}33`,
              boxShadow: `0 8px 32px 0 rgba(2, 11, 28, 0.4)`,
              textAlign: 'center',
              minHeight: '130px',
              transition: 'background 0.5s ease, border-color 0.5s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Background branding glow */}
            <div style={{
              position: 'absolute',
              top: '-30px', right: '-30px',
              width: '80px', height: '80px', borderRadius: '50%',
              background: `radial-gradient(circle, ${activeBrand.color}1f 0%, transparent 70%)`,
              pointerEvents: 'none',
            }} />

            {/* Logo image or styled text */}
            {(activeBrand as any).img ? (
              <div style={{
                width: '100%',
                height: '65px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
                overflow: 'hidden'
              }}>
                <img
                  src={(activeBrand as any).img}
                  alt={activeBrand.nombre}
                  style={{
                    maxWidth: '90%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    filter: (activeBrand as any).img.endsWith('.jpeg') || (activeBrand as any).img.endsWith('.jpg')
                      ? 'none'
                      : 'drop-shadow(0 0 6px rgba(255,255,255,0.12))',
                    borderRadius: (activeBrand as any).img.endsWith('.jpeg') || (activeBrand as any).img.endsWith('.jpg')
                      ? '6px'
                      : '0px',
                    ...((activeBrand as any).style || {})
                  }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            ) : (
              <div style={{
                fontSize: '20px',
                fontWeight: '900',
                color: activeBrand.color,
                letterSpacing: '1px',
                textShadow: `0 0 10px ${activeBrand.color}33`,
                marginBottom: '12px',
                fontFamily: "'Inter', sans-serif"
              }}>
                {activeBrand.text}
              </div>
            )}

            {/* Brand Tier / Info */}
            <div style={{
              fontSize: '10px',
              color: '#94A3B8',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontWeight: '600'
            }}>
              {activeBrand.nivel}
            </div>
          </div>

          {/* Dot indicators */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginTop: '8px' }}>
            {BRAND_LOGOS.map((_, i) => (
              <div
                key={i}
                onClick={() => setBrandIndex(i)}
                style={{
                  width: i === brandIndex ? '16px' : '5px',
                  height: '5px',
                  borderRadius: '3px',
                  backgroundColor: i === brandIndex ? activeBrand.color : 'rgba(255,255,255,0.15)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>

        <SectionLabel label="Canales Externos WAI" />
        <div style={{ padding: '0 8px 16px' }}>
          {[
            { medio: 'Sitio Oficial', titulo: 'Visitar portal global de Women in AI', url: 'https://www.womeninai.co/' },
            { medio: 'Sobre WAI', titulo: 'Conoce la historia y fundadoras de WAI', url: 'https://www.womeninai.co/about-wai' },
          ].map((n, i) => (
            <a
              key={i}
              href={n.url}
              target="_blank"
              rel="noopener noreferrer"
              className="new-project-hub-card"
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 10px', marginBottom: 4,
                borderRadius: 8, textDecoration: 'none',
                background: 'rgba(0,0,0,0.2)',
                border: `1px solid ${colores.borde}`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#D4AF37';
                e.currentTarget.style.background = 'rgba(212, 175, 55, 0.04)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = colores.borde;
                e.currentTarget.style.background = 'rgba(0,0,0,0.2)';
              }}
            >
              <ExternalLink size={12} color="#D4AF37" style={{ flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#d1d5db', lineHeight: 1.3, fontFamily: "'Inter', system-ui, sans-serif" }}>
                  {n.titulo}
                </div>
                <div style={{ fontSize: 9, color: '#6b7280', fontFamily: "'Inter', system-ui, sans-serif" }}>
                  {n.medio}
                </div>
              </div>
              <ExternalLink size={10} color="#4b5563" style={{ flexShrink: 0 }} />
            </a>
          ))}
        </div>

        {/* Footer area */}
        <div style={{
          padding: '16px',
          marginTop: 'auto',
          borderTop: `1.5px solid ${colores.borde}`,
          textAlign: 'center',
        }}>
          <p style={{
            margin: 0, fontSize: 10, color: '#94A3B8',
            fontFamily: "'Inter', system-ui, sans-serif",
            letterSpacing: '0.05em',
          }}>
            Women in AI México · © 2026
          </p>
        </div>
      </div>
    </aside>
  );
}
