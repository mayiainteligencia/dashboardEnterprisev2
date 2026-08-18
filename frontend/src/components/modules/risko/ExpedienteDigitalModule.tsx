import React, { useState, useEffect } from 'react';
import { FileText, Shield, AlertTriangle, CheckCircle, Box, MapPin, Target, Building2, Calendar, DollarSign, Award, Layers, Download, Upload, RefreshCw, X, CheckCircle2, Sparkles } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';
import { INMUEBLES_SAMPLE } from '../../../risko/riskoData';

export const ExpedienteDigitalModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [selectedPropertyId, setSelectedPropertyId] = useState(INMUEBLES_SAMPLE[0].id);
  const [animated, setAnimated] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newDocName, setNewDocName] = useState('');
  const [newDocType, setNewDocType] = useState('Dictamen Estructural');
  const [evaluatingScore, setEvaluatingScore] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  const [documentChecklist, setDocumentChecklist] = useState([
    { id: '1', name: 'Póliza All-Risk Empresarial 2026', status: 'ok', vigencia: 'Vigente hasta Dic 2026', icon: CheckCircle, color: '#10B981' },
    { id: '2', name: 'Dictamen de Estabilidad Estructural', status: 'ok', vigencia: 'RCDF 2023 / Aprobado', icon: CheckCircle, color: '#10B981' },
    { id: '3', name: 'Plan Interno de Protección Civil', status: 'expired', vigencia: 'Requiere actualización anual', icon: AlertTriangle, color: '#EF4444' },
    { id: '4', name: 'Certificado de Red NFPA 25', status: 'ok', vigencia: 'Inspección Q3 2026', icon: CheckCircle, color: '#10B981' },
    { id: '5', name: 'Avalúo Comercial y VRN Certificado', status: 'ok', vigencia: 'Emitido Ene 2026', icon: CheckCircle, color: '#10B981' },
  ]);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 150);
    return () => clearTimeout(t);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const selectedProperty = INMUEBLES_SAMPLE.find(p => p.id === selectedPropertyId) || INMUEBLES_SAMPLE[0];

  const getScoreColor = (score: number) => {
    if (score < 40) return '#10B981';
    if (score < 60) return '#F59E0B';
    if (score < 80) return '#F97316';
    return '#EF4444';
  };

  const scoreColor = getScoreColor(selectedProperty.scoreRiesgo);

  const handleUploadDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim()) return;

    const newDoc = {
      id: Date.now().toString(),
      name: newDocName.trim(),
      status: 'ok',
      vigencia: 'Vigente / Validado por IA',
      icon: CheckCircle,
      color: '#10B981',
    };

    setDocumentChecklist(prev => [newDoc, ...prev]);
    setUploadModalOpen(false);
    setNewDocName('');
    showToast(`✅ Documento "${newDoc.name}" cargado y validado en el Gemelo Digital`);
  };

  const handleReevaluateScore = () => {
    setEvaluatingScore(true);
    setTimeout(() => {
      setEvaluatingScore(false);
      showToast(`⚡ Re-evaluación IA completada para ${selectedProperty.nombre}. Score optimizado.`);
    }, 1500);
  };

  const handleDownloadExpediente = () => {
    setDownloadingPdf(true);
    setTimeout(() => {
      setDownloadingPdf(false);
      showToast(`📥 Expediente Digital Completo (${selectedProperty.nombre}) descargado en PDF.`);
    }, 1800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '28px', backgroundColor: '#FFFFFF', minHeight: '100vh', position: 'relative' }}>
      
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
              <FileText size={24} color={colores.primario} />
            </span>
            Alta y Expediente Digital (Gemelo de Riesgo)
          </h1>
          <p style={{ margin: '4px 0 0', color: colores.textoOscuro, fontSize: '13px' }}>
            Dashboard 02 · Identidad, dimensiones, ocupación, valores y completitud documental por activo
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={handleReevaluateScore}
            disabled={evaluatingScore}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: `1px solid ${colores.primario}`,
              backgroundColor: '#EFF6FF',
              color: colores.primario,
              fontSize: '12px',
              fontWeight: '700',
              cursor: evaluatingScore ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <RefreshCw size={14} style={{ animation: evaluatingScore ? 'spin 1s linear infinite' : 'none' }} />
            {evaluatingScore ? 'Re-evaluando...' : 'Re-evaluar Score con IA'}
          </button>

          <button
            onClick={handleDownloadExpediente}
            disabled={downloadingPdf}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: colores.primario,
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: '700',
              cursor: downloadingPdf ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Download size={14} />
            {downloadingPdf ? 'Descargando...' : 'Descargar Expediente PDF'}
          </button>
        </div>
      </div>

      {/* KPI Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {[
          { icon: FileText, label: 'Completitud Documental', value: '94%', color: colores.primario, bg: '#EFF6FF', fill: 94, sub: `${documentChecklist.length} documentos auditados` },
          { icon: DollarSign, label: 'Valor Reposición VRN', value: selectedProperty.valorReposicion, color: '#10B981', bg: '#ECFDF5', fill: 100, sub: 'Valuación SOFOVAL' },
          { icon: Layers, label: 'Superficie Construida', value: selectedProperty.superficieConstruida, color: '#F59E0B', bg: '#FFFBEB', fill: 80, sub: `${selectedProperty.niveles} niveles` },
          { icon: Shield, label: 'Mitigaciones Activas', value: `${selectedProperty.mitigacionesAbiertas} Abiertas`, color: '#F97316', bg: '#FFF7ED', fill: 60, sub: 'Control de SLAs' },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} style={{
              padding: '18px 20px',
              backgroundColor: '#FFFFFF',
              borderRadius: '14px',
              border: `1px solid ${colores.borde}`,
              borderTop: `3px solid ${kpi.color}`,
              boxShadow: '0 2px 6px rgba(15,23,42,0.04)',
              animation: `fadeSlideUp 0.4s ease ${i * 0.08}s both`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ color: colores.textoOscuro, fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{kpi.label}</span>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: kpi.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={16} color={kpi.color} />
                </div>
              </div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: colores.textoClaro, marginBottom: '6px' }}>{kpi.value}</div>
              <div style={{ height: '5px', backgroundColor: '#F1F5F9', borderRadius: '3px', overflow: 'hidden', marginBottom: '8px' }}>
                <div style={{ height: '100%', width: animated ? `${kpi.fill}%` : '0%', backgroundColor: kpi.color, borderRadius: '3px', transition: `width 0.8s ease ${0.2 + i * 0.08}s` }} />
              </div>
              <span style={{ fontSize: '11px', color: colores.textoOscuro }}>{kpi.sub}</span>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }}>
        
        {/* Left Panel - Tabs & Ficha Técnica */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Property selector buttons */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {INMUEBLES_SAMPLE.map((prop) => (
              <button
                key={prop.id}
                onClick={() => {
                  setSelectedPropertyId(prop.id);
                  showToast(`📍 Activo cambiado a: ${prop.nombre}`);
                }}
                style={{
                  padding: '8px 14px',
                  borderRadius: '10px',
                  border: `1px solid ${selectedPropertyId === prop.id ? colores.primario : colores.borde}`,
                  backgroundColor: selectedPropertyId === prop.id ? colores.primario : '#F8FAFC',
                  color: selectedPropertyId === prop.id ? '#FFFFFF' : colores.textoMedio,
                  cursor: 'pointer',
                  fontWeight: '700',
                  fontSize: '12px',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Building2 size={13} />
                {prop.nombre}
              </button>
            ))}
          </div>

          {/* Ficha Técnica Card */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(15,23,42,0.04)',
            border: `1px solid ${colores.borde}`,
            animation: 'fadeSlideUp 0.4s ease 0.3s both',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px', borderBottom: `1px solid ${colores.borde}`, paddingBottom: '14px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Building2 size={18} color={colores.primario} />
                  {selectedProperty.nombre}
                </h3>
                <span style={{ fontSize: '12px', color: colores.textoOscuro }}>ID: {selectedProperty.id} · Tipología: {selectedProperty.tipo}</span>
              </div>
              <span style={{
                padding: '4px 10px',
                borderRadius: '8px',
                backgroundColor: scoreColor + '15',
                color: scoreColor,
                fontWeight: '800',
                fontSize: '12px',
                border: `1px solid ${scoreColor}40`,
              }}>
                Clase {selectedProperty.claseAsegurabilidad} · Riesgo {selectedProperty.nivelRiesgo}
              </span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', fontSize: '13px' }}>
              <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: `1px solid ${colores.borde}` }}>
                <span style={{ color: colores.textoOscuro, fontSize: '11px', display: 'block', fontWeight: '600' }}>Ubicación Geográfica</span>
                <span style={{ fontWeight: '700', color: colores.textoClaro, marginTop: '2px', display: 'block' }}>{selectedProperty.ubicacion}</span>
              </div>
              <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: `1px solid ${colores.borde}` }}>
                <span style={{ color: colores.textoOscuro, fontSize: '11px', display: 'block', fontWeight: '600' }}>Superficie &amp; Niveles</span>
                <span style={{ fontWeight: '700', color: colores.textoClaro, marginTop: '2px', display: 'block' }}>{selectedProperty.superficieConstruida} ({selectedProperty.niveles} Niveles)</span>
              </div>
              <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: `1px solid ${colores.borde}` }}>
                <span style={{ color: colores.textoOscuro, fontSize: '11px', display: 'block', fontWeight: '600' }}>Año de Construcción</span>
                <span style={{ fontWeight: '700', color: colores.textoClaro, marginTop: '2px', display: 'block' }}>{selectedProperty.anioConstruccion}</span>
              </div>
              <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: `1px solid ${colores.borde}` }}>
                <span style={{ color: colores.textoOscuro, fontSize: '11px', display: 'block', fontWeight: '600' }}>Inspector Asignado</span>
                <span style={{ fontWeight: '700', color: colores.primario, marginTop: '2px', display: 'block' }}>{selectedProperty.inspectorAsignado}</span>
              </div>
            </div>

            {/* Score Radial Gauge */}
            <div style={{ marginTop: '24px', padding: '18px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: `1px solid ${colores.borde}`, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: colores.textoOscuro, display: 'block', marginBottom: '8px' }}>Score Global de Riesgo</span>
                <div style={{ position: 'relative', width: '160px', height: '80px', margin: '0 auto', overflow: 'hidden' }}>
                  <svg viewBox="0 0 200 100" style={{ width: '100%', height: '100%' }}>
                    <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#E2E8F0" strokeWidth="18" strokeLinecap="round" />
                    <path 
                      d="M 20 100 A 80 80 0 0 1 180 100" 
                      fill="none" 
                      stroke={scoreColor} 
                      strokeWidth="18" 
                      strokeLinecap="round"
                      strokeDasharray="251.2"
                      strokeDashoffset={animated ? 251.2 - (251.2 * selectedProperty.scoreRiesgo / 100) : 251.2}
                      style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s' }}
                    />
                  </svg>
                  <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', textAlign: 'center', fontSize: '26px', fontWeight: '800', color: scoreColor }}>
                    {selectedProperty.scoreRiesgo} <span style={{ fontSize: '12px', color: colores.textoOscuro }}>/ 100</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                <div><strong>AAL Estimado:</strong> <span style={{ color: colores.primario }}>{selectedProperty.aal}</span></div>
                <div><strong>PML Máximo:</strong> <span style={{ color: colores.critico, fontWeight: '700' }}>{selectedProperty.pml}</span></div>
                <div><strong>Clase de Asegurabilidad:</strong> <span style={{ color: scoreColor, fontWeight: '800' }}>Clase {selectedProperty.claseAsegurabilidad}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Doc Checklist */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(15,23,42,0.04)',
          border: `1px solid ${colores.borde}`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          animation: 'fadeSlideUp 0.4s ease 0.35s both',
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Target size={18} color={colores.primario} />
                  Checklist Documental IA
                </h3>
              </div>
              <button
                onClick={() => setUploadModalOpen(true)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: colores.primario,
                  color: '#FFFFFF',
                  fontSize: '11px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Upload size={12} /> Cargar Doc
              </button>
            </div>

            {/* Circular Progress Indicator */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <div style={{ position: 'relative', width: '100px', height: '100px' }}>
                <svg viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#F1F5F9" strokeWidth="10" />
                  <circle 
                    cx="60" cy="60" r="50" 
                    fill="none" 
                    stroke={colores.primario} 
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray="314.16"
                    strokeDashoffset={animated ? 314.16 - (314.16 * 0.94) : 314.16}
                    style={{ transition: 'stroke-dashoffset 1.4s ease-out 0.2s' }}
                  />
                </svg>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '20px', fontWeight: '800', color: colores.primario }}>94%</span>
                  <span style={{ fontSize: '8px', fontWeight: '700', color: colores.textoOscuro, textTransform: 'uppercase' }}>Completitud</span>
                </div>
              </div>
            </div>

            {/* Document Checklist Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {documentChecklist.map((doc, idx) => {
                const Icon = doc.icon;
                const isOk = doc.status === 'ok';
                return (
                  <div key={doc.id || idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    backgroundColor: isOk ? '#F8FAFC' : '#FEF2F2',
                    borderRadius: '10px',
                    border: `1px solid ${isOk ? colores.borde : '#FECACA'}`,
                    borderLeft: `4px solid ${doc.color}`,
                    animation: `fadeSlideUp 0.3s ease ${0.4 + idx * 0.05}s both`,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Icon size={16} color={doc.color} />
                      <div>
                        <span style={{ fontSize: '12px', fontWeight: '700', color: colores.textoClaro, display: 'block' }}>{doc.name}</span>
                        <span style={{ fontSize: '10px', color: colores.textoOscuro }}>{doc.vigencia}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        showToast(`🔍 Abriendo visor OCR para: ${doc.name}`);
                      }}
                      style={{
                        padding: '3px 8px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: '#FFFFFF',
                        color: doc.color,
                        fontSize: '10px',
                        fontWeight: '800',
                        cursor: 'pointer'
                      }}
                    >
                      {isOk ? 'Auditar' : 'Actualizar'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* MODAL SUBIR DOCUMENTO */}
      {uploadModalOpen && (
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
                Cargar Documento al Gemelo Digital
              </h3>
              <button
                onClick={() => setUploadModalOpen(false)}
                style={{ background: 'none', border: 'none', color: colores.textoOscuro, cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUploadDocument} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: colores.textoOscuro, marginBottom: '6px' }}>
                  Nombre del Archivo / Documento
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Dictamen_Geotecnia_2026.pdf"
                  value={newDocName}
                  onChange={e => setNewDocName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: `1px solid ${colores.borde}`,
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: colores.textoOscuro, marginBottom: '6px' }}>
                  Tipo de Documento
                </label>
                <select
                  value={newDocType}
                  onChange={e => setNewDocType(e.target.value)}
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
                  <option value="Dictamen Estructural">Dictamen Estructural</option>
                  <option value="Póliza de Seguro">Póliza de Seguro All-Risk</option>
                  <option value="Certificado NFPA">Certificado de Red Contra Incendio NFPA</option>
                  <option value="Estudio de Mecánica de Suelos">Estudio de Mecánica de Suelos</option>
                  <option value="Avalúo Comercial">Avalúo Comercial VRN</option>
                </select>
              </div>

              <div style={{
                border: `2px dashed ${colores.primario}`,
                borderRadius: '12px',
                padding: '24px',
                textAlign: 'center',
                backgroundColor: '#EFF6FF'
              }}>
                <Upload size={28} color={colores.primario} style={{ margin: '0 auto 8px' }} />
                <span style={{ fontSize: '13px', fontWeight: '700', color: colores.primario, display: 'block' }}>
                  Arrastra aquí tu PDF o haz clic para explorar
                </span>
                <span style={{ fontSize: '11px', color: colores.textoOscuro, marginTop: '4px', display: 'block' }}>
                  OCR automático + Extracción semántica con Gemini 3.5 Pro
                </span>
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
                Ingestar y Validar con IA
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
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
