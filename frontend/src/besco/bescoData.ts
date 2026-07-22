import type { LucideIcon } from 'lucide-react';
import {
  Truck, Route, Wrench, Gauge, FileText, DollarSign, AlertTriangle,
  UserCog, ScanEye, BarChart3,
  Video, Flame, Building2, Wind, Zap, FileBarChart, LayoutGrid, TrendingUp,
  Grid3x3, Cpu, Trophy,
  FileSpreadsheet, Users, Calculator, Package, CheckCircle2, ShoppingCart, Clock, ShieldCheck,
  GraduationCap, Sparkles, Headphones, Radio,
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

// Sección 1: Comando Inteligente de Compras
export const modulosCompras: Modulo[] = [
  { id: 'abastecimiento', titulo: 'Abastecimiento de Urgencia (IA)', descripcion: 'Optimiza la atención de requerimientos urgentes buscando proveedores.', icono: Cpu,
    kpis: [{ label: 'Respuesta', valor: '3.4 min' }, { label: 'Ahorro prom.', valor: '18.5%' }, { label: 'SLA Urgencias', valor: '98%' }] },
  { id: 'rendimiento-vendedores', titulo: 'Ranking de Compradores', descripcion: 'Eficiencia, ganancias, pérdidas y métricas de resolución por asignado.', icono: Trophy,
    kpis: [{ label: 'Ganancia total', valor: '$1.61M' }, { label: 'Pérdida evitada', valor: '$860K' }, { label: 'SLA Promedio', valor: '97.4%' }] },
  { id: 'requisiciones', titulo: 'Requisiciones', descripcion: 'Solicitudes y requerimientos de compra activos.', icono: FileSpreadsheet,
    kpis: [{ label: 'Abiertas', valor: '42' }, { label: 'En proceso', valor: '18' }] },
  { id: 'proveedores', titulo: 'Proveedores', descripcion: 'Catálogo, evaluación y homologación de proveedores.', icono: Users,
    kpis: [{ label: 'Homologados', valor: '184' }, { label: 'Rating prom.', valor: '4.8' }] },
  { id: 'cotizaciones', titulo: 'Cotizaciones', descripcion: 'Comparativo automático de presupuestos y precios.', icono: Calculator,
    kpis: [{ label: 'En revisión', valor: '12' }, { label: 'Ahorro est.', valor: '15.4%' }] },
  { id: 'inventario', titulo: 'Inventario', descripcion: 'Control de existencias y refacciones en tiempo real.', icono: Package,
    kpis: [{ label: 'Stock crítico', valor: '5' }, { label: 'Valuación', valor: '$4.2M' }] },
  { id: 'aprobaciones', titulo: 'Aprobaciones', descripcion: 'Flujo de firmas y autorización de compras.', icono: CheckCircle2,
    kpis: [{ label: 'Pendientes', valor: '7' }, { label: 'Tiempo prom.', valor: '1.2h' }] },
  { id: 'presupuesto', titulo: 'Presupuesto', descripcion: 'Seguimiento de gasto vs. presupuesto asignado.', icono: BarChart3,
    kpis: [{ label: 'Ejecutado', valor: '68%' }, { label: 'Disponible', valor: '$1.8M' }] },
  { id: 'ordenes-compra', titulo: 'Órdenes de Compra', descripcion: 'Emisión, envío y trazabilidad de ODC.', icono: ShoppingCart,
    kpis: [{ label: 'Emitidas hoy', valor: '29' }, { label: 'En tránsito', valor: '14' }] },
  { id: 'impacto-sla', titulo: 'Impacto SLA', descripcion: 'Medición de urgencias y afectación en la operación.', icono: Clock,
    kpis: [{ label: 'Cumplimiento', valor: '97.2%' }, { label: 'Riesgo bajo', valor: 'Ok' }] },
  { id: 'auditoria', titulo: 'Auditoría', descripcion: 'Validación de facturas, entregas y cumplimiento.', icono: ShieldCheck,
    kpis: [{ label: 'Sin discrepancias', valor: '99.1%' }, { label: 'Auditadas', valor: '156' }] },
];

// Sección 2: Comando Inteligente de Flotillas (9 módulos)
export const modulosFlotillas: Modulo[] = [
  { id: 'fleet', titulo: 'Fleet Intelligence Command Center', descripcion: 'Estado en vivo de la flota por región.', icono: Truck,
    kpis: [{ label: 'Activas', valor: '352' }, { label: 'Detenidas', valor: '48' }, { label: 'Regiones', valor: '12' }] },
  { id: 'rutas', titulo: 'Optimización Inteligente de Rutas', descripcion: 'Rutas reordenadas por IA para cumplir SLA.', icono: Route,
    kpis: [{ label: 'Km ahorrados', valor: '12,480' }, { label: 'Cumplimiento SLA', valor: '94%' }] },
  { id: 'mant-veh', titulo: 'Mantenimiento predictivo vehicular', descripcion: 'Fallas anticipadas antes de ocurrir.', icono: Wrench,
    kpis: [{ label: 'Unidades en riesgo', valor: '17' }, { label: 'Disponibilidad', valor: '96%' }] },
  { id: 'driver-risk', titulo: 'Speed & Driver Risk AI', descripcion: 'Score de conducción y alertas de velocidad.', icono: Gauge,
    kpis: [{ label: 'Score conductor', valor: '8.4' }, { label: 'Alertas velocidad', valor: '23' }] },
  { id: 'polizas', titulo: 'Agente de Pólizas y Documentos', descripcion: 'Vencimientos y cumplimiento documental.', icono: FileText,
    kpis: [{ label: 'Vencen pronto', valor: '9' }, { label: 'Cumplimiento', valor: '98%' }] },
  { id: 'gasto', titulo: 'IA de Gasto Operativo', descripcion: 'Gasolina, viáticos y refacciones bajo control.', icono: DollarSign,
    kpis: [{ label: 'Anomalías', valor: '6' }, { label: 'Fuga detectada', valor: '$184K' }] },
  { id: 'copiloto', titulo: 'Copiloto del Supervisor', descripcion: 'Asignaciones y escalamientos sugeridos.', icono: UserCog,
    kpis: [{ label: 'Asignaciones', valor: '31' }, { label: 'Escalamientos', valor: '5' }] },
  { id: 'auditor', titulo: 'Auditor Visual de evidencia', descripcion: 'Cierres validados por visión computacional.', icono: ScanEye,
    kpis: [{ label: 'Cierres validados', valor: '212' }, { label: 'Disputas evitadas', valor: '38' }] },
  { id: 'sla', titulo: 'Predicción de incumplimiento SLA', descripcion: 'Semáforo de tickets en riesgo.', icono: AlertTriangle,
    kpis: [{ label: 'Tickets en rojo', valor: '4' }, { label: 'Semáforo', valor: 'Amarillo' }] },
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
  { id: 'rendimiento-vendedores', titulo: 'Rendimiento y Ranking de Compradores', descripcion: 'Eficiencia, ganancias, pérdidas y métricas de resolución por asignado.', icono: Trophy,
    kpis: [{ label: 'Ganancia total', valor: '$1.61M' }, { label: 'Pérdida evitada', valor: '$860K' }, { label: 'SLA Promedio', valor: '97.4%' }] },
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
  { id: 'rendimiento-vendedores', titulo: 'Rendimiento y Ranking de Compradores', descripcion: 'Eficiencia, ganancias, pérdidas y métricas de resolución por asignado.', icono: Trophy,
    kpis: [{ label: 'Ganancia total', valor: '$1.61M' }, { label: 'Pérdida evitada', valor: '$860K' }, { label: 'SLA Promedio', valor: '97.4%' }] },
];

// Sección 4: Módulos de Departamentos
export const modulosDepartamentos: Modulo[] = [
  { id: 'dept-administracion', titulo: 'Administración', descripcion: 'Consultoría estratégica, innovación empresarial y calidad ISO 9001.', icono: Building2,
    kpis: [{ label: 'Proyectos', valor: '14' }, { label: 'Calidad ISO', valor: '98%' }] },
  { id: 'dept-finanzas', titulo: 'Finanzas y Contabilidad', descripcion: 'Estados financieros, seguimiento presupuestal, flujo de caja y facturación.', icono: DollarSign,
    kpis: [{ label: 'Balance general', valor: '$12.4M' }, { label: 'Flujo caja', valor: '+15.2%' }] },
  { id: 'dept-operaciones', titulo: 'Operaciones', descripcion: 'Control de líneas de producción, gestión de almacén, logística y calidad.', icono: Wrench,
    kpis: [{ label: 'Eficiencia op.', valor: '96.8%' }, { label: 'Calidad', valor: '99.1%' }] },
  { id: 'dept-rh', titulo: 'Recursos Humanos', descripcion: 'Portal del empleado, reclutamiento inteligente, capacitación y nómina.', icono: Users,
    kpis: [{ label: 'Personal activo', valor: '1,280' }, { label: 'Vacantes', valor: '8' }] },
  { id: 'dept-ti', titulo: 'Tecnologías de la Información', descripcion: 'Infraestructura cloud, mesa de ayuda, desarrollo e ingeniería de datos.', icono: Cpu,
    kpis: [{ label: 'Uptime red', valor: '99.9%' }, { label: 'Tickets res.', valor: '94.2%' }] },
  { id: 'dept-ventas', titulo: 'Ventas y Marketing', descripcion: 'Estrategia comercial, campañas digitales, CRM y analítica predictiva.', icono: TrendingUp,
    kpis: [{ label: 'Tasa conversión', valor: '18.4%' }, { label: 'Leads mes', valor: '340' }] },
  { id: 'dept-playground', titulo: 'Playground & Innovación', descripcion: 'Testing de API, sandbox de código, IA generativa y automatización.', icono: Sparkles,
    kpis: [{ label: 'Demos activos', valor: '24' }, { label: 'Modelos IA', valor: '8' }] },
];

// Sección 5 (Hasta el final en sección aparte): Ciberseguridad, Academia, Centro de Monitoreo y Mesa de Ayuda
export const modulosEspeciales: Modulo[] = [
  { id: 'dept-ciberseguridad', titulo: 'Ciberseguridad Avanzada', descripcion: 'Ciberresiliencia, monitoreo 24/7 en NOC IA y certificación ISO 27001.', icono: ShieldCheck,
    kpis: [{ label: 'Amenazas bloq.', valor: '1,420' }, { label: 'ISO 27001', valor: '100%' }] },
  { id: 'dept-academia', titulo: 'Academia MAYIA', descripcion: 'Plataforma de cursos de negocios, tecnología e IA aplicada.', icono: GraduationCap,
    kpis: [{ label: 'Cursos activos', valor: '32+' }, { label: 'Certificados', valor: '450' }] },
  { id: 'dept-monitoreo', titulo: 'Centro de Monitoreo & Sala Virtual', descripcion: 'Supervisión en vivo 24/7, orquestación de agentes IA y puente virtual de directores BESCO.', icono: Radio,
    kpis: [{ label: 'Agentes IA', valor: '6 Activos' }, { label: 'Directores Sala', valor: '5 Conectados' }] },
  { id: 'dept-mesa-ayuda', titulo: 'Mesa de Ayuda', descripcion: 'Gestión integral de tickets, matriz de escalamiento N1/N2/N3, SLA en tiempo real y respuesta Asistida por IA.', icono: Headphones,
    kpis: [{ label: 'Tickets activos', valor: '18' }, { label: 'T. Respuesta', valor: '3.4 min' }] },
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
    { severidad: 'critico', titulo: 'Exceso de velocidad recurrente · Unidad 215', hace: '14 min', accion: 'Notificar a supervisor y citar a conductor.',
      detalle: 'La unidad 215 superó 118 km/h en Periférico Sur (límite 80 km/h), acumulando 7 alertas de telemetría esta semana.' },
    { severidad: 'critico', titulo: 'Caducidad de placas y verificación vehicular', hace: '20 min', accion: 'Agendar cita en verificentro CDMX.',
      detalle: '6 unidades de la flota CDMX tienen trámite de emplacado y verificación venciendo este viernes. Riesgo de multa y corralón.' },
    { severidad: 'critico', titulo: 'Órden de Compra Urgente pendiente de firma', hace: '32 min', accion: 'Aprobar ODC #BESCO-9418 inmediatamente.',
      detalle: 'La ODC para refacciones de compresor HVAC de urgencia lleva 4 horas esperando firma de autorización.' },
    { severidad: 'atencion', titulo: 'Vencimiento de acuerdo comercial con proveedor', hace: '45 min', accion: 'Iniciar renegociación de tarifa.',
      detalle: 'El convenio de tarifa preferencial con Refacciones MX vence en 10 días. Posible incremento de 12% si no se renueva.' },
    { severidad: 'atencion', titulo: 'Desviación en cotización vs. Presupuesto', hace: '1 h', accion: 'Evaluar proveedor alternativo en sistema.',
      detalle: 'La cotización recibida para lote de llantas industriales excede el presupuesto autorizado por $68,400 MXN.' },
    { severidad: 'atencion', titulo: 'SLA en riesgo: 3 tickets por vencer', hace: '2 h', accion: 'Priorizar cuadrillas en zona Norte.',
      detalle: 'Tres tickets de mantenimiento correctivo vencen en menos de 2 horas y aún no tienen cuadrilla en sitio.' },
    { severidad: 'atencion', titulo: 'Anomalía de gasto en combustible (+18%)', hace: '3 h', accion: 'Auditar cargas de la región Bajío.',
      detalle: 'El gasto de combustible de la región Bajío subió 18% vs. el promedio mensual sin aumento de servicios.' },
    { severidad: 'atencion', titulo: 'Pólizas de 9 unidades vencen esta semana', hace: '4 h', accion: 'Renovar en bloque antes del viernes.',
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
  requisiciones: 'comparacion', proveedores: 'proporcion', cotizaciones: 'comparacion',
  inventario: 'proporcion', aprobaciones: 'tendencia', presupuesto: 'tendencia',
  'ordenes-compra': 'comparacion', 'impacto-sla': 'proporcion', auditoria: 'tendencia',
};

export const detalleModulos: Record<string, Detalle> = {
  // ----- COMPRAS -----
  requisiciones: {
    insight: '42 requisiciones abiertas y 18 en proceso. El 64% corresponde a refacciones críticas para la operación.',
    serie: { titulo: 'Requisiciones por departamento', datos: [
      { label: 'Mantenimiento', valor: 28 }, { label: 'Flotas', valor: 18 }, { label: 'Pisos Técnicos', valor: 9 }, { label: 'Sistemas', valor: 5 } ] },
    tabla: { titulo: 'Requisiciones activas', columnas: ['Folio', 'Departamento', 'Artículos', 'Prioridad', 'Estatus'], filas: [
      ['REQ-4012', 'Mantenimiento', 'Refacciones Compresor', 'Alta', 'En proceso'],
      ['REQ-4015', 'Flotas', 'Llantas industriales', 'Media', 'Aprobada'],
      ['REQ-4019', 'Pisos Técnicos', 'Paneles de repuesto', 'Alta', 'Por revisar'],
      ['REQ-4022', 'Sistemas', 'Switches PoE', 'Baja', 'En proceso'] ] },
    lista: { titulo: 'Alertas de requisiciones', items: [
      { texto: 'REQ-4012 requiere asignación de proveedor urgente', severidad: 'critico' },
      { texto: '3 requisiciones con más de 48h sin movimiento', severidad: 'atencion' } ] },
  },
  proveedores: {
    insight: '184 proveedores homologados en catálogo. Rating promedio de cumplimiento 4.8/5.0.',
    serie: { titulo: 'Proveedores por categoría', datos: [
      { label: 'Refacciones', valor: 68 }, { label: 'Servicios', valor: 45 }, { label: 'Logística', valor: 38 }, { label: 'Equipos', valor: 33 } ] },
    tabla: { titulo: 'Proveedores principales', columnas: ['Proveedor', 'Categoría', 'Rating', 'Cumplimiento SLA', 'Convenio'], filas: [
      ['Refacciones MX', 'Refacciones', '4.9', '98.5%', 'Vigente'],
      ['Mantenimiento Pro', 'Servicios', '4.8', '97.2%', 'Por vencer'],
      ['Logística Express', 'Logística', '4.6', '95.8%', 'Vigente'],
      ['Equipos e Inmuebles', 'Equipos', '4.7', '96.4%', 'Vigente'] ] },
    lista: { titulo: 'Acciones de convenio', items: [
      { texto: 'Convenio tarifario con Mantenimiento Pro vence en 10 días', severidad: 'atencion' },
      { texto: '3 proveedores requieren actualización de homologación', severidad: 'atencion' } ] },
  },
  cotizaciones: {
    insight: '12 cotizaciones en revisión. La IA de BESCO identificó una oportunidad de ahorro del 15.4%.',
    serie: { titulo: 'Ahorro estimado por categoría (MXN)', datos: [
      { label: 'Refacciones', valor: 142000 }, { label: 'Llantas', valor: 98000 }, { label: 'Herramienta', valor: 54000 }, { label: 'Consumibles', valor: 42000 } ] },
    tabla: { titulo: 'Comparativo por IA', columnas: ['Cotización', 'Proveedor A', 'Proveedor B', 'Diferencia', 'Sugerencia IA'], filas: [
      ['COT-8821', '$210,000', '$184,000', '-12.3%', 'Proveedor B'],
      ['COT-8829', '$95,000', '$82,500', '-13.1%', 'Proveedor B'],
      ['COT-8834', '$340,000', '$295,000', '-13.2%', 'Proveedor B'],
      ['COT-8840', '$78,000', '$68,000', '-12.8%', 'Proveedor B'] ] },
    lista: { titulo: 'Desviaciones', items: [
      { texto: 'Cotización Llantas Industriales excede presupuesto por $68,400', severidad: 'critico' } ] },
  },
  inventario: {
    insight: 'Valuación total $4.2M MXN en 5 almacenes regionales. 5 artículos en stock crítico.',
    serie: { titulo: 'Inventario por almacén (MXN)', datos: [
      { label: 'CDMX', valor: 1850000 }, { label: 'MTY', valor: 940000 }, { label: 'GDL', valor: 680000 }, { label: 'Bajío', valor: 430000 }, { label: 'Sureste', valor: 300000 } ] },
    tabla: { titulo: 'Artículos con stock crítico', columnas: ['Código', 'Descripción', 'Stock actual', 'Mínimo', 'Ubicación'], filas: [
      ['REF-092', 'Filtro aceite diésel', '4 unidades', '15 unidades', 'CDMX'],
      ['PAN-104', 'Panel piso técnico', '8 unidades', '30 unidades', 'GDL'],
      ['SEN-441', 'Sensor HVAC', '2 unidades', '10 unidades', 'MTY'],
      ['VAL-210', 'Válvula hidráulica', '3 unidades', '12 unidades', 'Bajío'] ] },
    lista: { titulo: 'Reorden urgente', items: [
      { texto: 'Stock de Filtros diésel por debajo del mínimo de seguridad', severidad: 'critico' } ] },
  },
  aprobaciones: {
    insight: '7 solicitudes pendientes de aprobación. Tiempo promedio de firmas: 1.2 horas.',
    serie: { titulo: 'Aprobaciones procesadas por día', datos: [
      { label: 'Lun', valor: 14 }, { label: 'Mar', valor: 18 }, { label: 'Mié', valor: 22 }, { label: 'Jue', valor: 19 }, { label: 'Vie', valor: 25 } ] },
    tabla: { titulo: 'Solicitudes pendientes', columnas: ['Solicitud', 'Monto', 'Solicitante', 'Nivel', 'Estatus'], filas: [
      ['APR-901', '$148,000', 'Ing. R. Morales', 'Gerencia', 'En espera'],
      ['APR-904', '$42,500', 'Lic. A. Vega', 'Jefatura', 'En espera'],
      ['APR-908', '$310,000', 'Ing. C. Mendoza', 'Dirección', 'En espera'],
      ['APR-912', '$18,900', 'Técnico H. Cruz', 'Supervisión', 'En espera'] ] },
  },
  presupuesto: {
    insight: '68% del presupuesto anual ejecutado ($3.8M de $5.6M). $1.8M disponible.',
    serie: { titulo: 'Ejecución por centro de costos (MXN)', datos: [
      { label: 'Mantenimiento', valor: 1840000 }, { label: 'Flotas', valor: 1210000 }, { label: 'Refacciones', valor: 750000 }, { label: 'Servicios', valor: 420000 } ] },
    tabla: { titulo: 'Estado de partidas', columnas: ['Centro de Costos', 'Presupuesto', 'Ejecutado', 'Disponible', 'Estatus'], filas: [
      ['CC-101 Flotas', '$1,800,000', '$1,210,000', '$590,000', 'Verde'],
      ['CC-102 Mantenimiento', '$2,200,000', '$1,840,000', '$360,000', 'Ámbar'],
      ['CC-103 Pisos', '$900,000', '$520,000', '$380,000', 'Verde'],
      ['CC-104 Administración', '$700,000', '$420,000', '$280,000', 'Verde'] ] },
  },
  'ordenes-compra': {
    insight: '29 ODC emitidas hoy. 14 órdenes en tránsito con rastreo GPS activo.',
    serie: { titulo: 'ODC emitidas por semana', datos: [
      { label: 'S1', valor: 98 }, { label: 'S2', valor: 112 }, { label: 'S3', valor: 125 }, { label: 'S4', valor: 140 } ] },
    tabla: { titulo: 'Órdenes de Compra activas', columnas: ['ODC', 'Proveedor', 'Monto', 'ETA Entrega', 'Estatus'], filas: [
      ['ODC-9418', 'Refacciones MX', '$124,500', 'Hoy 16:30', 'En tránsito'],
      ['ODC-9420', 'Logística Express', '$48,000', 'Mañana', 'En tránsito'],
      ['ODC-9425', 'Mantenimiento Pro', '$86,200', '24 Jul', 'Emitida'],
      ['ODC-9430', 'Equipos MX', '$210,000', '26 Jul', 'En proceso'] ] },
  },
  'impacto-sla': {
    insight: '97.2% de SLA en entregas de insumos. Cero paros de planta por desabasto.',
    serie: { titulo: 'Cumplimiento SLA por insumo (%)', datos: [
      { label: 'Ene', valor: 95.8 }, { label: 'Feb', valor: 96.2 }, { label: 'Mar', valor: 96.9 }, { label: 'Abr', valor: 97.2 } ] },
    tabla: { titulo: 'Monitoreo de suministro', columnas: ['Insumo', 'Servicio Afectado', 'SLA Cumplido', 'Riesgo Paro'], filas: [
      ['Filtros diésel', 'Mantenimiento Flotas', '98.5%', 'Bajo'],
      ['Paneles piso', 'Pisos Técnicos Site', '96.2%', 'Medio'],
      ['Refacciones HVAC', 'Climatización Inmuebles', '97.8%', 'Bajo'],
      ['Aceite sintético', 'Servicio Vehicular', '99.0%', 'Bajo'] ] },
  },
  auditoria: {
    insight: '99.1% de facturas y entregas validadas sin discrepancias. 156 facturas auditadas por IA.',
    serie: { titulo: 'Facturas auditadas por estatus', datos: [
      { label: 'Sin error', valor: 154 }, { label: 'Discrepancia', valor: 2 } ] },
    tabla: { titulo: 'Facturas auditadas', columnas: ['Factura', 'Proveedor', 'Monto', 'Resultado', 'Observaciones'], filas: [
      ['FAC-7712', 'Refacciones MX', '$124,500', 'Validado', 'Coincide con ODC'],
      ['FAC-7718', 'Logística Express', '$48,000', 'Validado', 'Coincide con ODC'],
      ['FAC-7725', 'Proveedor X', '$15,400', 'Revisar', 'Diferencia en IVA $120'],
      ['FAC-7730', 'Equipos MX', '$210,000', 'Validado', 'Coincide con ODC'] ] },
  },

  // ----- ADMIN (FLOTILLAS & OPERACIÓN) -----
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
    { id: 4, severidad: 'ok', titulo: 'Reporte enviado', mensaje: 'Se envió el reporte ejecutivo mensual al cliente.', tiempo: 'Hace 4 h', leida: true },
  ],
};

export type ToastAlerta = { severidad: Severidad; modulo: string; titulo: string; mensaje: string };

export const alertasVivoAdmin: ToastAlerta[] = [
  { severidad: 'critico', modulo: 'Abastecimiento IA', titulo: 'Nuevo caso URG-809 registrado', mensaje: 'Falla crítica de compresor Chiller en Torre Reforma (CDMX). SLA 45 min.' },
  { severidad: 'ok', modulo: 'Análisis IA MAYIA', titulo: 'Optimización de Abastecimiento', mensaje: 'Evaluación completada: 3 proveedores homologados para cisterna Querétaro. Ahorro +22%.' },
  { severidad: 'atencion', modulo: 'Predictibilidad', titulo: 'Alerta Predictiva PRED-305', mensaje: 'Sobretemperatura en transformador Plaza Mayor León (+12°C). ETA preventivo: 75 min.' },
  { severidad: 'ok', modulo: 'Despacho Logístico', titulo: 'Técnico en Camino', mensaje: 'Proveedor Vidrios Templados del Centro despachado a Torre Reforma. ETA: 40 min.' },
  { severidad: 'atencion', modulo: 'Ranking Compradores', titulo: 'Actualización de Desempeño', mensaje: 'Ing. Carlos Mendoza resolvió URG-808 en Toluca alcanzando 98.8% de SLA.' },
  { severidad: 'critico', modulo: 'Abastecimiento IA', titulo: 'Requisición OracleERP Importada', mensaje: 'Solicitud urgente de transformador de subestación en C.C. Santa Fe. Asignada a Lic. Sofía Ramírez.' },
  { severidad: 'ok', modulo: 'Análisis IA MAYIA', titulo: 'Análisis de Cotización en Vivo', mensaje: 'MAYIA seleccionó opción con mayor disponibilidad física y menor costo logístico en Monterrey.' },
  { severidad: 'atencion', modulo: 'Predictibilidad', titulo: 'Alerta Predictiva PRED-306', mensaje: 'Oscilación de voltaje en Tijuana Logística. Botón "Contactar cliente" disponible.' },
  { severidad: 'critico', modulo: 'Flota', titulo: 'Unidad 142 fuera de servicio', mensaje: 'Falla de motor en CDMX Centro. Ruta con 2 servicios pendientes reasignada.' },
  { severidad: 'ok', modulo: 'Despacho Logístico', titulo: 'WhatsApp a Cliente Emitido', mensaje: 'Confirmación enviada a Arq. Roberto Gómez para mantenimiento en Edificio Insurgentes.' },
  { severidad: 'ok', modulo: 'Mantenimiento', titulo: 'Caso URG-804 Solucionado', mensaje: 'Tablero eléctrico en C.C. Santa Fe reparado con éxito en 25 minutos.' },
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
  // ----- COMPRAS -----
  requisiciones: {
    alertas: [
      { severidad: 'critico', texto: 'REQ-4012 de refacciones HVAC lleva 48h sin proveedor', meta: 'Urgente' },
      { severidad: 'atencion', texto: '3 requisiciones pendientes de visto bueno técnico', meta: 'Revisión' },
    ],
    recomendacion: 'Asigna proveedor homologado a REQ-4012 inmediatamente para evitar paro de climatización en Edificio Insurgentes.',
    palancas: [
      { label: 'Tiempo de procesamiento', impacto: '-36 min', nota: 'Aprobación digital', ajuste: 82 },
      { label: 'Costo por requisición', impacto: '-12%', nota: 'Filtro automático', ajuste: 68 },
    ],
  },
  proveedores: {
    alertas: [
      { severidad: 'atencion', texto: 'Convenio tarifario con Mantenimiento Pro vence en 10 días', meta: 'Renegociar' },
      { severidad: 'atencion', texto: '3 proveedores requieren actualización de homologación', meta: 'Documentación' },
    ],
    recomendacion: 'Inicia la renovación consolidada del convenio con Mantenimiento Pro para blindar tarifas preferenciales este año.',
    palancas: [
      { label: 'Descuento por volumen', impacto: '-$320K/año', nota: 'Tarifas negociadas', ajuste: 78 },
      { label: 'Cumplimiento de SLA', impacto: '+98.5%', nota: 'Monitoreo de proveedor', ajuste: 70 },
    ],
  },
  cotizaciones: {
    alertas: [
      { severidad: 'critico', texto: 'Cotización Llantas Industriales excede presupuesto en $68,400', meta: 'En revisión' },
      { severidad: 'atencion', texto: '12 cotizaciones listas para comparativo inteligente IA', meta: 'Optimizar' },
    ],
    recomendacion: 'Selecciona la sugerencia de la IA BESCO para la cotización COT-8821: ahorro directo de 12.3% sin alterar tiempo de entrega.',
    palancas: [
      { label: 'Ahorro por cotización', impacto: '-15.4%', nota: 'Comparativo automático', ajuste: 85 },
      { label: 'Tiempo de adjudicación', impacto: '-4 horas', nota: 'Análisis asistido', ajuste: 62 },
    ],
  },
  inventario: {
    alertas: [
      { severidad: 'critico', texto: 'Stock de Filtros diésel por debajo del mínimo de seguridad', meta: 'CDMX' },
      { severidad: 'atencion', texto: '5 artículos en nivel de stock crítico', meta: 'Reorden' },
    ],
    recomendacion: 'Genera orden de reorden para los 4 filtros diésel en CDMX: previene paros de mantenimiento en la flota central.',
    palancas: [
      { label: 'Fuga por desabasto', impacto: '-$420K/año', nota: 'Stock de seguridad', ajuste: 76 },
      { label: 'Rotación de inventario', impacto: '+18%', nota: 'Optimización de almacén', ajuste: 64 },
    ],
  },
  aprobaciones: {
    alertas: [
      { severidad: 'atencion', texto: 'APR-901 de $148,000 en espera de firma gerencial', meta: '2.5h esperad.' },
      { severidad: 'ok', texto: '7 solicitudes en flujo activo de firmas', meta: 'En proceso' },
    ],
    recomendacion: 'Autoriza la firma digital de APR-901 para liberar el despacho de refacciones de mantenimientos correctivos.',
    palancas: [
      { label: 'Tiempo de firma', impacto: '-1.2 horas', nota: 'Firma móvil BESCO', ajuste: 74 },
      { label: 'Reprocesos por demora', impacto: '-14%', nota: 'Flujo directo', ajuste: 58 },
    ],
  },
  presupuesto: {
    alertas: [
      { severidad: 'atencion', texto: 'CC-102 Mantenimiento al 83% de ejecución trimestral', meta: 'Vigilar' },
      { severidad: 'ok', texto: '$1.8M disponible en partida presupuestal', meta: 'Dentro de rango' },
    ],
    recomendacion: 'Reasigna $120K de la partida CC-103 a CC-102 para balancear la carga presupuestal de mantenimientos preventivos.',
    palancas: [
      { label: 'Control presupuestal', impacto: '0% sobreejecución', nota: 'Alertas tempranas', ajuste: 80 },
      { label: 'Optimización de partidas', impacto: '+$210K', nota: 'Rebalanceo por IA', ajuste: 66 },
    ],
  },
  'ordenes-compra': {
    alertas: [
      { severidad: 'critico', texto: 'ODC #BESCO-9418 de urgencia lleva 4h esperando firma', meta: 'Urgente' },
      { severidad: 'atencion', texto: '14 ODC en tránsito con monitoreo GPS activo', meta: 'En envío' },
    ],
    recomendacion: 'Libera la firma de ODC #BESCO-9418; la refacción llega en 3.4 min para atender la falla HVAC reportada.',
    palancas: [
      { label: 'Ciclo de emisión', impacto: '-6 horas', nota: 'Procesamiento express', ajuste: 88 },
      { label: 'Efectividad de entrega', impacto: '98%', nota: 'Seguimiento en vivo', ajuste: 72 },
    ],
  },
  'impacto-sla': {
    alertas: [
      { severidad: 'atencion', texto: 'Insumo Paneles piso en riesgo medio de retraso', meta: 'GDL' },
      { severidad: 'ok', texto: '97.2% de cumplimiento SLA de suministros', meta: 'Cero paros' },
    ],
    recomendacion: 'Adelanta el envío de paneles desde el almacén CDMX a GDL para asegurar la meta de SLA del 98%.',
    palancas: [
      { label: 'Penalizaciones SLA', impacto: '-$280K/año', nota: 'Cero faltantes', ajuste: 79 },
      { label: 'Confiabilidad cliente', impacto: '99%', nota: 'Disponibilidad total', ajuste: 68 },
    ],
  },
  auditoria: {
    alertas: [
      { severidad: 'atencion', texto: 'FAC-7725 presenta diferencia en IVA ($120 MXN)', meta: 'Revisión' },
      { severidad: 'ok', texto: '154 facturas validadas automáticamente sin error', meta: '99.1% éxito' },
    ],
    recomendacion: 'Acepta la reconciliación automática de la IA para FAC-7725 e ingresa la nota de aclaración al proveedor.',
    palancas: [
      { label: 'Fuga por facturación', impacto: '-$150K/año', nota: 'Validación por IA', ajuste: 72 },
      { label: 'Horas de auditoría', impacto: '-85%', nota: 'Reconciliación auto', ajuste: 84 },
    ],
  },

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

// ---------- Abastecimiento de Urgencia: Casos y Predictividad ----------
export interface CasoUrgencia {
  id: string;
  cliente: string;
  falla: string;
  estado: 'pendiente' | 'en_proceso' | 'solucionado';
  costoTotal: number;
  eta: number; // en minutos
  distancia: number; // en km
  calidad: 'Alta' | 'Estándar' | 'Básica';
  personaAsignada: string;
  rolPersona: string;
  fechaCreacion: string;
}

export interface CasoPredictivo {
  id: string;
  cliente: string;
  contactoCliente: string;
  telefonoCliente: string;
  sistema: string;
  riesgo: 'critico' | 'atencion' | 'ok';
  probabilidadFalla: number; // %
  downtimeEvitado: string;
  costoEstimado: number;
  etaPreventivo: number; // minutos
  personaAsignada: string;
  recomendacionIA: string;
}

export const casosUrgenciaMock: CasoUrgencia[] = [
  {
    id: 'URG-801',
    cliente: 'Torre Reforma (CDMX)',
    falla: 'Ruptura de cristal templado en acceso principal',
    estado: 'en_proceso',
    costoTotal: 8700,
    eta: 40,
    distancia: 8,
    calidad: 'Alta',
    personaAsignada: 'Ing. Carlos Mendoza',
    rolPersona: 'Supervisor Logístico Principal',
    fechaCreacion: 'Hace 25 min'
  },
  {
    id: 'URG-802',
    cliente: 'Plaza Querétaro (QRO)',
    falla: 'Falla de bomba sumergible en cisterna principal',
    estado: 'pendiente',
    costoTotal: 12850,
    eta: 50,
    distancia: 35,
    calidad: 'Alta',
    personaAsignada: 'Lic. Sofía Ramírez',
    rolPersona: 'Coordinadora de Proveedores',
    fechaCreacion: 'Hace 12 min'
  },
  {
    id: 'URG-803',
    cliente: 'Corporativo Monterrey (MTY)',
    falla: 'Fuga hidráulica en tubos principales de bombeo nivel 2',
    estado: 'pendiente',
    costoTotal: 6400,
    eta: 30,
    distancia: 5,
    calidad: 'Estándar',
    personaAsignada: 'Téc. Fernando Ruiz',
    rolPersona: 'Especialista Hidráulico',
    fechaCreacion: 'Hace 45 min'
  },
  {
    id: 'URG-804',
    cliente: 'C.C. Santa Fe (CDMX)',
    falla: 'Cortocircuito en tablero eléctrico secundario sector B',
    estado: 'solucionado',
    costoTotal: 9200,
    eta: 25,
    distancia: 4,
    calidad: 'Alta',
    personaAsignada: 'Ing. Carlos Mendoza',
    rolPersona: 'Supervisor Logístico Principal',
    fechaCreacion: 'Hace 3 horas'
  },
  {
    id: 'URG-805',
    cliente: 'Polanco 04 (CDMX)',
    falla: 'Paro de extractor industrial de humo en cocina ejecutiva',
    estado: 'solucionado',
    costoTotal: 4500,
    eta: 35,
    distancia: 6,
    calidad: 'Estándar',
    personaAsignada: 'Lic. Sofía Ramírez',
    rolPersona: 'Coordinadora de Proveedores',
    fechaCreacion: 'Hace 5 horas'
  },
  {
    id: 'URG-806',
    cliente: 'Parque Industrial Guadalajara (GDL)',
    falla: 'Falla en Chiller de enfriamiento industrial de procesos',
    estado: 'en_proceso',
    costoTotal: 15400,
    eta: 45,
    distancia: 18,
    calidad: 'Alta',
    personaAsignada: 'Ing. Alejandro Vega',
    rolPersona: 'Consultor Técnico de Sitio',
    fechaCreacion: 'Hace 1 hora'
  },
  {
    id: 'URG-807',
    cliente: 'Complejo Logístico Puebla (PUE)',
    falla: 'Falla de sensor óptico en puerta automatizada de andén de carga',
    estado: 'pendiente',
    costoTotal: 5800,
    eta: 55,
    distancia: 28,
    calidad: 'Estándar',
    personaAsignada: 'Lic. Mariana Torres',
    rolPersona: 'Ejecutiva de Solución',
    fechaCreacion: 'Hace 35 min'
  },
  {
    id: 'URG-808',
    cliente: 'Corporativo Toluca (TOL)',
    falla: 'Filtración de agua bajo piso técnico en sitio IDF Nivel 3',
    estado: 'en_proceso',
    costoTotal: 11200,
    eta: 38,
    distancia: 14,
    calidad: 'Alta',
    personaAsignada: 'Ing. Carlos Mendoza',
    rolPersona: 'Supervisor Logístico Principal',
    fechaCreacion: 'Hace 50 min'
  }
];

export const casosPredictivosMock: CasoPredictivo[] = [
  {
    id: 'PRED-301',
    cliente: 'Edificio Insurgentes (CDMX)',
    contactoCliente: 'Arq. Roberto Gómez (Gerente de Inmueble)',
    telefonoCliente: '+52 55 4192 8301',
    sistema: 'Compresor HVAC-3',
    riesgo: 'critico',
    probabilidadFalla: 79,
    downtimeEvitado: '48 horas',
    costoEstimado: 14500,
    etaPreventivo: 60,
    personaAsignada: 'Ing. Carlos Mendoza',
    recomendacionIA: 'La vibración de baleros superó 4.2 mm/s. Se sugiere reemplazo preventivo antes del fin de semana.'
  },
  {
    id: 'PRED-302',
    cliente: 'Torre Reforma 22 (CDMX)',
    contactoCliente: 'Lic. Mariana Torres (Facility Manager)',
    telefonoCliente: '+52 55 8821 9940',
    sistema: 'Banco de Baterías UPS-1',
    riesgo: 'critico',
    probabilidadFalla: 66,
    downtimeEvitado: '24 horas',
    costoEstimado: 18200,
    etaPreventivo: 90,
    personaAsignada: 'Lic. Sofía Ramírez',
    recomendacionIA: 'Degradación de celda 4 detectada. Riesgo de caída de respaldo eléctrico en piso técnico.'
  },
  {
    id: 'PRED-303',
    cliente: 'C.C. Santa Fe (CDMX)',
    contactoCliente: 'Ing. Alejandro Vega (Dir. Operaciones)',
    telefonoCliente: '+52 55 1204 5590',
    sistema: 'Bomba de Presión Hidráulica #2',
    riesgo: 'atencion',
    probabilidadFalla: 58,
    downtimeEvitado: '12 horas',
    costoEstimado: 5600,
    etaPreventivo: 120,
    personaAsignada: 'Téc. Fernando Ruiz',
    recomendacionIA: 'Presión oscilante (-15%). Programar empaquetadura preventivamente sin suspender servicio.'
  },
  {
    id: 'PRED-304',
    cliente: 'Corporativo MTY (MTY)',
    contactoCliente: 'Dra. Patricia Silva (Supervisora General)',
    telefonoCliente: '+52 81 9912 3400',
    sistema: 'Panel de Piso Técnico N3-C4',
    riesgo: 'atencion',
    probabilidadFalla: 54,
    downtimeEvitado: '18 horas',
    costoEstimado: 7800,
    etaPreventivo: 45,
    personaAsignada: 'Ing. Carlos Mendoza',
    recomendacionIA: 'Carga térmica acumulada de 118%. Redistribuir racks o ajustar flujo bajo piso.'
  },
  {
    id: 'PRED-305',
    cliente: 'Plaza Mayor (León)',
    contactoCliente: 'Ing. Javier Solís (Jefe de Mantenimiento)',
    telefonoCliente: '+52 477 302 9100',
    sistema: 'Transformador Secundario Nivel 1',
    riesgo: 'critico',
    probabilidadFalla: 72,
    downtimeEvitado: '36 horas',
    costoEstimado: 21000,
    etaPreventivo: 75,
    personaAsignada: 'Lic. Sofía Ramírez',
    recomendacionIA: 'Sobretemperatura de devanados B en +12°C por sobrecarga de pico. Agendar filtrado de aceite.'
  },
  {
    id: 'PRED-306',
    cliente: 'Centro Logístico (Tijuana)',
    contactoCliente: 'Lic. Eduardo Nava (Director Logístico)',
    telefonoCliente: '+52 664 821 4450',
    sistema: 'Variador de Frecuencia Inyección HVAC',
    riesgo: 'atencion',
    probabilidadFalla: 61,
    downtimeEvitado: '16 horas',
    costoEstimado: 9400,
    etaPreventivo: 110,
    personaAsignada: 'Ing. Alejandro Vega',
    recomendacionIA: 'Oscilación periódica de voltaje en Fase 2. Reemplazo de módulo de control sugerido.'
  },
  {
    id: 'PRED-307',
    cliente: 'Paseo Montejo (Mérida)',
    contactoCliente: 'Arq. Diana Pech (Gerente de Sitio)',
    telefonoCliente: '+52 999 410 8820',
    sistema: 'Condensadora Central AC-Sector A',
    riesgo: 'atencion',
    probabilidadFalla: 52,
    downtimeEvitado: '10 horas',
    costoEstimado: 6300,
    etaPreventivo: 130,
    personaAsignada: 'Lic. Mariana Torres',
    recomendacionIA: 'Holgura en bandas de ventilación. Ajustar tensión de polea para mantener eficiencia térmica en clima cálido.'
  }
];

// ---------- Rendimiento y Ranking de Vendedores / Agentes ----------
export interface VendedorRendimiento {
  id: string;
  nombre: string;
  avatar: string;
  rol: string;
  region: string;
  casosAsignados: number;
  casosSolucionados: number;
  tiempoRespuestaMin: number; // ETA promedio en min
  cumplimientoSLA: number; // %
  gananciaGenerada: number; // MXN
  perdidaGenerada: number; // MXN
  perdidaEvitada: number; // MXN
  scoreEficiencia: number; // 0-100
  posicionRanking: number;
  satisfaccionCliente: number; // 1-5 estrellas
  historialMeses: { mes: string; ganancia: number; perdida: number; casos: number }[];
}

export const vendedoresRendimientoMock: VendedorRendimiento[] = [
  {
    id: 'VEND-01',
    nombre: 'Ing. Carlos Mendoza',
    avatar: 'CM',
    rol: 'Supervisor Logístico Principal',
    region: 'CDMX Centro',
    casosAsignados: 48,
    casosSolucionados: 46,
    tiempoRespuestaMin: 28,
    cumplimientoSLA: 98.4,
    gananciaGenerada: 485000,
    perdidaGenerada: 12000,
    perdidaEvitada: 290000,
    scoreEficiencia: 97.8,
    posicionRanking: 1,
    satisfaccionCliente: 4.9,
    historialMeses: [
      { mes: 'Ene', ganancia: 390000, perdida: 18000, casos: 40 },
      { mes: 'Feb', ganancia: 410000, perdida: 15000, casos: 42 },
      { mes: 'Mar', ganancia: 440000, perdida: 14000, casos: 45 },
      { mes: 'Abr', ganancia: 485000, perdida: 12000, casos: 46 },
    ]
  },
  {
    id: 'VEND-02',
    nombre: 'Lic. Sofía Ramírez',
    avatar: 'SR',
    rol: 'Coordinadora de Proveedores',
    region: 'Bajío & Querétaro',
    casosAsignados: 42,
    casosSolucionados: 40,
    tiempoRespuestaMin: 32,
    cumplimientoSLA: 96.8,
    gananciaGenerada: 392000,
    perdidaGenerada: 18500,
    perdidaEvitada: 210000,
    scoreEficiencia: 94.5,
    posicionRanking: 2,
    satisfaccionCliente: 4.8,
    historialMeses: [
      { mes: 'Ene', ganancia: 310000, perdida: 22000, casos: 35 },
      { mes: 'Feb', ganancia: 340000, perdida: 20000, casos: 38 },
      { mes: 'Mar', ganancia: 370000, perdida: 19000, casos: 39 },
      { mes: 'Abr', ganancia: 392000, perdida: 18500, casos: 40 },
    ]
  },
  {
    id: 'VEND-03',
    nombre: 'Téc. Fernando Ruiz',
    avatar: 'FR',
    rol: 'Especialista Hidráulico & Climas',
    region: 'Norte (Monterrey)',
    casosAsignados: 36,
    casosSolucionados: 34,
    tiempoRespuestaMin: 35,
    cumplimientoSLA: 95.2,
    gananciaGenerada: 310000,
    perdidaGenerada: 24000,
    perdidaEvitada: 165000,
    scoreEficiencia: 91.2,
    posicionRanking: 3,
    satisfaccionCliente: 4.7,
    historialMeses: [
      { mes: 'Ene', ganancia: 260000, perdida: 28000, casos: 30 },
      { mes: 'Feb', ganancia: 280000, perdida: 26000, casos: 31 },
      { mes: 'Mar', ganancia: 295000, perdida: 25000, casos: 33 },
      { mes: 'Abr', ganancia: 310000, perdida: 24000, casos: 34 },
    ]
  },
  {
    id: 'VEND-04',
    nombre: 'Ing. Alejandro Vega',
    avatar: 'AV',
    rol: 'Consultor Técnico de Sitio',
    region: 'Occidente (Guadalajara)',
    casosAsignados: 31,
    casosSolucionados: 28,
    tiempoRespuestaMin: 41,
    cumplimientoSLA: 91.5,
    gananciaGenerada: 245000,
    perdidaGenerada: 36000,
    perdidaEvitada: 110000,
    scoreEficiencia: 86.4,
    posicionRanking: 4,
    satisfaccionCliente: 4.5,
    historialMeses: [
      { mes: 'Ene', ganancia: 200000, perdida: 42000, casos: 24 },
      { mes: 'Feb', ganancia: 215000, perdida: 39000, casos: 25 },
      { mes: 'Mar', ganancia: 230000, perdida: 38000, casos: 27 },
      { mes: 'Abr', ganancia: 245000, perdida: 36000, casos: 28 },
    ]
  },
  {
    id: 'VEND-05',
    nombre: 'Lic. Mariana Torres',
    avatar: 'MT',
    rol: 'Ejecutiva de Atención a Clientes',
    region: 'Sureste (Mérida / Cancún)',
    casosAsignados: 25,
    casosSolucionados: 22,
    tiempoRespuestaMin: 48,
    cumplimientoSLA: 88.0,
    gananciaGenerada: 185000,
    perdidaGenerada: 45000,
    perdidaEvitada: 85000,
    scoreEficiencia: 82.0,
    posicionRanking: 5,
    satisfaccionCliente: 4.3,
    historialMeses: [
      { mes: 'Ene', ganancia: 140000, perdida: 52000, casos: 18 },
      { mes: 'Feb', ganancia: 155000, perdida: 49000, casos: 19 },
      { mes: 'Mar', ganancia: 170000, perdida: 47000, casos: 21 },
      { mes: 'Abr', ganancia: 185000, perdida: 45000, casos: 22 },
    ]
  }
];


