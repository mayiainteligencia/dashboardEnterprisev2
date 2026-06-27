import React, { useState, useEffect } from 'react';
import { AlertTriangle, Shield, Clock, CheckCircle, X, Bell, ChevronRight, Cpu } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';
import { useLiveFeed } from '../../../context/LiveFeedContext';

const { colores } = brandingConfig;

interface Alerta {
  id: string;
  tipo: 'critico' | 'advertencia' | 'info' | 'exito';
  titulo: string;
  mensaje: string;
  tiempo: string;
  departamento: string;
  accion?: string;
  dismissed?: boolean;
}

const INITIAL_ALERTAS: Alerta[] = [
  {
    id: '1', tipo: 'critico',
    titulo: 'Santa Fe: conversión 9.7% bajo meta',
    mensaje: '88 ventas vs meta de 140. 14 cotizaciones sin seguimiento.',
    tiempo: 'Hace 5 min', departamento: 'Ventas',
    accion: 'Te sugiero reasignar los leads de alta intención al vendedor disponible más cercano.',
  },
  {
    id: '2', tipo: 'advertencia',
    titulo: 'Stock Kestra crítico — 12 días',
    mensaje: 'Solo 18 unidades. Al ritmo actual se agota en 9 días.',
    tiempo: 'Hace 20 min', departamento: 'Inventario',
    accion: 'Te recomiendo solicitar un traspaso inmediato entre agencias de la misma zona.',
  },
  {
    id: '3', tipo: 'exito',
    titulo: 'Guadalajara superó meta mensual',
    mensaje: '151 ventas vs meta de 145. Mejor canal: Social Ads ROI ×4.6',
    tiempo: 'Hace 1 h', departamento: 'Agencias',
    accion: '¡Excelente! Te sugiero documentar y replicar el playbook de esta agencia.',
  },
  {
    id: '4', tipo: 'advertencia',
    titulo: 'Mensajería IA: 18 leads sin atender',
    mensaje: '6 son de intención alta (score >80). Riesgo de fuga 32%.',
    tiempo: 'Hace 40 min', departamento: 'Agente Chat',
    accion: 'Activaré el round-robin de asesores humanos para atenderlos de inmediato.',
  },
];

const CONFIG = {
  critico:     { color: '#EF4444', icon: AlertTriangle, bg: '#EF444415', label: 'Urgente' },
  advertencia: { color: '#F59E0B', icon: Clock,         bg: '#F59E0B15', label: 'Atención' },
  info:        { color: '#3B82F6', icon: Shield,        bg: '#3B82F615', label: 'Info' },
  exito:       { color: '#10B981', icon: CheckCircle,   bg: '#10B98115', label: 'Logro' },
};

