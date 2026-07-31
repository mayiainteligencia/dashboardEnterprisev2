import React, { useState } from 'react';
import { Code2, Terminal, Brain, BarChart, Zap, Bot } from 'lucide-react';
import { brandingConfig } from '../../config/branding';
import { DepartamentoShell } from './DepartamentoShell';

const { colores } = brandingConfig;

const tools = [
  { id: 1, title: 'API Testing', desc: 'Pruebas de integración y endpoints', icon: Terminal, color: '#10B981' },
  { id: 2, title: 'Code Sandbox', desc: 'Entorno de desarrollo experimental', icon: Code2, color: '#3B82F6' },
  { id: 3, title: 'IA Generativa', desc: 'Modelos de lenguaje y prompts', icon: Brain, color: '#8B5CF6' },
  { id: 4, title: 'Visualización', desc: 'Gráficos y dashboards interactivos', icon: BarChart, color: '#F59E0B' },
  { id: 5, title: 'Automatización', desc: 'Scripts y flujos de trabajo', icon: Zap, color: '#EF4444' },
  { id: 6, title: 'Agentes Custom', desc: 'Construye tu propio agente IA', icon: Bot, color: '#d4000a' },
];

export const Playground: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [activeConsole, setActiveConsole] = useState(false);
  const [consoleText, setConsoleText] = useState('');

  const simulateQuery = () => {
    setActiveConsole(true);
    setConsoleText('');
    const steps = [
      '> Iniciando MAYIA Agent...',
      '> Conectando a Google Gemini API...',
      '> Cargando contexto de ventas...',
      '> Analizando datos del CRM...',
      '> Respuesta lista: Hay 3 leads de alta intención sin seguimiento. ¿Deseas asignarlos automáticamente?',
    ];
    let i = 0;
    const iv = setInterval(() => {
      if (i < steps.length) {
        setConsoleText(prev => prev + '\n' + steps[i]);
        i++;
      } else {
        clearInterval(iv);
      }
    }, 600);
  };

  return (
    <DepartamentoShell
      icon={Code2}
      title="Playground IA"
      subtitle="Zona de pruebas, desarrollo experimental y agentes custom"
      color="#06B6D4"
      kpis={[
        { label: 'Agentes disponibles', value: '6', delta: '2 en beta', deltaUp: true, color: '#06B6D4' },
        { label: 'API calls hoy', value: '1,840', delta: '+24%', deltaUp: true, color: '#8B5CF6' },
        { label: 'Tests activos', value: '12', delta: '100% ok', deltaUp: true, color: '#10B981' },
        { label: 'Latencia prom.', value: '380ms', delta: 'óptima', deltaUp: true, color: '#F59E0B' },
      ]}
      agent={{ name: 'Dev Agent', role: 'Testing & Debug', status: 'online', actionsToday: 64 }}
      actions={[
        { text: 'Actualizar agente WhatsApp a v2.3', priority: 'alta', assignee: 'Dev Agent' },
        { text: 'Probar integración Gemini con CRM Polanco', priority: 'alta', assignee: 'Ingeniería' },
        { text: 'Documentar API de Lead Scoring', priority: 'media', assignee: 'Dev Team' },
        { text: 'Deploy staging de nueva versión MAYIA', priority: 'baja', assignee: 'DevOps' },
      ]}
      recommendation="El API de Lead Scoring tiene latencia de 380ms promedio — dentro del SLA. El agente WhatsApp v2.3 está listo para producción y mejora la precisión de calificación un 14%. Recomiendo deploy esta semana."
    >
      {/* Tool grid */}
      <div style={{
        background: colores.fondoSecundario,
        border: `1px solid ${colores.borde}`,
        borderRadius: '16px', padding: '18px',
      }}>
        <h3 style={{ margin: '0 0 14px', fontSize: '14px', fontWeight: 800, color: colores.textoClaro }}>Herramientas disponibles</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' }}>
          {tools.map(tool => {
            const Icon = tool.icon;
            const isHov = hovered === tool.id;
            return (
              <div
                key={tool.id}
                onMouseEnter={() => setHovered(tool.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  padding: '16px',
                  background: isHov ? `${tool.color}10` : colores.fondoTerciario,
                  border: `1px solid ${isHov ? tool.color + '50' : colores.borde}`,
                  borderRadius: '14px', cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
                  transform: isHov ? 'translateY(-3px)' : 'translateY(0)',
                  boxShadow: isHov ? `0 8px 20px ${tool.color}25` : 'none',
                  textAlign: 'center',
                }}
              >
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: `${tool.color}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 10px',
                }}>
                  <Icon size={20} color={tool.color} />
                </div>
                <p style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: colores.textoClaro }}>{tool.title}</p>
                <p style={{ margin: '4px 0 0', fontSize: '10px', color: colores.textoMedio }}>{tool.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mini console */}
      <div style={{
        background: '#0A0A0A',
        border: `1px solid ${colores.borde}`,
        borderRadius: '16px', padding: '16px',
        fontFamily: 'monospace',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            {['#FF5F57', '#FEBC2E', '#28C840'].map(c => (
              <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />
            ))}
          </div>
          <span style={{ fontSize: '11px', color: '#666', marginLeft: '8px' }}>MAYIA Console</span>
          <button
            onClick={simulateQuery}
            style={{
              marginLeft: 'auto', padding: '4px 12px', borderRadius: '8px',
              border: 'none', background: '#d4000a', color: '#fff',
              fontSize: '11px', fontWeight: 700, cursor: 'pointer',
            }}
          >
            ▶ Simular query
          </button>
        </div>
        <div style={{
          minHeight: '100px', padding: '8px',
          background: '#111', borderRadius: '8px',
          fontSize: '12px', color: '#00FF41',
          whiteSpace: 'pre-wrap', lineHeight: 1.6,
        }}>
          {consoleText || '> Listo para ejecutar. Haz clic en "Simular query".'}
        </div>
      </div>
    </DepartamentoShell>
  );
};
