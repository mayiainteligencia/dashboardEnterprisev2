import React, { useState, useEffect } from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell, CartesianGrid } from 'recharts';

interface ROIIniciativasModuleProps {
  onNavigate?: (section: string) => void;
}

const topKpis = [
  { label: 'ROI Total', valor: '312%', sub: 'vs 260% año anterior', color: '#10B981' },
  { label: 'Inversión', valor: '$12.8M', sub: 'MXN acumulado', color: '#3B82F6' },
  { label: 'Retorno', valor: '$39.9M', sub: 'MXN generado', color: '#8B5CF6' },
];

const iniciativas = [
  { nombre: 'SOC IA Managed', roi: 380, inversion: 2.1, retorno: 8.0, color: '#10B981' },
  { nombre: 'Data Lake Soberano', roi: 340, inversion: 3.5, retorno: 11.9, color: '#3B82F6' },
  { nombre: 'Analítica Predictiva', roi: 295, inversion: 1.8, retorno: 5.3, color: '#8B5CF6' },
  { nombre: 'GPU as a Service', roi: 270, inversion: 2.4, retorno: 6.5, color: '#F27405' },
  { nombre: 'Backup Cloud DRP', roi: 245, inversion: 3.0, retorno: 7.4, color: '#F59E0B' },
];

const chartData = [
  { mes: 'Ene', valor: 4.2 },
  { mes: 'Feb', valor: 5.1 },
  { mes: 'Mar', valor: 4.8 },
  { mes: 'Abr', valor: 6.3 },
  { mes: 'May', valor: 7.1 },
  { mes: 'Jun', valor: 8.5 },
];

const maxRoi = Math.max(...iniciativas.map(a => a.roi));

export const ROIIniciativasModule: React.FC<ROIIniciativasModuleProps> = ({ onNavigate }) => {
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
          <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: colores.textoClaro, margin: 0 }}>ROI Estimado por Iniciativas</h3>
          <p style={{ fontSize: '10px', color: colores.textoMedio, margin: 0 }}>
            Valor proyectado · <span style={{ color: '#10B981', fontWeight: 600 }}>{iniciativas.length} proyectos activos</span>
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

      {/* Layout: Chart + Areas */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '14px', flex: 1 }}>

        {/* Recharts bar */}
        <div style={{ backgroundColor: colores.fondoTerciario, borderRadius: '14px', padding: '12px' }}>
          <p style={{ fontSize: '9px', color: colores.textoMedio, margin: '0 0 8px 0', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Retorno mensual (M$)</p>
          <div style={{ height: '120px', minWidth: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={`${colores.borde}44`} vertical={false} />
                <XAxis dataKey="mes" tick={{ fontSize: 9, fill: colores.textoOscuro }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: colores.textoOscuro }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: colores.fondoSecundario, border: `1px solid ${colores.borde}`, borderRadius: '8px', fontSize: '11px', color: colores.textoClaro }}
                  cursor={{ fill: 'rgba(16,185,129,0.06)' }}
                />
                <Bar dataKey="valor" radius={[4, 4, 0, 0]}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={i === chartData.length - 1 ? '#10B981' : '#10B98125'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Áreas ROI */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ fontSize: '10px', fontWeight: '600', color: colores.textoMedio, margin: 0, textTransform: 'uppercase', letterSpacing: '0.4px' }}>ROI por iniciativa</p>
          {iniciativas.map((a, i) => (
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
      </div>

      {/* CTA */}
      <button
        onClick={() => onNavigate?.('decisionRoom')}
        style={{ width: '100%', padding: '11px 16px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #10B981, #059669)', color: 'white', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'opacity 0.2s' }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        Ver ROI Completo <ArrowRight size={15} />
      </button>
    </div>
  );
};
