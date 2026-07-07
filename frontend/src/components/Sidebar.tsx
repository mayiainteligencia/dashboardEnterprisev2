import React from 'react';
import {
  LayoutDashboard,
  Navigation,
  AlertTriangle,
  Clock,
  CreditCard,
  Building2,
  Accessibility,
  Compass,
  ChevronRight,
  Train,
  ShieldCheck,
} from 'lucide-react';
import { brandingConfig } from '../config/branding';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

interface NavItem {
  id: string;
  nombre: string;
  icono: React.ComponentType<any>;
  color: string;
  description: string;
  badge: number | null;
}

const mainItems: NavItem[] = [
  {
    id: 'dashboard',
    nombre: 'Centro de Movilidad',
    icono: LayoutDashboard,
    color: '#D40000',
    description: 'Resumen y métricas',
    badge: null,
  },
  {
    id: 'home',
    nombre: 'Planificador de Rutas',
    icono: Navigation,
    color: '#003DA5',
    description: 'Puerta a puerta',
    badge: null,
  },
];

const modulosItems: NavItem[] = [
  {
    id: 'estado',
    nombre: 'Estado del Servicio',
    icono: AlertTriangle,
    color: '#F5A623',
    description: 'Líneas y alertas en vivo',
    badge: 3,        // 3 alertas activas
  },
  {
    id: 'salidas',
    nombre: 'Próximas Salidas',
    icono: Clock,
    color: '#003DA5',
    description: 'Frecuencias en tiempo real',
    badge: null,
  },
  {
    id: 'tarifas',
    nombre: 'Tarifas y Pago',
    icono: CreditCard,
    color: '#00843D',
    description: 'Tarjeta MI y costos',
    badge: null,
  },
  {
    id: 'operadores',
    nombre: 'Operadores CDMX',
    icono: Building2,
    color: '#6929C4',
    description: 'Directorio institucional',
    badge: null,
  },
  {
    id: 'accesible',
    nombre: 'Viaje Accesible',
    icono: Accessibility,
    color: '#E87722',
    description: 'Guías de inclusión',
    badge: null,
  },
  {
    id: 'turismo',
    nombre: 'Salidas y Turismo',
    icono: Compass,
    color: '#D946EF',
    description: 'Destinos y eventos',
    badge: null,
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const { empresa } = brandingConfig;

  const renderItem = (item: NavItem, isActive: boolean) => {
    const Icon = item.icono;
    return (
      <button
        key={item.id}
        id={`sidebar-btn-${item.id}`}
        onClick={() => onSectionChange(item.id)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '9px 12px',
          borderRadius: '11px',
          marginBottom: '3px',
          backgroundColor: isActive ? `${item.color}18` : 'transparent',
          border: isActive ? `1px solid ${item.color}35` : '1px solid transparent',
          color: isActive ? '#FFFFFF' : '#A0AEC0',
          cursor: 'pointer',
          transition: 'all 0.18s ease',
          textAlign: 'left',
          position: 'relative',
          overflow: 'hidden',
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = 'rgba(212,0,0,0.05)';
            e.currentTarget.style.color = '#FFFFFF';
            e.currentTarget.style.borderColor = 'rgba(212,0,0,0.15)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#A0AEC0';
            e.currentTarget.style.borderColor = 'transparent';
          }
        }}
      >
        {/* Active left border indicator */}
        {isActive && (
          <div style={{
            position: 'absolute',
            left: 0, top: '18%', bottom: '18%',
            width: '3px',
            borderRadius: '0 3px 3px 0',
            background: item.color,
          }} />
        )}

        {/* Icon box */}
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '9px',
          background: isActive ? `${item.color}22` : '#1C1C28',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          border: isActive ? `1px solid ${item.color}35` : '1px solid #2A2A3E',
          transition: 'all 0.18s',
        }}>
          <Icon size={15} color={isActive ? item.color : '#717187'} />
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: '12.5px',
            fontWeight: isActive ? '700' : '500',
            color: isActive ? '#FFFFFF' : '#A0AEC0',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: 1.2,
          }}>
            {item.nombre}
          </div>
          <div style={{
            fontSize: '10px',
            color: isActive ? item.color : '#4A5568',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginTop: '1px',
          }}>
            {item.description}
          </div>
        </div>

        {/* Badge */}
        {item.badge && !isActive && (
          <div style={{
            minWidth: '18px',
            height: '18px',
            borderRadius: '9px',
            background: '#D40000',
            color: '#fff',
            fontSize: '10px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 5px',
            flexShrink: 0,
            animation: 'pulse-glow 2s infinite',
          }}>
            {item.badge}
          </div>
        )}

        {isActive && (
          <ChevronRight size={13} color={item.color} style={{ flexShrink: 0 }} />
        )}
      </button>
    );
  };

  return (
    <div style={{
      width: '240px',
      height: '100vh',
      background: 'linear-gradient(180deg, #111118 0%, #0D0D0D 100%)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      borderRight: '1px solid #1E1E2A',
      position: 'relative',
    }}>
      {/* Subtle metro track background line */}
      <div style={{
        position: 'absolute',
        top: 0, bottom: 0, left: '27px',
        width: '1px',
        background: 'linear-gradient(180deg, rgba(212,0,0,0.08) 0%, rgba(0,61,165,0.06) 60%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Logo */}
      <div style={{ padding: '18px 14px 14px', flexShrink: 0, position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #D40000 0%, #8B0000 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 14px rgba(212,0,0,0.35)',
          }}>
            <Train size={22} color="#FFFFFF" />
          </div>
          <div>
            <div style={{
              fontSize: '15px', fontWeight: '800', color: '#FFFFFF',
              fontFamily: 'Outfit, sans-serif', lineHeight: 1.1, letterSpacing: '-0.01em',
            }}>
              {empresa.nombre}
            </div>
            <div style={{
              fontSize: '9px', color: '#D40000', fontWeight: '700',
              marginTop: '2px', letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
              MOVILIDAD CDMX
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="no-scrollbar" style={{
        flex: '1 1 0',
        minHeight: 0,
        overflowY: 'auto',
        padding: '0 8px',
        position: 'relative',
        zIndex: 10,
      }}>
        {/* Main section */}
        <div style={{ padding: '4px 8px 5px', marginBottom: '2px' }}>
          <span style={{ fontSize: '9.5px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#3A3A52' }}>
            Principal
          </span>
        </div>
        {mainItems.map((item) => renderItem(item, activeSection === item.id))}

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #1E1E2A, transparent)', margin: '8px 4px' }} />

        {/* Sistemas section */}
        <div style={{ padding: '4px 8px 5px', marginBottom: '2px' }}>
          <span style={{ fontSize: '9.5px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#3A3A52' }}>
            Sistemas
          </span>
        </div>
        {modulosItems.map((item) => renderItem(item, activeSection === item.id))}
      </nav>

      {/* Footer: system status */}
      <div style={{
        padding: '10px 14px 14px',
        flexShrink: 0,
        borderTop: '1px solid #1E1E2A',
        position: 'relative',
        zIndex: 10,
      }}>
        {/* Line color bar */}
        <div style={{ height: '3px', borderRadius: '2px', marginBottom: '10px', display: 'flex', overflow: 'hidden', gap: '1px' }}>
          {['#F54394','#004F9F','#007D63','#B0925A','#F5A623','#DA0000','#E87722','#009A44','#6B2E8C','#B5A139','#6B6B6B','#6BC2C8'].map((c, i) => (
            <div key={i} style={{ flex: 1, backgroundColor: c, opacity: 0.8 }} />
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: '#00843D', boxShadow: '0 0 8px #00843D',
            animation: 'pulse-green 2s infinite',
            flexShrink: 0,
          }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: '#A0AEC0', fontWeight: '600' }}>
              Red de CDMX · 12 Líneas
            </div>
            <div style={{ fontSize: '10px', color: '#00843D', marginTop: '1px' }}>
              92% Operando · 3 Alertas
            </div>
          </div>
          <ShieldCheck size={13} color="#3A3A52" />
        </div>
      </div>
    </div>
  );
};