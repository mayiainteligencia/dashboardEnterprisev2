import React, { useState, useCallback } from 'react';
import { Zap, X, CheckCircle } from 'lucide-react';
import { brandingConfig } from '../../config/branding';

const colores = brandingConfig.colores;

// ── Modal overlay + card ──────────────────────────────────────────────────────
export const ConfirmModal: React.FC<{
  open: boolean;
  onAccept: () => void;
  onDecline: () => void;
}> = ({ open, onAccept, onDecline }) => {
  if (!open) return null;
  return (
    <div
      onClick={onDecline}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,.55)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'fadeIn .2s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: colores.fondoSecundario,
          border: `1px solid ${colores.primario}40`,
          borderRadius: '16px',
          padding: '28px 32px',
          maxWidth: '420px',
          width: '90%',
          boxShadow: `0 24px 60px rgba(0,0,0,.4), 0 0 0 1px ${colores.primario}20`,
          animation: 'slideUp .25s ease',
          textAlign: 'center',
        }}
      >
        {/* Icon */}
        <div style={{
          width: '52px', height: '52px', borderRadius: '50%',
          background: `linear-gradient(135deg, ${colores.primario}20, ${colores.primario}40)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px',
        }}>
          <Zap size={24} color={colores.primario} />
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '16px', fontWeight: 800, color: colores.textoClaro,
          margin: '0 0 8px',
        }}>
          Confirmar plan de accion
        </h3>

        {/* Description */}
        <p style={{
          fontSize: '13px', color: colores.textoMedio, lineHeight: 1.5,
          margin: '0 0 24px',
        }}>
          Una vez que des <strong style={{ color: colores.textoClaro }}>Aceptar</strong>, procederemos a realizar el plan de accion sugerido por MAYIA. Podras ver el progreso en tiempo real desde el panel de alertas.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            onClick={onAccept}
            style={{
              background: colores.primario,
              border: 'none',
              color: '#fff',
              padding: '10px 28px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all .2s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = `0 8px 20px ${colores.primario}50`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <CheckCircle size={14} /> Aceptar
          </button>
          <button
            onClick={onDecline}
            style={{
              background: 'transparent',
              border: `1px solid ${colores.borde}`,
              color: colores.textoMedio,
              padding: '10px 24px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `${colores.borde}30`; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            Cancelar
          </button>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { opacity:0; transform:translateY(20px) scale(.96) } to { opacity:1; transform:translateY(0) scale(1) } }
      `}</style>
    </div>
  );
};

// ── Success toast (shows briefly after accepting) ─────────────────────────────
export const SuccessToast: React.FC<{ show: boolean }> = ({ show }) => {
  if (!show) return null;
  return (
    <div style={{
      position: 'fixed', top: '24px', right: '24px', zIndex: 10000,
      background: colores.exito,
      color: '#fff',
      padding: '12px 20px',
      borderRadius: '10px',
      fontSize: '13px',
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      boxShadow: `0 8px 24px ${colores.exito}50`,
      animation: 'slideIn .3s ease',
    }}>
      <CheckCircle size={16} /> Plan de accion iniciado con exito
      <style>{`
        @keyframes slideIn { from { opacity:0; transform:translateX(40px) } to { opacity:1; transform:translateX(0) } }
      `}</style>
    </div>
  );
};

// ── Hook for easy usage ───────────────────────────────────────────────────────
export const useConfirm = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const requestConfirm = useCallback(() => {
    setModalOpen(true);
  }, []);

  const handleAccept = useCallback(() => {
    setModalOpen(false);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  }, []);

  const handleDecline = useCallback(() => {
    setModalOpen(false);
  }, []);

  return { modalOpen, toastVisible, requestConfirm, handleAccept, handleDecline };
};
