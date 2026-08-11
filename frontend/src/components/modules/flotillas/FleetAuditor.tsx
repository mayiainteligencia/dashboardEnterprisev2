import React, { useState, useEffect } from 'react';
import { 
  Camera, AlertCircle, CheckCircle, Activity, Sparkles, TrendingUp, TrendingDown, 
  FileText, Search, Image as ImageIcon, CheckSquare, XCircle, Shield, Eye
} from 'lucide-react';
import { 
  BarChart, Bar, PieChart, Pie, Cell, 
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

const mockEvidenciasTipo = [
  { name: 'Firma', validas: 450, invalidas: 12 },
  { name: 'Foto Inmueble', validas: 380, invalidas: 25 },
  { name: 'Identificación', validas: 210, invalidas: 5 },
  { name: 'Sello', validas: 150, invalidas: 15 },
];

const mockResultadosPie = [
  { name: 'Validada IA', value: 89 },
  { name: 'Rechazada IA', value: 3 },
  { name: 'Requiere Revisión', value: 8 },
];
const COLORS = [colores.exito, colores.peligro, colores.advertencia];

const mockEvidencias = [
  { id: 'EVD-9921', tipo: 'Foto Inmueble', operador: 'Juan Pérez', ruta: 'Sur-03', confianza: '98%', estado: 'Validada', fecha: '10:45 AM' },
  { id: 'EVD-9922', tipo: 'Firma', operador: 'Carlos Ruiz', ruta: 'Norte-01', confianza: '45%', estado: 'Rechazada', fecha: '10:50 AM' },
  { id: 'EVD-9923', tipo: 'Identificación', operador: 'Luis Gómez', ruta: 'Oriente-02', confianza: '99%', estado: 'Validada', fecha: '11:05 AM' },
  { id: 'EVD-9924', tipo: 'Foto Inmueble', operador: 'Mario Silva', ruta: 'Poniente-01', confianza: '72%', estado: 'Revisión', fecha: '11:15 AM' },
  { id: 'EVD-9925', tipo: 'Sello', operador: 'Pedro Luna', ruta: 'Sur-02', confianza: '95%', estado: 'Validada', fecha: '11:30 AM' },
  { id: 'EVD-9926', tipo: 'Firma', operador: 'Jorge Díaz', ruta: 'Norte-04', confianza: '60%', estado: 'Revisión', fecha: '11:45 AM' },
  { id: 'EVD-9927', tipo: 'Foto Inmueble', operador: 'Raúl Torres', ruta: 'Oriente-05', confianza: '91%', estado: 'Validada', fecha: '12:00 PM' },
  { id: 'EVD-9928', tipo: 'Sello', operador: 'Miguel Paz', ruta: 'Poniente-03', confianza: '88%', estado: 'Validada', fecha: '12:15 PM' },
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
      .hover-row:hover {
        background-color: ${colores.fondoSecundario};
      }
    `;
    document.head.appendChild(style);
  }, []);
};

export const FleetAuditor: React.FC = () => {
  useAnimations();
  const [activeTab, setActiveTab] = useState('pendientes');

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
          <Camera size={32} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 700, color: colores.textoClaro }}>Auditor Visual de Evidencia</h1>
            <span style={{ background: colores.exito + '20', color: colores.exito, padding: '4px 8px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: colores.exito, animation: 'pulse 2s infinite' }} />
              LIVE
            </span>
          </div>
          <p style={{ margin: 0, color: colores.textoOscuro, fontSize: '16px' }}>Validación automática de evidencias de entrega mediante IA y control de calidad.</p>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {[
          { label: 'Evidencias Procesadas', value: '1,247', trend: '+12%', icon: <FileText size={20} />, color: tema.acento },
          { label: 'Anomalías', value: '34', trend: '-5%', icon: <AlertCircle size={20} />, color: colores.advertencia },
          { label: 'Cumplimiento', value: '94.8%', trend: '+0.5%', icon: <CheckSquare size={20} />, color: colores.exito },
          { label: 'Auditorías IA', value: '89', trend: '+20%', icon: <Sparkles size={20} />, color: tema.acento },
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
          La IA ha detectado un incremento del <strong>15% en inconsistencias</strong> en evidencias fotográficas de inmuebles en la ruta Norte-01. Recomendamos enviar un recordatorio sobre las pautas de captura fotográfica a los operadores de dicha zona.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '32px', borderBottom: `1px solid ${colores.borde}`, paddingBottom: '2px', marginTop: '10px' }}>
        {['Pendientes', 'Verificadas IA', 'Rechazadas', 'Reportes'].map((tab, i) => {
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
        {activeTab === 'reportes' && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            <div className="animate-fade-up" style={cardStyle}>
              <h3 style={{ margin: '0 0 24px 0', fontSize: '16px', fontWeight: 600, color: colores.textoClaro }}>Evidencias por Tipo</h3>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockEvidenciasTipo}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colores.borde} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: colores.textoOscuro, fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: colores.textoOscuro, fontSize: 12}} />
                    <Tooltip cursor={{fill: colores.fondoTerciario}} contentStyle={{borderRadius: '12px', border: `1px solid ${colores.borde}`}} />
                    <Legend />
                    <Bar name="Válidas" dataKey="validas" stackId="a" fill={colores.exito} radius={[0, 0, 0, 0]} />
                    <Bar name="Inválidas" dataKey="invalidas" stackId="a" fill={colores.peligro} radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="animate-fade-up" style={cardStyle}>
              <h3 style={{ margin: '0 0 24px 0', fontSize: '16px', fontWeight: 600, color: colores.textoClaro }}>Resultados de Auditoría IA</h3>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={mockResultadosPie} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {mockResultadosPie.map((entry, index) => (
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

        {(activeTab === 'pendientes' || activeTab === 'verificadas-ia' || activeTab === 'rechazadas') && (
          <div className="animate-fade-up" style={{ ...cardStyle, padding: 0 }}>
            <div style={{ padding: '24px', borderBottom: `1px solid ${colores.borde}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: colores.textoClaro }}>Listado de Evidencias</h3>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead style={{ background: colores.fondoSecundario }}>
                  <tr>
                    <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: colores.textoOscuro, textTransform: 'uppercase' }}>ID / Fecha</th>
                    <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: colores.textoOscuro, textTransform: 'uppercase' }}>Operador / Ruta</th>
                    <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: colores.textoOscuro, textTransform: 'uppercase' }}>Tipo de Evidencia</th>
                    <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: colores.textoOscuro, textTransform: 'uppercase' }}>Score IA</th>
                    <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: colores.textoOscuro, textTransform: 'uppercase' }}>Estado</th>
                    <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: colores.textoOscuro, textTransform: 'uppercase', textAlign: 'right' }}>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {mockEvidencias.map((ev, i) => (
                    <tr key={i} className="hover-row" style={{ borderBottom: `1px solid ${colores.borde}`, transition: 'background 0.2s', cursor: 'pointer' }}>
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ fontWeight: 600, color: colores.textoClaro }}>{ev.id}</div>
                        <div style={{ fontSize: '12px', color: colores.textoOscuro }}>{ev.fecha}</div>
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ fontWeight: 500, color: colores.textoClaro }}>{ev.operador}</div>
                        <div style={{ fontSize: '12px', color: colores.textoOscuro }}>{ev.ruta}</div>
                      </td>
                      <td style={{ padding: '16px 24px', color: colores.textoMedio }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <ImageIcon size={16} color={colores.textoOscuro} />
                          {ev.tipo}
                        </div>
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ fontWeight: 600, color: parseInt(ev.confianza) > 85 ? colores.exito : colores.advertencia }}>{ev.confianza}</div>
                        </div>
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{ 
                          padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px',
                          background: ev.estado === 'Validada' ? colores.exito + '20' : ev.estado === 'Rechazada' ? colores.peligro + '20' : colores.advertencia + '20',
                          color: ev.estado === 'Validada' ? colores.exito : ev.estado === 'Rechazada' ? colores.peligro : colores.advertencia
                        }}>
                          {ev.estado === 'Validada' && <CheckCircle size={12} />}
                          {ev.estado === 'Rechazada' && <XCircle size={12} />}
                          {ev.estado === 'Revisión' && <Eye size={12} />}
                          {ev.estado}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                        <button style={{ background: 'none', border: `1px solid ${colores.borde}`, borderRadius: '8px', padding: '6px 12px', cursor: 'pointer', fontSize: '13px', fontWeight: 500, color: colores.textoMedio }}>
                          Ver Detalle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
