import React, { useState } from 'react';
import {
  Shield, Plus, Search, Clock, CheckCircle, AlertTriangle,
  FileText, Download, ChevronRight, Zap, Globe, Calendar,
  TrendingUp, Award, Lock, ArrowRight, Lightbulb, Star, Sparkles, RefreshCw,
} from 'lucide-react';

const patentes = [
  {
    id: 'PCT/MX2023/001284', titulo: 'Compuestos Benzimidazólicos como Inhibidores Selectivos de HDAC1/2 para Tratamiento de Neoplasias Hematológicas', molecula: 'PB-0147', inventor: 'Dra. Núñez, Dr. Castro', estado: 'Concedida', tipo: 'PCT', fechaSolicitud: '2023-03-15', fechaConcesion: '2024-08-22', vencimiento: '2043-03-15', jurisdiccion: 'México, EE.UU., UE', claims: 18, valor: 'Alto', transferible: true,
  },
  {
    id: 'PCT/MX2024/000847', titulo: 'Scaffold Benzimidazólico Funcionalizado con Actividad Antitumoral Contra MCL-1', molecula: 'PB-0892', inventor: 'Dr. Morales, Dra. Ramírez', estado: 'Examen', tipo: 'PCT', fechaSolicitud: '2024-01-20', fechaConcesion: null, vencimiento: '2044-01-20', jurisdiccion: 'México, Japón, EE.UU.', claims: 24, valor: 'Alto', transferible: false,
  },
  {
    id: 'MX/E/2024/054132', titulo: 'Método de Evaluación ADMET in silico para Candidatos Farmacológicos Quinazolinona-Sustituidos', molecula: 'PB-1203', inventor: 'Dr. Morales, Dr. Vega', estado: 'Pendiente', tipo: 'Nacional', fechaSolicitud: '2024-04-10', fechaConcesion: null, vencimiento: '2044-04-10', jurisdiccion: 'México', claims: 12, valor: 'Medio', transferible: true,
  },
  {
    id: 'PCT/MX2022/003891', titulo: 'Formulación Nanoparticular de Inhibidores de mTOR Derivados de Macrolidas para Inmunomodulación', molecula: 'PB-4102', inventor: 'Dr. Castro, Dra. López', estado: 'Concedida', tipo: 'PCT', fechaSolicitud: '2022-09-05', fechaConcesion: '2023-11-14', vencimiento: '2042-09-05', jurisdiccion: 'México, EE.UU., LATAM', claims: 21, valor: 'Medio', transferible: true,
  },
  {
    id: 'MX/E/2025/001203', titulo: 'Algoritmo de Predicción de Toxicidad Hepática basado en Descriptores Moleculares QSAR/ML', molecula: 'Método IA', inventor: 'Dra. Ramírez, Dr. Peña', estado: 'Redacción', tipo: 'Nacional', fechaSolicitud: null, fechaConcesion: null, vencimiento: null, jurisdiccion: 'México (inicial)', claims: 8, valor: 'Alto', transferible: false,
  },
];

const estadoConfig: Record<string, { color: string; bg: string; border: string; icon: React.ElementType }> = {
  'Concedida':  { color: '#10B981', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)', icon: CheckCircle },
  'Examen':     { color: '#38BDF8', bg: 'rgba(14,165,233,0.12)', border: 'rgba(14,165,233,0.3)', icon: Search },
  'Pendiente':  { color: '#FCD34D', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)', icon: Clock },
  'Redacción':  { color: '#A78BFA', bg: 'rgba(124,58,237,0.12)', border: 'rgba(124,58,237,0.3)', icon: FileText },
  'Rechazada':  { color: '#EF4444', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.3)', icon: AlertTriangle },
};

