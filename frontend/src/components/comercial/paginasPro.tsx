import React, { useState, useEffect } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Crown, Target, Megaphone, Users, Package, Repeat,
  TrendingUp, Trophy, AlertTriangle, Flame, Snowflake,
} from 'lucide-react';
import { brandingConfig } from '../../config/branding';
import {
  agencias, scoring, scoringFactores, campanias, campaniaDetalle, vendedores,
  vendedorEtapas, inventario, conversionFunnel, retencionCohorte,
} from './data';

export const colores = brandingConfig.colores;
export const tnum: React.CSSProperties = { fontVariantNumeric: 'tabular-nums' };

// ── Entrada escalonada ───────────────────────────────────────────────────────────
export const Reveal: React.FC<{ delay?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ delay = 0, children, style }) => {
  const [m, setM] = useState(false);
  useEffect(() => { const t = setTimeout(() => setM(true), 30 + delay); return () => clearTimeout(t); }, [delay]);
  return <div style={{ ...style, opacity: m ? 1 : 0, transform: m ? 'translateY(0)' : 'translateY(12px)', transition: 'opacity .45s ease, transform .45s cubic-bezier(.34,1.4,.64,1)' }}>{children}</div>;
};

// ── Sparkline ────────────────────────────────────────────────────────────────────
const Spark: React.FC<{ data: number[]; color: string; w?: number; h?: number }> = ({ data, color, w = 92, h = 30 }) => {
  const min = Math.min(...data), max = Math.max(...data), r = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - 2 - ((v - min) / r) * (h - 4)}`);
  const id = color.replace('#', '') + data.length;
  return (
    <svg width={w} height={h} style={{ overflow: 'visible' }}>
      <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.28" /><stop offset="100%" stopColor={color} stopOpacity="0" /></linearGradient></defs>
      <polygon points={`0,${h} ${pts.join(' ')} ${w},${h}`} fill={`url(#${id})`} />
      <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

// ── Hero KPI ─────────────────────────────────────────────────────────────────────
export const HeroKPI: React.FC<{ label: string; value: string; delta?: string; up?: boolean; accent?: string; spark?: number[]; i?: number }> = ({ label, value, delta, up, accent = colores.primario, spark, i = 0 }) => (
  <Reveal delay={i * 60} style={{ height: '100%' }}>
    <div style={{ position: 'relative', background: colores.fondoSecundario, border: `1px solid ${colores.borde}`, borderRadius: '18px', padding: '16px 18px', overflow: 'hidden', boxShadow: colores.sombra, height: '100%' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: accent }} />
      <p style={{ fontSize: '11px', color: colores.textoMedio, margin: 0, textTransform: 'uppercase', letterSpacing: '0.4px', fontWeight: 600 }}>{label}</p>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '8px', marginTop: '4px' }}>
        <span style={{ ...tnum, fontSize: '26px', fontWeight: 800, color: colores.textoClaro, lineHeight: 1.05 }}>{value}</span>
        {spark && <Spark data={spark} color={accent} />}
      </div>
      {delta && <span style={{ ...tnum, fontSize: '12px', fontWeight: 700, color: up ? colores.exito : colores.peligro }}>{up ? '▲' : '▼'} {delta}</span>}
    </div>
  </Reveal>
);

// ── Donut (conic) ────────────────────────────────────────────────────────────────
export const Donut: React.FC<{ segs: { v: number; color: string; label: string }[]; size?: number; center?: React.ReactNode }> = ({ segs, size = 150, center }) => {
  const total = segs.reduce((s, x) => s + x.v, 0) || 1;
  let acc = 0;
  const stops = segs.map(s => { const a = acc; acc += s.v / total; return `${s.color} ${a * 360}deg ${acc * 360}deg`; }).join(', ');
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', position: 'relative', background: `conic-gradient(${stops})`, flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: '24%', borderRadius: '50%', background: colores.fondoSecundario, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>{center}</div>
    </div>
  );
};

