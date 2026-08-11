import React, { useState, useEffect } from 'react';
import { 
  LifeBuoy, MessageSquare, Clock, CheckCircle2, AlertCircle, 
  Search, Filter, Sparkles, User, Tag, ChevronRight, BarChart2,
  ThumbsUp, Zap, Server, Activity, ShieldAlert, Cpu, Calendar,
  MoreVertical, Paperclip, Send, AlertTriangle, CornerDownRight,
  Database, Network
} from 'lucide-react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  ComposedChart, Area
} from 'recharts';
import { brandingConfig } from '../../config/branding';

const { colores } = brandingConfig;

const tema = {
  acento: '#F59E0B',
  acentoOscuro: '#B45309',
  acentoSuave: '#FEF3C7',
  sobreAcento: '#1F2937'
};

const mockTickets = [
  { id: 'T-8492', titulo: 'Acceso denegado a VPN ERP (Error 403)', usuario: 'Maria G.', email: 'maria.g@besco.mx', depto: 'Finanzas', prioridad: 'Alta', status: 'Abierto', tiempo: '10 min', asignado: 'Soporte N2', categoria: 'Accesos', sla: 'Riesgo Alto', description: 'Desde esta mañana no puedo ingresar al ERP usando la VPN corporativa. Me muestra un error 403 de permisos. Urge para el cierre mensual.' },
  { id: 'T-8491', titulo: 'Solicitud nuevo monitor secundario', usuario: 'Carlos M.', email: 'carlos.m@besco.mx', depto: 'Ventas', prioridad: 'Baja', status: 'En Proceso', tiempo: '2 horas', asignado: 'Hardware IT', categoria: 'Hardware', sla: 'En Tiempo', description: 'Solicito un segundo monitor para mi estación de trabajo para poder revisar los dashboards de ventas mientras atiendo llamadas.' },
  { id: 'T-8490', titulo: 'Caída de base de datos de Nómina', usuario: 'Ana R.', email: 'ana.r@besco.mx', depto: 'RRHH', prioridad: 'Crítica', status: 'Escalado', tiempo: '45 min', asignado: 'DevOps', categoria: 'Software', sla: 'Vencido', description: 'El sistema de nómina principal está arrojando Timeout Exceptions a todos los usuarios del departamento. No podemos procesar pagos.' },
  { id: 'T-8489', titulo: 'Reset de contraseña de Portal Interno', usuario: 'Luis P.', email: 'luis.p@besco.mx', depto: 'Operaciones', prioridad: 'Media', status: 'Resuelto (IA)', tiempo: '2 min', asignado: 'MAYIA Auto', categoria: 'Accesos', sla: 'Cumplido', description: 'Olvidé mi contraseña del portal y la cuenta se bloqueó tras 3 intentos fallidos.' },
  { id: 'T-8488', titulo: 'Impresora P2 (Piso 4) sin tóner', usuario: 'Elena S.', email: 'elena.s@besco.mx', depto: 'Admin', prioridad: 'Baja', status: 'En Proceso', tiempo: '1 día', asignado: 'Soporte N1', categoria: 'Hardware', sla: 'En Tiempo', description: 'La impresora central del piso 4 marca error de tóner vacío y está manchando las hojas.' },
  { id: 'T-8487', titulo: 'Lentitud extrema en red Wi-Fi Invitados', usuario: 'Roberto D.', email: 'roberto.d@besco.mx', depto: 'TI', prioridad: 'Media', status: 'Abierto', tiempo: '3 horas', asignado: 'Redes', categoria: 'Redes', sla: 'En Tiempo', description: 'Varios visitantes se quejan de que no pueden navegar ni abrir correos en la red Guest_BESCO.' },
  { id: 'T-8486', titulo: 'Licencia de AutoCAD expirada', usuario: 'Sofia T.', email: 'sofia.t@besco.mx', depto: 'Ingeniería', prioridad: 'Alta', status: 'Abierto', tiempo: '30 min', asignado: 'Soporte N2', categoria: 'Software', sla: 'En Tiempo', description: 'Al abrir el programa me indica que la licencia anual expiró ayer.' }
];

