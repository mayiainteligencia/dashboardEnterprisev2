import React, { useState, useEffect } from 'react';
import { Database, ArrowLeft } from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import { brandingConfig } from '../../../config/branding';
import { ModuloHeader, CtaButton, AgentesPanel, ServiciosList } from '../ExplorerShared';
import { useExplorer } from '../ExplorerContext';

interface Props {
  onSectionChange?: (s: string) => void;
}

export const ModuloValorDato: React.FC<Props> = ({ onSectionChange }) => {
  const { colores } = brandingConfig;
  const { kpis } = useExplorer();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth < 1024);
    c();
    window.addEventListener('resize', c);
    return () => window.removeEventListener('resize', c);
  }, []);

  const dimensiones = [
    { dim: 'Protección', valor: 100 - (kpis.riesgo === 'Alto' ? 70 : kpis.riesgo === 'Medio' ? 45 : 20) },
    { dim: 'Disponibilidad', valor: kpis.continuidad },
    { dim: 'Organización', valor: kpis.madurez },
    { dim: 'Inteligencia', valor: kpis.valorDato },
    { dim: 'Valor de negocio', valor: 60 + kpis.roi },
  ];

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
          numero={2}
          titulo="Valor Estratégico del Dato"
          microcopy="Sus datos pueden trabajar para su empresa. Evaluamos cinco dimensiones para activar su potencial."
          icono={<Database size={26} color="#fff" />}
        />

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: colores.textoClaro, margin: '0 0 14px 0' }}>
              Mapa de valor — 5 dimensiones
            </h3>
            <div style={{ height: '320px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={dimensiones}>
                  <PolarGrid stroke={`${colores.borde}88`} />
                  <PolarAngleAxis dataKey="dim" tick={{ fill: colores.textoMedio, fontSize: 11 }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={{ fill: colores.textoOscuro, fontSize: 9 }} angle={90} />
                  <Radar
                    name="Valor"
                    dataKey="valor"
                    stroke={colores.primario}
                    fill={colores.primario}
                    fillOpacity={0.35}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ marginTop: '14px' }}>
              <CtaButton label="Evaluar valor de mis datos" onClick={() => onSectionChange?.('explorerWizard')} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: colores.textoClaro, margin: '0 0 12px 0' }}>
                Beneficios estratégicos
              </h3>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  'Datos protegidos como activo crítico',
                  'Inteligencia accionable en tiempo real',
                  'Decisiones con evidencia, no intuición',
                  'Monetización y nuevos modelos de negocio',
                  'Reducción de riesgo y cumplimiento',
                ].map((b) => (
                  <li
                    key={b}
                    style={{
                      padding: '10px 12px',
                      backgroundColor: colores.fondoTerciario,
                      borderRadius: '10px',
                      fontSize: '12px',
                      color: colores.textoClaro,
                      borderLeft: `3px solid ${colores.acento}`,
                    }}
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: '20px' }}>
          <ServiciosList
            titulo="Servicios incluidos"
            servicios={[
              'Data Value Assessment',
              'Gobierno de datos',
              'Limpieza y normalización',
              'Repositorio empresarial unificado',
              'Casos de uso priorizados',
              'ROI por iniciativa de datos',
            ]}
            color={colores.acento}
          />
          <AgentesPanel
            agentes={[
              { nombre: 'Data Value', rol: 'Evaluación del activo dato', color: colores.acento },
              { nombre: 'ROI Digital', rol: 'Cuantifica retorno potencial', color: colores.exito },
              { nombre: 'Casos de Uso', rol: 'Identifica oportunidades', color: '#8B5CF6' },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
