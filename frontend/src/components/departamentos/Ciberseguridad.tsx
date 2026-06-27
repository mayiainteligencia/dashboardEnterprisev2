import React from 'react';
import { Shield, Lock, Eye, AlertTriangle } from 'lucide-react';
import { brandingConfig } from '../../config/branding';
import { DepartamentoShell } from './DepartamentoShell';

const { colores } = brandingConfig;

const threats = [
  { type: 'Intentos de phishing bloqueados', count: 34, severity: 'alto', color: '#EF4444' },
  { type: 'Accesos sospechosos', count: 7, severity: 'medio', color: '#F59E0B' },
  { type: 'Actualizaciones de seguridad pendientes', count: 3, severity: 'bajo', color: '#3B82F6' },
  { type: 'Dispositivos sin cifrado', count: 1, severity: 'medio', color: '#F59E0B' },
];

export const Ciberseguridad: React.FC = () => (
  <DepartamentoShell
    icon={Shield}
    title="CiberSeguridad"
    subtitle="Protección de activos digitales y monitoreo de amenazas"
    color="#EF4444"
    kpis={[
      { label: 'Amenazas bloqueadas', value: '34', delta: 'hoy', color: '#EF4444' },
      { label: 'Score seguridad', value: 'A+', delta: 'óptimo', deltaUp: true, color: '#10B981' },
      { label: 'Incidentes activos', value: '1', delta: 'en revisión', color: '#F59E0B' },
      { label: 'Uptime seguro', value: '100%', delta: '30 días', deltaUp: true, color: '#3B82F6' },
    ]}
    agent={{ name: 'Sec Agent', role: 'SOC 24/7', status: 'online', actionsToday: 89 }}
    actions={[
      { text: 'Cifrar dispositivo: Laptop #14 (Tomás H.)', priority: 'alta', assignee: 'Sec Agent' },
      { text: 'Aplicar 3 parches de seguridad pendientes', priority: 'alta', assignee: 'DevOps' },
      { text: 'Revisar logs de acceso sospechoso de Santa Fe', priority: 'media', assignee: 'Seguridad' },
      { text: 'Actualizar política de contraseñas', priority: 'baja', assignee: 'TI' },
    ]}
    recommendation="El sistema bloqueó 34 intentos de phishing hoy, arriba del promedio de 12. Sugiero activar autenticación de 2 factores en todas las cuentas de vendedores con acceso al CRM. El riesgo de compromiso actual es bajo."
  >
    <div style={{
      background: colores.fondoSecundario,
      border: `1px solid ${colores.borde}`,
      borderRadius: '16px', padding: '18px',
    }}>
      <h3 style={{ margin: '0 0 14px', fontSize: '14px', fontWeight: 800, color: colores.textoClaro }}>Monitor de amenazas</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {threats.map(t => (
          <div key={t.type} style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '10px 14px',
            background: `${t.color}08`,
            border: `1px solid ${t.color}25`,
            borderLeft: `3px solid ${t.color}`,
            borderRadius: '10px',
          }}>
            <AlertTriangle size={16} color={t.color} />
            <span style={{ flex: 1, fontSize: '13px', fontWeight: 600, color: colores.textoClaro }}>{t.type}</span>
            <span style={{ fontSize: '14px', fontWeight: 800, color: t.color }}>{t.count}</span>
          </div>
        ))}
      </div>
    </div>
  </DepartamentoShell>
);
