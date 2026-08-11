import React, { useState, useEffect } from 'react';
import { Wrench, Calendar, DollarSign, Activity, Sparkles, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { brandingConfig } from '../../../config/branding';

const { colores } = brandingConfig;

const tema = {
  acento: '#1E40AF',
  acentoOscuro: '#0F172A',
  acentoSuave: '#DBEAFE',
  sobreAcento: '#FFFFFF',
};

const prediccionData = [
  { dia: '1', motor: 2, frenos: 1, llantas: 0 },
  { dia: '5', motor: 3, frenos: 2, llantas: 1 },
  { dia: '10', motor: 5, frenos: 3, llantas: 2 },
  { dia: '15', motor: 8, frenos: 5, llantas: 4 },
  { dia: '20', motor: 12, frenos: 8, llantas: 6 },
  { dia: '25', motor: 15, frenos: 12, llantas: 9 },
  { dia: '30', motor: 20, frenos: 15, llantas: 12 },
];

const costosData = [
  { mes: 'Ene', preventivo: 450, correctivo: 800 },
  { mes: 'Feb', preventivo: 500, correctivo: 750 },
  { mes: 'Mar', preventivo: 650, correctivo: 500 },
  { mes: 'Abr', preventivo: 700, correctivo: 350 },
  { mes: 'May', preventivo: 850, correctivo: 200 },
];

const vehiculosMant = [
  { id: 'VHL-412', tipo: 'Tractocamión', salud: 85, proxMant: '12 May, 2024', critico: 'Batería (15%)' },
  { id: 'VHL-329', tipo: 'Rabón', salud: 42, proxMant: 'Hoy', critico: 'Frenos (92% desgaste)' },
  { id: 'VHL-884', tipo: 'Camioneta 3.5T', salud: 94, proxMant: '28 May, 2024', critico: 'Ninguno' },
  { id: 'VHL-105', tipo: 'Tractocamión', salud: 67, proxMant: '18 May, 2024', critico: 'Aceite Motor' },
];

const useAnimations = () => {
  useEffect(() => {
    const id = 'module-animations-mant';
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

export const FleetMantenimiento: React.FC = () => {
  useAnimations();
  const [activeTab, setActiveTab] = useState('predicciones ia');

  const kpis = [
    { label: 'EN MANTENIMIENTO', value: '24', icon: Wrench, trend: '-2 vs ayer', trendUp: true },
    { label: 'FALLOS PREDICHOS 30D', value: '8', icon: Activity, trend: '-45% (IA Activa)', trendUp: true },
    { label: 'UPTIME FLOTA', value: '96.2%', icon: TrendingUp, trend: '+1.2%', trendUp: true },
    { label: 'COSTO EVITADO YTD', value: '$890K', icon: DollarSign, trend: '+12%', trendUp: true },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* HEADER CARD */}
      <div className="animate-fade-up" style={{ background: '#FFFFFF', borderRadius: '20px', border: `1px solid ${colores.borde}`, borderLeft: `6px solid ${tema.acento}`, padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: `linear-gradient(135deg, ${tema.acento} 0%, ${tema.acentoOscuro} 100%)`, width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(30, 64, 175, 0.2)' }}>
            {/* Using Tool as fallback for Wrench icon */}
            <Wrench size={32} color={tema.sobreAcento} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <h1 style={{ margin: 0, fontSize: '28px', color: colores.textoClaro, fontWeight: 700, letterSpacing: '-0.5px' }}>Mantenimiento Predictivo</h1>
            </div>
            <p style={{ margin: '4px 0 0 0', color: colores.textoMedio, fontSize: '15px' }}>Análisis telemetría y machine learning para evitar paros no programados.</p>
          </div>
        </div>
      </div>

      {/* KPI GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {kpis.map((kpi, idx) => (
          <div key={idx} className="hover-lift animate-fade-up" style={{ animationDelay: `${idx * 0.1}s`, background: '#FFFFFF', borderRadius: '18px', padding: '20px', border: `1px solid ${colores.borde}`, borderTop: `4px solid ${tema.acento}`, position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: colores.textoMedio, letterSpacing: '0.5px' }}>{kpi.label}</span>
              <div style={{ background: tema.acentoSuave, padding: '8px', borderRadius: '10px' }}>
                <kpi.icon size={18} color={tema.acento} />
              </div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: colores.textoClaro, marginBottom: '8px' }}>{kpi.value}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: kpi.trendUp ? colores.exito : colores.peligro }}>
              {kpi.trendUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              <span>{kpi.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* AI INSIGHT */}
      <div className="animate-fade-up" style={{ animationDelay: '0.4s', background: `linear-gradient(110deg, ${tema.acento}08 0%, transparent 60%)`, borderRadius: '18px', border: `1px solid ${tema.acento}30`, padding: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        <div style={{ background: tema.acento, padding: '10px', borderRadius: '12px' }}>
          <Sparkles size={24} color={tema.sobreAcento} />
        </div>
        <div>
          <h3 style={{ margin: '0 0 6px 0', color: tema.acentoOscuro, fontSize: '16px', fontWeight: 700 }}>Insight de MAYIA · IA Preventiva</h3>
          <p style={{ margin: 0, color: colores.textoMedio, fontSize: '14px', lineHeight: 1.5 }}>
            El análisis de telemetría indica que <strong>4 unidades</strong> de la serie 300 presentarán falla de balatas en los próximos <strong>7-10 días</strong>. Se ha programado servicio preventivo en taller interno para el fin de semana, evitando un costo correctivo de <strong>$45,000 MXN</strong>.
          </p>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', gap: '32px', borderBottom: `1px solid ${colores.borde}`, paddingBottom: '0' }}>
        {['Estado', 'Predicciones IA', 'Calendario', 'Costos'].map((tab) => (
          <div key={tab} onClick={() => setActiveTab(tab.toLowerCase())} style={{ padding: '12px 4px', cursor: 'pointer', fontSize: '15px', fontWeight: 600, color: activeTab === tab.toLowerCase() ? tema.acento : colores.textoMedio, borderBottom: activeTab === tab.toLowerCase() ? `3px solid ${tema.acento}` : '3px solid transparent', transition: 'all 0.2s' }}>
            {tab}
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ minHeight: '400px' }}>
        {activeTab === 'predicciones ia' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={{ background: '#FFF', borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '24px' }}>
              <h4 style={{ margin: '0 0 20px 0', fontSize: '14px', color: colores.textoMedio, fontWeight: 700, textTransform: 'uppercase' }}>Probabilidad de Fallo (Próx 30 Días)</h4>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={prediccionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colores.borde} />
                    <XAxis dataKey="dia" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colores.textoOscuro }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colores.textoOscuro }} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                    <Line type="monotone" dataKey="motor" name="Falla de Motor" stroke={colores.peligro} strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="frenos" name="Desgaste Frenos" stroke={tema.acento} strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="llantas" name="Cambio Llantas" stroke={colores.advertencia} strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{ background: '#FFF', borderRadius: '20px', border: `1px solid ${colores.borde}`, overflow: 'hidden' }}>
              <div style={{ padding: '24px', borderBottom: `1px solid ${colores.borde}` }}>
                <h4 style={{ margin: 0, fontSize: '14px', color: colores.textoMedio, fontWeight: 700, textTransform: 'uppercase' }}>Atención Crítica (Triage IA)</h4>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: colores.fondoSecundario }}>
                    <th style={{ padding: '16px', fontSize: '12px', fontWeight: 600, color: colores.textoMedio, textTransform: 'uppercase' }}>Unidad</th>
                    <th style={{ padding: '16px', fontSize: '12px', fontWeight: 600, color: colores.textoMedio, textTransform: 'uppercase' }}>Salud Gral</th>
                    <th style={{ padding: '16px', fontSize: '12px', fontWeight: 600, color: colores.textoMedio, textTransform: 'uppercase' }}>Riesgo Crítico</th>
                  </tr>
                </thead>
                <tbody>
                  {vehiculosMant.map((v, i) => (
                    <tr key={i} className="hover-lift" style={{ borderBottom: `1px solid ${colores.borde}` }}>
                      <td style={{ padding: '16px' }}>
                        <div style={{ fontWeight: 600, color: colores.textoClaro }}>{v.id}</div>
                        <div style={{ fontSize: '12px', color: colores.textoOscuro }}>{v.tipo}</div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ flex: 1, background: colores.borde, height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ width: `${v.salud}%`, height: '100%', background: v.salud > 80 ? colores.exito : v.salud > 50 ? colores.advertencia : colores.peligro, borderRadius: '3px' }}></div>
                          </div>
                          <span style={{ fontSize: '12px', fontWeight: 600, color: colores.textoOscuro }}>{v.salud}%</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px', fontSize: '13px', fontWeight: 600, color: v.salud < 50 ? colores.peligro : colores.textoMedio }}>
                        {v.critico}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'costos' && (
          <div style={{ background: '#FFF', borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '24px' }}>
            <h4 style={{ margin: '0 0 20px 0', fontSize: '14px', color: colores.textoMedio, fontWeight: 700, textTransform: 'uppercase' }}>Evolución de Costos: Preventivo vs Correctivo ($ Mil)</h4>
            <div style={{ height: '350px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={costosData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colores.borde} />
                  <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colores.textoOscuro }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colores.textoOscuro }} />
                  <Tooltip cursor={{ fill: colores.fondoSecundario }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="correctivo" name="Costo Correctivo (Reactivo)" fill={colores.peligro} radius={[4, 4, 0, 0]} stackId="a" />
                  <Bar dataKey="preventivo" name="Costo Preventivo (IA)" fill={tema.acento} radius={[4, 4, 0, 0]} stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
