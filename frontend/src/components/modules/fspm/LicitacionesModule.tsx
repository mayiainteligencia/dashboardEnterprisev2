import React, { useState } from 'react';
import {
  Landmark,
  Plus,
  Clock,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  FileText,
  Folder,
  ChevronRight,
  ShieldAlert,
  Search,
  CheckSquare,
  FileCheck2
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { brandingConfig } from '../../../config/branding';
import { LICITACIONES_FSPM } from '../../../fspm/fspmData';
import type { LicitacionFSPM, ChecklistDocumento, EstadoChecklist } from '../../../fspm/fspmData';

export const LicitacionesModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [licitaciones, setLicitaciones] = useState<LicitacionFSPM[]>(LICITACIONES_FSPM);
  const [licitacionSeleccionada, setLicitacionSeleccionada] = useState<LicitacionFSPM>(LICITACIONES_FSPM[0]);
  const [busqueda, setBusqueda] = useState('');

  // Cambiar estado de un requisito en el checklist
  const toggleChecklistEstado = (licId: string, checkId: string, nuevoEstado: EstadoChecklist) => {
    setLicitaciones(prev =>
      prev.map(lic => {
        if (lic.id !== licId) return lic;
        const nuevoChecklist = lic.checklist.map(chk =>
          chk.id === checkId ? { ...chk, estado: nuevoEstado } : chk
        );
        return { ...lic, checklist: nuevoChecklist };
      })
    );
    if (licitacionSeleccionada.id === licId) {
      setLicitacionSeleccionada(prev => ({
        ...prev,
        checklist: prev.checklist.map(chk =>
          chk.id === checkId ? { ...chk, estado: nuevoEstado } : chk
        )
      }));
    }
  };

  const getSemaforoBadge = (semaforo: LicitacionFSPM['semaforo']) => {
    switch (semaforo) {
      case 'CRITICO':
        return { label: '🔴 Menos de 72 horas (Crítico)', bg: '#FEF2F2', text: '#B91C1C', border: '#F87171' };
      case 'ALERTA':
        return { label: '🟡 3–10 días (Preparación)', bg: '#FFFBEB', text: '#B45309', border: '#FCD34D' };
      case 'OK':
        return { label: '🟢 Más de 10 días (En plazo)', bg: '#ECFDF5', text: '#047857', border: '#A7F3D0' };
    }
  };

  const getCheckBadge = (estado: EstadoChecklist) => {
    switch (estado) {
      case 'LISTO':
        return { icon: <CheckCircle2 size={16} color="#10B981" />, label: 'Listo ✅', bg: '#D1FAE5', text: '#059669' };
      case 'EN_REVISION':
        return { icon: <Clock size={16} color="#D97706" />, label: 'En revisión 🟡', bg: '#FEF3C7', text: '#D97706' };
      case 'URGENTE':
        return { icon: <AlertCircle size={16} color="#EF4444" />, label: 'Urgente 🔴', bg: '#FEE2E2', text: '#DC2626' };
      case 'PENDIENTE':
      default:
        return { icon: <AlertTriangle size={16} color="#64748B" />, label: 'Pendiente ⬜', bg: '#F1F5F9', text: '#475569' };
    }
  };

  // Datos para gráfica comparativa de montos de licitación
  const dataLicitacionesMontos = licitaciones.map(l => ({
    nombre: l.dependencia.split('—')[0].trim(),
    monto: l.montoEstimado / 1000000,
    probabilidad: l.probabilidad
  }));

  // Datos de radar para avance documental de la licitación seleccionada
  const totalDocs = licitacionSeleccionada.checklist.length;
  const listos = licitacionSeleccionada.checklist.filter(c => c.estado === 'LISTO').length;
  const porcentajeAvance = totalDocs > 0 ? Math.round((listos / totalDocs) * 100) : 0;

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
            <Landmark size={26} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: colores.textoClaro }}>
              Módulo Licitaciones &amp; Procedimientos Públicos/Privados
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: colores.textoMedio }}>
              Diferencial FSPM · Semáforo de fechas críticas, plataformas ComprasMX/Ariba y checklist documental
            </p>
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
          <Plus size={16} /> Nueva Licitación
        </button>
      </div>

      {/* ── ALERTA DE PRÓXIMO VENCIMIENTO CRÍTICO (ANIMADA & PULSANTE) ── */}
      <div
        className="pulse-red animate-fade-up delay-1"
        style={{
          padding: '16px 20px',
          backgroundColor: '#FEF2F2',
          borderRadius: '16px',
          border: '2px solid #EF4444',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ padding: '8px', borderRadius: '10px', backgroundColor: '#EF4444', color: '#FFFFFF' }}>
            <AlertCircle size={24} />
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '900', color: '#991B1B' }}>
              🔴 Próximo vencimiento inminente: Presentación PEMEX Complejos Procesadores
            </div>
            <div style={{ fontSize: '12px', color: '#B91C1C', marginTop: '2px' }}>
              Fecha límite: <strong>22/08/2026 a las 10:00 AM</strong> · Quedan <strong>36 horas</strong> para cargar en ComprasMX
            </div>
          </div>
        </div>

        <button
          onClick={() => setLicitacionSeleccionada(LICITACIONES_FSPM[0])}
          style={{
            padding: '8px 16px',
            borderRadius: '10px',
            backgroundColor: '#B91C1C',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '12px',
            fontWeight: '800',
            cursor: 'pointer',
          }}
        >
          Ver Checklist PEMEX
        </button>
      </div>

      {/* ── GRÁFICAS DE LICITACIONES ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '20px' }}>
        {/* Gráfica 1: Montos por Licitación */}
        <div style={{ backgroundColor: colores.fondoPrincipal, borderRadius: '18px', padding: '20px', border: `1px solid ${colores.borde}` }}>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '800', color: colores.textoClaro }}>
            Monto Estimado por Procedimiento ($ Millones)
          </h3>
          <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: colores.textoMedio }}>
            Total activo en concursos públicos: <strong>$14.80 M MXN</strong>
          </p>
          <div style={{ height: '180px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataLicitacionesMontos} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="nombre" stroke="#475569" fontSize={11} fontWeight={600} />
                <YAxis stroke="#94A3B8" fontSize={11} tickFormatter={(v) => `$${v}M`} />
                <Tooltip
                  formatter={(val: any) => [`$${val} M`, 'Monto Estimado']}
                  contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '8px', border: 'none', fontSize: '12px' }}
                />
                <Bar dataKey="monto" fill="#D97706" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfica 2: Semáforo de tiempos y avance */}
        <div style={{ backgroundColor: colores.fondoPrincipal, borderRadius: '18px', padding: '20px', border: `1px solid ${colores.borde}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '800', color: colores.textoClaro }}>
              Semáforo de Plazos Críticos
            </h3>
            <p style={{ margin: '0 0 14px 0', fontSize: '12px', color: colores.textoMedio }}>
              Regla operativa FSPM para entrega de propuestas
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ padding: '10px 14px', borderRadius: '10px', backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#B91C1C' }}>🔴 Menos de 72 horas</span>
                <span style={{ fontSize: '12px', fontWeight: '900', color: '#B91C1C' }}>1 Licitación (PEMEX)</span>
              </div>
              <div style={{ padding: '10px 14px', borderRadius: '10px', backgroundColor: '#FFFBEB', border: '1px solid #FCD34D', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#B45309' }}>🟡 3 a 10 días</span>
                <span style={{ fontSize: '12px', fontWeight: '900', color: '#B45309' }}>1 Licitación (CFE)</span>
              </div>
              <div style={{ padding: '10px 14px', borderRadius: '10px', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#047857' }}>🟢 Más de 10 días</span>
                <span style={{ fontSize: '12px', fontWeight: '900', color: '#047857' }}>2 Licitaciones (ASA / ASIPONA)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CUERPO: LISTA DE LICITACIONES + CHECKLIST DOCUMENTAL ── */}
      <div className="animate-fade-up delay-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '20px', alignItems: 'start' }}>
        
        {/* LISTA DE LICITACIONES */}
        <div
          className="fspm-card"
          style={{
            backgroundColor: colores.fondoPrincipal,
            borderRadius: '18px',
            border: `1px solid ${colores.borde}`,
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${colores.borde}`, backgroundColor: colores.fondoSecundario }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: colores.textoClaro }}>
              Procedimientos Activos ({licitaciones.length})
            </h3>
          </div>

          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {licitaciones.map((lic) => {
              const isSelected = licitacionSeleccionada.id === lic.id;
              const semaforo = getSemaforoBadge(lic.semaforo);

              return (
                <div
                  key={lic.id}
                  onClick={() => setLicitacionSeleccionada(lic)}
                  style={{
                    padding: '18px 20px',
                    borderBottom: `1px solid ${colores.borde}`,
                    backgroundColor: isSelected ? '#FEF3C730' : 'transparent',
                    borderLeft: isSelected ? `4px solid #D97706` : '4px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '800', color: colores.textoClaro }}>
                        {lic.dependencia}
                      </div>
                      <div style={{ fontSize: '12px', color: colores.textoMedio, marginTop: '2px' }}>
                        {lic.noProcedimiento} · <strong style={{ color: '#0284C7' }}>{lic.plataforma}</strong>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: '800',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        backgroundColor: semaforo.bg,
                        color: semaforo.text,
                        border: `1px solid ${semaforo.border}`,
                      }}
                    >
                      {lic.semaforo === 'CRITICO' ? '🔴 <72h' : lic.semaforo === 'ALERTA' ? '🟡 3-10d' : '🟢 >10d'}
                    </span>
                  </div>

                  <div style={{ fontSize: '12px', color: colores.textoMedio, marginTop: '6px', lineHeight: 1.3 }}>
                    {lic.objeto}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', fontSize: '12px' }}>
                    <span style={{ color: colores.textoMedio }}>
                      Monto: <strong style={{ color: '#10B981' }}>${(lic.montoEstimado / 1000000).toFixed(2)} M</strong> (Prob: {lic.probabilidad}%)
                    </span>
                    <span style={{ color: colores.textoMedio }}>
                      Resp: <strong>{lic.responsable}</strong>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FICHA DETALLADA Y CHECKLIST DOCUMENTAL (EL DIFERENCIAL FSPM) */}
        {licitacionSeleccionada && (
          <div
            style={{
              backgroundColor: colores.fondoPrincipal,
              borderRadius: '18px',
              border: `1px solid ${colores.borde}`,
              padding: '24px',
              boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
              position: 'sticky',
              top: '20px',
            }}
          >
            {/* Header de la Ficha */}
            <div style={{ borderBottom: `1px solid ${colores.borde}`, paddingBottom: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: '800', color: '#D97706', textTransform: 'uppercase' }}>
                    FICHA DE LICITACIÓN &amp; CHECKLIST
                  </span>
                  <h2 style={{ margin: '4px 0 0 0', fontSize: '18px', fontWeight: '800', color: colores.textoClaro }}>
                    {licitacionSeleccionada.dependencia}
                  </h2>
                  <div style={{ fontSize: '12px', color: colores.textoMedio, marginTop: '2px' }}>
                    Procedimiento: <strong>{licitacionSeleccionada.noProcedimiento}</strong>
                  </div>
                </div>

                <a
                  href={`https://drive.google.com/drive/search?q=${encodeURIComponent(licitacionSeleccionada.driveFolder)}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    padding: '8px 14px',
                    borderRadius: '10px',
                    backgroundColor: '#0F172A',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    fontSize: '12px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Folder size={15} /> 📁 Carpeta Drive
                </a>
              </div>
            </div>

            {/* Fechas Críticas */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '10px',
                padding: '12px',
                backgroundColor: colores.fondoTerciario,
                borderRadius: '12px',
                marginBottom: '18px',
                textAlign: 'center',
              }}
            >
              <div>
                <span style={{ fontSize: '10.5px', color: colores.textoMedio, fontWeight: '700' }}>JUNTA ACLARACIONES</span>
                <div style={{ fontSize: '12px', fontWeight: '800', color: colores.textoClaro, marginTop: '2px' }}>
                  {licitacionSeleccionada.juntaAclaraciones}
                </div>
              </div>

              <div style={{ borderLeft: `1px solid ${colores.borde}`, borderRight: `1px solid ${colores.borde}` }}>
                <span style={{ fontSize: '10.5px', color: '#B91C1C', fontWeight: '800' }}>PRESENTACIÓN</span>
                <div style={{ fontSize: '12px', fontWeight: '900', color: '#B91C1C', marginTop: '2px' }}>
                  {licitacionSeleccionada.presentacionPropuestas}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '10.5px', color: colores.textoMedio, fontWeight: '700' }}>FALLO</span>
                <div style={{ fontSize: '12px', fontWeight: '800', color: colores.textoClaro, marginTop: '2px' }}>
                  {licitacionSeleccionada.fallo}
                </div>
              </div>
            </div>

            {/* CHECKLIST DOCUMENTAL (¿QUÉ FALTA PARA ENTREGAR?) */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FileCheck2 size={16} color="#10B981" />
                  Checklist de Entrega Documental ({porcentajeAvance}% completado)
                </h3>
                <span style={{ fontSize: '11px', color: colores.textoMedio, fontWeight: '600' }}>
                  {listos} de {totalDocs} requisitos listos
                </span>
              </div>

              {/* Barra de progreso */}
              <div style={{ width: '100%', height: '8px', backgroundColor: colores.fondoTerciario, borderRadius: '4px', overflow: 'hidden', marginBottom: '16px' }}>
                <div style={{ width: `${porcentajeAvance}%`, height: '100%', backgroundColor: porcentajeAvance === 100 ? '#10B981' : '#D97706', transition: 'width 0.3s' }} />
              </div>

              {/* Lista de Requisitos */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '320px', overflowY: 'auto' }}>
                {licitacionSeleccionada.checklist.map((item) => {
                  const badge = getCheckBadge(item.estado);

                  return (
                    <div
                      key={item.id}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: `1px solid ${colores.borde}`,
                        backgroundColor: colores.fondoPrincipal,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                        {badge.icon}
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: '700', color: colores.textoClaro }}>
                            {item.documento}
                          </div>
                          <div style={{ fontSize: '11px', color: colores.textoMedio }}>
                            Responsable: <strong>{item.responsable}</strong> {item.notas ? `· ${item.notas}` : ''}
                          </div>
                        </div>
                      </div>

                      {/* Selector de estado interactivo */}
                      <select
                        value={item.estado}
                        onChange={(e) =>
                          toggleChecklistEstado(
                            licitacionSeleccionada.id,
                            item.id,
                            e.target.value as EstadoChecklist
                          )
                        }
                        style={{
                          fontSize: '11px',
                          fontWeight: '800',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          border: `1px solid ${colores.borde}`,
                          backgroundColor: badge.bg,
                          color: badge.text,
                          outline: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        <option value="LISTO">Listo ✅</option>
                        <option value="EN_REVISION">En revisión 🟡</option>
                        <option value="URGENTE">Urgente 🔴</option>
                        <option value="PENDIENTE">Pendiente ⬜</option>
                      </select>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
