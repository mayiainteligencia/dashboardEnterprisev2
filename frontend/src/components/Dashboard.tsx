import React, { useState, useEffect, useRef } from 'react';
import {
  TrendingUp, BookOpen, Users, ShoppingBag, Map, Clock, 
  ArrowRight, Zap, BarChart3, Sparkles, Mic, X, Send, Utensils, 
  AlertTriangle, CheckCircle, HelpCircle, ChevronRight, MicOff
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, Tooltip as RechartsTooltip
} from 'recharts';
import { brandingConfig } from '../config/branding';

interface DashboardProps {
  onNavigate?: (section: string) => void;
}

interface ChatMsg {
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

interface ProductItem {
  nombre: string;
  categoria: string;
  imgUrl: string;
  desc: string;
}

const products: ProductItem[] = [
  { nombre: 'Whip Topping Base', categoria: 'Cremas para batir', imgUrl: 'https://www.richs.com.mx/wp-content/uploads/2025/11/whip-topping.png', desc: 'Crema base para batir de alto rendimiento y estabilidad.' },
  { nombre: 'Bettercreme Vainilla', categoria: 'Cremas para batir', imgUrl: 'https://www.richs.com.mx/wp-content/uploads/2025/11/bettercreme.png', desc: 'Crema lista para batir con excelente tolerancia a temperatura ambiente.' },
  { nombre: 'Tres Riches Jarabe', categoria: 'Tres Leches', imgUrl: 'https://www.richs.com.mx/wp-content/uploads/2025/11/tres-riches.png', desc: 'Jarabe de tres leches tradicional de absorción inmediata.' },
  { nombre: 'Versatié Crema Culinaria', categoria: 'Cremas Culinarias', imgUrl: 'https://www.richs.com.mx/wp-content/uploads/2025/11/versatie.png', desc: 'Solución culinaria neutra para platillos salados y dulces.' },
  { nombre: 'On Top Topping', categoria: 'Toppings', imgUrl: 'https://www.richs.com.mx/wp-content/uploads/2025/11/on-top.png', desc: 'Crema batida en manga lista para usar con boquilla estrella.' }
];

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { colores, empresa, ia } = brandingConfig;
  const [modalOpen, setModalOpen] = useState(false);
  const [escuchando, setEscuchando] = useState(false);
  const [loadingIA, setLoadingIA] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [chatMsgs, setChatMsgs] = useState<ChatMsg[]>([
    { role: 'assistant', content: '¡Hola! Soy tu asistente de voz MAYIA para Rich’s México. ¿En qué te puedo ayudar hoy con tus recetas, distribuidores o demanda?', time: '10:30' }
  ]);
  const [toast, setToast] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const [isMicCardHovered, setIsMicCardHovered] = useState(false);

  // Datos simulados para las gráficas
  const demandForecastData = [
    { name: 'Ene', forecast: 18000 },
    { name: 'Feb', forecast: 19500 },
    { name: 'Mar', forecast: 21000 },
    { name: 'Abr', forecast: 20000 },
    { name: 'May', forecast: 22000 },
    { name: 'Jun', forecast: 20900 },
  ];

  const distributorSalesData = [
    { name: 'Norte', sales: 15 },
    { name: 'Sur', sales: 11 },
    { name: 'Centro', sales: 25 },
    { name: 'Oeste', sales: 8 },
  ];

  const clientSegmentData = [
    { name: 'HORECA', value: 45, fill: '#10B981' },
    { name: 'Panaderías', value: 35, fill: '#1E40AF' },
    { name: 'Otros', value: 20, fill: '#D31245' },
  ];

  const priceTrendData = [
    { name: 'Sem 1', Rich: 98, Comp: 102 },
    { name: 'Sem 2', Rich: 97, Comp: 101 },
    { name: 'Sem 3', Rich: 96, Comp: 101 },
    { name: 'Sem 4', Rich: 95, Comp: 100 },
  ];

