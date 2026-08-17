import React from 'react';
import { DollarSign, ShieldAlert, ArrowDownRight, FileText, CheckCircle2 } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

export const ValuacionPolizasModule: React.FC = () => {
  const { colores } = brandingConfig;

  const waterfallSteps = [
    { paso: 'Pérdida Bruta Estimada', monto: '$25,000,000 USD', tipo: 'bruta', color: '#0F172A' },
    { paso: '(- ) Deducible por Sismo (5%)', monto: '-$6,250,000 USD', tipo: 'deducible', color: '#EF4444' },
    { paso: '(- ) Coaseguro Contratado (10%)', monto: '-$1,875,000 USD', tipo: 'coaseguro', color: '#F97316' },
    { paso: 'Sublímite Aplicable por Ubicación', monto: 'Aplica Límite $20M USD', tipo: 'limite', color: '#F59E0B' },
    { paso: '= Indemnización Neta Estimada', monto: '$16,875,000 USD', tipo: 'indemnizacion', color: '#10B981' },
    { paso: '= Pérdida Asumida / Retenida', monto: '$8,125,000 USD', tipo: 'retenida', color: '#2563EB' }
  ];

  return (
    <div style={{ padding: '28px', backgroundColor: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ borderBottom: `1px solid ${colores.borde}`, paddingBottom: '16px' }}>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: colores.textoClaro }}>
          Valuación, Pólizas & Waterfall de Indemnización
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: colores.textoOscuro }}>
          Dashboard 12 · Costo de reposición a nuevo, desglose de deducibles, sublímites y cascada de recuperación
        </p>
      </div>

      {/* Waterfall Visualizer */}
      <div style={{ padding: '24px', backgroundColor: '#F8FAFC', borderRadius: '16px', border: `1px solid ${colores.borde}` }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: '800', color: colores.textoClaro }}>
          Visualizador Waterfall de Cascada de Indemnización
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {waterfallSteps.map((step, idx) => (
            <div
              key={idx}
              style={{
                padding: '14px 18px',
                borderRadius: '12px',
                backgroundColor: '#FFFFFF',
                borderLeft: `5px solid ${step.color}`,
                boxShadow: '0 2px 6px rgba(15, 23, 42, 0.03)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span style={{ fontWeight: '700', fontSize: '14px', color: colores.textoClaro }}>{step.paso}</span>
              <span style={{ fontWeight: '800', fontSize: '16px', color: step.color }}>{step.monto}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
