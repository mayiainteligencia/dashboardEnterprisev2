import React, { useState, useEffect } from 'react';
import { Store, Compass, MessageCircle, CreditCard, Repeat, Truck, Check } from 'lucide-react';
import { brandingConfig } from '../../config/branding';
import { Pill, StatTile } from './ui';
import { Bloque } from './PaginaLeads';
import { Shell, HeroKPI, badgeLive } from './paginasPro';
import { acciones, retencionCohorte } from './data';
import { useLiveFeed } from '../../context/LiveFeedContext';

const { colores } = brandingConfig;

// count-up animado
function useCountUp(to: number, dur = 800) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0; const s = performance.now();
    const tick = (now: number) => { const p = Math.min((now - s) / dur, 1); setV(Math.round((1 - Math.pow(1 - p, 3)) * to)); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [to, dur]);
  return v;
}

// ── 1 · Copiloto: acciones con filtro y marcar como hecha ────────────────────────
const Copiloto: React.FC = () => {
  const [filtro, setFiltro] = useState<'todas' | 'alta' | 'media'>('todas');
  const [hechas, setHechas] = useState<Set<number>>(new Set());
  const { events } = useLiveFeed();

  // Fake actions from live events
  const liveActions = events.filter(e => e.type === 'alerta').map((e, i) => ({
    accion: e.title,
    vendedor: 'Copiloto IA',
    prioridad: 'alta' as const,
    i: 100 + i, // Fake ID
  }));

  const allActions = [...liveActions, ...acciones.map((a, i) => ({ ...a, i }))];
  const visibles = allActions.filter(a => filtro === 'todas' || a.prioridad === filtro);
  const pendientes = allActions.filter((a) => !hechas.has(a.i)).length;

  return (
    <Bloque icon={Compass} title="Copiloto Comercial" subtitle="Siguiente mejor acción en tiempo real">
      <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
        {(['todas', 'alta', 'media'] as const).map(f => (
          <button key={f} onClick={() => setFiltro(f)} style={{
            padding: '6px 12px', borderRadius: '9px', border: `1px solid ${filtro === f ? colores.primario : colores.borde}`,
            background: filtro === f ? colores.primario : 'transparent', color: filtro === f ? '#fff' : colores.textoMedio,
            fontSize: '12px', fontWeight: 700, cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.2s',
          }}>{f}</button>
        ))}
        <Pill text={`${pendientes} pendientes`} color={colores.primario} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '300px', overflowY: 'auto' }} className="no-scrollbar">
        {visibles.map((a, idx) => {
          const done = hechas.has(a.i);
          return (
            <div key={a.i} style={{
              display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', borderRadius: '12px',
              borderLeft: `4px solid ${done ? colores.exito : a.prioridad === 'alta' ? colores.peligro : colores.advertencia}`,
              background: colores.fondoTerciario, opacity: done ? 0.55 : 1, transition: 'all 0.3s',
              animation: idx === 0 && a.i >= 100 ? 'slideInRight 0.4s' : 'none',
            }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '13px', fontWeight: 600, color: colores.textoClaro, margin: 0, textDecoration: done ? 'line-through' : 'none' }}>{a.accion}</p>
                <p style={{ fontSize: '11px', color: colores.textoMedio, margin: '2px 0 0' }}>→ {a.vendedor} · prioridad {a.prioridad}</p>
              </div>
              <button onClick={() => setHechas(prev => { const n = new Set(prev); n.has(a.i) ? n.delete(a.i) : n.add(a.i); return n; })}
                title={done ? 'Reabrir' : 'Marcar hecha'}
                style={{ width: '34px', height: '34px', borderRadius: '50%', flexShrink: 0, cursor: 'pointer',
                  border: `2px solid ${done ? colores.exito : colores.borde}`, background: done ? colores.exito : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                <Check size={16} color={done ? '#fff' : colores.textoOscuro} />
              </button>
            </div>
          );
        })}
      </div>
    </Bloque>
  );
};

