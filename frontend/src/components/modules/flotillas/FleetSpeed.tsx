import React, { useState, useEffect } from 'react';
import { Gauge, AlertOctagon, TrendingDown, Users, Sparkles, AlertTriangle, Shield, Eye } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { brandingConfig } from '../../../config/branding';

const { colores } = brandingConfig;

const tema = {
  acento: '#1E40AF',
  acentoOscuro: '#0F172A',
  acentoSuave: '#DBEAFE',
  sobreAcento: '#FFFFFF',
};

const eventosPorHora = [
  { hora: '06:00', exceso: 2, distraccion: 0 },
  { hora: '09:00', exceso: 8, distraccion: 3 },
  { hora: '12:00', exceso: 15, distraccion: 5 },
  { hora: '15:00', exceso: 12, distraccion: 4 },
  { hora: '18:00', exceso: 6, distraccion: 2 },
  { hora: '21:00', exceso: 3, distraccion: 0 },
];

const rankingRiesgo = [
  { conductor: 'Miguel A.', score: 35, eventos: 12 },
  { conductor: 'Roberto C.', score: 42, eventos: 8 },
  { conductor: 'Juan P.', score: 48, eventos: 7 },
  { conductor: 'Daniel T.', score: 55, eventos: 5 },
  { conductor: 'Hugo L.', score: 60, eventos: 3 },
];

const conductores = [
  { id: 'OPE-042', nombre: 'Miguel Ángeles', score: 35, estado: 'Crítico', eventos: '12 (3 Graves)', reqCapacitacion: true },
  { id: 'OPE-128', nombre: 'Roberto Carlos', score: 42, estado: 'Riesgo', eventos: '8 (1 Grave)', reqCapacitacion: true },
  { id: 'OPE-094', nombre: 'Juan Pérez', score: 48, estado: 'Riesgo', eventos: '7 (0 Graves)', reqCapacitacion: false },
  { id: 'OPE-332', nombre: 'Hugo López', score: 92, estado: 'Seguro', eventos: '0', reqCapacitacion: false },
];

