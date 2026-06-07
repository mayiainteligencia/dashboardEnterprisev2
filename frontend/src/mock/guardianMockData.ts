// ─────────────────────────────────────────────────────────────────────────────
// Guardian Digital MX — Datos mock para el blueprint demo.
// 100% frontend. Nada de red. Funciones locales + constantes.
// Los colores NO viven aquí: se consumen desde brandingConfig en cada widget.
// ─────────────────────────────────────────────────────────────────────────────

export type Severidad = 'critica' | 'alta' | 'media' | 'baja';
export type EstadoAlerta = 'Bloqueado' | 'Detectado y reportado' | 'En análisis';

// ── Tiers ────────────────────────────────────────────────────────────────────
export interface Tier {
  id: number;
  nombre: string;
  sla: string;
}
export const tiers: Tier[] = [
  { id: 1, nombre: 'Creador Digital', sla: '< 12h' },
  { id: 2, nombre: 'Figura Pública', sla: '< 2h' },
  { id: 3, nombre: 'Elite / Leyenda', sla: '< 30min' },
];

// ── Alertas de amenazas recientes ─────────────────────────────────────────────
export interface AlertaAmenaza {
  id: string;
  timestamp: string;
  titulo: string;
  estado: EstadoAlerta;
  severidad: Severidad;
  cliente: string;
  tipo: string;
  plataforma: string;
  descripcion: string;
}

export const alertasIniciales: AlertaAmenaza[] = [
  {
    id: 'a1', timestamp: '10:15',
    titulo: 'Intento de suplantación de voz (CEO)',
    estado: 'Bloqueado', severidad: 'critica',
    cliente: 'Grupo Salinas', tipo: 'Synthetic Voice', plataforma: 'WhatsApp',
    descripcion: 'Clonación de voz dirigida a transferencia bancaria interna. Watermark biométrico no presente. Bloqueado en canal seguro.',
  },
  {
    id: 'a2', timestamp: '10:12',
    titulo: 'Deepfake de ejecutivo en YouTube',
    estado: 'Detectado y reportado', severidad: 'alta',
    cliente: 'Tier 3 — Leyenda', tipo: 'Deepfake', plataforma: 'YouTube',
    descripcion: 'Video promocional fraudulento de inversión cripto usando rostro sintético. 99% sintético. DMCA generado.',
  },
  {
    id: 'a3', timestamp: '10:05',
    titulo: 'Campaña de desinformación sintética',
    estado: 'En análisis', severidad: 'media',
    cliente: 'Figura Pública', tipo: 'Social Media Impersonation', plataforma: 'X',
    descripcion: 'Red de 14 cuentas amplificando declaraciones falsas. Análisis de coordinación en curso.',
  },
  {
    id: 'a4', timestamp: '09:58',
    titulo: 'Clonación de imagen en TikTok',
    estado: 'Bloqueado', severidad: 'alta',
    cliente: 'Creador Digital', tipo: 'Deepfake', plataforma: 'TikTok',
    descripcion: 'Avatar IA no licenciado promocionando producto. Takedown automático ejecutado.',
  },
];

