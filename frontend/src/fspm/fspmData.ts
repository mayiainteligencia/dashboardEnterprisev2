// Datos maestros y estructuras para CRM FSPM (Fire Safety & Protection Management)

export interface ModuloFspm {
  id: string;
  titulo: string;
  subtitulo: string;
  iconoName: string;
  alertas: number;
  categoria: 'comercial' | 'licitaciones' | 'operacion' | 'gestion';
  color: string;
}

export const MODULOS_FSPM: ModuloFspm[] = [
  {
    id: 'dashboard',
    titulo: 'Dashboard General',
    subtitulo: 'Indicadores, pipeline y semáforos ejecutivos',
    iconoName: 'LayoutDashboard',
    alertas: 6, // 6 seguimientos vencidos
    categoria: 'comercial',
    color: '#D32F2F',
  },
  {
    id: 'clientes',
    titulo: 'Clientes & Dependencias',
    subtitulo: 'Empresas, sectores y carpetas Drive',
    iconoName: 'Building2',
    alertas: 0,
    categoria: 'comercial',
    color: '#0F172A',
  },
  {
    id: 'contactos',
    titulo: 'Contactos & Decisores',
    subtitulo: 'Protección Civil, Seguridad y Compras',
    iconoName: 'Users',
    alertas: 2,
    categoria: 'comercial',
    color: '#0284C7',
  },
  {
    id: 'oportunidades',
    titulo: 'Pipeline & Oportunidades',
    subtitulo: 'Tablero Kanban y avance por etapas',
    iconoName: 'Briefcase',
    alertas: 4,
    categoria: 'comercial',
    color: '#D32F2F',
  },
  {
    id: 'cotizaciones',
    titulo: 'Control de Cotizaciones',
    subtitulo: 'Registro externo, montos y vigencias',
    iconoName: 'FileText',
    alertas: 3, // 3 sin seguimiento >7 días
    categoria: 'comercial',
    color: '#D97706',
  },
  {
    id: 'licitaciones',
    titulo: 'Licitaciones Públicas/Privadas',
    subtitulo: 'Semáforo crítico y checklist documental',
    iconoName: 'Landmark',
    alertas: 2, // 2 próximas a vencer <72h
    categoria: 'licitaciones',
    color: '#D97706',
  },
  {
    id: 'actividades',
    titulo: 'Actividades & Seguimientos',
    subtitulo: 'Llamadas, reuniones, WhatsApp y tareas',
    iconoName: 'CheckSquare',
    alertas: 6,
    categoria: 'operacion',
    color: '#10B981',
  },
  {
    id: 'documentos',
    titulo: 'Google Drive & Documentos',
    subtitulo: 'Estructura en la nube y repositorios',
    iconoName: 'FolderGit2',
    alertas: 0,
    categoria: 'gestion',
    color: '#0F172A',
  },
  {
    id: 'direccion',
    titulo: 'Reportes de Dirección',
    subtitulo: 'KPIs, forecast, conversión y ventas por ejecutivo',
    iconoName: 'TrendingUp',
    alertas: 0,
    categoria: 'gestion',
    color: '#D32F2F',
  },
];

// ── 1. CLIENTES ──
export interface ClienteFSPM {
  id: string;
  nombreComercial: string;
  razonSocial: string;
  rfc: string;
  sector: 'Energía' | 'Aviación' | 'Minería / Metalurgia' | 'Gobierno' | 'Portuario' | 'Industria Manufacturera' | 'Otro';
  tipo: 'Gobierno Federal' | 'Gobierno Estatal' | 'Municipio' | 'Empresa privada' | 'Distribuidor' | 'Integrador' | 'Industria';
  ejecutivo: string;
  estado: 'Cliente activo' | 'Prospección' | 'En licitación' | 'Inactivo';
  ultimaOperacion: string;
  oportunidadesAbiertas: number;
  pipelineTotal: number;
  contactos: number;
  cotizaciones: number;
  licitaciones: number;
  driveFolder: string;
  direccion: string;
  telefono: string;
  sitioWeb: string;
  observaciones: string;
}

