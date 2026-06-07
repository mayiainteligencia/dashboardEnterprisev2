import React, { useEffect, useState } from 'react';
import { Share2 } from 'lucide-react';
import { brandingConfig } from '../../../../config/branding';
import { GuardianCard } from './GuardianCard';
import { nodosRedIniciales } from '../../../../mock/guardianMockData';
import type { NodoRed } from '../../../../mock/guardianMockData';

export const SocialMonitoringModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [nodos, setNodos] = useState<NodoRed[]>(nodosRedIniciales);
  const [detectadas, setDetectadas] = useState(7);

  // Cada 4-8s resalta/agrega un nodo como "detectado".
  useEffect(() => {
    const id = setInterval(() => {
      setNodos((prev) => {
        const idx = Math.floor(Math.random() * prev.length);
        return prev.map((n, i) => (i === idx ? { ...n, detectado: !n.detectado } : n));
      });
      setDetectadas((d) => d + (Math.random() > 0.5 ? 1 : 0));
    }, 4000 + Math.random() * 4000);
    return () => clearInterval(id);
  }, []);

  const centro = { x: 50, y: 50 };

  return (
    <GuardianCard
      titulo="Monitoreo de Redes Sociales"
      subtitulo="Grafo de impersonación"
      icon={<Share2 size={20} color={colores.acento} />}
    >
      <div style={{ position: 'relative', height: '130px', marginBottom: '14px' }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {nodos.map((n) => (
            <line key={`l-${n.id}`} x1={centro.x} y1={centro.y} x2={n.x} y2={n.y}
              stroke={n.detectado ? colores.peligro : colores.borde} strokeWidth={0.5} opacity={0.6} />
          ))}
        </svg>
        {nodos.map((n) => (
          <div key={n.id} title={n.label} style={{
            position: 'absolute', left: `${n.x}%`, top: `${n.y}%`, transform: 'translate(-50%,-50%)',
            width: '12px', height: '12px', borderRadius: '50%',
            background: n.detectado ? colores.peligro : colores.acento,
            boxShadow: n.detectado ? `0 0 0 4px ${colores.peligro}30` : 'none',
            transition: 'all 0.4s',
          }} />
        ))}
        <div style={{
          position: 'absolute', left: `${centro.x}%`, top: `${centro.y}%`, transform: 'translate(-50%,-50%)',
          width: '20px', height: '20px', borderRadius: '50%',
          background: colores.gradientePrimario, boxShadow: `0 0 0 5px ${colores.primario}25`,
        }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
        <Row colores={colores} label="Cuentas detectadas DESSEMS" valor="14" />
        <Row colores={colores} label="Cuentas detectadas" valor={String(detectadas)} />
        <Row colores={colores} label="Intentos de impersonación recientes" valor="3" peligro />
      </div>
    </GuardianCard>
  );
};

const Row: React.FC<{ colores: any; label: string; valor: string; peligro?: boolean }> = ({ colores, label, valor, peligro }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <span style={{ color: colores.textoMedio }}>{label}</span>
    <span style={{ fontWeight: 700, color: peligro ? colores.peligro : colores.textoClaro }}>{valor}</span>
  </div>
);
