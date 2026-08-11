import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X, Search, ZoomIn, ZoomOut, RefreshCcw, Database, Layers, Cpu, Zap, CheckCircle2, ChevronRight } from 'lucide-react';

// ── Types ───────────────────────────────────────────────────────────────────
interface GraphNode {
  id: string;
  label: string;
  sublabel?: string;
  type: 'root' | 'section' | 'module';
  color: string;
  glowColor: string;
  radius: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  fx?: number | null;
  fy?: number | null;
  pulsePhase: number;
}

interface GraphEdge {
  source: string;
  target: string;
  type: 'CONTAINS';
}

interface Particle {
  edgeIndex: number;
  t: number;          // 0..1 along edge
  speed: number;
  size: number;
  color: string;
}

interface ModuleInfo {
  id: string;
  sectionId: 'compras' | 'flota' | 'edif' | 'seguridad';
  sectionLabel: string;
  label: string;
  summary: string;
  kpis: string[];
  aiFeatures: string[];
}

// ── Neon Color Palette ───────────────────────────────────────────────────────
const NEON = {
  root:      '#F59E0B', // Amber Gold
  compras:   '#0066FF', // Neon Blue
  flota:     '#00C853', // Neon Emerald
  edif:      '#9C27B0', // Neon Purple
  seguridad: '#FF3366', // Neon Red / Pink
};

// ── Sections Data ───────────────────────────────────────────────────────────
const SECTIONS = [
  { id: 'compras', label: 'Compras & Abastecimiento', sublabel: '9 Módulos', color: NEON.compras },
  { id: 'flota',   label: 'Flotillas & Logística', sublabel: '9 Módulos', color: NEON.flota },
  { id: 'edif',    label: 'Nuevos Negocios & Edificios', sublabel: '8 Módulos', color: NEON.edif },
  { id: 'seguridad', label: 'Capacitación & Seguridad TI', sublabel: '4 Módulos', color: NEON.seguridad },
];

