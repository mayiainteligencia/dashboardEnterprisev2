import React, { useState } from 'react';
import { Calendar, Bell, Menu, ArrowLeftRight, Sparkles } from 'lucide-react';
import { WAI_BRAND_CONFIG } from '../../config/branding';

interface WaiHeaderProps {
  config: typeof WAI_BRAND_CONFIG;
  onMenu?: () => void;
}

export const WaiHeader: React.FC<WaiHeaderProps> = ({ 
  config, 
  onMenu
}) => {
  const { theme, clientName, slogan } = config;
  const [showNotif, setShowNotif] = useState(false);

  const fecha = new Date();
  const opciones: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  };
  const fechaFormateada = fecha.toLocaleDateString('es-MX', opciones);

  return (
    <header 
      style={{ 
        height: '80px',
        backgroundColor: 'rgba(2, 11, 28, 0.65)', // Muy oscuro translúcido
        backdropFilter: 'blur(12px)',
        borderBottom: `1.5px solid ${theme.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(16px, 3vw, 32px)',
        gap: '20px',
        flexShrink: 0,
        zIndex: 10,
      }}
    >
      {/* LEFT COLUMN: Brand Title, Assembly Name, and Slogan as Subtitle */}
      <div 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '6px', 
          minWidth: 0, 
          flex: 1 
        }}
      >
        {/* Row 1: Brand & Assembly indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'nowrap' }}>
          {onMenu && (
            <button
              onClick={onMenu}
              style={{
                width: '32px', height: '32px', borderRadius: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)', border: 'none', cursor: 'pointer',
                display: 'none', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Menu size={16} color="#FFFFFF" />
            </button>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: theme.secondary }} />
            <span style={{ fontSize: '13px', fontWeight: '900', letterSpacing: '0.8px', color: '#FFFFFF', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>
              WAI México
            </span>
          </div>
          <div style={{ width: '1px', height: '14px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />
          <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: theme.secondary, letterSpacing: '1.2px', fontFamily: "'Inter', sans-serif" }}>
            Asamblea Nacional
          </span>
        </div>

        {/* Row 2: Slogan (grows horizontally to use the main content space) */}
        <span 
          style={{ 
            fontSize: '10.5px', 
            fontStyle: 'italic',
            fontWeight: '500',
            color: theme.textSecondary, 
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            maxWidth: '95%',
            opacity: 0.85,
            letterSpacing: '0.3px',
            fontFamily: "'Inter', sans-serif"
          }}
          title={slogan}
        >
          &ldquo;{slogan}&rdquo;
        </span>
      </div>

      {/* RIGHT: Compact Styled Event Date Badge */}
      <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            backgroundColor: 'rgba(212, 175, 55, 0.05)',
            border: `1px solid rgba(212, 175, 55, 0.25)`,
            borderRadius: '8px',
            padding: '8px 14px',
            boxShadow: '0 2px 10px rgba(212, 175, 55, 0.03)',
          }}
        >
          <Calendar size={13} color={theme.secondary} />
          <span style={{ fontSize: '10px', fontWeight: '850', color: theme.secondary, letterSpacing: '0.5px', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>
            24 de Septiembre, 2026
          </span>
        </div>
      </div>
    </header>
  );
};
