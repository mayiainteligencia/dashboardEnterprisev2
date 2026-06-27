// config/empresaConfig.js
// Configuración de la empresa cliente actual de la plataforma MAYIA

export const EMPRESA_CONFIG = {
  // Información básica
  nombre: 'Pharbiois',
  nombreCompleto: 'Pharbiois BioPharma',
  industria: 'Biofarmacéutica, Bioinformática & Drug Discovery',
  fundacion: 2018,
  pais: 'México',
  slogan: 'AI Drug Discovery as a Service',
  sitioWeb: 'https://www.pharbiois.com',

  // Descripción corporativa
  descripcion: 'Pharbiois es una empresa mexicana especializada en bioinformática, diseño de moléculas asistido por IA, evaluación ADMET in silico, cumplimiento regulatorio (COFEPRIS, ICH), redacción de patentes y academia científica. Combinan ciencia computacional avanzada con capacitación especializada para acelerar el descubrimiento farmacéutico.',

  // Datos operativos
  operaciones: {
    proyectosActivos: '12 proyectos I+D activos',
    moleculasEnPipeline: '47 moléculas en evaluación',
    mercados: 'México, LATAM, Global',
    empleados: '50-100',
    lineasNegocio: [
      'Drug Discovery as a Service (in silico)',
      'Diseño y optimización de moléculas con IA',
      'Evaluación ADMET / Toxicoinformática',
      'Cumplimiento regulatorio (COFEPRIS, ICH M7/M12/Q3)',
      'Redacción y gestión de patentes',
      'Academia científica: cursos y diplomados especializados',
      'Simulaciones moleculares y docking',
      'Edición científica y reportes técnicos',
    ]
  },

  // Servicios principales
  serviciosPrincipales: [
    'Diseño de moléculas validadas por IA',
    'Evaluación ADMET in silico (toxicidad, farmacocinética)',
    'Análisis QSAR/QSPR',
    'Docking molecular y dinámica molecular',
    'Simulaciones computacionales',
    'Cumplimiento ICH M7, M12, Q3 y COFEPRIS',
    'Análisis de nitrosaminas e impurezas',
    'Redacción y estrategia de patentes',
    'Cursos de Drug Discovery, Bioinformática y Toxicología',
    'Diplomados técnicos para equipos I+D',
    'Reportes científicos y regulatorios',
    'Drug Repurposing Intelligence',
  ],

  // Clientes objetivo
  clientesObjetivo: [
    'Laboratorios farmacéuticos mexicanos',
    'Empresas biotecnológicas (Biotech)',
    'Industria cosmética y nutraceútica',
    'Sector agroquímico',
    'Universidades y centros de investigación',
    'Equipos regulatorios y de calidad',
    'Farmacéuticas con productos en registro COFEPRIS',
  ],

  // Métricas clave del negocio
  metricasClave: [
    'Moléculas en pipeline activo',
    'Proyectos I+D simultáneos',
    'Alumnos activos en academia',
    'Cursos vendidos por mes',
    'Leads B2B en pipeline comercial',
    'Patentes activas y en proceso',
    'Tiempo promedio de generación de reportes',
    'Score ADMET promedio de moléculas candidatas',
  ],

  // Módulos de la plataforma MAYIA para Pharbiois
  modulosDashboard: {
    pipeline: {
      nombre: 'Drug Discovery Pipeline',
      descripcion: 'Visualización de moléculas candidatas, estados de evaluación (Diseño → Síntesis → ADMET → Preclínico → Candidato → Patentado), scores ADMET/QSAR y proyectos I+D activos.',
      prioridad: 'Alto',
      icono: 'Atom',
    },
    reportes: {
      nombre: 'Scientific Report Copilot',
      descripcion: 'Generación automática de reportes ejecutivos y técnicos para clientes: resumen, metodología, resultados, riesgos, conclusiones, recomendaciones y anexos técnicos.',
      prioridad: 'Alto',
      icono: 'FileText',
    },
    academia: {
      nombre: 'AI Learning Copilot / Academia Inteligente',
      descripcion: 'Catálogo de cursos científicos (ADMET, Drug Discovery, Quimioinformática, ICH, Toxicología), progreso de alumnos, recomendaciones y KPIs de conversión.',
      prioridad: 'Alto',
      icono: 'BookOpen',
    },
    prospeccion: {
      nombre: 'Prospección Pharma/Biotech',
      descripcion: 'Pipeline comercial B2B: laboratorios, farmacéuticas y biotech como prospectos. Lead scoring científico, oportunidades activas y mapa de clientes.',
      prioridad: 'Alto',
      icono: 'Users',
    },
    patentes: {
      nombre: 'Patent & IP Intelligence Agent',
      descripcion: 'Gestión de patentes activas y en proceso, detector de novedad, timeline por molécula, estado de propiedad intelectual y alertas de vencimiento.',
      prioridad: 'Medio-Alto',
      icono: 'Shield',
    },
    regulatorio: {
      nombre: 'Regulatory Intelligence Agent',
      descripcion: 'Monitor de cumplimiento ICH M7/M12/Q3, COFEPRIS, nitrosaminas e impurezas. Checklist regulatorio por molécula, alertas de riesgo toxicológico y agente regulatorio IA.',
      prioridad: 'Medio-Alto',
      icono: 'AlertTriangle',
    },
  },

  // Contexto para el agente MAYIA
  contextoPharbiois: {
    diferenciadores: [
      'Único en México combinando ciencia computacional + academia + consultoría regulatoria',
      'Capacidad de IA para diseño de moléculas desde cero',
      'Expertos en normativas COFEPRIS e ICH',
      'Academia con comunidad científica activa',
      'Equipo con publicaciones y patentes propias',
    ],
    retos: [
      'Pipeline de moléculas no visible como activo comercial',
      'Entregables científicos requieren mucho trabajo manual',
      'Oportunidad de diferenciarse como plataforma, no solo cursos',
      'Gestión de propiedad intelectual y trazabilidad',
      'Escalabilidad de servicios especializados',
    ],
    oportunidadMAYIA: 'MAYIA puede ayudar a Pharbiois a convertir su operación científica en una plataforma inteligente escalable: de cursos a academia inteligente, de servicios a productos escalables, de proyectos aislados a pipeline molecular visible, de reportes manuales a agentes científicos IA, y de consultoría especializada a AI Drug Discovery as a Service.',
  },

  // Contacto
  contacto: {
    sitioWeb: 'https://www.pharbiois.com',
    ubicacion: 'México',
    email: 'contacto@pharbiois.com',
  },
};

// Función helper
export function getEmpresaInfo(campo) {
  return EMPRESA_CONFIG[campo] || null;
}

// Descripción contextual para Gemini
export function getDescripcionContextual() {
  const { nombreCompleto, slogan, industria, operaciones } = EMPRESA_CONFIG;
  return `${nombreCompleto} ("${slogan}") es una empresa especializada en ${industria}, con ${operaciones.proyectosActivos} y ${operaciones.moleculasEnPipeline}. Combina bioinformática avanzada con academia científica y servicios regulatorios.`;
}

export default EMPRESA_CONFIG;