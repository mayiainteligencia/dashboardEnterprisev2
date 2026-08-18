import React, { useState, useEffect } from 'react';
import { Flame, Droplets, Shield, Target, AlertTriangle, CheckCircle, XCircle, Gauge, Activity, Download, Play, RefreshCw, X, Check } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

export const FireExplosionModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [animated, setAnimated] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [isPumpActive, setIsPumpActive] = useState(false);

  const [nfpaSystems, setNfpaSystems] = useState([
    { id: '1', name: 'Rociadores ESFR (Nave 1-4)', status: 'Cumple', desc: 'Densidad 0.60 gpm/ft² probada' },
    { id: '2', name: 'Bomba Diésel NFPA 20 (1,500 GPM)', status: 'Pendiente', desc: 'Prueba de flujo programada' },
    { id: '3', name: 'Red de Hidrantes Perimetral', status: 'Cumple', desc: 'Presión residual 65 PSI en punta' },
    { id: '4', name: 'Detección Temprana por Aspiración', status: 'No Cumple', desc: 'Requiere instalación en mezanine' },
    { id: '5', name: 'Muros Cortafuego 3 Horas', status: 'Cumple', desc: 'Penetraciones selladas UL 1479' },
    { id: '6', name: 'Extintores PQS y CO₂ Certificados', status: 'Cumple', desc: 'Vigencia inspección Q3 2026' }
  ]);

  const escenarios = [
    { name: 'Incendio Confinado (Control Automático)', prob: 85, loss: '$50,000 USD', color: colores.bajo, bg: '#ECFDF5', border: '#A7F3D0' },
    { name: 'Incendio Parcial con Falla de Bomba', prob: 12, loss: '$2,500,000 USD', color: colores.moderado, bg: '#FFFBEB', border: '#FDE68A' },
    { name: 'Incendio Total Catastrófico (PML)', prob: 3, loss: '$45,000,000 USD', color: colores.critico, bg: '#FEF2F2', border: '#FECACA' },
  ];

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 150);
    return () => clearTimeout(t);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAuditNfpa = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setNfpaSystems(prev => prev.map(s => s.status === 'Pendiente' ? { ...s, status: 'Cumple', desc: 'Prueba de flujo 1,500 GPM aprobada satisfactoriamente' } : s));
      setIsAuditing(false);
      showToast('🛡️ Auditoría NFPA completada. Bomba Diésel validada y certificada.');
    }, 1400);
  };

  const handleTogglePump = () => {
    setIsPumpActive(prev => !prev);
    showToast(!isPumpActive ? '🚒 Bomba Diésel NFPA 20 activada. Presión de red establecida a 145 PSI.' : '⏹️ Bomba Diésel en modo de espera automático.');
  };

  const handleDownloadNfpaCert = () => {
    showToast('📄 Certificado de Auditoría Contra Incendio NFPA 13/20/25 generado (PDF).');
  };

  return (
    <div style={{ padding: '28px', backgroundColor: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>
      
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#0F172A',
          color: '#FFFFFF',
          padding: '14px 20px',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
          fontSize: '13px',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 9999,
          animation: 'fadeSlideUp 0.3s ease both'
        }}>
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0 }}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${colores.borde}`, paddingBottom: '16px', animation: 'fadeSlideUp 0.4s ease both' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ padding: '6px', borderRadius: '10px', backgroundColor: '#FEF2F2', display: 'inline-flex' }}>
              <Flame size={24} color={colores.critico} />
            </span>
            Fire &amp; Explosion Risk (NFPA &amp; Protecciones)
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: colores.textoOscuro }}>
            Dashboard 08 · Carga de fuego combustible, rociadores automáticos, red de hidrantes, bombas y simulación de PML por incendio
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleTogglePump}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: `1px solid ${isPumpActive ? '#10B981' : '#F97316'}`,
              backgroundColor: isPumpActive ? '#ECFDF5' : '#FFF7ED',
              color: isPumpActive ? '#047857' : '#C2410C',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Play size={14} />
            {isPumpActive ? 'Bomba en Línea (145 PSI)' : 'Probar Bomba Diésel'}
          </button>

          <button
            onClick={handleAuditNfpa}
            disabled={isAuditing}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: `1px solid ${colores.primario}`,
              backgroundColor: '#EFF6FF',
              color: colores.primario,
              fontSize: '12px',
              fontWeight: '700',
              cursor: isAuditing ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <RefreshCw size={14} style={{ animation: isAuditing ? 'spin 1s linear infinite' : 'none' }} />
            {isAuditing ? 'Auditando...' : 'Auditar NFPA con IA'}
          </button>

          <button
            onClick={handleDownloadNfpaCert}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: colores.primario,
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Download size={14} /> Certificado NFPA
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {[
          { icon: Flame, label: 'Carga de Fuego', value: '850 MJ/m²', color: '#F97316', bg: '#FFF7ED', fill: 71, sub: 'Alto riesgo de carga combustible' },
          { icon: Droplets, label: 'Cobertura Rociadores', value: '92%', color: colores.primario, bg: '#EFF6FF', fill: 92, sub: 'Rociadores ESFR K-25.2' },
          { icon: Shield, label: 'Reserva de Agua', value: '180 m³', color: '#10B981', bg: '#ECFDF5', fill: 85, sub: 'Autonomía de 90 minutos' },
          { icon: Target, label: 'Distancia Hidrante', value: '28 m', color: '#3B82F6', bg: '#EFF6FF', fill: 90, sub: 'Radio normativo < 45m' },
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} style={{
              padding: '18px 20px',
              backgroundColor: '#FFFFFF',
              borderRadius: '14px',
              border: `1px solid ${colores.borde}`,
              borderTop: `3px solid ${kpi.color}`,
              boxShadow: '0 2px 6px rgba(15,23,42,0.04)',
              animation: `fadeSlideUp 0.4s ease ${idx * 0.08}s both`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: colores.textoOscuro, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{kpi.label}</span>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: kpi.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={16} color={kpi.color} />
                </div>
              </div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: colores.textoClaro, marginBottom: '6px' }}>{kpi.value}</div>
              <div style={{ height: '5px', backgroundColor: '#F1F5F9', borderRadius: '3px', overflow: 'hidden', marginBottom: '8px' }}>
                <div style={{ height: '100%', width: animated ? `${kpi.fill}%` : '0%', backgroundColor: kpi.color, borderRadius: '3px', transition: `width 0.8s ease ${0.2 + idx * 0.08}s` }} />
              </div>
              <span style={{ fontSize: '11px', color: colores.textoOscuro }}>{kpi.sub}</span>
            </div>
          );
        })}
      </div>

      {/* Main 2-Col: Gauge + NFPA Systems */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Left: Fire Load Gauge */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '24px',
          border: `1px solid ${colores.borde}`,
          boxShadow: '0 2px 8px rgba(15,23,42,0.04)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          animation: 'fadeSlideUp 0.4s ease 0.3s both',
        }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: colores.textoClaro }}>
              Nivel de Carga de Fuego Ponderada
            </h3>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#EF4444', backgroundColor: '#FEF2F2', padding: '3px 10px', borderRadius: '12px' }}>
              Alto Riesgo
            </span>
          </div>
          
          <div style={{ position: 'relative', width: '260px', height: '140px', overflow: 'hidden', marginTop: '10px' }}>
            <svg viewBox="0 0 200 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#F1F5F9" strokeWidth="18" strokeLinecap="round" />
              <path d="M 130 38 A 80 80 0 0 1 180 100" fill="none" stroke="#FEE2E2" strokeWidth="18" />
              <path 
                d="M 20 100 A 80 80 0 0 1 180 100" 
                fill="none" 
                stroke="#F97316" 
                strokeWidth="18" 
                strokeLinecap="round"
                strokeDasharray="251.2"
                strokeDashoffset={animated ? 251.2 - (251.2 * 0.71) : 251.2}
                style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s' }}
              />
            </svg>
            <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', textAlign: 'center' }}>
              <div style={{ fontSize: '34px', fontWeight: '800', color: '#F97316', lineHeight: 1 }}>850</div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: colores.textoOscuro }}>MJ / m²</div>
            </div>
          </div>

          <div style={{ marginTop: '20px', padding: '14px 18px', backgroundColor: '#FFFBEB', color: '#B45309', borderRadius: '12px', fontSize: '12px', fontWeight: '600', border: '1px solid #FCD34D', width: '100%', textAlign: 'center', lineHeight: 1.4 }}>
            ⚠️ <strong>Alerta de Carga:</strong> Ocupación tipo Almacén Plásticos / Cartón supera umbral estándar de 500 MJ/m². Se requiere mantenimiento estricto de rociadores ESFR.
          </div>
        </div>

        {/* Right: NFPA Systems */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '24px',
          border: `1px solid ${colores.borde}`,
          boxShadow: '0 2px 8px rgba(15,23,42,0.04)',
          animation: 'fadeSlideUp 0.4s ease 0.35s both',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: colores.textoClaro }}>
              Sistemas de Protección &amp; Cumplimiento NFPA
            </h3>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#10B981', backgroundColor: '#ECFDF5', padding: '3px 10px', borderRadius: '12px' }}>
              {nfpaSystems.filter(s => s.status === 'Cumple').length} / {nfpaSystems.length} Conformes
            </span>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {nfpaSystems.map((sys, idx) => {
              const isCumple = sys.status === 'Cumple';
              const isNoCumple = sys.status === 'No Cumple';
              const Icon = isCumple ? CheckCircle : isNoCumple ? XCircle : AlertTriangle;
              const color = isCumple ? '#10B981' : isNoCumple ? '#EF4444' : '#F59E0B';
              const bg = isCumple ? '#ECFDF5' : isNoCumple ? '#FEF2F2' : '#FFFBEB';
              const border = isCumple ? '#A7F3D0' : isNoCumple ? '#FECACA' : '#FDE68A';
              
              return (
                <div 
                  key={sys.id || idx}
                  onClick={() => showToast(`📋 Sistema auditado: ${sys.name} · ${sys.desc}`)}
                  style={{
                    padding: '12px 14px',
                    border: `1px solid ${border}`,
                    backgroundColor: bg,
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    animation: `fadeSlideUp 0.3s ease ${0.4 + idx * 0.05}s both`,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                >
                  <Icon size={18} color={color} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: colores.textoClaro }}>{sys.name}</div>
                    <div style={{ fontSize: '10px', color: colores.textoOscuro, marginTop: '2px' }}>{sys.desc}</div>
                    <span style={{ display: 'inline-block', fontSize: '10px', fontWeight: '800', color, marginTop: '4px' }}>
                      {sys.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Bottom: Escenarios PML */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        padding: '24px',
        border: `1px solid ${colores.borde}`,
        boxShadow: '0 2px 8px rgba(15,23,42,0.04)',
        animation: 'fadeSlideUp 0.4s ease 0.45s both',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: colores.textoClaro }}>
              Simulación de Escenarios de Pérdida Máxima Probable (PML Incendio)
            </h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: colores.textoOscuro }}>
              Modelado probabilístico con y sin intervención de cuerpos de emergencia
            </p>
          </div>
          <span style={{ fontSize: '11px', fontWeight: '700', color: colores.primario, backgroundColor: '#EFF6FF', padding: '4px 12px', borderRadius: '12px' }}>
            Norma FM Global / NFPA
          </span>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {escenarios.map((esc, idx) => (
            <div key={idx} style={{
              padding: '18px',
              borderRadius: '14px',
              border: `1px solid ${esc.border}`,
              backgroundColor: esc.bg,
              animation: `fadeSlideUp 0.3s ease ${0.5 + idx * 0.08}s both`,
            }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: colores.textoClaro, marginBottom: '12px' }}>{esc.name}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '10px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: colores.textoOscuro }}>Impacto Financiero</div>
                  <div style={{ fontSize: '22px', fontWeight: '800', color: esc.color }}>{esc.loss}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: colores.textoOscuro }}>Probabilidad Anual</div>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: esc.color }}>{esc.prob}%</div>
                </div>
              </div>
              <div style={{ height: '6px', backgroundColor: '#FFFFFF', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: animated ? `${esc.prob}%` : '0%', backgroundColor: esc.color, borderRadius: '3px', transition: `width 0.8s ease ${0.6 + idx * 0.1}s` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
