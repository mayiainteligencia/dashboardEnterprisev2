import React, { useState } from 'react';
import { 
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  BarChart3, LineChart, PieChart as PieIcon, TrendingUp, Target, 
  Activity, Calendar, Award, Rocket, Clock, Code, FileText, Bot, 
  Sparkles, ChevronRight, Eye, Users
} from 'lucide-react';
import { WAI_BRAND_CONFIG } from '../../../config/branding';

// Datos para Gráfico 1: Participación en Programas a lo largo del tiempo
const PARTICIPACION_DATA = [
  { mes: 'Ene', participantes: 120, mentorias: 80 },
  { mes: 'Feb', participantes: 180, mentorias: 110 },
  { mes: 'Mar', participantes: 240, mentorias: 150 },
  { mes: 'Abr', participantes: 310, mentorias: 190 },
  { mes: 'May', participantes: 450, mentorias: 280 },
  { mes: 'Jun', participantes: 680, mentorias: 420 },
];

// Datos para Gráfico 2: Satisfacción de Usuarios por Programa (NPS)
const SATISFACCION_DATA = [
  { name: 'WaiLEARN (Cursos)', value: 85, color: '#FFD700' },
  { name: 'WAIMentorship', value: 92, color: '#FF4081' },
  { name: 'WaiHackathon', value: 88, color: '#10B981' },
  { name: 'Networking Events', value: 78, color: '#3B82F6' },
];

// Datos para Gráfico 3: Progreso Profesional
const PROGRESO_DATA = [
  { area: 'Junior → Middle', pre: 120, post: 290 },
  { area: 'Middle → Senior', pre: 80, post: 195 },
  { area: 'Academia → Liderazgo Tech', pre: 40, post: 112 },
  { area: 'Fundadoras con Capital', pre: 12, post: 35 },
];

// Datos para Gráfico 4: Impacto de Hackatones
const HACKATHON_DATA = [
  { edicion: '2024 Reg.', proyectos: 18, equipos: 24 },
  { edicion: '2024 Nac.', proyectos: 34, equipos: 40 },
  { edicion: '2025 Reg.', proyectos: 48, equipos: 55 },
  { edicion: '2025 Nac.', proyectos: 82, equipos: 95 },
];

// Informes de IA
const AI_REPORTS = [
  { id: 1, tipo: "Pronóstico de Talento", titulo: "Aceleración del Liderazgo Femenino 2026-2027", desc: "La IA estima un crecimiento del 45% en la tasa de egresadas que logran roles Senior debido al programa WAIMentorship.", fecha: "Generado hace 10 min", score: "94% Confianza" },
  { id: 2, tipo: "Análisis de Satisfacción", titulo: "NPS del programa WAIMentorship alcanza récord histórico", desc: "El análisis de sentimiento en encuestas cualitativas revela un alto apego al emparejamiento por afinidad de habilidades.", fecha: "Generado hace 1 hora", score: "98% Confianza" },
  { id: 3, tipo: "Detección de Brecha", titulo: "Necesidad de Capital en Emprendimiento de IA", desc: "Los datos de hackatones muestran una fuerte tasa de creación de prototipos pero una brecha de fondeo pre-semilla del 60%.", fecha: "Generado hace 3 horas", score: "89% Confianza" }
];

