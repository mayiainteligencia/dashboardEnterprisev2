import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowUp, X, Trash2, Send } from 'lucide-react';
import { brandingConfig } from '../config/branding';
import { useAIChat } from '../context/AIChatContext';
import { MarkdownRenderer } from './common/MarkdownRenderer';

export type Modo = 'admin' | 'cliente';

const { colores, ia, temas } = brandingConfig;

export const AsistenteBuscador: React.FC<{ modo?: Modo }> = ({ modo = 'admin' }) => {
  const tema = modo === 'admin' ? temas.admin : temas.cliente;
  const {
    messages,
    loading,
    sendMessage,
    clearHistory,
    activeSectionTitle,
    isChatOpen,
    setIsChatOpen
  } = useAIChat();

  const [input, setInput] = useState('');

  const ref = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsChatOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsChatOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [setIsChatOpen]);

  useEffect(() => {
    if (isChatOpen) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        panelInputRef.current?.focus();
      }, 100);
    }
  }, [messages, loading, isChatOpen]);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    const prompt = input.trim();
    setInput('');
    setIsChatOpen(true);
    sendMessage(prompt);
  };

  const quickPrompts = [
    `Análisis de ${activeSectionTitle}`,
    '¿Cuáles son las alertas críticas?',
    'Resumen operativo en tiempo real',
    'Sugerencias de optimización'
  ];

  return (
    <div ref={ref} style={{ position: 'relative', flex: 1, maxWidth: '480px' }}>
      {/* Barra Buscador Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px', height: '44px', padding: '0 8px 0 14px',
        borderRadius: '999px', background: colores.fondoTerciario,
        border: `1px solid ${isChatOpen ? tema.acento : colores.borde}`, transition: 'border-color .2s',
        boxShadow: isChatOpen ? `0 0 12px ${tema.acento}30` : 'none',
      }}>
        <button
          type="button"
          onClick={() => setIsChatOpen(!isChatOpen)}
          aria-label={isChatOpen ? 'Cerrar asistente' : 'Abrir asistente'}
          style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, display: 'flex', flexShrink: 0, alignItems: 'center', gap: 6 }}
        >
          <Sparkles size={18} color={tema.acento} />
        </button>

        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          onFocus={() => setIsChatOpen(true)}
          placeholder={`Pregúntale a ${ia.nombre} (Módulo: ${activeSectionTitle})…`}
          style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: '13px', color: colores.textoClaro }}
        />

        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          style={{
            width: '32px', height: '32px', borderRadius: '50%', border: 'none', flexShrink: 0,
            background: input.trim() ? tema.acento : colores.borde, color: '#fff', cursor: input.trim() ? 'pointer' : 'default',
            display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .2s',
          }}
        >
          <ArrowUp size={16} />
        </button>
      </div>

      {/* Panel Desplegable de Chat LLM */}
      {isChatOpen && (
        <div style={{
          position: 'absolute', top: '52px', left: 0, right: 0, zIndex: 2000,
          background: colores.fondoSecundario, border: `1px solid ${colores.borde}`, borderRadius: '18px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)', overflow: 'hidden', height: '520px', display: 'flex', flexDirection: 'column',
          animation: 'fadeSlideUp 0.3s ease-out',
        }}>
          {/* Top Bar / Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', borderBottom: `1px solid ${colores.borde}`, background: colores.fondoPrincipal }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `linear-gradient(135deg, ${tema.acento}, ${tema.acentoOscuro})`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800 }}>AI</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <p style={{ fontSize: '14px', fontWeight: 700, color: colores.textoClaro, margin: 0 }}>{ia.nombre} LLM Engine</p>
              </div>
              <p style={{ fontSize: '11px', color: colores.textoMedio, margin: 0 }}>
                Contexto activo: <strong style={{ color: tema.acentoOscuro }}>{activeSectionTitle}</strong>
              </p>
            </div>

            <div style={{ display: 'flex', gap: 6 }}>
              <button
                type="button"
                onClick={clearHistory}
                title="Limpiar historial"
                style={{ border: 'none', background: colores.fondoTerciario, borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Trash2 size={15} color={colores.textoMedio} />
              </button>
              <button
                type="button"
                onClick={() => setIsChatOpen(false)}
                title="Cerrar"
                style={{ border: 'none', background: colores.fondoTerciario, borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} color={colores.textoMedio} />
              </button>
            </div>
          </div>

          {/* Conversación / Mensajes */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: m.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div style={{ display: 'flex', gap: 8, maxWidth: '88%', flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
                  {m.role === 'assistant' && (
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: tema.acento, color: '#fff', fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      AI
                    </div>
                  )}
                  <div
                    style={{
                      background: m.role === 'user' ? tema.acento : colores.fondoTerciario,
                      color: m.role === 'user' ? tema.sobreAcento : colores.textoClaro,
                      padding: '10px 14px',
                      borderRadius: m.role === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                    }}
                  >
                    {m.content ? (
                      <MarkdownRenderer content={m.content} isUser={m.role === 'user'} accentColor={tema.acentoOscuro} />
                    ) : (
                      loading && m.role === 'assistant' ? 'MAYIA procesando consulta...' : ''
                    )}
                  </div>
                </div>
                <span style={{ fontSize: '10px', color: colores.textoMedio, marginTop: 4, margin: '4px 8px' }}>
                  {m.timestamp} {m.moduleContext ? `• ${m.moduleContext}` : ''}
                </span>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div style={{ padding: '6px 12px', borderTop: `1px solid ${colores.borde}`, background: colores.fondoPrincipal, display: 'flex', gap: 6, overflowX: 'auto' }}>
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => { setInput(qp); handleSend(); }}
                style={{
                  padding: '4px 10px', borderRadius: 999, background: colores.fondoTerciario, border: `1px solid ${colores.borde}`,
                  fontSize: 11, color: colores.textoMedio, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = tema.acento; e.currentTarget.style.color = tema.acentoOscuro; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = colores.borde; e.currentTarget.style.color = colores.textoMedio; }}
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Campo para Escribir dentro del Panel */}
          <div style={{ padding: '10px 14px', background: colores.fondoPrincipal, borderTop: `1px solid ${colores.borde}`, display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              ref={panelInputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder={`Escribe tu mensaje para MAYIA (${activeSectionTitle})…`}
              style={{
                flex: 1, padding: '10px 14px', borderRadius: 12, border: `1px solid ${colores.borde}`,
                fontSize: 13, outline: 'none', background: colores.fondoSecundario, color: colores.textoClaro,
              }}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              style={{
                padding: '10px 16px', borderRadius: 12, background: input.trim() ? tema.acento : colores.borde,
                color: '#fff', border: 'none', fontWeight: 600, fontSize: 13, cursor: input.trim() ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', gap: 6, transition: 'background 0.2s',
              }}
            >
              <Send size={15} />
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
