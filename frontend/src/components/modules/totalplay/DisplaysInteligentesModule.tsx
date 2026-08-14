import React, { useState, useEffect } from 'react';
import {
  Camera, Shield, Users, UserCheck, Clock, CheckCircle2,
  AlertTriangle, Sparkles, Eye, DollarSign, RefreshCw,
  Activity, Zap, Lock, Scan, Smile, ShieldAlert, Sparkle,
  TrendingUp, Award, Layers, Radio
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
  videoUrl?: string;
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
  const [tick, setTick] = useState(0);

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
      ventasDetectadasHoy: 14,
      scoreLimpieza: 98,
      alertasSeguridad: 0,
      feedUrlText: 'LIVE FEED · ISLA SANTA FE · CAM-01',
      videoUrl: '/assets/ModuloVisionTotalPlay.mp4',
    },
    {
      id: 'cam-2',
      nombre: 'Cámara 02 · Corner Soriana Coyoacán',
      ubicacion: 'Soriana Hiper Coyoacán (Acceso Principal)',
      status: 'warning',
      fps: 30,
      personalPresente: 2,
      personalEsperado: 3,
      clientesEnEspera: 5,
      tiempoEsperaMedio: '4.8 min',
      demografia: { genero: { mas: 60, fem: 40 }, edades: { r18_25: 15, r26_40: 45, r41_60: 30, r60mas: 10 } },
      ventasDetectadasHoy: 8,
      scoreLimpieza: 84,
      alertasSeguridad: 1,
      feedUrlText: 'LIVE FEED · CORNER COYOACÁN · CAM-02',
      videoUrl: '/assets/ModuloVisionTotalPlay-Tienda.mp4',
    },
    {
      id: 'cam-3',
      nombre: 'Cámara 03 · Flagship Perisur',
      ubicacion: 'Plaza Perisur (Planta Baja)',
      status: 'online',
      fps: 60,
      personalPresente: 6,
      personalEsperado: 6,
      clientesEnEspera: 1,
      tiempoEsperaMedio: '1.8 min',
      demografia: { genero: { mas: 42, fem: 58 }, edades: { r18_25: 30, r26_40: 50, r41_60: 15, r60mas: 5 } },
      ventasDetectadasHoy: 22,
      scoreLimpieza: 100,
      alertasSeguridad: 0,
      feedUrlText: 'LIVE FEED · STORE PERISUR · CAM-03',
    },
    {
      id: 'cam-4',
      nombre: 'Cámara 04 · Isla Plaza Galerías',
      ubicacion: 'Plaza Galerías CDMX (Isla 4)',
      status: 'online',
      fps: 60,
      personalPresente: 3,
      personalEsperado: 3,
      clientesEnEspera: 3,
      tiempoEsperaMedio: '3.1 min',
      demografia: { genero: { mas: 50, fem: 50 }, edades: { r18_25: 25, r26_40: 48, r41_60: 20, r60mas: 7 } },
      ventasDetectadasHoy: 11,
      scoreLimpieza: 92,
      alertasSeguridad: 0,
      feedUrlText: 'LIVE FEED · GALERÍAS CDMX · CAM-04',
    },
  ];

  const camActual = camaras.find(c => c.id === activeCamId) || camaras[0];

  const eventosVivo = [
    { id: 'ev-1', hora: 'Hace 15 seg', cam: camActual.nombre, tipo: 'Venta Detectada', desc: 'Firma digital de contrato Triple Play 300 Mbps en tablet', icon: DollarSign, color: '#5B8F20' },
    { id: 'ev-2', hora: 'Hace 1 min', cam: camActual.nombre, tipo: 'Demografía Registrada', desc: 'Cliente Femenino (32-35 años) - Permanencia 3.4 min en display Sound Hi-Fi', icon: Users, color: '#A61C5C' },
    { id: 'ev-3', hora: 'Hace 3 min', cam: camActual.nombre, tipo: 'Verificación Limpieza', desc: 'Mostrador 1 inspeccionado por IA: 98% Libre de residuos', icon: Sparkles, color: '#BBBF41' },
    { id: 'ev-4', hora: 'Hace 5 min', cam: camActual.nombre, tipo: 'Control de Asistencia', desc: 'Presentismo 100%: 4 ejecutivos activos con gafete visible', icon: UserCheck, color: '#732D67' },
    { id: 'ev-5', hora: 'Hace 8 min', cam: camActual.nombre, tipo: 'Seguridad Operativa', desc: 'Zona tras mostrador despejada sin bolsas ni objetos anómalos', icon: Shield, color: '#D9933D' },
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#FFFFFF', minHeight: '100%', borderRadius: '16px' }}>
      {/* ── Encabezado Principal ── */}
      <div className="animate-slide-up" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: '800', color: colores.primario, margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #732D6722, #A61C5C11)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid #732D6730'
            }}>
              <Camera size={22} color="#732D67" />
            </div>
            Displays Inteligentes · Monitoreo IA Multicámara Totalplay
          </h2>
          <p style={{ fontSize: '13px', color: colores.textoMedio, marginTop: '6px', lineHeight: 1.5 }}>
            Sistema integral de visión computacional para supervisar asistencia de personal, seguridad física, tiempo de atención, perfil de audiencia (edad/género), detección de ventas y estandarización de limpieza.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            backgroundColor: '#EEF6E7', color: '#5B8F20', padding: '8px 16px',
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
                border: isActive ? `2px solid #732D67` : `1px solid ${colores.borde}`,
                backgroundColor: isActive ? '#F5E8F3' : '#FAFAFA',
                textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: isActive ? '0 4px 16px rgba(115,45,103,0.18)' : 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: isActive ? '#732D67' : colores.textoMedio, display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Radio size={12} color={isActive ? '#732D67' : '#888'} />
                  {cam.id.toUpperCase()}
                </span>
                <span style={{
                  fontSize: '10px', fontWeight: '800', padding: '2px 6px', borderRadius: '6px',
                  backgroundColor: cam.status === 'online' ? '#EEF6E7' : '#FDF4E7',
                  color: cam.status === 'online' ? '#5B8F20' : '#D9933D'
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
        <div style={{ backgroundColor: '#F5E8F3', border: '1px solid #E5C8E0', borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '10px', fontWeight: '800', color: '#732D67', textTransform: 'uppercase', marginBottom: '4px' }}>
            <UserCheck size={13} /> Presentismo
          </div>
          <div style={{ fontSize: '20px', fontWeight: '900', color: '#732D67' }}>
            {camActual.personalPresente}/{camActual.personalEsperado}
          </div>
          <div style={{ fontSize: '10px', color: '#732D67', fontWeight: '600', marginTop: '2px' }}>
            {camActual.personalPresente === camActual.personalEsperado ? '100% Cobertura' : 'Ausencia Detección'}
          </div>
        </div>

        {/* 2. Seguridad */}
        <div style={{ backgroundColor: camActual.alertasSeguridad > 0 ? '#FEF0F7' : '#FAFAFA', border: `1px solid ${camActual.alertasSeguridad > 0 ? '#F0C0D8' : colores.borde}`, borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '10px', fontWeight: '800', color: camActual.alertasSeguridad > 0 ? '#A61C5C' : colores.textoMedio, textTransform: 'uppercase', marginBottom: '4px' }}>
            <Shield size={13} /> Seguridad
          </div>
          <div style={{ fontSize: '20px', fontWeight: '900', color: camActual.alertasSeguridad > 0 ? '#A61C5C' : '#5B8F20' }}>
            {camActual.alertasSeguridad > 0 ? `${camActual.alertasSeguridad} Alerta` : 'Sin Riesgos'}
          </div>
          <div style={{ fontSize: '10px', color: colores.textoMedio, fontWeight: '600', marginTop: '2px' }}>
            Zona Protegida
          </div>
        </div>

        {/* 3. Atención al Cliente */}
        <div style={{ backgroundColor: '#FDF4E7', border: '1px solid #F0D5A0', borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '10px', fontWeight: '800', color: '#D9933D', textTransform: 'uppercase', marginBottom: '4px' }}>
            <Clock size={13} /> Espera Cliente
          </div>
          <div style={{ fontSize: '20px', fontWeight: '900', color: '#D9933D' }}>
            {camActual.tiempoEsperaMedio}
          </div>
          <div style={{ fontSize: '10px', color: '#D9933D', fontWeight: '600', marginTop: '2px' }}>
            {camActual.clientesEnEspera} en fila activa
          </div>
        </div>

        {/* 4. Demografía (Edades & Género) */}
        <div style={{ backgroundColor: '#FEF0F7', border: '1px solid #F0C0D8', borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '10px', fontWeight: '800', color: '#A61C5C', textTransform: 'uppercase', marginBottom: '4px' }}>
            <Users size={13} /> Audiencia
          </div>
          <div style={{ fontSize: '20px', fontWeight: '900', color: '#A61C5C' }}>
            {camActual.demografia.genero.fem}% F / {camActual.demografia.genero.mas}% M
          </div>
          <div style={{ fontSize: '10px', color: '#A61C5C', fontWeight: '600', marginTop: '2px' }}>
            Segmento: 26-40 yrs ({camActual.demografia.edades.r26_40}%)
          </div>
        </div>

        {/* 5. Detección de Ventas */}
        <div style={{ backgroundColor: '#EEF6E7', border: '1px solid #C5E2B3', borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '10px', fontWeight: '800', color: '#5B8F20', textTransform: 'uppercase', marginBottom: '4px' }}>
            <DollarSign size={13} /> Ventas IA
          </div>
          <div style={{ fontSize: '20px', fontWeight: '900', color: '#5B8F20' }}>
            {camActual.ventasDetectadasHoy}
          </div>
          <div style={{ fontSize: '10px', color: '#5B8F20', fontWeight: '600', marginTop: '2px' }}>
            Confirmadas por postura
          </div>
        </div>

        {/* 6. Limpieza */}
        <div style={{ backgroundColor: '#FAFFF0', border: '1px solid #D8EAA0', borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '10px', fontWeight: '800', color: '#8B8F26', textTransform: 'uppercase', marginBottom: '4px' }}>
            <Sparkles size={13} /> Limpieza
          </div>
          <div style={{ fontSize: '20px', fontWeight: '900', color: '#8B8F26' }}>
            {camActual.scoreLimpieza}%
          </div>
          <div style={{ fontSize: '10px', color: '#8B8F26', fontWeight: '600', marginTop: '2px' }}>
            Higiene de Mostrador
          </div>
        </div>
      </div>

      {/* ── Sección Principal: Reproductor de Video CCTV / Analítica ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '20px', marginBottom: '24px' }}>

        {/* LADO IZQUIERDO: Reproductor de Feed de Cámara Inteligente */}
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

          {/* Canvas / Video Container */}
          <div style={{
            height: '360px', borderRadius: '14px',
            background: 'radial-gradient(circle at 50% 50%, #1E293B 0%, #090D16 100%)',
            position: 'relative', overflow: 'hidden', border: '1px solid #334155',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '16px'
          }}>
            {camActual.videoUrl ? (
              <video
                key={camActual.id}
                src={camActual.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '14px',
                }}
              />
            ) : (
              <>
                {/* Rejilla analítica de fondo para cámaras sin video dedicado (Cam 3 y 4) */}
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
                  backgroundSize: '40px 40px', pointerEvents: 'none'
                }} />

                {/* Simulated Bounding Boxes sólo para cámaras sin video */}
                {filterOverlay.seguridad && (
                  <div style={{
                    position: 'absolute', top: '18%', left: '15%', width: '130px', height: '180px',
                    border: '2px solid #732D67', borderRadius: '8px',
                    backgroundColor: 'rgba(115, 45, 103, 0.15)',
                    boxShadow: '0 0 15px rgba(115, 45, 103, 0.4)',
                    padding: '6px', fontSize: '10px', color: '#FFFFFF', fontWeight: '700'
                  }}>
                    <div style={{ backgroundColor: '#732D67', padding: '2px 6px', borderRadius: '4px', display: 'inline-block', fontSize: '9px' }}>
                      Ejecutivo TP #104
                    </div>
                    <div style={{ marginTop: '4px', color: '#E2E8F0', fontSize: '9px', lineHeight: '1.2' }}>
                      • Presentismo: OK<br />
                      • Uniforme: 100%<br />
                      • Gafete: Detectado
                    </div>
                  </div>
                )}

                {filterOverlay.demografia && (
                  <div style={{
                    position: 'absolute', top: '22%', left: '42%', width: '140px', height: '170px',
                    border: '2px solid #A61C5C', borderRadius: '8px',
                    backgroundColor: 'rgba(166, 28, 92, 0.15)',
                    boxShadow: '0 0 15px rgba(166, 28, 92, 0.4)',
                    padding: '6px', fontSize: '10px', color: '#FFFFFF', fontWeight: '700'
                  }}>
                    <div style={{ backgroundColor: '#A61C5C', padding: '2px 6px', borderRadius: '4px', display: 'inline-block', fontSize: '9px' }}>
                      Cliente · F (32-35 yrs)
                    </div>
                    <div style={{ marginTop: '4px', color: '#E2E8F0', fontSize: '9px', lineHeight: '1.2' }}>
                      • Atención: En Proceso<br />
                      • Interés: Triple Play<br />
                      • Emoción: Positiva (92%)
                    </div>
                  </div>
                )}

                {filterOverlay.ventas && (
                  <div style={{
                    position: 'absolute', top: '48%', left: '38%', width: '190px', height: '100px',
                    border: '2px dashed #5B8F20', borderRadius: '8px',
                    backgroundColor: 'rgba(91, 143, 32, 0.15)',
                    boxShadow: '0 0 15px rgba(91, 143, 32, 0.4)',
                    padding: '6px', fontSize: '10px', color: '#FFFFFF', fontWeight: '700'
                  }}>
                    <div style={{ backgroundColor: '#5B8F20', padding: '2px 6px', borderRadius: '4px', display: 'inline-block', fontSize: '9px' }}>
                      ⚡ DETECCIÓN DE VENTA IA
                    </div>
                    <div style={{ marginTop: '4px', color: '#E2E8F0', fontSize: '9px', lineHeight: '1.2' }}>
                      • Gesto: Firma en Tablet POS<br />
                      • Confianza Algoritmo: 96.8%
                    </div>
                  </div>
                )}

                {filterOverlay.limpieza && (
                  <div style={{
                    position: 'absolute', bottom: '10%', right: '10%', width: '150px', height: '90px',
                    border: '2px solid #BBBF41', borderRadius: '8px',
                    backgroundColor: 'rgba(187, 191, 65, 0.15)',
                    boxShadow: '0 0 15px rgba(187, 191, 65, 0.4)',
                    padding: '6px', fontSize: '10px', color: '#FFFFFF', fontWeight: '700'
                  }}>
                    <div style={{ backgroundColor: '#BBBF41', color: '#0F172A', padding: '2px 6px', borderRadius: '4px', display: 'inline-block', fontSize: '9px', fontWeight: '900' }}>
                      Zona Mostrador · Limpieza
                    </div>
                    <div style={{ marginTop: '4px', color: '#E2E8F0', fontSize: '9px', lineHeight: '1.2' }}>
                      • Puntuación: 98/100<br />
                      • Sin Residuos / Manchas
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Overlay Watermark HUD */}
            <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', pointerEvents: 'none' }}>
              <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.85)', padding: '6px 12px', borderRadius: '8px', border: '1px solid #334155', color: '#94A3B8', fontSize: '11px', fontWeight: '600' }}>
                Totalplay Vision Engine v4.2 · M2C Retail
              </div>
              <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.85)', padding: '6px 12px', borderRadius: '8px', border: '1px solid #334155', color: '#38BDF8', fontSize: '11px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Scan size={14} /> Detección Pose + Objetos Activa
              </div>
            </div>

            <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', pointerEvents: 'none' }}>
              <div style={{ color: '#E2E8F0', fontSize: '11px', fontWeight: '600', backgroundColor: 'rgba(15, 23, 42, 0.85)', padding: '4px 10px', borderRadius: '6px' }}>
                Ubicación: {camActual.ubicacion}
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
                  backgroundColor: filterOverlay.seguridad ? '#732D67' : '#1E293B', color: filterOverlay.seguridad ? '#FFFFFF' : '#94A3B8'
                }}
              >
                👤 Asistencia & Presentismo
              </button>
              <button
                onClick={() => setFilterOverlay(f => ({ ...f, demografia: !f.demografia }))}
                style={{
                  padding: '6px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: '700',
                  backgroundColor: filterOverlay.demografia ? '#A61C5C' : '#1E293B', color: filterOverlay.demografia ? '#FFFFFF' : '#94A3B8'
                }}
              >
                📊 Demografía (Edad/Género)
              </button>
              <button
                onClick={() => setFilterOverlay(f => ({ ...f, ventas: !f.ventas }))}
                style={{
                  padding: '6px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: '700',
                  backgroundColor: filterOverlay.ventas ? '#5B8F20' : '#1E293B', color: filterOverlay.ventas ? '#FFFFFF' : '#94A3B8'
                }}
              >
                ⚡ Detección de Ventas
              </button>
              <button
                onClick={() => setFilterOverlay(f => ({ ...f, limpieza: !f.limpieza }))}
                style={{
                  padding: '6px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: '700',
                  backgroundColor: filterOverlay.limpieza ? '#BBBF41' : '#1E293B', color: filterOverlay.limpieza ? '#0F172A' : '#94A3B8'
                }}
              >
                ✨ Inspección Limpieza
              </button>
            </div>
          </div>
        </div>

        {/* LADO DERECHO: Stream de Eventos en Tiempo Real & Desglose Demográfico */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Panel Demográfico (Edades & Género) */}
          <div className="animate-slide-up delay-4" style={{
            backgroundColor: '#FFFFFF', border: `1px solid ${colores.borde}`,
            borderRadius: '16px', padding: '18px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
          }}>
            <h3 style={{ fontSize: '14px', fontWeight: '800', color: colores.primario, margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={16} color="#A61C5C" /> Perfil Demográfico Detectado
            </h3>

            {/* Género */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '700', color: colores.textoMedio, marginBottom: '6px' }}>
                <span>Distribución por Género</span>
                <span>{camActual.demografia.genero.fem}% Femenino · {camActual.demografia.genero.mas}% Masculino</span>
              </div>
              <div style={{ height: '8px', borderRadius: '99px', backgroundColor: '#E2E8F0', overflow: 'hidden', display: 'flex' }}>
                <div style={{ width: `${camActual.demografia.genero.fem}%`, backgroundColor: '#A61C5C', transition: 'width 0.8s' }} />
                <div style={{ width: `${camActual.demografia.genero.mas}%`, backgroundColor: '#732D67', transition: 'width 0.8s' }} />
              </div>
            </div>

            {/* Rangos de Edad */}
            <div style={{ fontSize: '11px', fontWeight: '700', color: colores.textoMedio, marginBottom: '8px' }}>
              Rangos de Edad Estimados por Algoritmo:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', textAlign: 'center' }}>
              <div style={{ backgroundColor: '#FAFAFA', border: `1px solid ${colores.borde}`, padding: '8px 4px', borderRadius: '8px' }}>
                <div style={{ fontSize: '9px', color: colores.textoMedio, fontWeight: '600' }}>18-25 yrs</div>
                <div style={{ fontSize: '14px', fontWeight: '900', color: '#732D67', marginTop: '2px' }}>{camActual.demografia.edades.r18_25}%</div>
              </div>
              <div style={{ backgroundColor: '#FCE7F1', border: '1px solid #F5B8D0', padding: '8px 4px', borderRadius: '8px' }}>
                <div style={{ fontSize: '9px', color: '#A61C5C', fontWeight: '700' }}>26-40 yrs</div>
                <div style={{ fontSize: '14px', fontWeight: '900', color: '#A61C5C', marginTop: '2px' }}>{camActual.demografia.edades.r26_40}%</div>
              </div>
              <div style={{ backgroundColor: '#FAFAFA', border: `1px solid ${colores.borde}`, padding: '8px 4px', borderRadius: '8px' }}>
                <div style={{ fontSize: '9px', color: colores.textoMedio, fontWeight: '600' }}>41-60 yrs</div>
                <div style={{ fontSize: '14px', fontWeight: '900', color: '#D9933D', marginTop: '2px' }}>{camActual.demografia.edades.r41_60}%</div>
              </div>
              <div style={{ backgroundColor: '#FAFAFA', border: `1px solid ${colores.borde}`, padding: '8px 4px', borderRadius: '8px' }}>
                <div style={{ fontSize: '9px', color: colores.textoMedio, fontWeight: '600' }}>60+ yrs</div>
                <div style={{ fontSize: '14px', fontWeight: '900', color: '#BBBF41', marginTop: '2px' }}>{camActual.demografia.edades.r60mas}%</div>
              </div>
            </div>
          </div>

          {/* Stream de Eventos Inteligentes en Vivo */}
          <div className="animate-slide-up delay-5" style={{
            backgroundColor: '#FFFFFF', border: `1px solid ${colores.borde}`,
            borderRadius: '16px', padding: '18px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', flex: 1,
            display: 'flex', flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '800', color: colores.primario, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={16} color="#732D67" /> Bitácora de Visión IA en Vivo
              </h3>
              <span style={{ fontSize: '10px', color: '#5B8F20', fontWeight: '700', backgroundColor: '#EEF6E7', padding: '2px 8px', borderRadius: '6px' }}>
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

      {/* ── Grid Inferior: Módulos Especializados de la Visión Computacional ── */}
      <div className="animate-slide-up delay-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>

        {/* 1. Asistencia de Personal */}
        <div style={{ border: `1px solid ${colores.borde}`, borderRadius: '16px', padding: '18px', backgroundColor: '#FFFFFF', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', backgroundColor: '#732D6715', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserCheck size={18} color="#732D67" />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '800', color: colores.textoClaro }}>Asistencia & Presentismo</div>
              <div style={{ fontSize: '11px', color: colores.textoMedio }}>Supervisión de Turno y Gafete</div>
            </div>
          </div>
          <p style={{ fontSize: '12px', color: colores.textoMedio, lineHeight: 1.5, marginBottom: '12px' }}>
            Reconocimiento facial consentido y detección de postura para registrar automáticamente la entrada, salida y tiempo efectivo de atención en mostrador de ejecutivos Totalplay.
          </p>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#732D67', backgroundColor: '#F5E8F3', padding: '6px 10px', borderRadius: '8px' }}>
            ● 4 de 4 Ejecutivos en posición activa (100%)
          </div>
        </div>

        {/* 2. Seguridad & Control de Pérdidas */}
        <div style={{ border: `1px solid ${colores.borde}`, borderRadius: '16px', padding: '18px', backgroundColor: '#FFFFFF', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', backgroundColor: '#A61C5C15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldAlert size={18} color="#A61C5C" />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '800', color: colores.textoClaro }}>Seguridad & Perímetro</div>
              <div style={{ fontSize: '11px', color: colores.textoMedio }}>Protección de Activos e Intrusión</div>
            </div>
          </div>
          <p style={{ fontSize: '12px', color: colores.textoMedio, lineHeight: 1.5, marginBottom: '12px' }}>
            Alertas inmediatas si una persona no autorizada accede a la zona trasera del mostrador, si se olvida un objeto/mochila o si un display inteligente de Audio Surround es manipulado sin permiso.
          </p>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#A61C5C', backgroundColor: '#FEF0F7', padding: '6px 10px', borderRadius: '8px' }}>
            ● Zona Trasera Protegida · Perímetro Seguro
          </div>
        </div>

        {/* 3. Detección de Ventas en Vivo */}
        <div style={{ border: `1px solid ${colores.borde}`, borderRadius: '16px', padding: '18px', backgroundColor: '#FFFFFF', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', backgroundColor: '#5B8F2015', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DollarSign size={18} color="#5B8F20" />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '800', color: colores.textoClaro }}>Detección de Ventas IA</div>
              <div style={{ fontSize: '11px', color: colores.textoMedio }}>Reconocimiento de Cierre Comercial</div>
            </div>
          </div>
          <p style={{ fontSize: '12px', color: colores.textoMedio, lineHeight: 1.5, marginBottom: '12px' }}>
            Visión artificial capacitada para clasificar momentos clave de venta: entrega de folletos, firma digital en tablet de contratación y entrega del equipo Totalplay TV.
          </p>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#5B8F20', backgroundColor: '#EEF6E7', padding: '6px 10px', borderRadius: '8px' }}>
            ● {camActual.ventasDetectadasHoy} Ventas registradas por cámara hoy
          </div>
        </div>

        {/* 4. Inspección de Limpieza & Estandarización */}
        <div style={{ border: `1px solid ${colores.borde}`, borderRadius: '16px', padding: '18px', backgroundColor: '#FFFFFF', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', backgroundColor: '#BBBF4120', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={18} color="#8B8F26" />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '800', color: colores.textoClaro }}>Limpieza & Estado Físico</div>
              <div style={{ fontSize: '11px', color: colores.textoMedio }}>Estandarización de Mostrador</div>
            </div>
          </div>
          <p style={{ fontSize: '12px', color: colores.textoMedio, lineHeight: 1.5, marginBottom: '12px' }}>
            Análisis visual continuo para verificar la limpieza de cubiertas de cristal, ausencia de basura, alineación de tótems interactivos y correcto encendido de pantallas decorativas.
          </p>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#8B8F26', backgroundColor: '#FAFFF0', padding: '6px 10px', borderRadius: '8px' }}>
            ● Puntuación de Higiene: {camActual.scoreLimpieza}/100 (Excelente)
          </div>
        </div>

      </div>
    </div>
  );
};
