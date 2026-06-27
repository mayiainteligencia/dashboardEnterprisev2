import React, { useState } from 'react';
import {
  Atom, Filter, Plus, Search, Download, RefreshCw,
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle,
  ChevronRight, Info, Dna, FlaskConical, Microscope, Zap, Sparkles,
} from 'lucide-react';

const moleculas = [
  { id: 'PB-0892', nombre: 'PB-0892', target: 'MCL-1 BH3 Pocket', clase: 'BH3 Mimético', stage: 'Preclínica', scoreADMET: 0.85, logP: 2.1, MW: 412, HBD: 2, HBA: 6, TPSA: 82.4, riesgo: 'Bajo', toxicidad: 'Baja', solubilidad: 'Alta', proyecto: 'Oncología - Apoptosis', investigador: 'Dra. Ramírez', actualizado: '2025-06-20', patente: 'En proceso', ic50: '45 nM' },
  { id: 'PB-1203', nombre: 'PB-1203', target: 'EGFR Tyr Kinase', clase: 'Quinazolinona', stage: 'Candidata', scoreADMET: 0.91, logP: 3.2, MW: 387, HBD: 1, HBA: 5, TPSA: 71.2, riesgo: 'Bajo', toxicidad: 'Baja', solubilidad: 'Alta', proyecto: 'Oncología - NSCLC', investigador: 'Dr. Morales', actualizado: '2025-06-24', patente: 'Concedida', ic50: '12 nM' },
  { id: 'PB-2847', nombre: 'PB-2847', target: 'COX-2 Sitio Activo', clase: 'Diaryl Sulfona', stage: 'ADMET', scoreADMET: 0.78, logP: 1.8, MW: 356, HBD: 0, HBA: 4, TPSA: 63.8, riesgo: 'Medio', toxicidad: 'Media (Hep)', solubilidad: 'Media', proyecto: 'Anti-inflamatorio', investigador: 'Dra. López', actualizado: '2025-06-26', patente: 'Sin solicitud', ic50: '89 nM' },
  { id: 'PB-3301', nombre: 'PB-3301', target: 'ACE2 Spike Interface', clase: 'Péptido Cíclico', stage: 'Diseño', scoreADMET: 0.64, logP: -0.4, MW: 678, HBD: 7, HBA: 12, TPSA: 195.0, riesgo: 'Alto', toxicidad: 'Sin datos', solubilidad: 'Alta', proyecto: 'Antiviral Broad-Spectrum', investigador: 'Dr. Vega', actualizado: '2025-06-15', patente: 'Sin solicitud', ic50: 'ND' },
  { id: 'PB-4102', nombre: 'PB-4102', target: 'mTOR FKBP12', clase: 'Macrolida', stage: 'Síntesis', scoreADMET: 0.73, logP: 4.1, MW: 821, HBD: 3, HBA: 14, TPSA: 196.6, riesgo: 'Medio', toxicidad: 'Media (CYP)', solubilidad: 'Baja', proyecto: 'Inmunomodulador', investigador: 'Dr. Castro', actualizado: '2025-06-18', patente: 'Sin solicitud', ic50: '240 nM' },
  { id: 'PB-0147', nombre: 'PB-0147', target: 'HDAC1/2 Zinc Site', clase: 'Hydroxamato', stage: 'Candidata', scoreADMET: 0.88, logP: 2.7, MW: 301, HBD: 3, HBA: 5, TPSA: 94.5, riesgo: 'Bajo', toxicidad: 'Baja', solubilidad: 'Media', proyecto: 'Epigenética Oncológica', investigador: 'Dra. Núñez', actualizado: '2025-06-22', patente: 'En proceso', ic50: '28 nM' },
  { id: 'PB-5593', nombre: 'PB-5593', target: 'PI3Kδ ATP Pocket', clase: 'Imidazopyrimidina', stage: 'Síntesis', scoreADMET: 0.69, logP: 3.8, MW: 445, HBD: 2, HBA: 7, TPSA: 88.2, riesgo: 'Medio', toxicidad: 'Sin datos', solubilidad: 'Media', proyecto: 'Hematología', investigador: 'Dr. Peña', actualizado: '2025-06-10', patente: 'Sin solicitud', ic50: 'ND' },
  { id: 'PB-6621', nombre: 'PB-6621', target: 'GPCR β2-Adrenérgico', clase: 'Fenoxipropanol', stage: 'Diseño', scoreADMET: 0.59, logP: 1.2, MW: 298, HBD: 4, HBA: 6, TPSA: 72.1, riesgo: 'Alto', toxicidad: 'Sin datos', solubilidad: 'Alta', proyecto: 'Cardiovascular', investigador: 'Dra. Torres', actualizado: '2025-06-05', patente: 'Sin solicitud', ic50: 'ND' },
];

