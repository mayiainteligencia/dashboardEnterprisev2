import React from 'react';
import { Crown, Target, Megaphone, Users, Package, Repeat } from 'lucide-react';
import { Card, Pill, StatTile, BarRow, DataTable, MiniBars, ProgressBar, colores } from './ui';
import {
  agencias, scoring, scoringFactores, campanias, campaniaDetalle, vendedores,
  vendedorEtapas, inventario, conversionFunnel, retencionCohorte,
} from './data';

// ───────────────────────────────────────────────────────────────────────────────
// Contenido "a detalle" exportado: lo reutilizan tanto el modal como la página propia.
// ───────────────────────────────────────────────────────────────────────────────

// 1 · Vista CEO
export const VistaCEODetalle: React.FC = () => {
  const totalVentas = agencias.reduce((s, a) => s + a.ventas, 0);
  const totalMeta = agencias.reduce((s, a) => s + a.meta, 0);
  const totalLeads = agencias.reduce((s, a) => s + a.leads, 0);
  const conv = (agencias.reduce((s, a) => s + a.conv, 0) / agencias.length).toFixed(1);
  const maxV = Math.max(...agencias.map(a => a.ventas));
  const top = [...agencias].sort((a, b) => b.ventas - a.ventas);
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px', marginBottom: '18px' }}>
        <StatTile label="Ventas mes" value={`${totalVentas}`} delta="8.4%" deltaUp />
        <StatTile label="Cumpl. meta" value={`${Math.round((totalVentas / totalMeta) * 100)}%`} delta={`${totalMeta} obj.`} deltaUp />
        <StatTile label="Leads" value={`${(totalLeads / 1000).toFixed(1)}K`} delta="12.8%" deltaUp />
        <StatTile label="Conversión" value={`${conv}%`} delta="1.2 pts" deltaUp />
      </div>
      <h4 style={{ fontSize: '12px', color: colores.textoMedio, margin: '0 0 10px' }}>Ventas por agencia</h4>
      {top.map(a => <BarRow key={a.nombre} label={a.nombre} value={a.ventas} max={maxV}
        color={a.estado === 'verde' ? colores.exito : a.estado === 'amarillo' ? colores.advertencia : colores.peligro}
        right={`${a.ventas}/${a.meta}`} />)}
      <div style={{ marginTop: '16px' }}>
        <DataTable cols={['Agencia', 'Ventas', 'Meta', '% Meta', 'Leads', 'Conv.']}
          rows={top.map(a => [a.nombre, `${a.ventas}`, `${a.meta}`, `${Math.round((a.ventas / a.meta) * 100)}%`, a.leads.toLocaleString(), `${a.conv}%`])} />
      </div>
    </>
  );
};

// 2 · Lead Scoring
export const LeadScoringDetalle: React.FC = () => {
  const dist = { alta: scoring.filter(s => s.intencion === 'alta').length, media: scoring.filter(s => s.intencion === 'media').length, baja: scoring.filter(s => s.intencion === 'baja').length };
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px', marginBottom: '18px' }}>
        <StatTile label="Intención alta" value={`${dist.alta}`} delta="prioridad" deltaUp />
        <StatTile label="Intención media" value={`${dist.media}`} />
        <StatTile label="Intención baja" value={`${dist.baja}`} />
      </div>
      {scoring.map(s => {
        const f = scoringFactores[s.nombre];
        return (
          <div key={s.nombre} style={{ marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: colores.textoClaro }}>{s.nombre} · {s.modelo}</span>
              <Pill text={`score ${s.score}`} color={s.score >= 80 ? colores.exito : s.score >= 50 ? colores.advertencia : colores.peligro} />
            </div>
            <BarRow label="Presupuesto" value={f.presupuesto} max={100} right={`${f.presupuesto}`} />
            <BarRow label="Urgencia" value={f.urgencia} max={100} right={`${f.urgencia}`} />
            <BarRow label="Interacciones" value={f.interacciones} max={100} right={`${f.interacciones}`} />
            <BarRow label="Crédito" value={f.credito} max={100} right={`${f.credito}`} />
          </div>
        );
      })}
    </>
  );
};

