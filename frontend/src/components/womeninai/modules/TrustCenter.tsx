import React from 'react';
import { WAI_BRAND_CONFIG } from '../../../config/branding';
import { ShieldCheck, Eye, Lock, FileText, Scale, CheckCircle2 } from 'lucide-react';

export const TrustCenter: React.FC = () => {
  const theme = WAI_BRAND_CONFIG.theme;

  const cardStyle = {
    backgroundColor: theme.cardBgGlass,
    border: `1.5px solid ${theme.border}`,
    borderRadius: '16px',
    padding: '24px',
    boxShadow: theme.shadowCard,
  };

  const sectionTitle = {
    fontSize: '15px',
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const textStyle = {
    color: theme.textSecondary,
    fontSize: '13px',
    lineHeight: 1.5,
    margin: 0,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Hero Banner */}
      <div style={{
        background: theme.gradientHero,
        border: `1.5px solid ${theme.border}`,
        borderRadius: '24px',
        padding: '36px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '280px', height: '280px', borderRadius: '50%', background: `radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ width: '56px', height: '56px', borderRadius: '14px', backgroundColor: 'rgba(16,185,129,0.12)', border: `1.5px solid ${theme.teal}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <ShieldCheck size={28} color={theme.teal} />
        </div>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#FFFFFF', margin: 0 }}>Trust Center WAI</h1>
          <p style={{ color: theme.textSecondary, fontSize: '13px', margin: '4px 0 0' }}>
            Privacidad de datos, consentimiento informado y principios de gobernanza de inteligencia artificial responsable.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '24px' }}>
        
        {/* LFPDPPP Compliance */}
        <div style={cardStyle}>
          <div style={sectionTitle}>
            <Lock size={16} color={theme.teal} /> Cumplimiento de la Ley de Privacidad (LFPDPPP)
          </div>
          <p style={textStyle}>
            La plataforma WAI México cumple estrictamente con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).
          </p>
          <ul style={{ ...textStyle, paddingLeft: '20px', marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><strong>Finalidad Limitada:</strong> Los datos recolectados se utilizan exclusivamente para coordinar el registro, mesas de trabajo y la declaratoria.</li>
            <li><strong>Consentimiento Granular:</strong> El usuario decide explícitamente el nivel de permiso de cada documento que sube (Privado, Síntesis, Declaratoria, Público).</li>
            <li><strong>Derechos ARCO:</strong> Puedes solicitar Acceso, Rectificación, Cancelación u Oposición a tus datos enviando un correo a <span style={{ color: theme.secondary }}>privacidad@wai.mx</span>.</li>
          </ul>
        </div>

        {/* Responsible AI Principles */}
        <div style={cardStyle}>
          <div style={sectionTitle}>
            <Scale size={16} color={theme.accent} /> Principios de IA Responsable
          </div>
          <p style={textStyle}>
            Toda generación y procesamiento automatizado a través de los Agentes de IA WAI se rige por directrices éticas claras:
          </p>
          <ul style={{ ...textStyle, paddingLeft: '20px', marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><strong>Revisión Humana Obligatoria:</strong> Ningún borrador de la declaratoria se publica automáticamente; siempre es editado y validado por el comité editorial y relatoras.</li>
            <li><strong>Trazabilidad:</strong> Cada párrafo de la declaratoria conserva la atribución a la delegación u organización que la originó.</li>
            <li><strong>Mitigación de Sesgos:</strong> Los prompts de Gemini están diseñados con guardrails para evitar la discriminación algorítmica y asegurar la pluralidad de voces.</li>
          </ul>
        </div>
      </div>

      {/* Prompt Operativo Base */}
      <div style={{ ...cardStyle, borderLeft: `4px solid ${theme.secondary}` }}>
        <div style={sectionTitle}>
          <FileText size={16} color={theme.secondary} /> Prompt Operativo Oficial WAI México
        </div>
        <p style={{ ...textStyle, fontStyle: 'italic', backgroundColor: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px', color: '#E2E8F0', lineHeight: 1.6 }}>
          "Actúa como la IA de Women in AI México. Tu función es ayudar a organizar, resumir, conectar y convertir insumos de gobierno, empresas, academia, desarrolladoras y sociedad civil en conocimiento útil para la Declaratoria WAI México 2026 y para el crecimiento responsable de la IA en México. No inventes fuentes. Distingue entre documento cargado, nota de mesa, opinión individual, dato público y conclusión validada. Resume con claridad ejecutiva, identifica consensos y disensos, señala riesgos, propone acciones y marca todo contenido como borrador hasta que sea validado por una relatora o el comité editorial. Respeta permisos de uso, privacidad y consentimiento en todo momento."
        </p>
      </div>

      {/* Seguridad de Infraestructura */}
      <div style={cardStyle}>
        <div style={sectionTitle}>
          <ShieldCheck size={16} color={theme.teal} /> Seguridad y Resiliencia
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '8px' }}>
          {[
            { label: 'Autenticación Segura', desc: 'Registro mediante correo verificado y enlaces mágicos sin almacenar contraseñas débiles.' },
            { label: 'Cifrado en Tránsito', desc: 'Conexión cifrada mediante TLS 1.3 y cifrado AES-256 en base de datos para insumos privados.' },
            { label: 'Bitácora de IA', desc: 'Registro de auditoría inmutable de cada consulta RAG y versión del borrador de declaratoria.' }
          ].map((s, idx) => (
            <div key={idx} style={{ backgroundColor: 'rgba(255,255,255,0.01)', border: `1px solid ${theme.borderSubtle}`, borderRadius: '10px', padding: '12px' }}>
              <h5 style={{ fontSize: '12.5px', fontWeight: '750', color: theme.teal, margin: '0 0 4px 0' }}>{s.label}</h5>
              <p style={{ ...textStyle, fontSize: '11px' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
