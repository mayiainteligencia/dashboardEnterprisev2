import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Check, Target, UserCircle, ListChecks, BarChart3, Send } from 'lucide-react';
import { brandingConfig } from '../../config/branding';
import { useExplorer, PERFILES, PRIORIDADES, type RespuestasDiagnostico, type LeadData } from './ExplorerContext';
import { CtaButton, ConfirmacionModal, KpiCircle, KpiBadge } from './ExplorerShared';

interface Props {
  onSectionChange?: (s: string) => void;
}

type Paso = 'perfil' | 'prioridad' | 'preguntas' | 'resultado' | 'lead';

const PREGUNTAS: { key: keyof RespuestasDiagnostico; label: string; opciones: { v: string; label: string }[] }[] = [
  {
    key: 'industria',
    label: '¿En qué industria opera su empresa?',
    opciones: [
      { v: 'finanzas', label: 'Finanzas / Banca' },
      { v: 'retail', label: 'Retail / Consumo' },
      { v: 'manufactura', label: 'Manufactura' },
      { v: 'salud', label: 'Salud' },
      { v: 'gobierno', label: 'Gobierno' },
      { v: 'otro', label: 'Otro' },
    ],
  },
  {
    key: 'sedes',
    label: '¿Cuántas sedes / ubicaciones opera?',
    opciones: [
      { v: '1', label: 'Una sede' },
      { v: '2-5', label: '2 a 5 sedes' },
      { v: '6-20', label: '6 a 20 sedes' },
      { v: '20+', label: 'Más de 20' },
    ],
  },
  {
    key: 'residenciaDatos',
    label: '¿Dónde residen sus datos hoy?',
    opciones: [
      { v: 'on-prem', label: 'On-premise' },
      { v: 'nube-publica', label: 'Nube pública' },
      { v: 'mixto', label: 'Mixto' },
      { v: 'no-se', label: 'No estoy seguro' },
    ],
  },
  {
    key: 'sistemasCriticos',
    label: '¿Cuenta con sistemas críticos en alta disponibilidad?',
    opciones: [
      { v: 'si', label: 'Sí, totalmente' },
      { v: 'parcial', label: 'Parcialmente' },
      { v: 'no', label: 'No' },
    ],
  },
  {
    key: 'respaldosDRP',
    label: '¿Tiene respaldos y plan de recuperación (DRP)?',
    opciones: [
      { v: 'si', label: 'Sí, probado' },
      { v: 'parcial', label: 'Parcialmente' },
      { v: 'no', label: 'No' },
    ],
  },
  {
    key: 'operacion247',
    label: '¿Requiere operación 24/7?',
    opciones: [
      { v: 'si', label: 'Sí' },
      { v: 'no', label: 'No' },
    ],
  },
  {
    key: 'tipoNube',
    label: '¿Qué tipo de nube utiliza?',
    opciones: [
      { v: 'publica', label: 'Pública' },
      { v: 'privada', label: 'Privada' },
      { v: 'hibrida', label: 'Híbrida' },
      { v: 'on-prem', label: 'On-premise' },
      { v: 'no-se', label: 'No estoy seguro' },
    ],
  },
  {
    key: 'mideRiesgosCiber',
    label: '¿Mide y monitorea sus riesgos de ciberseguridad?',
    opciones: [
      { v: 'si', label: 'Sí, con SOC' },
      { v: 'parcial', label: 'Parcialmente' },
      { v: 'no', label: 'No' },
    ],
  },
  {
    key: 'proyectosIA',
    label: '¿Tiene proyectos de IA o analítica avanzada?',
    opciones: [
      { v: 'si', label: 'Sí, en producción' },
      { v: 'evaluando', label: 'Evaluando' },
      { v: 'no', label: 'No' },
    ],
  },
  {
    key: 'datosOrganizados',
    label: '¿Sus datos están organizados para decisiones?',
    opciones: [
      { v: 'si', label: 'Sí' },
      { v: 'parcial', label: 'Parcialmente' },
      { v: 'no', label: 'No' },
    ],
  },
];

