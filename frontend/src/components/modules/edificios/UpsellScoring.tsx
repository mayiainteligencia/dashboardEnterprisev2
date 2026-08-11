import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, Sparkles, PieChart as PieChartIcon, Search, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { brandingConfig } from '../../../config/branding';

const { colores } = brandingConfig;

const tema = {
  acento: '#10B981',
  acentoOscuro: '#047857',
  acentoSuave: '#D1FAE5',
  sobreAcento: '#FFFFFF',
};

const opportunities = [
  { id: 1, client: 'Torre Mayor', service: 'Limpieza Profunda', currentVal: 120, potentialVal: 200, score: 95, status: 'hot' },
  { id: 2, client: 'Plaza Andares', service: 'Seguridad Biométricos', currentVal: 350, potentialVal: 500, score: 88, status: 'warm' },
  { id: 3, client: 'Campus Tec', service: 'Mantenimiento HVAC AI', currentVal: 180, potentialVal: 280, score: 92, status: 'hot' },
  { id: 4, client: 'Hospital Ángeles', service: 'Sanitización UV', currentVal: 400, potentialVal: 480, score: 75, status: 'cold' },
  { id: 5, client: 'Corporativo Banamex', service: 'Cámaras Térmicas', currentVal: 220, potentialVal: 350, score: 85, status: 'warm' },
  { id: 6, client: 'Parque Industrial Sur', service: 'Poda y Jardinería', currentVal: 80, potentialVal: 120, score: 60, status: 'cold' },
];

const pieData = [
  { name: 'Seguridad y Accesos', value: 35 },
  { name: 'Climatización (HVAC)', value: 30 },
  { name: 'Limpieza y Sanitización', value: 20 },
  { name: 'Otros', value: 15 },
];

const COLORS = [tema.acentoOscuro, tema.acento, '#34D399', '#6EE7B7'];

