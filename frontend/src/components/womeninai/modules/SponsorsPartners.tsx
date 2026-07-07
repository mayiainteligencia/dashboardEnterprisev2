import React from 'react';
import { WAI_BRAND_CONFIG } from '../../../config/branding';
import { Award, ShieldAlert, Sparkles, Building2, CheckCircle, BarChart3 } from 'lucide-react';

export const SponsorsPartners: React.FC = () => {
  const theme = WAI_BRAND_CONFIG.theme;

  const cardStyle = {
    backgroundColor: theme.cardBgGlass,
    border: `1.5px solid ${theme.border}`,
    borderRadius: '16px',
    padding: '24px',
    boxShadow: theme.shadowCard,
  };

  const getSponsorTier = (level: string) => {
    switch (level) {
      case 'platinum': return { label: 'Marca Protagonista', color: theme.secondary };
      case 'gold': return { label: 'Premium Sponsor / Venue Partner', color: theme.accent };
      case 'silver': return { label: 'Socio Corporativo / Research Partner', color: theme.teal };
      default: return { label: 'Technology / Cloud Partner', color: '#94A3B8' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#FFFFFF', margin: '0 0 8px 0' }}>Aliados Estratégicos & Sponsors</h1>
        <p style={{ color: theme.textSecondary, fontSize: '14px', margin: 0 }}>
          Organizaciones globales comprometidas con cerrar la brecha de género en la inteligencia artificial y propulsar la competitividad nacional.
        </p>
      </div>

      {/* Sponsors Grid grouped by tier */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {['platinum', 'gold', 'silver', 'bronze'].map(level => {
          const tier = getSponsorTier(level);
          const sponsors = WAI_BRAND_CONFIG.sponsors.filter(s => s.nivel === level);
          if (sponsors.length === 0) return null;

          return (
            <div key={level} style={{ ...cardStyle, borderLeft: `4px solid ${tier.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Award size={16} color={tier.color} />
                <span style={{ fontSize: '11px', fontWeight: '800', color: tier.color, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {tier.label}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                {sponsors.map(s => (
                  <div key={s.nombre} style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: `1px solid ${theme.borderSubtle}`, borderRadius: '12px', padding: '20px 16px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Building2 size={16} color={tier.color} />
                    </div>
                    <span style={{ fontSize: '15px', fontWeight: '800', color: '#FFFFFF' }}>{s.nombre}</span>
                    <span style={{ fontSize: '10px', color: theme.textMuted }}>{s.tipo}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Package proposal */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {[
          { title: 'Marca Protagonista', price: 'Platinum Tier', desc: 'Presencia principal en la asamblea nacional, vocería en plenaria inaugural, acceso preferente a perfiles de voluntarias y relatorías de mesas.' },
          { title: 'Aliado Tecnológico', price: 'Gold & Silver Tier', desc: 'Espacio dedicado en el Marketplace, habilitación de retos de programación e integración directa de sus tecnologías en los laboratorios WAI.' },
          { title: 'Colaborador Institucional', price: 'Bronze Tier', desc: 'Derechos de visualización en el Radar del Ecosistema y acceso a reportes agregados y anonimizados del Termómetro de la Industria.' }
        ].map((p, idx) => (
          <div key={idx} style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>{p.title}</h4>
            <span style={{ fontSize: '11px', fontWeight: '750', color: theme.secondary, textTransform: 'uppercase' }}>{p.price}</span>
            <p style={{ color: theme.textSecondary, fontSize: '13px', margin: 0, lineHeight: 1.5, flex: 1 }}>{p.desc}</p>
            <button style={{ backgroundColor: 'rgba(255,255,255,0.04)', color: '#FFFFFF', border: `1.5px solid ${theme.border}`, borderRadius: '10px', padding: '10px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', marginTop: '12px' }}>
              Solicitar Dossier Informativo
            </button>
          </div>
        ))}
      </div>

      {/* Sponsor intelligence metrics disclaimer */}
      <div style={{ ...cardStyle, backgroundColor: 'rgba(255, 192, 0, 0.03)', border: `1px solid ${theme.border}` }}>
        <h4 style={{ fontSize: '13px', fontWeight: '800', color: theme.secondary, margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <BarChart3 size={14} /> Reportes y Métricas Corporativas Anonimizadas
        </h4>
        <p style={{ color: theme.textSecondary, fontSize: '12.5px', margin: 0, lineHeight: 1.5 }}>
          WAI protege la privacidad de sus miembros de acuerdo con los principios del Trust Center. Los patrocinadores solo acceden a reportes consolidados y de tendencias agregadas (Termómetro IA) de forma que se garantice que ningún dato de contacto personal sensible sea transferido sin consentimiento explícito.
        </p>
      </div>

    </div>
  );
};
