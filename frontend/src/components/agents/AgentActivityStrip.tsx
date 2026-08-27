import React, { useEffect, useState } from 'react';
import { Bot, Activity, Radar } from 'lucide-react';
import { brandingConfig } from '../../config/branding';
import { agentesPorSeccion, useEventosAgentes } from '../../agents/agentBus';

const TAREAS = [
  'analizando frames…',
  'correlacionando huellas…',
  'comparando embeddings…',
  'rastreando réplicas…',
  'verificando firma…',
  'evaluando riesgo…',
  'sellando evidencia…',
];

interface Props {
  seccion: string;
  /** Compacto para columnas angostas. */
  compacto?: boolean;
}

// Tira de agentes "trabajando" en la sección visible. Todo mock: el estado
// rota en el cliente para dar sensación de proceso continuo.
export const AgentActivityStrip: React.FC<Props> = ({ seccion, compacto = false }) => {
  const { colores } = brandingConfig;
  const agentes = agentesPorSeccion(seccion);
  const eventos = useEventosAgentes();
  const [tick, setTick] = useState(0);
  const [analizados, setAnalizados] = useState(() => 1200 + Math.floor(Math.random() * 400));

  useEffect(() => {
    const id = setInterval(() => {
      setTick((t) => t + 1);
      setAnalizados((n) => n + 1 + Math.floor(Math.random() * 4));
    }, 2600);
    return () => clearInterval(id);
  }, []);

  const detecciones = eventos.filter((e) => e.seccion === seccion).length;

  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: compacto ? '12px' : '20px',
        flexWrap: 'wrap',
        padding: compacto ? '12px 14px' : '14px 20px',
        borderRadius: '16px',
        background: colores.fondoSecundario,
        border: `1px solid ${colores.borde}`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        <span style={{ position: 'relative', display: 'flex', width: '9px', height: '9px' }}>
          <span style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: colores.exito, animation: 'ag-ping 1.8s cubic-bezier(0,0,0.2,1) infinite',
          }} />
          <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: colores.exito }} />
        </span>
        <span style={{
          fontSize: '11px', fontWeight: 700, color: colores.textoClaro,
          textTransform: 'uppercase', letterSpacing: '0.07em',
        }}>
          {agentes.length} agentes activos
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: compacto ? '10px' : '18px', flexWrap: 'wrap', flex: 1, minWidth: 0 }}>
        {agentes.map((a, i) => (
          <div key={a} style={{ display: 'flex', alignItems: 'center', gap: '7px', minWidth: 0 }}>
            <div style={{
              width: '26px', height: '26px', borderRadius: '8px', flexShrink: 0,
              background: `${colores.acento}16`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Bot size={14} color={colores.acento} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{
                fontSize: '12px', fontWeight: 600, color: colores.textoClaro,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {a}
              </div>
              <div style={{ fontSize: '10.5px', color: colores.textoMedio, whiteSpace: 'nowrap' }}>
                {TAREAS[(tick + i * 2) % TAREAS.length]}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
        <Metrica icon={<Activity size={13} color={colores.textoMedio} />} valor={analizados.toLocaleString('es-MX')} label="analizados" />
        <Metrica icon={<Radar size={13} color={colores.peligro} />} valor={String(detecciones)} label="detecciones" />
      </div>

      <style>{`
        @keyframes ag-ping { 75%, 100% { transform: scale(2.4); opacity: 0; } }
      `}</style>
    </div>
  );
};

const Metrica: React.FC<{ icon: React.ReactNode; valor: string; label: string }> = ({ icon, valor, label }) => {
  const { colores } = brandingConfig;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      {icon}
      <div style={{ lineHeight: 1.1 }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: colores.textoClaro, fontVariantNumeric: 'tabular-nums' }}>{valor}</div>
        <div style={{ fontSize: '10px', color: colores.textoOscuro }}>{label}</div>
      </div>
    </div>
  );
};
