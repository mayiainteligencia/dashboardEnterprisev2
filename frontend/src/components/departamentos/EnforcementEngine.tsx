import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Gavel, FileWarning, Stamp, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { brandingConfig } from '../../config/branding';
import { VistaHeader, Panel, AgentesPanel, useIsMobile } from './guardianViewKit';
import { GuardianModal } from '../modules/dashboardModules/guardian/GuardianModal';
import { casosEnforcement, takedownsPorPlataforma, agentesIA } from '../../mock/guardianMockData';
import type { CasoEnforcement, Severidad } from '../../mock/guardianMockData';

type Accion = 'DMCA' | 'Notariar' | 'Cease';
const accionLabel: Record<Accion, string> = {
  DMCA: 'Generar DMCA', Notariar: 'Notariar timestamp', Cease: 'Enviar cease & desist',
};

export const EnforcementEngine: React.FC = () => {
  const { colores } = brandingConfig;
  const isMobile = useIsMobile();
  const [accion, setAccion] = useState<{ caso: CasoEnforcement; tipo: Accion } | null>(null);
  const [fase, setFase] = useState<'idle' | 'enviando' | 'ok'>('idle');

  const sevColor = (s: Severidad) => s === 'critica' ? colores.peligro : s === 'alta' ? colores.advertencia : colores.acento;

  const ejecutar = () => { setFase('enviando'); setTimeout(() => setFase('ok'), 1800); };
  const cerrar = () => { setAccion(null); setFase('idle'); };

  const palette = [colores.peligro, colores.advertencia, colores.acento, colores.exito, colores.primario];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: isMobile ? '16px' : '0' }}>
      <VistaHeader titulo="Enforcement Engine" descripcion="Tablero operativo de takedowns" icon={<Gavel size={26} color={colores.textoEnOscuro} />} />

      <Panel titulo={`Cola de casos activos (${casosEnforcement.length})`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {casosEnforcement.map((c) => (
            <div key={c.id} style={{
              padding: '14px', borderRadius: '12px', background: colores.fondoTerciario,
              borderLeft: `3px solid ${sevColor(c.severidad)}`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: colores.textoClaro }}>{c.caso}</div>
                  <div style={{ fontSize: '11px', color: colores.textoMedio }}>{c.plataforma} · {c.estado}</div>
                </div>
                <span style={{ fontSize: '10px', fontWeight: 700, color: sevColor(c.severidad), textTransform: 'uppercase' }}>{c.severidad}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {(['DMCA', 'Notariar', 'Cease'] as Accion[]).map((a) => (
                  <button key={a} onClick={() => setAccion({ caso: c, tipo: a })} style={{
                    display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 12px', borderRadius: '9px',
                    border: `1px solid ${colores.acento}40`, background: `${colores.acento}10`, color: colores.acento,
                    fontSize: '11px', fontWeight: 600, cursor: 'pointer',
                  }}>
                    {a === 'DMCA' ? <FileWarning size={14} /> : a === 'Notariar' ? <Stamp size={14} /> : <Send size={14} />}
                    {accionLabel[a]}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', gap: '20px' }}>
        <Panel titulo="Takedowns por plataforma">
          <div style={{ width: '100%', height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={takedownsPorPlataforma} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={`${colores.borde}40`} />
                <XAxis dataKey="plataforma" tick={{ fontSize: 9, fill: colores.textoOscuro }} interval={0} />
                <YAxis tick={{ fontSize: 10, fill: colores.textoOscuro }} />
                <Tooltip contentStyle={{ background: colores.fondoClaro, border: `1px solid ${colores.borde}`, borderRadius: '10px', fontSize: '12px' }} />
                <Bar dataKey="valor" radius={[6, 6, 0, 0]}>
                  {takedownsPorPlataforma.map((_, i) => <Cell key={i} fill={palette[i % palette.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <AgentesPanel agentes={agentesIA.enforcement} />
      </div>

      {accion && (
        <GuardianModal titulo={accionLabel[accion.tipo]} onClose={cerrar}>
          {fase === 'ok' ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '20px' }}>
              <CheckCircle2 size={48} color={colores.exito} />
              <span style={{ color: colores.textoClaro, fontWeight: 600, textAlign: 'center' }}>
                {accion.tipo === 'Notariar' ? 'Timestamp notariado en blockchain' : `${accionLabel[accion.tipo]} enviado a ${accion.caso.plataforma}`}
              </span>
              <span style={{ color: colores.textoMedio, fontSize: '12px' }}>Caso: {accion.caso.caso}</span>
            </div>
          ) : (
            <>
              <p style={{ fontSize: '13px', color: colores.textoMedio, lineHeight: 1.6 }}>
                Ejecutar <strong style={{ color: colores.textoClaro }}>{accionLabel[accion.tipo]}</strong> para el caso «{accion.caso.caso}» en {accion.caso.plataforma}.
              </p>
              <div style={{ marginTop: '16px' }}>
                <button onClick={ejecutar} disabled={fase === 'enviando'} style={{
                  width: '100%', padding: '11px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                  background: colores.acento, color: colores.textoEnOscuro, fontSize: '13px', fontWeight: 600,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                }}>
                  {fase === 'enviando' ? <Loader2 size={16} className="gd-spin" /> : <Send size={16} />}
                  {fase === 'enviando' ? 'Ejecutando…' : 'Confirmar ejecución'}
                </button>
              </div>
              <style>{`@keyframes gd-spin{to{transform:rotate(360deg)}} .gd-spin{animation:gd-spin 1s linear infinite}`}</style>
            </>
          )}
        </GuardianModal>
      )}
    </div>
  );
};
