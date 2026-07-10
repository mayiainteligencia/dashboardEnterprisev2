import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, ChevronRight, Upload, Play, Star, Sparkles, 
  Users, BarChart3, BookOpen, Award, Send, 
  TrendingUp, Globe, FileText, Bot, CheckCircle, Clock, Zap,
  Mic, Network
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

// Datos de las participantes destacadas han sido removidos (carrusel inactivo)

// Mesas temáticas
const MESAS = [
  { num: "01", tema: "Talento y Formación", desc: "¿Qué debe pasar para que más mujeres lideren en IA en México?", color: "#D4AF37" },
  { num: "02", tema: "IA y Competitividad", desc: "¿Cómo llevar la IA a la adopción real con impacto económico?", color: "#8B5CF6" },
  { num: "03", tema: "Gobernanza y Confianza", desc: "¿Qué marcos hacen viable una IA ética, útil y transparente?", color: "#FF4081" },
  { num: "04", tema: "Investigación y Transferencia", desc: "¿Cómo conectar de forma efectiva la academia y la empresa?", color: "#10B981" },
  { num: "05", tema: "Emprendimiento y Capital", desc: "¿Qué necesitan las fundadoras de IA para escalar y recibir inversión?", color: "#3B82F6" },
  { num: "06", tema: "Liderazgo y Representación", desc: "¿Cómo visibilizar a las mujeres que ya construyen la IA del país?", color: "#EF4444" },
];

