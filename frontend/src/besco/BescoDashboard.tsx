import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Truck, Wrench, AlertTriangle, DollarSign, Building2, Video, Zap, Flame } from 'lucide-react';
import { brandingConfig, type TemaBesco } from '../config/branding';
import { kpisAdmin, modulosPorModo, resumenGeneral, type Modo } from './bescoData';
import { HeroCard } from '../components/modules/dashboardModules/Herocard';
import { ExtrasModulo } from './ExtrasModulo';

type Lado = { icon: LucideIcon; valor: string; titulo: string };

const SideCard: React.FC<{ d: Lado; tema: TemaBesco }> = ({ d, tema }) => {
  const Icon = d.icon;
  const { colores } = brandingConfig;
  return (
    <div style={{ flex: 1, background: colores.fondoPrincipal, border: `1px solid ${colores.borde}`, borderRadius: '18px', padding: '18px', boxShadow: colores.sombra, display: 'flex', flexDirection: 'column', gap: '10px', minHeight: 0 }}>
      <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: `linear-gradient(135deg, ${tema.acento}, ${tema.acentoOscuro})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 6px 14px ${tema.acento}38` }}>
        <Icon size={21} color={tema.sobreAcento} />
      </div>
      <div>
        <p style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: colores.textoClaro, fontVariantNumeric: 'tabular-nums' }}>{d.valor}</p>
        <p style={{ margin: '2px 0 0', fontSize: '12.5px', color: colores.textoMedio }}>{d.titulo}</p>
      </div>
    </div>
  );
};

const { colores, empresa } = brandingConfig;

