import React, { useState, useMemo } from 'react';
import {
  Smartphone, MapPin, AlertTriangle, CheckCircle2, Wrench, XCircle,
  TrendingUp, Users, DollarSign, Activity, Bot, Send, ArrowRight,
  ShieldCheck, RefreshCw, Zap, Maximize2, Minimize2, ChevronRight, Eye, Tv
} from 'lucide-react';
import { brandingConfig } from '../../../config/branding';
import { estadosPaths, estadosData, type EstadoInfo } from '../MapaCalorEstados';

const { colores } = brandingConfig;

export interface TiendaGerente {
  id: string;
  estadoId: string;
  nombre: string;
  formato: 'Isla Mall' | 'Corner Autoservicio' | 'Tienda Flagship';
  estatus: 'Activa' | 'En Reparación' | 'Inactiva';
  semaforoVentas: 'Verde' | 'Amarillo' | 'Rojo';
  recomendacionInversion: string;
  genteImpactada: number;
  roi: number; // Porcentaje ROI
  plazasMonitoreo: number; // número de sensores/pantallas en tiempo real
  ventasMensuales: number;
  coberturaCP: string;
  encargado: string;
  xSvg: number;
  ySvg: number;
}

// Bounding boxes estimadas para los estados en el SVG 959x593 para el zoom
const estadoBounds: Record<string, { x: number; y: number; width: number; height: number }> = {
  MX_AG: { x: 380, y: 345, width: 40, height: 30 },
  MX_BC: { x: 40, y: 40, width: 140, height: 170 },
  MX_BS: { x: 95, y: 190, width: 130, height: 180 },
  MX_CM: { x: 640, y: 380, width: 90, height: 100 },
  MX_CS: { x: 600, y: 470, width: 110, height: 90 },
  MX_CH: { x: 230, y: 80, width: 150, height: 180 },
  MX_CO: { x: 360, y: 140, width: 110, height: 160 },
  MX_CL: { x: 340, y: 420, width: 40, height: 30 },
  MX_DF: { x: 475, y: 420, width: 20, height: 20 },
  MX_DG: { x: 275, y: 220, width: 120, height: 130 },
  MX_GT: { x: 405, y: 360, width: 65, height: 60 },
  MX_GR: { x: 405, y: 430, width: 100, height: 70 },
  MX_HG: { x: 460, y: 370, width: 55, height: 50 },
  MX_JA: { x: 315, y: 340, width: 110, height: 100 },
  MX_EM: { x: 445, y: 400, width: 45, height: 45 },
  MX_MI: { x: 365, y: 400, width: 95, height: 70 },
  MX_MO: { x: 470, y: 435, width: 30, height: 25 },
  MX_NA: { x: 315, y: 325, width: 60, height: 50 },
  MX_NL: { x: 440, y: 220, width: 70, height: 110 },
  MX_OA: { x: 500, y: 460, width: 110, height: 80 },
  MX_PU: { x: 480, y: 420, width: 55, height: 60 },
  MX_QT: { x: 445, y: 375, width: 35, height: 35 },
  MX_QR: { x: 710, y: 360, width: 70, height: 120 },
  MX_SL: { x: 410, y: 300, width: 85, height: 80 },
  MX_SI: { x: 220, y: 200, width: 90, height: 140 },
  MX_SO: { x: 120, y: 60, width: 140, height: 150 },
  MX_TB: { x: 620, y: 440, width: 75, height: 45 },
  MX_TM: { x: 450, y: 200, width: 80, height: 130 },
  MX_TL: { x: 495, y: 420, width: 25, height: 20 },
  MX_VE: { x: 500, y: 350, width: 140, height: 150 },
  MX_YU: { x: 680, y: 340, width: 110, height: 60 },
  MX_ZA: { x: 360, y: 270, width: 85, height: 95 },
};

// Generador determinista de 10+ tiendas por estado para el Gerente de Ventas
const NOMBRES_FORMATOS = [
  'Isla Mall Plaza Central',
  'Corner Autoservicio Soriana',
  'Tienda Flagship Centro',
  'Isla Galerías Shopping',
  'Corner Walmart Express',
  'Isla Plaza Las Américas',
  'Tienda Premium Experience',
  'Corner Chedraui Selecto',
  'Isla Paseo Comercial',
  'Corner Liverpool Plaza',
  'Isla Plaza Real',
  'Tienda Conectividad FTTH'
];

const ENCARGADOS = [
  'Carlos Mendoza', 'Ana Paola Ríos', 'Roberto Gómez', 'Sofía Villarreal',
  'Fernando Ortiz', 'Mariana Garza', 'Luis Eduardo Vega', 'Brenda Morales',
  'Javier Solís', 'Patricia Navarro', 'Guillermo Cruz', 'Elena Santillán'
];

