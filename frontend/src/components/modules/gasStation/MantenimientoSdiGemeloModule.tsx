import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Server,
  Wrench,
  AlertTriangle,
  CheckCircle,
  Box,
  Zap,
  Activity,
  History,
  Bell,
  Wifi,
  ShieldAlert
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import { brandingConfig } from '../../../config/branding';
import { EQUIPOS_SALUD, SDI_NODOS } from '../../../gasStation/gasStationData';

const RUL_DEGRADATION_DATA = [
  { month: 'Ene', bomba1: 99, bomba2: 98, totem: 100 },
  { month: 'Feb', bomba1: 97, bomba2: 96, totem: 99 },
  { month: 'Mar', bomba1: 95, bomba2: 94, totem: 99 },
  { month: 'Abr', bomba1: 91, bomba2: 92, totem: 98 },
  { month: 'May', bomba1: 88, bomba2: 89, totem: 98 },
  { month: 'Jun', bomba1: 85, bomba2: 86, totem: 97 },
];

export const MantenimientoSdiGemeloModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [selectedElemento, setSelectedElemento] = useState<string | null>('Dispensario Bomba #1-2');
  
  const [simData, setSimData] = useState({
    cpu1: 22, ram1: 34, cpu2: 14, ram2: 28, 
    latencia1: 2.4, latencia2: 3.1, 
    vib1: 0.8, vib2: 1.1
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSimData(prev => ({
        cpu1: Math.max(10, Math.min(90, prev.cpu1 + (Math.random() * 10 - 5))),
        ram1: Math.max(20, Math.min(85, prev.ram1 + (Math.random() * 4 - 2))),
        cpu2: Math.max(5, Math.min(50, prev.cpu2 + (Math.random() * 6 - 3))),
        ram2: Math.max(15, Math.min(60, prev.ram2 + (Math.random() * 4 - 2))),
        latencia1: Math.max(1.0, Math.min(5.0, prev.latencia1 + (Math.random() * 0.8 - 0.4))),
        latencia2: Math.max(2.0, Math.min(8.0, prev.latencia2 + (Math.random() * 1.2 - 0.6))),
        vib1: Math.max(0.4, Math.min(2.0, prev.vib1 + (Math.random() * 0.2 - 0.1))),
        vib2: Math.max(0.6, Math.min(2.5, prev.vib2 + (Math.random() * 0.3 - 0.15))),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const GaugeCircle = ({ value, color }: { value: number, color: string }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value / 100) * circumference;
    return (
      <div style={{ position: 'relative', width: '80px', height: '80px' }}>
        <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#E2E8F0" strokeWidth="8" />
          <circle 
            cx="50" cy="50" r={radius} fill="none" stroke={color} strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
            strokeLinecap="round"
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <span className="gs-number" style={{ fontSize: '18px', fontWeight: 'bold', color: colores.textoClaro }}>{Math.round(value)}%</span>
        </div>
      </div>
    );
  };

  const WaveChart = ({ value }: { value: number }) => {
    const offset = value * 10;
    return (
      <svg width="100%" height="40" viewBox="0 0 100 40">
        <path 
          d={`M 0 20 Q 12.5 ${20 - offset}, 25 20 T 50 20 T 75 20 T 100 20`} 
          fill="none" 
          stroke={colores.cianNeon} 
          strokeWidth="2" 
          className="animate-wave-surface"
        />
      </svg>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* ── HEADER DEL MÓDULO ── */}
      <div className="gs-module-card animate-slide-up-card"
        style={{
          background: `linear-gradient(135deg, ${colores.azulMarino} 0%, #1E293B 100%)`,
          borderRadius: '24px', padding: '24px 30px', color: '#FFFFFF',
          position: 'relative', overflow: 'hidden',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.2)',
        }}
      >
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.1, zIndex: 0 }}>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#FFFFFF"/>
            <path d="M 2 2 L 42 42" stroke="#FFFFFF" strokeWidth="0.5" className="animate-pulse" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', zIndex: 1 }}>
          <div className="animate-float"
            style={{
              width: '64px', height: '64px', borderRadius: '16px',
              background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 18px rgba(37, 99, 235, 0.4)',
            }}
          >
            <Box size={32} color="#FFFFFF" className="animate-spin-slow" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '900', letterSpacing: '-0.4px' }}>
                Mantenimiento Predictivo & Gemelo Digital
              </h1>
              <span className="shimmer-badge" style={{ backgroundColor: 'rgba(37, 99, 235, 0.25)', border: '1px solid rgba(37, 99, 235, 0.6)', color: '#93C5FD' }}>
                SDI EDGE ACTIVO
              </span>
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#94A3B8' }}>
              Salud de hardware en tiempo real, predicción RUL y red orquestada
            </p>
          </div>
        </div>
      </div>

      {/* ── 1. GEMELO DIGITAL ISOMÉTRICO ── */}
      <div className="gs-module-card animate-slide-up-card delay-1 gs-glass-dark" style={{ padding: '24px', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Box size={20} color="#38BDF8" />
              Gemelo Digital 3D de la Estación
            </h3>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#94A3B8' }}>Telemetría espacial en vivo. Selecciona un componente.</p>
          </div>
        </div>

        <div style={{
          height: '350px', backgroundColor: '#0F172A', borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden'
        }}>
          {/* Isometric Grid Background */}
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
            <pattern id="iso-grid" width="60" height="30" patternUnits="userSpaceOnUse" patternTransform="scale(1) translate(0, 0)">
              <path d="M30 0 L60 15 L30 30 L0 15 Z" fill="none" stroke="#FFFFFF" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#iso-grid)"/>
          </svg>

          {/* Interactive Elements SVG */}
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
            {/* Tanques */}
            <g transform="translate(150, 200)" onClick={() => setSelectedElemento('Tanques Subterráneos')} style={{ cursor: 'pointer' }}>
              <ellipse cx="0" cy="0" rx="40" ry="20" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
              <path d="M-40 0 L-40 -60 A40 20 0 0 0 40 -60 L40 0" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
              <ellipse cx="0" cy="-60" rx="40" ry="20" fill="rgba(56,189,248,0.2)" stroke="#38BDF8" strokeWidth="2" />
              {selectedElemento === 'Tanques Subterráneos' && <circle cx="0" cy="-30" r="4" fill="#10B981" className="animate-ping" />}
            </g>

            {/* Dispensario 1 */}
            <g transform="translate(400, 150)" onClick={() => setSelectedElemento('Dispensario Bomba #1-2')} style={{ cursor: 'pointer' }}>
              <rect x="-20" y="-80" width="40" height="80" fill="#1E293B" stroke={selectedElemento === 'Dispensario Bomba #1-2' ? '#38BDF8' : '#64748B'} strokeWidth="2" rx="4"/>
              <rect x="-15" y="-70" width="30" height="20" fill="#000" />
              <circle cx="0" cy="-85" r="4" fill="#10B981" className="pulse-green" />
            </g>

            {/* Dispensario 2 */}
            <g transform="translate(550, 150)" onClick={() => setSelectedElemento('Dispensario Bomba #3-4')} style={{ cursor: 'pointer' }}>
              <rect x="-20" y="-80" width="40" height="80" fill="#1E293B" stroke={selectedElemento === 'Dispensario Bomba #3-4' ? '#38BDF8' : '#64748B'} strokeWidth="2" rx="4"/>
              <rect x="-15" y="-70" width="30" height="20" fill="#000" />
              <circle cx="0" cy="-85" r="4" fill="#10B981" className="pulse-green" />
            </g>

            {/* Dispensario Diesel */}
            <g transform="translate(700, 150)" onClick={() => setSelectedElemento('Dispensario Diésel #5-6')} style={{ cursor: 'pointer' }}>
              <rect x="-20" y="-80" width="40" height="80" fill="#1E293B" stroke={selectedElemento === 'Dispensario Diésel #5-6' ? '#38BDF8' : '#64748B'} strokeWidth="2" rx="4"/>
              <rect x="-15" y="-70" width="30" height="20" fill="#000" />
              <circle cx="0" cy="-85" r="4" fill="#F59E0B" className="pulse-amber" />
            </g>

            {/* Totem */}
            <g transform="translate(100, 100)" onClick={() => setSelectedElemento('Tótem Principal LED')} style={{ cursor: 'pointer' }}>
              <rect x="-10" y="-120" width="20" height="120" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
              <rect x="-15" y="-110" width="30" height="60" fill="#38BDF8" className="animate-pulse" />
            </g>
          </svg>
        </div>

        {selectedElemento && (
          <div className="animate-fade-up" style={{ marginTop: '16px', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '12px' }}>Inspeccionando:</div>
              <div style={{ color: '#38BDF8', fontSize: '16px', fontWeight: 'bold' }}>{selectedElemento}</div>
            </div>
            <button style={{ background: '#2563EB', color: '#FFF', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
              Correr Diagnóstico
            </button>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '24px' }}>
        
        {/* ── 2. SALUD DE EQUIPOS (RUL) ── */}
        <div className="gs-module-card animate-slide-up-card delay-2 gs-glass">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Wrench size={20} color={colores.primario} />
              Mantenimiento Predictivo (RUL)
            </h3>
            <span className="gs-badge-ok">Estado General: Óptimo</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {EQUIPOS_SALUD.map((eq, i) => (
              <div key={i} className="gs-kpi-cell animate-fade-up" style={{ animationDelay: `${i*100}ms` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ fontWeight: '700', color: colores.textoClaro, fontSize: '14px' }}>{eq.equipo}</div>
                  <div className={eq.salud < 90 ? 'gs-badge-warn' : 'gs-badge-ok'}>{eq.proximoMto}</div>
                </div>
                
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                  <GaugeCircle value={eq.salud} color={eq.salud < 90 ? '#F59E0B' : '#10B981'} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', color: colores.textoMedio, marginBottom: '4px' }}>Vibración / Termografía</div>
                    <WaveChart value={eq.salud < 90 ? simData.vib2 : simData.vib1} />
                    <div style={{ fontSize: '11px', color: colores.textoOscuro, marginTop: '4px' }}>Amplitud: {eq.salud < 90 ? simData.vib2.toFixed(2) : simData.vib1.toFixed(2)} mm/s</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3. NODOS SDI EDGE ── */}
        <div className="gs-module-card animate-slide-up-card delay-3" style={{ background: '#0F172A', color: '#FFF' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Server size={20} color="#38BDF8" />
              Nodos SDI Edge
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div className="pulse-green" style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }}/>
              <span style={{ fontSize: '12px', color: '#10B981' }}>Cluster Sincronizado</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="gs-glass-dark" style={{ padding: '16px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontWeight: 'bold' }}>EDGE-STATION-01 (Master)</span>
                <span style={{ color: '#10B981', fontSize: '14px' }}>{simData.latencia1.toFixed(1)} ms</span>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '4px' }}>CPU: {simData.cpu1.toFixed(0)}%</div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div className="animate-bar-fill" style={{ width: `${simData.cpu1}%`, height: '100%', background: '#38BDF8' }}/>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '4px' }}>RAM: {simData.ram1.toFixed(0)}%</div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div className="animate-bar-fill" style={{ width: `${simData.ram1}%`, height: '100%', background: '#8B5CF6' }}/>
                  </div>
                </div>
              </div>
            </div>

            <div className="gs-glass-dark" style={{ padding: '16px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontWeight: 'bold' }}>EDGE-STATION-02 (Backup 5G)</span>
                <span style={{ color: '#F59E0B', fontSize: '14px' }}>{simData.latencia2.toFixed(1)} ms</span>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '4px' }}>CPU: {simData.cpu2.toFixed(0)}%</div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div className="animate-bar-fill" style={{ width: `${simData.cpu2}%`, height: '100%', background: '#38BDF8' }}/>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '4px' }}>RAM: {simData.ram2.toFixed(0)}%</div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div className="animate-bar-fill" style={{ width: `${simData.ram2}%`, height: '100%', background: '#8B5CF6' }}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. CURVA DE DEGRADACIÓN RUL (CHART) ── */}
      <div className="gs-module-card animate-slide-up-card delay-4 gs-glass">
        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={20} color="#8B5CF6" />
          Proyección de Degradación (RUL AI)
        </h3>
        <div style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={RUL_DEGRADATION_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis domain={[80, 100]} stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
              <RechartsTooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Line type="monotone" dataKey="bomba1" name="Dispensario #1-2" stroke="#10B981" strokeWidth={3} dot={{r:4}} activeDot={{r:6}} />
              <Line type="monotone" dataKey="bomba2" name="Dispensario #5-6" stroke="#F59E0B" strokeWidth={3} dot={{r:4}} activeDot={{r:6}} />
              <Line type="monotone" dataKey="totem" name="Tótem LED" stroke="#38BDF8" strokeWidth={3} dot={{r:4}} activeDot={{r:6}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
