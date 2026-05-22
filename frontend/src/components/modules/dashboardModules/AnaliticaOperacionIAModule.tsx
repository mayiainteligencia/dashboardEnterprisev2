import React, { useEffect, useState } from 'react';
import { Cpu, Zap, Activity, AlertTriangle, CheckCircle, ArrowRight, Clock } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';

const kpisIA = [
  { label: 'Predicciones generadas', valor: '284K', sub: 'Ultimas 24h', color: '#8B5CF6', icono: <Zap size={16} /> },
  { label: 'Precision promedio', valor: '94.2%', sub: '+1.8% vs semana anterior', color: '#10B981', icono: <CheckCircle size={16} /> },
  { label: 'Latencia promedio', valor: '142ms', sub: 'Tiempo de respuesta', color: '#3B82F6', icono: <Clock size={16} /> },
  { label: 'Alertas activas', valor: '18', sub: '3 criticas · 15 normales', color: '#F59E0B', icono: <AlertTriangle size={16} /> },
];

const performanceData = [
  { dia: 'L', demanda: 94.1, epidemia: 91.8, segmentacion: 96.2 },
  { dia: 'M', demanda: 93.5, epidemia: 92.4, segmentacion: 95.8 },
  { dia: 'X', demanda: 94.8, epidemia: 90.9, segmentacion: 96.5 },
  { dia: 'J', demanda: 93.2, epidemia: 93.1, segmentacion: 96.1 },
  { dia: 'V', demanda: 95.1, epidemia: 92.7, segmentacion: 97.0 },
  { dia: 'S', demanda: 94.7, epidemia: 91.5, segmentacion: 96.8 },
  { dia: 'D', demanda: 94.2, epidemia: 92.1, segmentacion: 97.3 },
];

type EstadoModelo = 'activo' | 'mantenimiento';

const estadoModeloCfg: Record<EstadoModelo, { color: string; bg: string; label: string }> = {
  activo:        { color: '#10B981', bg: '#10B98115', label: 'Activo'        },
  mantenimiento: { color: '#F59E0B', bg: '#F59E0B15', label: 'Mantenimiento' },
};

const modelos: { nombre: string; tipo: string; version: string; precision: number; peticiones: number; estado: EstadoModelo }[] = [
  { nombre: 'Prediccion de Demanda',       tipo: 'Forecasting',  version: 'v3.2', precision: 94.2, peticiones: 48200, estado: 'activo'        },
  { nombre: 'Vigilancia Epidemiologica',   tipo: 'Deteccion',    version: 'v2.8', precision: 92.1, peticiones: 12400, estado: 'activo'        },
  { nombre: 'Segmentacion de Pacientes',   tipo: 'Clustering',   version: 'v4.0', precision: 97.3, peticiones:  8900, estado: 'activo'        },
  { nombre: 'Optimizacion de Stock',       tipo: 'Optimizacion', version: 'v2.5', precision: 91.8, peticiones: 31600, estado: 'activo'        },
  { nombre: 'Deteccion de Anomalias',      tipo: 'Monitoreo',    version: 'v1.9', precision: 88.4, peticiones:  5200, estado: 'mantenimiento' },
];

interface AnaliticaOperacionIAModuleProps {
  onNavigate?: (section: string) => void;
}

