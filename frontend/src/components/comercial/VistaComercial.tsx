import React, { useState } from 'react';
import { brandingConfig } from '../../config/branding';
import { useLiveFeed } from '../../context/LiveFeedContext';
import {
  TrendingUp, UserPlus, Store, Radar, Crown, Target,
  Megaphone, Users, Package, Repeat, Activity, Zap,
} from 'lucide-react';

const { colores } = brandingConfig;

interface NavItem { id: string; label: string; icon: typeof TrendingUp; color: string; description: string; kpi: string; }

const NAV: NavItem[] = [
  { id: 'leads',      label: 'Leads',                icon: UserPlus,   color: '#8B5CF6', description: 'Funnel, canales y proyección', kpi: '9,870 activos' },
  { id: 'operacion',  label: 'Operación',             icon: Store,      color: '#10B981', description: 'Piso, copiloto y financiamiento', kpi: '312 chats hoy' },
  { id: 'influencers',label: 'Radar Influencers',     icon: Radar,      color: '#F59E0B', description: 'Monitoreo de influencia digital', kpi: '24 monitoreados' },
  { id: 'ceo',        label: 'Vista CEO',             icon: Crown,      color: '#EF4444', description: '13 agencias en tiempo real', kpi: '1,426 ventas' },
  { id: 'scoring',    label: 'Lead Scoring IA',       icon: Target,     color: '#d4000a', description: 'Intención de compra por IA', kpi: 'Score prom. 64' },
  { id: 'campanias',  label: 'Campañas',              icon: Megaphone,  color: '#3B82F6', description: 'ROI y atribución de campañas', kpi: 'ROI ×4.2 activo' },
  { id: 'vendedores', label: 'Vendedores',            icon: Users,      color: '#06B6D4', description: 'Ranking y eficiencia del equipo', kpi: '5 vendedores' },
  { id: 'inventario', label: 'Inventario',            icon: Package,    color: '#84CC16', description: 'Stock, rotación y demanda', kpi: '172 unidades' },
  { id: 'conversion', label: 'Conversión',            icon: Repeat,     color: '#F97316', description: 'Embudo WhatsApp y recompra', kpi: '8.6% conv. total' },
];

interface Props { onNavigate?: (id: string) => void; }

export const VistaComercial: React.FC<Props> = ({ onNavigate }) => {
  const { events } = useLiveFeed();
  const [hovered, setHovered] = useState<string | null>(null);
  const ventas  = events.filter(e => e.type === 'venta').length;
  const leads   = events.filter(e => e.type === 'lead').length;
  const alertas = events.filter(e => e.type === 'alerta').length;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px', alignItems: 'start' }}>
      {/* Left: module grid */}
      <div>
        {/* Hero KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '24px' }}>
          {[
            { label: 'Ventas en sesión', value: `${1226 + ventas}`, delta: `+${ventas} nuevas`, color: colores.primario },
            { label: 'Leads calificados', value: `${9870 + leads * 3}`, delta: `+${leads * 3} sesión`, color: '#8B5CF6' },
            { label: 'Alertas activas', value: `${4 + alertas}`, delta: alertas > 0 ? 'Revisar' : 'Normal', color: alertas > 0 ? '#EF4444' : '#10B981' },
          ].map(k => (
            <div key={k.label} style={{
              padding: '16px 18px',
              background: colores.fondoSecundario,
              border: `1px solid ${colores.borde}`,
              borderRadius: '16px',
              position: 'relative', overflow: 'hidden',
              boxShadow: colores.sombra,
            }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: k.color }} />
              <p style={{ margin: 0, fontSize: '11px', color: colores.textoMedio, textTransform: 'uppercase', letterSpacing: '0.3px', fontWeight: 600 }}>{k.label}</p>
              <p style={{ margin: '4px 0 0', fontSize: '28px', fontWeight: 800, color: colores.textoClaro, fontVariantNumeric: 'tabular-nums' }}>{k.value}</p>
              <p style={{ margin: '2px 0 0', fontSize: '12px', fontWeight: 600, color: k.color }}>{k.delta}</p>
            </div>
          ))}
        </div>

        {/* Module grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px' }}>
          {NAV.map(item => {
            const Icon = item.icon;
            const isHov = hovered === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onNavigate?.(item.id)}
                style={{
                  padding: '18px',
                  background: isHov ? `${item.color}12` : colores.fondoSecundario,
                  border: `1px solid ${isHov ? item.color + '50' : colores.borde}`,
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
                  transform: isHov ? 'translateY(-3px)' : 'translateY(0)',
                  boxShadow: isHov ? `0 8px 24px ${item.color}25` : colores.sombra,
                }}
              >
                <div style={{
                  width: '42px', height: '42px', borderRadius: '12px',
                  background: `${item.color}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '12px',
                  transition: 'transform 0.3s',
                  transform: isHov ? 'scale(1.1)' : 'scale(1)',
                }}>
                  <Icon size={22} color={item.color} />
                </div>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: colores.textoClaro }}>{item.label}</p>
                <p style={{ margin: '3px 0 8px', fontSize: '11px', color: colores.textoMedio }}>{item.description}</p>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  padding: '3px 8px', borderRadius: '6px',
                  background: `${item.color}15`,
                }}>
                  <Activity size={10} color={item.color} />
                  <span style={{ fontSize: '11px', fontWeight: 700, color: item.color }}>{item.kpi}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: live feed */}
      <div style={{
        background: colores.fondoSecundario,
        border: `1px solid ${colores.borde}`,
        borderRadius: '18px',
        padding: '18px',
        position: 'sticky',
        top: '0',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10B981', animation: 'feedPulse 1.5s infinite' }} />
          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: colores.textoClaro }}>Feed en Vivo</h3>
          <span style={{ marginLeft: 'auto', fontSize: '11px', color: colores.textoMedio }}>{events.length} eventos</span>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {events.slice(0, 20).map((e, i) => (
            <div key={e.id} style={{
              padding: '10px 12px',
              background: i === 0 ? `${colores.primario}08` : colores.fondoTerciario,
              borderRadius: '10px',
              border: `1px solid ${i === 0 ? colores.primario + '30' : 'transparent'}`,
              animation: i === 0 ? 'feedSlide 0.4s ease' : 'none',
            }}>
              <p style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: colores.textoClaro }}>{e.title}</p>
              <p style={{ margin: '2px 0 0', fontSize: '11px', color: colores.textoMedio }}>{e.body}</p>
              <p style={{ margin: '3px 0 0', fontSize: '10px', color: colores.textoOscuro }}>{e.time}</p>
            </div>
          ))}
          {events.length === 0 && (
            <div style={{ textAlign: 'center', padding: '24px', color: colores.textoMedio }}>
              <Zap size={24} color={colores.borde} style={{ marginBottom: '8px' }} />
              <p style={{ margin: 0, fontSize: '12px' }}>Esperando eventos...</p>
            </div>
          )}
        </div>

        <style>{`
          @keyframes feedPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }
          @keyframes feedSlide { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
        `}</style>
      </div>
    </div>
  );
};