export const CLIENTES_FSPM: ClienteFSPM[] = [
  {
    id: 'CLI-001',
    nombreComercial: 'CFE — Comisión Federal de Electricidad',
    razonSocial: 'Comisión Federal de Electricidad',
    rfc: 'CFE370814QI0',
    sector: 'Energía',
    tipo: 'Gobierno Federal',
    ejecutivo: 'Fernanda Reza',
    estado: 'Cliente activo',
    ultimaOperacion: '05/08/2026',
    oportunidadesAbiertas: 3,
    pipelineTotal: 2850000,
    contactos: 7,
    cotizaciones: 12,
    licitaciones: 5,
    driveFolder: 'FSPM CRM/CLIENTES/CFE',
    direccion: 'Av. Paseo de la Reforma 164, Juárez, Cuauhtémoc, CDMX',
    telefono: '+52 55 5229 4400',
    sitioWeb: 'www.cfe.mx',
    observaciones: 'Cliente estratégico de alto volumen. Renovación anual de sistemas de protección en subestaciones y plantas.',
  },
  {
    id: 'CLI-002',
    nombreComercial: 'PEMEX — Petróleos Mexicanos',
    razonSocial: 'Petróleos Mexicanos E.P.S.',
    rfc: 'PME380607P35',
    sector: 'Energía',
    tipo: 'Gobierno Federal',
    ejecutivo: 'Luis Gerardo',
    estado: 'En licitación',
    ultimaOperacion: '12/08/2026',
    oportunidadesAbiertas: 4,
    pipelineTotal: 8900000,
    contactos: 12,
    cotizaciones: 18,
    licitaciones: 4,
    driveFolder: 'FSPM CRM/CLIENTES/PEMEX',
    direccion: 'Av. Marina Nacional 329, Petróleos Mexicanos, Miguel Hidalgo, CDMX',
    telefono: '+52 55 1944 2500',
    sitioWeb: 'www.pemex.com',
    observaciones: 'Licitaciones críticas SPCI en refinerías y plataformas marinas. Demanda alta de agentes espumógenos CAFS y FireAde.',
  },
  {
    id: 'CLI-003',
    nombreComercial: 'ASA — Aeropuertos y Servicios Auxiliares',
    razonSocial: 'Aeropuertos y Servicios Auxiliares',
    rfc: 'ASA650610QW1',
    sector: 'Aviación',
    tipo: 'Gobierno Federal',
    ejecutivo: 'Alfonso',
    estado: 'Cliente activo',
    ultimaOperacion: '10/08/2026',
    oportunidadesAbiertas: 2,
    pipelineTotal: 1800000,
    contactos: 5,
    cotizaciones: 6,
    licitaciones: 2,
    driveFolder: 'FSPM CRM/CLIENTES/ASA',
    direccion: 'Av. 602 No. 161, Zona Federal AICM, Venustiano Carranza, CDMX',
    telefono: '+52 55 5133 1000',
    sitioWeb: 'www.gob.mx/asa',
    observaciones: 'Mantenimiento preventivo y correctivo de vehículos de rescate y extinción de incendios (CREI).',
  },
  {
    id: 'CLI-004',
    nombreComercial: 'Protección Civil CDMX (SGIRPC)',
    razonSocial: 'Secretaría de Gestión Integral de Riesgos y Protección Civil',
    rfc: 'GDF9712054NA',
    sector: 'Gobierno',
    tipo: 'Gobierno Estatal',
    ejecutivo: 'Fernanda Reza',
    estado: 'Cliente activo',
    ultimaOperacion: '14/08/2026',
    oportunidadesAbiertas: 2,
    pipelineTotal: 1450000,
    contactos: 4,
    cotizaciones: 5,
    licitaciones: 1,
    driveFolder: 'FSPM CRM/CLIENTES/PC_CDMX',
    direccion: 'Av. Patriotismo 711, San Juan, Benito Juárez, CDMX',
    telefono: '+52 55 5683 2222',
    sitioWeb: 'www.proteccioncivil.cdmx.gob.mx',
    observaciones: 'Equipamiento de unidades ligeras de primera respuesta y dotación de concentrado FireAde.',
  },
  {
    id: 'CLI-005',
    nombreComercial: 'Ternium México',
    razonSocial: 'Ternium México, S.A. de C.V.',
    rfc: 'TME840801893',
    sector: 'Minería / Metalurgia',
    tipo: 'Empresa privada',
    ejecutivo: 'Edgar',
    estado: 'Cliente activo',
    ultimaOperacion: '02/08/2026',
    oportunidadesAbiertas: 2,
    pipelineTotal: 3200000,
    contactos: 6,
    cotizaciones: 8,
    licitaciones: 0,
    driveFolder: 'FSPM CRM/CLIENTES/TERNIUM',
    direccion: 'Av. Munich 101, Cuauhtémoc, San Nicolás de los Garza, N.L.',
    telefono: '+52 81 8865 7500',
    sitioWeb: 'www.ternium.com.mx',
    observaciones: 'Protección de laminadores y subestaciones eléctricas. Sistema de rociadores y monitores de espuma.',
  },
  {
    id: 'CLI-006',
    nombreComercial: 'Grupo México (División Minería)',
    razonSocial: 'Industrial Minera México, S.A. de C.V.',
    rfc: 'IMM780620982',
    sector: 'Minería / Metalurgia',
    tipo: 'Empresa privada',
    ejecutivo: 'Alfonso',
    estado: 'Prospección',
    ultimaOperacion: '08/08/2026',
    oportunidadesAbiertas: 3,
    pipelineTotal: 4100000,
    contactos: 8,
    cotizaciones: 7,
    licitaciones: 1,
    driveFolder: 'FSPM CRM/CLIENTES/GRUPO_MEXICO',
    direccion: 'Campos Elíseos 400, Lomas de Chapultepec, Miguel Hidalgo, CDMX',
    telefono: '+52 55 1103 5000',
    sitioWeb: 'www.gmexico.com',
    observaciones: 'Unidades móviles 4x4 FireAde para minas a cielo abierto en Sonora y Zacatecas.',
  },
  {
    id: 'CLI-007',
    nombreComercial: 'Administración Portuaria Veracruz (ASIPONA)',
    razonSocial: 'Administración del Sistema Portuario Nacional Veracruz, S.A. de C.V.',
    rfc: 'API940201991',
    sector: 'Portuario',
    tipo: 'Gobierno Federal',
    ejecutivo: 'Luis Gerardo',
    estado: 'Cliente activo',
    ultimaOperacion: '11/08/2026',
    oportunidadesAbiertas: 1,
    pipelineTotal: 2500000,
    contactos: 4,
    cotizaciones: 4,
    licitaciones: 1,
    driveFolder: 'FSPM CRM/CLIENTES/ASIPONA_VERACRUZ',
    direccion: 'Av. Marina Mercante 210, Centro, Veracruz, Ver.',
    telefono: '+52 229 923 2170',
    sitioWeb: 'www.puertodeveracruz.com.mx',
    observaciones: 'Sistema de protección de muelles de hidrocarburos y remolcadores.',
  }
];

// ── 2. CONTACTOS ──
export interface ContactoFSPM {
  id: string;
  nombre: string;
  empresa: string;
  clienteId: string;
  cargo: string;
  area: string;
  email: string;
  telefono: string;
  whatsapp: string;
  ejecutivoFspm: string;
  nivelInfluencia: 'Decisor Clave' | 'Alto' | 'Medio' | 'Técnico / Evaluador';
  estado: 'Activo' | 'Inactivo' | 'Nuevo';
  ultimoContacto: string;
  proximaAccion: string;
  fechaProximaAccion: string;
}

