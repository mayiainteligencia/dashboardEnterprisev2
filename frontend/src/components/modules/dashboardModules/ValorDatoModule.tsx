import React, { useState, useRef, useEffect } from 'react';
import { Database, MoreVertical, X, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

interface ValorDatoModuleProps {
  onNavigate?: (section: string) => void;
}

const Donut: React.FC<{ pct: number; color: string; size?: number; label?: string }> = ({ pct, color, size = 56, label }) => {
  const r = 20, circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" style={{ flexShrink: 0 }}>
      <circle cx="24" cy="24" r={r} fill="none" stroke={`${color}22`} strokeWidth="5" />
      <circle cx="24" cy="24" r={r} fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={`${dash} ${circ}`} strokeDashoffset={circ * 0.25}
        strokeLinecap="round" style={{ transition: 'stroke-dasharray 0.6s ease' }} />
      <text x="24" y="22" textAnchor="middle" fontSize="11" fontWeight="800" fill={color}>{pct}</text>
      {label && <text x="24" y="31" textAnchor="middle" fontSize="6" fill={color}>{label}</text>}
    </svg>
  );
};

export const ValorDatoModule: React.FC<ValorDatoModuleProps> = ({ onNavigate }) => {
  const { colores } = brandingConfig;
  const [showMenu, setShowMenu] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const oportunidades = [
    { area: 'Analítica predictiva', impacto: '$2.4M', madurez: 78, color: '#8B5CF6' },
    { area: 'Automatización IA', impacto: '$1.8M', madurez: 65, color: colores.primario },
    { area: 'Monetización datos', impacto: '$3.1M', madurez: 42, color: colores.acento },
    { area: 'Optimización procesos', impacto: '$1.2M', madurez: 88, color: colores.exito },
  ];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setShowMenu(false);
    };
    if (showMenu) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showMenu]);

  return (
    <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '24px', border: `1px solid ${colores.borde}`, padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', height: '100%', position: 'relative' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Database size={22} color="white" />
          </div>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: colores.textoClaro, margin: 0, lineHeight: 1.2 }}>Valor Potencial del Dato</h3>
            <p style={{ fontSize: '11px', color: colores.textoMedio, margin: 0 }}>
              IA · Analítica · <span style={{ color: '#8B5CF6', fontWeight: 600 }}>4 oportunidades</span>
            </p>
          </div>
        </div>
        <div style={{ position: 'relative' }} ref={menuRef}>
          <button onClick={() => setShowMenu(!showMenu)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: colores.textoMedio, padding: '4px' }}>
            <MoreVertical size={20} />
          </button>
          {showMenu && (
            <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', backgroundColor: colores.fondoSecundario, border: `1px solid ${colores.borde}`, borderRadius: '12px', boxShadow: colores.sombraGrande, minWidth: '210px', zIndex: 1000, overflow: 'hidden' }}>
              {[
                { label: 'Ver Valor del Dato', action: () => { onNavigate?.('valorDatoIA'); setShowMenu(false); } },
                { label: 'Más Información', action: () => { setShowInfo(true); setShowMenu(false); } },
              ].map(item => (
                <button key={item.label} onClick={item.action}
                  style={{ width: '100%', padding: '12px 16px', border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer', color: colores.textoClaro, fontSize: '14px', transition: 'background-color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = colores.fondoTerciario)}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >{item.label}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Score de Valor */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: '#8B5CF610', border: '1px solid #8B5CF630', borderRadius: '16px', padding: '16px' }}>
        <Donut pct={72} color="#8B5CF6" size={60} label="SCORE" />
        <div>
          <p style={{ fontSize: '14px', fontWeight: '800', color: colores.textoClaro, margin: 0 }}>Valor potencial: $8.5M MXN</p>
          <p style={{ fontSize: '11px', color: colores.textoMedio, margin: '2px 0 0 0' }}>
            <Sparkles size={10} style={{ verticalAlign: 'middle', marginRight: '4px', color: '#8B5CF6' }} />
            4 oportunidades de IA identificadas
          </p>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
        {[
          { valor: '142', label: 'Datasets', color: '#8B5CF6', bg: '#8B5CF615' },
          { valor: '89%', label: 'Calidad Datos', color: colores.exito, bg: `${colores.exito}15` },
          { valor: '34', label: 'Modelos IA', color: '#EC4899', bg: '#EC489915' },
        ].map(({ valor, label, color, bg }) => (
          <div key={label} style={{ backgroundColor: bg, border: `1px solid ${color}33`, borderRadius: '12px', padding: '10px 8px', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', fontWeight: 'bold', color, margin: 0, lineHeight: 1 }}>{valor}</p>
            <p style={{ fontSize: '9px', color: colores.textoMedio, margin: '4px 0 0 0', lineHeight: 1.3 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Oportunidades */}
      <div style={{ backgroundColor: colores.fondoTerciario, borderRadius: '14px', padding: '14px' }}>
        <p style={{ fontSize: '10px', fontWeight: '600', color: colores.textoMedio, margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Oportunidades de IA</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {oportunidades.map(({ area, impacto, madurez, color }) => (
            <div key={area} style={{ backgroundColor: colores.fondoSecundario, borderRadius: '12px', padding: '10px 12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', fontWeight: '600', color: colores.textoClaro }}>{area}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <TrendingUp size={10} color={colores.exito} />
                  <span style={{ fontSize: '11px', fontWeight: '700', color }}>{impacto}</span>
                </div>
              </div>
              <div style={{ height: '5px', backgroundColor: `${colores.borde}66`, borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${madurez}%`, backgroundColor: color, borderRadius: '3px', transition: 'width 0.6s ease' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                <span style={{ fontSize: '9px', color: colores.textoMedio }}>Madurez IA</span>
                <span style={{ fontSize: '9px', color, fontWeight: '700' }}>{madurez}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={() => onNavigate?.('valorDatoIA')}
        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'opacity 0.2s', marginTop: 'auto' }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        Analizar mis datos <ArrowRight size={16} />
      </button>

      {/* Modal Info */}
      {showInfo && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }} onClick={() => setShowInfo(false)}>
          <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', padding: '24px', maxWidth: '400px', width: '90%' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colores.textoClaro, margin: 0 }}>Valor Potencial del Dato</h3>
              <button onClick={() => setShowInfo(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: colores.textoMedio }}><X size={24} /></button>
            </div>
            <p style={{ fontSize: '13px', color: colores.textoMedio, lineHeight: 1.6, marginBottom: '16px' }}>
              Descubra oportunidades de analítica, IA, automatización y monetización ocultas en sus datos corporativos.
            </p>
            <button onClick={() => setShowInfo(false)} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Entendido</button>
          </div>
        </div>
      )}
    </div>
  );
};
