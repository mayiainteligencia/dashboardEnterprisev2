// Datos y definición de Módulos Oficiales izzi M2C (powered by MAYIA & Retail Innova)

export interface ModuloIzzi {
  id: string;
  titulo: string;
  subtitulo: string;
  iconoName: string;
  color: string;
  kpis: { label: string; valor: string; cambio?: string }[];
  alertas: number;
  descripcion: string;
  categoria: 'comercial' | 'operaciones' | 'tecnologia' | 'experiencia';
}

export interface AlertaIzzi {
  id: string;
  titulo: string;
  descripcion: string;
  gravedad: 'critica' | 'advertencia' | 'info';
  moduloId: string;
  hora: string;
  ubicacion?: string;
}

export const MODULOS_IZZI: ModuloIzzi[] = [
  {
    id: 'computer-vision',
    titulo: 'Computer Vision Comercial',
    subtitulo: 'Medición de Tráfico, Engagement y Permanencia',
    iconoName: 'Eye',
    color: '#E3067A', // Magenta izzi
    kpis: [
      { label: 'Tráfico 24h', valor: '16,840', cambio: '+14%' },
      { label: 'Tasa Atracción', valor: '31.2%', cambio: '+4.2%' },
      { label: 'Permanencia Prom.', valor: '4.1 min', cambio: '+0.5 min' },
    ],
    alertas: 2,
    descripcion: 'Sensores anónimos de visión computacional para medir el embudo físico en Centros de Atención e islas izzi.',
    categoria: 'operaciones',
  },
  {
    id: 'asesor-inteligente',
    titulo: 'Asesor Inteligente izzi',
    subtitulo: 'Atención en Pantalla, Cobertura y Captura de Leads',
    iconoName: 'Bot',
    color: '#0090D0', // Azul izzi
    kpis: [
      { label: 'Interacciones', valor: '5,280', cambio: '+21%' },
      { label: 'Consultas Cobertura', valor: '2,340', cambio: '+26%' },
      { label: 'Leads Capturados', valor: '890', cambio: '+19%' },
    ],
    alertas: 0,
    descripcion: 'Agente virtual interactivo en tótem/pantalla que explica paquetes izzi (Doble/Triple Play, izzi tv+, izzi móvil) y consulta cobertura por C.P.',
    categoria: 'comercial',
  },
  {
    id: 'copiloto-vendedor',
    titulo: 'Copiloto del Vendedor',
    subtitulo: 'Asistente de Argumentación, Cierre y ARPU',
    iconoName: 'UserCheck',
    color: '#FF6C07', // Naranja izzi
    kpis: [
      { label: 'Asesores Activos', valor: '420', cambio: '+12%' },
      { label: 'Cierres Asistidos', valor: '78%', cambio: '+6%' },
      { label: 'ARPU Prom. Captado', valor: '$585 MXN', cambio: '+$32' },
    ],
    alertas: 1,
    descripcion: 'Herramienta de recomendación en tiempo real para ejecutivos comerciales en sucursales izzi durante la atención al cliente.',
    categoria: 'comercial',
  },
  {
    id: 'displays-inteligentes',
    titulo: 'Displays Inteligentes',
    subtitulo: 'Exhibición Inmersiva izzi tv+ & Streaming',
    iconoName: 'Tv',
    color: '#E3067A', // Fucsia izzi
    kpis: [
      { label: 'Displays Activos', valor: '120', cambio: '100%' },
      { label: 'Demos Reproducidas', valor: '9,650', cambio: '+28%' },
      { label: 'Dwell Time Demo', valor: '3.2 min', cambio: '+55s' },
    ],
    alertas: 0,
    descripcion: 'Gestión dinámica de contenido inmersivo para la experiencia izzi tv+, plataformas de streaming (ViX, Netflix, Max) e internet simétrico.',
    categoria: 'experiencia',
  },
  {
    id: 'auditoria-visual',
    titulo: 'Auditoría Visual IA',
    subtitulo: 'Estandarización de Centros de Atención e Islas',
    iconoName: 'Camera',
    color: '#53267E', // Púrpura izzi
    kpis: [
      { label: 'Puntos Auditados', valor: '120', cambio: '100%' },
      { label: 'Cumplimiento Planograma', valor: '97.4%', cambio: '+3.8%' },
      { label: 'Desviaciones IA', valor: '3', cambio: '-60%' },
    ],
    alertas: 3,
    descripcion: 'Verificación fotográfica automatizada con visión artificial para estandarizar la ejecución de marca izzi a nivel nacional.',
    categoria: 'operaciones',
  },
  {
    id: 'gobierno-datos-crm',
    titulo: 'Gobierno de Datos & CRM',
    subtitulo: 'Atribución Omnicanal Físico-Digital',
    iconoName: 'Database',
    color: '#0090D0', // Azul izzi
    kpis: [
      { label: 'Tasa Conversión Lead-Instalación', valor: '45.6%', cambio: '+7.4%' },
      { label: 'Leads Sincronizados', valor: '100%', cambio: 'OK' },
      { label: 'Costo Adquisición (CAC)', valor: '-22%', cambio: 'Mejora' },
    ],
    alertas: 0,
    descripcion: 'Trazabilidad completa entre la visita al Centro de Atención izzi, la captura del lead, CRM y activación final en la App izzi.',
    categoria: 'tecnologia',
  },
  {
    id: 'academia-mayia',
    titulo: 'Academia MAYIA izzi',
    subtitulo: 'Capacitación Continuada para Fuerza de Ventas',
    iconoName: 'GraduationCap',
    color: '#FCD116', // Amarillo izzi
    kpis: [
      { label: 'Vendedores Certificados', valor: '520', cambio: '+45' },
      { label: 'Cursos Completados', valor: '1,640', cambio: '+18%' },
      { label: 'Calificación Prom.', valor: '9.6/10', cambio: '+0.4' },
    ],
    alertas: 0,
    descripcion: 'Capacitación interactiva en planes izzi móvil, izzi tv+, técnicas de venta y uso de herramientas inteligentes MAYIA.',
    categoria: 'comercial',
  },
  {
    id: 'diseño-fabricacion',
    titulo: 'Diseño y Fabricación Retail Innova',
    subtitulo: 'Rendimiento por Formato izzi (Isla, Tienda, Express)',
    iconoName: 'LayoutGrid',
    color: '#FF6C07', // Naranja izzi
    kpis: [
      { label: 'Islas Mall', valor: '54', cambio: '+6' },
      { label: 'Centros de Atención izzi', valor: '46', cambio: 'Estable' },
      { label: 'Módulos Express', valor: '20', cambio: '+2' },
    ],
    alertas: 1,
    descripcion: 'Análisis de productividad y ventas por metro cuadrado según la tipología del punto de contacto físico izzi.',
    categoria: 'experiencia',
  },
  {
    id: 'operacion-administrada',
    titulo: 'Operación Administrada',
    subtitulo: 'Monitoreo de Sensores, Equipos y Scorecard',
    iconoName: 'Activity',
    color: '#E3067A', // Fucsia izzi
    kpis: [
      { label: 'Disponibilidad Sensores', valor: '99.7%', cambio: '+0.3%' },
      { label: 'Pantallas Conectadas', valor: '120/120', cambio: '100%' },
      { label: 'Scorecard General', valor: '96/100', cambio: '+4 pts' },
    ],
    alertas: 0,
    descripcion: 'Monitoreo continuo de conectividad, salud del equipamiento IoT en sucursales izzi y tablero ejecutivo general.',
    categoria: 'tecnologia',
  },
  {
    id: 'discovery-retail',
    titulo: 'Discovery IA Retail',
    subtitulo: 'Diagnóstico de Madurez e Incertidumbre',
    iconoName: 'Compass',
    color: '#53267E', // Púrpura izzi
    kpis: [
      { label: 'Score Madurez IA', valor: '68%', cambio: 'Piloto M2C' },
      { label: 'Cobertura Monitoreada', valor: '60+ ciudades', cambio: 'Nacional' },
      { label: 'Hogares Pasados', valor: '15.2M', cambio: 'Potencial' },
    ],
    alertas: 0,
    descripcion: 'Evaluación estratégica para maximizar la conversión en tiendas físicas sobre la red híbrida y de fibra desplegada por izzi.',
    categoria: 'operaciones',
  },
  {
    id: 'vista-gerente-movil',
    titulo: 'Vista Móvil Gerente',
    subtitulo: 'Copiloto de Celular, Monitoreo & Mapa por Estado',
    iconoName: 'Smartphone',
    color: '#0090D0', // Azul izzi
    kpis: [
      { label: 'Gente Impactada', valor: '5.40M', cambio: '+28%' },
      { label: 'Retorno Inversión (ROI)', valor: '310%', cambio: '+26 pts' },
      { label: 'Plazas Monitoreo', valor: '380 en vivo', cambio: '99.1%' },
    ],
    alertas: 2,
    descripcion: 'Vista móvil del Gerente de Operaciones izzi para administración de sucursales, mapa interactivo, semáforo de conversión y copiloto inteligente.',
    categoria: 'comercial',
  },
];

