import React, { useState, useEffect } from 'react';
import { Monitor, ArrowLeft } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { brandingConfig } from '../../../config/branding';
import { ModuloHeader, CtaButton, AgentesPanel, ServiciosList, KpiBadge, KpiCircle } from '../ExplorerShared';
import { useExplorer } from '../ExplorerContext';

interface Props {
  onSectionChange?: (s: string) => void;
}

export const ModuloNOC: React.FC<Props> = ({ onSectionChange }) => {
  const { colores } = brandingConfig;
  const { kpis, respuestas } = useExplorer();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth < 1024);
    c();
    window.addEventListener('resize', c);
    return () => window.removeEventListener('resize', c);
  }, []);

  const disponibilidad = [
    { h: 'L', v: 99.94 },
    { h: 'M', v: 99.97 },
    { h: 'X', v: 99.92 },
    { h: 'J', v: 99.98 },
    { h: 'V', v: 99.95 },
    { h: 'S', v: 99.99 },
    { h: 'D', v: 99.97 },
  ];

  const nivelOperacion = respuestas.operacion247 === 'si' ? 'Crítico 24/7' : 'Horario extendido';

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
          numero={4}
          titulo="NOC y Operación Inteligente"
          microcopy="Visibilidad técnica continua para sostener operación crítica con SLA garantizado."
          icono={<Monitor size={26} color="#fff" />}
        />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
          <KpiBadge valor={nivelOperacion} label="Nivel operación" color={colores.primario} />
          <KpiBadge valor="99.95%" label="SLA referencia" color={colores.exito} />
          <KpiBadge valor={kpis.riesgo} label="Riesgo indisponibilidad" color={kpis.riesgo === 'Alto' ? colores.peligro : kpis.riesgo === 'Medio' ? colores.advertencia : colores.exito} />
          <KpiBadge valor="24/7" label="Soporte requerido" color={colores.acento} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: colores.textoClaro, margin: '0 0 14px 0' }}>
              Disponibilidad semanal de referencia (%)
            </h3>
            <div style={{ height: '240px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={disponibilidad}>
                  <CartesianGrid strokeDasharray="3 3" stroke={`${colores.borde}44`} vertical={false} />
                  <XAxis dataKey="h" tick={{ fontSize: 11, fill: colores.textoOscuro }} axisLine={false} tickLine={false} />
                  <YAxis domain={[99.85, 100]} tick={{ fontSize: 10, fill: colores.textoOscuro }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: colores.fondoSecundario, border: `1px solid ${colores.borde}`, borderRadius: '8px', fontSize: '11px' }} />
                  <Line type="monotone" dataKey="v" stroke={colores.exito} strokeWidth={2.5} dot={{ fill: colores.exito, r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div style={{ marginTop: '14px' }}>
              <CtaButton label="Evaluar operación crítica" onClick={() => onSectionChange?.('explorerWizard')} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-around', backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px', flexWrap: 'wrap' }}>
              <KpiCircle valor={kpis.continuidad} label="Resiliencia" color={colores.exito} size={100} />
              <KpiCircle valor={kpis.madurez} label="Madurez NOC" color={colores.primario} size={100} />
            </div>
            <AgentesPanel
              agentes={[
                { nombre: 'NOC IA', rol: 'Monitoreo 24/7', color: colores.primario },
                { nombre: 'SLA', rol: 'Cumplimiento de niveles', color: colores.exito },
                { nombre: 'Soporte Técnico', rol: 'Atención de incidentes', color: '#3B82F6' },
              ]}
            />
          </div>
        </div>

        <ServiciosList
          titulo="Servicios incluidos"
          servicios={[
            'NOC gestionado',
            'Monitoreo 24/7',
            'Gestión de eventos e incidentes',
            'Mesa de ayuda',
            'Reportes operativos',
            'SLA garantizado',
            'Observabilidad',
            'Alertamiento',
            'Escalamiento',
            'Manos remotas',
            'Soporte especializado',
          ]}
        />
      </div>
    </div>
  );
};
