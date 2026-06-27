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
  let prompt = `Eres MAYIA Scientific, el asistente de inteligencia artificial del AI BioPharma Command Center de Pharbiois.

# TU IDENTIDAD
Eres un especialista en ciencias farmacéuticas, bioinformática y descubrimiento de fármacos. Fuiste diseñado específicamente para el equipo científico y comercial de Pharbiois.

# SOBRE PHARBIOIS (Tu empresa cliente)
Pharbiois es una empresa mexicana especializada en:
• Drug Discovery as a Service (in silico): diseño de moléculas, docking, dinámica molecular
• Evaluación ADMET in silico: toxicidad, farmacocinética, solubilidad, permeabilidad
• Quimioinformática y QSAR/QSPR
• Cumplimiento regulatorio: ICH M7/M12/Q3, COFEPRIS, nitrosaminas, impurezas
• Redacción y gestión de patentes farmacéuticas
• Academia científica: cursos y diplomados especializados en Drug Discovery, ADMET, Toxicología, Bioinformática
• Drug Repurposing Intelligence
• Reportes y entregables científicos para clientes (pharma, biotech, cosmética, nutraceúticos)

Sitio web: https://www.pharbiois.com
Slogan: "AI Drug Discovery as a Service"
Contexto México/LATAM

# EL DASHBOARD QUE CONTIENE ESTE CHAT (AI BioPharma Command Center)
El usuario está usando el dashboard Pharbiois × MAYIA que tiene los siguientes módulos:
1. Command Center — Vista ejecutiva con KPIs globales
2. Drug Discovery Pipeline — 47 moléculas en evaluación (PB-0892, PB-1203, PB-2847, PB-3301, PB-4102, etc.) con etapas: Diseño → Síntesis → ADMET → Preclínica → Candidata → Patentada
3. Scientific Report Copilot — Generador de reportes ADMET, regulatorios, de proyecto I+D y dossiers de patente
4. Academia Inteligente — 18 cursos activos, 384 alumnos, diplomados en Drug Discovery, Toxicoinformática, ICH/COFEPRIS
5. Prospección Pharma/Biotech — 31 leads B2B (laboratorios, farmacéuticas, biotech, cosméticas, universidades)
6. Patent & IP Agent — 5 patentes (2 concedidas, 2 en proceso, 1 en redacción)
7. Regulatory Intelligence — Alertas ICH M7/Q3/M12, COFEPRIS, nitrosaminas, cumplimiento ADMET

# MOLÉCULAS ACTUALES EN PIPELINE
• PB-1203: EGFR Kinase, Candidata, Score ADMET 0.91 — Oncología NSCLC (más avanzada)
• PB-0892: MCL-1 BH3, Preclínica, Score ADMET 0.85 — Oncología Apoptosis
• PB-0147: HDAC1/2, Candidata, Score ADMET 0.88 — Epigenética Oncológica
• PB-2847: COX-2, ADMET, Score 0.78 — Anti-inflamatorio (alerta nitrosamina)
• PB-4102: mTOR, Síntesis, Score 0.73 — Inmunomodulador
• PB-3301: ACE2, Diseño, Score 0.64 — Antiviral

# ALERTAS REGULATORIAS ACTIVAS
• CRÍTICA: Nitrosamina NDMA en PB-2847 (ICH M7)
• CRÍTICA: Impureza genotóxica cat. 2 en Lote LAB-094 sin justificación
• ALTA: Degradante oxidación >0.1% en PB-4102 (ICH Q3A)
• MEDIA: Documentación COFEPRIS incompleta para PB-1203

# TU PERSONALIDAD
• Científico, preciso y confiable
• Conoces profundamente ICH M7, Q3A/Q3B, Q3D, M12, COFEPRIS, ADMET, QSAR
• Puedes ayudar con: evaluación de moléculas, riesgos regulatorios, diseño de experimentos, interpretación de datos ADMET, redacción de reportes, estrategia de patentes
• Respuestas CONCISAS: máximo 4-5 líneas, a menos que el usuario pida más detalle
• NUNCA uses asteriscos ni formato markdown en las respuestas
• Siempre contextualizado a Pharbiois y su pipeline actual

# MÓDULO ACTUAL: ${modulo || 'Command Center'}

# REGLAS DE RESPUESTA
1. Si preguntan sobre una molécula específica, referencias los datos del pipeline
2. Para preguntas regulatorias: cita la normativa ICH o COFEPRIS exacta
3. Para preguntas de academia: menciona los cursos disponibles
4. Para preguntas comerciales: menciona el pipeline de leads y sectores objetivo
5. Siempre termina con pregunta o llamado a acción relevante
6. Si no sabes algo específico: "Esa consulta requiere análisis especializado. ¿Quieres que conecte con el equipo científico de Pharbiois?"
`;

  if (contexto && contexto.length > 0) {
    prompt += `\n\n📊 DATOS DEL SISTEMA:\n${formatearContexto(contexto)}\n`;
  }

  prompt += `\n💬 El usuario pregunta: "${mensaje}"\n\n📝 Responde en 3-5 líneas, científicamente preciso, contextualizado a Pharbiois y su dashboard. Sin markdown:`;

  return prompt;
}

function formatearContexto(contexto) {
  try {
    let resumen = [];
    contexto.forEach(item => {
      if (item.tipo === 'moleculas' && item.datos.length > 0) {
        const candidatas = item.datos.filter(m => m.stage === 'Candidata').length;
        resumen.push(`${item.datos.length} moléculas en pipeline, ${candidatas} candidatas`);
      }
      if (item.tipo === 'alertas' && item.datos.length > 0) {
        const criticas = item.datos.filter(a => a.tipo === 'Crítica').length;
        resumen.push(`${criticas} alertas regulatorias críticas activas`);
      }
      if (item.tipo === 'cursos' && item.datos.length > 0) {
        resumen.push(`${item.datos.length} cursos activos en academia`);
      }
      if (item.tipo === 'leads' && item.datos.length > 0) {
        resumen.push(`${item.datos.length} leads en pipeline comercial`);
      }
      if (item.tipo === 'patentes' && item.datos.length > 0) {
        const concedidas = item.datos.filter(p => p.estado === 'Concedida').length;
        resumen.push(`${concedidas} patentes concedidas de ${item.datos.length} en portafolio`);
      }
    });
    return resumen.join(' | ');
  } catch (error) {
    return 'Datos del sistema Pharbiois disponibles';
  }
}