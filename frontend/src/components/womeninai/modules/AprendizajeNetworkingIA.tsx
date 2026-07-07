import React, { useState } from 'react';
import { 
  BookOpen, GraduationCap, Network, MessageSquare, Lightbulb, 
  Bot, Sparkles, Star, UserPlus, Calendar, Award, Handshake,
  CheckCircle, ArrowRight, UserCheck
} from 'lucide-react';
import { WAI_BRAND_CONFIG } from '../../../config/branding';

interface Course {
  id: number;
  titulo: string;
  progreso: number; // 0-100
  nivel: string;
  categoria: string;
}

interface Event {
  id: number;
  titulo: string;
  fecha: string;
  desc: string;
  tipo: string;
}

interface MentorMatch {
  id: number;
  nombre: string;
  cargo: string;
  empresa: string;
  compatibilidad: number; // 0-100
  habilidades: string[];
}

const COURSES: Course[] = [
  { id: 1, titulo: "Introducción a Redes Neuronales Profundas (WaiLEARN)", progreso: 80, nivel: "Principiante", categoria: "Deep Learning" },
  { id: 2, titulo: "NLP Aplicado y Modelos de Lenguaje Masivos (Wai2GO)", progreso: 35, nivel: "Intermedio", categoria: "NLP" },
  { id: 3, titulo: "Ética y Mitigación de Sesgo en Algoritmos", progreso: 0, nivel: "Avanzado", categoria: "Ethics" },
];

const EVENTS: Event[] = [
  { id: 1, titulo: "Panel: El Rol de la Academia en la Declaratoria Nacional", fecha: "Septiembre 24 - 14:05 PM", desc: "Plenaria sobre la brecha educativa en STEM y transferencia al sector industrial.", tipo: "Asamblea" },
  { id: 2, titulo: "Mesa 3: Taller de Regulación e IA Ética en México", fecha: "Septiembre 24 - 14:35 PM", desc: "Mesas redondas para consolidar posicionamiento de políticas públicas.", tipo: "Mesa Redonda" },
];

const MENTOR_MATCHES: MentorMatch[] = [
  { id: 1, nombre: "Dra. Sylvia Conde", cargo: "Investigadora Principal", empresa: "Instituto de IA UNAM", compatibilidad: 98, habilidades: ["NLP", "Ethics in AI", "Research"] },
  { id: 2, nombre: "Ing. Mariana Costa", cargo: "CTO", empresa: "Bitso", compatibilidad: 93, habilidades: ["Computer Vision", "Fintech", "Engineering Management"] },
  { id: 3, nombre: "Mtra. Alejandra Lagunes", cargo: "Líder de IA", empresa: "BBVA México", compatibilidad: 88, habilidades: ["AI Strategy", "Business Intelligence", "Governance"] },
];

