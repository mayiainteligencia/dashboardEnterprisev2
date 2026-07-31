import React, { useState, useEffect, useMemo } from 'react';
import { UserPlus, Filter, Radio, LineChart, Building2, ChevronRight, Zap } from 'lucide-react';
import { brandingConfig } from '../../config/branding';
import { StatTile, Semaforo } from './ui';
import { Shell, HeroKPI, badgeLive } from './paginasPro';
import { agencias, funnel, canales } from './data';
import { useLiveFeed } from '../../context/LiveFeedContext';

const { colores } = brandingConfig;

// ── Embudo interactivo (hero) ────────────────────────────────────────────────────
const FunnelInteractivo: React.FC = () => {
  const [sel, setSel] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { events } = useLiveFeed();
  
  // Fake add live leads to top of funnel
  const liveLeadsCount = events.filter(e => e.type === 'lead').length;
  
  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);
  
  const funnelLive = [...funnel];
  funnelLive[0] = { ...funnelLive[0], n: funnelLive[0].n + liveLeadsCount };

  const max = funnelLive[0].n;
  const e = funnelLive[sel];
  const prev = sel > 0 ? funnelLive[sel - 1] : null;
  const convPrev = prev ? Math.round((e.n / prev.n) * 100) : 100;
  const perdidos = prev ? prev.n - e.n : 0;
  const pctTotal = ((e.n / max) * 100).toFixed(1);

  return (
    <div className="row2">
      {/* Embudo */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {funnelLive.map((f, i) => {
          const w = mounted ? (f.n / max) * 100 : 0;
          const isSel = i === sel;
          return (
            <div key={f.etapa} onClick={() => setSel(i)}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <span style={{ fontSize: '11px', color: isSel ? colores.primario : colores.textoMedio, fontWeight: isSel ? 800 : 600, width: '74px', flexShrink: 0, textAlign: 'right' }}>{f.etapa}</span>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <div style={{
                  width: `${w}%`, height: '34px', borderRadius: '8px',
                  background: isSel ? `linear-gradient(90deg, ${colores.primarioOscuro}, ${colores.primarioClaro})` : `linear-gradient(90deg, ${colores.primarioOscuro}, ${colores.primario})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  transition: 'width 0.7s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.2s, transform 0.2s',
                  boxShadow: isSel ? `0 6px 18px ${colores.primario}55` : 'none',
                  transform: isSel ? 'scale(1.03)' : 'scale(1)',
                  minWidth: '64px',
                }}>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#fff' }}>{f.n.toLocaleString()}</span>
                  {i === 0 && liveLeadsCount > 0 && (
                    <span style={{ fontSize: '10px', color: '#10B981', background: '#fff', padding: '2px 6px', borderRadius: '10px', fontWeight: 800, animation: 'fadeIn 0.3s' }}>
                      +{liveLeadsCount} live
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Panel detalle de etapa */}
      <div style={{ background: colores.fondoTerciario, borderRadius: '18px', border: `1px solid ${colores.borde}`, padding: '18px', position: 'sticky', top: '12px' }}>
        <p style={{ fontSize: '11px', color: colores.textoMedio, margin: 0, textTransform: 'uppercase', letterSpacing: '0.3px' }}>Etapa seleccionada</p>
        <h3 style={{ fontSize: '20px', fontWeight: 800, color: colores.textoClaro, margin: '2px 0 14px' }}>{e.etapa}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Fila label="Prospectos" value={e.n.toLocaleString()} color={colores.primario} />
          <Fila label="Conversión etapa previa" value={`${convPrev}%`} color={convPrev >= 75 ? colores.exito : convPrev >= 60 ? colores.advertencia : colores.peligro} />
          <Fila label="% del total (Lead)" value={`${pctTotal}%`} color={colores.textoClaro} />
          <Fila label="Leads perdidos vs previa" value={prev ? `−${perdidos.toLocaleString()}` : '—'} color={colores.peligro} />
        </div>
        <div style={{ marginTop: '14px', height: '8px', borderRadius: '6px', background: colores.borde, overflow: 'hidden' }}>
          <div style={{ width: `${convPrev}%`, height: '100%', background: colores.primario, transition: 'width 0.5s ease' }} />
        </div>
        <p style={{ fontSize: '10px', color: colores.textoMedio, margin: '6px 0 0', textAlign: 'center' }}>Tasa de paso desde la etapa anterior</p>
      </div>
    </div>
  );
};

const Fila: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <span style={{ fontSize: '12px', color: colores.textoMedio }}>{label}</span>
    <span style={{ fontSize: '15px', fontWeight: 800, color }}>{value}</span>
  </div>
);

// ── Ranking de agencias ordenable + expandible ───────────────────────────────────
type SortKey = 'meta' | 'ventas' | 'leads' | 'conv';
const AgenciasInteractivo: React.FC = () => {
  const [sortKey, setSortKey] = useState<SortKey>('meta');
  const [open, setOpen] = useState<string | null>(null);
  const sorted = useMemo(() => [...agencias].sort((a, b) => {
    if (sortKey === 'meta') return b.ventas / b.meta - a.ventas / a.meta;
    return (b[sortKey] as number) - (a[sortKey] as number);
  }), [sortKey]);
  const maxLeads = Math.max(...agencias.map(a => a.leads));

  const botones: { k: SortKey; t: string }[] = [
    { k: 'meta', t: '% Meta' }, { k: 'ventas', t: 'Ventas' }, { k: 'leads', t: 'Leads' }, { k: 'conv', t: 'Conversión' },
  ];

  return (
    <Bloque icon={Building2} title="Dashboard por Agencia" subtitle="Ranking interactivo · clic para detalle">
      <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '11px', color: colores.textoMedio, alignSelf: 'center', marginRight: '4px' }}>Ordenar por:</span>
        {botones.map(b => (
          <button key={b.k} onClick={() => setSortKey(b.k)} style={{
            padding: '6px 12px', borderRadius: '9px', border: `1px solid ${sortKey === b.k ? colores.primario : colores.borde}`,
            background: sortKey === b.k ? colores.primario : 'transparent', color: sortKey === b.k ? '#fff' : colores.textoMedio,
            fontSize: '12px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
          }}>{b.t}</button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {sorted.map((a, i) => {
          const pct = Math.round((a.ventas / a.meta) * 100);
          const col = a.estado === 'verde' ? colores.exito : a.estado === 'amarillo' ? colores.advertencia : colores.peligro;
          const isOpen = open === a.nombre;
          return (
            <div key={a.nombre} onClick={() => setOpen(isOpen ? null : a.nombre)}
              style={{ padding: '8px 10px', borderRadius: '12px', cursor: 'pointer', background: isOpen ? colores.fondoTerciario : 'transparent', transition: 'background 0.2s' }}
              onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = `${colores.fondoTerciario}80`; }}
              onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = 'transparent'; }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: i === 0 ? colores.primario : colores.textoMedio, width: '20px' }}>{i + 1}</span>
                <Semaforo estado={a.estado} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: colores.textoClaro }}>{a.nombre}</span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: colores.textoMedio }}>{a.ventas}/{a.meta} · {pct}%</span>
                  </div>
                  <div style={{ height: '8px', borderRadius: '6px', background: colores.fondoTerciario, overflow: 'hidden' }}>
                    <div style={{ width: `${Math.min(pct, 100)}%`, height: '100%', borderRadius: '6px', background: col, transition: 'width 0.6s ease' }} />
                  </div>
                </div>
                <ChevronRight size={16} color={colores.textoOscuro} style={{ transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
              </div>
              <div style={{ maxHeight: isOpen ? '70px' : 0, overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px', padding: '10px 0 4px 30px' }}>
                  {[
                    { l: 'Leads', v: a.leads.toLocaleString(), bar: Math.round((a.leads / maxLeads) * 100) },
                    { l: 'Conversión', v: `${a.conv}%`, bar: a.conv * 6 },
                    { l: 'Ventas', v: `${a.ventas}`, bar: pct },
                  ].map(x => (
                    <div key={x.l}>
                      <p style={{ fontSize: '14px', fontWeight: 800, color: colores.textoClaro, margin: 0 }}>{x.v}</p>
                      <p style={{ fontSize: '10px', color: colores.textoMedio, margin: '0 0 4px' }}>{x.l}</p>
                      <div style={{ height: '4px', borderRadius: '3px', background: colores.fondoTerciario, overflow: 'hidden' }}>
                        <div style={{ width: `${Math.min(x.bar, 100)}%`, height: '100%', background: col }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Bloque>
  );
};

// ── Lead Generation con toggle de métrica + donut ────────────────────────────────
type Metric = 'leads' | 'cpl' | 'roi';
const LeadGenInteractivo: React.FC = () => {
  const [metric, setMetric] = useState<Metric>('leads');
  const [sel, setSel] = useState<string | null>(null);
  const totalLeads = canales.reduce((s, c) => s + c.leads, 0);
  const sorted = useMemo(() => [...canales].sort((a, b) => b[metric] - a[metric]), [metric]);
  const max = Math.max(...canales.map(c => c[metric]));

  const fmt = (c: typeof canales[number]) => metric === 'leads' ? c.leads.toLocaleString() : metric === 'cpl' ? `$${c.cpl}` : `×${c.roi}`;
  const labels: Record<Metric, string> = { leads: 'Leads', cpl: 'CPL (menor mejor)', roi: 'ROI' };

  // donut: participación de leads
  let acc = 0;
  const segs = canales.map((c, i) => {
    const frac = c.leads / totalLeads; const start = acc; acc += frac;
    const hue = [0, 14, 8, 20, 4, 16][i] ?? 0;
    return { c, start: start * 360, end: acc * 360, color: `hsl(${hue}, 80%, ${42 + i * 5}%)` };
  });

  return (
    <Bloque icon={Radio} title="Lead Generation" subtitle="Por canal · cambia la métrica">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', alignItems: 'center', justifyItems: 'center' }}>
        {/* Donut */}
        <div style={{ width: '130px', height: '130px', borderRadius: '50%', position: 'relative',
          background: `conic-gradient(${segs.map(s => `${s.color} ${s.start}deg ${s.end}deg`).join(', ')})` }}>
          <div style={{ position: 'absolute', inset: '22px', borderRadius: '50%', background: colores.fondoSecundario, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '18px', fontWeight: 800, color: colores.textoClaro }}>{(totalLeads / 1000).toFixed(1)}K</span>
            <span style={{ fontSize: '9px', color: colores.textoMedio }}>leads totales</span>
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
            {(['leads', 'cpl', 'roi'] as Metric[]).map(m => (
              <button key={m} onClick={() => setMetric(m)} style={{
                padding: '6px 12px', borderRadius: '9px', border: `1px solid ${metric === m ? colores.primario : colores.borde}`,
                background: metric === m ? colores.primario : 'transparent', color: metric === m ? '#fff' : colores.textoMedio,
                fontSize: '12px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', textTransform: 'uppercase',
              }}>{m}</button>
            ))}
            <span style={{ fontSize: '11px', color: colores.textoMedio, alignSelf: 'center', marginLeft: '4px' }}>{labels[metric]}</span>
          </div>
          {sorted.map(c => {
            const isSel = sel === c.nombre;
            return (
              <div key={c.nombre} onClick={() => setSel(isSel ? null : c.nombre)} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '7px', cursor: 'pointer' }}>
                <span style={{ fontSize: '12px', color: colores.textoClaro, width: '104px', flexShrink: 0, fontWeight: isSel ? 800 : 500 }}>{c.nombre}</span>
                <div style={{ flex: 1, height: '16px', borderRadius: '5px', background: colores.fondoTerciario, overflow: 'hidden' }}>
                  <div style={{ width: `${(c[metric] / max) * 100}%`, height: '100%', borderRadius: '5px', transition: 'width 0.5s ease',
                    background: isSel ? colores.primarioClaro : `linear-gradient(90deg, ${colores.primarioOscuro}, ${colores.primario})` }} />
                </div>
                <span style={{ fontSize: '12px', fontWeight: 800, color: colores.textoClaro, width: '60px', textAlign: 'right' }}>{fmt(c)}</span>
              </div>
            );
          })}
          {sel && (() => {
            const c = canales.find(x => x.nombre === sel)!;
            return <div style={{ marginTop: '8px', padding: '8px 12px', borderRadius: '10px', background: colores.fondoTerciario, fontSize: '11px', color: colores.textoMedio }}>
              <b style={{ color: colores.textoClaro }}>{c.nombre}</b>: {c.leads.toLocaleString()} leads · CPL ${c.cpl} · ROI ×{c.roi} · {((c.leads / totalLeads) * 100).toFixed(1)}% del total
            </div>;
          })()}
        </div>
      </div>
    </Bloque>
  );
};

// ── Simulador con gráfica viva ───────────────────────────────────────────────────
const SimuladorInteractivo: React.FC = () => {
  const base = 1426;
  const hist = [1180, 1240, 1190, 1320, 1380, base];
  const [meta, setMeta] = useState(1500);
  const max = Math.max(...hist, meta, 1800);
  const esfuerzo = Math.round(((meta - base) / base) * 100);
  const alcanzable = meta <= base;

  return (
    <Bloque icon={LineChart} title="Predicción y Simulador IA" subtitle="MAYIA proyecta tu cierre de mes. Ajusta la meta.">
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '160px', marginBottom: '14px' }}>
        {hist.map((v, i) => (
          <Barra key={i} h={(v / max) * 100} label={['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Hoy'][i]} value={v} color={i === hist.length - 1 ? colores.primario : `${colores.primario}55`} />
        ))}
        <div style={{ width: '2px', alignSelf: 'stretch', background: colores.borde, margin: '0 2px' }} />
        <Barra h={(meta / max) * 100} label="Meta" value={meta} color={alcanzable ? colores.exito : colores.advertencia} pulse />
      </div>
      <input type="range" min={1200} max={1800} step={10} value={meta} onChange={e => setMeta(+e.target.value)}
        style={{ width: '100%', accentColor: colores.primario }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', gap: '10px' }}>
        <StatTile label="Proyección IA" value={`${base}`} delta="próx. mes" deltaUp />
        <StatTile label="Meta simulada" value={`${meta}`} />
        <StatTile label={alcanzable ? 'Holgura' : 'Brecha'} value={`${alcanzable ? '+' : '−'}${Math.abs(meta - base)}`} delta={`${Math.abs(esfuerzo)}% esfuerzo`} deltaUp={alcanzable} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: `${colores.primario}10`, borderRadius: '12px', marginTop: '14px' }}>
        <Zap size={16} color={colores.primario} />
        <p style={{ fontSize: '12px', margin: 0, fontWeight: 600, color: colores.textoClaro }}>
          {alcanzable 
            ? '✓ Meta alcanzable sin modificar el presupuesto. MAYIA recomienda mantener la campaña en WhatsApp.'
            : `MAYIA sugiere incrementar $${(esfuerzo * 1200).toLocaleString()} MXN en pauta de Facebook Ads para cubrir la brecha del ${esfuerzo}%.`}
        </p>
      </div>
    </Bloque>
  );
};

const Barra: React.FC<{ h: number; label: string; value: number; color: string; pulse?: boolean }> = ({ h, label, value, color, pulse }) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%', gap: '4px' }}>
    <span style={{ fontSize: '11px', fontWeight: 800, color: colores.textoClaro }}>{value.toLocaleString()}</span>
    <div style={{ width: '100%', maxWidth: '46px', height: `${h}%`, borderRadius: '8px 8px 0 0', background: color, transition: 'height 0.4s cubic-bezier(0.34,1.4,0.64,1)', boxShadow: pulse ? `0 0 0 3px ${color}33` : 'none' }} />
    <span style={{ fontSize: '10px', color: colores.textoMedio }}>{label}</span>
  </div>
);

// ── Bloque card genérico ─────────────────────────────────────────────────────────
export const Bloque: React.FC<{ icon: typeof Building2; title: string; subtitle: string; children: React.ReactNode }> = ({ icon: Icon, title, subtitle, children }) => (
  <div style={{ background: colores.fondoSecundario, borderRadius: '24px', border: `1px solid ${colores.borde}`, padding: '22px', boxShadow: colores.sombra, transition: 'transform 0.2s', cursor: 'default' }}
       onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
       onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
      <div style={{ width: '42px', height: '42px', borderRadius: '11px', background: `linear-gradient(135deg, ${colores.acento}, ${colores.acentoOscuro})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon size={22} color="#fff" />
      </div>
      <div>
        <h3 style={{ fontSize: '17px', fontWeight: 800, color: colores.textoClaro, margin: 0 }}>{title}</h3>
        <p style={{ fontSize: '12px', color: colores.textoMedio, margin: 0 }}>{subtitle}</p>
      </div>
    </div>
    {children}
  </div>
);

// ── Página Leads ─────────────────────────────────────────────────────────────────
export const PaginaLeads: React.FC = () => {
  const { events } = useLiveFeed();
  const liveLeadsCount = events.filter(e => e.type === 'lead').length;
  const liveVentasCount = events.filter(e => e.type === 'venta').length;

  const totalLeads = canales.reduce((s, c) => s + c.leads, 0) + liveLeadsCount;
  const ventas = funnel[funnel.length - 3].n + liveVentasCount; // "Venta"
  const convTotal = ((ventas / (funnel[0].n + liveLeadsCount)) * 100).toFixed(1);
  const cplProm = Math.round(canales.reduce((s, c) => s + c.cpl * c.leads, 0) / (totalLeads - liveLeadsCount));
  const mejorCanal = [...canales].sort((a, b) => b.roi - a.roi)[0];

  return (
    <Shell icon={UserPlus} title="Leads y Adquisición" subtitle="Generación de demanda guiada por IA en tiempo real" badge={badgeLive}
      kpis={<>
        <HeroKPI i={0} label="Leads totales" value={totalLeads.toLocaleString()} delta={`${liveLeadsCount} live`} up accent="#d4000a" spark={[16, 17, 18, 19, 20, totalLeads / 1000]} />
        <HeroKPI i={1} label="Conversión global" value={`${convTotal}%`} delta="en vivo" up accent="#10B981" spark={[6.8, 7.2, 7.6, 8.1, 8.4, +convTotal]} />
        <HeroKPI i={2} label="CPL promedio" value={`$${cplProm}`} delta="−6%" up accent="#2563EB" />
        <HeroKPI i={3} label="Mejor canal" value={mejorCanal.nombre} delta={`ROI ×${mejorCanal.roi}`} up accent="#7C3AED" />
      </>}>
      <Bloque icon={Filter} title="Funnel Comercial" subtitle="El embudo se actualiza en tiempo real con cada lead">
        <FunnelInteractivo />
      </Bloque>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        <AgenciasInteractivo />
        <LeadGenInteractivo />
      </div>
      <SimuladorInteractivo />
    </Shell>
  );
};