// 3 · Campañas
export const CampaniasDetalle: React.FC = () => {
  const maxRoi = Math.max(...campanias.map(c => c.roi));
  return (
    <>
      <div style={{ marginBottom: '18px' }}>
        <h4 style={{ fontSize: '12px', color: colores.textoMedio, margin: '0 0 10px' }}>ROI por campaña</h4>
        {campanias.map(c => <BarRow key={c.nombre} label={c.nombre} value={c.roi} max={maxRoi} right={`×${c.roi}`} />)}
      </div>
      <DataTable cols={['Campaña', 'Inversión', 'Alcance', 'Conv.', 'CPA', 'Canal']}
        rows={campaniaDetalle.map(c => {
          const base = campanias.find(x => x.nombre === c.nombre);
          return [c.nombre, `$${base?.inv ?? 0}K`, c.alcance.toLocaleString(), `${c.conv}`, c.cpa ? `$${c.cpa.toLocaleString()}` : '—', c.canal];
        })} />
    </>
  );
};

// 4 · Vendedores
export const VendedoresDetalle: React.FC = () => {
  const maxV = Math.max(...vendedores.map(v => v.ventas));
  return (
    <>
      <h4 style={{ fontSize: '12px', color: colores.textoMedio, margin: '0 0 10px' }}>Ventas por vendedor</h4>
      {vendedores.map(v => <BarRow key={v.nombre} label={v.nombre} value={v.ventas} max={maxV} right={`${v.ventas}`} />)}
      <div style={{ margin: '16px 0' }}>
        <DataTable cols={['Vendedor', 'Ventas', 'Eficiencia', 'Seg. vencidos']}
          rows={vendedores.map(v => [v.nombre, `${v.ventas}`, `${v.efic}%`, v.seguimientos ? `${v.seguimientos}` : '0'])} />
      </div>
      <h4 style={{ fontSize: '12px', color: colores.textoMedio, margin: '0 0 10px' }}>Eficiencia del equipo por etapa</h4>
      {vendedorEtapas.map(e => <BarRow key={e.etapa} label={e.etapa} value={e.pct} max={100}
        color={e.pct >= 60 ? colores.exito : e.pct >= 45 ? colores.advertencia : colores.peligro} right={`${e.pct}%`} />)}
    </>
  );
};

// 5 · Inventario
export const InventarioDetalle: React.FC = () => {
  const maxDias = Math.max(...inventario.map(i => i.dias));
  return (
    <>
      <h4 style={{ fontSize: '12px', color: colores.textoMedio, margin: '0 0 10px' }}>Días en lote (mayor = más lento)</h4>
      {inventario.map(it => <BarRow key={it.modelo} label={it.modelo} value={it.dias} max={maxDias}
        color={it.dias > 50 ? colores.peligro : it.dias > 30 ? colores.advertencia : colores.exito} right={`${it.dias}d`} />)}
      <div style={{ marginTop: '16px' }}>
        <DataTable cols={['Modelo', 'Stock', 'Días en lote', 'Demanda', 'Estado']}
          rows={inventario.map(it => [it.modelo, `${it.stock}`, `${it.dias}`, it.demanda,
            it.dias > 50 ? 'Sobre-stock' : it.dias < 20 ? 'Reabastecer' : 'OK'])} />
      </div>
    </>
  );
};

// 6 · Conversión y Retención
export const ConversionRetencionDetalle: React.FC = () => {
  const maxF = conversionFunnel[0].n;
  const tasaConv = ((conversionFunnel[conversionFunnel.length - 1].n / conversionFunnel[0].n) * 100).toFixed(1);
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px', marginBottom: '18px' }}>
        <StatTile label="Conversión total" value={`${tasaConv}%`} delta="lead→venta" deltaUp />
        <StatTile label="Aprob. crédito" value="76%" delta="6%" deltaUp />
        <StatTile label="Recompra potencial" value="240" delta="alta" deltaUp />
        <StatTile label="NPS" value="74" delta="6 pts" deltaUp />
      </div>
      <h4 style={{ fontSize: '12px', color: colores.textoMedio, margin: '0 0 10px' }}>Embudo de conversión (WhatsApp → venta)</h4>
      {conversionFunnel.map(e => (
        <div key={e.etapa} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
          <span style={{ fontSize: '11px', color: colores.textoMedio, width: '110px', flexShrink: 0 }}>{e.etapa}</span>
          <div style={{ flex: 1, height: '16px', borderRadius: '5px', background: colores.fondoTerciario, overflow: 'hidden' }}>
            <div style={{ width: `${(e.n / maxF) * 100}%`, height: '100%', borderRadius: '5px', background: `linear-gradient(90deg, ${colores.primarioOscuro}, ${colores.primario})` }} />
          </div>
          <span style={{ fontSize: '11px', color: colores.textoClaro, fontWeight: 700, width: '54px', textAlign: 'right' }}>{e.n.toLocaleString()}</span>
        </div>
      ))}
      <h4 style={{ fontSize: '12px', color: colores.textoMedio, margin: '18px 0 10px' }}>Retención · tasa de recompra por antigüedad</h4>
      <DataTable cols={['Antigüedad', 'Clientes', 'Recompra %']}
        rows={retencionCohorte.map(r => [r.anio, r.clientes.toLocaleString(), `${r.recompra}%`])} />
    </>
  );
};

