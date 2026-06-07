import React from 'react';
import { Settings, Activity, RefreshCw, Users } from 'lucide-react';
import { brandingConfig } from '../../../../config/branding';
import { GuardianCard } from './GuardianCard';
import { sistemaItems } from '../../../../mock/guardianMockData';

const iconos = [Activity, RefreshCw, Users];

export const SystemConfigModule: React.FC = () => {
  const { colores } = brandingConfig;
  return (
    <GuardianCard titulo="Configuración del Sistema" icon={<Settings size={20} color={colores.acento} />}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {sistemaItems.map((s, i) => {
          const Icon = iconos[i];
          const col = s.ok ? colores.exito : colores.advertencia;
          return (
            <div key={s.id} style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px',
              borderRadius: '12px', background: `${colores.borde}18`, cursor: 'pointer',
            }}>
              <Icon size={18} color={colores.textoMedio} />
              <span style={{ fontSize: '13px', fontWeight: 600, color: colores.textoClaro, flex: 1 }}>{s.titulo}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: col }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: col }} />
                {s.estado}
              </span>
            </div>
          );
        })}
      </div>
    </GuardianCard>
  );
};
