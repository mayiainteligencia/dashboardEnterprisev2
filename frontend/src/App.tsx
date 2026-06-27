import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { DrugDiscoveryPipeline } from './components/pharbiois/DrugDiscoveryPipeline';
import { ScientificReportCopilot } from './components/pharbiois/ScientificReportCopilot';
import { AcademiaInteligente } from './components/pharbiois/AcademiaInteligente';
import { ProspeccionPharma } from './components/pharbiois/ProspeccionPharma';
import { PatentIPAgent } from './components/pharbiois/PatentIPAgent';
import { RegulatoryIntelligence } from './components/pharbiois/RegulatoryIntelligence';

function useIsMobile(bp = 900) {
  const [m, setM] = useState(typeof window !== 'undefined' ? window.innerWidth <= bp : false);
  useEffect(() => {
    const f = () => setM(window.innerWidth <= bp);
    window.addEventListener('resize', f);
    return () => window.removeEventListener('resize', f);
  }, [bp]);
  return m;
}

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useIsMobile();

  const selectSection = (s: string) => { setActiveSection(s); setDrawerOpen(false); };

  const getTitulo = () => {
    const titulos: Record<string, string> = {
      dashboard:   'AI BioPharma Command Center',
      pipeline:    'Drug Discovery Pipeline',
      reportes:    'Scientific Report Copilot',
      academia:    'Academia Inteligente',
      prospeccion: 'Prospección Pharma/Biotech',
      patentes:    'Patent & IP Intelligence',
      regulatorio: 'Regulatory Intelligence Agent',
    };
    return titulos[activeSection] || 'Pharbiois Dashboard';
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':   return <Dashboard onNavigate={selectSection} />;
      case 'pipeline':    return <DrugDiscoveryPipeline />;
      case 'reportes':    return <ScientificReportCopilot />;
      case 'academia':    return <AcademiaInteligente />;
      case 'prospeccion': return <ProspeccionPharma />;
      case 'patentes':    return <PatentIPAgent />;
      case 'regulatorio': return <RegulatoryIntelligence />;
      default:            return <Dashboard onNavigate={selectSection} />;
    }
  };

  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: 'var(--bg-primary)',
    }}>
      {/* SIDEBAR — fixed desktop */}
      {!isMobile && (
        <div style={{ width: '240px', flexShrink: 0 }}>
          <Sidebar activeSection={activeSection} onSectionChange={selectSection} />
        </div>
      )}

      {/* SIDEBAR — mobile drawer */}
      {isMobile && drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 3000,
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
          }}
        >
          <div onClick={(e) => e.stopPropagation()}
            style={{ width: '240px', height: '100%', boxShadow: '0 4px 30px rgba(0,0,0,0.05)' }}>
            <Sidebar activeSection={activeSection} onSectionChange={selectSection} />
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <Header title={getTitulo()} onMenu={isMobile ? () => setDrawerOpen(true) : undefined} />

        <div className="no-scrollbar" style={{
          flex: 1,
          overflow: 'auto',
          padding: 'clamp(12px, 2.5vw, 22px)',
        }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;
