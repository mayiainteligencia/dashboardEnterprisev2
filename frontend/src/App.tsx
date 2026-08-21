import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { FspmDashboard } from './fspm/FspmDashboard';
import { ClientesModule } from './components/modules/fspm/ClientesModule';
import { ContactosModule } from './components/modules/fspm/ContactosModule';
import { OportunidadesModule } from './components/modules/fspm/OportunidadesModule';
import { CotizacionesModule } from './components/modules/fspm/CotizacionesModule';
import { LicitacionesModule } from './components/modules/fspm/LicitacionesModule';
import { ActividadesModule } from './components/modules/fspm/ActividadesModule';
import { DocumentosDriveModule } from './components/modules/fspm/DocumentosDriveModule';
import { DireccionReportesModule } from './components/modules/fspm/DireccionReportesModule';
import { AsistenteIAChat } from './components/modules/AsistenteIAChat';
import { MODULOS_FSPM } from './fspm/fspmData';
import { brandingConfig } from './config/branding';
import { AIChatProvider, useAIChat } from './context/AIChatContext';

function useIsMobile(bp = 900) {
  const [m, setM] = useState(typeof window !== 'undefined' ? window.innerWidth <= bp : false);
  useEffect(() => {
    const f = () => setM(window.innerWidth <= bp);
    window.addEventListener('resize', f);
    return () => window.removeEventListener('resize', f);
  }, [bp]);
  return m;
}

function AppInner() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useIsMobile();
  const { setActiveSectionContext } = useAIChat();

  const selectSection = (s: string) => {
    setActiveSection(s);
    setDrawerOpen(false);
  };

  const getTitulo = () => {
    if (activeSection === 'dashboard') return 'FSPM · CRM Comercial & Licitaciones';
    const mod = MODULOS_FSPM.find(m => m.id === activeSection);
    return mod ? mod.titulo : 'FSPM Fire Safety & Protection Management';
  };

  useEffect(() => {
    setActiveSectionContext(activeSection, getTitulo());
  }, [activeSection]);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <FspmDashboard onSelectModulo={selectSection} />;
      case 'clientes':
        return <ClientesModule />;
      case 'contactos':
        return <ContactosModule />;
      case 'oportunidades':
        return <OportunidadesModule />;
      case 'cotizaciones':
        return <CotizacionesModule />;
      case 'licitaciones':
        return <LicitacionesModule />;
      case 'actividades':
        return <ActividadesModule />;
      case 'documentos':
        return <DocumentosDriveModule />;
      case 'direccion':
        return <DireccionReportesModule />;
      case 'asistente-ia-chat':
      case 'asesor-inteligente':
        return <AsistenteIAChat />;
      default:
        return <FspmDashboard onSelectModulo={selectSection} />;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* SIDEBAR — Fijo en escritorio */}
      {!isMobile && (
        <div style={{ width: '250px', flexShrink: 0 }}>
          <Sidebar activeSection={activeSection} onSectionChange={selectSection} />
        </div>
      )}

      {/* SIDEBAR — Drawer en móvil */}
      {isMobile && drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 3000,
            background: 'rgba(15, 23, 42, 0.5)',
            display: 'flex',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: '250px',
              height: '100%',
              boxShadow: '0 0 40px rgba(0,0,0,0.3)',
            }}
          >
            <Sidebar activeSection={activeSection} onSectionChange={selectSection} />
          </div>
        </div>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        {/* Header con identidad FSPM */}
        <Header
          title={getTitulo()}
          onMenu={isMobile ? () => setDrawerOpen(true) : undefined}
          modo="admin"
        />

        {/* ÁREA DE TRABAJO EN FONDO BLANCO / LIMPIO */}
        <div
          className="no-scrollbar"
          style={{
            flex: 1,
            overflow: 'auto',
            padding: 'clamp(14px, 2.5vw, 24px)',
            backgroundColor: '#F8FAFC',
          }}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AIChatProvider>
      <AppInner />
    </AIChatProvider>
  );
}

export default App;
