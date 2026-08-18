import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Building2,
  DollarSign,
  TrendingDown,
  TrendingUp,
  Activity,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Flame,
  Zap,
  Clock,
  ArrowUpRight,
  Filter,
  BarChart3,
  BrainCircuit,
  RefreshCw,
  Bell,
  Download,
  X,
  FileText,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { brandingConfig } from '../config/branding';
import { HeroCard } from '../components/modules/dashboardModules/Herocard';
import { INMUEBLES_SAMPLE, ALERTAS_CRITICAS_SAMPLE, MODULOS_RISKO } from './riskoData';

interface RiskoDashboardProps {
  onSelectModulo: (moduloId: string) => void;
}

const KPIS = [
  {
    label: 'Exposición Total Expuesta',
    value: '$45.8B USD',
    sub: '1,450 Activos Inmobiliarios',
    icon: Building2,
    color: '#2563EB',
    bg: '#EFF6FF',
    trend: '+3.2%',
    trendUp: true,
  },
  {
    label: 'AAL Promedio Cartera',
    value: '$82.4M',
    sub: 'Pérdida anual ponderada NatCat',
    icon: Activity,
    color: '#F59E0B',
    bg: '#FFFBEB',
    trend: '0.18%',
    trendUp: null,
  },
  {
    label: 'PML Máximo (250 Yrs)',
    value: '$420M USD',
    sub: 'Escenario sismo interplaca CDMX',
    icon: ShieldAlert,
    color: '#EF4444',
    bg: '#FEF2F2',
    trend: '-2.1%',
    trendUp: false,
  },
  {
    label: 'Brecha Infraseguro',
    value: '$11.2M USD',
    sub: '14 Inmuebles desactualizados',
    icon: DollarSign,
    color: '#F97316',
    bg: '#FFF7ED',
    trend: '+1.4%',
    trendUp: false,
  },
];

const RADAR_AXES = [
  { dim: 'Geografía y NatCat (Sismo / Inundación)', score: 68, color: '#EF4444' },
  { dim: 'Terreno y Geotecnia', score: 32, color: '#10B981' },
  { dim: 'Construcción y Estructura', score: 45, color: '#F59E0B' },
  { dim: 'Incendio y Explosión (NFPA)', score: 58, color: '#F97316' },
  { dim: 'Instalaciones y Equipos Críticos', score: 38, color: '#10B981' },
  { dim: 'Ocupación y Operación', score: 29, color: '#10B981' },
  { dim: 'Continuidad de Negocio (BI)', score: 52, color: '#F59E0B' },
  { dim: 'Valuación e Infraseguro', score: 41, color: '#F59E0B' },
];

