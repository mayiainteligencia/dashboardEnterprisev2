// Data & types for Gas Station Inteligente
export interface ModuloGasStation {
  id: string;
  numero: number;
  titulo: string;
  subtitulo: string;
  objetivo: string;
  categoria: 'combustible' | 'seguridad_retail' | 'b2b_clientes' | 'infraestructura';
  iconoName: string;
  alertas: number;
  color: string;
  kpis: { etiqueta: string; valor: string; cambio?: string }[];
}

export const MODULOS_GAS_STATION: ModuloGasStation[] = [
  {
    id: 'tanques-telemetria',
    numero: 1,
    titulo: 'Monitoreo de Tanques y Telemetría IoT',
    subtitulo: 'Niveles 3D, Fugas IA, Bombas & Blockchain',
    objetivo: 'Control en tiempo real de niveles, fugas, flujo y calidad del combustible.',
    categoria: 'combustible',
    iconoName: 'Fuel',
    alertas: 1,
    color: '#0284C7',
    kpis: [
      { etiqueta: 'Capacidad Total', valor: '126,800 / 160,000 L', cambio: '79.2% Lleno' },
      { etiqueta: 'Flujo Bombas', valor: '38.4 L/min', cambio: '8 bombas activas' },
      { etiqueta: 'Integridad Tanques', valor: '99.98%', cambio: '0 microfugas' },
      { etiqueta: 'Bloques Blockchain', valor: '1,420 Lotes', cambio: '100% Auditado' },
    ]
  },
  {
    id: 'precios-dinamicos',
    numero: 2,
    titulo: 'Motor de Precios Dinámicos & Agentes IA',
    subtitulo: 'Margen Óptimo, Competencia en Mapa & Tótem LED',
    objetivo: 'Optimización de márgenes y automatización de decisiones comerciales en tiempo real.',
    categoria: 'combustible',
    iconoName: 'TrendingUp',
    alertas: 2,
    color: '#D97706',
    kpis: [
      { etiqueta: 'Margen Promedio', valor: '$2.85 / L', cambio: '+8.4% vs meta' },
      { etiqueta: 'Sugerencia IA', valor: '+$0.12 / L', cambio: 'Hora pico 17:00' },
      { etiqueta: 'Competidores Radar', valor: '6 estaciones', cambio: 'Radio 5 km' },
      { etiqueta: 'Decisiones Autónomas', valor: '18 hoy', cambio: 'Tótem sincronizado' },
    ]
  },
  {
    id: 'seguridad-vms',
    numero: 3,
    titulo: 'Seguridad Inteligente, VMS & Control de Pistas',
    subtitulo: 'Cámaras Edge IA, ALPR Matrículas & Anti-Fugas',
    objetivo: 'Detección de fraudes, prevención de delitos y control del tráfico vehicular en estación.',
    categoria: 'seguridad_retail',
    iconoName: 'ShieldCheck',
    alertas: 1,
    color: '#DC2626',
    kpis: [
      { etiqueta: 'Lecturas ALPR Hoy', valor: '1,240 autos', cambio: '99.4% precisión' },
      { etiqueta: 'Listas Negras Detectadas', valor: '1 intento', cambio: 'Bomba bloqueada' },
      { etiqueta: 'Tiempo Espera Pistas', valor: '2.4 min', cambio: '-35% con IA' },
      { etiqueta: 'Feeds VMS Edge', valor: '4 cámaras HD', cambio: 'Análisis en tiempo real' },
    ]
  },
  {
    id: 'cadena-suministro',
    numero: 4,
    titulo: 'Cadena de Suministro e Inventario Retail (Odoo)',
    subtitulo: 'Reabastecimiento Pipas, Estantes IoT & Tienda',
    objetivo: 'Automatización de compras de combustible y gestión de la tienda de conveniencia.',
    categoria: 'seguridad_retail',
    iconoName: 'Store',
    alertas: 0,
    color: '#7C3AED',
    kpis: [
      { etiqueta: 'Órdenes Odoo Activas', valor: '2 Pipas (60k L)', cambio: 'Llega en 45 min' },
      { etiqueta: 'Estantes IoT Tienda', valor: '94% Abastecido', cambio: 'Sensores de peso OK' },
      { etiqueta: 'Rotación Retail', valor: '4.8 días', cambio: '12 productos locales' },
      { etiqueta: 'Venta Cruzada Tienda', valor: '$342,800 MXN', cambio: '+14% con IA' },
    ]
  },
  {
    id: 'flotas-corporativas',
    numero: 5,
    titulo: 'Gestión de Clientes Corporativos y Flotas (OSS/BSS)',
    subtitulo: 'Portal B2B, Odómetro vs Litros & Riesgo Churn',
    objetivo: 'Administración B2B, telemática, facturación y retención de grandes cuentas.',
    categoria: 'b2b_clientes',
    iconoName: 'Truck',
    alertas: 1,
    color: '#0F172A',
    kpis: [
      { etiqueta: 'Cuentas Flotas B2B', valor: '28 Empresas', cambio: '340 vehículos activos' },
      { etiqueta: 'Consumo B2B Mes', valor: '$4.82 M MXN', cambio: 'Facturación Odoo CFDI' },
      { etiqueta: 'Validación Odómetro', valor: '99.1% Conforme', cambio: 'Telemática GPS' },
      { etiqueta: 'Riesgo Churn Alto', valor: '1 cuenta', cambio: 'Alerta de retención' },
    ]
  },
  {
    id: 'fidelizacion-pagos',
    numero: 6,
    titulo: 'Experiencia del Cliente, Fidelización y Pagos Digitales',
    subtitulo: 'App Móvil, ALPR Pay, Just Walk Out & Lockers',
    objetivo: 'Monitoreo de lealtad, canales de venta y métodos de pago sin fricción.',
    categoria: 'b2b_clientes',
    iconoName: 'CreditCard',
    alertas: 0,
    color: '#EC4899',
    kpis: [
      { etiqueta: 'Usuarios App Móvil', valor: '18,450 usuarios', cambio: '+420 esta semana' },
      { etiqueta: 'Pagos Sin Fricción', valor: '62.4%', cambio: 'ALPR / App / In-Car' },
      { etiqueta: 'Ocupación Lockers', valor: '82%', cambio: 'Click & Collect activo' },
      { etiqueta: 'Conserje por Voz', valor: '98.6% Satisfacción', cambio: 'Asistencia en isla' },
    ]
  },
  {
    id: 'hub-energia',
    numero: 7,
    titulo: 'Hub de Energía, Sostenibilidad y Electromovilidad',
    subtitulo: 'Marquesinas Solares, Cargadores EV & Baños IoT',
    objetivo: 'Maximizar la eficiencia energética, gestionar cargadores EV y monitorear la huella ecológica.',
    categoria: 'infraestructura',
    iconoName: 'Zap',
    alertas: 0,
    color: '#10B981',
    kpis: [
      { etiqueta: 'Generación Solar', valor: '48.5 kW/h', cambio: '72% autoconsumo' },
      { etiqueta: 'Baterías BESS', valor: '85% (102 kWh)', cambio: 'Respaldo activo' },
      { etiqueta: 'Postes Carga EV', valor: '3 / 4 Ocupados', cambio: '180 kW suministrados' },
      { etiqueta: 'Baños Inteligentes', valor: 'Higiénico 100%', cambio: 'Sensores reposición' },
    ]
  },
  {
    id: 'mantenimiento-sdi',
    numero: 8,
    titulo: 'Mantenimiento Predictivo, SDI y Gemelos Digitales',
    subtitulo: 'Visor 3D Estación, RUL de Bombas & Nodos Edge',
    objetivo: 'Garantizar la continuidad operativa y monitoreo de infraestructura de TI/Hardware.',
    categoria: 'infraestructura',
    iconoName: 'Cpu',
    alertas: 1,
    color: '#2563EB',
    kpis: [
      { etiqueta: 'Salud de Estación', valor: '98.2 / 100', cambio: 'Gemelo Digital 3D' },
      { etiqueta: 'Vibración Turbinas', valor: '1.2 mm/s', cambio: 'Dentro de rango normal' },
      { etiqueta: 'Latencia Edge SDI', valor: '2.8 ms', cambio: '2 Nodos sincronizados' },
      { etiqueta: 'Túneles VPN Core', valor: '100% Up', cambio: 'Enlace Fibra + 5G' },
    ]
  }
];