export const ExplorerWizard: React.FC<Props> = ({ onSectionChange }) => {
  const { colores } = brandingConfig;
  const {
    perfil,
    prioridad,
    respuestas,
    setPerfil,
    setPrioridad,
    setRespuesta,
    marcarCompletado,
    guardarLead,
    lead,
    kpis,
    serviciosRecomendados,
  } = useExplorer();

  const [paso, setPaso] = useState<Paso>('perfil');
  const [preguntaIdx, setPreguntaIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [formLead, setFormLead] = useState<LeadData>({
    nombre: '',
    empresa: '',
    cargo: '',
    correo: '',
    telefono: '',
    industria: respuestas.industria || '',
    tamanoEmpresa: respuestas.tamanoEmpresa || '',
    prioridad: prioridad ? PRIORIDADES.find((p) => p.id === prioridad)?.label || '' : '',
    comentarios: '',
  });

  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth < 1024);
    c();
    window.addEventListener('resize', c);
    return () => window.removeEventListener('resize', c);
  }, []);

  useEffect(() => {
    setFormLead((prev) => ({
      ...prev,
      industria: respuestas.industria || prev.industria,
      prioridad: prioridad ? PRIORIDADES.find((p) => p.id === prioridad)?.label || '' : prev.prioridad,
    }));
  }, [respuestas.industria, prioridad]);

  const pasos: { id: Paso; label: string; icon: React.ReactNode }[] = [
    { id: 'perfil', label: 'Perfil', icon: <UserCircle size={14} /> },
    { id: 'prioridad', label: 'Prioridad', icon: <Target size={14} /> },
    { id: 'preguntas', label: 'Diagnóstico', icon: <ListChecks size={14} /> },
    { id: 'resultado', label: 'Resultado', icon: <BarChart3 size={14} /> },
    { id: 'lead', label: 'Contacto', icon: <Send size={14} /> },
  ];
  const pasoIdx = pasos.findIndex((p) => p.id === paso);

  const irAnterior = () => {
    if (paso === 'prioridad') setPaso('perfil');
    else if (paso === 'preguntas') {
      if (preguntaIdx === 0) setPaso('prioridad');
      else setPreguntaIdx((i) => i - 1);
    } else if (paso === 'resultado') setPaso('preguntas');
    else if (paso === 'lead') setPaso('resultado');
  };

  const avanzarPregunta = () => {
    if (preguntaIdx < PREGUNTAS.length - 1) setPreguntaIdx((i) => i + 1);
    else {
      marcarCompletado();
      setPaso('resultado');
    }
  };

  const enviarLead = (e: React.FormEvent) => {
    e.preventDefault();
    guardarLead(formLead);
    setModalOpen(true);
  };

  const perfilInfo = PERFILES.find((p) => p.id === perfil);
  const prioridadInfo = PRIORIDADES.find((p) => p.id === prioridad);
  const riesgoColor =
    kpis.riesgo === 'Bajo' ? colores.exito : kpis.riesgo === 'Medio' ? colores.advertencia : colores.peligro;

  return (
    <div style={{ minHeight: '100vh', background: colores.fondoPrincipal, padding: isMobile ? '16px' : '32px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <button
          onClick={() => onSectionChange?.('valueExplorer')}
          style={{ background: 'transparent', border: `1px solid ${colores.borde}`, borderRadius: '10px', padding: '8px 14px', cursor: 'pointer', fontSize: '12px', color: colores.textoMedio, display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}
        >
          <ArrowLeft size={14} /> Volver al Value Explorer
        </button>

        {/* Stepper */}
        <div
          style={{
            backgroundColor: colores.fondoSecundario,
            borderRadius: '20px',
            border: `1px solid ${colores.borde}`,
            padding: '18px',
            marginBottom: '20px',
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            overflowX: 'auto',
          }}
        >
          {pasos.map((s, i) => {
            const activo = i === pasoIdx;
            const completado = i < pasoIdx;
            return (
              <React.Fragment key={s.id}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 14px',
                    borderRadius: '999px',
                    backgroundColor: activo ? colores.primario : completado ? `${colores.exito}18` : colores.fondoTerciario,
                    color: activo ? '#fff' : completado ? colores.exito : colores.textoMedio,
                    fontSize: '12px',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {completado ? <Check size={14} /> : s.icon}
                  {s.label}
                </div>
                {i < pasos.length - 1 && (
                  <div style={{ width: '14px', height: '1px', backgroundColor: colores.borde, flexShrink: 0 }} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Contenido por paso */}
        <div
          style={{
            backgroundColor: colores.fondoSecundario,
            borderRadius: '20px',
            border: `1px solid ${colores.borde}`,
            padding: isMobile ? '20px' : '32px',
            minHeight: '420px',
          }}
        >
          {paso === 'perfil' && (
            <>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: colores.textoClaro, margin: '0 0 6px 0', letterSpacing: '-0.3px' }}>
                ¿Qué rol mejor describe su posición?
              </h2>
              <p style={{ fontSize: '13px', color: colores.textoMedio, margin: '0 0 22px 0' }}>
                Adaptamos el lenguaje y la recomendación a su perfil ejecutivo.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '10px' }}>
                {PERFILES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setPerfil(p.id);
                      setPaso('prioridad');
                    }}
                    style={{
                      textAlign: 'left',
                      padding: '14px 16px',
                      borderRadius: '14px',
                      border: `1px solid ${perfil === p.id ? colores.primario : colores.borde}`,
                      background: perfil === p.id ? `${colores.primario}10` : colores.fondoPrincipal,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <p style={{ fontSize: '14px', fontWeight: 700, color: colores.textoClaro, margin: 0 }}>{p.label}</p>
                    <p style={{ fontSize: '11px', color: colores.textoMedio, margin: '4px 0 0 0' }}>{p.mensaje}</p>
                  </button>
                ))}
              </div>
            </>
          )}

          {paso === 'prioridad' && (
            <>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: colores.textoClaro, margin: '0 0 6px 0', letterSpacing: '-0.3px' }}>
                ¿Cuál es su prioridad estratégica?
              </h2>
              <p style={{ fontSize: '13px', color: colores.textoMedio, margin: '0 0 22px 0' }}>
                Elija el objetivo que más impacto tendría para su empresa hoy.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '10px' }}>
                {PRIORIDADES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setPrioridad(p.id);
                      setPaso('preguntas');
                      setPreguntaIdx(0);
                    }}
                    style={{
                      padding: '14px',
                      borderRadius: '14px',
                      border: `1px solid ${prioridad === p.id ? colores.primario : colores.borde}`,
                      background: prioridad === p.id ? `${colores.primario}10` : colores.fondoPrincipal,
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: colores.textoClaro,
                      textAlign: 'center',
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </>
          )}

          {paso === 'preguntas' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '12px', color: colores.textoMedio, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                  Pregunta {preguntaIdx + 1} de {PREGUNTAS.length}
                </span>
                <span style={{ fontSize: '12px', color: colores.primario, fontWeight: 700 }}>
                  {Math.round(((preguntaIdx + 1) / PREGUNTAS.length) * 100)}%
                </span>
              </div>
              <div style={{ height: '6px', borderRadius: '3px', backgroundColor: colores.fondoTerciario, marginBottom: '20px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${((preguntaIdx + 1) / PREGUNTAS.length) * 100}%`,
                    background: colores.gradientePrimario,
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>

              <h2 style={{ fontSize: '20px', fontWeight: 800, color: colores.textoClaro, margin: '0 0 18px 0', letterSpacing: '-0.3px' }}>
                {PREGUNTAS[preguntaIdx].label}
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '10px', marginBottom: '24px' }}>
                {PREGUNTAS[preguntaIdx].opciones.map((o) => {
                  const seleccionado = respuestas[PREGUNTAS[preguntaIdx].key] === o.v;
                  return (
                    <button
                      key={o.v}
                      onClick={() => {
                        setRespuesta(PREGUNTAS[preguntaIdx].key, o.v as RespuestasDiagnostico[typeof PREGUNTAS[number]['key']]);
                      }}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: `1px solid ${seleccionado ? colores.primario : colores.borde}`,
                        background: seleccionado ? `${colores.primario}10` : colores.fondoPrincipal,
                        color: colores.textoClaro,
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      {o.label}
                      {seleccionado && <Check size={16} color={colores.primario} />}
                    </button>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                <button
                  onClick={irAnterior}
                  style={{
                    padding: '11px 18px',
                    borderRadius: '12px',
                    border: `1px solid ${colores.borde}`,
                    background: 'transparent',
                    color: colores.textoMedio,
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <ArrowLeft size={14} /> Anterior
                </button>
                <CtaButton
                  label={preguntaIdx === PREGUNTAS.length - 1 ? 'Ver resultado' : 'Siguiente'}
                  onClick={avanzarPregunta}
                  icon={<ArrowRight size={14} />}
                />
              </div>
            </>
          )}

          {paso === 'resultado' && (
            <>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: colores.textoClaro, margin: '0 0 6px 0', letterSpacing: '-0.3px' }}>
                Su Ruta DC Inteligente Recomendada
              </h2>
              <p style={{ fontSize: '13px', color: colores.textoMedio, margin: '0 0 20px 0' }}>
                {perfilInfo ? `Como ${perfilInfo.label}, lo importante es: ${perfilInfo.mensaje}` : 'Resultado preliminar basado en sus respuestas.'}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
                <KpiCircle valor={kpis.madurez} label="Madurez digital" color={colores.primario} size={100} />
                <KpiBadge valor={kpis.riesgo} label="Riesgo operativo" color={riesgoColor} />
                <KpiCircle valor={kpis.continuidad} label="Continuidad" color={colores.exito} size={100} />
                <KpiCircle valor={kpis.valorDato} label="Valor del dato" color="#8B5CF6" size={100} />
                <KpiBadge valor={`+${kpis.roi}%`} label="ROI preliminar" color={colores.acento} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
                <div style={{ backgroundColor: colores.fondoPrincipal, border: `1px solid ${colores.borde}`, borderRadius: '14px', padding: '16px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: colores.textoClaro, margin: '0 0 10px 0' }}>
                    Servicios recomendados
                  </h4>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {serviciosRecomendados.map((s) => (
                      <li
                        key={s}
                        style={{
                          padding: '8px 10px',
                          backgroundColor: colores.fondoTerciario,
                          borderRadius: '8px',
                          fontSize: '12px',
                          color: colores.textoClaro,
                          borderLeft: `3px solid ${colores.primario}`,
                        }}
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ backgroundColor: colores.fondoPrincipal, border: `1px solid ${colores.borde}`, borderRadius: '14px', padding: '16px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: colores.textoClaro, margin: '0 0 10px 0' }}>
                    Beneficios ejecutivos
                  </h4>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {[
                      'Visibilidad ejecutiva de su infraestructura',
                      'Reducción de riesgos críticos',
                      'Continuidad operativa garantizada',
                      'Decisiones con datos confiables',
                      `Foco en: ${prioridadInfo?.label || 'su prioridad estratégica'}`,
                    ].map((b) => (
                      <li
                        key={b}
                        style={{
                          padding: '8px 10px',
                          backgroundColor: colores.fondoTerciario,
                          borderRadius: '8px',
                          fontSize: '12px',
                          color: colores.textoClaro,
                          borderLeft: `3px solid ${colores.exito}`,
                        }}
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'space-between' }}>
                <button
                  onClick={irAnterior}
                  style={{
                    padding: '11px 18px',
                    borderRadius: '12px',
                    border: `1px solid ${colores.borde}`,
                    background: 'transparent',
                    color: colores.textoMedio,
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <ArrowLeft size={14} /> Editar respuestas
                </button>
                <CtaButton label="Solicitar diagnóstico ejecutivo DC Inteligente" onClick={() => setPaso('lead')} icon={<Send size={14} />} />
              </div>
            </>
          )}

          {paso === 'lead' && (
            <>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: colores.textoClaro, margin: '0 0 6px 0', letterSpacing: '-0.3px' }}>
                Reciba su diagnóstico ejecutivo
              </h2>
              <p style={{ fontSize: '13px', color: colores.textoMedio, margin: '0 0 22px 0' }}>
                Un especialista de DC Inteligente preparará su business case personalizado.
              </p>
              <form onSubmit={enviarLead}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '12px' }}>
                  {[
                    { k: 'nombre', label: 'Nombre completo', type: 'text', req: true },
                    { k: 'empresa', label: 'Empresa', type: 'text', req: true },
                    { k: 'cargo', label: 'Cargo', type: 'text', req: true },
                    { k: 'correo', label: 'Correo corporativo', type: 'email', req: true },
                    { k: 'telefono', label: 'Teléfono', type: 'tel', req: false },
                    { k: 'industria', label: 'Industria', type: 'text', req: false },
                    { k: 'tamanoEmpresa', label: 'Tamaño de empresa', type: 'text', req: false },
                    { k: 'prioridad', label: 'Prioridad estratégica', type: 'text', req: false },
                  ].map((f) => (
                    <label key={f.k} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: colores.textoMedio, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                        {f.label}{f.req && <span style={{ color: colores.peligro }}> *</span>}
                      </span>
                      <input
                        type={f.type}
                        required={f.req}
                        value={(formLead as any)[f.k]}
                        onChange={(e) => setFormLead((prev) => ({ ...prev, [f.k]: e.target.value }))}
                        style={{
                          padding: '11px 14px',
                          borderRadius: '12px',
                          border: `1px solid ${colores.borde}`,
                          background: colores.fondoPrincipal,
                          color: colores.textoClaro,
                          fontSize: '13px',
                          outline: 'none',
                        }}
                      />
                    </label>
                  ))}
                  <label style={{ gridColumn: isMobile ? '1' : '1 / -1', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: colores.textoMedio, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                      Comentarios
                    </span>
                    <textarea
                      rows={3}
                      value={formLead.comentarios}
                      onChange={(e) => setFormLead((prev) => ({ ...prev, comentarios: e.target.value }))}
                      style={{
                        padding: '11px 14px',
                        borderRadius: '12px',
                        border: `1px solid ${colores.borde}`,
                        background: colores.fondoPrincipal,
                        color: colores.textoClaro,
                        fontSize: '13px',
                        outline: 'none',
                        resize: 'vertical',
                        fontFamily: 'inherit',
                      }}
                    />
                  </label>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'space-between', marginTop: '20px' }}>
                  <button
                    type="button"
                    onClick={irAnterior}
                    style={{
                      padding: '11px 18px',
                      borderRadius: '12px',
                      border: `1px solid ${colores.borde}`,
                      background: 'transparent',
                      color: colores.textoMedio,
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <ArrowLeft size={14} /> Volver al resultado
                  </button>
                  <CtaButton label="Enviar solicitud" icon={<Send size={14} />} />
                </div>
              </form>
            </>
          )}
        </div>

        <ConfirmacionModal
          open={modalOpen}
          titulo="Solicitud recibida"
          mensaje="Hemos registrado su información. Un especialista de DC Inteligente preparará su diagnóstico ejecutivo y se pondrá en contacto en las próximas 24 horas."
          onClose={() => {
            setModalOpen(false);
            onSectionChange?.('valueExplorer');
          }}
          resumen={
            lead && (
              <div
                style={{
                  marginTop: '12px',
                  padding: '14px',
                  background: colores.fondoTerciario,
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: colores.textoClaro,
                  lineHeight: 1.7,
                }}
              >
                <strong>{lead.nombre}</strong> · {lead.cargo} en {lead.empresa}
                <br />
                {lead.correo} {lead.telefono && `· ${lead.telefono}`}
                <br />
                Prioridad: {lead.prioridad || 'No especificada'}
              </div>
            )
          }
        />
      </div>
    </div>
  );
};
