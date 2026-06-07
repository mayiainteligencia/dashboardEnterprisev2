import React, { useState } from 'react';
import { ScanFace, Loader2 } from 'lucide-react';
import { brandingConfig } from '../../../../config/branding';
import { GuardianCard, GuardianButton } from './GuardianCard';
import { muestrasDeepfake } from '../../../../mock/guardianMockData';

export const DeepfakeDetectionModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [analizando, setAnalizando] = useState(false);
  const [progreso, setProgreso] = useState(99);
  const [resultado, setResultado] = useState<number | null>(null);

  const analizar = () => {
    if (analizando) return;
    setAnalizando(true);
    setResultado(null);
    setProgreso(0);
    const inicio = Date.now();
    const dur = 2400;
    const tick = setInterval(() => {
      const p = Math.min(100, Math.round(((Date.now() - inicio) / dur) * 100));
      setProgreso(p);
      if (p >= 100) {
        clearInterval(tick);
        setAnalizando(false);
        setResultado(Math.floor(60 + Math.random() * 39));
      }
    }, 60);
  };

  return (
    <GuardianCard
      titulo="Detección de Deepfakes"
      subtitulo="Video · IA vs IA"
      icon={<ScanFace size={20} color={colores.acento} />}
    >
      <div style={{ fontSize: '12px', color: colores.textoMedio, marginBottom: '12px' }}>
        Analizados: <strong style={{ color: colores.textoClaro }}>102/100</strong>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '14px' }}>
        {muestrasDeepfake.map((m) => {
          const sint = m.porcentajeSintetico >= 50;
          const col = sint ? colores.peligro : colores.exito;
          return (
            <div key={m.id} style={{ textAlign: 'center' }}>
              <div style={{
                height: '52px', borderRadius: '10px',
                background: `linear-gradient(135deg, ${col}25, ${col}08)`,
                border: `1px solid ${col}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <ScanFace size={18} color={col} />
              </div>
              <div style={{ fontSize: '10px', fontWeight: 700, color: col, marginTop: '4px' }}>
                {m.porcentajeSintetico}% {sint ? 'Sintético' : 'Real'}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ fontSize: '11px', color: colores.textoMedio, marginBottom: '6px' }}>
        Cola de análisis actual: {progreso}%
      </div>
      <div style={{ height: '8px', borderRadius: '99px', background: `${colores.borde}40`, overflow: 'hidden', marginBottom: '14px' }}>
        <div style={{
          height: '100%', width: `${progreso}%`,
          background: colores.gradientePrimario, transition: 'width 0.1s linear',
        }} />
      </div>

      {resultado !== null && (
        <div style={{
          fontSize: '12px', fontWeight: 700, marginBottom: '12px',
          color: resultado >= 50 ? colores.peligro : colores.exito,
        }}>
          Resultado: {resultado}% sintético {resultado >= 50 ? '— Deepfake probable' : '— Auténtico'}
        </div>
      )}

      <GuardianButton onClick={analizar} disabled={analizando} variant="solid">
        {analizando ? <Loader2 size={16} className="gd-spin" /> : <ScanFace size={16} />}
        {analizando ? 'Analizando…' : 'Analizar contenido'}
      </GuardianButton>

      <style>{`@keyframes gd-spin{to{transform:rotate(360deg)}} .gd-spin{animation:gd-spin 1s linear infinite}`}</style>
    </GuardianCard>
  );
};