const HOTSPOTS = [
  { id: 1, nombre: "Mtra. Ivete Sánchez Bravo", rol: "Embajadora WAI México", img: "/contribuidoras/ivete.jpeg", top: '21.0%', left: '50.0%', desc: "Líder nacional de WAI y Coordinadora de Servicios Tecnológicos en CIMAT. Con más de 15 años de experiencia, impulsa la transferencia tecnológica, la divulgación científica y la inserción equitativa de mujeres en STEM e IA." },
  { id: 2, nombre: "Lic. Verónica Viniegra", rol: "Co-Embajadora WAI México", img: "/contribuidoras/Vero.jpeg", top: '22.7%', left: '59.9%', desc: "Líder del capítulo nacional WAI y Directora de MAYIA. Especialista en la democratización del acceso a tecnologías inteligentes, soberanía de infraestructura y modelos de impacto." },
  { id: 3, nombre: "Lic. Susan Verdiguel", rol: "Embajadora WAI México", img: "/contribuidoras/Azucena.jpeg", top: '27.8%', left: '68.6%', desc: "Embajadora principal de Women in AI México y líder en la promoción de proyectos tecnológicos inclusivos. Impulsa el desarrollo de políticas públicas de IA, ética tecnológica y el empoderamiento de las mujeres en el ecosistema digital." },
  { id: 4, nombre: "Lic. Bárbara Ruiz-Rodríguez", rol: "Core Team WAI México", img: "/contribuidoras/Barbara.jpeg", top: '35.5%', left: '75.1%', desc: "Líder de alianzas estratégicas globales y capital de riesgo. Conecta startups tecnológicas locales co-fundadas por mujeres con fondos y aceleradoras de Silicon Valley." },
  { id: 5, nombre: "Mtra. Elbia Elaine Castillo", rol: "Core Team WAI México", img: "/contribuidoras/Elbia.jpeg", top: '45.0%', left: '78.6%', desc: "Vicepresidenta Senior de Automatización y Transformación Digital en Scotiabank. Experta en gobernanza de datos, automatización de procesos y cumplimiento tecnológico, impulsando la inclusión en el sector financiero." },
  { id: 6, merge: true, nombre: "Mtra. Karina Regalado", rol: "Core Team WAI México", img: "/contribuidoras/Karina.jpeg", top: '55.0%', left: '78.6%', desc: "Directora educativa del capítulo. Coordina bootcamps prácticos, mentorías técnicas y hackathons orientados a la capacitación de niñas y jóvenes en STEM." },
  { id: 7, nombre: "Dra. María de la Paz Rico-Fernández", rol: "Core Team WAI México", img: "/contribuidoras/María.jpeg", top: '64.5%', left: '75.1%', desc: "Doctora en Ciencias (Robótica y Manufactura Avanzada) por el CINVESTAV. Gerente de analítica avanzada, experta en visión artificial y finalista de los WAI Awards NA." },
  { id: 8, nombre: "Dra. Nayana María Guerrero", rol: "Core Team WAI México", img: "/contribuidoras/Nayana.jpeg", top: '72.2%', left: '68.6%', desc: "Doctora en Ciencias Administrativas (UNAM) y docente en el Tec de Monterrey. Lidera investigaciones sobre IA y ética empresarial, y coordina comités de impacto nacional." },
  { id: 9, nombre: "Lic. Samantha Delfín-Azuara", rol: "Core Team WAI México", img: "/contribuidoras/Samantha.jpeg", top: '77.3%', left: '59.9%', desc: "Coordinadora de eventos y comunidad nacional. Responsable de la logística del Summit Anual y de los meetups mensuales que conectan a la red a nivel federal." },
  { id: 10, nombre: "Dra. Selene Fernández-Valverde", rol: "Core Team WAI México", img: "/contribuidoras/Selene.jpeg", top: '79.0%', left: '50.0%', desc: "Científica genómica y bioinformática con doctorado por la Universidad de Queensland. Investigadora del CINVESTAV, especialista en genómica y galardonada por L'Oréal-UNESCO." },
  { id: 11, nombre: "Ing. Yslen González", rol: "Core Team WAI México", img: "/contribuidoras/Yslen.jpeg", top: '77.3%', left: '40.1%', desc: "Ingeniera en Biónica por el IPN y líder de WAI Ciudad de México. Cloud & DevOps Engineer orientada a impulsar carreras STEM e inspirar a niñas en la inclusión tecnológica." },
  { id: 12, nombre: "Lic. Zulema Estrada", rol: "Core Team WAI México", img: "/contribuidoras/Zulema.jpeg", top: '72.2%', left: '31.4%', desc: "General Manager de Humind Care y business developer. Fomenta el empoderamiento económico y coordina el acceso a capital semilla para fundadoras del sector tecnológico." },
  { id: 13, nombre: "Dra. Brenda Carballo-Pérez", rol: "VP of Data & AI en NEORIS-EPAM", img: "B", top: '64.5%', left: '24.9%', desc: "Doctora en Física de Partículas, fundadora de startups tecnológicas y actual VP de Data & AI en NEORIS. Reconocida como una de las líderes clave en IA en el país y Honorary Chair de WAI." },
  { id: 14, nombre: "Dra. Sylvia Conde", rol: "Doctora en Pedagogía (UNAM)", img: "S", top: '55.0%', left: '21.4%', desc: "Doctora en Pedagogía por la UNAM con una amplia trayectoria en ética y formación ciudadana. Asesora académica que impulsa el estudio ético de las tecnologías emergentes en la educación." },
  { id: 15, nombre: "Mtra. Mariana Costa", rol: "Cofundadora de Laboratoria & Tech Leader", img: "M", top: '45.0%', left: '21.4%', desc: "Maestra en Administración Pública (Columbia) y cofundadora de Laboratoria. Dedicada a formar a miles de mujeres de América Latina en programación y diseño UX para cerrar la brecha de género." },
  { id: 16, nombre: "Lic. Alejandra Lagunes", rol: "Co-fundadora de ANIA y BBVA México", img: "A", top: '35.5%', left: '24.9%', desc: "Licenciada en Comunicación (ITESM), ex-Senadora e impulsora clave de la Alianza Nacional de Inteligencia Artificial (ANIA). Promotora de políticas públicas soberanas y éticas en tecnología." },
  { id: 17, nombre: "Lic. Karen Villeda", rol: "Co-fundadora C Minds & Investigadora Digital", img: "K", top: '27.8%', left: '31.4%', desc: "Escritora, investigadora y cofundadora de proyectos en C Minds. Especializada en la intersección de las humanidades digitales, impacto ético de algoritmos y sesgo creativo de la IA." },
  { id: 18, nombre: "Act. Alicia López Rodríguez", rol: "Senior Head of Data Science en El Puerto de Liverpool", img: "D", top: '22.7%', left: '40.1%', desc: "Actuaria egresada de la UNAM y Senior Head of Data Science en El Puerto de Liverpool. Experta en modelado estadístico, análisis de datos y machine learning aplicado al sector retail." },
];

