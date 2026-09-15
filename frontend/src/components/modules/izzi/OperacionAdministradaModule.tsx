import React, { useEffect, useState } from 'react';
import { Activity, Cpu, CheckCircle, AlertCircle, Wifi, Radio } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

const { colores } = brandingConfig;

// Heartbeat animated indicator
function HeartbeatDot({ color }: { color: string }) {
  return (
    <div style={{ position: 'relative', width: '12px', height: '12px' }}>
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        backgroundColor: color,
        animation: 'pulse-ring 2s infinite'
      }} />
      <div style={{
        position: 'absolute', inset: '2px', borderRadius: '50%',
        backgroundColor: color
      }} />
    </div>
  );
}

// SVG Gauge for availability
function GaugeChart({ pct, color, size = 100 }: { pct: number; color: string; size?: number }) {
  const r = (size / 2) - 10;
  const circ = Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  const [animated, setAnimated] = useState(false);
  useEffect(() => { setTimeout(() => setAnimated(true), 300); }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <svg width={size} height={size / 2 + 10} viewBox={`0 0 ${size} ${size / 2 + 10}`}>
        <path
          d={`M 10 ${size / 2} A ${r} ${r} 0 0 1 ${size - 10} ${size / 2}`}
          fill="none" stroke={`${color}20`} strokeWidth="9" strokeLinecap="round"
        />
        <path
          d={`M 10 ${size / 2} A ${r} ${r} 0 0 1 ${size - 10} ${size / 2}`}
          fill="none" stroke={color} strokeWidth="9" strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={animated ? offset : circ}
          style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
        <text x={size / 2} y={size / 2 + 4} textAnchor="middle" fontSize="15" fontWeight="900" fill={color}>
          {pct}%
        </text>
      </svg>
      <div style={{ fontSize: '10px', fontWeight: '600', color: colores.textoMedio, marginTop: '2px' }}>Disponibilidad</div>
    </div>
  );
}

export const OperacionAdministradaModule: React.FC = () => {
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 3000);
    return () => clearInterval(id);
  }, []);

  const sensores = [
    {
      tipo: 'Cámaras Computer Vision', total: 240, online: 240,
      status: '100% Online', color: '#10B981', icon: Cpu
    },
    {
      tipo: 'Tótems Asesores izzi', total: 120, online: 120,
      status: '100% Online', color: '#10B981', icon: Radio
    },
    {
      tipo: 'Displays Interactivos izzi tv+', total: 120, online: 119,
      status: '1 Requiere Revisión', color: '#FF6C07', icon: Activity
    },
    {
      tipo: 'Nodos de Red & Telemetría', total: 60, online: 60,
      status: '100% Online', color: '#10B981', icon: Wifi
    },
  ];

  const globalAvailability = Math.round(
    sensores.reduce((a, s) => a + (s.online / s.total) * 100, 0) / sensores.length
  );

  const scorecard = [
    { label: 'Disponibilidad Sensores', valor: '99.7%', delta: '+0.3%', color: '#10B981' },
    { label: 'Pantallas Conectadas', valor: '120/120', delta: '100%', color: '#0090D0' },
    { label: 'Scorecard General', valor: '96/100', delta: '+4 pts', color: '#E3067A' },
    { label: 'Incidentes Abiertos', valor: '1', delta: 'Baja prioridad', color: '#FF6C07' },
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#FFFFFF', minHeight: '100%', borderRadius: '16px' }}>
      {/* Header */}
      <div className="animate-slide-up" style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '800', color: colores.primario, margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #E3067A22, #E3067A11)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid #E3067A30'
          }}>
            <Activity size={20} color="#E3067A" />
          </div>
          Operación Administrada &amp; Sensores izzi
        </h2>
        <p style={{ fontSize: '13px', color: colores.textoMedio, marginTop: '6px', lineHeight: 1.5 }}>
          Monitoreo continuo de continuidad técnica y disponibilidad del equipamiento inteligente en Centros de Atención e islas izzi.
        </p>
      </div>

      {/* Gauge + Scorecard */}
      <div className="animate-slide-up delay-1" style={{
        display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '24px',
        backgroundColor: '#FDF7FA', border: '1px solid #F8D8E6',
        borderRadius: '16px', padding: '20px 24px', marginBottom: '24px', alignItems: 'center'
      }}>
        <GaugeChart pct={globalAvailability} color="#E3067A" size={120} />
        <div>
          <div style={{ fontSize: '13px', fontWeight: '700', color: colores.textoClaro, marginBottom: '12px' }}>
            Disponibilidad Global de Sucursales izzi
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {scorecard.map((s, i) => (
              <div key={i} style={{
                backgroundColor: '#FFFFFF', borderRadius: '10px', padding: '10px 12px',
                border: `1px solid ${s.color}20`
              }}>
                <div style={{ fontSize: '10px', color: colores.textoMedio, fontWeight: '600', marginBottom: '3px' }}>{s.label}</div>
                <div style={{ fontSize: '16px', fontWeight: '900', color: s.color }}>{s.valor}</div>
                <div style={{ fontSize: '10px', fontWeight: '700', color: '#10B981', backgroundColor: '#EEF6E7', padding: '1px 6px', borderRadius: '5px', display: 'inline-block', marginTop: '3px' }}>
                  {s.delta}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sensor cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        {sensores.map((s, idx) => {
          const Icon = s.icon;
          const pct = Math.round((s.online / s.total) * 100);
          const isOk = s.online === s.total;

          return (
            <div
              key={idx}
              className={`card-hover animate-slide-up delay-${idx + 2}`}
              style={{
                border: `1px solid ${s.color}25`, borderRadius: '16px',
                padding: '18px', backgroundColor: '#FFFFFF',
                boxShadow: '0 4px 14px rgba(0,0,0,0.04)', overflow: 'hidden',
                position: 'relative'
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', backgroundColor: s.color }} />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '11px',
                  backgroundColor: `${s.color}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `1px solid ${s.color}25`
                }}>
                  <Icon size={18} color={s.color} />
                </div>
                <HeartbeatDot color={s.color} />
              </div>

              <div style={{ fontSize: '13px', fontWeight: '700', color: colores.textoClaro, marginBottom: '10px' }}>
                {s.tipo}
              </div>

              {/* Count display */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '8px' }}>
                <span style={{ fontSize: '30px', fontWeight: '900', color: s.color, lineHeight: 1 }}>{s.online}</span>
                <span style={{ fontSize: '16px', fontWeight: '600', color: colores.textoMedio, marginBottom: '3px' }}>/ {s.total}</span>
              </div>

              {/* Progress bar */}
              <div style={{ backgroundColor: '#F0F0F0', borderRadius: '99px', height: '5px', overflow: 'hidden', marginBottom: '8px' }}>
                <div style={{
                  height: '100%', width: `${pct}%`,
                  backgroundColor: s.color, borderRadius: '99px',
                  transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)'
                }} />
              </div>

              {/* Status badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {isOk
                  ? <CheckCircle size={13} color="#10B981" />
                  : <AlertCircle size={13} color="#FF6C07" />
                }
                <span style={{ fontSize: '11.5px', fontWeight: '700', color: s.color }}>
                  {s.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
