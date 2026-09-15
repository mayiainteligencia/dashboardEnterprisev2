import React, { useState, useRef, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { brandingConfig } from '../../config/branding';
import { ALERTAS_IZZI } from '../../izzi/izziData';

const { colores } = brandingConfig;

export const AlertasHeader: React.FC<{ modo?: string }> = () => {
  const [abierto, setAbierto] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setAbierto(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const criticas = ALERTAS_IZZI.filter(a => a.gravedad === 'critica' || a.gravedad === 'advertencia').length;

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setAbierto(o => !o)}
        title="Alertas izzi"
        style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: colores.fondoTerciario, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', transition: 'all 0.2s' }}
      >
        <Activity size={20} color={colores.primario} />
        {criticas > 0 && (
          <span style={{ position: 'absolute', top: '4px', right: '4px', minWidth: '18px', height: '18px', borderRadius: '10px', backgroundColor: colores.primario, border: `2px solid #FFF`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold', color: '#fff', padding: '0 4px' }}>
            {criticas}
          </span>
        )}
      </button>

      {abierto && (
        <div style={{ position: 'absolute', top: '54px', right: 0, width: '340px', backgroundColor: '#FFFFFF', borderRadius: '14px', border: `1px solid ${colores.borde}`, boxShadow: '0 8px 32px rgba(0,0,0,0.15)', overflow: 'hidden', zIndex: 1000 }}>
          <div style={{ padding: '14px 16px', borderBottom: `1px solid ${colores.borde}`, backgroundColor: '#FAFAFA' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 'bold', color: colores.textoClaro }}>
              Alertas M2C izzi
            </h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: colores.textoMedio }}>{criticas} eventos requieren atención</p>
          </div>
          <div style={{ maxHeight: '360px', overflowY: 'auto' }}>
            {ALERTAS_IZZI.map((al, i) => (
              <div key={i}
                style={{ padding: '12px 16px', borderBottom: `1px solid ${colores.borde}`, cursor: 'pointer' }}
              >
                <div style={{ fontSize: '13px', fontWeight: '700', color: colores.textoClaro }}>{al.titulo}</div>
                <div style={{ fontSize: '11.5px', color: colores.textoMedio, marginTop: '2px' }}>{al.descripcion}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