const useAnimations = () => {
  useEffect(() => {
    const id = 'module-animations-upsell';
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
      @keyframes slideInRight {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
      }
      .anim-drawer {
        animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
    `;
    document.head.appendChild(style);
  }, []);
};

export const UpsellScoring: React.FC = () => {
  useAnimations();
  const [activeTab, setActiveTab] = useState('matrix');
  const [selectedOpp, setSelectedOpp] = useState<any>(null);
  const [generating, setGenerating] = useState(false);
  const [pitch, setPitch] = useState('');

  const generatePitch = () => {
    setGenerating(true);
    setTimeout(() => {
      setPitch(`Estimado equipo de ${selectedOpp.client},\n\nHe notado que su inversión actual en facility management está rindiendo excelentes frutos. Sin embargo, nuestro motor de IA MAYIA ha detectado una oportunidad para optimizar aún más sus operaciones mediante la implementación de **${selectedOpp.service}**.\n\nProyectamos que este upgrade no solo mejorará los estándares actuales, sino que incrementará el valor retenido a largo plazo. ¿Tendrían 15 minutos esta semana para mostrarles los datos proyectados?\n\nSaludos.`);
      setGenerating(false);
    }, 1500);
  };

  return (
    <div style={{ maxWidth: 1200, display: 'flex', flexDirection: 'column', gap: 20, position: 'relative', overflow: 'hidden' }}>
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
          <Target size={32} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
            <h1 style={{ margin: 0, fontSize: 24, color: colores.textoClaro, fontWeight: 700 }}>Scoring de Upsell y Cross-sell</h1>
            <span style={{ background: tema.acentoSuave, color: tema.acentoOscuro, padding: '4px 10px', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>IA ACTIVA</span>
          </div>
          <p style={{ margin: 0, color: colores.textoMedio }}>Matriz de oportunidades de venta cruzada basada en patrones de consumo y necesidades operativas.</p>
        </div>
      </div>

      {/* AI INSIGHT */}
      <div className="anim-fade-up" style={{ 
        background: `linear-gradient(110deg, ${tema.acento}08 0%, transparent 60%)`,
        border: `1px solid ${tema.acento}30`, borderRadius: '18px', padding: 20, display: 'flex', gap: 16, alignItems: 'flex-start'
      }}>
        <div style={{ background: tema.acentoSuave, padding: 10, borderRadius: 12, color: tema.acentoOscuro }}>
          <Sparkles size={24} />
        </div>
        <div>
          <h3 style={{ margin: '0 0 4px 0', fontSize: 16, color: tema.acentoOscuro, fontWeight: 600 }}>Insight de MAYIA · IA Comercial</h3>
          <p style={{ margin: 0, fontSize: 14, color: colores.textoMedio }}>El algoritmo identifica un pipeline de upsell de $410k MXN potenciales este trimestre. "Torre Mayor" y "Campus Tec" tienen una probabilidad de cierre superior al 90% para servicios de optimización. Se recomienda iniciar outreach de inmediato.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        {/* MAIN MATRIX */}
        <div className="anim-fade-up" style={{ background: colores.fondoPrincipal, border: `1px solid ${colores.borde}`, borderRadius: '18px', padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontSize: 16, color: colores.textoClaro }}>Ranking de Oportunidades</h3>
            <div style={{ position: 'relative' }}>
              <Search size={16} color={colores.textoOscuro} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
              <input type="text" placeholder="Buscar cliente..." style={{ padding: '8px 12px 8px 36px', borderRadius: 8, border: `1px solid ${colores.borde}`, fontSize: 14, outline: 'none', background: colores.fondoSecundario }} />
            </div>
          </div>

          <div style={{ border: `1px solid ${colores.borde}`, borderRadius: 12, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ background: colores.fondoSecundario, borderBottom: `1px solid ${colores.borde}` }}>
                <tr>
                  <th style={{ padding: '12px 16px', fontSize: 12, fontWeight: 600, color: colores.textoOscuro, textTransform: 'uppercase' }}>Cliente</th>
                  <th style={{ padding: '12px 16px', fontSize: 12, fontWeight: 600, color: colores.textoOscuro, textTransform: 'uppercase' }}>Servicio Sugerido</th>
                  <th style={{ padding: '12px 16px', fontSize: 12, fontWeight: 600, color: colores.textoOscuro, textTransform: 'uppercase' }}>Score IA</th>
                  <th style={{ padding: '12px 16px', fontSize: 12, fontWeight: 600, color: colores.textoOscuro, textTransform: 'uppercase' }}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {opportunities.map((opp, i) => (
                  <tr key={opp.id} style={{ borderBottom: `1px solid ${colores.borde}`, transition: 'background 0.2s', cursor: 'pointer' }} 
                      onMouseEnter={e => e.currentTarget.style.background = colores.fondoSecundario} 
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      onClick={() => { setSelectedOpp(opp); setPitch(''); }}
                  >
                    <td style={{ padding: '16px', fontSize: 14, fontWeight: 600, color: colores.textoClaro }}>{opp.client}</td>
                    <td style={{ padding: '16px', fontSize: 14, color: colores.textoMedio }}>{opp.service}</td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 100, height: 6, background: colores.fondoTerciario, borderRadius: 3, overflow: 'hidden' }}>
                          <div style={{ width: `${opp.score}%`, height: '100%', background: opp.score > 90 ? colores.exito : opp.score > 70 ? tema.acento : colores.advertencia }} />
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 600, color: colores.textoClaro }}>{opp.score}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <button style={{ padding: '6px 12px', borderRadius: 6, background: tema.acentoSuave, color: tema.acentoOscuro, border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                        Generar <ArrowRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CHARTS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="anim-fade-up" style={{ background: colores.fondoPrincipal, border: `1px solid ${colores.borde}`, borderRadius: '18px', padding: 20, flex: 1, animationDelay: '0.1s' }}>
             <h3 style={{ margin: '0 0 16px 0', fontSize: 14, color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: 8 }}><PieChartIcon size={18} color={tema.acento} /> Distribución por Servicio</h3>
             <div style={{ height: 180 }}>
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={2} dataKey="value" stroke="none">
                     {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                   </Pie>
                   <Tooltip contentStyle={{ borderRadius: 8, border: `1px solid ${colores.borde}`, fontSize: 12 }} />
                 </PieChart>
               </ResponsiveContainer>
             </div>
          </div>
          <div className="anim-fade-up" style={{ background: colores.fondoPrincipal, border: `1px solid ${colores.borde}`, borderRadius: '18px', padding: 20, flex: 1, animationDelay: '0.15s' }}>
             <h3 style={{ margin: '0 0 16px 0', fontSize: 14, color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: 8 }}><TrendingUp size={18} color={tema.acento} /> Valor Actual vs Potencial (k$)</h3>
             <div style={{ height: 180 }}>
               <ResponsiveContainer width="100%" height="100%">
                 <ScatterChart margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colores.borde} />
                   <XAxis type="number" dataKey="currentVal" name="Actual" stroke={colores.textoOscuro} fontSize={10} tickLine={false} axisLine={false} />
                   <YAxis type="number" dataKey="potentialVal" name="Potencial" stroke={colores.textoOscuro} fontSize={10} tickLine={false} axisLine={false} />
                   <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: 8, border: `1px solid ${colores.borde}`, fontSize: 12 }} />
                   <Scatter name="Clientes" data={opportunities} fill={tema.acento} />
                 </ScatterChart>
               </ResponsiveContainer>
             </div>
          </div>
        </div>
      </div>

      {/* DRAWER COMPONENT */}
      {selectedOpp && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)', zIndex: 999, display: 'flex', justifyContent: 'flex-end' }} onClick={(e) => { if (e.target === e.currentTarget) setSelectedOpp(null); }}>
          <div className="anim-drawer" style={{ width: 450, background: colores.fondoPrincipal, height: '100%', boxShadow: '-4px 0 24px rgba(0,0,0,0.1)', padding: 32, display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, borderBottom: `1px solid ${colores.borde}`, paddingBottom: 16 }}>
              <div>
                <span style={{ fontSize: 12, color: tema.acentoOscuro, fontWeight: 600, background: tema.acentoSuave, padding: '4px 8px', borderRadius: 8 }}>MAYIA Pitch Generator</span>
                <h2 style={{ margin: '8px 0 0 0', fontSize: 20, color: colores.textoClaro }}>{selectedOpp.client}</h2>
              </div>
              <button onClick={() => setSelectedOpp(null)} style={{ background: 'none', border: 'none', fontSize: 24, color: colores.textoOscuro, cursor: 'pointer' }}>&times;</button>
            </div>

            <div style={{ background: colores.fondoSecundario, padding: 16, borderRadius: 12, marginBottom: 24 }}>
              <div style={{ fontSize: 12, color: colores.textoOscuro, textTransform: 'uppercase', marginBottom: 4 }}>Oportunidad Sugerida</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: colores.textoClaro, marginBottom: 12 }}>{selectedOpp.service}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${colores.borde}`, paddingTop: 12 }}>
                <div>
                  <div style={{ fontSize: 11, color: colores.textoOscuro }}>Probabilidad (AI)</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: tema.acento }}>{selectedOpp.score}%</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: colores.textoOscuro }}>Delta de Valor</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: colores.textoClaro }}>+${selectedOpp.potentialVal - selectedOpp.currentVal}k</div>
                </div>
              </div>
            </div>

            <button 
              onClick={generatePitch} 
              disabled={generating}
              style={{ padding: '14px', borderRadius: 10, background: tema.acento, color: tema.sobreAcento, border: 'none', fontWeight: 600, fontSize: 15, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, opacity: generating ? 0.7 : 1 }}
            >
              {generating ? 'Generando con IA...' : <><Sparkles size={18} /> Redactar Propuesta (1-Click)</>}
            </button>

            {pitch && (
              <div className="anim-fade-up" style={{ marginTop: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, color: colores.textoClaro, fontWeight: 600 }}>
                  <FileText size={16} /> Borrador Generado
                </div>
                <textarea 
                  value={pitch} 
                  onChange={(e) => setPitch(e.target.value)}
                  style={{ flex: 1, width: '100%', padding: 16, borderRadius: 12, border: `1px solid ${colores.borde}`, background: colores.fondoPrincipal, color: colores.textoMedio, fontSize: 14, fontFamily: 'inherit', resize: 'none', outline: 'none' }} 
                />
                <button style={{ marginTop: 16, padding: '14px', borderRadius: 10, background: colores.textoClaro, color: colores.fondoPrincipal, border: 'none', fontWeight: 600, fontSize: 15, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
                  <CheckCircle2 size={18} /> Copiar al Portapapeles
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
