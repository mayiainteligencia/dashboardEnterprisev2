import React, { useState } from 'react';
import { Vault, Lock, ScanEye, ArrowRight, ArrowLeft, CheckCircle2, UserPlus } from 'lucide-react';
import { brandingConfig } from '../../config/branding';
import { AgentActivityStrip } from '../agents/AgentActivityStrip';
import { VistaHeader, Panel, AgentesPanel, useIsMobile } from './guardianViewKit';
import { GuardianModal } from '../modules/dashboardModules/guardian/GuardianModal';
import { GuardianButton } from '../modules/dashboardModules/guardian/GuardianCard';
import { IrisScanner } from '../modules/dashboardModules/guardian/IrisScanner';
import { vaultModalidades, vaultStats, wizardPasos, agentesIA } from '../../mock/guardianMockData';

export const IdentityVault: React.FC = () => {
  const { colores } = brandingConfig;
  const isMobile = useIsMobile();
  const [modal, setModalidad] = useState<typeof vaultModalidades[number]>('Voz');
  const [wizard, setWizard] = useState(false);
  const [paso, setPaso] = useState(0);

  const cerrarWizard = () => { setWizard(false); setPaso(0); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: isMobile ? '16px' : '0' }}>
      <VistaHeader titulo="Identity Vault" descripcion="Almacenamiento cifrado de embeddings biométricos" icon={<Vault size={26} color={colores.textoEnOscuro} />} />
      <AgentActivityStrip seccion="vault" compacto={isMobile} />

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '16px' }}>
        <Panel><Stat label="Perfiles almacenados" valor={String(vaultStats.perfiles)} /></Panel>
        <Panel><Stat label="Embeddings cifrados" valor={vaultStats.embeddings.toLocaleString()} /></Panel>
        <Panel>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Lock size={20} color={colores.exito} />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: colores.exito }}>Cifrado activo</div>
              <div style={{ fontSize: '11px', color: colores.textoMedio }}>{vaultStats.cifrado}</div>
            </div>
          </div>
        </Panel>
      </div>

      <Panel titulo="Modalidades almacenadas">
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          {vaultModalidades.map((m) => (
            <button key={m} onClick={() => setModalidad(m)} style={{
              padding: '8px 16px', borderRadius: '10px', cursor: 'pointer', fontSize: '12px', fontWeight: 600,
              border: `1px solid ${modal === m ? colores.acento : colores.borde}`,
              background: modal === m ? `${colores.acento}18` : 'transparent',
              color: modal === m ? colores.acento : colores.textoMedio,
            }}>{m}</button>
          ))}
        </div>
        {/* Visualización conceptual del embedding (vector abstracto) */}
        <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap', marginBottom: '12px' }}>
          {Array.from({ length: 64 }).map((_, i) => {
            const v = Math.abs(Math.sin(i * (modal.length + 1)));
            return <div key={i} style={{ width: '14px', height: '14px', borderRadius: '3px', background: colores.acento, opacity: 0.15 + v * 0.8 }} />;
          })}
        </div>
        <div style={{ fontSize: '12px', color: colores.textoMedio }}>
          Vector de embedding ({modal}) — 512 dimensiones · hash protegido en blockchain
        </div>
      </Panel>

      <Panel titulo="Escaneo de iris — registro biométrico detallado">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '14px', color: colores.acento, marginBottom: '8px' }}>
          <ScanEye size={18} /><span style={{ fontSize: '13px', fontWeight: 600 }}>Captura de alta resolución con lectura por capas</span>
        </div>
        <div style={{ maxWidth: '360px', margin: '0 auto' }}>
          <IrisScanner size={200} detailed />
        </div>
      </Panel>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', gap: '20px' }}>
        <div style={{ maxWidth: '320px', display: 'flex', alignItems: 'center' }}>
          <GuardianButton variant="solid" onClick={() => setWizard(true)}>
            <UserPlus size={16} /> Registrar nueva identidad
          </GuardianButton>
        </div>
        <AgentesPanel agentes={agentesIA.vault} />
      </div>

      {wizard && (
        <GuardianModal titulo="Registrar nueva identidad" onClose={cerrarWizard}>
          {/* Stepper */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
            {wizardPasos.map((_, i) => (
              <div key={i} style={{ flex: 1, height: '5px', borderRadius: '99px', background: i <= paso ? colores.acento : `${colores.borde}50` }} />
            ))}
          </div>
          {paso < wizardPasos.length ? (
            <>
              <div style={{ fontSize: '12px', color: colores.textoOscuro }}>Paso {paso + 1} de {wizardPasos.length}</div>
              <h4 style={{ fontSize: '18px', color: colores.textoClaro, margin: '6px 0 10px 0' }}>{wizardPasos[paso]}</h4>
              <p style={{ fontSize: '13px', color: colores.textoMedio, lineHeight: 1.6, minHeight: '60px' }}>
                Simulación del paso «{wizardPasos[paso]}». En producción aquí se capturan y procesan los datos correspondientes.
              </p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                {paso > 0 && (
                  <GuardianButton onClick={() => setPaso((p) => p - 1)}><ArrowLeft size={16} /> Atrás</GuardianButton>
                )}
                <GuardianButton variant="solid" onClick={() => setPaso((p) => p + 1)}>
                  {paso === wizardPasos.length - 1 ? 'Finalizar' : 'Siguiente'} <ArrowRight size={16} />
                </GuardianButton>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '20px' }}>
              <CheckCircle2 size={48} color={colores.exito} />
              <span style={{ color: colores.textoClaro, fontWeight: 600 }}>Identidad registrada y cifrada</span>
              <span style={{ color: colores.textoMedio, fontSize: '13px' }}>Embedding asegurado en blockchain</span>
            </div>
          )}
        </GuardianModal>
      )}
    </div>
  );
};

const Stat: React.FC<{ label: string; valor: string }> = ({ label, valor }) => {
  const { colores } = brandingConfig;
  return (
    <>
      <div style={{ fontSize: '28px', fontWeight: 800, color: colores.textoClaro }}>{valor}</div>
      <div style={{ fontSize: '12px', color: colores.textoMedio }}>{label}</div>
    </>
  );
};
