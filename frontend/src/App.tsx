import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { RiskoDashboard } from './risko/RiskoDashboard';
import { ExpedienteDigitalModule } from './components/modules/risko/ExpedienteDigitalModule';
import { GeoRiskStudioModule } from './components/modules/risko/GeoRiskStudioModule';
import { EvidenceVaultModule } from './components/modules/risko/EvidenceVaultModule';
import { DocumentIntelligenceModule } from './components/modules/risko/DocumentIntelligenceModule';
import { InspeccionInteligenteModule } from './components/modules/risko/InspeccionInteligenteModule';
import { EstructuraVulnerabilidadModule } from './components/modules/risko/EstructuraVulnerabilidadModule';
import { FireExplosionModule } from './components/modules/risko/FireExplosionModule';
import { InstalacionesEquiposModule } from './components/modules/risko/InstalacionesEquiposModule';
import { OperacionPersonasRCModule } from './components/modules/risko/OperacionPersonasRCModule';
import { ContinuidadBIModule } from './components/modules/risko/ContinuidadBIModule';
import { ValuacionPolizasModule } from './components/modules/risko/ValuacionPolizasModule';
import { MotorRiesgoEscenariosModule } from './components/modules/risko/MotorRiesgoEscenariosModule';
import { MitigacionCapexModule } from './components/modules/risko/MitigacionCapexModule';
import { PortfolioAccumulationModule } from './components/modules/risko/PortfolioAccumulationModule';
import { GobiernoAgentesModule } from './components/modules/risko/GobiernoAgentesModule';
import { AsistenteIAChat } from './components/modules/AsistenteIAChat';
import { MODULOS_RISKO } from './risko/riskoData';
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
  const [activeSection, setActiveSection] = useState('command-center');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useIsMobile();
  const { setActiveSectionContext } = useAIChat();

  const selectSection = (s: string) => {
    setActiveSection(s);
    setDrawerOpen(false);
  };

  const getTitulo = () => {
    if (activeSection === 'command-center' || activeSection === 'dashboard') {
      return 'RISKO AI · Command Center Ejecutivo';
    }
    const mod = MODULOS_RISKO.find(m => m.id === activeSection);
    return mod ? `RISKO AI · ${mod.titulo}` : 'RISKO AI Real Estate Risk Platform';
  };

  useEffect(() => {
    setActiveSectionContext(activeSection, getTitulo());
  }, [activeSection]);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
      case 'command-center':
        return <RiskoDashboard onSelectModulo={selectSection} />;
      case 'expediente-digital':
        return <ExpedienteDigitalModule />;
      case 'georisk-studio':
        return <GeoRiskStudioModule />;
      case 'evidence-vault':
        return <EvidenceVaultModule />;
      case 'ai-document-intelligence':
        return <DocumentIntelligenceModule />;
      case 'inspeccion-inteligente':
        return <InspeccionInteligenteModule />;
      case 'construccion-estructura':
        return <EstructuraVulnerabilidadModule />;
      case 'fire-explosion':
        return <FireExplosionModule />;
      case 'instalaciones-equipos':
        return <InstalacionesEquiposModule />;
      case 'operacion-personas-rc':
        return <OperacionPersonasRCModule />;
      case 'continuidad-dependencias':
        return <ContinuidadBIModule />;
      case 'valuacion-coberturas':
        return <ValuacionPolizasModule />;
      case 'motor-riesgo-escenarios':
        return <MotorRiesgoEscenariosModule />;
      case 'mitigacion-capex':
        return <MitigacionCapexModule />;
      case 'portfolio-accumulation':
        return <PortfolioAccumulationModule />;
      case 'gobierno-agentes':
        return <GobiernoAgentesModule />;
      case 'asistente-ia-chat':
        return <AsistenteIAChat />;
      default:
        return <RiskoDashboard onSelectModulo={selectSection} />;
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
        <div style={{ width: '260px', flexShrink: 0 }}>
          <Sidebar activeSection={activeSection} onSectionChange={selectSection} />
        </div>
      )}

      {/* ÁREA PRINCIPAL */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
        <Header
          title={getTitulo()}
          onMenu={() => setDrawerOpen(!drawerOpen)}
        />

        <main style={{ flex: 1, overflowY: 'auto', backgroundColor: '#FFFFFF' }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AIChatProvider>
      <AppInner />
    </AIChatProvider>
  );
}
