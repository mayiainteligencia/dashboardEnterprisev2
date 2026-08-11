import React, { useState, useEffect } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { 
  Users, Sparkles, Star, Shield, TrendingUp, ShieldAlert,
  Search, CheckCircle2, ChevronRight, Filter, Award
} from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

const { colores } = brandingConfig;

const tema = {
  acento: '#DC2626',
  acentoOscuro: '#991B1B',
  acentoSuave: '#FEE2E2',
  sobreAcento: '#FFFFFF',
};

interface Proveedor {
  id: string;
  nombre: string;
  categoria: string;
  matchScore: number;
  sla: number;
  riesgo: 'Bajo' | 'Medio' | 'Alto';
  metrics: { subject: string; A: number; fullMark: number }[];
  status: string;
}

const mockProveedores: Proveedor[] = [
  { id: 'PRV-1', nombre: 'TechSolutions SA', categoria: 'Refacciones', matchScore: 98, sla: 99.5, riesgo: 'Bajo', status: 'Verificado', metrics: [
    { subject: 'Calidad', A: 95, fullMark: 100 },
    { subject: 'SLA', A: 99, fullMark: 100 },
    { subject: 'Precio', A: 85, fullMark: 100 },
    { subject: 'Riesgo', A: 90, fullMark: 100 },
    { subject: 'ESG', A: 88, fullMark: 100 },
  ]},
  { id: 'PRV-2', nombre: 'ClimaMax Industrias', categoria: 'Clima', matchScore: 92, sla: 95.0, riesgo: 'Medio', status: 'Activo', metrics: [
    { subject: 'Calidad', A: 88, fullMark: 100 },
    { subject: 'SLA', A: 95, fullMark: 100 },
    { subject: 'Precio', A: 92, fullMark: 100 },
    { subject: 'Riesgo', A: 75, fullMark: 100 },
    { subject: 'ESG', A: 80, fullMark: 100 },
  ]},
  { id: 'PRV-3', nombre: 'Servicios Logísticos Global', categoria: 'Servicios', matchScore: 85, sla: 92.5, riesgo: 'Alto', status: 'En Observación', metrics: [
    { subject: 'Calidad', A: 82, fullMark: 100 },
    { subject: 'SLA', A: 92, fullMark: 100 },
    { subject: 'Precio', A: 98, fullMark: 100 },
    { subject: 'Riesgo', A: 60, fullMark: 100 },
    { subject: 'ESG', A: 70, fullMark: 100 },
  ]},
  { id: 'PRV-4', nombre: 'Partes y Motores MX', categoria: 'Refacciones', matchScore: 95, sla: 98.0, riesgo: 'Bajo', status: 'Verificado', metrics: [
    { subject: 'Calidad', A: 92, fullMark: 100 },
    { subject: 'SLA', A: 98, fullMark: 100 },
    { subject: 'Precio', A: 89, fullMark: 100 },
    { subject: 'Riesgo', A: 95, fullMark: 100 },
    { subject: 'ESG', A: 85, fullMark: 100 },
  ]},
];

