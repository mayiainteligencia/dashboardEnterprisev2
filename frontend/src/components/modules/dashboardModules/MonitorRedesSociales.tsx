import React, { useState, useEffect, useRef } from 'react';
import { Radio, Heart, TrendingUp, TrendingDown, ThumbsUp, ThumbsDown, Minus, RefreshCw, Camera, Music, MessageCircle, Users, PlayCircle, MessageSquare, Zap } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';
import { ConfirmModal, SuccessToast, useConfirm } from '../../comercial/ConfirmModal';

// ─── Types & Data ─────────────────────────────────────────────────────────────

type Red = 'Fotos' | 'Shorts' | 'Microblog' | 'Red Social' | 'Videos';
type Sentimiento = 'positivo' | 'neutro' | 'negativo';

interface RedMetrica {
  nombre: Red;
  seguidores: number;
  engagement: number;
  tendencia: number;
  color: string;
  Icon: React.FC<{ size: number, color?: string }>;
}

interface Post {
  id: number;
  red: Red;
  usuario: string;
  contenido: string;
  likes: number;
  sentimiento: Sentimiento;
  modelo: string;
  hace: string;
  color: string;
}

const redes: RedMetrica[] = [
  { nombre: 'Fotos', seguidores: 284000, engagement: 4.8, tendencia: 12.3,  color: '#E1306C', Icon: Camera },
  { nombre: 'Shorts',   seguidores: 198000, engagement: 8.2, tendencia: 34.7,  color: '#010101', Icon: Music },
  { nombre: 'Microblog',        seguidores: 91000,  engagement: 2.1, tendencia: -3.2,  color: '#1DA1F2', Icon: MessageCircle  },
  { nombre: 'Red Social', seguidores: 312000, engagement: 1.9, tendencia: -8.1,  color: '#1877F2', Icon: Users },
  { nombre: 'Videos',  seguidores: 74000,  engagement: 6.4, tendencia: 18.6,  color: '#FF0000', Icon: PlayCircle  },
];

const posts: Post[] = [
  { id: 1, red: 'Shorts',    usuario: '@mayiacars',   contenido: '¡El Voltae EV en la ciudad es simplemente BRUTAL 🔥', likes: 48200, sentimiento: 'positivo', modelo: 'Voltae', hace: '2h',  color: '#CC0000' },
  { id: 2, red: 'Fotos', usuario: '@mayia_fans_cdmx', contenido: 'Test drive Lumio — el sonido del motor... 🚗', likes: 12400, sentimiento: 'positivo', modelo: 'Lumio', hace: '4h',  color: '#333333' },
  { id: 3, red: 'Microblog',         usuario: '@auto_journalista', contenido: 'Precio Nexora alto vs competencia. ¿Lo justifica?',  likes: 340,  sentimiento: 'neutro',   modelo: 'Nexora',    hace: '6h',  color: '#666666' },
  { id: 4, red: 'Red Social',  usuario: 'Manejando por México',contenido: 'Problema con el servicio en el distribuidor 😞',  likes: 210,  sentimiento: 'negativo', modelo: 'General',    hace: '1d',  color: '#6B7280' },
];

// Sentiment 7 días
const sentDays = [
  { pos: 72, neu: 19, neg: 9 },
  { pos: 68, neu: 21, neg: 11 },
  { pos: 75, neu: 17, neg: 8 },
  { pos: 71, neu: 20, neg: 9 },
  { pos: 78, neu: 16, neg: 6 },
  { pos: 81, neu: 14, neg: 5 },
  { pos: 79, neu: 15, neg: 6 },
];

const sentCfg: Record<Sentimiento, { color: string; label: string; Icon: React.FC<{ size: number }> }> = {
  positivo: { color: '#10B981', label: 'Positivo', Icon: ({ size }) => <ThumbsUp size={size} /> },
  neutro:   { color: '#9CA3AF', label: 'Neutro',   Icon: ({ size }) => <Minus size={size} /> },
  negativo: { color: '#EF4444', label: 'Negativo', Icon: ({ size }) => <ThumbsDown size={size} /> },
};

const fmt = (n: number) => n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `${(n / 1e3).toFixed(0)}K` : `${n}`;

// ─── Animated counter ─────────────────────────────────────────────────────────
const Counter: React.FC<{ to: number; format?: (n: number) => string; color: string; size?: number }> = ({ to, format = n => `${n}`, color, size = 20 }) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    const s = performance.now(), dur = 1000;
    const tick = (now: number) => {
      const p = Math.min((now - s) / dur, 1);
      setV(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [to]);
  return <span style={{ fontSize: size, fontWeight: '700', color, letterSpacing: '-0.5px', lineHeight: 1 }}>{format(v)}</span>;
};

