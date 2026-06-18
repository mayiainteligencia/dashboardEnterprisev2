import React, { useState, useEffect } from 'react';
import type { LucideIcon } from 'lucide-react';
import { X } from 'lucide-react';
import { brandingConfig } from '../../config/branding';

// ponytail: primitivas compartidas para todos los modulos comerciales.
// Cargan el peso visual para que cada modulo quede corto y consistente con el resto del dashboard.

const { colores } = brandingConfig;

// ─── Modal de detalle ───────────────────────────────────────────────────────────
export const Modal: React.FC<{
  open: boolean; onClose: () => void; icon: LucideIcon; title: string; subtitle?: string; children: React.ReactNode;
}> = ({ open, onClose, icon: Icon, title, subtitle, children }) => {
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(2px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '24px',
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: colores.fondoSecundario, borderRadius: '24px', border: `1px solid ${colores.borde}`,
        width: '100%', maxWidth: '760px', maxHeight: '88vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 24px 64px rgba(0,0,0,0.35)', overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '18px 22px', borderBottom: `1px solid ${colores.borde}` }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '11px', background: `linear-gradient(135deg, ${colores.acento}, ${colores.acentoOscuro})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon size={21} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: colores.textoClaro, margin: 0 }}>{title}</h3>
            {subtitle && <p style={{ fontSize: '12px', color: colores.textoMedio, margin: 0 }}>{subtitle}</p>}
          </div>
          <button onClick={onClose} style={{ width: '34px', height: '34px', borderRadius: '50%', border: 'none', background: colores.fondoTerciario, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={18} color={colores.textoMedio} />
          </button>
        </div>
        <div style={{ padding: '20px 22px', overflowY: 'auto' }}>{children}</div>
      </div>
    </div>
  );
};

// ─── Card contenedora (mismo lenguaje que los modulos existentes) ───────────────
// Si recibe `detalle`, la card se vuelve clicable y abre un Modal con mas info.
export const Card: React.FC<{
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  cta?: string;
  detalle?: React.ReactNode;
  children: React.ReactNode;
}> = ({ icon: Icon, title, subtitle, badge, cta, detalle, children }) => {
  const [open, setOpen] = useState(false);
  const clickable = !!detalle;
  return (
    <>
      <div
        onClick={clickable ? () => setOpen(true) : undefined}
        style={{
          backgroundColor: colores.fondoSecundario,
          borderRadius: '24px',
          border: `1px solid ${colores.borde}`,
          padding: '16px 18px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minHeight: '280px',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          boxShadow: colores.sombra,
          cursor: clickable ? 'pointer' : 'default',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={clickable ? e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = colores.sombraGrande; } : undefined}
        onMouseLeave={clickable ? e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = colores.sombra; } : undefined}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '10px',
              background: `linear-gradient(135deg, ${colores.acento} 0%, ${colores.acentoOscuro} 100%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Icon size={20} color="white" />
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: colores.textoClaro, margin: 0 }}>{title}</h3>
              {subtitle && <p style={{ fontSize: '11px', color: colores.textoMedio, margin: 0 }}>{subtitle}</p>}
            </div>
          </div>
          {badge}
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>{children}</div>

        {cta && (
          <button
            onClick={clickable ? e => { e.stopPropagation(); setOpen(true); } : undefined}
            style={{
              width: '100%', marginTop: '10px', padding: '8px', borderRadius: '10px',
              border: `1px solid ${colores.borde}`, background: 'transparent', color: colores.acento,
              fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `${colores.acento}08`; e.currentTarget.style.borderColor = colores.acento; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = colores.borde; }}
          >{cta}</button>
        )}
      </div>
      {detalle && <Modal open={open} onClose={() => setOpen(false)} icon={Icon} title={title} subtitle={subtitle}>{detalle}</Modal>}
    </>
  );
};

