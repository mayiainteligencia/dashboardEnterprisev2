import pool from '../config/database.js';

export async function buscarContextoEnDB(mensaje, modulo) {
  try {
    const mensajeLower = mensaje.toLowerCase();
    const resultados = [];

    // 1. Buscar estaciones mencionadas en el mensaje
    const [estaciones] = await pool.query(
      `SELECT e.nombre, e.sistema, l.linea 
       FROM estaciones e 
       JOIN lineas_metro l ON e.linea_id = l.id`
    );
    const estacionesEncontradas = estaciones.filter(e => 
      mensajeLower.includes(e.nombre.toLowerCase())
    );
    if (estacionesEncontradas.length > 0) {
      resultados.push({ tipo: 'estaciones', datos: estacionesEncontradas });
    }

    // 2. Buscar líneas del metro mencionadas (L1 - L12, o "línea X")
    const [lineas] = await pool.query('SELECT linea, nombre, estado, mensaje_estado FROM lineas_metro');
    const lineasEncontradas = lineas.filter(l => 
      mensajeLower.includes(l.linea.toLowerCase()) || 
      mensajeLower.includes(`línea ${l.linea.substring(1)}`) ||
      mensajeLower.includes(`linea ${l.linea.substring(1)}`)
    );
    if (lineasEncontradas.length > 0) {
      resultados.push({ tipo: 'lineas', datos: lineasEncontradas });
    }

    // 3. Buscar tarifas (si el mensaje pregunta por costos, precios o boletos)
    if (mensajeLower.includes('cost') || mensajeLower.includes('preci') || mensajeLower.includes('tarif') || mensajeLower.includes('boleto') || mensajeLower.includes('cuanto') || mensajeLower.includes('cuánto')) {
      const [tarifas] = await pool.query('SELECT sistema, categoria, precio, descripcion FROM tarifas');
      resultados.push({ tipo: 'tarifas', datos: tarifas });
    }

    // 4. Buscar alertas activas (si preguntan por demoras, fallas o estado en vivo)
    if (mensajeLower.includes('alerta') || mensajeLower.includes('retras') || mensajeLower.includes('falla') || mensajeLower.includes('accident') || mensajeLower.includes('lento') || mensajeLower.includes('operacion') || mensajeLower.includes('cómo está') || mensajeLower.includes('como esta')) {
      const [alertas] = await pool.query('SELECT sistema, linea, titulo, descripcion FROM alertas WHERE activa = TRUE');
      if (alertas.length > 0) {
        resultados.push({ tipo: 'alertas', datos: alertas });
      }
    }

    return resultados.length > 0 ? resultados : null;
  } catch (error) {
    console.error('Error al buscar contexto CDMX en DB:', error);
    return null;
  }
}
