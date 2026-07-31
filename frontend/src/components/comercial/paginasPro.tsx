import React, { useState, useEffect } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Crown, Target, Megaphone, Users, Package, Repeat,
  TrendingUp, Trophy, AlertTriangle, Flame, Snowflake, Send, Zap
} from 'lucide-react';
import { brandingConfig } from '../../config/branding';
import {
  agencias, scoring, scoringFactores, campanias, campaniaDetalle, vendedores,
  vendedorEtapas, inventario, conversionFunnel, retencionCohorte,
} from './data';
import { useLiveFeed } from '../../context/LiveFeedContext';
import { ConfirmModal, SuccessToast, useConfirm } from './ConfirmModal';

export const colores = brandingConfig.colores;
export const tnum: React.CSSProperties = { fontVariantNumeric: 'tabular-nums' };

// ── Reusable "Hazlo" button ──────────────────────────────────────────────────
const HazloBtn: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      background: `linear-gradient(135deg, ${colores.exito}, #059669)`,
      border: 'none',
      color: '#fff',
      padding: '6px 14px',
      borderRadius: '8px',
      fontSize: '10px',
      fontWeight: 700,
      cursor: 'pointer',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      boxShadow: `0 2px 8px ${colores.exito}40`,
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = `0 4px 14px ${colores.exito}60`; }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = `0 2px 8px ${colores.exito}40`; }}
  >
    <Zap size={10} /> Hazlo
  </button>
);

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
    <div style={{ position: 'relative', background: colores.fondoSecundario, border: `1px solid ${colores.borde}`, borderRadius: '18px', padding: '16px 18px', overflow: 'hidden', boxShadow: colores.sombra, height: '100%', transition: 'transform 0.2s', cursor: 'default' }}
         onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
         onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
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

