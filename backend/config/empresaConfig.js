// config/empresaConfig.js
// Configuración de la empresa cliente actual de la plataforma MAYIA: Totalplay Telecomunicaciones

export const EMPRESA_CONFIG = {
  // Información básica
  nombre: 'Totalplay',
  nombreCompleto: 'Total Play Telecomunicaciones, S.A.P.I. de C.V.',
  grupoEmpresarial: 'Grupo Salinas',
  directorGeneral: 'Eduardo Kuri Romo',
  industria: 'Telecomunicaciones, Conectividad y Entretenimiento',
  fundacion: 2010,
  pais: 'México',
  slogan: 'Puntos de Venta Inteligentes M2C · Powered by MAYIA & Retail Innova',

  // Descripción corporativa extraída del documento prospecto 2026
  descripcion: 'Empresa mexicana de telecomunicaciones perteneciente a Grupo Salinas, líder en internet de fibra óptica (FTTH), televisión digital, telefonía y entretenimiento. Totalplay opera una red nacional de más de 164,000 km de fibra óptica en 87 ciudades, alcanzando a más de 19 millones de hogares pasados y 5.5 millones de suscriptores. A través de la iniciativa M2C (MAYIA + Retail Innova), transforma sus islas, corners y puntos de venta en puntos inteligentes de atracción, asesoría y conversión.',

  // Datos operativos 1T26
  operaciones: {
    puntosVenta: '112+ puntos oficiales (Islas Mall, Corners Autoservicio, Tiendas Premium)',
    ciudades: '87 ciudades en México',
    suscriptores: '5,554,374 (incluyendo 67,856 PyMEs)',
    hogaresPasados: '19.5+ millones',
    fibraOptica: '164,000+ km de red FTTH',
    ingresos2025: '$45,550 millones de pesos',
    ebitda2025: '$20,608 millones de pesos (45% margen)',
    lineasNegocio: [
      'Totalplay Residencial (FTTH, Paquetes Doble y Triple Play)',
      'Totalplay TV y Bang & Olufsen Surround',
      'Totalplay Empresarial (Conectividad, Nube, Ciberseguridad)',
      'Hogar Seguro y soluciones IoT',
      'Transformación M2C para Puntos de Venta Físicos'
    ]
  },

  // Marcas del portafolio
  marcas: [
    'Totalplay',
    'Totalplay TV',
    'Totalplay Surround',
    'Totalplay Empresarial',
    'MAYIA Retail Innova (Puntos Inteligentes)'
  ],

  // Servicios principales
  serviciosPrincipales: [
    'Internet simétrico de fibra óptica directo al hogar',
    'Televisión interactiva con plataformas de streaming integradas',
    'Totalplay Surround 2026 en alianza con Bang & Olufsen',
    'Telefonía fija HD',
    'Extensores WiFi y redes Mesh',
    'Soluciones de ciberseguridad y nube para PyMEs',
    'Captura consentida de leads y recomendador de paquetes en punto de venta',
    'Atención comercial y copiloto inteligente para ejecutivos'
  ],

  // Contactos corporativos
  contacto: {
    sitioWeb: 'https://www.totalplay.com.mx',
    atencionCliente: '800 510 0510',
    whatsapp: '55 1579 8000',
    plataforma: 'https://app.totalplay.com.mx',
    appEntrega: 'App Totalplay'
  },

  // Enfoque estratégico M2C
  enfoqueEstrategico: [
    'Aumento de productividad comercial sobre la cobertura de fibra existente',
    'Elevación del ARPU mediante paquetes premium y Totalplay Surround',
    'Medición con Computer Vision anónimo en islas y tiendas físicas',
    'Asistencia inteligente en tótem y copiloto comercial para ejecutivos',
    'Trazabilidad omnicanal entre la visita física y la activación en la App Totalplay'
  ],

  // Servicios MAYIA prioritarios para Totalplay
  serviciosPrioritarios: {
    ventas: [
      'Asesor Inteligente Totalplay (Tótem/Pantalla)',
      'Copiloto del Vendedor en Cierre de Contratos',
      'Configurador Inteligente de Paquetes Residenciales/PyME',
      'Captura y Calificación Automatizada de Leads'
    ],
    operaciones: [
      'Computer Vision Comercial (Tráfico y Permanencia)',
      'Auditoría Visual IA para Exhibidores e Islas',
      'Monitoreo y Salud de Sensores/Pantallas',
      'Scorecard Ejecutivo de Puntos de Venta'
    ],
    rh: [
      'Academia MAYIA para Capacitación de Vendedores',
      'Evaluación de Desempeño por Turno y Ubicación'
    ],
    atencionCliente: [
      'Validación Inmediata de Cobertura por Código Postal',
      'Agentes Virtuales 24/7 en App y Puntos Físicos'
    ]
  },

  // Servicios propios MAYIA activos en Totalplay
  serviciosMayiaActivos: {
    totalplayAssist: {
      nombre: 'Totalplay Assist',
      nombreAlternativo: 'Asistente MAYIA Totalplay',
      tipo: 'Asistente Virtual e Inteligencia Comercial M2C',
      descripcion: 'Agente inteligente en tiempo real para clientes y ejecutivos de Totalplay. Permite consultar cobertura por zona, comparar paquetes Doble/Triple Play, simular configuraciones para el hogar y calificar leads en tienda.',
      beneficios: [
        'Consulta instantánea de cobertura por código postal',
        'Recomendación inteligente de paquetes según presupuesto',
        'Capacitación y copiloto en tiempo real para vendedores',
        'Integración con CRM y seguimiento de instalación'
      ],
      audiencia: 'Visitantes de tienda, prospectos y asesores comerciales',
      casoDeUso: 'Cliente en una isla de centro comercial consultando paquete con Totalplay Surround'
    }
  },

  // Métricas clave del negocio Totalplay
  metricasClave: [
    'Tráfico frente al punto y Tasa de Atracción (%)',
    'Permanencia e Interacciones con Pantalla',
    'Leads Calificados por Isla / Tienda',
    'Tasa de Conversión Visita-Lead y Lead-Contrato',
    'ARPU Promedio por Cliente Captado ($588 l.b.)',
    'Disponibilidad del Equipamiento Inteligente (%)'
  ]
};

export function getEmpresaInfo(campo) {
  return EMPRESA_CONFIG[campo] || null;
}

export function getDescripcionContextual() {
  const { nombreCompleto, slogan, operaciones } = EMPRESA_CONFIG;
  return `${nombreCompleto} ("${slogan}") opera una red nacional de ${operaciones.fibraOptica} alcanzando ${operaciones.hogaresPasados} hogares pasados en ${operaciones.ciudades}. Con la solución M2C powered by MAYIA & Retail Innova, transforma sus islas y corners en puntos inteligentes de alta conversión.`;
}

export default EMPRESA_CONFIG;