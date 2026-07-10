import React, { useState } from 'react';
import {
  Mic, Play, Pause, Headphones, Clock, Tag, ChevronRight,
  FileText, Bookmark, Share2, Sparkles, Bot, Volume2,
  ExternalLink, Filter, Search, Radio
} from 'lucide-react';
import { WAI_BRAND_CONFIG } from '../../../config/branding';

const EPISODIOS = [
  {
    id: 1,
    titulo: "El futuro femenino de la IA en México",
    invitada: "Dra. Amanda Carballo-Pérez",
    cargo: "AI Strategist — NEORIS",
    duracion: "38 min",
    fecha: "Jun 28, 2026",
    temas: ["Liderazgo", "Ecosistema IA", "México"],
    plays: "2,847",
    resumen: "Amanda analiza los retos sistémicos que enfrentan las mujeres al acceder a posiciones de liderazgo en IA y propone un modelo de mentoría distribuida.",
    transcript: true,
  },
  {
    id: 2,
    titulo: "Ética en IA: No es opcional",
    invitada: "Dra. Karen Villeda",
    cargo: "Co-fundadora — C Minds",
    duracion: "44 min",
    fecha: "Jun 14, 2026",
    temas: ["Ética IA", "Política pública", "Gobernanza"],
    plays: "3,212",
    resumen: "Karen habla sobre los marcos regulatorios que México necesita para construir una IA confiable y el rol del sector privado en la gobernanza responsable.",
    transcript: true,
  },
  {
    id: 3,
    titulo: "Capital para fundadoras de IA: rompiendo el techo",
    invitada: "Ing. Mariana Costa",
    cargo: "CTO — Bitso",
    duracion: "51 min",
    fecha: "May 30, 2026",
    temas: ["Venture Capital", "Startups", "Emprendimiento"],
    plays: "1,984",
    resumen: "Mariana comparte datos sobre la brecha de financiamiento para fundadoras de startups de IA en LATAM y las estrategias que funcionan para cerrarla.",
    transcript: false,
  },
  {
    id: 4,
    titulo: "Academia e industria: construyendo el puente",
    invitada: "Mtra. Alejandra Lagunes",
    cargo: "Directora de IA — BBVA México",
    duracion: "42 min",
    fecha: "May 15, 2026",
    temas: ["Academia", "Industria", "Talento"],
    plays: "2,105",
    resumen: "Alejandra explora cómo las instituciones financieras pueden convertirse en vehículos de democratización de la IA en México con perspectiva de género.",
    transcript: true,
  },
];

const CLIPS = [
  { id: 1, titulo: "\"México no puede perderse esta ventana\"", autora: "Verónica Viniegra", duracion: "2:30", temas: ["Estrategia", "Futuro"] },
  { id: 2, titulo: "\"28% de mujeres en IA — necesitamos el doble\"", autora: "Dra. Karen Villeda", duracion: "1:45", temas: ["Datos", "Representación"] },
  { id: 3, titulo: "\"La ética no es un filtro, es la arquitectura\"", autora: "Dra. Amanda Carballo-Pérez", duracion: "3:10", temas: ["Ética IA", "Diseño"] },
];

const PROXIMAS = [
  { titulo: "Regulación de IA: La perspectiva del gobierno", invitada: "Por confirmar (Delegación Gobierno)", fecha: "Jul 15, 2026" },
  { titulo: "WaiLEARN: Educando a la siguiente generación", invitada: "Susan Verdiguel — WAI México", fecha: "Jul 29, 2026" },
];

