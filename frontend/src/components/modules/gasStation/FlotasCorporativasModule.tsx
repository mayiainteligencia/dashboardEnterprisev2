import React, { useState, useEffect } from 'react';
import {
  Truck,
  Building2,
  FileText,
  AlertTriangle,
  CheckCircle,
  TrendingDown,
  Navigation,
  CreditCard,
  RefreshCw,
  Shield,
  Gauge,
  MapPin,
  Activity,
  Zap,
  BarChart2,
  DollarSign
} from 'lucide-react';
import { brandingConfig } from '../../../config/branding';
import { FLOTAS_B2B } from '../../../gasStation/gasStationData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const MexicoMapSVG = () => (
  <svg viewBox="0 0 800 600" style={{ width: '100%', height: '100%', opacity: 0.15 }} className="animate-pulse">
    <path
      d="M200,100 L300,80 L400,120 L500,180 L600,250 L700,400 L650,450 L550,500 L450,450 L350,400 L250,300 Z"
      fill="none"
      stroke="#38BDF8"
      strokeWidth="4"
      strokeLinejoin="round"
      className="animate-draw-path"
    />
    <circle cx="350" cy="250" r="10" fill="#10B981" className="animate-ping" />
    <circle cx="450" cy="350" r="8" fill="#F59E0B" className="animate-ping delay-2" />
    <circle cx="550" cy="400" r="12" fill="#EF4444" className="animate-ping delay-4" />
  </svg>
);

const ChurnGauge = ({ value }: { value: number }) => {
  const color = value >= 70 ? '#EF4444' : value >= 30 ? '#F59E0B' : '#10B981';
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: '50px', height: '50px' }}>
      <svg viewBox="0 0 50 50" width="50" height="50" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="25" cy="25" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
        <circle
          cx="25"
          cy="25"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 1.5s ease-in-out' }}
        />
      </svg>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#FFF' }}>{value}%</span>
      </div>
    </div>
  );
};

