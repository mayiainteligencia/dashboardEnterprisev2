import React, { useState } from 'react';
import { 
  Video, ShieldAlert, Cpu, Users, Mic, MicOff, VideoOff, 
  PhoneOff, Radio, Activity, AlertTriangle, CheckCircle2, MessageSquare, 
  Server, RefreshCw, Zap, Bot, MapPin, Eye, ShieldCheck, Truck, Clock, Layers
} from 'lucide-react';
import { brandingConfig } from '../../config/branding';

// Datos de los Directores / Jefes Comerciales en la Sala Virtual
interface Participante {
  id: string;
  nombre: string;
  cargo: string;
  zona: string;
  avatar: string;
  hablando: boolean;
  camara: boolean;
  mic: boolean;
}

const participantesIniciales: Participante[] = [
  { id: '1', nombre: 'Ing. Carlos Mendoza', cargo: 'Director General de Operaciones', zona: 'Corporativo BESCO', avatar: 'CM', hablando: true, camara: true, mic: true },
  { id: '2', nombre: 'Lic. Sofía Ramírez', cargo: 'Directora Comercial CDMX & Centro', zona: 'Región Centro', avatar: 'SR', hablando: false, camara: true, mic: true },
  { id: '3', nombre: 'Arq. Roberto Gómez', cargo: 'Jefe de Flotas y Logística Norte', zona: 'Monterrey / Norte', avatar: 'RG', hablando: false, camara: true, mic: false },
  { id: '4', nombre: 'Lic. Valeria Torres', cargo: 'Directora de Ciberseguridad & TI', zona: 'NOC / SOC Central', avatar: 'VT', hablando: false, camara: true, mic: true },
  { id: '5', nombre: 'Mtro. Fernando Silva', cargo: 'Gerente Comercial Bajío & Sureste', zona: 'Querétaro / Bajío', avatar: 'FS', hablando: false, camara: false, mic: false },
];

// Agentes de IA en la malla de orquestación
interface AgenteIA {
  id: string;
  nombre: string;
  rol: string;
  estado: 'linea' | 'procesando' | 'alerta';
  cargaCpu: number;
  tareas: number;
  ultimaAccion: string;
}

const agentesIAData: AgenteIA[] = [
  { id: 'a1', nombre: 'MAYIA Copilot Prime', rol: 'Orquestador General & Análisis Decisiones', estado: 'procesando', cargaCpu: 42, tareas: 18, ultimaAccion: 'Sincronizando estado con Sala Virtual de Directores' },
  { id: 'a2', nombre: 'Vision Guard IA (CCTV)', rol: 'Analítica de Video & Detección Térmica', estado: 'alerta', cargaCpu: 78, tareas: 742, ultimaAccion: 'Alerta de humo en Polanco 04 enviada a Directores' },
  { id: 'a3', nombre: 'Fleet Sentinel Telemetry', rol: 'Monitoreo de 400 Vehículos & Score Conductor', estado: 'linea', cargaCpu: 35, tareas: 352, ultimaAccion: 'Reorden de ruta U-142 por congestión en CDMX' },
  { id: 'a4', nombre: 'Predictor SLA & Risk AI', rol: 'Semáforo Preventivo de Incidentes', estado: 'linea', cargaCpu: 28, tareas: 42, ultimaAccion: 'Calculando margen SLA de 3 tickets en riesgo' },
  { id: 'a5', nombre: 'Supply Chain Dispatcher', rol: 'Orquestación de Proveedores Urgentes', estado: 'procesando', cargaCpu: 51, tareas: 12, ultimaAccion: 'Cotización automática de compresor HVAC aprobada' },
  { id: 'a6', nombre: 'CyberSOC Defense Agent', rol: 'Vigilancia Redes, Firewalls e ISO 27001', estado: 'linea', cargaCpu: 19, tareas: 1420, ultimaAccion: '0 amenazas activas en túneles VPN regionales' },
];

