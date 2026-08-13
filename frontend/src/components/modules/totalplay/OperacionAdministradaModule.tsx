import React, { useEffect, useState } from 'react';
import { Activity, ShieldAlert, Cpu, CheckCircle, AlertCircle, Wifi, Radio } from 'lucide-react';
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
  const circ = Math.PI * r; // semicircle
  const offset = circ - (pct / 100) * circ;
  const [animated, setAnimated] = useState(false);
  useEffect(() => { setTimeout(() => setAnimated(true), 300); }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <svg width={size} height={size / 2 + 10} viewBox={`0 0 ${size} ${size / 2 + 10}`}>
        {/* Track */}
        <path
          d={`M 10 ${size / 2} A ${r} ${r} 0 0 1 ${size - 10} ${size / 2}`}
          fill="none" stroke={`${color}20`} strokeWidth="9" strokeLinecap="round"
        />
        {/* Fill */}
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
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 3000);
    return () => clearInterval(id);
  }, []);

  const sensores = [
    {
      tipo: 'Cámaras Computer Vision', total: 224, online: 224,
      status: '100% Online', color: '#5B8F20', icon: Cpu
    },
    {
      tipo: 'Tótems Asesores en Pantalla', total: 112, online: 112,
      status: '100% Online', color: '#5B8F20', icon: Radio
    },
    {
      tipo: 'Sistemas Audio Bang & Olufsen', total: 112, online: 110,
      status: '2 Requieren Revisión', color: '#D9933D', icon: Activity
    },
    {
      tipo: 'Nodos IoT Cobertura', total: 87, online: 87,
      status: '100% Online', color: '#5B8F20', icon: Wifi
    },
  ];

  const globalAvailability = Math.round(
    sensores.reduce((a, s) => a + (s.online / s.total) * 100, 0) / sensores.length
  );

  const scorecard = [
    { label: 'Disponibilidad Sensores', valor: '99.4%', delta: '+0.2%', color: '#5B8F20' },
    { label: 'Pantallas Conectadas', valor: '112/112', delta: '100%', color: '#732D67' },
    { label: 'Scorecard General', valor: '94/100', delta: '+3 pts', color: '#A61C5C' },
    { label: 'Incidentes Abiertos', valor: '2', delta: 'Baja prioridad', color: '#D9933D' },
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#FFFFFF', minHeight: '100%', borderRadius: '16px' }}>
      {/* Header */}
      <div className="animate-slide-up" style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '800', color: colores.primario, margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #732D6722, #732D6711)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid #732D6730'
          }}>
            <Activity size={20} color="#732D67" />
          </div>
          Operación Administrada &amp; Sensores
        </h2>
        <p style={{ fontSize: '13px', color: colores.textoMedio, marginTop: '6px', lineHeight: 1.5 }}>
          Monitoreo continuo de continuidad técnica y disponibilidad del equipamiento inteligente.
        </p>
      </div>

      {/* Gauge + Scorecard */}
      <div className="animate-slide-up delay-1" style={{
        display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '24px',
        backgroundColor: '#F9F5FA', border: '1px solid #E5D5E0',
        borderRadius: '16px', padding: '20px 24px', marginBottom: '24px', alignItems: 'center'
      }}>
        <GaugeChart pct={globalAvailability} color="#732D67" size={120} />
        <div>
          <div style={{ fontSize: '13px', fontWeight: '700', color: colores.textoClaro, marginBottom: '12px' }}>
            Disponibilidad Global del Sistema
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {scorecard.map((s, i) => (
              <div key={i} style={{
                backgroundColor: '#FFFFFF', borderRadius: '10px', padding: '10px 12px',
                border: `1px solid ${s.color}20`
              }}>
                <div style={{ fontSize: '10px', color: colores.textoMedio, fontWeight: '600', marginBottom: '3px' }}>{s.label}</div>
                <div style={{ fontSize: '16px', fontWeight: '900', color: s.color }}>{s.valor}</div>
                <div style={{ fontSize: '10px', fontWeight: '700', color: '#5B8F20', backgroundColor: '#EEF6E7', padding: '1px 6px', borderRadius: '5px', display: 'inline-block', marginTop: '3px' }}>
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
              {/* Top accent */}
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
                  ? <CheckCircle size={13} color="#5B8F20" />
                  : <AlertCircle size={13} color="#D9933D" />
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
