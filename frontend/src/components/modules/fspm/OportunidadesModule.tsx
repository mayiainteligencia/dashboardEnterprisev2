import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  DollarSign,
  Calendar,
  User,
  Folder,
  CheckCircle2,
  XCircle,
  TrendingUp,
  ArrowRight,
  Filter,
  BarChart2
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from 'recharts';
import { brandingConfig } from '../../../config/branding';
import { OPORTUNIDADES_FSPM } from '../../../fspm/fspmData';
import type { OportunidadFSPM, EtapaOportunidad } from '../../../fspm/fspmData';

const ETAPAS_KANBAN: { id: EtapaOportunidad; label: string; color: string }[] = [
  { id: 'NUEVO', label: '1. Nuevo', color: '#64748B' },
  { id: 'CONTACTADO', label: '2. Contactado', color: '#0284C7' },
  { id: 'CALIFICADO', label: '3. Calificado', color: '#0F172A' },
  { id: 'OPORTUNIDAD', label: '4. Oportunidad', color: '#D97706' },
  { id: 'COTIZADO', label: '5. Cotizado', color: '#D32F2F' },
  { id: 'NEGOCIACIÓN', label: '6. Negociación', color: '#9A0007' },
  { id: 'GANADO', label: '7. Ganado ✅', color: '#10B981' },
  { id: 'PERDIDO', label: '8. Perdido ❌', color: '#EF4444' },
];

