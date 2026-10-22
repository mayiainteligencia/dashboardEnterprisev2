import React, { useState, useMemo } from 'react';
import { Sliders, Cpu, Clock, TrendingUp, Users, AlertTriangle, CheckCircle, RotateCcw, Zap, Info, SlidersHorizontal, ChevronDown, ChevronUp, LayoutGrid } from 'lucide-react';
import { Shell, Panel, HeroKPI, Reveal, GrowBar, colores, tnum } from './paginasPro';
import escenariosData from './escenarios_gemelo.json';
import { SimulacionViva } from './SimulacionViva';
import { MotorEstocasticoMatematico } from './MotorEstocasticoMatematico';
import { FilaAsesores } from './FilaAsesores';
import { MapaAgencias } from './MapaAgencias';

interface ResultadoMetrica {
  media: number;
  min: number;
  max: number;
}

interface ResultadoMalla {
  ventas: ResultadoMetrica;
  monto: ResultadoMetrica;
  morosidad: ResultadoMetrica;
  utilizacion: ResultadoMetrica;
  aband_credito: ResultadoMetrica;
  aband_vendedor: ResultadoMetrica;
}

interface CeldaMalla {
  aprobacion_h: number;
  tasa_delta: number;
  vendedores: number;
  resultado: ResultadoMalla;
}

const badgeSim = (
  <span style={{
    padding: '6px 14px',
    borderRadius: '20px',
    background: 'rgba(255, 255, 255, 0.22)',
    fontSize: '11px',
    fontWeight: 800,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    letterSpacing: '0.5px',
    border: '1px solid rgba(255, 255, 255, 0.35)',
    color: '#FFFFFF',
    fontFamily: 'monospace',
  }}>
    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px #10B981' }} />
    GEMELO DIGITAL · SIMULACIÓN SIMPY
  </span>
);

