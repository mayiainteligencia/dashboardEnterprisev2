import React, { useState, useEffect } from 'react';
import { Building, MapPin, CheckCircle, AlertTriangle, ArrowRight, ShieldCheck, HeartPulse, Sparkles, Navigation } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell } from 'recharts';
import { brandingConfig } from '../../../config/branding';

const { colores } = brandingConfig;

const tema = {
  acento: '#10B981',
  acentoOscuro: '#047857',
  acentoSuave: '#D1FAE5',
  sobreAcento: '#FFFFFF',
};

const facilities = [
  { id: 'tr', name: 'Torre Reforma', city: 'CDMX', health: 98, status: 'ok', tickets: 4, satisfaction: 95 },
  { id: 'mty', name: 'Campus Monterrey', city: 'Nuevo León', health: 85, status: 'warning', tickets: 12, satisfaction: 82 },
  { id: 'gdl', name: 'Hub Guadalajara', city: 'Jalisco', health: 99, status: 'ok', tickets: 1, satisfaction: 98 },
  { id: 'cedis', name: 'Cedis Norte', city: 'Edomex', health: 72, status: 'danger', tickets: 28, satisfaction: 65 }
];

const satisfactionData = [
  { month: 'Ene', tr: 94, mty: 80, gdl: 96, cedis: 70 },
  { month: 'Feb', tr: 95, mty: 82, gdl: 97, cedis: 68 },
  { month: 'Mar', tr: 94, mty: 85, gdl: 96, cedis: 65 },
  { month: 'Abr', tr: 95, mty: 84, gdl: 98, cedis: 72 },
  { month: 'May', tr: 96, mty: 81, gdl: 98, cedis: 68 },
  { month: 'Jun', tr: 95, mty: 82, gdl: 98, cedis: 65 },
];

const incidentData = [
  { name: 'HVAC', count: 45 },
  { name: 'Eléctrico', count: 32 },
  { name: 'Limpieza', count: 28 },
  { name: 'Plomería', count: 18 },
  { name: 'Seguridad', count: 12 },
];

