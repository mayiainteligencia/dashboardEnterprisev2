import React, { useState, useEffect } from 'react';
import { DollarSign, BarChart2, TrendingDown, TrendingUp, AlertCircle, Sparkles, PieChart, Activity } from 'lucide-react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area } from 'recharts';
import { brandingConfig } from '../../../config/branding';

const { colores } = brandingConfig;

const tema = {
  acento: '#1E40AF',
  acentoOscuro: '#0F172A',
  acentoSuave: '#DBEAFE',
  sobreAcento: '#FFFFFF',
};

const gastoMensual = [
  { mes: 'Ene', combustible: 1200, mantenimiento: 300, peajes: 150, viaticos: 100, costoKm: 19.5 },
  { mes: 'Feb', combustible: 1150, mantenimiento: 320, peajes: 140, viaticos: 95, costoKm: 19.2 },
  { mes: 'Mar', combustible: 1300, mantenimiento: 280, peajes: 160, viaticos: 110, costoKm: 19.8 },
  { mes: 'Abr', combustible: 1050, mantenimiento: 450, peajes: 145, viaticos: 90, costoKm: 18.9 },
  { mes: 'May', combustible: 980, mantenimiento: 250, peajes: 130, viaticos: 85, costoKm: 18.4 },
];

const anomalias = [
  { id: 'AN-001', concepto: 'Carga Combustible Anómala', vehiculo: 'VHL-305', monto: '$4,500', riesgo: 'Alto', status: 'En revisión' },
  { id: 'AN-002', concepto: 'Exceso Peajes vs Ruta', vehiculo: 'VHL-112', monto: '$850', riesgo: 'Medio', status: 'Aprobado IA' },
  { id: 'AN-003', concepto: 'Mantenimiento Duplicado', vehiculo: 'VHL-884', monto: '$12,300', riesgo: 'Alto', status: 'Rechazado IA' },
];

