import React, { createContext, useContext, useMemo, useState } from 'react';

export type PerfilRol =
  | 'CEO'
  | 'CTO'
  | 'CFO'
  | 'CISO'
  | 'Operaciones'
  | 'Innovacion'
  | 'Gobierno';

export type Prioridad =
  | 'proteger'
  | 'nube'
  | 'continuidad'
  | 'ciberseguridad'
  | 'monitoreo'
  | 'ia'
  | 'costos'
  | 'roi'
  | 'crecimiento';

export interface RespuestasDiagnostico {
  industria?: string;
  sedes?: string;
  residenciaDatos?: string;
  sistemasCriticos?: 'si' | 'no' | 'parcial';
  respaldosDRP?: 'si' | 'no' | 'parcial';
  operacion247?: 'si' | 'no';
  tipoNube?: 'publica' | 'privada' | 'hibrida' | 'on-prem' | 'no-se';
  mideRiesgosCiber?: 'si' | 'no' | 'parcial';
  proyectosIA?: 'si' | 'no' | 'evaluando';
  datosOrganizados?: 'si' | 'no' | 'parcial';
  tamanoEmpresa?: string;
}

export interface LeadData {
  nombre: string;
  empresa: string;
  cargo: string;
  correo: string;
  telefono: string;
  industria: string;
  tamanoEmpresa: string;
  prioridad: string;
  comentarios: string;
}

export interface KPIs {
  madurez: number;
  riesgo: 'Bajo' | 'Medio' | 'Alto';
  continuidad: number;
  valorDato: number;
  roi: number;
  serviciosRecomendados: number;
}

interface ExplorerState {
  perfil: PerfilRol | null;
  prioridad: Prioridad | null;
  respuestas: RespuestasDiagnostico;
  lead: LeadData | null;
  diagnosticoCompletado: boolean;
  setPerfil: (p: PerfilRol) => void;
  setPrioridad: (p: Prioridad) => void;
  setRespuesta: <K extends keyof RespuestasDiagnostico>(k: K, v: RespuestasDiagnostico[K]) => void;
  marcarCompletado: () => void;
  guardarLead: (l: LeadData) => void;
  reset: () => void;
  kpis: KPIs;
  serviciosRecomendados: string[];
}

const ExplorerContext = createContext<ExplorerState | null>(null);

const scoreRespuesta = (v: string | undefined, mapping: Record<string, number>): number => {
  if (!v) return 50;
  return mapping[v] ?? 50;
};

const calcularKPIs = (r: RespuestasDiagnostico, prioridad: Prioridad | null): KPIs => {
  const datosOrg = scoreRespuesta(r.datosOrganizados, { si: 90, parcial: 60, no: 30 });
  const sistemas = scoreRespuesta(r.sistemasCriticos, { si: 85, parcial: 55, no: 25 });
  const respaldos = scoreRespuesta(r.respaldosDRP, { si: 90, parcial: 55, no: 20 });
  const op247 = scoreRespuesta(r.operacion247, { si: 85, no: 40 });
  const cyber = scoreRespuesta(r.mideRiesgosCiber, { si: 85, parcial: 55, no: 25 });
  const ia = scoreRespuesta(r.proyectosIA, { si: 90, evaluando: 60, no: 30 });
  const nubeScore = scoreRespuesta(r.tipoNube, {
    publica: 70,
    privada: 75,
    hibrida: 85,
    'on-prem': 55,
    'no-se': 35,
  });

  const madurez = Math.round((datosOrg + nubeScore + cyber + ia) / 4);
  const continuidad = Math.round((respaldos + op247 + sistemas) / 3);
  const valorDato = Math.round((datosOrg + ia) / 2);
  const riesgoScore = Math.round((100 - cyber + 100 - respaldos) / 2);
  const riesgo: 'Bajo' | 'Medio' | 'Alto' =
    riesgoScore < 35 ? 'Bajo' : riesgoScore < 65 ? 'Medio' : 'Alto';
  const roi = Math.round(((madurez + valorDato + continuidad) / 3 - 50) / 2.8 + 10);

  let recomendados = 3;
  if (cyber < 60) recomendados++;
  if (respaldos < 60) recomendados++;
  if (ia < 60) recomendados++;
  if (nubeScore < 60) recomendados++;
  if (prioridad === 'ia' || prioridad === 'roi') recomendados++;
  recomendados = Math.min(recomendados, 8);

  return {
    madurez,
    riesgo,
    continuidad,
    valorDato,
    roi: Math.max(roi, 6),
    serviciosRecomendados: recomendados,
  };
};

