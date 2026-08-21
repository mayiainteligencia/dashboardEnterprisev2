import React from 'react';
import {
  Flame,
  ShieldAlert,
  Building2,
  Briefcase,
  FileText,
  Landmark,
  CheckSquare,
  Clock,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Folder,
  ArrowUpRight,
  ChevronRight,
  Sparkles,
  PieChart as PieIcon,
  BarChart3,
  Calendar
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  CartesianGrid,
} from 'recharts';
import { brandingConfig } from '../config/branding';
import { HeroCard } from '../components/modules/dashboardModules/Herocard';
import {
  MODULOS_FSPM,
  CLIENTES_FSPM,
  OPORTUNIDADES_FSPM,
  COTIZACIONES_FSPM,
  LICITACIONES_FSPM,
  ACTIVIDADES_FSPM,
  METRICAS_DIRECCION
} from './fspmData';

interface FspmDashboardProps {
  onSelectModulo: (id: string) => void;
}

export const FspmDashboard: React.FC<FspmDashboardProps> = ({ onSelectModulo }) => {
  const { colores, temas } = brandingConfig;

  // Semáforo de licitaciones
  const licitacionesCriticas = LICITACIONES_FSPM.filter(l => l.semaforo === 'CRITICO');
  const licitacionesAlerta = LICITACIONES_FSPM.filter(l => l.semaforo === 'ALERTA');
  const licitacionesOk = LICITACIONES_FSPM.filter(l => l.semaforo === 'OK');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* ── 1. HEADER HERO DEL CRM FSPM (ANIMADO) ── */}
      <div
        className="animate-fade-down fspm-card"
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
            className="flame-badge-glow"
            style={{
              width: '58px',
              height: '58px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #D32F2F 0%, #9A0007 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 18px rgba(211, 47, 47, 0.4)',
            }}
          >
            <Flame size={32} color="#FFFFFF" className="animate-float" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ margin: 0, fontSize: '25px', fontWeight: '900', letterSpacing: '-0.5px' }}>
                FSPM CRM
              </h1>
              <span
                className="shimmer-badge"
                style={{
                  fontSize: '11px',
                  fontWeight: '800',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(211, 47, 47, 0.3)',
                  border: '1px solid rgba(211, 47, 47, 0.6)',
                  color: '#FF8A80',
                  letterSpacing: '0.03em',
                }}
              >
                PROTECCIÓN CONTRA INCENDIO &amp; LICITACIONES
              </span>
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#94A3B8' }}>
              Gestión comercial con Google Workspace · Clientes, Oportunidades, Cotizaciones y Procedimientos
            </p>
          </div>
        </div>

        {/* Resumen rápido superior */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', zIndex: 1 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase' }}>
              Pipeline Total
            </div>
            <div style={{ fontSize: '23px', fontWeight: '900', color: '#10B981' }}>
              $24.8 M
            </div>
          </div>
          <div style={{ width: '1px', height: '36px', backgroundColor: 'rgba(255,255,255,0.15)' }} />
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase' }}>
              Ponderado
            </div>
            <div style={{ fontSize: '23px', fontWeight: '900', color: '#F59E0B' }}>
              $15.6 M
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. ASISTENTE INTELIGENTE MAYIA (CENTRO DEL ECOSISTEMA CON ENTRADA ANIMADA) ── */}
      <div className="animate-pop delay-1" style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '880px' }}>
          <HeroCard
            tema={temas.admin}
            onNavigate={(id) => onSelectModulo(id)}
            secciones={MODULOS_FSPM.map(m => ({ id: m.id, titulo: m.titulo }))}
          />
        </div>
      </div>

      {/* ── 3. SCORECARD DE 8 INDICADORES CLAVE (CON ENTRADA ESCALONADA) ── */}
      <div className="animate-fade-up delay-2">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart3 size={20} color={colores.primario} />
            Métricas del Pipeline Comercial &amp; Licitaciones
          </h2>
          <span style={{ fontSize: '12px', color: colores.textoMedio, fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
            Agosto 2026 · En tiempo real
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px',
          }}
        >
          {/* Card 1: Pipeline Activo */}
          <div
            onClick={() => onSelectModulo('oportunidades')}
            className="fspm-card-interactive animate-fade-up delay-1"
            style={{
              backgroundColor: colores.fondoPrincipal,
              borderRadius: '16px',
              padding: '18px',
              border: `1px solid ${colores.borde}`,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <span style={{ fontSize: '12px', color: colores.textoMedio, fontWeight: '700' }}>
                  💰 Pipeline activo
                </span>
                <div style={{ fontSize: '24px', fontWeight: '900', color: colores.textoClaro, marginTop: '4px' }}>
                  $24.8 M
                </div>
              </div>
              <div style={{ padding: '8px', borderRadius: '10px', backgroundColor: '#FEF3C7', color: '#D97706' }}>
                <DollarSign size={20} />
              </div>
            </div>
            <div style={{ fontSize: '11.5px', color: '#10B981', marginTop: '8px', fontWeight: '700' }}>
              +12.4% vs mes anterior
            </div>
          </div>

          {/* Card 2: Oportunidades Activas */}
          <div
            onClick={() => onSelectModulo('oportunidades')}
            className="fspm-card-interactive animate-fade-up delay-2"
            style={{
              backgroundColor: colores.fondoPrincipal,
              borderRadius: '16px',
              padding: '18px',
              border: `1px solid ${colores.borde}`,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <span style={{ fontSize: '12px', color: colores.textoMedio, fontWeight: '700' }}>
                  🎯 Oportunidades activas
                </span>
                <div style={{ fontSize: '24px', fontWeight: '900', color: colores.textoClaro, marginTop: '4px' }}>
                  41
                </div>
              </div>
              <div style={{ padding: '8px', borderRadius: '10px', backgroundColor: '#E0F2FE', color: '#0284C7' }}>
                <Briefcase size={20} />
              </div>
            </div>
            <div style={{ fontSize: '11.5px', color: colores.textoMedio, marginTop: '8px' }}>
              En 7 etapas de pipeline
            </div>
          </div>

          {/* Card 3: Cotizaciones Abiertas */}
          <div
            onClick={() => onSelectModulo('cotizaciones')}
            className="fspm-card-interactive animate-fade-up delay-3"
            style={{
              backgroundColor: colores.fondoPrincipal,
              borderRadius: '16px',
              padding: '18px',
              border: `1px solid ${colores.borde}`,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <span style={{ fontSize: '12px', color: colores.textoMedio, fontWeight: '700' }}>
                  📄 Cotizaciones abiertas
                </span>
                <div style={{ fontSize: '24px', fontWeight: '900', color: colores.textoClaro, marginTop: '4px' }}>
                  23
                </div>
              </div>
              <div style={{ padding: '8px', borderRadius: '10px', backgroundColor: '#FEF3C7', color: '#D97706' }}>
                <FileText size={20} />
              </div>
            </div>
            <div style={{ fontSize: '11.5px', color: colores.textoMedio, marginTop: '8px' }}>
              $8.45 M en propuesta
            </div>
          </div>

          {/* Card 4: Licitaciones Activas */}
          <div
            onClick={() => onSelectModulo('licitaciones')}
            className="fspm-card-interactive animate-fade-up delay-4"
            style={{
              backgroundColor: colores.fondoPrincipal,
              borderRadius: '16px',
              padding: '18px',
              border: `1px solid ${colores.borde}`,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <span style={{ fontSize: '12px', color: colores.textoMedio, fontWeight: '700' }}>
                  🏛️ Licitaciones activas
                </span>
                <div style={{ fontSize: '24px', fontWeight: '900', color: colores.textoClaro, marginTop: '4px' }}>
                  8
                </div>
              </div>
              <div style={{ padding: '8px', borderRadius: '10px', backgroundColor: '#FEE2E2', color: '#D32F2F' }}>
                <Landmark size={20} />
              </div>
            </div>
            <div style={{ fontSize: '11.5px', color: '#D32F2F', marginTop: '8px', fontWeight: '700' }}>
              1 con entrega &lt;48h (PEMEX)
            </div>
          </div>

          {/* Card 5: Seguimientos Vencidos (ALERTA CRÍTICA PULSANTE) */}
          <div
            onClick={() => onSelectModulo('actividades')}
            className="fspm-card-interactive pulse-red animate-fade-up delay-5"
            style={{
              backgroundColor: '#FEF2F2',
              borderRadius: '16px',
              padding: '18px',
              border: '2px solid #EF4444',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#B91C1C', fontWeight: '800' }}>
                  ⏰ Seguimientos vencidos
                </span>
                <div style={{ fontSize: '24px', fontWeight: '900', color: '#B91C1C', marginTop: '4px' }}>
                  6
                </div>
              </div>
              <div style={{ padding: '8px', borderRadius: '10px', backgroundColor: '#EF4444', color: '#FFFFFF' }}>
                <Clock size={20} />
              </div>
            </div>
            <div style={{ fontSize: '11.5px', color: '#B91C1C', marginTop: '8px', fontWeight: '800' }}>
              Acción requerida hoy
            </div>
          </div>

          {/* Card 6: Actividades esta semana */}
          <div
            onClick={() => onSelectModulo('actividades')}
            className="fspm-card-interactive animate-fade-up delay-6"
            style={{
              backgroundColor: colores.fondoPrincipal,
              borderRadius: '16px',
              padding: '18px',
              border: `1px solid ${colores.borde}`,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <span style={{ fontSize: '12px', color: colores.textoMedio, fontWeight: '700' }}>
                  📅 Actividades esta semana
                </span>
                <div style={{ fontSize: '24px', fontWeight: '900', color: colores.textoClaro, marginTop: '4px' }}>
                  17
                </div>
              </div>
              <div style={{ padding: '8px', borderRadius: '10px', backgroundColor: '#D1FAE5', color: '#10B981' }}>
                <Calendar size={20} />
              </div>
            </div>
            <div style={{ fontSize: '11.5px', color: colores.textoMedio, marginTop: '8px' }}>
              8 reuniones y 9 llamadas
            </div>
          </div>

          {/* Card 7: Negocios Ganados Mes */}
          <div
            onClick={() => onSelectModulo('direccion')}
            className="fspm-card-interactive animate-fade-up delay-7"
            style={{
              backgroundColor: colores.fondoPrincipal,
              borderRadius: '16px',
              padding: '18px',
              border: `1px solid ${colores.borde}`,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#059669', fontWeight: '800' }}>
                  ✅ Negocios ganados mes
                </span>
                <div style={{ fontSize: '24px', fontWeight: '900', color: '#059669', marginTop: '4px' }}>
                  $3.4 M
                </div>
              </div>
              <div style={{ padding: '8px', borderRadius: '10px', backgroundColor: '#D1FAE5', color: '#10B981' }}>
                <CheckSquare size={20} />
              </div>
            </div>
            <div style={{ fontSize: '11.5px', color: '#059669', marginTop: '8px', fontWeight: '800' }}>
              Tasa de conversión: 73.9%
            </div>
          </div>

          {/* Card 8: Negocios Perdidos Mes */}
          <div
            onClick={() => onSelectModulo('direccion')}
            className="fspm-card-interactive animate-fade-up delay-8"
            style={{
              backgroundColor: colores.fondoPrincipal,
              borderRadius: '16px',
              padding: '18px',
              border: `1px solid ${colores.borde}`,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '700' }}>
                  ❌ Negocios perdidos mes
                </span>
                <div style={{ fontSize: '24px', fontWeight: '900', color: '#64748B', marginTop: '4px' }}>
                  $1.2 M
                </div>
              </div>
              <div style={{ padding: '8px', borderRadius: '10px', backgroundColor: '#F1F5F9', color: '#64748B' }}>
                <AlertCircle size={20} />
              </div>
            </div>
            <div style={{ fontSize: '11.5px', color: colores.textoMedio, marginTop: '8px' }}>
              2 licitaciones no adjudicadas
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. SUITE DE GRÁFICAS DEL PIPELINE Y LICITACIONES ── */}
      <div className="animate-fade-up delay-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '24px' }}>
        
        {/* GRÁFICA 1: Pipeline Comercial por Etapas (Funnel / Embudo) */}
        <div
          className="fspm-card"
          style={{
            backgroundColor: colores.fondoPrincipal,
            borderRadius: '20px',
            padding: '24px',
            border: `1px solid ${colores.borde}`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colores.textoClaro }}>
                Pipeline Comercial FSPM
              </h3>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: colores.textoMedio }}>
                Prospecto → Contactado → Calificado → Oportunidad → Cotizado → Negociación → Ganado
              </p>
            </div>
            <span style={{ fontSize: '12px', fontWeight: '800', color: colores.primario, backgroundColor: '#FEE2E2', padding: '4px 10px', borderRadius: '8px' }}>
              41 Oportunidades
            </span>
          </div>

          <div style={{ height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={METRICAS_DIRECCION.pipelineEtapas} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                <XAxis type="number" stroke="#94A3B8" fontSize={11} />
                <YAxis dataKey="etapa" type="category" stroke="#475569" fontSize={12} fontWeight={600} width={90} />
                <Tooltip
                  formatter={(value: any, name: any, item: any) => [
                    `${value} proyectos ($${(item.payload.monto / 1000000).toFixed(1)} M)`,
                    'Volumen'
                  ]}
                  contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '10px', border: 'none', fontSize: '12px' }}
                />
                <Bar dataKey="valor" radius={[0, 8, 8, 0]}>
                  {METRICAS_DIRECCION.pipelineEtapas.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GRÁFICA 2: Distribución de Cartera por Tipo de Cliente (Pastel / Donut) */}
        <div
          className="fspm-card"
          style={{
            backgroundColor: colores.fondoPrincipal,
            borderRadius: '20px',
            padding: '24px',
            border: `1px solid ${colores.borde}`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PieIcon size={18} color="#0284C7" />
                Distribución de Cartera por Sector
              </h3>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: colores.textoMedio }}>
                Participación en $24.8M de pipeline activo
              </p>
            </div>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#0284C7', backgroundColor: '#E0F2FE', padding: '4px 10px', borderRadius: '8px' }}>
              CFE &amp; PEMEX Top
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', height: '260px' }}>
            <div style={{ flex: 1, height: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={METRICAS_DIRECCION.distribucionSectores}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {METRICAS_DIRECCION.distribucionSectores.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any, name: any, item: any) => [
                      `${value}% (${item.payload.monto})`,
                      item.payload.name
                    ]}
                    contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '10px', border: 'none', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '12px' }}>
              {METRICAS_DIRECCION.distribucionSectores.map((s, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: s.color }} />
                  <span style={{ color: colores.textoMedio, fontWeight: '600' }}>{s.name}:</span>
                  <span style={{ fontWeight: '800', color: colores.textoClaro }}>{s.value}% ({s.monto})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* GRÁFICA 3: Ventas y Pipeline por Ejecutivo (Barras) */}
        <div
          className="fspm-card"
          style={{
            backgroundColor: colores.fondoPrincipal,
            borderRadius: '20px',
            padding: '24px',
            border: `1px solid ${colores.borde}`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colores.textoClaro }}>
                Rendimiento por Ejecutivo Comercial
              </h3>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: colores.textoMedio }}>
                Ventas Ganadas vs Pipeline en Gestión ($ Millones MXN)
              </p>
            </div>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#10B981', backgroundColor: '#D1FAE5', padding: '4px 10px', borderRadius: '8px' }}>
              Fernanda Reza Líder
            </span>
          </div>

          <div style={{ height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={METRICAS_DIRECCION.ventasPorEjecutivo} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="ejecutivo" stroke="#475569" fontSize={12} fontWeight={600} />
                <YAxis stroke="#94A3B8" fontSize={11} tickFormatter={(v) => `$${v}M`} />
                <Tooltip
                  formatter={(val: any) => [`$${val} M`, '']}
                  contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '10px', border: 'none', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="ganados" name="Ventas Ganadas ($M)" fill="#10B981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="pipeline" name="Pipeline Activo ($M)" fill="#0F172A" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GRÁFICA 4: Histórico Mensual Cotizado vs Ganado (Área) */}
        <div
          className="fspm-card"
          style={{
            backgroundColor: colores.fondoPrincipal,
            borderRadius: '20px',
            padding: '24px',
            border: `1px solid ${colores.borde}`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colores.textoClaro }}>
                Evolución de Propuestas vs Cierres
              </h3>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: colores.textoMedio }}>
                Monto mensual cotizado vs contratos ganados ($ Millones)
              </p>
            </div>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#D97706', backgroundColor: '#FEF3C7', padding: '4px 10px', borderRadius: '8px' }}>
              Tendencia Creciente
            </span>
          </div>

          <div style={{ height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={METRICAS_DIRECCION.historicoMensual} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCotizado" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D32F2F" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#D32F2F" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorGanado" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="mes" stroke="#475569" fontSize={12} fontWeight={600} />
                <YAxis stroke="#94A3B8" fontSize={11} tickFormatter={(v) => `$${v}M`} />
                <Tooltip
                  formatter={(val: any) => [`$${val} M`, '']}
                  contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '10px', border: 'none', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="cotizado" name="Monto Cotizado ($M)" stroke="#D32F2F" strokeWidth={2} fillOpacity={1} fill="url(#colorCotizado)" />
                <Area type="monotone" dataKey="ganado" name="Contratos Ganados ($M)" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorGanado)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* ── 5. TABLA TOP OPORTUNIDADES & SEMÁFORO DE LICITACIONES CRÍTICAS ── */}
      <div className="animate-fade-up delay-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '24px' }}>
        
        {/* TABLA TOP 10 OPORTUNIDADES */}
        <div
          className="fspm-card"
          style={{
            backgroundColor: colores.fondoPrincipal,
            borderRadius: '20px',
            padding: '24px',
            border: `1px solid ${colores.borde}`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Briefcase size={18} color="#D32F2F" />
              Top Oportunidades Estratégicas
            </h3>
            <button
              onClick={() => onSelectModulo('oportunidades')}
              className="fspm-btn"
              style={{
                border: 'none',
                background: 'none',
                color: colores.primario,
                fontSize: '12px',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              Ver Kanban <ChevronRight size={14} />
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${colores.borde}`, textAlign: 'left', color: colores.textoMedio }}>
                  <th style={{ padding: '8px 10px', fontWeight: '700' }}>Cliente</th>
                  <th style={{ padding: '8px 10px', fontWeight: '700' }}>Proyecto</th>
                  <th style={{ padding: '8px 10px', fontWeight: '700' }}>Monto</th>
                  <th style={{ padding: '8px 10px', fontWeight: '700' }}>Prob.</th>
                  <th style={{ padding: '8px 10px', fontWeight: '700' }}>Ejecutivo</th>
                </tr>
              </thead>
              <tbody>
                {METRICAS_DIRECCION.topOportunidades.map((opp, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: `1px solid ${colores.borde}`,
                      transition: 'background-color 0.15s',
                    }}
                  >
                    <td style={{ padding: '12px 10px', fontWeight: '800', color: colores.textoClaro }}>
                      {opp.cliente}
                    </td>
                    <td style={{ padding: '12px 10px', color: colores.textoMedio }}>
                      {opp.proyecto}
                    </td>
                    <td style={{ padding: '12px 10px', fontWeight: '800', color: '#10B981' }}>
                      {opp.monto}
                    </td>
                    <td style={{ padding: '12px 10px' }}>
                      <span
                        style={{
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '800',
                          backgroundColor: parseInt(opp.prob) >= 60 ? '#D1FAE5' : '#FEF3C7',
                          color: parseInt(opp.prob) >= 60 ? '#059669' : '#D97706',
                        }}
                      >
                        {opp.prob}
                      </span>
                    </td>
                    <td style={{ padding: '12px 10px', color: colores.textoMedio }}>
                      {opp.ejecutivo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SEMÁFORO DE LICITACIONES Y CHECKLIST */}
        <div
          className="fspm-card"
          style={{
            backgroundColor: colores.fondoPrincipal,
            borderRadius: '20px',
            padding: '24px',
            border: `1px solid ${colores.borde}`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Landmark size={18} color="#D97706" />
              Semáforo de Fechas Críticas en Licitaciones
            </h3>
            <button
              onClick={() => onSelectModulo('licitaciones')}
              className="fspm-btn"
              style={{
                border: 'none',
                background: 'none',
                color: '#D97706',
                fontSize: '12px',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              Ver Checklist <ChevronRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {LICITACIONES_FSPM.map((lic) => (
              <div
                key={lic.id}
                onClick={() => onSelectModulo('licitaciones')}
                className={lic.semaforo === 'CRITICO' ? 'fspm-card-interactive pulse-red' : 'fspm-card-interactive'}
                style={{
                  padding: '14px 18px',
                  borderRadius: '14px',
                  border: `1px solid ${
                    lic.semaforo === 'CRITICO' ? '#F87171' : lic.semaforo === 'ALERTA' ? '#FCD34D' : '#A7F3D0'
                  }`,
                  backgroundColor:
                    lic.semaforo === 'CRITICO' ? '#FEF2F2' : lic.semaforo === 'ALERTA' ? '#FFFBEB' : '#ECFDF5',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor:
                          lic.semaforo === 'CRITICO' ? '#DC2626' : lic.semaforo === 'ALERTA' ? '#D97706' : '#10B981',
                      }}
                    />
                    <strong style={{ fontSize: '14px', color: colores.textoClaro }}>
                      {lic.dependencia}
                    </strong>
                    <span style={{ fontSize: '11px', color: colores.textoMedio }}>
                      ({lic.noProcedimiento})
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: colores.textoMedio, marginTop: '4px', maxWidth: '420px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {lic.objeto}
                  </div>
                  <div style={{ fontSize: '11px', color: colores.textoOscuro, marginTop: '2px' }}>
                    Presentación: <strong>{lic.presentacionPropuestas}</strong> · Resp: {lic.responsable}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '15px', fontWeight: '900', color: colores.textoClaro }}>
                    ${(lic.montoEstimado / 1000000).toFixed(2)} M
                  </div>
                  <span
                    style={{
                      display: 'inline-block',
                      marginTop: '4px',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: '800',
                      backgroundColor: lic.semaforo === 'CRITICO' ? '#DC2626' : lic.semaforo === 'ALERTA' ? '#D97706' : '#10B981',
                      color: '#FFFFFF',
                    }}
                  >
                    {lic.semaforo === 'CRITICO' ? '🔴 <48h Vence' : lic.semaforo === 'ALERTA' ? '🟡 3-10 días' : '🟢 >10 días'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
