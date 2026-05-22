import React, { useState, useEffect, useRef } from 'react';
import { Shield, MoreVertical, X, ArrowRight, AlertTriangle, Eye } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

interface SeguridadModuleProps {
  onNavigate?: (section: string) => void;
}

const Spark: React.FC<{ data: number[]; color: string; h?: number }> = ({ data, color, h = 28 }) => {
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 100},${h - ((v - min) / range) * (h - 4)}`).join(' ');
  const fill = `0,${h} ${pts} 100,${h}`;
  return (
    <svg viewBox={`0 0 100 ${h}`} preserveAspectRatio="none" style={{ width: '100%', height: `${h}px` }}>
      <polygon points={fill} fill={`${color}18`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const SeguridadModule: React.FC<SeguridadModuleProps> = ({ onNavigate }) => {
  const { colores } = brandingConfig;
  const [showMenu, setShowMenu] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const eventosSpark = [12, 8, 15, 11, 7, 19, 14, 9, 22, 16, 13, 10];

  const alertas = [
    { tipo: 'critica', texto: 'Intento de acceso no autorizado · Firewall Norte', tiempo: '12 min' },
    { tipo: 'media', texto: 'Vulnerabilidad detectada · CVE-2026-1847', tiempo: '2h' },
    { tipo: 'baja', texto: 'Certificado SSL próximo a expirar · Portal B', tiempo: '6h' },
  ];

  const cumplimiento = [
    { norma: 'ISO 27001', score: 94, color: colores.exito },
    { norma: 'PCI DSS', score: 88, color: colores.primario },
    { norma: 'LFPDPPP', score: 91, color: colores.exito },
  ];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setShowMenu(false);
    };
    if (showMenu) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showMenu]);

  const nivelColor: Record<string, string> = { critica: colores.peligro, media: colores.advertencia, baja: colores.exito };

  return (
    <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '24px', border: `1px solid ${colores.borde}`, padding: '20px', display: 'flex', flexDirection: 'column', height: '100%', gap: '14px', position: 'relative' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `linear-gradient(135deg, ${colores.peligro}, ${colores.advertencia})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Shield size={22} color="white" />
          </div>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: colores.textoClaro, margin: 0, lineHeight: 1.2 }}>Nivel de Seguridad</h3>
            <p style={{ fontSize: '11px', color: colores.textoMedio, margin: 0 }}>
              SOC IA · <span style={{ color: colores.peligro, fontWeight: 600 }}>● 3 Alertas activas</span>
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
                { label: 'Ver Seguridad Completa', action: () => { onNavigate?.('seguridadSOC'); setShowMenu(false); } },
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

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
        {[
          { valor: '3', label: 'Alertas Activas', color: colores.peligro, bg: `${colores.peligro}15` },
          { valor: '1,247', label: 'Eventos / 24h', color: colores.advertencia, bg: `${colores.advertencia}15` },
          { valor: '91%', label: 'Cumplimiento', color: colores.exito, bg: `${colores.exito}15` },
        ].map(({ valor, label, color, bg }) => (
          <div key={label} style={{ backgroundColor: bg, border: `1px solid ${color}33`, borderRadius: '12px', padding: '10px 8px', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', fontWeight: 'bold', color, margin: 0, lineHeight: 1 }}>{valor}</p>
            <p style={{ fontSize: '9px', color: colores.textoMedio, margin: '4px 0 0 0', lineHeight: 1.3 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Eventos sparkline */}
      <div style={{ backgroundColor: colores.fondoTerciario, borderRadius: '14px', padding: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Eye size={11} color={colores.primario} />
            <p style={{ fontSize: '11px', fontWeight: '600', color: colores.textoClaro, margin: 0 }}>Eventos de Seguridad · 12h</p>
          </div>
          <span style={{ fontSize: '10px', color: colores.peligro, fontWeight: '700', backgroundColor: `${colores.peligro}20`, padding: '2px 7px', borderRadius: '20px' }}>↓ -15%</span>
        </div>
        <Spark data={eventosSpark} color={colores.peligro} h={28} />
      </div>

      {/* Alertas */}
      <div>
        <p style={{ fontSize: '10px', fontWeight: '600', color: colores.textoMedio, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0' }}>Alertas Recientes</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {alertas.map(({ tipo, texto, tiempo }) => (
            <div key={texto} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', backgroundColor: colores.fondoTerciario, borderRadius: '10px', borderLeft: `3px solid ${nivelColor[tipo]}` }}>
              <AlertTriangle size={13} color={nivelColor[tipo]} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '10px', color: colores.textoClaro, flex: 1, lineHeight: 1.3 }}>{texto}</span>
              <span style={{ fontSize: '9px', color: colores.textoMedio }}>{tiempo}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cumplimiento */}
      <div style={{ backgroundColor: colores.fondoTerciario, borderRadius: '14px', padding: '14px' }}>
        <p style={{ fontSize: '10px', fontWeight: '600', color: colores.textoMedio, margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Cumplimiento Normativo</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
          {cumplimiento.map(({ norma, score, color }) => (
            <div key={norma} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '10px', color: colores.textoClaro, width: '70px', flexShrink: 0 }}>{norma}</span>
              <div style={{ flex: 1, height: '8px', borderRadius: '4px', backgroundColor: `${colores.borde}66`, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${score}%`, borderRadius: '4px', backgroundColor: color, boxShadow: `0 0 8px ${color}66` }} />
              </div>
              <span style={{ fontSize: '10px', color, fontWeight: '700', width: '32px', textAlign: 'right' }}>{score}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={() => onNavigate?.('seguridadSOC')}
        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: 'none', background: `linear-gradient(135deg, ${colores.peligro}, ${colores.advertencia})`, color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'opacity 0.2s', marginTop: 'auto' }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        Revisar seguridad <ArrowRight size={16} />
      </button>

      {/* Modal Info */}
      {showInfo && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }} onClick={() => setShowInfo(false)}>
          <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', padding: '24px', maxWidth: '400px', width: '90%' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colores.textoClaro, margin: 0 }}>Nivel de Seguridad</h3>
              <button onClick={() => setShowInfo(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: colores.textoMedio }}><X size={24} /></button>
            </div>
            <p style={{ fontSize: '13px', color: colores.textoMedio, lineHeight: 1.6, marginBottom: '16px' }}>
              Centro de operaciones de seguridad con IA que monitorea alertas, eventos, vulnerabilidades y cumplimiento normativo en tiempo real.
            </p>
            <button onClick={() => setShowInfo(false)} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: 'none', background: `linear-gradient(135deg, ${colores.peligro}, ${colores.advertencia})`, color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Entendido</button>
          </div>
        </div>
      )}

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
};
