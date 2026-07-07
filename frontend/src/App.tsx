import { useState } from 'react';
import { ResponsiveLayout } from './components/ResponsiveLayout';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Ciberseguridad } from './components/departamentos/Ciberseguridad';
import { Playground } from './components/departamentos/Playground';
import { Academia } from './components/departamentos/Academia';

import { MonitorMedios } from './components/MonitorMedios';
import { MonitorIA } from './components/MonitorIA';
import { MonitorDigital } from './components/MonitorDigital';
import { InteligenciaElectoral } from './components/InteligenciaElectoral';
import { brandingConfig } from './config/branding';


import './responsive.css';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const { colores } = brandingConfig;

  const getTitulo = () => {
    const titulos: Record<string, string> = {
      dashboard:      'Dashboard General',
      ciberseguridad: 'CiberSeguridad',
      playground:     'Playground',
      academia:       'Academia',

      monitor: 'Monitor de Medios',
      monitoria: 'Monitor IA',
      digital: 'Monitor Digital',
      electoral: 'Inteligencia Electoral',
    };
    return titulos[activeSection] || 'Dashboard';
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':      return <Dashboard onSectionChange={setActiveSection} />;
      case 'ciberseguridad': return <Ciberseguridad />;
      case 'playground':     return <Playground />;
      case 'academia':       return <Academia />;

      case 'monitor': return <MonitorMedios />;
      case 'monitoria': return <MonitorIA />;
      case 'digital': return <MonitorDigital />;
      case 'electoral': return <InteligenciaElectoral />;
      default:               return <Dashboard onSectionChange={setActiveSection} />;
    }
  };

  return (
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
  );
}

export default App;