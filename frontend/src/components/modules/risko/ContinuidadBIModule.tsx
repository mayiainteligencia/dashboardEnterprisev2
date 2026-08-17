import React, { useState } from 'react';
import { Clock, Activity, AlertTriangle, ArrowRight, DollarSign } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

export const ContinuidadBIModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [escenarioDias, setEscenarioDias] = useState(30);

  const perdidaEstimadaBI = escenarioDias * 48500; // $48,500 USD por día de paro

  return (
    <div style={{ padding: '28px', backgroundColor: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ borderBottom: `1px solid ${colores.borde}`, paddingBottom: '16px' }}>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: colores.textoClaro }}>
          Continuidad de Negocio (BI / Interrupción)
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: colores.textoOscuro }}>
          Dashboard 11 · Mapeo de dependencias inter-inmueble, MTPD, RTO, RPO y simulador de interrupción
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Métricas de Tolerancia */}
        <div style={{ padding: '24px', backgroundColor: '#F8FAFC', borderRadius: '16px', border: `1px solid ${colores.borde}` }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: '800', color: colores.textoClaro }}>Métricas de Resiliencia Operativa</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
              <span><strong>MTPD</strong> (Máximo Periodo Tolerable de Interrupción):</span>
              <span style={{ fontWeight: '700', color: '#EF4444' }}>45 Días</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
              <span><strong>RTO</strong> (Tiempo Objetivo de Recuperación):</span>
              <span style={{ fontWeight: '700', color: '#F59E0B' }}>14 Días</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
              <span><strong>Pérdida Diaria por Paro de Operación:</strong></span>
              <span style={{ fontWeight: '700', color: colores.primario }}>$48,500 USD / Día</span>
            </div>
          </div>
        </div>

        {/* Simulador Interactivo de Paro BI */}
        <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: `1px solid ${colores.borde}`, boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: '800', color: colores.textoClaro }}>Simulador de Paro Operativo BI</h3>
          <label style={{ fontSize: '12px', fontWeight: '600', color: colores.textoOscuro, display: 'block', marginBottom: '8px' }}>
            Días de Interrupción Estimados: {escenarioDias} Días
          </label>
          <input
            type="range"
            min="1"
            max="180"
            value={escenarioDias}
            onChange={(e) => setEscenarioDias(Number(e.target.value))}
            style={{ width: '100%', marginBottom: '16px' }}
          />

          <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', textAlign: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#EF4444', display: 'block' }}>Pérdida por Interrupción Calculada:</span>
            <span style={{ fontSize: '28px', fontWeight: '800', color: '#EF4444' }}>${perdidaEstimadaBI.toLocaleString()} USD</span>
          </div>
        </div>
      </div>
    </div>
  );
};
