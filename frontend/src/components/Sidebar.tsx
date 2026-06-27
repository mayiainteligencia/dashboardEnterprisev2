import React from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  Utensils,
  BookOpen,
  Users,
  Map,
  ShoppingBag,
  ChevronRight,
  Sparkles,
  Store,
} from 'lucide-react';
import { brandingConfig } from '../config/branding';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const mainItems = [
  {
    id: 'dashboard',
    nombre: 'Command Center',
    icono: LayoutDashboard,
    color: '#D31245',
    description: 'Vista ejecutiva',
  },
];

const modulosItems = [
  {
    id: 'demanda',
    nombre: 'Demand Sensing',
    icono: TrendingUp,
    color: '#1E40AF',
    description: 'Forecast regional & SKU',
  },
  {
    id: 'copilot-chef',
    nombre: 'Chef Copilot',
    icono: Utensils,
    color: '#D31245',
    description: 'Recetario y rendimiento',
  },
  {
    id: 'academia',
    nombre: 'Academia Rich',
    icono: BookOpen,
    color: '#EA580C',
    description: 'Capacitación IA B2B',
  },
  {
    id: 'ventas-b2b',
    nombre: 'Ventas Foodservice',
    icono: Users,
    color: '#10B981',
    description: 'Simulador & Objeciones',
  },
  {
    id: 'distribuidores',
    nombre: 'Distribuidor 360',
    icono: Map,
    color: '#F59E0B',
    description: 'Cobertura y frecuencia',
  },
  {
    id: 'ecommerce-mkt',
    nombre: 'E-commerce & Mkt',
    icono: ShoppingBag,
    color: '#EF4444',
    description: 'Precios & Competencia',
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const { empresa, colores } = brandingConfig;

  const renderItem = (item: typeof mainItems[0], isActive: boolean) => {
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
          padding: '10px 14px',
          borderRadius: '12px',
          marginBottom: '2px',
          backgroundColor: isActive ? item.color : 'transparent',
          border: isActive
            ? `1px solid ${item.color}`
            : '1px solid transparent',
          color: isActive ? '#FFFFFF' : '#475569',
          cursor: 'pointer',
          transition: 'all 0.2s',
          textAlign: 'left',
          position: 'relative',
          overflow: 'hidden',
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = '#F1F5F9';
            e.currentTarget.style.color = '#0F172A';
            e.currentTarget.style.borderColor = '#E2E8F0';
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#475569';
            e.currentTarget.style.borderColor = 'transparent';
          }
        }}
      >
        {/* Icon */}
        <div style={{
          width: '34px',
          height: '34px',
          borderRadius: '10px',
          background: isActive ? 'rgba(255, 255, 255, 0.2)' : '#F1F5F9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          border: isActive ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid #E2E8F0',
          transition: 'all 0.2s',
        }}>
          <Icon size={16} color={isActive ? '#FFFFFF' : '#475569'} />
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: '13px',
            fontWeight: isActive ? '600' : '500',
            color: isActive ? '#FFFFFF' : '#475569',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {item.nombre}
          </div>
          <div style={{
            fontSize: '10px',
            color: isActive ? 'rgba(255, 255, 255, 0.8)' : '#64748B',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {item.description}
          </div>
        </div>

        {isActive && (
          <ChevronRight size={14} color="#FFFFFF" style={{ flexShrink: 0 }} />
        )}
      </button>
    );
  };

  return (
    <div style={{
      width: '240px',
      height: '100vh',
      background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      borderRight: '1px solid #E2E8F0',
      position: 'relative',
    }}>
      {/* Subtle grid pattern overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(211,18,69,0.02) 1px, transparent 0)',
        backgroundSize: '24px 24px',
        pointerEvents: 'none',
      }} />

      {/* Logo */}
      <div style={{ padding: '20px 16px 16px', flexShrink: 0, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Logo container */}
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #1E40AF 0%, #D31245 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 16px rgba(211,18,69,0.2)',
            overflow: 'hidden',
          }}>
            <img
              src={empresa.logoUrl}
              alt={empresa.nombre}
              style={{ width: '90%', height: 'auto', objectFit: 'contain' }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  const icon = document.createElement('div');
                  icon.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`;
                  parent.appendChild(icon);
                }
              }}
            />
          </div>

          <div>
            <div style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A', fontFamily: 'Outfit, sans-serif', lineHeight: 1.1 }}>
              {empresa.nombre}
            </div>
            <div style={{ fontSize: '10px', color: '#D31245', fontWeight: '600', marginTop: '2px', letterSpacing: '0.04em' }}>
              × MAYIA IA
            </div>
          </div>
        </div>

        {/* Platform badge */}
        <div style={{
          marginTop: '12px',
          padding: '6px 10px',
          background: 'rgba(211,18,69,0.05)',
          border: '1px solid rgba(211,18,69,0.15)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <Sparkles size={11} color="#D31245" />
          <span style={{ fontSize: '9px', color: '#A30E33', fontWeight: '700', letterSpacing: '0.04em' }}>
            COMMAND CENTER EMPRESARIAL
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="no-scrollbar" style={{
        flex: '1 1 0',
        minHeight: 0,
        overflowY: 'auto',
        padding: '0 10px',
        position: 'relative',
      }}>
        {/* Overview Section */}
        <div style={{ padding: '4px 8px 6px', marginBottom: '4px' }}>
          <span style={{
            fontSize: '10px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#334155',
          }}>
            General
          </span>
        </div>
        {mainItems.map((item) => renderItem(item, activeSection === item.id))}

        {/* Modules Section */}
        <div style={{ padding: '16px 8px 6px', marginBottom: '4px' }}>
          <span style={{
            fontSize: '10px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#334155',
          }}>
            Módulos IA
          </span>
        </div>
        {modulosItems.map((item) => renderItem(item, activeSection === item.id))}
      </nav>

      {/* Footer */}
      <div style={{
        padding: '12px 16px 16px',
        flexShrink: 0,
        borderTop: '1px solid #E2E8F0',
        position: 'relative',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#10B981',
            boxShadow: '0 0 6px rgba(16,185,129,0.6)',
            animation: 'pulse-glow 2s infinite',
          }} />
          <div>
            <div style={{ fontSize: '11px', color: '#475569', fontWeight: '500' }}>
              MAYIA Food Intel
            </div>
            <div style={{ fontSize: '10px', color: '#10B981' }}>
              Operación Activa
            </div>
          </div>
          <Store size={14} color="#94A3B8" style={{ marginLeft: 'auto' }} />
        </div>
      </div>
    </div>
  );
};