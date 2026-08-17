import React from 'react';
import { Zap, Activity, AlertTriangle, ShieldCheck, Thermometer } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

export const InstalacionesEquiposModule: React.FC = () => {
  const { colores } = brandingConfig;

  return (
    <div style={{ padding: '28px', backgroundColor: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ borderBottom: `1px solid ${colores.borde}`, paddingBottom: '16px' }}>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: colores.textoClaro }}>
          Instalaciones & Equipos Críticos (Termografía)
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: colores.textoOscuro }}>
          Dashboard 09 · Tableros eléctricos, transformadores, gas, HVAC, subestaciones y puntos únicos de falla
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        <div style={{ padding: '20px', backgroundColor: '#F8FAFC', borderRadius: '16px', border: `1px solid ${colores.borde}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Zap size={22} color={colores.primario} />
            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colores.textoClaro }}>Subestación Eléctrica Principal</h4>
          </div>
          <div style={{ fontSize: '13px', color: colores.textoMedio }}>
            Transformador 1500 kVA (2018) · Prueba de Termografía Infrarroja: Sin Puntos Calientes Críticos.
          </div>
        </div>

        <div style={{ padding: '20px', backgroundColor: '#FFFBEB', borderRadius: '16px', border: '1px solid #FCD34D' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <AlertTriangle size={22} color="#D97706" />
            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#D97706' }}>Punto Único de Falla (SPOF)</h4>
          </div>
          <div style={{ fontSize: '13px', color: colores.textoClaro }}>
            Planta de Emergencia Diésel 500 kW requiere redundancia N+1 para sistema de refrigeración de datos.
          </div>
        </div>
      </div>
    </div>
  );
};
