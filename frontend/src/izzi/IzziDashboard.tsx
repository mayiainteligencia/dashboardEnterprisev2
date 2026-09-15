import React, { useEffect, useState } from 'react';
import { HeroCard } from '../components/modules/dashboardModules/Herocard';
import { MODULOS_IZZI, ALERTAS_IZZI, type ModuloIzzi } from './izziData';
import { brandingConfig } from '../config/branding';
import {
  Eye, Bot, UserCheck, Tv, Camera, Database,
  GraduationCap, LayoutGrid, Activity, Compass, AlertCircle, ArrowRight
} from 'lucide-react';

const { colores, temas } = brandingConfig;

const iconMap: Record<string, any> = {
  Eye, Bot, UserCheck, Tv, Camera, Database, GraduationCap, LayoutGrid, Activity, Compass,
};

// Animated counter hook
function useCountUp(target: number, duration = 1400, delay = 0) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        setVal(Math.floor(ease * target));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timer);
  }, [target, duration, delay]);
  return val;
}

// Metric Banner with animated counter
function MetricBanner({ label, value, suffix = '' }: { label: string; value: number; suffix?: string }) {
  const count = useCountUp(value, 1800, 300);
  return (
    <div>
      <div style={{ fontSize: '11px', textTransform: 'uppercase', opacity: 0.8, fontWeight: '600', letterSpacing: '0.05em' }}>{label}</div>
      <div style={{ fontSize: '22px', fontWeight: '900', letterSpacing: '-0.5px' }}>
        {count.toLocaleString()}{suffix}
      </div>
    </div>
  );
}

interface IzziDashboardProps {
  onSelectModulo: (moduloId: string) => void;
}

