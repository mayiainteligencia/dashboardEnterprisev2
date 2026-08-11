import React, { useState, useEffect } from 'react';
import { Flame, ShieldAlert, Activity, Users, Map, Bell, AlertOctagon, Info, Zap, Droplets } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { brandingConfig } from '../../../config/branding';

const { colores } = brandingConfig;

const tema = {
  acento: '#10B981',
  acentoOscuro: '#047857',
  acentoSuave: '#D1FAE5',
  sobreAcento: '#FFFFFF',
};

const alertasMock = [
  { time: 'Lun', humo: 2, temperatura: 5, manual: 0 },
  { time: 'Mar', humo: 0, temperatura: 2, manual: 1 },
  { time: 'Mie', humo: 1, temperatura: 4, manual: 0 },
  { time: 'Jue', humo: 0, temperatura: 1, manual: 0 },
  { time: 'Vie', humo: 3, temperatura: 6, manual: 2 },
  { time: 'Sab', humo: 0, temperatura: 0, manual: 0 },
  { time: 'Dom', humo: 0, temperatura: 1, manual: 0 },
];

const incidentesLog = [
  { id: 'INC-092', fecha: 'Hoy 14:20', zona: 'Cocina Planta Baja', tipo: 'Alta Temperatura', estado: 'Resuelto', riesgo: 'Bajo' },
  { id: 'INC-091', fecha: 'Hoy 09:15', zona: 'Site IT (Piso 3)', tipo: 'Humo Detectado', estado: 'Activo', riesgo: 'Crítico' },
  { id: 'INC-090', fecha: 'Ayer 18:45', zona: 'Almacén Sótano', tipo: 'Alarma Manual', estado: 'Falsa Alarma', riesgo: 'Nulo' },
  { id: 'INC-089', fecha: '12 Ago 11:30', zona: 'Lobby Principal', tipo: 'Falla Sensor', estado: 'Mantenimiento', riesgo: 'Medio' },
];

const zones = [
  { id: 'z1', name: 'Site IT', status: 'critical', x: 20, y: 30 },
  { id: 'z2', name: 'Lobby', status: 'normal', x: 50, y: 70 },
  { id: 'z3', name: 'Cocina', status: 'warning', x: 80, y: 40 },
  { id: 'z4', name: 'Almacén', status: 'normal', x: 70, y: 80 },
  { id: 'z5', name: 'Sótano', status: 'normal', x: 30, y: 80 },
];