// ───────────────────────────────────────────────────────────────────────────────
// Cards (resumen en el grid; clic abre el mismo detalle en modal)
// ───────────────────────────────────────────────────────────────────────────────

export const VistaCEO: React.FC = () => {
  const totalVentas = agencias.reduce((s, a) => s + a.ventas, 0);
  const totalMeta = agencias.reduce((s, a) => s + a.meta, 0);
  const conv = (agencias.reduce((s, a) => s + a.conv, 0) / agencias.length).toFixed(1);
  const maxV = Math.max(...agencias.map(a => a.ventas));
  const top = [...agencias].sort((a, b) => b.ventas - a.ventas);
  return (
    <Card icon={Crown} title="Vista CEO" subtitle="13 agencias · consolidado" badge={<Pill text="EN VIVO" color={colores.exito} />} cta="Ver tablero ejecutivo" detalle={<VistaCEODetalle />}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '12px' }}>
        <StatTile label="Ventas" value={`${totalVentas}`} delta="8.4%" deltaUp />
        <StatTile label="Meta" value={`${Math.round((totalVentas / totalMeta) * 100)}%`} deltaUp delta="obj." />
        <StatTile label="Conv." value={`${conv}%`} delta="1.2" deltaUp />
      </div>
      <p style={{ fontSize: '11px', color: colores.textoMedio, margin: '0 0 6px' }}>Top agencias</p>
      {top.slice(0, 4).map(a => <BarRow key={a.nombre} label={a.nombre} value={a.ventas} max={maxV}
        color={a.estado === 'verde' ? colores.exito : a.estado === 'amarillo' ? colores.advertencia : colores.peligro} right={`${a.ventas}`} />)}
    </Card>
  );
};

