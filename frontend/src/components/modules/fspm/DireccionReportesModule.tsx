import React from 'react';
import {
  TrendingUp,
  DollarSign,
  PieChart as PieIcon,
  BarChart3,
  Award,
  Users,
  Briefcase,
  ShieldCheck,
  Download,
  Flame,
  CheckCircle2,
  XCircle,
  FileSpreadsheet
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { brandingConfig } from '../../../config/branding';
import { METRICAS_DIRECCION } from '../../../fspm/fspmData';

export const DireccionReportesModule: React.FC = () => {
  const { colores } = brandingConfig;

  // Radar de balance estratégico
  const dataRadar = [
    { metrica: 'Eficacia Cotizaciones', valor: 85 },
    { metrica: 'Adjudicación Licitaciones', valor: 74 },
    { metrica: 'Cumplimiento SLA Doc.', valor: 92 },
    { metrica: 'Retención Clientes', valor: 90 },
    { metrica: 'Conversión a Cierre', valor: 74 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* ── HEADER ── */}
      <div
        className="animate-fade-down fspm-card"
        style={{
          backgroundColor: '#0F172A',
          borderRadius: '20px',
          padding: '24px 28px',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: '0 8px 30px rgba(15, 23, 42, 0.25)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            className="flame-badge-glow"
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #D32F2F 0%, #9A0007 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TrendingUp size={28} color="#FFFFFF" className="animate-float" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '800' }}>
                Dashboard Especial para Dirección General FSPM
              </h1>
              <span
                className="shimmer-badge"
                style={{
                  fontSize: '11px',
                  fontWeight: '800',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(211, 47, 47, 0.3)',
                  color: '#FF8A80',
                  border: '1px solid rgba(211, 47, 47, 0.5)',
                }}
              >
                VISTA EJECUTIVA
              </span>
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#94A3B8' }}>
              Indicadores macroeconómicos, forecast de ingresos, análisis por línea de producto y scorecards de ejecutivos
            </p>
          </div>
        </div>

        <button
          className="fspm-btn"
          style={{
            padding: '10px 18px',
            borderRadius: '10px',
            backgroundColor: '#D32F2F',
            color: '#FFFFFF',
            border: 'none',
            fontWeight: '700',
            fontSize: '13px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Download size={16} /> Exportar Reporte Ejecutivo PDF
        </button>
      </div>

      {/* ── MACRO METRICAS DE DIRECCIÓN ── */}
      <div className="animate-fade-up delay-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="fspm-card-interactive" style={{ backgroundColor: colores.fondoPrincipal, borderRadius: '16px', padding: '18px', border: `1px solid ${colores.borde}` }}>
          <span style={{ fontSize: '11.5px', color: colores.textoMedio, fontWeight: '700' }}>PIPELINE TOTAL</span>
          <div style={{ fontSize: '24px', fontWeight: '900', color: colores.textoClaro, marginTop: '4px' }}>
            ${(METRICAS_DIRECCION.pipelineTotal / 1000000).toFixed(1)} M
          </div>
          <div style={{ fontSize: '11px', color: '#10B981', marginTop: '6px', fontWeight: '700' }}>41 Oportunidades</div>
        </div>

        <div className="fspm-card-interactive" style={{ backgroundColor: colores.fondoPrincipal, borderRadius: '16px', padding: '18px', border: `1px solid ${colores.borde}` }}>
          <span style={{ fontSize: '11.5px', color: '#D97706', fontWeight: '700' }}>PIPELINE PONDERADO</span>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#D97706', marginTop: '4px' }}>
            ${(METRICAS_DIRECCION.pipelinePonderado / 1000000).toFixed(2)} M
          </div>
          <div style={{ fontSize: '11px', color: colores.textoMedio, marginTop: '6px' }}>Monto × Probabilidad</div>
        </div>

        <div className="fspm-card-interactive" style={{ backgroundColor: colores.fondoPrincipal, borderRadius: '16px', padding: '18px', border: `1px solid ${colores.borde}` }}>
          <span style={{ fontSize: '11.5px', color: '#059669', fontWeight: '700' }}>VENTAS GANADAS MES</span>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#059669', marginTop: '4px' }}>
            ${(METRICAS_DIRECCION.ventasGanadasMes / 1000000).toFixed(1)} M
          </div>
          <div style={{ fontSize: '11px', color: '#059669', marginTop: '6px', fontWeight: '700' }}>Tasa éxito: 73.9%</div>
        </div>

        <div className="fspm-card-interactive" style={{ backgroundColor: colores.fondoPrincipal, borderRadius: '16px', padding: '18px', border: `1px solid ${colores.borde}` }}>
          <span style={{ fontSize: '11.5px', color: '#64748B', fontWeight: '700' }}>VENTAS PERDIDAS MES</span>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#64748B', marginTop: '4px' }}>
            ${(METRICAS_DIRECCION.ventasPerdidasMes / 1000000).toFixed(1)} M
          </div>
          <div style={{ fontSize: '11px', color: colores.textoMedio, marginTop: '6px' }}>2 Licitaciones</div>
        </div>

        <div className="fspm-card-interactive" style={{ backgroundColor: colores.fondoPrincipal, borderRadius: '16px', padding: '18px', border: `1px solid ${colores.borde}` }}>
          <span style={{ fontSize: '11.5px', color: '#0284C7', fontWeight: '700' }}>LICITACIONES EN CONCURSO</span>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#0284C7', marginTop: '4px' }}>
            ${(METRICAS_DIRECCION.licitacionesActivasMonto / 1000000).toFixed(1)} M
          </div>
          <div style={{ fontSize: '11px', color: '#0284C7', marginTop: '6px', fontWeight: '700' }}>8 Procedimientos</div>
        </div>
      </div>

      {/* ── GRÁFICAS DE PRODUCTO & RADAR ESTRATÉGICO ── */}
      <div className="animate-fade-up delay-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '20px' }}>
        
        {/* GRÁFICA: Ventas por Línea de Producto */}
        <div className="fspm-card" style={{ backgroundColor: colores.fondoPrincipal, borderRadius: '18px', padding: '24px', border: `1px solid ${colores.borde}` }}>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Flame size={18} color="#D32F2F" />
            Ventas y Pipeline por Línea de Producto FSPM
          </h3>
          <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: colores.textoMedio }}>
            Desglose en Millones MXN y porcentaje de participación comercial
          </p>

          <div style={{ height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={METRICAS_DIRECCION.ventasPorProducto} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="producto" stroke="#475569" fontSize={11} fontWeight={600} />
                <YAxis stroke="#94A3B8" fontSize={11} tickFormatter={(v) => `$${v}M`} />
                <Tooltip
                  formatter={(val: any) => [`$${val} M`, 'Monto Total']}
                  contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '8px', border: 'none', fontSize: '12px' }}
                />
                <Bar dataKey="monto" fill="#D32F2F" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RADAR DE EFICIENCIA OPERATIVA */}
        <div style={{ backgroundColor: colores.fondoPrincipal, borderRadius: '18px', padding: '24px', border: `1px solid ${colores.borde}` }}>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} color="#10B981" />
            Radar de Eficiencia Operativa &amp; Conversión
          </h3>
          <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: colores.textoMedio }}>
            Scorecard global de cumplimiento de metas y SLAs
          </p>

          <div style={{ height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={dataRadar} cx="50%" cy="50%" outerRadius={80}>
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis dataKey="metrica" stroke="#475569" fontSize={11} fontWeight={600} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94A3B8" fontSize={10} />
                <Radar name="Eficiencia %" dataKey="valor" stroke="#D32F2F" fill="#D32F2F" fillOpacity={0.4} />
                <Tooltip
                  formatter={(val: any) => [`${val}%`, 'Desempeño']}
                  contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '8px', border: 'none', fontSize: '12px' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};
