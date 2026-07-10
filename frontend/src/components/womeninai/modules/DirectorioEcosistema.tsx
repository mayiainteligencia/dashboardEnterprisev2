// DirectorioEcosistema.tsx — Radar del Ecosistema de IA en México
// Sección 6.12 del lineamiento WAI México 2026

import React, { useState, useMemo } from 'react';
import { WAI_BRAND_CONFIG } from '../../../config/branding';

const { theme } = WAI_BRAND_CONFIG;

// ─── Tipos ─────────────────────────────────────────────────────────────────────
type EntidadTipo = 'Empresa' | 'Startup' | 'Universidad' | 'Laboratorio' | 'Comunidad' | 'Inversor' | 'Fintech';

interface Entidad {
  id: string;
  nombre: string;
  tipo: EntidadTipo;
  ciudad: string;
  estado: string;
  descripcion: string;
  tags: string[];
  sector: string;
  website?: string;
  destacado?: boolean;
}

type FiltroTipo = 'Todos' | EntidadTipo;

// ─── Datos representativos ─────────────────────────────────────────────────────
const ENTIDADES: Entidad[] = [
  {
    id: 'ibm-mx',
    nombre: 'IBM México',
    tipo: 'Empresa',
    ciudad: 'CDMX', estado: 'Ciudad de México',
    descripcion: 'Líder global en Enterprise AI, watsonx y consultoría tecnológica con presencia en México desde 1928.',
    tags: ['watsonx', 'Enterprise AI', 'Cloud', 'Consulting'],
    sector: 'Enterprise AI',
    website: 'ibm.com/mx-es',
    destacado: true,
  },
  {
    id: 'google-cloud-mx',
    nombre: 'Google Cloud México',
    tipo: 'Empresa',
    ciudad: 'CDMX', estado: 'Ciudad de México',
    descripcion: 'Plataforma de cloud e inteligencia artificial. Vertex AI, Gemini y soluciones ML para empresas mexicanas.',
    tags: ['Vertex AI', 'Gemini', 'BigQuery', 'ML', 'Cloud'],
    sector: 'Cloud & ML',
    website: 'cloud.google.com',
    destacado: true,
  },
  {
    id: 'neoris-mx',
    nombre: 'NEORIS',
    tipo: 'Empresa',
    ciudad: 'CDMX', estado: 'Ciudad de México',
    descripcion: 'Aceleradora digital global con fuerte especialización en IA Generativa, automatización y transformación empresarial.',
    tags: ['GenAI', 'Automatización', 'RPA', 'Transformación Digital'],
    sector: 'AI Consulting',
    website: 'neoris.com',
    destacado: true,
  },
  {
    id: 'cminds',
    nombre: 'C Minds',
    tipo: 'Comunidad',
    ciudad: 'CDMX', estado: 'Ciudad de México',
    descripcion: 'Think tank y aceleradora de política pública en IA e innovación. Conecta gobierno, academia e industria.',
    tags: ['Política IA', 'Think Tank', 'Gobernanza', 'Inclusión'],
    sector: 'Política IA',
    website: 'cminds.co',
  },
  {
    id: 'unam-ia',
    nombre: 'UNAM Instituto de IA',
    tipo: 'Universidad',
    ciudad: 'CDMX', estado: 'Ciudad de México',
    descripcion: 'Centro de investigación en inteligencia artificial de la Universidad Nacional Autónoma de México.',
    tags: ['Investigación', 'NLP', 'Visión Computacional', 'Robótica'],
    sector: 'Investigación',
    website: 'unam.mx',
  },
  {
    id: 'itesm-lab',
    nombre: 'ITESM Laboratorio IA',
    tipo: 'Laboratorio',
    ciudad: 'Monterrey', estado: 'Nuevo León',
    descripcion: 'Laboratorio de inteligencia artificial aplicada del Tec de Monterrey con proyectos industria-academia.',
    tags: ['Investigación Aplicada', 'Industria 4.0', 'Deep Learning'],
    sector: 'Investigación Aplicada',
    website: 'tec.mx',
  },
  {
    id: 'kueski',
    nombre: 'Kueski',
    tipo: 'Fintech',
    ciudad: 'CDMX', estado: 'Ciudad de México',
    descripcion: 'Fintech líder en BNPL y crédito digital en México. Usa Machine Learning para scoring crediticio alternativo.',
    tags: ['ML', 'Crédito', 'BNPL', 'Scoring', 'Fintech'],
    sector: 'ML en crédito',
    website: 'kueski.com',
    destacado: true,
  },
  {
    id: 'bitso',
    nombre: 'Bitso',
    tipo: 'Startup',
    ciudad: 'CDMX', estado: 'Ciudad de México',
    descripcion: 'Exchange de criptomonedas líder en Latinoamérica. Aplica IA para detección de fraude y compliance en DeFi.',
    tags: ['DeFi', 'Crypto', 'AI Compliance', 'Fraude', 'Blockchain'],
    sector: 'AI en DeFi',
    website: 'bitso.com',
  },
  {
    id: 'konfio',
    nombre: 'Konfío',
    tipo: 'Startup',
    ciudad: 'CDMX', estado: 'Ciudad de México',
    descripcion: 'Plataforma financiera para PYMES mexicanas. Usa IA para acceso a crédito, factoraje y gestión empresarial.',
    tags: ['PYMES', 'Crédito Digital', 'AI', 'Fintech', 'SaaS'],
    sector: 'AI PYMES',
    website: 'konfio.mx',
  },
  {
    id: 'wai-mx',
    nombre: 'Women in AI México',
    tipo: 'Comunidad',
    ciudad: 'CDMX', estado: 'Ciudad de México',
    descripcion: 'Capítulo mexicano de la red global Women in AI. Empodera a mujeres en IA, datos y liderazgo tecnológico.',
    tags: ['Género', 'Liderazgo', 'Comunidad', 'IA Responsable', 'Red Global'],
    sector: 'Red global',
    website: 'womeninai.co',
    destacado: true,
  },
  {
    id: 'bbva-mx',
    nombre: 'BBVA México',
    tipo: 'Empresa',
    ciudad: 'CDMX', estado: 'Ciudad de México',
    descripcion: 'Principal banco en México con un laboratorio de IA y datos que procesa millones de transacciones con ML.',
    tags: ['Banca', 'ML', 'Fraud Detection', 'Open Banking', 'AI Factory'],
    sector: 'AI Bancaria',
    website: 'bbva.mx',
  },
  {
    id: 'microsoft-mx',
    nombre: 'Microsoft México',
    tipo: 'Empresa',
    ciudad: 'CDMX', estado: 'Ciudad de México',
    descripcion: 'Ecosistema Azure AI y Copilot para empresas mexicanas. Socios de IA en gobierno, educación e industria.',
    tags: ['Azure AI', 'Copilot', 'OpenAI', 'Power Platform', 'M365'],
    sector: 'Azure AI',
    website: 'microsoft.com/es-mx',
    destacado: true,
  },
];

