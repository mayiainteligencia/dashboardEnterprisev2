import React from 'react';
import { CheckSquare, DollarSign, ArrowUpRight, Clock, ShieldCheck } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

export const MitigacionCapexModule: React.FC = () => {
  const { colores } = brandingConfig;

  const columnasKanban = [
    { id: 'nueva', titulo: 'Nueva Recomendación', items: [
      { id: 'mit-1', titulo: 'Instalar Rociadores ESFR en Nave 3', cost: '$180,000 USD', deltaScore: '-14 pts', inmueble: 'Parque Apodaca' },
      { id: 'mit-2', titulo: 'Refuerzo de Encamisado en Columnas Sótano', cost: '$320,000 USD', deltaScore: '-22 pts', inmueble: 'Torre Reforma 222' }
    ]},
    { id: 'ejecucion', titulo: 'En Ejecución', items: [
      { id: 'mit-3', titulo: 'Reemplazo de Bomba Principal NFPA 20', cost: '$95,000 USD', deltaScore: '-18 pts', inmueble: 'Galerías Guadalajara' }
    ]},
    { id: 'validacion', titulo: 'En Validación IA / QA', items: [
      { id: 'mit-4', titulo: 'Sellado de Penetraciones Muro Cortafuego', cost: '$24,000 USD', deltaScore: '-8 pts', inmueble: 'San Martín Obispo' }
    ]},
    { id: 'cerrada', titulo: 'Cerrada & Re-Score Emitido', items: [
      { id: 'mit-5', titulo: 'Mantenimiento Preventivo Subestación 1500 kVA', cost: '$12,000 USD', deltaScore: '-6 pts', inmueble: 'Grand Riviera' }
    ]}
  ];

  return (
    <div style={{ padding: '28px', backgroundColor: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ borderBottom: `1px solid ${colores.borde}`, paddingBottom: '16px' }}>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: colores.textoClaro }}>
          Mitigación & Workflows CAPEX (Kanban & ROI)
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: colores.textoOscuro }}>
          Dashboard 14 · Priorización económica de acciones preventivas, retorno en score y control de SLAs
        </p>
      </div>

      {/* Tablero Kanban Interactivo */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
        {columnasKanban.map(col => (
          <div key={col.id} style={{ backgroundColor: '#F8FAFC', borderRadius: '14px', border: `1px solid ${colores.borde}`, padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `2px solid ${colores.primario}`, paddingBottom: '8px' }}>
              <span style={{ fontWeight: '800', fontSize: '13px', color: colores.textoClaro }}>{col.titulo}</span>
              <span style={{ fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '999px', backgroundColor: colores.primario, color: '#FFFFFF' }}>{col.items.length}</span>
            </div>

            {col.items.map(item => (
              <div key={item.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: `1px solid ${colores.borde}`, padding: '12px', boxShadow: '0 2px 4px rgba(15,23,42,0.03)' }}>
                <h5 style={{ margin: '0 0 6px', fontSize: '13px', fontWeight: '700', color: colores.textoClaro }}>{item.titulo}</h5>
                <span style={{ fontSize: '11px', color: colores.textoOscuro, display: 'block', marginBottom: '8px' }}>{item.inmueble}</span>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '700' }}>
                  <span style={{ color: colores.primario }}>Costo: {item.cost}</span>
                  <span style={{ color: '#10B981' }}>Score: {item.deltaScore}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
