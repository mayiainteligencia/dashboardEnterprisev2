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

export default function NewProjectHub({ activeSection, onSectionChange, onOpenModal }: NewProjectHubProps) {
  const sidebarWidth = '320px'; // Mantener el ancho del sidebar.

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
        <SectionLabel label="Información Estratégica" />
        {MODULES_INFO.map(m => (
          <NewProjectHubCard
            key={m.id}
            mod={m}
            activeSection={activeSection}
            onSectionChange={onSectionChange}
            onOpenModal={onOpenModal}
          />
        ))}

        <SectionLabel label="Equipo y Alianzas" />
        {MODULES_TEAM.map(m => (
          <NewProjectHubCard
            key={m.id}
            mod={m}
            activeSection={activeSection}
            onSectionChange={onSectionChange}
            onOpenModal={onOpenModal}
          />
        ))}

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
