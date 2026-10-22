import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Play, Pause, RotateCcw, Sparkles, ChevronRight, ChevronLeft, X, Zap, Radio } from 'lucide-react';
import { colores, tnum, Panel } from './paginasPro';

/**
 * Simulación visual del gemelo digital en paleta limpia de alto rendimiento.
 * Optimizado para fluidez total (60 FPS sin saturación de GPU ni memoria).
 */

interface ResumenEscenario {
  ventas: { media: number };
  monto: { media: number };
  aband_credito: { media: number };
}

interface Props {
  base: ResumenEscenario;
  actual: ResumenEscenario;
  aprobacionH: number;
  tasaDelta: number;
  vendedores: number;
  onEscenario: (aprobacionH: number, tasaDelta: number, vendedores: number) => void;
}

type Kind = 'early' | 'aband' | 'rech' | 'ok';
interface Fate { kind: Kind; die: number }

const N = 80;             // Número balanceado de partículas (fluidez total en cualquier laptop)
const SPAWN = 12;         // segundos de inyección
const SEG = 0.9;          // latencia por etapa
const BASE_DWELL = 3.2;   // espera base en financiera (~63 h)
const T_END = 23;
const CREDIT = 5;
const ETAPAS = ['Lead Ingestion', 'WhatsApp Bot', 'Cita Piso', 'Test Drive', 'Cotización', 'Mesa Crédito', 'Entrega'];
const TELEMETRIA_ETAPAS = ['λ=2.4/h', 'P=70.7%', 'P=55.5%', 't̄=36.0h', 't̄=5.6h', 'CUELLO DE BOTELLA', 'VENTA CERRADA'];
const CUM = [1, 0.707, 0.555, 0.4565, 0.378, 0.301];
const LEADS = 2000;

// Paleta limpia y de alto contraste sobre blanco
const C = {
  move: '#2563EB',      // Azul pro para prospectos en camino
  lost: '#DC2626',      // Rojo carmesí para abandono por demora
  rech: '#94A3B8',      // Gris para filtro de buró
  ok: '#059669',        // Verde esmeralda para venta cerrada
  rescued: '#D97706',   // Ámbar dorado para clientes rescatados
};

