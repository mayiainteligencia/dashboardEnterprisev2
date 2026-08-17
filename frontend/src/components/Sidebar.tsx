import React from 'react';
import { MODULOS_RISKO } from '../risko/riskoData';
import { brandingConfig } from '../config/branding';
import { Building2, ShieldCheck, Sparkles, LogOut, Layers } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const { colores } = brandingConfig;

  return (
    <aside
      style={{
        width: '260px',
        height: '100vh',
        backgroundColor: '#FFFFFF',
        borderRight: `1px solid ${colores.borde}`,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 90,
        boxShadow: '1px 0 8px rgba(15, 23, 42, 0.03)'
      }}
    >
      {/* Encabezado Sidebar */}
      <div
        style={{
          padding: '20px 20px',
          borderBottom: `1px solid ${colores.borde}`,
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: colores.gradientePrimario,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF'
          }}
        >
          <ShieldCheck size={22} />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colores.textoClaro, letterSpacing: '-0.02em' }}>
            RISKO AI
          </h1>
          <p style={{ margin: 0, fontSize: '11px', color: colores.textoOscuro, fontWeight: '500' }}>
            Plataforma Agéntica
          </p>
        </div>
      </div>

      {/* Lista de los 16 Módulos */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '12px 10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}
      >
        <div style={{ padding: '6px 12px', fontSize: '11px', fontWeight: '700', color: colores.textoOscuro, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Módulos de Riesgo (16)
        </div>

        {MODULOS_RISKO.map((modulo) => {
          const Icono = modulo.icono;
          const isActive = activeSection === modulo.id;

          return (
            <button
              key={modulo.id}
              onClick={() => onSectionChange(modulo.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '10px 12px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: isActive ? '#EFF6FF' : 'transparent',
                color: isActive ? colores.primario : colores.textoMedio,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                fontWeight: isActive ? '700' : '500',
                borderLeft: isActive ? `4px solid ${colores.primario}` : '4px solid transparent'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Icono size={18} color={isActive ? colores.primario : colores.textoOscuro} />
                <span style={{ fontSize: '13px', lineHeight: '1.2' }}>{modulo.titulo}</span>
              </div>
              {modulo.codigo && (
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: '700',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    backgroundColor: isActive ? colores.primario : '#F1F5F9',
                    color: isActive ? '#FFFFFF' : colores.textoOscuro
                  }}
                >
                  {modulo.codigo}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Pie del Sidebar - Estado Copiloto */}
      <div
        style={{
          padding: '14px 16px',
          borderTop: `1px solid ${colores.borde}`,
          backgroundColor: '#F8FAFC'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#DBEAFE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colores.primario
            }}
          >
            <Sparkles size={16} />
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: colores.textoClaro }}>
              RISKO Copilot Live
            </div>
            <div style={{ fontSize: '11px', color: '#10B981', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
              IA Lista para Consultas
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
