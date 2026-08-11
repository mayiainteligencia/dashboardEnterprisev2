import React, { useState, useEffect } from 'react';
import { Route, Zap, Clock, ShieldCheck, Sparkles, TrendingUp, TrendingDown, Leaf, TrendingDown as ArrowDown } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { brandingConfig } from '../../../config/branding';

const { colores } = brandingConfig;

const tema = {
  acento: '#1E40AF',
  acentoOscuro: '#0F172A',
  acentoSuave: '#DBEAFE',
  sobreAcento: '#FFFFFF',
};

const optimizacionData = [
  { ruta: 'R-Norte 01', original: 120, optimizada: 95 },
  { ruta: 'R-Sur 04', original: 150, optimizada: 110 },
  { ruta: 'R-Este 12', original: 90, optimizada: 75 },
  { ruta: 'R-Oeste 03', original: 200, optimizada: 165 },
  { ruta: 'R-Centro 09', original: 85, optimizada: 60 },
];

const ahorroAcumuladoData = [
  { mes: 'Ene', km: 1200, co2: 0.8 },
  { mes: 'Feb', km: 2300, co2: 1.5 },
  { mes: 'Mar', km: 3800, co2: 2.6 },
  { mes: 'Abr', km: 5400, co2: 3.8 },
  { mes: 'May', km: 7200, co2: 5.1 },
  { mes: 'Jun', km: 9500, co2: 6.8 },
];

const rutasActivas = [
  { id: 'RT-842', origen: 'CEDIS Norte', destino: 'Plaza Satélite', conductor: 'Héctor Ruiz', progreso: 65, status: 'Óptimo', ahorro: '12 min' },
  { id: 'RT-843', origen: 'Planta Sur', destino: 'Parque Industrial 2', conductor: 'Alma López', progreso: 30, status: 'Desvío IA', ahorro: '25 min' },
  { id: 'RT-844', origen: 'CEDIS Oriente', destino: 'Centro Histórico', conductor: 'Pedro Díaz', progreso: 85, status: 'Óptimo', ahorro: '8 min' },
  { id: 'RT-845', origen: 'Bodega 3', destino: 'Santa Fe', conductor: 'Rosa Meléndez', progreso: 15, status: 'Tráfico', ahorro: '--' },
];

