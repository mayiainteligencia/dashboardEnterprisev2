import React, { useState, useEffect } from 'react';
import { Sparkles, DollarSign, PieChart as PieChartIcon, Calendar, ArrowRightLeft, TrendingDown } from 'lucide-react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
    const id = 'module-animations-presupuesto';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
    `;
    document.head.appendChild(style);
  }, []);
};

const initialBudgets = [
  { id: 'TI', name: 'Tecnología', alloc: 35, color: '#3B82F6' },
  { id: 'OP', name: 'Operaciones', alloc: 40, color: '#10B981' },
  { id: 'MT', name: 'Mantenimiento', alloc: 15, color: '#F59E0B' },
  { id: 'MK', name: 'Marketing', alloc: 10, color: '#8B5CF6' },
];

const totalBudget = 5000000;

const burnRateData = [
  { mes: 'Ene', proyectado: 400000, real: 420000 },
  { mes: 'Feb', proyectado: 400000, real: 390000 },
  { mes: 'Mar', proyectado: 400000, real: 450000 },
  { mes: 'Abr', proyectado: 420000, real: 410000 },
  { mes: 'May', proyectado: 420000, real: 480000 },
  { mes: 'Jun', proyectado: 450000, real: null }, // future
  { mes: 'Jul', proyectado: 450000, real: null },
];

export const Presupuesto: React.FC = () => {
  useAnimations();
  const [budgets, setBudgets] = useState(initialBudgets);

  const handleSliderChange = (id: string, newValue: number) => {
    const oldVal = budgets.find(b => b.id === id)?.alloc || 0;
    const diff = newValue - oldVal;
    
    // Simple logic to adjust other budgets proportionally to maintain 100% total
    let others = budgets.filter(b => b.id !== id);
    const othersTotal = others.reduce((acc, b) => acc + b.alloc, 0);
    
    if (othersTotal === 0) return; // Prevent divide by zero if one takes 100%
    
    const newBudgets = budgets.map(b => {
      if (b.id === id) return { ...b, alloc: newValue };
      const proportion = b.alloc / othersTotal;
      let adjusted = Math.max(0, b.alloc - (diff * proportion));
      return { ...b, alloc: adjusted };
    });
    
    // Normalize to exactly 100
    const sum = newBudgets.reduce((acc, b) => acc + b.alloc, 0);
    const normalized = newBudgets.map(b => ({ ...b, alloc: (b.alloc / sum) * 100 }));
    
    setBudgets(normalized);
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
          <DollarSign size={32} color={tema.acento} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: colores.textoClaro }}>Asignación de Presupuesto</h1>
          </div>
          <p style={{ margin: 0, color: colores.textoMedio, fontSize: 14 }}>
            Reasignación dinámica y análisis de ritmo de gasto (Burn Rate).
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* REALLOCATION TREE */}
        <div style={{ background: colores.fondoPrincipal, borderRadius: 22, border: `1px solid ${colores.borde}`, padding: 24, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: colores.textoClaro }}>Distribución Interactiva</h3>
            <div style={{ background: colores.fondoSecundario, padding: '6px 12px', borderRadius: 8, fontSize: 14, fontWeight: 700, color: tema.acentoOscuro }}>
              Total: ${(totalBudget).toLocaleString()} MXN
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: 1 }}>
            {budgets.map(dept => (
              <div key={dept.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: dept.color }} />
                    <span style={{ fontSize: 14, fontWeight: 600, color: colores.textoClaro }}>{dept.name}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: colores.textoClaro }}>
                      ${(totalBudget * (dept.alloc / 100)).toLocaleString(undefined, {maximumFractionDigits: 0})}
                    </div>
                    <div style={{ fontSize: 12, color: colores.textoMedio }}>{dept.alloc.toFixed(1)}%</div>
                  </div>
                </div>
                <input 
                  type="range" min="0" max="100" step="1" 
                  value={dept.alloc} onChange={(e) => handleSliderChange(dept.id, parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: dept.color, cursor: 'pointer' }} 
                />
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24, background: '#F8FAFC', padding: 16, borderRadius: 12, display: 'flex', gap: 12, border: '1px solid #E2E8F0' }}>
            <ArrowRightLeft size={20} color={colores.textoMedio} style={{ flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: colores.textoMedio, lineHeight: 1.5 }}>
              Desliza para reasignar fondos. Los demás centros de costos se ajustarán proporcionalmente para mantener el 100%.
            </span>
          </div>
        </div>

        {/* BURN RATE CHART & INSIGHT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* AI INSIGHT */}
          <div style={{ 
            background: `linear-gradient(110deg, ${tema.acento}08 0%, transparent 60%), ${colores.fondoPrincipal}`,
            border: `1px solid ${tema.acentoSuave}`,
            borderRadius: 22, padding: 24, boxShadow: colores.sombra,
            display: 'flex', gap: 16, alignItems: 'flex-start'
          }}>
            <div style={{ background: '#FEF2F2', padding: 12, borderRadius: 16 }}>
              <Sparkles size={24} color={tema.acento} />
            </div>
            <div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: 16, fontWeight: 600, color: colores.textoClaro }}>Alerta de Burn Rate</h3>
              <p style={{ margin: '0 0 12px 0', color: colores.textoMedio, fontSize: 14, lineHeight: 1.5 }}>
                El departamento de <strong>Tecnología</strong> está consumiendo presupuesto 15% más rápido de lo proyectado. Se estima agotamiento de fondos en el mes de Octubre.
              </p>
              <button style={{ 
                background: 'transparent', color: tema.acento, 
                border: `1px solid ${tema.acento}`, borderRadius: 8, padding: '8px 16px', 
                fontWeight: 600, fontSize: 13, cursor: 'pointer'
              }}>
                Ver Sugerencias de Optimización
              </button>
            </div>
          </div>

          {/* COMPOSED CHART */}
          <div style={{ background: colores.fondoPrincipal, borderRadius: 22, border: `1px solid ${colores.borde}`, padding: 24, flex: 1 }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: 16, fontWeight: 600, color: colores.textoClaro }}>Ritmo de Gasto Mensual</h3>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={burnRateData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colores.borde} />
                  <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{fill: colores.textoMedio, fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: colores.textoMedio, fontSize: 12}} tickFormatter={(v) => `${v/1000}k`} />
                  <Tooltip 
                    formatter={(value?: number) => `$${(value ?? 0).toLocaleString()}`}
                    contentStyle={{ borderRadius: 12, border: `1px solid ${colores.borde}` }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="proyectado" name="Presupuesto Base" fill={colores.fondoSecundario} radius={[4, 4, 0, 0]} barSize={30} />
                  <Line type="monotone" dataKey="real" name="Gasto Real" stroke={tema.acento} strokeWidth={3} dot={{r: 4, fill: tema.acento}} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