const useAnimations = () => {
  useEffect(() => {
    const id = 'module-animations-gasto';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
      .animate-fade-up { animation: fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      .hover-lift { transition: transform 0.2s ease, box-shadow 0.2s ease; }
      .hover-lift:hover { transform: translateY(-3px); box-shadow: 0 6px 20px rgba(0,0,0,0.08); }
    `;
    document.head.appendChild(style);
  }, []);
};

export const FleetGasto: React.FC = () => {
  useAnimations();
  const [activeTab, setActiveTab] = useState('dashboard');

  const kpis = [
    { label: 'GASTO MENSUAL (K)', value: '$2,450', icon: DollarSign, trend: '-3.2% vs mes ant.', trendUp: true },
    { label: 'COSTO POR KM', value: '$18.40', icon: Activity, trend: '-$0.50', trendUp: true },
    { label: 'AHORRO IA YTD', value: '12.3%', icon: TrendingDown, trend: '$850K MXN', trendUp: true, color: colores.exito },
    { label: 'DESVIACIÓN PRESUP.', value: '+3.2%', icon: AlertCircle, trend: 'Alerta Leve', trendUp: false, color: colores.advertencia },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* HEADER */}
      <div className="animate-fade-up" style={{ background: '#FFFFFF', borderRadius: '20px', border: `1px solid ${colores.borde}`, borderLeft: `6px solid ${tema.acento}`, padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: `linear-gradient(135deg, ${tema.acento} 0%, ${tema.acentoOscuro} 100%)`, width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PieChart size={32} color={tema.sobreAcento} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px', color: colores.textoClaro, fontWeight: 700 }}>IA de Gasto Operativo</h1>
            <p style={{ margin: '4px 0 0 0', color: colores.textoMedio, fontSize: '15px' }}>Análisis financiero, control de combustible y detección de anomalías.</p>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {kpis.map((kpi, idx) => (
          <div key={idx} className="hover-lift animate-fade-up" style={{ animationDelay: `${idx * 0.1}s`, background: '#FFFFFF', borderRadius: '18px', padding: '20px', border: `1px solid ${colores.borde}`, borderTop: `4px solid ${kpi.color || tema.acento}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: colores.textoMedio }}>{kpi.label}</span>
              <div style={{ background: kpi.color ? `${kpi.color}15` : tema.acentoSuave, padding: '8px', borderRadius: '10px' }}>
                <kpi.icon size={18} color={kpi.color || tema.acento} />
              </div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: colores.textoClaro, marginBottom: '8px' }}>{kpi.value}</div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: kpi.trendUp ? colores.exito : colores.peligro }}>
              {kpi.trend}
            </div>
          </div>
        ))}
      </div>

      {/* AI INSIGHT */}
      <div className="animate-fade-up" style={{ animationDelay: '0.4s', background: `linear-gradient(110deg, ${tema.acento}08 0%, transparent 60%)`, borderRadius: '18px', border: `1px solid ${tema.acento}30`, padding: '20px', display: 'flex', gap: '16px' }}>
        <div style={{ background: tema.acento, padding: '10px', borderRadius: '12px' }}>
          <Sparkles size={24} color={tema.sobreAcento} />
        </div>
        <div>
          <h3 style={{ margin: '0 0 6px 0', color: tema.acentoOscuro, fontSize: '16px', fontWeight: 700 }}>Insight de MAYIA · Analista Financiero</h3>
          <p style={{ margin: 0, color: colores.textoMedio, fontSize: '14px', lineHeight: 1.5 }}>
            Detectada <strong>carga de combustible anómala</strong> en VHL-305 (750L facturados vs 500L capacidad de tanque) a las 02:00 AM. He bloqueado el pago de la factura en el ERP y generado una alerta crítica al supervisor de base para auditoría inmediata.
          </p>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', gap: '32px', borderBottom: `1px solid ${colores.borde}` }}>
        {['Dashboard', 'Anomalías IA'].map((tab) => (
          <div key={tab} onClick={() => setActiveTab(tab.toLowerCase())} style={{ padding: '12px 4px', cursor: 'pointer', fontSize: '15px', fontWeight: 600, color: activeTab === tab.toLowerCase() ? tema.acento : colores.textoMedio, borderBottom: activeTab === tab.toLowerCase() ? `3px solid ${tema.acento}` : '3px solid transparent' }}>
            {tab}
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div>
        {activeTab === 'dashboard' && (
          <div style={{ background: '#FFF', borderRadius: '20px', padding: '24px', border: `1px solid ${colores.borde}` }}>
            <h4 style={{ margin: '0 0 20px 0', fontSize: '14px', color: colores.textoMedio, fontWeight: 700 }}>DESGLOSE DE GASTOS Y COSTO/KM ($ Miles)</h4>
            <div style={{ height: '350px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={gastoMensual} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colores.borde} />
                  <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colores.textoOscuro }} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colores.textoOscuro }} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colores.textoOscuro }} domain={[15, 22]} />
                  <Tooltip cursor={{ fill: colores.fondoSecundario }} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="combustible" name="Combustible" stackId="a" fill={tema.acento} />
                  <Bar yAxisId="left" dataKey="mantenimiento" name="Mantenimiento" stackId="a" fill={colores.advertencia} />
                  <Bar yAxisId="left" dataKey="peajes" name="Peajes/Viáticos" stackId="a" fill={colores.textoMedio} />
                  <Line yAxisId="right" type="monotone" dataKey="costoKm" name="Costo por Km ($)" stroke={colores.peligro} strokeWidth={3} dot={{ r: 4 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'anomalías ia' && (
          <div style={{ background: '#FFF', borderRadius: '20px', border: `1px solid ${colores.borde}` }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: colores.fondoSecundario }}>
                  <th style={{ padding: '16px', fontSize: '12px', fontWeight: 600, color: colores.textoMedio }}>ID / CONCEPTO</th>
                  <th style={{ padding: '16px', fontSize: '12px', fontWeight: 600, color: colores.textoMedio }}>VEHÍCULO</th>
                  <th style={{ padding: '16px', fontSize: '12px', fontWeight: 600, color: colores.textoMedio }}>MONTO INVOLUCRADO</th>
                  <th style={{ padding: '16px', fontSize: '12px', fontWeight: 600, color: colores.textoMedio }}>ACCIÓN / STATUS IA</th>
                </tr>
              </thead>
              <tbody>
                {anomalias.map((a, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${colores.borde}` }}>
                    <td style={{ padding: '16px' }}>
                      <div style={{ fontWeight: 600, color: colores.textoClaro }}>{a.concepto}</div>
                      <div style={{ fontSize: '12px', color: colores.textoOscuro }}>{a.id}</div>
                    </td>
                    <td style={{ padding: '16px', color: colores.textoMedio, fontWeight: 600 }}>{a.vehiculo}</td>
                    <td style={{ padding: '16px', fontSize: '15px', fontWeight: 700, color: a.riesgo === 'Alto' ? colores.peligro : colores.textoClaro }}>
                      {a.monto}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ padding: '4px 10px', background: a.status.includes('Rechazado') ? '#FEE2E2' : a.status.includes('Aprobado') ? '#D1FAE5' : '#FEF3C7', color: a.status.includes('Rechazado') ? '#DC2626' : a.status.includes('Aprobado') ? '#047857' : '#D97706', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
