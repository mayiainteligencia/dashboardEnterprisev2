import React, { useState } from 'react';
import { 
  DollarSign, TrendingUp, ArrowUpRight, Activity, Info, 
  ShieldCheck, Calculator, RefreshCw, Sliders, BarChart3, LineChart as LucideLineChart
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, BarChart, Bar
} from 'recharts';
import { brandingConfig } from '../../config/branding';

interface ModuleROI {
  id: string;
  nombre: string;
  indicador: string;
  variableLabel: string;
  val: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  baseSavingsPerUnit: number;
  investment: number;
  estado: string;
  color: string;
}

const initialModules: ModuleROI[] = [
  { 
    id: 'demanda', 
    nombre: 'Demand Sensing', 
    indicador: 'Precisión del Forecast', 
    variableLabel: 'Mejora en Precisión',
    val: 12, 
    min: 0, 
    max: 30, 
    step: 1, 
    unit: '%', 
    baseSavingsPerUnit: 150000, 
    investment: 420000, 
    estado: 'Activo - Generando Valor',
    color: '#1E40AF' 
  },
  { 
    id: 'copilot-chef', 
    nombre: 'Chef Copilot', 
    indicador: 'Eficiencia en Desarrollo', 
    variableLabel: 'Eficiencia en Recetarios',
    val: 25, 
    min: 0, 
    max: 50, 
    step: 5, 
    unit: '%', 
    baseSavingsPerUnit: 80000, 
    investment: 280000, 
    estado: 'Activo - Generando Valor',
    color: '#D31245' 
  },
  { 
    id: 'academia', 
    nombre: 'Academia Rich', 
    indicador: 'Adopción IA Ventas', 
    variableLabel: 'Personal Certificado',
    val: 88, 
    min: 0, 
    max: 100, 
    step: 2, 
    unit: '%', 
    baseSavingsPerUnit: 25000, 
    investment: 320000, 
    estado: 'Activo - En Onboarding',
    color: '#EA580C' 
  },
  { 
    id: 'ventas-b2b', 
    nombre: 'Ventas Foodservice', 
    indicador: 'Efectividad Comercial', 
    variableLabel: 'Conversión de Ventas',
    val: 15, 
    min: 0, 
    max: 40, 
    step: 1, 
    unit: '%', 
    baseSavingsPerUnit: 140000, 
    investment: 480000, 
    estado: 'Piloto en Cierre',
    color: '#10B981' 
  },
  { 
    id: 'distribuidores', 
    nombre: 'Distribuidor 360 AI', 
    indicador: 'Optimización de Rutas', 
    variableLabel: 'Eficiencia Logística',
    val: 10, 
    min: 0, 
    max: 30, 
    step: 1, 
    unit: '%', 
    baseSavingsPerUnit: 160000, 
    investment: 520000, 
    estado: 'Piloto Activo',
    color: '#F59E0B' 
  },
  { 
    id: 'ecommerce-mkt', 
    nombre: 'E-commerce & Mkt', 
    indicador: 'Margen Dinámico de Precios', 
    variableLabel: 'Captura de Margen',
    val: 8, 
    min: 0, 
    max: 20, 
    step: 1, 
    unit: '%', 
    baseSavingsPerUnit: 180000, 
    investment: 380000, 
    estado: 'Activo - Generando Valor',
    color: '#EF4444' 
  }
];