// ── Gauge semicircular ───────────────────────────────────────────────────────────
export const Gauge: React.FC<{ value: number; color: string; label: string }> = ({ value, color, label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
    <div style={{ width: '150px', height: '150px', borderRadius: '50%', position: 'relative', background: `conic-gradient(${color} ${value * 3.6}deg, ${colores.fondoTerciario} 0deg)`, transition: 'background .5s ease' }}>
      <div style={{ position: 'absolute', inset: '15px', borderRadius: '50%', background: colores.fondoSecundario, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ ...tnum, fontSize: '28px', fontWeight: 800, color }}>{value}%</span>
        <span style={{ fontSize: '10px', color: colores.textoMedio }}>{label}</span>
      </div>
    </div>
  </div>
);

// ── Barra que crece al montar ────────────────────────────────────────────────────
export const GrowBar: React.FC<{ pct: number; color: string; delay?: number; h?: number }> = ({ pct, color, delay = 0, h = 14 }) => {
  const [m, setM] = useState(false);
  useEffect(() => { const t = setTimeout(() => setM(true), 80 + delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div style={{ flex: 1, height: h, borderRadius: h / 2, background: colores.fondoTerciario, overflow: 'hidden' }}>
      <div style={{ width: m ? `${Math.min(pct, 100)}%` : 0, height: '100%', borderRadius: h / 2, background: color, transition: 'width .8s cubic-bezier(.22,1,.36,1)' }} />
    </div>
  );
};

// ── Panel ────────────────────────────────────────────────────────────────────────
export const Panel: React.FC<{ title?: string; children: React.ReactNode; style?: React.CSSProperties }> = ({ title, children, style }) => (
  <div style={{ background: colores.fondoSecundario, border: `1px solid ${colores.borde}`, borderRadius: '22px', padding: '22px', boxShadow: colores.sombra, ...style }}>
    {title && <h3 style={{ fontSize: '14px', fontWeight: 800, color: colores.textoClaro, margin: '0 0 16px', letterSpacing: '-0.2px' }}>{title}</h3>}
    {children}
  </div>
);

// ── Shell de página ──────────────────────────────────────────────────────────────
export const Shell: React.FC<{ icon: LucideIcon; title: string; subtitle: string; badge?: React.ReactNode; kpis: React.ReactNode; children: React.ReactNode }> = ({ icon: Icon, title, subtitle, badge, kpis, children }) => (
  <div style={{ minHeight: '100vh', background: colores.fondoPrincipal }}>
    <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <Reveal>
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '22px', padding: '22px 26px', color: '#fff', background: `linear-gradient(120deg, ${colores.primarioOscuro} 0%, ${colores.primario} 60%, ${colores.primarioClaro} 130%)`, boxShadow: `0 10px 28px ${colores.primario}40` }}>
          <div style={{ position: 'absolute', right: '-30px', top: '-30px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(255,255,255,0.10)' }} />
          <div style={{ position: 'absolute', right: '60px', bottom: '-50px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', position: 'relative' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, backdropFilter: 'blur(4px)' }}>
              <Icon size={26} color="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: '23px', fontWeight: 800, margin: 0 }}>{title}</h1>
              <p style={{ fontSize: '13px', margin: 0, opacity: 0.85 }}>{subtitle}</p>
            </div>
            {badge}
          </div>
        </div>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '14px' }}>{kpis}</div>
      {children}
    </div>
  </div>
);

export const badgeLive = <span style={{ padding: '6px 12px', borderRadius: '20px', background: 'rgba(255,255,255,0.2)', fontSize: '12px', fontWeight: 700 }}>● EN VIVO</span>;

