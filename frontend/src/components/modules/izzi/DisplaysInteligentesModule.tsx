import React, { useState, useEffect } from 'react';
import {
  Camera, Shield, Users, UserCheck, Clock,
  Sparkles, DollarSign, Activity, Scan, ShieldAlert,
  Radio, Crosshair, Wifi
} from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

const { colores } = brandingConfig;

interface Camara {
  id: string;
  nombre: string;
  ubicacion: string;
  status: 'online' | 'warning' | 'offline';
  fps: number;
  personalPresente: number;
  personalEsperado: number;
  clientesEnEspera: number;
  tiempoEsperaMedio: string;
  demografia: { genero: { mas: number; fem: number }; edades: { r18_25: number; r26_40: number; r41_60: number; r60mas: number } };
  ventasDetectadasHoy: number;
  scoreLimpieza: number;
  alertasSeguridad: number;
  feedUrlText: string;
}

export const DisplaysInteligentesModule: React.FC = () => {
  const [activeCamId, setActiveCamId] = useState<string>('cam-1');
  const [filterOverlay, setFilterOverlay] = useState<{
    demografia: boolean;
    seguridad: boolean;
    limpieza: boolean;
    ventas: boolean;
  }>({
    demografia: true,
    seguridad: true,
    limpieza: true,
    ventas: true,
  });

  const [timeString, setTimeString] = useState<string>('');
  const [, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      setTimeString(d.toLocaleTimeString('es-MX'));
      setTick(t => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const camaras: Camara[] = [
    {
      id: 'cam-1',
      nombre: 'Cámara 01 · Isla Central Santa Fe',
      ubicacion: 'Centro Comercial Santa Fe (Nivel 2)',
      status: 'online',
      fps: 60,
      personalPresente: 4,
      personalEsperado: 4,
      clientesEnEspera: 2,
      tiempoEsperaMedio: '2.4 min',
      demografia: { genero: { mas: 48, fem: 52 }, edades: { r18_25: 22, r26_40: 54, r41_60: 18, r60mas: 6 } },
      ventasDetectadasHoy: 16,
      scoreLimpieza: 98,
      alertasSeguridad: 0,
      feedUrlText: 'LIVE FEED · ISLA SANTA FE · CAM-01',
    },
    {
      id: 'cam-2',
      nombre: 'Cámara 02 · Centro izzi Galerías Monterrey',
      ubicacion: 'Galerías Monterrey (Acceso Principal)',
      status: 'warning',
      fps: 30,
      personalPresente: 3,
      personalEsperado: 3,
      clientesEnEspera: 4,
      tiempoEsperaMedio: '3.8 min',
      demografia: { genero: { mas: 55, fem: 45 }, edades: { r18_25: 18, r26_40: 48, r41_60: 24, r60mas: 10 } },
      ventasDetectadasHoy: 12,
      scoreLimpieza: 88,
      alertasSeguridad: 1,
      feedUrlText: 'LIVE FEED · MONTERREY · CAM-02',
    },
    {
      id: 'cam-3',
      nombre: 'Cámara 03 · Centro de Atención izzi Perisur',
      ubicacion: 'Plaza Perisur (Planta Baja)',
      status: 'online',
      fps: 60,
      personalPresente: 6,
      personalEsperado: 6,
      clientesEnEspera: 1,
      tiempoEsperaMedio: '1.8 min',
      demografia: { genero: { mas: 42, fem: 58 }, edades: { r18_25: 30, r26_40: 50, r41_60: 15, r60mas: 5 } },
      ventasDetectadasHoy: 24,
      scoreLimpieza: 100,
      alertasSeguridad: 0,
      feedUrlText: 'LIVE FEED · STORE PERISUR · CAM-03',
    },
    {
      id: 'cam-4',
      nombre: 'Cámara 04 · Isla Plaza Satélite',
      ubicacion: 'Plaza Satélite (Nivel 1)',
      status: 'online',
      fps: 60,
      personalPresente: 3,
      personalEsperado: 3,
      clientesEnEspera: 3,
      tiempoEsperaMedio: '3.1 min',
      demografia: { genero: { mas: 50, fem: 50 }, edades: { r18_25: 25, r26_40: 48, r41_60: 20, r60mas: 7 } },
      ventasDetectadasHoy: 14,
      scoreLimpieza: 94,
      alertasSeguridad: 0,
      feedUrlText: 'LIVE FEED · SATÉLITE · CAM-04',
    },
  ];

  const camActual = camaras.find(c => c.id === activeCamId) || camaras[0];

  const eventosVivo = [
    { id: 'ev-1', hora: 'Hace 15 seg', cam: camActual.nombre, tipo: 'Venta Detectada', desc: 'Firma digital de contrato izzi Triple Play 100 Mbps con izzi tv+ en tablet', icon: DollarSign, color: '#10B981' },
    { id: 'ev-2', hora: 'Hace 1 min', cam: camActual.nombre, tipo: 'Demografía Registrada', desc: 'Cliente Femenino (32-35 años) - Permanencia 3.4 min en demo izzi tv+', icon: Users, color: '#E3067A' },
    { id: 'ev-3', hora: 'Hace 3 min', cam: camActual.nombre, tipo: 'Verificación Limpieza', desc: 'Mostrador 1 inspeccionado por IA: 98% Libre de residuos', icon: Sparkles, color: '#0090D0' },
    { id: 'ev-4', hora: 'Hace 5 min', cam: camActual.nombre, tipo: 'Control de Asistencia', desc: 'Presentismo 100%: ejecutivos activos con gafete visible', icon: UserCheck, color: '#53267E' },
    { id: 'ev-5', hora: 'Hace 8 min', cam: camActual.nombre, tipo: 'Seguridad Operativa', desc: 'Zona tras mostrador despejada sin objetos anómalos', icon: Shield, color: '#FF6C07' },
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#FFFFFF', minHeight: '100%', borderRadius: '16px' }}>
      {/* ── Encabezado Principal ── */}
      <div className="animate-slide-up" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: '800', color: colores.primario, margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #E3067A22, #53267E11)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid #E3067A30'
            }}>
              <Camera size={22} color="#E3067A" />
            </div>
            Displays Inteligentes · Monitoreo IA Multicámara izzi
          </h2>
          <p style={{ fontSize: '13px', color: colores.textoMedio, marginTop: '6px', lineHeight: 1.5 }}>
            Sistema integral de visión computacional para supervisar asistencia de personal, seguridad física, tiempo de atención, perfil de audiencia (edad/género), detección de ventas y estandarización de limpieza en puntos izzi.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            backgroundColor: '#EEF6E7', color: '#10B981', padding: '8px 16px',
            borderRadius: '20px', fontSize: '12px', fontWeight: '700',
            border: '1px solid #C5E2B3'
          }}>
            <span className="live-dot live-dot-green" style={{ width: '8px', height: '8px' }} />
            Monitoreo Activo · {camaras.length} Cámaras HD
          </div>
        </div>
      </div>

      {/* ── Selector de Cámaras en Vivo ── */}
      <div className="animate-slide-up delay-1" style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '24px' }}>
        {camaras.map((cam) => {
          const isActive = cam.id === activeCamId;
          return (
            <button
              key={cam.id}
              onClick={() => setActiveCamId(cam.id)}
              className="card-hover"
              style={{
                flex: '1', minWidth: '220px', padding: '14px 16px', borderRadius: '14px',
                border: isActive ? `2px solid #E3067A` : `1px solid ${colores.borde}`,
                backgroundColor: isActive ? '#FDEAF2' : '#FAFAFA',
                textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: isActive ? '0 4px 16px rgba(227,6,122,0.18)' : 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: isActive ? '#E3067A' : colores.textoMedio, display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Radio size={12} color={isActive ? '#E3067A' : '#888'} />
                  {cam.id.toUpperCase()}
                </span>
                <span style={{
                  fontSize: '10px', fontWeight: '800', padding: '2px 6px', borderRadius: '6px',
                  backgroundColor: cam.status === 'online' ? '#EEF6E7' : '#FFF0E6',
                  color: cam.status === 'online' ? '#10B981' : '#FF6C07'
                }}>
                  {cam.status === 'online' ? 'LIVE' : 'ALERT'}
                </span>
              </div>
              <div style={{ fontSize: '13px', fontWeight: '800', color: colores.textoClaro, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {cam.nombre}
              </div>
              <div style={{ fontSize: '11px', color: colores.textoMedio, marginTop: '2px' }}>
                Asistencia: <strong>{cam.personalPresente}/{cam.personalEsperado}</strong> · Ventas: <strong>{cam.ventasDetectadasHoy}</strong>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Strip de Métricas en Tiempo Real de la Cámara Seleccionada ── */}
      <div className="animate-slide-up delay-2" style={{
        display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px', marginBottom: '24px'
      }}>
        {/* 1. Asistencia */}
        <div style={{ backgroundColor: '#FDF7FA', border: '1px solid #F8D8E6', borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '10px', fontWeight: '800', color: '#E3067A', textTransform: 'uppercase', marginBottom: '4px' }}>
            <UserCheck size={13} /> Presentismo
          </div>
          <div style={{ fontSize: '20px', fontWeight: '900', color: '#E3067A' }}>
            {camActual.personalPresente}/{camActual.personalEsperado}
          </div>
          <div style={{ fontSize: '10px', color: '#E3067A', fontWeight: '600', marginTop: '2px' }}>
            {camActual.personalPresente === camActual.personalEsperado ? '100% Cobertura' : 'Ausencia Detección'}
          </div>
        </div>

        {/* 2. Seguridad */}
        <div style={{ backgroundColor: camActual.alertasSeguridad > 0 ? '#FFF0E6' : '#FAFAFA', border: `1px solid ${camActual.alertasSeguridad > 0 ? '#FCD3B8' : colores.borde}`, borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '10px', fontWeight: '800', color: camActual.alertasSeguridad > 0 ? '#FF6C07' : colores.textoMedio, textTransform: 'uppercase', marginBottom: '4px' }}>
            <Shield size={13} /> Seguridad
          </div>
          <div style={{ fontSize: '20px', fontWeight: '900', color: camActual.alertasSeguridad > 0 ? '#FF6C07' : '#10B981' }}>
            {camActual.alertasSeguridad > 0 ? `${camActual.alertasSeguridad} Alerta` : 'Sin Riesgos'}
          </div>
          <div style={{ fontSize: '10px', color: colores.textoMedio, fontWeight: '600', marginTop: '2px' }}>
            Zona Protegida
          </div>
        </div>

        {/* 3. Atención al Cliente */}
        <div style={{ backgroundColor: '#E6F4FB', border: '1px solid #BCE3F7', borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '10px', fontWeight: '800', color: '#0090D0', textTransform: 'uppercase', marginBottom: '4px' }}>
            <Clock size={13} /> Espera Cliente
          </div>
          <div style={{ fontSize: '20px', fontWeight: '900', color: '#0090D0' }}>
            {camActual.tiempoEsperaMedio}
          </div>
          <div style={{ fontSize: '10px', color: '#0090D0', fontWeight: '600', marginTop: '2px' }}>
            {camActual.clientesEnEspera} en fila activa
          </div>
        </div>

        {/* 4. Demografía */}
        <div style={{ backgroundColor: '#FDF7FA', border: '1px solid #F8D8E6', borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '10px', fontWeight: '800', color: '#E3067A', textTransform: 'uppercase', marginBottom: '4px' }}>
            <Users size={13} /> Audiencia
          </div>
          <div style={{ fontSize: '20px', fontWeight: '900', color: '#E3067A' }}>
            {camActual.demografia.genero.fem}% F / {camActual.demografia.genero.mas}% M
          </div>
          <div style={{ fontSize: '10px', color: '#E3067A', fontWeight: '600', marginTop: '2px' }}>
            Segmento: 26-40 yrs ({camActual.demografia.edades.r26_40}%)
          </div>
        </div>

        {/* 5. Detección de Ventas */}
        <div style={{ backgroundColor: '#EEF6E7', border: '1px solid #C5E2B3', borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '10px', fontWeight: '800', color: '#10B981', textTransform: 'uppercase', marginBottom: '4px' }}>
            <DollarSign size={13} /> Ventas IA
          </div>
          <div style={{ fontSize: '20px', fontWeight: '900', color: '#10B981' }}>
            {camActual.ventasDetectadasHoy}
          </div>
          <div style={{ fontSize: '10px', color: '#10B981', fontWeight: '600', marginTop: '2px' }}>
            Confirmadas por postura
          </div>
        </div>

        {/* 6. Limpieza */}
        <div style={{ backgroundColor: '#F4EEF9', border: '1px solid #E1D2EE', borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '10px', fontWeight: '800', color: '#53267E', textTransform: 'uppercase', marginBottom: '4px' }}>
            <Sparkles size={13} /> Limpieza
          </div>
          <div style={{ fontSize: '20px', fontWeight: '900', color: '#53267E' }}>
            {camActual.scoreLimpieza}%
          </div>
          <div style={{ fontSize: '10px', color: '#53267E', fontWeight: '600', marginTop: '2px' }}>
            Higiene de Mostrador
          </div>
        </div>
      </div>

      {/* ── Sección Principal: Feed de Video CCTV / Analítica ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '20px', marginBottom: '24px' }}>

        {/* LADO IZQUIERDO: Feed */}
        <div className="animate-slide-up delay-3" style={{
          backgroundColor: '#0F172A', borderRadius: '18px', padding: '16px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.3)', border: '1px solid #1E293B',
          position: 'relative', overflow: 'hidden'
        }}>
          {/* Header del Feed */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22C55E', animation: 'pulse-ring 1.5s infinite' }} />
              <span style={{ fontSize: '13px', fontWeight: '800', color: '#F8FAFC', letterSpacing: '0.05em' }}>
                {camActual.feedUrlText}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', color: '#94A3B8', fontWeight: '600' }}>
              <span>FPS: {camActual.fps}</span>
              <span>1080p HD</span>
              <span style={{ color: '#F8FAFC', backgroundColor: '#1E293B', padding: '2px 8px', borderRadius: '6px' }}>{timeString}</span>
            </div>
          </div>

          {/* Canvas / Animated CCTV Camera Feed Container */}
          <div style={{
            height: '400px', borderRadius: '14px',
            background: 'radial-gradient(ellipse at center, #0F172A 0%, #030712 100%)',
            position: 'relative', overflow: 'hidden', border: '1px solid #334155',
            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '16px'
          }}>
            {/* Inline CSS Keyframe Animations for CCTV simulation */}
            <style>{`
              @keyframes cctvScanLine {
                0% { top: 2%; opacity: 0.8; }
                50% { opacity: 0.3; }
                100% { top: 96%; opacity: 0.8; }
              }
              @keyframes radarRotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              @keyframes recBlink {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.25; transform: scale(0.9); }
              }
              @keyframes targetPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.015); }
              }
              @keyframes pulseRing {
                0% { transform: scale(0.8); opacity: 0.8; }
                100% { transform: scale(1.8); opacity: 0; }
              }
            `}</style>

            {/* Simulated 3D Floor Grid Background */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'linear-gradient(to right, rgba(56, 189, 248, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.04) 1px, transparent 1px)',
              backgroundSize: '48px 48px', pointerEvents: 'none'
            }} />

            {/* Perspective Store Floor Geometry Lines */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.15 }}>
              <line x1="0" y1="400" x2="350" y2="180" stroke="#38BDF8" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="800" y1="400" x2="450" y2="180" stroke="#38BDF8" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="350" y1="180" x2="450" y2="180" stroke="#38BDF8" strokeWidth="1" />
              <circle cx="400" cy="180" r="40" fill="none" stroke="#38BDF8" strokeWidth="1" strokeDasharray="2 3" />
            </svg>

            {/* Central Optical Crosshair */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: '80px', height: '80px', pointerEvents: 'none', opacity: 0.35,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <div style={{ position: 'absolute', width: '100%', height: '1px', backgroundColor: '#38BDF8' }} />
              <div style={{ position: 'absolute', height: '100%', width: '1px', backgroundColor: '#38BDF8' }} />
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #38BDF8' }} />
            </div>

            {/* Continuous Vertical Scanning Laser Line */}
            <div style={{
              position: 'absolute', left: 0, right: 0, height: '2px',
              background: 'linear-gradient(90deg, transparent 0%, #0090D0 25%, #E3067A 50%, #0090D0 75%, transparent 100%)',
              boxShadow: '0 0 12px #0090D0, 0 0 20px #E3067A',
              pointerEvents: 'none',
              animation: 'cctvScanLine 4s ease-in-out infinite alternate',
              zIndex: 8
            }} />

            {/* AI OVERLAY: 1. Seguridad / Asistencia & Presentismo */}
            {filterOverlay.seguridad && (
              <div style={{
                position: 'absolute',
                top: camActual.id === 'cam-2' ? '20%' : camActual.id === 'cam-3' ? '18%' : '16%',
                left: camActual.id === 'cam-2' ? '18%' : camActual.id === 'cam-3' ? '12%' : '14%',
                width: '145px', height: '190px',
                border: '1.5px solid #53267E', borderRadius: '8px',
                backgroundColor: 'rgba(83, 38, 126, 0.12)',
                boxShadow: '0 0 18px rgba(83, 38, 126, 0.4)',
                padding: '8px', fontSize: '10px', color: '#FFFFFF', fontWeight: '700',
                animation: 'targetPulse 3s ease-in-out infinite',
                zIndex: 6
              }}>
                {/* Corner Brackets */}
                <div style={{ position: 'absolute', top: -3, left: -3, width: '8px', height: '8px', borderTop: '3px solid #A855F7', borderLeft: '3px solid #A855F7' }} />
                <div style={{ position: 'absolute', top: -3, right: -3, width: '8px', height: '8px', borderTop: '3px solid #A855F7', borderRight: '3px solid #A855F7' }} />
                <div style={{ position: 'absolute', bottom: -3, left: -3, width: '8px', height: '8px', borderBottom: '3px solid #A855F7', borderLeft: '3px solid #A855F7' }} />
                <div style={{ position: 'absolute', bottom: -3, right: -3, width: '8px', height: '8px', borderBottom: '3px solid #A855F7', borderRight: '3px solid #A855F7' }} />

                <div style={{ backgroundColor: '#53267E', padding: '3px 7px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '9.5px', letterSpacing: '0.03em' }}>
                  <UserCheck size={11} /> Ejecutivo izzi #{camActual.id === 'cam-1' ? '104' : camActual.id === 'cam-2' ? '208' : camActual.id === 'cam-3' ? '315' : '402'}
                </div>
                <div style={{ marginTop: '6px', color: '#E2E8F0', fontSize: '9px', lineHeight: '1.4' }}>
                  • Presentismo: <span style={{ color: '#10B981', fontWeight: '800' }}>OK (Turno Activo)</span><br />
                  • Uniforme izzi: <span style={{ color: '#10B981' }}>100%</span><br />
                  • Gafete: <span style={{ color: '#38BDF8' }}>Visible</span><br />
                  • Postura: <span style={{ color: '#FCD116' }}>Atención en Mostrador</span>
                </div>
                {/* Skeleton joint dots animation */}
                <div style={{ position: 'absolute', top: '35%', left: '46%', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#A855F7', boxShadow: '0 0 6px #A855F7' }} />
                <div style={{ position: 'absolute', top: '55%', left: '32%', width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#A855F7' }} />
                <div style={{ position: 'absolute', top: '55%', right: '32%', width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#A855F7' }} />
              </div>
            )}

            {/* AI OVERLAY: 2. Demografía (Edad/Género) */}
            {filterOverlay.demografia && (
              <div style={{
                position: 'absolute',
                top: camActual.id === 'cam-2' ? '22%' : '20%',
                left: camActual.id === 'cam-2' ? '46%' : camActual.id === 'cam-3' ? '50%' : '44%',
                width: '150px', height: '185px',
                border: '1.5px solid #E3067A', borderRadius: '8px',
                backgroundColor: 'rgba(227, 6, 122, 0.12)',
                boxShadow: '0 0 18px rgba(227, 6, 122, 0.4)',
                padding: '8px', fontSize: '10px', color: '#FFFFFF', fontWeight: '700',
                animation: 'targetPulse 3.5s ease-in-out infinite',
                zIndex: 6
              }}>
                {/* Corner Brackets */}
                <div style={{ position: 'absolute', top: -3, left: -3, width: '8px', height: '8px', borderTop: '3px solid #F43F5E', borderLeft: '3px solid #F43F5E' }} />
                <div style={{ position: 'absolute', top: -3, right: -3, width: '8px', height: '8px', borderTop: '3px solid #F43F5E', borderRight: '3px solid #F43F5E' }} />
                <div style={{ position: 'absolute', bottom: -3, left: -3, width: '8px', height: '8px', borderBottom: '3px solid #F43F5E', borderLeft: '3px solid #F43F5E' }} />
                <div style={{ position: 'absolute', bottom: -3, right: -3, width: '8px', height: '8px', borderBottom: '3px solid #F43F5E', borderRight: '3px solid #F43F5E' }} />

                <div style={{ backgroundColor: '#E3067A', padding: '3px 7px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '9.5px' }}>
                  <Users size={11} /> Cliente · {camActual.id === 'cam-2' ? 'M (28-32 yrs)' : 'F (32-35 yrs)'}
                </div>
                <div style={{ marginTop: '6px', color: '#E2E8F0', fontSize: '9px', lineHeight: '1.4' }}>
                  • Estado: <span style={{ color: '#38BDF8' }}>Interacción Activa</span><br />
                  • Interés: <span style={{ color: '#FCD116' }}>{camActual.id === 'cam-4' ? 'izzi móvil' : 'izzi tv+ & Residencial'}</span><br />
                  • Satisfacción: <span style={{ color: '#10B981', fontWeight: '800' }}>94% Positiva</span><br />
                  • Permanencia: <span style={{ color: '#F8FAFC' }}>{camActual.tiempoEsperaMedio}</span>
                </div>
                {/* Face recognition mesh box */}
                <div style={{
                  position: 'absolute', top: '16px', right: '8px', width: '28px', height: '28px',
                  border: '1px dashed #E3067A', borderRadius: '4px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', color: '#E3067A'
                }}>
                  <Scan size={16} color="#E3067A" />
                </div>
              </div>
            )}

            {/* AI OVERLAY: 3. Detección de Ventas IA */}
            {filterOverlay.ventas && (
              <div style={{
                position: 'absolute',
                top: '52%',
                left: camActual.id === 'cam-2' ? '34%' : camActual.id === 'cam-3' ? '36%' : '32%',
                width: '210px', height: '110px',
                border: '2px dashed #10B981', borderRadius: '10px',
                backgroundColor: 'rgba(16, 185, 129, 0.14)',
                boxShadow: '0 0 20px rgba(16, 185, 129, 0.45)',
                padding: '8px 10px', fontSize: '10px', color: '#FFFFFF', fontWeight: '700',
                zIndex: 7
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ backgroundColor: '#10B981', color: '#0F172A', padding: '2px 8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '9.5px', fontWeight: '900' }}>
                    <DollarSign size={11} /> ⚡ DETECCIÓN DE VENTA IA
                  </div>
                  <span style={{ fontSize: '9px', color: '#10B981', fontWeight: '800' }}>98.4% CONF</span>
                </div>
                <div style={{ marginTop: '6px', color: '#E2E8F0', fontSize: '9px', lineHeight: '1.4' }}>
                  • Gesto: <span style={{ color: '#38BDF8' }}>Firma Digital en Tablet POS</span><br />
                  • Paquete: <span style={{ color: '#FCD116' }}>{camActual.id === 'cam-4' ? 'izzi móvil Ilimitado' : 'izzi tv+ 100 Mbps Doble Play'}</span><br />
                  • Registro CRM: <span style={{ color: '#10B981' }}>Enviado a App izzi</span>
                </div>
              </div>
            )}

            {/* AI OVERLAY: 4. Inspección de Limpieza */}
            {filterOverlay.limpieza && (
              <div style={{
                position: 'absolute',
                bottom: '8%',
                right: '8%',
                width: '180px', height: '95px',
                border: '1.5px solid #0090D0', borderRadius: '8px',
                backgroundColor: 'rgba(0, 144, 208, 0.14)',
                boxShadow: '0 0 16px rgba(0, 144, 208, 0.4)',
                padding: '8px', fontSize: '10px', color: '#FFFFFF', fontWeight: '700',
                zIndex: 6
              }}>
                <div style={{ backgroundColor: '#0090D0', color: '#FFFFFF', padding: '3px 7px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '9px', fontWeight: '900' }}>
                  <Sparkles size={11} /> Mostrador · Limpieza {camActual.scoreLimpieza}%
                </div>
                <div style={{ marginTop: '6px', color: '#E2E8F0', fontSize: '9px', lineHeight: '1.3' }}>
                  • Pantallas izzi tv+: <span style={{ color: '#10B981' }}>Encendidas OK</span><br />
                  • Superficie Mostrador: <span style={{ color: '#10B981' }}>Sin Obstrucciones</span><br />
                  • Folletería izzi: <span style={{ color: '#38BDF8' }}>Alineada</span>
                </div>
              </div>
            )}

            {/* Overlay Watermark HUD Superior */}
            <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', pointerEvents: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', padding: '5px 10px', borderRadius: '6px',
                  border: '1px solid #334155', color: '#EF4444', fontSize: '10px', fontWeight: '800', letterSpacing: '0.05em'
                }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444', animation: 'recBlink 1.2s infinite' }} />
                  REC · LIVE CCTV FEED
                </div>
                <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', padding: '5px 10px', borderRadius: '6px', border: '1px solid #334155', color: '#94A3B8', fontSize: '10px', fontWeight: '600' }}>
                  H.265 · 4.8 Mb/s · ISO 400
                </div>
              </div>

              {/* Mini Radar Visualizer */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  border: '1px solid #0090D0', backgroundColor: 'rgba(0, 144, 208, 0.1)',
                  position: 'relative', overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'conic-gradient(from 0deg, rgba(0, 144, 208, 0.6) 0deg, transparent 90deg, transparent 360deg)',
                    animation: 'radarRotate 2s linear infinite'
                  }} />
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#E3067A' }} />
                  <div style={{ position: 'absolute', top: '30%', left: '60%', width: '3px', height: '3px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                </div>
                <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', padding: '5px 10px', borderRadius: '6px', border: '1px solid #334155', color: '#38BDF8', fontSize: '10px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Scan size={13} /> Pose + Retail Tracking Activo
                </div>
              </div>
            </div>

            {/* Overlay Watermark HUD Inferior */}
            <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', pointerEvents: 'none' }}>
              <div style={{ color: '#E2E8F0', fontSize: '11px', fontWeight: '600', backgroundColor: 'rgba(15, 23, 42, 0.9)', padding: '5px 12px', borderRadius: '6px', border: '1px solid #334155' }}>
                Ubicación: <strong style={{ color: '#38BDF8' }}>{camActual.ubicacion}</strong> · {camActual.personalPresente} Ejecutivos · {camActual.clientesEnEspera} Clientes
              </div>
              <div style={{ color: '#94A3B8', fontSize: '10px', fontWeight: '600', backgroundColor: 'rgba(15, 23, 42, 0.9)', padding: '5px 12px', borderRadius: '6px', border: '1px solid #334155' }}>
                izzi Computer Vision Engine v4.2
              </div>
            </div>
          </div>

          {/* Filtros de Overlay de Inteligencia Artificial */}
          <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #334155', paddingTop: '12px' }}>
            <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '700' }}>Capas de Visión Artificial:</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setFilterOverlay(f => ({ ...f, seguridad: !f.seguridad }))}
                style={{
                  padding: '6px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: '700',
                  backgroundColor: filterOverlay.seguridad ? '#53267E' : '#1E293B', color: filterOverlay.seguridad ? '#FFFFFF' : '#94A3B8'
                }}
              >
                👤 Asistencia & Presentismo
              </button>
              <button
                onClick={() => setFilterOverlay(f => ({ ...f, demografia: !f.demografia }))}
                style={{
                  padding: '6px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: '700',
                  backgroundColor: filterOverlay.demografia ? '#E3067A' : '#1E293B', color: filterOverlay.demografia ? '#FFFFFF' : '#94A3B8'
                }}
              >
                📊 Demografía (Edad/Género)
              </button>
              <button
                onClick={() => setFilterOverlay(f => ({ ...f, ventas: !f.ventas }))}
                style={{
                  padding: '6px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: '700',
                  backgroundColor: filterOverlay.ventas ? '#10B981' : '#1E293B', color: filterOverlay.ventas ? '#FFFFFF' : '#94A3B8'
                }}
              >
                ⚡ Detección de Ventas
              </button>
              <button
                onClick={() => setFilterOverlay(f => ({ ...f, limpieza: !f.limpieza }))}
                style={{
                  padding: '6px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: '700',
                  backgroundColor: filterOverlay.limpieza ? '#0090D0' : '#1E293B', color: filterOverlay.limpieza ? '#FFFFFF' : '#94A3B8'
                }}
              >
                ✨ Inspección Limpieza
              </button>
            </div>
          </div>
        </div>

        {/* LADO DERECHO: Demografía & Bitácora */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Panel Demográfico */}
          <div className="animate-slide-up delay-4" style={{
            backgroundColor: '#FFFFFF', border: `1px solid ${colores.borde}`,
            borderRadius: '16px', padding: '18px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
          }}>
            <h3 style={{ fontSize: '14px', fontWeight: '800', color: colores.primario, margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={16} color="#E3067A" /> Perfil Demográfico Detectado
            </h3>

            {/* Género */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '700', color: colores.textoMedio, marginBottom: '6px' }}>
                <span>Distribución por Género</span>
                <span>{camActual.demografia.genero.fem}% Femenino · {camActual.demografia.genero.mas}% Masculino</span>
              </div>
              <div style={{ height: '8px', borderRadius: '99px', backgroundColor: '#E2E8F0', overflow: 'hidden', display: 'flex' }}>
                <div style={{ width: `${camActual.demografia.genero.fem}%`, backgroundColor: '#E3067A', transition: 'width 0.8s' }} />
                <div style={{ width: `${camActual.demografia.genero.mas}%`, backgroundColor: '#0090D0', transition: 'width 0.8s' }} />
              </div>
            </div>

            {/* Rangos de Edad */}
            <div style={{ fontSize: '11px', fontWeight: '700', color: colores.textoMedio, marginBottom: '8px' }}>
              Rangos de Edad Estimados por Algoritmo:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', textAlign: 'center' }}>
              <div style={{ backgroundColor: '#FAFAFA', border: `1px solid ${colores.borde}`, padding: '8px 4px', borderRadius: '8px' }}>
                <div style={{ fontSize: '9px', color: colores.textoMedio, fontWeight: '600' }}>18-25 yrs</div>
                <div style={{ fontSize: '14px', fontWeight: '900', color: '#53267E', marginTop: '2px' }}>{camActual.demografia.edades.r18_25}%</div>
              </div>
              <div style={{ backgroundColor: '#FDEAF2', border: '1px solid #FACADA', padding: '8px 4px', borderRadius: '8px' }}>
                <div style={{ fontSize: '9px', color: '#E3067A', fontWeight: '700' }}>26-40 yrs</div>
                <div style={{ fontSize: '14px', fontWeight: '900', color: '#E3067A', marginTop: '2px' }}>{camActual.demografia.edades.r26_40}%</div>
              </div>
              <div style={{ backgroundColor: '#FAFAFA', border: `1px solid ${colores.borde}`, padding: '8px 4px', borderRadius: '8px' }}>
                <div style={{ fontSize: '9px', color: colores.textoMedio, fontWeight: '600' }}>41-60 yrs</div>
                <div style={{ fontSize: '14px', fontWeight: '900', color: '#FF6C07', marginTop: '2px' }}>{camActual.demografia.edades.r41_60}%</div>
              </div>
              <div style={{ backgroundColor: '#FAFAFA', border: `1px solid ${colores.borde}`, padding: '8px 4px', borderRadius: '8px' }}>
                <div style={{ fontSize: '9px', color: colores.textoMedio, fontWeight: '600' }}>60+ yrs</div>
                <div style={{ fontSize: '14px', fontWeight: '900', color: '#0090D0', marginTop: '2px' }}>{camActual.demografia.edades.r60mas}%</div>
              </div>
            </div>
          </div>

          {/* Stream de Eventos en Vivo */}
          <div className="animate-slide-up delay-5" style={{
            backgroundColor: '#FFFFFF', border: `1px solid ${colores.borde}`,
            borderRadius: '16px', padding: '18px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', flex: 1,
            display: 'flex', flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '800', color: colores.primario, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={16} color="#E3067A" /> Bitácora de Visión IA en Vivo
              </h3>
              <span style={{ fontSize: '10px', color: '#10B981', fontWeight: '700', backgroundColor: '#EEF6E7', padding: '2px 8px', borderRadius: '6px' }}>
                Live Stream
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', maxHeight: '200px' }} className="styled-scroll">
              {eventosVivo.map((ev) => {
                const IconComp = ev.icon;
                return (
                  <div
                    key={ev.id}
                    style={{
                      padding: '10px 12px', borderRadius: '10px', backgroundColor: '#FAFAFA',
                      border: `1px solid ${colores.borde}`, borderLeft: `4px solid ${ev.color}`,
                      display: 'flex', alignItems: 'flex-start', gap: '10px'
                    }}
                  >
                    <div style={{
                      width: '26px', height: '26px', borderRadius: '7px',
                      backgroundColor: `${ev.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, marginTop: '2px'
                    }}>
                      <IconComp size={14} color={ev.color} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                        <span style={{ fontSize: '12px', fontWeight: '800', color: colores.textoClaro }}>{ev.tipo}</span>
                        <span style={{ fontSize: '10px', color: colores.textoMedio, fontWeight: '600' }}>{ev.hora}</span>
                      </div>
                      <div style={{ fontSize: '11px', color: colores.textoMedio, lineHeight: 1.3 }}>
                        {ev.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* ── Grid Inferior: Módulos Especializados ── */}
      <div className="animate-slide-up delay-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>

        {/* 1. Asistencia de Personal */}
        <div style={{ border: `1px solid ${colores.borde}`, borderRadius: '16px', padding: '18px', backgroundColor: '#FFFFFF', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', backgroundColor: '#53267E15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserCheck size={18} color="#53267E" />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '800', color: colores.textoClaro }}>Asistencia & Presentismo</div>
              <div style={{ fontSize: '11px', color: colores.textoMedio }}>Supervisión de Turno y Gafete</div>
            </div>
          </div>
          <p style={{ fontSize: '12px', color: colores.textoMedio, lineHeight: 1.5, marginBottom: '12px' }}>
            Reconocimiento facial consentido y detección de postura para registrar automáticamente la entrada, salida y tiempo efectivo de atención en mostrador de ejecutivos izzi.
          </p>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#53267E', backgroundColor: '#F4EEF9', padding: '6px 10px', borderRadius: '8px' }}>
            ● 4 de 4 Ejecutivos en posición activa (100%)
          </div>
        </div>

        {/* 2. Seguridad & Control de Pérdidas */}
        <div style={{ border: `1px solid ${colores.borde}`, borderRadius: '16px', padding: '18px', backgroundColor: '#FFFFFF', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', backgroundColor: '#E3067A15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldAlert size={18} color="#E3067A" />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '800', color: colores.textoClaro }}>Seguridad & Perímetro</div>
              <div style={{ fontSize: '11px', color: colores.textoMedio }}>Protección de Activos e Intrusión</div>
            </div>
          </div>
          <p style={{ fontSize: '12px', color: colores.textoMedio, lineHeight: 1.5, marginBottom: '12px' }}>
            Alertas inmediatas si una persona no autorizada accede a la zona trasera del mostrador, si se olvida un objeto/mochila o si un display inteligente de izzi tv+ es manipulado sin permiso.
          </p>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#E3067A', backgroundColor: '#FDF7FA', padding: '6px 10px', borderRadius: '8px' }}>
            ● Zona Trasera Protegida · Perímetro Seguro
          </div>
        </div>

        {/* 3. Detección de Ventas en Vivo */}
        <div style={{ border: `1px solid ${colores.borde}`, borderRadius: '16px', padding: '18px', backgroundColor: '#FFFFFF', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', backgroundColor: '#10B98115', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DollarSign size={18} color="#10B981" />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '800', color: colores.textoClaro }}>Detección de Ventas IA</div>
              <div style={{ fontSize: '11px', color: colores.textoMedio }}>Reconocimiento de Cierre Comercial</div>
            </div>
          </div>
          <p style={{ fontSize: '12px', color: colores.textoMedio, lineHeight: 1.5, marginBottom: '12px' }}>
            Visión artificial capacitada para clasificar momentos clave de venta: entrega de folletos, firma digital en tablet de contratación y entrega del decodificador izzi tv+.
          </p>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#10B981', backgroundColor: '#EEF6E7', padding: '6px 10px', borderRadius: '8px' }}>
            ● {camActual.ventasDetectadasHoy} Ventas registradas por cámara hoy
          </div>
        </div>

        {/* 4. Inspección de Limpieza */}
        <div style={{ border: `1px solid ${colores.borde}`, borderRadius: '16px', padding: '18px', backgroundColor: '#FFFFFF', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', backgroundColor: '#0090D015', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={18} color="#0090D0" />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '800', color: colores.textoClaro }}>Limpieza & Estado Físico</div>
              <div style={{ fontSize: '11px', color: colores.textoMedio }}>Estandarización de Mostrador</div>
            </div>
          </div>
          <p style={{ fontSize: '12px', color: colores.textoMedio, lineHeight: 1.5, marginBottom: '12px' }}>
            Análisis visual continuo para verificar la limpieza de cubiertas de cristal, ausencia de basura, alineación de tótems interactivos y correcto encendido de pantallas de izzi tv+.
          </p>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#0090D0', backgroundColor: '#E6F4FB', padding: '6px 10px', borderRadius: '8px' }}>
            ● Puntuación de Higiene: {camActual.scoreLimpieza}/100 (Excelente)
          </div>
        </div>

      </div>
    </div>
  );
};
