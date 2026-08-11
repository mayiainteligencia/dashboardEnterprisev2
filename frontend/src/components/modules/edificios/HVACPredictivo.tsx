import React, { useState, useEffect } from 'react';
import { Wind, Thermometer, Activity, Zap, DollarSign, Settings, TrendingDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { brandingConfig } from '../../../config/branding';

const { colores } = brandingConfig;

const tema = {
  acento: '#10B981',
  acentoOscuro: '#047857',
  acentoSuave: '#D1FAE5',
  sobreAcento: '#FFFFFF',
};

const sensorData = [
  { time: '08:00', tempIn: 22.5, tempOut: 25.1, hum: 45 },
  { time: '10:00', tempIn: 22.8, tempOut: 27.5, hum: 44 },
  { time: '12:00', tempIn: 23.2, tempOut: 30.2, hum: 42 },
  { time: '14:00', tempIn: 23.5, tempOut: 32.8, hum: 40 },
  { time: '16:00', tempIn: 23.4, tempOut: 31.5, hum: 43 },
  { time: '18:00', tempIn: 22.9, tempOut: 28.0, hum: 45 },
];

const costData = [
  { month: 'Ene', preventivo: 12000, correctivo: 45000 },
  { month: 'Feb', preventivo: 15000, correctivo: 25000 },
  { month: 'Mar', preventivo: 18000, correctivo: 12000 },
  { month: 'Abr', preventivo: 20000, correctivo: 8000 },
  { month: 'May', preventivo: 19000, correctivo: 9000 },
];

const useAnimations = () => {
  useEffect(() => {
    const id = 'module-animations-hvac';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
    `;
    document.head.appendChild(style);
  }, []);
};

export const HVACPredictivo: React.FC = () => {
  useAnimations();
  const [sliderValue, setSliderValue] = useState(500);

  const ahorro = Math.round((2000 - sliderValue) * 85);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24, padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      
      {/* HEADER */}
      <div style={{ background: colores.fondoPrincipal, borderRadius: 20, padding: 24, border: `1px solid ${colores.borde}`, position: 'relative', overflow: 'hidden', boxShadow: colores.sombra, animation: 'fadeSlideUp 0.5s ease-out' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: `linear-gradient(to bottom, ${tema.acento}, ${tema.acentoOscuro})` }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: `linear-gradient(135deg, ${tema.acentoSuave}, ${colores.fondoPrincipal})`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${tema.acentoSuave}` }}>
            <Wind size={32} color={tema.acento} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
              <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: colores.textoClaro }}>HVAC & Mantenimiento Predictivo</h1>
            </div>
            <p style={{ margin: 0, color: colores.textoMedio, fontSize: 15 }}>Telemetría de equipos críticos y cálculo de ROI para mantenimientos preventivos.</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {/* KPI Cards */}
        {[
          { label: 'Eficiencia Energética', val: '8.4 kW/TR', icon: Zap, color: '#F59E0B' },
          { label: 'Temperatura Promedio', val: '22.8 °C', icon: Thermometer, color: '#3B82F6' },
          { label: 'Vibración Chiller 1', val: '0.45 in/s', icon: Activity, color: '#10B981' },
        ].map((kpi, i) => (
          <div key={i} style={{ background: colores.fondoPrincipal, borderRadius: 16, padding: 20, border: `1px solid ${colores.borde}`, animation: `fadeSlideUp 0.5s ease-out ${i * 0.05}s backwards` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <kpi.icon size={20} color={kpi.color} />
              <span style={{ fontSize: 13, fontWeight: 600, color: colores.textoOscuro }}>{kpi.label}</span>
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: colores.textoClaro }}>{kpi.val}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* ROI CALCULATOR */}
        <div style={{ background: colores.fondoPrincipal, borderRadius: 20, padding: 24, border: `1px solid ${colores.borde}`, animation: 'fadeSlideUp 0.5s ease-out 0.2s backwards' }}>
          <h3 style={{ margin: '0 0 24px 0', fontSize: 18, color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: 10 }}>
            <DollarSign size={20} color={tema.acento} /> Calculadora ROI Preventivo
          </h3>
          
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 14, color: colores.textoMedio, marginBottom: 12 }}>
              Horas operadas antes de mantenimiento: <strong style={{ color: colores.textoClaro }}>{sliderValue} h</strong>
            </label>
            <input 
              type="range" 
              min="100" max="2000" step="50"
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              style={{ width: '100%', accentColor: tema.acento }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: colores.textoOscuro, marginTop: 8 }}>
              <span>100h (Agresivo)</span>
              <span>2000h (Laxo)</span>
            </div>
          </div>

          <div style={{ background: '#F8FAFC', borderRadius: 12, padding: 20, border: '1px dashed #CBD5E1', textAlign: 'center' }}>
            <div style={{ fontSize: 14, color: colores.textoMedio, marginBottom: 4 }}>Ahorro estimado anual vs Correctivo</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: tema.acento }}>
              $ {ahorro.toLocaleString('es-MX')} MXN
            </div>
            <div style={{ fontSize: 12, color: colores.textoOscuro, marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              <TrendingDown size={14} /> Reducción de downtime estimada en {Math.round((2000 - sliderValue)/100)}%
            </div>
          </div>
        </div>

        {/* CHARTS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ background: colores.fondoPrincipal, borderRadius: 20, padding: 20, border: `1px solid ${colores.borde}` }}>
            <h4 style={{ margin: '0 0 16px 0', fontSize: 14, color: colores.textoClaro }}>Temperaturas (Interior vs Exterior)</h4>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sensorData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colores.borde} />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: colores.textoOscuro, fontSize: 11}} />
                  <YAxis domain={['auto', 'auto']} axisLine={false} tickLine={false} tick={{fill: colores.textoOscuro, fontSize: 11}} />
                  <Tooltip contentStyle={{borderRadius: 8, border: 'none', boxShadow: colores.sombraMedia}} />
                  <Legend iconType="circle" wrapperStyle={{fontSize: 12}} />
                  <Line name="Interior °C" type="monotone" dataKey="tempIn" stroke={tema.acento} strokeWidth={3} dot={false} />
                  <Line name="Exterior °C" type="monotone" dataKey="tempOut" stroke="#F59E0B" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ background: colores.fondoPrincipal, borderRadius: 20, padding: 20, border: `1px solid ${colores.borde}` }}>
            <h4 style={{ margin: '0 0 16px 0', fontSize: 14, color: colores.textoClaro }}>Costos: Preventivo vs Correctivo</h4>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={costData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colores.borde} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: colores.textoOscuro, fontSize: 11}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: colores.textoOscuro, fontSize: 11}} />
                  <Tooltip contentStyle={{borderRadius: 8, border: 'none', boxShadow: colores.sombraMedia}} />
                  <Legend iconType="circle" wrapperStyle={{fontSize: 12}} />
                  <Bar name="Preventivo" dataKey="preventivo" fill={tema.acento} radius={[4,4,0,0]} />
                  <Bar name="Correctivo" dataKey="correctivo" fill="#EF4444" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
