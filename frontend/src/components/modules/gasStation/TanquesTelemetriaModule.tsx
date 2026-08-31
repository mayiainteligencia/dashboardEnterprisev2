import React, { useState, useEffect } from 'react';
import {
  Fuel,
  Droplet,
  Activity,
  ShieldCheck,
  AlertTriangle,
  Link,
  Thermometer,
  Gauge,
  CheckCircle,
  RefreshCw,
  Sliders,
  TrendingDown,
  Layers,
  FileCheck
} from 'lucide-react';
import { brandingConfig } from '../../../config/branding';
import { 
  TANQUES_DATA, 
  BOMBAS_DATA, 
  BLOCKCHAIN_LOTES,
  PRECIOS_ACTUALES
} from '../../../gasStation/gasStationData';

export const TanquesTelemetriaModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [selectedTanque, setSelectedTanque] = useState(TANQUES_DATA[0]);
  const [filtroBomba, setFiltroBomba] = useState<'todos' | 'despachando' | 'disponible'>('todos');
  
  // Estado para simular datos en tiempo real
  const [bombas, setBombas] = useState(BOMBAS_DATA);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBombas(prevBombas => 
        prevBombas.map(b => {
          if (b.estado === 'DESPACHANDO') {
            // Variación de ±0.5 L/min
            const variacion = (Math.random() - 0.5);
            return { ...b, flujo: Math.max(0, b.flujo + variacion) };
          }
          return b;
        })
      );
      setTick(t => t + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const bombasFiltradas = bombas.filter(b => {
    if (filtroBomba === 'todos') return true;
    if (filtroBomba === 'despachando') return b.estado === 'DESPACHANDO';
    if (filtroBomba === 'disponible') return b.estado === 'DISPONIBLE';
    return true;
  });

  // Cálculo de dasharray para medidor circular
  const gaugeCircumference = 2 * Math.PI * 45; // r=45
  const capTotalPct = 79.2;
  const strokeDashoffset = gaugeCircumference - (capTotalPct / 100) * gaugeCircumference;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '40px' }}>
      
      {/* ── HEADER HEROICO ── */}
      <div
        className="animate-gradient-bg"
        style={{
          background: `linear-gradient(270deg, #0F172A, #1E293B, #020617, #0F172A)`,
          backgroundSize: '400% 400%',
          borderRadius: '24px',
          padding: '24px 30px',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Partículas SVG de fondo */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, pointerEvents: 'none' }}>
          <svg width="100%" height="100%">
            <pattern id="particles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="#fff" className="animate-float" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#particles)" />
          </svg>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', zIndex: 1 }}>
          <div
            className="animate-border-glow"
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(2, 132, 199, 0.6)',
              position: 'relative'
            }}
          >
            <Fuel size={32} color="#FFFFFF" className="animate-ping" style={{ animationDuration: '3s' }} />
            <Fuel size={32} color="#FFFFFF" style={{ position: 'absolute' }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
              <h1 style={{ margin: 0, fontSize: '26px', fontWeight: '900', letterSpacing: '-0.5px', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                Monitoreo de Tanques & Telemetría IoT
              </h1>
              <span className="shimmer-badge" style={{
                fontSize: '11px',
                fontWeight: '800',
                padding: '4px 12px',
                borderRadius: '999px',
                backgroundColor: 'rgba(2, 132, 199, 0.3)',
                border: '1px solid rgba(2, 132, 199, 0.8)',
                color: '#38BDF8',
              }}>
                EN VIVO 24/7
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '14px', color: '#94A3B8' }}>
              Telemetría volumétrica, detección de microfugas IA y trazabilidad blockchain en tiempo real
            </p>
          </div>
        </div>

        {/* Gauge SVG Animado de Capacidad Total */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase' }}>
                Capacidad Total
              </div>
              <div className="gs-number animate-count-up" style={{ fontSize: '24px', fontWeight: '900', color: '#10B981' }}>
                126,800 L
              </div>
            </div>
            <div style={{ position: 'relative', width: '80px', height: '80px' }}>
              <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                <circle 
                  cx="50" cy="50" r="45" fill="none" 
                  stroke="#10B981" strokeWidth="8"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: gaugeCircumference,
                    strokeDashoffset: strokeDashoffset,
                    transition: 'stroke-dashoffset 1.5s ease-in-out',
                    filter: 'drop-shadow(0 0 8px #10B981)'
                  }} 
                />
              </svg>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontWeight: '800', fontSize: '15px' }}>
                {capTotalPct}%
              </div>
            </div>
          </div>
          <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
          <div>
             <div style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase' }}>
              Detección Fugas IA
            </div>
            <div className="gs-number animate-count-up delay-1" style={{ fontSize: '22px', fontWeight: '900', color: '#06B6D4', textShadow: '0 0 10px rgba(6,182,212,0.5)' }}>
              Hermético 0.00%
            </div>
          </div>
        </div>
      </div>

      {/* ── 1. TANQUES GLASSMORPHISM ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2 className="animate-fade-up" style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers size={22} color="#0284C7" />
          Nivel y Estado Cilíndrico de Tanques (TLS-450 Plus)
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {TANQUES_DATA.map((tk, i) => {
            const isSelected = selectedTanque.id === tk.id;
            return (
              <div
                key={tk.id}
                onClick={() => setSelectedTanque(tk)}
                className={`gs-glass gs-module-card animate-slide-up-card delay-${i + 1} ${isSelected ? 'animate-border-glow' : ''}`}
                style={{
                  borderRadius: '24px',
                  padding: '24px',
                  cursor: 'pointer',
                  border: `2px solid ${isSelected ? tk.color : 'rgba(255,255,255,0.4)'}`,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <span style={{ fontSize: '12px', fontWeight: '900', color: tk.color, backgroundColor: `${tk.color}15`, padding: '4px 10px', borderRadius: '8px' }}>
                      {tk.id}
                    </span>
                    <h3 style={{ margin: '8px 0 0 0', fontSize: '17px', fontWeight: '800', color: colores.textoClaro }}>
                      {tk.tipo}
                    </h3>
                  </div>
                  <div className="pulse-green" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '800', color: '#10B981', backgroundColor: '#D1FAE5', padding: '4px 10px', borderRadius: '8px' }}>
                    <div className="gs-live-dot" style={{ backgroundColor: '#10B981', width: '6px', height: '6px', borderRadius: '50%' }}></div>
                    {tk.estado}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
                  {/* Cilindro 3D */}
                  <div
                    style={{
                      width: '76px',
                      height: '150px',
                      borderRadius: '38px',
                      backgroundColor: 'rgba(255,255,255,0.6)',
                      border: `3px solid rgba(255,255,255,0.8)`,
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      boxShadow: 'inset 0 6px 15px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.05)',
                    }}
                  >
                    <div
                      className="animate-liquid-fill"
                      style={{
                        width: '100%',
                        height: `${tk.porcentaje}%`,
                        backgroundColor: tk.color,
                        background: `linear-gradient(180deg, ${tk.color}ee 0%, ${tk.color} 100%)`,
                        position: 'relative',
                        boxShadow: `0 -5px 15px ${tk.color}60`
                      }}
                    >
                      <div className="animate-wave-surface" style={{
                        position: 'absolute',
                        top: '-4px', left: 0, right: 0, height: '8px',
                        background: 'rgba(255,255,255,0.5)',
                        borderRadius: '50%',
                        filter: 'blur(1px)'
                      }} />
                    </div>
                    
                    <div className="gs-number" style={{
                      position: 'absolute', top: '50%', left: '50%',
                      transform: 'translate(-50%, -50%)',
                      fontSize: '14px', fontWeight: '900',
                      color: tk.porcentaje > 55 ? '#FFFFFF' : '#0F172A',
                      textShadow: tk.porcentaje > 55 ? '0 2px 4px rgba(0,0,0,0.6)' : 'none',
                      zIndex: 2
                    }}>
                      {tk.porcentaje}%
                    </div>
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: colores.textoMedio, fontWeight: '700' }}>Volumen Actual</div>
                      <div className="gs-number animate-count-up" style={{ fontSize: '22px', fontWeight: '900', color: colores.textoClaro, lineHeight: '1.1' }}>
                        {tk.volumenActual.toLocaleString()} L
                      </div>
                      <div style={{ fontSize: '11px', color: colores.textoOscuro, fontWeight: '600' }}>
                        de {tk.capacidadTotal.toLocaleString()} L total
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <div className="pulse-amber" style={{ backgroundColor: 'rgba(255,255,255,0.8)', padding: '8px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.5)', backdropFilter: 'blur(4px)' }}>
                        <div style={{ fontSize: '10px', color: colores.textoMedio, fontWeight: '700' }}>Temp</div>
                        <div className="gs-number" style={{ fontSize: '14px', fontWeight: '900', color: colores.textoClaro }}>{tk.temperatura} °C</div>
                      </div>
                      <div className="pulse-amber" style={{ backgroundColor: 'rgba(255,255,255,0.8)', padding: '8px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.5)', backdropFilter: 'blur(4px)' }}>
                        <div style={{ fontSize: '10px', color: colores.textoMedio, fontWeight: '700' }}>Presión</div>
                        <div className="gs-number" style={{ fontSize: '14px', fontWeight: '900', color: colores.textoClaro }}>{tk.presion} {tk.tipo.includes('GNR') ? 'bar' : 'PSI'}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: `1px solid rgba(0,0,0,0.05)`, paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '700' }}>
                  <span style={{ color: colores.textoMedio, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Activity size={14} color="#059669" /> Autonomía: <span className="gs-number" style={{ color: '#059669' }}>{tk.diasAutonomia} días</span>
                  </span>
                  <span style={{ color: colores.textoMedio }}>
                    Agua Libre: <span className="gs-number" style={{ color: '#0284C7' }}>{tk.aguaLibre} mm</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 2. SALUD DE BOMBAS (DARK METRIC CARDS) Y SEMÁFORO ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '24px' }}>
        
        {/* Panel Bombas */}
        <div className="gs-glass gs-module-card animate-slide-up-card delay-3" style={{ padding: '24px', borderRadius: '24px', border: `1px solid rgba(255,255,255,0.4)` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Gauge size={20} color="#0284C7" />
                Telemetría de Dispensarios (L/min)
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '4px', backgroundColor: 'rgba(0,0,0,0.05)', padding: '4px', borderRadius: '12px' }}>
              {(['todos', 'despachando', 'disponible'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFiltroBomba(f)}
                  style={{
                    border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '800', cursor: 'pointer',
                    backgroundColor: filtroBomba === f ? '#0284C7' : 'transparent',
                    color: filtroBomba === f ? '#FFFFFF' : colores.textoMedio,
                    textTransform: 'capitalize', transition: 'all 0.2s'
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px', maxHeight: '420px', overflowY: 'auto', paddingRight: '4px' }}>
            {bombasFiltradas.map((b, i) => {
              const isDespachando = b.estado === 'DESPACHANDO';
              const isBloqueada = b.estado === 'BLOQUEADA_IA';
              const stateColor = isBloqueada ? '#EF4444' : isDespachando ? '#10B981' : '#94A3B8';
              
              const dashoffset = 125.6 - (b.flujo / 100) * 125.6; // assuming max flow ~100 for gauge

              return (
                <div key={b.id} className="gs-dark-metric animate-fade-up" style={{ 
                  animationDelay: `${i * 100}ms`,
                  padding: '16px', borderRadius: '16px',
                  display: 'flex', flexDirection: 'column', gap: '12px',
                  border: `1px solid ${isDespachando ? 'rgba(16, 185, 129, 0.3)' : isBloqueada ? 'rgba(239, 68, 68, 0.3)' : 'rgba(255,255,255,0.05)'}`,
                  boxShadow: isDespachando ? '0 4px 20px rgba(16, 185, 129, 0.15)' : 'none'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div className={isDespachando ? 'pulse-green' : isBloqueada ? 'pulse-red' : ''} style={{
                        width: '32px', height: '32px', borderRadius: '10px',
                        backgroundColor: `${stateColor}20`,
                        color: stateColor, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: '900', fontSize: '12px'
                      }}>
                        {b.id.replace('BOMBA-', 'B')}
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '800', color: '#F8FAFC' }}>{b.isla}</div>
                        <div style={{ fontSize: '11px', color: '#94A3B8' }}>{b.combustible}</div>
                      </div>
                    </div>
                    {isDespachando && (
                      <div className="gs-live-dot">
                        <div className="animate-ping" style={{ backgroundColor: stateColor, width: '100%', height: '100%', borderRadius: '50%', position: 'absolute' }}></div>
                        <div style={{ backgroundColor: stateColor, width: '8px', height: '8px', borderRadius: '50%', position: 'relative' }}></div>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ position: 'relative', width: '54px', height: '54px' }}>
                       <svg viewBox="0 0 50 50" width="100%" height="100%" style={{ transform: 'rotate(-90deg)' }}>
                        <circle cx="25" cy="25" r="20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                        <circle cx="25" cy="25" r="20" fill="none" stroke={stateColor} strokeWidth="4" strokeLinecap="round"
                          style={{
                            strokeDasharray: 125.6, strokeDashoffset: dashoffset,
                            transition: 'stroke-dashoffset 0.5s ease-out'
                          }} 
                        />
                      </svg>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="gs-number" style={{ fontSize: '20px', fontWeight: '900', color: stateColor }}>
                        {b.flujo > 0 ? b.flujo.toFixed(1) : '0.0'}
                      </div>
                      <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '600' }}>L/min</div>
                    </div>
                  </div>
                  
                  <div style={{ fontSize: '11px', color: isBloqueada ? '#FCA5A5' : '#94A3B8', backgroundColor: 'rgba(0,0,0,0.2)', padding: '6px', borderRadius: '6px', textAlign: 'center' }}>
                    {b.vehiculo}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Semáforo IA */}
        <div className="gs-glass gs-module-card animate-slide-up-card delay-4" style={{ padding: '24px', borderRadius: '24px', border: `1px solid rgba(255,255,255,0.4)`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={20} color="#10B981" />
                Semáforo Ambiental & Detección IA
              </h3>
              <span className="shimmer-badge" style={{ fontSize: '11px', fontWeight: '800', color: '#10B981', backgroundColor: '#D1FAE5', padding: '4px 12px', borderRadius: '8px' }}>
                ASEA CONFORME
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { title: 'Detección de Microfugas Acústica por IA', desc: 'Análisis de firmas de vibración', status: '0 Fugas' },
                { title: 'Espacio Intersticial de Doble Pared', desc: 'Vacío mantenido a -18.2 InHg', status: 'Hermético' },
                { title: 'Sensores de Hidrocarburos en Suelo', desc: '4 Pozos perimetrales activos', status: 'Limpio' }
              ].map((item, idx) => (
                <div key={idx} className="gs-kpi-cell animate-fade-up delay-5" style={{ padding: '16px', borderRadius: '16px', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="gs-live-dot">
                      <div className="animate-ping" style={{ backgroundColor: '#10B981', width: '12px', height: '12px', borderRadius: '50%', position: 'absolute' }}></div>
                      <div style={{ backgroundColor: '#10B981', width: '12px', height: '12px', borderRadius: '50%', position: 'relative' }}></div>
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '900', color: '#065F46' }}>{item.title}</div>
                      <div style={{ fontSize: '12px', color: '#047857', fontWeight: '600' }}>{item.desc}</div>
                    </div>
                  </div>
                  <div className="gs-badge-ok pulse-green" style={{ fontSize: '12px', fontWeight: '900' }}>{item.status}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '16px', border: `1px solid ${colores.borde}`, marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: colores.textoMedio, fontWeight: '600' }}>
              Última prueba hermética automatizada: <strong style={{ color: '#0F172A' }}>03:00 AM (Exitosa)</strong>
            </span>
            <button
              onClick={() => alert('Prueba de diagnóstico de hermeticidad ejecutándose con IA acústica...')}
              style={{
                background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
                color: '#FFFFFF', border: 'none', padding: '8px 16px', borderRadius: '10px',
                fontSize: '12px', fontWeight: '800', cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(2, 132, 199, 0.3)', transition: 'transform 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              Test Rápido
            </button>
          </div>
        </div>
      </div>

      {/* ── 3. BLOCKCHAIN TIMELINE ── */}
      <div className="gs-glass gs-module-card animate-slide-up-card delay-6" style={{ padding: '24px', borderRadius: '24px', border: `1px solid rgba(255,255,255,0.4)` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileCheck size={20} color="#059669" />
              Cadena de Custodia & Trazabilidad Blockchain
            </h3>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: colores.textoMedio, fontWeight: '600' }}>
              Registro inmutable de lotes de combustible con validación criptográfica
            </p>
          </div>
          <span className="shimmer-badge" style={{ fontSize: '12px', fontWeight: '900', color: '#0284C7', backgroundColor: '#E0F2FE', padding: '6px 16px', borderRadius: '10px' }}>
            Smart Contracts Activos
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px', fontSize: '13px' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: colores.textoMedio }}>
                <th style={{ padding: '0 12px 12px 12px', fontWeight: '800' }}>Lote Blockchain</th>
                <th style={{ padding: '0 12px 12px 12px', fontWeight: '800' }}>Fecha/Hora</th>
                <th style={{ padding: '0 12px 12px 12px', fontWeight: '800' }}>Origen / Transporte</th>
                <th style={{ padding: '0 12px 12px 12px', fontWeight: '800' }}>Volumen</th>
                <th style={{ padding: '0 12px 12px 12px', fontWeight: '800' }}>Hash Criptográfico</th>
                <th style={{ padding: '0 12px 12px 12px', fontWeight: '800' }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {BLOCKCHAIN_LOTES.map((b, i) => (
                <tr key={b.id} className="animate-fade-up" style={{ animationDelay: `${i * 150}ms`, backgroundColor: '#F8FAFC', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                  <td style={{ padding: '16px 12px', fontWeight: '900', color: '#0284C7', borderRadius: '12px 0 0 12px' }}>{b.id}</td>
                  <td style={{ padding: '16px 12px', color: colores.textoClaro, fontWeight: '700' }}>{b.fecha}</td>
                  <td style={{ padding: '16px 12px' }}>
                    <div style={{ color: colores.textoClaro, fontWeight: '800' }}>{b.origen}</div>
                    <div style={{ fontSize: '11px', color: colores.textoMedio, fontWeight: '600' }}>{b.pipa}</div>
                  </td>
                  <td style={{ padding: '16px 12px', fontWeight: '900', color: '#059669' }}>{b.volumen}</td>
                  <td style={{ padding: '16px 12px', fontFamily: 'monospace', fontSize: '12px', color: '#64748B', fontWeight: '700' }}>
                    <div className="gs-glass-dark" style={{ display: 'inline-block', padding: '4px 8px', borderRadius: '6px', color: '#A5F3FC' }}>
                      {b.hash.substring(0, 10)}...{b.hash.substring(b.hash.length - 6)}
                    </div>
                  </td>
                  <td style={{ padding: '16px 12px', borderRadius: '0 12px 12px 0' }}>
                    <span className="gs-badge-ok pulse-green" style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '900', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle size={14} /> {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── 4. TICKER DE PRECIOS AL FONDO ── */}
      <div className="animate-fade-up delay-7" style={{ overflow: 'hidden', backgroundColor: '#0F172A', borderRadius: '16px', padding: '12px 0', border: '1px solid #1E293B', display: 'flex', alignItems: 'center' }}>
        <div style={{ padding: '0 20px', fontWeight: '900', color: '#38BDF8', borderRight: '1px solid #334155', whiteSpace: 'nowrap', zIndex: 2, backgroundColor: '#0F172A' }}>
          MERCADO SPOT EN VIVO
        </div>
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <div className="gs-ticker-track" style={{ display: 'flex', gap: '40px', paddingLeft: '20px' }}>
            {[...PRECIOS_ACTUALES, ...PRECIOS_ACTUALES].map((p, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap' }}>
                <span style={{ fontWeight: '800', color: '#F1F5F9' }}>{p.tipo}</span>
                <span className="gs-number" style={{ fontWeight: '900', color: '#10B981' }}>${p.actual.toFixed(2)}</span>
                <span style={{ fontSize: '12px', color: p.variacion.startsWith('+') ? '#10B981' : p.variacion.startsWith('-') ? '#EF4444' : '#94A3B8', fontWeight: '700' }}>
                  {p.variacion}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
