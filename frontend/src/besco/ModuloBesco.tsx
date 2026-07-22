import React, { useState } from 'react';
import { Sparkles, TrendingUp, TrendingDown, Minus, AlertCircle, CheckCircle, Info, ArrowRight, BarChart2, List, Table2, Activity } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList,
} from 'recharts';
import { brandingConfig, type TemaBesco } from '../config/branding';
import { detalleModulos, serieTipo, colorSeveridad, type Modulo, type Severidad } from './bescoData';
import { ExtrasModulo } from './ExtrasModulo';

const { colores } = brandingConfig;

// ──────────────────────────────────────────────
// Paleta para gráficas tipo proporción
// ──────────────────────────────────────────────
const paleta = (t: TemaBesco) => [t.acento, t.acentoOscuro, '#94A3B8', '#CBD5E1', '#E2E8F0', '#F1F5F9'];

// ──────────────────────────────────────────────
// Tooltip estilizado
// ──────────────────────────────────────────────
const tooltipStyle: React.CSSProperties = {
  borderRadius: 12,
  border: `1px solid ${colores.borde}`,
  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
  fontSize: 13,
  padding: '10px 14px',
  background: '#fff',
  color: colores.textoClaro,
};

// ──────────────────────────────────────────────
// Severidad → colores y íconos
// ──────────────────────────────────────────────
const severidadIcono: Record<Severidad, React.ReactNode> = {
  critico: <AlertCircle size={15} color={colorSeveridad.critico} />,
  atencion: <Info size={15} color={colorSeveridad.atencion} />,
  ok: <CheckCircle size={15} color={colorSeveridad.ok} />,
};

const severidadBg: Record<Severidad, string> = {
  critico: '#FFF7ED',
  atencion: '#FFFBEB',
  ok: '#F0FDF4',
};

// ──────────────────────────────────────────────
// Card base (fondo blanco, sombra ligera)
// ──────────────────────────────────────────────
const Card: React.FC<{ children: React.ReactNode; titulo?: string; icon?: React.ReactNode; noPad?: boolean }> = ({ children, titulo, icon, noPad }) => (
  <div style={{
    background: '#FFFFFF',
    border: `1px solid ${colores.borde}`,
    borderRadius: '20px',
    padding: noPad ? 0 : '22px 24px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
    overflow: 'hidden',
  }}>
    {titulo && (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px', padding: noPad ? '22px 24px 0' : 0 }}>
        {icon && <span style={{ display: 'flex', alignItems: 'center', color: colores.textoOscuro }}>{icon}</span>}
        <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: colores.textoClaro, letterSpacing: '-0.1px' }}>{titulo}</h3>
      </div>
    )}
    {children}
  </div>
);

