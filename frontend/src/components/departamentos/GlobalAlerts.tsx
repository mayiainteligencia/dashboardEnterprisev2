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
            display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px',
            borderRadius: '99px', background: `${sevColor(sel.severidad)}1f`, color: sevColor(sel.severidad),
            fontSize: '12px', fontWeight: 700, textTransform: 'capitalize', marginBottom: '16px',
          }}>
            <ShieldAlert size={15} /> Severidad {sel.severidad}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Fila icon={<MapPin size={16} color={colores.acento} />} label="Ubicación" valor={`${sel.ciudad} (${sel.lat.toFixed(2)}, ${sel.lng.toFixed(2)})`} />
            <Fila icon={<Activity size={16} color={colores.acento} />} label="Tipo" valor={sel.tipo} />
            <Fila icon={<Radio size={16} color={colores.acento} />} label="Plataforma" valor={sel.plataforma} />
            <Fila icon={<Building2 size={16} color={colores.acento} />} label="Estado" valor={sel.estado} />
          </div>

          <p style={{ marginTop: '16px', fontSize: '13px', color: colores.textoClaro, lineHeight: 1.7 }}>{sel.descripcion}</p>
        </GuardianModal>
      )}
    </div>
  );
};

const Fila: React.FC<{ icon: React.ReactNode; label: string; valor: string }> = ({ icon, label, valor }) => {
  const { colores } = brandingConfig;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', background: colores.fondoTerciario }}>
      {icon}
      <span style={{ fontSize: '12px', color: colores.textoMedio, width: '90px' }}>{label}</span>
      <span style={{ fontSize: '13px', fontWeight: 600, color: colores.textoClaro }}>{valor}</span>
    </div>
  );
};

const Leyenda: React.FC<{ c: string; label: string }> = ({ c, label }) => (
  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} /> {label}
  </span>
);
