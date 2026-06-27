import React, { useEffect, useState } from 'react';
import { useLiveFeed } from '../context/LiveFeedContext';
import type { EventType, LiveEvent } from '../context/LiveFeedContext';
import { X, Car, Phone, Zap, AlertCircle, Calendar, CreditCard } from 'lucide-react';

const COLORS: Record<EventType, string> = {
  venta:       '#10B981',
  seguimiento: '#F59E0B',
  lead:        '#8B5CF6',
  alerta:      '#EF4444',
  cita:        '#3B82F6',
  credito:     '#06B6D4',
};

const ICONS: Record<EventType, React.FC<{ size: number; color: string }>> = {
  venta:       Car,
  seguimiento: Phone,
  lead:        Zap,
  alerta:      AlertCircle,
  cita:        Calendar,
  credito:     CreditCard,
};

interface ToastItem extends LiveEvent {
  progress: number;
}

const DURATION = 6000;

export const LiveToast: React.FC = () => {
  const { latestEvent } = useLiveFeed();
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    if (!latestEvent) return;
    const toast: ToastItem = { ...latestEvent, progress: 100 };
    setToasts(prev => [toast, ...prev].slice(0, 4));

    const start = Date.now();
    const id = latestEvent.id;
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.max(0, 100 - (elapsed / DURATION) * 100);
      setToasts(prev => prev.map(t => t.id === id ? { ...t, progress: pct } : t));
      if (pct > 0) requestAnimationFrame(tick);
      else setToasts(prev => prev.filter(t => t.id !== id));
    };
    requestAnimationFrame(tick);
  }, [latestEvent]);

  const dismiss = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      pointerEvents: 'none',
    }}>
      {toasts.map((t, i) => {
        const color = COLORS[t.type];
        const Icon = ICONS[t.type];
        return (
          <div
            key={t.id}
            style={{
              width: '340px',
              background: 'rgba(255,255,255,0.97)',
              backdropFilter: 'blur(20px)',
              borderRadius: '16px',
              boxShadow: `0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px ${color}30`,
              overflow: 'hidden',
              pointerEvents: 'all',
              animation: 'toastIn 0.4s cubic-bezier(0.34,1.56,0.64,1)',
              opacity: 1 - i * 0.08,
              transform: `scale(${1 - i * 0.02}) translateY(${i * 4}px)`,
              transition: 'opacity 0.2s, transform 0.2s',
              borderLeft: `4px solid ${color}`,
            }}
          >
            <div style={{ padding: '12px 14px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={18} color={color} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#111', lineHeight: 1.3 }}>{t.title}</p>
                <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#666', lineHeight: 1.4 }}>{t.body}</p>
                <p style={{ margin: '4px 0 0', fontSize: '10px', color: '#999' }}>{t.time}</p>
              </div>
              <button
                onClick={() => dismiss(t.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', flexShrink: 0 }}
              >
                <X size={14} color="#999" />
              </button>
            </div>
            {/* Progress bar */}
            <div style={{ height: '3px', background: '#f0f0f0' }}>
              <div style={{
                height: '100%', background: color,
                width: `${t.progress}%`,
                transition: 'width 0.05s linear',
              }} />
            </div>
          </div>
        );
      })}

      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(60px) scale(0.9); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
      `}</style>
    </div>
  );
};
