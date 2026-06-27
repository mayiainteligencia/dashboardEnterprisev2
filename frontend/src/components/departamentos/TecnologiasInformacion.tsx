import React from 'react';
import { Monitor, Shield, Server, Wifi } from 'lucide-react';
import { brandingConfig } from '../../config/branding';
import { DepartamentoShell } from './DepartamentoShell';

const { colores } = brandingConfig;

const systems = [
  { name: 'CRM Principal', status: 'online', uptime: '99.9%', color: '#10B981' },
  { name: 'WhatsApp Gateway', status: 'online', uptime: '100%', color: '#10B981' },
  { name: 'Dashboard IA', status: 'online', uptime: '99.7%', color: '#10B981' },
  { name: 'Base de datos', status: 'warning', uptime: '98.2%', color: '#F59E0B' },
  { name: 'API Gemini', status: 'online', uptime: '99.5%', color: '#10B981' },
  { name: 'Backup nube', status: 'warning', uptime: '97.1%', color: '#F59E0B' },
];

export const TecnologiasInformacion: React.FC = () => (
  <DepartamentoShell
    icon={Monitor}
    title="Tecnologías de la Información"
    subtitle="Infraestructura, sistemas y seguridad digital"
    color="#3B82F6"
    kpis={[
      { label: 'Sistemas activos', value: '6/6', delta: '100% online', deltaUp: true, color: '#3B82F6' },
      { label: 'Uptime promedio', value: '99.1%', delta: 'SLA OK', deltaUp: true, color: '#10B981' },
      { label: 'Tickets abiertos', value: '4', delta: '1 crítico', color: '#F59E0B' },
      { label: 'Seguridad', value: 'A+', delta: 'Sin brechas', deltaUp: true, color: '#8B5CF6' },
    ]}
    agent={{ name: 'TI Agent', role: 'Monitoreo 24/7', status: 'online', actionsToday: 54 }}
    actions={[
      { text: 'Actualizar sistema de backups (97.1% uptime)', priority: 'alta', assignee: 'DevOps' },
      { text: 'Revisar ticket crítico: lentitud CRM Satélite', priority: 'alta', assignee: 'TI Agent' },
      { text: 'Ejecutar prueba de penetración mensual', priority: 'media', assignee: 'Seguridad' },
      { text: 'Renovar certificados SSL (vencen en 45 días)', priority: 'baja', assignee: 'Infra' },
    ]}
    recommendation="El backup nube tiene uptime de 97.1%, por debajo del SLA de 99%. La causa probable es la ventana de mantenimiento sin notificación. Sugiero migrar a redundancia activa-activa para eliminar el punto de falla."
  >
    <div style={{
      background: colores.fondoSecundario,
      border: `1px solid ${colores.borde}`,
      borderRadius: '16px', padding: '18px',
    }}>
      <h3 style={{ margin: '0 0 14px', fontSize: '14px', fontWeight: 800, color: colores.textoClaro }}>Estado de sistemas</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {systems.map(sys => (
          <div key={sys.name} style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '10px 14px', background: colores.fondoTerciario,
            border: `1px solid ${colores.borde}`, borderRadius: '10px',
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: sys.color, flexShrink: 0, boxShadow: `0 0 8px ${sys.color}` }} />
            <span style={{ flex: 1, fontSize: '13px', fontWeight: 600, color: colores.textoClaro }}>{sys.name}</span>
            <span style={{ fontSize: '11px', fontWeight: 700, color: sys.color }}>{sys.uptime}</span>
            <span style={{ fontSize: '10px', color: sys.color, background: `${sys.color}15`, padding: '2px 7px', borderRadius: '5px', fontWeight: 600 }}>
              {sys.status === 'online' ? 'ONLINE' : 'ADVERTENCIA'}
            </span>
          </div>
        ))}
      </div>
    </div>
  </DepartamentoShell>
);