export const ALERTAS_IZZI: AlertaIzzi[] = [
  {
    id: 'alt-1',
    titulo: 'Baja interacción detectada en Isla Mall Plaza Satélite',
    descripcion: 'Alto tráfico de personas (480 personas/hora) pero la interacción en pantalla cayó 12%. Se sugiere rotar promoción de izzi tv+ con ViX Premium.',
    gravedad: 'advertencia',
    moduloId: 'computer-vision',
    hora: '10:14 AM',
    ubicacion: 'Plaza Satélite (Isla 2)',
  },
  {
    id: 'alt-2',
    titulo: 'Desviación en módulo de exhibición Centro izzi Galerías Monterrey',
    descripcion: 'Auditoría visual IA detectó que el stand de demo de izzi tv+ no tiene conectada la pantalla interactiva principal.',
    gravedad: 'critica',
    moduloId: 'auditoria-visual',
    hora: '09:45 AM',
    ubicacion: 'Centro de Atención izzi Galerías Monterrey',
  },
  {
    id: 'alt-3',
    titulo: 'Alta demanda de consultas de cobertura en C.P. 03100 (Benito Juárez)',
    descripcion: 'El Asesor Inteligente registró 52 solicitudes de paquete Triple Play en la última hora. Oportunidad prioritaria para cierre inmediato.',
    gravedad: 'info',
    moduloId: 'asesor-inteligente',
    hora: '10:30 AM',
    ubicacion: 'Centro izzi Universidad CDMX',
  },
  {
    id: 'alt-4',
    titulo: 'Oportunidad de Upsell: Paquete izzi tv+ con streaming integrado',
    descripcion: 'El Copiloto del Vendedor recomienda ofrecer portabilidad a izzi móvil con descuento adicional en la contratación del combo residencial.',
    gravedad: 'info',
    moduloId: 'copiloto-vendedor',
    hora: '08:20 AM',
    ubicacion: 'Nacional',
  },
];