const literatura = [
  { titulo: 'HDAC1/2 inhibitors in hematological malignancies: a comprehensive review', fuente: 'J. Med. Chem. 2024', relevancia: 98, novedad: 'Alta' },
  { titulo: 'Benzimidazole-based kinase inhibitors: SAR and clinical progress', fuente: 'Eur. J. Med. Chem. 2023', relevancia: 87, novedad: 'Media' },
  { titulo: 'MCL-1 as a therapeutic target in cancer: recent advances', fuente: 'Cancer Res. 2024', relevancia: 94, novedad: 'Alta' },
  { titulo: 'Computational approaches for selective HDAC inhibitor design', fuente: 'Drug Discov. Today 2023', relevancia: 76, novedad: 'Baja' },
];

export const PatentIPAgent: React.FC = () => {
  const [patentSeleccionada, setPatentSeleccionada] = useState<typeof patentes[0] | null>(patentes[0]);
  const [busqueda, setBusqueda] = useState('');
  const [tab, setTab] = useState<'patentes' | 'literatura' | 'analitica'>('patentes');

  // States interactivos
  const [listaPatentes, setListaPatentes] = useState(patentes);
  const [toast, setToast] = useState<string | null>(null);
  const [analizandoNovedad, setAnalizandoNovedad] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const agregarPatente = () => {
    const id = `MX/E/2026/${Math.floor(Math.random() * 90000) + 10000}`;
    const nuevaPat = {
      id,
      titulo: 'Nueva Formulación de Scaffold Biotecnológico Validado por IA',
      molecula: 'PB-3301',
      inventor: 'Dr. Morales, Dra. López',
      estado: 'Redacción',
      tipo: 'Nacional',
      fechaSolicitud: new Date().toISOString().split('T')[0],
      fechaConcesion: null,
      vencimiento: '2046-06-27',
      jurisdiccion: 'México',
      claims: 15,
      valor: 'Alto',
      transferible: false
    };
    setListaPatentes(prev => [nuevaPat, ...prev]);
    setPatentSeleccionada(nuevaPat);
    showToast(`¡Nueva solicitud de patente en redacción creada para PB-3301!`);
  };

  const detectarNovedadIA = (pat: typeof patentes[0]) => {
    setAnalizandoNovedad(true);
    showToast(`MAYIA IP está analizando el estado del arte y claims de la patente ${pat.molecula || 'seleccionada'} contra 14M de publicaciones…`);
    setTimeout(() => {
      showToast(`¡Análisis de novedad completado! Relevancia e inventiva alta (94% de score de novedad).`);
      setAnalizandoNovedad(false);
    }, 2500);
  };

  const exportarPatente = (pat: typeof patentes[0]) => {
    const contenido = JSON.stringify(pat, null, 2);
    const blob = new Blob([contenido], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `Pharbiois_Patente_${pat.id.replace(/\//g, '_')}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Especificación de patente ${pat.id} exportada exitosamente.`);
  };

  const patentesFiltradas = listaPatentes.filter(p =>
    p.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.id.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.molecula.toLowerCase().includes(busqueda.toLowerCase())
  );

  const concedidas = listaPatentes.filter(p => p.estado === 'Concedida').length;
  const enProceso = listaPatentes.filter(p => p.estado !== 'Concedida' && p.estado !== 'Rechazada').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1400px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '13px', background: 'linear-gradient(135deg, #F59E0B, #FBBF24)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(245,158,11,0.35)' }}>
            <Shield size={20} color="#fff" />
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', margin: 0 }}>Patent & IP Intelligence Agent</h2>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>Gestión de propiedad intelectual · Detección de novedad · Transferencia tecnológica</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn-secondary" onClick={() => patentSeleccionada && detectarNovedadIA(patentSeleccionada)} disabled={analizandoNovedad}><Zap size={14}/> Detectar novedad con IA</button>
          <button className="btn-primary" onClick={agregarPatente}><Plus size={14}/> Nueva Patente</button>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
        {[
          { label: 'Patentes totales', val: listaPatentes.length.toString(), color: '#F59E0B', sub: 'En portafolio activo', icon: Shield },
          { label: 'Concedidas', val: concedidas.toString(), color: '#10B981', sub: 'Protección activa', icon: CheckCircle },
          { label: 'En proceso', val: enProceso.toString(), color: '#0EA5E9', sub: 'Solicitudes activas', icon: Clock },
          { label: 'Transferibles', val: listaPatentes.filter(p => p.transferible).length.toString(), color: '#7C3AED', sub: 'Para licenciamiento', icon: TrendingUp },
        ].map(k => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="metric-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${k.color}22`, border: `1px solid ${k.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={18} color={k.color} />
                </div>
              </div>
              <div style={{ fontSize: '26px', fontWeight: '800', color: k.color, fontFamily: 'Outfit, sans-serif', lineHeight: 1 }}>{k.val}</div>
              <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginTop: '4px' }}>{k.label}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{k.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', background: '#F1F5F9', borderRadius: '12px', padding: '4px', width: 'fit-content' }}>
        {([['patentes', 'Portafolio IP'], ['literatura', 'Análisis de Novedad'], ['analitica', 'Analítica']] as const).map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{ padding: '8px 18px', borderRadius: '9px', fontSize: '13px', fontWeight: '600', background: tab === id ? 'rgba(245,158,11,0.1)' : 'transparent', border: tab === id ? '1px solid rgba(245,158,11,0.25)' : '1px solid transparent', color: tab === id ? '#F59E0B' : '#64748B', cursor: 'pointer', transition: 'all 0.2s' }}>{label}</button>
        ))}
      </div>

      {tab === 'patentes' && (
        <>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
            <input value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Buscar por ID, título o molécula…" style={{ width: '100%', padding: '10px 12px 10px 36px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '13px', outline: 'none' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: patentSeleccionada ? '1fr 360px' : '1fr', gap: '20px', alignItems: 'start' }}>
            {/* List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {patentesFiltradas.map(p => {
                const cfg = estadoConfig[p.estado];
                const StatusIcon = cfg.icon;
                const isSelected = patentSeleccionada?.id === p.id;
                return (
                  <div key={p.id} onClick={() => setPatentSeleccionada(isSelected ? null : p)}
                    style={{ background: isSelected ? 'rgba(245,158,11,0.06)' : 'var(--bg-card)', border: `1px solid ${isSelected ? 'rgba(245,158,11,0.35)' : 'var(--border)'}`, borderRadius: '14px', padding: '16px', cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={e => { if (!isSelected) e.currentTarget.style.borderColor = 'rgba(245,158,11,0.25)'; }}
                    onMouseLeave={e => { if (!isSelected) e.currentTarget.style.borderColor = 'var(--border)'; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '10px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>{p.id}</div>
                        <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', lineHeight: 1.4 }}>{p.titulo}</div>
                      </div>
                      <span style={{ padding: '4px 10px', borderRadius: '8px', background: cfg.bg, color: cfg.color, fontSize: '11px', fontWeight: '700', border: `1px solid ${cfg.border}`, display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                        <StatusIcon size={11}/> {p.estado}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                      {[
                        { label: 'Molécula', val: p.molecula },
                        { label: 'Tipo', val: p.tipo },
                        { label: 'Inventor', val: p.inventor },
                        { label: 'Jurisdicción', val: p.jurisdiccion },
                        { label: 'Claims', val: `${p.claims} claims` },
                        { label: 'Valor comercial', val: p.valor },
                      ].map(f => (
                        <div key={f.label}>
                          <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '600' }}>{f.label}</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '500' }}>{f.val}</div>
                        </div>
                      ))}
                      {p.transferible && (
                        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px', padding: '3px 10px', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)', borderRadius: '8px', color: '#7C3AED', fontSize: '11px', fontWeight: '600' }}>
                          <TrendingUp size={11}/> Licenciable
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Detail */}
            {patentSeleccionada && (
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(245,158,11,0.06)', position: 'sticky', top: 0 }}>
                <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)', background: 'rgba(245,158,11,0.06)' }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#F59E0B', marginBottom: '6px' }}>{patentSeleccionada.id}</div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', lineHeight: 1.4 }}>{patentSeleccionada.titulo}</div>
                </div>
                <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  
                  {/* Hitos / Timeline de Patente SVG */}
                  <div style={{ background: '#F8FAFC', border: '1px solid var(--border)', borderRadius: '12px', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ fontSize: '9px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Progreso de Registro (Timeline)</div>
                    
                    {(() => {
                      // Determinar avance del timeline según el estado de la patente
                      // Estados: Redacción(1), Pendiente(2), Examen(3), Concedida(4)
                      const est = patentSeleccionada.estado;
                      const level = est === 'Concedida' ? 4 : est === 'Examen' ? 3 : est === 'Pendiente' ? 2 : 1;
                      
                      const cRedac = level >= 1 ? '#A78BFA' : '#E2E8F0';
                      const cPend = level >= 2 ? '#FCD34D' : '#E2E8F0';
                      const cExam = level >= 3 ? '#38BDF8' : '#E2E8F0';
                      const cConc = level >= 4 ? '#10B981' : '#E2E8F0';

                      return (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <svg width="100%" height="30" viewBox="0 0 160 30" style={{ overflow: 'visible' }}>
                            {/* Líneas conectoras de hitos */}
                            <line x1="20" y1="12" x2="60" y2="12" stroke={level >= 2 ? '#FCD34D' : '#E2E8F0'} strokeWidth="2" />
                            <line x1="60" y1="12" x2="100" y2="12" stroke={level >= 3 ? '#38BDF8' : '#E2E8F0'} strokeWidth="2" />
                            <line x1="100" y1="12" x2="140" y2="12" stroke={level >= 4 ? '#10B981' : '#E2E8F0'} strokeWidth="2" />

                            {/* Hito 1: Redacción */}
                            <circle cx="20" cy="12" r="5" fill={cRedac} stroke="white" strokeWidth="1" />
                            {/* Hito 2: Solicitud */}
                            <circle cx="60" cy="12" r="5" fill={cPend} stroke="white" strokeWidth="1" />
                            {/* Hito 3: Examen */}
                            <circle cx="100" cy="12" r="5" fill={cExam} stroke="white" strokeWidth="1" />
                            {/* Hito 4: Concesión */}
                            <circle cx="140" cy="12" r="5" fill={cConc} stroke="white" strokeWidth="1" />

                            {/* Etiquetas del Timeline */}
                            <text x="20" y="24" fontSize="5" fontWeight="700" fill="#64748B" textAnchor="middle">Redac.</text>
                            <text x="60" y="24" fontSize="5" fontWeight="700" fill="#64748B" textAnchor="middle">Solicitud</text>
                            <text x="100" y="24" fontSize="5" fontWeight="700" fill="#64748B" textAnchor="middle">Examen</text>
                            <text x="140" y="24" fontSize="5" fontWeight="700" fill="#64748B" textAnchor="middle">Concedida</text>
                          </svg>
                        </div>
                      );
                    })()}
                  </div>

                  {[
                    { label: 'Estado', val: patentSeleccionada.estado },
                    { label: 'Molécula/Proyecto', val: patentSeleccionada.molecula },
                    { label: 'Inventores', val: patentSeleccionada.inventor },
                    { label: 'Tipo de solicitud', val: patentSeleccionada.tipo },
                    { label: 'Fecha de solicitud', val: patentSeleccionada.fechaSolicitud || 'En redacción' },
                    { label: 'Fecha de concesión', val: patentSeleccionada.fechaConcesion || 'Pendiente' },
                    { label: 'Vencimiento', val: patentSeleccionada.vencimiento || '—' },
                    { label: 'Jurisdicción', val: patentSeleccionada.jurisdiccion },
                    { label: 'Número de claims', val: `${patentSeleccionada.claims}` },
                    { label: 'Valor comercial', val: patentSeleccionada.valor },
                    { label: 'Transferible', val: patentSeleccionada.transferible ? 'Sí — disponible para licenciamiento' : 'No actualmente' },
                  ].map(r => (
                    <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '6px 0', borderBottom: '1px solid var(--border)', gap: '12px' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', flexShrink: 0 }}>{r.label}</span>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: '500', textAlign: 'right' }}>{r.val}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                    <button className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '10px' }} onClick={() => detectarNovedadIA(patentSeleccionada)} disabled={analizandoNovedad}>
                      {analizandoNovedad ? <RefreshCw size={13} style={{ animation: 'spin 1s linear infinite' }} /> : <Lightbulb size={13}/>}
                      {analizandoNovedad ? ' Analizando…' : ' Analizar Novedad'}
                    </button>
                    <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center', padding: '10px' }} onClick={() => exportarPatente(patentSeleccionada)}>
                      <Download size={13}/> Exportar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {tab === 'literatura' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '14px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Lightbulb size={18} color="#F59E0B" />
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>Análisis de Novedad — PB-0147 (HDAC1/2)</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>MAYIA analizó 1,247 documentos de patente y 3,891 artículos científicos. Resultado: <span style={{ color: '#10B981', fontWeight: '700' }}>Novedad confirmada</span></div>
            </div>
            <button className="btn-secondary" style={{ marginLeft: 'auto', flexShrink: 0 }} onClick={() => patentSeleccionada && detectarNovedadIA(patentSeleccionada)}><Zap size={13}/> Nuevo análisis</button>
          </div>

          {literatura.map((l, i) => (
            <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '16px', display: 'flex', alignItems: 'flex-start', gap: '14px', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(245,158,11,0.3)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: l.novedad === 'Alta' ? 'rgba(239,68,68,0.15)' : l.novedad === 'Media' ? 'rgba(245,158,11,0.15)' : 'rgba(16,185,129,0.15)', border: `1px solid ${l.novedad === 'Alta' ? 'rgba(239,68,68,0.3)' : l.novedad === 'Media' ? 'rgba(245,158,11,0.3)' : 'rgba(16,185,129,0.3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '16px', fontWeight: '900', color: l.novedad === 'Alta' ? '#EF4444' : l.novedad === 'Media' ? '#F59E0B' : '#10B981', fontFamily: 'Outfit, sans-serif' }}>{l.relevancia}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>{l.titulo}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>{l.fuente}</div>
                <span style={{ padding: '2px 10px', borderRadius: '8px', background: l.novedad === 'Alta' ? 'rgba(239,68,68,0.12)' : l.novedad === 'Media' ? 'rgba(245,158,11,0.12)' : 'rgba(16,185,129,0.12)', color: l.novedad === 'Alta' ? '#EF4444' : l.novedad === 'Media' ? '#F59E0B' : '#10B981', fontSize: '10px', fontWeight: '700', border: `1px solid ${l.novedad === 'Alta' ? 'rgba(239,68,68,0.3)' : l.novedad === 'Media' ? 'rgba(245,158,11,0.3)' : 'rgba(16,185,129,0.3)'}` }}>
                  Relevancia {l.novedad}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'analitica' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {[
            { label: 'Patente de mayor valor', val: 'PCT/MX2023/001284', sub: 'HDAC1/2 Inhibidor · Concedida EE.UU., UE, MX', color: '#F59E0B' },
            { label: 'Jurisdicción dominante', val: 'PCT Internacional', sub: '3 de 5 patentes con cobertura global', color: '#0EA5E9' },
            { label: 'Tiempo promedio concesión', val: '17 meses', sub: 'Desde solicitud hasta concesión', color: '#10B981' },
            { label: 'Valor de portafolio IP', val: 'Alto', sub: '4 patentes calificadas como alto valor', color: '#7C3AED' },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '20px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>{s.label}</div>
              <div style={{ fontSize: '22px', fontWeight: '800', color: s.color, fontFamily: 'Outfit, sans-serif', marginBottom: '6px' }}>{s.val}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{s.sub}</div>
            </div>
          ))}
        </div>
      )}
      
      {toast && (
        <div style={{
          position: 'fixed', bottom: '20px', right: '20px',
          background: '#0F172A', color: '#fff',
          padding: '12px 20px', borderRadius: '10px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          display: 'flex', alignItems: 'center', gap: '8px',
          zIndex: 9999, fontSize: '13px', fontWeight: '600',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <Sparkles size={16} color="#10B981" style={{ animation: 'pulse 1s infinite' }} />
          {toast}
        </div>
      )}
    </div>
  );
};
