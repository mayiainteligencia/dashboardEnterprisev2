import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Trash2, ShieldCheck, Building2, Cpu, CheckCircle, AlertTriangle } from 'lucide-react';
import { brandingConfig } from '../../config/branding';
import { useAIChat } from '../../context/AIChatContext';
import { MarkdownRenderer } from '../common/MarkdownRenderer';

export const AsistenteIAChat: React.FC = () => {
  const { colores } = brandingConfig;
  const { messages, loading, sendMessage, clearHistory } = useAIChat();
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    const msg = input.trim();
    setInput('');
    sendMessage(msg);
  };

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 120px)',
        gap: '16px'
      }}
    >
      {/* HEADER DE MÓDULO */}
      <div
        style={{
          padding: '20px 24px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: `1px solid ${colores.borde}`,
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: colores.gradientePrimario,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)'
            }}
          >
            <ShieldCheck size={26} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: colores.textoClaro }}>
              RISKO Copilot · Asistente Agéntico Conversacional
            </h2>
            <p style={{ margin: 0, fontSize: '13px', color: colores.textoOscuro }}>
              Inteligencia Artificial Multiamenaza & Suscripción Inmobiliaria
            </p>
          </div>
        </div>

        <button
          onClick={clearHistory}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 14px',
            borderRadius: '10px',
            border: `1px solid ${colores.borde}`,
            backgroundColor: '#FFFFFF',
            color: colores.textoOscuro,
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          <Trash2 size={16} />
          Limpiar Conversación
        </button>
      </div>

      {/* ÁREA DE CHAT */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: `1px solid ${colores.borde}`,
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          {messages.length === 0 ? (
            <div style={{ textAlign: 'center', margin: 'auto', maxWidth: '540px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#EFF6FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: colores.primario,
                  margin: '0 auto 16px'
                }}
              >
                <Cpu size={32} />
              </div>
              <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: '800', color: colores.textoClaro }}>
                Asistente RISKO Copilot Listo
              </h3>
              <p style={{ margin: '0 0 20px', fontSize: '14px', color: colores.textoMedio, lineHeight: '1.5' }}>
                Puedo ayudarte a analizar la vulnerabilidad sísmica, riesgos de inundación, sistemas NFPA contra incendio, cálculo de AAL/PML y planes de mitigación CAPEX.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', textAlign: 'left' }}>
                {[
                  '¿Cuál es la aceleración sismica pico (PGA) en Cuauhtémoc CDMX?',
                  'Revisa si la bomba de incendio cumple con norma NFPA 20',
                  'Simula el escenario de pérdida máxima (PML) en Parque Apodaca',
                  'Genera un plan de acción CAPEX para reducir score de 64 a 35'
                ].map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(prompt)}
                    style={{
                      padding: '12px',
                      borderRadius: '10px',
                      border: `1px solid ${colores.borde}`,
                      backgroundColor: '#F8FAFC',
                      color: colores.textoClaro,
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    👉 {prompt}
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
                  maxWidth: '80%',
                  backgroundColor: m.sender === 'user' ? colores.primario : '#F8FAFC',
                  color: m.sender === 'user' ? '#FFFFFF' : colores.textoClaro,
                  padding: '14px 18px',
                  borderRadius: '14px',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  border: m.sender === 'ai' ? `1px solid ${colores.borde}` : 'none'
                }}
              >
                {m.sender === 'ai' ? (
                  <MarkdownRenderer content={m.text} />
                ) : (
                  <div>{m.text}</div>
                )}
                <span
                  style={{
                    fontSize: '11px',
                    opacity: 0.7,
                    display: 'block',
                    marginTop: '6px',
                    textAlign: 'right'
                  }}
                >
                  {m.timestamp}
                </span>
              </div>
            ))
          )}
          {loading && (
            <div style={{ alignSelf: 'flex-start', backgroundColor: '#EFF6FF', padding: '10px 16px', borderRadius: '12px', fontSize: '13px', color: colores.primario, fontWeight: '600' }}>
              ⚡ RISKO Copilot procesando datos de cartera...
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* INPUT DE CHAT */}
        <div
          style={{
            padding: '16px 20px',
            backgroundColor: '#F8FAFC',
            borderTop: `1px solid ${colores.borde}`,
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder="Pregunta a RISKO Copilot sobre el riesgo de cualquier inmueble..."
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '10px',
              border: `1px solid ${colores.borde}`,
              fontSize: '14px',
              outline: 'none',
              backgroundColor: '#FFFFFF',
              color: colores.textoClaro
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
              padding: '12px 20px',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              opacity: loading || !input.trim() ? 0.6 : 1
            }}
          >
            <Send size={16} />
            <span>Enviar</span>
          </button>
        </div>
      </div>
    </div>
  );
};