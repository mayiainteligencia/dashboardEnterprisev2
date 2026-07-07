import React, { useMemo, useState } from 'react';
import { Grid3x3, Thermometer, Droplets, Gauge, Cable, Wrench, Layers } from 'lucide-react';
import { brandingConfig, type TemaBesco } from '../config/branding';
import { nivelesPiso, colorSeveridad, labelSeveridad, type Panel, type Severidad } from './bescoData';
import { ExtrasModulo } from './ExtrasModulo';

const { colores } = brandingConfig;

// Textura de laminado: vetas finas sobre el color base del panel.
const laminado = (base: string) =>
  `repeating-linear-gradient(90deg, ${base}, ${base} 6px, rgba(0,0,0,0.035) 6px, rgba(0,0,0,0.035) 7px), linear-gradient(180deg, rgba(255,255,255,0.5), rgba(0,0,0,0.02))`;

const KpiPiso: React.FC<{ icon: React.ElementType; valor: string; label: string; tema: TemaBesco }> = ({ icon: Icon, valor, label, tema }) => (
  <div style={{ background: colores.fondoPrincipal, border: `1px solid ${colores.borde}`, borderRadius: '16px', padding: '16px 18px', boxShadow: colores.sombra, borderTop: `3px solid ${tema.acento}` }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Icon size={16} color={tema.acentoOscuro} />
      <span style={{ fontSize: '12px', fontWeight: 600, color: colores.textoMedio, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</span>
    </div>
    <p style={{ margin: '8px 0 0', fontSize: '26px', fontWeight: 800, color: colores.textoClaro, fontVariantNumeric: 'tabular-nums' }}>{valor}</p>
  </div>
);

const DetalleRow: React.FC<{ icon: React.ElementType; label: string; valor: string; color?: string }> = ({ icon: Icon, label, valor, color }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: `1px solid ${colores.borde}` }}>
    <Icon size={16} color={colores.textoOscuro} />
    <span style={{ flex: 1, fontSize: '13px', color: colores.textoMedio }}>{label}</span>
    <span style={{ fontSize: '14px', fontWeight: 700, color: color ?? colores.textoClaro, fontVariantNumeric: 'tabular-nums' }}>{valor}</span>
  </div>
);

export const ControladorPisos: React.FC<{ tema: TemaBesco }> = ({ tema }) => {
  const [nivelId, setNivelId] = useState(nivelesPiso[0].id);
  const nivel = nivelesPiso.find(n => n.id === nivelId) ?? nivelesPiso[0];

  // Panel seleccionado: por defecto el más severo del nivel.
  const primerRelevante = useMemo(() => {
    const ord: Severidad[] = ['critico', 'atencion', 'ok'];
    return [...nivel.paneles].sort((a, b) => ord.indexOf(a.estado) - ord.indexOf(b.estado))[0];
  }, [nivel]);
  const [selId, setSelId] = useState<string>(primerRelevante.id);
  const sel = nivel.paneles.find(p => p.id === selId) ?? primerRelevante;

  // Al cambiar de nivel, re-selecciona el panel más relevante.
  const cambiarNivel = (id: string) => {
    setNivelId(id);
    const n = nivelesPiso.find(x => x.id === id)!;
    const ord: Severidad[] = ['critico', 'atencion', 'ok'];
    setSelId([...n.paneles].sort((a, b) => ord.indexOf(a.estado) - ord.indexOf(b.estado))[0].id);
  };

  const enAlerta = nivel.paneles.filter(p => p.estado !== 'ok').length;
  const cargaProm = Math.round(nivel.paneles.reduce((s, p) => s + p.carga, 0) / nivel.paneles.length);
  const tempProm = (nivel.paneles.reduce((s, p) => s + p.temp, 0) / nivel.paneles.length).toFixed(1);

  const colorCarga = (c: number) => (c >= 100 ? colorSeveridad.critico : c >= 85 ? colorSeveridad.atencion : colorSeveridad.ok);

  return (
    <div style={{ maxWidth: '1200px' }}>
      {/* Cabecera */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '18px', background: `linear-gradient(135deg, ${tema.acento}, ${tema.acentoOscuro})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 8px 20px ${tema.acento}40` }}>
          <Grid3x3 size={30} color={tema.sobreAcento} />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 800, color: colores.textoClaro, letterSpacing: '-0.3px' }}>Controlador de pisos laminados</h1>
          <p style={{ margin: '4px 0 0', fontSize: '15px', color: colores.textoMedio }}>Piso técnico en vivo: carga, temperatura y humedad bajo cada panel.</p>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '20px' }}>
        <KpiPiso icon={Layers} valor={`${nivel.paneles.length}`} label="Paneles del nivel" tema={tema} />
        <KpiPiso icon={Gauge} valor={`${enAlerta}`} label="En alerta" tema={tema} />
        <KpiPiso icon={Gauge} valor={`${cargaProm}%`} label="Carga promedio" tema={tema} />
        <KpiPiso icon={Thermometer} valor={`${tempProm}°C`} label="Temp. bajo piso" tema={tema} />
      </div>

      {/* Selector de nivel */}
      <div className="no-scrollbar" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', marginBottom: '20px' }}>
        {nivelesPiso.map(n => {
          const activo = n.id === nivelId;
          const alertas = n.paneles.filter(p => p.estado !== 'ok').length;
          return (
            <button key={n.id} onClick={() => cambiarNivel(n.id)}
              style={{ flexShrink: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '12px', fontSize: '13px', fontWeight: 600, transition: 'all .2s',
                border: `1px solid ${activo ? tema.acento : colores.borde}`,
                background: activo ? tema.acento : colores.fondoPrincipal,
                color: activo ? tema.sobreAcento : colores.textoMedio }}>
              {n.nombre}
              {alertas > 0 && (
                <span style={{ minWidth: 18, height: 18, borderRadius: '9px', background: activo ? 'rgba(255,255,255,0.25)' : colorSeveridad.critico, color: '#fff', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5px' }}>{alertas}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Malla de paneles + detalle */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start', marginBottom: '20px' }}>
        {/* Malla */}
        <div style={{ flex: '2 1 460px', minWidth: '300px', background: colores.fondoPrincipal, border: `1px solid ${colores.borde}`, borderRadius: '18px', padding: '20px', boxShadow: colores.sombra }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: colores.textoClaro }}>{nivel.nombre}</h3>
            {/* Leyenda */}
            <div style={{ display: 'flex', gap: '14px' }}>
              {(['ok', 'atencion', 'critico'] as Severidad[]).map(s => (
                <span key={s} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: colores.textoMedio }}>
                  <span style={{ width: 9, height: 9, borderRadius: '50%', background: colorSeveridad[s] }} />{labelSeveridad[s]}
                </span>
              ))}
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <div style={{ minWidth: `${nivel.cols * 44}px`, display: 'grid', gridTemplateColumns: `repeat(${nivel.cols}, minmax(0, 1fr))`, gap: '6px' }}>
              {nivel.paneles.map(p => {
                const activo = p.id === selId;
                const c = colorSeveridad[p.estado];
                const base = p.estado === 'ok' ? colores.fondoTerciario : `${c}22`;
                return (
                  <button key={p.id} onClick={() => setSelId(p.id)} title={`${p.id} · carga ${p.carga}%`}
                    style={{
                      aspectRatio: '1 / 1.4', borderRadius: '6px', cursor: 'pointer', padding: 0,
                      background: laminado(base),
                      border: activo ? `2px solid ${tema.acentoOscuro}` : `1px solid ${p.estado === 'ok' ? colores.borde : c}`,
                      boxShadow: activo ? `0 6px 16px ${tema.acento}55` : 'none',
                      position: 'relative', transition: 'transform .12s, box-shadow .12s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}>
                    {/* punto de estado */}
                    <span style={{ position: 'absolute', top: 4, right: 4, width: 7, height: 7, borderRadius: '50%', background: c, boxShadow: p.estado === 'critico' ? `0 0 0 3px ${c}33` : 'none' }} />
                  </button>
                );
              })}
            </div>
          </div>
          <p style={{ margin: '12px 0 0', fontSize: '11.5px', color: colores.textoOscuro }}>Cada panel es una loseta de piso técnico. Tócala para ver su estado bajo piso.</p>
        </div>

        {/* Detalle del panel */}
        <div style={{ flex: '1 1 280px', minWidth: '260px', background: colores.fondoPrincipal, border: `1px solid ${colores.borde}`, borderRadius: '18px', padding: '20px', boxShadow: colores.sombra }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div>
              <p style={{ margin: 0, fontSize: '11px', color: colores.textoOscuro, textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>Panel</p>
              <h3 style={{ margin: '2px 0 0', fontSize: '22px', fontWeight: 800, color: colores.textoClaro }}>{sel.id}</h3>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px', color: colorSeveridad[sel.estado], background: `${colorSeveridad[sel.estado]}1A`, padding: '5px 10px', borderRadius: '999px' }}>{labelSeveridad[sel.estado]}</span>
          </div>

          {/* Carga con barra */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '13px', color: colores.textoMedio }}>Carga estructural</span>
              <span style={{ fontSize: '14px', fontWeight: 800, color: colorCarga(sel.carga), fontVariantNumeric: 'tabular-nums' }}>{sel.carga}%</span>
            </div>
            <div style={{ height: 8, borderRadius: 999, background: colores.fondoTerciario, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${Math.min(sel.carga, 100)}%`, borderRadius: 999, background: colorCarga(sel.carga) }} />
            </div>
          </div>

          <DetalleRow icon={Thermometer} label="Temperatura bajo piso" valor={`${sel.temp}°C`} color={sel.temp >= 26 ? colorSeveridad.critico : undefined} />
          <DetalleRow icon={Droplets} label="Humedad relativa" valor={`${sel.humedad}% HR`} color={sel.humedad >= 65 ? colorSeveridad.atencion : undefined} />
          <DetalleRow icon={Cable} label="Cableado bajo piso" valor={sel.estado === 'critico' ? 'Saturado' : 'Normal'} color={sel.estado === 'critico' ? colorSeveridad.critico : undefined} />
          <DetalleRow icon={Wrench} label="Último mantenimiento" valor={sel.estado === 'ok' ? 'Hace 12 días' : 'Hace 3 meses'} />

          {/* Acción sugerida */}
          {sel.estado !== 'ok' && (
            <div style={{ marginTop: '16px', padding: '12px 14px', borderRadius: '12px', background: `${colorSeveridad[sel.estado]}12`, borderLeft: `4px solid ${colorSeveridad[sel.estado]}` }}>
              <p style={{ margin: '0 0 3px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3px', color: colores.textoMedio }}>Acción sugerida</p>
              <p style={{ margin: 0, fontSize: '13px', color: colores.textoClaro, lineHeight: 1.4 }}>
                {sel.carga >= 100
                  ? 'Redistribuir la carga del rack a paneles vecinos y verificar los pedestales.'
                  : sel.humedad >= 65
                    ? 'Activar deshumidificación de la zona y revisar posible filtración.'
                    : 'Programar inspección del panel en la próxima ventana de mantenimiento.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Alertas del módulo + recomendación MAYIA + palancas financieras */}
      <ExtrasModulo moduloId="pisos" tema={tema} />
    </div>
  );
};
