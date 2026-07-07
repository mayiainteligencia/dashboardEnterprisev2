import pool from '../config/database.js';

// Estructura secuencial de las líneas de metro para el ruteador dinámico
const SECUENCIAS_LINEAS = {
  'L1': ['Observatorio', 'Tacubaya', 'Sevilla', 'Chapultepec', 'Insurgentes', 'Cuauhtémoc', 'Balderas', 'Salto del Agua', 'Pino Suárez', 'Merced', 'Candelaria', 'Moctezuma', 'Balbuena', 'Boulevard Puerto Aéreo', 'Gómez Farías', 'Zaragoza', 'Pantitlán'],
  'L2': ['Cuatro Caminos', 'Revolución', 'Hidalgo', 'Bellas Artes', 'Allende', 'Zócalo/Tenochtitlan', 'Pino Suárez', 'San Antonio Abad', 'Chabacano', 'Viaducto', 'Xola', 'Villa de Cortés', 'Nativitas', 'Portales', 'Ermita', 'General Anaya', 'Tasqueña'],
  'L3': ['Indios Verdes', 'Deportivo 18 de Marzo', 'La Raza', 'Guerrero', 'Hidalgo', 'Juárez', 'Balderas', 'Niños Héroes', 'Hospital General', 'Centro Médico', 'Eugenia', 'División del Norte', 'Zapata', 'Coyoacán', 'Viveros/Derechos Humanos', 'Miguel Ángel de Quevedo', 'Copilco', 'Universidad'],
  'L4': ['Martín Carrera', 'Consulado', 'Candelaria', 'Jamaica', 'Santa Anita'],
  'L5': ['Politécnico', 'Instituto del Petróleo', 'La Raza', 'Consulado', 'Oceanía', 'Pantitlán'],
  'L6': ['El Rosario', 'Instituto del Petróleo', 'Deportivo 18 de Marzo', 'Martín Carrera'],
  'L7': ['El Rosario', 'Polanco', 'Auditorio', 'Constituyentes', 'Tacubaya', 'San Antonio', 'Mixcoac', 'Barranca del Muerto'],
  'L8': ['Garibaldi/Lagunilla', 'Bellas Artes', 'Salto del Agua', 'Chabacano', 'Santa Anita', 'Atlalilco', 'Constitución de 1917'],
  'L9': ['Tacubaya', 'Patriotismo', 'Chilpancingo', 'Centro Médico', 'Lázaro Cárdenas', 'Chabacano', 'Jamaica', 'Velódromo', 'Ciudad Deportiva', 'Puebla', 'Pantitlán'],
  'LA': ['Pantitlán', 'La Paz'],
  'LB': ['Buenavista', 'Guerrero', 'Garibaldi/Lagunilla', 'San Lázaro', 'Oceanía', 'Ciudad Azteca'],
  'L12': ['Mixcoac', 'Insurgentes Sur', 'Hospital 20 de Noviembre', 'Zapata', 'Parque de los Venados', 'Eje Central', 'Ermita', 'Mexicaltzingo', 'Atlalilco', 'Culhuacán', 'San Andrés Tomatlán', 'Periférico Oriente', 'Olivos', 'Nopalera', 'Tláhuac']
};

// Construcción del grafo de ruteo
function construirGrafo() {
  const grafo = {};

  // Agregar estaciones e interconexiones de línea
  Object.entries(SECUENCIAS_LINEAS).forEach(([linea, estaciones]) => {
    for (let i = 0; i < estaciones.length; i++) {
      const actual = `${estaciones[i]} (${linea})`;
      
      if (!grafo[actual]) {
        grafo[actual] = { nombre: estaciones[i], linea, vecinos: [] };
      }

      // Conexión con la estación anterior en la misma línea
      if (i > 0) {
        const anterior = `${estaciones[i - 1]} (${linea})`;
        grafo[actual].vecinos.push({ destino: anterior, peso: 2.5, tipo: 'viaje' });
      }
      
      // Conexión con la estación siguiente en la misma línea
      if (i < estaciones.length - 1) {
        const siguiente = `${estaciones[i + 1]} (${linea})`;
        grafo[actual].vecinos.push({ destino: siguiente, peso: 2.5, tipo: 'viaje' });
      }
    }
  });

  // Agregar transbordos (estaciones con correspondencia)
  const estacionesPorNombre = {};
  Object.keys(grafo).forEach(key => {
    const node = grafo[key];
    if (!estacionesPorNombre[node.nombre]) {
      estacionesPorNombre[node.nombre] = [];
    }
    estacionesPorNombre[node.nombre].push(key);
  });

  Object.entries(estacionesPorNombre).forEach(([nombre, nodos]) => {
    if (nodos.length > 1) {
      // Es una estación de transferencia, conectar todos los nodos correspondientes
      for (let i = 0; i < nodos.length; i++) {
        for (let j = 0; j < nodos.length; j++) {
          if (i !== j) {
            grafo[nodos[i]].vecinos.push({ destino: nodos[j], peso: 5.0, tipo: 'transbordo' });
          }
        }
      }
    }
  });

  return grafo;
}

