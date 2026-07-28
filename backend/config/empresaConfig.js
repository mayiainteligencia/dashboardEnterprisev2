// config/empresaConfig.js
// Configuración de la empresa cliente actual de la plataforma MAYIA

export const EMPRESA_CONFIG = {
  // Información básica
  nombre: 'Besco',
  nombreCompleto: 'Besco México',
  industria: 'Gestión de Flotillas, Instalaciones y Compras Empresariales',
  fundacion: 2005,
  pais: 'México',
  slogan: 'Operaciones que mueven tu empresa',

  // Descripción corporativa
  descripcion: 'Empresa mexicana especializada en la gestión integral de flotillas vehiculares, administración de inmuebles y procesos de compras corporativas. Besco opera más de 400 unidades vehiculares, 7,000 inmuebles y 35 oficinas a nivel nacional, apoyada en tecnología e inteligencia artificial para optimizar la operación empresarial.',

  // Datos operativos
  operaciones: {
    sucursales: '35 oficinas en México',
    mercados: 'México y LATAM',
    empleados: '2,500+',
    lineasNegocio: [
      'Gestión integral de flotillas vehiculares (400+ unidades)',
      'Administración de inmuebles y facilities (7,000 inmuebles)',
      'Procesos de compras corporativas y abastecimiento',
      'Mantenimiento preventivo y correctivo de unidades',
      'Optimización de rutas y logística de última milla',
      'Control de presupuesto y gasto operativo',
      'Gestión de pólizas y documentación vehicular',
      'Auditoría visual y validación de evidencias'
    ]
  },

  // Marcas del portafolio
  marcas: [
    'Besco',
    'Besco Fleet (Gestión de Flotillas)',
    'Besco Facilities (Inmuebles)',
    'Besco Compras (Abastecimiento)',
    'Besco Analytics'
  ],

  // Servicios principales
  serviciosPrincipales: [
    'Gestión y seguimiento de flotillas en tiempo real',
    'Optimización inteligente de rutas con IA',
    'Mantenimiento predictivo vehicular',
    'Administración de inmuebles y espacios',
    'Control de requisiciones y órdenes de compra',
    'Auditoría de pólizas y documentos',
    'Reportes de gasto operativo y presupuesto',
    'Atención a incidentes y escalamientos 24/7'
  ],

  // Contactos corporativos
  contacto: {
    sitioWeb: 'https://www.besco.mx',
    simitel: '800 000 0000',
    whatsapp: '55 0000 0000',
    plataforma: 'https://app.besco.mx',
    appEntrega: 'Besco App'
  },

  // Enfoque estratégico
  enfoqueEstrategico: [
    'Automatización de procesos operativos con IA',
    'Visibilidad total de la flota y activos en tiempo real',
    'Reducción de costos mediante análisis predictivo',
    'Cumplimiento de SLA y mejora continua',
    'Seguridad de conductores y activos vehiculares'
  ],

  // Servicios MAYIA prioritarios (según operaciones de flotillas y compras)
  serviciosPrioritarios: {
    ventas: [
      'Recomendador de Servicios',
      'WhatsApp Automatizado (Reportes y Escalamientos)',
      'Analytics de Operaciones',
      'Cotizador Inteligente de Compras'
    ],
    operaciones: [
      'Control de Flotillas y Unidades',
      'Análisis de Demanda de Refacciones',
      'Optimización de Rutas y SLA',
      'Control de Inmuebles y Facilities'
    ],
    rh: [
      'Reclutamiento Inteligente (Operadores, Supervisores)',
      'Evaluación de Desempeño Operativo',
      'Capacitación en procesos de flotillas y compras'
    ],
    atencionCliente: [
      'Agentes de Atención 24/7',
      'WhatsApp Automatizado para Estatus de Tickets',
      'Chatbots especializados en soporte operativo'
    ],
    ti: [
      'Ciberseguridad de datos operativos',
      'Infraestructura Cloud para oficinas',
      'Gestión de CRM y plataformas'
    ],
    administracion: [
      'Analytics de Negocios y Eficiencia',
      'Optimización de Procesos de Compras',
      'Control de múltiples oficinas y regiones'
    ]
  },

  // Cursos recomendados (según perfil de operaciones y compras)
  cursosRecomendados: {
    gerentes: [
      'IA para Gerentes de Operaciones',
      'Analytics de Flotillas',
      'Optimización de Procesos de Compras',
      'Toma de Decisiones Estratégicas'
    ],
    ventas: [
      'IA para Trabajo Inteligente en Operaciones',
      'Comunicación Efectiva con Clientes',
      'Fundamentos del Prompting'
    ],
    ti: [
      'Ciberseguridad',
      'Python Fundamentos',
      'SQL Básico',
      'ML para Predicción de Demanda'
    ],
    operaciones: [
      'Series Temporales (pronósticos de demanda de refacciones)',
      'Análisis Estadístico de Tiempos de Mantenimiento',
      'Data Wrangling',
      'Tableau Visualización'
    ]
  },

  // Casos de uso específicos de IA para flotillas y compras
  casosDeUsoIA: {
    inventario: 'Predecir demanda de refacciones y piezas por tipo de unidad',
    recomendacion: 'Sugerir rutas óptimas basadas en carga, tráfico y SLA',
    atencion: 'Chatbot para reportar incidentes o solicitar mantenimiento',
    logistica: 'Optimizar la distribución de unidades por región',
    fraude: 'Detectar patrones anómalos en gasto de combustible y viáticos',
    precios: 'Análisis competitivo de proveedores en tiempo real'
  },

  // Servicios propios de la plataforma MAYIA activos para Besco
  serviciosMayiaActivos: {
    medikalIA: {
      nombre: 'Besco Assist',
      nombreAlternativo: 'Besco-Assist',
      tipo: 'Asistente de Productividad para Operaciones',
      descripcion: 'Agente disponible 24/7 para los operadores, supervisores y compradores. Ofrece apoyo rápido sobre estatus de unidades, procesos de compra y manuales operativos mediante IA.',
      beneficios: [
        'Acceso inmediato a fichas técnicas de unidades',
        'Disponibilidad inmediata 24/7',
        'Soporte en dudas de abastecimiento',
        'Ayuda rápida en diagnósticos de flotilla',
        'Mejora en tiempos de atención a incidentes'
      ],
      audiencia: 'Operadores, supervisores y compradores',
      casoDeUso: 'Supervisor en campo que necesita detalles específicos del mantenimiento de una unidad',
      modulo: 'Dashboard MAYIA - columna derecha'
    },
    simiPromo: {
      nombre: 'Promo Besco',
      nombreAlternativo: 'Recomendador Besco',
      tipo: 'Recomendador inteligente de proveedores y compras',
      descripcion: 'Asistente inteligente diseñado para optimizar las compras corporativas. Analiza proveedores disponibles, presupuesto activo y perfil de requerimiento para recomendar la mejor opción.',
      beneficios: [
        'Recomendaciones de compra con mayor ahorro',
        'Alertas de presupuesto y vencimientos',
        'Gestión inteligente de requisiciones',
        'Maximiza el ahorro por compra',
        'Reduce tiempo de abastecimiento',
        'Análisis de tendencias de precios y proveedores'
      ],
      audiencia: 'Gerentes de compras y compradores corporativos',
      casoDeUso: 'Recomendar proveedor con mejor precio y tiempo de entrega para una requisición urgente',
      modulo: 'Dashboard MAYIA - columna izquierda'
    }
  },

  // Métricas clave del negocio
  metricasClave: [
    'Unidades activas en flota',
    'Cumplimiento de SLA (%)',
    'Ahorro en compras corporativas',
    'Tiempo promedio de mantenimiento',
    'Tickets resueltos en tiempo',
    'Gasto operativo vs. presupuesto'
  ]
};

// Función helper para obtener información de la empresa
export function getEmpresaInfo(campo) {
  return EMPRESA_CONFIG[campo] || null;
}

// Función para generar descripción contextual
export function getDescripcionContextual() {
  const { nombreCompleto, slogan, fundacion, operaciones } = EMPRESA_CONFIG;
  
  return `${nombreCompleto} ("${slogan}") es una empresa líder fundada en ${fundacion}, 
con ${operaciones.sucursales} especializadas en gestión de flotillas, 
inmuebles y compras corporativas con tecnología de vanguardia.`;
}

export default EMPRESA_CONFIG;