// ── Datos detallados por Módulo ──

// 1. Tanques y Telemetría
export const TANQUES_DATA = [
  {
    id: 'TK-01',
    tipo: 'Magna 87 Octanos',
    color: '#059669',
    capacidadTotal: 50000,
    volumenActual: 38400,
    porcentaje: 76.8,
    temperatura: 21.4,
    presion: 2.3,
    aguaLibre: 0.0,
    densidad: 735.2,
    estado: 'ÓPTIMO',
    diasAutonomia: 3.8,
    consumoPromedioHora: 420,
    fugaIntersticial: 'NORMAL'
  },
  {
    id: 'TK-02',
    tipo: 'Premium 91 Octanos',
    color: '#DC2626',
    capacidadTotal: 40000,
    volumenActual: 29800,
    porcentaje: 74.5,
    temperatura: 21.8,
    presion: 2.1,
    aguaLibre: 0.0,
    densidad: 752.4,
    estado: 'ÓPTIMO',
    diasAutonomia: 4.2,
    consumoPromedioHora: 290,
    fugaIntersticial: 'NORMAL'
  },
  {
    id: 'TK-03',
    tipo: 'Diésel Ultra Bajo Azufre',
    color: '#1E293B',
    capacidadTotal: 50000,
    volumenActual: 42100,
    porcentaje: 84.2,
    temperatura: 20.9,
    presion: 2.4,
    aguaLibre: 0.0,
    densidad: 832.0,
    estado: 'ÓPTIMO',
    diasAutonomia: 5.1,
    consumoPromedioHora: 340,
    fugaIntersticial: 'NORMAL'
  },
  {
    id: 'TK-04',
    tipo: 'GNR Gas Natural Renovable',
    color: '#0284C7',
    capacidadTotal: 20000,
    volumenActual: 16500,
    porcentaje: 82.5,
    temperatura: 19.5,
    presion: 18.5, // bar
    aguaLibre: 0.0,
    densidad: 0.72,
    estado: 'ÓPTIMO',
    diasAutonomia: 6.0,
    consumoPromedioHora: 110,
    fugaIntersticial: 'NORMAL'
  }
];