export const PaginaGemeloDigital: React.FC = () => {
  // Ejes de la malla precalculada
  const [aprobacionH, setAprobacionH] = useState<number>(0);
  const [tasaDelta, setTasaDelta] = useState<number>(0);
  const [vendedores, setVendedores] = useState<number>(8);
  const [mostrarAjusteFino, setMostrarAjusteFino] = useState<boolean>(false);
  const [modoCockpit, setModoCockpit] = useState<boolean>(true);

  // Escenario base precalculado
  const baseResultado = useMemo(() => {
    const celda = (escenariosData.malla as CeldaMalla[]).find(
      c => c.aprobacion_h === 0 && c.tasa_delta === 0 && c.vendedores === 8
    );
    return celda?.resultado || (escenariosData.escenarios[0].resultado as ResultadoMalla);
  }, []);

  // Escenario actual según los 3 sliders
  const actualResultado = useMemo(() => {
    const celda = (escenariosData.malla as CeldaMalla[]).find(
      c => c.aprobacion_h === aprobacionH && c.tasa_delta === tasaDelta && c.vendedores === vendedores
    );
    return celda?.resultado || baseResultado;
  }, [aprobacionH, tasaDelta, vendedores, baseResultado]);

  // Cálculos de impacto contra el escenario base
  const deltaVentasPct = ((actualResultado.ventas.media / baseResultado.ventas.media - 1) * 100);
  const deltaMontoPct = ((actualResultado.monto.media / baseResultado.monto.media - 1) * 100);
  const deltaMoraPts = (actualResultado.morosidad.media - baseResultado.morosidad.media);

  // Opciones discretas de los sliders
  const opcionesAprobacion = [
    { valor: 0, label: 'Actual (~63 h)', desc: 'Tiempo histórico por financiera' },
    { valor: 48, label: '≤ 48 horas', desc: 'Máximo 2 días hábiles' },
    { valor: 24, label: '≤ 24 horas', desc: 'Resolución al día siguiente' },
    { valor: 12, label: '≤ 12 horas', desc: 'Aprobación Express en el día' },
  ];

  const opcionesTasa = [
    { valor: -2, label: '−2 pts', desc: 'Tasa preferencial agresiva' },
    { valor: 0, label: 'Base (0)', desc: 'Tasa estándar (12.5% - 21.0%)' },
    { valor: 2, label: '+2 pts', desc: 'Incremento moderado de margen' },
    { valor: 4, label: '+4 pts', desc: 'Escenario restrictivo' },
  ];

  const opcionesVendedores = [
    { valor: 6, label: '6 asesores', desc: 'Equipo reducido (-2)' },
    { valor: 8, label: '8 asesores', desc: 'Capacidad base actual' },
    { valor: 10, label: '10 asesores', desc: 'Expansión de equipo (+2)' },
    { valor: 12, label: '12 asesores', desc: 'Equipo reforzado (+4)' },
  ];

  const aplicarPreset = (ap: number, td: number, v: number) => {
    setAprobacionH(ap);
    setTasaDelta(td);
    setVendedores(v);
  };

  return (
    <Shell
      icon={Cpu}
      title="Gemelo Digital · Escenarios"
      subtitle="Simulación SimPy del ciclo de crédito y ventas automotrices · Calibrado con log de procesos"
      badge={badgeSim}
      kpis={
        <>
          <HeroKPI
            i={0}
            label="Ventas cerradas"
            value={`${Math.round(actualResultado.ventas.media)} u.`}
            delta={`${deltaVentasPct >= 0 ? '+' : ''}${deltaVentasPct.toFixed(1)}% vs. base`}
            up={deltaVentasPct >= 0}
            accent={colores.primario}
            spark={[
              baseResultado.ventas.media,
              actualResultado.ventas.min,
              actualResultado.ventas.media,
              actualResultado.ventas.max
            ]}
          />
          <HeroKPI
            i={1}
            label="Crédito colocado"
            value={`$${(actualResultado.monto.media / 1e6).toFixed(1)}M`}
            delta={`${deltaMontoPct >= 0 ? '+' : ''}${deltaMontoPct.toFixed(1)}% vs. base`}
            up={deltaMontoPct >= 0}
            accent="#2563EB"
            spark={[
              baseResultado.monto.media / 1e6,
              actualResultado.monto.min / 1e6,
              actualResultado.monto.media / 1e6,
              actualResultado.monto.max / 1e6
            ]}
          />
          <HeroKPI
            i={2}
            label="Morosidad estimada"
            value={`${actualResultado.morosidad.media.toFixed(1)}%`}
            delta={`${deltaMoraPts >= 0 ? '+' : ''}${deltaMoraPts.toFixed(1)} pts vs. base`}
            up={deltaMoraPts <= 0}
            accent={actualResultado.morosidad.media > 7 ? colores.peligro : colores.advertencia}
          />
          <HeroKPI
            i={3}
            label="Utilización asesores"
            value={`${Math.round(actualResultado.utilizacion.media)}%`}
            delta={`${vendedores} vendedores`}
            up={actualResultado.utilizacion.media <= 85}
            accent="#10B981"
          />
        </>
      }
    >
      {/* Alerta visible de datos sintéticos */}
      <Reveal delay={80}>
        <div style={{
          padding: '12px 18px',
          borderRadius: '14px',
          background: 'rgba(204, 0, 0, 0.06)',
          border: `1px solid ${colores.primario}30`,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <AlertTriangle size={18} color={colores.primario} style={{ flexShrink: 0 }} />
          <div style={{ flex: 1, fontSize: '12px', color: colores.textoClaro, lineHeight: 1.4 }}>
            <strong style={{ color: colores.primario }}>Datos simulados de ejemplo:</strong>{' '}
            Modelo de gemelo digital basado en eventos discretos (SimPy) calibrado a partir del log sintético de 2,000 casos. Los resultados muestran la media y rangos de {escenariosData.corridas} corridas estocásticas.
          </div>
          <span style={{
            fontSize: '11px',
            color: colores.textoMedio,
            fontFamily: 'monospace',
            whiteSpace: 'nowrap',
            background: colores.fondoTerciario,
            padding: '4px 8px',
            borderRadius: '6px'
          }}>
            Semilla base: 42
          </span>
        </div>
      </Reveal>

      {/* BARRA STICKY FLOTANTE DE CONTROL PERMANENTE */}
      <div style={{
        position: 'sticky',
        top: '12px',
        zIndex: 100,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        border: '1px solid #CBD5E1',
        borderRadius: '16px',
        padding: '10px 16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        transition: 'all 0.2s',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          {/* Título & Estado actual */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              background: `${colores.primario}12`,
              border: `1px solid ${colores.primario}30`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Sliders size={14} color={colores.primario} />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                Control de Escenario (En Vivo)
              </div>
              <div style={{ fontSize: '10px', color: '#64748B', fontFamily: 'monospace' }}>
                Dictamen: <strong>{opcionesAprobacion.find(o => o.valor === aprobacionH)?.label}</strong> · Tasa: <strong>{tasaDelta > 0 ? `+${tasaDelta}` : tasaDelta} pts</strong> · <strong>{vendedores} Asesores</strong>
              </div>
            </div>
          </div>

          {/* Los 4 Botones de Escenario Rápido */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => aplicarPreset(0, 0, 8)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: `1px solid ${aprobacionH === 0 && tasaDelta === 0 && vendedores === 8 ? colores.primario : '#CBD5E1'}`,
                background: aprobacionH === 0 && tasaDelta === 0 && vendedores === 8 ? colores.primario : '#FFFFFF',
                color: aprobacionH === 0 && tasaDelta === 0 && vendedores === 8 ? '#FFFFFF' : '#334155',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s',
                boxShadow: aprobacionH === 0 && tasaDelta === 0 && vendedores === 8 ? `0 2px 8px ${colores.primario}40` : 'none',
              }}
            >
              Escenario Base
            </button>
            <button
              onClick={() => aplicarPreset(24, 0, 8)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: `1px solid ${aprobacionH === 24 && tasaDelta === 0 && vendedores === 8 ? colores.primario : '#CBD5E1'}`,
                background: aprobacionH === 24 && tasaDelta === 0 && vendedores === 8 ? colores.primario : '#FFFFFF',
                color: aprobacionH === 24 && tasaDelta === 0 && vendedores === 8 ? '#FFFFFF' : '#334155',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s',
                boxShadow: aprobacionH === 24 && tasaDelta === 0 && vendedores === 8 ? `0 2px 8px ${colores.primario}40` : 'none',
              }}
            >
              a) Aprobación en 24 h
            </button>
            <button
              onClick={() => aplicarPreset(0, 2, 8)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: `1px solid ${aprobacionH === 0 && tasaDelta === 2 && vendedores === 8 ? colores.primario : '#CBD5E1'}`,
                background: aprobacionH === 0 && tasaDelta === 2 && vendedores === 8 ? colores.primario : '#FFFFFF',
                color: aprobacionH === 0 && tasaDelta === 2 && vendedores === 8 ? '#FFFFFF' : '#334155',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s',
                boxShadow: aprobacionH === 0 && tasaDelta === 2 && vendedores === 8 ? `0 2px 8px ${colores.primario}40` : 'none',
              }}
            >
              b) Tasa +2 puntos
            </button>
            <button
              onClick={() => aplicarPreset(0, 0, 10)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: `1px solid ${aprobacionH === 0 && tasaDelta === 0 && vendedores === 10 ? colores.primario : '#CBD5E1'}`,
                background: aprobacionH === 0 && tasaDelta === 0 && vendedores === 10 ? colores.primario : '#FFFFFF',
                color: aprobacionH === 0 && tasaDelta === 0 && vendedores === 10 ? '#FFFFFF' : '#334155',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s',
                boxShadow: aprobacionH === 0 && tasaDelta === 0 && vendedores === 10 ? `0 2px 8px ${colores.primario}40` : 'none',
              }}
            >
              c) +2 Vendedores
            </button>

            {/* Botón para desplegar mini-selectores */}
            <button
              onClick={() => setMostrarAjusteFino(!mostrarAjusteFino)}
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                background: mostrarAjusteFino ? '#F1F5F9' : '#FFFFFF',
                color: '#475569',
                fontSize: '10.5px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <SlidersHorizontal size={12} />
              Ajuste Fino
              {mostrarAjusteFino ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          </div>

          {/* Selector de Modo: Cockpit Panorámico vs Vista Detallada */}
          <div style={{ display: 'flex', gap: '3px', background: '#F1F5F9', padding: '3px', borderRadius: '8px', border: '1px solid #CBD5E1' }}>
            <button
              onClick={() => setModoCockpit(true)}
              style={{
                padding: '5px 10px',
                borderRadius: '6px',
                border: 'none',
                background: modoCockpit ? '#FFFFFF' : 'transparent',
                color: modoCockpit ? colores.primario : '#64748B',
                fontSize: '11px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: modoCockpit ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              <LayoutGrid size={12} /> Cockpit Panorámico
            </button>
            <button
              onClick={() => setModoCockpit(false)}
              style={{
                padding: '5px 10px',
                borderRadius: '6px',
                border: 'none',
                background: !modoCockpit ? '#FFFFFF' : 'transparent',
                color: !modoCockpit ? colores.primario : '#64748B',
                fontSize: '11px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: !modoCockpit ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              <SlidersHorizontal size={12} /> Vista Detallada
            </button>
          </div>

          {/* Micro KPIs de impacto instantáneo */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{
              padding: '4px 10px',
              borderRadius: '6px',
              background: deltaVentasPct >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              border: `1px solid ${deltaVentasPct >= 0 ? '#10B98140' : '#EF444440'}`,
              fontSize: '11px',
              fontWeight: 800,
              color: deltaVentasPct >= 0 ? '#059669' : '#DC2626',
              ...tnum,
            }}>
              {deltaVentasPct >= 0 ? '▲ +' : '▼ '}{deltaVentasPct.toFixed(1)}% ventas
            </div>
            <div style={{
              padding: '4px 10px',
              borderRadius: '6px',
              background: 'rgba(37, 99, 235, 0.08)',
              border: '1px solid rgba(37, 99, 235, 0.25)',
              fontSize: '11px',
              fontWeight: 800,
              color: '#2563EB',
              ...tnum,
            }}>
              ${(actualResultado.monto.media / 1e6).toFixed(1)}M colocado
            </div>
          </div>
        </div>

        {/* Drawer desplegable de ajuste fino con mini-selectores */}
        {mostrarAjusteFino && (
          <div style={{
            padding: '12px',
            borderRadius: '12px',
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '12px',
            marginTop: '2px',
          }}>
            <div>
              <div style={{ fontSize: '10px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
                1. TIEMPO DE APROBACIÓN
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
                {opcionesAprobacion.map(opt => (
                  <button
                    key={opt.valor}
                    onClick={() => setAprobacionH(opt.valor)}
                    style={{
                      padding: '6px 2px',
                      borderRadius: '6px',
                      border: `1px solid ${aprobacionH === opt.valor ? colores.primario : '#CBD5E1'}`,
                      background: aprobacionH === opt.valor ? colores.primario : '#FFFFFF',
                      color: aprobacionH === opt.valor ? '#FFFFFF' : '#475569',
                      fontSize: '9.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {opt.label.split(' ')[0]} {opt.label.split(' ')[1] || ''}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '10px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
                2. AJUSTE DE TASA
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
                {opcionesTasa.map(opt => (
                  <button
                    key={opt.valor}
                    onClick={() => setTasaDelta(opt.valor)}
                    style={{
                      padding: '6px 2px',
                      borderRadius: '6px',
                      border: `1px solid ${tasaDelta === opt.valor ? colores.primario : '#CBD5E1'}`,
                      background: tasaDelta === opt.valor ? colores.primario : '#FFFFFF',
                      color: tasaDelta === opt.valor ? '#FFFFFF' : '#475569',
                      fontSize: '9.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '10px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
                3. ASESORES EN PISO
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
                {opcionesVendedores.map(opt => (
                  <button
                    key={opt.valor}
                    onClick={() => setVendedores(opt.valor)}
                    style={{
                      padding: '6px 2px',
                      borderRadius: '6px',
                      border: `1px solid ${vendedores === opt.valor ? colores.primario : '#CBD5E1'}`,
                      background: vendedores === opt.valor ? colores.primario : '#FFFFFF',
                      color: vendedores === opt.valor ? '#FFFFFF' : '#475569',
                      fontSize: '9.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {modoCockpit ? (
        /* VISTA COCKPIT PANORÁMICO 2x2 (TODO VISIBLE EN 1 PANTALLA) */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(520px, 1fr))',
            gap: '16px',
            alignItems: 'stretch',
          }}>
            {/* Cuadrante 1: Simulación Viva de Flujo */}
            <div>
              <SimulacionViva
                base={baseResultado}
                actual={actualResultado}
                aprobacionH={aprobacionH}
                tasaDelta={tasaDelta}
                vendedores={vendedores}
                onEscenario={aplicarPreset}
              />
            </div>

            {/* Cuadrante 2: Motor Estocástico & Densidad Log-Normal */}
            <div>
              <MotorEstocasticoMatematico
                aprobacionH={aprobacionH}
                tasaDelta={tasaDelta}
                vendedores={vendedores}
                ventasMedia={actualResultado.ventas.media}
                ventasMin={actualResultado.ventas.min}
                ventasMax={actualResultado.ventas.max}
                creditoMedia={actualResultado.monto.media}
                morosidadMedia={actualResultado.morosidad.media}
              />
            </div>

            {/* Cuadrante 3: Fila de Asesores (Colas Kendall M/M/c) */}
            <div>
              <FilaAsesores vendedores={vendedores} utilizacion={actualResultado.utilizacion.media} />
            </div>

            {/* Cuadrante 4: Mapa Territorial de 13 Sucursales */}
            <div>
              <MapaAgencias ventasBase={baseResultado.ventas.media} ventasActual={actualResultado.ventas.media} />
            </div>
          </div>

          {/* Tarjeta de Diagnóstico Financiero de Cierre */}
          <Panel title="Diagnóstico de Comité Financiero & Rango de Sensibilidad">
            <div style={{
              padding: '14px 16px',
              borderRadius: '12px',
              background: `linear-gradient(135deg, ${colores.primario}08 0%, ${colores.primario}14 100%)`,
              border: `1px solid ${colores.primario}30`,
              marginBottom: '16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Zap size={16} color={colores.primario} />
                <span style={{ fontSize: '12px', fontWeight: 800, color: colores.primario, textTransform: 'uppercase' }}>
                  Lectura del comité financiero:
                </span>
              </div>
              <p style={{ fontSize: '12px', color: colores.textoClaro, margin: 0, lineHeight: 1.5 }}>
                {aprobacionH > 0 ? (
                  <>
                    Al topar el dictamen a <strong>{aprobacionH} horas</strong>, se recuperan prospectos que en el flujo base abandonan por fatiga de espera (<strong>{Math.round(actualResultado.aband_credito.media)}</strong> abandonos vs. {Math.round(baseResultado.aband_credito.media)} base). Esto incrementa el volumen colocado en <strong>${((actualResultado.monto.media - baseResultado.monto.media) / 1e6).toFixed(1)}M MXN</strong>.
                  </>
                ) : tasaDelta !== 0 ? (
                  <>
                    Modificar la tasa en <strong>{tasaDelta > 0 ? `+${tasaDelta}` : tasaDelta} pts</strong> genera un trade-off directo: {tasaDelta > 0 ? 'comprime la demanda de crédito y eleva la probabilidad de mora crediticia' : 'estimula la demanda pero reduce el spread financiero'}.
                  </>
                ) : vendedores !== 8 ? (
                  <>
                    Ajustar la plantilla a <strong>{vendedores} asesores</strong> modifica la tasa de ocupación del equipo comercial al <strong>{Math.round(actualResultado.utilizacion.media)}%</strong> (base: {Math.round(baseResultado.utilizacion.media)}%).
                  </>
                ) : (
                  <>
                    Escenario de calibración base con los parámetros históricos del log de procesos. Selecciona un escenario en la barra superior para explorar el impacto simultáneo.
                  </>
                )}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: colores.textoOscuro }}>
              <Info size={12} />
              <span>Simulación SimPy · Enganche 20% · Abandono por demora calibrado con censura exponencial · {escenariosData.casos} casos.</span>
            </div>
          </Panel>
        </div>
      ) : (
        /* VISTA DETALLADA VERTICAL */
        <>
          {/* SIMULACIÓN ANIMADA EN VIVO */}
          <Reveal delay={100}>
            <SimulacionViva
              base={baseResultado}
              actual={actualResultado}
              aprobacionH={aprobacionH}
              tasaDelta={tasaDelta}
              vendedores={vendedores}
              onEscenario={aplicarPreset}
            />
          </Reveal>

          {/* MOTOR ESTOCÁSTICO Y MATEMÁTICO */}
          <Reveal delay={115}>
            <MotorEstocasticoMatematico
              aprobacionH={aprobacionH}
              tasaDelta={tasaDelta}
              vendedores={vendedores}
              ventasMedia={actualResultado.ventas.media}
              ventasMin={actualResultado.ventas.min}
              ventasMax={actualResultado.ventas.max}
              creditoMedia={actualResultado.monto.media}
              morosidadMedia={actualResultado.morosidad.media}
            />
          </Reveal>

          <div className="row2">
            {/* PANEL IZQUIERDO: 3 SLIDERS DE CONTROL */}
            <Reveal delay={120}>
              <Panel title="Variables de simulación del gemelo digital">
                {/* Presets rápidos */}
                <div style={{ marginBottom: '18px' }}>
                  <span style={{ fontSize: '11px', color: colores.textoMedio, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                    Escenarios predefinidos para comités:
                  </span>
                  <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => aplicarPreset(0, 0, 8)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        border: `1px solid ${aprobacionH === 0 && tasaDelta === 0 && vendedores === 8 ? colores.primario : colores.borde}`,
                        background: aprobacionH === 0 && tasaDelta === 0 && vendedores === 8 ? `${colores.primario}15` : 'transparent',
                        color: aprobacionH === 0 && tasaDelta === 0 && vendedores === 8 ? colores.primario : colores.textoClaro,
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      Escenario Base
                    </button>
                    <button
                      onClick={() => aplicarPreset(24, 0, 8)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        border: `1px solid ${aprobacionH === 24 && tasaDelta === 0 && vendedores === 8 ? colores.primario : colores.borde}`,
                        background: aprobacionH === 24 && tasaDelta === 0 && vendedores === 8 ? `${colores.primario}15` : 'transparent',
                        color: aprobacionH === 24 && tasaDelta === 0 && vendedores === 8 ? colores.primario : colores.textoClaro,
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      a) Aprobación en 24 h
                    </button>
                    <button
                      onClick={() => aplicarPreset(0, 2, 8)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        border: `1px solid ${aprobacionH === 0 && tasaDelta === 2 && vendedores === 8 ? colores.primario : colores.borde}`,
                        background: aprobacionH === 0 && tasaDelta === 2 && vendedores === 8 ? `${colores.primario}15` : 'transparent',
                        color: aprobacionH === 0 && tasaDelta === 2 && vendedores === 8 ? colores.primario : colores.textoClaro,
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      b) Tasa +2 puntos
                    </button>
                    <button
                      onClick={() => aplicarPreset(0, 0, 10)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        border: `1px solid ${aprobacionH === 0 && tasaDelta === 0 && vendedores === 10 ? colores.primario : colores.borde}`,
                        background: aprobacionH === 0 && tasaDelta === 0 && vendedores === 10 ? `${colores.primario}15` : 'transparent',
                        color: aprobacionH === 0 && tasaDelta === 0 && vendedores === 10 ? colores.primario : colores.textoClaro,
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      c) +2 Vendedores
                    </button>
                  </div>
                </div>

                {/* SLIDER 1: TIEMPO DE APROBACIÓN */}
                <div style={{ marginBottom: '22px', padding: '16px', borderRadius: '14px', background: colores.fondoTerciario }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Clock size={16} color={colores.primario} />
                      <span style={{ fontSize: '13px', fontWeight: 700, color: colores.textoClaro }}>
                        1. Tiempo de aprobación financiera
                      </span>
                    </div>
                    <span style={{ ...tnum, fontSize: '13px', fontWeight: 800, color: colores.primario }}>
                      {opcionesAprobacion.find(o => o.valor === aprobacionH)?.label}
                    </span>
                  </div>
                  <p style={{ fontSize: '11px', color: colores.textoMedio, margin: '0 0 10px 0' }}>
                    {opcionesAprobacion.find(o => o.valor === aprobacionH)?.desc}. Reducir este tiempo retiene prospectos que abandonan por lentitud de dictamen.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                    {opcionesAprobacion.map(opt => (
                      <button
                        key={opt.valor}
                        onClick={() => setAprobacionH(opt.valor)}
                        style={{
                          padding: '8px 4px',
                          borderRadius: '8px',
                          border: `1px solid ${aprobacionH === opt.valor ? colores.primario : colores.borde}`,
                          background: aprobacionH === opt.valor ? colores.primario : colores.fondoSecundario,
                          color: aprobacionH === opt.valor ? '#fff' : colores.textoMedio,
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        {opt.label.split(' ')[0]} {opt.label.split(' ')[1] || ''}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SLIDER 2: AJUSTE DE TASA */}
                <div style={{ marginBottom: '22px', padding: '16px', borderRadius: '14px', background: colores.fondoTerciario }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <TrendingUp size={16} color={colores.primario} />
                      <span style={{ fontSize: '13px', fontWeight: 700, color: colores.textoClaro }}>
                        2. Ajuste de tasa de interés anual
                      </span>
                    </div>
                    <span style={{ ...tnum, fontSize: '13px', fontWeight: 800, color: tasaDelta > 0 ? colores.peligro : tasaDelta < 0 ? colores.exito : colores.textoClaro }}>
                      {tasaDelta > 0 ? `+${tasaDelta}` : tasaDelta} pts porcentuales
                    </span>
                  </div>
                  <p style={{ fontSize: '11px', color: colores.textoMedio, margin: '0 0 10px 0' }}>
                    {opcionesTasa.find(o => o.valor === tasaDelta)?.desc}. Impacta la conversión de cotización a crédito y la tasa de impago posterior.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                    {opcionesTasa.map(opt => (
                      <button
                        key={opt.valor}
                        onClick={() => setTasaDelta(opt.valor)}
                        style={{
                          padding: '8px 4px',
                          borderRadius: '8px',
                          border: `1px solid ${tasaDelta === opt.valor ? colores.primario : colores.borde}`,
                          background: tasaDelta === opt.valor ? colores.primario : colores.fondoSecundario,
                          color: tasaDelta === opt.valor ? '#fff' : colores.textoMedio,
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SLIDER 3: VENDEDORES */}
                <div style={{ padding: '16px', borderRadius: '14px', background: colores.fondoTerciario }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Users size={16} color={colores.primario} />
                      <span style={{ fontSize: '13px', fontWeight: 700, color: colores.textoClaro }}>
                        3. Capacidad de asesores (vendedores)
                      </span>
                    </div>
                    <span style={{ ...tnum, fontSize: '13px', fontWeight: 800, color: colores.textoClaro }}>
                      {vendedores} asesores en piso
                    </span>
                  </div>
                  <p style={{ fontSize: '11px', color: colores.textoMedio, margin: '0 0 10px 0' }}>
                    {opcionesVendedores.find(o => o.valor === vendedores)?.desc}. Evita que clientes abandonen por esperas excesivas en atención humana.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                    {opcionesVendedores.map(opt => (
                      <button
                        key={opt.valor}
                        onClick={() => setVendedores(opt.valor)}
                        style={{
                          padding: '8px 4px',
                          borderRadius: '8px',
                          border: `1px solid ${vendedores === opt.valor ? colores.primario : colores.borde}`,
                          background: vendedores === opt.valor ? colores.primario : colores.fondoSecundario,
                          color: vendedores === opt.valor ? '#fff' : colores.textoMedio,
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </Panel>
            </Reveal>

            {/* PANEL DERECHO: COMPARATIVA CONTRA BASE Y DETALLE FINANCIERO */}
            <Reveal delay={180}>
              <Panel title="Efecto simulado vs. Escenario Base">
                {/* Tarjetas comparativas de las 3 métricas clave */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '18px' }}>
                  <div style={{
                    padding: '14px 12px',
                    borderRadius: '12px',
                    background: colores.fondoTerciario,
                    border: `1px solid ${deltaVentasPct >= 0 ? colores.exito + '40' : colores.peligro + '40'}`,
                    textAlign: 'center'
                  }}>
                    <span style={{ fontSize: '10px', color: colores.textoMedio, textTransform: 'uppercase', fontWeight: 700 }}>
                      Ventas cerradas
                    </span>
                    <p style={{ ...tnum, fontSize: '20px', fontWeight: 800, margin: '4px 0 2px', color: colores.textoClaro }}>
                      {Math.round(actualResultado.ventas.media)}
                    </p>
                    <span style={{ ...tnum, fontSize: '11px', fontWeight: 700, color: deltaVentasPct >= 0 ? colores.exito : colores.peligro }}>
                      {deltaVentasPct >= 0 ? '▲ +' : '▼ '}{deltaVentasPct.toFixed(1)}%
                    </span>
                    <p style={{ fontSize: '9px', color: colores.textoOscuro, margin: '2px 0 0' }}>
                      rango: {Math.round(actualResultado.ventas.min)} - {Math.round(actualResultado.ventas.max)}
                    </p>
                  </div>

                  <div style={{
                    padding: '14px 12px',
                    borderRadius: '12px',
                    background: colores.fondoTerciario,
                    border: `1px solid ${deltaMontoPct >= 0 ? '#2563EB40' : colores.peligro + '40'}`,
                    textAlign: 'center'
                  }}>
                    <span style={{ fontSize: '10px', color: colores.textoMedio, textTransform: 'uppercase', fontWeight: 700 }}>
                      Crédito colocado
                    </span>
                    <p style={{ ...tnum, fontSize: '20px', fontWeight: 800, margin: '4px 0 2px', color: colores.textoClaro }}>
                      ${(actualResultado.monto.media / 1e6).toFixed(1)}M
                    </p>
                    <span style={{ ...tnum, fontSize: '11px', fontWeight: 700, color: deltaMontoPct >= 0 ? '#2563EB' : colores.peligro }}>
                      {deltaMontoPct >= 0 ? '▲ +' : '▼ '}{deltaMontoPct.toFixed(1)}%
                    </span>
                    <p style={{ fontSize: '9px', color: colores.textoOscuro, margin: '2px 0 0' }}>
                      rango: ${(actualResultado.monto.min / 1e6).toFixed(1)}M - ${(actualResultado.monto.max / 1e6).toFixed(1)}M
                    </p>
                  </div>

                  <div style={{
                    padding: '14px 12px',
                    borderRadius: '12px',
                    background: colores.fondoTerciario,
                    border: `1px solid ${deltaMoraPts <= 0 ? colores.exito + '40' : colores.peligro + '40'}`,
                    textAlign: 'center'
                  }}>
                    <span style={{ fontSize: '10px', color: colores.textoMedio, textTransform: 'uppercase', fontWeight: 700 }}>
                      Morosidad estimada
                    </span>
                    <p style={{ ...tnum, fontSize: '20px', fontWeight: 800, margin: '4px 0 2px', color: actualResultado.morosidad.media > 7 ? colores.peligro : colores.advertencia }}>
                      {actualResultado.morosidad.media.toFixed(1)}%
                    </p>
                    <span style={{ ...tnum, fontSize: '11px', fontWeight: 700, color: deltaMoraPts <= 0 ? colores.exito : colores.peligro }}>
                      {deltaMoraPts >= 0 ? '▲ +' : '▼ '}{deltaMoraPts.toFixed(1)} pts
                    </span>
                    <p style={{ fontSize: '9px', color: colores.textoOscuro, margin: '2px 0 0' }}>
                      rango: {actualResultado.morosidad.min.toFixed(1)}% - {actualResultado.morosidad.max.toFixed(1)}%
                    </p>
                  </div>
                </div>

                {/* Diagnóstico narrativo financiero */}
                <div style={{
                  padding: '14px 16px',
                  borderRadius: '12px',
                  background: `linear-gradient(135deg, ${colores.primario}08 0%, ${colores.primario}14 100%)`,
                  border: `1px solid ${colores.primario}30`,
                  marginBottom: '16px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <Zap size={16} color={colores.primario} />
                    <span style={{ fontSize: '12px', fontWeight: 800, color: colores.primario, textTransform: 'uppercase' }}>
                      Lectura del comité financiero:
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', color: colores.textoClaro, margin: 0, lineHeight: 1.5 }}>
                    {aprobacionH > 0 ? (
                      <>
                        Al topar el dictamen a <strong>{aprobacionH} horas</strong>, se recuperan prospectos que en el flujo base abandonan por fatiga de espera (<strong>{Math.round(actualResultado.aband_credito.media)}</strong> abandonos vs. {Math.round(baseResultado.aband_credito.media)} base). Esto incrementa el volumen colocado en <strong>${((actualResultado.monto.media - baseResultado.monto.media) / 1e6).toFixed(1)}M MXN</strong>.
                      </>
                    ) : tasaDelta !== 0 ? (
                      <>
                        Modificar la tasa en <strong>{tasaDelta > 0 ? `+${tasaDelta}` : tasaDelta} pts</strong> genera un trade-off directo: {tasaDelta > 0 ? 'comprime la demanda de crédito y eleva la probabilidad de mora crediticia' : 'estimula la demanda pero reduce el spread financiero'}.
                      </>
                    ) : vendedores !== 8 ? (
                      <>
                        Ajustar la plantilla a <strong>{vendedores} asesores</strong> modifica la tasa de ocupación del equipo comercial al <strong>{Math.round(actualResultado.utilizacion.media)}%</strong> (base: {Math.round(baseResultado.utilizacion.media)}%).
                      </>
                    ) : (
                      <>
                        Escenario de calibración base con los parámetros históricos del log de procesos. Selecciona un escenario o ajusta los controles para explorar la sensibilidad.
                      </>
                    )}
                  </p>
                </div>

                {/* Tabla resumen de los 4 escenarios clave */}
                <div>
                  <span style={{ fontSize: '11px', color: colores.textoMedio, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                    Tabla comparativa de escenarios base (10 corridas promedio):
                  </span>
                  <div style={{ marginTop: '8px', overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ borderBottom: `1px solid ${colores.borde}`, color: colores.textoMedio }}>
                          <th style={{ padding: '6px 8px' }}>Escenario</th>
                          <th style={{ padding: '6px 8px', textAlign: 'right' }}>Ventas</th>
                          <th style={{ padding: '6px 8px', textAlign: 'right' }}>Crédito (M)</th>
                          <th style={{ padding: '6px 8px', textAlign: 'right' }}>Morosidad</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(escenariosData.escenarios as Array<{ id: string; nombre: string; resultado: ResultadoMalla }>).map(esc => {
                          const esActivo =
                            (esc.id === 'base' && aprobacionH === 0 && tasaDelta === 0 && vendedores === 8) ||
                            (esc.id === 'a' && aprobacionH === 24 && tasaDelta === 0 && vendedores === 8) ||
                            (esc.id === 'b' && aprobacionH === 0 && tasaDelta === 2 && vendedores === 8) ||
                            (esc.id === 'c' && aprobacionH === 0 && tasaDelta === 0 && vendedores === 10);

                          return (
                            <tr
                              key={esc.id}
                              style={{
                                borderBottom: `1px solid ${colores.borde}40`,
                                background: esActivo ? `${colores.primario}10` : 'transparent',
                                fontWeight: esActivo ? 700 : 500,
                              }}
                            >
                              <td style={{ padding: '8px 8px', color: esActivo ? colores.primario : colores.textoClaro }}>
                                {esc.nombre}
                              </td>
                              <td style={{ padding: '8px 8px', textAlign: 'right', ...tnum }}>
                                {Math.round(esc.resultado.ventas.media)}
                              </td>
                              <td style={{ padding: '8px 8px', textAlign: 'right', ...tnum }}>
                                ${(esc.resultado.monto.media / 1e6).toFixed(1)}M
                              </td>
                              <td style={{ padding: '8px 8px', textAlign: 'right', ...tnum, color: esc.resultado.morosidad.media > 6.5 ? colores.peligro : colores.textoClaro }}>
                                {esc.resultado.morosidad.media.toFixed(1)}%
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Supuestos metodológicos */}
                <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: colores.textoOscuro }}>
                  <Info size={12} />
                  <span>Simulación SimPy · Enganche 20% · Abandono por demora calibrado con censura exponencial · {escenariosData.casos} casos.</span>
                </div>
              </Panel>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <FilaAsesores vendedores={vendedores} utilizacion={actualResultado.utilizacion.media} />
          </Reveal>

          <Reveal delay={160}>
            <MapaAgencias ventasBase={baseResultado.ventas.media} ventasActual={actualResultado.ventas.media} />
          </Reveal>
        </>
      )}
    </Shell>

  );
};
