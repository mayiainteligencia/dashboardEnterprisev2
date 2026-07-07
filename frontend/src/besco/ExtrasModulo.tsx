import React, { useMemo, useState } from 'react';
import { Bell, Sparkles, SlidersHorizontal, Check, RefreshCw, Undo2 } from 'lucide-react';
import { brandingConfig, type TemaBesco } from '../config/branding';
import { getExtra, colorSeveridad, type ExtraModulo as ExtraModuloT, type Severidad } from './bescoData';

const { colores } = brandingConfig;

const Dot: React.FC<{ s: Severidad }> = ({ s }) => (
  <span style={{ width: 9, height: 9, borderRadius: '50%', background: colorSeveridad[s], flexShrink: 0, marginTop: 5 }} />
);

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
      {/* --- Alertas del módulo + recomendación MAYIA --- */}
      <div style={{ background: colores.fondoPrincipal, border: `1px solid ${colores.borde}`, borderRadius: '18px', padding: '22px', boxShadow: colores.sombra }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ width: 34, height: 34, borderRadius: '10px', background: colores.fondoTerciario, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Bell size={17} color={colores.textoMedio} />
          </div>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: colores.textoClaro }}>{titulo ?? 'Alertas de este módulo'}</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
          {ex.alertas.map((a, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '12px 14px', borderRadius: '12px', background: colores.fondoSecundario, borderLeft: `3px solid ${colorSeveridad[a.severidad]}` }}>
              <Dot s={a.severidad} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: '13.5px', color: colores.textoClaro, fontWeight: 500 }}>{a.texto}</p>
                {a.meta && <span style={{ fontSize: '11px', color: colores.textoOscuro }}>{a.meta}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Recomendación de MAYIA + acciones */}
        <div style={{ background: `linear-gradient(120deg, ${tema.acentoSuave}, ${colores.fondoSecundario})`, border: `1px solid ${tema.acento}33`, borderRadius: '14px', padding: '15px 18px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div style={{ width: 30, height: 30, borderRadius: '9px', background: tema.acento, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Sparkles size={16} color={tema.sobreAcento} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: '0 0 3px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px', color: tema.acentoOscuro }}>Recomendación de MAYIA</p>
              <p style={{ margin: 0, fontSize: '14px', color: colores.textoClaro, lineHeight: 1.5 }}>{recomendacion}</p>
            </div>
          </div>

          {/* Botones: aceptar / generar otra */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '14px', paddingLeft: '42px' }}>
            {aceptada ? (
              <>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '9px 14px', borderRadius: '10px', background: `${colores.exito}1A`, color: colores.exito, fontSize: '13px', fontWeight: 700 }}>
                  <Check size={16} /> Sugerencia aceptada
                </span>
                <button onClick={() => setAceptada(false)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 14px', borderRadius: '10px', border: `1px solid ${colores.borde}`, background: colores.fondoPrincipal, color: colores.textoMedio, fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                  <Undo2 size={15} /> Deshacer
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setAceptada(true)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '10px 16px', borderRadius: '10px', border: 'none', background: tema.acento, color: tema.sobreAcento, fontSize: '13px', fontWeight: 700, cursor: 'pointer', boxShadow: `0 4px 12px ${tema.acento}40` }}>
                  <Check size={16} /> Aceptar sugerencia
                </button>
                <button onClick={generar}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '10px 16px', borderRadius: '10px', border: `1px solid ${tema.acento}`, background: 'transparent', color: tema.acentoOscuro, fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                  <RefreshCw size={15} /> Generar otra
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* --- Palancas financieras --- */}
      <div style={{ background: colores.fondoPrincipal, border: `1px solid ${colores.borde}`, borderRadius: '18px', padding: '22px', boxShadow: colores.sombra }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <div style={{ width: 34, height: 34, borderRadius: '10px', background: colores.fondoTerciario, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <SlidersHorizontal size={17} color={colores.textoMedio} />
          </div>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: colores.textoClaro }}>Palancas financieras</h3>
        </div>
        <p style={{ margin: '0 0 16px 44px', fontSize: '12.5px', color: colores.textoMedio }}>Dónde mover para impactar el P&amp;L de este módulo.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
          {ex.palancas.map((p, i) => {
            const positivo = p.impacto.trim().startsWith('+');
            const chip = positivo ? colores.exito : tema.acentoOscuro;
            return (
              <div key={i} style={{ position: 'relative', overflow: 'hidden', background: colores.fondoSecundario, border: `1px solid ${colores.borde}`, borderRadius: '14px', padding: '16px' }}>
                <p style={{ margin: 0, fontSize: '12.5px', fontWeight: 600, color: colores.textoMedio }}>{p.label}</p>
                <p style={{ margin: '8px 0 0', fontSize: '22px', fontWeight: 800, color: chip, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.3px' }}>{p.impacto}</p>
                <p style={{ margin: '2px 0 12px', fontSize: '11.5px', color: colores.textoOscuro }}>{p.nota}</p>

                {/* Riel de la palanca */}
                <div style={{ position: 'relative', height: 6, borderRadius: 999, background: colores.fondoTerciario }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${p.ajuste}%`, borderRadius: 999, background: `linear-gradient(90deg, ${tema.acento}, ${tema.acentoOscuro})` }} />
                  <div style={{ position: 'absolute', top: '50%', left: `${p.ajuste}%`, transform: 'translate(-50%, -50%)', width: 14, height: 14, borderRadius: '50%', background: '#fff', border: `2px solid ${tema.acentoOscuro}`, boxShadow: colores.sombra }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                  <span style={{ fontSize: '10px', color: colores.textoOscuro }}>Potencial de ajuste</span>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: tema.acentoOscuro }}>{p.ajuste}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
