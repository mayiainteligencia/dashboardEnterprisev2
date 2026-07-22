import React, { useState } from 'react';
import { 
  Cpu, Server, Code2, ShieldCheck, Database, 
  CheckCircle2, AlertTriangle, Wifi, HardDrive, Monitor,
  Activity, Clock
} from 'lucide-react';
import { brandingConfig } from '../../config/branding';

export const TecnologiasInformacion: React.FC = () => {
  const { colores } = brandingConfig;
  const primario = colores.primario || '#038CAE';

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const kpis = [
    { label: 'Uptime', value: '99.8%', color: '#10B981', icon: Activity },
    { label: 'Tickets Abiertos', value: '23', color: '#F59E0B', icon: AlertTriangle },
    { label: 'Usuarios Activos', value: '1,240', color: primario, icon: Monitor },
    { label: 'Backup', value: 'OK', color: '#10B981', icon: HardDrive },
  ];

  const subCards = [
    {
      id: 2,
      titulo: 'Soporte Técnico',
      descripcion: 'Mesa de ayuda y atención a usuarios en sitio y remoto.',
      mediaSrc: '/assets/tecInfo/soporte.png',
      badge: 'NORMAL',
      badgeColor: '#10B981',
      metric: '23 tickets en cola',
      progress: 45,
      icon: Monitor
    },
    {
      id: 3,
      titulo: 'Desarrollo',
      descripcion: 'Aplicaciones, herramientas corporativas y sistemas internos.',
      mediaSrc: '/assets/tecInfo/desarrollo.png',
      badge: 'ACTIVO',
      badgeColor: primario,
      metric: '4 proyectos activos',
      progress: 75,
      icon: Code2
    },
    {
      id: 4,
      titulo: 'Seguridad',
      descripcion: 'Ciberseguridad, gestión de accesos y protección de datos.',
      mediaSrc: '/assets/tecInfo/seguridad.png',
      badge: 'ALERTA',
      badgeColor: '#F59E0B',
      metric: '2 amenazas recientes',
      progress: 30,
      icon: ShieldCheck
    },
    {
      id: 5,
      titulo: 'Base de Datos',
      descripcion: 'Administración, performance tuning y backup de información.',
      mediaSrc: '/assets/tecInfo/basedatos.png',
      badge: 'NORMAL',
      badgeColor: '#10B981',
      metric: '1.2 TB en uso',
      progress: 60,
      icon: Database
    },
  ];

  const serviciosCriticos = [
    { name: 'ERP BESCO', status: 'up', uptime: '99.9%' },
    { name: 'Correo Corporativo', status: 'up', uptime: '100%' },
    { name: 'Portal Proveedores', status: 'up', uptime: '99.5%' },
    { name: 'Sistema Tickets', status: 'warn', uptime: '98.2%' },
    { name: 'Intranet', status: 'up', uptime: '99.8%' },
  ];

  const alertas = [
    { id: 1, time: '10:23 AM', text: 'Caída de VPN principal mitigada en el nodo 3' },
    { id: 2, time: '08:15 AM', text: 'Alta latencia en servidor DB corregida' },
    { id: 3, time: 'Ayer', text: 'Fallo en sincronización de Active Directory' },
  ];

  const commonCardStyle: React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
    border: '1px solid #E2E8F0',
    overflow: 'hidden',
    position: 'relative'
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100%', padding: '32px', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#0F172A', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
            Tecnologías de Información
          </h1>
          <p style={{ fontSize: '16px', color: '#64748b', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={18} />
            Infraestructura Digital BESCO
          </p>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          {kpis.map((kpi, idx) => (
            <div key={idx} style={{ 
              backgroundColor: '#FFFFFF', 
              padding: '12px 20px', 
              borderRadius: '12px', 
              border: '1px solid #E2E8F0', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '16px', 
              boxShadow: '0 2px 4px -1px rgba(0,0,0,0.02)' 
            }}>
              <div style={{ backgroundColor: `${kpi.color}15`, padding: '10px', borderRadius: '10px' }}>
                <kpi.icon size={22} color={kpi.color} />
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 2px 0', fontWeight: '600', textTransform: 'uppercase' }}>
                  {kpi.label}
                </p>
                <p style={{ fontSize: '18px', color: '#0F172A', margin: 0, fontWeight: 'bold' }}>
                  {kpi.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        {/* Left Column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Hero Card */}
          <div style={{ ...commonCardStyle, display: 'flex', height: '320px', flexDirection: 'row' }}>
            <div style={{ width: '50%', position: 'relative' }}>
              <img 
                src="/assets/tecInfo/infraestructura.png" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                alt="Infraestructura" 
              />
              <div style={{ 
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
                background: 'linear-gradient(to right, transparent 50%, #FFFFFF 100%)' 
              }} />
            </div>
            <div style={{ 
              width: '50%', 
              padding: '32px 40px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              backgroundColor: '#FFFFFF', 
              zIndex: 1 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: `${primario}15`, color: primario }}>
                  <Server size={28} />
                </div>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0F172A', margin: 0 }}>Infraestructura</h2>
              </div>
              <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '28px', lineHeight: 1.6 }}>
                Gestión centralizada de servidores, conectividad y servicios cloud. Manteniendo las bases de la operación continua.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { name: 'Servidores', status: 'up', icon: Server },
                  { name: 'Cloud', status: 'up', icon: Database },
                  { name: 'Red', status: 'up', icon: Wifi },
                  { name: 'VPN', status: 'down', icon: ShieldCheck }
                ].map(ind => (
                  <div key={ind.name} style={{ 
                    display: 'flex', alignItems: 'center', gap: '10px', 
                    padding: '12px 16px', backgroundColor: '#F8FAFC', 
                    borderRadius: '10px', border: '1px solid #F1F5F9' 
                  }}>
                    <div style={{ 
                      width: '10px', height: '10px', borderRadius: '50%', 
                      backgroundColor: ind.status === 'up' ? '#10B981' : '#EF4444',
                      boxShadow: `0 0 8px ${ind.status === 'up' ? '#10B981' : '#EF4444'}`
                    }} />
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>{ind.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2x2 Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {subCards.map(card => (
              <div 
                key={card.id}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  ...commonCardStyle,
                  transition: 'all 0.3s ease',
                  transform: hoveredCard === card.id ? 'translateY(-4px)' : 'none',
                  boxShadow: hoveredCard === card.id ? '0 12px 24px -8px rgba(0,0,0,0.1)' : commonCardStyle.boxShadow,
                }}
              >
                <div style={{ height: '200px', position: 'relative' }}>
                  <img src={card.mediaSrc} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={card.titulo} />
                  <div style={{ 
                    position: 'absolute', top: '16px', right: '16px', 
                    backgroundColor: card.badgeColor, color: '#FFF', 
                    padding: '6px 14px', borderRadius: '20px', 
                    fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.5px', 
                    boxShadow: '0 4px 6px rgba(0,0,0,0.15)' 
                  }}>
                    {card.badge}
                  </div>
                  <div style={{ 
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
                    background: 'linear-gradient(to top, #FFFFFF, transparent)'
                  }} />
                </div>
                <div style={{ padding: '20px 24px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <card.icon size={22} color={primario} />
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0F172A', margin: 0 }}>{card.titulo}</h3>
                  </div>
                  <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 20px 0', minHeight: '42px', lineHeight: 1.5 }}>
                    {card.descripcion}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>Uso / Estado</span>
                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: primario }}>{card.metric}</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: '#F1F5F9', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ 
                      width: `${card.progress}%`, height: '100%', 
                      backgroundColor: card.badgeColor, borderRadius: '3px', 
                      transition: 'width 1s ease-in-out' 
                    }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Panel */}
        <div style={{ width: '350px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ ...commonCardStyle, padding: '28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0F172A', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Activity size={22} color={primario} />
              Estado de Sistemas
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
              {serviciosCriticos.map(srv => (
                <div key={srv.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ 
                      width: '10px', height: '10px', borderRadius: '50%', 
                      backgroundColor: srv.status === 'up' ? '#10B981' : srv.status === 'warn' ? '#F59E0B' : '#EF4444', 
                      boxShadow: `0 0 8px ${srv.status === 'up' ? '#10B981' : srv.status === 'warn' ? '#F59E0B' : '#EF4444'}` 
                    }} />
                    <span style={{ fontSize: '14px', color: '#334155', fontWeight: '600' }}>{srv.name}</span>
                  </div>
                  <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '700' }}>{srv.uptime}</span>
                </div>
              ))}
            </div>

            <div style={{ height: '1px', backgroundColor: '#E2E8F0', margin: '0 -28px 28px -28px' }} />

            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#0F172A', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={18} color="#64748b" />
              Alertas Recientes
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {alertas.map(al => (
                <div key={al.id} style={{ 
                  display: 'flex', gap: '14px', padding: '16px', 
                  backgroundColor: '#F8FAFC', borderRadius: '12px', 
                  borderLeft: `4px solid #10B981` 
                }}>
                  <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <p style={{ fontSize: '13px', color: '#334155', margin: '0 0 6px 0', lineHeight: 1.4, fontWeight: '500' }}>
                      {al.text}
                    </p>
                    <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '600', textTransform: 'uppercase' }}>
                      {al.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
