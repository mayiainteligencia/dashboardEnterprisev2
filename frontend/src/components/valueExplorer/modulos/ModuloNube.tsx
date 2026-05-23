import React, { useState, useEffect } from 'react';
import { Cloud, ArrowLeft } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Cell } from 'recharts';
import { brandingConfig } from '../../../config/branding';
import { ModuloHeader, CtaButton, AgentesPanel, ServiciosList, KpiBadge } from '../ExplorerShared';
import { useExplorer } from '../ExplorerContext';

interface Props {
  onSectionChange?: (s: string) => void;
}

export const ModuloNube: React.FC<Props> = ({ onSectionChange }) => {
  const { colores } = brandingConfig;
  const { kpis, respuestas } = useExplorer();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth < 1024);
    c();
    window.addEventListener('resize', c);
    return () => window.removeEventListener('resize', c);
  }, []);

  const capacidadData = [
    { mes: 'Hoy', valor: 60 },
    { mes: '+3m', valor: 72 },
    { mes: '+6m', valor: 85 },
    { mes: '+12m', valor: 94 },
  ];

  const tipoNubeSugerida =
    respuestas.tipoNube === 'on-prem'
      ? 'Híbrida'
      : respuestas.tipoNube === 'publica'
      ? 'Híbrida soberana'
      : 'FLAI Soberana';

  return (
    <div style={{ minHeight: '100vh', background: colores.fondoPrincipal, padding: isMobile ? '16px' : '32px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <button
          onClick={() => onSectionChange?.('valueExplorer')}
          style={{ background: 'transparent', border: `1px solid ${colores.borde}`, borderRadius: '10px', padding: '8px 14px', cursor: 'pointer', fontSize: '12px', color: colores.textoMedio, display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}
        >
          <ArrowLeft size={14} /> Volver al Value Explorer
        </button>

        <ModuloHeader
          numero={3}
          titulo="Nube, IaaS y FLAI"
          microcopy="Infraestructura flexible y soberana para operar, crecer y habilitar IA."
          icono={<Cloud size={26} color="#fff" />}
        />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
          <KpiBadge valor={tipoNubeSugerida} label="Nube sugerida" color={colores.primario} />
          <KpiBadge valor={`${kpis.madurez}/100`} label="Capacidad preparada" color={colores.exito} />
          <KpiBadge valor={`+${kpis.roi}%`} label="Ahorro operativo est." color={colores.acento} />
          <KpiBadge valor={kpis.riesgo === 'Bajo' ? 'Alto' : 'Medio'} label="Control de datos" color={colores.primarioOscuro} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: colores.textoClaro, margin: '0 0 14px 0' }}>
              Trayectoria de capacidad recomendada
            </h3>
            <div style={{ height: '240px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={capacidadData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={`${colores.borde}44`} vertical={false} />
                  <XAxis dataKey="mes" tick={{ fontSize: 11, fill: colores.textoOscuro }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: colores.textoOscuro }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: colores.fondoSecundario, border: `1px solid ${colores.borde}`, borderRadius: '8px', fontSize: '11px' }} />
                  <Bar dataKey="valor" radius={[6, 6, 0, 0]}>
                    {capacidadData.map((_, i) => (
                      <Cell key={i} fill={i === capacidadData.length - 1 ? colores.acento : colores.primario} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ marginTop: '14px' }}>
              <CtaButton label="Diseñar arquitectura de nube" onClick={() => onSectionChange?.('explorerWizard')} />
            </div>
          </div>

          <AgentesPanel
            agentes={[
              { nombre: 'Cloud Advisor', rol: 'Diseño y dimensionamiento', color: colores.primario },
              { nombre: 'FinOps', rol: 'Monitoreo de consumo y ahorro', color: colores.exito },
              { nombre: 'Arquitectura Híbrida', rol: 'Integración on-prem ↔ nube', color: '#8B5CF6' },
            ]}
          />
        </div>

        <ServiciosList
          titulo="Servicios incluidos"
          servicios={[
            'FLAI · Nube soberana',
            'IaaS y servidores virtuales',
            'Ambientes híbridos',
            'Almacenamiento gestionado',
            'Capacidad bajo demanda',
            'Ambientes para apps críticas',
            'Ambientes analítica / IA',
            'Gobierno de nube',
            'Monitoreo de consumo',
            'FinOps gestionado',
          ]}
        />
      </div>
    </div>
  );
};
