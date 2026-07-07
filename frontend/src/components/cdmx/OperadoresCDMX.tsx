import React, { useState } from 'react';
import { Building2, Globe, Calendar, Phone, ShieldCheck, ChevronDown, Award, Network, Bus, Map, Users } from 'lucide-react';

interface Operador {
  id: number;
  nombre: string;
  siglas: string;
  color: string;
  descripcion: string;
  flota: number;
  rutas: number;
  pasajeros: string;
  contacto: string;
  web: string;
  certs: string[];
}

const OPERADORES_DATA: Operador[] = [
  { id: 1, nombre: 'Sistema de Transporte Colectivo Metro', siglas: 'STC', color: '#D40000', descripcion: 'Red subterránea principal y columna vertebral de la CDMX.', flota: 389, rutas: 12, pasajeros: '4.2M / día', contacto: '55 5627-4636', web: 'metro.cdmx.gob.mx', certs: ['Accesible', 'ISO 9001', 'BiciRed'] },
  { id: 2, nombre: 'Metrobús CDMX', siglas: 'MB', color: '#003DA5', descripcion: 'Sistema BRT de autobuses de tránsito rápido de alta capacidad en carril confinado.', flota: 354, rutas: 7, pasajeros: '950K / día', contacto: '55 5482-7000', web: 'metrobus.cdmx.gob.mx', certs: ['Accesible', 'Carril Confinado', 'Cámaras C5'] },
  { id: 3, nombre: 'Cablebús CDMX', siglas: 'CB', color: '#00843D', descripcion: 'Sistema aéreo de teleférico urbano enfocado en zonas de difícil acceso geográfico.', flota: 280, rutas: 2, pasajeros: '90K / día', contacto: '55 5709-5700', web: 'cablebus.cdmx.gob.mx', certs: ['Accesible', 'Ecológico', 'Cero Emisiones'] },
  { id: 4, nombre: 'Red de Transporte de Pasajeros', siglas: 'RTP', color: '#E87722', descripcion: 'Red de autobuses públicos de pasajeros que conecta la periferia con las estaciones principales.', flota: 800, rutas: 150, pasajeros: '650K / día', contacto: '55 5522-7555', web: 'rtp.cdmx.gob.mx', certs: ['Nocturno', 'Tarifa Social'] },
  { id: 5, nombre: 'Servicio de Transportes Eléctricos (Trolebús)', siglas: 'TR', color: '#6929C4', descripcion: 'Trolebuses eléctricos y trolebús elevado que ofrecen viajes silenciosos y sustentables.', flota: 124, rutas: 9, pasajeros: '120K / día', contacto: '55 5550-5451', web: 'ste.cdmx.gob.mx', certs: ['Ecológico', 'Cero Emisiones', 'Nocturno'] },
  { id: 6, nombre: 'Tren Ligero CDMX', siglas: 'TL', color: '#B5A139', descripcion: 'Ferrocarril ligero superficial que recorre el sur de la Ciudad, de Tasqueña a Xochimilco.', flota: 16, rutas: 1, pasajeros: '45K / día', contacto: '55 5627-4636', web: 'ste.cdmx.gob.mx', certs: ['Accesible', 'Eléctrico'] }
];