// ════════════════════════════════════════════════════════════════════════════════
// 1 · VISTA CEO
// ════════════════════════════════════════════════════════════════════════════════
export const PaginaCEO: React.FC = () => {
  const [sel, setSel] = useState<string | null>(null);
  const totalVentas = agencias.reduce((s, a) => s + a.ventas, 0);
  const totalMeta = agencias.reduce((s, a) => s + a.meta, 0);
  const totalLeads = agencias.reduce((s, a) => s + a.leads, 0);
  const conv = (agencias.reduce((s, a) => s + a.conv, 0) / agencias.length).toFixed(1);
  const cumpl = Math.round((totalVentas / totalMeta) * 100);
  const maxV = Math.max(...agencias.map(a => a.ventas));
  const top = [...agencias].sort((a, b) => b.ventas - a.ventas);
  const col = (e: string) => e === 'verde' ? colores.exito : e === 'amarillo' ? colores.advertencia : colores.peligro;
  // ventas por región para donut
  const regiones = Array.from(new Set(agencias.map(a => a.estado)));
  const segs = regiones.map((e, i) => ({ v: agencias.filter(a => a.estado === e).reduce((s, a) => s + a.ventas, 0), color: col(e), label: e, key: i }));

  return (
    <Shell icon={Crown} title="Vista CEO" subtitle="13 agencias · consolidado en tiempo real" badge={badgeLive}
      kpis={<>
        <HeroKPI i={0} label="Ventas mes" value={`${totalVentas}`} delta="8.4%" up accent={colores.primario} spark={[1180, 1240, 1190, 1320, 1380, totalVentas]} />
        <HeroKPI i={1} label="Cumpl. meta" value={`${cumpl}%`} delta={`${totalMeta} obj.`} up accent={colores.exito} spark={[78, 80, 79, 84, 86, cumpl]} />
        <HeroKPI i={2} label="Leads" value={`${(totalLeads / 1000).toFixed(1)}K`} delta="12.8%" up accent="#2563EB" spark={[8.1, 8.6, 9.0, 9.4, 9.9, totalLeads / 1000]} />
        <HeroKPI i={3} label="Conversión" value={`${conv}%`} delta="1.2 pts" up accent="#7C3AED" spark={[11, 12, 12.4, 13, 13.2, +conv]} />
      </>}>
      <div className="row2">
        <Reveal delay={120}><Panel title="Ventas vs meta por agencia · clic para resaltar">
          {top.map((a, i) => {
            const pct = Math.round((a.ventas / a.meta) * 100);
            const on = sel === a.nombre;
            return (
              <div key={a.nombre} onClick={() => setSel(on ? null : a.nombre)}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 8px', borderRadius: '10px', cursor: 'pointer', background: on ? colores.fondoTerciario : 'transparent', transition: 'background .2s' }}>
                <span style={{ ...tnum, fontSize: '12px', fontWeight: 800, color: i < 3 ? colores.primario : colores.textoOscuro, width: '20px' }}>{i + 1}</span>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: col(a.estado), boxShadow: `0 0 0 3px ${col(a.estado)}22`, flexShrink: 0 }} />
                <span style={{ fontSize: '13px', fontWeight: 700, color: colores.textoClaro, width: '92px', flexShrink: 0 }}>{a.nombre}</span>
                <GrowBar pct={pct} color={col(a.estado)} delay={i * 45} />
                <span style={{ ...tnum, fontSize: '12px', fontWeight: 700, color: colores.textoMedio, width: '68px', textAlign: 'right' }}>{a.ventas}/{a.meta}</span>
              </div>
            );
          })}
        </Panel></Reveal>
        <Reveal delay={180}><Panel title="Mix de ventas por desempeño">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <Donut segs={segs} center={<><span style={{ ...tnum, fontSize: '22px', fontWeight: 800, color: colores.textoClaro }}>{totalVentas}</span><span style={{ fontSize: '10px', color: colores.textoMedio }}>ventas</span></>} />
          </div>
          {segs.map(s => (
            <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: s.color }} />
              <span style={{ fontSize: '12px', color: colores.textoClaro, flex: 1, textTransform: 'capitalize' }}>{s.label === 'verde' ? 'En meta' : s.label === 'amarillo' ? 'En riesgo' : 'Bajo meta'}</span>
              <span style={{ ...tnum, fontSize: '12px', fontWeight: 700, color: colores.textoMedio }}>{s.v}</span>
            </div>
          ))}
        </Panel></Reveal>
      </div>
    </Shell>
  );
};

