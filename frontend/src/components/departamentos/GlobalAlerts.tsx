import React, { useState } from 'react';
import { Globe as GlobeIcon, MapPin, ShieldAlert, Radio, Building2, Activity, MousePointerClick } from 'lucide-react';
import { brandingConfig } from '../../config/branding';
import { VistaHeader, Panel, useIsMobile } from './guardianViewKit';
import { GuardianModal } from '../modules/dashboardModules/guardian/GuardianModal';
import { GuardianGlobe } from '../modules/dashboardModules/guardian/GuardianGlobe';
import type { HotSpot, Severidad } from '../../mock/guardianMockData';

const tipos = ['Deepfake', 'Voz sintética', 'Robo de identidad', 'Impersonación social'];
const plataformas = ['YouTube', 'TikTok', 'X', 'Meta', 'WhatsApp', 'Instagram'];
const estados = ['Bloqueado', 'Detectado y reportado', 'En análisis'];
const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];

interface Amenaza extends HotSpot {
  tipo: string; plataforma: string; estado: string; descripcion: string;
}

export const GlobalAlerts: React.FC = () => {
  const { colores } = brandingConfig;
  const isMobile = useIsMobile();
  const [sel, setSel] = useState<Amenaza | null>(null);

  const sevColor = (s: Severidad) =>
    s === 'critica' ? colores.peligro : s === 'alta' ? colores.advertencia : s === 'media' ? colores.acento : colores.exito;

  const abrir = (s: HotSpot) => {
    setSel({
      ...s,
      tipo: pick(tipos), plataforma: pick(plataformas), estado: pick(estados),
      descripcion: 'Evento sintético detectado por la red neuronal de autenticidad. Pipeline de respuesta activado automáticamente.',
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: isMobile ? '16px' : '0' }}>
      <VistaHeader titulo="Global Alerts" descripcion="Mapa mundial de amenazas — clic en un punto para ver el detalle" icon={<GlobeIcon size={26} color={colores.textoEnOscuro} />} />

      <Panel style={{ background: colores.fondoClaro }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: colores.textoMedio, marginBottom: '14px' }}>
          <MousePointerClick size={16} color={colores.acento} />
          Selecciona un punto del globo para inspeccionar la amenaza
        </div>
        <GuardianGlobe height={isMobile ? 360 : 560} background={colores.fondoClaro} autoRotateSpeed={0.5} onSpotClick={abrir} />
        <div style={{ display: 'flex', gap: '16px', marginTop: '14px', fontSize: '12px', color: colores.textoMedio, flexWrap: 'wrap' }}>
          <Leyenda c={colores.peligro} label="Crítico/Alto" />
          <Leyenda c={colores.advertencia} label="Medio" />
          <Leyenda c={colores.exito} label="Bajo" />
        </div>
      </Panel>

      {sel && (
        <GuardianModal titulo={`Amenaza — ${sel.ciudad}`} onClose={() => setSel(null)}>
          <div style={{
            margin: '0 0 18px', padding: '16px 18px', borderRadius: '14px',
            background: `linear-gradient(135deg, ${sevColor(sel.severidad)}22, ${sevColor(sel.severidad)}05)`,
            border: `1px solid ${sevColor(sel.severidad)}40`,
            display: 'flex', alignItems: 'center', gap: '14px',
          }}>
            <div style={{
              width: '46px', height: '46px', borderRadius: '12px', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `${sevColor(sel.severidad)}1f`, color: sevColor(sel.severidad),
            }}>
              <ShieldAlert size={24} />
            </div>
            <div>
              <div style={{ fontSize: '11px', letterSpacing: '0.5px', textTransform: 'uppercase', color: colores.textoMedio, fontWeight: 600 }}>
                Nivel de severidad
              </div>
              <div style={{ fontSize: '17px', fontWeight: 800, color: sevColor(sel.severidad), textTransform: 'capitalize' }}>
                {sel.severidad}
              </div>
            </div>
            <span style={{
              marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontSize: '11px', fontWeight: 700, color: colores.exito,
              padding: '5px 10px', borderRadius: '99px', background: `${colores.exito}18`,
            }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: colores.exito }} />
              Pipeline activo
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '10px' }}>
            <Fila icon={<MapPin size={16} color={colores.acento} />} label="Ubicación" valor={`${sel.ciudad} (${sel.lat.toFixed(2)}, ${sel.lng.toFixed(2)})`} />
            <Fila icon={<Activity size={16} color={colores.acento} />} label="Tipo" valor={sel.tipo} />
            <Fila icon={<Radio size={16} color={colores.acento} />} label="Plataforma" valor={sel.plataforma} />
            <Fila icon={<Building2 size={16} color={colores.acento} />} label="Estado" valor={sel.estado} />
          </div>

          <p style={{
            marginTop: '16px', marginBottom: 0, fontSize: '13px', color: colores.textoClaro, lineHeight: 1.7,
            padding: '14px 16px', borderRadius: '12px', background: colores.fondoTerciario,
            borderLeft: `3px solid ${colores.acento}`,
          }}>{sel.descripcion}</p>
        </GuardianModal>
      )}
    </div>
  );
};

const Fila: React.FC<{ icon: React.ReactNode; label: string; valor: string }> = ({ icon, label, valor }) => {
  const { colores } = brandingConfig;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', borderRadius: '12px', background: colores.fondoTerciario, border: `1px solid ${colores.borde}25` }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '34px', height: '34px', borderRadius: '9px', background: `${colores.acento}14`, flexShrink: 0 }}>
        {icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: '11px', color: colores.textoMedio, marginBottom: '2px' }}>{label}</div>
        <div style={{ fontSize: '13px', fontWeight: 600, color: colores.textoClaro }}>{valor}</div>
      </div>
    </div>
  );
};

const Leyenda: React.FC<{ c: string; label: string }> = ({ c, label }) => (
  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} /> {label}
  </span>
);
