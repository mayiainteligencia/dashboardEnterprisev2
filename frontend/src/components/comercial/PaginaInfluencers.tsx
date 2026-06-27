import React, { useState, useEffect } from 'react';
import { Radar, Instagram, Youtube, Twitter, Facebook, Music2, Search, RefreshCw, BadgeCheck, Send, Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { brandingConfig } from '../../config/branding';
import { Modal } from './ui';
import { Shell, Panel, HeroKPI, Reveal, GrowBar, badgeLive, colores, tnum } from './paginasPro';

const marca = brandingConfig.empresa.nombre;          // se ajusta solo con branding.ts (se toma de empresa.nombre)
const b = marca.toLowerCase().replace(/\s+/g, '');

// plataformas que "rastrea" el scraper
const plataformas: { red: string; icon: LucideIcon; color: string }[] = [
  { red: 'Instagram', icon: Instagram, color: '#E1306C' },
  { red: 'TikTok', icon: Music2, color: '#000000' },
  { red: 'X', icon: Twitter, color: '#1DA1F2' },
  { red: 'YouTube', icon: Youtube, color: '#FF0000' },
  { red: 'Facebook', icon: Facebook, color: '#1877F2' },
];

// influencers generados a partir de la marca activa
type Inf = { nombre: string; handle: string; red: string; followers: number; eng: number; posts: number; sent: 'pos' | 'neu' | 'neg'; verif: boolean };
const influencers: Inf[] = [
  { nombre: 'Andrea Ríos', handle: `@${b}_lovers_mx`, red: 'Instagram', followers: 128000, eng: 5.4, posts: 14, sent: 'pos', verif: true },
  { nombre: 'Drive Master', handle: `@manejo${b}`, red: 'YouTube', followers: 342000, eng: 7.1, posts: 9, sent: 'pos', verif: true },
  { nombre: 'Carlos Mendoza', handle: `@${b}garage`, red: 'TikTok', followers: 89000, eng: 9.8, posts: 21, sent: 'pos', verif: false },
  { nombre: 'AutoFanboy', handle: `@${b}_daily`, red: 'X', followers: 54000, eng: 3.2, posts: 31, sent: 'neu', verif: false },
  { nombre: 'Vale Torres', handle: `@vale.drives.${b}`, red: 'Instagram', followers: 211000, eng: 6.3, posts: 11, sent: 'pos', verif: true },
  { nombre: 'Motor y Más', handle: `@motorymas`, red: 'YouTube', followers: 178000, eng: 4.5, posts: 7, sent: 'neu', verif: true },
  { nombre: 'Rodrigo Lacroix', handle: `@rodo_${b}`, red: 'TikTok', followers: 67000, eng: 11.2, posts: 18, sent: 'pos', verif: false },
  { nombre: 'CityRider', handle: `@cityrider_${b}`, red: 'Facebook', followers: 43000, eng: 2.8, posts: 25, sent: 'neg', verif: false },
];

const fmtK = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(n >= 100000 ? 0 : 1)}K` : `${n}`;
const platOf = (red: string) => plataformas.find(p => p.red === red)!;
const initials = (n: string) => n.split(' ').map(w => w[0]).slice(0, 2).join('');
const sentMeta = { pos: { t: 'Positivo', c: colores.exito }, neu: { t: 'Neutral', c: colores.advertencia }, neg: { t: 'Negativo', c: colores.peligro } };

export const PaginaInfluencers: React.FC = () => {
  const [scanKey, setScanKey] = useState(0);
  const [scanning, setScanning] = useState(true);
  const [progress, setProgress] = useState(0);
  const [platIdx, setPlatIdx] = useState(0);
  const [filtro, setFiltro] = useState('Todos');
  const [confirm, setConfirm] = useState<Inf | null>(null);
  const [enviados, setEnviados] = useState<Set<string>>(new Set());

  // simulación de web scraping
  useEffect(() => {
    setScanning(true); setProgress(0);
    const id = setInterval(() => {
      setProgress(p => {
        const n = p + Math.random() * 9 + 4;
        if (n >= 100) { clearInterval(id); setTimeout(() => setScanning(false), 250); return 100; }
        return n;
      });
    }, 130);
    const pid = setInterval(() => setPlatIdx(p => (p + 1) % plataformas.length), 320);
    return () => { clearInterval(id); clearInterval(pid); };
  }, [scanKey]);

  const reach = influencers.reduce((s, i) => s + i.followers, 0);
  const engProm = (influencers.reduce((s, i) => s + i.eng, 0) / influencers.length).toFixed(1);
  const posPct = Math.round((influencers.filter(i => i.sent === 'pos').length / influencers.length) * 100);
  const vistos = influencers.filter(i => filtro === 'Todos' || i.red === filtro);

  return (
    <Shell icon={Radar} title="Radar de Influencers" subtitle={`Web scraping de redes · marca detectada: ${marca}`} badge={badgeLive}
      kpis={<>
        <HeroKPI i={0} label="Influencers hallados" value={`${influencers.length}`} delta={`con "${marca}"`} up accent="#CC0000" />
        <HeroKPI i={1} label="Alcance combinado" value={fmtK(reach)} delta="potencial" up accent="#10B981" spark={[0.6, 0.8, 0.9, 1.0, 1.05, reach / 1000000]} />
        <HeroKPI i={2} label="Engagement prom." value={`${engProm}%`} delta="sobre media" up accent="#2563EB" />
        <HeroKPI i={3} label="Sentimiento +" value={`${posPct}%`} delta="favorable" up accent="#7C3AED" />
      </>}>

      {scanning ? (
        <Panel>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 0', gap: '18px' }}>
            <div style={{ position: 'relative', width: '90px', height: '90px' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `3px solid ${colores.borde}`, borderTopColor: colores.primario, animation: 'spinRadar 0.9s linear infinite' }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {React.createElement(plataformas[platIdx].icon, { size: 30, color: plataformas[platIdx].color })}
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '15px', fontWeight: 800, color: colores.textoClaro, margin: 0 }}>
                Analizando {plataformas[platIdx].red}…
              </p>
              <p style={{ fontSize: '12px', color: colores.textoMedio, margin: '2px 0 0' }}>
                Buscando menciones de <b style={{ color: colores.primario }}>“{marca}”</b> y perfiles relevantes
              </p>
            </div>
            <div style={{ width: '100%', maxWidth: '460px' }}>
              <GrowBar pct={progress} color={colores.primario} h={10} />
              <p style={{ ...tnum, fontSize: '12px', color: colores.textoMedio, textAlign: 'right', margin: '6px 0 0', fontWeight: 700 }}>{Math.round(progress)}%</p>
            </div>
          </div>
          <style>{`@keyframes spinRadar { to { transform: rotate(360deg); } }`}</style>
        </Panel>
      ) : (
        <>
          {/* Filtros de plataforma + re-escanear */}
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <Search size={16} color={colores.textoMedio} />
              {['Todos', ...plataformas.map(p => p.red)].map(r => (
                <button key={r} onClick={() => setFiltro(r)} style={{
                  padding: '7px 13px', borderRadius: '10px', border: `1px solid ${filtro === r ? colores.primario : colores.borde}`,
                  background: filtro === r ? colores.primario : colores.fondoSecundario, color: filtro === r ? '#fff' : colores.textoMedio,
                  fontSize: '12px', fontWeight: 700, cursor: 'pointer', transition: 'all .2s',
                }}>{r}</button>
              ))}
              <button onClick={() => setScanKey(k => k + 1)} style={{
                marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '10px',
                border: 'none', background: colores.primario, color: '#fff', fontSize: '12px', fontWeight: 700, cursor: 'pointer',
              }}><RefreshCw size={14} /> Re-escanear</button>
            </div>
          </Reveal>

          {/* Grid de influencers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {vistos.map((inf, i) => {
              const p = platOf(inf.red); const Sicon = p.icon; const sm = sentMeta[inf.sent];
              return (
                <Reveal key={inf.handle} delay={i * 55}>
                  <div style={{ background: colores.fondoSecundario, border: `1px solid ${colores.borde}`, borderRadius: '18px', padding: '16px', boxShadow: colores.sombra, transition: 'transform .2s, box-shadow .2s', cursor: 'default' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = colores.sombraGrande; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = colores.sombra; }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                      <div style={{ width: '46px', height: '46px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '15px', background: `linear-gradient(135deg, ${colores.primario}, ${colores.primarioOscuro})` }}>{initials(inf.nombre)}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ fontSize: '14px', fontWeight: 800, color: colores.textoClaro }}>{inf.nombre}</span>
                          {inf.verif && <BadgeCheck size={15} color={colores.primario} />}
                        </div>
                        <span style={{ fontSize: '12px', color: colores.textoMedio }}>{inf.handle}</span>
                      </div>
                      <div style={{ width: '34px', height: '34px', borderRadius: '10px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${p.color}18` }}>
                        <Sicon size={18} color={p.color} />
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      {[
                        { l: 'Seguidores', v: fmtK(inf.followers) },
                        { l: 'Engagement', v: `${inf.eng}%` },
                        { l: `Posts ${marca}`, v: `${inf.posts}` },
                      ].map(x => (
                        <div key={x.l} style={{ textAlign: 'center' }}>
                          <p style={{ ...tnum, fontSize: '16px', fontWeight: 800, color: colores.textoClaro, margin: 0 }}>{x.v}</p>
                          <p style={{ fontSize: '9px', color: colores.textoMedio, margin: 0, textTransform: 'uppercase', letterSpacing: '0.3px' }}>{x.l}</p>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: sm.c, background: `${sm.c}18`, borderRadius: '8px', padding: '4px 9px' }}>Sentimiento {sm.t}</span>
                      {enviados.has(inf.handle) ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 700, color: colores.exito, background: `${colores.exito}18`, borderRadius: '8px', padding: '5px 11px' }}><Check size={13} /> Contactado</span>
                      ) : (
                        <button onClick={() => setConfirm(inf)} style={{ fontSize: '11px', fontWeight: 700, color: colores.primario, background: 'transparent', border: `1px solid ${colores.borde}`, borderRadius: '8px', padding: '5px 11px', cursor: 'pointer' }}>Contactar</button>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </>
      )}

      <Modal open={confirm !== null} onClose={() => setConfirm(null)} icon={Send} title="Contactar influencer" subtitle={confirm ? confirm.handle : ''}>
        {confirm && (
          <>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: colores.textoClaro, margin: '0 0 18px' }}>
              ¿Seguro que quieres contactar a <b>{confirm.nombre}</b> ({confirm.handle})? Le enviaremos un mensaje por <b>{confirm.red}</b> proponiendo una colaboración con <b>{marca}</b>.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button onClick={() => setConfirm(null)} style={{ padding: '9px 16px', borderRadius: '10px', border: `1px solid ${colores.borde}`, background: 'transparent', color: colores.textoMedio, fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>Cancelar</button>
              <button onClick={() => { setEnviados(prev => new Set(prev).add(confirm.handle)); setConfirm(null); }}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px', borderRadius: '10px', border: 'none', background: colores.primario, color: '#fff', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                <Send size={15} /> Sí, enviar mensaje
              </button>
            </div>
          </>
        )}
      </Modal>
    </Shell>
  );
};
