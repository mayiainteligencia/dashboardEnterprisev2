import React, { useState } from 'react';
import {
  FileText, Plus, Download, Send, RefreshCw, Zap,
  Clock, CheckCircle, ChevronRight, Copy, BookOpen,
  AlertTriangle, Atom, User, Calendar, Sparkles,
} from 'lucide-react';

const templates = [
  { id: 'admet', nombre: 'Reporte ADMET Completo', descripcion: 'Evaluación de toxicidad, farmacocinética y riesgo in silico', color: '#F59E0B', campos: ['Resumen ejecutivo', 'Metodología in silico', 'Perfil ADMET', 'Riesgos de toxicidad', 'Conclusión', 'Recomendación clínica'] },
  { id: 'proyecto', nombre: 'Entregable de Proyecto I+D', descripcion: 'Informe técnico completo para cliente de Drug Discovery', color: '#0EA5E9', campos: ['Resumen ejecutivo', 'Objetivo del proyecto', 'Metodología', 'Resultados', 'Análisis comparativo', 'Siguiente experimento', 'Anexo técnico'] },
  { id: 'dossier', nombre: 'Dossier Regulatorio ICH', descripcion: 'Documentación para cumplimiento ICH M7/Q3/COFEPRIS', color: '#7C3AED', campos: ['Resumen ejecutivo', 'Normativa aplicable', 'Análisis de impurezas', 'Evaluación de riesgo', 'Plan de acción', 'Conclusión'] },
  { id: 'patente', nombre: 'Insumos de Patente', descripcion: 'Preparación de documentación para solicitud de patente', color: '#14B8A6', campos: ['Descripción de la invención', 'Estado del arte', 'Novedad y paso inventivo', 'Claims sugeridos', 'Resumen técnico', 'Figuras y anexos'] },
];

const reportesGuardados = [
  { titulo: 'Reporte ADMET — PB-1203', template: 'Reporte ADMET', cliente: 'Laboratorios Mérida', fecha: '2025-06-24', estado: 'Enviado', paginas: 14 },
  { titulo: 'Análisis ICH Q3 — Lote LAB-094', template: 'Dossier Regulatorio ICH', cliente: 'Uso interno', fecha: '2025-06-23', estado: 'Revisión', paginas: 22 },
  { titulo: 'Dossier Patente — Scaffold BZ-8', template: 'Insumos de Patente', cliente: 'Pharbiois IP', fecha: '2025-06-20', estado: 'Borrador', paginas: 38 },
  { titulo: 'Entregable Drug Discovery — Biotech MX', template: 'Proyecto I+D', cliente: 'Biotech MX', fecha: '2025-06-18', estado: 'Enviado', paginas: 29 },
  { titulo: 'Toxicología — PB-3301 (ACE2)', template: 'Reporte ADMET', cliente: 'Uso interno', fecha: '2025-06-15', estado: 'Borrador', paginas: 11 },
];

const secciones_ejemplo: Record<string, string> = {
  'Resumen ejecutivo': 'La molécula PB-1203 (quinazolinona, MW=387 Da, IC50=12 nM contra EGFR) completó satisfactoriamente la evaluación ADMET in silico con un score de 0.91/1.00. Los análisis predicen un perfil favorable de toxicidad hepática (score <0.3), buena permeabilidad intestinal (Caco-2: 28.4 nm/s) y biodisponibilidad oral estimada del 78%. Se recomienda avanzar a síntesis y evaluación in vitro.',
  'Metodología in silico': 'Se emplearon las siguientes plataformas computacionales:\n• pkCSM v2.1 para predicción de propiedades ADMET\n• SwissADME para evaluación de drug-likeness y reglas de Lipinski\n• Maestro/Glide SP para docking molecular contra EGFR (PDB: 1IEP)\n• Gaussian 16 para optimización de geometría (DFT B3LYP/6-31G*)\n• DEREK Nexus para evaluación de toxicología estructural',
  'Perfil ADMET': 'Absorción: Biodisponibilidad oral estimada 78%. Caco-2: 28.4 nm/s (alta permeabilidad). Distribución: LogP=3.2, TPSA=71.2 Å². No penetra BHE. Metabolismo: Sustrato de CYP3A4 (bajo riesgo de interacciones). No inhibe CYP2D6. Eliminación: T½ estimado 6.8h. Toxicidad: Ames negativo, no mutagénico. Toxicidad hepática: score 0.28 (bajo riesgo).',
};

