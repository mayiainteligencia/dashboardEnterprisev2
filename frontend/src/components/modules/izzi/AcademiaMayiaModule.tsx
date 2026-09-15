import React, { useEffect, useState } from 'react';
import { GraduationCap, BookOpen, Award, Star, CheckCircle2, Clock, Users } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

const { colores } = brandingConfig;

// Circular progress ring
function RingChart({ pct, color, size = 88, label }: { pct: number; color: string; size?: number; label?: string }) {
  const r = (size / 2) - 8;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  const [animated, setAnimated] = useState(false);
  useEffect(() => { setTimeout(() => setAnimated(true), 300); }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={`${color}20`} strokeWidth="7" />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth="7"
          strokeDasharray={circ}
          strokeDashoffset={animated ? offset : circ}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
        <text x={size / 2} y={size / 2 + 5} textAnchor="middle" fontSize="15" fontWeight="800" fill={color}>
          {pct}%
        </text>
      </svg>
      {label && <div style={{ fontSize: '10px', fontWeight: '600', color: colores.textoMedio, textAlign: 'center' }}>{label}</div>}
    </div>
  );
}

// Star rating
function StarRating({ value, max = 10 }: { value: number; max?: number }) {
  const stars = 5;
  const filled = Math.round((value / max) * stars * 2) / 2;
  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {Array.from({ length: stars }).map((_, i) => (
        <Star
          key={i}
          size={14}
          color={i < Math.floor(filled) ? '#FF6C07' : '#E0E0E0'}
          fill={i < Math.floor(filled) ? '#FF6C07' : 'none'}
        />
      ))}
    </div>
  );
}

export const AcademiaMayiaModule: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 150); }, []);

  const cursos = [
    {
      titulo: 'Técnicas de Cierre para izzi tv+, izzi móvil & Triple Play',
      horas: '10h', estado: 'Completado por 420 ejecutivos', progreso: 100, color: '#10B981',
      icon: CheckCircle2, badge: 'Completado'
    },
    {
      titulo: 'Uso Efectivo del Copiloto IA en Centros de Atención izzi',
      horas: '6h', estado: 'En curso (350 ejecutivos)', progreso: 82, color: '#53267E',
      icon: Clock, badge: 'En Curso'
    },
    {
      titulo: 'Verificación de Cobertura y Configuración de Paquetes izzi',
      horas: '4h', estado: 'Obligatorio (520 ejecutivos)', progreso: 94, color: '#E3067A',
      icon: Award, badge: 'Obligatorio'
    },
  ];

  const globalPct = Math.round(cursos.reduce((a, c) => a + c.progreso, 0) / cursos.length);

  const stats = [
    { label: 'Vendedores Certificados', valor: '520', color: '#E3067A', icon: Users },
    { label: 'Cursos Completados', valor: '1,640', color: '#53267E', icon: BookOpen },
    { label: 'Calificación Prom.', valor: '9.6/10', color: '#FF6C07', icon: Star },
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
            <GraduationCap size={20} color="#E3067A" />
          </div>
          Academia MAYIA izzi
        </h2>
        <p style={{ fontSize: '13px', color: colores.textoMedio, marginTop: '6px', lineHeight: 1.5 }}>
          Capacitación continua en técnicas comerciales, ecosistema izzi tv+, izzi móvil y herramientas de IA para vendedores.
        </p>
      </div>

      {/* Stats + Ring */}
      <div className="animate-slide-up delay-1" style={{
        display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '24px',
        backgroundColor: '#FDF7FA', border: '1px solid #F8D8E6',
        borderRadius: '16px', padding: '20px 24px', marginBottom: '24px',
        alignItems: 'center'
      }}>
        <RingChart pct={globalPct} color="#0090D0" size={88} label="Avance Global" />
        <div>
          <div style={{ fontSize: '13px', fontWeight: '700', color: colores.textoClaro, marginBottom: '4px' }}>
            Progreso Promedio de la Academia
          </div>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '12px' }}>
            <StarRating value={9.6} />
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#FF6C07' }}>9.6 / 10</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} style={{ textAlign: 'center', padding: '10px', backgroundColor: '#FFFFFF', borderRadius: '10px', border: `1px solid ${s.color}20` }}>
                  <Icon size={14} color={s.color} style={{ marginBottom: '4px' }} />
                  <div style={{ fontSize: '15px', fontWeight: '900', color: s.color }}>{s.valor}</div>
                  <div style={{ fontSize: '10px', color: colores.textoMedio, fontWeight: '500' }}>{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Course cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {cursos.map((c, idx) => {
          const Icon = c.icon;
          return (
            <div
              key={idx}
              className={`card-hover animate-slide-up delay-${idx + 2}`}
              style={{
                border: `1px solid ${c.color}25`, borderRadius: '16px', padding: '20px',
                backgroundColor: '#FFFFFF', overflow: 'hidden', position: 'relative'
              }}
            >
              {/* Top accent */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', backgroundColor: c.color }} />
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '14px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <Icon size={16} color={c.color} />
                    <h4 style={{ fontSize: '14px', fontWeight: '800', color: colores.textoClaro, margin: 0, lineHeight: 1.3 }}>
                      {c.titulo}
                    </h4>
                  </div>
                  <div style={{ fontSize: '12px', color: colores.textoMedio, marginBottom: '14px' }}>
                    Duración: <strong>{c.horas}</strong> · {c.estado}
                  </div>
                  {/* Animated progress bar */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '600', marginBottom: '6px' }}>
                      <span style={{ color: colores.textoMedio }}>Progreso</span>
                      <span style={{ color: c.color }}>{c.progreso}%</span>
                    </div>
                    <div style={{ backgroundColor: '#F0F0F0', borderRadius: '99px', height: '7px', overflow: 'hidden' }}>
                      <div style={{
                        width: mounted ? `${c.progreso}%` : '0%',
                        height: '100%',
                        background: `linear-gradient(90deg, ${c.color}BB, ${c.color})`,
                        borderRadius: '99px',
                        transition: `width 1.3s cubic-bezier(0.22, 1, 0.36, 1) ${idx * 0.15}s`
                      }} />
                    </div>
                  </div>
                </div>
                {/* Badge */}
                <span style={{
                  backgroundColor: `${c.color}15`, color: c.color,
                  fontSize: '10.5px', fontWeight: '800',
                  padding: '5px 12px', borderRadius: '12px',
                  border: `1px solid ${c.color}30`, whiteSpace: 'nowrap', flexShrink: 0,
                }}>
                  {c.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
