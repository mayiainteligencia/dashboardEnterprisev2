import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  Smartphone,
  Gift,
  Package,
  TrendingUp,
  Star,
  Users,
  Zap,
  Activity,
  CheckCircle,
  Clock,
  Car
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from 'recharts';
import { brandingConfig } from '../../../config/branding';
import { METRICAS_PAGOS } from '../../../gasStation/gasStationData';

const TICKER_ITEMS = [
  "ALPR Pay: $1,240.00 (Bomba 2)",
  "App Loyalty: +150 pts (Bomba 5)",
  "Just Walk Out: $340.50 (Tienda)",
  "Click & Collect: Paquete recogido (Locker 12)",
  "Tarjeta Crédito: $850.00 (Bomba 1)",
  "ALPR Pay: $2,100.00 (Bomba 8)",
  "NPS Rating: 5 Estrellas"
];

const TOP_CLIENTS = [
  { name: 'Ana M.', points: 12450, level: 'Platino', initials: 'AM', color: '#8B5CF6' },
  { name: 'Carlos R.', points: 9800, level: 'Oro', initials: 'CR', color: '#F59E0B' },
  { name: 'Lucía T.', points: 8100, level: 'Oro', initials: 'LT', color: '#F59E0B' },
  { name: 'Miguel A.', points: 5200, level: 'Plata', initials: 'MA', color: '#9CA3AF' },
  { name: 'Sofía L.', points: 3100, level: 'Bronce', initials: 'SL', color: '#B45309' }
];

const HISTOGRAM_DATA = [
  { level: 'Bronce', users: 8400, color: '#B45309' },
  { level: 'Plata', users: 5100, color: '#9CA3AF' },
  { level: 'Oro', users: 3200, color: '#F59E0B' },
  { level: 'Platino', users: 1750, color: '#8B5CF6' }
];

