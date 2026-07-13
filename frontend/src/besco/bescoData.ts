import type { LucideIcon } from 'lucide-react';
import {
  Truck, Route, Wrench, Gauge, FileText, DollarSign, AlertTriangle,
  UserCog, ScanEye, BarChart3,
  Video, Flame, Building2, Wind, Zap, FileBarChart, LayoutGrid, TrendingUp,
  Grid3x3, Cpu,
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
  { id: 'pisos', titulo: 'Controlador de pisos laminados', descripcion: 'Piso técnico en vivo: paneles por nivel, carga y clima bajo piso.', icono: Grid3x3,
    kpis: [{ label: 'Paneles', valor: '288' }, { label: 'En alerta', valor: '7' }, { label: 'Niveles', valor: '6' }] },
  { id: 'abastecimiento', titulo: 'Abastecimiento de Urgencia (IA)', descripcion: 'Optimiza la atención de requerimientos urgentes buscando proveedores.', icono: Cpu,
    kpis: [{ label: 'Respuesta', valor: '3.4 min' }, { label: 'Ahorro prom.', valor: '18.5%' }, { label: 'SLA Urgencias', valor: '98%' }] },
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
  { id: 'abastecimiento', titulo: 'Abastecimiento de Urgencia (IA)', descripcion: 'Optimiza la atención de requerimientos urgentes buscando proveedores.', icono: Cpu,
    kpis: [{ label: 'Respuesta', valor: '3.4 min' }, { label: 'Ahorro prom.', valor: '18.5%' }, { label: 'SLA Urgencias', valor: '98%' }] },
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

// ---------- Alertas "al momento" (toaster) — solo Admin ----------
// Pool del que el ToastHost va sacando alertas en vivo mientras se opera en modo admin.
export type ToastAlerta = { severidad: Severidad; modulo: string; titulo: string; mensaje: string };

export const alertasVivoAdmin: ToastAlerta[] = [
  { severidad: 'critico', modulo: 'Flota', titulo: 'Unidad 142 fuera de servicio', mensaje: 'Falla de motor en CDMX Centro. Ruta con 2 servicios pendientes.' },
  { severidad: 'critico', modulo: 'Piso técnico', titulo: 'Panel N3-C4 sobrecargado', mensaje: 'Carga 118% en el nivel 3. Redistribuir rack o aligerar el panel.' },
  { severidad: 'atencion', modulo: 'SLA', titulo: '3 tickets por vencer', mensaje: 'Vencen en menos de 2 h y no tienen cuadrilla en sitio.' },
  { severidad: 'atencion', modulo: 'Gasto', titulo: 'Anomalía de combustible', mensaje: 'Región Bajío +18% vs. promedio, sin más servicios.' },
  { severidad: 'atencion', modulo: 'Piso técnico', titulo: 'Humedad bajo piso', mensaje: 'Nivel 2, zona B: 71% HR. Revisar posible filtración.' },
  { severidad: 'atencion', modulo: 'Pólizas', titulo: '9 pólizas vencen esta semana', mensaje: 'Renovar antes del viernes para no detener unidades.' },
  { severidad: 'critico', modulo: 'Driver Risk', titulo: 'Exceso de velocidad', mensaje: 'Conductor J. Pérez, 132 km/h en autopista. 7º evento.' },
  { severidad: 'ok', modulo: 'Mantenimiento', titulo: 'Preventivo completado', mensaje: '12 unidades salieron del taller central sin pendientes.' },
  { severidad: 'ok', modulo: 'Piso técnico', titulo: 'Nivel 5 estabilizado', mensaje: 'Temperatura bajo piso de vuelta a 22°C tras ajuste HVAC.' },
];

// ---------- Extras por módulo: alertas + recomendación MAYIA + palancas financieras ----------
export type PalancaFin = { label: string; impacto: string; nota: string; ajuste: number };
export type ExtraModulo = {
  alertas: { severidad: Severidad; texto: string; meta?: string }[];
  recomendacion: string;
  palancas: PalancaFin[];
};

const extraFallback: ExtraModulo = {
  alertas: [{ severidad: 'ok', texto: 'Sin alertas activas para este módulo.' }],
  recomendacion: 'Sin acciones prioritarias. Mantén el monitoreo en curso.',
  palancas: [{ label: 'Eficiencia operativa', impacto: '+3%', nota: 'Optimización continua', ajuste: 40 }],
};

export const extraModulos: Record<string, ExtraModulo> = {
  // ----- ADMIN -----
  abastecimiento: {
    alertas: [
      { severidad: 'critico', texto: 'Requerimiento urgente sin proveedor asignado', meta: 'Hace 2 min' },
      { severidad: 'atencion', texto: '2 requisiciones de compras pendientes de optimización', meta: 'Oracle ERP' },
    ],
    recomendacion: 'Ejecuta el análisis de abastecimiento inteligente para encontrar el proveedor con menor ETA y costo optimizado.',
    palancas: [
      { label: 'Tiempo de asignación', impacto: '-45 min', nota: 'Automatización de flujo', ajuste: 88 },
      { label: 'Costo de traslado', impacto: '-15%', nota: 'Optimización de rutas', ajuste: 74 },
      { label: 'Disponibilidad de stock', impacto: '+25%', nota: 'Monitoreo en tiempo real', ajuste: 60 },
    ],
  },
  fleet: {
    alertas: [
      { severidad: 'critico', texto: 'Unidad 142 detenida por falla de motor', meta: 'CDMX · 8 min' },
      { severidad: 'atencion', texto: '48 unidades detenidas concentradas en 3 regiones', meta: 'Centro / Norte / Bajío' },
    ],
    recomendacion: 'Reasigna las rutas de las 12 unidades detenidas del Centro a las 8 disponibles del Norte: recuperas ~94% de SLA sin costo de grúa adicional.',
    palancas: [
      { label: 'Disponibilidad de flota', impacto: '+$1.2M/año', nota: 'Subir de 88% a 96% de uptime', ajuste: 72 },
      { label: 'Costo de grúas', impacto: '-$320K/año', nota: 'Predictivo evita arrastres', ajuste: 55 },
      { label: 'Utilización por unidad', impacto: '+11%', nota: 'Menos ociosidad regional', ajuste: 48 },
    ],
  },
  rutas: {
    alertas: [
      { severidad: 'atencion', texto: 'R-Bajío en riesgo de incumplir SLA', meta: '220 km · 9 paradas' },
      { severidad: 'ok', texto: 'Combinar R-Bajío con R-Centro ahorra 38 km', meta: 'Sugerencia IA' },
    ],
    recomendacion: 'Acepta la fusión R-Bajío + R-Centro y adelanta la parada crítica: liberas una unidad completa y sostienes el 94% de cumplimiento.',
    palancas: [
      { label: 'Combustible por ruta', impacto: '-$184K/mes', nota: '12,480 km ahorrados', ajuste: 68 },
      { label: 'Horas-hombre', impacto: '-9%', nota: 'Rutas más cortas', ajuste: 52 },
      { label: 'Penalizaciones SLA', impacto: '-$210K/año', nota: 'Menos incumplimientos', ajuste: 60 },
    ],
  },
  'mant-veh': {
    alertas: [
      { severidad: 'critico', texto: 'U-142 · 82% de probabilidad de falla de motor', meta: 'Taller hoy' },
      { severidad: 'atencion', texto: '17 unidades en riesgo en los próximos 15 días', meta: 'Frenos y motor' },
    ],
    recomendacion: 'Adelanta el servicio de las 5 unidades con falla de frenos: cada correctivo cuesta ~4x un preventivo y detiene la unidad 2 días.',
    palancas: [
      { label: 'Correctivo vs preventivo', impacto: '-$540K/año', nota: 'Anticipar 17 fallas', ajuste: 74 },
      { label: 'Downtime de flota', impacto: '-96 h/trim', nota: 'Menos paros no planeados', ajuste: 63 },
      { label: 'Vida útil de activos', impacto: '+8%', nota: 'Desgaste controlado', ajuste: 45 },
    ],
  },
  'driver-risk': {
    alertas: [
      { severidad: 'critico', texto: 'J. Pérez · 7 excesos de velocidad esta semana', meta: 'Capacitación' },
      { severidad: 'atencion', texto: '23 alertas de velocidad acumuladas', meta: 'Riesgo de siniestro' },
    ],
    recomendacion: 'Envía a capacitación a los 3 conductores con score < 7: bajarías la prima de seguro y el riesgo de siniestro, que hoy pesa $2.1M en cartera.',
    palancas: [
      { label: 'Prima de seguro', impacto: '-$180K/año', nota: 'Mejor score de flota', ajuste: 58 },
      { label: 'Siniestralidad', impacto: '-$1.4M riesgo', nota: 'Menos incidentes', ajuste: 66 },
      { label: 'Consumo por conducción', impacto: '-4%', nota: 'Manejo eficiente', ajuste: 42 },
    ],
  },
  polizas: {
    alertas: [
      { severidad: 'critico', texto: '9 pólizas vencen esta semana', meta: 'U-142, U-87, U-23…' },
      { severidad: 'atencion', texto: '19 documentos por vencer en 30 días', meta: 'Cumplimiento 98%' },
    ],
    recomendacion: 'Renueva en bloque las 9 pólizas antes del viernes: una unidad sin póliza vigente es una multa y un servicio detenido, no un ahorro.',
    palancas: [
      { label: 'Multas evitadas', impacto: '-$95K/año', nota: 'Cero documentos vencidos', ajuste: 70 },
      { label: 'Descuento por volumen', impacto: '-7%', nota: 'Renovación consolidada', ajuste: 50 },
      { label: 'Unidades detenidas', impacto: '-$140K/año', nota: 'Sin paros por trámite', ajuste: 57 },
    ],
  },
  gasto: {
    alertas: [
      { severidad: 'critico', texto: 'Fuga estimada de $184K en combustible', meta: '6 anomalías' },
      { severidad: 'atencion', texto: 'Bajío +18% en cargas sin más servicios', meta: 'Auditar' },
    ],
    recomendacion: 'Audita las cargas de combustible del Bajío esta semana: el 46% de la fuga se concentra ahí y se recupera con control de folios.',
    palancas: [
      { label: 'Fuga de combustible', impacto: '-$184K/mes', nota: 'Cerrar anomalías', ajuste: 78 },
      { label: 'Refacciones', impacto: '-$52K/mes', nota: 'Compra centralizada', ajuste: 54 },
      { label: 'Viáticos', impacto: '-$28K/mes', nota: 'Política por zona', ajuste: 40 },
    ],
  },
  sla: {
    alertas: [
      { severidad: 'critico', texto: '4 tickets en rojo, vencen en < 2 h', meta: 'Torre Reforma, Santa Fe…' },
      { severidad: 'atencion', texto: '23 tickets en ámbar', meta: 'Vigilar' },
    ],
    recomendacion: 'Prioriza el ticket #4821 (38 min): cada incumplimiento de SLA en clientes ancla pone en riesgo la renovación anual del contrato.',
    palancas: [
      { label: 'Penalización por SLA', impacto: '-$210K/año', nota: 'Cero tickets en rojo', ajuste: 69 },
      { label: 'Retención de contratos', impacto: '+$3.4M', nota: 'Clientes ancla', ajuste: 61 },
      { label: 'Reprocesos', impacto: '-6%', nota: 'Atención a la primera', ajuste: 47 },
    ],
  },
  copiloto: {
    alertas: [
      { severidad: 'critico', texto: 'Falta refacción para U-142', meta: 'Escalar a Compras' },
      { severidad: 'atencion', texto: 'Cliente reporta retraso · Torre Reforma', meta: '5 escalamientos' },
    ],
    recomendacion: 'Aprueba las 4 asignaciones de alta prioridad ahora: automatizar el despacho libera ~6 h/día del supervisor para casos críticos.',
    palancas: [
      { label: 'Tiempo de supervisor', impacto: '-$260K/año', nota: '6 h/día liberadas', ajuste: 64 },
      { label: 'Escalamientos tardíos', impacto: '-40%', nota: 'Despacho asistido', ajuste: 52 },
      { label: 'Cuadrillas ociosas', impacto: '-8%', nota: 'Mejor asignación', ajuste: 44 },
    ],
  },
  auditor: {
    alertas: [
      { severidad: 'atencion', texto: 'Jardinería Santa Fe validada al 68%', meta: 'Revisar evidencia' },
      { severidad: 'ok', texto: '212 cierres validados por visión', meta: '38 disputas evitadas' },
    ],
    recomendacion: 'Marca como estándar la validación por CV en limpieza y mantenimiento: cada disputa evitada ahorra el costo de re-servicio y la nota de crédito.',
    palancas: [
      { label: 'Disputas / notas de crédito', impacto: '-$380K/año', nota: '38 evitadas al mes', ajuste: 71 },
      { label: 'Re-servicios', impacto: '-9%', nota: 'Cierres verificados', ajuste: 53 },
      { label: 'Horas de auditoría', impacto: '-$120K/año', nota: 'Revisión automática', ajuste: 46 },
    ],
  },
  'ejecutivo-op': {
    alertas: [
      { severidad: 'atencion', texto: 'Cumplimiento SLA en 94% (meta 95%)', meta: 'KPI en ámbar' },
      { severidad: 'ok', texto: '21 de 26 KPIs en verde', meta: 'Costo/unidad -6%' },
    ],
    recomendacion: 'El costo por unidad ya bajó a $2,140; enfoca el trimestre en cerrar el KPI de SLA, que es el único que frena la utilidad objetivo.',
    palancas: [
      { label: 'Costo por unidad', impacto: '-6%', nota: '$2,140 vs $2,300 meta', ajuste: 65 },
      { label: 'Margen operativo', impacto: '+2.4 pp', nota: 'KPIs en verde', ajuste: 58 },
      { label: 'EBITDA operación', impacto: '+$2.1M', nota: 'Consolidado anual', ajuste: 60 },
    ],
  },
  pisos: {
    alertas: [
      { severidad: 'critico', texto: 'Panel N3-C4 al 118% de carga', meta: 'Nivel 3 · redistribuir' },
      { severidad: 'atencion', texto: 'Humedad 71% HR bajo piso', meta: 'Nivel 2, zona B' },
    ],
    recomendacion: 'Redistribuye el rack del panel N3-C4 y activa deshumidificación en N2-B: prevenir un colapso de piso técnico evita el paro del site y el reemplazo de plafón.',
    palancas: [
      { label: 'Paro de site evitado', impacto: '-$1.8M riesgo', nota: 'Sin colapso de carga', ajuste: 76 },
      { label: 'Reemplazo de panel', impacto: '-$240K/año', nota: 'Deterioro anticipado', ajuste: 59 },
      { label: 'Enfriamiento bajo piso', impacto: '-11%', nota: 'Flujo balanceado', ajuste: 50 },
    ],
  },
  // ----- CLIENTE -----
  cctv: {
    alertas: [
      { severidad: 'atencion', texto: 'Acceso no autorizado · Santa Fe', meta: 'En revisión' },
      { severidad: 'ok', texto: '1,284 eventos, 96% sin intervención humana', meta: '742 cámaras' },
    ],
    recomendacion: 'La analítica ya cubre el 96% sin operador; ofrece al cliente el monitoreo nocturno asistido por IA como servicio adicional.',
    palancas: [
      { label: 'Horas de monitoreo', impacto: '-$420K/año', nota: 'Menos operadores', ajuste: 67 },
      { label: 'Pérdidas por robo', impacto: '-$1.1M riesgo', nota: 'Respuesta temprana', ajuste: 61 },
      { label: 'Upsell analítica', impacto: '+$780K', nota: 'Servicio premium', ajuste: 55 },
    ],
  },
  fuego: {
    alertas: [
      { severidad: 'critico', texto: 'Detección de humo · Polanco 04', meta: 'Verificando · 3 min' },
      { severidad: 'atencion', texto: 'Tiempo de respuesta promedio 42s', meta: 'Meta < 30s' },
    ],
    recomendacion: 'Confirma en sitio Polanco 04 de inmediato; una detección temprana validada es la diferencia entre un susto y una pérdida total asegurable.',
    palancas: [
      { label: 'Pérdida catastrófica', impacto: '-$8M riesgo', nota: 'Detección en segundos', ajuste: 82 },
      { label: 'Prima de seguro cliente', impacto: '-9%', nota: 'Protección certificada', ajuste: 54 },
      { label: 'Falsas alarmas', impacto: '-31%', nota: 'IA discrimina humo', ajuste: 48 },
    ],
  },
  health: {
    alertas: [
      { severidad: 'atencion', texto: 'Insurgentes bajó de 88 a 72', meta: 'HVAC + energía' },
      { severidad: 'atencion', texto: '5 inmuebles por debajo de 75', meta: 'Revisar' },
    ],
    recomendacion: 'Prioriza Insurgentes y Centro 09; recuperar el score arriba de 85 alarga la vida de los equipos críticos y sostiene la renovación del contrato.',
    palancas: [
      { label: 'Vida útil de equipos', impacto: '+$620K/año', nota: 'Score arriba de 85', ajuste: 63 },
      { label: 'Renovación de contrato', impacto: '+$2.8M', nota: 'Inmuebles sanos', ajuste: 60 },
      { label: 'Correctivos de emergencia', impacto: '-12%', nota: 'Salud monitoreada', ajuste: 49 },
    ],
  },
  hvac: {
    alertas: [
      { severidad: 'critico', texto: 'HVAC-3 Insurgentes · 79% prob. de falla', meta: 'Servicio hoy' },
      { severidad: 'atencion', texto: '14 sistemas críticos en riesgo', meta: 'HVAC / UPS / bombas' },
    ],
    recomendacion: 'Agenda hoy HVAC-3 y UPS-1: un UPS caído tira el site del cliente, y el costo del paro supera 20x el del mantenimiento predictivo.',
    palancas: [
      { label: 'Downtime del cliente', impacto: '-$1.5M riesgo', nota: '96 h evitadas/trim', ajuste: 75 },
      { label: 'Consumo HVAC', impacto: '-7%', nota: 'Equipos afinados', ajuste: 52 },
      { label: 'Reemplazo prematuro', impacto: '-$310K/año', nota: 'Predictivo real', ajuste: 57 },
    ],
  },
  energy: {
    alertas: [
      { severidad: 'atencion', texto: 'Reforma 22 es el mayor consumidor', meta: '184 MWh · 8% ahorro' },
      { severidad: 'ok', texto: '14% de ahorro vs mes anterior', meta: '1.2 GWh cartera' },
    ],
    recomendacion: 'Replica en Reforma 22 la estrategia horaria que ya da 19% en MTY; es el inmueble con mayor margen de ahorro de toda la cartera.',
    palancas: [
      { label: 'Factura eléctrica', impacto: '-$1.9M/año', nota: '14% → 20% ahorro', ajuste: 70 },
      { label: 'Tarifa horaria', impacto: '-8%', nota: 'Cargas fuera de punta', ajuste: 56 },
      { label: 'Bonos de eficiencia', impacto: '+$140K', nota: 'Certificación verde', ajuste: 44 },
    ],
  },
  reporte: {
    alertas: [
      { severidad: 'atencion', texto: 'Reporte de Grupo C pendiente de envío', meta: 'Junio' },
      { severidad: 'ok', texto: '128 reportes enviados este mes', meta: 'Generación automática' },
    ],
    recomendacion: 'Automatiza el envío de Grupo C; cada reporte ejecutivo puntual sostiene la percepción de valor y facilita el upsell en la próxima revisión.',
    palancas: [
      { label: 'Horas de elaboración', impacto: '-$180K/año', nota: 'Reportes automáticos', ajuste: 62 },
      { label: 'Retención por valor', impacto: '+$1.6M', nota: 'Evidencia mensual', ajuste: 55 },
      { label: 'Ciclo de cobro', impacto: '-5 días', nota: 'Soporte a facturación', ajuste: 41 },
    ],
  },
  portal: {
    alertas: [
      { severidad: 'ok', texto: '46 clientes activos, sesiones +62% en el mes', meta: 'Self-service' },
      { severidad: 'atencion', texto: 'Grupo C con satisfacción 4.2', meta: 'La más baja' },
    ],
    recomendacion: 'Impulsa el portal con Grupo C: cada cliente que se auto-atiende reduce carga del call center y sube el margen del contrato.',
    palancas: [
      { label: 'Costo de atención', impacto: '-$300K/año', nota: 'Menos tickets manuales', ajuste: 60 },
      { label: 'Churn de clientes', impacto: '-4 pp', nota: 'Mayor engagement', ajuste: 53 },
      { label: 'Upsell en portal', impacto: '+$540K', nota: 'Ofertas contextuales', ajuste: 50 },
    ],
  },
  upsell: {
    alertas: [
      { severidad: 'ok', texto: '63 oportunidades priorizadas por IA', meta: '$2.7M potencial' },
      { severidad: 'atencion', texto: 'Grupo A · CCTV IA con score 92 sin contactar', meta: 'Actuar' },
    ],
    recomendacion: 'Ataca primero Grupo A (CCTV IA, score 92, $1.2M): es la oportunidad de mayor valor y probabilidad de cierre de toda la cartera.',
    palancas: [
      { label: 'Ingreso incremental', impacto: '+$2.7M', nota: '63 oportunidades', ajuste: 74 },
      { label: 'Ticket promedio', impacto: '+18%', nota: 'Servicios premium', ajuste: 58 },
      { label: 'Ciclo de venta', impacto: '-22%', nota: 'Priorización por score', ajuste: 51 },
    ],
  },
};

export const getExtra = (id: string): ExtraModulo => extraModulos[id] ?? extraFallback;

// Resumen consolidado para el Dashboard General: alertas y palancas top de todos los módulos del modo.
const ordenSev: Severidad[] = ['critico', 'atencion', 'ok'];
export const resumenGeneral = (modo: Modo): ExtraModulo => {
  const exs = modulosPorModo(modo).map(m => extraModulos[m.id]).filter(Boolean) as ExtraModulo[];
  const alertas = exs.flatMap(e => e.alertas)
    .sort((a, b) => ordenSev.indexOf(a.severidad) - ordenSev.indexOf(b.severidad))
    .slice(0, 4);
  const palancas = [...exs.flatMap(e => e.palancas)].sort((a, b) => b.ajuste - a.ajuste).slice(0, 4);
  const recomendacion = modo === 'admin'
    ? 'Ataca primero la fuga de combustible del Bajío ($184K/mes) y libera las unidades detenidas del Centro: son las dos palancas que más mueven la utilidad operativa este mes.'
    : 'Confirma la detección de humo de Polanco 04 y replica en Reforma 22 la estrategia energética de MTY: proteges el contrato ancla y capturas el mayor ahorro de la cartera.';
  return { alertas, recomendacion, palancas };
};

// ---------- Piso técnico: niveles y paneles (Controlador de pisos laminados) ----------
export type Panel = { id: string; estado: Severidad; carga: number; temp: number; humedad: number };
export type Nivel = { id: string; nombre: string; cols: number; filas: number; paneles: Panel[] };

// Genera una malla determinista de paneles con unos cuantos en alerta.
const genNivel = (id: string, nombre: string, cols: number, filas: number, alertas: Record<string, Severidad>): Nivel => {
  const paneles: Panel[] = [];
  for (let r = 0; r < filas; r++) {
    for (let c = 0; c < cols; c++) {
      const pid = `${id}-${String.fromCharCode(65 + r)}${c + 1}`;
      const estado = alertas[pid] ?? 'ok';
      const base = estado === 'critico' ? 112 : estado === 'atencion' ? 88 : 55 + ((r * cols + c) % 22);
      paneles.push({
        id: pid, estado,
        carga: base,
        temp: estado === 'critico' ? 27 : estado === 'atencion' ? 24 : 21 + ((c + r) % 2),
        humedad: estado === 'atencion' && r % 2 === 0 ? 71 : 44 + ((r + c) % 6),
      });
    }
  }
  return { id, nombre, cols, filas, paneles };
};

export const nivelesPiso: Nivel[] = [
  genNivel('N1', 'Nivel 1 · Data hall', 8, 6, { 'N1-B3': 'atencion' }),
  genNivel('N2', 'Nivel 2 · MDF/IDF', 8, 6, { 'N2-B2': 'atencion', 'N2-B6': 'atencion' }),
  genNivel('N3', 'Nivel 3 · Cómputo', 8, 6, { 'N3-C4': 'critico', 'N3-D7': 'atencion' }),
  genNivel('N4', 'Nivel 4 · Oficinas', 8, 6, { 'N4-E2': 'atencion' }),
  genNivel('N5', 'Nivel 5 · Telecom', 8, 6, {}),
  genNivel('N6', 'Nivel 6 · Azotea técnica', 8, 6, { 'N6-A8': 'atencion' }),
];
