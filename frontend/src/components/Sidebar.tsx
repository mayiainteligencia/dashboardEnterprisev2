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
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: `linear-gradient(135deg, ${colores.primario} 0%, ${colores.secundario} 0%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <img 
              src="/assets/LogoForte.jpg"
              alt={empresa.nombre}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                padding: '4px',
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const container = target.parentElement;
                if (container) {
                  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                  svg.setAttribute('width', '24');
                  svg.setAttribute('height', '24');
                  svg.setAttribute('viewBox', '0 0 24 24');
                  svg.setAttribute('fill', 'none');
                  
                  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                  path.setAttribute('d', 'M7 7L17 17M7 17L17 7');
                  path.setAttribute('stroke', 'white');
                  path.setAttribute('stroke-width', '2.5');
                  path.setAttribute('stroke-linecap', 'round');
                  
                  svg.appendChild(path);
                  container.appendChild(svg);
                }
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