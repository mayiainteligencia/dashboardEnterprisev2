import React, { useState, useRef, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { Modal, Pill } from './ui';
import { brandingConfig } from '../../config/branding';
import { alertasPorModo, colorSeveridad, labelSeveridad, type Modo } from '../../besco/bescoData';

const { colores, temas } = brandingConfig;

const Dot: React.FC<{ color: string }> = ({ color }) => (
  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />
);

// Alertas de operación (admin) / inmuebles (cliente) en el header.
export const AlertasHeader: React.FC<{ modo: Modo }> = ({ modo }) => {
  const tema = modo === 'admin' ? temas.admin : temas.cliente;
  const alertas = alertasPorModo[modo];
  const [abierto, setAbierto] = useState(false);
  const [sel, setSel] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setAbierto(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  useEffect(() => { setSel(null); setAbierto(false); }, [modo]);

  const criticas = alertas.filter(a => a.severidad !== 'ok').length;
  const a = sel !== null ? alertas[sel] : null;

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setAbierto(o => !o)}
        title="Alertas"
        style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: colores.fondoTerciario, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', transition: 'all 0.2s' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
      >
        <Activity size={20} color={tema.acentoOscuro} />
        {criticas > 0 && (
          <span style={{ position: 'absolute', top: '8px', right: '8px', minWidth: '18px', height: '18px', borderRadius: '10px', backgroundColor: colorSeveridad.critico, border: `2px solid ${colores.fondoSecundario}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold', color: '#fff', padding: '0 4px' }}>{criticas}</span>
        )}
      </button>

      {abierto && (
        <div style={{ position: 'absolute', top: '60px', right: 0, width: 'min(380px, calc(100vw - 24px))', maxHeight: '500px', backgroundColor: colores.fondoSecundario, borderRadius: '16px', border: `1px solid ${colores.borde}`, boxShadow: '0 8px 32px rgba(0,0,0,0.18)', overflow: 'hidden', zIndex: 1000 }}>
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${colores.borde}` }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: colores.textoClaro }}>
              {modo === 'admin' ? 'Alertas de operación' : 'Alertas de inmuebles'}
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: colores.textoMedio }}>Tiempo real · {criticas} requieren atención</p>
          </div>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {alertas.map((al, i) => (
              <div key={i}
                onClick={() => { setSel(i); setAbierto(false); }}
                style={{ padding: '14px 20px', borderBottom: `1px solid ${colores.borde}`, cursor: 'pointer', display: 'flex', gap: '10px', alignItems: 'flex-start', transition: 'background-color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = colores.fondoTerciario; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <div style={{ marginTop: '4px' }}><Dot color={colorSeveridad[al.severidad]} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: colores.textoClaro }}>{al.titulo}</p>
                  <span style={{ fontSize: '11px', color: colores.textoOscuro }}>Hace {al.hace} · ver detalle →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {a && (
        <Modal open={sel !== null} onClose={() => setSel(null)} icon={Activity} title={a.titulo} subtitle={`Hace ${a.hace}`}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Dot color={colorSeveridad[a.severidad]} />
            <Pill text={labelSeveridad[a.severidad]} color={colorSeveridad[a.severidad]} />
          </div>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: colores.textoClaro, margin: '0 0 16px' }}>{a.detalle}</p>
          <div style={{ padding: '12px 14px', borderRadius: '12px', background: colores.fondoTerciario, borderLeft: `4px solid ${tema.acento}` }}>
            <p style={{ fontSize: '11px', color: colores.textoMedio, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.3px', fontWeight: 700 }}>Acción sugerida</p>
            <p style={{ fontSize: '13px', color: colores.textoClaro, margin: 0 }}>{a.accion}</p>
          </div>
        </Modal>
      )}
    </div>
  );
};
