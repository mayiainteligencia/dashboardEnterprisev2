import React, { useState, useEffect } from 'react';
import { 
  Clock, AlertCircle, CheckCircle, Activity, Sparkles, TrendingUp, TrendingDown, 
  ShieldAlert, Truck, BarChart2, Zap, DollarSign, Calendar, Eye
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line, ComposedChart 
} from 'recharts';
import { brandingConfig } from '../../../config/branding';

const { colores } = brandingConfig;

const tema = {
  acento: '#1E40AF',
  acentoOscuro: '#0F172A',
  acentoSuave: '#DBEAFE',
  sobreAcento: '#FFFFFF',
};

const mockSlaTrend = [
  { time: '08:00', sla: 98, riesgo: 2 },
  { time: '10:00', sla: 96, riesgo: 5 },
  { time: '12:00', sla: 95, riesgo: 8 },
  { time: '14:00', sla: 92, riesgo: 15 },
  { time: '16:00', sla: 94, riesgo: 10 },
  { time: '18:00', sla: 95, riesgo: 7 },
];

const mockCausaRaiz = [
  { name: 'Tráfico', value: 45 },
  { name: 'Retraso Almacén', value: 25 },
  { name: 'Problema Vehículo', value: 15 },
  { name: 'Cliente Ausente', value: 10 },
  { name: 'Errores Ruta', value: 5 },
];

const mockPredicciones = [
  { id: 'ENT-8841', cliente: 'Supermercados del Norte', operador: 'Juan Pérez', riesgo: 95, impacto: '$12,000', tiempoRestante: '15 min' },
  { id: 'ENT-8842', cliente: 'Farmacias Unidas', operador: 'Luis Gómez', riesgo: 82, impacto: '$8,500', tiempoRestante: '25 min' },
  { id: 'ENT-8843', cliente: 'Hospital Central', operador: 'Carlos Ruiz', riesgo: 75, impacto: '$45,000', tiempoRestante: '40 min' },
  { id: 'ENT-8844', cliente: 'Clinica San José', operador: 'Mario Silva', riesgo: 60, impacto: '$5,200', tiempoRestante: '1 hr' },
  { id: 'ENT-8845', cliente: 'Autopartes Express', operador: 'Pedro Luna', riesgo: 45, impacto: '$1,800', tiempoRestante: '1.5 hr' },
  { id: 'ENT-8846', cliente: 'Ferretería El Sol', operador: 'Jorge Díaz', riesgo: 30, impacto: '$900', tiempoRestante: '2 hr' },
];

