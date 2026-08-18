import React, { useState, useEffect } from 'react';
import { Shield, UploadCloud, Lock, Activity, Eye, FileText, CheckCircle, AlertTriangle, Camera, CheckCircle2, Image as ImageIcon, X, Copy, Check } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

export const EvidenceVaultModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [filter, setFilter] = useState('Todos');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [viewingEvidence, setViewingEvidence] = useState<any | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('Foto 360°');

  const filters = ['Todos', 'Foto 360°', 'Dron', 'Termografía'];

  const [evidenceCards, setEvidenceCards] = useState([
    {
      id: 1,
      titulo: 'Grieta Diagonal en Muro de Carga Sótano 2',
      type: 'Foto 360°',
      date: '12 Ago 2026',
      hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      confidence: '98%',
      hallazgo: true,
      hallazgoTexto: 'Indicio de Asentamiento Diferencial (>2mm)',
      imgGradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
    },
    {
      id: 2,
      titulo: 'Inspección con Dron Termográfico de Cubierta',
      type: 'Dron',
      date: '10 Ago 2026',
      hash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
      confidence: '95%',
      hallazgo: false,
      hallazgoTexto: 'Cubierta libre de filtraciones y corrosión',
      imgGradient: 'linear-gradient(135deg, #0F766E 0%, #047857 100%)',
    },
    {
      id: 3,
      titulo: 'Obstrucción de Válvula Principal de Rociadores',
      type: 'Termografía',
      date: '05 Ago 2026',
      hash: '6ca13d52ca70c883e0f0bb101e425a89e8624de51db2d2392593af6a84118090',
      confidence: '99%',
      hallazgo: true,
      hallazgoTexto: 'Material Combustible Almacenado a < 0.5m',
      imgGradient: 'linear-gradient(135deg, #7C2D12 0%, #991B1B 100%)',
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const dummyHash = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    const newEvidence = {
      id: Date.now(),
      titulo: newTitle.trim(),
      type: newType,
      date: 'Hoy, ' + new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
      hash: dummyHash,
      confidence: '99%',
      hallazgo: false,
      hallazgoTexto: 'Inspección validada por Visión Neuronal sin anomalías',
      imgGradient: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
    };

    setEvidenceCards(prev => [newEvidence, ...prev]);
    setUploadModalOpen(false);
    setNewTitle('');
    showToast(`✅ Evidencia "${newEvidence.titulo}" almacenada e indexada con hash SHA-256 inmutable.`);
  };

  const handleCopyHash = (hash: string) => {
    navigator.clipboard?.writeText(hash);
    showToast(`📋 Hash SHA-256 copiado al portapapeles.`);
  };

  const filteredCards = filter === 'Todos' ? evidenceCards : evidenceCards.filter(c => c.type === filter);

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
              <Camera size={24} color={colores.primario} />
            </span>
            Evidence Vault &amp; Visión Computacional IA
          </h1>
          <p style={{ margin: '4px 0 0', color: colores.textoOscuro, fontSize: '13px' }}>
            Dashboard 04 · Fotos 360°, dron, metadatos inmutables SHA-256 y detección automática de hallazgos
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', backgroundColor: '#EFF6FF', color: colores.primario, padding: '6px 14px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid #BFDBFE' }}>
            <Lock size={12} /> Cadena de Custodia SHA-256
          </span>
          <button
            onClick={() => setUploadModalOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: colores.primario, color: '#FFFFFF', border: 'none', padding: '8px 16px', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '12px' }}
          >
            <UploadCloud size={16} /> Subir Evidencia
          </button>
        </div>
      </div>

      {/* KPI Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {[
          { icon: FileText, label: 'Archivos en Vault', value: `${evidenceCards.length + 839}`, color: colores.primario, bg: '#EFF6FF', sub: 'Inmutables en Cloud Ledger' },
          { icon: Shield, label: 'Integridad de Cadena', value: '98.4%', color: '#10B981', bg: '#ECFDF5', sub: 'Sin discrepancias de firma' },
          { icon: AlertTriangle, label: 'Hallazgos Críticos IA', value: `${evidenceCards.filter(e => e.hallazgo).length} Activos`, color: '#EF4444', bg: '#FEF2F2', sub: 'Detección por Red Neuronal' },
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
              <div style={{ fontSize: '26px', fontWeight: '800', color: colores.textoClaro, marginBottom: '4px' }}>{kpi.value}</div>
              <span style={{ fontSize: '11px', color: colores.textoOscuro }}>{kpi.sub}</span>
            </div>
          );
        })}
      </div>

      {/* Filter Bar */}
      <div style={{ display: 'flex', gap: '8px', animation: 'fadeSlideUp 0.4s ease 0.2s both' }}>
        {filters.map(f => (
          <button
            key={f}
            onClick={() => {
              setFilter(f);
              showToast(`Filtrado por: ${f}`);
            }}
            style={{
              padding: '6px 16px',
              borderRadius: '20px',
              border: `1px solid ${filter === f ? colores.primario : colores.borde}`,
              backgroundColor: filter === f ? colores.primario : '#F8FAFC',
              color: filter === f ? '#FFFFFF' : colores.textoMedio,
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '12px',
              transition: 'all 0.15s ease',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px', animation: 'fadeSlideUp 0.4s ease 0.3s both' }}>
        {filteredCards.map((card, idx) => {
          const isHovered = hoveredCard === card.id;
          return (
            <div
              key={card.id}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setViewingEvidence(card)}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: isHovered ? '0 12px 24px rgba(15, 23, 42, 0.10)' : '0 2px 8px rgba(15, 23, 42, 0.04)',
                border: `1px solid ${isHovered ? colores.primario : colores.borde}`,
                transform: isHovered ? 'translateY(-4px)' : 'none',
                transition: 'all 0.25s ease',
                position: 'relative',
                animation: `fadeSlideUp 0.3s ease ${0.35 + idx * 0.06}s both`,
                cursor: 'pointer'
              }}
            >
              {card.hallazgo && (
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', backgroundColor: '#EF4444', zIndex: 2 }} />
              )}
              
              <div style={{ height: '150px', background: card.imgGradient, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ImageIcon size={44} color="rgba(255,255,255,0.4)" />
                <div style={{ position: 'absolute', top: '12px', right: '12px', backgroundColor: 'rgba(15,23,42,0.75)', backdropFilter: 'blur(4px)', color: '#FFFFFF', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Activity size={12} color="#10B981" />
                  IA Confianza {card.confidence}
                </div>
                <div style={{ position: 'absolute', bottom: '12px', left: '14px', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', color: '#FFFFFF', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '700' }}>
                  {card.type}
                </div>
              </div>

              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', color: colores.textoOscuro, fontWeight: '600' }}>Captura: {card.date}</span>
                </div>

                <h4 style={{ margin: '0 0 10px', fontSize: '14px', fontWeight: '800', color: colores.textoClaro, lineHeight: 1.3 }}>
                  {card.titulo}
                </h4>
                
                {card.hallazgo ? (
                  <div style={{ padding: '10px 12px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#EF4444', fontSize: '12px', fontWeight: '800', marginBottom: '2px' }}>
                      <AlertTriangle size={14} /> Hallazgo Detectado por Visión IA:
                    </div>
                    <span style={{ fontSize: '12px', color: colores.textoClaro, fontWeight: '600' }}>{card.hallazgoTexto}</span>
                  </div>
                ) : (
                  <div style={{ padding: '10px 12px', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '8px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#047857', fontSize: '12px', fontWeight: '800' }}>
                      <CheckCircle2 size={14} /> {card.hallazgoTexto}
                    </div>
                  </div>
                )}

                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyHash(card.hash);
                  }}
                  title="Click para copiar hash SHA-256"
                  style={{ fontFamily: 'monospace', fontSize: '10px', color: colores.textoOscuro, backgroundColor: '#F8FAFC', padding: '8px 10px', borderRadius: '6px', border: `1px solid ${colores.borde}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <Lock size={12} color={colores.primario} style={{ flexShrink: 0 }} />
                    <span>SHA: {card.hash.slice(0, 24)}...</span>
                  </div>
                  <Copy size={12} color={colores.textoOscuro} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL SUBIR EVIDENCIA */}
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
            maxWidth: '500px',
            width: '100%',
            padding: '28px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: `1px solid ${colores.borde}`,
            animation: 'fadeSlideUp 0.3s ease both'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: colores.textoClaro }}>
                Subir Nueva Evidencia a Evidence Vault
              </h3>
              <button
                onClick={() => setUploadModalOpen(false)}
                style={{ background: 'none', border: 'none', color: colores.textoOscuro, cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: colores.textoOscuro, marginBottom: '6px' }}>
                  Título del Hallazgo o Captura
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Inspección de Junta Sísmica y Fachada Norte"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
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
                  Tipo de Captura
                </label>
                <select
                  value={newType}
                  onChange={e => setNewType(e.target.value)}
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
                  <option value="Foto 360°">Foto 360° Espacial</option>
                  <option value="Dron">Vuelo Fotogramétrico Dron</option>
                  <option value="Termografía">Scan Termográfico Infrarrojo</option>
                </select>
              </div>

              <div style={{
                border: `2px dashed ${colores.primario}`,
                borderRadius: '12px',
                padding: '24px',
                textAlign: 'center',
                backgroundColor: '#EFF6FF'
              }}>
                <UploadCloud size={28} color={colores.primario} style={{ margin: '0 auto 8px' }} />
                <span style={{ fontSize: '13px', fontWeight: '700', color: colores.primario, display: 'block' }}>
                  Arrastra archivo JPG, RAW o TIFF
                </span>
                <span style={{ fontSize: '11px', color: colores.textoOscuro, marginTop: '4px', display: 'block' }}>
                  Se calculará el hash criptográfico SHA-256 y se enviará al modelo de Visión IA
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
                Indexar y Firmar en Vault
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL VER DETALLE DE EVIDENCIA */}
      {viewingEvidence && (
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
            maxWidth: '560px',
            width: '100%',
            padding: '28px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: `1px solid ${colores.borde}`,
            animation: 'fadeSlideUp 0.3s ease both'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '800', color: colores.primario, backgroundColor: '#EFF6FF', padding: '2px 8px', borderRadius: '6px' }}>
                  {viewingEvidence.type} · Confianza IA: {viewingEvidence.confidence}
                </span>
                <h3 style={{ margin: '6px 0 0', fontSize: '17px', fontWeight: '800', color: colores.textoClaro }}>
                  {viewingEvidence.titulo}
                </h3>
              </div>
              <button
                onClick={() => setViewingEvidence(null)}
                style={{ background: 'none', border: 'none', color: colores.textoOscuro, cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ height: '200px', background: viewingEvidence.imgGradient, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <ImageIcon size={56} color="rgba(255,255,255,0.6)" />
            </div>

            <div style={{ padding: '14px', backgroundColor: viewingEvidence.hallazgo ? '#FEF2F2' : '#ECFDF5', borderRadius: '12px', border: `1px solid ${viewingEvidence.hallazgo ? '#FECACA' : '#A7F3D0'}`, marginBottom: '16px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: viewingEvidence.hallazgo ? '#EF4444' : '#047857', display: 'block', marginBottom: '2px' }}>
                {viewingEvidence.hallazgo ? '⚠️ Hallazgo Crítico Detectado:' : '✓ Validación Positiva:'}
              </span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: colores.textoClaro }}>
                {viewingEvidence.hallazgoTexto}
              </span>
            </div>

            <div style={{ fontFamily: 'monospace', fontSize: '11px', color: colores.textoOscuro, backgroundColor: '#F8FAFC', padding: '12px', borderRadius: '10px', border: `1px solid ${colores.borde}`, wordBreak: 'break-all', marginBottom: '20px' }}>
              <strong>Hash SHA-256:</strong><br />
              {viewingEvidence.hash}
            </div>

            <button
              onClick={() => {
                handleCopyHash(viewingEvidence.hash);
                setViewingEvidence(null);
              }}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: colores.primario,
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Copiar Hash de Custodia Criptográfica
            </button>
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
