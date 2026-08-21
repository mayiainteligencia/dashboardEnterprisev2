import React, { useState } from 'react';
import {
  Building2,
  Search,
  Filter,
  ExternalLink,
  Folder,
  Phone,
  Globe,
  MapPin,
  User,
  DollarSign,
  Briefcase,
  FileText,
  Landmark,
  Plus,
  ArrowUpRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { brandingConfig } from '../../../config/branding';
import { CLIENTES_FSPM } from '../../../fspm/fspmData';
import type { ClienteFSPM } from '../../../fspm/fspmData';

export const ClientesModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [busqueda, setBusqueda] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [clienteSeleccionado, setClienteSeleccionado] = useState<ClienteFSPM>(CLIENTES_FSPM[0]);

  const clientesFiltrados = CLIENTES_FSPM.filter((c) => {
    const coincideTexto =
      c.nombreComercial.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.ejecutivo.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.sector.toLowerCase().includes(busqueda.toLowerCase());
    const coincideTipo = filtroTipo === 'todos' || c.tipo === filtroTipo;
    return coincideTexto && coincideTipo;
  });

  // Datos para gráficas
  const dataPipelinePorCliente = CLIENTES_FSPM.map(c => ({
    nombre: c.nombreComercial.split('—')[0].trim(),
    pipeline: c.pipelineTotal / 1000000,
    color: '#0F172A'
  }));

  const tiposClientes = [
    'todos',
    'Gobierno Federal',
    'Gobierno Estatal',
    'Municipio',
    'Empresa privada',
    'Distribuidor',
    'Integrador',
    'Industria'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* ── HEADER DEL MÓDULO ── */}
      <div
        className="animate-fade-down fspm-card"
        style={{
          backgroundColor: colores.fondoPrincipal,
          borderRadius: '20px',
          padding: '24px 28px',
          border: `1px solid ${colores.borde}`,
          boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              backgroundColor: '#0F172A',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Building2 size={26} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: colores.textoClaro }}>
              Módulo Clientes &amp; Dependencias
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: colores.textoMedio }}>
              Fichas corporativas, dependencias de gobierno, sector privado e integración con Google Drive
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: colores.fondoTerciario,
              padding: '8px 14px',
              borderRadius: '10px',
              border: `1px solid ${colores.borde}`,
            }}
          >
            <Search size={16} color={colores.textoMedio} />
            <input
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por cliente, sector o ejecutivo…"
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '13px',
                color: colores.textoClaro,
                width: '220px',
              }}
            />
          </div>

          <button
            style={{
              padding: '10px 16px',
              borderRadius: '10px',
              backgroundColor: colores.primario,
              color: '#FFFFFF',
              border: 'none',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Plus size={16} /> Nuevo Cliente
          </button>
        </div>
      </div>

      {/* ── GRÁFICAS DE CLIENTES ── */}
      <div className="animate-fade-up delay-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '20px' }}>
        {/* Gráfica 1: Pipeline por Cliente */}
        <div
          className="fspm-card"
          style={{
            backgroundColor: colores.fondoPrincipal,
            borderRadius: '18px',
            padding: '20px',
            border: `1px solid ${colores.borde}`,
          }}
        >
          <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '800', color: colores.textoClaro }}>
            Pipeline Activo por Cliente ($ Millones)
          </h3>
          <p style={{ margin: '0 0 14px 0', fontSize: '12px', color: colores.textoMedio }}>
            Concentración de oportunidades comerciales y licitaciones
          </p>
          <div style={{ height: '200px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataPipelinePorCliente} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="nombre" stroke="#475569" fontSize={11} fontWeight={600} />
                <YAxis stroke="#94A3B8" fontSize={11} tickFormatter={(v) => `$${v}M`} />
                <Tooltip
                  formatter={(val: any) => [`$${val} M`, 'Pipeline']}
                  contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '8px', border: 'none', fontSize: '12px' }}
                />
                <Bar dataKey="pipeline" fill="#D32F2F" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Resumen de cartera */}
        <div
          style={{
            backgroundColor: colores.fondoPrincipal,
            borderRadius: '18px',
            padding: '20px',
            border: `1px solid ${colores.borde}`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '800', color: colores.textoClaro }}>
              Filtro por Tipo de Entidad
            </h3>
            <p style={{ margin: '0 0 14px 0', fontSize: '12px', color: colores.textoMedio }}>
              Segmentación institucional según manual de operaciones FSPM
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {tiposClientes.map((tipo, idx) => (
                <button
                  key={idx}
                  onClick={() => setFiltroTipo(tipo)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: filtroTipo === tipo ? '800' : '600',
                    border: `1px solid ${filtroTipo === tipo ? colores.primario : colores.borde}`,
                    backgroundColor: filtroTipo === tipo ? '#FEE2E2' : colores.fondoTerciario,
                    color: filtroTipo === tipo ? colores.primario : colores.textoMedio,
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}
                >
                  {tipo}
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              padding: '14px',
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              border: `1px solid ${colores.borde}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '11px', color: colores.textoMedio, fontWeight: '700' }}>TOTAL CLIENTES ACTIVOS</div>
              <div style={{ fontSize: '18px', fontWeight: '900', color: colores.textoClaro }}>{CLIENTES_FSPM.length} Instituciones Registradas</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: colores.textoMedio, fontWeight: '700' }}>VALOR TOTAL CARTERA</div>
              <div style={{ fontSize: '18px', fontWeight: '900', color: '#10B981' }}>$24.80 M</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CUERPO PRINCIPAL: LISTADO + FICHA DETALLADA ── */}
      <div className="animate-fade-up delay-2" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '20px', alignItems: 'start' }}>
        
        {/* LISTA DE CLIENTES */}
        <div
          className="fspm-card"
          style={{
            backgroundColor: colores.fondoPrincipal,
            borderRadius: '18px',
            border: `1px solid ${colores.borde}`,
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${colores.borde}`, backgroundColor: colores.fondoSecundario }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: colores.textoClaro }}>
              Directorio de Empresas &amp; Dependencias ({clientesFiltrados.length})
            </h3>
          </div>

          <div style={{ maxHeight: '560px', overflowY: 'auto' }}>
            {clientesFiltrados.map((c) => {
              const isSelected = clienteSeleccionado.id === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setClienteSeleccionado(c)}
                  style={{
                    padding: '16px 20px',
                    borderBottom: `1px solid ${colores.borde}`,
                    backgroundColor: isSelected ? '#FEE2E230' : 'transparent',
                    borderLeft: isSelected ? `4px solid ${colores.primario}` : '4px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '800', color: colores.textoClaro }}>
                        {c.nombreComercial}
                      </div>
                      <div style={{ fontSize: '12px', color: colores.textoMedio, marginTop: '2px' }}>
                        {c.sector} · <span style={{ fontWeight: '600' }}>{c.tipo}</span>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontWeight: '700',
                        backgroundColor: c.estado === 'Cliente activo' ? '#D1FAE5' : '#FEF3C7',
                        color: c.estado === 'Cliente activo' ? '#059669' : '#D97706',
                      }}
                    >
                      {c.estado}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', fontSize: '12px' }}>
                    <span style={{ color: colores.textoMedio }}>
                      Ejecutivo: <strong>{c.ejecutivo}</strong>
                    </span>
                    <span style={{ fontWeight: '800', color: '#059669' }}>
                      ${(c.pipelineTotal / 1000000).toFixed(2)} M
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FICHA TÉCNICA ÚNICA DEL CLIENTE (SEGÚN ESPECIFICACIÓN FSPM) */}
        {clienteSeleccionado && (
          <div
            style={{
              backgroundColor: colores.fondoPrincipal,
              borderRadius: '18px',
              border: `1px solid ${colores.borde}`,
              padding: '24px',
              boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
              position: 'sticky',
              top: '20px',
            }}
          >
            {/* Header de la Ficha */}
            <div style={{ borderBottom: `1px solid ${colores.borde}`, paddingBottom: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: '800', color: colores.primario, textTransform: 'uppercase' }}>
                    FICHA ÚNICA DE CLIENTE · FSPM
                  </span>
                  <h2 style={{ margin: '4px 0 0 0', fontSize: '18px', fontWeight: '800', color: colores.textoClaro }}>
                    {clienteSeleccionado.nombreComercial}
                  </h2>
                  <div style={{ fontSize: '12px', color: colores.textoMedio, marginTop: '2px' }}>
                    RFC: <strong>{clienteSeleccionado.rfc}</strong> · {clienteSeleccionado.razonSocial}
                  </div>
                </div>

                <a
                  href={`https://drive.google.com/drive/search?q=${encodeURIComponent(clienteSeleccionado.driveFolder)}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    padding: '8px 14px',
                    borderRadius: '10px',
                    backgroundColor: '#0F172A',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    fontSize: '12px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Folder size={15} /> 📁 Carpeta Drive
                </a>
              </div>
            </div>

            {/* Grid de Campos Clave */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '18px' }}>
              <div style={{ padding: '10px 12px', backgroundColor: colores.fondoTerciario, borderRadius: '10px' }}>
                <span style={{ fontSize: '11px', color: colores.textoMedio, fontWeight: '700' }}>TIPO DE CLIENTE</span>
                <div style={{ fontSize: '13px', fontWeight: '700', color: colores.textoClaro, marginTop: '2px' }}>
                  {clienteSeleccionado.tipo}
                </div>
              </div>

              <div style={{ padding: '10px 12px', backgroundColor: colores.fondoTerciario, borderRadius: '10px' }}>
                <span style={{ fontSize: '11px', color: colores.textoMedio, fontWeight: '700' }}>SECTOR INDUSTRIAL</span>
                <div style={{ fontSize: '13px', fontWeight: '700', color: colores.textoClaro, marginTop: '2px' }}>
                  {clienteSeleccionado.sector}
                </div>
              </div>

              <div style={{ padding: '10px 12px', backgroundColor: colores.fondoTerciario, borderRadius: '10px' }}>
                <span style={{ fontSize: '11px', color: colores.textoMedio, fontWeight: '700' }}>EJECUTIVO RESPONSABLE</span>
                <div style={{ fontSize: '13px', fontWeight: '700', color: colores.primario, marginTop: '2px' }}>
                  {clienteSeleccionado.ejecutivo}
                </div>
              </div>

              <div style={{ padding: '10px 12px', backgroundColor: colores.fondoTerciario, borderRadius: '10px' }}>
                <span style={{ fontSize: '11px', color: colores.textoMedio, fontWeight: '700' }}>ÚLTIMA OPERACIÓN</span>
                <div style={{ fontSize: '13px', fontWeight: '700', color: colores.textoClaro, marginTop: '2px' }}>
                  {clienteSeleccionado.ultimaOperacion}
                </div>
              </div>
            </div>

            {/* Indicadores Cuantitativos del Cliente */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '10px',
                padding: '14px',
                backgroundColor: '#F8FAFC',
                borderRadius: '12px',
                border: `1px solid ${colores.borde}`,
                marginBottom: '18px',
                textAlign: 'center',
              }}
            >
              <div>
                <span style={{ fontSize: '10.5px', color: colores.textoMedio, fontWeight: '700' }}>OPORTUNIDADES</span>
                <div style={{ fontSize: '16px', fontWeight: '900', color: colores.textoClaro }}>
                  {clienteSeleccionado.oportunidadesAbiertas}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '10.5px', color: colores.textoMedio, fontWeight: '700' }}>CONTACTOS</span>
                <div style={{ fontSize: '16px', fontWeight: '900', color: colores.textoClaro }}>
                  {clienteSeleccionado.contactos}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '10.5px', color: colores.textoMedio, fontWeight: '700' }}>COTIZACIONES</span>
                <div style={{ fontSize: '16px', fontWeight: '900', color: colores.textoClaro }}>
                  {clienteSeleccionado.cotizaciones}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '10.5px', color: colores.textoMedio, fontWeight: '700' }}>LICITACIONES</span>
                <div style={{ fontSize: '16px', fontWeight: '900', color: colores.textoClaro }}>
                  {clienteSeleccionado.licitaciones}
                </div>
              </div>
            </div>

            {/* Datos de Contacto y Ubicación */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: colores.textoMedio, marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={15} color={colores.primario} />
                <span>{clienteSeleccionado.direccion}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={15} color={colores.primario} />
                <span>{clienteSeleccionado.telefono}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Globe size={15} color={colores.primario} />
                <span>{clienteSeleccionado.sitioWeb}</span>
              </div>
            </div>

            {/* Observaciones */}
            <div style={{ padding: '12px', backgroundColor: '#FEF3C750', borderRadius: '10px', border: '1px solid #FCD34D', fontSize: '12px', color: '#92400E' }}>
              <strong>Observaciones Comerciales:</strong> {clienteSeleccionado.observaciones}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
