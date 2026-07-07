import React, { useState, useEffect } from 'react';
import { WAI_BRAND_CONFIG } from '../../../config/branding';
import { Clock, Calendar, CheckCircle2, Play, Users, MapPin, Sparkles } from 'lucide-react';

interface AgendaItem {
  time: string;
  title: string;
  location: string;
  desc: string;
  type: 'plenaria' | 'mesas' | 'networking';
  icon: string;
  status: 'passed' | 'live' | 'upcoming';
}

const AGENDA_DATA: AgendaItem[] = [
  {
    time: "08:30",
    title: "Registro y bienvenida · Lobby principal",
    location: "Lobby Auditorio",
    desc: "Acreditación con código QR de asamblea y entrega de accesos por delegación.",
    type: 'networking',
    icon: "Users",
    status: 'upcoming'
  },
  {
    time: "09:00",
    title: "Apertura institucional · Plenaria",
    location: "Auditorio Principal",
    desc: "Mensaje de bienvenida por Verónica Viniegra (Líder de Estrategia WAI México) y directivos de NEORIS.",
    type: 'plenaria',
    icon: "Sparkles",
    status: 'upcoming'
  },
  {
    time: "09:30",
    title: "Plenaria: El momento de México en IA",
    location: "Auditorio Principal",
    desc: "Panel estratégico sobre el contexto del liderazgo femenino en la tecnología nacional y brechas críticas.",
    type: 'plenaria',
    icon: "Sparkles",
    status: 'upcoming'
  },
  {
    time: "10:00",
    title: "Arranque de Mesas Temáticas (paralelas, 6 mesas)",
    location: "Salas de Asamblea 1 a 6",
    desc: "Diálogo directo en mesas de trabajo por delegación sobre gobernanza, competitividad, talento y ética.",
    type: 'mesas',
    icon: "Users",
    status: 'upcoming'
  },
  {
    time: "11:30",
    title: "Posicionamientos de dos minutos por mesa",
    location: "Auditorio Principal",
    desc: "Relatoras de cada mesa exponen conclusiones preliminares sintetizadas en conjunto con la IA.",
    type: 'plenaria',
    icon: "Sparkles",
    status: 'upcoming'
  },
  {
    time: "12:00",
    title: "Diálogo Nacional: Síntesis y compromisos",
    location: "Auditorio Principal",
    desc: "Consolidación de aportaciones y votación rápida en la plataforma de las prioridades de acción.",
    type: 'plenaria',
    icon: "Sparkles",
    status: 'upcoming'
  },
  {
    time: "13:00",
    title: "Presentación de Declaratoria WAI México 2026 v0.1",
    location: "Auditorio Principal",
    desc: "Presentación del primer borrador integrado con IA y validado por el comité editorial.",
    type: 'plenaria',
    icon: "Sparkles",
    status: 'upcoming'
  },
  {
    time: "13:30",
    title: "Cóctel de networking curado",
    location: "Terraza WAI",
    desc: "Espacio de vinculación uno-a-uno recomendado por el Agente de Networking.",
    type: 'networking',
    icon: "Users",
    status: 'upcoming'
  }
];

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

export const AgendaViva: React.FC = () => {
  const theme = WAI_BRAND_CONFIG.theme;
  const [activeFilter, setActiveFilter] = useState<'all' | 'plenaria' | 'mesas' | 'networking'>('all');
  const countdown = useCountdown(WAI_BRAND_CONFIG.evento.fechaISO);

  const cardStyle = {
    backgroundColor: theme.cardBgGlass,
    border: `1.5px solid ${theme.border}`,
    borderRadius: '16px',
    padding: '20px',
    boxShadow: theme.shadowCard,
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start',
  };

  const filteredItems = AGENDA_DATA.filter(item => activeFilter === 'all' || item.type === activeFilter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Header with Countdown */}
      <div style={{
        background: theme.gradientHero,
        border: `1.5px solid ${theme.border}`,
        borderRadius: '24px',
        padding: '32px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px',
      }}>
        <div>
          <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: theme.secondary, letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>
            Programa de la Asamblea
          </span>
          <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#FFFFFF', margin: 0 }}>Agenda Viva · Septiembre 24, 2026</h1>
          <p style={{ color: theme.textSecondary, fontSize: '13px', margin: '4px 0 0' }}>Ubicación: Sede del Summit CDMX</p>
        </div>

        {/* Countdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'rgba(0,0,0,0.2)', padding: '12px 20px', borderRadius: '14px', border: `1px solid ${theme.border}` }}>
          <Clock size={18} color={theme.secondary} />
          <div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[{v: countdown.days, l:'D'},{v: countdown.hours, l:'H'},{v: countdown.minutes, l:'M'},{v: countdown.seconds, l:'S'}].map(t => (
                <span key={t.l} style={{ fontSize: '16px', fontWeight: '900', color: theme.secondary }}>
                  {String(t.v).padStart(2,'0')}{t.l.toLowerCase()}
                </span>
              ))}
            </div>
            <span style={{ fontSize: '8px', color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Cuenta regresiva</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {[
          { id: 'all', label: 'Ver Todo' },
          { id: 'plenaria', label: 'Plenarias' },
          { id: 'mesas', label: 'Mesas de Trabajo' },
          { id: 'networking', label: 'Networking' }
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id as any)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: activeFilter === f.id ? 'none' : `1px solid ${theme.border}`,
              backgroundColor: activeFilter === f.id ? theme.secondary : 'transparent',
              color: activeFilter === f.id ? '#020B1C' : theme.textSecondary,
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Timeline list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
        {/* Timeline line */}
        <div style={{ position: 'absolute', left: '27px', top: '24px', bottom: '24px', width: '2px', backgroundColor: 'rgba(255,255,255,0.07)' }} />

        {filteredItems.map((item, idx) => (
          <div key={idx} style={cardStyle}>
            {/* Hour marker */}
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#020B1C',
              border: `2px solid ${item.type === 'mesas' ? theme.accent : theme.secondary}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: '900',
              color: '#FFFFFF',
              zIndex: 2,
              flexShrink: 0,
            }}>
              {item.time}
            </div>

            {/* Content info */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>{item.title}</h3>
                <span style={{
                  fontSize: '9px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  color: item.type === 'plenaria' ? theme.secondary : item.type === 'mesas' ? theme.accent : theme.teal,
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  padding: '4px 8px',
                  borderRadius: '6px',
                }}>
                  {item.type}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', color: theme.textMuted, fontSize: '11px' }}>
                <MapPin size={11} />
                <span>{item.location}</span>
              </div>

              <p style={{ color: theme.textSecondary, fontSize: '13px', margin: '8px 0 0', lineHeight: 1.5 }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
