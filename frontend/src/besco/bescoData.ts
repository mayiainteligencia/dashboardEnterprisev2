import type { LucideIcon } from 'lucide-react';
import {
  Truck, Route, Wrench, Gauge, FileText, DollarSign, AlertTriangle,
  UserCog, ScanEye, BarChart3,
  Video, Flame, Building2, Wind, Zap, FileBarChart, LayoutGrid, TrendingUp,
} from 'lucide-react';

export type Modo = 'cliente' | 'admin';
export type Kpi = { label: string; valor: string };
export type Modulo = {
  id: string;
  titulo: string;
  descripcion: string;
  icono: LucideIcon;
  kpis: Kpi[];
};

// KPIs de cabecera del dashboard Admin
export const kpisAdmin: Kpi[] = [
  { label: 'Unidades activas', valor: '400' },
  { label: 'Inmuebles', valor: '7,000' },
  { label: 'Oficinas', valor: '35' },
  { label: 'Tickets / SLA hoy', valor: '18 · 94%' },
];

// Dashboard 1 — Operación interna (amarillo) · 10 módulos
export const modulosAdmin: Modulo[] = [
  { id: 'fleet', titulo: 'Fleet Intelligence Command Center', descripcion: 'Estado en vivo de la flota por región.', icono: Truck,
    kpis: [{ label: 'Activas', valor: '352' }, { label: 'Detenidas', valor: '48' }, { label: 'Regiones', valor: '12' }] },
  { id: 'rutas', titulo: 'Optimización de rutas', descripcion: 'Rutas reordenadas por IA para cumplir SLA.', icono: Route,
    kpis: [{ label: 'Km ahorrados', valor: '12,480' }, { label: 'Cumplimiento SLA', valor: '94%' }] },
  { id: 'mant-veh', titulo: 'Mantenimiento predictivo vehicular', descripcion: 'Fallas anticipadas antes de ocurrir.', icono: Wrench,
    kpis: [{ label: 'Unidades en riesgo', valor: '17' }, { label: 'Disponibilidad', valor: '96%' }] },
  { id: 'driver-risk', titulo: 'Speed & Driver Risk', descripcion: 'Score de conducción y alertas de velocidad.', icono: Gauge,
    kpis: [{ label: 'Score conductor', valor: '8.4' }, { label: 'Alertas velocidad', valor: '23' }] },
  { id: 'polizas', titulo: 'Agente de pólizas y documentos', descripcion: 'Vencimientos y cumplimiento documental.', icono: FileText,
    kpis: [{ label: 'Vencen pronto', valor: '9' }, { label: 'Cumplimiento', valor: '98%' }] },
  { id: 'gasto', titulo: 'IA de gasto operativo', descripcion: 'Gasolina, viáticos y refacciones bajo control.', icono: DollarSign,
    kpis: [{ label: 'Anomalías', valor: '6' }, { label: 'Fuga detectada', valor: '$184K' }] },
  { id: 'sla', titulo: 'Predicción de incumplimiento SLA', descripcion: 'Semáforo de tickets en riesgo.', icono: AlertTriangle,
    kpis: [{ label: 'Tickets en rojo', valor: '4' }, { label: 'Semáforo', valor: 'Amarillo' }] },
  { id: 'copiloto', titulo: 'Copiloto del supervisor', descripcion: 'Asignaciones y escalamientos sugeridos.', icono: UserCog,
    kpis: [{ label: 'Asignaciones', valor: '31' }, { label: 'Escalamientos', valor: '5' }] },
  { id: 'auditor', titulo: 'Auditor visual de evidencia (CV)', descripcion: 'Cierres validados por visión computacional.', icono: ScanEye,
    kpis: [{ label: 'Cierres validados', valor: '212' }, { label: 'Disputas evitadas', valor: '38' }] },
  { id: 'ejecutivo-op', titulo: 'Dashboard ejecutivo de operaciones', descripcion: 'KPIs consolidados de la operación.', icono: BarChart3,
    kpis: [{ label: 'Costo / unidad', valor: '$2,140' }, { label: 'KPIs en verde', valor: '21/26' }] },
];

