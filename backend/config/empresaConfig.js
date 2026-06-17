// config/empresaConfig.js
// Configuración de la empresa cliente actual de la plataforma MAYIA

export const EMPRESA_CONFIG = {
  // Información básica
  nombre: 'Honda',
  nombreCompleto: 'Honda México',
  industria: 'Automotriz y Concesionarias',
  fundacion: 1948,
  pais: 'México',
  slogan: 'The Power of Dreams',

  // Descripción corporativa
  descripcion: 'Fabricante de automóviles, motocicletas y equipos de energía de renombre mundial, enfocado en crear movilidad sustentable y tecnologías avanzadas como motores híbridos e:HEV y vehículos eléctricos para cumplir los sueños de las personas.',

  // Datos operativos
  operaciones: {
    sucursales: '125+ agencias en México',
    mercados: 'México, LATAM y Global',
    empleados: '5,000+',
    lineasNegocio: [
      'Venta de vehículos nuevos (SUVs, Sedanes, Híbridos, Eléctricos)',
      'Venta de motocicletas (Trabajo, Deportivas, Scooters)',
      'Venta de vehículos seminuevos certificados',
      'Servicio de mantenimiento y taller especializado',
      'Venta de refacciones y accesorios originales',
      'Financiamiento automotriz (Honda Finance)',
      'Honda Care - Acompañamiento post-venta',
      'HondaLink - Servicios conectados y asistencia inteligente'
    ]
  },

  // Marcas del portafolio
  marcas: [
    'Honda',
    'Honda e:HEV (Vehículos Híbridos)',
    'Honda Finance',
    'Honda Motos',
    'Honda Seminuevos Certificados',
    'Honda Care'
  ],

  // Servicios principales
  serviciosPrincipales: [
    'Venta de autos nuevos y seminuevos',
    'Pruebas de manejo (Test Drives)',
    'Mantenimiento preventivo y correctivo',
    'Venta de accesorios originales',
    'Cotización y gestión de créditos automotrices',
    'Asistencia en el camino',
    'Honda Care - Acompañamiento post-venta',
    'HondaLink - Experiencia de usuario conectada'
  ],

  // Contactos corporativos
  contacto: {
    sitioWeb: 'https://www.honda.mx',
    simitel: '800 368 4663',
    whatsapp: '55 1234 5678',
    analisisClinicos: 'https://www.honda.mx/servicio.html',
    appEntrega: 'HondaLink App'
  },

  // Enfoque estratégico
  enfoqueEstrategico: [
    'Innovación tecnológica y electrificación (e:HEV y Prologue EV)',
    'Diseño, confiabilidad y durabilidad',
    'Sostenibilidad ambiental',
    'Experiencia de cliente digital y en concesionaria',
    'Seguridad vehicular (Honda Sensing)'
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

  // Servicios propios de la plataforma MAYIA activos para Honda
  serviciosMayiaActivos: {
    medikalIA: {
      nombre: 'Honda Assist',
      nombreAlternativo: 'Honda-Assist',
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
      casoDeUso: 'Asesor en piso con cliente que necesita detalles específicos del motor de CR-V',
      modulo: 'Dashboard MAYIA - columna derecha'
    },
    simiPromo: {
      nombre: 'Promo Honda',
      nombreAlternativo: 'Recomendador Honda',
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
      casoDeUso: 'Recomendar una CR-V equipada aprovechando tasa de 9.9% cuando el cliente duda',
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