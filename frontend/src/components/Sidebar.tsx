import React from 'react';
import {
  Compass,
  Activity,
  Database,
  Cloud,
  Monitor,
  ShieldCheck,
  HardDriveDownload,
  Sparkles,
  TrendingUp,
  ListChecks,
} from 'lucide-react';
import { brandingConfig } from '../config/branding';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: 'valueExplorer',       nombre: 'Value Explorer',          icono: Compass },
  { id: 'explorerDiagnostico', nombre: 'Diagnóstico Empresa',     icono: Activity },
  { id: 'explorerValorDato',   nombre: 'Valor del Dato',          icono: Database },
  { id: 'explorerNube',        nombre: 'Nube, IaaS y FLAI',       icono: Cloud },
  { id: 'explorerNOC',         nombre: 'NOC y Operación',         icono: Monitor },
  { id: 'explorerSOC',         nombre: 'SOC IA y Ciberseguridad', icono: ShieldCheck },
  { id: 'explorerDRP',         nombre: 'DRP y Continuidad',       icono: HardDriveDownload },
  { id: 'explorerAIFactory',   nombre: 'AI Factory',              icono: Sparkles },
  { id: 'explorerROI',         nombre: 'ROI y Business Case',     icono: TrendingUp },
];

const extraSections = [
  { id: 'explorerWizard', nombre: 'Iniciar Diagnóstico', icono: ListChecks },
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
        backgroundColor: '#345d90',
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

      {/* Label */}
      <div style={{ padding: '16px 16px 8px 16px' }}>
        <span style={{
          fontSize: '11px',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: colores.textoOscuro
        }}>
          MÓDULOS
        </span>
      </div>

      {/* Menú Principal */}
      <nav style={{ flex: 1, padding: '0 12px', overflow: 'auto' }}>
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
                padding: '10px 14px',
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
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : colores.fondoTerciario,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon size={16} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: '500', textAlign: 'left' }}>
                {item.nombre}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
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
                marginBottom: '4px',
                background: isActive ? colores.primario : colores.gradientePrimario,
                color: '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={16} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: '600', flex: 1, textAlign: 'left' }}>
                {section.nombre}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
