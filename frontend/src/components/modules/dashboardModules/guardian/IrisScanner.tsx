import React, { useState } from 'react';
import { ScanEye, CheckCircle2, Loader2 } from 'lucide-react';
import { brandingConfig } from '../../../../config/branding';
import { GuardianButton } from './GuardianCard';
import { irisCapas } from '../../../../mock/guardianMockData';

interface IrisScannerProps {
  size?: number;
  detailed?: boolean; // versión expandida (Identity Vault): muestra lectura de capas + hash
}

// Escaneo de iris animado y reutilizable. Anillos concéntricos + barra de progreso.
// Glows y colores 100% desde brandingConfig.
export const IrisScanner: React.FC<IrisScannerProps> = ({ size = 180, detailed = false }) => {
  const { colores } = brandingConfig;
  const [fase, setFase] = useState<'idle' | 'escaneando' | 'listo'>('idle');
  const [progreso, setProgreso] = useState(0);

  const escanear = () => {
    if (fase === 'escaneando') return;
    setFase('escaneando');
    setProgreso(0);
    const inicio = Date.now();
    const dur = detailed ? 4500 : 3500;
    const tick = setInterval(() => {
      const p = Math.min(100, Math.round(((Date.now() - inicio) / dur) * 100));
      setProgreso(p);
      if (p >= 100) {
        clearInterval(tick);
        setFase('listo');
      }
    }, 50);
  };

  const escaneando = fase === 'escaneando';
  const listo = fase === 'listo';
  const hash = '0x7a3f…c91e';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <div style={{
        position: 'relative', width: size, height: size, borderRadius: '50%',
        background: `radial-gradient(circle at 50% 50%, ${colores.acento}40 0%, ${colores.primario} 60%, ${colores.primarioOscuro} 100%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
        boxShadow: `0 0 ${escaneando ? 40 : 16}px ${colores.acento}${escaneando ? '70' : '30'}`,
        transition: 'box-shadow 0.4s',
      }}>
        {/* iris placeholder — pupila */}
        <div style={{
          width: size * 0.32, height: size * 0.32, borderRadius: '50%',
          background: colores.primarioOscuro, border: `2px solid ${colores.acento}60`, zIndex: 2,
        }} />
        {/* anillos concéntricos */}
        {[0.55, 0.75, 0.95].map((r, i) => (
          <div key={i} style={{
            position: 'absolute', width: size * r, height: size * r, borderRadius: '50%',
            border: `1px solid ${colores.acento}${escaneando ? '80' : '30'}`,
            animation: escaneando ? `gd-pulse 1.6s ${i * 0.3}s infinite ease-out` : 'none',
          }} />
        ))}
        {/* línea de barrido */}
        {escaneando && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
            background: `linear-gradient(90deg, transparent, ${colores.acento}, transparent)`,
            boxShadow: `0 0 12px ${colores.acento}`,
            animation: 'gd-sweep 1.6s linear infinite',
          }} />
        )}
        {listo && (
          <div style={{ position: 'absolute', zIndex: 3 }}>
            <CheckCircle2 size={size * 0.34} color={colores.exito} fill={`${colores.exito}30`} />
          </div>
        )}
      </div>

      {/* barra de progreso */}
      <div style={{ width: '100%', maxWidth: size + 40 }}>
        <div style={{ height: '8px', borderRadius: '99px', background: `${colores.borde}40`, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progreso}%`, background: colores.gradientePrimario, transition: 'width 0.05s linear' }} />
        </div>
        <div style={{ fontSize: '11px', color: colores.textoMedio, textAlign: 'center', marginTop: '6px' }}>
          {escaneando ? `Escaneando iris… ${progreso}%` : listo ? 'Escaneo completo' : 'Listo para escanear'}
        </div>
      </div>

      {listo && (
        <div style={{
          fontSize: '13px', fontWeight: 700, color: colores.exito,
          display: 'flex', alignItems: 'center', gap: '6px',
        }}>
          <CheckCircle2 size={16} /> Match 98.7% — Identidad verificada
        </div>
      )}

      {detailed && listo && (
        <div style={{ width: '100%' }}>
          {irisCapas.map((c) => (
            <div key={c.capa} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: colores.textoMedio, marginBottom: '3px' }}>
                <span>{c.capa}</span><span style={{ color: colores.textoClaro, fontWeight: 600 }}>{c.valor}%</span>
              </div>
              <div style={{ height: '5px', borderRadius: '99px', background: `${colores.borde}40`, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${c.valor}%`, background: colores.exito }} />
              </div>
            </div>
          ))}
          <div style={{
            marginTop: '10px', padding: '10px', borderRadius: '10px',
            background: `${colores.acento}10`, border: `1px solid ${colores.acento}30`,
            fontSize: '11px', color: colores.textoMedio,
          }}>
            Certificado en blockchain: <strong style={{ color: colores.acento }}>{hash}</strong>
          </div>
        </div>
      )}

      <GuardianButton onClick={escanear} disabled={escaneando} variant="solid" style={{ maxWidth: size + 40 }}>
        {escaneando ? <Loader2 size={16} className="gd-spin" /> : <ScanEye size={16} />}
        {escaneando ? 'Escaneando…' : listo ? 'Escanear de nuevo' : 'Iniciar escaneo de iris'}
      </GuardianButton>

      <style>{`
        @keyframes gd-sweep { 0%{top:8%} 100%{top:92%} }
        @keyframes gd-pulse { 0%{transform:scale(0.85);opacity:0.9} 100%{transform:scale(1.1);opacity:0} }
        @keyframes gd-spin { to { transform: rotate(360deg) } }
        .gd-spin { animation: gd-spin 1s linear infinite; }
      `}</style>
    </div>
  );
};
