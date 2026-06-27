import React from 'react';
import { DollarSign, TrendingUp, PieChart, BarChart2 } from 'lucide-react';
import { brandingConfig } from '../../config/branding';
import { DepartamentoShell } from './DepartamentoShell';

const { colores } = brandingConfig;

const items = [
  { label: 'Flujo de caja', value: '$4.2M', trend: '+12%', up: true },
  { label: 'Ingresos mes', value: '$8.7M', trend: '+18%', up: true },
  { label: 'Gastos operativos', value: '$3.1M', trend: '-4%', up: false },
  { label: 'EBITDA', value: '$2.8M', trend: '+22%', up: true },
  { label: 'ROI campaña', value: '×4.2', trend: '+0.6', up: true },
  { label: 'Cuentas por cobrar', value: '$1.4M', trend: '30 días', up: false },
];

export const FinanzasContabilidad: React.FC = () => (
  <DepartamentoShell
    icon={DollarSign}
    title="Finanzas y Contabilidad"
    subtitle="Control financiero inteligente en tiempo real"
    color="#10B981"
    kpis={[
      { label: 'Ingresos mes', value: '$8.7M', delta: '+18%', deltaUp: true, color: '#10B981' },
      { label: 'Flujo de caja', value: '$4.2M', delta: 'saludable', deltaUp: true, color: '#3B82F6' },
      { label: 'Gastos op.', value: '$3.1M', delta: '-4%', deltaUp: true, color: '#F59E0B' },
      { label: 'EBITDA', value: '$2.8M', delta: '+22%', deltaUp: true, color: '#CC0000' },
    ]}
    agent={{ name: 'CFO Agent', role: 'Análisis financiero', status: 'online', actionsToday: 31 }}
    actions={[
      { text: 'Conciliar cuentas por cobrar de Santa Fe', priority: 'alta', assignee: 'Contabilidad' },
      { text: 'Generar reporte de ROI campañas Q2', priority: 'alta', assignee: 'CFO Agent' },
      { text: 'Revisar proyección de flujo para Mayo', priority: 'media', assignee: 'Finanzas' },
      { text: 'Aprobar presupuesto de nueva campaña TikTok', priority: 'baja', assignee: 'Dirección' },
    ]}
    recommendation="El EBITDA creció 22% vs Q1. La agencia Guadalajara aporta 15% del ingreso total con el menor costo operativo. Recomiendo replicar su modelo en Polanco y Coyoacán."
  >
    <div style={{
      background: colores.fondoSecundario,
      border: `1px solid ${colores.borde}`,
      borderRadius: '16px', padding: '18px',
    }}>
      <h3 style={{ margin: '0 0 14px', fontSize: '14px', fontWeight: 800, color: colores.textoClaro }}>Resumen financiero por área</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '10px' }}>
        {items.map(item => (
          <div key={item.label} style={{
            padding: '14px', background: colores.fondoTerciario,
            border: `1px solid ${colores.borde}`, borderRadius: '12px',
          }}>
            <p style={{ margin: 0, fontSize: '10px', color: colores.textoMedio, textTransform: 'uppercase', letterSpacing: '0.3px', fontWeight: 600 }}>{item.label}</p>
            <p style={{ margin: '4px 0 0', fontSize: '20px', fontWeight: 800, color: '#10B981', fontVariantNumeric: 'tabular-nums' }}>{item.value}</p>
            <p style={{ margin: '2px 0 0', fontSize: '11px', fontWeight: 600, color: item.up ? '#10B981' : '#EF4444' }}>
              {item.up ? '▲' : '▼'} {item.trend}
            </p>
          </div>
        ))}
      </div>
    </div>
  </DepartamentoShell>
);
