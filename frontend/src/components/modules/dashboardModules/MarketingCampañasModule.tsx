import React, { useState, useEffect } from 'react';
import { Megaphone, ArrowRight, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

type TabCamp = 'activas' | 'completadas' | 'proximas';

const COLOR_A = '#ae0000';
const COLOR_B = '#F27405';

interface Campaña {
  nombre: string;
  canal: string;
  avance: number;
  badge: string;
  color: string;
}

const data: Record<TabCamp, {
  label: string;
  kpis: { label: string; valor: string; color: string }[];
  campañas: Campaña[];
}> = {
  activas: {
    label: 'Activas',
    kpis: [
      { label: 'Campañas', valor: '4', color: COLOR_A },
      { label: 'Inversión', valor: '$4.2M', color: '#3B82F6' },
      { label: 'Alcance', valor: '320K', color: '#10B981' },
    ],
    campañas: [
      { nombre: 'Cuídate Más, Gasta Menos', canal: 'TV + Digital', avance: 68, badge: 'ROI 267%', color: COLOR_A },
      { nombre: 'Programa de Lealtad 2025', canal: 'Email + App', avance: 45, badge: '42K nuevos', color: '#3B82F6' },
      { nombre: 'Ahorro en Medicamentos', canal: 'Redes Sociales', avance: 82, badge: '180K alc.', color: '#8B5CF6' },
      { nombre: 'Primavera Saludable', canal: 'POP + Radio', avance: 30, badge: 'En marcha', color: COLOR_B },
    ],
  },
  completadas: {
    label: 'Completadas',
    kpis: [
      { label: 'Completadas', valor: '6', color: '#10B981' },
      { label: 'ROI Prom.', valor: '298%', color: COLOR_A },
      { label: 'Retorno', valor: '$12.4M', color: COLOR_B },
    ],
    campañas: [
      { nombre: 'Temporada Resfrío', canal: 'TV + Radio', avance: 100, badge: 'ROI 312%', color: '#10B981' },
      { nombre: 'Diciembre Sin Receta', canal: 'Digital', avance: 100, badge: 'ROI 285%', color: '#10B981' },
      { nombre: 'Mes del Corazón', canal: 'OOH + Digital', avance: 100, badge: 'ROI 278%', color: '#10B981' },
      { nombre: 'Vuelta a Clases Sana', canal: 'Redes + Email', avance: 100, badge: 'ROI 294%', color: '#10B981' },
    ],
  },
  proximas: {
    label: 'Próximas',
    kpis: [
      { label: 'Programadas', valor: '3', color: '#F59E0B' },
      { label: 'Presupuesto', valor: '$5.1M', color: '#3B82F6' },
      { label: 'Inicio', valor: 'May \'25', color: '#8B5CF6' },
    ],
    campañas: [
      { nombre: 'Verano Activo', canal: 'Digital + OOH', avance: 0, badge: 'Jun 2025', color: '#F59E0B' },
      { nombre: 'Diabetes en Control', canal: 'TV + Redes', avance: 0, badge: 'Jul 2025', color: '#F59E0B' },
      { nombre: 'Aniversario Ahorro', canal: 'Todos los canales', avance: 0, badge: 'Ago 2025', color: '#F59E0B' },
    ],
  },
};

interface MarketingCampañasModuleProps {
  onNavigate?: (section: string) => void;
}

export const MarketingCampañasModule: React.FC<MarketingCampañasModuleProps> = ({ onNavigate }) => {
  const { colores } = brandingConfig;
  const [tab, setTab] = useState<TabCamp>('activas');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const cfg = data[tab];

  const tabIcon = (t: TabCamp) => {
    if (t === 'activas')     return <TrendingUp size={9} />;
    if (t === 'completadas') return <CheckCircle size={9} />;
    return <Clock size={9} />;
  };

  return (
    <div style={{
      backgroundColor: colores.fondoSecundario,
      borderRadius: '24px',
      border: `1px solid ${colores.borde}`,
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Glow decorativo */}
      <div style={{
        position: 'absolute', top: '-30px', right: '-30px',
        width: '120px', height: '120px',
        background: `radial-gradient(circle, ${COLOR_A}14 0%, transparent 70%)`,
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '10px',
          background: `linear-gradient(135deg, ${COLOR_A}, ${COLOR_B})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, boxShadow: `0 4px 12px ${COLOR_A}35`,
        }}>
          <Megaphone size={18} color="#fff" />
        </div>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: colores.textoClaro, margin: 0 }}>
            Campañas de Marketing
          </h3>
          <p style={{ fontSize: '10px', color: colores.textoMedio, margin: 0 }}>
            Farmacias del Ahorro ·{' '}
            <span style={{ color: COLOR_A, fontWeight: 600 }}>
              {data.activas.campañas.length} activas
            </span>
          </p>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div style={{ display: 'flex', gap: '4px' }}>
        {(Object.keys(data) as TabCamp[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1,
              padding: '5px 4px',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '9px',
              fontWeight: '700',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              backgroundColor: tab === t ? COLOR_A : colores.fondoTerciario,
              color: tab === t ? '#fff' : colores.textoMedio,
            }}
          >
            {tabIcon(t)} {data[t].label}
          </button>
        ))}
      </div>

      {/* ── KPIs ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
        {cfg.kpis.map((k, i) => (
          <div key={i} style={{
            backgroundColor: colores.fondoTerciario,
            borderRadius: '12px',
            padding: '9px 8px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '13px', fontWeight: '800', color: k.color }}>{k.valor}</div>
            <div style={{ fontSize: '8px', fontWeight: '600', color: colores.textoMedio, marginTop: '2px', lineHeight: '1.2' }}>
              {k.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Lista de campañas ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', flex: 1 }}>
        <p style={{
          fontSize: '9px', fontWeight: '600', color: colores.textoMedio,
          margin: 0, textTransform: 'uppercase', letterSpacing: '0.4px',
        }}>
          {cfg.label === 'Próximas' ? 'Próximas campañas' : `Campañas ${cfg.label.toLowerCase()}`}
        </p>

        {cfg.campañas.map((c, i) => (
          <div key={i} style={{
            backgroundColor: colores.fondoTerciario,
            borderRadius: '12px',
            padding: '9px 11px',
            borderLeft: `3px solid ${c.color}`,
          }}>
            {/* Nombre + badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '6px', marginBottom: '5px' }}>
              <span style={{
                fontSize: '11px', fontWeight: '700', color: colores.textoClaro,
                lineHeight: '1.3', flex: 1,
              }}>
                {c.nombre}
              </span>
              <span style={{
                fontSize: '8px', fontWeight: '800',
                color: c.color,
                background: `${c.color}15`,
                padding: '2px 6px', borderRadius: '6px',
                flexShrink: 0, whiteSpace: 'nowrap',
              }}>
                {c.badge}
              </span>
            </div>

            {/* Canal */}
            <div style={{ fontSize: '9px', color: colores.textoMedio, marginBottom: '5px' }}>
              {c.canal}
            </div>

            {/* Barra de progreso */}
            <div style={{ height: '4px', backgroundColor: colores.borde, borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${c.avance || 3}%`,
                background: c.avance === 100
                  ? '#10B981'
                  : c.avance === 0
                    ? `${c.color}50`
                    : `linear-gradient(90deg, ${c.color}, ${COLOR_B})`,
                borderRadius: '2px',
                transition: 'width 0.6s ease',
              }} />
            </div>

            {/* Porcentaje */}
            {c.avance > 0 && (
              <div style={{ fontSize: '8px', color: colores.textoMedio, marginTop: '3px', textAlign: 'right' }}>
                {c.avance}% completado
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── CTA ── */}
      <button
        onClick={() => onNavigate?.('ventas')}
        style={{
          width: '100%', padding: '11px 16px', borderRadius: '12px',
          border: 'none',
          background: `linear-gradient(135deg, ${COLOR_A}, ${COLOR_B})`,
          color: 'white', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '8px', transition: 'opacity 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        Ver Marketing Completo <ArrowRight size={15} />
      </button>
    </div>
  );
};