// ════════════════════════════════════════════════════════════════════════════════
// 2 · LEAD SCORING
// ════════════════════════════════════════════════════════════════════════════════
export const PaginaScoring: React.FC = () => {
  const [sel, setSel] = useState(scoring[0].nombre);
  const dist = { alta: scoring.filter(s => s.intencion === 'alta').length, media: scoring.filter(s => s.intencion === 'media').length, baja: scoring.filter(s => s.intencion === 'baja').length };
  const prom = Math.round(scoring.reduce((s, x) => s + x.score, 0) / scoring.length);
  const sc = scoring.find(s => s.nombre === sel)!;
  const f = scoringFactores[sel];
  const scoreCol = (n: number) => n >= 80 ? colores.exito : n >= 50 ? colores.advertencia : colores.peligro;

  return (
    <Shell icon={Target} title="Lead Scoring IA" subtitle="Intención de compra calculada por IA"
      badge={<span style={{ padding: '6px 12px', borderRadius: '20px', background: 'rgba(255,255,255,0.2)', fontSize: '12px', fontWeight: 700 }}>IA</span>}
      kpis={<>
        <HeroKPI i={0} label="Score promedio" value={`${prom}`} delta="alta calidad" up accent={colores.primario} spark={[58, 61, 64, 66, 65, prom]} />
        <HeroKPI i={1} label="Intención alta" value={`${dist.alta}`} delta="prioritarios" up accent={colores.exito} />
        <HeroKPI i={2} label="Intención media" value={`${dist.media}`} accent={colores.advertencia} />
        <HeroKPI i={3} label="Intención baja" value={`${dist.baja}`} accent={colores.textoOscuro} />
      </>}>
      <div className="row2-rev">
        <Reveal delay={120}><Panel title="Prospectos · clic para analizar">
          {scoring.map(s => {
            const on = s.nombre === sel; const c = scoreCol(s.score);
            return (
              <div key={s.nombre} onClick={() => setSel(s.nombre)}
                style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', borderRadius: '12px', cursor: 'pointer', marginBottom: '6px', background: on ? colores.fondoTerciario : 'transparent', border: `1px solid ${on ? c + '55' : 'transparent'}`, transition: 'all .2s' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `conic-gradient(${c} ${s.score * 3.6}deg, ${colores.fondoTerciario} 0deg)` }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: colores.fondoSecundario, display: 'flex', alignItems: 'center', justifyContent: 'center', ...tnum, fontSize: '12px', fontWeight: 800, color: c }}>{s.score}</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: colores.textoClaro, margin: 0 }}>{s.nombre}</p>
                  <p style={{ fontSize: '11px', color: colores.textoMedio, margin: 0 }}>{s.modelo} · {s.intencion}</p>
                </div>
              </div>
            );
          })}
        </Panel></Reveal>
        <Reveal delay={180}><Panel title={`Factores de scoring · ${sc.nombre}`}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Gauge value={sc.score} color={scoreCol(sc.score)} label={`interés ${sc.modelo}`} />
            <div style={{ flex: 1 }}>
              {[
                { l: 'Presupuesto', v: f.presupuesto }, { l: 'Urgencia', v: f.urgencia },
                { l: 'Interacciones', v: f.interacciones }, { l: 'Crédito', v: f.credito },
              ].map((x, i) => (
                <div key={x.l} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', color: colores.textoMedio }}>{x.l}</span>
                    <span style={{ ...tnum, fontSize: '12px', fontWeight: 800, color: colores.textoClaro }}>{x.v}</span>
                  </div>
                  <GrowBar pct={x.v} color={scoreCol(x.v)} delay={i * 80} h={10} />
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: '12px 14px', borderRadius: '12px', background: colores.fondoTerciario, borderLeft: `4px solid ${scoreCol(sc.score)}` }}>
            <span style={{ fontSize: '12px', color: colores.textoMedio }}>Recomendación IA: </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: colores.textoClaro }}>
              {sc.score >= 80 ? 'Contactar hoy — alta probabilidad de cierre.' : sc.score >= 50 ? 'Nutrir con prueba de manejo y cotización.' : 'Seguimiento automatizado por WhatsApp.'}
            </span>
          </div>
        </Panel></Reveal>
      </div>
    </Shell>
  );
};

