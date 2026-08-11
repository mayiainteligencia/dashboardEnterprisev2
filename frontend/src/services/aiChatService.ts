// Service for handling real LLM communication for MAYIA AI Assistant

export interface LLMMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  moduleContext?: string;
}

export interface LLMConfig {
  apiKey?: string;
  provider: 'auto' | 'gemini_direct' | 'backend' | 'smart_engine';
  modelName: string;
}

const STORAGE_KEY = 'MAYIA_LLM_CONFIG';
// API key must be set via environment variables in backend/.env — never hardcode credentials in source code

export function getStoredLLMConfig(): LLMConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed;
    }
  } catch (e) {
    console.warn('Could not parse stored LLM config:', e);
  }
  return {
    apiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
    provider: 'gemini_direct',
    modelName: 'gemini-2.5-flash',
  };
}

export function saveLLMConfig(config: LLMConfig) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

// BESCO System Prompt and Knowledge Base
const SYSTEM_PROMPT = `Eres MAYIA, la Inteligencia Artificial Corporativa de BESCO - líder en México en gestión integral de flotillas, administración de inmuebles y compras empresariales.

# TU ROL
Asistir en tiempo real a ejecutivos, gerentes de operaciones, compradores y supervisores de BESCO.
Proporcionas análisis operacional, estado de flotillas, recomendaciones de compras, alertas de ciberseguridad, gestión de inventario, optimización presupuestal y consultas sobre la red del Grafo de Conocimiento (Knowledge Graph).

# DATOS GENERALES DE BESCO
- 400+ vehículos activos en flotilla comercial y pesada.
- 7,000 inmuebles administrados a nivel nacional.
- 35 centros operativos en México.
- Cobertura 24/7 en soporte logístico, mantenimiento predictivo y monitoreo CCTV con Visión Computacional.

# ACCESO Y ESQUEMA DEL GRAFO DE CONOCIMIENTO (NEO4J KNOWLEDGE GRAPH)
Tienes acceso total al Grafo de Conocimiento oficial de BESCO (35 Nodos interconectados):
- **Nodo Raíz (Root)**: \`BESCO\` (30 Módulos totales).
- **4 Macro-Secciones Operativas (Nodos de Nivel 1)**:

1. **Compras & Abastecimiento** (9 Módulos):
   - \`Requisiciones\`: Flujo de solicitudes por departamento. KPIs: 247 activas, 2.3d aprobación, 4.8% rechazo, $1.2M ahorro. IA: Asistente Creación PLN, Detección Duplicidad 48h.
   - \`Proveedores\`: Evaluación 360° y selección. KPIs: 186 activos, Score 87.3/100, 3 alertas. IA: AI Vendor Matcher, AI Risk Profile.
   - \`Cotizaciones\`: Bidding y negociación. KPIs: 34 abiertas, Ahorro 18.4%, Conv. 72%. IA: Simulador Negociación, Score VFM.
   - \`Inventario\`: Control de stock y almacenes. KPIs: 3,847 SKUs, $4.2M valor, 23 críticos. IA: Simulador Monte Carlo, Reabastecimiento 1-Click.
   - \`Aprobaciones\`: Firmas y autorizaciones. KPIs: 18 pendientes, 4.2h tiempo firma. IA: Motor Reglas Auto-IA.
   - \`Presupuesto\`: Control de gasto corporativo. KPIs: $8.5M total, 67.3% ejecutado. IA: Simulador What-If.
   - \`Órdenes de Compra\`: Seguimiento en tránsito. KPIs: 89 OCs, $3.1M tránsito. IA: Agrupador Cargas.
   - \`Impacto SLA\`: Monitoreo contractual. KPIs: 94.8% SLA global, $420K evitado. IA: Calculadora Penalizaciones.
   - \`Auditoría\`: Análisis forense e ISO 9001. KPIs: 14 hallazgos, 8 anomalías IA. IA: Generador Reporte ISO 9001.

2. **Flotillas & Logística** (9 Módulos):
   - \`Fleet Command Center\`: Monitoreo telemetrado satelital. KPIs: 387 vehículos, 24,850 km/día. IA: Feed Alertas Predictivas.
   - \`Optimización de Rutas\`: Trayectos eficientes. KPIs: 47 rutas, -23.4% km, -1.8t CO₂. IA: Re-enrutador Autónomo.
   - \`Mantenimiento Predictivo\`: Prevención fallas mecánicas. KPIs: 24 en taller, Uptime 96.2%. IA: Auto Scheduling.
   - \`Speed & Driver Risk AI\`: Evaluación conducción. KPIs: 67 km/h, Score 72/100. IA: Driver Profiler.
   - \`Agente de Pólizas\`: Documentos y seguros. KPIs: 387 pólizas, 98.4% cobertura. IA: Inmovilizador Digital TMS.
   - \`IA Gasto Operativo\`: Auditoría combustible y peajes. KPIs: $2.4M mensual, $18.4/km. IA: Detector Cargas Anómalas.
   - \`Copiloto Supervisor\`: Asistencia a jefes de turno. KPIs: 45 operadores, 234 entregas. IA: Briefing Matutino y Copilot Q&A.
   - \`Auditor Visual Evidencia\`: Visión computacional fotos. KPIs: 1,247 fotos, 94.8% cumpl. IA: Verificador Autenticidad.
   - \`Predicción Incumplimiento SLA\`: Anticipación retrasos. KPIs: 94.2% SLA, $680K evitado. IA: Intervención y Reasignación.

3. **Nuevos Negocios & Edificios** (8 Módulos):
   - \`Vigilancia CCTV IA\`: Seguridad activa Visión Computacional. KPIs: 128 cámaras, 99.2% prec. IA: Zoom Inspector Bounding Boxes.
   - \`Detección Emergencias\`: Sensores IoT fuego/humo. KPIs: 456 sensores, 12s resp. IA: Protocolos Automáticos Respuesta.
   - \`Building Health Score\`: Diagnóstico holístico inmueble. KPIs: Score 87/100, 94% OK. IA: Diagnóstico Adaptativo Subsistemas.
   - \`HVAC / UPS Predictivo\`: Climatización y energía. KPIs: 67 equipos, 99.1% uptime. IA: Calculadora ROI Preventivo.
   - \`Energy & Risk Intelligence\`: Optimización eléctrica. KPIs: 2,340 kWh, $18.4K. IA: Simulador Load Shifting.
   - \`Reporte Ejecutivo Cliente\`: Informes automáticos. KPIs: 24 reportes/mes, 96% sat. IA: Selector Corporativo Narrativo.
   - \`Facility Intelligence Portal\`: Gestión multi-sede. KPIs: 42 edificios, 93.8% SLA. IA: MAYIA Facility Insight.
   - \`Upsell Scoring Cartera\`: Propensión comercial. KPIs: 34 oport, $4.2M pot. IA: Generador Pitch Comercial 1-Click.

4. **Capacitación & Seguridad TI** (4 Módulos):
   - \`Academia MAYIA\`: E-learning corporativo y certificaciones. KPIs: 32 cursos activos, 234 empleados capacitándose, 89 certificaciones/mes. IA: Learning Path personalizado adaptativo.
   - \`Ciberseguridad\`: Monitoreo cibernético y UEBA. KPIs: Threat Score 23/100 (Bajo), 1,247 ataques bloqueados 24h, 97.8% ISO 27001. IA: Threat Intel Dashboard MITRE ATT&CK.
   - \`Mesa de Ayuda\`: Soporte y atención a tickets. KPIs: 67 tickets abiertos, 3.4 min resolución, 98.2% satisfacción. IA: MAYIA AI Assist clasificación y respuesta.
   - \`Centro de Monitoreo\`: Videowall y supervisión centralizada. KPIs: 64 feeds videowall, 23 alertas 24h, 99.7% uptime. IA: Correlación multi-cámara y resumen de turno.

# INSTRUCCIONES DE RESPUESTA
1. Respuestas concisas, profesionales, estructuradas y enfocadas a la acción (utiliza viñetas, negritas y encabezados).
2. Si el usuario te pregunta sobre el Grafo de Conocimiento, consultas Cypher, relaciones o métricas de cualquier módulo, responde utilizando los datos oficiales del esquema.
3. Si el usuario te pregunta sobre el módulo actual en pantalla, responde específicamente con sus datos operativos.
`;

