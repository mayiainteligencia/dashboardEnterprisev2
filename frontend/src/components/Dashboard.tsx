import React, { useState, useEffect } from 'react';
import { brandingConfig } from '../config/branding';
import { WelcomeHeader } from './modules/dashboardModules/WelcomeHeader';
import { HeroCard } from './modules/dashboardModules/Herocard';
import { ExpandableModule } from './modules/dashboardModules/ExpandableModule';
import { InfraestructuraModule } from './modules/dashboardModules/InfraestructuraModule';
import { SeguridadModule } from './modules/dashboardModules/SeguridadModule';
import { ContinuidadModule } from './modules/dashboardModules/ContinuidadModule';
import { ValorDatoModule } from './modules/dashboardModules/ValorDatoModule';
import { ServiciosActivosModule } from './modules/dashboardModules/ServiciosActivosModule';
import { RecomendacionesIAModule } from './modules/dashboardModules/RecomendacionesIAModule';
import { TicketsSoporteModule } from './modules/dashboardModules/TicketsSoporteModule';
import { ROIIniciativasModule } from './modules/dashboardModules/ROIIniciativasModule';

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

  const accionesPrincipales = [
    { label: 'Ver mi infraestructura', seccion: 'centroOperacion', color: colores.primario },
    { label: 'Revisar seguridad', seccion: 'seguridadSOC', color: colores.peligro },
    { label: 'Evaluar continuidad', seccion: 'continuidadDRP', color: colores.exito },
    { label: 'Analizar mis datos', seccion: 'valorDatoIA', color: '#8B5CF6' },
    { label: 'Activar servicio inteligente', seccion: 'marketplace', color: colores.acento },
    { label: 'Solicitar diagnóstico de IA', seccion: 'decisionRoom', color: '#3B82F6' },
    { label: 'Agendar comité de valor', seccion: 'acompanamiento', color: '#EC4899' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: colores.fondoPrincipal, padding: isMobile ? '16px' : '32px' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <WelcomeHeader />

        {/* ── Acciones Principales (Movidas arriba) ── */}
        <div style={{ marginBottom: isMobile ? '16px' : '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <p style={{ fontSize: '12px', fontWeight: '700', color: colores.textoMedio, textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>Acciones rápidas</p>
            {!isMobile && (
              <span style={{ fontSize: '11px', color: '#9CA3AF', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Desliza para más <span style={{ fontSize: '14px' }}>&rarr;</span>
              </span>
            )}
          </div>
          <div className="hide-scroll" style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'nowrap',
            overflowX: 'auto',
            padding: '4px 4px 12px 4px',
            margin: '0 -4px', // offset the padding so it visually aligns
          }}>
            {accionesPrincipales.map(({ label, seccion, color }) => (
              <button
                key={seccion}
                onClick={() => onSectionChange?.(seccion)}
                style={{
                  padding: '10px 16px',
                  borderRadius: '12px',
                  border: `1px solid ${color}30`,
                  backgroundColor: `${color}06`,
                  color: color,
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  flexShrink: 0,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.01)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = `${color}12`;
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                  e.currentTarget.style.boxShadow = `0 6px 12px ${color}15`;
                  e.currentTarget.style.border = `1px solid ${color}50`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = `${color}06`;
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.01)';
                  e.currentTarget.style.border = `1px solid ${color}30`;
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Fila 1: Infraestructura | HeroCard | Seguridad ── */}
        {isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>
            <HeroCard />
            <InfraestructuraModule onNavigate={onSectionChange} />
            <SeguridadModule onNavigate={onSectionChange} />
          </div>
        ) : (
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '24px', marginBottom: '24px', alignItems: 'stretch',
          }}>
            <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column' }}>
              <ExpandableModule expandDirection="right">
                <InfraestructuraModule onNavigate={onSectionChange} />
              </ExpandableModule>
            </div>
            <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '0px' }}>
              <HeroCard />
            </div>
            <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column' }}>
              <ExpandableModule expandDirection="left">
                <SeguridadModule onNavigate={onSectionChange} />
              </ExpandableModule>
            </div>
          </div>
        )}

        {/* ── Fila 2: Continuidad | Valor del Dato | Servicios Activos ── */}
        {isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>
            <ContinuidadModule onNavigate={onSectionChange} />
            <ValorDatoModule onNavigate={onSectionChange} />
            <ServiciosActivosModule onNavigate={onSectionChange} />
          </div>
        ) : (
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '24px', marginBottom: '24px', alignItems: 'stretch',
          }}>
            <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column' }}>
              <ContinuidadModule onNavigate={onSectionChange} />
            </div>
            <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column' }}>
              <ExpandableModule expandDirection="right">
                <ValorDatoModule onNavigate={onSectionChange} />
              </ExpandableModule>
            </div>
            <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column' }}>
              <ServiciosActivosModule onNavigate={onSectionChange} />
            </div>
          </div>
        )}

        {/* ── Filas 3+4: Recomendaciones IA + ROI | Tickets ── */}
        {isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <RecomendacionesIAModule onNavigate={onSectionChange} />
            <TicketsSoporteModule onNavigate={onSectionChange} />
            <ROIIniciativasModule onNavigate={onSectionChange} />
          </div>
        ) : (
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)',
            gridTemplateRows: 'auto auto', gap: '24px',
          }}>
            <div style={{ gridColumn: 'span 8', gridRow: '1' }}>
              <ExpandableModule expandDirection="right">
                <RecomendacionesIAModule onNavigate={onSectionChange} />
              </ExpandableModule>
            </div>
            <div style={{ gridColumn: 'span 4', gridRow: '1 / 3', display: 'flex', flexDirection: 'column' }}>
              <ExpandableModule expandDirection="left">
                <div style={{ height: '100%' }}>
                  <TicketsSoporteModule onNavigate={onSectionChange} />
                </div>
              </ExpandableModule>
            </div>
            <div style={{ gridColumn: 'span 8', gridRow: '2' }}>
              <ROIIniciativasModule onNavigate={onSectionChange} />
            </div>
          </div>
        )}


        <style>{`
          @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
          @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
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
          .hide-scroll::-webkit-scrollbar { display: none; }
          .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>
    </div>
  );
};