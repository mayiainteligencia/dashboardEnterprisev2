import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowUp, Send, Bot } from 'lucide-react';
import { brandingConfig } from '../config/branding';

const { colores, ia } = brandingConfig;

type Msg = { role: 'user' | 'assistant'; content: string; time: string };

const sugerencias = [
  { icono: '🍰', texto: '¿Cuál es el pronóstico de Tres Riches en Centro?' },
  { icono: '❄️', texto: '¿Cómo evito el agrietamiento de Bettercreme?' },
  { icono: '💸', texto: '¿Qué precios de competencia tiene Puratos?' },
  { icono: '🎓', texto: '¿Cómo va el avance de Academia en Cuajimalpa?' },
];

export const AsistenteBuscador: React.FC<{ onStateChange?: (open: boolean) => void }> = ({ onStateChange }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        onStateChange?.(false);
      }
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [onStateChange]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (textoForzado?: string) => {
    const text = (textoForzado || input).trim();
    if (!text || loading) return;

    const time = new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { role: 'user', content: text, time }]);
    setInput('');
    setLoading(true);
    setOpen(true);
    onStateChange?.(true);

    try {
      const res = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje: text, departamento: 'Ventas y Marketing' }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      const assistantTime = new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
      setMessages(prev => [...prev, { role: 'assistant', content: data.respuesta, time: assistantTime }]);
    } catch {
      const assistantTime = new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
      setMessages(prev => [...prev, { role: 'assistant', content: 'No fue posible conectar con el asistente corporativo.', time: assistantTime }]);
    } finally {
      setLoading(false);
    }
  };

  const handleFocus = () => {
    setOpen(true);
    onStateChange?.(true);
  };

  return (
    <div ref={ref} style={{ position: 'relative', flex: 1, maxWidth: '500px', zIndex: 300 }}>
      {/* Barra buscador */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          height: '44px',
          padding: '0 8px 0 16px',
          borderRadius: open ? '16px 16px 0 0' : '999px',
          background: open ? '#FFFFFF' : '#F1F5F9',
          border: `1px solid ${open ? colores.primario : '#E2E8F0'}`,
          borderBottom: open ? 'none' : `1px solid ${open ? colores.primario : '#E2E8F0'}`,
          transition: 'all 0.2s ease',
          boxShadow: open ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
        }}
      >
        <Sparkles size={16} color={colores.primario} style={{ flexShrink: 0 }} />
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          onFocus={handleFocus}
          placeholder={`Pregúntale a ${ia.nombre}…`}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: '13px',
            color: colores.textoClaro,
          }}
        />
        <button
          onClick={() => send()}
          disabled={loading || !input.trim()}
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            border: 'none',
            flexShrink: 0,
            background: input.trim() ? colores.primario : '#CBD5E1',
            color: '#FFFFFF',
            cursor: input.trim() ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
          }}
        >
          <ArrowUp size={14} />
        </button>
      </div>

      {/* Panel desplegable */}
      {open && (
        <div
          style={{
            position: 'absolute',
            top: '43px',
            left: 0,
            right: 0,
            zIndex: 1500,
            background: '#FFFFFF',
            border: `1px solid ${colores.primario}`,
            borderTop: 'none',
            borderRadius: '0 0 16px 16px',
            boxShadow: '0 16px 36px rgba(0, 0, 0, 0.12)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '440px',
          }}
        >
          {/* Cabecera del desplegable */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              borderBottom: '1px solid #F1F5F9',
              background: '#FAFAFA',
            }}
          >
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${colores.primario}, ${colores.primarioOscuro})`,
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 800,
              }}
            >
              AI
            </div>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: colores.textoClaro, margin: 0 }}>
                {ia.nombre}
              </p>
              <p style={{ fontSize: '10px', color: colores.textoMedio, margin: 0 }}>
                Asistente de Inteligencia Predictiva B2B
              </p>
            </div>
          </div>

          {/* Cuerpo de conversación / sugerencias */}
          <div
            className="no-scrollbar"
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              background: '#FFFFFF',
            }}
          >
            {messages.length === 0 && !loading && (
              <div>
                <p
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    color: '#64748B',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '8px',
                  }}
                >
                  Sugerencias Rápidas
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {sugerencias.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => send(s.texto)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: '1px solid #E2E8F0',
                        backgroundColor: '#F8FAFC',
                        color: colores.textoMedio,
                        fontSize: '11px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = '#F1F5F9';
                        e.currentTarget.style.borderColor = colores.primario;
                        e.currentTarget.style.color = colores.textoClaro;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = '#F8FAFC';
                        e.currentTarget.style.borderColor = '#E2E8F0';
                        e.currentTarget.style.color = colores.textoMedio;
                      }}
                    >
                      <span>{s.icono}</span>
                      <span style={{ fontWeight: '500' }}>{s.texto}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '8px',
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '82%',
                  animation: 'fadeIn 0.2s ease',
                }}
              >
                {m.role === 'assistant' && (
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: colores.primario,
                      color: '#FFFFFF',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    AI
                  </div>
                )}
                <div>
                  <div
                    style={{
                      background: m.role === 'user' ? colores.primario : '#F1F5F9',
                      color: m.role === 'user' ? '#FFFFFF' : colores.textoClaro,
                      padding: '10px 14px',
                      borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                      fontSize: '12px',
                      lineHeight: 1.4,
                      boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                    }}
                  >
                    {m.content}
                  </div>
                  <div
                    style={{
                      fontSize: '9px',
                      color: '#94A3B8',
                      marginTop: '4px',
                      textAlign: m.role === 'user' ? 'right' : 'left',
                    }}
                  >
                    {m.time}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', gap: '8px', alignSelf: 'flex-start', alignItems: 'center' }}>
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: colores.primario,
                    color: '#FFFFFF',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  AI
                </div>
                <div style={{ fontSize: '11px', color: '#94A3B8', fontStyle: 'italic' }}>
                  {ia.nombre} está buscando datos…
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
        </div>
      )}
    </div>
  );
};
