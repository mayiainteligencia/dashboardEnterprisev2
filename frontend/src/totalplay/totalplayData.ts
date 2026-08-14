// Datos y definición de Módulos Oficiales Totalplay M2C (powered by MAYIA & Retail Innova)

export interface ModuloTotalplay {
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

export interface AlertaTotalplay {
  id: string;
  titulo: string;
  descripcion: string;
  gravedad: 'critica' | 'advertencia' | 'info';
  moduloId: string;
  hora: string;
  ubicacion?: string;
}

export const MODULOS_TOTALPLAY: ModuloTotalplay[] = [
  {
    id: 'computer-vision',
    titulo: 'Computer Vision Comercial',
    subtitulo: 'Medición de Tráfico, Engagement y Permanencia',
    iconoName: 'Eye',
    color: '#A61C5C', // Magenta
    kpis: [
      { label: 'Tráfico 24h', valor: '14,250', cambio: '+12%' },
      { label: 'Tasa Atracción', valor: '28.4%', cambio: '+3.1%' },
      { label: 'Permanencia Prom.', valor: '3.8 min', cambio: '+0.4 min' },
    ],
    alertas: 2,
    descripcion: 'Sensores anónimos de visión computacional para medir el embudo físico en islas y corners de Totalplay.',
    categoria: 'operaciones',
  },
  {
    id: 'asesor-inteligente',
    titulo: 'Asesor Inteligente Totalplay',
    subtitulo: 'Atención en Pantalla, Cobertura y Captura de Leads',
    iconoName: 'Bot',
    color: '#73B1BF', // Turquesa
    kpis: [
      { label: 'Interacciones', valor: '4,120', cambio: '+18%' },
      { label: 'Consultas Cobertura', valor: '1,890', cambio: '+22%' },
      { label: 'Leads Capturados', valor: '685', cambio: '+15%' },
    ],
    alertas: 0,
    descripcion: 'Agente virtual interactivo en tótem/pantalla que explica paquetes Doble/Triple Play y consulta cobertura por C.P.',
    categoria: 'comercial',
  },
  {
    id: 'copiloto-vendedor',
    titulo: 'Copiloto del Vendedor',
    subtitulo: 'Asistente de Argumentación, Cierre y ARPU',
    iconoName: 'UserCheck',
    color: '#D9933D', // Ámbar
    kpis: [
      { label: 'Asesores Activos', valor: '340', cambio: '+8%' },
      { label: 'Cierres Asistidos', valor: '74%', cambio: '+5%' },
      { label: 'ARPU Prom. Captado', valor: '$612 MXN', cambio: '+$24' },
    ],
    alertas: 1,
    descripcion: 'Herramienta de recomendación en tiempo real para ejecutivos comerciales durante la atención al cliente.',
    categoria: 'comercial',
  },
  {
    id: 'displays-inteligentes',
    titulo: 'Displays Inteligentes',
    subtitulo: 'Exhibición Inmersiva Totalplay TV & Sound',
    iconoName: 'Tv',
    color: '#BBBF41', // Lima
    kpis: [
      { label: 'Displays Activos', valor: '112', cambio: '100%' },
      { label: 'Demos Reproducidas', valor: '8,420', cambio: '+25%' },
      { label: 'Dwell Time Sound', valor: '2.5 min', cambio: '+40s' },
    ],
    alertas: 0,
    descripcion: 'Gestión dinámica de contenido inmersivo para la experiencia Totalplay TV y sonido Hi-Fi Premium Surround.',
    categoria: 'experiencia',
  },
  {
    id: 'auditoria-visual',
    titulo: 'Auditoría Visual IA',
    subtitulo: 'Estandarización y Control de Islas y Corners',
    iconoName: 'Camera',
    color: '#732D67', // Púrpura
    kpis: [
      { label: 'Puntos Auditados', valor: '112', cambio: '100%' },
      { label: 'Cumplimiento Planograma', valor: '96.2%', cambio: '+4.1%' },
      { label: 'Desviaciones IA', valor: '4', cambio: '-50%' },
    ],
    alertas: 3,
    descripcion: 'Verificación fotográfica automatizada con visión artificial para estandarizar la ejecución física nacional.',
    categoria: 'operaciones',
  },
  {
    id: 'gobierno-datos-crm',
    titulo: 'Gobierno de Datos & CRM',
    subtitulo: 'Atribución Omnicanal Físico-Digital',
    iconoName: 'Database',
    color: '#73B1BF', // Turquesa
    kpis: [
      { label: 'Tasa Conversión Lead-Instalación', valor: '42.8%', cambio: '+6.2%' },
      { label: 'Leads Sincronizados', valor: '100%', cambio: 'OK' },
      { label: 'Costo Adquisición (CAC)', valor: '-18%', cambio: 'Mejora' },
    ],
    alertas: 0,
    descripcion: 'Trazabilidad completa entre la visita a la isla comercial, la captura de lead, CRM y activación final en la App.',
    categoria: 'tecnologia',
  },
  {
    id: 'academia-mayia',
    titulo: 'Academia MAYIA Totalplay',
    subtitulo: 'Capacitación Continuada para Fuerza de Ventas',
    iconoName: 'GraduationCap',
    color: '#BBBF41', // Lima
    kpis: [
      { label: 'Vendedores Certificados', valor: '410', cambio: '+30' },
      { label: 'Cursos Completados', valor: '1,280', cambio: '+14%' },
      { label: 'Calificación Prom.', valor: '9.4/10', cambio: '+0.3' },
    ],
    alertas: 0,
    descripcion: 'Capacitación interactiva en técnicas de venta, características del servicio FTTH y uso de las herramientas de IA.',
    categoria: 'comercial',
  },
  {
    id: 'diseño-fabricacion',
    titulo: 'Diseño y Fabricación Retail Innova',
    subtitulo: 'Rendimiento por Formato (Isla, Corner, Tienda)',
    iconoName: 'LayoutGrid',
    color: '#D9933D', // Ámbar
    kpis: [
      { label: 'Islas Mall (4x3m)', valor: '48', cambio: 'Estable' },
      { label: 'Corners Autoservicio', valor: '42', cambio: '+4' },
      { label: 'Tiendas Premium', valor: '22', cambio: 'Estable' },
    ],
    alertas: 1,
    descripcion: 'Análisis de productividad y ventas por metro cuadrado según la tipología del punto de venta físico.',
    categoria: 'experiencia',
  },
  {
    id: 'operacion-administrada',
    titulo: 'Operación Administrada',
    subtitulo: 'Monitoreo de Sensores, Equipos y Scorecard',
    iconoName: 'Activity',
    color: '#A61C5C', // Magenta
    kpis: [
      { label: 'Disponibilidad Sensores', valor: '99.4%', cambio: '+0.2%' },
      { label: 'Pantallas Conectadas', valor: '112/112', cambio: '100%' },
      { label: 'Scorecard General', valor: '94/100', cambio: '+3 pts' },
    ],
    alertas: 0,
    descripcion: 'Monitoreo continuo de continuidad operativa, salud del equipamiento IoT y tablero ejecutivo general.',
    categoria: 'tecnologia',
  },
  {
    id: 'discovery-retail',
    titulo: 'Discovery IA Retail',
    subtitulo: 'Diagnóstico de Madurez e Incertidumbre',
    iconoName: 'Compass',
    color: '#732D67', // Púrpura
    kpis: [
      { label: 'Score Madurez IA', valor: '55%', cambio: 'Piloto M2C' },
      { label: 'Cobertura Monitoreada', valor: '87 ciudades', cambio: 'Nacional' },
      { label: 'Hogares Pasados', valor: '19.5M', cambio: 'Potencial' },
    ],
    alertas: 0,
    descripcion: 'Evaluación estratégica de oportunidades para maximizar el retorno sobre la infraestructura de fibra desplegada.',
    categoria: 'operaciones',
  },
  {
    id: 'vista-gerente-movil',
    titulo: 'Vista Móvil Gerente',
    subtitulo: 'Copiloto de Celular, Monitoreo & Mapa por Estado',
    iconoName: 'Smartphone',
    color: '#A61C5C', // Magenta
    kpis: [
      { label: 'Gente Impactada', valor: '4.85M', cambio: '+24%' },
      { label: 'Retorno Inversión (ROI)', valor: '284%', cambio: '+18 pts' },
      { label: 'Plazas Monitoreo', valor: '340 en vivo', cambio: '98.5%' },
    ],
    alertas: 2,
    descripcion: 'Vista móvil del Gerente de Ventas para administración de sucursales, mapa interactivo con zoom, semáforo de inversión y copiloto de celular.',
    categoria: 'comercial',
  },
];

export const ALERTAS_TOTALPLAY: AlertaTotalplay[] = [
  {
    id: 'alt-1',
    titulo: 'Baja conversión detectada en Isla Mall Plaza Galerías',
    descripcion: 'Tráfico alto (420 personas/hora) pero la interacción en pantalla cayó un 15%. Se recomienda ajustar el bucle de contenido visual.',
    gravedad: 'advertencia',
    moduloId: 'computer-vision',
    hora: '10:14 AM',
    ubicacion: 'Plaza Galerías CDMX (Isla 4)',
  },
  {
    id: 'alt-2',
    titulo: 'Desviación de exhibidor detectada en Corner Soriana Coyoacán',
    descripcion: 'Auditoría visual IA detectó que el display de Audio Hi-Fi Surround no tiene encendida la iluminación decorativa.',
    gravedad: 'critica',
    moduloId: 'auditoria-visual',
    hora: '09:45 AM',
    ubicacion: 'Soriana Coyoacán',
  },
  {
    id: 'alt-3',
    titulo: 'Alto volumen de consultas de cobertura en C.P. 01040',
    descripcion: 'El Asesor Inteligente ha recibido 45 consultas de fibra óptica en la última hora. Alta propensión de contratación.',
    gravedad: 'info',
    moduloId: 'asesor-inteligente',
    hora: '10:30 AM',
    ubicacion: 'Isla Centro Comercial Santa Fe',
  },
  {
    id: 'alt-4',
    titulo: 'Oportunidad de Upsell: Paquete Triple Play Sound Premium',
    descripcion: 'El Copiloto del Vendedor sugiere promover la experiencia Surround a clientes con paquetes residenciales mayores a $999.',
    gravedad: 'info',
    moduloId: 'copiloto-vendedor',
    hora: '08:20 AM',
    ubicacion: 'Nacional',
  },
];
