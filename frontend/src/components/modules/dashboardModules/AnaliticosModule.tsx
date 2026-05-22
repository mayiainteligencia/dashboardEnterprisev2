import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';

type TabAnalitico = 'ventas' | 'clientes' | 'productos';

const tabsData: Record<TabAnalitico, {
  label: string;
  data: { mes: string; valor: number }[];
  kpis: { label: string; valor: string; tendencia: number }[];
}> = {
  ventas: {
    label: 'Ventas',
    data: [
      { mes: 'Nov', valor: 82 }, { mes: 'Dic', valor: 95 }, { mes: 'Ene', valor: 71 },
      { mes: 'Feb', valor: 88 }, { mes: 'Mar', valor: 103 }, { mes: 'Abr', valor: 118 },
    ],
    kpis: [
      { label: 'Ingresos (M$)', valor: '$118.4M', tendencia: 14.6 },
      { label: 'Ticket Prom.', valor: '$284', tendencia: 8.2 },
      { label: 'Conversión', valor: '6.8%', tendencia: 1.1 },
      { label: 'Devoluciones', valor: '1.2%', tendencia: -0.3 },
    ],
  },
  clientes: {
    label: 'Clientes',
    data: [
      { mes: 'Nov', valor: 540 }, { mes: 'Dic', valor: 620 }, { mes: 'Ene', valor: 490 },
      { mes: 'Feb', valor: 710 }, { mes: 'Mar', valor: 780 }, { mes: 'Abr', valor: 850 },
    ],
    kpis: [
      { label: 'Activos (K)', valor: '850K', tendencia: 9.1 },
      { label: 'Nuevos (K)', valor: '42K', tendencia: 12.4 },
      { label: 'Retención', valor: '78%', tendencia: 2.3 },
      { label: 'Churn rate', valor: '3.1%', tendencia: -0.8 },
    ],
  },
  productos: {
    label: 'Productos',
    data: [
      { mes: 'Nov', valor: 1240 }, { mes: 'Dic', valor: 1580 }, { mes: 'Ene', valor: 1120 },
      { mes: 'Feb', valor: 1380 }, { mes: 'Mar', valor: 1620 }, { mes: 'Abr', valor: 1940 },
    ],
    kpis: [
      { label: 'SKUs activos', valor: '1,940', tendencia: 5.2 },
      { label: 'Alta rotación', valor: '320', tendencia: 18.7 },
      { label: 'Sin stock', valor: '23', tendencia: -11.5 },
      { label: 'SKUs nuevos', valor: '85', tendencia: 42.0 },
    ],
  },
};

interface AnaliticosModuleProps {
  onNavigate?: (section: string) => void;
}

export const AnaliticosModule: React.FC<AnaliticosModuleProps> = ({ onNavigate }) => {
  const { colores } = brandingConfig;
  const [tab, setTab] = useState<TabAnalitico>('ventas');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const cfg = tabsData[tab];

  return (
    <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '24px', border: `1px solid ${colores.borde}`, padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', height: '100%' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #3B82F6, #06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <BarChart3 size={18} color="#fff" />
        </div>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: colores.textoClaro, margin: 0 }}>Analitica Comercial</h3>
          <p style={{ fontSize: '10px', color: colores.textoMedio, margin: 0 }}>
            Tendencias de negocio · <span style={{ color: '#3B82F6', fontWeight: 600 }}>Actualizado hoy</span>
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '5px' }}>
        {(Object.keys(tabsData) as TabAnalitico[]).map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{
              padding: '4px 10px', borderRadius: '20px', border: 'none', cursor: 'pointer',
              fontSize: '10px', fontWeight: '600', transition: 'all 0.2s',
              backgroundColor: tab === t ? '#3B82F6' : colores.fondoTerciario,
              color: tab === t ? '#fff' : colores.textoMedio,
            }}
          >{tabsData[t].label}</button>
        ))}
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {cfg.kpis.map((k, i) => (
          <div key={i} style={{ backgroundColor: colores.fondoTerciario, borderRadius: '12px', padding: '10px 12px' }}>
            <div style={{ fontSize: '14px', fontWeight: '800', color: colores.textoClaro }}>{k.valor}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
              <span style={{ fontSize: '9px', color: colores.textoMedio }}>{k.label}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '9px', fontWeight: '700', color: k.tendencia >= 0 ? '#10B981' : '#EF4444' }}>
                {k.tendencia >= 0 ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                {k.tendencia > 0 ? '+' : ''}{k.tendencia}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Mini bar chart */}
      <div style={{ backgroundColor: colores.fondoTerciario, borderRadius: '14px', padding: '12px', flex: 1 }}>
        <p style={{ fontSize: '9px', color: colores.textoMedio, margin: '0 0 8px 0', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Evolucion mensual</p>
        <div style={{ height: '90px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cfg.data} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
              <XAxis dataKey="mes" tick={{ fontSize: 9, fill: colores.textoOscuro }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: colores.textoOscuro }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: colores.fondoSecundario, border: `1px solid ${colores.borde}`, borderRadius: '8px', fontSize: '11px', color: colores.textoClaro }}
                cursor={{ fill: 'rgba(59,130,246,0.06)' }}
              />
              <Bar dataKey="valor" radius={[4, 4, 0, 0]}>
                {cfg.data.map((_, i) => (
                  <Cell key={i} fill={i === cfg.data.length - 1 ? '#3B82F6' : '#3B82F625'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={() => onNavigate?.('analiticos')}
        style={{ width: '100%', padding: '11px 16px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #3B82F6, #06B6D4)', color: 'white', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'opacity 0.2s' }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        Ver Analitica Completa <ArrowRight size={15} />
      </button>
    </div>
  );
};
