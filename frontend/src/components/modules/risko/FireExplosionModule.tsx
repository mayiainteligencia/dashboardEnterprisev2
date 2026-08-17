import React from 'react';
import { Flame, ShieldCheck, AlertTriangle, Droplets, Gauge } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

export const FireExplosionModule: React.FC = () => {
  const { colores } = brandingConfig;

  return (
    <div style={{ padding: '28px', backgroundColor: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ borderBottom: `1px solid ${colores.borde}`, paddingBottom: '16px' }}>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: colores.textoClaro }}>
          Fire & Explosion Risk (NFPA & Protecciones)
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: colores.textoOscuro }}>
          Dashboard 08 · Carga de fuego, rociadores automáticos, red de hidrantes, bombas y simulación de PML por incendio
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        <div style={{ padding: '20px', backgroundColor: '#FEF2F2', borderRadius: '16px', border: '1px solid #FCA5A5' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Flame size={24} color="#EF4444" />
            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#EF4444' }}>Carga de Fuego Combustible</h4>
          </div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: colores.textoClaro }}>850 MJ/m²</div>
          <span style={{ fontSize: '12px', color: '#EF4444', fontWeight: '700' }}>Alto Riesgo de Ignición y Propagación</span>
        </div>

        <div style={{ padding: '20px', backgroundColor: '#ECFDF5', borderRadius: '16px', border: '1px solid #A7F3D0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Droplets size={24} color="#10B981" />
            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#10B981' }}>Cobertura Rociadores ESFR</h4>
          </div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: colores.textoClaro }}>92%</div>
          <span style={{ fontSize: '12px', color: '#10B981', fontWeight: '700' }}>Bomba Diésel NFPA 20 Operativa</span>
        </div>
      </div>
    </div>
  );
};
