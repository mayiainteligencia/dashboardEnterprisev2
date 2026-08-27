// ─────────────────────────────────────────────────────────────────────────────
// Guardian Digital MX — Bus de agentes.
// Store singleton + generador de detecciones mock. Sin red, sin dependencias.
// Alimenta: toasts, campana del header y las tiras de actividad por sección.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useState } from 'react';

export type Severidad = 'critica' | 'alta' | 'media' | 'baja';

export interface AccionAgente {
  id: string;
  label: string;
  confirmacion: string;
}

export interface EventoAgente {
  id: string;
  seccion: string;
  agente: string;
  titulo: string;
  detalle: string;
  severidad: Severidad;
  hora: string;
  acciones: AccionAgente[];
  resuelto: string | null;   // confirmación de la acción tomada
  leido: boolean;
}

// ── Acciones reutilizables ───────────────────────────────────────────────────
const A = {
  bloquear:  { id: 'bloquear',  label: 'Bloquear',        confirmacion: 'Contenido bloqueado y cliente notificado' },
  takedown:  { id: 'takedown',  label: 'Ejecutar takedown', confirmacion: 'Takedown enviado a la plataforma' },
  escalar:   { id: 'escalar',   label: 'Escalar a Tier 3', confirmacion: 'Escalado a Tier 3 · SLA 30 min' },
  revisar:   { id: 'revisar',   label: 'Enviar a revisión', confirmacion: 'Enviado a la cola forense' },
  aprobar:   { id: 'aprobar',   label: 'Aprobar',         confirmacion: 'Aprobado y registrado en blockchain' },
  descartar: { id: 'descartar', label: 'Descartar',       confirmacion: 'Marcado como falso positivo' },
  congelar:  { id: 'congelar',  label: 'Congelar licencia', confirmacion: 'Licencia congelada hasta revisión' },
  notificar: { id: 'notificar', label: 'Notificar cliente', confirmacion: 'Cliente notificado por canal seguro' },
} satisfies Record<string, AccionAgente>;

// ── Plantillas de detección por sección ──────────────────────────────────────
interface Plantilla {
  agente: string;
  titulo: string;
  detalle: string;
  severidad: Severidad;
  acciones: AccionAgente[];
}

const PLANTILLAS: Record<string, Plantilla[]> = {
  dashboard: [
    { agente: 'Agente Detección Sintética', titulo: 'Deepfake detectado en video corto', detalle: '94.2% sintético · lip-sync mismatch y blending facial en 3 frames clave.', severidad: 'critica', acciones: [A.takedown, A.escalar, A.descartar] },
    { agente: 'Agente de Voz Neural', titulo: 'Clonación de voz en llamada entrante', detalle: 'Huella vocal no coincide con el embedding registrado. Confianza 91%.', severidad: 'critica', acciones: [A.bloquear, A.notificar] },
    { agente: 'Agente Social Listening', titulo: 'Perfil suplantador en plataforma social', detalle: 'Cuenta nueva usando rostro e identidad del cliente. 12.4K seguidores en 6 h.', severidad: 'alta', acciones: [A.takedown, A.revisar] },
    { agente: 'Agente Biométrico', titulo: 'Verificación de iris fallida', detalle: 'Intento de acceso con patrón no registrado desde IP no habitual.', severidad: 'alta', acciones: [A.bloquear, A.escalar] },
    { agente: 'Red Neuronal de Autenticidad', titulo: 'Contenido auténtico confirmado', detalle: 'Muestra verificada sin artefactos sintéticos. Certificado emitido.', severidad: 'baja', acciones: [A.aprobar] },
  ],
  legal: [
    { agente: 'Agente Registro IP', titulo: 'Uso no licenciado de imagen registrada', detalle: 'Coincidencia con activo IP-2291 en campaña publicitaria de terceros.', severidad: 'critica', acciones: [A.takedown, A.escalar] },
    { agente: 'Agente Notariado', titulo: 'Evidencia sellada en cadena de custodia', detalle: 'Hash SHA-256 notariado. Paquete listo para procedimiento legal.', severidad: 'media', acciones: [A.aprobar, A.revisar] },
    { agente: 'Agente Takedown Legal', titulo: 'Plazo DMCA por vencer', detalle: 'Caso LG-4417 sin respuesta de la plataforma. Quedan 18 h de plazo.', severidad: 'alta', acciones: [A.escalar, A.notificar] },
  ],
  forensics: [
    { agente: 'Agente Detección Sintética', titulo: 'Artefactos GAN en muestra subida', detalle: 'Firma de difusión latente detectada en la región periocular.', severidad: 'critica', acciones: [A.revisar, A.takedown, A.descartar] },
    { agente: 'Agente Análisis de Artefactos', titulo: 'Inconsistencia temporal en 7 frames', detalle: 'Parpadeo fuera de distribución natural. Probabilidad sintética 88%.', severidad: 'alta', acciones: [A.revisar, A.escalar] },
    { agente: 'Red Neuronal de Autenticidad', titulo: 'Muestra clasificada como auténtica', detalle: 'Sin evidencia de manipulación. Reporte forense archivado.', severidad: 'baja', acciones: [A.aprobar] },
  ],
  vault: [
    { agente: 'Agente de Cifrado', titulo: 'Intento de acceso a bóveda denegado', detalle: 'Token expirado desde dispositivo no registrado. Sesión terminada.', severidad: 'alta', acciones: [A.bloquear, A.notificar] },
    { agente: 'Agente Embedding Biométrico', titulo: 'Nuevo embedding facial registrado', detalle: 'Vector de 512 dimensiones cifrado y replicado en 3 regiones.', severidad: 'baja', acciones: [A.aprobar] },
    { agente: 'Agente Blockchain', titulo: 'Identidad anclada en cadena', detalle: 'Bloque 8,402,117 confirmado. Prueba de existencia disponible.', severidad: 'media', acciones: [A.aprobar, A.revisar] },
  ],
  marketplace: [
    { agente: 'Agente de Licencias', titulo: 'Licencia usada fuera de territorio', detalle: 'Contrato MX-0821 detectado en campaña en LATAM sur.', severidad: 'alta', acciones: [A.congelar, A.notificar] },
    { agente: 'Agente de Contratos IA', titulo: 'Cláusula de uso sintético ausente', detalle: 'Borrador sin restricción de entrenamiento de modelos. Requiere firma.', severidad: 'media', acciones: [A.revisar, A.aprobar] },
    { agente: 'Agente de Tarificación', titulo: 'Oferta por encima del rango sugerido', detalle: 'Solicitud 38% arriba de la tarifa base para Tier 2.', severidad: 'baja', acciones: [A.aprobar, A.revisar] },
  ],
  enforcement: [
    { agente: 'Agente DMCA', titulo: 'Takedown ejecutado con éxito', detalle: 'Contenido retirado en 41 min. Evidencia archivada del caso EN-1180.', severidad: 'baja', acciones: [A.aprobar] },
    { agente: 'Agente Cease & Desist', titulo: 'Reincidencia del mismo infractor', detalle: 'Tercer intento del dominio mirror-cdn.io en 48 h.', severidad: 'critica', acciones: [A.escalar, A.bloquear] },
    { agente: 'Agente de Notariado Timestamp', titulo: 'Sello temporal aplicado', detalle: 'Prueba de infracción con timestamp certificado.', severidad: 'media', acciones: [A.aprobar] },
  ],
  globalAlerts: [
    { agente: 'Agente de Correlación Global', titulo: 'Pico de amenazas en región EMEA', detalle: '+62% de eventos sintéticos en 4 h. Patrón coordinado probable.', severidad: 'critica', acciones: [A.escalar, A.revisar] },
    { agente: 'Agente de Vigilancia 24/7', titulo: 'Nueva campaña de suplantación', detalle: 'Cluster de 14 cuentas replicando el mismo rostro en 3 plataformas.', severidad: 'alta', acciones: [A.takedown, A.escalar] },
    { agente: 'Agente de Correlación Global', titulo: 'Región estabilizada', detalle: 'LATAM vuelve a niveles base tras 6 takedowns coordinados.', severidad: 'baja', acciones: [A.aprobar] },
  ],
};

