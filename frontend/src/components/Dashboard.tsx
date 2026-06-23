import React from 'react';
import { brandingConfig } from '../config/branding';
import { WelcomeHeader } from './modules/dashboardModules/WelcomeHeader';
import { HeroCard } from './modules/dashboardModules/Herocard';
import { MiniCalendarCard } from './modules/dashboardModules/Minicalendarcard';
import { TopCoursesCard } from './modules/dashboardModules/Topcoursescard';
import { OfertasCard } from './modules/dashboardModules/Ofertascard';
import { AlertasEmpresa } from './modules/dashboardModules/Alertaempresa';
import { CampañasInteligentes } from './modules/dashboardModules/CampaniasInteligentes';
import { AnalisisDemanda } from './modules/dashboardModules/AnalisisDemanda';
import { MonitoreoRedesSociales } from './modules/dashboardModules/MonitorRedesSociales';

export const Dashboard: React.FC = () => {
  const { colores } = brandingConfig;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: colores.fondoPrincipal,
        padding: 'clamp(16px, 4vw, 32px)',
      }}
    >
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        {/* Welcome Header */}
        <WelcomeHeader />

        {/* --- FILA 1: Operaciones y Asistente (SE MANTIENEN IGUAL) --- */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '24px',
          }}
        >
          {/* Análisis Predictivo */}
          <div>
            <AnalisisDemanda />
          </div>

          {/* Hero */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <HeroCard />
          </div>

          {/* Monitoreo de Redes */}
          <div>
            <MonitoreoRedesSociales />
          </div>
        </div>

        {/* --- FILA 3: Redes Sociales, Campañas y Alertas --- */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px',
            marginBottom: '24px',
          }}
        >
          {/* Campañas Inteligentes */}
          <div>
            <CampañasInteligentes />
          </div>

          {/* Alertas de la Empresa */}
          <div>
            <AlertasEmpresa />
          </div>
        </div>

        {/* --- FILA 4: Ofertas Especiales y Calendario (el "remate" visual) --- */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {/* Ofertas Especiales */}
          <div>
            <OfertasCard />
          </div>

          {/* Mini Calendario */}
          <div>
            <MiniCalendarCard />
          </div>

          {/* Top Cursos */}
          <div>
            <TopCoursesCard />
          </div>
        </div>

        {/* ... tus estilos globales se mantienen igual ... */}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
              'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
              sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          ::-webkit-scrollbar-track {
            background: ${colores.fondoSecundario}40;
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb {
            background: ${colores.primario}60;
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: ${colores.primario}80;
          }
        `}</style>
      </div>
    </div>
  );
};