export const OperadoresCDMX: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto', height: 'calc(100vh - 120px)', paddingRight: '4px' }} className="no-scrollbar">
      
      {/* SUMMARY STATS BAR */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        {[
          { label: 'Flota Total de Unidades', value: '1,963 unidades', color: 'var(--color-metro-primary)', icon: Bus },
          { label: 'Líneas y Rutas Operadas', value: '181 corredores', color: 'var(--color-metro-blue)', icon: Map },
          { label: 'Pasajeros Atendidos Diarios', value: '6.05 Millones', color: 'var(--color-metro-green)', icon: Users }
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} style={{ background: '#1A1A2E', border: '1px solid #2A2A3E', borderRadius: '14px', padding: '14px 18px', borderLeft: `3px solid ${s.color}`, display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Icon size={20} color={s.color} style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: '#fff', fontFamily: 'Outfit, sans-serif', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '10px', color: '#A0AEC0', marginTop: '4px' }}>{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* OPERATORS GRID */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <span style={{ fontSize: '11px', fontWeight: '700', color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Directorio Corporativo</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '14px' }}>
          {OPERADORES_DATA.map((op) => {
            const isExpanded = expandedId === op.id;
            return (
              <div
                key={op.id}
                style={{
                  background: '#1A1A2E', border: `1px solid ${isExpanded ? op.color : '#2A2A3E'}`,
                  borderRadius: '16px', padding: '16px 18px', display: 'flex', flexDirection: 'column',
                  gap: '12px', position: 'relative', overflow: 'hidden', transition: 'all 0.2s',
                  boxShadow: isExpanded ? `0 6px 18px ${op.color}15` : 'none'
                }}
              >
                {/* Top border color stripe */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', backgroundColor: op.color }} />

                {/* Main Card Info */}
                <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '34px', height: '34px', borderRadius: '10px',
                      backgroundColor: op.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '13px', fontWeight: '800', color: '#fff', boxShadow: `0 4px 10px ${op.color}45`
                    }}>
                      {op.siglas}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#fff', margin: 0 }}>{op.nombre}</h4>
                      <span style={{ fontSize: '10px', color: '#A0AEC0' }}>Movilidad Integrada</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleExpand(op.id)}
                    style={{
                      background: 'none', border: 'none', color: '#A0AEC0', cursor: 'pointer',
                      padding: '4px', borderRadius: '50%', display: 'flex', alignItems: 'center',
                      transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s'
                    }}
                  >
                    <ChevronDown size={16} />
                  </button>
                </div>

                <p style={{ fontSize: '11.5px', color: '#A0AEC0', lineHeight: 1.4, margin: 0 }}>
                  {op.descripcion}
                </p>

                {/* Quick stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', textAlign: 'center', background: '#121212', borderRadius: '10px', padding: '8px' }}>
                  {[
                    { label: 'Flota', value: op.flota },
                    { label: 'Líneas/Rutas', value: op.rutas },
                    { label: 'Pasajeros', value: op.pasajeros.split(' ')[0] }
                  ].map((s, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: '12px', fontWeight: '800', color: '#fff' }}>{s.value}</div>
                      <div style={{ fontSize: '9px', color: '#4A5568', textTransform: 'uppercase', marginTop: '1px' }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div style={{
                    borderTop: '1px solid #2A2A3E', paddingTop: '12px', display: 'flex', flexDirection: 'column',
                    gap: '10px', animation: 'fadeInUp 0.2s ease', fontSize: '11.5px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A0AEC0' }}>
                      <Phone size={12} color={op.color} />
                      <span>Contacto: <strong style={{ color: '#fff' }}>{op.contacto}</strong></span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A0AEC0' }}>
                      <Globe size={12} color={op.color} />
                      <span>Sitio Web: </span>
                      <a href={`https://${op.web}`} target="_blank" rel="noopener noreferrer" style={{ color: op.color, textDecoration: 'none', fontWeight: '600' }}>
                        {op.web}
                      </a>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                      {op.certs.map((c, idx) => (
                        <span key={idx} style={{
                          display: 'inline-flex', alignItems: 'center', gap: '4px',
                          background: 'rgba(255,255,255,0.03)', border: '1px solid #2A2A3E',
                          borderRadius: '6px', padding: '3px 8px', fontSize: '9.5px', color: '#A0AEC0', fontWeight: '600'
                        }}>
                          <Award size={10} color={op.color} />
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CONNECTIONS DIAGRAM */}
      <div style={{ background: '#1A1A2E', border: '1px solid #2A2A3E', borderRadius: '16px', padding: '20px' }}>
        <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Outfit, sans-serif', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          <Network size={16} color="var(--color-metro-primary)" />
          Mapa de Integración de Movilidad
        </h3>
        
        {/* Visual CSS diagram */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center', position: 'relative' }}>
          {/* Main Core */}
          <div style={{
            background: 'linear-gradient(135deg, #D40000 0%, #003DA5 100%)',
            border: '2px solid #fff', borderRadius: '12px', padding: '10px 24px',
            color: '#fff', fontWeight: '800', fontSize: '13px', textAlign: 'center',
            boxShadow: '0 4px 15px rgba(212,0,0,0.3)', zIndex: 2
          }}>
            Tarjeta de Movilidad Integrada (MI)
            <div style={{ fontSize: '9px', fontWeight: '400', opacity: 0.8, marginTop: '2px' }}>Medio de acceso unificado de CDMX</div>
          </div>

          {/* Connection Lines & Nodes Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px', width: '100%', marginTop: '10px', position: 'relative' }}>
            {/* Connecting lines overlay */}
            <div style={{
              position: 'absolute', top: '-15px', left: '8%', right: '8%', height: '2px',
              background: 'linear-gradient(90deg, #D40000, #003DA5, #00843D, #E87722, #6929C4, #B5A139)',
              opacity: 0.4, zIndex: 1
            }} />
            
            {[
              { label: 'STC Metro', color: '#D40000' },
              { label: 'Metrobús', color: '#003DA5' },
              { label: 'Cablebús', color: '#00843D' },
              { label: 'Bus RTP', color: '#E87722' },
              { label: 'Trolebús', color: '#6929C4' },
              { label: 'Tren Ligero', color: '#B5A139' }
            ].map((node, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 2 }}>
                {/* vertical line */}
                <div style={{ width: '2px', height: '14px', background: node.color, opacity: 0.6 }} />
                
                <div style={{
                  background: '#121212', border: `1px solid ${node.color}40`,
                  borderRadius: '10px', padding: '8px 10px', color: '#fff', fontSize: '11px',
                  fontWeight: '700', textAlign: 'center', width: '100%',
                  boxShadow: `0 4px 10px ${node.color}10`
                }}>
                  {node.label}
                  <div style={{ fontSize: '8px', color: '#A0AEC0', fontWeight: '400', marginTop: '2px' }}>Acepta MI</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
