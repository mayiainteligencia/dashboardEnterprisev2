import React from 'react';
import { ShieldCheck, Cpu, CheckCircle2, UserCheck, Activity, Terminal } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';
import { AGENTES_IA_LIST } from '../../../risko/riskoData';

export const GobiernoAgentesModule: React.FC = () => {
  const { colores } = brandingConfig;

  return (
    <div style={{ padding: '28px', backgroundColor: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ borderBottom: `1px solid ${colores.borde}`, paddingBottom: '16px' }}>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: colores.textoClaro }}>
          Gobierno de IA & Orquestador de Agentes (16/16)
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: colores.textoOscuro }}>
          Dashboard 16 · Fuerza de trabajo digital, versiones de prompts/modelos, trazabilidad y aprobación Human-in-the-Loop
        </p>
      </div>

      {/* Grid de los 16 Agentes Especializados */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
        {AGENTES_IA_LIST.map((agente) => (
          <div
            key={agente.id}
            style={{
              padding: '16px',
              borderRadius: '14px',
              backgroundColor: '#F8FAFC',
              border: `1px solid ${colores.borde}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 4px rgba(15,23,42,0.02)'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', padding: '2px 6px', borderRadius: '4px', backgroundColor: colores.primario, color: '#FFFFFF' }}>{agente.id}</span>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
                  {agente.estado}
                </span>
              </div>
              <h4 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: '800', color: colores.textoClaro }}>{agente.nombre}</h4>
              <p style={{ margin: 0, fontSize: '12px', color: colores.textoOscuro }}>{agente.rol}</p>
            </div>

            <div style={{ marginTop: '12px', paddingTop: '8px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
              <span style={{ color: colores.textoOscuro }}>Confianza Grounding:</span>
              <span style={{ fontWeight: '800', color: colores.primario }}>{agente.confianza}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bitácora Auditable Human-in-the-Loop */}
      <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: `1px solid ${colores.borde}` }}>
        <h4 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: '800', color: colores.textoClaro }}>
          Bitácora Auditable & Regla Human-in-the-Loop
        </h4>
        <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', fontSize: '12px', color: colores.textoClaro }}>
          📌 <strong>Regla de Gobernanza Activa:</strong> Toda conclusión con Score Crítico (&gt;80) o cambio en suma asegurada contratada requiere aprobación profesional del Ingeniero de Riesgo asignado antes de la emisión oficial.
        </div>
      </div>
    </div>
  );
};
