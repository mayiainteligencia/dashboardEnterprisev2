import React, { useState, useEffect } from 'react';
import {
  Zap,
  Sun,
  BatteryCharging,
  Leaf,
  Thermometer,
  Lightbulb,
  Droplets,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Activity,
  CheckCircle,
  Wind
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { EV_CHARGERS, BALANCE_ENERGETICO } from '../../../gasStation/gasStationData';
import { brandingConfig } from '../../../config/branding';

export const HubEnergiaSostenibilidadModule: React.FC = () => {
  const { colores } = brandingConfig;

  const [solarWattage, setSolarWattage] = useState(48.5);
  const [bessWattage, setBessWattage] = useState(15.2);
  const [storeWattage, setStoreWattage] = useState(24.3);
  const [cfeWattage, setCfeWattage] = useState(8.2);

  // Simulación en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setSolarWattage(prev => +(prev + (Math.random() * 2 - 1)).toFixed(1));
      setBessWattage(prev => +(prev + (Math.random() * 1 - 0.5)).toFixed(1));
      setStoreWattage(prev => +(prev + (Math.random() * 1.5 - 0.75)).toFixed(1));
      setCfeWattage(prev => +(prev + (Math.random() * 0.5 - 0.25)).toFixed(1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Helpers para BESS
  const totalCells = 20;
  const chargePercent = 85;
  const filledCells = Math.floor((chargePercent / 100) * totalCells);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* ── HEADER VERDE ESMERALDA OSCURO ── */}
      <div
        className="animate-slide-up-card delay-1 gs-glass-dark"
        style={{
          background: `linear-gradient(135deg, #064E3B 0%, #022C22 100%)`,
          borderRadius: '24px',
          padding: '24px 30px',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          boxShadow: '0 10px 30px rgba(2, 44, 34, 0.5)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decoración de paneles solares fondo */}
        <div style={{ position: 'absolute', right: '10%', opacity: 0.1, pointerEvents: 'none' }}>
          <svg width="200" height="100" viewBox="0 0 200 100">
            <rect x="10" y="10" width="40" height="80" rx="4" fill="#10B981" />
            <rect x="60" y="10" width="40" height="80" rx="4" fill="#10B981" />
            <rect x="110" y="10" width="40" height="80" rx="4" fill="#10B981" />
            <rect x="160" y="10" width="40" height="80" rx="4" fill="#10B981" />
          </svg>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', zIndex: 1 }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(245, 158, 11, 0.4)',
              position: 'relative'
            }}
          >
            <Sun size={32} color="#FFFFFF" className="animate-spin-slow" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '900', letterSpacing: '-0.4px', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                Hub Sostenibilidad & EV
              </h1>
              <span className="shimmer-badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#6EE7B7', border: '1px solid #10B981', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>
                MICRORED 100% ACTIVA
              </span>
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#A7F3D0' }}>
              Gestión inteligente de marquesinas solares, BESS y electromovilidad
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', zIndex: 1 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: '#6EE7B7', fontWeight: '700', textTransform: 'uppercase' }}>Autoconsumo</div>
            <div style={{ fontSize: '24px', fontWeight: '900', color: '#FFFFFF', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span className="gs-number animate-count-up">72</span>%
            </div>
          </div>
          <div style={{ width: '2px', height: '40px', backgroundColor: 'rgba(16, 185, 129, 0.3)' }} />
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: '#6EE7B7', fontWeight: '700', textTransform: 'uppercase' }}>Ahorro CO2</div>
            <div style={{ fontSize: '24px', fontWeight: '900', color: '#FFFFFF', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span className="gs-number animate-count-up">14.2</span>
              <span style={{ fontSize: '14px' }}>Ton</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECCIÓN 1: BALANCE ENERGÉTICO Y BESS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        
        {/* Balance de flujo */}
        <div className="gs-module-card animate-slide-up-card delay-2 gs-glass">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={20} color="#10B981" />
              Flujo de Microred en Vivo
            </h3>
            <div className="gs-live-dot">
              <div className="pulse-green" style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#10B981' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>
            {/* Solar Box */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'linear-gradient(90deg, #FFFBEB 0%, #FEF3C7 100%)', borderRadius: '16px', border: '1px solid #FDE68A' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: '#F59E0B', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 10px rgba(245, 158, 11, 0.3)' }}>
                  <Sun size={24} color="#FFF" className="animate-spin-slow" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: '#B45309' }}>Solar Marquesinas</div>
                  <div style={{ fontSize: '20px', fontWeight: '900', color: '#D97706' }} className="gs-number">{solarWattage.toFixed(1)} kW</div>
                </div>
              </div>
            </div>

            {/* BESS & Store Flow */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
              {/* BESS */}
              <div style={{ flex: 1, padding: '16px', backgroundColor: '#F0FDF4', borderRadius: '16px', border: '1px solid #86EFAC' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: '#10B981', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 10px rgba(16, 185, 129, 0.3)' }}>
                    <BatteryCharging size={24} color="#FFF" />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '800', color: '#065F46' }}>Baterías BESS</div>
                    <div style={{ fontSize: '20px', fontWeight: '900', color: '#059669' }} className="gs-number">{bessWattage.toFixed(1)} kW</div>
                  </div>
                </div>
              </div>
              
              {/* Store/Pumps */}
              <div style={{ flex: 1, padding: '16px', backgroundColor: '#EFF6FF', borderRadius: '16px', border: '1px solid #93C5FD' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: '#3B82F6', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)' }}>
                    <Zap size={24} color="#FFF" />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '800', color: '#1E3A8A' }}>Tienda & Bombas</div>
                    <div style={{ fontSize: '20px', fontWeight: '900', color: '#2563EB' }} className="gs-number">{storeWattage.toFixed(1)} kW</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CFE Grid */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '12px', backgroundColor: '#F1F5F9', borderRadius: '16px', border: '1px solid #CBD5E1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#64748B', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Activity size={20} color="#FFF" />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: '#334155' }}>Red CFE (Consumo Externo)</div>
                  <div style={{ fontSize: '18px', fontWeight: '900', color: '#475569' }} className="gs-number">{cfeWattage.toFixed(1)} kW</div>
                </div>
              </div>
            </div>

            {/* Barra de Autoconsumo */}
            <div style={{ marginTop: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 'bold', color: colores.textoMedio, marginBottom: '6px' }}>
                <span>Autoconsumo (Renovable)</span>
                <span style={{ color: '#F59E0B' }}>72%</span>
              </div>
              <div style={{ width: '100%', height: '12px', backgroundColor: '#E2E8F0', borderRadius: '6px', overflow: 'hidden' }}>
                <div className="animate-bar-fill" style={{ width: '72%', height: '100%', background: 'linear-gradient(90deg, #F59E0B 0%, #10B981 100%)', borderRadius: '6px' }} />
              </div>
            </div>
          </div>
        </div>

        {/* BESS Banco de Baterías Visual */}
        <div className="gs-module-card animate-slide-up-card delay-3 gs-glass" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BatteryCharging size={20} color="#3B82F6" />
              Banco de Baterías BESS
            </h3>
            <span className="gs-badge-ok">Cargando</span>
          </div>

          <div style={{ display: 'flex', gap: '20px', flex: 1 }}>
            {/* Grid de Baterías */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', flex: 1, backgroundColor: '#1E293B', padding: '16px', borderRadius: '16px' }}>
              {Array.from({ length: totalCells }).map((_, i) => {
                const isFilled = i < filledCells;
                return (
                  <div
                    key={i}
                    style={{
                      backgroundColor: isFilled ? '#10B981' : '#334155',
                      borderRadius: '4px',
                      height: '100%',
                      minHeight: '28px',
                      boxShadow: isFilled ? '0 0 10px rgba(16, 185, 129, 0.4)' : 'none',
                      transition: 'background-color 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {isFilled && (
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)' }} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Info y Gauges */}
            <div style={{ width: '140px', display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: '900', color: '#10B981' }}>{chargePercent}%</div>
                <div style={{ fontSize: '11px', fontWeight: '700', color: colores.textoMedio, textTransform: 'uppercase' }}>SOC Nivel</div>
              </div>

              <div style={{ padding: '10px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: `1px solid ${colores.borde}`, textAlign: 'center' }}>
                <Thermometer size={16} color="#EF4444" style={{ margin: '0 auto 4px' }} />
                <div style={{ fontSize: '14px', fontWeight: '800', color: '#334155' }}>22.4°C</div>
                <div style={{ fontSize: '10px', color: colores.textoMedio }}>Temp. Interna</div>
              </div>

              <div style={{ padding: '10px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: `1px solid ${colores.borde}`, textAlign: 'center' }}>
                <Zap size={16} color="#F59E0B" style={{ margin: '0 auto 4px' }} />
                <div style={{ fontSize: '14px', fontWeight: '800', color: '#334155' }}>780 V</div>
                <div style={{ fontSize: '10px', color: colores.textoMedio }}>Voltaje Bus</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECCIÓN 2: CARGADORES EV & GRÁFICA SOLAR ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        
        {/* Curva Solar */}
        <div className="gs-module-card animate-slide-up-card delay-4 gs-glass">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={20} color="#F59E0B" />
              Curva de Generación Solar vs Red
            </h3>
          </div>
          <div style={{ height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={BALANCE_ENERGETICO} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#64748B" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#64748B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="hora" stroke="#94A3B8" fontSize={11} fontWeight={600} axisLine={false} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickFormatter={(v) => `${v}kW`} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', color: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }} />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="solar" name="Generación Solar" stroke="#F59E0B" strokeWidth={3} fillOpacity={1} fill="url(#colorSolar)" />
                <Area type="monotone" dataKey="red" name="Consumo Red" stroke="#64748B" strokeWidth={2} fillOpacity={1} fill="url(#colorRed)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Postes EV Interacivos */}
        <div className="gs-module-card animate-slide-up-card delay-5 gs-glass" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={20} color="#06B6D4" />
              Estado Cargadores EV Ultrarrápidos
            </h3>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#0284C7', backgroundColor: '#E0F2FE', padding: '4px 10px', borderRadius: '8px' }}>
              3/4 Ocupados
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1, overflowY: 'auto' }}>
            {EV_CHARGERS.map((charger, idx) => {
              const isAvailable = charger.estado === 'DISPONIBLE';
              const isOccupied = !isAvailable;
              const chargeProgress = isOccupied ? Math.floor(Math.random() * 40 + 40) : 0; // Simulated progress 40-80%

              return (
                <div
                  key={idx}
                  style={{
                    padding: '16px',
                    borderRadius: '16px',
                    backgroundColor: isAvailable ? '#F8FAFC' : '#F0FDF4',
                    border: `1px solid ${isAvailable ? '#E2E8F0' : '#86EFAC'}`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    transition: 'all 0.3s ease',
                    boxShadow: isOccupied ? '0 4px 14px rgba(16, 185, 129, 0.1)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <div style={{ 
                        width: '40px', height: '40px', borderRadius: '10px', 
                        backgroundColor: isAvailable ? '#E2E8F0' : '#10B981',
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        boxShadow: isOccupied ? '0 0 10px rgba(16, 185, 129, 0.5)' : 'none'
                      }}>
                        <Zap size={20} color={isAvailable ? '#64748B' : '#FFF'} className={isOccupied ? 'animate-pulse' : ''} />
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '800', color: colores.textoClaro }}>
                          {charger.id}
                        </div>
                        <div style={{ fontSize: '12px', color: colores.textoMedio, marginTop: '2px' }}>
                          {charger.conector} · {isOccupied ? <span style={{ color: '#059669', fontWeight: 'bold' }}>{charger.vehiculo}</span> : 'Libre'}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '18px', fontWeight: '900', color: isAvailable ? '#94A3B8' : '#06B6D4' }}>
                        {charger.potencia}
                      </div>
                      <div style={{ fontSize: '11px', color: colores.textoMedio }}>
                        {charger.tiempoSesion !== '--' ? `${charger.tiempoSesion} · ${charger.entregaKWh}` : 'Esperando vehículo'}
                      </div>
                    </div>
                  </div>
                  
                  {isOccupied && (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 'bold', color: '#10B981', marginBottom: '4px' }}>
                        <span>Progreso de Carga</span>
                        <span>{chargeProgress}%</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', backgroundColor: '#D1FAE5', borderRadius: '3px', overflow: 'hidden' }}>
                        <div className="animate-bar-fill" style={{ width: `${chargeProgress}%`, height: '100%', backgroundColor: '#10B981', borderRadius: '3px' }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px', fontSize: '11px', color: '#059669', fontWeight: '700' }}>
                        + $140 MXN est.
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── SECCIÓN 3: MÉTRICAS SOSTENIBILIDAD & BMS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
        
        {/* Sostenibilidad */}
        <div className="gs-module-card animate-slide-up-card delay-6 gs-glass" style={{ background: 'linear-gradient(180deg, #F0FDF4 0%, #FFFFFF 100%)' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '800', color: '#065F46', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Leaf size={18} color="#10B981" />
            Impacto Ecológico Mensual
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: '#D1FAE5', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Wind size={24} color="#10B981" />
              </div>
              <div>
                <div style={{ fontSize: '12px', color: colores.textoMedio, fontWeight: '700' }}>CO2 EVITADO</div>
                <div style={{ fontSize: '20px', fontWeight: '900', color: '#059669' }}>14.2 Toneladas</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: '#FEF3C7', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Sun size={24} color="#F59E0B" />
              </div>
              <div>
                <div style={{ fontSize: '12px', color: colores.textoMedio, fontWeight: '700' }}>ENERGÍA RENOVABLE</div>
                <div style={{ fontSize: '20px', fontWeight: '900', color: '#D97706' }}>1,840 kWh</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: '#E0F2FE', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <DollarSign size={24} color="#0284C7" />
              </div>
              <div>
                <div style={{ fontSize: '12px', color: colores.textoMedio, fontWeight: '700' }}>AHORRO ESTIMADO</div>
                <div style={{ fontSize: '20px', fontWeight: '900', color: '#0284C7' }}>$12,450 MXN</div>
              </div>
            </div>
          </div>
        </div>

        {/* BMS Automatización */}
        <div className="gs-module-card animate-slide-up-card delay-7 gs-glass">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lightbulb size={20} color="#8B5CF6" />
              BMS: Control Inteligente de Instalaciones
            </h3>
            <span className="shimmer-badge" style={{ backgroundColor: '#EDE9FE', color: '#6D28D9', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold' }}>
              IA Optimizando
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {/* Climatización */}
            <div style={{ padding: '20px', borderRadius: '16px', backgroundColor: '#F8FAFC', border: `1px solid ${colores.borde}`, textAlign: 'center' }}>
              <Thermometer size={28} color="#0284C7" style={{ margin: '0 auto 12px' }} />
              <strong style={{ fontSize: '14px', color: colores.textoClaro, display: 'block', marginBottom: '8px' }}>HVAC Tienda</strong>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#0284C7', marginBottom: '8px' }}>22.5°</div>
              <div style={{ width: '100%', height: '4px', backgroundColor: '#E2E8F0', borderRadius: '2px', marginBottom: '12px' }}>
                <div style={{ width: '45%', height: '100%', backgroundColor: '#0284C7', borderRadius: '2px' }} />
              </div>
              <p style={{ fontSize: '11px', color: colores.textoMedio, margin: 0, lineHeight: '1.4' }}>
                Ajuste automático por aforo: <strong>12 personas</strong>.
              </p>
            </div>

            {/* Iluminación */}
            <div style={{ padding: '20px', borderRadius: '16px', backgroundColor: '#F8FAFC', border: `1px solid ${colores.borde}`, textAlign: 'center' }}>
              <Lightbulb size={28} color="#F59E0B" style={{ margin: '0 auto 12px' }} />
              <strong style={{ fontSize: '14px', color: colores.textoClaro, display: 'block', marginBottom: '8px' }}>Iluminación Canopy</strong>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#F59E0B', marginBottom: '8px' }}>30%</div>
              <div style={{ width: '100%', height: '4px', backgroundColor: '#E2E8F0', borderRadius: '2px', marginBottom: '12px' }}>
                <div style={{ width: '30%', height: '100%', backgroundColor: '#F59E0B', borderRadius: '2px' }} />
              </div>
              <p style={{ fontSize: '11px', color: colores.textoMedio, margin: 0, lineHeight: '1.4' }}>
                Dimming activo. Sube al 100% al detectar auto.
              </p>
            </div>

            {/* Sanitarios IoT */}
            <div style={{ padding: '20px', borderRadius: '16px', backgroundColor: '#F8FAFC', border: `1px solid ${colores.borde}`, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div className="animate-radar" style={{ position: 'absolute', top: '-10px', right: '-10px', width: '50px', height: '50px', border: '2px solid rgba(16, 185, 129, 0.2)', borderRadius: '50%' }} />
              <Droplets size={28} color="#10B981" style={{ margin: '0 auto 12px' }} />
              <strong style={{ fontSize: '14px', color: colores.textoClaro, display: 'block', marginBottom: '8px' }}>Sanitarios IoT</strong>
              <div style={{ fontSize: '16px', fontWeight: '900', color: '#10B981', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <CheckCircle size={18} /> Impecable
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
                <div style={{ fontSize: '10px', fontWeight: 'bold', backgroundColor: '#D1FAE5', color: '#065F46', padding: '2px 6px', borderRadius: '4px' }}>Jabón 88%</div>
                <div style={{ fontSize: '10px', fontWeight: 'bold', backgroundColor: '#D1FAE5', color: '#065F46', padding: '2px 6px', borderRadius: '4px' }}>Papel 92%</div>
              </div>
              <p style={{ fontSize: '11px', color: colores.textoMedio, margin: 0, lineHeight: '1.4' }}>
                0 alertas de limpieza emitidas hoy.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
