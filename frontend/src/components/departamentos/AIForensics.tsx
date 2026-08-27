import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Microscope, Upload, Loader2, CheckCircle2, ScanFace } from 'lucide-react';
import { brandingConfig } from '../../config/branding';
import { AgentActivityStrip } from '../agents/AgentActivityStrip';
import { VistaHeader, Panel, AgentesPanel, useIsMobile } from './guardianViewKit';
import { GuardianModal } from '../modules/dashboardModules/guardian/GuardianModal';
import { GuardianButton } from '../modules/dashboardModules/guardian/GuardianCard';
import { analisisRecientes, artefactosDetectados, distribucionAtaques, agentesIA } from '../../mock/guardianMockData';

export const AIForensics: React.FC = () => {
  const { colores } = brandingConfig;
  const isMobile = useIsMobile();
  const [modal, setModal] = useState(false);
  const [fase, setFase] = useState<'drop' | 'analizando' | 'ok'>('drop');
  const [prog, setProg] = useState(0);

  const analizar = () => {
    setFase('analizando'); setProg(0);
    const inicio = Date.now();
    const tick = setInterval(() => {
      const p = Math.min(100, Math.round(((Date.now() - inicio) / 2600) * 100));
      setProg(p);
      if (p >= 100) { clearInterval(tick); setFase('ok'); }
    }, 60);
  };
  const cerrar = () => { setModal(false); setFase('drop'); setProg(0); };

  const palette = [colores.peligro, colores.advertencia, colores.acento, colores.exito];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: isMobile ? '16px' : '0' }}>
      <VistaHeader titulo="AI Forensics Division" descripcion="Detección sintética profunda — IA vs IA" icon={<Microscope size={26} color={colores.textoEnOscuro} />} />
      <AgentActivityStrip seccion="forensics" compacto={isMobile} />

      <Panel titulo="Análisis recientes">
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${isMobile ? '140px' : '170px'}, 1fr))`, gap: '12px' }}>
          {analisisRecientes.map((a) => {
            const sint = a.porcentajeSintetico >= 50;
            const col = sint ? colores.peligro : colores.exito;
            return (
              <div key={a.id} style={{ borderRadius: '12px', overflow: 'hidden', border: `1px solid ${colores.borde}`, background: colores.fondoTerciario }}>
                <div style={{ height: '80px', background: `linear-gradient(135deg, ${col}25, ${col}08)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ScanFace size={26} color={col} />
                </div>
                <div style={{ padding: '10px' }}>
                  <div style={{ fontSize: '11px', color: colores.textoClaro, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.nombre}</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: col, marginTop: '4px' }}>{a.porcentajeSintetico}% sintético · {a.tipo}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Panel>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
        <Panel titulo="Artefactos detectados">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {artefactosDetectados.map((a) => (
              <div key={a.tipo}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ color: colores.textoMedio }}>{a.tipo}</span>
                  <span style={{ color: colores.textoClaro, fontWeight: 600 }}>{a.conteo}</span>
                </div>
                <div style={{ height: '6px', borderRadius: '99px', background: `${colores.borde}50`, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(a.conteo / 184) * 100}%`, background: colores.acento }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel titulo="Distribución por tipo de ataque">
          <div style={{ width: '100%', height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distribucionAtaques} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={`${colores.borde}40`} />
                <XAxis dataKey="tipo" tick={{ fontSize: 9, fill: colores.textoOscuro }} interval={0} />
                <YAxis tick={{ fontSize: 10, fill: colores.textoOscuro }} />
                <Tooltip contentStyle={{ background: colores.fondoClaro, border: `1px solid ${colores.borde}`, borderRadius: '10px', fontSize: '12px' }} />
                <Bar dataKey="valor" radius={[6, 6, 0, 0]}>
                  {distribucionAtaques.map((_, i) => <Cell key={i} fill={palette[i % palette.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', gap: '20px' }}>
        <div style={{ maxWidth: '320px', display: 'flex', alignItems: 'center' }}>
          <GuardianButton variant="solid" onClick={() => setModal(true)}>
            <Upload size={16} /> Subir muestra para análisis
          </GuardianButton>
        </div>
        <AgentesPanel agentes={agentesIA.forensics} />
      </div>

      {modal && (
        <GuardianModal titulo="Análisis forense de muestra" onClose={cerrar}>
          {fase === 'drop' && (
            <>
              <div onClick={analizar} style={{
                height: '160px', borderRadius: '14px', cursor: 'pointer',
                border: `2px dashed ${colores.acento}50`, background: `${colores.acento}08`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px',
                color: colores.textoMedio,
              }}>
                <Upload size={32} color={colores.acento} />
                <span style={{ fontSize: '13px' }}>Arrastra un archivo o haz clic para simular</span>
              </div>
            </>
          )}
          {fase === 'analizando' && (
            <div style={{ padding: '20px 0' }}>
              <div style={{ fontSize: '13px', color: colores.textoMedio, marginBottom: '10px', textAlign: 'center' }}>Analizando muestra… {prog}%</div>
              <div style={{ height: '10px', borderRadius: '99px', background: `${colores.borde}40`, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${prog}%`, background: colores.gradientePrimario, transition: 'width 0.06s linear' }} />
              </div>
            </div>
          )}
          {fase === 'ok' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '16px' }}>
              <CheckCircle2 size={44} color={colores.peligro} />
              <span style={{ color: colores.peligro, fontWeight: 700, fontSize: '15px' }}>94% sintético — Deepfake detectado</span>
              <span style={{ color: colores.textoMedio, fontSize: '12px', textAlign: 'center' }}>
                Artefactos: lip-sync mismatch, blending facial. Reporte forense generado.
              </span>
            </div>
          )}
          <style>{`@keyframes gd-spin{to{transform:rotate(360deg)}} .gd-spin{animation:gd-spin 1s linear infinite}`}</style>
        </GuardianModal>
      )}
    </div>
  );
};
