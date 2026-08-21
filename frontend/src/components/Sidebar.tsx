import React, { useState } from 'react';
import {
  LayoutDashboard,
  Building2,
  Users,
  Briefcase,
  FileText,
  Landmark,
  CheckSquare,
  FolderGit2,
  TrendingUp,
  Flame,
  Wifi,
  ShieldCheck
} from 'lucide-react';
import { brandingConfig } from '../config/branding';
import { MODULOS_FSPM } from '../fspm/fspmData';

const iconMap: Record<string, any> = {
  LayoutDashboard,
  Building2,
  Users,
  Briefcase,
  FileText,
  Landmark,
  CheckSquare,
  FolderGit2,
  TrendingUp,
};

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  modo?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const { colores } = brandingConfig;
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const totalAlerts = MODULOS_FSPM.reduce((acc, m) => acc + m.alertas, 0);

  const categorias = [
    {
      titulo: 'GESTIÓN COMERCIAL',
      color: '#D32F2F',
      items: MODULOS_FSPM.filter(m => m.categoria === 'comercial' && m.id !== 'dashboard')
    },
    {
      titulo: 'LICITACIONES & GOBIERNO',
      color: '#D97706',
      items: MODULOS_FSPM.filter(m => m.categoria === 'licitaciones')
    },
    {
      titulo: 'OPERACIONES & SEGUIMIENTO',
      color: '#10B981',
      items: MODULOS_FSPM.filter(m => m.categoria === 'operacion')
    },
    {
      titulo: 'REPOSITORIO & DIRECCIÓN',
      color: '#0F172A',
      items: MODULOS_FSPM.filter(m => m.categoria === 'gestion')
    }
  ];

  return (
    <div
      style={{
        width: '250px',
        height: '100vh',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRight: `1px solid ${colores.borde}`,
        position: 'relative',
      }}
    >
      {/* ── Logo & Header FSPM (Genérico) ── */}
      <div
        style={{
          padding: '18px 20px',
          flexShrink: 0,
          borderBottom: `1px solid ${colores.borde}`,
          position: 'relative',
          zIndex: 1,
          backgroundColor: '#FFFFFF',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #D32F2F 0%, #9A0007 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(211, 47, 47, 0.35)',
              color: '#FFFFFF',
            }}
          >
            <Flame size={22} />
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.3px', lineHeight: 1.1 }}>
              FSPM CRM
            </div>
            <div style={{ fontSize: '10px', color: '#D32F2F', fontWeight: '800', letterSpacing: '0.05em' }}>
              PROTECCIÓN CONTRA INCENDIO
            </div>
          </div>

          {totalAlerts > 0 && (
            <div
              title={`${totalAlerts} alertas operativas activas`}
              style={{
                marginLeft: 'auto',
                backgroundColor: '#D32F2F',
                color: '#FFFFFF',
                fontSize: '10px',
                fontWeight: '900',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {totalAlerts}
            </div>
          )}
        </div>
      </div>

      {/* ── Navegación ── */}
      <nav
        className="styled-scroll"
        style={{
          flex: '1 1 0',
          minHeight: 0,
          overflowY: 'auto',
          padding: '16px 12px 20px 12px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Dashboard principal */}
        <div style={{ marginBottom: '16px' }}>
          <button
            onClick={() => onSectionChange('dashboard')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeSection === 'dashboard' ? '#D32F2F' : 'transparent',
              color: activeSection === 'dashboard' ? '#FFFFFF' : colores.textoClaro,
              transition: 'all 0.2s',
              textAlign: 'left',
              boxShadow: activeSection === 'dashboard' ? '0 4px 14px rgba(211, 47, 47, 0.35)' : 'none',
            }}
            onMouseEnter={e => {
              if (activeSection !== 'dashboard') {
                e.currentTarget.style.backgroundColor = '#FEE2E2';
                e.currentTarget.style.color = '#D32F2F';
              }
            }}
            onMouseLeave={e => {
              if (activeSection !== 'dashboard') {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = colores.textoClaro;
              }
            }}
          >
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '8px',
                flexShrink: 0,
                backgroundColor: activeSection === 'dashboard' ? 'rgba(255,255,255,0.2)' : '#FEE2E2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LayoutDashboard size={16} color={activeSection === 'dashboard' ? '#FFFFFF' : '#D32F2F'} />
            </div>
            <span style={{ fontSize: '13px', fontWeight: '800', flex: 1 }}>
              Dashboard FSPM
            </span>
          </button>
        </div>

        {/* Categorías de módulos */}
        {categorias.map((cat, cIdx) => (
          <div key={cIdx} style={{ marginBottom: '18px' }}>
            <div
              style={{
                fontSize: '9.5px',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: cat.color,
                marginBottom: '8px',
                paddingLeft: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <div style={{ width: '12px', height: '2px', backgroundColor: cat.color, borderRadius: '1px' }} />
              {cat.titulo}
            </div>

            {cat.items.map((item) => {
              const IconComp = iconMap[item.iconoName] || Briefcase;
              const isActive = activeSection === item.id;
              const itemColor = cat.color;

              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '9px',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    marginBottom: '2px',
                    backgroundColor: isActive ? itemColor : hoveredItem === item.id ? `${itemColor}12` : 'transparent',
                    color: isActive ? '#FFFFFF' : hoveredItem === item.id ? itemColor : colores.textoClaro,
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.18s',
                    boxShadow: isActive ? `0 3px 10px ${itemColor}40` : 'none',
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      flexShrink: 0,
                      backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : `${itemColor}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IconComp size={14} color={isActive ? '#FFFFFF' : itemColor} />
                  </div>
                  <span
                    style={{
                      fontSize: '12.5px',
                      fontWeight: isActive ? '800' : '600',
                      flex: 1,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.titulo}
                  </span>
                  {item.alertas > 0 && (
                    <span
                      style={{
                        backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : `${itemColor}20`,
                        color: isActive ? '#FFFFFF' : itemColor,
                        fontSize: '10px',
                        fontWeight: '900',
                        padding: '1px 6px',
                        borderRadius: '8px',
                        flexShrink: 0,
                      }}
                    >
                      {item.alertas}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* ── Status Bar Inferior ── */}
      <div
        style={{
          padding: '12px 16px',
          borderTop: `1px solid ${colores.borde}`,
          backgroundColor: '#FFFFFF',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <Wifi size={14} color="#10B981" />
        <span style={{ fontSize: '11px', fontWeight: '700', color: '#059669' }}>
          Workspace Conectado
        </span>
        <span
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: '#10B981',
            marginLeft: 'auto',
            boxShadow: '0 0 8px #10B981',
          }}
        />
      </div>
    </div>
  );
};
