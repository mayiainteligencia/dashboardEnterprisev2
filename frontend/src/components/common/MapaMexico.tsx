import React from 'react';
import { MapPin, Building2 } from 'lucide-react';
import { brandingConfig } from '../../config/branding';
import { INMUEBLES_SAMPLE } from '../../risko/riskoData';

export const MapaMexico: React.FC = () => {
  const { colores } = brandingConfig;

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: `1px solid ${colores.borde}`,
        boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colores.textoClaro }}>
          Mapa de Cartera de Inmuebles en México
        </h3>
        <span style={{ fontSize: '12px', fontWeight: '700', color: colores.primario }}>
          1,450 Inmuebles Activos
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
        {INMUEBLES_SAMPLE.map((inm) => (
          <div
            key={inm.id}
            style={{
              padding: '12px',
              borderRadius: '10px',
              backgroundColor: '#F8FAFC',
              border: `1px solid ${colores.borde}`,
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <MapPin size={20} color={inm.scoreRiesgo > 60 ? '#EF4444' : '#10B981'} />
            <div>
              <div style={{ fontWeight: '700', fontSize: '13px', color: colores.textoClaro }}>{inm.nombre}</div>
              <div style={{ fontSize: '11px', color: colores.textoOscuro }}>{inm.ubicacion}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
