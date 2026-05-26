// config/empresaConfig.js
// Configuración de la empresa cliente actual de la plataforma MAYIA

export const EMPRESA_CONFIG = {
  // Información básica
  nombre: 'Renault',
  nombreCompleto: 'Renault México',
  industria: 'Automotriz y Concesionarias',
  fundacion: 1899,
  pais: 'México',
  slogan: 'Passion for life',

  // Descripción corporativa
  descripcion: 'Marca automotriz líder a nivel mundial, ofreciendo vehículos de vanguardia, desde city cars eléctricos hasta SUVs premium, con un enfoque en la innovación, el diseño y la sostenibilidad.',

  // Datos operativos
  operaciones: {
    sucursales: '70+ agencias en México',
    mercados: 'México, LATAM y Global',
    empleados: '5,000+',
    lineasNegocio: [
      'Venta de vehículos nuevos (SUVs, City Cars, Eléctricos)',
      'Venta de vehículos seminuevos',
      'Servicio de mantenimiento y taller',
      'Venta de refacciones y accesorios',
      'Financiamiento automotriz (Renault Servicios Financieros)',
      'Renault Care - Acompañamiento post-venta',
      'Renault Connect - Servicios conectados y asistencia inteligente'
    ]
  },

  // Marcas del portafolio
  marcas: [
    'Renault',
    'Renault E-Tech (Vehículos Eléctricos)',
    'Renault Servicios Financieros',
    'Renault PRO+ (Vehículos Comerciales)',
    'Renault Selection (Seminuevos)',
    'Renault Care'
  ],

  // Servicios principales
  serviciosPrincipales: [
    'Venta de autos nuevos y seminuevos',
    'Pruebas de manejo (Test Drives)',
    'Mantenimiento preventivo y correctivo',
    'Venta de accesorios originales',
    'Cotización y gestión de créditos automotrices',
    'Asistencia en el camino',
    'Renault Care - Acompañamiento post-venta',
    'Renault Connect - Experiencia de usuario conectada'
  ],

  // Contactos corporativos
  contacto: {
    sitioWeb: 'https://www.renault.com.mx',
    simitel: '800 505 1515',
    whatsapp: '55 1234 5678',
    analisisClinicos: 'https://www.renault.com.mx/servicios.html',
    appEntrega: 'Renault App'
  },

  // Enfoque estratégico
  enfoqueEstrategico: [
    'Innovación tecnológica y electrificación',
    'Diseño y confort',
    'Sostenibilidad ambiental',
    'Experiencia de cliente digital y en agencia',
    'Seguridad vehicular'
  ],

  // Servicios MAYIA prioritarios (según industria automotriz)
  serviciosPrioritarios: {
    ventas: [
      'Recomendador de Vehículos',
      'WhatsApp Automatizado (Agendar Prueba de Manejo)',
      'Analytics de Ventas y Conversión',
      'Cotizador Inteligente'
    ],
    operaciones: [
      'Control de Inventario de Autos y Refacciones',
      'Análisis de Demanda por Modelo',
      'Optimización de Taller y Citas de Servicio',
      'Control de Agencias'
    ],
    rh: [
      'Reclutamiento Inteligente (Asesores de Venta, Técnicos)',
      'Evaluación de Desempeño Comercial',
      'Capacitación de personal sobre nuevos modelos'
    ],
    atencionCliente: [
      'Agentes de Atención 24/7',
      'WhatsApp Automatizado para Estatus de Reparación',
      'Chatbots especializados en post-venta'
    ],
    ti: [
      'Ciberseguridad de datos de clientes',
      'Infraestructura Cloud para concesionarias',
      'Gestión de CRM'
    ],
    administracion: [
      'Analytics de Negocios y Market Share',
      'Optimización de Procesos de Agencia',
      'Control de múltiples agencias'
    ]
  },

  // Cursos recomendados (según perfil automotriz)
  cursosRecomendados: {
    gerentes: [
      'IA para Gerentes de Agencia',
      'Analytics de Ventas',
      'Optimización de Procesos de Taller',
      'Toma de Decisiones Estratégicas'
    ],
    ventas: [
      'IA para Trabajo Inteligente en Piso de Ventas',
      'Comunicación Efectiva con Clientes',
      'Fundamentos del Prompting'
    ],
    ti: [
      'Ciberseguridad',
      'Python Fundamentos',
      'SQL Básico',
      'ML para Propensión de Compra'
    ],
    operaciones: [
      'Series Temporales (pronósticos de demanda de refacciones)',
      'Análisis Estadístico de Tiempos de Reparación',
      'Data Wrangling',
      'Tableau Visualización'
    ]
  },

  // Casos de uso específicos de IA para retail automotriz
  casosDeUsoIA: {
    inventario: 'Predecir demanda de refacciones y modelos más buscados',
    recomendacion: 'Sugerir versiones o accesorios basados en el perfil del cliente',
    atencion: 'Chatbot para agendar citas de servicio o pruebas de manejo',
    logistica: 'Optimizar la entrega de vehículos nuevos a las agencias',
    fraude: 'Detectar patrones anómalos en financiamiento',
    precios: 'Análisis competitivo de precios en tiempo real vs otras marcas'
  },

  // Servicios propios de la plataforma MAYIA activos para Renault
  serviciosMayiaActivos: {
    medikalIA: {
      nombre: 'Renault Assist',
      nombreAlternativo: 'Renault-Assist',
      tipo: 'Asistente de Productividad para Asesores',
      descripcion: 'Agente disponible 24/7 para los asesores de ventas y técnicos. Ofrece apoyo rápido sobre especificaciones de modelos, procesos de crédito y manuales de reparación mediante IA.',
      beneficios: [
        'Acceso inmediato a fichas técnicas',
        'Disponibilidad inmediata 24/7',
        'Soporte en dudas de financiamiento',
        'Ayuda rápida en diagnósticos de taller',
        'Mejora en tiempos de atención al cliente'
      ],
      audiencia: 'Asesores de venta y técnicos de servicio',
      casoDeUso: 'Asesor en piso con cliente que necesita detalles específicos del motor de Koleos',
      modulo: 'Dashboard MAYIA - columna derecha'
    },
    simiPromo: {
      nombre: 'Promo Renault',
      nombreAlternativo: 'Recomendador Renault',
      tipo: 'Recomendador inteligente de promociones e inventario',
      descripcion: 'Asistente inteligente diseñado para optimizar las ventas en agencias. Analiza inventario disponible, bonos activos y perfil del cliente para recomendar la mejor oferta.',
      beneficios: [
        'Recomendaciones de venta cruzada (accesorios, garantías)',
        'Alertas de bonos y tasas preferenciales',
        'Gestión inteligente de leads',
        'Maximiza el margen de venta',
        'Reduce inventario estancado',
        'Análisis de tendencias de color y versión'
      ],
      audiencia: 'Gerentes de ventas y asesores comerciales',
      casoDeUso: 'Recomendar una Duster equipada aprovechando tasa de 9.9% cuando el cliente duda',
      modulo: 'Dashboard MAYIA - columna izquierda'
    }
  },

  // Métricas clave del negocio
  metricasClave: [
    'Unidades nuevas vendidas',
    'Tasa de conversión de leads',
    'NPS (Satisfacción en Ventas y Servicio)',
    'Entradas al taller por mes',
    'Ticket promedio de servicio',
    'Penetración financiera (%)'
  ]
};

// Función helper para obtener información de la empresa
export function getEmpresaInfo(campo) {
  return EMPRESA_CONFIG[campo] || null;
}

// Función para generar descripción contextual
export function getDescripcionContextual() {
  const { nombreCompleto, slogan, fundacion, operaciones } = EMPRESA_CONFIG;
  
  return `${nombreCompleto} ("${slogan}") es una marca líder fundada en ${fundacion}, 
con ${operaciones.sucursales} especializadas en innovación automotriz, 
vehículos modernos y excelente servicio post-venta.`;
}

export default EMPRESA_CONFIG;