import React, { useState, useEffect } from 'react';
import { Users, LogOut, ShieldCheck, Activity, Video, Shield, AlertCircle, FileText, Plus, X, AlertTriangle, CheckCircle2, Play } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

export const OperacionPersonasRCModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [loaded, setLoaded] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedCctvModal, setSelectedCctvModal] = useState<any | null>(null);
  const [reportRcModalOpen, setReportRcModalOpen] = useState(false);
  const [isEvacuationActive, setIsEvacuationActive] = useState(false);
  const [newRcScenario, setNewRcScenario] = useState('');
  const [newRcCost, setNewRcCost] = useState('$20,000 USD');

  const [cctvGrid, setCctvGrid] = useState([
    { id: '1', zone: 'Lobby Principal', status: 'active', cov: '100%', ip: '192.168.10.21', fps: '30 FPS' },
    { id: '2', zone: 'Estacionamiento N1', status: 'active', cov: '90%', ip: '192.168.10.22', fps: '25 FPS' },
    { id: '3', zone: 'Pasillo Piso 2', status: 'offline', cov: '0%', ip: '192.168.10.23', fps: '0 FPS' },
    { id: '4', zone: 'Área de Carga', status: 'active', cov: '85%', ip: '192.168.10.24', fps: '30 FPS' },
    { id: '5', zone: 'Escaleras Emergencia', status: 'active', cov: '100%', ip: '192.168.10.25', fps: '30 FPS' },
    { id: '6', zone: 'Comedor Empleados', status: 'active', cov: '95%', ip: '192.168.10.26', fps: '25 FPS' },
    { id: '7', zone: 'Site Data Center', status: 'active', cov: '100%', ip: '192.168.10.27', fps: '30 FPS' },
    { id: '8', zone: 'Perímetro Exterior', status: 'active', cov: '80%', ip: '192.168.10.28', fps: '30 FPS' }
  ]);

  const [rcRisks, setRcRisks] = useState([
    { id: '1', scenario: 'Caída en Área Común (Piso Mojado)', prob: 'Alta', cost: '$15,000 USD', coverage: 'Cubierto' },
    { id: '2', scenario: 'Falla de Elevador (Atrapamiento de Pasajeros)', prob: 'Media', cost: '$50,000 USD', coverage: 'Cubierto' },
    { id: '3', scenario: 'Daño a Vehículo en Estacionamiento por Inundación', prob: 'Alta', cost: '$25,000 USD', coverage: 'No Cubierto' }
  ]);

  const floors = [
    { level: 'Piso 5 (Roof Garden & Lounge)', occ: 30, color: '#10B981' },
    { level: 'Piso 4 (Oficinas Corporativas B)', occ: 60, color: '#F59E0B' },
    { level: 'Piso 3 (Oficinas Corporativas A)', occ: 45, color: '#10B981' },
    { level: 'Piso 2 (Área de Coworking & Eventos)', occ: 95, color: '#EF4444' },
    { level: 'Piso 1 (Servicios & Comedor)', occ: 80, color: '#F97316' },
    { level: 'Planta Baja (Lobby Principal & Retail)', occ: 100, color: '#EF4444' },
  ];

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(t);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleEvacuation = () => {
    setIsEvacuationActive(prev => !prev);
    showToast(!isEvacuationActive ? '🚨 Protocolo de Evacuación Activado. Señalización acústica y luminosa emitida.' : '✅ Protocolo de Evacuación Finalizado. Normalidad restaurada.');
  };

  const handleAddRcRisk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRcScenario.trim()) return;

    setRcRisks(prev => [...prev, {
      id: Date.now().toString(),
      scenario: newRcScenario.trim(),
      prob: 'Media',
      cost: newRcCost,
      coverage: 'Cubierto'
    }]);

    setReportRcModalOpen(false);
    setNewRcScenario('');
    showToast(`📝 Siniestro RC registrado y asignado al ajustador de póliza.`);
  };

  const kpis = [
    { label: 'Aforo Máximo Permitido', value: '3,200 Pers.', icon: Users, color: colores.primario, bg: '#EFF6FF', trend: 'Ocupación actual: 85%' },
    { label: 'Rutas de Evacuación', value: '4 Libres / 1 Bloq.', icon: LogOut, color: '#F59E0B', bg: '#FFFBEB', trend: '1 Bloqueada en Piso 2' },
    { label: 'Cobertura RC Terceros', value: '$10M USD', icon: ShieldCheck, color: '#10B981', bg: '#ECFDF5', trend: 'Póliza All-Risk Vigente' },
    { label: 'Simulacros Anuales', value: '4 al año', icon: Activity, color: '#6366F1', bg: '#EEF2FF', trend: 'Cumple Protección Civil' }
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
              <Users size={24} color={colores.primario} />
            </span>
            Operación, Personas &amp; Responsabilidad Civil
          </h1>
          <p style={{ margin: '4px 0 0', color: colores.textoOscuro, fontSize: '13px' }}>
            Dashboard 10 · Gestión de aforo, seguridad perimetral CCTV, planes de emergencia y exposición a terceros
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleToggleEvacuation}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: `1px solid ${isEvacuationActive ? '#10B981' : '#EF4444'}`,
              backgroundColor: isEvacuationActive ? '#ECFDF5' : '#FEF2F2',
              color: isEvacuationActive ? '#047857' : '#DC2626',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <AlertTriangle size={14} />
            {isEvacuationActive ? 'Detener Alerta Evacuación' : 'Simular Protocolo Evacuación'}
          </button>

          <button
            onClick={() => setReportRcModalOpen(true)}
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
            <Plus size={14} /> Registrar Siniestro RC
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
              <div style={{ fontSize: '11px', color: kpi.trend.includes('Bloq') ? '#EF4444' : colores.textoOscuro, fontWeight: '600' }}>
                {kpi.trend}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '20px' }}>
        {/* Left: Occupancy Diagram */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(15,23,42,0.04)', border: `1px solid ${colores.borde}`, animation: 'fadeSlideUp 0.4s ease 0.3s both' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', margin: '0 0 16px', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={18} color={colores.primario} /> Ocupación en Tiempo Real por Planta
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {floors.map((floor, idx) => (
              <div 
                key={idx}
                onClick={() => {
                  const next = selectedFloor === idx ? null : idx;
                  setSelectedFloor(next);
                  showToast(next !== null ? `Planta seleccionada: ${floor.level}` : 'Vista global de ocupación');
                }}
                style={{ 
                  height: '38px',
                  border: `1px solid ${selectedFloor === idx ? colores.primario : colores.borde}`,
                  borderRadius: '8px',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  backgroundColor: selectedFloor === idx ? '#EFF6FF' : '#F8FAFC',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ 
                  position: 'absolute', top: 0, left: 0, bottom: 0, backgroundColor: floor.color, opacity: 0.15,
                  width: loaded ? `${floor.occ}%` : '0%', transition: 'width 0.8s ease-out'
                }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 14px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: colores.textoClaro }}>{floor.level}</span>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: floor.color }}>{floor.occ}% Ocupación</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '11px', color: colores.textoOscuro }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '8px', height: '8px', backgroundColor: '#10B981', borderRadius: '2px' }}/> Normal (&lt;50%)</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '8px', height: '8px', backgroundColor: '#F59E0B', borderRadius: '2px' }}/> Denso (50-80%)</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '8px', height: '8px', backgroundColor: '#EF4444', borderRadius: '2px' }}/> Crítico (&gt;80%)</span>
          </div>
        </div>

        {/* Right: CCTV Matrix */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(15,23,42,0.04)', border: `1px solid ${colores.borde}`, animation: 'fadeSlideUp 0.4s ease 0.35s both' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800', margin: 0, color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Video size={18} color={colores.primario} /> Matriz de Monitoreo CCTV &amp; Seguridad
            </h3>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#10B981', backgroundColor: '#ECFDF5', padding: '3px 10px', borderRadius: '12px' }}>
              {cctvGrid.filter(c => c.status === 'active').length} / {cctvGrid.length} Cámaras Online
            </span>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {cctvGrid.map((cam, idx) => (
              <div 
                key={cam.id || idx}
                onClick={() => setSelectedCctvModal(cam)}
                title="Click para ver streaming y registrar incidencia"
                style={{ 
                  border: `1px solid ${cam.status === 'active' ? colores.borde : '#FECACA'}`,
                  borderRadius: '10px',
                  padding: '12px',
                  backgroundColor: cam.status === 'active' ? '#F8FAFC' : '#FEF2F2',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Video size={16} color={cam.status === 'active' ? colores.primario : '#EF4444'} />
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: cam.status === 'active' ? '#10B981' : '#EF4444', animation: cam.status === 'active' ? 'pulseGlow 2s infinite' : 'none' }} />
                </div>
                <div style={{ fontSize: '11px', fontWeight: '700', color: colores.textoClaro, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cam.zone}</div>
                <div style={{ fontSize: '10px', color: colores.textoOscuro }}>Cob: {cam.cov}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom: RC Risks */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(15,23,42,0.04)', border: `1px solid ${colores.borde}`, animation: 'fadeSlideUp 0.4s ease 0.45s both' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '800', margin: '0 0 16px', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Shield size={18} color={colores.primario} /> Matriz de Riesgo de Responsabilidad Civil (RC)
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${colores.borde}`, color: colores.textoOscuro, textAlign: 'left', backgroundColor: '#F8FAFC' }}>
              <th style={{ padding: '10px 14px', fontWeight: '700', fontSize: '11px', textTransform: 'uppercase' }}>Escenario de Exposición</th>
              <th style={{ padding: '10px 14px', fontWeight: '700', fontSize: '11px', textTransform: 'uppercase' }}>Probabilidad</th>
              <th style={{ padding: '10px 14px', fontWeight: '700', fontSize: '11px', textTransform: 'uppercase' }}>Costo Estimado</th>
              <th style={{ padding: '10px 14px', fontWeight: '700', fontSize: '11px', textTransform: 'uppercase' }}>Cobertura en Póliza</th>
            </tr>
          </thead>
          <tbody>
            {rcRisks.map((risk, idx) => (
              <tr key={risk.id || idx} style={{ borderBottom: `1px solid ${colores.borde}` }}>
                <td style={{ padding: '12px 14px', fontWeight: '700', color: colores.textoClaro }}>{risk.scenario}</td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{ padding: '3px 8px', borderRadius: '6px', backgroundColor: risk.prob === 'Alta' ? '#FEF2F2' : '#FFFBEB', color: risk.prob === 'Alta' ? '#EF4444' : '#F59E0B', fontSize: '11px', fontWeight: '800' }}>
                    {risk.prob}
                  </span>
                </td>
                <td style={{ padding: '12px 14px', fontWeight: '800', color: colores.textoClaro }}>{risk.cost}</td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: risk.coverage === 'Cubierto' ? '#10B981' : '#EF4444', fontWeight: '700' }}>
                    {risk.coverage === 'Cubierto' ? <ShieldCheck size={14} /> : <AlertCircle size={14} />}
                    {risk.coverage}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL LIVE CCTV */}
      {selectedCctvModal && (
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
            maxWidth: '520px',
            width: '100%',
            padding: '28px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: `1px solid ${colores.borde}`,
            animation: 'fadeSlideUp 0.3s ease both'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '800', color: selectedCctvModal.status === 'active' ? '#10B981' : '#EF4444', backgroundColor: selectedCctvModal.status === 'active' ? '#ECFDF5' : '#FEF2F2', padding: '2px 8px', borderRadius: '6px' }}>
                  {selectedCctvModal.status === 'active' ? '● En Vivo' : '● Desconectada'} · {selectedCctvModal.fps}
                </span>
                <h3 style={{ margin: '6px 0 0', fontSize: '18px', fontWeight: '800', color: colores.textoClaro }}>
                  Cámara: {selectedCctvModal.zone}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCctvModal(null)}
                style={{ background: 'none', border: 'none', color: colores.textoOscuro, cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{
              height: '220px',
              backgroundColor: '#0F172A',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94A3B8',
              marginBottom: '16px',
              position: 'relative'
            }}>
              <Video size={48} color="#38BDF8" style={{ marginBottom: '8px' }} />
              <span style={{ fontSize: '13px', color: '#E2E8F0', fontWeight: '700' }}>Streaming RTSP Seguro (H.265)</span>
              <span style={{ fontSize: '11px', color: '#64748B' }}>IP: {selectedCctvModal.ip}</span>
              <div style={{ position: 'absolute', top: '10px', left: '12px', color: '#EF4444', fontSize: '11px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444', display: 'inline-block', animation: 'pulseGlow 1.5s infinite' }} /> REC
              </div>
            </div>

            <button
              onClick={() => {
                showToast(`🚨 Incidencia de seguridad reportada en: ${selectedCctvModal.zone}. Cuerpos de guardia alertados.`);
                setSelectedCctvModal(null);
              }}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: '#EF4444',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Reportar Incidencia en Zona
            </button>
          </div>
        </div>
      )}

      {/* MODAL REGISTRAR SINIESTRO RC */}
      {reportRcModalOpen && (
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
            maxWidth: '460px',
            width: '100%',
            padding: '26px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: `1px solid ${colores.borde}`,
            animation: 'fadeSlideUp 0.3s ease both'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colores.textoClaro }}>
                Registrar Siniestro de Responsabilidad Civil
              </h3>
              <button
                onClick={() => setReportRcModalOpen(false)}
                style={{ background: 'none', border: 'none', color: colores.textoOscuro, cursor: 'pointer', padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddRcRisk} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: colores.textoOscuro, marginBottom: '4px' }}>
                  Descripción del Evento / Siniestro
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Resbalón en rampa de acceso peatonal"
                  value={newRcScenario}
                  onChange={e => setNewRcScenario(e.target.value)}
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
                  Costo Estimado de Reclamación
                </label>
                <input
                  type="text"
                  required
                  value={newRcCost}
                  onChange={e => setNewRcCost(e.target.value)}
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
                  padding: '11px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: colores.primario,
                  color: '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  marginTop: '6px'
                }}
              >
                Registrar y Notificar Aseguradora
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
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          50% { box-shadow: 0 0 0 5px rgba(16, 185, 129, 0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
