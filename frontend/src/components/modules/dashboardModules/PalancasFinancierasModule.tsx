import React, { useEffect, useState } from 'react';
import { Layers, Target, ArrowRight, BarChart3, RefreshCw, DollarSign, ShoppingBag, PieChart } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

type EstadoPalanca = 'optimo' | 'alerta' | 'critico';

interface Palanca {
  nombre: string;
  icono: React.ReactNode;
  actual: string;
  meta: string;
  delta: number;
  estado: EstadoPalanca;
  descripcion: string;
  progreso: number;
}

const estadoCfg: Record<EstadoPalanca, { color: string; bg: string; label: string }> = {
  optimo:  { color: '#10B981', bg: '#10B98115', label: 'Optimo'  },
  alerta:  { color: '#F59E0B', bg: '#F59E0B15', label: 'Alerta'  },
  critico: { color: '#EF4444', bg: '#EF444415', label: 'Critico' },
};

const palancas: Palanca[] = [
  {
    nombre: 'Margen Bruto',
    icono: <DollarSign size={14} />,
    actual: '32.4%', meta: '35.0%', delta: -7.4, estado: 'alerta',
    descripcion: 'Presion en precios genericos',
    progreso: 80,
  },
  {
    nombre: 'Rotacion de Inventario',
    icono: <RefreshCw size={14} />,
    actual: '8.2x', meta: '9.0x', delta: -8.9, estado: 'alerta',
    descripcion: 'Mejora vs año anterior +1.4x',
    progreso: 91,
  },
  {
    nombre: 'Costo Operativo',
    icono: <BarChart3 size={14} />,
    actual: '18.6%', meta: '16.0%', delta: 16.3, estado: 'critico',
    descripcion: 'Por encima del objetivo',
    progreso: 86,
  },
  {
    nombre: 'Ticket Promedio',
    icono: <ShoppingBag size={14} />,
    actual: '$284', meta: '$310', delta: -8.4, estado: 'alerta',
    descripcion: 'Impulsado por cronico+agudo',
    progreso: 92,
  },
  {
    nombre: 'Participacion de Mercado',
    icono: <PieChart size={14} />,
    actual: '23.1%', meta: '25.0%', delta: -7.6, estado: 'optimo',
    descripcion: 'Crecimiento sostenido +1.8pp',
    progreso: 92,
  },
];

interface PalancasFinancierasModuleProps {
  onNavigate?: (section: string) => void;
}

export const PalancasFinancierasModule: React.FC<PalancasFinancierasModuleProps> = ({ onNavigate }) => {
  const { colores } = brandingConfig;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '24px', border: `1px solid ${colores.borde}`, padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', height: '100%' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #F27405, #F59E0B)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Layers size={18} color="#fff" />
        </div>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: colores.textoClaro, margin: 0 }}>5 Palancas Financieras</h3>
          <p style={{ fontSize: '10px', color: colores.textoMedio, margin: 0 }}>
            Indicadores clave · <span style={{ color: '#F27405', fontWeight: 600 }}>3 en monitoreo</span>
          </p>
        </div>
      </div>

      {/* Palancas */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        {palancas.map((p, i) => {
          const cfg = estadoCfg[p.estado];
          return (
            <div key={i} style={{ backgroundColor: colores.fondoTerciario, borderRadius: '12px', padding: '10px 12px', borderLeft: `3px solid ${cfg.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: cfg.color }}>{p.icono}</span>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: colores.textoClaro }}>{p.nombre}</span>
                </div>
                <span style={{ fontSize: '9px', fontWeight: '700', color: cfg.color, background: cfg.bg, padding: '2px 7px', borderRadius: '6px' }}>{cfg.label}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                <span style={{ fontSize: '13px', fontWeight: '800', color: colores.textoClaro }}>{p.actual}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <Target size={9} color={colores.textoOscuro} />
                  <span style={{ fontSize: '10px', color: colores.textoMedio }}>{p.meta}</span>
                  <span style={{ fontSize: '10px', fontWeight: '700', color: p.delta <= 0 ? '#EF4444' : '#10B981', marginLeft: '4px' }}>
                    {p.delta > 0 ? '+' : ''}{p.delta}%
                  </span>
                </div>
              </div>
              <div style={{ height: '4px', backgroundColor: colores.borde, borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${p.progreso}%`, backgroundColor: cfg.color, borderRadius: '2px' }} />
              </div>
              {!isMobile && (
                <div style={{ fontSize: '9px', color: colores.textoMedio, marginTop: '4px' }}>{p.descripcion}</div>
              )}
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <button
        onClick={() => onNavigate?.('finanzas')}
        style={{ width: '100%', padding: '11px 16px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #F27405, #F59E0B)', color: 'white', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'opacity 0.2s' }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        Ver Analisis Financiero Completo <ArrowRight size={15} />
      </button>
    </div>
  );
};
