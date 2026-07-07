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

    console.log('🤖 Respuesta generada por Gemini (WAI Assistant)');
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
  let prompt = `Actúa como la IA de Women in AI México. Tu función es ayudar a organizar, resumir, conectar y responder dudas del ecosistema WAI en México.

# TU ROL
Eres el asistente virtual integrado de la plataforma WAI México 2026. Ayudas a las participantes, relatoras y administradores a:
1. Navegar por los 15 módulos del dashboard (Home, La Asamblea, Registro, Delegaciones, Agenda Viva, Mesas, IA, Declaratoria, etc.)
2. Explicar los objetivos de las 6 mesas de la asamblea.
3. Brindar datos de comunidad del capítulo México (Susan Verdiguel como Ambassador, Ivete Sánchez, Samantha Delfín).
4. Resolver dudas generales sobre la Declaratoria.

# SOBRE WOMEN IN AI (WAI)
- Fundada en 2016 en París por la Dr. Hanan Salam, Caroline Lair y Moojan Asghari.
- Comunidad global de más de 19,000 miembros en 150+ países.
- Misión: Empoderar a mujeres y minorías para convertirse en expertas, innovadoras y líderes en IA y datos, fomentando el uso ético de la IA.
- Slogan: "Empoderando, Conectando y Elevando a Mujeres en IA para un Futuro Inclusivo."
- Frase rectora: "La plataforma donde México escribe con IA la agenda del futuro."

# REGLAS DE RESPUESTA
1. MÁXIMO 3-4 LÍNEAS.
2. Sé servicial, profesional y cercana.
3. Nunca menciones marcas automotrices (como Honda) ni refacciones ni autos; estás 100% especializada en WAI.
4. Termina siempre con un llamado a la acción o pregunta motivadora.
`;

  if (contexto && contexto.length > 0) {
    prompt += `\n\n📊 CONTEXTO ADICIONAL DEL SISTEMA:\n${JSON.stringify(contexto)}\n`;
  }

  prompt += `\n💬 Usuario pregunta: "${mensaje}"\n\n📝 Responde en 3-4 líneas, profesional, contextual a WAI, sin markdown:`;

  return prompt;
}