export const RiskoDashboard: React.FC<RiskoDashboardProps> = ({ onSelectModulo }) => {
  const { colores } = brandingConfig;
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [animatedBars, setAnimatedBars] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedInmuebleModal, setSelectedInmuebleModal] = useState<typeof INMUEBLES_SAMPLE[0] | null>(null);
  const [exportingReport, setExportingReport] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimatedBars(true), 200);
    return () => clearTimeout(t);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastUpdate(new Date());
      setIsRefreshing(false);
      showToast('✅ Datos de cartera, telemetría y sensores actualizados en tiempo real');
    }, 900);
  };

  const handleExportExecutiveReport = () => {
    setExportingReport(true);
    setTimeout(() => {
      setExportingReport(false);
      showToast('📄 Reporte Ejecutivo de Cartera Q3-2026 generado y descargado con éxito (PDF)');
    }, 1800);
  };

  const inmueblesFiltrados = filtroTipo === 'todos'
    ? INMUEBLES_SAMPLE
    : INMUEBLES_SAMPLE.filter(i => i.nivelRiesgo.toLowerCase() === filtroTipo);

  const getRiesgoColor = (score: number) =>
    score >= 80 ? '#EF4444' : score >= 60 ? '#F97316' : score >= 40 ? '#D97706' : '#10B981';

  return (
    <div style={{ padding: '28px', backgroundColor: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#0F172A',
          color: '#FFFFFF',
          padding: '14px 20px',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
          fontSize: '13px',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 9999,
          animation: 'fadeSlideUp 0.3s ease both'
        }}>
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0 }}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* ── ENCABEZADO Y FILTROS GLOBALES ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          paddingBottom: '20px',
          borderBottom: `1px solid ${colores.borde}`,
          animation: 'fadeSlideDown 0.4s ease both',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
            <div style={{
              width: '10px', height: '10px', borderRadius: '50%',
              backgroundColor: '#10B981',
              boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.2)',
              animation: 'pulseGlow 2s infinite',
            }} />
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: colores.textoClaro, letterSpacing: '-0.02em' }}>
              Command Center Ejecutivo · RISKO AI
            </h1>
          </div>
          <p style={{ margin: 0, fontSize: '13px', color: colores.textoOscuro }}>
            Gestión Consolidada de Cartera Inmobiliaria, Exposición Multiamenaza &amp; Resiliencia
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Botón de Actualizar */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '10px',
              border: `1px solid ${colores.borde}`,
              backgroundColor: '#F8FAFC',
              color: colores.textoClaro,
              fontSize: '12px',
              fontWeight: '700',
              cursor: isRefreshing ? 'wait' : 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <RefreshCw size={13} style={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
            {isRefreshing ? 'Actualizando...' : `Actualizado ${lastUpdate.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}`}
          </button>

          {/* Botón Exportar Reporte Ejecutivo */}
          <button
            onClick={handleExportExecutiveReport}
            disabled={exportingReport}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '10px',
              border: `1px solid ${colores.primario}`,
              backgroundColor: colores.primarioClaro,
              color: colores.primario,
              fontSize: '12px',
              fontWeight: '700',
              cursor: exportingReport ? 'wait' : 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <Download size={13} />
            {exportingReport ? 'Generando PDF...' : 'Exportar Reporte Ejecutivo'}
          </button>

          {/* Filtros */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '600', color: colores.textoOscuro }}>
            <Filter size={14} />
            <span>Riesgo:</span>
          </div>
          {['todos', 'crítico', 'alto', 'moderado', 'bajo'].map(nivel => (
            <button
              key={nivel}
              onClick={() => setFiltroTipo(nivel)}
              style={{
                padding: '5px 12px',
                borderRadius: '8px',
                border: `1px solid ${filtroTipo === nivel ? colores.primario : colores.borde}`,
                backgroundColor: filtroTipo === nivel ? colores.primario : '#F8FAFC',
                color: filtroTipo === nivel ? '#FFFFFF' : colores.textoMedio,
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'capitalize',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {nivel}
            </button>
          ))}
        </div>
      </div>

      {/* ── FILA 1: KPIs ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {KPIS.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div
              key={i}
              style={{
                padding: '20px',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: `1px solid ${colores.borde}`,
                boxShadow: '0 2px 8px rgba(15,23,42,0.04)',
                animation: `fadeSlideUp 0.4s ease ${i * 0.08}s both`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                backgroundColor: kpi.color, borderRadius: '16px 16px 0 0',
              }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: colores.textoOscuro, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {kpi.label}
                </span>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  backgroundColor: kpi.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={18} color={kpi.color} />
                </div>
              </div>

              <div style={{ fontSize: '26px', fontWeight: '800', color: colores.textoClaro, lineHeight: 1.1, marginBottom: '6px' }}>
                {kpi.value}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p style={{ margin: 0, fontSize: '11px', color: colores.textoOscuro }}>{kpi.sub}</p>
                {kpi.trend && (
                  <span style={{
                    fontSize: '11px', fontWeight: '700',
                    color: kpi.trendUp === true ? '#10B981' : kpi.trendUp === false ? '#EF4444' : colores.textoOscuro,
                    display: 'flex', alignItems: 'center', gap: '2px',
                  }}>
                    {kpi.trendUp === true && <TrendingUp size={11} />}
                    {kpi.trendUp === false && <TrendingDown size={11} />}
                    {kpi.trend}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── FILA 2: HERO CARD (Asistente Copilot) ── */}
      <div style={{ animation: 'fadeSlideUp 0.4s ease 0.35s both', width: '100%' }}>
        <HeroCard onNavigate={onSelectModulo} />
      </div>

      {/* ── FILA 3: RADAR MULTIRRIESGO & ALERTAS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>

        {/* Radar Multirriesgo */}
        <div
          style={{
            padding: '24px',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: `1px solid ${colores.borde}`,
            boxShadow: '0 2px 8px rgba(15,23,42,0.04)',
            animation: 'fadeSlideUp 0.4s ease 0.45s both',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colores.textoClaro }}>
                Perfil Multirriesgo de Cartera
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '12px', color: colores.textoOscuro }}>8 dimensiones de riesgo</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => onSelectModulo('motor-riesgo-escenarios')}
                style={{
                  fontSize: '11px', fontWeight: '700', color: colores.primario,
                  backgroundColor: '#EFF6FF', padding: '4px 12px', borderRadius: '20px',
                  border: '1px solid #BFDBFE', cursor: 'pointer'
                }}
              >
                Ver Motor &rarr;
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {RADAR_AXES.map((eje, idx) => (
              <div key={idx} style={{ animation: `fadeSlideUp 0.3s ease ${0.5 + idx * 0.05}s both` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', color: colores.textoClaro, marginBottom: '5px' }}>
                  <span>{eje.dim}</span>
                  <span style={{ color: eje.color, fontWeight: '700' }}>{eje.score} pts</span>
                </div>
                <div style={{ width: '100%', height: '7px', backgroundColor: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: animatedBars ? `${eje.score}%` : '0%',
                      height: '100%',
                      backgroundColor: eje.color,
                      borderRadius: '4px',
                      transition: `width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.06}s`,
                      boxShadow: `0 0 6px ${eje.color}60`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alertas Críticas */}
        <div
          style={{
            padding: '24px',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: `1px solid ${colores.borde}`,
            boxShadow: '0 2px 8px rgba(15,23,42,0.04)',
            animation: 'fadeSlideUp 0.4s ease 0.5s both',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '10px', height: '10px', borderRadius: '50%',
                backgroundColor: '#EF4444',
                animation: 'pulseGlow 1.5s infinite',
              }} />
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colores.textoClaro }}>
                Alertas &amp; Eventos Activos
              </h3>
            </div>
            <span style={{
              fontSize: '11px', fontWeight: '700', color: '#EF4444',
              backgroundColor: '#FEF2F2', padding: '4px 12px', borderRadius: '20px',
              border: '1px solid #FCA5A5',
              display: 'flex', alignItems: 'center', gap: '4px',
            }}>
              <Bell size={11} />
              3 Inmediatas
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {ALERTAS_CRITICAS_SAMPLE.map((alerta, idx) => {
              const isCrit = alerta.severidad === 'Crítica';
              return (
                <div
                  key={alerta.id}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '12px',
                    backgroundColor: isCrit ? '#FEF2F2' : '#FFF7ED',
                    borderLeft: `4px solid ${isCrit ? '#EF4444' : '#F97316'}`,
                    border: `1px solid ${isCrit ? '#FCA5A5' : '#FED7AA'}`,
                    animation: `fadeSlideUp 0.3s ease ${0.6 + idx * 0.08}s both`,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <span style={{ fontWeight: '700', fontSize: '13px', color: colores.textoClaro, lineHeight: 1.3 }}>
                      {alerta.evento}
                    </span>
                    <span style={{
                      fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '6px',
                      backgroundColor: isCrit ? '#EF4444' : '#F97316', color: '#FFFFFF',
                      flexShrink: 0, marginLeft: '8px',
                    }}>
                      {alerta.severidad}
                    </span>
                  </div>
                  <p style={{ margin: '0 0 8px', fontSize: '12px', color: colores.textoOscuro }}>
                    Fuente: {alerta.fuente} · {alerta.inmueblesAfectados} inmuebles afectados
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontWeight: '600' }}>
                    <span style={{ color: isCrit ? '#EF4444' : '#F97316', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={11} />
                      SLA: {alerta.plazo}
                    </span>
                    <button
                      onClick={() => {
                        showToast(`📢 Plan de acción activado para: ${alerta.evento}`);
                      }}
                      style={{
                        padding: '3px 8px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: '#FFFFFF',
                        color: isCrit ? '#EF4444' : '#D97706',
                        fontSize: '11px',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      Atender SLA
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── FILA 4: TABLA TOP INMUEBLES ── */}
      <div
        style={{
          padding: '24px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: `1px solid ${colores.borde}`,
          boxShadow: '0 2px 8px rgba(15,23,42,0.04)',
          animation: 'fadeSlideUp 0.4s ease 0.6s both',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: colores.textoClaro }}>
              Top Inmuebles en Riesgo &amp; Clase de Asegurabilidad
            </h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: colores.textoOscuro }}>
              Evaluación viva por activo con asignación de inspector
            </p>
          </div>
          <button
            onClick={() => onSelectModulo('expediente-digital')}
            style={{
              padding: '8px 16px', borderRadius: '10px',
              border: `1px solid ${colores.primario}`,
              backgroundColor: '#EFF6FF', color: colores.primario,
              fontSize: '12px', fontWeight: '700', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px',
              transition: 'all 0.15s ease',
            }}
          >
            Ver Todos en Expediente
            <ArrowUpRight size={14} />
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: `2px solid ${colores.borde}` }}>
                {['Inmueble / Tipología', 'Ubicación', 'Score Riesgo', 'Clase', 'PML Estimado', 'Mitigaciones', 'Acción'].map(h => (
                  <th key={h} style={{ padding: '12px 14px', color: colores.textoOscuro, fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {inmueblesFiltrados.map((inm, idx) => {
                const scoreColor = getRiesgoColor(inm.scoreRiesgo);
                const scoreBg = inm.scoreRiesgo >= 80 ? '#FEF2F2' : inm.scoreRiesgo >= 60 ? '#FFF7ED' : inm.scoreRiesgo >= 40 ? '#FFFBEB' : '#ECFDF5';
                return (
                  <tr
                    key={inm.id}
                    style={{
                      borderBottom: `1px solid ${colores.borde}`,
                      animation: `fadeSlideUp 0.3s ease ${0.65 + idx * 0.05}s both`,
                      transition: 'background-color 0.15s ease',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedInmuebleModal(inm)}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td style={{ padding: '14px', fontWeight: '700', color: colores.textoClaro }}>
                      {inm.nombre}
                      <div style={{ fontSize: '11px', fontWeight: '400', color: colores.textoOscuro, marginTop: '2px' }}>{inm.tipo}</div>
                    </td>
                    <td style={{ padding: '14px', color: colores.textoMedio, fontSize: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={12} color={colores.textoOscuro} />
                        {inm.ubicacion}
                      </div>
                    </td>
                    <td style={{ padding: '14px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: '4px',
                          padding: '3px 10px', borderRadius: '12px',
                          fontWeight: '700', fontSize: '12px',
                          backgroundColor: scoreBg, color: scoreColor,
                        }}>
                          {inm.scoreRiesgo} / 100
                        </span>
                        <div style={{ width: '80px', height: '4px', backgroundColor: '#F1F5F9', borderRadius: '2px', overflow: 'hidden' }}>
                          <div style={{ width: animatedBars ? `${inm.scoreRiesgo}%` : '0%', height: '100%', backgroundColor: scoreColor, borderRadius: '2px', transition: `width 0.8s ease ${idx * 0.07}s` }} />
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px', fontWeight: '800', color: colores.primario, fontSize: '14px' }}>
                      Clase {inm.claseAsegurabilidad}
                    </td>
                    <td style={{ padding: '14px', fontWeight: '600', color: colores.textoClaro }}>{inm.pml}</td>
                    <td style={{ padding: '14px' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '4px',
                        fontSize: '11px', fontWeight: '700',
                        color: inm.mitigacionesAbiertas > 5 ? '#EF4444' : inm.mitigacionesAbiertas > 2 ? '#F59E0B' : '#10B981',
                      }}>
                        {inm.mitigacionesAbiertas > 5 && <AlertTriangle size={11} />}
                        {inm.mitigacionesAbiertas} abiertas
                      </span>
                    </td>
                    <td style={{ padding: '14px' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedInmuebleModal(inm);
                        }}
                        style={{
                          padding: '6px 12px', borderRadius: '8px', border: 'none',
                          backgroundColor: colores.primario, color: '#FFFFFF',
                          fontSize: '11px', fontWeight: '700', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', gap: '4px',
                          transition: 'all 0.15s ease',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = colores.primarioOscuro)}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = colores.primario)}
                      >
                        Ver Ficha
                        <ArrowUpRight size={11} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DETALLE DE INMUEBLE */}
      {selectedInmuebleModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '20px',
          animation: 'fadeIn 0.2s ease both'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            maxWidth: '600px',
            width: '100%',
            padding: '28px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: `1px solid ${colores.borde}`,
            animation: 'fadeSlideUp 0.3s ease both'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '800', color: colores.primario, backgroundColor: '#EFF6FF', padding: '3px 8px', borderRadius: '6px' }}>
                  {selectedInmuebleModal.id} · {selectedInmuebleModal.tipo}
                </span>
                <h2 style={{ margin: '8px 0 2px', fontSize: '20px', fontWeight: '800', color: colores.textoClaro }}>
                  {selectedInmuebleModal.nombre}
                </h2>
                <p style={{ margin: 0, fontSize: '13px', color: colores.textoOscuro }}>
                  📍 {selectedInmuebleModal.ubicacion}
                </p>
              </div>
              <button
                onClick={() => setSelectedInmuebleModal(null)}
                style={{ background: 'none', border: 'none', color: colores.textoOscuro, cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '24px' }}>
              <div style={{ padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: `1px solid ${colores.borde}` }}>
                <span style={{ fontSize: '11px', color: colores.textoOscuro, display: 'block' }}>Valor de Reposición VRN</span>
                <span style={{ fontSize: '18px', fontWeight: '800', color: colores.primario }}>{selectedInmuebleModal.valorReposicion}</span>
              </div>
              <div style={{ padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: `1px solid ${colores.borde}` }}>
                <span style={{ fontSize: '11px', color: colores.textoOscuro, display: 'block' }}>Score Global / Clase</span>
                <span style={{ fontSize: '18px', fontWeight: '800', color: getRiesgoColor(selectedInmuebleModal.scoreRiesgo) }}>
                  {selectedInmuebleModal.scoreRiesgo}/100 · Clase {selectedInmuebleModal.claseAsegurabilidad}
                </span>
              </div>
              <div style={{ padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: `1px solid ${colores.borde}` }}>
                <span style={{ fontSize: '11px', color: colores.textoOscuro, display: 'block' }}>PML Pérdida Máxima</span>
                <span style={{ fontSize: '16px', fontWeight: '800', color: '#EF4444' }}>{selectedInmuebleModal.pml}</span>
              </div>
              <div style={{ padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: `1px solid ${colores.borde}` }}>
                <span style={{ fontSize: '11px', color: colores.textoOscuro, display: 'block' }}>AAL Anualizado</span>
                <span style={{ fontSize: '14px', fontWeight: '700', color: colores.textoClaro }}>{selectedInmuebleModal.aal}</span>
              </div>
            </div>

            <div style={{ padding: '14px', backgroundColor: '#EFF6FF', borderRadius: '12px', border: '1px solid #BFDBFE', fontSize: '12px', color: colores.textoClaro, marginBottom: '24px' }}>
              👤 <strong>Perito Asignado:</strong> {selectedInmuebleModal.inspectorAsignado} · {selectedInmuebleModal.mitigacionesAbiertas} tareas de mitigación CAPEX activas.
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => {
                  setSelectedInmuebleModal(null);
                  onSelectModulo('expediente-digital');
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: colores.primario,
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <FileText size={16} /> Abrir Expediente Digital
              </button>
              <button
                onClick={() => {
                  setSelectedInmuebleModal(null);
                  onSelectModulo('georisk-studio');
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px',
                  border: `1px solid ${colores.borde}`,
                  backgroundColor: '#F8FAFC',
                  color: colores.textoClaro,
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <MapPin size={16} /> Ver en GeoRisk Studio
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          50%       { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