export const AnaliticaOperacionIAModule: React.FC<AnaliticaOperacionIAModuleProps> = ({ onNavigate }) => {
  const { colores } = brandingConfig;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '24px', border: `1px solid ${colores.borde}`, padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Cpu size={18} color="#fff" />
          </div>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: colores.textoClaro, margin: 0 }}>Analitica de Operacion IA</h3>
            <p style={{ fontSize: '10px', color: colores.textoMedio, margin: 0 }}>
              Monitoreo de modelos en produccion · <span style={{ color: '#8B5CF6', fontWeight: 600 }}>5 modelos activos</span>
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', backgroundColor: '#10B98115', borderRadius: '20px', border: '1px solid #10B98130' }}>
          <Activity size={11} color="#10B981" />
          <span style={{ fontSize: '10px', fontWeight: '700', color: '#10B981' }}>Sistemas en linea</span>
        </div>
      </div>

      {/* Top KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '12px' }}>
        {kpisIA.map((k, i) => (
          <div key={i} style={{ backgroundColor: colores.fondoTerciario, borderRadius: '14px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: `${k.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: k.color }}>
              {k.icono}
            </div>
            <div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: colores.textoClaro, lineHeight: 1 }}>{k.valor}</div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: colores.textoClaro, marginTop: '2px' }}>{k.label}</div>
              <div style={{ fontSize: '9px', color: colores.textoMedio, marginTop: '1px' }}>{k.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Table */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.3fr', gap: '16px' }}>

        {/* Line chart */}
        <div style={{ backgroundColor: colores.fondoTerciario, borderRadius: '14px', padding: '14px 16px' }}>
          <p style={{ fontSize: '11px', fontWeight: '700', color: colores.textoClaro, margin: '0 0 2px 0' }}>Precision de modelos — ultimos 7 dias</p>
          <p style={{ fontSize: '9px', color: colores.textoMedio, margin: '0 0 12px 0' }}>Porcentaje de acierto por modelo</p>
          <div style={{ height: '160px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={`${colores.borde}80`} />
                <XAxis dataKey="dia" tick={{ fontSize: 10, fill: colores.textoOscuro }} axisLine={false} tickLine={false} />
                <YAxis domain={[88, 98]} tick={{ fontSize: 10, fill: colores.textoOscuro }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: colores.fondoSecundario, border: `1px solid ${colores.borde}`, borderRadius: '8px', fontSize: '11px', color: colores.textoClaro }}
                  formatter={(val: number | string | undefined) => val != null ? [`${val}%`] : ['']}
                />
                <Line type="monotone" dataKey="demanda"      stroke="#8B5CF6" strokeWidth={2} dot={false} name="Demanda"      />
                <Line type="monotone" dataKey="epidemia"     stroke="#F27405" strokeWidth={2} dot={false} name="Epidemia"     />
                <Line type="monotone" dataKey="segmentacion" stroke="#10B981" strokeWidth={2} dot={false} name="Segmentacion" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '8px', flexWrap: 'wrap' }}>
            {[
              { color: '#8B5CF6', label: 'Demanda'      },
              { color: '#F27405', label: 'Epidemia'     },
              { color: '#10B981', label: 'Segmentacion' },
            ].map(l => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '20px', height: '3px', backgroundColor: l.color, borderRadius: '2px' }} />
                <span style={{ fontSize: '9px', color: colores.textoMedio }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Models table */}
        <div style={{ backgroundColor: colores.fondoTerciario, borderRadius: '14px', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ fontSize: '11px', fontWeight: '700', color: colores.textoClaro, margin: 0 }}>Modelos en produccion</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
            {modelos.map((m, i) => {
              const cfg = estadoModeloCfg[m.estado];
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', backgroundColor: colores.fondoSecundario, borderRadius: '10px', border: `1px solid ${colores.borde}` }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: colores.textoClaro, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.nombre}</div>
                    <div style={{ fontSize: '9px', color: colores.textoMedio }}>{m.tipo} · {m.version}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: '12px', fontWeight: '800', color: '#10B981' }}>{m.precision}%</div>
                    <div style={{ fontSize: '8px', color: colores.textoMedio }}>{(m.peticiones / 1000).toFixed(1)}K req.</div>
                  </div>
                  <span style={{ fontSize: '9px', fontWeight: '700', color: cfg.color, background: cfg.bg, padding: '2px 7px', borderRadius: '6px', flexShrink: 0 }}>{cfg.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={() => onNavigate?.('ia-operacion')}
        style={{ width: '100%', padding: '11px 16px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)', color: 'white', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'opacity 0.2s' }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        Ver Operacion IA Completa <ArrowRight size={15} />
      </button>
    </div>
  );
};