export const IzziDashboard: React.FC<IzziDashboardProps> = ({ onSelectModulo }) => {
  const [, setTick] = useState(0);

  // Force re-render for live feel (every 5s)
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 5000);
    return () => clearInterval(id);
  }, []);

  const gravityColor = (g: string) =>
    g === 'critica' ? '#E3067A' : g === 'advertencia' ? '#FF6C07' : '#0090D0';

  return (
    <div style={{ backgroundColor: '#FFFFFF', padding: '24px', minHeight: '100%', borderRadius: '18px' }}>

      {/* ── TICKER BAR ── */}
      <div style={{
        background: 'linear-gradient(90deg, #FF6C07, #0090D0, #E3067A, #FCD116, #53267E, #FF6C07)',
        backgroundSize: '300% 100%',
        borderRadius: '10px',
        padding: '8px 0',
        marginBottom: '20px',
        overflow: 'hidden',
        animation: 'shimmer 4s linear infinite',
      }}>
        <div className="ticker-wrapper">
          <span className="ticker-content" style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: '700', letterSpacing: '0.08em' }}>
            &nbsp;&nbsp;&nbsp;&nbsp;● IZZI M2C EN VIVO &nbsp;·&nbsp; 120 PUNTOS MONITOREADOS &nbsp;·&nbsp; 16,840 VISITAS 24H &nbsp;·&nbsp; RED HÍBRIDA &amp; FIBRA 15M+ HOGARES &nbsp;·&nbsp; 60+ CIUDADES ACTIVAS &nbsp;·&nbsp; ARPU PROMEDIO $520 MXN &nbsp;·&nbsp; DISPONIBILIDAD DE SENSORES 99.7% &nbsp;·&nbsp; ● IZZI M2C EN VIVO &nbsp;·&nbsp; 120 PUNTOS MONITOREADOS &nbsp;·&nbsp; 16,840 VISITAS 24H &nbsp;·&nbsp; RED HÍBRIDA &amp; FIBRA 15M+ HOGARES &nbsp;·&nbsp;
          </span>
        </div>
      </div>

      {/* ── 1. WELCOME BANNER ── */}
      <div
        className="animate-slide-up"
        style={{
          background: 'linear-gradient(135deg, #53267E 0%, #E3067A 50%, #0090D0 100%)',
          borderRadius: '20px',
          padding: '28px 32px',
          color: '#FFFFFF',
          marginBottom: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 12px 40px rgba(227, 6, 122, 0.25)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', right: '-60px', top: '-60px',
          width: '240px', height: '240px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', right: '80px', bottom: '-80px',
          width: '180px', height: '180px', borderRadius: '50%',
          background: 'rgba(255,108,7,0.18)', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', left: '40%', top: '-30px',
          width: '120px', height: '120px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)', pointerEvents: 'none'
        }} />
        {/* Shimmer overlay */}
        <div className="shimmer-bg" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontSize: '11px', fontWeight: '700', textTransform: 'uppercase',
            letterSpacing: '2px', opacity: 0.85, marginBottom: '6px',
            display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            <span className="live-dot" style={{ width: '7px', height: '7px' }} />
            Centro de Control M2C · Grupo Televisa
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: '900', margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
            ¡Bienvenido a izzi!
          </h1>
          <p style={{ fontSize: '14px', margin: 0, opacity: 0.9, maxWidth: '600px', lineHeight: 1.5 }}>
            Plataforma Inteligente de Transformación de Puntos de Venta · Centros de Atención, Islas y Corners · powered by <strong>MAYIA &amp; Retail Innova</strong>
          </p>
        </div>

        {/* Live Metrics */}
        <div style={{
          display: 'flex', gap: '0', position: 'relative', zIndex: 1,
          backgroundColor: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(12px)',
          padding: '16px 24px', borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.18)',
          flexShrink: 0
        }}>
          <div style={{ padding: '0 20px', textAlign: 'center' }}>
            <MetricBanner label="Hogares Pasados" value={15} suffix="M+" />
          </div>
          <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.2)', margin: '4px 0' }} />
          <div style={{ padding: '0 20px', textAlign: 'center' }}>
            <MetricBanner label="Suscriptores" value={6} suffix=".2M+" />
          </div>
          <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.2)', margin: '4px 0' }} />
          <div style={{ padding: '0 20px', textAlign: 'center' }}>
            <MetricBanner label="Puntos Activos" value={120} suffix="" />
          </div>
        </div>
      </div>

      {/* ── 2. ASISTENTE INTELIGENTE (HEROCARD) ── */}
      <div className="animate-slide-up delay-2" style={{ marginBottom: '32px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '820px' }}>
          <HeroCard
            tema={temas.admin}
            onNavigate={(id) => onSelectModulo(id)}
            secciones={MODULOS_IZZI.map(m => ({ id: m.id, titulo: m.titulo }))}
          />
        </div>
      </div>

      {/* ── 3. ALERTAS OPERATIVAS ── */}
      <div className="animate-slide-up delay-3" style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{
            fontSize: '17px', fontWeight: '800', color: colores.textoClaro,
            margin: 0, display: 'flex', alignItems: 'center', gap: '10px'
          }}>
            <AlertCircle size={20} color="#E3067A" />
            Alertas del Sistema M2C izzi
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="live-dot" style={{ width: '8px', height: '8px' }} />
            <span style={{ fontSize: '12px', fontWeight: '600', color: colores.textoMedio }}>
              {ALERTAS_IZZI.length} eventos en vivo
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {ALERTAS_IZZI.map((al, idx) => (
            <div
              key={al.id}
              onClick={() => onSelectModulo(al.moduloId)}
              className="card-hover animate-slide-up"
              style={{
                animationDelay: `${0.05 * idx + 0.3}s`,
                backgroundColor: '#FFFFFF',
                border: `1px solid ${colores.borde}`,
                borderLeft: `4px solid ${gravityColor(al.gravedad)}`,
                borderRadius: '14px',
                padding: '16px',
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = `0 6px 20px ${gravityColor(al.gravedad)}22`;
                e.currentTarget.style.borderColor = gravityColor(al.gravedad);
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)';
                e.currentTarget.style.borderColor = colores.borde;
                e.currentTarget.style.borderLeftColor = gravityColor(al.gravedad);
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: colores.textoMedio, marginBottom: '6px' }}>
                <span style={{ fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span
                    style={{
                      width: '7px', height: '7px', borderRadius: '50%',
                      backgroundColor: gravityColor(al.gravedad), display: 'inline-block'
                    }}
                  />
                  {al.ubicacion || 'General'}
                </span>
                <span style={{ color: colores.textoOscuro }}>{al.hora}</span>
              </div>
              <div style={{ fontSize: '13.5px', fontWeight: '700', color: colores.textoClaro, marginBottom: '5px' }}>
                {al.titulo}
              </div>
              <div style={{ fontSize: '12px', color: colores.textoMedio, lineHeight: 1.5 }}>
                {al.descripcion}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: gravityColor(al.gravedad), display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Ver módulo <ArrowRight size={11} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 4. GRID DE MÓDULOS ── */}
      <div className="animate-slide-up delay-4">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: colores.textoClaro, margin: 0 }}>
            Módulos de Inteligencia Comercial &amp; Operativa izzi
          </h3>
          <span style={{
            backgroundColor: '#FDEAF2', color: '#E3067A',
            fontSize: '11px', fontWeight: '800', padding: '3px 10px', borderRadius: '20px'
          }}>
            {MODULOS_IZZI.length} módulos activos
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '20px' }}>
          {MODULOS_IZZI.map((modulo: ModuloIzzi, idx: number) => {
            const IconoComp = iconMap[modulo.iconoName] || Activity;
            const delayClass = `delay-${Math.min(idx + 1, 10)}`;

            return (
              <div
                key={modulo.id}
                onClick={() => onSelectModulo(modulo.id)}
                className={`card-hover animate-fade-scale ${delayClass}`}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: `1px solid ${colores.borde}`,
                  borderRadius: '18px',
                  padding: '0',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = `0 12px 32px ${modulo.color}28`;
                  e.currentTarget.style.borderColor = `${modulo.color}60`;
                  e.currentTarget.style.transform = 'translateY(-5px) scale(1.006)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)';
                  e.currentTarget.style.borderColor = colores.borde;
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                {/* Top accent bar */}
                <div style={{
                  height: '4px',
                  background: `linear-gradient(90deg, ${modulo.color}, ${modulo.color}88)`,
                }} />

                <div style={{ padding: '20px' }}>
                  {/* Header row */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div style={{
                      backgroundColor: `${modulo.color}15`,
                      width: '46px', height: '46px', borderRadius: '13px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: `1px solid ${modulo.color}25`,
                    }}>
                      <IconoComp size={22} color={modulo.color} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
                      {modulo.alertas > 0 && (
                        <span className="badge-pulse" style={{
                          backgroundColor: '#FDEAF2', color: '#E3067A',
                          fontSize: '11px', fontWeight: '800',
                          padding: '3px 9px', borderRadius: '12px',
                          border: '1px solid #FACADA',
                        }}>
                          {modulo.alertas} alerta{modulo.alertas > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h4 style={{ fontSize: '15px', fontWeight: '800', color: colores.textoClaro, margin: '0 0 3px 0', lineHeight: 1.2 }}>
                    {modulo.titulo}
                  </h4>
                  <div style={{ fontSize: '11.5px', fontWeight: '700', color: modulo.color, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                    {modulo.subtitulo}
                  </div>
                  <p style={{ fontSize: '12px', color: colores.textoMedio, margin: '0 0 16px 0', lineHeight: 1.5, minHeight: '36px' }}>
                    {modulo.descripcion}
                  </p>

                  {/* KPI grid */}
                  <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px',
                    paddingTop: '14px', borderTop: `1px solid ${colores.borde}`,
                    marginBottom: '14px'
                  }}>
                    {modulo.kpis.map((kpi, kIdx) => (
                      <div key={kIdx} style={{
                        backgroundColor: `${modulo.color}08`,
                        borderRadius: '8px', padding: '8px 6px',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '10px', color: colores.textoMedio, fontWeight: '500', marginBottom: '3px' }}>{kpi.label}</div>
                        <div style={{ fontSize: '13px', fontWeight: '900', color: colores.textoClaro }}>{kpi.valor}</div>
                        {kpi.cambio && (
                          <div style={{ fontSize: '10px', fontWeight: '700', color: modulo.color, marginTop: '2px' }}>
                            {kpi.cambio}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
                    gap: '5px', fontSize: '12px', fontWeight: '800', color: modulo.color,
                  }}>
                    Abrir Módulo <ArrowRight size={13} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