export const BOMBAS_DATA = [
  { id: 'BOMBA-01', isla: 'Isla 1', combustible: 'Magna / Premium', flujo: 38.5, estado: 'DESPACHANDO', manguera: 'Activa (H1)', dispersion: '+2 mL / 20L', vehiculo: 'Nissan Versa (ABC-123)' },
  { id: 'BOMBA-02', isla: 'Isla 1', combustible: 'Magna / Premium', flujo: 0.0, estado: 'DISPONIBLE', manguera: 'En reposo', dispersion: '-1 mL / 20L', vehiculo: 'En espera' },
  { id: 'BOMBA-03', isla: 'Isla 2', combustible: 'Magna / Premium', flujo: 41.2, estado: 'DESPACHANDO', manguera: 'Activa (H2)', dispersion: '+3 mL / 20L', vehiculo: 'VW Jetta (JKL-789)' },
  { id: 'BOMBA-04', isla: 'Isla 2', combustible: 'Magna / Premium', flujo: 39.0, estado: 'DESPACHANDO', manguera: 'Activa (H1)', dispersion: '0 mL / 20L', vehiculo: 'Toyota RAV4 (XYZ-456)' },
  { id: 'BOMBA-05', isla: 'Isla 3 (Diésel)', combustible: 'Diésel UBA', flujo: 58.4, estado: 'DESPACHANDO', manguera: 'Alto flujo (H3)', dispersion: '+4 mL / 20L', vehiculo: 'Kenworth T680 (Castores)' },
  { id: 'BOMBA-06', isla: 'Isla 3 (Diésel)', combustible: 'Diésel UBA', flujo: 0.0, estado: 'DISPONIBLE', manguera: 'En reposo', dispersion: '+1 mL / 20L', vehiculo: 'En espera' },
  { id: 'BOMBA-07', isla: 'Isla 4 (GNR / Mixta)', combustible: 'GNR / Magna', flujo: 34.8, estado: 'DESPACHANDO', manguera: 'Activa (H4)', dispersion: '0 mL / 20L', vehiculo: 'Autobús Urbano GNR' },
  { id: 'BOMBA-08', isla: 'Isla 4 (GNR / Mixta)', combustible: 'Magna / Premium', flujo: 0.0, estado: 'BLOQUEADA_IA', manguera: 'Bloqueada por ALPR', dispersion: '0 mL / 20L', vehiculo: 'Auto Lista Negra' },
];

