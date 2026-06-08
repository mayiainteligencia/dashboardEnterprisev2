import React, { useState, useEffect } from 'react';
import { brandingConfig } from '../../../config/branding';

export const WelcomeHeader: React.FC = () => {
  const { colores } = brandingConfig;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div style={{ marginBottom: isMobile ? '16px' : '32px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between' }}>

      {/* Texto izquierdo */}
      <div>
        <h1
          style={{
            fontSize: isMobile ? '26px' : '48px',
            fontWeight: '300',
            color: colores.textoClaro,
            letterSpacing: '-0.5px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: isMobile ? '4px' : '8px',
            margin: '0 0 8px 0',
          }}
        >
          <span>Hola bienvenido</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            al centro de inteligencia
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: colores.primarioOscuro,
              borderRadius: '8px',
              padding: isMobile ? '2px 7px' : '4px 10px',
            }}>
              <img
                src="/assets/logosNativos/EDGENET-IA-READY-LOGO-MUNDO.png"
                alt="EdgeNET"
                style={{ height: isMobile ? '24px' : '40px', width: 'auto', objectFit: 'contain', display: 'block' }}
              />
            </span>
          </span>
        </h1>
        <p
          style={{
            fontSize: isMobile ? '16px' : '32px',
            fontWeight: '300',
            color: colores.primarioOscuro,
            margin: 0,
            letterSpacing: '-0.5px',
          }}
        >
          ¿Qué deseas resolver hoy?
        </p>
      </div>

      {/* Logos — derecha en desktop, abajo en mobile
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'row' : 'column',
        alignItems: 'center',
        gap: '8px',
        flexShrink: 0,
        marginTop: isMobile ? '12px' : '0',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.5)',
          borderRadius: '10px',
          padding: isMobile ? '6px 10px' : '8px 14px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
        }}>
          <img
            src="/assets/logosNativos/mayiaLogoBlanco.png"
            alt="Mayia"
            style={{ height: isMobile ? '22px' : '32px', width: 'auto', objectFit: 'contain', display: 'block' }}
          />
        </div>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.5)',
          borderRadius: '10px',
          padding: isMobile ? '6px 10px' : '8px 14px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
        }}>
          <img
            src="/assets/logosNativos/flai.png"
            alt="FLAI"
            style={{ height: isMobile ? '22px' : '32px', width: 'auto', objectFit: 'contain', display: 'block' }}
          />
        </div>
      </div> */}

    </div>
  );
};