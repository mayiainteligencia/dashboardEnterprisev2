import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import { 
  Calculator, Sparkles, TrendingDown, Check, 
  ShoppingCart, Award, ArrowRight, Activity, Percent
} from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

const { colores } = brandingConfig;

const tema = {
  acento: '#DC2626',
  acentoOscuro: '#991B1B',
  acentoSuave: '#FEE2E2',
  sobreAcento: '#FFFFFF',
};

const mockChartData = [
  { name: 'Prov A', costo: 125000 },
  { name: 'Prov B', costo: 118000 },
  { name: 'Prov C', costo: 132000 },
];

const useAnimations = () => {
  useEffect(() => {
    const id = 'cot-animations';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes highlightPulse { 0%, 100% { background-color: #D1FAE5; } 50% { background-color: #A7F3D0; } }
    `;
    document.head.appendChild(style);
  }, []);
};

export const Cotizaciones: React.FC = () => {
  useAnimations();
  const [descuentoIA, setDescuentoIA] = useState(0);

  const basePrecios = [125000, 118000, 132000];
  const preciosSimulados = basePrecios.map(p => p * (1 - descuentoIA / 100));
  
  // Winning logic per row
  const rowWinners = {
    precio: 1, // Prov B has lowest
    entrega: 0, // Prov A has fastest (5 dias vs 8 vs 12)
    garantia: 2, // Prov C has longest (2 años vs 1 vs 1)
    score: 1, // Prov B has highest (94 vs 88 vs 82)
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeSlideUp 0.5s ease-out' }}>
      
      {/* Header */}
      <div style={{ background: colores.fondoPrincipal, borderRadius: '20px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: `1px solid ${colores.borde}`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: `linear-gradient(to bottom, ${tema.acento}, ${tema.acentoOscuro})` }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: `linear-gradient(135deg, ${tema.acentoSuave}, ${colores.fondoPrincipal})`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${colores.borde}` }}>
            <Calculator size={32} color={tema.acento} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <h1 style={{ margin: 0, fontSize: '24px', color: colores.textoClaro, fontWeight: 700 }}>Matriz de Cotizaciones</h1>
              <span style={{ padding: '4px 10px', background: tema.acentoSuave, color: tema.acentoOscuro, borderRadius: '12px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Sparkles size={12} /> Bidding IA
              </span>
            </div>
            <p style={{ margin: '4px 0 0', color: colores.textoMedio, fontSize: '14px' }}>Comparación bidimensional y simulación de escenarios de negociación.</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        {/* Simulador de Negociación IA */}
        <div style={{ background: `linear-gradient(135deg, ${colores.fondoPrincipal} 0%, #FAFAFA 100%)`, borderRadius: '20px', padding: '24px', border: `1px solid ${colores.borde}`, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <TrendingDown size={24} color={tema.acento} />
            <h2 style={{ margin: 0, fontSize: '18px', color: colores.textoClaro }}>Simulador de Negociación IA</h2>
          </div>
          <p style={{ margin: 0, fontSize: '14px', color: colores.textoMedio }}>Ajusta el objetivo de descuento basado en el análisis histórico de la IA para visualizar el impacto en las ofertas actuales.</p>
          
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
            {[0, 3, 5, 10].map(pct => (
              <button 
                key={pct}
                onClick={() => setDescuentoIA(pct)}
                style={{ flex: 1, padding: '12px', borderRadius: '12px', border: `2px solid ${descuentoIA === pct ? tema.acento : colores.borde}`, background: descuentoIA === pct ? tema.acentoSuave : '#FFFFFF', color: descuentoIA === pct ? tema.acentoOscuro : colores.textoMedio, fontWeight: 600, fontSize: '16px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
              >
                {pct === 0 ? 'Sin Ajuste' : `-${pct}%`}
              </button>
            ))}
          </div>

          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '16px', border: `1px solid ${colores.borde}`, marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ margin: 0, fontSize: '12px', color: colores.textoOscuro, fontWeight: 600 }}>AHORRO ESTIMADO (PROV B)</p>
              <p style={{ margin: '4px 0 0', fontSize: '24px', color: colores.exito, fontWeight: 700 }}>
                +${(basePrecios[1] * (descuentoIA / 100)).toLocaleString('es-MX')} MXN
              </p>
            </div>
            <button style={{ padding: '12px 24px', borderRadius: '12px', border: 'none', background: tema.acento, color: '#FFFFFF', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(220, 38, 38, 0.2)' }}>
              <ShoppingCart size={18} />
              Generar OC Directa
            </button>
          </div>
        </div>

        {/* Chart */}
        <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '24px', border: `1px solid ${colores.borde}` }}>
          <h3 style={{ margin: '0 0 20px', fontSize: '16px', color: colores.textoClaro }}>Comparativa de Costos</h3>
          <div style={{ height: '200px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockChartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colores.borde} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: colores.textoMedio }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: colores.textoMedio }} />
                <RechartsTooltip cursor={{ fill: colores.fondoTerciario }} contentStyle={{ borderRadius: '12px', border: `1px solid ${colores.borde}` }} />
                <Bar dataKey="costo" radius={[6, 6, 0, 0]}>
                  {mockChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 1 ? tema.acento : colores.borde} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Matrix Table */}
      <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '24px', border: `1px solid ${colores.borde}`, overflowX: 'auto' }}>
        <h3 style={{ margin: '0 0 20px', fontSize: '18px', color: colores.textoClaro }}>Matriz Comparativa de Bidding (REQ-1045)</h3>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
          <thead>
            <tr>
              <th style={{ padding: '16px', textAlign: 'left', borderBottom: `2px solid ${colores.borde}`, color: colores.textoOscuro, fontSize: '13px' }}>CRITERIO</th>
              <th style={{ padding: '16px', borderBottom: `2px solid ${colores.borde}`, color: colores.textoClaro, fontSize: '14px', width: '25%' }}>Proveedor A<br/><span style={{ fontSize: '12px', color: colores.textoMedio, fontWeight: 400 }}>TechSolutions</span></th>
              <th style={{ padding: '16px', borderBottom: `2px solid ${tema.acento}`, color: tema.acentoOscuro, fontSize: '14px', width: '25%', background: tema.acentoSuave, borderRadius: '8px 8px 0 0' }}>Proveedor B (Recomendado)<br/><span style={{ fontSize: '12px', color: tema.acento, fontWeight: 400 }}>ClimaMax</span></th>
              <th style={{ padding: '16px', borderBottom: `2px solid ${colores.borde}`, color: colores.textoClaro, fontSize: '14px', width: '25%' }}>Proveedor C<br/><span style={{ fontSize: '12px', color: colores.textoMedio, fontWeight: 400 }}>Global Services</span></th>
            </tr>
          </thead>
          <tbody>
            {/* Precio */}
            <tr>
              <td style={{ padding: '16px', textAlign: 'left', borderBottom: `1px solid ${colores.fondoTerciario}`, fontWeight: 600, color: colores.textoMedio, fontSize: '14px' }}>Precio Total Estimado</td>
              <td style={{ padding: '16px', borderBottom: `1px solid ${colores.fondoTerciario}`, fontSize: '15px' }}>${preciosSimulados[0].toLocaleString('es-MX')}</td>
              <td style={{ padding: '16px', borderBottom: `1px solid ${colores.fondoTerciario}`, fontSize: '15px', fontWeight: 700, animation: rowWinners.precio === 1 ? 'highlightPulse 2s infinite' : 'none', background: rowWinners.precio === 1 ? '#D1FAE5' : 'transparent', color: rowWinners.precio === 1 ? '#047857' : colores.textoClaro }}>${preciosSimulados[1].toLocaleString('es-MX')}</td>
              <td style={{ padding: '16px', borderBottom: `1px solid ${colores.fondoTerciario}`, fontSize: '15px' }}>${preciosSimulados[2].toLocaleString('es-MX')}</td>
            </tr>
            {/* Tiempo Entrega */}
            <tr>
              <td style={{ padding: '16px', textAlign: 'left', borderBottom: `1px solid ${colores.fondoTerciario}`, fontWeight: 600, color: colores.textoMedio, fontSize: '14px' }}>Tiempo de Entrega</td>
              <td style={{ padding: '16px', borderBottom: `1px solid ${colores.fondoTerciario}`, fontSize: '15px', fontWeight: 700, animation: rowWinners.entrega === 0 ? 'highlightPulse 2s infinite' : 'none', background: rowWinners.entrega === 0 ? '#D1FAE5' : 'transparent', color: rowWinners.entrega === 0 ? '#047857' : colores.textoClaro }}>5 días</td>
              <td style={{ padding: '16px', borderBottom: `1px solid ${colores.fondoTerciario}`, fontSize: '15px' }}>8 días</td>
              <td style={{ padding: '16px', borderBottom: `1px solid ${colores.fondoTerciario}`, fontSize: '15px' }}>12 días</td>
            </tr>
            {/* Garantía */}
            <tr>
              <td style={{ padding: '16px', textAlign: 'left', borderBottom: `1px solid ${colores.fondoTerciario}`, fontWeight: 600, color: colores.textoMedio, fontSize: '14px' }}>Garantía</td>
              <td style={{ padding: '16px', borderBottom: `1px solid ${colores.fondoTerciario}`, fontSize: '15px' }}>1 año</td>
              <td style={{ padding: '16px', borderBottom: `1px solid ${colores.fondoTerciario}`, fontSize: '15px' }}>1 año</td>
              <td style={{ padding: '16px', borderBottom: `1px solid ${colores.fondoTerciario}`, fontSize: '15px', fontWeight: 700, animation: rowWinners.garantia === 2 ? 'highlightPulse 2s infinite' : 'none', background: rowWinners.garantia === 2 ? '#D1FAE5' : 'transparent', color: rowWinners.garantia === 2 ? '#047857' : colores.textoClaro }}>2 años</td>
            </tr>
            {/* Términos */}
            <tr>
              <td style={{ padding: '16px', textAlign: 'left', borderBottom: `1px solid ${colores.fondoTerciario}`, fontWeight: 600, color: colores.textoMedio, fontSize: '14px' }}>Términos de Pago</td>
              <td style={{ padding: '16px', borderBottom: `1px solid ${colores.fondoTerciario}`, fontSize: '15px' }}>Net 30</td>
              <td style={{ padding: '16px', borderBottom: `1px solid ${colores.fondoTerciario}`, fontSize: '15px' }}>Net 60</td>
              <td style={{ padding: '16px', borderBottom: `1px solid ${colores.fondoTerciario}`, fontSize: '15px' }}>Net 30</td>
            </tr>
            {/* Score IA */}
            <tr>
              <td style={{ padding: '16px', textAlign: 'left', borderBottom: `1px solid ${colores.fondoTerciario}`, fontWeight: 600, color: colores.textoMedio, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}><Sparkles size={16} color={tema.acento} /> Score de Match IA</td>
              <td style={{ padding: '16px', borderBottom: `1px solid ${colores.fondoTerciario}`, fontSize: '16px' }}>88 / 100</td>
              <td style={{ padding: '16px', borderBottom: `1px solid ${colores.fondoTerciario}`, fontSize: '16px', fontWeight: 700, animation: rowWinners.score === 1 ? 'highlightPulse 2s infinite' : 'none', background: rowWinners.score === 1 ? '#D1FAE5' : 'transparent', color: rowWinners.score === 1 ? '#047857' : colores.textoClaro }}>94 / 100</td>
              <td style={{ padding: '16px', borderBottom: `1px solid ${colores.fondoTerciario}`, fontSize: '16px' }}>82 / 100</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};
