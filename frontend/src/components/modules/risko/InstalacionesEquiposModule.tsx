import React, { useState, useEffect } from 'react';
import { Zap, AlertTriangle, Thermometer, Fan, Battery, Server, ArrowUpCircle, Flame, Clock, Play, Download, Plus, X, Wrench, CheckCircle2 } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

export const InstalacionesEquiposModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [loaded, setLoaded] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedEquipmentModal, setSelectedEquipmentModal] = useState<any | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [newScheduleType, setNewScheduleType] = useState('');
  const [newScheduleDate, setNewScheduleDate] = useState('15 Oct 2026');

  const [equipments, setEquipments] = useState([
    { id: '1', name: 'Subestación Eléctrica 1500 kVA', icon: Zap, status: 'Operativo', date: '21/08/2026', temp: '45°C', color: '#10B981', bg: '#ECFDF5', border: '#A7F3D0', desc: 'Transformador seco en baño de resina epóxica.', isSpof: false },
    { id: '2', name: 'Planta Diésel Emergencia 500 kW', icon: Battery, status: 'Alerta', date: '20/08/2026', temp: '82°C', color: '#F59E0B', bg: '#FFFBEB', border: '#FDE68A', desc: 'Temperatura en múltiple de escape sobre límite recomendado.', isSpof: false },
    { id: '3', name: 'Sistema HVAC Central Chiller A', icon: Fan, status: 'SPOF', date: '19/08/2026', temp: '95°C', color: '#EF4444', bg: '#FEF2F2', border: '#FECACA', desc: 'Sobrecalentamiento en rodamiento del compresor secundario.', isSpof: true },
    { id: '4', name: 'Tanque GLP 10,000L', icon: Flame, status: 'Operativo', date: '22/08/2026', temp: '25°C', color: '#10B981', bg: '#ECFDF5', border: '#A7F3D0', desc: 'Válvula de alivio y sellos hidrostáticos certificados.', isSpof: false },
    { id: '5', name: 'UPS Data Center 120 kVA', icon: Server, status: 'SPOF', date: '18/08/2026', temp: '68°C', color: '#EF4444', bg: '#FEF2F2', border: '#FECACA', desc: 'Celda 4 de baterías con degradación acelerada.', isSpof: true },
    { id: '6', name: 'Batería Elevadores (6 Unidades)', icon: ArrowUpCircle, status: 'Operativo', date: '23/08/2026', temp: '32°C', color: '#10B981', bg: '#ECFDF5', border: '#A7F3D0', desc: 'Cables de tracción y frenos de emergencia probados.', isSpof: false }
  ]);

  const [maintenanceSchedule, setMaintenanceSchedule] = useState([
    { date: '10 Sep 2026', type: 'Mantenimiento Preventivo HVAC', priority: '#EF4444' },
    { date: '15 Sep 2026', type: 'Prueba de Carga Planta Diésel', priority: '#F59E0B' },
    { date: '22 Sep 2026', type: 'Inspección Válvulas Tanque GLP', priority: '#10B981' },
    { date: '01 Oct 2026', type: 'Termografía Infrarroja Tableros', priority: '#3B82F6' }
  ]);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(t);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRunScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      showToast('📷 Escaneo Termográfico Infrarrojo FLIR completado. Matriz de temperaturas actualizada.');
    }, 1500);
  };

  const handleCreateWorkOrder = (equipmentName: string) => {
    setSelectedEquipmentModal(null);
    showToast(`🛠️ Orden de Trabajo Correctiva creada para: ${equipmentName}. Notificado a mantenimiento.`);
  };

  const handleAddSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newScheduleType.trim()) return;

    setMaintenanceSchedule(prev => [...prev, {
      date: newScheduleDate,
      type: newScheduleType.trim(),
      priority: '#2563EB'
    }]);

    setScheduleModalOpen(false);
    setNewScheduleType('');
    showToast(`📅 Mantenimiento programado para el ${newScheduleDate}.`);
  };

  const kpis = [
    { label: 'Subestación 1500 kVA', value: 'Operativa', icon: Zap, color: '#10B981', bg: '#ECFDF5', trend: 'Sin puntos calientes' },
    { label: 'SPOF Detectados', value: `${equipments.filter(e => e.isSpof).length} Críticos`, icon: AlertTriangle, color: '#EF4444', bg: '#FEF2F2', trend: 'Requiere N+1' },
    { label: 'Último Scan Termográfico', value: 'Hace 3 días', icon: Thermometer, color: colores.primario, bg: '#EFF6FF', trend: 'Cámara FLIR T865' },
    { label: 'Eficiencia HVAC Central', value: '87%', icon: Fan, color: '#F59E0B', bg: '#FFFBEB', trend: 'Mantenimiento req.' }
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
            <span style={{ padding: '6px', borderRadius: '10px', backgroundColor: '#FFFBEB', display: 'inline-flex' }}>
              <Zap size={24} color="#F59E0B" />
            </span>
            Instalaciones &amp; Equipos Críticos (Termografía)
          </h1>
          <p style={{ margin: '4px 0 0', color: colores.textoOscuro, fontSize: '13px' }}>
            Dashboard 09 · Tableros eléctricos, transformadores, gas, HVAC, subestaciones y puntos únicos de falla (SPOF)
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleRunScan}
            disabled={isScanning}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: `1px solid ${colores.primario}`,
              backgroundColor: '#EFF6FF',
              color: colores.primario,
              fontSize: '12px',
              fontWeight: '700',
              cursor: isScanning ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Thermometer size={14} />
            {isScanning ? 'Escaneando...' : 'Ejecutar Scan Termográfico'}
          </button>

          <button
            onClick={() => setScheduleModalOpen(true)}
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
            <Plus size={14} /> Programar Mantenimiento
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
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }}>
        {/* Left: Equipment Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
          {equipments.map((eq, idx) => {
            const Icon = eq.icon;
            return (
              <div 
                key={eq.id || idx} 
                onClick={() => setSelectedEquipmentModal(eq)}
                title="Click para ver telemetría y generar orden de trabajo"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  borderRadius: '14px',
                  padding: '16px',
                  boxShadow: '0 2px 6px rgba(15,23,42,0.04)',
                  border: `1px solid ${colores.borde}`,
                  borderLeft: `4px solid ${eq.color}`,
                  animation: `fadeSlideUp 0.4s ease ${0.2 + idx * 0.06}s both`,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ padding: '8px', backgroundColor: eq.bg, borderRadius: '8px', color: eq.color }}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 2px', fontSize: '13px', fontWeight: '700', color: colores.textoClaro }}>{eq.name}</h4>
                      <span style={{ fontSize: '11px', color: colores.textoOscuro }}>Scan: {eq.date}</span>
                    </div>
                  </div>
                  {eq.isSpof && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444', animation: 'pulseGlow 1.5s infinite' }} />}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                  <span style={{ padding: '3px 8px', backgroundColor: eq.bg, color: eq.color, borderRadius: '6px', fontSize: '11px', fontWeight: '700' }}>
                    {eq.status}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: '800', color: eq.temp.includes('95') || eq.temp.includes('82') ? '#EF4444' : colores.textoClaro }}>
                    {eq.temp}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Termografía */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(15,23,42,0.04)', border: `1px solid ${colores.borde}`, animation: 'fadeSlideUp 0.4s ease 0.35s both' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', margin: '0 0 16px', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Thermometer size={18} color="#F59E0B" /> Escáner Termográfico Infrarrojo (HVAC)
          </h3>
          <div style={{ 
            width: '100%', height: '200px', borderRadius: '12px', position: 'relative', overflow: 'hidden',
            background: 'linear-gradient(135deg, #1E3A8A 0%, #059669 35%, #D97706 70%, #DC2626 100%)',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3)'
          }}>
            {/* Hotspots */}
            <div 
              onClick={() => showToast('🔴 Hotspot Cojinete B: 95°C. Supera umbral admisible de 75°C.')}
              style={{ position: 'absolute', top: '35%', left: '68%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white', animation: 'pulseGlow 2s infinite' }}>
                <span style={{ fontSize: '10px', fontWeight: '800', color: '#FFFFFF' }}>95°C</span>
              </div>
              <span style={{ fontSize: '9px', fontWeight: '700', color: '#FFFFFF', marginTop: '2px', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>Cojinete B</span>
            </div>
            
            <div 
              onClick={() => showToast('🟢 Sensor Cojinete A: 42°C. Operación normal.')}
              style={{ position: 'absolute', top: '65%', left: '30%', transform: 'translate(-50%, -50%)', cursor: 'pointer' }}
            >
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.7)' }}>
                <span style={{ fontSize: '9px', color: '#FFFFFF', fontWeight: '700' }}>42°C</span>
              </div>
            </div>
          </div>
          <p style={{ fontSize: '12px', color: colores.textoOscuro, marginTop: '14px', textAlign: 'center', lineHeight: 1.4 }}>
            🔴 <strong>Punto caliente crítico</strong> detectado en cojinete del motor compresor B. Recomendación: Intervención mecánica en &lt; 48 hrs.
          </p>
        </div>
      </div>

      {/* Bottom: Maintenance Schedule */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(15,23,42,0.04)', border: `1px solid ${colores.borde}`, animation: 'fadeSlideUp 0.4s ease 0.45s both' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '800', margin: '0 0 18px', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={18} color={colores.primario} /> Cronograma de Intervenciones y Mantenimientos Críticos
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {maintenanceSchedule.map((item, idx) => (
            <div key={idx} style={{ padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: `1px solid ${colores.borde}`, borderLeft: `4px solid ${item.priority}` }}>
              <div style={{ fontSize: '11px', color: colores.textoOscuro, fontWeight: '700', marginBottom: '4px' }}>{item.date}</div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: colores.textoClaro }}>{item.type}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL DETALLE DE EQUIPO */}
      {selectedEquipmentModal && (
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
            maxWidth: '500px',
            width: '100%',
            padding: '28px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: `1px solid ${colores.borde}`,
            animation: 'fadeSlideUp 0.3s ease both'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '800', color: selectedEquipmentModal.color, backgroundColor: selectedEquipmentModal.bg, padding: '3px 8px', borderRadius: '6px' }}>
                  Estado: {selectedEquipmentModal.status} {selectedEquipmentModal.isSpof && '· Punto Único de Falla (SPOF)'}
                </span>
                <h3 style={{ margin: '6px 0 2px', fontSize: '18px', fontWeight: '800', color: colores.textoClaro }}>
                  {selectedEquipmentModal.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEquipmentModal(null)}
                style={{ background: 'none', border: 'none', color: colores.textoOscuro, cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '18px' }}>
              <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: `1px solid ${colores.borde}` }}>
                <span style={{ fontSize: '11px', color: colores.textoOscuro, display: 'block' }}>Temperatura Actual</span>
                <span style={{ fontSize: '20px', fontWeight: '800', color: selectedEquipmentModal.temp.includes('95') ? '#EF4444' : colores.textoClaro }}>
                  {selectedEquipmentModal.temp}
                </span>
              </div>
              <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: `1px solid ${colores.borde}` }}>
                <span style={{ fontSize: '11px', color: colores.textoOscuro, display: 'block' }}>Último Escaneo FLIR</span>
                <span style={{ fontSize: '14px', fontWeight: '700', color: colores.textoClaro }}>
                  {selectedEquipmentModal.date}
                </span>
              </div>
            </div>

            <div style={{ padding: '14px', backgroundColor: '#EFF6FF', borderRadius: '10px', fontSize: '12px', color: colores.textoClaro, marginBottom: '20px' }}>
              ℹ️ {selectedEquipmentModal.desc}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => handleCreateWorkOrder(selectedEquipmentModal.name)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: colores.primario,
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Wrench size={16} /> Generar Orden de Trabajo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PROGRAMAR MANTENIMIENTO */}
      {scheduleModalOpen && (
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
                Programar Nueva Intervención
              </h3>
              <button
                onClick={() => setScheduleModalOpen(false)}
                style={{ background: 'none', border: 'none', color: colores.textoOscuro, cursor: 'pointer', padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddSchedule} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: colores.textoOscuro, marginBottom: '4px' }}>
                  Fecha Estimada
                </label>
                <input
                  type="text"
                  required
                  value={newScheduleDate}
                  onChange={e => setNewScheduleDate(e.target.value)}
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
                  Tipo de Mantenimiento / Equipo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Cambio de Aceite Dieléctrico en Subestación"
                  value={newScheduleType}
                  onChange={e => setNewScheduleType(e.target.value)}
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
                Registrar en Cronograma
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
