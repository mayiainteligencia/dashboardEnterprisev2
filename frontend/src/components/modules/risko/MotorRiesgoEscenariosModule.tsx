import React from 'react';
import { Cpu, Activity, BarChart3, ShieldCheck, Zap } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

export const MotorRiesgoEscenariosModule: React.FC = () => {
  const { colores } = brandingConfig;

  const clasesAsegurabilidad = [
    { clase: 'A', nombre: 'Preferente', desc: 'Riesgo óptimo, excelentes controles NFPA y estructurales.', color: '#3B82F6' },
    { clase: 'B', nombre: 'Estándar', desc: 'Cumple normas estándar sin banderas críticas.', color: '#10B981' },
    { clase: 'C', nombre: 'Con Recomendaciones', desc: 'Requiere mejoras de bajo CAPEX en 90 días.', color: '#F59E0B' },
    { clase: 'D', nombre: 'Con Condiciones', desc: 'Deducibles incrementados o sublímites especiales.', color: '#F97316' },
    { clase: 'E', nombre: 'Difícil Colocación', desc: 'Alta vulnerabilidad, requiere intervención urgente.', color: '#EF4444' },
    { clase: 'F', nombre: 'Temporalmente Inaceptable', desc: 'Falla crítica de vida/seguridad. Sin cobertura.', color: '#7F1D1D' }
  ];

  return (
    <div style={{ padding: '28px', backgroundColor: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ borderBottom: `1px solid ${colores.borde}`, paddingBottom: '16px' }}>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: colores.textoClaro }}>
          Motor de Riesgo & Escenarios (AAL & Curvas Excedencia)
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: colores.textoOscuro }}>
          Dashboard 13 · Algoritmo multivariable 0-100, métricas AEP/OEP y clasificación A-F de asegurabilidad
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {clasesAsegurabilidad.map(item => (
          <div key={item.clase} style={{ padding: '16px', borderRadius: '14px', backgroundColor: '#F8FAFC', borderLeft: `5px solid ${item.color}`, border: `1px solid ${colores.borde}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '18px', fontWeight: '800', color: item.color }}>Clase {item.clase}</span>
              <span style={{ fontSize: '12px', fontWeight: '700', color: colores.textoClaro }}>{item.nombre}</span>
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: colores.textoOscuro }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
