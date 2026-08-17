export const empresaConfig = {
  nombre: 'RISKO AI',
  razonSocial: 'RISKO AI Platform S.A.P.I. de C.V.',
  sector: 'Gestión & Medición del Riesgo Inmobiliario',
  pais: 'México',
  moneda: 'USD',
  idioma: 'es',

  modulos: [
    { id: 'command-center', nombre: 'Command Center Ejecutivo' },
    { id: 'expediente-digital', nombre: 'Alta y Expediente Digital' },
    { id: 'georisk-studio', nombre: 'GeoRisk Studio & Geoestudio' },
    { id: 'evidence-vault', nombre: 'Evidence Vault' },
    { id: 'ai-document-intelligence', nombre: 'AI Document Intelligence' },
    { id: 'inspeccion-inteligente', nombre: 'Inspección Inteligente' },
    { id: 'construccion-estructura', nombre: 'Construcción y Estructura' },
    { id: 'fire-explosion', nombre: 'Fire & Explosion Risk' },
    { id: 'instalaciones-equipos', nombre: 'Instalaciones y Equipos' },
    { id: 'operacion-personas-rc', nombre: 'Operación, Personas y RC' },
    { id: 'continuidad-dependencias', nombre: 'Continuidad y Dependencias' },
    { id: 'valuacion-coberturas', nombre: 'Valuación y Coberturas' },
    { id: 'motor-riesgo-escenarios', nombre: 'Motor de Riesgo & Escenarios' },
    { id: 'mitigacion-capex', nombre: 'Mitigación y Workflows' },
    { id: 'portfolio-accumulation', nombre: 'Portfolio & Accumulation' },
    { id: 'gobierno-agentes', nombre: 'Gobierno de IA & Agentes' }
  ],

  asistenteIA: {
    nombre: 'RISKO Copilot',
    nombreAlternativo: 'Asistente RISKO AI Real Estate',
    tipo: 'Asistente Agéntico de Ingeniería y Riesgo Inmobiliario',
    capacidades: [
      'Análisis de expediente digital inmobiliario',
      'Evaluación multiamenaza (Sismo, Inundación, Huracán, Incendio)',
      'Cálculo de AAL, PML, EML y brechas de cobertura',
      'Auditoría de pólizas vs. avalúos de reposición',
      'Priorización de CAPEX preventivo con ROI de riesgo'
    ]
  }
};