import React, { useState, useEffect } from 'react';
import { WaiSidebar } from './WaiSidebar';
import { WaiHeader } from './WaiHeader';
import { WAI_BRAND_CONFIG } from '../../config/branding';
import NewProjectHub from '../NewProjectHub';
import { Sparkles, Globe, ShieldAlert, Zap, UserPlus, X } from 'lucide-react';

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

  const [activeAlertIndex, setActiveAlertIndex] = useState(0);
  const [showAlert, setShowAlert] = useState(true);

  const alertsList = [
    {
      titulo: "WAI México 2026",
      texto: "Una asamblea nacional de alto nivel, selectiva y participativa donde Mexico empieza a escribir, con IA y con mujeres, la agenda de la inteligencia artificial.",
      icon: "Sparkles",
      color: theme.secondary
    },
    {
      titulo: "Red de Impacto Global",
      texto: "Women in AI es una comunidad con más de 19,000 miembros en más de 150 países, trabajando hacia una IA inclusiva para la sociedad.",
      icon: "Globe",
      color: theme.teal
    },
    {
      titulo: "Ética e Inclusión en IA",
      texto: "WAI promueve aplicaciones éticas y el uso responsable de la inteligencia artificial, poniendo a las mujeres y minorías al centro.",
      icon: "ShieldAlert",
      color: theme.accent
    },
    {
      titulo: "Declaratoria WAI México 2026",
      texto: "250 personas convocadas para co-crear la Declaratoria WAI México 2026: visión, diagnóstico, compromisos, prioridades y ruta 2027.",
      icon: "Zap",
      color: "#8B5CF6"
    },
    {
      titulo: "Convocatoria Curada",
      texto: "Sé parte de la Declaratoria Nacional de IA. ¡Solicita tu invitación al WAI Mexico Assembly 2026 | Profetas de la IA!",
      icon: "UserPlus",
      color: "#F97316"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setShowAlert(false);
      setTimeout(() => {
        setActiveAlertIndex((prev) => (prev + 1) % alertsList.length);
        setShowAlert(true);
      }, 500);
    }, 12000);

    return () => clearInterval(timer);
  }, [alertsList.length]);

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
      {/* Mobile overlay — closes sidebar when tapped */}
      <div
        className={`wai-sidebar-overlay${drawerOpen ? ' open' : ''}`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Sidebar - Left (drawer on mobile) */}
      <div className={`wai-sidebar-wrapper${drawerOpen ? ' open' : ''}`}>
        <WaiSidebar 
          config={config} 
          activeSection={activeSection} 
          onSectionChange={(s) => {
            setDrawerOpen(false); // close drawer after navigation on mobile
            if (s === 'quienes-somos') {
              onSectionChange('asamblea');
            } else if (s === 'que-hacemos') {
              onSectionChange('networking');
            } else if (s === 'objetivo') {
              onSectionChange('declaratoria');
            } else if (s === 'liderazgo-mx') {
              handleOpenNewProjectModal('liderazgo-mx', 0);
            } else if (s === 'founders-global') {
              handleOpenNewProjectModal('founders-global', 0);
            } else if (s === 'sitio-oficial') {
              window.open('https://www.womeninai.co/', '_blank', 'noopener noreferrer');
            } else if (s === 'sobre-wai') {
              window.open('https://www.womeninai.co/about-wai', '_blank', 'noopener noreferrer');
            } else {
              onSectionChange(s);
            }
          }} 
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
            padding: 'clamp(12px, 3vw, 32px)',
            position: 'relative'
          }}
        >
          {children}
        </div>
      </div>

      {/* Sidebar - Right (NewProjectHub) — hidden on tablet/mobile via CSS */}
      <div className="wai-hub-wrapper">
        <NewProjectHub 
          activeSection={activeSection}
          onSectionChange={handleNewProjectSectionChange}
          onOpenModal={handleOpenNewProjectModal}
        />
      </div>


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
                <h3 style={{ margin: 0, color: '#FFFFFF', fontSize: '15px', fontWeight: '800' }}>Liderazgo WAI México</h3>
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
                <h3 style={{ margin: 0, color: '#FFFFFF', fontSize: '15px', fontWeight: '800' }}>Fundadoras Globales WAI</h3>
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
                <h3 style={{ margin: 0, color: '#FFFFFF', fontSize: '15px', fontWeight: '800' }}>Soporte & Contacto</h3>
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
      {/* FLOATING LIVE FEED ALERTS */}
      {showAlert && (
        <div className="wai-alert-toast" style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          background: 'linear-gradient(135deg, rgba(10, 25, 47, 0.85) 0%, rgba(2, 11, 28, 0.95) 100%)',
          border: `1.5px solid ${theme.border}`,
          borderRadius: '16px',
          padding: '16px',
          boxShadow: `0 10px 40px rgba(2, 11, 28, 0.8), 0 0 15px ${alertsList[activeAlertIndex].color}22`,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
          animation: 'alertEnter 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}>
          {/* Glowing underlay indicator */}
          <div className="wai-alert-indicator" style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: '4px',
            background: alertsList[activeAlertIndex].color,
            borderRadius: '16px 0 0 16px',
            boxShadow: `0 0 8px ${alertsList[activeAlertIndex].color}`
          }} />

          {/* Icon */}
          <div className="wai-alert-icon" style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.03)',
            border: `1px solid rgba(255, 255, 255, 0.08)`,
            display: 'flex', alignItems: 'center', justifyItems: 'center',
            justifyContent: 'center', flexShrink: 0, marginTop: '2px',
            color: alertsList[activeAlertIndex].color
          }}>
            {alertsList[activeAlertIndex].icon === "Sparkles" && <Sparkles size={16} fill={theme.secondary} />}
            {alertsList[activeAlertIndex].icon === "Globe" && <Globe size={16} />}
            {alertsList[activeAlertIndex].icon === "ShieldAlert" && <ShieldAlert size={16} />}
            {alertsList[activeAlertIndex].icon === "Zap" && <Zap size={16} />}
            {alertsList[activeAlertIndex].icon === "UserPlus" && <UserPlus size={16} />}
          </div>

          {/* Content */}
          <div className="wai-alert-content" style={{ flex: 1, minWidth: 0 }}>
            <span style={{ fontSize: '9px', fontWeight: '800', color: alertsList[activeAlertIndex].color, textTransform: 'uppercase', letterSpacing: '1px', display: 'block' }}>
              {alertsList[activeAlertIndex].titulo}
            </span>
            <p style={{ fontSize: '12px', color: '#FFFFFF', margin: '4px 0 0', lineHeight: 1.45, fontWeight: '500' }}>
              {alertsList[activeAlertIndex].texto}
            </p>
          </div>

          {/* Close button */}
          <button 
            className="wai-alert-close"
            onClick={() => setShowAlert(false)}
            style={{
              background: 'none', border: 'none', color: theme.textMuted,
              cursor: 'pointer', padding: '2px', margin: '-4px -4px 0 0',
              transition: 'color 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
            onMouseLeave={e => e.currentTarget.style.color = theme.textMuted}
          >
            <X size={14} />
          </button>
        </div>
      )}    </div>
  );
};