export const CONTACTOS_FSPM: ContactoFSPM[] = [
  {
    id: 'CON-001',
    nombre: 'Ing. Juan Pérez Morales',
    empresa: 'CFE — Comisión Federal de Electricidad',
    clienteId: 'CLI-001',
    cargo: 'Responsable de Protección Civil',
    area: 'Seguridad Industrial & Medio Ambiente',
    email: 'juan.perez@cfe.mx',
    telefono: '+52 55 5229 4410',
    whatsapp: '+52 55 1234 5678',
    ejecutivoFspm: 'Fernanda Reza',
    nivelInfluencia: 'Decisor Clave',
    estado: 'Activo',
    ultimoContacto: '15/08/2026',
    proximaAccion: 'Llamar para confirmar recepción de adenda técnica',
    fechaProximaAccion: '21/08/2026',
  },
  {
    id: 'CON-002',
    nombre: 'Lic. Claudia Morales Soto',
    empresa: 'CFE — Comisión Federal de Electricidad',
    clienteId: 'CLI-001',
    cargo: 'Subgerente de Adquisiciones',
    area: 'Abastecimientos Centrales',
    email: 'claudia.morales@cfe.mx',
    telefono: '+52 55 5229 4480',
    whatsapp: '+52 55 8765 4321',
    ejecutivoFspm: 'Fernanda Reza',
    nivelInfluencia: 'Alto',
    estado: 'Activo',
    ultimoContacto: '12/08/2026',
    proximaAccion: 'Enviar dictamen de opinión de cumplimiento SAT 32-D',
    fechaProximaAccion: '22/08/2026',
  },
  {
    id: 'CON-003',
    nombre: 'Ing. Roberto Silva Garza',
    empresa: 'PEMEX — Petróleos Mexicanos',
    clienteId: 'CLI-002',
    cargo: 'Superintendente de Seguridad y Contra Incendio',
    area: 'Subdirección de Producción Marina',
    email: 'roberto.silva@pemex.com',
    telefono: '+52 55 1944 2590',
    whatsapp: '+52 938 123 9988',
    ejecutivoFspm: 'Luis Gerardo',
    nivelInfluencia: 'Decisor Clave',
    estado: 'Activo',
    ultimoContacto: '17/08/2026',
    proximaAccion: 'Reunión de aclaración de bases procedimiento SPCI',
    fechaProximaAccion: '20/08/2026',
  },
  {
    id: 'CON-004',
    nombre: 'Mtro. Carlos Méndez Treviño',
    empresa: 'ASA — Aeropuertos y Servicios Auxiliares',
    clienteId: 'CLI-003',
    cargo: 'Jefe de Operaciones CREI Nacional',
    area: 'Operaciones Aeroportuarias',
    email: 'carlos.mendez@asa.gob.mx',
    telefono: '+52 55 5133 1055',
    whatsapp: '+52 55 9876 5432',
    ejecutivoFspm: 'Alfonso',
    nivelInfluencia: 'Decisor Clave',
    estado: 'Activo',
    ultimoContacto: '10/08/2026',
    proximaAccion: 'Presentación demo en vivo de extintor FireAde 2000',
    fechaProximaAccion: '24/08/2026',
  },
  {
    id: 'CON-005',
    nombre: 'Dra. Miriam Salazar',
    empresa: 'Protección Civil CDMX (SGIRPC)',
    clienteId: 'CLI-004',
    cargo: 'Directora de Gestión de Emergencias',
    area: 'Atención a Desastres',
    email: 'miriam.salazar@cdmx.gob.mx',
    telefono: '+52 55 5683 2240',
    whatsapp: '+52 55 4433 2211',
    ejecutivoFspm: 'Fernanda Reza',
    nivelInfluencia: 'Alto',
    estado: 'Activo',
    ultimoContacto: '14/08/2026',
    proximaAccion: 'Entrega de propuesta económica unidades ligeras',
    fechaProximaAccion: '25/08/2026',
  },
  {
    id: 'CON-006',
    nombre: 'Ing. Gustavo Alarcón',
    empresa: 'Ternium México',
    clienteId: 'CLI-005',
    cargo: 'Gerente de Mantenimiento e Instalaciones',
    area: 'Ingeniería de Planta Monterrey',
    email: 'galarcon@ternium.com.mx',
    telefono: '+52 81 8865 7540',
    whatsapp: '+52 81 1566 7788',
    ejecutivoFspm: 'Edgar',
    nivelInfluencia: 'Decisor Clave',
    estado: 'Activo',
    ultimoContacto: '02/08/2026',
    proximaAccion: 'Dar seguimiento a cotización FSPM-2026-0179',
    fechaProximaAccion: '21/08/2026',
  }
];

// ── 3. OPORTUNIDADES & KANBAN ──
export type EtapaOportunidad =
  | 'NUEVO'
  | 'CONTACTADO'
  | 'CALIFICADO'
  | 'OPORTUNIDAD'
  | 'COTIZADO'
  | 'NEGOCIACIÓN'
  | 'GANADO'
  | 'PERDIDO';

export interface OportunidadFSPM {
  id: string;
  codigo: string;
  cliente: string;
  clienteId: string;
  proyecto: string;
  responsable: string;
  producto: 'Unidad Móvil FireAde' | 'Sistema CAFS' | 'Mantenimiento SPCI' | 'Agente Extintor FireAde' | 'Equipamiento y EPP' | 'Monitores & Rociadores';
  montoEstimado: number;
  probabilidad: number; // porcentaje 0-100
  etapa: EtapaOportunidad;
  fechaEstimadaCierre: string;
  ultimaActividad: string;
  proximaActividad: string;
  fechaProximaActividad: string;
  cotizacionAsociada?: string;
  licitacionAsociada?: string;
  driveFolder: string;
}

