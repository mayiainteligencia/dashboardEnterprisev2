import React, { useState, useRef, useEffect } from 'react';
import {
  FlaskConical, AlertTriangle, CheckCircle, Shield,
  Send, RefreshCw, Plus, Download, Search, Zap,
  ChevronRight, Clock, Info, X, FileText,
  Activity, TrendingUp, BarChart3,
} from 'lucide-react';

const alertasRegulatoria = [
  { id: 'R001', tipo: 'Crítica', normativa: 'ICH M7', molecula: 'PB-2847', descripcion: 'Presencia de nitrosamina NDMA (N-nitrosodimetilamina) detectada in silico en ruta de síntesis propuesta. Concentración proyectada: 0.096 µg/día > TTC de 0.0153 µg/día (Categoría 1)', accion: 'Rediseño de ruta sintética o justificación técnica completa. Análisis confirmatorio analítico obligatorio.', fecha: '2025-06-26', estado: 'Pendiente', responsable: 'Dr. Morales', impacto: 'Bloquea presentación regulatoria' },
  { id: 'R002', tipo: 'Crítica', normativa: 'ICH M7', molecula: 'Lote LAB-094', descripcion: 'Impureza genotóxica categoría 2 identificada sin justificación toxicológica de umbral aceptable. Requisito ICH M7 Sección 6: Evaluar mediante TTC o estudio de genotoxicidad confirmatorio.', accion: 'Presentar justificación toxicológica o estudios in vitro (Ames test, micronúcleo) antes del 15/julio.', fecha: '2025-06-24', estado: 'En revisión', responsable: 'Dra. López', impacto: 'Retención de lote' },
  { id: 'R003', tipo: 'Alta', normativa: 'ICH Q3A/Q3B', molecula: 'PB-4102', descripcion: 'Degradante de oxidación (0.38%) supera umbral de reporte (0.1%) sin identificación estructural. Requiere caracterización química y evaluación toxicológica según ICH Q3A Section 3.2.', accion: 'Identificar estructura del degradante y evaluar toxicidad. Plazo: 30 días hábiles.', fecha: '2025-06-22', estado: 'En revisión', responsable: 'Dr. Castro', impacto: 'Retrasa entregable al cliente' },
  { id: 'R004', tipo: 'Media', normativa: 'COFEPRIS', molecula: 'PB-1203', descripcion: 'Documentación para registro ante COFEPRIS incompleta: falta el Apéndice A del CTD (Common Technical Document) con datos de estabilidad acelerada a 40°C/75%HR.', accion: 'Generar protocolo de estabilidad e iniciar estudio en cámara climática. ETA: 6 meses.', fecha: '2025-06-20', estado: 'Planificado', responsable: 'Lic. Torres', impacto: 'Retrasa registro' },
  { id: 'R005', tipo: 'Baja', normativa: 'ICH M12', molecula: 'PB-0892', descripcion: 'Interacción farmacológica potencial con CYP3A4 y P-gp identificada in silico. ICH M12 requiere evaluación de DDI in vitro antes de estudios clínicos.', accion: 'Programar ensayo de inhibición CYP3A4 y evaluación de P-gp en sistema de expresión heterólogo.', fecha: '2025-06-18', estado: 'Planificado', responsable: 'Dra. Ramírez', impacto: 'Requiere estudio adicional' },
];

const checklistItems = [
  { categoria: 'ICH M7', items: ['Evaluación in silico de alertas estructurales', 'Análisis de nitrosaminas en materia prima', 'Justificación TTC o estudio confirmatorio', 'Documentación de impurezas < TTC'], completados: [true, true, false, false] },
  { categoria: 'ICH Q3A/Q3B', items: ['Identificación de degradantes >0.1%', 'Caracterización estructural de impurezas', 'Evaluación toxicológica de impurezas calificadas', 'Especificaciones de aceptación justificadas'], completados: [true, false, false, true] },
  { categoria: 'COFEPRIS', items: ['Dossier técnico CTD completo', 'Datos de estabilidad (zona IVb)', 'Equivalencia terapéutica (si aplica)', 'Aprobación de uso de planta farmacéutica'], completados: [false, false, true, true] },
  { categoria: 'ADMET/Toxicidad', items: ['Score ADMET ≥ 0.70 en candidatos', 'Toxicidad hepática < 0.4 (pkCSM)', 'Sin alertas Derek Nexus categ. 1', 'Solubilidad acuosa ≥ 10 µg/mL'], completados: [true, true, false, true] },
];

