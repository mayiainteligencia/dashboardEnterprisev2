import React, { useEffect, useState } from 'react';
import { Bell, Loader2, CheckCircle2, Zap } from 'lucide-react';
import { brandingConfig } from '../../../../config/branding';
import { GuardianCard, GuardianButton } from './GuardianCard';
import { GuardianModal } from './GuardianModal';
import { alertasIniciales, generarAlerta } from '../../../../mock/guardianMockData';
import type { AlertaAmenaza, Severidad, EstadoAlerta } from '../../../../mock/guardianMockData';

export const RecentAlertsModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [alertas, setAlertas] = useState<AlertaAmenaza[]>(alertasIniciales);
  const [sel, setSel] = useState<AlertaAmenaza | null>(null);
  const [takedown, setTakedown] = useState<'idle' | 'enviando' | 'ok'>('idle');

  // Nueva alerta cada 8-12s; la última desaparece.
  useEffect(() => {
    const id = setInterval(() => {
      setAlertas((prev) => [generarAlerta(), ...prev].slice(0, 5));
    }, 8000 + Math.random() * 4000);
    return () => clearInterval(id);
  }, []);

  const sevColor = (s: Severidad) =>
    s === 'critica' ? colores.peligro : s === 'alta' ? colores.advertencia : s === 'media' ? colores.acento : colores.exito;
  const estadoColor = (e: EstadoAlerta) =>
    e === 'Bloqueado' ? colores.exito : e === 'En análisis' ? colores.advertencia : colores.acento;

  const ejecutarTakedown = () => {
    setTakedown('enviando');
    setTimeout(() => setTakedown('ok'), 1800);
  };
  const cerrar = () => { setSel(null); setTakedown('idle'); };

  return (
    <GuardianCard titulo="Alertas de Amenazas Recientes" subtitulo="En vivo" icon={<Bell size={20} color={colores.acento} />}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {alertas.map((a) => (
          <div key={a.id} onClick={() => setSel(a)} style={{
            padding: '12px', borderRadius: '12px', cursor: 'pointer',
            background: `${colores.borde}18`, borderLeft: `3px solid ${sevColor(a.severidad)}`,
            animation: 'gd-slidein 0.4s ease',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', color: colores.textoOscuro, fontFamily: 'monospace' }}>{a.timestamp}</span>
              <span style={{ fontSize: '10px', fontWeight: 700, color: estadoColor(a.estado) }}>{a.estado}</span>
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: colores.textoClaro, marginBottom: '6px' }}>{a.titulo}</div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <Tag color={sevColor(a.severidad)} text={a.severidad} />
              <Tag color={colores.textoOscuro} text={a.cliente} />
              <Tag color={colores.acento} text={a.tipo} />
            </div>
          </div>
        ))}
      </div>

      {sel && (
        <GuardianModal titulo={sel.titulo} onClose={cerrar}>
          <div style={{ fontSize: '13px', color: colores.textoMedio, lineHeight: 1.7 }}>
            <Det label="Timestamp" valor={sel.timestamp} />
            <Det label="Estado" valor={sel.estado} />
            <Det label="Severidad" valor={sel.severidad} />
            <Det label="Cliente" valor={sel.cliente} />
            <Det label="Tipo" valor={sel.tipo} />
            <Det label="Plataforma" valor={sel.plataforma} />
            <p style={{ marginTop: '12px', color: colores.textoClaro }}>{sel.descripcion}</p>
          </div>
          <div style={{ marginTop: '20px' }}>
            {takedown === 'ok' ? (
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: '12px', borderRadius: '12px', background: `${colores.exito}18`,
                color: colores.exito, fontWeight: 700, fontSize: '13px',
              }}>
                <CheckCircle2 size={18} /> Takedown enviado a {sel.plataforma}
              </div>
            ) : (
              <GuardianButton variant="solid" onClick={ejecutarTakedown} disabled={takedown === 'enviando'}>
                {takedown === 'enviando' ? <Loader2 size={16} className="gd-spin" /> : <Zap size={16} />}
                {takedown === 'enviando' ? 'Enviando…' : 'Ejecutar takedown'}
              </GuardianButton>
            )}
          </div>
        </GuardianModal>
      )}

      <style>{`@keyframes gd-slidein{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </GuardianCard>
  );
};

const Tag: React.FC<{ color: string; text: string }> = ({ color, text }) => {
  return <span style={{
    fontSize: '10px', fontWeight: 600, padding: '2px 8px', borderRadius: '99px',
    background: `${color}1f`, color, textTransform: 'capitalize',
  }}>{text}</span>;
};

const Det: React.FC<{ label: string; valor: string }> = ({ label, valor }) => {
  const { colores } = brandingConfig;
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: `1px solid ${colores.borde}30` }}>
      <span>{label}</span><span style={{ color: colores.textoClaro, fontWeight: 600, textTransform: 'capitalize' }}>{valor}</span>
    </div>
  );
};
