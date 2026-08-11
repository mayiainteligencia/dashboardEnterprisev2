import React, { useState, useEffect } from 'react';
import { 
  Video, Eye, AlertCircle, Activity, Server, Users, 
  MapPin, Clock, Camera, Zap, CheckCircle2, AlertTriangle,
  ShieldAlert, Radio, Mic, Maximize, Play, Search,
  Terminal, Monitor, Database, CloudRain, Cpu, BarChart2,
  Crosshair, Key, BrainCircuit, Filter
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell
} from 'recharts';
import { brandingConfig } from '../../config/branding';

const { colores } = brandingConfig;

const tema = {
  acento: '#F59E0B',
  acentoOscuro: '#B45309',
  acentoSuave: '#FEF3C7',
  sobreAcento: '#1F2937'
};

const mockFeedsInicial = [
  { id: 'CAM-01', location: 'Entrada Principal (Torno)', status: 'online', iaDetect: 'Normal', event: null, coords: {x: 20, y: 30} },
  { id: 'CAM-02', location: 'Estacionamiento Norte B2', status: 'online', iaDetect: 'Vehículo No Reconocido', event: 'warning', coords: {x: 80, y: 15} },
  { id: 'CAM-03', location: 'Data Center - Pasillo Frio', status: 'online', iaDetect: 'Normal', event: null, coords: {x: 45, y: 60} },
  { id: 'CAM-04', location: 'Almacén de Activos 3', status: 'online', iaDetect: 'Movimiento Fuera de Horario', event: 'critical', coords: {x: 10, y: 80} },
  { id: 'CAM-05', location: 'Recepción Corporativa', status: 'online', iaDetect: 'Congestión / Aglomeración', event: 'warning', coords: {x: 30, y: 40} },
  { id: 'CAM-06', location: 'Perímetro Sur - Barda', status: 'offline', iaDetect: 'Pérdida de Señal', event: 'offline', coords: {x: 90, y: 90} }
];

const mockEventosHora = [
  { hora: '08:00', alertas: 12, criticos: 0, incidentes: 1 },
  { hora: '10:00', alertas: 25, criticos: 1, incidentes: 0 },
  { hora: '12:00', alertas: 42, criticos: 0, incidentes: 2 },
  { hora: '14:00', alertas: 38, criticos: 2, incidentes: 1 },
  { hora: '16:00', alertas: 45, criticos: 1, incidentes: 0 },
  { hora: '18:00', alertas: 65, criticos: 5, incidentes: 3 },
  { hora: '20:00', alertas: 27, criticos: 0, incidentes: 0 },
  { hora: '22:00', alertas: 15, criticos: 1, incidentes: 0 },
  { hora: '00:00', alertas: 5, criticos: 0, incidentes: 0 }
];

const mockZonas = [
  { zona: 'Perímetro Ext.', count: 145 },
  { zona: 'Estacionamiento', count: 132 },
  { zona: 'Recepción', count: 95 },
  { zona: 'Almacén', count: 68 },
  { zona: 'Oficinas', count: 48 },
  { zona: 'Data Center', count: 12 }
];

const logEventosInicial = [
  { tiempo: '10:45:22', severity: 'critical', msg: 'Intrusión detectada en Almacén de Activos 3', cam: 'CAM-04' },
  { tiempo: '10:42:15', severity: 'warning', msg: 'Aglomeración de personas (>15) detectada', cam: 'CAM-05' },
  { tiempo: '10:30:05', severity: 'info', msg: 'Reinicio remoto exitoso', cam: 'CAM-01' },
  { tiempo: '10:15:00', severity: 'offline', msg: 'Pérdida de ping prolongada (>5min)', cam: 'CAM-06' },
  { tiempo: '09:55:33', severity: 'warning', msg: 'Vehículo negro placas XYZ-123 sospechoso', cam: 'CAM-02' }
];