export const BLOCKCHAIN_LOTES = [
  { id: 'BLK-90821', fecha: 'Hoy 05:30', origen: 'Refinería Tula', pipa: 'Pipa #108 (Castores)', volumen: '40,000 L Magna', hash: '0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1f', status: 'Verificado' },
  { id: 'BLK-90820', fecha: 'Ayer 14:15', origen: 'Terminal Tuxpan', pipa: 'Pipa #042 (Logística Pemex)', volumen: '40,000 L Diésel', hash: '0x9a3b8218e77c44e99f0183ca893b8218e77c44e9', status: 'Verificado' },
  { id: 'BLK-90819', fecha: 'Ayer 08:40', origen: 'Refinería Salina Cruz', pipa: 'Pipa #077 (TransFuel)', volumen: '30,000 L Premium', hash: '0x1c83fa99023bd77b1029cfa11c83fa99023bd77b', status: 'Verificado' },
];

// 2. Precios Dinámicos
export const PRECIOS_ACTUALES = [
  { tipo: 'Magna 87', actual: 23.89, sugeridoIA: 24.05, costoBase: 21.10, margen: 2.79, competenciaProm: 24.18, variacion: '+0.16' },
  { tipo: 'Premium 91', actual: 25.99, sugeridoIA: 26.15, costoBase: 22.80, margen: 3.19, competenciaProm: 26.32, variacion: '+0.16' },
  { tipo: 'Diésel UBA', actual: 25.40, sugeridoIA: 25.40, costoBase: 22.65, margen: 2.75, competenciaProm: 25.68, variacion: '0.00' },
  { tipo: 'GNR BioGas', actual: 14.50, sugeridoIA: 14.50, costoBase: 11.20, margen: 3.30, competenciaProm: 15.20, variacion: '0.00' },
];

export const COMPETENCIA_MAPA = [
  { nombre: 'Gas Station Inteligente (Nuestra)', distancia: '0.0 km', magna: 23.89, premium: 25.99, diesel: 25.40, margen: 'Óptimo', lider: true },
  { nombre: 'Estación Shell Circuito', distancia: '1.2 km', magna: 24.25, premium: 26.45, diesel: 25.80, margen: 'Alto', lider: false },
  { nombre: 'BP Avenida Central', distancia: '2.1 km', magna: 24.15, premium: 26.30, diesel: 25.75, margen: 'Medio', lider: false },
  { nombre: 'Pemex Servicio Estrella', distancia: '2.8 km', magna: 23.95, premium: 26.10, diesel: 25.55, margen: 'Bajo', lider: false },
  { nombre: 'Mobil Periférico Sur', distancia: '3.9 km', magna: 24.30, premium: 26.50, diesel: 25.90, margen: 'Alto', lider: false },
  { nombre: 'G500 Eje Poniente', distancia: '4.7 km', magna: 24.10, premium: 26.20, diesel: 25.60, margen: 'Medio', lider: false },
];

