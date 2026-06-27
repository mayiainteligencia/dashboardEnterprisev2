/**
 * DepartamentoShell — wrapper premium reutilizable para todos los departamentos.
 * Incluye: header con agente IA, métricas live, recomendación IA, y feed lateral.
 */
import React, { useState, useEffect } from 'react';
import { brandingConfig } from '../../config/branding';
import { useLiveFeed } from '../../context/LiveFeedContext';
import { Cpu, TrendingUp, AlertCircle, CheckCircle, ChevronRight, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const { colores } = brandingConfig;

export interface DeptKPI {
  label: string;
  value: string;
  delta?: string;
  deltaUp?: boolean;
  color?: string;
}

export interface DeptAgent {
  name: string;
  role: string;
  status: 'online' | 'processing' | 'idle';
  actionsToday: number;
}

export interface DeptAction {
  text: string;
  priority: 'alta' | 'media' | 'baja';
  assignee?: string;
}

interface DepartamentoShellProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  color?: string;
  kpis: DeptKPI[];
  agent: DeptAgent;
  actions: DeptAction[];
  recommendation: string;
  children: React.ReactNode;
}

// Animated counter hook
function useCountUp(to: number, duration = 800) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setV(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [to, duration]);
  return v;
}

const KPICard: React.FC<{ kpi: DeptKPI; idx: number }> = ({ kpi, idx }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80 + idx * 60); return () => clearTimeout(t); }, [idx]);
  const accent = kpi.color ?? colores.primario;
  return (
    <div style={{
      background: colores.fondoSecundario,
      border: `1px solid ${colores.borde}`,
      borderRadius: '14px',
      padding: '14px 16px',
      position: 'relative', overflow: 'hidden',
      opacity: mounted ? 1 : 0,
      transform: mounted ? 'translateY(0)' : 'translateY(8px)',
      transition: `opacity 0.4s ease ${idx * 60}ms, transform 0.4s ease ${idx * 60}ms`,
    }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: accent }} />
      <p style={{ margin: 0, fontSize: '10px', color: colores.textoMedio, textTransform: 'uppercase', letterSpacing: '0.4px', fontWeight: 600 }}>{kpi.label}</p>
      <p style={{ margin: '4px 0 0', fontSize: '24px', fontWeight: 800, color: colores.textoClaro, fontVariantNumeric: 'tabular-nums' }}>{kpi.value}</p>
      {kpi.delta && (
        <p style={{ margin: '2px 0 0', fontSize: '12px', fontWeight: 600, color: kpi.deltaUp !== false ? '#10B981' : '#EF4444' }}>
          {kpi.deltaUp !== false ? '▲' : '▼'} {kpi.delta}
        </p>
      )}
    </div>
  );
};

