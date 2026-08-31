// config/empresaConfig.js
// Configuración de la empresa cliente actual de la plataforma MAYIA: Gas Station Inteligente

export const EMPRESA_CONFIG = {
  // Información básica
  nombre: 'Gas Station Inteligente',
  nombreCompleto: 'Estación de Servicio Inteligente 4.0, S.A. de C.V.',
  grupoEmpresarial: 'Red Gas Station Inteligente',
  directorGeneral: 'Dirección General de Operaciones',
  industria: 'Estaciones de Servicio Inteligentes, Telemetría IoT & Combustibles',
  fundacion: 2022,
  pais: 'México',
  slogan: 'Telemetría IoT, Precios Dinámicos & Automatización IA',

  // Descripción corporativa
  descripcion: 'Ecosistema integral para gasolineras inteligentes 4.0: monitoreo de tanques 3D en tiempo real, detección de fugas por IA, trazabilidad blockchain, motor de precios dinámicos, seguridad VMS con ALPR, integración ERP Odoo, telemática de flotas B2B, fidelización móvil, cargadores EV ultrarrápidos y gemelos digitales con mantenimiento predictivo.',

  // Datos operativos
  operaciones: {
    volumenDespachadoHoy: '48,250 L',
    ventasTotalesDia: '$1,124,500 MXN',
    bombasOperativas: '8 / 8 dispensarios',
    capacidadTotalTanques: '160,000 L',
    vehiculosAtendidos: '1,240 vehículos',
    eficienciaSolar: '94.2%',
    tiempoPromedioEspera: '2.4 min',
    margenPromedioLitro: '$2.85 MXN',
    modulosActivos: 8
  },

  // Marcas del portafolio
  marcas: [
    'Gas Station Inteligente',
    'Magna Ultra 87',
    'Premium Pro 91',
    'EcoDiésel Max',
    'GNR BioGas',
    'MAYIA Fuel Copilot'
  ],

  // Clientes y flotas estratégicas
  clientesPrincipales: [
    'Flotilla Logística FEMSA',
    'Transportes Castores',
    'Bimbo Distribución',
    'DHL Express México',
    'Flota Municipal y Patrullas',
    'Uber / Didi Fleet Hub'
  ],

  // Contactos corporativos
  contacto: {
    sitioWeb: 'https://www.gasstationinteligente.mx',
    atencionCliente: '+52 55 5500 4000',
    whatsapp: '+52 55 9988 7766',
    plataforma: 'IoT Cloud + Edge SDI + Odoo ERP',
  }
};

export function getEmpresaInfo(campo) {
  return EMPRESA_CONFIG[campo] || null;
}

export function getDescripcionContextual() {
  const { nombreCompleto, slogan, operaciones } = EMPRESA_CONFIG;
  return `${nombreCompleto} ("${slogan}") opera con telemetría IoT de ${operaciones.capacidadTotalTanques} en tanques, ${operaciones.bombasOperativas} y optimización con IA agéntica MAYIA.`;
}

export default EMPRESA_CONFIG;