export const AlertasEmpresa: React.FC = () => {
  const { events } = useLiveFeed();
  const [alertas, setAlertas] = useState<Alerta[]>(INITIAL_ALERTAS);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [newIds, setNewIds] = useState<Set<string>>(new Set());

  // Convertir eventos live en alertas
  useEffect(() => {
    const liveAlertas = events
      .filter(e => e.type === 'alerta' || e.type === 'venta')
      .slice(0, 3)
      .map(e => ({
        id: e.id,
        tipo: e.type === 'alerta' ? ('critico' as const) : ('exito' as const),
        titulo: e.title,
        mensaje: e.body,
        tiempo: e.time,
        departamento: e.agencia ?? 'General',
        accion: e.type === 'alerta' ? 'Te recomiendo revisar el inventario de esta sucursal y notificar a la agencia correspondiente.' : '¡Venta registrada! Te sugiero celebrar este logro con el equipo.',
      }));

    if (liveAlertas.length > 0) {
      const newSet = new Set(liveAlertas.map(a => a.id));
      setNewIds(newSet);
      setAlertas(prev => {
        const existingIds = new Set(prev.map(a => a.id));
        const toAdd = liveAlertas.filter(a => !existingIds.has(a.id));
        return [...toAdd, ...prev].slice(0, 8);
      });
      const t = setTimeout(() => setNewIds(new Set()), 3000);
      return () => clearTimeout(t);
    }
  }, [events]);

  const dismiss = (id: string) => setAlertas(prev => prev.filter(a => a.id !== id));
  const active = alertas.filter(a => !a.dismissed);
  const criticos = active.filter(a => a.tipo === 'critico').length;

  return (
    <div style={{
      background: colores.fondoSecundario,
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      padding: '20px',
      border: `1px solid ${colores.borde}`,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: `linear-gradient(135deg, ${colores.primario}, #990000)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Bell size={18} color="#fff" />
          </div>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: colores.textoClaro, margin: 0 }}>Alertas del Sistema</h3>
            <p style={{ fontSize: '11px', color: colores.textoMedio, margin: 0 }}>
              <span style={{ color: '#EF4444', fontWeight: 700 }}>{criticos}</span> críticas · {active.length} activas
            </p>
          </div>
        </div>
        {/* Pulsating indicator */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '5px',
          padding: '4px 10px', borderRadius: '20px',
          background: '#EF444415', border: '1px solid #EF444430',
        }}>
          <div style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: '#EF4444',
            animation: 'alertPulse 1.5s infinite',
            boxShadow: '0 0 8px #EF4444',
          }} />
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#EF4444' }}>LIVE</span>
        </div>
      </div>

      {/* Alert list */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
        {active.map(alerta => {
          const cfg = CONFIG[alerta.tipo];
          const Icon = cfg.icon;
          const isNew = newIds.has(alerta.id);
          const isExpanded = expanded === alerta.id;

          return (
            <div
              key={alerta.id}
              style={{
                background: isNew ? `${cfg.color}20` : cfg.bg,
                borderLeft: `3px solid ${cfg.color}`,
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                animation: isNew ? 'alertSlideIn 0.4s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
                boxShadow: isNew ? `0 4px 16px ${cfg.color}30` : 'none',
              }}
            >
              {/* Main row */}
              <div
                style={{ padding: '10px 12px', cursor: 'pointer', display: 'flex', gap: '10px', alignItems: 'flex-start' }}
                onClick={() => setExpanded(isExpanded ? null : alerta.id)}
              >
                <div style={{
                  width: '32px', height: '32px', borderRadius: '9px',
                  background: `${cfg.color}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={15} color={cfg.color} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                    {isNew && (
                      <span style={{
                        fontSize: '9px', fontWeight: 700, color: '#fff',
                        background: cfg.color, borderRadius: '4px', padding: '1px 5px',
                        textTransform: 'uppercase',
                      }}>NUEVO</span>
                    )}
                    <p style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: colores.textoClaro }}>{alerta.titulo}</p>
                  </div>
                  <p style={{ margin: 0, fontSize: '11px', color: colores.textoMedio, lineHeight: 1.4 }}>{alerta.mensaje}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '5px' }}>
                    <span style={{ fontSize: '10px', color: colores.textoOscuro }}>{alerta.tiempo}</span>
                    <span style={{ fontSize: '10px', fontWeight: 600, color: cfg.color, background: `${cfg.color}20`, padding: '1px 6px', borderRadius: '5px' }}>
                      {alerta.departamento}
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flexShrink: 0 }}>
                  <ChevronRight size={14} color={colores.textoOscuro} style={{ transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                </div>
              </div>

              {/* Expanded action */}
              <div style={{ maxHeight: isExpanded ? '80px' : 0, overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                <div style={{ padding: '0 12px 12px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{
                    flex: 1, padding: '8px 10px', borderRadius: '8px',
                    background: `${cfg.color}10`, border: `1px solid ${cfg.color}25`,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '2px' }}>
                      <Cpu size={10} color={cfg.color} />
                      <span style={{ fontSize: '10px', fontWeight: 700, color: cfg.color }}>Recomendación MAYIA</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '11px', color: colores.textoClaro }}>{alerta.accion}</p>
                  </div>
                  <button
                    onClick={() => dismiss(alerta.id)}
                    style={{
                      padding: '6px 10px', borderRadius: '8px', border: 'none',
                      background: cfg.color, color: '#fff',
                      fontSize: '11px', fontWeight: 700, cursor: 'pointer',
                      flexShrink: 0,
                    }}
                  >
                    Resolver
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {active.length === 0 && (
          <div style={{ textAlign: 'center', padding: '24px', color: colores.textoMedio }}>
            <CheckCircle size={32} color="#10B981" style={{ marginBottom: '8px' }} />
            <p style={{ margin: 0, fontSize: '13px' }}>Sin alertas activas</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes alertPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
        @keyframes alertSlideIn {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};