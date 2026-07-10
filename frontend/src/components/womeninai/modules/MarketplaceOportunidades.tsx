import React, { useState } from 'react';
import { WAI_BRAND_CONFIG } from '../../../config/branding';
import { Briefcase, Award, Users, AlertTriangle, Sparkles, Building, Calendar, ArrowUpRight } from 'lucide-react';

interface Oportunidad {
  id: string;
  titulo: string;
  entidad: string;
  tipo: 'reto' | 'vacante' | 'mentoria' | 'convocatoria';
  desc: string;
  tag: string;
  meta: string;
}

const OPORTUNIDADES_DATA: Oportunidad[] = [
  // Retos
  {
    id: "r1",
    titulo: "Solución de IA para detección de fraude",
    entidad: "IBM México",
    tipo: 'reto',
    desc: "Desarrollar un modelo de machine learning con explicabilidad de decisiones para banca retail.",
    tag: "Fintech",
    meta: "Premio: $50,000 MXN · Cierra: Ago 15, 2026"
  },
  {
    id: "r2",
    titulo: "Modelo de procesamiento para lenguas indígenas",
    entidad: "Google Cloud México",
    tipo: 'reto',
    desc: "Afinar un LLM para la traducción y conservación de lenguas nativas mexicanas.",
    tag: "NLP",
    meta: "Mentoría + Créditos Cloud · Cierra: Sep 01, 2026"
  },
  // Vacantes
  {
    id: "v1",
    titulo: "AI Specialist / Data Scientist Senior",
    entidad: "NEORIS",
    tipo: 'vacante',
    desc: "Diseño e implementación de asistentes corporativos RAG y automatización industrial.",
    tag: "Generative AI",
    meta: "Remoto (México) · Tiempo Completo"
  },
  {
    id: "v2",
    titulo: "Líder de MLOps",
    entidad: "Bitso",
    tipo: 'vacante',
    desc: "Despliegue y monitoreo de modelos predictivos en infraestructura serverless y kubernetes.",
    tag: "MLOps",
    meta: "CDMX (Híbrido) · Atractivo esquema"
  },
  // Mentorias
  {
    id: "m1",
    titulo: "Mentoría: De la Investigación al VC",
    entidad: "Dra. Sylvia Conde (Investigadora UNAM)",
    tipo: 'mentoria',
    desc: "Acompañamiento a académicas para convertir patentes de IA en modelos de negocio viables.",
    tag: "Academia",
    meta: "Programa de 3 meses · 4 cupos"
  },
  {
    id: "m2",
    titulo: "Estrategias de Growth en Startups de IA",
    entidad: "Ing. Mariana Costa (CTO Bitso)",
    tipo: 'mentoria',
    desc: "Mentoría uno-a-uno para fundadoras de startups de IA en etapas pre-seed.",
    tag: "Startups",
    meta: "Sesiones quincenales · 2 cupos"
  },
  // Convocatorias
  {
    id: "c1",
    titulo: "Convocatoria WAICamp 2026",
    entidad: "Women in AI México",
    tipo: 'convocatoria',
    desc: "Bootcamp intensivo práctico sobre modelos fundacionales para estudiantes universitarias.",
    tag: "Educación",
    meta: "Beca 100% · Cierra: Julio 20, 2026"
  },
  {
    id: "c2",
    titulo: "WaiAwards North America 2026",
    entidad: "WAI Global",
    tipo: 'convocatoria',
    desc: "Nominaciones para reconocer a las mujeres líderes de IA en investigación y ética.",
    tag: "Reconocimiento",
    meta: "Sede: Deloitte Toronto · Cierra: Sep 2026"
  }
];

export const MarketplaceOportunidades: React.FC = () => {
  const theme = WAI_BRAND_CONFIG.theme;
  const [activeTab, setActiveTab] = useState<'reto' | 'vacante' | 'mentoria' | 'convocatoria'>('reto');

  const cardStyle = {
    backgroundColor: theme.cardBgGlass,
    border: `1.5px solid ${theme.border}`,
    borderRadius: '16px',
    padding: '20px',
    boxShadow: theme.shadowCard,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
    transition: 'all 0.2s',
  };

  const filteredData = OPORTUNIDADES_DATA.filter(o => o.tipo === activeTab);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '19px', fontWeight: '900', color: '#FFFFFF', margin: '0 0 8px 0' }}>Marketplace de Oportunidades</h1>
          <p style={{ color: theme.textSecondary, fontSize: '14px', margin: 0 }}>
            Retos tecnológicos, vacantes exclusivas, programas de mentoría uno-a-uno y convocatorias abiertas del ecosistema WAI México.
          </p>
        </div>
        <button style={{ backgroundColor: theme.secondary, color: '#020B1C', border: 'none', borderRadius: '10px', padding: '10px 18px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
          Publicar Oportunidad
        </button>
      </div>

      {/* Navigation tabs */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: `1px solid ${theme.borderSubtle}`, paddingBottom: '12px', flexWrap: 'wrap' }}>
        {[
          { id: 'reto', label: 'Retos & Proyectos' },
          { id: 'vacante', label: 'Vacantes de Empleo' },
          { id: 'mentoria', label: 'Mentorías Disponibles' },
          { id: 'convocatoria', label: 'Convocatorias WAI' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: activeTab === t.id ? 'rgba(255,192,0,0.12)' : 'transparent',
              color: activeTab === t.id ? theme.secondary : theme.textSecondary,
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Grid List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
        {filteredData.map(o => (
          <div 
            key={o.id} 
            style={cardStyle}
            onMouseEnter={e => e.currentTarget.style.borderColor = theme.secondary}
            onMouseLeave={e => e.currentTarget.style.borderColor = theme.border}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '9px', fontWeight: '800', color: theme.accent, backgroundColor: 'rgba(255,64,129,0.06)', border: `1px solid rgba(255,64,129,0.15)`, padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                {o.tag}
              </span>
              <span style={{ fontSize: '11px', color: theme.textMuted, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Building size={12} /> {o.entidad}
              </span>
            </div>

            <h3 style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF', margin: '4px 0 0 0' }}>{o.titulo}</h3>
            
            <p style={{ color: theme.textSecondary, fontSize: '13px', margin: 0, lineHeight: 1.5, flex: 1 }}>
              {o.desc}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${theme.borderSubtle}`, paddingTop: '12px', marginTop: '4px' }}>
              <span style={{ fontSize: '11px', color: theme.secondary, fontWeight: '700' }}>
                {o.meta}
              </span>
              <button style={{ background: 'none', border: 'none', color: theme.textSecondary, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11.5px', fontWeight: '650' }}
                onMouseEnter={e => e.currentTarget.style.color = theme.secondary}
                onMouseLeave={e => e.currentTarget.style.color = theme.textSecondary}>
                Postularse <ArrowUpRight size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
