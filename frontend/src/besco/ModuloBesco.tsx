import React from 'react';
import { Sparkles } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList,
} from 'recharts';
import { brandingConfig, type TemaBesco } from '../config/branding';
import { detalleModulos, serieTipo, colorSeveridad, type Modulo } from './bescoData';
import { ExtrasModulo } from './ExtrasModulo';

const { colores } = brandingConfig;

const paleta = (t: TemaBesco) => [t.acento, t.acentoOscuro, '#64748B', '#94A3B8', '#CBD5E1', '#E2E8F0'];

const tooltipStyle: React.CSSProperties = {
  borderRadius: 12, border: `1px solid ${colores.borde}`, boxShadow: colores.sombraMedia,
  fontSize: 13, padding: '8px 12px',
};

const Card: React.FC<{ children: React.ReactNode; titulo?: string }> = ({ children, titulo }) => (
  <div style={{ background: colores.fondoPrincipal, border: `1px solid ${colores.borde}`, borderRadius: '18px', padding: '22px', boxShadow: colores.sombra }}>
    {titulo && <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700, color: colores.textoClaro }}>{titulo}</h3>}
    {children}
  </div>
);

// ---------- Gráfica adaptada al tipo de dato ----------
const Grafica: React.FC<{ id: string; tipo: string; datos: { label: string; valor: number }[]; tema: TemaBesco }> = ({ id, tipo, datos, tema }) => {
  const ejeX = <XAxis dataKey="label" tick={{ fontSize: 12, fill: colores.textoOscuro }} axisLine={false} tickLine={false} dy={4} />;

  if (tipo === 'tendencia') {
    return (
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={datos} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`area-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={tema.acento} stopOpacity={0.32} />
              <stop offset="100%" stopColor={tema.acento} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke={colores.borde} strokeDasharray="3 3" />
          {ejeX}
          <YAxis hide />
          <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: tema.acento, strokeWidth: 1, strokeDasharray: '4 4' }} />
          <Area type="monotone" dataKey="valor" stroke={tema.acento} strokeWidth={2.5}
            fill={`url(#area-${id})`} dot={{ r: 3, fill: tema.acento, strokeWidth: 0 }} activeDot={{ r: 5 }} />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  if (tipo === 'proporcion') {
    const cols = paleta(tema);
    const total = datos.reduce((s, d) => s + d.valor, 0);
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
        <div style={{ position: 'relative', width: 200, height: 200, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={datos} dataKey="valor" nameKey="label" cx="50%" cy="50%" innerRadius={62} outerRadius={88} paddingAngle={3} stroke="none">
                {datos.map((_, i) => <Cell key={i} fill={cols[i % cols.length]} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: colores.textoClaro, fontVariantNumeric: 'tabular-nums' }}>{total.toLocaleString('es-MX')}</span>
            <span style={{ fontSize: 11, color: colores.textoOscuro }}>total</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, minWidth: 140 }}>
          {datos.map((d, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 13 }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: cols[i % cols.length], flexShrink: 0 }} />
              <span style={{ color: colores.textoMedio, flex: 1 }}>{d.label}</span>
              <span style={{ color: colores.textoClaro, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{d.valor.toLocaleString('es-MX')}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // comparacion → barras con degradado
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={datos} margin={{ top: 18, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`bar-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={tema.acento} />
            <stop offset="100%" stopColor={tema.acentoOscuro} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke={colores.borde} strokeDasharray="3 3" />
        {ejeX}
        <YAxis hide />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: colores.fondoTerciario, opacity: 0.5 }} />
        <Bar dataKey="valor" radius={[8, 8, 0, 0]} maxBarSize={54} fill={`url(#bar-${id})`}>
          <LabelList dataKey="valor" position="top" style={{ fontSize: 11, fill: colores.textoMedio, fontWeight: 600 }} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export const ModuloBesco: React.FC<{ modulo: Modulo; tema: TemaBesco }> = ({ modulo, tema }) => {
  const Icon = modulo.icono;
  const d = detalleModulos[modulo.id];
  const tipo = serieTipo[modulo.id] ?? 'comparacion';

  return (
    <div style={{ maxWidth: '1120px' }}>
      {/* Cabecera */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '18px', background: `linear-gradient(135deg, ${tema.acento}, ${tema.acentoOscuro})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 8px 20px ${tema.acento}40` }}>
          <Icon size={30} color={tema.sobreAcento} />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 800, color: colores.textoClaro, letterSpacing: '-0.3px' }}>{modulo.titulo}</h1>
          <p style={{ margin: '4px 0 0', fontSize: '15px', color: colores.textoMedio }}>{modulo.descripcion}</p>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '16px', marginBottom: '20px' }}>
        {modulo.kpis.map((k, i) => (
          <div key={i} style={{ position: 'relative', overflow: 'hidden', background: colores.fondoPrincipal, border: `1px solid ${colores.borde}`, borderRadius: '18px', padding: '18px 20px', boxShadow: colores.sombra }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: tema.acento }} />
            <p style={{ margin: 0, fontSize: '12.5px', fontWeight: 600, color: colores.textoMedio, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{k.label}</p>
            <p style={{ margin: '8px 0 0', fontSize: '30px', fontWeight: 800, color: colores.textoClaro, fontVariantNumeric: 'tabular-nums' }}>{k.valor}</p>
          </div>
        ))}
      </div>

      {/* Insight IA */}
      {d?.insight && (
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', background: `linear-gradient(120deg, ${tema.acentoSuave}, ${colores.fondoSecundario})`, border: `1px solid ${tema.acento}22`, borderRadius: '16px', padding: '15px 18px', marginBottom: '20px' }}>
          <Sparkles size={18} color={tema.acentoOscuro} style={{ flexShrink: 0, marginTop: '1px' }} />
          <p style={{ margin: 0, fontSize: '14px', color: colores.textoClaro, lineHeight: 1.45 }}>{d.insight}</p>
        </div>
      )}

      {/* Gráfica + Lista */}
      <div style={{ display: 'grid', gridTemplateColumns: d?.serie && d?.lista ? 'repeat(auto-fit, minmax(320px, 1fr))' : '1fr', gap: '20px', marginBottom: '20px' }}>
        {d?.serie && (
          <Card titulo={d.serie.titulo}>
            <Grafica id={modulo.id} tipo={tipo} datos={d.serie.datos} tema={tema} />
          </Card>
        )}
        {d?.lista && (
          <Card titulo={d.lista.titulo}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {d.lista.items.map((it, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '12px 14px', borderRadius: '12px', background: colores.fondoSecundario, borderLeft: `3px solid ${colorSeveridad[it.severidad ?? 'ok']}` }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: '13.5px', color: colores.textoClaro, fontWeight: 500 }}>{it.texto}</p>
                    {it.meta && <span style={{ fontSize: '11px', color: colores.textoOscuro }}>{it.meta}</span>}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* Tabla */}
      {d?.tabla && (
        <Card titulo={d.tabla.titulo}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
              <thead>
                <tr>
                  {d.tabla.columnas.map((c, i) => (
                    <th key={i} style={{ textAlign: i === 0 ? 'left' : 'right', padding: '10px 14px', color: colores.textoOscuro, fontWeight: 600, fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: `1px solid ${colores.borde}`, whiteSpace: 'nowrap' }}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {d.tabla.filas.map((fila, r) => (
                  <tr key={r} style={{ background: r % 2 ? colores.fondoSecundario : 'transparent' }}>
                    {fila.map((celda, c) => (
                      <td key={c} style={{ textAlign: c === 0 ? 'left' : 'right', padding: '12px 14px', color: c === 0 ? colores.textoClaro : colores.textoMedio, fontWeight: c === 0 ? 600 : 500, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{celda}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Alertas del módulo + recomendación MAYIA + palancas financieras */}
      <div style={{ marginTop: '20px' }}>
        <ExtrasModulo moduloId={modulo.id} tema={tema} />
      </div>
    </div>
  );
};