const tipoConfig: Record<string, { color: string; bg: string; border: string }> = {
  'Crítica': { color: '#EF4444', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.3)' },
  'Alta':    { color: '#F97316', bg: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.3)' },
  'Media':   { color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)' },
  'Baja':    { color: '#10B981', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)' },
};

const estadoColor: Record<string, string> = {
  'Pendiente': '#EF4444',
  'En revisión': '#F59E0B',
  'Planificado': '#0EA5E9',
  'Cerrado': '#10B981',
};

interface ChatMsg { from: 'user' | 'ai'; texto: string; }

const chatInicial: ChatMsg[] = [
  { from: 'ai', texto: 'Hola, soy MAYIA Regulatory. Puedo ayudarte a evaluar riesgo de impurezas, nitrosaminas (ICH M7), cumplimiento COFEPRIS, o preparar documentación técnica. ¿Qué necesitas revisar hoy?' },
];

export const RegulatoryIntelligence: React.FC = () => {
  const [tab, setTab] = useState<'alertas' | 'checklist' | 'chat'>('alertas');
  const [mensajeChat, setMensajeChat] = useState('');
  const [chatMsgs, setChatMsgs] = useState<ChatMsg[]>(chatInicial);
  const [enviando, setEnviando] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  
  // Reactivizar el checklist
  const [checklist, setChecklist] = useState(checklistItems);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chatMsgs]);

  const toggleChecklistItem = (catIdx: number, itemIdx: number) => {
    const newChecklist = [...checklist];
    newChecklist[catIdx].completados[itemIdx] = !newChecklist[catIdx].completados[itemIdx];
    setChecklist(newChecklist);
  };

  const enviarMensaje = (textoPersonalizado?: string | React.MouseEvent) => {
    const userMsg = typeof textoPersonalizado === 'string' ? textoPersonalizado : mensajeChat.trim();
    if (!userMsg) return;
    setChatMsgs(prev => [...prev, { from: 'user', texto: userMsg }]);
    setMensajeChat('');
    setEnviando(true);
    setTimeout(() => {
      let respuesta = 'Analizando tu consulta regulatoria con base en ICH M7, Q3A/Q3B y las regulaciones COFEPRIS vigentes…\n\n';
      if (userMsg.toLowerCase().includes('nitrosamin') || userMsg.toLowerCase().includes('ndma')) {
        respuesta = 'ICH M7 establece que las nitrosaminas potencialmente genotóxicas requieren evaluación TTC (Threshold of Toxicological Concern). El límite aceptable para NDMA es 0.0153 µg/día (TTC clase 1). Si tu molécula tiene una amina secundaria + grupo nitrosante en la ruta de síntesis, es obligatorio realizar análisis confirmatorio (HPLC-MS/MS). ¿Necesito revisar la estructura específica de PB-2847?';
      } else if (userMsg.toLowerCase().includes('cofepris')) {
        respuesta = 'Para el registro ante COFEPRIS en México, el dossier sigue el formato CTD (Common Technical Document) con 5 módulos. Los datos de estabilidad deben generarse bajo condiciones de zona climática IVb (40°C/75%HR). El tiempo promedio de evaluación es 12-18 meses para nuevas moléculas. ¿En qué módulo específico tienes dudas?';
      } else if (userMsg.toLowerCase().includes('admet') || userMsg.toLowerCase().includes('toxicidad')) {
        respuesta = 'Para evaluación ADMET in silico te recomendamos: pkCSM para predicción multiparamétrica (absorción, distribución, metabolismo, excreción), Derek Nexus para alertas estructurales de toxicidad, y SwissADME para drug-likeness. Un score ADMET ≥ 0.75 indica perfil aceptable para candidatos farmacológicos. ¿Quieres que evalúe alguna molécula específica?';
      } else {
        respuesta = 'He registrado tu consulta regulatoria. Con base en la normativa ICH aplicable y la regulación COFEPRIS, te recomiendo revisar el checklist de cumplimiento en la pestaña correspondiente. Para un análisis específico de tu molécula, proporciona el ID o la estructura SMILES y evaluaré el perfil regulatorio completo.';
      }
      setChatMsgs(prev => [...prev, { from: 'ai', texto: respuesta }]);
      setEnviando(false);
    }, 2000);
  };

  const simularRespuestaAlerta = (alerta: typeof alertasRegulatoria[0]) => {
    setTab('chat');
    enviarMensaje(`Genera justificación toxicológica y plan de acción para alerta ${alerta.id} de la molécula ${alerta.molecula} bajo la norma ${alerta.normativa}`);
  };

  const descargarChecklist = () => {
    let contenido = 'Categoria,Item,Completado\n';
    checklist.forEach(cat => {
      cat.items.forEach((item, idx) => {
        contenido += `"${cat.categoria}","${item}","${cat.completados[idx] ? 'SI' : 'NO'}"\n`;
      });
    });
    const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'Pharbiois_Regulatory_Checklist.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const criticas = alertasRegulatoria.filter(a => a.tipo === 'Crítica').length;
  const pendientes = alertasRegulatoria.filter(a => a.estado === 'Pendiente').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1400px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '13px', background: 'linear-gradient(135deg, #EF4444, #F97316)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(239,68,68,0.35)' }}>
            <FlaskConical size={20} color="#fff" />
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', margin: 0 }}>Regulatory Intelligence Agent</h2>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>Monitor ICH M7/Q3/M12 · COFEPRIS · Nitrosaminas · ADMET Compliance</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn-secondary" onClick={descargarChecklist}><Download size={14}/> Exportar checklist</button>
          <button className="btn-primary" onClick={() => setTab('chat')}><Zap size={14}/> Consultar Agente IA</button>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
        {[
          { label: 'Alertas activas', val: alertasRegulatoria.length.toString(), color: '#EF4444', sub: `${criticas} críticas`, icon: AlertTriangle },
          { label: 'Pendientes de acción', val: pendientes.toString(), color: '#F59E0B', sub: 'Requieren respuesta', icon: Clock },
          { label: 'Moléculas en revisión', val: '5', color: '#0EA5E9', sub: 'Bajo evaluación regulatoria', icon: FlaskConical },
          { label: 'Normativas cubiertas', val: '6', color: '#10B981', sub: 'ICH M7, Q3, M12, COFEPRIS…', icon: Shield },
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
        {([['alertas', 'Alertas Regulatorias'], ['checklist', 'Checklist de Cumplimiento'], ['chat', 'Agente Regulatorio IA']] as const).map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{ padding: '8px 18px', borderRadius: '9px', fontSize: '13px', fontWeight: '600', background: tab === id ? 'rgba(239,68,68,0.1)' : 'transparent', border: tab === id ? '1px solid rgba(239,68,68,0.25)' : '1px solid transparent', color: tab === id ? '#EF4444' : '#64748B', cursor: 'pointer', transition: 'all 0.2s' }}>{label}</button>
        ))}
      </div>

      {tab === 'alertas' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {alertasRegulatoria.map(a => {
            const cfg = tipoConfig[a.tipo];
            return (
              <div key={a.id} style={{ background: 'var(--bg-card)', border: `1px solid ${cfg.border}`, borderRadius: '16px', overflow: 'hidden' }}>
                <div style={{ padding: '14px 18px', background: cfg.bg, display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <span style={{ padding: '3px 10px', borderRadius: '8px', background: cfg.bg, color: cfg.color, fontSize: '11px', fontWeight: '700', border: `1px solid ${cfg.border}` }}>
                    {a.tipo.toUpperCase()} · {a.normativa}
                  </span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: 'var(--text-secondary)' }}>{a.molecula}</span>
                  <span style={{ marginLeft: 'auto', fontSize: '11px', color: estadoColor[a.estado], fontWeight: '700' }}>● {a.estado}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{a.fecha} · {a.responsable}</span>
                </div>
                <div style={{ padding: '16px 18px' }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.5 }}>{a.descripcion}</div>
                  <div style={{ padding: '10px 14px', background: 'rgba(14,165,233,0.06)', border: '1px solid rgba(14,165,233,0.2)', borderRadius: '10px', marginBottom: '10px' }}>
                    <div style={{ fontSize: '10px', color: '#38BDF8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Acción requerida</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{a.accion}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Impacto: <span style={{ color: cfg.color, fontWeight: '600' }}>{a.impacto}</span></span>
                    <button onClick={() => simularRespuestaAlerta(a)} style={{ marginLeft: 'auto', padding: '7px 14px', background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.25)', borderRadius: '8px', color: '#38BDF8', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
                      Generar respuesta con IA
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'checklist' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', alignItems: 'start' }}>
          
          {/* Lado izquierdo: Checklist de Categorías */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {checklist.map((cat, catIdx) => {
              const completados = cat.completados.filter(Boolean).length;
              const pct = Math.round((completados / cat.items.length) * 100);
              return (
                <div key={cat.categoria} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.01)' }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F8FAFC' }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>{cat.categoria}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ height: '4px', width: '80px', background: 'var(--border)', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: pct >= 75 ? '#10B981' : pct >= 50 ? '#F59E0B' : '#EF4444', borderRadius: '999px' }} />
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: '700', color: pct >= 75 ? '#10B981' : pct >= 50 ? '#F59E0B' : '#EF4444' }}>{pct}%</span>
                    </div>
                  </div>
                  <div style={{ padding: '10px 16px' }}>
                    {cat.items.map((item, i) => (
                      <div key={i} onClick={() => toggleChecklistItem(catIdx, i)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: i < cat.items.length - 1 ? '1px solid var(--border)' : 'none', cursor: 'pointer' }}>
                        {cat.completados[i] ? (
                          <CheckCircle size={15} color="#10B981" style={{ flexShrink: 0 }} />
                        ) : (
                          <div style={{ width: '15px', height: '15px', borderRadius: '50%', border: '2px solid var(--border)', flexShrink: 0 }} />
                        )}
                        <span style={{ fontSize: '12px', color: cat.completados[i] ? 'var(--text-muted)' : 'var(--text-primary)', fontWeight: cat.completados[i] ? '400' : '500', textDecoration: cat.completados[i] ? 'line-through' : 'none' }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Lado derecho: Indicadores de Cumplimiento SVG */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* 1. Progreso Radial Global */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '100%', fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>Cumplimiento Global</div>
              
              {(() => {
                let totalItems = 0;
                let totalCompletados = 0;
                checklist.forEach(c => {
                  totalItems += c.items.length;
                  totalCompletados += c.completados.filter(Boolean).length;
                });
                const globalPct = Math.round((totalCompletados / totalItems) * 100);
                
                // Parámetros de arco circular SVG
                const radius = 35;
                const circumference = 2 * Math.PI * radius;
                const offset = circumference - (globalPct / 100) * circumference;

                return (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '24px', width: '100%', justifyContent: 'center' }}>
                    <div style={{ position: 'relative', width: '90px', height: '90px' }}>
                      <svg width="90" height="90" viewBox="0 0 90 90" style={{ transform: 'rotate(-90deg)' }}>
                        {/* Círculo de fondo */}
                        <circle cx="45" cy="45" r={radius} fill="none" stroke="#F1F5F9" strokeWidth="8" />
                        {/* Círculo de valor */}
                        <circle cx="45" cy="45" r={radius} fill="none" stroke="url(#radialGrad)" strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
                        
                        <defs>
                          <linearGradient id="radialGrad" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#EF4444" />
                            <stop offset="100%" stopColor="#F59E0B" />
                          </linearGradient>
                        </defs>
                      </svg>
                      {/* Texto central */}
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>{globalPct}%</span>
                        <span style={{ fontSize: '8px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Completado</span>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>Índice de Preparación CTD</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', lineHeight: 1.4 }}>
                        {totalCompletados} de {totalItems} ítems del dossier biotecnológico completados con éxito.
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* 2. Gráfico de Donut de Alertas por Severidad */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '100%', fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>Severidad Alertas Reguladoras</div>
              
              {(() => {
                // Alertas de ejemplo: 2 Críticas, 1 Alta, 1 Media, 1 Baja. Total = 5.
                // Proporciones: Crítica=40% (#EF4444), Alta=20% (#F97316), Media/Baja=40% (#F59E0B/#10B981)
                const cRadius = 30;
                const cCircum = 2 * Math.PI * cRadius;

                return (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '24px', width: '100%', justifyContent: 'center' }}>
                    <svg width="80" height="80" viewBox="0 0 80 80" style={{ transform: 'rotate(-90deg)' }}>
                      {/* Crítica (40% de 100) -> offset = 0, strokeDashoffset = cCircum * 0.6 */}
                      <circle cx="40" cy="40" r={cRadius} fill="none" stroke="#EF4444" strokeWidth="8" strokeDasharray={cCircum} strokeDashoffset={cCircum * 0.6} />
                      
                      {/* Alta (20% de 100) -> offset = 40% (cCircum * 0.4), strokeDashoffset = cCircum * 0.8 */}
                      <circle cx="40" cy="40" r={cRadius} fill="none" stroke="#F97316" strokeWidth="8" strokeDasharray={cCircum} strokeDashoffset={cCircum * 0.8} transform="rotate(144 40 40)" />

                      {/* Media/Baja (40% de 100) -> offset = 60% (cCircum * 0.6), strokeDashoffset = cCircum * 0.6 */}
                      <circle cx="40" cy="40" r={cRadius} fill="none" stroke="#F59E0B" strokeWidth="8" strokeDasharray={cCircum} strokeDashoffset={cCircum * 0.6} transform="rotate(216 40 40)" />
                    </svg>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {[
                        { label: 'Críticas', val: '2 (40%)', col: '#EF4444' },
                        { label: 'Altas', val: '1 (20%)', col: '#F97316' },
                        { label: 'Medias/Bajas', val: '2 (40%)', col: '#F59E0B' },
                      ].map(d => (
                        <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: d.col }} />
                          <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: '600' }}>{d.label}:</span>
                          <span style={{ fontSize: '11px', color: 'var(--text-primary)', fontWeight: '700' }}>{d.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {tab === 'chat' && (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '18px', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '520px' }}>
          {/* Chat header */}
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(239,68,68,0.05)' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #EF4444, #F97316)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FlaskConical size={16} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>MAYIA Regulatory</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Especialista en ICH M7, Q3, COFEPRIS, ADMET y Nitrosaminas</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#10B981' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px rgba(16,185,129,0.6)' }} />
              Activo
            </div>
          </div>

          {/* Suggestions */}
          <div style={{ padding: '10px 18px', borderBottom: '1px solid var(--border)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['Evalúa riesgo de nitrosaminas en PB-2847', '¿Qué requiere COFEPRIS para registro?', 'Interpreta ICH M7 para impurezas genotóxicas'].map(s => (
              <button key={s} onClick={() => setMensajeChat(s)} style={{ padding: '5px 12px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', color: '#EF4444', fontSize: '11px', cursor: 'pointer', fontWeight: '500' }}>
                {s}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div ref={chatRef} className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {chatMsgs.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start' }}>
                {msg.from === 'ai' && (
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg, #EF4444, #F97316)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginRight: '8px', marginTop: '2px' }}>
                    <FlaskConical size={13} color="#fff" />
                  </div>
                )}
                <div style={{
                  maxWidth: '78%', padding: '10px 14px', borderRadius: msg.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.from === 'user' ? 'linear-gradient(135deg, #EF4444, #F97316)' : 'var(--bg-secondary)',
                  border: msg.from === 'ai' ? '1px solid var(--border)' : 'none',
                  color: 'var(--text-primary)', fontSize: '13px', lineHeight: 1.6, whiteSpace: 'pre-line',
                }}>
                  {msg.texto}
                </div>
              </div>
            ))}
            {enviando && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg, #EF4444, #F97316)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FlaskConical size={13} color="#fff" />
                </div>
                <div style={{ padding: '10px 14px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '16px 16px 16px 4px' }}>
                  <div className="typing-dots"><span/><span/><span/></div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{ padding: '12px 18px', borderTop: '1px solid var(--border)', display: 'flex', gap: '10px' }}>
            <input
              value={mensajeChat}
              onChange={e => setMensajeChat(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && enviarMensaje()}
              placeholder="Consulta sobre ICH, COFEPRIS, nitrosaminas, ADMET…"
              style={{ flex: 1, padding: '10px 14px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '13px', outline: 'none' }}
            />
            <button
              onClick={enviarMensaje}
              disabled={enviando || !mensajeChat.trim()}
              style={{ width: '42px', height: '42px', borderRadius: '10px', background: mensajeChat.trim() && !enviando ? 'linear-gradient(135deg, #EF4444, #F97316)' : '#F1F5F9', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: mensajeChat.trim() && !enviando ? 'pointer' : 'not-allowed', color: '#fff', transition: 'all 0.2s' }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
