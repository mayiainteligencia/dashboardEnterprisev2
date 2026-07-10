import React from 'react';
import { WAI_BRAND_CONFIG } from '../../../config/branding';
import { Sparkles, Building2, BookOpen, BarChart3, Users, Award, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const Delegaciones: React.FC = () => {
  const theme = WAI_BRAND_CONFIG.theme;

  const cardStyle = (color: string) => ({
    backgroundColor: theme.cardBgGlass,
    border: `1.5px solid ${theme.border}`,
    borderTop: `4px solid ${color}`,
    borderRadius: '16px',
    padding: '24px',
    boxShadow: theme.shadowCard,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
    transition: 'all 0.25s ease',
  });

  // Las preguntas detonadoras por delegación reales
  const getPreguntaDetonadora = (id: string) => {
    switch (id) {
      case 'gobierno': return '¿Qué marcos regulatorios necesita México para una IA confiable y competitiva?';
      case 'academia': return '¿Cómo conectar de forma efectiva la investigación y la transferencia tecnológica?';
      case 'industria': return '¿Cómo llevar la IA de la estrategia a la adopción real con impacto económico?';
      case 'startups': return '¿Qué necesitan las fundadoras de IA para escalar y recibir inversión?';
      case 'camaras': return '¿Cómo articular la voz del sector privado en la agenda nacional de IA?';
      case 'talento': return '¿Qué debe pasar para que más mujeres lideren en IA en México?';
      default: return '¿Qué rol tienen las marcas y patrocinadores en construir un ecosistema de IA inclusivo?';
    }
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 'gobierno': return <Building2 size={20} />;
      case 'academia': return <BookOpen size={20} />;
      case 'industria': return <BarChart3 size={20} />;
      case 'startups': return <Sparkles size={20} />;
      case 'camaras': return <Users size={20} />;
      case 'talento': return <Award size={20} />;
      default: return <CheckCircle2 size={20} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '19px', fontWeight: '900', color: '#FFFFFF', margin: '0 0 8px 0' }}>Delegaciones del Summit</h1>
        <p style={{ color: theme.textSecondary, fontSize: '14px', margin: 0 }}>
          Siete sectores estratégicos convergen para co-crear la Declaratoria Nacional de IA. Cada delegación lidera objetivos y responde a preguntas detonadoras críticas.
        </p>
      </div>

      {/* Stats bar */}
      <div style={{
        backgroundColor: theme.cardBgGlass,
        border: `1px solid ${theme.border}`,
        borderRadius: '16px',
        padding: '20px 24px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        {[
          { label: 'Asistentes Confirmadas', value: '187 / 250' },
          { label: 'Delegaciones Representadas', value: '7' },
          { label: 'Balance de Género', value: '100% Inclusivo' },
          { label: 'Documentos Recibidos', value: '1,248' }
        ].map((s, idx) => (
          <div key={idx} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '13px', fontWeight: '900', color: theme.secondary }}>{s.value}</div>
            <div style={{ fontSize: '10px', color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Grid of Delegaciones */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        {WAI_BRAND_CONFIG.delegaciones.map((d) => (
          <div 
            key={d.id} 
            style={cardStyle(d.color)}
            className="delegacion-card"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ color: d.color }}>
                  {getIcon(d.id)}
                </div>
                <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>{d.nombre}</h3>
              </div>
              <span style={{ fontSize: '11px', color: d.color, backgroundColor: 'rgba(255,255,255,0.03)', padding: '4px 8px', borderRadius: '20px', fontWeight: '600' }}>
                {d.seats} Asientos
              </span>
            </div>

            <p style={{ color: theme.textSecondary, fontSize: '13px', margin: '4px 0 0', lineHeight: 1.5 }}>
              {d.desc}
            </p>

            <div style={{ 
              backgroundColor: 'rgba(0,0,0,0.2)', 
              padding: '12px 16px', 
              borderRadius: '10px', 
              borderLeft: `3px solid ${d.color}`,
              marginTop: 'auto'
            }}>
              <span style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', color: theme.textMuted, display: 'block', marginBottom: '4px', letterSpacing: '0.5px' }}>
                Pregunta Detonadora:
              </span>
              <p style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: '600', margin: 0, lineHeight: 1.4 }}>
                {getPreguntaDetonadora(d.id)}
              </p>
            </div>
            
            {/* Simple progress seat occupancy */}
            <div style={{ marginTop: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: theme.textMuted, marginBottom: '4px' }}>
                <span>Asientos ocupados</span>
                <span>{Math.floor(d.seats * 0.75)} / {d.seats}</span>
              </div>
              <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: '75%', height: '100%', backgroundColor: d.color, borderRadius: '2px' }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