// Agentes que se muestran "trabajando" en cada sección.
export const agentesPorSeccion = (seccion: string): string[] => {
  const p = PLANTILLAS[seccion] ?? PLANTILLAS.dashboard;
  return [...new Set(p.map((x) => x.agente))];
};

// ── Store ────────────────────────────────────────────────────────────────────
const MAX_EVENTOS = 30;
let eventos: EventoAgente[] = [];
let seccionActiva = 'dashboard';
const subs = new Set<(e: EventoAgente[]) => void>();
const subsToast = new Set<(e: EventoAgente) => void>();

const notificar = () => { const snap = eventos; subs.forEach((f) => f(snap)); };

const hora = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];

export const setSeccionActiva = (s: string) => { seccionActiva = s; };

function emitir(seccion: string) {
  const plantillas = PLANTILLAS[seccion] ?? PLANTILLAS.dashboard;
  const p = pick(plantillas);
  const ev: EventoAgente = {
    ...p,
    id: `ev-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    seccion,
    hora: hora(),
    resuelto: null,
    leido: false,
  };
  eventos = [ev, ...eventos].slice(0, MAX_EVENTOS);
  notificar();
  subsToast.forEach((f) => f(ev));
}

// Un solo temporizador global: 70% de los eventos son de la sección visible.
let timer: ReturnType<typeof setTimeout> | null = null;
let refs = 0;

function programar() {
  timer = setTimeout(() => {
    const secciones = Object.keys(PLANTILLAS);
    emitir(Math.random() < 0.7 ? seccionActiva : pick(secciones));
    programar();
  }, 7000 + Math.random() * 6000);
}

function arrancar() {
  if (refs++ > 0) return;
  // Arranque con algo de historia para que la campana no nazca vacía.
  if (eventos.length === 0) {
    emitir('dashboard');
    emitir('forensics');
    emitir('enforcement');
    eventos = eventos.map((e) => ({ ...e, leido: false }));
  }
  programar();
}

function parar() {
  if (--refs > 0) return;
  if (timer) { clearTimeout(timer); timer = null; }
}

export const resolverEvento = (id: string, accion: AccionAgente) => {
  eventos = eventos.map((e) => (e.id === id ? { ...e, resuelto: accion.confirmacion, leido: true } : e));
  notificar();
};

export const marcarTodoLeido = () => {
  eventos = eventos.map((e) => ({ ...e, leido: true }));
  notificar();
};

export const marcarLeido = (id: string) => {
  eventos = eventos.map((e) => (e.id === id ? { ...e, leido: true } : e));
  notificar();
};

// ── Hooks ────────────────────────────────────────────────────────────────────
export function useEventosAgentes() {
  const [lista, setLista] = useState<EventoAgente[]>(eventos);
  useEffect(() => {
    setLista(eventos);
    subs.add(setLista);
    arrancar();
    return () => { subs.delete(setLista); parar(); };
  }, []);
  return lista;
}

// Sólo para los toasts: escucha eventos nuevos, no el historial.
export function useNuevosEventos(cb: (e: EventoAgente) => void) {
  useEffect(() => {
    subsToast.add(cb);
    return () => { subsToast.delete(cb); };
  }, [cb]);
}
