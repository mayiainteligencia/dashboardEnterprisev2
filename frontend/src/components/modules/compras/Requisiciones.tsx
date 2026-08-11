import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  FileText, Plus, Sparkles, AlertTriangle, 
  Layout, List, ChevronRight, Activity, X,
  Clock, CheckCircle, ArrowRight
} from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

const { colores } = brandingConfig;

const tema = {
  acento: '#DC2626',
  acentoOscuro: '#991B1B',
  acentoSuave: '#FEE2E2',
  sobreAcento: '#FFFFFF',
};

const mockKpis = [
  { id: 1, label: 'TOTAL REQUISICIONES', value: '1,248', trend: '+12%', isPositive: true },
  { id: 2, label: 'TIEMPO PROMEDIO', value: '4.2 hrs', trend: '-18%', isPositive: true },
  { id: 3, label: 'EN VALIDACIÓN IA', value: '15', trend: '+3', isPositive: false },
  { id: 4, label: 'AHORRO IDENTIFICADO', value: '$45,200', trend: '+8%', isPositive: true },
];

const mockChartData = [
  { name: 'Lun', reqs: 45, validadas: 38 },
  { name: 'Mar', reqs: 52, validadas: 48 },
  { name: 'Mié', reqs: 38, validadas: 35 },
  { name: 'Jue', reqs: 65, validadas: 60 },
  { name: 'Vie', reqs: 48, validadas: 45 },
  { name: 'Sáb', reqs: 15, validadas: 15 },
  { name: 'Dom', reqs: 10, validadas: 9 },
];

type EstadoReq = 'Pendiente' | 'En Validación IA' | 'Aprobación Jefatura' | 'Emitida';

interface Requisicion {
  id: string;
  solicitante: string;
  departamento: string;
  monto: string;
  estado: EstadoReq;
  fecha: string;
  items: number;
}

const initialReqs: Requisicion[] = [
  { id: 'REQ-001', solicitante: 'Ana Pérez', departamento: 'Sistemas', monto: '$12,500 MXN', estado: 'Pendiente', fecha: '06 Ago 2026', items: 3 },
  { id: 'REQ-002', solicitante: 'Juan López', departamento: 'Mantenimiento', monto: '$4,200 MXN', estado: 'En Validación IA', fecha: '06 Ago 2026', items: 12 },
  { id: 'REQ-003', solicitante: 'María García', departamento: 'Marketing', monto: '$8,900 MXN', estado: 'Aprobación Jefatura', fecha: '05 Ago 2026', items: 1 },
  { id: 'REQ-004', solicitante: 'Carlos Ruiz', departamento: 'Operaciones', monto: '$35,000 MXN', estado: 'Emitida', fecha: '04 Ago 2026', items: 5 },
  { id: 'REQ-005', solicitante: 'Sofía Torres', departamento: 'Sistemas', monto: '$1,200 MXN', estado: 'Pendiente', fecha: '06 Ago 2026', items: 2 },
  { id: 'REQ-006', solicitante: 'Luis Díaz', departamento: 'Recursos Humanos', monto: '$2,800 MXN', estado: 'En Validación IA', fecha: '05 Ago 2026', items: 8 },
];

