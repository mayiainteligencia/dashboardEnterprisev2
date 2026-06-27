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
    nombre: 'Dashboard General',
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
          gap: '12px',
          padding: '12px 16px',
          borderRadius: '12px',
          marginBottom: '4px',
          backgroundColor: isActive ? item.color : 'transparent',
          border: 'none',
          color: isActive ? '#FFFFFF' : colores.textoMedio,
          cursor: 'pointer',
          transition: 'all 0.2s',
          textAlign: 'left',
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = colores.fondoCuaternario;
            e.currentTarget.style.color = colores.textoClaro;
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = colores.textoMedio;
          }
        }}
      >
        {/* Icon */}
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: isActive ? 'rgba(255, 255, 255, 0.2)' : colores.fondoCuaternario,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'all 0.2s',
        }}>
          <Icon size={18} color={isActive ? '#FFFFFF' : colores.textoMedio} />
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{
            fontSize: '14px',
            fontWeight: isActive ? '600' : '500',
            color: isActive ? '#FFFFFF' : colores.textoClaro,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {item.nombre}
          </div>
          <div style={{
            fontSize: '10px',
            color: isActive ? 'rgba(255, 255, 255, 0.7)' : colores.textoMedio,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginTop: '2px',
          }}>
            {item.description}
          </div>
        </div>
      </button>
    );
  };

  return (
    <div style={{
      width: '240px',
      height: '100vh',
      backgroundColor: colores.fondoSecundario,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Logo */}
      <div style={{ padding: '24px 16px 16px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Logo container */}
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: `linear-gradient(135deg, ${colores.primario} 0%, ${colores.secundario} 0%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            overflow: 'hidden',
          }}>
            <img
              src={empresa.logoUrl}
              alt={empresa.nombre}
              style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }}
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
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: colores.textoClaro, fontFamily: 'Outfit, sans-serif', lineHeight: 1.1 }}>
              {empresa.nombre}
            </div>
            <div style={{ fontSize: '10px', color: colores.primario, fontWeight: '600', marginTop: '2px', letterSpacing: '0.04em' }}>
              × MAYIA IA
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="no-scrollbar" style={{
        flex: '1 1 0',
        minHeight: 0,
        overflowY: 'auto',
        padding: '0 12px',
      }}>
        {/* Overview Section */}
        <div style={{ padding: '0 16px 8px 16px', marginBottom: '4px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: colores.textoOscuro,
          }}>
            General
          </span>
        </div>
        {mainItems.map((item) => renderItem(item, activeSection === item.id))}

        {/* Modules Section */}
        <div style={{ padding: '16px 16px 8px 16px', marginBottom: '4px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: colores.textoOscuro,
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
        borderTop: '1px solid ' + colores.borde,
        position: 'relative',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: colores.exito,
            boxShadow: '0 0 6px rgba(16,185,129,0.6)',
            animation: 'pulse-glow 2s infinite',
          }} />
          <div>
            <div style={{ fontSize: '11px', color: colores.textoMedio, fontWeight: '500' }}>
              MAYIA Food Intel
            </div>
            <div style={{ fontSize: '10px', color: colores.exito }}>
              Operación Activa
            </div>
          </div>
          <Store size={14} color={colores.textoOscuro} style={{ marginLeft: 'auto' }} />
        </div>
      </div>
    </div>
  );
};