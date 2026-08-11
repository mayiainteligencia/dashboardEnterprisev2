import React, { useState, useEffect } from 'react';
import { Activity, MapPin, Truck, AlertTriangle, Battery, Navigation, Crosshair, Sparkles, TrendingUp, TrendingDown, Clock, ShieldAlert } from 'lucide-react';
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { brandingConfig } from '../../../config/branding';
import MapaMexico from '../../common/MapaMexico';

const { colores } = brandingConfig;

const tema = {
  acento: '#1E40AF',
  acentoOscuro: '#0F172A',
  acentoSuave: '#DBEAFE',
  sobreAcento: '#FFFFFF',
};

const kmData = [
  { time: '06:00', km: 2400 },
  { time: '09:00', km: 5800 },
  { time: '12:00', km: 12500 },
  { time: '15:00', km: 18900 },
  { time: '18:00', km: 23100 },
  { time: '21:00', km: 24850 },
];

const statusData = [
  { name: 'En Ruta', value: 245, color: colores.exito },
  { name: 'Detenido', value: 85, color: colores.advertencia },
  { name: 'Mantenimiento', value: 34, color: colores.peligro },
  { name: 'Disponible', value: 23, color: tema.acento },
];

const alertasData = [
  { id: 'AL-01', vehiculo: 'Unidad 405', tipo: 'Desvío de ruta', severidad: 'Alta', tiempo: 'Hace 4 min', ubicacion: 'Autopista 57, Km 120' },
  { id: 'AL-02', vehiculo: 'Unidad 218', tipo: 'Frenado brusco', severidad: 'Media', tiempo: 'Hace 12 min', ubicacion: 'Av. Constituyentes, CDMX' },
  { id: 'AL-03', vehiculo: 'Unidad 392', tipo: 'Ralentí excesivo', severidad: 'Baja', tiempo: 'Hace 25 min', ubicacion: 'CEDIS Norte' },
  { id: 'AL-04', vehiculo: 'Unidad 104', tipo: 'Pérdida de señal', severidad: 'Alta', tiempo: 'Hace 30 min', ubicacion: 'Carretera Federal 15' },
  { id: 'AL-05', vehiculo: 'Unidad 501', tipo: 'Exceso de velocidad', severidad: 'Alta', tiempo: 'Hace 45 min', ubicacion: 'Libramiento Noroeste' },
];

const fleetVehicles = Array.from({ length: 15 }, (_, i) => ({
  id: `VHL-${100 + i}`,
  driver: ['Carlos Pérez', 'Ana Gómez', 'Luis Martínez', 'María Torres', 'Jorge Ruiz'][i % 5],
  status: ['En Ruta', 'Detenido', 'Mantenimiento', 'Disponible'][i % 4],
  fuel: Math.floor(Math.random() * 60) + 40,
  speed: Math.floor(Math.random() * 80) + 10,
  eta: `${Math.floor(Math.random() * 3) + 1}h ${Math.floor(Math.random() * 60)}m`,
}));