export const badgeLive = <span style={{ padding: '6px 12px', borderRadius: '20px', background: 'rgba(255,255,255,0.2)', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}><div className="live-dot" style={{ width: '6px', height: '6px', background: '#fff', boxShadow: 'none' }}/> EN VIVO</span>;

// ════════════════════════════════════════════════════════════════════════════════
// 1 · VISTA CEO
// ════════════════════════════════════════════════════════════════════════════════
export const PaginaCEO: React.FC = () => {
  const confirm = useConfirm();
  const [sel, setSel] = useState<string | null>(null);
  const { events } = useLiveFeed();
  const liveVentas = events.filter(e => e.type === 'venta').length;
  const liveLeads = events.filter(e => e.type === 'lead').length;

  const totalVentas = agencias.reduce((s, a) => s + a.ventas, 0) + liveVentas;
  const totalMeta = agencias.reduce((s, a) => s + a.meta, 0);
  const totalLeads = agencias.reduce((s, a) => s + a.leads, 0) + liveLeads;
  const conv = (agencias.reduce((s, a) => s + a.conv, 0) / agencias.length).toFixed(1);
  const cumpl = Math.round((totalVentas / totalMeta) * 100);
  const maxV = Math.max(...agencias.map(a => a.ventas));
  const top = [...agencias].sort((a, b) => b.ventas - a.ventas);
  const col = (e: string) => e === 'verde' ? colores.exito : e === 'amarillo' ? colores.advertencia : colores.peligro;
  const regiones = Array.from(new Set(agencias.map(a => a.estado)));
  const segs = regiones.map((e, i) => ({ v: agencias.filter(a => a.estado === e).reduce((s, a) => s + a.ventas, 0), color: col(e), label: e, key: i }));

  // ── Strategic Insights state ──
  const [sugIdx, setSugIdx] = useState(0);
  const resumenEjecutivo = [
    `Las ventas acumulan ${totalVentas} unidades (${cumpl}% de meta). A este ritmo, proyectamos cerrar el mes al ${Math.min(cumpl + 6, 110)}%. Sugiero enfocar los 5 dias restantes en las 3 agencias bajo meta: Santa Fe, Lindavista y Leon.`,
    `La conversion promedio de la red es ${conv}%, pero Santa Fe esta en 9.7%. Si logramos llevarla al promedio, se suman ~40 ventas adicionales. Sugiero activar el copiloto IA y reasignar leads de alta intencion a esa agencia.`,
    `Guadalajara y Polanco superaron meta. Te sugiero documentar su playbook y replicarlo en las agencias rezagadas. Tambien recomiendo un reconocimiento publico al equipo de Guadalajara para impulsar la moral de la red.`,
  ];

  // ── Action items state ──
  const [accEstado, setAccEstado] = useState<Record<number, 'pending' | 'approved' | 'dismissed'>>({});
  const accionesEstrategicas = [
    { titulo: 'Reasignar 40 prospectos VIP a Santa Fe', desc: 'Detecté que Santa Fe tiene la menor conversión. Mover prospectos de alta intención desde Polanco y Guadalajara podría subir su conversión 3 puntos.', impacto: '+$2.1M ingreso potencial', prioridad: 'alta' as const },
    { titulo: 'Activar paquete preferencial Vidrio IIIA fin de mes', desc: 'El kit de Vidrio Nivel IIIA lleva 64 días en almacén (sobrestock). Una promoción para flotas reduciría inventario y mejoraría la rotación.', impacto: '-18 kits en almacén', prioridad: 'media' as const },
    { titulo: 'Coaching express para Lindavista', desc: 'Lindavista tiene 72 instalaciones vs meta de 110. Sugiero una sesión de coaching con el equipo enfocada en técnicas de cierre y seguimientos pendientes.', impacto: '+15 ventas estimadas', prioridad: 'alta' as const },
    { titulo: 'Escalar presupuesto Social Ads +20%', desc: 'El CPA de Social Ads es el más bajo del trimestre ($84). Aumentar la inversión generaría ~600 prospectos adicionales con alto ROI.', impacto: '+600 prospectos, ROI x4.2', prioridad: 'media' as const },
  ];

  // ── Agency detail recommendation ──
  const getAgencyRec = (a: typeof agencias[0]) => {
    const pct = Math.round((a.ventas / a.meta) * 100);
    if (pct >= 100) return `La agencia ${a.nombre} supero meta (${pct}%). Felicita al equipo y documenta su estrategia para replicarla en la red.`;
    if (pct >= 80) return `${a.nombre} esta al ${pct}% de meta. Con un empujon en seguimientos puede llegar. Sugiero asignar 10 leads VIP adicionales esta semana.`;
    return `${a.nombre} necesita atencion urgente (${pct}% de meta). Sugiero una intervencion directa: coaching de cierre + reasignacion de leads calificados.`;
  };

  const prioColor = (p: string) => p === 'alta' ? colores.peligro : colores.advertencia;

  return (
    <>
    <Shell icon={Crown} title="Vista CEO" subtitle="13 agencias · consolidado en tiempo real" badge={badgeLive}
      kpis={<>
        <HeroKPI i={0} label="Ventas mes" value={`${totalVentas}`} delta={liveVentas > 0 ? `+${liveVentas} live` : '8.4%'} up accent={colores.primario} spark={[1180, 1240, 1190, 1320, 1380, totalVentas]} />
        <HeroKPI i={1} label="Cumpl. meta" value={`${cumpl}%`} delta={`${totalMeta} obj.`} up accent={colores.exito} spark={[78, 80, 79, 84, 86, cumpl]} />
        <HeroKPI i={2} label="Leads" value={`${(totalLeads / 1000).toFixed(1)}K`} delta={liveLeads > 0 ? `+${liveLeads} live` : '12.8%'} up accent="#2563EB" spark={[8.1, 8.6, 9.0, 9.4, 9.9, totalLeads / 1000]} />
        <HeroKPI i={3} label="Conversión" value={`${conv}%`} delta="1.2 pts" up accent="#7C3AED" spark={[11, 12, 12.4, 13, 13.2, +conv]} />
      </>}>

      <div className="row2">
        {/* ── LEFT: Agencies Ranking (expandable) ── */}
        <Reveal delay={120}><Panel title="Agencias · clic para ver detalle y accion IA">
          {top.map((a, i) => {
            const pct = Math.round((a.ventas / a.meta) * 100);
            const on = sel === a.nombre;
            return (
              <div key={a.nombre}>
                <div onClick={() => setSel(on ? null : a.nombre)}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 8px', borderRadius: '10px', cursor: 'pointer', background: on ? colores.fondoTerciario : 'transparent', border: `1px solid ${on ? col(a.estado) + '40' : 'transparent'}`, transition: 'all .2s' }}
                  onMouseEnter={e => { if (!on) e.currentTarget.style.background = `${colores.fondoTerciario}80`; }}
                  onMouseLeave={e => { if (!on) e.currentTarget.style.background = 'transparent'; }}>
                  <span style={{ ...tnum, fontSize: '12px', fontWeight: 800, color: i < 3 ? colores.primario : colores.textoOscuro, width: '20px' }}>{i + 1}</span>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: col(a.estado), boxShadow: `0 0 0 3px ${col(a.estado)}22`, flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', fontWeight: 700, color: colores.textoClaro, width: '92px', flexShrink: 0 }}>{a.nombre}</span>
                  <GrowBar pct={pct} color={col(a.estado)} delay={i * 45} />
                  <span style={{ ...tnum, fontSize: '12px', fontWeight: 700, color: colores.textoMedio, width: '68px', textAlign: 'right' }}>{a.ventas}/{a.meta}</span>
                </div>
                {/* ── Expanded detail ── */}
                <div style={{ maxHeight: on ? '140px' : 0, overflow: 'hidden', transition: 'max-height .35s ease' }}>
                  <div style={{ padding: '10px 8px 10px 38px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '11px', color: colores.textoMedio, flexWrap: 'wrap' }}>
                      <span>Leads <b style={{ color: colores.textoClaro }}>{a.leads}</b></span>
                      <span>Conversion <b style={{ color: colores.textoClaro }}>{a.conv}%</b></span>
                      <span>Cumpl. <b style={{ color: col(a.estado) }}>{pct}%</b></span>
                      <span>Faltan <b style={{ color: colores.textoClaro }}>{Math.max(0, a.meta - a.ventas)}</b></span>
                    </div>
                    <div style={{ padding: '8px 10px', borderRadius: '8px', background: `${colores.primario}10`, borderLeft: `3px solid ${colores.primario}`, fontSize: '11px', color: colores.textoClaro, lineHeight: 1.4 }}>
                      <strong style={{ color: colores.primario }}>MAYIA:</strong> {getAgencyRec(a)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Panel></Reveal>

        {/* ── RIGHT: Strategic Actions + Executive Summary ── */}
        <Reveal delay={180}>
          <Panel title="Acciones estrategicas · aprueba o rechaza">
            {accionesEstrategicas.map((acc, i) => {
              const estado = accEstado[i] || 'pending';
              return (
                <div key={i} style={{
                  padding: '10px 12px', borderRadius: '10px', marginBottom: '8px',
                  background: estado === 'approved' ? `${colores.exito}12` : estado === 'dismissed' ? `${colores.textoOscuro}08` : colores.fondoTerciario,
                  border: `1px solid ${estado === 'approved' ? colores.exito + '40' : estado === 'dismissed' ? colores.textoOscuro + '20' : colores.borde}`,
                  opacity: estado === 'dismissed' ? 0.5 : 1,
                  transition: 'all .3s',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '9px', fontWeight: 800, color: '#fff', background: prioColor(acc.prioridad), borderRadius: '5px', padding: '2px 7px', textTransform: 'uppercase' }}>{acc.prioridad}</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: colores.textoClaro, flex: 1 }}>{acc.titulo}</span>
                  </div>
                  <p style={{ fontSize: '11px', color: colores.textoMedio, margin: '0 0 6px', lineHeight: 1.35 }}>{acc.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: colores.exito }}>{acc.impacto}</span>
                    {estado === 'pending' ? (
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => setAccEstado(prev => ({ ...prev, [i]: 'approved' }))}
                          style={{ background: colores.exito, border: 'none', color: '#fff', padding: '5px 12px', borderRadius: '7px', fontSize: '10px', fontWeight: 700, cursor: 'pointer', transition: 'all .2s', display: 'flex', alignItems: 'center', gap: '4px' }}
                          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                        >
                          <TrendingUp size={10} /> Aprobar
                        </button>
                        <button
                          onClick={() => setAccEstado(prev => ({ ...prev, [i]: 'dismissed' }))}
                          style={{ background: 'transparent', border: `1px solid ${colores.borde}`, color: colores.textoMedio, padding: '5px 10px', borderRadius: '7px', fontSize: '10px', fontWeight: 700, cursor: 'pointer', transition: 'all .2s' }}
                          onMouseEnter={e => { e.currentTarget.style.background = `${colores.borde}40`; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                        >
                          Descartar
                        </button>
                      </div>
                    ) : (
                      <span style={{ fontSize: '10px', fontWeight: 700, color: estado === 'approved' ? colores.exito : colores.textoOscuro, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {estado === 'approved' ? <><TrendingUp size={10} /> Aprobada</> : 'Descartada'}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* ── MAYIA Executive Summary ── */}
            <div style={{
              marginTop: '12px',
              padding: '14px',
              borderRadius: '12px',
              border: `1px solid ${colores.primario}40`,
              background: `linear-gradient(135deg, ${colores.primario}08, ${colores.primario}15)`,
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, marginTop: '2px' }}>
                  <Crown size={16} color={colores.primario} />
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: colores.textoClaro, margin: 0, lineHeight: 1.45 }}>
                    <strong style={{ color: colores.primario }}>Resumen ejecutivo MAYIA:</strong><br/>
                    {resumenEjecutivo[sugIdx]}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  style={{
                    background: colores.primario,
                    border: 'none',
                    color: '#fff',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '10px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <Send size={10} /> Compartir con equipo
                </button>
                <button
                  onClick={() => setSugIdx(prev => (prev + 1) % resumenEjecutivo.length)}
                  style={{
                    background: 'transparent',
                    border: `1px solid ${colores.primario}60`,
                    color: colores.primario,
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '10px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${colores.primario}20`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                >
                  Otro insight
                </button>
                <HazloBtn onClick={confirm.requestConfirm} />
              </div>
            </div>
          </Panel>
        </Reveal>
      </div>
    </Shell>
    <ConfirmModal open={confirm.modalOpen} onAccept={confirm.handleAccept} onDecline={confirm.handleDecline} />
    <SuccessToast show={confirm.toastVisible} />
    </>
  );
};

// ════════════════════════════════════════════════════════════════════════════════
// 2 · LEAD SCORING
// ════════════════════════════════════════════════════════════════════════════════
export const PaginaScoring: React.FC = () => {
  const confirm = useConfirm();
  const [sel, setSel] = useState(scoring[0].nombre);
  const { events } = useLiveFeed();
  const liveLeads = events.filter(e => e.type === 'lead').length;

  const dist = { alta: scoring.filter(s => s.intencion === 'alta').length + Math.floor(liveLeads/2), media: scoring.filter(s => s.intencion === 'media').length + Math.ceil(liveLeads/2), baja: scoring.filter(s => s.intencion === 'baja').length };
  const prom = Math.round(scoring.reduce((s, x) => s + x.score, 0) / scoring.length) + (liveLeads > 0 ? 1 : 0);
  const sc = scoring.find(s => s.nombre === sel)!;
  const f = scoringFactores[sel];
  const scoreCol = (n: number) => n >= 80 ? colores.exito : n >= 50 ? colores.advertencia : colores.peligro;

  const [sugIdx, setSugIdx] = useState(0);

  const getLeadSugerencias = (score: number) => {
    if (score >= 80) {
      return [
        'Contactar hoy — alta probabilidad de cierre.',
        'Ofrecer financiamiento pre-aprobado para acelerar la compra.',
        'Asignar al mejor vendedor disponible de inmediato.'
      ];
    } else if (score >= 50) {
      return [
        'Nutrir con prueba de manejo y cotización detallada.',
        'Enviar campaña de retargeting con beneficios del modelo.',
        'Programar seguimiento telefónico en 48 horas.'
      ];
    } else {
      return [
        'Seguimiento automatizado por Mensajería IA.',
        'Enviar contenido educativo sobre las ventajas de MAYIACars.',
        'Reclasificar como "explorador" y nutrir con email marketing a 30 días.'
      ];
    }
  };

  const sugerencias = getLeadSugerencias(sc.score);

  return (
    <>
    <Shell icon={Target} title="Lead Scoring IA" subtitle="Intención de compra calculada en tiempo real"
      badge={badgeLive}
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
              <div key={s.nombre} onClick={() => { setSel(s.nombre); setSugIdx(0); }}
                style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', borderRadius: '12px', cursor: 'pointer', marginBottom: '6px', background: on ? colores.fondoTerciario : 'transparent', border: `1px solid ${on ? c + '55' : 'transparent'}`, transition: 'all .2s' }}
                onMouseEnter={e => { if (!on) e.currentTarget.style.background = `${colores.fondoTerciario}80`; }}
                onMouseLeave={e => { if (!on) e.currentTarget.style.background = 'transparent'; }}>
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
          <div style={{ padding: '12px 14px', borderRadius: '12px', background: colores.fondoTerciario, borderLeft: `4px solid ${scoreCol(sc.score)}`, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div>
              <span style={{ fontSize: '12px', color: colores.textoMedio }}>Recomendación IA: </span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: colores.textoClaro }}>
                {sugerencias[sugIdx]}
              </span>
            </div>
            <button
              onClick={() => setSugIdx(prev => (prev + 1) % sugerencias.length)}
              style={{
                alignSelf: 'flex-end',
                background: 'transparent',
                border: `1px solid ${colores.borde}`,
                color: colores.textoClaro,
                padding: '3px 8px',
                borderRadius: '6px',
                fontSize: '9px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = `${colores.borde}40`; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >
              Propónme otra
            </button>
            <HazloBtn onClick={confirm.requestConfirm} />
          </div>
        </Panel></Reveal>
      </div>
    </Shell>
    <ConfirmModal open={confirm.modalOpen} onAccept={confirm.handleAccept} onDecline={confirm.handleDecline} />
    <SuccessToast show={confirm.toastVisible} />
    </>
  );
};

// ════════════════════════════════════════════════════════════════════════════════
// 3 · CAMPAÑAS
// ════════════════════════════════════════════════════════════════════════════════
export const PaginaCampanias: React.FC = () => {
  const confirm = useConfirm();
  const [sel, setSel] = useState<string | null>(null);
  const { events } = useLiveFeed();
  const liveVentas = events.filter(e => e.type === 'venta').length;

  const invTotal = campanias.reduce((s, c) => s + c.inv, 0);
  const ventas = campanias.reduce((s, c) => s + c.ventas, 0) + liveVentas;
  const activas = campanias.filter(c => c.estado === 'Activa');
  const roiProm = (activas.reduce((s, c) => s + c.roi, 0) / activas.length).toFixed(1);
  const mejor = [...campanias].sort((a, b) => b.roi - a.roi)[0];
  const maxRoi = Math.max(...campanias.map(c => c.roi));
  const palette = [colores.primario, '#E5733A', '#2563EB', '#7C3AED'];
  const segs = campanias.map((c, i) => ({ v: c.inv, color: palette[i % palette.length], label: c.nombre }));

  const [sugIdx, setSugIdx] = useState(0);

  const getCampSugerencias = (campana: string | null) => {
    if (!campana) {
      return [
        'Te sugiero lanzar una campaña de reactivación para leads fríos, el costo por adquisición general es favorable hoy.',
        'He notado un aumento en búsquedas. Considera ajustar el presupuesto de Search Ads para captar la intención nocturna.',
        'El CPA en canales de video es el más bajo del mes. Sugiero escalar la inversión en Video Shorts un 20%.'
      ];
    }
    return [
      `La campaña de ${campana} está activa. Sugiero aumentar su presupuesto en un 15% para aprovechar la tendencia actual.`,
      `El CPA de ${campana} podría optimizarse aún más si activamos remarketing dinámico para los visitantes del último mes.`,
      `Considera revisar los canales de menor rendimiento en ${campana} y reasignar esos fondos a Mensajería IA.`
    ];
  };

  const sugerencias = getCampSugerencias(sel);

  return (
    <>
    <Shell icon={Megaphone} title="Campañas Inteligentes" subtitle="Optimización automatizada de presupuesto"
      badge={badgeLive}
      kpis={<>
        <HeroKPI i={0} label="Inversión total" value={`$${invTotal}K`} delta="4 campañas" up accent={colores.primario} />
        <HeroKPI i={1} label="Ventas atribuidas" value={`${ventas}`} delta={liveVentas > 0 ? `+${liveVentas} live` : 'ROI activo'} up accent={colores.exito} spark={[20, 28, 34, 38, 40, ventas]} />
        <HeroKPI i={2} label="ROI promedio" value={`×${roiProm}`} delta="activas" up accent="#2563EB" />
        <HeroKPI i={3} label="Mejor campaña" value={`×${mejor.roi}`} delta={mejor.nombre.split(' ')[0]} up accent="#7C3AED" />
      </>}>
      <div className="row2">
        <Reveal delay={120}><Panel title="ROI por campaña · clic para detalle">
          {campanias.map((c, i) => {
            const on = sel === c.nombre; const det = campaniaDetalle.find(d => d.nombre === c.nombre);
            const ec = c.estado === 'Activa' ? colores.exito : c.estado === 'Programada' ? colores.advertencia : colores.textoOscuro;
            return (
              <div key={c.nombre} onClick={() => { setSel(on ? null : c.nombre); setSugIdx(0); }} 
                   style={{ padding: '10px', borderRadius: '12px', cursor: 'pointer', marginBottom: '6px', background: on ? colores.fondoTerciario : 'transparent', transition: 'background .2s' }}
                   onMouseEnter={e => { if (!on) e.currentTarget.style.background = `${colores.fondoTerciario}80`; }}
                   onMouseLeave={e => { if (!on) e.currentTarget.style.background = 'transparent'; }}>
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
          
          {/* ── MAYIA Agent Recommendation Block ── */}
          <div style={{
            marginTop: '20px', 
            padding: '12px',
            borderRadius: '12px', 
            border: `1px solid ${colores.primario}40`,
            background: `${colores.primario}10`,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0, marginTop: '2px' }}>
                <Megaphone size={16} color={colores.primario} />
              </div>
              <div>
                <p style={{ fontSize: '12px', color: colores.textoClaro, margin: 0, lineHeight: 1.4 }}>
                  <strong style={{ color: colores.primario }}>MAYIA sugiere:</strong><br/>
                  {sugerencias[sugIdx]}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                onClick={() => setSugIdx(prev => (prev + 1) % sugerencias.length)}
                style={{
                  background: 'transparent',
                  border: `1px solid ${colores.primario}60`,
                  color: colores.primario,
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '10px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = `${colores.primario}20`; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                Otra sugerencia
              </button>
              <HazloBtn onClick={confirm.requestConfirm} />
            </div>
          </div>
        </Panel></Reveal>
      </div>
    </Shell>
    <ConfirmModal open={confirm.modalOpen} onAccept={confirm.handleAccept} onDecline={confirm.handleDecline} />
    <SuccessToast show={confirm.toastVisible} />
    </>
  );
};

// ════════════════════════════════════════════════════════════════════════════════
// 4 · VENDEDORES
// ════════════════════════════════════════════════════════════════════════════════
export const PaginaVendedores: React.FC = () => {
  const confirm = useConfirm();
  const { colores } = brandingConfig;
  const { events } = useLiveFeed();
  const liveVentas = events.filter(e => e.type === 'venta').length;
  
  const totalV = vendedores.reduce((s, v) => s + v.ventas, 0) + liveVentas;
  const efic = (vendedores.reduce((s, v) => s + v.efic, 0) / vendedores.length).toFixed(1);
  const vencidos = vendedores.reduce((s, v) => s + v.seguimientos, 0);
  const maxV = Math.max(...vendedores.map(v => v.ventas));
  const sorted = [...vendedores].sort((a, b) => b.ventas - a.ventas);
  const medal = ['#D4AF37', '#9CA3AF', '#B87333'];

  const [sel, setSel] = useState<string | null>(sorted[0]?.nombre || null);
  const [sugIdx, setSugIdx] = useState(0);

  const getSugerencias = (vendedor: typeof sorted[0]) => {
    if (!vendedor) return [];
    if (vendedor.ventas > 100) {
      return [
        `Te sugiero felicitar a ${vendedor.nombre.split(' ')[0]} por superar la meta mensual. Envíale un mensaje reconociendo su esfuerzo y compártele el playbook de Mejores Prácticas.`,
        `MAYIA sugiere enviarle este mensaje: '¡Excelente trabajo, ${vendedor.nombre.split(' ')[0]}! Sigue así, tu tasa de conversión es un ejemplo para el equipo.'`,
        `Considera asignar a ${vendedor.nombre.split(' ')[0]} como mentor temporal para los asesores con menor conversión este mes.`
      ];
    } else if (vendedor.seguimientos > 0) {
      return [
        `He detectado que ${vendedor.nombre.split(' ')[0]} tiene ${vendedor.seguimientos} seguimientos vencidos. Sugiero preguntarle si necesita apoyo de MAYIA Chatbot para calentar sus leads.`,
        `MAYIA sugiere enviarle este mensaje: 'Hola ${vendedor.nombre.split(' ')[0]}, vi que tienes algunos seguimientos pendientes. ¿Te activo el copiloto IA para ayudarte a filtrarlos?'`,
        `Te sugiero agendar una sesión rápida de coaching de 10 min con ${vendedor.nombre.split(' ')[0]} para revisar técnicas de cierre de ventas.`
      ];
    } else {
      return [
        `Motiva a ${vendedor.nombre.split(' ')[0]} para aumentar su número de cotizaciones. Sugiero enviarle prospectos calificados del Paquete BÁSICO.`,
        `MAYIA sugiere enviarle este mensaje: 'Hola ${vendedor.nombre.split(' ')[0]}, el equipo está cerca de la meta. Te acabo de asignar 5 prospectos VIP, ¡ve por ellos!'`,
        `Te sugiero invitar a ${vendedor.nombre.split(' ')[0]} a revisar el nuevo módulo de entrenamiento sobre el Paquete FULL de 15mm.`
      ];
    }
  };

  const sugerenciasActuales = sel ? getSugerencias(sorted.find(v => v.nombre === sel)!) : [];

  return (
    <>
    <Shell icon={Users} title="Top Vendedores" subtitle="Ranking nacional en tiempo real"
      badge={badgeLive}
      kpis={<>
        <HeroKPI i={0} label="Ventas equipo" value={`${totalV}`} delta={liveVentas > 0 ? `+${liveVentas} live` : 'este mes'} up accent={colores.primario} spark={[18, 20, 19, 22, 21, totalV / 5]} />
        <HeroKPI i={1} label="Líder" value={sorted[0].nombre.split(' ')[0]} delta={`${sorted[0].ventas} ventas`} up accent="#D4AF37" />
        <HeroKPI i={2} label="Eficiencia prom." value={`${efic}%`} delta="cierre" up accent={colores.exito} />
        <HeroKPI i={3} label="Seg. vencidos" value={`${vencidos}`} delta="atención" accent={colores.peligro} />
      </>}>
      <div className="row2">
        <Reveal delay={120}><Panel title="Ranking por ventas">
          {sorted.map((v, i) => {
            const isSelected = sel === v.nombre;
            return (
              <div key={v.nombre} 
                   onClick={() => { setSel(v.nombre); setSugIdx(0); }}
                   style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 6px', borderRadius: '10px', transition: 'background .2s', cursor: 'pointer', background: isSelected ? colores.fondoTerciario : 'transparent', border: `1px solid ${isSelected ? colores.primario + '40' : 'transparent'}` }}
                   onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = `${colores.fondoTerciario}80` }}
                   onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent' }}>
                <div style={{ width: '26px', height: '26px', borderRadius: '8px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', ...tnum, fontSize: '12px', fontWeight: 800, color: i < 3 ? '#fff' : colores.textoMedio, background: i < 3 ? medal[i] : colores.fondoTerciario }}>{i + 1}</div>
                <span style={{ fontSize: '13px', fontWeight: 700, color: colores.textoClaro, width: '88px', flexShrink: 0 }}>{v.nombre}</span>
                <GrowBar pct={(v.ventas / maxV) * 100} color={i < 3 ? colores.primario : `${colores.primario}99`} delay={i * 55} />
                <span style={{ ...tnum, fontSize: '12px', fontWeight: 800, color: colores.textoClaro, width: '34px', textAlign: 'right' }}>{v.ventas}</span>
                <span style={{ ...tnum, fontSize: '11px', fontWeight: 700, color: colores.textoMedio, width: '44px', textAlign: 'right' }}>{v.efic}%</span>
                {v.seguimientos > 0 && <span style={{ ...tnum, fontSize: '10px', fontWeight: 700, color: '#fff', background: v.seguimientos > 4 ? colores.peligro : colores.advertencia, borderRadius: '8px', padding: '2px 7px' }}>{v.seguimientos}</span>}
              </div>
            );
          })}
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
          
          {/* ── MAYIA Agent Recommendation Block ── */}
          {sugerenciasActuales.length > 0 && (
            <div style={{
              marginTop: '20px', 
              padding: '12px',
              borderRadius: '12px', 
              border: `1px solid ${colores.primario}40`,
              background: `${colores.primario}10`,
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, marginTop: '2px' }}>
                  <Users size={16} color={colores.primario} />
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: colores.textoClaro, margin: 0, lineHeight: 1.4 }}>
                    <strong style={{ color: colores.primario }}>MAYIA aconseja sobre {sel}:</strong><br/>
                    {sugerenciasActuales[sugIdx]}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  style={{
                    background: colores.primario,
                    border: 'none',
                    color: '#fff',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '10px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                >
                  <Send size={10} /> Enviar mensaje
                </button>
                <button
                  onClick={() => setSugIdx(prev => (prev + 1) % sugerenciasActuales.length)}
                  style={{
                    background: 'transparent',
                    border: `1px solid ${colores.primario}60`,
                    color: colores.primario,
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '10px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${colores.primario}20`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                >
                  Otra sugerencia
                </button>
                <HazloBtn onClick={confirm.requestConfirm} />
              </div>
            </div>
          )}
        </Panel></Reveal>
      </div>
    </Shell>
    <ConfirmModal open={confirm.modalOpen} onAccept={confirm.handleAccept} onDecline={confirm.handleDecline} />
    <SuccessToast show={confirm.toastVisible} />
    </>
  );
};

// ════════════════════════════════════════════════════════════════════════════════
// 5 · INVENTARIO
// ════════════════════════════════════════════════════════════════════════════════
export const PaginaInventario: React.FC = () => {
  const confirm = useConfirm();
  const [filtro, setFiltro] = useState<'todas' | 'alta' | 'media' | 'baja'>('todas');
  const [selModelo, setSelModelo] = useState<string | null>(null);
  const { events } = useLiveFeed();
  const liveVentas = events.filter(e => e.type === 'venta').length;
  
  const totalU = inventario.reduce((s, i) => s + i.stock, 0) - liveVentas;
  const rot = Math.round(inventario.reduce((s, i) => s + i.dias, 0) / inventario.length);
  const alertas = inventario.filter(i => i.dias > 50 || i.dias < 20).length;
  const maxDias = Math.max(...inventario.map(i => i.dias));
  const dcol = (d: string) => d === 'alta' ? colores.exito : d === 'media' ? colores.advertencia : colores.peligro;
  const vis = inventario.filter(i => filtro === 'todas' || i.demanda === filtro);
  const segs = (['alta', 'media', 'baja'] as const).map(d => ({ v: inventario.filter(i => i.demanda === d).reduce((s, i) => s + i.stock, 0), color: dcol(d), label: d }));

  const [sugIdx, setSugIdx] = useState(0);

  // ── Action states per model ──
  const [acciones, setAcciones] = useState<Record<string, 'pending' | 'traspasar' | 'promover' | 'reabastecer' | 'done'>>({});

  // ── Per-model detail data ──
  const modelDetail: Record<string, { proyeccion: string; agotamiento: string; velocidad: string; margen: string; tendencia: number[]; recomendacion: string }> = {
    'Paquete BÁSICO':   { proyeccion: 'Alta demanda sostenida', agotamiento: '~9 días', velocidad: '1.5 u./día', margen: '$18K/u.', tendencia: [28, 30, 32, 34, 33, 34], recomendacion: 'Stock crítico. Sugiero solicitar traspaso inmediato de 20 kits desde almacén Bajío y activar pre-venta digital para asegurar apartados.' },
    'Paquete FULL':     { proyeccion: 'Demanda estable', agotamiento: '~38 días', velocidad: '1.1 u./día', margen: '$35K/u.', tendencia: [40, 42, 41, 41, 40, 41], recomendacion: 'Inventario en rango óptimo. Sugiero mantener nivel actual y monitorear la tendencia. Si baja la rotación, considerar incentivo al equipo de asesores.' },
    'Paquete ULTRA':    { proyeccion: 'Pico de demanda', agotamiento: '~5 días', velocidad: '2.1 u./día', margen: '$52K/u.', tendencia: [22, 20, 19, 18, 17, 18], recomendacion: 'Alerta crítica: al ritmo actual se agota antes del próximo lote de fabricación. Sugiero activar pedido urgente a planta y redirigir 10 kits de Monterrey.' },
    'Vidrio Nivel IIIA': { proyeccion: 'Demanda en descenso', agotamiento: '~90 días', velocidad: '0.4 u./día', margen: '$29K/u.', tendencia: [30, 29, 28, 27, 27, 27], recomendacion: 'Sobrestock confirmado (64 días). Sugiero lanzar promoción para flotillas comerciales y asignar bono SPIF de $2K a asesores que muevan este nivel.' },
    'Parabrisas 15mm':   { proyeccion: 'Demanda moderada', agotamiento: '~52 días', velocidad: '0.8 u./día', margen: '$31K/u.', tendencia: [50, 51, 52, 52, 51, 52], recomendacion: 'Rotación lenta pero estable. Sugiero crear un paquete de mantenimiento con garantía extendida para aumentar el atractivo.' },
  };

  // ── MAYIA strategic insights ──
  const sugerenciasInventario = [
    `El inventario general está en ${totalU} kits y cristales. Los paquetes BÁSICO y ULTRA requieren atención inmediata por alta demanda y stock bajo. MAYIA recomienda priorizar reabastecimiento antes de que se pierdan contratos.`,
    `El costo de oportunidad por sobrestock de Vidrio Nivel IIIA es de ~$783K/mes en capital inmovilizado. Una promoción agresiva de fin de mes podría liberar 12 kits y mejorar la rotación general de la red.`,
    `La rotación promedio de ${rot} días está dentro del rango óptimo (25-45d). Sin embargo, la dispersión es alta: Paquete ULTRA a 12d vs Vidrio Nivel IIIA a 64d. Sugiero balancear con traspasos entre sucursales.`,
  ];

  const getActionLabel = (it: typeof inventario[0]) => {
    const slow = it.dias > 50, fast = it.dias < 20;
    if (slow) return { text: 'Promover venta', action: 'promover' as const, icon: Megaphone };
    if (fast) return { text: 'Reabastecer', action: 'reabastecer' as const, icon: Package };
    return { text: 'Traspasar', action: 'traspasar' as const, icon: TrendingUp };
  };

  return (
    <>
    <Shell icon={Package} title="Inventario Inteligente" subtitle="Stock, rotacion y demanda conectada"
      badge={badgeLive}
      kpis={<>
        <HeroKPI i={0} label="Unidades en piso" value={`${totalU}`} delta={liveVentas > 0 ? `-${liveVentas} vendidas` : '5 modelos'} accent={colores.primario} />
        <HeroKPI i={1} label="Rotacion prom." value={`${rot}d`} delta="en lote" up accent="#2563EB" />
        <HeroKPI i={2} label="Alertas stock" value={`${alertas}`} delta="revisar" accent={colores.peligro} />
        <HeroKPI i={3} label="Demanda alta" value={`${inventario.filter(i => i.demanda === 'alta').length}`} delta="modelos" up accent={colores.exito} />
      </>}>
      <div className="row2">
        {/* ── LEFT: Interactive inventory list with expandable details ── */}
        <Reveal delay={120}><Panel>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: colores.textoClaro, margin: 0 }}>Modelos · clic para analisis IA</h3>
            <div style={{ display: 'flex', gap: '6px' }}>
              {(['todas', 'alta', 'media', 'baja'] as const).map(f => (
                <button key={f} onClick={() => setFiltro(f)} style={{ padding: '5px 11px', borderRadius: '8px', border: `1px solid ${filtro === f ? colores.primario : colores.borde}`, background: filtro === f ? colores.primario : 'transparent', color: filtro === f ? '#fff' : colores.textoMedio, fontSize: '11px', fontWeight: 700, cursor: 'pointer', textTransform: 'capitalize', transition: 'all .2s' }}>{f}</button>
              ))}
            </div>
          </div>
          {vis.map((it, i) => {
            const slow = it.dias > 50, fast = it.dias < 20;
            const c = slow ? colores.peligro : it.dias > 30 ? colores.advertencia : colores.exito;
            const on = selModelo === it.modelo;
            const detail = modelDetail[it.modelo];
            const estado = acciones[it.modelo] || 'pending';
            const actionInfo = getActionLabel(it);
            return (
              <div key={it.modelo}>
                <div onClick={() => setSelModelo(on ? null : it.modelo)}
                     style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 6px', borderRadius: '10px', transition: 'all .2s', cursor: 'pointer', background: on ? colores.fondoTerciario : 'transparent', border: `1px solid ${on ? c + '40' : 'transparent'}` }}
                     onMouseEnter={e => { if (!on) e.currentTarget.style.background = `${colores.fondoTerciario}80`; }}
                     onMouseLeave={e => { if (!on) e.currentTarget.style.background = 'transparent'; }}>
                  {it.demanda === 'alta' ? <Flame size={16} color={colores.exito} /> : it.demanda === 'baja' ? <Snowflake size={16} color={colores.peligro} /> : <span style={{ width: '16px' }} />}
                  <span style={{ fontSize: '13px', fontWeight: 700, color: colores.textoClaro, width: '70px', flexShrink: 0 }}>{it.modelo}</span>
                  <GrowBar pct={(it.dias / maxDias) * 100} color={c} delay={i * 55} />
                  <span style={{ ...tnum, fontSize: '12px', fontWeight: 800, color: colores.textoClaro, width: '40px', textAlign: 'right' }}>{it.dias}d</span>
                  <span style={{ ...tnum, fontSize: '11px', color: colores.textoMedio, width: '46px', textAlign: 'right' }}>{it.stock} u.</span>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#fff', background: slow ? colores.peligro : fast ? colores.advertencia : colores.exito, borderRadius: '7px', padding: '2px 7px', width: '92px', textAlign: 'center' }}>{slow ? 'Sobre-stock' : fast ? 'Reabastecer' : 'Optimo'}</span>
                </div>

                {/* ── Expanded model detail ── */}
                <div style={{ maxHeight: on ? '260px' : 0, overflow: 'hidden', transition: 'max-height .4s ease' }}>
                  {detail && (
                    <div style={{ padding: '12px 8px 12px 34px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {/* KPI row */}
                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        {[
                          { label: 'Proyeccion', val: detail.proyeccion },
                          { label: 'Se agota en', val: detail.agotamiento },
                          { label: 'Velocidad', val: detail.velocidad },
                          { label: 'Margen', val: detail.margen },
                        ].map(kpi => (
                          <div key={kpi.label} style={{ padding: '6px 10px', borderRadius: '8px', background: colores.fondoTerciario, minWidth: '80px' }}>
                            <p style={{ fontSize: '9px', color: colores.textoMedio, margin: 0, textTransform: 'uppercase', fontWeight: 700 }}>{kpi.label}</p>
                            <p style={{ fontSize: '12px', fontWeight: 800, color: colores.textoClaro, margin: 0, ...tnum }}>{kpi.val}</p>
                          </div>
                        ))}
                      </div>

                      {/* Mini sparkline */}
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '28px' }}>
                        {detail.tendencia.map((v, idx) => (
                          <div key={idx} style={{ flex: 1, height: `${(v / Math.max(...detail.tendencia)) * 100}%`, background: idx === detail.tendencia.length - 1 ? colores.primario : `${colores.primario}55`, borderRadius: '3px 3px 0 0', transition: 'height .5s ease' }} />
                        ))}
                        <span style={{ fontSize: '9px', color: colores.textoMedio, marginLeft: '6px', whiteSpace: 'nowrap' }}>6 sem</span>
                      </div>

                      {/* MAYIA recommendation */}
                      <div style={{ padding: '8px 10px', borderRadius: '8px', background: `${colores.primario}10`, borderLeft: `3px solid ${colores.primario}`, fontSize: '11px', color: colores.textoClaro, lineHeight: 1.4 }}>
                        <strong style={{ color: colores.primario }}>MAYIA:</strong> {detail.recomendacion}
                      </div>

                      {/* Action button */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                        {estado === 'pending' ? (
                          <button
                            onClick={(e) => { e.stopPropagation(); setAcciones(prev => ({ ...prev, [it.modelo]: actionInfo.action })); }}
                            style={{
                              background: c, border: 'none', color: '#fff', padding: '5px 14px', borderRadius: '7px',
                              fontSize: '10px', fontWeight: 700, cursor: 'pointer', transition: 'all .2s',
                              display: 'flex', alignItems: 'center', gap: '5px'
                            }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                          >
                            <actionInfo.icon size={10} /> {actionInfo.text}
                          </button>
                        ) : (
                          <span style={{ fontSize: '10px', fontWeight: 700, color: colores.exito, display: 'flex', alignItems: 'center', gap: '4px', padding: '5px 0' }}>
                            <TrendingUp size={10} /> Accion ejecutada
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </Panel></Reveal>

        {/* ── RIGHT: Donut + Health Matrix + MAYIA Strategic ── */}
        <Reveal delay={180}>
          <Panel title="Stock por nivel de demanda">
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

            {/* ── Health matrix ── */}
            <div style={{ marginTop: '16px', padding: '12px', borderRadius: '10px', background: colores.fondoTerciario }}>
              <h4 style={{ fontSize: '12px', fontWeight: 800, color: colores.textoClaro, margin: '0 0 10px' }}>Salud del inventario</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                {inventario.map(it => {
                  const health = it.dias <= 20 ? colores.advertencia : it.dias <= 45 ? colores.exito : colores.peligro;
                  const pct = Math.min(100, Math.round((it.dias / 70) * 100));
                  return (
                    <div key={it.modelo} style={{ padding: '8px', borderRadius: '8px', background: colores.fondoSecundario, textAlign: 'center', border: `1px solid ${health}25`, cursor: 'pointer', transition: 'all .2s' }}
                         onClick={() => setSelModelo(it.modelo)}
                         onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.borderColor = health + '60'; }}
                         onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = health + '25'; }}>
                      <p style={{ fontSize: '11px', fontWeight: 700, color: colores.textoClaro, margin: '0 0 4px' }}>{it.modelo}</p>
                      <div style={{ width: '100%', height: '4px', borderRadius: '2px', background: `${health}22`, overflow: 'hidden' }}>
                        <div style={{ width: `${pct}%`, height: '100%', background: health, borderRadius: '2px', transition: 'width .6s ease' }} />
                      </div>
                      <p style={{ ...tnum, fontSize: '10px', fontWeight: 700, color: health, margin: '4px 0 0' }}>{it.dias}d · {it.stock}u</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── MAYIA Strategic Block ── */}
            <div style={{
              marginTop: '16px',
              padding: '14px',
              borderRadius: '12px',
              border: `1px solid ${colores.primario}40`,
              background: `linear-gradient(135deg, ${colores.primario}08, ${colores.primario}15)`,
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, marginTop: '2px' }}>
                  <Package size={16} color={colores.primario} />
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: colores.textoClaro, margin: 0, lineHeight: 1.45 }}>
                    <strong style={{ color: colores.primario }}>MAYIA sugiere:</strong><br/>
                    {sugerenciasInventario[sugIdx]}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  style={{
                    background: colores.primario, border: 'none', color: '#fff',
                    padding: '6px 14px', borderRadius: '8px', fontSize: '10px', fontWeight: 700,
                    cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <Send size={10} /> Ejecutar plan
                </button>
                <button
                  onClick={() => setSugIdx(prev => (prev + 1) % sugerenciasInventario.length)}
                  style={{
                    background: 'transparent', border: `1px solid ${colores.primario}60`,
                    color: colores.primario, padding: '6px 12px', borderRadius: '8px',
                    fontSize: '10px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${colores.primario}20`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                >
                  Otra sugerencia
                </button>
                <HazloBtn onClick={confirm.requestConfirm} />
              </div>
            </div>
          </Panel>
        </Reveal>
      </div>
    </Shell>
    <ConfirmModal open={confirm.modalOpen} onAccept={confirm.handleAccept} onDecline={confirm.handleDecline} />
    <SuccessToast show={confirm.toastVisible} />
    </>
  );
};

// ════════════════════════════════════════════════════════════════════════════════
// 6 · CONVERSIÓN Y RETENCIÓN
// ════════════════════════════════════════════════════════════════════════════════
export const PaginaConversion: React.FC = () => {
  const confirm = useConfirm();
  const [sel, setSel] = useState(0);
  const { events } = useLiveFeed();
  const liveVentas = events.filter(e => e.type === 'venta').length;
  
  const funnelC = [...conversionFunnel];
  funnelC[funnelC.length - 1] = { ...funnelC[funnelC.length - 1], n: funnelC[funnelC.length - 1].n + liveVentas };

  const maxF = funnelC[0].n;
  const tasa = ((funnelC[funnelC.length - 1].n / funnelC[0].n) * 100).toFixed(1);
  const e = funnelC[sel];
  const prev = sel > 0 ? funnelC[sel - 1] : null;
  const convPrev = prev ? Math.round((e.n / prev.n) * 100) : 100;
  const maxC = Math.max(...retencionCohorte.map(r => r.clientes));

  const [sugIdx, setSugIdx] = useState(0);

  const sugerenciasConversion = [
    '¡Excelente ritmo de ventas! Te sugiero lanzar un programa de "referidos" automático por Mensajería IA para compradores recientes.',
    'Noto un embudo ancho pero una caída de retención en "Agenda". Sugiero implementar la pre-aprobación express de crédito en 3 min con MAYIA.',
    'La base instalada de >4 años muestra alta recompra. ¿Lanzo un e-mail hiper-personalizado con una oferta preferencial a este segmento?'
  ];

  return (
    <>
    <Shell icon={Repeat} title="Conversión y Retención" subtitle="Embudos en tiempo real y cohortes"
      badge={badgeLive}
      kpis={<>
        <HeroKPI i={0} label="Conversión total" value={`${tasa}%`} delta={liveVentas > 0 ? 'en vivo' : 'lead→venta'} up accent={colores.primario} spark={[6.8, 7.2, 7.6, 8.1, 8.4, +tasa]} />
        <HeroKPI i={1} label="Aprob. crédito" value="76%" delta="6%" up accent={colores.exito} />
        <HeroKPI i={2} label="Recompra pot." value="240" delta="alta" up accent="#7C3AED" />
        <HeroKPI i={3} label="NPS" value="74" delta="6 pts" up accent="#2563EB" />
      </>}>
      <div className="row2">
        <Reveal delay={120}><Panel title="Embudo de conversión · clic en una etapa">
          {funnelC.map((s, i) => {
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
              <div key={r.anio} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%', gap: '5px', transition: 'transform 0.2s', cursor: 'default' }}
                   onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                   onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <span style={{ ...tnum, fontSize: '12px', fontWeight: 800, color: colores.primario }}>{r.recompra}%</span>
                <GrowBarV pct={(r.clientes / maxC) * 100} sub={(r.recompra / 31) * 100} delay={i * 70} />
                <span style={{ fontSize: '9px', color: colores.textoMedio, textAlign: 'center' }}>{r.anio}</span>
              </div>
            ))}
          </div>
          <Gauge value={76} color={colores.exito} label="aprobación de crédito" />
          
          {/* ── MAYIA Agent Recommendation Block ── */}
          <div style={{
            marginTop: '20px', 
            padding: '12px',
            borderRadius: '12px', 
            border: `1px solid ${colores.primario}40`,
            background: `${colores.primario}10`,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0, marginTop: '2px' }}>
                <Repeat size={16} color={colores.primario} />
              </div>
              <div>
                <p style={{ fontSize: '12px', color: colores.textoClaro, margin: 0, lineHeight: 1.4 }}>
                  <strong style={{ color: colores.primario }}>MAYIA sugiere:</strong><br/>
                  {sugerenciasConversion[sugIdx]}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                style={{
                  background: colores.primario,
                  border: 'none',
                  color: '#fff',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '10px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
              >
                <Send size={10} /> Aplicar plan
              </button>
              <button
                onClick={() => setSugIdx(prev => (prev + 1) % sugerenciasConversion.length)}
                style={{
                  background: 'transparent',
                  border: `1px solid ${colores.primario}60`,
                  color: colores.primario,
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '10px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = `${colores.primario}20`; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                Otra sugerencia
              </button>
              <HazloBtn onClick={confirm.requestConfirm} />
            </div>
          </div>
        </Panel></Reveal>
      </div>
    </Shell>
    <ConfirmModal open={confirm.modalOpen} onAccept={confirm.handleAccept} onDecline={confirm.handleDecline} />
    <SuccessToast show={confirm.toastVisible} />
    </>
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
