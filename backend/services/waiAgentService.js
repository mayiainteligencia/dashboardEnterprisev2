import { getModel } from '../config/gemini.js';

// Prompt base de la asamblea WAI (Sección 22)
const BASE_PROMPT_WAI = `Actúa como la IA de Women in AI México. Tu función es ayudar a organizar, resumir, conectar y convertir insumos de gobierno, empresas, academia, desarrolladoras y sociedad civil en conocimiento útil para la Declaratoria WAI México 2026 y para el crecimiento responsable de la IA en México. No inventes fuentes. Distingue entre documento cargado, nota de mesa, opinión individual, dato público y conclusión validada. Resume con claridad ejecutiva, identifica consensos y disensos, señala riesgos, propone acciones y marca todo contenido como borrador hasta que sea validado por una relatora o el comité editorial. Respeta permisos de uso, privacidad y consentimiento en todo momento.`;

/**
 * Clasifica y resume un insumo/documento
 */
export async function procesarDocumento(texto, mesa = "general", delegacion = "general") {
  try {
    let model;
    try {
      model = getModel();
    } catch (e) {
      // Fallback si no está inicializado
      console.warn("Gemini client not initialized, using mock processor");
      return mockProcesarDocumento(texto, mesa, delegacion);
    }

    const prompt = `${BASE_PROMPT_WAI}
    
    Analiza y procesa el siguiente insumo recibido de la delegación de "${delegacion}" asignado a la mesa temática "${mesa}":
    
    Texto del insumo:
    "${texto}"
    
    Por favor responde en formato JSON con la siguiente estructura (no agregues bloques de código markdown ni texto adicional, responde únicamente el JSON limpio):
    {
      "clasificacion": "talento/competitividad/gobernanza/investigacion/emprendimiento/liderazgo/etica/inclusion",
      "resumen": "Resumen ejecutivo corto del insumo en 2 líneas.",
      "puntosClave": ["Punto clave 1", "Punto clave 2"],
      "riesgos": ["Riesgo detectado 1"],
      "accionesSugeridas": ["Acción 1"]
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const cleanText = response.text().replace(/```json|```/gi, '').trim();
    
    try {
      return JSON.parse(cleanText);
    } catch (e) {
      console.warn("Error parsing Gemini JSON response, returning text wrapper:", cleanText);
      return {
        clasificacion: "general",
        resumen: cleanText.substring(0, 150),
        puntosClave: [cleanText],
        riesgos: [],
        accionesSugeridas: []
      };
    }
  } catch (error) {
    console.error('❌ Error en procesarDocumento:', error.message);
    return mockProcesarDocumento(texto, mesa, delegacion);
  }
}

/**
 * Genera la síntesis acumulada de una mesa
 */
export async function generarSintesisMesa(notasArray, mesa) {
  try {
    let model;
    try {
      model = getModel();
    } catch (e) {
      return { sintesis: `Síntesis preliminar de la mesa ${mesa} basada en ${notasArray.length} aportaciones recibidas.` };
    }

    const prompt = `${BASE_PROMPT_WAI}
    
    Genera una síntesis ejecutiva para la mesa temática "${mesa}" basada en las siguientes notas capturadas por las relatoras:
    
    ${notasArray.map((n, i) => `${i+1}. ${n}`).join('\n')}
    
    Escribe un texto estructurado en 3 párrafos:
    1. Consensos identificados.
    2. Puntos de disenso o temas pendientes.
    3. Recomendaciones prioritarias para la Declaratoria.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return { sintesis: response.text().trim() };
  } catch (error) {
    console.error('❌ Error en generarSintesisMesa:', error.message);
    return { sintesis: `Síntesis preliminar de la mesa ${mesa} basada en ${notasArray.length} aportaciones recibidas.` };
  }
}

/**
 * Calcula la afinidad y genera un mensaje de introducción explicable para dos perfiles
 */
export async function sugerirConexiones(perfilA, perfilB) {
  try {
    let model;
    try {
      model = getModel();
    } catch (e) {
      return { score: 85, motivo: "Interés común en desarrollo ético de IA y marcos de gobernanza corporativa." };
    }

    const prompt = `${BASE_PROMPT_WAI}
    
    Analiza la compatibilidad profesional de estas dos personas para conectarlas en la asamblea:
    Persona A: Nombre: ${perfilA.nombre}, Cargo: ${perfilA.cargo}, Org: ${perfilA.organizacion}, Intereses: ${perfilA.intereses}
    Persona B: Nombre: ${perfilB.nombre}, Cargo: ${perfilB.cargo}, Org: ${perfilB.organizacion}, Intereses: ${perfilB.intereses}
    
    Responde en formato JSON limpio con esta estructura:
    {
      "score": 90, // score de 0 a 100
      "motivo": "Explicación breve de por qué deberían conectar y qué sinergia tienen."
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const cleanText = response.text().replace(/```json|```/gi, '').trim();
    return JSON.parse(cleanText);
  } catch (error) {
    return { score: 85, motivo: "Interés común en desarrollo ético de IA y marcos de gobernanza corporativa." };
  }
}

// Fallbacks de datos mock
function mockProcesarDocumento(texto, mesa, delegacion) {
  return {
    clasificacion: "talento",
    resumen: "Propuesta para estructurar cursos de IA con enfoque de inclusión de género en universidades mexicanas.",
    puntosClave: [
      "Incrementar la representación femenina en laboratorios de ciencias de la computación.",
      "Vincular proyectos estudiantiles con problemáticas industriales reales."
    ],
    riesgos: [
      "Falta de financiamiento o subsidios estatales para programas piloto de capacitación."
    ],
    accionesSugeridas: [
      "Crear un fondo conjunto entre WAI México y sponsors corporativos para becas de MLOps."
    ]
  };
}
