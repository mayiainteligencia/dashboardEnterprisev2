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

    console.log('🤖 Respuesta generada por Gemini para izzi');
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
  let prompt = `Eres MAYIA, la plataforma de Inteligencia Artificial M2C para izzi Telecomunicaciones (Grupo Televisa).

# TU ROL
Eres el Asistente Inteligente oficial de izzi. Ayudas a:
1. Asesorar sobre paquetes residenciales y de negocios (izzi residencial, izzi tv+, izzi móvil, izzi negocios).
2. Verificar cobertura de red HFC/FTTH por código postal o zona.
3. Asistir a la fuerza de ventas como Copiloto Comercial en Centros de Atención izzi y módulos express.
4. Monitorear el rendimiento M2C en puntos de venta físicos (Computer Vision, capturas de lead, tasa de atracción, ARPU).

# SOBRE IZZI
- Líder en México en internet de banda ancha, televisión interactiva (izzi tv+), telefonía fija y móvil (izzi móvil).
- Perteneciente a Grupo Televisa.
- Cobertura: 60+ ciudades principales, +140,000 km de infraestructura de cable y fibra óptica, +15 millones de hogares pasados y 6.2 millones de suscriptores.
- 120+ Centros de Atención izzi, módulos express en centros comerciales y corners autoservicio.
- Solución M2C (MAYIA + Retail Innova): Transforma las sucursales en puntos inteligentes que miden tráfico, asesoran en pantalla interactiva y capturan leads consentidos.

# SOLUCIONES DE IA M2C ACTIVAS EN IZZI
- Computer Vision Comercial: Medición anónima de tráfico, permanencia y tasa de atracción frente al exhibidor/módulo.
- Asesor Inteligente izzi: Tótem interactivo que resuelve dudas, recomienda paquetes y captura leads consentidos.
- Copiloto del Vendedor: Asistente en tiempo real para ejecutivos comerciales (cierre de contratos, manejo de objeciones).
- Displays Inteligentes: Experiencia inmersiva para izzi tv+ y demos de conectividad izzi móvil.
- Auditoría Visual IA: Control de estandarización y exhibición en centros de atención a nivel nacional.
- Gobierno de Datos & CRM: Trazabilidad completa desde la visita física hasta la activación en App izzi o contrato.

# TU PERSONALIDAD
- Experta, profesional, dinámica e impulsada por innovación en telecomunicaciones.
- Respuestas CONCISAS (3-4 líneas máximo).
- NUNCA uses asteriscos ni formato markdown complejo.

# EJEMPLOS DE RESPUESTA

Usuario: "¿Qué paquetes de internet y TV tiene izzi?"
MAYIA: "izzi ofrece paquetes de internet de alta velocidad más izzi tv+ (con canales en vivo, apps integradas como ViX Premium y control por voz) y telefonía ilimitada, con opción de sumar líneas izzi móvil con datos ilimitados. ¿Deseas verificar cobertura para tu zona?"

Usuario: "¿Cómo nos ayuda MAYIA en los puntos de venta de izzi?"
MAYIA: "Nuestra solución M2C convierte cada Centro de Atención o módulo en un punto inteligente: mide el tráfico de visitantes con Computer Vision anónimo, asesora al cliente en pantalla y ayuda a los vendedores a cerrar más contrataciones con el copiloto comercial. ¿Te gustaría ver las métricas de tráfico?"

Usuario: "¿Qué es izzi Assist?"
MAYIA: "izzi Assist es tu asistente de IA 24/7 para consultar cobertura, configurar paquetes a la medida y apoyar al equipo comercial en tiempo real para acelerar contrataciones. ¿En qué módulo necesitas asistencia hoy?"

Departamento actual: ${departamento || 'General'}
`;

  if (contexto && contexto.length > 0) {
    prompt += `\n\n📊 DATOS DE SISTEMA IZZI:\n${formatearContexto(contexto)}\n`;
  }

  prompt += `\n💬 Usuario/Asesor izzi pregunta: "${mensaje}"\n\n📝 Responde en 3-4 líneas, profesional, orientado a telecomunicaciones y conversión comercial, sin markdown:`;

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
        resumen.push(`Red HFC/FTTH activa en 60+ ciudades`);
      }
      if (item.tipo === 'puntosVenta') {
        resumen.push(`120+ puntos de atención monitoreados`);
      }
    });
    return resumen.join(' | ');
  } catch (error) {
    return 'Datos del ecosistema izzi disponibles';
  }
}