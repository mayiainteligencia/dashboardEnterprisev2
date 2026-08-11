import React, { useState, useEffect } from 'react';
import { FileText, ShieldAlert, CheckCircle, Clock, Sparkles, FolderCheck, Calendar as CalendarIcon, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { brandingConfig } from '../../../config/branding';

const { colores } = brandingConfig;

const tema = {
  acento: '#1E40AF',
  acentoOscuro: '#0F172A',
  acentoSuave: '#DBEAFE',
  sobreAcento: '#FFFFFF',
};

const docsStatus = [
  { tipo: 'Pólizas Seguro', vigentes: 350, porVencer: 30, vencidas: 7 },
  { tipo: 'Tarjetas Circulación', vigentes: 380, porVencer: 5, vencidas: 2 },
  { tipo: 'Verificación Físico-Mec.', vigentes: 310, porVencer: 65, vencidas: 12 },
];

const documentos = [
  { id: 'DOC-9182', vehiculo: 'Tractocamión VHL-105', tipo: 'Póliza Seguro Gral.', status: 'Vencido', vencimiento: 'Hace 2 días', accion: 'Bloquear unidad' },
  { id: 'DOC-8273', vehiculo: 'Camioneta VHL-332', tipo: 'Tarjeta de Circulación', status: 'Por Vencer', vencimiento: 'En 5 días', accion: 'Trámite auto-iniciado' },
  { id: 'DOC-1122', vehiculo: 'Remolque R-054', tipo: 'Verificación Físico-Mec.', status: 'Por Vencer', vencimiento: 'En 12 días', accion: 'Cita programada' },
  { id: 'DOC-9921', vehiculo: 'Tractocamión VHL-201', tipo: 'Póliza Seguro Gral.', status: 'Vigente', vencimiento: '18 Dic, 2024', accion: '--' },
];

const useAnimations = () => {
  useEffect(() => {
    const id = 'module-animations-polizas';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
      .animate-fade-up { animation: fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      .hover-lift { transition: transform 0.2s ease, box-shadow 0.2s ease; }
      .hover-lift:hover { transform: translateY(-3px); box-shadow: 0 6px 20px rgba(0,0,0,0.08); }
    `;
    document.head.appendChild(style);
  }, []);
};

export const FleetPolizas: React.FC = () => {
  useAnimations();
  const [activeTab, setActiveTab] = useState('dashboard');

  const kpis = [
    { label: 'PÓLIZAS ACTIVAS', value: '387', icon: ShieldAlert, trend: '100% flota', trendUp: true },
    { label: 'DOCS POR VENCER (30D)', value: '23', icon: Clock, trend: '-5 resueltos', trendUp: true },
    { label: 'RENOVACIÓN AUTO IA', value: '67%', icon: Sparkles, trend: 'En aumento', trendUp: true },
    { label: 'CUMPLIMIENTO LEGAL', value: '98.4%', icon: CheckCircle, trend: 'Alto', trendUp: true },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* HEADER */}
      <div className="animate-fade-up" style={{ background: '#FFFFFF', borderRadius: '20px', border: `1px solid ${colores.borde}`, borderLeft: `6px solid ${tema.acento}`, padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: `linear-gradient(135deg, ${tema.acento} 0%, ${tema.acentoOscuro} 100%)`, width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileText size={32} color={tema.sobreAcento} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px', color: colores.textoClaro, fontWeight: 700 }}>Agente de Pólizas y Docs</h1>
            <p style={{ margin: '4px 0 0 0', color: colores.textoMedio, fontSize: '15px' }}>Gestión automatizada de vigencias, seguros y trámites vehiculares por IA.</p>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {kpis.map((kpi, idx) => (
          <div key={idx} className="hover-lift animate-fade-up" style={{ animationDelay: `${idx * 0.1}s`, background: '#FFFFFF', borderRadius: '18px', padding: '20px', border: `1px solid ${colores.borde}`, borderTop: `4px solid ${tema.acento}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: colores.textoMedio }}>{kpi.label}</span>
              <div style={{ background: tema.acentoSuave, padding: '8px', borderRadius: '10px' }}>
                <kpi.icon size={18} color={tema.acento} />
              </div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: colores.textoClaro, marginBottom: '8px' }}>{kpi.value}</div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: colores.textoOscuro }}>
              {kpi.trend}
            </div>
          </div>
        ))}
      </div>

      {/* AI INSIGHT */}
      <div className="animate-fade-up" style={{ animationDelay: '0.4s', background: `linear-gradient(110deg, ${tema.acento}08 0%, transparent 60%)`, borderRadius: '18px', border: `1px solid ${tema.acento}30`, padding: '20px', display: 'flex', gap: '16px' }}>
        <div style={{ background: tema.acento, padding: '10px', borderRadius: '12px' }}>
          <Sparkles size={24} color={tema.sobreAcento} />
        </div>
        <div>
          <h3 style={{ margin: '0 0 6px 0', color: tema.acentoOscuro, fontSize: '16px', fontWeight: 700 }}>Insight de MAYIA · Agente Documental</h3>
          <p style={{ margin: 0, color: colores.textoMedio, fontSize: '14px', lineHeight: 1.5 }}>
            La póliza del <strong>VHL-105</strong> venció ayer. He bloqueado automáticamente la unidad en el sistema de asignación de rutas (TMS) para evitar multas de corralón ($18,500 MXN aprox). He iniciado el trámite de renovación Express con el proveedor AXA Seguros vía API.
          </p>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', gap: '32px', borderBottom: `1px solid ${colores.borde}` }}>
        {['Dashboard', 'Vencimientos', 'Agente IA'].map((tab) => (
          <div key={tab} onClick={() => setActiveTab(tab.toLowerCase())} style={{ padding: '12px 4px', cursor: 'pointer', fontSize: '15px', fontWeight: 600, color: activeTab === tab.toLowerCase() ? tema.acento : colores.textoMedio, borderBottom: activeTab === tab.toLowerCase() ? `3px solid ${tema.acento}` : '3px solid transparent' }}>
            {tab}
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div>
        {activeTab === 'dashboard' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
            <div style={{ background: '#FFF', borderRadius: '20px', padding: '24px', border: `1px solid ${colores.borde}` }}>
              <h4 style={{ margin: '0 0 20px 0', fontSize: '14px', color: colores.textoMedio, fontWeight: 700 }}>ESTATUS DE DOCUMENTACIÓN POR TIPO</h4>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={docsStatus} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colores.borde} />
                    <XAxis dataKey="tipo" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colores.textoOscuro }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colores.textoOscuro }} />
                    <Tooltip cursor={{ fill: colores.fondoSecundario }} />
                    <Legend />
                    <Bar dataKey="vigentes" name="Vigentes" stackId="a" fill={colores.exito} radius={[0, 0, 0, 0]} />
                    <Bar dataKey="porVencer" name="Por Vencer (30D)" stackId="a" fill={colores.advertencia} radius={[0, 0, 0, 0]} />
                    <Bar dataKey="vencidas" name="Vencidas / Alerta" stackId="a" fill={colores.peligro} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'vencimientos' && (
          <div style={{ background: '#FFF', borderRadius: '20px', border: `1px solid ${colores.borde}` }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: colores.fondoSecundario }}>
                  <th style={{ padding: '16px', fontSize: '12px', fontWeight: 600, color: colores.textoMedio }}>VEHÍCULO / ID DOC</th>
                  <th style={{ padding: '16px', fontSize: '12px', fontWeight: 600, color: colores.textoMedio }}>TIPO DOCUMENTO</th>
                  <th style={{ padding: '16px', fontSize: '12px', fontWeight: 600, color: colores.textoMedio }}>ESTATUS / VENCIMIENTO</th>
                  <th style={{ padding: '16px', fontSize: '12px', fontWeight: 600, color: colores.textoMedio }}>ACCIÓN IA (STATUS)</th>
                </tr>
              </thead>
              <tbody>
                {documentos.map((d, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${colores.borde}` }}>
                    <td style={{ padding: '16px' }}>
                      <div style={{ fontWeight: 600, color: colores.textoClaro }}>{d.vehiculo}</div>
                      <div style={{ fontSize: '12px', color: colores.textoOscuro }}>{d.id}</div>
                    </td>
                    <td style={{ padding: '16px', color: colores.textoMedio, fontSize: '14px' }}>{d.tipo}</td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ padding: '4px 8px', width: 'fit-content', background: d.status === 'Vigente' ? '#D1FAE5' : d.status === 'Por Vencer' ? '#FEF3C7' : '#FEE2E2', color: d.status === 'Vigente' ? '#047857' : d.status === 'Por Vencer' ? '#D97706' : '#DC2626', borderRadius: '12px', fontSize: '11px', fontWeight: 700 }}>
                          {d.status}
                        </span>
                        <span style={{ fontSize: '13px', fontWeight: 500, color: colores.textoOscuro }}>{d.vencimiento}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px', fontSize: '13px', fontWeight: 600, color: tema.acento }}>
                      {d.accion}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
