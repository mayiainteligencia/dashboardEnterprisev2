import React from 'react';
import { 
  LayoutDashboard,
  Server,
  ShieldAlert,
  HardDrive,
  Database,
  BrainCircuit,
  Activity,
  ShoppingBag,
  Users
} from 'lucide-react';
import { brandingConfig } from '../config/branding';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: 'dashboard', nombre: 'Dashboard General', icono: LayoutDashboard },
  { id: 'centroOperacion', nombre: 'Centro de Operación', icono: Server },
  { id: 'seguridadSOC', nombre: 'Seguridad y SOC IA', icono: ShieldAlert },
  { id: 'continuidadDRP', nombre: 'Continuidad y DRP', icono: HardDrive },
  { id: 'mapaDatos', nombre: 'Mapa de Datos', icono: Database },
  { id: 'valorDatoIA', nombre: 'Valor del Dato y IA', icono: BrainCircuit },
];

const extraSections = [
  { id: 'decisionRoom', nombre: 'Decision Room', icono: Activity },
  { id: 'marketplace', nombre: 'Marketplace Servicios', icono: ShoppingBag },
  { id: 'acompanamiento', nombre: 'Acompañamiento Experto', icono: Users },
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
      }}
    >
      {/* Logo */}
      <div style={{ 
        height: '72px', 
        padding: '0 24px', 
        flexShrink: 0,
        backgroundColor: '#0e1b2b',
        display: 'flex',
        alignItems: 'center',
        borderBottom: `1px solid ${colores.borde}`
      }}>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <img 
            src={empresa.logo} 
            alt={empresa.nombre}
            style={{
              height: '44px',
              width: 'auto',
              objectFit: 'contain',
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      </div>

      {/* Label DEPARTAMENTOS */}
      <div style={{ padding: '0 16px 8px 16px' }}>
        <span style={{ 
          fontSize: '11px', 
          fontWeight: '600', 
          textTransform: 'uppercase', 
          letterSpacing: '0.05em',
          color: colores.textoOscuro 
        }}>
          DEPARTAMENTOS
        </span>
      </div>

      {/* Menú Principal */}
      <nav style={{ flex: '0 0 auto', padding: '0 12px', overflow: 'auto' }}>
        {menuItems.map((item) => {
          const Icon = item.icono;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
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
          );
        })}
      </nav>

      {/* Footer buttons - Secciones Extra */}
      <div style={{ padding: '12px', borderTop: `1px solid ${colores.borde}`, flexShrink: 0 }}>
        {extraSections.map((section) => {
          const Icon = section.icono;
          const isActive = activeSection === section.id;
          
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '12px',
                marginBottom: '8px',
                backgroundColor: isActive ? colores.primario : colores.fondoTerciario,
                color: isActive ? '#FFFFFF' : colores.textoMedio,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = colores.fondoPrincipal;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = colores.fondoTerciario;
                }
              }}
            >
              <div 
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : colores.fondoPrincipal,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={18} />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '500', flex: 1, textAlign: 'left' }}>
                {section.nombre}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};