export const OPORTUNIDADES_FSPM: OportunidadFSPM[] = [
  {
    id: 'OPP-001',
    codigo: 'OPP-2026-0041',
    cliente: 'CFE — Comisión Federal de Electricidad',
    clienteId: 'CLI-001',
    proyecto: 'Equipamiento contra incendio Unidades Móviles FireAde',
    responsable: 'Fernanda Reza',
    producto: 'Unidad Móvil FireAde',
    montoEstimado: 890000,
    probabilidad: 60,
    etapa: 'COTIZADO',
    fechaEstimadaCierre: '30/09/2026',
    ultimaActividad: '17/08/2026',
    proximaActividad: 'Seguimiento con Juan Pérez sobre ficha técnica',
    fechaProximaActividad: '22/08/2026',
    cotizacionAsociada: 'FSPM-2026-0183',
    driveFolder: 'FSPM CRM/CLIENTES/CFE/02_Cotizaciones',
  },
  {
    id: 'OPP-002',
    codigo: 'OPP-2026-0038',
    cliente: 'PEMEX — Petróleos Mexicanos',
    clienteId: 'CLI-002',
    proyecto: 'Sistemas CAFS de Alta Capacidad para Plataformas Marinas',
    responsable: 'Luis Gerardo',
    producto: 'Sistema CAFS',
    montoEstimado: 4500000,
    probabilidad: 60,
    etapa: 'NEGOCIACIÓN',
    fechaEstimadaCierre: '15/10/2026',
    ultimaActividad: '18/08/2026',
    proximaActividad: 'Junta de aclaraciones técnicas con superintendencia',
    fechaProximaActividad: '20/08/2026',
    licitacionAsociada: 'LIC-2026-008',
    cotizacionAsociada: 'FSPM-2026-0180',
    driveFolder: 'FSPM CRM/LICITACIONES/2026/PEMEX_SPCI',
  },
  {
    id: 'OPP-003',
    codigo: 'OPP-2026-0035',
    cliente: 'CFE — Comisión Federal de Electricidad',
    clienteId: 'CLI-001',
    proyecto: 'Suministro Anual Concentrado Ecológico FireAde 2000 (15,000 L)',
    responsable: 'Alfonso',
    producto: 'Agente Extintor FireAde',
    montoEstimado: 2100000,
    probabilidad: 70,
    etapa: 'NEGOCIACIÓN',
    fechaEstimadaCierre: '15/09/2026',
    ultimaActividad: '16/08/2026',
    proximaActividad: 'Validación de entrega de certificados UL y NFPA',
    fechaProximaActividad: '23/08/2026',
    cotizacionAsociada: 'FSPM-2026-0178',
    driveFolder: 'FSPM CRM/CLIENTES/CFE/02_Cotizaciones',
  },
  {
    id: 'OPP-004',
    codigo: 'OPP-2026-0029',
    cliente: 'ASA — Aeropuertos y Servicios Auxiliares',
    clienteId: 'CLI-003',
    proyecto: 'Mantenimiento Preventivo y Mayor Sistemas SPCI Red Aeropuertos',
    responsable: 'Alfonso',
    producto: 'Mantenimiento SPCI',
    montoEstimado: 1800000,
    probabilidad: 40,
    etapa: 'OPORTUNIDAD',
    fechaEstimadaCierre: '20/10/2026',
    ultimaActividad: '11/08/2026',
    proximaActividad: 'Elaborar propuesta técnica preliminar para licitación',
    fechaProximaActividad: '24/08/2026',
    licitacionAsociada: 'LIC-2026-009',
    driveFolder: 'FSPM CRM/CLIENTES/ASA/02_Cotizaciones',
  },
  {
    id: 'OPP-005',
    codigo: 'OPP-2026-0025',
    cliente: 'Ternium México',
    clienteId: 'CLI-005',
    proyecto: 'Modernización de Rociadores y Bombas Contra Incendio Planta N.L.',
    responsable: 'Edgar',
    producto: 'Monitores & Rociadores',
    montoEstimado: 3200000,
    probabilidad: 85,
    etapa: 'GANADO',
    fechaEstimadaCierre: '05/08/2026',
    ultimaActividad: '05/08/2026',
    proximaActividad: 'Kickoff de ingeniería e inicio de suministro',
    fechaProximaActividad: '28/08/2026',
    cotizacionAsociada: 'FSPM-2026-0172',
    driveFolder: 'FSPM CRM/CLIENTES/TERNIUM/03_Contratos',
  },
  {
    id: 'OPP-006',
    codigo: 'OPP-2026-0042',
    cliente: 'Protección Civil CDMX (SGIRPC)',
    clienteId: 'CLI-004',
    proyecto: '3 Unidades Ligeras Pick-up 4x4 con Tanque CAFS 300L',
    responsable: 'Fernanda Reza',
    producto: 'Unidad Móvil FireAde',
    montoEstimado: 1450000,
    probabilidad: 50,
    etapa: 'CALIFICADO',
    fechaEstimadaCierre: '30/10/2026',
    ultimaActividad: '14/08/2026',
    proximaActividad: 'Agendar prueba de campo en el Heroico Cuerpo de Bomberos',
    fechaProximaActividad: '26/08/2026',
    driveFolder: 'FSPM CRM/CLIENTES/PC_CDMX/02_Cotizaciones',
  },
  {
    id: 'OPP-007',
    codigo: 'OPP-2026-0033',
    cliente: 'Grupo México (División Minería)',
    clienteId: 'CLI-006',
    proyecto: 'Protección Integral Flota de Camiones de Extracción Minera (CAFS)',
    responsable: 'Alfonso',
    producto: 'Sistema CAFS',
    montoEstimado: 4100000,
    probabilidad: 30,
    etapa: 'CONTACTADO',
    fechaEstimadaCierre: '15/11/2026',
    ultimaActividad: '08/08/2026',
    proximaActividad: 'Reunión virtual con superintendente de seguridad minera',
    fechaProximaActividad: '27/08/2026',
    driveFolder: 'FSPM CRM/CLIENTES/GRUPO_MEXICO/02_Cotizaciones',
  },
  {
    id: 'OPP-008',
    codigo: 'OPP-2026-0044',
    cliente: 'Administración Portuaria Veracruz (ASIPONA)',
    clienteId: 'CLI-007',
    proyecto: 'Sistema de Enfriamiento y Monitores de Espuma para Muelle 4',
    responsable: 'Luis Gerardo',
    producto: 'Monitores & Rociadores',
    montoEstimado: 2500000,
    probabilidad: 20,
    etapa: 'NUEVO',
    fechaEstimadaCierre: '30/11/2026',
    ultimaActividad: '11/08/2026',
    proximaActividad: 'Descargar bases y términos de referencia',
    fechaProximaActividad: '22/08/2026',
    licitacionAsociada: 'LIC-2026-011',
    driveFolder: 'FSPM CRM/CLIENTES/ASIPONA_VERACRUZ',
  }
];

// ── 4. COTIZACIONES ──
export type EstadoCotizacion =
  | 'Borrador'
  | 'Enviada'
  | 'Seguimiento'
  | 'Negociación'
  | 'Aceptada'
  | 'Rechazada'
  | 'Vencida';

export interface CotizacionFSPM {
  id: string;
  noCotizacion: string;
  cliente: string;
  clienteId: string;
  oportunidad: string;
  oportunidadId: string;
  fecha: string;
  montoSinIva: number;
  iva: number;
  total: number;
  vigenciaDias: number;
  diasRestantes: number;
  ejecutivo: string;
  estado: EstadoCotizacion;
  archivoPdf: string;
  archivoExcel: string;
  proximoSeguimiento: string;
  diasSinSeguimiento: number;
}