const generateTiendasPorEstado = (): Record<string, TiendaGerente[]> => {
  const result: Record<string, TiendaGerente[]> = {};

  estadosPaths.forEach((est) => {
    const bounds = estadoBounds[est.id] || { x: 450, y: 300, width: 100, height: 100 };
    const tiendas: TiendaGerente[] = [];

    // Generar exactamente 10 tiendas por estado
    for (let i = 1; i <= 10; i++) {
      const formatoIndex = (i - 1) % 3;
      const formato = formatoIndex === 0 ? 'Isla Mall' : formatoIndex === 1 ? 'Corner Autoservicio' : 'Tienda Flagship';

      // Distribuir estatus con realismo (Mayoría activas, algunas en reparación o falla)
      let estatus: 'Activa' | 'En Reparación' | 'Inactiva' = 'Activa';
      if (i === 3 && (est.id === 'MX_DF' || est.id === 'MX_JA' || est.id === 'MX_NL' || est.id === 'MX_VE')) {
        estatus = 'En Reparación';
      } else if (i === 7 && (est.id === 'MX_DF' || est.id === 'MX_EM' || est.id === 'MX_CS' || est.id === 'MX_GT')) {
        estatus = 'Inactiva';
      }

      // Semáforo de ventas y decisión de inversión
      let semaforoVentas: 'Verde' | 'Amarillo' | 'Rojo' = 'Verde';
      let recomendacionInversion = '';

      if (estatus === 'Inactiva') {
        semaforoVentas = 'Rojo';
        recomendacionInversion = '❌ NO INVERTIR MÁS DINERO: Sucursal con falla crítica. Auditar tráfico y reestructurar personal antes de asignar presupuesto.';
      } else if (estatus === 'En Reparación') {
        semaforoVentas = 'Amarillo';
        recomendacionInversion = '⚠️ MANTENER PRESUPUESTO: En mantenimiento técnico de tótems. Mantener inversión actual sin expansiones hasta reconexión.';
      } else {
        const randSem = (i * 7 + est.id.charCodeAt(3)) % 10;
        if (randSem > 7) {
          semaforoVentas = 'Rojo';
          recomendacionInversion = '🚨 NO INVERTIR MÁS DINERO: Bajo retorno (-12%) y caída de tráfico. Reubicar exhibidor a zona de mayor flujo.';
        } else if (randSem > 4) {
          semaforoVentas = 'Amarillo';
          recomendacionInversion = '🟡 MANTENER INVERSIÓN: Desempeño estable. Optimizar bucle de pantalla inmersiva y capacitar vendedores.';
        } else {
          semaforoVentas = 'Verde';
          recomendacionInversion = '🟢 REINVERTIR DINERO (ALTA PRIORIDAD): Excelente ARPU y ROI (+310%). Invertir en tótem adicional de Audio Surround Hi-Fi.';
        }
      }

      // Coordenadas perfectamente centradas en el corazón geográfico del estado
      const centerX = bounds.x + bounds.width / 2;
      const centerY = bounds.y + bounds.height / 2;

      // Distribución en espiral/cluster concentrado en el centro del estado
      const angle = (i - 1) * 0.628 * 2.4 + (est.id.charCodeAt(3) % 5) * 0.2;
      const radiusRatio = 0.26;
      const radiusX = (bounds.width * radiusRatio) * Math.sqrt(i / 10);
      const radiusY = (bounds.height * radiusRatio) * Math.sqrt(i / 10);

      const xSvg = Math.round(centerX + Math.cos(angle) * radiusX);
      const ySvg = Math.round(centerY + Math.sin(angle) * radiusY);

      const genteImpactada = Math.round(15000 + ((i * 4820 + est.id.charCodeAt(3) * 120) % 45000));
      const roi = Math.round(140 + ((i * 35 + est.id.charCodeAt(3)) % 220));
      const ventasMensuales = Math.round(180000 + ((i * 32000 + est.id.charCodeAt(3) * 500) % 450000));
      const plazasMonitoreo = formato === 'Tienda Flagship' ? 6 : formato === 'Isla Mall' ? 4 : 2;

      tiendas.push({
        id: `${est.id}-T${i}`,
        estadoId: est.id,
        nombre: `${NOMBRES_FORMATOS[(i - 1) % NOMBRES_FORMATOS.length]} ${est.label} #${i}`,
        formato,
        estatus,
        semaforoVentas,
        recomendacionInversion,
        genteImpactada,
        roi,
        plazasMonitoreo,
        ventasMensuales,
        coberturaCP: `0${3000 + i * 110}`,
        encargado: ENCARGADOS[(i - 1) % ENCARGADOS.length],
        xSvg,
        ySvg
      });
    }

    result[est.id] = tiendas;
  });

  return result;
};

