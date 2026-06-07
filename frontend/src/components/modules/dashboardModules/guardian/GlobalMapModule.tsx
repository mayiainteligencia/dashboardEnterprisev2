import React, { useState } from 'react';
import { Globe as GlobeIcon } from 'lucide-react';
import { brandingConfig } from '../../../../config/branding';
import { GuardianCard } from './GuardianCard';
import { GuardianGlobe } from './GuardianGlobe';

export const GlobalMapModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [count, setCount] = useState(5);

  return (
    <GuardianCard
      titulo="Monitoreo de Identidad Global"
      subtitulo="En tiempo real"
      icon={<GlobeIcon size={20} color={colores.acento} />}
    >
      <GuardianGlobe onCount={setCount} />

      <div style={{ display: 'flex', gap: '16px', marginTop: '12px', fontSize: '11px', color: colores.textoMedio }}>
        <Leyenda c={colores.peligro} label="Crítico/Alto" />
        <Leyenda c={colores.advertencia} label="Medio" />
        <Leyenda c={colores.exito} label="Bajo" />
        <span style={{ marginLeft: 'auto', color: colores.textoClaro, fontWeight: 600 }}>{count} eventos activos</span>
      </div>
    </GuardianCard>
  );
};

const Leyenda: React.FC<{ c: string; label: string }> = ({ c, label }) => (
  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} /> {label}
  </span>
);
