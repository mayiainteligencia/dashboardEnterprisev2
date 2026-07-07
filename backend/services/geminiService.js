import { getModel } from '../config/gemini.js';

export async function generarRespuestaIA(mensaje, contexto, modulo) {
  try {
    const model = getModel();
    const prompt = crearPrompt(mensaje, contexto, modulo);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const texto = response.text();
    const respuestaLimpia = limpiarRespuesta(texto);
    console.log('🧬 Respuesta generada por MAYIA Scientific');
    return respuestaLimpia;
  } catch (error) {
    console.error('❌ Error generando respuesta IA:', error);
    throw new Error('No se pudo generar la respuesta de IA');
  }
}

function limpiarRespuesta(texto) {
  let limpio = texto;
  limpio = limpio.replace(/\*\*(.+?)\*\*/g, '$1');
  limpio = limpio.replace(/__(.+?)__/g, '$1');
  limpio = limpio.replace(/\*(.+?)\*/g, '$1');
  limpio = limpio.replace(/_(.+?)_/g, '$1');
  limpio = limpio.replace(/^#{1,6}\s+/gm, '');
  limpio = limpio.replace(/^[\-\*]\s+/gm, '• ');
  limpio = limpio.replace(/```[\s\S]*?```/g, '');
  limpio = limpio.replace(/`(.+?)`/g, '$1');
  limpio = limpio.replace(/\n{3,}/g, '\n\n');
  limpio = limpio.trim();
  return limpio;
}

function crearPrompt(mensaje, contexto, modulo) {
  let prompt = `Eres MetroCDMX AI, el asistente de inteligencia artificial especializado en el transporte público de la Ciudad de México.

# TU IDENTIDAD Y PROPÓSITO
Eres un experto amigable, servicial e ingenioso en movilidad urbana de la CDMX. Ayudas a los usuarios a planificar sus viajes y moverse por la capital mexicana utilizando el Sistema de Transporte Colectivo Metro, Metrobús, Red de Transporte de Pasajeros (RTP), Trolebús, Tren Ligero, Cablebús, Tren Suburbano y el sistema de bicicletas compartidas ECOBICI.

# REGLAS DE RESPUESTA
1. Responde siempre en español de México, utilizando expresiones locales y con un tono amable y servicial.
2. Da información de costos siempre en pesos mexicanos (MXN).
3. Ofrece consejos prácticos de seguridad (e.g. cuidar pertenencias, evitar zonas aglomeradas, respetar los vagones exclusivos de mujeres y niños).
4. Explica combinaciones y transbordos de forma clara. Si no estás seguro de una combinación específica, menciónala indicando que es una estimación.
5. Mantén tus respuestas CONCISAS: máximo 4-5 líneas para que sean legibles en un chat móvil flotante.
6. No utilices formato markdown complejo como asteriscos, guiones en negrita o bloques de código, ya que la interfaz limpia el texto y se verá mal. Usa viñetas simples (•) si es necesario.

# INFORMACIÓN DE TARIFAS VIGENTES (Úsala para responder preguntas de precios)
• Metro: $5.00 MXN tarifa plana.
• Metrobús: $6.00 MXN regular (Aeropuerto $30.00 MXN).
• Cablebús: $7.00 MXN.
• Trolebús: $4.00 MXN regular (Trolebús Elevado $7.00 MXN).
• Tren Ligero: $4.00 MXN.
• RTP: $2.00 MXN ordinario/Atenea, $4.00 MXN exprés, $7.00 MXN Nochebús.
• Tren Suburbano: $10.00 MXN corto, $23.00 MXN largo.
• Tarjeta MI (Movilidad Integrada): Costo $15.00 MXN (incluye un viaje de metro). Se recarga en taquillas y máquinas.

# MÓDULO ACTUAL DEL DASHBOARD: ${modulo || 'Planificador de Rutas'}
`;

  if (contexto && contexto.length > 0) {
    prompt += `\n\n📊 DATOS EN TIEMPO REAL DEL SISTEMA CDMX:\n${formatearContexto(contexto)}\n`;
  }

  prompt += `\n💬 El usuario pregunta: "${mensaje}"\n\n📝 Responde de forma precisa en 3-5 líneas sobre transporte de la CDMX:`;

  return prompt;
}

function formatearContexto(contexto) {
  try {
    let resumen = [];
    contexto.forEach(item => {
      if (item.tipo === 'estaciones' && item.datos.length > 0) {
        const ests = item.datos.map(d => `${d.nombre} (${d.linea})`).slice(0, 5).join(', ');
        resumen.push(`Estaciones encontradas: ${ests}`);
      }
      if (item.tipo === 'lineas' && item.datos.length > 0) {
        const lns = item.datos.map(d => `${d.linea} (Estado: ${d.estado})`).join(' | ');
        resumen.push(`Estado de líneas: ${lns}`);
      }
      if (item.tipo === 'alertas' && item.datos.length > 0) {
        const alers = item.datos.map(d => `${d.titulo}: ${d.descripcion}`).slice(0, 3).join(' | ');
        resumen.push(`Alertas activas: ${alers}`);
      }
      if (item.tipo === 'tarifas' && item.datos.length > 0) {
        const tars = item.datos.map(d => `${d.sistema} (${d.categoria}): $${d.precio} MXN`).slice(0, 5).join(', ');
        resumen.push(`Tarifas: ${tars}`);
      }
    });
    return resumen.length > 0 ? resumen.join(' | ') : 'Datos del sistema MetroCDMX disponibles';
  } catch (error) {
    return 'Datos del sistema MetroCDMX disponibles';
  }
}