import React from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  Crown,
  Target,
  Megaphone,
  Users,
  Package,
  Repeat,
  UserPlus,
  Store,
  Radar,
} from 'lucide-react';

import { brandingConfig } from '../config/branding';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: 'dashboard', nombre: 'Dashboard General', icono: LayoutDashboard },
  { id: 'comercial', nombre: 'Centro Comercial', icono: TrendingUp },
  { id: 'leads', nombre: 'Prospectos', icono: UserPlus },
  { id: 'operacion', nombre: 'Producción', icono: Store },
  { id: 'influencers', nombre: 'Radar de Mercado', icono: Radar },
];

const analisisItems = [
  { id: 'ceo', nombre: 'Vista CEO', icono: Crown },
  { id: 'scoring', nombre: 'Lead Scoring IA', icono: Target },
  { id: 'campanias', nombre: 'Campañas', icono: Megaphone },
  { id: 'vendedores', nombre: 'Asesores', icono: Users },
  { id: 'inventario', nombre: 'Inventario Blindaje', icono: Package },
  { id: 'conversion', nombre: 'Conversión', icono: Repeat },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const { empresa, colores } = brandingConfig;

  return (
    <div 
      style={{ 
        width: '240px',
        height: '100vh',
        backgroundColor: colores.fondoSecundario,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden', // evita que el contenedor crezca más allá del viewport
      }}
    >
      {/* Logo */}
      <div style={{ padding: '24px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div 
            style={{ 
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: '#111827',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(212, 0, 10, 0.25)',
              border: '1px solid rgba(212, 0, 10, 0.25)',
              overflow: 'hidden',
              flexShrink: 0,
              padding: '4px',
            }}
          >
            <img 
              src="/assets/LogoForte_clean.png"
              alt={empresa.nombre}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/assets/LogoForte.jpg';
              }}
            />
          </div>
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: colores.textoClaro }}>
            {empresa.nombre}
          </span>
        </div>
      </div>

      {/* Label DEPARTAMENTOS */}
      <div style={{ padding: '0 16px 8px 16px', flexShrink: 0 }}>
        <span style={{ 
          fontSize: '11px', 
          fontWeight: '600', 
          textTransform: 'uppercase', 
          letterSpacing: '0.05em',
          color: colores.textoOscuro,
        }}>
          OPERACIÓN
        </span>
      </div>

      {/* Menú Principal — scrolleable */}
      <nav className="no-scrollbar" style={{
        flex: '1 1 0',   // ocupa el espacio disponible entre header y footer
        minHeight: 0,     // crítico: permite que flex shrink active el scroll
        overflowY: 'auto',
        padding: '0 12px',
      }}>
        {[...menuItems, ...analisisItems].map((item) => {
          const Icon = item.icono;
          const isActive = activeSection === item.id;

          return (
            <React.Fragment key={item.id}>
              {item.id === 'ceo' && (
                <div style={{ padding: '12px 16px 6px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: colores.textoOscuro }}>
                    ANÁLISIS VITROFORTE
                  </span>
                </div>
              )}
              <button
                onClick={() => onSectionChange(item.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  marginBottom: '4px',
                  backgroundColor: isActive ? colores.primario : 'transparent',
                  color: isActive ? '#FFFFFF' : colores.textoMedio,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = colores.fondoTerciario;
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : colores.fondoTerciario,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} />
                </div>
                <span style={{ fontSize: '14px', fontWeight: '500', textAlign: 'left' }}>
                  {item.nombre}
                </span>
              </button>
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
};