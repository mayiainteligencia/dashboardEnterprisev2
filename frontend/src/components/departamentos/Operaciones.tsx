import React from 'react';
import { Settings, Truck, Package, Clock } from 'lucide-react';
import { brandingConfig } from '../../config/branding';
import { DepartamentoShell } from './DepartamentoShell';

const { colores } = brandingConfig;

const opStats = [
  { label: 'Entregas hoy', value: '34', trend: '+8%', up: true },
  { label: 'En tránsito', value: '12', trend: 'On time', up: true },
  { label: 'Stock crítico', value: '2', trend: 'Revisar', up: false },
  { label: 'NPS operativo', value: '82', trend: '+5pts', up: true },
];

export const Operaciones: React.FC = () => (
  <DepartamentoShell
    icon={Settings}
    title="Operaciones"
    subtitle="Logística, entregas y control de procesos"
    color="#F59E0B"
    kpis={[
      { label: 'Entregas hoy', value: '34', delta: '+8%', deltaUp: true, color: '#F59E0B' },
      { label: 'En tránsito', value: '12', delta: 'puntual', deltaUp: true, color: '#10B981' },
      { label: 'Stock crítico', value: '2 modelos', delta: 'atención', color: '#EF4444' },
      { label: 'NPS operativo', value: '82', delta: '+5 pts', deltaUp: true, color: '#8B5CF6' },
    ]}
    agent={{ name: 'Ops Agent', role: 'Logística IA', status: 'online', actionsToday: 18 }}
    actions={[
      { text: 'Coordinar traspaso de Paquete ULTRA: Guadalajara → Santa Fe', priority: 'alta', assignee: 'Logística' },
      { text: 'Confirmar 6 instalaciones programadas para mañana', priority: 'alta', assignee: 'Ops Agent' },
      { text: 'Actualizar ETA de 3 lotes de cristal en tránsito', priority: 'media', assignee: 'Coordinador' },
      { text: 'Revisar proceso de prueba de calidad balística', priority: 'baja', assignee: 'Calidad' },
    ]}
    recommendation="El Paquete ULTRA tiene stock crítico en Santa Fe (2 días). El traspaso desde Guadalajara puede resolverse en 48h. Priorizar la coordinación antes del fin de semana para no perder prospectos calificados."
  >
    <div style={{
      background: colores.fondoSecundario,
      border: `1px solid ${colores.borde}`,
      borderRadius: '16px', padding: '18px',
    }}>
      <h3 style={{ margin: '0 0 14px', fontSize: '14px', fontWeight: 800, color: colores.textoClaro }}>Estado operativo</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '10px' }}>
        {opStats.map(s => (
          <div key={s.label} style={{
            padding: '14px', background: colores.fondoTerciario,
            border: `1px solid ${colores.borde}`, borderRadius: '12px', textAlign: 'center',
          }}>
            <p style={{ margin: 0, fontSize: '10px', color: colores.textoMedio, textTransform: 'uppercase', letterSpacing: '0.3px', fontWeight: 600 }}>{s.label}</p>
            <p style={{ margin: '6px 0 2px', fontSize: '26px', fontWeight: 800, color: '#F59E0B' }}>{s.value}</p>
            <p style={{ margin: 0, fontSize: '11px', fontWeight: 600, color: s.up ? '#10B981' : '#EF4444' }}>{s.up ? '▲' : '▼'} {s.trend}</p>
          </div>
        ))}
      </div>
    </div>
  </DepartamentoShell>
);
