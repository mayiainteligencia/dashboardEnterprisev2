import React, { useEffect, useState } from 'react';
import { Compass, Target, ShieldCheck, Zap, BarChart3, TrendingUp } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

const { colores } = brandingConfig;

// Animated SVG ring for each scorecard
function ScoreRing({ pct, color, size = 96 }: { pct: number; color: string; size?: number }) {
  const r = (size / 2) - 9;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  const [animated, setAnimated] = useState(false);
  useEffect(() => { setTimeout(() => setAnimated(true), 400); }, []);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Track */}
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={`${color}18`} strokeWidth="8" />
      {/* Fill */}
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={color} strokeWidth="8"
        strokeDasharray={circ}
        strokeDashoffset={animated ? offset : circ}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.22, 1, 0.36, 1)' }}
      />
      {/* Label */}
      <text x={size / 2} y={size / 2 + 6} textAnchor="middle" fontSize="16" fontWeight="900" fill={color}>
        {pct}%
      </text>
    </svg>
  );
}

export const DiscoveryRetailModule: React.FC = () => {
  const scorecards = [
    {
      dim: 'Madurez IA Corporativa', score: 68, color: '#53267E',
      desc: 'Orientación a datos y analítica omnicanal Grupo Televisa',
      icon: BarChart3, recommendation: 'Consolidar capas de datos de clientes izzi'
    },
    {
      dim: 'Madurez IA Puntos Físicos', score: 35, color: '#E3067A',
      desc: 'Alta oportunidad de optimización M2C en tiendas y centros izzi',
      icon: Target, recommendation: 'Despliegue prioritario: Computer Vision + Copiloto'
    },
    {
      dim: 'Oportunidades de IA Comercial', score: 92, color: '#FF6C07',
      desc: 'Captura de leads, cross-selling izzi móvil y demostración izzi tv+',
      icon: Zap, recommendation: 'Escalar a las principales 60 plazas en Q3'
    },
    {
      dim: 'Completitud de Diagnóstico', score: 64, color: '#0090D0',
      desc: 'Piloto M2C recomendado en 12 Centros de Atención izzi iniciales',
      icon: ShieldCheck, recommendation: 'Completar censo en sucursales metropolitanas'
    },
  ];

  const getScoreLabel = (s: number) =>
    s >= 80 ? '🟢 Alto' : s >= 50 ? '🟡 Medio' : '🔴 Bajo';

  const overallScore = Math.round(scorecards.reduce((a, s) => a + s.score, 0) / scorecards.length);

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
            <Compass size={20} color="#E3067A" />
          </div>
          Discovery IA Retail izzi
        </h2>
        <p style={{ fontSize: '13px', color: colores.textoMedio, marginTop: '6px', lineHeight: 1.5 }}>
          Diagnóstico de oportunidad comercial e incertidumbre para la evolución de la red física y comercial izzi.
        </p>
      </div>

      {/* Global score banner */}
      <div className="animate-slide-up delay-1" style={{
        display: 'flex', alignItems: 'center', gap: '24px',
        backgroundColor: '#FDF7FA', border: '1px solid #F8D8E6',
        borderRadius: '16px', padding: '18px 24px', marginBottom: '24px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: colores.textoMedio, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Score Global</div>
          <div style={{ fontSize: '40px', fontWeight: '900', color: '#E3067A', lineHeight: 1 }}>{overallScore}<span style={{ fontSize: '20px' }}>%</span></div>
        </div>
        <div style={{ width: '1px', height: '60px', backgroundColor: '#F0C0D8' }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '14px', fontWeight: '800', color: colores.textoClaro, marginBottom: '6px' }}>
            Diagnóstico de Madurez IA izzi M2C
          </div>
          <div style={{ fontSize: '12px', color: colores.textoMedio, lineHeight: 1.5 }}>
            izzi presenta una oportunidad alta de transformación en puntos físicos. El piloto M2C en 12 ubicaciones iniciales está validado y listo para escalar.
          </div>
        </div>
        <div style={{
          backgroundColor: '#FDEAF2', color: '#E3067A',
          fontSize: '12px', fontWeight: '700', padding: '8px 16px',
          borderRadius: '20px', border: '1px solid #FACADA', whiteSpace: 'nowrap'
        }}>
          🚀 Piloto M2C Listo
        </div>
      </div>

      {/* Scorecards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
        {scorecards.map((sc, idx) => {
          const Icon = sc.icon;
          return (
            <div
              key={idx}
              className={`card-hover animate-fade-scale delay-${idx + 1}`}
              style={{
                border: `1px solid ${sc.color}25`, borderRadius: '18px',
                padding: '20px', backgroundColor: '#FFFFFF',
                boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
                position: 'relative', overflow: 'hidden'
              }}
            >
              {/* Left accent bar */}
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px',
                background: `linear-gradient(180deg, ${sc.color}, ${sc.color}55)`,
                borderRadius: '18px 0 0 18px'
              }} />

              <div style={{ paddingLeft: '8px' }}>
                {/* Icon + label */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <div style={{
                    width: '34px', height: '34px', borderRadius: '10px',
                    backgroundColor: `${sc.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `1px solid ${sc.color}25`
                  }}>
                    <Icon size={16} color={sc.color} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12.5px', fontWeight: '800', color: colores.textoClaro }}>{sc.dim}</div>
                    <div style={{ fontSize: '10px', fontWeight: '600', color: colores.textoMedio }}>{getScoreLabel(sc.score)}</div>
                  </div>
                </div>

                {/* Ring + desc */}
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '14px' }}>
                  <ScoreRing pct={sc.score} color={sc.color} size={76} />
                  <div style={{ fontSize: '12px', color: colores.textoMedio, lineHeight: 1.5 }}>
                    {sc.desc}
                  </div>
                </div>

                {/* Recommendation */}
                <div style={{
                  fontSize: '11.5px', color: sc.color, fontWeight: '700',
                  backgroundColor: `${sc.color}10`, padding: '8px 12px',
                  borderRadius: '8px', display: 'flex', alignItems: 'flex-start', gap: '6px'
                }}>
                  <TrendingUp size={12} style={{ flexShrink: 0, marginTop: '1px' }} />
                  {sc.recommendation}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