// ════════════════════════════════════════════════════════════════════════════════
// 3 · CAMPAÑAS
// ════════════════════════════════════════════════════════════════════════════════
export const PaginaCampanias: React.FC = () => {
  const [sel, setSel] = useState<string | null>(null);
  const invTotal = campanias.reduce((s, c) => s + c.inv, 0);
  const ventas = campanias.reduce((s, c) => s + c.ventas, 0);
  const activas = campanias.filter(c => c.estado === 'Activa');
  const roiProm = (activas.reduce((s, c) => s + c.roi, 0) / activas.length).toFixed(1);
  const mejor = [...campanias].sort((a, b) => b.roi - a.roi)[0];
  const maxRoi = Math.max(...campanias.map(c => c.roi));
  const palette = [colores.primario, '#E5733A', '#2563EB', '#7C3AED'];
  const segs = campanias.map((c, i) => ({ v: c.inv, color: palette[i % palette.length], label: c.nombre }));

  return (
    <Shell icon={Megaphone} title="Campañas" subtitle="Inversión, performance y atribución"
      badge={badgeLive}
      kpis={<>
        <HeroKPI i={0} label="Inversión total" value={`$${invTotal}K`} delta="4 campañas" up accent={colores.primario} />
        <HeroKPI i={1} label="Ventas atribuidas" value={`${ventas}`} delta="ROI activo" up accent={colores.exito} spark={[20, 28, 34, 38, 40, ventas]} />
        <HeroKPI i={2} label="ROI promedio" value={`×${roiProm}`} delta="activas" up accent="#2563EB" />
        <HeroKPI i={3} label="Mejor campaña" value={`×${mejor.roi}`} delta={mejor.nombre.split(' ')[0]} up accent="#7C3AED" />
      </>}>
      <div className="row2">
        <Reveal delay={120}><Panel title="ROI por campaña · clic para detalle">
          {campanias.map((c, i) => {
            const on = sel === c.nombre; const det = campaniaDetalle.find(d => d.nombre === c.nombre);
            const ec = c.estado === 'Activa' ? colores.exito : c.estado === 'Programada' ? colores.advertencia : colores.textoOscuro;
            return (
              <div key={c.nombre} onClick={() => setSel(on ? null : c.nombre)} style={{ padding: '10px', borderRadius: '12px', cursor: 'pointer', marginBottom: '6px', background: on ? colores.fondoTerciario : 'transparent', transition: 'background .2s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: colores.textoClaro, width: '150px', flexShrink: 0 }}>{c.nombre}</span>
                  <GrowBar pct={(c.roi / maxRoi) * 100} color={colores.primario} delay={i * 60} />
                  <span style={{ ...tnum, fontSize: '13px', fontWeight: 800, color: colores.textoClaro, width: '44px', textAlign: 'right' }}>×{c.roi}</span>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: ec, width: '74px', textAlign: 'right' }}>{c.estado}</span>
                </div>
                <div style={{ maxHeight: on ? '60px' : 0, overflow: 'hidden', transition: 'max-height .3s ease' }}>
                  <div style={{ display: 'flex', gap: '16px', padding: '10px 0 2px 4px', fontSize: '11px', color: colores.textoMedio }}>
                    <span>Inv. <b style={{ color: colores.textoClaro }}>${c.inv}K</b></span>
                    <span>Alcance <b style={{ color: colores.textoClaro }}>{det?.alcance.toLocaleString()}</b></span>
                    <span>CPA <b style={{ color: colores.textoClaro }}>{det?.cpa ? `$${det.cpa.toLocaleString()}` : '—'}</b></span>
                    <span>Canal <b style={{ color: colores.textoClaro }}>{det?.canal}</b></span>
                  </div>
                </div>
              </div>
            );
          })}
        </Panel></Reveal>
        <Reveal delay={180}><Panel title="Distribución de inversión">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <Donut segs={segs} center={<><span style={{ ...tnum, fontSize: '20px', fontWeight: 800, color: colores.textoClaro }}>${invTotal}K</span><span style={{ fontSize: '10px', color: colores.textoMedio }}>invertido</span></>} />
          </div>
          {segs.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: s.color }} />
              <span style={{ fontSize: '12px', color: colores.textoClaro, flex: 1 }}>{s.label}</span>
              <span style={{ ...tnum, fontSize: '12px', fontWeight: 700, color: colores.textoMedio }}>${s.v}K</span>
            </div>
          ))}
        </Panel></Reveal>
      </div>
    </Shell>
  );
};

