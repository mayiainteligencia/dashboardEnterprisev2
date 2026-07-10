// TermometroIA.tsx — Termómetro de la Industria de IA en México
// Sección 10 y 6.11 del lineamiento WAI México 2026
// Observatorio Nacional de Inteligencia Artificial

import React, { useState } from 'react';
import {
  BarChart, Bar,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend
} from 'recharts';
import { WAI_BRAND_CONFIG } from '../../../config/branding';

const { theme } = WAI_BRAND_CONFIG;

// ─── Tipos ────────────────────────────────────────────────────────────────────
interface Indicador {
  id: string;
  titulo: string;
  valor: string | number;
  unidad: string;
  descripcion: string;
  trend?: string;
  trendPositivo?: boolean;
  color: string;
  icon: string;
}

interface ChipProps {
  label: string;
}

// ─── Datos ─────────────────────────────────────────────────────────────────────
const INDICADORES: Indicador[] = [
  {
    id: 'conversacion',
    titulo: 'Índice de Conversación IA',
    valor: 78,
    unidad: '/100',
    descripcion: 'Volumen y calidad del diálogo nacional sobre IA en medios y redes',
    trend: '+12%',
    trendPositivo: true,
    color: theme.teal,
    icon: '💬',
  },
  {
    id: 'liderazgo',
    titulo: 'Liderazgo Femenino en IA',
    valor: '28%',
    unidad: 'mujeres',
    descripcion: 'Proporción femenina en el ecosistema IA; <15% en roles senior',
    trend: '+3%',
    trendPositivo: true,
    color: theme.accent,
    icon: '👩‍💻',
  },
  {
    id: 'adopcion',
    titulo: 'Índice de Adopción Empresarial',
    valor: '41%',
    unidad: 'empresas',
    descripcion: '41% de empresas con algún uso de IA; adopción profunda: 12%',
    trend: '+8%',
    trendPositivo: true,
    color: theme.secondary,
    icon: '🏢',
  },
  {
    id: 'talento',
    titulo: 'Talento y Formación',
    valor: '3,200',
    unidad: 'egresados 2024',
    descripcion: 'Egresados en IA en 2024; gap de demanda estimado en 45%',
    trend: 'Gap 45%',
    trendPositivo: false,
    color: '#8B5CF6',
    icon: '🎓',
  },
  {
    id: 'gobernanza',
    titulo: 'Confianza y Gobernanza',
    valor: 54,
    unidad: '/100',
    descripcion: 'Índice de confianza pública y marcos regulatorios de IA en México',
    trend: '+5pts',
    trendPositivo: true,
    color: '#F97316',
    icon: '🏛️',
  },
  {
    id: 'startups',
    titulo: 'Startups y Capital IA',
    valor: 87,
    unidad: 'startups activas',
    descripcion: '87 startups IA activas en México; $340M USD levantados en 2024',
    trend: '+22',
    trendPositivo: true,
    color: theme.primary,
    icon: '🚀',
  },
  {
    id: 'mapa',
    titulo: 'Ecosistema por Estado',
    valor: 'Top 5',
    unidad: 'estados',
    descripcion: 'CDMX, Jalisco, Nuevo León, Querétaro, Puebla como polos IA',
    trend: '5 hubs',
    trendPositivo: true,
    color: theme.teal,
    icon: '🗺️',
  },
];

const AREA_DATA = [
  { mes: 'Feb', conversacion: 52, mencion: 34 },
  { mes: 'Mar', conversacion: 61, mencion: 42 },
  { mes: 'Abr', conversacion: 58, mencion: 39 },
  { mes: 'May', conversacion: 70, mencion: 55 },
  { mes: 'Jun', conversacion: 74, mencion: 61 },
  { mes: 'Jul', conversacion: 78, mencion: 67 },
];

const RADAR_DATA = [
  { indicador: 'Conversación', wai: 78, benchmark: 62 },
  { indicador: 'Liderazgo F.', wai: 28, benchmark: 35 },
  { indicador: 'Adopción', wai: 41, benchmark: 55 },
  { indicador: 'Talento', wai: 55, benchmark: 60 },
  { indicador: 'Gobernanza', wai: 54, benchmark: 58 },
  { indicador: 'Startups', wai: 72, benchmark: 65 },
  { indicador: 'Regional', wai: 66, benchmark: 70 },
];

const SECTORES_DATA = [
  { sector: 'Fintech', adopcion: 68 },
  { sector: 'Retail', adopcion: 54 },
  { sector: 'Salud', adopcion: 48 },
  { sector: 'Manufactura', adopcion: 42 },
  { sector: 'Educación', adopcion: 35 },
];

const ESTADOS_TOP = [
  { estado: 'CDMX', score: 92, startups: 45, color: theme.secondary },
  { estado: 'Jalisco', score: 74, startups: 18, color: theme.teal },
  { estado: 'Nuevo León', score: 71, startups: 14, color: theme.accent },
  { estado: 'Querétaro', score: 58, startups: 6, color: '#8B5CF6' },
  { estado: 'Puebla', score: 44, startups: 4, color: '#F97316' },
];

