import React from 'react';
import { brandingConfig } from '../../../../config/branding';

interface GuardianCardProps {
  titulo: string;
  subtitulo?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
}

// Shell de tarjeta Guardian. Mismo lenguaje visual que las tarjetas del sistema
// (glass, radius 20, borde con alpha) pero consumiendo brandingConfig.
export const GuardianCard: React.FC<GuardianCardProps> = ({
  titulo, subtitulo, icon, children, footer, style, bodyStyle,
}) => {
  const { colores } = brandingConfig;
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${colores.fondoSecundario}dd 0%, ${colores.fondoTerciario}dd 100%)`,
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '24px',
        border: `1px solid ${colores.borde}40`,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      <div style={{ marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        {icon && (
          <div style={{
            width: '40px', height: '40px', borderRadius: '12px',
            background: `${colores.acento}20`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            {icon}
          </div>
        )}
        <div style={{ minWidth: 0 }}>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: colores.textoClaro, margin: 0 }}>
            {titulo}
          </h3>
          {subtitulo && (
            <p style={{ fontSize: '12px', color: colores.textoMedio, margin: '2px 0 0 0' }}>
              {subtitulo}
            </p>
          )}
        </div>
      </div>

      <div style={{ flex: 1, ...bodyStyle }}>{children}</div>

      {footer && (
        <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: `1px solid ${colores.borde}40` }}>
          {footer}
        </div>
      )}
    </div>
  );
};

// Botón estándar Guardian (acento del branding).
export const GuardianButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'solid' | 'ghost' }
> = ({ children, variant = 'ghost', style, ...rest }) => {
  const { colores } = brandingConfig;
  const solid = variant === 'solid';
  return (
    <button
      {...rest}
      style={{
        width: '100%', padding: '11px', borderRadius: '12px',
        border: `1px solid ${colores.acento}`,
        background: solid ? colores.acento : `${colores.acento}12`,
        color: solid ? colores.textoEnOscuro : colores.acento,
        fontSize: '13px', fontWeight: 600, cursor: 'pointer',
        transition: 'all 0.2s', display: 'flex', alignItems: 'center',
        justifyContent: 'center', gap: '8px',
        ...style,
      }}
    >
      {children}
    </button>
  );
};
