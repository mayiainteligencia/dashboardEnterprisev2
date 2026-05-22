import React, { useState, useEffect, useRef } from 'react';
import { Server, MoreVertical, X, ArrowRight, Thermometer, Wifi, Zap } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

interface InfraestructuraModuleProps {
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

export const InfraestructuraModule: React.FC<InfraestructuraModuleProps> = ({ onNavigate }) => {
  const { colores } = brandingConfig;
  const [showMenu, setShowMenu] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const energiaSpark = [420, 435, 428, 441, 450, 438, 455, 462, 448, 470, 465, 472];
  const tempSpark = [21.2, 21.5, 22.0, 21.8, 22.3, 22.1, 21.9, 22.4, 22.2, 22.0, 21.7, 21.8];

  const racks = [
    { nombre: 'Rack A1', uso: 87, temp: 21.8, estado: 'ok' },
    { nombre: 'Rack A2', uso: 92, temp: 22.4, estado: 'warning' },
    { nombre: 'Rack B1', uso: 64, temp: 21.2, estado: 'ok' },
    { nombre: 'Rack B2', uso: 78, temp: 21.9, estado: 'ok' },
  ];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setShowMenu(false);
    };
    if (showMenu) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showMenu]);

  return (
    <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '24px', border: `1px solid ${colores.borde}`, padding: '20px', display: 'flex', flexDirection: 'column', height: '100%', gap: '14px', position: 'relative' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: colores.gradientePrimario, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Server size={22} color="white" />
          </div>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: colores.textoClaro, margin: 0, lineHeight: 1.2 }}>Estado de Infraestructura</h3>
            <p style={{ fontSize: '11px', color: colores.textoMedio, margin: 0 }}>
              Data Center · <span style={{ color: colores.exito, fontWeight: 600 }}>● Operativo</span>
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
                { label: 'Ver Infraestructura Completa', action: () => { onNavigate?.('centroOperacion'); setShowMenu(false); } },
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
          { valor: '99.97%', label: 'Uptime', color: colores.exito, bg: `${colores.exito}15` },
          { valor: '472 kW', label: 'Energía', color: colores.primario, bg: `${colores.primario}15` },
          { valor: '21.8°C', label: 'Temp. Prom.', color: colores.advertencia, bg: `${colores.advertencia}15` },
        ].map(({ valor, label, color, bg }) => (
          <div key={label} style={{ backgroundColor: bg, border: `1px solid ${color}33`, borderRadius: '12px', padding: '10px 8px', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', fontWeight: 'bold', color, margin: 0, lineHeight: 1 }}>{valor}</p>
            <p style={{ fontSize: '9px', color: colores.textoMedio, margin: '4px 0 0 0', lineHeight: 1.3 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Sparklines */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div style={{ backgroundColor: colores.fondoTerciario, borderRadius: '14px', padding: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <Zap size={11} color={colores.primario} />
            <p style={{ fontSize: '10px', fontWeight: '600', color: colores.textoClaro, margin: 0 }}>Consumo Energético</p>
          </div>
          <Spark data={energiaSpark} color={colores.primario} h={24} />
        </div>
        <div style={{ backgroundColor: colores.fondoTerciario, borderRadius: '14px', padding: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <Thermometer size={11} color={colores.advertencia} />
            <p style={{ fontSize: '10px', fontWeight: '600', color: colores.textoClaro, margin: 0 }}>Temperatura</p>
          </div>
          <Spark data={tempSpark} color={colores.advertencia} h={24} />
        </div>
      </div>

      {/* Rack Utilization */}
      <div style={{ backgroundColor: colores.fondoTerciario, borderRadius: '14px', padding: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <p style={{ fontSize: '12px', fontWeight: '600', color: colores.textoClaro, margin: 0 }}>Utilización de Racks</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Wifi size={10} color={colores.exito} />
            <span style={{ fontSize: '9px', color: colores.exito, fontWeight: '700' }}>Conectividad OK</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
          {racks.map(({ nombre, uso, temp, estado }) => (
            <div key={nombre} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '10px', color: colores.textoClaro, width: '52px', flexShrink: 0, fontWeight: 500 }}>{nombre}</span>
              <div style={{ flex: 1, height: '8px', borderRadius: '4px', backgroundColor: `${colores.borde}66`, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${uso}%`, borderRadius: '4px', backgroundColor: estado === 'warning' ? colores.advertencia : colores.exito, boxShadow: `0 0 8px ${estado === 'warning' ? colores.advertencia : colores.exito}66` }} />
              </div>
              <span style={{ fontSize: '10px', fontWeight: '700', color: estado === 'warning' ? colores.advertencia : colores.exito, width: '32px', textAlign: 'right' }}>{uso}%</span>
              <span style={{ fontSize: '9px', color: colores.textoMedio }}>{temp}°C</span>
            </div>
          ))}
        </div>
      </div>

      {/* Capacidad */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: colores.fondoTerciario, borderRadius: '14px', padding: '12px' }}>
          <Donut pct={78} color={colores.primario} size={44} />
          <div>
            <p style={{ fontSize: '11px', fontWeight: '600', color: colores.textoClaro, margin: 0 }}>Capacidad</p>
            <p style={{ fontSize: '9px', color: colores.textoMedio, margin: '2px 0 0 0' }}>78% utilizada</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: colores.fondoTerciario, borderRadius: '14px', padding: '12px' }}>
          <Donut pct={96} color={colores.exito} size={44} />
          <div>
            <p style={{ fontSize: '11px', fontWeight: '600', color: colores.textoClaro, margin: 0 }}>Red</p>
            <p style={{ fontSize: '9px', color: colores.textoMedio, margin: '2px 0 0 0' }}>96% disponible</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={() => onNavigate?.('centroOperacion')}
        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: 'none', background: colores.gradientePrimario, color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'opacity 0.2s', marginTop: 'auto' }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        Ver mi infraestructura <ArrowRight size={16} />
      </button>

      {/* Modal Info */}
      {showInfo && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }} onClick={() => setShowInfo(false)}>
          <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '20px', padding: '24px', maxWidth: '400px', width: '90%' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: colores.textoClaro, margin: 0 }}>Estado de Infraestructura</h3>
              <button onClick={() => setShowInfo(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: colores.textoMedio }}><X size={24} /></button>
            </div>
            <div style={{ padding: '16px', backgroundColor: colores.fondoTerciario, borderRadius: '12px', marginBottom: '16px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: colores.gradientePrimario, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <Server size={28} color="white" />
              </div>
              <p style={{ fontSize: '14px', color: colores.textoClaro, lineHeight: '1.6', marginBottom: '12px' }}>
                <strong>Estado de Infraestructura</strong> monitorea en tiempo real la salud de racks, energía, conectividad, temperatura y capacidad de su data center.
              </p>
              <div style={{ borderTop: `1px solid ${colores.borde}`, paddingTop: '12px' }}>
                {['Monitoreo de racks y servidores 24/7', 'Control de temperatura y climatización', 'Gestión de capacidad y energía', 'Alertas proactivas de infraestructura'].map(item => (
                  <p key={item} style={{ fontSize: '12px', color: colores.textoMedio, marginBottom: '8px' }}>
                    <strong style={{ color: colores.exito }}>✓</strong> {item}
                  </p>
                ))}
              </div>
            </div>
            <button onClick={() => setShowInfo(false)} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: 'none', background: colores.gradientePrimario, color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Entendido</button>
          </div>
        </div>
      )}
    </div>
  );
};
