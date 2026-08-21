// config/empresaConfig.js
// Configuración de la empresa cliente actual de la plataforma MAYIA: FSPM (Fire Safety & Protection Management)

export const EMPRESA_CONFIG = {
  // Información básica
  nombre: 'FSPM',
  nombreCompleto: 'Fire Safety & Protection Management, S.A. de C.V.',
  grupoEmpresarial: 'FSPM Soluciones Contra Incendio',
  directorGeneral: 'Dirección General FSPM',
  industria: 'Seguridad Industrial, Sistemas Contra Incendio & Licitaciones',
  fundacion: 2015,
  pais: 'México',
  slogan: 'CRM Comercial, Licitaciones & Protección Contra Incendio',

  // Descripción corporativa
  descripcion: 'Empresa mexicana líder en ingeniería, suministro y mantenimiento de sistemas de protección contra incendio (SPCI), unidades móviles de intervención rápida FireAde, sistemas CAFS de espuma comprimida, rociadores y consultoría en licitaciones públicas y privadas para dependencias clave como PEMEX, CFE, ASA, gobiernos y sector industrial.',

  // Datos operativos del CRM FSPM
  operaciones: {
    pipelineActivo: '$24.8M MXN',
    oportunidadesActivas: 41,
    cotizacionesAbiertas: '$8.45M MXN (23 cotizaciones)',
    licitacionesActivas: '$14.8M MXN (8 procedimientos)',
    ventasGanadasMes: '$3.4M MXN',
    tasaConversion: '73.9%',
    lineasNegocio: [
      'Unidades Móviles FireAde 4x4',
      'Sistemas CAFS (Compressed Air Foam Systems)',
      'Mantenimiento Integral SPCI a Redes y Bombas',
      'Agente Extintor Ecológico FireAde 2000',
      'Pólizas de Servicio CREI para Aeropuertos (ASA)'
    ]
  },

  // Marcas del portafolio
  marcas: [
    'FSPM Fire Safety',
    'FireAde 2000',
    'CAFS Protection Systems',
    'SPCI Pro Maintenance',
    'MAYIA FSPM Copilot'
  ],

  // Clientes estratégicos
  clientesPrincipales: [
    'CFE (Comisión Federal de Electricidad)',
    'PEMEX (Petróleos Mexicanos)',
    'ASA (Aeropuertos y Servicios Auxiliares)',
    'Protección Civil CDMX (SGIRPC)',
    'Ternium México',
    'Grupo México',
    'ASIPONA Veracruz'
  ],

  // Contactos corporativos
  contacto: {
    sitioWeb: 'https://www.fspm.mx',
    atencionCliente: '+52 55 5229 0000',
    whatsapp: '+52 55 1234 5678',
    plataforma: 'Google Workspace + AppSheet FSPM CRM',
  }
};

export function getEmpresaInfo(campo) {
  return EMPRESA_CONFIG[campo] || null;
}

export function getDescripcionContextual() {
  const { nombreCompleto, slogan, operaciones } = EMPRESA_CONFIG;
  return `${nombreCompleto} ("${slogan}") gestiona un pipeline comercial de ${operaciones.pipelineActivo} y ${operaciones.licitacionesActivas} en licitaciones activas en México con soporte de IA MAYIA.`;
}

export default EMPRESA_CONFIG;