// ─── Stacked sentiment bars ───────────────────────────────────────────────────
const SentBars: React.FC<{ data: typeof sentDays; animated: boolean }> = ({ data, animated }) => (
  <div style={{ display: 'flex', gap: '3px', height: '32px', alignItems: 'flex-end' }}>
    {data.map((d, i) => (
      <div key={i} style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', gap: '1px', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ height: animated ? `${d.neg}%` : '0%', background: '#EF4444', transition: `height 0.5s ease ${i * 50}ms` }} />
        <div style={{ height: animated ? `${d.neu}%` : '0%', background: '#9CA3AF', transition: `height 0.5s ease ${i * 50 + 80}ms` }} />
        <div style={{ height: animated ? `${d.pos}%` : '0%', background: '#10B981', transition: `height 0.5s ease ${i * 50 + 160}ms` }} />
      </div>
    ))}
  </div>
);

// ─── Live dot ─────────────────────────────────────────────────────────────────
const LiveDot: React.FC = () => {
  const [p, setP] = useState(false);
  useEffect(() => { const t = setInterval(() => setP(x => !x), 1400); return () => clearInterval(t); }, []);
  return (
    <div style={{ position: 'relative', width: '8px', height: '8px' }}>
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%', background: '#10B981',
        transform: p ? 'scale(2.5)' : 'scale(1)', opacity: p ? 0 : 0.4, transition: 'all 1.4s ease',
      }} />
      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export const MonitorRedesSociales: React.FC = () => {
  const confirm = useConfirm();
  const { colores } = brandingConfig;
  const [mounted, setMounted]       = useState(false);
  const [activeRed, setActiveRed]   = useState<Red | 'todas'>('todas');
  const [spinning, setSpinning]     = useState(false);
  const [postIdx, setPostIdx]       = useState(0);
  const [sugIdx, setSugIdx]         = useState(0);

  const sugerencias = [
    "Te recomiendo que capitalices el sentimiento positivo del Voltae EV creando una campaña de 'Video Ads' dirigida a prospectos jóvenes urbanos para agendar pruebas de manejo.",
    "Sugiero amplificar los testimonios de usuarios satisfechos del modelo Lumio en 'Social Ads' para contrarrestar dudas sobre autonomía.",
    "Activa una campaña de retargeting en 'Microblog' para usuarios que mostraron interés inicial en el modelo Nexora pero no agendaron cita."
  ];

  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

  useEffect(() => {
    const filtered = activeRed === 'todas' ? posts : posts.filter(p => p.red === activeRed);
    if (!filtered.length) return;
    const t = setInterval(() => setPostIdx(i => (i + 1) % filtered.length), 4000);
    return () => clearInterval(t);
  }, [activeRed]);

  const filteredPosts = activeRed === 'todas' ? posts : posts.filter(p => p.red === activeRed);
  const safeIdx  = Math.min(postIdx, filteredPosts.length - 1);
  const post     = filteredPosts[safeIdx] ?? null;

  const totalSeg = redes.reduce((s, r) => s + r.seguidores, 0);
  const maxEng   = Math.max(...redes.map(r => r.engagement));
  const posPct   = sentDays[sentDays.length - 1].pos;

  const refresh = () => { setSpinning(true); setTimeout(() => setSpinning(false), 800); };

  return (
    <>
    <div style={{
      backgroundColor: colores.fondoSecundario,
      borderRadius: '24px',
      border: `1px solid ${colores.borde}`,
      padding: '18px 20px',
      display: 'flex', flexDirection: 'column',
      height: '100%', position: 'relative', overflow: 'hidden',
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>

      {/* Multi-color top accent — sutil homenaje a las 5 redes */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: 'linear-gradient(90deg, #E1306C 0%, #010101 25%, #1DA1F2 50%, #1877F2 75%, #FF0000 100%)',
        opacity: 0.6, pointerEvents: 'none',
      }} />

      {/* Ambient orb */}
      <div style={{
        position: 'absolute', top: '-50px', right: '-50px',
        width: '180px', height: '180px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #10B981, #059669)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Radio size={20} color="white" />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: colores.textoClaro, margin: 0 }}>
              Monitoreo de Redes
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '1px' }}>
              <LiveDot />
              <p style={{ fontSize: '11px', color: colores.textoMedio, margin: 0 }}>Tiempo real · 5 plataformas</p>
            </div>
          </div>
        </div>

        <button onClick={refresh} style={{
          background: 'none', border: 'none', cursor: 'pointer', color: colores.textoMedio, display: 'flex',
        }}>
          <RefreshCw size={16}
            style={{ transform: spinning ? 'rotate(360deg)' : 'none', transition: spinning ? 'transform 0.8s linear' : 'none' }}
          />
        </button>
      </div>

      {/* ── KPI strip ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '6px', marginBottom: '10px' }}>
        {[
          { label: 'Seguidores',    to: totalSeg, format: fmt,               color: colores.primario },
          { label: 'Sentimiento +', to: posPct,   format: (n: number) => `${n}%`, color: '#10B981' },
          { label: 'Plataformas',   to: redes.length, format: (n: number) => `${n}`, color: colores.acento },
        ].map((k, i) => (
          <div key={i} style={{
            backgroundColor: colores.fondoTerciario, borderRadius: '10px', padding: '8px 6px',
            border: `1px solid ${colores.borde}`, textAlign: 'center',
            opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(10px)',
            transition: `all 0.45s ease ${i * 80}ms`,
          }}>
            {mounted && <Counter to={k.to} format={k.format} color={k.color} size={18} />}
            <p style={{ fontSize: '9px', color: colores.textoMedio, margin: '2px 0 0', textTransform: 'uppercase', letterSpacing: '0.3px' }}>{k.label}</p>
          </div>
        ))}
      </div>

      {/* ── Platform filter + engagement bars ── */}
      <div style={{
        backgroundColor: colores.fondoTerciario, borderRadius: '10px', padding: '10px 12px',
        border: `1px solid ${colores.borde}`, marginBottom: '8px',
        opacity: mounted ? 1 : 0, transition: 'opacity 0.5s ease 0.2s',
      }}>
        {/* Chips */}
        <div style={{
          display: 'flex', gap: '3px', marginBottom: '10px',
          padding: '3px', backgroundColor: colores.fondoSecundario,
          borderRadius: '10px',
        }}>
          {(['todas', ...redes.map(r => r.nombre)] as (Red | 'todas')[]).map(r => {
            const red = redes.find(x => x.nombre === r);
            const isA = activeRed === r;
            return (
              <button key={r} onClick={() => { setActiveRed(r); setPostIdx(0); }} style={{
                flex: 1, padding: '6px 4px', borderRadius: '7px', border: 'none',
                background: isA ? `linear-gradient(135deg, ${red?.color ?? colores.primario} 0%, ${red?.color ?? colores.secundario} 100%)` : 'transparent',
                color: isA ? 'white' : colores.textoMedio,
                fontSize: '10px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.25s',
              }}>
                {r === 'todas' ? 'Todas' : red && React.createElement(red.Icon, { size: 12 })}
              </button>
            );
          })}
        </div>

        {/* Engagement per platform */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {redes.map((r, i) => {
            const TIcon = r.tendencia > 0 ? TrendingUp : TrendingDown;
            const tc    = r.tendencia > 0 ? '#10B981' : '#EF4444';
            return (
              <div key={r.nombre} style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                opacity: mounted ? 1 : 0, transition: `opacity 0.4s ease ${0.25 + i * 0.06}s`,
              }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '18px', flexShrink: 0 }}>
                  {React.createElement(r.Icon, { size: 14, color: r.color })}
                </span>
                <div style={{ flex: 1, height: '4px', borderRadius: '2px', background: colores.fondoSecundario, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: '2px', background: r.color,
                    width: mounted ? `${(r.engagement / maxEng) * 100}%` : '0%',
                    transition: `width 0.9s cubic-bezier(0.34,1.56,0.64,1) ${0.35 + i * 0.08}s`,
                  }} />
                </div>
                <span style={{ fontSize: '10px', color: colores.textoMedio, width: '26px', textAlign: 'right', flexShrink: 0 }}>{r.engagement}%</span>
                <div style={{ display: 'flex', alignItems: 'center', width: '36px', flexShrink: 0 }}>
                  <TIcon size={9} color={tc} />
                  <span style={{ fontSize: '9px', color: tc, fontWeight: '600' }}>{Math.abs(r.tendencia)}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Sentiment chart ── */}
      <div style={{
        backgroundColor: colores.fondoTerciario, borderRadius: '10px', padding: '10px 12px',
        border: `1px solid ${colores.borde}`, marginBottom: '8px',
        opacity: mounted ? 1 : 0, transition: 'opacity 0.5s ease 0.3s',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <p style={{ fontSize: '11px', fontWeight: '600', color: colores.textoClaro, margin: 0 }}>Sentimiento · 7 días</p>
          <div style={{ display: 'flex', gap: '6px' }}>
            {[{ c: '#10B981', l: 'pos' }, { c: '#9CA3AF', l: 'neu' }, { c: '#EF4444', l: 'neg' }].map((x, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '1px', background: x.c }} />
                <span style={{ fontSize: '9px', color: colores.textoMedio }}>{x.l}</span>
              </div>
            ))}
          </div>
        </div>
        <SentBars data={sentDays} animated={mounted} />
      </div>

      {/* ── Auto-cycling post ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: '10px', color: colores.textoMedio, margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>
          Mención destacada
        </p>
        {post && (
          <div key={post.id}
            style={{
              flex: 1,
              background: `linear-gradient(135deg, ${post.color}12 0%, ${post.color}04 100%)`,
              borderLeft: `4px solid ${post.color}`,
              borderRadius: '10px', padding: '10px 12px',
              cursor: 'default', transition: 'all 0.25s ease',
              animation: 'rsFade 0.4s ease',
              position: 'relative',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)'; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${post.color}28`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateX(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {(() => {
                    const foundRed = redes.find(r => r.nombre === post.red);
                    return foundRed ? React.createElement(foundRed.Icon, { size: 16, color: foundRed.color }) : null;
                  })()}
                </span>
                <div>
                  <p style={{ fontSize: '11px', fontWeight: '700', color: colores.textoClaro, margin: 0 }}>{post.usuario}</p>
                  <p style={{ fontSize: '9px', color: colores.textoMedio, margin: 0 }}>{post.red} · {post.hace}</p>
                </div>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '3px',
                padding: '2px 6px', borderRadius: '7px',
                background: `${sentCfg[post.sentimiento].color}15`,
              }}>
                {React.createElement(sentCfg[post.sentimiento].Icon, { size: 8 })}
                <span style={{ fontSize: '9px', color: sentCfg[post.sentimiento].color, fontWeight: '700', marginLeft: '2px' }}>
                  {sentCfg[post.sentimiento].label}
                </span>
              </div>
            </div>

            <p style={{ fontSize: '11px', color: colores.textoMedio, margin: '0 0 8px', lineHeight: '1.4' }}>
              {post.contenido}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Heart size={11} color="#EF4444" />
                <span style={{ fontSize: '10px', color: colores.textoMedio, fontWeight: '600' }}>{fmt(post.likes)}</span>
              </div>
              <span style={{ fontSize: '9px', color: post.color, fontWeight: '600', padding: '2px 6px', borderRadius: '5px', background: `${post.color}15` }}>
                {post.modelo}
              </span>
              <div style={{ display: 'flex', gap: '4px' }}>
                {filteredPosts.map((_, i) => (
                  <div key={i} style={{
                    width: i === safeIdx ? '12px' : '4px', height: '4px', borderRadius: '2px',
                    background: i === safeIdx ? post.color : colores.borde,
                    transition: 'all 0.3s ease',
                  }} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Footer AI Recommendation ── */}
      <div style={{
        marginTop: '10px', 
        padding: '10px 12px',
        borderRadius: '10px', 
        border: `1px solid ${colores.primario}40`,
        background: `${colores.primario}10`,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
          <div style={{ flexShrink: 0, marginTop: '2px' }}>
            <MessageSquare size={14} color={colores.primario} />
          </div>
          <p style={{ fontSize: '11px', color: colores.textoClaro, margin: 0, lineHeight: 1.4 }}>
            <strong style={{ color: colores.primario }}>MAYIA sugiere:</strong> {sugerencias[sugIdx]}
          </p>
        </div>
        <button
          onClick={() => setSugIdx(prev => (prev + 1) % sugerencias.length)}
          style={{
            alignSelf: 'flex-end',
            background: 'transparent',
            border: `1px solid ${colores.primario}60`,
            color: colores.primario,
            padding: '3px 8px',
            borderRadius: '6px',
            fontSize: '9px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = `${colores.primario}20`; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          Propónme otra
        </button>
        <button
          onClick={confirm.requestConfirm}
          style={{
            alignSelf: 'flex-end',
            background: `linear-gradient(135deg, ${colores.exito || '#22c55e'}, #059669)`,
            border: 'none',
            color: '#fff',
            padding: '3px 10px',
            borderRadius: '6px',
            fontSize: '9px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: `0 2px 6px rgba(34,197,94,.3)`,
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <Zap size={9} /> Hazlo
        </button>
      </div>

      <style>{`
        @keyframes rsFade {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
    <ConfirmModal open={confirm.modalOpen} onAccept={confirm.handleAccept} onDecline={confirm.handleDecline} />
    <SuccessToast show={confirm.toastVisible} />
    </>
  );
};