import React, { useState, useEffect } from 'react';
import { FileText, Cpu, AlertCircle, FileSearch, Tag, Quote, CheckCircle2, Search, ArrowRight, ShieldCheck, Download, Upload, X, Edit3, Check } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

export const DocumentIntelligenceModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [activeTab, setActiveTab] = useState<'citas' | 'incoherencias' | 'campos'>('citas');
  const [animated, setAnimated] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [uploadPdfModalOpen, setUploadPdfModalOpen] = useState(false);
  const [selectedFieldEdit, setSelectedFieldEdit] = useState<{ k: string; v: string } | null>(null);
  const [newPdfName, setNewPdfName] = useState('');

  const [camposEstructurados, setCamposEstructurados] = useState([
    { k: 'Asegurado Principal', v: 'FIBRA Inmobiliaria MX' },
    { k: 'Vigencia Póliza', v: 'Ene 2026 – Ene 2027' },
    { k: 'Norma de Diseño', v: 'RCDF 2023 / NTC Sismo' },
    { k: 'Aceleración PGA', v: '0.38g (Periodo 250y)' },
    { k: 'VRN Edificio', v: '$98,000,000 USD' },
    { k: 'VRN Contenidos', v: '$27,000,000 USD' },
    { k: 'Deducible Terremoto', v: '5% Suma Asegurada' },
    { k: 'Sublímite BI', v: '$15,000,000 USD' }
  ]);

  const [documentosExtraidos, setDocumentosExtraidos] = useState([
    { id: 'doc-1', nombre: 'Dictamen_Estructural_Reforma222_2026.pdf', tipo: 'Dictamen Estructural', emisor: 'Colegio de Ingenieros Civiles', paginas: 42, entidades: 128, progress: 100 },
    { id: 'doc-2', nombre: 'Poliza_AllRisk_Empresarial_2026.pdf', tipo: 'Póliza de Seguro', emisor: 'AXA Seguros', paginas: 118, entidades: 245, progress: 100 },
    { id: 'doc-3', nombre: 'Avaluo_Comercial_VRN_Apodaca.pdf', tipo: 'Avalúo VRN', emisor: 'SOFOVAL Avalúos', paginas: 28, entidades: 74, progress: 85 },
  ]);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 150);
    return () => clearTimeout(t);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleUploadPdf = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPdfName.trim()) return;

    const newDoc = {
      id: `doc-${Date.now()}`,
      nombre: newPdfName.trim(),
      tipo: 'Póliza / Dictamen Ingestado',
      emisor: 'RAG Pipeline Engine',
      paginas: 16,
      entidades: 52,
      progress: 100,
    };

    setDocumentosExtraidos(prev => [newDoc, ...prev]);
    setUploadPdfModalOpen(false);
    setNewPdfName('');
    showToast(`📄 Documento "${newDoc.nombre}" procesado por OCR y vectorizado en RAG.`);
  };

  const handleExportJson = () => {
    showToast(`📥 JSON estructurado de entidades extraídas exportado correctamente.`);
  };

  const handleSaveFieldEdit = (newVal: string) => {
    if (!selectedFieldEdit) return;
    setCamposEstructurados(prev => prev.map(f => f.k === selectedFieldEdit.k ? { ...f, v: newVal } : f));
    setSelectedFieldEdit(null);
    showToast(`✏️ Campo "${selectedFieldEdit.k}" actualizado a: ${newVal}`);
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
              <FileSearch size={24} color={colores.primario} />
            </span>
            AI Document Intelligence &amp; RAG Extractor
          </h1>
          <p style={{ margin: '4px 0 0', color: colores.textoOscuro, fontSize: '13px' }}>
            Dashboard 05 · OCR, clasificación, extracción estructurada, citación de fragmentos y auditoría de coherencia
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleExportJson}
            style={{
              padding: '8px 14px',
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
            <Download size={14} /> Exportar JSON
          </button>

          <button
            onClick={() => setUploadPdfModalOpen(true)}
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
            <Upload size={14} /> Ingestar PDF
          </button>
        </div>
      </div>

      {/* Top KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {[
          { label: 'Documentos Procesados (RAG)', value: `${documentosExtraidos.length + 1245}`, icon: FileSearch, color: colores.primario, bg: '#EFF6FF', sub: '100% vectorizados' },
          { label: 'Campos Estructurados Extraídos', value: `${camposEstructurados.length * 1980}`, icon: Tag, color: '#10B981', bg: '#ECFDF5', sub: 'Precisión semántica 99.2%' },
          { label: 'Incoherencias Detectadas', value: '3 Críticas', icon: AlertCircle, color: '#EF4444', bg: '#FEF2F2', sub: 'Auditoría cruzada póliza vs avalúo' },
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
                <span style={{ color: colores.textoOscuro, fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{kpi.label}</span>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: kpi.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={16} color={kpi.color} />
                </div>
              </div>
              <div style={{ fontSize: '26px', fontWeight: '800', color: colores.textoClaro, marginBottom: '4px' }}>{kpi.value}</div>
              <span style={{ fontSize: '11px', color: colores.textoOscuro }}>{kpi.sub}</span>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '20px' }}>
        
        {/* Left Col - Doc List */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: `1px solid ${colores.borde}`, padding: '20px', boxShadow: '0 2px 6px rgba(15,23,42,0.04)', animation: 'fadeSlideUp 0.4s ease 0.25s both' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: colores.textoClaro }}>
              Documentos Ingestados Recientemente
            </h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {documentosExtraidos.map((doc, idx) => (
              <div 
                key={doc.id || idx} 
                onClick={() => showToast(`📄 Abriendo citas RAG de: ${doc.nombre}`)}
                style={{ padding: '14px', border: `1px solid ${colores.borde}`, borderRadius: '12px', backgroundColor: '#F8FAFC', cursor: 'pointer', transition: 'all 0.15s ease' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#EFF6FF'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F8FAFC'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <FileText size={18} color={colores.primario} />
                  <span style={{ fontSize: '13px', fontWeight: '700', flex: 1, color: colores.textoClaro, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{doc.nombre}</span>
                  {doc.progress === 100 ? (
                    <CheckCircle2 size={16} color="#10B981" />
                  ) : (
                    <span style={{ fontSize: '11px', fontWeight: '700', color: colores.primario }}>{doc.progress}%</span>
                  )}
                </div>
                <div style={{ height: '4px', backgroundColor: '#E2E8F0', borderRadius: '2px', marginBottom: '8px', overflow: 'hidden' }}>
                  <div style={{ width: animated ? `${doc.progress}%` : '0%', height: '100%', backgroundColor: doc.progress === 100 ? '#10B981' : colores.primario, borderRadius: '2px', transition: `width 0.8s ease ${0.3 + idx * 0.1}s` }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: colores.textoOscuro }}>
                  <span>{doc.tipo} · {doc.emisor}</span>
                  <span style={{ fontWeight: '700', color: colores.primario }}>{doc.entidades} entidades</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col - Tabbed View */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: `1px solid ${colores.borde}`, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 2px 6px rgba(15,23,42,0.04)', animation: 'fadeSlideUp 0.4s ease 0.3s both' }}>
          <div style={{ display: 'flex', borderBottom: `1px solid ${colores.borde}`, backgroundColor: '#F8FAFC' }}>
            {[
              { id: 'citas', label: 'Citas RAG Extraídas' },
              { id: 'incoherencias', label: 'Incoherencias Detectadas' },
              { id: 'campos', label: 'Campos Estructurados' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  flex: 1,
                  padding: '14px',
                  border: 'none',
                  backgroundColor: activeTab === tab.id ? '#FFFFFF' : 'transparent',
                  borderBottom: `2px solid ${activeTab === tab.id ? colores.primario : 'transparent'}`,
                  color: activeTab === tab.id ? colores.primario : colores.textoOscuro,
                  fontWeight: activeTab === tab.id ? '800' : '600',
                  fontSize: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ padding: '20px', flex: 1 }}>
            {activeTab === 'citas' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ padding: '16px', borderLeft: `4px solid ${colores.primario}`, backgroundColor: '#EFF6FF', borderRadius: '0 10px 10px 0', border: `1px solid #BFDBFE`, borderLeftWidth: '4px' }}>
                  <Quote size={18} color={colores.primario} style={{ marginBottom: '6px' }} />
                  <p style={{ margin: '0 0 8px', fontStyle: 'italic', fontSize: '13px', color: colores.textoClaro, lineHeight: 1.5 }}>
                    "El deducible aplicable para la cobertura de Terremoto y Erupción Volcánica será del 5% sobre la suma asegurada total por ubicación declarada..."
                  </p>
                  <span style={{ fontSize: '11px', color: colores.textoOscuro, fontWeight: '600' }}>
                    Fuente: Poliza_AllRisk_Empresarial_2026.pdf · Cláusula 14, Pág. 42
                  </span>
                </div>

                <div style={{ padding: '16px', borderLeft: `4px solid #10B981`, backgroundColor: '#ECFDF5', borderRadius: '0 10px 10px 0', border: `1px solid #A7F3D0`, borderLeftWidth: '4px' }}>
                  <Quote size={18} color="#10B981" style={{ marginBottom: '6px' }} />
                  <p style={{ margin: '0 0 8px', fontStyle: 'italic', fontSize: '13px', color: colores.textoClaro, lineHeight: 1.5 }}>
                    "La aceleración máxima esperada para período de retorno de 250 años en la zona es de 0.38g con factor de amplificación de suelo tipo III..."
                  </p>
                  <span style={{ fontSize: '11px', color: colores.textoOscuro, fontWeight: '600' }}>
                    Fuente: Dictamen_Estructural_Reforma222_2026.pdf · Sección Geotecnia, Pág. 18
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'incoherencias' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ padding: '16px', border: '1px solid #FECACA', backgroundColor: '#FEF2F2', borderRadius: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#EF4444', fontWeight: '800', fontSize: '13px', marginBottom: '6px' }}>
                    <AlertCircle size={16} /> Discrepancia Crítica de Infraseguro (-24%)
                  </div>
                  <p style={{ margin: '0 0 10px', fontSize: '12px', color: colores.textoClaro, lineHeight: 1.4 }}>
                    La suma asegurada contratada en la póliza AXA ($95M USD) difiere en un -24% respecto al Valor de Reposición a Nuevo (VRN $125M USD) determinado en el Avalúo Comercial SOFOVAL.
                  </p>
                  <div style={{ display: 'flex', gap: '20px', fontSize: '12px', fontWeight: '700' }}>
                    <span style={{ color: '#EF4444' }}>Póliza: $95,000,000 USD</span>
                    <span style={{ color: colores.primario }}>Avalúo: $125,000,000 USD</span>
                    <span style={{ color: '#F97316' }}>Brecha: -$30,000,000 USD</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'campos' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {camposEstructurados.map((field, i) => (
                  <div 
                    key={i} 
                    onClick={() => setSelectedFieldEdit(field)}
                    title="Click para editar valor"
                    style={{ padding: '10px 14px', border: `1px solid ${colores.borde}`, borderRadius: '10px', backgroundColor: '#F8FAFC', fontSize: '12px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.15s ease' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#EFF6FF'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                  >
                    <div>
                      <span style={{ color: colores.textoOscuro, display: 'block', fontSize: '11px', fontWeight: '600' }}>{field.k}</span>
                      <span style={{ fontWeight: '800', color: colores.textoClaro, marginTop: '2px', display: 'block' }}>{field.v}</span>
                    </div>
                    <Edit3 size={13} color={colores.primario} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* MODAL INGESTAR PDF */}
      {uploadPdfModalOpen && (
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
                Ingestar Documento para Extracción RAG
              </h3>
              <button
                onClick={() => setUploadPdfModalOpen(false)}
                style={{ background: 'none', border: 'none', color: colores.textoOscuro, cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUploadPdf} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: colores.textoOscuro, marginBottom: '6px' }}>
                  Nombre del Documento
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Estudio_Vulnerabilidad_Sismica_Torre2.pdf"
                  value={newPdfName}
                  onChange={e => setNewPdfName(e.target.value)}
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

              <div style={{
                border: `2px dashed ${colores.primario}`,
                borderRadius: '12px',
                padding: '24px',
                textAlign: 'center',
                backgroundColor: '#EFF6FF'
              }}>
                <Upload size={28} color={colores.primario} style={{ margin: '0 auto 8px' }} />
                <span style={{ fontSize: '13px', fontWeight: '700', color: colores.primario, display: 'block' }}>
                  Selecciona archivo PDF, Word o Scan
                </span>
                <span style={{ fontSize: '11px', color: colores.textoOscuro, marginTop: '4px', display: 'block' }}>
                  El motor RAG dividirá en chunks semánticos y calculará embeddings vectoriales
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
                Iniciar Pipeline de Extracción
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EDITAR CAMPO ESTRUCTURADO */}
      {selectedFieldEdit && (
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
            maxWidth: '420px',
            width: '100%',
            padding: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: `1px solid ${colores.borde}`,
            animation: 'fadeSlideUp 0.3s ease both'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colores.textoClaro }}>
                Editar Campo: {selectedFieldEdit.k}
              </h3>
              <button
                onClick={() => setSelectedFieldEdit(null)}
                style={{ background: 'none', border: 'none', color: colores.textoOscuro, cursor: 'pointer', padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            <input
              type="text"
              defaultValue={selectedFieldEdit.v}
              id="fieldEditInput"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: `1px solid ${colores.borde}`,
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
                marginBottom: '16px'
              }}
            />

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setSelectedFieldEdit(null)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '10px',
                  border: `1px solid ${colores.borde}`,
                  backgroundColor: '#F8FAFC',
                  color: colores.textoOscuro,
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  const inputEl = document.getElementById('fieldEditInput') as HTMLInputElement;
                  handleSaveFieldEdit(inputEl?.value || selectedFieldEdit.v);
                }}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: colores.primario,
                  color: '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                Guardar Campo
              </button>
            </div>
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
