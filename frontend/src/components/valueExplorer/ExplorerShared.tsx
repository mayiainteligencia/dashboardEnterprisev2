import React from 'react';
import { Bot } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { brandingConfig } from '../../config/branding';

const { colores } = brandingConfig;

interface KpiCircleProps {
  valor: number;
  max?: number;
  label: string;
  sublabel?: string;
  color?: string;
  unidad?: string;
  size?: number;
}

export const KpiCircle: React.FC<KpiCircleProps> = ({
  valor,
  max = 100,
  label,
  sublabel,
  color = colores.primario,
  unidad = '',
  size = 110,
}) => {
  const pct = Math.max(0, Math.min(100, (valor / max) * 100));
  const data = [
    { name: 'v', value: pct },
    { name: 'r', value: 100 - pct },
  ];
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '14px 12px',
        backgroundColor: colores.fondoSecundario,
        border: `1px solid ${colores.borde}`,
        borderRadius: '16px',
        minWidth: '140px',
        flex: 1,
      }}
    >
      <div style={{ width: size, height: size, position: 'relative' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius="72%"
              outerRadius="100%"
              startAngle={90}
              endAngle={-270}
              stroke="none"
              isAnimationActive={false}
            >
              <Cell fill={color} />
              <Cell fill={`${color}22`} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: '20px', fontWeight: 800, color: color, lineHeight: 1 }}>
            {valor}
            <span style={{ fontSize: '11px' }}>{unidad}</span>
          </span>
          {sublabel && (
            <span style={{ fontSize: '9px', color: colores.textoMedio, marginTop: '2px' }}>{sublabel}</span>
          )}
        </div>
      </div>
      <div
        style={{
          fontSize: '11px',
          fontWeight: 700,
          color: colores.textoClaro,
          marginTop: '8px',
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '0.4px',
        }}
      >
        {label}
      </div>
    </div>
  );
};

interface KpiBadgeProps {
  valor: string;
  label: string;
  color?: string;
}

