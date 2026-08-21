// Service for handling real LLM communication for MAYIA AI Assistant - FSPM CRM

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

const STORAGE_KEY = 'MAYIA_LLM_CONFIG_FSPM';

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

// FSPM System Prompt and Knowledge Base (Fire Safety & Protection Management)
const SYSTEM_PROMPT = `Eres MAYIA, el Asistente Inteligente y Copiloto Comercial de FSPM (Fire Safety & Protection Management).

# TU ROL
Asistir en tiempo real a ejecutivos comerciales (Fernanda Reza, Alfonso, Luis Gerardo, Edgar), directores y gerentes de FSPM.
Proporcionas análisis del pipeline comercial ($24.8M), control de cotizaciones externas (FSPM-2026-XXXX), seguimiento documental de licitaciones públicas/privadas (PEMEX, CFE, ASA, ASIPONA), asesoría técnica sobre productos contra incendio (FireAde 2000, Unidades Móviles, Sistemas CAFS, Mantenimiento SPCI) y estructura de Google Drive.

# CATÁLOGO DE PRODUCTOS & SERVICIOS FSPM
1. **Unidades Móviles FireAde**: Vehículos ligeros de intervención rápida 4x4 equipados con sistemas de espuma y polvo químico.
2. **Sistemas CAFS (Compressed Air Foam Systems)**: Alta capacidad de supresión para plataformas marinas, minería e industria pesada.
3. **Mantenimiento SPCI**: Pólizas integrales a redes de hidrantes, rociadores, bombas contra incendio y vehículos CREI aeroportuarios.
4. **Agente Extintor FireAde 2000**: Concentrado ecológico biodegradable con certificaciones UL y NFPA.
5. **Monitores y Rociadores**: Para muelles de hidrocarburos, subestaciones eléctricas y naves industriales.

# CARTERA CLAVE Y LICITACIONES (AGOSTO 2026)
- **CFE**: Equipamiento de unidades móviles ($890k) y concentrado FireAde ($2.1M). Contacto: Ing. Juan Pérez / Lic. Claudia Morales.
- **PEMEX**: Licitación SPCI en complejos procesadores ($6.8M) con fecha crítica <36h y sistemas CAFS ($4.5M). Resp: Luis Gerardo.
- **ASA**: Mantenimiento preventivo a vehículos de rescate CREI ($1.8M / $2.1M). Resp: Alfonso.
- **Ternium**: Modernización de rociadores ganada ($3.2M). Resp: Edgar.
- **Protección Civil CDMX & Grupo México**: Unidades ligeras 4x4 y sistemas para minería.

# REGLA DE ORO OPERATIVA
Ninguna oportunidad activa puede quedarse sin próxima acción con fecha compromiso.

# INSTRUCCIONES DE RESPUESTA
1. Respuestas concisas, profesionales y estructuradas con viñetas claras.
2. Orientadas a la conversión comercial, licitaciones y protección contra incendio.
3. Adapta las respuestas al módulo activo en pantalla.`;

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
    parts: [{ text: `[MÓDULO ACTIVO EN CRM FSPM: ${moduleContext}]\n\n${promptText}` }]
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

async function callBackendAPI(promptText: string, moduleContext: string): Promise<string> {
  const response = await fetch('/api/chat/message', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mensaje: promptText,
      departamento: moduleContext || 'FSPM General',
    }),
  });

  if (!response.ok) {
    throw new Error(`Error en servidor backend (${response.status})`);
  }

  const data = await response.json();
  if (data.respuesta) return data.respuesta;
  throw new Error('Respuesta inválida del backend');
}

