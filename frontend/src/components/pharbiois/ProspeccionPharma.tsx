import React, { useState } from 'react';
import {
  Users, Building2, TrendingUp, Target, Phone,
  Mail, Globe, ChevronRight, Plus, Search, Star,
  BarChart3, Clock, CheckCircle, Zap, MapPin,
  FlaskConical, Microscope, Award, ArrowRight, Sparkles, RefreshCw,
} from 'lucide-react';

const leads = [
  { id: 'L001', empresa: 'Laboratorios Mérida S.A.', contacto: 'Dr. Héctor Garza', cargo: 'Dir. I+D', sector: 'Pharma', servicioInteres: 'Drug Discovery Pipeline', score: 92, monto: 420000, etapa: 'Negociación', prioridad: 'Alta', pais: 'México', telefono: '+52 993 123 4567', email: 'hgarza@labmerida.mx', empleados: 850, proyectos: 4, ultimaActividad: 'Hoy, 10:30' },
  { id: 'L002', empresa: 'Biotech Innovations MX', contacto: 'Dra. Carmen Ríos', cargo: 'CEO', sector: 'Biotech', servicioInteres: 'ADMET + Regulatory', score: 87, monto: 280000, etapa: 'Propuesta', prioridad: 'Alta', pais: 'México', telefono: '+52 55 9876 5432', email: 'crios@biotechmx.com', empleados: 120, proyectos: 2, ultimaActividad: 'Ayer' },
  { id: 'L003', empresa: 'Cosméticos Naturalia', contacto: 'Ing. Sofía Medina', cargo: 'Directora Técnica', sector: 'Cosmética', servicioInteres: 'Toxicoinformática', score: 74, monto: 95000, etapa: 'Calificación', prioridad: 'Media', pais: 'México', telefono: '+52 81 8765 1234', email: 'smedina@naturalia.mx', empleados: 200, proyectos: 1, ultimaActividad: '22 Jun' },
  { id: 'L004', empresa: 'Farma del Norte S.A.B.', contacto: 'Dr. Roberto Campos', cargo: 'VP Regulatory Affairs', sector: 'Pharma', servicioInteres: 'Regulatory Intelligence', score: 81, monto: 150000, etapa: 'Propuesta', prioridad: 'Alta', pais: 'México', telefono: '+52 81 4567 8901', email: 'rcampos@farmanorte.mx', empleados: 2400, proyectos: 6, ultimaActividad: '20 Jun' },
  { id: 'L005', empresa: 'AgroQuim Innovar', contacto: 'Dr. Andrés Pérez', cargo: 'Jefe de Ciencias', sector: 'Agroquímico', servicioInteres: 'Drug Discovery + ADMET', score: 68, monto: 210000, etapa: 'Contacto inicial', prioridad: 'Media', pais: 'México', telefono: '+52 33 2345 6789', email: 'aperez@agroquim.mx', empleados: 340, proyectos: 3, ultimaActividad: '15 Jun' },
  { id: 'L006', empresa: 'UNAM — Lab de Quimioinf.', contacto: 'Dra. María Soto', cargo: 'Investigadora Titular', sector: 'Universidad', servicioInteres: 'Academia + Software', score: 61, monto: 45000, etapa: 'Contacto inicial', prioridad: 'Baja', pais: 'México', telefono: '+52 55 5622 7800', email: 'msoto@quimio.unam.mx', empleados: 50, proyectos: 2, ultimaActividad: '10 Jun' },
  { id: 'L007', empresa: 'Nutraciencias S.A.', contacto: 'M.C. Patricia Fuentes', cargo: 'Directora de Calidad', sector: 'Nutraceútico', servicioInteres: 'Toxicoinformática', score: 76, monto: 88000, etapa: 'Calificación', prioridad: 'Media', pais: 'México', telefono: '+52 33 6789 0123', email: 'pfuentes@nutraciencias.mx', empleados: 180, proyectos: 1, ultimaActividad: '18 Jun' },
];

