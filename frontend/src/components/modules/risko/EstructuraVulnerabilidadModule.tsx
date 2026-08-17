import React from 'react';
import { Building, ShieldAlert, Activity, CheckCircle, BarChart2 } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

export const EstructuraVulnerabilidadModule: React.FC = () => {
  const { colores } = brandingConfig;

  return (
    <div style={{ padding: '28px', backgroundColor: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ borderBottom: `1px solid ${colores.borde}`, paddingBottom: '16px' }}>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: colores.textoClaro }}>
          Construcción, Estructura & Vulnerabilidad Sísmica
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: colores.textoOscuro }}>
          Dashboard 07 · Sistema resistente a cortante, ductilidad, norma de diseño declarada y curvas de fragilidad
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div style={{ padding: '20px', backgroundColor: '#F8FAFC', borderRadius: '16px', border: `1px solid ${colores.borde}` }}>
          <h4 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: '800', color: colores.textoClaro }}>Tipología Estructural</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
            <div><strong>Sistema:</strong> Marcos Dúctiles de Concreto Reforzado + Muros de Cortante</div>
            <div><strong>Cimentación:</strong> Pilotes profundos a 35m (Estrato Firme)</div>
            <div><strong>Irregularidad Geométrica:</strong> Planta tipo L con torsión moderada</div>
            <div><strong>Año de Construcción:</strong> 2008 (Norma RCDF 2004)</div>
          </div>
        </div>

        <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: `1px solid ${colores.borde}` }}>
          <h4 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: '800', color: colores.textoClaro }}>Curva de Fragilidad Estructural</h4>
          <div style={{ height: '140px', backgroundColor: '#F1F5F9', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colores.textoOscuro, fontSize: '12px', fontWeight: '600' }}>
            📈 Curva de Fragilidad Sísmica (PGA vs Probabilidad de Colapso / Daño Moderado)
          </div>
        </div>
      </div>
    </div>
  );
};