// ── 26 Modules Data with Rich Summaries ──────────────────────────────────────
const MODULES: ModuleInfo[] = [
  // COMPRAS (9)
  {
    id: 'req', sectionId: 'compras', sectionLabel: 'Compras & Abastecimiento', label: 'Requisiciones',
    summary: 'Gestión del flujo inicial de solicitudes de abastecimiento por departamento, asignación de prioridades y control de demanda.',
    kpis: ['247 requisiciones activas', '2.3 días tiempo medio aprobación', '4.8% tasa de rechazo', '$1.2M MXN ahorro acumulado'],
    aiFeatures: ['Asistente de Creación IA con PLN', 'Detección automática de duplicidad en 48h']
  },
  {
    id: 'prov', sectionId: 'compras', sectionLabel: 'Compras & Abastecimiento', label: 'Proveedores',
    summary: 'Evaluación 360° y selección inteligente de contratistas y proveedores clave de la organización.',
    kpis: ['186 proveedores en catálogo', 'Score IA 87.3/100', '12 nuevos dados de alta este mes', '3 alertas de riesgo activo'],
    aiFeatures: ['AI Vendor Matcher por categoría/SLA', 'Perfilado predictivo de riesgo operativo (AI Risk Profile)']
  },
  {
    id: 'cot', sectionId: 'compras', sectionLabel: 'Compras & Abastecimiento', label: 'Cotizaciones',
    summary: 'Comparación de propuestas económicas, negociación asistida y recomendación Value for Money.',
    kpis: ['34 procesos de bidding abiertos', '18.4% ahorro promedio IA', '1.8 días tiempo de respuesta', '72% tasa de conversión'],
    aiFeatures: ['Simulador de Negociación IA interactivo', 'Score Value for Money (VFM)']
  },
  {
    id: 'inv', sectionId: 'compras', sectionLabel: 'Compras & Abastecimiento', label: 'Inventario',
    summary: 'Control de stock en tiempo real, monitoreo de niveles críticos de seguridad y prevención de desabastecimiento.',
    kpis: ['3,847 SKUs registrados', '$4.2M MXN valor de inventario', '23 SKUs bajo stock de seguridad', '4.7x rotación anual'],
    aiFeatures: ['Simulador Monte Carlo de proyección de demanda', 'Reabastecimiento autónomo 1-Click']
  },
  {
    id: 'apr', sectionId: 'compras', sectionLabel: 'Compras & Abastecimiento', label: 'Aprobaciones',
    summary: 'Agilización del flujo de firmas digitales y autorización de gastos corporativos según políticas.',
    kpis: ['18 autorizaciones pendientes', '12 aprobadas hoy', '4.2h tiempo medio de firma', '34% tasa de auto-aprobación'],
    aiFeatures: ['Motor de reglas de auto-autorización por umbral y riesgo']
  },
  {
    id: 'pres', sectionId: 'compras', sectionLabel: 'Compras & Abastecimiento', label: 'Presupuesto',
    summary: 'Control del gasto presupuestal por departamento y proyecciones financieras dinámicas de cierre.',
    kpis: ['$8.5M MXN presupuesto total', '67.3% ejecutado a la fecha', '$2.78M MXN disponible', '94.1% proyección de cierre'],
    aiFeatures: ['Simulador de escenarios What-If (Optimista, Conservador, Expansión)']
  },
  {
    id: 'oc', sectionId: 'compras', sectionLabel: 'Compras & Abastecimiento', label: 'Órdenes de Compra',
    summary: 'Seguimiento de órdenes emitidas, monitoreo de logística en tránsito y confirmación de recepción.',
    kpis: ['89 OCs activas', '$3.1M MXN en tránsito', '92.7% entregas a tiempo', '28% OCs auto-generadas'],
    aiFeatures: ['Agrupador Inteligente de Cargas para consolidación de fletes']
  },
  {
    id: 'sla', sectionId: 'compras', sectionLabel: 'Compras & Abastecimiento', label: 'Impacto SLA',
    summary: 'Monitoreo de niveles de servicio contratados y prevención proactiva de penalizaciones contractuales.',
    kpis: ['94.8% cumplimiento SLA global', '7 contratos en riesgo inminente', '3.2h tiempo medio respuesta', '$420K MXN penalizaciones evitadas'],
    aiFeatures: ['Calculadora predictiva de penalización financiera por caída de SLA']
  },
  {
    id: 'aud', sectionId: 'compras', sectionLabel: 'Compras & Abastecimiento', label: 'Auditoría',
    summary: 'Análisis forense de transacciones, prevención de fraudes y verificación de cumplimiento ISO 9001.',
    kpis: ['14 hallazgos abiertos', 'Riesgo Promedio Medio', '23 ciclos completados', '8 anomalías transaccionales IA'],
    aiFeatures: ['Generador de Reporte ISO 9001', 'Detector forense de patrones anómalos']
  },

  // FLOTILLAS (9)
  {
    id: 'fcc', sectionId: 'flota', sectionLabel: 'Flotillas & Logística', label: 'Fleet Command Center',
    summary: 'Centro neurálgico de monitoreo telemetrado en tiempo real de todas las unidades vehiculares de la flota.',
    kpis: ['387 vehículos activos en ruta', '24,850 km recorridos hoy', '8.4 km/L eficiencia combustible', 'Fleet AI Score 87/100'],
    aiFeatures: ['Feed de alertas predictivas de desvío de ruta y ralentí']
  },
  {
    id: 'rutas', sectionId: 'flota', sectionLabel: 'Flotillas & Logística', label: 'Optimización de Rutas',
    summary: 'Planificación inteligente de trayectos para minimizar tiempos de viaje, kilometraje y huella de carbono.',
    kpis: ['47 rutas optimizadas hoy', '-23.4% km recorridos', '-1.8t CO₂ emitidos', '142 min ahorrados en tráfico'],
    aiFeatures: ['Re-enrutador autónomo dinámico ante congestión vial']
  },
  {
    id: 'mant', sectionId: 'flota', sectionLabel: 'Flotillas & Logística', label: 'Mantenimiento Predictivo',
    summary: 'Prevención de fallas mecánicas en unidades antes de que ocurran paros no programados en operación.',
    kpis: ['24 unidades en taller', '8 fallos predichos a 30 días', '96.2% disponibilidad de flota', '$890K MXN costo correctivo evitado'],
    aiFeatures: ['Programación automática de citas de servicio en taller']
  },
  {
    id: 'drisk', sectionId: 'flota', sectionLabel: 'Flotillas & Logística', label: 'Speed & Driver Risk AI',
    summary: 'Evaluación telemetrada del comportamiento de conducción y prevención de accidentes en carretera.',
    kpis: ['67 km/h velocidad promedio', '34 excesos 24h', 'Driver Risk Score 72/100', '8 operadores en atención crítica'],
    aiFeatures: ['Driver Profiler y asignación automática de capacitación defensiva']
  },
  {
    id: 'pol', sectionId: 'flota', sectionLabel: 'Flotillas & Logística', label: 'Agente de Pólizas',
    summary: 'Control documental de tarjetas de circulación, verificaciones vehiculares y pólizas de seguro.',
    kpis: ['387 pólizas vigentes', '23 trámites por vencer 30d', '98.4% cobertura de seguro', '67% renovaciones auto IA'],
    aiFeatures: ['Inmovilizador digital preventivo en TMS por vencimiento']
  },
  {
    id: 'gasto', sectionId: 'flota', sectionLabel: 'Flotillas & Logística', label: 'IA Gasto Operativo',
    summary: 'Auditoría inteligente de costos de combustible, peajes y viáticos de transporte.',
    kpis: ['$2.4M MXN gasto mensual', '$18.40 MXN/km costo promedio', '12.3% ahorro acumulado IA', '+3.2% desviación vs presupuesto'],
    aiFeatures: ['Detector de cargas anómalas de combustible por kilometraje']
  },
  {
    id: 'cop', sectionId: 'flota', sectionLabel: 'Flotillas & Logística', label: 'Copiloto Supervisor',
    summary: 'Asistencia inteligente para coordinadores de logística, supervisores y jefes de turno.',
    kpis: ['45 operadores activos', '7 incidencias hoy', '234 entregas completadas', 'Score operativo 91.4/100'],
    aiFeatures: ['Briefing matutino automático de prioridades y Copilot Q&A']
  },
  {
    id: 'audv', sectionId: 'flota', sectionLabel: 'Flotillas & Logística', label: 'Auditor Visual Evidencia',
    summary: 'Verificación con Visión Computacional de fotografías de entrega y evidencias de carga.',
    kpis: ['1,247 fotografías auditadas', '34 inconsistencias detectadas', '94.8% cumplimiento protocolo', '89% auditorías automáticas'],
    aiFeatures: ['Verificador de autenticidad fotográfica y detección de alteraciones GPS']
  },
  {
    id: 'fsla', sectionId: 'flota', sectionLabel: 'Flotillas & Logística', label: 'Predicción Incumplimiento SLA',
    summary: 'Anticipación de retrasos en entregas logísticas para evitar penalizaciones a clientes.',
    kpis: ['94.2% SLA global flota', '18 entregas en riesgo', '42 retrasos neutralizados', '$680K MXN penalizaciones evitadas'],
    aiFeatures: ['Intervención y reasignación sugerida de unidades en tiempo real']
  },

  // EDIFICIOS (8)
  {
    id: 'cctv', sectionId: 'edif', sectionLabel: 'Nuevos Negocios & Edificios', label: 'Vigilancia CCTV IA',
    summary: 'Transformación de videovigilancia pasiva en seguridad activa con Visión Computacional.',
    kpis: ['128 cámaras conectadas a IA', '342 eventos analizados hoy', '4 alertas críticas confirmadas', '99.2% precisión del modelo'],
    aiFeatures: ['Zoom Inspector con detección de intrusos y cajas delimitadoras en vivo']
  },
  {
    id: 'emerg', sectionId: 'edif', sectionLabel: 'Nuevos Negocios & Edificios', label: 'Detección Emergencias',
    summary: 'Monitoreo de riesgos ambientales (fuego, humo, fugas) y seguridad física en tiempo real.',
    kpis: ['456 sensores IoT activos', '3 eventos de riesgo 24h', '12s tiempo respuesta', '98.5% falsas alarmas filtradas'],
    aiFeatures: ['Selector de protocolos automáticos de respuesta a emergencias']
  },
  {
    id: 'bhs', sectionId: 'edif', sectionLabel: 'Nuevos Negocios & Edificios', label: 'Building Health Score',
    summary: 'Diagnóstico holístico de la infraestructura y salud técnica operativa del inmueble.',
    kpis: ['Health Score 87/100', '94% subsistemas operando OK', '12 incidencias técnicas activas', '91% eficiencia general'],
    aiFeatures: ['Diagnóstico adaptativo por subsistema (HVAC, Eléctrico, Plomería)']
  },
  {
    id: 'hvac', sectionId: 'edif', sectionLabel: 'Nuevos Negocios & Edificios', label: 'HVAC / UPS Predictivo',
    summary: 'Mantenimiento predictivo de equipos industriales de climatización y respaldo de energía.',
    kpis: ['67 equipos pesados monitoreados', '8 predicciones activas', '99.1% uptime de sistemas', '$340K MXN ahorro preventivo'],
    aiFeatures: ['Calculadora ROI de mantenimiento preventivo vs reparación correctiva']
  },
  {
    id: 'ener', sectionId: 'edif', sectionLabel: 'Nuevos Negocios & Edificios', label: 'Energy & Risk Intelligence',
    summary: 'Optimización del consumo eléctrico e integración de estrategias tarifarias inteligentes.',
    kpis: ['2,340 kWh consumo hoy', '$18.4K MXN costo de energía', '87% índice de eficiencia', '3 riesgos de sobre-demanda'],
    aiFeatures: ['Simulador de optimización tarifaria (Load Shifting) y cálculo de ahorro']
  },
  {
    id: 'rep', sectionId: 'edif', sectionLabel: 'Nuevos Negocios & Edificios', label: 'Reporte Ejecutivo Cliente',
    summary: 'Elaboración automática de informes de gestión operativa para clientes e inversionistas.',
    kpis: ['24 reportes generados este mes', '18 cuentas corporativas', '2.4 min tiempo generación', '96% satisfacción del cliente'],
    aiFeatures: ['Selector dinámico por cliente corporativo con narrativa y gráficos']
  },
  {
    id: 'fac', sectionId: 'edif', sectionLabel: 'Nuevos Negocios & Edificios', label: 'Facility Intelligence Portal',
    summary: 'Gestión centralizada de múltiples instalaciones y atención a solicitudes de inquilinos.',
    kpis: ['42 complejos gestionados', '67 tickets abiertos', '93.8% SLA atención', '4.6 / 5.0 estrellas satisfacción'],
    aiFeatures: ['MAYIA Facility Insight con diagnósticos automáticos por sede']
  },
  {
    id: 'ups', sectionId: 'edif', sectionLabel: 'Nuevos Negocios & Edificios', label: 'Upsell Scoring Cartera',
    summary: 'Detección de oportunidades comerciales para ofrecer nuevos servicios a clientes actuales.',
    kpis: ['34 oportunidades detectadas', '$4.2M MXN revenue potencial', '28% tasa conversión', '156 cuentas analizadas'],
    aiFeatures: ['Generador de propuestas comerciales y pitches personalizados 1-Click']
  },

  // CAPACITACIÓN & SEGURIDAD TI (4)
  {
    id: 'academia', sectionId: 'seguridad', sectionLabel: 'Capacitación & Seguridad TI', label: 'Academia MAYIA',
    summary: 'Plataforma de e-learning corporativo, certificación continua de colaboradores y rutas de aprendizaje adaptativo por perfil.',
    kpis: ['32 cursos activos', '234 empleados capacitándose', '89 certificaciones emitidas este mes', '87% engagement general'],
    aiFeatures: ['Learning Path personalizado con IA adaptativa', 'Quizzes evolutivos por perfil de puesto']
  },
  {
    id: 'ciberseguridad', sectionId: 'seguridad', sectionLabel: 'Capacitación & Seguridad TI', label: 'Ciberseguridad',
    summary: 'Monitoreo de amenazas cibernéticas, protección de endpoints, análisis UEBA y cumplimiento de normas de seguridad de la información.',
    kpis: ['Threat Score 23/100 (Bajo Riesgo)', '1,247 ataques bloqueados 24h', '7 vulnerabilidades abiertas', '97.8% compliance ISO/IEC 27001'],
    aiFeatures: ['Threat Intel Dashboard con clasificación MITRE ATT&CK', 'Auto-respuesta por playbooks IA']
  },
  {
    id: 'mesa_ayuda', sectionId: 'seguridad', sectionLabel: 'Capacitación & Seguridad TI', label: 'Mesa de Ayuda',
    summary: 'Centro de atención a tickets operativos y de TI, resolución de incidencias de usuarios y cumplimiento de SLA de soporte.',
    kpis: ['67 tickets abiertos', '3.4 min tiempo medio de resolución', '98.2% satisfacción del usuario', '42% auto-resueltos por IA'],
    aiFeatures: ['MAYIA AI Assist para clasificación automática de tickets', 'Sugerencia de soluciones inmediatas']
  },
  {
    id: 'centro_monitoreo', sectionId: 'seguridad', sectionLabel: 'Capacitación & Seguridad TI', label: 'Centro de Monitoreo',
    summary: 'Sala virtual y videowall centralizado de supervisión operativa en tiempo real de sedes, instalaciones y canales críticos.',
    kpis: ['64 feeds activos en videowall', '23 alertas atendidas 24h', '8 operadores en turno', '99.7% uptime de sistemas'],
    aiFeatures: ['Correlación multi-cámara con detección de anomalías', 'Generación automática del resumen de turno']
  }
];