export const COTIZACIONES_FSPM: CotizacionFSPM[] = [
  {
    id: 'COT-001',
    noCotizacion: 'FSPM-2026-0183',
    cliente: 'CFE — Comisión Federal de Electricidad',
    clienteId: 'CLI-001',
    oportunidad: 'Equipamiento Unidades Móviles FireAde',
    oportunidadId: 'OPP-001',
    fecha: '18/08/2026',
    montoSinIva: 890000,
    iva: 142400,
    total: 1032400,
    vigenciaDias: 30,
    diasRestantes: 27,
    ejecutivo: 'Fernanda Reza',
    estado: 'Enviada',
    archivoPdf: 'FSPM-2026-0183_Propuesta_CFE.pdf',
    archivoExcel: 'FSPM-2026-0183_Costeo_FireAde.xlsx',
    proximoSeguimiento: '22/08/2026',
    diasSinSeguimiento: 3,
  },
  {
    id: 'COT-002',
    noCotizacion: 'FSPM-2026-0180',
    cliente: 'PEMEX — Petróleos Mexicanos',
    clienteId: 'CLI-002',
    oportunidad: 'Sistemas CAFS Plataformas Marinas',
    oportunidadId: 'OPP-002',
    fecha: '10/08/2026',
    montoSinIva: 4500000,
    iva: 720000,
    total: 5220000,
    vigenciaDias: 45,
    diasRestantes: 35,
    ejecutivo: 'Luis Gerardo',
    estado: 'Negociación',
    archivoPdf: 'FSPM-2026-0180_Propuesta_PEMEX_CAFS.pdf',
    archivoExcel: 'FSPM-2026-0180_Costeo_CAFS.xlsx',
    proximoSeguimiento: '20/08/2026',
    diasSinSeguimiento: 2,
  },
  {
    id: 'COT-003',
    noCotizacion: 'FSPM-2026-0178',
    cliente: 'CFE — Comisión Federal de Electricidad',
    clienteId: 'CLI-001',
    oportunidad: 'Concentrado FireAde 2000 (15k L)',
    oportunidadId: 'OPP-003',
    fecha: '05/08/2026',
    montoSinIva: 2100000,
    iva: 336000,
    total: 2436000,
    vigenciaDias: 30,
    diasRestantes: 14,
    ejecutivo: 'Alfonso',
    estado: 'Seguimiento',
    archivoPdf: 'FSPM-2026-0178_FireAde_CFE.pdf',
    archivoExcel: 'FSPM-2026-0178_Costeo_Quimico.xlsx',
    proximoSeguimiento: '23/08/2026',
    diasSinSeguimiento: 7, // ALERTA
  },
  {
    id: 'COT-004',
    noCotizacion: 'FSPM-2026-0172',
    cliente: 'Ternium México',
    clienteId: 'CLI-005',
    oportunidad: 'Modernización Rociadores y Bombas',
    oportunidadId: 'OPP-005',
    fecha: '20/07/2026',
    montoSinIva: 3200000,
    iva: 512000,
    total: 3712000,
    vigenciaDias: 30,
    diasRestantes: 0,
    ejecutivo: 'Edgar',
    estado: 'Aceptada',
    archivoPdf: 'FSPM-2026-0172_Ternium_SPCI.pdf',
    archivoExcel: 'FSPM-2026-0172_Costeo_Bombas.xlsx',
    proximoSeguimiento: 'Cerrado',
    diasSinSeguimiento: 0,
  },
  {
    id: 'COT-005',
    noCotizacion: 'FSPM-2026-0165',
    cliente: 'Grupo México (División Minería)',
    clienteId: 'CLI-006',
    oportunidad: 'Sistema Contra Incendio Mina Buenavista',
    oportunidadId: 'OPP-007',
    fecha: '15/07/2026',
    montoSinIva: 1200000,
    iva: 192000,
    total: 1392000,
    vigenciaDias: 30,
    diasRestantes: 0,
    ejecutivo: 'Alfonso',
    estado: 'Rechazada',
    archivoPdf: 'FSPM-2026-0165_GrupoMexico.pdf',
    archivoExcel: 'FSPM-2026-0165_Costeo.xlsx',
    proximoSeguimiento: 'Recontactar Q4',
    diasSinSeguimiento: 15,
  }
];

// ── 5. LICITACIONES & CHECKLIST ──
export type EstadoChecklist = 'LISTO' | 'EN_REVISION' | 'URGENTE' | 'PENDIENTE';

export interface ChecklistDocumento {
  id: string;
  documento: string;
  responsable: string;
  estado: EstadoChecklist;
  archivo?: string;
  notas?: string;
}

export interface LicitacionFSPM {
  id: string;
  noProcedimiento: string;
  dependencia: string;
  tipo: 'Licitación pública nacional' | 'Licitación pública internacional' | 'Invitación a cuando menos 3' | 'Adjudicación directa';
  plataforma: 'ComprasMX' | 'Ariba' | 'Portal PEMEX' | 'Tienda Digital' | 'ComprasMX / Ariba' | string;
  objeto: string;
  fechaPublicacion: string;
  juntaAclaraciones: string;
  presentacionPropuestas: string;
  fallo: string;
  montoEstimado: number;
  responsable: string;
  estado: 'Análisis' | 'Preparación' | 'Presentada' | 'Evaluación' | 'Adjudicada' | 'No adjudicada';
  probabilidad: number;
  competidorConocido: string;
  horasRestantes: number; // para semáforo crítico
  semaforo: 'CRITICO' | 'ALERTA' | 'OK'; // <72h (rojo), 3-10d (ámbar), >10d (verde)
  driveFolder: string;
  checklist: ChecklistDocumento[];
}

