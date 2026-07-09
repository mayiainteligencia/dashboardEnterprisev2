import React, { useState, useEffect } from 'react';
import { Users, Calendar, Video, ArrowRight, Star, Clock, CheckCircle, FileText } from 'lucide-react';
import { brandingConfig } from '../../config/branding';

export const AcompanamientoExperto: React.FC = () => {
  const { colores } = brandingConfig;
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => { const c = () => setIsMobile(window.innerWidth < 1024); c(); window.addEventListener('resize', c); return () => window.removeEventListener('resize', c); }, []);
  const px = isMobile ? '16px' : '32px';

  const proximasSesiones = [
    { titulo: 'Revisión trimestral de ROI en IA', experto: 'Dra. Elena Ramos (Chief AI Officer)', fecha: 'Mañana, 10:00 AM', tipo: 'Comité de Valor', link: '#' },
    { titulo: 'Taller: Monetización de Data Lake', experto: 'Ing. Carlos Mendoza (Data Architect)', fecha: 'Jueves 28, 15:00 PM', tipo: 'Workshop', link: '#' },
    { titulo: 'Alineación estratégica SOC IA', experto: 'Lic. Ana Silva (CISO As a Service)', fecha: 'Lun 02, 11:30 AM', tipo: 'Consultoría', link: '#' },
  ];

  const especialistas = [
    { nombre: 'Sin Asignar', rol: 'Lead AI Scientist', exp: '12 años exp.', focus: 'Modelos Predictivos, LLMs' },
    { nombre: 'Sin Asignar', rol: 'Data Governance Director', exp: '15 años exp.', focus: 'Cumplimiento, Calidad de Datos' },
    { nombre: 'Sin Asignar', rol: 'Cloud Architecture Lead', exp: '10 años exp.', focus: 'Soberanía Cloud, DRP' },
    { nombre: 'Sin Asignar', rol: 'AI Value Consultant', exp: '8 años exp.', focus: 'ROI, Casos de Negocio' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: colores.fondoPrincipal }}>
      <div style={{ padding: isMobile ? '16px 16px 0' : '28px 32px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'linear-gradient(135deg, #EC4899, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={16} color="#fff" />
          </div>
          <h2 style={{ fontSize: isMobile ? '18px' : '22px', fontWeight: '900', color: colores.textoClaro, margin: 0 }}>Acompañamiento Experto y Comité de Valor</h2>
        </div>
        <p style={{ fontSize: '13px', color: colores.textoMedio, margin: '0 0 12px 0' }}>Consultoría humana de alto nivel para potenciar su estrategia tecnológica.</p>
      </div>

      <div style={{ padding: `20px ${px} 32px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          
          {/* Próximas Sesiones */}
          <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: colores.textoClaro, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={18} color="#EC4899" /> Agenda y Sesiones
              </h3>
              <button style={{ background: 'none', border: `1px solid ${colores.borde}`, borderRadius: '8px', padding: '6px 12px', fontSize: '12px', fontWeight: '600', color: colores.textoClaro, cursor: 'pointer' }}>Ver calendario</button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {proximasSesiones.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '16px', backgroundColor: colores.fondoTerciario, borderRadius: '16px', borderLeft: `4px solid ${i === 0 ? '#EC4899' : '#8B5CF6'}` }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: `${i === 0 ? '#EC4899' : '#8B5CF6'}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Video size={20} color={i === 0 ? '#EC4899' : '#8B5CF6'} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '700', color: colores.textoClaro, margin: 0 }}>{s.titulo}</h4>
                      <span style={{ fontSize: '10px', fontWeight: '700', color: i === 0 ? '#EC4899' : '#8B5CF6', backgroundColor: `${i === 0 ? '#EC4899' : '#8B5CF6'}15`, padding: '2px 8px', borderRadius: '12px', whiteSpace: 'nowrap' }}>{s.tipo}</span>
                    </div>
                    <p style={{ fontSize: '12px', color: colores.textoMedio, margin: '0 0 8px 0' }}>Con: {s.experto}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: colores.textoOscuro }}>
                      <Clock size={12} /> {s.fecha}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button style={{ width: '100%', marginTop: '16px', padding: '14px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #EC4899, #8B5CF6)', color: 'white', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              Agendar nueva sesión consultiva <ArrowRight size={16} />
            </button>
          </div>

          {/* El Comité de Valor */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '24px', flex: 1, backgroundImage: `radial-gradient(circle at top right, ${colores.primario}10, transparent 60%)` }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: `${colores.primario}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Star size={24} color={colores.primario} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '900', color: colores.textoClaro, margin: '0 0 12px 0' }}>Comité de Valor DC Inteligente</h3>
              <p style={{ fontSize: '14px', color: colores.textoMedio, margin: '0 0 20px 0', lineHeight: 1.6 }}>
                Más que un proveedor tecnológico, actuamos como una extensión de su equipo directivo. El Comité de Valor se reúne periódicamente para alinear la infraestructura, la IA y los datos con los objetivos estratégicos de su negocio.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'Revisión de KPIs de negocio vs KPIs tecnológicos',
                  'Identificación de nuevas oportunidades de monetización',
                  'Gestión de riesgos y actualización de madurez digital',
                  'Hoja de ruta estratégica para los próximos 6 meses'
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle size={16} color={colores.exito} style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ fontSize: '13px', color: colores.textoClaro, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Documentos */}
            <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: `${colores.exito}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={20} color={colores.exito} />
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '700', color: colores.textoClaro, margin: '0 0 4px 0' }}>Reporte Q3 2026 - Value Realization</h4>
                  <p style={{ fontSize: '12px', color: colores.textoMedio, margin: 0 }}>Generado hace 12 días · 2.4 MB PDF</p>
                </div>
              </div>
              <button style={{ padding: '8px 16px', borderRadius: '8px', border: `1px solid ${colores.exito}`, color: colores.exito, background: 'transparent', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Descargar</button>
            </div>
          </div>
        </div>

        {/* Especialistas Asignados */}
        <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: colores.textoClaro, margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={18} color={colores.primario} /> Su equipo de especialistas asignado
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
            {especialistas.map((e, i) => (
              <div key={i} style={{ backgroundColor: colores.fondoTerciario, borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', border: `1px solid ${colores.borde}40` }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: `${colores.primario}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', fontSize: '24px', fontWeight: '800', color: colores.primario }}>
                  {e.nombre === 'Sin Asignar' ? '-' : e.nombre.split(' ')[1][0]}
                </div>
                <h4 style={{ fontSize: '15px', fontWeight: '800', color: colores.textoClaro, margin: '0 0 4px 0' }}>{e.nombre}</h4>
                <p style={{ fontSize: '12px', fontWeight: '600', color: colores.primario, margin: '0 0 8px 0' }}>{e.rol}</p>
                <p style={{ fontSize: '11px', color: colores.textoMedio, margin: '0 0 12px 0' }}>{e.exp}</p>
                <div style={{ backgroundColor: colores.fondoSecundario, padding: '6px 12px', borderRadius: '8px', fontSize: '10px', color: colores.textoOscuro, width: '100%' }}>
                  Foco: {e.focus}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