const useAnimations = () => {
  useEffect(() => {
    const id = 'module-animations-fire';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes pulseAlert { 0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); } 70% { box-shadow: 0 0 0 15px rgba(239, 68, 68, 0); } 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }
      @keyframes pulseWarning { 0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.7); } 70% { box-shadow: 0 0 0 10px rgba(245, 158, 11, 0); } 100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); } }
    `;
    document.head.appendChild(style);
  }, []);
};

export const DeteccionEmergencias: React.FC = () => {
  useAnimations();
  const [activeTab, setActiveTab] = useState('map');
  const [activeProtocol, setActiveProtocol] = useState('Evacuación');

  const getStatusColor = (status: string) => {
    if (status === 'critical') return '#EF4444';
    if (status === 'warning') return '#F59E0B';
    return '#10B981';
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24, padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      
      {/* HEADER */}
      <div style={{ background: colores.fondoPrincipal, borderRadius: 20, padding: 24, border: `1px solid ${colores.borde}`, position: 'relative', overflow: 'hidden', boxShadow: colores.sombra, animation: 'fadeSlideUp 0.5s ease-out' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: `linear-gradient(to bottom, ${colores.peligro}, #EF4444)` }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #FEE2E2' }}>
            <Flame size={32} color={colores.peligro} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
              <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: colores.textoClaro }}>Detección de Emergencias</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#EF444420', padding: '4px 10px', borderRadius: 20, color: '#EF4444', fontSize: 12, fontWeight: 600 }}>
                ALERTA ACTIVA
              </div>
            </div>
            <p style={{ margin: 0, color: colores.textoMedio, fontSize: 15 }}>Monitoreo de sensores de humo, temperatura y control de protocolos de evacuación.</p>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
        {[
          { label: 'Sensores Activos', value: '450', sub: '99.8% operativos', icon: Activity, color: '#10B981' },
          { label: 'Zonas Críticas', value: '1', sub: 'Site IT (Piso 3)', icon: AlertOctagon, color: '#EF4444' },
          { label: 'Ruta Evacuación', value: 'Despejada', sub: 'Salidas 1, 3, 4', icon: Users, color: '#3B82F6' },
          { label: 'Alarma General', value: 'Silenciada', sub: 'Modo automático', icon: Bell, color: '#F59E0B' },
        ].map((kpi, i) => (
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

      {/* TABS */}
      <div style={{ display: 'flex', gap: 20, borderBottom: `1px solid ${colores.borde}`, paddingBottom: 0 }}>
        {['map', 'protocols', 'history'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 4px', background: 'none', border: 'none', borderBottom: `3px solid ${activeTab === tab ? colores.peligro : 'transparent'}`,
              color: activeTab === tab ? colores.peligro : colores.textoMedio, fontWeight: 600, fontSize: 14, cursor: 'pointer', textTransform: 'capitalize'
            }}
          >
            {tab === 'map' ? 'Mapa Zonal' : tab === 'protocols' ? 'Protocolos Respuesta' : 'Historial Incidentes'}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      {activeTab === 'map' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
          <div style={{ background: colores.fondoPrincipal, borderRadius: 20, padding: 24, border: `1px solid ${colores.borde}`, minHeight: 400, position: 'relative' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: 16, color: colores.textoClaro }}>Plano de Planta (Nivel 3)</h3>
            <div style={{ width: '100%', height: 300, background: '#F8FAFC', borderRadius: 12, border: '2px dashed #CBD5E1', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 20, left: 20, background: '#FFF', padding: '8px 12px', borderRadius: 8, boxShadow: colores.sombra, fontSize: 12, fontWeight: 600, zIndex: 10 }}>Norte</div>
              {/* Floorplan mock */}
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <rect x="10" y="10" width="80" height="80" fill="none" stroke="#94A3B8" strokeWidth="1" />
                <line x1="50" y1="10" x2="50" y2="90" stroke="#94A3B8" strokeWidth="1" />
                <line x1="10" y1="50" x2="90" y2="50" stroke="#94A3B8" strokeWidth="1" />
              </svg>
              
              {zones.map(z => (
                <div key={z.id} style={{
                  position: 'absolute', top: `${z.y}%`, left: `${z.x}%`, transform: 'translate(-50%, -50%)',
                  width: 16, height: 16, borderRadius: '50%', background: getStatusColor(z.status),
                  animation: z.status === 'critical' ? 'pulseAlert 1.5s infinite' : z.status === 'warning' ? 'pulseWarning 2s infinite' : 'none',
                  cursor: 'pointer', zIndex: 20
                }}>
                  <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', background: '#333', color: '#FFF', padding: '2px 6px', borderRadius: 4, fontSize: 10, whiteSpace: 'nowrap' }}>
                    {z.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: '#FEF2F2', borderRadius: 16, padding: 20, border: '1px solid #FCA5A5' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#DC2626', marginBottom: 12, fontWeight: 700 }}>
                <AlertOctagon size={20} /> ALERTA CRÍTICA: SITE IT
              </div>
              <p style={{ fontSize: 13, color: '#991B1B', margin: '0 0 12px 0' }}>Humo detectado en Rack 04. Temperatura ambiente elevada a 38°C.</p>
              <button style={{ width: '100%', padding: '10px', background: '#DC2626', color: '#FFF', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>Activar Supresión (Gas)</button>
            </div>
            
            <div style={{ background: colores.fondoPrincipal, borderRadius: 16, padding: 20, border: `1px solid ${colores.borde}`, flex: 1 }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: 14, color: colores.textoClaro }}>Leyenda</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'Normal', color: '#10B981' },
                  { label: 'Advertencia', color: '#F59E0B' },
                  { label: 'Fuego/Humo', color: '#EF4444' }
                ].map(l => (
                  <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: l.color }} />
                    <span style={{ fontSize: 13, color: colores.textoMedio }}>{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'protocols' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['Evacuación', 'Cierre Gas', 'Fuego Eléctrico'].map(proto => (
              <button
                key={proto}
                onClick={() => setActiveProtocol(proto)}
                style={{
                  padding: 16, textAlign: 'left', borderRadius: 12, border: `1px solid ${activeProtocol === proto ? colores.peligro : colores.borde}`,
                  background: activeProtocol === proto ? '#FFF5F5' : colores.fondoPrincipal,
                  color: activeProtocol === proto ? colores.peligro : colores.textoMedio, fontWeight: 600, cursor: 'pointer'
                }}
              >
                Protocolo: {proto}
              </button>
            ))}
          </div>
          <div style={{ background: colores.fondoPrincipal, borderRadius: 20, padding: 24, border: `1px solid ${colores.borde}` }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: 18, color: colores.textoClaro }}>Pasos: {activeProtocol}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[1, 2, 3, 4].map(step => (
                <div key={step} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#FEE2E2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>{step}</div>
                  <div>
                    <div style={{ fontWeight: 600, color: colores.textoClaro, marginBottom: 4 }}>Paso {step}</div>
                    <div style={{ fontSize: 14, color: colores.textoMedio }}>Acción requerida por el equipo de brigada para asegurar el área correspondiente. Verifique sistemas antes de proceder.</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div style={{ background: colores.fondoPrincipal, borderRadius: 20, overflow: 'hidden', border: `1px solid ${colores.borde}` }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: colores.fondoSecundario, borderBottom: `1px solid ${colores.borde}` }}>
              <tr>
                <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: colores.textoOscuro, textTransform: 'uppercase' }}>ID</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: colores.textoOscuro, textTransform: 'uppercase' }}>Fecha</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: colores.textoOscuro, textTransform: 'uppercase' }}>Zona</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: colores.textoOscuro, textTransform: 'uppercase' }}>Tipo</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: colores.textoOscuro, textTransform: 'uppercase' }}>Riesgo</th>
              </tr>
            </thead>
            <tbody>
              {incidentesLog.map((inc, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${colores.borde}`, transition: 'background 0.2s' }}>
                  <td style={{ padding: '16px 20px', fontSize: 14, fontWeight: 500, color: colores.textoClaro }}>{inc.id}</td>
                  <td style={{ padding: '16px 20px', fontSize: 14, color: colores.textoMedio }}>{inc.fecha}</td>
                  <td style={{ padding: '16px 20px', fontSize: 14, color: colores.textoMedio }}>{inc.zona}</td>
                  <td style={{ padding: '16px 20px', fontSize: 14, color: colores.textoMedio }}>{inc.tipo}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ 
                      padding: '4px 10px', borderRadius: 12, fontSize: 12, fontWeight: 600,
                      background: inc.riesgo === 'Crítico' ? '#FEE2E2' : inc.riesgo === 'Medio' ? '#FEF3C7' : '#D1FAE5',
                      color: inc.riesgo === 'Crítico' ? '#DC2626' : inc.riesgo === 'Medio' ? '#D97706' : '#059669'
                    }}>
                      {inc.riesgo}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
