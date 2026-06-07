import React, { useEffect, useRef, useState } from 'react';
import { AudioLines, Play, Loader2 } from 'lucide-react';
import { brandingConfig } from '../../../../config/branding';
import { GuardianCard, GuardianButton } from './GuardianCard';

const BARS = 36;

export const VoiceAnalysisModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [tab, setTab] = useState<'estado' | 'historico'>('estado');
  const [fase, setFase] = useState<'idle' | 'analizando' | 'listo'>('idle');
  const [alturas, setAlturas] = useState<number[]>(() => Array(BARS).fill(0.3));
  const raf = useRef<number>(0);

  // Waveform animada en loop (requestAnimationFrame).
  useEffect(() => {
    let t = 0;
    const loop = () => {
      t += 0.18;
      const amp = fase === 'analizando' ? 1 : 0.55;
      setAlturas(Array.from({ length: BARS }, (_, i) =>
        0.2 + Math.abs(Math.sin(t + i * 0.5)) * amp * (0.5 + Math.random() * 0.5)
      ));
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, [fase]);

  const reproducir = () => {
    if (fase === 'analizando') return;
    setFase('analizando');
    setTimeout(() => setFase('listo'), 2800);
  };

  return (
    <GuardianCard
      titulo="Análisis Sintético de Voz"
      subtitulo="Audio · Scutos 19/06"
      icon={<AudioLines size={20} color={colores.acento} />}
    >
      <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
        {(['estado', 'historico'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: '7px', borderRadius: '8px', cursor: 'pointer',
            border: `1px solid ${tab === t ? colores.acento : colores.borde}40`,
            background: tab === t ? `${colores.acento}18` : 'transparent',
            color: tab === t ? colores.acento : colores.textoMedio,
            fontSize: '11px', fontWeight: 600,
          }}>
            {t === 'estado' ? 'Análisis estado' : 'Datos histórico'}
          </button>
        ))}
      </div>

      {tab === 'estado' ? (
        <>
          <div style={{
            height: '64px', display: 'flex', alignItems: 'center', gap: '2px',
            justifyContent: 'center', padding: '0 4px', marginBottom: '14px',
          }}>
            {alturas.map((h, i) => (
              <div key={i} style={{
                flex: 1, height: `${h * 100}%`, borderRadius: '99px',
                background: fase === 'analizando' ? colores.peligro : colores.acento,
                opacity: 0.85, transition: 'height 0.08s linear',
              }} />
            ))}
          </div>
          {fase === 'listo' && (
            <div style={{ fontSize: '12px', fontWeight: 700, color: colores.peligro, marginBottom: '12px' }}>
              Sintético detectado 87%
            </div>
          )}
        </>
      ) : (
        <div style={{ fontSize: '12px', color: colores.textoMedio, marginBottom: '14px', lineHeight: 1.7 }}>
          Muestras analizadas: <strong style={{ color: colores.textoClaro }}>1,204</strong><br />
          Sintéticas confirmadas: <strong style={{ color: colores.peligro }}>318</strong><br />
          Precisión del modelo: <strong style={{ color: colores.exito }}>98.4%</strong>
        </div>
      )}

      <GuardianButton onClick={reproducir} disabled={fase === 'analizando'}>
        {fase === 'analizando' ? <Loader2 size={16} className="gd-spin" /> : <Play size={16} />}
        {fase === 'analizando' ? 'Analizando muestra…' : 'Reproducir muestra'}
      </GuardianButton>
    </GuardianCard>
  );
};
