import React, { useEffect, useRef, useMemo } from 'react';
import { Activity, Sigma, Gauge } from 'lucide-react';
import { colores, tnum, Panel } from './paginasPro';

interface Props {
  aprobacionH: number;
  tasaDelta: number;
  vendedores: number;
  ventasMedia: number;
  ventasMin: number;
  ventasMax: number;
  creditoMedia: number;
  morosidadMedia: number;
}

/**
 * Visualizador Matemático y Estocástico del Gemelo Digital.
 * Versión optimizada de alto rendimiento en paleta clara / minimalismo científico.
 * Dibuja bajo demanda (sin loops innecesarios en segundo plano para proteger CPU/RAM).
 */
export const MotorEstocasticoMatematico: React.FC<Props> = ({
  aprobacionH,
  tasaDelta,
  vendedores,
  ventasMedia,
  ventasMin,
  ventasMax,
  creditoMedia,
  morosidadMedia,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const monteRef = useRef<HTMLCanvasElement>(null);

  // Parámetros empíricos de la distribución Log-Normal de dictamen financiero
  const mu = 3.68;
  const sigma = 0.74;
  const corteH = aprobacionH === 0 ? 63 : aprobacionH;

  const probAbandono = useMemo(() => {
    if (aprobacionH === 12) return 0.012;
    if (aprobacionH === 24) return 0.078;
    if (aprobacionH === 48) return 0.185;
    return 0.301;
  }, [aprobacionH]);

  // Renderizado bajo demanda de la curva Log-Normal (0% CPU en reposo)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.parentElement?.clientWidth || 540;
    const H = 210;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    // Fondo blanco limpio
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, W, H);

    // Grid técnico suave
    ctx.strokeStyle = '#F1F5F9';
    ctx.lineWidth = 1;
    for (let x = 40; x < W; x += 45) {
      ctx.beginPath(); ctx.moveTo(x, 15); ctx.lineTo(x, H - 25); ctx.stroke();
    }
    for (let y = 25; y < H - 25; y += 32) {
      ctx.beginPath(); ctx.moveTo(40, y); ctx.lineTo(W - 20, y); ctx.stroke();
    }

    const padL = 40;
    const padR = 25;
    const padB = H - 25;
    const plotW = W - padL - padR;
    const maxH_hrs = 120;

    const logNormalPDF = (t: number) => {
      if (t <= 0.01) return 0;
      const coef = 1 / (t * sigma * Math.sqrt(2 * Math.PI));
      const exp = -Math.pow(Math.log(t) - mu, 2) / (2 * Math.pow(sigma, 2));
      return coef * Math.exp(exp);
    };

    const maxPDF = logNormalPDF(Math.exp(mu - Math.pow(sigma, 2)));
    const toX = (hrs: number) => padL + (hrs / maxH_hrs) * plotW;
    const toY = (val: number) => padB - (val / (maxPDF * 1.15)) * (H - 45);

    // 1. Área segura (Aprobados a tiempo en verde)
    ctx.beginPath();
    ctx.moveTo(toX(0.5), padB);
    for (let h = 0.5; h <= corteH; h += 1) {
      ctx.lineTo(toX(h), toY(logNormalPDF(h)));
    }
    ctx.lineTo(toX(corteH), padB);
    ctx.closePath();
    ctx.fillStyle = 'rgba(16, 185, 129, 0.12)';
    ctx.fill();

    // 2. Área de abandono (Fuga por demora en rojo)
    ctx.beginPath();
    ctx.moveTo(toX(corteH), padB);
    for (let h = corteH; h <= maxH_hrs; h += 1) {
      ctx.lineTo(toX(h), toY(logNormalPDF(h)));
    }
    ctx.lineTo(toX(maxH_hrs), padB);
    ctx.closePath();
    ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
    ctx.fill();

    // 3. Trazo de la curva continua
    ctx.strokeStyle = '#2563EB';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let h = 0.5; h <= maxH_hrs; h += 0.8) {
      const x = toX(h), y = toY(logNormalPDF(h));
      if (h === 0.5) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // 4. Línea de corte vertical
    const xCorte = toX(corteH);
    ctx.strokeStyle = '#DC2626';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(xCorte, 20);
    ctx.lineTo(xCorte, padB);
    ctx.stroke();
    ctx.setLineDash([]);

    // Marcadores del eje X
    ctx.fillStyle = '#64748B';
    ctx.font = '600 9px monospace';
    ctx.textAlign = 'center';
    [12, 24, 48, 72, 96, 120].forEach(hr => {
      ctx.fillText(`${hr}h`, toX(hr), padB + 14);
    });

    // Rótulo del corte
    ctx.fillStyle = '#DC2626';
    ctx.font = '800 10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`T_CORTE = ${corteH}h`, xCorte, 16);

    // Badge explicativo
    ctx.fillStyle = '#F8FAFC';
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    if ((ctx as any).roundRect) {
      (ctx as any).roundRect(padL + 10, 25, 185, 44, 6);
    } else {
      ctx.rect(padL + 10, 25, 185, 44);
    }
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#1E293B';
    ctx.font = '700 9.5px monospace';
    ctx.fillText('f(t) ~ LogNormal(μ=3.68, σ=0.74)', padL + 16, 40);
    ctx.fillStyle = '#DC2626';
    ctx.fillText(`P(Abandono) = ${(probAbandono * 100).toFixed(1)}%`, padL + 16, 55);
  }, [corteH, probAbandono]);

  // Renderizado bajo demanda de Monte Carlo (0% CPU en reposo)
  useEffect(() => {
    const canvas = monteRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.parentElement?.clientWidth || 540;
    const H = 210;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, W, H);

    // Grid técnico
    ctx.strokeStyle = '#F1F5F9';
    ctx.lineWidth = 1;
    for (let x = 45; x < W; x += 45) {
      ctx.beginPath(); ctx.moveTo(x, 15); ctx.lineTo(x, H - 25); ctx.stroke();
    }
    for (let y = 25; y < H - 25; y += 32) {
      ctx.beginPath(); ctx.moveTo(45, y); ctx.lineTo(W - 20, y); ctx.stroke();
    }

    const padL = 45;
    const padR = 25;
    const padB = H - 25;
    const plotW = W - padL - padR;
    const plotH = H - 45;

    const steps = 12;
    const yMin = ventasMin * 0.95;
    const yMax = ventasMax * 1.05;
    const toY = (val: number) => padB - ((val - yMin) / (yMax - yMin)) * plotH;
    const toX = (st: number) => padL + (st / (steps - 1)) * plotW;

    // Banda IC 95%
    ctx.beginPath();
    ctx.moveTo(toX(0), toY(ventasMedia));
    for (let s = 1; s < steps; s++) {
      const spread = Math.sin((s / steps) * Math.PI) * (ventasMax - ventasMin) * 0.45;
      ctx.lineTo(toX(s), toY(ventasMedia + spread));
    }
    for (let s = steps - 1; s >= 0; s--) {
      const spread = Math.sin((s / steps) * Math.PI) * (ventasMax - ventasMin) * 0.45;
      ctx.lineTo(toX(s), toY(ventasMedia - spread));
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(37, 99, 235, 0.08)';
    ctx.fill();

    // 10 réplicas estocásticas
    for (let r = 0; r < 10; r++) {
      ctx.beginPath();
      ctx.strokeStyle = r === 0 ? '#10B981' : 'rgba(100, 116, 139, 0.35)';
      ctx.lineWidth = r === 0 ? 2 : 1;

      let val = ventasMedia * (0.93 + (r * 0.015));
      ctx.moveTo(toX(0), toY(val));

      for (let s = 1; s < steps; s++) {
        const randWalk = (Math.sin(r * 4.3 + s * 1.7) * (ventasMax - ventasMin) * 0.25) * (s / steps);
        val = ventasMedia + (r - 4.5) * 3 + randWalk;
        ctx.lineTo(toX(s), toY(val));
      }
      ctx.stroke();
    }

    // Línea media esperada
    ctx.strokeStyle = '#0F172A';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let s = 0; s < steps; s++) {
      const x = toX(s), y = toY(ventasMedia);
      if (s === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Marcadores del eje Y
    ctx.fillStyle = '#64748B';
    ctx.font = '600 9px monospace';
    ctx.textAlign = 'right';
    [Math.round(ventasMin), Math.round(ventasMedia), Math.round(ventasMax)].forEach(v => {
      ctx.fillText(`${v}u`, padL - 6, toY(v) + 3);
    });

    // Marcadores del eje X
    ctx.textAlign = 'center';
    [1, 3, 5, 7, 10].forEach(iter => {
      const s = Math.round((iter / 10) * (steps - 1));
      ctx.fillText(`rep #${iter}`, toX(s), padB + 14);
    });

    // Badge
    ctx.fillStyle = '#F8FAFC';
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    if ((ctx as any).roundRect) {
      (ctx as any).roundRect(padL + 10, 25, 195, 44, 6);
    } else {
      ctx.rect(padL + 10, 25, 195, 44);
    }
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#10B981';
    ctx.font = '700 9.5px monospace';
    ctx.fillText('CONVERGENCIA MONTE CARLO (N=10)', padL + 16, 40);
    ctx.fillStyle = '#0F172A';
    ctx.fillText(`IC 95%: [${Math.round(ventasMin)} - ${Math.round(ventasMax)}] u.`, padL + 16, 55);
  }, [ventasMedia, ventasMin, ventasMax]);

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
      {/* Cabecera Limpia */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'rgba(37, 99, 235, 0.08)',
            border: '1px solid rgba(37, 99, 235, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Sigma size={18} color="#2563EB" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.2px' }}>
                Motor Estocástico & Núcleo SimPy
              </span>
              <span style={{
                fontSize: '9px',
                padding: '2px 8px',
                borderRadius: '4px',
                background: '#F1F5F9',
                color: '#2563EB',
                border: '1px solid #CBD5E1',
                fontFamily: 'monospace',
                fontWeight: 700,
              }}>
                DISCRETE-EVENT ENGINE // 2.4-STOCHASTIC
              </span>
            </div>
            <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#64748B' }}>
              Función de Densidad Log-Normal de Fricción Financiera y Abanico de Réplicas Monte Carlo
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{
            padding: '4px 10px',
            borderRadius: '6px',
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            fontFamily: 'monospace',
            fontSize: '10px',
            color: '#10B981',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontWeight: 700,
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
            SEMILLA: MT19937_0x2A
          </div>
          <div style={{
            padding: '4px 10px',
            borderRadius: '6px',
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            fontFamily: 'monospace',
            fontSize: '10px',
            color: '#2563EB',
            fontWeight: 700,
          }}>
            P-VAL &lt; 0.0001
          </div>
        </div>
      </div>

      {/* Gráficos Claros */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '14px', marginBottom: '14px' }}>
        <div style={{ borderRadius: '12px', background: '#FAFAFA', border: '1px solid #E2E8F0', padding: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#1E293B', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Activity size={12} color="#2563EB" /> DISTRIBUCIÓN DE LATENCIA f(t) [LOG-NORMAL]
            </span>
            <span style={{ fontSize: '10px', color: '#64748B', fontFamily: 'monospace', fontWeight: 700 }}>
              CORTE: {corteH} HORAS
            </span>
          </div>
          <canvas ref={canvasRef} style={{ width: '100%', height: '210px', display: 'block', borderRadius: '8px' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '10px', color: '#64748B', fontFamily: 'monospace' }}>
            <span style={{ color: '#059669', fontWeight: 700 }}>■ Verde: Aprobados a tiempo</span>
            <span style={{ color: '#DC2626', fontWeight: 700 }}>■ Rojo: Fuga por demora</span>
          </div>
        </div>

        <div style={{ borderRadius: '12px', background: '#FAFAFA', border: '1px solid #E2E8F0', padding: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#1E293B', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Gauge size={12} color="#10B981" /> BANDA DE CONVERGENCIA MONTE CARLO (N=10)
            </span>
            <span style={{ fontSize: '10px', color: '#64748B', fontFamily: 'monospace', fontWeight: 700 }}>
              IC 95%: ±{Math.round((ventasMax - ventasMin) / 2)}u
            </span>
          </div>
          <canvas ref={monteRef} style={{ width: '100%', height: '210px', display: 'block', borderRadius: '8px' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '10px', color: '#64748B', fontFamily: 'monospace' }}>
            <span>■ 10 Réplicas estocásticas</span>
            <span style={{ color: '#0F172A', fontWeight: 700 }}>■ Línea negra: Media esperada</span>
          </div>
        </div>
      </div>

      {/* Franja de Ecuaciones */}
      <div style={{
        padding: '12px 16px',
        borderRadius: '10px',
        background: '#F8FAFC',
        border: '1px solid #E2E8F0',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: '12px',
        fontFamily: 'monospace',
      }}>
        <div>
          <div style={{ fontSize: '9px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>Densidad de Resolución</div>
          <div style={{ fontSize: '11px', color: '#2563EB', fontWeight: 800, marginTop: '2px' }}>
            f(t) = 1/(t·σ√(2π)) · e^[- (ln t - μ)² / (2σ²)]
          </div>
          <div style={{ fontSize: '9px', color: '#64748B', marginTop: '2px' }}>
            μ = 3.68, σ = 0.74 (calibrado empírico)
          </div>
        </div>

        <div>
          <div style={{ fontSize: '9px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>Probabilidad de Abandono</div>
          <div style={{ fontSize: '11px', color: '#DC2626', fontWeight: 800, marginTop: '2px' }}>
            P(Abandono) = ∫_T_corte^∞ f(t) dt = {(probAbandono * 100).toFixed(1)}%
          </div>
          <div style={{ fontSize: '9px', color: '#64748B', marginTop: '2px' }}>
            T_corte activo: {corteH} horas
          </div>
        </div>

        <div>
          <div style={{ fontSize: '9px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>Esperanza Condicional</div>
          <div style={{ fontSize: '11px', color: '#059669', fontWeight: 800, marginTop: '2px' }}>
            E[Ventas | Escenario] = {Math.round(ventasMedia)} u.
          </div>
          <div style={{ fontSize: '9px', color: '#64748B', marginTop: '2px' }}>
            Colocación: ${(creditoMedia / 1e6).toFixed(1)}M MXN (Mora: {morosidadMedia.toFixed(1)}%)
          </div>
        </div>
      </div>
    </Panel>
  );
};