const useAnimations = () => {
  useEffect(() => {
    const id = 'module-animations';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @keyframes fadeSlideUp {
        from { opacity: 0; transform: translateY(18px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      .animate-fade-up {
        animation: fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        opacity: 0;
      }
      .hover-row:hover {
        background-color: ${colores.fondoSecundario};
      }
    `;
    document.head.appendChild(style);
  }, []);
};

export const FleetSLA: React.FC = () => {
  useAnimations();
  const [activeTab, setActiveTab] = useState('predicciones');

  const cardStyle: React.CSSProperties = {
    background: '#FFFFFF',
    border: `1px solid ${colores.borde}`,
    borderRadius: '18px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
    padding: '24px',
    position: 'relative',
    overflow: 'hidden',
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Header */}
      <div className="animate-fade-up" style={{ ...cardStyle, display: 'flex', alignItems: 'center', gap: '20px', padding: '32px' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: `linear-gradient(to bottom, ${tema.acento}, ${tema.acentoOscuro})` }} />
        <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: `linear-gradient(135deg, ${tema.acento}, ${tema.acentoOscuro})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: tema.sobreAcento }}>
          <Clock size={32} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 700, color: colores.textoClaro }}>Predicción de Incumplimiento SLA</h1>
            <span style={{ background: colores.exito + '20', color: colores.exito, padding: '4px 8px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: colores.exito, animation: 'pulse 2s infinite' }} />
              LIVE
            </span>
          </div>
          <p style={{ margin: 0, color: colores.textoOscuro, fontSize: '16px' }}>Anticipación de fallos en Nivel de Servicio mediante modelos predictivos y mitigación de riesgos.</p>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {[
          { label: 'SLA Global', value: '94.2%', trend: '-0.3%', icon: <Activity size={20} />, color: colores.advertencia },
          { label: 'Predicciones Activas', value: '18', trend: '+4', icon: <Zap size={20} />, color: tema.acento },
          { label: 'Evitados Hoy', value: '42', trend: '+15%', icon: <ShieldAlert size={20} />, color: colores.exito },
          { label: 'Ahorro Estimado', value: '$680K', trend: '+5%', icon: <DollarSign size={20} />, color: tema.acento },
        ].map((kpi, i) => (
          <div key={i} className="animate-fade-up" style={{ ...cardStyle, animationDelay: `${i * 0.05}s` }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: kpi.color }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ color: kpi.color, background: kpi.color + '15', padding: '10px', borderRadius: '12px' }}>
                {kpi.icon}
              </div>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600, color: kpi.trend.startsWith('+') ? colores.exito : colores.peligro }}>
                {kpi.trend.startsWith('+') ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {kpi.trend}
              </span>
            </div>
            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', color: colores.textoOscuro, fontWeight: 600, marginBottom: '4px' }}>
              {kpi.label}
            </div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: colores.textoClaro }}>
              {kpi.value}
            </div>
          </div>
        ))}
      </div>

      {/* AI Insight */}
      <div className="animate-fade-up" style={{ ...cardStyle, animationDelay: '0.2s', background: `linear-gradient(110deg, ${tema.acento}08 0%, transparent 60%)`, border: `1px solid ${tema.acento}30` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ background: tema.acento, color: tema.sobreAcento, padding: '8px', borderRadius: '10px' }}>
            <Sparkles size={20} />
          </div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: colores.textoClaro }}>Insight de MAYIA · IA</h3>
        </div>
        <p style={{ margin: 0, color: colores.textoMedio, lineHeight: 1.6, fontSize: '15px' }}>
          Alta probabilidad de incumplimiento de SLA para la ruta Hospital Central en los próximos 40 minutos debido a un embotellamiento en Av. Principal. Se sugiere contactar a Operaciones para un posible re-ruteo y mitigación de la penalidad de $45,000.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '32px', borderBottom: `1px solid ${colores.borde}`, paddingBottom: '2px', marginTop: '10px' }}>
        {['Predicciones', 'Alertas', 'Causa Raíz', 'Simulador'].map((tab, i) => {
          const tabId = tab.toLowerCase().replace(' ', '-').replace('í', 'i');
          const isActive = activeTab === tabId;
          return (
            <button
              key={i}
              onClick={() => setActiveTab(tabId)}
              style={{
                background: 'none', border: 'none', padding: '0 0 12px 0', fontSize: '15px', fontWeight: 600,
                color: isActive ? tema.acento : colores.textoOscuro,
                borderBottom: `3px solid ${isActive ? tema.acento : 'transparent'}`,
                cursor: 'pointer', transition: 'all 0.2s'
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div style={{ minHeight: '400px' }}>
        {activeTab === 'predicciones' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
            
            <div className="animate-fade-up" style={{ ...cardStyle, padding: 0 }}>
              <div style={{ padding: '24px', borderBottom: `1px solid ${colores.borde}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: colores.textoClaro }}>Riesgos de SLA Inminentes</h3>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead style={{ background: colores.fondoSecundario }}>
                    <tr>
                      <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: colores.textoOscuro, textTransform: 'uppercase' }}>Entrega / Cliente</th>
                      <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: colores.textoOscuro, textTransform: 'uppercase' }}>Operador</th>
                      <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: colores.textoOscuro, textTransform: 'uppercase' }}>Riesgo de Fallo SLA</th>
                      <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: colores.textoOscuro, textTransform: 'uppercase' }}>Tiempo Restante</th>
                      <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: colores.textoOscuro, textTransform: 'uppercase' }}>Impacto Económico</th>
                      <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: colores.textoOscuro, textTransform: 'uppercase', textAlign: 'right' }}>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockPredicciones.map((pred, i) => (
                      <tr key={i} className="hover-row" style={{ borderBottom: `1px solid ${colores.borde}`, transition: 'background 0.2s', cursor: 'pointer' }}>
                        <td style={{ padding: '16px 24px' }}>
                          <div style={{ fontWeight: 600, color: colores.textoClaro }}>{pred.id}</div>
                          <div style={{ fontSize: '12px', color: colores.textoOscuro }}>{pred.cliente}</div>
                        </td>
                        <td style={{ padding: '16px 24px', color: colores.textoMedio }}>{pred.operador}</td>
                        <td style={{ padding: '16px 24px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ flex: 1, height: '8px', background: colores.fondoTerciario, borderRadius: '4px', overflow: 'hidden' }}>
                              <div style={{ 
                                width: `${pred.riesgo}%`, height: '100%', borderRadius: '4px',
                                background: pred.riesgo > 80 ? colores.peligro : pred.riesgo > 50 ? colores.advertencia : colores.exito
                              }} />
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: pred.riesgo > 80 ? colores.peligro : colores.textoMedio, width: '40px' }}>
                              {pred.riesgo}%
                            </span>
                          </div>
                        </td>
                        <td style={{ padding: '16px 24px' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: pred.riesgo > 80 ? colores.peligro : colores.textoMedio, fontWeight: 500, fontSize: '13px' }}>
                            <Clock size={14} />
                            {pred.tiempoRestante}
                          </span>
                        </td>
                        <td style={{ padding: '16px 24px', fontWeight: 600, color: colores.textoClaro }}>
                          {pred.impacto}
                        </td>
                        <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                          <button style={{ background: tema.acento, border: 'none', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: tema.sobreAcento }}>
                            Intervenir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'causa-raiz' && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            <div className="animate-fade-up" style={cardStyle}>
              <h3 style={{ margin: '0 0 24px 0', fontSize: '16px', fontWeight: 600, color: colores.textoClaro }}>Tendencia Histórica de SLA vs Riesgo</h3>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={mockSlaTrend}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colores.borde} />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: colores.textoOscuro, fontSize: 12}} />
                    <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: colores.textoOscuro, fontSize: 12}} domain={[80, 100]} />
                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: colores.textoOscuro, fontSize: 12}} />
                    <Tooltip contentStyle={{borderRadius: '12px', border: `1px solid ${colores.borde}`}} />
                    <Legend />
                    <Line yAxisId="left" type="monotone" name="Nivel SLA (%)" dataKey="sla" stroke={colores.exito} strokeWidth={3} dot={{r: 4, fill: colores.exito}} />
                    <Bar yAxisId="right" name="Riesgo Detectado" dataKey="riesgo" fill={colores.peligro} opacity={0.6} radius={[4, 4, 0, 0]} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="animate-fade-up" style={cardStyle}>
              <h3 style={{ margin: '0 0 24px 0', fontSize: '16px', fontWeight: 600, color: colores.textoClaro }}>Causas Raíz de Fallos</h3>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockCausaRaiz} layout="vertical" margin={{ left: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={colores.borde} />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: colores.textoOscuro, fontSize: 12}} />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: colores.textoClaro, fontSize: 12, fontWeight: 500}} />
                    <Tooltip cursor={{fill: colores.fondoTerciario}} contentStyle={{borderRadius: '12px', border: `1px solid ${colores.borde}`}} />
                    <Bar dataKey="value" fill={tema.acento} radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