// ════════════════════════════════════════════════════════════════════════════════
// 4 · VENDEDORES
// ════════════════════════════════════════════════════════════════════════════════
export const PaginaVendedores: React.FC = () => {
  const totalV = vendedores.reduce((s, v) => s + v.ventas, 0);
  const efic = (vendedores.reduce((s, v) => s + v.efic, 0) / vendedores.length).toFixed(1);
  const vencidos = vendedores.reduce((s, v) => s + v.seguimientos, 0);
  const maxV = Math.max(...vendedores.map(v => v.ventas));
  const sorted = [...vendedores].sort((a, b) => b.ventas - a.ventas);
  const medal = ['#D4AF37', '#9CA3AF', '#B87333'];

  return (
    <Shell icon={Users} title="Vendedores" subtitle="Ranking, eficiencia y seguimientos"
      badge={badgeLive}
      kpis={<>
        <HeroKPI i={0} label="Ventas equipo" value={`${totalV}`} delta="este mes" up accent={colores.primario} spark={[18, 20, 19, 22, 21, totalV / 5]} />
        <HeroKPI i={1} label="Líder" value={sorted[0].nombre.split(' ')[0]} delta={`${sorted[0].ventas} ventas`} up accent="#D4AF37" />
        <HeroKPI i={2} label="Eficiencia prom." value={`${efic}%`} delta="cierre" up accent={colores.exito} />
        <HeroKPI i={3} label="Seg. vencidos" value={`${vencidos}`} delta="atención" accent={colores.peligro} />
      </>}>
      <div className="row2">
        <Reveal delay={120}><Panel title="Ranking por ventas">
          {sorted.map((v, i) => (
            <div key={v.nombre} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 6px' }}>
              <div style={{ width: '26px', height: '26px', borderRadius: '8px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', ...tnum, fontSize: '12px', fontWeight: 800, color: i < 3 ? '#fff' : colores.textoMedio, background: i < 3 ? medal[i] : colores.fondoTerciario }}>{i + 1}</div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: colores.textoClaro, width: '88px', flexShrink: 0 }}>{v.nombre}</span>
              <GrowBar pct={(v.ventas / maxV) * 100} color={i < 3 ? colores.primario : `${colores.primario}99`} delay={i * 55} />
              <span style={{ ...tnum, fontSize: '12px', fontWeight: 800, color: colores.textoClaro, width: '34px', textAlign: 'right' }}>{v.ventas}</span>
              <span style={{ ...tnum, fontSize: '11px', fontWeight: 700, color: colores.textoMedio, width: '44px', textAlign: 'right' }}>{v.efic}%</span>
              {v.seguimientos > 0 && <span style={{ ...tnum, fontSize: '10px', fontWeight: 700, color: '#fff', background: v.seguimientos > 4 ? colores.peligro : colores.advertencia, borderRadius: '8px', padding: '2px 7px' }}>{v.seguimientos}</span>}
            </div>
          ))}
        </Panel></Reveal>
        <Reveal delay={180}><Panel title="Eficiencia del equipo por etapa">
          {vendedorEtapas.map((e, i) => {
            const c = e.pct >= 60 ? colores.exito : e.pct >= 45 ? colores.advertencia : colores.peligro;
            return (
              <div key={e.etapa} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '12px', color: colores.textoClaro }}>{e.etapa}</span>
                  <span style={{ ...tnum, fontSize: '12px', fontWeight: 800, color: c }}>{e.pct}%</span>
                </div>
                <GrowBar pct={e.pct} color={c} delay={i * 70} h={12} />
              </div>
            );
          })}
        </Panel></Reveal>
      </div>
    </Shell>
  );
};

