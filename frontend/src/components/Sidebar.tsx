import React, { useState } from 'react';
import {
  LayoutDashboard,
  Fuel,
  TrendingUp,
  ShieldCheck,
  Store,
  Truck,
  CreditCard,
  Zap,
  Cpu,
  Wifi,
  Activity
} from 'lucide-react';
import { brandingConfig } from '../config/branding';
import { MODULOS_GAS_STATION } from '../gasStation/gasStationData';

const iconMap: Record<string, any> = {
  Fuel,
  TrendingUp,
  ShieldCheck,
  Store,
  Truck,
  CreditCard,
  Zap,
  Cpu,
};

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  modo?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const { colores } = brandingConfig;
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const totalAlerts = MODULOS_GAS_STATION.reduce((acc, m) => acc + m.alertas, 0);

  const categorias = [
    {
      titulo: 'TELEMETRÍA & COMBUSTIBLE',
      color: '#0284C7',
      items: MODULOS_GAS_STATION.filter(m => m.categoria === 'combustible')
    },
    {
      titulo: 'SEGURIDAD & RETAIL',
      color: '#DC2626',
      items: MODULOS_GAS_STATION.filter(m => m.categoria === 'seguridad_retail')
    },
    {
      titulo: 'B2B & EXPERIENCIA',
      color: '#7C3AED',
      items: MODULOS_GAS_STATION.filter(m => m.categoria === 'b2b_clientes')
    },
    {
      titulo: 'INFRAESTRUCTURA & TI',
      color: '#059669',
      items: MODULOS_GAS_STATION.filter(m => m.categoria === 'infraestructura')
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
      {/* ── Logo & Header Gas Station Inteligente (Icono Genérico Fuel) ── */}
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
              background: 'linear-gradient(135deg, #059669 0%, #065F46 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(5, 150, 105, 0.35)',
              color: '#FFFFFF',
            }}
          >
            <Fuel size={22} />
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: '900', color: '#0F172A', letterSpacing: '-0.3px', lineHeight: 1.1 }}>
              Gas Station
            </div>
            <div style={{ fontSize: '10px', color: '#059669', fontWeight: '800', letterSpacing: '0.05em' }}>
              INTELIGENTE 4.0
            </div>
          </div>

          {totalAlerts > 0 && (
            <div
              title={`${totalAlerts} alertas operativas activas`}
              style={{
                marginLeft: 'auto',
                backgroundColor: '#DC2626',
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
              backgroundColor: activeSection === 'dashboard' ? '#059669' : 'transparent',
              color: activeSection === 'dashboard' ? '#FFFFFF' : colores.textoClaro,
              transition: 'all 0.2s',
              textAlign: 'left',
              boxShadow: activeSection === 'dashboard' ? '0 4px 14px rgba(5, 150, 105, 0.35)' : 'none',
            }}
            onMouseEnter={e => {
              if (activeSection !== 'dashboard') {
                e.currentTarget.style.backgroundColor = '#D1FAE5';
                e.currentTarget.style.color = '#059669';
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
                backgroundColor: activeSection === 'dashboard' ? 'rgba(255,255,255,0.2)' : '#D1FAE5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LayoutDashboard size={16} color={activeSection === 'dashboard' ? '#FFFFFF' : '#059669'} />
            </div>
            <span style={{ fontSize: '13px', fontWeight: '800', flex: 1 }}>
              Dashboard General
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
              const IconComp = iconMap[item.iconoName] || Fuel;
              const isActive = activeSection === item.id;
              const itemColor = item.color || cat.color;

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
                      fontSize: '12px',
                      fontWeight: isActive ? '800' : '600',
                      flex: 1,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    M{item.numero}: {item.titulo.split(' ')[0]} {item.titulo.split(' ')[1] || ''}
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
          Estación Conectada IoT
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
