import React from 'react';
import {
  Fuel,
  TrendingUp,
  ShieldCheck,
  Store,
  Truck,
  CreditCard,
  Zap,
  Cpu,
  Activity,
  DollarSign,
  Droplet,
  Layers,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  BarChart3,
  Clock
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  AreaChart,
  Area,
  PieChart,
  Pie
} from 'recharts';
import { brandingConfig } from '../config/branding';
import { HeroCard } from '../components/modules/dashboardModules/Herocard';
import {
  MODULOS_GAS_STATION,
  TANQUES_DATA,
  PRECIOS_ACTUALES,
  METRICAS_PAGOS,
  BALANCE_ENERGETICO,
  ALPR_REGISTROS,
  BOMBAS_DATA
} from './gasStationData';

const iconMap: Record<string, any> = {
  Fuel,
  TrendingUp,
  ShieldCheck,
  Store,
  Truck,
  CreditCard,
  Zap,
  Cpu,
};

interface GasStationDashboardProps {
  onSelectModulo: (id: string) => void;
}

export const GasStationDashboard: React.FC<GasStationDashboardProps> = ({ onSelectModulo }) => {
  const { colores, temas } = brandingConfig;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
      {/* ── 1. HEADER HERO GENERAL DE LA GAS STATION INTELIGENTE ── */}
      <div
        className="animate-fade-down"
        style={{
          background: `linear-gradient(135deg, ${colores.azulMarino} 0%, #1E293B 100%)`,
          borderRadius: '24px',
          padding: '26px 34px',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.2)',
          border: '1px solid rgba(255,255,255,0.08)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', zIndex: 1 }}>
          <div
            style={{
              width: '58px',
              height: '58px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #059669 0%, #065F46 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 18px rgba(5, 150, 105, 0.4)',
            }}
          >
            <Fuel size={32} color="#FFFFFF" className="animate-float" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ margin: 0, fontSize: '25px', fontWeight: '900', letterSpacing: '-0.5px' }}>
                Gas Station Inteligente
              </h1>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '800',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(5, 150, 105, 0.25)',
                  border: '1px solid rgba(5, 150, 105, 0.6)',
                  color: '#6EE7B7',
                  letterSpacing: '0.03em',
                }}
              >
                ECOSISTEMA INTEGRAL 4.0
              </span>
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#94A3B8' }}>
              Telemetría IoT de Tanques, Precios Dinámicos, Seguridad VMS, ERP Odoo, Flotas B2B y Hub Solar/EV
            </p>
          </div>
        </div>

        {/* Resumen rápido superior */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', zIndex: 1 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase' }}>
              Despachado Hoy
            </div>
            <div style={{ fontSize: '23px', fontWeight: '900', color: '#10B981' }}>
              48,250 L
            </div>
          </div>
          <div style={{ width: '1px', height: '36px', backgroundColor: 'rgba(255,255,255,0.15)' }} />
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase' }}>
              Ventas del Día
            </div>
            <div style={{ fontSize: '23px', fontWeight: '900', color: '#38BDF8' }}>
              $1,124,500 MXN
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. ASISTENTE INTELIGENTE MAYIA (CON BRAINCANVAS 3D ORIGINAL PRESERVADO) ── */}
      <div className="animate-pop delay-1" style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '880px' }}>
          <HeroCard
            tema={temas.admin}
            onNavigate={(id) => onSelectModulo(id)}
            secciones={MODULOS_GAS_STATION.map(m => ({ id: m.id, titulo: m.titulo }))}
          />
        </div>
      </div>

      {/* ── 3. SCORECARD INTERACTIVO DE LOS 8 MÓDULOS DE LA GAS STATION ── */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart3 size={20} color={colores.primario} />
            Módulos Operativos de la Estación Inteligente
          </h2>
          <span style={{ fontSize: '12px', color: colores.textoMedio, fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
            8 Módulos Conectados en Tiempo Real
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
          }}
        >
          {MODULOS_GAS_STATION.map((mod) => {
            const IconComp = iconMap[mod.iconoName] || Fuel;

            return (
              <div
                key={mod.id}
                onClick={() => onSelectModulo(mod.id)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '18px',
                  padding: '18px',
                  border: `1px solid ${colores.borde}`,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = mod.color;
                  e.currentTarget.style.boxShadow = `0 8px 20px ${mod.color}20`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = colores.borde;
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '12px',
                        backgroundColor: `${mod.color}15`,
                        color: mod.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <IconComp size={20} />
                    </div>
                    <span style={{ fontSize: '10.5px', fontWeight: '800', color: mod.color, backgroundColor: `${mod.color}15`, padding: '2px 8px', borderRadius: '6px' }}>
                      MÓDULO {mod.numero}
                    </span>
                  </div>

                  <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '800', color: colores.textoClaro }}>
                    {mod.titulo}
                  </h3>
                  <p style={{ margin: 0, fontSize: '12px', color: colores.textoMedio, lineHeight: '1.3' }}>
                    {mod.subtitulo}
                  </p>
                </div>

                <div style={{ borderTop: `1px solid ${colores.borde}`, paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '10.5px', color: colores.textoOscuro }}>{mod.kpis[0].etiqueta}</div>
                    <div style={{ fontSize: '14px', fontWeight: '900', color: mod.color }}>{mod.kpis[0].valor}</div>
                  </div>
                  <ChevronRight size={16} color={mod.color} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 4. SUITE DE MONITOREO VISUAL EN VIVO ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '20px' }}>
        
        {/* Nivel de Tanques Actual */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '22px',
            border: `1px solid ${colores.borde}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Droplet size={18} color="#0284C7" />
                Telemetría de Tanques en Tiempo Real
              </h3>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: colores.textoMedio }}>
                Capacidad actual por tipo de hidrocarburo
              </p>
            </div>
            <button
              onClick={() => onSelectModulo('tanques-telemetria')}
              style={{ border: 'none', background: 'none', color: '#0284C7', fontSize: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              Ver Tanques 3D <ChevronRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {TANQUES_DATA.map((t) => (
              <div key={t.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '700', color: colores.textoClaro }}>{t.tipo}</span>
                  <span style={{ fontWeight: '800', color: t.color }}>{t.volumenActual.toLocaleString()} L ({t.porcentaje}%)</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${t.porcentaje}%`, height: '100%', backgroundColor: t.color, borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Precios Dinámicos vs Competencia */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '22px',
            border: `1px solid ${colores.borde}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp size={18} color="#D97706" />
                Precios Tótem vs Competencia Circundante
              </h3>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: colores.textoMedio }}>
                Comparativa de $/L con ajuste automático por IA
              </p>
            </div>
            <button
              onClick={() => onSelectModulo('precios-dinamicos')}
              style={{ border: 'none', background: 'none', color: '#D97706', fontSize: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              Ver Tótem LED <ChevronRight size={14} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
            {PRECIOS_ACTUALES.map((p, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#F8FAFC',
                  padding: '12px',
                  borderRadius: '12px',
                  border: `1px solid ${colores.borde}`,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '11px', color: colores.textoMedio, fontWeight: '700' }}>{p.tipo}</div>
                <div style={{ fontSize: '18px', fontWeight: '900', color: colores.textoClaro, margin: '4px 0' }}>
                  ${p.actual.toFixed(2)}
                </div>
                <div style={{ fontSize: '10.5px', color: '#059669', fontWeight: '700' }}>
                  Sugerido IA: ${p.sugeridoIA.toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '14px', padding: '10px 14px', borderRadius: '10px', backgroundColor: '#FEF3C7', border: '1px solid #FDE68A', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
            <span style={{ color: '#92400E', fontWeight: '700' }}>
              💡 Sugerencia IA activa: +$0.12/L en Magna para capturar margen de hora pico
            </span>
          </div>
        </div>

      </div>

      {/* ── 5. FEEDS EN VIVO DE DESPACHO & SEGURIDAD ALPR ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '20px' }}>
        
        {/* Despachos en Curso */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '22px',
            border: `1px solid ${colores.borde}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Fuel size={18} color="#059669" />
              Dispensarios & Bombas Activas
            </h3>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#059669', backgroundColor: '#D1FAE5', padding: '3px 8px', borderRadius: '6px' }}>
              8 / 8 Operativas
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {BOMBAS_DATA.slice(0, 4).map((b) => (
              <div
                key={b.id}
                style={{
                  padding: '10px 12px',
                  borderRadius: '10px',
                  backgroundColor: '#F8FAFC',
                  border: `1px solid ${colores.borde}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <strong style={{ fontSize: '13px', color: colores.textoClaro }}>{b.id} ({b.isla})</strong>
                  <div style={{ fontSize: '11px', color: colores.textoMedio }}>{b.combustible} · {b.vehiculo}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '14px', fontWeight: '900', color: '#059669' }}>{b.flujo > 0 ? `${b.flujo} L/min` : 'En espera'}</div>
                  <span style={{ fontSize: '10px', color: colores.textoOscuro }}>{b.estado}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Últimas Lecturas ALPR */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '22px',
            border: `1px solid ${colores.borde}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} color="#DC2626" />
              Seguridad ALPR & Detección de Vehículos
            </h3>
            <button
              onClick={() => onSelectModulo('seguridad-vms')}
              style={{ border: 'none', background: 'none', color: '#DC2626', fontSize: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              Ver Cámaras <ChevronRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {ALPR_REGISTROS.slice(0, 4).map((r, idx) => {
              const isListaNegra = r.estado === 'LISTA NEGRA';
              return (
                <div
                  key={idx}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '10px',
                    backgroundColor: isListaNegra ? '#FEF2F2' : '#F8FAFC',
                    border: `1px solid ${isListaNegra ? '#FCA5A5' : colores.borde}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ padding: '3px 6px', borderRadius: '6px', backgroundColor: isListaNegra ? '#DC2626' : '#0F172A', color: '#fff', fontSize: '11px', fontWeight: '900', fontFamily: 'monospace' }}>
                      {r.matricula}
                    </span>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: '800', color: isListaNegra ? '#DC2626' : colores.textoClaro }}>
                        {r.cliente}
                      </div>
                      <div style={{ fontSize: '10.5px', color: colores.textoMedio }}>{r.tipo}</div>
                    </div>
                  </div>

                  <span style={{ fontSize: '10.5px', fontWeight: '800', color: isListaNegra ? '#DC2626' : '#059669' }}>
                    {r.accion}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