/**
 * Call direct Google Gemini API via REST
 */
async function callDirectGeminiAPI(
  messages: LLMMessage[],
  promptText: string,
  apiKey: string,
  moduleContext: string
): Promise<string> {
  const model = getStoredLLMConfig().modelName || 'gemini-2.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const contents = messages.map(m => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }]
  }));

  contents.push({
    role: 'user',
    parts: [{ text: `[MÓDULO EN PANTALLA: ${moduleContext}]\n\n${promptText}` }]
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800,
      }
    })
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error?.message || `HTTP ${response.status}: Error en Gemini API`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('No se recibió texto de la API de Gemini');
  return text;
}

/**
 * Call backend Express server (/api/chat/message)
 */
async function callBackendAPI(promptText: string, moduleContext: string): Promise<string> {
  const response = await fetch('/api/chat/message', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mensaje: promptText,
      departamento: moduleContext || 'BESCO General',
    }),
  });

  if (!response.ok) {
    throw new Error(`Error en servidor backend (${response.status})`);
  }

  const data = await response.json();
  if (data.respuesta) return data.respuesta;
  throw new Error('Respuesta inválida del backend');
}

/**
 * Smart Contextual Engine Fallback (Generates intelligent, live-simulated responses based on system knowledge)
 */
function generateSmartContextualResponse(promptText: string, moduleContext: string): string {
  const p = promptText.toLowerCase();
  const mod = (moduleContext || '').toLowerCase();

  if (p.includes('hola') || p.includes('buenos') || p.includes('saludos') || p.includes('quién eres') || p.includes('quien eres')) {
    return `¡Hola! Soy MAYIA, la Inteligencia Artificial Corporativa de BESCO. 

Actualmente estás explorando el módulo de **${moduleContext || 'Dashboard General'}**. Puedo ayudarte a analizar métricas de rendimiento, optimizar rutas, monitorear la salud de tus flotillas, gestionar presupuestos o revisar alertas de ciberseguridad. ¿Qué proceso deseas que revisemos hoy?`;
  }

  if (p.includes('flota') || p.includes('vehiculo') || p.includes('vehículo') || p.includes('ruta') || p.includes('mantenimiento') || mod.includes('flotilla') || mod.includes('rutas')) {
    return `📊 **Análisis de Flotilla BESCO - MAYIA Engine**

Actualmente tenemos **387 vehículos en operación activa** a nivel nacional con una eficiencia promedio de 8.4 km/L.

• **Mantenimiento Predictivo:** 8 unidades requieren intervención preventiva en los próximos 14 días (principalmente en sistema de frenado y suspensión).
• **Optimización de Rutas:** Se han re-optimizado 47 rutas hoy, logrando una reducción de 23.4% en kilómetros recorridos.
• **Risk Scoring:** 8 conductores registran eventos atípicos de velocidad. Te sugiero asignar el módulo de capacitación defensiva desde la sección de Speed AI.`;
  }

  if (p.includes('compras') || p.includes('proveedor') || p.includes('cotiza') || p.includes('inventario') || p.includes('presupuesto') || mod.includes('compras') || mod.includes('proveedor')) {
    return `🛍️ **Gestión de Compras & Abastecimiento BESCO**

• **Requisiciones Activas:** 247 solicitudes procesadas con un tiempo promedio de aprobación de 2.3 días.
• **Ahorro Acumulado IA:** $1.2M MXN mediante consolidación inteligente de órdenes de compra.
• **Evaluación de Proveedores:** 186 proveedores auditados con un score promedio de calidad del 87.3%.
• **Alertas de Stock:** 23 ítems en almacén Nave Sur se encuentran cerca del punto de reorden. ¿Deseas que auto-genere las órdenes de abastecimiento?`;
  }

  if (p.includes('cctv') || p.includes('camara') || p.includes('cámara') || p.includes('edificio') || p.includes('seguridad') || mod.includes('cctv') || mod.includes('edificio')) {
    return `🏢 **Facility & Smart Building Intelligence**

• **Monitoreo CCTV:** 128 cámaras en vivo activas con Visión Computacional (Precisión IA: 98.5%).
• **Smart Building Health Score:** 87/100 global. Sistemas de HVAC y bombas eléctricas operando al 94% de eficiencia.
• **Detección de Riesgos:** 3 eventos de consumo energético atípico detectados en horario pico. Se recomienda desplazar 15% de la carga a horario valle para un ahorro mensual estimado de $12,400 MXN.`;
  }

  if (p.includes('ciberseguridad') || p.includes('amenaza') || p.includes('hack') || p.includes('virus')) {
    return `🛡️ **Ciberresiliencia & Threat Intelligence**

• **Threat Score:** 23/100 (Bajo riesgo general).
• **Ataques Bloqueados 24h:** 1,247 intentos de escaneo y phishing neutralizados por la IA.
• **Recomendación:** Se sugiere actualizar las firmas de endpoint en los 7 nodos señalados con vulnerabilidad media.`;
  }

  return `🤖 **Análisis MAYIA IA para [${moduleContext || 'BESCO Enterprise'}]**

He analizado tu consulta *" ${promptText} "* en relación a la operación actual de BESCO.

• **Diagnóstico de Proceso:** Los sistemas operativos muestran una eficiencia del 94.2% respecto a los SLAs establecidos.
• **Recomendación Autónoma:** Se sugiere monitorear el flujo de aprobaciones y verificar el estado de alertas de abastecimiento en la barra lateral.
• **Acción Sugerida:** ¿Deseas que ejecute un reporte detallado o que reasigne parámetros para este módulo?`;
}

