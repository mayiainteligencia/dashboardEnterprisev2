import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Bell, Menu, ArrowLeftRight, Sparkles, Send, X, Bot, Loader2 } from 'lucide-react';
import { WAI_BRAND_CONFIG } from '../../config/branding';

interface WaiHeaderProps {
  config: typeof WAI_BRAND_CONFIG;
  onMenu?: () => void;
}

export const WaiHeader: React.FC<WaiHeaderProps> = ({ 
  config, 
  onMenu
}) => {
  const { theme, clientName, slogan } = config;
  const [showNotif, setShowNotif] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    { sender: 'bot', text: "¡Hola! Soy el Agente IA de WAI México. Estoy aquí para responder tus preguntas sobre la Asamblea Nacional, la Declaratoria de IA y el Summit 2026. ¿En qué te puedo apoyar hoy?" }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showChat) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, showChat]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || loading) return;

    const userText = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setChatInput("");
    setLoading(true);

    try {
      const res = await fetch('/api/chat/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mensaje: userText, departamento: 'general' })
      });
      const data = await res.json();
      if (data.success && data.respuesta) {
        setChatMessages(prev => [...prev, { sender: 'bot', text: data.respuesta }]);
      } else {
        setChatMessages(prev => [...prev, { sender: 'bot', text: "No he podido procesar tu consulta en este momento. Por favor, intenta de nuevo." }]);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setChatMessages(prev => [...prev, { sender: 'bot', text: "Hubo un error de conexión al servidor de IA. Verifica que el backend esté activo." }]);
    } finally {
      setLoading(false);
    }
  };

  const fecha = new Date();
  const opciones: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  };
  const fechaFormateada = fecha.toLocaleDateString('es-MX', opciones);

  return (
    <header 
      style={{ 
        height: '80px',
        backgroundColor: 'rgba(2, 11, 28, 0.65)', // Muy oscuro translúcido
        backdropFilter: 'blur(12px)',
        borderBottom: `1.5px solid ${theme.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(16px, 3vw, 32px)',
        gap: '20px',
        flexShrink: 0,
        zIndex: 10,
      }}
    >
      {/* LEFT COLUMN: Brand Title, Assembly Name, and Slogan as Subtitle */}
      <div 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '6px', 
          minWidth: 0, 
          flex: 1 
        }}
      >
        {/* Row 1: Brand & Assembly indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'nowrap' }}>
          {onMenu && (
            <button
              onClick={onMenu}
              style={{
                width: '32px', height: '32px', borderRadius: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)', border: 'none', cursor: 'pointer',
                display: 'none', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Menu size={16} color="#FFFFFF" />
            </button>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: theme.secondary }} />
            <span style={{ fontSize: '13px', fontWeight: '900', letterSpacing: '0.8px', color: '#FFFFFF', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>
              WAI México
            </span>
          </div>
          <div style={{ width: '1px', height: '14px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />
          <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: theme.secondary, letterSpacing: '1.2px', fontFamily: "'Inter', sans-serif" }}>
            Asamblea Nacional
          </span>
        </div>

        {/* Row 2: Slogan (grows horizontally to use the main content space) */}
        <span 
          style={{ 
            fontSize: '10.5px', 
            fontStyle: 'italic',
            fontWeight: '500',
            color: theme.textSecondary, 
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            maxWidth: '95%',
            opacity: 0.85,
            letterSpacing: '0.3px',
            fontFamily: "'Inter', sans-serif"
          }}
          title={slogan}
        >
          &ldquo;{slogan}&rdquo;
        </span>
      </div>

      {/* RIGHT: Compact Styled Event Date Badge & AI Agent Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            backgroundColor: 'rgba(212, 175, 55, 0.05)',
            border: `1px solid rgba(212, 175, 55, 0.25)`,
            borderRadius: '8px',
            padding: '8px 14px',
            boxShadow: '0 2px 10px rgba(212, 175, 55, 0.03)',
          }}
        >
          <Calendar size={13} color={theme.secondary} />
          <span style={{ fontSize: '10px', fontWeight: '850', color: theme.secondary, letterSpacing: '0.5px', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>
            24 de Septiembre, 2026
          </span>
        </div>

        {/* AI Agent Chat Toggle Button */}
        <button
          onClick={() => setShowChat(!showChat)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: showChat ? theme.secondary : 'rgba(255, 255, 255, 0.05)',
            border: `1.5px solid ${showChat ? theme.secondary : 'rgba(255, 255, 255, 0.1)'}`,
            borderRadius: '8px',
            padding: '8px 14px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            color: showChat ? '#020B1C' : '#FFFFFF',
          }}
          onMouseEnter={e => {
            if (!showChat) {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }
          }}
          onMouseLeave={e => {
            if (!showChat) {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }
          }}
        >
          <Sparkles size={14} fill={showChat ? '#020B1C' : theme.secondary} />
          <span style={{ fontSize: '10px', fontWeight: '850', letterSpacing: '0.5px', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>
            Asistente IA
          </span>
        </button>
      </div>

      {/* CHAT WINDOW OVERLAY */}
      {showChat && (
        <div 
          style={{
            position: 'fixed',
            top: '90px',
            right: '24px',
            width: '380px',
            height: '520px',
            zIndex: 11000,
            background: 'linear-gradient(135deg, rgba(10, 25, 47, 0.95) 0%, rgba(2, 11, 28, 0.98) 100%)',
            border: `1.5px solid ${theme.border}`,
            borderRadius: '16px',
            boxShadow: '0 20px 50px rgba(2, 11, 28, 0.85), 0 0 30px rgba(212, 175, 55, 0.05)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            fontFamily: "'Inter', sans-serif"
          }}
        >
          {/* Chat Header */}
          <div style={{
            padding: '16px',
            borderBottom: `1px solid rgba(255, 255, 255, 0.08)`,
            background: 'rgba(2, 11, 28, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bot size={18} color={theme.secondary} />
              <div>
                <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '800', color: '#FFFFFF' }}>WAI Conversacional</h4>
                <span style={{ fontSize: '9px', color: theme.secondary, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Google Gemini flash
                </span>
              </div>
            </div>
            <button 
              onClick={() => setShowChat(false)}
              style={{
                background: 'none', border: 'none', color: theme.textSecondary,
                cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px'
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Chat Messages */}
          <div 
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              backgroundColor: 'rgba(0,0,0,0.15)'
            }}
            className="no-scrollbar"
          >
            {chatMessages.map((msg, idx) => (
              <div 
                key={idx}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  backgroundColor: msg.sender === 'user' ? 'rgba(212, 175, 55, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${msg.sender === 'user' ? 'rgba(212, 175, 55, 0.25)' : 'rgba(255, 255, 255, 0.06)'}`,
                  borderRadius: '12px',
                  padding: '10px 14px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                <p style={{ margin: 0, fontSize: '12px', color: '#FFFFFF', lineHeight: 1.45 }}>
                  {msg.text}
                </p>
              </div>
            ))}
            {loading && (
              <div 
                style={{
                  alignSelf: 'flex-start',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Loader2 size={12} style={{ animation: 'spin 1s linear infinite' }} color={theme.textSecondary} />
                <span style={{ fontSize: '10px', color: theme.textSecondary }}>La IA está escribiendo...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form 
            onSubmit={handleSend}
            style={{
              padding: '12px 16px',
              borderTop: `1px solid rgba(255, 255, 255, 0.08)`,
              background: 'rgba(2, 11, 28, 0.4)',
              display: 'flex',
              gap: '8px'
            }}
          >
            <input 
              type="text"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              placeholder="Pregunta sobre la asamblea, mesas o WAI..."
              disabled={loading}
              style={{
                flex: 1,
                backgroundColor: '#020B1C',
                border: `1px solid ${theme.border}`,
                borderRadius: '8px',
                padding: '8px 12px',
                color: '#FFFFFF',
                fontSize: '12.5px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={e => e.currentTarget.style.borderColor = theme.secondary}
              onBlur={e => e.currentTarget.style.borderColor = theme.border}
            />
            <button
              type="submit"
              disabled={loading || !chatInput.trim()}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                backgroundColor: chatInput.trim() && !loading ? theme.secondary : 'rgba(255, 255, 255, 0.03)',
                color: chatInput.trim() && !loading ? '#020B1C' : theme.textSecondary,
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: chatInput.trim() && !loading ? 'pointer' : 'default',
                transition: 'all 0.2s'
              }}
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </header>
  );
};
