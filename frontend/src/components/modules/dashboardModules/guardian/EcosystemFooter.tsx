import React from 'react';
import { brandingConfig } from '../../../../config/branding';
import { ecosistema } from '../../../../mock/guardianMockData';

export const EcosystemFooter: React.FC = () => {
  const { colores } = brandingConfig;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px',
      flexWrap: 'wrap', padding: '20px', marginTop: '8px',
      borderTop: `1px solid ${colores.borde}40`,
    }}>
      <span style={{ fontSize: '11px', color: colores.textoOscuro }}>Ecosistema</span>
      {ecosistema.map((e, i) => (
        <React.Fragment key={e}>
          {i > 0 && <span style={{ color: colores.borde }}>·</span>}
          <span style={{ fontSize: '13px', fontWeight: 700, color: colores.textoMedio, letterSpacing: '0.02em' }}>{e}</span>
        </React.Fragment>
      ))}
    </div>
  );
};
