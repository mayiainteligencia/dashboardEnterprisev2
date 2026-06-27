import React, { useState } from 'react';
import { BookOpen, Play, Trophy, Zap } from 'lucide-react';
import { brandingConfig } from '../../config/branding';
import { DepartamentoShell } from './DepartamentoShell';

const { colores } = brandingConfig;

const courses = [
  { title: 'Técnicas de cierre para Nexora', progress: 78, enrolled: 34, color: '#CC0000' },
  { title: 'Manejo de objeciones de crédito', progress: 52, enrolled: 28, color: '#8B5CF6' },
  { title: 'WhatsApp IA — Protocolo de respuesta', progress: 91, enrolled: 41, color: '#10B981' },
  { title: 'CRM avanzado: gestión de leads', progress: 35, enrolled: 19, color: '#F59E0B' },
];

export const Academia: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <DepartamentoShell
      icon={BookOpen}
      title="Academia de Ventas"
      subtitle="Capacitación continua con IA personalizada"
      color="#8B5CF6"
      kpis={[
        { label: 'Cursos activos', value: '4', delta: '+2 nuevos', deltaUp: true, color: '#8B5CF6' },
        { label: 'Empleados capacitados', value: '41', delta: '72% del equipo', deltaUp: true, color: '#10B981' },
        { label: 'Completados este mes', value: '13', delta: '+8 vs anterior', deltaUp: true, color: '#CC0000' },
        { label: 'Score promedio', value: '84%', delta: '+6 pts', deltaUp: true, color: '#F59E0B' },
      ]}
      agent={{ name: 'Academia IA', role: 'Coach personalizado', status: 'online', actionsToday: 29 }}
      actions={[
        { text: 'Asignar curso Nexora a 8 asesores nuevos', priority: 'alta', assignee: 'Academia IA' },
        { text: 'Recordar a Tomás H. el módulo de cierre pendiente', priority: 'alta', assignee: 'Coach IA' },
        { text: 'Publicar nuevo módulo: Kestra — Tecnología híbrida', priority: 'media', assignee: 'Contenidos' },
        { text: 'Generar certificados Q1 completados', priority: 'baja', assignee: 'RRHH' },
      ]}
      recommendation="Los vendedores con > 2 cursos completados tienen 34% más conversiones. Raúl S. tiene 5 seguimientos vencidos y aún no completa el módulo de gestión de leads. Sugiero intervención del coach IA esta semana."
    >
      <div style={{
        background: colores.fondoSecundario,
        border: `1px solid ${colores.borde}`,
        borderRadius: '16px', padding: '18px',
      }}>
        <h3 style={{ margin: '0 0 14px', fontSize: '14px', fontWeight: 800, color: colores.textoClaro }}>Cursos en progreso</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {courses.map((c, i) => (
            <div
              key={c.title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: '14px', background: hovered === i ? `${c.color}08` : colores.fondoTerciario,
                border: `1px solid ${hovered === i ? c.color + '40' : colores.borde}`,
                borderRadius: '12px', cursor: 'pointer',
                transition: 'all 0.2s', transform: hovered === i ? 'translateX(4px)' : 'translateX(0)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: colores.textoClaro }}>{c.title}</span>
                <span style={{ fontSize: '11px', color: colores.textoMedio }}>{c.enrolled} inscritos</span>
              </div>
              <div style={{ height: '6px', background: colores.fondoPrincipal, borderRadius: '4px', overflow: 'hidden', marginBottom: '4px' }}>
                <div style={{ width: `${c.progress}%`, height: '100%', background: c.color, borderRadius: '4px', transition: 'width 0.8s ease' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: colores.textoMedio }}>Progreso</span>
                <span style={{ fontSize: '12px', fontWeight: 800, color: c.color }}>{c.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DepartamentoShell>
  );
};
