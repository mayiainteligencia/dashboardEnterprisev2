import React, { useState } from 'react';
import { WaiSidebar } from './WaiSidebar';
import { WaiHeader } from './WaiHeader';
import { WAI_BRAND_CONFIG } from '../../config/branding';
import NewProjectHub from '../NewProjectHub';

interface WaiLayoutProps {
  config: typeof WAI_BRAND_CONFIG;
  activeSection: string;
  onSectionChange: (section: string) => void;
  children: React.ReactNode;
}

export const WaiLayout: React.FC<WaiLayoutProps> = ({ 
  config, 
  activeSection, 
  onSectionChange, 
  children 
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = config.theme;

  // NewProjectHub States
  const [activeNewProjectSection, setActiveNewProjectSection] = useState<string | undefined>('dashboard-view');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContentId, setModalContentId] = useState<string | null>(null);

  const handleNewProjectSectionChange = (section: string) => {
    setActiveNewProjectSection(section);
    onSectionChange(section);
  };

  const handleOpenNewProjectModal = (id: string, yPos: number) => {
    setModalContentId(id);
    setIsModalOpen(true);
  };

  const handleCloseNewProjectModal = () => {
    setIsModalOpen(false);
    setModalContentId(null);
  };

  return (
    <div 
      style={{ 
        display: 'flex', 
        width: '100vw', 
        height: '100vh', 
        overflow: 'hidden', 
        backgroundColor: theme.background,
        color: theme.textPrimary,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        position: 'relative'
      }}
    >
      {/* Sidebar - Left */}
      <div style={{ display: 'block', width: '260px', flexShrink: 0 }}>
        <WaiSidebar 
          config={config} 
          activeSection={activeSection} 
          onSectionChange={onSectionChange} 
        />
      </div>

      {/* Main Content Area */}
      <div 
        style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          overflow: 'hidden',
          minWidth: 0,
          background: `radial-gradient(circle at 50% -20%, #1E3A60 0%, ${theme.background} 70%)` // Resplandor azul en la cabecera
        }}
      >
        <WaiHeader 
          config={config} 
          onMenu={() => setDrawerOpen(!drawerOpen)} 
        />
        
        {/* Scrollable Content Container */}
        <div 
          className="no-scrollbar"
          style={{ 
            flex: 1, 
            overflow: 'auto', 
            padding: 'clamp(16px, 3vw, 32px)',
            position: 'relative'
          }}
        >
          {children}
        </div>
      </div>

      {/* Sidebar - Right (NewProjectHub) */}
      <NewProjectHub 
        activeSection={activeSection}
        onSectionChange={handleNewProjectSectionChange}
        onOpenModal={handleOpenNewProjectModal}
      />

      {/* Custom Premium Modal Overlay */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(2, 11, 28, 0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: theme.cardBgGlass,
            border: `1.5px solid ${theme.border}`,
            borderRadius: '16px',
            padding: '24px',
            maxWidth: '420px',
            width: '90%',
            boxShadow: theme.shadow,
            display: 'flex', flexDirection: 'column', gap: '16px',
            position: 'relative'
          }}>
            {modalContentId === 'liderazgo-mx' && (
              <>
                <h3 style={{ margin: 0, color: '#FFFFFF', fontSize: '18px', fontWeight: '800' }}>Liderazgo WAI México</h3>
                <p style={{ margin: 0, color: theme.textSecondary, fontSize: '13px', lineHeight: 1.5 }}>
                  El capítulo de <strong>Women in AI México</strong> está liderado por profesionales y científicas destacadas del ecosistema tecnológico:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px', color: '#FFFFFF' }}>
                  <div style={{ padding: '8px 12px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '8px', borderLeft: `3px solid ${theme.secondary}` }}>
                    <span style={{ fontWeight: '800', color: theme.secondary, display: 'block' }}>Susan Verdiguel</span>
                    <span style={{ fontSize: '11px', color: theme.textMuted }}>Ambassador & Estrategia Nacional</span>
                  </div>
                  <div style={{ padding: '8px 12px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '8px', borderLeft: `3px solid ${theme.secondary}` }}>
                    <span style={{ fontWeight: '800', color: theme.secondary, display: 'block' }}>Ivete Sánchez Bravo</span>
                    <span style={{ fontSize: '11px', color: theme.textMuted }}>Coordinación de Alianzas y Academia</span>
                  </div>
                  <div style={{ padding: '8px 12px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '8px', borderLeft: `3px solid ${theme.secondary}` }}>
                    <span style={{ fontWeight: '800', color: theme.secondary, display: 'block' }}>Samantha Delfín-Azuara</span>
                    <span style={{ fontSize: '11px', color: theme.textMuted }}>Operaciones y Coordinación del Summit 2026</span>
                  </div>
                </div>
              </>
            )}

            {modalContentId === 'founders-global' && (
              <>
                <h3 style={{ margin: 0, color: '#FFFFFF', fontSize: '18px', fontWeight: '800' }}>Fundadoras Globales WAI</h3>
                <p style={{ margin: 0, color: theme.textSecondary, fontSize: '13px', lineHeight: 1.5 }}>
                  Women in AI fue fundada en París, Francia en 2016 por tres pioneras comprometidas con la equidad y ética de la inteligencia artificial:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px', color: '#FFFFFF' }}>
                  <div style={{ padding: '8px 12px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '8px', borderLeft: `3px solid ${theme.accent}` }}>
                    <span style={{ fontWeight: '800', color: theme.accent, display: 'block' }}>Dr. Hanan Salam</span>
                    <span style={{ fontSize: '11px', color: theme.textMuted }}>Cofundadora, Directora de Educación e investigadora en robótica social.</span>
                  </div>
                  <div style={{ padding: '8px 12px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '8px', borderLeft: `3px solid ${theme.accent}` }}>
                    <span style={{ fontWeight: '800', color: theme.accent, display: 'block' }}>Caroline Lair</span>
                    <span style={{ fontSize: '11px', color: theme.textMuted }}>Cofundadora, experta en negocios de tecnología y fundadora de The Good AI.</span>
                  </div>
                  <div style={{ padding: '8px 12px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '8px', borderLeft: `3px solid ${theme.accent}` }}>
                    <span style={{ fontWeight: '800', color: theme.accent, display: 'block' }}>Moojan Asghari</span>
                    <span style={{ fontSize: '11px', color: theme.textMuted }}>Cofundadora, conferencista global y emprendedora en tecnología inclusiva.</span>
                  </div>
                </div>
              </>
            )}

            {modalContentId !== 'liderazgo-mx' && modalContentId !== 'founders-global' && (
              <>
                <h3 style={{ margin: 0, color: '#FFFFFF', fontSize: '18px', fontWeight: '800' }}>Soporte & Contacto</h3>
                <p style={{ margin: 0, color: theme.textSecondary, fontSize: '13px', lineHeight: 1.5 }}>
                  ¿Tienes alguna duda o necesitas soporte técnico con el módulo <strong>{modalContentId}</strong>? Ponte en contacto con nuestro equipo de desarrollo.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: '#FFFFFF' }}>
                  <div>📧 Email: <span style={{ color: theme.secondary }}>soporte@wai.mx</span></div>
                  <div>📞 Teléfono: <span style={{ color: theme.secondary }}>+52 55 1234 5678</span></div>
                </div>
              </>
            )}

            <button 
              onClick={handleCloseNewProjectModal} 
              style={{
                backgroundColor: theme.secondary,
                color: '#020B1C',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
                fontWeight: '700',
                cursor: 'pointer',
                marginTop: '12px',
                alignSelf: 'flex-end'
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
