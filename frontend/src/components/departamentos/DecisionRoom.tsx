import React, { useState, useEffect } from 'react';
import { Network, Activity, Globe, Zap, AlertCircle, Play, ShieldAlert, BrainCircuit, Mic, TrendingUp } from 'lucide-react';
import { brandingConfig } from '../../config/branding';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';

export const DecisionRoom: React.FC = () => {
  const { colores } = brandingConfig;
  const [isMobile, setIsMobile] = useState(false);
  const [activeScenario, setActiveScenario] = useState('optimista');

  useEffect(() => { const c = () => setIsMobile(window.innerWidth < 1024); c(); window.addEventListener('resize', c); return () => window.removeEventListener('resize', c); }, []);
  const px = isMobile ? '16px' : '32px';

  // Light theme overrides for better UX/UI (since user requested white background)
  const bgLight = '#ffffff';
  const panelLight = '#ffffff';
  const borderLight = '#E5E7EB';
  const innerBg = '#F9FAFB'; // A very soft gray for inner cards/buttons
  const textMain = '#111827';
  const textMuted = '#6B7280';
  const textSubtle = '#9CA3AF';

  const chartData = [
    { tiempo: 'Q1', optimista: 4.2, base: 3.8, pesimista: 3.1 },
    { tiempo: 'Q2', optimista: 5.8, base: 4.9, pesimista: 3.5 },
    { tiempo: 'Q3', optimista: 7.4, base: 5.8, pesimista: 4.0 },
    { tiempo: 'Q4', optimista: 9.1, base: 6.7, pesimista: 4.2 },
    { tiempo: 'Q5', optimista: 11.5, base: 8.1, pesimista: 4.5 },
  ];

  const alertas = [
    { nivel: 'critico', texto: 'Aumento súbito de latencia térmica en Rack B2', accion: 'Migración recomendada' },
    { nivel: 'advertencia', texto: 'Presupuesto OPEX excediendo proyección en 4%', accion: 'Ajustar instancias spot' },
  ];

  const escenarios = [
    { id: 'optimista', label: 'Crecimiento Acelerado', color: colores.exito },
    { id: 'base', label: 'Proyección Base', color: colores.primario },
    { id: 'pesimista', label: 'Contención de Riesgo', color: colores.peligro },
  ];

  const agentes = [
    { nombre: 'CFO IA', rol: 'Proyecciones financieras', stat: '+14% ROI' },
    { nombre: 'CTO IA', rol: 'Arquitectura y capacidad', stat: '99.99% Uptime' },
    { nombre: 'CISO IA', rol: 'Riesgo cibernético', stat: '0 Brechas' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: bgLight, color: textMain }}>
      {/* Header */}
      <div style={{ padding: isMobile ? '16px 16px 0' : '28px 32px 0', borderBottom: `1px solid ${borderLight}`, paddingBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `linear-gradient(135deg, ${colores.primario}15, ${colores.primario}05)`, border: `1px solid ${colores.primario}33`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BrainCircuit size={18} color={colores.primario} />
              </div>
              <h2 style={{ fontSize: isMobile ? '20px' : '26px', fontWeight: '900', color: textMain, margin: 0, letterSpacing: '-0.5px' }}>AI Decision Room</h2>
            </div>
            <p style={{ fontSize: '14px', color: textMuted, margin: '4px 0 0 0' }}>Centro de mando estratégico · Simulación de escenarios en tiempo real</p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: panelLight, padding: '8px 16px', borderRadius: '999px', border: `1px solid ${borderLight}`, boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: colores.exito, boxShadow: `0 0 8px ${colores.exito}88` }} />
            <span style={{ fontSize: '12px', fontWeight: '700', color: textMain, letterSpacing: '1px' }}>SISTEMA ONLINE</span>
            <div style={{ width: '1px', height: '16px', background: borderLight, margin: '0 8px' }} />
            <Mic size={14} color={textSubtle} />
            <span style={{ fontSize: '11px', color: textMuted }}>Escuchando comandos...</span>
          </div>
        </div>
      </div>

      <div style={{ padding: `24px ${px} 32px`, flex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 300px', gap: '24px' }}>
          
          {/* Main Panel - Simulación */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Controles de Escenario */}
            <div style={{ background: panelLight, border: `1px solid ${borderLight}`, borderRadius: '20px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: textMain, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Activity size={18} color={colores.primario} /> Simulación de Impacto
                </h3>
                <div style={{ display: 'flex', gap: '8px', background: innerBg, padding: '4px', borderRadius: '12px', border: `1px solid ${borderLight}` }}>
                  {escenarios.map(s => (
                    <button key={s.id} onClick={() => setActiveScenario(s.id)} style={{ padding: '6px 14px', borderRadius: '8px', border: 'none', background: activeScenario === s.id ? `${s.color}15` : 'transparent', color: activeScenario === s.id ? s.color : textMuted, fontSize: '12px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s', borderBottom: activeScenario === s.id ? `2px solid ${s.color}` : '2px solid transparent' }}>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div style={{ height: '320px', width: '100%', minWidth: 0 }}>
                <ResponsiveContainer>
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      {escenarios.map(s => (
                        <linearGradient key={s.id} id={`grad_${s.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={s.color} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={s.color} stopOpacity={0}/>
                        </linearGradient>
                      ))}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={borderLight} vertical={false} />
                    <XAxis dataKey="tiempo" tick={{ fontSize: 11, fill: textMuted }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: textMuted }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: panelLight, border: `1px solid ${borderLight}`, borderRadius: '12px', color: textMain, boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }} itemStyle={{ color: textMain, fontWeight: 'bold' }} />
                    
                    <Area type="monotone" dataKey="optimista" stroke={activeScenario === 'optimista' ? colores.exito : `${colores.exito}44`} fillOpacity={1} fill={`url(#grad_optimista)`} strokeWidth={activeScenario === 'optimista' ? 3 : 1.5} />
                    <Area type="monotone" dataKey="base" stroke={activeScenario === 'base' ? colores.primario : `${colores.primario}44`} fillOpacity={1} fill={`url(#grad_base)`} strokeWidth={activeScenario === 'base' ? 3 : 1.5} />
                    <Area type="monotone" dataKey="pesimista" stroke={activeScenario === 'pesimista' ? colores.peligro : `${colores.peligro}44`} fillOpacity={1} fill={`url(#grad_pesimista)`} strokeWidth={activeScenario === 'pesimista' ? 3 : 1.5} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Panel de Agentes (Consejo Consultivo IA) */}
            <div style={{ background: panelLight, border: `1px solid ${borderLight}`, borderRadius: '20px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: textMain, margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Globe size={16} color={colores.primario} /> Consejo Consultivo IA
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '16px' }}>
                {agentes.map(a => (
                  <div key={a.nombre} style={{ background: innerBg, border: `1px solid ${borderLight}`, borderRadius: '14px', padding: '16px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, transparent, ${colores.primario}, transparent)` }} />
                    <p style={{ fontSize: '14px', fontWeight: '800', color: textMain, margin: '0 0 4px 0' }}>{a.nombre}</p>
                    <p style={{ fontSize: '11px', color: textMuted, margin: '0 0 12px 0' }}>{a.rol}</p>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: `${colores.exito}15`, padding: '6px 10px', borderRadius: '8px' }}>
                      <TrendingUp size={12} color={colores.exito} />
                      <span style={{ fontSize: '12px', fontWeight: '800', color: colores.exito }}>{a.stat}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Right - Alertas y Status */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Global Status */}
            <div style={{ background: panelLight, border: `1px solid ${borderLight}`, borderRadius: '20px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '13px', fontWeight: '800', color: textMuted, margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>Global Status</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { label: 'Carga Computacional', val: '78%', color: colores.primario },
                  { label: 'Eficiencia PUE', val: '1.24', color: colores.exito },
                  { label: 'Riesgo Operativo', val: 'Bajo', color: colores.exito },
                ].map(s => (
                  <div key={s.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '13px', color: textMuted, fontWeight: '500' }}>{s.label}</span>
                      <span style={{ fontSize: '14px', fontWeight: '800', color: s.color }}>{s.val}</span>
                    </div>
                    <div style={{ height: '6px', background: innerBg, borderRadius: '3px', overflow: 'hidden', border: `1px solid ${borderLight}` }}>
                      <div style={{ height: '100%', width: s.val.includes('%') ? s.val : '100%', background: s.color, borderRadius: '3px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alertas Críticas */}
            <div style={{ background: panelLight, border: `1px solid ${colores.peligro}33`, borderRadius: '20px', padding: '20px', position: 'relative', boxShadow: `0 4px 12px ${colores.peligro}10` }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', background: `radial-gradient(circle at top right, ${colores.peligro}08, transparent 70%)`, pointerEvents: 'none', borderRadius: '20px' }} />
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: colores.peligro, margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldAlert size={16} /> Alertas de Sistema
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {alertas.map((a, i) => (
                  <div key={i} style={{ background: innerBg, border: `1px solid ${borderLight}`, borderRadius: '12px', padding: '14px', borderLeft: `4px solid ${a.nivel === 'critico' ? colores.peligro : colores.advertencia}` }}>
                    <p style={{ fontSize: '12px', color: textMain, fontWeight: '600', margin: '0 0 10px 0', lineHeight: 1.4 }}>{a.texto}</p>
                    <button style={{ background: `${colores.primario}10`, border: `1px solid ${colores.primario}33`, color: colores.primario, fontSize: '11px', fontWeight: '800', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = `${colores.primario}20`} onMouseLeave={(e) => e.currentTarget.style.background = `${colores.primario}10`}>
                      <Play size={10} /> {a.accion}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
