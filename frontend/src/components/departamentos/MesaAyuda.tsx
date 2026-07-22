import React, { useState } from 'react';
import { 
  Headphones, AlertCircle, Clock, CheckCircle2, UserCheck, 
  Search, Filter, ArrowUpRight, MessageSquare, Send, Zap, 
  FileText, ShieldAlert, Sparkles, ChevronRight, Layers, User
} from 'lucide-react';
import { brandingConfig } from '../../config/branding';

interface Ticket {
  id: string;
  folio: string;
  solicitante: string;
  departamento: string;
  asunto: string;
  descripcion: string;
  prioridad: 'critica' | 'alta' | 'media' | 'baja';
  estatus: 'abierto' | 'en_proceso' | 'escalado' | 'resuelto';
  nivel: 'Nivel 1 (IA)' | 'Nivel 2 (Técnico Sitio)' | 'Nivel 3 (Proveedor Expert)';
  tiempoSla: string;
  creadoHace: string;
  agenteAsignado: string;
  solucionSugeridaIA: string;
}

const ticketsIniciales: Ticket[] = [
  {
    id: 't1',
    folio: 'TCK-2026-9410',
    solicitante: 'Ing. Roberto Morales',
    departamento: 'Flotas & Logística CDMX',
    asunto: 'Falla en GPS y telemetría de Unidad 142 en Periférico Sur',
    descripcion: 'La unidad 142 dejó de transmitir señal de velocidad y ubicación GPS hace 15 minutos. Requiere reasignación urgente de ruta.',
    prioridad: 'critica',
    estatus: 'escalado',
    nivel: 'Nivel 2 (Técnico Sitio)',
    tiempoSla: '12 min restantes',
    creadoHace: '18 min',
    agenteAsignado: 'Téc. Héctor Cruz (Asignado por IA)',
    solucionSugeridaIA: 'Reiniciar módulo OBD-II en remoto o despachar cuadrilla de taller móvil CDMX Centro.',
  },
  {
    id: 't2',
    folio: 'TCK-2026-9412',
    solicitante: 'Lic. Sofía Ramírez',
    departamento: 'Dirección Comercial Centro',
    asunto: 'Sobretemperatura en Chiller HVAC - Polanco 04 (Nivel 3)',
    descripcion: 'El sistema HVAC reporta 28°C bajo piso técnico en el Nivel 3 del edificio Polanco 04.',
    prioridad: 'critica',
    estatus: 'en_proceso',
    nivel: 'Nivel 3 (Proveedor Expert)',
    tiempoSla: '28 min restantes',
    creadoHace: '32 min',
    agenteAsignado: 'Mantenimiento Pro (Proveedor Homologado)',
    solucionSugeridaIA: 'Ajustar válvula de derivación #4 y enviar técnico con repuesto de compresor rotativo.',
  },
  {
    id: 't3',
    folio: 'TCK-2026-9415',
    solicitante: 'Mtro. Fernando Silva',
    departamento: 'Administración & Finanzas MTY',
    asunto: 'Discrepancia en Factura FAC-7725 vs Orden de Compra ODC-9418',
    descripcion: 'La factura del proveedor incluye un cargo diferido de $120 MXN no presupuestado.',
    prioridad: 'alta',
    estatus: 'abierto',
    nivel: 'Nivel 1 (IA)',
    tiempoSla: '1h 15m restantes',
    creadoHace: '45 min',
    agenteAsignado: 'MAYIA Auditor IA',
    solucionSugeridaIA: 'Aplicar nota de crédito automática de $120 MXN bajo convenio marco vigente.',
  },
  {
    id: 't4',
    folio: 'TCK-2026-9418',
    solicitante: 'Arq. Roberto Gómez',
    departamento: 'Operaciones Inmuebles Santa Fe',
    asunto: 'Cámara CCTV #12 desconectada en estacionamiento subterráneo',
    descripcion: 'Pérdida de enlace IP de cámara analítica en la zona de carga de C.C. Santa Fe.',
    prioridad: 'media',
    estatus: 'en_proceso',
    nivel: 'Nivel 2 (Técnico Sitio)',
    tiempoSla: '2h 40m restantes',
    creadoHace: '1h 10m',
    agenteAsignado: 'Téc. Javier Ortiz',
    solucionSugeridaIA: 'Reiniciar puerto PoE del switch Cisco en MDF-02.',
  },
  {
    id: 't5',
    folio: 'TCK-2026-9422',
    solicitante: 'Dra. Elena Blancas',
    departamento: 'Recursos Humanos Corporativo',
    asunto: 'Acceso a módulo de capacitaciones en Academia MAYIA para nuevos ingresos',
    descripcion: 'Solicitud de enrolamiento masivo para 15 nuevos ingenieros en el diplomado de Prompting.',
    prioridad: 'baja',
    estatus: 'resuelto',
    nivel: 'Nivel 1 (IA)',
    tiempoSla: 'Completado',
    creadoHace: '3h 20m',
    agenteAsignado: 'MAYIA Auto-Enroll Agent',
    solucionSugeridaIA: 'Enrolamiento completado automáticamente vía API de LDAP.',
  },
];

