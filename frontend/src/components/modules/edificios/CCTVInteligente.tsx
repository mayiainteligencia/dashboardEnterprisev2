import React, { useState, useEffect } from 'react';
import { Video, Shield, AlertTriangle, Eye, ZoomIn, ZoomOut, Maximize2, X, Sparkles, Crosshair } from 'lucide-react';
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { brandingConfig } from '../../../config/branding';

const { colores } = brandingConfig;

const tema = {
  acento: '#10B981',
  acentoOscuro: '#047857',
  acentoSuave: '#D1FAE5',
  sobreAcento: '#FFFFFF',
};

const mockDataHourly = [
  { time: '00:00', eventos: 2 },
  { time: '04:00', eventos: 1 },
  { time: '08:00', eventos: 15 },
  { time: '12:00', eventos: 28 },
  { time: '16:00', eventos: 24 },
  { time: '20:00', eventos: 8 },
  { time: '24:00', eventos: 3 },
];

const mockDataTypes = [
  { name: 'Intrusión', value: 45, color: tema.acento },
  { name: 'Merodeo', value: 30, color: '#F59E0B' },
  { name: 'Objeto Abandonado', value: 15, color: '#3B82F6' },
  { name: 'Multitud', value: 10, color: '#8B5CF6' },
];

const cameras = [
  { id: 'CAM-01', name: 'Acceso Principal', location: 'Lobby', status: 'active', aiDetect: 'Merodeo 94%', boxes: [{x: 20, y: 30, w: 15, h: 40}] },
  { id: 'CAM-02', name: 'Estacionamiento Norte', location: 'Exterior', status: 'active', aiDetect: 'Intrusión 98%', boxes: [{x: 60, y: 50, w: 10, h: 20}] },
  { id: 'CAM-03', name: 'Pasillo Site IT', location: 'Piso 2', status: 'active', aiDetect: 'Normal', boxes: [] },
  { id: 'CAM-04', name: 'Almacén Insumos', location: 'Sótano 1', status: 'active', aiDetect: 'Objeto 85%', boxes: [{x: 40, y: 70, w: 20, h: 20}] },
  { id: 'CAM-05', name: 'Terraza Ejecutiva', location: 'Piso 15', status: 'active', aiDetect: 'Multitud 88%', boxes: [{x: 10, y: 20, w: 80, h: 60}] },
  { id: 'CAM-06', name: 'Comedor Empleados', location: 'Piso 5', status: 'active', aiDetect: 'Normal', boxes: [] },
];