export const DepartamentoShell: React.FC<DepartamentoShellProps> = ({
  icon: Icon, title, subtitle, color = colores.primario,
  kpis, agent, actions, recommendation, children,
}) => {
  const { events } = useLiveFeed();
  const [doneActions, setDoneActions] = useState<Set<number>>(new Set());
  const recentEvents = events.slice(0, 5);

  const toggleAction = (i: number) => {
    setDoneActions(prev => {
      const n = new Set(prev);
      n.has(i) ? n.delete(i) : n.add(i);
      return n;
    });
  };

  const priorityColor = (p: string) =>
    p === 'alta' ? '#EF4444' : p === 'media' ? '#F59E0B' : '#10B981';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(120deg, ${color}CC 0%, ${color} 60%, ${color}BB 100%)`,
        borderRadius: '20px',
        padding: '20px 24px',
        color: '#fff',
        position: 'relative', overflow: 'hidden',
        boxShadow: `0 10px 28px ${color}40`,
      }}>
        <div style={{ position: 'absolute', right: '-30px', top: '-30px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', position: 'relative' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, backdropFilter: 'blur(4px)' }}>
            <Icon size={26} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0 }}>{title}</h1>
            <p style={{ fontSize: '13px', margin: '2px 0 0', opacity: 0.85 }}>{subtitle}</p>
          </div>
          {/* Agent badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '7px',
            padding: '8px 14px', borderRadius: '20px',
            background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(4px)',
          }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: agent.status === 'online' ? '#10B981' : '#F59E0B', animation: 'deptPulse 1.5s infinite' }} />
            <span style={{ fontSize: '12px', fontWeight: 700 }}>{agent.name}</span>
            <span style={{ fontSize: '11px', opacity: 0.8 }}>{agent.role}</span>
          </div>
        </div>
      </div>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
        {kpis.map((k, i) => <KPICard key={k.label} kpi={k} idx={i} />)}
      </div>

      {/* Main content + sidebar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '20px', alignItems: 'start' }}>
        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {children}

          {/* Acciones IA */}
          <div style={{
            background: colores.fondoSecundario,
            border: `1px solid ${colores.borde}`,
            borderRadius: '16px', padding: '18px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Cpu size={16} color={color} />
              <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: colores.textoClaro }}>Copiloto IA — Acciones recomendadas</h3>
              <span style={{ marginLeft: 'auto', fontSize: '11px', color: colores.textoMedio, fontVariantNumeric: 'tabular-nums' }}>
                {agent.actionsToday} acciones hoy
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {actions.map((a, i) => {
                const done = doneActions.has(i);
                return (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '10px 14px', borderRadius: '12px',
                    borderLeft: `3px solid ${done ? '#10B981' : priorityColor(a.priority)}`,
                    background: done ? '#10B98108' : `${priorityColor(a.priority)}08`,
                    opacity: done ? 0.6 : 1, transition: 'opacity 0.3s',
                  }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: colores.textoClaro, textDecoration: done ? 'line-through' : 'none' }}>{a.text}</p>
                      {a.assignee && <p style={{ margin: '2px 0 0', fontSize: '11px', color: colores.textoMedio }}>→ {a.assignee} · prioridad {a.priority}</p>}
                    </div>
                    <button
                      onClick={() => toggleAction(i)}
                      style={{
                        width: '30px', height: '30px', borderRadius: '50%', flexShrink: 0,
                        border: `2px solid ${done ? '#10B981' : colores.borde}`,
                        background: done ? '#10B981' : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', transition: 'all 0.2s',
                      }}
                    >
                      <CheckCircle size={14} color={done ? '#fff' : colores.textoOscuro} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Recommendation */}
          <div style={{
            background: `${color}10`,
            border: `1px solid ${color}30`,
            borderRadius: '14px', padding: '14px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Zap size={14} color={color} />
              <span style={{ fontSize: '12px', fontWeight: 700, color }}>Recomendación MAYIA</span>
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: colores.textoClaro, lineHeight: 1.6 }}>{recommendation}</p>
          </div>

          {/* Live feed */}
          <div style={{
            background: colores.fondoSecundario,
            border: `1px solid ${colores.borde}`,
            borderRadius: '14px', padding: '14px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', animation: 'deptPulse 1.5s infinite' }} />
              <span style={{ fontSize: '12px', fontWeight: 700, color: colores.textoClaro }}>Actividad reciente</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
              {recentEvents.length > 0 ? recentEvents.map(e => (
                <div key={e.id} style={{ padding: '7px 9px', background: colores.fondoTerciario, borderRadius: '8px' }}>
                  <p style={{ margin: 0, fontSize: '11px', fontWeight: 600, color: colores.textoClaro }}>{e.title}</p>
                  <p style={{ margin: '2px 0 0', fontSize: '10px', color: colores.textoMedio }}>{e.time}</p>
                </div>
              )) : (
                <p style={{ margin: 0, fontSize: '11px', color: colores.textoMedio, textAlign: 'center', padding: '12px 0' }}>Esperando actividad...</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes deptPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }
      `}</style>
    </div>
  );
};