const mockTendencia = [
  { dia: 'Lun', resolucion: 4.2, tickets: 145, autoResueltos: 30 },
  { dia: 'Mar', resolucion: 3.8, tickets: 152, autoResueltos: 42 },
  { dia: 'Mie', resolucion: 3.4, tickets: 138, autoResueltos: 45 },
  { dia: 'Jue', resolucion: 3.1, tickets: 141, autoResueltos: 50 },
  { dia: 'Vie', resolucion: 3.5, tickets: 148, autoResueltos: 55 },
  { dia: 'Sab', resolucion: 2.1, tickets: 45, autoResueltos: 20 },
  { dia: 'Dom', resolucion: 2.0, tickets: 30, autoResueltos: 15 }
];

const mockCategorias = [
  { name: 'Accesos/Cuentas', value: 35 },
  { name: 'Hardware & Equipos', value: 25 },
  { name: 'Software / ERP', value: 20 },
  { name: 'Redes y VPN', value: 15 },
  { name: 'Consultas Generales', value: 5 }
];

const COLORS = ['#F59E0B', '#3B82F6', '#10B981', '#EF4444', '#8B5CF6'];

const mockRespuestasIA = [
  "He verificado los logs de la VPN y el usuario Maria G. tiene el certificado expirado. Para solucionarlo, debemos revocar el actual y emitir uno nuevo usando el script Revoke-VPNCert.",
  "Parece un problema general. Según Datadog, el clúster de base de datos de RRHH alcanzó el 100% de CPU. Sugiero escalar de inmediato al equipo de infraestructura para hacer un scale-out.",
  "Problema frecuente detectado. Puedo enviar automáticamente el enlace de auto-servicio de recuperación de contraseñas de Active Directory. ¿Deseas que lo envíe en tu nombre?"
];

