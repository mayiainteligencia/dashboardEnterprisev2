import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';
import { ModuloHeader, CtaButton, AgentesPanel, ServiciosList, KpiBadge, KpiCircle } from '../ExplorerShared';
import { useExplorer } from '../ExplorerContext';

interface Props {
  onSectionChange?: (s: string) => void;
}

export const ModuloSOC: React.FC<Props> = ({ onSectionChange }) => {
  const { colores } = brandingConfig;
  const { kpis, respuestas } = useExplorer();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth < 1024);
    c();
    window.addEventListener('resize', c);
    return () => window.removeEventListener('resize', c);
  }, []);

  const exposicionPct = kpis.riesgo === 'Alto' ? 78 : kpis.riesgo === 'Medio' ? 52 : 28;
  const monitoreoActual = respuestas.mideRiesgosCiber === 'si' ? 'Avanzado' : respuestas.mideRiesgosCiber === 'parcial' ? 'Parcial' : 'Bajo';

  const prioridades = [
    { label: 'Identidades y accesos', valor: 75 },
    { label: 'Protección de endpoints', valor: 68 },
    { label: 'Red y perímetro', valor: 72 },
    { label: 'Visibilidad y SIEM', valor: kpis.madurez },
    { label: 'Datos sensibles (DLP)', valor: kpis.valorDato },
    { label: 'Cumplimiento normativo', valor: 60 },
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
          numero={5}
          titulo="SOC IA y Ciberseguridad"
          microcopy="Protección inteligente, continua y evidenciada para su operación digital."
          icono={<ShieldCheck size={26} color="#fff" />}
          color={colores.peligro}
        />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
          <KpiBadge valor={kpis.riesgo} label="Exposición preliminar" color={kpis.riesgo === 'Alto' ? colores.peligro : kpis.riesgo === 'Medio' ? colores.advertencia : colores.exito} />
          <KpiBadge valor={monitoreoActual} label="Nivel monitoreo actual" color={colores.primario} />
          <KpiBadge valor={`${100 - exposicionPct}%`} label="Cobertura estimada" color={colores.exito} />
          <KpiBadge valor="Alta" label="Prioridad de protección" color={colores.acento} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: colores.textoClaro, margin: '0 0 14px 0' }}>
              Prioridades de protección
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {prioridades.map((p) => (
                <div key={p.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: colores.textoMedio, marginBottom: '4px' }}>
                    <span>{p.label}</span>
                    <strong style={{ color: colores.textoClaro }}>{Math.min(100, Math.max(0, Math.round(p.valor)))}%</strong>
                  </div>
                  <div style={{ height: '8px', borderRadius: '4px', backgroundColor: colores.fondoTerciario, overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${Math.min(100, Math.max(0, p.valor))}%`,
                        background: `linear-gradient(90deg, ${colores.peligro}, ${colores.advertencia})`,
                        borderRadius: '4px',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '14px' }}>
              <CtaButton label="Solicitar evaluación de ciberseguridad" onClick={() => onSectionChange?.('explorerWizard')} color={colores.peligro} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-around', backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px' }}>
              <KpiCircle valor={100 - exposicionPct} label="Cobertura" color={colores.exito} size={110} />
              <KpiCircle valor={exposicionPct} label="Exposición" color={colores.peligro} size={110} />
            </div>
            <AgentesPanel
              agentes={[
                { nombre: 'SOC IA', rol: 'Monitoreo de amenazas 24/7', color: colores.peligro },
                { nombre: 'CISO', rol: 'Gobierno de riesgo', color: colores.primario },
                { nombre: 'Cumplimiento', rol: 'Auditoría y evidencias', color: '#8B5CF6' },
              ]}
            />
          </div>
        </div>

        <ServiciosList
          titulo="Servicios incluidos"
          servicios={[
            'SOC IA gestionado',
            'Monitoreo de amenazas',
            'Gestión de vulnerabilidades',
            'Análisis de eventos',
            'Respuesta a incidentes',
            'Reportes de riesgo',
            'Ciber para nube e IA',
            'Hardening',
            'Evidencias y auditoría',
            'Ciberresiliencia',
            'Cumplimiento normativo',
          ]}
          color={colores.peligro}
        />
      </div>
    </div>
  );
};
