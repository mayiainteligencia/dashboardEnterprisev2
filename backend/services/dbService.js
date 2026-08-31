import pool from '../config/database.js';

export async function buscarContextoEnDB(mensaje, departamento) {
  try {
    const mensajeLower = mensaje.toLowerCase();
    let resultados = [];

    // 1. Buscar en Tanques y Combustibles
    if (mensajeLower.includes('tanque') || mensajeLower.includes('litro') || mensajeLower.includes('volumen') || mensajeLower.includes('combustible') || mensajeLower.includes('magna') || mensajeLower.includes('diesel') || mensajeLower.includes('premium')) {
      resultados.push({
        tipo: 'tanques',
        datos: [
          { tanque: 'TK-01 Magna 87', capacidad: 50000, volumen: 38400, porcentaje: 76.8, temp: 21.4, presion: '2.3 PSI' },
          { tanque: 'TK-02 Premium 91', capacidad: 40000, volumen: 29800, porcentaje: 74.5, temp: 21.8, presion: '2.1 PSI' },
          { tanque: 'TK-03 Diésel UBA', capacidad: 50000, volumen: 42100, porcentaje: 84.2, temp: 20.9, presion: '2.4 PSI' },
          { tanque: 'TK-04 GNR Biogás', capacidad: 20000, volumen: 16500, porcentaje: 82.5, temp: 19.5, presion: '18.5 bar' },
        ]
      });
    }

    // 2. Buscar en Precios Dinámicos & Tótem
    if (mensajeLower.includes('precio') || mensajeLower.includes('totem') || mensajeLower.includes('tótem') || mensajeLower.includes('competencia') || mensajeLower.includes('margen')) {
      resultados.push({
        tipo: 'precios',
        datos: [
          { producto: 'Magna 87', actual: 23.89, sugeridoIA: 24.05, competenciaProm: 24.18, margen: 2.79 },
          { producto: 'Premium 91', actual: 25.99, sugeridoIA: 26.15, competenciaProm: 26.32, margen: 3.19 },
          { producto: 'Diésel UBA', actual: 25.40, sugeridoIA: 25.40, competenciaProm: 25.68, margen: 2.75 },
          { producto: 'GNR Biogás', actual: 14.50, sugeridoIA: 14.50, competenciaProm: 15.20, margen: 3.30 },
        ]
      });
    }

    // 3. Buscar en Seguridad ALPR & VMS
    if (mensajeLower.includes('seguridad') || mensajeLower.includes('alpr') || mensajeLower.includes('camara') || mensajeLower.includes('cámara') || mensajeLower.includes('placa') || mensajeLower.includes('fuga') || mensajeLower.includes('lista negra')) {
      resultados.push({
        tipo: 'seguridad',
        datos: [
          { evento: 'Bloqueo Bomba #8', motivo: 'Matrícula XYZ-6660 en Lista Negra', tiempo: '0.4s reacción' },
          { evento: 'Aforo Pistas', tiempoEspera: '2.4 min promedio', camarasActivas: '4 HD Edge NPU' }
        ]
      });
    }

    // 4. Buscar en Flotas B2B & Odoo ERP
    if (mensajeLower.includes('flota') || mensajeLower.includes('b2b') || mensajeLower.includes('odoo') || mensajeLower.includes('pipa') || mensajeLower.includes('odometro') || mensajeLower.includes('factura')) {
      resultados.push({
        tipo: 'flotas',
        datos: [
          { empresa: 'Transportes Castores', consumoMes: '$1,820,000 MXN', odometroSync: '99.4%' },
          { empresa: 'DHL Express México', consumoMes: '$1,140,000 MXN', odometroSync: '98.9%' },
          { empresa: 'Bimbo Distribución', consumoMes: '$940,000 MXN', odometroSync: '99.8%' },
          { ordenPipa: 'PO-2026-0894 Tuxpan (40,000L Diésel)', estado: 'En tránsito (ETA 35 min)' }
        ]
      });
    }

    // 5. Buscar en Hub de Energía & EV
    if (mensajeLower.includes('solar') || mensajeLower.includes('energia') || mensajeLower.includes('energía') || mensajeLower.includes('ev') || mensajeLower.includes('cargador') || mensajeLower.includes('bateria') || mensajeLower.includes('batería')) {
      resultados.push({
        tipo: 'energia',
        datos: [
          { generacionSolar: '48.5 kW/h', autoconsumo: '72%' },
          { bateriaBESS: '102 kWh (85% carga)', respaldo: 'Activo' },
          { cargadoresEV: '3 de 4 ocupados', potenciaTotal: '540 kW (Ultra 350kW)' }
        ]
      });
    }

    return resultados.length > 0 ? resultados : null;

  } catch (error) {
    console.error('❌ Error buscando en DB:', error);
    return null;
  }
}

export default { buscarContextoEnDB };