// ──────────────────────────────────────────────
// Gráfica adaptada al tipo de dato
// ──────────────────────────────────────────────
const Grafica: React.FC<{ id: string; tipo: string; datos: { label: string; valor: number }[]; tema: TemaBesco }> = ({ id, tipo, datos, tema }) => {
  const ejeX = <XAxis dataKey="label" tick={{ fontSize: 11, fill: colores.textoOscuro }} axisLine={false} tickLine={false} dy={4} />;

  if (tipo === 'tendencia') {
    return (
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={datos} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`area-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={tema.acento} stopOpacity={0.22} />
              <stop offset="100%" stopColor={tema.acento} stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke={colores.borde} strokeDasharray="3 4" />
          {ejeX}
          <YAxis hide />
          <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: tema.acento, strokeWidth: 1, strokeDasharray: '4 4' }} />
          <Area type="monotone" dataKey="valor" stroke={tema.acento} strokeWidth={2.5}
            fill={`url(#area-${id})`} dot={{ r: 3.5, fill: '#fff', stroke: tema.acento, strokeWidth: 2 }} activeDot={{ r: 5 }} />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  if (tipo === 'proporcion') {
    const cols = paleta(tema);
    const total = datos.reduce((s, d) => s + d.valor, 0);
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px' }}>
        <div style={{ position: 'relative', width: 190, height: 190, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={datos} dataKey="valor" nameKey="label" cx="50%" cy="50%" innerRadius={58} outerRadius={85} paddingAngle={3} stroke="none">
                {datos.map((_, i) => <Cell key={i} fill={cols[i % cols.length]} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: colores.textoClaro, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{total.toLocaleString('es-MX')}</span>
            <span style={{ fontSize: 10, color: colores.textoOscuro, marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>total</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, minWidth: 130 }}>
          {datos.map((d, i) => {
            const pct = total > 0 ? Math.round((d.valor / total) * 100) : 0;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: cols[i % cols.length], flexShrink: 0 }} />
                <span style={{ color: colores.textoMedio, fontSize: 13, flex: 1 }}>{d.label}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: colores.textoClaro, fontWeight: 700, fontSize: 13, fontVariantNumeric: 'tabular-nums' }}>{d.valor.toLocaleString('es-MX')}</span>
                  <span style={{ fontSize: 10, color: colores.textoOscuro, background: colores.fondoTerciario, borderRadius: 4, padding: '1px 5px', fontWeight: 600 }}>{pct}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // comparacion → barras
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={datos} margin={{ top: 16, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`bar-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={tema.acento} />
            <stop offset="100%" stopColor={tema.acentoOscuro} stopOpacity={0.85} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke={colores.borde} strokeDasharray="3 4" />
        {ejeX}
        <YAxis hide />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: colores.fondoSecundario }} />
        <Bar dataKey="valor" radius={[8, 8, 0, 0]} maxBarSize={48} fill={`url(#bar-${id})`}>
          <LabelList dataKey="valor" position="top" style={{ fontSize: 10, fill: colores.textoMedio, fontWeight: 700 }} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

// ──────────────────────────────────────────────
// KPI Card individual — rediseñado
// ──────────────────────────────────────────────
const KpiCard: React.FC<{ label: string; valor: string; tema: TemaBesco; index: number }> = ({ label, valor, tema, index }) => {
  const isPositive = valor.includes('+') || valor.toLowerCase().includes('ok') || valor.includes('%') && !valor.includes('-');
  const hasNumber = /\d/.test(valor);

  const trendIcon = valor.includes('+') ? <TrendingUp size={14} /> :
    valor.includes('-') ? <TrendingDown size={14} /> : <Minus size={14} />;
  const trendColor = valor.includes('+') ? '#10B981' : valor.includes('-') ? '#EA580C' : colores.textoOscuro;

  return (
    <div style={{
      position: 'relative',
      background: '#FFFFFF',
      border: `1px solid ${colores.borde}`,
      borderRadius: '18px',
      padding: '20px 22px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
      overflow: 'hidden',
      transition: 'box-shadow 0.2s, transform 0.2s',
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 24px ${tema.acento}20`; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}
    >
      {/* Accent bar top */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${tema.acento}, ${tema.acentoOscuro})`, borderRadius: '18px 18px 0 0' }} />

      {/* Index badge */}
      <div style={{
        position: 'absolute', top: '16px', right: '16px',
        width: '28px', height: '28px', borderRadius: '8px',
        background: `${tema.acento}14`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '11px', fontWeight: 800, color: tema.acento, letterSpacing: '-0.3px',
      }}>
        {String(index + 1).padStart(2, '0')}
      </div>

      <p style={{ margin: '6px 0 0', fontSize: '11.5px', fontWeight: 600, color: colores.textoOscuro, textTransform: 'uppercase', letterSpacing: '0.06em', lineHeight: 1.3, paddingRight: '36px' }}>{label}</p>
      <p style={{ margin: '10px 0 0', fontSize: '28px', fontWeight: 900, color: colores.textoClaro, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.8px', lineHeight: 1 }}>{valor}</p>

      {hasNumber && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '8px', padding: '3px 8px', borderRadius: '6px', background: `${trendColor}10`, color: trendColor, fontSize: '11px', fontWeight: 700 }}>
          {trendIcon}
          <span>{isPositive ? 'En rango' : 'Monitorear'}</span>
        </div>
      )}
    </div>
  );
};

// ──────────────────────────────────────────────
// Tabla rediseñada — más limpia y escaneable
// ──────────────────────────────────────────────
const TablaModulo: React.FC<{ columnas: string[]; filas: (string | number)[][]; tema: TemaBesco }> = ({ columnas, filas, tema }) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: '13px' }}>
        <thead>
          <tr>
            {columnas.map((c, i) => (
              <th key={i} style={{
                textAlign: i === 0 ? 'left' : 'right',
                padding: '10px 16px',
                color: colores.textoOscuro,
                fontWeight: 700,
                fontSize: '10.5px',
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
                borderBottom: `2px solid ${colores.borde}`,
                whiteSpace: 'nowrap',
                background: colores.fondoSecundario,
              }}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map((fila, r) => {
            const isHovered = hoveredRow === r;
            // Detectar si el valor de última columna es tipo "estado"
            const lastVal = String(fila[fila.length - 1]).toLowerCase();
            const estadoBg: Record<string, string> = {
              'ok': '#10B981', 'verde': '#10B981', 'validado': '#10B981', 'enviado': '#10B981', 'vigente': '#10B981', 'óptimo': '#10B981',
              'ámbar': '#F59E0B', 'amarillo': '#F59E0B', 'revisar': '#F59E0B', 'pendiente': '#F59E0B', 'emitida': '#F59E0B', 'en proceso': '#6366F1',
              'naranja': '#EA580C', 'critico': '#EA580C', 'urgente': '#EA580C', 'riesgo': '#EA580C', 'por vencer': '#F59E0B',
              'en tránsito': '#3B82F6', 'en espera': '#8B5CF6', 'capacitación': '#F59E0B',
            };
            const lastColor = estadoBg[lastVal];

            return (
              <tr
                key={r}
                onMouseEnter={() => setHoveredRow(r)}
                onMouseLeave={() => setHoveredRow(null)}
                style={{ background: isHovered ? `${tema.acento}08` : 'transparent', transition: 'background 0.15s' }}
              >
                {fila.map((celda, c) => {
                  const isLast = c === fila.length - 1;
                  const celdaStr = String(celda);
                  const color = lastColor && isLast ? lastColor : undefined;
                  return (
                    <td key={c} style={{
                      textAlign: c === 0 ? 'left' : 'right',
                      padding: '13px 16px',
                      color: c === 0 ? colores.textoClaro : colores.textoMedio,
                      fontWeight: c === 0 ? 600 : 400,
                      fontVariantNumeric: 'tabular-nums',
                      whiteSpace: 'nowrap',
                      borderBottom: `1px solid ${colores.borde}`,
                      fontSize: '13px',
                    }}>
                      {isLast && color ? (
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: '5px',
                          padding: '3px 10px', borderRadius: '20px',
                          background: `${color}16`, color, fontSize: '11.5px', fontWeight: 700,
                        }}>
                          <span style={{ width: 5, height: 5, borderRadius: '50%', background: color, flexShrink: 0 }} />
                          {celdaStr}
                        </span>
                      ) : celdaStr}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// ──────────────────────────────────────────────
// Lista de alertas rediseñada
// ──────────────────────────────────────────────
const ListaAlertas: React.FC<{ items: { texto: string; meta?: string; severidad?: Severidad }[]; tema: TemaBesco }> = ({ items, tema }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    {items.map((it, i) => {
      const sev = it.severidad ?? 'ok';
      return (
        <div key={i} style={{
          display: 'flex', gap: '12px', alignItems: 'flex-start',
          padding: '14px 16px', borderRadius: '14px',
          background: severidadBg[sev],
          border: `1px solid ${colorSeveridad[sev]}22`,
        }}>
          <span style={{ marginTop: '1px', flexShrink: 0 }}>{severidadIcono[sev]}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: '13.5px', color: colores.textoClaro, fontWeight: 500, lineHeight: 1.4 }}>{it.texto}</p>
            {it.meta && (
              <span style={{
                display: 'inline-block', marginTop: '4px', fontSize: '11px', fontWeight: 700, color: colorSeveridad[sev],
                background: `${colorSeveridad[sev]}18`, padding: '2px 8px', borderRadius: '4px',
              }}>{it.meta}</span>
            )}
          </div>
          <ArrowRight size={14} color={colorSeveridad[sev]} style={{ flexShrink: 0, marginTop: 2 }} />
        </div>
      );
    })}
  </div>
);

// ──────────────────────────────────────────────
// Componente principal
// ──────────────────────────────────────────────
export const ModuloBesco: React.FC<{ modulo: Modulo; tema: TemaBesco }> = ({ modulo, tema }) => {
  const Icon = modulo.icono;
  const d = detalleModulos[modulo.id];
  const tipo = serieTipo[modulo.id] ?? 'comparacion';

  return (
    <div style={{ maxWidth: '1200px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* ── CABECERA PREMIUM ─────────────────────── */}
      <div style={{
        position: 'relative',
        background: '#FFFFFF',
        border: `1px solid ${colores.borde}`,
        borderRadius: '22px',
        padding: '28px 32px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        overflow: 'hidden',
      }}>
        {/* Accent strip izquierdo */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: `linear-gradient(180deg, ${tema.acento}, ${tema.acentoOscuro})`, borderRadius: '22px 0 0 22px' }} />

        {/* Fondo decorativo — círculo suave */}
        <div style={{ position: 'absolute', top: '-60px', right: '-40px', width: '220px', height: '220px', borderRadius: '50%', background: `${tema.acento}07`, pointerEvents: 'none' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          {/* Icono */}
          <div style={{
            width: '64px', height: '64px', borderRadius: '18px',
            background: `linear-gradient(135deg, ${tema.acento}, ${tema.acentoOscuro})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            boxShadow: `0 8px 24px ${tema.acento}35`,
          }}>
            <Icon size={30} color={tema.sobreAcento} />
          </div>

          {/* Título y descripción */}
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' }}>
              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 900, color: colores.textoClaro, letterSpacing: '-0.5px', lineHeight: 1 }}>{modulo.titulo}</h1>
              <span style={{
                padding: '3px 10px', borderRadius: '20px', fontSize: '10px', fontWeight: 800,
                textTransform: 'uppercase', letterSpacing: '0.08em',
                background: `${tema.acento}16`, color: tema.acento,
              }}>LIVE</span>
            </div>
            <p style={{ margin: 0, fontSize: '14px', color: colores.textoMedio, lineHeight: 1.5 }}>{modulo.descripcion}</p>
          </div>

          {/* Botón acción */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 18px', borderRadius: '12px', background: `${tema.acento}12`, color: tema.acento, fontSize: '13px', fontWeight: 700, cursor: 'pointer', border: `1px solid ${tema.acento}22`, userSelect: 'none' }}>
            <Activity size={15} />
            En vivo
          </div>
        </div>
      </div>

      {/* ── KPI CARDS ────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
        {modulo.kpis.map((k, i) => (
          <KpiCard key={i} label={k.label} valor={k.valor} tema={tema} index={i} />
        ))}
      </div>

      {/* ── INSIGHT IA ───────────────────────────── */}
      {d?.insight && (
        <div style={{
          display: 'flex', gap: '14px', alignItems: 'flex-start',
          background: '#FFFFFF',
          border: `1px solid ${tema.acento}30`,
          borderRadius: '16px',
          padding: '18px 22px',
          boxShadow: `0 4px 16px ${tema.acento}10`,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(110deg, ${tema.acento}08 0%, transparent 60%)`, pointerEvents: 'none' }} />
          <div style={{
            width: '38px', height: '38px', borderRadius: '12px', flexShrink: 0,
            background: `linear-gradient(135deg, ${tema.acento}, ${tema.acentoOscuro})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 4px 12px ${tema.acento}30`,
          }}>
            <Sparkles size={18} color={tema.sobreAcento} />
          </div>
          <div style={{ flex: 1, minWidth: 0, position: 'relative' }}>
            <p style={{ margin: '0 0 3px', fontSize: '10.5px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: tema.acento }}>
              Insight de MAYIA · IA
            </p>
            <p style={{ margin: 0, fontSize: '14px', color: colores.textoClaro, lineHeight: 1.55 }}>{d.insight}</p>
          </div>
        </div>
      )}

      {/* ── GRÁFICA + LISTA ──────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: d?.serie && d?.lista ? 'repeat(auto-fit, minmax(320px, 1fr))' : '1fr', gap: '20px' }}>
        {d?.serie && (
          <Card titulo={d.serie.titulo} icon={<BarChart2 size={15} />}>
            <Grafica id={modulo.id} tipo={tipo} datos={d.serie.datos} tema={tema} />
          </Card>
        )}
        {d?.lista && (
          <Card titulo={d.lista.titulo} icon={<List size={15} />}>
            <ListaAlertas items={d.lista.items} tema={tema} />
          </Card>
        )}
      </div>

      {/* ── TABLA ────────────────────────────────── */}
      {d?.tabla && (
        <Card titulo={d.tabla.titulo} icon={<Table2 size={15} />} noPad>
          <div style={{ padding: '22px 24px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Table2 size={15} color={colores.textoOscuro} />
              <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: colores.textoClaro }}>{d.tabla.titulo}</h3>
              <span style={{ marginLeft: 'auto', fontSize: '11px', fontWeight: 600, color: colores.textoOscuro, background: colores.fondoTerciario, padding: '2px 8px', borderRadius: '6px' }}>
                {d.tabla.filas.length} registros
              </span>
            </div>
          </div>
          <TablaModulo columnas={d.tabla.columnas} filas={d.tabla.filas} tema={tema} />
          <div style={{ height: '8px' }} />
        </Card>
      )}

      {/* ── EXTRAS (ALERTAS + MAYIA + PALANCAS) ── */}
      <div>
        <ExtrasModulo moduloId={modulo.id} tema={tema} />
      </div>
    </div>
  );
};
