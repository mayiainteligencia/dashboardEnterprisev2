import React from 'react';
import { brandingConfig } from '../../config/branding';
import {
  FiltrosGlobales,
  DashboardAgencias, FunnelComercial, LeadGeneration,
  CopilotoComercial, AgenteWhatsApp, Financiamiento, PostventaRecompra,
  SeminuevosFlotillas, PrediccionVentas,
} from './modules';
import {
  VistaCEO, LeadScoring, Campanias, Vendedores, InventarioInteligente, ConversionRetencion,
} from './modulesDetalle';
import { MapaCalorEstados } from '../modules/MapaCalorEstados';

// ponytail: grid responsivo con auto-fit (sin breakpoints ni JS) — reacomoda solo segun ancho.
const grid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '24px',
  marginBottom: '24px',
};

const Seccion: React.FC<{ titulo: string; children: React.ReactNode }> = ({ titulo, children }) => {
  const { colores } = brandingConfig;
  return (
    <>
      <h2 style={{ fontSize: '14px', fontWeight: 700, color: colores.textoMedio, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '8px 0 14px' }}>
        {titulo}
      </h2>
      <div style={grid}>{children}</div>
    </>
  );
};

export const VistaComercial: React.FC = () => {
  const { colores } = brandingConfig;
  return (
    <div style={{ minHeight: '100vh', background: colores.fondoPrincipal }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <FiltrosGlobales />

        {/* Análisis a detalle (clic → más visualización) — va primero */}
        <Seccion titulo="Análisis a Detalle · clic para profundizar">
          <VistaCEO />
          <LeadScoring />
          <Campanias />
          <Vendedores />
          <InventarioInteligente />
          <ConversionRetencion />
        </Seccion>

        {/* El resto de módulos, debajo */}
        <Seccion titulo="Demanda · Leads y Funnel">
          <DashboardAgencias />
          <FunnelComercial />
          <LeadGeneration />
          <PrediccionVentas />
        </Seccion>

        <Seccion titulo="Operación · Piso, Producto y Conversión">
          <CopilotoComercial />
          <AgenteWhatsApp />
          <Financiamiento />
          <PostventaRecompra />
          <SeminuevosFlotillas />
        </Seccion>

        {/* Mapa de México a ancho completo (necesita espacio: mapa + panel lateral) */}
        <h2 style={{ fontSize: '14px', fontWeight: 700, color: colores.textoMedio, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '8px 0 14px' }}>
          Geografía Comercial · México
        </h2>
        <div style={{ marginBottom: '24px' }}>
          <MapaCalorEstados />
        </div>
      </div>
    </div>
  );
};
