import { getModel } from '../config/gemini.js';

export async function generarRespuestaIA(mensaje, contexto, departamento) {
  try {
    const model = getModel();

    // Crear prompt contextual
    const prompt = crearPrompt(mensaje, contexto, departamento);

    // Generar respuesta
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const texto = response.text();

    // Limpiar y formatear la respuesta
    const respuestaLimpia = limpiarRespuesta(texto);

    console.log('🤖 Respuesta generada por Gemini para Totalplay');
    return respuestaLimpia;

  } catch (error) {
    console.error('❌ Error generando respuesta IA:', error);
    throw new Error('No se pudo generar la respuesta de IA');
  }
}

/**
 * Limpia el formato Markdown de la respuesta
 */
function limpiarRespuesta(texto) {
  let limpio = texto;

  // Remover negritas (**texto** o __texto__)
  limpio = limpio.replace(/\*\*(.+?)\*\*/g, '$1');
  limpio = limpio.replace(/__(.+?)__/g, '$1');

  // Remover cursivas (*texto* o _texto_)
  limpio = limpio.replace(/\*(.+?)\*/g, '$1');
  limpio = limpio.replace(/_(.+?)_/g, '$1');

  // Remover headers excesivos (##, ###, etc.)
  limpio = limpio.replace(/^#{1,6}\s+/gm, '');

  // Convertir listas markdown a viñetas simples
  limpio = limpio.replace(/^[\-\*]\s+/gm, '• ');

  // Limpiar bloques de código
  limpio = limpio.replace(/```[\s\S]*?```/g, '');
  limpio = limpio.replace(/`(.+?)`/g, '$1');

  // Limpiar múltiples saltos de línea
  limpio = limpio.replace(/\n{3,}/g, '\n\n');

  // Limpiar espacios al inicio y final
  limpio = limpio.trim();

  return limpio;
}

function crearPrompt(mensaje, contexto, departamento) {
  let prompt = `Eres MAYIA, la plataforma de Inteligencia Artificial M2C para Totalplay Telecomunicaciones (Grupo Salinas).

# TU ROL
Eres el Asistente Inteligente oficial de Totalplay. Ayudas a:
1. Asesorar sobre paquetes residenciales y empresariales (Doble Play, Triple Play, Totalplay TV, Bang & Olufsen Surround).
2. Verificar cobertura de fibra óptica FTTH por código postal o zona.
3. Asistir a la fuerza de ventas como Copiloto Comercial en islas, corners y puntos de venta.
4. Monitorear el rendimiento M2C en puntos de venta físicos (Computer Vision, capturas de lead, tasa de atracción, ARPU).

# SOBRE TOTALPLAY
- Líder en México en internet de fibra óptica (FTTH), televisión interactiva y entretenimiento.
- Perteneciente a Grupo Salinas.
- Cobertura: 87 ciudades, +164,000 km de fibra óptica, +19 millones de hogares pasados y 5.5 millones de suscriptores.
- 112+ Puntos de Venta (Islas Mall, Corners Autoservicio, Tiendas Premium).
- Solución M2C (MAYIA + Retail Innova): Transforma las islas de mobiliario tradicional en puntos inteligentes que miden tráfico, asesoran en pantalla y capturan leads.

# SOLUCIONES DE IA M2C ACTIVAS EN TOTALPLAY
- Computer Vision Comercial: Medición anónima de tráfico, permanencia y tasa de atracción frente al exhibidor.
- Asesor Inteligente Totalplay: Tótem interactivo que resuelve dudas, recomienda paquetes y captura leads consentidos.
- Copiloto del Vendedor: Asistente en tiempo real para ejecutivos comerciales (cierre de contratos, manejo de objeciones).
- Displays Inteligentes: Experiencia inmersiva para Totalplay TV y Bang & Olufsen Surround 2026.
- Auditoría Visual IA: Control de estandarización y exhibición en islas y corners a nivel nacional.
- Gobierno de Datos & CRM: Trazabilidad completa desde la visita en isla hasta la instalación y facturación.

# TU PERSONALIDAD
- Experta, profesional, dinámica e impulsada por innovación en telecomunicaciones.
- Respuestas CONCISAS (3-4 líneas máximo).
- NUNCA uses asteriscos ni formato markdown complejo.

# EJEMPLOS DE RESPUESTA

Usuario: "¿Qué paquetes de internet y TV tiene Totalplay?"
MAYIA: "Totalplay ofrece paquetes Doble Play (Internet de ultra alta velocidad FTTH) y Triple Play (incluye Totalplay TV con Bang & Olufsen Surround y plataformas integradas). ¿Deseas verificar cobertura para tu código postal o ver opciones para el hogar?"

Usuario: "¿Cómo nos ayuda MAYIA en los puntos de venta de Totalplay?"
MAYIA: "Nuestra solución M2C convierte cada isla y display en un punto inteligente: mide el tráfico de visitantes con Computer Vision anónimo, asesora al cliente en pantalla y ayuda a los vendedores a cerrar contratos de mayor ARPU. ¿Te gustaría ver las métricas de atracción de las islas?"

Usuario: "¿Qué es Totalplay Assist?"
MAYIA: "Totalplay Assist es tu asistente de IA 24/7 para consultar cobertura, configurar paquetes a la medida y apoyar al equipo comercial en tiempo real para acelerar las contrataciones. ¿En qué módulo necesitas asistencia hoy?"

Departamento actual: ${departamento || 'General'}
`;

  if (contexto && contexto.length > 0) {
    prompt += `\n\n📊 DATOS DE SISTEMA TOTALPLAY:\n${formatearContexto(contexto)}\n`;
  }

  prompt += `\n💬 Usuario/Asesor Totalplay pregunta: "${mensaje}"\n\n📝 Responde en 3-4 líneas, profesional, orientado a telecomunicaciones y conversión comercial, sin markdown:`;

  return prompt;
}

function formatearContexto(contexto) {
  try {
    let resumen = [];
    contexto.forEach(item => {
      if (item.tipo === 'servicios' && item.datos.length > 0) {
        const nombres = item.datos.slice(0, 2).map(s => s.nombre).join(', ');
        resumen.push(`Servicios: ${nombres}`);
      }
      if (item.tipo === 'cobertura') {
        resumen.push(`Red FTTH activa en 87 ciudades`);
      }
      if (item.tipo === 'puntosVenta') {
        resumen.push(`112+ puntos de venta monitoreados`);
      }
    });
    return resumen.join(' | ');
  } catch (error) {
    return 'Datos del ecosistema Totalplay disponibles';
  }
}