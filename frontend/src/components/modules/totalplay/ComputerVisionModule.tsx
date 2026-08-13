import React, { useEffect, useRef, useState } from 'react';
import { Eye, Users, Clock, TrendingUp, AlertTriangle, MapPin, RefreshCw, Wifi } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

const { colores } = brandingConfig;

function useCountUp(target: number, duration = 1200, delay = 0) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const e = 1 - Math.pow(1 - p, 3);
        setVal(Math.floor(e * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timer);
  }, [target, duration, delay]);
  return val;
}

// Mini bar chart component
function MiniBarChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '40px', padding: '4px 0' }}>
      {data.map((v, i) => (
        <div
          key={i}
          style={{
            flex: 1, borderRadius: '3px',
            backgroundColor: `${color}${i === data.length - 1 ? 'FF' : '55'}`,
            height: `${(v / max) * 100}%`,
            minHeight: '4px',
            transition: 'height 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
            transitionDelay: `${i * 0.05}s`,
          }}
        />
      ))}
    </div>
  );
}

export const ComputerVisionModule: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  const trafico = useCountUp(14250, 1400, 200);
  const stopRate = useCountUp(284, 1200, 400);
  const permanencia = useCountUp(38, 1000, 600);
  const abandono = useCountUp(142, 1000, 800);

  const kpis = [
    { label: 'Tráfico Detectado (24h)', valor: trafico.toLocaleString(), suffix: '', sub: '+12% vs. semana previa', color: '#A61C5C', icon: Users, raw: 14250, max: 20000 },
    { label: 'Stop Rate (Atracción)', valor: (stopRate / 10).toFixed(1), suffix: '%', sub: '4,047 personas se detuvieron', color: '#732D67', icon: Eye, raw: 284, max: 500 },
    { label: 'Permanencia Promedio', valor: (permanencia / 10).toFixed(1), suffix: ' min', sub: 'Engagement elevado en islas', color: '#D9933D', icon: Clock, raw: 38, max: 60 },
    { label: 'Tasa de Abandono', valor: (abandono / 10).toFixed(1), suffix: '%', sub: 'Sin atención en horas pico', color: '#BBBF41', icon: AlertTriangle, raw: 142, max: 500 },
  ];

  const ubicaciones = [
    { nombre: 'Isla 1 - Centro Comercial Santa Fe', trafico: 3420, atraccion: 32.1, permanencia: '4.2 min', estado: 'Excelente', chart: [2800, 3100, 3200, 3420, 3380, 3500, 3420] },
    { nombre: 'Isla 4 - Plaza Galerías CDMX', trafico: 2890, atraccion: 24.5, permanencia: '3.1 min', estado: 'Atención requerida', chart: [3200, 3000, 2950, 2800, 2890, 2750, 2890] },
    { nombre: 'Corner 2 - Soriana Coyoacán', trafico: 1950, atraccion: 29.8, permanencia: '3.5 min', estado: 'Bueno', chart: [1800, 1850, 1900, 1950, 1920, 1980, 1950] },
    { nombre: 'Tienda Premium - Perisur', trafico: 4120, atraccion: 31.4, permanencia: '4.8 min', estado: 'Excelente', chart: [3800, 3900, 4000, 4120, 4200, 4100, 4120] },
  ];

  const estadoColor = (e: string) =>
    e === 'Excelente' ? '#5B8F20' : e === 'Bueno' ? '#732D67' : '#D9933D';
  const estadoBg = (e: string) =>
    e === 'Excelente' ? '#EEF6E7' : e === 'Bueno' ? '#F5E8F3' : '#FDF4E7';

  return (
    <div style={{ padding: '24px', backgroundColor: '#FFFFFF', minHeight: '100%', borderRadius: '16px' }}>
      {/* Header */}
      <div className="animate-slide-up" style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: '800', color: colores.primario, margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #A61C5C22, #A61C5C11)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #A61C5C30',
            }}>
              <Eye size={20} color="#A61C5C" />
            </div>
            Computer Vision Comercial M2C
          </h2>
          <p style={{ fontSize: '13px', color: colores.textoMedio, marginTop: '6px', lineHeight: 1.5 }}>
            Monitoreo en tiempo real de tráfico, permanencia y mapas de atracción anónimos en islas y corners de Totalplay.
          </p>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          backgroundColor: '#FCE7F1', color: '#A61C5C', padding: '8px 16px',
          borderRadius: '20px', fontSize: '12px', fontWeight: '700',
          border: '1px solid #F5B8D0', flexShrink: 0
        }}>
          <span className="live-dot" style={{ width: '8px', height: '8px' }} />
          Live Stream · 112 Puntos
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          const pct = Math.round((kpi.raw / kpi.max) * 100);
          return (
            <div
              key={idx}
              className={`card-hover animate-slide-up delay-${idx + 1}`}
              style={{
                backgroundColor: '#FFFFFF', border: `1px solid ${colores.borde}`,
                borderRadius: '16px', padding: '20px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                position: 'relative', overflow: 'hidden'
              }}
            >
              {/* Top color strip */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', backgroundColor: kpi.color, borderRadius: '16px 16px 0 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  backgroundColor: `${kpi.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Icon size={18} color={kpi.color} />
                </div>
                <span style={{ fontSize: '10px', fontWeight: '700', color: '#5B8F20', backgroundColor: '#EEF6E7', padding: '3px 8px', borderRadius: '8px' }}>
                  {kpi.sub.split(' ')[0]}
                </span>
              </div>
              <div style={{ fontSize: '13px', color: colores.textoMedio, fontWeight: '500', marginBottom: '4px' }}>{kpi.label}</div>
              <div style={{ fontSize: '28px', fontWeight: '900', color: kpi.color, lineHeight: 1, marginBottom: '4px' }}>
                {kpi.valor}{kpi.suffix}
              </div>
              <div style={{ fontSize: '11px', color: '#555555', fontWeight: '500', marginBottom: '12px' }}>{kpi.sub}</div>
              {/* Progress bar */}
              <div style={{ backgroundColor: '#F0F0F0', borderRadius: '99px', height: '5px', overflow: 'hidden' }}>
                <div
                  className="progress-bar-animated"
                  style={{
                    width: mounted ? `${pct}%` : '0%',
                    height: '100%', backgroundColor: kpi.color,
                    borderRadius: '99px',
                    transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
                    transitionDelay: `${idx * 0.1}s`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Location Table */}
      <div className="animate-slide-up delay-5" style={{
        backgroundColor: '#FFFFFF', border: `1px solid ${colores.borde}`,
        borderRadius: '16px', padding: '22px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: colores.primario, display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <MapPin size={17} color="#732D67" /> Monitoreo por Ubicación en Tiempo Real
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '600', color: '#5B8F20' }}>
            <RefreshCw size={12} /> Actualizado hace 2 min
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {ubicaciones.map((ub, idx) => (
            <div
              key={idx}
              className={`card-hover animate-slide-up delay-${idx + 1}`}
              style={{
                display: 'grid', gridTemplateColumns: '1fr auto auto auto auto',
                gap: '12px', alignItems: 'center',
                padding: '16px 18px', borderRadius: '12px',
                backgroundColor: '#FAFAFA', border: `1px solid ${colores.borde}`,
              }}
            >
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: '700', color: colores.textoClaro }}>{ub.nombre}</div>
                <div style={{ fontSize: '11px', color: colores.textoMedio, marginTop: '2px' }}>Permanencia: {ub.permanencia}</div>
              </div>

              <div style={{ width: '80px' }}>
                <MiniBarChart data={ub.chart} color="#A61C5C" />
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '10px', color: colores.textoMedio, fontWeight: '600' }}>Tráfico 24h</div>
                <div style={{ fontSize: '15px', fontWeight: '800', color: colores.textoClaro }}>{ub.trafico.toLocaleString()}</div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '10px', color: colores.textoMedio, fontWeight: '600' }}>Stop Rate</div>
                <div style={{ fontSize: '15px', fontWeight: '800', color: '#A61C5C' }}>{ub.atraccion}%</div>
              </div>

              <span style={{
                padding: '5px 12px', borderRadius: '12px', fontSize: '11.5px', fontWeight: '700',
                backgroundColor: estadoBg(ub.estado), color: estadoColor(ub.estado),
                whiteSpace: 'nowrap'
              }}>
                {ub.estado}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