export const DECISIONES_AGENTICAS = [
  { hora: '16:45', agente: 'Agente Pricing IA', accion: 'Ajuste recomendado en Tótem LED (+12¢ Magna)', motivo: 'Aumento de 28% en flujo vehicular por hora pico', estado: 'Ejecutado' },
  { hora: '14:20', agente: 'Agente Compras Auto', accion: 'Generación de PO-2026-0894 a Terminal Tuxpan', motivo: 'Stock de Diésel proyectado al 35% en 18 horas', estado: 'Aprobado Odoo' },
  { hora: '11:15', agente: 'Agente Mantenimiento', accion: 'Calibración preventiva programada Bomba #5', motivo: 'Dispersión detectada de +4mL en dispensado alto', estado: 'Programado 22:00' },
  { hora: '09:30', agente: 'Agente Seguridad Edge', accion: 'Bloqueo automático de Bomba #8', motivo: 'Matrícula detectada en Lista Negra de farderos/fuga previa', estado: 'Bloqueo Activo' },
];

// 3. Seguridad VMS y ALPR
export const VMS_FEEDS = [
  { id: 'CAM-01', nombre: 'Carriles Entrada Principal', estado: 'EN LÍNEA', fps: 30, iaTag: 'ALPR Activo · Detección de velocidad 14 km/h' },
  { id: 'CAM-02', nombre: 'Isla Central Bombas 1-4', estado: 'EN LÍNEA', fps: 30, iaTag: 'IA Merodeo: 0 alertas · Detección de celular: Normal' },
  { id: 'CAM-03', nombre: 'Isla Diésel Bombas 5-8', estado: 'EN LÍNEA', fps: 30, iaTag: 'IA Derrame: 0% · Sensor de vapor: 0.0 ppm' },
  { id: 'CAM-04', nombre: 'Tienda Retail & Estacionamiento', estado: 'EN LÍNEA', fps: 30, iaTag: 'Aforo: 8 personas · Just Walk Out Operativo' },
];

export const ALPR_REGISTROS = [
  { matricula: 'NXX-9481', hora: '17:02', tipo: 'Mazda CX-5 (Blanco)', cliente: 'Frecuente Oro · ALPR Pay', estado: 'AUTORIZADO', accion: 'Despacho habilitado Bomba 3' },
  { matricula: 'CAS-4421', hora: '16:58', tipo: 'Kenworth T680 (Castores)', cliente: 'Corporativo Flota Castores', estado: 'B2B CONFORME', accion: 'Carga Diésel 350L Bomba 5' },
  { matricula: 'UBR-7729', hora: '16:51', tipo: 'Chevrolet Onix', cliente: 'Flota App Conductor', estado: 'AUTORIZADO', accion: 'Despacho Bomba 1' },
  { matricula: 'XYZ-6660', hora: '16:44', tipo: 'Dodge Neon (Gris)', cliente: 'ALERTA: Fuga sin pagar (24/Jul)', estado: 'LISTA NEGRA', accion: 'BOMBA 8 BLOQUEADA INMEDIATAMENTE' },
  { matricula: 'PJK-1102', hora: '16:39', tipo: 'Ford F-150', cliente: 'Cliente Particular', estado: 'AUTORIZADO', accion: 'Despacho Bomba 4' },
];