export const FlotasCorporativasModule: React.FC = () => {
  const { colores } = brandingConfig;

  const [odometers, setOdometers] = useState<Record<number, number>>({
    0: 348210,
    1: 124500,
    2: 88400
  });

  const [activeVehicles, setActiveVehicles] = useState(340);

  useEffect(() => {
    const interval = setInterval(() => {
      setOdometers(prev => ({
        0: prev[0] + Math.floor(Math.random() * 3),
        1: prev[1] + Math.floor(Math.random() * 2),
        2: prev[2] + Math.floor(Math.random() * 2),
      }));
      setActiveVehicles(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const chartData = FLOTAS_B2B.map(f => {
    const rawVal = parseFloat(f.consumoMes.replace(/[^\d.-]/g, ''));
    return {
      name: f.empresa.split(' ')[0],
      consumo: isNaN(rawVal) ? 0 : rawVal,
      riesgo: parseInt(f.churnRisk.match(/\d+/)?.[0] || '0', 10)
    };
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* ── HEADER DEL MÓDULO ── */}
      <div
        className="gs-module-card animate-slide-up-card delay-1"
        style={{
          background: `linear-gradient(135deg, ${colores.azulMarino} 0%, #0F172A 100%)`,
          padding: '0',
          color: '#FFFFFF',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '300px', height: '300px', opacity: 0.3 }}>
          <MexicoMapSVG />
        </div>
        <div style={{ padding: '30px', position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div className="animate-float" style={{ width: '64px', height: '64px', borderRadius: '20px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
              <Truck size={32} color="#38BDF8" className="animate-pulse" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <h1 style={{ margin: 0, fontSize: '26px', fontWeight: '900', letterSpacing: '-0.5px' }}>
                  Flotas Corporativas <span className="gs-gradient-text" style={{ backgroundImage: 'linear-gradient(90deg, #38BDF8, #818CF8)' }}>B2B</span>
                </h1>
                <span className="shimmer-badge" style={{ backgroundColor: 'rgba(56, 189, 248, 0.2)', color: '#38BDF8', border: '1px solid rgba(56,189,248,0.5)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                  TELEMATICA & ODOO CFDI
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: '#94A3B8', maxWidth: '600px' }}>
                Dashboard ejecutivo para gestión de cuentas corporativas, conciliación de odómetro, facturación electrónica y predicción de churn.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '24px', backgroundColor: 'rgba(0,0,0,0.3)', padding: '16px 24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>
                Vehículos Activos
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                <div className="pulse-green" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                <div className="gs-number animate-count-up" style={{ fontSize: '28px', color: '#10B981' }}>{activeVehicles}</div>
              </div>
            </div>
            <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>
                Consumo B2B Mes
              </div>
              <div className="gs-number" style={{ fontSize: '28px', color: '#38BDF8' }}>
                $4.82M
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── KPIs EJECUTIVOS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        {[
          { icon: <DollarSign size={20} color="#10B981"/>, title: 'Total Facturado', value: '$4,820,000', sub: '+12% vs mes anterior', delay: 'delay-1' },
          { icon: <AlertTriangle size={20} color="#EF4444"/>, title: 'Flotas en Riesgo (Churn)', value: '1 Cuenta', sub: 'Requiere acción', delay: 'delay-2' },
          { icon: <Gauge size={20} color="#38BDF8"/>, title: 'Eficiencia Odómetro', value: '99.1%', sub: 'Concordancia Telemetría', delay: 'delay-3' },
          { icon: <Activity size={20} color="#F59E0B"/>, title: 'Consumo Promedio', value: '7,450 L/mes', sub: 'Por flota corporativa', delay: 'delay-4' }
        ].map((kpi, idx) => (
          <div key={idx} className={`gs-kpi-cell animate-fade-up ${kpi.delay}`} style={{ background: '#FFF', borderRadius: '16px', padding: '20px', border: `1px solid ${colores.borde}`, display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${kpi.icon.props.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {kpi.icon}
            </div>
            <div>
              <div style={{ fontSize: '13px', color: colores.textoMedio, fontWeight: '600' }}>{kpi.title}</div>
              <div className="gs-number" style={{ fontSize: '22px', color: colores.textoClaro }}>{kpi.value}</div>
              <div style={{ fontSize: '11px', color: '#94A3B8' }}>{kpi.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── DASHBOARD CORPORATIVO (CARDS) ── */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: colores.textoClaro, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Building2 size={20} color={colores.primario} />
          Panel de Cuentas B2B
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
          {FLOTAS_B2B.map((f, idx) => {
            const riesgoInt = parseInt(f.churnRisk.match(/\d+/)?.[0] || '0', 10);
            const isHighRisk = riesgoInt > 50;
            const cardBg = isHighRisk ? 'linear-gradient(145deg, #1E293B 0%, #450a0a 100%)' : 'linear-gradient(145deg, #1E293B 0%, #0F172A 100%)';
            const initials = f.empresa.substring(0, 2).toUpperCase();

            return (
              <div key={idx} className={`gs-glass-dark animate-slide-up-card delay-${(idx % 4) + 1}`} style={{ background: cardBg, borderRadius: '20px', padding: '24px', color: '#FFF', border: `1px solid ${isHighRisk ? '#991B1B' : 'rgba(255,255,255,0.1)'}`, position: 'relative', overflow: 'hidden' }}>
                {isHighRisk && (
                  <div style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '4px', background: '#EF4444', boxShadow: '0 0 10px #EF4444' }} />
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: isHighRisk ? '#7F1D1D' : '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 'bold', border: `2px solid ${isHighRisk ? '#EF4444' : '#38BDF8'}` }}>
                      {initials}
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700' }}>{f.empresa}</h3>
                      <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Truck size={14} /> {f.unidades} uds
                        <span className={isHighRisk ? 'pulse-red' : 'pulse-green'} style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: isHighRisk ? '#EF4444' : '#10B981', display: 'inline-block' }} />
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: '#94A3B8' }}>Riesgo Churn</div>
                    <ChurnGauge value={riesgoInt} />
                  </div>
                </div>

                <div className="gs-dark-metric" style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#94A3B8' }}>Consumo Mes</span>
                    <span className="gs-number" style={{ fontSize: '14px', color: '#10B981', fontWeight: 'bold' }}>{f.consumoMes}</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: '#334155', borderRadius: '3px', overflow: 'hidden' }}>
                    <div className="animate-bar-fill" style={{ width: `${Math.min(100, Math.random() * 40 + 40)}%`, height: '100%', background: 'linear-gradient(90deg, #10B981, #34D399)', borderRadius: '3px' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#94A3B8' }}>Saldo Crédito</span>
                    <span style={{ fontSize: '12px', color: '#FFF' }}>{f.saldoCredito}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#94A3B8' }}>Sync Odómetro: <strong style={{ color: '#38BDF8' }}>{f.odometroSync}</strong></span>
                  <span className={`gs-badge-${isHighRisk ? 'crit' : 'ok'}`} style={{ padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold' }}>
                    {isHighRisk ? 'CRÍTICA' : 'ACTIVA'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '20px' }}>
        {/* ── TABLA DE TRANSACCIONES / TELEMETRÍA FEED ── */}
        <div className="gs-module-card animate-slide-up-card delay-3" style={{ background: '#FFF', borderRadius: '20px', padding: '24px', border: `1px solid ${colores.borde}` }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={18} color={colores.primario} />
            Feed de Telemetría y CFDI
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { unit: '#108 (Castores)', odo: odometers[0], vol: '350L', type: 'Diésel', status: 'CFDI Timbrado', color: '#10B981' },
              { unit: '#042 (DHL)', odo: odometers[1], vol: '70L', type: 'Diésel', status: 'CFDI Timbrado', color: '#10B981' },
              { unit: '#019 (Patrulla)', odo: odometers[2], vol: '60L', type: 'Premium', status: 'En proceso', color: '#F59E0B' }
            ].map((t, idx) => (
              <div key={idx} style={{ padding: '16px', borderRadius: '12px', background: '#F8FAFC', border: `1px solid ${colores.borde}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', animation: `slideInLeft 0.5s ease forwards ${(idx + 1) * 0.2}s`, opacity: 0, transform: 'translateX(-20px)' }}>
                <style>{`
                  @keyframes slideInLeft {
                    to { opacity: 1; transform: translateX(0); }
                  }
                `}</style>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: colores.textoClaro, marginBottom: '4px' }}>Unidad {t.unit}</div>
                  <div style={{ fontSize: '12px', color: colores.textoMedio, display: 'flex', gap: '12px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Gauge size={12}/> {t.odo.toLocaleString()} km</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Zap size={12}/> {t.vol} {t.type}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', background: `${t.color}15`, color: t.color, border: `1px solid ${t.color}50` }}>
                    {t.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── GRÁFICA CONSUMO ── */}
        <div className="gs-module-card animate-slide-up-card delay-4" style={{ background: '#FFF', borderRadius: '20px', padding: '24px', border: `1px solid ${colores.borde}`, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart2 size={18} color={colores.primario} />
            Consumo Mensual por Flota
          </h3>
          <div style={{ flex: 1, minHeight: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorConsumo" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  formatter={(value: number | string | undefined) => [`$${Number(value ?? 0).toLocaleString()} MXN`, 'Consumo'] as [string, string]}
                />
                <Bar dataKey="consumo" fill="url(#colorConsumo)" radius={[6, 6, 0, 0]} maxBarSize={40}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.riesgo > 50 ? '#EF4444' : 'url(#colorConsumo)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
