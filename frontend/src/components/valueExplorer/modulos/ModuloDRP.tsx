import React, { useState, useEffect } from 'react';
import { HardDriveDownload, ArrowLeft } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';
import { ModuloHeader, CtaButton, AgentesPanel, ServiciosList, KpiBadge, KpiCircle } from '../ExplorerShared';
import { useExplorer } from '../ExplorerContext';

interface Props {
  onSectionChange?: (s: string) => void;
}

export const ModuloDRP: React.FC<Props> = ({ onSectionChange }) => {
  const { colores } = brandingConfig;
  const { kpis, respuestas } = useExplorer();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth < 1024);
    c();
    window.addEventListener('resize', c);
    return () => window.removeEventListener('resize', c);
  }, []);

  const rtoMax = respuestas.respaldosDRP === 'si' ? '4 h' : respuestas.respaldosDRP === 'parcial' ? '12 h' : '48 h';
  const rpoMax = respuestas.respaldosDRP === 'si' ? '15 min' : respuestas.respaldosDRP === 'parcial' ? '4 h' : '24 h';
  const madurez = respuestas.respaldosDRP === 'si' ? 'Avanzada' : respuestas.respaldosDRP === 'parcial' ? 'Media' : 'Inicial';

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
          numero={6}
          titulo="DRP, Backup y Continuidad"
          microcopy="Prepare su empresa para operar ante contingencias con planes probados y medibles."
          icono={<HardDriveDownload size={26} color="#fff" />}
          color={colores.exito}
        />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
          <KpiBadge valor={rtoMax} label="RTO máximo tolerable" color={colores.primario} />
          <KpiBadge valor={rpoMax} label="RPO frecuencia respaldo" color={colores.acento} />
          <KpiBadge valor={madurez} label="Madurez continuidad" color={colores.exito} />
          <KpiBadge valor={kpis.riesgo} label="Impacto financiero estimado" color={kpis.riesgo === 'Alto' ? colores.peligro : kpis.riesgo === 'Medio' ? colores.advertencia : colores.exito} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: colores.textoClaro, margin: '0 0 14px 0' }}>
              Ruta de continuidad sugerida
            </h3>
            <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { p: 'BIA — Análisis de impacto al negocio', d: 'Identificamos los procesos y datos críticos' },
                { p: 'Política de respaldo y replicación', d: 'Diseño de RPO/RTO objetivos por sistema' },
                { p: 'DRP / DRaaS implementado', d: 'Sitio alterno y orquestación de failover' },
                { p: 'Pruebas de recuperación', d: 'Simulacros y mejora continua' },
                { p: 'Plan ejecutivo de continuidad', d: 'Procedimientos y responsables documentados' },
              ].map((s, i) => (
                <li
                  key={s.p}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '12px',
                    backgroundColor: colores.fondoTerciario,
                    borderRadius: '12px',
                    alignItems: 'flex-start',
                  }}
                >
                  <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: colores.gradientePrimario, color: '#fff', fontSize: '12px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {i + 1}
                  </span>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: colores.textoClaro, margin: 0 }}>{s.p}</p>
                    <p style={{ fontSize: '11px', color: colores.textoMedio, margin: '2px 0 0 0' }}>{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div style={{ marginTop: '14px' }}>
              <CtaButton label="Calcular mi nivel de continuidad" onClick={() => onSectionChange?.('explorerWizard')} color={colores.exito} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-around', backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px' }}>
              <KpiCircle valor={kpis.continuidad} label="Resiliencia" color={colores.exito} size={110} />
              <KpiCircle valor={kpis.madurez} label="Madurez DRP" color={colores.primario} size={110} />
            </div>
            <AgentesPanel
              agentes={[
                { nombre: 'DRP Advisor', rol: 'Diseño del plan de recuperación', color: colores.exito },
                { nombre: 'Backup', rol: 'Política y operación de respaldos', color: colores.primario },
                { nombre: 'Impacto Operativo', rol: 'BIA y RTO/RPO', color: colores.acento },
              ]}
            />
          </div>
        </div>

        <ServiciosList
          titulo="Servicios incluidos"
          servicios={[
            'Backup gestionado',
            'Replicación',
            'DRP / DRaaS',
            'Pruebas de recuperación',
            'Continuidad multisede',
            'BIA',
            'Definición RTO / RPO',
            'Simulacros',
            'Reportes y evidencias',
            'Planes documentados',
            'Operación ante contingencia',
          ]}
          color={colores.exito}
        />
      </div>
    </div>
  );
};
