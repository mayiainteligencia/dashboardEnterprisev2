import React, { useState } from 'react';
import { Scale, ArrowRight, CheckCircle2, Loader2, FilePlus } from 'lucide-react';
import { brandingConfig } from '../../config/branding';
import { VistaHeader, Panel, AgentesPanel, useIsMobile } from './guardianViewKit';
import { GuardianModal } from '../modules/dashboardModules/guardian/GuardianModal';
import { GuardianButton } from '../modules/dashboardModules/guardian/GuardianCard';
import { pipelineLegal, contratosActivos, areasViables, agentesIA } from '../../mock/guardianMockData';

export const LegalIP: React.FC = () => {
  const { colores } = brandingConfig;
  const isMobile = useIsMobile();
  const [modal, setModal] = useState(false);
  const [fase, setFase] = useState<'idle' | 'enviando' | 'ok'>('idle');

  const enviar = () => { setFase('enviando'); setTimeout(() => setFase('ok'), 1800); };
  const cerrar = () => { setModal(false); setFase('idle'); };

  const areas = [
    { titulo: 'Viable', color: colores.exito, items: areasViables.verde },
    { titulo: 'Zona gris', color: colores.advertencia, items: areasViables.amarilla },
    { titulo: 'No viable', color: colores.peligro, items: areasViables.roja },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: isMobile ? '16px' : '0' }}>
      <VistaHeader titulo="Legal & IP Division" descripcion="Registro híbrido, contratos IA y enforcement legal" icon={<Scale size={26} color={colores.textoEnOscuro} />} />

      <Panel titulo="Pipeline del proceso legal">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
          {pipelineLegal.map((p, i) => (
            <React.Fragment key={p}>
              <div style={{
                padding: '10px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: 600,
                background: `${colores.acento}15`, color: colores.acento, border: `1px solid ${colores.acento}30`,
              }}>{p}</div>
              {i < pipelineLegal.length - 1 && <ArrowRight size={16} color={colores.textoOscuro} />}
            </React.Fragment>
          ))}
        </div>
      </Panel>

      <Panel titulo="Contratos activos">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {contratosActivos.map((c) => (
            <div key={c.id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px',
              padding: '12px', borderRadius: '10px', background: colores.fondoTerciario,
            }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: colores.textoClaro }}>{c.cliente}</div>
                <div style={{ fontSize: '11px', color: colores.textoMedio }}>{c.tipo} · {c.vigencia}</div>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: colores.acento }}>{c.estado}</span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel titulo="Áreas viables (matriz legal)">
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '14px' }}>
          {areas.map((a) => (
            <div key={a.titulo} style={{ borderRadius: '12px', overflow: 'hidden', border: `1px solid ${a.color}40` }}>
              <div style={{ background: `${a.color}20`, color: a.color, padding: '10px', fontSize: '13px', fontWeight: 700 }}>{a.titulo}</div>
              <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {a.items.map((it) => (
                  <div key={it} style={{ display: 'flex', gap: '8px', fontSize: '12px', color: colores.textoMedio }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: a.color, marginTop: '5px', flexShrink: 0 }} />
                    {it}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ maxWidth: '320px' }}>
            <GuardianButton variant="solid" onClick={() => setModal(true)}>
              <FilePlus size={16} /> Solicitar nuevo expediente
            </GuardianButton>
          </div>
        </div>
        <AgentesPanel agentes={agentesIA.legal} />
      </div>

      {modal && (
        <GuardianModal titulo="Nuevo expediente legal" onClose={cerrar}>
          {fase === 'ok' ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '20px' }}>
              <CheckCircle2 size={48} color={colores.exito} />
              <span style={{ color: colores.textoClaro, fontWeight: 600 }}>Expediente EXP-2026-0148 creado</span>
              <span style={{ color: colores.textoMedio, fontSize: '13px' }}>Asignado a Arochi & Lindner</span>
            </div>
          ) : (
            <>
              <p style={{ fontSize: '13px', color: colores.textoMedio, lineHeight: 1.6 }}>
                Se abrirá un expediente con registro IMPI/INDAUTOR/INAI y notariado digital. Confirma para generar el folio.
              </p>
              <div style={{ marginTop: '16px' }}>
                <GuardianButton variant="solid" onClick={enviar} disabled={fase === 'enviando'}>
                  {fase === 'enviando' ? <Loader2 size={16} className="gd-spin" /> : <FilePlus size={16} />}
                  {fase === 'enviando' ? 'Generando…' : 'Confirmar y generar folio'}
                </GuardianButton>
              </div>
            </>
          )}
        </GuardianModal>
      )}
    </div>
  );
};
