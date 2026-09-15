// config/empresaConfig.js
// Configuración de la empresa cliente actual de la plataforma MAYIA: izzi Telecomunicaciones

export const EMPRESA_CONFIG = {
  // Información básica
  nombre: 'izzi',
  nombreCompleto: 'Empresas Cablevisión, S.A.B. de C.V. (Grupo Televisa)',
  grupoEmpresarial: 'Grupo Televisa',
  directorGeneral: 'Francisco Valim',
  industria: 'Telecomunicaciones, Servicios de Internet, Telefonía y Entretenimiento',
  fundacion: 2014,
  pais: 'México',
  slogan: 'Puntos de Venta Inteligentes M2C · Powered by MAYIA & Retail Innova',

  // Descripción corporativa
  descripcion: 'Empresa mexicana de telecomunicaciones perteneciente a Grupo Televisa, líder en servicios de internet de banda ancha (HFC/FTTH), televisión interactiva (izzi tv+), telefonía fija y móvil (izzi móvil), y soluciones empresariales (izzi negocios). Opera en más de 60 ciudades principales de México, alcanzando a más de 15 millones de hogares pasados y más de 6.2 millones de suscriptores. A través de la iniciativa M2C (MAYIA + Retail Innova), transforma sus Centros de Atención izzi, módulos de centro comercial y puntos express en puntos inteligentes de atracción, asesoría y conversión.',

  // Datos operativos
  operaciones: {
    puntosVenta: '120+ Centros de Atención izzi, módulos express y corners autoservicio',
    ciudades: '60+ ciudades principales en México',
    suscriptores: '6,200,000+ (residencial, izzi móvil e izzi negocios)',
    hogaresPasados: '15+ millones',
    redHFC_FTTH: '140,000+ km de infraestructura híbrida coaxial y fibra óptica',
    lineasNegocio: [
      'izzi residencial (Internet de alta velocidad, telefonía ilimitada)',
      'izzi tv+ (Plataforma interactiva, apps integradas y control por voz)',
      'izzi móvil (Telefonía celular con datos ilimitados y roaming)',
      'izzi negocios (Soluciones de conectividad y terminales para PyMEs)',
      'Transformación M2C para Puntos de Venta Físicos'
    ]
  },

  // Marcas del portafolio
  marcas: [
    'izzi',
    'izzi tv+',
    'izzi móvil',
    'izzi negocios',
    'App izzi',
    'MAYIA Retail Innova (Puntos Inteligentes)'
  ],

  // Servicios principales
  serviciosPrincipales: [
    'Internet de alta velocidad simétrica y cable (desde 60 hasta 1,000 Mbps)',
    'Televisión interactiva izzi tv+ con ViX Premium, Disney+, Max y Netflix',
    'Telefonía móvil ilimitada con izzi móvil',
    'Telefonía fija con llamadas ilimitadas a más de 90 países',
    'Soluciones WiFi de última generación y extensores inteligentes',
    'Soluciones corporativas para PyMEs y negocios',
    'Captura consentida de leads y recomendador de paquetes en punto de venta',
    'Atención comercial y copiloto inteligente para asesores en sucursal'
  ],

  // Contactos corporativos
  contacto: {
    sitioWeb: 'https://www.izzi.mx/home/',
    atencionCliente: '800 120 5000',
    whatsapp: '55 8932 7333',
    plataforma: 'https://www.izzi.mx/mi-cuenta',
    appEntrega: 'App izzi'
  },

  // Enfoque estratégico M2C
  enfoqueEstrategico: [
    'Aceleración de ventas sobre la cobertura de red híbrida y FTTH existente',
    'Elevación del ARPU mediante convergencia con izzi tv+ e izzi móvil',
    'Medición con Computer Vision anónimo en Centros de Atención y módulos',
    'Asistencia interactiva en tótem y copiloto comercial para ejecutivos',
    'Trazabilidad omnicanal entre la visita física y la activación en la App izzi'
  ],

  // Servicios MAYIA prioritarios para izzi
  serviciosPrioritarios: {
    ventas: [
      'Asesor Inteligente izzi (Tótem/Pantalla)',
      'Copiloto del Vendedor en Cierre de Contratos',
      'Configurador Inteligente de Paquetes izzi residencial / móvil',
      'Captura y Calificación Automatizada de Leads'
    ],
    operaciones: [
      'Computer Vision Comercial (Tráfico y Permanencia)',
      'Auditoría Visual IA para Módulos y Centros de Atención',
      'Monitoreo y Salud de Sensores/Pantallas',
      'Scorecard Ejecutivo de Puntos de Venta'
    ],
    rh: [
      'Academia MAYIA para Capacitación de Asesores izzi',
      'Evaluación de Desempeño por Turno y Ubicación'
    ],
    atencionCliente: [
      'Validación Inmediata de Cobertura por Código Postal',
      'Agentes Virtuales 24/7 en App y Puntos Físicos'
    ]
  },

  // Servicios propios MAYIA activos en izzi
  serviciosMayiaActivos: {
    izziAssist: {
      nombre: 'izzi Assist',
      nombreAlternativo: 'Asistente MAYIA izzi',
      tipo: 'Asistente Virtual e Inteligencia Comercial M2C',
      descripcion: 'Agente inteligente en tiempo real para clientes y ejecutivos de izzi. Permite consultar cobertura por zona, comparar paquetes residenciales, izzi tv+ e izzi móvil, y calificar leads en tienda.',
      beneficios: [
        'Consulta instantánea de cobertura por código postal',
        'Recomendación inteligente de paquetes según presupuesto',
        'Capacitación y copiloto en tiempo real para vendedores',
        'Integración con CRM y seguimiento de instalación'
      ],
      audiencia: 'Visitantes de sucursal, prospectos y asesores comerciales',
      casoDeUso: 'Cliente en Centro de Atención izzi consultando combo con izzi tv+ y línea móvil'
    }
  },

  // Métricas clave del negocio izzi
  metricasClave: [
    'Tráfico frente al punto y Tasa de Atracción (%)',
    'Permanencia e Interacciones con Pantalla',
    'Leads Calificados por Sucursal / Módulo',
    'Tasa de Conversión Visita-Lead y Lead-Contrato',
    'ARPU Promedio por Cliente Captado',
    'Disponibilidad del Equipamiento Inteligente (%)'
  ]
};

export function getEmpresaInfo(campo) {
  return EMPRESA_CONFIG[campo] || null;
}

export function getDescripcionContextual() {
  const { nombreCompleto, slogan, operaciones } = EMPRESA_CONFIG;
  return `${nombreCompleto} ("${slogan}") opera una red nacional de ${operaciones.redHFC_FTTH} alcanzando ${operaciones.hogaresPasados} hogares pasados en ${operaciones.ciudades}. Con la solución M2C powered by MAYIA & Retail Innova, transforma sus Centros de Atención y módulos en puntos inteligentes de alta conversión.`;
}

export default EMPRESA_CONFIG;