export const MesaAyuda: React.FC = () => {
  const { colores, temas } = brandingConfig;
  const tema = temas.admin;

  const [tickets, setTickets] = useState<Ticket[]>(ticketsIniciales);
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [filtroPrioridad, setFiltroPrioridad] = useState<string>('todos');
  const [busqueda, setBusqueda] = useState('');
  const [ticketSeleccionado, setTicketSeleccionado] = useState<Ticket | null>(ticketsIniciales[0]);
  const [nuevaRespuesta, setNuevaRespuesta] = useState('');

  // Filtrado de tickets
  const ticketsFiltrados = tickets.filter(t => {
    const coincideEstado = filtroEstado === 'todos' || t.estatus === filtroEstado;
    const coincidePrioridad = filtroPrioridad === 'todos' || t.prioridad === filtroPrioridad;
    const coincideBusqueda = 
      t.folio.toLowerCase().includes(busqueda.toLowerCase()) ||
      t.asunto.toLowerCase().includes(busqueda.toLowerCase()) ||
      t.solicitante.toLowerCase().includes(busqueda.toLowerCase());
    return coincideEstado && coincidePrioridad && coincideBusqueda;
  });

  const getBadgesPrioridad = (p: string) => {
    switch (p) {
      case 'critica': return { label: 'CRÍTICA', bg: 'rgba(239, 68, 68, 0.15)', color: '#EF4444', border: 'rgba(239, 68, 68, 0.3)' };
      case 'alta': return { label: 'ALTA', bg: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B', border: 'rgba(245, 158, 11, 0.3)' };
      case 'media': return { label: 'MEDIA', bg: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6', border: 'rgba(59, 130, 246, 0.3)' };
      default: return { label: 'BAJA', bg: 'rgba(16, 185, 129, 0.15)', color: '#10B981', border: 'rgba(16, 185, 129, 0.3)' };
    }
  };

  const getBadgeEstatus = (e: string) => {
    switch (e) {
      case 'abierto': return { label: 'Abierto', color: '#F59E0B' };
      case 'en_proceso': return { label: 'En Proceso', color: '#3B82F6' };
      case 'escalado': return { label: 'Escalado N2/N3', color: '#EF4444' };
      case 'resuelto': return { label: 'Resuelto', color: '#10B981' };
      default: return { label: e, color: colores.textoMedio };
    }
  };

  const responderTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevaRespuesta.trim() || !ticketSeleccionado) return;
    alert(`Respuesta enviada al ticket ${ticketSeleccionado.folio}: "${nuevaRespuesta}"`);
    setNuevaRespuesta('');
  };

  const escalamientoManual = (ticketId: string) => {
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        const nuevoNivel = t.nivel === 'Nivel 1 (IA)' ? 'Nivel 2 (Técnico Sitio)' : 'Nivel 3 (Proveedor Expert)';
        return { ...t, nivel: nuevoNivel, estatus: 'escalado' };
      }
      return t;
    }));
    if (ticketSeleccionado && ticketSeleccionado.id === ticketId) {
      setTicketSeleccionado(prev => prev ? { ...prev, estatus: 'escalado' } : null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', color: colores.textoClaro }}>
      
      {/* 🎧 HEADER MESA DE AYUDA */}
      <div style={{
        background: `linear-gradient(135deg, ${colores.fondoSecundario} 0%, ${colores.fondoTerciario} 100%)`,
        borderRadius: '20px',
        padding: '24px',
        border: `1px solid ${colores.borde}`,
        boxShadow: colores.sombra,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '16px',
            background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 20px rgba(220, 38, 38, 0.35)'
          }}>
            <Headphones size={28} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800 }}>
                Mesa de Ayuda & Service Desk Enterprise
              </h1>
              <span style={{
                fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', padding: '4px 10px',
                borderRadius: '999px', background: 'rgba(220, 38, 38, 0.15)', color: '#EF4444',
                border: '1px solid rgba(220, 38, 38, 0.3)'
              }}>
                Gestión SLA • Nivel 1, 2 y 3
              </span>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: '14px', color: colores.textoMedio }}>
              Consola unificada de atención de incidentes, solicitudes de soporte técnico y resolución asistida por IA.
            </p>
          </div>
        </div>

        {/* KPIs de la Mesa de Ayuda */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ background: colores.fondoPrincipal, padding: '10px 16px', borderRadius: '12px', border: `1px solid ${colores.borde}`, textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: colores.textoMedio, fontWeight: 600 }}>Tickets Activos</span>
            <p style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#EF4444' }}>18 Abiertos</p>
          </div>
          <div style={{ background: colores.fondoPrincipal, padding: '10px 16px', borderRadius: '12px', border: `1px solid ${colores.borde}`, textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: colores.textoMedio, fontWeight: 600 }}>Tiempo Respuesta</span>
            <p style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#10B981' }}>3.4 min</p>
          </div>
          <div style={{ background: colores.fondoPrincipal, padding: '10px 16px', borderRadius: '12px', border: `1px solid ${colores.borde}`, textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: colores.textoMedio, fontWeight: 600 }}>Cumplimiento SLA</span>
            <p style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#3B82F6' }}>98.2%</p>
          </div>
        </div>
      </div>

      {/* 🔍 BARRA DE FILTROS & BUSCADOR */}
      <div style={{
        background: colores.fondoSecundario,
        borderRadius: '16px',
        padding: '16px 20px',
        border: `1px solid ${colores.borde}`,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '14px'
      }}>
        {/* Buscador */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1 1 280px', background: colores.fondoPrincipal, padding: '8px 14px', borderRadius: '10px', border: `1px solid ${colores.borde}` }}>
          <Search size={16} color={colores.textoMedio} />
          <input
            type="text"
            placeholder="Buscar por folio, solicitante o asunto..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', color: colores.textoClaro, fontSize: '13px' }}
          />
        </div>

        {/* Filtro Estado */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: colores.textoMedio, fontWeight: 600 }}>Estado:</span>
          {['todos', 'abierto', 'en_proceso', 'escalado', 'resuelto'].map(st => (
            <button
              key={st}
              onClick={() => setFiltroEstado(st)}
              style={{
                padding: '6px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '11.5px', fontWeight: 700,
                backgroundColor: filtroEstado === st ? tema.acento : colores.fondoPrincipal,
                color: filtroEstado === st ? tema.sobreAcento : colores.textoMedio,
                textTransform: 'capitalize'
              }}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Filtro Prioridad */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: colores.textoMedio, fontWeight: 600 }}>Prioridad:</span>
          {['todos', 'critica', 'alta', 'media', 'baja'].map(pr => (
            <button
              key={pr}
              onClick={() => setFiltroPrioridad(pr)}
              style={{
                padding: '6px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '11.5px', fontWeight: 700,
                backgroundColor: filtroPrioridad === pr ? colores.fondoTerciario : colores.fondoPrincipal,
                color: filtroPrioridad === pr ? colores.textoClaro : colores.textoMedio,
                textTransform: 'capitalize'
              }}
            >
              {pr}
            </button>
          ))}
        </div>
      </div>

      {/* 💼 CONTENEDOR SPLIT: LISTA DE TICKETS + DETALLE COMPLETO */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)', gap: '20px', alignItems: 'start' }}>
        
        {/* COLUMNA IZQUIERDA: LISTADO METICULOSO DE TICKETS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: colores.textoClaro }}>
              Tickets Registrados ({ticketsFiltrados.length})
            </span>
            <span style={{ fontSize: '12px', color: colores.textoMedio }}>Ordenado por prioridad y SLA</span>
          </div>

          {ticketsFiltrados.map(t => {
            const badgePr = getBadgesPrioridad(t.prioridad);
            const badgeSt = getBadgeEstatus(t.estatus);
            const isSelected = ticketSeleccionado?.id === t.id;

            return (
              <div
                key={t.id}
                onClick={() => setTicketSeleccionado(t)}
                style={{
                  background: isSelected ? colores.fondoTerciario : colores.fondoSecundario,
                  borderRadius: '16px',
                  padding: '16px',
                  border: isSelected ? `2px solid ${colores.primario}` : `1px solid ${colores.borde}`,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  boxShadow: isSelected ? colores.sombraMedia : 'none'
                }}
              >
                {/* Header Card */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: colores.primario }}>{t.folio}</span>
                    <span style={{
                      fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '6px',
                      background: badgePr.bg, color: badgePr.color, border: `1px solid ${badgePr.border}`
                    }}>
                      {badgePr.label}
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: badgeSt.color, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    ● {badgeSt.label}
                  </span>
                </div>

                {/* Asunto */}
                <h3 style={{ margin: 0, fontSize: '14.5px', fontWeight: 700, color: colores.textoClaro, lineHeight: 1.3 }}>
                  {t.asunto}
                </h3>

                {/* Solicitante y Depto */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: colores.textoMedio }}>
                  <span>👤 {t.solicitante} • <span style={{ color: colores.textoOscuro }}>{t.departamento}</span></span>
                  <span style={{ fontSize: '11px', color: colores.textoOscuro }}>Hace {t.creadoHace}</span>
                </div>

                {/* Footer Card: SLA Timer & Nivel */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  paddingTop: '8px', borderTop: `1px solid ${colores.borde}`, fontSize: '11.5px'
                }}>
                  <span style={{ color: '#F59E0B', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} /> SLA: {t.tiempoSla}
                  </span>
                  <span style={{ background: colores.fondoPrincipal, padding: '3px 8px', borderRadius: '6px', fontSize: '11px', color: colores.textoClaro, border: `1px solid ${colores.borde}` }}>
                    🛡️ {t.nivel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* COLUMNA DERECHA: DETALLE INTERACTIVO Y SOLUCIÓN IA DEL TICKET */}
        {ticketSeleccionado ? (
          <div style={{
            background: colores.fondoSecundario,
            borderRadius: '20px',
            padding: '24px',
            border: `1px solid ${colores.borde}`,
            boxShadow: colores.sombra,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            position: 'sticky',
            top: '20px'
          }}>
            {/* Header del Ticket Seleccionado */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 800, color: colores.primario }}>{ticketSeleccionado.folio}</span>
                  <span style={{
                    fontSize: '11px', fontWeight: 800, padding: '3px 10px', borderRadius: '999px',
                    background: getBadgesPrioridad(ticketSeleccionado.prioridad).bg,
                    color: getBadgesPrioridad(ticketSeleccionado.prioridad).color
                  }}>
                    {ticketSeleccionado.prioridad.toUpperCase()}
                  </span>
                </div>
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: colores.textoClaro }}>
                  {ticketSeleccionado.asunto}
                </h2>
              </div>

              <button
                onClick={() => escalamientoManual(ticketSeleccionado.id)}
                style={{
                  padding: '8px 14px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                  background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)', color: '#FFF',
                  fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px'
                }}
              >
                <ArrowUpRight size={14} /> Escalar Nivel ({ticketSeleccionado.nivel})
              </button>
            </div>

            {/* Info Solicitante */}
            <div style={{ background: colores.fondoPrincipal, padding: '14px', borderRadius: '12px', border: `1px solid ${colores.borde}`, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
                <span style={{ color: colores.textoMedio }}>Solicitante:</span>
                <span style={{ fontWeight: 700, color: colores.textoClaro }}>{ticketSeleccionado.solicitante}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
                <span style={{ color: colores.textoMedio }}>Departamento / Área:</span>
                <span style={{ fontWeight: 600, color: colores.textoClaro }}>{ticketSeleccionado.departamento}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
                <span style={{ color: colores.textoMedio }}>Asignado actual:</span>
                <span style={{ fontWeight: 700, color: colores.primario }}>{ticketSeleccionado.agenteAsignado}</span>
              </div>
            </div>

            {/* Descripción del Incidente */}
            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: colores.textoMedio, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Descripción del requerimiento:
              </span>
              <p style={{ margin: '6px 0 0', fontSize: '13.5px', color: colores.textoClaro, lineHeight: 1.5, background: colores.fondoPrincipal, padding: '12px', borderRadius: '10px', border: `1px solid ${colores.borde}` }}>
                {ticketSeleccionado.descripcion}
              </p>
            </div>

            {/* Sugerencia de Solución por Inteligencia Artificial (MAYIA Assist) */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(3, 140, 174, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
              borderRadius: '14px',
              padding: '16px',
              border: '1px solid rgba(3, 140, 174, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#038CAE', fontWeight: 700, fontSize: '13px' }}>
                <Sparkles size={16} /> Solución Sugerida por MAYIA AI Assist:
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: colores.textoClaro, lineHeight: 1.4 }}>
                {ticketSeleccionado.solucionSugeridaIA}
              </p>
              <button
                onClick={() => setNuevaRespuesta(ticketSeleccionado.solucionSugeridaIA)}
                style={{
                  alignSelf: 'flex-start', marginTop: '4px', padding: '5px 10px', borderRadius: '6px',
                  border: 'none', background: '#038CAE', color: '#FFF', fontSize: '11px', fontWeight: 700, cursor: 'pointer'
                }}
              >
                Usar esta respuesta rápida
              </button>
            </div>

            {/* Formulario de Respuesta / Resolución */}
            <form onSubmit={responderTicket} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: colores.textoMedio }}>
                Agregar Respuesta o Nota de Atención:
              </label>
              <textarea
                rows={3}
                placeholder="Escribe la solución o instrucciones para el usuario..."
                value={nuevaRespuesta}
                onChange={e => setNuevaRespuesta(e.target.value)}
                style={{
                  width: '100%', padding: '12px', borderRadius: '10px', border: `1px solid ${colores.borde}`,
                  background: colores.fondoPrincipal, color: colores.textoClaro, fontSize: '13px', outline: 'none', resize: 'vertical'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="submit"
                  style={{
                    padding: '10px 18px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                    background: tema.acento, color: tema.sobreAcento, fontWeight: 700, fontSize: '13px',
                    display: 'flex', alignItems: 'center', gap: '6px'
                  }}
                >
                  <Send size={14} /> Responder & Actualizar Ticket
                </button>
              </div>
            </form>

          </div>
        ) : (
          <div style={{ background: colores.fondoSecundario, borderRadius: '20px', padding: '40px', textAlign: 'center', color: colores.textoMedio }}>
            Selecciona un ticket de la lista para ver el detalle y resolución.
          </div>
        )}

      </div>

    </div>
  );
};
