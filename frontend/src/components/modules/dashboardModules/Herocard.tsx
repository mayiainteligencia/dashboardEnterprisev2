import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Mic, MicOff, Sparkles, Bot } from 'lucide-react';
import { brandingConfig, type TemaBesco } from '../../../config/branding';
import { BrainCanvas } from './BrainCanvas';
import { useAIChat } from '../../../context/AIChatContext';
import { MarkdownRenderer } from '../../common/MarkdownRenderer';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  time: string;
};

// ── Navegación por voz (front-only, sin latencia) ──────────
const normalizar = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const NAV_VERBOS = ['ve al', 've a', 'ir al', 'ir a', 'entra al', 'entra a', 'llevame a', 'vamos a', 'muestrame', 'muestra', 'abre', 'abrir', 'ir', 'ver'];

// Devuelve el id de sección si el texto es un comando "ve a X", o null.
const matchSeccion = (texto: string, secciones: { id: string; titulo: string }[]): string | null => {
  const t = normalizar(texto);
  if (!NAV_VERBOS.some(v => t.includes(v))) return null;
  if (/(dashboard|inicio|principal|home|general)/.test(t)) return 'dashboard';
  if (/(tanque|tanques|telemetria|telemetría|sensor|fuga|combustible|bomba|bombas)/.test(t)) return 'tanques-telemetria';
  if (/(precio|precios|dinamico|dinámico|totem|tótem|competencia|margen)/.test(t)) return 'precios-dinamicos';
  if (/(seguridad|vms|camara|cámara|alpr|placa|matricula|matrícula|pista)/.test(t)) return 'seguridad-vms';
  if (/(suministro|compra|pipa|odoo|erp|tienda|estante|retail)/.test(t)) return 'cadena-suministro';
  if (/(flota|flotas|b2b|corporativo|odometro|odómetro|churn)/.test(t)) return 'flotas-corporativas';
  if (/(fidelizacion|fidelización|lealtad|pago|app|casillero|locker)/.test(t)) return 'fidelizacion-pagos';
  if (/(energia|energía|solar|bateria|batería|ev|cargador|sostenibilidad|bano|baño)/.test(t)) return 'hub-energia';
  if (/(mantenimiento|sdi|gemelo|digital|edge|servidor|hardware)/.test(t)) return 'mantenimiento-sdi';

  let best: { id: string; score: number } | null = null;
  for (const s of secciones) {
    const palabras = normalizar(s.titulo).split(/\s+/).filter(w => w.length > 3);
    const score = palabras.filter(w => t.includes(w)).length;
    if (score > 0 && (!best || score > best.score)) best = { id: s.id, score };
  }
  return best ? best.id : null;
};

interface HeroCardProps {
  tema?: TemaBesco;
  onNavigate?: (id: string) => void;
  secciones?: { id: string; titulo: string }[];
}