// Dashboard 2 — Hacia clientes (verde) · 8 módulos
export const modulosCliente: Modulo[] = [
  { id: 'cctv', titulo: 'Vigilancia IA sobre CCTV existente', descripcion: 'Analítica sobre las cámaras que ya tienes.', icono: Video,
    kpis: [{ label: 'Eventos detectados', valor: '1,284' }, { label: 'Cámaras activas', valor: '742' }] },
  { id: 'fuego', titulo: 'Detección de fuego / humo / intrusión', descripcion: 'Alertas críticas en segundos.', icono: Flame,
    kpis: [{ label: 'Alertas críticas', valor: '3' }, { label: 'Tiempo respuesta', valor: '42s' }] },
  { id: 'health', titulo: 'Smart Building Health Score', descripcion: 'Salud integral por inmueble.', icono: Building2,
    kpis: [{ label: 'Score promedio', valor: '87' }, { label: 'Inmuebles', valor: '7,000' }] },
  { id: 'hvac', titulo: 'Mant. predictivo HVAC / UPS / bombas', descripcion: 'Sistemas críticos antes de fallar.', icono: Wind,
    kpis: [{ label: 'Sistemas en riesgo', valor: '14' }, { label: 'Downtime evitado', valor: '96h' }] },
  { id: 'energy', titulo: 'Energy & Risk Intelligence', descripcion: 'Consumo y ahorro energético.', icono: Zap,
    kpis: [{ label: 'Consumo', valor: '1.2 GWh' }, { label: 'Ahorro', valor: '14%' }] },
  { id: 'reporte', titulo: 'Generador de reporte ejecutivo por cliente', descripcion: 'Reportes listos para enviar.', icono: FileBarChart,
    kpis: [{ label: 'Reportes enviados', valor: '128' }] },
  { id: 'portal', titulo: 'Facility Intelligence Portal', descripcion: 'Self-service para cada cliente.', icono: LayoutGrid,
    kpis: [{ label: 'Clientes activos', valor: '46' }, { label: 'Inmuebles', valor: '7,000' }] },
  { id: 'upsell', titulo: 'Upsell Scoring de cartera', descripcion: 'Oportunidades comerciales priorizadas.', icono: TrendingUp,
    kpis: [{ label: 'Oportunidades', valor: '63' }] },
];

export const modulosPorModo = (m: Modo): Modulo[] => (m === 'admin' ? modulosAdmin : modulosCliente);

// ---------- Severidades (sin rojo: naranja / ámbar / verde) ----------
export type Severidad = 'critico' | 'atencion' | 'ok';
export const colorSeveridad: Record<Severidad, string> = {
  critico: '#EA580C',   // naranja
  atencion: '#F59E0B',  // ámbar
  ok: '#10B981',        // verde
};
export const labelSeveridad: Record<Severidad, string> = {
  critico: 'Crítico', atencion: 'Atención', ok: 'Informativo',
};

// ---------- Alertas (campana de actividad) por modo ----------
export type Alerta = { severidad: Severidad; titulo: string; detalle: string; hace: string; accion: string };