// Búsqueda de camino más corto usando Dijkstra/BFS modificado para tiempo
function encontrarRuta(grafo, origenNombre, destinoNombre) {
  const origenNodos = Object.keys(grafo).filter(k => grafo[k].nombre.toLowerCase().includes(origenNombre.toLowerCase()));
  const destinoNodos = Object.keys(grafo).filter(k => grafo[k].nombre.toLowerCase().includes(destinoNombre.toLowerCase()));

  if (origenNodos.length === 0 || destinoNodos.length === 0) {
    return null;
  }

  // Dijkstra para encontrar la ruta óptima
  let menorTiempo = Infinity;
  let mejorRuta = null;

  origenNodos.forEach(inicio => {
    const distancias = {};
    const previo = {};
    const cola = new Set(Object.keys(grafo));

    Object.keys(grafo).forEach(nodo => {
      distancias[nodo] = Infinity;
    });
    distancias[inicio] = 0;

    while (cola.size > 0) {
      // Encontrar nodo con distancia mínima
      let u = null;
      cola.forEach(nodo => {
        if (u === null || distancias[nodo] < distancias[u]) {
          u = nodeWithMinDist(nodo, u, distancias);
        }
      });

      function nodeWithMinDist(nodo, u, dist) {
        if (u === null) return nodo;
        return dist[nodo] < dist[u] ? nodo : u;
      }

      if (distancias[u] === Infinity) break;
      cola.delete(u);

      if (destinoNodos.includes(u)) {
        if (distancias[u] < menorTiempo) {
          menorTiempo = distancias[u];
          mejorRuta = reconstruirCamino(previo, u, grafo);
        }
      }

      grafo[u].vecinos.forEach(vecino => {
        if (cola.has(vecino.destino)) {
          const alt = distancias[u] + vecino.peso;
          if (alt < distancias[vecino.destino]) {
            distancias[vecino.destino] = alt;
            previo[vecino.destino] = u;
          }
        }
      });
    }
  });

  return mejorRuta ? { tiempoTotal: menorTiempo, ruta: mejorRuta } : null;
}

function reconstruirCamino(previo, actual, grafo) {
  const camino = [actual];
  while (previo[actual]) {
    actual = previo[actual];
    camino.unshift(actual);
  }
  return camino.map(nodo => ({
    nodoKey: nodo,
    nombre: grafo[nodo].nombre,
    linea: grafo[nodo].linea
  }));
}

// Convertir lista de nodos de ruta en pasos entendibles para el usuario
function estructurarInstrucciones(caminoInfo) {
  const pasos = [];
  let transbordos = 0;
  let lineaActual = null;
  let estacionInicio = null;
  let estacionesRecorridas = 0;

  for (let i = 0; i < caminoInfo.length; i++) {
    const actual = caminoInfo[i];
    const siguiente = caminoInfo[i + 1];

    if (i === 0) {
      lineaActual = actual.linea;
      estacionInicio = actual.nombre;
    }

    if (siguiente) {
      if (actual.linea !== siguiente.linea) {
        // Es un transbordo
        pasos.push({
          modo: 'metro',
          linea: lineaActual,
          desde: estacionInicio,
          hasta: actual.nombre,
          estaciones: estacionesRecorridas,
          descripcion: `Toma la Línea ${lineaActual} desde ${estacionInicio} hasta ${actual.nombre} (${estacionesRecorridas} estaciones).`
        });

        pasos.push({
          modo: 'transbordo',
          descripcion: `Transborda de la Línea ${lineaActual} a la Línea ${siguiente.linea} en la estación ${actual.nombre}. Tiempo estimado: 5 minutos.`,
          tiempo: 5
        });

        transbordos++;
        lineaActual = siguiente.linea;
        estacionInicio = actual.nombre; // Siguiente línea parte de la misma estación
        estacionesRecorridas = 0;
      } else {
        estacionesRecorridas++;
      }
    } else {
      // Último paso
      pasos.push({
        modo: 'metro',
        linea: lineaActual,
        desde: estacionInicio,
        hasta: actual.nombre,
        estaciones: estacionesRecorridas,
        descripcion: `Toma la Línea ${lineaActual} desde ${estacionInicio} hasta ${actual.nombre} (${estacionesRecorridas} estaciones).`
      });
    }
  }

  return { pasos, transbordos };
}

// ENDPOINTS CONTROLLER

