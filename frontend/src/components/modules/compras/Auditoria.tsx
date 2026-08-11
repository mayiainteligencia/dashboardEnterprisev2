import React, { useState, useEffect } from 'react';
import { Shield, ShieldAlert, Search, Sparkles, FileSearch, Clock, AlertTriangle, ChevronRight } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, ResponsiveContainer } from 'recharts';
import { brandingConfig } from '../../../config/branding';

const { colores } = brandingConfig;
const tema = {
  acento: '#DC2626',
  acentoOscuro: '#991B1B',
  acentoSuave: '#FEE2E2',
  sobreAcento: '#FFFFFF',
};

const mockRadarData = [
  { metrica: 'Horario Anómalo', valor: 85, fullMark: 100 },
  { metrica: 'RFC Duplicado', valor: 60, fullMark: 100 },
  { metrica: 'Desviación Precio', valor: 95, fullMark: 100 },
  { metrica: 'Volumen Atípico', valor: 45, fullMark: 100 },
  { metrica: 'Falta Evidencia', valor: 70, fullMark: 100 },
];

const mockTimeline = Array.from({ length: 24 }).map((_, i) => {
  const hour = `${i.toString().padStart(2, '0')}:00`;
  const isAnomaly = i === 3 || i === 19;
  return {
    hour,
    txCount: Math.floor(Math.random() * 50) + (isAnomaly ? 0 : 10),
    isAnomaly,
    details: isAnomaly ? (i === 3 ? {
      id: 'TX-9982',
      causa: 'Factura emitida fuera de horario laboral (03:15 AM)',
      proveedor: 'Servicios Gamma',
      monto: '$120,500 MXN',
      riesgo: 'Alto',
    } : {
      id: 'TX-1044',
      causa: 'Precio unitario 35% por encima del benchmark de mercado',
      proveedor: 'TechCorp SA',
      monto: '$89,000 MXN',
      riesgo: 'Crítico',
    }) : null
  };
});