const useAnimations = () => {
  useEffect(() => {
    const id = 'module-animations-speed';
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

export const FleetSpeed: React.FC = () => {
  useAnimations();
  const [activeTab, setActiveTab] = useState('dashboard');

  const kpis = [
    { label: 'VELOCIDAD PROMEDIO', value: '67 km/h', icon: Gauge, trend: '-2 km/h', trendUp: true },
    { label: 'EVENTOS EXCESO', value: '34', icon: AlertOctagon, trend: '-15% vs ayer', trendUp: true },
    { label: 'RISK SCORE FLOTA', value: '72/100', icon: Shield, trend: '+4 pts', trendUp: true },
    { label: 'COND. EN ALERTA', value: '8', icon: Users, trend: 'Requieren atención', trendUp: false, color: colores.peligro },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* HEADER */}
      <div className="animate-fade-up" style={{ background: '#FFFFFF', borderRadius: '20px', border: `1px solid ${colores.borde}`, borderLeft: `6px solid ${tema.acento}`, padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: `linear-gradient(135deg, ${tema.acento} 0%, ${tema.acentoOscuro} 100%)`, width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Gauge size={32} color={tema.sobreAcento} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px', color: colores.textoClaro, fontWeight: 700 }}>Speed & Driver Risk AI</h1>
            <p style={{ margin: '4px 0 0 0', color: colores.textoMedio, fontSize: '15px' }}>Scoring de comportamiento y detección de patrones de riesgo al volante.</p>
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
          <h3 style={{ margin: '0 0 6px 0', color: tema.acentoOscuro, fontSize: '16px', fontWeight: 700 }}>Insight de MAYIA · IA Comportamental</h3>
          <p style={{ margin: 0, color: colores.textoMedio, fontSize: '14px', lineHeight: 1.5 }}>
            El operador <strong>Miguel Ángeles</strong> presenta un patrón repetitivo de aceleración brusca en tramos urbanos. Su Risk Score ha caído a <strong>35/100</strong>. Se ha auto-programado su asistencia al módulo de <em>Manejo Defensivo II</em> para este viernes.
          </p>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', gap: '32px', borderBottom: `1px solid ${colores.borde}` }}>
        {['Dashboard', 'Risk Scoring', 'Eventos', 'Capacitación IA'].map((tab) => (
          <div key={tab} onClick={() => setActiveTab(tab.toLowerCase())} style={{ padding: '12px 4px', cursor: 'pointer', fontSize: '15px', fontWeight: 600, color: activeTab === tab.toLowerCase() ? tema.acento : colores.textoMedio, borderBottom: activeTab === tab.toLowerCase() ? `3px solid ${tema.acento}` : '3px solid transparent' }}>
            {tab}
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div>
        {activeTab === 'dashboard' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={{ background: '#FFF', borderRadius: '20px', padding: '24px', border: `1px solid ${colores.borde}` }}>
              <h4 style={{ margin: '0 0 20px 0', fontSize: '14px', color: colores.textoMedio, fontWeight: 700 }}>EVENTOS DE RIESGO POR HORA</h4>
              <div style={{ height: '280px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={eventosPorHora} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colores.borde} />
                    <XAxis dataKey="hora" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colores.textoOscuro }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colores.textoOscuro }} />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="exceso" name="Exceso Velocidad" stroke={colores.peligro} fill={colores.peligro} fillOpacity={0.2} />
                    <Area type="monotone" dataKey="distraccion" name="Distracción" stroke={colores.advertencia} fill={colores.advertencia} fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{ background: '#FFF', borderRadius: '20px', padding: '24px', border: `1px solid ${colores.borde}` }}>
              <h4 style={{ margin: '0 0 20px 0', fontSize: '14px', color: colores.textoMedio, fontWeight: 700 }}>TOP CONDUCTORES DE MAYOR RIESGO</h4>
              <div style={{ height: '280px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rankingRiesgo} layout="vertical" margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={colores.borde} />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colores.textoOscuro }} domain={[0, 100]} />
                    <YAxis dataKey="conductor" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colores.textoClaro }} />
                    <Tooltip />
                    <Bar dataKey="score" name="Risk Score (Menor = Peor)" fill={colores.peligro} radius={[0, 4, 4, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'risk scoring' && (
          <div style={{ background: '#FFF', borderRadius: '20px', border: `1px solid ${colores.borde}` }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: colores.fondoSecundario }}>
                  <th style={{ padding: '16px', fontSize: '12px', fontWeight: 600, color: colores.textoMedio }}>OPERADOR</th>
                  <th style={{ padding: '16px', fontSize: '12px', fontWeight: 600, color: colores.textoMedio }}>SCORE (0-100)</th>
                  <th style={{ padding: '16px', fontSize: '12px', fontWeight: 600, color: colores.textoMedio }}>EVENTOS HOY</th>
                  <th style={{ padding: '16px', fontSize: '12px', fontWeight: 600, color: colores.textoMedio }}>ACCIÓN RECOMENDADA IA</th>
                </tr>
              </thead>
              <tbody>
                {conductores.map((c, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${colores.borde}` }}>
                    <td style={{ padding: '16px' }}>
                      <div style={{ fontWeight: 600, color: colores.textoClaro }}>{c.nombre}</div>
                      <div style={{ fontSize: '12px', color: colores.textoOscuro }}>{c.id}</div>
                    </td>
                    <td style={{ padding: '16px', fontWeight: 700, color: c.score < 50 ? colores.peligro : colores.exito }}>{c.score}</td>
                    <td style={{ padding: '16px', color: colores.textoMedio, fontSize: '14px' }}>{c.eventos}</td>
                    <td style={{ padding: '16px' }}>
                      {c.reqCapacitacion ? (
                        <span style={{ padding: '4px 10px', background: '#FEE2E2', color: '#DC2626', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>Programar Capacitación</span>
                      ) : (
                        <span style={{ padding: '4px 10px', background: '#D1FAE5', color: '#047857', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>Ninguna</span>
                      )}
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
