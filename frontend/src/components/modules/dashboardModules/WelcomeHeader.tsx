import React from 'react';
import { brandingConfig } from '../../../config/branding';

export const WelcomeHeader: React.FC = () => {
  const { empresa, colores } = brandingConfig;

  return (
    <div
      style={{
        marginBottom: '32px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
      <img
        src="/assets/logosNativos/mayiaLogoBlanco.png"
        alt="MAYIA"
        style={{
          width: '72px',
          height: '72px',
          objectFit: 'contain',
          padding: '10px',
          borderRadius: '16px',
          background: colores.primario,
          flexShrink: 0,
        }}
      />
      <div>
        <h1
          style={{
            fontSize: '40px',
            fontWeight: '300',
            color: colores.textoClaro,
            marginBottom: '8px',
            letterSpacing: '-0.5px',
          }}
        >
          Hola, bienvenido al{' '}
          <span style={{ fontWeight: '600' }}>{empresa.nombre}</span>, agencia de autos.
        </h1>
        <p
          style={{
            fontSize: '28px',
            fontWeight: '300',
            color: colores.textoMedio,
            margin: 0,
            letterSpacing: '-0.5px',
          }}
        >
          ¿En qué podemos ayudarte?
        </p>
      </div>
      </div>

      {/* Logo MAYIA a la derecha sobre cuadro negro con degradado */}
      <div
        style={{
          width: '160px',
          height: '90px',
          borderRadius: '0',
          background: 'linear-gradient(135deg, #000000 0%, #2b2b2b 100%)',
          flexShrink: 0,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src="/assets/logosNativos/mayiaLogoBlanco.png"
          alt="MAYIA"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transform: 'scale(0.97)',
          }}
        />
      </div>
    </div>
  );
};