import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { GasStationDashboard } from './gasStation/GasStationDashboard';
import { TanquesTelemetriaModule } from './components/modules/gasStation/TanquesTelemetriaModule';
import { PreciosDinamicosModule } from './components/modules/gasStation/PreciosDinamicosModule';
import { SeguridadVmsModule } from './components/modules/gasStation/SeguridadVmsModule';
import { CadenaSuministroOdooModule } from './components/modules/gasStation/CadenaSuministroOdooModule';
import { FlotasCorporativasModule } from './components/modules/gasStation/FlotasCorporativasModule';
import { FidelizacionPagosModule } from './components/modules/gasStation/FidelizacionPagosModule';
import { HubEnergiaSostenibilidadModule } from './components/modules/gasStation/HubEnergiaSostenibilidadModule';
import { MantenimientoSdiGemeloModule } from './components/modules/gasStation/MantenimientoSdiGemeloModule';
import { AsistenteIAChat } from './components/modules/AsistenteIAChat';
import { MODULOS_GAS_STATION } from './gasStation/gasStationData';
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
    if (activeSection === 'dashboard') return 'Gas Station Inteligente · Panel Principal';
    const mod = MODULOS_GAS_STATION.find(m => m.id === activeSection);
    return mod ? `${mod.titulo}` : 'Gas Station Inteligente';
  };

  useEffect(() => {
    setActiveSectionContext(activeSection, getTitulo());
  }, [activeSection]);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <GasStationDashboard onSelectModulo={selectSection} />;
      case 'tanques-telemetria':
        return <TanquesTelemetriaModule />;
      case 'precios-dinamicos':
        return <PreciosDinamicosModule />;
      case 'seguridad-vms':
        return <SeguridadVmsModule />;
      case 'cadena-suministro':
        return <CadenaSuministroOdooModule />;
      case 'flotas-corporativas':
        return <FlotasCorporativasModule />;
      case 'fidelizacion-pagos':
        return <FidelizacionPagosModule />;
      case 'hub-energia':
        return <HubEnergiaSostenibilidadModule />;
      case 'mantenimiento-sdi':
        return <MantenimientoSdiGemeloModule />;
      case 'asistente-ia-chat':
      case 'asesor-inteligente':
        return <AsistenteIAChat />;
      default:
        return <GasStationDashboard onSelectModulo={selectSection} />;
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
        {/* Header con identidad Gas Station Inteligente */}
        <Header
          title={getTitulo()}
          onMenu={isMobile ? () => setDrawerOpen(true) : undefined}
          modo="admin"
        />

        {/* ÁREA DE TRABAJO */}
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
