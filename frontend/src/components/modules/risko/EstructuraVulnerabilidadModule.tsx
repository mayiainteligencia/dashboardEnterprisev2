import React, { useState, useEffect } from 'react';
import { Building, ShieldAlert, Activity, Shield, Target, AlertTriangle, CheckCircle, Info, Calendar, GitCommit, Play, Download, Plus, X, RefreshCw } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

export const EstructuraVulnerabilidadModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [loaded, setLoaded] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [simulatedPga, setSimulatedPga] = useState(0.38);
  const [isSimulating, setIsSimulating] = useState(false);
  const [addEventModal, setAddEventModal] = useState(false);
  const [newEventYear, setNewEventYear] = useState('2026');
  const [newEventDesc, setNewEventDesc] = useState('');

  const [timelineEvents, setTimelineEvents] = useState([
    { year: '2008', event: 'Construcción Original (Norma RCDF 2004)', color: colores.primario },
    { year: '2017', event: 'Dictamen Post-Sismo 19S (Sin daño severo)', color: '#10B981' },
    { year: '2021', event: 'Microfisuras registradas en Sótano 2', color: '#EF4444' },
    { year: '2025', event: 'Plan de Refuerzo con Encamisado', color: '#F59E0B' },
    { year: '2026', event: 'Certificación de Resiliencia Estructural', color: '#10B981' }
  ]);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(t);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSimulateEarthquake = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setSimulatedPga(prev => prev === 0.38 ? 0.65 : 0.38);
      setIsSimulating(false);
      showToast(simulatedPga === 0.38 ? '💥 Simulación Sísmica Mw 7.2 ejecutada: PGA incrementado a 0.65g.' : '🔄 Retornado a condición basal de operación (0.38g).');
    }, 1200);
  };

  const handleAddTimelineEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventDesc.trim()) return;

    setTimelineEvents(prev => [...prev, {
      year: newEventYear,
      event: newEventDesc.trim(),
      color: '#10B981'
    }]);

    setAddEventModal(false);
    setNewEventDesc('');
    showToast(`📅 Evento "${newEventDesc}" añadido al histórico estructural.`);
  };

  const kpis = [
    { label: 'Sistema Estructural', value: 'Marcos Dúctiles CR', icon: Building, color: colores.primario, bg: '#EFF6FF', trend: 'Ductilidad Q=4' },
    { label: 'Cimentación', value: 'Pilotes 35m', icon: Activity, color: '#10B981', bg: '#ECFDF5', trend: 'Estrato Firme' },
    { label: 'Año Norma', value: 'RCDF 2004', icon: Calendar, color: '#F59E0B', bg: '#FFFBEB', trend: 'Requiere actualización' },
    { label: 'Índice Vulnerabilidad', value: `${simulatedPga}g PGA`, icon: AlertTriangle, color: simulatedPga > 0.5 ? '#EF4444' : '#F59E0B', bg: simulatedPga > 0.5 ? '#FEF2F2' : '#FFFBEB', trend: simulatedPga > 0.5 ? 'Riesgo Severo' : 'Zona III Arcilla' }
  ];

  const checklist = [
    { item: 'Muros de Cortante en Núcleo', score: 85, color: '#10B981' },
    { item: 'Factor de Ductilidad Declarada', score: 90, color: '#10B981' },
    { item: 'Sección y Armadura en Columnas', score: simulatedPga > 0.5 ? 55 : 70, color: simulatedPga > 0.5 ? '#EF4444' : '#F59E0B' },
    { item: 'Estado de Cimentación Profunda', score: 95, color: '#10B981' },
    { item: 'Irregularidad Geométrica / Torsión', score: 40, color: '#EF4444' },
    { item: 'Junta Sísmica y Colindancias', score: simulatedPga > 0.5 ? 45 : 60, color: simulatedPga > 0.5 ? '#EF4444' : '#F59E0B' }
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
              <Building size={24} color={colores.primario} />
            </span>
            Construcción, Estructura &amp; Vulnerabilidad Sísmica
          </h1>
          <p style={{ margin: '4px 0 0', color: colores.textoOscuro, fontSize: '13px' }}>
            Dashboard 07 · Sistema resistente a cortante, ductilidad, norma de diseño declarada y curvas de fragilidad
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleSimulateEarthquake}
            disabled={isSimulating}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: `1px solid ${simulatedPga > 0.5 ? '#EF4444' : colores.primario}`,
              backgroundColor: simulatedPga > 0.5 ? '#FEF2F2' : '#EFF6FF',
              color: simulatedPga > 0.5 ? '#EF4444' : colores.primario,
              fontSize: '12px',
              fontWeight: '700',
              cursor: isSimulating ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Play size={14} style={{ animation: isSimulating ? 'spin 1s linear infinite' : 'none' }} />
            {isSimulating ? 'Simulando...' : simulatedPga > 0.5 ? 'Restablecer Basal' : 'Simular Sismo Mw 7.2'}
          </button>

          <button
            onClick={() => showToast('📄 Dictamen de Vulnerabilidad Sísmica y Rigidez Estructural generado (PDF).')}
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
            <Download size={14} /> Descargar Dictamen
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
        
        {/* Left: Fragility Curve */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(15,23,42,0.04)', border: `1px solid ${colores.borde}`, animation: 'fadeSlideUp 0.4s ease 0.3s both' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={18} color={colores.primario} /> Curva de Fragilidad Sísmica Dinámica
            </h3>
            <span style={{ fontSize: '11px', fontWeight: '700', color: simulatedPga > 0.5 ? '#EF4444' : '#10B981', backgroundColor: simulatedPga > 0.5 ? '#FEF2F2' : '#ECFDF5', padding: '3px 10px', borderRadius: '12px' }}>
              PGA Operación: {simulatedPga}g
            </span>
          </div>

          <div style={{ position: 'relative', height: '240px', width: '100%', backgroundColor: '#F8FAFC', borderRadius: '12px', overflow: 'hidden', border: `1px solid ${colores.borde}` }}>
            {/* Background bands */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '33.3%', backgroundColor: 'rgba(239, 68, 68, 0.06)' }} />
            <div style={{ position: 'absolute', top: '33.3%', left: 0, width: '100%', height: '33.3%', backgroundColor: 'rgba(245, 158, 11, 0.06)' }} />
            <div style={{ position: 'absolute', top: '66.6%', left: 0, width: '100%', height: '33.3%', backgroundColor: 'rgba(16, 185, 129, 0.06)' }} />
            
            {/* Axes */}
            <div style={{ position: 'absolute', bottom: '30px', left: '40px', width: 'calc(100% - 60px)', borderBottom: `2px solid ${colores.borde}` }} />
            <div style={{ position: 'absolute', bottom: '30px', left: '40px', height: 'calc(100% - 50px)', borderLeft: `2px solid ${colores.borde}` }} />
            
            <span style={{ position: 'absolute', bottom: '6px', left: '50%', transform: 'translateX(-50%)', fontSize: '10px', fontWeight: '700', color: colores.textoOscuro }}>
              Aceleración Sísmica Terreno (PGA - g)
            </span>

            {/* SVG Sigmoid Fragility Curve */}
            <svg style={{ position: 'absolute', top: '15px', left: '40px', width: 'calc(100% - 60px)', height: 'calc(100% - 45px)', overflow: 'visible' }}>
              <path 
                d="M 0 180 C 80 175, 120 120, 180 50 S 260 10, 320 5" 
                fill="none" 
                stroke={colores.primario} 
                strokeWidth="3" 
                strokeDasharray={loaded ? 'none' : '600'}
                strokeDashoffset={loaded ? 0 : 600}
                style={{ transition: 'stroke-dashoffset 1.5s ease-in-out 0.2s' }}
              />
              {/* Operating Point */}
              <circle 
                cx={simulatedPga > 0.5 ? "200" : "120"} 
                cy={simulatedPga > 0.5 ? "40" : "120"} 
                r="7" 
                fill="#EF4444" 
                style={{ animation: 'pulseGlow 2s infinite', transition: 'all 0.8s ease' }} 
              />
              <text 
                x={simulatedPga > 0.5 ? "215" : "135"} 
                y={simulatedPga > 0.5 ? "45" : "115"} 
                fontSize="11" 
                fill={colores.textoClaro} 
                fontWeight="800"
                style={{ transition: 'all 0.8s ease' }}
              >
                Punto de Demanda ({simulatedPga}g)
              </text>
            </svg>
          </div>
        </div>

        {/* Right: Structural Checklist */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(15,23,42,0.04)', border: `1px solid ${colores.borde}`, animation: 'fadeSlideUp 0.4s ease 0.35s both' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', margin: '0 0 16px', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target size={18} color={colores.primario} /> Evaluación de Componentes Estructurales
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {checklist.map((item, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: colores.textoClaro }}>{item.item}</span>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: item.color }}>{item.score}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: '#F1F5F9', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ 
                    height: '100%', 
                    backgroundColor: item.color, 
                    width: loaded ? `${item.score}%` : '0%', 
                    borderRadius: '3px',
                    transition: `width 0.8s ease ${0.4 + idx * 0.08}s`
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom: Timeline */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(15,23,42,0.04)', border: `1px solid ${colores.borde}`, animation: 'fadeSlideUp 0.4s ease 0.45s both' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', margin: 0, color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <GitCommit size={18} color={colores.primario} /> Línea de Tiempo de Dictámenes &amp; Mantenimiento Estructural
          </h3>
          <button
            onClick={() => setAddEventModal(true)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
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
            <Plus size={14} /> Añadir Evento
          </button>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
          {timelineEvents.map((evt, idx) => (
            <div key={idx} style={{ padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: `1px solid ${colores.borde}`, borderTop: `3px solid ${evt.color}` }}>
              <span style={{ fontSize: '14px', fontWeight: '800', color: evt.color, display: 'block', marginBottom: '4px' }}>{evt.year}</span>
              <p style={{ margin: 0, fontSize: '11px', color: colores.textoClaro, fontWeight: '600', lineHeight: 1.3 }}>{evt.event}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL AÑADIR EVENTO HISTÓRICO */}
      {addEventModal && (
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
                Añadir Hito Estructural al Historial
              </h3>
              <button
                onClick={() => setAddEventModal(false)}
                style={{ background: 'none', border: 'none', color: colores.textoOscuro, cursor: 'pointer', padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddTimelineEvent} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: colores.textoOscuro, marginBottom: '4px' }}>
                  Año del Evento
                </label>
                <input
                  type="text"
                  required
                  placeholder="2026"
                  value={newEventYear}
                  onChange={e => setNewEventYear(e.target.value)}
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
                  Descripción del Dictamen o Intervención
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Ej. Reforzamiento con fibras de carbono en vigas secundarias..."
                  value={newEventDesc}
                  onChange={e => setNewEventDesc(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: `1px solid ${colores.borde}`,
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    resize: 'none'
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
                Guardar en Bitácora
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
