import React, { useEffect, useState } from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ShieldCheck, AlertTriangle, ShieldHalf, Timer } from 'lucide-react';
import { brandingConfig } from '../../../../config/branding';
import { GuardianCard } from './GuardianCard';
import { useCountUp } from './guardianUi';
import { kpis } from '../../../../mock/guardianMockData';

// Gauge circular con recharts.
const Gauge: React.FC<{ valor: number; max: number; color: string; sufijo?: string; decimals?: number }> = ({
  valor, max, color, sufijo = '', decimals = 0,
}) => {
  const { colores } = brandingConfig;
  const animado = useCountUp(valor, 1500, decimals);
  const data = [{ value: (valor / max) * 100, fill: color }];
  return (
    <div style={{ position: 'relative', width: '100%', height: '110px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart innerRadius="72%" outerRadius="100%" data={data} startAngle={220} endAngle={-40}>
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar dataKey="value" cornerRadius={20} background={{ fill: `${colores.borde}40` }} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', pointerEvents: 'none',
      }}>
        <span style={{ fontSize: '22px', fontWeight: 800, color: colores.textoClaro }}>
          {animado}{sufijo}
        </span>
      </div>
    </div>
  );
};

const trendData = Array.from({ length: 12 }, (_, i) => ({ v: 60 + Math.sin(i / 1.5) * 15 + i }));

export const KpiRowModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [k, setK] = useState(kpis);

  // Variación mock cada 5-10s.
  useEffect(() => {
    const id = setInterval(() => {
      setK((p) => ({
        ...p,
        amenazasHoy: p.amenazasHoy + Math.floor(Math.random() * 12),
        idsScore: Math.min(99, Math.max(85, p.idsScore + (Math.random() > 0.5 ? 1 : -1))),
      }));
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const amenazasAnim = useCountUp(k.amenazasHoy, 1600);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
      {/* IDS */}
      <GuardianCard titulo="Puntuación de Seguridad (IDS)" subtitulo="Muy alto" icon={<ShieldCheck size={20} color={colores.exito} />}>
        <Gauge valor={k.idsScore} max={100} color={colores.exito} />
        <div style={{ height: '34px', marginTop: '4px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <Line type="monotone" dataKey="v" stroke={colores.exito} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GuardianCard>

      {/* Amenazas hoy */}
      <GuardianCard titulo="Amenazas Detectadas Hoy" subtitulo="Últimas 24h" icon={<AlertTriangle size={20} color={colores.peligro} />}>
        <div style={{ fontSize: '34px', fontWeight: 800, color: colores.peligro, lineHeight: 1 }}>
          {amenazasAnim.toLocaleString()}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', margin: '12px 0' }}>
          {k.desgloseAmenazas.map((d) => (
            <div key={d.tipo} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
              <span style={{ color: colores.textoMedio }}>{d.tipo}</span>
              <span style={{ color: colores.textoClaro, fontWeight: 600 }}>{d.valor.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div style={{
          display: 'inline-block', padding: '5px 10px', borderRadius: '8px',
          background: `${colores.peligro}18`, color: colores.peligro, fontSize: '11px', fontWeight: 700,
        }}>
          {k.alertasCriticasBloqueadas} alertas críticas bloqueadas
        </div>
      </GuardianCard>

      {/* Cobertura */}
      <GuardianCard titulo="Cobertura de Blindaje" subtitulo="Protección total activa" icon={<ShieldHalf size={20} color={colores.acento} />}>
        <Gauge valor={k.coberturaBlindaje} max={100} color={colores.acento} sufijo="%" />
      </GuardianCard>

      {/* Tiempo respuesta */}
      <GuardianCard titulo="Tiempo Medio de Respuesta" subtitulo="Ultra rápido" icon={<Timer size={20} color={colores.advertencia} />}>
        <Gauge valor={k.tiempoRespuesta} max={5} color={colores.advertencia} sufijo="s" decimals={1} />
      </GuardianCard>
    </div>
  );
};
