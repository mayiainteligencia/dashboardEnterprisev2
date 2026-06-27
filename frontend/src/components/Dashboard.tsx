import React, { useState, useEffect, useRef } from 'react';
import {
  TrendingUp, BookOpen, Users, ShoppingBag, Map, Clock, 
  ArrowRight, Zap, BarChart3, Sparkles, Mic, X, Send, Utensils, 
  AlertTriangle, CheckCircle, HelpCircle, ChevronRight
} from 'lucide-react';
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

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMsgs, escuchando, loadingIA]);

  // Speech Recognition
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
            '¿Cómo va el avance de capacitación en Cuajimalpa?'
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Welcome Header — Minimalista y cálido, tipo Honda */}
      <div style={{ marginBottom: '8px' }}>
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

      {/* Grid Principal de Módulos (3 Columnas) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        
        {/* TARJETA 1: Demand Sensing */}
        <div className="pharb-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '380px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(30,64,175,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingUp size={20} color="#1E40AF" />
              </div>
              <span className="badge badge-blue">
                Previsión · 148 SKUs
              </span>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', margin: '0 0 6px 0' }}>
              Demand Sensing & Forecast
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 16px 0', lineHeight: 1.4 }}>
              Predicción inteligente de demanda basada en estacionalidad de pastelería, festividades regionales y promociones locales.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { n: 'Tres Riches Jarabe 1kg', r: 'Centro', f: '20,900' },
                { n: 'Whip Topping Base 1kg', r: 'Centro', f: '14,437' },
              ].map(x => (
                <div key={x.n} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', background: '#FAFAFA', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#1E40AF' }}>{x.n}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{x.r}</span>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#10B981' }}>{x.f} cjs</span>
                </div>
              ))}
            </div>
          </div>
          <button className="btn-secondary" style={{ marginTop: '16px', justifyContent: 'center' }} onClick={() => onNavigate?.('demanda')}>
            Ver Previsiones <ArrowRight size={13} style={{ marginLeft: '4px' }} />
          </button>
        </div>

        {/* TARJETA 2: Asistente de Voz (Cálido y limpio con contorno, estilo Honda Hero) */}
        <div style={{
          background: 'rgba(211,18,69,0.03)',
          border: '2px solid rgba(211,18,69,0.15)',
          borderRadius: '12px', padding: '24px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
          minHeight: '380px', justifyContent: 'space-between',
          position: 'relative'
        }}>
          {/* Flat warm shape inside */}
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'rgba(211,18,69,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px',
          }}>
            <Utensils size={32} color="#D31245" />
          </div>

          <div style={{ margin: '14px 0' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#D31245', fontFamily: 'Outfit, sans-serif', lineHeight: 1.3, marginBottom: '6px' }}>
              Asistente de Cocina MAYIA
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 4px 0' }}>
              Consulta recetas, stock de distribuidores o tendencias por voz
            </p>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic', margin: 0 }}>
              Di "MAYIA" al final para enviar tu mensaje
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '10px' }}>
            <span>Potenciado por</span>
            <span style={{ fontWeight: '700', color: '#D31245' }}>MAYIA® IA</span>
          </div>

          {/* Mic Button */}
          <button
            onClick={() => { setModalOpen(true); iniciarEscucha(); }}
            style={{
              width: '44px', height: '44px', borderRadius: '50%',
              border: '1.5px solid rgba(211, 18, 69, 0.4)', background: '#FFF',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 2px 6px rgba(211,18,69,0.1)'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(211, 18, 69, 0.05)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#FFF'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <Mic size={18} color="#D31245" />
          </button>
        </div>

        {/* TARJETA 3: Chef Copilot */}
        <div className="pharb-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '380px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(211,18,69,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Utensils size={20} color="#D31245" />
              </div>
              <span className="badge badge-purple">
                Fichas Técnicas
              </span>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', margin: '0 0 6px 0' }}>
              Chef Copilot & Recetario
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 16px 0', lineHeight: 1.4 }}>
              Asistente de recetas avanzadas, cálculo de rendimientos y solución técnica a problemas comunes en pastelería.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { name: 'Tres Leches Tradicional', status: 'Publicado', col: '#10B981' },
                { name: 'Selva Negra Versatié', status: 'Publicado', col: '#10B981' },
              ].map(x => (
                <div key={x.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', background: '#FAFAFA', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>{x.name}</div>
                  <span style={{ fontSize: '10px', fontWeight: '700', color: x.col }}>{x.status}</span>
                </div>
              ))}
            </div>
          </div>
          <button className="btn-secondary" style={{ marginTop: '16px', justifyContent: 'center' }} onClick={() => onNavigate?.('copilot-chef')}>
            Consultar Recetario <ArrowRight size={13} style={{ marginLeft: '4px' }} />
          </button>
        </div>

        {/* TARJETA 4: Distribuidor 360 */}
        <div className="pharb-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '380px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(245,158,11,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Map size={20} color="#F59E0B" />
              </div>
              <span className="badge badge-amber">
                Cobertura Nacional
              </span>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', margin: '0 0 6px 0' }}>
              Distribuidor 360 AI
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 16px 0', lineHeight: 1.4 }}>
              Monitoreo geográfico de sell-in y frecuencia de recompra para asegurar disponibilidad de catálogo en todo el país.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { name: 'Servipan CDMX', desc: 'Ventas: $1.25M MXN' },
                { name: 'Insumos del Sureste', desc: 'Frecuencia Crítica (3 sem)' },
              ].map(x => (
                <div key={x.name} style={{ display: 'flex', gap: '8px', padding: '8px 10px', background: 'rgba(245,158,11,0.03)', borderRadius: '8px', border: '1px solid rgba(245,158,11,0.15)' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-primary)', fontWeight: '600' }}>{x.name}</div>
                    <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{x.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="btn-secondary" style={{ marginTop: '16px', justifyContent: 'center' }} onClick={() => onNavigate?.('distribuidores')}>
            Ver Distribuidores <ArrowRight size={13} style={{ marginLeft: '4px' }} />
          </button>
        </div>

        {/* TARJETA 5: Ventas Foodservice */}
        <div className="pharb-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '380px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(16,185,129,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={20} color="#10B981" />
              </div>
              <span className="badge badge-green">
                B2B · 512 Clientes
              </span>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', margin: '0 0 6px 0' }}>
              Ventas Foodservice Copilot
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 16px 0', lineHeight: 1.4 }}>
              Herramienta comercial para fuerza de ventas con pitch sugerido y respuestas automáticas a objeciones.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { e: 'Hotel Camino Real', m: 'Foodservice / HORECA' },
                { e: 'Panificadora El Rosario', m: 'Distribuidor / Panadería' },
              ].map(x => (
                <div key={x.e} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', background: '#FAFAFA', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>{x.e}</span>
                  <span style={{ fontSize: '10px', fontWeight: '700', color: '#10B981' }}>{x.m}</span>
                </div>
              ))}
            </div>
          </div>
          <button className="btn-secondary" style={{ marginTop: '16px', justifyContent: 'center' }} onClick={() => onNavigate?.('ventas-b2b')}>
            Copiloto de Ventas <ArrowRight size={13} style={{ marginLeft: '4px' }} />
          </button>
        </div>

        {/* TARJETA 6: E-commerce & Mkt */}
        <div className="pharb-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '380px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(239,68,68,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShoppingBag size={20} color="#EF4444" />
              </div>
              <span className="badge badge-red">
                Competidores
              </span>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', margin: '0 0 6px 0' }}>
              E-commerce & Mkt Intel
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 16px 0', lineHeight: 1.4 }}>
              Monitoreo de precios frente a Dawn y Puratos, además del plan de expansión del canal en línea CDMX.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { id: 'Bettercreme vs Dawn', diff: 'Rich -4%' },
                { id: 'Versatié vs Puratos', diff: 'Margen +20%' },
              ].map(x => (
                <div key={x.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', background: '#FAFAFA', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-primary)' }}>{x.id}</span>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#EF4444' }}>{x.diff}</span>
                </div>
              ))}
            </div>
          </div>
          <button className="btn-secondary" style={{ marginTop: '16px', justifyContent: 'center' }} onClick={() => onNavigate?.('ecommerce-mkt')}>
            Monitorear Precios <ArrowRight size={13} style={{ marginLeft: '4px' }} />
          </button>
        </div>

      </div>

      {/* Galería de Productos Extraídos (Rich's México) */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Utensils size={18} color="#D31245" />
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
            Portafolio Destacado — Productos Extraídos de richs.com.mx
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px' }}>
          {products.map(p => (
            <div
              key={p.nombre}
              onClick={() => setSelectedProduct(p)}
              style={{
                background: '#FAFAFA',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '12px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: '200px'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#D31245'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
              <div style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFF', borderRadius: '50%', padding: '10px', boxShadow: '0 1px 4px rgba(0,0,0,0.02)', overflow: 'hidden', marginBottom: '10px' }}>
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
                <div style={{ fontSize: '9px', color: '#D31245', fontWeight: '700', marginTop: '2px', textTransform: 'uppercase' }}>{p.categoria}</div>
              </div>
              <span style={{ fontSize: '9px', color: '#1E40AF', fontWeight: '700', marginTop: '10px', textDecoration: 'underline' }}>Detalles Ficha &rarr;</span>
            </div>
          ))}
        </div>
      </div>

      {/* Fila 3: Academia (1 col) + KPIs generales (2 cols) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', alignItems: 'stretch' }}>
        
        {/* TARJETA 7: Academia Rich */}
        <div className="pharb-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(20,184,166,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen size={20} color="#10B981" />
              </div>
              <span className="badge badge-green">
                Cursos · 285 Vendedores
              </span>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', margin: '0 0 6px 0' }}>
              Academia Rich
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 16px 0', lineHeight: 1.4 }}>
              Adopción de IA aplicada a ventas foodservice, análisis de inventarios y forecast comercial para distribuidores.
            </p>
            <div style={{ padding: '8px 10px', background: '#FAFAFA', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>IA Aplicada a Ventas Foodservice</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Avance General: 88%</div>
            </div>
          </div>
          <button className="btn-secondary" style={{ marginTop: '16px', justifyContent: 'center' }} onClick={() => onNavigate?.('academia')}>
            Ir a Academia <ArrowRight size={13} style={{ marginLeft: '4px' }} />
          </button>
        </div>

        {/* KPIs Condensados */}
        <div className="pharb-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <BarChart3 size={16} color="var(--text-secondary)" />
              <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
                Métricas de Operación y Suministro
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {kpis.map(k => {
                const Icon = k.icon;
                return (
                  <div key={k.label} className="metric-card" style={{ padding: '12px 14px', background: '#FAFAFA', border: '1px solid var(--border)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${k.col}15`, border: `1px solid ${k.col}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={16} color={k.col} />
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', lineHeight: 1.1 }}>{k.label}</div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '2px' }}>
                        <span style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>{k.val}</span>
                        <span style={{ fontSize: '9px', fontWeight: '700', color: '#10B981' }}>{k.trend}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', fontSize: '11px', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
            <span>Última sincronización con servidores: hace 1 minuto</span>
            <span>MAYIA AI Food Engine v2.4.2</span>
          </div>
        </div>

      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000 }}>
          <div style={{ width: '90%', maxWidth: '420px', background: '#FFF', borderRadius: '12px', padding: '24px', border: '1px solid var(--border)', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>{selectedProduct.nombre}</h3>
                <span style={{ fontSize: '10px', color: '#D31245', fontWeight: '700', textTransform: 'uppercase' }}>{selectedProduct.categoria}</span>
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
              style={{ width: '100%', justifyContent: 'center', background: '#D31245', borderColor: '#D31245', borderRadius: '8px', padding: '10px' }}
            >
              Ver Recetas & Soluciones Técnicas
            </button>
          </div>
        </div>
      )}

      {/* Modal del Asistente de Voz */}
      {modalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2500 }}>
          <div style={{ width: '90%', maxWidth: '520px', height: '70vh', maxHeight: '600px', backgroundColor: 'var(--bg-card)', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Modal Header */}
            <div style={{ padding: '16px 20px', background: 'linear-gradient(135deg, #1E40AF 0%, #D31245 100%)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', background: '#FAFAFA' }}>
              {chatMsgs.map((msg, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                  {msg.role === 'assistant' && (
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #1E40AF 0%, #D31245 100%)', color: 'white', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>AI</div>
                  )}
                  <div>
                    <div style={{ backgroundColor: msg.role === 'user' ? '#D31245' : 'var(--bg-card)', color: msg.role === 'user' ? 'white' : 'var(--text-primary)', padding: '12px 16px', borderRadius: msg.role === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px', fontSize: '13px', lineHeight: 1.5, border: msg.role === 'user' ? 'none' : '1px solid var(--border)' }}>
                      {msg.content}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px', textAlign: msg.role === 'user' ? 'right' : 'left' }}>{msg.time}</div>
                  </div>
                </div>
              ))}
              {loadingIA && (
                <div style={{ display: 'flex', gap: '10px', alignSelf: 'flex-start' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #1E40AF 0%, #D31245 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>AI</div>
                  <div style={{ backgroundColor: 'var(--bg-card)', padding: '12px 16px', borderRadius: '12px 12px 12px 4px', border: '1px solid var(--border)' }}>
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
            <div style={{ padding: '16px 20px', backgroundColor: 'var(--bg-card)', borderTop: '1px solid var(--border)', display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button onClick={iniciarEscucha} disabled={escuchando || loadingIA} style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', background: escuchando ? 'linear-gradient(135deg, #EF4444, #F59E0B)' : 'linear-gradient(135deg, #1E40AF 0%, #D31245 100%)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mic size={18} />
              </button>
              <input value={mensaje} onChange={e => setMensaje(e.target.value)} onKeyDown={e => e.key === 'Enter' && enviarMensaje(mensaje)} placeholder={escuchando ? 'Escuchando...' : 'Escribe tu consulta...'} disabled={escuchando || loadingIA} style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: '#FAFAFA', outline: 'none', fontSize: '13px' }} />
              <button onClick={() => enviarMensaje(mensaje)} disabled={escuchando || loadingIA || !mensaje.trim()} className="btn-primary" style={{ padding: '10px', background: '#D31245', borderColor: '#D31245', borderRadius: '8px' }}><Send size={15} /></button>
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
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>

    </div>
  );
};