  const sparklineDataMap: Record<string, number[]> = {
    'SKUs Proyectados': [135, 138, 140, 142, 145, 148],
    'Distribuidores Activos': [32, 32, 33, 33, 34, 34],
    'Usuarios Academia': [240, 250, 260, 270, 280, 285],
    'Clientes Foodservice': [480, 490, 495, 500, 505, 512],
    'Ticket E-commerce': [2200, 2300, 2250, 2350, 2400, 2450],
    'Frecuencia Compra': [2.8, 2.7, 2.6, 2.5, 2.4, 2.4]
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMsgs, escuchando, loadingIA]);

  // Speech Recognition Setup
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
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMensaje('');
      setEscuchando(true);
      triggerToast('Escuchando tu voz... (Di "MAYIA" al final para enviar)');
      
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          recognitionRef.current.stop();
          setTimeout(() => recognitionRef.current.start(), 100);
        }
      } else {
        // Fallback simulation
        setTimeout(() => {
          const frases = [
            '¿Cuál es el pronóstico de Tres Riches para el Centro?',
            '¿Cómo soluciono grietas en la Bettercreme?',
            '¿Qué precios tiene Puratos en coberturas?',
            '¿Cómo va el avance de capacitación en CDMX?'
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
        body: JSON.stringify({ mensaje: texto, departamento: 'Richs' })
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
      setTimeout(() => {
        let resp = 'Procesando consulta comercial e industrial para Rich’s México…';
        const t = texto.toLowerCase();
        if (t.includes('demanda') || t.includes('tres riches') || t.includes('forecast') || t.includes('pronóstico')) {
          resp = 'El pronóstico de Tres Riches en la Zona Centro para Julio es de 20,900 cajas (+25% por temporada de graduaciones). Puedes gestionarlo en el módulo de Demand Sensing.';
        } else if (t.includes('grieta') || t.includes('agrietamiento') || t.includes('crema') || t.includes('bettercreme')) {
          resp = 'Para solucionar el agrietamiento en la Bettercreme, asegúrese de batir a velocidad media-baja, no sobrebatir, y mantener la vitrina a una humedad relativa del 75-80%. Consulte el Chef Copilot para más detalles.';
        } else if (t.includes('precio') || t.includes('competencia') || t.includes('puratos') || t.includes('dawn')) {
          resp = 'Ambiante de Puratos cotiza en promedio a $108 MXN por litro y Pastry Whip de Dawn a $96 MXN por kg. Bettercreme se mantiene competitiva en rendimiento neto. Consulte E-commerce & Mkt Intel.';
        } else if (t.includes('capacitación') || t.includes('academia') || t.includes('alumnos') || t.includes('certificados')) {
          resp = 'La Academia Rich reporta 285 alumnos certificados en IA y data literacy, liderados por el equipo de Cuajimalpa con un 88% de avance en Ventas Foodservice.';
        } else {
          resp = 'He recibido su consulta: "' + texto + '". Como su asesor MAYIA, le sugiero navegar al módulo correspondiente (Demand Sensing, Chef Copilot o Ventas Foodservice) para ver reportes avanzados.';
        }
        setChatMsgs(prev => [...prev, { role: 'assistant', content: resp, time: hora }]);
      }, 1500);
    } finally {
      setLoadingIA(false);
    }
  };

  const kpis = [
    { label: 'SKUs Proyectados', val: '148', trend: '+12%', up: true, col: '#1E40AF', icon: TrendingUp },
    { label: 'Distribuidores Activos', val: '34', trend: '+2', up: true, col: '#F59E0B', icon: Map },
    { label: 'Usuarios Academia', val: '285', trend: '+14%', up: true, col: '#10B981', icon: BookOpen },
    { label: 'Clientes Foodservice', val: '512', trend: '+8%', up: true, col: '#D31245', icon: Users },
    { label: 'Ticket E-commerce', val: '$2,450', trend: '+5.4%', up: true, col: '#EF4444', icon: ShoppingBag },
    { label: 'Frecuencia Compra', val: '2.4 sem', trend: '-0.3 sem', up: true, col: '#10B981', icon: Clock },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1600px', margin: '0 auto', padding: '16px' }}>
      
      {/* Welcome Header — Minimalista y cálido */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', gap: '16px' }}>
        <div>
          <h1 style={{
            fontSize: '44px',
            fontWeight: '300',
            color: 'var(--text-primary)',
            marginBottom: '6px',
            letterSpacing: '-1px',
            fontFamily: 'Outfit, sans-serif'
          }}>
            Hola, <span style={{ fontWeight: '700', color: '#D31245' }}>Rich's México!</span>
          </h1>
          <p style={{
            fontSize: '28px',
            fontWeight: '300',
            color: 'var(--text-secondary)',
            margin: 0,
            letterSpacing: '-0.5px',
            fontFamily: 'Outfit, sans-serif'
          }}>
            ¿Qué deseas resolver hoy?
          </p>
        </div>
        
        {/* Contenedor del Logo MAYiA */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.7)',
          padding: '10px 20px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          <img 
            src="/assets/logosNativos/mayiaLogoBlanco.png" 
            alt="MAYIA" 
            style={{ 
              height: '36px', 
              width: 'auto', 
              objectFit: 'contain' 
            }} 
          />
        </div>
      </div>

      {/* Grid Principal de Módulos (Rejilla de 12 Columnas) */}
      <div className="dashboard-grid-12" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px', marginBottom: '24px', alignItems: 'stretch' }}>
        
        {/* TARJETA 1: Demand Sensing (span 4) */}
        <div className="pharb-card" style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '380px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(30,64,175,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingUp size={22} color="#1E40AF" />
              </div>
              <span className="badge badge-blue">
                Previsión · 148 SKUs
              </span>
            </div>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', margin: '0 0 6px 0' }}>
              Demand Sensing & Forecast
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 16px 0', lineHeight: 1.4 }}>
              Predicción inteligente de demanda basada en estacionalidad de pastelería, festividades regionales y promociones locales.
            </p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '12px', minHeight: '120px', alignItems: 'center' }}>
              <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { n: 'Tres Riches Jarabe 1kg', r: 'Centro', f: '20,900' },
                  { n: 'Whip Topping Base 1kg', r: 'Centro', f: '14,437' },
                ].map(x => (
                  <div 
                    key={x.n} 
                    className="inner-widget-card"
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      padding: '8px 12px', 
                      background: '#FFFFFF', 
                      borderRadius: '10px', 
                      border: '1px solid var(--border)',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '11px', fontWeight: '700', color: '#1E40AF' }}>{x.n}</span>
                      <span style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>{x.r}</span>
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#10B981', alignSelf: 'center' }}>{x.f} cjs</span>
                  </div>
                ))}
              </div>

              {/* AreaChart */}
              <div style={{ flex: 1, height: '100px', position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={demandForecastData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
                    <defs>
                      <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1E40AF" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#1E40AF" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#0F172A', border: 'none', borderRadius: '8px', padding: '6px 10px' }}
                      labelStyle={{ color: '#94A3B8', fontSize: '10px', fontWeight: '600' }}
                      itemStyle={{ color: '#FFFFFF', fontSize: '10px', fontWeight: '700' }}
                    />
                    <Area type="monotone" dataKey="forecast" stroke="#1E40AF" strokeWidth={2} fillOpacity={1} fill="url(#colorForecast)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <button className="btn-secondary" style={{ marginTop: '20px', justifyContent: 'center', borderRadius: '12px', padding: '11px' }} onClick={() => onNavigate?.('demanda')}>
            Ver Previsiones <ArrowRight size={13} style={{ marginLeft: '4px' }} />
          </button>
        </div>

        {/* TARJETA 2: Asistente de Voz MAYIA Glassmorphic Hero (span 4) */}
        <div 
          className="group relative transition-all duration-500"
          onMouseEnter={(e) => {
            setIsMicCardHovered(true);
            e.currentTarget.style.transform = 'translateY(-4px) rotateX(2deg) rotateY(-2deg)';
            e.currentTarget.style.boxShadow = `0 12px 30px ${colores.primario}22`;
          }}
          onMouseLeave={(e) => {
            setIsMicCardHovered(false);
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
          style={{
            gridColumn: 'span 4',
            background: `linear-gradient(135deg, ${colores.primario}20 0%, ${colores.secundario}20 100%)`,
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '24px',
            border: `2px solid ${colores.primario}30`,
            position: 'relative',
            overflow: 'hidden',
            minHeight: '380px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.5s',
          }}
        >
          {/* Background Glow */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
            <div 
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '400px',
                height: '400px',
                opacity: isMicCardHovered ? 0.6 : 0,
                transition: 'opacity 700ms ease-in-out',
                filter: 'blur(80px)',
                background: colores.primario,
                borderRadius: '50%',
              }}
            />
          </div>

          {/* Animated float shapes */}
          <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '200px', height: '200px', background: `radial-gradient(circle, ${colores.primario}25 0%, transparent 70%)`, filter: 'blur(40px)', animation: 'float 6s ease-in-out infinite', pointerEvents: 'none', zIndex: 0 }} />
          <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '180px', height: '180px', background: `radial-gradient(circle, ${colores.secundario}25 0%, transparent 70%)`, filter: 'blur(40px)', animation: 'float 8s ease-in-out infinite reverse', pointerEvents: 'none', zIndex: 0 }} />

          {/* Graphic Content */}
          <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            {/* 3D Glassmorphic Cards Stack */}
            <div style={{ position: 'relative', width: '130px', height: '90px', marginBottom: '16px' }}>
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: `${i * 4}px`,
                    top: '0',
                    width: '100px',
                    height: '80px',
                    background: `linear-gradient(135deg, 
                      ${colores.primario}${Math.max(20 - i * 2, 5).toString(16).padStart(2, '0')} 0%, 
                      ${colores.secundario}${Math.max(20 - i * 2, 5).toString(16).padStart(2, '0')} 100%)`,
                    backdropFilter: 'blur(8px)',
                    borderRadius: '24px',
                    border: `1px solid ${colores.primario}${Math.max(40 - i * 5, 10).toString(16).padStart(2, '0')}`,
                    transform: `perspective(800px) rotateY(${-15 + i * 4}deg) translateZ(${i * 8}px)`,
                    boxShadow: `0 ${8 + i * 4}px ${20 + i * 8}px rgba(0,0,0,0.15)`,
                    transition: 'all 0.3s ease',
                    pointerEvents: 'none',
                  }}
                />
              ))}
              <div style={{ position: 'absolute', top: '10%', left: '20%', width: '60%', height: '30%', background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 100%)', borderRadius: '50%', filter: 'blur(16px)', transform: 'perspective(800px) rotateY(-10deg)', pointerEvents: 'none' }} />
            </div>

            {/* Texts */}
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: colores.primario, fontFamily: 'Outfit, sans-serif', lineHeight: 1.3, marginBottom: '6px' }}>
              Asistente de Cocina MAYIA
            </h3>
            
            {/* Waveform Animation */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', height: '24px', margin: '6px 0 10px' }}>
              {[0.4, 0.8, 0.5, 0.9, 0.3, 0.7, 0.4].map((delay, index) => (
                <div
                  key={index}
                  style={{
                    width: '3px',
                    height: '20px',
                    backgroundColor: index % 2 === 0 ? colores.primario : colores.secundario,
                    borderRadius: '2px',
                    animation: 'wave-pulse 1.2s infinite ease-in-out',
                    animationDelay: `${delay}s`,
                    transformOrigin: 'center',
                  }}
                />
              ))}
            </div>

            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 4px 0', maxWidth: '260px' }}>
              Consulta recetas, stock de distribuidores o tendencias por voz.
            </p>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic', margin: '0 0 14px 0' }}>
              Di "MAYIA" al final para enviar tu consulta.
            </p>

            {/* Mic Pulse Button */}
            <button
              onClick={() => { setModalOpen(true); iniciarEscucha(); }}
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                border: `1.5px solid ${colores.primario}40`,
                background: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(211,18,69,0.12)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(211, 18, 69, 0.05)'; e.currentTarget.style.transform = 'scale(1.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <Mic size={20} color="#D31245" />
            </button>
          </div>
        </div>

        {/* TARJETA 3: Chef Copilot & Recetario (span 4) */}
        <div className="pharb-card" style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '380px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(211,18,69,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Utensils size={22} color="#D31245" />
              </div>
              <span className="badge badge-purple">
                Fichas Técnicas
              </span>
            </div>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', margin: '0 0 6px 0' }}>
              Chef Copilot & Recetario
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 16px 0', lineHeight: 1.4 }}>
              Asistente de recetas avanzadas, cálculo de rendimientos y solución técnica a problemas comunes en pastelería.
            </p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '12px', minHeight: '120px', alignItems: 'center' }}>
              <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { name: 'Tres Leches Tradicional', status: 'Publicado', col: '#10B981' },
                  { name: 'Selva Negra Versatié', status: 'Publicado', col: '#10B981' },
                ].map(x => (
                  <div 
                    key={x.name} 
                    className="inner-widget-card"
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      padding: '8px 12px', 
                      background: '#FFFFFF', 
                      borderRadius: '10px', 
                      border: '1px solid var(--border)',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-primary)' }}>{x.name}</div>
                    <span style={{ fontSize: '9px', fontWeight: '700', color: x.col }}>{x.status}</span>
                  </div>
                ))}
              </div>

              {/* Pastry Image */}
              <div style={{ flex: 0.8, height: '90px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)', position: 'relative' }}>
                <img 
                  src="/assets/pastry.png" 
                  alt="Recetas Rich" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
            </div>
          </div>
          <button className="btn-secondary" style={{ marginTop: '20px', justifyContent: 'center', borderRadius: '12px', padding: '11px' }} onClick={() => onNavigate?.('copilot-chef')}>
            Consultar Recetario <ArrowRight size={13} style={{ marginLeft: '4px' }} />
          </button>
        </div>

        {/* TARJETA 4: Distribuidor 360 AI (span 3) */}
        <div className="pharb-card" style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '380px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(245,158,11,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Map size={22} color="#F59E0B" />
              </div>
              <span className="badge badge-amber">
                Cobertura Nacional
              </span>
            </div>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', margin: '0 0 6px 0' }}>
              Distribuidor 360 AI
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 16px 0', lineHeight: 1.4 }}>
              Monitoreo geográfico de sell-in y frecuencia de recompra para asegurar disponibilidad.
            </p>
            
            {/* BarChart */}
            <div style={{ height: '70px', margin: '8px 0' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={distributorSalesData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#0F172A', border: 'none', borderRadius: '8px', padding: '6px 10px' }}
                    labelStyle={{ color: '#94A3B8', fontSize: '9px', fontWeight: '600' }}
                    itemStyle={{ color: '#FFFFFF', fontSize: '9px', fontWeight: '700' }}
                  />
                  <Bar dataKey="sales" fill="#F59E0B" radius={[3, 3, 0, 0]}>
                    {distributorSalesData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={index === 2 ? '#EA580C' : '#F59E0B'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { name: 'Servipan CDMX', desc: 'Ventas: $1.25M MXN' },
                { name: 'Insumos del Sureste', desc: 'Frecuencia Crítica (3 sem)' },
              ].map(x => (
                <div 
                  key={x.name} 
                  className="inner-widget-card"
                  style={{ 
                    display: 'flex', 
                    gap: '8px', 
                    padding: '8px 12px', 
                    background: '#FFFFFF', 
                    borderRadius: '10px', 
                    border: '1px solid var(--border)',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-primary)', fontWeight: '600' }}>{x.name}</div>
                    <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{x.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="btn-secondary" style={{ marginTop: '20px', justifyContent: 'center', borderRadius: '12px', padding: '11px' }} onClick={() => onNavigate?.('distribuidores')}>
            Ver Distribuidores <ArrowRight size={13} style={{ marginLeft: '4px' }} />
          </button>
        </div>

        {/* TARJETA 5: Ventas Foodservice (span 3) */}
        <div className="pharb-card" style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '380px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(16,185,129,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={22} color="#10B981" />
              </div>
              <span className="badge badge-green">
                B2B · 512 Clientes
              </span>
            </div>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', margin: '0 0 6px 0' }}>
              Ventas Foodservice
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 16px 0', lineHeight: 1.4 }}>
              Herramienta comercial para fuerza de ventas con pitch sugerido y objeciones.
            </p>

            {/* Donut Chart */}
            <div style={{ height: '70px', margin: '8px 0', display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '70px', height: '70px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#0F172A', border: 'none', borderRadius: '8px', padding: '6px 10px' }}
                      itemStyle={{ color: '#FFFFFF', fontSize: '9px', fontWeight: '700' }}
                    />
                    <Pie
                      data={clientSegmentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={15}
                      outerRadius={26}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {clientSegmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { e: 'Hotel Camino Real', m: 'Foodservice / HORECA' },
                { e: 'Panificadora El Rosario', m: 'Distribuidor / Panadería' },
              ].map(x => (
                <div 
                  key={x.e} 
                  className="inner-widget-card"
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '8px 12px', 
                    background: '#FFFFFF', 
                    borderRadius: '10px', 
                    border: '1px solid var(--border)',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>{x.e}</span>
                  <span style={{ fontSize: '9px', fontWeight: '700', color: '#10B981' }}>{x.m}</span>
                </div>
              ))}
            </div>
          </div>
          <button className="btn-secondary" style={{ marginTop: '20px', justifyContent: 'center', borderRadius: '12px', padding: '11px' }} onClick={() => onNavigate?.('ventas-b2b')}>
            Copiloto de Ventas <ArrowRight size={13} style={{ marginLeft: '4px' }} />
          </button>
        </div>

        {/* TARJETA 6: E-commerce & Mkt (span 3) */}
        <div className="pharb-card" style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '380px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(239,68,68,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShoppingBag size={22} color="#EF4444" />
              </div>
              <span className="badge badge-red">
                Competidores
              </span>
            </div>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', margin: '0 0 6px 0' }}>
              E-commerce & Mkt Intel
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 16px 0', lineHeight: 1.4 }}>
              Monitoreo de precios frente a Dawn y Puratos, además del plan de expansión online.
            </p>

            {/* LineChart */}
            <div style={{ height: '70px', margin: '8px 0' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceTrendData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#0F172A', border: 'none', borderRadius: '8px', padding: '6px 10px' }}
                    labelStyle={{ color: '#94A3B8', fontSize: '9px', fontWeight: '600' }}
                    itemStyle={{ color: '#FFFFFF', fontSize: '9px', fontWeight: '700' }}
                  />
                  <Line type="monotone" dataKey="Rich" stroke="#D31245" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 4 }} />
                  <Line type="monotone" dataKey="Comp" stroke="#94A3B8" strokeWidth={1.5} strokeDasharray="3 3" dot={{ r: 1 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { id: 'Bettercreme vs Dawn', diff: 'Rich -4%' },
                { id: 'Versatié vs Puratos', diff: 'Margen +20%' },
              ].map(x => (
                <div 
                  key={x.id} 
                  className="inner-widget-card"
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '8px 12px', 
                    background: '#FFFFFF', 
                    borderRadius: '10px', 
                    border: '1px solid var(--border)',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-primary)' }}>{x.id}</span>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#EF4444' }}>{x.diff}</span>
                </div>
              ))}
            </div>
          </div>
          <button className="btn-secondary" style={{ marginTop: '20px', justifyContent: 'center', borderRadius: '12px', padding: '11px' }} onClick={() => onNavigate?.('ecommerce-mkt')}>
            Monitorear Precios <ArrowRight size={13} style={{ marginLeft: '4px' }} />
          </button>
        </div>

        {/* TARJETA 7: Academia Rich (span 3) */}
        <div className="pharb-card" style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '380px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(234,88,12,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen size={22} color="#EA580C" />
              </div>
              <span className="badge badge-teal">
                Capacitación B2B
              </span>
            </div>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', margin: '0 0 6px 0' }}>
              Academia Rich
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 12px 0', lineHeight: 1.4 }}>
              Adopción de IA aplicada a ventas foodservice, análisis de inventarios y forecast comercial.
            </p>

            {/* Glowing Circular Progress Ring */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '12px 0', position: 'relative', height: '80px' }}>
              {/* Floating particles background */}
              <div style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden' }}>
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      left: `${20 + i * 20}%`,
                      bottom: '10%',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: '#EA580C',
                      animation: 'sparkle-float 2.5s infinite ease-in-out',
                      animationDelay: `${i * 0.6}s`,
                    }}
                  />
                ))}
              </div>
              
              {/* Circular Gauge */}
              <div 
                style={{ 
                  width: '70px', 
                  height: '70px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  position: 'relative',
                  background: '#FFFFFF',
                  animation: 'pulse-glow 3s infinite',
                }}
              >
                <svg width="70" height="70" style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
                  <circle cx="35" cy="35" r="26" stroke="#F1F5F9" strokeWidth="5" fill="transparent" />
                  <circle 
                    cx="35" 
                    cy="35" 
                    r="26" 
                    stroke="#10B981" 
                    strokeWidth="5" 
                    fill="transparent" 
                    strokeDasharray={2 * Math.PI * 26} 
                    strokeDashoffset={2 * Math.PI * 26 * (1 - 0.88)} 
                    strokeLinecap="round"
                  />
                </svg>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>88%</span>
                  <span style={{ fontSize: '8px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Avance</span>
                </div>
              </div>
            </div>

            <div 
              className="inner-widget-card"
              style={{ 
                padding: '10px 12px', 
                background: '#FFFFFF', 
                borderRadius: '10px', 
                border: '1px solid var(--border)',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-primary)' }}>IA Aplicada a Ventas Foodservice</div>
            </div>
          </div>
          <button className="btn-secondary" style={{ marginTop: '20px', justifyContent: 'center', borderRadius: '12px', padding: '11px' }} onClick={() => onNavigate?.('academia')}>
            Ir a Academia <ArrowRight size={13} style={{ marginLeft: '4px' }} />
          </button>
        </div>

        {/* Portafolio Destacado (span 12) */}
        <div className="pharb-card" style={{ gridColumn: 'span 12', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(211,18,69,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Utensils size={16} color="#D31245" />
            </div>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', margin: 0 }}>
              Portafolio Destacado — Productos Extraídos de richs.com.mx
            </h3>
          </div>

          <div className="portfolio-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
            {products.map(p => (
              <div
                key={p.nombre}
                onClick={() => setSelectedProduct(p)}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  padding: '16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  minHeight: '220px'
                }}
                className="portfolio-item-card"
              >
                <div style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAFAFA', borderRadius: '50%', padding: '10px', boxShadow: '0 1px 4px rgba(0,0,0,0.01)', overflow: 'hidden', marginBottom: '12px' }}>
                  <img
                    src={p.imgUrl}
                    alt={p.nombre}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    onError={(e) => {
                      const img = e.currentTarget;
                      img.style.display = 'none';
                      const parent = img.parentElement;
                      if (parent) {
                        const div = document.createElement('div');
                        div.innerText = '🍰';
                        div.style.fontSize = '24px';
                        parent.appendChild(div);
                      }
                    }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-primary)', lineHeight: 1.2 }}>{p.nombre}</div>
                  <div style={{ fontSize: '9px', color: '#D31245', fontWeight: '700', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{p.categoria}</div>
                </div>
                <span style={{ fontSize: '9px', color: '#1E40AF', fontWeight: '700', marginTop: '14px', textDecoration: 'underline' }}>Detalles Ficha &rarr;</span>
              </div>
            ))}
          </div>
        </div>

        {/* KPIs de Operación y Suministro (span 12) */}
        <div className="pharb-card" style={{ gridColumn: 'span 12', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(71,85,105,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BarChart3 size={16} color="#475569" />
            </div>
            <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
              Métricas de Operación y Suministro
            </span>
          </div>

          <div className="kpi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
            {kpis.map(k => {
              const Icon = k.icon;
              return (
                <div 
                  key={k.label} 
                  style={{ 
                    padding: '10px 12px', 
                    background: '#FFFFFF', 
                    border: '1px solid var(--border)', 
                    borderRadius: '14px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    transition: 'all 0.25s ease',
                    cursor: 'pointer',
                    minWidth: 0, // Permite encoger textos correctamente
                  }}
                  className="kpi-metric-item"
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = k.col;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = `0 6px 14px ${k.col}10`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${k.col}12`, border: `1px solid ${k.col}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={16} color={k.col} />
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: '600', lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{k.label}</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '4px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>{k.val}</span>
                      <span style={{ fontSize: '9px', fontWeight: '700', color: '#10B981' }}>{k.trend}</span>
                    </div>
                  </div>

                  {/* Sparkline chart on the right side */}
                  <div style={{ width: '45px', height: '22px', marginLeft: '6px', flexShrink: 0 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={(sparklineDataMap[k.label] || [1, 2, 3, 4]).map((val, idx) => ({ idx, val }))}>
                        <Line type="monotone" dataKey="val" stroke={k.col} strokeWidth={1.5} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', fontSize: '11px', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
            <span>Última sincronización con servidores: hace 1 minuto</span>
            <span>MAYIA AI Food Engine v2.4.2</span>
          </div>
        </div>

      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000 }}>
          <div style={{ width: '90%', maxWidth: '420px', background: '#FFFFFF', borderRadius: '24px', padding: '24px', border: '1px solid var(--border)', boxShadow: '0 20px 48px rgba(0,0,0,0.12)', animation: 'scaleIn 0.25s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>{selectedProduct.nombre}</h3>
                <span style={{ fontSize: '10px', color: '#D31245', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{selectedProduct.categoria}</span>
              </div>
              <button onClick={() => setSelectedProduct(null)} style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <X size={14} color="var(--text-secondary)" />
              </button>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0', borderBottom: '1px solid var(--border)', marginBottom: '16px' }}>
              <img src={selectedProduct.imgUrl} alt={selectedProduct.nombre} style={{ height: '140px', objectFit: 'contain' }} />
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '20px' }}>
              {selectedProduct.desc}
            </p>

            <button
              onClick={() => { setSelectedProduct(null); onNavigate?.('copilot-chef'); }}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', background: '#D31245', borderColor: '#D31245', borderRadius: '12px', padding: '12px', fontSize: '13px', fontWeight: '600' }}
            >
              Ver Recetas & Soluciones Técnicas
            </button>
          </div>
        </div>
      )}

      {/* Modal del Asistente de Voz */}
      {modalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2500 }}>
          <div style={{ width: '90%', maxWidth: '520px', height: '70vh', maxHeight: '600px', backgroundColor: '#FFFFFF', borderRadius: '24px', boxShadow: '0 24px 60px rgba(0, 0, 0, 0.15)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflow: 'hidden', animation: 'scaleIn 0.25s ease' }}>
            {/* Modal Header */}
            <div style={{ padding: '18px 24px', background: 'linear-gradient(135deg, #1E40AF 0%, #D31245 100%)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mic size={18} color="white" />
                </div>
                <div>
                  <div style={{ fontWeight: '700', color: 'white', fontSize: '15px', fontFamily: 'Outfit, sans-serif' }}>Asesor de Voz {ia.nombre}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.8)' }}>{escuchando ? 'Escuchando...' : loadingIA ? 'Procesando...' : 'Conectado'}</div>
                </div>
              </div>
              <button onClick={() => setModalOpen(false)} style={{ background: 'rgba(255, 255, 255, 0.2)', border: 'none', borderRadius: '10px', padding: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={18} color="white" />
              </button>
            </div>

            {/* Chat Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', background: '#FAFAFA' }}>
              {chatMsgs.map((msg, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                  {msg.role === 'assistant' && (
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #1E40AF 0%, #D31245 100%)', color: 'white', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>AI</div>
                  )}
                  <div>
                    <div style={{ backgroundColor: msg.role === 'user' ? '#D31245' : '#FFFFFF', color: msg.role === 'user' ? 'white' : 'var(--text-primary)', padding: '12px 16px', borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px', fontSize: '13px', lineHeight: 1.5, border: msg.role === 'user' ? 'none' : '1px solid var(--border)' }}>
                      {msg.content}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px', textAlign: msg.role === 'user' ? 'right' : 'left' }}>{msg.time}</div>
                  </div>
                </div>
              ))}
              {loadingIA && (
                <div style={{ display: 'flex', gap: '10px', alignSelf: 'flex-start' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #1E40AF 0%, #D31245 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>AI</div>
                  <div style={{ backgroundColor: '#FFFFFF', padding: '12px 16px', borderRadius: '16px 16px 16px 4px', border: '1px solid var(--border)' }}>
                    <span className="dot" style={{ animationDelay: '0s' }}>.</span><span className="dot" style={{ animationDelay: '0.2s' }}>.</span><span className="dot" style={{ animationDelay: '0.4s' }}>.</span>
                  </div>
                </div>
              )}
              {escuchando && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', padding: '16px', background: 'rgba(211, 18, 69, 0.03)', border: '1px solid rgba(211, 18, 69, 0.12)', borderRadius: '12px', width: '90%', margin: '10px auto' }}>
                  <Mic size={20} color="#D31245" style={{ animation: 'pulse 1.5s infinite' }} />
                  <span style={{ fontSize: '11px', color: '#D31245', fontWeight: '600' }}>Escuchando... Di "MAYIA" para finalizar.</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Footer */}
            <div style={{ padding: '16px 20px', backgroundColor: '#FFFFFF', borderTop: '1px solid var(--border)', display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button onClick={iniciarEscucha} disabled={escuchando || loadingIA} style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', background: escuchando ? 'linear-gradient(135deg, #EF4444, #F59E0B)' : 'linear-gradient(135deg, #1E40AF 0%, #D31245 100%)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mic size={18} />
              </button>
              <input value={mensaje} onChange={e => setMensaje(e.target.value)} onKeyDown={e => e.key === 'Enter' && enviarMensaje(mensaje)} placeholder={escuchando ? 'Escuchando...' : 'Escribe tu consulta...'} disabled={escuchando || loadingIA} style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: '#FAFAFA', outline: 'none', fontSize: '13px' }} />
              <button onClick={() => enviarMensaje(mensaje)} disabled={escuchando || loadingIA || !mensaje.trim()} className="btn-primary" style={{ padding: '10px', background: '#D31245', borderColor: '#D31245', borderRadius: '10px' }}><Send size={15} /></button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', background: '#0F172A', color: '#fff', padding: '12px 20px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 9999, fontSize: '13px', fontWeight: '600' }}>
          <Sparkles size={16} color="#D31245" /> {toast}
        </div>
      )}

      <style>{`
        .dot { animation: bounce 1.4s infinite ease-in-out; display: inline-block; font-size: 16px; font-weight: bold; }
        @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1.0); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(20px, -15px) rotate(3deg); }
          66% { transform: translate(-10px, 15px) rotate(-3deg); }
        }
        @keyframes wave-pulse {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
        }
        @keyframes sparkle-float {
          0% { transform: translateY(10px) scale(0); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-40px) scale(1); opacity: 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 4px rgba(16, 185, 129, 0.2); }
          50% { box-shadow: 0 0 14px rgba(16, 185, 129, 0.5); }
        }
        
        /* Card in card styles */
        .inner-widget-card:hover {
          border-color: ${colores.primario} !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(211, 18, 69, 0.05);
        }
        
        .portfolio-item-card {
          position: relative;
        }
        .portfolio-item-card img {
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .portfolio-item-card:hover {
          transform: translateY(-6px) scale(1.02) !important;
          border-color: ${colores.primario} !important;
          box-shadow: 0 12px 30px rgba(211, 18, 69, 0.12) !important;
        }
        .portfolio-item-card:hover img {
          transform: scale(1.1) !important;
        }

        .kpi-metric-item {
          transition: all 0.25s ease;
        }
        .kpi-metric-item svg {
          transition: transform 0.3s ease;
        }
        .kpi-metric-item:hover svg {
          transform: scale(1.2) rotate(6deg);
        }
        
        /* KPI layout overrides */
        @media (max-width: 1200px) {
          .kpi-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .kpi-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>

    </div>
  );
};