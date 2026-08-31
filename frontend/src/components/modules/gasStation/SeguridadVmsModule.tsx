import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Video,
  AlertTriangle,
  Car,
  Lock,
  Radio,
  Clock,
  Compass,
  Activity,
  CheckCircle,
  Crosshair,
  Wifi
} from 'lucide-react';
import { brandingConfig } from '../../../config/branding';
import { VMS_FEEDS, ALPR_REGISTROS } from '../../../gasStation/gasStationData';

export const SeguridadVmsModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [selectedFeed, setSelectedFeed] = useState(VMS_FEEDS[0]);
  
  // Simular actualización de registros ALPR
  const [registros, setRegistros] = useState(ALPR_REGISTROS);
  const [procesados, setProcesados] = useState(1240);
  const [scannerPos, setScannerPos] = useState(0);

  useEffect(() => {
    // Simular un radar de escaneo para la cámara VMS
    const scannerInterval = setInterval(() => {
      setScannerPos(prev => (prev >= 100 ? 0 : prev + 2));
    }, 50);

    // Simular nuevas detecciones ALPR cada 4s
    const dInterval = setInterval(() => {
      setProcesados(prev => prev + 1);
      
      const isBlacklist = Math.random() > 0.85; // 15% chance
      
      const nuevoReg = {
        matricula: `SIM-${Math.floor(1000 + Math.random() * 9000)}`,
        hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        tipo: isBlacklist ? 'Vehículo Desconocido (Rojo)' : 'Sedán Estándar',
        cliente: isBlacklist ? 'ALERTA: Fuga sin pagar previa' : 'Cliente Frecuente',
        estado: isBlacklist ? 'LISTA NEGRA' : 'AUTORIZADO',
        accion: isBlacklist ? 'BOMBA BLOQUEADA INMEDIATAMENTE' : `Despacho habilitado Bomba ${Math.floor(1 + Math.random() * 8)}`
      };

      setRegistros(prev => {
        const newArr = [nuevoReg, ...prev];
        if (newArr.length > 5) newArr.pop();
        return newArr;
      });
    }, 4000);

    return () => {
      clearInterval(scannerInterval);
      clearInterval(dInterval);
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* ── HEADER DEL MÓDULO (Rojo Oscuro) ── */}
      <div
        className="animate-slide-up-card"
        style={{
          background: `linear-gradient(135deg, #450a0a 0%, #7f1d1d 100%)`,
          borderRadius: '24px',
          padding: '24px 30px',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          border: '1px solid rgba(220, 38, 38, 0.4)',
          boxShadow: '0 10px 30px rgba(185, 28, 28, 0.25)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="animate-radar" style={{ position: 'absolute', right: '10%', top: '-50%', width: '300px', height: '300px', opacity: 0.1, pointerEvents: 'none' }} />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', zIndex: 1 }}>
          <div
            className="animate-pulse"
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(220, 38, 38, 0.6)',
            }}
          >
            <ShieldCheck size={28} color="#FFFFFF" className="animate-bounce" style={{ animationDuration: '2s' }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '900', letterSpacing: '-0.4px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                Módulo 3: Seguridad Inteligente & VMS
              </h1>
              <span
                className="animate-alert-blink"
                style={{
                  fontSize: '11px',
                  fontWeight: '800',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  backgroundColor: '#991B1B',
                  border: '1px solid #F87171',
                  color: '#FECACA',
                }}
              >
                🔴 ALERTA ACTIVA
              </span>
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#FECACA' }}>
              Detección de fraudes, reconocimiento ALPR, prevención de fugas y monitoreo de bombas
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', zIndex: 1 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '11px', color: '#FCA5A5', fontWeight: '700', textTransform: 'uppercase' }}>
              Lecturas ALPR Hoy
            </div>
            <div className="gs-number animate-count-up" style={{ fontSize: '24px', fontWeight: '900', color: '#FFFFFF' }}>
              {procesados.toLocaleString()}
            </div>
          </div>
          <div style={{ width: '1px', height: '32px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '11px', color: '#FCA5A5', fontWeight: '700', textTransform: 'uppercase' }}>
              Bloqueos Activos
            </div>
            <div className="gs-number pulse-red" style={{ fontSize: '24px', fontWeight: '900', color: '#F87171' }}>
              2
            </div>
          </div>
        </div>
      </div>

      {/* ── 1. FEED DE CÁMARAS VMS ── */}
      <div className="animate-fade-up delay-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {VMS_FEEDS.map((feed, index) => {
          const isSelected = selectedFeed.id === feed.id;
          const isAlert = feed.id === 'CAM-01' || feed.iaTag.includes('alerta'); // Ejemplo para simular estado
          
          return (
            <div
              key={feed.id}
              onClick={() => setSelectedFeed(feed)}
              className="gs-module-card"
              style={{
                backgroundColor: '#000000',
                borderRadius: '16px',
                padding: '12px',
                color: '#FFFFFF',
                border: `2px solid ${isSelected ? (isAlert ? '#DC2626' : '#10B981') : '#1E293B'}`,
                boxShadow: isSelected ? `0 0 15px ${isAlert ? 'rgba(220, 38, 38, 0.5)' : 'rgba(16, 185, 129, 0.5)'}` : 'none',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}
            >
              {/* Header Cámara */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', zIndex: 10, position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Video size={14} color={isAlert ? "#EF4444" : "#10B981"} />
                  <span style={{ fontSize: '11px', fontWeight: '800', color: '#E2E8F0' }}>{feed.nombre}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: '4px' }}>
                  <div className="gs-live-dot" style={{ position: 'relative' }}>
                    <div className="animate-ping" style={{ position: 'absolute', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: isAlert ? '#EF4444' : '#10B981', opacity: 0.7 }}></div>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: isAlert ? '#EF4444' : '#10B981', position: 'relative' }}></div>
                  </div>
                  <span style={{ fontSize: '10px', color: isAlert ? '#EF4444' : '#10B981', fontWeight: '800' }}>LIVE</span>
                </div>
              </div>

              {/* Simulación Stream */}
              <div
                style={{
                  height: '130px',
                  borderRadius: '8px',
                  backgroundColor: '#0F172A',
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundImage: 'radial-gradient(circle at center, #1E293B 0%, #000000 100%)',
                }}
              >
                {/* Scan line */}
                {isSelected && (
                  <div
                    style={{
                      position: 'absolute',
                      top: `${scannerPos}%`,
                      left: 0,
                      width: '100%',
                      height: '2px',
                      backgroundColor: isAlert ? 'rgba(239, 68, 68, 0.8)' : 'rgba(16, 185, 129, 0.8)',
                      boxShadow: `0 0 10px ${isAlert ? '#EF4444' : '#10B981'}`,
                      zIndex: 2,
                      transition: 'top 0.1s linear'
                    }}
                  />
                )}

                {/* Bounding box IA */}
                <div
                  className={isSelected ? 'animate-pulse' : ''}
                  style={{
                    position: 'absolute',
                    top: '20%',
                    left: '25%',
                    width: '45%',
                    height: '55%',
                    border: `1.5px solid ${isAlert ? '#EF4444' : '#06B6D4'}`,
                    borderRadius: '4px',
                    backgroundColor: isAlert ? 'rgba(239, 68, 68, 0.1)' : 'rgba(6, 182, 212, 0.1)',
                    zIndex: 1,
                  }}
                >
                  <div style={{ position: 'absolute', top: '-14px', left: '-1.5px', background: isAlert ? '#EF4444' : '#06B6D4', color: '#fff', fontSize: '9px', fontWeight: 'bold', padding: '1px 4px', whiteSpace: 'nowrap' }}>
                    {isAlert ? 'OBJ: VEHÍCULO SOSPECHOSO 98%' : 'OBJ: VEHÍCULO 94%'}
                  </div>
                  {/* Crosshair corners */}
                  <Crosshair size={12} color={isAlert ? '#EF4444' : '#06B6D4'} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.5 }} />
                </div>

                {/* Glassmorphism Overlay Info */}
                <div
                  className="gs-glass-dark"
                  style={{
                    position: 'absolute',
                    bottom: '6px',
                    left: '6px',
                    right: '6px',
                    padding: '6px 8px',
                    borderRadius: '6px',
                    zIndex: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <div style={{ fontSize: '10px', color: '#F1F5F9', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {isAlert ? <AlertTriangle size={10} color="#F87171" /> : <ShieldCheck size={10} color="#34D399" />}
                    {feed.iaTag}
                  </div>
                  
                  {/* Confianza model */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '9px', color: '#94A3B8' }}>Confianza IA:</span>
                    <div style={{ flex: 1, height: '4px', backgroundColor: '#334155', borderRadius: '2px', overflow: 'hidden' }}>
                      <div className="animate-bar-fill" style={{ width: isAlert ? '98%' : '94%', height: '100%', backgroundColor: isAlert ? '#EF4444' : '#10B981' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── 2. ALPR RADAR & FEED DE NOTICIAS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        
        {/* Radar Circular ALPR */}
        <div className="gs-module-card animate-fade-up delay-2" style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: '800', color: colores.textoClaro, alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Radio size={18} color="#0284C7" />
            Radar ALPR en Tiempo Real
          </h3>
          
          <div style={{ position: 'relative', width: '220px', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Background circles */}
            <div style={{ position: 'absolute', width: '100%', height: '100%', border: '1px solid #E2E8F0', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', width: '75%', height: '75%', border: '1px solid #E2E8F0', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', width: '50%', height: '50%', border: '1px solid #E2E8F0', borderRadius: '50%' }} />
            
            {/* Crosshairs */}
            <div style={{ position: 'absolute', width: '100%', height: '1px', backgroundColor: '#E2E8F0' }} />
            <div style={{ position: 'absolute', width: '1px', height: '100%', backgroundColor: '#E2E8F0' }} />
            
            {/* Sweeping radar effect */}
            <div
              className="animate-spin-slow"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, transparent 70%, rgba(2, 132, 199, 0.4) 100%)',
                clipPath: 'circle(50%)'
              }}
            />
            
            {/* Blips simulados */}
            <div className="animate-ping" style={{ position: 'absolute', top: '30%', left: '40%', width: '6px', height: '6px', backgroundColor: '#10B981', borderRadius: '50%' }} />
            <div className="animate-ping delay-2" style={{ position: 'absolute', bottom: '25%', right: '30%', width: '6px', height: '6px', backgroundColor: '#EF4444', borderRadius: '50%' }} />
            
            {/* Center Info */}
            <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#FFFFFF', padding: '15px', borderRadius: '50%', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
              <Car size={24} color="#0284C7" />
              <div className="gs-number" style={{ fontSize: '20px', fontWeight: '900', color: '#0F172A', marginTop: '4px' }}>{procesados}</div>
              <div style={{ fontSize: '10px', color: '#64748B', fontWeight: '700' }}>VEHÍCULOS</div>
            </div>
          </div>
          
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: '24px', padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '12px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '700' }}>TASA LECTURA</div>
              <div style={{ fontSize: '14px', fontWeight: '900', color: '#0F172A' }}>99.8%</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '700' }}>LATENCIA</div>
              <div style={{ fontSize: '14px', fontWeight: '900', color: '#059669' }}>42ms</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '700' }}>ALERTAS</div>
              <div style={{ fontSize: '14px', fontWeight: '900', color: '#DC2626' }}>2 Hoy</div>
            </div>
          </div>
        </div>

        {/* Feed de Registros ALPR */}
        <div className="gs-module-card animate-fade-up delay-3" style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '20px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={18} color="#DC2626" />
              Feed ALPR (Live)
            </h3>
            <span className="shimmer-badge" style={{ fontSize: '11px', fontWeight: '800', color: '#DC2626', backgroundColor: '#FEE2E2', padding: '4px 10px', borderRadius: '8px' }}>
              Autobloqueo &lt; 0.4s
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflow: 'hidden' }}>
            {registros.map((r, idx) => {
              const isListaNegra = r.estado === 'LISTA NEGRA';
              return (
                <div
                  key={idx + r.matricula + r.hora}
                  className="animate-slide-up-card"
                  style={{
                    animationDelay: `${idx * 0.1}s`,
                    padding: '14px',
                    borderRadius: '14px',
                    backgroundColor: isListaNegra ? '#FEF2F2' : '#F8FAFC',
                    border: `1px solid ${isListaNegra ? '#FCA5A5' : '#E2E8F0'}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: isListaNegra ? '0 4px 12px rgba(239, 68, 68, 0.15)' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        backgroundColor: isListaNegra ? '#DC2626' : '#0F172A',
                        color: '#FFFFFF',
                        fontWeight: '900',
                        fontSize: '15px',
                        fontFamily: 'monospace',
                        letterSpacing: '1.5px',
                        border: '2px solid rgba(255,255,255,0.2)',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}
                    >
                      {r.matricula}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '800', color: isListaNegra ? '#B91C1C' : colores.textoClaro }}>
                        {r.cliente}
                      </div>
                      <div style={{ fontSize: '11.5px', color: colores.textoMedio, marginTop: '2px' }}>
                        {r.tipo} · <strong style={{ color: isListaNegra ? '#DC2626' : '#059669' }}>{r.accion}</strong>
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                    <span
                      className={isListaNegra ? 'pulse-red' : ''}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '900',
                        backgroundColor: isListaNegra ? '#EF4444' : '#10B981',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      {isListaNegra ? <Lock size={12} /> : <CheckCircle size={12} />}
                      {r.estado}
                    </span>
                    <div style={{ fontSize: '11px', color: colores.textoOscuro, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={10} />
                      {r.hora}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 3. MAPA DE CALOR & FLUJO DE PISTAS ── */}
      <div className="gs-module-card animate-fade-up delay-4" style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Compass size={18} color="#059669" />
              Mapa de Calor & Flujo de Pistas
            </h3>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: colores.textoMedio }}>
              Monitoreo IA de tiempos de espera y señalización digital guiando a bombas libres.
            </p>
          </div>
          <span className="pulse-green" style={{ fontSize: '12px', fontWeight: '800', color: '#059669', backgroundColor: '#D1FAE5', padding: '6px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Wifi size={14} />
            Tráfico Fluido (2.4 min)
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {[
            { isla: 'Isla 1 (B1 & B2)', espera: '1.8 min', colorBg: '#F0FDF4', colorBorder: '#BBF7D0', colorText: '#166534', estado: 'Bomba 2 Libre · Guiando tráfico', pje: 20 },
            { isla: 'Isla 2 (B3 & B4)', espera: '3.4 min', colorBg: '#FFFBEB', colorBorder: '#FDE68A', colorText: '#B45309', estado: 'Ambas en despacho', pje: 75 },
            { isla: 'Isla 3 (Diésel)', espera: '2.1 min', colorBg: '#F0F9FF', colorBorder: '#BAE6FD', colorText: '#0369A1', estado: 'Flujo continuo camiones', pje: 40 },
            { isla: 'Isla 4 (GNR)', espera: 'BLOQ', colorBg: '#FEF2F2', colorBorder: '#FECACA', colorText: '#B91C1C', estado: 'Bomba 8 restringida por IA', pje: 100 }
          ].map((isla, i) => (
            <div key={i} className="animate-slide-up-card" style={{ animationDelay: `${i*0.1 + 0.4}s`, padding: '16px', borderRadius: '16px', backgroundColor: isla.colorBg, border: `1px solid ${isla.colorBorder}`, position: 'relative', overflow: 'hidden' }}>
              <div style={{ fontSize: '12px', color: isla.colorText, fontWeight: '800' }}>{isla.isla}</div>
              <div className="gs-number" style={{ fontSize: '24px', fontWeight: '900', color: isla.colorText, marginTop: '4px' }}>{isla.espera}</div>
              <div style={{ fontSize: '11px', color: isla.colorText, marginTop: '8px', opacity: 0.8 }}>{isla.estado}</div>
              
              {/* Barra inferior simulando ocupación */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, height: '4px', width: '100%', backgroundColor: 'rgba(0,0,0,0.05)' }}>
                <div className="animate-bar-fill" style={{ height: '100%', width: `${isla.pje}%`, backgroundColor: isla.colorText, opacity: 0.5 }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: `1px solid ${colores.borde}`, paddingTop: '16px', marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="gs-live-dot" style={{ position: 'relative', width: '12px', height: '12px' }}>
               <div className="animate-ping" style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', backgroundColor: '#059669', opacity: 0.6 }}></div>
               <div style={{ width: '100%', height: '100%', borderRadius: '50%', backgroundColor: '#059669', position: 'relative' }}></div>
            </div>
            <span style={{ fontSize: '13px', color: colores.textoMedio, fontWeight: '600' }}>
              Tótem Dinámico: <strong style={{ color: '#059669' }}>"Pase a Bomba 2"</strong>
            </span>
          </div>
          
          <button
            className="gs-badge-ok"
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '12px',
              fontWeight: '800',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(16, 185, 129, 0.2)'
            }}
          >
            Sincronizar Señalización
          </button>
        </div>
      </div>
    </div>
  );
};
