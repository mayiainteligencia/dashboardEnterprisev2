import { GoogleGenAI } from '@google/genai';
import { GEMINI_API_KEY, GEMINI_MODEL } from '../config/gemini.js';

let ai = null;
if (GEMINI_API_KEY) {
  ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
}

function limpiarRespuestaMarkdown(texto) {
  if (!texto) return '';
  let limpio = texto;
  limpio = limpio.replace(/\*\*\*(.*?)\*\*\*/g, '$1');
  limpio = limpio.replace(/\*\*(.*?)\*\*/g, '$1');
  limpio = limpio.replace(/\*(.*?)\*/g, '$1');
  limpio = limpio.replace(/`(.*?)`/g, '$1');
  limpio = limpio.replace(/^#+\s+/gm, '');
  limpio = limpio.replace(/^[\*\-\+]\s+/gm, '• ');
  limpio = limpio.replace(/^\d+\.\s+/gm, '');
  limpio = limpio.replace(/\n{3,}/g, '\n\n');
  return limpio.trim();
}

function crearPrompt(mensaje, contexto, departamento) {
  return `Eres RISKO Copilot, el Asistente Agéntico de Inteligencia para Gestión y Medición del Riesgo Inmobiliario de RISKO AI.

# TU ROL
Eres el Asistente Experto en Ingeniería de Riesgos, Evaluación Multiamenaza y Suscripción Inmobiliaria. Ayudas a:
1. Asesorar sobre expedientes digitales de inmuebles, valores de reposición a nuevo y brechas de infraseguro.
2. Analizar perfiles de amenaza sísmica (PGA), inundación pluvial/fluvial, vientos ciclónicos y geotecnia.
3. Evaluar protección pasiva y activa contra incendio (NFPA, carga de fuego, rociadores, bombas).
4. Calcular métricas de pérdida (AAL, PML, EML, MFL) y simular interrupción de negocio (BI / MTPD).
5. Priorizar proyectos CAPEX de mitigación para mejorar el score de riesgo (0-100) y la asegurabilidad (Clases A a F).

# TU PERSONALIDAD
- Técnica, profesional, precisa y orientada a datos auditables.
- Respuestas CONCISAS y ejecutivas (3-4 líneas máximo).
- Mantener tono claro sin formato markdown complejo.

# CONTEXTO
${contexto ? `Contexto del expediente/inmueble: ${JSON.stringify(contexto)}` : 'Consulta general sobre cartera inmobiliaria.'}
${departamento ? `Módulo activo: ${departamento}` : ''}

Pregunta del usuario: "${mensaje}"
Respuesta del Asistente RISKO Copilot:`;
}

export async function generarRespuestaIA(mensaje, contexto = null, departamento = null) {
  if (!ai) {
    return 'RISKO Copilot: El servicio de IA Gemini no está configurado (falta GEMINI_API_KEY). Consulta la documentación de RISKO AI.';
  }

  try {
    const promptText = crearPrompt(mensaje, contexto, departamento);
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL || 'gemini-2.5-flash',
      contents: promptText,
    });

    const rawText = response.text || 'Sin respuesta';
    return limpiarRespuestaMarkdown(rawText);
  } catch (error) {
    console.error('❌ Error llamando a Gemini:', error);
    return 'RISKO Copilot: Ocurrió un error al procesar tu consulta técnica sobre riesgo inmobiliario.';
  }
}