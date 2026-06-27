import React, { useState } from 'react';
import { Map, MapPin, TrendingUp, AlertTriangle, Search, Filter, Layers } from 'lucide-react';

interface Distributor {
  id: string;
  nombre: string;
  zona: string;
  ventasMensuales: number;
  frecuenciaCompra: string;
  coberturaCatalogo: number; // percentage of SKUs purchased
  estatus: 'Normal' | 'Crítico' | 'Sobreasignado';
}

const initialDistributors: Distributor[] = [
  { id: '1', nombre: 'Distribuidora Servipan CDMX', zona: 'Centro', ventasMensuales: 1250000, frecuenciaCompra: 'Semanal', coberturaCatalogo: 95, estatus: 'Normal' },
  { id: '2', nombre: 'Comercializadora Panadera de Occidente', zona: 'Occidente', ventasMensuales: 850000, frecuenciaCompra: 'Quincenal', coberturaCatalogo: 78, estatus: 'Normal' },
  { id: '3', nombre: 'Proveedora de Insumos del Norte', zona: 'Norte', ventasMensuales: 980000, frecuenciaCompra: 'Semanal', coberturaCatalogo: 88, estatus: 'Normal' },
  { id: '4', nombre: 'Pastelería y Pan del Sureste', zona: 'Sureste', ventasMensuales: 420000, frecuenciaCompra: 'Mensual', coberturaCatalogo: 65, estatus: 'Crítico' },
  { id: '5', nombre: 'Distribuidora Bajío Crema y Pan', zona: 'Centro', ventasMensuales: 310000, frecuenciaCompra: 'Mensual', coberturaCatalogo: 58, estatus: 'Crítico' },
];

