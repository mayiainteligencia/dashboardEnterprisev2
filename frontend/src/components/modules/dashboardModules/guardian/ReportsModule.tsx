import React, { useState } from 'react';
import { FileText, FileBarChart } from 'lucide-react';
import { brandingConfig } from '../../../../config/branding';
import { GuardianCard } from './GuardianCard';
import { GuardianModal } from './GuardianModal';
import { informes } from '../../../../mock/guardianMockData';
import type { Informe } from '../../../../mock/guardianMockData';

export const ReportsModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [sel, setSel] = useState<Informe | null>(null);

  return (
    <GuardianCard titulo="Informes y Análisis" icon={<FileBarChart size={20} color={colores.acento} />}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {informes.map((r) => (
          <div key={r.id} onClick={() => setSel(r)} style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '12px',
            borderRadius: '12px', cursor: 'pointer', background: `${colores.borde}18`,
          }}>
            <FileText size={18} color={colores.acento} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: colores.textoClaro }}>{r.titulo}</div>
              <div style={{ fontSize: '11px', color: colores.textoOscuro }}>{r.fecha}</div>
            </div>
          </div>
        ))}
      </div>

      {sel && (
        <GuardianModal titulo={sel.titulo} onClose={() => setSel(null)}>
          <div style={{ fontSize: '12px', color: colores.textoOscuro, marginBottom: '12px' }}>{sel.fecha}</div>
          <p style={{ fontSize: '14px', color: colores.textoClaro, lineHeight: 1.7 }}>{sel.resumen}</p>
          <div style={{
            marginTop: '16px', height: '120px', borderRadius: '12px',
            background: `${colores.acento}10`, border: `1px dashed ${colores.acento}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: colores.textoOscuro, fontSize: '12px',
          }}>
            Vista previa del documento (mock)
          </div>
        </GuardianModal>
      )}
    </GuardianCard>
  );
};
