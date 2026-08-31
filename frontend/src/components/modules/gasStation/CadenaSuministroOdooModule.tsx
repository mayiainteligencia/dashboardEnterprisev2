import React, { useState, useEffect } from 'react';
import {
  Store,
  Truck,
  ShoppingBag,
  Sparkles,
  RefreshCw,
  Clock,
  TrendingUp,
  Package,
  Calendar,
  Activity,
  CheckCircle,
  Database
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { brandingConfig } from '../../../config/branding';
import { ORDENES_ODOO, ESTANTES_IOT } from '../../../gasStation/gasStationData';

const ROTACION_DATA = [
  { dia: 'Lun', rotacion: 85, inventario: 45000 },
  { dia: 'Mar', rotacion: 82, inventario: 42000 },
  { dia: 'Mie', rotacion: 90, inventario: 38000 },
  { dia: 'Jue', rotacion: 95, inventario: 34000 },
  { dia: 'Vie', rotacion: 110, inventario: 28000 },
  { dia: 'Sab', rotacion: 130, inventario: 20000 },
  { dia: 'Dom', rotacion: 120, inventario: 60000 }, // Pipa arrive
];

export const CadenaSuministroOdooModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [etaOffset, setEtaOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      setEtaOffset(prev => prev + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>
      
      {/* ── HEADER DEL MÓDULO ── */}
      <div className="animate-fade-up delay-1" style={{
        background: `linear-gradient(135deg, ${colores.azulMarino} 0%, #3B0764 100%)`,
        borderRadius: '24px',
        padding: '24px 30px',
        color: '#FFFFFF',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        border: '1px solid rgba(124, 58, 237, 0.2)',
        boxShadow: '0 10px 30px rgba(124, 58, 237, 0.15)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative particles SVG */}
        <svg className="animate-orbit" style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, opacity: 0.1, pointerEvents: 'none' }} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="5, 5" />
          <circle cx="20" cy="20" r="4" fill="#FFFFFF" />
          <circle cx="80" cy="80" r="2" fill="#FFFFFF" />
        </svg>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', position: 'relative', zIndex: 1 }}>
          <div className="animate-float" style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #9333EA 0%, #6B21A8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 25px rgba(147, 51, 234, 0.6)',
            position: 'relative'
          }}>
            <Database size={32} color="#FFFFFF" className="animate-pulse" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '900', letterSpacing: '-0.5px' }} className="gs-gradient-text">
                Módulo 4: Cadena de Suministro Odoo
              </h1>
              <span className="shimmer-badge" style={{
                fontSize: '11px', fontWeight: '800', padding: '4px 12px', borderRadius: '999px',
                backgroundColor: 'rgba(147, 51, 234, 0.2)', border: '1px solid rgba(147, 51, 234, 0.5)', color: '#D8B4FE',
              }}>
                ERP ODOO 18
              </span>
              <div className="pulse-green" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 'bold', color: '#10B981', background: 'rgba(16,185,129,0.1)', padding: '4px 8px', borderRadius: '8px' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#10B981' }} /> CONECTADO
              </div>
            </div>
            <p style={{ margin: '6px 0 0 0', fontSize: '14px', color: '#C4B5FD' }}>
              Automatización de compras de combustible y gestión inteligente IoT en Tienda
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <div className="gs-glass-dark" style={{ padding: '12px 20px', borderRadius: '16px', textAlign: 'right' }}>
            <div style={{ fontSize: '11px', color: '#D8B4FE', fontWeight: '800', textTransform: 'uppercase', marginBottom: '4px' }}>
              Valor Órdenes Activas
            </div>
            <div className="gs-number animate-count-up" style={{ fontSize: '24px', fontWeight: '900', color: '#10B981' }}>
              $1,788,400 MXN
            </div>
          </div>
        </div>
      </div>

      {/* ── KPI PANEL ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
        {[
          { label: 'Fill Rate Proyectado', value: '98.5%', change: '+1.2%', icon: <Activity size={20} color="#7C3AED" />, alert: false },
          { label: 'Tiempo Promedio Reabasto', value: '14.5 hrs', change: '-2.1 hrs', icon: <Clock size={20} color="#0284C7" />, alert: false },
          { label: 'Alertas Quiebre Stock', value: '1 alerta', change: 'Estante 3', icon: <Store size={20} color="#D97706" />, alert: true },
          { label: 'Última Sincronización', value: lastUpdate.toLocaleTimeString(), change: 'En tiempo real', icon: <RefreshCw size={20} color="#10B981" />, alert: false }
        ].map((kpi, idx) => (
          <div key={idx} className={`gs-kpi-cell animate-fade-up delay-${idx + 2}`} style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: `1px solid ${colores.borde}`, display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: kpi.alert ? '#FEF3C7' : '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {kpi.icon}
            </div>
            <div>
              <div style={{ fontSize: '12px', color: colores.textoMedio, fontWeight: '700', textTransform: 'uppercase' }}>{kpi.label}</div>
              <div className="gs-number" style={{ fontSize: '22px', fontWeight: '900', color: kpi.alert ? '#D97706' : colores.textoClaro }}>
                {kpi.value}
              </div>
              <div style={{ fontSize: '11px', color: kpi.alert ? '#D97706' : '#10B981', fontWeight: '600' }}>
                {kpi.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* ── TIMELINE DE ORDENES ODOO ── */}
        <div className="gs-module-card animate-slide-up-card delay-3" style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '24px', border: `1px solid ${colores.borde}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Truck size={22} color="#7C3AED" /> Órdenes de Combustible en Tránsito
            </h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '16px', top: '20px', bottom: '20px', width: '2px', backgroundColor: '#E2E8F0', zIndex: 0 }} />
            
            {ORDENES_ODOO.map((o, idx) => {
              const esTransito = o.estado === 'EN TRÁNSITO';
              const progress = esTransito ? 65 + (etaOffset % 10) : 100;
              return (
                <div key={idx} className="gs-glass animate-fade-up" style={{ zIndex: 1, padding: '16px', borderRadius: '16px', marginLeft: '32px', position: 'relative', border: `1px solid ${esTransito ? '#FDE68A' : '#D1FAE5'}`, backgroundColor: esTransito ? '#FFFBEB' : '#F0FDF4' }}>
                  {/* Timeline dot */}
                  <div className={esTransito ? 'pulse-amber' : ''} style={{ position: 'absolute', left: '-41px', top: '16px', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: esTransito ? '#F59E0B' : '#10B981', border: '3px solid #FFFFFF', zIndex: 2, boxShadow: '0 0 0 1px #E2E8F0' }} />
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: '800', color: '#7C3AED', marginBottom: '2px' }}>{o.id}</div>
                      <div style={{ fontSize: '15px', fontWeight: '800', color: colores.textoClaro }}>{o.producto}</div>
                      <div style={{ fontSize: '12px', color: colores.textoMedio }}>{o.proveedor}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="gs-number" style={{ fontSize: '18px', fontWeight: '900', color: colores.textoClaro }}>{o.volumen}</div>
                      <div style={{ fontSize: '12px', fontWeight: '700', color: colores.textoMedio }}>{o.total}</div>
                    </div>
                  </div>

                  <div style={{ backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '999px', height: '6px', overflow: 'hidden', marginBottom: '8px' }}>
                    <div className="animate-bar-fill" style={{ width: `${progress}%`, height: '100%', backgroundColor: esTransito ? '#F59E0B' : '#10B981', transition: 'width 1s ease' }} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className={esTransito ? 'gs-badge-warn' : 'gs-badge-ok'} style={{ padding: '4px 8px' }}>
                      {o.estado}
                    </span>
                    {esTransito ? (
                      <span className="pulse-amber" style={{ fontSize: '12px', fontWeight: '800', color: '#D97706', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={14} /> ETA: {Math.max(10, 45 - etaOffset)} min
                      </span>
                    ) : (
                      <span style={{ fontSize: '12px', fontWeight: '800', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle size={14} /> Entregado
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── GRAFICA Y PRODUCTOS ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="gs-module-card animate-slide-up-card delay-4" style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '24px', border: `1px solid ${colores.borde}`, flex: 1 }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={18} color="#7C3AED" /> Rotación de Inventario Tienda
            </h3>
            <div style={{ height: '220px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ROTACION_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRotacion" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="dia" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                    itemStyle={{ color: '#7C3AED', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="rotacion" stroke="#7C3AED" strokeWidth={3} fillOpacity={1} fill="url(#colorRotacion)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="gs-module-card animate-slide-up-card delay-5" style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '24px', border: `1px solid ${colores.borde}` }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} color="#D97706" /> Productos Hiperlocales Top
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'Café Gourmet (Veracruz)', rotation: '2.1 días', tag: 'Top Ventas', color: '#059669' },
                { name: 'Aditivos Alto Desempeño', rotation: '4.5 días', tag: 'Venta Cruzada', color: '#0284C7' },
                { name: 'Panadería Artesanal', rotation: '1.0 día', tag: 'Fresco 100%', color: '#D97706' }
              ].map((prod, idx) => (
                <div key={idx} style={{ padding: '12px', borderRadius: '12px', backgroundColor: '#F8FAFC', border: `1px solid ${colores.borde}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '14px', color: colores.textoClaro }}>{prod.name}</strong>
                    <div style={{ fontSize: '12px', color: colores.textoMedio }}>Rotación: {prod.rotation}</div>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: '800', color: prod.color, backgroundColor: `${prod.color}15`, padding: '4px 10px', borderRadius: '8px' }}>
                    {prod.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── ESTANTES IOT ── */}
      <div className="gs-module-card animate-slide-up-card delay-6" style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '24px', border: `1px solid ${colores.borde}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={22} color="#7C3AED" /> Estantes Inteligentes IoT (Sensores de Peso)
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {ESTANTES_IOT.map((e, idx) => {
            const isCrit = e.ocupacion < 70;
            const strokeColor = isCrit ? '#EF4444' : (e.ocupacion < 90 ? '#F59E0B' : '#10B981');
            const dashArray = `${(e.ocupacion / 100) * 125}, 125`;

            return (
              <div key={idx} style={{
                padding: '20px', borderRadius: '16px',
                backgroundColor: isCrit ? '#FEF2F2' : '#FFFFFF',
                border: `1px solid ${isCrit ? '#FCA5A5' : colores.borde}`,
                display: 'flex', flexDirection: 'column', gap: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: colores.textoClaro }}>{e.seccion}</div>
                  <div style={{ width: '36px', height: '36px', position: 'relative' }}>
                    <svg viewBox="0 0 50 50" style={{ transform: 'rotate(-90deg)' }}>
                      <circle cx="25" cy="25" r="20" fill="none" stroke="#E2E8F0" strokeWidth="6" />
                      <circle cx="25" cy="25" r="20" fill="none" stroke={strokeColor} strokeWidth="6" strokeDasharray={dashArray} strokeLinecap="round" style={{ transition: 'stroke-dasharray 1s ease' }} />
                    </svg>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '900', color: strokeColor }}>
                      {e.ocupacion}%
                    </div>
                  </div>
                </div>

                <div style={{ height: '24px', backgroundColor: '#F1F5F9', borderRadius: '12px', overflow: 'hidden', position: 'relative', border: '1px solid #E2E8F0' }}>
                  <div className="animate-bar-fill" style={{ width: `${e.ocupacion}%`, height: '100%', backgroundColor: strokeColor, transition: 'width 1.5s ease' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ color: colores.textoMedio }}>Sensor Peso: <strong>{e.sensorPeso}</strong></span>
                  {isCrit ? (
                    <span className="gs-badge-crit" style={{ fontSize: '10px', padding: '2px 6px' }}>{e.reposicionAuto}</span>
                  ) : (
                    <span style={{ color: '#10B981', fontWeight: '700' }}>OK</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