const TEMAS: string[] = [
  '#EticaIA', '#LiderazgoFemenino', '#RegulacionIA',
  '#TalentoBrecha', '#StartupIA', '#GenAI', '#IA2025',
  '#InnovacionMX', '#DataScience', '#MLOps',
];

// ─── Sub-componentes ──────────────────────────────────────────────────────────
const Chip: React.FC<ChipProps> = ({ label }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-block',
        padding: '6px 14px',
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        background: hovered
          ? `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`
          : 'rgba(31,73,125,0.25)',
        border: `1px solid ${hovered ? theme.accent : 'rgba(255,192,0,0.25)'}`,
        color: hovered ? '#fff' : theme.secondary,
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? `0 4px 16px ${theme.glowAccent}` : 'none',
      }}
    >
      {label}
    </span>
  );
};

interface KPICardProps {
  label: string;
  value: string;
  sub?: string;
  color: string;
}

const KPICard: React.FC<KPICardProps> = ({ label, value, sub, color }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? `linear-gradient(135deg, ${theme.cardBg}, rgba(31,73,125,0.4))`
          : theme.cardBg,
        border: `1px solid ${hovered ? color : theme.border}`,
        borderRadius: 16,
        padding: '20px 24px',
        flex: 1,
        minWidth: 160,
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? `0 8px 32px rgba(0,0,0,0.4)` : theme.shadowCard,
        cursor: 'default',
      }}
    >
      <div style={{ fontSize: 28, fontWeight: 800, color, letterSpacing: -1 }}>{value}</div>
      <div style={{ fontSize: 12, color: theme.textSecondary, marginTop: 4, fontWeight: 600 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>{sub}</div>}
    </div>
  );
};

interface IndicadorCardProps {
  indicador: Indicador;
}

