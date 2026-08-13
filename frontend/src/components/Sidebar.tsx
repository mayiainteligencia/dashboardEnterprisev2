import React, { useState } from 'react';
import { LayoutDashboard, Eye, Bot, UserCheck, Tv, Camera, Database, GraduationCap, LayoutGrid, Activity, Compass, Wifi } from 'lucide-react';
import { brandingConfig } from '../config/branding';
import { MODULOS_TOTALPLAY } from '../totalplay/totalplayData';

const iconMap: Record<string, any> = {
  Eye, Bot, UserCheck, Tv, Camera, Database, GraduationCap, LayoutGrid, Activity, Compass,
};

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  modo?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const { colores } = brandingConfig;
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const totalAlerts = MODULOS_TOTALPLAY.reduce((acc, m) => acc + m.alertas, 0);

  const categorias = [
    {
      titulo: 'INTELIGENCIA COMERCIAL',
      color: '#A61C5C',
      items: MODULOS_TOTALPLAY.filter(m => m.categoria === 'comercial')
    },
    {
      titulo: 'OPERACIONES M2C',
      color: '#732D67',
      items: MODULOS_TOTALPLAY.filter(m => m.categoria === 'operaciones')
    },
    {
      titulo: 'EXPERIENCIA & DISPLAYS',
      color: '#D9933D',
      items: MODULOS_TOTALPLAY.filter(m => m.categoria === 'experiencia')
    },
    {
      titulo: 'TECNOLOGÍA & CRM',
      color: '#73B1BF',
      items: MODULOS_TOTALPLAY.filter(m => m.categoria === 'tecnologia')
    }
  ];

  return (
    <div
      style={{
        width: '250px',
        height: '100vh',
        backgroundColor: '#FDFAFB',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRight: `1px solid ${colores.borde}`,
        position: 'relative',
      }}
    >
      {/* Subtle gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(180deg, rgba(115,177,191,0.05) 0%, rgba(255,255,255,0) 40%)',
        zIndex: 0
      }} />

      {/* ── Logo Header ── */}
      <div style={{
        padding: '16px 18px',
        flexShrink: 0,
        borderBottom: `1px solid ${colores.borde}`,
        position: 'relative', zIndex: 1,
        background: '#FFFFFF',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src="/assets/logosNativos/TotalPlay.png"
            alt="Totalplay Logo"
            style={{ height: '36px', objectFit: 'contain' }}
          />
          <div>
            <div style={{ fontSize: '10px', color: '#73B1BF', fontWeight: '800', letterSpacing: '0.05em' }}>
              Plataforma M2C
            </div>
          </div>
          {totalAlerts > 0 && (
            <div className="badge-pulse" style={{
              marginLeft: 'auto',
              backgroundColor: '#A61C5C', color: '#FFFFFF',
              fontSize: '10px', fontWeight: '900',
              width: '20px', height: '20px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {totalAlerts}
            </div>
          )}
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav
        className="styled-scroll"
        style={{
          flex: '1 1 0', minHeight: 0, overflowY: 'auto',
          padding: '16px 10px 20px 10px', position: 'relative', zIndex: 1,
        }}
      >
        {/* Dashboard principal */}
        <div style={{ marginBottom: '16px' }}>
          <button
            onClick={() => onSectionChange('dashboard')}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 12px', borderRadius: '12px', border: 'none', cursor: 'pointer',
              backgroundColor: activeSection === 'dashboard' ? '#73B1BF' : 'transparent',
              color: activeSection === 'dashboard' ? '#FFFFFF' : colores.textoClaro,
              transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
              textAlign: 'left',
              boxShadow: activeSection === 'dashboard' ? '0 4px 14px rgba(115,177,191,0.35)' : 'none',
            }}
            onMouseEnter={e => {
              if (activeSection !== 'dashboard') {
                e.currentTarget.style.backgroundColor = '#EAF5F7';
                e.currentTarget.style.color = '#73B1BF';
              }
            }}
            onMouseLeave={e => {
              if (activeSection !== 'dashboard') {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = colores.textoClaro;
              }
            }}
          >
            <div style={{
              width: '30px', height: '30px', borderRadius: '9px', flexShrink: 0,
              backgroundColor: activeSection === 'dashboard' ? 'rgba(255,255,255,0.2)' : '#E6F4F6',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <LayoutDashboard size={16} color={activeSection === 'dashboard' ? '#FFFFFF' : '#73B1BF'} />
            </div>
            <span style={{ fontSize: '13px', fontWeight: '700', flex: 1 }}>
              Dashboard Totalplay
            </span>
            {activeSection === 'dashboard' && (
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.6)' }} />
            )}
          </button>
        </div>

        {/* Category groups */}
        {categorias.map((cat, cIdx) => (
          <div key={cIdx} style={{ marginBottom: '20px' }}>
            <div style={{
              fontSize: '9.5px', fontWeight: 900, textTransform: 'uppercase',
              letterSpacing: '0.08em', color: cat.color,
              marginBottom: '8px', paddingLeft: '10px',
              display: 'flex', alignItems: 'center', gap: '6px'
            }}>
              <div style={{ width: '16px', height: '2px', backgroundColor: cat.color, borderRadius: '1px', flexShrink: 0 }} />
              {cat.titulo}
            </div>

            {cat.items.map((item) => {
              const IconComp = iconMap[item.iconoName] || Activity;
              const isActive = activeSection === item.id;
              const itemColor = cat.color;

              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: '9px',
                    padding: '8px 12px', borderRadius: '10px', marginBottom: '2px',
                    backgroundColor: isActive ? itemColor : hoveredItem === item.id ? `${itemColor}12` : 'transparent',
                    color: isActive ? '#FFFFFF' : hoveredItem === item.id ? itemColor : colores.textoClaro,
                    border: 'none', cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.18s cubic-bezier(0.22, 1, 0.36, 1)',
                    boxShadow: isActive ? `0 3px 10px ${itemColor}40` : 'none',
                    position: 'relative',
                  }}
                >
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
                    backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : `${itemColor}15`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.18s',
                  }}>
                    <IconComp size={14} color={isActive ? '#FFFFFF' : itemColor} />
                  </div>
                  <span style={{
                    fontSize: '12.5px', fontWeight: isActive ? '700' : '500',
                    flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {item.titulo}
                  </span>
                  {item.alertas > 0 && (
                    <span style={{
                      backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : `${itemColor}20`,
                      color: isActive ? '#FFFFFF' : itemColor,
                      fontSize: '10px', fontWeight: '800',
                      padding: '1px 6px', borderRadius: '8px', flexShrink: 0,
                    }}>
                      {item.alertas}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* ── Bottom Status Bar ── */}
      <div style={{
        padding: '12px 16px',
        borderTop: `1px solid ${colores.borde}`,
        backgroundColor: '#FFFFFF',
        flexShrink: 0, zIndex: 1, position: 'relative',
        display: 'flex', alignItems: 'center', gap: '8px',
      }}>
        <Wifi size={14} color="#5B8F20" />
        <span style={{ fontSize: '11px', fontWeight: '600', color: '#5B8F20' }}>
          Sistema en línea
        </span>
        <span className="live-dot live-dot-green" style={{ width: '7px', height: '7px', marginLeft: 'auto' }} />
      </div>
    </div>
  );
};
