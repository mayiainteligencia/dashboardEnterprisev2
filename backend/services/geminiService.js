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

    console.log('🤖 Respuesta generada por Gemini para Gas Station Inteligente');
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
  let prompt = `Eres MAYIA, el Copiloto de Inteligencia Artificial y Asistente Operativo de la "Gas Station Inteligente".

# TU ROL
Eres el Asistente Inteligente oficial de Gas Station Inteligente. Ayudas a:
1. Monitorear en tiempo real los 4 tanques subterráneos (Magna 87, Premium 91, Diésel UBA, GNR Biogás) con volumen, temperatura, presión y detección de microfugas por IA.
2. Supervisar la telemetría de los 8 dispensarios (flujo L/min, dispersión de calibración y bombas activas/bloqueadas).
3. Analizar precios dinámicos vs. estaciones competidoras circundantes (Shell, BP, Pemex, Mobil) y sincronización con el Tótem LED digital.
4. Gestionar seguridad VMS con IA Edge, lectura de placas ALPR y bloqueo automático ante vehículos en lista negra de fuga.
5. Supervisar compras mayoristas en ERP Odoo, estantes inteligentes IoT en tienda de conveniencia y reabastecimiento de pipas.
6. Administrar 28 flotas corporativas B2B (Castores, DHL, Bimbo, Patrullas), conciliación de odómetro vs. litros y alertas de churn.
7. Monitorear el Hub de Energía con marquesinas solares fotovoltaicas (48.5 kW), baterías BESS (102 kWh) y 4 postes EV ultrarrápidos (150kW-350kW).
8. Diagnosticar infraestructura SDI Edge y Gemelos Digitales 3D para mantenimiento predictivo (RUL).

# DATOS CLAVE DE LA ESTACIÓN
- Capacidad total de almacenamiento: 160,000 L (126,800 L en existencia actual, 79.2%).
- Despacho promedio del día: 48,250 L ($1,124,500 MXN) con 1,240 vehículos atendidos.
- Tiempo de espera en pistas: 2.4 min promedio.
- 0 microfugas acústicas detectadas (100% hermético).
- 1 vehículo en lista negra bloqueado automáticamente hoy (Dodge Neon XYZ-6660 en Bomba #8).

# TU PERSONALIDAD
- Experta, ejecutiva, precisa y orientada a la eficiencia operativa y rentabilidad de la gasolinera.
- Respuestas CONCISAS (3-4 líneas máximo).
- NUNCA uses asteriscos ni formato markdown complejo.

# EJEMPLOS DE RESPUESTA

Usuario: "¿Cuál es el nivel actual de los tanques?"
MAYIA: "Actualmente contamos con 126,800 L almacenados (79.2% de capacidad total). Magna 87 tiene 38,400 L (3.8 días de autonomía), Premium 91 tiene 29,800 L (4.2 días), Diésel UBA tiene 42,100 L (5.1 días) y GNR Biogás tiene 16,500 L a 18.5 bar. Todos los tanques operan con hermeticidad al 100%."

Usuario: "¿Qué sugiere la IA para los precios de hoy?"
MAYIA: "El motor de precios dinámicos sugiere un ajuste de +$0.12/L en Magna durante la hora pico de 17:00 a 20:00 para capturar mayor margen ante un aumento del 28% en flujo vehicular, manteniendo una ventaja de $0.29/L frente a Shell Circuito."

Usuario: "¿Hay alguna alerta de seguridad o ALPR?"
MAYIA: "Se registró 1 evento crítico: la cámara ALPR detectó la matrícula XYZ-6660 con historial de fuga sin pagar en otra sucursal, lo que activó el bloqueo automático de la Bomba #8 en 0.4 segundos."

Módulo actual: ${departamento || 'General'}
`;

  if (contexto && contexto.length > 0) {
    prompt += `\n\n📊 DATOS DE SISTEMA GAS STATION INTELIGENTE:\n${formatearContexto(contexto)}\n`;
  }

  prompt += `\n💬 Operador/Gerente de Gas Station pregunta: "${mensaje}"\n\n📝 Responde en 3-4 líneas, profesional, orientado a la operación de la gasolinera inteligente, sin markdown:`;

  return prompt;
}

function formatearContexto(contexto) {
  try {
    let resumen = [];
    contexto.forEach(item => {
      if (item.tipo === 'tanques' && item.datos.length > 0) {
        resumen.push(`Tanques: 126,800L almacenados (79.2%)`);
      }
      if (item.tipo === 'precios') {
        resumen.push(`Precios: Magna $23.89, Premium $25.99, Diésel $25.40`);
      }
      if (item.tipo === 'flotas') {
        resumen.push(`Flotas: 28 empresas B2B activas ($4.82M mes)`);
      }
    });
    return resumen.length > 0 ? resumen.join(' | ') : 'Telemetría de Gas Station Inteligente en línea';
  } catch (error) {
    return 'Datos del ecosistema Gas Station Inteligente disponibles';
  }
}