// 4. Cadena de Suministro Odoo
export const ORDENES_ODOO = [
  { id: 'PO-2026-0894', fecha: 'Hoy 14:20', proveedor: 'Terminal Tuxpan Almacenamiento', producto: 'Diésel UBA', volumen: '40,000 L', total: '$906,000 MXN', estado: 'EN TRÁNSITO', eta: '45 min' },
  { id: 'PO-2026-0893', fecha: 'Ayer 18:00', proveedor: 'Refinería Tula', producto: 'Magna 87', volumen: '40,000 L', total: '$844,000 MXN', estado: 'ENTREGADO', eta: 'Completado' },
  { id: 'PO-2026-0891', fecha: '28/Ago', proveedor: 'Distribuidora Retail Oxxo/7-Eleven', producto: 'Bebidas & Snacks', volumen: '420 unidades', total: '$38,400 MXN', estado: 'EN TIENDA', eta: 'Inventariado' },
];

export const ESTANTES_IOT = [
  { seccion: 'Refrigeradores Bebidas Frías', capacidad: 100, ocupacion: 88, sensorPeso: 'OK (340 kg)', prediccionQuiebre: 'Normal (>48h)', reposicionAuto: 'En espera' },
  { seccion: 'Góndola Snacks & Botanas', capacidad: 100, ocupacion: 92, sensorPeso: 'OK (120 kg)', prediccionQuiebre: 'Normal (>72h)', reposicionAuto: 'En espera' },
  { seccion: 'Lubricantes & Aditivos Motor', capacidad: 100, ocupacion: 68, sensorPeso: 'Alerta (42 kg)', prediccionQuiebre: 'Reponer en 12h (Alta rotación fin de semana)', reposicionAuto: 'PO Generada' },
  { seccion: 'Cafetería & Panadería Express', capacidad: 100, ocupacion: 95, sensorPeso: 'OK', prediccionQuiebre: 'Normal', reposicionAuto: 'En espera' },
];

// 5. Flotas Corporativas
export const FLOTAS_B2B = [
  { empresa: 'Transportes Castores S.A.', unidades: 48, consumoMes: '$1,820,000 MXN', litrosMes: '71,650 L', saldoCredito: '$840,000 MXN', churnRisk: 'Bajo (4%)', odometroSync: '99.4%' },
  { empresa: 'DHL Express México', unidades: 32, consumoMes: '$1,140,000 MXN', litrosMes: '45,200 L', saldoCredito: '$520,000 MXN', churnRisk: 'Bajo (2%)', odometroSync: '98.9%' },
  { empresa: 'Bimbo Distribución Centro', unidades: 26, consumoMes: '$940,000 MXN', litrosMes: '39,300 L', saldoCredito: '$410,000 MXN', churnRisk: 'Bajo (5%)', odometroSync: '99.8%' },
  { empresa: 'Logística Flecha Amarilla', unidades: 14, consumoMes: '$480,000 MXN', litrosMes: '18,800 L', saldoCredito: '$190,000 MXN', churnRisk: 'ALTO (78%) - Consumo cayó 40%', odometroSync: '96.2%' },
  { empresa: 'Patrullas Seguridad Municipal', unidades: 20, consumoMes: '$440,000 MXN', litrosMes: '18,400 L', saldoCredito: 'Prepago $150k', churnRisk: 'Bajo (1%)', odometroSync: '100%' },
];

// 6. Fidelización y Pagos
export const METRICAS_PAGOS = [
  { metodo: 'ALPR Pay / App Móvil', porcentaje: 44, monto: '$498,000 MXN', color: '#059669' },
  { metodo: 'Tarjeta Crédito / Débito', porcentaje: 32, monto: '$360,000 MXN', color: '#0284C7' },
  { metodo: 'Efectivo en Pista', porcentaje: 14, monto: '$158,000 MXN', color: '#D97706' },
  { metodo: 'In-Car Pay / Just Walk Out', porcentaje: 10, monto: '$108,500 MXN', color: '#EC4899' },
];

