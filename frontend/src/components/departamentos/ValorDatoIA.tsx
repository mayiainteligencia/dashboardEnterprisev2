import React, { useState, useEffect } from 'react';
import { Lightbulb, Database, Target, TrendingUp, Zap, Sparkles, Bot } from 'lucide-react';
import { brandingConfig } from '../../config/branding';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Cell } from 'recharts';

export const ValorDatoIA: React.FC = () => {
  const { colores } = brandingConfig;
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => { const c = () => setIsMobile(window.innerWidth < 1024); c(); window.addEventListener('resize', c); return () => window.removeEventListener('resize', c); }, []);
  const px = isMobile ? '16px' : '32px';

  const roiData = [
    { area: 'Operaciones', actual: 1.2, potencial: 3.5 },
    { area: 'Comercial', actual: 0.8, potencial: 2.8 },
    { area: 'RRHH', actual: 0.4, potencial: 1.2 },
    { area: 'Finanzas', actual: 1.5, potencial: 2.5 },
  ];

  const oportunidades = [
    { id: 'OP-01', titulo: 'Predicción de fallos en infraestructura', area: 'Operaciones', impacto: '$1.8M', esfuerzo: 'Medio', roi: 340, color: colores.exito },
    { id: 'OP-02', titulo: 'Asistente IA para atención a clientes', area: 'Comercial', impacto: '$2.1M', esfuerzo: 'Alto', roi: 280, color: '#8B5CF6' },
    { id: 'OP-03', titulo: 'Optimización de consumo energético', area: 'Instalaciones', impacto: '$850K', esfuerzo: 'Bajo', roi: 450, color: colores.primario },
    { id: 'OP-04', titulo: 'Segmentación hiper-personalizada', area: 'Marketing', impacto: '$1.4M', esfuerzo: 'Medio', roi: 310, color: '#EC4899' },
  ];

  const madurez = [
    { nivel: 'Recolección', score: 92, color: colores.exito },
    { nivel: 'Integración', score: 75, color: colores.primario },
    { nivel: 'Análisis IA', score: 42, color: '#8B5CF6' },
    { nivel: 'Automatización', score: 28, color: colores.advertencia },
  ];

  const agentes = [
    { nombre: 'Data Value Analyst', rol: 'Identificación de ROI', color: '#8B5CF6' },
    { nombre: 'AI Readiness', rol: 'Evaluación de madurez', color: colores.primario },
    { nombre: 'Monetization Bot', rol: 'Estrategias de valor', color: '#EC4899' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: colores.fondoPrincipal }}>
      <div style={{ padding: isMobile ? '16px 16px 0' : '28px 32px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Lightbulb size={16} color="#fff" />
          </div>
          <h2 style={{ fontSize: isMobile ? '18px' : '22px', fontWeight: '900', color: colores.textoClaro, margin: 0 }}>Valor del Dato y Oportunidades de IA</h2>
        </div>
        <p style={{ fontSize: '13px', color: colores.textoMedio, margin: '0 0 12px 0' }}>Madurez analítica · ROI Potencial · Casos de uso · Monetización</p>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {[
            { label: 'Valor potencial total', val: '$8.5M', color: '#8B5CF6' },
            { label: 'Oportunidades', val: '14', color: colores.primario },
            { label: 'Score Madurez', val: '59/100', color: colores.advertencia },
            { label: 'Proyectos IA activos', val: '2', color: colores.exito },
          ].map((k, i) => (
            <div key={i} style={{ padding: '8px 14px', borderRadius: '12px', textAlign: 'center', background: `${k.color}10`, border: `1px solid ${k.color}25`, flexShrink: 0 }}>
              <div style={{ fontSize: '16px', fontWeight: '800', color: k.color }}>{k.val}</div>
              <div style={{ fontSize: '10px', color: colores.textoMedio, whiteSpace: 'nowrap' }}>{k.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: `20px ${px} 32px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr', gap: '20px', marginBottom: '20px' }}>
          {/* ROI Chart */}
          <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: colores.textoClaro, margin: 0 }}>
                <TrendingUp size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />Valor Actual vs Potencial (M$ USD)
              </h3>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{ fontSize: '10px', color: colores.textoMedio }}><span style={{ color: '#8B5CF6' }}>■</span> Actual</span>
                <span style={{ fontSize: '10px', color: colores.textoMedio }}><span style={{ color: '#EC4899' }}>■</span> Potencial</span>
              </div>
            </div>
            <div style={{ height: '220px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={roiData} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={`${colores.borde}44`} horizontal={true} vertical={false} />
                  <XAxis type="number" tick={{ fontSize: 10, fill: colores.textoOscuro }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="area" tick={{ fontSize: 11, fill: colores.textoClaro, fontWeight: 600 }} axisLine={false} tickLine={false} width={80} />
                  <Tooltip contentStyle={{ background: colores.fondoSecundario, border: `1px solid ${colores.borde}`, borderRadius: '8px', fontSize: '11px' }} />
                  <Bar dataKey="actual" fill="#8B5CF6" radius={[0, 4, 4, 0]} barSize={12} />
                  <Bar dataKey="potencial" fill="#EC4899" radius={[0, 4, 4, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Madurez */}
          <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: colores.textoClaro, margin: '0 0 16px 0' }}>
              <Target size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />Curva de Madurez IA
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {madurez.map(m => (
                <div key={m.nivel}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: colores.textoClaro }}>{m.nivel}</span>
                    <span style={{ fontSize: '12px', fontWeight: '800', color: m.color }}>{m.score}%</span>
                  </div>
                  <div style={{ height: '8px', borderRadius: '4px', backgroundColor: `${colores.borde}44`, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${m.score}%`, borderRadius: '4px', backgroundColor: m.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Oportunidades Table */}
        <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '700', color: colores.textoClaro, margin: '0 0 16px 0' }}>
            <Sparkles size={14} style={{ verticalAlign: 'middle', marginRight: '6px', color: '#8B5CF6' }} />Portafolio de Oportunidades IA
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead><tr>{['ID', 'Iniciativa', 'Área', 'Impacto', 'Esfuerzo', 'ROI Est.'].map(h => (
                <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: colores.textoMedio, fontWeight: '600', borderBottom: `1px solid ${colores.borde}`, fontSize: '10px', textTransform: 'uppercase' }}>{h}</th>
              ))}</tr></thead>
              <tbody>{oportunidades.map(o => (
                <tr key={o.id}>
                  <td style={{ padding: '12px', borderBottom: `1px solid ${colores.borde}33`, color: colores.textoMedio, fontSize: '10px' }}>{o.id}</td>
                  <td style={{ padding: '12px', borderBottom: `1px solid ${colores.borde}33`, fontWeight: '700', color: colores.textoClaro }}>{o.titulo}</td>
                  <td style={{ padding: '12px', borderBottom: `1px solid ${colores.borde}33`, color: colores.textoMedio }}>{o.area}</td>
                  <td style={{ padding: '12px', borderBottom: `1px solid ${colores.borde}33`, color: o.color, fontWeight: '700' }}>{o.impacto}</td>
                  <td style={{ padding: '12px', borderBottom: `1px solid ${colores.borde}33` }}>
                    <span style={{ fontSize: '9px', fontWeight: '600', color: colores.textoClaro, backgroundColor: colores.fondoTerciario, padding: '3px 8px', borderRadius: '12px' }}>{o.esfuerzo}</span>
                  </td>
                  <td style={{ padding: '12px', borderBottom: `1px solid ${colores.borde}33` }}>
                    <span style={{ fontSize: '11px', fontWeight: '800', color: colores.exito }}>{o.roi}%</span>
                  </td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>

        {/* Agentes */}
        <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '700', color: colores.textoClaro, margin: '0 0 12px 0' }}>
            <Bot size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />Agentes Analistas de Valor
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '12px' }}>
            {agentes.map(a => (
              <div key={a.nombre} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: colores.fondoTerciario, borderRadius: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Bot size={16} color="white" /></div>
                <div style={{ flex: 1 }}><p style={{ fontSize: '13px', fontWeight: '700', color: colores.textoClaro, margin: 0 }}>{a.nombre}</p><p style={{ fontSize: '10px', color: colores.textoMedio, margin: 0 }}>{a.rol}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