const useAnimations = () => {
  useEffect(() => {
    const id = 'mesa-ayuda-animations-v2';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @keyframes fadeSlideUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
      @keyframes pulseAlert { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
      .ticket-row { transition: all 0.2s ease; cursor: pointer; }
      .ticket-row:hover { background-color: ${colores.fondoSecundario} !important; transform: translateX(4px); }
      .btn-action:hover { opacity: 0.9; transform: translateY(-1px); }
      .tab-hover:hover { color: ${tema.acentoOscuro} !important; background: ${tema.acentoSuave}20; }
    `;
    document.head.appendChild(style);
  }, []);
};

export const MesaAyuda: React.FC = () => {
  useAnimations();
  const [activeTab, setActiveTab] = useState('tickets');
  const [selectedTicket, setSelectedTicket] = useState(mockTickets[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [ticketFilter, setTicketFilter] = useState('Todos');

  const filteredTickets = mockTickets.filter(t => {
    const matchSearch = t.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        t.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        t.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = ticketFilter === 'Todos' || t.status === ticketFilter || t.prioridad === ticketFilter;
    return matchSearch && matchFilter;
  });

  const getPriorityColor = (pri: string) => {
    if (pri === 'Crítica') return '#EF4444';
    if (pri === 'Alta') return '#F97316';
    if (pri === 'Media') return '#F59E0B';
    return '#3B82F6';
  };
  
  const getStatusColor = (stat: string) => {
    if (stat === 'Abierto') return '#3B82F6';
    if (stat === 'En Proceso') return '#F59E0B';
    if (stat === 'Escalado') return '#EF4444';
    if (stat.includes('Resuelto')) return '#10B981';
    return colores.textoMedio;
  };

  const getSLAColor = (sla: string) => {
    if (sla === 'Vencido') return '#EF4444';
    if (sla === 'Riesgo Alto') return '#F59E0B';
    return '#10B981';
  };

  const currentIAResponse = 
    selectedTicket.prioridad === 'Alta' ? mockRespuestasIA[0] : 
    selectedTicket.prioridad === 'Crítica' ? mockRespuestasIA[1] : 
    mockRespuestasIA[2];

  return (
    <div style={{ maxWidth: 1300, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* HEADER SECTION */}
      <div style={{
        background: '#fff', borderRadius: '20px', padding: '24px', display: 'flex', alignItems: 'center', gap: '24px',
        boxShadow: colores.sombra, border: `1px solid ${colores.borde}`, borderLeft: `6px solid ${tema.acento}`,
        animation: 'fadeSlideUp 0.6s ease-out'
      }}>
        <div style={{
          width: '72px', height: '72px', borderRadius: '18px',
          background: `linear-gradient(135deg, ${tema.acento}20, ${tema.acento}50)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: tema.acentoOscuro
        }}>
          <LifeBuoy size={40} strokeWidth={1.5} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '6px' }}>
            <h1 style={{ margin: 0, fontSize: '26px', color: colores.textoClaro, fontWeight: '700' }}>Mesa de Ayuda y Soporte (ITSM)</h1>
            <span style={{
              background: `${tema.acento}15`, color: tema.acentoOscuro, padding: '6px 12px', borderRadius: '16px',
              fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px'
            }}>
              <Sparkles size={14}/> MAYIA Copilot Activo
            </span>
          </div>
          <p style={{ margin: 0, color: colores.textoMedio, fontSize: '15px' }}>
            Gestión centralizada de tickets de servicio técnico. Asignación, triaje y auto-resolución impulsados por IA generativa.
          </p>
        </div>
        <div>
           <button className="btn-action" style={{ padding: '12px 20px', background: tema.acento, color: '#fff', border: 'none', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600, boxShadow: `0 4px 12px ${tema.acento}40` }}>
             Nuevo Ticket
           </button>
        </div>
      </div>

      {/* KPIs GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        {[
          { label: 'TICKETS ABIERTOS', valor: '67', desc: 'Cola global activa', icono: MessageSquare, color: '#3B82F6', trend: '12 críticos / 8 vencidos' },
          { label: 'TIEMPO MEDIO RES.', valor: '3.4 hrs', desc: 'Promedio semanal', icono: Clock, color: '#10B981', trend: 'Mejoró 15% vs mes ant.' },
          { label: 'SATISFACCIÓN (CSAT)', valor: '98.2%', desc: 'Calificación usuarios', icono: ThumbsUp, color: tema.acento, trend: 'Excelente nivel' },
          { label: 'AUTO-RESUELTOS IA', valor: '42%', desc: 'Sin intervención humana', icono: Zap, color: '#8B5CF6', trend: 'Ahorro: 145 hrs/mes' }
        ].map((kpi, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: '20px', padding: '24px',
            border: `1px solid ${colores.borde}`, borderTop: `4px solid ${kpi.color}`, boxShadow: colores.sombra,
            position: 'relative', overflow: 'hidden', animation: `fadeSlideUp 0.6s ease-out ${i * 0.1}s backwards`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: colores.textoOscuro, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{kpi.label}</div>
                <div style={{ fontSize: '32px', fontWeight: '800', color: colores.textoClaro, marginTop: '8px' }}>{kpi.valor}</div>
                <div style={{ fontSize: '13px', color: colores.textoMedio, marginTop: '4px' }}>{kpi.desc}</div>
              </div>
              <div style={{ padding: '12px', borderRadius: '16px', background: `${kpi.color}15`, color: kpi.color }}>
                <kpi.icono size={24} />
              </div>
            </div>
            <div style={{ marginTop: '16px', fontSize: '13px', color: colores.textoMedio, background: colores.fondoSecundario, padding: '8px 12px', borderRadius: '8px', display: 'inline-block' }}>
              {kpi.trend}
            </div>
          </div>
        ))}
      </div>

      {/* TABS NAVIGATION */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: `1px solid ${colores.borde}` }}>
        {[
          { id: 'tickets', label: 'Centro de Resolución', icon: Server },
          { id: 'metricas', label: 'Métricas e Informes', icon: BarChart2 },
          { id: 'auto-ia', label: 'Flujos Auto-Resolución (IA)', icon: Zap },
          { id: 'knowledge-base', label: 'Base de Conocimientos', icon: Database }
        ].map(tab => {
          const active = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="tab-hover"
              style={{
                background: active ? `${tema.acento}10` : 'transparent', border: 'none', padding: '14px 20px',
                fontSize: '14px', fontWeight: active ? 'bold' : '600', color: active ? tema.acentoOscuro : colores.textoMedio,
                borderBottom: active ? `3px solid ${tema.acento}` : '3px solid transparent',
                cursor: 'pointer', transition: 'all 0.2s ease', marginBottom: '-1px', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '8px 8px 0 0'
              }}
            >
              <tab.icon size={18}/> {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: TICKETS MASTER-DETAIL */}
      {activeTab === 'tickets' && (
        <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '24px', animation: 'fadeSlideUp 0.4s ease-out', minHeight: '750px' }}>
          
          {/* LEFT PANEL: TICKET LIST */}
          <div style={{ background: '#fff', borderRadius: '20px', border: `1px solid ${colores.borde}`, boxShadow: colores.sombra, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            
            {/* Toolbar Filters */}
            <div style={{ padding: '20px', borderBottom: `1px solid ${colores.borde}`, background: colores.fondoSecundario }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: colores.textoClaro }}>Bandeja de Entrada</h3>
              
              <div style={{ position: 'relative', marginBottom: '12px' }}>
                <Search size={18} color={colores.textoOscuro} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text" placeholder="Buscar por ID, título, usuario..." 
                  value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                  style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '10px', border: `1px solid ${colores.borde}`, outline: 'none', fontSize: '14px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                {['Todos', 'Abierto', 'Crítica', 'En Proceso', 'Resuelto (IA)'].map(f => (
                  <button key={f} onClick={() => setTicketFilter(f)}
                    style={{
                      padding: '6px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
                      background: ticketFilter === f ? tema.acento : '#fff',
                      color: ticketFilter === f ? '#fff' : colores.textoMedio,
                      border: ticketFilter === f ? `1px solid ${tema.acento}` : `1px solid ${colores.borde}`
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Ticket List */}
            <div style={{ overflowY: 'auto', flex: 1, padding: '12px' }}>
              {filteredTickets.map(ticket => (
                <div 
                  key={ticket.id} 
                  onClick={() => setSelectedTicket(ticket)}
                  className="ticket-row"
                  style={{ 
                    padding: '16px', borderRadius: '12px', marginBottom: '8px',
                    background: selectedTicket.id === ticket.id ? `${tema.acento}10` : '#fff',
                    border: selectedTicket.id === ticket.id ? `1px solid ${tema.acento}50` : `1px solid ${colores.borde}`,
                    borderLeft: selectedTicket.id === ticket.id ? `4px solid ${tema.acento}` : `1px solid ${colores.borde}`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: colores.textoOscuro }}>{ticket.id}</span>
                    <span style={{ fontSize: '12px', color: colores.textoMedio, display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12}/> {ticket.tiempo}</span>
                  </div>
                  
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: colores.textoClaro, lineHeight: '1.4' }}>{ticket.titulo}</h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: colores.textoMedio }}>
                      <User size={14}/> {ticket.usuario} ({ticket.depto})
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600, background: `${getPriorityColor(ticket.prioridad)}15`, color: getPriorityColor(ticket.prioridad) }}>
                        P: {ticket.prioridad}
                      </span>
                      <span style={{ padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600, background: `${getStatusColor(ticket.status)}15`, color: getStatusColor(ticket.status) }}>
                        {ticket.status}
                      </span>
                      {ticket.sla === 'Vencido' && (
                        <span style={{ padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600, background: '#EF444415', color: '#EF4444', animation: 'pulseAlert 2s infinite' }}>SLA Vencido</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredTickets.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: colores.textoMedio }}>
                  <Search size={32} style={{ opacity: 0.3, marginBottom: '12px' }} />
                  <p>No se encontraron tickets con esos filtros.</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL: INSPECTOR & RESOLUTION */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* TICKET HEADER DETAILS */}
            <div style={{ background: '#fff', borderRadius: '20px', border: `1px solid ${colores.borde}`, boxShadow: colores.sombra, padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '15px', color: colores.textoOscuro, fontWeight: 'bold', fontFamily: 'monospace', background: colores.fondoSecundario, padding: '4px 10px', borderRadius: '8px' }}>{selectedTicket.id}</span>
                    <span style={{ padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 600, background: `${getPriorityColor(selectedTicket.prioridad)}20`, color: getPriorityColor(selectedTicket.prioridad) }}>Prioridad: {selectedTicket.prioridad}</span>
                    <span style={{ padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 600, background: `${getStatusColor(selectedTicket.status)}20`, color: getStatusColor(selectedTicket.status) }}>{selectedTicket.status}</span>
                  </div>
                  <h2 style={{ margin: 0, fontSize: '24px', color: colores.textoClaro, fontWeight: '700', lineHeight: '1.3' }}>{selectedTicket.titulo}</h2>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{ padding: '8px', background: 'transparent', border: `1px solid ${colores.borde}`, borderRadius: '8px', cursor: 'pointer', color: colores.textoMedio }}><MoreVertical size={20}/></button>
                </div>
              </div>

              {/* TICKET METADATA GRID */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', background: colores.fondoSecundario, padding: '20px', borderRadius: '16px', marginBottom: '24px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: colores.textoMedio, marginBottom: '4px' }}>Solicitante</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: colores.textoClaro }}>{selectedTicket.usuario}</div>
                  <div style={{ fontSize: '12px', color: colores.textoOscuro }}>{selectedTicket.email}</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: colores.textoMedio, marginBottom: '4px' }}>Departamento</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: colores.textoClaro }}>{selectedTicket.depto}</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: colores.textoMedio, marginBottom: '4px' }}>Asignado a</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: selectedTicket.asignado.includes('MAYIA') ? '#8B5CF6' : '#3B82F6' }}/>
                    {selectedTicket.asignado}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: colores.textoMedio, marginBottom: '4px' }}>Estado SLA</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: getSLAColor(selectedTicket.sla) }}>{selectedTicket.sla}</div>
                </div>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: colores.textoClaro }}>Descripción del Reporte</h4>
                <p style={{ margin: 0, fontSize: '15px', color: colores.textoMedio, lineHeight: '1.6', background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  {selectedTicket.description}
                </p>
              </div>

              {/* MAYIA AI Assistant Box */}
              <div style={{ 
                background: `linear-gradient(to right, ${tema.acento}10, transparent)`, border: `1px solid ${tema.acento}30`,
                borderLeft: `4px solid ${tema.acento}`, padding: '24px', borderRadius: '16px', marginBottom: '32px' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: tema.acentoOscuro, fontWeight: '700', marginBottom: '12px', fontSize: '16px' }}>
                  <Sparkles size={20}/> Análisis y Sugerencia de MAYIA Copilot
                </div>
                <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: colores.textoClaro, lineHeight: '1.6' }}>
                  {currentIAResponse}
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="btn-action" style={{ padding: '10px 20px', background: tema.acento, color: '#fff', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CornerDownRight size={16}/> Aplicar Solución Sugerida
                  </button>
                  <button className="btn-action" style={{ padding: '10px 20px', background: '#fff', color: colores.textoMedio, border: `1px solid ${colores.borde}`, borderRadius: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Modificar Respuesta
                  </button>
                </div>
              </div>

              {/* Action Box / Reply */}
              <div>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: colores.textoClaro }}>Responder al Usuario</h4>
                <div style={{ border: `1px solid ${colores.borde}`, borderRadius: '16px', overflow: 'hidden' }}>
                  <textarea 
                    placeholder="Escribe tu respuesta aquí. Puedes usar plantillas o la respuesta de IA..." 
                    style={{ width: '100%', minHeight: '120px', border: 'none', padding: '16px', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                  />
                  <div style={{ background: colores.fondoSecundario, padding: '12px 16px', borderTop: `1px solid ${colores.borde}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: colores.textoMedio }}><Paperclip size={18}/></button>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: colores.textoMedio }}><Tag size={18}/></button>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button className="btn-action" style={{ padding: '8px 24px', background: '#10B981', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
                        Resolver
                      </button>
                      <button className="btn-action" style={{ padding: '8px 24px', background: tema.acentoOscuro, color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        Enviar <Send size={14}/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: METRICAS */}
      {activeTab === 'metricas' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeSlideUp 0.4s ease-out' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            
            <div style={{ background: '#fff', borderRadius: '20px', padding: '24px', border: `1px solid ${colores.borde}`, boxShadow: colores.sombra }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', color: colores.textoClaro }}>Volumen de Tickets vs Tiempo de Resolución</h3>
              <div style={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={mockTendencia} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colores.borde} />
                    <XAxis dataKey="dia" stroke={colores.textoOscuro} fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis yAxisId="left" stroke={colores.textoOscuro} fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis yAxisId="right" orientation="right" stroke={colores.textoOscuro} fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: colores.sombraMedia }} />
                    <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }}/>
                    
                    <Bar yAxisId="left" dataKey="tickets" name="Tickets Totales" fill={colores.fondoTerciario} radius={[4, 4, 0, 0]} barSize={30} />
                    <Bar yAxisId="left" dataKey="autoResueltos" name="Resueltos por IA" fill={tema.acento} radius={[4, 4, 0, 0]} barSize={30} />
                    <Line yAxisId="right" type="monotone" dataKey="resolucion" name="Tiempo Medio (hrs)" stroke="#3B82F6" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{ background: '#fff', borderRadius: '20px', padding: '24px', border: `1px solid ${colores.borde}`, boxShadow: colores.sombra }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', color: colores.textoClaro }}>Categorización de Incidentes</h3>
              <div style={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={mockCategorias} cx="50%" cy="45%" innerRadius={70} outerRadius={110} paddingAngle={5} dataKey="value" label={false}>
                      {mockCategorias.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: colores.sombraMedia }} />
                    <Legend verticalAlign="bottom" height={80} wrapperStyle={{ fontSize: '12px' }}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* PLACEHOLDERS PARA OTRAS TABS */}
      {(activeTab === 'auto-ia' || activeTab === 'knowledge-base') && (
        <div style={{ background: '#fff', padding: '80px 40px', borderRadius: '20px', border: `1px solid ${colores.borde}`, textAlign: 'center', color: colores.textoMedio, animation: 'fadeSlideUp 0.4s ease-out' }}>
          {activeTab === 'auto-ia' ? <Zap size={72} color={tema.acento} style={{ marginBottom: '24px', opacity: 0.5 }} /> : <Database size={72} color={tema.acento} style={{ marginBottom: '24px', opacity: 0.5 }} />}
          <h3 style={{ margin: '0 0 16px 0', color: colores.textoClaro, fontSize: '24px' }}>Módulo Avanzado: {activeTab.replace('-', ' ').toUpperCase()}</h3>
          <p style={{ fontSize: '16px', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Aquí podrás configurar los árboles de decisión de MAYIA, subir nuevos documentos para entrenamiento de la Base de Conocimiento (RAG) y establecer reglas automáticas de escalamiento.
          </p>
          <button style={{ marginTop: '24px', padding: '12px 24px', background: colores.fondoSecundario, border: `1px solid ${colores.borde}`, borderRadius: '10px', fontWeight: 600, color: colores.textoClaro, cursor: 'pointer' }}>Explorar Documentación</button>
        </div>
      )}

    </div>
  );
};
