import React, { useState, useEffect } from 'react';
import { AlertCircle, ShieldAlert, Sparkles, TrendingDown, Clock, Settings, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { brandingConfig } from '../../../config/branding';

const { colores } = brandingConfig;
const tema = {
  acento: '#DC2626',
  acentoOscuro: '#991B1B',
  acentoSuave: '#FEE2E2',
  sobreAcento: '#FFFFFF',
};

const mockSlaData = [
  { mes: 'Ene', sla: 98 },
  { mes: 'Feb', sla: 97.5 },
  { mes: 'Mar', sla: 96 },
  { mes: 'Abr', sla: 94 },
  { mes: 'May', sla: 91 },
  { mes: 'Jun', sla: 92.5 },
];

const mockWarnings = [
  { id: 1, proveedor: 'TechCorp SA', servicio: 'Soporte Nivel 2', slaActual: '90.5%', limite: '90.0%', tiempo: 'Riesgo inminente (24h)' },
  { id: 2, proveedor: 'Logística Omega', servicio: 'Entregas Same-Day', slaActual: '91.2%', limite: '95.0%', tiempo: 'Incumplido hace 12h' },
  { id: 3, proveedor: 'Industrias Alfa', servicio: 'Provisión Materiales', slaActual: '94.8%', limite: '95.0%', tiempo: 'Riesgo medio (48h)' },
];

const useAnimations = () => {
  useEffect(() => {
    const id = 'module-animations-compras-sla';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes needleMove { 0% { transform: rotate(-90deg); } 100% { transform: rotate(45deg); } }
      @keyframes pulseAlert { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    `;
    document.head.appendChild(style);
  }, []);
};

export const ImpactoSLA: React.FC = () => {
  useAnimations();
  const [slaDrop, setSlaDrop] = useState(3); // 1, 3, 5
  const baseContractValue = 5000000; // 5M MXN
  
  // Calculate penalty based on drop
  // Example rule: 1% drop = 0.5% penalty, 3% = 2% penalty, 5% = 5% penalty
  const getPenaltyPercentage = (drop: number) => {
    if (drop <= 1) return 0.005;
    if (drop <= 3) return 0.02;
    return 0.05;
  };
  
  const penaltyAmount = baseContractValue * getPenaltyPercentage(slaDrop);

  return (
    <div style={{ maxWidth: 1200, display: 'flex', flexDirection: 'column', gap: 24, padding: '24px 0', animation: 'fadeSlideUp 0.6s ease-out' }}>
      
      {/* HEADER */}
      <div style={{ background: colores.fondoPrincipal, borderRadius: 20, padding: 24, display: 'flex', alignItems: 'center', gap: 24, border: `1px solid ${colores.borde}`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, background: `linear-gradient(to bottom, ${tema.acento}, ${tema.acentoOscuro})` }} />
        <div style={{ width: 64, height: 64, borderRadius: 16, background: `linear-gradient(135deg, ${tema.acento}, ${tema.acentoOscuro})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: tema.sobreAcento }}>
          <ShieldAlert size={32} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h1 style={{ margin: 0, fontSize: 28, color: colores.textoClaro }}>Impacto y Cumplimiento SLA</h1>
            <span style={{ background: `${colores.exito}20`, color: colores.exito, padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Activity size={14} /> GLOBAL SLA: 92.5%
            </span>
          </div>
          <p style={{ margin: '8px 0 0 0', color: colores.textoMedio, fontSize: 16 }}>Monitoreo de Acuerdos de Nivel de Servicio y penalizaciones financieras.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* GIANT CUSTOM SVG SEMICIRCULAR GAUGE */}
        <div style={{ background: colores.fondoPrincipal, borderRadius: 20, padding: 32, border: `1px solid ${colores.borde}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h3 style={{ margin: '0 0 32px 0', color: colores.textoClaro, alignSelf: 'flex-start' }}>SLA Global del Portafolio</h3>
          
          <div style={{ position: 'relative', width: 300, height: 160, display: 'flex', justifyContent: 'center' }}>
            <svg width="300" height="150" viewBox="0 0 300 150">
              <defs>
                <linearGradient id="rojo" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={colores.peligro} />
                  <stop offset="100%" stopColor={colores.peligro} />
                </linearGradient>
                <linearGradient id="amarillo" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={colores.advertencia} />
                  <stop offset="100%" stopColor={colores.advertencia} />
                </linearGradient>
                <linearGradient id="verde" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={colores.exito} />
                  <stop offset="100%" stopColor={colores.exito} />
                </linearGradient>
              </defs>
              
              {/* Background Arc */}
              <path d="M 30 150 A 120 120 0 0 1 270 150" fill="none" stroke={colores.fondoTerciario} strokeWidth="24" strokeLinecap="round" />
              
              {/* Red Zone < 90% */}
              <path d="M 30 150 A 120 120 0 0 1 75 40" fill="none" stroke="url(#rojo)" strokeWidth="24" strokeLinecap="butt" />
              {/* Yellow Zone 90-95% */}
              <path d="M 75 40 A 120 120 0 0 1 150 30" fill="none" stroke="url(#amarillo)" strokeWidth="24" strokeLinecap="butt" />
              {/* Green Zone > 95% */}
              <path d="M 150 30 A 120 120 0 0 1 270 150" fill="none" stroke="url(#verde)" strokeWidth="24" strokeLinecap="butt" />
              
              {/* Needle pivot */}
              <circle cx="150" cy="150" r="12" fill={colores.textoMedio} />
              
              {/* Needle - animated to ~92.5% (roughly 45deg) */}
              <g style={{ transformOrigin: '150px 150px', animation: 'needleMove 1.5s ease-out forwards' }}>
                <path d="M 146 150 L 154 150 L 150 40 Z" fill={colores.textoClaro} />
              </g>
            </svg>
            <div style={{ position: 'absolute', bottom: -10, fontSize: 32, fontWeight: 'bold', color: colores.textoClaro }}>
              92.5%
            </div>
          </div>
          <div style={{ display: 'flex', gap: 24, marginTop: 40, width: '100%', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: colores.textoOscuro }}><div style={{ width: 12, height: 12, borderRadius: 6, background: colores.peligro }}/> Crítico (&lt;90%)</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: colores.textoOscuro }}><div style={{ width: 12, height: 12, borderRadius: 6, background: colores.advertencia }}/> Alerta (90-95%)</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: colores.textoOscuro }}><div style={{ width: 12, height: 12, borderRadius: 6, background: colores.exito }}/> Óptimo (&gt;95%)</div>
          </div>
        </div>

        {/* FINANCIAL PENALTY CALCULATOR */}
        <div style={{ background: `linear-gradient(110deg, ${tema.acentoSuave} 0%, ${colores.fondoPrincipal} 60%)`, borderRadius: 20, padding: 32, border: `1px solid ${colores.borde}`, position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <Settings size={24} color={tema.acento} />
            <h3 style={{ margin: 0, color: colores.textoClaro }}>Calculadora de Penalizaciones Financieras</h3>
          </div>
          
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ color: colores.textoMedio, fontWeight: 'bold' }}>Simular caída de SLA</span>
              <span style={{ color: tema.acento, fontWeight: 'bold' }}>-{slaDrop}%</span>
            </div>
            <input 
              type="range" 
              min="1" max="5" step="1" 
              value={slaDrop} 
              onChange={(e) => setSlaDrop(Number(e.target.value))}
              style={{ width: '100%', accentColor: tema.acento }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12, color: colores.textoOscuro }}>
              <span>-1%</span><span>-3%</span><span>-5%</span>
            </div>
          </div>

          <div style={{ background: colores.fondoPrincipal, borderRadius: 16, padding: 24, border: `1px solid ${tema.acento}40`, boxShadow: '0 4px 12px rgba(220, 38, 38, 0.1)' }}>
            <div style={{ fontSize: 14, color: colores.textoMedio, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <TrendingDown size={16} color={tema.acento} />
              Penalización estimada a retener
            </div>
            <div style={{ fontSize: 36, fontWeight: 'bold', color: tema.acentoOscuro }}>
              ${penaltyAmount.toLocaleString()} MXN
            </div>
            <div style={{ fontSize: 12, color: colores.textoOscuro, marginTop: 8 }}>
              Basado en un volumen contratado de ${(baseContractValue/1000000).toFixed(1)}M MXN
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* CHART */}
        <div style={{ background: colores.fondoPrincipal, borderRadius: 20, padding: 24, border: `1px solid ${colores.borde}` }}>
          <h3 style={{ margin: '0 0 16px 0', color: colores.textoClaro }}>Tendencia Histórica de SLA (%)</h3>
          <div style={{ height: 260, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockSlaData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colores.fondoTerciario} />
                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{fill: colores.textoOscuro, fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} domain={[85, 100]} tick={{fill: colores.textoOscuro, fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: 12, border: `1px solid ${colores.borde}`, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  formatter={(value?: number) => [`${value ?? 0}%`, 'SLA Promedio']}
                />
                <Line type="monotone" dataKey="sla" stroke={tema.acento} strokeWidth={4} dot={{ r: 6, fill: tema.acento, strokeWidth: 2, stroke: colores.fondoPrincipal }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* EARLY WARNING FEED */}
        <div style={{ background: colores.fondoPrincipal, borderRadius: 20, padding: 24, border: `1px solid ${colores.borde}`, overflow: 'auto', maxHeight: 330 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ margin: 0, color: colores.textoClaro }}>Alertas Tempranas (48h)</h3>
            <span style={{ animation: 'pulseAlert 2s infinite', background: `${colores.peligro}20`, color: colores.peligro, padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 'bold' }}>
              3 Riesgos Detectados
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {mockWarnings.map((w, i) => (
              <div key={w.id} style={{ display: 'flex', gap: 16, padding: 16, background: colores.fondoSecundario, borderRadius: 12, borderLeft: `4px solid ${w.id === 2 ? colores.peligro : colores.advertencia}`, animation: `fadeSlideUp 0.4s ease-out ${i * 0.1}s both` }}>
                <AlertCircle size={24} color={w.id === 2 ? colores.peligro : colores.advertencia} style={{ flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontWeight: 'bold', color: colores.textoClaro }}>{w.proveedor}</span>
                    <span style={{ fontSize: 12, color: colores.textoOscuro, display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12}/> {w.tiempo}</span>
                  </div>
                  <div style={{ fontSize: 13, color: colores.textoMedio, marginBottom: 8 }}>{w.servicio}</div>
                  <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
                    <span style={{ color: w.id === 2 ? colores.peligro : colores.advertencia, fontWeight: 'bold' }}>SLA Actual: {w.slaActual}</span>
                    <span style={{ color: colores.textoOscuro }}>Límite Contractual: {w.limite}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