const mulberry32 = (a: number) => () => {
  a |= 0; a = (a + 0x6D2B79F5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const SEMILLAS = (() => {
  const r = mulberry32(42);
  return Array.from({ length: N }, () => ({ u1: r(), u2: r() }));
})();

const buildFates = (res: ResumenEscenario): Fate[] => {
  const nCred = CUM[CREDIT] * LEADS;
  const pAb = Math.min(1, res.aband_credito.media / nCred);
  const pOk = Math.min(1 - pAb, res.ventas.media / nCred);
  return SEMILLAS.map(({ u1, u2 }) => {
    if (u1 >= CUM[CREDIT]) {
      let die = 0;
      for (let k = 0; k < CREDIT; k++) if (u1 < CUM[k]) die = k;
      return { kind: 'early', die };
    }
    if (u2 < pAb) return { kind: 'aband', die: CREDIT };
    if (u2 < pAb + pOk) return { kind: 'ok', die: -1 };
    return { kind: 'rech', die: CREDIT };
  });
};

const spawnT = (i: number) => (i / N) * SPAWN;

const resolveT = (i: number, f: Fate, dwell: number) => {
  const s = spawnT(i);
  if (f.kind === 'early') return s + f.die * SEG + 0.4;
  if (f.kind === 'aband') return s + CREDIT * SEG + dwell * 0.9;
  if (f.kind === 'rech') return s + CREDIT * SEG + dwell;
  return s + CREDIT * SEG + dwell + SEG;
};

interface Dot { x: number; y: number; a: number; color: string; r: number }

const particleAt = (
  i: number, f: Fate, rescued: boolean, t: number, dwell: number,
  nx: (k: number) => number, ty: number
): Dot | null => {
  const age = t - spawnT(i);
  if (age < 0) return null;
  const arrive5 = CREDIT * SEG;
  const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
  const jy = ((i * 53) % 21) - 10;

  const fall = (x: number, tDie: number, color: string): Dot | null => {
    const p = (age - tDie) / 1.0;
    if (p > 1) return null;
    return { x: x + Math.sin(i * 1.5) * 6 * p, y: ty + p * p * 60, a: 1 - p, color, r: 4 };
  };

  if (f.kind === 'early') {
    const tDie = f.die * SEG;
    if (age < tDie) {
      const s = Math.min(Math.floor(age / SEG), 5);
      return { x: lerp(nx(s), nx(s + 1), (age - s * SEG) / SEG), y: ty + jy * 0.35, a: 1, color: C.move, r: 4.5 };
    }
    return fall(nx(f.die), tDie, C.lost);
  }

  if (age < arrive5) {
    const s = Math.floor(age / SEG);
    return { x: lerp(nx(s), nx(s + 1), (age - s * SEG) / SEG), y: ty + jy * 0.35, a: 1, color: C.move, r: 4.5 };
  }
  const wait = age - arrive5;
  const jx = ((i * 37) % 21) - 10;
  if (f.kind === 'aband' || f.kind === 'rech') {
    const tDie = f.kind === 'aband' ? dwell * 0.9 : dwell;
    if (wait < tDie) return { x: nx(CREDIT) + jx, y: ty + jy, a: 1, color: C.move, r: 4.5 };
    return fall(nx(CREDIT) + jx, arrive5 + tDie, f.kind === 'aband' ? C.lost : C.rech);
  }
  // Exitosos
  if (wait < dwell) return { x: nx(CREDIT) + jx, y: ty + jy, a: 1, color: C.move, r: 4.5 };
  const q = (wait - dwell) / SEG;
  if (q < 1) return { x: lerp(nx(CREDIT) + jx, nx(6), q), y: ty + jy * (1 - q), a: 1, color: rescued ? C.rescued : C.ok, r: 5 };
  const fade = (q - 1) / 1.2;
  if (fade > 1) return null;
  return { x: nx(6), y: ty - fade * 35, a: 1 - fade, color: rescued ? C.rescued : C.ok, r: 5 + fade * 4 };
};

const H = 185;
const TY = 80;

interface LaneProps {
  fates: Fate[];
  baseFates?: Fate[];
  dwell: number;
  dwellLabel: string;
  tRef: React.MutableRefObject<number>;
  accent: string;
  resaltar: boolean;
}

const Lane: React.FC<LaneProps> = ({ fates, baseFates, dwell, dwellLabel, tRef, accent, resaltar }) => {
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const canvas = cv.current, box = wrap.current;
      if (canvas && box) {
        const W = box.clientWidth;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        if (canvas.width !== Math.round(W * dpr)) {
          canvas.width = Math.round(W * dpr);
          canvas.height = Math.round(H * dpr);
          canvas.style.width = `${W}px`;
          canvas.style.height = `${H}px`;
        }
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          draw(ctx, W, tRef.current);
        }
      }
      raf = requestAnimationFrame(loop);
    };

    const draw = (ctx: CanvasRenderingContext2D, W: number, t: number) => {
      ctx.clearRect(0, 0, W, H);

      // Fondo limpio claro
      ctx.fillStyle = '#FAFAFA';
      ctx.fillRect(0, 0, W, H);

      const padX = 50;
      const nx = (k: number) => padX + (k * (W - 2 * padX)) / 6;

      // Pista de proceso
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(nx(0), TY); ctx.lineTo(nx(6), TY); ctx.stroke();

      ctx.strokeStyle = `${accent}60`;
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(nx(0), TY); ctx.lineTo(nx(6), TY); ctx.stroke();

      // Contenedor de la Financiera
      const bx = nx(CREDIT) - 34, bw = 68;
      ctx.fillStyle = resaltar ? 'rgba(220, 38, 38, 0.08)' : 'rgba(37, 99, 235, 0.04)';
      ctx.strokeStyle = resaltar ? '#DC2626' : accent;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      if ((ctx as any).roundRect) (ctx as any).roundRect(bx, TY - 36, bw, 72, 10); else ctx.rect(bx, TY - 36, bw, 72);
      ctx.fill(); ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = resaltar ? '#DC2626' : accent;
      ctx.font = '800 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(dwellLabel.toUpperCase(), nx(CREDIT), TY - 44);

      // Nodos de etapas
      for (let k = 0; k <= 6; k++) {
        const xk = nx(k);
        ctx.beginPath();
        ctx.arc(xk, TY, 7, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.strokeStyle = k === 6 ? C.ok : accent;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = k === 6 ? C.ok : '#0F172A';
        ctx.font = '700 9.5px Inter, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(ETAPAS[k], xk, TY + 42);

        ctx.fillStyle = '#64748B';
        ctx.font = '600 8px monospace';
        ctx.fillText(TELEMETRIA_ETAPAS[k], xk, TY + 54);
      }

      // Partículas ultraligeras (sin shadowBlur para 0 lag)
      for (let i = 0; i < N; i++) {
        const f = fates[i];
        const rescued = !!baseFates && baseFates[i].kind === 'aband' && f.kind === 'ok';
        const d = particleAt(i, f, rescued, t, dwell, nx, TY);
        if (!d) continue;

        ctx.globalAlpha = Math.max(0, Math.min(1, d.a));
        // Halo sutil
        ctx.fillStyle = `${d.color}25`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r + 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Punto sólido
        ctx.fillStyle = d.color;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [fates, baseFates, dwell, dwellLabel, tRef, accent, resaltar]);

  return (
    <div ref={wrap} style={{ width: '100%' }}>
      <canvas ref={cv} style={{ display: 'block', borderRadius: '10px' }} />
    </div>
  );
};

const contar = (fates: Fate[], dwell: number, t: number, res: ResumenEscenario) => {
  let ok = 0, ab = 0, totOk = 0, totAb = 0;
  fates.forEach((f, i) => {
    const done = resolveT(i, f, dwell) <= t;
    if (f.kind === 'ok') { totOk++; if (done) ok++; }
    if (f.kind === 'aband') { totAb++; if (done) ab++; }
  });
  const ventas = totOk ? (ok / totOk) * res.ventas.media : 0;
  const aband = totAb ? (ab / totAb) * res.aband_credito.media : 0;
  const ticket = res.monto.media / res.ventas.media;
  return { ventas, aband, credito: ventas * ticket, perdido: aband * ticket };
};

const fM = (v: number) => `$${(v / 1e6).toFixed(1)}M`;

const Stat: React.FC<{ label: string; value: string; color?: string; sub?: string }> = ({ label, value, color, sub }) => (
  <div style={{
    flex: 1,
    minWidth: 0,
    background: '#FAFAFA',
    border: '1px solid #E2E8F0',
    padding: '8px 12px',
    borderRadius: '8px',
  }}>
    <div style={{ fontSize: '8.5px', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.4px', fontFamily: 'monospace' }}>
      {label}
    </div>
    <div style={{ ...tnum, fontSize: '18px', fontWeight: 800, color: color || '#0F172A', marginTop: '2px' }}>
      {value}
    </div>
    {sub && (
      <div style={{ fontSize: '9px', color: '#94A3B8', fontFamily: 'monospace' }}>
        {sub}
      </div>
    )}
  </div>
);

const btn = (active = false): React.CSSProperties => ({
  display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '8px',
  border: `1px solid ${active ? colores.primario : '#CBD5E1'}`,
  background: active ? `${colores.primario}12` : '#FFFFFF',
  color: active ? colores.primario : '#334155',
  fontSize: '11px', fontWeight: 700, cursor: 'pointer', transition: 'all .15s',
  fontFamily: 'monospace',
});

export const SimulacionViva: React.FC<Props> = ({ base, actual, aprobacionH, tasaDelta, vendedores, onEscenario }) => {
  const tRef = useRef(0);
  const playRef = useRef(true);
  const speedRef = useRef(1);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [now, setNow] = useState(0);
  const [paso, setPaso] = useState<number | null>(null);

  const fatesBase = useMemo(() => buildFates(base), [base]);
  const fatesAct = useMemo(() => buildFates(actual), [actual]);
  const dwellBase = BASE_DWELL;
  const dwellAct = aprobacionH === 0 ? BASE_DWELL : Math.max(0.6, (BASE_DWELL * aprobacionH) / 63);

  const restart = useCallback(() => {
    tRef.current = 0; playRef.current = true; setPlaying(true); setNow(0);
  }, []);

  // Reloj estocástico liviano
  useEffect(() => {
    let raf = 0, last = performance.now(), acc = 0;
    const loop = (ts: number) => {
      const dt = Math.min(0.05, (ts - last) / 1000); last = ts;
      if (playRef.current && tRef.current < T_END) {
        tRef.current = Math.min(T_END, tRef.current + dt * speedRef.current);
      }
      acc += dt;
      if (acc > 0.08) { acc = 0; setNow(tRef.current); }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => { restart(); }, [aprobacionH, tasaDelta, vendedores, restart]);

  const togglePlay = () => {
    if (tRef.current >= T_END) { restart(); return; }
    playRef.current = !playRef.current; setPlaying(playRef.current);
  };
  const cambiaVel = (v: number) => { speedRef.current = v; setSpeed(v); };

  const cb = contar(fatesBase, dwellBase, now, base);
  const ca = contar(fatesAct, dwellAct, now, actual);
  const terminado = now >= T_END;
  const rescatado = ca.credito - cb.credito;
  const ticket = base.monto.media / base.ventas.media;
  const perdidaFinal = base.aband_credito.media * ticket;

  const pasos = [
    { ap: 0, td: 0, v: 8, restart: true, titulo: '01 // TELEMETRÍA ACTUAL · LÍNEA BASE',
      texto: 'Cada partícula representa prospectos avanzando por el grafo estocástico hasta la mesa de crédito. Observa la acumulación masiva por tiempo de respuesta.' },
    { ap: 0, td: 0, v: 8, restart: false, titulo: '02 // LA FUGA SILENCIOSA DE CAPITAL',
      texto: `Las partículas en rojo carmesí representan capital que se evapora. En el flujo base se fugan ${Math.round(base.aband_credito.media)} expedientes: ${fM(perdidaFinal)} MXN no colocados únicamente por latencia operativa.` },
    { ap: 24, td: 0, v: 8, restart: true, titulo: '03 // INTERVENCIÓN DIGITAL: DICTAMEN ≤ 24H',
      texto: 'Misma inversión publicitaria, misma demanda, mismo equipo comercial. Al comprimir el dictamen a 24 horas, las partículas doradas indican clientes rescatados.' },
    { ap: 24, td: 0, v: 8, restart: false, titulo: '04 // GENERACIÓN DE VALOR RESIDUAL',
      texto: `La eficiencia de conversión recupera cartera de alta calidad: +${fM(rescatado > 0 ? rescatado : 0)} MXN colocados de forma neta. Sin alterar el apetito de riesgo ni gastar en pauta publicitaria.` },
  ];

  const irPaso = (n: number) => {
    const p = pasos[n];
    setPaso(n);
    onEscenario(p.ap, p.td, p.v);
    if (p.restart) restart();
  };
  const salir = () => setPaso(null);

  useEffect(() => {
    if (paso === null || !terminado || paso >= pasos.length - 1) return;
    const id = setTimeout(() => irPaso(paso + 1), 3200);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paso, terminado]);

  const pasoActual = paso !== null ? pasos[paso] : null;
  const resaltarFuga = paso === 1;
  const progreso = Math.min(100, (now / T_END) * 100);

  return (
    <Panel
      style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '18px',
        padding: '20px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
      }}
    >
      {/* Controles Limpios */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            background: `${colores.primario}10`,
            border: `1px solid ${colores.primario}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Radio size={15} color={colores.primario} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.2px' }}>
              Simulación de Flujo Estocástico en Vivo
            </div>
            <div style={{ fontSize: '10px', color: '#64748B', fontFamily: 'monospace' }}>
              PARALLEL DISCRETE-EVENT ENGINE · DUAL-STREAM COMPARATIVE
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <button id="sim-play" onClick={togglePlay} style={btn(playing)}>
            {terminado ? <RotateCcw size={12} /> : playing ? <Pause size={12} /> : <Play size={12} />}
            {terminado ? 'REPETIR' : playing ? 'PAUSAR' : 'REANUDAR'}
          </button>
          <button id="sim-restart" onClick={restart} style={btn()}><RotateCcw size={12} /> RESET</button>
          {[1, 2, 4].map(v => (
            <button key={v} onClick={() => cambiaVel(v)} style={btn(speed === v)}>{v}x</button>
          ))}
          <button
            id="sim-presentar"
            onClick={() => (paso === null ? irPaso(0) : salir())}
            style={{
              ...btn(),
              border: `1px solid ${colores.primario}`,
              color: '#FFFFFF',
              fontWeight: 800,
              background: paso === null ? `linear-gradient(135deg, ${colores.primario}, ${colores.primarioOscuro})` : '#64748B',
              boxShadow: paso === null ? `0 2px 8px ${colores.primario}40` : 'none',
            }}
          >
            {paso === null ? <><Sparkles size={12} /> MODO COMITÉ</> : <><X size={12} /> SALIR</>}
          </button>
        </div>
      </div>

      <div style={{ height: '3px', borderRadius: '2px', background: '#E2E8F0', marginBottom: '14px', overflow: 'hidden' }}>
        <div style={{ width: `${progreso}%`, height: '100%', background: colores.primario, transition: 'width .1s linear' }} />
      </div>

      {pasoActual && (
        <div style={{
          padding: '14px 18px',
          borderRadius: '12px',
          marginBottom: '14px',
          background: 'rgba(204, 0, 0, 0.04)',
          border: `1px solid ${colores.primario}35`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: colores.primario, fontFamily: 'monospace', marginBottom: '4px' }}>
                {pasoActual.titulo}
              </div>
              <div style={{ fontSize: '12px', color: '#334155', lineHeight: 1.5 }}>
                {pasoActual.texto}
              </div>
            </div>
            <button onClick={() => irPaso(Math.max(0, (paso as number) - 1))} disabled={paso === 0} style={{ ...btn(), padding: '6px 8px', opacity: paso === 0 ? 0.3 : 1 }}><ChevronLeft size={14} /></button>
            <button onClick={() => irPaso(Math.min(pasos.length - 1, (paso as number) + 1))} disabled={paso === pasos.length - 1} style={{ ...btn(true), padding: '6px 8px', opacity: paso === pasos.length - 1 ? 0.3 : 1 }}><ChevronRight size={14} /></button>
          </div>
          <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
            {pasos.map((_, i) => (
              <div key={i} style={{ height: '3px', flex: 1, borderRadius: '2px', background: i <= (paso as number) ? colores.primario : '#E2E8F0', transition: 'background .3s' }} />
            ))}
          </div>
        </div>
      )}

      {/* Carriles */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {[
          { titulo: 'STREAM 01 // OPERACIÓN ACTUAL (TIEMPO HISTÓRICO ~63H)', fates: fatesBase, bf: undefined, dwell: dwellBase, dl: 'DICTAMEN HISTÓRICO ~63H', c: cb, accent: '#64748B', res: resaltarFuga },
          { titulo: 'STREAM 02 // GEMELO DIGITAL ACTIVO (INTERVENCIÓN SIMULADA)', fates: fatesAct, bf: fatesBase, dwell: dwellAct, dl: aprobacionH === 0 ? 'DICTAMEN BASE' : `DICTAMEN ≤ ${aprobacionH} HORAS`, c: ca, accent: colores.primario, res: false },
        ].map((l, idx) => (
          <div key={idx} style={{
            padding: '12px 14px',
            borderRadius: '12px',
            background: '#FFFFFF',
            border: `1px solid ${idx === 1 ? `${colores.primario}30` : '#E2E8F0'}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.4px', color: l.accent, fontFamily: 'monospace' }}>
                {l.titulo}
              </div>
              <div style={{ fontSize: '9px', color: '#94A3B8', fontFamily: 'monospace' }}>
                SIM_TIME: {now.toFixed(1)}s
              </div>
            </div>
            <Lane fates={l.fates} baseFates={l.bf} dwell={l.dwell} dwellLabel={l.dl} tRef={tRef} accent={l.accent} resaltar={l.res} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginTop: '8px' }}>
              <Stat label="Ventas Cerradas" value={`${Math.round(l.c.ventas)} u.`} color="#059669" sub="Entregas completadas" />
              <Stat label="Fuga por Latencia" value={`${Math.round(l.c.aband)}`} color="#DC2626" sub="Prospectos perdidos" />
              <Stat label="Crédito Colocado" value={fM(l.c.credito)} color="#2563EB" sub="Volumen financiado" />
              <Stat label="Capital No Colocado" value={fM(l.c.perdido)} color="#DC2626" sub="Costo de oportunidad" />
            </div>
          </div>
        ))}
      </div>

      {/* Widget de Capital Rescatado */}
      <div style={{
        marginTop: '14px',
        padding: '14px 18px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        background: rescatado >= 0 ? 'rgba(16, 185, 129, 0.06)' : 'rgba(239, 68, 68, 0.06)',
        border: `1px solid ${rescatado >= 0 ? '#10B98140' : '#EF444440'}`,
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          background: rescatado >= 0 ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Zap size={20} color={rescatado >= 0 ? '#059669' : '#DC2626'} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '9.5px', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.4px', fontFamily: 'monospace' }}>
            DELTA DE COLOCACIÓN CREDITICIA // IMPACTO EN TIEMPO REAL
          </div>
          <div style={{ ...tnum, fontSize: '24px', fontWeight: 900, color: rescatado >= 0 ? '#059669' : '#DC2626', fontFamily: 'monospace' }}>
            {rescatado >= 0 ? '+' : '−'}{fM(Math.abs(rescatado))} MXN
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px', fontSize: '10px', color: '#64748B', flexWrap: 'wrap', justifyContent: 'flex-end', fontFamily: 'monospace' }}>
          {[['FLUJO REGULAR', C.move], ['ABANDONO CRÍTICO', C.lost], ['FILTRO BURÓ', C.rech], ['CONVERSIÓN EXITOSA', C.ok], ['CAPITAL RESCATADO', C.rescued]].map(([n, c]) => (
            <span key={n} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} />
              {n}
            </span>
          ))}
        </div>
      </div>
    </Panel>
  );
};
