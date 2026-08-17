import React from 'react';
import { ClipboardCheck, UserCheck, Clock, CheckCircle2, AlertTriangle, Play } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

export const InspeccionInteligenteModule: React.FC = () => {
  const { colores } = brandingConfig;

  const estadosWorkflow = [
    { estado: 'Borrador', count: 4, color: '#64748B' },
    { estado: 'Listo para Revisión', count: 6, color: '#F59E0B' },
    { estado: 'Aprobado por Ingeniero', count: 18, color: '#3B82F6' },
    { estado: 'Emitido & Versionado', count: 142, color: '#10B981' },
    { estado: 'Cerrado', count: 672, color: '#2563EB' }
  ];

  return (
    <div style={{ padding: '28px', backgroundColor: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ borderBottom: `1px solid ${colores.borde}`, paddingBottom: '16px' }}>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: colores.textoClaro }}>
          Inspección Inteligente & Workflow QA de Campo
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: colores.textoOscuro }}>
          Dashboard 06 · Cuestionarios adaptativos, trabajo offline, dictámenes de ingeniería y aprobación QA
        </p>
      </div>

      {/* Estados del Workflow QA */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        {estadosWorkflow.map((est, i) => (
          <div key={i} style={{ padding: '16px', borderRadius: '14px', backgroundColor: '#F8FAFC', border: `1px solid ${colores.borde}`, borderTop: `4px solid ${est.color}` }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: colores.textoOscuro, display: 'block' }}>{est.estado}</span>
            <span style={{ fontSize: '24px', fontWeight: '800', color: colores.textoClaro }}>{est.count}</span>
          </div>
        ))}
      </div>

      {/* Árbol de Inspección Adaptativo */}
      <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: `1px solid ${colores.borde}` }}>
        <h3 style={{ margin: '0 0 14px', fontSize: '16px', fontWeight: '800', color: colores.textoClaro }}>
          Árbol de Inspección Adaptativo en Ejecución
        </h3>
        <p style={{ fontSize: '13px', color: colores.textoMedio, margin: '0 0 16px' }}>
          Las preguntas y pruebas cambian dinámicamente según ocupación, materiales y hallazgos en tiempo real.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
          <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#EFF6FF', fontWeight: '600' }}>
            🔹 Ocupación detectada: Almacén con Alta Estiba (mayor a 7.5m) ➔ Activa módulo NFPA 13 ESFR & Carga de Fuego Combustible.
          </div>
          <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#FFFBEB', fontWeight: '600' }}>
            🔹 Grieta mayor a 2mm en columna de concreto ➔ Activa formulario de localización, fotografía calibrada e inspección de armadura expuesta.
          </div>
        </div>
      </div>
    </div>
  );
};
