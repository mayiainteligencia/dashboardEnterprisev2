// Service for handling real LLM communication for MAYIA AI Assistant - Gas Station Inteligente

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

const STORAGE_KEY = 'MAYIA_LLM_CONFIG_GAS_STATION';

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

// Gas Station Inteligente System Prompt and Knowledge Base
const SYSTEM_PROMPT = `Eres MAYIA, el Copiloto de Inteligencia Artificial y Asistente Operativo de la "Gas Station Inteligente".

# TU ROL
Asistir en tiempo real a operadores de estación, despachadores, gerentes de turno, directores de operaciones y administradores de flotas corporativas.
Proporcionas información inmediata, análisis predictivo y control sobre los 8 módulos del ecosistema:

1. **Módulo 1: Monitoreo de Tanques y Telemetría IoT**: Capacidad de 160,000L en 4 tanques subterráneos (Magna 87, Premium 91, Diésel UBA, GNR Biogás), sondas TLS-450 Plus, detección de microfugas acústicas con IA, flujo de bombas (L/min) y cadena de custodia Blockchain.
2. **Módulo 2: Motor de Precios Dinámicos & Agentes IA**: Ajustes en tiempo real según tráfico, clima y competencia circundante (Shell, BP, Pemex, Mobil en 5km), sincronización con Tótem LED y acciones agénticas autónomas.
3. **Módulo 3: Seguridad Inteligente, VMS & Control de Pistas**: Cámaras Edge AI, lectura de matrículas ALPR, detección de farderos/fugas sin pagar con bloqueo inmediato de dispensarios, y optimización de tiempos de espera en pista (2.4 min promedio).
4. **Módulo 4: Cadena de Suministro e Inventario Retail (Odoo ERP)**: Reabastecimiento automático de pipas (20k/40k L), estantes inteligentes IoT en tienda de conveniencia con sensores de peso, y catálogo de productos hiperlocales.
5. **Módulo 5: Gestión de Clientes Corporativos y Flotas (OSS/BSS)**: 28 flotas activas (Castores, DHL, Bimbo, Patrullas), validación telemática de odómetro vs litros cargados, facturación electrónica CFDI 4.0 conciliada y detección de riesgo de abandono (Churn).
6. **Módulo 6: Experiencia del Cliente, Fidelización y Pagos Digitales**: 18,450 usuarios activos en App móvil, pagos sin fricción (ALPR Pay, Just Walk Out, In-Car Pay), casilleros Click & Collect y conserje por voz en isla.
7. **Módulo 7: Hub de Energía, Sostenibilidad y Electromovilidad**: Marquesinas solares fotovoltaicas (48.5 kW), banco de baterías BESS (102 kWh), 4 cargadores EV ultrarrápidos (150kW - 350kW CCS2/NACS) y BMS de climatización/iluminación.
8. **Módulo 8: Mantenimiento Predictivo, SDI y Gemelos Digitales**: Gemelo digital 3D interactivo, salud de bombas Wayne/Gilbarco, análisis de vibraciones RUL, 2 nodos Edge SDI locales con failover Fibra/5G y 100% uptime.

# REGLA DE ORO OPERATIVA
Garantizar la máxima seguridad operativa, precisión en el dispensado, rentabilidad de margen por litro y experiencia sin fricción para los clientes.

# INSTRUCCIONES DE RESPUESTA
1. Respuestas concisas, ejecutivas y estructuradas con viñetas claras.
2. Orientadas a la operación de la estación, telemetría y eficiencia energética.
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
    parts: [{ text: `[MÓDULO ACTIVO EN GAS STATION INTELIGENTE: ${moduleContext}]\n\n${promptText}` }]
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
      departamento: moduleContext || 'Gas Station General',
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
    return `¡Hola! Soy **MAYIA**, el Copiloto Inteligente de **Gas Station Inteligente**.

