import React, { useState, useEffect, useRef } from 'react';
import {
  Atom, BookOpen, Users, Shield, FlaskConical, FileText,
  TrendingUp, TrendingDown, Dna, AlertTriangle, CheckCircle,
  Clock, ArrowRight, Zap, BarChart3, Sparkles, Mic, X, Send,
} from 'lucide-react';
import { brandingConfig } from '../config/branding';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

interface DashboardProps {
  onNavigate?: (section: string) => void;
}

interface ChatMsg {
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

const pipelineData = [
  { name: 'PB-1203', afinidad: 9.1, admet: 8.5 },
  { name: 'PB-0892', afinidad: 8.5, admet: 7.9 },
  { name: 'PB-0451', afinidad: 7.8, admet: 9.2 },
  { name: 'PB-2847', afinidad: 8.2, admet: 6.8 },
  { name: 'PB-1190', afinidad: 9.5, admet: 8.1 },
];

const reportesData = [
  { name: 'Completos', value: 14, color: '#10B981' },
  { name: 'Borrador', value: 5, color: '#64748B' },
  { name: 'Revisión', value: 3, color: '#F59E0B' },
];

const regulacionData = [
  { subject: 'ICH M7', valor: 95 },
  { subject: 'FDA OTC', valor: 88 },
  { subject: 'COFEPRIS', valor: 92 },
  { subject: 'EMA ADMET', valor: 85 },
  { subject: 'Estabilidad', valor: 90 },
];

const prospeccionData = [
  { name: 'Trim 1', valor: 120 },
  { name: 'Trim 2', valor: 210 },
  { name: 'Trim 3', valor: 290 },
  { name: 'Trim 4', valor: 420 },
];

const patentesData = [
  { year: '22', activas: 3, pendientes: 2 },
  { year: '23', activas: 5, pendientes: 3 },
  { year: '24', activas: 8, pendientes: 4 },
];

const kpis = [
  { label: 'Moléculas Pipeline', val: '47', trend: '+8%', up: true, col: '#7C3AED', icon: Atom },
  { label: 'Proyectos I+D', val: '12', trend: '+2', up: true, col: '#0EA5E9', icon: Dna },
  { label: 'Alumnos Academia', val: '384', trend: '+7.3%', up: true, col: '#14B8A6', icon: BookOpen },
  { label: 'Leads Pharma', val: '31', trend: '+14%', up: true, col: '#10B981', icon: Users },
  { label: 'Patentes Activas', val: '8', trend: '+1', up: true, col: '#F59E0B', icon: Shield },
  { label: 'Alertas Reguladoras', val: '5', trend: '-2', up: false, col: '#EF4444', icon: FlaskConical },
];

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { colores } = brandingConfig;
  const [modalOpen, setModalOpen] = useState(false);
  const [isVoiceCardHovered, setIsVoiceCardHovered] = useState(false);
  const [escuchando, setEscuchando] = useState(false);
  const [loadingIA, setLoadingIA] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [chatMsgs, setChatMsgs] = useState<ChatMsg[]>([
    { role: 'assistant', content: '¡Hola! Soy tu asistente de voz MAYIA para Pharbiois. Puedes consultarme por voz sobre el pipeline de moléculas, alertas regulatorias o tus leads comerciales.', time: '10:30' }
  ]);
  const [toast, setToast] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMsgs, escuchando, loadingIA]);

  // Inicializar Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition && !recognitionRef.current) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'es-MX';

      rec.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const currentText = finalTranscript || interimTranscript;
        const textLower = currentText.toLowerCase().trim();
        
        // Detectar palabras clave para enviar automáticamente
        const hasKeyword = textLower.includes('mayia') || 
                           textLower.includes('enviar') || 
                           textLower.includes('envía') ||
                           textLower.includes('manda');

        if (hasKeyword && finalTranscript) {
          const cleanedText = currentText
            .replace(/\bmayia\b/gi, '')
            .replace(/\benviar\b/gi, '')
            .replace(/\benvía\b/gi, '')
            .replace(/\bmanda\b/gi, '')
            .trim();
          
          setMensaje(cleanedText);
          setEscuchando(false);
          rec.stop();
          
          setTimeout(() => {
            if (cleanedText.trim()) {
              enviarMensaje(cleanedText);
            }
          }, 300);
        } else {
          setMensaje(currentText);
        }
      };

      rec.onerror = (e: any) => {
        console.error('Speech error:', e.error);
        setEscuchando(false);
      };

      rec.onend = () => {
        // Mantener escuchando si el estado sigue activo
        if (escuchando && rec) {
          try {
            rec.start();
          } catch (err) {
            console.error(err);
          }
        }
      };

      recognitionRef.current = rec;
    }
  }, [escuchando]);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const iniciarEscucha = async () => {
    if (escuchando || loadingIA) return;
    
    try {
      // Solicitar permisos de micrófono
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMensaje('');
      setEscuchando(true);
      triggerToast('Escuchando tu voz... (Di "MAYIA" al final para enviar)');
      
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          // Si ya estaba activo, detener y reiniciar
          recognitionRef.current.stop();
          setTimeout(() => recognitionRef.current.start(), 100);
        }
      } else {
        // Fallback simulación si SpeechRecognition no es soportado
        setTimeout(() => {
          const frases = [
            '¿Cómo va el pipeline de la molécula PB-1203?',
            'Genera un reporte ADMET rápido para el proyecto de Oncología',
            '¿Tenemos alguna alerta crítica de nitrosaminas en COFEPRIS?',
            '¿Cuántos alumnos se han registrado en el diplomado de Drug Discovery?'
          ];
          const frase = frases[Math.floor(Math.random() * frases.length)];
          setEscuchando(false);
          enviarMensaje(frase);
        }, 3000);
      }
    } catch (err) {
      console.error('Error micrófono:', err);
      triggerToast('Permiso de micrófono denegado. Escribe tu consulta.');
    }
  };

  const detenerEscucha = () => {
    setEscuchando(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const enviarMensaje = async (texto: string) => {
    if (!texto.trim()) return;
    const hora = new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
    setChatMsgs(prev => [...prev, { role: 'user', content: texto, time: hora }]);
    setMensaje('');
    setLoadingIA(true);

    try {
      const response = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mensaje: texto,
          departamento: 'General'
        })
      });

      if (!response.ok) throw new Error('Error al conectar con backend');

      const data = await response.json();
      setChatMsgs(prev => [...prev, {
        role: 'assistant',
        content: data.respuesta,
        time: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (e) {
      console.warn('Conexión backend fallida, usando fallback de IA local...', e);
      // Fallback local robusto sobre Pharbiois
      setTimeout(() => {
        let resp = 'Procesando consulta regulatoria y científica en Pharbiois…';
        const t = texto.toLowerCase();
        if (t.includes('pb-1203') || t.includes('pipeline') || t.includes('molécula')) {
          resp = 'La molécula PB-1203 está en etapa "Candidata" con un Score ADMET de 0.91 y bajo riesgo de toxicidad. Puedes consultarla en el Drug Discovery Pipeline.';
        } else if (t.includes('reporte') || t.includes('oncología') || t.includes('admet')) {
          resp = 'El reporte ADMET para Oncología está redactado y listo en borrador en el Copilot de Reportes. Puedes ir allí para descargarlo.';
        } else if (t.includes('alerta') || t.includes('nitrosamina') || t.includes('cofepris')) {
          resp = 'Alerta crítica de impurezas en PB-2847 detectada en Regulatory Intelligence. Se superó el umbral TTC de nitrosaminas (ICH M7).';
        } else if (t.includes('alumno') || t.includes('diplomado') || t.includes('registro') || t.includes('cursos')) {
          resp = 'En la Academia Inteligente contamos con 92 alumnos registrados en el diplomado de Drug Discovery con IA (tasa de avance de 78%).';
        } else {
          resp = 'He recibido tu mensaje científico: "' + texto + '". Te sugiero consultar el módulo respectivo o reformular tu consulta para análisis de la IA.';
        }
        setChatMsgs(prev => [...prev, { role: 'assistant', content: resp, time: hora }]);
      }, 1500);
    } finally {
      setLoadingIA(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(14,165,233,0.06) 0%, rgba(124,58,237,0.06) 100%)',
        border: '1px solid rgba(14,165,233,0.15)',
        borderRadius: '24px', padding: '24px 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Dna size={18} color="#0EA5E9" />
            <span style={{ fontSize: '11px', color: '#0EA5E9', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Pharbiois × MAYIA — AI BioPharma Command Center
            </span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
            Bienvenido al Command Center
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Panel de control unificado y acceso a todos los módulos científicos de Pharbiois.
          </div>
        </div>

        {/* Logo de MAYIA en fondo medio negro */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.85)',
          padding: '10px 18px',
          borderRadius: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          flexShrink: 0,
        }}>
          <img
            src="/assets/logosNativos/mayiaLogoBlanco.png"
            alt="MAYIA"
            style={{
              height: '32px',
              width: 'auto',
              objectFit: 'contain',
            }}
          />
        </div>
      </div>

      {/* Panel Principal Asimétrico de Módulos (Grilla de 12 Columnas) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
        
        {/* TARJETA 1: Pipeline de Descubrimiento de Fármacos (span 4) */}
        <div className="grid-card" style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '24px',
          padding: '22px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '380px',
          boxShadow: colores.sombra,
          gridColumn: 'span 4',
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(124,58,237,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Atom size={20} color="#7C3AED" />
              </div>
              <span style={{ fontSize: '11px', color: '#7C3AED', fontWeight: '700', background: 'rgba(124,58,237,0.1)', padding: '3px 8px', borderRadius: '8px' }}>
                Preclínica · 47 Moléculas
              </span>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', margin: '0 0 6px 0' }}>
              Pipeline de Descubrimiento
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 10px 0', lineHeight: 1.4 }}>
              Diseño, síntesis y validación in silico de compuestos químicos mediante predicciones de afinidad.
            </p>

            {/* Gráfico de barras de afinidad */}
            <div style={{ height: '110px', background: '#F8FAFC', borderRadius: '12px', padding: '10px 8px 0 0', border: '1px solid var(--border)', marginBottom: '8px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pipelineData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 8, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 8, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 9, borderRadius: 8 }} />
                  <Bar dataKey="afinidad" radius={[3, 3, 0, 0]}>
                    {pipelineData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? colores.primario : colores.acento} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <button className="btn-secondary" style={{ marginTop: '4px', justifyContent: 'center' }} onClick={() => onNavigate?.('pipeline')}>
            Acceder al Pipeline <ArrowRight size={13} style={{ marginLeft: '4px' }} />
          </button>
        </div>

        {/* TARJETA 2: Plataforma de Voz - CENTRADA EN LA PRIMERA FILA (span 4) */}
        <div className="grid-card"
          onMouseEnter={() => setIsVoiceCardHovered(true)}
          onMouseLeave={() => setIsVoiceCardHovered(false)}
          style={{
            background: `linear-gradient(135deg, ${colores.primario}15 0%, ${colores.secundario}15 100%)`,
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '24px',
            border: `2px solid ${colores.primario}30`,
            position: 'relative',
            overflow: 'hidden',
            minHeight: '380px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: colores.sombraAzul,
            transition: 'all 0.3s ease',
            gridColumn: 'span 4',
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
                width: '600px',
                height: '600px',
                opacity: isVoiceCardHovered ? 0.7 : 0.3,
                transition: 'opacity 700ms ease-in-out',
                filter: 'blur(100px)',
                background: `radial-gradient(circle, ${colores.primario}30 0%, ${colores.secundario}20 70%, transparent 100%)`,
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
              width: '250px',
              height: '250px',
              background: `radial-gradient(circle, ${colores.primario}25 0%, transparent 70%)`,
              filter: 'blur(40px)',
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
              width: '220px',
              height: '220px',
              background: `radial-gradient(circle, ${colores.secundario}25 0%, transparent 70%)`,
              filter: 'blur(40px)',
              animation: 'float 8s ease-in-out infinite reverse',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* Contenido principal con z-index más alto */}
          <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'space-between', width: '100%' }}>
            
            {/* 3D Glassmorphic shape */}
            <div
              style={{
                position: 'relative',
                width: '160px',
                height: '110px',
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: `${20 + i * 5}px`,
                    top: '5px',
                    width: '110px',
                    height: '90px',
                    background: `linear-gradient(135deg, 
                      ${colores.primario}${Math.max(20 - i * 2, 5).toString(16).padStart(2, '0')} 0%, 
                      ${colores.secundario}${Math.max(20 - i * 2, 5).toString(16).padStart(2, '0')} 100%)`,
                    backdropFilter: 'blur(10px)',
                    borderRadius: '28px',
                    border: `1px solid ${colores.primario}${Math.max(40 - i * 5, 10).toString(16).padStart(2, '0')}`,
                    transform: `perspective(800px) rotateY(${-15 + i * 4}deg) translateZ(${i * 10}px)`,
                    boxShadow: `0 ${8 + i * 4}px ${24 + i * 8}px rgba(0,0,0,0.15)`,
                    transition: 'all 0.3s ease',
                    pointerEvents: 'none',
                  }}
                />
              ))}

              {/* DNA Icon floating on top */}
              <div style={{
                position: 'absolute',
                zIndex: 15,
                transform: 'translateZ(50px)',
                filter: `drop-shadow(0 6px 12px ${colores.primario}40)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'float 4s ease-in-out infinite',
              }}>
                <Dna size={36} color={colores.primario} />
              </div>
            </div>

            <div style={{ margin: '15px 0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: colores.textoClaro, fontFamily: 'Outfit, sans-serif', lineHeight: 1.3, marginBottom: '8px' }}>
                Plataforma Inteligente Para Pharbiois
              </h3>
              <p style={{ fontSize: '12px', color: colores.textoMedio, margin: '0 0 4px 0' }}>
                Pulsa para comunicarte con tu asesor IA por voz
              </p>
              <p style={{ fontSize: '11px', color: colores.textoOscuro, fontStyle: 'italic', margin: 0 }}>
                Di "MAYIA" al final para enviar tu mensaje
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: colores.textoMedio, marginBottom: '12px' }}>
              <span>Potenciado por</span>
              <img
                src="/assets/logosNativos/mayiaLogoBlanco.png"
                alt="MAYIA"
                style={{
                  height: '14px',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'brightness(0) opacity(0.8)',
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = document.createElement('span');
                  fallback.textContent = 'MAYIA®';
                  fallback.style.fontWeight = '700';
                  fallback.style.color = colores.primario;
                  target.parentElement?.appendChild(fallback);
                }}
              />
            </div>

            {/* Botón de micrófono redondo */}
            <button
              onClick={() => { setModalOpen(true); iniciarEscucha(); }}
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                border: `1.5px solid ${colores.primario}40`,
                background: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                zIndex: 20,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = `${colores.primario}15`; e.currentTarget.style.borderColor = colores.primario; e.currentTarget.style.transform = 'scale(1.05)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = `${colores.primario}40`; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <Mic size={18} color={colores.primario} />
            </button>
          </div>
        </div>

        {/* TARJETA 3: Copiloto de Reportes Científicos (span 4) */}
        <div className="grid-card" style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '24px',
          padding: '22px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '380px',
          boxShadow: colores.sombra,
          gridColumn: 'span 4',
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(14,165,233,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={20} color="#0EA5E9" />
              </div>
              <span style={{ fontSize: '11px', color: '#0EA5E9', fontWeight: '700', background: 'rgba(14,165,233,0.1)', padding: '3px 8px', borderRadius: '8px' }}>
                Borradores · 5 Plantillas
              </span>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', margin: '0 0 6px 0' }}>
              Copiloto de Reportes Científicos
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 14px 0', lineHeight: 1.4 }}>
              Asistente inteligente para la redacción y exportación automatizada de reportes toxicológicos y expedientes científicos.
            </p>

            {/* Gráfico circular de estado de reportes */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', height: '90px', background: '#F8FAFC', borderRadius: '12px', padding: '8px', border: '1px solid var(--border)', marginBottom: '8px' }}>
              <div style={{ width: '50%', height: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={reportesData} cx="50%" cy="50%" innerRadius={18} outerRadius={32} paddingAngle={3} dataKey="value">
                      {reportesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {reportesData.map(x => (
                  <div key={x.name} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: x.color, display: 'inline-block' }} />
                    <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{x.value}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{x.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button className="btn-secondary" style={{ marginTop: '8px', justifyContent: 'center' }} onClick={() => onNavigate?.('reportes')}>
            Redactar Reportes <ArrowRight size={13} style={{ marginLeft: '4px' }} />
          </button>
        </div>

        {/* TARJETA 4: Inteligencia Regulatoria Biofarmacéutica (span 4) */}
        <div className="grid-card" style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '24px',
          padding: '22px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '380px',
          boxShadow: colores.sombra,
          gridColumn: 'span 4',
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(239,68,68,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertTriangle size={20} color="#EF4444" />
              </div>
              <span style={{ fontSize: '11px', color: '#EF4444', fontWeight: '700', background: 'rgba(239,68,68,0.1)', padding: '3px 8px', borderRadius: '8px' }}>
                ICH M7 · 2 Críticas
              </span>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', margin: '0 0 6px 0' }}>
              Inteligencia Regulatoria
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 12px 0', lineHeight: 1.4 }}>
              Cumplimiento normativo automatizado frente a las agencias regulatorias FDA, EMA y normativas locales COFEPRIS.
            </p>

            {/* Radar Chart de regulaciones */}
            <div style={{ height: '90px', background: '#F8FAFC', borderRadius: '12px', padding: '6px', border: '1px solid var(--border)', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={regulacionData}>
                  <PolarGrid stroke="#E2E8F0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 7, fill: 'var(--text-secondary)' }} />
                  <Radar name="Valor" dataKey="valor" stroke={colores.primario} fill={colores.primario} fillOpacity={0.2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <button className="btn-secondary" style={{ marginTop: '8px', justifyContent: 'center' }} onClick={() => onNavigate?.('regulatorio')}>
            Monitorear Regulaciones <ArrowRight size={13} style={{ marginLeft: '4px' }} />
          </button>
        </div>

        {/* TARJETA 7: Academia Científica Inteligente (span 4) */}
        <div className="grid-card" style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '24px',
          padding: '22px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '380px',
          boxShadow: colores.sombra,
          gridColumn: 'span 4',
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(20,184,166,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen size={20} color="#14B8A6" />
              </div>
              <span style={{ fontSize: '11px', color: '#14B8A6', fontWeight: '700', background: 'rgba(20,184,166,0.1)', padding: '3px 8px', borderRadius: '8px' }}>
                Cursos · 384 Alumnos
              </span>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', margin: '0 0 6px 0' }}>
              Academia Científica Inteligente
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 16px 0', lineHeight: 1.4 }}>
              Capacitación científica y diplomados especializados en toxicoinformática y drug discovery con IA.
            </p>

            {/* Barra de progreso de la academia */}
            <div style={{ padding: '12px 14px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
                <span>Progreso Diplomado</span>
                <span style={{ color: colores.secundario }}>78%</span>
              </div>
              <div style={{ width: '100%', height: '8px', borderRadius: '4px', background: '#E2E8F0', overflow: 'hidden' }}>
                <div style={{ width: '78%', height: '100%', background: `linear-gradient(90deg, ${colores.secundario} 0%, ${colores.primario} 100%)`, borderRadius: '4px' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'var(--text-muted)', marginTop: '8px' }}>
                <span>92 Certificados</span>
                <span>4 Clases en Curso</span>
              </div>
            </div>
          </div>
          <button className="btn-secondary" style={{ marginTop: '16px', justifyContent: 'center' }} onClick={() => onNavigate?.('academia')}>
            Ir a la Academia <ArrowRight size={13} style={{ marginLeft: '4px' }} />
          </button>
        </div>

        {/* TARJETA 5: Prospección Comercial y Licenciamiento (span 4) */}
        <div className="grid-card" style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '24px',
          padding: '22px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '380px',
          boxShadow: colores.sombra,
          gridColumn: 'span 4',
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(16,185,129,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={20} color="#10B981" />
              </div>
              <span style={{ fontSize: '11px', color: '#10B981', fontWeight: '700', background: 'rgba(16,185,129,0.1)', padding: '3px 8px', borderRadius: '8px' }}>
                Comercial · 31 Leads
              </span>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', margin: '0 0 6px 0' }}>
              Prospección y Licenciamiento
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 16px 0', lineHeight: 1.4 }}>
              Seguimiento del pipeline comercial B2B para el licenciamiento de moléculas y servicios científicos de I+D.
            </p>

            {/* Gráfico de línea/área de adquisición de leads comerciales */}
            <div style={{ height: '90px', background: '#F8FAFC', borderRadius: '12px', padding: '4px 8px 0 0', border: '1px solid var(--border)', marginBottom: '8px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={prospeccionData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 8, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 8, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 10, borderRadius: 8 }} />
                  <defs>
                    <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="valor" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorValor)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <button className="btn-secondary" style={{ marginTop: '8px', justifyContent: 'center' }} onClick={() => onNavigate?.('prospeccion')}>
            Ver Pipeline Comercial <ArrowRight size={13} style={{ marginLeft: '4px' }} />
          </button>
        </div>

        {/* TARJETA 6: Patentes y Propiedad Intelectual (span 4) */}
        <div className="grid-card" style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '24px',
          padding: '22px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '380px',
          boxShadow: colores.sombra,
          gridColumn: 'span 4',
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(245,158,11,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Shield size={20} color="#F59E0B" />
              </div>
              <span style={{ fontSize: '11px', color: '#F59E0B', fontWeight: '700', background: 'rgba(245,158,11,0.1)', padding: '3px 8px', borderRadius: '8px' }}>
                Patentes · 8 Activas
              </span>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', margin: '0 0 6px 0' }}>
              Patentes y Propiedad Intelectual
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 16px 0', lineHeight: 1.4 }}>
              Gestión e investigación de propiedad intelectual y estado del arte para proteger las innovaciones de Pharbiois.
            </p>

            {/* Gráfico de barras de patentes */}
            <div style={{ height: '90px', background: '#F8FAFC', borderRadius: '12px', padding: '6px 8px 0 0', border: '1px solid var(--border)', marginBottom: '8px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={patentesData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                  <XAxis dataKey="year" tick={{ fontSize: 8, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 8, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 10, borderRadius: 8 }} />
                  <Bar dataKey="activas" name="Activas" fill={colores.secundario} radius={[3, 3, 0, 0]} />
                  <Bar dataKey="pendientes" name="Pendientes" fill={colores.acento} radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <button className="btn-secondary" style={{ marginTop: '8px', justifyContent: 'center' }} onClick={() => onNavigate?.('patentes')}>
            Ver Patentes e IP <ArrowRight size={13} style={{ marginLeft: '4px' }} />
          </button>
        </div>

        {/* KPIs Condensados (Al pie del dashboard - span 8) */}
        <div className="grid-card" style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '24px',
          padding: '22px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gridColumn: 'span 8',
          boxShadow: colores.sombra,
          minHeight: '380px',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <BarChart3 size={16} color="#475569" />
              <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
                Métricas Clave de Operaciones Científicas
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
              {kpis.map(k => {
                const Icon = k.icon;
                return (
                  <div key={k.label} style={{ padding: '12px 14px', background: '#F8FAFC', border: '1px solid var(--border)', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: `${k.col}15`, border: `1px solid ${k.col}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={16} color={k.col} />
                    </div>
                    <div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '600', lineHeight: 1.1 }}>{k.label}</div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '3px' }}>
                        <span style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>{k.val}</span>
                        <span style={{ fontSize: '9px', fontWeight: '700', color: k.up ? '#10B981' : '#EF4444' }}>{k.trend}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', fontSize: '11px', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
            <span>Última sincronización con servidores: hace 1 minuto</span>
            <span>MAYIA AI Engine v2.4.2</span>
          </div>
        </div>

      </div>

      {/* Modal del Asistente de Voz */}
      {modalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2500, animation: 'fadeIn 0.25s ease' }}>
          <div style={{ width: '90%', maxWidth: '520px', height: '70vh', maxHeight: '600px', backgroundColor: 'var(--bg-card)', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflow: 'hidden', animation: 'scaleIn 0.25s ease' }}>
            {/* Modal Header */}
            <div style={{ padding: '16px 20px', background: `linear-gradient(135deg, ${colores.primario} 0%, ${colores.acento} 100%)`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mic size={18} color="white" />
                </div>
                <div>
                  <div style={{ fontWeight: '700', color: 'white', fontSize: '15px', fontFamily: 'Outfit, sans-serif' }}>Asesor de Voz MAYIA</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.8)' }}>{escuchando ? 'Escuchando...' : loadingIA ? 'Procesando...' : 'Conectado'}</div>
                </div>
              </div>
              <button onClick={() => setModalOpen(false)} style={{ background: 'rgba(255, 255, 255, 0.2)', border: 'none', borderRadius: '10px', padding: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={18} color="white" />
              </button>
            </div>

            {/* Chat Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', background: '#F8FAFC' }}>
              {chatMsgs.map((msg, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                  {msg.role === 'assistant' && (
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `linear-gradient(135deg, ${colores.primario} 0%, ${colores.acento} 100%)`, color: 'white', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>AI</div>
                  )}
                  <div>
                    <div style={{ backgroundColor: msg.role === 'user' ? colores.primario : 'var(--bg-card)', color: msg.role === 'user' ? 'white' : 'var(--text-primary)', padding: '12px 16px', borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px', fontSize: '13px', lineHeight: 1.5, border: msg.role === 'user' ? 'none' : '1px solid var(--border)' }}>
                      {msg.content}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px', textAlign: msg.role === 'user' ? 'right' : 'left' }}>{msg.time}</div>
                  </div>
                </div>
              ))}
              {loadingIA && (
                <div style={{ display: 'flex', gap: '10px', alignSelf: 'flex-start' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `linear-gradient(135deg, ${colores.primario} 0%, ${colores.acento} 100%)`, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>AI</div>
                  <div style={{ backgroundColor: 'var(--bg-card)', padding: '12px 16px', borderRadius: '18px 18px 18px 4px', border: '1px solid var(--border)' }}>
                    <span className="dot" style={{ animationDelay: '0s' }}>.</span><span className="dot" style={{ animationDelay: '0.2s' }}>.</span><span className="dot" style={{ animationDelay: '0.4s' }}>.</span>
                  </div>
                </div>
              )}
              {escuchando && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', padding: '16px', background: `${colores.primario}10`, border: `1px solid ${colores.primario}30`, borderRadius: '12px', width: '90%', margin: '10px auto' }}>
                  <Mic size={20} color={colores.primario} style={{ animation: 'pulse 1.5s infinite' }} />
                  <span style={{ fontSize: '11px', color: colores.primario, fontWeight: '600' }}>Escuchando... Di "MAYIA" para finalizar.</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Footer */}
            <div style={{ padding: '16px 20px', backgroundColor: 'var(--bg-card)', borderTop: '1px solid var(--border)', display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button onClick={iniciarEscucha} disabled={escuchando || loadingIA} style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', background: escuchando ? `linear-gradient(135deg, ${colores.peligro}, ${colores.advertencia})` : `linear-gradient(135deg, ${colores.primario} 0%, ${colores.acento} 100%)`, color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mic size={18} />
              </button>
              <input value={mensaje} onChange={e => setMensaje(e.target.value)} onKeyDown={e => e.key === 'Enter' && enviarMensaje(mensaje)} placeholder={escuchando ? 'Escuchando...' : 'Escribe tu consulta...'} disabled={escuchando || loadingIA} style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: '#F8FAFC', outline: 'none', fontSize: '13px' }} />
              <button onClick={() => enviarMensaje(mensaje)} disabled={escuchando || loadingIA || !mensaje.trim()} className="btn-primary" style={{ padding: '10px' }}><Send size={15} /></button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', background: '#0F172A', color: '#fff', padding: '12px 20px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 9999, fontSize: '13px', fontWeight: '600' }}>
          <Sparkles size={16} color="#10B981" /> {toast}
        </div>
      )}

      <style>{`
        .dot { animation: bounce 1.4s infinite ease-in-out; display: inline-block; font-size: 16px; font-weight: bold; }
        @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1.0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }
        @media (max-width: 1024px) {
          .grid-card {
            grid-column: span 12 !important;
            flex-direction: column !important;
            min-height: auto !important;
          }
          .grid-card > div {
            width: 100% !important;
          }
        }
      `}</style>

    </div>
  );
};