export const HeroCard: React.FC<HeroCardProps> = ({ tema, onNavigate, secciones = [] }) => {
  const { colores, ia, empresa } = brandingConfig;
  const { messages: globalMessages, loading: globalLoading, sendMessage: sendGlobalLLMMessage } = useAIChat();
  const acc = tema ? tema.acento : colores.primario;
  const accDark = tema ? tema.acentoOscuro : colores.primarioOscuro;
  const sobre = tema ? tema.sobreAcento : '#ffffff';
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const listeningRef = useRef(false);
  const seccionesRef = useRef(secciones);
  const onNavigateRef = useRef(onNavigate);

  useEffect(() => { listeningRef.current = isListening; }, [isListening]);
  useEffect(() => { seccionesRef.current = secciones; onNavigateRef.current = onNavigate; }, [secciones, onNavigate]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [globalMessages, globalLoading]);

  // Inicializar Web Speech API
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'es-ES';

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPart + ' ';
          } else {
            interimTranscript += transcriptPart;
          }
        }

        const currentText = finalTranscript || interimTranscript;

        // Navegación por voz (front-only): "ve a <sección>" → navega, sin backend
        if (finalTranscript) {
          const destino = matchSeccion(currentText, seccionesRef.current);
          if (destino && onNavigateRef.current) {
            listeningRef.current = false;
            setIsListening(false);
            try { recognitionRef.current?.abort(); } catch { /* nada */ }
            onNavigateRef.current(destino);
            handleCloseModal();
            return;
          }
        }

        // Detectar palabras clave para enviar
        const textLower = currentText.toLowerCase().trim();
        const hasKeyword = textLower.includes('mayia') || 
                          textLower.includes('enviar') || 
                          textLower.includes('envía') ||
                          textLower.includes('manda');
        
        if (hasKeyword && finalTranscript) {
          // Remover la palabra clave del mensaje
          let cleanedText = currentText
            .replace(/\bmayia\b/gi, '')
            .replace(/\benviar\b/gi, '')
            .replace(/\benvía\b/gi, '')
            .replace(/\bmanda\b/gi, '')
            .trim();
          
          setInput(cleanedText);
          
          // Detener el reconocimiento y enviar
          setIsListening(false);
          if (recognitionRef.current) {
            recognitionRef.current.stop();
          }
          
          // Enviar el mensaje después de un pequeño delay
          setTimeout(() => {
            if (cleanedText.trim()) {
              sendMessageWithText(cleanedText);
            }
          }, 300);
        } else {
          setInput(currentText);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('[voz] error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        if (listeningRef.current) {
          try { recognitionRef.current.start(); } catch { /* ya iniciado */ }
        }
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleMicClick = () => {
    setShowModal(true);
    if (!recognitionRef.current) {
      alert('Tu navegador no soporta reconocimiento de voz. Usa Google Chrome o Edge.');
      return;
    }
    setInput('');
    listeningRef.current = true;
    setIsListening(true);
    try { recognitionRef.current.abort(); } catch { /* nada */ }
    setTimeout(() => {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('[voz] error al iniciar:', error);
      }
    }, 300);
  };

  const toggleListening = async () => {
    if (isListening) {
      setIsListening(false);
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (input.trim()) {
        setTimeout(() => sendMessage(), 500);
      }
    } else {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setIsListening(true);
        setInput('');
        
        if (recognitionRef.current) {
          try {
            recognitionRef.current.start();
          } catch (error) {
            recognitionRef.current.stop();
            setTimeout(() => {
              recognitionRef.current.start();
            }, 100);
          }
        }
      } catch (error) {
        console.error('Error de permisos:', error);
        alert('Por favor permite el acceso al micrófono en el navegador');
      }
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || globalLoading) return;
    await sendMessageWithText(input);
  };

  const sendMessageWithText = async (messageText: string) => {
    if (!messageText.trim() || globalLoading) return;

    if (onNavigate && secciones.length) {
      const destino = matchSeccion(messageText, secciones);
      if (destino) {
        onNavigate(destino);
        handleCloseModal();
        return;
      }
    }

    setInput('');
    await sendGlobalLLMMessage(messageText);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    listeningRef.current = false;
    setIsListening(false);
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch { /* nada */ }
    }
  };

  return (
    <>
      <div
        className="group relative transition-all duration-500"
        onClick={handleMicClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: `linear-gradient(135deg, rgba(211, 47, 47, 0.08) 0%, rgba(15, 23, 42, 0.06) 100%)`,
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '20px 24px',
          border: `2px solid rgba(211, 47, 47, 0.25)`,
          position: 'relative',
          overflow: 'hidden',
          minHeight: '170px',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          boxShadow: '0 8px 30px rgba(211, 47, 47, 0.08)',
        }}
      >
        {/* Resplandor de fondo */}
        <div 
          style={{ 
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          <div 
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '650px',
              height: '650px',
              opacity: isHovered ? 0.35 : 0.15,
              transition: 'opacity 700ms ease-in-out',
              filter: 'blur(90px)',
              background: acc,
              borderRadius: '50%',
            }}
          />
        </div>

        {/* Contenido principal */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Núcleo IA 3D animado */}
          <div style={{ width: '220px', marginBottom: '6px' }}>
            <BrainCanvas accent={acc} height={180} />
          </div>

          {/* Title */}
          <h2
            style={{
              fontSize: '20px',
              fontWeight: '800',
              color: acc,
              marginBottom: '6px',
              letterSpacing: '-0.3px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Sparkles size={20} color={acc} />
            Asistente Inteligente {empresa.nombre}
          </h2>

          {/* Instrucción condensada */}
          <p
            style={{
              fontSize: '12.5px',
              color: colores.textoMedio,
              margin: '0 0 10px 0',
              maxWidth: '380px',
              lineHeight: 1.4,
            }}
          >
            Pulsa para hablar con tu asesor IA · di <strong style={{ color: acc, fontStyle: 'normal' }}>"MAYIA"</strong> para enviar
          </p>

          {/* Badge de estado en vivo */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 12px',
            borderRadius: '999px',
            backgroundColor: `${acc}15`,
            border: `1px solid ${acc}40`,
            fontSize: '11px',
            color: acc,
            fontWeight: '600',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
            Copilot Gas Station Inteligente 4.0 Activo
          </div>
        </div>
      </div>

      {/* Modal de Chat */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            animation: 'fadeIn 0.3s ease',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseModal();
            }
          }}
        >
          <div
            style={{
              width: '92%',
              maxWidth: '640px',
              height: '82vh',
              maxHeight: '720px',
              backgroundColor: colores.fondoSecundario,
              borderRadius: '24px',
              boxShadow: '0 25px 70px rgba(0, 0, 0, 0.4)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              animation: 'slideUp 0.3s ease',
              border: `1px solid ${colores.borde}`,
            }}
          >
            {/* Header del Modal */}
            <div
              style={{
                padding: '20px 24px',
                background: `linear-gradient(135deg, ${colores.primario} 0%, ${colores.secundario} 100%)`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '14px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Bot size={26} color="#FFFFFF" />
                </div>
                <div>
                  <div style={{ fontWeight: '700', color: '#FFFFFF', fontSize: '18px' }}>
                    {ia.nombre} · Asesor IA Gas Station
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.85)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: isListening ? '#F59E0B' : '#10B981' }} />
                    {isListening ? 'Escuchando tu voz...' : 'Telemetría IoT, Precios Dinámicos & Flotas'}
                  </div>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={22} color="#FFFFFF" />
              </button>
            </div>

            {/* Lista de Mensajes */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                backgroundColor: colores.fondoPrincipal,
              }}
            >
              {globalMessages.map((m) => (
                <div
                  key={m.id}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '82%',
                    flexDirection: m.role === 'user' ? 'row-reverse' : 'row',
                  }}
                >
                  {m.role === 'assistant' && (
                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '10px',
                        background: `linear-gradient(135deg, ${colores.primario} 0%, ${colores.secundario} 100%)`,
                        color: '#FFFFFF',
                        fontSize: '12px',
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
                        backgroundColor: m.role === 'user' ? colores.primario : colores.fondoTerciario,
                        background: m.role === 'user' ? `linear-gradient(135deg, ${colores.primario} 0%, ${colores.primarioOscuro} 100%)` : colores.fondoTerciario,
                        color: m.role === 'user' ? '#FFFFFF' : colores.textoClaro,
                        padding: '12px 16px',
                        borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                        border: m.role === 'user' ? 'none' : `1px solid ${colores.borde}`,
                      }}
                    >
                      {m.content ? (
                        <MarkdownRenderer content={m.content} isUser={m.role === 'user'} accentColor={colores.primario} />
                      ) : (
                        globalLoading && m.role === 'assistant' ? 'MAYIA analizando consulta...' : ''
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        color: colores.textoMedio,
                        marginTop: '4px',
                        textAlign: m.role === 'user' ? 'right' : 'left',
                        padding: '0 4px',
                      }}
                    >
                      {m.timestamp} {m.moduleContext ? `• ${m.moduleContext}` : ''}
                    </div>
                  </div>
                </div>
              ))}

              {globalLoading && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '10px',
                      background: colores.primario,
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                    }}
                  >
                    AI
                  </div>
                  <div
                    style={{
                      backgroundColor: colores.fondoTerciario,
                      padding: '12px 16px',
                      borderRadius: '16px 16px 16px 4px',
                      display: 'flex',
                      gap: '6px',
                    }}
                  >
                    <span style={{ fontSize: '13px', color: colores.textoMedio }}>MAYIA procesando datos Gas Station...</span>
                  </div>
                </div>
              )}

              <div ref={endRef} />
            </div>

            {/* Input por voz y texto */}
            <div
              style={{
                padding: '16px 20px',
                backgroundColor: colores.fondoSecundario,
                borderTop: `1px solid ${colores.borde}`,
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
              }}
            >
              <button
                onClick={toggleListening}
                title={isListening ? 'Detener micrófono' : 'Hablar por micrófono'}
                className={isListening ? 'pulse-red' : 'fspm-btn'}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  border: 'none',
                  background: isListening
                    ? `linear-gradient(135deg, ${colores.peligro} 0%, #B91C1C 100%)`
                    : `linear-gradient(135deg, ${colores.primario} 0%, ${colores.secundario} 100%)`,
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.25s',
                  boxShadow: isListening ? '0 0 20px rgba(5, 150, 105, 0.6)' : '0 4px 12px rgba(5, 150, 105, 0.3)',
                }}
              >
                {isListening ? (
                  <div className="voice-eq">
                    <div className="voice-bar" />
                    <div className="voice-bar" />
                    <div className="voice-bar" />
                    <div className="voice-bar" />
                  </div>
                ) : (
                  <Mic size={22} />
                )}
              </button>

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder={isListening ? 'Escuchando... Di "MAYIA" o una orden de navegación' : 'Pregunta sobre tanques, precios o di "ve a seguridad"...'}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: `1px solid ${colores.borde}`,
                  backgroundColor: colores.fondoPrincipal,
                  color: colores.textoClaro,
                  outline: 'none',
                  fontSize: '14px',
                }}
              />

              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                style={{
                  padding: '12px 18px',
                  borderRadius: '12px',
                  border: 'none',
                  background: loading || !input.trim() ? colores.fondoTerciario : colores.primario,
                  color: loading || !input.trim() ? colores.textoMedio : '#FFFFFF',
                  cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '600',
                  gap: '6px',
                  transition: 'all 0.2s',
                }}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};