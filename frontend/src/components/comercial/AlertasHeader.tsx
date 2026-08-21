import React, { useState, useRef, useEffect } from 'react';
import { ShieldAlert, AlertCircle, Clock } from 'lucide-react';
import { brandingConfig } from '../../config/branding';

const { colores } = brandingConfig;

const ALERTAS_FSPM = [
  { id: 1, titulo: 'Licitación PEMEX vence en 36h', descripcion: 'Falta descargar opinión SAT 32-D y fianza.', gravedad: 'critica' },
  { id: 2, titulo: 'Cotización CFE 7 días sin contacto', descripcion: 'FSPM-2026-0178 requiere seguimiento con Ing. Juan Pérez.', gravedad: 'advertencia' },
  { id: 3, titulo: 'Checklist CFE al 85%', descripcion: 'Alfonso cargó fichas técnicas de unidades FireAde.', gravedad: 'ok' },
];

export const AlertasHeader: React.FC<{ modo?: string }> = () => {
  const [abierto, setAbierto] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setAbierto(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const criticas = ALERTAS_FSPM.filter(a => a.gravedad === 'critica' || a.gravedad === 'advertencia').length;

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setAbierto(o => !o)}
        title="Alertas Operativas FSPM"
        style={{
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          backgroundColor: colores.fondoTerciario,
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          transition: 'all 0.2s'
        }}
      >
        <ShieldAlert size={18} color="#D32F2F" />
        {criticas > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              minWidth: '18px',
              height: '18px',
              borderRadius: '10px',
              backgroundColor: '#D32F2F',
              border: `2px solid #FFF`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              fontWeight: 'bold',
              color: '#fff',
              padding: '0 4px'
            }}
          >
            {criticas}
          </span>
        )}
      </button>

      {abierto && (
        <div
          style={{
            position: 'absolute',
            top: '50px',
            right: 0,
            width: '340px',
            backgroundColor: '#FFFFFF',
            borderRadius: '14px',
            border: `1px solid ${colores.borde}`,
            boxShadow: '0 10px 36px rgba(0,0,0,0.15)',
            overflow: 'hidden',
            zIndex: 1000
          }}
        >
          <div style={{ padding: '14px 16px', borderBottom: `1px solid ${colores.borde}`, backgroundColor: '#F8FAFC' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 'bold', color: colores.textoClaro }}>
              Alertas Operativas FSPM
            </h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: colores.textoMedio }}>{criticas} eventos requieren atención</p>
          </div>
          <div style={{ maxHeight: '360px', overflowY: 'auto' }}>
            {ALERTAS_FSPM.map((al) => (
              <div
                key={al.id}
                style={{
                  padding: '12px 16px',
                  borderBottom: `1px solid ${colores.borde}`,
                  cursor: 'pointer',
                  backgroundColor: al.gravedad === 'critica' ? '#FEF2F240' : 'transparent'
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: '700', color: al.gravedad === 'critica' ? '#B91C1C' : colores.textoClaro }}>
                  {al.titulo}
                </div>
                <div style={{ fontSize: '11.5px', color: colores.textoMedio, marginTop: '2px' }}>
                  {al.descripcion}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
