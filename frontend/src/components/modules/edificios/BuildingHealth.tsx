import React, { useState, useEffect } from 'react';
import { HeartPulse, Activity, Zap, Wind, Shield, Droplets, ArrowUpRight, TrendingUp } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { brandingConfig } from '../../../config/branding';

const { colores } = brandingConfig;

const tema = {
  acento: '#10B981',
  acentoOscuro: '#047857',
  acentoSuave: '#D1FAE5',
  sobreAcento: '#FFFFFF',
};

const radarData = [
  { subject: 'HVAC', A: 85, fullMark: 100 },
  { subject: 'Eléctrico', A: 92, fullMark: 100 },
  { subject: 'Plomería', A: 78, fullMark: 100 },
  { subject: 'Seguridad', A: 95, fullMark: 100 },
  { subject: 'Elevadores', A: 88, fullMark: 100 },
];

const historyData = [
  { time: 'Lun', score: 82 },
  { time: 'Mar', score: 85 },
  { time: 'Mie', score: 84 },
  { time: 'Jue', score: 89 },
  { time: 'Vie', score: 87 },
  { time: 'Sab', score: 90 },
  { time: 'Dom', score: 87 },
];

const subsystems = [
  { id: 'hvac', label: 'HVAC', icon: Wind, score: 85, color: '#3B82F6' },
  { id: 'elec', label: 'Eléctrico', icon: Zap, score: 92, color: '#F59E0B' },
  { id: 'plum', label: 'Plomería', icon: Droplets, score: 78, color: '#06B6D4' },
  { id: 'sec', label: 'Seguridad', icon: Shield, score: 95, color: '#10B981' },
];

const useAnimations = () => {
  useEffect(() => {
    const id = 'module-animations-health';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes dash { to { stroke-dashoffset: 0; } }
    `;
    document.head.appendChild(style);
  }, []);
};

export const BuildingHealth: React.FC = () => {
  useAnimations();
  const [activeSystem, setActiveSystem] = useState('hvac');

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24, padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      
      {/* HEADER */}
      <div style={{ background: colores.fondoPrincipal, borderRadius: 20, padding: 24, border: `1px solid ${colores.borde}`, position: 'relative', overflow: 'hidden', boxShadow: colores.sombra, animation: 'fadeSlideUp 0.5s ease-out' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: `linear-gradient(to bottom, ${tema.acento}, ${tema.acentoOscuro})` }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: `linear-gradient(135deg, ${tema.acentoSuave}, ${colores.fondoPrincipal})`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${tema.acentoSuave}` }}>
            <HeartPulse size={32} color={tema.acento} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
              <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: colores.textoClaro }}>Salud del Edificio</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#10B98120', padding: '4px 10px', borderRadius: 20, color: '#059669', fontSize: 12, fontWeight: 600 }}>
                ÓPTIMO
              </div>
            </div>
            <p style={{ margin: 0, color: colores.textoMedio, fontSize: 15 }}>Diagnóstico integral de los sistemas críticos de la instalación.</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24 }}>
        
        {/* GAUGE & OVERALL */}
        <div style={{ background: colores.fondoPrincipal, borderRadius: 20, padding: 24, border: `1px solid ${colores.borde}`, display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeSlideUp 0.5s ease-out 0.1s backwards' }}>
          <h3 style={{ margin: '0 0 24px 0', fontSize: 16, color: colores.textoClaro, width: '100%' }}>Índice de Salud General</h3>
          
          <div style={{ position: 'relative', width: 200, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
              <circle cx="50" cy="50" r="45" fill="none" stroke={colores.borde} strokeWidth="8" />
              <circle cx="50" cy="50" r="45" fill="none" stroke={tema.acento} strokeWidth="8" strokeDasharray="283" strokeDashoffset="283" style={{ animation: 'dash 1.5s ease-out forwards', strokeLinecap: 'round' }} />
            </svg>
            <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: 48, fontWeight: 800, color: colores.textoClaro, lineHeight: 1 }}>87</span>
              <span style={{ fontSize: 14, color: colores.textoMedio, fontWeight: 600 }}>/100</span>
            </div>
          </div>
          
          <p style={{ textAlign: 'center', color: colores.textoMedio, fontSize: 14, marginTop: 16 }}>
            El estado general es <strong>Bueno</strong>. Se recomienda revisión preventiva en Plomería en los próximos 15 días.
          </p>
        </div>

        {/* SUBSYSTEMS & CHARTS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {subsystems.map((sub, i) => (
              <div 
                key={sub.id} 
                onClick={() => setActiveSystem(sub.id)}
                style={{ 
                  background: activeSystem === sub.id ? `${sub.color}10` : colores.fondoPrincipal, 
                  borderRadius: 16, padding: 16, border: `1px solid ${activeSystem === sub.id ? sub.color : colores.borde}`, 
                  cursor: 'pointer', transition: 'all 0.2s', animation: `fadeSlideUp 0.5s ease-out ${i * 0.05 + 0.2}s backwards`
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ padding: 8, borderRadius: 10, background: `${sub.color}20`, color: sub.color }}>
                    <sub.icon size={18} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: colores.textoClaro }}>{sub.label}</span>
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, color: sub.color }}>{sub.score}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: colores.fondoPrincipal, borderRadius: 20, padding: 20, border: `1px solid ${colores.borde}` }}>
              <h4 style={{ margin: '0 0 16px 0', fontSize: 14, color: colores.textoClaro }}>Balance de Sistemas</h4>
              <div style={{ height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke={colores.borde} />
                    <PolarAngleAxis dataKey="subject" tick={{fill: colores.textoOscuro, fontSize: 11}} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="Salud" dataKey="A" stroke={tema.acento} fill={tema.acento} fillOpacity={0.5} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{ background: colores.fondoPrincipal, borderRadius: 20, padding: 20, border: `1px solid ${colores.borde}` }}>
              <h4 style={{ margin: '0 0 16px 0', fontSize: 14, color: colores.textoClaro }}>Histórico (7 días)</h4>
              <div style={{ height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colores.borde} />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: colores.textoOscuro, fontSize: 11}} />
                    <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{fill: colores.textoOscuro, fontSize: 11}} />
                    <Tooltip contentStyle={{borderRadius: 8, border: 'none', boxShadow: colores.sombraMedia}} />
                    <Line type="monotone" dataKey="score" stroke={tema.acento} strokeWidth={3} dot={{r: 4, fill: tema.acento, strokeWidth: 2, stroke: '#FFF'}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
