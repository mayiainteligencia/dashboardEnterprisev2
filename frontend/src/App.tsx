import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { RecursosHumanos } from './components/departamentos/RecursosHumanos';
import { FinanzasContabilidad } from './components/departamentos/FinanzasContabilidad';
import { Operaciones } from './components/departamentos/Operaciones';
import { VentasMarketing } from './components/departamentos/VentasMarketing';
import { TecnologiasInformacion } from './components/departamentos/TecnologiasInformacion';
import { Administracion } from './components/departamentos/Administracion';
import { Ciberseguridad } from './components/departamentos/Ciberseguridad';
import { Playground } from './components/departamentos/Playground';
import { Academia } from './components/departamentos/Academia';
import { VistaComercial } from './components/comercial/VistaComercial';
import {
  PaginaCEO, PaginaScoring, PaginaCampanias,
  PaginaVendedores, PaginaInventario, PaginaConversion,
} from './components/comercial/paginasPro';
import { PaginaLeads } from './components/comercial/PaginaLeads';
import { PaginaOperacion } from './components/comercial/PaginaOperacion';
import { PaginaInfluencers } from './components/comercial/PaginaInfluencers';
import { brandingConfig } from './config/branding';
import { LiveToast } from './components/LiveToast';
import { AgentStatusBar } from './components/AgentStatusBar';

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
  const { colores } = brandingConfig;

  const selectSection = (s: string) => { setActiveSection(s); setDrawerOpen(false); };

  const getTitulo = () => {
    const titulos: Record<string, string> = {
      dashboard: 'Dashboard General',
      rh: 'Recursos Humanos',
      finanzas: 'Finanzas y Contabilidad',
      operaciones: 'Operaciones',
      ventas: 'Ventas y Marketing',
      ti: 'Tecnologías de la Información',
      administracion: 'Administración',
      comercial: 'Inteligencia Comercial',
      leads: 'Leads',
      operacion: 'Operación · Piso, Producto y Conversión',
      influencers: 'Radar de Influencers',
      ceo: 'Vista CEO',
      scoring: 'Lead Scoring IA',
      campanias: 'Campañas',
      vendedores: 'Vendedores',
      inventario: 'Inventario Inteligente',
      conversion: 'Conversión y Retención',
      ciberseguridad: 'CiberSeguridad',
      playground: 'Playground',
      academia: 'Academia',
    };
    return titulos[activeSection] || 'Dashboard';
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':   return <Dashboard />;
      case 'rh':          return <RecursosHumanos />;
      case 'finanzas':    return <FinanzasContabilidad />;
      case 'operaciones': return <Operaciones />;
      case 'ventas':      return <VentasMarketing />;
      case 'ti':          return <TecnologiasInformacion />;
      case 'administracion': return <Administracion />;
      case 'comercial':   return <VistaComercial />;
      case 'leads':       return <PaginaLeads />;
      case 'operacion':   return <PaginaOperacion />;
      case 'influencers': return <PaginaInfluencers />;
      case 'ceo':         return <PaginaCEO />;
      case 'scoring':     return <PaginaScoring />;
      case 'campanias':   return <PaginaCampanias />;
      case 'vendedores':  return <PaginaVendedores />;
      case 'inventario':  return <PaginaInventario />;
      case 'conversion':  return <PaginaConversion />;
      case 'ciberseguridad': return <Ciberseguridad />;
      case 'playground':  return <Playground />;
      case 'academia':    return <Academia />;
      default:            return <Dashboard />;
    }
  };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: colores.fondoPrincipal }}>

      {/* SIDEBAR fijo escritorio */}
      {!isMobile && (
        <div style={{ width: '240px', flexShrink: 0 }}>
          <Sidebar activeSection={activeSection} onSectionChange={selectSection} />
        </div>
      )}

      {/* SIDEBAR drawer móvil */}
      {isMobile && drawerOpen && (
        <div onClick={() => setDrawerOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 3000, background: 'rgba(0,0,0,0.45)', display: 'flex' }}>
          <div onClick={e => e.stopPropagation()} style={{ width: '240px', height: '100%', boxShadow: '0 0 40px rgba(0,0,0,0.3)' }}>
            <Sidebar activeSection={activeSection} onSectionChange={selectSection} />
          </div>
        </div>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <Header title={getTitulo()} onMenu={isMobile ? () => setDrawerOpen(true) : undefined} />
        <AgentStatusBar />
        <div className="no-scrollbar" style={{ flex: 1, overflow: 'auto', padding: 'clamp(14px, 3vw, 24px)' }}>
          {renderContent()}
        </div>
      </div>

      {/* Toasts globales */}
      <LiveToast />
    </div>
  );
}

export default App;
