import React, { useState, useEffect } from 'react';
import {
  Activity,
  Database,
  Cloud,
  Monitor,
  ShieldCheck,
  HardDriveDownload,
  Sparkles,
  TrendingUp,
  ArrowRight,
  ChevronRight,
  AlertTriangle,
  Network,
  Calculator,
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { brandingConfig } from '../../config/branding';
import { useExplorer } from './ExplorerContext';
import { CtaButton } from './ExplorerShared';

interface ValueExplorerHomeProps {
  onSectionChange?: (s: string) => void;
}

const TARJETAS = [
  { n: 1, id: 'explorerDiagnostico', titulo: 'Diagnóstico Inteligente de Empresa', micro: 'Descubra necesidades, madurez digital y prioridades estratégicas.', cta: 'Iniciar diagnóstico', icon: Activity, accent: '#1c4260' },
  { n: 2, id: 'explorerValorDato', titulo: 'Valor Estratégico del Dato', micro: 'Visualice protección, organización, inteligencia y valor de negocio.', cta: 'Evaluar valor', icon: Database, accent: '#0EA5E9' },
  { n: 3, id: 'explorerNube', titulo: 'Nube, IaaS y FLAI', micro: 'Infraestructura flexible para operar, procesar y escalar.', cta: 'Explorar nube', icon: Cloud, accent: '#06B6D4' },
  { n: 4, id: 'explorerNOC', titulo: 'NOC y Operación Inteligente', micro: 'Monitoreo, SLA, soporte y visibilidad técnica para servicios críticos.', cta: 'Evaluar operación', icon: Monitor, accent: '#3B82F6' },
  { n: 5, id: 'explorerSOC', titulo: 'SOC IA y Ciberseguridad', micro: 'Protección inteligente para datos, aplicaciones e infraestructura.', cta: 'Revisar seguridad', icon: ShieldCheck, accent: '#8B5CF6' },
  { n: 6, id: 'explorerDRP', titulo: 'DRP, Backup y Continuidad', micro: 'Respaldo, recuperación y resiliencia para la operación crítica.', cta: 'Calcular continuidad', icon: HardDriveDownload, accent: '#10B981' },
  { n: 7, id: 'explorerAIFactory', titulo: 'AI Factory y Agentes para Negocio', micro: 'Active casos de IA, agentes, analítica y automatización.', cta: 'Descubrir IA', icon: Sparkles, accent: '#A855F7' },
  { n: 8, id: 'explorerROI', titulo: 'ROI, Business Case y Ruta Ejecutiva', micro: 'Conozca beneficios potenciales, impacto y próximos pasos.', cta: 'Generar business case', icon: TrendingUp, accent: '#F27405' },
];

interface MiniDonaProps {
  valor: number;
  color: string;
  unidad?: string;
}

const MiniDona: React.FC<MiniDonaProps> = ({ valor, color, unidad = '/100' }) => {
  const pct = Math.max(0, Math.min(100, valor));
  const data = [
    { name: 'v', value: pct },
    { name: 'r', value: 100 - pct },
  ];
  return (
    <div style={{ width: 54, height: 54, position: 'relative', flexShrink: 0 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius="70%" outerRadius="100%" startAngle={90} endAngle={-270} stroke="none" isAnimationActive={false}>
            <Cell fill={color} />
            <Cell fill={`${color}22`} />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>
        <span style={{ fontSize: '13px', fontWeight: 800, color }}>{valor}</span>
        <span style={{ fontSize: '8px', color, opacity: 0.7 }}>{unidad}</span>
      </div>
    </div>
  );
};

interface HeroKpiProps {
  label: string;
  children: React.ReactNode;
}

const HeroKpi: React.FC<HeroKpiProps> = ({ label, children }) => {
  const { colores } = brandingConfig;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px 14px', borderLeft: `1px solid ${colores.borde}` }}>
      {children}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '10px', fontWeight: 700, color: colores.textoMedio, textTransform: 'uppercase', letterSpacing: '0.4px', whiteSpace: 'nowrap' }}>
          {label}
        </span>
      </div>
    </div>
  );
};

