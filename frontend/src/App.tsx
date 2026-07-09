import { useState } from 'react';
import { ResponsiveLayout } from './components/ResponsiveLayout';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';

import { ExplorerProvider } from './components/valueExplorer/ExplorerContext';
import { ValueExplorerHome } from './components/valueExplorer/ValueExplorerHome';
import { ExplorerWizard } from './components/valueExplorer/ExplorerWizard';
import { ModuloDiagnostico } from './components/valueExplorer/modulos/ModuloDiagnostico';
import { ModuloValorDato } from './components/valueExplorer/modulos/ModuloValorDato';
import { ModuloNube } from './components/valueExplorer/modulos/ModuloNube';
import { ModuloNOC } from './components/valueExplorer/modulos/ModuloNOC';
import { ModuloSOC } from './components/valueExplorer/modulos/ModuloSOC';
import { ModuloDRP } from './components/valueExplorer/modulos/ModuloDRP';
import { ModuloAIFactory } from './components/valueExplorer/modulos/ModuloAIFactory';
import { ModuloROI } from './components/valueExplorer/modulos/ModuloROI';

import { brandingConfig } from './config/branding';
import './responsive.css';

function App() {
  const [activeSection, setActiveSection] = useState('valueExplorer');
  const { colores } = brandingConfig;

  const getTitulo = () => {
    const titulos: Record<string, string> = {
      valueExplorer:        'DC Inteligente AI Value Explorer',
      explorerWizard:       'Diagnóstico Inteligente DC Inteligente',
      explorerDiagnostico:  'Diagnóstico Inteligente de Empresa',
      explorerValorDato:    'Valor Estratégico del Dato',
      explorerNube:         'Nube, IaaS y FLAI',
      explorerNOC:          'NOC y Operación Inteligente',
      explorerSOC:          'SOC IA y Ciberseguridad',
      explorerDRP:          'DRP, Backup y Continuidad',
      explorerAIFactory:    'AI Factory y Agentes para Negocio',
      explorerROI:          'ROI, Business Case y Ruta Ejecutiva',
    };
    return titulos[activeSection] || 'DC Inteligente AI Value Explorer';
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'valueExplorer':       return <ValueExplorerHome onSectionChange={setActiveSection} />;
      case 'explorerWizard':      return <ExplorerWizard onSectionChange={setActiveSection} />;
      case 'explorerDiagnostico': return <ModuloDiagnostico onSectionChange={setActiveSection} />;
      case 'explorerValorDato':   return <ModuloValorDato onSectionChange={setActiveSection} />;
      case 'explorerNube':        return <ModuloNube onSectionChange={setActiveSection} />;
      case 'explorerNOC':         return <ModuloNOC onSectionChange={setActiveSection} />;
      case 'explorerSOC':         return <ModuloSOC onSectionChange={setActiveSection} />;
      case 'explorerDRP':         return <ModuloDRP onSectionChange={setActiveSection} />;
      case 'explorerAIFactory':   return <ModuloAIFactory onSectionChange={setActiveSection} />;
      case 'explorerROI':         return <ModuloROI onSectionChange={setActiveSection} />;
      default:                    return <ValueExplorerHome onSectionChange={setActiveSection} />;
    }
  };

  return (
    <ExplorerProvider>
      <ResponsiveLayout
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        header={<Header title={getTitulo()} />}
        sidebar={
          <Sidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        }
      >
        <div style={{ flex: 1, overflow: 'auto', backgroundColor: colores.fondoPrincipal }}>
          {renderContent()}
        </div>
      </ResponsiveLayout>
    </ExplorerProvider>
  );
}

export default App;
