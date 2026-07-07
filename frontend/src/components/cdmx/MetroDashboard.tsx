import React, { useState, useEffect, useRef } from 'react';
import { Users, Train, AlertTriangle, CheckCircle, TrendingUp, Zap, Clock, Navigation, ArrowRight, Activity, Radio } from 'lucide-react';

interface MetroDashboardProps {
  onNavigate?: (section: string) => void;
}

const ACCESOS_RAPIDOS = [
  { or: 'Indios Verdes', dest: 'Tasqueña', tiempo: '35 min', linea: 'L3', color: '#007D63' },
  { or: 'Observatorio', dest: 'Pantitlán', tiempo: '42 min', linea: 'L1', color: '#F54394' },
  { or: 'Balderas', dest: 'Auditorio', tiempo: '18 min', linea: 'L1', color: '#F54394' },
  { or: 'Buenavista', dest: 'Zócalo', tiempo: '14 min', linea: 'L2', color: '#004F9F' },
  { or: 'Mixcoac', dest: 'Universidad', tiempo: '22 min', linea: 'L3', color: '#007D63' },
  { or: 'Martín Carrera', dest: 'Politécnico', tiempo: '12 min', linea: 'L6', color: '#DA0000' },
];

const NOTICIAS = [
  { tipo: 'ALERTA', titulo: 'L3: Retraso por afluencia', detalle: 'Trenes con retrasos de hasta 8 min entre Indios Verdes y La Raza por alta demanda en hora pico.', color: '#D40000', bg: 'rgba(212,0,0,0.08)', border: 'rgba(212,0,0,0.2)' },
  { tipo: 'OPERATIVO', titulo: 'L7: Servicio normalizado', detalle: 'Se restablece el servicio regular en toda la línea tras revisión preventiva en Constituyentes.', color: '#00843D', bg: 'rgba(0,132,61,0.08)', border: 'rgba(0,132,61,0.2)' },
  { tipo: 'INFO', titulo: 'BiciRed activo este domingo', detalle: 'Este domingo puedes ingresar con bicicleta al metro de 06:00 a 22:00 hrs sin costo adicional.', color: '#003DA5', bg: 'rgba(0,61,165,0.08)', border: 'rgba(0,61,165,0.2)' },
  { tipo: 'ALERTA', titulo: 'Metrobús L1: Desvío', detalle: 'Desvío en Av. Insurgentes a la altura de El Ángel. Servicio continúa por rutas alternas.', color: '#F5A623', bg: 'rgba(245,166,35,0.08)', border: 'rgba(245,166,35,0.2)' },
  { tipo: 'OPERATIVO', titulo: 'L12: Obras concluidas', detalle: 'Se concluyen trabajos de mantenimiento en estación Tláhuac. Servicio regular restablecido.', color: '#00843D', bg: 'rgba(0,132,61,0.08)', border: 'rgba(0,132,61,0.2)' },
];

// Passenger volume by hour (05:00 to 00:00)
const AFLUENCIA = [
  { h: '05', v: 15 }, { h: '06', v: 42 }, { h: '07', v: 78 }, { h: '08', v: 98 },
  { h: '09', v: 85 }, { h: '10', v: 60 }, { h: '11', v: 50 }, { h: '12', v: 55 },
  { h: '13', v: 65 }, { h: '14', v: 58 }, { h: '15', v: 50 }, { h: '16', v: 55 },
  { h: '17', v: 72 }, { h: '18', v: 96 }, { h: '19', v: 88 }, { h: '20', v: 70 },
  { h: '21', v: 52 }, { h: '22', v: 38 }, { h: '23', v: 20 }, { h: '00', v: 8 },
];

const TICKER_TEXT = 'L3 Normalizada · Programa BiciRed Activo este Domingo · Obras L12 concluidas · Metrobús L4 desvío en Insurgentes · Trolebús Elevado operando regularmente · L7 Revisión preventiva completada · Cablebús L2 servicio continuo · ';

