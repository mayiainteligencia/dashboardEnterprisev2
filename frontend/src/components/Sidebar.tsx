import React from 'react';
import { LayoutDashboard, Sparkles, Cpu, Trophy } from 'lucide-react';

import { brandingConfig } from '../config/branding';
import { modulosPorModo, type Modo, type Modulo } from '../besco/bescoData';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  modo: Modo;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange, modo }) => {
  const { empresa, colores, temas } = brandingConfig;
  const tema = modo === 'admin' ? temas.admin : temas.cliente;
  
  const allModulos = modulosPorModo(modo);

  // Agrupar los módulos en categorías limpias según el modo
  const categorizarModulos = (modulos: Modulo[]) => {
    const otros = modulos.filter(m => m.id !== 'abastecimiento');

    if (modo === 'admin') {
      return [
        {
          titulo: 'Operaciones y Flotas',
          items: otros.filter(m => ['fleet', 'rutas', 'driver-risk'].includes(m.id))
        },
        {
          titulo: 'Mantenimiento & Sitio',
          items: otros.filter(m => ['mant-veh', 'pisos', 'auditor'].includes(m.id))
        },
        {
          titulo: 'Gestión, Rendimiento & Finanzas',
          items: otros.filter(m => ['rendimiento-vendedores', 'gasto', 'polizas', 'sla', 'copiloto', 'ejecutivo-op'].includes(m.id))
        }
      ];
    } else {
      return [
        {
          titulo: 'Seguridad & Analítica CCTV',
          items: otros.filter(m => ['cctv', 'fuego', 'health'].includes(m.id))
        },
        {
          titulo: 'Sistemas Críticos & Energía',
          items: otros.filter(m => ['hvac', 'energy'].includes(m.id))
        },
        {
          titulo: 'Gestión, Vendedores & Portal',
          items: otros.filter(m => ['rendimiento-vendedores', 'reporte', 'portal', 'upsell'].includes(m.id))
        }
      ];
    }
  };

  const categorias = categorizarModulos(allModulos);

  return (
    <div 
      style={{ 
        width: '240px',
        height: '100vh',
        backgroundColor: colores.fondoSecundario,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRight: `1px solid ${colores.borde}`
      }}
    >
      {/* Logo */}
      <div style={{ padding: '20px 20px 12px 20px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src={empresa.logo}
            alt={empresa.nombre}
            style={{
              height: '38px',
              width: 'auto',
              objectFit: 'contain',
              flexShrink: 0,
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
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: colores.textoClaro }}>
            {empresa.nombre}
          </span>
        </div>
      </div>

      {/* Label del modo activo */}
      <div style={{ padding: '0 20px 12px 20px', flexShrink: 0 }}>
        <span style={{
          fontSize: '10px',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: tema.acentoOscuro,
          background: tema.acentoSuave,
          padding: '3px 8px',
          borderRadius: '6px'
        }}>
          {tema.nombre}
        </span>
      </div>

      {/* Menú Principal — scrolleable */}
      <nav className="no-scrollbar" style={{
        flex: '1 1 0',
        minHeight: 0,
        overflowY: 'auto',
        padding: '0 12px 20px 12px',
      }}>
        
        {/* 1. PRIMER LUGAR: Dashboard General */}
        <div style={{ marginBottom: '10px' }}>
          <button
            onClick={() => onSectionChange('dashboard')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              borderRadius: '12px',
              backgroundColor: activeSection === 'dashboard' ? tema.acento : 'transparent',
              color: activeSection === 'dashboard' ? tema.sobreAcento : colores.textoClaro,
              border: activeSection === 'dashboard' ? `1px solid ${tema.acento}` : '1px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (activeSection !== 'dashboard') e.currentTarget.style.backgroundColor = colores.fondoTerciario;
            }}
            onMouseLeave={(e) => {
              if (activeSection !== 'dashboard') e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: activeSection === 'dashboard' ? 'rgba(255,255,255,0.25)' : colores.fondoTerciario,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <LayoutDashboard size={16} />
            </div>
            <span style={{ fontSize: '13.5px', fontWeight: '700' }}>
              Dashboard General
            </span>
          </button>
        </div>

        {/* 2. SEGUNDO LUGAR: Módulo de Abastecimiento de Urgencia */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{
            fontSize: '9px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#EA580C',
            marginBottom: '4px',
            paddingLeft: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Sparkles size={10} color="#EA580C" /> SOLUCIÓN DE PROBLEMAS
          </div>

          <button
            onClick={() => onSectionChange('abastecimiento')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              borderRadius: '12px',
              backgroundColor: activeSection === 'abastecimiento' ? tema.acento : `${tema.acento}1A`,
              color: activeSection === 'abastecimiento' ? tema.sobreAcento : colores.textoClaro,
              border: `1.5px solid ${activeSection === 'abastecimiento' ? tema.acento : `${tema.acento}50`}`,
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: activeSection === 'abastecimiento' ? `0 4px 12px ${tema.acento}40` : 'none',
              textAlign: 'left'
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: activeSection === 'abastecimiento' ? 'rgba(255,255,255,0.25)' : tema.acento,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Cpu size={16} color={activeSection === 'abastecimiento' ? '#fff' : tema.sobreAcento} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '13px', fontWeight: '700', lineHeight: 1.2 }}>
                Abastecimiento IA
              </div>
              <div style={{ fontSize: '10px', opacity: 0.8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Gestión Logística
              </div>
            </div>
          </button>
        </div>

        {/* Módulos agrupados por categoría */}
        {categorias.map((cat, cIdx) => (
          <div key={cIdx} style={{ marginBottom: '16px' }}>
            <div style={{
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: colores.textoOscuro,
              marginBottom: '6px',
              paddingLeft: '8px'
            }}>
              {cat.titulo}
            </div>

            {cat.items.map((item) => {
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
                    gap: '10px',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    marginBottom: '3px',
                    backgroundColor: isActive ? tema.acento : 'transparent',
                    color: isActive ? tema.sobreAcento : colores.textoMedio,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    textAlign: 'left'
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
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : colores.fondoTerciario,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={14} />
                  </div>
                  <span style={{ fontSize: '12.5px', fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.titulo}
                  </span>
                </button>
              );
            })}
          </div>
        ))}

      </nav>
    </div>
  );
};
