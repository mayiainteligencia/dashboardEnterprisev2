import React, { useState } from 'react';
import { Store, Mic, Image as ImageIcon, Box, BadgeCheck, Loader2, CheckCircle2 } from 'lucide-react';
import { brandingConfig } from '../../config/branding';
import { AgentActivityStrip } from '../agents/AgentActivityStrip';
import { VistaHeader, Panel, AgentesPanel, useIsMobile } from './guardianViewKit';
import { GuardianModal } from '../modules/dashboardModules/guardian/GuardianModal';
import { GuardianButton } from '../modules/dashboardModules/guardian/GuardianCard';
import { identidadesLicenciables, agentesIA } from '../../mock/guardianMockData';
import type { IdentidadLicenciable } from '../../mock/guardianMockData';

const tipoIcon: Record<IdentidadLicenciable['tipo'], React.ReactNode> = {
  Voz: <Mic size={18} />, Imagen: <ImageIcon size={18} />, 'Avatar 3D': <Box size={18} />,
};

export const LicensingMarketplace: React.FC = () => {
  const { colores } = brandingConfig;
  const isMobile = useIsMobile();
  const [filtroTipo, setFiltroTipo] = useState<'Todos' | IdentidadLicenciable['tipo']>('Todos');
  const [filtroTier, setFiltroTier] = useState<0 | 1 | 2 | 3>(0);
  const [sel, setSel] = useState<IdentidadLicenciable | null>(null);
  const [fase, setFase] = useState<'idle' | 'firmando' | 'ok'>('idle');

  const lista = identidadesLicenciables.filter((i) =>
    (filtroTipo === 'Todos' || i.tipo === filtroTipo) && (filtroTier === 0 || i.tier === filtroTier)
  );

  const licenciar = () => { setFase('firmando'); setTimeout(() => setFase('ok'), 1800); };
  const cerrar = () => { setSel(null); setFase('idle'); };

  const chip = (active: boolean) => ({
    padding: '7px 14px', borderRadius: '99px', cursor: 'pointer', fontSize: '12px', fontWeight: 600,
    border: `1px solid ${active ? colores.acento : colores.borde}`,
    background: active ? `${colores.acento}18` : 'transparent',
    color: active ? colores.acento : colores.textoMedio,
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: isMobile ? '16px' : '0' }}>
      <VistaHeader titulo="Licensing Marketplace" descripcion="Identidades licenciables con contrato IA" icon={<Store size={26} color={colores.textoEnOscuro} />} />
      <AgentActivityStrip seccion="marketplace" compacto={isMobile} />

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {(['Todos', 'Voz', 'Imagen', 'Avatar 3D'] as const).map((t) => (
          <button key={t} onClick={() => setFiltroTipo(t)} style={chip(filtroTipo === t)}>{t}</button>
        ))}
        <span style={{ width: '1px', background: colores.borde, margin: '0 4px' }} />
        {([0, 1, 2, 3] as const).map((t) => (
          <button key={t} onClick={() => setFiltroTier(t)} style={chip(filtroTier === t)}>{t === 0 ? 'Todos los tiers' : `Tier ${t}`}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${isMobile ? '100%' : '240px'}, 1fr))`, gap: '16px' }}>
        {lista.map((id) => (
          <Panel key={id.id} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px', background: colores.gradientePrimario,
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: colores.textoEnOscuro, fontWeight: 700,
              }}>{id.nombre.charAt(0)}</div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: colores.textoClaro }}>{id.nombre}</div>
                <div style={{ fontSize: '11px', color: colores.textoMedio }}>Tier {id.tier}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: colores.acento }}>
              {tipoIcon[id.tipo]} {id.tipo}
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: colores.textoClaro }}>{id.tarifa}</div>
            <GuardianButton variant="solid" onClick={() => setSel(id)}><BadgeCheck size={16} /> Licenciar uso</GuardianButton>
          </Panel>
        ))}
      </div>

      <AgentesPanel agentes={agentesIA.marketplace} />

      {sel && (
        <GuardianModal titulo={`Licenciar — ${sel.nombre}`} onClose={cerrar}>
          {fase === 'ok' ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '20px' }}>
              <CheckCircle2 size={48} color={colores.exito} />
              <span style={{ color: colores.textoClaro, fontWeight: 600 }}>Licencia LIC-2026-3391 emitida</span>
              <span style={{ color: colores.textoMedio, fontSize: '13px' }}>Contrato IA firmado y notariado</span>
            </div>
          ) : (
            <>
              <div style={{ fontSize: '13px', color: colores.textoMedio, lineHeight: 1.7 }}>
                <p><strong style={{ color: colores.textoClaro }}>Tipo:</strong> {sel.tipo} · Tier {sel.tier}</p>
                <p><strong style={{ color: colores.textoClaro }}>Tarifa:</strong> {sel.tarifa}</p>
                <div style={{ marginTop: '10px', padding: '12px', borderRadius: '10px', background: colores.fondoTerciario, fontSize: '12px' }}>
                  Términos: uso no exclusivo, watermarking biométrico obligatorio, revocable ante uso indebido. Vigencia 12 meses.
                </div>
              </div>
              <div style={{ marginTop: '16px' }}>
                <GuardianButton variant="solid" onClick={licenciar} disabled={fase === 'firmando'}>
                  {fase === 'firmando' ? <Loader2 size={16} className="gd-spin" /> : <BadgeCheck size={16} />}
                  {fase === 'firmando' ? 'Firmando contrato…' : 'Aceptar y firmar contrato'}
                </GuardianButton>
              </div>
              <style>{`@keyframes gd-spin{to{transform:rotate(360deg)}} .gd-spin{animation:gd-spin 1s linear infinite}`}</style>
            </>
          )}
        </GuardianModal>
      )}
    </div>
  );
};
