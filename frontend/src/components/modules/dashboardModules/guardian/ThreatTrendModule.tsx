import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { brandingConfig } from '../../../../config/branding';
import { GuardianCard } from './GuardianCard';
import { tendencia30d } from '../../../../mock/guardianMockData';

export const ThreatTrendModule: React.FC = () => {
  const { colores } = brandingConfig;
  const series = [
    { key: 'Deepfakes', color: colores.peligro },
    { key: 'Synthetic Voice', color: colores.advertencia },
    { key: 'Identity Theft', color: colores.acento },
    { key: 'Social Media Impersonation', color: colores.exito },
    { key: 'Total', color: colores.primario },
  ];

  return (
    <GuardianCard
      titulo="Tendencia de Amenazas Sintéticas"
      subtitulo="Últimos 30 días"
      icon={<TrendingUp size={20} color={colores.acento} />}
    >
      <div style={{ width: '100%', height: '260px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={tendencia30d} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={`${colores.borde}40`} />
            <XAxis dataKey="dia" tick={{ fontSize: 10, fill: colores.textoOscuro }} interval={4} />
            <YAxis tick={{ fontSize: 10, fill: colores.textoOscuro }} />
            <Tooltip contentStyle={{
              background: colores.fondoClaro, border: `1px solid ${colores.borde}`,
              borderRadius: '10px', fontSize: '12px',
            }} />
            <Legend wrapperStyle={{ fontSize: '11px' }} />
            {series.map((s) => (
              <Line key={s.key} type="monotone" dataKey={s.key} stroke={s.color}
                strokeWidth={s.key === 'Total' ? 2.5 : 1.5} dot={false} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </GuardianCard>
  );
};