const etapas = ['Contacto inicial', 'Calificación', 'Propuesta', 'Negociación', 'Cierre', 'Ganado'];
const sectores = ['Todos', 'Pharma', 'Biotech', 'Cosmética', 'Agroquímico', 'Universidad', 'Nutraceútico'];

const etapaColor: Record<string, { bg: string; color: string; border: string }> = {
  'Contacto inicial': { bg: 'rgba(100,116,139,0.15)', color: '#94A3B8', border: 'rgba(100,116,139,0.3)' },
  'Calificación':     { bg: 'rgba(14,165,233,0.15)', color: '#38BDF8', border: 'rgba(14,165,233,0.3)' },
  'Propuesta':        { bg: 'rgba(245,158,11,0.15)', color: '#FCD34D', border: 'rgba(245,158,11,0.3)' },
  'Negociación':      { bg: 'rgba(249,115,22,0.15)', color: '#FDBA74', border: 'rgba(249,115,22,0.3)' },
  'Cierre':           { bg: 'rgba(124,58,237,0.15)', color: '#A78BFA', border: 'rgba(124,58,237,0.3)' },
  'Ganado':           { bg: 'rgba(16,185,129,0.15)', color: '#6EE7B7', border: 'rgba(16,185,129,0.3)' },
};

const sectorIcon: Record<string, React.ElementType> = {
  'Pharma': FlaskConical,
  'Biotech': Microscope,
  'Cosmética': Star,
  'Agroquímico': Globe,
  'Universidad': Award,
  'Nutraceútico': Target,
};