const IndicadorCard: React.FC<IndicadorCardProps> = ({ indicador }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? `linear-gradient(135deg, ${theme.cardBg}, rgba(31,73,125,0.35))`
          : theme.cardBg,
        border: `1px solid ${hovered ? indicador.color : theme.border}`,
        borderRadius: 16,
        padding: '20px',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-4px) scale(1.01)' : 'none',
        boxShadow: hovered ? `0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px ${indicador.color}30` : theme.shadowCard,
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow border top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, transparent, ${indicador.color}, transparent)`,
        opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
      }} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: 19 }}>{indicador.icon}</span>
        {indicador.trend && (
          <span style={{
            fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 8,
            background: indicador.trendPositivo ? 'rgba(16,185,129,0.15)' : 'rgba(255,64,129,0.15)',
            color: indicador.trendPositivo ? theme.teal : theme.accent,
            border: `1px solid ${indicador.trendPositivo ? 'rgba(16,185,129,0.3)' : 'rgba(255,64,129,0.3)'}`,
          }}>
            {indicador.trendPositivo ? '↑' : '↓'} {indicador.trend}
          </span>
        )}
      </div>
      <div style={{ fontSize: 13, fontWeight: 800, color: indicador.color, marginBottom: 2 }}>
        {indicador.valor}
        <span style={{ fontSize: 13, fontWeight: 500, color: theme.textMuted, marginLeft: 4 }}>{indicador.unidad}</span>
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: theme.textPrimary, marginBottom: 6 }}>
        {indicador.titulo}
      </div>
      <div style={{ fontSize: 11, color: theme.textSecondary, lineHeight: 1.5 }}>
        {indicador.descripcion}
      </div>
    </div>
  );
};

// ─── Componente Principal ──────────────────────────────────────────────────────
export const TermometroIA: React.FC = () => {
  const sectionStyle: React.CSSProperties = {
    background: theme.cardBg,
    border: `1px solid ${theme.border}`,
    borderRadius: 20,
    padding: 28,
    marginBottom: 24,
  };

  const sectionTitle: React.CSSProperties = {
    fontSize: 14,
    fontWeight: 700,
    color: theme.textPrimary,
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  };

  const customTooltipStyle: React.CSSProperties = {
    background: '#0A192F',
    border: `1px solid ${theme.border}`,
    borderRadius: 10,
    padding: '10px 16px',
    color: theme.textPrimary,
    fontSize: 13,
  };

  return (
    <div style={{
      background: theme.background,
      minHeight: '100vh',
      padding: '32px 28px',
      fontFamily: "'Inter', -apple-system, sans-serif",
      color: theme.textPrimary,
    }}>
      {/* ── Header ── */}
      <div style={{
        background: `linear-gradient(135deg, ${theme.cardBg} 0%, rgba(31,73,125,0.3) 100%)`,
        border: `1px solid ${theme.border}`,
        borderRadius: 20,
        padding: '28px 32px',
        marginBottom: 28,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary}, ${theme.accent})`,
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 40 }}>🌡️</span>
          <div>
            <h1 style={{ fontSize: 19, fontWeight: 800, margin: 0, color: theme.textPrimary }}>
              Termómetro IA México
              <span style={{ color: theme.secondary }}> — Observatorio Nacional</span>
            </h1>
            <p style={{ fontSize: 13, color: theme.textSecondary, margin: '6px 0 0' }}>
              Sección 10 del Lineamiento WAI México 2026 · 7 indicadores nacionales en tiempo real · Actualizado {new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* ── KPIs Row ── */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 28 }}>
        <KPICard label="Índice Nacional IA" value="67/100" sub="Promedio ponderado" color={theme.secondary} />
        <KPICard label="Liderazgo Femenino" value="28%" sub="<15% roles senior" color={theme.accent} />
        <KPICard label="Adopción Empresarial" value="41%" sub="Algún uso de IA" color={theme.teal} />
        <KPICard label="Confianza & Gobernanza" value="54/100" sub="+5 pts vs Q1" color="#8B5CF6" />
      </div>

      {/* ── 7 Indicadores Grid ── */}
      <div style={{ ...sectionStyle }}>
        <div style={sectionTitle}>
          <span style={{ color: theme.secondary }}>📊</span>
          7 Indicadores Nacionales WAI — Sección 10
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 16,
        }}>
          {INDICADORES.map((ind) => (
            <IndicadorCard key={ind.id} indicador={ind} />
          ))}
        </div>
      </div>

      {/* ── Charts Row 1 ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        {/* Area Chart */}
        <div style={sectionStyle}>
          <div style={sectionTitle}>
            <span style={{ color: theme.teal }}>📈</span>
            Evolución Conversación IA en México (6 meses)
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={AREA_DATA} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
              <defs>
                <linearGradient id="gradConv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={theme.teal} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={theme.teal} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradMen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={theme.secondary} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={theme.secondary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="mes" tick={{ fill: theme.textSecondary, fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: theme.textSecondary, fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={customTooltipStyle} />
              <Area type="monotone" dataKey="conversacion" name="Conversación" stroke={theme.teal} fill="url(#gradConv)" strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="mencion" name="Mención media" stroke={theme.secondary} fill="url(#gradMen)" strokeWidth={2} dot={false} />
              <Legend wrapperStyle={{ color: theme.textSecondary, fontSize: 12 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart */}
        <div style={sectionStyle}>
          <div style={sectionTitle}>
            <span style={{ color: theme.accent }}>🕸️</span>
            Comparativa WAI vs Benchmark Regional
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={RADAR_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
              <PolarGrid stroke="rgba(255,255,255,0.08)" />
              <PolarAngleAxis dataKey="indicador" tick={{ fill: theme.textSecondary, fontSize: 10 }} />
              <Radar name="WAI México" dataKey="wai" stroke={theme.secondary} fill={theme.secondary} fillOpacity={0.2} strokeWidth={2} />
              <Radar name="Benchmark Regional" dataKey="benchmark" stroke={theme.teal} fill={theme.teal} fillOpacity={0.1} strokeWidth={2} strokeDasharray="5 5" />
              <Tooltip contentStyle={customTooltipStyle} />
              <Legend wrapperStyle={{ color: theme.textSecondary, fontSize: 12 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Bar Chart Sectores ── */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>
          <span style={{ color: theme.secondary }}>🏭</span>
          Top 5 Sectores con Mayor Adopción de IA
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={SECTORES_DATA} layout="vertical" margin={{ top: 0, right: 20, bottom: 0, left: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} tick={{ fill: theme.textSecondary, fontSize: 12 }} axisLine={false} tickLine={false} unit="%" />
            <YAxis type="category" dataKey="sector" tick={{ fill: theme.textPrimary, fontSize: 13, fontWeight: 600 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={customTooltipStyle} formatter={((v: any) => [`${v}%`, 'Adopción']) as any} />
            <Bar dataKey="adopcion" name="Adopción IA" fill={theme.primary} radius={[0, 6, 6, 0]}>
              {SECTORES_DATA.map((_entry, index) => {
                const colors = [theme.secondary, theme.teal, theme.accent, '#8B5CF6', '#F97316'];
                return <rect key={`rect-${index}`} fill={colors[index % colors.length]} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── Mapa por Estado ── */}
      <div style={{ ...sectionStyle, marginBottom: 24 }}>
        <div style={sectionTitle}>
          <span style={{ color: theme.teal }}>🗺️</span>
          Distribución Geográfica del Ecosistema IA — Top 5 Estados
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {ESTADOS_TOP.map((e) => (
            <div key={e.estado} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 100, fontSize: 13, fontWeight: 700, color: e.color }}>{e.estado}</div>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 6, height: 14, overflow: 'hidden' }}>
                <div style={{
                  width: `${e.score}%`, height: '100%',
                  background: `linear-gradient(90deg, ${e.color}60, ${e.color})`,
                  borderRadius: 6,
                  transition: 'width 0.8s ease',
                }} />
              </div>
              <div style={{ width: 40, fontSize: 13, fontWeight: 700, color: e.color, textAlign: 'right' }}>{e.score}</div>
              <div style={{ width: 100, fontSize: 11, color: theme.textMuted }}>{e.startups} startups</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Temas Emergentes ── */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>
          <span style={{ color: theme.accent }}>🔥</span>
          Temas Emergentes en el Ecosistema IA México
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {TEMAS.map((t) => (
            <Chip key={t} label={t} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermometroIA;
