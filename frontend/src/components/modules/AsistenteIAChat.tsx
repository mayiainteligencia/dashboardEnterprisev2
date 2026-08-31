import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, Trash2, Bot } from 'lucide-react';
import { brandingConfig } from '../../config/branding';
import { useAIChat } from '../../context/AIChatContext';
import { MarkdownRenderer } from '../common/MarkdownRenderer';

const { colores, ia } = brandingConfig;

export const AsistenteIAChat: React.FC = () => {
  const {
    messages,
    loading,
    sendMessage,
    clearHistory,
    activeSectionTitle,
  } = useAIChat();

  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    const prompt = input.trim();
    setInput('');
    sendMessage(prompt);
  };

  const quickPrompts = [
    'Nivel y autonomía de tanques',
    'Sugerencia de precios dinámicos IA',
    'Alertas de seguridad ALPR y pistas',
    'Balance solar y postes EV (kW/h)'
  ];

  return (
    <div
      style={{
        height: '100%',
        backgroundColor: colores.fondoPrincipal,
        borderRadius: 18,
        display: 'flex',
        flexDirection: 'column',
        border: `1px solid ${colores.borde}`,
        boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
        overflow: 'hidden',
      }}
    >
      {/* Header del Chat */}
      <div
        style={{
          padding: '16px 20px',
          borderBottom: `1px solid ${colores.borde}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: colores.fondoSecundario,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '12px',
              background: `linear-gradient(135deg, ${colores.primario}, ${colores.secundario})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}
          >
            <Bot size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: colores.textoClaro }}>
                {ia.nombre} · Asesor IA Gas Station
              </h3>
              <span
                style={{
                  fontSize: 10,
                  background: '#10B98120',
                  color: '#10B981',
                  padding: '2px 8px',
                  borderRadius: 999,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
                LLM Conectado
              </span>
            </div>
            <p style={{ margin: '2px 0 0 0', fontSize: 12, color: colores.textoMedio }}>
              Contexto activo: <strong style={{ color: colores.primario }}>{activeSectionTitle}</strong>
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={clearHistory}
            title="Limpiar chat"
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              background: 'transparent',
              border: `1px solid ${colores.borde}`,
              fontSize: 12,
              color: colores.textoMedio,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Trash2 size={15} />
            Limpiar
          </button>
        </div>
      </div>

      {/* Mensajes del Chat */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          background: colores.fondoSecundario,
        }}
      >
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: m.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: 12,
                maxWidth: '85%',
                flexDirection: m.role === 'user' ? 'row-reverse' : 'row',
              }}
            >
              {m.role === 'assistant' && (
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '10px',
                    background: colores.primario,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 12,
                    flexShrink: 0,
                  }}
                >
                  <Sparkles size={18} />
                </div>
              )}
              <div
                style={{
                  background: m.role === 'user' ? colores.primario : colores.fondoPrincipal,
                  color: m.role === 'user' ? '#FFFFFF' : colores.textoClaro,
                  padding: '14px 18px',
                  borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  border: m.role === 'user' ? 'none' : `1px solid ${colores.borde}`,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                }}
              >
                {m.content ? (
                  <MarkdownRenderer content={m.content} isUser={m.role === 'user'} accentColor={colores.primario} />
                ) : (
                  loading && m.role === 'assistant' ? 'MAYIA está procesando los datos de la gasolinera...' : ''
                )}
              </div>
            </div>
            <span style={{ fontSize: 11, color: colores.textoMedio, marginTop: 4, margin: '4px 12px' }}>
              {m.timestamp} {m.moduleContext ? `• ${m.moduleContext}` : ''}
            </span>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Sugerencias Rápidas */}
      <div style={{ padding: '10px 16px', background: colores.fondoPrincipal, borderTop: `1px solid ${colores.borde}`, display: 'flex', gap: 8, overflowX: 'auto' }}>
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => { setInput(qp); handleSend(); }}
            style={{
              padding: '6px 12px',
              borderRadius: 999,
              background: colores.fondoTerciario,
              border: `1px solid ${colores.borde}`,
              fontSize: 12,
              color: colores.textoMedio,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = colores.primario; e.currentTarget.style.color = colores.primario; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = colores.borde; e.currentTarget.style.color = colores.textoMedio; }}
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Input de Mensaje */}
      <div
        style={{
          padding: 16,
          background: colores.fondoPrincipal,
          borderTop: `1px solid ${colores.borde}`,
          display: 'flex',
          gap: 12,
          alignItems: 'center',
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={`Escribe tu consulta para ${ia.nombre} (Módulo: ${activeSectionTitle})…`}
          style={{
            flex: 1,
            padding: '12px 18px',
            borderRadius: 12,
            border: `1px solid ${colores.borde}`,
            fontSize: 14,
            outline: 'none',
            background: colores.fondoSecundario,
            color: colores.textoClaro,
          }}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          style={{
            padding: '12px 20px',
            borderRadius: 12,
            background: input.trim() ? colores.primario : colores.borde,
            color: '#fff',
            border: 'none',
            fontWeight: 600,
            fontSize: 14,
            cursor: input.trim() ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'background 0.2s',
          }}
        >
          <Send size={16} />
          Enviar
        </button>
      </div>
    </div>
  );
};