export const RetornoInversion: React.FC = () => {
  const { colores } = brandingConfig;
  const [modules, setModules] = useState<ModuleROI[]>(initialModules);
  const [activeTab, setActiveTab] = useState<'cumulado' | 'modulos'>('cumulado');

  const handleSliderChange = (id: string, value: number) => {
    setModules(prev => prev.map(m => m.id === id ? { ...m, val: value } : m));
  };

  const resetValues = () => {
    setModules(initialModules);
  };

  // Calculations
  const calculatedModules = modules.map(m => {
    const savings = m.val * m.baseSavingsPerUnit;
    const netROI = m.investment > 0 ? ((savings - m.investment) / m.investment) * 100 : 0;
    return {
      ...m,
      savings,
      netROI
    };
  });

  const totalInvestment = calculatedModules.reduce((sum, m) => sum + m.investment, 0);
  const totalSavings = calculatedModules.reduce((sum, m) => sum + m.savings, 0);
  const netBenefit = totalSavings - totalInvestment;
  const totalROI = totalInvestment > 0 ? (totalSavings / totalInvestment) : 0;
  const totalROIPercent = totalInvestment > 0 ? ((totalSavings - totalInvestment) / totalInvestment) * 100 : 0;
  
  // Payback Period in months
  const paybackPeriod = totalSavings > 0 ? (totalInvestment / (totalSavings / 12)) : 0;

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Generate 12-month cumulative data for Recharts AreaChart
  const monthlyData = Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    // Initial investment setup fee is 40%, rest is linear over 12 months
    const cumulativeInvestment = (totalInvestment * 0.40) + ((totalInvestment * 0.60) / 12) * month;
    const cumulativeSavings = (totalSavings / 12) * month;
    return {
      name: `Mes ${month}`,
      Inversión: Math.round(cumulativeInvestment),
      Ahorros: Math.round(cumulativeSavings),
      BeneficioNeto: Math.round(cumulativeSavings - cumulativeInvestment)
    };
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Module Header */}
      <div style={{
        background: '#FAFAFA',
        border: '1px solid var(--border)',
        borderRadius: '12px', padding: '20px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <DollarSign size={18} color="#10B981" />
            <span style={{ fontSize: '11px', color: '#10B981', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              MAYIA Business Value — Retorno sobre Inversión de IA
            </span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '750', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
            Monitor & Simulador de Retorno Financiero
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Evalúa el beneficio económico consolidado y por módulo. Ajusta los indicadores de desempeño para predecir el impacto en inventarios, ventas y R&D.
          </p>
        </div>
        <button
          onClick={resetValues}
          className="btn-secondary"
          style={{
            borderRadius: '8px',
            padding: '10px 16px',
            fontSize: '13px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: '#FFFFFF',
            border: '1px solid var(--border)',
            cursor: 'pointer'
          }}
        >
          <RefreshCw size={14} /> Reestablecer Simulador
        </button>
      </div>

      {/* Grid of stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {[
          { label: 'Retorno de Inversión', val: `${totalROI.toFixed(1)}x`, sub: `${totalROIPercent.toFixed(0)}% de ROI Neto`, icon: TrendingUp, col: '#10B981', badge: 'Excelente' },
          { label: 'Ahorro Anualizado', val: formatCurrency(totalSavings), sub: `Neto: ${formatCurrency(netBenefit)}`, icon: DollarSign, col: '#1E40AF', badge: 'Vigente' },
          { label: 'Inversión Total', val: formatCurrency(totalInvestment), sub: 'Suscripción & Capacitación', icon: Calculator, col: '#D31245', badge: 'Asignado' },
          { label: 'Recuperación (Payback)', val: `${paybackPeriod.toFixed(1)} meses`, sub: 'Punto de equilibrio', icon: ShieldCheck, col: '#EA580C', badge: 'Óptimo' },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)', position: 'relative' }}>
              <span className="badge" style={{ position: 'absolute', top: '16px', right: '20px', fontSize: '9px', fontWeight: '700', padding: '2px 8px', borderRadius: '6px', background: `${s.col}12`, color: s.col }}>
                {s.badge}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: `${s.col}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={18} color={s.col} />
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
              <div style={{ marginTop: '4px' }}>
                <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', lineHeight: 1.1 }}>{s.val}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px', fontWeight: '500' }}>{s.sub}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Row 2: Sliders on the left (40%) / Charts on the right (60%) */}
      <div className="row2" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(320px, 1.8fr)', gap: '20px' }}>
        
        {/* Sliders panel */}
        <div style={{ 
          background: 'var(--bg-card)', 
          border: '1px solid var(--border)', 
          borderRadius: '12px', 
          padding: '24px', 
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
            <Sliders size={18} color={colores.primario} />
            <h3 style={{ fontSize: '15px', fontWeight: '750', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', margin: 0 }}>
              Simulador de Efectividad (KPIs)
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {calculatedModules.map(m => (
              <div key={m.id} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: m.color }} />
                    {m.nombre}
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: m.color, background: `${m.color}08`, padding: '2px 8px', borderRadius: '6px', fontFamily: 'JetBrains Mono, monospace' }}>
                    {m.val}{m.unit}
                  </span>
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '600' }}>
                  {m.variableLabel} — Ahorro: {formatCurrency(m.savings)}/año
                </div>
                <input
                  type="range"
                  min={m.min}
                  max={m.max}
                  step={m.step}
                  value={m.val}
                  onChange={(e) => handleSliderChange(m.id, Number(e.target.value))}
                  style={{
                    width: '100%',
                    accentColor: m.color,
                    height: '6px',
                    borderRadius: '3px',
                    outline: 'none',
                    cursor: 'pointer',
                    background: '#E2E8F0'
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Charts panel */}
        <div style={{ 
          background: 'var(--bg-card)', 
          border: '1px solid var(--border)', 
          borderRadius: '12px', 
          padding: '24px', 
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          {/* Tabs header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart3 size={18} color={colores.secundario} />
              <h3 style={{ fontSize: '15px', fontWeight: '750', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', margin: 0 }}>
                Visualización de Retorno
              </h3>
            </div>
            
            <div style={{ display: 'flex', background: '#F1F5F9', padding: '2px', borderRadius: '8px' }}>
              <button
                onClick={() => setActiveTab('cumulado')}
                style={{
                  padding: '6px 12px',
                  fontSize: '11px',
                  fontWeight: '700',
                  borderRadius: '6px',
                  border: 'none',
                  background: activeTab === 'cumulado' ? '#FFFFFF' : 'transparent',
                  color: activeTab === 'cumulado' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  boxShadow: activeTab === 'cumulado' ? 'var(--shadow-sm)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Inversión vs Ahorros Acumulados
              </button>
              <button
                onClick={() => setActiveTab('modulos')}
                style={{
                  padding: '6px 12px',
                  fontSize: '11px',
                  fontWeight: '700',
                  borderRadius: '6px',
                  border: 'none',
                  background: activeTab === 'modulos' ? '#FFFFFF' : 'transparent',
                  color: activeTab === 'modulos' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  boxShadow: activeTab === 'modulos' ? 'var(--shadow-sm)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Retorno por Módulo
              </button>
            </div>
          </div>

          {/* Chart content */}
          <div style={{ flex: 1, minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {activeTab === 'cumulado' ? (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAhorros" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.0}/>
                    </linearGradient>
                    <linearGradient id="colorInversion" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D31245" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#D31245" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} fontWeight="600" />
                  <YAxis 
                    stroke="#94A3B8" 
                    fontSize={10} 
                    fontWeight="600"
                    tickFormatter={(tick) => `$${(tick / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', border: 'none', borderRadius: '8px', padding: '10px' }}
                    labelStyle={{ color: '#94A3B8', fontSize: '11px', fontWeight: '700' }}
                    itemStyle={{ color: '#FFFFFF', fontSize: '11px', fontWeight: '600' }}
                    formatter={(value) => [formatCurrency(value as number), '']}
                  />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px', fontWeight: '600' }} />
                  <Area type="monotone" dataKey="Ahorros" stroke="#10B981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAhorros)" name="Ahorros Acumulados" />
                  <Area type="monotone" dataKey="Inversión" stroke="#D31245" strokeWidth={1.5} fillOpacity={1} fill="url(#colorInversion)" name="Inversión Acumulada" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={calculatedModules} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="nombre" stroke="#94A3B8" fontSize={9} fontWeight="600" />
                  <YAxis 
                    stroke="#94A3B8" 
                    fontSize={10} 
                    fontWeight="600" 
                    tickFormatter={(tick) => `$${(tick / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', border: 'none', borderRadius: '8px', padding: '10px' }}
                    labelStyle={{ color: '#94A3B8', fontSize: '11px', fontWeight: '700' }}
                    itemStyle={{ color: '#FFFFFF', fontSize: '11px', fontWeight: '600' }}
                    formatter={(value) => [formatCurrency(value as number), '']}
                  />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px', fontWeight: '600' }} />
                  <Bar dataKey="investment" fill="#94A3B8" radius={[4, 4, 0, 0]} name="Inversión Asignada" />
                  <Bar dataKey="savings" fill="#1E40AF" radius={[4, 4, 0, 0]} name="Ahorro Generado" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          <div style={{ 
            marginTop: '12px', 
            background: 'rgba(30,64,175,0.03)', 
            border: '1px solid rgba(30,64,175,0.08)',
            borderRadius: '10px', 
            padding: '10px 14px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px' 
          }}>
            <Info size={14} color="#1E40AF" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '11px', color: '#1E40AF', fontWeight: '600', lineHeight: 1.4 }}>
              {activeTab === 'cumulado' 
                ? `Punto de Equilibrio: La inversión se recupera completamente en el Mes ${Math.ceil(paybackPeriod)} gracias a los ahorros consolidados.` 
                : 'La relación inversión/ahorro por módulo permite evaluar qué iniciativas de IA tienen mayor tracción financiera.'}
            </span>
          </div>
        </div>
      </div>

      {/* Table: Breakdown of ROI */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', marginBottom: '18px' }}>
          Desglose y Estado de Implementación Financiera
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)' }}>
                <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Módulo</th>
                <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Indicador Clave</th>
                <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Simulación</th>
                <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Inversión Anual</th>
                <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Beneficio/Ahorro Anual</th>
                <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>ROI Neto</th>
                <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Estado Operativo</th>
              </tr>
            </thead>
            <tbody>
              {calculatedModules.map((m, i) => (
                <tr 
                  key={m.id} 
                  style={{ 
                    borderBottom: '1px solid var(--border)',
                    backgroundColor: i % 2 === 0 ? 'transparent' : '#FAFAFA',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F1F5F9'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = i % 2 === 0 ? 'transparent' : '#FAFAFA'; }}
                >
                  <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: m.color }} />
                      {m.nombre}
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: 'var(--text-secondary)' }}>{m.indicador}</td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: '800', color: m.color, fontFamily: 'JetBrains Mono, monospace' }}>
                    {m.val}{m.unit}
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: 'var(--text-primary)', fontWeight: '600' }}>{formatCurrency(m.investment)}</td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: '#10B981', fontWeight: '700' }}>{formatCurrency(m.savings)}</td>
                  <td style={{ padding: '14px 16px', fontSize: '13px' }}>
                    <span style={{ 
                      fontSize: '11px', 
                      fontWeight: '700', 
                      padding: '2px 8px', 
                      borderRadius: '6px', 
                      background: m.netROI >= 100 ? 'rgba(16,185,129,0.1)' : 'rgba(234,88,12,0.1)', 
                      color: m.netROI >= 100 ? '#10B981' : '#EA580C',
                      fontFamily: 'JetBrains Mono, monospace'
                    }}>
                      {m.netROI >= 0 ? '+' : ''}{m.netROI.toFixed(0)}%
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '12px' }}>
                    <span style={{
                      fontWeight: '700',
                      color: m.estado.includes('Activo') ? '#10B981' : '#F59E0B',
                      background: m.estado.includes('Activo') ? 'rgba(16,185,129,0.06)' : 'rgba(245,158,11,0.06)',
                      padding: '3px 8px',
                      borderRadius: '6px',
                    }}>
                      {m.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
};
