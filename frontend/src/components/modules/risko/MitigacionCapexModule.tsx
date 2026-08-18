import React, { useState, useEffect } from 'react';
import { CheckSquare, ArrowRight, DollarSign, TrendingDown, Clock, ShieldCheck, Plus, Download, X, Check, Sliders } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

interface KanbanItem {
  id: string;
  titulo: string;
  inmueble: string;
  costo: number;
  deltaScore: number;
  prioridad: 'Crítica' | 'Alta' | 'Media' | 'Baja';
  columna: 'nueva' | 'en_progreso' | 'validacion' | 'cerrada';
}

const INITIAL_ITEMS: KanbanItem[] = [
  { id: '1', titulo: 'Instalación Rociadores ESFR Nave 3', inmueble: 'Parque Apodaca', costo: 185000, deltaScore: -18, prioridad: 'Crítica', columna: 'nueva' },
  { id: '2', titulo: 'Encamisado de Columnas C1-C4 Sótano', inmueble: 'Torre Reforma 222', costo: 120000, deltaScore: -14, prioridad: 'Crítica', columna: 'en_progreso' },
  { id: '3', titulo: 'Segregación Almacén Químicos', inmueble: 'CEDIS Tultitlán', costo: 45000, deltaScore: -8, prioridad: 'Alta', columna: 'en_progreso' },
  { id: '4', titulo: 'Sustitución Válvula de Alivio GLP', inmueble: 'Corporativo Santa Fe', costo: 12000, deltaScore: -3, prioridad: 'Media', columna: 'validacion' },
  { id: '5', titulo: 'Actualización Tableros y Termografía', inmueble: 'Centro Comercial Andares', costo: 35000, deltaScore: -6, prioridad: 'Baja', columna: 'cerrada' },
];

const COLUMNAS = [
  { id: 'nueva',       titulo: 'Nueva Propuesta',       color: '#64748B', bg: '#F8FAFC' },
  { id: 'en_progreso', titulo: 'En Ejecución / CAPEX',  color: '#3B82F6', bg: '#EFF6FF' },
  { id: 'validacion',  titulo: 'Validación en Campo',   color: '#F59E0B', bg: '#FFFBEB' },
  { id: 'cerrada',     titulo: 'Mitigación Cerrada',    color: '#10B981', bg: '#ECFDF5' },
];

