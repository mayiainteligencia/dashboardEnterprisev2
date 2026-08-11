import React, { useState, useEffect } from 'react';
import { 
  Users, AlertCircle, CheckCircle, Activity, Sparkles, TrendingUp, TrendingDown, 
  MessageSquare, Clock, Calendar, Star, ChevronRight, ShieldAlert, Truck,
  MapPin, Phone
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { brandingConfig } from '../../../config/branding';

const { colores } = brandingConfig;

const tema = {
  acento: '#1E40AF',
  acentoOscuro: '#0F172A',
  acentoSuave: '#DBEAFE',
  sobreAcento: '#FFFFFF',
};

const mockPerformanceOperadores = [
  { nombre: 'Juan Pérez', score: 95, entregas: 45, incidencias: 0 },
  { nombre: 'Carlos Ruiz', score: 92, entregas: 42, incidencias: 1 },
  { nombre: 'Luis Gómez', score: 88, entregas: 38, incidencias: 2 },
  { nombre: 'Mario Silva', score: 85, entregas: 35, incidencias: 3 },
  { nombre: 'Pedro Luna', score: 81, entregas: 30, incidencias: 4 },
];

const mockIncidenciasPie = [
  { name: 'Tráfico', value: 35 },
  { name: 'Mecánica', value: 20 },
  { name: 'Clima', value: 15 },
  { name: 'Cliente Ausente', value: 20 },
  { name: 'Otros', value: 10 },
];
const COLORS = [tema.acento, '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'];

const mockOperadores = [
  { id: 'OP-001', nombre: 'Juan Pérez', ruta: 'Norte-01', estado: 'En ruta', avance: '85%', proxParada: 'CDMX Centro' },
  { id: 'OP-002', nombre: 'Carlos Ruiz', ruta: 'Sur-03', estado: 'Descanso', avance: '50%', proxParada: 'Puebla' },
  { id: 'OP-003', nombre: 'Luis Gómez', ruta: 'Oriente-02', estado: 'En ruta', avance: '60%', proxParada: 'Veracruz' },
  { id: 'OP-004', nombre: 'Mario Silva', ruta: 'Poniente-01', estado: 'Incidencia', avance: '30%', proxParada: 'Toluca' },
  { id: 'OP-005', nombre: 'Pedro Luna', ruta: 'Norte-04', estado: 'En ruta', avance: '10%', proxParada: 'Querétaro' },
  { id: 'OP-006', nombre: 'Jorge Díaz', ruta: 'Sur-02', estado: 'En ruta', avance: '95%', proxParada: 'Cuernavaca' },
  { id: 'OP-007', nombre: 'Raúl Torres', ruta: 'Oriente-05', estado: 'En ruta', avance: '20%', proxParada: 'Xalapa' },
  { id: 'OP-008', nombre: 'Miguel Paz', ruta: 'Poniente-03', estado: 'Descanso', avance: '45%', proxParada: 'Morelia' },
];

const useAnimations = () => {
  useEffect(() => {
    const id = 'module-animations';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @keyframes fadeSlideUp {
        from { opacity: 0; transform: translateY(18px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      .animate-fade-up {
        animation: fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        opacity: 0;
      }
    `;
    document.head.appendChild(style);
  }, []);
};

export const FleetSupervisor: React.FC = () => {
  useAnimations();
  const [activeTab, setActiveTab] = useState('briefing-ia');

  const cardStyle: React.CSSProperties = {
    background: '#FFFFFF',
    border: `1px solid ${colores.borde}`,
    borderRadius: '18px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
    padding: '24px',
    position: 'relative',
    overflow: 'hidden',
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Header */}
      <div className="animate-fade-up" style={{ ...cardStyle, display: 'flex', alignItems: 'center', gap: '20px', padding: '32px' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: `linear-gradient(to bottom, ${tema.acento}, ${tema.acentoOscuro})` }} />
        <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: `linear-gradient(135deg, ${tema.acento}, ${tema.acentoOscuro})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: tema.sobreAcento }}>
          <Users size={32} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 700, color: colores.textoClaro }}>Copiloto del Supervisor</h1>
            <span style={{ background: colores.exito + '20', color: colores.exito, padding: '4px 8px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: colores.exito, animation: 'pulse 2s infinite' }} />
              LIVE
            </span>
          </div>
          <p style={{ margin: 0, color: colores.textoOscuro, fontSize: '16px' }}>Gestión inteligente de operadores y monitorización de flota en tiempo real.</p>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {[
          { label: 'Operadores Activos', value: '45', trend: '+3', icon: <Users size={20} />, color: tema.acento },
          { label: 'Incidencias Hoy', value: '7', trend: '-2', icon: <AlertCircle size={20} />, color: colores.advertencia },
          { label: 'Entregas Completadas', value: '234', trend: '+15%', icon: <CheckCircle size={20} />, color: colores.exito },
          { label: 'Score Operativo', value: '91.4', trend: '+1.2', icon: <Activity size={20} />, color: tema.acento },
        ].map((kpi, i) => (
          <div key={i} className="animate-fade-up" style={{ ...cardStyle, animationDelay: `${i * 0.05}s` }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: kpi.color }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ color: kpi.color, background: kpi.color + '15', padding: '10px', borderRadius: '12px' }}>
                {kpi.icon}
              </div>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600, color: kpi.trend.startsWith('+') ? colores.exito : colores.peligro }}>
                {kpi.trend.startsWith('+') ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {kpi.trend}
              </span>
            </div>
            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', color: colores.textoOscuro, fontWeight: 600, marginBottom: '4px' }}>
              {kpi.label}
            </div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: colores.textoClaro }}>
              {kpi.value}
            </div>
          </div>
        ))}
      </div>

      {/* AI Insight */}
      <div className="animate-fade-up" style={{ ...cardStyle, animationDelay: '0.2s', background: `linear-gradient(110deg, ${tema.acento}08 0%, transparent 60%)`, border: `1px solid ${tema.acento}30` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ background: tema.acento, color: tema.sobreAcento, padding: '8px', borderRadius: '10px' }}>
            <Sparkles size={20} />
          </div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: colores.textoClaro }}>Insight de MAYIA · IA</h3>
        </div>
        <p style={{ margin: 0, color: colores.textoMedio, lineHeight: 1.6, fontSize: '15px' }}>
          El <strong>Rendimiento Operativo</strong> está un 4% por encima del promedio. Se detecta un patrón de retrasos leves en la ruta Sur-03 debido a condiciones climáticas. Se sugiere enviar mensaje de precaución a los operadores en la zona.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '32px', borderBottom: `1px solid ${colores.borde}`, paddingBottom: '2px', marginTop: '10px' }}>
        {['Briefing IA', 'Operadores', 'Incidencias', 'Copiloto Chat'].map((tab, i) => {
          const tabId = tab.toLowerCase().replace(' ', '-');
          const isActive = activeTab === tabId;
          return (
            <button
              key={i}
              onClick={() => setActiveTab(tabId)}
              style={{
                background: 'none', border: 'none', padding: '0 0 12px 0', fontSize: '15px', fontWeight: 600,
                color: isActive ? tema.acento : colores.textoOscuro,
                borderBottom: `3px solid ${isActive ? tema.acento : 'transparent'}`,
                cursor: 'pointer', transition: 'all 0.2s'
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div style={{ minHeight: '400px' }}>
        {activeTab === 'briefing-ia' && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            <div className="animate-fade-up" style={cardStyle}>
              <h3 style={{ margin: '0 0 24px 0', fontSize: '16px', fontWeight: 600, color: colores.textoClaro }}>Rendimiento por Operador (Top 5)</h3>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockPerformanceOperadores}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colores.borde} />
                    <XAxis dataKey="nombre" axisLine={false} tickLine={false} tick={{fill: colores.textoOscuro, fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: colores.textoOscuro, fontSize: 12}} />
                    <Tooltip cursor={{fill: colores.fondoTerciario}} contentStyle={{borderRadius: '12px', border: `1px solid ${colores.borde}`, boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                    <Bar dataKey="score" fill={tema.acento} radius={[6, 6, 0, 0]} />
                    <Bar dataKey="entregas" fill={tema.acentoSuave} radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="animate-fade-up" style={cardStyle}>
              <h3 style={{ margin: '0 0 24px 0', fontSize: '16px', fontWeight: 600, color: colores.textoClaro }}>Distribución de Incidencias</h3>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={mockIncidenciasPie} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {mockIncidenciasPie.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{borderRadius: '12px', border: `1px solid ${colores.borde}`}} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'operadores' && (
          <div className="animate-fade-up" style={{ ...cardStyle, padding: 0 }}>
            <div style={{ padding: '24px', borderBottom: `1px solid ${colores.borde}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: colores.textoClaro }}>Estado de Operadores</h3>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead style={{ background: colores.fondoSecundario }}>
                  <tr>
                    <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: colores.textoOscuro, textTransform: 'uppercase' }}>ID / Nombre</th>
                    <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: colores.textoOscuro, textTransform: 'uppercase' }}>Ruta</th>
                    <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: colores.textoOscuro, textTransform: 'uppercase' }}>Estado</th>
                    <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: colores.textoOscuro, textTransform: 'uppercase' }}>Avance</th>
                    <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: colores.textoOscuro, textTransform: 'uppercase' }}>Próxima Parada</th>
                  </tr>
                </thead>
                <tbody>
                  {mockOperadores.map((op, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${colores.borde}`, transition: 'background 0.2s', cursor: 'pointer' }}>
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ fontWeight: 600, color: colores.textoClaro }}>{op.nombre}</div>
                        <div style={{ fontSize: '12px', color: colores.textoOscuro }}>{op.id}</div>
                      </td>
                      <td style={{ padding: '16px 24px', color: colores.textoMedio }}>{op.ruta}</td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{ 
                          padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
                          background: op.estado === 'En ruta' ? colores.exito + '20' : op.estado === 'Incidencia' ? colores.peligro + '20' : colores.advertencia + '20',
                          color: op.estado === 'En ruta' ? colores.exito : op.estado === 'Incidencia' ? colores.peligro : colores.advertencia
                        }}>
                          {op.estado}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ flex: 1, height: '6px', background: colores.fondoTerciario, borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ width: op.avance, height: '100%', background: tema.acento, borderRadius: '3px' }} />
                          </div>
                          <span style={{ fontSize: '12px', color: colores.textoMedio, width: '35px' }}>{op.avance}</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px 24px', color: colores.textoMedio }}>{op.proxParada}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {(activeTab === 'incidencias' || activeTab === 'copiloto-chat') && (
          <div className="animate-fade-up" style={{ ...cardStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px', flexDirection: 'column', gap: '16px', color: colores.textoOscuro }}>
            <MessageSquare size={48} opacity={0.5} />
            <p style={{ fontSize: '16px' }}>Módulo en construcción o pendiente de integración.</p>
          </div>
        )}
      </div>

    </div>
  );
};
