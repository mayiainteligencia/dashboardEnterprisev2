import React, { useState, useEffect } from 'react';
import { Activity, ArrowLeft } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';
import { ModuloHeader, CtaButton, AgentesPanel, KpiCircle } from '../ExplorerShared';
import { useExplorer } from '../ExplorerContext';

interface Props {
  onSectionChange?: (s: string) => void;
}

export const ModuloDiagnostico: React.FC<Props> = ({ onSectionChange }) => {
  const { colores } = brandingConfig;
  const { kpis, respuestas } = useExplorer();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth < 1024);
    c();
    window.addEventListener('resize', c);
    return () => window.removeEventListener('resize', c);
  }, []);

  const dimensiones = [
    { label: 'Infraestructura', valor: kpis.continuidad },
    { label: 'Nube / IaaS', valor: kpis.madurez },
    { label: 'Continuidad', valor: kpis.continuidad },
    { label: 'Ciberseguridad', valor: 100 - (kpis.riesgo === 'Alto' ? 80 : kpis.riesgo === 'Medio' ? 55 : 30) },
    { label: 'Datos / inteligencia', valor: kpis.valorDato },
    { label: 'IA', valor: kpis.valorDato },
    { label: 'Gobierno de datos', valor: kpis.madurez },
    { label: 'ROI potencial', valor: 50 + kpis.roi * 2 },
  ];

  return (
    <div style={{ minHeight: '100vh', background: colores.fondoPrincipal, padding: isMobile ? '16px' : '32px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <button
          onClick={() => onSectionChange?.('valueExplorer')}
          style={{
            background: 'transparent',
            border: `1px solid ${colores.borde}`,
            borderRadius: '10px',
            padding: '8px 14px',
            cursor: 'pointer',
            fontSize: '12px',
            color: colores.textoMedio,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '14px',
          }}
        >
          <ArrowLeft size={14} /> Volver al Value Explorer
        </button>

        <ModuloHeader
          numero={1}
          titulo="Diagnóstico Inteligente de Empresa"
          microcopy="Conozca su punto de partida digital. Una evaluación preliminar por dimensiones para identificar oportunidades."
          icono={<Activity size={26} color="#fff" />}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr',
            gap: '20px',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              backgroundColor: colores.fondoSecundario,
              borderRadius: '20px',
              border: `1px solid ${colores.borde}`,
              padding: '20px',
            }}
          >
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: colores.textoClaro, margin: '0 0 14px 0' }}>
              Preguntas del diagnóstico breve
            </h3>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                'Industria y tamaño de su empresa',
                'Sedes y operación geográfica',
                '¿Dónde residen sus datos hoy?',
                'Sistemas críticos / alta disponibilidad',
                'Respaldos y DRP en operación',
                'Operación 24/7 requerida',
                'Tipo de nube actual (pública, privada, híbrida)',
                '¿Mide riesgos de ciberseguridad?',
                'Proyectos de IA / analítica avanzada',
                '¿Datos organizados para decisiones?',
              ].map((p, i) => (
                <li
                  key={p}
                  style={{
                    padding: '10px 12px',
                    backgroundColor: colores.fondoTerciario,
                    borderRadius: '10px',
                    fontSize: '12px',
                    color: colores.textoClaro,
                    borderLeft: `3px solid ${colores.primario}`,
                  }}
                >
                  <strong style={{ color: colores.primario, marginRight: '6px' }}>0{i + 1}</strong>
                  {p}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: '18px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <CtaButton label="Generar diagnóstico preliminar" onClick={() => onSectionChange?.('explorerWizard')} />
              {Object.keys(respuestas).length > 0 && (
                <span style={{ fontSize: '11px', color: colores.textoMedio, alignSelf: 'center' }}>
                  · Respuestas previas guardadas
                </span>
              )}
            </div>
          </div>

          <div
            style={{
              backgroundColor: colores.fondoSecundario,
              borderRadius: '20px',
              border: `1px solid ${colores.borde}`,
              padding: '20px',
            }}
          >
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: colores.textoClaro, margin: '0 0 14px 0' }}>
              Nivel preliminar por dimensión
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {dimensiones.map((d) => (
                <div key={d.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: colores.textoMedio, marginBottom: '4px' }}>
                    <span>{d.label}</span>
                    <strong style={{ color: colores.textoClaro }}>{Math.min(100, Math.max(0, Math.round(d.valor)))}/100</strong>
                  </div>
                  <div style={{ height: '8px', borderRadius: '4px', backgroundColor: colores.fondoTerciario, overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${Math.min(100, Math.max(0, d.valor))}%`,
                        background: colores.gradientePrimario,
                        borderRadius: '4px',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
          <div
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              backgroundColor: colores.fondoSecundario,
              borderRadius: '20px',
              border: `1px solid ${colores.borde}`,
              padding: '20px',
            }}
          >
            <KpiCircle valor={kpis.madurez} label="Madurez digital" color={colores.primario} size={100} />
            <KpiCircle valor={kpis.continuidad} label="Continuidad" color={colores.exito} size={100} />
            <KpiCircle valor={kpis.valorDato} label="Valor del dato" color="#8B5CF6" size={100} />
          </div>

          <AgentesPanel
            agentes={[
              { nombre: 'Diagnóstico Estratégico', rol: 'Coordinador del proceso', color: colores.primario },
              { nombre: 'Comercial Consultivo', rol: 'Interpreta resultados', color: colores.acento },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