export const ValueExplorerHome: React.FC<ValueExplorerHomeProps> = ({ onSectionChange }) => {
  const { colores, empresa } = brandingConfig;
  const { kpis } = useExplorer();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth < 1280);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const riesgoColor =
    kpis.riesgo === 'Bajo' ? colores.exito : kpis.riesgo === 'Medio' ? colores.advertencia : colores.peligro;

  return (
    <div style={{ minHeight: '100vh', background: colores.fondoPrincipal, padding: isMobile ? '16px' : '28px' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>

        {/* Barra superior de logos MAYIA + FLAI */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: isMobile ? '16px' : '20px',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: isMobile ? '20px' : '32px',
              padding: isMobile ? '12px 22px' : '14px 32px',
              borderRadius: '18px',
              background: 'rgba(14, 27, 43, 0.92)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
              border: `1px solid rgba(255,255,255,0.06)`,
            }}
          >
            <img
              src="/assets/logosNativos/mayiaLogoBlanco.png"
              alt="MAYIA"
              style={{
                height: isMobile ? '24px' : '34px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
            />
            <div
              style={{
                width: '1px',
                height: isMobile ? '20px' : '28px',
                background: 'rgba(255,255,255,0.18)',
              }}
            />
            <img
              src="/assets/logosNativos/flai.png"
              alt="FLAI"
              style={{
                height: isMobile ? '24px' : '34px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </div>
        </div>

        {/* HERO + KPIs en una sola fila */}
        <div
          className="explorer-hero"
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '24px',
            background: colores.fondoSecundario,
            border: `1px solid ${colores.borde}`,
            padding: isMobile ? '24px' : '28px 32px',
            marginBottom: isMobile ? '20px' : '24px',
            display: 'flex',
            flexDirection: isTablet ? 'column' : 'row',
            alignItems: isTablet ? 'flex-start' : 'center',
            justifyContent: 'space-between',
            gap: isTablet ? '20px' : '32px',
            boxShadow: colores.sombra,
          }}
        >
          {/* Texto izquierda */}
          <div style={{ flexShrink: 0, maxWidth: isTablet ? '100%' : '440px' }}>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: colores.textoMedio,
                textTransform: 'uppercase',
                letterSpacing: '0.6px',
                marginBottom: '6px',
              }}
            >
              Plataforma Inteligente {empresa.nombre}
            </div>
            <h1
              style={{
                fontSize: isMobile ? '28px' : '34px',
                fontWeight: 800,
                color: colores.primario,
                margin: '0 0 8px 0',
                letterSpacing: '-0.6px',
                lineHeight: 1.1,
              }}
            >
              AI Value Explorer
            </h1>
            <p
              style={{
                fontSize: '13px',
                color: colores.textoMedio,
                margin: 0,
                lineHeight: 1.5,
                maxWidth: '420px',
              }}
            >
              Descubra el valor estratégico de sus datos, infraestructura y operación digital.
            </p>
          </div>

          {/* KPIs línea horizontal */}
          <div
            className="hide-scroll explorer-hero-kpis"
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'nowrap',
              overflowX: 'auto',
              flex: 1,
              justifyContent: isTablet ? 'flex-start' : 'flex-end',
              gap: '4px',
              padding: '4px 0',
            }}
          >
            <HeroKpi label="Madurez Digital">
              <MiniDona valor={kpis.madurez} color={colores.primario} />
            </HeroKpi>
            <HeroKpi label="Riesgo Operativo">
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: '50%',
                  background: `${riesgoColor}18`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  lineHeight: 1,
                  flexShrink: 0,
                }}
              >
                <AlertTriangle size={16} color={riesgoColor} />
                <span style={{ fontSize: '10px', fontWeight: 800, color: riesgoColor, marginTop: '2px' }}>
                  {kpis.riesgo}
                </span>
              </div>
            </HeroKpi>
            <HeroKpi label="Continuidad">
              <MiniDona valor={kpis.continuidad} color={colores.exito} />
            </HeroKpi>
            <HeroKpi label="Valor del Dato">
              <MiniDona valor={kpis.valorDato} color="#8B5CF6" />
            </HeroKpi>
            <HeroKpi label="ROI Preliminar">
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: '50%',
                  background: `${colores.acento}18`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  lineHeight: 1,
                  flexShrink: 0,
                }}
              >
                <TrendingUp size={14} color={colores.acento} />
                <span style={{ fontSize: '11px', fontWeight: 800, color: colores.acento, marginTop: '2px' }}>
                  +{kpis.roi}%
                </span>
              </div>
            </HeroKpi>
            <HeroKpi label="Servicios Recomendados">
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: '50%',
                  background: `${colores.primarioOscuro}18`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: '20px', fontWeight: 800, color: colores.primarioOscuro }}>
                  {kpis.serviciosRecomendados}
                </span>
              </div>
            </HeroKpi>
          </div>
        </div>

        {/* GRID DE 8 TARJETAS — destacadas (4 cols en desktop/tablet, 2 cols en móvil) */}
        <div
          className="explorer-cards-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: isMobile ? '10px' : '18px',
            marginBottom: isMobile ? '20px' : '24px',
          }}
        >
          {TARJETAS.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.n}
                onClick={() => onSectionChange?.(t.id)}
                className="explorer-card"
                style={{
                  position: 'relative',
                  backgroundColor: colores.fondoSecundario,
                  borderRadius: '20px',
                  border: `1px solid ${colores.borde}`,
                  padding: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  minHeight: '300px',
                  overflow: 'hidden',
                  transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease, border-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = `0 18px 40px ${t.accent}30`;
                  e.currentTarget.style.borderColor = t.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = colores.borde;
                }}
              >
                {/* Glow accent en esquina */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-40px',
                    right: '-40px',
                    width: '160px',
                    height: '160px',
                    background: `radial-gradient(circle, ${t.accent}25 0%, transparent 70%)`,
                    pointerEvents: 'none',
                  }}
                />

                {/* Top row: número + flecha */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: t.accent,
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '15px',
                      fontWeight: 800,
                      boxShadow: `0 4px 12px ${t.accent}55`,
                    }}
                  >
                    {t.n}
                  </div>
                  <ChevronRight size={20} color={colores.textoMedio} />
                </div>

                {/* Ícono central grande */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '90px',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      width: '88px',
                      height: '88px',
                      borderRadius: '20px',
                      background: `linear-gradient(135deg, ${t.accent}18 0%, ${t.accent}05 100%)`,
                      border: `1px solid ${t.accent}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `inset 0 0 24px ${t.accent}12`,
                    }}
                  >
                    <Icon size={40} color={t.accent} strokeWidth={1.4} />
                  </div>
                </div>

                {/* Texto */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h3
                    style={{
                      fontSize: '15px',
                      fontWeight: 800,
                      color: colores.textoClaro,
                      margin: '0 0 6px 0',
                      lineHeight: 1.25,
                      letterSpacing: '-0.2px',
                    }}
                  >
                    {t.titulo}
                  </h3>
                  <p
                    style={{
                      fontSize: '11.5px',
                      color: colores.textoMedio,
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {t.micro}
                  </p>
                </div>

                {/* CTA pill */}
                <div style={{ marginTop: 'auto', position: 'relative', zIndex: 1 }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSectionChange?.(t.id);
                    }}
                    style={{
                      width: '100%',
                      padding: '9px 14px',
                      borderRadius: '10px',
                      border: 'none',
                      background: `${t.accent}15`,
                      color: t.accent,
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = t.accent;
                      e.currentTarget.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = `${t.accent}15`;
                      e.currentTarget.style.color = t.accent;
                    }}
                  >
                    {t.cta}
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banda inferior */}
        <div
          style={{
            borderRadius: '20px',
            padding: '22px 28px',
            background: colores.fondoSecundario,
            border: `1px solid ${colores.borde}`,
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            gap: '20px',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1 }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: colores.gradientePrimario,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Network size={22} />
            </div>
            <p style={{ fontSize: '13.5px', color: colores.textoClaro, margin: 0, lineHeight: 1.5 }}>
              <strong>EdgeNet</strong> integra infraestructura crítica, nube soberana, NOC, SOC IA, DRP y AI Factory para
              convertir sus datos en <strong>valor estratégico</strong>.
            </p>
          </div>
          <CtaButton
            label="Solicitar diagnóstico ejecutivo"
            onClick={() => onSectionChange?.('explorerWizard')}
            icon={<Calculator size={16} />}
          />
        </div>

        <style>{`
          .hide-scroll::-webkit-scrollbar { display: none; }
          .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>
    </div>
  );
};
