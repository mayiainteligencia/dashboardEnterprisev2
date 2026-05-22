import React from 'react';
import { Headphones, ArrowRight, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

interface TicketsSoporteModuleProps {
  onNavigate?: (section: string) => void;
}

const Donut: React.FC<{ pct: number; color: string; size?: number }> = ({ pct, color, size = 44 }) => {
  const r = 16, circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{ flexShrink: 0 }}>
      <circle cx="20" cy="20" r={r} fill="none" stroke={`${color}22`} strokeWidth="5" />
      <circle cx="20" cy="20" r={r} fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={`${dash} ${circ}`} strokeDashoffset={circ * 0.25}
        strokeLinecap="round" style={{ transition: 'stroke-dasharray 0.6s ease' }} />
      <text x="20" y="24" textAnchor="middle" fontSize="8" fontWeight="700" fill={color}>{pct}%</text>
    </svg>
  );
};

export const TicketsSoporteModule: React.FC<TicketsSoporteModuleProps> = ({ onNavigate }) => {
  const { colores } = brandingConfig;

  const tickets = [
    { id: 'TK-2847', asunto: 'Latencia en enlace redundante', prioridad: 'alta', estado: 'abierto', tiempo: '2h 15m' },
    { id: 'TK-2846', asunto: 'Solicitud de aumento de potencia', prioridad: 'media', estado: 'en progreso', tiempo: '4h 30m' },
    { id: 'TK-2845', asunto: 'Reemplazo de disco en RAID', prioridad: 'alta', estado: 'en progreso', tiempo: '6h 10m' },
    { id: 'TK-2844', asunto: 'Actualización firmware switches', prioridad: 'baja', estado: 'resuelto', tiempo: '1h 45m' },
    { id: 'TK-2843', asunto: 'Configuración nuevo VLAN', prioridad: 'media', estado: 'resuelto', tiempo: '3h 20m' },
  ];

  const prioridadColor: Record<string, string> = {
    alta: colores.peligro,
    media: colores.advertencia,
    baja: colores.exito,
  };

  const estadoColor: Record<string, string> = {
    abierto: colores.peligro,
    'en progreso': colores.advertencia,
    resuelto: colores.exito,
  };

  return (
    <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '24px', border: `1px solid ${colores.borde}`, padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', height: '100%' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `linear-gradient(135deg, #3B82F6, #06B6D4)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Headphones size={22} color="white" />
        </div>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: colores.textoClaro, margin: 0 }}>Tickets y Soporte</h3>
          <p style={{ fontSize: '10px', color: colores.textoMedio, margin: 0 }}>
            Estado · Tiempos · <span style={{ color: '#3B82F6', fontWeight: 600 }}>{tickets.filter(t => t.estado !== 'resuelto').length} abiertos</span>
          </p>
        </div>
      </div>

      {/* KPIs + Donut */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div style={{ backgroundColor: colores.fondoTerciario, borderRadius: '14px', padding: '14px' }}>
          <p style={{ fontSize: '10px', fontWeight: '600', color: colores.textoMedio, margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.4px' }}>SLA Cumplimiento</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Donut pct={94} color={colores.exito} size={48} />
            <div>
              <p style={{ fontSize: '11px', fontWeight: '600', color: colores.textoClaro, margin: 0 }}>94% en SLA</p>
              <p style={{ fontSize: '9px', color: colores.textoMedio, margin: '2px 0 0 0' }}>Meta: 95%</p>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: colores.fondoTerciario, borderRadius: '14px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p style={{ fontSize: '10px', fontWeight: '600', color: colores.textoMedio, margin: 0, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Resumen</p>
          {[
            { emoji: '🔴', num: '2', label: 'Abiertos' },
            { emoji: '🟡', num: '1', label: 'En progreso' },
            { emoji: '🟢', num: '2', label: 'Resueltos hoy' },
          ].map(({ emoji, num, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '10px' }}>{emoji}</span>
              <span style={{ fontSize: '14px', fontWeight: '800', color: colores.textoClaro }}>{num}</span>
              <span style={{ fontSize: '9px', color: colores.textoMedio }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tickets recientes */}
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: '10px', fontWeight: '600', color: colores.textoMedio, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0' }}>Tickets Recientes</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {tickets.map(({ id, asunto, prioridad, estado, tiempo }) => (
            <div key={id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', backgroundColor: colores.fondoTerciario, borderRadius: '10px', borderLeft: `3px solid ${prioridadColor[prioridad]}` }}>
              {estado === 'resuelto'
                ? <CheckCircle size={12} color={colores.exito} style={{ flexShrink: 0 }} />
                : estado === 'abierto'
                ? <AlertTriangle size={12} color={colores.peligro} style={{ flexShrink: 0 }} />
                : <Clock size={12} color={colores.advertencia} style={{ flexShrink: 0 }} />}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '10px', fontWeight: '600', color: colores.textoClaro, margin: 0, lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{asunto}</p>
                <p style={{ fontSize: '8px', color: colores.textoMedio, margin: '2px 0 0 0' }}>{id}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px', flexShrink: 0 }}>
                <span style={{ fontSize: '8px', fontWeight: '700', color: estadoColor[estado], backgroundColor: `${estadoColor[estado]}15`, padding: '2px 6px', borderRadius: '8px' }}>{estado}</span>
                <span style={{ fontSize: '8px', color: colores.textoMedio }}>{tiempo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={() => onNavigate?.('centroOperacion')}
        style={{ width: '100%', padding: '11px 16px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #3B82F6, #06B6D4)', color: 'white', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'opacity 0.2s', marginTop: 'auto' }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        Ver soporte completo <ArrowRight size={15} />
      </button>
    </div>
  );
};