// ════════════════════════════════════════════════════════════════════════════════
// 5 · INVENTARIO
// ════════════════════════════════════════════════════════════════════════════════
export const PaginaInventario: React.FC = () => {
  const [filtro, setFiltro] = useState<'todas' | 'alta' | 'media' | 'baja'>('todas');
  const totalU = inventario.reduce((s, i) => s + i.stock, 0);
  const rot = Math.round(inventario.reduce((s, i) => s + i.dias, 0) / inventario.length);
  const alertas = inventario.filter(i => i.dias > 50 || i.dias < 20).length;
  const maxDias = Math.max(...inventario.map(i => i.dias));
  const dcol = (d: string) => d === 'alta' ? colores.exito : d === 'media' ? colores.advertencia : colores.peligro;
  const vis = inventario.filter(i => filtro === 'todas' || i.demanda === filtro);
  const segs = (['alta', 'media', 'baja'] as const).map(d => ({ v: inventario.filter(i => i.demanda === d).reduce((s, i) => s + i.stock, 0), color: dcol(d), label: d }));

  return (
    <Shell icon={Package} title="Inventario Inteligente" subtitle="Stock, rotación y demanda conectada"
      badge={badgeLive}
      kpis={<>
        <HeroKPI i={0} label="Unidades en piso" value={`${totalU}`} delta="5 modelos" accent={colores.primario} />
        <HeroKPI i={1} label="Rotación prom." value={`${rot}d`} delta="en lote" up accent="#2563EB" />
        <HeroKPI i={2} label="Alertas stock" value={`${alertas}`} delta="revisar" accent={colores.peligro} />
        <HeroKPI i={3} label="Demanda alta" value={`${inventario.filter(i => i.demanda === 'alta').length}`} delta="modelos" up accent={colores.exito} />
      </>}>
      <div className="row2">
        <Reveal delay={120}><Panel>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: colores.textoClaro, margin: 0 }}>Días en lote · filtra por demanda</h3>
            <div style={{ display: 'flex', gap: '6px' }}>
              {(['todas', 'alta', 'media', 'baja'] as const).map(f => (
                <button key={f} onClick={() => setFiltro(f)} style={{ padding: '5px 11px', borderRadius: '8px', border: `1px solid ${filtro === f ? colores.primario : colores.borde}`, background: filtro === f ? colores.primario : 'transparent', color: filtro === f ? '#fff' : colores.textoMedio, fontSize: '11px', fontWeight: 700, cursor: 'pointer', textTransform: 'capitalize', transition: 'all .2s' }}>{f}</button>
              ))}
            </div>
          </div>
          {vis.map((it, i) => {
            const slow = it.dias > 50, fast = it.dias < 20;
            const c = slow ? colores.peligro : it.dias > 30 ? colores.advertencia : colores.exito;
            return (
              <div key={it.modelo} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 6px' }}>
                {it.demanda === 'alta' ? <Flame size={16} color={colores.exito} /> : it.demanda === 'baja' ? <Snowflake size={16} color={colores.peligro} /> : <span style={{ width: '16px' }} />}
                <span style={{ fontSize: '13px', fontWeight: 700, color: colores.textoClaro, width: '70px', flexShrink: 0 }}>{it.modelo}</span>
                <GrowBar pct={(it.dias / maxDias) * 100} color={c} delay={i * 55} />
                <span style={{ ...tnum, fontSize: '12px', fontWeight: 800, color: colores.textoClaro, width: '40px', textAlign: 'right' }}>{it.dias}d</span>
                <span style={{ ...tnum, fontSize: '11px', color: colores.textoMedio, width: '46px', textAlign: 'right' }}>{it.stock} u.</span>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#fff', background: slow ? colores.peligro : fast ? colores.advertencia : colores.exito, borderRadius: '7px', padding: '2px 7px', width: '92px', textAlign: 'center' }}>{slow ? 'Sobre-stock' : fast ? 'Reabastecer' : 'Óptimo'}</span>
              </div>
            );
          })}
        </Panel></Reveal>
        <Reveal delay={180}><Panel title="Stock por nivel de demanda">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <Donut segs={segs} center={<><span style={{ ...tnum, fontSize: '22px', fontWeight: 800, color: colores.textoClaro }}>{totalU}</span><span style={{ fontSize: '10px', color: colores.textoMedio }}>unidades</span></>} />
          </div>
          {segs.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: s.color }} />
              <span style={{ fontSize: '12px', color: colores.textoClaro, flex: 1, textTransform: 'capitalize' }}>Demanda {s.label}</span>
              <span style={{ ...tnum, fontSize: '12px', fontWeight: 700, color: colores.textoMedio }}>{s.v} u.</span>
            </div>
          ))}
        </Panel></Reveal>
      </div>
    </Shell>
  );
};

