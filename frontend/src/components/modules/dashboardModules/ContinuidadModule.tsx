import React, { useState, useRef, useEffect } from 'react';
import { HardDrive, MoreVertical, X, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

interface ContinuidadModuleProps {
  onNavigate?: (section: string) => void;
}

const Donut: React.FC<{ pct: number; color: string; size?: number }> = ({ pct, color, size = 44 }) => {
  const r = 16, circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{ flexShrink: 0 }}>
      <circle cx="20" cy="20" r={r} fill="none" stroke={`${color}22`} strokeWidth="5" />
      <circle cx="20" cy="20" r={r} fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={`${dash} ${circ}`} strokeDashoffset={circ * 0.25}
        strokeLinecap="round" style={{ transition: 'stroke-dasharray 0.6s ease' }} />
      <text x="20" y="24" textAnchor="middle" fontSize="8" fontWeight="700" fill={color}>{pct}%</text>
    </svg>
  );
};

export const ContinuidadModule: React.FC<ContinuidadModuleProps> = ({ onNavigate }) => {
  const { colores } = brandingConfig;
  const [showMenu, setShowMenu] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const indicadores = [
    { label: 'Backups exitosos', valor: '98.5%', emoji: '💾', color: colores.exito },
    { label: 'Replicación activa', valor: '3 sitios', emoji: '🔄', color: colores.primario },
    { label: 'RTO actual', valor: '< 4h', emoji: '⏱️', color: colores.advertencia },
    { label: 'RPO actual', valor: '< 1h', emoji: '🎯', color: colores.exito },
  ];

  const drpStatus = [
    { item: 'Plan DRP documentado', ok: true },
    { item: 'Último simulacro exitoso', ok: true },
    { item: 'Failover automático', ok: true },
    { item: 'Recuperación en sitio alterno', ok: false },
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
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `linear-gradient(135deg, ${colores.exito}, #059669)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <HardDrive size={22} color="white" />
          </div>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: colores.textoClaro, margin: 0, lineHeight: 1.2 }}>Nivel de Continuidad</h3>
            <p style={{ fontSize: '11px', color: colores.textoMedio, margin: 0 }}>
              Backup · DRP · <span style={{ color: colores.exito, fontWeight: 600 }}>● Protegido</span>
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
                { label: 'Ver Continuidad Completa', action: () => { onNavigate?.('continuidadDRP'); setShowMenu(false); } },
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

      {/* Score de Continuidad */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: `${colores.exito}10`, border: `1px solid ${colores.exito}30`, borderRadius: '16px', padding: '16px' }}>
        <Donut pct={92} color={colores.exito} size={56} />
        <div>
          <p style={{ fontSize: '14px', fontWeight: '800', color: colores.textoClaro, margin: 0 }}>Score de Continuidad</p>
          <p style={{ fontSize: '11px', color: colores.textoMedio, margin: '2px 0 0 0' }}>Disponibilidad 99.95% · Último simulacro: hace 15 días</p>
        </div>
      </div>

      {/* Indicadores */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {indicadores.map(({ label, valor, emoji, color }) => (
          <div key={label} style={{ backgroundColor: colores.fondoTerciario, borderRadius: '12px', padding: '10px 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '16px' }}>{emoji}</span>
              <div>
                <p style={{ fontSize: '14px', fontWeight: '800', color, margin: 0, lineHeight: 1 }}>{valor}</p>
                <p style={{ fontSize: '9px', color: colores.textoMedio, margin: '3px 0 0 0' }}>{label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DRP Checklist */}
      <div style={{ backgroundColor: colores.fondoTerciario, borderRadius: '14px', padding: '14px' }}>
        <p style={{ fontSize: '10px', fontWeight: '600', color: colores.textoMedio, margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Plan de Recuperación</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {drpStatus.map(({ item, ok }) => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {ok
                ? <CheckCircle size={14} color={colores.exito} style={{ flexShrink: 0 }} />
                : <AlertTriangle size={14} color={colores.advertencia} style={{ flexShrink: 0 }} />}
              <span style={{ fontSize: '11px', color: ok ? colores.textoClaro : colores.advertencia, fontWeight: ok ? 400 : 600 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={() => onNavigate?.('continuidadDRP')}
        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: 'none', background: `linear-gradient(135deg, ${colores.exito}, #059669)`, color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'opacity 0.2s', marginTop: 'auto' }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        Evaluar continuidad <ArrowRight size={16} />
      </button>

      {/* Modal Info */}
      {showInfo && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }} onClick={() => setShowInfo(false)}>
          <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', padding: '24px', maxWidth: '400px', width: '90%' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colores.textoClaro, margin: 0 }}>Nivel de Continuidad</h3>
              <button onClick={() => setShowInfo(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: colores.textoMedio }}><X size={24} /></button>
            </div>
            <p style={{ fontSize: '13px', color: colores.textoMedio, lineHeight: 1.6, marginBottom: '16px' }}>
              Gestión integral de continuidad del negocio: backup, replicación, DRP y disponibilidad de su infraestructura crítica.
            </p>
            <button onClick={() => setShowInfo(false)} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: 'none', background: `linear-gradient(135deg, ${colores.exito}, #059669)`, color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Entendido</button>
          </div>
        </div>
      )}
    </div>
  );
};