export const BescoDashboard: React.FC<{ modo: Modo; tema: TemaBesco; onOpen: (id: string) => void }> = ({ modo, tema, onOpen }) => {
  const modulos = modulosPorModo(modo);

  const highlights = modo === 'admin'
    ? [{ valor: '400', label: 'Unidades' }, { valor: '35', label: 'Oficinas' }, { valor: '7,000', label: 'Inmuebles' }]
    : [{ valor: '7,000', label: 'Inmuebles' }, { valor: '46', label: 'Clientes' }, { valor: '87', label: 'Health Score' }];

  const lados: Lado[] = modo === 'admin'
    ? [
        { icon: Truck, valor: '352', titulo: 'Unidades activas' },
        { icon: Wrench, valor: '17', titulo: 'En riesgo de falla' },
        { icon: AlertTriangle, valor: '94%', titulo: 'SLA cumplido' },
        { icon: DollarSign, valor: '$184K', titulo: 'Fuga detectada' },
      ]
    : [
        { icon: Building2, valor: '87', titulo: 'Smart Building Score' },
        { icon: Video, valor: '742', titulo: 'Cámaras activas' },
        { icon: Zap, valor: '14%', titulo: 'Ahorro energético' },
        { icon: Flame, valor: '3', titulo: 'Alertas críticas' },
      ];

  return (
    <div style={{ maxWidth: '1400px' }}>
      {/* HERO */}
      <section style={{
        position: 'relative', overflow: 'hidden', borderRadius: '24px', marginBottom: '28px',
        padding: 'clamp(24px, 4vw, 40px)',
        background: `linear-gradient(120deg, ${tema.acentoOscuro} 0%, ${tema.acento} 100%)`,
        boxShadow: `0 18px 40px ${tema.acento}40`,
      }}>
        {/* Brillo decorativo */}
        <div style={{ position: 'absolute', top: '-60px', right: '-40px', width: '280px', height: '280px', borderRadius: '50%', background: 'rgba(255,255,255,0.14)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-80px', right: '120px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
          <div style={{ maxWidth: '620px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(255,255,255,0.18)', marginBottom: '16px' }}>
              <img src={empresa.logo} alt={empresa.nombre} style={{ height: '20px', width: 'auto', objectFit: 'contain' }} />
              <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: tema.sobreAcento }}>{tema.nombre}</span>
            </div>
            <h1 style={{ margin: 0, fontSize: 'clamp(26px, 4.4vw, 40px)', fontWeight: 800, color: tema.sobreAcento, letterSpacing: '-0.5px', lineHeight: 1.1 }}>
              {modo === 'admin' ? 'Cómo BESCO mantiene su operación' : 'Edificios inteligentes para tus clientes'}
            </h1>
            <p style={{ margin: '12px 0 0', fontSize: 'clamp(14px, 1.6vw, 16px)', color: tema.sobreAcento, opacity: 0.9, lineHeight: 1.5 }}>
              {modo === 'admin'
                ? 'Flota, mantenimiento predictivo, SLA y gasto operativo en un solo lugar. Más de 50 años manteniendo la operación de México.'
                : 'Vigilancia con IA, salud de inmuebles y ahorro energético sobre 7,000 inmuebles bajo contrato en todo el país.'}
            </p>
          </div>

          {/* Highlights */}
          <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
            {highlights.map((h, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '16px 18px', borderRadius: '16px', background: 'rgba(255,255,255,0.16)', backdropFilter: 'blur(4px)', minWidth: '92px' }}>
                <p style={{ margin: 0, fontSize: '26px', fontWeight: 800, color: tema.sobreAcento, fontVariantNumeric: 'tabular-nums' }}>{h.valor}</p>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: tema.sobreAcento, opacity: 0.85 }}>{h.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KPIs de cabecera (solo admin) */}
      {modo === 'admin' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          {kpisAdmin.map((k, i) => (
            <div key={i} style={{ background: colores.fondoPrincipal, border: `1px solid ${colores.borde}`, borderRadius: '16px', padding: '20px 22px', boxShadow: colores.sombra, borderTop: `3px solid ${tema.acento}` }}>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: colores.textoMedio, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{k.label}</p>
              <p style={{ margin: '8px 0 0', fontSize: '30px', fontWeight: 800, color: colores.textoClaro, fontVariantNumeric: 'tabular-nums' }}>{k.valor}</p>
            </div>
          ))}
        </div>
      )}

      {/* Asistente IA al centro + tarjetas a los lados */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', alignItems: 'stretch', marginBottom: '28px' }}>
        <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {lados.slice(0, 2).map((d, i) => <SideCard key={i} d={d} tema={tema} />)}
        </div>
        <div style={{ flex: '2 1 360px', minWidth: '300px' }}>
          <HeroCard tema={tema} onNavigate={onOpen} secciones={modulos} />
        </div>
        <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {lados.slice(2, 4).map((d, i) => <SideCard key={i} d={d} tema={tema} />)}
        </div>
      </div>

      {/* Centro de decisiones: alertas + recomendación MAYIA + palancas de toda la operación */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '19px', fontWeight: 800, color: colores.textoClaro, letterSpacing: '-0.2px' }}>Centro de decisiones</h2>
        <span style={{ fontSize: '13px', color: colores.textoMedio }}>lo que MAYIA sugiere accionar hoy</span>
      </div>
      <div style={{ marginBottom: '28px' }}>
        <ExtrasModulo tema={tema} extra={resumenGeneral(modo)} titulo={modo === 'admin' ? 'Alertas de la operación' : 'Alertas de inmuebles'} />
      </div>

      {/* Módulos */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '19px', fontWeight: 800, color: colores.textoClaro, letterSpacing: '-0.2px' }}>Módulos</h2>
        <span style={{ fontSize: '13px', color: colores.textoMedio }}>entra a cada uno para ver alertas y palancas al detalle</span>
      </div>

      {/* Grid de módulos (cuadritos) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '18px' }}>
        {modulos.map(m => {
          const Icon = m.icono;
          return (
            <button key={m.id} onClick={() => onOpen(m.id)}
              style={{ textAlign: 'left', cursor: 'pointer', background: colores.fondoPrincipal, border: `1px solid ${colores.borde}`, borderRadius: '16px', padding: '20px', boxShadow: colores.sombra, transition: 'transform .15s, box-shadow .15s', display: 'flex', flexDirection: 'column', gap: '14px' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = colores.sombraMedia; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = colores.sombra; }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '13px', background: `linear-gradient(135deg, ${tema.acento}, ${tema.acentoOscuro})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 6px 14px ${tema.acento}38` }}>
                  <Icon size={22} color={tema.sobreAcento} />
                </div>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: colores.textoClaro, lineHeight: 1.25 }}>{m.titulo}</h3>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: colores.textoMedio, lineHeight: 1.4 }}>{m.descripcion}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'auto' }}>
                {m.kpis.map((k, i) => (
                  <div key={i} style={{ background: colores.fondoSecundario, borderRadius: '10px', padding: '8px 12px', flex: '1 1 auto' }}>
                    <p style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: tema.acentoOscuro, fontVariantNumeric: 'tabular-nums' }}>{k.valor}</p>
                    <p style={{ margin: '2px 0 0', fontSize: '11px', color: colores.textoOscuro }}>{k.label}</p>
                  </div>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
