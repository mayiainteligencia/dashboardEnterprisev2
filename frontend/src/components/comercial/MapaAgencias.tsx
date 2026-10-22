import React, { useMemo, useState } from 'react';
import { Crosshair, ShieldAlert } from 'lucide-react';
import { colores, tnum, Panel } from './paginasPro';

/**
 * Reconocimiento Territorial · Red Nacional de 13 Sucursales.
 * Versión optimizada de alto rendimiento en paleta clara.
 */

interface Props {
  ventasBase: number;
  ventasActual: number;
}

interface Agencia { nombre: string; lon: number; lat: number; leads: number; credito: number; ventas: number; cdmx: boolean }

const AGENCIAS: Agencia[] = [
  { nombre: 'Polanco', lon: -99.19, lat: 19.43, leads: 181, credito: 57, ventas: 37, cdmx: true },
  { nombre: 'Satélite', lon: -99.23, lat: 19.51, leads: 162, credito: 48, ventas: 25, cdmx: true },
  { nombre: 'Interlomas', lon: -99.27, lat: 19.40, leads: 143, credito: 40, ventas: 18, cdmx: true },
  { nombre: 'Santa Fe', lon: -99.26, lat: 19.36, leads: 180, credito: 33, ventas: 17, cdmx: true },
  { nombre: 'Coyoacán', lon: -99.16, lat: 19.35, leads: 168, credito: 64, ventas: 44, cdmx: true },
  { nombre: 'Lindavista', lon: -99.13, lat: 19.49, leads: 135, credito: 27, ventas: 17, cdmx: true },
  { nombre: 'Pedregal', lon: -99.21, lat: 19.31, leads: 128, credito: 37, ventas: 23, cdmx: true },
  { nombre: 'Toluca', lon: -99.66, lat: 19.29, leads: 124, credito: 32, ventas: 18, cdmx: false },
  { nombre: 'Querétaro', lon: -100.39, lat: 20.59, leads: 179, credito: 63, ventas: 41, cdmx: false },
  { nombre: 'Puebla', lon: -98.20, lat: 19.04, leads: 124, credito: 43, ventas: 24, cdmx: false },
  { nombre: 'León', lon: -101.68, lat: 21.12, leads: 104, credito: 29, ventas: 20, cdmx: false },
  { nombre: 'Guadalajara', lon: -103.35, lat: 20.67, leads: 200, credito: 79, ventas: 40, cdmx: false },
  { nombre: 'Monterrey', lon: -100.31, lat: 25.67, leads: 172, credito: 50, ventas: 25, cdmx: false },
];

const CONTINENTE: [number, number][] = [
  [-117.1, 32.5], [-114.8, 32.5], [-114.7, 31.8], [-113.0, 31.3], [-112.2, 29.5], [-110.5, 27.8], [-109.4, 26.0],
  [-108.0, 25.0], [-106.5, 23.2], [-105.4, 21.8], [-105.6, 20.4], [-105.3, 19.0], [-103.5, 18.2], [-101.8, 17.5],
  [-99.8, 16.7], [-97.5, 15.9], [-95.0, 16.2], [-94.0, 16.2], [-92.2, 14.5], [-91.4, 16.0], [-90.9, 17.8],
  [-89.2, 17.9], [-88.3, 18.5], [-87.5, 18.2], [-87.0, 21.5], [-90.4, 21.0], [-90.5, 19.5], [-92.0, 18.6],
  [-94.5, 18.2], [-96.0, 19.0], [-97.2, 20.7], [-97.7, 22.5], [-97.2, 25.5], [-99.5, 27.5], [-101.4, 29.8],
  [-103.1, 29.0], [-104.5, 29.7], [-106.5, 31.8], [-108.2, 31.8], [-108.2, 31.3], [-111.0, 31.3],
];
const BAJA: [number, number][] = [
  [-117.1, 32.5], [-116.0, 30.5], [-114.5, 28.0], [-112.8, 26.0], [-110.3, 23.0], [-109.5, 23.2],
  [-110.5, 24.5], [-112.0, 27.0], [-114.8, 31.0], [-114.8, 32.5],
];

const NW = 560, NH = 340;
const nx = (lon: number) => ((lon + 118) / 32) * NW;
const ny = (lat: number) => ((33 - lat) / 19) * NH;
const pathDe = (pts: [number, number][]) => pts.map((p, i) => `${i ? 'L' : 'M'}${nx(p[0]).toFixed(1)},${ny(p[1]).toFixed(1)}`).join(' ') + 'Z';

const IX = 8, IY = 170, IW = 210, IH = 162;
const ix = (lon: number) => IX + 14 + ((lon + 99.32) / 0.26) * (IW - 28);
const iy = (lat: number) => IY + 14 + ((19.54 - lat) / 0.26) * (IH - 28);

const color = (conv: number) => {
  const t = Math.max(0, Math.min(1, (conv - 9) / 17));
  if (t < 0.3) return '#DC2626'; // Fuga crítica
  if (t < 0.6) return '#D97706'; // Regular
  return '#059669'; // Alta conversión
};