Actualmente estás en el módulo de **${moduleContext || 'Dashboard General'}**. Puedo ayudarte a verificar niveles de tanques en tiempo real (126,800L almacenados), estado de precios y competencia en tótem, alertas de matrículas ALPR, órdenes de pipas Odoo o el balance solar/EV. ¿Qué deseas consultar?`;
  }

  if (p.includes('tanque') || p.includes('nivel') || p.includes('fuga') || p.includes('litro') || p.includes('combustible') || p.includes('bomba')) {
    return `⛽ **Telemetría de Tanques & Bombas en Tiempo Real**

• **Capacidad Almacenada:** 126,800 L de 160,000 L (79.2% Lleno).
• **Magna 87:** 38,400 L (76.8%) · 3.8 días de autonomía.
• **Premium 91:** 29,800 L (74.5%) · 4.2 días de autonomía.
• **Diésel UBA:** 42,100 L (84.2%) · 5.1 días de autonomía.
• **GNR Biogás:** 16,500 L (82.5%) · 18.5 bar.
• **Detección de Fugas IA:** 0.00% fuga acústica, vacío intersticial en -18.2 InHg (Hermético).
• **Bombas:** 8 dispensarios activos despachando a un flujo promedio de 38.4 L/min.`;
  }

  if (p.includes('precio') || p.includes('competencia') || p.includes('totem') || p.includes('tótem') || p.includes('margen')) {
    return `📈 **Motor de Precios Dinámicos & IA**

• **Precios Actuales:** Magna: $23.89/L | Premium: $25.99/L | Diésel: $25.40/L | GNR: $14.50/L.
• **Sugerencia IA:** +$0.12/L en Magna para capturar margen de hora pico (17:00 a 20:00).
• **Radar Competencia (5 km):** Promedio de zona Magna en $24.18/L. Tenemos una ventaja de $0.29/L con respecto a Shell Circuito ($24.25/L).
• **Tótem Digital LED:** Sincronizado vía MQTT.`;
  }

  if (p.includes('seguridad') || p.includes('alpr') || p.includes('camara') || p.includes('cámara') || p.includes('placa') || p.includes('fuga sin pagar') || p.includes('lista negra')) {
    return `🛡️ **Seguridad VMS & Reconocimiento ALPR**

• **Lecturas ALPR Hoy:** 1,240 vehículos procesados (99.4% precisión).
• **Alerta Reciente:** Matrícula **XYZ-6660 (Dodge Neon Gris)** detectada con antecedente de fuga sin pagar en otra sucursal. La Bomba #8 fue **bloqueada automáticamente en 0.4s**.
• **Tiempos de Espera:** 2.4 min promedio en pista. Señalización digital activa dirigiendo vehículos hacia Bomba #2 libre.`;
  }

  if (p.includes('ev') || p.includes('solar') || p.includes('energia') || p.includes('energía') || p.includes('bateria') || p.includes('batería') || p.includes('cargador')) {
    return `⚡ **Hub de Energía, Sostenibilidad & Electromovilidad**

• **Generación Solar Marquesinas:** 48.5 kW/h (72% de autoconsumo directo).
• **Banco de Baterías BESS:** 85% de carga (102 kWh disponibles).
• **Postes EV Ultrarrápidos:** 3 de 4 postes ocupados suministrando 540 kW de potencia continua (CCS2 / Tesla NACS).
• **Consumo de Red CFE:** Reducido a solo 14.2 kW gracias a la microred inteligente.`;
  }

  return `🤖 **Copiloto MAYIA [${moduleContext || 'Gas Station Inteligente'}]**

He analizado tu consulta sobre *" ${promptText} "*.

• **Estatus Operativo:** 8 módulos funcionando al 100% de disponibilidad.
• **Despacho del Día:** 48,250 L ($1,124,500 MXN) con 1,240 vehículos atendidos.
• ¿Deseas que te lleve a algún módulo específico o necesitas ejecutar una acción operativa?`;
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