const useAnimations = () => {
  useEffect(() => {
    const id = 'module-animations-fleet';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
      .animate-fade-up { animation: fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      .hover-lift { transition: transform 0.2s ease, box-shadow 0.2s ease; }
      .hover-lift:hover { transform: translateY(-3px); box-shadow: 0 6px 20px rgba(0,0,0,0.08); }
    `;
    document.head.appendChild(style);
  }, []);
};

export const FleetCommand: React.FC = () => {
  useAnimations();
  const [activeTab, setActiveTab] = useState('mapa');
  const [livePulse, setLivePulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLivePulse(p => !p);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const kpis = [
    { label: 'VEHÍCULOS ACTIVOS', value: '387', icon: Truck, trend: '+12 vs ayer', trendUp: true },
    { label: 'KM RECORRIDOS HOY', value: '24,850', icon: Navigation, trend: '+5.2%', trendUp: true },
    { label: 'EFICIENCIA COMBUSTIBLE', value: '8.4 km/L', icon: Battery, trend: '-0.2 km/L', trendUp: false },
    { label: 'ALERTAS ACTIVAS', value: '12', icon: AlertTriangle, trend: '-4 resueltas', trendUp: true },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* HEADER CARD */}
      <div className="animate-fade-up" style={{ background: '#FFFFFF', borderRadius: '20px', border: `1px solid ${colores.borde}`, borderLeft: `6px solid ${tema.acento}`, padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: `linear-gradient(135deg, ${tema.acento} 0%, ${tema.acentoOscuro} 100%)`, width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(30, 64, 175, 0.2)' }}>
            <Crosshair size={32} color={tema.sobreAcento} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <h1 style={{ margin: 0, fontSize: '28px', color: colores.textoClaro, fontWeight: 700, letterSpacing: '-0.5px' }}>Fleet Intelligence Command</h1>
              <span style={{ background: '#FEE2E2', color: '#DC2626', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', animation: livePulse ? 'blink 1.5s ease' : 'none' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#DC2626', display: 'inline-block' }}></span>
                LIVE
              </span>
            </div>
            <p style={{ margin: '4px 0 0 0', color: colores.textoMedio, fontSize: '15px' }}>Centro de comando satelital con monitoreo IA en tiempo real de operaciones de flota.</p>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '14px', color: colores.textoOscuro, fontWeight: 500 }}>Fleet AI Score</div>
          <div style={{ fontSize: '32px', color: tema.acento, fontWeight: 800 }}>94<span style={{ fontSize: '18px', color: colores.textoMedio }}>/100</span></div>
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
          <h3 style={{ margin: '0 0 6px 0', color: tema.acentoOscuro, fontSize: '16px', fontWeight: 700 }}>Insight de MAYIA · IA Predictiva</h3>
          <p style={{ margin: 0, color: colores.textoMedio, fontSize: '14px', lineHeight: 1.5 }}>
            Detectada congestión severa en Autopista 57 (Qro-Mex). <strong>8 unidades</strong> en ruta de impacto. Se ha recalculado y enviado ruta alternativa (Libramiento Norponiente) ahorrando <strong>~45 mins</strong> por unidad. Predicción de disponibilidad para el turno vespertino: 92%.
          </p>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', gap: '32px', borderBottom: `1px solid ${colores.borde}`, paddingBottom: '0' }}>
        {['Mapa', 'Flota', 'Alertas IA', 'Resumen'].map((tab) => (
          <div key={tab} onClick={() => setActiveTab(tab.toLowerCase())} style={{ padding: '12px 4px', cursor: 'pointer', fontSize: '15px', fontWeight: 600, color: activeTab === tab.toLowerCase() ? tema.acento : colores.textoMedio, borderBottom: activeTab === tab.toLowerCase() ? `3px solid ${tema.acento}` : '3px solid transparent', transition: 'all 0.2s' }}>
            {tab}
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ minHeight: '400px' }}>
        {activeTab === 'mapa' && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            {/* MAPA DE MÉXICO RECONSTRUIDO */}
            <div style={{ background: '#FFFFFF', borderRadius: '20px', border: `1px solid ${colores.borde}`, height: '500px', position: 'relative', overflow: 'hidden', padding: '16px', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
              <div style={{ position: 'absolute', top: '16px', left: '20px', zIndex: 10 }}>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: colores.textoClaro }}>Cobertura Logística Satelital BESCO</h4>
                <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: colores.textoMedio }}>Mapa TopoJSON interactivo de los estados de México</p>
              </div>
              <MapaMexico />
            </div>

            {/* CHARTS RIGHT */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ background: '#FFF', borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px', flex: 1 }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', color: colores.textoMedio, fontWeight: 600 }}>STATUS DE LA FLOTA</h4>
                <div style={{ height: '180px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={statusData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} Unidades`, 'Total']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginTop: '12px' }}>
                  {statusData.map((s, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 500, color: colores.textoOscuro }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.color }}></span>
                      {s.name} ({s.value})
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: '#FFF', borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px', flex: 1 }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', color: colores.textoMedio, fontWeight: 600 }}>KILOMETRAJE ACUMULADO HOY</h4>
                <div style={{ height: '160px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={kmData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorKm" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={tema.acento} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={tema.acento} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colores.borde} />
                      <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colores.textoOscuro }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colores.textoOscuro }} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                      <Area type="monotone" dataKey="km" stroke={tema.acento} strokeWidth={3} fillOpacity={1} fill="url(#colorKm)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'alertas ia' && (
          <div style={{ background: '#FFF', borderRadius: '20px', border: `1px solid ${colores.borde}`, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: colores.fondoSecundario, borderBottom: `1px solid ${colores.borde}` }}>
                  <th style={{ padding: '16px', fontSize: '12px', fontWeight: 600, color: colores.textoMedio, textTransform: 'uppercase' }}>ID / Vehículo</th>
                  <th style={{ padding: '16px', fontSize: '12px', fontWeight: 600, color: colores.textoMedio, textTransform: 'uppercase' }}>Tipo de Alerta</th>
                  <th style={{ padding: '16px', fontSize: '12px', fontWeight: 600, color: colores.textoMedio, textTransform: 'uppercase' }}>Ubicación</th>
                  <th style={{ padding: '16px', fontSize: '12px', fontWeight: 600, color: colores.textoMedio, textTransform: 'uppercase' }}>Severidad</th>
                  <th style={{ padding: '16px', fontSize: '12px', fontWeight: 600, color: colores.textoMedio, textTransform: 'uppercase' }}>Tiempo</th>
                </tr>
              </thead>
              <tbody>
                {alertasData.map((alerta, i) => (
                  <tr key={i} className="hover-lift" style={{ borderBottom: `1px solid ${colores.borde}`, cursor: 'pointer', transition: 'background 0.2s' }}>
                    <td style={{ padding: '16px' }}>
                      <div style={{ fontWeight: 600, color: colores.textoClaro }}>{alerta.vehiculo}</div>
                      <div style={{ fontSize: '12px', color: colores.textoOscuro }}>{alerta.id}</div>
                    </td>
                    <td style={{ padding: '16px', fontWeight: 500, color: colores.textoClaro }}>{alerta.tipo}</td>
                    <td style={{ padding: '16px', fontSize: '13px', color: colores.textoMedio }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <MapPin size={14} color={tema.acento} /> {alerta.ubicacion}
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 600, background: alerta.severidad === 'Alta' ? '#FEE2E2' : alerta.severidad === 'Media' ? '#FEF3C7' : '#E0E7FF', color: alerta.severidad === 'Alta' ? '#DC2626' : alerta.severidad === 'Media' ? '#D97706' : '#4338CA' }}>
                        {alerta.severidad}
                      </span>
                    </td>
                    <td style={{ padding: '16px', fontSize: '13px', color: colores.textoOscuro }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> {alerta.tiempo}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {(activeTab === 'flota' || activeTab === 'resumen') && (
           <div style={{ background: '#FFF', borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '40px', textAlign: 'center', color: colores.textoMedio }}>
             Seleccione "Mapa" o "Alertas IA" para visualizar el contenido interactivo.
           </div>
        )}
      </div>

    </div>
  );
};
