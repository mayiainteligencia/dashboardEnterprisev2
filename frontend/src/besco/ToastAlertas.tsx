import React, { useEffect, useRef, useState } from 'react';
import { AlertTriangle, CheckCircle, X } from 'lucide-react';
import { brandingConfig } from '../config/branding';
import { alertasVivoAdmin, colorSeveridad, labelSeveridad, type Modo, type ToastAlerta } from './bescoData';

const { colores } = brandingConfig;

type Vivo = ToastAlerta & { key: number };

// Alertas "al momento" que van saliendo como toaster mientras se opera en modo admin.
export const ToastAlertas: React.FC<{ modo: Modo }> = ({ modo }) => {
  const [toasts, setToasts] = useState<Vivo[]>([]);
  const idxRef = useRef(0);
  const keyRef = useRef(0);

  useEffect(() => {
    if (modo !== 'admin') { setToasts([]); return; }

    const emitir = () => {
      const alerta = alertasVivoAdmin[idxRef.current % alertasVivoAdmin.length];
      idxRef.current += 1;
      const key = keyRef.current++;
      setToasts(prev => [...prev, { ...alerta, key }].slice(-3)); // máx 3 visibles
      // auto-cierre
      window.setTimeout(() => {
        setToasts(prev => prev.filter(t => t.key !== key));
      }, 6500);
    };

    const primero = window.setTimeout(emitir, 1800);
    const intervalo = window.setInterval(emitir, 7000);
    return () => { window.clearTimeout(primero); window.clearInterval(intervalo); };
  }, [modo]);

  const cerrar = (key: number) => setToasts(prev => prev.filter(t => t.key !== key));

  if (modo !== 'admin') return null;

  return (
    <>
      <style>{`
        @keyframes besco-toast-in {
          from { opacity: 0; transform: translateX(24px) scale(0.98); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes besco-toast-bar { from { width: 100%; } to { width: 0%; } }
      `}</style>
      <div style={{
        position: 'fixed', top: '92px', right: 'clamp(12px, 3vw, 28px)', zIndex: 6000,
        display: 'flex', flexDirection: 'column', gap: '12px', width: 'min(360px, calc(100vw - 24px))',
        pointerEvents: 'none',
      }}>
        {toasts.map(t => {
          const color = colorSeveridad[t.severidad];
          const Icon = t.severidad === 'ok' ? CheckCircle : AlertTriangle;
          return (
            <div key={t.key} style={{
              pointerEvents: 'auto', position: 'relative', overflow: 'hidden',
              background: colores.fondoPrincipal, borderRadius: '14px',
              border: `1px solid ${colores.borde}`, borderLeft: `4px solid ${color}`,
              boxShadow: '0 12px 32px rgba(0,0,0,0.16)', padding: '14px 16px',
              animation: 'besco-toast-in 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: 34, height: 34, borderRadius: '10px', background: `${color}1A`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={18} color={color} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px', color, background: `${color}1A`, padding: '2px 7px', borderRadius: '999px' }}>{labelSeveridad[t.severidad]}</span>
                    <span style={{ fontSize: '11px', color: colores.textoOscuro }}>{t.modulo} · ahora</span>
                  </div>
                  <p style={{ margin: '2px 0 0', fontSize: '13.5px', fontWeight: 700, color: colores.textoClaro, lineHeight: 1.3 }}>{t.titulo}</p>
                  <p style={{ margin: '3px 0 0', fontSize: '12.5px', color: colores.textoMedio, lineHeight: 1.4 }}>{t.mensaje}</p>
                </div>
                <button onClick={() => cerrar(t.key)} aria-label="Cerrar"
                  style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: colores.textoOscuro, flexShrink: 0, padding: '2px', lineHeight: 0 }}>
                  <X size={16} />
                </button>
              </div>
              {/* barra de tiempo restante */}
              <div style={{ position: 'absolute', left: 0, bottom: 0, height: '3px', background: color, animation: 'besco-toast-bar 6.5s linear forwards' }} />
            </div>
          );
        })}
      </div>
    </>
  );
};
