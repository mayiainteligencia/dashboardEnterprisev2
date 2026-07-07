import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, Upload, Play, Star, Sparkles, 
  Users, BarChart3, BookOpen, Award, Send, 
  TrendingUp, Globe, FileText, Bot, CheckCircle, Clock, Zap
} from 'lucide-react';
import { WAI_BRAND_CONFIG } from '../../config/branding';
import { EarthGlobe } from './EarthGlobe';

function useCountdown(targetDate: string) {
  const calculate = () => {
    const diff = new Date(targetDate).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    };
  };
  const [time, setTime] = useState(calculate);
  useEffect(() => {
    const id = setInterval(() => setTime(calculate()), 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return time;
}

// Datos de las participantes destacadas
const PARTICIPANTES = [
  { nombre: "Dra. Amanda Carballo-Pérez", cargo: "Científica & AI Strategist", institucion: "NEORIS - EPAM Méx.", imgLetter: "A" },
  { nombre: "Dra. Sylvia Conde", cargo: "Investigadora Titular", institucion: "Instituto de IA UNAM", imgLetter: "S" },
  { nombre: "Ing. Mariana Costa", cargo: "CTO", institucion: "Bitso", imgLetter: "M" },
  { nombre: "Mtra. Alejandra Lagunes", cargo: "Directora de IA", institucion: "BBVA México", imgLetter: "L" },
  { nombre: "Dra. Karen Villeda", cargo: "Co-fundadora", institucion: "C Minds", imgLetter: "K" },
  { nombre: "Mtra. Diana Rosas", cargo: "Head of Data & AI", institucion: "Liverpool", imgLetter: "D" },
  { nombre: "Dra. Verónica Viniegra", cargo: "Líder de Estrategia WAI", institucion: "Women in AI México", imgLetter: "V" },
];

// Mesas temáticas
const MESAS = [
  { num: "01", tema: "Talento y Formación", desc: "¿Qué debe pasar para que más mujeres lideren en IA en México?", color: "#D4AF37" },
  { num: "02", tema: "IA y Competitividad", desc: "¿Cómo llevar la IA a la adopción real con impacto económico?", color: "#8B5CF6" },
  { num: "03", tema: "Gobernanza y Confianza", desc: "¿Qué marcos hacen viable una IA ética, útil y transparente?", color: "#FF4081" },
  { num: "04", tema: "Investigación y Transferencia", desc: "¿Cómo conectar de forma efectiva la academia y la empresa?", color: "#10B981" },
  { num: "05", tema: "Emprendimiento y Capital", desc: "¿Qué necesitan las fundadoras de IA para escalar y recibir inversión?", color: "#3B82F6" },
  { num: "06", tema: "Liderazgo y Representación", desc: "¿Cómo visibilizar a las mujeres que ya construyen la IA del país?", color: "#EF4444" },
];

export const WaiDashboard: React.FC = () => {
  const theme = WAI_BRAND_CONFIG.theme;
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [inputText, setInputText] = useState("");
  const [activeDelegation, setActiveDelegation] = useState("industria");
  const [documentosEnviados, setDocumentosEnviados] = useState(1248);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const countdown = useCountdown(WAI_BRAND_CONFIG.evento.fechaISO);

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % (PARTICIPANTES.length - 3));
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + (PARTICIPANTES.length - 3)) % (PARTICIPANTES.length - 3));
  };

  const handleUploadClick = () => {
    setFileUploaded(true);
    setDocumentosEnviados(prev => prev + 1);
    setSuccessMsg("Insumo cargado exitosamente. La IA de WAI está procesando tu archivo...");
    setTimeout(() => setSuccessMsg(""), 5000);
  };

  const handleSendText = () => {
    if (!inputText.trim()) return;
    setInputText("");
    setDocumentosEnviados(prev => prev + 1);
    setSuccessMsg("Tu propuesta ha sido enviada para la redacción de la Declaratoria.");
    setTimeout(() => setSuccessMsg(""), 5000);
  };

  return (
    <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>

      {/* 0. BARRA DE PULSO — Datos reales WAI */}
      <div style={{
        backgroundColor: theme.cardBgGlass,
        border: `1px solid ${theme.border}`,
        borderRadius: '14px',
        padding: '14px 24px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '24px',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Countdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Clock size={16} color={theme.secondary} />
          <span style={{ fontSize: '10px', color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '1px' }}>Faltan para el Summit:</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[{v: countdown.days, l:'Días'},{v: countdown.hours, l:'Hrs'},{v: countdown.minutes, l:'Min'},{v: countdown.seconds, l:'Seg'}].map(t => (
              <div key={t.l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: '900', color: theme.secondary, lineHeight: 1 }}>{String(t.v).padStart(2,'0')}</div>
                <div style={{ fontSize: '8px', color: theme.textMuted, textTransform: 'uppercase' }}>{t.l}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Métricas reales */}
        {[
          { label: 'Miembros Globales WAI', value: '+19,000', color: theme.secondary },
          { label: 'Países', value: '150+', color: theme.teal },
          { label: 'Asistentes Confirmadas', value: '187 / 250', color: theme.accent },
          { label: 'Insumos Recibidos', value: `${documentosEnviados.toLocaleString()}`, color: '#8B5CF6' },
          { label: 'Delegaciones Activas', value: '7 / 7', color: '#F97316' },
        ].map(m => (
          <div key={m.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '16px', fontWeight: '800', color: m.color }}>{m.value}</div>
            <div style={{ fontSize: '9px', color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{m.label}</div>
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', animation: 'pulse 2s infinite' }} />
          <span style={{ fontSize: '10px', color: '#10B981', fontWeight: '700' }}>Plataforma en vivo</span>
        </div>
      </div>
      
      {/* 1. HERO BANNER */}
      <div 
        style={{ 
          background: `linear-gradient(135deg, rgba(31, 73, 125, 0.4) 0%, rgba(2, 11, 28, 0.9) 100%)`,
          border: `1.5px solid ${theme.border}`,
          borderRadius: '24px',
          padding: '48px clamp(20px, 5vw, 64px)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: `0 20px 50px rgba(2, 11, 28, 0.6), inset 0 0 30px rgba(255, 192, 0, 0.05)`
        }}
      >
        {/* Glow de fondo */}
        <div style={{
          position: 'absolute', top: '-100px', right: '-100px',
          width: '350px', height: '350px', borderRadius: '50%',
          background: `radial-gradient(circle, rgba(255, 192, 0, 0.12) 0%, transparent 70%)`,
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: '-50px', left: '-50px',
          width: '250px', height: '250px', borderRadius: '50%',
          background: `radial-gradient(circle, rgba(255, 64, 129, 0.08) 0%, transparent 70%)`,
          pointerEvents: 'none'
        }} />

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '40px',
          flexWrap: 'wrap-reverse',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Left Side: Hero Text and Actions */}
          <div style={{ flex: '1 1 500px', maxWidth: '850px' }}>
            <span 
              style={{ 
                fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', 
                color: theme.secondary, letterSpacing: '2px', display: 'inline-flex',
                alignItems: 'center', gap: '8px', marginBottom: '16px' 
              }}
            >
              <Sparkles size={14} fill={theme.secondary} />
              Primera Asamblea de Women in AI en México · Septiembre 24, 2026
            </span>
            <h1 
              style={{ 
                fontSize: 'clamp(28px, 4.5vw, 52px)', fontWeight: '800', lineHeight: 1.15,
                color: '#FFFFFF', margin: '0 0 20px 0', letterSpacing: '-1px' 
              }}
            >
              La inteligencia artificial de México también será definida <span style={{ 
                background: `linear-gradient(90deg, ${theme.secondary} 0%, #FF8C00 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                fontWeight: '900'
              }}>por mujeres.</span>
            </h1>
            <p 
              style={{ 
                fontSize: 'clamp(14px, 1.8vw, 17px)', color: theme.textSecondary, 
                lineHeight: 1.6, margin: '0 0 32px 0', fontWeight: '400' 
              }}
            >
              Gobierno, academia, industria, desarrolladoras y sociedad civil convergen en una plataforma única para co-crear el futuro de la IA con visión, inclusión y trazabilidad responsable.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button 
                style={{
                  backgroundColor: theme.secondary,
                  color: '#020B1C',
                  border: 'none',
                  padding: '14px 28px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: `0 8px 24px rgba(212, 175, 55, 0.3)`,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 12px 28px rgba(212, 175, 55, 0.45)`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 8px 24px rgba(212, 175, 55, 0.3)`;
                }}
              >
                Solicitar invitación →
              </button>
              <button 
                style={{
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  color: '#FFFFFF',
                  border: `1.5px solid rgba(255,255,255,0.15)`,
                  padding: '12px 26px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.border = `1.5px solid ${theme.secondary}`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.border = `1.5px solid rgba(255,255,255,0.15)`;
                }}
              >
                Conocer la declaratoria (PDF)
              </button>
            </div>
          </div>

          {/* Right Side: Real-time 3D Earth Globe Visualizer */}
          <div 
            style={{
              flex: '0 0 auto',
              width: '320px',
              height: '320px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              margin: '0 auto',
              overflow: 'hidden',
              borderRadius: '50%',
              border: `1.5px solid rgba(212, 175, 55, 0.35)`,
              boxShadow: '0 0 50px rgba(212, 175, 55, 0.25)',
              background: 'radial-gradient(circle, rgba(10, 25, 47, 0.9) 0%, rgba(2, 11, 28, 0.98) 100%)',
            }}
          >
            <EarthGlobe width={320} height={320} />
          </div>
        </div>
      </div>

      {/* 2. SPONSORS BAR — datos reales womeninai.co */}
      <div 
        style={{
          backgroundColor: theme.cardBgGlass,
          border: `1px solid ${theme.border}`,
          borderRadius: '16px',
          padding: '20px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '10px', color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '1px' }}>MARCA PROTAGONISTA</span>
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: theme.secondary, letterSpacing: '1px' }}>NEORIS</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '10px', color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '1px' }}>ALIADOS ESTRATÉGICOS WAI:</span>
          {WAI_BRAND_CONFIG.sponsors.slice(1).map((s) => (
            <span key={s.nombre} style={{ fontSize: '13px', fontWeight: '700', color: s.nivel === 'gold' ? theme.secondary : '#94A3B8', opacity: 0.9, cursor: 'default' }}>{s.nombre}</span>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Zap size={12} color={theme.secondary} />
          <span style={{ fontSize: '10px', color: theme.secondary, fontWeight: '700' }}>+150,000 líderes en nuestra red</span>
        </div>
      </div>

      {/* 3. PARTICIPANTES DESTACADAS (CAROUSEL SLIDER) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>Participantes Destacadas</h2>
            <p style={{ fontSize: '12px', color: theme.textSecondary, margin: '4px 0 0' }}>Mujeres líderes construyendo la Inteligencia Artificial en México</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={prevSlide}
              style={{
                width: '40px', height: '40px', borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.03)', border: `1px solid ${theme.border}`,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#FFFFFF', transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255, 192, 0, 0.15)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'}
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextSlide}
              style={{
                width: '40px', height: '40px', borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.03)', border: `1px solid ${theme.border}`,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#FFFFFF', transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255, 192, 0, 0.15)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            overflow: 'hidden'
          }}
        >
          {PARTICIPANTES.slice(carouselIndex, carouselIndex + 4).map((p, idx) => (
            <div 
              key={p.nombre}
              style={{
                backgroundColor: theme.cardBgGlass,
                border: `1.5px solid ${theme.border}`,
                borderRadius: '16px',
                padding: '24px 20px',
                textAlign: 'center',
                position: 'relative',
                boxShadow: `0 10px 24px rgba(2, 11, 28, 0.3)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '14px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = theme.secondary;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = theme.border;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Photo Avatar Placeholder with glow */}
              <div 
                style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '24px', fontWeight: 'bold', color: '#FFFFFF',
                  boxShadow: `0 0 15px rgba(255, 64, 129, 0.25)`,
                }}
              >
                {p.imgLetter}
              </div>

              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#FFFFFF', margin: '0 0 4px 0' }}>{p.nombre}</h4>
                <p style={{ fontSize: '11px', color: theme.secondary, fontWeight: '600', margin: '0 0 2px 0' }}>{p.cargo}</p>
                <p style={{ fontSize: '11px', color: theme.textSecondary, margin: 0 }}>{p.institucion}</p>
              </div>

              {/* Tag / Badge */}
              <span 
                style={{
                  fontSize: '9px', fontWeight: '700', textTransform: 'uppercase',
                  color: '#FFFFFF', backgroundColor: 'rgba(255, 64, 129, 0.15)',
                  border: `1px solid ${theme.accent}`, borderRadius: '20px',
                  padding: '3px 8px', marginTop: 'auto'
                }}
              >
                Ponente WAI
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. DELEGACIONES ECOSISTEMA */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>Delegaciones del Ecosistema WAI</h2>
          <p style={{ fontSize: '12px', color: theme.textSecondary, margin: '4px 0 0' }}>Objetivos temáticos y aportaciones estructuradas por sector</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
          {[
            { id: "gobierno", label: "Gobierno", icon: Globe },
            { id: "academia", label: "Academia", icon: BookOpen },
            { id: "industria", label: "Industria", icon: BarChart3 },
            { id: "startups", label: "Startups", icon: Sparkles },
            { id: "camaras", label: "Cámaras", icon: Users },
            { id: "talento", label: "Talento", icon: Award },
            { id: "sponsors", label: "Sponsors", icon: Star },
            { id: "medios", label: "Medios", icon: FileText },
          ].map((item) => {
            const Icon = item.icon;
            const isSel = activeDelegation === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveDelegation(item.id)}
                style={{
                  backgroundColor: isSel ? 'rgba(255, 192, 0, 0.12)' : theme.cardBgGlass,
                  border: isSel ? `1.5px solid ${theme.secondary}` : `1px solid ${theme.border}`,
                  borderRadius: '12px',
                  padding: '16px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  color: isSel ? theme.secondary : '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: isSel ? `0 0 15px rgba(255, 192, 0, 0.15)` : 'none'
                }}
                onMouseEnter={e => { if(!isSel) e.currentTarget.style.borderColor = theme.secondary; }}
                onMouseLeave={e => { if(!isSel) e.currentTarget.style.borderColor = theme.border; }}
              >
                <Icon size={20} />
                <span style={{ fontSize: '12px', fontWeight: '600' }}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. WAI AI DECLARATION STUDIO (IA) */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '24px'
        }}
      >
        {/* Caja de Insumos */}
        <div 
          style={{
            backgroundColor: theme.cardBgGlass,
            border: `1.5px solid ${theme.border}`,
            borderRadius: '20px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bot size={20} color={theme.secondary} />
            <h3 style={{ fontSize: '18px', fontWeight: '850', color: '#FFFFFF', margin: 0 }}>WAI AI Declaration Studio</h3>
          </div>
          <p style={{ fontSize: '12px', color: theme.textSecondary, margin: 0, lineHeight: 1.5 }}>
            Ingresa tu propuesta o carga un informe de diagnóstico. Los agentes IA analizarán el texto para consolidar la agenda en vivo.
          </p>

          <div style={{ position: 'relative' }}>
            <textarea 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Comparte tu propuesta, compromiso o diagnóstico para la asamblea..."
              style={{
                width: '100%',
                height: '110px',
                backgroundColor: '#020B1C',
                border: `1px solid ${theme.border}`,
                borderRadius: '12px',
                padding: '12px',
                color: '#FFFFFF',
                fontSize: '13px',
                fontFamily: 'inherit',
                resize: 'none',
                outline: 'none',
                boxShadow: `inset 0 2px 4px rgba(0,0,0,0.5)`
              }}
            />
            <button
              onClick={handleSendText}
              style={{
                position: 'absolute', bottom: '12px', right: '12px',
                width: '36px', height: '36px', borderRadius: '50%',
                backgroundColor: theme.secondary, border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#020B1C'
              }}
            >
              <Send size={15} />
            </button>
          </div>

          {/* Drag & Drop area */}
          <div 
            onClick={handleUploadClick}
            style={{
              border: `2px dashed ${fileUploaded ? theme.accent : theme.border}`,
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: 'rgba(255, 255, 255, 0.01)',
              transition: 'all 0.2s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Upload size={22} color={fileUploaded ? theme.accent : theme.textSecondary} />
            <div>
              <p style={{ fontSize: '12px', color: '#FFFFFF', margin: 0, fontWeight: '600' }}>
                {fileUploaded ? "¡Documento subido!" : "Sube tu documento, imagen o texto"}
              </p>
              <p style={{ fontSize: '10px', color: theme.textMuted, margin: '2px 0 0' }}>
                PDF, DOCX, PNG o JPG · Máximo 10MB
              </p>
            </div>
          </div>

          {successMsg && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: theme.accent, fontSize: '11px', fontWeight: '600' }}>
              <CheckCircle size={14} />
              <span>{successMsg}</span>
            </div>
          )}
        </div>

        {/* Estadísticas de la Declaratoria */}
        <div 
          style={{
            backgroundColor: theme.cardBgGlass,
            border: `1.5px solid ${theme.border}`,
            borderRadius: '20px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '20px'
          }}
        >
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#FFFFFF', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>Progreso de la Declaratoria WAI</h4>
            
            {/* Progress bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 'bold', color: theme.secondary, marginBottom: '6px' }}>
              <span>Consolidación de Borrador v0.8</span>
              <span>65%</span>
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
              <div style={{ width: '65%', height: '100%', background: `linear-gradient(90deg, ${theme.primary} 0%, ${theme.secondary} 100%)`, borderRadius: '4px' }} />
            </div>
            <p style={{ fontSize: '10px', color: theme.textSecondary, margin: 0, lineHeight: 1.4 }}>
              * La IA está analizando las propuestas de las delegaciones. El borrador preliminar será publicado en la asamblea plenaria.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', padding: '12px', borderRadius: '10px', textAlign: 'center', border: `1px solid rgba(255,255,255,0.03)` }}>
              <span style={{ fontSize: '20px', fontWeight: '900', color: theme.secondary, display: 'block' }}>{documentosEnviados}</span>
              <span style={{ fontSize: '9px', color: theme.textSecondary, textTransform: 'uppercase' }}>Aportes recibidos</span>
            </div>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', padding: '12px', borderRadius: '10px', textAlign: 'center', border: `1px solid rgba(255,255,255,0.03)` }}>
              <span style={{ fontSize: '20px', fontWeight: '900', color: '#FFFFFF', display: 'block' }}>6</span>
              <span style={{ fontSize: '9px', color: theme.textSecondary, textTransform: 'uppercase' }}>Mesas activas</span>
            </div>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', padding: '12px', borderRadius: '10px', textAlign: 'center', border: `1px solid rgba(255,255,255,0.03)` }}>
              <span style={{ fontSize: '20px', fontWeight: '900', color: theme.accent, display: 'block' }}>342</span>
              <span style={{ fontSize: '9px', color: theme.textSecondary, textTransform: 'uppercase' }}>Validaciones AI</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. LAS SEIS MESAS TEMÁTICAS DE LA ASAMBLEA */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>Las Seis Mesas Temáticas de la Asamblea</h2>
          <p style={{ fontSize: '12px', color: theme.textSecondary, margin: '4px 0 0' }}>Puntos fundamentales para construir la Declaratoria WAI México 2026</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {MESAS.map((m) => (
            <div 
              key={m.num}
              style={{
                backgroundColor: theme.cardBgGlass,
                border: `1.5px solid ${theme.border}`,
                borderRadius: '16px',
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.25s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = m.color;
                e.currentTarget.style.boxShadow = `0 10px 20px rgba(2, 11, 28, 0.4)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = theme.border;
                e.currentTarget.style.boxShadow = `none`;
              }}
            >
              {/* Top border decorativo */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', backgroundColor: m.color }} />
              
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: m.color, textTransform: 'uppercase', letterSpacing: '1px' }}>Mesa {m.num}</span>
              <h4 style={{ fontSize: '15px', fontWeight: '750', color: '#FFFFFF', margin: 0 }}>{m.tema}</h4>
              <p style={{ fontSize: '12px', color: theme.textSecondary, margin: 0, lineHeight: 1.5, flex: 1 }}>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 7. OBSERVATORIO / TERMÓMETRO IA (KPI CARDS) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>Observatorio del Ecosistema IA México</h2>
          <p style={{ fontSize: '12px', color: theme.textSecondary, margin: '4px 0 0' }}>Indicadores clave de liderazgo, adopción y talento tecnológico</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {[
            { label: "Adopción Empresarial", value: "42%", trend: "+8% vs 2024", color: theme.secondary },
            { label: "Talento en IA", value: "68,400", trend: "+12% vs 2024", color: "#10B981" },
            { label: "Confianza Pública", value: "56%", trend: "+5% vs 2024", color: theme.accent },
            { label: "Inversión (USD)", value: "1.2B", trend: "+18% vs 2024", color: "#3B82F6" },
            { label: "Participación Femenina", value: "31%", trend: "+6% vs 2024", color: "#8B5CF6" },
            { label: "Alianzas Activas", value: "245", trend: "+22% vs 2024", color: "#F59E0B" },
          ].map((k) => (
            <div 
              key={k.label}
              style={{
                backgroundColor: theme.cardBgGlass,
                border: `1.5px solid ${theme.border}`,
                borderRadius: '14px',
                padding: '20px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                position: 'relative'
              }}
            >
              <span style={{ fontSize: '11px', color: theme.textSecondary, fontWeight: '500' }}>{k.label}</span>
              <span style={{ fontSize: '26px', fontWeight: '900', color: '#FFFFFF' }}>{k.value}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: k.color, fontWeight: '700' }}>
                <TrendingUp size={12} />
                <span>{k.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8. CONVERSACIONES WAI - PODCAST */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>Conversaciones WAI - Podcast</h2>
          <p style={{ fontSize: '12px', color: theme.textSecondary, margin: '4px 0 0' }}>Entrevistas con investigadoras y líderes globales de inteligencia artificial</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {[
            { ep: "EP. 12", titulo: "IA con propósito desde la academia", inv: "Dra. Sylvia Conde", dur: "24 min", imgLetter: "S" },
            { ep: "EP. 11", titulo: "Liderazgo femenino en la industria tech", inv: "Ing. Mariana Costa", dur: "26 min", imgLetter: "M" },
            { ep: "EP. 10", titulo: "Gobernanza y confianza en la era de la IA", inv: "Dra. Karen Villeda", dur: "28 min", imgLetter: "K" },
          ].map((pod) => (
            <div 
              key={pod.ep}
              style={{
                backgroundColor: theme.cardBgGlass,
                border: `1.5px solid ${theme.border}`,
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = theme.secondary}
              onMouseLeave={e => e.currentTarget.style.borderColor = theme.border}
            >
              <div 
                style={{
                  width: '48px', height: '48px', borderRadius: '10px',
                  background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#FFFFFF', fontWeight: 'bold', fontSize: '16px',
                  flexShrink: 0
                }}
              >
                {pod.imgLetter}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: '9px', fontWeight: '800', color: theme.secondary, display: 'block' }}>{pod.ep}</span>
                <h5 style={{ fontSize: '12px', fontWeight: '700', color: '#FFFFFF', margin: '2px 0', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{pod.titulo}</h5>
                <span style={{ fontSize: '11px', color: theme.textSecondary }}>{pod.inv} · {pod.dur}</span>
              </div>

              <button
                style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.05)', border: `1px solid rgba(255,255,255,0.1)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#FFFFFF', cursor: 'pointer'
                }}
              >
                <Play size={12} fill="#FFFFFF" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