// ─── Tabla simple para vistas de detalle ────────────────────────────────────────
export const DataTable: React.FC<{ cols: string[]; rows: (string | React.ReactNode)[][] }> = ({ cols, rows }) => (
  <div style={{ overflowX: 'auto' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
      <thead>
        <tr>{cols.map((c, i) => (
          <th key={i} style={{ textAlign: i === 0 ? 'left' : 'right', padding: '8px 10px', color: colores.textoMedio, fontWeight: 600, textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.3px', borderBottom: `1px solid ${colores.borde}` }}>{c}</th>
        ))}</tr>
      </thead>
      <tbody>
        {rows.map((r, ri) => (
          <tr key={ri}>{r.map((cell, ci) => (
            <td key={ci} style={{ textAlign: ci === 0 ? 'left' : 'right', padding: '8px 10px', color: colores.textoClaro, borderBottom: `1px solid ${colores.borde}55` }}>{cell}</td>
          ))}</tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─── Fila de barra horizontal con etiqueta ──────────────────────────────────────
export const BarRow: React.FC<{ label: string; value: number; max: number; color?: string; right?: string }> = ({ label, value, max, color = colores.acento, right }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
    <span style={{ fontSize: '12px', color: colores.textoClaro, width: '110px', flexShrink: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</span>
    <div style={{ flex: 1, height: '14px', borderRadius: '5px', background: colores.fondoTerciario, overflow: 'hidden' }}>
      <div style={{ width: `${(value / max) * 100}%`, height: '100%', borderRadius: '5px', background: color, transition: 'width .6s ease' }} />
    </div>
    <span style={{ fontSize: '11px', color: colores.textoMedio, fontWeight: 700, width: '56px', textAlign: 'right' }}>{right ?? value}</span>
  </div>
);

// ─── Badge / pill ───────────────────────────────────────────────────────────────
export const Pill: React.FC<{ text: string; color?: string }> = ({ text, color = colores.acento }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 8px', borderRadius: '8px',
    background: `${color}14`, border: `1px solid ${color}33`, color, fontSize: '11px', fontWeight: 700,
    whiteSpace: 'nowrap',
  }}>{text}</span>
);

// ─── Tile de KPI ────────────────────────────────────────────────────────────────
export const StatTile: React.FC<{ label: string; value: string; delta?: string; deltaUp?: boolean }> = ({ label, value, delta, deltaUp }) => (
  <div style={{
    backgroundColor: colores.fondoTerciario, borderRadius: '12px', padding: '10px 12px',
    border: `1px solid ${colores.borde}`, display: 'flex', flexDirection: 'column', gap: '2px',
  }}>
    <span style={{ fontSize: '20px', fontWeight: 800, color: colores.textoClaro, lineHeight: 1.1 }}>{value}</span>
    <span style={{ fontSize: '10px', color: colores.textoMedio, textTransform: 'uppercase', letterSpacing: '0.3px' }}>{label}</span>
    {delta && (
      <span style={{ fontSize: '11px', fontWeight: 700, color: deltaUp ? colores.exito : colores.peligro }}>
        {deltaUp ? '▲' : '▼'} {delta}
      </span>
    )}
  </div>
);

// ─── Barra de progreso ──────────────────────────────────────────────────────────
export const ProgressBar: React.FC<{ pct: number; color?: string; label?: string; right?: string }> = ({ pct, color = colores.acento, label, right }) => (
  <div style={{ width: '100%' }}>
    {(label || right) && (
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
        <span style={{ fontSize: '12px', color: colores.textoClaro, fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: '11px', color: colores.textoMedio, fontWeight: 600 }}>{right}</span>
      </div>
    )}
    <div style={{ height: '8px', borderRadius: '6px', background: colores.fondoTerciario, overflow: 'hidden' }}>
      <div style={{ width: `${Math.min(pct, 100)}%`, height: '100%', borderRadius: '6px', background: color, transition: 'width 0.6s ease' }} />
    </div>
  </div>
);

// ─── Semáforo ───────────────────────────────────────────────────────────────────
export const Semaforo: React.FC<{ estado: 'verde' | 'amarillo' | 'rojo' }> = ({ estado }) => {
  const c = estado === 'verde' ? colores.exito : estado === 'amarillo' ? colores.advertencia : colores.peligro;
  return <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, display: 'inline-block', flexShrink: 0, boxShadow: `0 0 0 3px ${c}22` }} />;
};

// ─── Mini barras ────────────────────────────────────────────────────────────────
export const MiniBars: React.FC<{ data: number[]; color?: string; height?: number }> = ({ data, color = colores.acento, height = 40 }) => {
  const max = Math.max(...data) || 1;
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height }}>
      {data.map((v, i) => (
        <div key={i} style={{
          flex: 1, height: `${(v / max) * 100}%`, minHeight: '3px', borderRadius: '3px 3px 0 0',
          background: i === data.length - 1 ? color : `${color}55`,
        }} />
      ))}
    </div>
  );
};

export { colores };