export const PodcastMediaHub: React.FC = () => {
  const theme = WAI_BRAND_CONFIG.theme;
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTema, setSelectedTema] = useState('Todos');

  const todosLosTemas = ['Todos', 'Liderazgo', 'Ética IA', 'Gobernanza', 'Startups', 'Academia', 'Talento', 'Política pública'];

  const filteredEpisodios = EPISODIOS.filter(ep => {
    const matchSearch = ep.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ep.invitada.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTema = selectedTema === 'Todos' || ep.temas.includes(selectedTema);
    return matchSearch && matchTema;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

      {/* Header */}
      <div style={{
        background: theme.gradientHero,
        border: `1.5px solid ${theme.border}`,
        borderRadius: '20px',
        padding: '32px clamp(20px, 4vw, 48px)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '280px', height: '280px', borderRadius: '50%', background: `radial-gradient(circle, rgba(255,192,0,0.1) 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(255,192,0,0.12)', border: `1.5px solid ${theme.secondary}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Mic size={22} color={theme.secondary} />
          </div>
          <div>
            <h1 style={{ fontSize: 'clamp(16px, 2.2vw, 22px)', fontWeight: '900', color: '#FFFFFF', margin: 0 }}>Podcast & Media Hub WAI</h1>
            <p style={{ fontSize: '13px', color: theme.textSecondary, margin: '4px 0 0' }}>Voces del ecosistema de IA en México · Episodios, clips, transcripciones y biblioteca semántica</p>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '16px' }}>
          {[
            { label: 'Episodios', value: '18' },
            { label: 'Reproducciones', value: '12,400+' },
            { label: 'Invitadas', value: '22' },
            { label: 'Clips generados', value: '64' },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontSize: '14px', fontWeight: '900', color: theme.secondary }}>{s.value}</div>
              <div style={{ fontSize: '10px', color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: theme.textMuted }} />
          <input
            type="text"
            placeholder="Buscar episodio o invitada..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '10px', padding: '9px 12px 9px 34px', color: '#FFFFFF', fontSize: '12px', width: '220px', outline: 'none' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {todosLosTemas.map(tema => (
            <button key={tema} onClick={() => setSelectedTema(tema)}
              style={{
                padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', cursor: 'pointer',
                backgroundColor: selectedTema === tema ? theme.secondary : 'rgba(255,255,255,0.04)',
                color: selectedTema === tema ? '#020B1C' : theme.textSecondary,
                border: selectedTema === tema ? 'none' : `1px solid ${theme.border}`,
                transition: 'all 0.2s',
              }}>
              {tema}
            </button>
          ))}
        </div>
      </div>

      {/* Episodios Grid */}
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#FFFFFF', margin: '0 0 16px 0' }}>Episodios Recientes</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredEpisodios.map((ep) => (
            <div
              key={ep.id}
              style={{
                backgroundColor: theme.cardBgGlass, border: `1.5px solid ${theme.border}`,
                borderRadius: '16px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = theme.borderHover}
              onMouseLeave={e => e.currentTarget.style.borderColor = theme.border}
            >
              {/* Play Button */}
              <button
                onClick={() => setPlayingId(playingId === ep.id ? null : ep.id)}
                style={{
                  width: '52px', height: '52px', borderRadius: '50%', flexShrink: 0,
                  backgroundColor: playingId === ep.id ? theme.secondary : 'rgba(255,192,0,0.1)',
                  border: `1.5px solid ${theme.secondary}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {playingId === ep.id
                  ? <Pause size={18} color='#020B1C' fill='#020B1C' />
                  : <Play size={18} color={theme.secondary} fill={theme.secondary} />}
              </button>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '12px', flexWrap: 'wrap' }}>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '750', color: '#FFFFFF', margin: '0 0 4px 0' }}>{ep.titulo}</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '12px', color: theme.secondary, fontWeight: '600' }}>{ep.invitada}</span>
                      <span style={{ fontSize: '11px', color: theme.textMuted }}>{ep.cargo}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                      <Clock size={11} color={theme.textMuted} />
                      <span style={{ fontSize: '11px', color: theme.textMuted }}>{ep.duracion}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                      <Headphones size={11} color={theme.textMuted} />
                      <span style={{ fontSize: '11px', color: theme.textMuted }}>{ep.plays}</span>
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '12px', color: theme.textSecondary, margin: '8px 0', lineHeight: 1.5 }}>{ep.resumen}</p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {ep.temas.map(t => (
                      <span key={t} style={{ fontSize: '9px', fontWeight: '700', color: theme.accent, backgroundColor: 'rgba(255,64,129,0.08)', border: `1px solid rgba(255,64,129,0.2)`, borderRadius: '4px', padding: '2px 6px', textTransform: 'uppercase' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {ep.transcript && (
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.textMuted, display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px' }}
                        onMouseEnter={e => e.currentTarget.style.color = theme.secondary}
                        onMouseLeave={e => e.currentTarget.style.color = theme.textMuted}>
                        <FileText size={12} /> Transcripción
                      </button>
                    )}
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.textMuted, display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px' }}
                      onMouseEnter={e => e.currentTarget.style.color = theme.secondary}
                      onMouseLeave={e => e.currentTarget.style.color = theme.textMuted}>
                      <Share2 size={12} /> Compartir
                    </button>
                  </div>
                </div>

                {/* Progress bar when playing */}
                {playingId === ep.id && (
                  <div style={{ marginTop: '12px' }}>
                    <div style={{ width: '100%', height: '3px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: '35%', height: '100%', backgroundColor: theme.secondary, borderRadius: '2px', transition: 'width 0.3s' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                      <span style={{ fontSize: '9px', color: theme.textMuted }}>13:17</span>
                      <span style={{ fontSize: '9px', color: theme.textMuted }}>{ep.duracion}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clips IA */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Bot size={18} color={theme.secondary} />
          <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>Clips Generados por IA</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
          {CLIPS.map(clip => (
            <div
              key={clip.id}
              style={{
                backgroundColor: theme.cardBgGlass, border: `1px solid ${theme.border}`,
                borderRadius: '12px', padding: '16px', cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = theme.borderHover; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'rgba(255,64,129,0.1)', border: `1px solid ${theme.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Volume2 size={14} color={theme.accent} />
                </div>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: '700', color: '#FFFFFF', margin: '0 0 4px 0', fontStyle: 'italic', lineHeight: 1.3 }}>
                    {clip.titulo}
                  </p>
                  <span style={{ fontSize: '10px', color: theme.textMuted }}>{clip.autora} · {clip.duracion}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Próximos Episodios */}
      <div style={{ backgroundColor: theme.cardBgGlass, border: `1.5px solid ${theme.border}`, borderRadius: '16px', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Radio size={18} color={theme.accent} />
          <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>Próximos Episodios</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {PROXIMAS.map((prox, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', backgroundColor: 'rgba(255,255,255,0.02)', border: `1px solid ${theme.borderSubtle}`, borderRadius: '10px', gap: '16px', flexWrap: 'wrap' }}>
              <div>
                <h5 style={{ fontSize: '13px', fontWeight: '700', color: '#FFFFFF', margin: '0 0 4px 0' }}>{prox.titulo}</h5>
                <span style={{ fontSize: '11px', color: theme.textSecondary }}>{prox.invitada}</span>
              </div>
              <span style={{ fontSize: '11px', color: theme.secondary, fontWeight: '600', flexShrink: 0 }}>{prox.fecha}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