export const VistaGerenteMovilModule: React.FC = () => {
  const [frameMode, setFrameMode] = useState<'smartphone' | 'expanded'>('smartphone');
  const [activeTab, setActiveTab] = useState<'mapa' | 'copiloto' | 'fallas' | 'metricas'>('mapa');
  const [selectedEstadoId, setSelectedEstadoId] = useState<string | null>('MX_DF');
  const [selectedTienda, setSelectedTienda] = useState<TiendaGerente | null>(null);
  const [filtroEstatus, setFiltroEstatus] = useState<'Todos' | 'Activa' | 'En Reparación' | 'Inactiva'>('Todos');
  const [filtroSemaforo, setFiltroSemaforo] = useState<'Todos' | 'Verde' | 'Amarillo' | 'Rojo'>('Todos');

  // Base de datos de tiendas
  const todasLasTiendas = useMemo(() => generateTiendasPorEstado(), []);

  // Lista plana de todas las tiendas a cargo del gerente
  const listaTodasTiendas = useMemo(() => {
    return Object.values(todasLasTiendas).flat();
  }, [todasLasTiendas]);

  // Tiendas del estado seleccionado
  const tiendasEstadoActual = useMemo(() => {
    if (!selectedEstadoId) return [];
    return todasLasTiendas[selectedEstadoId] || [];
  }, [selectedEstadoId, todasLasTiendas]);

  // Tiendas filtradas
  const tiendasFiltradas = useMemo(() => {
    return tiendasEstadoActual.filter(t => {
      if (filtroEstatus !== 'Todos' && t.estatus !== filtroEstatus) return false;
      if (filtroSemaforo !== 'Todos' && t.semaforoVentas !== filtroSemaforo) return false;
      return true;
    });
  }, [tiendasEstadoActual, filtroEstatus, filtroSemaforo]);

  // Métricas globales acumuladas
  const totalGenteImpactada = useMemo(() => {
    return listaTodasTiendas.reduce((acc, t) => acc + t.genteImpactada, 0);
  }, [listaTodasTiendas]);

  const roiPromedio = useMemo(() => {
    if (listaTodasTiendas.length === 0) return 0;
    return Math.round(listaTodasTiendas.reduce((acc, t) => acc + t.roi, 0) / listaTodasTiendas.length);
  }, [listaTodasTiendas]);

  const totalPlazasMonitoreo = useMemo(() => {
    return listaTodasTiendas.reduce((acc, t) => acc + t.plazasMonitoreo, 0);
  }, [listaTodasTiendas]);

  const sucursalesFalla = useMemo(() => {
    return listaTodasTiendas.filter(t => t.estatus === 'Inactiva' || t.semaforoVentas === 'Rojo');
  }, [listaTodasTiendas]);

  const conteoEstatus = useMemo(() => {
    const activas = listaTodasTiendas.filter(t => t.estatus === 'Activa').length;
    const reparacion = listaTodasTiendas.filter(t => t.estatus === 'En Reparación').length;
    const inactivas = listaTodasTiendas.filter(t => t.estatus === 'Inactiva').length;
    return { activas, reparacion, inactivas, total: listaTodasTiendas.length };
  }, [listaTodasTiendas]);

  // Chat del Copiloto Inteligente de Celular
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'copiloto'; text: string; time: string }>>([
    {
      sender: 'copiloto',
      text: '📱 ¡Hola Gerente de Ventas! Soy tu Copiloto M2C. Estoy monitoreando en tiempo real las 320 sucursales (islas, corners y tiendas) a tu cargo en México.',
      time: '10:00 AM'
    },
    {
      sender: 'copiloto',
      text: `🚨 Atención: Tienes ${sucursalesFalla.length} sucursales requiriendo atención. En CDMX y Estado de México se registra el ROI más alto (+310%). ¿En qué sucursal deseas tomar acción?`,
      time: '10:01 AM'
    }
  ]);
  const [inputChat, setInputChat] = useState('');

  const handleSendChat = (txtText?: string) => {
    const prompt = txtText || inputChat;
    if (!prompt.trim()) return;

    const userMsg = { sender: 'user' as const, text: prompt, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages(prev => [...prev, userMsg]);
    setInputChat('');

    setTimeout(() => {
      let reply = '';
      const pLower = prompt.toLowerCase();

      if (pLower.includes('falla') || pLower.includes('inactiva') || pLower.includes('rojo')) {
        reply = `⚠️ Se detectaron ${sucursalesFalla.length} sucursales en semáforo rojo/falla. Destacan: "${sucursalesFalla[0]?.nombre}" (Cierre temporal de sensor) e "${sucursalesFalla[1]?.nombre}". Te recomiendo NO invertir más dinero en ellas hasta corregir la posición del tótem y auditar la atención del personal.`;
      } else if (pLower.includes('invertir') || pLower.includes('dinero') || pLower.includes('recomiend')) {
        const topReinvertir = listaTodasTiendas.filter(t => t.semaforoVentas === 'Verde')[0];
        reply = `🟢 La sucursal prioritaria para reinversión es "${topReinvertir?.nombre}" (${topReinvertir?.estadoId}). Presenta un ROI de +${topReinvertir?.roi}% y ${topReinvertir?.genteImpactada.toLocaleString()} personas impactadas. Se recomienda instalar 1 tótem inmersivo adicional de Audio Surround Hi-Fi.`;
      } else if (pLower.includes('roi') || pLower.includes('retorno') || pLower.includes('impacto')) {
        reply = `📊 Retorno de Inversión Global: +${roiPromedio}% ROI acumulado. Total de gente impactada: ${totalGenteImpactada.toLocaleString()} personas en 340 plazas de monitoreo activas en vivo.`;
      } else {
        reply = `🤖 Monitoreando sucursales... En la región seleccionada (${selectedEstadoId || 'Nacional'}) tienes ${tiendasEstadoActual.length} sucursales activas. Puedes hacer clic en cualquier pin del mapa para consultar el semáforo de ventas y la recomendación de inversión.`;
      }

      setChatMessages(prev => [
        ...prev,
        { sender: 'copiloto', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    }, 600);
  };

  // Cálculo dinámico del viewBox para Zoom SVG
  const currentViewBox = useMemo(() => {
    if (!selectedEstadoId || !estadoBounds[selectedEstadoId]) {
      return '0 0 959 593';
    }
    const b = estadoBounds[selectedEstadoId];
    // Añadir margen alrededor del estado seleccionado
    const margin = 25;
    const vx = Math.max(0, b.x - margin);
    const vy = Math.max(0, b.y - margin);
    const vw = Math.min(959 - vx, b.width + margin * 2);
    const vh = Math.min(593 - vy, b.height + margin * 2);
    return `${vx} ${vy} ${vw} ${vh}`;
  }, [selectedEstadoId]);

  return (
    <div style={{ backgroundColor: '#F4F6F9', minHeight: '100%', padding: '16px', borderRadius: '20px' }}>

      {/* ── HEADER DEL MÓDULO & SWITCH DE MODO MARCO ── */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        backgroundColor: '#FFFFFF', padding: '16px 20px', borderRadius: '16px',
        border: `1px solid ${colores.borde}`, marginBottom: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px', height: '42px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #A61C5C, #732D67)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF'
          }}>
            <Smartphone size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '900', color: colores.textoClaro, margin: 0 }}>
              Copiloto Móvil · Gerente de Ventas
            </h2>
            <div style={{ fontSize: '12px', color: colores.textoMedio, marginTop: '2px' }}>
              Administración de Islas, Tiendas y Corners en Tiempo Real · Totalplay M2C
            </div>
          </div>
        </div>

        {/* Controles de vista */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#F1F5F9', padding: '4px', borderRadius: '12px', border: `1px solid ${colores.borde}` }}>
          <button
            onClick={() => setFrameMode('smartphone')}
            style={{
              padding: '6px 12px', borderRadius: '9px', border: 'none', cursor: 'pointer',
              fontSize: '12px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px',
              backgroundColor: frameMode === 'smartphone' ? '#A61C5C' : 'transparent',
              color: frameMode === 'smartphone' ? '#FFF' : colores.textoMedio,
              boxShadow: frameMode === 'smartphone' ? '0 2px 8px rgba(166,28,92,0.3)' : 'none',
              transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)'
            }}
          >
            <Smartphone size={14} /> Marco Móvil
          </button>

          <button
            onClick={() => setFrameMode('expanded')}
            style={{
              padding: '6px 12px', borderRadius: '9px', border: 'none', cursor: 'pointer',
              fontSize: '12px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px',
              backgroundColor: frameMode === 'expanded' ? '#A61C5C' : 'transparent',
              color: frameMode === 'expanded' ? '#FFF' : colores.textoMedio,
              boxShadow: frameMode === 'expanded' ? '0 2px 8px rgba(166,28,92,0.3)' : 'none',
              transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)'
            }}
          >
            <Maximize2 size={14} /> Vista Full
          </button>
        </div>
      </div>

      {/* ── KPI HIGHLIGHT BANNER (IMPACTO, ROI, PLAZAS MONITOREADAS) ── */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px',
        marginBottom: '20px'
      }}>
        <div style={{
          backgroundColor: '#FFFFFF', padding: '16px 20px', borderRadius: '16px',
          border: `1px solid ${colores.borde}`, borderLeft: '5px solid #73B1BF',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
        }}>
          <div style={{ fontSize: '11px', fontWeight: '800', color: colores.textoMedio, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Gente Impactada (Formatos)
          </div>
          <div style={{ fontSize: '24px', fontWeight: '900', color: colores.textoClaro, margin: '4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={20} color="#73B1BF" />
            {totalGenteImpactada.toLocaleString()}
          </div>
          <div style={{ fontSize: '11px', color: '#10B981', fontWeight: '700' }}>
            ↑ +24% vs mes anterior (Tráfico Físico)
          </div>
        </div>

        <div style={{
          backgroundColor: '#FFFFFF', padding: '16px 20px', borderRadius: '16px',
          border: `1px solid ${colores.borde}`, borderLeft: '5px solid #10B981',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
        }}>
          <div style={{ fontSize: '11px', fontWeight: '800', color: colores.textoMedio, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Retorno de Inversión (ROI)
          </div>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#10B981', margin: '4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={20} color="#10B981" />
            +{roiPromedio}% ROI
          </div>
          <div style={{ fontSize: '11px', color: colores.textoMedio, fontWeight: '600' }}>
            Rentabilidad promedio nacional M2C
          </div>
        </div>

        <div style={{
          backgroundColor: '#FFFFFF', padding: '16px 20px', borderRadius: '16px',
          border: `1px solid ${colores.borde}`, borderLeft: '5px solid #A61C5C',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
        }}>
          <div style={{ fontSize: '11px', fontWeight: '800', color: colores.textoMedio, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Plazas de Monitoreo Activas
          </div>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#A61C5C', margin: '4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={20} color="#A61C5C" />
            {totalPlazasMonitoreo} plazas
          </div>
          <div style={{ fontSize: '11px', color: colores.textoMedio, fontWeight: '600' }}>
            {conteoEstatus.activas} Activas · {conteoEstatus.reparacion} Reparación · {conteoEstatus.inactivas} Inactivas
          </div>
        </div>

        <div style={{
          backgroundColor: '#FFFFFF', padding: '16px 20px', borderRadius: '16px',
          border: `1px solid ${colores.borde}`, borderLeft: '5px solid #EF4444',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
        }}>
          <div style={{ fontSize: '11px', fontWeight: '800', color: colores.textoMedio, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Sucursales que Fallan
          </div>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#EF4444', margin: '4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={20} color="#EF4444" />
            {sucursalesFalla.length} sucursales
          </div>
          <div style={{ fontSize: '11px', color: '#EF4444', fontWeight: '700' }}>
            🚨 Requieren atención del Gerente
          </div>
        </div>
      </div>

      {/* ── CONTENEDOR VISTA MÓVIL (MARCO SMARTPHONE O COMPLETO) ── */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{
          width: frameMode === 'smartphone' ? '390px' : '100%',
          maxWidth: '100%',
          transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
          backgroundColor: '#111827',
          borderRadius: frameMode === 'smartphone' ? '44px' : '20px',
          padding: frameMode === 'smartphone' ? '12px' : '0',
          boxShadow: frameMode === 'smartphone' ? '0 25px 60px rgba(0,0,0,0.4), 0 0 0 10px #2D3748' : '0 4px 20px rgba(0,0,0,0.08)',
          position: 'relative'
        }}>
          {/* SIMULADOR SMARTPHONE - Dynamic Island / Notch */}
          {frameMode === 'smartphone' && (
            <div style={{
              width: '120px', height: '26px', backgroundColor: '#000000', borderRadius: '20px',
              margin: '0 auto 10px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10B981', boxShadow: '0 0 6px #10B981' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#1A202C' }} />
            </div>
          )}

          {/* APPLICACIÓN INTERNA SMARTPHONE */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: frameMode === 'smartphone' ? '34px' : '20px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            minHeight: frameMode === 'smartphone' ? '740px' : '650px',
            maxHeight: frameMode === 'smartphone' ? '820px' : 'none'
          }}>

            {/* APP HEADER BAR */}
            <div style={{
              backgroundColor: '#A61C5C', color: '#FFFFFF', padding: '14px 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              boxShadow: '0 4px 12px rgba(166,28,92,0.3)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <ShieldCheck size={18} color="#FFF" />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '900', letterSpacing: '-0.3px' }}>
                    Gerente M2C Totalplay
                  </div>
                  <div style={{ fontSize: '10px', opacity: 0.9 }}>
                    Monitoreo Móvil en Vivo
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="live-dot live-dot-green" style={{ width: '8px', height: '8px' }} />
                <span style={{ fontSize: '10px', fontWeight: '800' }}>320 PUNTOS</span>
              </div>
            </div>

            {/* BARRA DE NAVEGACIÓN PESTAÑAS MÓVILES */}
            <div style={{
              display: 'flex', backgroundColor: '#F1F5F9', borderBottom: `1px solid ${colores.borde}`,
              padding: '6px 8px', gap: '4px'
            }}>
              {[
                { id: 'mapa', label: '🗺️ Mapa Zoom', badge: tiendasEstadoActual.length },
                { id: 'copiloto', label: '🤖 Copiloto IA', badge: 'En Vivo' },
                { id: 'fallas', label: '🚨 Fallas', badge: sucursalesFalla.length },
                { id: 'metricas', label: '📊 ROI & Impacto', badge: null },
              ].map(t => {
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id as any)}
                    style={{
                      flex: 1, padding: '9px 4px', border: 'none', borderRadius: '10px', cursor: 'pointer',
                      fontSize: '11px', fontWeight: '900', textAlign: 'center',
                      backgroundColor: isActive ? '#A61C5C' : 'transparent',
                      color: isActive ? '#FFFFFF' : colores.textoMedio,
                      boxShadow: isActive ? '0 3px 10px rgba(166,28,92,0.3)' : 'none',
                      transition: 'all 0.22s cubic-bezier(0.22, 1, 0.36, 1)', position: 'relative',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px'
                    }}
                  >
                    <span>{t.label}</span>
                    {t.badge !== null && (
                      <span style={{
                        fontSize: '9px', fontWeight: '900',
                        backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : '#E2E8F0',
                        color: isActive ? '#FFFFFF' : colores.textoMedio,
                        padding: '1px 6px', borderRadius: '10px', flexShrink: 0
                      }}>
                        {t.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* ── PESTAÑA 1: MAPA ZOOM CON 10+ TIENDAS POR ESTADO ── */}
            {activeTab === 'mapa' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>

                {/* BARRA SUPERIOR DE SELECTOR DE ESTADO ESTILIZADA */}
                <div style={{
                  padding: '10px 14px', backgroundColor: '#F8FAFC', borderBottom: `1px solid ${colores.borde}`,
                  display: 'flex', gap: '8px', alignItems: 'center'
                }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '8px', backgroundColor: '#FCE7F1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={16} color="#A61C5C" />
                  </div>

                  <div style={{ flex: 1, position: 'relative' }}>
                    <select
                      value={selectedEstadoId || ''}
                      onChange={(e) => {
                        setSelectedEstadoId(e.target.value || null);
                        setSelectedTienda(null);
                      }}
                      style={{
                        width: '100%', padding: '8px 12px', borderRadius: '10px',
                        border: '1.5px solid #A61C5C40',
                        fontSize: '12px', fontWeight: '800', color: colores.textoClaro, backgroundColor: '#FFFFFF',
                        outline: 'none', cursor: 'pointer', appearance: 'none',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                        transition: 'all 0.2s'
                      }}
                    >
                      <option value="">🇲🇽 República Mexicana (Vista General)</option>
                      {estadosPaths.map(e => (
                        <option key={e.id} value={e.id}>
                          {e.label} (10 sucursales a cargo)
                        </option>
                      ))}
                    </select>
                    <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', fontSize: '10px', color: '#A61C5C' }}>
                      ▼
                    </div>
                  </div>

                  {selectedEstadoId && (
                    <button
                      onClick={() => { setSelectedEstadoId(null); setSelectedTienda(null); }}
                      style={{
                        padding: '8px 10px', borderRadius: '10px', border: '1px solid #FECDD3',
                        background: '#FFF1F2', color: '#E11D48', fontSize: '11px', fontWeight: '800',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
                        boxShadow: '0 2px 6px rgba(225,29,72,0.15)', transition: 'all 0.2s'
                      }}
                    >
                      <RefreshCw size={12} /> Reset
                    </button>
                  )}
                </div>

                {/* FILTROS DE SUCURSAL CON ESTILO DE CHIPS PÍLDORA */}
                <div className="no-scrollbar" style={{ padding: '8px 14px', display: 'flex', gap: '8px', overflowX: 'auto', borderBottom: `1px solid ${colores.borde}`, backgroundColor: '#FFFFFF', alignItems: 'center' }}>
                  <span style={{ fontSize: '10px', fontWeight: '900', color: colores.textoMedio, textTransform: 'uppercase', letterSpacing: '0.05em', flexShrink: 0 }}>Estatus:</span>
                  {(['Todos', 'Activa', 'En Reparación', 'Inactiva'] as const).map(est => (
                    <button
                      key={est}
                      onClick={() => setFiltroEstatus(est)}
                      style={{
                        padding: '4px 10px', borderRadius: '20px', border: 'none', fontSize: '10.5px', fontWeight: '800', cursor: 'pointer',
                        whiteSpace: 'nowrap', transition: 'all 0.2s', flexShrink: 0,
                        backgroundColor: filtroEstatus === est ? '#A61C5C' : '#F1F5F9',
                        color: filtroEstatus === est ? '#FFF' : colores.textoMedio,
                        boxShadow: filtroEstatus === est ? '0 2px 8px rgba(166,28,92,0.25)' : 'none'
                      }}
                    >
                      {est === 'Activa' ? '🟢 Activas' : est === 'En Reparación' ? '🟠 Reparación' : est === 'Inactiva' ? '🔴 Inactivas' : 'Todas'}
                    </button>
                  ))}

                  <div style={{ width: '1px', height: '16px', backgroundColor: colores.borde, margin: '0 2px', flexShrink: 0 }} />

                  <span style={{ fontSize: '10px', fontWeight: '900', color: colores.textoMedio, textTransform: 'uppercase', letterSpacing: '0.05em', flexShrink: 0 }}>Inversión:</span>
                  {(['Todos', 'Verde', 'Amarillo', 'Rojo'] as const).map(sem => (
                    <button
                      key={sem}
                      onClick={() => setFiltroSemaforo(sem)}
                      style={{
                        padding: '4px 10px', borderRadius: '20px', border: 'none', fontSize: '10.5px', fontWeight: '800', cursor: 'pointer',
                        whiteSpace: 'nowrap', transition: 'all 0.2s', flexShrink: 0,
                        backgroundColor: filtroSemaforo === sem ? (sem === 'Verde' ? '#10B981' : sem === 'Amarillo' ? '#D9933D' : sem === 'Rojo' ? '#EF4444' : '#475569') : '#F1F5F9',
                        color: filtroSemaforo === sem ? '#FFF' : colores.textoMedio,
                        boxShadow: filtroSemaforo === sem ? '0 2px 8px rgba(0,0,0,0.15)' : 'none'
                      }}
                    >
                      {sem === 'Verde' ? '🟢 Invertir' : sem === 'Amarillo' ? '🟡 Mantener' : sem === 'Rojo' ? '🔴 No Invertir' : 'Todos'}
                    </button>
                  ))}
                </div>

                {/* SVG MAPA ZOOM INTERACTIVO */}
                <div style={{ flex: 1, position: 'relative', overflow: 'hidden', backgroundColor: '#0F172A', minHeight: '260px' }}>
                  <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10, backgroundColor: 'rgba(15,23,42,0.85)', color: '#FFF', padding: '4px 10px', borderRadius: '8px', fontSize: '10px', fontWeight: '800', backdropFilter: 'blur(4px)' }}>
                    {selectedEstadoId ? `📍 Zoom en: ${estadosData[selectedEstadoId]?.nombre} (${tiendasFiltradas.length} sucursales)` : '🇲🇽 Toca un estado para zoom & tiendas'}
                  </div>

                  <svg
                    viewBox={currentViewBox}
                    style={{ width: '100%', height: '100%', cursor: 'pointer', transition: 'all 0.5s ease-in-out' }}
                  >
                    {/* Render de los 32 estados de la república */}
                    {estadosPaths.map(({ id, path, label }) => {
                      const isSelected = selectedEstadoId === id;
                      return (
                        <path
                          key={id}
                          d={path}
                          fill={isSelected ? '#1E293B' : '#334155'}
                          stroke={isSelected ? '#A61C5C' : '#475569'}
                          strokeWidth={isSelected ? '2' : '0.8'}
                          style={{
                            transition: 'all 0.3s ease',
                            opacity: selectedEstadoId && !isSelected ? 0.4 : 1
                          }}
                          onClick={() => {
                            setSelectedEstadoId(id);
                            setSelectedTienda(null);
                          }}
                        />
                      );
                    })}

                    {/* Render de los pines de las 10+ tiendas del estado seleccionado */}
                    {tiendasFiltradas.map((t) => {
                      const isPinSelected = selectedTienda?.id === t.id;
                      const pinColor = t.estatus === 'Activa' ? (t.semaforoVentas === 'Verde' ? '#10B981' : t.semaforoVentas === 'Amarillo' ? '#F59E0B' : '#EF4444') : t.estatus === 'En Reparación' ? '#F97316' : '#EF4444';

                      return (
                        <g
                          key={t.id}
                          transform={`translate(${t.xSvg}, ${t.ySvg})`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTienda(t);
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          {/* Pulso dinámico para tiendas en falla o verde */}
                          <circle
                            r={isPinSelected ? 7 : 4}
                            fill={pinColor}
                            opacity={0.35}
                            style={{ animation: 'pulsePin 1.8s infinite' }}
                          />
                          <circle
                            r={isPinSelected ? 3.8 : 2.4}
                            fill={pinColor}
                            stroke="#FFFFFF"
                            strokeWidth="0.8"
                          />
                          {/* Etiqueta flotante con zoom */}
                          {selectedEstadoId && (
                            <text
                              x="0"
                              y="-8"
                              textAnchor="middle"
                              fill="#FFFFFF"
                              fontSize="5"
                              fontWeight="bold"
                              style={{ pointerEvents: 'none', textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
                            >
                              {t.nombre.split(' ')[0]} {t.nombre.split(' ')[1]}
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </svg>

                  {/* Leyenda semáforo mapa */}
                  <div style={{ position: 'absolute', bottom: 10, right: 10, zIndex: 10, backgroundColor: 'rgba(15,23,42,0.9)', padding: '6px 10px', borderRadius: '8px', fontSize: '9px', color: '#FFF', display: 'flex', gap: '8px' }}>
                    <span>🟢 Invertir</span>
                    <span>🟡 Mantener</span>
                    <span>🔴 No invertir</span>
                    <span>🟠 Reparación</span>
                  </div>
                </div>

                {/* LISTA / DETALLE DE LA SUCURSAL SELECCIONADA CON SEMÁFORO DE INVERSIÓN */}
                <div className="styled-scroll" style={{ flex: 1, padding: '12px', overflowY: 'auto', backgroundColor: '#F8FAFC' }}>
                  {selectedTienda ? (
                    <div style={{
                      backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '14px',
                      border: `2px solid ${selectedTienda.semaforoVentas === 'Verde' ? '#10B981' : selectedTienda.semaforoVentas === 'Amarillo' ? '#F59E0B' : '#EF4444'}`,
                      boxShadow: '0 4px 14px rgba(0,0,0,0.06)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                        <div>
                          <span style={{
                            fontSize: '10px', fontWeight: '900', padding: '2px 8px', borderRadius: '6px',
                            backgroundColor: selectedTienda.formato === 'Isla Mall' ? '#E0F2FE' : selectedTienda.formato === 'Corner Autoservicio' ? '#FEF3C7' : '#FCE7F1',
                            color: selectedTienda.formato === 'Isla Mall' ? '#0369A1' : selectedTienda.formato === 'Corner Autoservicio' ? '#B45309' : '#A61C5C',
                          }}>
                            {selectedTienda.formato}
                          </span>
                          <h3 style={{ fontSize: '15px', fontWeight: '900', color: colores.textoClaro, margin: '6px 0 2px 0' }}>
                            {selectedTienda.nombre}
                          </h3>
                          <div style={{ fontSize: '11px', color: colores.textoMedio }}>
                            C.P. {selectedTienda.coberturaCP} · Encargado: <strong>{selectedTienda.encargado}</strong>
                          </div>
                        </div>

                        <button
                          onClick={() => setSelectedTienda(null)}
                          style={{ border: 'none', background: '#F1F5F9', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer' }}
                        >
                          ✕
                        </button>
                      </div>

                      {/* CAJA DE SEMÁFORO Y DECISIÓN DE INVERSIÓN */}
                      <div style={{
                        backgroundColor: selectedTienda.semaforoVentas === 'Verde' ? '#ECFDF5' : selectedTienda.semaforoVentas === 'Amarillo' ? '#FFFBEB' : '#FEF2F2',
                        border: `1px solid ${selectedTienda.semaforoVentas === 'Verde' ? '#A7F3D0' : selectedTienda.semaforoVentas === 'Amarillo' ? '#FDE68A' : '#FCA5A5'}`,
                        borderRadius: '12px', padding: '12px', marginBottom: '12px'
                      }}>
                        <div style={{ fontSize: '11px', fontWeight: '900', color: selectedTienda.semaforoVentas === 'Verde' ? '#047857' : selectedTienda.semaforoVentas === 'Amarillo' ? '#B45309' : '#B91C1C', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                          <span>
                            {selectedTienda.semaforoVentas === 'Verde' ? '🟢 SEMÁFORO VERDE · ALTA RENTABILIDAD' : selectedTienda.semaforoVentas === 'Amarillo' ? '🟡 SEMÁFORO AMARILLO · DESEMPEÑO ESTABLE' : '🔴 SEMÁFORO ROJO · DESEMPEÑO CRÍTICO'}
                          </span>
                        </div>
                        <div style={{ fontSize: '11.5px', color: colores.textoClaro, fontWeight: '700', lineHeight: 1.4 }}>
                          {selectedTienda.recomendacionInversion}
                        </div>
                      </div>

                      {/* METRICAS ESPECÍFICAS DE LA TIENDA */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                        <div style={{ backgroundColor: '#F8FAFC', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
                          <div style={{ fontSize: '10px', color: colores.textoMedio }}>Gente Impactada</div>
                          <div style={{ fontSize: '13px', fontWeight: '900', color: colores.textoClaro }}>
                            {selectedTienda.genteImpactada.toLocaleString()}
                          </div>
                        </div>

                        <div style={{ backgroundColor: '#F8FAFC', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
                          <div style={{ fontSize: '10px', color: colores.textoMedio }}>Retorno ROI</div>
                          <div style={{ fontSize: '13px', fontWeight: '900', color: '#10B981' }}>
                            +{selectedTienda.roi}%
                          </div>
                        </div>

                        <div style={{ backgroundColor: '#F8FAFC', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
                          <div style={{ fontSize: '10px', color: colores.textoMedio }}>Plazas Monitoreo</div>
                          <div style={{ fontSize: '13px', fontWeight: '900', color: '#A61C5C' }}>
                            {selectedTienda.plazasMonitoreo} sensores
                          </div>
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: '800', color: colores.textoClaro, marginBottom: '8px' }}>
                        Tiendas a tu cargo en {estadosData[selectedEstadoId || 'MX_DF']?.nombre} ({tiendasFiltradas.length}):
                      </div>

                      {tiendasFiltradas.map(t => (
                        <div
                          key={t.id}
                          onClick={() => setSelectedTienda(t)}
                          style={{
                            backgroundColor: '#FFFFFF', padding: '10px 12px', borderRadius: '10px', marginBottom: '6px',
                            border: `1px solid ${colores.borde}`, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                          }}
                        >
                          <div>
                            <div style={{ fontSize: '12px', fontWeight: '800', color: colores.textoClaro }}>{t.nombre}</div>
                            <div style={{ fontSize: '10px', color: colores.textoMedio }}>
                              {t.formato} · ROI +{t.roi}% · {t.genteImpactada.toLocaleString()} personas
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{
                              fontSize: '10px', fontWeight: '900', padding: '2px 6px', borderRadius: '6px',
                              backgroundColor: t.semaforoVentas === 'Verde' ? '#ECFDF5' : t.semaforoVentas === 'Amarillo' ? '#FFFBEB' : '#FEF2F2',
                              color: t.semaforoVentas === 'Verde' ? '#047857' : t.semaforoVentas === 'Amarillo' ? '#B45309' : '#B91C1C'
                            }}>
                              {t.semaforoVentas === 'Verde' ? 'Invertir' : t.semaforoVentas === 'Amarillo' ? 'Mantener' : 'No Invertir'}
                            </span>
                            <ChevronRight size={14} color={colores.textoMedio} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* ── PESTAÑA 2: COPILOTO IA EN MONITOREO DE GERENTE ── */}
            {activeTab === 'copiloto' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', backgroundColor: '#F8FAFC' }}>
                <div style={{ padding: '10px 14px', backgroundColor: '#FFFFFF', borderBottom: `1px solid ${colores.borde}`, display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#A61C5C', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
                    <Bot size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '900', color: colores.textoClaro }}>
                      Copiloto Inteligente M2C
                    </div>
                    <div style={{ fontSize: '10px', color: '#10B981', fontWeight: '700' }}>
                      ● Asistente activo en celular
                    </div>
                  </div>
                </div>

                {/* MENSAJES DE CHAT */}
                <div className="styled-scroll" style={{ flex: 1, padding: '12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      style={{
                        alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                        maxWidth: '85%',
                        backgroundColor: msg.sender === 'user' ? '#A61C5C' : '#FFFFFF',
                        color: msg.sender === 'user' ? '#FFFFFF' : colores.textoClaro,
                        padding: '10px 14px',
                        borderRadius: msg.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        fontSize: '12px',
                        lineHeight: 1.4
                      }}
                    >
                      {msg.text}
                      <div style={{ fontSize: '9px', textAlign: 'right', marginTop: '4px', opacity: 0.7 }}>
                        {msg.time}
                      </div>
                    </div>
                  ))}
                </div>

                {/* BOTONES DE PREGUNTAS RÁPIDAS */}
                <div style={{ padding: '6px 12px', display: 'flex', gap: '6px', overflowX: 'auto', backgroundColor: '#FFFFFF', borderTop: `1px solid ${colores.borde}` }}>
                  {[
                    '🚨 ¿Cuáles sucursales fallan?',
                    '🟢 ¿En cuál sucursal reinvertir dinero?',
                    '📊 Resumen de ROI nacional',
                  ].map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendChat(q)}
                      style={{
                        padding: '5px 10px', borderRadius: '12px', border: `1px solid ${colores.borde}`,
                        backgroundColor: '#F1F5F9', fontSize: '10px', fontWeight: '700', color: colores.textoClaro,
                        cursor: 'pointer', whiteSpace: 'nowrap'
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>

                {/* INPUT ENVIAR */}
                <div style={{ padding: '10px 12px', backgroundColor: '#FFFFFF', borderTop: `1px solid ${colores.borde}`, display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={inputChat}
                    onChange={e => setInputChat(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSendChat()}
                    placeholder="Haz una consulta a tu Copiloto Gerente..."
                    style={{
                      flex: 1, padding: '8px 12px', borderRadius: '20px', border: `1px solid ${colores.borde}`,
                      fontSize: '12px', outline: 'none'
                    }}
                  />
                  <button
                    onClick={() => handleSendChat()}
                    style={{
                      width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#A61C5C',
                      border: 'none', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* ── PESTAÑA 3: SUCURSALES EN FALLA ── */}
            {activeTab === 'fallas' && (
              <div className="styled-scroll" style={{ flex: 1, padding: '12px', overflowY: 'auto', backgroundColor: '#F8FAFC' }}>
                <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', padding: '12px', borderRadius: '12px', marginBottom: '12px' }}>
                  <div style={{ fontSize: '13px', fontWeight: '900', color: '#B91C1C', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <AlertTriangle size={16} /> Monitoreo de Sucursales con Falla o Alerta
                  </div>
                  <div style={{ fontSize: '11px', color: '#7F1D1D', marginTop: '4px' }}>
                    El Copiloto IA recomienda revisar de inmediato los sensores de visión y la atención al cliente en estos puntos.
                  </div>
                </div>

                {sucursalesFalla.map(f => (
                  <div key={f.id} style={{ backgroundColor: '#FFFFFF', padding: '12px', borderRadius: '12px', marginBottom: '8px', border: `1px solid ${colores.borde}`, borderLeft: '4px solid #EF4444' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '12px', fontWeight: '900', color: colores.textoClaro }}>{f.nombre}</span>
                      <span style={{ fontSize: '10px', fontWeight: '800', color: '#EF4444', backgroundColor: '#FEF2F2', padding: '2px 6px', borderRadius: '4px' }}>
                        {f.estatus === 'Inactiva' ? '🔴 Inactiva' : '🔴 Semáforo Rojo'}
                      </span>
                    </div>

                    <div style={{ fontSize: '11px', color: colores.textoMedio, margin: '6px 0' }}>
                      Encargado: {f.encargado} · Cobertura C.P. {f.coberturaCP}
                    </div>

                    <div style={{ backgroundColor: '#F8FAFC', padding: '8px', borderRadius: '8px', fontSize: '10.5px', color: '#B91C1C', fontWeight: '700' }}>
                      {f.recomendacionInversion}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── PESTAÑA 4: MÉTRICAS ROI & FORMATOS ── */}
            {activeTab === 'metricas' && (
              <div className="styled-scroll" style={{ flex: 1, padding: '12px', overflowY: 'auto', backgroundColor: '#F8FAFC' }}>
                <div style={{ backgroundColor: '#FFFFFF', padding: '14px', borderRadius: '12px', border: `1px solid ${colores.borde}`, marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: '900', color: colores.textoClaro, margin: '0 0 10px 0' }}>
                    Desempeño por Formato Comercial
                  </h4>

                  {[
                    { nombre: 'Islas Mall (4x3m)', cantidad: 48, roi: '+310%', personas: '2.1M', color: '#A61C5C' },
                    { nombre: 'Corners Autoservicio', cantidad: 42, roi: '+240%', personas: '1.8M', color: '#D9933D' },
                    { nombre: 'Tiendas Premium', cantidad: 22, roi: '+295%', personas: '950K', color: '#73B1BF' },
                  ].map((f, idx) => (
                    <div key={idx} style={{ padding: '8px 0', borderBottom: idx < 2 ? `1px solid ${colores.borde}` : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: '800', color: colores.textoClaro }}>{f.nombre}</div>
                        <div style={{ fontSize: '10px', color: colores.textoMedio }}>{f.cantidad} ubicaciones monitoreadas</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '12px', fontWeight: '900', color: f.color }}>{f.roi} ROI</div>
                        <div style={{ fontSize: '10px', color: colores.textoMedio }}>{f.personas} personas</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulsePin {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.6); opacity: 0.15; }
        }
      `}</style>
    </div>
  );
};
