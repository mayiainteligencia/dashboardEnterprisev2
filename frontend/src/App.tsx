import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { MetroDashboard } from './components/cdmx/MetroDashboard';
import { PlanificadorRutas } from './components/cdmx/PlanificadorRutas';
import { EstadoServicio } from './components/cdmx/EstadoServicio';
import { TiemposSalida } from './components/cdmx/TiemposSalida';
import { TarifasPago } from './components/cdmx/TarifasPago';
import { OperadoresCDMX } from './components/cdmx/OperadoresCDMX';
import { ViajeAccesible } from './components/cdmx/ViajeAccesible';
import { SalidasTurismo } from './components/cdmx/SalidasTurismo';

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
      dashboard:   'Movilidad Inteligente CDMX — Centro de Control',
      home:        'Planificador de Rutas',
      estado:      'Estado del Servicio',
      salidas:     'Próximas Salidas',
      tarifas:     'Tarifas y Pago',
      operadores:  'Operadores CDMX',
      accesible:   'Viaje Accesible',
      turismo:     'Salidas y Turismo',
    };
    return titulos[activeSection] || 'Movilidad Inteligente CDMX';
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':   return <MetroDashboard onNavigate={selectSection} />;
      case 'home':        return <PlanificadorRutas />;
      case 'estado':      return <EstadoServicio />;
      case 'salidas':     return <TiemposSalida />;
      case 'tarifas':     return <TarifasPago />;
      case 'operadores':  return <OperadoresCDMX />;
      case 'accesible':   return <ViajeAccesible />;
      case 'turismo':     return <SalidasTurismo onNavigate={selectSection} />;
      default:            return <MetroDashboard onNavigate={selectSection} />;
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
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
          }}
        >
          <div onClick={(e) => e.stopPropagation()}
            style={{ width: '240px', height: '100%', boxShadow: '0 4px 30px rgba(0,0,0,0.4)' }}>
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