export const AprendizajeNetworkingIA: React.FC = () => {
  const theme = WAI_BRAND_CONFIG.theme;
  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);
  const [mentorshipRequested, setMentorshipRequested] = useState<number[]>([]);
  const [connectionsSent, setConnectionsSent] = useState<number[]>([]);

  const handleRegisterEvent = (id: number) => {
    setRegisteredEvents([...registeredEvents, id]);
  };

  const handleRequestMentorship = (id: number) => {
    setMentorshipRequested([...mentorshipRequested, id]);
  };

  const handleSendConnection = (id: number) => {
    setConnectionsSent([...connectionsSent, id]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {/* KPIs Clave */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        {[
          { label: "Cursos Completados", value: "3 Cursos", subtext: "WaiLEARN & Wai2GO", icon: GraduationCap, color: theme.secondary },
          { label: "Conexiones de Red", value: "48 Red", subtext: "Líderes y aliadas conectadas", icon: Network, color: "#8B5CF6" },
          { label: "Parejas de Mentoría", value: "1 Pareja", subtext: "WAIMentorship Activa", icon: Handshake, color: theme.accent },
        ].map((k, idx) => {
          const Icon = k.icon;
          return (
            <div key={idx} style={{ backgroundColor: theme.cardBgGlass, border: `1.5px solid ${theme.border}`, borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.02)', border: `1px solid ${k.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={20} color={k.color} />
              </div>
              <div>
                <span style={{ fontSize: '11px', color: theme.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{k.label}</span>
                <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#FFFFFF', margin: '2px 0' }}>{k.value}</h3>
                <span style={{ fontSize: '10px', color: theme.textMuted }}>{k.subtext}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* CURSOS Y EVENTOS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        
        {/* Cursos Recomendados */}
        <div style={{ backgroundColor: theme.cardBgGlass, border: `1.5px solid ${theme.border}`, borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={20} color={theme.secondary} />
            <h3 style={{ fontSize: '18px', fontWeight: '850', color: '#FFFFFF', margin: 0 }}>Rutas de Aprendizaje (AI Recommended)</h3>
          </div>
          <p style={{ fontSize: '12px', color: theme.textSecondary, margin: 0, lineHeight: 1.4 }}>
            Sugerencias personalizadas según tus habilidades de delegación e intereses en IA.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
            {courses.map((course) => (
              <div 
                key={course.id}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.01)',
                  border: `1px solid rgba(255,255,255,0.04)`,
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '12px' }}>
                  <div>
                    <h5 style={{ fontSize: '13px', fontWeight: '750', color: '#FFFFFF', margin: 0 }}>{course.titulo}</h5>
                    <span style={{ fontSize: '10px', color: theme.secondary, marginTop: '2px', display: 'inline-block' }}>{course.categoria} · {course.nivel}</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#FFFFFF', fontWeight: 'bold' }}>{course.progreso}%</span>
                </div>
                
                {/* Barra de progreso */}
                <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${course.progreso}%`, height: '100%', backgroundColor: theme.secondary, borderRadius: '3px' }} />
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button 
                    style={{
                      background: 'none', border: 'none', color: '#FFFFFF', fontSize: '11px', fontWeight: 'bold',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: 0
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = theme.secondary}
                    onMouseLeave={e => e.currentTarget.style.color = '#FFFFFF'}
                  >
                    <span>{course.progreso > 0 ? "Continuar curso" : "Comenzar ruta"}</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Eventos Sugeridos */}
        <div style={{ backgroundColor: theme.cardBgGlass, border: `1.5px solid ${theme.border}`, borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={20} color={theme.accent} />
            <h3 style={{ fontSize: '18px', fontWeight: '850', color: '#FFFFFF', margin: 0 }}>Eventos y Sesiones del Summit</h3>
          </div>
          <p style={{ fontSize: '12px', color: theme.textSecondary, margin: 0, lineHeight: 1.4 }}>
            Sesiones sugeridas por el agente orquestador WAI para enriquecer tu agenda participativa.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
            {EVENTS.map((ev) => {
              const isReg = registeredEvents.includes(ev.id);
              return (
                <div 
                  key={ev.id}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.01)',
                    border: `1px solid rgba(255,255,255,0.04)`,
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', color: theme.accent, backgroundColor: 'rgba(255,64,129,0.1)', padding: '2px 6px', borderRadius: '4px' }}>{ev.tipo}</span>
                    <span style={{ fontSize: '11px', color: theme.textSecondary, fontWeight: '500' }}>{ev.fecha}</span>
                  </div>
                  <h5 style={{ fontSize: '13px', fontWeight: '750', color: '#FFFFFF', margin: '4px 0 2px 0' }}>{ev.titulo}</h5>
                  <p style={{ fontSize: '11px', color: theme.textSecondary, margin: '0 0 8px 0', lineHeight: 1.4 }}>{ev.desc}</p>
                  
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {isReg ? (
                      <span style={{ fontSize: '11px', color: '#10B981', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle size={12} /> Agendado
                      </span>
                    ) : (
                      <button 
                        onClick={() => handleRegisterEvent(ev.id)}
                        style={{
                          backgroundColor: 'rgba(255, 192, 0, 0.1)', color: theme.secondary, border: `1px solid ${theme.secondary}`,
                          borderRadius: '8px', padding: '6px 14px', fontSize: '11px', fontWeight: '700', cursor: 'pointer'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,192,0,0.15)'; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,192,0,0.1)'; }}
                      >
                        Agendar Sesión
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* WAIMENTORSHIP MATCHMAKING */}
      <div 
        style={{
          backgroundColor: theme.cardBgGlass,
          border: `1.5px solid ${theme.border}`,
          borderRadius: '20px',
          padding: '24px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
          <Handshake size={22} color={theme.secondary} />
          <h3 style={{ fontSize: '18px', fontWeight: '850', color: '#FFFFFF', margin: 0 }}>WAIMentorship (AI Matchmaking Engine)</h3>
        </div>
        <p style={{ fontSize: '12px', color: theme.textSecondary, margin: '0 0 20px 0', lineHeight: 1.5 }}>
          Conectamos mentoras senior con mentees en el sector científico y de startups. El motor de recomendación utiliza perfiles profesionales, áreas de investigación y objetivos de carrera para encontrar el match perfecto.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {MENTOR_MATCHES.map((match) => {
            const isReq = mentorshipRequested.includes(match.id);
            return (
              <div 
                key={match.id}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.01)',
                  border: isReq ? `1.5px solid #10B981` : `1.5px solid rgba(255,255,255,0.04)`,
                  borderRadius: '16px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  position: 'relative'
                }}
              >
                {/* Compatibility Score */}
                <div style={{ position: 'absolute', top: '16px', right: '16px', textAlign: 'right' }}>
                  <span style={{ fontSize: '18px', fontWeight: '900', color: theme.secondary, display: 'block' }}>{match.compatibilidad}%</span>
                  <span style={{ fontSize: '9px', color: theme.textMuted, textTransform: 'uppercase' }}>Afinidad AI</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '14px', fontWeight: '750', color: '#FFFFFF' }}>{match.nombre}</span>
                  <span style={{ fontSize: '11px', color: theme.secondary, fontWeight: '600', marginTop: '2px' }}>{match.cargo}</span>
                  <span style={{ fontSize: '11px', color: theme.textSecondary }}>{match.empresa}</span>
                </div>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
                  {match.habilidades.map(h => (
                    <span key={h} style={{ fontSize: '9px', backgroundColor: 'rgba(255,255,255,0.03)', color: theme.textSecondary, border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', padding: '2px 6px' }}>{h}</span>
                  ))}
                </div>

                <div style={{ borderTop: `1px solid rgba(255,255,255,0.04)`, paddingTop: '12px', marginTop: '4px', display: 'flex', gap: '8px' }}>
                  {isReq ? (
                    <button 
                      disabled
                      style={{
                        backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981', border: '1px solid #10B981',
                        borderRadius: '10px', padding: '8px 14px', fontSize: '11px', fontWeight: 'bold', width: '100%'
                      }}
                    >
                      Solicitud de Mentoría Enviada ✓
                    </button>
                  ) : (
                    <>
                      <button 
                        onClick={() => handleRequestMentorship(match.id)}
                        style={{
                          backgroundColor: theme.secondary, color: '#020B1C', border: 'none',
                          borderRadius: '10px', padding: '8px 14px', fontSize: '11px', fontWeight: 'bold',
                          cursor: 'pointer', flex: 1
                        }}
                      >
                        Solicitar Match
                      </button>
                      <button 
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.03)', color: '#FFFFFF', border: `1px solid ${theme.border}`,
                          borderRadius: '10px', padding: '8px 12px', fontSize: '11px', fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                      >
                        Ver Perfil
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
