import React, { useState, useEffect } from 'react';
import { ClipboardCheck, CheckCircle2, AlertTriangle, Clock, Play, ChevronDown, ChevronRight, User, Plus, X, Check, Filter } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';
import { INMUEBLES_SAMPLE } from '../../../risko/riskoData';

export const InspeccionInteligenteModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [animated, setAnimated] = useState(false);
  const [expandedNode, setExpandedNode] = useState<string | null>('n1');
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [newInspectionModal, setNewInspectionModal] = useState(false);
  const [selectedPropId, setSelectedPropId] = useState(INMUEBLES_SAMPLE[0].id);
  const [inspectorName, setInspectorName] = useState('Ing. Mendoza');

  const [workflowStages, setWorkflowStages] = useState([
    { estado: 'Borrador', count: 4, color: '#64748B' },
    { estado: 'Listo para Revisión', count: 6, color: '#F59E0B' },
    { estado: 'Aprobado por Ingeniero', count: 18, color: '#3B82F6' },
    { estado: 'Emitido & Versionado', count: 142, color: '#10B981' },
    { estado: 'Cerrado', count: 672, color: '#2563EB' },
  ]);

  const [hallazgos, setHallazgos] = useState([
    { id: 'h1', titulo: 'Grieta diagonal muro carga S2', severidad: 'Crítica', fecha: 'Hace 2h', inspector: 'Ing. Mendoza', color: '#EF4444', resuelto: false },
    { id: 'h2', titulo: 'Material combustible junto a válvula rociador', severidad: 'Alta', fecha: 'Hace 5h', inspector: 'Dra. Rostova', color: '#F97316', resuelto: false },
    { id: 'h3', titulo: 'Corrosión en lámina de cubierta', severidad: 'Moderada', fecha: 'Hace 1d', inspector: 'Ing. Silva', color: '#F59E0B', resuelto: false },
    { id: 'h4', titulo: 'Obstrucción ruta de evacuación', severidad: 'Alta', fecha: 'Hace 2d', inspector: 'Ing. Garay', color: '#F97316', resuelto: false },
  ]);

  const ARBOL = [
    { id: 'n1', label: 'Ocupación: Almacén Alta Estiba >7.5m', resultado: 'Activa módulo NFPA 13 ESFR & Carga de Fuego Combustible.', color: '#EFF6FF', borderColor: '#BFDBFE' },
    { id: 'n2', label: 'Grieta >2mm en columna de concreto', resultado: 'Activa formulario de localización, foto calibrada e inspección de armadura expuesta.', color: '#FFFBEB', borderColor: '#FCD34D' },
    { id: 'n3', label: 'Antigüedad > 20 años sin reforzamiento', resultado: 'Activa dictamen de vulnerabilidad sísmica acelerada y prueba esclerométrica.', color: '#FEF2F2', borderColor: '#FECACA' }
  ];

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 150);
    return () => clearTimeout(t);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCreateInspection = (e: React.FormEvent) => {
    e.preventDefault();
    const prop = INMUEBLES_SAMPLE.find(p => p.id === selectedPropId);
    setWorkflowStages(prev => prev.map(s => s.estado === 'Borrador' ? { ...s, count: s.count + 1 } : s));
    setNewInspectionModal(false);
    showToast(`📋 Nueva inspección creada para "${prop?.nombre}" asignada a ${inspectorName}.`);
  };

  const handleResolverHallazgo = (id: string, titulo: string) => {
    setHallazgos(prev => prev.map(h => h.id === id ? { ...h, resuelto: true } : h));
    showToast(`✓ Hallazgo "${titulo}" marcado como validado y resuelto.`);
  };

  const total = workflowStages.reduce((s, st) => s + st.count, 0);

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

      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${colores.borde}`, paddingBottom: '16px', animation: 'fadeSlideUp 0.4s ease both' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ padding: '6px', borderRadius: '10px', backgroundColor: '#EFF6FF', display: 'inline-flex' }}>
              <ClipboardCheck size={24} color={colores.primario} />
            </span>
            Inspección Inteligente &amp; Workflow QA de Campo
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: colores.textoOscuro }}>
            Dashboard 06 · Cuestionarios adaptativos, dictámenes de ingeniería y aprobación QA
          </p>
        </div>

        <button
          onClick={() => setNewInspectionModal(true)}
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
          <Plus size={16} /> Nueva Inspección
        </button>
      </div>

      {/* PIPELINE VISUAL */}
      <div style={{ display: 'flex', alignItems: 'stretch', gap: '0', animation: 'fadeSlideUp 0.4s ease 0.1s both', borderRadius: '14px', overflow: 'hidden', border: `1px solid ${colores.borde}` }}>
        {workflowStages.map((stage, i) => {
          const pct = Math.round((stage.count / total) * 100);
          const isSelected = selectedStage === stage.estado;
          return (
            <div 
              key={i} 
              onClick={() => {
                const next = isSelected ? null : stage.estado;
                setSelectedStage(next);
                showToast(next ? `Filtrando inspecciones por etapa: ${next}` : 'Mostrando todas las etapas');
              }}
              style={{
                flex: 1,
                padding: '16px 12px',
                backgroundColor: isSelected ? '#EFF6FF' : i % 2 === 0 ? '#F8FAFC' : '#FFFFFF',
                borderRight: i < workflowStages.length - 1 ? `1px solid ${colores.borde}` : 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                animation: `fadeSlideUp 0.3s ease ${0.15 + i * 0.06}s both`,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: stage.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: '12px', fontWeight: '800' }}>
                {i + 1}
              </div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: isSelected ? colores.primario : colores.textoOscuro, textAlign: 'center', lineHeight: 1.3 }}>{stage.estado}</div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: stage.color }}>{stage.count}</div>
              <div style={{ width: '100%', height: '4px', backgroundColor: '#E2E8F0', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: animated ? `${pct}%` : '0%',
                  backgroundColor: stage.color,
                  borderRadius: '2px',
                  transition: `width 0.8s ease ${0.2 + i * 0.07}s`,
                }} />
              </div>
              <span style={{ fontSize: '10px', color: colores.textoOscuro }}>{pct}% del total</span>
            </div>
          );
        })}
      </div>

      {/* MAIN 2-COL */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>

        {/* LEFT: ÁRBOL ADAPTATIVO */}
        <div style={{
          padding: '24px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: `1px solid ${colores.borde}`,
          boxShadow: '0 2px 6px rgba(15,23,42,0.04)',
          animation: 'fadeSlideUp 0.4s ease 0.45s both',
        }}>
          <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: '800', color: colores.textoClaro }}>
            Árbol de Inspección Adaptativo en Ejecución
          </h3>
          <p style={{ margin: '0 0 16px', fontSize: '12px', color: colores.textoOscuro }}>
            Las preguntas cambian dinámicamente según ocupación, materiales y hallazgos en tiempo real.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {ARBOL.map((node, idx) => (
              <div key={node.id} style={{ animation: `fadeSlideUp 0.3s ease ${0.5 + idx * 0.08}s both` }}>
                <button
                  onClick={() => {
                    const next = expandedNode === node.id ? null : node.id;
                    setExpandedNode(next);
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    backgroundColor: node.color,
                    border: `1px solid ${node.borderColor}`,
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px',
                  }}
                >
                  <span style={{ fontSize: '12px', fontWeight: '700', color: colores.textoClaro }}>🔹 {node.label}</span>
                  {expandedNode === node.id ? <ChevronDown size={14} color={colores.textoOscuro} /> : <ChevronRight size={14} color={colores.textoOscuro} />}
                </button>
                {expandedNode === node.id && (
                  <div style={{
                    padding: '12px 14px',
                    backgroundColor: '#F8FAFC',
                    border: `1px solid ${colores.borde}`,
                    borderTop: 'none',
                    borderRadius: '0 0 10px 10px',
                    fontSize: '12px',
                    color: colores.textoClaro,
                    fontWeight: '600',
                    lineHeight: 1.5,
                  }}>
                    ➜ {node.resultado}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick stats */}
          <div style={{ marginTop: '18px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {[
              { label: 'Inspecciones Activas', value: '8', color: colores.primario },
              { label: 'Hallazgos Críticos', value: `${hallazgos.filter(h => !h.resuelto && h.severidad === 'Crítica').length}`, color: '#EF4444' },
              { label: 'SLAs en Riesgo', value: '3', color: '#F59E0B' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: `1px solid ${colores.borde}`, textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: '800', color: s.color }}>{s.value}</div>
                <div style={{ fontSize: '10px', color: colores.textoOscuro, fontWeight: '700', marginTop: '2px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: HALLAZGOS */}
        <div style={{
          padding: '24px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: `1px solid ${colores.borde}`,
          boxShadow: '0 2px 6px rgba(15,23,42,0.04)',
          animation: 'fadeSlideUp 0.4s ease 0.5s both',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: colores.textoClaro }}>
              Hallazgos de Campo &amp; QA
            </h3>
            <span style={{ fontSize: '11px', fontWeight: '700', backgroundColor: '#FEF2F2', color: '#EF4444', padding: '3px 10px', borderRadius: '12px', border: '1px solid #FCA5A5' }}>
              {hallazgos.filter(h => !h.resuelto).length} Pendientes
            </span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {hallazgos.map((h, idx) => (
              <div key={h.id} style={{
                padding: '14px',
                borderRadius: '12px',
                backgroundColor: h.resuelto ? '#F8FAFC' : '#FFFFFF',
                borderLeft: `4px solid ${h.resuelto ? '#10B981' : h.color}`,
                border: `1px solid ${colores.borde}`,
                opacity: h.resuelto ? 0.7 : 1,
                animation: `fadeSlideUp 0.3s ease ${0.55 + idx * 0.07}s both`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: colores.textoClaro, lineHeight: 1.3 }}>
                    {h.titulo}
                  </span>
                  <span style={{ fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '8px', backgroundColor: h.resuelto ? '#10B981' : h.color, color: '#FFFFFF', flexShrink: 0, marginLeft: '8px' }}>
                    {h.resuelto ? 'Resuelto' : h.severidad}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: colores.textoOscuro, marginTop: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <User size={12} />
                    {h.inspector} · {h.fecha}
                  </div>
                  {!h.resuelto && (
                    <button
                      onClick={() => handleResolverHallazgo(h.id, h.titulo)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: '#EFF6FF',
                        color: colores.primario,
                        fontSize: '11px',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      Aprobar Dictamen
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL NUEVA INSPECCIÓN */}
      {newInspectionModal && (
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
            maxWidth: '480px',
            width: '100%',
            padding: '28px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: `1px solid ${colores.borde}`,
            animation: 'fadeSlideUp 0.3s ease both'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: colores.textoClaro }}>
                Programar Nueva Inspección en Campo
              </h3>
              <button
                onClick={() => setNewInspectionModal(false)}
                style={{ background: 'none', border: 'none', color: colores.textoOscuro, cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateInspection} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: colores.textoOscuro, marginBottom: '6px' }}>
                  Inmueble a Inspeccionar
                </label>
                <select
                  value={selectedPropId}
                  onChange={e => setSelectedPropId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: `1px solid ${colores.borde}`,
                    fontSize: '13px',
                    outline: 'none',
                    backgroundColor: '#FFFFFF',
                    boxSizing: 'border-box'
                  }}
                >
                  {INMUEBLES_SAMPLE.map(i => (
                    <option key={i.id} value={i.id}>{i.nombre} ({i.ubicacion})</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: colores.textoOscuro, marginBottom: '6px' }}>
                  Inspector Responsable
                </label>
                <select
                  value={inspectorName}
                  onChange={e => setInspectorName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: `1px solid ${colores.borde}`,
                    fontSize: '13px',
                    outline: 'none',
                    backgroundColor: '#FFFFFF',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="Ing. Mendoza">Ing. Mendoza (Estructuras)</option>
                  <option value="Dra. Rostova">Dra. Rostova (Protección Incendio NFPA)</option>
                  <option value="Ing. Silva">Ing. Silva (Geotecnia &amp; Suelos)</option>
                  <option value="Ing. Garay">Ing. Garay (Riesgo Eléctrico)</option>
                </select>
              </div>

              <div style={{ padding: '14px', backgroundColor: '#EFF6FF', borderRadius: '10px', fontSize: '12px', color: colores.textoClaro }}>
                📌 El inspector recibirá la orden de trabajo en la app móvil con el árbol de cuestionarios adaptativos correspondiente.
              </div>

              <button
                type="submit"
                style={{
                  padding: '12px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: colores.primario,
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  marginTop: '8px'
                }}
              >
                Crear Inspección y Notificar
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