export const KpiBadge: React.FC<KpiBadgeProps> = ({ valor, label, color = colores.primario }) => (
  <div
    style={{
      padding: '14px 16px',
      borderRadius: '16px',
      backgroundColor: `${color}10`,
      border: `1px solid ${color}30`,
      minWidth: '140px',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <div style={{ fontSize: '22px', fontWeight: 800, color }}>{valor}</div>
    <div
      style={{
        fontSize: '11px',
        fontWeight: 700,
        color: colores.textoClaro,
        marginTop: '6px',
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: '0.4px',
      }}
    >
      {label}
    </div>
  </div>
);

interface AgentesPanelProps {
  agentes: { nombre: string; rol: string; color?: string }[];
  titulo?: string;
}

export const AgentesPanel: React.FC<AgentesPanelProps> = ({ agentes, titulo = 'Agentes IA involucrados' }) => (
  <div
    style={{
      backgroundColor: colores.fondoSecundario,
      borderRadius: '20px',
      border: `1px solid ${colores.borde}`,
      padding: '20px',
    }}
  >
    <h3
      style={{
        fontSize: '14px',
        fontWeight: 700,
        color: colores.textoClaro,
        margin: '0 0 12px 0',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <Bot size={14} /> {titulo}
    </h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {agentes.map((a) => (
        <div
          key={a.nombre}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px',
            backgroundColor: colores.fondoTerciario,
            borderRadius: '12px',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: a.color || colores.primario,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Bot size={16} color="white" />
          </div>
          <div>
            <p style={{ fontSize: '13px', fontWeight: 700, color: colores.textoClaro, margin: 0 }}>{a.nombre}</p>
            <p style={{ fontSize: '10px', color: colores.textoMedio, margin: '2px 0 0 0' }}>{a.rol}</p>
          </div>
          <div
            style={{
              marginLeft: 'auto',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: colores.exito,
              boxShadow: `0 0 6px ${colores.exito}88`,
            }}
          />
        </div>
      ))}
    </div>
  </div>
);

interface ServiciosListProps {
  titulo: string;
  servicios: string[];
  color?: string;
}

export const ServiciosList: React.FC<ServiciosListProps> = ({ titulo, servicios, color = colores.primario }) => (
  <div
    style={{
      backgroundColor: colores.fondoSecundario,
      borderRadius: '20px',
      border: `1px solid ${colores.borde}`,
      padding: '20px',
    }}
  >
    <h3
      style={{
        fontSize: '14px',
        fontWeight: 700,
        color: colores.textoClaro,
        margin: '0 0 12px 0',
      }}
    >
      {titulo}
    </h3>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '8px' }}>
      {servicios.map((s) => (
        <div
          key={s}
          style={{
            padding: '10px 12px',
            borderRadius: '10px',
            backgroundColor: colores.fondoTerciario,
            borderLeft: `3px solid ${color}`,
            fontSize: '12px',
            color: colores.textoClaro,
            fontWeight: 500,
          }}
        >
          {s}
        </div>
      ))}
    </div>
  </div>
);

interface CtaButtonProps {
  label: string;
  onClick?: () => void;
  color?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const CtaButton: React.FC<CtaButtonProps> = ({ label, onClick, color = colores.primario, icon, fullWidth }) => (
  <button
    onClick={onClick}
    style={{
      padding: '12px 22px',
      borderRadius: '14px',
      border: 'none',
      background: color === colores.primario ? colores.gradientePrimario : color,
      color: '#fff',
      fontSize: '13px',
      fontWeight: 700,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      boxShadow: colores.sombraMedia,
      width: fullWidth ? '100%' : 'auto',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = colores.sombraGrande;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = colores.sombraMedia;
    }}
  >
    {icon}
    {label}
  </button>
);

interface ModuloHeaderProps {
  numero: number;
  titulo: string;
  microcopy: string;
  icono: React.ReactNode;
  color?: string;
}

export const ModuloHeader: React.FC<ModuloHeaderProps> = ({ numero, titulo, microcopy, icono, color = colores.primario }) => (
  <div
    style={{
      backgroundColor: colores.fondoSecundario,
      borderRadius: '20px',
      border: `1px solid ${colores.borde}`,
      padding: '24px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '16px',
      marginBottom: '20px',
    }}
  >
    <div
      style={{
        width: '56px',
        height: '56px',
        borderRadius: '16px',
        background: color === colores.primario ? colores.gradientePrimario : color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        position: 'relative',
      }}
    >
      {icono}
      <span
        style={{
          position: 'absolute',
          top: '-6px',
          right: '-6px',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: colores.fondoPrincipal,
          color,
          border: `2px solid ${color}`,
          fontSize: '11px',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {numero}
      </span>
    </div>
    <div style={{ flex: 1 }}>
      <h2 style={{ fontSize: '20px', fontWeight: 800, color: colores.textoClaro, margin: '0 0 6px 0', letterSpacing: '-0.3px' }}>
        {titulo}
      </h2>
      <p style={{ fontSize: '13px', color: colores.textoMedio, margin: 0 }}>{microcopy}</p>
    </div>
  </div>
);

export const ConfirmacionModal: React.FC<{ open: boolean; titulo: string; mensaje: string; onClose: () => void; resumen?: React.ReactNode }> = ({
  open,
  titulo,
  mensaje,
  onClose,
  resumen,
}) => {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.55)',
        zIndex: 3000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: colores.fondoPrincipal,
          borderRadius: '20px',
          padding: '28px',
          maxWidth: '480px',
          width: '100%',
          boxShadow: colores.sombraGrande,
          border: `1px solid ${colores.borde}`,
        }}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: `${colores.exito}22`,
            color: colores.exito,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            marginBottom: '14px',
          }}
        >
          ✓
        </div>
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: colores.textoClaro, margin: '0 0 8px 0' }}>{titulo}</h3>
        <p style={{ fontSize: '13px', color: colores.textoMedio, margin: '0 0 16px 0', lineHeight: 1.5 }}>{mensaje}</p>
        {resumen}
        <button
          onClick={onClose}
          style={{
            marginTop: '18px',
            padding: '11px 18px',
            borderRadius: '12px',
            border: 'none',
            background: colores.gradientePrimario,
            color: '#fff',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Entendido
        </button>
      </div>
    </div>
  );
};