export const alertasPorModo: Record<Modo, Alerta[]> = {
  admin: [
    { severidad: 'critico', titulo: 'Unidad 142 fuera de servicio · CDMX', hace: '8 min', accion: 'Reasignar ruta y agendar grúa.',
      detalle: 'La unidad 142 reporta falla de motor en zona Centro. Hay 2 servicios de mantenimiento asignados a su ruta de hoy.' },
    { severidad: 'atencion', titulo: 'SLA en riesgo: 3 tickets por vencer', hace: '22 min', accion: 'Priorizar cuadrillas en zona Norte.',
      detalle: 'Tres tickets de mantenimiento correctivo vencen en menos de 2 horas y aún no tienen cuadrilla en sitio.' },
    { severidad: 'atencion', titulo: 'Anomalía de gasto en combustible (+18%)', hace: '1 h', accion: 'Auditar cargas de la región Bajío.',
      detalle: 'El gasto de combustible de la región Bajío subió 18% vs. el promedio mensual sin aumento de servicios.' },
    { severidad: 'atencion', titulo: 'Pólizas de 9 unidades vencen esta semana', hace: '3 h', accion: 'Renovar antes del viernes.',
      detalle: 'Nueve unidades de la flota tienen pólizas de seguro con vencimiento en los próximos 5 días.' },
    { severidad: 'ok', titulo: 'Mantenimiento preventivo completado · 12 unidades', hace: '5 h', accion: 'Sin acción requerida.',
      detalle: 'Se completó el mantenimiento preventivo programado de 12 unidades en el taller central.' },
  ],
  cliente: [
    { severidad: 'critico', titulo: 'Detección de humo · Inmueble Polanco 04', hace: '3 min', accion: 'Verificar con monitoreo y notificar al cliente.',
      detalle: 'La analítica sobre CCTV detectó humo en el nivel 3 del inmueble Polanco 04. Evento aún sin confirmar por personal.' },
    { severidad: 'atencion', titulo: 'Cámara offline · C.C. Santa Fe', hace: '18 min', accion: 'Enviar técnico a revisar enlace.',
      detalle: 'Una de las 742 cámaras monitoreadas perdió conexión hace 18 minutos en el Centro Comercial Santa Fe.' },
    { severidad: 'atencion', titulo: 'Health Score bajó a 72 · Edificio Insurgentes', hace: '1 h', accion: 'Revisar HVAC y consumo eléctrico.',
      detalle: 'El Smart Building Health Score del Edificio Insurgentes cayó de 88 a 72 por alertas de HVAC y consumo.' },
    { severidad: 'ok', titulo: 'Mantenimiento UPS completado · Corporativo MTY', hace: '4 h', accion: 'Sin acción requerida.',
      detalle: 'Se completó el mantenimiento predictivo del sistema UPS en el Corporativo Monterrey.' },
    { severidad: 'ok', titulo: 'Ahorro energético del 14% este mes', hace: '6 h', accion: 'Incluir en reporte ejecutivo del cliente.',
      detalle: 'La cartera de inmuebles logró un ahorro energético del 14% respecto al mes anterior.' },
  ],
};

// ---------- Detalle de cada módulo (lo que "ocupa" cada sección) ----------
export type Fila = (string | number)[];
export type Detalle = {
  insight: string;
  serie?: { titulo: string; datos: { label: string; valor: number }[] };
  tabla?: { titulo: string; columnas: string[]; filas: Fila[] };
  lista?: { titulo: string; items: { texto: string; meta?: string; severidad?: Severidad }[] };
};

// Tipo de gráfica por módulo: tendencia (área), comparacion (barras), proporcion (dona)
export type TipoGrafica = 'tendencia' | 'comparacion' | 'proporcion';
export const serieTipo: Record<string, TipoGrafica> = {
  fleet: 'comparacion', rutas: 'tendencia', 'mant-veh': 'comparacion', 'driver-risk': 'tendencia',
  polizas: 'proporcion', gasto: 'proporcion', sla: 'proporcion', auditor: 'tendencia', 'ejecutivo-op': 'tendencia',
  cctv: 'proporcion', fuego: 'comparacion', health: 'proporcion', hvac: 'comparacion',
  energy: 'tendencia', reporte: 'tendencia', portal: 'tendencia', upsell: 'proporcion',
};

