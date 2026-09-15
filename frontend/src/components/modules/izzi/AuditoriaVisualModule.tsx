import React, { useEffect, useState } from 'react';
import { Camera, CheckCircle, AlertTriangle } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

const { colores } = brandingConfig;

// SVG Circular progress ring
function ScoreRing({ score, color, size = 80 }: { score: number; color: string; size?: number }) {
  const r = (size / 2) - 7;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const [animated, setAnimated] = useState(false);
  useEffect(() => { setTimeout(() => setAnimated(true), 300); }, []);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={`${color}20`} strokeWidth="6" />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={color} strokeWidth="6"
        strokeDasharray={circ}
        strokeDashoffset={animated ? offset : circ}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 1.3s cubic-bezier(0.22, 1, 0.36, 1)' }}
      />
      <text x={size / 2} y={size / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="800" fill={color}>
        {score}%
      </text>
    </svg>
  );
}

export const AuditoriaVisualModule: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 150); }, []);

  const fotos = [
    {
      punto: 'Isla 1 - Plaza Santa Fe CDMX', fecha: 'Hoy 09:15 AM', estado: 'Conforme', score: 98,
      imagen: 'Isla limpia, displays encendidos y exhibición oficial izzi tv+.', color: '#10B981',
      items: ['Planograma ✓', 'Iluminación ✓', 'Display izzi tv+ ✓', 'Limpieza ✓']
    },
    {
      punto: 'Centro izzi Galerías Monterrey', fecha: 'Hoy 09:45 AM', estado: 'Desviación', score: 82,
      imagen: 'Iluminación decorativa en tótem apagada. Requiere reinicio de pastilla eléctrica.', color: '#FF6C07',
      items: ['Planograma ✓', 'Iluminación ✗', 'Display izzi tv+ ✓', 'Limpieza ✓']
    },
    {
      punto: 'Centro de Atención izzi Perisur', fecha: 'Hoy 08:30 AM', estado: 'Conforme', score: 100,
      imagen: 'Planograma y módulos de atención al 100% de cumplimiento con imagen izzi.', color: '#10B981',
      items: ['Planograma ✓', 'Iluminación ✓', 'Display izzi tv+ ✓', 'Limpieza ✓']
    },
  ];

  const globalScore = Math.round(fotos.reduce((a, f) => a + f.score, 0) / fotos.length);
  const conforme = fotos.filter(f => f.estado === 'Conforme').length;

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
            <Camera size={20} color="#E3067A" />
          </div>
          Auditoría Visual IA izzi
        </h2>
        <p style={{ fontSize: '13px', color: colores.textoMedio, marginTop: '6px', lineHeight: 1.5 }}>
          Verificación automatizada por visión artificial para estandarizar la ejecución física en 120+ puntos de venta a nivel nacional.
        </p>
      </div>

      {/* Global score banner */}
      <div className="animate-slide-up delay-1" style={{
        display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', gap: '24px', alignItems: 'center',
        backgroundColor: '#FDF7FA', border: `1px solid #F8D8E6`,
        borderRadius: '16px', padding: '20px 24px', marginBottom: '24px'
      }}>
        <ScoreRing score={globalScore} color="#E3067A" size={76} />
        <div>
          <div style={{ fontSize: '13px', fontWeight: '700', color: colores.textoClaro }}>Cumplimiento Global Nacional izzi</div>
          <div style={{ fontSize: '12px', color: colores.textoMedio, lineHeight: 1.5, marginTop: '4px' }}>
            {conforme} de {fotos.length} puntos auditados en conformidad hoy
          </div>
          {/* Progress bar */}
          <div style={{ marginTop: '10px', backgroundColor: '#E8E0EA', borderRadius: '99px', height: '6px', overflow: 'hidden', maxWidth: '220px' }}>
            <div style={{
              width: mounted ? `${globalScore}%` : '0%',
              height: '100%', backgroundColor: '#E3067A',
              borderRadius: '99px',
              transition: 'width 1.4s cubic-bezier(0.22, 1, 0.36, 1)'
            }} />
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', color: colores.textoMedio, marginBottom: '4px' }}>Conformes</div>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#10B981' }}>{conforme}/{fotos.length}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', color: colores.textoMedio, marginBottom: '4px' }}>Desviaciones</div>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#FF6C07' }}>{fotos.length - conforme}</div>
        </div>
      </div>

      {/* Audit cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
        {fotos.map((f, idx) => (
          <div
            key={idx}
            className={`card-hover animate-slide-up delay-${idx + 2}`}
            style={{
              border: `1px solid ${f.color}30`,
              borderRadius: '16px', backgroundColor: '#FFFFFF',
              overflow: 'hidden',
              boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
            }}
          >
            {/* Top bar */}
            <div style={{
              height: '4px',
              background: `linear-gradient(90deg, ${f.color}, ${f.color}77)`,
            }} />

            <div style={{ padding: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: colores.textoClaro }}>{f.punto}</div>
                  <div style={{ fontSize: '11px', color: colores.textoMedio, marginTop: '2px' }}>Captura: {f.fecha}</div>
                </div>
                <ScoreRing score={f.score} color={f.color} size={60} />
              </div>

              {/* Status badge */}
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700',
                backgroundColor: f.color === '#10B981' ? '#EEF6E7' : '#FFF0E6',
                color: f.color,
                marginBottom: '12px'
              }}>
                {f.estado === 'Conforme' ? <CheckCircle size={12} /> : <AlertTriangle size={12} />}
                {f.estado}
              </span>

              {/* Description */}
              <div style={{
                fontSize: '12px', color: colores.textoMedio, lineHeight: 1.5,
                backgroundColor: '#FAFAFA', padding: '10px 12px', borderRadius: '8px',
                marginBottom: '12px'
              }}>
                {f.imagen}
              </div>

              {/* Checklist items */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                {f.items.map((item, ii) => (
                  <div key={ii} style={{
                    fontSize: '11px', fontWeight: '500',
                    color: item.includes('✓') ? '#10B981' : '#FF6C07',
                    display: 'flex', alignItems: 'center', gap: '4px'
                  }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