function generateSmartContextualResponse(promptText: string, moduleContext: string): string {
  const p = promptText.toLowerCase();

  if (p.includes('hola') || p.includes('buenos') || p.includes('saludos') || p.includes('quién eres') || p.includes('quien eres')) {
    return `¡Hola! Soy **MAYIA**, la Inteligencia Artificial Comercial y de Licitaciones de **FSPM** (Fire Safety & Protection Management).

Actualmente te encuentras en el módulo de **${moduleContext || 'Dashboard General FSPM'}**. Puedo ayudarte a verificar el estatus de las licitaciones (PEMEX, CFE, ASA), consultar cotizaciones abiertas ($8.45M), revisar el checklist documental o dar seguimiento a oportunidades en el pipeline. ¿En qué te asesoro hoy?`;
  }

  if (p.includes('licitacion') || p.includes('licitación') || p.includes('pemex') || p.includes('cfe') || p.includes('comprasmx') || p.includes('checklist')) {
    return `🏛️ **Estatus de Licitaciones FSPM & Semáforo Crítico**

• **Licitación Crítica PEMEX (<36h):** Procedimiento LA-18-T0O para Mantenimiento SPCI ($6.8M). Falta descargar versión actualizada de Opinión SAT 32-D y póliza de garantía antes del 22/08 a las 10:00 AM.
• **Licitación CFE (3-10 días):** Unidades Móviles Ligeras ($3.4M). Checklist técnico al 85% listo por Alfonso y Edgar.
• **Licitación ASA (>10 días):** Mantenimiento de vehículos CREI aeroportuarios ($2.1M). En etapa de análisis de bases.`;
  }

  if (p.includes('cotizacion') || p.includes('cotización') || p.includes('propuesta') || p.includes('monto') || p.includes('precio')) {
    return `📄 **Control de Cotizaciones FSPM ($8.45M en propuesta)**

• **FSPM-2026-0183 (CFE):** Unidades Móviles FireAde por $890,000 MXN (+IVA: $1,032,400 MXN). Estado: Enviada. Próximo seguimiento: 22/08.
• **FSPM-2026-0180 (PEMEX):** Sistemas CAFS por $4,500,000 MXN. Estado: Negociación técnica con superintendente Roberto Silva.
• **Alerta de Seguimiento:** La cotización FSPM-2026-0178 (CFE - Concentrado FireAde $2.1M) acumula 7 días sin contacto registrado.`;
  }

  if (p.includes('fireade') || p.includes('cafs') || p.includes('spci') || p.includes('unidad') || p.includes('producto') || p.includes('extintor')) {
    return `🔥 **Soluciones y Equipamiento Contra Incendio FSPM**

• **Unidades Móviles FireAde:** Carrocerías 4x4 ligeras de primera respuesta con dosificación de concentrado ecológico 2000 (Certificaciones UL/NFPA).
• **Sistemas CAFS:** Inyección de aire comprimido para espuma de alta densidad en tanques y plataformas marinas.
• **Mantenimiento SPCI:** Cobertura de bombas diésel/eléctricas, cuartos de control, rociadores y sistemas de diluvio.`;
  }

  return `🤖 **Asistente FSPM MAYIA [${moduleContext || 'Gestión Comercial'}]**

He analizado tu consulta sobre *" ${promptText} "* en la plataforma de FSPM.

• **Pipeline Total:** $24.8M activos distribuidos en 41 oportunidades y 8 licitaciones públicas/privadas.
• **Acción Recomendada:** ¿Deseas que revise el checklist documental de alguna licitación o prefieres registrar un nuevo seguimiento comercial?`;
}

export async function sendLLMMessage(
  messages: LLMMessage[],
  promptText: string,
  moduleContext: string,
  onChunk?: (partialText: string) => void
): Promise<string> {
  const config = getStoredLLMConfig();

  if (config.apiKey && config.apiKey.trim().length > 10) {
    try {
      const fullText = await callDirectGeminiAPI(messages, promptText, config.apiKey.trim(), moduleContext);
      if (onChunk) onChunk(fullText);
      return fullText;
    } catch (err: any) {
      console.warn('Direct Gemini API call failed, falling back:', err.message);
    }
  }

  try {
    const fullText = await callBackendAPI(promptText, moduleContext);
    if (onChunk) onChunk(fullText);
    return fullText;
  } catch (err) {
    // Fallback to Smart Contextual Streaming Engine
  }

  const fullText = generateSmartContextualResponse(promptText, moduleContext);

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