const useAnimations = () => {
  useEffect(() => {
    const id = 'monitoreo-animations-v2';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @keyframes fadeSlideUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
      @keyframes recBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
      @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
      @keyframes pulseWarning { 0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(245, 158, 11, 0); } 100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); } }
      @keyframes pulseCritical { 0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.5); } 70% { box-shadow: 0 0 0 15px rgba(239, 68, 68, 0); } 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }
      .cam-feed:hover { transform: scale(1.02); z-index: 10; box-shadow: 0 10px 25px rgba(0,0,0,0.3) !important; cursor: pointer; }
      .log-row { transition: background 0.2s; }
      .log-row:hover { background: rgba(0,0,0,0.02); }
      .tab-hover:hover { color: ${tema.acentoOscuro} !important; background: ${tema.acentoSuave}20; }
    `;
    document.head.appendChild(style);
  }, []);
};

export const CentroMonitoreo: React.FC = () => {
  useAnimations();
  const [activeTab, setActiveTab] = useState('sala-monitoreo');
  const [feeds, setFeeds] = useState(mockFeedsInicial);
  const [alertas24h, setAlertas24h] = useState(247);
  const [eventLogs, setEventLogs] = useState(logEventosInicial);
  const [selectedCam, setSelectedCam] = useState<string | null>(null);

  // Simulación eventos en cámaras tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setFeeds(current => {
        const newFeeds = [...current];
        const randomIdx = Math.floor(Math.random() * newFeeds.length);
        const cam = newFeeds[randomIdx];
        
        if (cam.status !== 'offline') {
          const rnd = Math.random();
          let newEvent: any = null;
          let newDetect = 'Normal';
          let logMsg = '';
          
          if (rnd > 0.90) {
            newEvent = 'critical';
            newDetect = 'Intrusión / Brecha de Perímetro (IA)';
            logMsg = 'Alarma perimetral activada por análisis de video';
            setAlertas24h(prev => prev + 1);
          } else if (rnd > 0.7) {
            newEvent = 'warning';
            const warnings = ['Objeto Abandonado', 'Merodeo Detectado', 'Persona sin Gafete', 'Rostro Desconocido'];
            newDetect = warnings[Math.floor(Math.random() * warnings.length)];
            logMsg = `Alerta IA: ${newDetect}`;
          } else {
            newEvent = null;
            newDetect = 'Normal';
          }
          
          if (newEvent && cam.event !== newEvent) {
            const timeStr = new Date().toLocaleTimeString('es-MX', { hour12: false });
            setEventLogs(prev => [
              { tiempo: timeStr, severity: newEvent, msg: logMsg, cam: cam.id },
              ...prev
            ].slice(0, 15));
          }

          cam.event = newEvent;
          cam.iaDetect = newDetect;
        }
        return newFeeds;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const getBorderColor = (event: string | null) => {
    if (event === 'critical') return '#EF4444';
    if (event === 'warning') return '#F59E0B';
    if (event === 'offline') return '#6B7280';
    return '#10B981';
  };

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'critical': return { bg: '#FEF2F2', color: '#EF4444', icon: <AlertTriangle size={14}/> };
      case 'warning': return { bg: '#FFFBEB', color: '#F59E0B', icon: <AlertCircle size={14}/> };
      case 'offline': return { bg: '#F3F4F6', color: '#6B7280', icon: <Radio size={14}/> };
      default: return { bg: '#ECFDF5', color: '#10B981', icon: <CheckCircle2 size={14}/> };
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* HEADER SECTION */}
      <div style={{
        background: '#fff', borderRadius: '20px', padding: '24px', display: 'flex', alignItems: 'center', gap: '24px',
        boxShadow: colores.sombra, border: `1px solid ${colores.borde}`, borderLeft: `6px solid ${tema.acento}`,
        animation: 'fadeSlideUp 0.6s ease-out'
      }}>
        <div style={{
          width: '72px', height: '72px', borderRadius: '18px',
          background: `linear-gradient(135deg, ${tema.acento}20, ${tema.acento}50)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: tema.acentoOscuro
        }}>
          <Camera size={40} strokeWidth={1.5} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '6px' }}>
            <h1 style={{ margin: 0, fontSize: '26px', color: colores.textoClaro, fontWeight: '700' }}>Centro de Monitoreo NOC/SOC</h1>
            <span style={{
              background: '#EF444415', color: '#EF4444', padding: '6px 12px', borderRadius: '16px',
              fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px',
              border: '1px solid #EF444430'
            }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444', animation: 'recBlink 1.5s infinite' }} /> EN VIVO
            </span>
          </div>
          <p style={{ margin: 0, color: colores.textoMedio, fontSize: '15px' }}>
            Visión computacional IA, correlación de eventos en tiempo real y telemetría de activos críticos.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ padding: '10px 16px', background: colores.fondoSecundario, border: `1px solid ${colores.borde}`, borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600, color: colores.textoClaro }}>
            <Phone size={16}/> Contactar Guardias
          </button>
          <button style={{ padding: '10px 16px', background: '#EF4444', border: 'none', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600, color: '#fff', boxShadow: '0 4px 12px rgba(239,68,68,0.3)' }}>
            <AlertTriangle size={16}/> Activar Protocolo
          </button>
        </div>
      </div>

      {/* KPIs GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        {[
          { label: 'CÁMARAS ONLINE', valor: '243/245', icono: Video, color: '#10B981', trend: '2 equipos offline (Mantenimiento)' },
          { label: 'ALERTAS 24H', valor: alertas24h.toString(), icono: Zap, color: '#F59E0B', trend: '-12% comparado con ayer' },
          { label: 'EVENTOS CRÍTICOS', valor: '3', icono: ShieldAlert, color: '#EF4444', trend: 'Todos resueltos/mitigados' },
          { label: 'DISPONIBILIDAD (SLA)', valor: '99.98%', icono: Activity, color: '#3B82F6', trend: 'Nivel óptimo del sistema' }
        ].map((kpi, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: '20px', padding: '24px',
            border: `1px solid ${colores.borde}`, borderTop: `4px solid ${kpi.color}`, boxShadow: colores.sombra,
            animation: `fadeSlideUp 0.6s ease-out ${i * 0.1}s backwards`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: colores.textoOscuro, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{kpi.label}</div>
                <div style={{ fontSize: '32px', fontWeight: '800', color: colores.textoClaro, marginTop: '8px' }}>{kpi.valor}</div>
              </div>
              <div style={{ padding: '12px', borderRadius: '16px', background: `${kpi.color}15`, color: kpi.color }}>
                <kpi.icono size={24} />
              </div>
            </div>
            <div style={{ marginTop: '16px', fontSize: '13px', color: colores.textoMedio, background: colores.fondoSecundario, padding: '8px 12px', borderRadius: '8px', display: 'inline-block' }}>
              {kpi.trend}
            </div>
          </div>
        ))}
      </div>

      {/* MAYIA INSIGHT */}
      <div style={{
        background: `linear-gradient(110deg, ${tema.acento}15 0%, #fff 60%)`, borderRadius: '20px', padding: '24px',
        border: `1px solid ${colores.borde}`, display: 'flex', gap: '20px', alignItems: 'flex-start',
        boxShadow: colores.sombra, animation: 'fadeSlideUp 0.6s ease-out 0.4s backwards'
      }}>
        <div style={{ background: `linear-gradient(135deg, ${tema.acento}, ${tema.acentoOscuro})`, borderRadius: '50%', padding: '12px', color: '#fff' }}>
          <BrainCircuit size={24} />
        </div>
        <div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
            Análisis de Patrones · MAYIA IA
          </h3>
          <p style={{ margin: 0, fontSize: '14px', color: colores.textoMedio, lineHeight: '1.6' }}>
            El análisis retrospectivo de las últimas 72 horas indica que el <strong>68% de las alertas falsas en "Estacionamiento Norte"</strong> son causadas por reflejos solares al atardecer (17:30 - 18:45). He propuesto un ajuste automático en el filtro de contraste para el algoritmo de visión en ese horario.
          </p>
          <div style={{ marginTop: '12px' }}>
            <button style={{ padding: '8px 16px', background: tema.acento, color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}>Aprobar Ajuste Automático</button>
          </div>
        </div>
      </div>

      {/* TABS NAVIGATION */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: `1px solid ${colores.borde}` }}>
        {[
          { id: 'sala-monitoreo', label: 'CCTV & Sensores', icon: Video },
          { id: 'mapa', label: 'Plano Interactivo', icon: MapPin },
          { id: 'metricas', label: 'Análisis Histórico', icon: BarChart2 },
          { id: 'log-eventos', label: 'Log de Eventos IA', icon: Terminal }
        ].map(tab => {
          const active = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="tab-hover"
              style={{
                background: active ? `${tema.acento}10` : 'transparent', border: 'none', padding: '14px 20px',
                fontSize: '14px', fontWeight: active ? 'bold' : '600', color: active ? tema.acentoOscuro : colores.textoMedio,
                borderBottom: active ? `3px solid ${tema.acento}` : '3px solid transparent',
                cursor: 'pointer', transition: 'all 0.2s ease', marginBottom: '-1px', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '8px 8px 0 0'
              }}
            >
              <tab.icon size={18}/> {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: SALA DE MONITOREO (CCTV) */}
      {activeTab === 'sala-monitoreo' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeSlideUp 0.4s ease-out' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', color: colores.textoClaro }}>Grid Principal - Zona Corporativa (6/245)</h3>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ padding: '8px 12px', borderRadius: '8px', border: `1px solid ${colores.borde}`, background: '#fff', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><Maximize size={14}/> Pantalla Completa</button>
              <button style={{ padding: '8px 12px', borderRadius: '8px', border: `1px solid ${colores.borde}`, background: '#fff', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><Filter size={14}/> Filtrar Vistas</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {feeds.map((feed) => (
              <div key={feed.id} className="cam-feed" style={{
                background: '#000', borderRadius: '16px', overflow: 'hidden', position: 'relative',
                aspectRatio: '16/9', border: `2px solid ${getBorderColor(feed.event)}`, 
                boxShadow: feed.event === 'critical' ? '0 0 15px rgba(239,68,68,0.4)' : feed.event === 'warning' ? '0 0 15px rgba(245,158,11,0.4)' : colores.sombra,
                transition: 'all 0.3s ease'
              }}>
                {/* Visual Fake Video Layer */}
                <div style={{ position: 'absolute', inset: 0, opacity: feed.status === 'offline' ? 0.1 : 0.4, backgroundImage: 'radial-gradient(circle at center, #444 0%, #111 100%)' }} />
                
                {/* Tech Grids / Scanning effects */}
                {feed.status === 'online' && (
                  <>
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                    <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '4px', background: 'rgba(255,255,255,0.1)', animation: 'scanline 4s linear infinite', boxShadow: '0 0 8px rgba(255,255,255,0.2)' }} />
                  </>
                )}

                {/* AI Bounding Boxes */}
                {feed.event === 'critical' && (
                  <div style={{ position: 'absolute', top: '25%', left: '35%', width: '30%', height: '50%', border: '2px solid #EF4444', backgroundColor: 'rgba(239, 68, 68, 0.15)' }}>
                    <div style={{ position: 'absolute', top: -20, left: -2, background: '#EF4444', color: '#fff', fontSize: '10px', padding: '2px 6px', fontWeight: 'bold' }}>INTRUDER 98%</div>
                  </div>
                )}
                {feed.event === 'warning' && (
                  <div style={{ position: 'absolute', bottom: '15%', right: '25%', width: '20%', height: '35%', border: '2px dashed #F59E0B', backgroundColor: 'rgba(245, 158, 11, 0.1)' }}>
                    <div style={{ position: 'absolute', top: -20, left: -2, background: '#F59E0B', color: '#fff', fontSize: '10px', padding: '2px 6px', fontWeight: 'bold' }}>ANOMALY 74%</div>
                  </div>
                )}
                
                {/* Offline State */}
                {feed.status === 'offline' && (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280', flexDirection: 'column', gap: '12px' }}>
                    <AlertCircle size={40} opacity={0.5}/> 
                    <span style={{ fontSize: '14px', letterSpacing: '2px', fontFamily: 'monospace' }}>NO SIGNAL / DISCONNECTED</span>
                  </div>
                )}

                {/* HUD Overlays - Top Left */}
                <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: '8px' }}>
                  <span style={{ background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontFamily: 'monospace', border: '1px solid rgba(255,255,255,0.2)' }}>
                    {feed.id}
                  </span>
                  {feed.status === 'online' && (
                    <span style={{ 
                      background: 'rgba(0,0,0,0.7)', color: getBorderColor(feed.event), padding: '4px 10px', borderRadius: '4px', 
                      fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px',
                      border: `1px solid ${getBorderColor(feed.event)}50`
                    }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: getBorderColor(feed.event), animation: feed.event ? 'recBlink 1s infinite' : 'none' }} />
                      {feed.iaDetect.toUpperCase()}
                    </span>
                  )}
                </div>

                {/* HUD Overlays - Bottom Left */}
                <div style={{ position: 'absolute', bottom: 12, left: 12, color: 'rgba(255,255,255,0.9)', fontSize: '12px', textShadow: '0 2px 4px #000', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={14}/> {feed.location}
                </div>
                
                {/* HUD Overlays - Bottom Right */}
                <div style={{ position: 'absolute', bottom: 12, right: 12, color: 'rgba(255,255,255,0.9)', fontSize: '12px', fontFamily: 'monospace', textShadow: '0 2px 4px #000' }}>
                  {new Date().toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: MÉTRICAS Y ANÁLISIS */}
      {activeTab === 'metricas' && (
         <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeSlideUp 0.4s ease-out' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
              {/* Eventos por hora */}
              <div style={{ background: '#fff', borderRadius: '20px', padding: '24px', border: `1px solid ${colores.borde}`, boxShadow: colores.sombra }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', color: colores.textoClaro }}>Distribución Temporal de Eventos (24h)</h3>
                <div style={{ height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockEventosHora} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorAlertasCM" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={tema.acento} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={tema.acento} stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorCriticos" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colores.borde} />
                      <XAxis dataKey="hora" stroke={colores.textoOscuro} fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke={colores.textoOscuro} fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: colores.sombraMedia }} />
                      <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}/>
                      <Area type="monotone" dataKey="alertas" name="Alertas Preventivas (IA)" stroke={tema.acento} strokeWidth={2} fillOpacity={1} fill="url(#colorAlertasCM)" />
                      <Area type="monotone" dataKey="criticos" name="Eventos Críticos / Confirmados" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#colorCriticos)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Alertas por Zona */}
              <div style={{ background: '#fff', borderRadius: '20px', padding: '24px', border: `1px solid ${colores.borde}`, boxShadow: colores.sombra }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', color: colores.textoClaro }}>Frecuencia por Zona</h3>
                <div style={{ height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockZonas} layout="vertical" margin={{ top: 0, right: 0, left: 20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={colores.borde} />
                      <XAxis type="number" stroke={colores.textoOscuro} fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis dataKey="zona" type="category" stroke={colores.textoOscuro} fontSize={12} tickLine={false} axisLine={false} width={100} />
                      <Tooltip cursor={{ fill: colores.fondoSecundario }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: colores.sombraMedia }} />
                      <Bar dataKey="count" name="Total Alertas" fill={tema.acento} radius={[0, 4, 4, 0]} barSize={20}>
                        {mockZonas.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.count > 100 ? '#F97316' : tema.acento} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
         </div>
      )}

      {/* TAB CONTENT: LOG EVENTOS */}
      {activeTab === 'log-eventos' && (
        <div style={{ animation: 'fadeSlideUp 0.4s ease-out' }}>
          <div style={{ background: '#fff', borderRadius: '20px', border: `1px solid ${colores.borde}`, boxShadow: colores.sombra, overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: `1px solid ${colores.borde}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: colores.fondoSecundario }}>
              <h3 style={{ margin: 0, fontSize: '16px', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Terminal size={18} /> Consola de Eventos en Tiempo Real
              </h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ fontSize: '13px', color: colores.textoMedio }}>Auto-scroll activado</span>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', alignSelf: 'center', animation: 'recBlink 2s infinite' }}/>
              </div>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead style={{ color: colores.textoOscuro, fontSize: '12px', textTransform: 'uppercase', borderBottom: `1px solid ${colores.borde}` }}>
                  <tr>
                    <th style={{ padding: '16px 24px', fontWeight: 600 }}>Tiempo</th>
                    <th style={{ padding: '16px 24px', fontWeight: 600 }}>Severidad</th>
                    <th style={{ padding: '16px 24px', fontWeight: 600 }}>Origen</th>
                    <th style={{ padding: '16px 24px', fontWeight: 600 }}>Descripción (IA)</th>
                    <th style={{ padding: '16px 24px', fontWeight: 600 }}>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {eventLogs.map((log, idx) => {
                    const style = getSeverityStyle(log.severity);
                    return (
                      <tr key={idx} className="log-row" style={{ borderBottom: `1px solid ${colores.borde}`, backgroundColor: idx === 0 ? `${style.bg}40` : 'transparent' }}>
                        <td style={{ padding: '16px 24px', color: colores.textoMedio, fontFamily: 'monospace' }}>{log.tiempo}</td>
                        <td style={{ padding: '16px 24px' }}>
                          <span style={{ 
                            padding: '6px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold',
                            background: style.bg, color: style.color, display: 'inline-flex', alignItems: 'center', gap: '6px'
                          }}>
                            {style.icon} {log.severity.toUpperCase()}
                          </span>
                        </td>
                        <td style={{ padding: '16px 24px', fontWeight: 500, color: colores.textoClaro }}>{log.cam}</td>
                        <td style={{ padding: '16px 24px', color: colores.textoClaro }}>{log.msg}</td>
                        <td style={{ padding: '16px 24px' }}>
                          <button style={{ padding: '6px 12px', border: `1px solid ${colores.borde}`, background: '#fff', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', color: colores.textoMedio }}>Ver Detalle</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* PLACEHOLDER: MAPA */}
      {activeTab === 'mapa' && (
        <div style={{ background: '#fff', padding: '60px', borderRadius: '20px', border: `1px solid ${colores.borde}`, textAlign: 'center', color: colores.textoMedio, animation: 'fadeSlideUp 0.4s ease-out' }}>
          <MapPin size={64} color={tema.acento} style={{ marginBottom: '24px', opacity: 0.5 }} />
          <h3 style={{ margin: '0 0 12px 0', color: colores.textoClaro, fontSize: '24px' }}>Plano Interactivo de Instalaciones</h3>
          <p style={{ fontSize: '16px', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            El módulo de visualización GIS está en proceso de carga. Permitirá visualizar la ubicación exacta de las cámaras, sensores IoT y trazar rutas de evacuación generadas dinámicamente por MAYIA IA.
          </p>
        </div>
      )}

    </div>
  );
};

// Pequeño componente extra
const Phone = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
