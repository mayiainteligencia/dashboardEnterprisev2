import React, { useState, useEffect } from 'react';
import { Server, Zap, Thermometer, Wifi, Settings, Wrench, ChevronRight, TrendingUp, AlertTriangle, CheckCircle, Bot } from 'lucide-react';
import { brandingConfig } from '../../config/branding';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell, CartesianGrid, LineChart, Line } from 'recharts';

export const CentroOperacion: React.FC = () => {
  const { colores } = brandingConfig;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const px = isMobile ? '16px' : '32px';

  const energiaData = [
    { hora: '00h', kw: 380 }, { hora: '04h', kw: 360 }, { hora: '08h', kw: 420 },
    { hora: '12h', kw: 465 }, { hora: '16h', kw: 450 }, { hora: '20h', kw: 410 }, { hora: '23h', kw: 395 },
  ];

  const tempData = [
    { hora: '00h', temp: 21.2 }, { hora: '04h', temp: 21.0 }, { hora: '08h', temp: 21.8 },
    { hora: '12h', temp: 22.4 }, { hora: '16h', temp: 22.1 }, { hora: '20h', temp: 21.6 }, { hora: '23h', temp: 21.3 },
  ];

  const racks = [
    { id: 'A1', uso: 87, temp: 21.8, potencia: 12.4, estado: 'ok' },
    { id: 'A2', uso: 92, temp: 22.4, potencia: 14.1, estado: 'warning' },
    { id: 'A3', uso: 71, temp: 21.5, potencia: 10.2, estado: 'ok' },
    { id: 'B1', uso: 64, temp: 21.2, potencia: 9.1, estado: 'ok' },
    { id: 'B2', uso: 78, temp: 21.9, potencia: 11.3, estado: 'ok' },
    { id: 'B3', uso: 85, temp: 22.0, potencia: 12.8, estado: 'ok' },
    { id: 'C1', uso: 55, temp: 20.8, potencia: 7.9, estado: 'ok' },
    { id: 'C2', uso: 43, temp: 20.5, potencia: 6.2, estado: 'ok' },
  ];

  const mantenimientos = [
    { tarea: 'Mantenimiento preventivo UPS', fecha: '28 May 2026', estado: 'programado' },
    { tarea: 'Limpieza de filtros HVAC', fecha: '02 Jun 2026', estado: 'programado' },
    { tarea: 'Revisión enlace redundante', fecha: 'Completado 18 May', estado: 'completado' },
  ];

  const agentes = [
    { nombre: 'NOC IA', rol: 'Monitoreo 24/7', color: colores.primario },
    { nombre: 'Agente Capacidad', rol: 'Gestión de recursos', color: '#8B5CF6' },
    { nombre: 'Soporte Técnico', rol: 'Incidencias y tickets', color: '#3B82F6' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: colores.fondoPrincipal }}>
      {/* Header */}
      <div style={{ padding: isMobile ? '16px 16px 0' : '28px 32px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', flexWrap: 'wrap' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: colores.gradientePrimario, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Server size={16} color="#fff" />
          </div>
          <h2 style={{ fontSize: isMobile ? '18px' : '22px', fontWeight: '900', color: colores.textoClaro, margin: 0, letterSpacing: '-0.5px' }}>
            Mi Centro de Operación EdgeNet
          </h2>
        </div>
        <p style={{ fontSize: '13px', color: colores.textoMedio, margin: '0 0 12px 0' }}>
          Capacidad contratada · Energía · Climatización · Conectividad · SLA · Mantenimiento
        </p>

        {/* Indicadores globales */}
        <div style={{ display: 'flex', gap: '8px', overflowX: isMobile ? 'auto' : 'visible', paddingBottom: isMobile ? '4px' : '0', scrollbarWidth: 'none' }}>
          {[
            { label: 'Uptime', val: '99.97%', color: colores.exito },
            { label: 'Racks activos', val: '8/10', color: colores.primario },
            { label: 'SLA', val: '99.9%', color: colores.primario },
            { label: 'Alertas', val: '1', color: colores.advertencia },
          ].map((k, i) => (
            <div key={i} style={{ padding: '8px 14px', borderRadius: '12px', textAlign: 'center', background: `${k.color}10`, border: `1px solid ${k.color}25`, flexShrink: 0 }}>
              <div style={{ fontSize: '16px', fontWeight: '800', color: k.color }}>{k.val}</div>
              <div style={{ fontSize: '10px', color: colores.textoMedio, whiteSpace: 'nowrap' }}>{k.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: `20px ${px} 32px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          {/* Consumo Energético */}
          <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Zap size={16} color={colores.primario} />
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: colores.textoClaro, margin: 0 }}>Consumo Energético (kW)</h3>
            </div>
            <div style={{ height: '180px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={energiaData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={`${colores.borde}44`} vertical={false} />
                  <XAxis dataKey="hora" tick={{ fontSize: 10, fill: colores.textoOscuro }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: colores.textoOscuro }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: colores.fondoSecundario, border: `1px solid ${colores.borde}`, borderRadius: '8px', fontSize: '11px', color: colores.textoClaro }} />
                  <Bar dataKey="kw" radius={[4, 4, 0, 0]}>
                    {energiaData.map((_, i) => (
                      <Cell key={i} fill={i === 3 ? colores.primario : `${colores.primario}40`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Temperatura */}
          <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Thermometer size={16} color={colores.advertencia} />
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: colores.textoClaro, margin: 0 }}>Temperatura Promedio (°C)</h3>
            </div>
            <div style={{ height: '180px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={tempData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={`${colores.borde}44`} vertical={false} />
                  <XAxis dataKey="hora" tick={{ fontSize: 10, fill: colores.textoOscuro }} axisLine={false} tickLine={false} />
                  <YAxis domain={[20, 24]} tick={{ fontSize: 10, fill: colores.textoOscuro }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: colores.fondoSecundario, border: `1px solid ${colores.borde}`, borderRadius: '8px', fontSize: '11px', color: colores.textoClaro }} />
                  <Line type="monotone" dataKey="temp" stroke={colores.advertencia} strokeWidth={2} dot={{ fill: colores.advertencia, r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabla de Racks */}
        <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '700', color: colores.textoClaro, margin: '0 0 16px 0' }}>
            <Server size={14} style={{ verticalAlign: 'middle', marginRight: '8px' }} />Estado de Racks
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr>
                  {['Rack', 'Uso', 'Temperatura', 'Potencia', 'Estado'].map(h => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: colores.textoMedio, fontWeight: '600', borderBottom: `1px solid ${colores.borde}`, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {racks.map(r => (
                  <tr key={r.id}>
                    <td style={{ padding: '10px 12px', borderBottom: `1px solid ${colores.borde}33`, fontWeight: '600', color: colores.textoClaro }}>Rack {r.id}</td>
                    <td style={{ padding: '10px 12px', borderBottom: `1px solid ${colores.borde}33` }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ flex: 1, height: '6px', borderRadius: '3px', backgroundColor: `${colores.borde}44`, maxWidth: '80px' }}>
                          <div style={{ height: '100%', width: `${r.uso}%`, borderRadius: '3px', backgroundColor: r.uso > 90 ? colores.advertencia : colores.exito }} />
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: '700', color: r.uso > 90 ? colores.advertencia : colores.textoClaro }}>{r.uso}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '10px 12px', borderBottom: `1px solid ${colores.borde}33`, color: r.temp > 22.2 ? colores.advertencia : colores.textoClaro }}>{r.temp}°C</td>
                    <td style={{ padding: '10px 12px', borderBottom: `1px solid ${colores.borde}33`, color: colores.textoClaro }}>{r.potencia} kW</td>
                    <td style={{ padding: '10px 12px', borderBottom: `1px solid ${colores.borde}33` }}>
                      {r.estado === 'ok'
                        ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: colores.exito, fontSize: '11px', fontWeight: '600' }}><CheckCircle size={12} /> OK</span>
                        : <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: colores.advertencia, fontSize: '11px', fontWeight: '600' }}><AlertTriangle size={12} /> Atención</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
          {/* Mantenimiento */}
          <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: colores.textoClaro, margin: '0 0 12px 0' }}>
              <Wrench size={14} style={{ verticalAlign: 'middle', marginRight: '8px' }} />Mantenimiento
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {mantenimientos.map(m => (
                <div key={m.tarea} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', backgroundColor: colores.fondoTerciario, borderRadius: '12px', borderLeft: `3px solid ${m.estado === 'completado' ? colores.exito : colores.advertencia}` }}>
                  {m.estado === 'completado' ? <CheckCircle size={14} color={colores.exito} /> : <Settings size={14} color={colores.advertencia} />}
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '12px', fontWeight: '600', color: colores.textoClaro, margin: 0 }}>{m.tarea}</p>
                    <p style={{ fontSize: '10px', color: colores.textoMedio, margin: '2px 0 0 0' }}>{m.fecha}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agentes IA */}
          <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: colores.textoClaro, margin: '0 0 12px 0' }}>
              <Bot size={14} style={{ verticalAlign: 'middle', marginRight: '8px' }} />Agentes IA Asignados
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {agentes.map(a => (
                <div key={a.nombre} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: colores.fondoTerciario, borderRadius: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Bot size={16} color="white" />
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: '700', color: colores.textoClaro, margin: 0 }}>{a.nombre}</p>
                    <p style={{ fontSize: '10px', color: colores.textoMedio, margin: '2px 0 0 0' }}>{a.rol}</p>
                  </div>
                  <div style={{ marginLeft: 'auto', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: colores.exito, boxShadow: `0 0 6px ${colores.exito}88` }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInModulo { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};
