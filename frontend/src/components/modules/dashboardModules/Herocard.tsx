
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Mic, MicOff, Sparkles } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';
import { BrainCanvas } from './BrainCanvas';

// Tema opcional (color de acento). Definido local para no depender de un export
// específico de branding: así HeroCard es genérico y copiable entre ramas.
type TemaBesco = { acento: string; acentoOscuro: string; sobreAcento: string };

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  time: string;
};

// ── Navegación por voz (front-only, sin backend) ──────────
const normalizar = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const NAV_VERBOS = ['ve al', 've a', 'ir al', 'ir a', 'entra al', 'entra a', 'llevame a', 'vamos a', 'muestrame', 'muestra', 'abre', 'abrir', 'ir'];
// Devuelve el id de sección si el texto es un comando "ve a X", o null.
const matchSeccion = (texto: string, secciones: { id: string; titulo: string }[]): string | null => {
  const t = normalizar(texto);
  if (!NAV_VERBOS.some(v => t.includes(v))) return null;
  if (/(dashboard|inicio|principal|home|general)/.test(t)) return 'dashboard';
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
  const acc = tema ? tema.acento : '#374151';
  const accDark = tema ? tema.acentoOscuro : '#1F2937';
  const sobre = tema ? tema.sobreAcento : '#ffffff';
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `¡Hola! Soy ${ia.nombre}, tu asistente de ${empresa.nombre}. ¿En qué puedo ayudarte?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);
  // Refs para que el reconocimiento (creado una sola vez) siempre lea lo último
  const listeningRef = useRef(false);
  const seccionesRef = useRef(secciones);
  const onNavigateRef = useRef(onNavigate);
  useEffect(() => { listeningRef.current = isListening; }, [isListening]);
  useEffect(() => { seccionesRef.current = secciones; onNavigateRef.current = onNavigate; }, [secciones, onNavigate]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

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
        console.log('[voz] transcripción:', currentText, finalTranscript ? '(final)' : '(parcial)');

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
              // Simular el envío
              const messageToSend = cleanedText;
              sendMessageWithText(messageToSend);
            }
          }, 300);
        } else {
          setInput(currentText);
        }
      };

      recognitionRef.current.onstart = () => console.log('[voz] iniciado, escuchando…');
      recognitionRef.current.onaudiostart = () => console.log('[voz] micrófono capturando audio');
      recognitionRef.current.onsoundstart = () => console.log('[voz] hay sonido');
      recognitionRef.current.onspeechstart = () => console.log('[voz] detectó voz');
      recognitionRef.current.onspeechend = () => console.log('[voz] fin de voz');
      recognitionRef.current.onnomatch = () => console.log('[voz] no coincidió');
      recognitionRef.current.onerror = (event: any) => {
        console.error('[voz] error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        console.log('[voz] terminó; reiniciar?', listeningRef.current);
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
      alert('Tu navegador no soporta reconocimiento de voz. Usa Chrome o Edge.');
      return;
    }
    setInput('');
    listeningRef.current = true;   // sincrónico: evita que onend reinicie fuera de tiempo
    setIsListening(true);
    // abort() resetea cualquier sesión previa colgada antes de arrancar de nuevo
    try { recognitionRef.current.abort(); } catch { /* nada */ }
    // SpeechRecognition pide su propio permiso de micrófono; no llamamos getUserMedia aparte
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
            console.error('Error al iniciar:', error);
            // Si ya está iniciado, reiniciar
            recognitionRef.current.stop();
            setTimeout(() => {
              recognitionRef.current.start();
            }, 100);
          }
        }
      } catch (error) {
        console.error('Error de permisos:', error);
        alert('Por favor permite el acceso al micrófono');
      }
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    await sendMessageWithText(input);
  };

  const sendMessageWithText = async (messageText: string) => {
    if (!messageText.trim() || loading) return;

    const now = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const userMessage: ChatMessage = {
      role: 'user',
      content: messageText,
      time: now,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Modo navegación por voz: intenta navegar; si no, responde local (sin backend)
    if (onNavigate && secciones.length) {
      const destino = matchSeccion(messageText, secciones);
      if (destino) {
        onNavigate(destino);
        handleCloseModal();
        return;
      }
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: `Puedo llevarte a una sección. Di o escribe, por ejemplo: "ve a ${secciones[0].titulo}".`,
        time: now,
      }]);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mensaje: userMessage.content,
          departamento: 'General',
        }),
      });

      if (!response.ok) throw new Error('Error IA');

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.respuesta,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'No fue posible conectar con el asistente. Por favor intenta de nuevo.',
          time: now,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    listeningRef.current = false;   // sincrónico: corta el auto-reinicio de onend
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
          background: `linear-gradient(135deg, ${acc}20 0%, ${accDark}20 100%)`,
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '18px',
          border: `2px solid ${acc}40`,
          position: 'relative',
          overflow: 'hidden',
          minHeight: '160px',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
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
              width: '700px',
              height: '700px',
              opacity: isHovered ? 0.7 : 0,
              transition: 'opacity 700ms ease-in-out',
              filter: 'blur(100px)',
              background: acc,
              borderRadius: '50%',
            }}
          />
        </div>

        {/* Animated gradient blobs */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '400px',
            height: '400px',
            background: `radial-gradient(circle, ${acc}40 0%, transparent 70%)`,
            filter: 'blur(60px)',
            animation: 'float 6s ease-in-out infinite',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-20%',
            left: '-10%',
            width: '350px',
            height: '350px',
            background: `radial-gradient(circle, ${accDark}40 0%, transparent 70%)`,
            filter: 'blur(60px)',
            animation: 'float 8s ease-in-out infinite reverse',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Contenido principal con z-index más alto */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Núcleo IA 3D animado */}
          <div style={{ width: '240px', marginBottom: '8px' }}>
            <BrainCanvas accent={acc} height={200} />
          </div>

          {/* Title */}
          <h2
            style={{
              fontSize: '19px',
              fontWeight: '700',
              color: acc,
              marginBottom: '6px',
              letterSpacing: '-0.4px',
            }}
          >
            Asistente Inteligente {empresa.nombre}
          </h2>

          {/* Instrucción condensada */}
          <p
            style={{
              fontSize: '11.5px',
              color: colores.textoMedio,
              margin: '0 0 12px 0',
              maxWidth: '320px',
              lineHeight: 1.4,
            }}
          >
            Pulsa para hablar con tu asesor IA · di <strong style={{ color: acc, fontStyle: 'normal' }}>"MAYIA"</strong> para enviar
          </p>
        </div>

        <style>
          {`
            @keyframes float {
              0%, 100% { transform: translate(0, 0) rotate(0deg); }
              33% { transform: translate(30px, -20px) rotate(5deg); }
              66% { transform: translate(-20px, 20px) rotate(-5deg); }
            }
          `}
        </style>
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
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
              width: '90%',
              maxWidth: '600px',
              height: '80vh',
              maxHeight: '700px',
              backgroundColor: colores.fondoSecundario,
              borderRadius: '24px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              animation: 'slideUp 0.3s ease',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '24px',
                background: `linear-gradient(135deg, ${acc} 0%, ${accDark} 100%)`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Sparkles size={24} color={sobre} />
                </div>
                <div>
                  <div style={{ fontWeight: '600', color: sobre, fontSize: '18px' }}>
                    {ia.nombre}
                  </div>
                  <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.8)' }}>
                    {isListening ? 'Escuchando...' : 'Asesor IA'}
                  </div>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={24} color={sobre} />
              </button>
            </div>

            {/* Mensajes */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                backgroundColor: colores.fondoPrincipal,
              }}
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '75%',
                    animation: 'fadeIn 0.3s ease',
                  }}
                >
                  {m.role === 'assistant' && (
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${acc} 0%, ${accDark} 100%)`,
                        color: sobre,
                        fontSize: '14px',
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
                        backgroundColor: m.role === 'user' ? acc : colores.fondoTerciario,
                        background: m.role === 'user' ? `linear-gradient(135deg, ${acc} 0%, ${accDark} 100%)` : colores.fondoTerciario,
                        color: m.role === 'user' ? sobre : colores.textoClaro,
                        padding: '14px 18px',
                        borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <div style={{ fontSize: '15px', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                        {m.content}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        color: colores.textoMedio,
                        marginTop: '6px',
                        textAlign: m.role === 'user' ? 'right' : 'left',
                      }}
                    >
                      {m.time}
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${acc} 0%, ${accDark} 100%)`,
                      color: sobre,
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
                      padding: '14px 18px',
                      borderRadius: '18px 18px 18px 4px',
                      display: 'flex',
                      gap: '6px',
                    }}
                  >
                    <div className="typing-dot" />
                    <div className="typing-dot" style={{ animationDelay: '0.2s' }} />
                    <div className="typing-dot" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}

              <div ref={endRef} />
            </div>

            {/* Input */}
            <div
              style={{
                padding: '20px 24px',
                backgroundColor: colores.fondoSecundario,
                borderTop: `1px solid ${colores.borde}`,
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
              }}
            >
              <button
                onClick={toggleListening}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: 'none',
                  background: isListening
                    ? `linear-gradient(135deg, ${colores.peligro} 0%, ${colores.advertencia} 100%)`
                    : `linear-gradient(135deg, ${acc} 0%, ${accDark} 100%)`,
                  color: sobre,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                  animation: isListening ? 'pulse 1.5s infinite' : 'none',
                }}
              >
                {isListening ? <MicOff size={24} /> : <Mic size={24} />}
              </button>

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder={isListening ? 'Escuchando... (Di "MAYIA" para enviar)' : 'Escribe o habla...'}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '14px 18px',
                  borderRadius: '14px',
                  border: `1px solid ${colores.borde}`,
                  backgroundColor: colores.fondoPrincipal,
                  color: colores.textoClaro,
                  outline: 'none',
                  fontSize: '15px',
                }}
              />

              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                style={{
                  padding: '14px 20px',
                  borderRadius: '14px',
                  border: 'none',
                  background: loading || !input.trim() ? colores.fondoTerciario : `linear-gradient(135deg, ${acc} 0%, ${accDark} 100%)`,
                  color: loading || !input.trim() ? colores.textoMedio : sobre,
                  cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                }}
              >
                <Send size={20} />
              </button>
            </div>
          </div>

          <style>
            {`
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }

              @keyframes slideUp {
                from {
                  opacity: 0;
                  transform: translateY(30px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }

              @keyframes pulse {
                0%, 100% { box-shadow: 0 0 0 0 ${colores.peligro}40; }
                50% { box-shadow: 0 0 0 20px ${colores.peligro}00; }
              }

              .typing-dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: ${colores.textoMedio};
                animation: typing 1.4s infinite;
              }

              @keyframes typing {
                0%, 60%, 100% { transform: translateY(0); }
                30% { transform: translateY(-10px); }
              }
            `}
          </style>
        </div>
      )}
    </>
  );
};
