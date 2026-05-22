import React from 'react';
import { Bot, ArrowRight, Zap, AlertTriangle, TrendingUp, Shield, Server, HardDrive } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

interface RecomendacionesIAModuleProps {
  onNavigate?: (section: string) => void;
}

export const RecomendacionesIAModule: React.FC<RecomendacionesIAModuleProps> = ({ onNavigate }) => {
  const { colores } = brandingConfig;

  const recomendaciones = [
    {
      agente: 'NOC IA',
      icono: <Server size={14} color="white" />,
      color: colores.primario,
      prioridad: 'alta',
      titulo: 'Migrar carga del Rack A2 al B1',
      descripcion: 'Rack A2 al 92% de capacidad. Redistribuir 3 VMs al Rack B1 (64%) reduciría riesgo de sobrecalentamiento.',
      impacto: 'Reduce riesgo térmico 28%',
    },
    {
      agente: 'SOC IA',
      icono: <Shield size={14} color="white" />,
      color: colores.peligro,
      prioridad: 'critica',
      titulo: 'Actualizar reglas de firewall zona norte',
      descripcion: '3 intentos de acceso no autorizado detectados. Se recomienda actualizar reglas y activar MFA en accesos administrativos.',
      impacto: 'Cierra 2 vulnerabilidades',
    },
    {
      agente: 'DRP IA',
      icono: <HardDrive size={14} color="white" />,
      color: colores.exito,
      prioridad: 'media',
      titulo: 'Programar simulacro de recuperación',
      descripcion: 'Último simulacro hace 15 días. Se recomienda ejecutar prueba de failover en sitio alterno esta semana.',
      impacto: 'Mejora RTO estimado en 22%',
    },
    {
      agente: 'Data Value',
      icono: <TrendingUp size={14} color="white" />,
      color: '#8B5CF6',
      prioridad: 'media',
      titulo: 'Activar modelo predictivo de demanda energética',
      descripcion: 'Se detectó patrón de consumo estacional. Un modelo de predicción podría optimizar costos energéticos en 18%.',
      impacto: 'Ahorro estimado $420K/año',
    },
  ];

  const prioridadColor: Record<string, string> = {
    critica: colores.peligro,
    alta: colores.advertencia,
    media: colores.primario,
  };

  const prioridadLabel: Record<string, string> = {
    critica: 'Crítica',
    alta: 'Alta',
    media: 'Media',
  };

  return (
    <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '24px', border: `1px solid ${colores.borde}`, padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', height: '100%' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: colores.gradientePrimario, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Bot size={22} color="white" />
          </div>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: colores.textoClaro, margin: 0 }}>Recomendaciones IA</h3>
            <p style={{ fontSize: '10px', color: colores.textoMedio, margin: 0 }}>
              Acciones sugeridas por agentes · <span style={{ color: colores.acento, fontWeight: 600 }}>{recomendaciones.length} pendientes</span>
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', backgroundColor: `${colores.exito}15`, border: `1px solid ${colores.exito}30`, borderRadius: '20px', padding: '4px 10px' }}>
          <Zap size={10} color={colores.exito} />
          <span style={{ fontSize: '10px', color: colores.exito, fontWeight: '700' }}>Auto-análisis</span>
        </div>
      </div>

      {/* Lista de recomendaciones */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        {recomendaciones.map(({ agente, icono, color, prioridad, titulo, descripcion, impacto }) => (
          <div key={titulo} style={{ backgroundColor: colores.fondoTerciario, borderRadius: '16px', padding: '14px', borderLeft: `4px solid ${color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '26px', height: '26px', borderRadius: '8px', backgroundColor: color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {icono}
                </div>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: '700', color: colores.textoClaro, margin: 0, lineHeight: 1.2 }}>{titulo}</p>
                  <p style={{ fontSize: '9px', color: colores.textoMedio, margin: '2px 0 0 0' }}>Agente: {agente}</p>
                </div>
              </div>
              <span style={{ fontSize: '9px', fontWeight: '700', color: prioridadColor[prioridad], backgroundColor: `${prioridadColor[prioridad]}15`, padding: '3px 8px', borderRadius: '20px', flexShrink: 0 }}>
                <AlertTriangle size={8} style={{ verticalAlign: 'middle', marginRight: '3px' }} />
                {prioridadLabel[prioridad]}
              </span>
            </div>
            <p style={{ fontSize: '11px', color: colores.textoMedio, margin: '0 0 8px 0', lineHeight: 1.5 }}>{descripcion}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: `${colores.exito}10`, border: `1px solid ${colores.exito}25`, borderRadius: '8px', padding: '6px 10px' }}>
              <TrendingUp size={10} color={colores.exito} />
              <span style={{ fontSize: '10px', color: colores.exito, fontWeight: '600' }}>{impacto}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={() => onNavigate?.('decisionRoom')}
        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: 'none', background: colores.gradientePrimario, color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'opacity 0.2s', marginTop: 'auto' }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        Solicitar diagnóstico de IA <ArrowRight size={16} />
      </button>
    </div>
  );
};
