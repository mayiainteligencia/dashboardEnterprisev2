import React, { useState, useEffect } from 'react';
import { Cpu, CheckCircle2, Activity, Terminal, Shield, Zap, Users, BarChart3, Clock, AlertTriangle, ArrowUpRight, X, Play, Pause, Check, Download } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';
import { AGENTES_IA_LIST } from '../../../risko/riskoData';

export const GobiernoAgentesModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [mounted, setMounted] = useState(false);
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedAgentModal, setSelectedAgentModal] = useState<any | null>(null);
  const [swarmPaused, setSwarmPaused] = useState(false);

  const [hitlEvents, setHitlEvents] = useState([
    { id: '1', time: '14:23', agent: 'Orquestador (ID-900)', action: 'Reasignó ticket urgente de Mapfre a Suscriptor Sr.', approver: 'Auto (Regla 4)', status: 'Aprobado' },
    { id: '2', time: '12:45', agent: 'IA Legal (ID-105)', action: 'Pausó emisión. Detectó exclusión ambigua en póliza.', approver: 'HITL: Juan P.', status: 'Pendiente' },
    { id: '3', time: '11:10', agent: 'Agente Suscripción (ID-203)', action: 'Aprobó cotización estándar con score 32/100.', approver: 'Auto (Conf: 98%)', status: 'Aprobado' },
    { id: '4', time: '09:05', agent: 'Crawler Docs (ID-401)', action: 'Extracción completada de 15 PDFs estructurales.', approver: 'En progreso', status: 'Aprobado' }
  ]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 150);
    return () => clearTimeout(t);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleSwarm = () => {
    setSwarmPaused(prev => !prev);
    showToast(!swarmPaused ? '⏸️ Enjambre de 16 Agentes IA puesto en pausa de supervisión.' : '▶️ Enjambre de 16 Agentes IA reanudado en ejecución paralela.');
  };

  const handleApproveHitl = (id: string, agent: string) => {
    setHitlEvents(prev => prev.map(evt => evt.id === id ? { ...evt, status: 'Aprobado', approver: 'Aprobado por Usuario' } : evt));
    showToast(`✓ Decisión del agente ${agent} aprobada por Human-in-the-Loop.`);
  };

  const handleRejectHitl = (id: string, agent: string) => {
    setHitlEvents(prev => prev.map(evt => evt.id === id ? { ...evt, status: 'Rechazado', approver: 'Rechazado por Usuario' } : evt));
    showToast(`✗ Decisión del agente ${agent} rechazada. Tarea retornada a cola de revisión.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '28px', backgroundColor: '#FFFFFF', minHeight: '100vh', opacity: mounted ? 1 : 0, transition: 'opacity 0.4s ease', position: 'relative' }}>
      
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#0F172A',
          color: '#FFFFFF',
          padding: '14px 20px',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
          fontSize: '13px',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 9999,
          animation: 'fadeSlideUp 0.3s ease both'
        }}>
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0 }}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${colores.borde}`, paddingBottom: '16px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ padding: '6px', borderRadius: '10px', backgroundColor: '#EFF6FF', display: 'inline-flex' }}>
              <Cpu size={24} color={colores.primario} />
            </span>
            Gobierno de IA &amp; Orquestador de Agentes (16/16)
          </h1>
          <p style={{ margin: '4px 0 0', color: colores.textoOscuro, fontSize: '13px' }}>
            Dashboard 16 · Fuerza de trabajo digital, versiones de prompts/modelos, trazabilidad y aprobación Human-in-the-Loop
          </p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={handleToggleSwarm}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: `1px solid ${swarmPaused ? '#10B981' : '#F59E0B'}`,
              backgroundColor: swarmPaused ? '#ECFDF5' : '#FFFBEB',
              color: swarmPaused ? '#047857' : '#B45309',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {swarmPaused ? <Play size={14} /> : <Pause size={14} />}
            {swarmPaused ? 'Reanudar Enjambre' : 'Pausar Enjambre'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#ECFDF5', padding: '8px 16px', borderRadius: '20px', border: '1px solid #A7F3D0' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', animation: 'pulseGlow 2s infinite' }} />
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#065F46' }}>16/16 Agentes Operativos</span>
          </div>
        </div>
      </div>

      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {[
          { label: 'Agentes Activos', value: '16 / 16', icon: Users, color: colores.primario, bg: '#EFF6FF' },
          { label: 'Uptime Total Red', value: '99.1%', icon: Activity, color: '#10B981', bg: '#ECFDF5' },
          { label: 'Tareas Completadas Hoy', value: '842', icon: CheckCircle2, color: '#F59E0B', bg: '#FFFBEB' },
          { label: 'HITL Pendientes', value: `${hitlEvents.filter(e => e.status === 'Pendiente').length}`, icon: AlertTriangle, color: '#EF4444', bg: '#FEF2F2' },
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '14px',
              padding: '18px 20px',
              border: `1px solid ${colores.borde}`,
              borderTop: `3px solid ${kpi.color}`,
              boxShadow: '0 2px 6px rgba(15,23,42,0.04)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', color: colores.textoOscuro, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{kpi.label}</span>
                <div style={{ backgroundColor: kpi.bg, padding: '8px', borderRadius: '8px' }}>
                  <Icon size={16} color={kpi.color} />
                </div>
              </div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: colores.textoClaro, marginBottom: '2px' }}>{kpi.value}</div>
            </div>
          );
        })}
      </div>

      {/* Main Agent Grid (4x4) */}
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '800', color: colores.textoClaro }}>
          Matriz de Enjambre Agéntico Especializado
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
          {AGENTES_IA_LIST.map((agente) => {
            const isHov = hoveredAgent === agente.id;
            return (
              <div
                key={agente.id}
                onMouseEnter={() => setHoveredAgent(agente.id)}
                onMouseLeave={() => setHoveredAgent(null)}
                onClick={() => setSelectedAgentModal(agente)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '16px',
                  border: isHov ? '1px solid #2563EB' : '1px solid #E2E8F0',
                  borderLeft: '4px solid #2563EB',
                  boxShadow: isHov ? '0 6px 14px rgba(37,99,235,0.12)' : '0 2px 4px rgba(15,23,42,0.04)',
                  cursor: 'pointer',
                  transform: isHov ? 'translateY(-2px)' : 'none',
                  transition: 'all 0.15s ease',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span style={{ fontSize: '10px', fontWeight: '800', backgroundColor: '#EFF6FF', color: colores.primario, padding: '2px 6px', borderRadius: '4px' }}>
                    {agente.id}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', animation: 'pulseGlow 2s infinite' }} />
                    <span style={{ fontSize: '10px', fontWeight: '700', color: '#10B981' }}>{agente.estado}</span>
                  </div>
                </div>

                <div style={{ fontSize: '13px', fontWeight: '800', color: colores.textoClaro, marginBottom: '2px' }}>{agente.nombre}</div>
                <div style={{ fontSize: '11px', color: colores.textoOscuro, marginBottom: '12px', height: '28px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{agente.rol}</div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: '700', color: colores.textoOscuro, marginBottom: '4px' }}>
                    <span>Confianza IA</span>
                    <span style={{ color: colores.primario }}>{agente.confianza}%</span>
                  </div>
                  <div style={{ width: '100%', height: '4px', backgroundColor: '#F1F5F9', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: mounted ? agente.confianza + '%' : '0%', height: '100%', backgroundColor: colores.primario, borderRadius: '2px', transition: 'width 0.8s ease' }} />
                  </div>
                </div>

                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F1F5F9', paddingTop: '8px' }}>
                  <span style={{ fontSize: '10px', color: colores.textoOscuro }}>v2.4 · Gemini 3.5</span>
                  <span style={{ fontSize: '10px', fontWeight: '700', color: colores.primario, display: 'flex', alignItems: 'center', gap: '2px' }}>
                    Telemetría &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Human In The Loop Bitácora */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '24px', border: `1px solid ${colores.borde}`, boxShadow: '0 2px 8px rgba(15,23,42,0.04)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: colores.textoClaro }}>
              Bitácora de Eventos Human-in-the-Loop (HITL)
            </h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: colores.textoOscuro }}>
              Trazabilidad inmutable de decisiones autónomas y aprobaciones humanas
            </p>
          </div>
          <button
            onClick={() => showToast('📥 Bitácora de auditoría HITL exportada en formato JSON / CSV.')}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: `1px solid ${colores.borde}`,
              backgroundColor: '#F8FAFC',
              color: colores.textoClaro,
              fontSize: '11px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Download size={12} /> Exportar Bitácora
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {hitlEvents.map((evt) => (
            <div key={evt.id} style={{ padding: '12px 14px', borderRadius: '10px', backgroundColor: evt.status === 'Pendiente' ? '#FEF2F2' : '#F8FAFC', border: `1px solid ${evt.status === 'Pendiente' ? '#FECACA' : colores.borde}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Clock size={16} color={colores.textoOscuro} />
                <span style={{ fontSize: '12px', fontWeight: '800', color: colores.textoClaro }}>{evt.time}</span>
                <span style={{ fontSize: '12px', fontWeight: '700', color: colores.primario }}>{evt.agent}</span>
                <span style={{ fontSize: '12px', color: colores.textoClaro }}>{evt.action}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {evt.status === 'Pendiente' ? (
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => handleRejectHitl(evt.id, evt.agent)}
                      style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #EF4444', backgroundColor: '#FFFFFF', color: '#EF4444', fontSize: '10px', fontWeight: '800', cursor: 'pointer' }}
                    >
                      Rechazar
                    </button>
                    <button
                      onClick={() => handleApproveHitl(evt.id, evt.agent)}
                      style={{ padding: '4px 8px', borderRadius: '6px', border: 'none', backgroundColor: '#10B981', color: '#FFFFFF', fontSize: '10px', fontWeight: '800', cursor: 'pointer' }}
                    >
                      Aprobar
                    </button>
                  </div>
                ) : (
                  <span style={{ fontSize: '11px', fontWeight: '800', color: evt.status === 'Rechazado' ? '#EF4444' : '#10B981', backgroundColor: evt.status === 'Rechazado' ? '#FEF2F2' : '#ECFDF5', padding: '2px 8px', borderRadius: '6px' }}>
                    {evt.approver}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL TELEMETRÍA DE AGENTE */}
      {selectedAgentModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '20px',
          animation: 'fadeIn 0.2s ease both'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            maxWidth: '540px',
            width: '100%',
            padding: '28px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: `1px solid ${colores.borde}`,
            animation: 'fadeSlideUp 0.3s ease both'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '800', color: colores.primario, backgroundColor: '#EFF6FF', padding: '2px 8px', borderRadius: '6px' }}>
                  Agente ID: {selectedAgentModal.id} · {selectedAgentModal.estado}
                </span>
                <h3 style={{ margin: '6px 0 2px', fontSize: '18px', fontWeight: '800', color: colores.textoClaro }}>
                  {selectedAgentModal.nombre}
                </h3>
                <span style={{ fontSize: '12px', color: colores.textoOscuro }}>{selectedAgentModal.rol}</span>
              </div>
              <button
                onClick={() => setSelectedAgentModal(null)}
                style={{ background: 'none', border: 'none', color: colores.textoOscuro, cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px' }}>
              <div style={{ padding: '10px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: `1px solid ${colores.borde}` }}>
                <span style={{ fontSize: '10px', color: colores.textoOscuro, display: 'block' }}>Confianza Ponderada</span>
                <span style={{ fontSize: '16px', fontWeight: '800', color: colores.primario }}>{selectedAgentModal.confianza}%</span>
              </div>
              <div style={{ padding: '10px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: `1px solid ${colores.borde}` }}>
                <span style={{ fontSize: '10px', color: colores.textoOscuro, display: 'block' }}>Latencia Inferencia</span>
                <span style={{ fontSize: '16px', fontWeight: '800', color: '#10B981' }}>142 ms</span>
              </div>
              <div style={{ padding: '10px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: `1px solid ${colores.borde}` }}>
                <span style={{ fontSize: '10px', color: colores.textoOscuro, display: 'block' }}>Tokens / Min</span>
                <span style={{ fontSize: '16px', fontWeight: '800', color: '#F59E0B' }}>48.2k</span>
              </div>
            </div>

            <div style={{ fontFamily: 'monospace', fontSize: '11px', backgroundColor: '#0F172A', color: '#38BDF8', padding: '14px', borderRadius: '10px', maxHeight: '140px', overflowY: 'auto', marginBottom: '20px', lineHeight: 1.5 }}>
              <div>[SYSTEM_READY] Invocando pipeline neuronal de riesgos...</div>
              <div>[PROMPT_V2.4] Temperatura: 0.1 | Context Window: 1M Tokens</div>
              <div>[TASK_ACTIVE] Monitoreando telemetría de activos y recalculando AAL...</div>
              <div style={{ color: '#4ADE80' }}>[STATUS_OK] Verificación criptográfica SHA-256 completada.</div>
            </div>

            <button
              onClick={() => {
                showToast(`🔄 Agente ${selectedAgentModal.nombre} reinicializado y sincronizado.`);
                setSelectedAgentModal(null);
              }}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: colores.primario,
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Reinicializar y Purgar Contexto del Agente
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          50% { box-shadow: 0 0 0 5px rgba(16, 185, 129, 0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