const SUM_V = AGENCIAS.reduce((s, a) => s + a.ventas, 0);
const SUM_C = AGENCIAS.reduce((s, a) => s + a.credito, 0);

export const MapaAgencias: React.FC<Props> = ({ ventasBase, ventasActual }) => {
  const [sel, setSel] = useState<string>('Santa Fe');

  const filas = useMemo(() => {
    const r = ventasActual / ventasBase;
    return AGENCIAS.map(a => {
      const w = (a.credito / a.ventas) / (SUM_C / SUM_V);
      const ventasEst = a.ventas * (1 + (r - 1) * w);
      return { ...a, ventasEst, conv: (a.ventas / a.leads) * 100, convEst: (ventasEst / a.leads) * 100 };
    });
  }, [ventasBase, ventasActual]);

  const ordenadas = [...filas].sort((a, b) => b.convEst - a.convEst);
  const peor = [...filas].sort((a, b) => a.conv - b.conv)[0].nombre;
  const actual = filas.find(f => f.nombre === sel)!;
  const delta = actual.ventasEst - actual.ventas;
  const radio = (leads: number, k: number) => k + Math.sqrt(leads) * 0.65;
  const cdmx = filas.filter(f => f.cdmx);

  const cdmxHubX = nx(-99.2);
  const cdmxHubY = ny(19.4);

  return (
    <Panel
      style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '18px',
        padding: '20px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            background: 'rgba(37, 99, 235, 0.08)',
            border: '1px solid rgba(37, 99, 235, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Crosshair size={15} color="#2563EB" />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.2px' }}>
              Reconocimiento Territorial // Red Nacional 13 Sucursales
            </div>
            <div style={{ fontSize: '10px', color: '#64748B', fontFamily: 'monospace' }}>
              TOPOLOGÍA DE CONVERSIÓN Y VULNERABILIDAD CREDITICIA
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', fontSize: '10px', fontFamily: 'monospace' }}>
          <span style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#059669' }} /> CONVERSIÓN ALTA
          </span>
          <span style={{ color: '#DC2626', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#DC2626' }} /> FUGA CRÍTICA
          </span>
        </div>
      </div>

      <div className="row2" style={{ alignItems: 'stretch' }}>
        {/* Mapa Claro */}
        <div style={{
          borderRadius: '12px',
          background: '#F8FAFC',
          border: '1px solid #E2E8F0',
          padding: '10px',
          position: 'relative',
        }}>
          <svg viewBox={`0 0 ${NW} ${NH}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
            {/* Grid suave */}
            <g stroke="#E2E8F0" strokeWidth="1">
              {[80, 160, 240, 320, 400, 480].map(x => (
                <line key={x} x1={x} y1="0" x2={x} y2={NH} strokeDasharray="3 3" />
              ))}
              {[60, 120, 180, 240, 300].map(y => (
                <line key={y} x1="0" y1={y} x2={NW} y2={y} strokeDasharray="3 3" />
              ))}
            </g>

            {/* Geometría México */}
            <path d={pathDe(CONTINENTE)} fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" strokeLinejoin="round" />
            <path d={pathDe(BAJA)} fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" strokeLinejoin="round" />

            {/* Enlaces regionales */}
            {filas.filter(f => !f.cdmx).map(f => (
              <line
                key={`link-${f.nombre}`}
                x1={cdmxHubX}
                y1={cdmxHubY}
                x2={nx(f.lon)}
                y2={ny(f.lat)}
                stroke="rgba(37, 99, 235, 0.2)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            ))}

            <line x1={cdmxHubX} y1={cdmxHubY} x2={IX + IW} y2={IY + 30} stroke="#2563EB" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx={cdmxHubX} cy={cdmxHubY} r="5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />

            {/* Agencias Regionales */}
            {filas.filter(f => !f.cdmx).map(f => {
              const cx = nx(f.lon), cy = ny(f.lat), r = radio(f.leads, 3.5);
              const activa = sel === f.nombre;
              const clr = color(f.convEst);

              return (
                <g key={f.nombre} onClick={() => setSel(f.nombre)} style={{ cursor: 'pointer' }}>
                  {f.nombre === peor && (
                    <circle cx={cx} cy={cy} r={r + 4} fill="none" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="3 3" />
                  )}
                  {activa && (
                    <circle cx={cx} cy={cy} r={r + 3} fill="none" stroke="#0F172A" strokeWidth="2" />
                  )}
                  <circle cx={cx} cy={cy} r={r} fill={clr} opacity="0.95" stroke="#FFFFFF" strokeWidth={activa ? 2.5 : 1.5} />
                  <text x={cx + r + 5} y={cy + 3.5} fontSize="9.5" fontWeight="700" fill="#1E293B" fontFamily="monospace">{f.nombre}</text>
                </g>
              );
            })}

            {/* Inset CDMX */}
            <g>
              <rect x={IX} y={IY} width={IW} height={IH} rx="10" fill="#FFFFFF" stroke="#2563EB" strokeWidth="1.2" />
              <text x={IX + 12} y={IY + 14} fontSize="8.5" fontWeight="800" fill="#2563EB" fontFamily="monospace">ZMVM · CLUSTER METROPOLITANO</text>
              {cdmx.map(f => {
                const cx = ix(f.lon), cy = iy(f.lat), r = radio(f.leads, 2.5);
                const activa = sel === f.nombre;
                const clr = color(f.convEst);

                return (
                  <g key={f.nombre} onClick={() => setSel(f.nombre)} style={{ cursor: 'pointer' }}>
                    {f.nombre === peor && (
                      <circle cx={cx} cy={cy} r={r + 3} fill="none" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="3 3" />
                    )}
                    {activa && (
                      <circle cx={cx} cy={cy} r={r + 3} fill="none" stroke="#0F172A" strokeWidth="2" />
                    )}
                    <circle cx={cx} cy={cy} r={r} fill={clr} opacity="0.95" stroke="#FFFFFF" strokeWidth={activa ? 2.5 : 1} />
                    <text x={cx} y={cy + r + 9} textAnchor="middle" fontSize="8" fontWeight="700" fill="#1E293B" fontFamily="monospace">{f.nombre}</text>
                  </g>
                );
              })}
            </g>
          </svg>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '9px', color: '#64748B', fontFamily: 'monospace' }}>
            <span>LAT: 19°26'N // LON: 99°08'W</span>
            <span>COBERTURA TOTAL: 100% REGIONAL</span>
          </div>
        </div>

        {/* Dossier y Ranking */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '3px',
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '10px',
            padding: '8px 10px',
            maxHeight: '230px',
            overflowY: 'auto',
          }}>
            {ordenadas.map(f => (
              <div
                key={f.nombre}
                onClick={() => setSel(f.nombre)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 6px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  background: sel === f.nombre ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
                  border: sel === f.nombre ? '1px solid rgba(37, 99, 235, 0.3)' : '1px solid transparent',
                  transition: 'all .15s',
                }}
              >
                <span style={{ width: '84px', fontSize: '10.5px', fontWeight: sel === f.nombre ? 800 : 600, color: sel === f.nombre ? '#2563EB' : '#1E293B', fontFamily: 'monospace' }}>
                  {f.nombre}
                </span>
                <div style={{ flex: 1, height: '6px', borderRadius: '3px', background: '#E2E8F0', overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(100, (f.convEst / 28) * 100)}%`, height: '100%', background: color(f.convEst) }} />
                </div>
                <span style={{ ...tnum, width: '42px', textAlign: 'right', fontSize: '10.5px', fontWeight: 800, color: color(f.convEst), fontFamily: 'monospace' }}>
                  {f.convEst.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>

          {/* Dossier */}
          <div style={{
            padding: '12px 14px',
            borderRadius: '10px',
            background: '#FFFFFF',
            border: '1px solid #CBD5E1',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', fontFamily: 'monospace' }}>
                DOSSIER // {actual.nombre.toUpperCase()}
              </div>
              <span style={{ fontSize: '9px', padding: '2px 6px', borderRadius: '4px', background: `${color(actual.convEst)}15`, color: color(actual.convEst), fontWeight: 800, border: `1px solid ${color(actual.convEst)}40`, fontFamily: 'monospace' }}>
                CONV: {actual.convEst.toFixed(1)}%
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              <div>
                <div style={{ fontSize: '8.5px', color: '#64748B', textTransform: 'uppercase', fontFamily: 'monospace' }}>Leads</div>
                <div style={{ ...tnum, fontSize: '16px', fontWeight: 800, color: '#0F172A', fontFamily: 'monospace' }}>{actual.leads}</div>
              </div>
              <div>
                <div style={{ fontSize: '8.5px', color: '#64748B', textTransform: 'uppercase', fontFamily: 'monospace' }}>Solicitudes</div>
                <div style={{ ...tnum, fontSize: '16px', fontWeight: 800, color: '#2563EB', fontFamily: 'monospace' }}>{actual.credito}</div>
              </div>
              <div>
                <div style={{ fontSize: '8.5px', color: '#64748B', textTransform: 'uppercase', fontFamily: 'monospace' }}>Entregas Proy.</div>
                <div style={{ ...tnum, fontSize: '16px', fontWeight: 800, color: '#059669', fontFamily: 'monospace' }}>{Math.round(actual.ventasEst)}</div>
              </div>
            </div>

            <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '9.5px', color: '#64748B', fontFamily: 'monospace' }}>Delta vs. Escenario Base:</span>
              <span style={{ ...tnum, fontSize: '12px', fontWeight: 800, color: delta >= 0 ? '#059669' : '#DC2626', fontFamily: 'monospace' }}>
                {delta >= 0 ? '+' : ''}{delta.toFixed(1)} unidades
              </span>
            </div>

            {actual.nombre === peor && (
              <div style={{ marginTop: '8px', padding: '6px 8px', borderRadius: '6px', background: 'rgba(220, 38, 38, 0.06)', border: '1px solid #DC2626', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldAlert size={14} color="#DC2626" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '10px', color: '#DC2626', fontFamily: 'monospace', lineHeight: 1.3 }}>
                  Mayor fuga de cartera de la red. Prioridad #1 para digitalización en 24h.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Panel>
  );
};
