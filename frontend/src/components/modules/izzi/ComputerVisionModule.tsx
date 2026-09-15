import React, { useEffect, useState } from 'react';
import { Eye, Users, Clock, AlertTriangle, MapPin, RefreshCw } from 'lucide-react';
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

  const trafico = useCountUp(16840, 1400, 200);
  const stopRate = useCountUp(312, 1200, 400);
  const permanencia = useCountUp(41, 1000, 600);
  const abandono = useCountUp(125, 1000, 800);

  const kpis = [
    { label: 'Tráfico Detectado (24h)', valor: trafico.toLocaleString(), suffix: '', sub: '+14% vs. semana previa', color: '#E3067A', icon: Users, raw: 16840, max: 25000 },
    { label: 'Stop Rate (Atracción)', valor: (stopRate / 10).toFixed(1), suffix: '%', sub: '5,254 personas se detuvieron', color: '#0090D0', icon: Eye, raw: 312, max: 500 },
    { label: 'Permanencia Promedio', valor: (permanencia / 10).toFixed(1), suffix: ' min', sub: 'Alto engagement en sucursales', color: '#FF6C07', icon: Clock, raw: 41, max: 60 },
    { label: 'Tasa de Abandono', valor: (abandono / 10).toFixed(1), suffix: '%', sub: 'Controlada en horas de mayor flujo', color: '#53267E', icon: AlertTriangle, raw: 125, max: 500 },
  ];

  const ubicaciones = [
    { nombre: 'Isla 1 - Plaza Santa Fe CDMX', trafico: 3950, atraccion: 34.2, permanencia: '4.5 min', estado: 'Excelente', chart: [3100, 3300, 3600, 3950, 3880, 4050, 3950] },
    { nombre: 'Isla 2 - Plaza Satélite', trafico: 3200, atraccion: 26.8, permanencia: '3.4 min', estado: 'Atención requerida', chart: [3400, 3300, 3100, 3050, 3200, 3150, 3200] },
    { nombre: 'Centro izzi Galerías Monterrey', trafico: 4850, atraccion: 33.1, permanencia: '4.6 min', estado: 'Excelente', chart: [4200, 4400, 4600, 4850, 4900, 4750, 4850] },
    { nombre: 'Centro de Atención izzi Perisur', trafico: 4620, atraccion: 32.7, permanencia: '4.9 min', estado: 'Excelente', chart: [4100, 4300, 4500, 4620, 4700, 4600, 4620] },
  ];

  const estadoColor = (e: string) =>
    e === 'Excelente' ? '#10B981' : e === 'Bueno' ? '#0090D0' : '#FF6C07';
  const estadoBg = (e: string) =>
    e === 'Excelente' ? '#EEF6E7' : e === 'Bueno' ? '#E6F4FB' : '#FFF0E6';

  return (
    <div style={{ padding: '24px', backgroundColor: '#FFFFFF', minHeight: '100%', borderRadius: '16px' }}>
      {/* Header */}
      <div className="animate-slide-up" style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: '800', color: colores.primario, margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #E3067A22, #E3067A11)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E3067A30',
            }}>
              <Eye size={20} color="#E3067A" />
            </div>
            Computer Vision Comercial M2C
          </h2>
          <p style={{ fontSize: '13px', color: colores.textoMedio, marginTop: '6px', lineHeight: 1.5 }}>
            Monitoreo en tiempo real de tráfico, permanencia y mapas de atracción anónimos en Centros de Atención, islas y corners de izzi.
          </p>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          backgroundColor: '#FDEAF2', color: '#E3067A', padding: '8px 16px',
          borderRadius: '20px', fontSize: '12px', fontWeight: '700',
          border: '1px solid #FACADA', flexShrink: 0
        }}>
          <span className="live-dot" style={{ width: '8px', height: '8px' }} />
          Live Stream · 120 Puntos izzi
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
                <span style={{ fontSize: '10px', fontWeight: '700', color: '#10B981', backgroundColor: '#EEF6E7', padding: '3px 8px', borderRadius: '8px' }}>
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
            <MapPin size={17} color="#E3067A" /> Monitoreo por Ubicación en Tiempo Real
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '600', color: '#10B981' }}>
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
                <MiniBarChart data={ub.chart} color="#E3067A" />
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '10px', color: colores.textoMedio, fontWeight: '600' }}>Tráfico 24h</div>
                <div style={{ fontSize: '15px', fontWeight: '800', color: colores.textoClaro }}>{ub.trafico.toLocaleString()}</div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '10px', color: colores.textoMedio, fontWeight: '600' }}>Stop Rate</div>
                <div style={{ fontSize: '15px', fontWeight: '800', color: '#E3067A' }}>{ub.atraccion}%</div>
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
