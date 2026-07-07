import React, { useState } from 'react';
import { WAI_BRAND_CONFIG } from './config/branding';
import { WaiLayout } from './components/womeninai/WaiLayout';
import { WaiDashboard } from './components/womeninai/WaiDashboard';
import { GestionComunidadVoluntarios } from './components/womeninai/modules/GestionComunidadVoluntarios';
import { MetricasImpactoProgramas } from './components/womeninai/modules/MetricasImpactoProgramas';
import { AprendizajeNetworkingIA } from './components/womeninai/modules/AprendizajeNetworkingIA';
import { PodcastMediaHub } from './components/womeninai/modules/PodcastMediaHub';

// Estos se cargarán con lazy loading cuando los subagentes los creen
// Por ahora usamos React.lazy con fallback de placeholder
const LaAsamblea = React.lazy(() => import('./components/womeninai/modules/LaAsamblea').then(m => ({ default: m.LaAsamblea })));
const Delegaciones = React.lazy(() => import('./components/womeninai/modules/Delegaciones').then(m => ({ default: m.Delegaciones })));
const AgendaViva = React.lazy(() => import('./components/womeninai/modules/AgendaViva').then(m => ({ default: m.AgendaViva })));
const MesasAsamblea = React.lazy(() => import('./components/womeninai/modules/MesasAsamblea').then(m => ({ default: m.MesasAsamblea })));
const IADeWai = React.lazy(() => import('./components/womeninai/modules/IADeWai').then(m => ({ default: m.IADeWai })));
const DeclaratoriaWai = React.lazy(() => import('./components/womeninai/modules/DeclaratoriaWai').then(m => ({ default: m.DeclaratoriaWai })));
const TermometroIA = React.lazy(() => import('./components/womeninai/modules/TermometroIA').then(m => ({ default: m.TermometroIA })));
const DirectorioEcosistema = React.lazy(() => import('./components/womeninai/modules/DirectorioEcosistema').then(m => ({ default: m.DirectorioEcosistema })));
const MarketplaceOportunidades = React.lazy(() => import('./components/womeninai/modules/MarketplaceOportunidades').then(m => ({ default: m.MarketplaceOportunidades })));
const SponsorsPartners = React.lazy(() => import('./components/womeninai/modules/SponsorsPartners').then(m => ({ default: m.SponsorsPartners })));
const TrustCenter = React.lazy(() => import('./components/womeninai/modules/TrustCenter').then(m => ({ default: m.TrustCenter })));
const Registro = React.lazy(() => import('./components/womeninai/modules/Registro').then(m => ({ default: m.Registro })));

const theme = WAI_BRAND_CONFIG.theme;

const ModulePlaceholder: React.FC<{ name: string }> = ({ name }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    minHeight: '400px', gap: '16px',
    backgroundColor: 'rgba(10,25,47,0.4)', border: `1px dashed ${theme.border}`,
    borderRadius: '16px', padding: '40px',
  }}>
    <div style={{ width: '48px', height: '48px', border: `3px solid ${theme.secondary}`, borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    <p style={{ color: theme.textSecondary, fontSize: '14px', textAlign: 'center' }}>
      Cargando módulo: <strong style={{ color: theme.secondary }}>{name}</strong>
    </p>
  </div>
);

const LoadingFallback: React.FC<{ name: string }> = ({ name }) => <ModulePlaceholder name={name} />;

function App() {
  const [waiSection, setWaiSection] = useState('dashboard');

  const renderWaiContent = () => {
    switch (waiSection) {
      case 'dashboard':
        return <WaiDashboard />;
      case 'asamblea':
        return (
          <React.Suspense fallback={<LoadingFallback name="La Asamblea" />}>
            <LaAsamblea />
          </React.Suspense>
        );
      case 'registro':
        return (
          <React.Suspense fallback={<LoadingFallback name="Registro & Invitación" />}>
            <Registro />
          </React.Suspense>
        );
      case 'delegaciones':
        return (
          <React.Suspense fallback={<LoadingFallback name="Delegaciones" />}>
            <Delegaciones />
          </React.Suspense>
        );
      case 'agenda':
        return (
          <React.Suspense fallback={<LoadingFallback name="Agenda Viva" />}>
            <AgendaViva />
          </React.Suspense>
        );
      case 'mesas':
        return (
          <React.Suspense fallback={<LoadingFallback name="Mesas de Asamblea" />}>
            <MesasAsamblea />
          </React.Suspense>
        );
      case 'ia-wai':
        return (
          <React.Suspense fallback={<LoadingFallback name="IA de WAI" />}>
            <IADeWai />
          </React.Suspense>
        );
      case 'declaratoria':
        return (
          <React.Suspense fallback={<LoadingFallback name="Declaratoria WAI 2026" />}>
            <DeclaratoriaWai />
          </React.Suspense>
        );
      case 'podcast':
        return <PodcastMediaHub />;
      case 'networking':
        return <AprendizajeNetworkingIA />;
      case 'community':
        return <GestionComunidadVoluntarios />;
      case 'termometro':
        return (
          <React.Suspense fallback={<LoadingFallback name="Termómetro IA México" />}>
            <TermometroIA />
          </React.Suspense>
        );
      case 'directorio':
        return (
          <React.Suspense fallback={<LoadingFallback name="Directorio del Ecosistema" />}>
            <DirectorioEcosistema />
          </React.Suspense>
        );
      case 'marketplace':
        return (
          <React.Suspense fallback={<LoadingFallback name="Marketplace de Oportunidades" />}>
            <MarketplaceOportunidades />
          </React.Suspense>
        );
      case 'metrics':
        return <MetricasImpactoProgramas />;
      case 'sponsors':
        return (
          <React.Suspense fallback={<LoadingFallback name="Sponsors & Partners" />}>
            <SponsorsPartners />
          </React.Suspense>
        );
      case 'trust':
        return (
          <React.Suspense fallback={<LoadingFallback name="Trust Center" />}>
            <TrustCenter />
          </React.Suspense>
        );
      default:
        return <WaiDashboard />;
    }
  };

  return (
    <>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .no-scrollbar::-webkit-scrollbar { width: 4px; }
        .no-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .no-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,192,0,0.2); border-radius: 2px; }
        * { box-sizing: border-box; }
        body { margin: 0; overflow: hidden; }
      `}</style>
      <WaiLayout
        config={WAI_BRAND_CONFIG}
        activeSection={waiSection}
        onSectionChange={(s) => setWaiSection(s)}
      >
        {renderWaiContent()}
      </WaiLayout>
    </>
  );
}

export default App;
