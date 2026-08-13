import React, { useState, useEffect } from 'react';
import { FileText, Download, Building, Users, Activity, Sparkles, LayoutTemplate, Printer, ChevronDown } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { brandingConfig } from '../../../config/branding';

const { colores } = brandingConfig;

const tema = {
  acento: '#10B981',
  acentoOscuro: '#047857',
  acentoSuave: '#D1FAE5',
  sobreAcento: '#FFFFFF',
};

const clients = [
  { id: 'banorte', name: 'Banorte - Corporativo', score: 98, tickets: 12, savings: '$45,000' },
  { id: 'bbva', name: 'BBVA - Torre Reforma', score: 95, tickets: 8, savings: '$62,000' },
  { id: 'walmart', name: 'Walmart - Cedis', score: 88, tickets: 24, savings: '$21,000' },
  { id: 'bimbo', name: 'Grupo Bimbo', score: 92, tickets: 15, savings: '$34,000' }
];

const mockChartData = [
  { name: 'Ene', SLA: 98, incidencias: 45 },
  { name: 'Feb', SLA: 97, incidencias: 52 },
  { name: 'Mar', SLA: 99, incidencias: 38 },
  { name: 'Abr', SLA: 98, incidencias: 41 },
  { name: 'May', SLA: 99, incidencias: 35 },
  { name: 'Jun', SLA: 100, incidencias: 28 },
];