const FILTROS: FiltroTipo[] = ['Todos', 'Empresa', 'Startup', 'Universidad', 'Laboratorio', 'Comunidad', 'Inversor', 'Fintech'];

const TIPO_COLORS: Record<string, string> = {
  Empresa: theme.primary,
  Startup: theme.accent,
  Universidad: '#8B5CF6',
  Laboratorio: '#F97316',
  Comunidad: theme.teal,
  Inversor: theme.secondary,
  Fintech: '#06B6D4',
};

// ─── Sub-componentes ──────────────────────────────────────────────────────────
interface FiltroButtonProps {
  label: FiltroTipo;
  active: boolean;
  count: number;
  onClick: () => void;
}

const FiltroButton: React.FC<FiltroButtonProps> = ({ label, active, count, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const color = label === 'Todos' ? theme.secondary : (TIPO_COLORS[label] || theme.secondary);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '8px 18px',
        borderRadius: 20,
        border: `1px solid ${active ? color : 'rgba(255,255,255,0.1)'}`,
        background: active
          ? `linear-gradient(135deg, ${color}30, ${color}15)`
          : hovered ? 'rgba(255,255,255,0.05)' : 'transparent',
        color: active ? color : (hovered ? theme.textPrimary : theme.textSecondary),
        fontSize: 13,
        fontWeight: active ? 700 : 500,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        transform: hovered ? 'translateY(-1px)' : 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }}
    >
      {label}
      <span style={{
        background: active ? color : 'rgba(255,255,255,0.1)',
        color: active ? '#000' : theme.textMuted,
        borderRadius: 10,
        padding: '1px 7px',
        fontSize: 11,
        fontWeight: 700,
      }}>{count}</span>
    </button>
  );
};

