import React, { useState } from 'react';
import {
  Building2, Filter, Radio, Compass, MessageCircle,
  CreditCard, Repeat, Truck, LineChart, SlidersHorizontal, ChevronDown,
} from 'lucide-react';
import { Card, Pill, StatTile, ProgressBar, Semaforo, MiniBars, BarRow, DataTable, colores } from './ui';
import {
  agencias, funnel, canales, acciones, filtros,
} from './data';

// ───────────────────────────────────────────────────────────────────────────────
// Dashboard por agencia — comparativo + semáforo + ranking
export const DashboardAgencias: React.FC = () => {
  const ranking = [...agencias].sort((a, b) => b.ventas / b.meta - a.ventas / a.meta);
  const detalle = (
    <DataTable
      cols={['Agencia', 'Ventas', 'Meta', '% Meta', 'Leads', 'Conv.', 'Estado']}
      rows={ranking.map(a => [
        a.nombre, `${a.ventas}`, `${a.meta}`, `${Math.round((a.ventas / a.meta) * 100)}%`,
        a.leads.toLocaleString(), `${a.conv}%`, <Semaforo estado={a.estado} />,
      ])}
    />
  );
  return (
    <Card icon={Building2} title="Dashboard por Agencia" subtitle="Comparativo y ranking" cta="Ver tabla completa" detalle={detalle}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto', minHeight: 0 }}>
        {ranking.map((a, i) => (
          <div key={a.nombre} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: colores.textoMedio, width: '18px' }}>{i + 1}</span>
            <Semaforo estado={a.estado} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <ProgressBar pct={Math.round((a.ventas / a.meta) * 100)}
                color={a.estado === 'verde' ? colores.exito : a.estado === 'amarillo' ? colores.advertencia : colores.peligro}
                label={a.nombre} right={`${a.ventas}/${a.meta}`} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// Funnel comercial — 12 etapas
export const FunnelComercial: React.FC = () => {
  const max = funnel[0].n;
  const detalle = (
    <DataTable
      cols={['Etapa', 'Prospectos', 'Conversión', '% del total']}
      rows={funnel.map((e, i) => [
        e.etapa, e.n.toLocaleString(),
        i === 0 ? '—' : `${Math.round((e.n / funnel[i - 1].n) * 100)}%`,
        `${Math.round((e.n / funnel[0].n) * 100)}%`,
      ])}
    />
  );
  return (
    <Card icon={Filter} title="Funnel Comercial" subtitle="12 etapas · lead → recompra" cta="Analizar embudo" detalle={detalle}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto', minHeight: 0 }}>
        {funnel.map((e, i) => {
          const pct = (e.n / max) * 100;
          return (
            <div key={e.etapa} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: colores.textoMedio, width: '72px', flexShrink: 0 }}>{e.etapa}</span>
              <div style={{ flex: 1, height: '18px', borderRadius: '6px', background: colores.fondoTerciario, overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, height: '100%', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '6px',
                  background: `linear-gradient(90deg, ${colores.primarioOscuro}, ${colores.primario})`, transition: 'width .6s ease' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#fff' }}>{e.n.toLocaleString()}</span>
                </div>
              </div>
              {i > 0 ? <span style={{ fontSize: '10px', color: colores.textoMedio, width: '34px', textAlign: 'right' }}>{Math.round((e.n / funnel[i - 1].n) * 100)}%</span> : <span style={{ width: '34px' }} />}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

// Lead Generation — por canal con CPL y ROI
export const LeadGeneration: React.FC = () => {
  const maxLeads = Math.max(...canales.map(c => c.leads));
  const detalle = (
    <>
      <h4 style={{ fontSize: '12px', color: colores.textoMedio, margin: '0 0 10px' }}>Leads por canal</h4>
      {canales.map(c => <BarRow key={c.nombre} label={c.nombre} value={c.leads} max={maxLeads} right={c.leads.toLocaleString()} />)}
      <div style={{ marginTop: '16px' }}>
        <DataTable cols={['Canal', 'Leads', 'CPL', 'ROI']} rows={canales.map(c => [c.nombre, c.leads.toLocaleString(), `$${c.cpl}`, `×${c.roi}`])} />
      </div>
    </>
  );
  return (
    <Card icon={Radio} title="Lead Generation" subtitle="Por canal · CPL y ROI" cta="Ver atribución" detalle={detalle}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto', minHeight: 0 }}>
        {canales.map(c => (
          <div key={c.nombre} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', background: colores.fondoTerciario, borderRadius: '10px', border: `1px solid ${colores.borde}` }}>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: colores.textoClaro, margin: 0 }}>{c.nombre}</p>
              <p style={{ fontSize: '10px', color: colores.textoMedio, margin: 0 }}>{c.leads.toLocaleString()} leads · CPL ${c.cpl}</p>
            </div>
            <Pill text={`ROI ×${c.roi}`} color={c.roi >= 4 ? colores.exito : colores.advertencia} />
          </div>
        ))}
      </div>
    </Card>
  );
};

// Copiloto comercial — siguiente mejor acción
export const CopilotoComercial: React.FC = () => (
  <Card icon={Compass} title="Copiloto Comercial" subtitle="Siguiente mejor acción" badge={<Pill text="IA" />} cta="Ver todas las acciones">
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', minHeight: 0 }}>
      {acciones.map((a, i) => (
        <div key={i} style={{ padding: '10px', borderRadius: '10px', borderLeft: `4px solid ${a.prioridad === 'alta' ? colores.peligro : colores.advertencia}`, background: colores.fondoTerciario }}>
          <p style={{ fontSize: '12px', fontWeight: 600, color: colores.textoClaro, margin: 0 }}>{a.accion}</p>
          <p style={{ fontSize: '10px', color: colores.textoMedio, margin: '2px 0 0' }}>→ {a.vendedor} · prioridad {a.prioridad}</p>
        </div>
      ))}
    </div>
  </Card>
);

// Agente WhatsApp/IA
export const AgenteWhatsApp: React.FC = () => (
  <Card icon={MessageCircle} title="Agente WhatsApp / IA" subtitle="Calificación y agenda automática" badge={<Pill text="LIVE" color={colores.exito} />}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '8px', marginBottom: '10px' }}>
      <StatTile label="Chats hoy" value="312" delta="24%" deltaUp />
      <StatTile label="Calificados" value="189" delta="60.5%" deltaUp />
      <StatTile label="Citas agendadas" value="74" delta="auto" deltaUp />
      <StatTile label="Sin atender" value="18" />
    </div>
    <p style={{ fontSize: '11px', color: colores.textoMedio, margin: 0 }}>Tiempo medio de respuesta IA: <b style={{ color: colores.textoClaro }}>8 seg</b></p>
  </Card>
);

// Financiamiento
export const Financiamiento: React.FC = () => (
  <Card icon={CreditCard} title="Financiamiento" subtitle="Créditos y aprobación">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '8px', marginBottom: '10px' }}>
      <StatTile label="Iniciados" value="1,820" />
      <StatTile label="Aprobados" value="1,390" delta="76%" deltaUp />
      <StatTile label="Plazo prom." value="48 m" />
      <StatTile label="Enganche prom." value="22%" />
    </div>
    <ProgressBar pct={76} color={colores.exito} label="Tasa de aprobación" right="76%" />
  </Card>
);

// Postventa y Recompra
export const PostventaRecompra: React.FC = () => (
  <Card icon={Repeat} title="Postventa y Recompra" subtitle="Clientes con potencial">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '8px', marginBottom: '10px' }}>
      <StatTile label="Potencial recompra" value="240" delta="alta" deltaUp />
      <StatTile label="Antigüedad >3 años" value="612" />
      <StatTile label="Servicios al día" value="68%" />
      <StatTile label="NPS" value="74" delta="6 pts" deltaUp />
    </div>
    <p style={{ fontSize: '11px', color: colores.textoMedio, margin: 0 }}>Clientes con 4+ años listos para upgrade: <b style={{ color: colores.primario }}>240</b></p>
  </Card>
);

// Seminuevos y Flotillas B2B
export const SeminuevosFlotillas: React.FC = () => (
  <Card icon={Truck} title="Seminuevos y Flotillas B2B" subtitle="Inventario y cuentas corporativas">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '8px' }}>
      <StatTile label="Seminuevos stock" value="186" />
      <StatTile label="Ventas seminuevos" value="94" delta="11%" deltaUp />
      <StatTile label="Cuentas B2B" value="32" />
      <StatTile label="Unidades flotilla" value="410" delta="18%" deltaUp />
    </div>
  </Card>
);

// Predicción de ventas + simulador de metas
export const PrediccionVentas: React.FC = () => {
  const [meta, setMeta] = useState(1500);
  const base = 1426;
  return (
    <Card icon={LineChart} title="Predicción y Simulador" subtitle="Pronóstico · metas" badge={<Pill text="IA" />}>
      <MiniBars data={[1180, 1240, 1190, 1320, 1380, 1426, 1510]} color={colores.primario} height={56} />
      <p style={{ fontSize: '11px', color: colores.textoMedio, margin: '8px 0 4px' }}>Proyección próx. mes: <b style={{ color: colores.textoClaro }}>{base} u.</b></p>
      <label style={{ fontSize: '11px', color: colores.textoMedio }}>Simular meta: <b style={{ color: colores.primario }}>{meta} u.</b></label>
      <input type="range" min={1200} max={1800} value={meta} onChange={e => setMeta(+e.target.value)} style={{ width: '100%', accentColor: colores.primario }} />
      <p style={{ fontSize: '11px', margin: '2px 0 0', color: meta > base ? colores.peligro : colores.exito }}>
        {meta > base ? `Faltan ${meta - base} u. — requiere +${Math.round(((meta - base) / base) * 100)}% esfuerzo` : 'Meta alcanzable con tendencia actual ✓'}
      </p>
    </Card>
  );
};

// ───────────────────────────────────────────────────────────────────────────────
// Barra de filtros globales (dummy, cruzables) — 10 filtros
export const FiltrosGlobales: React.FC = () => (
  <div style={{
    display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center',
    background: colores.fondoSecundario, border: `1px solid ${colores.borde}`,
    borderRadius: '16px', padding: '12px 16px', marginBottom: '24px', boxShadow: colores.sombra,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginRight: '4px' }}>
      <SlidersHorizontal size={16} color={colores.primario} />
      <span style={{ fontSize: '12px', fontWeight: 700, color: colores.textoClaro }}>Filtros</span>
    </div>
    {filtros.map(f => (
      <button key={f} style={{
        display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 12px', borderRadius: '10px',
        border: `1px solid ${colores.borde}`, background: colores.fondoTerciario, color: colores.textoMedio,
        fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
      }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = colores.primario; e.currentTarget.style.color = colores.primario; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = colores.borde; e.currentTarget.style.color = colores.textoMedio; }}
      >
        {f} <ChevronDown size={13} />
      </button>
    ))}
    <button style={{
      marginLeft: 'auto', padding: '7px 14px', borderRadius: '10px', border: 'none',
      background: colores.primario, color: '#fff', fontSize: '12px', fontWeight: 700, cursor: 'pointer',
    }}>Aplicar</button>
  </div>
);
