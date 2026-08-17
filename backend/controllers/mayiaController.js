import { empresaConfig } from '../config/empresaConfig.js';

export function getDepartamentos(req, res) {
  res.json({
    success: true,
    modulos: empresaConfig.modulos
  });
}

export function getServiciosPorDepartamento(req, res) {
  const { departamento } = req.params;
  res.json({
    success: true,
    departamento,
    servicios: [
      'Análisis de vulnerabilidad multiamenaza',
      'Modelación de pérdidas AAL/PML/EML',
      'Auditoría de póliza vs. valor de reposición',
      'Priorización CAPEX por reducción de riesgo'
    ]
  });
}

export function getCursos(req, res) {
  res.json({
    success: true,
    capacitaciones: [
      { id: 1, titulo: 'Inspección NFPA 25 contra Incendio', duracion: '4 horas' },
      { id: 2, titulo: 'Evaluación Rápida Post-Sismo de Inmuebles', duracion: '6 horas' },
      { id: 3, titulo: 'Gestión de Continuidad de Negocio (BI / ISO 22301)', duracion: '8 horas' }
    ]
  });
}

export function getServiciosCorporativos(req, res) {
  res.json({
    success: true,
    servicios: empresaConfig.asistenteIA.capacidades
  });
}

export function getInfoEmpresa(req, res) {
  res.json({
    success: true,
    empresa: empresaConfig
  });
}

export function buscarServicio(req, res) {
  const { q } = req.query;
  res.json({
    success: true,
    query: q,
    resultados: [
      { modulo: 'GeoRisk Studio', coincidencia: 'Capas sísmicas e hidrometeorológicas' },
      { modulo: 'Fire & Explosion Risk', coincidencia: 'Cálculo de carga de fuego y rociadores' }
    ]
  });
}

export function getEstadisticasMayia(req, res) {
  res.json({
    success: true,
    estadisticas: {
      inmueblesAuditados: 1450,
      hallazgosMitigados: '94.2%',
      agentesActivos: 16
    }
  });
}