// GET /api/rutas/buscar
export async function buscarRutas(req, res) {
  try {
    const { origen, destino, preferencia } = req.query;

    if (!origen || !destino) {
      return res.status(400).json({ error: 'Origen y destino son obligatorios.' });
    }

    const grafo = construirGrafo();
    const resultado = encontrarRuta(grafo, origen, destino);

    if (!resultado) {
      // Fallback a rutas simuladas de demo para lugares no encontrados en el grafo
      return res.json({
        success: true,
        origen,
        destino,
        tiempo: '35 min',
        transbordos: 0,
        costo: 5.00,
        pasos: [
          { modo: 'rtp', linea: 'Ordinario', desde: origen, hasta: destino, descripcion: `Toma autobús RTP en dirección a ${destino}.` }
        ]
      });
    }

    const { pasos, transbordos } = estructurarInstrucciones(resultado.ruta);
    const tiempoTotal = Math.ceil(resultado.tiempoTotal);
    const costo = 5.00; // Tarifa plana del metro CDMX

    res.json({
      success: true,
      origen: resultado.ruta[0].nombre,
      destino: resultado.ruta[resultado.ruta.length - 1].nombre,
      tiempo: `${tiempoTotal} min`,
      transbordos,
      costo,
      pasos,
      coordenadas: resultado.ruta // Útil para pintar en el mapa
    });

  } catch (error) {
    console.error('Error al buscar rutas:', error);
    res.status(500).json({ error: 'Error interno al procesar la ruta.' });
  }
}

// GET /api/alertas
export async function getAlertas(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM alertas WHERE activa = TRUE ORDER BY inicio DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener alertas:', error);
    res.status(500).json({ error: 'Error al obtener alertas del servicio.' });
  }
}

// GET /api/estaciones
export async function getEstaciones(req, res) {
  try {
    const { sistema, linea } = req.query;
    let query = `
      SELECT e.id, e.nombre, e.sistema, e.latitud, e.longitud, e.accesible, e.tiene_elevador, e.correspondencia, l.linea, l.color_hex
      FROM estaciones e
      LEFT JOIN lineas_metro l ON e.linea_id = l.id
    `;
    const params = [];

    if (sistema) {
      query += ' WHERE e.sistema = ?';
      params.push(sistema);
    }

    if (linea) {
      if (params.length > 0) {
        query += ' AND l.linea = ?';
      } else {
        query += ' WHERE l.linea = ?';
      }
      params.push(linea);
    }

    query += ' ORDER BY e.nombre ASC';
    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener estaciones:', error);
    res.status(500).json({ error: 'Error al obtener estaciones.' });
  }
}

// GET /api/salidas
export async function getSalidas(req, res) {
  try {
    const { estacion } = req.query;
    if (!estacion) {
      return res.status(400).json({ error: 'Estación es obligatoria.' });
    }

    // Buscar información de la estación
    const [estaciones] = await pool.query(
      `SELECT e.*, l.linea, l.color_hex 
       FROM estaciones e 
       JOIN lineas_metro l ON e.linea_id = l.id 
       WHERE e.nombre LIKE ?`, 
      [`%${estacion}%`]
    );

    if (estaciones.length === 0) {
      return res.status(404).json({ error: 'Estación no encontrada.' });
    }

    const dataSalidas = [];

    // Generar salidas estimadas dinámicas según la hora actual
    const ahora = new Date();
    const minutosActuales = ahora.getMinutes();

    estaciones.forEach(est => {
      const secuencia = SECUENCIAS_LINEAS[est.linea];
      if (!secuencia) return;

      const idx = secuencia.indexOf(est.nombre);
      const terminal1 = secuencia[0];
      const terminal2 = secuencia[secuencia.length - 1];

      // Salida en dirección Terminal 1 (si no es la terminal misma)
      if (idx > 0) {
        const tiempoEstimado1 = (5 - (minutosActuales % 5)) % 5 || 5; // Salidas cada 5 minutos
        dataSalidas.push({
          linea: est.linea,
          color: est.color_hex,
          direccion: terminal1,
          tiempoEstimado: tiempoEstimado1,
          frecuenciaBarra: Math.ceil(((5 - tiempoEstimado1) / 5) * 100)
        });
      }

      // Salida en dirección Terminal 2 (si no es la terminal misma)
      if (idx < secuencia.length - 1) {
        const tiempoEstimado2 = (4 - (minutosActuales % 4)) % 4 || 4; // Salidas cada 4 minutos
        dataSalidas.push({
          linea: est.linea,
          color: est.color_hex,
          direccion: terminal2,
          tiempoEstimado: tiempoEstimado2,
          frecuenciaBarra: Math.ceil(((4 - tiempoEstimado2) / 4) * 100)
        });
      }
    });

    res.json({
      estacion: estaciones[0].nombre,
      salidas: dataSalidas
    });

  } catch (error) {
    console.error('Error al calcular salidas en vivo:', error);
    res.status(500).json({ error: 'Error al calcular salidas en vivo.' });
  }
}

// GET /api/tarifas
export async function getTarifas(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM tarifas ORDER BY precio ASC');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener tarifas:', error);
    res.status(500).json({ error: 'Error al obtener tarifas.' });
  }
}

// GET /api/operadores
export async function getOperadores(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM operadores ORDER BY id ASC');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener operadores:', error);
    res.status(500).json({ error: 'Error al obtener operadores.' });
  }
}

// GET /api/lineas
export async function getLineas(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM lineas_metro ORDER BY id ASC');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener líneas:', error);
    res.status(500).json({ error: 'Error al obtener líneas.' });
  }
}
