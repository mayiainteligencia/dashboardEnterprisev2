import React, { useState, useEffect } from 'react';
import { Zap, AlertTriangle, TrendingDown, Sparkles, Battery, Thermometer, Droplets, Wind, SlidersHorizontal, Sun, Moon } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { brandingConfig } from '../../../config/branding';

const { colores } = brandingConfig;

const tema = {
  acento: '#10B981',
  acentoOscuro: '#047857',
  acentoSuave: '#D1FAE5',
  sobreAcento: '#FFFFFF',
};

const kpis = [
  { label: 'Consumo Semanal', value: '45,230 kWh', trend: '-4.2%', icon: Zap, alert: false },
  { label: 'Costo Proyectado', value: '$84,500 MXN', trend: '+1.5%', icon: AlertTriangle, alert: true },
  { label: 'Demanda Máxima', value: '345 kW', trend: '-2.1%', icon: Battery, alert: false },
  { label: 'Ahorro Potencial AI', value: '$12,400 MXN', trend: '+15%', icon: Sparkles, alert: false }
];

const hourlyData = [
  { time: '00:00', hw: 120, hvac: 80, light: 20 },
  { time: '04:00', hw: 110, hvac: 75, light: 20 },
  { time: '08:00', hw: 180, hvac: 140, light: 80 },
  { time: '12:00', hw: 260, hvac: 210, light: 100 },
  { time: '16:00', hw: 280, hvac: 220, light: 110 },
  { time: '20:00', hw: 210, hvac: 160, light: 90 },
  { time: '23:59', hw: 140, hvac: 90, light: 40 },
];

const systemData = [
  { name: 'HVAC', consumption: 45 },
  { name: 'Iluminación', consumption: 25 },
  { name: 'Equipos', consumption: 20 },
  { name: 'Elevadores', consumption: 10 },
];

