import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowUp, X, Trash2, Send, Search, Building2, ShieldAlert } from 'lucide-react';
import { brandingConfig } from '../config/branding';
import { useAIChat } from '../context/AIChatContext';
import { MarkdownRenderer } from './common/MarkdownRenderer';

export type Modo = 'admin' | 'cliente';

const { colores, ia } = brandingConfig;

export const AsistenteBuscador: React.FC<{ modo?: Modo }> = () => {
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

  const handleQuickSearch = (prompt: string) => {
    setIsChatOpen(true);
    sendMessage(prompt);
  };

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%' }}>
      {/* BARRA DE BÚSQUEDA DEL HEADER */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: '#F8FAFC',
          border: `1px solid ${isChatOpen ? colores.primario : colores.borde}`,
          borderRadius: '12px',
          padding: '6px 14px',
          boxShadow: isChatOpen ? '0 0 0 3px rgba(37, 99, 235, 0.15)' : 'none',
          transition: 'all 0.2s ease',
        }}
      >
        <Search size={17} color={colores.primario} />
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsChatOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
          placeholder="Pregunta a RISKO Copilot (ej. 'Score sismico Torre Reforma 222')..."
          style={{
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            width: '100%',
            fontSize: '13px',
            color: colores.textoClaro,
            fontWeight: '500',
          }}
        />
        <button
          onClick={() => {
            if (input.trim()) handleSend();
            else setIsChatOpen(!isChatOpen);
          }}
          style={{
            border: 'none',
            backgroundColor: colores.primario,
            color: '#FFFFFF',
            borderRadius: '8px',
            padding: '6px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          <Sparkles size={14} />
          <span>IA</span>
        </button>
      </div>

      {/* PANEL FLOTANTE DEL CHAT */}
      {isChatOpen && (
        <div
          style={{
            position: 'absolute',
            top: '48px',
            left: 0,
            right: 0,
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            boxShadow: '0 12px 36px rgba(15, 23, 42, 0.18)',
            border: `1px solid ${colores.borde}`,
            zIndex: 300,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '520px',
          }}
        >
          {/* Header del Panel */}
          <div
            style={{
              padding: '14px 18px',
              backgroundColor: '#F8FAFC',
              borderBottom: `1px solid ${colores.borde}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  backgroundColor: colores.primario,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                }}
              >
                <Sparkles size={16} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: colores.textoClaro }}>
                  RISKO Copilot · {activeSectionTitle || 'GeoRisk & Underwriting'}
                </h4>
                <p style={{ margin: 0, fontSize: '11px', color: colores.textoOscuro }}>
                  Asistente Agéntico de Inteligencia Inmobiliaria
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={clearHistory}
                title="Limpiar conversación"
                style={{ border: 'none', background: 'none', color: colores.textoOscuro, cursor: 'pointer', padding: '4px' }}
              >
                <Trash2 size={16} />
              </button>
              <button
                onClick={() => setIsChatOpen(false)}
                style={{ border: 'none', background: 'none', color: colores.textoOscuro, cursor: 'pointer', padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Mensajes del Chat */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              backgroundColor: '#FFFFFF',
            }}
          >
            {messages.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px 10px' }}>
                <ShieldAlert size={36} color={colores.primario} style={{ margin: '0 auto 12px' }} />
                <h5 style={{ margin: '0 0 6px', fontSize: '14px', color: colores.textoClaro, fontWeight: '700' }}>
                  ¿En qué expediente o análisis puedo asistirte hoy?
                </h5>
                <p style={{ fontSize: '12px', color: colores.textoMedio, margin: '0 0 16px' }}>
                  Selecciona una consulta rápida o escribe tu pregunta sobre los inmuebles:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[
                    '¿Cuál es el score de riesgo sísmico de Torre Reforma 222?',
                    'Simula una inundación fluvial de 1.2m en Parque Apodaca',
                    'Calcula el infraseguro y brechas de póliza en la cartera',
                  ].map((sugerencia, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickSearch(sugerencia)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: `1px solid ${colores.borde}`,
                        backgroundColor: '#F8FAFC',
                        color: colores.primario,
                        fontSize: '12px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontWeight: '500',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      💡 {sugerencia}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((m) => (
                <div
                  key={m.id}
                  style={{
                    alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    backgroundColor: m.sender === 'user' ? colores.primario : '#F8FAFC',
                    color: m.sender === 'user' ? '#FFFFFF' : colores.textoClaro,
                    padding: '10px 14px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    border: m.sender === 'ai' ? `1px solid ${colores.borde}` : 'none',
                    lineHeight: '1.4',
                  }}
                >
                  {m.sender === 'ai' ? (
                    <MarkdownRenderer content={m.text} />
                  ) : (
                    <div>{m.text}</div>
                  )}
                  <span
                    style={{
                      fontSize: '10px',
                      opacity: 0.7,
                      display: 'block',
                      marginTop: '4px',
                      textAlign: 'right',
                    }}
                  >
                    {m.timestamp}
                  </span>
                </div>
              ))
            )}
            {loading && (
              <div style={{ alignSelf: 'flex-start', backgroundColor: '#F1F5F9', padding: '8px 14px', borderRadius: '12px', fontSize: '12px', color: colores.textoOscuro }}>
                RISKO Copilot analizando expediente...
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input del Chat */}
          <div
            style={{
              padding: '12px 16px',
              backgroundColor: '#F8FAFC',
              borderTop: `1px solid ${colores.borde}`,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <input
              ref={panelInputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder="Escribe tu mensaje a RISKO Copilot..."
              style={{
                flex: 1,
                border: `1px solid ${colores.borde}`,
                borderRadius: '10px',
                padding: '8px 12px',
                fontSize: '13px',
                outline: 'none',
                backgroundColor: '#FFFFFF',
              }}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              style={{
                backgroundColor: colores.primario,
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '10px',
                padding: '8px 14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: '600',
                opacity: loading || !input.trim() ? 0.6 : 1,
              }}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