const useAnimations = () => {
  useEffect(() => {
    const id = 'module-animations-rutas';
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

export const FleetRutas: React.FC = () => {
  useAnimations();
  const [activeTab, setActiveTab] = useState('optimizador ia');

  const kpis = [
    { label: 'RUTAS OPTIMIZADAS HOY', value: '47', icon: Route, trend: '+5 vs ayer', trendUp: true },
    { label: 'AHORRO EN KM', value: '23.4%', icon: ArrowDown, trend: '-2.1% mes', trendUp: true },
    { label: 'REDUCCIÓN CO₂', value: '1.8 ton', icon: Leaf, trend: 'Impacto Alto', trendUp: true, color: colores.exito },
    { label: 'TIEMPO AHORRADO', value: '142 min', icon: Clock, trend: '+15 min hoy', trendUp: true },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* HEADER CARD */}
      <div className="animate-fade-up" style={{ background: '#FFFFFF', borderRadius: '20px', border: `1px solid ${colores.borde}`, borderLeft: `6px solid ${tema.acento}`, padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: `linear-gradient(135deg, ${tema.acento} 0%, ${tema.acentoOscuro} 100%)`, width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(30, 64, 175, 0.2)' }}>
            <Zap size={32} color={tema.sobreAcento} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <h1 style={{ margin: 0, fontSize: '28px', color: colores.textoClaro, fontWeight: 700, letterSpacing: '-0.5px' }}>Optimización de Rutas</h1>
            </div>
            <p style={{ margin: '4px 0 0 0', color: colores.textoMedio, fontSize: '15px' }}>Planificación inteligente de recorridos basados en tráfico, clima y ventanas de entrega.</p>
          </div>
        </div>
      </div>

      {/* KPI GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {kpis.map((kpi, idx) => (
          <div key={idx} className="hover-lift animate-fade-up" style={{ animationDelay: `${idx * 0.1}s`, background: '#FFFFFF', borderRadius: '18px', padding: '20px', border: `1px solid ${colores.borde}`, borderTop: `4px solid ${kpi.color || tema.acento}`, position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: colores.textoMedio, letterSpacing: '0.5px' }}>{kpi.label}</span>
              <div style={{ background: kpi.color ? `${kpi.color}15` : tema.acentoSuave, padding: '8px', borderRadius: '10px' }}>
                <kpi.icon size={18} color={kpi.color || tema.acento} />
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
          <h3 style={{ margin: '0 0 6px 0', color: tema.acentoOscuro, fontSize: '16px', fontWeight: 700 }}>Insight de MAYIA · IA Optimizadora</h3>
          <p style={{ margin: 0, color: colores.textoMedio, fontSize: '14px', lineHeight: 1.5 }}>
            Agrupación de entregas en Zona Sur sugiere consolidar <strong>3 vehículos</strong> en <strong>2</strong> utilizando unidades de mayor capacidad. Esto reduciría la huella de carbono en <strong>45kg de CO₂</strong> hoy y ahorraría <strong>$1,250 MXN</strong> en costos operativos.
          </p>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', gap: '32px', borderBottom: `1px solid ${colores.borde}`, paddingBottom: '0' }}>
        {['Rutas Activas', 'Optimizador IA', 'Histórico', 'Ahorro'].map((tab) => (
          <div key={tab} onClick={() => setActiveTab(tab.toLowerCase())} style={{ padding: '12px 4px', cursor: 'pointer', fontSize: '15px', fontWeight: 600, color: activeTab === tab.toLowerCase() ? tema.acento : colores.textoMedio, borderBottom: activeTab === tab.toLowerCase() ? `3px solid ${tema.acento}` : '3px solid transparent', transition: 'all 0.2s' }}>
            {tab}
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ minHeight: '400px' }}>
        {activeTab === 'optimizador ia' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={{ background: '#FFF', borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '24px' }}>
              <h4 style={{ margin: '0 0 20px 0', fontSize: '14px', color: colores.textoMedio, fontWeight: 700, textTransform: 'uppercase' }}>Comparativo: Original vs IA (Km)</h4>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={optimizacionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colores.borde} />
                    <XAxis dataKey="ruta" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colores.textoOscuro }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colores.textoOscuro }} />
                    <Tooltip cursor={{ fill: colores.fondoSecundario }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                    <Bar dataKey="original" name="Ruta Planificada" fill={colores.borde} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="optimizada" name="Ruta Optimizada IA" fill={tema.acento} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{ background: '#FFF', borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '24px' }}>
              <h4 style={{ margin: '0 0 20px 0', fontSize: '14px', color: colores.textoMedio, fontWeight: 700, textTransform: 'uppercase' }}>Ahorro Acumulado (Km y CO₂)</h4>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={ahorroAcumuladoData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colores.exito} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={colores.exito} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colores.borde} />
                    <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colores.textoOscuro }} />
                    <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colores.textoOscuro }} />
                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colores.textoOscuro }} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Area yAxisId="left" type="monotone" dataKey="km" name="Km Ahorrados" stroke={tema.acento} strokeWidth={3} fillOpacity={0} />
                    <Area yAxisId="right" type="monotone" dataKey="co2" name="CO₂ Ahorrado (Ton)" stroke={colores.exito} strokeWidth={3} fillOpacity={1} fill="url(#colorCo2)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rutas activas' && (
          <div style={{ background: '#FFF', borderRadius: '20px', border: `1px solid ${colores.borde}`, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: colores.fondoSecundario, borderBottom: `1px solid ${colores.borde}` }}>
                  <th style={{ padding: '16px', fontSize: '12px', fontWeight: 600, color: colores.textoMedio, textTransform: 'uppercase' }}>ID Ruta / Conductor</th>
                  <th style={{ padding: '16px', fontSize: '12px', fontWeight: 600, color: colores.textoMedio, textTransform: 'uppercase' }}>Origen - Destino</th>
                  <th style={{ padding: '16px', fontSize: '12px', fontWeight: 600, color: colores.textoMedio, textTransform: 'uppercase' }}>Progreso</th>
                  <th style={{ padding: '16px', fontSize: '12px', fontWeight: 600, color: colores.textoMedio, textTransform: 'uppercase' }}>Status</th>
                  <th style={{ padding: '16px', fontSize: '12px', fontWeight: 600, color: colores.textoMedio, textTransform: 'uppercase' }}>Ahorro IA</th>
                </tr>
              </thead>
              <tbody>
                {rutasActivas.map((ruta, i) => (
                  <tr key={i} className="hover-lift" style={{ borderBottom: `1px solid ${colores.borde}`, transition: 'background 0.2s' }}>
                    <td style={{ padding: '16px' }}>
                      <div style={{ fontWeight: 600, color: colores.textoClaro }}>{ruta.id}</div>
                      <div style={{ fontSize: '12px', color: colores.textoOscuro }}>{ruta.conductor}</div>
                    </td>
                    <td style={{ padding: '16px', fontSize: '13px', color: colores.textoMedio }}>
                      <div><strong>O:</strong> {ruta.origen}</div>
                      <div><strong>D:</strong> {ruta.destino}</div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ flex: 1, background: colores.borde, height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${ruta.progreso}%`, height: '100%', background: tema.acento, borderRadius: '3px' }}></div>
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: colores.textoOscuro }}>{ruta.progreso}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 600, background: ruta.status === 'Óptimo' ? '#D1FAE5' : ruta.status === 'Desvío IA' ? '#DBEAFE' : '#FEE2E2', color: ruta.status === 'Óptimo' ? '#047857' : ruta.status === 'Desvío IA' ? '#1D4ED8' : '#DC2626' }}>
                        {ruta.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px', fontWeight: 600, color: colores.exito }}>
                      {ruta.ahorro}
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
