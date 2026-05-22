import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, Eye, Lock, FileCheck, Bot, TrendingDown } from 'lucide-react';
import { brandingConfig } from '../../config/branding';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Cell } from 'recharts';

export const SeguridadSOC: React.FC = () => {
  const { colores } = brandingConfig;
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => { const c = () => setIsMobile(window.innerWidth < 1024); c(); window.addEventListener('resize', c); return () => window.removeEventListener('resize', c); }, []);
  const px = isMobile ? '16px' : '32px';

  const eventosData = [
    { dia: 'Lun', eventos: 145 }, { dia: 'Mar', eventos: 132 }, { dia: 'Mié', eventos: 178 },
    { dia: 'Jue', eventos: 112 }, { dia: 'Vie', eventos: 198 }, { dia: 'Sáb', eventos: 87 }, { dia: 'Dom', eventos: 64 },
  ];

  const alertas = [
    { id: 1, tipo: 'critica', titulo: 'Intento de acceso no autorizado', origen: 'Firewall Norte', tiempo: '12 min', detalle: 'IP 192.168.x.x intentó acceso a puerto restringido' },
    { id: 2, tipo: 'alta', titulo: 'Vulnerabilidad CVE-2026-1847', origen: 'Scanner', tiempo: '2h', detalle: 'Afecta servidor web principal — parche disponible' },
    { id: 3, tipo: 'media', titulo: 'Certificado SSL próximo a expirar', origen: 'Monitor SSL', tiempo: '6h', detalle: 'Portal B expira en 14 días' },
    { id: 4, tipo: 'baja', titulo: 'Actualización de firma antivirus', origen: 'Endpoint', tiempo: '12h', detalle: '3 endpoints pendientes de actualización' },
  ];

  const cumplimiento = [
    { norma: 'ISO 27001', score: 94, items: '142/151', color: colores.exito },
    { norma: 'PCI DSS', score: 88, items: '234/266', color: colores.primario },
    { norma: 'LFPDPPP', score: 91, items: '87/96', color: colores.exito },
    { norma: 'SOC 2 Type II', score: 85, items: '198/233', color: colores.advertencia },
  ];

  const nivelColor: Record<string, string> = { critica: colores.peligro, alta: colores.advertencia, media: '#3B82F6', baja: colores.exito };

  const agentes = [
    { nombre: 'SOC IA', rol: 'Monitoreo y respuesta 24/7', color: colores.peligro },
    { nombre: 'CISO Virtual', rol: 'Estrategia de seguridad', color: '#8B5CF6' },
    { nombre: 'Cumplimiento IA', rol: 'Auditoría y normatividad', color: colores.exito },
    { nombre: 'Vulnerabilidades IA', rol: 'Escaneo y remediación', color: colores.advertencia },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: colores.fondoPrincipal }}>
      <div style={{ padding: isMobile ? '16px 16px 0' : '28px 32px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: `linear-gradient(135deg, ${colores.peligro}, ${colores.advertencia})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield size={16} color="#fff" />
          </div>
          <h2 style={{ fontSize: isMobile ? '18px' : '22px', fontWeight: '900', color: colores.textoClaro, margin: 0 }}>Seguridad, SOC IA y Cumplimiento</h2>
        </div>
        <p style={{ fontSize: '13px', color: colores.textoMedio, margin: '0 0 12px 0' }}>Estado de seguridad · Alertas · Vulnerabilidades · SOC · Cumplimiento normativo</p>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '4px' }}>
          {[
            { label: 'Alertas activas', val: '4', color: colores.peligro },
            { label: 'Eventos / 24h', val: '1,247', color: colores.advertencia },
            { label: 'Cumplimiento', val: '91%', color: colores.exito },
            { label: 'Vulns abiertas', val: '3', color: '#3B82F6' },
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
          {/* Eventos chart */}
          <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Eye size={16} color={colores.peligro} />
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: colores.textoClaro, margin: 0 }}>Eventos de Seguridad (7 días)</h3>
              <span style={{ marginLeft: 'auto', fontSize: '10px', color: colores.exito, fontWeight: '700', backgroundColor: `${colores.exito}15`, padding: '3px 8px', borderRadius: '20px' }}>
                <TrendingDown size={10} style={{ verticalAlign: 'middle' }} /> -12% vs semana anterior
              </span>
            </div>
            <div style={{ height: '200px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={eventosData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={`${colores.borde}44`} vertical={false} />
                  <XAxis dataKey="dia" tick={{ fontSize: 10, fill: colores.textoOscuro }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: colores.textoOscuro }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: colores.fondoSecundario, border: `1px solid ${colores.borde}`, borderRadius: '8px', fontSize: '11px', color: colores.textoClaro }} />
                  <Bar dataKey="eventos" radius={[4, 4, 0, 0]}>
                    {eventosData.map((d, i) => <Cell key={i} fill={d.eventos > 150 ? colores.peligro : `${colores.peligro}40`} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Actividad SOC */}
          <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: colores.textoClaro, margin: '0 0 12px 0' }}>
              <Lock size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />Actividad SOC
            </h3>
            {[
              { label: 'Incidentes investigados', val: '23', color: colores.peligro },
              { label: 'Amenazas bloqueadas', val: '847', color: colores.exito },
              { label: 'Tiempo medio respuesta', val: '< 8 min', color: colores.primario },
              { label: 'Reglas activas', val: '1,240', color: '#8B5CF6' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${colores.borde}33` }}>
                <span style={{ fontSize: '12px', color: colores.textoMedio }}>{s.label}</span>
                <span style={{ fontSize: '14px', fontWeight: '800', color: s.color }}>{s.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alertas */}
        <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '700', color: colores.textoClaro, margin: '0 0 12px 0' }}>
            <AlertTriangle size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />Alertas Activas
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {alertas.map(a => (
              <div key={a.id} style={{ padding: '12px 14px', backgroundColor: colores.fondoTerciario, borderRadius: '12px', borderLeft: `4px solid ${nivelColor[a.tipo]}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: colores.textoClaro }}>{a.titulo}</span>
                  <span style={{ fontSize: '9px', fontWeight: '700', color: nivelColor[a.tipo], backgroundColor: `${nivelColor[a.tipo]}15`, padding: '3px 8px', borderRadius: '20px', flexShrink: 0, marginLeft: '8px' }}>{a.tipo}</span>
                </div>
                <p style={{ fontSize: '11px', color: colores.textoMedio, margin: '0 0 4px 0' }}>{a.detalle}</p>
                <div style={{ display: 'flex', gap: '12px', fontSize: '10px', color: colores.textoOscuro }}>
                  <span>Origen: {a.origen}</span>
                  <span>Hace {a.tiempo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
          {/* Cumplimiento */}
          <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: colores.textoClaro, margin: '0 0 12px 0' }}>
              <FileCheck size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />Cumplimiento Normativo
            </h3>
            {cumplimiento.map(c => (
              <div key={c.norma} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: colores.textoClaro }}>{c.norma}</span>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: c.color }}>{c.score}%</span>
                </div>
                <div style={{ height: '6px', borderRadius: '3px', backgroundColor: `${colores.borde}44`, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${c.score}%`, borderRadius: '3px', backgroundColor: c.color }} />
                </div>
                <span style={{ fontSize: '9px', color: colores.textoMedio }}>{c.items} controles verificados</span>
              </div>
            ))}
          </div>

          {/* Agentes */}
          <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: colores.textoClaro, margin: '0 0 12px 0' }}>
              <Bot size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />Agentes IA y Especialistas
            </h3>
            {agentes.map(a => (
              <div key={a.nombre} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', backgroundColor: colores.fondoTerciario, borderRadius: '12px', marginBottom: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bot size={14} color="white" />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '12px', fontWeight: '700', color: colores.textoClaro, margin: 0 }}>{a.nombre}</p>
                  <p style={{ fontSize: '10px', color: colores.textoMedio, margin: 0 }}>{a.rol}</p>
                </div>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: colores.exito }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