const useAnimations = () => {
  useEffect(() => {
    const id = 'prov-animations';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
    `;
    document.head.appendChild(style);
  }, []);
};

export const Proveedores: React.FC = () => {
  useAnimations();
  const [selectedProv, setSelectedProv] = useState<Proveedor>(mockProveedores[0]);
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  const [slaFilter, setSlaFilter] = useState(90);

  const filteredProviders = mockProveedores.filter(p => 
    (categoryFilter === 'Todas' || p.categoria === categoryFilter) &&
    p.sla >= slaFilter
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeSlideUp 0.5s ease-out' }}>
      
      {/* Header */}
      <div style={{ background: colores.fondoPrincipal, borderRadius: '20px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: `1px solid ${colores.borde}`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: `linear-gradient(to bottom, ${tema.acento}, ${tema.acentoOscuro})` }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: `linear-gradient(135deg, ${tema.acentoSuave}, ${colores.fondoPrincipal})`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${colores.borde}` }}>
            <Users size={32} color={tema.acento} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <h1 style={{ margin: 0, fontSize: '24px', color: colores.textoClaro, fontWeight: 700 }}>Inteligencia de Proveedores</h1>
              <span style={{ padding: '4px 10px', background: tema.acentoSuave, color: tema.acentoOscuro, borderRadius: '12px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Sparkles size={12} /> AI MATCH
              </span>
            </div>
            <p style={{ margin: '4px 0 0', color: colores.textoMedio, fontSize: '14px' }}>Evaluación y recomendación continua de proveedores mediante IA.</p>
          </div>
        </div>
      </div>

      {/* AI Vendor Matcher Widget */}
      <div style={{ background: `linear-gradient(110deg, ${tema.acento}08 0%, transparent 60%)`, borderRadius: '16px', padding: '20px', border: `1px solid ${tema.acento}30`, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: tema.acentoOscuro }}>
          <Sparkles size={20} />
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Asistente MAYIA: Sugerencias de Sourcing</h3>
        </div>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {['Todas', 'Refacciones', 'Clima', 'Servicios'].map(cat => (
            <button 
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              style={{ padding: '8px 16px', borderRadius: '20px', border: `1px solid ${categoryFilter === cat ? tema.acento : colores.borde}`, background: categoryFilter === cat ? tema.acento : '#FFFFFF', color: categoryFilter === cat ? '#FFFFFF' : colores.textoMedio, fontWeight: 600, fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              {cat}
            </button>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: 'auto', background: '#FFFFFF', padding: '8px 16px', borderRadius: '20px', border: `1px solid ${colores.borde}` }}>
            <Filter size={16} color={colores.textoMedio} />
            <span style={{ fontSize: '13px', color: colores.textoMedio, fontWeight: 600 }}>SLA Mínimo: {slaFilter}%</span>
            <input type="range" min="80" max="100" value={slaFilter} onChange={(e) => setSlaFilter(Number(e.target.value))} style={{ width: '100px', accentColor: tema.acento }} />
          </div>
        </div>
      </div>

      {/* 60/40 Split Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '60fr 40fr', gap: '24px' }}>
        
        {/* Left: Supplier Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredProviders.map((prov, idx) => (
            <div 
              key={prov.id}
              onClick={() => setSelectedProv(prov)}
              style={{ background: selectedProv.id === prov.id ? '#FFFFFF' : colores.fondoSecundario, borderRadius: '16px', padding: '20px', border: `2px solid ${selectedProv.id === prov.id ? tema.acento : colores.borde}`, cursor: 'pointer', transition: 'all 0.2s', transform: selectedProv.id === prov.id ? 'translateY(-2px)' : 'none', boxShadow: selectedProv.id === prov.id ? '0 8px 24px rgba(0,0,0,0.06)' : 'none', animation: `fadeSlideUp ${0.3 + idx * 0.1}s ease-out` }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', color: colores.textoClaro }}>{prov.nombre}</h3>
                    {prov.status === 'Verificado' && <CheckCircle2 size={16} color={colores.exito} />}
                  </div>
                  <p style={{ margin: '0 0 16px', color: colores.textoMedio, fontSize: '14px' }}>{prov.categoria} • ID: {prov.id}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                  <div style={{ background: tema.acentoSuave, padding: '4px 12px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Award size={14} color={tema.acentoOscuro} />
                    <span style={{ fontSize: '14px', fontWeight: 700, color: tema.acentoOscuro }}>{prov.matchScore}% Match</span>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 600, padding: '4px 10px', borderRadius: '8px', background: prov.riesgo === 'Bajo' ? '#D1FAE5' : prov.riesgo === 'Medio' ? '#FEF3C7' : '#FEE2E2', color: prov.riesgo === 'Bajo' ? '#047857' : prov.riesgo === 'Medio' ? '#B45309' : '#991B1B' }}>
                    Riesgo {prov.riesgo}
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', borderTop: `1px solid ${colores.borde}`, paddingTop: '16px' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '12px', color: colores.textoOscuro, fontWeight: 600 }}>SLA PROMEDIO</p>
                  <p style={{ margin: '4px 0 0', fontSize: '16px', fontWeight: 700, color: colores.textoClaro }}>{prov.sla}%</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '12px', color: colores.textoOscuro, fontWeight: 600 }}>TIEMPO RESPUESTA</p>
                  <p style={{ margin: '4px 0 0', fontSize: '16px', fontWeight: 700, color: colores.textoClaro }}>&lt; 2 hrs</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '12px', color: colores.textoOscuro, fontWeight: 600 }}>ESTADO</p>
                  <p style={{ margin: '4px 0 0', fontSize: '14px', fontWeight: 600, color: colores.textoMedio }}>{prov.status}</p>
                </div>
              </div>
            </div>
          ))}
          {filteredProviders.length === 0 && (
            <div style={{ padding: '40px', textAlign: 'center', color: colores.textoMedio }}>
              No se encontraron proveedores que coincidan con los filtros.
            </div>
          )}
        </div>

        {/* Right: Sticky Radar Evaluation Inspector */}
        <div style={{ position: 'sticky', top: '24px', height: 'fit-content' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '24px', border: `1px solid ${colores.borde}`, boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
            <h3 style={{ margin: '0 0 4px', fontSize: '18px', color: colores.textoClaro }}>Evaluación 360°</h3>
            <p style={{ margin: '0 0 24px', color: colores.textoMedio, fontSize: '14px' }}>{selectedProv.nombre}</p>

            <div style={{ height: '300px', width: '100%', marginBottom: '24px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={selectedProv.metrics}>
                  <PolarGrid stroke={colores.borde} />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: colores.textoMedio, fontSize: 12, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: colores.textoOscuro, fontSize: 10 }} />
                  <Radar name={selectedProv.nombre} dataKey="A" stroke={tema.acento} fill={tema.acento} fillOpacity={0.4} />
                  <RechartsTooltip contentStyle={{ borderRadius: '12px', border: `1px solid ${colores.borde}` }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div style={{ background: colores.fondoSecundario, padding: '16px', borderRadius: '12px', border: `1px solid ${colores.borde}` }}>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                <Sparkles size={20} color={tema.acento} style={{ flexShrink: 0 }} />
                <p style={{ margin: 0, fontSize: '13px', color: colores.textoMedio, lineHeight: 1.5 }}>
                  <strong style={{ color: colores.textoClaro }}>Insight IA: </strong> 
                  {selectedProv.riesgo === 'Bajo' 
                    ? 'Excelente perfil. Recomendado para contratos de largo plazo debido a su consistencia en SLA.' 
                    : 'Atención requerida. El indicador de riesgo sugiere diversificar con proveedores alternativos.'}
                </p>
              </div>
              <button style={{ width: '100%', padding: '12px', background: '#FFFFFF', border: `1px solid ${colores.borde}`, borderRadius: '8px', color: colores.textoClaro, fontWeight: 600, fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s' }}>
                Ver Reporte Detallado
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