// 7. Hub de Energía & EV
export const EV_CHARGERS = [
  { id: 'EV-01 (Ultra 350kW)', conector: 'CCS2 High-Power', estado: 'OCUPADO (82%)', potencia: '240 kW', tiempoSesion: '18 min', vehiculo: 'Porsche Taycan', entregaKWh: '54.2 kWh' },
  { id: 'EV-02 (Ultra 350kW)', conector: 'CCS2 High-Power', estado: 'OCUPADO (45%)', potencia: '180 kW', tiempoSesion: '12 min', vehiculo: 'BMW i4 M50', entregaKWh: '31.0 kWh' },
  { id: 'EV-03 (Fast 150kW)', conector: 'NACS / Tesla', estado: 'OCUPADO (90%)', potencia: '120 kW', tiempoSesion: '24 min', vehiculo: 'Tesla Model Y', entregaKWh: '44.8 kWh' },
  { id: 'EV-04 (Fast 150kW)', conector: 'NACS / Tesla', estado: 'DISPONIBLE', potencia: '0 kW', tiempoSesion: '--', vehiculo: 'Listo para conectar', entregaKWh: '0 kWh' },
];

export const BALANCE_ENERGETICO = [
  { hora: '08:00', solar: 18.2, bateria: 10.0, red: 12.4, demanda: 40.6 },
  { hora: '10:00', solar: 38.5, bateria: 0.0, red: 8.2, demanda: 46.7 },
  { hora: '12:00', solar: 54.0, bateria: -15.0, red: 4.1, demanda: 43.1 }, // bateria carga
  { hora: '14:00', solar: 58.2, bateria: -20.0, red: 3.5, demanda: 41.7 },
  { hora: '16:00', solar: 42.0, bateria: 0.0, red: 9.8, demanda: 51.8 },
  { hora: '18:00', solar: 14.5, bateria: 25.0, red: 18.2, demanda: 57.7 },
  { hora: '20:00', solar: 0.0, bateria: 35.0, red: 22.4, demanda: 57.4 },
];

// 8. Mantenimiento y SDI
export const EQUIPOS_SALUD = [
  { equipo: 'Dispensario Bomba #1-2 (Wayne Helix)', salud: 98, vibracion: '0.8 mm/s', proximoMto: 'En 68 días', criticidad: 'Baja' },
  { equipo: 'Dispensario Bomba #3-4 (Gilbarco Encore)', salud: 95, vibracion: '1.1 mm/s', proximoMto: 'En 45 días', criticidad: 'Baja' },
  { equipo: 'Dispensario Diésel #5-6 (Alto Flujo)', salud: 88, vibracion: '1.9 mm/s', proximoMto: 'En 12 días (Calibrar +4mL)', criticidad: 'Media' },
  { equipo: 'Tótem Principal LED de Precios', salud: 100, vibracion: 'Normal', proximoMto: 'En 120 días', criticidad: 'Baja' },
  { equipo: 'Brazo Robótico Repostaje Autónomo', salud: 96, vibracion: '0.4 mm/s', proximoMto: 'En 90 días', criticidad: 'Baja' },
  { equipo: 'Nodo Edge SDI Servidor Principal', salud: 100, vibracion: 'Temp 38°C', proximoMto: 'En 180 días', criticidad: 'Baja' },
];

export const SDI_NODOS = [
  { nodo: 'EDGE-STATION-01 (Master)', cpu: '22%', ram: '34%', latencia: '2.4 ms', enlace: 'Fibra Óptica Primaria (1 Gbps)', estado: 'ACTIVO' },
  { nodo: 'EDGE-STATION-02 (Backup)', cpu: '14%', ram: '28%', latencia: '3.1 ms', enlace: 'Backup 5G Redundante (350 Mbps)', estado: 'STANDBY LISTO' },
  { nodo: 'VPN-CORE-CORPORATIVO', cpu: 'N/A', ram: 'N/A', latencia: '12.8 ms', enlace: 'Túnel IPsec AES-256 Sede Central', estado: 'CONECTADO' },
];
