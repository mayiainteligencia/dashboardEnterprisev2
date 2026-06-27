import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { RichDemandSensing } from './components/richs/RichDemandSensing';
import { ChefTechnicalCopilot } from './components/richs/ChefTechnicalCopilot';
import { AcademiaRichMayia } from './components/richs/AcademiaRichMayia';
import { CopilotoVentasFoodservice } from './components/richs/CopilotoVentasFoodservice';
import { Distribuidor360AI } from './components/richs/Distribuidor360AI';
import { EcommerceMarketIntelligence } from './components/richs/EcommerceMarketIntelligence';

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
      dashboard:       'Rich’s México AI Command Center',
      demanda:         'Demand Intelligence',
      'copilot-chef':  'Chef Copilot',
      academia:        'Academia Rich',
      'ventas-b2b':    'Ventas Foodservice',
      distribuidores:  'Distribuidor 360 AI',
      'ecommerce-mkt': 'E-commerce & Market Intelligence',
    };
    return titulos[activeSection] || 'Rich’s México Dashboard';
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':       return <Dashboard onNavigate={selectSection} />;
      case 'demanda':         return <RichDemandSensing />;
      case 'copilot-chef':    return <ChefTechnicalCopilot />;
      case 'academia':        return <AcademiaRichMayia />;
      case 'ventas-b2b':      return <CopilotoVentasFoodservice />;
      case 'distribuidores':  return <Distribuidor360AI />;
      case 'ecommerce-mkt':   return <EcommerceMarketIntelligence />;
      default:                return <Dashboard onNavigate={selectSection} />;
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
