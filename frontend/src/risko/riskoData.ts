import {
  Building2,
  FileText,
  MapPin,
  Camera,
  FileCheck2,
  ClipboardCheck,
  Building,
  Flame,
  Zap,
  Users,
  Clock,
  DollarSign,
  Cpu,
  CheckSquare,
  PieChart,
  ShieldCheck
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface ModuloRisko {
  id: string;
  codigo: string;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  icono: LucideIcon;
  badge?: string;
  colorBadge?: string;
}

export const MODULOS_RISKO: ModuloRisko[] = [
  {
    id: 'command-center',
    codigo: '01',
    titulo: 'Command Center Ejecutivo',
    subtitulo: 'Estado Global de Riesgo & Resiliencia',
    descripcion: 'Vista consolidada de cartera, score total, riesgo inherente vs. residual, métricas AAL/PML y alertas críticas.',
    icono: Building2,
    badge: 'Core UI',
    colorBadge: '#2563EB'
  },
  {
    id: 'expediente-digital',
    codigo: '02',
    titulo: 'Alta y Expediente Digital',
    subtitulo: 'Gemelo Digital del Inmueble',
    descripcion: 'Identidad catastral, superficie, ocupación, valores, permisos legales y completitud documental por activo.',
    icono: FileText,
    badge: 'Expediente',
    colorBadge: '#0EA5E9'
  },
  {
    id: 'georisk-studio',
    codigo: '03',
    titulo: 'GeoRisk Studio & Geoestudio',
    subtitulo: 'Inteligencia Cartográfica Multiamenaza',
    descripcion: 'Capa sismológica PGA, inundación pluvial/fluvial, viento huracanado, geotecnia y micro-zonificación NatCat.',
    icono: MapPin,
    badge: 'GIS Live',
    colorBadge: '#10B981'
  },
  {
    id: 'evidence-vault',
    codigo: '04',
    titulo: 'Evidence Vault',
    subtitulo: 'Depósito Inmutable con Visión IA',
    descripcion: 'Fotografías 360°, ortomosaicos de dron, planos CAD y sensores con detección automática de grietas y humedad.',
    icono: Camera,
    badge: 'Cadena Custodia',
    colorBadge: '#8B5CF6'
  },
  {
    id: 'ai-document-intelligence',
    codigo: '05',
    titulo: 'AI Document Intelligence',
    subtitulo: 'Extracción & RAG Documental',
    descripcion: 'Análisis de escrituras, avalúos, pólizas y licencias con referencias citadas y auditoría cruzada de coherencia.',
    icono: FileCheck2,
    badge: 'RAG OCR',
    colorBadge: '#6366F1'
  },
  {
    id: 'inspeccion-inteligente',
    codigo: '06',
    titulo: 'Inspección Inteligente',
    subtitulo: 'Workflow Adaptativo de Campo & QA',
    descripcion: 'Levantamiento dinámico con dictamen de ingenieros, matriz de hallazgos y workflow QA (Borrador -> Cerrada).',
    icono: ClipboardCheck,
    badge: 'Field Ops',
    colorBadge: '#F59E0B'
  },
  {
    id: 'construccion-estructura',
    codigo: '07',
    titulo: 'Construcción y Estructura',
    subtitulo: 'Vulnerabilidad y Vida Útil',
    descripcion: 'Resistencia sísmica, norma de diseño, estado de cimentación, irregularidades geométricas y desgaste estructural.',
    icono: Building,
    badge: 'Ingeniería',
    colorBadge: '#64748B'
  },
  {
    id: 'fire-explosion',
    codigo: '08',
    titulo: 'Fire & Explosion Risk',
    subtitulo: 'Protección Pasiva, Activa & PML',
    descripcion: 'Carga de fuego, rociadores automáticos, red de hidrantes, bomba contra incendio y escenarios de pérdida máxima.',
    icono: Flame,
    badge: 'Protección',
    colorBadge: '#EF4444'
  },
  {
    id: 'instalaciones-equipos',
    codigo: '09',
    titulo: 'Instalaciones y Equipos',
    subtitulo: 'Sistemas Críticos & Termografía',
    descripcion: 'Tableros eléctricos, subestaciones, tanques de combustible, HVAC, elevadores, UPS y puntos únicos de falla.',
    icono: Zap,
    badge: 'Mantenimiento',
    colorBadge: '#F97316'
  },
  {
    id: 'operacion-personas-rc',
    codigo: '010',
    titulo: 'Operación, Personas y RC',
    subtitulo: 'Aforo, Seguridad & Responsabilidad Civil',
    descripcion: 'Gestión de ocupantes, seguridad perimetral CCTV, planes de protección civil y riesgo de responsabilidad a terceros.',
    icono: Users,
    badge: 'Operaciones',
    colorBadge: '#EC4899'
  },
  {
    id: 'continuidad-dependencias',
    codigo: '11',
    titulo: 'Continuidad y Dependencias',
    subtitulo: 'Simulador de Interrupción de Negocio (BI)',
    descripcion: 'Mapeo de interdependencias inter-inmueble, métricas MTPD/RTO/RPO y modelo de pérdida financiera por paro.',
    icono: Clock,
    badge: 'BI & Resilience',
    colorBadge: '#14B8A6'
  },
  {
    id: 'valuacion-coberturas',
    codigo: '12',
    titulo: 'Valuación y Coberturas',
    subtitulo: 'Waterfall de Indemnización & Infraseguro',
    descripcion: 'Valor de reposición a nuevo, desglose de póliza, deducibles, coaseguro, sublímites y brechas no cubiertas.',
    icono: DollarSign,
    badge: 'Underwriting',
    colorBadge: '#059669'
  },
  {
    id: 'motor-riesgo-escenarios',
    codigo: '13',
    titulo: 'Motor de Riesgo & Escenarios',
    subtitulo: 'Scoring 0–100, AAL & Curvas AEP/OEP',
    descripcion: 'Algoritmo ponderado multivariable, métricas de pérdida anual esperada (AAL) y simulación multi-catástrofe.',
    icono: Cpu,
    badge: 'AI Risk Engine',
    colorBadge: '#2563EB'
  },
  {
    id: 'mitigacion-capex',
    codigo: '14',
    titulo: 'Mitigación y Workflows',
    subtitulo: 'Kanban & Optimizador ROI de CAPEX',
    descripcion: 'Priorización económica de recomendaciones, retorno en reducción de score y control de SLAs de implementación.',
    icono: CheckSquare,
    badge: 'CAPEX Workflow',
    colorBadge: '#D97706'
  },
  {
    id: 'portfolio-accumulation',
    codigo: '15',
    titulo: 'Portfolio & Accumulation',
    subtitulo: 'Análisis de Concentración & Stress Testing',
    descripcion: 'Mapa de acumulación geográfica por cuadrícula, stress testing de cartera y contribución marginal de riesgo.',
    icono: PieChart,
    badge: 'Portfolio GIS',
    colorBadge: '#3B82F6'
  },
  {
    id: 'gobierno-agentes',
    codigo: '16',
    titulo: 'Gobierno de IA & Agentes',
    subtitulo: 'Orquestador Agéntico & Human-in-the-Loop',
    descripcion: 'Fuerza de trabajo digital (16 agentes especializados), versiones de modelo, trazabilidad y bitácora auditable.',
    icono: ShieldCheck,
    badge: 'Governance',
    colorBadge: '#1E293B'
  }
];

export const INMUEBLES_SAMPLE = [
  {
    id: 'prop-001',
    nombre: 'Torre Corporativa Reforma 222',
    tipo: 'Oficinas & Retail',
    ubicacion: 'Ciudad de México, Cuauhtémoc',
    coordenadas: [19.4287, -99.1614],
    superficieConstruida: '45,800 m²',
    niveles: 32,
    anioConstruccion: 2008,
    valorReposicion: '$125,000,000 USD',
    scoreRiesgo: 38,
    nivelRiesgo: 'Bajo',
    claseAsegurabilidad: 'A',
    aal: '$182,500 USD (0.146%)',
    pml: '$18,400,000 USD',
    mitigacionesAbiertas: 3,
    inspectorAsignado: 'Ing. Carlos Mendoza (Estructural)'
  },
  {
    id: 'prop-002',
    nombre: 'Parque Industrial San Martín Obispo',
    tipo: 'Bodega Logística Múltiple',
    ubicacion: 'Cuautitlán Izcalli, Estado de México',
    coordenadas: [19.6452, -99.2018],
    superficieConstruida: '92,000 m²',
    niveles: 2,
    anioConstruccion: 2017,
    valorReposicion: '$210,000,000 USD',
    scoreRiesgo: 64,
    nivelRiesgo: 'Alto',
    claseAsegurabilidad: 'D',
    aal: '$980,000 USD (0.466%)',
    pml: '$45,200,000 USD',
    mitigacionesAbiertas: 8,
    inspectorAsignado: 'Dra. Elena Rostova (Fire & Explosion)'
  },
  {
    id: 'prop-003',
    nombre: 'Plaza Galerías Guadalajara',
    tipo: 'Retail & Entretenimiento',
    ubicacion: 'Zapopan, Jalisco',
    coordenadas: [20.6751, -103.4312],
    superficieConstruida: '68,500 m²',
    niveles: 4,
    anioConstruccion: 2004,
    valorReposicion: '$165,000,000 USD',
    scoreRiesgo: 48,
    nivelRiesgo: 'Moderado',
    claseAsegurabilidad: 'B',
    aal: '$310,000 USD (0.187%)',
    pml: '$24,800,000 USD',
    mitigacionesAbiertas: 4,
    inspectorAsignado: 'Ing. Roberto Silva (Instalaciones)'
  },
  {
    id: 'prop-004',
    nombre: 'Centro Logístico Apodaca II',
    tipo: 'Manufactura & Almacén',
    ubicacion: 'Apodaca, Nuevo León',
    coordenadas: [25.7801, -100.1852],
    superficieConstruida: '54,000 m²',
    niveles: 1,
    anioConstruccion: 2021,
    valorReposicion: '$98,000,000 USD',
    scoreRiesgo: 28,
    nivelRiesgo: 'Bajo',
    claseAsegurabilidad: 'A',
    aal: '$95,000 USD (0.096%)',
    pml: '$9,800,000 USD',
    mitigacionesAbiertas: 1,
    inspectorAsignado: 'Ing. Fernando Garay (Riesgo Financiero)'
  },
  {
    id: 'prop-005',
    nombre: 'Hotel Grand Riviera Cancun',
    tipo: 'Hospitalidad & Resort',
    ubicacion: 'Cancún, Quintana Roo',
    coordenadas: [21.1619, -86.8515],
    superficieConstruida: '78,000 m²',
    niveles: 14,
    anioConstruccion: 2012,
    valorReposicion: '$180,000,000 USD',
    scoreRiesgo: 82,
    nivelRiesgo: 'Crítico',
    claseAsegurabilidad: 'E',
    aal: '$2,450,000 USD (1.361%)',
    pml: '$78,500,000 USD',
    mitigacionesAbiertas: 12,
    inspectorAsignado: 'Ing. Mariana Valdés (Hidrometeorológico)'
  }
];

export const ALERTAS_CRITICAS_SAMPLE = [
  {
    id: 'alt-101',
    evento: 'Sismo Mw 6.8 Interplaca (Simulación / Alerta sísmica activa)',
    fuente: 'SSN / Sensor RED-RISKO',
    inmueblesAfectados: 42,
    severidad: 'Crítica',
    plazo: 'Inmediato',
    propietario: 'Equipo de Respuesta Rápida'
  },
  {
    id: 'alt-102',
    evento: 'Ráfagas Ciclónicas > 165 km/h (Huracán Categoría 3)',
    fuente: 'NOAA / Servicio Meteorológico Nacional',
    inmueblesAfectados: 18,
    severidad: 'Alta',
    plazo: '12 Horas',
    propietario: 'Risk Manager Quintana Roo'
  },
  {
    id: 'alt-103',
    evento: 'Bomba Principal Contra Incendio Fuera de Servicio',
    fuente: 'Sensor Telemetría BMS / Parque San Martín',
    inmueblesAfectados: 1,
    severidad: 'Crítica',
    plazo: '24 Horas',
    propietario: 'Superintendente de Mantenimiento'
  }
];

export const AGENTES_IA_LIST = [
  { id: 'ag-01', nombre: 'Orquestador de Caso', rol: 'Planificación y Asignación SLA', estado: 'Activo', confianza: '99%' },
  { id: 'ag-02', nombre: 'Agente de Ingesta', rol: 'Clasificación Documental Inmutable', estado: 'Activo', confianza: '97%' },
  { id: 'ag-03', nombre: 'Agente Documental (RAG)', rol: 'Extracción de Pólizas y Escrituras', estado: 'Activo', confianza: '95%' },
  { id: 'ag-04', nombre: 'Agente de Planos CAD', rol: 'Inventario Espacial y Áreas', estado: 'Activo', confianza: '92%' },
  { id: 'ag-05', nombre: 'Agente Geoespacial GIS', rol: 'Polígonos y Micro-zonificación', estado: 'Activo', confianza: '98%' },
  { id: 'ag-06', nombre: 'Agente NatCat Hazards', rol: 'Modelación de Sismo, Inundación y Huracán', estado: 'Activo', confianza: '96%' },
  { id: 'ag-07', nombre: 'Agente de Visión Computacional', rol: 'Detección de Grietas, Humedad y Corrosión', estado: 'Activo', confianza: '94%' },
  { id: 'ag-08', nombre: 'Agente Estructural', rol: 'Vulnerabilidad Sísmica y Códigos', estado: 'Activo', confianza: '93%' },
  { id: 'ag-09', nombre: 'Agente de Incendio (NFPA)', rol: 'Carga de Fuego y Rociadores', estado: 'Activo', confianza: '95%' },
  { id: 'ag-10', nombre: 'Agente de Instalaciones', rol: 'Tableros Eléctricos y Termografía', estado: 'Activo', confianza: '94%' },
  { id: 'ag-11', nombre: 'Agente de Continuidad BI', rol: 'Interrupción y Redundancia MTPD', estado: 'Activo', confianza: '91%' },
  { id: 'ag-12', nombre: 'Agente de Valuación', rol: 'Valor de Reposición e Infraseguro', estado: 'Activo', confianza: '96%' },
  { id: 'ag-13', nombre: 'Agente de Póliza', rol: 'Brechas y Coberturas Excluidas', estado: 'Activo', confianza: '97%' },
  { id: 'ag-14', nombre: 'Agente de Scoring', rol: 'Algoritmo de Riesgo Explicable', estado: 'Activo', confianza: '99%' },
  { id: 'ag-15', nombre: 'Agente de Mitigación CAPEX', rol: 'Roadmap de Inversión Preventiva', estado: 'Activo', confianza: '95%' },
  { id: 'ag-16', nombre: 'Agente Monitoreo & QA', rol: 'Vigilancia de Sensores y Auditoría', estado: 'Activo', confianza: '98%' }
];