const useAnimations = () => {
  useEffect(() => {
    const id = 'module-animations-reporte';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @keyframes fadeSlideUp { 
        from { opacity: 0; transform: translateY(18px); } 
        to { opacity: 1; transform: translateY(0); } 
      }
      .anim-fade-up {
        animation: fadeSlideUp 0.5s ease-out forwards;
      }
    `;
    document.head.appendChild(style);
  }, []);
};

export const ReporteEjecutivo: React.FC = () => {
  useAnimations();
  const [selectedClient, setSelectedClient] = useState(clients[0]);
  const [activeTab, setActiveTab] = useState('preview');

  return (
    <div style={{ maxWidth: 1200, display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* HEADER */}
      <div className="anim-fade-up" style={{ 
        background: colores.fondoPrincipal, 
        border: `1px solid ${colores.borde}`, 
        borderRadius: '22px', 
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        borderLeft: `4px solid ${tema.acento}`
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: '16px',
          background: `linear-gradient(135deg, ${tema.acento} 0%, ${tema.acentoOscuro} 100%)`,
          display: 'flex', justifyContent: 'center', alignItems: 'center', color: tema.sobreAcento
        }}>
          <FileText size={32} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
            <h1 style={{ margin: 0, fontSize: 24, color: colores.textoClaro, fontWeight: 700 }}>Reporte Ejecutivo de Facility</h1>
            <span style={{ background: tema.acentoSuave, color: tema.acentoOscuro, padding: '4px 10px', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>LIVE BUILDER</span>
          </div>
          <p style={{ margin: 0, color: colores.textoMedio }}>Generador de reportes dinámicos con conclusiones de IA para clientes corporativos.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button style={{ 
            display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 10,
            background: colores.fondoSecundario, border: `1px solid ${colores.borde}`, color: colores.textoClaro, fontWeight: 600, cursor: 'pointer'
          }}>
            <Printer size={18} /> Imprimir
          </button>
          <button style={{ 
            display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 10,
            background: tema.acento, color: tema.sobreAcento, border: 'none', fontWeight: 600, cursor: 'pointer'
          }}>
            <Download size={18} /> Descargar PDF
          </button>
        </div>
      </div>

      {/* SELECTOR & INSIGHT */}
      <div className="anim-fade-up" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20 }}>
        <div style={{ background: colores.fondoPrincipal, border: `1px solid ${colores.borde}`, borderRadius: '18px', padding: 20 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: colores.textoOscuro, textTransform: 'uppercase', marginBottom: 8 }}>Seleccionar Cliente</label>
          <div style={{ position: 'relative' }}>
             <select 
               value={selectedClient.id}
               onChange={(e) => setSelectedClient(clients.find(c => c.id === e.target.value) || clients[0])}
               style={{ 
                 width: '100%', padding: '12px 16px', borderRadius: 12, border: `1px solid ${colores.borde}`,
                 appearance: 'none', background: colores.fondoSecundario, fontSize: 16, fontWeight: 600, color: colores.textoClaro, cursor: 'pointer'
               }}
             >
               {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
             </select>
             <ChevronDown size={20} color={colores.textoOscuro} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          </div>
          
          <div style={{ marginTop: 24 }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: 14, color: colores.textoClaro }}>Métricas Rápidas</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: 12, background: colores.fondoSecundario, borderRadius: 10 }}>
                <span style={{ color: colores.textoMedio, fontSize: 14 }}>SLA Promedio</span>
                <span style={{ fontWeight: 700, color: colores.textoClaro }}>{selectedClient.score}%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: 12, background: colores.fondoSecundario, borderRadius: 10 }}>
                <span style={{ color: colores.textoMedio, fontSize: 14 }}>Tickets Activos</span>
                <span style={{ fontWeight: 700, color: colores.textoClaro }}>{selectedClient.tickets}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: 12, background: colores.fondoSecundario, borderRadius: 10 }}>
                <span style={{ color: colores.textoMedio, fontSize: 14 }}>Ahorro Energético</span>
                <span style={{ fontWeight: 700, color: tema.acentoOscuro }}>{selectedClient.savings}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ 
          background: `linear-gradient(110deg, ${tema.acento}08 0%, transparent 60%)`,
          border: `1px solid ${tema.acento}30`, borderRadius: '18px', padding: 24, display: 'flex', flexDirection: 'column'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
             <div style={{ background: tema.acentoSuave, padding: 10, borderRadius: 12, color: tema.acentoOscuro }}>
              <Sparkles size={24} />
            </div>
            <h3 style={{ margin: 0, fontSize: 18, color: tema.acentoOscuro, fontWeight: 600 }}>Conclusión Ejecutiva de MAYIA para Reporte</h3>
          </div>
          <div style={{ background: colores.fondoPrincipal, padding: 20, borderRadius: 12, border: `1px solid ${colores.borde}`, flex: 1, color: colores.textoMedio, lineHeight: 1.6, fontSize: 15 }}>
            <p style={{ margin: '0 0 12px 0' }}>Durante el último trimestre, <strong>{selectedClient.name}</strong> ha mantenido un nivel de servicio excepcional con un SLA sostenido del {selectedClient.score}%. Se implementaron rutinas de mantenimiento predictivo en sistemas HVAC que resultaron en una reducción del 18% en fallas críticas.</p>
            <p style={{ margin: 0 }}><strong>Recomendación IA:</strong> Considerando el volumen de tickets ({selectedClient.tickets} activos), sugerimos la actualización de tableros eléctricos en el ala oeste para optimizar la carga térmica y prevenir cortes durante el verano, lo cual proyecta un ROI de 8 meses.</p>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${colores.borde}`, marginBottom: 4 }}>
        {[
          { id: 'preview', label: 'Vista Previa del Documento' },
          { id: 'templates', label: 'Plantillas' }
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: '12px 24px', background: 'none', border: 'none', borderBottom: `2px solid ${activeTab === tab.id ? tema.acento : 'transparent'}`,
            color: activeTab === tab.id ? tema.acentoOscuro : colores.textoOscuro, fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s'
          }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* DOCUMENT PREVIEW */}
      {activeTab === 'preview' && (
        <div className="anim-fade-up" style={{ 
          background: colores.fondoPrincipal, border: `1px solid ${colores.borde}`, borderRadius: '8px', padding: 40,
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)', minHeight: 600, margin: '0 auto', width: '100%', maxWidth: 850
        }}>
          {/* Doc Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `2px solid ${tema.acento}`, paddingBottom: 20, marginBottom: 30 }}>
             <div>
               <h1 style={{ margin: '0 0 8px 0', fontSize: 28, color: colores.textoClaro }}>Reporte de Desempeño Operativo</h1>
               <h2 style={{ margin: 0, fontSize: 18, color: colores.textoMedio, fontWeight: 400 }}>{selectedClient.name}</h2>
             </div>
             <div style={{ textAlign: 'right', color: colores.textoOscuro, fontSize: 14 }}>
               <div>Fecha: {new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
               <div>Periodo: Q2 2026</div>
               <div style={{ marginTop: 8, fontWeight: 600, color: tema.acento }}>Totalplay Facility Management</div>
             </div>
          </div>

          <h3 style={{ fontSize: 18, color: colores.textoClaro, borderBottom: `1px solid ${colores.borde}`, paddingBottom: 8, marginBottom: 20 }}>1. Resumen Ejecutivo (MAYIA Insights)</h3>
          <p style={{ color: colores.textoMedio, lineHeight: 1.7, fontSize: 14, marginBottom: 30 }}>
            Durante el último trimestre, el cliente ha mantenido un nivel de servicio excepcional con un SLA sostenido del {selectedClient.score}%. 
            Se implementaron rutinas de mantenimiento predictivo en sistemas HVAC que resultaron en una reducción del 18% en fallas críticas.
            Considerando el volumen de tickets actuales, sugerimos la actualización de tableros eléctricos en el ala oeste para optimizar la carga térmica y prevenir cortes durante el verano, lo cual proyecta un ROI de 8 meses.
          </p>

          <h3 style={{ fontSize: 18, color: colores.textoClaro, borderBottom: `1px solid ${colores.borde}`, paddingBottom: 8, marginBottom: 20 }}>2. Métricas Clave de Desempeño (KPIs)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
            {[
              { l: 'SLA Cumplimiento', v: `${selectedClient.score}%` },
              { l: 'Tickets Resueltos', v: '145' },
              { l: 'Ahorro Generado', v: selectedClient.savings }
            ].map((k, i) => (
              <div key={i} style={{ background: colores.fondoSecundario, padding: 16, borderRadius: 8, borderLeft: `3px solid ${tema.acento}` }}>
                <div style={{ fontSize: 12, color: colores.textoOscuro, textTransform: 'uppercase', marginBottom: 4 }}>{k.l}</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: colores.textoClaro }}>{k.v}</div>
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: 18, color: colores.textoClaro, borderBottom: `1px solid ${colores.borde}`, paddingBottom: 8, marginBottom: 20 }}>3. Tendencia de SLA e Incidencias</h3>
          <div style={{ height: 250, width: '100%', marginBottom: 20 }}>
            <ResponsiveContainer>
              <AreaChart data={mockChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSLA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={tema.acento} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={tema.acento} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colores.borde} />
                <XAxis dataKey="name" stroke={colores.textoOscuro} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" stroke={colores.textoOscuro} fontSize={12} tickLine={false} axisLine={false} domain={[90, 100]} />
                <YAxis yAxisId="right" orientation="right" stroke={colores.textoOscuro} fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Area yAxisId="left" type="monotone" dataKey="SLA" stroke={tema.acento} fill="url(#colorSLA)" strokeWidth={2} />
                <Bar yAxisId="right" dataKey="incidencias" fill={colores.borde} barSize={20} radius={[4,4,0,0]} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};