const useAnimations = () => {
  useEffect(() => {
    const id = 'req-animations';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes pulseAura { 0%, 100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.4); } 50% { box-shadow: 0 0 0 10px rgba(220, 38, 38, 0); } }
    `;
    document.head.appendChild(style);
  }, []);
};

export const Requisiciones: React.FC = () => {
  useAnimations();
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [reqs, setReqs] = useState<Requisicion[]>(initialReqs);
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(true);

  const moveReq = (id: string, newEstado: EstadoReq) => {
    setReqs(prev => prev.map(r => r.id === id ? { ...r, estado: newEstado } : r));
  };

  const columnas: { id: EstadoReq; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'Pendiente', label: 'Pendiente', icon: <Clock size={16} />, color: colores.textoMedio },
    { id: 'En Validación IA', label: 'Validación IA', icon: <Sparkles size={16} />, color: tema.acento },
    { id: 'Aprobación Jefatura', label: 'Aprobación', icon: <Activity size={16} />, color: colores.advertencia },
    { id: 'Emitida', label: 'Emitida', icon: <CheckCircle size={16} />, color: colores.exito },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeSlideUp 0.5s ease-out' }}>
      
      {/* Header */}
      <div style={{ background: colores.fondoPrincipal, borderRadius: '20px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: `1px solid ${colores.borde}`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: `linear-gradient(to bottom, ${tema.acento}, ${tema.acentoOscuro})` }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: `linear-gradient(135deg, ${tema.acentoSuave}, ${colores.fondoPrincipal})`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${colores.borde}` }}>
            <FileText size={32} color={tema.acento} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <h1 style={{ margin: 0, fontSize: '24px', color: colores.textoClaro, fontWeight: 700 }}>Requisiciones</h1>
              <span style={{ padding: '4px 10px', background: tema.acentoSuave, color: tema.acentoOscuro, borderRadius: '12px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: tema.acento, animation: 'pulseAura 2s infinite' }} />
                LIVE
              </span>
            </div>
            <p style={{ margin: '4px 0 0', color: colores.textoMedio, fontSize: '14px' }}>Gestión inteligente de requisiciones de compra con análisis IA.</p>
          </div>
        </div>
        <button onClick={() => setShowAIModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: tema.acento, color: tema.sobreAcento, border: 'none', padding: '12px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>
          <Sparkles size={18} />
          Crear con IA
        </button>
      </div>

      {/* Duplicate Warning */}
      {showDuplicateWarning && (
        <div style={{ background: '#FFFBEB', border: `1px solid #FDE68A`, borderRadius: '16px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', animation: 'fadeSlideUp 0.6s ease-out' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <AlertTriangle size={24} color={colores.advertencia} />
            <div>
              <h4 style={{ margin: 0, color: '#92400E', fontSize: '14px', fontWeight: 600 }}>Alerta de Duplicidad Detectada (IA)</h4>
              <p style={{ margin: '2px 0 0', color: '#B45309', fontSize: '13px' }}>REQ-001 y REQ-005 solicitan artículos similares (Laptops) para el mismo departamento.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => setShowDuplicateWarning(false)} style={{ background: 'transparent', border: `1px solid #D97706`, color: '#D97706', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Ignorar</button>
            <button onClick={() => setShowDuplicateWarning(false)} style={{ background: '#D97706', border: 'none', color: '#FFFFFF', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Fusionar Requisición</button>
          </div>
        </div>
      )}

      {/* KPIs & Chart Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {mockKpis.map((kpi, idx) => (
            <div key={kpi.id} style={{ background: colores.fondoPrincipal, borderRadius: '16px', padding: '20px', border: `1px solid ${colores.borde}`, animation: `fadeSlideUp ${0.5 + idx * 0.1}s ease-out`, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: tema.acento }} />
              <p style={{ margin: 0, fontSize: '12px', color: colores.textoOscuro, fontWeight: 600, letterSpacing: '0.5px' }}>{kpi.label}</p>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', marginTop: '8px' }}>
                <span style={{ fontSize: '28px', fontWeight: 700, color: colores.textoClaro }}>{kpi.value}</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: kpi.isPositive ? colores.exito : colores.peligro, paddingBottom: '4px' }}>{kpi.trend}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ background: colores.fondoPrincipal, borderRadius: '20px', padding: '20px', border: `1px solid ${colores.borde}`, animation: 'fadeSlideUp 0.8s ease-out' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', color: colores.textoClaro }}>Volumen de Requisiciones</h3>
          </div>
          <div style={{ height: '180px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorReqs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={tema.acento} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={tema.acento} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colores.borde} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: colores.textoMedio }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: colores.textoMedio }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: `1px solid ${colores.borde}`, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="reqs" stroke={tema.acento} strokeWidth={3} fillOpacity={1} fill="url(#colorReqs)" />
                <Area type="monotone" dataKey="validadas" stroke={colores.exito} strokeWidth={2} strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ background: colores.fondoPrincipal, borderRadius: '20px', padding: '24px', border: `1px solid ${colores.borde}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: 0, fontSize: '18px', color: colores.textoClaro }}>Flujo de Trabajo</h2>
          <div style={{ display: 'flex', background: colores.fondoTerciario, borderRadius: '12px', padding: '4px' }}>
            <button onClick={() => setViewMode('kanban')} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', border: 'none', background: viewMode === 'kanban' ? '#FFFFFF' : 'transparent', color: viewMode === 'kanban' ? tema.acento : colores.textoMedio, borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '14px', transition: 'all 0.2s', boxShadow: viewMode === 'kanban' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none' }}>
              <Layout size={16} /> Kanban
            </button>
            <button onClick={() => setViewMode('table')} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', border: 'none', background: viewMode === 'table' ? '#FFFFFF' : 'transparent', color: viewMode === 'table' ? tema.acento : colores.textoMedio, borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '14px', transition: 'all 0.2s', boxShadow: viewMode === 'table' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none' }}>
              <List size={16} /> Lista
            </button>
          </div>
        </div>

        {viewMode === 'kanban' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', alignItems: 'start' }}>
            {columnas.map(col => (
              <div key={col.id} style={{ background: colores.fondoSecundario, borderRadius: '16px', padding: '16px', minHeight: '400px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: col.color, fontWeight: 600, fontSize: '14px' }}>
                    {col.icon}
                    {col.label}
                  </div>
                  <span style={{ background: '#FFFFFF', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 700, color: colores.textoMedio }}>
                    {reqs.filter(r => r.estado === col.id).length}
                  </span>
                </div>
                
                {reqs.filter(r => r.estado === col.id).map((req, idx) => (
                  <div key={req.id} style={{ background: '#FFFFFF', borderRadius: '12px', padding: '16px', border: `1px solid ${colores.borde}`, boxShadow: '0 2px 4px rgba(0,0,0,0.02)', cursor: 'grab', animation: `fadeSlideUp ${0.2 + idx * 0.1}s ease-out` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: colores.textoOscuro }}>{req.id}</span>
                      <span style={{ fontSize: '12px', color: colores.textoMedio }}>{req.fecha}</span>
                    </div>
                    <p style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: 600, color: colores.textoClaro }}>{req.monto}</p>
                    <p style={{ margin: '0 0 12px', fontSize: '13px', color: colores.textoMedio }}>{req.solicitante} • {req.departamento}</p>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${colores.fondoTerciario}`, paddingTop: '12px' }}>
                      <span style={{ fontSize: '12px', color: colores.textoMedio, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <List size={14} /> {req.items} items
                      </span>
                      {col.id !== 'Emitida' && (
                        <button 
                          onClick={() => {
                            const nextState = col.id === 'Pendiente' ? 'En Validación IA' : col.id === 'En Validación IA' ? 'Aprobación Jefatura' : 'Emitida';
                            moveReq(req.id, nextState as EstadoReq);
                          }}
                          style={{ background: colores.fondoSecundario, border: 'none', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', color: colores.textoMedio }}
                        >
                          <ArrowRight size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${colores.borde}` }}>
                  <th style={{ padding: '16px', fontSize: '12px', color: colores.textoOscuro }}>ID</th>
                  <th style={{ padding: '16px', fontSize: '12px', color: colores.textoOscuro }}>SOLICITANTE</th>
                  <th style={{ padding: '16px', fontSize: '12px', color: colores.textoOscuro }}>DEPTO</th>
                  <th style={{ padding: '16px', fontSize: '12px', color: colores.textoOscuro }}>MONTO</th>
                  <th style={{ padding: '16px', fontSize: '12px', color: colores.textoOscuro }}>ESTADO</th>
                  <th style={{ padding: '16px', fontSize: '12px', color: colores.textoOscuro }}>FECHA</th>
                </tr>
              </thead>
              <tbody>
                {reqs.map((req) => (
                  <tr key={req.id} style={{ borderBottom: `1px solid ${colores.fondoTerciario}`, transition: 'background 0.2s', cursor: 'pointer' }}>
                    <td style={{ padding: '16px', fontSize: '14px', fontWeight: 600, color: colores.textoClaro }}>{req.id}</td>
                    <td style={{ padding: '16px', fontSize: '14px', color: colores.textoMedio }}>{req.solicitante}</td>
                    <td style={{ padding: '16px', fontSize: '14px', color: colores.textoMedio }}>{req.departamento}</td>
                    <td style={{ padding: '16px', fontSize: '14px', fontWeight: 600, color: colores.textoClaro }}>{req.monto}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ 
                        padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 600,
                        background: req.estado === 'Emitida' ? '#D1FAE5' : req.estado === 'Aprobación Jefatura' ? '#FEF3C7' : req.estado === 'En Validación IA' ? tema.acentoSuave : colores.fondoTerciario,
                        color: req.estado === 'Emitida' ? '#047857' : req.estado === 'Aprobación Jefatura' ? '#B45309' : req.estado === 'En Validación IA' ? tema.acentoOscuro : colores.textoMedio
                      }}>
                        {req.estado}
                      </span>
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', color: colores.textoMedio }}>{req.fecha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* AI Modal */}
      {showAIModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, animation: 'fadeSlideUp 0.3s ease-out' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '24px', width: '90%', maxWidth: '600px', padding: '32px', position: 'relative', boxShadow: '0 24px 48px rgba(0,0,0,0.2)' }}>
            <button onClick={() => setShowAIModal(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'transparent', border: 'none', cursor: 'pointer', color: colores.textoOscuro }}><X size={24} /></button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: tema.acentoSuave, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={24} color={tema.acento} />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: '20px', color: colores.textoClaro }}>Asistente Creador con IA</h2>
                <p style={{ margin: '4px 0 0', color: colores.textoMedio, fontSize: '14px' }}>Describe lo que necesitas y MAYIA armará la requisición.</p>
              </div>
            </div>
            
            <textarea 
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Ej. Necesito 5 laptops Dell XPS 15 para el nuevo equipo de diseño de marketing, presupuesto maximo 150k..."
              style={{ width: '100%', height: '120px', padding: '16px', borderRadius: '12px', border: `1px solid ${colores.borde}`, background: colores.fondoSecundario, fontSize: '15px', color: colores.textoClaro, resize: 'none', boxSizing: 'border-box', marginBottom: '24px', fontFamily: 'inherit' }}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button onClick={() => setShowAIModal(false)} style={{ padding: '12px 24px', borderRadius: '12px', border: `1px solid ${colores.borde}`, background: '#FFFFFF', color: colores.textoMedio, fontWeight: 600, cursor: 'pointer' }}>Cancelar</button>
              <button 
                onClick={() => {
                  alert('MAYIA procesando... (Demo)');
                  setShowAIModal(false);
                }}
                style={{ padding: '12px 24px', borderRadius: '12px', border: 'none', background: tema.acento, color: '#FFFFFF', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Sparkles size={18} />
                Generar Requisición
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
