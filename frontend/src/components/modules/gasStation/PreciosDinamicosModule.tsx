import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  MapPin,
  Bot,
  Zap,
  Sliders,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Radio,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Fuel,
  Cpu
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Cell
} from 'recharts';
import { brandingConfig } from '../../../config/branding';
import { PRECIOS_ACTUALES, COMPETENCIA_MAPA, DECISIONES_AGENTICAS } from '../../../gasStation/gasStationData';

export const PreciosDinamicosModule: React.FC = () => {
  const { colores } = brandingConfig;
  
  // States para simulación real-time
  const [margenObjetivo, setMargenObjetivo] = useState(2.85);
  const [autoPricing, setAutoPricing] = useState(true);
  const [preciosActuales, setPreciosActuales] = useState(PRECIOS_ACTUALES);
  
  // Simulación de fluctuación cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setMargenObjetivo(prev => prev + (Math.random() * 0.04 - 0.02));
      setPreciosActuales(prev => prev.map(p => ({
        ...p,
        actual: p.actual + (Math.random() * 0.02 - 0.01),
        sugeridoIA: p.sugeridoIA + (Math.random() * 0.02 - 0.01)
      })));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const chartData = preciosActuales.map(p => ({
    tipo: p.tipo.split(' ')[0],
    'Precio Nuestra Estación': Number(p.actual.toFixed(2)),
    'Sugerido IA': Number(p.sugeridoIA.toFixed(2)),
    'Promedio Competencia': Number(p.competenciaProm.toFixed(2)),
  }));

  // Toggle animation
  const handleToggleAuto = () => setAutoPricing(!autoPricing);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* ── HEADER DEL MÓDULO ── */}
      <div
        className="animate-gradient-bg gs-glass-dark"
        style={{
          background: `linear-gradient(135deg, ${colores.ambarAlerta} 0%, #78350F 50%, #1E293B 100%)`,
          backgroundSize: '200% 200%',
          borderRadius: '24px',
          padding: '24px 30px',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #F59E0B, #FCD34D)' }} className="animate-scan" />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              className="pulse-amber"
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              <TrendingUp size={30} color="#FCD34D" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '900', letterSpacing: '-0.5px' }}>
                  Motor de Precios Dinámicos & IA
                </h1>
                <span className="shimmer-badge" style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)', color: '#FCD34D', border: '1px solid rgba(245, 158, 11, 0.5)' }}>
                  TÓTEM LED SINCRONIZADO
                </span>
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                Optimización en tiempo real de márgenes y decisiones agénticas autónomas
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div className="gs-kpi-cell animate-fade-up delay-1" style={{ background: 'rgba(0,0,0,0.4)', borderColor: 'rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>
                Margen / Litro
              </div>
              <div className="gs-number gs-gradient-text" style={{ fontSize: '24px', backgroundImage: 'linear-gradient(90deg, #10B981, #34D399)' }}>
                ${margenObjetivo.toFixed(4)}
              </div>
            </div>
            
            <div className="gs-kpi-cell animate-fade-up delay-2" style={{ background: 'rgba(0,0,0,0.4)', borderColor: 'rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px' }}>
                Auto-Pricing IA
              </div>
              <div 
                onClick={handleToggleAuto}
                style={{ 
                  width: '60px', height: '28px', borderRadius: '14px', 
                  background: autoPricing ? '#10B981' : '#475569',
                  position: 'relative', cursor: 'pointer',
                  transition: 'background 0.3s'
                }}>
                <div style={{
                  width: '24px', height: '24px', borderRadius: '50%', background: '#FFF',
                  position: 'absolute', top: '2px', left: autoPricing ? '34px' : '2px',
                  transition: 'left 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}/>
              </div>
            </div>
          </div>
        </div>
        
        {/* Ticker de precios estilo bolsa */}
        <div style={{ marginTop: '10px', background: 'rgba(0,0,0,0.6)', borderRadius: '12px', padding: '10px', overflow: 'hidden', whiteSpace: 'nowrap', border: '1px solid rgba(255,255,255,0.05)' }}>
           <div className="gs-ticker-track" style={{ display: 'inline-block', fontSize: '14px', fontWeight: 'bold', color: '#FCD34D' }}>
              {preciosActuales.map((p, i) => (
                <span key={i} style={{ margin: '0 20px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <Fuel size={14}/> {p.tipo}: ${p.actual.toFixed(2)} <span style={{color: '#10B981', fontSize: '12px'}}>({p.variacion})</span>
                </span>
              ))}
              {/* Duplicado para loop sin fin */}
               {preciosActuales.map((p, i) => (
                <span key={`dup-${i}`} style={{ margin: '0 20px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <Fuel size={14}/> {p.tipo}: ${p.actual.toFixed(2)} <span style={{color: '#10B981', fontSize: '12px'}}>({p.variacion})</span>
                </span>
              ))}
           </div>
        </div>
      </div>

      {/* ── 1. DISPLAY TÓTEM DIGITAL (Precios Actuales) ── */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: colores.textoClaro, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Radio size={20} className="pulse-amber" color={colores.ambarAlerta} />
          Display Tótem LED en Vivo
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {preciosActuales.map((p, idx) => {
             const esMejorQueComp = p.actual <= p.competenciaProm;
             return (
              <div key={idx} className={`gs-module-card animate-slide-up-card delay-${idx + 1}`} style={{ background: '#0F172A', borderColor: '#1E293B', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ color: p.tipo.includes('Magna') ? '#10B981' : p.tipo.includes('Premium') ? '#EF4444' : p.tipo.includes('Diésel') ? '#94A3B8' : '#3B82F6', fontWeight: '800', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {p.tipo}
                  </div>
                  <div className="gs-live-dot">
                     <div className="ping" style={{ backgroundColor: p.tipo.includes('Magna') ? '#10B981' : p.tipo.includes('Premium') ? '#EF4444' : p.tipo.includes('Diésel') ? '#94A3B8' : '#3B82F6' }} />
                     <div className="dot" style={{ backgroundColor: p.tipo.includes('Magna') ? '#10B981' : p.tipo.includes('Premium') ? '#EF4444' : p.tipo.includes('Diésel') ? '#94A3B8' : '#3B82F6' }} />
                  </div>
                </div>
                
                <div className="animate-neon-glow" style={{ fontSize: '42px', fontWeight: '900', color: '#FFFFFF', margin: '12px 0', fontFamily: 'monospace', textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>
                  {p.actual.toFixed(2)}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px' }}>
                  <span style={{ color: '#94A3B8' }}>Sugerido IA: <strong style={{color: '#FCD34D'}}>${p.sugeridoIA.toFixed(2)}</strong></span>
                  <span style={{ color: esMejorQueComp ? '#10B981' : '#EF4444', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold' }}>
                    {esMejorQueComp ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
                    vs Comp
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 2. GRÁFICA Y RADAR COMPETENCIA ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '20px' }}>
        
        {/* Gráfica */}
        <div className="gs-module-card animate-slide-up-card delay-3 gs-glass" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colores.textoClaro }}>
                Análisis de Precio Competitivo
              </h3>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: colores.textoMedio }}>Estación vs IA vs Mercado Local</p>
            </div>
            <div className="shimmer-badge gs-badge-ok">Ventaja Activa</div>
          </div>

          <div style={{ height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradNuestra" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#047857" stopOpacity={0.8}/>
                  </linearGradient>
                  <linearGradient id="gradIA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#B45309" stopOpacity={0.8}/>
                  </linearGradient>
                  <linearGradient id="gradComp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#94A3B8" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#475569" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="tipo" stroke="#475569" fontSize={12} fontWeight={700} />
                <YAxis stroke="#94A3B8" fontSize={11} domain={['dataMin - 1', 'dataMax + 1']} tickFormatter={(v) => `$${v}`} />
                <Tooltip 
                  formatter={(val: any) => [`$${val} MXN/L`, '']} 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', color: '#fff', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }} 
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="Precio Nuestra Estación" fill="url(#gradNuestra)" radius={[6, 6, 0, 0]} barSize={20} />
                <Bar dataKey="Sugerido IA" fill="url(#gradIA)" radius={[6, 6, 0, 0]} barSize={20} />
                <Bar dataKey="Promedio Competencia" fill="url(#gradComp)" radius={[6, 6, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar Competencia */}
        <div className="gs-module-card animate-slide-up-card delay-4 gs-glass" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={20} className="pulse-red" color="#EF4444" />
              Radar Competencia Local
            </h3>
            <span style={{ fontSize: '12px', color: colores.textoMedio, fontWeight: '600' }}>Radio: 5 km</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1, overflowY: 'auto', paddingRight: '4px' }}>
            {COMPETENCIA_MAPA.map((c, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px 16px',
                  borderRadius: '16px',
                  background: c.lider ? 'linear-gradient(90deg, #F0FDF4 0%, #FFFFFF 100%)' : '#F8FAFC',
                  border: `1px solid ${c.lider ? '#86EFAC' : '#E2E8F0'}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: c.lider ? '0 4px 12px rgba(16, 185, 129, 0.1)' : 'none',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className={c.lider ? "animate-pulse" : ""} style={{ width: '36px', height: '36px', borderRadius: '10px', background: c.lider ? '#10B981' : '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Fuel size={18} color={c.lider ? '#FFF' : '#64748B'} />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '800', color: c.lider ? '#065F46' : colores.textoClaro, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {c.nombre} {c.lider && <span className="shimmer-badge" style={{fontSize:'10px', padding:'2px 6px'}}>LÍDER</span>}
                    </div>
                    <div style={{ fontSize: '12px', color: colores.textoMedio, marginTop: '2px' }}>
                      Dist: {c.distancia} • Margen: <strong style={{color: c.margen==='Óptimo'?'#10B981':'#F59E0B'}}>{c.margen}</strong>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                   <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 'bold' }}>MAGNA</div>
                   <div style={{ fontSize: '14px', fontWeight: '900', color: c.lider ? '#10B981' : '#0F172A' }}>${c.magna.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. PANEL DE DECISIONES AGÉNTICAS ── */}
      <div className="gs-module-card animate-slide-up-card delay-5 gs-glass" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={22} color="#0284C7" className="animate-spin-slow" />
              Decisiones Autónomas del Agente IA (MAYIA)
            </h3>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: colores.textoMedio }}>
              Log en tiempo real de ajustes de precio, órdenes de compra y acciones de mantenimiento
            </p>
          </div>
          <div className="gs-badge-ok flame-badge-glow" style={{ padding: '6px 12px', background: '#E0F2FE', color: '#0284C7', borderColor: '#BAE6FD' }}>
            <Sparkles size={14} style={{ display: 'inline', marginRight: '4px' }} />
            Multi-Agente Activo
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {DECISIONES_AGENTICAS.map((d, idx) => (
            <div
              key={idx}
              className="fspm-card"
              style={{
                padding: '16px',
                borderRadius: '16px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderLeft: `4px solid ${d.estado.includes('Ejecutado') ? '#10B981' : d.estado.includes('Aprobado') ? '#0284C7' : d.estado.includes('Bloqueo') ? '#EF4444' : '#F59E0B'}`,
                boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Bot size={16} color="#64748B" />
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>
                    {d.agente}
                  </span>
                </div>
                <span style={{ fontSize: '12px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} /> {d.hora}
                </span>
              </div>
              
              <div>
                <div style={{ fontSize: '14px', fontWeight: '800', color: colores.textoClaro, marginBottom: '4px', lineHeight: '1.4' }}>
                  {d.accion}
                </div>
                <div style={{ fontSize: '12.5px', color: colores.textoMedio, lineHeight: '1.4' }}>
                  {d.motivo}
                </div>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px dashed #E2E8F0', display: 'flex', justifyContent: 'flex-end' }}>
                <span style={{ 
                  padding: '4px 10px', 
                  borderRadius: '6px', 
                  fontSize: '11px', 
                  fontWeight: '800', 
                  backgroundColor: d.estado.includes('Ejecutado') ? '#D1FAE5' : d.estado.includes('Aprobado') ? '#E0F2FE' : d.estado.includes('Bloqueo') ? '#FEE2E2' : '#FEF3C7', 
                  color: d.estado.includes('Ejecutado') ? '#059669' : d.estado.includes('Aprobado') ? '#0369A1' : d.estado.includes('Bloqueo') ? '#DC2626' : '#D97706',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  {d.estado.includes('Ejecutado') || d.estado.includes('Aprobado') ? <CheckCircle size={12}/> : <AlertCircle size={12}/>}
                  {d.estado}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
