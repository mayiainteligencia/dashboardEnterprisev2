import React, { useState, useEffect } from 'react';
import { Database, Layers, FileSearch, Lock, Bot, AlertTriangle, CheckCircle } from 'lucide-react';
import { brandingConfig } from '../../config/branding';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export const MapaDatos: React.FC = () => {
  const { colores } = brandingConfig;
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => { const c = () => setIsMobile(window.innerWidth < 1024); c(); window.addEventListener('resize', c); return () => window.removeEventListener('resize', c); }, []);
  const px = isMobile ? '16px' : '32px';

  const clasificacion = [
    { name: 'Confidencial', value: 35, color: colores.peligro },
    { name: 'Interno', value: 40, color: colores.advertencia },
    { name: 'Público', value: 15, color: colores.exito },
    { name: 'Sin clasificar', value: 10, color: colores.textoOscuro },
  ];

  const datasets = [
    { nombre: 'Transacciones financieras', registros: '14.2M', calidad: 96, sensibilidad: 'Alta', formato: 'SQL', oportunidad: 'Predicción de flujo de caja' },
    { nombre: 'Logs de infraestructura', registros: '890M', calidad: 88, sensibilidad: 'Media', formato: 'JSON', oportunidad: 'Detección de anomalías' },
    { nombre: 'Datos de clientes', registros: '2.1M', calidad: 92, sensibilidad: 'Alta', formato: 'SQL', oportunidad: 'Segmentación y churn' },
    { nombre: 'Telemetría IoT', registros: '45.6M', calidad: 78, sensibilidad: 'Baja', formato: 'Time Series', oportunidad: 'Mantenimiento predictivo' },
    { nombre: 'Documentos corporativos', registros: '340K', calidad: 71, sensibilidad: 'Alta', formato: 'Blob', oportunidad: 'RAG / Knowledge Base' },
    { nombre: 'Registros de RRHH', registros: '45K', calidad: 94, sensibilidad: 'Alta', formato: 'SQL', oportunidad: 'Análisis de retención' },
  ];

  const dependencias = [
    { origen: 'Transacciones', destino: 'Dashboard ejecutivo', tipo: 'ETL diario' },
    { origen: 'Logs infra', destino: 'SOC IA', tipo: 'Streaming' },
    { origen: 'Clientes', destino: 'Marketing IA', tipo: 'ETL semanal' },
    { origen: 'IoT', destino: 'NOC IA', tipo: 'Streaming' },
  ];

  const agentes = [
    { nombre: 'Data Value IA', rol: 'Valoración de datos', color: '#8B5CF6' },
    { nombre: 'Data Readiness', rol: 'Preparación para IA', color: colores.primario },
    { nombre: 'Gobierno de Datos', rol: 'Políticas y permisos', color: colores.exito },
    { nombre: 'Calidad de Datos', rol: 'Monitoreo de calidad', color: colores.advertencia },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: colores.fondoPrincipal }}>
      <div style={{ padding: isMobile ? '16px 16px 0' : '28px 32px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Database size={16} color="#fff" />
          </div>
          <h2 style={{ fontSize: isMobile ? '18px' : '22px', fontWeight: '900', color: colores.textoClaro, margin: 0 }}>Mapa Inteligente de Datos</h2>
        </div>
        <p style={{ fontSize: '13px', color: colores.textoMedio, margin: '0 0 12px 0' }}>Inventario · Clasificación · Calidad · Disponibilidad · Sensibilidad · Oportunidades</p>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {[
            { label: 'Datasets', val: '142', color: '#8B5CF6' },
            { label: 'Registros totales', val: '952M', color: colores.primario },
            { label: 'Calidad promedio', val: '89%', color: colores.exito },
            { label: 'Sin clasificar', val: '10%', color: colores.advertencia },
          ].map((k, i) => (
            <div key={i} style={{ padding: '8px 14px', borderRadius: '12px', textAlign: 'center', background: `${k.color}10`, border: `1px solid ${k.color}25`, flexShrink: 0 }}>
              <div style={{ fontSize: '16px', fontWeight: '800', color: k.color }}>{k.val}</div>
              <div style={{ fontSize: '10px', color: colores.textoMedio, whiteSpace: 'nowrap' }}>{k.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: `20px ${px} 32px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: '20px', marginBottom: '20px' }}>
          {/* Clasificación pie */}
          <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: colores.textoClaro, margin: '0 0 16px 0' }}>
              <Lock size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />Clasificación de Datos
            </h3>
            <div style={{ height: '180px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={clasificacion} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={3}>
                    {clasificacion.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: colores.fondoSecundario, border: `1px solid ${colores.borde}`, borderRadius: '8px', fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
              {clasificacion.map(c => (
                <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: colores.textoMedio }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: c.color }} />
                  {c.name} ({c.value}%)
                </div>
              ))}
            </div>
          </div>

          {/* Datasets table */}
          <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: colores.textoClaro, margin: '0 0 16px 0' }}>
              <Layers size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />Inventario de Datasets
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                <thead><tr>{['Dataset', 'Registros', 'Calidad', 'Sensibilidad', 'Oportunidad IA'].map(h => (
                  <th key={h} style={{ padding: '8px 10px', textAlign: 'left', color: colores.textoMedio, fontWeight: '600', borderBottom: `1px solid ${colores.borde}`, fontSize: '9px', textTransform: 'uppercase' }}>{h}</th>
                ))}</tr></thead>
                <tbody>{datasets.map(d => (
                  <tr key={d.nombre}>
                    <td style={{ padding: '8px 10px', borderBottom: `1px solid ${colores.borde}33`, fontWeight: '600', color: colores.textoClaro }}>{d.nombre}</td>
                    <td style={{ padding: '8px 10px', borderBottom: `1px solid ${colores.borde}33`, color: colores.textoMedio }}>{d.registros}</td>
                    <td style={{ padding: '8px 10px', borderBottom: `1px solid ${colores.borde}33` }}>
                      <span style={{ color: d.calidad >= 90 ? colores.exito : d.calidad >= 80 ? colores.advertencia : colores.peligro, fontWeight: '700' }}>{d.calidad}%</span>
                    </td>
                    <td style={{ padding: '8px 10px', borderBottom: `1px solid ${colores.borde}33` }}>
                      <span style={{ fontSize: '9px', fontWeight: '700', color: d.sensibilidad === 'Alta' ? colores.peligro : d.sensibilidad === 'Media' ? colores.advertencia : colores.exito, backgroundColor: `${d.sensibilidad === 'Alta' ? colores.peligro : d.sensibilidad === 'Media' ? colores.advertencia : colores.exito}15`, padding: '2px 6px', borderRadius: '8px' }}>{d.sensibilidad}</span>
                    </td>
                    <td style={{ padding: '8px 10px', borderBottom: `1px solid ${colores.borde}33`, color: '#8B5CF6', fontWeight: '500', fontSize: '10px' }}>{d.oportunidad}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
          {/* Dependencias */}
          <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: colores.textoClaro, margin: '0 0 12px 0' }}>
              <FileSearch size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />Dependencias de Datos
            </h3>
            {dependencias.map(d => (
              <div key={d.origen} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', backgroundColor: colores.fondoTerciario, borderRadius: '12px', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: '600', color: colores.textoClaro, flex: 1 }}>{d.origen}</span>
                <span style={{ fontSize: '10px', color: colores.textoMedio }}>→</span>
                <span style={{ fontSize: '11px', fontWeight: '600', color: '#8B5CF6', flex: 1 }}>{d.destino}</span>
                <span style={{ fontSize: '9px', color: colores.textoMedio, backgroundColor: colores.fondoSecundario, padding: '2px 8px', borderRadius: '20px' }}>{d.tipo}</span>
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
