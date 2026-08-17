import React, { useState } from 'react';
import {
  ShieldAlert,
  Building2,
  DollarSign,
  TrendingDown,
  Activity,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Flame,
  Zap,
  Clock,
  PieChart,
  ArrowUpRight,
  Filter,
  BarChart3,
  BrainCircuit
} from 'lucide-react';
import { brandingConfig } from '../config/branding';
import { HeroCard } from '../components/modules/dashboardModules/Herocard';
import { INMUEBLES_SAMPLE, ALERTAS_CRITICAS_SAMPLE, MODULOS_RISKO } from './riskoData';

interface RiskoDashboardProps {
  onSelectModulo: (moduloId: string) => void;
}

export const RiskoDashboard: React.FC<RiskoDashboardProps> = ({ onSelectModulo }) => {
  const { colores } = brandingConfig;
  const [filtroTipo, setFiltroTipo] = useState('todos');

  // Filtrado de inmuebles de muestra
  const inmueblesFiltrados = filtroTipo === 'todos'
    ? INMUEBLES_SAMPLE
    : INMUEBLES_SAMPLE.filter(i => i.nivelRiesgo.toLowerCase() === filtroTipo);

  return (
    <div
      style={{
        padding: '28px',
        backgroundColor: '#FFFFFF',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}
    >
      {/* ── ENCABEZADO Y FILTROS GLOBALES DE CARTERA ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          paddingBottom: '16px',
          borderBottom: `1px solid ${colores.borde}`
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: colores.textoClaro, letterSpacing: '-0.02em' }}>
            Command Center Ejecutivo · RISKO AI
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: colores.textoOscuro }}>
            Gestión Consolidada de Cartera Inmobiliaria, Exposición Multiamenaza & Resiliencia
          </p>
        </div>

        {/* Filtros de Cartera */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '600', color: colores.textoOscuro }}>
            <Filter size={15} />
            <span>Nivel de Riesgo:</span>
          </div>
          {['todos', 'crítico', 'alto', 'moderado', 'bajo'].map((nivel) => (
            <button
              key={nivel}
              onClick={() => setFiltroTipo(nivel)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: `1px solid ${filtroTipo === nivel ? colores.primario : colores.borde}`,
                backgroundColor: filtroTipo === nivel ? colores.primario : '#F8FAFC',
                color: filtroTipo === nivel ? '#FFFFFF' : colores.textoMedio,
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'capitalize',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {nivel}
            </button>
          ))}
        </div>
      </div>

      {/* ── FILA 1: KPIs DE EXPOSICIÓN GLOBAL ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px'
        }}
      >
        {/* KPI 1: Exposición Total */}
        <div
          style={{
            padding: '20px',
            backgroundColor: '#F8FAFC',
            borderRadius: '16px',
            border: `1px solid ${colores.borde}`,
            boxShadow: '0 2px 6px rgba(15, 23, 42, 0.03)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: colores.textoOscuro, textTransform: 'uppercase' }}>
              Exposición Total Expuesta
            </span>
            <Building2 size={20} color={colores.primario} />
          </div>
          <div style={{ fontSize: '26px', fontWeight: '800', color: colores.textoClaro }}>
            $45.8B USD
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#10B981', fontWeight: '600' }}>
            1,450 Activos Inmobiliarios
          </p>
        </div>

        {/* KPI 2: Pérdida Anual Esperada (AAL) */}
        <div
          style={{
            padding: '20px',
            backgroundColor: '#F8FAFC',
            borderRadius: '16px',
            border: `1px solid ${colores.borde}`,
            boxShadow: '0 2px 6px rgba(15, 23, 42, 0.03)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: colores.textoOscuro, textTransform: 'uppercase' }}>
              AAL Promedio Cartera
            </span>
            <Activity size={20} color="#F59E0B" />
          </div>
          <div style={{ fontSize: '26px', fontWeight: '800', color: colores.textoClaro }}>
            $82.4M USD <span style={{ fontSize: '14px', color: colores.textoOscuro }}>(0.18%)</span>
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '11px', color: colores.textoOscuro, fontWeight: '500' }}>
            Pérdida anual ponderada NatCat
          </p>
        </div>

        {/* KPI 3: PML Máximo Estimado */}
        <div
          style={{
            padding: '20px',
            backgroundColor: '#F8FAFC',
            borderRadius: '16px',
            border: `1px solid ${colores.borde}`,
            boxShadow: '0 2px 6px rgba(15, 23, 42, 0.03)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: colores.textoOscuro, textTransform: 'uppercase' }}>
              PML Máximo (250 Yrs)
            </span>
            <ShieldAlert size={20} color="#EF4444" />
          </div>
          <div style={{ fontSize: '26px', fontWeight: '800', color: '#EF4444' }}>
            $420M USD
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '11px', color: colores.textoOscuro, fontWeight: '500' }}>
            Escenario sismo interplaca CDMX
          </p>
        </div>

        {/* KPI 4: Brecha de Cobertura / Infraseguro */}
        <div
          style={{
            padding: '20px',
            backgroundColor: '#F8FAFC',
            borderRadius: '16px',
            border: `1px solid ${colores.borde}`,
            boxShadow: '0 2px 6px rgba(15, 23, 42, 0.03)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: colores.textoOscuro, textTransform: 'uppercase' }}>
              Brecha Infraseguro
            </span>
            <DollarSign size={20} color="#F97316" />
          </div>
          <div style={{ fontSize: '26px', fontWeight: '800', color: '#F97316' }}>
            $11.2M USD
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#EF4444', fontWeight: '600' }}>
            14 Inmuebles desactualizados
          </p>
        </div>
      </div>

      {/* ── FILA 2: ASISTENTE INTELIGENTE RISKO COPILOT (UBICADO EN EL CENTRO) ── */}
      <div style={{ width: '100%' }}>
        <HeroCard onNavigate={onSelectModulo} />
      </div>

      {/* ── FILA 3: RADAR MULTIRRIESGO & ALERTAS CRÍTICAS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        {/* Radar Multirriesgo Visual */}
        <div
          style={{
            padding: '24px',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: `1px solid ${colores.borde}`,
            boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colores.textoClaro }}>
              Perfil Multirriesgo de Cartera (8 Ejes)
            </h3>
            <span style={{ fontSize: '11px', fontWeight: '700', color: colores.primario, backgroundColor: '#EFF6FF', padding: '4px 10px', borderRadius: '12px' }}>
              Score Global: 46 / 100 (Moderado)
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { dim: 'Geografía y NatCat (Sismo / Inundación)', score: 68, color: '#EF4444' },
              { dim: 'Terreno y Geotecnia', score: 32, color: '#10B981' },
              { dim: 'Construcción y Estructura', score: 45, color: '#F59E0B' },
              { dim: 'Incendio y Explosión (NFPA)', score: 58, color: '#F97316' },
              { dim: 'Instalaciones y Equipos Críticos', score: 38, color: '#10B981' },
              { dim: 'Ocupación y Operación', score: 29, color: '#10B981' },
              { dim: 'Continuidad de Negocio (BI)', score: 52, color: '#F59E0B' },
              { dim: 'Valuación e Infraseguro', score: 41, color: '#F59E0B' },
            ].map((eje, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', color: colores.textoClaro, marginBottom: '4px' }}>
                  <span>{eje.dim}</span>
                  <span style={{ color: eje.color }}>{eje.score} pts</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${eje.score}%`,
                      height: '100%',
                      backgroundColor: eje.color,
                      borderRadius: '4px',
                      transition: 'width 0.4s ease'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel de Alertas Críticas */}
        <div
          style={{
            padding: '24px',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: `1px solid ${colores.borde}`,
            boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colores.textoClaro }}>
              Alertas & Eventos Activos
            </h3>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#EF4444', backgroundColor: '#FEF2F2', padding: '4px 10px', borderRadius: '12px' }}>
              3 Alertas Inmediatas
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {ALERTAS_CRITICAS_SAMPLE.map((alerta) => (
              <div
                key={alerta.id}
                style={{
                  padding: '14px',
                  borderRadius: '12px',
                  backgroundColor: '#F8FAFC',
                  borderLeft: `4px solid ${alerta.severidad === 'Crítica' ? '#EF4444' : '#F97316'}`,
                  border: `1px solid ${colores.borde}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '700', fontSize: '13px', color: colores.textoClaro }}>
                    {alerta.evento}
                  </span>
                  <span style={{ fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '4px', backgroundColor: alerta.severidad === 'Crítica' ? '#EF4444' : '#F97316', color: '#FFFFFF' }}>
                    {alerta.severidad}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '12px', color: colores.textoOscuro }}>
                  Fuente: {alerta.fuente} · Afectados: {alerta.inmueblesAfectados} inmuebles
                </p>
                <div style={{ marginTop: '8px', fontSize: '11px', fontWeight: '600', color: colores.primario, display: 'flex', justifyContent: 'space-between' }}>
                  <span>SLA Respuesta: {alerta.plazo}</span>
                  <span>Resp: {alerta.propietario}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FILA 4: TABLA DE TOP INMUEBLES EN RIESGO & ASEGURABILIDAD ── */}
      <div
        style={{
          padding: '24px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: `1px solid ${colores.borde}`,
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: colores.textoClaro }}>
              Top Inmuebles en Riesgo & Clase de Asegurabilidad
            </h3>
            <p style={{ margin: 0, fontSize: '12px', color: colores.textoOscuro }}>
              Evaluación viva por activo con asignación de inspector y métricas de pérdida
            </p>
          </div>

          <button
            onClick={() => onSelectModulo('expediente-digital')}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: `1px solid ${colores.primario}`,
              backgroundColor: '#EFF6FF',
              color: colores.primario,
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Ver Todos los Expedientes
          </button>
        </div>

        {/* Tabla Responsive de Inmuebles */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: `2px solid ${colores.borde}` }}>
                <th style={{ padding: '12px', color: colores.textoOscuro, fontWeight: '700' }}>Inmueble / Tipología</th>
                <th style={{ padding: '12px', color: colores.textoOscuro, fontWeight: '700' }}>Ubicación</th>
                <th style={{ padding: '12px', color: colores.textoOscuro, fontWeight: '700' }}>Score Riesgo</th>
                <th style={{ padding: '12px', color: colores.textoOscuro, fontWeight: '700' }}>Asegurabilidad</th>
                <th style={{ padding: '12px', color: colores.textoOscuro, fontWeight: '700' }}>PML Estimado</th>
                <th style={{ padding: '12px', color: colores.textoOscuro, fontWeight: '700' }}>Mitigaciones</th>
                <th style={{ padding: '12px', color: colores.textoOscuro, fontWeight: '700' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {inmueblesFiltrados.map((inmueble) => (
                <tr key={inmueble.id} style={{ borderBottom: `1px solid ${colores.borde}` }}>
                  <td style={{ padding: '12px', fontWeight: '700', color: colores.textoClaro }}>
                    {inmueble.nombre}
                    <div style={{ fontSize: '11px', fontWeight: '400', color: colores.textoOscuro }}>{inmueble.tipo}</div>
                  </td>
                  <td style={{ padding: '12px', color: colores.textoMedio }}>{inmueble.ubicacion}</td>
                  <td style={{ padding: '12px' }}>
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontWeight: '700',
                        fontSize: '12px',
                        backgroundColor:
                          inmueble.scoreRiesgo >= 80 ? '#FEF2F2' :
                          inmueble.scoreRiesgo >= 60 ? '#FFF7ED' :
                          inmueble.scoreRiesgo >= 40 ? '#FFFBEB' : '#ECFDF5',
                        color:
                          inmueble.scoreRiesgo >= 80 ? '#EF4444' :
                          inmueble.scoreRiesgo >= 60 ? '#F97316' :
                          inmueble.scoreRiesgo >= 40 ? '#D97706' : '#10B981'
                      }}
                    >
                      {inmueble.scoreRiesgo} / 100 ({inmueble.nivelRiesgo})
                    </span>
                  </td>
                  <td style={{ padding: '12px', fontWeight: '800', color: colores.primario }}>
                    Clase {inmueble.claseAsegurabilidad}
                  </td>
                  <td style={{ padding: '12px', fontWeight: '600', color: colores.textoClaro }}>
                    {inmueble.pml}
                  </td>
                  <td style={{ padding: '12px', color: colores.textoMedio }}>
                    {inmueble.mitigacionesAbiertas} abiertas
                  </td>
                  <td style={{ padding: '12px' }}>
                    <button
                      onClick={() => onSelectModulo('expediente-digital')}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: colores.primario,
                        color: '#FFFFFF',
                        fontSize: '11px',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      Ver Expediente
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
