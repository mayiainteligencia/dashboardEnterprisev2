import React, { useEffect, useState } from 'react';
import { LayoutGrid, Layers, Box, BarChart3 } from 'lucide-react';
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
  const u1 = useCountUp(54, 1200, 200);
  const u2 = useCountUp(46, 1100, 350);
  const u3 = useCountUp(20, 1000, 500);

  const formatos = [
    {
      nombre: 'Isla Comercial Mall (4×3m)', unidades: u1, raw: 54,
      arpuProm: '$580 MXN', arpuNum: 580, atraccion: '32.4%',
      desc: 'Isla de alto impacto visual con tótem interactivo y espacio de demostración izzi tv+.',
      color: '#E3067A', icon: Box,
      tags: ['Alto Impacto', 'izzi tv+', 'Tótem IA'],
    },
    {
      nombre: 'Centro de Atención izzi Oficial', unidades: u2, raw: 46,
      arpuProm: '$640 MXN', arpuNum: 640, atraccion: '35.8%',
      desc: 'Centro de atención y ventas completo con módulos de servicio, portabilidad izzi móvil y contratación.',
      color: '#0090D0', icon: LayoutGrid,
      tags: ['Centro Oficial', 'Atención & Ventas', 'ARPU Alto'],
    },
    {
      nombre: 'Módulo Express / Corner', unidades: u3, raw: 20,
      arpuProm: '$510 MXN', arpuNum: 510, atraccion: '28.2%',
      desc: 'Mobiliario compacto de 2×1.5m para centros comerciales y tiendas de autoservicio.',
      color: '#FF6C07', icon: Layers,
      tags: ['Express', 'Alto Tráfico', 'Fácil Setup'],
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
            background: 'linear-gradient(135deg, #FF6C0722, #FF6C0711)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid #FF6C0730'
          }}>
            <LayoutGrid size={20} color="#FF6C07" />
          </div>
          Diseños y Mobiliario Retail Innova izzi
        </h2>
        <p style={{ fontSize: '13px', color: colores.textoMedio, marginTop: '6px', lineHeight: 1.5 }}>
          Gestión de formatos físicos de Centros de Atención izzi, islas y corners, evaluando su rendimiento por metro cuadrado.
        </p>
      </div>

      {/* Summary strip */}
      <div className="animate-slide-up delay-1" style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '28px'
      }}>
        <div style={{ backgroundColor: '#FDF7FA', border: '1px solid #F8D8E6', borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', color: '#E3067A', marginBottom: '4px', textTransform: 'uppercase' }}>Formatos Activos</div>
          <div style={{ fontSize: '28px', fontWeight: '900', color: '#E3067A' }}>{totalUnits}</div>
          <div style={{ fontSize: '11px', color: colores.textoMedio }}>Puntos Nacionales</div>
        </div>
        <div style={{ backgroundColor: '#E6F4FB', border: '1px solid #BCE3F7', borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', color: '#0090D0', marginBottom: '4px', textTransform: 'uppercase' }}>ARPU Promedio</div>
          <div style={{ fontSize: '28px', fontWeight: '900', color: '#0090D0' }}>$576</div>
          <div style={{ fontSize: '11px', color: colores.textoMedio }}>MXN / mes</div>
        </div>
        <div style={{ backgroundColor: '#FFF0E6', border: '1px solid #FCD3B8', borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', color: '#FF6C07', marginBottom: '4px', textTransform: 'uppercase' }}>Atracción Prom.</div>
          <div style={{ fontSize: '28px', fontWeight: '900', color: '#FF6C07' }}>32.1%</div>
          <div style={{ fontSize: '11px', color: colores.textoMedio }}>Stop Rate Media</div>
        </div>
      </div>

      {/* ARPU Comparison */}
      <div className="animate-slide-up delay-2" style={{
        backgroundColor: '#FAFAFA', border: `1px solid ${colores.borde}`,
        borderRadius: '14px', padding: '18px 20px', marginBottom: '24px'
      }}>
        <div style={{ fontSize: '13px', fontWeight: '800', color: colores.primario, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BarChart3 size={15} color="#E3067A" /> Comparativo ARPU por Formato
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
