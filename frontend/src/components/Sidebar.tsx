import React from 'react';
import { LayoutDashboard, Sparkles, Cpu, Trophy } from 'lucide-react';

import { brandingConfig } from '../config/branding';
import { modulosCompras, modulosFlotillas, modulosCliente, modulosEspeciales, type Modo, type Modulo } from '../besco/bescoData';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  modo: Modo;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange, modo }) => {
  const { empresa, colores, temas } = brandingConfig;
  const tema = modo === 'admin' ? temas.admin : temas.cliente;

  // Agrupar los módulos en secciones temáticas llamativas
  const categorias = [
    {
      titulo: 'COMANDO INTELIGENTE DE COMPRAS',
      color: '#DC2626',
      items: modulosCompras
    },
    {
      titulo: 'COMANDO INTELIGENTE DE FLOTILLAS',
      color: '#1E40AF',
      items: modulosFlotillas
    },
    {
      titulo: 'NUEVOS NEGOCIOS & EDIFICIOS',
      color: '#10B981',
      items: modulosCliente.filter(m => m.id !== 'abastecimiento' && m.id !== 'rendimiento-vendedores')
    },
    {
      titulo: 'CAPACITACIÓN & SEGURIDAD',
      color: '#038CAE',
      items: modulosEspeciales
    }
  ];

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

      {/* Menú Principal — scrolleable */}
      <nav className="no-scrollbar" style={{
        flex: '1 1 0',
        minHeight: 0,
        overflowY: 'auto',
        padding: '0 12px 20px 12px',
      }}>
        
        {/* 1. PRIMER LUGAR: Control Inteligente de Compras */}
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
              Control Inteligente de Decisiones
            </span>
          </button>
        </div>

        {/* Módulos agrupados por categoría */}
        {categorias.map((cat, cIdx) => (
          <div key={cIdx} style={{ marginBottom: '18px' }}>
            <div style={{
              fontSize: '10px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: cat.color,
              marginBottom: '8px',
              paddingLeft: '8px',
              borderLeft: `3px solid ${cat.color}`,
              lineHeight: '1.2'
            }}>
              {cat.titulo}
            </div>

            {cat.items.map((item) => {
              const Icon = item.icono;
              const isActive = activeSection === item.id;
              const itemColor = cat.color;

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
                    backgroundColor: isActive ? itemColor : 'transparent',
                    color: isActive ? '#FFFFFF' : colores.textoClaro,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = `${itemColor}15`;
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
                      backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : `${itemColor}18`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={14} color={isActive ? '#FFFFFF' : itemColor} />
                  </div>
                  <span style={{ fontSize: '12.5px', fontWeight: isActive ? '700' : '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
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

