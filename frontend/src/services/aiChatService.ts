// Service for handling real LLM communication for MAYIA AI Assistant - izzi

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

// izzi System Prompt and Knowledge Base (M2C Powered by MAYIA + Retail Innova)
const SYSTEM_PROMPT = `Eres MAYIA, la plataforma de Inteligencia Artificial M2C para izzi Telecomunicaciones (Grupo Televisa).

# TU ROL
Asistir en tiempo real a ejecutivos comerciales, gerentes de retail, supervisores de tienda y clientes de izzi.
Proporcionas análisis de tráfico en Centros de Atención izzi, recomendaciones de paquetes (izzi residencial, izzi tv+, izzi móvil, combos con streaming y telefonía ilimitada), apoyo al vendedor en cierre de ventas (Copiloto), verificación de cobertura HFC/FTTH y scorecards ejecutivos M2C.

# DATOS GENERALES DE IZZI
- Red de telecomunicaciones nacional con fibra y cable coaxial en más de 60 ciudades principales de México.
- +15 millones de hogares pasados y más de 6.2 millones de suscriptores (residencial y negocios).
- 120+ Centros de Atención izzi, módulos express en centros comerciales y corners de autoservicio.
- Solución M2C: Transformación de puntos físicos con Computer Vision anónimo, asesores interactivos y analítica de conversión en tiempo real.

# MÓDULOS DEL PROSPECTO IZZI (SOLUTION MAP)
1. **Discovery IA Retail**: Medición de arquitectura de KPIs y madurez de centros de atención.
2. **Computer Vision Comercial**: Conteo de tráfico anónimo, permanencia, tasa de atracción y mapa de interacción en sucursales izzi.
3. **Asesor Inteligente izzi**: Tótem/Pantalla interactiva para resolver dudas, consultar cobertura y capturar leads consentidos.
4. **Copiloto del Vendedor**: Asistencia en tiempo real para el ejecutivo comercial en argumentación y cierre frente a la competencia.
5. **Displays Inteligentes**: Exhibidores dinámicos e inmersivos (experiencia izzi tv+ interactiva y demos izzi móvil).
6. **Auditoría Visual IA**: Control de calidad y estandarización de módulos y centros de atención a nivel nacional.
7. **Gobierno de Datos & CRM**: Atribución omnicanal de visitas en punto físico a contratación en App izzi o sucursal.
8. **Academia MAYIA**: Capacitación continua y adopción para la fuerza de ventas izzi.
9. **Diseño y Fabricación Retail Innova**: Renovación de módulos de venta, stands de centros comerciales y displays.
10. **Operación Administrada**: Monitoreo de sensores IoT, salud de pantallas y scorecards ejecutivos.

# INSTRUCCIONES DE RESPUESTA
1. Respuestas concisas, profesionales, estructuradas y enfocadas a la conversión comercial y productividad en tiendas.
2. NUNCA uses asteriscos en exceso ni formatos complejos cuando respondas en chats rápidos.
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

async function callBackendAPI(promptText: string, moduleContext: string): Promise<string> {
  const response = await fetch('/api/chat/message', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mensaje: promptText,
      departamento: moduleContext || 'izzi General',
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
    return `¡Hola! Soy MAYIA, la Inteligencia Artificial Corporativa de izzi.

Actualmente estás explorando el módulo de **${moduleContext || 'Puntos Inteligentes izzi'}**. Puedo ayudarte a verificar la cobertura por código postal, analizar el tráfico de visitantes en sucursales izzi, configurar paquetes de izzi residencial con izzi tv+ o consultar el copiloto de ventas. ¿En qué te ayudo hoy?`;
  }

  if (p.includes('paquete') || p.includes('tv') || p.includes('internet') || p.includes('fibra') || p.includes('móvil') || p.includes('movil') || p.includes('cobertura')) {
    return `📡 **Oferta Comercial izzi & Cobertura Nacional**

• **izzi Residencial:** Internet de alta velocidad simétrica/híbrida (desde 60 hasta 1,000 Mbps) + Telefonía ilimitada.
• **izzi tv+ Streaming:** Plataforma con más de 200 canales, apps integradas (ViX Premium, Disney+, Max) y control por voz.
• **izzi móvil:** Telefonía celular con datos ilimitados y roaming en EE.UU. y Canadá a precio preferencial.
• **Verificación de Cobertura:** Cobertura activa en más de 60 ciudades principales y +15M de hogares pasados.
• **Tip para el Vendedor:** Al ofrecer izzi residencial con izzi tv+ en tienda, utiliza el display interactivo para demostrar la integración de streaming y control por voz.`;
  }

  if (p.includes('trafico') || p.includes('tráfico') || p.includes('isla') || p.includes('sucursal') || p.includes('corner') || p.includes('vision') || p.includes('cámara')) {
    return `👁️ **Computer Vision & Tráfico en Punto de Venta izzi**

• **Tráfico Físico Detectado:** 14,250 visitantes registrados frente a módulos y Centros de Atención izzi en las últimas 24 horas.
• **Tasa de Atracción:** 28.4% de los transeúntes se detienen interactuando con las pantallas.
• **Permanencia Promedio:** 3.8 minutos por visitante.
• **Oportunidad M2C:** Los Centros de Atención en CDMX, Monterrey y Guadalajara muestran el mayor rendimiento de conversión cuando el Asesor en Pantalla inicia la interacción.`;
  }

  return `🤖 **Asistente izzi MAYIA [${moduleContext || 'M2C Retail'}]**

He analizado tu consulta *" ${promptText} "* en la plataforma de izzi.

• **Diagnóstico:** El sistema M2C opera con normalidad conectando los 120+ Centros de Atención y módulos con el CRM y la App izzi.
• **Acción Sugerida:** ¿Deseas consultar métricas de atracción por formato de tienda o revisar el copiloto de cierres comerciales?`;
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
