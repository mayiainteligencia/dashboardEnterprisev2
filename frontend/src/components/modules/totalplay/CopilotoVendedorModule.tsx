import React, { useState, useEffect } from 'react';
import { UserCheck, Sparkles, Target, Zap, CheckCircle2, MessageSquare, TrendingUp, DollarSign } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

const { colores } = brandingConfig;

// Sparkline SVG
function Sparkline({ data, color, width = 80, height = 30 }: { data: number[]; color: string; width?: number; height?: number }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * height * 0.85 - height * 0.07;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Fill under the line */}
      <polyline
        points={`0,${height} ${pts} ${width},${height}`}
        fill={`${color}20`}
        stroke="none"
      />
    </svg>
  );
}

// Circular ring for conversion
function ConversionRing({ value, color, label }: { value: number; color: string; label: string }) {
  const r = 30;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={r} fill="none" stroke={`${color}20`} strokeWidth="6" />
        <circle
          cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 36 36)"
          style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
        <text x="36" y="41" textAnchor="middle" fontSize="13" fontWeight="800" fill={color}>{value}%</text>
      </svg>
      <div style={{ fontSize: '10px', fontWeight: '600', color: colores.textoMedio, textAlign: 'center', maxWidth: '64px' }}>{label}</div>
    </div>
  );
}

