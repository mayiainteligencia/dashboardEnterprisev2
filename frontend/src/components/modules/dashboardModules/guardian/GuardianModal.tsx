import React from 'react';
import { X } from 'lucide-react';
import { brandingConfig } from '../../../../config/branding';

interface GuardianModalProps {
  titulo: string;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: number;
}

export const GuardianModal: React.FC<GuardianModalProps> = ({ titulo, onClose, children, maxWidth = 520 }) => {
  const { colores } = brandingConfig;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
        animation: 'gd-fade 0.2s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth, maxHeight: '85vh', overflowY: 'auto',
          background: colores.fondoClaro, borderRadius: '20px', padding: '24px',
          border: `1px solid ${colores.borde}60`, boxShadow: colores.sombraGrande,
          animation: 'gd-pop 0.22s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: colores.textoClaro, margin: 0 }}>{titulo}</h3>
          <button onClick={onClose} style={{
            border: 'none', background: `${colores.borde}30`, borderRadius: '8px',
            width: '32px', height: '32px', cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center', color: colores.textoMedio,
          }}>
            <X size={18} />
          </button>
        </div>
        {children}
        <style>{`
          @keyframes gd-fade { from { opacity: 0 } to { opacity: 1 } }
          @keyframes gd-pop { from { transform: scale(0.96); opacity: 0 } to { transform: scale(1); opacity: 1 } }
        `}</style>
      </div>
    </div>
  );
};