export const CentroMonitoreo: React.FC = () => {
  const { colores, temas } = brandingConfig;
  const tema = temas.cliente;

  // Estados de la sala virtual de monitoreo
  const [participantes, setParticipantes] = useState<Participante[]>(participantesIniciales);
  const [miMic, setMiMic] = useState(true);
  const [miCam, setMiCam] = useState(true);
  const [modoPantalla, setModoPantalla] = useState<'orquestacion' | 'mapa'>('orquestacion');
  const [agentes] = useState<AgenteIA[]>(agentesIAData);
  const [chatLog, setChatLog] = useState([
    { hora: '21:54', autor: 'MAYIA Bot', texto: 'Iniciada sesión de Monitoreo Ejecutivo con 5 Directores en línea.' },
    { hora: '21:56', autor: 'Ing. Carlos Mendoza', texto: 'Revisando evento de temperatura en Compresor Polanco 04. ¿El proveedor ya despachó?' },
    { hora: '21:57', autor: 'Supply Chain Agent', texto: 'Técnico de Vidrios Templados en camino a Torre Reforma. ETA: 35 min.' },
  ]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');

  const toggleMic = (id: string) => {
    setParticipantes(prev => prev.map(p => p.id === id ? { ...p, mic: !p.mic } : p));
  };

  const enviarMensajeChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoMensaje.trim()) return;
    const horaActual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatLog(prev => [...prev, { hora: horaActual, autor: 'Tú (Director)', texto: nuevoMensaje }]);
    setNuevoMensaje('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', color: colores.textoClaro }}>
      
      {/* HEADER PRINCIPAL EN FONDO BLANCO */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        padding: '24px 28px',
        border: `1px solid ${colores.borde}`,
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: `linear-gradient(180deg, ${tema.acento}, ${tema.acentoOscuro})`, borderRadius: '20px 0 0 20px' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '16px',
            background: `linear-gradient(135deg, ${tema.acento}, ${tema.acentoOscuro})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 8px 24px ${tema.acento}35`, flexShrink: 0
          }}>
            <Radio size={28} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 900, color: colores.textoClaro, letterSpacing: '-0.3px' }}>
                Centro de Monitoreo NOC/SOC & Orquestación Virtual
              </h1>
              <span style={{
                fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', padding: '4px 10px',
                borderRadius: '20px', background: '#F0FDF4', color: '#10B981',
                border: '1px solid #10B98133', letterSpacing: '0.05em'
              }}>
                En Vivo • 24/7
              </span>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: '14px', color: colores.textoMedio }}>
              Supervisión en tiempo real, puente virtual de mandos comerciales y malla de agentes IA autónomos BESCO.
            </p>
          </div>
        </div>

        {/* KPIs de Cabecera */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ background: '#FAFAFA', padding: '12px 18px', borderRadius: '14px', border: `1px solid ${colores.borde}`, textAlign: 'center', minWidth: '110px' }}>
            <span style={{ fontSize: '11px', color: colores.textoOscuro, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Agentes IA</span>
            <p style={{ margin: '4px 0 0', fontSize: '20px', fontWeight: 900, color: tema.acento }}>6 Activos</p>
          </div>
          <div style={{ background: '#FAFAFA', padding: '12px 18px', borderRadius: '14px', border: `1px solid ${colores.borde}`, textAlign: 'center', minWidth: '110px' }}>
            <span style={{ fontSize: '11px', color: colores.textoOscuro, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Directores</span>
            <p style={{ margin: '4px 0 0', fontSize: '20px', fontWeight: 900, color: '#10B981' }}>5 Conectados</p>
          </div>
          <div style={{ background: '#FAFAFA', padding: '12px 18px', borderRadius: '14px', border: `1px solid ${colores.borde}`, textAlign: 'center', minWidth: '110px' }}>
            <span style={{ fontSize: '11px', color: colores.textoOscuro, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Eventos/seg</span>
            <p style={{ margin: '4px 0 0', fontSize: '20px', fontWeight: 900, color: colores.textoClaro }}>1,840 / s</p>
          </div>
        </div>
      </div>

      {/* SALA VIRTUAL DE DIRECCIÓN COMERCIAL & MONITOREO EN FONDO BLANCO */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        border: `1px solid ${colores.borde}`,
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
      }}>
        {/* Subheader */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '17px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px', color: colores.textoClaro }}>
              <Users size={20} color={tema.acento} />
              Sala Virtual de Comando Comercial BESCO (Bridge en Tiempo Real)
            </h2>
            <p style={{ margin: '3px 0 0', fontSize: '13.5px', color: colores.textoMedio }}>
              Coordinación ejecutiva en tiempo real entre Directores de Zonas Comerciales y Agentes IA Autónomos.
            </p>
          </div>

          {/* Selector de Modo */}
          <div style={{ display: 'flex', gap: '6px', background: '#FAFAFA', padding: '4px', borderRadius: '12px', border: `1px solid ${colores.borde}` }}>
            <button
              onClick={() => setModoPantalla('orquestacion')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '8px 14px', borderRadius: '9px', border: 'none', cursor: 'pointer', fontSize: '12.5px', fontWeight: 700,
                backgroundColor: modoPantalla === 'orquestacion' ? tema.acento : 'transparent',
                color: modoPantalla === 'orquestacion' ? '#FFFFFF' : colores.textoMedio,
                transition: 'all 0.15s',
              }}
            >
              <Bot size={15} /> Malla de Agentes IA
            </button>
            <button
              onClick={() => setModoPantalla('mapa')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '8px 14px', borderRadius: '9px', border: 'none', cursor: 'pointer', fontSize: '12.5px', fontWeight: 700,
                backgroundColor: modoPantalla === 'mapa' ? tema.acento : 'transparent',
                color: modoPantalla === 'mapa' ? '#FFFFFF' : colores.textoMedio,
                transition: 'all 0.15s',
              }}
            >
              <MapPin size={15} /> Cobertura Nacional
            </button>
          </div>
        </div>

        {/* GRID PRINCIPAL DE LA SALA */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '20px', alignItems: 'stretch' }}>
          
          {/* PANEL IZQUIERDO: CONTENIDO DE MONITOREO (FONDO BLANCO / CLARO) */}
          <div style={{
            background: '#FAFAFA',
            borderRadius: '16px',
            border: `1px solid ${colores.borde}`,
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '440px'
          }}>
            {/* Control Bar Header */}
            <div style={{
              padding: '14px 20px', background: '#FFFFFF',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              borderBottom: `1px solid ${colores.borde}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                <span style={{ fontSize: '13px', fontWeight: 800, color: colores.textoClaro }}>
                  {modoPantalla === 'orquestacion' ? 'Malla de Orquestación de Agentes IA' : 'Telemetría de Flotilla y Rutas Nacionales'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={16} color="#10B981" />
                <span style={{ fontSize: '11.5px', color: colores.textoOscuro, fontWeight: 600 }}>Sincronización activa • Latencia 14ms</span>
              </div>
            </div>

            {/* CONTENIDO INTERIOR */}
            <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              
              {modoPantalla === 'mapa' && (
                <div style={{
                  height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  background: '#FFFFFF', borderRadius: '14px', padding: '28px', textAlign: 'center', gap: '14px',
                  border: `1px solid ${colores.borde}`, boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}>
                  <div style={{
                    width: '54px', height: '54px', borderRadius: '16px', background: `${tema.acento}14`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: tema.acento
                  }}>
                    <Server size={28} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: colores.textoClaro }}>Supervisión de Telemetría Nacional BESCO</h3>
                    <p style={{ margin: '6px 0 0', fontSize: '13.5px', color: colores.textoMedio, maxWidth: '440px', lineHeight: 1.5 }}>
                      400 unidades activas monitoreadas mediante GPS satelital. 12 regiones operativas sincronizadas en tiempo real con el centro de mando.
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '14px', marginTop: '6px' }}>
                    <div style={{ background: '#F0FDF4', border: '1px solid #10B98133', padding: '10px 18px', borderRadius: '10px', fontSize: '12.5px', fontWeight: 700, color: '#10B981' }}>
                      352 Unidades en Movimiento
                    </div>
                    <div style={{ background: '#FFFBEB', border: '1px solid #F59E0B33', padding: '10px 18px', borderRadius: '10px', fontSize: '12.5px', fontWeight: 700, color: '#D97706' }}>
                      48 Unidades en Parada Técnica
                    </div>
                  </div>
                </div>
              )}

              {modoPantalla === 'orquestacion' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: tema.acento, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Bot size={16} /> Agentes Autónomos Operando en Malla
                    </span>
                    <span style={{ fontSize: '11px', color: colores.textoOscuro, fontWeight: 600 }}>Actualizado cada segundo</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '12px' }}>
                    {agentes.map(ag => {
                      const isAlerta = ag.estado === 'alerta';
                      const isProc = ag.estado === 'procesando';
                      const statusColor = isAlerta ? '#EA580C' : isProc ? tema.acento : '#10B981';
                      const statusBg = isAlerta ? '#FFF7ED' : isProc ? `${tema.acento}12` : '#F0FDF4';

                      return (
                        <div key={ag.id} style={{
                          background: '#FFFFFF',
                          borderRadius: '14px',
                          padding: '14px 16px',
                          border: `1px solid ${isAlerta ? '#EA580C40' : colores.borde}`,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                              <span style={{ fontSize: '13px', fontWeight: 800, color: colores.textoClaro, display: 'block' }}>{ag.nombre}</span>
                              <span style={{ fontSize: '11px', color: colores.textoOscuro }}>{ag.rol}</span>
                            </div>
                            <span style={{
                              fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '6px', textTransform: 'uppercase',
                              background: statusBg, color: statusColor, flexShrink: 0,
                            }}>
                              {ag.estado}
                            </span>
                          </div>

                          {/* CPU Usage Bar */}
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', color: colores.textoOscuro, marginBottom: '4px', fontWeight: 600 }}>
                              <span>Carga CPU</span>
                              <span>{ag.cargaCpu}%</span>
                            </div>
                            <div style={{ width: '100%', background: colores.fondoTerciario, height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                              <div style={{ width: `${ag.cargaCpu}%`, height: '100%', background: statusColor, borderRadius: '3px', transition: 'width 0.3s' }} />
                            </div>
                          </div>

                          <p style={{ margin: 0, fontSize: '11px', color: colores.textoMedio, lineHeight: 1.4, background: '#FAFAFA', padding: '6px 8px', borderRadius: '6px', border: `1px solid ${colores.borde}` }}>
                            {ag.ultimaAccion}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* CONTROLES DE LA SALA EN FONDO BLANCO */}
            <div style={{
              padding: '14px 20px', background: '#FFFFFF', borderTop: `1px solid ${colores.borde}`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={() => setMiMic(!miMic)}
                  style={{
                    padding: '8px 16px', borderRadius: '10px', border: `1px solid ${miMic ? colores.borde : '#EA580C33'}`, cursor: 'pointer',
                    background: miMic ? '#FAFAFA' : '#FFF7ED', color: miMic ? colores.textoClaro : '#EA580C',
                    display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', fontWeight: 700
                  }}
                >
                  {miMic ? <Mic size={16} color={tema.acento} /> : <MicOff size={16} color="#EA580C" />}
                  <span>{miMic ? 'Micrófono Activo' : 'Micrófono Silenciado'}</span>
                </button>
                <button
                  onClick={() => setMiCam(!miCam)}
                  style={{
                    padding: '8px 16px', borderRadius: '10px', border: `1px solid ${miCam ? colores.borde : '#EA580C33'}`, cursor: 'pointer',
                    background: miCam ? '#FAFAFA' : '#FFF7ED', color: miCam ? colores.textoClaro : '#EA580C',
                    display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', fontWeight: 700
                  }}
                >
                  {miCam ? <Video size={16} color={tema.acento} /> : <VideoOff size={16} color="#EA580C" />}
                  <span>{miCam ? 'Cámara Activa' : 'Cámara Apagada'}</span>
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '12px', color: colores.textoOscuro, fontWeight: 600 }}>Sesión Encriptada • ISO 27001</span>
                <button
                  style={{
                    padding: '9px 18px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                    background: '#EA580C', color: '#FFFFFF', fontSize: '12.5px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px',
                    boxShadow: '0 4px 12px rgba(234, 88, 12, 0.25)'
                  }}
                  onClick={() => alert('Sesión de Sala Virtual finalizada.')}
                >
                  <PhoneOff size={15} /> Salir de la Sala
                </button>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: DIRECTORES CONECTADOS & CHAT IA (FONDO BLANCO) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Lista de Directores */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '18px', border: `1px solid ${colores.borde}`, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Users size={16} color={tema.acento} /> Directores Conectados ({participantes.length})
                </h3>
                <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#10B981', background: '#F0FDF4', padding: '3px 8px', borderRadius: '12px', border: '1px solid #10B98133' }}>
                  En Vivo
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '220px', overflowY: 'auto' }}>
                {participantes.map(p => (
                  <div key={p.id} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px',
                    borderRadius: '12px', background: p.hablando ? `${tema.acento}0A` : '#FAFAFA',
                    border: `1px solid ${p.hablando ? `${tema.acento}40` : colores.borde}`
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '34px', height: '34px', borderRadius: '10px',
                        background: p.hablando ? `linear-gradient(135deg, ${tema.acento}, ${tema.acentoOscuro})` : colores.fondoTerciario,
                        color: p.hablando ? '#FFFFFF' : colores.textoClaro, fontWeight: 800, fontSize: '11px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                      }}>
                        {p.avatar}
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: '12.5px', fontWeight: 700, color: colores.textoClaro }}>{p.nombre}</p>
                        <p style={{ margin: '1px 0 0', fontSize: '10.5px', color: colores.textoMedio }}>{p.cargo}</p>
                      </div>
                    </div>

                    <button onClick={() => toggleMic(p.id)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '4px' }}>
                      {p.mic ? <Mic size={15} color="#10B981" /> : <MicOff size={15} color="#EA580C" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat en Vivo de la Sala */}
            <div style={{ flex: 1, background: '#FFFFFF', borderRadius: '16px', padding: '18px', border: `1px solid ${colores.borde}`, display: 'flex', flexDirection: 'column', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <h3 style={{ margin: '0 0 12px', fontSize: '13.5px', fontWeight: 800, color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageSquare size={16} color={tema.acento} /> Chat & Transcripción IA
              </h3>

              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px', maxHeight: '180px' }}>
                {chatLog.map((c, i) => (
                  <div key={i} style={{ background: '#FAFAFA', padding: '10px 12px', borderRadius: '10px', fontSize: '12px', border: `1px solid ${colores.borde}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                      <span style={{ fontWeight: 800, color: tema.acento }}>{c.autor}</span>
                      <span style={{ fontSize: '10px', color: colores.textoOscuro, fontWeight: 600 }}>{c.hora}</span>
                    </div>
                    <p style={{ margin: 0, color: colores.textoClaro, lineHeight: 1.4 }}>{c.texto}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={enviarMensajeChat} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Escribir mensaje a los directores..."
                  value={nuevoMensaje}
                  onChange={e => setNuevoMensaje(e.target.value)}
                  style={{
                    flex: 1, padding: '9px 12px', borderRadius: '10px', border: `1px solid ${colores.borde}`,
                    background: '#FAFAFA', color: colores.textoClaro, fontSize: '12px', outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '9px 16px', borderRadius: '10px', border: 'none', background: `linear-gradient(135deg, ${tema.acento}, ${tema.acentoOscuro})`,
                    color: '#FFFFFF', fontWeight: 800, fontSize: '12px', cursor: 'pointer', boxShadow: `0 4px 12px ${tema.acento}30`
                  }}
                >
                  Enviar
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