// ── 2 · Agente WhatsApp con toggle Hoy/Semana + funnel ───────────────────────────
const datasetsWA = {
  Hoy: { chats: 312, calif: 189, citas: 74, sin: 18, resp: '8 seg' },
  Semana: { chats: 1980, calif: 1240, citas: 486, sin: 63, resp: '11 seg' },
};
const AgenteWA: React.FC = () => {
  const [rango, setRango] = useState<'Hoy' | 'Semana'>('Hoy');
  const { events } = useLiveFeed();
  
  const liveChats = events.filter(e => e.type === 'seguimiento').length;
  const liveCitas = events.filter(e => e.type === 'cita').length;

  const d = datasetsWA[rango];
  
  // Real-time values
  const currentChats = d.chats + (rango === 'Hoy' ? liveChats : liveChats);
  const currentCitas = d.citas + (rango === 'Hoy' ? liveCitas : liveCitas);
  
  const chats = useCountUp(currentChats); 
  const calif = useCountUp(d.calif + liveCitas * 2); 
  const citas = useCountUp(currentCitas);
  
  const steps = [{ l: 'Chats', n: currentChats }, { l: 'Calificados', n: d.calif + liveCitas * 2 }, { l: 'Citas', n: currentCitas }];
  const max = currentChats;

  return (
    <Bloque icon={MessageCircle} title="Agente WhatsApp / IA" subtitle="Calificación y agenda automática">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {(['Hoy', 'Semana'] as const).map(r => (
            <button key={r} onClick={() => setRango(r)} style={{
              padding: '6px 14px', borderRadius: '9px', border: `1px solid ${rango === r ? colores.primario : colores.borde}`,
              background: rango === r ? colores.primario : 'transparent', color: rango === r ? '#fff' : colores.textoMedio,
              fontSize: '12px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
            }}>{r}</button>
          ))}
        </div>
        <Pill text="LIVE" color={colores.exito} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '8px', marginBottom: '14px' }}>
        <StatTile label="Chats" value={chats.toLocaleString()} delta={liveChats > 0 ? `+${liveChats} live` : '24%'} deltaUp />
        <StatTile label="Calificados" value={calif.toLocaleString()} delta="60.5%" deltaUp />
        <StatTile label="Citas agendadas" value={citas.toLocaleString()} delta={liveCitas > 0 ? `+${liveCitas} auto` : 'auto'} deltaUp />
        <StatTile label="Sin atender" value={`${d.sin}`} />
      </div>
      {steps.map((s, i) => (
        <div key={s.l} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <span style={{ fontSize: '11px', color: colores.textoMedio, width: '76px', flexShrink: 0 }}>{s.l}</span>
          <div style={{ flex: 1, height: '20px', borderRadius: '6px', background: colores.fondoTerciario, overflow: 'hidden' }}>
            <div style={{ width: `${(s.n / max) * 100}%`, height: '100%', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '6px',
              background: `linear-gradient(90deg, ${colores.primarioOscuro}, ${colores.primario})`, transition: 'width 0.6s ease' }}>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#fff' }}>{i > 0 ? `${Math.round((s.n / steps[i - 1].n) * 100)}%` : ''}</span>
            </div>
          </div>
        </div>
      ))}
      <p style={{ fontSize: '11px', color: colores.textoMedio, margin: '10px 0 0' }}>Tiempo medio de respuesta IA: <b style={{ color: colores.textoClaro }}>{d.resp}</b></p>
    </Bloque>
  );
};

