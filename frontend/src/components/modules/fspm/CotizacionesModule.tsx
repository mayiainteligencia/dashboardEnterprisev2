import React, { useState } from 'react';
import {
  FileText,
  Search,
  Plus,
  DollarSign,
  Calendar,
  Clock,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  XCircle,
  FileSpreadsheet,
  Folder,
  Filter
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
  CartesianGrid
} from 'recharts';
import { brandingConfig } from '../../../config/branding';
import { COTIZACIONES_FSPM } from '../../../fspm/fspmData';
import type { CotizacionFSPM, EstadoCotizacion } from '../../../fspm/fspmData';

export const CotizacionesModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');

  const cotizacionesFiltradas = COTIZACIONES_FSPM.filter((c) => {
    const coincideTexto =
      c.noCotizacion.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.ejecutivo.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.oportunidad.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado = filtroEstado === 'todos' || c.estado === filtroEstado;
    return coincideTexto && coincideEstado;
  });

  const totalCotizadoSinIva = COTIZACIONES_FSPM.reduce((sum, c) => sum + c.montoSinIva, 0);
  const totalConIva = COTIZACIONES_FSPM.reduce((sum, c) => sum + c.total, 0);
  const cotizacionesSinSeguimientoCriticas = COTIZACIONES_FSPM.filter(c => c.diasSinSeguimiento >= 7);

  // Gráfica por estados
  const dataEstados = [
    { name: 'Enviada', value: 1, color: '#0284C7' },
    { name: 'Negociación', value: 1, color: '#9A0007' },
    { name: 'Seguimiento', value: 1, color: '#D97706' },
    { name: 'Aceptada', value: 1, color: '#10B981' },
    { name: 'Rechazada', value: 1, color: '#64748B' },
  ];

  // Gráfica por vendedor
  const dataPorVendedor = [
    { ejecutivo: 'Luis Gerardo', monto: 5.22 },
    { ejecutivo: 'Edgar', monto: 3.71 },
    { ejecutivo: 'Alfonso', monto: 3.82 },
    { ejecutivo: 'Fernanda', monto: 1.03 },
  ];

  const getEstadoBadge = (estado: EstadoCotizacion) => {
    switch (estado) {
      case 'Aceptada':
        return { bg: '#D1FAE5', text: '#059669', border: '#A7F3D0' };
      case 'Negociación':
        return { bg: '#FEE2E2', text: '#D32F2F', border: '#FCA5A5' };
      case 'Seguimiento':
        return { bg: '#FEF3C7', text: '#D97706', border: '#FCD34D' };
      case 'Enviada':
        return { bg: '#E0F2FE', text: '#0284C7', border: '#BAE6FD' };
      case 'Rechazada':
      case 'Vencida':
        return { bg: '#F1F5F9', text: '#64748B', border: '#CBD5E1' };
      default:
        return { bg: '#F1F5F9', text: '#475569', border: '#E2E8F0' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* ── HEADER ── */}
      <div
        className="animate-fade-down fspm-card"
        style={{
          backgroundColor: colores.fondoPrincipal,
          borderRadius: '20px',
          padding: '24px 28px',
          border: `1px solid ${colores.borde}`,
          boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              backgroundColor: '#D97706',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FileText size={26} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: colores.textoClaro }}>
              Módulo Registro &amp; Control de Cotizaciones
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: colores.textoMedio }}>
              Control de propuestas externas, desglose con IVA, vigencias y enlaces a PDF/Excel
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '11px', color: colores.textoMedio, fontWeight: '700' }}>TOTAL COTIZADO</span>
            <div style={{ fontSize: '18px', fontWeight: '900', color: '#10B981' }}>
              ${(totalConIva / 1000000).toFixed(2)} M
            </div>
          </div>

          <button
            style={{
              padding: '10px 16px',
              borderRadius: '10px',
              backgroundColor: '#D97706',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Plus size={16} /> Registrar Cotización
          </button>
        </div>
      </div>

      {/* ── 3 PREGUNTAS CLAVE DEL MANUAL FSPM & ALERTAS ── */}
      <div className="animate-fade-up delay-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        {/* Pregunta 1 */}
        <div className="fspm-card" style={{ backgroundColor: colores.fondoPrincipal, borderRadius: '16px', padding: '18px', border: `1px solid ${colores.borde}` }}>
          <span style={{ fontSize: '11px', color: colores.textoMedio, fontWeight: '700' }}>
            ¿CUÁNTO TENEMOS ACTUALMENTE COTIZADO?
          </span>
          <div style={{ fontSize: '22px', fontWeight: '900', color: colores.textoClaro, marginTop: '4px' }}>
            ${(totalCotizadoSinIva / 1000000).toFixed(2)} M <span style={{ fontSize: '13px', color: colores.textoMedio }}>(+IVA: ${(totalConIva / 1000000).toFixed(2)}M)</span>
          </div>
          <div style={{ fontSize: '12px', color: '#059669', marginTop: '6px', fontWeight: '600' }}>
            5 cotizaciones activas en revisión
          </div>
        </div>

        {/* Pregunta 2 (ALERTA PULSANTE) */}
        <div className="fspm-card pulse-red" style={{ backgroundColor: '#FEF2F2', borderRadius: '16px', padding: '18px', border: '1.5px solid #FCA5A5' }}>
          <span style={{ fontSize: '11px', color: '#B91C1C', fontWeight: '800' }}>
            ¿COTIZACIONES CON MÁS DE 7 DÍAS SIN SEGUIMIENTO?
          </span>
          <div style={{ fontSize: '22px', fontWeight: '900', color: '#B91C1C', marginTop: '4px' }}>
            {cotizacionesSinSeguimientoCriticas.length} Propuestas
          </div>
          <div style={{ fontSize: '12px', color: '#991B1B', marginTop: '6px', fontWeight: '700' }}>
            ⚠️ FSPM-2026-0178 (CFE) lleva 7 días sin contacto
          </div>
        </div>

        {/* Pregunta 3 */}
        <div className="fspm-card" style={{ backgroundColor: colores.fondoPrincipal, borderRadius: '16px', padding: '18px', border: `1px solid ${colores.borde}` }}>
          <span style={{ fontSize: '11px', color: colores.textoMedio, fontWeight: '700' }}>
            ¿QUÉ VENDEDOR TIENE MÁS DINERO EN PROPUESTA?
          </span>
          <div style={{ fontSize: '22px', fontWeight: '900', color: '#0284C7', marginTop: '4px' }}>
            Luis Gerardo ($5.22 M)
          </div>
          <div style={{ fontSize: '12px', color: colores.textoMedio, marginTop: '6px' }}>
            Seguido por Edgar ($3.71 M)
          </div>
        </div>
      </div>

      {/* ── GRÁFICAS DE COTIZACIONES ── */}
      <div className="animate-fade-up delay-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="fspm-card" style={{ backgroundColor: colores.fondoPrincipal, borderRadius: '18px', padding: '20px', border: `1px solid ${colores.borde}` }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: '800', color: colores.textoClaro }}>
            Monto Cotizado por Ejecutivo ($ Millones)
          </h3>
          <div style={{ height: '180px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataPorVendedor} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="ejecutivo" stroke="#475569" fontSize={11} fontWeight={600} />
                <YAxis stroke="#94A3B8" fontSize={11} tickFormatter={(v) => `$${v}M`} />
                <Tooltip
                  formatter={(val: any) => [`$${val} M`, 'Total']}
                  contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '8px', border: 'none', fontSize: '12px' }}
                />
                <Bar dataKey="monto" fill="#D97706" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ backgroundColor: colores.fondoPrincipal, borderRadius: '18px', padding: '20px', border: `1px solid ${colores.borde}`, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: '800', color: colores.textoClaro }}>
            Distribución por Estado de Cotización
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', height: '180px' }}>
            <div style={{ flex: 1, height: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={dataEstados} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={4} dataKey="value">
                    {dataEstados.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any, name: any, item: any) => [`${val} cotización`, item.payload.name]}
                    contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '8px', border: 'none', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingRight: '10px' }}>
              {dataEstados.map((e, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: e.color }} />
                  <span style={{ color: colores.textoMedio }}>{e.name}:</span>
                  <span style={{ fontWeight: '800', color: colores.textoClaro }}>{e.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── TABLA MAESTRA DE COTIZACIONES ── */}
      <div
        style={{
          backgroundColor: colores.fondoPrincipal,
          borderRadius: '18px',
          border: `1px solid ${colores.borde}`,
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${colores.borde}`, backgroundColor: colores.fondoSecundario, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: colores.textoClaro }}>
            Registro y Control de Cotizaciones ({cotizacionesFiltradas.length})
          </h3>

          <div style={{ display: 'flex', gap: '8px' }}>
            {['todos', 'Enviada', 'Negociación', 'Seguimiento', 'Aceptada', 'Rechazada'].map((est) => (
              <button
                key={est}
                onClick={() => setFiltroEstado(est)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: filtroEstado === est ? '800' : '600',
                  border: `1px solid ${filtroEstado === est ? '#D97706' : colores.borde}`,
                  backgroundColor: filtroEstado === est ? '#FEF3C7' : colores.fondoPrincipal,
                  color: filtroEstado === est ? '#D97706' : colores.textoMedio,
                  cursor: 'pointer',
                }}
              >
                {est}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${colores.borde}`, textAlign: 'left', color: colores.textoMedio, backgroundColor: '#F8FAFC' }}>
                <th style={{ padding: '12px 14px', fontWeight: '700' }}>No. Cotización</th>
                <th style={{ padding: '12px 14px', fontWeight: '700' }}>Cliente &amp; Proyecto</th>
                <th style={{ padding: '12px 14px', fontWeight: '700' }}>Fecha</th>
                <th style={{ padding: '12px 14px', fontWeight: '700' }}>Monto Sin IVA</th>
                <th style={{ padding: '12px 14px', fontWeight: '700' }}>IVA</th>
                <th style={{ padding: '12px 14px', fontWeight: '700' }}>Total MXN</th>
                <th style={{ padding: '12px 14px', fontWeight: '700' }}>Ejecutivo</th>
                <th style={{ padding: '12px 14px', fontWeight: '700' }}>Estado</th>
                <th style={{ padding: '12px 14px', fontWeight: '700' }}>Documentos</th>
                <th style={{ padding: '12px 14px', fontWeight: '700' }}>Próx. Seguimiento</th>
              </tr>
            </thead>
            <tbody>
              {cotizacionesFiltradas.map((cot) => {
                const badge = getEstadoBadge(cot.estado);
                const esAlertaSeguimiento = cot.diasSinSeguimiento >= 7;

                return (
                  <tr
                    key={cot.id}
                    style={{
                      borderBottom: `1px solid ${colores.borde}`,
                      backgroundColor: esAlertaSeguimiento ? '#FEF2F240' : 'transparent',
                    }}
                  >
                    <td style={{ padding: '14px', fontWeight: '800', color: colores.primario }}>
                      {cot.noCotizacion}
                    </td>
                    <td style={{ padding: '14px' }}>
                      <div style={{ fontWeight: '800', color: colores.textoClaro }}>
                        {cot.cliente.split('—')[0].trim()}
                      </div>
                      <div style={{ fontSize: '11.5px', color: colores.textoMedio }}>
                        {cot.oportunidad}
                      </div>
                    </td>
                    <td style={{ padding: '14px', color: colores.textoMedio }}>
                      {cot.fecha}
                    </td>
                    <td style={{ padding: '14px', fontWeight: '700', color: colores.textoClaro }}>
                      ${cot.montoSinIva.toLocaleString()}
                    </td>
                    <td style={{ padding: '14px', color: colores.textoMedio }}>
                      ${cot.iva.toLocaleString()}
                    </td>
                    <td style={{ padding: '14px', fontWeight: '900', color: '#10B981' }}>
                      ${cot.total.toLocaleString()}
                    </td>
                    <td style={{ padding: '14px', color: colores.textoClaro, fontWeight: '600' }}>
                      {cot.ejecutivo}
                    </td>
                    <td style={{ padding: '14px' }}>
                      <span
                        style={{
                          padding: '3px 10px',
                          borderRadius: '8px',
                          fontSize: '11px',
                          fontWeight: '800',
                          backgroundColor: badge.bg,
                          color: badge.text,
                          border: `1px solid ${badge.border}`,
                        }}
                      >
                        {cot.estado}
                      </span>
                    </td>
                    <td style={{ padding: '14px' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          title="Abrir PDF en Drive"
                          style={{
                            padding: '4px 8px',
                            borderRadius: '6px',
                            backgroundColor: '#FEE2E2',
                            color: '#D32F2F',
                            border: '1px solid #FCA5A5',
                            fontSize: '11px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px',
                          }}
                        >
                          <FileText size={12} /> PDF
                        </button>
                        <button
                          title="Abrir Excel de Costeo en Drive"
                          style={{
                            padding: '4px 8px',
                            borderRadius: '6px',
                            backgroundColor: '#D1FAE5',
                            color: '#059669',
                            border: '1px solid #A7F3D0',
                            fontSize: '11px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px',
                          }}
                        >
                          <FileSpreadsheet size={12} /> Excel
                        </button>
                      </div>
                    </td>
                    <td style={{ padding: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {esAlertaSeguimiento && <AlertCircle size={14} color="#EF4444" />}
                        <span style={{ fontSize: '12px', fontWeight: esAlertaSeguimiento ? '800' : '600', color: esAlertaSeguimiento ? '#B91C1C' : colores.textoClaro }}>
                          {cot.proximoSeguimiento}
                        </span>
                      </div>
                      {esAlertaSeguimiento && (
                        <div style={{ fontSize: '10px', color: '#EF4444', fontWeight: '700', marginTop: '2px' }}>
                          {cot.diasSinSeguimiento} días sin seguimiento
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
