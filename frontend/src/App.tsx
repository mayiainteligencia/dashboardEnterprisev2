import React, { useState } from 'react';
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

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const { colores } = brandingConfig;

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
      case 'dashboard':
        return <Dashboard />;
      case 'rh':
        return <RecursosHumanos />;
      case 'finanzas':
        return <FinanzasContabilidad />;
      case 'operaciones':
        return <Operaciones />;
      case 'ventas':
        return <VentasMarketing />;
      case 'ti':
        return <TecnologiasInformacion />;
      case 'administracion':
        return <Administracion />;
      case 'comercial':
        return <VistaComercial />;
      case 'leads':
        return <PaginaLeads />;
      case 'operacion':
        return <PaginaOperacion />;
      case 'influencers':
        return <PaginaInfluencers />;
      case 'ceo':
        return <PaginaCEO />;
      case 'scoring':
        return <PaginaScoring />;
      case 'campanias':
        return <PaginaCampanias />;
      case 'vendedores':
        return <PaginaVendedores />;
      case 'inventario':
        return <PaginaInventario />;
      case 'conversion':
        return <PaginaConversion />;
      case 'ciberseguridad':
        return <Ciberseguridad />;
      case 'playground':
        return <Playground />;
      case 'academia':
        return <Academia />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div 
      style={{ 
        display: 'flex',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: colores.fondoPrincipal
      }}
    >
      {/* SIDEBAR */}
      <div style={{ width: '240px', flexShrink: 0 }}>
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
      </div>
      
      {/* CONTENIDO */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <Header title={getTitulo()} />
        
        {/* Main content */}
        <div className="no-scrollbar" style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;
