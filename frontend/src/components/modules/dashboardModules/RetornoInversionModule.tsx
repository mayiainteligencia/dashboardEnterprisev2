import React, { useEffect, useState } from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

const topKpis = [
  { label: 'ROI Total', valor: '284%', sub: 'vs 240% año anterior', color: '#10B981' },
  { label: 'Inversion', valor: '$48.2M', sub: 'MXN acumulado', color: '#3B82F6' },
  { label: 'Retorno', valor: '$136.9M', sub: 'MXN generado', color: '#F27405' },
];

const areas = [
  { nombre: 'Optimizacion de Stock', inversion: 8.5, retorno: 28.9, roi: 340, color: '#10B981' },
  { nombre: 'Marketing Digital', inversion: 12.0, retorno: 38.4, roi: 320, color: '#3B82F6' },
  { nombre: 'Plataforma Digital', inversion: 5.2, retorno: 14.8, roi: 285, color: '#8B5CF6' },
  { nombre: 'Expansion Sucursales', inversion: 18.0, retorno: 45.2, roi: 251, color: '#F27405' },
  { nombre: 'Capacitacion', inversion: 4.5, retorno: 9.6, roi: 213, color: '#F59E0B' },
];

const maxRoi = Math.max(...areas.map(a => a.roi));

interface RetornoInversionModuleProps {
  onNavigate?: (section: string) => void;
}

export const RetornoInversionModule: React.FC<RetornoInversionModuleProps> = ({ onNavigate }) => {
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
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #10B981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <TrendingUp size={18} color="#fff" />
        </div>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: colores.textoClaro, margin: 0 }}>Retorno de Inversion</h3>
          <p style={{ fontSize: '10px', color: colores.textoMedio, margin: 0 }}>
            Analisis ROI por area · <span style={{ color: '#10B981', fontWeight: 600 }}>5 iniciativas</span>
          </p>
        </div>
      </div>

      {/* Top KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
        {topKpis.map((k, i) => (
          <div key={i} style={{ backgroundColor: colores.fondoTerciario, borderRadius: '12px', padding: '10px 8px', textAlign: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: '800', color: k.color }}>{k.valor}</div>
            <div style={{ fontSize: '9px', fontWeight: '700', color: colores.textoClaro, marginTop: '2px' }}>{k.label}</div>
            <div style={{ fontSize: '8px', color: colores.textoMedio, marginTop: '1px' }}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Areas ROI */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        <p style={{ fontSize: '10px', fontWeight: '600', color: colores.textoMedio, margin: 0, textTransform: 'uppercase', letterSpacing: '0.4px' }}>ROI por area de inversion</p>
        {areas.map((a, i) => (
          <div key={i} style={{ backgroundColor: colores.fondoTerciario, borderRadius: '12px', padding: '10px 12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: '600', color: colores.textoClaro }}>{a.nombre}</span>
              <span style={{ fontSize: '12px', fontWeight: '800', color: a.color }}>{a.roi}%</span>
            </div>
            <div style={{ height: '5px', backgroundColor: colores.borde, borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(a.roi / maxRoi) * 100}%`, backgroundColor: a.color, borderRadius: '3px', transition: 'width 0.6s ease' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
              <span style={{ fontSize: '9px', color: colores.textoMedio }}>Inv. ${a.inversion}M</span>
              <span style={{ fontSize: '9px', color: colores.textoMedio }}>Ret. ${a.retorno}M</span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={() => onNavigate?.('finanzas')}
        style={{ width: '100%', padding: '11px 16px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #10B981, #059669)', color: 'white', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'opacity 0.2s' }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        Ver Analisis Financiero <ArrowRight size={15} />
      </button>
    </div>
  );
};
