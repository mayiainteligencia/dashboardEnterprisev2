import React, { useState, useEffect } from 'react';
import { brandingConfig } from '../config/branding';
import { Cpu, MessageCircle, Activity, Shield, Wifi, WifiOff } from 'lucide-react';
import { useLiveFeed } from '../context/LiveFeedContext';

const { colores } = brandingConfig;

interface Agent {
  id: string;
  name: string;
  role: string;
  icon: typeof Cpu;
  color: string;
  actionsToday: number;
}

const AGENTS: Agent[] = [
  { id: 'mayia',    name: 'MAYIA',        role: 'Chat IA',        icon: Cpu,            color: '#d4000a', actionsToday: 0 },
  { id: 'whatsapp', name: 'WA Agent',     role: 'Calificador',    icon: MessageCircle,  color: '#10B981', actionsToday: 0 },
  { id: 'copiloto', name: 'Copiloto',     role: 'Decisiones',     icon: Activity,       color: '#8B5CF6', actionsToday: 0 },
  { id: 'monitor',  name: 'Monitor',      role: 'Redes Sociales', icon: Shield,         color: '#F59E0B', actionsToday: 0 },
];

export const AgentStatusBar: React.FC = () => {
  const { latestEvent } = useLiveFeed();
  const [agents, setAgents] = useState(AGENTS.map(a => ({ ...a, actionsToday: Math.floor(Math.random() * 40 + 10) })));
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    if (!latestEvent) return;
    // Simular que un agente procesa el evento
    const agentIds = ['mayia', 'whatsapp', 'copiloto', 'monitor'];
    const pid = agentIds[Math.floor(Math.random() * agentIds.length)];
    setProcessingId(pid);
    setAgents(prev => prev.map(a => a.id === pid ? { ...a, actionsToday: a.actionsToday + 1 } : a));
    const t = setTimeout(() => setProcessingId(null), 2500);
    return () => clearTimeout(t);
  }, [latestEvent]);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 20px',
      background: 'rgba(0,0,0,0.03)',
      borderBottom: `1px solid ${colores.borde}`,
      overflowX: 'auto',
      flexShrink: 0,
    }}>
      {/* Label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0, marginRight: '8px' }}>
        <div style={{
          width: '7px', height: '7px', borderRadius: '50%',
          background: '#10B981',
          boxShadow: '0 0 8px #10B98160',
          animation: 'agentPulse 2s infinite',
        }} />
        <span style={{ fontSize: '11px', fontWeight: 700, color: colores.textoMedio, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Agentes IA
        </span>
      </div>

      {/* Agent pills */}
      {agents.map(agent => {
        const Icon = agent.icon;
        const isProcessing = processingId === agent.id;
        return (
          <div
            key={agent.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px 4px 6px',
              borderRadius: '20px',
              border: `1px solid ${isProcessing ? agent.color : colores.borde}`,
              background: isProcessing ? `${agent.color}12` : colores.fondoTerciario,
              transition: 'all 0.3s ease',
              flexShrink: 0,
              cursor: 'default',
            }}
          >
            <div style={{
              width: '24px', height: '24px', borderRadius: '50%',
              background: `${agent.color}20`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: isProcessing ? 'agentSpin 1s linear infinite' : 'none',
            }}>
              <Icon size={13} color={agent.color} />
            </div>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: colores.textoClaro }}>{agent.name}</span>
              <span style={{ fontSize: '10px', color: colores.textoMedio, marginLeft: '4px' }}>
                {isProcessing ? 'procesando...' : `${agent.actionsToday} acciones`}
              </span>
            </div>
            <div style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: isProcessing ? '#F59E0B' : '#10B981',
              marginLeft: '2px',
              animation: 'agentPulse 1.5s infinite',
            }} />
          </div>
        );
      })}

      {/* Online indicator */}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
        <Wifi size={13} color="#10B981" />
        <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>Sistema activo</span>
      </div>

      <style>{`
        @keyframes agentPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
        @keyframes agentSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
