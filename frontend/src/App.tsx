import React, { useState } from 'react';
import { ResponsiveLayout } from './components/ResponsiveLayout';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';

import { CentroOperacion } from './components/departamentos/CentroOperacion';
import { SeguridadSOC } from './components/departamentos/SeguridadSOC';
import { ContinuidadDRP } from './components/departamentos/ContinuidadDRP';
import { MapaDatos } from './components/departamentos/MapaDatos';
import { ValorDatoIA } from './components/departamentos/ValorDatoIA';
import { DecisionRoom } from './components/departamentos/DecisionRoom';
import { MarketplaceServicios } from './components/departamentos/MarketplaceServicios';
import { AcompanamientoExperto } from './components/departamentos/AcompanamientoExperto';

import { brandingConfig } from './config/branding';
import './responsive.css';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const { colores } = brandingConfig;

  const getTitulo = () => {
    const titulos: Record<string, string> = {
      dashboard:       'Dashboard DC Inteligente',
      centroOperacion: 'Centro de Operación',
      seguridadSOC:    'Seguridad y SOC IA',
      continuidadDRP:  'Continuidad y DRP',
      mapaDatos:       'Mapa de Datos',
      valorDatoIA:     'Valor del Dato y IA',
      decisionRoom:    'Decision Room',
      marketplace:     'Marketplace de Servicios',
      acompanamiento:  'Acompañamiento Experto',
    };
    return titulos[activeSection] || 'DC Inteligente AI Value';
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':       return <Dashboard onSectionChange={setActiveSection} />;
      case 'centroOperacion': return <CentroOperacion />;
      case 'seguridadSOC':    return <SeguridadSOC />;
      case 'continuidadDRP':  return <ContinuidadDRP />;
      case 'mapaDatos':       return <MapaDatos />;
      case 'valorDatoIA':     return <ValorDatoIA />;
      case 'decisionRoom':    return <DecisionRoom />;
      case 'marketplace':     return <MarketplaceServicios />;
      case 'acompanamiento':  return <AcompanamientoExperto />;
      default:                return <Dashboard onSectionChange={setActiveSection} />;
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
      <div style={{ flex: 1, overflow: 'auto', backgroundColor: activeSection === 'decisionRoom' ? '#0B0F19' : colores.fondoPrincipal }}>
        {renderContent()}
      </div>
    </ResponsiveLayout>
  );
}

export default App;