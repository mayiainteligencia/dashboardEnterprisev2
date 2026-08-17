import React from 'react';
import { Users, ShieldCheck, Video, HeartPulse } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

export const OperacionPersonasRCModule: React.FC = () => {
  const { colores } = brandingConfig;

  return (
    <div style={{ padding: '28px', backgroundColor: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ borderBottom: `1px solid ${colores.borde}`, paddingBottom: '16px' }}>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: colores.textoClaro }}>
          Operación, Personas & Responsabilidad Civil
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: colores.textoOscuro }}>
          Dashboard 10 · Gestión de aforo, seguridad perimetral CCTV, planes de emergencia y exposición a terceros
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        <div style={{ padding: '20px', backgroundColor: '#F8FAFC', borderRadius: '16px', border: `1px solid ${colores.borde}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Users size={22} color={colores.primario} />
            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colores.textoClaro }}>Aforo Máximo de Ocupantes</h4>
          </div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: colores.textoClaro }}>3,200 Personas</div>
          <span style={{ fontSize: '12px', color: '#10B981', fontWeight: '700' }}>Rutas de Evacuación Libres de Obstrucción</span>
        </div>

        <div style={{ padding: '20px', backgroundColor: '#F8FAFC', borderRadius: '16px', border: `1px solid ${colores.borde}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <ShieldCheck size={22} color="#4F46E5" />
            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colores.textoClaro }}>Cobertura RC Terceros</h4>
          </div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: colores.textoClaro }}>$10,000,000 USD</div>
          <span style={{ fontSize: '12px', color: colores.textoOscuro }}>Incluye predios, operaciones y elevadores</span>
        </div>
      </div>
    </div>
  );
};