export const OportunidadesModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [oportunidades, setOportunidades] = useState<OportunidadFSPM[]>(OPORTUNIDADES_FSPM);
  const [filtroResponsable, setFiltroResponsable] = useState<string>('todos');

  const moverEtapa = (id: string, nuevaEtapa: EtapaOportunidad) => {
    setOportunidades(prev =>
      prev.map(opp => (opp.id === id ? { ...opp, etapa: nuevaEtapa } : opp))
    );
  };

  const filtradas = oportunidades.filter(
    opp => filtroResponsable === 'todos' || opp.responsable.includes(filtroResponsable)
  );

  const totalMontoPipeline = filtradas.reduce((acc, o) => acc + o.montoEstimado, 0);
  const totalPonderado = filtradas.reduce((acc, o) => acc + (o.montoEstimado * o.probabilidad) / 100, 0);

  // Gráfica de conteo por etapa
  const dataEtapas = ETAPAS_KANBAN.map(e => ({
    etapa: e.label.split(' ')[1] || e.label,
    cantidad: filtradas.filter(o => o.etapa === e.id).length,
    monto: filtradas.filter(o => o.etapa === e.id).reduce((sum, o) => sum + o.montoEstimado, 0) / 1000000,
    color: e.color,
  }));

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
              backgroundColor: '#D32F2F',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Briefcase size={26} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: colores.textoClaro }}>
              Módulo Oportunidades &amp; Pipeline Comercial
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: colores.textoMedio }}>
              Corazón comercial FSPM · Tablero Kanban interactivo, probabilidades y cotizaciones
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '11px', color: colores.textoMedio, fontWeight: '700' }}>TOTAL PIPELINE</span>
            <div style={{ fontSize: '18px', fontWeight: '900', color: colores.textoClaro }}>
              ${(totalMontoPipeline / 1000000).toFixed(2)} M
            </div>
          </div>
          <div style={{ width: '1px', height: '30px', backgroundColor: colores.borde }} />
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '11px', color: '#D97706', fontWeight: '700' }}>PONDERADO</span>
            <div style={{ fontSize: '18px', fontWeight: '900', color: '#D97706' }}>
              ${(totalPonderado / 1000000).toFixed(2)} M
            </div>
          </div>

          <button
            style={{
              padding: '10px 16px',
              borderRadius: '10px',
              backgroundColor: colores.primario,
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
            <Plus size={16} /> Nueva Oportunidad
          </button>
        </div>
      </div>

      {/* ── FILTROS Y GRÁFICA DE ETAPAS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px' }}>
        {/* Gráfica de Barras por Etapa */}
        <div
          style={{
            backgroundColor: colores.fondoPrincipal,
            borderRadius: '18px',
            padding: '20px',
            border: `1px solid ${colores.borde}`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: colores.textoClaro }}>
              Volumen en Pipeline por Etapa ($ Millones)
            </h3>
            <span style={{ fontSize: '11px', color: colores.textoMedio }}>
              {filtradas.length} Proyectos Activos
            </span>
          </div>
          <div style={{ height: '140px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataEtapas} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="etapa" stroke="#475569" fontSize={11} fontWeight={600} />
                <YAxis stroke="#94A3B8" fontSize={10} tickFormatter={(v) => `$${v}M`} />
                <Tooltip
                  formatter={(val: any) => [`$${val} M`, 'Monto']}
                  contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '8px', border: 'none', fontSize: '11px' }}
                />
                <Bar dataKey="monto" radius={[4, 4, 0, 0]}>
                  {dataEtapas.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filtro por Ejecutivo */}
        <div
          style={{
            backgroundColor: colores.fondoPrincipal,
            borderRadius: '18px',
            padding: '20px',
            border: `1px solid ${colores.borde}`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: '12px', fontWeight: '700', color: colores.textoMedio, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Filter size={14} /> Filtrar por Responsable Comercial:
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['todos', 'Fernanda', 'Alfonso', 'Luis Gerardo', 'Edgar'].map((resp) => (
              <button
                key={resp}
                onClick={() => setFiltroResponsable(resp)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: filtroResponsable === resp ? '800' : '600',
                  border: `1px solid ${filtroResponsable === resp ? colores.primario : colores.borde}`,
                  backgroundColor: filtroResponsable === resp ? '#FEE2E2' : colores.fondoTerciario,
                  color: filtroResponsable === resp ? colores.primario : colores.textoMedio,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {resp === 'todos' ? 'Todos los Ejecutivos' : resp}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── TABLERO KANBAN INTERACTIVO ── */}
      <div
        className="animate-fade-up delay-2"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
          alignItems: 'start',
          overflowX: 'auto',
          paddingBottom: '20px',
        }}
      >
        {ETAPAS_KANBAN.map((columna) => {
          const itemsColumna = filtradas.filter(opp => opp.etapa === columna.id);
          const totalColumna = itemsColumna.reduce((sum, o) => sum + o.montoEstimado, 0);

          return (
            <div
              key={columna.id}
              className="fspm-card"
              style={{
                backgroundColor: colores.fondoSecundario,
                borderRadius: '16px',
                border: `1px solid ${colores.borde}`,
                minHeight: '480px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {/* Header de columna Kanban */}
              <div
                style={{
                  padding: '14px 16px',
                  borderBottom: `2px solid ${columna.color}`,
                  backgroundColor: colores.fondoPrincipal,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: colores.textoClaro }}>
                    {columna.label}
                  </div>
                  <div style={{ fontSize: '11px', color: colores.textoMedio, fontWeight: '700' }}>
                    ${(totalColumna / 1000000).toFixed(2)} M
                  </div>
                </div>
                <span
                  style={{
                    backgroundColor: `${columna.color}20`,
                    color: columna.color,
                    padding: '2px 8px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: '800',
                  }}
                >
                  {itemsColumna.length}
                </span>
              </div>

              {/* Tarjetas de oportunidades */}
              <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                {itemsColumna.map((opp) => (
                  <div
                    key={opp.id}
                    className="fspm-card-interactive"
                    style={{
                      backgroundColor: colores.fondoPrincipal,
                      borderRadius: '14px',
                      padding: '14px',
                      border: `1px solid ${colores.borde}`,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    {/* Cliente y Código */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <span style={{ fontSize: '11px', fontWeight: '800', color: colores.primario }}>
                        {opp.codigo}
                      </span>
                      <span
                        style={{
                          fontSize: '10.5px',
                          fontWeight: '800',
                          padding: '1px 6px',
                          borderRadius: '4px',
                          backgroundColor: opp.probabilidad >= 60 ? '#D1FAE5' : '#FEF3C7',
                          color: opp.probabilidad >= 60 ? '#059669' : '#D97706',
                        }}
                      >
                        {opp.probabilidad}%
                      </span>
                    </div>

                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '800', color: colores.textoClaro }}>
                        {opp.cliente.split('—')[0].trim()}
                      </div>
                      <div style={{ fontSize: '11.5px', color: colores.textoMedio, marginTop: '2px', lineHeight: 1.3 }}>
                        {opp.proyecto}
                      </div>
                    </div>

                    {/* Monto y Producto */}
                    <div style={{ padding: '8px 10px', backgroundColor: colores.fondoTerciario, borderRadius: '8px' }}>
                      <div style={{ fontSize: '14px', fontWeight: '900', color: '#10B981' }}>
                        ${opp.montoEstimado.toLocaleString()} MXN
                      </div>
                      <div style={{ fontSize: '10.5px', color: colores.textoMedio, marginTop: '2px' }}>
                        {opp.producto}
                      </div>
                    </div>

                    {/* Cotización / Licitación asociada */}
                    {opp.cotizacionAsociada && (
                      <div style={{ fontSize: '11px', color: '#D97706', fontWeight: '700' }}>
                        📄 Cotización: {opp.cotizacionAsociada}
                      </div>
                    )}

                    {/* Responsable y Cierre */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: colores.textoMedio }}>
                      <span>Resp: <strong>{opp.responsable.split(' ')[0]}</strong></span>
                      <span>📅 {opp.fechaEstimadaCierre}</span>
                    </div>

                    {/* Selector interactivo de cambio de etapa */}
                    <div style={{ borderTop: `1px solid ${colores.borde}`, paddingTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '10px', color: colores.textoOscuro }}>Mover a:</span>
                      <select
                        value={opp.etapa}
                        onChange={(e) => moverEtapa(opp.id, e.target.value as EtapaOportunidad)}
                        style={{
                          fontSize: '11px',
                          fontWeight: '700',
                          padding: '4px 6px',
                          borderRadius: '6px',
                          border: `1px solid ${colores.borde}`,
                          backgroundColor: colores.fondoTerciario,
                          color: colores.textoClaro,
                          outline: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        {ETAPAS_KANBAN.map(e => (
                          <option key={e.id} value={e.id}>
                            {e.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}

                {itemsColumna.length === 0 && (
                  <div style={{ padding: '24px 10px', textAlign: 'center', color: colores.textoOscuro, fontSize: '12px' }}>
                    Sin oportunidades en esta etapa
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