export const MetricasImpactoProgramas: React.FC = () => {
  const theme = WAI_BRAND_CONFIG.theme;
  const [selectedReport, setSelectedReport] = useState<number | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {/* KPIs Clave */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        {[
          { label: "Programas Activos", value: "8", subtext: "Cursos, Hackatones, Mentorías", icon: Rocket, color: theme.secondary },
          { label: "Total de Participantes", value: "3,482", subtext: "+45% vs año anterior", icon: Users, color: "#8B5CF6" },
          { label: "Horas de Mentoría", value: "1,240 h", subtext: "150 parejas activas", icon: Clock, color: theme.accent },
          { label: "Proyectos Finalizados", value: "182", subtext: "Prototipos listos en Github", icon: Code, color: "#10B981" },
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div 
              key={idx}
              style={{
                backgroundColor: theme.cardBgGlass,
                border: `1.5px solid ${theme.border}`,
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                boxShadow: `0 8px 24px rgba(2, 11, 28, 0.3)`
              }}
            >
              <div 
                style={{ 
                  width: '46px', height: '46px', borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: `1px solid ${kpi.color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Icon size={18} color={kpi.color} />
              </div>
              <div>
                <span style={{ fontSize: '10px', color: theme.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{kpi.label}</span>
                <h3 style={{ fontSize: '13px', fontWeight: '900', color: '#FFFFFF', margin: '2px 0' }}>{kpi.value}</h3>
                <span style={{ fontSize: '9px', color: theme.textMuted }}>{kpi.subtext}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid de Gráficos */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '24px'
        }}
      >
        {/* Gráfico 1: Participación */}
        <div style={{ backgroundColor: theme.cardBgGlass, border: `1.5px solid ${theme.border}`, borderRadius: '20px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <LineChart size={18} color={theme.secondary} />
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#FFFFFF', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Participación en Programas y Mentorías</h4>
          </div>
          <div style={{ width: '100%', height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PARTICIPACION_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPart" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stop-color={theme.secondary} stopOpacity={0.4}/>
                    <stop offset="95%" stop-color={theme.secondary} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stop-color={theme.accent} stopOpacity={0.4}/>
                    <stop offset="95%" stop-color={theme.accent} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="mes" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0A192F', borderColor: theme.border, color: '#FFF', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                <Area type="monotone" name="Inscriptas" dataKey="participantes" stroke={theme.secondary} fillOpacity={1} fill="url(#colorPart)" strokeWidth={2} />
                <Area type="monotone" name="Sesiones de Mentoría" dataKey="mentorias" stroke={theme.accent} fillOpacity={1} fill="url(#colorMent)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico 2: NPS / Satisfacción */}
        <div style={{ backgroundColor: theme.cardBgGlass, border: `1.5px solid ${theme.border}`, borderRadius: '20px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <PieIcon size={18} color={theme.accent} />
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#FFFFFF', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Satisfacción Promedio por Programa</h4>
          </div>
          <div style={{ width: '100%', height: '260px', display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1, height: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={SATISFACCION_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {SATISFACCION_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}% CSAT`} contentStyle={{ backgroundColor: '#0A192F', borderColor: theme.border, color: '#FFF', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Leyenda a Medida */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {SATISFACCION_DATA.map((item) => (
                <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.color }} />
                  <span style={{ fontSize: '12px', color: '#FFFFFF', fontWeight: '600' }}>{item.value}%</span>
                  <span style={{ fontSize: '11px', color: theme.textSecondary }}>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gráfico 3: Progreso Profesional */}
        <div style={{ backgroundColor: theme.cardBgGlass, border: `1.5px solid ${theme.border}`, borderRadius: '20px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <BarChart3 size={18} color="#10B981" />
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#FFFFFF', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Progreso de Carrera Post-Programa</h4>
          </div>
          <div style={{ width: '100%', height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PROGRESO_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="area" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0A192F', borderColor: theme.border, color: '#FFF', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                <Bar name="Línea Base" dataKey="pre" fill="rgba(255, 255, 255, 0.15)" radius={[4, 4, 0, 0]} />
                <Bar name="Alcanzado Post-WAI" dataKey="post" fill={theme.secondary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico 4: Impacto Hackatones */}
        <div style={{ backgroundColor: theme.cardBgGlass, border: `1.5px solid ${theme.border}`, borderRadius: '20px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Activity size={18} color="#3B82F6" />
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#FFFFFF', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Impacto de Proyectos e Involucramiento</h4>
          </div>
          <div style={{ width: '100%', height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={HACKATHON_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="edicion" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0A192F', borderColor: theme.border, color: '#FFF', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                <Bar name="Equipos Formados" dataKey="equipos" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                <Bar name="Proyectos Desarrollados" dataKey="proyectos" fill={theme.accent} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* INFORMES Y RECOMENDACIONES DE IA */}
      <div 
        style={{
          backgroundColor: theme.cardBgGlass,
          border: `1.5px solid ${theme.border}`,
          borderRadius: '20px',
          padding: '24px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
          <Bot size={22} color={theme.secondary} />
          <h3 style={{ fontSize: '13px', fontWeight: '850', color: '#FFFFFF', margin: 0 }}>Informes y Hallazgos Generados por IA</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {AI_REPORTS.map((rep) => {
            const isSel = selectedReport === rep.id;
            return (
              <div 
                key={rep.id}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  border: isSel ? `1.5px solid ${theme.secondary}` : `1px solid rgba(255,255,255,0.04)`,
                  borderRadius: '12px',
                  padding: '16px 20px',
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '20px'
                }}
                onClick={() => setSelectedReport(isSel ? null : rep.id)}
                onMouseEnter={e => { if(!isSel) e.currentTarget.style.borderColor = 'rgba(255,192,0,0.3)'; }}
                onMouseLeave={e => { if(!isSel) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'; }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: theme.accent, backgroundColor: 'rgba(255, 64, 129, 0.1)', border: `1px solid ${theme.accent}`, borderRadius: '4px', padding: '2px 6px' }}>{rep.tipo}</span>
                    <span style={{ fontSize: '11px', color: theme.textMuted }}>{rep.fecha}</span>
                  </div>
                  <h5 style={{ fontSize: '14px', fontWeight: '750', color: '#FFFFFF', margin: '8px 0 4px 0' }}>{rep.titulo}</h5>
                  <p style={{ fontSize: '12px', color: theme.textSecondary, margin: 0, lineHeight: 1.4, height: isSel ? 'auto' : '1.4em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: isSel ? 'normal' : 'nowrap' }}>
                    {rep.desc}
                  </p>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
                  <span style={{ fontSize: '11px', color: theme.secondary, fontWeight: '700', backgroundColor: 'rgba(255,192,0,0.06)', borderRadius: '6px', padding: '4px 8px', border: `1px solid rgba(255,192,0,0.15)` }}>
                    {rep.score}
                  </span>
                  <ChevronRight size={16} color={theme.textMuted} style={{ transform: isSel ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
