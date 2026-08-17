// dbService.js - Servicio de consulta para RISKO AI
export async function buscarContextoEnDB(mensaje, departamento) {
  // Retorna contexto enriquecido según términos de riesgo inmobiliario
  const msgLower = (mensaje || '').toLowerCase();
  
  if (msgLower.includes('sismo') || msgLower.includes('pga') || msgLower.includes('terremoto')) {
    return {
      dominio: 'GeoRisk Sismo',
      norma: 'RCDF 2023 / CFE 2015',
      nota: 'Zona IIIb del mapa de zonificación sísmica con amplificación de suelo blando.'
    };
  }
  
  if (msgLower.includes('incendio') || msgLower.includes('rociador') || msgLower.includes('pml')) {
    return {
      dominio: 'Fire Risk NFPA',
      estandar: 'NFPA 13, 20, 25',
      nota: 'Bomba de incendio diésel de 1,500 GPM con tanque de reserva de 250 m³.'
    };
  }

  if (msgLower.includes('aal') || msgLower.includes('pérdida') || msgLower.includes('cobertura')) {
    return {
      dominio: 'Valuación & Underwriting',
      metrica: 'Pérdida Anual Esperada (AAL)',
      nota: 'Promedio histórico ponderado por curva de vulnerabilidad y aceleración de pico de terreno.'
    };
  }

  return null;
}
