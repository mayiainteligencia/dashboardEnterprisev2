import express from 'express';
import {
  buscarRutas,
  getAlertas,
  getEstaciones,
  getSalidas,
  getTarifas,
  getOperadores,
  getLineas
} from '../controllers/cdmxController.js';

const router = express.Router();

// Rutas de movilidad CDMX
router.get('/rutas/buscar', buscarRutas);
router.get('/alertas', getAlertas);
router.get('/estaciones', getEstaciones);
router.get('/salidas', getSalidas);
router.get('/tarifas', getTarifas);
router.get('/operadores', getOperadores);
router.get('/lineas', getLineas);

export default router;