export const LICITACIONES_FSPM: LicitacionFSPM[] = [
  {
    id: 'LIC-001',
    noProcedimiento: 'LA-18-T0O-018T0O999-N-14-2026',
    dependencia: 'PEMEX — Petróleos Mexicanos',
    tipo: 'Licitación pública nacional',
    plataforma: 'ComprasMX / Ariba',
    objeto: 'Servicio Integral de Mantenimiento a Sistemas de Protección Contra Incendio (SPCI) en Complejos Procesadores',
    fechaPublicacion: '01/08/2026',
    juntaAclaraciones: '12/08/2026',
    presentacionPropuestas: '22/08/2026 10:00',
    fallo: '05/09/2026',
    montoEstimado: 6800000,
    responsable: 'Luis Gerardo',
    estado: 'Preparación',
    probabilidad: 65,
    competidorConocido: 'Servicios de Seguridad Industrial del Golfo / Tyco',
    horasRestantes: 36, // CRÍTICO: <72 horas
    semaforo: 'CRITICO',
    driveFolder: 'FSPM CRM/LICITACIONES/2026/PEMEX_SPCI_COMPLEJOS',
    checklist: [
      { id: 'CK-1', documento: 'Anexo Técnico', responsable: 'Alfonso', estado: 'LISTO', archivo: 'Anexo_Tecnico_PEMEX_vFinal.pdf' },
      { id: 'CK-2', documento: 'Propuesta Económica', responsable: 'Edgar', estado: 'LISTO', archivo: 'Propuesta_Economica_PEMEX.xlsx' },
      { id: 'CK-3', documento: 'Carta de Distribuidor Autorizado FireAde', responsable: 'Fernanda Reza', estado: 'EN_REVISION', notas: 'Validando apostilla' },
      { id: 'CK-4', documento: 'Certificado ISO 9001:2015', responsable: 'Administración', estado: 'LISTO', archivo: 'ISO_9001_FSPM_2026.pdf' },
      { id: 'CK-5', documento: 'Opinión Positiva SAT 32-D', responsable: 'Administración', estado: 'URGENTE', notas: 'Descargar versión vigente al día de entrega' },
      { id: 'CK-6', documento: 'Póliza / Garantía de Seriedad', responsable: 'Luis Gerardo', estado: 'PENDIENTE', notas: 'Afianzadora emitiendo' },
      { id: 'CK-7', documento: 'Firma Electrónica e-Firma', responsable: 'Luis Gerardo', estado: 'LISTO' }
    ]
  },
  {
    id: 'LIC-002',
    noProcedimiento: 'CFE-0001-LAPP-0034-2026',
    dependencia: 'CFE — Comisión Federal de Electricidad',
    tipo: 'Licitación pública nacional',
    plataforma: 'ComprasMX',
    objeto: 'Adquisición de Unidades Móviles Ligeras Contra Incendio y Agentes Espumógenos de Alta Eficiencia',
    fechaPublicacion: '08/08/2026',
    juntaAclaraciones: '18/08/2026',
    presentacionPropuestas: '29/08/2026 12:00',
    fallo: '12/09/2026',
    montoEstimado: 3400000,
    responsable: 'Fernanda Reza',
    estado: 'Preparación',
    probabilidad: 75,
    competidorConocido: 'Equipos Móviles de Emergencia S.A.',
    horasRestantes: 180, // ALERTA: 3-10 días (7.5 días)
    semaforo: 'ALERTA',
    driveFolder: 'FSPM CRM/LICITACIONES/2026/CFE_UNIDADES_MOVILES',
    checklist: [
      { id: 'CK-201', documento: 'Anexo Técnico y Fichas FireAde', responsable: 'Alfonso', estado: 'LISTO' },
      { id: 'CK-202', documento: 'Propuesta Económica Detallada', responsable: 'Edgar', estado: 'EN_REVISION' },
      { id: 'CK-203', documento: 'Carta Distribuidor', responsable: 'Fernanda Reza', estado: 'LISTO' },
      { id: 'CK-204', documento: 'Acreditaciones NFPA y UL', responsable: 'Alfonso', estado: 'LISTO' },
      { id: 'CK-205', documento: 'Opinión SAT 32-D', responsable: 'Administración', estado: 'LISTO' },
      { id: 'CK-206', documento: 'Garantía', responsable: 'Luis Gerardo', estado: 'EN_REVISION' },
      { id: 'CK-207', documento: 'Firma Electrónica', responsable: 'Luis Gerardo', estado: 'LISTO' }
    ]
  },
  {
    id: 'LIC-003',
    noProcedimiento: 'ASA-LIC-SPCI-0012-2026',
    dependencia: 'ASA — Aeropuertos y Servicios Auxiliares',
    tipo: 'Invitación a cuando menos 3',
    plataforma: 'ComprasMX',
    objeto: 'Póliza Anual de Mantenimiento Preventivo y Correctivo a Vehículos de Rescate y Extinción de Incendios (CREI)',
    fechaPublicacion: '15/08/2026',
    juntaAclaraciones: '24/08/2026',
    presentacionPropuestas: '08/09/2026 11:00',
    fallo: '20/09/2026',
    montoEstimado: 2100000,
    responsable: 'Alfonso',
    estado: 'Análisis',
    probabilidad: 55,
    competidorConocido: 'Rosenbauer México / Oshkosh',
    horasRestantes: 440, // OK: >10 días
    semaforo: 'OK',
    driveFolder: 'FSPM CRM/LICITACIONES/2026/ASA_CREI_MANTTO',
    checklist: [
      { id: 'CK-301', documento: 'Análisis de Bases', responsable: 'Alfonso', estado: 'EN_REVISION' },
      { id: 'CK-302', documento: 'Anexo Técnico', responsable: 'Alfonso', estado: 'PENDIENTE' },
      { id: 'CK-303', documento: 'Propuesta Económica', responsable: 'Edgar', estado: 'PENDIENTE' },
      { id: 'CK-304', documento: 'Documentación Legal y Fiscal', responsable: 'Administración', estado: 'LISTO' }
    ]
  },
  {
    id: 'LIC-004',
    noProcedimiento: 'ASIPONA-VER-OBR-0045-2026',
    dependencia: 'Administración Portuaria Veracruz (ASIPONA)',
    tipo: 'Licitación pública nacional',
    plataforma: 'ComprasMX',
    objeto: 'Instalación de Sistema de Monitores de Enfriamiento y Espuma en Muelle de Hidrocarburos',
    fechaPublicacion: '14/08/2026',
    juntaAclaraciones: '26/08/2026',
    presentacionPropuestas: '10/09/2026 10:00',
    fallo: '25/09/2026',
    montoEstimado: 2500000,
    responsable: 'Luis Gerardo',
    estado: 'Análisis',
    probabilidad: 45,
    competidorConocido: 'Sistemas Marinos Contra Incendio S.A.',
    horasRestantes: 490, // OK: >10 días
    semaforo: 'OK',
    driveFolder: 'FSPM CRM/LICITACIONES/2026/ASIPONA_VER_MONITORES',
    checklist: [
      { id: 'CK-401', documento: 'Visita de Obra en Muelle', responsable: 'Luis Gerardo', estado: 'PENDIENTE' },
      { id: 'CK-402', documento: 'Levantamiento Isométrico', responsable: 'Alfonso', estado: 'PENDIENTE' },
      { id: 'CK-403', documento: 'Propuesta Económica', responsable: 'Edgar', estado: 'PENDIENTE' }
    ]
  }
];

// ── 6. ACTIVIDADES Y SEGUIMIENTOS ──
export type TipoActividad =
  | 'Llamada'
  | 'Email'
  | 'Reunión'
  | 'WhatsApp'
  | 'Seguimiento'
  | 'Entrega Documental'
  | 'Visita Técnica'
  | 'Tarea';

export interface ActividadFSPM {
  id: string;
  tipo: TipoActividad;
  cliente: string;
  contacto: string;
  ejecutivo: string;
  fechaRealizada: string;
  resultado: string;
  proximaAccion: string;
  fechaProximaAccion: string;
  oportunidadAsociada?: string;
  estado: 'Realizada' | 'Pendiente' | 'Vencida';
}

