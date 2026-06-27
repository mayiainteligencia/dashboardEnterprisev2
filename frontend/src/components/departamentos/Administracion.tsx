import React from 'react';
import { Building2, FileText, Calendar, Award } from 'lucide-react';
import { brandingConfig } from '../../config/branding';
import { DepartamentoShell } from './DepartamentoShell';

const { colores } = brandingConfig;

const compliance = [
  { label: 'NOM-035 STPS', status: 'Cumplido', color: '#10B981' },
  { label: 'IMSS / INFONAVIT', status: 'Al día', color: '#10B981' },
  { label: 'SAT — Facturación', status: 'Cumplido', color: '#10B981' },
  { label: 'Contratos de arrendamiento', status: 'Revisión', color: '#F59E0B' },
  { label: 'Pólizas de seguro', status: '30 días', color: '#F59E0B' },
];

export const Administracion: React.FC = () => (
  <DepartamentoShell
    icon={Building2}
    title="Administración"
    subtitle="Gestión corporativa, legal y cumplimiento"
    color="#6B7280"
    kpis={[
      { label: 'Contratos activos', value: '47', delta: '+3 este mes', deltaUp: true, color: '#6B7280' },
      { label: 'Cumplimiento', value: '94%', delta: '3 pendientes', color: '#F59E0B' },
      { label: 'Documentos digitalizados', value: '1,240', delta: '+87 mes', deltaUp: true, color: '#10B981' },
      { label: 'Proveedores activos', value: '32', delta: '2 nuevos', deltaUp: true, color: '#8B5CF6' },
    ]}
    agent={{ name: 'Admin Agent', role: 'Gestión documental', status: 'online', actionsToday: 16 }}
    actions={[
      { text: 'Renovar pólizas de seguro (vencen en 30 días)', priority: 'alta', assignee: 'Legal' },
      { text: 'Revisar contratos de arrendamiento Satélite', priority: 'alta', assignee: 'Admin Agent' },
      { text: 'Digitalizar expedientes de nuevos empleados', priority: 'media', assignee: 'Administración' },
      { text: 'Actualizar inventario de activos fijos', priority: 'baja', assignee: 'Contabilidad' },
    ]}
    recommendation="El cumplimiento normativo está al 94%. Los 3 puntos restantes son las pólizas de seguro y contratos de arrendamiento. Priorizar antes del cierre del trimestre para evitar sanciones regulatorias."
  >
    <div style={{
      background: colores.fondoSecundario,
      border: `1px solid ${colores.borde}`,
      borderRadius: '16px', padding: '18px',
    }}>
      <h3 style={{ margin: '0 0 14px', fontSize: '14px', fontWeight: 800, color: colores.textoClaro }}>Cumplimiento normativo</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {compliance.map(c => (
          <div key={c.label} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '10px 14px', background: colores.fondoTerciario,
            border: `1px solid ${colores.borde}`, borderRadius: '10px',
          }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: colores.textoClaro }}>{c.label}</span>
            <span style={{ fontSize: '11px', fontWeight: 700, color: c.color, background: `${c.color}15`, padding: '3px 9px', borderRadius: '6px' }}>
              {c.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  </DepartamentoShell>
);
