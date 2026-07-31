import React, { useState } from 'react';
import { Users, UserCheck, Briefcase, Heart, Star } from 'lucide-react';
import { brandingConfig } from '../../config/branding';
import { DepartamentoShell } from './DepartamentoShell';

const { colores } = brandingConfig;

const cards = [
  { id: 1, titulo: 'Asesor en Recursos Humanos', descripcion: 'IA especializada en gestión de personal y políticas laborales', icon: Users },
  { id: 2, titulo: 'Asesor en Seguridad Laboral', descripcion: 'Cumplimiento normativo y prevención de riesgos', icon: Heart },
  { id: 3, titulo: 'Empleados Digitales', descripcion: 'Agentes IA que piensan, actúan y evolucionan', icon: Star },
  { id: 4, titulo: 'Reclutamiento Inteligente', descripcion: 'Selección automatizada de talento con IA', icon: UserCheck },
  { id: 5, titulo: 'Evaluación de Desempeño', descripcion: 'Análisis continuo y métricas de productividad', icon: Briefcase },
];

export const RecursosHumanos: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <DepartamentoShell
      icon={Users}
      title="Recursos Humanos"
      subtitle="Gestión inteligente de personal y capital humano"
      color="#d4000a"
      kpis={[
        { label: 'Total empleados', value: '85', delta: '+4 este mes', deltaUp: true, color: '#d4000a' },
        { label: 'Satisfacción', value: '87%', delta: '+3%', deltaUp: true, color: '#10B981' },
        { label: 'Vacantes activas', value: '5', delta: '2 urgentes', color: '#F59E0B' },
        { label: 'Rotación mensual', value: '1.8%', delta: 'dentro de meta', deltaUp: true, color: '#8B5CF6' },
      ]}
      agent={{ name: 'RRHH Agent', role: 'Gestión de talento', status: 'online', actionsToday: 23 }}
      actions={[
        { text: 'Revisar 3 solicitudes de vacaciones pendientes', priority: 'alta', assignee: 'HR Manager' },
        { text: 'Publicar vacante: Asesor de Ventas de Blindaje', priority: 'alta', assignee: 'Reclutamiento' },
        { text: 'Enviar encuesta de clima laboral trimestral', priority: 'media', assignee: 'RRHH Agent' },
        { text: 'Agendar evaluaciones de desempeño Q2', priority: 'media', assignee: 'Managers' },
      ]}
      recommendation="El índice de satisfacción subió 3% este trimestre. Sugiero reforzar el programa de bonos por desempeño en el equipo comercial — hay correlación directa con los cierres de Paquete FULL y Paquete ULTRA."
    >
      {/* Agent cards */}
      <div style={{
        background: colores.fondoSecundario,
        border: `1px solid ${colores.borde}`,
        borderRadius: '16px', padding: '18px',
      }}>
        <h3 style={{ margin: '0 0 14px', fontSize: '14px', fontWeight: 800, color: colores.textoClaro }}>Agentes IA disponibles</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' }}>
          {cards.map(card => {
            const Icon = card.icon;
            const isHov = hovered === card.id;
            return (
              <div
                key={card.id}
                onMouseEnter={() => setHovered(card.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  padding: '16px',
                  background: isHov ? '#d4000a10' : colores.fondoTerciario,
                  border: `1px solid ${isHov ? '#d4000a50' : colores.borde}`,
                  borderRadius: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
                  transform: isHov ? 'translateY(-3px)' : 'translateY(0)',
                  boxShadow: isHov ? '0 8px 20px #d4000a25' : 'none',
                  textAlign: 'center',
                }}
              >
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: '#d4000a15',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 10px',
                }}>
                  <Icon size={20} color="#d4000a" />
                </div>
                <p style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: colores.textoClaro, lineHeight: 1.3 }}>{card.titulo}</p>
                <p style={{ margin: '4px 0 0', fontSize: '10px', color: colores.textoMedio, lineHeight: 1.4 }}>{card.descripcion}</p>
              </div>
            );
          })}
        </div>
      </div>
    </DepartamentoShell>
  );
};
