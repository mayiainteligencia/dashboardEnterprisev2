import React, { useCallback, useState } from 'react';
import { Bot, ShieldAlert, ShieldCheck, X, Check } from 'lucide-react';
import { brandingConfig } from '../../config/branding';
import { useNuevosEventos, resolverEvento } from '../../agents/agentBus';
import type { EventoAgente, AccionAgente, Severidad } from '../../agents/agentBus';

const MAX_VISIBLES = 3;
const VIDA_MS = 14000;

export const AgentToasts: React.FC = () => {
  const { colores } = brandingConfig;
  const [visibles, setVisibles] = useState<EventoAgente[]>([]);
  const [resueltos, setResueltos] = useState<Record<string, string>>({});

  const cerrar = useCallback((id: string) => {
    setVisibles((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const alLlegar = useCallback((ev: EventoAgente) => {
    setVisibles((prev) => [ev, ...prev].slice(0, MAX_VISIBLES));
    setTimeout(() => cerrar(ev.id), VIDA_MS);
  }, [cerrar]);

  useNuevosEventos(alLlegar);

  const ejecutar = (ev: EventoAgente, accion: AccionAgente) => {
    resolverEvento(ev.id, accion);
    setResueltos((prev) => ({ ...prev, [ev.id]: accion.confirmacion }));
    setTimeout(() => cerrar(ev.id), 2200);
  };

  const color = (s: Severidad) =>
    s === 'critica' ? colores.peligro : s === 'alta' ? colores.advertencia : s === 'media' ? colores.acento : colores.exito;

  if (visibles.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed', right: '24px', bottom: '24px', zIndex: 4000,
        display: 'flex', flexDirection: 'column-reverse', gap: '12px',
        width: 'min(380px, calc(100vw - 32px))', pointerEvents: 'none',
      }}
    >
      {visibles.map((ev) => {
        const c = color(ev.severidad);
        const confirmacion = resueltos[ev.id];
        return (
          <div
            key={ev.id}
            style={{
              pointerEvents: 'auto',
              background: colores.fondoClaro,
              border: `1px solid ${colores.borde}`,
              borderLeft: `3px solid ${c}`,
              borderRadius: '14px',
              boxShadow: '0 16px 40px rgba(0,0,0,0.18)',
              padding: '14px 16px',
              animation: 'ag-in 0.35s cubic-bezier(0.2, 0.9, 0.3, 1)',
            }}
          >
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '10px', flexShrink: 0,
                background: `${c}18`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {ev.severidad === 'baja'
                  ? <ShieldCheck size={17} color={c} />
                  : <ShieldAlert size={17} color={c} />}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                  <Bot size={12} color={colores.textoOscuro} />
                  <span style={{ fontSize: '11px', fontWeight: 600, color: colores.textoOscuro, letterSpacing: '0.01em' }}>
                    {ev.agente}
                  </span>
                  <span style={{ marginLeft: 'auto', fontSize: '10px', color: colores.textoOscuro, fontFamily: 'monospace' }}>
                    {ev.hora}
                  </span>
                </div>

                <div style={{ fontSize: '13px', fontWeight: 700, color: colores.textoClaro, lineHeight: 1.35 }}>
                  {ev.titulo}
                </div>
                <p style={{ margin: '4px 0 0', fontSize: '12px', color: colores.textoMedio, lineHeight: 1.45 }}>
                  {ev.detalle}
                </p>

                {confirmacion ? (
                  <div style={{
                    marginTop: '10px', display: 'flex', alignItems: 'center', gap: '7px',
                    padding: '8px 10px', borderRadius: '10px',
                    background: `${colores.exito}14`, color: colores.exito,
                    fontSize: '12px', fontWeight: 600,
                  }}>
                    <Check size={14} /> {confirmacion}
                  </div>
                ) : (
                  <div style={{ marginTop: '11px', display: 'flex', gap: '7px', flexWrap: 'wrap' }}>
                    {ev.acciones.map((a, i) => (
                      <button
                        key={a.id}
                        onClick={() => ejecutar(ev, a)}
                        style={{
                          padding: '6px 12px', borderRadius: '9px', cursor: 'pointer',
                          fontSize: '12px', fontWeight: 600,
                          border: `1px solid ${i === 0 ? c : colores.borde}`,
                          background: i === 0 ? c : 'transparent',
                          color: i === 0 ? colores.textoEnOscuro : colores.textoMedio,
                          transition: 'opacity 0.15s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.82')}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                      >
                        {a.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => cerrar(ev.id)}
                aria-label="Cerrar notificación"
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: '2px',
                  display: 'flex', color: colores.textoOscuro, flexShrink: 0,
                }}
              >
                <X size={15} />
              </button>
            </div>

            <div style={{ height: '2px', marginTop: '10px', borderRadius: '99px', background: `${colores.borde}60`, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: c, animation: `ag-bar ${VIDA_MS}ms linear forwards` }} />
            </div>
          </div>
        );
      })}

      <style>{`
        @keyframes ag-in { from { opacity: 0; transform: translateX(24px) scale(0.97); } to { opacity: 1; transform: none; } }
        @keyframes ag-bar { from { width: 100%; } to { width: 0%; } }
      `}</style>
    </div>
  );
};
