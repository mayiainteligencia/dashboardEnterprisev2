import React, { useState, useEffect } from 'react';
import { ShoppingBag, ArrowRight, Zap, Shield, Database, LayoutDashboard, BrainCircuit, Bot, Search, Cloud, Activity, Users, Settings, Server, CheckCircle, X } from 'lucide-react';
import { brandingConfig } from '../../config/branding';

export const MarketplaceServicios: React.FC = () => {
  const { colores } = brandingConfig;
  const [isMobile, setIsMobile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  useEffect(() => { const c = () => setIsMobile(window.innerWidth < 1024); c(); window.addEventListener('resize', c); return () => window.removeEventListener('resize', c); }, []);
  const px = isMobile ? '16px' : '32px';

  const services = [
    { id: 1, title: 'Data Value Assessment', tagline: 'Descubra el valor oculto de sus datos', desc: 'Análisis de sus repositorios de datos para identificar oportunidades de monetización y casos de uso de IA con alto ROI.', icon: <Database size={24} color="#8B5CF6" />, color: '#8B5CF6' },
    { id: 2, title: 'AI Readiness Assessment', tagline: '¿Está su empresa lista para la IA?', desc: 'Evaluación de madurez tecnológica, talento y procesos para implementar inteligencia artificial a escala.', icon: <BrainCircuit size={24} color={colores.primario} />, color: colores.primario },
    { id: 3, title: 'Data Lake Soberano', tagline: 'Sus datos bajo su control absoluto', desc: 'Despliegue de un Data Lake en infraestructura soberana, garantizando cumplimiento normativo y seguridad.', icon: <Database size={24} color={colores.exito} />, color: colores.exito },
    { id: 4, title: 'Dashboard Ejecutivo Inteligente', tagline: 'Visibilidad total de su negocio', desc: 'Implementación de tableros de control con IA integrada para análisis predictivo y toma de decisiones.', icon: <LayoutDashboard size={24} color="#3B82F6" />, color: '#3B82F6' },
    { id: 5, title: 'AI Decision Room', tagline: 'Centro de mando para alta dirección', desc: 'Entorno inmersivo de simulación de escenarios de negocio asistido por agentes de inteligencia artificial.', icon: <Activity size={24} color="#EC4899" />, color: '#EC4899' },
    { id: 6, title: 'Data Monetization Lab', tagline: 'Convierta datos en nuevas líneas de ingresos', desc: 'Taller práctico y desarrollo de prototipos para empaquetar y comercializar activos de datos.', icon: <Zap size={24} color={colores.advertencia} />, color: colores.advertencia },
    { id: 7, title: 'AI Agents for Business', tagline: 'Fuerza de trabajo digital', desc: 'Desarrollo e integración de agentes autónomos especializados (CFO IA, SOC IA, Asistente Comercial).', icon: <Bot size={24} color={colores.primario} />, color: colores.primario },
    { id: 8, title: 'Predictive Intelligence Services', tagline: 'Anticípese al futuro', desc: 'Modelos de machine learning as a service para predicción de demanda, churn y mantenimiento.', icon: <Search size={24} color="#8B5CF6" />, color: '#8B5CF6' },
    { id: 9, title: 'SOC IA', tagline: 'Seguridad proactiva e inteligente', desc: 'Centro de operaciones de seguridad gestionado por IA, detectando y mitigando amenazas en milisegundos.', icon: <Shield size={24} color={colores.peligro} />, color: colores.peligro },
    { id: 10, title: 'Nube Soberana FLAI', tagline: 'La nube que respeta sus fronteras', desc: 'Infraestructura cloud de alto rendimiento con garantía de residencia de datos nacional.', icon: <Cloud size={24} color={colores.primario} />, color: colores.primario },
    { id: 11, title: 'GPU as a Service', tagline: 'Poder de cómputo para sus modelos', desc: 'Acceso bajo demanda a clústeres de GPUs de última generación para entrenamiento e inferencia.', icon: <Server size={24} color={colores.advertencia} />, color: colores.advertencia },
    { id: 12, title: 'PoC Lab', tagline: 'Pruebe antes de invertir', desc: 'Entorno de laboratorio y acompañamiento experto para desarrollar Pruebas de Concepto tecnológicas rápidas.', icon: <Zap size={24} color={colores.exito} />, color: colores.exito },
    { id: 13, title: 'Data Governance as a Service', tagline: 'Datos limpios, seguros y accesibles', desc: 'Oficina de gobierno de datos externalizada para mantener la calidad y cumplimiento de su información.', icon: <Settings size={24} color="#3B82F6" />, color: '#3B82F6' },
    { id: 14, title: 'AI Factory Managed Services', tagline: 'Operación continua de IA', desc: 'Gestión, monitoreo y reentrenamiento continuo de sus modelos de IA en producción (MLOps).', icon: <Users size={24} color="#EC4899" />, color: '#EC4899' },
  ];

  const handleActivar = (title: string) => {
    setSelectedService(title);
    setModalOpen(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: colores.fondoPrincipal }}>
      <div style={{ padding: isMobile ? '16px 16px 0' : '28px 32px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: colores.gradientePrimario, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingBag size={16} color="#fff" />
          </div>
          <h2 style={{ fontSize: isMobile ? '18px' : '22px', fontWeight: '900', color: colores.textoClaro, margin: 0 }}>Marketplace de Servicios Inteligentes</h2>
        </div>
        <p style={{ fontSize: '13px', color: colores.textoMedio, margin: '0 0 12px 0' }}>Catálogo de soluciones · IA · Datos · Infraestructura · Seguridad</p>
      </div>

      <div style={{ padding: `20px ${px} 32px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {services.map(s => (
            <div key={s.id} style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '24px', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 24px ${s.color}15`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                {s.icon}
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: colores.textoClaro, margin: '0 0 6px 0', lineHeight: 1.2 }}>{s.title}</h3>
              <p style={{ fontSize: '12px', fontWeight: '600', color: s.color, margin: '0 0 12px 0' }}>{s.tagline}</p>
              <p style={{ fontSize: '12px', color: colores.textoMedio, margin: '0 0 20px 0', lineHeight: 1.5, flex: 1 }}>{s.desc}</p>
              <button
                onClick={() => handleActivar(s.title)}
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: 'none', background: `linear-gradient(135deg, ${s.color}, ${s.color}dd)`, color: 'white', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Solicitar Servicio <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }} onClick={() => setModalOpen(false)}>
          <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '24px', padding: '32px', maxWidth: '400px', width: '100%', textAlign: 'center', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setModalOpen(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: colores.textoMedio }}><X size={20} /></button>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: `${colores.exito}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
              <CheckCircle size={32} color={colores.exito} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: colores.textoClaro, margin: '0 0 12px 0' }}>Solicitud Recibida</h3>
            <p style={{ fontSize: '14px', color: colores.textoMedio, margin: '0 0 24px 0', lineHeight: 1.5 }}>
              Hemos registrado su interés en <strong>{selectedService}</strong>. Un especialista de DC Inteligente se pondrá en contacto con usted a la brevedad para agendar una sesión consultiva.
            </p>
            <button onClick={() => setModalOpen(false)} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: colores.gradientePrimario, color: 'white', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