export const detalleModulos: Record<string, Detalle> = {
  // ----- ADMIN -----
  fleet: {
    insight: '352 de 400 unidades activas. 3 regiones concentran el 60% de las detenciones.',
    serie: { titulo: 'Unidades activas por región', datos: [
      { label: 'Centro', valor: 86 }, { label: 'Norte', valor: 72 }, { label: 'Occidente', valor: 54 },
      { label: 'Bajío', valor: 48 }, { label: 'Sureste', valor: 41 }, { label: 'Noreste', valor: 51 } ] },
    tabla: { titulo: 'Estado por región', columnas: ['Región', 'Activas', 'Detenidas', 'Disponibilidad'], filas: [
      ['Centro', 86, 14, '86%'], ['Norte', 72, 9, '89%'], ['Occidente', 54, 7, '89%'], ['Bajío', 48, 6, '89%'], ['Sureste', 41, 8, '84%'] ] },
    lista: { titulo: 'Unidades que requieren atención', items: [
      { texto: 'Unidad 142 · falla de motor', meta: 'CDMX', severidad: 'critico' },
      { texto: 'Unidad 87 · sin reporte GPS 2h', meta: 'Monterrey', severidad: 'atencion' },
      { texto: 'Unidad 23 · mantenimiento vencido', meta: 'Guadalajara', severidad: 'atencion' } ] },
  },
  rutas: {
    insight: '12,480 km ahorrados este mes reordenando rutas con IA; 94% de SLA cumplido.',
    serie: { titulo: 'Km ahorrados por semana', datos: [
      { label: 'S1', valor: 2680 }, { label: 'S2', valor: 3110 }, { label: 'S3', valor: 3290 }, { label: 'S4', valor: 3400 } ] },
    tabla: { titulo: 'Rutas de hoy', columnas: ['Ruta', 'Paradas', 'Km plan', 'SLA'], filas: [
      ['R-Norte', 12, 184, 'OK'], ['R-Centro', 18, 96, 'OK'], ['R-Bajío', 9, 220, 'Riesgo'], ['R-Occidente', 14, 178, 'OK'] ] },
    lista: { titulo: 'Sugerencias IA', items: [
      { texto: 'Combinar R-Bajío con R-Centro ahorra 38 km', severidad: 'ok' },
      { texto: 'Adelantar parada crítica de R-Bajío', severidad: 'atencion' } ] },
  },
  'mant-veh': {
    insight: '17 unidades en riesgo de falla en los próximos 15 días. Disponibilidad de flota 96%.',
    serie: { titulo: 'Unidades en riesgo por sistema', datos: [
      { label: 'Frenos', valor: 5 }, { label: 'Motor', valor: 4 }, { label: 'Transm.', valor: 3 }, { label: 'Susp.', valor: 3 }, { label: 'Eléctrico', valor: 2 } ] },
    tabla: { titulo: 'Predicciones de falla', columnas: ['Unidad', 'Componente', 'Prob. falla', 'Acción'], filas: [
      ['U-142', 'Motor', '82%', 'Taller hoy'], ['U-66', 'Frenos', '74%', 'Agendar'], ['U-201', 'Transmisión', '61%', 'Monitorear'], ['U-19', 'Suspensión', '58%', 'Monitorear'] ] },
  },
  'driver-risk': {
    insight: 'Score promedio 8.4/10. 23 alertas de exceso de velocidad esta semana.',
    serie: { titulo: 'Alertas de velocidad por día', datos: [
      { label: 'Lun', valor: 5 }, { label: 'Mar', valor: 3 }, { label: 'Mié', valor: 4 }, { label: 'Jue', valor: 6 }, { label: 'Vie', valor: 5 } ] },
    tabla: { titulo: 'Conductores a revisar', columnas: ['Conductor', 'Score', 'Excesos', 'Estatus'], filas: [
      ['J. Pérez', 6.2, 7, 'Capacitación'], ['M. López', 6.8, 5, 'Aviso'], ['R. Díaz', 7.1, 4, 'Aviso'], ['A. Ruiz', 9.4, 0, 'Óptimo'] ] },
  },
  polizas: {
    insight: '9 pólizas vencen esta semana. Cumplimiento documental 98%.',
    serie: { titulo: 'Documentos por estatus', datos: [
      { label: 'Vigentes', valor: 372 }, { label: 'Por vencer', valor: 19 }, { label: 'Vencidos', valor: 9 } ] },
    tabla: { titulo: 'Vencimientos próximos', columnas: ['Documento', 'Activo', 'Vence', 'Estatus'], filas: [
      ['Póliza seguro', 'U-142', '2 días', 'Urgente'], ['Verificación', 'U-87', '4 días', 'Pendiente'], ['Tarjeta circulación', 'U-23', '6 días', 'Pendiente'], ['Póliza seguro', 'U-19', '7 días', 'Pendiente'] ] },
    lista: { titulo: 'Acciones', items: [{ texto: 'Renovar 9 pólizas antes del viernes', severidad: 'critico' }] },
  },
  gasto: {
    insight: '6 anomalías detectadas; fuga estimada de $184K en combustible y refacciones.',
    serie: { titulo: 'Gasto por categoría (MXN miles)', datos: [
      { label: 'Combust.', valor: 1240 }, { label: 'Viáticos', valor: 480 }, { label: 'Refacc.', valor: 360 }, { label: 'Casetas', valor: 210 } ] },
    tabla: { titulo: 'Anomalías detectadas', columnas: ['Tipo', 'Región', 'Monto', 'Riesgo'], filas: [
      ['Combustible', 'Bajío', '$84K', 'Alto'], ['Refacciones', 'Norte', '$52K', 'Medio'], ['Viáticos', 'Centro', '$28K', 'Medio'], ['Combustible', 'Occidente', '$20K', 'Bajo'] ] },
  },
  sla: {
    insight: '4 tickets en riesgo de incumplir SLA en las próximas 2 horas.',
    serie: { titulo: 'Tickets por semáforo', datos: [
      { label: 'Verde', valor: 142 }, { label: 'Ámbar', valor: 23 }, { label: 'Naranja', valor: 4 } ] },
    tabla: { titulo: 'Tickets críticos', columnas: ['Ticket', 'Cliente', 'Vence en', 'Semáforo'], filas: [
      ['#4821', 'Torre Reforma', '38 min', 'Naranja'], ['#4830', 'C.C. Santa Fe', '1h 10m', 'Ámbar'], ['#4811', 'Corp. MTY', '1h 40m', 'Ámbar'], ['#4805', 'Polanco 04', '2h', 'Ámbar'] ] },
  },
  copiloto: {
    insight: '31 asignaciones sugeridas hoy; 5 escalamientos requieren tu visto bueno.',
    tabla: { titulo: 'Asignaciones sugeridas', columnas: ['Cuadrilla', 'Tarea', 'Zona', 'Prioridad'], filas: [
      ['Cuadrilla A', 'Correctivo HVAC', 'Centro', 'Alta'], ['Cuadrilla B', 'Preventivo', 'Norte', 'Media'], ['Cuadrilla C', 'Inspección', 'Bajío', 'Media'], ['Cuadrilla D', 'Atención falla', 'Occidente', 'Alta'] ] },
    lista: { titulo: 'Escalamientos', items: [
      { texto: 'Falta de refacción en U-142', meta: 'Compras', severidad: 'critico' },
      { texto: 'Cliente reporta retraso · Torre Reforma', severidad: 'atencion' } ] },
  },
  auditor: {
    insight: '212 cierres validados por visión computacional; 38 disputas evitadas este mes.',
    serie: { titulo: 'Cierres validados por día', datos: [
      { label: 'Lun', valor: 28 }, { label: 'Mar', valor: 31 }, { label: 'Mié', valor: 35 }, { label: 'Jue', valor: 40 }, { label: 'Vie', valor: 42 } ] },
    tabla: { titulo: 'Validaciones recientes', columnas: ['Servicio', 'Inmueble', 'Resultado', 'Confianza'], filas: [
      ['Limpieza', 'Polanco 04', 'Validado', '97%'], ['Mantenimiento', 'Reforma', 'Validado', '95%'], ['Jardinería', 'Santa Fe', 'Revisar', '68%'], ['Limpieza', 'MTY', 'Validado', '93%'] ] },
  },
  'ejecutivo-op': {
    insight: 'Costo por unidad $2,140 (-6% vs mes anterior). 21 de 26 KPIs en verde.',
    serie: { titulo: 'Costo por unidad (MXN, 6 meses)', datos: [
      { label: 'Ene', valor: 2410 }, { label: 'Feb', valor: 2380 }, { label: 'Mar', valor: 2300 }, { label: 'Abr', valor: 2260 }, { label: 'May', valor: 2210 }, { label: 'Jun', valor: 2140 } ] },
    tabla: { titulo: 'KPIs consolidados', columnas: ['KPI', 'Valor', 'Meta', 'Estatus'], filas: [
      ['Disponibilidad flota', '96%', '95%', 'Verde'], ['Cumplimiento SLA', '94%', '95%', 'Ámbar'], ['Costo / unidad', '$2,140', '$2,300', 'Verde'], ['Anomalías gasto', 6, '<10', 'Verde'] ] },
  },
  // ----- CLIENTE -----
  cctv: {
    insight: '1,284 eventos detectados sobre 742 cámaras activas; 96% sin intervención humana.',
    serie: { titulo: 'Eventos por tipo', datos: [
      { label: 'Movim.', valor: 820 }, { label: 'Merodeo', valor: 210 }, { label: 'Acceso', valor: 140 }, { label: 'Objeto', valor: 114 } ] },
    tabla: { titulo: 'Eventos recientes', columnas: ['Hora', 'Inmueble', 'Evento', 'Acción'], filas: [
      ['08:42', 'Polanco 04', 'Merodeo', 'Notificado'], ['09:15', 'Santa Fe', 'Acceso no autorizado', 'En revisión'], ['09:50', 'Insurgentes', 'Objeto abandonado', 'Validado'], ['10:05', 'Reforma', 'Movimiento', 'Descartado'] ] },
  },
  fuego: {
    insight: '3 alertas críticas hoy; tiempo de respuesta promedio 42s.',
    serie: { titulo: 'Alertas por tipo (mes)', datos: [
      { label: 'Humo', valor: 14 }, { label: 'Intrusión', valor: 9 }, { label: 'Fuego', valor: 2 } ] },
    tabla: { titulo: 'Alertas críticas', columnas: ['Hora', 'Inmueble', 'Tipo', 'Estatus'], filas: [
      ['07:10', 'Polanco 04', 'Humo', 'Verificando'], ['11:30', 'Santa Fe', 'Intrusión', 'Atendido'], ['13:05', 'MTY', 'Humo', 'Falsa alarma'] ] },
    lista: { titulo: 'Protocolo', items: [
      { texto: 'Confirmar con monitoreo en sitio', severidad: 'atencion' },
      { texto: 'Notificar al cliente y a bomberos si se confirma', severidad: 'critico' } ] },
  },
  health: {
    insight: 'Score promedio 87/100 en 7,000 inmuebles. 5 inmuebles por debajo de 75.',
    serie: { titulo: 'Distribución de score', datos: [
      { label: '90-100', valor: 4200 }, { label: '80-89', valor: 1900 }, { label: '70-79', valor: 640 }, { label: '<70', valor: 260 } ] },
    tabla: { titulo: 'Inmuebles a revisar', columnas: ['Inmueble', 'Score', 'Factor', 'Tendencia'], filas: [
      ['Insurgentes', 72, 'HVAC', '↓'], ['Reforma 22', 74, 'Energía', '↓'], ['Centro 09', 70, 'UPS', '→'], ['Sur 14', 73, 'CCTV', '↑'] ] },
  },
  hvac: {
    insight: '14 sistemas en riesgo; 96 horas de downtime evitadas este trimestre.',
    serie: { titulo: 'Sistemas en riesgo', datos: [
      { label: 'HVAC', valor: 7 }, { label: 'UPS', valor: 4 }, { label: 'Bombas', valor: 3 } ] },
    tabla: { titulo: 'Predicciones', columnas: ['Sistema', 'Inmueble', 'Prob. falla', 'Acción'], filas: [
      ['HVAC-3', 'Insurgentes', '79%', 'Servicio hoy'], ['UPS-1', 'Reforma', '66%', 'Agendar'], ['Bomba-2', 'Santa Fe', '58%', 'Monitorear'], ['HVAC-1', 'MTY', '54%', 'Monitorear'] ] },
  },
  energy: {
    insight: 'Consumo 1.2 GWh; 14% de ahorro vs mes anterior en la cartera.',
    serie: { titulo: 'Consumo por mes (MWh)', datos: [
      { label: 'Ene', valor: 1380 }, { label: 'Feb', valor: 1340 }, { label: 'Mar', valor: 1300 }, { label: 'Abr', valor: 1260 }, { label: 'May', valor: 1230 }, { label: 'Jun', valor: 1200 } ] },
    tabla: { titulo: 'Top consumidores', columnas: ['Inmueble', 'Consumo', 'Ahorro', 'Riesgo'], filas: [
      ['Reforma 22', '184 MWh', '8%', 'Medio'], ['Insurgentes', '160 MWh', '12%', 'Bajo'], ['Santa Fe', '142 MWh', '16%', 'Bajo'], ['MTY', '120 MWh', '19%', 'Bajo'] ] },
  },
  reporte: {
    insight: '128 reportes ejecutivos enviados este mes; generación automática por cliente.',
    serie: { titulo: 'Reportes por mes', datos: [
      { label: 'Abr', valor: 96 }, { label: 'May', valor: 112 }, { label: 'Jun', valor: 128 } ] },
    tabla: { titulo: 'Reportes recientes', columnas: ['Cliente', 'Periodo', 'Estatus', 'Enviado'], filas: [
      ['Grupo A', 'Junio', 'Enviado', 'Hace 4h'], ['Grupo B', 'Junio', 'Generado', 'Hoy'], ['Grupo C', 'Junio', 'Pendiente', '—'], ['Grupo D', 'Mayo', 'Enviado', 'Hace 3d'] ] },
    lista: { titulo: 'Acciones', items: [{ texto: 'Enviar reporte de Grupo C', severidad: 'atencion' }] },
  },
  portal: {
    insight: '46 clientes activos en el portal self-service sobre 7,000 inmuebles.',
    serie: { titulo: 'Sesiones por semana', datos: [
      { label: 'S1', valor: 320 }, { label: 'S2', valor: 410 }, { label: 'S3', valor: 480 }, { label: 'S4', valor: 520 } ] },
    tabla: { titulo: 'Clientes más activos', columnas: ['Cliente', 'Inmuebles', 'Sesiones', 'Satisf.'], filas: [
      ['Grupo A', 1240, 210, '4.7'], ['Grupo B', 890, 180, '4.5'], ['Grupo C', 640, 120, '4.2'], ['Grupo D', 510, 96, '4.6'] ] },
  },
  upsell: {
    insight: '63 oportunidades comerciales priorizadas por IA en la cartera.',
    serie: { titulo: 'Oportunidades por servicio', datos: [
      { label: 'CCTV IA', valor: 24 }, { label: 'Energía', valor: 18 }, { label: 'HVAC', valor: 13 }, { label: 'Reportes', valor: 8 } ] },
    tabla: { titulo: 'Oportunidades top', columnas: ['Cliente', 'Servicio', 'Potencial', 'Score'], filas: [
      ['Grupo A', 'CCTV IA', '$1.2M', 92], ['Grupo B', 'Energía', '$780K', 85], ['Grupo C', 'HVAC', '$540K', 78], ['Grupo D', 'Reportes', '$210K', 70] ] },
  },
};