export const ACTIVIDADES_FSPM: ActividadFSPM[] = [
  {
    id: 'ACT-001',
    tipo: 'Reunión',
    cliente: 'CFE — Comisión Federal de Electricidad',
    contacto: 'Ing. Juan Pérez Morales',
    ejecutivo: 'Fernanda Reza',
    fechaRealizada: '17/08/2026',
    resultado: 'Se presentó el análisis comparativo de tiempo de extinción FireAde vs espuma convencional.',
    proximaAccion: 'Enviar adenda técnica con pruebas certificadas UL',
    fechaProximaAccion: '22/08/2026',
    oportunidadAsociada: 'OPP-2026-0041',
    estado: 'Pendiente',
  },
  {
    id: 'ACT-002',
    tipo: 'Llamada',
    cliente: 'PEMEX — Petróleos Mexicanos',
    contacto: 'Ing. Roberto Silva Garza',
    ejecutivo: 'Luis Gerardo',
    fechaRealizada: '18/08/2026',
    resultado: 'Se confirmaron los puntos críticos para la junta de aclaraciones del procedimiento SPCI.',
    proximaAccion: 'Asistir a junta de aclaraciones en plataforma ComprasMX',
    fechaProximaAccion: '20/08/2026',
    oportunidadAsociada: 'OPP-2026-0038',
    estado: 'Vencida', // ALERTA
  },
  {
    id: 'ACT-003',
    tipo: 'WhatsApp',
    contacto: 'Ing. Gustavo Alarcón',
    cliente: 'Ternium México',
    ejecutivo: 'Edgar',
    fechaRealizada: '02/08/2026',
    resultado: 'Cliente confirmó firma de orden de compra para rociadores.',
    proximaAccion: 'Coordinar entrega de fianza de cumplimiento con Administración',
    fechaProximaAccion: '21/08/2026',
    oportunidadAsociada: 'OPP-2026-0025',
    estado: 'Pendiente',
  },
  {
    id: 'ACT-004',
    tipo: 'Visita Técnica',
    cliente: 'ASA — Aeropuertos y Servicios Auxiliares',
    contacto: 'Mtro. Carlos Méndez Treviño',
    ejecutivo: 'Alfonso',
    fechaRealizada: '10/08/2026',
    resultado: 'Inspección de 4 camiones Oshkosh en hangar CREI AICM.',
    proximaAccion: 'Generar reporte de diagnóstico de bombas y boquillas',
    fechaProximaAccion: '24/08/2026',
    oportunidadAsociada: 'OPP-2026-0029',
    estado: 'Pendiente',
  },
  {
    id: 'ACT-005',
    tipo: 'Entrega Documental',
    cliente: 'CFE — Comisión Federal de Electricidad',
    contacto: 'Lic. Claudia Morales Soto',
    ejecutivo: 'Fernanda Reza',
    fechaRealizada: '12/08/2026',
    resultado: 'Se radicó físicamente carpeta de acreditación técnica.',
    proximaAccion: 'Descargar acuse sellado y subir a Drive',
    fechaProximaAccion: '19/08/2026',
    estado: 'Vencida', // ALERTA
  }
];

// ── 7. GOOGLE DRIVE ESTRUCTURA ──
export interface CarpetaDrive {
  id: string;
  nombre: string;
  ruta: string;
  tipo: 'carpeta' | 'archivo';
  subelementos?: CarpetaDrive[];
  tamano?: string;
  ultimaModificacion?: string;
  extension?: string;
}

