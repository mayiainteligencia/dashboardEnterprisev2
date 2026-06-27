// ponytail: datos dummy para la seccion comercial. Sin logica real todavia, solo demo.

export const agencias = [
  { nombre: 'Polanco',      ventas: 142, meta: 150, leads: 980, conv: 14.5, estado: 'verde'   as const },
  { nombre: 'Satélite',     ventas: 118, meta: 130, leads: 870, conv: 13.6, estado: 'amarillo' as const },
  { nombre: 'Interlomas',   ventas: 96,  meta: 120, leads: 760, conv: 12.6, estado: 'amarillo' as const },
  { nombre: 'Santa Fe',     ventas: 88,  meta: 140, leads: 910, conv: 9.7,  estado: 'rojo'     as const },
  { nombre: 'Coyoacán',     ventas: 134, meta: 130, leads: 845, conv: 15.9, estado: 'verde'   as const },
  { nombre: 'Lindavista',   ventas: 72,  meta: 110, leads: 690, conv: 10.4, estado: 'rojo'     as const },
  { nombre: 'Pedregal',     ventas: 109, meta: 115, leads: 720, conv: 15.1, estado: 'verde'   as const },
  { nombre: 'Toluca',       ventas: 81,  meta: 100, leads: 640, conv: 12.7, estado: 'amarillo' as const },
  { nombre: 'Querétaro',    ventas: 127, meta: 125, leads: 800, conv: 15.9, estado: 'verde'   as const },
  { nombre: 'Puebla',       ventas: 94,  meta: 120, leads: 710, conv: 13.2, estado: 'amarillo' as const },
  { nombre: 'León',         ventas: 76,  meta: 105, leads: 600, conv: 12.7, estado: 'rojo'     as const },
  { nombre: 'Guadalajara',  ventas: 151, meta: 145, leads: 1020, conv: 14.8, estado: 'verde'  as const },
  { nombre: 'Monterrey',    ventas: 138, meta: 140, leads: 960, conv: 14.4, estado: 'verde'   as const },
];

export const funnel = [
  { etapa: 'Lead',       n: 9870 },
  { etapa: 'Contacto',   n: 7240 },
  { etapa: 'Cita',       n: 4980 },
  { etapa: 'Prueba',     n: 3410 },
  { etapa: 'Cotización', n: 2560 },
  { etapa: 'Crédito',    n: 1820 },
  { etapa: 'Aprobado',   n: 1390 },
  { etapa: 'Contrato',   n: 1120 },
  { etapa: 'Entrega',    n: 980  },
  { etapa: 'Venta',      n: 920  },
  { etapa: 'Encuesta',   n: 760  },
  { etapa: 'Recompra',   n: 240  },
];

export const canales = [
  { nombre: 'Social Ads', leads: 3120, cpl: 84,  roi: 4.2 },
  { nombre: 'Search Ads',   leads: 2480, cpl: 112, roi: 3.6 },
  { nombre: 'Mensajería IA',     leads: 1890, cpl: 41,  roi: 6.1 },
  { nombre: 'Video Ads',       leads: 1240, cpl: 68,  roi: 2.9 },
  { nombre: 'Piso de venta', leads: 760, cpl: 0,   roi: 9.8 },
  { nombre: 'Referidos',    leads: 380,  cpl: 22,  roi: 7.4 },
];

export const scoring = [
  { nombre: 'María G.',   modelo: 'Nexora',   score: 92, intencion: 'alta' },
  { nombre: 'Luis R.',    modelo: 'Lumio',  score: 81, intencion: 'alta' },
  { nombre: 'Ana P.',     modelo: 'Kestra',   score: 67, intencion: 'media' },
  { nombre: 'Jorge M.',   modelo: 'Avenar', score: 54, intencion: 'media' },
  { nombre: 'Sofía T.',   modelo: 'Celix',   score: 38, intencion: 'baja' },
];

export const campanias = [
  { nombre: 'MAYIA Legend EV',  inv: 187, ventas: 42, roi: 4.4, estado: 'Activa' },
  { nombre: 'Velox Track',   inv: 210, ventas: 38, roi: 3.8, estado: 'Activa' },
  { nombre: 'Trekar Adv.',  inv: 0,   ventas: 0,  roi: 0,   estado: 'Programada' },
  { nombre: 'MAYIA Neo Sports', inv: 148, ventas: 51, roi: 5.1, estado: 'Completada' },
];

export const vendedores = [
  { nombre: 'Carlos V.',  ventas: 28, seguimientos: 2,  efic: 18.4 },
  { nombre: 'Diana L.',   ventas: 24, seguimientos: 0,  efic: 16.9 },
  { nombre: 'Raúl S.',    ventas: 21, seguimientos: 5,  efic: 14.2 },
  { nombre: 'Paola M.',   ventas: 19, seguimientos: 1,  efic: 15.1 },
  { nombre: 'Tomás H.',   ventas: 12, seguimientos: 8,  efic: 9.7 },
];

export const inventario = [
  { modelo: 'Nexora',   stock: 34, dias: 22, demanda: 'alta' },
  { modelo: 'Lumio',  stock: 41, dias: 38, demanda: 'media' },
  { modelo: 'Kestra',   stock: 18, dias: 12, demanda: 'alta' },
  { modelo: 'Avenar', stock: 27, dias: 64, demanda: 'baja' },
  { modelo: 'Celix',   stock: 52, dias: 47, demanda: 'media' },
];

