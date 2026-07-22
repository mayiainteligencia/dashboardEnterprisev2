import React, { useMemo, useState } from 'react';
import { Bell, Sparkles, SlidersHorizontal, Check, RefreshCw, Undo2, AlertCircle, Info, CheckCircle, ArrowUpRight } from 'lucide-react';
import { brandingConfig, type TemaBesco } from '../config/branding';
import { getExtra, colorSeveridad, type ExtraModulo as ExtraModuloT, type Severidad } from './bescoData';

const { colores } = brandingConfig;

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

const severidadLabel: Record<Severidad, string> = {
  critico: 'Crítico',
  atencion: 'Atención',
  ok: 'Informativo',
};

// Recuadro "Alertas" + recomendación MAYIA (con aceptar/generar), y debajo "Palancas financieras".
// Se apila full-width bajo el módulo (no altera el grid ni las gráficas).
// Recibe `moduloId` (busca su extra) o un `extra` ya armado (p.ej. resumen general del dashboard).
export const ExtrasModulo: React.FC<{ tema: TemaBesco; moduloId?: string; extra?: ExtraModuloT; titulo?: string }> = ({ tema, moduloId, extra, titulo }) => {
  const ex = extra ?? getExtra(moduloId ?? '');

  // Pool de sugerencias: la principal + una derivada de cada palanca. "Generar otra" cicla.
  const pool = useMemo(
    () => [ex.recomendacion, ...ex.palancas.map(p => `Prioriza la palanca "${p.label}": impacto ${p.impacto} — ${p.nota}.`)],
    [ex],
  );
  const [idx, setIdx] = useState(0);
  const [aceptada, setAceptada] = useState(false);
  const recomendacion = pool[idx % pool.length];
  const generar = () => { setIdx(i => i + 1); setAceptada(false); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '4px' }}>

      {/* ── ALERTAS DEL MÓDULO ──────────────────── */}
      <div style={{
        background: '#FFFFFF',
        border: `1px solid ${colores.borde}`,
        borderRadius: '20px',
        padding: '24px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
          <div style={{
            width: 36, height: 36, borderRadius: '11px',
            background: `linear-gradient(135deg, #F59E0B22, #FEF3C7)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Bell size={17} color="#D97706" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: colores.textoClaro }}>{titulo ?? 'Alertas activas del módulo'}</h3>
            <p style={{ margin: 0, fontSize: '11.5px', color: colores.textoOscuro }}>{ex.alertas.length} notificacion{ex.alertas.length !== 1 ? 'es' : ''}</p>
          </div>
          <div style={{ marginLeft: 'auto', padding: '3px 10px', borderRadius: '20px', background: `${ex.alertas.some(a => a.severidad === 'critico') ? '#EA580C' : '#F59E0B'}15`, color: ex.alertas.some(a => a.severidad === 'critico') ? '#EA580C' : '#D97706', fontSize: '11px', fontWeight: 700 }}>
            {ex.alertas.some(a => a.severidad === 'critico') ? '● Crítico' : '● Atención'}
          </div>
        </div>

        {/* Alertas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
          {ex.alertas.map((a, i) => (
            <div key={i} style={{
              display: 'flex', gap: '12px', alignItems: 'flex-start',
              padding: '14px 16px', borderRadius: '14px',
              background: severidadBg[a.severidad],
              border: `1px solid ${colorSeveridad[a.severidad]}20`,
            }}>
              <span style={{ marginTop: '1px', flexShrink: 0 }}>{severidadIcono[a.severidad]}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: '13.5px', color: colores.textoClaro, fontWeight: 500, lineHeight: 1.45 }}>{a.texto}</p>
                {a.meta && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '5px' }}>
                    <span style={{
                      fontSize: '11px', fontWeight: 700, color: colorSeveridad[a.severidad],
                      background: `${colorSeveridad[a.severidad]}18`, padding: '2px 8px', borderRadius: '4px',
                    }}>{a.meta}</span>
                  </div>
                )}
              </div>
              <span style={{ fontSize: '11px', color: colores.textoOscuro, fontWeight: 600, whiteSpace: 'nowrap' }}>{severidadLabel[a.severidad]}</span>
            </div>
          ))}
        </div>

        {/* Recomendación MAYIA */}
        <div style={{
          background: `linear-gradient(110deg, ${tema.acento}08 0%, ${tema.acento}04 100%)`,
          border: `1px solid ${tema.acento}28`,
          borderRadius: '16px',
          padding: '18px 20px',
        }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{
              width: 36, height: 36, borderRadius: '11px', flexShrink: 0,
              background: `linear-gradient(135deg, ${tema.acento}, ${tema.acentoOscuro})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 4px 12px ${tema.acento}30`,
            }}>
              <Sparkles size={16} color={tema.sobreAcento} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: '0 0 5px', fontSize: '10.5px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', color: tema.acento }}>
                Recomendación de MAYIA · IA
              </p>
              <p style={{ margin: 0, fontSize: '14px', color: colores.textoClaro, lineHeight: 1.55 }}>{recomendacion}</p>
            </div>
          </div>

          {/* Botones */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '16px', paddingLeft: '50px' }}>
            {aceptada ? (
              <>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '9px 16px', borderRadius: '10px', background: `${colores.exito}14`, color: colores.exito, fontSize: '13px', fontWeight: 700, border: `1px solid ${colores.exito}28` }}>
                  <Check size={15} /> Sugerencia aceptada
                </span>
                <button onClick={() => setAceptada(false)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '10px', border: `1px solid ${colores.borde}`, background: '#FFFFFF', color: colores.textoMedio, fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                  <Undo2 size={15} /> Deshacer
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setAceptada(true)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '10px 18px', borderRadius: '10px', border: 'none', background: `linear-gradient(135deg, ${tema.acento}, ${tema.acentoOscuro})`, color: tema.sobreAcento, fontSize: '13px', fontWeight: 700, cursor: 'pointer', boxShadow: `0 4px 12px ${tema.acento}35` }}>
                  <Check size={15} /> Aceptar sugerencia
                </button>
                <button onClick={generar}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '10px 18px', borderRadius: '10px', border: `1px solid ${tema.acento}40`, background: '#FFFFFF', color: tema.acento, fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                  <RefreshCw size={15} /> Generar otra
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── PALANCAS FINANCIERAS ────────────────── */}
      <div style={{
        background: '#FFFFFF',
        border: `1px solid ${colores.borde}`,
        borderRadius: '20px',
        padding: '24px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <div style={{
            width: 36, height: 36, borderRadius: '11px',
            background: `linear-gradient(135deg, ${tema.acento}20, ${tema.acentoSuave})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <SlidersHorizontal size={17} color={tema.acento} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: colores.textoClaro }}>Palancas financieras</h3>
            <p style={{ margin: 0, fontSize: '11.5px', color: colores.textoOscuro }}>Dónde mover para impactar el P&L de este módulo.</p>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600, color: tema.acento }}>
            <ArrowUpRight size={14} />
            {ex.palancas.filter(p => p.impacto.startsWith('+')).length} positivas
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginTop: '18px' }}>
          {ex.palancas.map((p, i) => {
            const positivo = p.impacto.trim().startsWith('+');
            const chip = positivo ? colores.exito : tema.acento;
            return (
              <div key={i} style={{
                position: 'relative', overflow: 'hidden',
                background: '#FAFAFA',
                border: `1px solid ${colores.borde}`,
                borderRadius: '16px',
                padding: '18px 18px 16px',
                transition: 'box-shadow 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = `0 6px 20px ${chip}15`}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'}
              >
                {/* Dot decorativo */}
                <div style={{ position: 'absolute', top: '-24px', right: '-24px', width: '80px', height: '80px', borderRadius: '50%', background: `${chip}08`, pointerEvents: 'none' }} />

                {/* Número índice */}
                <span style={{ fontSize: '10px', fontWeight: 800, color: colores.textoOscuro, textTransform: 'uppercase', letterSpacing: '0.06em' }}>#{String(i + 1).padStart(2, '0')}</span>

                <p style={{ margin: '6px 0 0', fontSize: '12px', fontWeight: 600, color: colores.textoMedio, lineHeight: 1.3 }}>{p.label}</p>
                <p style={{ margin: '10px 0 2px', fontSize: '26px', fontWeight: 900, color: chip, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.5px', lineHeight: 1 }}>{p.impacto}</p>
                <p style={{ margin: '0 0 14px', fontSize: '11.5px', color: colores.textoOscuro, lineHeight: 1.4 }}>{p.nota}</p>

                {/* Rail del ajuste */}
                <div style={{ position: 'relative', height: 6, borderRadius: 999, background: colores.fondoTerciario }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${p.ajuste}%`, borderRadius: 999, background: `linear-gradient(90deg, ${chip}80, ${chip})` }} />
                  <div style={{ position: 'absolute', top: '50%', left: `${p.ajuste}%`, transform: 'translate(-50%, -50%)', width: 14, height: 14, borderRadius: '50%', background: '#fff', border: `2.5px solid ${chip}`, boxShadow: `0 2px 8px ${chip}40` }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '7px' }}>
                  <span style={{ fontSize: '10px', color: colores.textoOscuro }}>Potencial de ajuste</span>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: chip }}>{p.ajuste}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