interface EntidadCardProps {
  entidad: Entidad;
}

const EntidadCard: React.FC<EntidadCardProps> = ({ entidad }) => {
  const [hovered, setHovered] = useState(false);
  const color = TIPO_COLORS[entidad.tipo] || theme.secondary;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? `linear-gradient(145deg, ${theme.cardBg}, rgba(31,73,125,0.35))`
          : theme.cardBg,
        border: `1px solid ${hovered ? color : theme.border}`,
        borderRadius: 18,
        padding: '22px',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-5px)' : 'none',
        boxShadow: hovered ? `0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px ${color}25` : theme.shadowCard,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top bar color */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${color}, transparent)`,
        opacity: hovered ? 1 : 0.4,
        transition: 'opacity 0.3s',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <h3 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: theme.textPrimary }}>{entidad.nombre}</h3>
            {entidad.destacado && (
              <span style={{
                fontSize: 9, fontWeight: 800, padding: '2px 7px', borderRadius: 4,
                background: `${theme.secondary}25`, color: theme.secondary,
                border: `1px solid ${theme.secondary}40`, letterSpacing: 0.5,
              }}>★ WAI</span>
            )}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{
              fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 8,
              background: `${color}20`, color, border: `1px solid ${color}40`,
            }}>{entidad.tipo}</span>
            <span style={{ fontSize: 12, color: theme.textMuted }}>📍 {entidad.ciudad}</span>
          </div>
        </div>
        <div style={{
          fontSize: 11, fontWeight: 600, color: theme.textMuted,
          background: 'rgba(255,255,255,0.04)', padding: '4px 10px', borderRadius: 8,
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          {entidad.sector}
        </div>
      </div>

      {/* Descripción */}
      <p style={{ margin: 0, fontSize: 12.5, color: theme.textSecondary, lineHeight: 1.6 }}>
        {entidad.descripcion}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {entidad.tags.map((tag) => (
          <span key={tag} style={{
            fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 6,
            background: 'rgba(255,255,255,0.06)', color: theme.textSecondary,
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
        {entidad.website && (
          <span style={{ fontSize: 11, color: theme.textMuted }}>🌐 {entidad.website}</span>
        )}
        <button
          style={{
            marginLeft: 'auto',
            padding: '8px 18px',
            background: hovered ? `linear-gradient(135deg, ${color}, ${theme.primary})` : 'rgba(31,73,125,0.3)',
            border: `1px solid ${hovered ? color : 'rgba(31,73,125,0.5)'}`,
            borderRadius: 10,
            color: hovered ? '#fff' : theme.textSecondary,
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.25s ease',
          }}
        >
          Ver perfil →
        </button>
      </div>
    </div>
  );
};

// ─── Componente Principal ─────────────────────────────────────────────────────
export const DirectorioEcosistema: React.FC = () => {
  const [filtroActivo, setFiltroActivo] = useState<FiltroTipo>('Todos');
  const [busqueda, setBusqueda] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const filtradas = useMemo(() => {
    return ENTIDADES.filter((e) => {
      const matchTipo = filtroActivo === 'Todos' || e.tipo === filtroActivo;
      const q = busqueda.toLowerCase();
      const matchBusq = !q || e.nombre.toLowerCase().includes(q)
        || e.descripcion.toLowerCase().includes(q)
        || e.tags.some((t) => t.toLowerCase().includes(q))
        || e.sector.toLowerCase().includes(q);
      return matchTipo && matchBusq;
    });
  }, [filtroActivo, busqueda]);

  const conteosPorTipo = useMemo(() => {
    const c: Record<string, number> = { Todos: ENTIDADES.length };
    ENTIDADES.forEach((e) => { c[e.tipo] = (c[e.tipo] || 0) + 1; });
    return c;
  }, []);

  const ESTADOS_MAPA = [
    { estado: 'CDMX', count: ENTIDADES.filter(e => e.estado === 'Ciudad de México').length, color: theme.secondary },
    { estado: 'Jalisco', count: 3, color: theme.teal },
    { estado: 'Nuevo León', count: ENTIDADES.filter(e => e.ciudad === 'Monterrey').length + 2, color: theme.accent },
    { estado: 'Querétaro', count: 2, color: '#8B5CF6' },
    { estado: 'Puebla', count: 1, color: '#F97316' },
  ];

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
          background: `linear-gradient(90deg, ${theme.teal}, ${theme.secondary}, ${theme.primary})`,
        }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 40 }}>🗺️</span>
            <div>
              <h1 style={{ fontSize: 13, fontWeight: 800, margin: 0 }}>
                Directorio / Radar del Ecosistema de IA en México
              </h1>
              <p style={{ fontSize: 13, color: theme.textSecondary, margin: '6px 0 0' }}>
                Sección 6.12 · Mapa de actores del ecosistema nacional de inteligencia artificial
              </p>
            </div>
          </div>
          <div style={{
            background: `linear-gradient(135deg, ${theme.secondary}20, ${theme.teal}10)`,
            border: `1px solid ${theme.border}`,
            borderRadius: 14,
            padding: '14px 22px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: theme.secondary }}>{ENTIDADES.length}</div>
            <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 600 }}>Entidades en el ecosistema</div>
          </div>
        </div>
      </div>

      {/* ── Búsqueda + Filtros ── */}
      <div style={{
        background: theme.cardBg,
        border: `1px solid ${theme.border}`,
        borderRadius: 16,
        padding: '20px 24px',
        marginBottom: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}>
        {/* Buscador */}
        <div style={{ position: 'relative' }}>
          <span style={{
            position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
            fontSize: 14, color: searchFocused ? theme.secondary : theme.textMuted,
            transition: 'color 0.2s',
          }}>🔍</span>
          <input
            type="text"
            placeholder="Buscar empresa, startup, tecnología, sector..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 44px',
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${searchFocused ? theme.secondary : 'rgba(255,255,255,0.1)'}`,
              borderRadius: 12,
              color: theme.textPrimary,
              fontSize: 14,
              outline: 'none',
              transition: 'border-color 0.25s',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Filtros */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {FILTROS.map((f) => (
            <FiltroButton
              key={f}
              label={f}
              active={filtroActivo === f}
              count={conteosPorTipo[f] || 0}
              onClick={() => setFiltroActivo(f)}
            />
          ))}
        </div>
      </div>

      {/* ── Resultados ── */}
      <div style={{ marginBottom: 8, fontSize: 13, color: theme.textMuted, fontWeight: 600 }}>
        Mostrando {filtradas.length} de {ENTIDADES.length} entidades
        {busqueda && ` · Búsqueda: "${busqueda}"`}
      </div>

      {/* Grid de tarjetas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: 18,
        marginBottom: 28,
      }}>
        {filtradas.length > 0 ? (
          filtradas.map((e) => <EntidadCard key={e.id} entidad={e} />)
        ) : (
          <div style={{
            gridColumn: '1/-1',
            textAlign: 'center',
            padding: '60px 20px',
            color: theme.textMuted,
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Sin resultados</div>
            <div style={{ fontSize: 13 }}>Intenta con otros términos de búsqueda o cambia el filtro</div>
          </div>
        )}
      </div>

      {/* ── Mapa de actividad por estado ── */}
      <div style={{
        background: theme.cardBg,
        border: `1px solid ${theme.border}`,
        borderRadius: 20,
        padding: '24px 28px',
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: theme.teal }}>📍</span>
          Actividad del Ecosistema por Estado
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {ESTADOS_MAPA.map((e) => {
            const max = Math.max(...ESTADOS_MAPA.map(x => x.count));
            return (
              <div key={e.estado} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 110, fontSize: 13, fontWeight: 700, color: e.color }}>{e.estado}</div>
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 8, height: 18, overflow: 'hidden' }}>
                  <div style={{
                    width: `${(e.count / max) * 100}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${e.color}50, ${e.color})`,
                    borderRadius: 8,
                    transition: 'width 1s ease',
                  }} />
                </div>
                <div style={{ width: 80, fontSize: 12, color: theme.textMuted, textAlign: 'right' }}>
                  {e.count} {e.count === 1 ? 'entidad' : 'entidades'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DirectorioEcosistema;
