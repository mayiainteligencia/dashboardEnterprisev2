import React from 'react';
import { brandingConfig } from '../config/branding';
import { WelcomeHeader } from './modules/dashboardModules/WelcomeHeader';
import { HeroCard } from './modules/dashboardModules/Herocard';
import { MiniCalendarCard } from './modules/dashboardModules/Minicalendarcard';
import { TopCoursesCard } from './modules/dashboardModules/Topcoursescard';
import { AlertasEmpresa } from './modules/dashboardModules/Alertaempresa';
import { CampañasInteligentes } from './modules/dashboardModules/CampaniasInteligentes';
import { AnalisisDemanda } from './modules/dashboardModules/AnalisisDemanda';
import { MonitoreoRedesSociales } from './modules/dashboardModules/MonitorRedesSociales';

export const Dashboard: React.FC = () => {
  const { colores } = brandingConfig;

  return (
    <div style={{ minHeight: '100vh', background: colores.fondoPrincipal, padding: 'clamp(8px, 2vw, 16px)' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>

        {/* Welcome Header con reloj y ticker live */}
        <WelcomeHeader />

        {/* --- FILA 1: Análisis, MAYIA Chat, Monitor Redes --- */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '20px',
        }}>
          <AnalisisDemanda />
          <HeroCard />
          <MonitoreoRedesSociales />
        </div>

        {/* --- FILA 2: Campañas + Alertas en vivo --- */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '20px',
          marginBottom: '20px',
        }}>
          <CampañasInteligentes />
          <AlertasEmpresa />
        </div>

        {/* --- FILA 3: Calendario + Top Cursos --- */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
        }}>
          <MiniCalendarCard />
          <TopCoursesCard />
        </div>

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
          ::-webkit-scrollbar { width: 6px; height: 6px; }
          ::-webkit-scrollbar-track { background: ${colores.fondoSecundario}40; border-radius: 3px; }
          ::-webkit-scrollbar-thumb { background: ${colores.primario}60; border-radius: 3px; }
          ::-webkit-scrollbar-thumb:hover { background: ${colores.primario}80; }
        `}</style>
      </div>
    </div>
  );
};