const useAnimations = () => {
  useEffect(() => {
    const id = 'module-animations';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      @keyframes radar { 0% { transform: scale(0.8); opacity: 1; } 100% { transform: scale(2); opacity: 0; } }
    `;
    document.head.appendChild(style);
  }, []);
};

export const CCTVInteligente: React.FC = () => {
  useAnimations();
  const [activeTab, setActiveTab] = useState('grid');
  const [zoomedCam, setZoomedCam] = useState<typeof cameras[0] | null>(null);

  const kpis = [
    { label: 'Cámaras Activas', value: '142', sub: 'De 145 instaladas', icon: Video, color: tema.acento },
    { label: 'Eventos Hoy', value: '84', sub: '+12% vs ayer', icon: Eye, color: '#3B82F6' },
    { label: 'Alertas Críticas', value: '3', sub: 'Requieren atención', icon: AlertTriangle, color: colores.peligro },
    { label: 'Precisión IA', value: '98.5%', sub: 'Falsos positivos < 2%', icon: Shield, color: '#8B5CF6' },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24, padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      
      {/* HEADER */}
      <div style={{ background: colores.fondoPrincipal, borderRadius: 20, padding: 24, border: `1px solid ${colores.borde}`, position: 'relative', overflow: 'hidden', boxShadow: colores.sombra, animation: 'fadeSlideUp 0.5s ease-out' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: `linear-gradient(to bottom, ${tema.acento}, ${tema.acentoOscuro})` }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: `linear-gradient(135deg, ${tema.acentoSuave}, ${colores.fondoPrincipal})`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${tema.acentoSuave}` }}>
            <Video size={32} color={tema.acento} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
              <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: colores.textoClaro }}>CCTV & Analítica AI</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#DC262620', padding: '4px 10px', borderRadius: 20, color: '#DC2626', fontSize: 12, fontWeight: 600 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#DC2626', animation: 'pulse 2s infinite' }} />
                LIVE
              </div>
            </div>
            <p style={{ margin: 0, color: colores.textoMedio, fontSize: 15 }}>Monitoreo inteligente con detección de anomalías y reconocimiento de patrones en tiempo real.</p>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
        {kpis.map((kpi, i) => (
          <div key={i} style={{ background: colores.fondoPrincipal, borderRadius: 18, padding: 20, border: `1px solid ${colores.borde}`, position: 'relative', overflow: 'hidden', animation: `fadeSlideUp 0.5s ease-out ${i * 0.05}s backwards` }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: kpi.color }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: colores.textoOscuro, textTransform: 'uppercase', letterSpacing: 0.5 }}>{kpi.label}</span>
              <kpi.icon size={20} color={kpi.color} />
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: colores.textoClaro, marginBottom: 4 }}>{kpi.value}</div>
            <div style={{ fontSize: 13, color: colores.textoMedio }}>{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* AI INSIGHT */}
      <div style={{ background: `linear-gradient(110deg, ${tema.acento}10 0%, ${colores.fondoPrincipal} 60%)`, borderRadius: 18, padding: 20, border: `1px solid ${tema.acento}30`, display: 'flex', gap: 16, alignItems: 'flex-start', animation: 'fadeSlideUp 0.5s ease-out 0.2s backwards' }}>
        <div style={{ background: tema.acentoSuave, padding: 10, borderRadius: 12 }}>
          <Sparkles size={24} color={tema.acentoOscuro} />
        </div>
        <div>
          <h4 style={{ margin: '0 0 4px 0', fontSize: 14, fontWeight: 700, color: tema.acentoOscuro }}>Insight de MAYIA · IA</h4>
          <p style={{ margin: 0, fontSize: 14, color: colores.textoMedio, lineHeight: 1.5 }}>
            Detección inusual en "Almacén Insumos" (CAM-04). Patrón de merodeo detectado a las 14:32 hrs. El objeto sospechoso ha sido etiquetado. Se recomienda despachar personal de seguridad al Sótano 1.
          </p>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', gap: 20, borderBottom: `1px solid ${colores.borde}`, paddingBottom: 0 }}>
        {['grid', 'analytics'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 4px', background: 'none', border: 'none', borderBottom: `3px solid ${activeTab === tab ? tema.acento : 'transparent'}`,
              color: activeTab === tab ? tema.acentoOscuro : colores.textoMedio, fontWeight: 600, fontSize: 14, cursor: 'pointer', textTransform: 'capitalize'
            }}
          >
            {tab === 'grid' ? 'Mosaico de Cámaras' : 'Analítica de Eventos'}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      {activeTab === 'grid' && (
        <div style={{ position: 'relative' }}>
          {zoomedCam ? (
            <div style={{ background: '#111827', borderRadius: 20, overflow: 'hidden', position: 'relative', height: 600, animation: 'fadeSlideUp 0.3s ease-out' }}>
              <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, display: 'flex', gap: 10 }}>
                <div style={{ background: '#000000AA', padding: '6px 12px', borderRadius: 8, color: '#FFF', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', animation: 'pulse 2s infinite' }} />
                  {zoomedCam.id} - {zoomedCam.name}
                </div>
                {zoomedCam.aiDetect !== 'Normal' && (
                  <div style={{ background: '#DC2626AA', padding: '6px 12px', borderRadius: 8, color: '#FFF', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Crosshair size={16} /> AI: {zoomedCam.aiDetect}
                  </div>
                )}
              </div>
              <button 
                onClick={() => setZoomedCam(null)}
                style={{ position: 'absolute', top: 20, right: 20, zIndex: 10, background: '#000000AA', border: '1px solid #333', color: '#FFF', width: 40, height: 40, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
              
              {/* Simulated Feed */}
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #1F2937, #111827)', position: 'relative', backgroundImage: 'radial-gradient(#374151 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                {zoomedCam.boxes.map((box, i) => (
                  <div key={i} style={{ position: 'absolute', top: `${box.y}%`, left: `${box.x}%`, width: `${box.w}%`, height: `${box.h}%`, border: '2px solid #EF4444', backgroundColor: '#EF444420' }}>
                    <div style={{ position: 'absolute', top: -24, left: -2, background: '#EF4444', color: '#FFF', fontSize: 12, padding: '2px 6px', fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {zoomedCam.aiDetect}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {cameras.map((cam, i) => (
                <div 
                  key={cam.id} 
                  style={{ background: '#111827', borderRadius: 16, overflow: 'hidden', position: 'relative', height: 220, cursor: 'pointer', border: `1px solid ${cam.aiDetect !== 'Normal' ? '#EF4444' : '#374151'}`, animation: `fadeSlideUp 0.5s ease-out ${i * 0.05}s backwards` }}
                  onClick={() => setZoomedCam(cam)}
                >
                  <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 10, display: 'flex', gap: 8 }}>
                    <div style={{ background: '#000000AA', padding: '4px 8px', borderRadius: 6, color: '#FFF', fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', animation: 'pulse 2s infinite' }} />
                      {cam.id}
                    </div>
                  </div>
                  {cam.aiDetect !== 'Normal' && (
                    <div style={{ position: 'absolute', bottom: 12, left: 12, zIndex: 10, background: '#EF4444CC', padding: '4px 8px', borderRadius: 6, color: '#FFF', fontSize: 11, fontWeight: 600 }}>
                      ⚠️ {cam.aiDetect}
                    </div>
                  )}
                  <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 10, background: '#000000AA', padding: 4, borderRadius: 6, color: '#FFF' }}>
                    <Maximize2 size={14} />
                  </div>
                  
                  {/* Feed mock */}
                  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1F2937, #0F172A)', position: 'relative' }}>
                    {cam.boxes.map((box, idx) => (
                      <div key={idx} style={{ position: 'absolute', top: `${box.y}%`, left: `${box.x}%`, width: `${box.w}%`, height: `${box.h}%`, border: '1px solid #EF4444' }} />
                    ))}
                  </div>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 12px 12px', background: 'linear-gradient(to top, #000000DD, transparent)' }}>
                    <div style={{ color: '#FFF', fontSize: 13, fontWeight: 500 }}>{cam.name}</div>
                    <div style={{ color: '#9CA3AF', fontSize: 11 }}>{cam.location}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'analytics' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
          <div style={{ background: colores.fondoPrincipal, borderRadius: 20, padding: 24, border: `1px solid ${colores.borde}` }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: 16, color: colores.textoClaro }}>Frecuencia de Eventos (24h)</h3>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockDataHourly}>
                  <defs>
                    <linearGradient id="colorEventos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={tema.acento} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={tema.acento} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colores.borde} />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: colores.textoOscuro, fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: colores.textoOscuro, fontSize: 12}} />
                  <Tooltip contentStyle={{borderRadius: 12, border: 'none', boxShadow: colores.sombraMedia}} />
                  <Area type="monotone" dataKey="eventos" stroke={tema.acento} strokeWidth={3} fillOpacity={1} fill="url(#colorEventos)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div style={{ background: colores.fondoPrincipal, borderRadius: 20, padding: 24, border: `1px solid ${colores.borde}` }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: 16, color: colores.textoClaro }}>Distribución por Tipo</h3>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={mockDataTypes} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {mockDataTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{borderRadius: 12, border: 'none', boxShadow: colores.sombraMedia}} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
              {mockDataTypes.map(t => (
                <div key={t.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: t.color }} />
                    <span style={{ fontSize: 14, color: colores.textoMedio }}>{t.name}</span>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: colores.textoClaro }}>{t.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