// Plantillas para generar alertas nuevas en "tiempo real"
const titulosNuevos = [
  'Deepfake de conductor en stream',
  'Voz sintética en llamada fraudulenta',
  'Perfil falso en Instagram detectado',
  'Lip-sync mismatch en entrevista viral',
  'Reuso no licenciado de likeness',
  'Audio clonado en podcast pirata',
];
const tiposNuevos = ['Deepfake', 'Synthetic Voice', 'Identity Theft', 'Social Media Impersonation'];
const plataformasNuevas = ['YouTube', 'TikTok', 'X', 'Meta', 'Instagram', 'WhatsApp'];
const clientesNuevos = ['Creador Digital', 'Figura Pública', 'Tier 3 — Leyenda', 'CEO Corporativo'];
const estadosNuevos: EstadoAlerta[] = ['Bloqueado', 'Detectado y reportado', 'En análisis'];
const severidadesNuevas: Severidad[] = ['critica', 'alta', 'media', 'baja'];

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const generarAlerta = (): AlertaAmenaza => {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  return {
    id: `a-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: `${hh}:${mm}`,
    titulo: pick(titulosNuevos),
    estado: pick(estadosNuevos),
    severidad: pick(severidadesNuevas),
    cliente: pick(clientesNuevos),
    tipo: pick(tiposNuevos),
    plataforma: pick(plataformasNuevas),
    descripcion: 'Evento sintético detectado por la red neuronal de autenticidad. Pipeline de respuesta activado automáticamente.',
  };
};

// ── KPIs grandes ──────────────────────────────────────────────────────────────
export const kpis = {
  idsScore: 92,            // Puntuación de Seguridad de Identidad / 100
  amenazasHoy: 7341,
  desgloseAmenazas: [
    { tipo: 'Deepfakes', valor: 3120 },
    { tipo: 'Synthetic Voice', valor: 1890 },
    { tipo: 'Identity Theft', valor: 1430 },
    { tipo: 'Social Media Impersonation', valor: 901 },
  ],
  alertasCriticasBloqueadas: 25,
  coberturaBlindaje: 98,   // %
  tiempoRespuesta: 1.8,    // segundos
};

// ── Deepfakes (video) ─────────────────────────────────────────────────────────
export interface MuestraDeepfake {
  id: string;
  etiqueta: string;
  porcentajeSintetico: number;
}
export const muestrasDeepfake: MuestraDeepfake[] = [
  { id: 'd1', etiqueta: 'Clip #4471', porcentajeSintetico: 99 },
  { id: 'd2', etiqueta: 'Clip #4472', porcentajeSintetico: 99 },
  { id: 'd3', etiqueta: 'Clip #4473', porcentajeSintetico: 1 },
];

// ── Monitoreo de redes — grafo ────────────────────────────────────────────────
export interface NodoRed {
  id: string;
  x: number; // %
  y: number; // %
  detectado: boolean;
  label: string;
}
export const nodosRedIniciales: NodoRed[] = [
  { id: 'n1', x: 25, y: 30, detectado: false, label: '@perfil_01' },
  { id: 'n2', x: 75, y: 25, detectado: true, label: '@fake_ceo' },
  { id: 'n3', x: 80, y: 70, detectado: false, label: '@clip_bot' },
  { id: 'n4', x: 20, y: 72, detectado: true, label: '@impostor_x' },
  { id: 'n5', x: 50, y: 85, detectado: false, label: '@mirror_99' },
];

// ── Verificación biométrica ───────────────────────────────────────────────────
export interface LogBiometrico {
  timestamp: string;
  metodo: string;
}
export const biometria: Record<'Face' | 'Voice' | 'Fingerprint' | 'Iris', { match: number; logs: LogBiometrico[] }> = {
  Face: { match: 95, logs: [{ timestamp: '10:14:02', metodo: 'Face — login dashboard' }, { timestamp: '09:51:30', metodo: 'Face — re-auth' }] },
  Voice: { match: 10, logs: [{ timestamp: '10:09:11', metodo: 'Voice — challenge fallido' }] },
  Fingerprint: { match: 59, logs: [{ timestamp: '10:01:44', metodo: 'Fingerprint — parcial' }] },
  Iris: { match: 0, logs: [{ timestamp: '—', metodo: 'Iris — sin escaneo' }] },
};

// ── Mapa global — hot-spots ───────────────────────────────────────────────────
export interface HotSpot {
  id: string;
  lat: number;
  lng: number;
  severidad: Severidad;
  ciudad: string;
}
export const hotspotsBase: Omit<HotSpot, 'id'>[] = [
  { lat: 19.43, lng: -99.13, severidad: 'critica', ciudad: 'CDMX' },
  { lat: 34.05, lng: -118.24, severidad: 'alta', ciudad: 'Los Ángeles' },
  { lat: 51.51, lng: -0.13, severidad: 'media', ciudad: 'Londres' },
  { lat: 6.52, lng: 3.38, severidad: 'alta', ciudad: 'Lagos' },
  { lat: 19.08, lng: 72.88, severidad: 'critica', ciudad: 'Mumbai' },
  { lat: 35.68, lng: 139.69, severidad: 'media', ciudad: 'Tokio' },
  { lat: -23.55, lng: -46.63, severidad: 'baja', ciudad: 'São Paulo' },
  { lat: -33.87, lng: 151.21, severidad: 'alta', ciudad: 'Sídney' },
];

// ── Tendencia 30 días (multi-serie) ───────────────────────────────────────────
export interface PuntoTendencia {
  dia: string;
  Deepfakes: number;
  'Synthetic Voice': number;
  'Identity Theft': number;
  'Social Media Impersonation': number;
  Total: number;
}
export const tendencia30d: PuntoTendencia[] = Array.from({ length: 30 }, (_, i) => {
  const base = 40 + i * 4;
  const df = Math.round(base + Math.sin(i / 2) * 18 + Math.random() * 12);
  const sv = Math.round(base * 0.6 + Math.cos(i / 3) * 10 + Math.random() * 8);
  const it = Math.round(base * 0.5 + Math.sin(i / 4) * 8 + Math.random() * 6);
  const sm = Math.round(base * 0.4 + Math.random() * 10);
  return {
    dia: `D${i + 1}`,
    Deepfakes: df,
    'Synthetic Voice': sv,
    'Identity Theft': it,
    'Social Media Impersonation': sm,
    Total: df + sv + it + sm,
  };
});

// ── Informes ──────────────────────────────────────────────────────────────────
export interface Informe {
  id: string;
  titulo: string;
  fecha: string;
  resumen: string;
}
export const informes: Informe[] = [
  { id: 'r1', titulo: 'Informe mensual de seguridad', fecha: 'Mayo 2026', resumen: '7,341 amenazas mitigadas. 25 incidentes críticos bloqueados. SLA cumplido al 99.2%.' },
  { id: 'r2', titulo: 'Análisis de tendencias de deepfakes Q2', fecha: 'Q2 2026', resumen: 'Incremento de 38% en deepfakes de video. Lip-sync mismatch es el artefacto más frecuente.' },
  { id: 'r3', titulo: 'Auditoría de cumplimiento', fecha: 'Mayo 2026', resumen: 'Registro híbrido IMPI/INDAUTOR/INAI verificado. Notariado digital sin discrepancias.' },
];

// ── Configuración del sistema ─────────────────────────────────────────────────
export const sistemaItems = [
  { id: 's1', titulo: 'Salud de sistema', estado: 'Operativo', ok: true },
  { id: 's2', titulo: 'Actualizaciones', estado: '2 disponibles', ok: false },
  { id: 's3', titulo: 'Roles del usuarios', estado: '12 activos', ok: true },
];

// ── Footer ecosistema ─────────────────────────────────────────────────────────
export const ecosistema = ['EdgeNet', 'Evara', 'Arochi & Lindner'];

// ═══════════════════════════════════════════════════════════════════════════════
// DATOS PARA LAS 5 VISTAS
// ═══════════════════════════════════════════════════════════════════════════════

// ── Legal & IP ────────────────────────────────────────────────────────────────
export const pipelineLegal = [
  'Registro IMPI', 'INDAUTOR', 'INAI', 'Notariado digital', 'Takedown', 'Litigio',
];

export interface Contrato {
  id: string;
  cliente: string;
  tipo: string;
  estado: string;
  vigencia: string;
}
export const contratosActivos: Contrato[] = [
  { id: 'c1', cliente: 'Talento A. Lindner', tipo: 'Licencia de voz IA', estado: 'Activo', vigencia: '2026–2028' },
  { id: 'c2', cliente: 'Figura Pública 02', tipo: 'Likeness IA', estado: 'En firma', vigencia: '2026–2027' },
  { id: 'c3', cliente: 'CEO Corporativo', tipo: 'Contrato de uso restringido', estado: 'Activo', vigencia: '2025–2030' },
  { id: 'c4', cliente: 'Creador Digital 14', tipo: 'Watermarking biométrico', estado: 'Renovación', vigencia: '2026' },
];

export const areasViables = {
  verde: ['Registro de marcas', 'Contratos de licencia IA', 'Takedowns automáticos', 'Notariado digital'],
  amarilla: ['Registro privado de huellas vocales', 'Certificación likeness IA', 'Watermarking biométrico'],
  roja: ['Dueño absoluto de identidad humana', 'Monopolios universales', 'Prohibición de parodias'],
};

// ── AI Forensics ──────────────────────────────────────────────────────────────
export interface AnalisisForense {
  id: string;
  nombre: string;
  porcentajeSintetico: number;
  tipo: string;
}
export const analisisRecientes: AnalisisForense[] = [
  { id: 'f1', nombre: 'entrevista_viral.mp4', porcentajeSintetico: 97, tipo: 'Deepfake' },
  { id: 'f2', nombre: 'llamada_ceo.wav', porcentajeSintetico: 87, tipo: 'Synthetic Voice' },
  { id: 'f3', nombre: 'clip_promo.mp4', porcentajeSintetico: 4, tipo: 'Auténtico' },
  { id: 'f4', nombre: 'stream_corte.mp4', porcentajeSintetico: 91, tipo: 'Deepfake' },
  { id: 'f5', nombre: 'podcast_ep12.mp3', porcentajeSintetico: 78, tipo: 'Synthetic Voice' },
  { id: 'f6', nombre: 'spot_tv.mp4', porcentajeSintetico: 12, tipo: 'Auténtico' },
];

export const artefactosDetectados = [
  { tipo: 'Inconsistencias de parpadeo', conteo: 142 },
  { tipo: 'Frecuencias residuales', conteo: 98 },
  { tipo: 'Blending facial', conteo: 76 },
  { tipo: 'Lip-sync mismatch', conteo: 184 },
];

export const distribucionAtaques = [
  { tipo: 'Deepfake video', valor: 44 },
  { tipo: 'Voz sintética', valor: 27 },
  { tipo: 'Robo de identidad', valor: 18 },
  { tipo: 'Impersonación social', valor: 11 },
];

// ── Identity Vault ────────────────────────────────────────────────────────────
export const vaultModalidades = ['Voz', 'Rostro', 'Iris', 'Motion Capture'] as const;
export const vaultStats = { perfiles: 247, cifrado: 'AES-256 + blockchain', embeddings: 1183 };

export const irisCapas = [
  { capa: 'Textura', valor: 99.1 },
  { capa: 'Patrón', valor: 98.7 },
  { capa: 'Vascularización', valor: 97.9 },
];

export const wizardPasos = ['Onboarding legal', 'Captura biométrica', 'Generación de embedding', 'Registro en blockchain'];

// ── Licensing Marketplace ─────────────────────────────────────────────────────
export interface IdentidadLicenciable {
  id: string;
  nombre: string;
  tipo: 'Voz' | 'Imagen' | 'Avatar 3D';
  tier: number;
  tarifa: string;
}
export const identidadesLicenciables: IdentidadLicenciable[] = [
  { id: 'l1', nombre: 'Aria Velázquez', tipo: 'Voz', tier: 3, tarifa: '$12,000 / uso' },
  { id: 'l2', nombre: 'Marco Téllez', tipo: 'Imagen', tier: 2, tarifa: '$6,500 / campaña' },
  { id: 'l3', nombre: 'Nova Studio', tipo: 'Avatar 3D', tier: 2, tarifa: '$9,800 / proyecto' },
  { id: 'l4', nombre: 'Lía Fontana', tipo: 'Voz', tier: 1, tarifa: '$2,400 / uso' },
  { id: 'l5', nombre: 'D. Quiroga', tipo: 'Imagen', tier: 3, tarifa: '$15,000 / campaña' },
  { id: 'l6', nombre: 'Helix Avatar', tipo: 'Avatar 3D', tier: 1, tarifa: '$3,900 / proyecto' },
];

// ── Enforcement Engine ────────────────────────────────────────────────────────
export interface CasoEnforcement {
  id: string;
  caso: string;
  plataforma: string;
  severidad: Severidad;
  estado: string;
}
export const casosEnforcement: CasoEnforcement[] = [
  { id: 'e1', caso: 'Deepfake inversión cripto', plataforma: 'YouTube', severidad: 'critica', estado: 'En cola' },
  { id: 'e2', caso: 'Voz clonada — fraude bancario', plataforma: 'WhatsApp', severidad: 'critica', estado: 'En cola' },
  { id: 'e3', caso: 'Avatar no licenciado', plataforma: 'TikTok', severidad: 'alta', estado: 'En cola' },
  { id: 'e4', caso: 'Red de impersonación', plataforma: 'X', severidad: 'alta', estado: 'En cola' },
  { id: 'e5', caso: 'Imagen falsa en ads', plataforma: 'Meta', severidad: 'media', estado: 'En cola' },
];

export const takedownsPorPlataforma = [
  { plataforma: 'Meta', valor: 312 },
  { plataforma: 'Google/YouTube', valor: 428 },
  { plataforma: 'TikTok', valor: 274 },
  { plataforma: 'X', valor: 196 },
  { plataforma: 'Otros', valor: 88 },
];

// ── Agentes IA (panel reutilizable en cada vista) ─────────────────────────────
export const agentesIA: Record<string, string[]> = {
  legal: ['Agente Registro IP', 'Agente Notariado', 'Agente Takedown Legal'],
  forensics: ['Agente Detección Sintética', 'Agente Análisis de Artefactos', 'Red Neuronal de Autenticidad'],
  vault: ['Agente de Cifrado', 'Agente Embedding Biométrico', 'Agente Blockchain'],
  marketplace: ['Agente de Licencias', 'Agente de Contratos IA', 'Agente de Tarificación'],
  enforcement: ['Agente DMCA', 'Agente Cease & Desist', 'Agente de Notariado Timestamp'],
};