const useAnimations = () => {
  useEffect(() => {
    const id = 'module-animations-compras-auditoria';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes pulseDot { 0% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7); } 70% { box-shadow: 0 0 0 10px rgba(220, 38, 38, 0); } 100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); } }
    `;
    document.head.appendChild(style);
  }, []);
};

export const Auditoria: React.FC = () => {
  useAnimations();
  const [selectedAnomaly, setSelectedAnomaly] = useState<any>(mockTimeline.find(t => t.isAnomaly)?.details);

  return (
    <div style={{ maxWidth: 1200, display: 'flex', flexDirection: 'column', gap: 24, padding: '24px 0', animation: 'fadeSlideUp 0.6s ease-out' }}>
      
      {/* HEADER */}
      <div style={{ background: colores.fondoPrincipal, borderRadius: 20, padding: 24, display: 'flex', alignItems: 'center', gap: 24, border: `1px solid ${colores.borde}`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, background: `linear-gradient(to bottom, ${tema.acento}, ${tema.acentoOscuro})` }} />
        <div style={{ width: 64, height: 64, borderRadius: 16, background: `linear-gradient(135deg, ${tema.acento}, ${tema.acentoOscuro})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: tema.sobreAcento }}>
          <ShieldAlert size={32} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h1 style={{ margin: 0, fontSize: 28, color: colores.textoClaro }}>Auditoría y Control de Fraude</h1>
            <button style={{ marginLeft: 'auto', background: tema.acento, color: tema.sobreAcento, border: 'none', padding: '10px 20px', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Sparkles size={18} /> Generar Reporte de Auditoría ISO 9001 con IA
            </button>
          </div>
          <p style={{ margin: '8px 0 0 0', color: colores.textoMedio, fontSize: 16 }}>Análisis forense en tiempo real y detección de anomalías transaccionales.</p>
        </div>
      </div>

      {/* FORENSIC ANOMALY TIMELINE EXPLORER */}
      <div style={{ background: colores.fondoPrincipal, borderRadius: 20, padding: 32, border: `1px solid ${colores.borde}` }}>
        <h3 style={{ margin: '0 0 24px 0', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Clock size={20} color={tema.acento} /> Línea de Tiempo Forense (Últimas 24h)
        </h3>
        
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 120, borderBottom: `2px solid ${colores.fondoTerciario}`, paddingBottom: 8 }}>
          {mockTimeline.map((t, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              {t.isAnomaly && (
                <div 
                  onClick={() => setSelectedAnomaly(t.details)}
                  style={{ 
                    width: 12, height: 12, borderRadius: 6, background: colores.peligro, cursor: 'pointer',
                    animation: 'pulseDot 2s infinite', zIndex: 10,
                    border: selectedAnomaly?.id === t.details?.id ? '2px solid white' : 'none',
                    transform: selectedAnomaly?.id === t.details?.id ? 'scale(1.5)' : 'none',
                    transition: 'all 0.2s'
                  }} 
                  title="Anomalía detectada"
                />
              )}
              <div style={{ 
                width: '100%', 
                height: `${(t.txCount / 60) * 80}px`, 
                background: t.isAnomaly ? `linear-gradient(to top, ${colores.peligro}, ${colores.peligro}80)` : colores.fondoTerciario,
                borderRadius: '4px 4px 0 0',
                opacity: selectedAnomaly && !t.isAnomaly ? 0.3 : 1,
                transition: 'opacity 0.3s'
              }} />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, color: colores.textoOscuro, fontSize: 12 }}>
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>23:59</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 24 }}>
        {/* FORENSIC INSPECTOR PANEL */}
        <div style={{ background: colores.fondoSecundario, borderRadius: 20, padding: 32, border: `1px solid ${colores.borde}`, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: selectedAnomaly?.riesgo === 'Crítico' ? colores.peligro : tema.acento }} />
          <h3 style={{ margin: '0 0 24px 0', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: 12 }}>
            <FileSearch size={24} color={colores.textoMedio} /> Panel de Inspección Profunda
          </h3>
          
          {selectedAnomaly ? (
            <div style={{ animation: 'fadeSlideUp 0.4s ease-out' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <span style={{ fontSize: 24, fontWeight: 'bold', color: colores.textoClaro }}>{selectedAnomaly.id}</span>
                <span style={{ background: `${colores.peligro}20`, color: colores.peligro, padding: '6px 16px', borderRadius: 20, fontSize: 14, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <AlertTriangle size={16} /> Riesgo {selectedAnomaly.riesgo}
                </span>
              </div>
              
              <div style={{ background: colores.fondoPrincipal, padding: 24, borderRadius: 16, border: `1px solid ${colores.borde}`, marginBottom: 24 }}>
                <h4 style={{ margin: '0 0 12px 0', color: colores.peligro, fontSize: 16 }}>Causa Raíz Detectada</h4>
                <p style={{ margin: 0, color: colores.textoClaro, fontSize: 18, fontWeight: 'bold' }}>{selectedAnomaly.causa}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                <div>
                  <div style={{ fontSize: 13, color: colores.textoOscuro, textTransform: 'uppercase', marginBottom: 4 }}>Proveedor Involucrado</div>
                  <div style={{ fontWeight: 'bold', fontSize: 16, color: colores.textoClaro }}>{selectedAnomaly.proveedor}</div>
                </div>
                <div>
                  <div style={{ fontSize: 13, color: colores.textoOscuro, textTransform: 'uppercase', marginBottom: 4 }}>Monto de Transacción</div>
                  <div style={{ fontWeight: 'bold', fontSize: 16, color: colores.textoClaro }}>{selectedAnomaly.monto}</div>
                </div>
              </div>
              
              <div style={{ marginTop: 32, display: 'flex', gap: 16 }}>
                <button style={{ flex: 1, background: colores.fondoPrincipal, border: `1px solid ${colores.borde}`, padding: 12, borderRadius: 8, fontWeight: 'bold', cursor: 'pointer', color: colores.textoMedio }}>Descartar (Falso Positivo)</button>
                <button style={{ flex: 1, background: colores.peligro, color: 'white', border: 'none', padding: 12, borderRadius: 8, fontWeight: 'bold', cursor: 'pointer' }}>Bloquear Pago y Escalar</button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 250, color: colores.textoOscuro }}>
              <Search size={48} style={{ opacity: 0.3, marginBottom: 16 }} />
              <p>Selecciona una anomalía en la línea de tiempo para ver los detalles.</p>
            </div>
          )}
        </div>

        {/* RADAR CHART */}
        <div style={{ background: colores.fondoPrincipal, borderRadius: 20, padding: 24, border: `1px solid ${colores.borde}` }}>
          <h3 style={{ margin: '0 0 16px 0', color: colores.textoClaro }}>Vectores de Riesgo (IA)</h3>
          <div style={{ height: 320, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={mockRadarData}>
                <PolarGrid stroke={colores.fondoTerciario} />
                <PolarAngleAxis dataKey="metrica" tick={{ fill: colores.textoMedio, fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Riesgo Detectado" dataKey="valor" stroke={tema.acento} fill={tema.acento} fillOpacity={0.4} />
                <Tooltip 
                  contentStyle={{ borderRadius: 12, border: `1px solid ${colores.borde}`, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );
};