export const FidelizacionPagosModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [usersCount, setUsersCount] = useState(18450);
  const [lockers, setLockers] = useState<string[]>(Array(24).fill('free'));
  const [tickerOffset, setTickerOffset] = useState(0);
  const [livePulse, setLivePulse] = useState(false);
  const [paymentsMix, setPaymentsMix] = useState(METRICAS_PAGOS);
  const [npsScore, setNpsScore] = useState(86);

  useEffect(() => {
    // Generate initial lockers: 60% occupied, 20% reserved, 20% free = ~80% occupancy
    setLockers(Array.from({ length: 24 }, () => {
      const r = Math.random();
      if (r < 0.6) return 'occupied';
      if (r < 0.8) return 'reserved';
      return 'free';
    }));

    const interval = setInterval(() => {
      setUsersCount(prev => prev + Math.floor(Math.random() * 3));
      setLivePulse(true);
      setTimeout(() => setLivePulse(false), 500);

      // Slightly fluctuate payments mix values to simulate live
      setPaymentsMix(prev => [...prev].map(p => ({
        ...p,
        porcentaje: p.porcentaje + (Math.random() * 0.4 - 0.2)
      })));
      
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const totalOccupied = lockers.filter(l => l !== 'free').length;
  const lockerOccupancyPct = Math.round((totalOccupied / 24) * 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* ── HEADER MAGENTA CON TICKER ── */}
      <div className="gs-module-card animate-slide-up-card gs-glass" style={{
        background: 'linear-gradient(135deg, #BE185D 0%, #831843 100%)',
        color: '#FFFFFF',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Partículas decorativas SVG */}
        <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.1 }}>
          <Zap size={200} className="animate-pulse" />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="animate-float" style={{
              width: '60px', height: '60px', borderRadius: '16px',
              background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 20px rgba(255,255,255,0.3)'
            }}>
              <Gift size={32} color="#FFF" className="animate-spin-slow" style={{ animationDuration: '6s' }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '900' }}>
                  Fidelización & Pagos Digitales
                </h1>
                <span className="shimmer-badge" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  LIVE
                </span>
              </div>
              <p style={{ margin: '4px 0 0 0', opacity: 0.8, fontSize: '14px' }}>
                Monitor en tiempo real de transacciones, lealtad y experiencia
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '12px', opacity: 0.8, textTransform: 'uppercase', fontWeight: 700 }}>
                Usuarios Activos
              </div>
              <div className={`gs-number ${livePulse ? 'animate-alert-blink' : ''}`} style={{ fontSize: '32px', color: '#FFF', textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>
                {usersCount.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Ticker de transacciones */}
        <div style={{ marginTop: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '8px 12px', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
          <Activity size={16} color="#FFF" style={{ marginRight: '10px', minWidth: '16px' }} className="animate-pulse" />
          <div style={{ width: '100%', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <div className="gs-ticker-track" style={{ display: 'inline-block', color: '#FBCFE8', fontSize: '13px', fontWeight: 600 }}>
              {TICKER_ITEMS.join('   •   ')}   •   {TICKER_ITEMS.join('   •   ')}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* ── MIX DE PAGOS (DONUT + CARDS) ── */}
        <div className="gs-module-card animate-slide-up-card delay-1 gs-glass-dark" style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#E2E8F0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CreditCard size={20} color="#38BDF8" /> Mix de Métodos de Pago
          </h3>
          
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ width: '200px', height: '200px', position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentsMix}
                    cx="50%" cy="50%"
                    innerRadius={60} outerRadius={90}
                    paddingAngle={5}
                    dataKey="porcentaje"
                    stroke="none"
                    isAnimationActive={true}
                  >
                    {paymentsMix.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#0F172A', border: '1px solid #1E293B', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: '#94A3B8' }}>Digital</div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#38BDF8' }}>62%</div>
              </div>
            </div>
            
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {paymentsMix.map((p, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: p.color, boxShadow: `0 0 8px ${p.color}` }} />
                    <span style={{ color: '#E2E8F0', fontSize: '13px', fontWeight: 600 }}>{p.metodo}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#FFF', fontWeight: 800, fontSize: '14px' }}>{p.porcentaje.toFixed(1)}%</div>
                    <div style={{ color: '#94A3B8', fontSize: '11px' }}>{p.monto}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            <div className="gs-kpi-cell" style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
              <Car size={18} color="#22C55E" />
              <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '8px' }}>ALPR Pay</div>
              <div style={{ fontSize: '18px', color: '#22C55E', fontWeight: 900 }}>+45%</div>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', marginTop: '8px', borderRadius: '2px' }}>
                <div className="animate-bar-fill" style={{ width: '85%', height: '100%', background: '#22C55E', borderRadius: '2px' }} />
              </div>
            </div>
            <div className="gs-kpi-cell" style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
              <Smartphone size={18} color="#38BDF8" />
              <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '8px' }}>App Pay</div>
              <div style={{ fontSize: '18px', color: '#38BDF8', fontWeight: 900 }}>+22%</div>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', marginTop: '8px', borderRadius: '2px' }}>
                <div className="animate-bar-fill delay-1" style={{ width: '65%', height: '100%', background: '#38BDF8', borderRadius: '2px' }} />
              </div>
            </div>
            <div className="gs-kpi-cell" style={{ background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
              <Zap size={18} color="#A855F7" />
              <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '8px' }}>Just Walk Out</div>
              <div style={{ fontSize: '18px', color: '#A855F7', fontWeight: 900 }}>+18%</div>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', marginTop: '8px', borderRadius: '2px' }}>
                <div className="animate-bar-fill delay-2" style={{ width: '45%', height: '100%', background: '#A855F7', borderRadius: '2px' }} />
              </div>
            </div>
          </div>
        </div>

        {/* ── CLICK & COLLECT ── */}
        <div className="gs-module-card animate-slide-up-card delay-2 gs-glass-dark" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#E2E8F0', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Package size={20} color="#F59E0B" /> Click & Collect Lockers
            </div>
            <span className="gs-badge-warn">Alta Demanda</span>
          </h3>
          
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flex: 1 }}>
            {/* Grid 6x4 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px', flex: 1 }}>
              {lockers.map((status, i) => (
                <div key={i} className="animate-fade-up" style={{ 
                  aspectRatio: '1', 
                  borderRadius: '6px',
                  background: status === 'free' ? 'rgba(34, 197, 94, 0.2)' : status === 'occupied' ? 'rgba(56, 189, 248, 0.4)' : 'rgba(245, 158, 11, 0.4)',
                  border: `1px solid ${status === 'free' ? '#22C55E' : status === 'occupied' ? '#38BDF8' : '#F59E0B'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: status !== 'free' ? `0 0 10px ${status === 'occupied' ? 'rgba(56,189,248,0.2)' : 'rgba(245,158,11,0.2)'}` : 'none',
                  animationDelay: `${i * 0.05}s`
                }}>
                  {status === 'occupied' && <Package size={12} color="#38BDF8" />}
                  {status === 'reserved' && <Clock size={12} color="#F59E0B" />}
                </div>
              ))}
            </div>

            {/* Circular Gauge */}
            <div style={{ width: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '100px', height: '100px', position: 'relative' }}>
                <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}>
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                  <circle 
                    cx="50" cy="50" r="45" fill="none" stroke="#F59E0B" strokeWidth="8"
                    strokeDasharray={`${lockerOccupancyPct * 2.827} 282.7`}
                    style={{ transition: 'stroke-dasharray 1s ease', strokeLinecap: 'round' }}
                  />
                </svg>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  <span style={{ fontSize: '24px', fontWeight: 900, color: '#FFF' }}>{lockerOccupancyPct}%</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px', fontSize: '11px', color: '#94A3B8' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '8px', height: '8px', background: '#38BDF8', borderRadius: '2px' }}/> Ocupado</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '8px', height: '8px', background: '#F59E0B', borderRadius: '2px' }}/> Rsv</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── GASPOINTS LEALTAD ── */}
        <div className="gs-module-card animate-slide-up-card delay-3 gs-glass-dark" style={{ padding: '24px', gridColumn: '1' }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#E2E8F0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={20} color="#EC4899" /> Programa GasPoints
          </h3>
          
          <div style={{ display: 'flex', gap: '24px', height: '180px' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={HISTOGRAM_DATA} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="level" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ background: '#0F172A', border: '1px solid #1E293B' }} />
                  <Bar dataKey="users" radius={[4, 4, 0, 0]}>
                    {HISTOGRAM_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div style={{ width: '220px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 700, marginBottom: '4px' }}>TOP CLIENTES HOY</div>
              {TOP_CLIENTS.map((client, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: client.color, color: '#FFF', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                      {client.initials}
                    </div>
                    <span style={{ color: '#E2E8F0', fontSize: '12px', fontWeight: 600 }}>{client.name}</span>
                  </div>
                  <span style={{ color: client.color, fontSize: '12px', fontWeight: 800 }}>{client.points} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── EXPERIENCIA / NPS ── */}
        <div className="gs-module-card animate-slide-up-card delay-4 gs-glass-dark" style={{ padding: '24px', gridColumn: '2', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#E2E8F0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Star size={20} color="#FBBF24" /> NPS & Experiencia
          </h3>
          
          <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <Star size={64} color="#FBBF24" fill="#FBBF24" className="animate-pulse" style={{ filter: 'drop-shadow(0 0 15px rgba(251,191,36,0.5))' }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#1E293B', fontWeight: 900, fontSize: '18px' }}>
                  4.9
                </div>
              </div>
              <div style={{ fontSize: '14px', color: '#E2E8F0', fontWeight: 700, marginTop: '12px' }}>Rating Promedio</div>
              <div style={{ fontSize: '12px', color: '#94A3B8' }}>+1,200 reseñas hoy</div>
            </div>

            <div style={{ width: '160px', textAlign: 'center' }}>
              <svg viewBox="0 0 100 60" style={{ overflow: 'visible' }}>
                <path d="M10,55 A40,40 0 0,1 90,55" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" strokeLinecap="round" />
                <path 
                  d="M10,55 A40,40 0 0,1 90,55" 
                  fill="none" 
                  stroke="url(#nps-grad)" 
                  strokeWidth="12" 
                  strokeLinecap="round"
                  strokeDasharray={`${(npsScore/100) * 125} 125`}
                  style={{ transition: 'stroke-dasharray 1.5s ease-out' }}
                />
                <defs>
                  <linearGradient id="nps-grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#EF4444" />
                    <stop offset="50%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                </defs>
              </svg>
              <div style={{ fontSize: '32px', fontWeight: 900, color: '#10B981', marginTop: '-20px' }} className="gs-number">
                {npsScore}
              </div>
              <div style={{ fontSize: '14px', color: '#E2E8F0', fontWeight: 700 }}>NPS Score</div>
              <div style={{ fontSize: '12px', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <TrendingUp size={12} /> Zona de Excelencia
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