const stageConfig: Record<string, { color: string; bg: string; border: string; order: number }> = {
  'Diseño':     { color: '#7C3AED', bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.25)', order: 1 },
  'Síntesis':   { color: '#0284C7', bg: 'rgba(14,165,233,0.1)',  border: 'rgba(14,165,233,0.25)',  order: 2 },
  'ADMET':      { color: '#D97706', bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.25)',  order: 3 },
  'Preclínica': { color: '#EA580C', bg: 'rgba(249,115,22,0.1)',  border: 'rgba(249,115,22,0.25)',  order: 4 },
  'Candidata':  { color: '#16A34A', bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.25)',  order: 5 },
  'Patentada':  { color: '#0D9488', bg: 'rgba(20,184,166,0.1)',  border: 'rgba(20,184,166,0.25)',  order: 6 },
};

const pipelineStages = ['Diseño','Síntesis','ADMET','Preclínica','Candidata','Patentada'];

export const DrugDiscoveryPipeline: React.FC = () => {
  const [busqueda, setBusqueda] = useState('');
  const [filtroStage, setFiltroStage] = useState('Todos');
  const [seleccionada, setSeleccionada] = useState<typeof moleculas[0] | null>(moleculas[1]);
  const [vistaMode, setVistaMode] = useState<'tabla'|'kanban'>('tabla');

  // States interactivos
  const [listaMoleculas, setListaMoleculas] = useState(moleculas);
  const [toast, setToast] = useState<string | null>(null);
  const [analizandoId, setAnalizandoId] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const agregarMolecula = () => {
    const id = `PB-${Math.floor(Math.random() * 9000) + 1000}`;
    const nuevaMol = {
      id, nombre: id,
      target: 'HER2 Receptor Kinase',
      clase: 'Anticuerpo Conjugado',
      stage: 'Diseño',
      scoreADMET: parseFloat((Math.random() * 0.3 + 0.65).toFixed(2)),
      logP: parseFloat((Math.random() * 3 + 1).toFixed(1)),
      MW: Math.floor(Math.random() * 300) + 300,
      HBD: Math.floor(Math.random() * 4),
      HBA: Math.floor(Math.random() * 6) + 4,
      TPSA: parseFloat((Math.random() * 80 + 60).toFixed(1)),
      riesgo: 'Bajo',
      toxicidad: 'Baja',
      solubilidad: 'Alta',
      proyecto: 'Oncología - Mama',
      investigador: 'Dr. Vega',
      actualizado: new Date().toISOString().split('T')[0],
      patente: 'Sin solicitud',
      ic50: `${Math.floor(Math.random() * 100) + 10} nM`
    };
    setListaMoleculas(prev => [nuevaMol, ...prev]);
    showToast(`¡Nueva molécula ${id} generada y añadida al pipeline!`);
  };

  const analizarMolIA = (mol: typeof moleculas[0]) => {
    setAnalizandoId(mol.id);
    showToast(`Iniciando análisis ADMET multivariable para ${mol.nombre}…`);
    setTimeout(() => {
      setListaMoleculas(prev => prev.map(m => {
        if (m.id === mol.id) {
          const nuevoScore = Math.min(parseFloat((m.scoreADMET + 0.05).toFixed(2)), 0.99);
          showToast(`¡Análisis IA finalizado! ADMET Score de ${m.nombre} optimizado a ${nuevoScore}.`);
          setSeleccionada(prevSel => prevSel?.id === mol.id ? { ...m, scoreADMET: nuevoScore } : prevSel);
          return { ...m, scoreADMET: nuevoScore };
        }
        return m;
      }));
      setAnalizandoId(null);
    }, 2000);
  };

  const exportarMolecula = (mol: typeof moleculas[0]) => {
    const contenido = JSON.stringify(mol, null, 2);
    const blob = new Blob([contenido], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `Pharbiois_Molecula_${mol.id}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Dossier de ${mol.nombre} exportado exitosamente.`);
  };

  const moleculasFiltradas = listaMoleculas.filter(m => {
    const matchSearch = m.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      m.target.toLowerCase().includes(busqueda.toLowerCase()) ||
      m.proyecto.toLowerCase().includes(busqueda.toLowerCase());
    const matchStage = filtroStage === 'Todos' || m.stage === filtroStage;
    return matchSearch && matchStage;
  });

  const countByStage = (stage: string) => listaMoleculas.filter(m => m.stage === stage).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1400px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #7C3AED, #0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(124,58,237,0.3)' }}>
              <Atom size={20} color="#fff" />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', margin: 0 }}>Drug Discovery Pipeline</h2>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>Moléculas candidatas validadas por IA · {listaMoleculas.length} en evaluación</p>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn-secondary" onClick={() => setVistaMode(vistaMode === 'tabla' ? 'kanban' : 'tabla')}>
            {vistaMode === 'tabla' ? <FlaskConical size={14}/> : <Atom size={14}/>}
            {vistaMode === 'tabla' ? 'Vista Kanban' : 'Vista Tabla'}
          </button>
          <button className="btn-primary" onClick={agregarMolecula}>
            <Plus size={14}/> Nueva Molécula
          </button>
        </div>
      </div>

      {/* Pipeline stages progress bar */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '18px 20px' }}>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>Distribución del Pipeline</div>
        <div style={{ display: 'flex', alignItems: 'stretch', gap: '4px', height: '56px' }}>
          {pipelineStages.map((stage) => {
            const count = countByStage(stage);
            const cfg = stageConfig[stage];
            const pct = (count / listaMoleculas.length) * 100;
            return (
              <div
                key={stage}
                onClick={() => setFiltroStage(filtroStage === stage ? 'Todos' : stage)}
                style={{
                  flex: pct || 1,
                  background: filtroStage === stage ? cfg.bg : '#F1F5F9',
                  border: `1px solid ${filtroStage === stage ? cfg.border : 'var(--border)'}`,
                  borderRadius: '10px',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all 0.2s',
                  padding: '6px 4px',
                }}
              >
                <div style={{ fontSize: '18px', fontWeight: '800', color: cfg.color, fontFamily: 'Outfit, sans-serif', lineHeight: 1 }}>{count}</div>
                <div style={{ fontSize: '9px', color: cfg.color, fontWeight: '600', textAlign: 'center', lineHeight: 1.2, marginTop: '3px', opacity: 0.85 }}>{stage}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
          <input
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            placeholder="Buscar por ID, target o proyecto…"
            style={{
              width: '100%', padding: '10px 12px 10px 36px',
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: '10px', color: 'var(--text-primary)', fontSize: '13px',
              outline: 'none',
            }}
          />
        </div>
        {['Todos', ...pipelineStages].map(s => (
          <button
            key={s}
            onClick={() => setFiltroStage(s)}
            style={{
              padding: '8px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: '600',
              background: filtroStage === s ? (s === 'Todos' ? 'rgba(14,165,233,0.1)' : stageConfig[s]?.bg || 'rgba(14,165,233,0.1)') : '#F1F5F9',
              border: `1px solid ${filtroStage === s ? (s === 'Todos' ? 'rgba(14,165,233,0.25)' : stageConfig[s]?.border || 'rgba(14,165,233,0.25)') : 'var(--border)'}`,
              color: filtroStage === s ? (s === 'Todos' ? '#0284C7' : stageConfig[s]?.color || '#0284C7') : '#64748B',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Main content: table + detail */}
      <div style={{ display: 'grid', gridTemplateColumns: seleccionada ? '1fr 340px' : '1fr', gap: '20px', alignItems: 'start' }}>

        {/* Table */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '18px', overflow: 'hidden' }}>
          <table className="pharb-table">
            <thead>
              <tr>
                <th>ID / Clase</th>
                <th>Target Biológico</th>
                <th>Etapa</th>
                <th>Score ADMET</th>
                <th>IC50</th>
                <th>Riesgo</th>
                <th>Investigador</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {moleculasFiltradas.map(mol => {
                const cfg = stageConfig[mol.stage];
                const isSelected = seleccionada?.id === mol.id;
                return (
                  <tr
                    key={mol.id}
                    onClick={() => setSeleccionada(isSelected ? null : mol)}
                    style={{ cursor: 'pointer', background: isSelected ? 'rgba(14,165,233,0.06)' : undefined }}
                  >
                    <td>
                      <div style={{ fontWeight: '700', color: '#0EA5E9', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px' }}>{mol.nombre}</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>{mol.clase}</div>
                    </td>
                    <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{mol.target}</td>
                    <td>
                      <span style={{ padding: '3px 10px', borderRadius: '8px', background: cfg.bg, color: cfg.color, fontSize: '11px', fontWeight: '600', border: `1px solid ${cfg.border}` }}>
                        {mol.stage}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ flex: 1, height: '5px', background: 'var(--border)', borderRadius: '999px', overflow: 'hidden', minWidth: '60px' }}>
                          <div style={{ height: '100%', width: `${mol.scoreADMET * 100}%`, background: mol.scoreADMET >= 0.8 ? '#10B981' : mol.scoreADMET >= 0.65 ? '#F59E0B' : '#EF4444', borderRadius: '999px' }} />
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-primary)' }}>{mol.scoreADMET.toFixed(2)}</span>
                      </div>
                    </td>
                    <td style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: 'var(--text-primary)' }}>{mol.ic50}</td>
                    <td>
                      <span style={{ fontSize: '12px', fontWeight: '600', color: mol.riesgo === 'Bajo' ? '#10B981' : mol.riesgo === 'Medio' ? '#F59E0B' : '#EF4444' }}>
                        ● {mol.riesgo}
                      </span>
                    </td>
                    <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{mol.investigador}</td>
                    <td><ChevronRight size={14} color={isSelected ? '#0EA5E9' : '#CBD5E1'} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {moleculasFiltradas.length === 0 && (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>
              <Atom size={32} style={{ marginBottom: '8px', opacity: 0.3 }} />
              <div>No se encontraron moléculas</div>
            </div>
          )}
        </div>

        {/* Detail panel */}
        {seleccionada && (
          <div style={{ background: 'var(--bg-card)', border: '1px solid rgba(14,165,233,0.25)', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(14,165,233,0.06)' }}>
            
            {/* Header del Panel */}
            <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '18px', fontWeight: '800', color: 'var(--text-accent)' }}>{seleccionada.nombre}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{seleccionada.clase}</div>
              </div>
              <span style={{ padding: '4px 12px', borderRadius: '10px', background: stageConfig[seleccionada.stage].bg, color: stageConfig[seleccionada.stage].color, fontSize: '12px', fontWeight: '700', border: `1px solid ${stageConfig[seleccionada.stage].border}` }}>
                {seleccionada.stage}
              </span>
            </div>

            <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* 1. Visualizador Químico SVG Predictivo */}
              <div style={{ background: '#F8FAFC', border: '1px solid var(--border)', borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '8px', left: '8px', fontSize: '9px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Estructura Predictiva 2D</div>
                
                {/* SVG Animado de la molécula */}
                <svg width="180" height="130" viewBox="0 0 100 100" style={{ transform: 'rotate(0deg)' }}>
                  <style>{`
                    @keyframes rotateMol {
                      0% { transform: rotate(0deg); }
                      50% { transform: rotate(8deg) scale(1.02); }
                      100% { transform: rotate(0deg); }
                    }
                    .mol-group { animation: rotateMol 8s ease-in-out infinite; transform-origin: 50px 50px; }
                  `}</style>
                  <g className="mol-group">
                    {/* Enlaces (Lines) */}
                    <line x1="50" y1="50" x2="30" y2="40" stroke="#94A3B8" strokeWidth="2" />
                    <line x1="50" y1="50" x2="70" y2="40" stroke="#94A3B8" strokeWidth="2" />
                    <line x1="30" y1="40" x2="30" y2="20" stroke="#94A3B8" strokeWidth="2" strokeDasharray="1 1" />
                    <line x1="70" y1="40" x2="85" y2="55" stroke="#94A3B8" strokeWidth="2" />
                    <line x1="50" y1="50" x2="50" y2="75" stroke="#94A3B8" strokeWidth="2.5" />
                    <line x1="50" y1="75" x2="35" y2="85" stroke="#94A3B8" strokeWidth="2" />
                    <line x1="50" y1="75" x2="65" y2="85" stroke="#94A3B8" strokeWidth="2" />

                    {/* Átomos (Circles + Text) */}
                    {/* Átomo Central C */}
                    <circle cx="50" cy="50" r="7" fill="#0EA5E9" />
                    <text x="50" y="53" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">C</text>

                    {/* Átomo de Nitrógeno N */}
                    <circle cx="30" cy="40" r="6" fill="#3B82F6" />
                    <text x="30" y="42" fill="white" fontSize="7" fontWeight="bold" textAnchor="middle">N</text>

                    {/* Átomo de Oxígeno O */}
                    <circle cx="70" cy="40" r="6" fill="#EF4444" />
                    <text x="70" y="42" fill="white" fontSize="7" fontWeight="bold" textAnchor="middle">O</text>

                    {/* Átomo de Azufre S */}
                    <circle cx="50" cy="75" r="6" fill="#F59E0B" />
                    <text x="50" y="77" fill="white" fontSize="7" fontWeight="bold" textAnchor="middle">S</text>

                    {/* Radicales R */}
                    <circle cx="30" cy="20" r="5" fill="#10B981" />
                    <text x="30" y="22" fill="white" fontSize="6" fontWeight="bold" textAnchor="middle">R1</text>

                    <circle cx="85" cy="55" r="5" fill="#7C3AED" />
                    <text x="85" y="57" fill="white" fontSize="6" fontWeight="bold" textAnchor="middle">R2</text>
                  </g>
                </svg>
                <div style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: '600', marginTop: '6px' }}>Enlace de Afinidad Predictivo: <span style={{ color: '#0ea5e9' }}>{seleccionada.ic50}</span></div>
              </div>

              {/* 2. Gráfico de Radar ADMET en SVG */}
              <div style={{ background: '#F8FAFC', border: '1px solid var(--border)', borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '100%', fontSize: '9px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>Perfil Farmacocinético in silico</div>
                
                {/* Generador de Radar SVG */}
                {(() => {
                  // Calcular puntos normalizados del radar en base a 5 ejes
                  // Ejes: 0. ADMET Score, 1. PM, 2. LogP, 3. TPSA, 4. Solubilidad
                  const center = 60;
                  const radius = 40;
                  const angles = [0, 72, 144, 216, 288];

                  // Puntos de la molécula actual
                  const vADMET = seleccionada.scoreADMET; // 0 a 1
                  const vMW = Math.min(seleccionada.MW / 900, 1); // Normalizado
                  const vLogP = Math.min(Math.max((seleccionada.logP + 1) / 6, 0.1), 1); // Rango normalizado
                  const vTPSA = Math.min(seleccionada.TPSA / 220, 1);
                  const vSol = seleccionada.solubilidad === 'Alta' ? 0.95 : seleccionada.solubilidad === 'Media' ? 0.65 : 0.3;

                  const values = [vADMET, vMW, vLogP, vTPSA, vSol];
                  
                  // Generar coordenadas del pentágono del valor
                  const points = values.map((val, idx) => {
                    const angleRad = (angles[idx] - 90) * (Math.PI / 180);
                    const r = val * radius;
                    const x = center + r * Math.cos(angleRad);
                    const y = center + r * Math.sin(angleRad);
                    return `${x},${y}`;
                  }).join(' ');

                  // Generar pentágono exterior (guía 100%)
                  const outerPoints = angles.map((ang) => {
                    const angleRad = (ang - 90) * (Math.PI / 180);
                    const x = center + radius * Math.cos(angleRad);
                    const y = center + radius * Math.sin(angleRad);
                    return `${x},${y}`;
                  }).join(' ');

                  // Generar pentágono medio (guía 50%)
                  const midPoints = angles.map((ang) => {
                    const angleRad = (ang - 90) * (Math.PI / 180);
                    const x = center + (radius * 0.5) * Math.cos(angleRad);
                    const y = center + (radius * 0.5) * Math.sin(angleRad);
                    return `${x},${y}`;
                  }).join(' ');

                  return (
                    <svg width="220" height="135" viewBox="0 0 120 120" style={{ display: 'block', margin: '0 auto' }}>
                      {/* Grid de Fondo */}
                      <polygon points={outerPoints} fill="none" stroke="#E2E8F0" strokeWidth="1" />
                      <polygon points={midPoints} fill="none" stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="2 2" />
                      
                      {/* Radios */}
                      {angles.map((ang, idx) => {
                        const angleRad = (ang - 90) * (Math.PI / 180);
                        const x = center + radius * Math.cos(angleRad);
                        const y = center + radius * Math.sin(angleRad);
                        return <line key={idx} x1={center} y1={center} x2={x} y2={y} stroke="#E2E8F0" strokeWidth="0.75" />;
                      })}

                      {/* Polígono del Valor de la Molécula */}
                      <polygon points={points} fill="rgba(124, 58, 237, 0.2)" stroke="#7C3AED" strokeWidth="1.5" />
                      
                      {/* Nodos */}
                      {values.map((val, idx) => {
                        const angleRad = (angles[idx] - 90) * (Math.PI / 180);
                        const r = val * radius;
                        const x = center + r * Math.cos(angleRad);
                        const y = center + r * Math.sin(angleRad);
                        return <circle key={idx} cx={x} cy={y} r="2.5" fill="#7C3AED" stroke="white" strokeWidth="0.5" />;
                      })}

                      {/* Etiquetas de texto */}
                      {/* ADMET */}
                      <text x="60" y="10" fontSize="5" fontWeight="bold" fill="#64748B" textAnchor="middle">ADMET</text>
                      {/* PM */}
                      <text x="110" y="55" fontSize="5" fontWeight="bold" fill="#64748B" textAnchor="start">PM</text>
                      {/* LogP */}
                      <text x="90" y="108" fontSize="5" fontWeight="bold" fill="#64748B" textAnchor="middle">LogP</text>
                      {/* TPSA */}
                      <text x="30" y="108" fontSize="5" fontWeight="bold" fill="#64748B" textAnchor="middle">TPSA</text>
                      {/* Solubilidad */}
                      <text x="10" y="55" fontSize="5" fontWeight="bold" fill="#64748B" textAnchor="end">Solubilidad</text>
                    </svg>
                  );
                })()}
              </div>

              {/* Score ADMET */}
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Score ADMET IA</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ flex: 1, height: '8px', background: 'var(--border)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${seleccionada.scoreADMET * 100}%`, background: seleccionada.scoreADMET >= 0.8 ? 'linear-gradient(90deg,#10B981,#14B8A6)' : seleccionada.scoreADMET >= 0.65 ? 'linear-gradient(90deg,#F59E0B,#FBBF24)' : 'linear-gradient(90deg,#EF4444,#F87171)', borderRadius: '999px', transition: 'width 0.6s' }} />
                  </div>
                  <span style={{ fontSize: '20px', fontWeight: '800', color: seleccionada.scoreADMET >= 0.8 ? '#10B981' : seleccionada.scoreADMET >= 0.65 ? '#F59E0B' : '#EF4444', fontFamily: 'Outfit, sans-serif' }}>{seleccionada.scoreADMET.toFixed(2)}</span>
                </div>
              </div>

              {/* Properties */}
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Propiedades Moleculares</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {[
                    { label: 'PM (Da)', val: `${seleccionada.MW}` },
                    { label: 'LogP', val: `${seleccionada.logP}` },
                    { label: 'HBD', val: `${seleccionada.HBD}` },
                    { label: 'HBA', val: `${seleccionada.HBA}` },
                    { label: 'TPSA (Å²)', val: `${seleccionada.TPSA}` },
                    { label: 'IC50', val: seleccionada.ic50 },
                  ].map(p => (
                    <div key={p.label} style={{ padding: '8px 10px', background: 'rgba(14,165,233,0.04)', border: '1px solid var(--border)', borderRadius: '8px' }}>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '600' }}>{p.label}</div>
                      <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'JetBrains Mono, monospace' }}>{p.val}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Profile */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { label: 'Target', val: seleccionada.target },
                  { label: 'Proyecto', val: seleccionada.proyecto },
                  { label: 'Investigador', val: seleccionada.investigador },
                  { label: 'Toxicidad', val: seleccionada.toxicidad },
                  { label: 'Solubilidad', val: seleccionada.solubilidad },
                  { label: 'Patente', val: seleccionada.patente },
                  { label: 'Actualizado', val: seleccionada.actualizado },
                ].map(r => (
                  <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>{r.label}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '500', maxWidth: '180px', textAlign: 'right' }}>{r.val}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => analizarMolIA(seleccionada)} disabled={analizandoId === seleccionada.id}>
                  {analizandoId === seleccionada.id ? <RefreshCw size={13} style={{ animation: 'spin 1s linear infinite' }}/> : <Zap size={13}/>}
                  {analizandoId === seleccionada.id ? ' Analizando…' : ' Análisis IA'}
                </button>
                <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => exportarMolecula(seleccionada)}>
                  <Download size={13}/> Exportar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
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