// ════════════════════════════════════════════════════════════════════════════════
// 6 · CONVERSIÓN Y RETENCIÓN
// ════════════════════════════════════════════════════════════════════════════════
export const PaginaConversion: React.FC = () => {
  const [sel, setSel] = useState(0);
  const maxF = conversionFunnel[0].n;
  const tasa = ((conversionFunnel[conversionFunnel.length - 1].n / conversionFunnel[0].n) * 100).toFixed(1);
  const e = conversionFunnel[sel];
  const prev = sel > 0 ? conversionFunnel[sel - 1] : null;
  const convPrev = prev ? Math.round((e.n / prev.n) * 100) : 100;
  const maxC = Math.max(...retencionCohorte.map(r => r.clientes));

  return (
    <Shell icon={Repeat} title="Conversión y Retención" subtitle="Embudo IA + cohortes de recompra"
      badge={<span style={{ padding: '6px 12px', borderRadius: '20px', background: 'rgba(255,255,255,0.2)', fontSize: '12px', fontWeight: 700 }}>ESPECIAL</span>}
      kpis={<>
        <HeroKPI i={0} label="Conversión total" value={`${tasa}%`} delta="lead→venta" up accent={colores.primario} spark={[6.8, 7.2, 7.6, 8.1, 8.4, +tasa]} />
        <HeroKPI i={1} label="Aprob. crédito" value="76%" delta="6%" up accent={colores.exito} />
        <HeroKPI i={2} label="Recompra pot." value="240" delta="alta" up accent="#7C3AED" />
        <HeroKPI i={3} label="NPS" value="74" delta="6 pts" up accent="#2563EB" />
      </>}>
      <div className="row2">
        <Reveal delay={120}><Panel title="Embudo de conversión · clic en una etapa">
          {conversionFunnel.map((s, i) => {
            const on = i === sel; const w = (s.n / maxF) * 100;
            return (
              <div key={s.etapa} onClick={() => setSel(i)} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginBottom: '7px' }}>
                <span style={{ fontSize: '12px', color: on ? colores.primario : colores.textoMedio, fontWeight: on ? 800 : 600, width: '108px', textAlign: 'right', flexShrink: 0 }}>{s.etapa}</span>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                  <div style={{ width: `${w}%`, minWidth: '60px', height: '34px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform .2s, box-shadow .2s', transform: on ? 'scale(1.03)' : 'scale(1)', boxShadow: on ? `0 6px 16px ${colores.primario}55` : 'none', background: `linear-gradient(90deg, ${colores.primarioOscuro}, ${on ? colores.primarioClaro : colores.primario})` }}>
                    <span style={{ ...tnum, fontSize: '13px', fontWeight: 800, color: '#fff' }}>{s.n.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
          <div style={{ marginTop: '12px', padding: '12px 16px', borderRadius: '12px', background: colores.fondoTerciario, display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
            <div><p style={{ ...tnum, fontSize: '18px', fontWeight: 800, color: colores.primario, margin: 0 }}>{e.n.toLocaleString()}</p><p style={{ fontSize: '10px', color: colores.textoMedio, margin: 0 }}>{e.etapa}</p></div>
            <div><p style={{ ...tnum, fontSize: '18px', fontWeight: 800, color: convPrev >= 60 ? colores.exito : colores.advertencia, margin: 0 }}>{convPrev}%</p><p style={{ fontSize: '10px', color: colores.textoMedio, margin: 0 }}>paso previo</p></div>
            <div><p style={{ ...tnum, fontSize: '18px', fontWeight: 800, color: colores.peligro, margin: 0 }}>{prev ? `−${(prev.n - e.n).toLocaleString()}` : '—'}</p><p style={{ fontSize: '10px', color: colores.textoMedio, margin: 0 }}>perdidos</p></div>
          </div>
        </Panel></Reveal>
        <Reveal delay={180}><Panel title="Recompra por antigüedad">
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', height: '120px', marginBottom: '14px' }}>
            {retencionCohorte.map((r, i) => (
              <div key={r.anio} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%', gap: '5px' }}>
                <span style={{ ...tnum, fontSize: '12px', fontWeight: 800, color: colores.primario }}>{r.recompra}%</span>
                <GrowBarV pct={(r.clientes / maxC) * 100} sub={(r.recompra / 31) * 100} delay={i * 70} />
                <span style={{ fontSize: '9px', color: colores.textoMedio, textAlign: 'center' }}>{r.anio}</span>
              </div>
            ))}
          </div>
          <Gauge value={76} color={colores.exito} label="aprobación de crédito" />
          <p style={{ fontSize: '11px', color: colores.textoMedio, margin: '12px 0 0', textAlign: 'center' }}>La tasa de recompra <b style={{ color: colores.textoClaro }}>sube con la antigüedad</b> — foco en clientes 4+ años.</p>
        </Panel></Reveal>
      </div>
    </Shell>
  );
};

// barra vertical con relleno proporcional (clientes) + porción recompra
const GrowBarV: React.FC<{ pct: number; sub: number; delay: number }> = ({ pct, sub, delay }) => {
  const [m, setM] = useState(false);
  useEffect(() => { const t = setTimeout(() => setM(true), 80 + delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div style={{ width: '100%', maxWidth: '40px', height: m ? `${pct}%` : 0, background: `${colores.primario}33`, borderRadius: '8px 8px 0 0', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', transition: 'height .7s cubic-bezier(.22,1,.36,1)', overflow: 'hidden' }}>
      <div style={{ width: '100%', height: `${sub}%`, background: colores.primario, transition: 'height .7s ease .2s' }} />
    </div>
  );
};
