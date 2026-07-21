import React, { useEffect, useRef, useState } from 'react';
import { AlertTriangle, CheckCircle, Sparkles, X } from 'lucide-react';
import { brandingConfig } from '../config/branding';
import { alertasVivoAdmin, colorSeveridad, labelSeveridad, type Modo, type ToastAlerta } from './bescoData';

const { colores } = brandingConfig;

type Vivo = ToastAlerta & { key: number };

const VISIBLE_DURATION = 4500; // Permanencia visible de 4.5s
const MIN_GAP = 7000;          // Mínimo de 7s de silencio entre alertas
const MAX_GAP = 14000;         // Máximo de 14s de silencio entre alertas

// Alertas en vivo que aparecen de forma esporádica y orgánica
export const ToastAlertas: React.FC<{ modo: Modo }> = () => {
  const [currentToast, setCurrentToast] = useState<Vivo | null>(null);
  const idxRef = useRef(0);
  const keyRef = useRef(0);
  const hideTimerRef = useRef<number | null>(null);
  const nextTimerRef = useRef<number | null>(null);

  const programarSiguienteAlerta = () => {
    const gap = MIN_GAP + Math.floor(Math.random() * (MAX_GAP - MIN_GAP));
    nextTimerRef.current = window.setTimeout(() => {
      lanzarAlerta();
    }, gap);
  };

  const lanzarAlerta = () => {
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    if (nextTimerRef.current) window.clearTimeout(nextTimerRef.current);

    const alerta = alertasVivoAdmin[idxRef.current % alertasVivoAdmin.length];
    idxRef.current += 1;
    const key = keyRef.current++;

    setCurrentToast({ ...alerta, key });

    // Se oculta limpiamente a los 4.5 segundos y se inicia el tiempo de silencio
    hideTimerRef.current = window.setTimeout(() => {
      setCurrentToast(null);
      programarSiguienteAlerta();
    }, VISIBLE_DURATION);
  };

  useEffect(() => {
    // Primera alerta esporádica a los 3.5s de cargar la aplicación
    nextTimerRef.current = window.setTimeout(lanzarAlerta, 3500);

    return () => {
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
      if (nextTimerRef.current) window.clearTimeout(nextTimerRef.current);
    };
  }, []);

  const cerrarManual = () => {
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    setCurrentToast(null);
    programarSiguienteAlerta();
  };

  if (!currentToast) return null;

  const color = colorSeveridad[currentToast.severidad];
  const Icon = currentToast.modulo.includes('IA') || currentToast.modulo.includes('MAYIA') 
    ? Sparkles 
    : currentToast.severidad === 'ok' 
    ? CheckCircle 
    : AlertTriangle;

  return (
    <>
      <style>{`
        @keyframes besco-toast-in {
          from { opacity: 0; transform: translateY(18px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes besco-toast-bar { from { width: 100%; } to { width: 0%; } }
      `}</style>
      
      {/* Contenedor fijo en la esquina inferior derecha */}
      <div style={{
        position: 'fixed', 
        bottom: 'clamp(16px, 3vw, 28px)', 
        right: 'clamp(16px, 3vw, 28px)', 
        zIndex: 9000,
        width: 'min(380px, calc(100vw - 32px))',
        pointerEvents: 'none',
      }}>
        <div key={currentToast.key} style={{
          pointerEvents: 'auto', 
          position: 'relative', 
          overflow: 'hidden',
          background: colores.fondoPrincipal, 
          borderRadius: '16px',
          border: `1.5px solid ${colores.borde}`, 
          borderLeft: `5px solid ${color}`,
          boxShadow: '0 14px 36px rgba(0,0,0,0.22)', 
          padding: '14px 16px',
          animation: 'besco-toast-in 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div style={{ 
              width: 36, 
              height: 36, 
              borderRadius: '10px', 
              background: `${color}1A`, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              flexShrink: 0 
            }}>
              <Icon size={18} color={color} />
            </div>
            
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                <span style={{ 
                  fontSize: '10px', 
                  fontWeight: 800, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.4px', 
                  color, 
                  background: `${color}1A`, 
                  padding: '2px 7px', 
                  borderRadius: '6px' 
                }}>
                  {labelSeveridad[currentToast.severidad]}
                </span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: colores.textoMedio }}>
                  {currentToast.modulo} · al momento
                </span>
              </div>
              
              <p style={{ margin: '3px 0 0', fontSize: '13.5px', fontWeight: 800, color: colores.textoClaro, lineHeight: 1.3 }}>
                {currentToast.titulo}
              </p>
              
              <p style={{ margin: '3px 0 0', fontSize: '12px', color: colores.textoMedio, lineHeight: 1.4 }}>
                {currentToast.mensaje}
              </p>
            </div>

            <button 
              onClick={cerrarManual} 
              aria-label="Cerrar"
              title="Cerrar notificación"
              style={{ 
                border: 'none', 
                background: 'transparent', 
                cursor: 'pointer', 
                color: colores.textoOscuro, 
                flexShrink: 0, 
                padding: '2px', 
                lineHeight: 0 
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Barra de tiempo visible de 4.5 segundos */}
          <div style={{ 
            position: 'absolute', 
            left: 0, 
            bottom: 0, 
            height: '3px', 
            background: color, 
            animation: 'besco-toast-bar 4.5s linear forwards' 
          }} />
        </div>
      </div>
    </>
  );
};