export const ProspeccionPharma: React.FC = () => {
  const [busqueda, setBusqueda] = useState('');
  const [sectorFiltro, setSectorFiltro] = useState('Todos');
  const [leadSeleccionado, setLeadSeleccionado] = useState<typeof leads[0] | null>(leads[0]);
  const [tab, setTab] = useState<'lista' | 'kanban' | 'analitica'>('lista');

  // States interactivos
  const [listaLeads, setListaLeads] = useState(leads);
  const [toast, setToast] = useState<string | null>(null);
  const [propuestaId, setPropuestaId] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const agregarLead = () => {
    const id = `L-${Math.floor(Math.random() * 900) + 100}`;
    const nuevoL = {
      id,
      empresa: 'Genómica Molecular S.A.',
      contacto: 'Dr. Alejandro Rivas',
      cargo: 'Dir. Innovación',
      sector: 'Biotech',
      servicioInteres: 'Drug Discovery Pipeline',
      score: Math.floor(Math.random() * 30) + 70,
      monto: 350000,
      etapa: 'Contacto inicial',
      prioridad: 'Alta',
      pais: 'México',
      telefono: '+52 55 1122 3344',
      email: 'arivas@genomica.mx',
      empleados: 150,
      proyectos: 1,
      ultimaActividad: 'Justo ahora'
    };
    setListaLeads(prev => [nuevoL, ...prev]);
    setLeadSeleccionado(nuevoL);
    showToast(`¡Nuevo Lead "${nuevoL.empresa}" agregado con éxito!`);
  };

  const generarPropuestaIA = (lead: typeof leads[0]) => {
    setPropuestaId(lead.id);
    showToast(`MAYIA B2B está redactando propuesta de Drug Discovery para ${lead.empresa}…`);
    setTimeout(() => {
      showToast(`¡Propuesta de $${lead.monto.toLocaleString()} MXN para ${lead.empresa} completada y enviada a ${lead.email}!`);
      setListaLeads(prev => prev.map(item => item.id === lead.id ? { ...item, etapa: 'Propuesta', ultimaActividad: 'Propuesta enviada por IA' } : item));
      setLeadSeleccionado(prevSel => prevSel?.id === lead.id ? { ...prevSel, etapa: 'Propuesta', ultimaActividad: 'Propuesta enviada por IA' } : prevSel);
      setPropuestaId(null);
    }, 2000);
  };

  const avanzarEtapa = (leadId: string) => {
    const etapasOrden = ['Contacto inicial', 'Calificación', 'Propuesta', 'Negociación', 'Cierre', 'Ganado'];
    setListaLeads(prev => prev.map(item => {
      if (item.id === leadId) {
        const idx = etapasOrden.indexOf(item.etapa);
        const sigEtapa = idx < etapasOrden.length - 1 ? etapasOrden[idx + 1] : etapasOrden[idx];
        showToast(`Lead "${item.empresa}" avanzado a etapa: ${sigEtapa}`);
        const actualizado = { ...item, etapa: sigEtapa, ultimaActividad: `Avanzado a ${sigEtapa}` };
        if (leadSeleccionado?.id === leadId) {
          setLeadSeleccionado(actualizado);
        }
        return actualizado;
      }
      return item;
    }));
  };

  const leadsFiltrados = listaLeads.filter(l => {
    const matchSearch = l.empresa.toLowerCase().includes(busqueda.toLowerCase()) ||
      l.contacto.toLowerCase().includes(busqueda.toLowerCase()) ||
      l.servicioInteres.toLowerCase().includes(busqueda.toLowerCase());
    const matchSector = sectorFiltro === 'Todos' || l.sector === sectorFiltro;
    return matchSearch && matchSector;
  });

  const montoTotal = listaLeads.reduce((s, l) => s + l.monto, 0);
  const leadsAlta = listaLeads.filter(l => l.prioridad === 'Alta').length;
  const enNegociacion = listaLeads.filter(l => l.etapa === 'Negociación' || l.etapa === 'Propuesta').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1400px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '13px', background: 'linear-gradient(135deg, #10B981, #14B8A6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(16,185,129,0.3)' }}>
            <Users size={20} color="#fff" />
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', margin: 0 }}>Prospección Pharma/Biotech</h2>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>AI Drug Discovery as a Service · Pipeline comercial B2B</p>
          </div>
        </div>
        <button className="btn-primary" onClick={agregarLead}><Plus size={14}/> Nuevo Lead</button>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
        {[
          { label: 'Leads activos', val: leads.length.toString(), color: '#10B981', sub: `${leadsAlta} alta prioridad`, icon: Users },
          { label: 'En negociación', val: enNegociacion.toString(), color: '#F59E0B', sub: 'Propuesta o negociación', icon: Target },
          { label: 'Potencial pipeline', val: `$${(montoTotal / 1000).toFixed(0)}K`, color: '#0EA5E9', sub: 'MXN total estimado', icon: TrendingUp },
          { label: 'Tasa conversión', val: '29%', color: '#7C3AED', sub: 'Contacto → Cierre', icon: BarChart3 },
        ].map(k => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="metric-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${k.color}22`, border: `1px solid ${k.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={18} color={k.color} />
                </div>
              </div>
              <div style={{ fontSize: '26px', fontWeight: '800', color: k.color, fontFamily: 'Outfit, sans-serif', lineHeight: 1 }}>{k.val}</div>
              <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginTop: '4px' }}>{k.label}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{k.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', background: '#F1F5F9', borderRadius: '12px', padding: '4px', width: 'fit-content' }}>
        {([['lista', 'Lista de Leads'], ['kanban', 'Pipeline Kanban'], ['analitica', 'Analítica']] as const).map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{ padding: '8px 18px', borderRadius: '9px', fontSize: '13px', fontWeight: '600', background: tab === id ? 'rgba(16,185,129,0.1)' : 'transparent', border: tab === id ? '1px solid rgba(16,185,129,0.25)' : '1px solid transparent', color: tab === id ? '#10B981' : '#64748B', cursor: 'pointer', transition: 'all 0.2s' }}>{label}</button>
        ))}
      </div>

      {tab === 'lista' && (
        <>
          {/* Filters */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
              <input value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Buscar empresa, contacto o servicio…" style={{ width: '100%', padding: '10px 12px 10px 36px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '13px', outline: 'none' }} />
            </div>
            {sectores.map(s => (
              <button key={s} onClick={() => setSectorFiltro(s)} style={{ padding: '8px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: '600', background: sectorFiltro === s ? 'rgba(16,185,129,0.15)' : '#F1F5F9', border: `1px solid ${sectorFiltro === s ? 'rgba(16,185,129,0.25)' : 'var(--border)'}`, color: sectorFiltro === s ? '#10B981' : '#64748B', cursor: 'pointer', transition: 'all 0.2s' }}>{s}</button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: leadSeleccionado ? '1fr 340px' : '1fr', gap: '20px', alignItems: 'start' }}>
            {/* Table */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '18px', overflow: 'hidden' }}>
              <table className="pharb-table">
                <thead><tr><th>Empresa / Contacto</th><th>Sector</th><th>Servicio de Interés</th><th>Score IA</th><th>Potencial</th><th>Etapa</th><th>Actividad</th><th></th></tr></thead>
                <tbody>
                  {leadsFiltrados.map(lead => {
                    const etapaCfg = etapaColor[lead.etapa];
                    const isSelected = leadSeleccionado?.id === lead.id;
                    const SectorIcon = sectorIcon[lead.sector] || Building2;
                    return (
                      <tr key={lead.id} onClick={() => setLeadSeleccionado(isSelected ? null : lead)} style={{ cursor: 'pointer', background: isSelected ? 'rgba(16,185,129,0.05)' : undefined }}>
                        <td>
                          <div style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '13px' }}>{lead.empresa}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{lead.contacto} · {lead.cargo}</div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <SectorIcon size={13} color="#64748B" />
                            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{lead.sector}</span>
                          </div>
                        </td>
                        <td style={{ fontSize: '12px', color: 'var(--text-secondary)', maxWidth: '160px' }}>{lead.servicioInteres}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: lead.score >= 80 ? 'rgba(16,185,129,0.2)' : lead.score >= 65 ? 'rgba(245,158,11,0.2)' : 'rgba(239,68,68,0.2)', border: `2px solid ${lead.score >= 80 ? '#10B981' : lead.score >= 65 ? '#F59E0B' : '#EF4444'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', color: lead.score >= 80 ? '#10B981' : lead.score >= 65 ? '#F59E0B' : '#EF4444', fontFamily: 'Outfit, sans-serif' }}>{lead.score}</div>
                          </div>
                        </td>
                        <td style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '13px' }}>${(lead.monto / 1000).toFixed(0)}K</td>
                        <td>
                          <span style={{ padding: '3px 10px', borderRadius: '8px', background: etapaCfg.bg, color: etapaCfg.color, fontSize: '11px', fontWeight: '600', border: `1px solid ${etapaCfg.border}` }}>{lead.etapa}</span>
                        </td>
                        <td style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{lead.ultimaActividad}</td>
                        <td><ChevronRight size={14} color={isSelected ? '#10B981' : '#CBD5E1'} /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Detail */}
            {leadSeleccionado && (
              <div style={{ background: 'var(--bg-card)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(16,185,129,0.06)' }}>
                <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', marginBottom: '4px' }}>{leadSeleccionado.empresa}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{leadSeleccionado.contacto} · {leadSeleccionado.cargo}</div>
                </div>
                <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* Score */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(16,185,129,0.08)', borderRadius: '12px', border: '1px solid rgba(16,185,129,0.2)' }}>
                    <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(16,185,129,0.2)', border: '3px solid #10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '900', color: '#10B981', fontFamily: 'Outfit, sans-serif' }}>{leadSeleccionado.score}</div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>Score IA de Oportunidad</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Basado en fit científico y señales de compra</div>
                    </div>
                  </div>
                  {/* Info */}
                  {[
                    { label: 'Sector', val: leadSeleccionado.sector },
                    { label: 'Servicio de interés', val: leadSeleccionado.servicioInteres },
                    { label: 'Monto estimado', val: `$${leadSeleccionado.monto.toLocaleString()} MXN` },
                    { label: 'Etapa actual', val: leadSeleccionado.etapa },
                    { label: 'Empleados', val: leadSeleccionado.empleados.toLocaleString() },
                    { label: 'Proyectos activos', val: `${leadSeleccionado.proyectos} proyectos` },
                    { label: 'Última actividad', val: leadSeleccionado.ultimaActividad },
                  ].map(r => (
                    <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>{r.label}</span>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '500' }}>{r.val}</span>
                    </div>
                  ))}
                  {/* Contact */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <a href={`mailto:${leadSeleccionado.email}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', background: 'rgba(14,165,233,0.05)', border: '1px solid rgba(14,165,233,0.15)', borderRadius: '8px', textDecoration: 'none', color: '#0284C7', fontSize: '12px' }}>
                      <Mail size={13}/> {leadSeleccionado.email}
                    </a>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', background: '#F1F5F9', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-secondary)', fontSize: '12px' }}>
                      <Phone size={13}/> {leadSeleccionado.telefono}
                    </div>
                  </div>
                  <button
                    className="btn-primary"
                    style={{ justifyContent: 'center' }}
                    onClick={() => generarPropuestaIA(leadSeleccionado)}
                    disabled={propuestaId === leadSeleccionado.id}
                  >
                    {propuestaId === leadSeleccionado.id ? <RefreshCw size={13} style={{ animation: 'spin 1s linear infinite' }}/> : <Zap size={13}/>}
                    {propuestaId === leadSeleccionado.id ? ' Generando propuesta…' : ' Generar propuesta con IA'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {tab === 'kanban' && (
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
          {etapas.map(etapa => {
            const leadsEtapa = listaLeads.filter(l => l.etapa === etapa);
            const cfg = etapaColor[etapa];
            return (
              <div key={etapa} style={{ minWidth: '220px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '14px', overflow: 'hidden', flexShrink: 0 }}>
                <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)', background: cfg.bg }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: cfg.color }}>{etapa}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{leadsEtapa.length} leads · ${leadsEtapa.reduce((s, l) => s + l.monto, 0).toLocaleString()}</div>
                </div>
                <div style={{ padding: '10px' }}>
                  {leadsEtapa.map(l => (
                    <div key={l.id} onClick={() => setLeadSeleccionado(l)} style={{ padding: '10px', background: '#F8FAFC', border: '1px solid var(--border)', borderRadius: '10px', marginBottom: '8px', cursor: 'pointer' }}>
                      <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '3px' }}>{l.empresa}</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '6px' }}>{l.servicioInteres}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', fontWeight: '700', color: '#10B981' }}>${(l.monto / 1000).toFixed(0)}K</span>
                        <button
                          onClick={(e) => { e.stopPropagation(); avanzarEtapa(l.id); }}
                          style={{ padding: '2px 6px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '6px', fontSize: '9px', fontWeight: '700', color: '#10B981', cursor: 'pointer' }}
                        >
                          Avanzar →
                        </button>
                      </div>
                    </div>
                  ))}
                  {leadsEtapa.length === 0 && (
                    <div style={{ padding: '16px', textAlign: 'center', color: '#334155', fontSize: '12px' }}>Sin leads</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'analitica' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', alignItems: 'start' }}>
          
          {/* Lado izquierdo: KPIs Comerciales */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {[
              { label: 'Sector con mayor potencial', val: 'Pharma', sub: '$570K MXN en pipeline', color: '#0EA5E9' },
              { label: 'Lead mejor puntuado', val: 'Lab. Mérida', sub: 'Score 92 · Negociación', color: '#10B981' },
              { label: 'Tiempo promedio ciclo', val: '42 días', sub: 'Contacto → Cierre', color: '#7C3AED' },
              { label: 'Servicio más solicitado', val: 'ADMET/Tox', sub: '5 de 7 leads lo mencionan', color: '#F59E0B' },
              { label: 'Pipeline total', val: `$${(montoTotal / 1000).toFixed(0)}K MXN`, sub: 'Oportunidad total activa', color: '#14B8A6' },
              { label: 'Leads alta prioridad', val: leadsAlta.toString(), sub: 'Requieren acción esta semana', color: '#EF4444' },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>{s.label}</div>
                <div style={{ fontSize: '22px', fontWeight: '800', color: s.color, fontFamily: 'Outfit, sans-serif' }}>{s.val}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Lado derecho: Embudo de Ventas (Sales Funnel) SVG */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>Embudo de Conversión (Funnel)</div>
            
            {(() => {
              // Calcular datos del funnel de forma dinámica
              const lContacto = listaLeads.filter(l => l.etapa === 'Contacto inicial' || l.etapa === 'Calificación');
              const lPropuesta = listaLeads.filter(l => l.etapa === 'Propuesta');
              const lNegociacion = listaLeads.filter(l => l.etapa === 'Negociación' || l.etapa === 'Cierre');
              const lGanado = listaLeads.filter(l => l.etapa === 'Ganado');

              const fData = [
                { stage: 'Contacto / Calif.', count: lContacto.length, val: lContacto.reduce((s,x)=>s+x.monto,0), pts: '10,10 190,10 170,35 30,35', col: '#0EA5E9' },
                { stage: 'Propuesta', count: lPropuesta.length, val: lPropuesta.reduce((s,x)=>s+x.monto,0), pts: '32,38 168,38 150,63 50,63', col: '#F59E0B' },
                { stage: 'Negociación', count: lNegociacion.length, val: lNegociacion.reduce((s,x)=>s+x.monto,0), pts: '52,66 148,66 130,91 70,91', col: '#7C3AED' },
                { stage: 'Ganado', count: lGanado.length, val: lGanado.reduce((s,x)=>s+x.monto,0), pts: '72,94 128,94 110,119 90,119', col: '#10B981' }
              ];

              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
                  <svg width="100%" height="150" viewBox="0 0 200 130" style={{ overflow: 'visible' }}>
                    {fData.map((f, idx) => (
                      <g key={idx}>
                        {/* Trapecio del Funnel */}
                        <polygon points={f.pts} fill={f.col} opacity="0.85" stroke="#FFF" strokeWidth="1" />
                        
                        {/* Texto sobre el trapecio (sólo si hay espacio/leads) */}
                        <text x="100" y={22 + idx * 28} fill="white" fontSize="6.5" fontWeight="bold" textAnchor="middle">
                          {f.stage} ({f.count} leads)
                        </text>

                        {/* Valor monetario a la derecha */}
                        <text x="195" y={22 + idx * 28} fill="var(--text-primary)" fontSize="6.5" fontWeight="700" textAnchor="start">
                          ${(f.val / 1000).toFixed(0)}K
                        </text>
                      </g>
                    ))}
                  </svg>
                  <div style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: '600', borderTop: '1px solid var(--border)', paddingTop: '10px', width: '100%', textAlign: 'center' }}>
                    Valor Total del Embudo: <span style={{ color: '#10B981', fontWeight: '800' }}>${(montoTotal / 1000).toFixed(0)}K MXN</span>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
      
      {toast && (
        <div style={{
          position: 'fixed', bottom: '20px', right: '20px',
          background: '#0F172A', color: '#fff',
          padding: '12px 20px', borderRadius: '10px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          display: 'flex', alignItems: 'center', gap: '8px',
          zIndex: 9999, fontSize: '13px', fontWeight: '600',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <Sparkles size={16} color="#10B981" style={{ animation: 'pulse 1s infinite' }} />
          {toast}
        </div>
      )}
    </div>
  );
};
