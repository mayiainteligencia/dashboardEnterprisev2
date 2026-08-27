import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  Check,
  X,
  Bot,
  CalendarDays,
  Sparkles,
  BarChart3,
  Users,
  TriangleAlert,
  TrendingUp,
} from 'lucide-react';
import { brandingConfig } from '../config/branding';
import { useEventosAgentes, resolverEvento, marcarTodoLeido, marcarLeido } from '../agents/agentBus';
import type { EventoAgente, Severidad } from '../agents/agentBus';
import { AsistenteIAChat } from './modules/AsistenteIAChat';
import type { AsistenteIAChatHandle } from './modules/AsistenteIAChat';

interface HeaderProps {
  title: string;
}

const sugerencias = [
  { Icono: BarChart3,     texto: '¿Qué detectaron los agentes hoy?' },
  { Icono: Users,         texto: '¿Qué clientes están en riesgo?' },
  { Icono: TriangleAlert, texto: 'Muéstrame las alertas críticas' },
  { Icono: TrendingUp,    texto: '¿Cómo va la tasa de takedowns?' },
];

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const { colores, empresa } = brandingConfig;

  const [notificacionesAbiertas, setNotificacionesAbiertas] = useState(false);
  const notificaciones = useEventosAgentes();
  const notifRef = useRef<HTMLDivElement>(null);

  const [chatAbierto, setChatAbierto] = useState(false);
  const searchWrapRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<AsistenteIAChatHandle>(null);

  const fecha = new Date();
  const fechaFormateada = fecha.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node))
        setNotificacionesAbiertas(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target as Node))
        setChatAbierto(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const notificacionesNoLeidas = notificaciones.filter(n => !n.leido).length;

  const colorSeveridad = (s: Severidad) =>
    s === 'critica' ? colores.peligro : s === 'alta' ? colores.advertencia : s === 'media' ? colores.acento : colores.exito;

  const getIconoPorSeveridad = (ev: EventoAgente) => {
    const c = colorSeveridad(ev.severidad);
    if (ev.resuelto)               return <ShieldCheck    size={16} color={colores.exito} />;
    if (ev.severidad === 'baja')   return <ShieldCheck    size={16} color={c} />;
    if (ev.severidad === 'media')  return <ShieldQuestion size={16} color={c} />;
    return <ShieldAlert size={16} color={c} />;
  };

  return (
    <>
      {/* Overlay oscuro cuando el chat está abierto */}
      {chatAbierto && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 200,
            backdropFilter: 'blur(2px)',
          }}
        />
      )}

      <header
        style={{
          height: '72px',
          backgroundColor: colores.fondoSecundario,
          borderBottom: `1px solid ${colores.borde}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          gap: '8px',
          flexShrink: 0,
          position: 'relative',
          zIndex: 300,
        }}
      >
        {/* ── IZQUIERDA: Barra con dropdown ── */}
        <div
          ref={searchWrapRef}
          style={{ flex: 1, maxWidth: '540px', position: 'relative' }}
        >
          {/* La barra */}
          <div
            onClick={() => { setChatAbierto(true); setTimeout(() => chatRef.current?.focusInput(), 50); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '0 14px',
              height: '44px',
              borderRadius: chatAbierto ? '14px 14px 0 0' : '999px',
              backgroundColor: chatAbierto ? colores.fondoPrincipal : colores.fondoTerciario,
              border: `1px solid ${chatAbierto ? colores.primario : colores.borde}`,
              borderBottom: chatAbierto ? `1px solid ${colores.borde}` : `1px solid ${colores.borde}`,
              cursor: 'text',
              transition: 'border-radius 0.2s, background-color 0.2s',
              boxShadow: chatAbierto ? `0 0 0 3px ${colores.primario}28` : 'none',
              position: 'relative',
              zIndex: 310,
            }}
          >
            <Sparkles size={17} style={{ color: colores.primario, flexShrink: 0 }} />
            <span style={{ fontSize: '14px', color: colores.textoMedio, flex: 1, userSelect: 'none' }}>
              {chatAbierto ? 'Asistente IA — escribe tu pregunta…' : 'Pregúntale algo al asistente IA…'}
            </span>
            {chatAbierto ? (
              <button
                onClick={e => { e.stopPropagation(); setChatAbierto(false); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', borderRadius: '50%' }}
              >
                <X size={16} style={{ color: colores.textoMedio }} />
              </button>
            ) : (
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                backgroundColor: colores.primario,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Bot size={14} color="#fff" />
              </div>
            )}
          </div>

          {/* ── Dropdown estilo Google ── */}
          {chatAbierto && (
            <div
              style={{
                position: 'absolute',
                top: '43px',
                left: 0,
                right: 0,
                backgroundColor: colores.fondoPrincipal,
                border: `1px solid ${colores.primario}`,
                borderTop: `1px solid ${colores.borde}`,
                borderRadius: '0 0 20px 20px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
                overflow: 'hidden',
                zIndex: 305,
                display: 'flex',
                flexDirection: 'column',
                maxHeight: 'calc(100vh - 130px)',
              }}
            >
              {/* Sugerencias rápidas */}
              <div style={{
                padding: '12px 16px 10px',
                borderBottom: `1px solid ${colores.borde}`,
                flexShrink: 0,
              }}>
                <p style={{
                  margin: '0 0 8px',
                  fontSize: '10px',
                  fontWeight: '700',
                  color: colores.textoMedio,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}>
                  Sugerencias
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {sugerencias.map(({ Icono, texto }, i) => (
                    <button
                      key={i}
                      onClick={() => chatRef.current?.sendExternal(texto)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '6px',
                        padding: '5px 12px',
                        borderRadius: '999px',
                        border: `1px solid ${colores.borde}`,
                        backgroundColor: colores.fondoTerciario,
                        color: colores.textoClaro,
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'background-color 0.15s',
                        whiteSpace: 'nowrap',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = colores.fondoSecundario)}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = colores.fondoTerciario)}
                    >
                      <Icono size={13} color={colores.textoMedio} />
                      <span>{texto}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat */}
              <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: '420px' }}>
                <AsistenteIAChat ref={chatRef} />
              </div>
            </div>
          )}
        </div>

        {/* ── CENTRO: Logo ── */}
        <img
          src={empresa.logo}
          alt={`${empresa.nombre} logo`}
          style={{ height: '56px', width: 'auto', objectFit: 'contain', flexShrink: 0 }}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />

        {/* ── DERECHA: Fecha + Bell + Avatar ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Fecha pegada a la campana */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '7px',
            padding: '7px 14px', borderRadius: '999px',
            backgroundColor: colores.fondoTerciario,
            border: `1px solid ${colores.borde}`,
            marginRight: '4px',
          }}>
            <CalendarDays size={14} style={{ color: colores.textoMedio }} />
            <span style={{ fontSize: '13px', fontWeight: '500', color: colores.textoClaro }}>
              {fechaFormateada}
            </span>
          </div>

          {/* Notificaciones */}
          <div ref={notifRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setNotificacionesAbiertas(!notificacionesAbiertas)}
              style={iconBtnStyle(colores.fondoTerciario)}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = colores.fondoPrincipal)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = colores.fondoTerciario)}
            >
              <Bell size={19} style={{ color: colores.textoClaro }} />
              {notificacionesNoLeidas > 0 && (
                <span style={{
                  position: 'absolute', top: '6px', right: '6px',
                  minWidth: '17px', height: '17px', borderRadius: '10px',
                  backgroundColor: '#EF4444', border: `2px solid ${colores.fondoSecundario}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '9px', fontWeight: 'bold', color: '#FFFFFF', padding: '0 3px',
                }}>
                  {notificacionesNoLeidas}
                </span>
              )}
            </button>

            {notificacionesAbiertas && (
              <div style={{
                position: 'absolute', top: '56px', right: '0',
                width: '370px', maxHeight: '480px',
                backgroundColor: colores.fondoSecundario,
                borderRadius: '14px', border: `1px solid ${colores.borde}`,
                boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
                overflow: 'hidden', zIndex: 1000,
              }}>
                <div style={{
                  padding: '14px 18px', borderBottom: `1px solid ${colores.borde}`,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: colores.textoClaro }}>Notificaciones</h3>
                    <p style={{ margin: '2px 0 0', fontSize: '12px', color: colores.textoMedio }}>{notificacionesNoLeidas} sin leer</p>
                  </div>
                  {notificacionesNoLeidas > 0 && (
                    <button onClick={marcarTodoLeido}
                      style={{ background: 'none', border: 'none', color: colores.primario, fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
                      Marcar todas
                    </button>
                  )}
                </div>

                <div style={{ maxHeight: '380px', overflowY: 'auto' }}>
                  {notificaciones.length === 0 && (
                    <div style={{ padding: '28px 18px', textAlign: 'center', fontSize: '12px', color: colores.textoMedio }}>
                      Los agentes están vigilando. Sin eventos por ahora.
                    </div>
                  )}
                  {notificaciones.map(notif => (
                    <div
                      key={notif.id}
                      onClick={() => marcarLeido(notif.id)}
                      style={{
                        padding: '14px 18px', borderBottom: `1px solid ${colores.borde}`,
                        backgroundColor: notif.leido ? 'transparent' : colores.fondoTerciario + '44',
                        cursor: 'pointer', transition: 'background-color 0.15s', display: 'flex', gap: '10px',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = colores.fondoTerciario)}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = notif.leido ? 'transparent' : colores.fondoTerciario + '44')}
                    >
                      <div style={{ flexShrink: 0, marginTop: '2px' }}>{getIconoPorSeveridad(notif)}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                          <Bot size={11} color={colores.textoOscuro} />
                          <span style={{ fontSize: '10px', fontWeight: 600, color: colores.textoOscuro }}>{notif.agente}</span>
                          <span style={{ marginLeft: 'auto', fontSize: '10px', color: colores.textoOscuro, fontFamily: 'monospace' }}>{notif.hora}</span>
                          {!notif.leido && (
                            <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: colorSeveridad(notif.severidad), flexShrink: 0 }} />
                          )}
                        </div>
                        <h4 style={{ margin: 0, fontSize: '13px', fontWeight: notif.leido ? '500' : '700', color: colores.textoClaro }}>
                          {notif.titulo}
                        </h4>
                        <p style={{ margin: '3px 0 0', fontSize: '12px', color: colores.textoMedio, lineHeight: '1.4' }}>{notif.detalle}</p>

                        {notif.resuelto ? (
                          <div style={{
                            marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px',
                            fontSize: '11.5px', fontWeight: 600, color: colores.exito,
                          }}>
                            <Check size={13} /> {notif.resuelto}
                          </div>
                        ) : (
                          <div style={{ marginTop: '9px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                            {notif.acciones.map((a, i) => (
                              <button
                                key={a.id}
                                onClick={e => { e.stopPropagation(); resolverEvento(notif.id, a); }}
                                style={{
                                  padding: '5px 10px', borderRadius: '8px', cursor: 'pointer',
                                  fontSize: '11.5px', fontWeight: 600,
                                  border: `1px solid ${i === 0 ? colorSeveridad(notif.severidad) : colores.borde}`,
                                  background: i === 0 ? colorSeveridad(notif.severidad) : 'transparent',
                                  color: i === 0 ? colores.textoEnOscuro : colores.textoMedio,
                                }}
                              >
                                {a.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ padding: '10px 18px', borderTop: `1px solid ${colores.borde}`, textAlign: 'center' }}>
                  <button style={{ background: 'none', border: 'none', color: colores.primario, fontSize: '13px', fontWeight: '600', cursor: 'pointer', width: '100%', padding: '6px' }}>
                    Ver todas las notificaciones
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Avatar */}
          <button
            style={{
              width: '42px', height: '42px', borderRadius: '50%',
              backgroundColor: '#FFFFFF', border: `2px solid ${colores.borde}`,
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', overflow: 'hidden', padding: '2px',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <img
              src="/assets/logosEmpresas/guardianLogo.png"
              alt="Perfil"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              onError={e => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const container = target.parentElement;
                if (container) {
                  container.style.background = `linear-gradient(135deg, ${colores.primario}, ${colores.secundario})`;
                  container.style.fontSize = '16px';
                  container.style.fontWeight = 'bold';
                  container.style.color = '#FFFFFF';
                  container.textContent = 'M';
                }
              }}
            />
          </button>
        </div>
      </header>
    </>
  );
};

const iconBtnStyle = (bg: string): React.CSSProperties => ({
  width: '40px', height: '40px', borderRadius: '50%',
  backgroundColor: bg, border: 'none', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  position: 'relative', transition: 'background-color 0.2s',
});