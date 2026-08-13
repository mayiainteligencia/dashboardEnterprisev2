import React, { useEffect, useState } from 'react';
import { LayoutGrid, Layers, Box, TrendingUp, MapPin, BarChart3, Users } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

const { colores } = brandingConfig;

function useCountUp(target: number, duration = 1200, delay = 0) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [target, duration, delay]);
  return val;
}

// Mini horizontal bar
function ARPUBar({ valor, max, color }: { valor: number; max: number; color: string }) {
  const [w, setW] = useState('0%');
  useEffect(() => { setTimeout(() => setW(`${(valor / max) * 100}%`), 400); }, [valor, max]);
  return (
    <div style={{ height: '6px', backgroundColor: '#EEEEEE', borderRadius: '99px', overflow: 'hidden', flex: 1 }}>
      <div style={{ height: '100%', width: w, backgroundColor: color, borderRadius: '99px', transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)' }} />
    </div>
  );
}

export const DisenioFabricacionModule: React.FC = () => {
  const u1 = useCountUp(48, 1200, 200);
  const u2 = useCountUp(42, 1100, 350);
  const u3 = useCountUp(22, 1000, 500);

  const formatos = [
    {
      nombre: 'Isla Comercial Mall (4×3m)', unidades: u1, raw: 48,
      arpuProm: '$642 MXN', arpuNum: 642, atraccion: '31.2%',
      desc: 'Isla de alto impacto visual con tótem interactivo y espacio Bang & Olufsen Surround.',
      color: '#A61C5C', icon: Box,
      tags: ['Alto Impacto', 'B&O Integrado', 'Tótem IA'],
    },
    {
      nombre: 'Corner Autoservicio (Soriana / Walmart / Chedraui)', unidades: u2, raw: 42,
      arpuProm: '$588 MXN', arpuNum: 588, atraccion: '26.8%',
      desc: 'Mobiliario compacto de 2×1.5m optimizado para tráfico constante.',
      color: '#732D67', icon: Layers,
      tags: ['Compacto', 'Alto Tráfico', 'Fácil Setup'],
    },
    {
      nombre: 'Tienda Flagship Premium', unidades: u3, raw: 22,
      arpuProm: '$780 MXN', arpuNum: 780, atraccion: '34.5%',
      desc: 'Centro de experiencia inmersiva con salas de demostración Totalplay TV.',
      color: '#D9933D', icon: LayoutGrid,
      tags: ['Flagship', 'Demo Room', 'ARPU Alto'],
    },
  ];

  const maxArpu = Math.max(...formatos.map(f => f.arpuNum));
  const totalUnits = formatos.reduce((a, f) => a + f.raw, 0);

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
            <LayoutGrid size={20} color="#D9933D" />
          </div>
          Diseños y Mobiliario Retail Innova
        </h2>
        <p style={{ fontSize: '13px', color: colores.textoMedio, marginTop: '6px', lineHeight: 1.5 }}>
          Gestión de formatos físicos de punto de venta y su rendimiento por metro cuadrado.
        </p>
      </div>

      {/* Summary strip */}
      <div className="animate-slide-up delay-1" style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '28px'
      }}>
        <div style={{ backgroundColor: '#FEF0F7', border: '1px solid #F0C0D8', borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', color: '#A61C5C', marginBottom: '4px', textTransform: 'uppercase' }}>Formatos Activos</div>
          <div style={{ fontSize: '28px', fontWeight: '900', color: '#A61C5C' }}>{totalUnits}</div>
          <div style={{ fontSize: '11px', color: colores.textoMedio }}>Puntos Nacionales</div>
        </div>
        <div style={{ backgroundColor: '#F5E8F3', border: '1px solid #E5C8E0', borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', color: '#732D67', marginBottom: '4px', textTransform: 'uppercase' }}>ARPU Promedio</div>
          <div style={{ fontSize: '28px', fontWeight: '900', color: '#732D67' }}>$670</div>
          <div style={{ fontSize: '11px', color: colores.textoMedio }}>MXN / mes</div>
        </div>
        <div style={{ backgroundColor: '#FDF4E7', border: '1px solid #F0D5A0', borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', color: '#D9933D', marginBottom: '4px', textTransform: 'uppercase' }}>Atracción Prom.</div>
          <div style={{ fontSize: '28px', fontWeight: '900', color: '#D9933D' }}>30.8%</div>
          <div style={{ fontSize: '11px', color: colores.textoMedio }}>Stop Rate Media</div>
        </div>
      </div>

      {/* ARPU Comparison */}
      <div className="animate-slide-up delay-2" style={{
        backgroundColor: '#FAFAFA', border: `1px solid ${colores.borde}`,
        borderRadius: '14px', padding: '18px 20px', marginBottom: '24px'
      }}>
        <div style={{ fontSize: '13px', fontWeight: '800', color: colores.primario, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BarChart3 size={15} color="#732D67" /> Comparativo ARPU por Formato
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {formatos.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ fontSize: '11px', fontWeight: '600', color: colores.textoMedio, width: '130px', flexShrink: 0 }}>
                {f.nombre.split(' (')[0]}
              </div>
              <ARPUBar valor={f.arpuNum} max={maxArpu + 100} color={f.color} />
              <div style={{ fontSize: '13px', fontWeight: '900', color: f.color, width: '70px', textAlign: 'right', flexShrink: 0 }}>
                {f.arpuProm}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Format cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
        {formatos.map((f, idx) => {
          const Icon = f.icon;
          return (
            <div
              key={idx}
              className={`card-hover animate-fade-scale delay-${idx + 2}`}
              style={{
                border: `1px solid ${f.color}25`, borderRadius: '18px',
                backgroundColor: '#FFFFFF', overflow: 'hidden',
                boxShadow: '0 4px 14px rgba(0,0,0,0.04)'
              }}
            >
              {/* Top gradient bar */}
              <div style={{
                height: '5px',
                background: `linear-gradient(90deg, ${f.color}, ${f.color}66)`
              }} />

              <div style={{ padding: '18px' }}>
                {/* Icon + count */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '12px',
                    backgroundColor: `${f.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `1px solid ${f.color}25`
                  }}>
                    <Icon size={20} color={f.color} />
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '28px', fontWeight: '900', color: f.color, lineHeight: 1 }}>{f.unidades}</div>
                    <div style={{ fontSize: '10px', color: colores.textoMedio, fontWeight: '600' }}>Puntos Activos</div>
                  </div>
                </div>

                <h4 style={{ fontSize: '14px', fontWeight: '800', color: colores.textoClaro, margin: '0 0 6px 0', lineHeight: 1.3 }}>
                  {f.nombre}
                </h4>
                <p style={{ fontSize: '12px', color: colores.textoMedio, lineHeight: 1.5, margin: '0 0 14px 0' }}>
                  {f.desc}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
                  {f.tags.map((tag, ti) => (
                    <span key={ti} style={{
                      backgroundColor: `${f.color}10`, color: f.color,
                      fontSize: '10px', fontWeight: '700',
                      padding: '3px 9px', borderRadius: '8px',
                      border: `1px solid ${f.color}20`
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats row */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  paddingTop: '12px', borderTop: `1px solid ${colores.borde}`,
                  fontSize: '12px', color: colores.textoMedio
                }}>
                  <span>ARPU: <strong style={{ color: f.color }}>{f.arpuProm}</strong></span>
                  <span>Atracción: <strong style={{ color: f.color }}>{f.atraccion}</strong></span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
