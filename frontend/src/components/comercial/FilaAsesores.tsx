import React, { useEffect, useRef, useState } from 'react';
import { Users } from 'lucide-react';
import { colores, tnum, Panel } from './paginasPro';

/**
 * Despacho de Atención Comercial · Teoría de Colas Kendall M/M/c.
 * Versión optimizada de alto rendimiento en paleta clara.
 */

interface Props {
  vendedores: number;
  utilizacion: number; // % calculado por el gemelo SimPy
}

type Estado = 'q' | 's' | 'done' | 'lost';
interface Cli { id: number; x: number; y: number; tx: number; ty: number; t0: number; estado: Estado; adv: number; tEnd: number }

const H = 200;
const S = 4;           // duración media de atención
const PACIENCIA = 14;  // umbral de tolerancia
const COLS_MAX = 6;

export const FilaAsesores: React.FC<Props> = ({ vendedores, utilizacion }) => {
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const [vel, setVel] = useState(1);
  const velRef = useRef(1);
  const [stats, setStats] = useState({ fila: 0, atendidos: 0, perdidos: 0, util: 0 });

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let statAcc = 0;
    const c = vendedores;
    const lambda = (Math.min(98, utilizacion) / 100) * c / S;

    let time = 0, nextArr = 0, nextId = 0, atendidos = 0, perdidos = 0, utilEma = utilizacion / 100;
    const clients: Cli[] = [];
    const advClient: (Cli | null)[] = Array(c).fill(null);
    const expo = () => -Math.log(1 - Math.random()) / lambda;
    nextArr = expo();

    const layout = (W: number) => {
      const cols = Math.min(c, COLS_MAX);
      const rows = Math.ceil(c / cols);
      const x0 = W * 0.50, x1 = W - 70;
      const pos = Array.from({ length: c }, (_, i) => {
        const col = i % cols, row = Math.floor(i / cols);
        return {
          x: cols === 1 ? x0 : x0 + (col * (x1 - x0)) / (cols - 1),
          y: H / 2 + (rows === 1 ? 0 : (row - (rows - 1) / 2) * 60),
        };
      });
      return { pos, queueHeadX: x0 - 50 };
    };

    const step = (dt: number, W: number) => {
      time += dt;
      while (nextArr <= time) {
        clients.push({ id: nextId++, x: -10, y: H / 2, tx: 0, ty: H / 2, t0: nextArr, estado: 'q', adv: -1, tEnd: 0 });
        nextArr += expo();
      }
      for (let i = 0; i < c; i++) {
        if (advClient[i] && advClient[i]!.tEnd <= time) {
          advClient[i]!.estado = 'done'; advClient[i] = null; atendidos++;
        }
      }
      for (let i = 0; i < c; i++) {
        if (advClient[i]) continue;
        const next = clients.find(k => k.estado === 'q');
        if (!next) break;
        next.estado = 's'; next.adv = i; next.tEnd = time + S * (0.6 + 0.8 * Math.random());
        advClient[i] = next;
      }
      for (const k of clients) {
        if (k.estado === 'q' && time - k.t0 > PACIENCIA) { k.estado = 'lost'; perdidos++; }
      }
      const busy = advClient.filter(Boolean).length / c;
      utilEma += (busy - utilEma) * Math.min(1, dt * 0.15);

      const { pos, queueHeadX } = layout(W);
      let qi = 0;
      for (const k of clients) {
        if (k.estado === 'q') {
          k.tx = queueHeadX - Math.floor(qi / 4) * 14;
          k.ty = H / 2 + ((qi % 4) - 1.5) * 15;
          qi++;
        } else if (k.estado === 's') {
          k.tx = pos[k.adv].x; k.ty = pos[k.adv].y;
        } else if (k.estado === 'done') {
          k.tx = W + 35; k.ty = H / 2;
        } else {
          k.ty = H + 35;
        }
      }
    };

    const move = (dt: number) => {
      for (const k of clients) {
        const f = Math.min(1, dt * (k.estado === 'q' ? 6 : 8));
        k.x += (k.tx - k.x) * f;
        k.y += (k.ty - k.y) * (k.estado === 'lost' ? Math.min(1, dt * 2.8) : f);
      }
      for (let i = clients.length - 1; i >= 0; i--) {
        const k = clients[i];
        if ((k.estado === 'done' && k.x > k.tx - 6) || (k.estado === 'lost' && k.y > H + 10)) clients.splice(i, 1);
      }
    };

    // Precalentamiento
    const warmW = (wrap.current?.clientWidth || 600);
    for (let i = 0; i < 300; i++) step(0.1, warmW);
    clients.forEach(k => { k.x = k.tx; k.y = k.ty; });

    const draw = (ctx: CanvasRenderingContext2D, W: number) => {
      ctx.clearRect(0, 0, W, H);

      // Fondo claro
      ctx.fillStyle = '#FAFAFA';
      ctx.fillRect(0, 0, W, H);

      const { pos, queueHeadX } = layout(W);

      ctx.font = '800 9px monospace';
      ctx.textAlign = 'left';
      ctx.fillStyle = '#2563EB';
      ctx.fillText(`// CANAL DE ESPERA KENDALL M/M/${c}`, 16, 18);

      ctx.textAlign = 'center';
      ctx.fillStyle = '#059669';
      ctx.fillText(`[${c} ASESORES EN PISO]`, W * 0.50 + (W - 70 - W * 0.50) / 2, 18);

      // Línea de cola
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 3;
      ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(16, H / 2); ctx.lineTo(queueHeadX + 16, H / 2); ctx.stroke();
      ctx.setLineDash([]);

      // Pods de Asesores
      for (let i = 0; i < c; i++) {
        const { x, y } = pos[i];
        const cl = advClient[i];
        const busy = !!cl;

        ctx.beginPath();
        ctx.arc(x, y, 17, 0, Math.PI * 2);
        ctx.fillStyle = busy ? 'rgba(37, 99, 235, 0.08)' : '#FFFFFF';
        ctx.fill();
        ctx.strokeStyle = busy ? '#2563EB' : '#CBD5E1';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (busy && cl) {
          const total = S * 1.0;
          const prog = Math.max(0, Math.min(1, 1 - (cl.tEnd - time) / (total * 1.0)));
          ctx.beginPath();
          ctx.arc(x, y, 17, -Math.PI / 2, -Math.PI / 2 + prog * Math.PI * 2);
          ctx.strokeStyle = '#059669';
          ctx.lineWidth = 2.5;
          ctx.stroke();
        }

        ctx.fillStyle = busy ? '#2563EB' : '#94A3B8';
        ctx.beginPath(); ctx.arc(x, y - 4, 3.5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(x, y + 8, 6.5, Math.PI, 0); ctx.fill();

        ctx.fillStyle = '#64748B';
        ctx.font = '700 8px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`POD #${i + 1}`, x, y + 25);
      }

      // Clientes (ultraligero sin shadowBlur)
      for (const k of clients) {
        let color = '#2563EB';
        let a = 1;
        let r = 4.5;

        if (k.estado === 'q') {
          const w = Math.min(1, (time - k.t0) / PACIENCIA);
          color = w < 0.45 ? '#2563EB' : w < 0.8 ? '#D97706' : '#DC2626';
        } else if (k.estado === 's') {
          color = '#2563EB';
        } else if (k.estado === 'done') {
          color = '#059669';
          a = Math.max(0, 1 - (k.x - W * 0.8) / (W * 0.2));
        } else {
          color = '#DC2626';
          a = Math.max(0, 1 - (k.y - H / 2) / (H / 2));
        }

        ctx.globalAlpha = Math.max(0, Math.min(1, a));
        ctx.fillStyle = color;
        ctx.beginPath(); ctx.arc(k.x, k.y, r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = (ts: number) => {
      const dtReal = Math.min(0.05, (ts - last) / 1000); last = ts;
      const box = wrap.current, canvas = cv.current;
      if (box && canvas) {
        const W = box.clientWidth;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        if (canvas.width !== Math.round(W * dpr)) {
          canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
          canvas.style.width = `${W}px`; canvas.style.height = `${H}px`;
        }
        const dt = dtReal * velRef.current;
        const n = Math.max(1, Math.ceil(dt / 0.05));
        for (let i = 0; i < n; i++) step(dt / n, W);
        move(dtReal * Math.max(1, velRef.current));
        const ctx = canvas.getContext('2d');
        if (ctx) { ctx.setTransform(dpr, 0, 0, dpr, 0, 0); draw(ctx, W); }
      }
      statAcc += dtReal;
      if (statAcc > 0.25) {
        statAcc = 0;
        setStats({ fila: clients.filter(k => k.estado === 'q').length, atendidos, perdidos, util: utilEma * 100 });
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [vendedores, utilizacion]);

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            background: 'rgba(37, 99, 235, 0.08)',
            border: '1px solid rgba(37, 99, 235, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Users size={15} color="#2563EB" />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.2px' }}>
              Piso de Ventas // Modelado de Colas Kendall M/M/c
            </div>
            <div style={{ fontSize: '10px', color: '#64748B', fontFamily: 'monospace' }}>
              CAPACIDAD ACTIVA: {vendedores} ASESORES · INTENSIDAD DE TRÁFICO ρ = {(utilizacion / 100).toFixed(2)}
            </div>
          </div>
        </div>

        <div style={{
          padding: '4px 10px',
          borderRadius: '6px',
          background: '#F8FAFC',
          border: '1px solid #CBD5E1',
          fontFamily: 'monospace',
          fontSize: '10px',
          color: '#2563EB',
          fontWeight: 700,
        }}>
          L_q = [P₀·(λ/μ)ᶜ·ρ] / [c!(1-ρ)²]
        </div>

        {[1, 2, 4].map(v => (
          <button
            key={v}
            onClick={() => { velRef.current = v; setVel(v); }}
            style={{
              padding: '5px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer',
              border: `1px solid ${vel === v ? '#2563EB' : '#CBD5E1'}`,
              background: vel === v ? 'rgba(37, 99, 235, 0.1)' : '#FFFFFF',
              color: vel === v ? '#2563EB' : '#334155',
              fontFamily: 'monospace',
            }}
          >{v}x</button>
        ))}
      </div>

      <div style={{ padding: '8px', borderRadius: '10px', background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
        <div ref={wrap} style={{ width: '100%' }}><canvas ref={cv} style={{ display: 'block', borderRadius: '6px' }} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginTop: '10px' }}>
          <Stat label="Prospectos en Fila" value={`${stats.fila}`} color={stats.fila > 6 ? '#DC2626' : '#2563EB'} sub="Longitud de cola L_q" />
          <Stat label="Atendidos con Éxito" value={`${stats.atendidos}`} color="#059669" sub="Throughput completado" />
          <Stat label="Fuga por Espera" value={`${stats.perdidos}`} color="#DC2626" sub="Prospectos desertores" />
          <Stat label="Ocupación de Red (ρ)" value={`${Math.round(stats.util)}%`} color="#D97706" sub="Saturación de pods" />
        </div>
      </div>
    </Panel>
  );
};
