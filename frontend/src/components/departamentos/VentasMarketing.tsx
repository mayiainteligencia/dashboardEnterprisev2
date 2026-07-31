import React from 'react';
import { TrendingUp, Target, Megaphone, Users } from 'lucide-react';
import { brandingConfig } from '../../config/branding';
import { DepartamentoShell } from './DepartamentoShell';

const { colores } = brandingConfig;

const channels = [
  { name: 'Facebook Ads', leads: 3120, roi: '×4.2', color: '#1877F2' },
  { name: 'Google Ads', leads: 2480, roi: '×3.6', color: '#DB4437' },
  { name: 'WhatsApp IA', leads: 1890, roi: '×6.1', color: '#25D366' },
  { name: 'TikTok', leads: 1240, roi: '×2.9', color: '#000000' },
];

const maxLeads = Math.max(...channels.map(c => c.leads));

export const VentasMarketing: React.FC = () => (
  <DepartamentoShell
    icon={TrendingUp}
    title="Ventas y Marketing"
    subtitle="Canales, campañas y métricas de conversión"
    color="#8B5CF6"
    kpis={[
      { label: 'Leads totales', value: '9,870', delta: '+12.8%', deltaUp: true, color: '#8B5CF6' },
      { label: 'Conversión', value: '9.3%', delta: '+1.2 pts', deltaUp: true, color: '#10B981' },
      { label: 'CPL promedio', value: '$74', delta: '-6%', deltaUp: true, color: '#F59E0B' },
      { label: 'ROI mejor canal', value: '×6.1', delta: 'WhatsApp', deltaUp: true, color: '#d4000a' },
    ]}
    agent={{ name: 'Marketing IA', role: 'Optimización de campañas', status: 'online', actionsToday: 42 }}
    actions={[
      { text: 'Escalar presupuesto en WhatsApp — ROI ×6.1', priority: 'alta', assignee: 'Marketing IA' },
      { text: 'Crear campaña retargeting para leads > 60 score', priority: 'alta', assignee: 'Campañas' },
      { text: 'Optimizar copy de anuncios TikTok (CTR bajo)', priority: 'media', assignee: 'Creativo' },
      { text: 'Revisar audiencias de Facebook Ads', priority: 'baja', assignee: 'Performance' },
    ]}
    recommendation="WhatsApp IA tiene el mejor ROI del portafolio (×6.1). Sugiero mover 20% del presupuesto de TikTok a WhatsApp para el próximo mes. Los leads de piso de venta tienen ROI ×9.8 — considera eventos especiales en agencias top."
  >
    <div style={{
      background: colores.fondoSecundario,
      border: `1px solid ${colores.borde}`,
      borderRadius: '16px', padding: '18px',
    }}>
      <h3 style={{ margin: '0 0 14px', fontSize: '14px', fontWeight: 800, color: colores.textoClaro }}>Rendimiento por canal</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {channels.map(ch => (
          <div key={ch.name} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: colores.textoClaro, width: '100px', flexShrink: 0 }}>{ch.name}</span>
            <div style={{ flex: 1, height: '18px', background: colores.fondoTerciario, borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{
                width: `${(ch.leads / maxLeads) * 100}%`, height: '100%',
                background: `linear-gradient(90deg, ${ch.color}BB, ${ch.color})`,
                borderRadius: '6px',
                transition: 'width 0.8s ease',
                display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '6px',
              }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#fff' }}>{ch.leads.toLocaleString()}</span>
              </div>
            </div>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#8B5CF6', width: '42px', textAlign: 'right' }}>{ch.roi}</span>
          </div>
        ))}
      </div>
    </div>
  </DepartamentoShell>
);
