import React, { useState } from 'react';
import { Fingerprint, ScanFace, AudioLines, ScanEye, CheckCircle2 } from 'lucide-react';
import { brandingConfig } from '../../../../config/branding';
import { GuardianCard } from './GuardianCard';
import { IrisScanner } from './IrisScanner';
import { biometria } from '../../../../mock/guardianMockData';

type Modo = 'Face' | 'Voice' | 'Fingerprint' | 'Iris';
const iconos: Record<Modo, React.ReactNode> = {
  Face: <ScanFace size={15} />, Voice: <AudioLines size={15} />,
  Fingerprint: <Fingerprint size={15} />, Iris: <ScanEye size={15} />,
};

export const BiometricVerificationModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [modo, setModo] = useState<Modo>('Face');
  const data = biometria[modo];
  const matchCol = data.match >= 80 ? colores.exito : data.match >= 50 ? colores.advertencia : colores.peligro;

  return (
    <GuardianCard
      titulo="Verificación Biométrica"
      subtitulo="Multifactor"
      icon={<Fingerprint size={20} color={colores.acento} />}
      footer={
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: colores.exito }}>
          <CheckCircle2 size={15} /> Punto de cumplimiento
        </div>
      }
    >
      <div style={{ display: 'flex', gap: '4px', marginBottom: '14px' }}>
        {(['Face', 'Voice', 'Fingerprint', 'Iris'] as Modo[]).map((m) => (
          <button key={m} onClick={() => setModo(m)} style={{
            flex: 1, padding: '7px 2px', borderRadius: '8px', cursor: 'pointer',
            border: `1px solid ${modo === m ? colores.acento : colores.borde}40`,
            background: modo === m ? `${colores.acento}18` : 'transparent',
            color: modo === m ? colores.acento : colores.textoMedio,
            fontSize: '10px', fontWeight: 600,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
          }}>
            {iconos[m]}{m}
          </button>
        ))}
      </div>

      {modo === 'Iris' ? (
        <IrisScanner size={150} />
      ) : (
        <>
          <div style={{ textAlign: 'center', marginBottom: '14px' }}>
            <div style={{ fontSize: '34px', fontWeight: 800, color: matchCol }}>{data.match}%</div>
            <div style={{ fontSize: '11px', color: colores.textoMedio }}>Porcentaje de match</div>
          </div>
          <div style={{ fontSize: '11px', color: colores.textoMedio, marginBottom: '6px', fontWeight: 600 }}>
            Log de autenticación
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {data.logs.map((l, i) => (
              <div key={i} style={{
                display: 'flex', gap: '8px', fontSize: '11px',
                padding: '7px 10px', borderRadius: '8px', background: `${colores.borde}20`,
              }}>
                <span style={{ color: colores.textoOscuro, fontFamily: 'monospace' }}>{l.timestamp}</span>
                <span style={{ color: colores.textoMedio }}>{l.metodo}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </GuardianCard>
  );
};
