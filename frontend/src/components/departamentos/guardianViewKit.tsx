import React from 'react';
import { Bot } from 'lucide-react';
import { brandingConfig } from '../../config/branding';

export const useIsMobile = (bp = 768) => {
  const [m, setM] = React.useState(false);
  React.useEffect(() => {
    const check = () => setM(window.innerWidth < bp);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [bp]);
  return m;
};

export const VistaHeader: React.FC<{ titulo: string; descripcion: string; icon?: React.ReactNode }> = ({ titulo, descripcion, icon }) => {
  const { colores } = brandingConfig;
  const isMobile = useIsMobile();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '4px' }}>
      {icon && (
        <div style={{
          width: '52px', height: '52px', borderRadius: '14px', flexShrink: 0,
          background: colores.gradientePrimario, display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: colores.sombraMedia,
        }}>
          {icon}
        </div>
      )}
      <div>
        <h2 style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: 'bold', color: colores.textoClaro, margin: 0 }}>{titulo}</h2>
        <p style={{ color: colores.textoMedio, fontSize: isMobile ? '14px' : '16px', margin: '4px 0 0 0' }}>{descripcion}</p>
      </div>
    </div>
  );
};

// Shell de tarjeta para las vistas (mismo lenguaje que el sistema).
export const Panel: React.FC<{ titulo?: string; children: React.ReactNode; style?: React.CSSProperties }> = ({ titulo, children, style }) => {
  const { colores } = brandingConfig;
  return (
    <div style={{
      background: colores.fondoSecundario, borderRadius: '16px', padding: '20px',
      border: `1px solid ${colores.borde}`, ...style,
    }}>
      {titulo && <h3 style={{ fontSize: '16px', fontWeight: 700, color: colores.textoClaro, margin: '0 0 14px 0' }}>{titulo}</h3>}
      {children}
    </div>
  );
};

export const AgentesPanel: React.FC<{ agentes: string[] }> = ({ agentes }) => {
  const { colores } = brandingConfig;
  return (
    <Panel titulo="Agentes IA involucrados">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {agentes.map((a) => (
          <div key={a} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '34px', height: '34px', borderRadius: '10px', background: `${colores.acento}18`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Bot size={16} color={colores.acento} />
            </div>
            <span style={{ fontSize: '13px', color: colores.textoClaro, flex: 1 }}>{a}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: colores.exito }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: colores.exito }} /> Activo
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
};
