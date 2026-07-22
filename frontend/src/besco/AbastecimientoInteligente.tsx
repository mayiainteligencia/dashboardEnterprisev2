import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Cpu, Clock, Truck, DollarSign, AlertCircle, CheckCircle, 
  MessageSquare, RefreshCw, Check, PlayCircle, AlertTriangle,
  UserCheck, ShieldAlert, Phone, Mail, Send, Filter, X, Trophy, ChevronRight
} from 'lucide-react';
import { brandingConfig, type TemaBesco } from '../config/branding';
import { 
  type Modo, 
  colorSeveridad, 
  casosUrgenciaMock, 
  casosPredictivosMock,
  type CasoUrgencia,
  type CasoPredictivo
} from './bescoData';

const { colores, ia } = brandingConfig;

interface Proveedor {
  nombre: string;
  precio: number;
  eta: number; // en minutos
  distancia: number; // en km
  calidad: 'Alta' | 'Estándar' | 'Básica';
  stock: 'Disponible' | 'Bajo pedido' | 'Inmediato';
  trasladoCosto: number;
  recomendacion: string;
}

interface Escenario {
  id: string;
  nombre: string;
  descripcion: string;
  cliente: string;
  problema: string;
  urgencia: 'critico' | 'atencion' | 'ok';
  proveedores: Proveedor[];
  decisionLogistica: string;
}

const ESCENARIOS: Escenario[] = [
  {
    id: 'cliente_vip',
    nombre: 'Cliente VIP (Falla Crítica)',
    descripcion: 'Torre Reforma reporta puerta de cristal templado dañada. Prioridad extrema.',
    cliente: 'Torre Reforma',
    problema: 'La puerta principal de cristal templado está rota y bloquea el acceso principal.',
    urgencia: 'critico',
    decisionLogistica: 'Torre Reforma es cliente VIP con SLA de 1 hora. Se prioriza la calidad del cristal (templado de 12mm) y la disponibilidad inmediata para instalación, descartando opciones más económicas que tardan horas.',
    proveedores: [
      {
        nombre: 'Vidrios Templados del Centro',
        precio: 8500,
        eta: 40,
        distancia: 8,
        calidad: 'Alta',
        stock: 'Disponible',
        trasladoCosto: 200,
        recomendacion: 'Es la mejor opción recomendada. Ofrece el calibre adecuado de 12mm y técnico certificado disponible para instalación inmediata.'
      },
      {
        nombre: 'Vidriería Local Reforma',
        precio: 4000,
        eta: 120,
        distancia: 2,
        calidad: 'Básica',
        stock: 'Bajo pedido',
        trasladoCosto: 50,
        recomendacion: 'Más económico, pero solo ofrece cristal simple de 6mm y requiere 2 horas de preparación en taller.'
      },
      {
        nombre: 'Vidrios Industriales Toluca',
        precio: 7200,
        eta: 180,
        distancia: 62,
        calidad: 'Alta',
        stock: 'Disponible',
        trasladoCosto: 950,
        recomendacion: 'Buena calidad, pero la distancia desde Toluca incrementa el costo de traslado e imposibilita cumplir el SLA.'
      }
    ]
  },
  {
    id: 'falla_plaza',
    nombre: 'Falla Crítica en Plaza (Celaya vs Irapuato)',
    descripcion: 'Falla del compresor del clima. Logística e inventario regional.',
    cliente: 'Plaza Celaya',
    problema: 'El sistema de clima (HVAC) del data hall dejó de funcionar. Riesgo de sobrecalentamiento.',
    urgencia: 'critico',
    decisionLogistica: 'El compresor industrial necesario no está en stock en Celaya. MAYIA valora enviar desde el almacén regional de Irapuato (35 km) frente a contratar un proveedor de Querétaro que requiere pedido. Se elige Irapuato.',
    proveedores: [
      {
        nombre: 'Climas y Compresores de Irapuato',
        precio: 12000,
        eta: 50,
        distancia: 35,
        calidad: 'Alta',
        stock: 'Inmediato',
        trasladoCosto: 850,
        recomendacion: 'Recomendado. Cuenta con la refacción exacta en su inventario regional y puede despachar de inmediato a Celaya.'
      },
      {
        nombre: 'Servicios de Clima Celaya S.A.',
        precio: 14500,
        eta: 25,
        distancia: 4,
        calidad: 'Estándar',
        stock: 'Bajo pedido',
        trasladoCosto: 150,
        recomendacion: 'Muy cerca físicamente, pero el compresor no está disponible de inmediato (requiere 24 horas para surtirse) y el precio base es más alto.'
      },
      {
        nombre: 'Mantenimiento Logístico Querétaro',
        precio: 9800,
        eta: 240,
        distancia: 55,
        calidad: 'Alta',
        stock: 'Disponible',
        trasladoCosto: 1100,
        recomendacion: 'Precio unitario bajo, pero el traslado largo de herramientas pesadas y el ETA de 4 horas incrementan el riesgo en data hall.'
      }
    ]
  },
  {
    id: 'venta_urgente',
    nombre: 'Venta Urgente (1000 Plumas)',
    descripcion: 'Compras requiere surtir material administrativo en lote urgente.',
    cliente: 'Corporativo Monterrey',
    problema: 'Se requiere la adquisición y entrega inmediata de 1000 plumas corporativas para evento ejecutivo de mañana.',
    urgencia: 'atencion',
    decisionLogistica: 'Prioridad de volumen de stock. Se busca un proveedor que cuente con las 1000 unidades en almacén físico local listo para entrega, en lugar de envío consolidado nacional.',
    proveedores: [
      {
        nombre: 'Papelería RegioExpress',
        precio: 3200,
        eta: 30,
        distancia: 5,
        calidad: 'Estándar',
        stock: 'Disponible',
        trasladoCosto: 150,
        recomendacion: 'Recomendada. Satisface el volumen requerido en stock local con entrega en 30 minutos.'
      },
      {
        nombre: 'Distribuidora Mayorista Nacional',
        precio: 2100,
        eta: 1440,
        distancia: 420,
        calidad: 'Estándar',
        stock: 'Disponible',
        trasladoCosto: 400,
        recomendacion: 'Más barato por mayoreo, pero el envío toma 24 horas, lo que incumple con el evento programado.'
      },
      {
        nombre: 'Papelería Premium Monterrey',
        precio: 4800,
        eta: 20,
        distancia: 2,
        calidad: 'Alta',
        stock: 'Disponible',
        trasladoCosto: 100,
        recomendacion: 'Entrega sumamente rápida, pero el costo de la línea premium representa un sobreprecio del 50% innecesario.'
      }
    ]
  }
];

const ORACLE_REQUISITIONS_MOCK = [
  { cliente: 'Plaza Querétaro', problema: 'Falla hidráulica en cisterna principal. Pérdida de presión.', urgencia: 'critico' as const },
  { cliente: 'C.C. Santa Fe', problema: 'Se requiere aceite dieléctrico para transformador de subestación.', urgencia: 'atencion' as const },
  { cliente: 'Torre Reforma', problema: 'Focos fundidos y cortina del mezanina requiere engrase.', urgencia: 'ok' as const },
  { cliente: 'Corporativo Monterrey', problema: 'Deterioro en la pintura y paneles del nivel 4. Estética.', urgencia: 'ok' as const },
  { cliente: 'Polanco 04', problema: 'Falla crítica de ventilador del extractor en cocina ejecutiva.', urgencia: 'critico' as const },
];