export const acciones = [
  { vendedor: 'Carlos V.', accion: 'Llamar a María G. — crédito pre-aprobado', prioridad: 'alta' },
  { vendedor: 'Diana L.',  accion: 'Agendar prueba de manejo Nexora a Luis R.',   prioridad: 'alta' },
  { vendedor: 'Raúl S.',   accion: '5 seguimientos vencidos — contactar hoy',   prioridad: 'media' },
  { vendedor: 'Paola M.',  accion: 'Enviar cotización Kestra a Ana P.',           prioridad: 'media' },
];

export const alertas = [
  { txt: 'Santa Fe: conversión 9.7% bajo meta', tipo: 'rojo', hace: '5 min',
    detalle: 'La agencia Santa Fe acumula 88 ventas vs meta de 140 (63%). La conversión cayó a 9.7% (promedio de la red: 13.6%). Principales causas detectadas: 14 cotizaciones sin seguimiento y 3 vendedores con seguimientos vencidos.',
    accion: 'Reasignar leads de alta intención y activar copiloto comercial en la agencia.' },
  { txt: 'Kestra: stock crítico (12 días en lote)', tipo: 'amarillo', hace: '20 min',
    detalle: 'El modelo Kestra tiene solo 18 unidades con rotación de 12 días en lote y demanda alta. Al ritmo actual se agota en ~9 días, antes del próximo reabasto programado.',
    accion: 'Solicitar traspaso entre agencias o adelantar pedido a planta.' },
  { txt: 'Mensajería: 18 leads sin atender', tipo: 'amarillo', hace: '40 min',
    detalle: 'El agente IA calificó 18 leads que llevan >2h sin respuesta humana. 6 son de intención alta (score >80). Riesgo de fuga estimado: 32%.',
    accion: 'Encender intervención humana / round-robin de asesores.' },
  { txt: 'Guadalajara superó meta mensual', tipo: 'verde', hace: '1 h',
    detalle: 'Guadalajara cerró 151 ventas vs meta de 145 (104%) con 5 días aún por delante. Mejor canal: Social Ads (ROI ×4.6). Buen caso para replicar playbook.',
    accion: 'Documentar y replicar estrategia en agencias rezagadas.' },
];

export const zonas = [
  ['Norte', 'CDMX', 'Bajío', 'Occidente', 'Sureste'],
];
// heatmap dummy: intensidad 0-100 por celda
export const heatmap = [
  [82, 64, 71, 90, 45],
  [55, 88, 60, 73, 38],
  [40, 52, 95, 66, 58],
];

export const filtros = [
  'Agencia', 'Fecha', 'Vendedor', 'Modelo', 'Canal',
  'Campaña', 'Fuente del lead', 'Etapa del funnel', 'Zona', 'Tipo de venta',
];

// ── Datos extra para vistas de detalle ──────────────────────────────────────────

// factores de scoring por prospecto (0-100)
export const scoringFactores: Record<string, { presupuesto: number; urgencia: number; interacciones: number; credito: number }> = {
  'María G.': { presupuesto: 95, urgencia: 90, interacciones: 88, credito: 94 },
  'Luis R.':  { presupuesto: 80, urgencia: 85, interacciones: 78, credito: 82 },
  'Ana P.':   { presupuesto: 70, urgencia: 60, interacciones: 72, credito: 66 },
  'Jorge M.': { presupuesto: 55, urgencia: 50, interacciones: 58, credito: 53 },
  'Sofía T.': { presupuesto: 40, urgencia: 30, interacciones: 42, credito: 38 },
};

// desglose de campañas
export const campaniaDetalle = [
  { nombre: 'MAYIA Legend EV',  alcance: 920000, conv: 42, cpa: 4452, canal: 'Social Ads' },
  { nombre: 'Velox Track',   alcance: 680000, conv: 38, cpa: 5526, canal: 'Search Ads' },
  { nombre: 'Trekar Adv.',  alcance: 0,      conv: 0,  cpa: 0,    canal: 'Video Shorts' },
  { nombre: 'MAYIA Neo Sports', alcance: 640000, conv: 51, cpa: 2902, canal: 'Mensajería IA' },
];

// eficiencia de vendedores por etapa del funnel (% de paso)
export const vendedorEtapas = [
  { etapa: 'Contacto → Cita', pct: 68 },
  { etapa: 'Cita → Prueba',   pct: 54 },
  { etapa: 'Prueba → Cotiz.', pct: 47 },
  { etapa: 'Cotiz. → Crédito', pct: 38 },
  { etapa: 'Crédito → Venta', pct: 71 },
];

// embudo de conversión (mensajería → venta) y retención
export const conversionFunnel = [
  { etapa: 'Lead Chat', n: 3120 },
  { etapa: 'Contacto IA', n: 2450 },
  { etapa: 'Asignado',  n: 1890 },
  { etapa: 'Agenda',    n: 1240 },
  { etapa: 'Crédito',   n: 410 },
  { etapa: 'Venta',     n: 268 },
];

export const retencionCohorte = [
  { anio: '1er año', clientes: 980, recompra: 4 },
  { anio: '2do año', clientes: 870, recompra: 9 },
  { anio: '3er año', clientes: 760, recompra: 18 },
  { anio: '4to+ año', clientes: 612, recompra: 31 },
];
