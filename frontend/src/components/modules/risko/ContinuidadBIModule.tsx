import React, { useState, useEffect } from 'react';
import { Timer, Clock, ServerCrash, TrendingDown, Play, ArrowRight, CheckCircle2, RefreshCcw, Activity, Download, Plus, X, ShieldAlert, Zap } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

export const ContinuidadBIModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [loaded, setLoaded] = useState(false);
  const [days, setDays] = useState<number>(30);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isN1Active, setIsN1Active] = useState(false);
  const [addDepModal, setAddDepModal] = useState(false);
  const [newFrom, setNewFrom] = useState('');
  const [newTo, setNewTo] = useState('');

  const [dependencies, setDependencies] = useState([
    { id: '1', from: 'Subestación Eléctrica Principal', to: 'Site Data Center ERP', strength: 100, risk: 'Crítico', color: '#EF4444' },
    { id: '2', from: 'Site Data Center ERP', to: 'Línea de Ensamble y Picking', strength: 90, risk: 'Alto', color: '#F97316' },
    { id: '3', from: 'Línea de Ensamble', to: 'Centro de Distribución Logística', strength: 80, risk: 'Medio', color: '#F59E0B' },
    { id: '4', from: 'Distribución Logística', to: 'Entregas a Clientes B2B', strength: 95, risk: 'Alto', color: '#F97316' }
  ]);

  const [roadmap, setRoadmap] = useState([
    { id: '1', phase: 'Fase 1: Reducción RTO', desc: 'Reducir tiempo de recuperación a 7 días mediante switchover automático', status: 'Completado', color: '#10B981' },
    { id: '2', phase: 'Fase 2: Redundancia N+1', desc: 'Instalación de generador diésel secundario 500 kVA con ATS sincronizado', status: 'En Ejecución', color: colores.primario },
    { id: '3', phase: 'Fase 3: DRP Multiregión', desc: 'Replicación activa-activa en cloud híbrido Querétaro / Dallas', status: 'Planificado', color: '#64748B' }
  ]);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(t);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const dailyLoss = isN1Active ? 22000 : 48500;
  const currentLoss = days * dailyLoss;
  let zoneColor = '#10B981';
  let zoneLabel = 'Rango Aceptable (<14d)';
  if (days > 14 && days <= 45) {
    zoneColor = '#F59E0B';
    zoneLabel = 'Alerta RTO Excedido (14-45d)';
  }
  if (days > 45) {
    zoneColor = '#EF4444';
    zoneLabel = 'Zona Crítica MTPD Superado (>45d)';
  }

  const handleToggleN1 = () => {
    setIsN1Active(prev => !prev);
    showToast(!isN1Active ? '⚡ Redundancia N+1 Activada: Pérdida diaria mitigada en un 55% ($22,000 USD/día).' : '🔄 Operación basal estándar ($48,500 USD/día).');
  };

  const handleSimulateOutage = () => {
    setDays(45);
    showToast('⚠️ Simulación de Interrupción Mayor por Suministro Eléctrico (45 días MTPD) ejecutada.');
  };

  const handleAddDependency = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFrom.trim() || !newTo.trim()) return;

    setDependencies(prev => [...prev, {
      id: Date.now().toString(),
      from: newFrom.trim(),
      to: newTo.trim(),
      strength: 85,
      risk: 'Alto',
      color: '#F97316'
    }]);

    setAddDepModal(false);
    setNewFrom('');
    setNewTo('');
    showToast(`🔗 Nueva dependencia mapeada: ${newFrom} ➔ ${newTo}`);
  };

  const kpis = [
    { label: 'MTPD Máximo Tolerable', value: '45 Días', icon: Timer, color: '#EF4444', bg: '#FEF2F2', trend: 'Límite crítico de quiebra' },
    { label: 'RTO Objetivo Recuperación', value: isN1Active ? '7 Días' : '14 Días', icon: Clock, color: '#F59E0B', bg: '#FFFBEB', trend: isN1Active ? 'RTO Optimizado' : 'Tiempo objetivo SLA' },
    { label: 'RPO Pérdida de Datos', value: '4 Horas', icon: ServerCrash, color: colores.primario, bg: '#EFF6FF', trend: 'Backup diferencial continuo' },
    { label: 'Pérdida Diaria por Paro', value: isN1Active ? '$22,000 USD' : '$48,500 USD', icon: TrendingDown, color: isN1Active ? '#10B981' : '#EF4444', bg: isN1Active ? '#ECFDF5' : '#FEF2F2', trend: isN1Active ? '-55% Mitigado' : 'Utilidad bruta cesante' }
  ];

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
            <span style={{ padding: '6px', borderRadius: '10px', backgroundColor: '#EFF6FF', display: 'inline-flex' }}>
              <Clock size={24} color={colores.primario} />
            </span>
            Continuidad de Negocio (BI / Interrupción)
          </h1>
          <p style={{ margin: '4px 0 0', color: colores.textoOscuro, fontSize: '13px' }}>
            Dashboard 11 · Mapeo de dependencias inter-inmueble, MTPD, RTO, RPO y simulador de interrupción
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleToggleN1}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: `1px solid ${isN1Active ? '#10B981' : '#F59E0B'}`,
              backgroundColor: isN1Active ? '#ECFDF5' : '#FFFBEB',
              color: isN1Active ? '#047857' : '#B45309',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Zap size={14} />
            {isN1Active ? 'Redundancia N+1 Activa' : 'Activar Redundancia N+1'}
          </button>

          <button
            onClick={handleSimulateOutage}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: `1px solid ${colores.borde}`,
              backgroundColor: '#F8FAFC',
              color: colores.textoClaro,
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Play size={14} /> Simular Paro Crítico
          </button>

          <button
            onClick={() => showToast('📄 Plan de Continuidad de Negocio DRP ISO 22301 descargado en PDF.')}
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
            <Download size={14} /> Descargar DRP
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} style={{ 
              backgroundColor: '#FFFFFF',
              borderRadius: '14px',
              padding: '18px 20px',
              boxShadow: '0 2px 6px rgba(15,23,42,0.04)',
              border: `1px solid ${colores.borde}`,
              borderTop: `3px solid ${kpi.color}`,
              animation: `fadeSlideUp 0.4s ease ${idx * 0.08}s both`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', color: colores.textoOscuro, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{kpi.label}</span>
                <div style={{ backgroundColor: kpi.bg, padding: '8px', borderRadius: '8px' }}>
                  <Icon size={16} color={kpi.color} />
                </div>
              </div>
              <div style={{ fontSize: '22px', fontWeight: '800', marginBottom: '4px', color: colores.textoClaro }}>{kpi.value}</div>
              <div style={{ fontSize: '11px', color: colores.textoOscuro, fontWeight: '600' }}>
                {kpi.trend}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
        {/* Left: BI Simulator */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(15,23,42,0.04)', border: `1px solid ${colores.borde}`, animation: 'fadeSlideUp 0.4s ease 0.3s both' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800', margin: 0, color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Play size={18} color={colores.primario} /> Simulador Interactivo de Paro Operativo BI
            </h3>
            <span style={{ fontSize: '11px', fontWeight: '700', backgroundColor: zoneColor + '15', color: zoneColor, padding: '3px 10px', borderRadius: '12px' }}>
              {zoneLabel}
            </span>
          </div>
          
          <div style={{ textAlign: 'center', padding: '18px', backgroundColor: '#F8FAFC', borderRadius: '14px', border: `1px solid ${colores.borde}`, marginBottom: '20px' }}>
            <div style={{ fontSize: '12px', color: colores.textoOscuro, fontWeight: '600', marginBottom: '4px' }}>Pérdida por Interrupción Calculada</div>
            <div style={{ fontSize: '36px', fontWeight: '800', color: zoneColor, lineHeight: 1.1 }}>
              ${currentLoss.toLocaleString()} USD
            </div>
            <div style={{ fontSize: '12px', color: colores.textoOscuro, marginTop: '6px' }}>
              ({days} días × ${dailyLoss.toLocaleString()} USD/día de paro {isN1Active && '· Mitigado con N+1'})
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '700', color: colores.textoClaro, marginBottom: '8px' }}>
              <span>Días de Interrupción Estimados: {days} días</span>
              <span style={{ color: colores.textoOscuro }}>180 días máx</span>
            </div>
            <input 
              type="range" 
              min="1" max="180" 
              value={days} 
              onChange={(e) => setDays(Number(e.target.value))}
              style={{ width: '100%', accentColor: colores.primario }}
            />
          </div>

          {/* Limits Progress Bar */}
          <div style={{ position: 'relative', height: '32px', backgroundColor: '#F1F5F9', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ 
              position: 'absolute', top: 0, left: 0, height: '100%', 
              backgroundColor: zoneColor, opacity: 0.25, width: `${(days / 180) * 100}%`, transition: 'width 0.2s, background-color 0.2s' 
            }} />
            
            {/* RTO Marker (14d) */}
            <div style={{ position: 'absolute', left: `${(14 / 180) * 100}%`, top: 0, bottom: 0, width: '2px', backgroundColor: '#F59E0B' }} />
            
            {/* MTPD Marker (45d) */}
            <div style={{ position: 'absolute', left: `${(45 / 180) * 100}%`, top: 0, bottom: 0, width: '2px', backgroundColor: '#EF4444' }} />

            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', fontSize: '11px', fontWeight: '700', pointerEvents: 'none' }}>
              <span style={{ color: '#047857' }}>RTO ({isN1Active ? '7d' : '14d'})</span>
              <span style={{ color: '#EF4444' }}>MTPD (45d)</span>
            </div>
          </div>
        </div>

        {/* Right: Dependency Map */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(15,23,42,0.04)', border: `1px solid ${colores.borde}`, animation: 'fadeSlideUp 0.4s ease 0.35s both' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800', margin: 0, color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={18} color={colores.primario} /> Mapeo de Interdependencias
            </h3>
            <button
              onClick={() => setAddDepModal(true)}
              style={{
                padding: '5px 10px',
                borderRadius: '6px',
                border: `1px solid ${colores.primario}`,
                backgroundColor: '#EFF6FF',
                color: colores.primario,
                fontSize: '11px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Plus size={12} /> Añadir
            </button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {dependencies.map((dep, idx) => (
              <div 
                key={dep.id || idx} 
                onClick={() => showToast(`🔗 Dependencia seleccionada: ${dep.from} ➔ ${dep.to} (Criticidad: ${dep.risk})`)}
                style={{ padding: '12px', border: `1px solid ${colores.borde}`, borderRadius: '10px', backgroundColor: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'all 0.15s ease' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#EFF6FF'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F8FAFC'}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: colores.textoClaro }}>{dep.from}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: colores.textoOscuro, fontSize: '10px', marginTop: '2px' }}>
                    <ArrowRight size={10} /> {dep.to}
                  </div>
                </div>
                <span style={{ 
                  fontSize: '10px', fontWeight: '800', padding: '3px 8px', borderRadius: '6px',
                  backgroundColor: dep.color + '15',
                  color: dep.color,
                  border: `1px solid ${dep.color}40`,
                }}>
                  {dep.risk}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom: Roadmap */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(15,23,42,0.04)', border: `1px solid ${colores.borde}`, animation: 'fadeSlideUp 0.4s ease 0.45s both' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '800', margin: '0 0 18px', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <RefreshCcw size={18} color={colores.primario} /> Roadmap de Resiliencia &amp; Continuidad Operativa
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {roadmap.map((item, idx) => (
            <div 
              key={item.id || idx} 
              onClick={() => showToast(`📋 Fase seleccionada: ${item.phase} (${item.status})`)}
              style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: `1px solid ${colores.borde}`, borderLeft: `4px solid ${item.color}`, cursor: 'pointer', transition: 'all 0.15s ease' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#EFF6FF'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F8FAFC'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: '800', color: colores.textoClaro }}>{item.phase}</span>
                <span style={{ fontSize: '10px', fontWeight: '800', padding: '2px 8px', borderRadius: '6px', backgroundColor: item.color + '15', color: item.color }}>
                  {item.status}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '11px', color: colores.textoOscuro, lineHeight: 1.4 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL AÑADIR DEPENDENCIA */}
      {addDepModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '20px',
          animation: 'fadeIn 0.2s ease both'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            maxWidth: '440px',
            width: '100%',
            padding: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: `1px solid ${colores.borde}`,
            animation: 'fadeSlideUp 0.3s ease both'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colores.textoClaro }}>
                Añadir Enlace de Dependencia Operativa
              </h3>
              <button
                onClick={() => setAddDepModal(false)}
                style={{ background: 'none', border: 'none', color: colores.textoOscuro, cursor: 'pointer', padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddDependency} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: colores.textoOscuro, marginBottom: '4px' }}>
                  Origen (Activo o Sistema Crítico)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Tanque de Almacenamiento Agua"
                  value={newFrom}
                  onChange={e => setNewFrom(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: `1px solid ${colores.borde}`,
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: colores.textoOscuro, marginBottom: '4px' }}>
                  Destino (Operación Impactada)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Línea de Enfriamiento de Calderas"
                  value={newTo}
                  onChange={e => setNewTo(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: `1px solid ${colores.borde}`,
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: colores.primario,
                  color: '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  marginTop: '4px'
                }}
              >
                Vincular en Grafo de Dependencias
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