const calcularServicios = (r: RespuestasDiagnostico): string[] => {
  const out: string[] = [];
  if (scoreRespuesta(r.respaldosDRP, { si: 90, parcial: 55, no: 20 }) < 70) out.push('DRP y Backup gestionado');
  if (scoreRespuesta(r.mideRiesgosCiber, { si: 85, parcial: 55, no: 25 }) < 70) out.push('SOC IA y Ciberseguridad');
  if (scoreRespuesta(r.tipoNube, { publica: 70, privada: 75, hibrida: 85, 'on-prem': 55, 'no-se': 35 }) < 75)
    out.push('Nube FLAI / Arquitectura híbrida');
  if (scoreRespuesta(r.operacion247, { si: 85, no: 40 }) < 70) out.push('NOC 24/7 y SLA');
  if (scoreRespuesta(r.datosOrganizados, { si: 90, parcial: 60, no: 30 }) < 70) out.push('Gobierno de datos');
  if (scoreRespuesta(r.proyectosIA, { si: 90, evaluando: 60, no: 30 }) < 80) out.push('AI Factory y agentes de IA');
  if (out.length < 3) out.push('Business Case ejecutivo');
  return out;
};

export const ExplorerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [perfil, setPerfilState] = useState<PerfilRol | null>(null);
  const [prioridad, setPrioridadState] = useState<Prioridad | null>(null);
  const [respuestas, setRespuestas] = useState<RespuestasDiagnostico>({});
  const [lead, setLead] = useState<LeadData | null>(null);
  const [diagnosticoCompletado, setDiagnosticoCompletado] = useState(false);

  const kpis = useMemo(() => calcularKPIs(respuestas, prioridad), [respuestas, prioridad]);
  const serviciosRecomendados = useMemo(() => calcularServicios(respuestas), [respuestas]);

  const value: ExplorerState = {
    perfil,
    prioridad,
    respuestas,
    lead,
    diagnosticoCompletado,
    setPerfil: (p) => setPerfilState(p),
    setPrioridad: (p) => setPrioridadState(p),
    setRespuesta: (k, v) => setRespuestas((prev) => ({ ...prev, [k]: v })),
    marcarCompletado: () => setDiagnosticoCompletado(true),
    guardarLead: (l) => setLead(l),
    reset: () => {
      setPerfilState(null);
      setPrioridadState(null);
      setRespuestas({});
      setLead(null);
      setDiagnosticoCompletado(false);
    },
    kpis,
    serviciosRecomendados,
  };

  return <ExplorerContext.Provider value={value}>{children}</ExplorerContext.Provider>;
};

export const useExplorer = (): ExplorerState => {
  const ctx = useContext(ExplorerContext);
  if (!ctx) throw new Error('useExplorer debe usarse dentro de ExplorerProvider');
  return ctx;
};

export const PERFILES: { id: PerfilRol; label: string; mensaje: string }[] = [
  { id: 'CEO', label: 'Dirección General', mensaje: 'crecimiento, resiliencia, control, velocidad de decisión, ventaja estratégica.' },
  { id: 'CTO', label: 'CTO / CIO', mensaje: 'arquitectura, control, disponibilidad, interoperabilidad, seguridad, escalamiento.' },
  { id: 'CFO', label: 'CFO', mensaje: 'ROI, eficiencia operativa, mitigación de pérdidas, priorización de inversión, business case.' },
  { id: 'CISO', label: 'CISO', mensaje: 'visibilidad, priorización, protección, evidencia, gobierno de riesgo.' },
  { id: 'Operaciones', label: 'Operaciones', mensaje: 'disponibilidad, soporte, prevención, continuidad, capacidad de respuesta.' },
  { id: 'Innovacion', label: 'Innovación / Transformación', mensaje: 'IA aplicada, monetización de datos, automatización y nuevos modelos de negocio.' },
  { id: 'Gobierno', label: 'Gobierno / Institución pública', mensaje: 'soberanía del dato, cumplimiento, continuidad de servicios ciudadanos.' },
];

export const PRIORIDADES: { id: Prioridad; label: string }[] = [
  { id: 'proteger', label: 'Proteger datos' },
  { id: 'nube', label: 'Migrar a nube' },
  { id: 'continuidad', label: 'Mejorar continuidad' },
  { id: 'ciberseguridad', label: 'Fortalecer ciberseguridad' },
  { id: 'monitoreo', label: 'Monitorear infraestructura' },
  { id: 'ia', label: 'Activar IA' },
  { id: 'costos', label: 'Reducir costos' },
  { id: 'roi', label: 'Generar ROI con datos' },
  { id: 'crecimiento', label: 'Preparar para crecimiento' },
];