export const LeadScoring: React.FC = () => {
  const dist = { alta: scoring.filter(s => s.intencion === 'alta').length, media: scoring.filter(s => s.intencion === 'media').length, baja: scoring.filter(s => s.intencion === 'baja').length };
  return (
    <Card icon={Target} title="Lead Scoring IA" subtitle="Intención de compra" badge={<Pill text="IA" />} cta="Ver factores de scoring" detalle={<LeadScoringDetalle />}>
      <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
        <StatTile label="Alta" value={`${dist.alta}`} />
        <StatTile label="Media" value={`${dist.media}`} />
        <StatTile label="Baja" value={`${dist.baja}`} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', minHeight: 0 }}>
        {scoring.slice(0, 4).map(s => {
          const col = s.score >= 80 ? colores.exito : s.score >= 50 ? colores.advertencia : colores.peligro;
          return (
            <div key={s.nombre} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `conic-gradient(${col} ${s.score * 3.6}deg, ${colores.fondoTerciario} 0deg)` }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: colores.fondoSecundario, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, color: col }}>{s.score}</div>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '12px', fontWeight: 700, color: colores.textoClaro, margin: 0 }}>{s.nombre}</p>
                <p style={{ fontSize: '10px', color: colores.textoMedio, margin: 0 }}>{s.modelo} · intención {s.intencion}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export const Campanias: React.FC = () => (
  <Card icon={Megaphone} title="Campañas" subtitle="Inversión, ROI y atribución" cta="Ver desglose completo" detalle={<CampaniasDetalle />}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto', minHeight: 0 }}>
      {campanias.map(c => (
        <div key={c.nombre} style={{ padding: '8px 10px', background: colores.fondoTerciario, borderRadius: '10px', border: `1px solid ${colores.borde}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: colores.textoClaro }}>{c.nombre}</span>
            <Pill text={c.estado} color={c.estado === 'Activa' ? colores.exito : c.estado === 'Programada' ? colores.advertencia : colores.textoMedio} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: colores.textoMedio }}>
            <span>Inv. ${c.inv}K</span><span>{c.ventas} ventas</span><span style={{ color: colores.exito, fontWeight: 700 }}>ROI ×{c.roi}</span>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

export const Vendedores: React.FC = () => {
  const maxV = Math.max(...vendedores.map(v => v.ventas));
  return (
    <Card icon={Users} title="Vendedores" subtitle="Ranking y eficiencia" cta="Ver eficiencia por etapa" detalle={<VendedoresDetalle />}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto', minHeight: 0 }}>
        {vendedores.map((v, i) => (
          <div key={v.nombre} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: i === 0 ? colores.primario : colores.textoMedio, width: '18px' }}>{i + 1}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <BarRow label={v.nombre} value={v.ventas} max={maxV} right={`${v.efic}%`} />
            </div>
            {v.seguimientos > 0 && <Pill text={`${v.seguimientos}`} color={v.seguimientos > 4 ? colores.peligro : colores.advertencia} />}
          </div>
        ))}
      </div>
    </Card>
  );
};

export const InventarioInteligente: React.FC = () => (
  <Card icon={Package} title="Inventario Inteligente" subtitle="Stock · días en lote · demanda" cta="Ver rotación y alertas" detalle={<InventarioDetalle />}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto', minHeight: 0 }}>
      {inventario.map(it => {
        const col = it.demanda === 'alta' ? colores.exito : it.demanda === 'media' ? colores.advertencia : colores.peligro;
        return (
          <div key={it.modelo} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', background: colores.fondoTerciario, borderRadius: '10px', border: `1px solid ${colores.borde}` }}>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: colores.textoClaro, margin: 0 }}>{it.modelo}</p>
              <p style={{ fontSize: '10px', color: colores.textoMedio, margin: 0 }}>{it.stock} u. · {it.dias} días en lote</p>
            </div>
            <Pill text={`demanda ${it.demanda}`} color={col} />
          </div>
        );
      })}
    </div>
  </Card>
);

export const ConversionRetencion: React.FC = () => {
  const maxF = conversionFunnel[0].n;
  const tasaConv = ((conversionFunnel[conversionFunnel.length - 1].n / conversionFunnel[0].n) * 100).toFixed(1);
  return (
    <Card icon={Repeat} title="Conversión y Retención" subtitle="Embudo IA + recompra" badge={<Pill text="ESPECIAL" color={colores.primario} />} cta="Ver embudo y cohortes" detalle={<ConversionRetencionDetalle />}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '8px', marginBottom: '10px' }}>
        <StatTile label="Conversión total" value={`${tasaConv}%`} delta="lead→venta" deltaUp />
        <StatTile label="Recompra pot." value="240" delta="alta" deltaUp />
      </div>
      <p style={{ fontSize: '11px', color: colores.textoMedio, margin: '0 0 6px' }}>Embudo de conversión</p>
      {conversionFunnel.map(e => (
        <div key={e.etapa} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span style={{ fontSize: '10px', color: colores.textoMedio, width: '92px', flexShrink: 0 }}>{e.etapa}</span>
          <div style={{ flex: 1, height: '12px', borderRadius: '4px', background: colores.fondoTerciario, overflow: 'hidden' }}>
            <div style={{ width: `${(e.n / maxF) * 100}%`, height: '100%', borderRadius: '4px', background: `linear-gradient(90deg, ${colores.primarioOscuro}, ${colores.primario})` }} />
          </div>
          <span style={{ fontSize: '10px', color: colores.textoMedio, fontWeight: 700, width: '40px', textAlign: 'right' }}>{e.n >= 1000 ? `${(e.n / 1000).toFixed(1)}K` : e.n}</span>
        </div>
      ))}
      <div style={{ marginTop: '8px' }}>
        <ProgressBar pct={76} color={colores.exito} label="Aprobación de crédito" right="76%" />
      </div>
      <div style={{ marginTop: '8px' }}>
        <MiniBars data={retencionCohorte.map(r => r.recompra)} color={colores.primario} height={34} />
        <p style={{ fontSize: '10px', color: colores.textoMedio, margin: '4px 0 0', textAlign: 'center' }}>Recompra ↑ por antigüedad</p>
      </div>
    </Card>
  );
};
