import React, { useState, useEffect } from 'react';
import { brandingConfig } from '../config/branding';
import { WelcomeHeader } from './modules/dashboardModules/WelcomeHeader';
import { HeroCard } from './modules/dashboardModules/Herocard';

// ── Widgets Guardian Digital MX ──────────────────────────────────────────────
import { DeepfakeDetectionModule } from './modules/dashboardModules/guardian/DeepfakeDetectionModule';
import { VoiceAnalysisModule } from './modules/dashboardModules/guardian/VoiceAnalysisModule';
import { SocialMonitoringModule } from './modules/dashboardModules/guardian/SocialMonitoringModule';
import { BiometricVerificationModule } from './modules/dashboardModules/guardian/BiometricVerificationModule';
import { GlobalMapModule } from './modules/dashboardModules/guardian/GlobalMapModule';
import { KpiRowModule } from './modules/dashboardModules/guardian/KpiRowModule';
import { ThreatTrendModule } from './modules/dashboardModules/guardian/ThreatTrendModule';
import { RecentAlertsModule } from './modules/dashboardModules/guardian/RecentAlertsModule';
import { ReportsModule } from './modules/dashboardModules/guardian/ReportsModule';
import { SystemConfigModule } from './modules/dashboardModules/guardian/SystemConfigModule';
import { EcosystemFooter } from './modules/dashboardModules/guardian/EcosystemFooter';
import { GuardianGlobe } from './modules/dashboardModules/guardian/GuardianGlobe';
import { Globe as GlobeIcon } from 'lucide-react';

interface DashboardProps {
  onSectionChange?: (section: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSectionChange }) => {
  const { colores } = brandingConfig;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 24 };

  return (
    <div style={{ minHeight: '100vh', background: colores.fondoPrincipal, padding: isMobile ? '16px' : '32px' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        {/* ── Cabecera: bienvenida + logos nativos (arriba a la derecha) ── */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          gap: 16, flexWrap: 'wrap',
        }}>
          <WelcomeHeader />
          <div style={{
            display: 'flex', alignItems: 'center', gap: '18px',
            padding: '12px 20px', borderRadius: '16px',
            background: colores.gradientePrimario,
            boxShadow: colores.sombraGrande,
          }}>
            <img src="/assets/logosNativos/mayiaLogoBlanco.png" alt="MAYIA"
              style={{ height: '34px', objectFit: 'contain' }} />
            <span style={{ width: '1px', height: '28px', background: `${colores.textoEnOscuro}33` }} />
            <img src="/assets/logosNativos/flai.png" alt="FLAI"
              style={{ height: '34px', objectFit: 'contain' }} />
          </div>
        </div>

        {/* ── Fila Hero (INTOCABLE): HeroCard centrado, mismo span/posición ── */}
        {isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 16 }}>
            <HeroCard />
            <DeepfakeDetectionModule />
            <BiometricVerificationModule />
          </div>
        ) : (
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 24, marginBottom: 24, alignItems: 'stretch',
          }}>
            <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column' }}>
              <DeepfakeDetectionModule />
            </div>
            <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column' }}>
              <HeroCard />
            </div>
            <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column' }}>
              <BiometricVerificationModule />
            </div>
          </div>
        )}

        {/* ── Command Center: 3 columnas debajo del Hero/Welcome ── */}
        {isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <GlobalMapModule />
            <KpiRowModule />
            <ThreatTrendModule />
            <VoiceAnalysisModule />
            <SocialMonitoringModule />
            <RecentAlertsModule />
            <ReportsModule />
            <SystemConfigModule />
          </div>
        ) : (
          <div style={{
            display: 'grid', gridTemplateColumns: '3fr 5fr 3fr',
            gap: 24, alignItems: 'start',
          }}>
            {/* Izquierda — Módulos de Protección Activa */}
            <div style={col}>
              <VoiceAnalysisModule />
              <SocialMonitoringModule />
            </div>
            {/* Centro — Visión Global */}
            <div style={col}>
              <GlobalMapModule />
              <KpiRowModule />
              <ThreatTrendModule />
            </div>
            {/* Derecha — Eventos y Sistema */}
            <div style={col}>
              <RecentAlertsModule />
              <ReportsModule />
              <SystemConfigModule />
            </div>
          </div>
        )}

        {/* ── Sección showcase: globo terráqueo sobre fondo blanco ── */}
        <div style={{
          marginTop: 24, background: colores.fondoClaro, borderRadius: '20px',
          padding: isMobile ? '20px' : '32px', border: `1px solid ${colores.borde}40`,
          boxShadow: colores.sombra,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '12px', background: `${colores.acento}18`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <GlobeIcon size={22} color={colores.acento} />
            </div>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: colores.textoClaro, margin: 0 }}>
                Visión Global de Identidad
              </h3>
              <p style={{ fontSize: '13px', color: colores.textoMedio, margin: '2px 0 0 0' }}>
                Cobertura mundial de protección en tiempo real
              </p>
            </div>
          </div>
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <GuardianGlobe height={isMobile ? 320 : 460} background={colores.fondoClaro} autoRotateSpeed={0.8} />
          </div>
        </div>

        <EcosystemFooter />

        <style>{`
          * { box-sizing: border-box; }
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            -webkit-font-smoothing: antialiased;
          }
          ::-webkit-scrollbar { width: 8px; height: 8px; }
          ::-webkit-scrollbar-track { background: ${colores.fondoSecundario}40; border-radius: 4px; }
          ::-webkit-scrollbar-thumb { background: ${colores.primario}60; border-radius: 4px; }
          ::-webkit-scrollbar-thumb:hover { background: ${colores.primario}80; }
        `}</style>
      </div>
    </div>
  );
};