// ---------- Notificaciones (campana general) por modo ----------
export type Notif = { id: number; severidad: Severidad; titulo: string; mensaje: string; tiempo: string; leida: boolean };

export const notifsPorModo: Record<Modo, Notif[]> = {
  admin: [
    { id: 1, severidad: 'critico', titulo: 'Unidad detenida en ruta', mensaje: 'La unidad 142 quedó fuera de servicio en CDMX.', tiempo: 'Hace 8 min', leida: false },
    { id: 2, severidad: 'atencion', titulo: 'SLA por vencer', mensaje: '3 tickets de mantenimiento vencen en menos de 2 horas.', tiempo: 'Hace 22 min', leida: false },
    { id: 3, severidad: 'atencion', titulo: 'Gasto operativo', mensaje: 'Anomalía de combustible en la región Bajío (+18%).', tiempo: 'Hace 1 h', leida: false },
    { id: 4, severidad: 'ok', titulo: 'Mantenimiento preventivo', mensaje: '12 unidades completaron su servicio programado.', tiempo: 'Hace 5 h', leida: true },
  ],
  cliente: [
    { id: 1, severidad: 'critico', titulo: 'Posible incendio', mensaje: 'Detección de humo en el inmueble Polanco 04.', tiempo: 'Hace 3 min', leida: false },
    { id: 2, severidad: 'atencion', titulo: 'Cámara sin señal', mensaje: 'Una cámara perdió conexión en C.C. Santa Fe.', tiempo: 'Hace 18 min', leida: false },
    { id: 3, severidad: 'atencion', titulo: 'Health Score', mensaje: 'El Edificio Insurgentes bajó a 72 puntos.', tiempo: 'Hace 1 h', leida: false },
    { id: 4, severidad: 'ok', titulo: 'Reporte enviado', mensaje: 'Se envió el reporte ejecutivo mensual al cliente.', tiempo: 'Hace 4 h', leida: true },
  ],
};
