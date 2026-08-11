import React, { useState, useEffect } from 'react';
import { Sparkles, Package, AlertTriangle, TrendingUp, RefreshCcw, Box, ArrowRight, Zap } from 'lucide-react';
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
    const id = 'module-animations-inventario';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    `;
    document.head.appendChild(style);
  }, []);
};

const histData = [
  { mes: 'Ene', stock: 12000, demand: 8500 },
  { mes: 'Feb', stock: 11500, demand: 9000 },
  { mes: 'Mar', stock: 10800, demand: 9500 },
  { mes: 'Abr', stock: 10000, demand: 9200 },
  { mes: 'May', stock: 10500, demand: 8800 },
  { mes: 'Jun', stock: 9000, demand: 10200 },
];

const categoryData = [
  { name: 'Electrónica', value: 4000 },
  { name: 'Mecánica', value: 3000 },
  { name: 'Consumibles', value: 2000 },
  { name: 'Seguridad', value: 1000 },
];

const PIE_COLORS = [tema.acentoOscuro, tema.acento, '#FCA5A5', '#F87171'];

const initialRacks = [
  { id: 'A1', name: 'Rack A1 - Sensores', stock: 85, threshold: 20 },
  { id: 'A2', name: 'Rack A2 - Motores', stock: 15, threshold: 25 },
  { id: 'A3', name: 'Rack A3 - Filtros', stock: 45, threshold: 30 },
  { id: 'A4', name: 'Rack A4 - Válvulas', stock: 95, threshold: 20 },
  { id: 'B1', name: 'Rack B1 - EPI', stock: 12, threshold: 50 },
  { id: 'B2', name: 'Rack B2 - Herramientas', stock: 60, threshold: 20 },
  { id: 'B3', name: 'Rack B3 - Cableado', stock: 35, threshold: 40 },
  { id: 'B4', name: 'Rack B4 - Lubricantes', stock: 8, threshold: 20 },
];

export const Inventario: React.FC = () => {
  useAnimations();
  const [demandSurge, setDemandSurge] = useState(0);
  const [selectedRack, setSelectedRack] = useState<string | null>(null);
  const [reabasteciendo, setReabasteciendo] = useState<string | null>(null);

  const activeRackInfo = initialRacks.find(r => r.id === selectedRack);

  const getRackStatusColor = (stock: number, threshold: number) => {
    const adjustedStock = Math.max(0, stock - (stock * demandSurge / 100));
    if (adjustedStock > threshold * 1.5) return colores.exito;
    if (adjustedStock > threshold) return colores.advertencia;
    return colores.peligro;
  };

  const handleReabastecer = (rackId: string) => {
    setReabasteciendo(rackId);
    setTimeout(() => {
      setReabasteciendo(null);
    }, 1500);
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
          <Package size={32} color={tema.acento} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: colores.textoClaro }}>Control de Inventario Avanzado</h1>
            <span style={{ 
              background: '#FEE2E2', color: '#DC2626', 
              padding: '4px 8px', borderRadius: 12, 
              fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#DC2626', animation: 'pulse 2s infinite' }} />
              LIVE
            </span>
          </div>
          <p style={{ margin: 0, color: colores.textoMedio, fontSize: 14 }}>
            Monitoreo en tiempo real con simulación Monte Carlo y gemelo digital de almacén.
          </p>
        </div>
      </div>

      {/* KPI GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {[
          { label: 'STOCK TOTAL', val: '10,000', icon: Box, color: colores.textoClaro },
          { label: 'ROTACIÓN', val: '8.4 Días', icon: RefreshCcw, color: colores.textoClaro },
          { label: 'RACKS CRÍTICOS', val: '3', icon: AlertTriangle, color: colores.peligro },
          { label: 'VALOR INVENTARIO', val: '$4.2M', icon: TrendingUp, color: colores.exito },
        ].map((k, i) => (
          <div key={i} style={{ 
            background: colores.fondoPrincipal, borderRadius: 18, padding: 20, 
            border: `1px solid ${colores.borde}`, boxShadow: colores.sombra,
            position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: k.color === colores.peligro ? colores.peligro : tema.acento }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: colores.textoOscuro, marginBottom: 8, letterSpacing: 0.5 }}>{k.label}</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: k.color }}>{k.val}</div>
              </div>
              <div style={{ background: colores.fondoSecundario, padding: 8, borderRadius: 10 }}>
                <k.icon size={20} color={k.color === colores.textoClaro ? tema.acento : k.color} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI INSIGHT */}
      <div style={{ 
        background: `linear-gradient(110deg, ${tema.acento}08 0%, transparent 60%), ${colores.fondoPrincipal}`,
        border: `1px solid ${tema.acentoSuave}`,
        borderRadius: 22, padding: 24, boxShadow: colores.sombra,
        display: 'flex', gap: 20, alignItems: 'center'
      }}>
        <div style={{ background: '#FEF2F2', padding: 12, borderRadius: 16 }}>
          <Sparkles size={24} color={tema.acento} />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: 16, fontWeight: 600, color: colores.textoClaro }}>Insight de MAYIA · IA</h3>
          <p style={{ margin: 0, color: colores.textoMedio, fontSize: 14, lineHeight: 1.5 }}>
            La demanda de consumibles ha aumentado un 15% esta semana. Si la tendencia continúa, el Rack B4 (Lubricantes) se quedará sin stock en 4 días. Se recomienda ejecutar un reabastecimiento anticipado.
          </p>
        </div>
        <button style={{ 
          background: tema.acento, color: tema.sobreAcento, 
          border: 'none', borderRadius: 12, padding: '12px 20px', 
          fontWeight: 600, fontSize: 14, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 8,
          boxShadow: '0 4px 12px rgba(220, 38, 38, 0.2)'
        }}>
          <Zap size={18} />
          Auto-Reabastecer
        </button>
      </div>

      {/* MAP & SIMULATOR */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 20 }}>
        {/* WAREHOUSE MAP */}
        <div style={{ background: colores.fondoPrincipal, borderRadius: 22, border: `1px solid ${colores.borde}`, padding: 24 }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: 16, fontWeight: 600, color: colores.textoClaro }}>Plano de Almacén (Nave Sur)</h3>
          <div style={{ 
            background: colores.fondoSecundario, borderRadius: 16, padding: 30, 
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, border: `1px solid ${colores.borde}`
          }}>
            {/* Pasillo A */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: colores.textoOscuro, marginBottom: 12, textAlign: 'center' }}>PASILLO A</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {initialRacks.filter(r => r.id.startsWith('A')).map(rack => (
                  <div 
                    key={rack.id} 
                    onClick={() => setSelectedRack(rack.id)}
                    style={{ 
                      height: 80, borderRadius: 8, border: `2px solid ${selectedRack === rack.id ? colores.textoClaro : getRackStatusColor(rack.stock, rack.threshold)}`,
                      background: selectedRack === rack.id ? colores.fondoPrincipal : getRackStatusColor(rack.stock, rack.threshold) + '20',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.2s', fontWeight: 600, fontSize: 14, color: colores.textoClaro
                    }}
                  >
                    {rack.id}
                  </div>
                ))}
              </div>
            </div>
            {/* Pasillo B */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: colores.textoOscuro, marginBottom: 12, textAlign: 'center' }}>PASILLO B</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {initialRacks.filter(r => r.id.startsWith('B')).map(rack => (
                  <div 
                    key={rack.id} 
                    onClick={() => setSelectedRack(rack.id)}
                    style={{ 
                      height: 80, borderRadius: 8, border: `2px solid ${selectedRack === rack.id ? colores.textoClaro : getRackStatusColor(rack.stock, rack.threshold)}`,
                      background: selectedRack === rack.id ? colores.fondoPrincipal : getRackStatusColor(rack.stock, rack.threshold) + '20',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.2s', fontWeight: 600, fontSize: 14, color: colores.textoClaro
                    }}
                  >
                    {rack.id}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SIDE PANEL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* SIMULATOR */}
          <div style={{ background: colores.fondoPrincipal, borderRadius: 22, border: `1px solid ${colores.borde}`, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: colores.textoClaro }}>Simulador Monte Carlo</h3>
              <span style={{ fontSize: 14, fontWeight: 600, color: tema.acento }}>+{demandSurge}% Demanda</span>
            </div>
            <p style={{ fontSize: 13, color: colores.textoMedio, marginBottom: 20 }}>
              Ajusta el incremento de demanda para simular el impacto en los niveles de inventario.
            </p>
            <input 
              type="range" min="0" max="50" step="5" 
              value={demandSurge} onChange={(e) => setDemandSurge(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: tema.acento, cursor: 'pointer' }} 
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12, color: colores.textoOscuro }}>
              <span>0% (Base)</span>
              <span>+50% (Pico)</span>
            </div>
          </div>

          {/* RACK DETAIL */}
          <div style={{ background: colores.fondoPrincipal, borderRadius: 22, border: `1px solid ${colores.borde}`, padding: 24, flex: 1 }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: 16, fontWeight: 600, color: colores.textoClaro }}>Detalle de Rack</h3>
            {activeRackInfo ? (
              <div style={{ animation: 'fadeSlideUp 0.3s ease-out' }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: colores.textoClaro, marginBottom: 8 }}>{activeRackInfo.name}</div>
                
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 }}>
                    <span style={{ color: colores.textoMedio }}>Stock Actual</span>
                    <span style={{ fontWeight: 600, color: getRackStatusColor(activeRackInfo.stock, activeRackInfo.threshold) }}>
                      {Math.max(0, Math.round(activeRackInfo.stock - (activeRackInfo.stock * demandSurge / 100)))} / 100
                    </span>
                  </div>
                  <div style={{ width: '100%', height: 8, background: colores.fondoSecundario, borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ 
                      width: `${Math.max(0, activeRackInfo.stock - (activeRackInfo.stock * demandSurge / 100))}%`, 
                      height: '100%', 
                      background: getRackStatusColor(activeRackInfo.stock, activeRackInfo.threshold),
                      transition: 'all 0.3s'
                    }} />
                  </div>
                </div>

                <div style={{ background: colores.fondoSecundario, padding: 12, borderRadius: 12, marginBottom: 20 }}>
                  <div style={{ fontSize: 13, color: colores.textoMedio, marginBottom: 4 }}>Fecha estimada de agotamiento</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: colores.textoClaro }}>
                    {demandSurge > 30 && activeRackInfo.stock < 30 ? 'En 2 días (Crítico)' : 'En 14 días'}
                  </div>
                </div>

                <button 
                  onClick={() => handleReabastecer(activeRackInfo.id)}
                  disabled={reabasteciendo === activeRackInfo.id}
                  style={{ 
                    width: '100%', background: reabasteciendo === activeRackInfo.id ? colores.fondoSecundario : tema.acento, 
                    color: reabasteciendo === activeRackInfo.id ? colores.textoMedio : tema.sobreAcento, 
                    border: 'none', borderRadius: 12, padding: '12px 0', 
                    fontWeight: 600, fontSize: 14, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    transition: 'all 0.2s'
                  }}
                >
                  {reabasteciendo === activeRackInfo.id ? (
                    <RefreshCcw size={18} style={{ animation: 'spin-slow 1s linear infinite' }} />
                  ) : (
                    <Zap size={18} />
                  )}
                  {reabasteciendo === activeRackInfo.id ? 'Procesando...' : 'Reabastecer con 1-Click IA'}
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 180, color: colores.textoOscuro }}>
                <Box size={32} style={{ marginBottom: 12, opacity: 0.5 }} />
                <span style={{ fontSize: 14 }}>Selecciona un rack en el plano</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CHARTS */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        <div style={{ background: colores.fondoPrincipal, borderRadius: 22, border: `1px solid ${colores.borde}`, padding: 24 }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: 16, fontWeight: 600, color: colores.textoClaro }}>Tendencia de Stock vs Demanda</h3>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={histData}>
                <defs>
                  <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={tema.acento} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={tema.acento} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colores.borde} />
                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{fill: colores.textoMedio, fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: colores.textoMedio, fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: 12, border: `1px solid ${colores.borde}`, boxShadow: colores.sombra }}
                  itemStyle={{ fontSize: 14, fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="stock" stroke={tema.acento} strokeWidth={3} fillOpacity={1} fill="url(#colorStock)" name="Nivel de Stock" />
                <Area type="monotone" dataKey="demand" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorDemand)" name="Demanda" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ background: colores.fondoPrincipal, borderRadius: 22, border: `1px solid ${colores.borde}`, padding: 24 }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: 16, fontWeight: 600, color: colores.textoClaro }}>Distribución por Categoría</h3>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: 12, border: `1px solid ${colores.borde}`, boxShadow: colores.sombra }}
                  itemStyle={{ fontSize: 14, fontWeight: 600 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
