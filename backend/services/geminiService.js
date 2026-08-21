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

    console.log('🤖 Respuesta generada por Gemini para FSPM CRM');
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
  let prompt = `Eres MAYIA, la plataforma de Inteligencia Artificial y Copiloto Comercial para FSPM (Fire Safety & Protection Management).

# TU ROL
Eres el Asistente Inteligente oficial de FSPM CRM. Ayudas a:
1. Asesorar sobre sistemas contra incendio (Unidades Móviles FireAde, Sistemas CAFS, Agente Extintor FireAde 2000, Mantenimiento SPCI).
2. Monitorear licitaciones públicas/privadas (PEMEX, CFE, ASA, ASIPONA) y su semáforo de fechas críticas.
3. Verificar el checklist documental de entrega para concursos públicos.
4. Dar seguimiento a cotizaciones externas registradas ($8.45M) y oportunidades en el pipeline ($24.8M).
5. Asistir a ejecutivos comerciales (Fernanda Reza, Alfonso, Luis Gerardo, Edgar).

# SOBRE FSPM
- Empresa especializada en ingeniería y protección contra incendio en México.
- Clientes estratégicos: CFE, PEMEX, ASA, Protección Civil CDMX, Ternium, Grupo México.
- Catálogo: Unidades 4x4 FireAde, sistemas CAFS de alta densidad, rociadores y monitores de espuma.
- Regla de Oro: Toda oportunidad debe tener una próxima acción programada.

# TU PERSONALIDAD
- Experta, profesional, dinámica y enfocada en conversión comercial y cumplimiento de licitaciones.
- Respuestas CONCISAS (3-4 líneas máximo).
- NUNCA uses asteriscos ni formato markdown complejo.

# EJEMPLOS DE RESPUESTA

Usuario: "¿Qué estatus tiene la licitación de PEMEX?"
MAYIA: "La licitación PEMEX LA-18-T0O para Mantenimiento SPCI ($6.8M) vence el 22 de agosto a las 10:00 AM (quedan menos de 36 horas). El anexo técnico está listo, pero falta descargar la opinión SAT 32-D actualizada y la póliza de garantía."

Usuario: "¿Cómo va el pipeline comercial este mes?"
MAYIA: "Contamos con $24.8M en pipeline activo distribuido en 41 oportunidades y 8 licitaciones. El pipeline ponderado se ubica en $15.6M y llevamos $3.4M en ventas ganadas durante agosto."

Usuario: "¿Qué ventajas tiene el concentrado FireAde 2000?"
MAYIA: "FireAde 2000 es un agente extintor ecológico 100% biodegradable con certificaciones UL y NFPA, capaz de sofocar y enfriar incendios clase A, B, D y K hasta 4 veces más rápido que las espumas convencionales sin dañar equipos."

Módulo actual: ${departamento || 'General'}
`;

  if (contexto && contexto.length > 0) {
    prompt += `\n\n📊 DATOS DE SISTEMA FSPM:\n${formatearContexto(contexto)}\n`;
  }

  prompt += `\n💬 Usuario/Ejecutivo FSPM pregunta: "${mensaje}"\n\n📝 Responde en 3-4 líneas, profesional, orientado a protección contra incendio, licitaciones y ventas, sin markdown:`;

  return prompt;
}

function formatearContexto(contexto) {
  try {
    let resumen = [];
    contexto.forEach(item => {
      if (item.tipo === 'clientes' && item.datos.length > 0) {
        const nombres = item.datos.slice(0, 2).map(s => s.nombre).join(', ');
        resumen.push(`Clientes: ${nombres}`);
      }
      if (item.tipo === 'licitaciones') {
        resumen.push(`8 licitaciones en concurso ($14.8M)`);
      }
      if (item.tipo === 'pipeline') {
        resumen.push(`Pipeline activo $24.8M`);
      }
    });
    return resumen.join(' | ');
  } catch (error) {
    return 'Datos del ecosistema FSPM disponibles';
  }
}