export const ScientificReportCopilot: React.FC = () => {
  const [templateSeleccionado, setTemplateSeleccionado] = useState(templates[0]);
  const [seccionActiva, setSeccionActiva] = useState<string | null>('Resumen ejecutivo');
  const [contenidoEditor, setContenidoEditor] = useState(secciones_ejemplo['Resumen ejecutivo'] || '');
  const [generando, setGenerando] = useState(false);
  const [tab, setTab] = useState<'nuevo' | 'historial'>('nuevo');
  const [moleculaRef, setMolecularRef] = useState('PB-1203');
  const [clienteRef, setClienteRef] = useState('Laboratorios Mérida');
  const [reportes, setReportes] = useState(reportesGuardados);

  const simularGeneracion = () => {
    setGenerando(true);
    setTimeout(() => {
      setGenerando(false);
      if (seccionActiva && secciones_ejemplo[seccionActiva]) {
        setContenidoEditor(secciones_ejemplo[seccionActiva]);
      } else {
        setContenidoEditor(`Contenido generado por MAYIA Scientific para la sección "${seccionActiva}" basado en los datos de ${moleculaRef}.\n\nEsta sección incluye análisis detallados, metodología científica validada y recomendaciones específicas para el cliente ${clienteRef}.\n\nSe han considerado los estándares ICH aplicables y las regulaciones COFEPRIS vigentes.`);
      }
    }, 2200);
  };

  const exportarReporte = () => {
    let contenido = `PHARBIOIS SCIENTIFIC REPORT\n=========================\n`;
    contenido += `Reporte: ${templateSeleccionado.nombre}\n`;
    contenido += `Molécula: ${moleculaRef}\n`;
    contenido += `Cliente: ${clienteRef}\n`;
    contenido += `Fecha: ${new Date().toLocaleDateString()}\n\n`;
    contenido += `--- Contenido de la sección: ${seccionActiva} ---\n\n`;
    contenido += contenidoEditor;

    const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${templateSeleccionado.id}_reporte_${moleculaRef}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const enviarACliente = () => {
    const nuevoReporte = {
      titulo: `${templateSeleccionado.nombre} — ${moleculaRef}`,
      template: templateSeleccionado.nombre,
      cliente: clienteRef,
      fecha: new Date().toISOString().split('T')[0],
      estado: 'Enviado',
      paginas: Math.floor(Math.random() * 20) + 10
    };
    setReportes(prev => [nuevoReporte, ...prev]);
    setTab('historial');
  };

  const cargarReporteHistorial = (rep: typeof reportesGuardados[0]) => {
    setMolecularRef(rep.titulo.split(' — ')[1] || 'PB-1203');
    setClienteRef(rep.cliente);
    setContenidoEditor(`Reporte recuperado del historial: ${rep.titulo}\n\nEste reporte consta de ${rep.paginas} páginas y fue enviado el ${rep.fecha}.\n\nEl documento fue revisado y validado satisfactoriamente.`);
    setTab('nuevo');
  };

  const estadoColor: Record<string, string> = {
    'Enviado': '#10B981',
    'Revisión': '#F59E0B',
    'Borrador': '#64748B',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1400px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '13px', background: 'linear-gradient(135deg, #0EA5E9, #38BDF8)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(14,165,233,0.3)' }}>
            <FileText size={20} color="#fff" />
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', margin: 0 }}>Scientific Report Copilot</h2>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>Agente generador de reportes científicos y regulatorios con IA</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn-secondary" onClick={exportarReporte}><Download size={14}/> Exportar PDF</button>
          <button className="btn-primary" onClick={enviarACliente}><Send size={14}/> Enviar a Cliente</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', background: '#F1F5F9', borderRadius: '12px', padding: '4px', width: 'fit-content' }}>
        {([['nuevo', 'Nuevo Reporte'], ['historial', 'Historial']] as const).map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{ padding: '8px 18px', borderRadius: '9px', fontSize: '13px', fontWeight: '600', background: tab === id ? 'rgba(14,165,233,0.1)' : 'transparent', border: tab === id ? '1px solid rgba(14,165,233,0.25)' : '1px solid transparent', color: tab === id ? '#0284C7' : '#64748B', cursor: 'pointer', transition: 'all 0.2s' }}>{label}</button>
        ))}
      </div>

      {tab === 'nuevo' && (
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '20px', alignItems: 'start' }}>

          {/* Left: Template selector + config */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Template selector */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '16px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>Tipo de Reporte</div>
              {templates.map(t => (
                <button key={t.id} onClick={() => setTemplateSeleccionado(t)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '10px', marginBottom: '6px', background: templateSeleccionado.id === t.id ? `${t.color}15` : 'transparent', border: `1px solid ${templateSeleccionado.id === t.id ? `${t.color}44` : 'transparent'}`, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: t.color, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: templateSeleccionado.id === t.id ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{t.nombre}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '1px' }}>{t.descripcion}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Config */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '16px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>Contexto del Reporte</div>
              {[
                { label: 'Molécula / Proyecto', val: moleculaRef, setter: setMolecularRef },
                { label: 'Cliente / Destinatario', val: clienteRef, setter: setClienteRef },
              ].map(f => (
                <div key={f.label} style={{ marginBottom: '10px' }}>
                  <label style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: '600', display: 'block', marginBottom: '5px' }}>{f.label}</label>
                  <input value={f.val} onChange={e => f.setter(e.target.value)} style={{ width: '100%', padding: '8px 10px', background: '#F1F5F9', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '12px', outline: 'none' }} />
                </div>
              ))}
            </div>

            {/* Sections list */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '16px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>Secciones del Reporte</div>
              {templateSeleccionado.campos.map((campo, i) => (
                <button key={campo} onClick={() => { setSeccionActiva(campo); setContenidoEditor(secciones_ejemplo[campo] || ''); }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 10px', borderRadius: '9px', marginBottom: '4px', background: seccionActiva === campo ? 'rgba(14,165,233,0.1)' : 'transparent', border: `1px solid ${seccionActiva === campo ? 'rgba(14,165,233,0.25)' : 'transparent'}`, cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}>
                  <span style={{ width: '18px', height: '18px', borderRadius: '6px', background: seccionActiva === campo ? 'rgba(14,165,233,0.15)' : '#F1F5F9', border: `1px solid ${seccionActiva === campo ? 'rgba(14,165,233,0.3)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: '#64748B', fontWeight: '700', flexShrink: 0 }}>{i + 1}</span>
                  <span style={{ fontSize: '12px', fontWeight: seccionActiva === campo ? '600' : '500', color: seccionActiva === campo ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{campo}</span>
                  {secciones_ejemplo[campo] && <CheckCircle size={12} color="#10B981" style={{ marginLeft: 'auto' }} />}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Editor */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Editor premium con look de dossier científico impreso */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              
              {/* Barra superior de herramientas */}
              <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F8FAFC' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
                    Sección: {seccionActiva || 'Selecciona una sección'}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Referencia: <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: '700' }}>{moleculaRef}</span> · Cliente: {clienteRef}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => navigator.clipboard?.writeText(contenidoEditor)} className="btn-secondary" style={{ padding: '8px 12px', fontSize: '12px', gap: '4px' }}>
                    <Copy size={13}/> Copiar
                  </button>
                  <button
                    onClick={() => simularGeneracion()}
                    disabled={generando}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      padding: '8px 14px',
                      background: generando ? 'rgba(14,165,233,0.2)' : 'linear-gradient(135deg, #0EA5E9, #0284C7)',
                      border: 'none',
                      borderRadius: '9px',
                      color: '#fff', fontSize: '12px', fontWeight: '700',
                      cursor: generando ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {generando ? <><RefreshCw size={13} style={{ animation: 'spin 1s linear infinite' }}/> Generando…</> : <><Zap size={13}/> Generar con MAYIA</>}
                  </button>
                </div>
              </div>

              {generando && (
                <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--border)', background: 'rgba(14,165,233,0.05)' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <span className="dot" style={{ animationDelay: '0s' }}>.</span>
                    <span className="dot" style={{ animationDelay: '0.2s' }}>.</span>
                    <span className="dot" style={{ animationDelay: '0.4s' }}>.</span>
                  </div>
                  <span style={{ fontSize: '12px', color: '#0EA5E9', fontWeight: '600' }}>
                    Generando redacción científica para {moleculaRef}...
                  </span>
                </div>
              )}

              {/* Dossier de papel físico */}
              <div style={{ padding: '30px', background: '#FFF', borderBottom: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
                
                {/* Membrete Oficial Pharbiois */}
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #E2E8F0', paddingBottom: '12px', marginBottom: '10px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Atom size={16} color="#0ea5e9" />
                      <span style={{ fontSize: '12px', fontWeight: '800', color: '#0F172A', letterSpacing: '0.08em' }}>PHARBIOIS</span>
                    </div>
                    <div style={{ fontSize: '9px', color: '#94A3B8', marginTop: '2px' }}>AI BioPharma Research & Innovations</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '9px', fontWeight: '700', color: '#0ea5e9', fontFamily: 'JetBrains Mono, monospace' }}>FOLIO: PB-REP-{moleculaRef}-{new Date().getFullYear()}</div>
                    <div style={{ fontSize: '8px', color: '#94A3B8', marginTop: '1px' }}>VALIDADO CON INTELIGENCIA ARTIFICIAL</div>
                  </div>
                </div>

                {/* Sello de agua sutil de fondo */}
                <div style={{ position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%) rotate(-15deg)', fontSize: '24px', fontWeight: '900', color: 'rgba(14,165,233,0.03)', pointerEvents: 'none', userSelect: 'none', letterSpacing: '0.15em', zIndex: 0, textAlign: 'center' }}>
                  MAYIA SCIENTIFIC VALIDATION<br/>PHARBIOIS COPILET
                </div>

                <textarea
                  value={contenidoEditor}
                  onChange={e => setContenidoEditor(e.target.value)}
                  placeholder={`Escribe el contenido de "${seccionActiva}" o genera con IA…`}
                  style={{
                    width: '100%', minHeight: '300px',
                    background: 'transparent',
                    border: 'none', outline: 'none',
                    color: '#1E293B', fontSize: '13px',
                    lineHeight: 1.7, resize: 'vertical',
                    fontFamily: 'Georgia, serif',
                    position: 'relative', zIndex: 1
                  }}
                />

                {/* Pie de página del Dossier */}
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #F1F5F9', paddingTop: '10px', fontSize: '9px', color: '#94A3B8', marginTop: '10px' }}>
                  <span>Confidencial · Uso del destinatario</span>
                  <span>Página 1 de 1</span>
                </div>
              </div>
            </div>

            {/* Summary & Gauge Chart */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              
              {/* GAUGE CHART: Calidad e integridad formal de la sección */}
              {(() => {
                const len = contenidoEditor.length;
                const score = len === 0 ? 0 : Math.min(Math.floor(len / 4.5) + 15, 98);
                const angle = (score / 100) * 180 - 90; // Convertir a grados (-90 a 90)
                
                // Color semántico según score
                const color = score >= 80 ? '#10B981' : score >= 50 ? '#F59E0B' : '#EF4444';

                return (
                  <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px' }}>Integridad Redacción</div>
                    
                    {/* SVG Gauge */}
                    <svg width="100" height="55" viewBox="0 0 100 50">
                      {/* Arco de fondo */}
                      <path d="M 15 45 A 35 35 0 0 1 85 45" fill="none" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round" />
                      {/* Arco del valor */}
                      <path d="M 15 45 A 35 35 0 0 1 85 45" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" strokeDasharray="110" strokeDashoffset={110 - (score / 100) * 110} />
                      {/* Pivote de la aguja */}
                      <circle cx="50" cy="45" r="4" fill="#1E293B" />
                      {/* Aguja del gauge */}
                      <line x1="50" y1="45" x2="50" y2="20" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" transform={`rotate(${angle} 50 45)`} style={{ transition: 'transform 0.5s ease-in-out' }} />
                    </svg>
                    
                    <div style={{ fontSize: '16px', fontWeight: '800', color: color, marginTop: '2px', fontFamily: 'Outfit, sans-serif' }}>{score}%</div>
                  </div>
                );
              })()}

              {[
                { label: 'Secciones completadas', val: `${Object.keys(secciones_ejemplo).filter(k => templateSeleccionado.campos.includes(k)).length}/${templateSeleccionado.campos.length}`, color: '#0EA5E9' },
                { label: 'Palabras estimadas', val: `~${Math.floor(contenidoEditor.length / 6)} palabras`, color: '#7C3AED' },
              ].map(s => (
                <div key={s.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: s.color, fontFamily: 'Outfit, sans-serif' }}>{s.val}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '5px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'historial' && (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '18px', overflow: 'hidden' }}>
          <table className="pharb-table">
            <thead><tr><th>Título del Reporte</th><th>Tipo</th><th>Cliente</th><th>Fecha</th><th>Páginas</th><th>Estado</th><th></th></tr></thead>
            <tbody>
              {reportes.map((r, i) => (
                <tr key={i} onClick={() => cargarReporteHistorial(r)} style={{ cursor: 'pointer' }}>
                  <td>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>{r.titulo}</div>
                  </td>
                  <td style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{r.template}</td>
                  <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{r.cliente}</td>
                  <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{r.fecha}</td>
                  <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{r.paginas}p.</td>
                  <td>
                    <span style={{ padding: '3px 10px', borderRadius: '8px', background: `${estadoColor[r.estado]}22`, color: estadoColor[r.estado], fontSize: '11px', fontWeight: '700', border: `1px solid ${estadoColor[r.estado]}44` }}>
                      {r.estado}
                    </span>
                  </td>
                  <td><ChevronRight size={14} color="#94A3B8" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