export const MitigacionCapexModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [items, setItems] = useState<KanbanItem[]>(INITIAL_ITEMS);
  const [capexInput, setCapexInput] = useState<number>(300000);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [newCapexModalOpen, setNewCapexModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCost, setNewCost] = useState(50000);
  const [newPriority, setNewPriority] = useState<'Crítica' | 'Alta' | 'Media' | 'Baja'>('Alta');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleMoveCard = (id: string, currentCol: string) => {
    const colOrder: Array<'nueva' | 'en_progreso' | 'validacion' | 'cerrada'> = ['nueva', 'en_progreso', 'validacion', 'cerrada'];
    const curIdx = colOrder.indexOf(currentCol as any);
    const nextIdx = (curIdx + 1) % colOrder.length;
    const nextCol = colOrder[nextIdx];

    setItems(prev => prev.map(item => item.id === id ? { ...item, columna: nextCol } : item));
    const targetItem = items.find(i => i.id === id);
    const colTitle = COLUMNAS.find(c => c.id === nextCol)?.titulo;
    showToast(`🔄 "${targetItem?.titulo}" movido a: ${colTitle}`);
  };

  const handleCreateCapex = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: KanbanItem = {
      id: Date.now().toString(),
      titulo: newTitle.trim(),
      inmueble: 'Parque Apodaca',
      costo: newCost,
      deltaScore: -Math.round(newCost / 10000),
      prioridad: newPriority,
      columna: 'nueva',
    };

    setItems(prev => [newItem, ...prev]);
    setNewCapexModalOpen(false);
    setNewTitle('');
    showToast(`✅ Nueva recomendación "${newItem.titulo}" añadida al Kanban.`);
  };

  const handleApproveBudget = () => {
    showToast('💰 Presupuesto de Mitigación CAPEX $631K USD aprobado por el Comité de Riesgos.');
  };

  const totalCapex = items.reduce((s, i) => s + i.costo, 0);
  const totalScoreRed = items.reduce((s, i) => s + Math.abs(i.deltaScore), 0);
  const savingsAnnual = Math.round(capexInput * 0.28);
  const scoreDeltaCalc = -Math.round(capexInput / 7500);

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
              <CheckSquare size={24} color={colores.primario} />
            </span>
            Mitigación &amp; Workflows CAPEX (Kanban &amp; ROI)
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: colores.textoOscuro }}>
            Dashboard 14 · Asignación de capital, reducción de prima estimada y seguimiento SLA
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleApproveBudget}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: '#10B981',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ShieldCheck size={14} /> Aprobar Presupuesto
          </button>

          <button
            onClick={() => setNewCapexModalOpen(true)}
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
            <Plus size={14} /> Nueva Recomendación
          </button>
        </div>
      </div>

      {/* KPIS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {[
          { label: 'CAPEX Total Asignado', value: `$${(totalCapex / 1000).toFixed(0)}K USD`, color: colores.primario, bg: '#EFF6FF', sub: `${items.length} proyectos en cartera` },
          { label: 'Reducción de Score Est.', value: `-${totalScoreRed} Pts`, color: '#10B981', bg: '#ECFDF5', sub: 'Mejora en clase de riesgo' },
          { label: 'Ahorro Anual en Prima Est.', value: `$${((totalCapex * 0.28) / 1000).toFixed(0)}K USD`, color: '#F59E0B', bg: '#FFFBEB', sub: 'ROI promedio: 3.5 años' },
          { label: 'Items Abiertos', value: `${items.filter(i => i.columna !== 'cerrada').length} Activos`, color: '#F97316', bg: '#FFF7ED', sub: 'En seguimiento de SLA' },
        ].map((k, i) => (
          <div key={i} style={{
            padding: '18px 20px',
            backgroundColor: '#FFFFFF',
            borderRadius: '14px',
            border: `1px solid ${colores.borde}`,
            borderTop: `3px solid ${k.color}`,
            boxShadow: '0 2px 6px rgba(15,23,42,0.04)',
            animation: `fadeSlideUp 0.4s ease ${i * 0.08}s both`,
          }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: colores.textoOscuro, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{k.label}</span>
            <div style={{ fontSize: '24px', fontWeight: '800', color: colores.textoClaro, margin: '6px 0 2px' }}>{k.value}</div>
            <span style={{ fontSize: '11px', color: colores.textoOscuro }}>{k.sub}</span>
          </div>
        ))}
      </div>

      {/* MAIN: KANBAN + CALCULADORA ROI */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '20px', alignItems: 'start' }}>

        {/* KANBAN BOARD */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
          {COLUMNAS.map((col, colIdx) => {
            const colItems = items.filter(it => it.columna === col.id);
            return (
              <div
                key={col.id}
                style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: '14px',
                  border: `1px solid ${colores.borde}`,
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  minHeight: '400px',
                  animation: `fadeSlideUp 0.3s ease ${0.2 + colIdx * 0.06}s both`,
                }}
              >
                {/* Header columna */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `2px solid ${col.color}`, paddingBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: colores.textoClaro }}>{col.titulo}</span>
                  <span style={{ fontSize: '11px', fontWeight: '800', color: col.color, backgroundColor: '#FFFFFF', padding: '1px 6px', borderRadius: '8px', border: `1px solid ${colores.borde}` }}>
                    {colItems.length}
                  </span>
                </div>

                {/* Tarjetas */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {colItems.map((item, itemIdx) => (
                    <div
                      key={item.id}
                      onClick={() => handleMoveCard(item.id, item.columna)}
                      title="Click para avanzar de columna en el flujo"
                      style={{
                        padding: '12px',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '10px',
                        border: `1px solid ${colores.borde}`,
                        boxShadow: '0 1px 3px rgba(15,23,42,0.04)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        animation: `fadeSlideUp 0.3s ease ${0.3 + itemIdx * 0.05}s both`,
                      }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 12px rgba(15,23,42,0.08)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(15,23,42,0.04)'; }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '10px', fontWeight: '700', padding: '2px 6px', borderRadius: '4px', backgroundColor: item.prioridad === 'Crítica' ? '#FEF2F2' : '#EFF6FF', color: item.prioridad === 'Crítica' ? '#EF4444' : colores.primario }}>
                          {item.prioridad}
                        </span>
                        <span style={{ fontSize: '10px', fontWeight: '800', color: '#10B981' }}>
                          {item.deltaScore} pts
                        </span>
                      </div>
                      <h4 style={{ margin: '0 0 4px', fontSize: '12px', fontWeight: '700', color: colores.textoClaro, lineHeight: 1.3 }}>
                        {item.titulo}
                      </h4>
                      <div style={{ fontSize: '10px', color: colores.textoOscuro, marginBottom: '8px' }}>
                        📍 {item.inmueble}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${colores.borde}`, paddingTop: '6px' }}>
                        <span style={{ fontSize: '11px', fontWeight: '800', color: colores.textoClaro }}>${(item.costo / 1000).toFixed(0)}K USD</span>
                        <span style={{ fontSize: '10px', color: colores.primario, fontWeight: '700', display: 'flex', alignItems: 'center', gap: '2px' }}>
                          Avanzar &rarr;
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CALCULADORA ROI */}
        <div style={{
          padding: '24px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: `1px solid ${colores.borde}`,
          boxShadow: '0 2px 8px rgba(15,23,42,0.04)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          animation: 'fadeSlideUp 0.4s ease 0.4s both',
        }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: colores.textoClaro }}>
            Calculadora de ROI &amp; Ahorro en Prima
          </h3>
          <p style={{ margin: 0, fontSize: '11px', color: colores.textoOscuro }}>
            Simula el retorno sobre inversión al reducir la tasa actuarial de riesgo
          </p>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: colores.textoClaro, marginBottom: '4px' }}>
              CAPEX Propuesto: <strong>${capexInput.toLocaleString()} USD</strong>
            </label>
            <input
              type="range"
              min="20000"
              max="1000000"
              step="10000"
              value={capexInput}
              onChange={e => setCapexInput(Number(e.target.value))}
              style={{ width: '100%', accentColor: colores.primario }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: colores.textoOscuro, marginTop: '2px' }}>
              <span>$20K</span>
              <span>$1.0M USD</span>
            </div>
          </div>

          <div style={{ padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: `1px solid ${colores.borde}`, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span style={{ color: colores.textoOscuro }}>Reducción de Score:</span>
              <strong style={{ color: '#10B981' }}>{scoreDeltaCalc} Puntos</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span style={{ color: colores.textoOscuro }}>Ahorro Anual en Prima:</span>
              <strong style={{ color: colores.primario }}>${savingsAnnual.toLocaleString()} USD</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span style={{ color: colores.textoOscuro }}>Período de Retorno:</span>
              <strong>3.5 Años</strong>
            </div>
          </div>

          <button
            onClick={() => showToast(`📊 Propuesta de inversión ($${capexInput.toLocaleString()} USD) enviada a aprobación de Dirección Financiera.`)}
            style={{
              width: '100%',
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
            Someter a Comité de Inversión
          </button>
        </div>

      </div>

      {/* MODAL NUEVA RECOMENDACIÓN CAPEX */}
      {newCapexModalOpen && (
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
                Nueva Recomendación de Mitigación CAPEX
              </h3>
              <button
                onClick={() => setNewCapexModalOpen(false)}
                style={{ background: 'none', border: 'none', color: colores.textoOscuro, cursor: 'pointer', padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateCapex} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: colores.textoOscuro, marginBottom: '4px' }}>
                  Nombre de la Acción / Obra
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Instalación de Válvula Sísmica de Gas"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
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
                  Presupuesto Estimado (USD)
                </label>
                <input
                  type="number"
                  required
                  value={newCost}
                  onChange={e => setNewCost(Number(e.target.value))}
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
                  Nivel de Prioridad
                </label>
                <select
                  value={newPriority}
                  onChange={e => setNewPriority(e.target.value as any)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: `1px solid ${colores.borde}`,
                    fontSize: '13px',
                    outline: 'none',
                    backgroundColor: '#FFFFFF',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="Crítica">Crítica (Intervención Inmediata)</option>
                  <option value="Alta">Alta (&lt; 90 días)</option>
                  <option value="Media">Media (Próximo Ejercicio)</option>
                  <option value="Baja">Baja (Mantenimiento Rutinario)</option>
                </select>
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
                Agregar al Flujo Kanban
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
