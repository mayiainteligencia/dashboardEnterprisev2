import React from 'react';
import { PieChart, Map, ShieldAlert, BarChart3 } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

export const PortfolioAccumulationModule: React.FC = () => {
  const { colores } = brandingConfig;

  return (
    <div style={{ padding: '28px', backgroundColor: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ borderBottom: `1px solid ${colores.borde}`, paddingBottom: '16px' }}>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: colores.textoClaro }}>
          Portfolio & Accumulation GIS (Stress Testing)
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: colores.textoOscuro }}>
          Dashboard 15 · Mapa de calor de acumulación por cuadrícula, stress testing de cartera y límites de capacidad
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        <div style={{ padding: '20px', backgroundColor: '#F8FAFC', borderRadius: '16px', border: `1px solid ${colores.borde}` }}>
          <h4 style={{ margin: '0 0 8px', fontSize: '15px', fontWeight: '800', color: colores.textoClaro }}>Mayor Zona de Concentración</h4>
          <div style={{ fontSize: '22px', fontWeight: '800', color: colores.primario }}>CDMX - Cuauhtémoc</div>
          <span style={{ fontSize: '12px', color: colores.textoOscuro }}>$1.45B USD Expuestos en 5 km²</span>
        </div>

        <div style={{ padding: '20px', backgroundColor: '#F8FAFC', borderRadius: '16px', border: `1px solid ${colores.borde}` }}>
          <h4 style={{ margin: '0 0 8px', fontSize: '15px', fontWeight: '800', color: colores.textoClaro }}>Stress Testing Sintético (Sismo Mw 7.2)</h4>
          <div style={{ fontSize: '22px', fontWeight: '800', color: '#EF4444' }}>$340M USD Pérdida Estimada</div>
          <span style={{ fontSize: '12px', color: '#EF4444', fontWeight: '600' }}>Utilización del 81% de la retención del fondo</span>
        </div>
      </div>
    </div>
  );
};
