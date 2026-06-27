import React, { useState, useEffect } from 'react';
import { brandingConfig } from '../../../config/branding';
import { useLiveFeed } from '../../../context/LiveFeedContext';
import { Clock, TrendingUp, Zap } from 'lucide-react';

const { empresa, colores } = brandingConfig;

function useTime() {
  const [t, setT] = useState(new Date());
  useEffect(() => {
    const i = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(i);
  }, []);
  return t;
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Buenos días';
  if (h < 19) return 'Buenas tardes';
  return 'Buenas noches';
}

export const WelcomeHeader: React.FC = () => {
  const time = useTime();
  const { events } = useLiveFeed();
  const [tickerIdx, setTickerIdx] = useState(0);

  // Rotar ticker
  useEffect(() => {
    if (events.length === 0) return;
    const i = setInterval(() => setTickerIdx(p => (p + 1) % Math.min(events.length, 8)), 3500);
    return () => clearInterval(i);
  }, [events.length]);

  const timeStr = time.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const dateStr = time.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' });
  const dateCapitalized = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

  const tickerEvent = events[tickerIdx];

  return (
    <div style={{ marginBottom: '24px' }}>
      {/* Main header row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '12px', flexWrap: 'wrap' }}>
        {/* Logo MAYIA */}
        <div style={{
          width: '64px', height: '64px', borderRadius: '16px',
          background: colores.primario,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          boxShadow: `0 8px 24px ${colores.primario}40`,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <img
            src="/assets/logosNativos/mayiaLogoBlanco.png"
            alt="MAYIA"
            style={{ width: '80%', height: '80%', objectFit: 'contain' }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          {/* Animated glow */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Greeting */}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 'clamp(22px,4vw,36px)', fontWeight: 300, color: colores.textoClaro, margin: 0, letterSpacing: '-0.5px' }}>
            {greeting()},{' '}
            <span style={{ fontWeight: 700 }}>{empresa.nombre}</span>
          </h1>
          <p style={{ fontSize: '14px', color: colores.textoMedio, margin: '4px 0 0' }}>
            Centro de ventas con inteligencia artificial activa
          </p>
        </div>

        {/* Clock + date */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
          padding: '12px 18px',
          background: colores.fondoSecundario,
          borderRadius: '14px',
          border: `1px solid ${colores.borde}`,
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={14} color={colores.primario} />
            <span style={{
              fontSize: '22px', fontWeight: 700, color: colores.textoClaro,
              fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.5px',
            }}>
              {timeStr}
            </span>
          </div>
          <span style={{ fontSize: '11px', color: colores.textoMedio, marginTop: '2px' }}>{dateCapitalized}</span>
        </div>
      </div>

      {/* KPI pills row */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
        {[
          { label: 'Ventas hoy', value: `${1226 + events.filter(e => e.type === 'venta').length}`, icon: TrendingUp, color: colores.primario },
          { label: 'Leads activos', value: `${9870 + events.filter(e => e.type === 'lead').length * 3}`, icon: Zap, color: '#8B5CF6' },
          { label: 'Agentes IA', value: '4 Online', icon: Clock, color: '#10B981' },
        ].map(k => (
          <div key={k.label} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '8px 14px',
            background: `${k.color}10`,
            border: `1px solid ${k.color}30`,
            borderRadius: '10px',
          }}>
            <k.icon size={14} color={k.color} />
            <span style={{ fontSize: '12px', color: colores.textoMedio }}>{k.label}:</span>
            <span style={{ fontSize: '13px', fontWeight: 700, color: k.color }}>{k.value}</span>
          </div>
        ))}
      </div>

      {/* Live ticker */}
      {tickerEvent && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '10px 16px',
          background: 'linear-gradient(90deg, #CC000008 0%, transparent 100%)',
          borderRadius: '10px',
          border: `1px solid ${colores.borde}`,
          overflow: 'hidden',
          animation: 'tickerFade 0.5s ease',
        }}>
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: colores.primario,
            animation: 'tickerPulse 1s infinite',
            flexShrink: 0,
          }} />
          <span style={{ fontSize: '11px', fontWeight: 700, color: colores.primario, textTransform: 'uppercase', letterSpacing: '0.5px', flexShrink: 0 }}>
            EN VIVO
          </span>
          <span style={{ fontSize: '13px', color: colores.textoClaro, fontWeight: 500 }}>
            {tickerEvent.title}
          </span>
          <span style={{ fontSize: '12px', color: colores.textoMedio }}>
            — {tickerEvent.body}
          </span>
          <span style={{ fontSize: '11px', color: colores.textoOscuro, marginLeft: 'auto', flexShrink: 0 }}>
            {tickerEvent.time}
          </span>
        </div>
      )}

      <style>{`
        @keyframes tickerFade {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes tickerPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 #CC000040; }
          50% { opacity: 0.7; box-shadow: 0 0 0 6px transparent; }
        }
      `}</style>
    </div>
  );
};