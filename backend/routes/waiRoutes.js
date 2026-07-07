import express from 'express';
import {
  getCommunityStats,
  getDelegaciones,
  getTermometro,
  getDocuments,
  submitDocument,
  getDeclaratoriaStatus,
  getNetworkingMatches,
  getPodcasts,
  getMarketplace,
  submitRegistro
} from '../controllers/waiController.js';

const router = express.Router();

router.get('/stats', getCommunityStats);
router.get('/delegaciones', getDelegaciones);
router.get('/termometro', getTermometro);
router.get('/documents', getDocuments);
router.post('/documents', submitDocument);
router.get('/declaratoria', getDeclaratoriaStatus);
router.get('/networking', getNetworkingMatches);
router.get('/podcasts', getPodcasts);
router.get('/marketplace', getMarketplace);
router.post('/registro', submitRegistro);

export default router;
