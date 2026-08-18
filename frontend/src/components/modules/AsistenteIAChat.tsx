import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Trash2, ShieldCheck, Cpu, CheckCircle, AlertTriangle, BrainCircuit, Zap, Building2, Activity, Bot, User, MessageSquare } from 'lucide-react';
import { brandingConfig } from '../../config/branding';
import { useAIChat } from '../../context/AIChatContext';
import { MarkdownRenderer } from '../common/MarkdownRenderer';

export const AsistenteIAChat: React.FC = () => {
  const { colores } = brandingConfig;
  const { messages, sendMessage, loading, clearHistory, activeSectionTitle } = useAIChat();
  const [input, setInput] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = () => {
    if (input.trim() && !loading) {
      sendMessage(input.trim());
      setInput('');
    }
  };

  const capabilities = [
    { icon: Activity, title: 'Análisis NatCat & GIS', desc: 'Simula escenarios de sismo, inundación y huracán por coordenadas' },
    { icon: ShieldCheck, title: 'Auditoría de Pólizas', desc: 'Detecta brechas de infraseguro, sublímites y exclusiones' },
    { icon: BrainCircuit, title: 'Simulación de Score', desc: 'Proyecta impacto en asegurabilidad A–F tras CAPEX' },
    { icon: Building2, title: 'Optimización CAPEX', desc: 'Calcula ROI en prima de mitigaciones prioritarias' }
  ];

  const quickPrompts = [
    '¿Cuál es la brecha de infraseguro en Torre Reforma 222?',
    'Simular impacto de sismo Mw 7.2 en cartera CDMX',
    'Resumen de recomendaciones CAPEX prioritarias',
    'Auditar cumplimiento de red de rociadores NFPA 25'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '85vh', backgroundColor: '#FFFFFF', borderRadius: '16px', border: `1px solid ${colores.borde}`, overflow: 'hidden', boxShadow: '0 2px 8px rgba(15,23,42,0.04)' }}>
      
      {/* Header */}
      <div style={{ padding: '16px 24px', borderBottom: `1px solid ${colores.borde}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8FAFC' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: colores.gradientePrimario, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pulseGlow 2s infinite' }}>
            <BrainCircuit color="#FFFFFF" size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '800', color: colores.textoClaro }}>RISKO Copilot</h3>
              <span style={{ fontSize: '11px', color: colores.primario, backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', padding: '2px 8px', borderRadius: '6px', fontWeight: '700' }}>
                {brandingConfig.ia.modelo}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '3px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10B981', animation: 'pulseGlow 2s infinite' }} />
                <span style={{ fontSize: '11px', color: '#047857', fontWeight: '700' }}>Sistema Agéntico Activo</span>
              </div>
              <span style={{ fontSize: '11px', color: colores.textoOscuro }}>· Contexto: {activeSectionTitle}</span>
            </div>
          </div>
        </div>

        <button 
          onClick={clearHistory} 
          style={{ 
            background: 'none', 
            border: `1px solid ${colores.borde}`, 
            color: colores.textoOscuro, 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            fontSize: '12px', 
            fontWeight: '600',
            padding: '7px 14px', 
            borderRadius: '8px',
            backgroundColor: '#FFFFFF',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FEF2F2'; e.currentTarget.style.color = '#EF4444'; e.currentTarget.style.borderColor = '#FECACA'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.color = colores.textoOscuro; e.currentTarget.style.borderColor = colores.borde; }}
        >
          <Trash2 size={14} />
          Limpiar Conversación
        </button>
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px', backgroundColor: '#FAFAFA' }}>
        {messages.length === 0 ? (
          <div style={{ margin: 'auto', maxWidth: '640px', width: '100%', animation: 'fadeSlideUp 0.4s ease-out' }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Sparkles size={30} color={colores.primario} />
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: colores.textoClaro, margin: '0 0 6px' }}>
                ¿En qué análisis de riesgo puedo asistirte?
              </h2>
              <p style={{ color: colores.textoOscuro, fontSize: '13px', margin: 0 }}>
                Copilot agéntico conectado a los 16 módulos operacionales de RISKO Platform.
              </p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
              {capabilities.map((cap, i) => {
                const Icon = cap.icon;
                return (
                  <div key={i} style={{ backgroundColor: '#FFFFFF', border: `1px solid ${colores.borde}`, borderRadius: '12px', padding: '14px', display: 'flex', alignItems: 'flex-start', gap: '10px', boxShadow: '0 1px 3px rgba(15,23,42,0.03)' }}>
                    <div style={{ padding: '8px', backgroundColor: '#EFF6FF', borderRadius: '8px', color: colores.primario }}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 2px', fontSize: '13px', fontWeight: '700', color: colores.textoClaro }}>{cap.title}</h4>
                      <p style={{ margin: 0, fontSize: '11px', color: colores.textoOscuro, lineHeight: 1.3 }}>{cap.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
              {quickPrompts.map((prompt, i) => (
                <button 
                  key={i} 
                  onClick={() => sendMessage(prompt)} 
                  style={{ 
                    backgroundColor: '#FFFFFF', 
                    border: `1px solid ${colores.borde}`, 
                    borderRadius: '20px', 
                    padding: '8px 16px', 
                    fontSize: '12px', 
                    fontWeight: '600',
                    color: colores.textoClaro, 
                    cursor: 'pointer', 
                    transition: 'all 0.15s ease', 
                    boxShadow: '0 1px 2px rgba(15,23,42,0.02)' 
                  }} 
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = colores.primario; e.currentTarget.style.color = colores.primario; e.currentTarget.style.backgroundColor = '#EFF6FF'; }} 
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = colores.borde; e.currentTarget.style.color = colores.textoClaro; e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div key={msg.id} style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', animation: 'fadeSlideUp 0.3s ease-out' }}>
                <div style={{ 
                  maxWidth: '82%', 
                  padding: '16px 20px', 
                  borderRadius: '16px',
                  borderTopRightRadius: isUser ? '4px' : '16px',
                  borderTopLeftRadius: !isUser ? '4px' : '16px',
                  background: isUser ? colores.gradientePrimario : '#FFFFFF',
                  color: isUser ? '#FFFFFF' : colores.textoClaro,
                  boxShadow: '0 2px 8px rgba(15,23,42,0.05)',
                  border: isUser ? 'none' : `1px solid ${colores.borde}`,
                  borderLeft: !isUser ? `4px solid ${colores.primario}` : 'none'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', opacity: isUser ? 0.85 : 0.7, fontSize: '11px', fontWeight: '700' }}>
                    {isUser ? <User size={13} /> : <Bot size={13} />}
                    <span>{isUser ? 'Tú (Risk Manager)' : 'RISKO Copilot'}</span>
                    <span>·</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {!isUser ? (
                    <MarkdownRenderer content={msg.text} />
                  ) : (
                    <div style={{ fontSize: '14px', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{msg.text}</div>
                  )}
                </div>
              </div>
            );
          })
        )}
        
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ padding: '16px 20px', backgroundColor: '#FFFFFF', borderRadius: '16px', borderTopLeftRadius: '4px', border: `1px solid ${colores.borde}`, borderLeft: `4px solid ${colores.primario}`, display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div style={{ width: '8px', height: '8px', backgroundColor: colores.primario, borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '-0.32s' }} />
              <div style={{ width: '8px', height: '8px', backgroundColor: colores.primario, borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '-0.16s' }} />
              <div style={{ width: '8px', height: '8px', backgroundColor: colores.primario, borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both' }} />
              <span style={{ fontSize: '12px', fontWeight: '600', color: colores.textoOscuro, marginLeft: '6px' }}>Consultando Red de Agentes RISKO...</span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input Area */}
      <div style={{ padding: '20px 24px', borderTop: `1px solid ${colores.borde}`, backgroundColor: '#FFFFFF' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-end', 
          backgroundColor: '#F8FAFC', 
          borderRadius: '14px', 
          padding: '8px 14px', 
          border: `1px solid ${inputFocused ? colores.primario : colores.borde}`,
          boxShadow: inputFocused ? '0 0 0 3px rgba(37,99,235,0.1)' : 'none',
          transition: 'all 0.15s ease'
        }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Escribe tu consulta sobre activos, pólizas, mapas o scores de riesgo..."
            rows={Math.min(Math.max(input.split('\n').length, 1), 4)}
            style={{ 
              flex: 1, 
              border: 'none', 
              background: 'transparent', 
              resize: 'none', 
              padding: '8px 4px', 
              fontSize: '14px', 
              fontFamily: 'inherit',
              color: colores.textoClaro,
              outline: 'none',
              lineHeight: '1.5'
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            style={{ 
              background: input.trim() && !loading ? colores.primario : '#E2E8F0',
              color: input.trim() && !loading ? '#FFFFFF' : '#94A3B8',
              border: 'none',
              borderRadius: '10px',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
              transition: 'all 0.15s ease',
              marginBottom: '2px',
              flexShrink: 0,
            }}
          >
            <Send size={16} />
          </button>
        </div>
        <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '11px', color: colores.textoOscuro }}>
          RISKO Copilot v3.5 · Asistente IA especializado en suscripción, peritajes e ingeniería de riesgos inmobiliarios.
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37,99,235, 0.4); }
          50% { box-shadow: 0 0 0 6px rgba(37,99,235, 0); }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};
