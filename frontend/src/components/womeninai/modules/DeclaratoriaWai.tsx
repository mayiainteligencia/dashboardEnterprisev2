import React from 'react';
import { WAI_BRAND_CONFIG } from '../../../config/branding';
import { FileText, Download, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

export const DeclaratoriaWai: React.FC = () => {
  const theme = WAI_BRAND_CONFIG.theme;

  const cardStyle = {
    backgroundColor: theme.cardBgGlass,
    border: `1.5px solid ${theme.border}`,
    borderRadius: '16px',
    padding: '24px',
    boxShadow: theme.shadowCard,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Header Banner */}
      <div style={{
        background: theme.gradientHero,
        border: `1.5px solid ${theme.border}`,
        borderRadius: '24px',
        padding: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '280px', height: '280px', borderRadius: '50%', background: `radial-gradient(circle, rgba(255,64,129,0.08) 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <div>
          <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: theme.secondary, letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>Salida Institucional</span>
          <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#FFFFFF', margin: 0 }}>Declaratoria WAI México 2026</h1>
          <p style={{ color: theme.textSecondary, fontSize: '13px', margin: '4px 0 0' }}>El plan de acción nacional para el desarrollo ético e inclusivo de la Inteligencia Artificial.</p>
        </div>

        {/* Action Downloads */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button style={{ backgroundColor: theme.secondary, color: '#020B1C', border: 'none', borderRadius: '10px', padding: '10px 18px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: `0 4px 14px rgba(255,192,0,0.2)` }}>
            <Download size={14} /> Descargar Borrador v0.1 (PDF)
          </button>
        </div>
      </div>

      {/* Progress & Current Status */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '24px' }}>
        
        {/* Progress Card */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#FFFFFF', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={16} color={theme.secondary} /> Estado de Avance de la Declaratoria
          </h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', color: theme.secondary, marginBottom: '6px' }}>
            <span>Consolidación de Borrador Inicial (v0.1)</span>
            <span>45% Completado</span>
          </div>
          <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden', marginBottom: '16px' }}>
            <div style={{ width: '45%', height: '100%', backgroundColor: theme.secondary, borderRadius: '4px' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { version: 'v0.1 Borrador Inicial', date: 'Julio 2026', status: 'live', desc: 'Ingesta de documentos base de la industria y academia. Actualmente en proceso.' },
              { version: 'v0.2 Revisión de Relatoras', date: 'Septiembre 2026 (Durante Summit)', status: 'upcoming', desc: 'Síntesis de propuestas generadas durante las mesas de la asamblea.' },
              { version: 'v1.0 Publicación Oficial', date: 'Septiembre 24, 2026 (Fin de Summit)', status: 'upcoming', desc: 'Versión final validada por el comité editorial y aprobada legalmente.' }
            ].map((v, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '12px', padding: '12px', borderRadius: '10px', backgroundColor: 'rgba(0,0,0,0.15)', borderLeft: `3px solid ${v.status === 'live' ? theme.secondary : 'rgba(255,255,255,0.1)'}` }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '750', color: v.status === 'live' ? theme.secondary : '#FFFFFF' }}>{v.version}</span>
                    <span style={{ fontSize: '10px', color: theme.textMuted }}>{v.date}</span>
                  </div>
                  <p style={{ fontSize: '11.5px', color: theme.textSecondary, margin: 0, lineHeight: 1.4 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5 Key Points Preview */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#FFFFFF', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={16} color={theme.teal} /> Puntos Clave de la Agenda Nacional
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { id: '1', title: 'Perspectiva de Género en IA', desc: 'Establecer metas de participación femenina en equipos técnicos y de investigación en México para 2027.' },
              { id: '2', title: 'Sandbox de Pruebas Éticas', desc: 'Crear un entorno seguro para evaluar la equidad y sesgo algorítmico en soluciones de IA locales.' },
              { id: '3', title: 'Becas WAI de Investigación', desc: 'Impulsar el doctorado y postdoctorado de investigadoras mexicanas en IA y ciencias de datos.' },
              { id: '4', title: 'Fondo para Fundadoras IA', desc: 'Promover la inversión semilla y capital de riesgo estructurado enfocado en startups dirigidas por mujeres.' },
              { id: '5', title: 'Infraestructura de Transferencia', desc: 'Facilitar la colaboración directa entre laboratorios universitarios y casos de uso industrial.' }
            ].map(p => (
              <div key={p.id} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'rgba(16,185,129,0.1)', border: `1px solid ${theme.teal}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '900', color: theme.teal, flexShrink: 0, marginTop: '2px' }}>
                  {p.id}
                </div>
                <div>
                  <h4 style={{ fontSize: '12.5px', fontWeight: '750', color: '#FFFFFF', margin: '0 0 2px 0' }}>{p.title}</h4>
                  <p style={{ fontSize: '11.5px', color: theme.textSecondary, margin: 0, lineHeight: 1.4 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Methodology Section */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#FFFFFF', margin: '0 0 20px 0' }}>Metodología de Co-Creación WAI</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
          {[
            { step: '1', title: 'Carga de Documentos', desc: 'Insumos base de la industria y la academia.' },
            { step: '2', title: 'Clasificación IA', desc: 'Estructuración y categorización temática.' },
            { step: '3', title: 'Mesas del Summit', desc: 'Deliberación y consensos en vivo.' },
            { step: '4', title: 'Edición Editorial', desc: 'Validación legal y humana del texto.' },
            { step: '5', title: 'Votación Directa', desc: 'Priorización de compromisos en plataforma.' },
            { step: '6', title: 'Publicación Oficial', desc: 'Difusión de política pública nacional.' }
          ].map((m, idx) => (
            <div key={idx} style={{ backgroundColor: 'rgba(255,255,255,0.01)', border: `1.5px solid ${theme.borderSubtle}`, borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(255,192,0,0.1)', border: `1px solid ${theme.secondary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '950', color: theme.secondary }}>
                {m.step}
              </div>
              <h5 style={{ fontSize: '12px', fontWeight: '800', color: '#FFFFFF', margin: '4px 0 0 0' }}>{m.title}</h5>
              <p style={{ fontSize: '10.5px', color: theme.textMuted, margin: 0, lineHeight: 1.3 }}>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ruta WAI México 2027 */}
      <div style={{ ...cardStyle, borderLeft: `4px solid ${theme.accent}` }}>
        <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#FFFFFF', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={16} color={theme.accent} /> Ruta de Continuidad WAI México 2027
        </h3>
        <p style={{ fontSize: '13px', color: theme.textSecondary, margin: '0 0 16px 0', lineHeight: 1.5 }}>
          La Declaratoria no termina con el evento. Establecemos una ruta permanente de mesas de trabajo y hackathons temáticos para 2027.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {[
            { title: 'Mesas Permanentes', desc: 'Comités de seguimiento mensuales con sponsors y academia.' },
            { title: 'WaiDatathons 2027', desc: 'Hackathons nacionales para prototipar soluciones de impacto ético.' },
            { title: 'Red de Mentorías', desc: '150 mentorías emparejadas por el motor de matchmaking IA.' }
          ].map((r, idx) => (
            <div key={idx} style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '10px' }}>
              <h5 style={{ fontSize: '12.5px', fontWeight: '750', color: theme.accent, margin: '0 0 4px 0' }}>{r.title}</h5>
              <p style={{ fontSize: '11px', color: theme.textSecondary, margin: 0, lineHeight: 1.4 }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
