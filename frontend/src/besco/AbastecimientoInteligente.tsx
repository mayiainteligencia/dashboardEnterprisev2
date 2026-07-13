import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Cpu, Clock, Truck, DollarSign, AlertCircle, CheckCircle, 
  MessageSquare, Plus, RefreshCw, Play, ArrowRight, Check, PlayCircle, AlertTriangle
} from 'lucide-react';
import { brandingConfig, type TemaBesco } from '../config/branding';
import { type Modo, colorSeveridad } from './bescoData';

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
        eta: 1440, // 24h
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
  },
  {
    id: 'reposicion_material',
    nombre: 'Reposición de Material (No Urgente)',
    descripcion: 'Solicitud ordinaria de consumibles. Se prioriza el costo mínimo.',
    cliente: 'C.C. Santa Fe',
    problema: 'Reabastecimiento de 20 focos LED y 5 botes de aceite lubricante para bodega general.',
    urgencia: 'ok',
    decisionLogistica: 'Al ser una solicitud de bajo impacto (reposición no urgente), se desestima la velocidad de entrega y se prioriza 100% el precio de adquisición y costo logístico de envío.',
    proveedores: [
      {
        nombre: 'Suministros Industriales MX',
        precio: 4200,
        eta: 1440, // 24h
        distancia: 45,
        calidad: 'Estándar',
        stock: 'Disponible',
        trasladoCosto: 200,
        recomendacion: 'Recomendada. Ofrece el precio de paquete más bajo del mercado. El ETA de 24 horas es aceptable para esta prioridad.'
      },
      {
        nombre: 'Ferretería Express Santa Fe',
        precio: 6800,
        eta: 15,
        distancia: 1,
        calidad: 'Estándar',
        stock: 'Disponible',
        trasladoCosto: 50,
        recomendacion: 'Entrega casi inmediata, pero cobra un sobreprecio alto por ser tienda de conveniencia local.'
      },
      {
        nombre: 'Lubricantes y Eléctricos Poniente',
        precio: 5000,
        eta: 180,
        distancia: 15,
        calidad: 'Alta',
        stock: 'Disponible',
        trasladoCosto: 250,
        recomendacion: 'Precio intermedio, calidad industrial alta, pero innecesaria para el mantenimiento general estándar.'
      }
    ]
  },
  {
    id: 'solicitudes_simultaneas',
    nombre: '5 Solicitudes Simultáneas (Operación CDMX)',
    descripcion: 'Peticiones simultáneas de refacciones. Optimización de lote o pool.',
    cliente: 'Polanco 04',
    problema: 'Se acumularon 5 requerimientos: aire acondicionado ruidoso, fuga menor de agua, bisagra de puerta floja, pintura dañada y foco fundido.',
    urgencia: 'atencion',
    decisionLogistica: 'MAYIA evalúa si contratar proveedores independientes para cada tarea o consolidar en un solo proveedor multiservicios que reduzca los traslados individuales de $150 a un solo cobro general.',
    proveedores: [
      {
        nombre: 'Multiservicios Integrados de la CDMX',
        precio: 15500,
        eta: 60,
        distancia: 6,
        calidad: 'Alta',
        stock: 'Inmediato',
        trasladoCosto: 300,
        recomendacion: 'Recomendado. Envía una cuadrilla multi-disciplinaria con todas las refacciones. Ahorra 30% en costos de traslado individuales.'
      },
      {
        nombre: 'Pool de Técnicos Independientes (Suma)',
        precio: 22000,
        eta: 120,
        distancia: 25,
        calidad: 'Estándar',
        stock: 'Disponible',
        trasladoCosto: 750,
        recomendacion: 'La suma de 5 técnicos independientes genera 5 costos de traslado separados y problemas de coordinación en sitio.'
      },
      {
        nombre: 'Mantenimiento Express CDMX',
        precio: 19000,
        eta: 45,
        distancia: 4,
        calidad: 'Estándar',
        stock: 'Disponible',
        trasladoCosto: 400,
        recomendacion: 'Entrega rápida de servicios, pero carecen de técnico electricista en el mismo turno.'
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

export const AbastecimientoInteligente: React.FC<{ tema: TemaBesco; modo: Modo }> = ({ tema, modo }) => {
  const [selectedEscenario, setSelectedEscenario] = useState<string>('');
  
  // Form State
  const [cliente, setCliente] = useState('Torre Reforma');
  const [problema, setProblema] = useState('La puerta principal de cristal templado está rota.');
  const [urgencia, setUrgencia] = useState<'critico' | 'atencion' | 'ok'>('critico');
  const [cargandoOracle, setCargandoOracle] = useState(false);

  // Flow State
  const [phase, setPhase] = useState<'input' | 'analyzing' | 'result'>('input');
  
  // Analysis Step Index (for loader simulation)
  const [analysisStep, setAnalysisStep] = useState(0);
  const steps = [
    'Identificando tipo de producto/servicio solicitado...',
    'Escaneando catálogo de proveedores registrados...',
    'Evaluando disponibilidad de stock físico...',
    'Calculando costos de traslado y ETA en tiempo real...',
    'Optimizando matriz de decisión de IA (Tiempo vs Costo)...'
  ];

  // Selected/Generated Provider Results
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [decisionLogistica, setDecisionLogistica] = useState('');
  
  // Notifications State
  const [aprobado, setAprobado] = useState(false);
  const [notifRole, setNotifRole] = useState<'operacion' | 'compras' | 'cliente'>('operacion');
  const [notificacionesChat, setNotificacionesChat] = useState<{ sender: 'ia' | 'cliente' | 'proveedor' | 'oracle'; text: string; time: string }[]>([]);
  const [typing, setTyping] = useState(false);

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
      
      // Auto-generate providers based on variables
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

  // Trigger analysis simulation
  const iniciarAnalisis = () => {
    // If no custom scenario was loaded, build default providers on the fly
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
          recomendacion: 'Recomendado. Proporciona el balance óptimo entre calidad técnica de BESCO y costo logístico.'
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

  // Handle analyzer steps timer
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

  // Simulates WhatsApp & Oracle notification log sequence
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

  // Find Recommended Provider
  const recomendado = proveedores.find(p => p.recomendacion.toLowerCase().includes('recomendad') || p.recomendacion.toLowerCase().includes('recomendado')) ?? proveedores[0];
  const alternativas = proveedores.filter(p => p !== recomendado);

  return (
    <div style={{ maxWidth: '1200px', animation: 'fadeIn 0.3s ease-out' }}>
      
      {/* CABECERA */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
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
            <Cpu size={22} color={tema.sobreAcento} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: colores.textoClaro, letterSpacing: '-0.3px' }}>
              Optimización de Abastecimiento de Urgencia (IA)
            </h1>
            <p style={{ margin: 0, fontSize: '14.5px', color: colores.textoMedio }}>
              Módulo inteligente de asignación logística de proveedores en tiempo real por {ia.nombre}.
            </p>
          </div>
        </div>
      </div>

      {/* ESCENARIOS PRECONFIGURADOS */}
      <div style={{ 
        background: colores.fondoPrincipal, 
        border: `1px solid ${colores.borde}`, 
        borderRadius: '18px', 
        padding: '18px 20px', 
        boxShadow: colores.sombra,
        marginBottom: '20px'
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

      {/* RENDER PHASE */}
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

            {/* CLiente */}
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

            {/* Problema */}
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

            {/* Urgencia */}
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

            {/* Botones de acción */}
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
                  gap: '8px',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={e => { if(!cargandoOracle) e.currentTarget.style.backgroundColor = colores.fondoSecundario; }}
                onMouseLeave={e => { if(!cargandoOracle) e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <RefreshCw size={14} className={cargandoOracle ? 'animate-spin' : ''} />
                {cargandoOracle ? 'Conectando con Oracle ERP...' : 'Leer requisición desde Oracle ERP'}
              </button>
            </div>
          </div>

          {/* EXPLICACION Y VALORES EN TIEMPO REAL */}
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

          {/* Steps log */}
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
          
          {/* HEADER RESUMEN RESULTADO */}
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

                {/* KPI Grid */}
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

                {/* IA Reason */}
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
                      
                      {/* Cost diff Badge */}
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
                        <p style={{ margin: '4px 0 0', fontSize: '11px', color: colores.textoOscuro }}>
                          ETA: {alt.eta > recomendado.eta ? `+${alt.eta - recomendado.eta} min` : `${alt.eta - recomendado.eta} min`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* DETALLE LOGISTICO Y ACCIONES (DERECHA) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* DETALLE LOGISTICO LOG */}
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

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  background: `${colores.exito}12`, 
                  borderRadius: '10px', 
                  padding: '10px 12px',
                  marginTop: '12px'
                }}>
                  <span style={{ fontSize: '12.5px', color: colores.exito, fontWeight: 700 }}>Ahorro estimado en adquisición:</span>
                  <span style={{ fontSize: '14.5px', color: colores.exito, fontWeight: 800 }}>
                    ${Math.round(recomendado.precio * 0.25).toLocaleString('es-MX')} MXN
                  </span>
                </div>
              </div>

              {/* PANEL DE ACCIONES & NOTIFICACIONES SIMULADAS */}
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

                    {/* WHATSAPP CHAT SIMULATOR */}
                    <div style={{ 
                      background: '#ECE5DD', // Fondo verde claro de WhatsApp
                      borderRadius: '12px', 
                      border: `1px solid ${colores.borde}`,
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      {/* Whatsapp header */}
                      <div style={{ background: '#075E54', color: '#fff', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#fff', color: '#075E54', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800 }}>B</div>
                        <div>
                          <p style={{ margin: 0, fontSize: '12px', fontWeight: 700 }}>Canal de Notificaciones BESCO</p>
                          <p style={{ margin: 0, fontSize: '9px', opacity: 0.8 }}>simulación activa</p>
                        </div>
                      </div>

                      {/* Whatsapp content */}
                      <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
                        {notificacionesChat.map((msg, i) => {
                          const isIA = msg.sender === 'ia';
                          const isERP = msg.sender === 'oracle';
                          
                          if (isIA || isERP) {
                            return (
                              <div key={i} style={{ 
                                alignSelf: 'center', 
                                background: '#128C7E', 
                                color: '#fff', 
                                padding: '4px 10px', 
                                borderRadius: '8px', 
                                fontSize: '10.5px',
                                textShadow: '0 1px 1px rgba(0,0,0,0.2)',
                                maxWidth: '90%'
                              }}>
                                {msg.text}
                              </div>
                            );
                          }
                          
                          return (
                            <div key={i} style={{ 
                              alignSelf: 'flex-start',
                              background: '#fff', 
                              color: '#333',
                              padding: '8px 10px', 
                              borderRadius: '8px', 
                              fontSize: '11.5px',
                              maxWidth: '85%',
                              boxShadow: '0 1px 1px rgba(0,0,0,0.1)'
                            }}>
                              {msg.text}
                              <div style={{ textAlign: 'right', fontSize: '8px', color: '#999', marginTop: '2px' }}>{msg.time}</div>
                            </div>
                          );
                        })}
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

      {/* RETAIN GRAPHICS STYLE / EXTRA KPIS */}
      <div style={{ marginTop: '28px' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 700, color: colores.textoClaro }}>
          Estadísticas de Asignaciones IA
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div style={{ background: colores.fondoPrincipal, border: `1px solid ${colores.borde}`, borderRadius: '16px', padding: '16px 20px', boxShadow: colores.sombra }}>
            <span style={{ fontSize: '11px', color: colores.textoOscuro, textTransform: 'uppercase' }}>Eficiencia Operativa</span>
            <p style={{ margin: '4px 0 0', fontSize: '24px', fontWeight: 800, color: tema.acentoOscuro }}>+35% rapidez</p>
            <div style={{ height: '6px', background: colores.fondoTerciario, borderRadius: '3px', marginTop: '10px', position: 'relative' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '85%', background: tema.acento, borderRadius: '3px' }} />
            </div>
          </div>
          
          <div style={{ background: colores.fondoPrincipal, border: `1px solid ${colores.borde}`, borderRadius: '16px', padding: '16px 20px', boxShadow: colores.sombra }}>
            <span style={{ fontSize: '11px', color: colores.textoOscuro, textTransform: 'uppercase' }}>Costo de Arrastre Evitado</span>
            <p style={{ margin: '4px 0 0', fontSize: '24px', fontWeight: 800, color: colores.exito }}>$84,200 MXN</p>
            <div style={{ height: '6px', background: colores.fondoTerciario, borderRadius: '3px', marginTop: '10px', position: 'relative' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '70%', background: colores.exito, borderRadius: '3px' }} />
            </div>
          </div>

          <div style={{ background: colores.fondoPrincipal, border: `1px solid ${colores.borde}`, borderRadius: '16px', padding: '16px 20px', boxShadow: colores.sombra }}>
            <span style={{ fontSize: '11px', color: colores.textoOscuro, textTransform: 'uppercase' }}>SLA Cumplido en Urgencia</span>
            <p style={{ margin: '4px 0 0', fontSize: '24px', fontWeight: 800, color: colores.textoClaro }}>98.2% global</p>
            <div style={{ height: '6px', background: colores.fondoTerciario, borderRadius: '3px', marginTop: '10px', position: 'relative' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '98%', background: '#374151', borderRadius: '3px' }} />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