export const Distribuidor360AI: React.FC = () => {
  const [distributors, setDistributors] = useState<Distributor[]>(initialDistributors);
  const [filtroZona, setFiltroZona] = useState('Todas');
  const [search, setSearch] = useState('');

  const handleTriggerPromo = (distName: string) => {
    alert(`Campaña de promoción e incentivo de catálogo activada para: ${distName}. Se notificará por correo y WhatsApp con catálogo de bases de pan.`);
  };

  const filtered = distributors.filter(d => {
    const matchesZona = filtroZona === 'Todas' || d.zona === filtroZona;
    const matchesSearch = d.nombre.toLowerCase().includes(search.toLowerCase());
    return matchesZona && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Module Header — Limpio e institucional */}
      <div style={{
        background: '#FAFAFA',
        border: '1px solid var(--border)',
        borderRadius: '12px', padding: '20px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Map size={18} color="#F59E0B" />
            <span style={{ fontSize: '11px', color: '#F59E0B', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Distribuidor 360 AI — Inteligencia Geográfica & Surtido
            </span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '750', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
            Panel de Cobertura y Frecuencia de Distribuidores
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Monitorea el sell-in de la red de distribuidores nacionales, detecta caídas de frecuencia de compra y optimiza la cobertura del portafolio Rich.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ padding: '8px 14px', background: '#FFF', border: '1px solid var(--border)', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '600' }}>COBERTURA PROMEDIO</div>
            <div style={{ fontSize: '16px', fontWeight: '750', color: '#F59E0B' }}>82.4%</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
        
        {/* DISTRIBUTORS LIST */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'center' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
              Portafolio de Distribuidores Activos
            </h3>
            
            <div style={{ display: 'flex', gap: '6px' }}>
              {['Todas', 'Centro', 'Norte', 'Occidente', 'Sureste'].map(z => (
                <button
                  key={z}
                  onClick={() => setFiltroZona(z)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    border: '1px solid',
                    borderColor: filtroZona === z ? '#F59E0B' : 'var(--border)',
                    background: filtroZona === z ? 'rgba(245,158,11,0.06)' : '#FFF',
                    fontSize: '11px',
                    fontWeight: '700',
                    color: filtroZona === z ? '#F59E0B' : 'var(--text-secondary)'
                  }}
                >
                  {z}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar */}
          <div style={{ display: 'flex', gap: '10px', border: '1px solid var(--border)', borderRadius: '10px', padding: '8px 12px', background: '#F8FAFC' }}>
            <Search size={16} color="var(--text-muted)" style={{ marginTop: '2px' }} />
            <input
              type="text"
              placeholder="Buscar distribuidor..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: '13px', width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filtered.map(d => (
              <div
                key={d.id}
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                  background: '#FFF',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>{d.nombre}</span>
                    <span style={{
                      fontSize: '9px',
                      fontWeight: '800',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: d.estatus === 'Crítico' ? '#FEE2E2' : '#E0F2FE',
                      color: d.estatus === 'Crítico' ? '#991B1B' : '#0369A1'
                    }}>
                      {d.estatus}
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Región: {d.zona} | Frecuencia: <strong>{d.frecuenciaCompra}</strong>
                  </div>
                </div>

                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: '#1E40AF' }}>${(d.ventasMensuales/1000).toFixed(0)}k MXN</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Catálogo: <strong>{d.coberturaCatalogo}%</strong></div>
                  
                  {d.estatus === 'Crítico' && (
                    <button
                      onClick={() => handleTriggerPromo(d.nombre)}
                      style={{
                        fontSize: '9px',
                        fontWeight: '700',
                        color: '#FFF',
                        background: '#F59E0B',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '2px 6px',
                        cursor: 'pointer',
                        marginTop: '4px'
                      }}
                    >
                      Impulsar Surtido
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MAP & GEOGRAPHICAL ANALYSIS */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
            Desempeño Regional de Ventas B2B
          </h3>
          
          {/* Simulated Map Graphic (SVG) */}
          <div style={{
            height: '220px',
            background: '#FAFAFA',
            borderRadius: '8px',
            border: '1px dashed var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <MapPin size={24} color="#D31245" style={{ position: 'absolute', top: '45%', left: '50%' }} />
            <MapPin size={18} color="#1E40AF" style={{ position: 'absolute', top: '25%', left: '35%' }} />
            <MapPin size={18} color="#F59E0B" style={{ position: 'absolute', top: '60%', left: '42%' }} />
            <MapPin size={18} color="#EF4444" style={{ position: 'absolute', top: '75%', left: '75%' }} />
            
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
              <Layers size={32} color="#1E40AF" style={{ margin: '0 auto 8px auto' }} />
              <span>Mapa de Calor de Abastecimiento México</span>
            </div>
          </div>

          {/* Regional indicators */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { region: 'Centro (CDMX/Edomex)', pct: 92, val: '$1.56M MXN', col: '#D31245' },
              { region: 'Norte (Mty/Chih)', pct: 88, val: '$980K MXN', col: '#1E40AF' },
              { region: 'Occidente (Gdl/Jal)', pct: 78, val: '$850K MXN', col: '#F59E0B' },
              { region: 'Sureste (Mer/Cun)', pct: 65, val: '$420K MXN', col: '#EF4444' },
            ].map(r => (
              <div key={r.region} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>{r.region}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '120px' }}>
                  <div style={{ flex: 1, height: '6px', background: '#F1F5F9', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${r.pct}%`, background: r.col, borderRadius: '3px' }} />
                  </div>
                  <span style={{ fontWeight: '700', color: 'var(--text-primary)', width: '30px', textAlign: 'right' }}>{r.pct}%</span>
                </div>
                <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{r.val}</span>
              </div>
            ))}
          </div>

          <div style={{
            background: 'rgba(239,68,68,0.04)',
            border: '1px solid rgba(239,68,68,0.15)',
            borderRadius: '12px',
            padding: '10px 14px',
            fontSize: '11px',
            color: '#991B1B',
            display: 'flex',
            gap: '8px',
            alignItems: 'center'
          }}>
            <AlertTriangle size={14} color="#EF4444" style={{ flexShrink: 0 }} />
            <span>Alerta de frecuencia: Zonas <strong>Sureste</strong> y <strong>Centro-Bajío</strong> muestran retrasos de reorden superior a 3 semanas.</span>
          </div>

        </div>

      </div>

    </div>
  );
};