const useAnimations = () => {
  useEffect(() => {
    const id = 'module-animations-energy';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @keyframes fadeSlideUp { 
        from { opacity: 0; transform: translateY(18px); } 
        to { opacity: 1; transform: translateY(0); } 
      }
      .anim-fade-up {
        animation: fadeSlideUp 0.5s ease-out forwards;
      }
    `;
    document.head.appendChild(style);
  }, []);
};

export const EnergyRisk: React.FC = () => {
  useAnimations();
  const [shiftLoad, setShiftLoad] = useState(15);
  const [activeTab, setActiveTab] = useState('heatmap');

  const savings = Math.round(shiftLoad * 826.6); // mock calc

  return (
    <div style={{ maxWidth: 1200, display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* HEADER */}
      <div className="anim-fade-up" style={{ 
        background: colores.fondoPrincipal, 
        border: `1px solid ${colores.borde}`, 
        borderRadius: '22px', 
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        borderLeft: `4px solid ${tema.acento}`
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: '16px',
          background: `linear-gradient(135deg, ${tema.acento} 0%, ${tema.acentoOscuro} 100%)`,
          display: 'flex', justifyContent: 'center', alignItems: 'center', color: tema.sobreAcento
        }}>
          <Zap size={32} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
            <h1 style={{ margin: 0, fontSize: 24, color: colores.textoClaro, fontWeight: 700 }}>Riesgo Energético y Consumo</h1>
            <span style={{ background: tema.acentoSuave, color: tema.acentoOscuro, padding: '4px 10px', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>LIVE</span>
          </div>
          <p style={{ margin: 0, color: colores.textoMedio }}>Monitoreo 24/7 de consumo, tarifas punta y optimización de carga.</p>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {kpis.map((kpi, i) => (
          <div key={i} className="anim-fade-up" style={{ 
            background: colores.fondoPrincipal, border: `1px solid ${colores.borde}`, borderRadius: '18px', padding: 20,
            borderTop: `4px solid ${kpi.alert ? colores.peligro : tema.acento}`, boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            animationDelay: `${i * 0.05}s`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: colores.textoOscuro, textTransform: 'uppercase' }}>{kpi.label}</span>
              <kpi.icon size={18} color={kpi.alert ? colores.peligro : tema.acento} />
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: colores.textoClaro, marginBottom: 8 }}>{kpi.value}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: kpi.trend.startsWith('+') && !kpi.alert ? colores.exito : (kpi.alert ? colores.peligro : colores.textoMedio) }}>
              {kpi.trend.startsWith('+') ? <TrendingDown size={14} style={{transform: 'rotate(180deg)'}}/> : <TrendingDown size={14} />}
              <span>{kpi.trend} vs mes anterior</span>
            </div>
          </div>
        ))}
      </div>

      {/* AI INSIGHT */}
      <div className="anim-fade-up" style={{ 
        background: `linear-gradient(110deg, ${tema.acento}08 0%, transparent 60%)`,
        border: `1px solid ${tema.acento}30`, borderRadius: '18px', padding: 20, display: 'flex', gap: 16, alignItems: 'flex-start'
      }}>
        <div style={{ background: tema.acentoSuave, padding: 10, borderRadius: 12, color: tema.acentoOscuro }}>
          <Sparkles size={24} />
        </div>
        <div>
          <h3 style={{ margin: '0 0 4px 0', fontSize: 16, color: tema.acentoOscuro, fontWeight: 600 }}>Insight de MAYIA · IA</h3>
          <p style={{ margin: 0, fontSize: 14, color: colores.textoMedio }}>El algoritmo detecta un pico anómalo de consumo en HVAC de 14:00 a 16:00. Mover el 15% de esta carga (pre-enfriamiento) a horas valle (06:00 - 08:00) reduciría la demanda máxima en 45kW.</p>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${colores.borde}`, marginBottom: 4 }}>
        {[
          { id: 'heatmap', label: 'Mapa de Calor 7x24' },
          { id: 'simulador', label: 'Simulador de Tarifa' },
          { id: 'sistemas', label: 'Desglose por Sistema' }
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: '12px 24px', background: 'none', border: 'none', borderBottom: `2px solid ${activeTab === tab.id ? tema.acento : 'transparent'}`,
            color: activeTab === tab.id ? tema.acentoOscuro : colores.textoOscuro, fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s'
          }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      {activeTab === 'heatmap' && (
        <div className="anim-fade-up" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
          <div style={{ background: colores.fondoPrincipal, border: `1px solid ${colores.borde}`, borderRadius: '18px', padding: 20 }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: 16, color: colores.textoClaro }}>Demanda por Hora</h3>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlyData}>
                  <defs>
                    <linearGradient id="colorHw" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={tema.acento} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={tema.acento} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colores.borde} />
                  <XAxis dataKey="time" stroke={colores.textoOscuro} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke={colores.textoOscuro} fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: 12, border: `1px solid ${colores.borde}`, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="hw" stroke={tema.acento} fillOpacity={1} fill="url(#colorHw)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div style={{ background: colores.fondoPrincipal, border: `1px solid ${colores.borde}`, borderRadius: '18px', padding: 20 }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: 16, color: colores.textoClaro }}>Distribución de Carga</h3>
             <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={systemData} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={colores.borde} />
                  <XAxis type="number" stroke={colores.textoOscuro} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis type="category" dataKey="name" stroke={colores.textoOscuro} fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: 12, border: `1px solid ${colores.borde}` }} />
                  <Bar dataKey="consumption" fill={tema.acento} radius={[0, 4, 4, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'simulador' && (
        <div className="anim-fade-up" style={{ background: colores.fondoPrincipal, border: `1px solid ${colores.borde}`, borderRadius: '18px', padding: 24 }}>
           <h3 style={{ margin: '0 0 8px 0', fontSize: 18, color: colores.textoClaro }}>Simulador de Optimización de Tarifa GDMTH</h3>
           <p style={{ margin: '0 0 24px 0', color: colores.textoMedio }}>Ajusta el porcentaje de carga a desplazar de horario punta a base/intermedio.</p>
           
           <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
             <div style={{ flex: 1, padding: 24, background: colores.fondoSecundario, borderRadius: 16 }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                 <span style={{ fontWeight: 600, color: colores.textoClaro }}>Desplazar Carga (Load Shifting)</span>
                 <span style={{ fontWeight: 700, color: tema.acentoOscuro }}>{shiftLoad}%</span>
               </div>
               <input 
                 type="range" 
                 min="0" max="30" 
                 value={shiftLoad} 
                 onChange={(e) => setShiftLoad(parseInt(e.target.value))}
                 style={{ width: '100%', accentColor: tema.acento, cursor: 'pointer' }}
               />
               <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12, color: colores.textoOscuro }}>
                 <span>0%</span>
                 <span>Máx Viable 30%</span>
               </div>
             </div>
             
             <div style={{ flex: 1, background: `linear-gradient(135deg, ${tema.acento} 0%, ${tema.acentoOscuro} 100%)`, borderRadius: 16, padding: 24, color: tema.sobreAcento }}>
                <div style={{ fontSize: 14, opacity: 0.9, marginBottom: 8 }}>Ahorro Mensual Estimado</div>
                <div style={{ fontSize: 42, fontWeight: 800, marginBottom: 8 }}>${savings.toLocaleString()} <span style={{ fontSize: 20, fontWeight: 500 }}>MXN</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, background: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: 20, width: 'fit-content' }}>
                  <Sparkles size={14} /> Aplicando algoritmos AI
                </div>
             </div>
           </div>
        </div>
      )}
    </div>
  );
};
