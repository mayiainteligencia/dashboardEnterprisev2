import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { TotalplayDashboard } from './totalplay/TotalplayDashboard';
import { ComputerVisionModule } from './components/modules/totalplay/ComputerVisionModule';
import { CopilotoVendedorModule } from './components/modules/totalplay/CopilotoVendedorModule';
import { DisplaysInteligentesModule } from './components/modules/totalplay/DisplaysInteligentesModule';
import { AuditoriaVisualModule } from './components/modules/totalplay/AuditoriaVisualModule';
import { GobiernoDatosModule } from './components/modules/totalplay/GobiernoDatosModule';
import { AcademiaMayiaModule } from './components/modules/totalplay/AcademiaMayiaModule';
import { DisenioFabricacionModule } from './components/modules/totalplay/DisenioFabricacionModule';
import { OperacionAdministradaModule } from './components/modules/totalplay/OperacionAdministradaModule';
import { DiscoveryRetailModule } from './components/modules/totalplay/DiscoveryRetailModule';
import { VistaGerenteMovilModule } from './components/modules/totalplay/VistaGerenteMovilModule';
import { AsistenteIAChat } from './components/modules/AsistenteIAChat';
import { MODULOS_TOTALPLAY } from './totalplay/totalplayData';
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
  const { colores } = brandingConfig;
  const { setActiveSectionContext } = useAIChat();

  const selectSection = (s: string) => {
    setActiveSection(s);
    setDrawerOpen(false);
  };

  const getTitulo = () => {
    if (activeSection === 'dashboard') return 'Totalplay · Puntos Inteligentes M2C';
    const mod = MODULOS_TOTALPLAY.find(m => m.id === activeSection);
    return mod ? mod.titulo : 'Totalplay Telecomunicaciones';
  };

  useEffect(() => {
    setActiveSectionContext(activeSection, getTitulo());
  }, [activeSection]);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <TotalplayDashboard onSelectModulo={selectSection} />;
      case 'vista-gerente-movil':
        return <VistaGerenteMovilModule />;
      case 'computer-vision':
        return <ComputerVisionModule />;
      case 'asesor-inteligente':
      case 'asistente-ia-chat':
        return <AsistenteIAChat />;
      case 'copiloto-vendedor':
        return <CopilotoVendedorModule />;
      case 'displays-inteligentes':
        return <DisplaysInteligentesModule />;
      case 'auditoria-visual':
        return <AuditoriaVisualModule />;
      case 'gobierno-datos-crm':
        return <GobiernoDatosModule />;
      case 'academia-mayia':
        return <AcademiaMayiaModule />;
      case 'diseño-fabricacion':
        return <DisenioFabricacionModule />;
      case 'operacion-administrada':
        return <OperacionAdministradaModule />;
      case 'discovery-retail':
        return <DiscoveryRetailModule />;
      default:
        return <TotalplayDashboard onSelectModulo={selectSection} />;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#FFFFFF'
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
        <div onClick={() => setDrawerOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 3000, background: 'rgba(0,0,0,0.45)', display: 'flex' }}>
          <div onClick={e => e.stopPropagation()} style={{ width: '250px', height: '100%', boxShadow: '0 0 40px rgba(0,0,0,0.3)' }}>
            <Sidebar activeSection={activeSection} onSectionChange={selectSection} />
          </div>
        </div>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        {/* Header con colores e identidad Totalplay */}
        <Header
          title={getTitulo()}
          onMenu={isMobile ? () => setDrawerOpen(true) : undefined}
          modo="admin"
        />

        {/* ÁREA DE TRABAJO EN FONDO BLANCO */}
        <div className="no-scrollbar" style={{ flex: 1, overflow: 'auto', padding: 'clamp(14px, 3vw, 24px)', backgroundColor: '#FFFFFF' }}>
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
