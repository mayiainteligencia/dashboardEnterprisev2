import React from 'react';
import { WAI_BRAND_CONFIG } from '../../../config/branding';
import { Globe, Users, Target, Shield, Landmark, Sparkles, BookOpen, Star, HelpCircle } from 'lucide-react';

export const LaAsamblea: React.FC = () => {
  const theme = WAI_BRAND_CONFIG.theme;

  const cardStyle = {
    backgroundColor: theme.cardBgGlass,
    border: `1.5px solid ${theme.border}`,
    borderRadius: '16px',
    padding: '24px',
    boxShadow: theme.shadowCard,
    transition: 'all 0.3s ease',
  };

  const textStyle = {
    color: theme.textSecondary,
    fontSize: '14px',
    lineHeight: 1.6,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Hero Narrative */}
      <div style={{
        background: theme.gradientHero,
        border: `1.5px solid ${theme.border}`,
        borderRadius: '24px',
        padding: '48px clamp(20px, 5vw, 64px)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: theme.shadow,
      }}>
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`, pointerEvents: 'none' }} />
        
        <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: theme.secondary, letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Sparkles size={14} fill={theme.secondary} />
          Diálogo Nacional de Mujeres en Inteligencia Artificial y Competitividad
        </span>
        
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: '900', color: '#FFFFFF', margin: '0 0 20px 0', lineHeight: 1.2 }}>
          La plataforma donde México escribe con IA la agenda del futuro
        </h1>
        
        <p style={{ ...textStyle, fontSize: '16px', color: '#E2E8F0', margin: 0, maxWidth: '800px' }}>
          WAI México 2026 no es un congreso tradicional. Es una asamblea nacional de alto nivel diseñada para reunir, escuchar, organizar y consolidar la voz del ecosistema mexicano de inteligencia artificial en una Declaratoria Nacional inédita.
        </p>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        {[
          { label: 'Aforo Objetivo', value: '250 asistentes', desc: 'Convocatoria curada de líderes' },
          { label: 'Mesas Temáticas', value: '6 Mesas', desc: 'Objetivos y aportaciones clave' },
          { label: 'Delegaciones Activas', value: '7 Sectores', desc: 'Representación nacional balanceada' },
          { label: 'Salida Institucional', value: '1 Declaratoria', desc: 'Elaborada colaborativamente con IA' }
        ].map((s, idx) => (
          <div key={idx} style={{ ...cardStyle, textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '24px', fontWeight: '950', color: theme.secondary, marginBottom: '4px' }}>{s.value}</div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#FFFFFF', marginBottom: '4px' }}>{s.label}</div>
            <div style={{ fontSize: '11px', color: theme.textMuted }}>{s.desc}</div>
          </div>
        ))}
      </div>

      {/* ¿Por qué existe? y El Legado */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '24px' }}>
        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <HelpCircle size={20} color={theme.secondary} />
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>¿Por qué existe?</h3>
          </div>
          <p style={textStyle}>
            A nivel global, la participación de las mujeres en el desarrollo de la inteligencia artificial representa apenas entre el 22% y el 30%, con menos del 15% en roles directivos. En México, la adopción y el desarrollo de IA carecen de una articulación nacional inclusiva.
          </p>
          <p style={{ ...textStyle, marginTop: '12px' }}>
            Esta asamblea nace para cambiar esa realidad. Al poner al liderazgo femenino en el centro, sumando la colaboración activa de todos los sectores, construimos una IA ética, justa y altamente competitiva que beneficie a toda la sociedad.
          </p>
        </div>

        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Target size={20} color={theme.accent} />
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>El Legado WAI México</h3>
          </div>
          <p style={textStyle}>
            El resultado final de esta asamblea será la <strong>Declaratoria WAI México 2026</strong>: un plan de acción concreto que unifica prioridades en regulación, talento, adopción empresarial y financiamiento.
          </p>
          <p style={{ ...textStyle, marginTop: '12px' }}>
            Después del evento, la plataforma seguirá operando como un Observatorio Nacional de IA y una Red de Networking inteligente para dar seguimiento e impulso continuo a los compromisos adquiridos.
          </p>
        </div>
      </div>

      {/* Los 3 Momentos de la Plataforma */}
      <div>
        <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#FFFFFF', margin: '0 0 20px 0' }}>El Ciclo de la Asamblea</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {[
            {
              momento: 'Antes del Summit',
              icon: Users,
              desc: 'Crear visión, registro de delegaciones, onboarding de documentos técnicos y planteamiento de propuestas clave para alimentar la IA.'
            },
            {
              momento: 'Durante el Summit',
              icon: Landmark,
              desc: 'Operar el diálogo en las 6 mesas temáticas, capturar relatorías en tiempo real y estructurar con IA los borradores de la declaratoria.'
            },
            {
              momento: 'Después del Summit',
              icon: Globe,
              desc: 'Publicar la Declaratoria final, abrir el Termómetro de Adopción de IA en México y activar la red social vertical de mentorías y networking.'
            }
          ].map((m, idx) => (
            <div key={idx} style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255, 192, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <m.icon size={18} color={theme.secondary} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: '750', color: '#FFFFFF', margin: 0 }}>{m.momento}</h4>
              </div>
              <p style={textStyle}>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Principios de Diseño */}
      <div>
        <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#FFFFFF', margin: '0 0 20px 0' }}>Nuestros Principios Rectores</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {[
            { t: 'Institucional + Aspiracional', d: 'Prestigio, rigor nacional y el orgullo de pertenecer a una conversación de alto nivel.' },
            { t: 'IA desde la Raíz', d: 'El motor RAG y de orquestación procesa de verdad la información aportada de manera transparente.' },
            { t: 'Mujeres al Centro', d: 'Visibiliza y eleva el liderazgo femenino tecnológico como factor competitivo nacional.' },
            { t: 'Participación Accionable', d: 'Cada asistente contribuye activamente con insumos, documentos o compromisos.' },
            { t: 'Continuidad', d: 'La plataforma evoluciona de un evento a una comunidad activa y observatorio permanente.' },
            { t: 'Confianza y Trazabilidad', d: 'Toda generación automatizada se versiona y cuenta con fuentes y revisión humana obligatoria.' }
          ].map((p, idx) => (
            <div key={idx} style={{ ...cardStyle, padding: '20px' }}>
              <h5 style={{ fontSize: '14px', fontWeight: '750', color: theme.secondary, margin: '0 0 8px 0' }}>{p.t}</h5>
              <p style={{ ...textStyle, fontSize: '12.5px', margin: 0 }}>{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
