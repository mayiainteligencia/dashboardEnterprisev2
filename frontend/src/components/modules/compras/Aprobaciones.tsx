import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle, XCircle, FileText, Settings, ShieldCheck, HelpCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { brandingConfig } from '../../../config/branding';

const { colores } = brandingConfig;

const tema = {
  acento: '#DC2626',
  acentoOscuro: '#991B1B',
  acentoSuave: '#FEE2E2',
  sobreAcento: '#FFFFFF',
};

const useAnimations = () => {
  useEffect(() => {
    const id = 'module-animations-aprobaciones';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes swipeRight { to { transform: translateX(200px) rotate(15deg); opacity: 0; } }
      @keyframes swipeLeft { to { transform: translateX(-200px) rotate(-15deg); opacity: 0; } }
    `;
    document.head.appendChild(style);
  }, []);
};

const initialRequests = [
  { id: 'REQ-4902', dept: 'TI', item: 'Licencias Oracle Enterprise DB', amount: 850000, risk: 'Alto', aiNote: 'Excede el promedio trimestral histórico por 15%. Requiere autorización del Director de TI.' },
  { id: 'REQ-4903', dept: 'Mantenimiento', item: 'Filtros HEPA Industriales', amount: 12000, risk: 'Bajo', aiNote: 'Proveedor habitual. Precio dentro de rango histórico.' },
  { id: 'REQ-4904', dept: 'Operaciones', item: 'Uniformes Personal Nuevo', amount: 45000, risk: 'Medio', aiNote: 'Falta cotización comparativa adjunta.' },
];

const chartData = [
  { name: 'Lun', aprobadas: 24, rechazadas: 2 },
  { name: 'Mar', aprobadas: 18, rechazadas: 5 },
  { name: 'Mie', aprobadas: 30, rechazadas: 1 },
  { name: 'Jue', aprobadas: 15, rechazadas: 8 },
  { name: 'Vie', aprobadas: 22, rechazadas: 3 },
];

export const Aprobaciones: React.FC = () => {
  useAnimations();
  const [requests, setRequests] = useState(initialRequests);
  const [swipeState, setSwipeState] = useState<{ id: string, dir: 'left'|'right' } | null>(null);
  const [autoThreshold, setAutoThreshold] = useState(25000);
  const [autoApproveEnabled, setAutoApproveEnabled] = useState(true);

  const handleDecision = (id: string, decision: 'approve' | 'reject' | 'ask') => {
    setSwipeState({ id, dir: decision === 'approve' ? 'right' : 'left' });
    setTimeout(() => {
      setRequests(prev => prev.filter(r => r.id !== id));
      setSwipeState(null);
    }, 400);
  };

  const getRiskColor = (risk: string) => {
    switch(risk) {
      case 'Bajo': return colores.exito;
      case 'Medio': return colores.advertencia;
      case 'Alto': return colores.peligro;
      default: return colores.textoMedio;
    }
  };

  return (
    <div style={{ maxWidth: 1200, display: 'flex', flexDirection: 'column', gap: 20, animation: 'fadeSlideUp 0.5s ease-out' }}>
      {/* HEADER */}
      <div style={{ 
        background: colores.fondoPrincipal, 
        border: `1px solid ${colores.borde}`, 
        borderRadius: 22, 
        padding: 24, 
        boxShadow: colores.sombra,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: `linear-gradient(to bottom, ${tema.acento}, ${tema.acentoOscuro})` }} />
        <div style={{ 
          width: 64, height: 64, 
          borderRadius: 16, 
          background: `linear-gradient(135deg, ${tema.acentoSuave}, ${colores.fondoPrincipal})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: `1px solid ${tema.acentoSuave}`
        }}>
          <ShieldCheck size={32} color={tema.acento} />
        </div>
        <div>
          <h1 style={{ margin: '0 0 4px 0', fontSize: 24, fontWeight: 700, color: colores.textoClaro }}>Flujo de Aprobaciones</h1>
          <p style={{ margin: 0, color: colores.textoMedio, fontSize: 14 }}>
            Revisión acelerada con análisis de riesgo y motor de auto-aprobación IA.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 20 }}>
        {/* SWIPE CARDS */}
        <div style={{ background: colores.fondoPrincipal, borderRadius: 22, border: `1px solid ${colores.borde}`, padding: 24, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: 16, fontWeight: 600, color: colores.textoClaro }}>Fila de Revisión Pendiente</h3>
          
          <div style={{ flex: 1, position: 'relative', minHeight: 300 }}>
            {requests.length > 0 ? requests.map((req, index) => {
              const isTop = index === 0;
              const isSwiping = swipeState?.id === req.id;
              
              return (
                <div 
                  key={req.id}
                  style={{
                    position: 'absolute',
                    top: index * 10,
                    left: 0,
                    right: 0,
                    background: colores.fondoPrincipal,
                    border: `1px solid ${colores.borde}`,
                    borderRadius: 16,
                    padding: 24,
                    boxShadow: isTop ? colores.sombraMedia : 'none',
                    zIndex: 10 - index,
                    transform: isTop ? 'scale(1)' : `scale(${1 - index * 0.05})`,
                    opacity: isSwiping ? 0.8 : 1,
                    transition: isSwiping ? 'none' : 'all 0.3s ease',
                    animation: isSwiping 
                      ? (swipeState.dir === 'right' ? 'swipeRight 0.4s forwards' : 'swipeLeft 0.4s forwards') 
                      : 'none',
                    pointerEvents: isTop ? 'auto' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: colores.textoOscuro }}>{req.id} • {req.dept}</div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: colores.textoClaro, marginTop: 4 }}>{req.item}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 24, fontWeight: 700, color: tema.acentoOscuro }}>
                        ${req.amount.toLocaleString()} MXN
                      </div>
                      <div style={{ 
                        display: 'inline-flex', padding: '4px 10px', borderRadius: 12, 
                        fontSize: 12, fontWeight: 600, marginTop: 8,
                        background: getRiskColor(req.risk) + '20', color: getRiskColor(req.risk)
                      }}>
                        Riesgo: {req.risk}
                      </div>
                    </div>
                  </div>

                  <div style={{ background: '#F8FAFC', padding: 16, borderRadius: 12, marginBottom: 24, border: '1px solid #E2E8F0', display: 'flex', gap: 12 }}>
                    <Sparkles size={20} color="#3B82F6" style={{ flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#1E293B', marginBottom: 4 }}>Análisis IA:</div>
                      <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>{req.aiNote}</div>
                    </div>
                  </div>

                  {isTop && (
                    <div style={{ display: 'flex', gap: 12 }}>
                      <button 
                        onClick={() => handleDecision(req.id, 'reject')}
                        style={{ flex: 1, padding: '12px', borderRadius: 12, border: `1px solid ${colores.peligro}`, background: 'transparent', color: colores.peligro, fontWeight: 600, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}
                      >
                        <XCircle size={18} /> Rechazar
                      </button>
                      <button 
                        onClick={() => handleDecision(req.id, 'ask')}
                        style={{ flex: 1, padding: '12px', borderRadius: 12, border: `1px solid ${colores.advertencia}`, background: 'transparent', color: colores.advertencia, fontWeight: 600, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}
                      >
                        <HelpCircle size={18} /> Justificar
                      </button>
                      <button 
                        onClick={() => handleDecision(req.id, 'approve')}
                        style={{ flex: 1, padding: '12px', borderRadius: 12, border: 'none', background: colores.exito, color: '#FFF', fontWeight: 600, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}
                      >
                        <CheckCircle size={18} /> Aprobar
                      </button>
                    </div>
                  )}
                </div>
              );
            }) : (
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: colores.textoMedio }}>
                <CheckCircle size={48} color={colores.exito} style={{ marginBottom: 16, opacity: 0.5 }} />
                <h4 style={{ margin: '0 0 8px 0', fontSize: 18, color: colores.textoClaro }}>¡Todo al día!</h4>
                <p style={{ margin: 0, fontSize: 14 }}>No hay más solicitudes pendientes de revisión.</p>
              </div>
            )}
          </div>
        </div>

        {/* RULES ENGINE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ background: colores.fondoPrincipal, borderRadius: 22, border: `1px solid ${colores.borde}`, padding: 24 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20 }}>
              <div style={{ background: tema.acentoSuave, padding: 8, borderRadius: 8 }}>
                <Settings size={20} color={tema.acento} />
              </div>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: colores.textoClaro }}>Motor de Reglas IA</h3>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: colores.textoClaro }}>Auto-Aprobación</div>
                <div style={{ fontSize: 12, color: colores.textoMedio }}>Aprobar compras de bajo riesgo automáticamente.</div>
              </div>
              <button 
                onClick={() => setAutoApproveEnabled(!autoApproveEnabled)}
                style={{ 
                  width: 44, height: 24, borderRadius: 12, border: 'none',
                  background: autoApproveEnabled ? colores.exito : colores.borde,
                  position: 'relative', cursor: 'pointer', transition: 'background 0.3s'
                }}
              >
                <div style={{ 
                  width: 20, height: 20, borderRadius: '50%', background: '#FFF', 
                  position: 'absolute', top: 2, left: autoApproveEnabled ? 22 : 2,
                  transition: 'left 0.3s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                }} />
              </button>
            </div>

            <div style={{ opacity: autoApproveEnabled ? 1 : 0.5, pointerEvents: autoApproveEnabled ? 'auto' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: 13, color: colores.textoMedio }}>Umbral Máximo</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: tema.acento }}>${autoThreshold.toLocaleString()} MXN</span>
              </div>
              <input 
                type="range" min="5000" max="100000" step="5000" 
                value={autoThreshold} onChange={(e) => setAutoThreshold(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: tema.acento, cursor: 'pointer' }} 
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12, color: colores.textoOscuro }}>
                <span>$5k</span>
                <span>$100k</span>
              </div>
            </div>
          </div>

          <div style={{ background: colores.fondoPrincipal, borderRadius: 22, border: `1px solid ${colores.borde}`, padding: 24, flex: 1 }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: 16, fontWeight: 600, color: colores.textoClaro }}>Actividad Semanal</h3>
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colores.borde} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: colores.textoMedio, fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: colores.textoMedio, fontSize: 12}} />
                  <Tooltip 
                    cursor={{fill: colores.fondoSecundario}}
                    contentStyle={{ borderRadius: 12, border: `1px solid ${colores.borde}` }}
                  />
                  <Bar dataKey="aprobadas" name="Aprobadas" fill={colores.exito} radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="rechazadas" name="Rechazadas" fill={colores.peligro} radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
