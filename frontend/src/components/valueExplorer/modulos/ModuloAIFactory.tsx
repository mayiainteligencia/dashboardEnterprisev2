import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';
import { ModuloHeader, CtaButton, AgentesPanel, ServiciosList, KpiBadge } from '../ExplorerShared';
import { useExplorer } from '../ExplorerContext';

interface Props {
  onSectionChange?: (s: string) => void;
}

const CASOS_USO = [
  { area: 'Dirección', caso: 'Decision Room con IA — síntesis ejecutiva en minutos' },
  { area: 'Finanzas', caso: 'Predicción de flujo, detección de anomalías y forecasting' },
  { area: 'Operaciones', caso: 'Mantenimiento predictivo y planeación inteligente' },
  { area: 'Comercial', caso: 'Lead scoring, segmentación y next-best-action' },
  { area: 'RH', caso: 'Análisis de rotación, retención y skills mapping' },
  { area: 'Legal', caso: 'Revisión asistida de contratos y RAG empresarial' },
  { area: 'Seguridad', caso: 'Análisis de eventos con IA y respuesta automatizada' },
];

export const ModuloAIFactory: React.FC<Props> = ({ onSectionChange }) => {
  const { colores } = brandingConfig;
  const { kpis } = useExplorer();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth < 1024);
    c();
    window.addEventListener('resize', c);
    return () => window.removeEventListener('resize', c);
  }, []);

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
          numero={7}
          titulo="AI Factory y Agentes para Negocio"
          microcopy="Convierta sus datos en inteligencia empresarial: agentes, predicción, automatización y decisión."
          icono={<Sparkles size={26} color="#fff" />}
          color="#8B5CF6"
        />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
          <KpiBadge valor={`${kpis.valorDato}/100`} label="AI Readiness" color="#8B5CF6" />
          <KpiBadge valor={`+${kpis.roi}%`} label="ROI esperado IA" color={colores.acento} />
          <KpiBadge valor={CASOS_USO.length.toString()} label="Casos de uso" color={colores.primario} />
          <KpiBadge valor="3" label="Agentes recomendados" color={colores.exito} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: colores.textoClaro, margin: '0 0 14px 0' }}>
              Casos de uso por área de negocio
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '8px 12px', textAlign: 'left', color: colores.textoMedio, fontWeight: 700, borderBottom: `1px solid ${colores.borde}`, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Área</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', color: colores.textoMedio, fontWeight: 700, borderBottom: `1px solid ${colores.borde}`, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Caso recomendado</th>
                  </tr>
                </thead>
                <tbody>
                  {CASOS_USO.map((c) => (
                    <tr key={c.area}>
                      <td style={{ padding: '10px 12px', borderBottom: `1px solid ${colores.borde}33`, fontWeight: 700, color: colores.textoClaro }}>{c.area}</td>
                      <td style={{ padding: '10px 12px', borderBottom: `1px solid ${colores.borde}33`, color: colores.textoMedio }}>{c.caso}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: '14px' }}>
              <CtaButton label="Descubrir casos de IA para mi empresa" onClick={() => onSectionChange?.('explorerWizard')} color="#8B5CF6" />
            </div>
          </div>

          <AgentesPanel
            agentes={[
              { nombre: 'AI Readiness', rol: 'Evalúa preparación para IA', color: '#8B5CF6' },
              { nombre: 'Casos de Uso', rol: 'Identifica oportunidades por área', color: colores.primario },
              { nombre: 'Automatización', rol: 'Workflows y RPA con IA', color: colores.acento },
              { nombre: 'Predictivo', rol: 'Modelos y forecasting', color: colores.exito },
            ]}
          />
        </div>

        <ServiciosList
          titulo="Servicios incluidos"
          servicios={[
            'AI Readiness Assessment',
            'Data Value Assessment',
            'PoC Lab',
            'Agentes de IA empresariales',
            'Modelos predictivos',
            'Analítica avanzada',
            'Automatización',
            'RAG empresarial',
            'Dashboards inteligentes',
            'AI Decision Room',
            'Data Monetization Lab',
            'AI Factory Managed Services',
          ]}
          color="#8B5CF6"
        />
      </div>
    </div>
  );
};
