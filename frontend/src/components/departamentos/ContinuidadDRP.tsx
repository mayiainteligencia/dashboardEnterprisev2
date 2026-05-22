import React, { useState, useEffect } from 'react';
import { HardDrive, CheckCircle, AlertTriangle, Clock, RefreshCw, Bot, Shield } from 'lucide-react';
import { brandingConfig } from '../../config/branding';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';

export const ContinuidadDRP: React.FC = () => {
  const { colores } = brandingConfig;
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => { const c = () => setIsMobile(window.innerWidth < 1024); c(); window.addEventListener('resize', c); return () => window.removeEventListener('resize', c); }, []);
  const px = isMobile ? '16px' : '32px';

  const disponibilidadData = [
    { mes: 'Ene', pct: 99.92 }, { mes: 'Feb', pct: 99.95 }, { mes: 'Mar', pct: 99.98 },
    { mes: 'Abr', pct: 99.94 }, { mes: 'May', pct: 99.97 }, { mes: 'Jun', pct: 99.99 },
  ];

  const backups = [
    { nombre: 'Producción DB', ultimo: 'Hoy 06:00', tamaño: '2.4 TB', estado: 'ok', retencion: '30 días' },
    { nombre: 'Aplicaciones', ultimo: 'Hoy 04:00', tamaño: '1.8 TB', estado: 'ok', retencion: '30 días' },
    { nombre: 'Configuraciones', ultimo: 'Hoy 02:00', tamaño: '120 GB', estado: 'ok', retencion: '90 días' },
    { nombre: 'Logs y auditoría', ultimo: 'Ayer 23:00', tamaño: '450 GB', estado: 'warning', retencion: '365 días' },
  ];

  const drpChecklist = [
    { item: 'Plan DRP documentado y aprobado', ok: true },
    { item: 'Sitio alterno operativo (Querétaro)', ok: true },
    { item: 'Replicación síncrona activa', ok: true },
    { item: 'Failover automático configurado', ok: true },
    { item: 'Último simulacro exitoso (15 May)', ok: true },
    { item: 'Recuperación probada en sitio alterno', ok: false },
    { item: 'Comunicación de crisis actualizada', ok: true },
  ];

  const simulacros = [
    { fecha: '15 May 2026', tipo: 'Failover parcial', resultado: 'Exitoso', rto: '3h 42m', rpo: '45 min' },
    { fecha: '12 Abr 2026', tipo: 'Recuperación DB', resultado: 'Exitoso', rto: '2h 15m', rpo: '30 min' },
    { fecha: '08 Mar 2026', tipo: 'Failover completo', resultado: 'Parcial', rto: '5h 10m', rpo: '1h 15m' },
  ];

  const agentes = [
    { nombre: 'DRP IA', rol: 'Plan de recuperación', color: colores.exito },
    { nombre: 'Respaldo IA', rol: 'Gestión de backups', color: colores.primario },
    { nombre: 'Continuidad Ejecutiva', rol: 'Reportes y simulacros', color: '#8B5CF6' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: colores.fondoPrincipal }}>
      <div style={{ padding: isMobile ? '16px 16px 0' : '28px 32px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: `linear-gradient(135deg, ${colores.exito}, #059669)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <HardDrive size={16} color="#fff" />
          </div>
          <h2 style={{ fontSize: isMobile ? '18px' : '22px', fontWeight: '900', color: colores.textoClaro, margin: 0 }}>Continuidad, Backup y DRP</h2>
        </div>
        <p style={{ fontSize: '13px', color: colores.textoMedio, margin: '0 0 12px 0' }}>Estado de backup · Replicación · DRP · RTO · RPO · Simulacros</p>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {[
            { label: 'Score Continuidad', val: '92%', color: colores.exito },
            { label: 'Disponibilidad', val: '99.97%', color: colores.primario },
            { label: 'RTO actual', val: '< 4h', color: colores.advertencia },
            { label: 'RPO actual', val: '< 1h', color: colores.exito },
          ].map((k, i) => (
            <div key={i} style={{ padding: '8px 14px', borderRadius: '12px', textAlign: 'center', background: `${k.color}10`, border: `1px solid ${k.color}25`, flexShrink: 0 }}>
              <div style={{ fontSize: '16px', fontWeight: '800', color: k.color }}>{k.val}</div>
              <div style={{ fontSize: '10px', color: colores.textoMedio, whiteSpace: 'nowrap' }}>{k.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: `20px ${px} 32px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', gap: '20px', marginBottom: '20px' }}>
          {/* Disponibilidad chart */}
          <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: colores.textoClaro, margin: '0 0 16px 0' }}>
              <RefreshCw size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />Disponibilidad Histórica (%)
            </h3>
            <div style={{ height: '180px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={disponibilidadData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={`${colores.borde}44`} vertical={false} />
                  <XAxis dataKey="mes" tick={{ fontSize: 10, fill: colores.textoOscuro }} axisLine={false} tickLine={false} />
                  <YAxis domain={[99.9, 100]} tick={{ fontSize: 10, fill: colores.textoOscuro }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: colores.fondoSecundario, border: `1px solid ${colores.borde}`, borderRadius: '8px', fontSize: '11px' }} />
                  <Line type="monotone" dataKey="pct" stroke={colores.exito} strokeWidth={2} dot={{ fill: colores.exito, r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* DRP Checklist */}
          <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: colores.textoClaro, margin: '0 0 12px 0' }}>
              <Shield size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />Plan DRP
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {drpChecklist.map(d => (
                <div key={d.item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {d.ok ? <CheckCircle size={14} color={colores.exito} /> : <AlertTriangle size={14} color={colores.advertencia} />}
                  <span style={{ fontSize: '11px', color: d.ok ? colores.textoClaro : colores.advertencia, fontWeight: d.ok ? 400 : 600 }}>{d.item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Backups */}
        <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '700', color: colores.textoClaro, margin: '0 0 16px 0' }}>Estado de Backups</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr>{['Conjunto', 'Último backup', 'Tamaño', 'Retención', 'Estado'].map(h => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: colores.textoMedio, fontWeight: '600', borderBottom: `1px solid ${colores.borde}`, fontSize: '10px', textTransform: 'uppercase' }}>{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {backups.map(b => (
                  <tr key={b.nombre}>
                    <td style={{ padding: '10px 12px', borderBottom: `1px solid ${colores.borde}33`, fontWeight: '600', color: colores.textoClaro }}>{b.nombre}</td>
                    <td style={{ padding: '10px 12px', borderBottom: `1px solid ${colores.borde}33`, color: colores.textoMedio }}>{b.ultimo}</td>
                    <td style={{ padding: '10px 12px', borderBottom: `1px solid ${colores.borde}33`, color: colores.textoClaro }}>{b.tamaño}</td>
                    <td style={{ padding: '10px 12px', borderBottom: `1px solid ${colores.borde}33`, color: colores.textoMedio }}>{b.retencion}</td>
                    <td style={{ padding: '10px 12px', borderBottom: `1px solid ${colores.borde}33` }}>
                      {b.estado === 'ok'
                        ? <span style={{ color: colores.exito, fontWeight: '600', fontSize: '11px' }}><CheckCircle size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />OK</span>
                        : <span style={{ color: colores.advertencia, fontWeight: '600', fontSize: '11px' }}><Clock size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />Revisar</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
          {/* Simulacros */}
          <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: colores.textoClaro, margin: '0 0 12px 0' }}>Historial de Simulacros</h3>
            {simulacros.map(s => (
              <div key={s.fecha} style={{ padding: '12px', backgroundColor: colores.fondoTerciario, borderRadius: '12px', marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: colores.textoClaro }}>{s.tipo}</span>
                  <span style={{ fontSize: '10px', fontWeight: '700', color: s.resultado === 'Exitoso' ? colores.exito : colores.advertencia, backgroundColor: `${s.resultado === 'Exitoso' ? colores.exito : colores.advertencia}15`, padding: '2px 8px', borderRadius: '20px' }}>{s.resultado}</span>
                </div>
                <div style={{ display: 'flex', gap: '16px', fontSize: '10px', color: colores.textoMedio }}>
                  <span>{s.fecha}</span><span>RTO: {s.rto}</span><span>RPO: {s.rpo}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Agentes */}
          <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: colores.textoClaro, margin: '0 0 12px 0' }}>
              <Bot size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />Agentes IA
            </h3>
            {agentes.map(a => (
              <div key={a.nombre} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', backgroundColor: colores.fondoTerciario, borderRadius: '12px', marginBottom: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Bot size={14} color="white" /></div>
                <div style={{ flex: 1 }}><p style={{ fontSize: '12px', fontWeight: '700', color: colores.textoClaro, margin: 0 }}>{a.nombre}</p><p style={{ fontSize: '10px', color: colores.textoMedio, margin: 0 }}>{a.rol}</p></div>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: colores.exito }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