export const MetroDashboard: React.FC<MetroDashboardProps> = ({ onNavigate }) => {
  const [pasajeros, setPasajeros] = useState(0);
  const [trenes, setTrenes] = useState(0);
  const [barsAnimated, setBarsAnimated] = useState(false);
  const [noticiaOpen, setNoticiaOpen] = useState<number | null>(null);
  const currentHour = new Date().getHours();

  // Animated counters
  useEffect(() => {
    const targetP = 4823190;
    const targetT = 147;
    const duration = 1600;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const t = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = 1 - Math.pow(1 - progress, 3);
      setPasajeros(Math.floor(targetP * ease));
      setTrenes(Math.floor(targetT * ease));
      if (step >= steps) clearInterval(t);
    }, interval);
    return () => clearInterval(t);
  }, []);

  // Trigger bar animation after mount
  useEffect(() => {
    const t = setTimeout(() => setBarsAnimated(true), 200);
    return () => clearTimeout(t);
  }, []);

  const maxV = Math.max(...AFLUENCIA.map(d => d.v));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '60px' }}>

      {/* KPI CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
        {[
          { label: 'Pasajeros Hoy', value: pasajeros.toLocaleString('es-MX'), icon: Users, color: '#003DA5', bg: 'rgba(0,61,165,0.1)', border: 'rgba(0,61,165,0.25)' },
          { label: 'Trenes en Circulación', value: `${trenes}`, icon: Train, color: '#D40000', bg: 'rgba(212,0,0,0.1)', border: 'rgba(212,0,0,0.25)' },
          { label: 'Líneas Operando', value: '12 / 12', icon: CheckCircle, color: '#00843D', bg: 'rgba(0,132,61,0.1)', border: 'rgba(0,132,61,0.25)' },
          { label: 'Incidencias Activas', value: '3', icon: AlertTriangle, color: '#F5A623', bg: 'rgba(245,166,35,0.1)', border: 'rgba(245,166,35,0.25)', pulse: true },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} style={{
              background: '#1A1A2E', border: `1px solid ${kpi.border}`,
              borderRadius: '16px', padding: '18px 20px',
              display: 'flex', flexDirection: 'column', gap: '10px',
              animation: `cardEnter 0.4s ease ${i * 0.08}s both`,
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: kpi.color, opacity: 0.8 }} />
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: kpi.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `1px solid ${kpi.border}`,
              }}>
                <Icon size={18} color={kpi.color} />
              </div>
              <div>
                <div style={{ fontSize: '22px', fontWeight: '800', color: '#fff', fontFamily: 'Outfit, sans-serif', lineHeight: 1 }}>
                  {kpi.value}
                  {(kpi as any).pulse && (
                    <span style={{
                      display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%',
                      background: '#F5A623', marginLeft: '6px', verticalAlign: 'middle',
                      animation: 'pulse-glow 1.5s infinite',
                    }} />
                  )}
                </div>
                <div style={{ fontSize: '11px', color: '#A0AEC0', marginTop: '4px' }}>{kpi.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MAIN GRID: Chart + News */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '18px' }}>

        {/* AFLUENCIA CHART */}
        <div style={{ background: '#1A1A2E', border: '1px solid #2A2A3E', borderRadius: '16px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#fff', fontFamily: 'Outfit, sans-serif', margin: 0 }}>
                Afluencia por Hora
              </h3>
              <div style={{ fontSize: '11px', color: '#A0AEC0', marginTop: '2px' }}>Pasajeros estimados en tiempo real</div>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '10px', color: '#A0AEC0' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#D40000' }} /> Actual
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#003DA5' }} /> Pasado
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#2A2A4A' }} /> Futuro
              </span>
            </div>
          </div>

          {/* SVG Chart */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '120px' }}>
            {AFLUENCIA.map((d, i) => {
              const h = parseInt(d.h === '00' ? '24' : d.h);
              const isPast = h < currentHour;
              const isCurrent = h === currentHour;
              const barColor = isCurrent ? '#D40000' : isPast ? '#003DA5' : '#2A2A4A';
              const targetH = barsAnimated ? `${(d.v / maxV) * 100}%` : '0%';
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
                  <div style={{
                    width: '100%', background: barColor, borderRadius: '3px 3px 0 0',
                    height: targetH, transition: `height 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 30}ms`,
                    boxShadow: isCurrent ? '0 0 8px rgba(212,0,0,0.5)' : 'none',
                    minHeight: '2px',
                  }} />
                  <div style={{ fontSize: '9px', color: isCurrent ? '#D40000' : '#4A5568', fontWeight: isCurrent ? '700' : '400', whiteSpace: 'nowrap' }}>
                    {d.h}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Network status bar */}
          <div style={{ marginTop: '18px', paddingTop: '16px', borderTop: '1px solid #2A2A3E' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', color: '#A0AEC0', fontWeight: '600' }}>Estado global de la red</span>
              <span style={{ fontSize: '13px', fontWeight: '800', color: '#00843D' }}>92%</span>
            </div>
            <div style={{ height: '8px', background: '#2A2A3E', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: '4px',
                background: 'linear-gradient(90deg, #00843D 0%, #003DA5 70%, #F5A623 92%, #D40000 100%)',
                width: barsAnimated ? '92%' : '0%',
                transition: 'width 1.2s ease 0.5s',
              }} />
            </div>
            <div style={{ display: 'flex', gap: '14px', marginTop: '8px', fontSize: '10px' }}>
              {[
                { label: 'Normal', count: 10, color: '#00843D' },
                { label: 'Lento', count: 2, color: '#F5A623' },
                { label: 'Incidencia', count: 0, color: '#D40000' },
              ].map((s, i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#A0AEC0' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: s.color }} />
                  {s.count} {s.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* NEWS FEED */}
        <div style={{ background: '#1A1A2E', border: '1px solid #2A2A3E', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Radio size={14} color="#D40000" />
            <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#fff', fontFamily: 'Outfit, sans-serif', margin: 0 }}>
              Noticias en Vivo
            </h3>
            <div style={{ marginLeft: 'auto', width: '7px', height: '7px', borderRadius: '50%', background: '#D40000', animation: 'pulse-glow 1.5s infinite' }} />
          </div>
          {NOTICIAS.map((n, i) => (
            <div key={i}
              onClick={() => setNoticiaOpen(noticiaOpen === i ? null : i)}
              style={{
                background: noticiaOpen === i ? n.bg : 'rgba(255,255,255,0.02)',
                border: `1px solid ${noticiaOpen === i ? n.border : '#2A2A3E'}`,
                borderRadius: '10px', padding: '10px 12px', cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = n.border; }}
              onMouseLeave={e => { if (noticiaOpen !== i) e.currentTarget.style.borderColor = '#2A2A3E'; }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '9px', fontWeight: '800', color: n.color, background: `${n.bg}`, border: `1px solid ${n.border}`, padding: '2px 6px', borderRadius: '4px', letterSpacing: '0.05em' }}>
                    {n.tipo}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#fff' }}>{n.titulo}</span>
                </div>
                <span style={{ color: '#4A5568', fontSize: '12px' }}>{noticiaOpen === i ? '▲' : '▼'}</span>
              </div>
              {noticiaOpen === i && (
                <p style={{ fontSize: '11px', color: '#A0AEC0', lineHeight: 1.5, margin: '8px 0 0', animation: 'fadeInUp 0.2s ease' }}>
                  {n.detalle}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ACCESOS RAPIDOS */}
      <div style={{ background: '#1A1A2E', border: '1px solid #2A2A3E', borderRadius: '16px', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={14} color="#F5A623" />
            <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#fff', fontFamily: 'Outfit, sans-serif', margin: 0 }}>
              Accesos Rápidos — Rutas Frecuentes
            </h3>
          </div>
          {onNavigate && (
            <button onClick={() => onNavigate('home')}
              style={{ fontSize: '11px', color: '#D40000', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Ver planificador <ArrowRight size={11} />
            </button>
          )}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          {ACCESOS_RAPIDOS.map((r, i) => (
            <div key={i}
              onClick={() => onNavigate && onNavigate('home')}
              style={{
                background: '#121212', border: '1px solid #2A2A3E', borderRadius: '12px', padding: '12px 14px',
                cursor: onNavigate ? 'pointer' : 'default', transition: 'all 0.2s',
                display: 'flex', flexDirection: 'column', gap: '8px',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = r.color; e.currentTarget.style.background = '#16161E'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2A3E'; e.currentTarget.style.background = '#121212'; }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ background: r.color, color: '#fff', fontSize: '9px', fontWeight: '800', padding: '2px 6px', borderRadius: '4px' }}>{r.linea}</span>
                <Clock size={10} color="#A0AEC0" />
                <span style={{ fontSize: '11px', color: '#A0AEC0' }}>{r.tiempo}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#fff' }}>{r.or}</span>
                <ArrowRight size={10} color="#4A5568" />
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#fff' }}>{r.dest}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MARQUEE TICKER */}
      <div style={{
        position: 'fixed', bottom: 0, left: '240px', right: 0, zIndex: 50,
        background: 'rgba(13,13,13,0.96)', borderTop: '1px solid #1E1E2A',
        padding: '8px 0', overflow: 'hidden', display: 'flex', alignItems: 'center',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          paddingLeft: '14px', paddingRight: '14px', flexShrink: 0,
        }}>
          <Activity size={12} color="#D40000" />
          <span style={{ fontSize: '10px', fontWeight: '800', color: '#D40000', textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>EN VIVO</span>
          <div style={{ width: '1px', height: '14px', background: '#2A2A3E' }} />
        </div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{
            display: 'flex', whiteSpace: 'nowrap',
            animation: 'marquee 40s linear infinite',
          }}>
            <span style={{ fontSize: '11px', color: '#A0AEC0', paddingRight: '60px' }}>{TICKER_TEXT}{TICKER_TEXT}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