export const AbastecimientoInteligente: React.FC<{ 
  tema: TemaBesco; 
  modo: Modo; 
  onNavigateToRendimiento?: (sellerName?: string) => void;
}> = ({ tema, onNavigateToRendimiento }) => {
  // Navigation Tabs: 'urgencias' | 'predictivos' | 'casos_abiertos'
  const [activeTab, setActiveTab] = useState<'urgencias' | 'predictivos' | 'casos_abiertos'>('urgencias');

  // Urgencias state
  const [urgenciasList, setUrgenciasList] = useState<CasoUrgencia[]>(casosUrgenciaMock);
  const [filtroEstadoUrgencia, setFiltroEstadoUrgencia] = useState<'todos' | 'pendiente' | 'en_proceso' | 'solucionado'>('todos');

  // Predictivos state
  const [predictivosList] = useState<CasoPredictivo[]>(casosPredictivosMock);
  const [modalContacto, setModalContacto] = useState<CasoPredictivo | null>(null);
  const [mensajeContactoEnviado, setMensajeContactoEnviado] = useState(false);

  // Casos Abiertos / Simulator State
  const [selectedEscenario, setSelectedEscenario] = useState<string>('');
  const [cliente, setCliente] = useState('Torre Reforma');
  const [problema, setProblema] = useState('La puerta principal de cristal templado está rota.');
  const [urgencia, setUrgencia] = useState<'critico' | 'atencion' | 'ok'>('critico');
  const [cargandoOracle, setCargandoOracle] = useState(false);
  const [phase, setPhase] = useState<'input' | 'analyzing' | 'result'>('input');
  const [analysisStep, setAnalysisStep] = useState(0);

  const steps = [
    'Identificando tipo de producto/servicio solicitado...',
    'Escaneando catálogo de proveedores registrados...',
    'Evaluando disponibilidad de stock físico...',
    'Calculando costos de traslado y ETA en tiempo real...',
    'Optimizando matriz de decisión de IA (Tiempo vs Costo)...'
  ];

  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [decisionLogistica, setDecisionLogistica] = useState('');
  const [aprobado, setAprobado] = useState(false);
  const [notifRole, setNotifRole] = useState<'operacion' | 'compras' | 'cliente'>('operacion');
  const [notificacionesChat, setNotificacionesChat] = useState<{ sender: 'ia' | 'cliente' | 'proveedor' | 'oracle'; text: string; time: string }[]>([]);
  const [typing, setTyping] = useState(false);

  // Cambiar estado de urgencia directamente
  const cambiarEstadoUrgencia = (id: string, nuevoEstado: 'pendiente' | 'en_proceso' | 'solucionado') => {
    setUrgenciasList(prev => prev.map(u => u.id === id ? { ...u, estado: nuevoEstado } : u));
  };

  // Sync Form with Scenario Selection
  const aplicarEscenario = (id: string) => {
    const esc = ESCENARIOS.find(e => e.id === id);
    if (!esc) return;
    setSelectedEscenario(id);
    setCliente(esc.cliente);
    setProblema(esc.problema);
    setUrgencia(esc.urgencia);
    setProveedores(esc.proveedores);
    setDecisionLogistica(esc.decisionLogistica);
    setPhase('input');
    setAprobado(false);
    setNotificacionesChat([]);
  };

  // Simulates reading from Oracle Requisitions DB
  const simularLecturaOracle = () => {
    setCargandoOracle(true);
    setSelectedEscenario('');
    setPhase('input');
    setAprobado(false);
    setNotificacionesChat([]);
    
    setTimeout(() => {
      const randomReq = ORACLE_REQUISITIONS_MOCK[Math.floor(Math.random() * ORACLE_REQUISITIONS_MOCK.length)];
      setCliente(randomReq.cliente);
      setProblema(randomReq.problema);
      setUrgencia(randomReq.urgencia);
      setCargandoOracle(false);
      
      const isCritical = randomReq.urgencia === 'critico';
      const isMedium = randomReq.urgencia === 'atencion';
      
      setProveedores([
        {
          nombre: 'Suministros Directos del Centro',
          precio: isCritical ? 9500 : isMedium ? 6000 : 3500,
          eta: isCritical ? 35 : 120,
          distancia: 6,
          calidad: isCritical ? 'Alta' : 'Estándar',
          stock: 'Disponible',
          trasladoCosto: 180,
          recomendacion: isCritical ? 'Recomendado por tiempo de respuesta inmediato.' : 'Buena opción balanceada.'
        },
        {
          nombre: 'Proveedora Industrial del Norte',
          precio: isCritical ? 7200 : isMedium ? 4200 : 2500,
          eta: isCritical ? 180 : 360,
          distancia: 48,
          calidad: 'Estándar',
          stock: 'Disponible',
          trasladoCosto: 750,
          recomendacion: 'Económico, pero el tiempo de traslado impacta severamente el ETA.'
        },
        {
          nombre: 'Taller Especializado y Refacciones',
          precio: isCritical ? 11000 : isMedium ? 7500 : 4900,
          eta: isCritical ? 25 : 60,
          distancia: 3,
          calidad: 'Alta',
          stock: 'Inmediato',
          trasladoCosto: 100,
          recomendacion: 'Entrega muy rápida, pero sobreprecio del 25% frente al mercado.'
        }
      ]);
      setDecisionLogistica(`Requisición importada de Oracle ERP con éxito. Al analizar el problema "${randomReq.problema}", la IA determinó que la urgencia es ${randomReq.urgencia.toUpperCase()} y se estructuró la comparación en base a la ubicación de ${randomReq.cliente}.`);
    }, 1200);
  };

  const iniciarAnalisis = () => {
    if (proveedores.length === 0) {
      const priceFactor = urgencia === 'critico' ? 2 : urgencia === 'atencion' ? 1.5 : 1;
      setProveedores([
        {
          nombre: 'Servicios Logísticos Integrales',
          precio: Math.round(4000 * priceFactor),
          eta: urgencia === 'critico' ? 45 : 120,
          distancia: 10,
          calidad: 'Alta',
          stock: 'Disponible',
          trasladoCosto: 300,
          recomendacion: 'Recomendado. Proporciona el balance óptimo entre calidad técnica y costo logístico.'
        },
        {
          nombre: 'Distribuciones Express y Local',
          precio: Math.round(5500 * priceFactor),
          eta: 25,
          distancia: 2,
          calidad: 'Estándar',
          stock: 'Disponible',
          trasladoCosto: 120,
          recomendacion: 'Súper rápido pero representa un sobreprecio del 35% por baja distancia.'
        },
        {
          nombre: 'Proveedora del Bajío S.A.',
          precio: Math.round(3000 * priceFactor),
          eta: 240,
          distancia: 45,
          calidad: 'Básica',
          stock: 'Bajo pedido',
          trasladoCosto: 800,
          recomendacion: 'Precio base bajo, pero los gastos y tiempos de traslado anulan el beneficio.'
        }
      ]);
      setDecisionLogistica(`Análisis completado para requerimiento en ${cliente}. Al tratarse de una urgencia de nivel ${urgencia.toUpperCase()}, la IA balanceó la distancia vs stock inmediato y determinó que la opción local es la adecuada.`);
    }

    setPhase('analyzing');
    setAnalysisStep(0);
  };

  useEffect(() => {
    if (phase !== 'analyzing') return;

    if (analysisStep < steps.length) {
      const timer = setTimeout(() => {
        setAnalysisStep(prev => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setPhase('result');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [phase, analysisStep]);

  const simularNotificaciones = (rol: 'operacion' | 'compras' | 'cliente') => {
    setAprobado(true);
    setNotifRole(rol);
    setNotificacionesChat([]);
    setTyping(true);

    const recommended = proveedores.find(p => p.recomendacion.includes('recomendada') || p.recomendacion.includes('Recomendado')) ?? proveedores[0];
    const timeStr = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    
    const logs = [
      { sender: 'ia' as const, text: `[MAYIA IA] Solicitud aprobada por área de ${rol.toUpperCase()}. Iniciando despacho...`, time: timeStr, delay: 600 },
      { sender: 'oracle' as const, text: `[Oracle ERP] Actualizando Requisición. Estado: "En Tránsito". Proveedor asignado: ${recommended.nombre}.`, time: timeStr, delay: 1500 },
      { sender: 'cliente' as const, text: `[WhatsApp a Cliente (${cliente})] "Hola. BESCO informa: El proveedor ${recommended.nombre} ha sido despachado. Llevará refacciones para: '${problema.substring(0, 45)}...'. ETA estimado: ${recommended.eta} min."`, time: timeStr, delay: 2600 },
      { sender: 'proveedor' as const, text: `[WhatsApp a Proveedor (${recommended.nombre})] "Orden #BESCO-${Math.floor(10000 + Math.random() * 90000)} emitida. Por favor iniciar traslado a ${cliente}. Dirección validada."`, time: timeStr, delay: 3800 },
      { sender: 'proveedor' as const, text: `[WhatsApp de Repartidor] "Entendido. Saliendo del almacén a ${recommended.distancia} km. ETA confirmado de ${recommended.eta} minutos."`, time: timeStr, delay: 5000 },
    ];

    logs.forEach(log => {
      setTimeout(() => {
        setNotificacionesChat(prev => [...prev, log]);
        if (log.sender === 'proveedor' && log.text.includes('Entendido')) {
          setTyping(false);
        }
      }, log.delay);
    });
  };

  const recomendado = proveedores.find(p => p.recomendacion.toLowerCase().includes('recomendad') || p.recomendacion.toLowerCase().includes('recomendado')) ?? proveedores[0];
  const alternativas = proveedores.filter(p => p !== recomendado);

  // Filtering urgencias
  const urgenciasFiltradas = urgenciasList.filter(u => {
    if (filtroEstadoUrgencia === 'todos') return true;
    return u.estado === filtroEstadoUrgencia;
  });

  const numUrgenciasPendientes = urgenciasList.filter(u => u.estado === 'pendiente' || u.estado === 'en_proceso').length;
  const numPredictivosCriticos = predictivosList.length;

  return (
    <div style={{ maxWidth: '1240px', animation: 'fadeIn 0.3s ease-out' }}>
      
      {/* HEADER DE SECCIÓN CON BOTÓN A RANKING */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '46px', 
            height: '46px', 
            borderRadius: '14px', 
            background: `linear-gradient(135deg, ${tema.acento}, ${tema.acentoOscuro})`, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            boxShadow: `0 6px 14px ${tema.acento}38` 
          }}>
            <Cpu size={24} color={tema.sobreAcento} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: colores.textoClaro, letterSpacing: '-0.3px' }}>
                Abastecimiento de Urgencia
              </h1>
              <span style={{ fontSize: '11px', fontWeight: 800, background: '#EA580C', color: '#fff', padding: '3px 9px', borderRadius: '12px' }}>
                MÓDULO CENTRAL
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '14.5px', color: colores.textoMedio }}>
              Gestión prioritaria de abastecimiento de urgencias y predictibilidad asistida por {ia.nombre}.
            </p>
          </div>
        </div>

        {/* ACCESO DIRECTO AL RANKING DE COMPRADORES */}
        {onNavigateToRendimiento && (
          <button
            onClick={() => onNavigateToRendimiento()}
            style={{
              padding: '10px 18px',
              borderRadius: '12px',
              border: `1px solid ${tema.acento}`,
              background: tema.acentoSuave,
              color: tema.acentoOscuro,
              fontWeight: 800,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: `0 4px 12px ${tema.acento}20`,
              transition: 'all 0.2s'
            }}
          >
            <Trophy size={16} color="#F59E0B" /> Ranking de Compradores <ChevronRight size={16} />
          </button>
        )}
      </div>

      {/* BARRA SUPERIOR DE RESUMEN / MÉTRICAS PRINCIPALES */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '16px', 
        marginBottom: '24px' 
      }}>
        
        {/* 1. NÚMERO DE URGENCIAS */}
        <div 
          onClick={() => setActiveTab('urgencias')}
          style={{ 
            background: activeTab === 'urgencias' ? tema.acentoSuave : colores.fondoPrincipal, 
            border: `2px solid ${activeTab === 'urgencias' ? tema.acento : colores.borde}`, 
            borderRadius: '16px', 
            padding: '16px 20px', 
            boxShadow: colores.sombra,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: colores.textoMedio, textTransform: 'uppercase' }}>
              Número de Urgencias
            </span>
            <div style={{ width: 32, height: 32, borderRadius: '8px', background: `${colorSeveridad.critico}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={16} color={colorSeveridad.critico} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
            <span style={{ fontSize: '28px', fontWeight: 900, color: colores.textoClaro }}>
              {urgenciasList.length}
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: colorSeveridad.critico }}>
              {numUrgenciasPendientes} activas
            </span>
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '11.5px', color: colores.textoOscuro }}>
            Métricas de Costo, ETA, Distancia y Asignados
          </p>
        </div>

        {/* 2. NÚMERO DE ASUNTOS DE PREDICTIBILIDAD */}
        <div 
          onClick={() => setActiveTab('predictivos')}
          style={{ 
            background: activeTab === 'predictivos' ? tema.acentoSuave : colores.fondoPrincipal, 
            border: `2px solid ${activeTab === 'predictivos' ? tema.acento : colores.borde}`, 
            borderRadius: '16px', 
            padding: '16px 20px', 
            boxShadow: colores.sombra,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: colores.textoMedio, textTransform: 'uppercase' }}>
              Predictibilidad Logística
            </span>
            <div style={{ width: 32, height: 32, borderRadius: '8px', background: `${colorSeveridad.atencion}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={16} color={colorSeveridad.atencion} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
            <span style={{ fontSize: '28px', fontWeight: 900, color: colores.textoClaro }}>
              {numPredictivosCriticos}
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: colorSeveridad.atencion }}>
              Asuntos detectados
            </span>
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '11.5px', color: colores.textoOscuro }}>
            Acción directa de "Contactar cliente"
          </p>
        </div>

        {/* 3. SECCIÓN DE CASOS ABIERTOS */}
        <div 
          onClick={() => setActiveTab('casos_abiertos')}
          style={{ 
            background: activeTab === 'casos_abiertos' ? tema.acentoSuave : colores.fondoPrincipal, 
            border: `2px solid ${activeTab === 'casos_abiertos' ? tema.acento : colores.borde}`, 
            borderRadius: '16px', 
            padding: '16px 20px', 
            boxShadow: colores.sombra,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: colores.textoMedio, textTransform: 'uppercase' }}>
              Casos Abiertos (Motor IA)
            </span>
            <div style={{ width: 32, height: 32, borderRadius: '8px', background: `${colorSeveridad.ok}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <RefreshCw size={16} color={colorSeveridad.ok} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
            <span style={{ fontSize: '28px', fontWeight: 900, color: colores.textoClaro }}>
              {ESCENARIOS.length}
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: colorSeveridad.ok }}>
              Escenarios / Requisiciones
            </span>
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '11.5px', color: colores.textoOscuro }}>
            Simulación de compras, Oracle ERP y proveedores
          </p>
        </div>

        {/* 4. PERSONA QUE LO ESTÁ ATENDIENDO (CLICABLE HACIA RENDIMIENTO) */}
        <div 
          onClick={() => onNavigateToRendimiento?.('Ing. Carlos Mendoza')}
          style={{ 
            background: colores.fondoPrincipal, 
            border: `1.5px solid ${colores.borde}`, 
            borderRadius: '16px', 
            padding: '16px 20px', 
            boxShadow: colores.sombra,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = tema.acento}
          onMouseLeave={e => e.currentTarget.style.borderColor = colores.borde}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ 
              width: 40, 
              height: 40, 
              borderRadius: '50%', 
              background: `linear-gradient(135deg, ${tema.acento}, ${tema.acentoOscuro})`, 
              color: tema.sobreAcento, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '14px',
              flexShrink: 0
            }}>
              CM
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: colores.textoOscuro, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Persona Atendiendo
                </span>
                <span style={{ fontSize: '10px', fontWeight: 800, color: tema.acentoOscuro }}>Ver Ficha →</span>
              </div>
              <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: colores.textoClaro }}>
                Ing. Carlos Mendoza
              </h4>
              <p style={{ margin: 0, fontSize: '11px', color: colores.textoMedio }}>
                Supervisor Logístico Principal · Rank #1
              </p>
            </div>
          </div>
        </div>

      </div>


      {/* PESTAÑAS DE NAVEGACIÓN DEL MÓDULO */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        borderBottom: `2px solid ${colores.borde}`, 
        marginBottom: '20px',
        paddingBottom: '2px'
      }}>
        <button
          onClick={() => setActiveTab('urgencias')}
          style={{
            padding: '12px 20px',
            border: 'none',
            borderBottom: activeTab === 'urgencias' ? `3px solid ${tema.acento}` : '3px solid transparent',
            background: 'transparent',
            color: activeTab === 'urgencias' ? tema.acentoOscuro : colores.textoMedio,
            fontWeight: activeTab === 'urgencias' ? 800 : 600,
            fontSize: '14.5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s'
          }}
        >
          <AlertTriangle size={16} /> Urgencias Logísticas ({urgenciasList.length})
        </button>

        <button
          onClick={() => setActiveTab('predictivos')}
          style={{
            padding: '12px 20px',
            border: 'none',
            borderBottom: activeTab === 'predictivos' ? `3px solid ${tema.acento}` : '3px solid transparent',
            background: 'transparent',
            color: activeTab === 'predictivos' ? tema.acentoOscuro : colores.textoMedio,
            fontWeight: activeTab === 'predictivos' ? 800 : 600,
            fontSize: '14.5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s'
          }}
        >
          <Sparkles size={16} /> Asuntos de Predictibilidad ({predictivosList.length})
        </button>

        <button
          onClick={() => setActiveTab('casos_abiertos')}
          style={{
            padding: '12px 20px',
            border: 'none',
            borderBottom: activeTab === 'casos_abiertos' ? `3px solid ${tema.acento}` : '3px solid transparent',
            background: 'transparent',
            color: activeTab === 'casos_abiertos' ? tema.acentoOscuro : colores.textoMedio,
            fontWeight: activeTab === 'casos_abiertos' ? 800 : 600,
            fontSize: '14.5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s'
          }}
        >
          <RefreshCw size={16} /> Casos Abiertos (Motor BÚSQUEDA IA)
        </button>
      </div>

      {/* CONTENIDO PESTAÑA 1: URGENCIAS LOGÍSTICAS */}
      {activeTab === 'urgencias' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Filtros de estado de urgencia */}
          <div style={{ 
            background: colores.fondoPrincipal, 
            border: `1px solid ${colores.borde}`, 
            borderRadius: '16px', 
            padding: '14px 20px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            boxShadow: colores.sombra
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Filter size={16} color={colores.textoMedio} />
              <span style={{ fontSize: '13px', fontWeight: 700, color: colores.textoClaro }}>
                Filtrar estado de urgencia:
              </span>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[
                  { id: 'todos', label: 'Todas' },
                  { id: 'pendiente', label: 'Pendientes' },
                  { id: 'en_proceso', label: 'En Proceso de Solución' },
                  { id: 'solucionado', label: 'Solucionadas' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFiltroEstadoUrgencia(f.id as any)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      border: `1px solid ${filtroEstadoUrgencia === f.id ? tema.acento : colores.borde}`,
                      background: filtroEstadoUrgencia === f.id ? tema.acentoSuave : colores.fondoSecundario,
                      color: filtroEstadoUrgencia === f.id ? tema.acentoOscuro : colores.textoMedio,
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ fontSize: '12.5px', color: colores.textoMedio }}>
              Mostrando <strong>{urgenciasFiltradas.length}</strong> de <strong>{urgenciasList.length}</strong> urgencias registradas
            </div>
          </div>

          {/* Tarjetas de Urgencias con métricas requeridas */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '18px' }}>
            {urgenciasFiltradas.map((urg) => {
              const colorEstado = urg.estado === 'pendiente' ? colorSeveridad.critico : urg.estado === 'en_proceso' ? colorSeveridad.atencion : colorSeveridad.ok;
              const labelEstado = urg.estado === 'pendiente' ? 'Pendiente' : urg.estado === 'en_proceso' ? 'En Proceso de Solución' : 'Solucionada';

              return (
                <div 
                  key={urg.id} 
                  style={{ 
                    background: colores.fondoPrincipal, 
                    border: `1px solid ${colores.borde}`, 
                    borderRadius: '18px', 
                    padding: '20px', 
                    boxShadow: colores.sombra,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '14px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: colorEstado }} />

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: colores.textoOscuro }}>{urg.id} · {urg.fechaCreacion}</span>
                      <span style={{ 
                        fontSize: '11px', 
                        fontWeight: 800, 
                        color: colorEstado, 
                        background: `${colorEstado}1A`, 
                        padding: '3px 9px', 
                        borderRadius: '6px' 
                      }}>
                        {labelEstado}
                      </span>
                    </div>

                    <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 800, color: colores.textoClaro }}>
                      {urg.cliente}
                    </h3>
                    <p style={{ margin: 0, fontSize: '13px', color: colores.textoMedio, lineHeight: 1.4 }}>
                      {urg.falla}
                    </p>
                  </div>

                  {/* MÉTRICAS REQUERIDAS: Costo Total, ETA, Distancia, Calidad */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(4, 1fr)', 
                    gap: '8px', 
                    background: colores.fondoSecundario, 
                    padding: '12px', 
                    borderRadius: '12px',
                    border: `1px solid ${colores.borde}`
                  }}>
                    <div>
                      <span style={{ fontSize: '9.5px', color: colores.textoOscuro, textTransform: 'uppercase', fontWeight: 700 }}>Costo Total</span>
                      <p style={{ margin: 0, fontSize: '13.5px', fontWeight: 800, color: colores.textoClaro }}>${urg.costoTotal.toLocaleString('es-MX')}</p>
                    </div>

                    <div>
                      <span style={{ fontSize: '9.5px', color: colores.textoOscuro, textTransform: 'uppercase', fontWeight: 700 }}>ETA</span>
                      <p style={{ margin: 0, fontSize: '13.5px', fontWeight: 800, color: colorEstado }}>{urg.eta} min</p>
                    </div>

                    <div>
                      <span style={{ fontSize: '9.5px', color: colores.textoOscuro, textTransform: 'uppercase', fontWeight: 700 }}>Distancia</span>
                      <p style={{ margin: 0, fontSize: '13.5px', fontWeight: 800, color: colores.textoClaro }}>{urg.distancia} km</p>
                    </div>

                    <div>
                      <span style={{ fontSize: '9.5px', color: colores.textoOscuro, textTransform: 'uppercase', fontWeight: 700 }}>Calidad</span>
                      <p style={{ margin: 0, fontSize: '13.5px', fontWeight: 800, color: colores.textoClaro }}>{urg.calidad}</p>
                    </div>
                  </div>

                  {/* PERSONA ASIGNADA AL CASO */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    paddingTop: '8px', 
                    borderTop: `1px solid ${colores.borde}` 
                  }}>
                    <div 
                      onClick={() => onNavigateToRendimiento?.(urg.personaAsignada)}
                      title={`Ver Ficha de Rendimiento de ${urg.personaAsignada}`}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                    >
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: tema.acentoSuave, color: tema.acentoOscuro, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <UserCheck size={14} />
                      </div>
                      <div>
                        <span style={{ fontSize: '10px', color: colores.textoOscuro, display: 'block' }}>Persona Asignada</span>
                        <span style={{ fontSize: '12.5px', fontWeight: 700, color: tema.acentoOscuro, textDecoration: 'underline' }}>
                          {urg.personaAsignada}
                        </span>
                      </div>
                    </div>

                    {/* Selector rápido para actualizar estado */}
                    <select
                      value={urg.estado}
                      onChange={(e) => cambiarEstadoUrgencia(urg.id, e.target.value as any)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 700,
                        border: `1px solid ${colores.borde}`,
                        background: colores.fondoSecundario,
                        color: colores.textoClaro,
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="en_proceso">En Proceso</option>
                      <option value="solucionado">Solucionada</option>
                    </select>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* CONTENIDO PESTAÑA 2: ASUNTOS DE PREDICTIBILIDAD */}
      {activeTab === 'predictivos' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ 
            background: colores.fondoPrincipal, 
            border: `1px solid ${colores.borde}`, 
            borderRadius: '16px', 
            padding: '16px 20px', 
            boxShadow: colores.sombra,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: colores.textoClaro }}>
                Monitoreo Predictivo Logístico
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '13px', color: colores.textoMedio }}>
                Fallas anticipadas antes de ocurrir. Haz clic en "Contactar cliente" para prevenir incidencias críticas.
              </p>
            </div>
            <span style={{ fontSize: '11.5px', fontWeight: 800, background: `${colorSeveridad.atencion}20`, color: colorSeveridad.atencion, padding: '4px 10px', borderRadius: '8px' }}>
              {predictivosList.length} Predictivos en Vigilancia
            </span>
          </div>

          {/* Listado de casos predictivos */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '18px' }}>
            {predictivosList.map((pred) => {
              const colorRiesgo = colorSeveridad[pred.riesgo];
              return (
                <div 
                  key={pred.id}
                  style={{ 
                    background: colores.fondoPrincipal, 
                    border: `1px solid ${colores.borde}`, 
                    borderRadius: '18px', 
                    padding: '20px', 
                    boxShadow: colores.sombra,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '14px',
                    position: 'relative'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: colores.textoOscuro }}>{pred.id}</span>
                      <span style={{ 
                        fontSize: '11px', 
                        fontWeight: 800, 
                        color: colorRiesgo, 
                        background: `${colorRiesgo}1A`, 
                        padding: '3px 9px', 
                        borderRadius: '6px' 
                      }}>
                        Probabilidad Falla: {pred.probabilidadFalla}%
                      </span>
                    </div>

                    <h3 style={{ margin: '0 0 2px', fontSize: '16px', fontWeight: 800, color: colores.textoClaro }}>
                      {pred.cliente}
                    </h3>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: tema.acentoOscuro, display: 'block', marginBottom: '8px' }}>
                      Sistema: {pred.sistema}
                    </span>

                    <div style={{ 
                      background: `linear-gradient(120deg, ${tema.acentoSuave}, ${colores.fondoSecundario})`, 
                      borderLeft: `3px solid ${tema.acentoOscuro}`, 
                      padding: '10px 12px', 
                      borderRadius: '8px', 
                      fontSize: '12px',
                      color: colores.textoClaro,
                      lineHeight: 1.4
                    }}>
                      <strong>Recomendación IA:</strong> {pred.recomendacionIA}
                    </div>
                  </div>

                  {/* Métricas predictivas */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(3, 1fr)', 
                    gap: '8px', 
                    background: colores.fondoSecundario, 
                    padding: '10px 12px', 
                    borderRadius: '10px',
                    border: `1px solid ${colores.borde}`
                  }}>
                    <div>
                      <span style={{ fontSize: '9px', color: colores.textoOscuro, textTransform: 'uppercase', fontWeight: 700 }}>Downtime Evitado</span>
                      <p style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: colores.exito }}>{pred.downtimeEvitado}</p>
                    </div>

                    <div>
                      <span style={{ fontSize: '9px', color: colores.textoOscuro, textTransform: 'uppercase', fontWeight: 700 }}>ETA Preventivo</span>
                      <p style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: colores.textoClaro }}>{pred.etaPreventivo} min</p>
                    </div>

                    <div>
                      <span style={{ fontSize: '9px', color: colores.textoOscuro, textTransform: 'uppercase', fontWeight: 700 }}>Costo Estimado</span>
                      <p style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: colores.textoClaro }}>${pred.costoEstimado.toLocaleString('es-MX')}</p>
                    </div>
                  </div>

                  {/* Persona asignada y BOTÓN "CONTACTAR CLIENTE" */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    paddingTop: '8px', 
                    borderTop: `1px solid ${colores.borde}` 
                  }}>
                    <div 
                      onClick={() => onNavigateToRendimiento?.(pred.personaAsignada)}
                      title={`Ver Ficha de Rendimiento de ${pred.personaAsignada}`}
                      style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                    >
                      <UserCheck size={14} color={tema.acentoOscuro} />
                      <span style={{ fontSize: '11.5px', fontWeight: 700, color: tema.acentoOscuro, textDecoration: 'underline' }}>
                        {pred.personaAsignada}
                      </span>
                    </div>


                    {/* BOTÓN REQUERIDO POR EL USUARIO */}
                    <button
                      onClick={() => { setModalContacto(pred); setMensajeContactoEnviado(false); }}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '9px',
                        border: 'none',
                        background: colorSeveridad.critico,
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: `0 3px 8px ${colorSeveridad.critico}40`
                      }}
                    >
                      <MessageSquare size={13} /> Contactar cliente
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* CONTENIDO PESTAÑA 3: CASOS ABIERTOS (MOTOR DE BÚSQUEDA Y REQUISICIONES ACTUAL) */}
      {activeTab === 'casos_abiertos' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* ESCENARIOS PRECONFIGURADOS */}
          <div style={{ 
            background: colores.fondoPrincipal, 
            border: `1px solid ${colores.borde}`, 
            borderRadius: '18px', 
            padding: '18px 20px', 
            boxShadow: colores.sombra
          }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 700, color: colores.textoOscuro, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Simular escenarios y eventos de prueba
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {ESCENARIOS.map(esc => {
                const isSelected = selectedEscenario === esc.id;
                return (
                  <button
                    key={esc.id}
                    onClick={() => aplicarEscenario(esc.id)}
                    style={{
                      padding: '9px 15px',
                      borderRadius: '10px',
                      border: `1px solid ${isSelected ? tema.acento : colores.borde}`,
                      background: isSelected ? tema.acentoSuave : colores.fondoSecundario,
                      color: isSelected ? tema.acentoOscuro : colores.textoClaro,
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    {esc.nombre}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RENDER PHASE DEL MOTOR DE BÚSQUEDA IA */}
          {phase === 'input' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              
              {/* FORMULARIO DE REQUISICIÓN */}
              <div style={{ 
                background: colores.fondoPrincipal, 
                border: `1px solid ${colores.borde}`, 
                borderRadius: '18px', 
                padding: '24px', 
                boxShadow: colores.sombra,
                display: 'flex',
                flexDirection: 'column',
                gap: '18px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: colores.textoClaro }}>
                    Recepción del Requerimiento
                  </h3>
                  <span style={{ fontSize: '11px', color: colores.textoOscuro, background: colores.fondoTerciario, padding: '2px 8px', borderRadius: '5px' }}>
                    Simulador BESCO
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12.5px', fontWeight: 600, color: colores.textoMedio }}>Asociar Cliente / Inmueble</label>
                  <select 
                    value={cliente}
                    onChange={e => setCliente(e.target.value)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: `1px solid ${colores.borde}`,
                      background: colores.fondoSecundario,
                      color: colores.textoClaro,
                      outline: 'none',
                      fontSize: '14px'
                    }}
                  >
                    <option value="Torre Reforma">Torre Reforma (CDMX)</option>
                    <option value="C.C. Santa Fe">C.C. Santa Fe (CDMX)</option>
                    <option value="Corporativo Monterrey">Corporativo Monterrey (MTY)</option>
                    <option value="Polanco 04">Polanco 04 (CDMX)</option>
                    <option value="Plaza Celaya">Plaza Celaya (GTO)</option>
                    <option value="Plaza Querétaro">Plaza Querétaro (QRO)</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12.5px', fontWeight: 600, color: colores.textoMedio }}>Falla o Necesidad Reportada</label>
                  <textarea
                    value={problema}
                    onChange={e => setProblema(e.target.value)}
                    rows={3}
                    placeholder="Escribe la falla reportada (ej: Mi cortina no cierra...)"
                    style={{
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: `1px solid ${colores.borde}`,
                      background: colores.fondoSecundario,
                      color: colores.textoClaro,
                      outline: 'none',
                      fontSize: '13.5px',
                      resize: 'none',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12.5px', fontWeight: 600, color: colores.textoMedio }}>Nivel de Urgencia Operativa</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {(['ok', 'atencion', 'critico'] as const).map(u => {
                      const active = urgencia === u;
                      const label = u === 'critico' ? 'Crítico (Naranja)' : u === 'atencion' ? 'Atención (Ámbar)' : 'Informativo (Verde)';
                      const color = colorSeveridad[u];
                      return (
                        <button
                          key={u}
                          type="button"
                          onClick={() => setUrgencia(u)}
                          style={{
                            flex: 1,
                            padding: '8px 10px',
                            borderRadius: '8px',
                            border: `1.5px solid ${active ? color : colores.borde}`,
                            background: active ? `${color}1A` : 'transparent',
                            color: active ? color : colores.textoMedio,
                            fontSize: '11.5px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.15s',
                            textAlign: 'center'
                          }}
                        >
                          {label.split(' ')[0]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <hr style={{ border: 'none', borderTop: `1px solid ${colores.borde}`, margin: '6px 0' }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button
                    onClick={iniciarAnalisis}
                    style={{
                      padding: '12px',
                      borderRadius: '10px',
                      border: 'none',
                      background: tema.acento,
                      color: tema.sobreAcento,
                      fontWeight: 700,
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: `0 4px 12px ${tema.acento}38`
                    }}
                  >
                    <Sparkles size={16} /> Optimizar con {ia.nombre}
                  </button>

                  <button
                    onClick={simularLecturaOracle}
                    disabled={cargandoOracle}
                    style={{
                      padding: '10px',
                      borderRadius: '10px',
                      border: `1.5px dashed ${colores.bordeHover}`,
                      background: 'transparent',
                      color: colores.textoClaro,
                      fontWeight: 600,
                      fontSize: '13px',
                      cursor: cargandoOracle ? 'default' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <RefreshCw size={14} className={cargandoOracle ? 'animate-spin' : ''} />
                    {cargandoOracle ? 'Conectando con Oracle ERP...' : 'Leer requisición desde Oracle ERP'}
                  </button>
                </div>
              </div>

              {/* MOTOR EXPLICACIÓN */}
              <div style={{ 
                background: colores.fondoPrincipal, 
                border: `1px solid ${colores.borde}`, 
                borderRadius: '18px', 
                padding: '24px', 
                boxShadow: colores.sombra,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 700, color: colores.textoClaro }}>
                    ¿Cómo funciona el motor logístico?
                  </h3>
                  <p style={{ fontSize: '13.5px', color: colores.textoMedio, lineHeight: 1.5, marginBottom: '14px' }}>
                    La optimización inteligente de BESCO no solo compara el <strong>precio</strong> del proveedor. Ante una urgencia, evalúa en paralelo:
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <div style={{ width: 28, height: 28, borderRadius: '6px', background: `${colores.peligro}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Clock size={14} color={colores.peligro} />
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: colores.textoClaro }}>Tiempo Estimado de Arribo (ETA)</h4>
                        <p style={{ margin: 0, fontSize: '12px', color: colores.textoOscuro }}>Calculado en base a distancia vial y velocidad de despacho del taller.</p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <div style={{ width: 28, height: 28, borderRadius: '6px', background: `${tema.acento}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Truck size={14} color={tema.acentoOscuro} />
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: colores.textoClaro }}>Costo Logístico de Traslado</h4>
                        <p style={{ margin: 0, fontSize: '12px', color: colores.textoOscuro }}>Suma del combustible, peajes y tarifa de transporte por km de distancia.</p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <div style={{ width: 28, height: 28, borderRadius: '6px', background: `${colores.exito}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <CheckCircle size={14} color={colores.exito} />
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: colores.textoClaro }}>Inventario y Calidad Técnica</h4>
                        <p style={{ margin: 0, fontSize: '12px', color: colores.textoOscuro }}>Disponibilidad física de refacciones con el calibre y certificación requeridos.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ 
                  background: colores.fondoSecundario, 
                  padding: '14px', 
                  borderRadius: '12px', 
                  borderLeft: `3px solid ${tema.acento}`,
                  marginTop: '18px'
                }}>
                  <p style={{ margin: 0, fontSize: '12.5px', color: colores.textoMedio, fontStyle: 'italic', lineHeight: 1.4 }}>
                    "Para requerimientos críticos, la prioridad de la Operación de BESCO prevalece sobre Compras para evitar paros de planta o riesgos de protección civil."
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* PHASE ANALYZING (loader) */}
          {phase === 'analyzing' && (
            <div style={{ 
              background: colores.fondoPrincipal, 
              border: `1px solid ${colores.borde}`, 
              borderRadius: '18px', 
              padding: '40px 20px', 
              boxShadow: colores.sombra,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '340px'
            }}>
              <div style={{ position: 'relative', marginBottom: '24px' }}>
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '50%', 
                  border: `3px solid ${colores.fondoTerciario}`,
                  borderTopColor: tema.acento,
                  animation: 'spin 1s linear infinite'
                }} />
                <Cpu size={32} color={tema.acentoOscuro} style={{ position: 'absolute', top: '24px', left: '24px' }} />
              </div>

              <h2 style={{ margin: '0 0 8px', fontSize: '20px', fontWeight: 800, color: colores.textoClaro }}>
                Análisis de Abastecimiento en Proceso
              </h2>
              <p style={{ margin: '0 0 30px', fontSize: '14px', color: colores.textoMedio, maxWidth: '400px' }}>
                {ia.nombre} está evaluando la red de proveedores registrados para la solicitud de <strong>{cliente}</strong>.
              </p>

              <div style={{ 
                width: '100%', 
                maxWidth: '460px', 
                background: colores.fondoSecundario, 
                borderRadius: '14px', 
                padding: '16px 20px',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                {steps.map((step, idx) => {
                  const done = analysisStep > idx;
                  const active = analysisStep === idx;
                  return (
                    <div key={idx} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px',
                      opacity: done ? 1 : active ? 1 : 0.4,
                      transition: 'opacity 0.2s'
                    }}>
                      {done ? (
                        <CheckCircle size={16} color={colores.exito} />
                      ) : active ? (
                        <RefreshCw size={14} color={tema.acentoOscuro} className="animate-spin" />
                      ) : (
                        <div style={{ width: 14, height: 14, borderRadius: '50%', border: `1.5px solid ${colores.textoOscuro}` }} />
                      )}
                      <span style={{ 
                        fontSize: '13px', 
                        fontWeight: active ? '700' : '500', 
                        color: active ? tema.acentoOscuro : colores.textoClaro 
                      }}>
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* PHASE RESULTS */}
          {phase === 'result' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div style={{ 
                background: colores.fondoPrincipal, 
                border: `1px solid ${colores.borde}`, 
                borderRadius: '18px', 
                padding: '18px 24px', 
                boxShadow: colores.sombra,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: tema.acentoOscuro, background: tema.acentoSuave, padding: '3px 8px', borderRadius: '5px' }}>
                    Optimización Completada
                  </span>
                  <h2 style={{ margin: '4px 0 0', fontSize: '18px', fontWeight: 800, color: colores.textoClaro }}>
                    Requerimiento: {problema.substring(0, 70)}{problema.length > 70 ? '...' : ''}
                  </h2>
                  <p style={{ margin: 0, fontSize: '13px', color: colores.textoMedio }}>
                    Cliente: <strong>{cliente}</strong> | Nivel de urgencia: <strong style={{ color: colorSeveridad[urgencia] }}>{urgencia.toUpperCase()}</strong>
                  </p>
                </div>

                <button
                  onClick={() => { setPhase('input'); setAprobado(false); }}
                  style={{
                    padding: '9px 15px',
                    borderRadius: '10px',
                    border: `1px solid ${colores.borde}`,
                    background: colores.fondoPrincipal,
                    color: colores.textoClaro,
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <RefreshCw size={14} /> Nueva Simulación
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px' }}>
                
                {/* PROVEEDORES COMPARATIVA (IZQUIERDA) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* RECOMENDADO CARD */}
                  <div style={{ 
                    background: colores.fondoPrincipal, 
                    border: `2px solid ${tema.acento}`, 
                    borderRadius: '18px', 
                    padding: '24px', 
                    boxShadow: colores.sombraGrande,
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      position: 'absolute', 
                      top: 0, 
                      right: 0, 
                      background: tema.acento, 
                      color: tema.sobreAcento, 
                      padding: '5px 16px', 
                      borderBottomLeftRadius: '14px',
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Sparkles size={11} /> RECOMENDADO IA
                    </div>

                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '14px' }}>
                      <div style={{ width: 44, height: 44, borderRadius: '12px', background: tema.acentoSuave, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Truck size={22} color={tema.acentoOscuro} />
                      </div>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: colores.textoClaro }}>
                          {recomendado.nombre}
                        </h3>
                        <span style={{ fontSize: '11.5px', color: colores.textoOscuro }}>Proveedor Homologado BESCO</span>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '18px' }}>
                      <div style={{ background: colores.fondoSecundario, padding: '10px', borderRadius: '10px' }}>
                        <span style={{ fontSize: '10px', color: colores.textoOscuro, textTransform: 'uppercase' }}>Costo Total</span>
                        <p style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: colores.textoClaro }}>${recomendado.precio.toLocaleString('es-MX')}</p>
                      </div>
                      <div style={{ background: colores.fondoSecundario, padding: '10px', borderRadius: '10px' }}>
                        <span style={{ fontSize: '10px', color: colores.textoOscuro, textTransform: 'uppercase' }}>ETA</span>
                        <p style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: colorSeveridad[urgencia] }}>{recomendado.eta} min</p>
                      </div>
                      <div style={{ background: colores.fondoSecundario, padding: '10px', borderRadius: '10px' }}>
                        <span style={{ fontSize: '10px', color: colores.textoOscuro, textTransform: 'uppercase' }}>Distancia</span>
                        <p style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: colores.textoClaro }}>{recomendado.distancia} km</p>
                      </div>
                      <div style={{ background: colores.fondoSecundario, padding: '10px', borderRadius: '10px' }}>
                        <span style={{ fontSize: '10px', color: colores.textoOscuro, textTransform: 'uppercase' }}>Calidad</span>
                        <p style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: colores.textoClaro }}>{recomendado.calidad}</p>
                      </div>
                    </div>

                    <div style={{ 
                      background: `linear-gradient(120deg, ${tema.acentoSuave}, ${colores.fondoSecundario})`, 
                      borderLeft: `4px solid ${tema.acentoOscuro}`,
                      borderRadius: '8px', 
                      padding: '12px 14px',
                      fontSize: '13.5px',
                      color: colores.textoClaro,
                      lineHeight: 1.45
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', fontSize: '11px', fontWeight: 700, color: tema.acentoOscuro, textTransform: 'uppercase' }}>
                        <Sparkles size={12} /> Justificación del Algoritmo
                      </div>
                      {recomendado.recomendacion}
                    </div>
                  </div>

                  {/* OTRAS ALTERNATIVAS */}
                  <div style={{ 
                    background: colores.fondoPrincipal, 
                    border: `1px solid ${colores.borde}`, 
                    borderRadius: '18px', 
                    padding: '20px', 
                    boxShadow: colores.sombra
                  }}>
                    <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 700, color: colores.textoClaro }}>
                      Otras Alternativas Evaluadas
                    </h4>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {alternativas.map((alt, i) => (
                        <div key={i} style={{ 
                          background: colores.fondoSecundario, 
                          borderRadius: '12px', 
                          padding: '14px', 
                          border: `1px solid ${colores.borde}`,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '12px'
                        }}>
                          <div style={{ flex: 1 }}>
                            <h5 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: colores.textoClaro }}>{alt.nombre}</h5>
                            <p style={{ margin: '2px 0 0', fontSize: '12px', color: colores.textoMedio }}>
                              Precio: <strong>${alt.precio.toLocaleString('es-MX')}</strong> | ETA: <strong>{alt.eta} min</strong> | Distancia: <strong>{alt.distancia} km</strong> | Calidad: <strong>{alt.calidad}</strong>
                            </p>
                          </div>
                          
                          <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <span style={{ 
                              fontSize: '11px', 
                              fontWeight: 700, 
                              color: alt.precio > recomendado.precio ? colores.peligro : colores.exito,
                              background: alt.precio > recomendado.precio ? `${colores.peligro}10` : `${colores.exito}10`,
                              padding: '4px 8px',
                              borderRadius: '6px'
                            }}>
                              {alt.precio > recomendado.precio 
                                ? `+${Math.round(((alt.precio - recomendado.precio)/recomendado.precio)*100)}% costo`
                                : `-${Math.round(((recomendado.precio - alt.precio)/recomendado.precio)*100)}% costo`
                              }
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* DETALLE LOGÍSTICO Y AUTORIZACIÓN (DERECHA) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  <div style={{ 
                    background: colores.fondoPrincipal, 
                    border: `1px solid ${colores.borde}`, 
                    borderRadius: '18px', 
                    padding: '20px', 
                    boxShadow: colores.sombra
                  }}>
                    <h4 style={{ margin: '0 0 10px', fontSize: '14px', fontWeight: 700, color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Truck size={16} color={tema.acentoOscuro} /> Optimización Logística
                    </h4>
                    <p style={{ margin: 0, fontSize: '13px', color: colores.textoMedio, lineHeight: 1.5 }}>
                      {decisionLogistica}
                    </p>
                  </div>

                  <div style={{ 
                    background: colores.fondoPrincipal, 
                    border: `1px solid ${colores.borde}`, 
                    borderRadius: '18px', 
                    padding: '20px', 
                    boxShadow: colores.sombra,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px'
                  }}>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: colores.textoClaro }}>
                      Acciones de Autorización
                    </h4>

                    {!aprobado ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <p style={{ margin: 0, fontSize: '12.5px', color: colores.textoMedio }}>
                          Elige tu rol para simular la confirmación e iniciar notificaciones de WhatsApp.
                        </p>
                        
                        <button
                          onClick={() => simularNotificaciones('operacion')}
                          style={{
                            padding: '11px',
                            borderRadius: '10px',
                            border: 'none',
                            background: colorSeveridad.critico,
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: '13px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px'
                          }}
                        >
                          <PlayCircle size={15} /> [Operación] Despacho de Urgencia
                        </button>

                        <button
                          onClick={() => simularNotificaciones('compras')}
                          style={{
                            padding: '11px',
                            borderRadius: '10px',
                            border: `1px solid ${colores.borde}`,
                            background: colores.fondoPrincipal,
                            color: colores.textoClaro,
                            fontWeight: 600,
                            fontSize: '13px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px'
                          }}
                        >
                          <CheckCircle size={15} color={colores.exito} /> [Compras] Autorizar Compra
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '8px', 
                          background: `${colores.exito}1A`, 
                          padding: '8px 12px', 
                          borderRadius: '8px',
                          color: colores.exito,
                          fontSize: '13px',
                          fontWeight: 700
                        }}>
                          <Check size={16} /> Requerimiento Autorizado por {notifRole.toUpperCase()}
                        </div>

                        <div style={{ 
                          background: '#ECE5DD',
                          borderRadius: '12px', 
                          border: `1px solid ${colores.borde}`,
                          overflow: 'hidden',
                          display: 'flex',
                          flexDirection: 'column'
                        }}>
                          <div style={{ background: '#075E54', color: '#fff', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#fff', color: '#075E54', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800 }}>B</div>
                            <div>
                              <p style={{ margin: 0, fontSize: '12px', fontWeight: 700 }}>Canal de Notificaciones BESCO</p>
                              <p style={{ margin: 0, fontSize: '9px', opacity: 0.8 }}>simulación activa</p>
                            </div>
                          </div>

                          <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
                            {notificacionesChat.map((msg, i) => (
                              <div key={i} style={{ 
                                alignSelf: msg.sender === 'ia' || msg.sender === 'oracle' ? 'center' : 'flex-start',
                                background: msg.sender === 'ia' || msg.sender === 'oracle' ? '#128C7E' : '#fff', 
                                color: msg.sender === 'ia' || msg.sender === 'oracle' ? '#fff' : '#333', 
                                padding: '6px 10px', 
                                borderRadius: '8px', 
                                fontSize: '11px',
                                maxWidth: '90%'
                              }}>
                                {msg.text}
                              </div>
                            ))}
                            {typing && (
                              <div style={{ alignSelf: 'flex-start', background: '#fff', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', color: '#999' }}>
                                Escribiendo notificación...
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                </div>

              </div>

            </div>
          )}

        </div>
      )}

      {/* MODAL "CONTACTAR CLIENTE" PARA ASUNTOS DE PREDICTIBILIDAD */}
      {modalContacto && (
        <div 
          onClick={() => setModalContacto(null)}
          style={{ 
            position: 'fixed', 
            inset: 0, 
            zIndex: 4000, 
            background: 'rgba(0,0,0,0.6)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '20px' 
          }}
        >
          <div 
            onClick={e => e.stopPropagation()}
            style={{ 
              width: '100%', 
              maxWidth: '520px', 
              background: colores.fondoPrincipal, 
              borderRadius: '20px', 
              padding: '24px', 
              boxShadow: colores.sombraGrande,
              position: 'relative',
              border: `1px solid ${colores.borde}`
            }}
          >
            <button 
              onClick={() => setModalContacto(null)}
              style={{ position: 'absolute', top: '18px', right: '18px', border: 'none', background: 'transparent', cursor: 'pointer', color: colores.textoOscuro }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: 44, height: 44, borderRadius: '12px', background: `${colorSeveridad.critico}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldAlert size={22} color={colorSeveridad.critico} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: colores.textoClaro }}>
                  Contactar Cliente · Alerta Predictiva
                </h3>
                <span style={{ fontSize: '12px', color: colores.textoMedio }}>
                  {modalContacto.cliente}
                </span>
              </div>
            </div>

            <div style={{ background: colores.fondoSecundario, padding: '14px', borderRadius: '12px', marginBottom: '16px', border: `1px solid ${colores.borde}` }}>
              <div style={{ fontSize: '11px', color: colores.textoOscuro, fontWeight: 700, textTransform: 'uppercase' }}>Detalles del Contacto</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: colores.textoClaro, marginTop: '2px' }}>{modalContacto.contactoCliente}</div>
              <div style={{ fontSize: '12px', color: tema.acentoOscuro, fontWeight: 700, marginTop: '2px' }}>Teléfono: {modalContacto.telefonoCliente}</div>
              <div style={{ fontSize: '12px', color: colores.textoMedio, marginTop: '6px' }}>
                <strong>Sistema afectado:</strong> {modalContacto.sistema} ({modalContacto.probabilidadFalla}% de riesgo)
              </div>
            </div>

            {/* Plantilla de Mensaje Preconfigurado */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '18px' }}>
              <label style={{ fontSize: '12.5px', fontWeight: 700, color: colores.textoClaro }}>Mensaje de Asesoría Preventiva (IA)</label>
              <textarea
                readOnly
                rows={4}
                value={`Hola ${modalContacto.contactoCliente}, MAYIA de BESCO detectó un riesgo predictivo del ${modalContacto.probabilidadFalla}% en ${modalContacto.sistema}. Para evitar un downtime estimado de ${modalContacto.downtimeEvitado}, el Ing. ${modalContacto.personaAsignada} sugiere programar un mantenimiento preventivo (ETA ${modalContacto.etaPreventivo} min).`}
                style={{
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: `1px solid ${colores.borde}`,
                  background: colores.fondoSecundario,
                  color: colores.textoClaro,
                  fontSize: '12.5px',
                  resize: 'none',
                  lineHeight: 1.4
                }}
              />
            </div>

            {mensajeContactoEnviado ? (
              <div style={{ 
                background: `${colores.exito}1A`, 
                color: colores.exito, 
                padding: '12px', 
                borderRadius: '10px', 
                textAlign: 'center',
                fontWeight: 700,
                fontSize: '13.5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}>
                <Check size={18} /> ¡Mensaje enviado con éxito al cliente por WhatsApp y Correo!
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setMensajeContactoEnviado(true)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '10px',
                    border: 'none',
                    background: '#25D366', // WhatsApp green
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Send size={15} /> WhatsApp
                </button>

                <button
                  onClick={() => setMensajeContactoEnviado(true)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '10px',
                    border: `1px solid ${colores.borde}`,
                    background: colores.fondoSecundario,
                    color: colores.textoClaro,
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Mail size={15} /> Correo
                </button>

                <button
                  onClick={() => alert(`Iniciando llamada directa a ${modalContacto.telefonoCliente}...`)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: `1px solid ${colores.borde}`,
                    background: colores.fondoPrincipal,
                    color: colores.textoClaro,
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Phone size={15} />
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