// ── 3 · Financiamiento: simulador de crédito ─────────────────────────────────────
const modelos = [
  { nombre: 'Paquete BÁSICO', precio: 180000 }, { nombre: 'Paquete FULL', precio: 350000 },
  { nombre: 'Paquete ULTRA', precio: 520000 }, { nombre: 'Vidrio Nivel IIIA', precio: 290000 }, { nombre: 'Parabrisas 15mm', precio: 120000 },
];
const Financiamiento: React.FC = () => {
  const [mi, setMi] = useState(0);
  const [engPct, setEngPct] = useState(20);
  const [plazo, setPlazo] = useState(48);
  const precio = modelos[mi].precio;
  const enganche = precio * engPct / 100;
  const capital = precio - enganche;
  const r = 0.13 / 12;
  const mensualidad = Math.round((capital * r) / (1 - Math.pow(1 + r, -plazo)));
  const aprob = Math.max(40, Math.min(98, Math.round(58 + (engPct - 10) * 1.8 - (plazo - 48) * 0.25)));
  const aprobCol = aprob >= 75 ? colores.exito : aprob >= 55 ? colores.advertencia : colores.peligro;
  const { events } = useLiveFeed();
  const liveCredits = events.filter(e => e.type === 'credito').length;

  return (
    <Bloque icon={CreditCard} title="Financiamiento" subtitle="Simulador de crédito">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', alignItems: 'center', justifyItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' }}>
            {modelos.map((m, i) => (
              <button key={m.nombre} onClick={() => setMi(i)} style={{
                padding: '6px 12px', borderRadius: '9px', border: `1px solid ${mi === i ? colores.primario : colores.borde}`,
                background: mi === i ? colores.primario : 'transparent', color: mi === i ? '#fff' : colores.textoMedio,
                fontSize: '12px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
              }}>{m.nombre}</button>
            ))}
          </div>
          <Slider label="Enganche" value={`${engPct}% · $${enganche.toLocaleString()}`} min={10} max={50} step={5} v={engPct} set={setEngPct} />
          <Slider label="Plazo" value={`${plazo} meses`} min={12} max={72} step={6} v={plazo} set={setPlazo} />
          <div style={{ marginTop: '14px', padding: '14px', borderRadius: '14px', background: colores.fondoTerciario, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            {liveCredits > 0 && (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, background: colores.exito, color: '#fff', fontSize: '9px', fontWeight: 800, padding: '2px' }}>
                {liveCredits} CRÉDITOS APROBADOS RECIENTEMENTE
              </div>
            )}
            <p style={{ fontSize: '11px', color: colores.textoMedio, margin: liveCredits > 0 ? '12px 0 0' : 0, textTransform: 'uppercase', letterSpacing: '0.3px' }}>Mensualidad estimada</p>
            <p style={{ fontSize: '28px', fontWeight: 800, color: colores.primario, margin: '2px 0 0' }}>${mensualidad.toLocaleString()}</p>
            <p style={{ fontSize: '10px', color: colores.textoMedio, margin: '2px 0 0' }}>{modelos[mi].nombre} · ${precio.toLocaleString()} · tasa 13% anual</p>
          </div>
        </div>
        {/* Gauge aprobación */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '130px', height: '130px', borderRadius: '50%', position: 'relative',
            background: `conic-gradient(${aprobCol} ${aprob * 3.6}deg, ${colores.fondoTerciario} 0deg)`, transition: 'background 0.4s ease' }}>
            <div style={{ position: 'absolute', inset: '16px', borderRadius: '50%', background: colores.fondoSecundario, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '26px', fontWeight: 800, color: aprobCol }}>{aprob}%</span>
              <span style={{ fontSize: '9px', color: colores.textoMedio }}>aprobación</span>
            </div>
          </div>
          <span style={{ fontSize: '11px', color: colores.textoMedio, textAlign: 'center', maxWidth: '130px' }}>Sube el enganche para mejorar la probabilidad</span>
        </div>
      </div>
    </Bloque>
  );
};

