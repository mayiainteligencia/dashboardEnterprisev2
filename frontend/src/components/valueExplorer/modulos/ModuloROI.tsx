import React, { useState, useEffect } from 'react';
import { TrendingUp, ArrowLeft, ShieldCheck, Gauge, Database, Wallet } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { brandingConfig } from '../../../config/branding';
import { ModuloHeader, CtaButton, AgentesPanel, KpiBadge } from '../ExplorerShared';
import { useExplorer, PERFILES } from '../ExplorerContext';

interface Props {
  onSectionChange?: (s: string) => void;
}

export const ModuloROI: React.FC<Props> = ({ onSectionChange }) => {
  const { colores } = brandingConfig;
  const { kpis, perfil, serviciosRecomendados } = useExplorer();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth < 1024);
    c();
    window.addEventListener('resize', c);
    return () => window.removeEventListener('resize', c);
  }, []);

  const escenarios = [
    { nombre: 'Protección y continuidad', roi: Math.max(8, kpis.roi - 4), prioridad: 'Inmediata', icon: ShieldCheck, color: colores.exito },
    { nombre: 'Nube y operación inteligente', roi: kpis.roi, prioridad: 'Corto plazo', icon: Gauge, color: colores.primario },
    { nombre: 'AI Factory', roi: kpis.roi + 8, prioridad: 'Mediano plazo', icon: Database, color: '#8B5CF6' },
  ];

  const bloques = [
    { label: 'Riesgo reducido', valor: `${kpis.riesgo === 'Alto' ? -45 : kpis.riesgo === 'Medio' ? -28 : -12}%`, color: colores.peligro, icon: ShieldCheck },
    { label: 'Eficiencia potencial', valor: `+${Math.round(kpis.madurez / 4)}%`, color: colores.primario, icon: Gauge },
    { label: 'Valor de datos', valor: `${kpis.valorDato}/100`, color: '#8B5CF6', icon: Database },
    { label: 'Inversión sugerida', valor: kpis.serviciosRecomendados >= 6 ? 'Programa' : kpis.serviciosRecomendados >= 4 ? 'Modular' : 'Focal', color: colores.acento, icon: Wallet },
  ];

  const perfilLabel = PERFILES.find((p) => p.id === perfil)?.label || 'Ejecutivo';

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
          numero={8}
          titulo="ROI, Business Case y Ruta Ejecutiva"
          microcopy={`Visualice el impacto estratégico de DC Inteligente en lenguaje de ${perfilLabel}.`}
          icono={<TrendingUp size={26} color="#fff" />}
          color={colores.acento}
        />

        {/* Business case en 4 bloques */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '14px', marginBottom: '20px' }}>
          {bloques.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.label}
                style={{
                  backgroundColor: colores.fondoSecundario,
                  borderRadius: '18px',
                  border: `1px solid ${b.color}40`,
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${b.color}18`, color: b.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={20} />
                </div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: b.color }}>{b.valor}</div>
                <div style={{ fontSize: '11px', color: colores.textoMedio, textTransform: 'uppercase', letterSpacing: '0.4px', fontWeight: 700 }}>
                  {b.label}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
          <KpiBadge valor={`+${kpis.roi}%`} label="ROI por escenario" color={colores.acento} />
          <KpiBadge valor={kpis.riesgo} label="Riesgo mitigado" color={kpis.riesgo === 'Alto' ? colores.exito : colores.primario} />
          <KpiBadge valor={kpis.serviciosRecomendados >= 6 ? '6-9 m' : '3-6 m'} label="Tiempo implementación" color={colores.primario} />
          <KpiBadge valor={`${kpis.serviciosRecomendados}`} label="Servicios recomendados" color={colores.primarioOscuro} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: colores.textoClaro, margin: '0 0 14px 0' }}>
              Escenarios recomendados — ROI estimado (%)
            </h3>
            <div style={{ height: '260px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={escenarios} layout="vertical" margin={{ left: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={`${colores.borde}44`} horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11, fill: colores.textoOscuro }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="nombre" tick={{ fontSize: 11, fill: colores.textoMedio }} width={140} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: colores.fondoSecundario, border: `1px solid ${colores.borde}`, borderRadius: '8px', fontSize: '11px' }} />
                  <Bar dataKey="roi" radius={[0, 6, 6, 0]}>
                    {escenarios.map((e, i) => (
                      <Cell key={i} fill={e.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ marginTop: '14px' }}>
              <CtaButton label="Solicitar business case ejecutivo" onClick={() => onSectionChange?.('explorerWizard')} color={colores.acento} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', border: `1px solid ${colores.borde}`, padding: '20px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: colores.textoClaro, margin: '0 0 12px 0' }}>
                Servicios recomendados para usted
              </h3>
              {serviciosRecomendados.length === 0 ? (
                <p style={{ fontSize: '12px', color: colores.textoMedio, margin: 0 }}>
                  Complete el diagnóstico para personalizar su ruta.
                </p>
              ) : (
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {serviciosRecomendados.map((s) => (
                    <li key={s} style={{ padding: '10px 12px', backgroundColor: colores.fondoTerciario, borderRadius: '10px', fontSize: '12px', color: colores.textoClaro, borderLeft: `3px solid ${colores.acento}` }}>
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <AgentesPanel
              agentes={[
                { nombre: 'ROI', rol: 'Cuantifica retorno por iniciativa', color: colores.acento },
                { nombre: 'CFO', rol: 'Lenguaje financiero ejecutivo', color: colores.exito },
                { nombre: 'Propuesta Ejecutiva', rol: 'Arma su business case', color: colores.primario },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
