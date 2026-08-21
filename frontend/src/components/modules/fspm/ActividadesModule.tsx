import React, { useState } from 'react';
import {
  CheckSquare,
  Plus,
  Phone,
  Mail,
  Users,
  MessageCircle,
  FileText,
  Building2,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  Filter
} from 'lucide-react';
import { brandingConfig } from '../../../config/branding';
import { ACTIVIDADES_FSPM, CLIENTES_FSPM } from '../../../fspm/fspmData';
import type { ActividadFSPM, TipoActividad } from '../../../fspm/fspmData';

export const ActividadesModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [actividades, setActividades] = useState<ActividadFSPM[]>(ACTIVIDADES_FSPM);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');

  // Formulario rápido en 10 segundos
  const [nuevoTipo, setNuevoTipo] = useState<TipoActividad>('Llamada');
  const [nuevoCliente, setNuevoCliente] = useState(CLIENTES_FSPM[0].nombreComercial);
  const [nuevoContacto, setNuevoContacto] = useState('');
  const [nuevoResultado, setNuevoResultado] = useState('');
  const [nuevaProximaAccion, setNuevaProximaAccion] = useState('');
  const [nuevaFechaAccion, setNuevaFechaAccion] = useState('2026-08-25');

  const agregarActividad = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoResultado.trim() || !nuevaProximaAccion.trim()) return;

    const nueva: ActividadFSPM = {
      id: `ACT-${Date.now()}`,
      tipo: nuevoTipo,
      cliente: nuevoCliente,
      contacto: nuevoContacto || 'Contacto asignado',
      ejecutivo: 'Fernanda Reza',
      fechaRealizada: new Date().toLocaleDateString('es-ES'),
      resultado: nuevoResultado,
      proximaAccion: nuevaProximaAccion,
      fechaProximaAccion: nuevaFechaAccion,
      estado: 'Pendiente',
    };

    setActividades([nueva, ...actividades]);
    setNuevoResultado('');
    setNuevaProximaAccion('');
    setModalAbierto(false);
  };

  const getTipoIcono = (tipo: TipoActividad) => {
    switch (tipo) {
      case 'Llamada':
        return <Phone size={15} color="#0284C7" />;
      case 'Email':
        return <Mail size={15} color="#D97706" />;
      case 'Reunión':
        return <Users size={15} color="#10B981" />;
      case 'WhatsApp':
        return <MessageCircle size={15} color="#25D366" />;
      case 'Entrega Documental':
      case 'Seguimiento':
        return <FileText size={15} color="#D32F2F" />;
      case 'Visita Técnica':
        return <Building2 size={15} color="#0F172A" />;
      default:
        return <CheckSquare size={15} color="#475569" />;
    }
  };

  const filtradas = actividades.filter(
    a => filtroTipo === 'todos' || a.tipo === filtroTipo
  );

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
              backgroundColor: '#10B981',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CheckSquare size={26} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: colores.textoClaro }}>
              Módulo Actividades &amp; Seguimiento Comercial
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: colores.textoMedio }}>
              Registro en 10 segundos · Regla de Oro: Ninguna oportunidad activa sin próxima acción
            </p>
          </div>
        </div>

        <button
          onClick={() => setModalAbierto(true)}
          className="fspm-btn"
          style={{
            padding: '10px 18px',
            borderRadius: '10px',
            backgroundColor: '#10B981',
            color: '#FFFFFF',
            border: 'none',
            fontWeight: '700',
            fontSize: '13px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
          }}
        >
          <Plus size={16} /> Registrar Interacción (10s)
        </button>
      </div>

      {/* ── REGLA DE ORO FSPM (ALERTA PERMANENTE) ── */}
      <div
        className="animate-fade-up delay-1 fspm-card"
        style={{
          padding: '16px 20px',
          backgroundColor: '#FFFBEB',
          borderRadius: '14px',
          border: '1px solid #FCD34D',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <AlertCircle size={22} color="#D97706" />
        <div style={{ fontSize: '13px', color: '#92400E' }}>
          <strong>Regla Operativa FSPM:</strong> Cada interacción registrada debe incluir obligatoriamente:{' '}
          <em>Fecha Realizada + Resultado Obtenido + Próxima Acción con Fecha de Compromiso</em> para evitar abandono de cotizaciones.
        </div>
      </div>

      {/* ── FILTROS POR TIPO DE ACTIVIDAD ── */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', fontWeight: '700', color: colores.textoMedio }}>Filtrar por:</span>
        {['todos', 'Llamada', 'Reunión', 'WhatsApp', 'Visita Técnica', 'Entrega Documental'].map((tipo) => (
          <button
            key={tipo}
            onClick={() => setFiltroTipo(tipo)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: filtroTipo === tipo ? '800' : '600',
              border: `1px solid ${filtroTipo === tipo ? '#10B981' : colores.borde}`,
              backgroundColor: filtroTipo === tipo ? '#D1FAE5' : colores.fondoPrincipal,
              color: filtroTipo === tipo ? '#059669' : colores.textoMedio,
              cursor: 'pointer',
            }}
          >
            {tipo === 'todos' ? 'Todas las Actividades' : tipo}
          </button>
        ))}
      </div>

      {/* ── TIMELINE DE ACTIVIDADES ── */}
      <div
        style={{
          backgroundColor: colores.fondoPrincipal,
          borderRadius: '18px',
          border: `1px solid ${colores.borde}`,
          padding: '24px',
        }}
      >
        <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: '800', color: colores.textoClaro }}>
          Historial de Interacciones &amp; Próximas Acciones ({filtradas.length})
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filtradas.map((act) => {
            const esVencida = act.estado === 'Vencida';
            return (
              <div
                key={act.id}
                style={{
                  padding: '16px 20px',
                  borderRadius: '14px',
                  border: `1px solid ${esVencida ? '#FCA5A5' : colores.borde}`,
                  backgroundColor: esVencida ? '#FEF2F230' : colores.fondoSecundario,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  gap: '16px',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', gap: '14px', flex: 1, minWidth: '280px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: colores.fondoPrincipal,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${colores.borde}`,
                      flexShrink: 0,
                    }}
                  >
                    {getTipoIcono(act.tipo)}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '11px', fontWeight: '800', color: '#0284C7', textTransform: 'uppercase' }}>
                        {act.tipo}
                      </span>
                      <span style={{ fontSize: '11px', color: colores.textoOscuro }}>• {act.fechaRealizada}</span>
                      <span style={{ fontSize: '11px', color: colores.textoMedio }}>por <strong>{act.ejecutivo}</strong></span>
                    </div>

                    <div style={{ fontSize: '14px', fontWeight: '800', color: colores.textoClaro, marginTop: '2px' }}>
                      {act.cliente.split('—')[0].trim()} · <span style={{ fontWeight: '500', color: colores.textoMedio }}>{act.contacto}</span>
                    </div>

                    {/* Resultado */}
                    <div style={{ fontSize: '13px', color: colores.textoMedio, marginTop: '6px', lineHeight: 1.4 }}>
                      <strong>Resultado:</strong> {act.resultado}
                    </div>
                  </div>
                </div>

                {/* Próxima Acción Box */}
                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: '10px',
                    backgroundColor: esVencida ? '#FEE2E2' : '#FEF3C7',
                    border: `1px solid ${esVencida ? '#F87171' : '#FCD34D'}`,
                    minWidth: '240px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10.5px', fontWeight: '800', color: esVencida ? '#B91C1C' : '#92400E' }}>
                    <span>{esVencida ? '⚠️ SEGUIMIENTO VENCIDO' : 'PRÓXIMA ACCIÓN'}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Calendar size={11} /> {act.fechaProximaAccion}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: esVencida ? '#991B1B' : '#78350F', marginTop: '4px' }}>
                    {act.proximaAccion}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── MODAL DE REGISTRO RÁPIDO EN 10 SEGUNDOS ── */}
      {modalAbierto && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3000,
          }}
          onClick={() => setModalAbierto(false)}
        >
          <div
            style={{
              width: '90%',
              maxWidth: '520px',
              backgroundColor: colores.fondoPrincipal,
              borderRadius: '20px',
              padding: '28px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              border: `1px solid ${colores.borde}`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '800', color: colores.textoClaro }}>
              + Nueva Actividad Comercial (10 Segundos)
            </h2>
            <p style={{ margin: '0 0 18px 0', fontSize: '12.5px', color: colores.textoMedio }}>
              Registra la interacción y programa de inmediato la próxima acción
            </p>

            <form onSubmit={agregarActividad} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: colores.textoClaro }}>Tipo de Interacción</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                  {(['Llamada', 'Email', 'Reunión', 'WhatsApp', 'Seguimiento', 'Visita Técnica'] as TipoActividad[]).map((tipo) => (
                    <button
                      key={tipo}
                      type="button"
                      onClick={() => setNuevoTipo(tipo)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '11.5px',
                        fontWeight: nuevoTipo === tipo ? '800' : '600',
                        border: `1px solid ${nuevoTipo === tipo ? '#10B981' : colores.borde}`,
                        backgroundColor: nuevoTipo === tipo ? '#D1FAE5' : colores.fondoTerciario,
                        color: nuevoTipo === tipo ? '#059669' : colores.textoMedio,
                        cursor: 'pointer',
                      }}
                    >
                      {tipo}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: colores.textoClaro }}>Cliente</label>
                <select
                  value={nuevoCliente}
                  onChange={(e) => setNuevoCliente(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: `1px solid ${colores.borde}`,
                    backgroundColor: colores.fondoTerciario,
                    fontSize: '13px',
                    marginTop: '4px',
                    outline: 'none',
                  }}
                >
                  {CLIENTES_FSPM.map((c) => (
                    <option key={c.id} value={c.nombreComercial}>
                      {c.nombreComercial}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: colores.textoClaro }}>Resultado de la Interacción</label>
                <textarea
                  required
                  rows={2}
                  value={nuevoResultado}
                  onChange={(e) => setNuevoResultado(e.target.value)}
                  placeholder="Ej: Se presentó adenda técnica con pruebas UL y mostraron interés en FireAde..."
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: `1px solid ${colores.borde}`,
                    backgroundColor: colores.fondoTerciario,
                    fontSize: '13px',
                    marginTop: '4px',
                    outline: 'none',
                    resize: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#B45309' }}>Próxima Acción Obligatoria</label>
                  <input
                    required
                    value={nuevaProximaAccion}
                    onChange={(e) => setNuevaProximaAccion(e.target.value)}
                    placeholder="Ej: Enviar cotización actualizada..."
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1px solid #FCD34D',
                      backgroundColor: '#FEF3C750',
                      fontSize: '13px',
                      marginTop: '4px',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#B45309' }}>Fecha Compromiso</label>
                  <input
                    type="date"
                    required
                    value={nuevaFechaAccion}
                    onChange={(e) => setNuevaFechaAccion(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1px solid #FCD34D',
                      backgroundColor: '#FEF3C750',
                      fontSize: '13px',
                      marginTop: '4px',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setModalAbierto(false)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '10px',
                    border: `1px solid ${colores.borde}`,
                    backgroundColor: 'transparent',
                    color: colores.textoMedio,
                    fontWeight: '700',
                    cursor: 'pointer',
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 20px',
                    borderRadius: '10px',
                    border: 'none',
                    backgroundColor: '#10B981',
                    color: '#FFFFFF',
                    fontWeight: '800',
                    cursor: 'pointer',
                  }}
                >
                  Guardar Actividad
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