const dist2 = (ax: number, ay: number, bx: number, by: number) =>
  Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2) || 1;

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export const KnowledgeGraph: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const nodesRef = useRef<GraphNode[]>([]);
  const edgesRef = useRef<GraphEdge[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const tickRef = useRef(0);

  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoom, setZoom] = useState(0.65);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const isDragging = useRef(false);
  const dragNode = useRef<GraphNode | null>(null);
  const lastMouse = useRef({ x: 0, y: 0 });
  const isPanning = useRef(false);
  const movedPx = useRef(0);

  // Initialize graph with 30 nodes (1 Root + 3 Sections + 26 Modules) — Expanded & Non-overlapping
  const buildGraph = useCallback((w: number, h: number) => {
    const nodes: GraphNode[] = [];
    const edges: GraphEdge[] = [];
    const cx = w / 2;
    const cy = h / 2;

    // Root
    nodes.push({
      id: 'besco', label: 'BESCO', sublabel: '30 Módulos Enterprise', type: 'root',
      color: NEON.root, glowColor: NEON.root, radius: 48,
      x: cx, y: cy, vx: 0, vy: 0, pulsePhase: 0,
    });

    // 4 Section Nodes (45°, 135°, 225°, 315° pushed out)
    const angles = [45, 135, 225, 315];
    SECTIONS.forEach((s, i) => {
      const rad = (angles[i] * Math.PI) / 180;
      const dist = Math.min(w, h) * 0.45;
      nodes.push({
        id: s.id, label: s.label, sublabel: s.sublabel, type: 'section',
        color: s.color, glowColor: s.color, radius: 38,
        x: cx + dist * Math.cos(rad), y: cy + dist * Math.sin(rad),
        vx: 0, vy: 0, pulsePhase: i * 2.1,
      });
      edges.push({ source: 'besco', target: s.id, type: 'CONTAINS' });
    });

    // Module Nodes (30 total, wide fan distribution)
    const sectionGroups: Record<string, typeof MODULES> = { compras: [], flota: [], edif: [], seguridad: [] };
    MODULES.forEach(m => sectionGroups[m.sectionId].push(m));

    SECTIONS.forEach((sec, si) => {
      const mods = sectionGroups[sec.id];
      const sNode = nodes.find(n => n.id === sec.id)!;
      mods.forEach((m, mi) => {
        const spread = 0.68;
        const a = (angles[si] * Math.PI) / 180 + (mi - (mods.length - 1) / 2) * spread;
        const r = 320 + (mi % 2) * 50;
        const mx = sNode.x + r * Math.cos(a);
        const my = sNode.y + r * Math.sin(a);

        nodes.push({
          id: m.id, label: m.label, sublabel: sec.label, type: 'module',
          color: sec.color, glowColor: sec.color, radius: 30,
          x: mx, y: my, vx: 0, vy: 0, pulsePhase: mi * 0.8,
        });
        edges.push({ source: sec.id, target: m.id, type: 'CONTAINS' });
      });
    });

    nodesRef.current = nodes;
    edgesRef.current = edges;

    // Particles moving along connections
    const parts: Particle[] = [];
    edges.forEach((_, i) => {
      parts.push({
        edgeIndex: i,
        t: Math.random(),
        speed: 0.003 + Math.random() * 0.003,
        size: 3.5,
        color: NEON.compras,
      });
    });
    particlesRef.current = parts;
  }, []);

  // Update canvas resolution matching CSS dimensions
  const handleResize = useCallback(() => {
    if (!containerRef.current || !canvasRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const canvas = canvasRef.current;

    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      if (nodesRef.current.length === 0) {
        buildGraph(rect.width, rect.height);
      }
    }
  }, [buildGraph]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Main Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const step = () => {
      tickRef.current++;
      const tick = tickRef.current;
      const dpr = window.devicePixelRatio || 1;
      const W = canvas.width / dpr;
      const H = canvas.height / dpr;

      if (W === 0 || H === 0) {
        animRef.current = requestAnimationFrame(step);
        return;
      }

      const alpha = Math.max(0.002, 0.5 - tick * 0.0003);
      const nodes = nodesRef.current;
      const edges = edgesRef.current;
      const particles = particlesRef.current;

      // Physics (Strict Collision Prevention & Wide Repulsion)
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (a.fx !== undefined && a.fx !== null) { a.x = a.fx; a.y = a.fy!; continue; }
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = dist2(a.x, a.y, b.x, b.y);

          // Calculate bounding box overlap dimensions for cards vs circles
          const wA = a.type === 'module' ? a.radius * 2.8 : a.radius * 2;
          const hA = a.type === 'module' ? a.radius * 1.5 : a.radius * 2;
          const wB = b.type === 'module' ? b.radius * 2.8 : b.radius * 2;
          const hB = b.type === 'module' ? b.radius * 1.5 : b.radius * 2;

          const minDistX = (wA + wB) / 2 + 25; // 25px safety margin
          const minDistY = (hA + hB) / 2 + 18; // 18px safety margin

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const absX = Math.abs(dx) || 0.1;
          const absY = Math.abs(dy) || 0.1;

          if (absX < minDistX && absY < minDistY) {
            // Strict physical separation to guarantee ZERO overlap
            const overlapX = minDistX - absX;
            const overlapY = minDistY - absY;
            if (overlapX < overlapY) {
              const signX = dx >= 0 ? 1 : -1;
              a.x += signX * overlapX * 0.5;
              b.x -= signX * overlapX * 0.5;
            } else {
              const signY = dy >= 0 ? 1 : -1;
              a.y += signY * overlapY * 0.5;
              b.y -= signY * overlapY * 0.5;
            }
          }
        }
        a.vx += (W / 2 - a.x) * alpha * 0.008;
        a.vy += (H / 2 - a.y) * alpha * 0.008;
      }

      edges.forEach(e => {
        const s = nodes.find(n => n.id === e.source);
        const t = nodes.find(n => n.id === e.target);
        if (!s || !t) return;
        const d = dist2(s.x, s.y, t.x, t.y);
        const ideal = s.type === 'root' ? 320 : 300;
        const f = ((d - ideal) / d) * alpha * 0.4;
        const dx = (t.x - s.x) / d, dy = (t.y - s.y) / d;
        s.vx += dx * f; s.vy += dy * f;
        t.vx -= dx * f; t.vy -= dy * f;
      });

      nodes.forEach(n => {
        if (n.fx !== undefined && n.fx !== null) return;
        n.vx *= 0.65; n.vy *= 0.65;
        n.x = Math.max(n.radius + 15, Math.min(W - n.radius - 15, n.x + n.vx));
        n.y = Math.max(n.radius + 15, Math.min(H - n.radius - 15, n.y + n.vy));
      });

      // Render Setup
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, W, H);

      // Clean White Background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, W, H);

      // Subtle Light Neon Grid Lines
      ctx.strokeStyle = '#F1F5F9';
      ctx.lineWidth = 1;
      for (let gx = 0; gx < W; gx += 40) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke(); }
      for (let gy = 0; gy < H; gy += 40) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke(); }

      ctx.save();
      ctx.translate(pan.x, pan.y);
      ctx.scale(zoom, zoom);

      const searchL = searchTerm.toLowerCase();
      const isVisible = (n: GraphNode) => {
        if (searchL && !n.label.toLowerCase().includes(searchL)) return false;
        return true;
      };

      // Edges
      edges.forEach(e => {
        const s = nodes.find(n => n.id === e.source);
        const t = nodes.find(n => n.id === e.target);
        if (!s || !t || !isVisible(s) || !isVisible(t)) return;

        const mx = (s.x + t.x) / 2 + (s.y - t.y) * 0.05;
        const my = (s.y + t.y) / 2 + (t.x - s.x) * 0.05;

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.quadraticCurveTo(mx, my, t.x, t.y);
        ctx.strokeStyle = t.color + '40';
        ctx.lineWidth = s.type === 'root' ? 2.5 : 1.8;
        ctx.stroke();

        const sNode = selectedNode;
        if (sNode && (e.source === sNode.id || e.target === sNode.id)) {
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.quadraticCurveTo(mx, my, t.x, t.y);
          ctx.strokeStyle = sNode.color;
          ctx.lineWidth = 3.5;
          ctx.stroke();
        }
      });

      // Particles
      particles.forEach(p => {
        const e = edges[p.edgeIndex];
        const s = nodes.find(n => n.id === e.source);
        const t = nodes.find(n => n.id === e.target);
        if (!s || !t || !isVisible(s) || !isVisible(t)) return;

        p.t += p.speed;
        if (p.t > 1) p.t = 0;

        const mx = (s.x + t.x) / 2 + (s.y - t.y) * 0.05;
        const my = (s.y + t.y) / 2 + (t.x - s.x) * 0.05;

        const u = p.t;
        const px = (1 - u) * (1 - u) * s.x + 2 * (1 - u) * u * mx + u * u * t.x;
        const py = (1 - u) * (1 - u) * s.y + 2 * (1 - u) * u * my + u * u * t.y;

        ctx.shadowColor = t.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = t.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Nodes (NO EMOJIS, Clean Neon Typography & Cards)
      nodes.forEach(n => {
        if (!isVisible(n)) return;
        const isSelected = selectedNode?.id === n.id;
        const isHovered = hoveredNodeId === n.id;
        const pulse = Math.sin(tick * 0.05 + n.pulsePhase) * 0.5 + 0.5;
        const r = n.radius + (isSelected ? 6 : isHovered ? 4 : 0);

        ctx.shadowColor = n.glowColor;
        ctx.shadowBlur = isSelected ? 24 : isHovered ? 16 : 10;

        if (n.type === 'module') {
          // Module Cards
          const w = r * 2.8, h = r * 1.5;
          const rx2 = n.x - w / 2, ry2 = n.y - h / 2;
          roundRect(ctx, rx2, ry2, w, h, 10);

          ctx.fillStyle = '#FFFFFF';
          ctx.fill();
          ctx.strokeStyle = isSelected ? n.color : n.color + 'CC';
          ctx.lineWidth = isSelected ? 3 : 2;
          ctx.stroke();

          ctx.shadowBlur = 0;

          // Module Label Text
          ctx.font = `700 ${Math.max(9, r * 0.36)}px Inter, sans-serif`;
          ctx.fillStyle = '#0F172A';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const shortLbl = n.label.length > 18 ? n.label.substring(0, 16) + '…' : n.label;
          ctx.fillText(shortLbl, n.x, n.y);
        } else {
          // Circle for Root & Sections
          ctx.beginPath();
          ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
          ctx.fillStyle = n.color;
          ctx.fill();
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = isSelected ? 3.5 : 2.5;
          ctx.stroke();

          ctx.shadowBlur = 0;

          // Pulse ring for root & sections
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 6 + pulse * 10, 0, Math.PI * 2);
          ctx.strokeStyle = n.color + Math.round((1 - pulse) * 0xAA).toString(16).padStart(2, '0');
          ctx.lineWidth = 2;
          ctx.stroke();

          // Title
          ctx.font = `800 ${n.type === 'root' ? 12 : 9.5}px Inter, sans-serif`;
          ctx.fillStyle = '#FFFFFF';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(n.label, n.x, n.y - (n.sublabel ? 5 : 0));

          if (n.sublabel) {
            ctx.font = `600 8.5px Inter, sans-serif`;
            ctx.fillStyle = 'rgba(255,255,255,0.85)';
            ctx.fillText(n.sublabel, n.x, n.y + 9);
          }
        }
      });

      ctx.restore();
      ctx.restore();

      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [zoom, pan, selectedNode, hoveredNodeId, searchTerm]);

  // Mouse Interaction Handlers
  const getHit = useCallback((cx: number, cy: number) => {
    const wx = (cx - pan.x) / zoom, wy = (cy - pan.y) / zoom;
    return nodesRef.current.find(n => {
      if (n.type === 'module') {
        const w = n.radius * 2.8, h = n.radius * 1.5;
        return wx >= n.x - w / 2 && wx <= n.x + w / 2 && wy >= n.y - h / 2 && wy <= n.y + h / 2;
      }
      return dist2(wx, wy, n.x, n.y) < n.radius + 6;
    });
  }, [pan, zoom]);

  const onMouseDown = (e: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const cx = e.clientX - rect.left, cy = e.clientY - rect.top;
    const hit = getHit(cx, cy);
    movedPx.current = 0;
    if (hit) { dragNode.current = hit; isDragging.current = true; }
    else isPanning.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const dx = e.clientX - lastMouse.current.x, dy = e.clientY - lastMouse.current.y;
    movedPx.current += Math.abs(dx) + Math.abs(dy);
    lastMouse.current = { x: e.clientX, y: e.clientY };

    if (isDragging.current && dragNode.current) {
      dragNode.current.x += dx / zoom; dragNode.current.y += dy / zoom;
      dragNode.current.fx = dragNode.current.x; dragNode.current.fy = dragNode.current.y;
    } else if (isPanning.current) {
      setPan(p => ({ x: p.x + dx, y: p.y + dy }));
    }

    const rect = canvasRef.current!.getBoundingClientRect();
    const hit = getHit(e.clientX - rect.left, e.clientY - rect.top);
    setHoveredNodeId(hit?.id || null);
  };

  const onMouseUp = () => {
    if (dragNode.current) { dragNode.current.fx = null; dragNode.current.fy = null; dragNode.current = null; }
    isDragging.current = false; isPanning.current = false;
  };

  const onClick = (e: React.MouseEvent) => {
    if (movedPx.current > 6) return;
    const rect = canvasRef.current!.getBoundingClientRect();
    const hit = getHit(e.clientX - rect.left, e.clientY - rect.top);
    setSelectedNode(prev => hit ? (prev?.id === hit.id ? null : hit) : null);
  };

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom(z => Math.max(0.3, Math.min(2.5, z - e.deltaY * 0.001)));
  };

  const resetGraph = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      buildGraph(rect.width, rect.height);
    }
    setPan({ x: 0, y: 0 });
    setZoom(0.85);
    setSelectedNode(null);
  };

  const selectedModule = selectedNode ? MODULES.find(m => m.id === selectedNode.id) : null;
  const selectedSection = selectedNode ? SECTIONS.find(s => s.id === selectedNode.id) : null;

  return (
    <>
      {/* Soft Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 9990,
          background: 'rgba(15, 23, 42, 0.45)',
          backdropFilter: 'blur(8px)',
          animation: 'kgFadeIn 0.3s ease',
        }}
      />

      {/* Elegant Compact Neon Modal Window */}
      <div style={{
        position: 'fixed',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '920px', height: '640px',
        maxWidth: '94vw', maxHeight: '88vh',
        zIndex: 9999,
        borderRadius: 24,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        boxShadow: '0 25px 70px -15px rgba(0, 0, 0, 0.25), 0 0 40px rgba(0, 102, 255, 0.15)',
        animation: 'kgPopIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>

        {/* Header Bar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 20px', flexShrink: 0,
          borderBottom: '1px solid #F1F5F9',
          background: '#FFFFFF',
        }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #0066FF, #FF007F)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0, 102, 255, 0.3)' }}>
            <Database size={18} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.3px', lineHeight: 1 }}>
              BESCO Knowledge Graph
            </div>
            <div style={{ fontSize: 11, color: '#64748B', marginTop: 3 }}>
              Red de Conocimiento Módulos Enterprise (26 Módulos)
            </div>
          </div>

          <div style={{ flex: 1 }} />

          {/* Search Input */}
          <div style={{ position: 'relative' }}>
            <Search size={13} color="#94A3B8" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Buscar módulo…"
              style={{
                background: '#F8FAFC', border: '1px solid #E2E8F0',
                borderRadius: 999, padding: '7px 12px 7px 30px', color: '#0F172A', fontSize: 12,
                outline: 'none', width: 170,
              }}
            />
          </div>

          {/* Controls */}
          <button onClick={() => setZoom(z => Math.min(2.5, z + 0.15))} title="Zoom In" style={{ width: 32, height: 32, borderRadius: '50%', background: '#F1F5F9', border: 'none', cursor: 'pointer', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ZoomIn size={15} />
          </button>
          <button onClick={() => setZoom(z => Math.max(0.3, z - 0.15))} title="Zoom Out" style={{ width: 32, height: 32, borderRadius: '50%', background: '#F1F5F9', border: 'none', cursor: 'pointer', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ZoomOut size={15} />
          </button>
          <button onClick={resetGraph} title="Reset" style={{ width: 32, height: 32, borderRadius: '50%', background: '#F1F5F9', border: 'none', cursor: 'pointer', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <RefreshCcw size={14} />
          </button>

          <button onClick={onClose} title="Cerrar" style={{ width: 34, height: 34, borderRadius: '50%', background: '#FEE2E2', border: 'none', cursor: 'pointer', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 4 }}>
            <X size={17} />
          </button>
        </div>

        {/* Main Content Area */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
          
          {/* Canvas Container */}
          <div ref={containerRef} style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <canvas
              ref={canvasRef}
              style={{ width: '100%', height: '100%', display: 'block', cursor: hoveredNodeId ? 'pointer' : 'grab' }}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onClick={onClick}
              onWheel={onWheel}
            />

            {/* Bottom Legend Pills */}
            <div style={{ position: 'absolute', bottom: 14, left: 14, display: 'flex', gap: 8, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(6px)', padding: '6px 14px', borderRadius: 999, border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              {[
                { color: NEON.root, label: 'BESCO Root' },
                { color: NEON.compras, label: 'Compras (9)' },
                { color: NEON.flota, label: 'Flotillas (9)' },
                { color: NEON.edif, label: 'Edificios (8)' },
                { color: NEON.seguridad, label: 'Seguridad TI (4)' },
              ].map(l => (
                <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: l.color, boxShadow: `0 0 6px ${l.color}` }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#334155' }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Side Drawer for Full Module Summary */}
          {selectedNode && (
            <div style={{
              width: 300, background: '#F8FAFC', borderLeft: '1px solid #E2E8F0',
              padding: '20px 18px', overflowY: 'auto', flexShrink: 0,
              boxShadow: '-4px 0 20px rgba(0,0,0,0.04)',
              animation: 'kgSlideLeft 0.25s ease-out',
            }}>
              {/* Header Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: selectedNode.color, textTransform: 'uppercase', letterSpacing: 1.2, background: selectedNode.color + '15', padding: '3px 8px', borderRadius: 6, border: `1px solid ${selectedNode.color}30` }}>
                  {selectedNode.type === 'root' ? 'EMPRESA' : selectedNode.type === 'section' ? 'SECCIÓN' : 'MÓDULO BESCO'}
                </span>
              </div>

              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: '0 0 4px 0', letterSpacing: '-0.3px' }}>
                {selectedNode.label}
              </h3>

              {selectedModule && (
                <p style={{ fontSize: 11, fontWeight: 600, color: selectedNode.color, margin: '0 0 12px 0' }}>
                  {selectedModule.sectionLabel}
                </p>
              )}

              {/* Module Summary */}
              {selectedModule && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ padding: '10px 12px', background: '#FFFFFF', borderRadius: 10, border: '1px solid #E2E8F0' }}>
                    <p style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', margin: '0 0 4px 0', letterSpacing: 1 }}>
                      Resumen Operativo
                    </p>
                    <p style={{ fontSize: 12, color: '#334155', margin: 0, lineHeight: '1.5' }}>
                      {selectedModule.summary}
                    </p>
                  </div>

                  {/* KPIs */}
                  <div>
                    <p style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', margin: '0 0 6px 0', letterSpacing: 1 }}>
                      Métricas Clave (KPIs)
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      {selectedModule.kpis.map((k, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', background: '#FFFFFF', borderRadius: 8, border: '1px solid #E2E8F0' }}>
                          <CheckCircle2 size={13} color={selectedNode.color} />
                          <span style={{ fontSize: 11.5, fontWeight: 600, color: '#0F172A' }}>{k}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Features */}
                  <div>
                    <p style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', margin: '0 0 6px 0', letterSpacing: 1 }}>
                      Capacidades de IA
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      {selectedModule.aiFeatures.map((a, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', background: '#FDF2F8', borderRadius: 8, border: '1px solid #FBCFE8' }}>
                          <Zap size={13} color="#FF007F" />
                          <span style={{ fontSize: 11.5, fontWeight: 700, color: '#9D174D' }}>{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Section Summary */}
              {selectedSection && (
                <div>
                  <p style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', margin: '12px 0 6px 0', letterSpacing: 1 }}>
                    Módulos de la Sección
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {MODULES.filter(m => m.sectionId === selectedSection.id).map(m => (
                      <div key={m.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#FFFFFF', borderRadius: 8, border: '1px solid #E2E8F0' }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: '#0F172A' }}>{m.label}</span>
                        <ChevronRight size={14} color="#94A3B8" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Root Summary */}
              {selectedNode.type === 'root' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {[
                    { label: 'Total Módulos Enterprise', val: '26' },
                    { label: 'Comando Inteligente Compras', val: '9 Módulos' },
                    { label: 'Comando Inteligente Flotillas', val: '9 Módulos' },
                    { label: 'Nuevos Negocios & Edificios', val: '8 Módulos' },
                  ].map(item => (
                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', background: '#FFFFFF', borderRadius: 8, border: '1px solid #E2E8F0' }}>
                      <span style={{ fontSize: 11.5, color: '#64748B' }}>{item.label}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: NEON.root }}>{item.val}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes kgFadeIn   { from { opacity: 0; } to { opacity: 1; } }
        @keyframes kgPopIn    { from { opacity: 0; transform: translate(-50%, -46%) scale(0.96); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
        @keyframes kgSlideLeft { from { opacity: 0; transform: translateX(15px); } to { opacity: 1; transform: none; } }
      `}</style>
    </>
  );
};