export const ESTRUCTURA_DRIVE_FSPM: CarpetaDrive = {
  id: 'DRV-ROOT',
  nombre: 'FSPM CRM (Google Drive)',
  ruta: 'FSPM CRM',
  tipo: 'carpeta',
  subelementos: [
    {
      id: 'DRV-CLI',
      nombre: 'CLIENTES',
      ruta: 'FSPM CRM/CLIENTES',
      tipo: 'carpeta',
      subelementos: [
        {
          id: 'DRV-CFE',
          nombre: 'CFE',
          ruta: 'FSPM CRM/CLIENTES/CFE',
          tipo: 'carpeta',
          subelementos: [
            { id: 'DRV-CFE-1', nombre: '01_Contactos', ruta: 'FSPM CRM/CLIENTES/CFE/01_Contactos', tipo: 'carpeta' },
            { id: 'DRV-CFE-2', nombre: '02_Cotizaciones', ruta: 'FSPM CRM/CLIENTES/CFE/02_Cotizaciones', tipo: 'carpeta' },
            { id: 'DRV-CFE-3', nombre: '03_Contratos', ruta: 'FSPM CRM/CLIENTES/CFE/03_Contratos', tipo: 'carpeta' },
            { id: 'DRV-CFE-4', nombre: '04_Documentación', ruta: 'FSPM CRM/CLIENTES/CFE/04_Documentación', tipo: 'carpeta' },
          ]
        },
        {
          id: 'DRV-PEMEX',
          nombre: 'PEMEX',
          ruta: 'FSPM CRM/CLIENTES/PEMEX',
          tipo: 'carpeta',
          subelementos: [
            { id: 'DRV-PMX-1', nombre: '01_Contactos', ruta: 'FSPM CRM/CLIENTES/PEMEX/01_Contactos', tipo: 'carpeta' },
            { id: 'DRV-PMX-2', nombre: '02_Cotizaciones', ruta: 'FSPM CRM/CLIENTES/PEMEX/02_Cotizaciones', tipo: 'carpeta' },
            { id: 'DRV-PMX-3', nombre: '03_Contratos', ruta: 'FSPM CRM/CLIENTES/PEMEX/03_Contratos', tipo: 'carpeta' },
            { id: 'DRV-PMX-4', nombre: '04_Documentación', ruta: 'FSPM CRM/CLIENTES/PEMEX/04_Documentación', tipo: 'carpeta' },
          ]
        },
        {
          id: 'DRV-ASA',
          nombre: 'ASA',
          ruta: 'FSPM CRM/CLIENTES/ASA',
          tipo: 'carpeta',
          subelementos: [
            { id: 'DRV-ASA-1', nombre: '01_Contactos', ruta: 'FSPM CRM/CLIENTES/ASA/01_Contactos', tipo: 'carpeta' },
            { id: 'DRV-ASA-2', nombre: '02_Cotizaciones', ruta: 'FSPM CRM/CLIENTES/ASA/02_Cotizaciones', tipo: 'carpeta' },
          ]
        }
      ]
    },
    {
      id: 'DRV-LIC',
      nombre: 'LICITACIONES',
      ruta: 'FSPM CRM/LICITACIONES',
      tipo: 'carpeta',
      subelementos: [
        {
          id: 'DRV-LIC-2026',
          nombre: '2026',
          ruta: 'FSPM CRM/LICITACIONES/2026',
          tipo: 'carpeta',
          subelementos: [
            {
              id: 'DRV-LIC-PMX',
              nombre: 'PEMEX_SPCI_COMPLEJOS',
              ruta: 'FSPM CRM/LICITACIONES/2026/PEMEX_SPCI_COMPLEJOS',
              tipo: 'carpeta',
              subelementos: [
                { id: 'DRV-LP-1', nombre: '01_Bases', ruta: 'FSPM CRM/LICITACIONES/2026/PEMEX_SPCI_COMPLEJOS/01_Bases', tipo: 'carpeta' },
                { id: 'DRV-LP-2', nombre: '02_Anexos', ruta: 'FSPM CRM/LICITACIONES/2026/PEMEX_SPCI_COMPLEJOS/02_Anexos', tipo: 'carpeta' },
                { id: 'DRV-LP-3', nombre: '03_Tecnica', ruta: 'FSPM CRM/LICITACIONES/2026/PEMEX_SPCI_COMPLEJOS/03_Tecnica', tipo: 'carpeta' },
                { id: 'DRV-LP-4', nombre: '04_Economica', ruta: 'FSPM CRM/LICITACIONES/2026/PEMEX_SPCI_COMPLEJOS/04_Economica', tipo: 'carpeta' },
                { id: 'DRV-LP-5', nombre: '05_Legal', ruta: 'FSPM CRM/LICITACIONES/2026/PEMEX_SPCI_COMPLEJOS/05_Legal', tipo: 'carpeta' },
                { id: 'DRV-LP-6', nombre: '06_Final', ruta: 'FSPM CRM/LICITACIONES/2026/PEMEX_SPCI_COMPLEJOS/06_Final', tipo: 'carpeta' },
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'DRV-REP',
      nombre: 'REPORTES',
      ruta: 'FSPM CRM/REPORTES',
      tipo: 'carpeta',
      subelementos: [
        { id: 'DRV-REP-1', nombre: 'Reporte_Direccion_Q3_2026.pdf', ruta: 'FSPM CRM/REPORTES/Reporte_Direccion_Q3_2026.pdf', tipo: 'archivo', tamano: '2.4 MB', extension: 'pdf' },
        { id: 'DRV-REP-2', nombre: 'Scorecard_Ventas_Agosto_2026.xlsx', ruta: 'FSPM CRM/REPORTES/Scorecard_Ventas_Agosto_2026.xlsx', tipo: 'archivo', tamano: '1.1 MB', extension: 'xlsx' }
      ]
    }
  ]
};

// ── 8. DATOS ESTADÍSTICOS & REPORTES DIRECCIÓN ──
export const METRICAS_DIRECCION = {
  pipelineTotal: 24800000,
  pipelinePonderado: 15620000,
  cotizacionesEnviadasTotal: 8450000,
  ventasGanadasMes: 3400000,
  ventasPerdidasMes: 1200000,
  licitacionesActivasMonto: 14800000,
  licitacionesAdjudicadasMonto: 5600000,
  tasaConversion: 73.9, // porcentaje
  
  // Pipeline Comercial por Etapas
  pipelineEtapas: [
    { etapa: 'Prospecto', valor: 52, monto: 31200000, color: '#64748B' },
    { etapa: 'Contactado', valor: 45, monto: 28500000, color: '#0284C7' },
    { etapa: 'Calificado', valor: 38, monto: 26100000, color: '#0F172A' },
    { etapa: 'Oportunidad', valor: 41, monto: 24800000, color: '#D97706' },
    { etapa: 'Cotizado', valor: 23, monto: 18400000, color: '#D32F2F' },
    { etapa: 'Negociación', valor: 14, monto: 12900000, color: '#9A0007' },
    { etapa: 'Ganado ✅', valor: 8, monto: 3400000, color: '#10B981' },
  ],

  // Distribución por Sector de Clientes
  distribucionSectores: [
    { name: 'Gobierno Federal', value: 38, color: '#D32F2F', monto: '$9.4M' },
    { name: 'Empresa Privada', value: 27, color: '#0F172A', monto: '$6.7M' },
    { name: 'Gobierno Estatal', value: 15, color: '#0284C7', monto: '$3.7M' },
    { name: 'Minería / Metalurgia', value: 12, color: '#D97706', monto: '$3.0M' },
    { name: 'Portuario / Otros', value: 8, color: '#10B981', monto: '$2.0M' },
  ],

  // Ventas por Ejecutivo
  ventasPorEjecutivo: [
    { ejecutivo: 'Fernanda Reza', ganados: 3.4, pipeline: 9.2, licitaciones: 2 },
    { ejecutivo: 'Alfonso', ganados: 2.1, pipeline: 6.8, licitaciones: 3 },
    { ejecutivo: 'Luis Gerardo', ganados: 1.8, pipeline: 5.1, licitaciones: 4 },
    { ejecutivo: 'Edgar', ganados: 3.2, pipeline: 3.7, licitaciones: 1 },
  ],

  // Ventas por Línea de Producto
  ventasPorProducto: [
    { producto: 'Unidades Móviles FireAde', monto: 11.4, porcentaje: 46 },
    { producto: 'Sistemas CAFS', monto: 7.2, porcentaje: 29 },
    { producto: 'Mantenimiento SPCI', monto: 4.1, porcentaje: 17 },
    { producto: 'Equipamiento & EPP', monto: 2.1, porcentaje: 8 },
  ],

  // Histórico mensual Cotizado vs Ganado
  historicoMensual: [
    { mes: 'Mar', cotizado: 6.2, ganado: 1.8, pipeline: 18.5 },
    { mes: 'Abr', cotizado: 7.1, ganado: 2.3, pipeline: 19.8 },
    { mes: 'May', cotizado: 8.4, ganado: 2.9, pipeline: 21.2 },
    { mes: 'Jun', cotizado: 7.9, ganado: 3.1, pipeline: 22.6 },
    { mes: 'Jul', cotizado: 9.2, ganado: 3.2, pipeline: 23.9 },
    { mes: 'Ago', cotizado: 8.9, ganado: 3.4, pipeline: 24.8 },
  ],

  // Top 10 Oportunidades
  topOportunidades: [
    { cliente: 'PEMEX', proyecto: 'CAFS Plataformas Marinas', monto: '$4.5 M', prob: '60%', ejecutivo: 'Luis Gerardo' },
    { cliente: 'CFE', proyecto: 'FireAde Concentrado 2000', monto: '$2.1 M', prob: '70%', ejecutivo: 'Alfonso' },
    { cliente: 'ASA', proyecto: 'Mantenimiento Red CREI', monto: '$1.8 M', prob: '40%', ejecutivo: 'Alfonso' },
    { cliente: 'Ternium', proyecto: 'Modernización Rociadores', monto: '$3.2 M', prob: '85%', ejecutivo: 'Edgar' },
    { cliente: 'PC CDMX', proyecto: 'Unidades Ligeras 4x4', monto: '$1.45 M', prob: '50%', ejecutivo: 'Fernanda Reza' },
    { cliente: 'Grupo México', proyecto: 'Camiones Extracción CAFS', monto: '$4.1 M', prob: '30%', ejecutivo: 'Alfonso' },
    { cliente: 'ASIPONA Ver.', proyecto: 'Monitores Muelle 4', monto: '$2.5 M', prob: '20%', ejecutivo: 'Luis Gerardo' },
    { cliente: 'CFE', proyecto: 'Unidades Móviles FireAde', monto: '$890 k', prob: '60%', ejecutivo: 'Fernanda Reza' },
  ]
};