export const WaiDashboard: React.FC = () => {
  const theme = WAI_BRAND_CONFIG.theme;
  const [activeHotspot, setActiveHotspot] = useState(0);
  const [inputText, setInputText] = useState("");
  const [activeDelegation, setActiveDelegation] = useState("industria");
  const [documentosEnviados, setDocumentosEnviados] = useState(1248);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const countdown = useCountdown(WAI_BRAND_CONFIG.evento.fechaISO);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHotspot((prev) => (prev + 1) % HOTSPOTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);



  // Navegación de carrusel de participantes destacadas removida

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileUploaded(true);
    setDocumentosEnviados(prev => prev + 1);
    setSuccessMsg(`¡Archivo "${file.name}" cargado exitosamente! La IA de WAI está procesando tu informe...`);
    setTimeout(() => setSuccessMsg(""), 6000);
  };

  const handleSendText = () => {
    if (!inputText.trim()) return;
    setInputText("");
    setDocumentosEnviados(prev => prev + 1);
    setSuccessMsg("Tu propuesta ha sido enviada para la redacción de la Declaratoria.");
    setTimeout(() => setSuccessMsg(""), 5000);
  };

  const aiDots = [
    { name: "Gemini 2.5 Flash", func: "Redacción y Síntesis de Propuestas", stat: "Latencia: 110ms", color: theme.secondary },
    { name: "WAI Moderación Agent", func: "Mitigación de Sesgos de Género", stat: "Comprobado: 100% Ético", color: theme.teal },
    { name: "Asamblea Consensus Engine", func: "Coincidencia de Enfoques Temáticos", stat: "Coincidencia: 98.4%", color: "#8B5CF6" },
    { name: "WAI Ecosistema Mapper", func: "Directorio & Grafo de Talentos", stat: "Relaciones: 12.4k", color: theme.accent },
    { name: "Voice-to-Text Summarizer", func: "Procesador de Relatoría en Vivo", stat: "Precisión: 99.2%", color: "#F97316" },
    { name: "Predictor de Impacto 2030", func: "Modelos de Inclusión Laboral", stat: "Modelados: 8 Escenarios", color: "#EC4899" }
  ];
  const [activeAiIndex, setActiveAiIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAiIndex((prev) => (prev + 1) % aiDots.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [aiDots.length]);

  return (
    <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>

      {/* MONITOREO DE AGENTES IA EN VIVO - CARRUSEL DE SISTEMAS */}
      <div style={{
        width: '100%',
        background: 'linear-gradient(135deg, rgba(10, 25, 47, 0.5) 0%, rgba(2, 11, 28, 0.75) 100%)',
        border: `1.5px solid ${theme.border}`,
        borderRadius: '16px',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        boxShadow: '0 8px 32px rgba(2, 11, 28, 0.4)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Ambient background light matching active AI color */}
        <div style={{
          position: 'absolute', top: 0, left: 0, bottom: 0, width: '4px',
          backgroundColor: aiDots[activeAiIndex].color,
          boxShadow: `0 0 10px ${aiDots[activeAiIndex].color}`,
          transition: 'background-color 0.4s'
        }} />

        {/* Left Section: Monitor Tag */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Bot size={13} color={theme.secondary} />
            <span style={{ fontSize: '9px', fontWeight: '850', color: theme.textSecondary, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Motores Cognitivos
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: '900', color: '#FFFFFF' }}>WAI AI Agent Hub</span>
            <span style={{ fontSize: '8px', fontWeight: '900', color: '#10B981', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '1px 5px', borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
              6 ACTIVOS
            </span>
          </div>
        </div>

        {/* Middle Section: Auto-cycling Active AI Info */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          animation: 'alertEnter 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          minWidth: 0
        }} key={activeAiIndex}>
          {/* AI Icon with active glow */}
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: `1px solid rgba(255, 255, 255, 0.08)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: aiDots[activeAiIndex].color,
            boxShadow: `0 0 10px ${aiDots[activeAiIndex].color}22`,
            flexShrink: 0
          }}>
            {aiDots[activeAiIndex].name.includes("Gemini") && <Bot size={18} />}
            {aiDots[activeAiIndex].name.includes("Moderación") && <Award size={18} />}
            {aiDots[activeAiIndex].name.includes("Consensus") && <Users size={18} />}
            {aiDots[activeAiIndex].name.includes("Mapper") && <Network size={18} />}
            {aiDots[activeAiIndex].name.includes("Summarizer") && <Mic size={18} />}
            {aiDots[activeAiIndex].name.includes("Predictor") && <TrendingUp size={18} />}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h5 style={{ margin: 0, fontSize: '13px', fontWeight: '800', color: '#FFFFFF' }}>
                {aiDots[activeAiIndex].name}
              </h5>
              <span style={{ fontSize: '8px', fontWeight: '950', color: aiDots[activeAiIndex].color, border: `1px solid ${aiDots[activeAiIndex].color}44`, padding: '1px 6px', borderRadius: '10px', backgroundColor: `${aiDots[activeAiIndex].color}11` }}>
                {aiDots[activeAiIndex].stat}
              </span>
            </div>
            <p style={{ margin: '3px 0 0', fontSize: '11px', color: theme.textSecondary, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
              {aiDots[activeAiIndex].func}
            </p>
          </div>
        </div>

        {/* Right Section: Navigation Controls & Dots */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
          {/* Ticker dots */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {aiDots.map((dot, idx) => (
              <button
                key={idx}
                onClick={() => setActiveAiIndex(idx)}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: idx === activeAiIndex ? dot.color : 'rgba(255, 255, 255, 0.15)',
                  boxShadow: idx === activeAiIndex ? `0 0 6px ${dot.color}` : 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.25s'
                }}
                title={dot.name}
              />
            ))}
          </div>

          {/* Chevrons */}
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              onClick={() => setActiveAiIndex((prev) => (prev - 1 + aiDots.length) % aiDots.length)}
              style={{
                width: '26px', height: '26px', borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#FFFFFF', cursor: 'pointer', transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => setActiveAiIndex((prev) => (prev + 1) % aiDots.length)}
              style={{
                width: '26px', height: '26px', borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#FFFFFF', cursor: 'pointer', transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* 0. PANEL DE PULSO Y MÉTRICAS EN TIEMPO REAL */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '20px',
        alignItems: 'stretch',
        width: '100%'
      }}>
        {/* A. CUENTA REGRESIVA PRINCIPAL */}
        <div style={{
          flex: '1 1 350px',
          background: 'linear-gradient(135deg, rgba(31, 73, 125, 0.25) 0%, rgba(2, 11, 28, 0.8) 100%)',
          border: `1.5px solid ${theme.border}`,
          borderRadius: '24px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: `0 10px 30px rgba(0,0,0,0.3)`
        }}>
          {/* Subtle underlay radial glow */}
          <div style={{
            position: 'absolute', top: '-40px', left: '-40px',
            width: '120px', height: '120px', borderRadius: '50%',
            background: `radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)`,
            pointerEvents: 'none'
          }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={16} color={theme.secondary} />
              <span style={{ fontSize: '11px', fontWeight: '800', color: theme.secondary, textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                Faltan para el Summit
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Discrete AI Engines Micro-Ticker */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '9px', color: theme.textMuted, fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.3px' }}>AI Engines:</span>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {aiDots.map((dot, idx) => (
                    <div 
                      key={idx}
                      title={`${dot.name} - ${dot.func} (${dot.stat})`}
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: dot.color,
                        boxShadow: `0 0 5px ${dot.color}aa`,
                        cursor: 'help',
                        transition: 'transform 0.2s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.4)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  ))}
                </div>
              </div>

              {/* Plataforma en vivo badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 10px', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', animation: 'pulse 2s infinite' }} />
                <span style={{ fontSize: '9px', color: '#10B981', fontWeight: '800', textTransform: 'uppercase' }}>Plataforma en vivo</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between', width: '100%', position: 'relative', zIndex: 2 }}>
            {[{v: countdown.days, l:'Días'},{v: countdown.hours, l:'Hrs'},{v: countdown.minutes, l:'Min'},{v: countdown.seconds, l:'Seg'}].map(t => (
              <div key={t.l} style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: '100%',
                  background: 'rgba(2, 11, 28, 0.7)',
                  border: `1px solid ${theme.border}`,
                  borderRadius: '16px',
                  padding: '12px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.5)',
                  position: 'relative'
                }}>
                  <span style={{ 
                    fontSize: 'clamp(22px, 2.5vw, 28px)', 
                    fontWeight: '950', 
                    color: '#FFFFFF', 
                    fontFamily: "'Courier New', Courier, monospace",
                    textShadow: `0 0 12px ${theme.secondary}44`,
                    lineHeight: 1
                  }}>
                    {String(t.v).padStart(2,'0')}
                  </span>
                </div>
                <span style={{ fontSize: '9px', color: theme.textSecondary, fontWeight: '700', textTransform: 'uppercase', marginTop: '8px', letterSpacing: '0.5px' }}>
                  {t.l}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* B. MÉTRICAS ESTRATÉGICAS */}
        <div style={{
          flex: '2 1 500px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '16px',
          width: '100%'
        }}>
          {[
            { label: 'Miembros Globales', value: '+19,000', color: theme.secondary, desc: 'Líderes unidas en la red' },
            { label: 'Países Conectados', value: '150+', color: theme.teal, desc: 'Red internacional WAI' },
            { label: 'Asistentes Confirmadas', value: '187 / 250', color: theme.accent, desc: 'Aforo curado del Summit' },
            { label: 'Insumos Recibidos', value: `${documentosEnviados.toLocaleString()}`, color: '#8B5CF6', desc: 'Propuestas de declaratoria' },
            { label: 'Delegaciones Activas', value: '7 / 7', color: '#F97316', desc: 'Sectores convergentes' },
          ].map(m => (
            <div 
              key={m.label} 
              style={{
                backgroundColor: theme.cardBgGlass,
                border: `1.5px solid ${theme.border}`,
                borderRadius: '20px',
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: theme.shadowCard,
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.2s, border-color 0.2s',
                cursor: 'default'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = m.color;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = theme.border;
              }}
            >
              {/* Corner accent light */}
              <div style={{
                position: 'absolute', top: '-30px', right: '-30px',
                width: '60px', height: '60px', borderRadius: '50%',
                background: `radial-gradient(circle, ${m.color}18 0%, transparent 70%)`,
                pointerEvents: 'none'
              }} />

              <div>
                <span style={{ fontSize: '10px', color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '700' }}>
                  {m.label}
                </span>
                <div style={{ 
                  fontSize: 'clamp(18px, 2vw, 21px)', 
                  fontWeight: '900', 
                  color: m.color, 
                  marginTop: '6px',
                  textShadow: `0 0 10px ${m.color}22` 
                }}>
                  {m.value}
                </div>
              </div>

              <span style={{ fontSize: '9px', color: theme.textSecondary, marginTop: '8px', opacity: 0.85 }}>
                {m.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* 1. HERO BANNER (Aspiracional) */}
      <div 
        style={{ 
          background: `linear-gradient(135deg, rgba(31, 73, 125, 0.3) 0%, rgba(2, 11, 28, 0.95) 100%)`,
          border: `1.5px solid ${theme.border}`,
          borderRadius: '24px',
          padding: '40px clamp(20px, 5vw, 48px)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: `0 15px 40px rgba(2, 11, 28, 0.5)`
        }}
      >
        <div style={{
          position: 'absolute', top: '-100px', right: '-100px',
          width: '300px', height: '300px', borderRadius: '50%',
          background: `radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)`,
          pointerEvents: 'none'
        }} />
        
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '850px' }}>
          <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: theme.secondary, letterSpacing: '2px', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Sparkles size={14} fill={theme.secondary} />
            WAI Mexico Assembly 2026 | Profetas de la IA
          </span>
          <h1 style={{ fontSize: 'clamp(20px, 2.8vw, 30px)', fontWeight: '800', lineHeight: 1.2, color: '#FFFFFF', margin: '0 0 16px 0', letterSpacing: '-0.5px' }}>
            No será un evento para observar el futuro de la IA; <span style={{ background: `linear-gradient(90deg, ${theme.secondary} 0%, #FF8C00 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '900' }}>será una asamblea para ayudar a definirlo.</span>
          </h1>
          <p style={{ fontSize: 'clamp(12px, 1.4vw, 14px)', color: theme.textSecondary, lineHeight: 1.6, margin: '0 0 24px 0', fontWeight: '400' }}>
            Una convocatoria altamente curada de 250 personas para construir una conversación de país sobre mujeres, inteligencia artificial y competitividad. Gobierno, academia, industria, startups, cámaras, talento emergente y sociedad civil como actores activos.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button style={{ backgroundColor: theme.secondary, color: '#020B1C', border: 'none', padding: '12px 24px', borderRadius: '10px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', boxShadow: `0 6px 18px rgba(212, 175, 55, 0.25)`, transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 10px 22px rgba(212, 175, 55, 0.45)`; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 6px 18px rgba(212, 175, 55, 0.25)`; }}>
              Solicitar invitación →
            </button>
            <button style={{ backgroundColor: 'rgba(255,255,255,0.03)', color: '#FFFFFF', border: `1.5px solid rgba(255,255,255,0.12)`, padding: '10px 22px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.border = `1.5px solid ${theme.secondary}`; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'; e.currentTarget.style.border = `1.5px solid rgba(255,255,255,0.12)`; }}>
              Conocer la declaratoria (PDF)
            </button>
          </div>
        </div>
      </div>

      {/* 1.1 INTERACTIVE ASSEMBLY TABLE */}
      <div style={{
        backgroundColor: theme.cardBgGlass,
        border: `1.5px solid ${theme.border}`,
        borderRadius: '24px',
        padding: '24px',
        boxShadow: theme.shadowCard,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <style>{`
          @keyframes pulseRing {
            0% { transform: scale(0.95); opacity: 0.85; }
            100% { transform: scale(2.4); opacity: 0; }
          }
          @keyframes tooltipEnterCenter {
            0% { opacity: 0; transform: translateX(-50%) translateY(8px) scale(0.95); }
            100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
          }
          @keyframes tooltipEnterLeft {
            0% { opacity: 0; transform: translateY(8px) scale(0.95); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes tooltipEnterRight {
            0% { opacity: 0; transform: translateY(8px) scale(0.95); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes alertEnter {
            0% { opacity: 0; transform: translateY(20px) scale(0.95); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#FFFFFF', margin: '0 0 4px 0', fontFamily: "'Inter', sans-serif" }}>
            Mesa de la Asamblea WAI Mexico Assembly 2026
          </h3>
          <p style={{ fontSize: '12px', color: theme.textSecondary, margin: 0 }}>
            El formato combina apertura protocolaria, plenaria marco, mesas temáticas con relatoría, posicionamientos por delegación y Declaratoria final.
          </p>
        </div>

        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '750px',
          aspectRatio: '1',
          margin: '0 auto',
          borderRadius: '16px',
          overflow: 'visible',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          background: '#010815',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
        }}>
          {/* Main assembly table image */}
          <img
            src="/assets/waiAsamblea.png"
            alt="Mesa de la Asamblea"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.85,
              borderRadius: '16px'
            }}
          />

          {/* Interactive Hotspots */}
          {HOTSPOTS.map((h, i) => {
            const isActive = activeHotspot === i;
            const leftVal = parseFloat(h.left);

            // Responsive positioning for tooltips based on their quadrant
            let tooltipStyle: React.CSSProperties = {
              position: 'absolute',
              bottom: '22px',
              width: '260px',
              background: 'rgba(5, 16, 35, 0.96)',
              backdropFilter: 'blur(20px)',
              border: `1.5px solid ${theme.secondary}`,
              borderRadius: '16px',
              padding: '14px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.8), 0 0 20px rgba(212, 175, 55, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              zIndex: 110,
              textAlign: 'left'
            };

            if (leftVal < 35) {
              tooltipStyle.left = '0px';
              tooltipStyle.animation = 'tooltipEnterLeft 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards';
            } else if (leftVal > 65) {
              tooltipStyle.right = '0px';
              tooltipStyle.animation = 'tooltipEnterRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards';
            } else {
              tooltipStyle.left = '50%';
              tooltipStyle.transform = 'translateX(-50%)';
              tooltipStyle.animation = 'tooltipEnterCenter 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards';
            }

            return (
              <div
                key={h.id}
                style={{
                  position: 'absolute',
                  top: h.top,
                  left: h.left,
                  transform: 'translate(-50%, -50%)',
                  zIndex: isActive ? 100 : 10
                }}
              >
                {/* Active / Idle Pulsing point */}
                <div
                  onClick={() => setActiveHotspot(i)}
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    backgroundColor: isActive ? theme.accent : theme.secondary,
                    border: '2px solid #FFFFFF',
                    cursor: 'pointer',
                    boxShadow: isActive 
                      ? `0 0 10px ${theme.accent}, 0 0 20px ${theme.accent}` 
                      : `0 0 6px ${theme.secondary}`,
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '-4px', left: '-4px', right: '-4px', bottom: '-4px',
                    borderRadius: '50%',
                    border: `2px solid ${isActive ? theme.accent : theme.secondary}`,
                    opacity: isActive ? 0.8 : 0.2,
                    animation: isActive ? 'pulseRing 1.5s infinite ease-out' : 'none',
                    pointerEvents: 'none'
                  }} />
                </div>

                {/* Floating tooltip */}
                {isActive && (
                  <div style={tooltipStyle}>
                    {/* Header: Photo and Name/Role */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {h.img.startsWith('/') ? (
                        <div style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          overflow: 'hidden',
                          border: `2px solid ${theme.secondary}`,
                          boxShadow: `0 0 8px ${theme.secondary}`,
                          flexShrink: 0
                        }}>
                          <img
                            src={h.img}
                            alt={h.nombre}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                      ) : (
                        <div style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #1F497D 0%, #020B1C 100%)',
                          border: `2px solid ${theme.secondary}`,
                          boxShadow: `0 0 8px ${theme.secondary}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '16px',
                          fontWeight: '900',
                          color: theme.secondary,
                          flexShrink: 0
                        }}>
                          {h.img}
                        </div>
                      )}
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: '9px', color: theme.secondary, fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          {h.rol}
                        </div>
                        <div style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {h.nombre}
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div style={{ height: '1px', width: '100%', background: `linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.4), transparent)` }} />

                    {/* Description Bio */}
                    <p style={{ fontSize: '11px', color: theme.textSecondary, lineHeight: '1.45', margin: 0, fontWeight: '400' }}>
                      {h.desc}
                    </p>

                    {/* Footer */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                      <Sparkles size={10} color={theme.secondary} fill={theme.secondary} />
                      <span style={{ fontSize: '8px', color: theme.secondary, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        WAI México Core Team
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. SPONSORS BAR — datos reales y logos */}
      <div 
        style={{
          backgroundColor: theme.cardBgGlass,
          border: `1.5px solid ${theme.border}`,
          borderRadius: '24px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: theme.shadowCard
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '10px', color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '1px' }}>Aliados & Patrocinadores</span>
            <span style={{ fontSize: '16px', fontWeight: '800', color: theme.secondary, letterSpacing: '0.5px' }}>Sponsors & Partners de la Asamblea</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Zap size={12} color={theme.secondary} />
            <span style={{ fontSize: '10px', color: theme.secondary, fontWeight: '700' }}>+150,000 líderes en nuestra red</span>
          </div>
        </div>

        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '12px', 
          flexWrap: 'wrap',
          background: 'rgba(2, 11, 28, 0.3)',
          borderRadius: '16px',
          padding: '16px'
        }}>
          {WAI_BRAND_CONFIG.sponsors.map((s) => {
            const isPending = s.nombre === "Por confirmar...";
            return (
              <div 
                key={s.nombre} 
                style={{ 
                  height: '36px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  background: isPending ? 'rgba(255, 255, 255, 0.01)' : 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '8px',
                  padding: '4px 16px',
                  border: isPending ? '1px dashed rgba(212, 175, 55, 0.25)' : '1px solid rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.2s ease',
                  cursor: 'default'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = isPending ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.borderColor = theme.secondary;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = isPending ? 'rgba(255, 255, 255, 0.01)' : 'rgba(255, 255, 255, 0.02)';
                  e.currentTarget.style.borderColor = isPending ? 'rgba(212, 175, 55, 0.25)' : 'rgba(255, 255, 255, 0.05)';
                }}
              >
                {isPending ? (
                  <span style={{ fontSize: '11px', color: theme.secondary, fontWeight: '700', letterSpacing: '0.5px' }}>{s.nombre}</span>
                ) : (
                  <img 
                    src={s.img} 
                    alt={s.nombre} 
                    title={`${s.nombre} (${s.tipo})`}
                    style={{ 
                      maxHeight: '22px', 
                      maxWidth: '110px',
                      objectFit: 'contain',
                      transform: s.scale ? `scale(${s.scale})` : 'none',
                    }} 
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>



      {/* 4. DELEGACIONES ECOSISTEMA */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>Delegaciones del Ecosistema WAI</h2>
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
            Ingresa tu propuesta, pregunta, diagnóstico o caso de uso, o carga un documento (PDF, DOCX, PPTX). Los agentes IA analizarán y clasificarán el texto para consolidar insumos de la Declaratoria en vivo.
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
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            style={{ display: 'none' }} 
            accept=".pdf,.docx,.doc,.png,.jpg,.jpeg"
          />
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
          <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>Las Seis Mesas Temáticas de la Asamblea</h2>
          <p style={{ fontSize: '12px', color: theme.textSecondary, margin: '4px 0 0' }}>Cada mesa tiene una pregunta detonadora, una moderadora, una relatora y una salida esperada que alimentará la Declaratoria WAI México 2026.</p>
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
          <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>Observatorio del Ecosistema IA México y Alineación Global</h2>
          <p style={{ fontSize: '12px', color: theme.textSecondary, margin: '4px 0 0' }}>Indicadores clave de liderazgo, adopción y talento tecnológico con perspectiva global</p>
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
              <span style={{ fontSize: '22px', fontWeight: '900', color: '#FFFFFF' }}>{k.value}</span>
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
          <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>Conversaciones WAI - Podcast</h2>
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