/**
 * Main function to send message to LLM (with fallback strategy)
 */
export async function sendLLMMessage(
  messages: LLMMessage[],
  promptText: string,
  moduleContext: string,
  onChunk?: (partialText: string) => void
): Promise<string> {
  const config = getStoredLLMConfig();

  // 1. Try Direct Gemini API if API key exists
  if (config.apiKey && config.apiKey.trim().length > 10) {
    try {
      console.log('⚡ Calling direct Gemini API...');
      const fullText = await callDirectGeminiAPI(messages, promptText, config.apiKey.trim(), moduleContext);
      if (onChunk) onChunk(fullText);
      return fullText;
    } catch (err: any) {
      console.warn('Direct Gemini API call failed, falling back:', err.message);
    }
  }

  // 2. Try Backend API
  try {
    console.log('📡 Calling backend /api/chat/message...');
    const fullText = await callBackendAPI(promptText, moduleContext);
    if (onChunk) onChunk(fullText);
    return fullText;
  } catch (err) {
    console.log('Backend server not available, executing Smart Contextual LLM Engine...');
  }

  // 3. Fallback: Smart Contextual Streaming Engine
  const fullText = generateSmartContextualResponse(promptText, moduleContext);

  // Simulate realistic word-by-word streaming effect
  if (onChunk) {
    const words = fullText.split(' ');
    let current = '';
    for (let i = 0; i < words.length; i++) {
      current += (i === 0 ? '' : ' ') + words[i];
      onChunk(current);
      await new Promise(r => setTimeout(r, 18 + Math.random() * 20));
    }
  }

  return fullText;
}
