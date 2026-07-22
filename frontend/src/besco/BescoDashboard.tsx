import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Truck, Wrench, AlertTriangle, DollarSign, Building2, Video, Zap, Flame } from 'lucide-react';
import { brandingConfig, type TemaBesco } from '../config/branding';
import { kpisAdmin, modulosPorModo, modulosCompras, modulosFlotillas, modulosEspeciales, resumenGeneral, type Modo, type Modulo } from './bescoData';
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

const { colores, empresa, temas } = brandingConfig;

export const BescoDashboard: React.FC<{ modo: Modo; tema: TemaBesco; onOpen: (id: string) => void }> = ({ modo, tema, onOpen }) => {
  const modulosVerde = modulosPorModo('cliente').filter(m => m.id !== 'abastecimiento' && m.id !== 'rendimiento-vendedores');

  const renderModuleCard = (m: Modulo, temaSection: TemaBesco) => {
    const Icon = m.icono;
    return (
      <button key={m.id} onClick={() => onOpen(m.id)}
        style={{ textAlign: 'left', cursor: 'pointer', background: colores.fondoPrincipal, border: `1px solid ${colores.borde}`, borderRadius: '16px', padding: '20px', boxShadow: colores.sombra, transition: 'transform .15s, box-shadow .15s', display: 'flex', flexDirection: 'column', gap: '14px' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = colores.sombraMedia; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = colores.sombra; }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '13px', background: `linear-gradient(135deg, ${temaSection.acento}, ${temaSection.acentoOscuro})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 6px 14px ${temaSection.acento}38` }}>
            <Icon size={22} color={temaSection.sobreAcento} />
          </div>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: colores.textoClaro, lineHeight: 1.25 }}>{m.titulo}</h3>
        </div>
        <p style={{ margin: 0, fontSize: '13px', color: colores.textoMedio, lineHeight: 1.4 }}>{m.descripcion}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'auto' }}>
          {m.kpis.map((k, i) => (
            <div key={i} style={{ background: colores.fondoSecundario, borderRadius: '10px', padding: '8px 12px', flex: '1 1 auto' }}>
              <p style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: temaSection.acentoOscuro, fontVariantNumeric: 'tabular-nums' }}>{k.valor}</p>
              <p style={{ margin: '2px 0 0', fontSize: '11px', color: colores.textoOscuro }}>{k.label}</p>
            </div>
          ))}
        </div>
      </button>
    );
  };

  const temaRojo = temas.compras;
  const temaAzul = temas.flotillas;
  const temaVerde = temas.cliente;

  return (
    <div style={{ maxWidth: '1400px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      
      {/* 🔴 SECCIÓN 1: CONTROL INTELIGENTE DE COMPRAS (ROJO) */}
      <section>
        {/* Banner Rojo */}
        <div style={{
          position: 'relative', overflow: 'hidden', borderRadius: '24px', marginBottom: '24px',
          padding: 'clamp(24px, 4vw, 36px)',
          background: `linear-gradient(120deg, ${temaRojo.acentoOscuro} 0%, ${temaRojo.acento} 100%)`,
          boxShadow: `0 18px 40px ${temaRojo.acento}40`,
        }}>
          <div style={{ position: 'absolute', top: '-60px', right: '-40px', width: '280px', height: '280px', borderRadius: '50%', background: 'rgba(255,255,255,0.14)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
            <div style={{ maxWidth: '620px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(255,255,255,0.18)', marginBottom: '14px' }}>
                <img src={empresa.logo} alt={empresa.nombre} style={{ height: '28px', width: 'auto', objectFit: 'contain' }} />
                <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: temaRojo.sobreAcento }}>
                  {temaRojo.nombre}
                </span>
              </div>
              <h1 style={{ margin: 0, fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: temaRojo.sobreAcento, letterSpacing: '-0.5px', lineHeight: 1.1 }}>
                Comando Inteligente de Compras
              </h1>
              <p style={{ margin: '10px 0 0', fontSize: '15px', color: temaRojo.sobreAcento, opacity: 0.92, lineHeight: 1.5 }}>
                Gestión estratégica de requisiciones, cotizaciones por IA, aprobaciones y auditoría en tiempo real.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ textAlign: 'center', padding: '14px 18px', borderRadius: '16px', background: 'rgba(255,255,255,0.16)', backdropFilter: 'blur(4px)' }}>
                <p style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: temaRojo.sobreAcento }}>$1.61M</p>
                <p style={{ margin: '2px 0 0', fontSize: '11.5px', color: temaRojo.sobreAcento, opacity: 0.85 }}>Ganancia Total</p>
              </div>
              <div style={{ textAlign: 'center', padding: '14px 18px', borderRadius: '16px', background: 'rgba(255,255,255,0.16)', backdropFilter: 'blur(4px)' }}>
                <p style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: temaRojo.sobreAcento }}>97.4%</p>
                <p style={{ margin: '2px 0 0', fontSize: '11.5px', color: temaRojo.sobreAcento, opacity: 0.85 }}>SLA Promedio</p>
              </div>
            </div>
          </div>
        </div>

        {/* Estilos responsivos del grid 3x4 de Compras */}
        <style>{`
          .compras-grid-3x4 {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 18px;
            align-items: stretch;
          }
          .compras-hero-cell {
            grid-column: 2;
            grid-row: 1 / span 2;
            display: flex;
            flex-direction: column;
            height: 100%;
          }
          @media (max-width: 960px) {
            .compras-grid-3x4 {
              grid-template-columns: 1fr;
            }
            .compras-hero-cell {
              grid-column: auto;
              grid-row: auto;
            }
          }
        `}</style>

        {/* 9 Módulos de Compras con el Asistente IA incrustado al centro (Columna 2, Fila 1-2) */}
        <div className="compras-grid-3x4">
          {/* Fila 1 - Columna 1: Requisiciones */}
          {renderModuleCard(modulosCompras[0], temaRojo)}

          {/* Columna 2 - Filas 1 a 2: Asistente IA Centrado en Rojo */}
          <div className="compras-hero-cell">
            <HeroCard tema={temaRojo} onNavigate={onOpen} secciones={modulosCompras} />
          </div>

          {/* Fila 1 - Columna 3: Proveedores */}
          {renderModuleCard(modulosCompras[1], temaRojo)}

          {/* Fila 2 - Columna 1: Cotizaciones */}
          {renderModuleCard(modulosCompras[2], temaRojo)}

          {/* Fila 2 - Columna 3: Inventario */}
          {renderModuleCard(modulosCompras[3], temaRojo)}

          {/* Filas 3 y 4 - Módulos restantes (Aprobaciones, Presupuesto, Órdenes de Compra, Impacto SLA, Auditoría) */}
          {modulosCompras.slice(4).map(m => renderModuleCard(m, temaRojo))}
        </div>
      </section>

      {/* 🔵 SECCIÓN 2: COMANDO INTELIGENTE DE FLOTILLAS (AZUL MARINO) */}
      <section>
        {/* Banner Azul Marino */}
        <div style={{
          position: 'relative', overflow: 'hidden', borderRadius: '24px', marginBottom: '24px',
          padding: 'clamp(24px, 4vw, 36px)',
          background: `linear-gradient(120deg, ${temaAzul.acentoOscuro} 0%, ${temaAzul.acento} 100%)`,
          boxShadow: `0 18px 40px ${temaAzul.acento}40`,
        }}>
          <div style={{ position: 'absolute', top: '-60px', right: '-40px', width: '280px', height: '280px', borderRadius: '50%', background: 'rgba(255,255,255,0.14)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
            <div style={{ maxWidth: '620px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(255,255,255,0.18)', marginBottom: '14px' }}>
                <img src={empresa.logo} alt={empresa.nombre} style={{ height: '28px', width: 'auto', objectFit: 'contain' }} />
                <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: temaAzul.sobreAcento }}>
                  {temaAzul.nombre}
                </span>
              </div>
              <h1 style={{ margin: 0, fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: temaAzul.sobreAcento, letterSpacing: '-0.5px', lineHeight: 1.1 }}>
                Comando Inteligente de Flotillas
              </h1>
              <p style={{ margin: '10px 0 0', fontSize: '15px', color: temaAzul.sobreAcento, opacity: 0.92, lineHeight: 1.5 }}>
                Monitoreo en tiempo real, optimización de rutas por IA, mantenimientos predictivos y control de pólizas.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ textAlign: 'center', padding: '14px 18px', borderRadius: '16px', background: 'rgba(255,255,255,0.16)', backdropFilter: 'blur(4px)' }}>
                <p style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: temaAzul.sobreAcento }}>400</p>
                <p style={{ margin: '2px 0 0', fontSize: '11.5px', color: temaAzul.sobreAcento, opacity: 0.85 }}>Unidades Activas</p>
              </div>
              <div style={{ textAlign: 'center', padding: '14px 18px', borderRadius: '16px', background: 'rgba(255,255,255,0.16)', backdropFilter: 'blur(4px)' }}>
                <p style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: temaAzul.sobreAcento }}>94%</p>
                <p style={{ margin: '2px 0 0', fontSize: '11.5px', color: temaAzul.sobreAcento, opacity: 0.85 }}>Cumplimiento SLA</p>
              </div>
            </div>
          </div>
        </div>

        {/* 9 Módulos de Flotillas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '18px' }}>
          {modulosFlotillas.map(m => renderModuleCard(m, temaAzul))}
        </div>
      </section>

      {/* 🟢 SECCIÓN 3: CONTROL INTELIGENTE DE NUEVOS NEGOCIOS (VERDE) */}
      <section>
        {/* Banner Verde */}
        <div style={{
          position: 'relative', overflow: 'hidden', borderRadius: '24px', marginBottom: '24px',
          padding: 'clamp(24px, 4vw, 36px)',
          background: `linear-gradient(120deg, ${temaVerde.acentoOscuro} 0%, ${temaVerde.acento} 100%)`,
          boxShadow: `0 18px 40px ${temaVerde.acento}40`,
        }}>
          <div style={{ position: 'absolute', top: '-60px', right: '-40px', width: '280px', height: '280px', borderRadius: '50%', background: 'rgba(255,255,255,0.14)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
            <div style={{ maxWidth: '620px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(255,255,255,0.18)', marginBottom: '14px' }}>
                <img src={empresa.logo} alt={empresa.nombre} style={{ height: '28px', width: 'auto', objectFit: 'contain' }} />
                <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: temaVerde.sobreAcento }}>
                  {temaVerde.nombre}
                </span>
              </div>
              <h1 style={{ margin: 0, fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: temaVerde.sobreAcento, letterSpacing: '-0.5px', lineHeight: 1.1 }}>
                Edificios inteligentes para tus clientes
              </h1>
              <p style={{ margin: '10px 0 0', fontSize: '15px', color: temaVerde.sobreAcento, opacity: 0.92, lineHeight: 1.5 }}>
                Vigilancia con IA, salud de inmuebles y ahorro energético sobre 7,000 inmuebles bajo contrato en todo el país.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ textAlign: 'center', padding: '14px 18px', borderRadius: '16px', background: 'rgba(255,255,255,0.16)', backdropFilter: 'blur(4px)' }}>
                <p style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: temaVerde.sobreAcento }}>7,000</p>
                <p style={{ margin: '2px 0 0', fontSize: '11.5px', color: temaVerde.sobreAcento, opacity: 0.85 }}>Inmuebles</p>
              </div>
              <div style={{ textAlign: 'center', padding: '14px 18px', borderRadius: '16px', background: 'rgba(255,255,255,0.16)', backdropFilter: 'blur(4px)' }}>
                <p style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: temaVerde.sobreAcento }}>87</p>
                <p style={{ margin: '2px 0 0', fontSize: '11.5px', color: temaVerde.sobreAcento, opacity: 0.85 }}>Health Score</p>
              </div>
            </div>
          </div>
        </div>

        {/* Centro de decisiones y Alertas */}
        <div style={{ marginBottom: '24px' }}>
          <ExtrasModulo tema={temaVerde} extra={resumenGeneral('cliente')} titulo="Alertas de Inmuebles & Smart Buildings" />
        </div>

        {/* Módulos de Edificios */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '18px' }}>
          {modulosVerde.map(m => renderModuleCard(m, temaVerde))}
        </div>
      </section>

      {/* 🛡️ SECCIÓN 5: CAPACITACIÓN & SEGURIDAD (CIBERSEGURIDAD Y ACADEMIA - HASTA EL FINAL EN SECCIÓN APARTE) */}
      <section>
        <div style={{
          position: 'relative', overflow: 'hidden', borderRadius: '24px', marginBottom: '24px',
          padding: 'clamp(24px, 4vw, 36px)',
          background: `linear-gradient(120deg, #0284C7 0%, #038CAE 100%)`,
          boxShadow: `0 18px 40px rgba(3, 140, 174, 0.3)`,
        }}>
          <div style={{ position: 'absolute', top: '-60px', right: '-40px', width: '280px', height: '280px', borderRadius: '50%', background: 'rgba(255,255,255,0.14)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
            <div style={{ maxWidth: '620px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(255,255,255,0.18)', marginBottom: '14px' }}>
                <img src={empresa.logo} alt={empresa.nombre} style={{ height: '28px', width: 'auto', objectFit: 'contain' }} />
                <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#FFFFFF' }}>
                  CAPACITACIÓN & SEGURIDAD ESPECIALIZADA
                </span>
              </div>
              <h1 style={{ margin: 0, fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.5px', lineHeight: 1.1 }}>
                Servicios Especiales, Monitoreo & Mesa de Ayuda
              </h1>
              <p style={{ margin: '10px 0 0', fontSize: '15px', color: '#FFFFFF', opacity: 0.92, lineHeight: 1.5 }}>
                Protección digital integral, formación en IA, orquestación de monitoreo NOC/SOC con Sala Virtual y Mesa de Ayuda Enterprise.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ textAlign: 'center', padding: '14px 18px', borderRadius: '16px', background: 'rgba(255,255,255,0.16)', backdropFilter: 'blur(4px)' }}>
                <p style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#FFFFFF' }}>6 IA</p>
                <p style={{ margin: '2px 0 0', fontSize: '11.5px', color: '#FFFFFF', opacity: 0.85 }}>Agentes Malla</p>
              </div>
              <div style={{ textAlign: 'center', padding: '14px 18px', borderRadius: '16px', background: 'rgba(255,255,255,0.16)', backdropFilter: 'blur(4px)' }}>
                <p style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#FFFFFF' }}>3.4 min</p>
                <p style={{ margin: '2px 0 0', fontSize: '11.5px', color: '#FFFFFF', opacity: 0.85 }}>SLA Respuesta</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '18px' }}>
          {modulosEspeciales.map(m => renderModuleCard(m, { nombre: 'SeguridadAcademia', acento: '#038CAE', acentoOscuro: '#0284C7', sobreAcento: '#FFFFFF', acentoSuave: 'rgba(3,140,174,0.15)' }))}
        </div>
      </section>

    </div>
  );
};