export const CopilotoVendedorModule: React.FC = () => {
  const [selectedObjecion, setSelectedObjecion] = useState<string>('precio');
  const [animating, setAnimating] = useState(false);

  const objeciones = [
    {
      id: 'precio',
      titulo: 'El cliente dice que el precio es alto en comparación con la competencia',
      respuestaIA: 'Destaca que Totalplay incluye Fibra Óptica simétrica real hasta el hogar (no cobre degradado) y que con Totalplay TV incluye el sistema Bang & Olufsen Surround sin costo extra de equipamiento.',
      paqueteSugerido: 'Triple Play 150 Mbps + Bang & Olufsen',
      arpuEstimado: '$749 MXN/mes',
      arpuNum: 749,
      arpu7d: [680, 700, 710, 720, 735, 742, 749],
      convRate: 74,
    },
    {
      id: 'cobertura',
      titulo: 'El cliente pregunta si su colonia tiene disponibilidad inmediata',
      respuestaIA: 'Pídele su Código Postal. Recuerda que Totalplay cuenta con más de 164,000 km de fibra óptica en 87 ciudades. Si hay cobertura, la instalación se agenda en menos de 24 horas.',
      paqueteSugerido: 'Doble Play 100 Mbps',
      arpuEstimado: '$599 MXN/mes',
      arpuNum: 599,
      arpu7d: [540, 555, 565, 580, 588, 595, 599],
      convRate: 68,
    },
    {
      id: 'tv',
      titulo: 'El cliente solo busca internet pero tiene familia en casa',
      respuestaIA: 'Argumenta el valor de Totalplay TV como ecosistema integrado que incluye todas las apps de streaming en un solo control remoto y sonido envolvente.',
      paqueteSugerido: 'Triple Play Premium 300 Mbps',
      arpuEstimado: '$999 MXN/mes',
      arpuNum: 999,
      arpu7d: [900, 930, 950, 965, 980, 992, 999],
      convRate: 81,
    },
  ];

  const selectObjecion = (id: string) => {
    setAnimating(true);
    setTimeout(() => {
      setSelectedObjecion(id);
      setAnimating(false);
    }, 250);
  };

  const objActual = objeciones.find(o => o.id === selectedObjecion) || objeciones[0];

  const globalKpis = [
    { label: 'Asesores Activos', valor: '340', color: '#A61C5C', icon: UserCheck },
    { label: 'Cierres Asistidos', valor: '74%', color: '#732D67', icon: CheckCircle2 },
    { label: 'ARPU Prom.', valor: '$612', color: '#D9933D', icon: DollarSign },
    { label: 'Upsell Logrado', valor: '28%', color: '#BBBF41', icon: TrendingUp },
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#FFFFFF', minHeight: '100%', borderRadius: '16px' }}>
      {/* Header */}
      <div className="animate-slide-up" style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '800', color: colores.primario, margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #D9933D22, #D9933D11)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid #D9933D30'
          }}>
            <UserCheck size={20} color="#D9933D" />
          </div>
          Copiloto del Vendedor Totalplay
        </h2>
        <p style={{ fontSize: '13px', color: colores.textoMedio, marginTop: '6px', lineHeight: 1.5 }}>
          Asistente inteligente en tiempo real para apoyar a ejecutivos comerciales en cierre de contratos y elevación de ARPU.
        </p>
      </div>

      {/* Global KPI strip */}
      <div className="animate-slide-up delay-1" style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px'
      }}>
        {globalKpis.map((k, i) => {
          const Icon = k.icon;
          return (
            <div key={i} style={{
              backgroundColor: `${k.color}08`, border: `1px solid ${k.color}25`,
              borderRadius: '14px', padding: '14px 16px',
              display: 'flex', flexDirection: 'column', gap: '4px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Icon size={14} color={k.color} />
                <span style={{ fontSize: '10px', fontWeight: '600', color: colores.textoMedio }}>{k.label}</span>
              </div>
              <div style={{ fontSize: '20px', fontWeight: '900', color: k.color }}>{k.valor}</div>
            </div>
          );
        })}
      </div>

      {/* Main 2-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

        {/* Objections Panel */}
        <div className="animate-slide-up delay-2" style={{
          backgroundColor: '#FFFFFF', border: `1px solid ${colores.borde}`,
          borderRadius: '16px', padding: '20px'
        }}>
          <h3 style={{
            fontSize: '14px', fontWeight: '800', color: colores.primario, marginBottom: '16px',
            display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 16px 0'
          }}>
            <MessageSquare size={16} color="#A61C5C" /> Objeciones y Escenarios Frecuentes
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {objeciones.map(o => (
              <div
                key={o.id}
                onClick={() => selectObjecion(o.id)}
                className="card-hover"
                style={{
                  padding: '14px 16px', borderRadius: '12px', cursor: 'pointer',
                  border: selectedObjecion === o.id ? `2px solid #D9933D` : `1px solid ${colores.borde}`,
                  backgroundColor: selectedObjecion === o.id ? '#FDF4E7' : '#FAFAFA',
                  transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
                  boxShadow: selectedObjecion === o.id ? '0 4px 14px rgba(217,147,61,0.2)' : 'none',
                }}
              >
                <div style={{
                  display: 'flex', alignItems: 'flex-start', gap: '10px'
                }}>
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '6px', flexShrink: 0,
                    backgroundColor: selectedObjecion === o.id ? '#D9933D' : '#F0EDE8',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginTop: '1px', transition: 'all 0.2s',
                  }}>
                    <Zap size={12} color={selectedObjecion === o.id ? '#FFFFFF' : '#D9933D'} />
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: colores.textoClaro, lineHeight: 1.4 }}>{o.titulo}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Response Panel */}
        <div className="animate-slide-up delay-3" style={{
          backgroundColor: '#FFFFFF', border: `1px solid ${colores.borde}`,
          borderRadius: '16px', padding: '20px',
          display: 'flex', flexDirection: 'column', gap: '16px'
        }}>
          {/* MAYIA Copilot badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #D9933D, #C07A28)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Sparkles size={16} color="#FFFFFF" />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#D9933D' }}>MAYIA Copilot</div>
              <div style={{ fontSize: '10px', color: colores.textoMedio, fontWeight: '500' }}>Argumento recomendado en tiempo real</div>
            </div>
          </div>

          {/* Response text */}
          <div
            style={{
              fontSize: '13.5px', color: colores.textoClaro, lineHeight: 1.65,
              backgroundColor: '#FFFBF5', padding: '16px',
              borderRadius: '12px', borderLeft: '4px solid #D9933D',
              opacity: animating ? 0 : 1, transform: animating ? 'translateY(6px)' : 'translateY(0)',
              transition: 'opacity 0.25s, transform 0.25s',
              fontStyle: 'italic'
            }}
          >
            "{objActual.respuestaIA}"
          </div>

          {/* Package + ARPU row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ backgroundColor: '#F5E8F3', padding: '14px', borderRadius: '12px', border: '1px solid #E5C8E0' }}>
              <div style={{ fontSize: '10px', color: '#732D67', fontWeight: '800', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Paquete Recomendado
              </div>
              <div style={{ fontSize: '12.5px', fontWeight: '700', color: colores.textoClaro }}>{objActual.paqueteSugerido}</div>
            </div>
            <div style={{ backgroundColor: '#FDF4E7', padding: '14px', borderRadius: '12px', border: '1px solid #F0D5A0' }}>
              <div style={{ fontSize: '10px', color: '#D9933D', fontWeight: '800', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                ARPU Estimado
              </div>
              <div style={{ fontSize: '18px', fontWeight: '900', color: '#D9933D' }}>{objActual.arpuEstimado}</div>
            </div>
          </div>

          {/* Sparkline + Conversion ring */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '14px', borderTop: `1px solid ${colores.borde}` }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '10px', color: colores.textoMedio, fontWeight: '600', marginBottom: '6px' }}>ARPU Últimos 7 Días</div>
              <Sparkline data={objActual.arpu7d} color="#D9933D" width={120} height={36} />
            </div>
            <ConversionRing value={objActual.convRate} color="#732D67" label="Tasa de Cierre" />
          </div>
        </div>
      </div>
    </div>
  );
};