const Slider: React.FC<{ label: string; value: string; min: number; max: number; step: number; v: number; set: (n: number) => void }> = ({ label, value, min, max, step, v, set }) => (
  <div style={{ marginBottom: '12px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
      <span style={{ fontSize: '12px', color: colores.textoMedio }}>{label}</span>
      <span style={{ fontSize: '12px', fontWeight: 700, color: colores.textoClaro }}>{value}</span>
    </div>
    <input type="range" min={min} max={max} step={step} value={v} onChange={e => set(+e.target.value)} style={{ width: '100%', accentColor: colores.primario }} />
  </div>
);

// ── 4 · Postventa y Recompra: cohortes clicables ─────────────────────────────────
const Postventa: React.FC = () => {
  const [sel, setSel] = useState(retencionCohorte.length - 1);
  const maxC = Math.max(...retencionCohorte.map(r => r.clientes));
  const c = retencionCohorte[sel];
  const potenciales = Math.round(c.clientes * c.recompra / 100);

  return (
    <Bloque icon={Repeat} title="Postventa y Recompra" subtitle="Cohortes por antigüedad · clic para explorar">
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {retencionCohorte.map((r, i) => {
          const isSel = i === sel;
          return (
            <div key={r.anio} onClick={() => setSel(i)} style={{ flex: 1, cursor: 'pointer', textAlign: 'center' }}>
              <div style={{ height: '90px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginBottom: '6px' }}>
                <div style={{ width: '100%', maxWidth: '46px', height: `${(r.clientes / maxC) * 100}%`, borderRadius: '8px 8px 0 0',
                  background: isSel ? colores.primario : `${colores.primario}40`, transition: 'all 0.3s', boxShadow: isSel ? `0 0 0 3px ${colores.primario}33` : 'none' }} />
              </div>
              <p style={{ fontSize: '11px', fontWeight: isSel ? 800 : 600, color: isSel ? colores.primario : colores.textoMedio, margin: 0 }}>{r.anio}</p>
            </div>
          );
        })}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px' }}>
        <StatTile label="Clientes" value={c.clientes.toLocaleString()} />
        <StatTile label="Tasa recompra" value={`${c.recompra}%`} delta={c.recompra >= 20 ? 'alta' : 'baja'} deltaUp={c.recompra >= 20} />
        <StatTile label="Potenciales" value={`${potenciales}`} delta="upgrade" deltaUp />
      </div>
      <p style={{ fontSize: '12px', color: colores.textoMedio, margin: '12px 0 0' }}>
        Segmento <b style={{ color: colores.textoClaro }}>{c.anio}</b>: MAYIA identificó <b style={{ color: colores.primario }}>{potenciales}</b> clientes listos para recompra/upgrade con crédito pre-aprobado.
      </p>
    </Bloque>
  );
};

// ── 5 · Seminuevos y Flotillas: toggle de vista ──────────────────────────────────
const vistasSF = {
  Seminuevos: [
    { l: 'Stock disponible', v: '186', d: '' },
    { l: 'Ventas mes', v: '94', d: '+11%' },
    { l: 'Precio promedio', v: '$285K', d: '' },
    { l: 'Días en piso', v: '38', d: '' },
  ],
  Flotillas: [
    { l: 'Cuentas B2B', v: '32', d: '' },
    { l: 'Unidades', v: '410', d: '+18%' },
    { l: 'Ticket promedio', v: '$6.2M', d: '' },
    { l: 'Top cuenta', v: 'Logística MX', d: '' },
  ],
};
const Seminuevos: React.FC = () => {
  const [vista, setVista] = useState<'Seminuevos' | 'Flotillas'>('Seminuevos');
  return (
    <Bloque icon={Truck} title="Seminuevos y Flotillas B2B" subtitle="Inventario y cuentas corporativas">
      <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
        {(['Seminuevos', 'Flotillas'] as const).map(v => (
          <button key={v} onClick={() => setVista(v)} style={{
            flex: 1, padding: '8px', borderRadius: '10px', border: `1px solid ${vista === v ? colores.primario : colores.borde}`,
            background: vista === v ? colores.primario : 'transparent', color: vista === v ? '#fff' : colores.textoMedio,
            fontSize: '13px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
          }}>{v}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '8px' }}>
        {vistasSF[vista].map(s => <StatTile key={s.l} label={s.l} value={s.v} delta={s.d || undefined} deltaUp={!!s.d} />)}
      </div>
    </Bloque>
  );
};

// ── Página Operación ─────────────────────────────────────────────────────────────
export const PaginaOperacion: React.FC = () => {
  const { events } = useLiveFeed();
  const alertasCount = events.filter(e => e.type === 'alerta').length;
  
  return (
    <Shell icon={Store} title="Operación · Piso, Producto y Conversión" subtitle="Copiloto · WhatsApp IA · financiamiento · postventa · B2B" badge={badgeLive}
      kpis={<>
        <HeroKPI i={0} label="Acciones IA hoy" value={String(4 + alertasCount)} delta={alertasCount > 0 ? `+${alertasCount} live` : 'prioridad'} up accent="#d4000a" />
        <HeroKPI i={1} label="Chats WhatsApp" value="312" delta="24%" up accent="#10B981" spark={[180, 210, 240, 270, 300, 312]} />
        <HeroKPI i={2} label="Aprob. crédito" value="76%" delta="6%" up accent="#2563EB" />
        <HeroKPI i={3} label="Recompra pot." value="240" delta="alta" up accent="#7C3AED" />
      </>}>
      <Copiloto />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        <AgenteWA />
        <Postventa />
      </div>
      <Financiamiento />
      <Seminuevos />
    </Shell>
  );
};
