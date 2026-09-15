import React, { useState } from 'react';
import { UserCheck, Sparkles, Zap, CheckCircle2, MessageSquare, TrendingUp, DollarSign } from 'lucide-react';
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
          cx={sizeSafe(36)} cy={sizeSafe(36)} r={r} fill="none" stroke={color} strokeWidth="6"
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

function sizeSafe(val: number) { return val; }

export const CopilotoVendedorModule: React.FC = () => {
  const [selectedObjecion, setSelectedObjecion] = useState<string>('precio');
  const [animating, setAnimating] = useState(false);

  const objeciones = [
    {
      id: 'precio',
      titulo: 'El cliente dice que el precio es alto en comparación con otras compañías',
      respuestaIA: 'Enfatiza que izzi ofrece el mejor costo-beneficio del mercado: navegación de alta velocidad simétrica, izzi tv+ con las mejores apps de streaming integradas (ViX+, Netflix o Max) y telefonía ilimitada.',
      paqueteSugerido: 'izzi Triple Play 100 Mbps + izzi tv+',
      arpuEstimado: '$670 MXN/mes',
      arpuNum: 670,
      arpu7d: [620, 635, 645, 650, 660, 665, 670],
      convRate: 78,
    },
    {
      id: 'cobertura',
      titulo: 'El cliente pregunta si su colonia tiene cobertura de red y fibra izzi',
      respuestaIA: 'Pídele su Código Postal y colonia. Recuerda que izzi cuenta con más de 140,000 km de red híbrida y fibra óptica en más de 60 ciudades. Si hay cobertura, la instalación es express sin costo de suscripción.',
      paqueteSugerido: 'izzi Doble Play 80 Mbps',
      arpuEstimado: '$510 MXN/mes',
      arpuNum: 510,
      arpu7d: [480, 490, 495, 500, 505, 508, 510],
      convRate: 72,
    },
    {
      id: 'tv',
      titulo: 'El cliente solo busca internet pero tiene familia en casa',
      respuestaIA: 'Explica el valor integral de izzi tv+: acceso a más de 100 canales HD, control remoto inteligente y la opción de portar líneas a izzi móvil con gigas ilimitados a tarifa preferencial.',
      paqueteSugerido: 'Combo izzi 200 Mbps + izzi tv+ & Móvil',
      arpuEstimado: '$890 MXN/mes',
      arpuNum: 890,
      arpu7d: [820, 840, 855, 870, 880, 885, 890],
      convRate: 84,
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
    { label: 'Asesores Activos', valor: '420', color: '#E3067A', icon: UserCheck },
    { label: 'Cierres Asistidos', valor: '78%', color: '#0090D0', icon: CheckCircle2 },
    { label: 'ARPU Prom.', valor: '$585', color: '#FF6C07', icon: DollarSign },
    { label: 'Upsell Logrado', valor: '32%', color: '#10B981', icon: TrendingUp },
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#FFFFFF', minHeight: '100%', borderRadius: '16px' }}>
      {/* Header */}
      <div className="animate-slide-up" style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '800', color: colores.primario, margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #FF6C0722, #FF6C0711)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid #FF6C0730'
          }}>
            <UserCheck size={20} color="#FF6C07" />
          </div>
          Copiloto del Vendedor izzi
        </h2>
        <p style={{ fontSize: '13px', color: colores.textoMedio, marginTop: '6px', lineHeight: 1.5 }}>
          Asistente inteligente en tiempo real para apoyar a ejecutivos comerciales en sucursales izzi en argumentación, cierre y elevación de ARPU.
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
            <MessageSquare size={16} color="#E3067A" /> Objeciones y Escenarios Frecuentes
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {objeciones.map(o => (
              <div
                key={o.id}
                onClick={() => selectObjecion(o.id)}
                className="card-hover"
                style={{
                  padding: '14px 16px', borderRadius: '12px', cursor: 'pointer',
                  border: selectedObjecion === o.id ? `2px solid #FF6C07` : `1px solid ${colores.borde}`,
                  backgroundColor: selectedObjecion === o.id ? '#FFF0E6' : '#FAFAFA',
                  transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
                  boxShadow: selectedObjecion === o.id ? '0 4px 14px rgba(255,108,7,0.2)' : 'none',
                }}
              >
                <div style={{
                  display: 'flex', alignItems: 'flex-start', gap: '10px'
                }}>
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '6px', flexShrink: 0,
                    backgroundColor: selectedObjecion === o.id ? '#FF6C07' : '#F0EDE8',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginTop: '1px', transition: 'all 0.2s',
                  }}>
                    <Zap size={12} color={selectedObjecion === o.id ? '#FFFFFF' : '#FF6C07'} />
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
              background: 'linear-gradient(135deg, #FF6C07, #E3067A)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Sparkles size={16} color="#FFFFFF" />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#FF6C07' }}>MAYIA Copilot izzi</div>
              <div style={{ fontSize: '10px', color: colores.textoMedio, fontWeight: '500' }}>Argumento recomendado en tiempo real</div>
            </div>
          </div>

          {/* Response text */}
          <div
            style={{
              fontSize: '13.5px', color: colores.textoClaro, lineHeight: 1.65,
              backgroundColor: '#FFFBF5', padding: '16px',
              borderRadius: '12px', borderLeft: '4px solid #FF6C07',
              opacity: animating ? 0 : 1, transform: animating ? 'translateY(6px)' : 'translateY(0)',
              transition: 'opacity 0.25s, transform 0.25s',
              fontStyle: 'italic'
            }}
          >
            "{objActual.respuestaIA}"
          </div>

          {/* Package + ARPU row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ backgroundColor: '#E6F4FB', padding: '14px', borderRadius: '12px', border: '1px solid #BCE3F7' }}>
              <div style={{ fontSize: '10px', color: '#0090D0', fontWeight: '800', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Paquete Recomendado
              </div>
              <div style={{ fontSize: '12.5px', fontWeight: '700', color: colores.textoClaro }}>{objActual.paqueteSugerido}</div>
            </div>
            <div style={{ backgroundColor: '#FFF0E6', padding: '14px', borderRadius: '12px', border: '1px solid #FCD3B8' }}>
              <div style={{ fontSize: '10px', color: '#FF6C07', fontWeight: '800', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                ARPU Estimado
              </div>
              <div style={{ fontSize: '18px', fontWeight: '900', color: '#FF6C07' }}>{objActual.arpuEstimado}</div>
            </div>
          </div>

          {/* Sparkline + Conversion ring */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '14px', borderTop: `1px solid ${colores.borde}` }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '10px', color: colores.textoMedio, fontWeight: '600', marginBottom: '6px' }}>ARPU Últimos 7 Días</div>
              <Sparkline data={objActual.arpu7d} color="#FF6C07" width={120} height={36} />
            </div>
            <ConversionRing value={objActual.convRate} color="#0090D0" label="Tasa de Cierre" />
          </div>
        </div>
      </div>
    </div>
  );
};
