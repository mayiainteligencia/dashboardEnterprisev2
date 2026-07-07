import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { testConnection } from './config/database.js';
import { initGeminiClient } from './config/gemini.js';
import chatRoutes from './routes/chatRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

app.use(express.json({ limit: '10mb' }));

// WAI Platform Routes
// Lazy-load WAI routes to handle case where file may not exist yet
try {
  const waiRoutes = (await import('./routes/waiRoutes.js')).default;
  app.use('/api/wai', waiRoutes);
  console.log('✅ Rutas WAI cargadas: /api/wai');
} catch (e) {
  console.warn('⚠️ Rutas WAI no disponibles aún:', e.message);
}

// Chat Routes (Gemini AI)
app.use('/api/chat', chatRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    platform: 'WAI México Intelligence Platform',
    version: '2.0.0',
    event: 'WAI México Summit 2026 — Sep 24, 2026',
    message: 'Backend WAI corriendo correctamente' 
  });
});

// API info
app.get('/api', (req, res) => {
  res.json({
    platform: 'WAI México Intelligence Platform',
    endpoints: {
      community: '/api/wai/stats',
      delegaciones: '/api/wai/delegaciones',
      termometro: '/api/wai/termometro',
      documents: '/api/wai/documents',
      declaratoria: '/api/wai/declaratoria',
      networking: '/api/wai/networking',
      podcasts: '/api/wai/podcasts',
      marketplace: '/api/wai/marketplace',
      chat: '/api/chat',
    }
  });
});

// Iniciar servidor
async function startServer() {
  try {
    console.log('\n🚀 Iniciando WAI México Intelligence Platform Backend...\n');
    
    if (!process.env.GEMINI_API_KEY) {
      console.warn('⚠️ GEMINI_API_KEY no está configurada — funciones de IA limitadas');
    } else {
      initGeminiClient();
      console.log('✅ Cliente Gemini inicializado');
    }
    
    // Probar conexión a BD (opcional)
    try {
      await testConnection();
    } catch (dbErr) {
      console.warn('⚠️ BD no disponible — usando datos mock');
    }
    
    app.listen(PORT, () => {
      console.log(`\n✅ Servidor WAI corriendo en http://localhost:${PORT}`);
      console.log(`📡 API disponible en http://localhost:${PORT}/api`);
      console.log(`🏥 Health check: http://localhost:${PORT}/health\n`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error.message);
    process.exit(1);
  }
}

startServer();