const useAnimations = () => {
  useEffect(() => {
    const id = 'module-animations-portal';
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

export const FacilityPortal: React.FC = () => {
  useAnimations();
  const [activeFacility, setActiveFacility] = useState(facilities[0]);
  const [activeTab, setActiveTab] = useState('overview');

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
          <Building size={32} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
            <h1 style={{ margin: 0, fontSize: 24, color: colores.textoClaro, fontWeight: 700 }}>Portal Multi-Sede</h1>
            <span style={{ background: tema.acentoSuave, color: tema.acentoOscuro, padding: '4px 10px', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>PORTAFOLIO ACTIVO</span>
          </div>
          <p style={{ margin: 0, color: colores.textoMedio }}>Monitoreo de salud operativa y satisfacción de inquilinos por ubicación.</p>
        </div>
      </div>

      {/* FACILITY SWITCHER & CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {facilities.map((fac, i) => {
          const isSelected = activeFacility.id === fac.id;
          let statusColor = colores.exito;
          if (fac.status === 'warning') statusColor = colores.advertencia;
          if (fac.status === 'danger') statusColor = colores.peligro;

          return (
            <div key={fac.id} className="anim-fade-up" onClick={() => setActiveFacility(fac)} style={{ 
              background: colores.fondoPrincipal, border: `2px solid ${isSelected ? tema.acento : colores.borde}`, 
              borderRadius: '18px', padding: 20, cursor: 'pointer', transition: 'all 0.2s',
              boxShadow: isSelected ? `0 8px 24px ${tema.acento}20` : '0 2px 12px rgba(0,0,0,0.04)',
              animationDelay: `${i * 0.05}s`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <MapPin size={16} color={colores.textoOscuro} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: colores.textoOscuro }}>{fac.city}</span>
                </div>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: statusColor }} />
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: colores.textoClaro, marginBottom: 16 }}>{fac.name}</div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${colores.borde}`, paddingTop: 12 }}>
                 <div>
                   <div style={{ fontSize: 11, color: colores.textoOscuro, textTransform: 'uppercase' }}>Health Score</div>
                   <div style={{ fontSize: 16, fontWeight: 700, color: statusColor }}>{fac.health}%</div>
                 </div>
                 <div style={{ textAlign: 'right' }}>
                   <div style={{ fontSize: 11, color: colores.textoOscuro, textTransform: 'uppercase' }}>Tickets</div>
                   <div style={{ fontSize: 16, fontWeight: 700, color: colores.textoClaro }}>{fac.tickets}</div>
                 </div>
              </div>
            </div>
          );
        })}
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
          <h3 style={{ margin: '0 0 4px 0', fontSize: 16, color: tema.acentoOscuro, fontWeight: 600 }}>Insight de MAYIA · IA para {activeFacility.name}</h3>
          {activeFacility.status === 'danger' ? (
            <p style={{ margin: 0, fontSize: 14, color: colores.textoMedio }}>Alerta en {activeFacility.name}: El Health Score cayó al {activeFacility.health}%. Se han detectado 28 tickets abiertos, principalmente de HVAC. Se recomienda despachar cuadrilla de refuerzo y notificar a inquilinos sobre mantenimientos.</p>
          ) : (
            <p style={{ margin: 0, fontSize: 14, color: colores.textoMedio }}>Operación estable en {activeFacility.name}. Satisfacción de inquilinos en {activeFacility.satisfaction}%. Mantenimientos preventivos completados a tiempo este mes.</p>
          )}
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${colores.borde}`, marginBottom: 4 }}>
        {[
          { id: 'overview', label: 'Panorama General' },
          { id: 'dispatch', label: 'Panel de Despacho' }
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
      {activeTab === 'overview' && (
        <div className="anim-fade-up" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div style={{ background: colores.fondoPrincipal, border: `1px solid ${colores.borde}`, borderRadius: '18px', padding: 20 }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: 16, color: colores.textoClaro }}>Tendencia de Satisfacción (Inquilinos)</h3>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={satisfactionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colores.borde} />
                  <XAxis dataKey="month" stroke={colores.textoOscuro} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis domain={[60, 100]} stroke={colores.textoOscuro} fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: `1px solid ${colores.borde}` }} />
                  <Line type="monotone" dataKey={activeFacility.id} name={activeFacility.name} stroke={tema.acento} strokeWidth={3} dot={{ r: 4, fill: tema.acento, strokeWidth: 2, stroke: colores.fondoPrincipal }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ background: colores.fondoPrincipal, border: `1px solid ${colores.borde}`, borderRadius: '18px', padding: 20 }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: 16, color: colores.textoClaro }}>Incidencias Acumuladas por Tipo</h3>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incidentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colores.borde} />
                  <XAxis dataKey="name" stroke={colores.textoOscuro} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke={colores.textoOscuro} fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: 12, border: `1px solid ${colores.borde}` }} />
                  <Bar dataKey="count" fill={tema.acentoSuave} radius={[4, 4, 0, 0]}>
                    {incidentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? tema.acento : tema.acentoSuave} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'dispatch' && (
        <div className="anim-fade-up" style={{ background: colores.fondoPrincipal, border: `1px solid ${colores.borde}`, borderRadius: '18px', padding: 24, textAlign: 'center', color: colores.textoMedio }}>
          <Navigation size={48} color={tema.acento} style={{ margin: '0 auto 16px', opacity: 0.8 }} />
          <h3 style={{ margin: '0 0 8px 0', fontSize: 20, color: colores.textoClaro }}>Panel de Despacho Integrado (Próximamente)</h3>
          <p style={{ maxWidth: 500, margin: '0 auto 24px' }}>Visualiza cuadrillas en mapa interactivo y asigna tickets arrastrando y soltando para la sede {activeFacility.name}.</p>
          <button style={{ padding: '10px 24px', borderRadius: 8, background: colores.fondoSecundario, border: `1px solid ${colores.borde}`, color: colores.textoClaro, fontWeight: 600, cursor: 'not-allowed' }}>
            Activar Módulo de Despacho
          </button>
        </div>
      )}
    </div>
  );
};
